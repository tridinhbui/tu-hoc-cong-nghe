import type { Lesson } from "../lesson-types";

// Chặng 64, bài 16-20. Giáo trình: scripts/curriculum/stage-64.json.
// Nội dung là khái niệm bền (nhật ký, xử lý sự cố, đo lợi ích, hồ sơ); không dựa vào tính năng riêng của công cụ nào.
// Mọi con số trong bài là số liệu minh hoạ.

// Viết đáp án đúng trước, vị trí được xáo lại khi build (lib/lesson-quiz-balance.js).
const q = (question: string, ok: string, bad: [string, string, string], explanation: string) => ({
  question,
  options: [ok, ...bad],
  correct: 0,
  explanation,
});

export const S64_D_LESSONS: Lesson[] = [
  {
    id: 2695,
    slug: "nhat-ky-dung-ai-ghi-ngan-de-truy-lai-khong-de-canh-sat",
    title: "Chặng 64, Bài 16: Nhật ký dùng AI: ghi ngắn để truy lại, không để canh chừng",
    subtitle: "Ba dòng mỗi lần dùng: việc gì, công cụ nào, ai đã duyệt. Đủ để sáu tháng sau còn trả lời được sếp.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ba tháng sau, khách hỏi con số trong báo giá tháng Sáu từ đâu ra, và bạn không nhớ có nhờ AI soạn phần đó hay không. Không ai muốn ghi chép cả ngày, nhưng một nhật ký ba dòng viết trong 30 giây giúp bạn trả lời được ngay, đồng thời cho cả phòng thấy dùng AI là việc có người chịu trách nhiệm chứ không phải việc giấu giếm.",
    openingQuestion:
      "Phòng bạn muốn có nhật ký dùng AI. Cách thiết kế nào nhiều khả năng được mọi người thật sự điền mỗi ngày?",
    openingOptions: [
      "Ba dòng: việc gì, công cụ nào, ai đã duyệt",
      "Một biểu mẫu hai trang, hỏi chi tiết từng câu lệnh đã gõ",
      "Chỉ ghi lại khi AI làm sai",
      "Giao một người ngồi theo dõi và ghi thay cho cả phòng",
    ],
    correctOption: 0,
    explanation:
      "Nhật ký chỉ có giá trị khi được điền đều, nên nó phải ngắn tới mức ghi xong trước khi quên. Ba dòng đủ để truy lại sau này: việc gì, dùng công cụ nào, ai duyệt kết quả. Biểu mẫu hai trang khiến người ta bỏ dở sau một tuần. Chỉ ghi khi sai thì không còn nhật ký của những lần đúng để đối chiếu. Người ngồi theo dõi biến nhật ký thành canh chừng và làm người khác e ngại.",
    diagram: [
      { label: "Xong một việc có dùng AI", arrow: true },
      { label: "Ghi ba dòng: việc, công cụ, người duyệt", arrow: true },
      { label: "Lưu vào một bảng chung của phòng", arrow: true },
      { label: "Khi có câu hỏi, tra lại trong một phút" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm chăm sóc khách hàng ghi ba cột vào bảng chung sau mỗi việc có dùng AI. Khi một khách hỏi vì sao thư trả lời tuần trước có câu hứa hoàn tiền, trưởng nhóm tra bảng, thấy thư do AI soạn nháp và chị Hà duyệt, rồi gọi chị Hà xem lại đúng thư đó trong vài phút.",
    },
    quiz: [
      q(
        "Vì sao nhật ký dùng AI nên chỉ ba dòng?",
        "Ngắn thì ghi được trong nửa phút nên người ta ghi đều",
        [
          "Vì hệ thống lưu trữ chỉ nhận được ba dòng mỗi bản ghi",
          "Vì ba dòng là quy định chung bắt buộc của mọi công ty khi dùng AI",
          "Vì càng ít thông tin thì càng ít rủi ro bị lộ ra ngoài",
        ],
        "Điều quyết định là thói quen: ghi lâu thì người ta bỏ. Giới hạn ba dòng không đến từ hệ thống hay từ một quy định chung nào, và ít thông tin cũng không làm bạn an toàn hơn, nó chỉ làm bạn khó truy lại khi cần."
      ),
      q(
        "Bản ghi nào đủ để người khác truy lại sau sáu tháng?",
        "Soạn thư nhắc nợ; công cụ đã được duyệt của phòng; chị Hà duyệt",
        [
          "Dùng AI hôm nay cho một việc, đã kiểm tra",
          "Soạn thư; một công cụ AI; đã duyệt xong, không có sai sót",
          "Soạn thư nhắc nợ khách hàng theo đúng mẫu đã được thống nhất từ đầu quý",
        ],
        "Bản ghi tốt nêu đúng ba thứ: việc, công cụ và tên người duyệt. Câu 'đã kiểm tra' không nói ai kiểm, còn 'một công cụ AI' không chỉ ra công cụ nào. Nhắc tới mẫu thư mà không có tên người duyệt thì vẫn thiếu đúng thông tin quan trọng nhất."
      ),
      q(
        "Một đồng nghiệp thấy nhật ký là 'canh chừng' nên không muốn ghi. Nên làm gì?",
        "Nói rõ mục đích là truy lại khi có câu hỏi, và không dùng để chấm điểm",
        [
          "Bắt buộc ghi, ai không ghi thì bị nhắc tên trước cả phòng",
          "Bỏ nhật ký vì người ngại ghi sẽ không có dữ liệu thật",
          "Cho họ ghi muộn cuối tháng một lần, gom hết các việc đã dùng AI",
        ],
        "Lo ngại này giải quyết bằng cách nói rõ nhật ký để làm gì và giữ đúng lời. Nhắc tên trước cả phòng biến nó thành canh chừng thật. Bỏ hẳn thì mất công cụ truy lại. Ghi gom cuối tháng thì người ta quên gần hết chi tiết."
      ),
      q(
        "Cột 'ai đã duyệt' để làm gì?",
        "Cho biết một con người đã đọc và chịu trách nhiệm kết quả",
        [
          "Để biết người nào dùng AI nhiều nhất trong phòng mà xếp hạng",
          "Để ghi tên người đã cài công cụ vào máy tính của phòng",
          "Để AI biết người nhận là ai và viết cho đúng giọng",
        ],
        "AI chỉ nháp, còn việc gửi đi là của người. Tên người duyệt cho biết ai đã đọc. Đó không phải bảng xếp hạng mức dùng, không liên quan tới người cài phần mềm, và AI cũng không đọc cột này."
      ),
      q(
        "Nhật ký nên lưu ở đâu để hữu ích nhất?",
        "Một bảng chung của phòng mà ai cũng mở và tìm được",
        [
          "Sổ tay riêng của từng người, vì mỗi người tự nhớ việc của mình",
          "Tệp trong máy một người quản lý, chỉ người đó mới được đọc",
          "Trong chính cuộc trò chuyện với AI, vì mọi thứ đã nằm sẵn ở đó",
        ],
        "Khi có câu hỏi, người hỏi thường không phải người đã làm, nên bảng chung mới tra được. Sổ riêng thì đồng nghiệp không tra được khi bạn nghỉ phép. Tệp của một người tạo điểm nghẽn. Cuộc trò chuyện với AI có thể bị xoá và không nói ai duyệt."
      ),
    ],
    keyTakeaways: [
      "Nhật ký tốt ghi xong trong nửa phút: việc gì, công cụ nào, ai duyệt.",
      "Mục đích là truy lại khi có câu hỏi, không phải chấm điểm hay canh chừng.",
      "Tên người duyệt là cột quan trọng nhất vì nó chỉ ra ai chịu trách nhiệm.",
      "Bảng chung cho cả phòng hữu ích hơn sổ riêng của từng người.",
      "Ghi ngay sau khi xong việc, đừng gom cuối tháng.",
    ],
    practicePrompt: {
      question:
        "Chị Mai ghi nhật ký: 'Hôm nay dùng AI, ok'. Bản ghi này thiếu gì quan trọng nhất để truy lại sau này?",
      options: [
        "Việc cụ thể, công cụ nào và tên người đã duyệt",
        "Giờ phút chính xác của từng câu lệnh đã gõ vào AI",
        "Toàn bộ nội dung cuộc trò chuyện dán kèm vào bảng",
        "Một lời nhận xét dài về chất lượng của câu trả lời",
      ],
      correct: 0,
      explanation:
        "Muốn truy lại thì phải biết việc gì, công cụ nào, ai duyệt. Giờ phút từng câu lệnh và toàn bộ cuộc trò chuyện làm bản ghi dài tới mức không ai điền nữa. Nhận xét dài cũng vậy, và nó không trả lời được câu hỏi của sếp.",
    },
    summary: {
      keyIdea: "Nhật ký tốt là nhật ký đủ ngắn để được điền và đủ rõ để truy lại.",
      formula: "Việc gì + công cụ nào + ai duyệt = một dòng truy lại được sau sáu tháng.",
      commonMistake: "Thiết kế biểu mẫu dài và chi tiết, rồi sau hai tuần cả phòng bỏ không điền.",
      action: "Dựng một bảng ba cột cho phòng và ghi ngay bản ghi đầu tiên của chính bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một bảng tính, tạo ba cột: Việc gì, Công cụ nào, Ai duyệt. Ghi lại ba việc có dùng AI trong tuần qua của bạn, mỗi việc một dòng, rồi thử đọc lại một dòng như thể sếp hỏi bạn sáu tháng sau. Nếu dòng nào không trả lời nổi câu hỏi, sửa cho đủ.",
      secondary: "Đề nghị một đồng nghiệp ghi thử hai dòng để xem ba cột có vừa với việc của họ không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, sếp hỏi số liệu trong báo giá tháng trước là từ đâu, và bạn chỉ nhớ mang máng là có nhờ AI soạn một phần. Bài này dạy một nhật ký ba dòng để bạn không phải đoán.",
      },
      {
        type: "feynman",
        title: "Nhật ký dùng AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sổ giao ca ở quầy lễ tân khách sạn: mỗi ca ghi vài dòng gọn, ai đến, việc gì, ai xử lý. Không ai đọc nó hằng ngày, nhưng khi có khách khiếu nại, cuốn sổ trả lời được trong một phút.",
        columns: ["Thành phần", "Sổ giao ca", "Nhật ký dùng AI"],
        rows: [
          ["Ghi gì", "Việc đã xảy ra trong ca", "Việc có dùng AI"],
          ["Ghi bao nhiêu", "Vài dòng ngắn", "Ba dòng: việc, công cụ, người duyệt"],
          ["Ai đọc", "Ca sau hoặc quản lý khi có chuyện", "Đồng nghiệp hoặc sếp khi có câu hỏi"],
          ["Dùng để làm gì", "Truy lại ai đã làm gì", "Truy lại công cụ nào và ai chịu trách nhiệm"],
        ],
        oneLiner: "Sổ giao ca ngắn thì mới được ghi, và ngắn vẫn đủ để trả lời khi có chuyện.",
      },
      { type: "heading", text: "Vì sao nhật ký hay chết sau hai tuần" },
      {
        type: "paragraph",
        text: "Phần lớn nhật ký chết vì quá dài. Biểu mẫu hỏi mười câu thì người bận nhất sẽ bỏ trước, mà người bận nhất thường là người dùng AI nhiều nhất. Muốn nhật ký sống thì nó phải ngắn hơn lý do để không ghi. Ba dòng là mức mà hầu hết mọi người ghi được trong nửa phút.",
      },
      {
        type: "flow",
        title: "Từ việc xong tới dòng nhật ký",
        steps: [
          { label: "Xong việc có dùng AI", detail: "Ghi ngay lúc vừa gửi hoặc vừa nộp, khi bạn còn nhớ rõ. Để tới cuối tuần thì chi tiết đã nhoè." },
          { label: "Dòng 1: việc gì", detail: "Viết bằng ngôn ngữ của công việc: 'soạn thư nhắc thanh toán cho nhóm khách quá hạn', không phải 'dùng AI'." },
          { label: "Dòng 2: công cụ nào", detail: "Tên công cụ phòng đã được phép dùng. Nếu bạn dùng công cụ chưa có trong danh sách, đó chính là điều cần nói ra." },
          { label: "Dòng 3: ai đã duyệt", detail: "Tên một con người đã đọc kết quả trước khi nó đi ra ngoài. Nếu là bạn tự duyệt, ghi tên bạn." },
          { label: "Khi có câu hỏi", detail: "Mở bảng chung, tìm theo việc hoặc ngày, đọc một dòng và gọi đúng người duyệt." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI thiết kế mẫu nhật ký cho phòng",
        task: "Bạn muốn AI giúp đề xuất một mẫu nhật ký cho phòng 8 người. Lắp prompt để nhận được một mẫu dùng được chứ không phải một biểu mẫu dài.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Tôi cần một mẫu nhật ký cho công ty.", feedback: "Quá rộng: AI không biết phòng bao nhiêu người hay việc gì, nên đề xuất một biểu mẫu chung chung." },
              { text: "Phòng tôi 8 người, làm chăm sóc khách hàng, ai cũng dùng AI soạn thư nháp vài lần mỗi ngày.", good: true, feedback: "Bối cảnh cụ thể cho AI biết tần suất và loại việc, nên mẫu sẽ vừa với nhịp làm việc thật." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Càng chi tiết càng tốt để không sót thông tin nào.", feedback: "AI sẽ cho mười hai cột. Người bận điền được một tuần rồi bỏ, vì mỗi bản ghi mất vài phút." },
              { text: "Tối đa ba cột, mỗi bản ghi phải điền xong trong nửa phút.", good: true, feedback: "Giới hạn rõ khiến AI phải chọn đúng ba thông tin quan trọng nhất thay vì liệt kê tất cả." },
            ],
          },
          {
            id: "purpose",
            label: "Mục đích",
            options: [
              { text: "Để quản lý theo dõi ai dùng AI nhiều và ai dùng ít.", feedback: "Mục đích này biến nhật ký thành bảng canh chừng, và mẫu AI đưa ra sẽ thêm cột đo mức dùng khiến mọi người ngại điền." },
              { text: "Để truy lại việc, công cụ và người duyệt khi có người hỏi; không dùng để chấm điểm.", good: true, feedback: "Mục đích nói rõ nên AI giữ đúng thông tin cần truy lại và không thêm cột đo lường cá nhân." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "limit", "purpose"],
            text: "Mẫu đề xuất, ba cột:\n1. Việc gì (ví dụ: soạn thư phản hồi khiếu nại về giao hàng chậm)\n2. Công cụ nào (chọn trong danh sách đã duyệt của phòng)\n3. Ai đã duyệt (tên người đã đọc trước khi gửi)\n\nGhi ngay sau khi gửi; lưu trong một bảng chung của phòng.",
          },
          {
            requires: ["context"],
            text: "Mẫu đề xuất gồm 11 cột: ngày, giờ, họ tên, bộ phận, công cụ, phiên bản, câu lệnh đã gõ, thời gian xử lý, mức độ hài lòng, rủi ro, ghi chú...\n\n(Mẫu quá dài: không ai điền nổi vào nửa phút.)",
          },
          {
            text: "Mẫu nhật ký cho công ty: ghi tất cả các hoạt động liên quan tới công nghệ trong ngày, đánh giá từng người theo mức sử dụng.\n\n(Chung chung và mang màu canh chừng: không phù hợp phòng 8 người.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhật ký để truy lại",
          text: "Ba dòng, ghi trong nửa phút. Ai cũng tra được khi có câu hỏi. Người ghi yên tâm vì biết bản ghi không dùng để chấm điểm. Sau sáu tháng vẫn trả lời được sếp.",
        },
        right: {
          label: "Nhật ký để canh chừng",
          text: "Nhiều cột, đo mức dùng của từng người. Người ghi ngại nên ghi qua loa hoặc bỏ. Dữ liệu thiếu và sai, nên lúc cần tra thì không có gì đáng tin. Không khí trong phòng căng hơn.",
        },
      },
      {
        type: "callout",
        label: "Đừng ghi dữ liệu nhạy cảm vào nhật ký",
        text: "Nhật ký ghi tên việc, không ghi nội dung. Viết 'soạn thư nhắc thanh toán nhóm khách quá hạn' là đủ; đừng dán tên khách, số tiền hay số hợp đồng vào bảng chung. Nếu phòng bạn có quy định riêng về cách lưu thông tin, hỏi bộ phận pháp chế hoặc người phụ trách an toàn thông tin.",
      },
      {
        type: "scenario",
        title: "Sếp hỏi về một báo giá",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi: 'Phần so sánh giá trong báo giá tuần trước làm sao vậy? Có ai kiểm không?' Bạn nhớ mang máng là có dùng AI nhưng không chắc ai đã duyệt. Phòng có bảng nhật ký chung.",
            choices: [
              { label: "Đáp ngay 'chắc là có kiểm rồi ạ' để sếp yên tâm", next: "bad_guess" },
              { label: "Xin sếp vài phút, mở bảng nhật ký tìm dòng của báo giá đó", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Sếp hỏi lại: 'Ai kiểm?' Bạn không trả lời được. Hoá ra không ai đã rà phần so sánh giá, và lỗi bị phát hiện bởi chính khách hàng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy dòng: 'Soạn phần so sánh giá; công cụ của phòng; anh Sơn duyệt'. Nhưng anh Sơn đang nghỉ phép hôm nay.",
            choices: [
              { label: "Báo sếp đúng thông tin trong bảng, rồi nhắn anh Sơn hỏi đã đối chiếu số với bảng giá gốc chưa", next: "good" },
              { label: "Sửa dòng nhật ký thành tên của bạn cho đỡ phải giải thích", next: "bad_edit" },
            ],
          },
          bad_edit: {
            text: "Sếp phát hiện dòng bị sửa sau khi có câu hỏi. Niềm tin vào cả bảng nhật ký giảm và mọi người bắt đầu nghi các bản ghi khác.",
            ending: "bad",
          },
          good: {
            text: "Sếp có câu trả lời rõ trong năm phút và biết gọi ai khi cần kiểm lại. Bạn thêm một dòng ghi chú đã hỏi lại anh Sơn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Tạo bảng ba cột: Việc gì, Công cụ nào, Ai duyệt.",
          "Bước 2 - Ghi ngay sau mỗi việc có dùng AI, trong nửa phút.",
          "Bước 3 - Không dán dữ liệu nhạy cảm vào bảng, chỉ ghi tên việc.",
          "Bước 4 - Nói rõ với cả phòng: bảng để truy lại, không để chấm điểm.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ngắn thì được ghi, ghi đều thì truy lại được, truy lại được thì mới có trách nhiệm thật.",
          "Bài sau: khi AI làm sai một việc quan trọng, năm bước đầu tiên trong giờ đầu.",
        ],
      },
    ],
  },
  {
    id: 2696,
    slug: "ai-lam-sai-viec-quan-trong-nam-buoc-dau-tien-trong-gio-dau",
    title: "Chặng 64, Bài 17: AI làm sai việc quan trọng: năm bước đầu tiên trong giờ đầu",
    subtitle: "Dừng, báo người, khoanh phạm vi, sửa, ghi lại: thứ tự quan trọng hơn tốc độ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chiều thứ Sáu, một khách gọi: bảng giá bạn gửi sáng nay có một dòng sai, và dòng đó do AI soạn. Phản xạ tự nhiên là sửa ngay cho xong, nhưng nếu chưa biết sai ở đâu và đã gửi cho ai thì sửa vội có thể làm sự việc rối hơn. Có sẵn một chuỗi năm bước giúp bạn bình tĩnh đi đúng thứ tự.",
    openingQuestion:
      "Bạn vừa phát hiện kết quả do AI soạn, đã gửi tới khách, có một con số sai. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Dừng việc gửi tiếp và báo cho người phụ trách",
      "Sửa nhanh con số rồi gửi bản đúng cho tất cả khách",
      "Nhờ AI xem lại và xác nhận chính nó đã sai ở đâu",
      "Chờ xem khách có phản ứng hay không rồi mới quyết định",
    ],
    correctOption: 0,
    explanation:
      "Việc đầu tiên là không để lỗi lan thêm: dừng gửi tiếp các bản cùng loại, rồi báo người có quyền quyết định. Sửa ngay và gửi lại cho tất cả khi chưa biết phạm vi có thể gửi nhầm thêm lần nữa. Hỏi AI xác nhận lỗi của chính nó không đáng tin vì nó không biết nguồn gốc con số. Chờ khách phản ứng thì để lỗi tự lan và mất quyền chủ động.",
    diagram: [
      { label: "Dừng: không gửi thêm bản cùng loại", arrow: true },
      { label: "Báo người phụ trách ngay", arrow: true },
      { label: "Khoanh phạm vi: ai đã nhận, sai ở đâu", arrow: true },
      { label: "Sửa theo chỉ đạo, rồi ghi lại bài học" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên bán hàng gửi bảng giá cho 12 khách, trong đó có một dòng giá do AI soạn bị sai. Anh dừng gửi tiếp, báo trưởng phòng, rồi đối chiếu danh sách gửi và thấy chỉ 3 khách nhận dòng sai. Phòng gọi riêng từng khách trong chiều hôm đó, thay vì gửi thư cải chính hàng loạt.",
    },
    quiz: [
      q(
        "Vì sao phải dừng gửi trước khi sửa lỗi?",
        "Để lỗi không lan thêm tới người nhận mới trong lúc đang xử lý",
        [
          "Vì sửa lỗi khi còn đang gửi sẽ làm hỏng công cụ AI đang dùng",
          "Vì người nhận chỉ bực bội khi nhận được bản sửa ngay sau bản sai",
          "Vì AI sẽ tự sửa lỗi sau vài phút nên chờ là cách nhanh nhất",
        ],
        "Mỗi bản sai gửi thêm là thêm một người phải được báo và sửa. Dừng lại giữ lỗi ở quy mô hiện tại. Công cụ AI không hỏng vì bạn sửa, bản sửa kịp thời thường được đánh giá tốt hơn, và AI không tự sửa bản đã gửi ra ngoài."
      ),
      q(
        "Ở bước 'khoanh phạm vi', bạn cần biết gì đầu tiên?",
        "Ai đã nhận bản sai và sai chính xác ở chỗ nào",
        [
          "Công cụ AI nào đã tạo ra lỗi và nhà sản xuất nào sở hữu nó",
          "Có bao nhiêu người trong phòng từng dùng công cụ đó trong tháng",
          "Lỗi này có giống với các lỗi tương tự trên mạng xã hội không",
        ],
        "Phạm vi là người nhận và chỗ sai, vì đó là thứ quyết định ai cần được báo và sửa gì. Tên công cụ hay chủ sở hữu giúp ích sau này nhưng không cho biết ai đã nhận. Số người từng dùng hay lỗi tương tự ngoài mạng không trả lời câu hỏi đang cần."
      ),
      q(
        "Thứ tự nào là đúng trong giờ đầu?",
        "Dừng, báo người, khoanh phạm vi, sửa, ghi lại",
        [
          "Sửa, dừng, báo người, khoanh phạm vi, ghi lại",
          "Báo khách, sửa, khoanh phạm vi, dừng, ghi lại ở cuối tuần",
          "Khoanh phạm vi, sửa, ghi lại, rồi mới báo người phụ trách",
        ],
        "Dừng đứng đầu để lỗi không lan, báo người đứng thứ hai để người có quyền quyết định biết sớm. Sửa trước khi khoanh phạm vi dễ bỏ sót người nhận. Báo khách trước khi sếp biết có thể cam kết điều công ty chưa đồng ý."
      ),
      q(
        "Vì sao phải báo người phụ trách dù bạn đã biết cách sửa?",
        "Vì quyết định báo khách và cách nói thuộc về người có thẩm quyền",
        [
          "Vì người phụ trách luôn sửa lỗi nhanh hơn bạn",
          "Vì không báo thì sẽ bị kỷ luật nặng hơn",
          "Vì AI sẽ tự động gửi báo cáo lỗi cho người phụ trách thay bạn",
        ],
        "Bạn có thể sửa được con số, nhưng có xin lỗi khách, bồi thường hay không là quyết định của người có quyền. Báo sớm không phải để né kỷ luật, người phụ trách chưa chắc sửa nhanh hơn, và AI không tự gửi báo cáo gì cả."
      ),
      q(
        "Bước 'ghi lại' nên ghi điều gì?",
        "Điều đã xảy ra, đã xử lý thế nào và lần sau đổi gì",
        [
          "Tên người đã duyệt bản sai để sau này nhắc nhở riêng",
          "Một bản xin lỗi dài gửi cho toàn bộ công ty biết",
          "Chỉ ngày giờ xảy ra lỗi, vì phần còn lại ai cũng nhớ",
        ],
        "Ghi lại để lần sau đỡ sai: chuyện gì xảy ra, xử lý ra sao, đổi bước nào. Ghi tên người để nhắc nhở biến bản ghi thành bản buộc lỗi nên người ta ngại ghi. Thư xin lỗi toàn công ty không cần thiết, và chỉ ghi ngày giờ thì mất hết bài học."
      ),
    ],
    keyTakeaways: [
      "Dừng trước, để lỗi không lan thêm.",
      "Báo người có thẩm quyền sớm, vì quyết định báo khách và cách nói là của họ.",
      "Khoanh phạm vi: ai nhận và sai ở đâu, trước khi sửa.",
      "Sửa theo chỉ đạo, không sửa vội bằng một lượt gửi mới.",
      "Ghi lại để đổi quy trình, không để tìm người chịu lỗi.",
    ],
    practicePrompt: {
      question:
        "Chị Linh phát hiện một bản tóm tắt hợp đồng do AI soạn có một điều khoản bị ghi sai, đã gửi cho 4 người. Bước nào chị nên làm ngay sau khi dừng gửi tiếp?",
      options: [
        "Báo người phụ trách và cho biết 4 người đã nhận",
        "Gửi bản sửa cho 4 người kèm lời xin lỗi thật dài",
        "Tự tra luật để xem điều khoản đúng là gì rồi sửa",
        "Nhờ AI viết lại bản tóm tắt và gửi lại ngay cho cả 4 người",
      ],
      correct: 0,
      explanation:
        "Sau khi dừng thì báo người phụ trách, kèm phạm vi đã biết. Gửi bản sửa ngay có thể làm bốn người nhận hai bản khác nhau mà không rõ bản nào đúng. Tự tra luật là việc của pháp chế. Nhờ AI viết lại thì lỗi có thể xuất hiện ở chỗ khác.",
    },
    summary: {
      keyIdea: "Khi AI làm sai việc quan trọng, thứ tự các bước quan trọng hơn tốc độ của từng bước.",
      formula: "Dừng + báo người + khoanh phạm vi + sửa + ghi lại = một giờ đầu có kiểm soát.",
      commonMistake: "Sửa ngay và gửi lại cho tất cả khi chưa biết ai đã nhận bản nào.",
      action: "Viết năm bước này lên một tờ ghi chú và dán cạnh màn hình làm việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại tài liệu bạn hay gửi ra ngoài có dùng AI hỗ trợ (báo giá, email, tóm tắt). Viết ra giấy: nếu có một con số sai trong đó thì ai là người bạn báo đầu tiên, danh sách người nhận nằm ở đâu, và bạn dừng việc gì. Điền tên và nơi lưu thật.",
      secondary: "Hỏi người phụ trách của bạn họ muốn được báo bằng cách nào: gọi điện, nhắn tin hay gặp trực tiếp.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, một khách gọi báo dòng giá trong bảng bạn gửi sáng nay không đúng, và dòng đó do AI soạn. Bài này đưa bạn năm bước cho giờ đầu tiên, để bình tĩnh đi đúng thứ tự.",
      },
      {
        type: "feynman",
        title: "Xử lý sự cố đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn phát hiện ống nước trong nhà bị rò: bạn khoá van trước, gọi thợ, xem nước đã thấm tới đâu, rồi mới sửa, và cuối cùng ghi nhớ để lần sau kiểm ống định kỳ. Không ai bắt đầu bằng việc lau sàn.",
        columns: ["Bước", "Ống nước bị rò", "AI làm sai việc quan trọng"],
        rows: [
          ["Dừng", "Khoá van tổng", "Ngừng gửi thêm bản cùng loại"],
          ["Báo người", "Gọi thợ hoặc chủ nhà", "Báo người phụ trách"],
          ["Khoanh phạm vi", "Xem nước đã thấm tới đâu", "Xem ai đã nhận, sai ở đâu"],
          ["Sửa và ghi lại", "Sửa ống, ghi nhớ kiểm định kỳ", "Sửa theo chỉ đạo, ghi bài học"],
        ],
        oneLiner: "Khoá van trước, hỏi người rồi mới lau sàn: dừng lỗi lan trước khi sửa lỗi.",
      },
      { type: "heading", text: "Vì sao sửa ngay thường là sai bước đầu" },
      {
        type: "paragraph",
        text: "Khi lỗi bị phát hiện, ai cũng muốn sửa ngay để khỏi xấu hổ. Nhưng nếu chưa biết ai đã nhận bản sai, bản sửa có thể tới thiếu người, hoặc tới những người chưa từng nhận bản sai. Bốn bước đầu thực ra là bốn cách để sửa một lần mà đúng.",
      },
      {
        type: "flow",
        title: "Năm bước trong giờ đầu",
        steps: [
          { label: "Dừng", detail: "Ngừng gửi thêm mọi bản cùng loại: thư, bảng giá, báo cáo. Tạm đặt các bản chuẩn bị gửi sang một bên." },
          { label: "Báo người", detail: "Nhắn hoặc gọi người phụ trách, nói gọn: chuyện gì, đã gửi cho ai, bạn đã dừng gì. Đừng kèm lời bào chữa." },
          { label: "Khoanh phạm vi", detail: "Mở danh sách đã gửi, đối chiếu ai đã nhận bản sai, sai đúng một chỗ hay nhiều chỗ." },
          { label: "Sửa", detail: "Làm theo chỉ đạo: gọi từng khách, gửi bản đính chính, hoặc rút bản cũ. Một người sửa để tránh hai bản sửa khác nhau." },
          { label: "Ghi lại", detail: "Ghi ba dòng vào nhật ký sự cố: chuyện gì, xử lý ra sao, lần sau đổi bước nào." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt sự cố AI vừa viết giúp",
        task: "Ghi chú thật của bạn chỉ có: 14 giờ phát hiện dòng giá sai trong bảng gửi 12 khách; 3 khách đã nhận bản sai; đã dừng gửi; đã báo anh Tuấn, trưởng phòng. Bạn nhờ AI viết bản tóm tắt sự cố. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Lúc 14 giờ, phòng phát hiện một dòng giá sai trong bảng giá gửi cho 12 khách." },
          { text: "Ba khách đã nhận bản có dòng sai; việc gửi tiếp đã được dừng." },
          { text: "Nguyên nhân là công cụ AI gặp lỗi hệ thống vào đêm hôm trước.", error: "Ghi chú không hề nêu nguyên nhân. AI tự bịa một lý do nghe hợp lý, và nếu ghi vào bản chính thức thì cả phòng sẽ sửa sai chỗ." },
          { text: "Anh Tuấn, trưởng phòng, đã được báo ngay sau khi phát hiện." },
          { text: "Thiệt hại ước tính khoảng 8 triệu đồng tiền bán lỗ.", error: "Không có số liệu thiệt hại nào trong ghi chú. Con số 8 triệu do AI tự thêm cho bản tóm tắt nghe đầy đủ." },
          { text: "Bước tiếp theo là gọi ba khách đã nhận để thông báo giá đúng, theo chỉ đạo của trưởng phòng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đi đúng thứ tự năm bước",
          text: "Lỗi dừng ở ba khách. Người phụ trách biết sớm nên quyết định cách nói. Bản sửa gửi đúng người, một lần. Có ghi lại nên lần sau quy trình tốt hơn.",
        },
        right: {
          label: "Sửa vội và gửi lại cho tất cả",
          text: "Mười hai khách nhận hai bản khác nhau, không rõ bản nào đúng. Người phụ trách biết sau khi khách đã gọi hỏi. Không ai biết chính xác ai đã nhận gì. Sự việc lặp lại vì chưa ai ghi.",
        },
      },
      {
        type: "callout",
        label: "Việc liên quan tới tiền, hợp đồng hay pháp lý",
        text: "Nếu con số sai liên quan tới hợp đồng, thuế hay cam kết bồi thường, đừng tự quyết cách nói với khách. Báo người phụ trách và hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi liên hệ khách.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu, một dòng giá sai",
        start: "s1",
        nodes: {
          s1: {
            text: "Lúc 14 giờ, một khách gọi báo dòng giá sản phẩm C trong bảng bạn gửi sáng nay thấp hơn giá thật. Bạn nhận ra dòng đó do AI soạn và bạn chưa đối chiếu với bảng giá gốc. Bảng đã gửi cho 12 khách, còn một đợt gửi nữa hẹn lúc 15 giờ.",
            choices: [
              { label: "Sửa ngay dòng giá trong bảng và để đợt 15 giờ chạy như dự kiến", next: "bad_fix" },
              { label: "Huỷ hẹn gửi 15 giờ rồi gọi trưởng phòng báo tình hình", next: "s2" },
            ],
          },
          bad_fix: {
            text: "Đợt 15 giờ gửi bảng đã sửa cho nhóm khách mới, còn 12 khách cũ vẫn giữ bản sai. Hai nhóm khách nhận hai mức giá khác nhau cho cùng một sản phẩm.",
            ending: "bad",
          },
          s2: {
            text: "Trưởng phòng hỏi: 'Mấy khách nhận bản sai và dòng nào sai?' Bạn cần trả lời chính xác.",
            choices: [
              { label: "Mở danh sách đã gửi, đối chiếu với bảng giá gốc và báo: 3 khách nhận, một dòng sai", next: "s3" },
              { label: "Trả lời 'chắc tất cả 12 khách' cho chắc ăn", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Phòng gọi cả 12 khách, trong đó 9 khách không hề nhận dòng sai. Họ thắc mắc và một khách bắt đầu nghi ngờ các con số khác trong bảng.",
            ending: "bad",
          },
          s3: {
            text: "Trưởng phòng quyết định gọi riêng 3 khách và gửi bản đã đối chiếu sau khi bạn kiểm xong. Bạn cần làm gì tiếp theo?",
            choices: [
              { label: "Làm theo chỉ đạo, rồi ghi ba dòng vào nhật ký sự cố về nguyên nhân thiếu bước đối chiếu", next: "good" },
              { label: "Nhờ AI kiểm lại toàn bộ bảng giá rồi gửi luôn cho cả 12 khách", next: "bad_ai" },
            ],
          },
          bad_ai: {
            text: "AI không có bảng giá gốc để đối chiếu và xác nhận 'bảng đúng'. Sau đó một dòng khác bị phát hiện sai, và lần này cả 12 khách đã nhận.",
            ending: "bad",
          },
          good: {
            text: "Ba khách được gọi trong chiều hôm đó và không ai phải chờ bản sửa. Nhật ký ghi thêm bước đối chiếu giá gốc cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dừng mọi việc gửi thêm bản cùng loại.",
          "Bước 2 - Báo người phụ trách, nói gọn và không bào chữa.",
          "Bước 3 - Khoanh phạm vi bằng danh sách đã gửi, không đoán.",
          "Bước 4 - Sửa theo chỉ đạo, một người một lượt.",
          "Bước 5 - Ghi ba dòng vào nhật ký để lần sau đổi quy trình.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Khoá van trước, báo người, xem nước thấm tới đâu, rồi mới sửa.",
          "Bài sau: lỡ dán dữ liệu không nên dán vào ô chat, nói với ai và nói thế nào.",
        ],
      },
    ],
  },
  {
    id: 2697,
    slug: "khi-lo-dan-du-lieu-khong-nen-dan-vao-ai-noi-ai-va-noi-the-nao",
    title: "Chặng 64, Bài 18: Lỡ dán dữ liệu không nên vào ô chat: nói với ai và nói thế nào",
    subtitle: "Một tin báo ngắn, không đổ lỗi: đã dán gì, lúc nào, dữ liệu gì. Báo sớm là giữ được nhiều đường lùi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang vội, dán cả bảng lương hoặc danh sách khách vào một công cụ AI, rồi nhận ra bảng đó có cột không được đưa ra ngoài. Tim đập nhanh, và cám dỗ lớn nhất là im lặng hy vọng không ai biết. Nhưng người báo sớm cho phép công ty xử lý kịp, còn người im lặng để cơ hội đó trôi đi. Bài này dạy cách soạn tin báo gọn và không đổ lỗi.",
    openingQuestion:
      "Bạn nhận ra mình vừa dán một bảng có thông tin khách hàng vào ô chat của công cụ AI chưa được duyệt. Nên làm gì?",
    openingOptions: [
      "Báo sớm cho người phụ trách bằng một tin ngắn, đủ ý",
      "Xoá cuộc trò chuyện đi và coi như chưa có chuyện gì",
      "Chờ một tuần xem có vấn đề gì xảy ra thì mới báo",
      "Nhờ AI tự quên dữ liệu đó bằng một câu lệnh yêu cầu",
    ],
    correctOption: 0,
    explanation:
      "Người phụ trách chỉ xử lý được khi biết, và càng biết sớm càng nhiều lựa chọn: yêu cầu xoá, đổi mật khẩu, báo người liên quan. Xoá cuộc trò chuyện không xoá được bản đã gửi đi và còn che mất bằng chứng cần cho việc xử lý. Chờ một tuần làm mất thời gian quý nhất. Một câu lệnh yêu cầu AI quên không đảm bảo dữ liệu đã bị xoá khỏi hệ thống của nhà cung cấp.",
    diagram: [
      { label: "Nhận ra đã dán dữ liệu không nên dán", arrow: true },
      { label: "Dừng dán thêm, không xoá vội bằng chứng", arrow: true },
      { label: "Gửi tin ngắn: đã dán gì, lúc nào, dữ liệu gì", arrow: true },
      { label: "Người phụ trách quyết định bước tiếp theo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự dán danh sách ứng viên có số điện thoại vào một công cụ AI chưa được duyệt để nhờ chuẩn hoá tên. Ngay sau đó chị nhận ra và nhắn trưởng bộ phận: việc gì, lúc nào, cột nào có dữ liệu cá nhân. Bộ phận công nghệ thông tin kịp kiểm tra cài đặt của công cụ và hướng dẫn chị các bước tiếp theo trong cùng ngày.",
    },
    quiz: [
      q(
        "Tin báo sự cố nên có những thông tin nào?",
        "Đã dán gì, vào công cụ nào, lúc nào và dữ liệu nhạy cảm nào",
        [
          "Lý do vì sao bạn đã phải làm vội và lời hứa không tái phạm",
          "Toàn bộ nội dung đã dán để người phụ trách tự đánh giá mức độ",
          "Tên các đồng nghiệp đã biết chuyện để tiện hỏi thêm sau đó",
        ],
        "Người phụ trách cần bốn mảnh: việc gì, công cụ nào, thời điểm và loại dữ liệu. Lý do vội và lời hứa là lời bào chữa, không giúp xử lý. Dán lại toàn bộ nội dung đã dán nhân đôi chính vấn đề. Danh sách người biết chuyện không phải thông tin xử lý ban đầu."
      ),
      q(
        "Vì sao tin báo nên không đổ lỗi, kể cả lỗi của chính mình hay của người khác?",
        "Vì mục đích là xử lý nhanh, còn quy lỗi làm người ta ngại báo",
        [
          "Vì đổ lỗi là vi phạm quy định bảo mật chung của công ty",
          "Vì người phụ trách chỉ đọc được tối đa hai câu mỗi tin báo",
          "Vì lỗi của người khác thì bạn không có quyền nhắc tới",
        ],
        "Khi tin báo trở thành bản buộc tội, người ta sẽ chọn im lặng lần sau. Đây là việc văn hoá, không phải một điều khoản bảo mật. Độ dài tin không bị giới hạn hai câu, và nếu người khác liên quan thì nêu sự việc là hợp lý, chỉ không quy kết."
      ),
      q(
        "Bạn nên báo trong khoảng thời gian nào?",
        "Ngay khi nhận ra, dù chưa biết hết mức độ",
        [
          "Sau khi bạn đã tự tìm hiểu đủ để trả lời mọi câu hỏi",
          "Vào cuối tuần khi người phụ trách đỡ bận hơn nhiều",
          "Khi có dấu hiệu dữ liệu đã bị người khác sử dụng thật",
        ],
        "Báo ngay cho phép xử lý khi còn nhiều lựa chọn. Chờ đủ thông tin làm mất thời gian quý nhất. Chờ tới cuối tuần là chờ thêm hai ngày trong khi dữ liệu vẫn nằm ở ngoài. Chờ dấu hiệu bị lạm dụng thì đã quá muộn để ngăn."
      ),
      q(
        "Ngoài tin báo, việc nào nên tránh ngay sau khi lỡ dán?",
        "Dán thêm dữ liệu khác để nhờ AI sửa hậu quả của lần dán trước",
        [
          "Mở lại cuộc trò chuyện để chụp màn hình làm bằng chứng cho báo cáo",
          "Hỏi người phụ trách xem công ty có quy trình xử lý sẵn không",
          "Ghi lại giờ dán, tên công cụ và các cột đã có trong bảng",
        ],
        "Mỗi lần dán thêm là thêm dữ liệu ra ngoài, nên đây là việc cần tránh. Chụp màn hình cuộc trò chuyện giữ bằng chứng giúp người xử lý. Hỏi quy trình sẵn có hoặc ghi lại thông tin đều là việc nên làm."
      ),
      q(
        "Vì sao không nên tự xoá cuộc trò chuyện rồi im lặng?",
        "Xoá trong máy bạn không xoá được bản đã gửi tới nhà cung cấp",
        [
          "Vì công cụ AI sẽ tự gửi thông báo lỗi tới người phụ trách của công ty",
          "Vì cuộc trò chuyện đã xoá luôn phục hồi được chỉ sau ít phút",
          "Vì xoá cuộc trò chuyện là hành vi bị cấm trong mọi công ty",
        ],
        "Dữ liệu đã tới máy chủ của nhà cung cấp; xoá trên màn hình chỉ làm bạn mất bằng chứng. Công cụ không tự báo người phụ trách của công ty bạn, việc phục hồi không phải quy tắc chung, và xoá không phải vi phạm theo mọi quy định."
      ),
    ],
    keyTakeaways: [
      "Báo sớm cho người phụ trách, dù chưa biết hết mức độ.",
      "Tin báo gồm bốn mảnh: đã dán gì, công cụ nào, lúc nào, dữ liệu nhạy cảm nào.",
      "Không đổ lỗi, không bào chữa: mục đích là xử lý nhanh.",
      "Không xoá bằng chứng và không dán thêm dữ liệu để sửa.",
      "Mọi quyết định xử lý tiếp theo thuộc về người có thẩm quyền.",
    ],
    practicePrompt: {
      question:
        "Anh Bảo dán một bảng công nợ có tên khách vào công cụ AI chưa được duyệt lúc 10 giờ. Tin nhắn nào gửi trưởng phòng là tốt nhất?",
      options: [
        "10 giờ em dán bảng công nợ có tên khách vào công cụ AI chưa duyệt, em đã dừng",
        "Em xin lỗi anh vì hôm nay em quá bận nên mới lỡ làm sai như vậy",
        "Có chuyện nhỏ thôi anh ạ, chắc không sao, em sẽ tự xử lý",
        "Anh ơi em làm sai rồi, anh gọi em ngay giúp em nhé",
      ],
      correct: 0,
      explanation:
        "Tin tốt nêu việc, thời điểm, loại dữ liệu và điều đã làm. Lời xin lỗi dài không cho biết chuyện gì xảy ra. 'Chuyện nhỏ' là tự đánh giá thay người phụ trách. 'Em làm sai rồi' không nói sai cái gì và buộc người đọc phải hỏi lại.",
    },
    summary: {
      keyIdea: "Lỡ dán nhầm thì điều quyết định là bạn báo sớm và báo đủ ý, không phải bạn có lỗi hay không.",
      formula: "Đã dán gì + công cụ nào + lúc nào + dữ liệu nhạy cảm nào = một tin báo xử lý được.",
      commonMistake: "Xoá cuộc trò chuyện và im lặng, vì nghĩ chuyện sẽ tự qua.",
      action: "Soạn sẵn một mẫu tin báo bốn dòng và lưu ở nơi bạn mở được trong 10 giây.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một mẫu tin báo bốn dòng: đã dán gì, vào công cụ nào, lúc nào, dữ liệu nhạy cảm nào. Lưu nó vào ghi chú điện thoại hoặc máy tính. Hỏi người phụ trách xem họ muốn nhận tin ở kênh nào (nhắn tin, email hay gọi), rồi ghi tên và kênh đó cạnh mẫu.",
      secondary: "Đọc lại mẫu tin và xoá mọi câu xin lỗi hay bào chữa nếu có.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đang vội, dán cả một bảng vào ô chat của công cụ AI, rồi chợt nhận ra trong bảng có cột không được đưa ra ngoài. Bài này dạy bạn viết tin báo ngắn và đúng cách ngay lúc đó.",
      },
      {
        type: "feynman",
        title: "Báo sự cố dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn làm rơi chìa khoá nhà hàng xóm nhờ giữ: nói ngay 'tôi làm rơi ở chỗ này, lúc này' thì hai người cùng đi tìm được, còn giấu đi thì họ chỉ biết khi cửa đã bị mở.",
        columns: ["Thành phần", "Làm rơi chìa khoá", "Lỡ dán dữ liệu"],
        rows: [
          ["Việc đã xảy ra", "Rơi chìa ở đâu", "Đã dán gì vào công cụ nào"],
          ["Thời điểm", "Khoảng mấy giờ", "Lúc nào trong ngày"],
          ["Tác động", "Chìa mở được cửa nào", "Dữ liệu nhạy cảm nào"],
          ["Cách nói", "Nói thẳng, không đổ lỗi", "Tin ngắn, không bào chữa"],
        ],
        oneLiner: "Báo sớm và đủ ý thì người khác giúp được; báo muộn hoặc mơ hồ thì họ chỉ kịp dọn hậu quả.",
      },
      { type: "heading", text: "Vì sao người ta im lặng, và vì sao đó là lựa chọn tệ nhất" },
      {
        type: "paragraph",
        text: "Người lỡ dán thường sợ bị trách và nghĩ rằng im lặng là an toàn. Nhưng công ty có những việc chỉ làm được khi biết sớm: liên hệ nhà cung cấp, đánh giá mức nhạy cảm, báo những người bị ảnh hưởng. Khi sự việc bị phát hiện từ phía khác, giai đoạn đó đã trôi qua và bạn mất luôn lợi thế người báo sớm.",
      },
      {
        type: "flow",
        title: "Từ lúc nhận ra tới tin báo",
        steps: [
          { label: "Dừng lại", detail: "Đừng dán thêm gì, đừng bấm xoá. Nhìn lại màn hình và đọc xem mình vừa dán cụ thể những gì." },
          { label: "Ghi lại bốn mảnh", detail: "Đã dán gì, vào công cụ nào, lúc nào, dữ liệu nhạy cảm nào (ví dụ: tên và số điện thoại khách)." },
          { label: "Gửi tin ngắn cho người phụ trách", detail: "Một đoạn ba bốn dòng theo thứ tự bốn mảnh, kèm điều bạn đã làm: đã dừng, chưa dán thêm." },
          { label: "Chờ hướng dẫn", detail: "Người phụ trách quyết định: liên hệ nhà cung cấp, báo bộ phận công nghệ thông tin, hay báo người liên quan." },
          { label: "Ghi vào nhật ký", detail: "Ghi ba dòng để lần sau phòng biết cách tránh: loại dữ liệu nào, vì sao dễ dán nhầm." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin báo, đúng cách",
        task: "Bạn chưa dám viết tin báo vì sợ nghe như đổ lỗi. Bạn dùng một công cụ đã được duyệt để soạn nháp, không dán lại dữ liệu nhạy cảm. Lắp prompt để AI giúp bạn soạn một tin báo ngắn, đủ ý.",
        parts: [
          {
            id: "facts",
            label: "Sự việc",
            options: [
              { text: "Tôi lỡ làm sai một việc liên quan tới AI, hãy giúp tôi viết tin báo.", feedback: "Không có dữ kiện nào, nên AI sẽ tự bịa chi tiết như công cụ nào và lúc nào, nghe chắc chắn nhưng có thể sai." },
              { text: "Sự việc: 10 giờ sáng nay tôi dán một bảng công nợ có tên khách và số tiền vào công cụ AI chưa được duyệt; tôi đã dừng, chưa dán thêm.", good: true, feedback: "Bốn mảnh đã có: đã dán gì, công cụ nào, lúc nào, dữ liệu nào. AI chỉ cần sắp xếp, không phải đoán." },
            ],
          },
          {
            id: "tone",
            label: "Giọng viết",
            options: [
              { text: "Viết thật chân thành và xin lỗi sâu sắc để họ thông cảm.", feedback: "AI ra một tin dài toàn lời xin lỗi, người phụ trách phải đọc tới cuối mới biết chuyện gì xảy ra." },
              { text: "Viết ngắn, trung tính, không xin lỗi dài, không bào chữa, không đổ lỗi cho ai.", good: true, feedback: "Giọng trung tính giữ tin báo gọn, và người đọc tập trung vào việc cần làm." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm nguyên nhân và đề xuất cách khắc phục cho đầy đủ.", feedback: "AI tự suy ra nguyên nhân và phương án, những điều bạn chưa biết, rồi người phụ trách nhầm tưởng là thật." },
              { text: "Chỉ dùng thông tin tôi đưa; nếu thiếu, để chỗ [cần bổ sung]; tối đa 5 dòng.", good: true, feedback: "AI không thêm gì ngoài dữ kiện, và chỗ trống cho biết bạn còn cần hỏi gì." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "tone", "limit"],
            text: "Chào anh/chị,\n\nEm báo sự cố: lúc 10 giờ sáng nay em dán một bảng công nợ có tên khách và số tiền vào một công cụ AI chưa được duyệt. Em đã dừng và chưa dán thêm dữ liệu nào. Số khách trong bảng: [cần bổ sung]. Em chờ anh/chị hướng dẫn bước tiếp theo.",
          },
          {
            requires: ["facts"],
            text: "Em xin lỗi anh/chị vì đã thiếu cẩn thận, em hứa sẽ không tái phạm...\n\n(Dữ kiện đúng nhưng tin quá dài, toàn xin lỗi, và người đọc phải lần tìm chuyện chính.)",
          },
          {
            text: "Em báo: hôm qua em dùng AI và hệ thống có thể đã lưu thông tin của 500 khách hàng do lỗi bảo mật của nhà cung cấp...\n\n(AI bịa ngày, bịa số 500 và bịa nguyên nhân: tin báo sai còn tệ hơn không báo.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tin báo bốn mảnh",
          text: "Ba bốn dòng, nêu việc, công cụ, thời điểm, loại dữ liệu và điều đã dừng. Người phụ trách đọc một lần là hiểu. Không có lời bào chữa nên không có gì để cãi. Bạn được nhìn như người báo sớm.",
        },
        right: {
          label: "Tin báo mơ hồ hoặc im lặng",
          text: "'Em làm sai rồi' hoặc không gửi gì. Người phụ trách phải hỏi lại nhiều lần, mất thời gian quý nhất. Khi sự việc bị lộ từ chỗ khác, bạn bị nhìn như người giấu.",
        },
      },
      {
        type: "callout",
        label: "Đừng dán lại dữ liệu vào tin báo",
        text: "Tin báo nói loại dữ liệu, không chép lại dữ liệu: 'tên và số điện thoại khách', chứ không dán danh sách. Mọi câu hỏi về nghĩa vụ thông báo hoặc pháp lý, để bộ phận pháp chế hoặc chuyên gia trả lời, đừng tự kết luận.",
      },
      {
        type: "scenario",
        title: "Bạn vừa dán nhầm bảng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa dán một bảng có tên khách và số tiền vào công cụ AI chưa được phòng duyệt. Bấm gửi xong bạn mới nhận ra. Trưởng phòng đang ở ngay phòng bên cạnh.",
            choices: [
              { label: "Xoá cuộc trò chuyện và hy vọng không ai biết", next: "bad_delete" },
              { label: "Dừng lại, chụp màn hình cuộc trò chuyện, rồi soạn tin báo trưởng phòng", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Hai tuần sau bộ phận công nghệ thông tin phát hiện lưu lượng bất thường tới công cụ đó. Không ai biết bảng nào đã dán và khi nào, nên phải kiểm tra rất rộng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đang viết tin. Bạn cần chọn nội dung.",
            choices: [
              { label: "Viết: 10 giờ em dán bảng công nợ có tên khách vào công cụ chưa duyệt, em đã dừng, chưa dán thêm", next: "good" },
              { label: "Viết một đoạn dài giải thích vì sao hôm nay bạn quá bận nên mới dán nhầm", next: "s3" },
            ],
          },
          s3: {
            text: "Trưởng phòng đọc xong vẫn chưa biết bảng nào, công cụ nào, dữ liệu gì, và nhắn lại hỏi ba câu.",
            choices: [
              { label: "Trả lời đủ bốn mảnh ngay, không thêm lời bào chữa", next: "ok_late" },
              { label: "Nói thêm rằng chắc không có vấn đề gì nghiêm trọng", next: "bad_dismiss" },
            ],
          },
          bad_dismiss: {
            text: "Trưởng phòng không thể dựa vào đánh giá của bạn, vì bạn chưa biết công cụ xử lý dữ liệu thế nào. Họ phải tự kiểm tra lại từ đầu và mất cả buổi chiều.",
            ending: "bad",
          },
          ok_late: {
            text: "Trưởng phòng có đủ thông tin sau hai lượt nhắn và bắt đầu xử lý. Mất thêm vài phút, nhưng mọi việc vẫn trong tầm kiểm soát.",
            ending: "good",
          },
          good: {
            text: "Trưởng phòng đọc một lần là đủ, báo bộ phận công nghệ thông tin ngay, và hướng dẫn bạn bước tiếp theo trong vòng mười phút.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dừng dán, không xoá cuộc trò chuyện.",
          "Bước 2 - Ghi bốn mảnh: đã dán gì, công cụ nào, lúc nào, dữ liệu nào.",
          "Bước 3 - Gửi tin ngắn cho người phụ trách, không bào chữa.",
          "Bước 4 - Chờ hướng dẫn, rồi ghi ba dòng vào nhật ký.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Báo sớm, báo đủ, báo không đổ lỗi: đó là cách giữ nhiều đường lùi nhất cho cả bạn và công ty.",
          "Bài sau: đo lợi ích thật của AI sau ba tháng, lấy giờ tiết kiệm trừ giờ sửa lại.",
        ],
      },
    ],
  },
  {
    id: 2698,
    slug: "do-loi-ich-that-sau-ba-thang-gio-tiet-kiem-va-gio-sua-lai",
    title: "Chặng 64, Bài 19: Đo lợi ích thật sau ba tháng: giờ tiết kiệm trừ giờ sửa lại",
    subtitle: "AI nhanh hơn không có nghĩa là lợi hơn: phải trừ thời gian kiểm và sửa rồi mới biết.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau ba tháng, sếp hỏi: 'AI giúp phòng mình tiết kiệm được bao nhiêu giờ?' Nếu bạn chỉ đếm giờ bản nháp xong nhanh hơn, con số sẽ đẹp nhưng không thật, vì chưa tính thời gian đọc kiểm và sửa lại. Đo đúng là cách duy nhất để quyết định tiếp tục, dừng, hay đổi cách dùng.",
    openingQuestion:
      "Mỗi báo cáo tuần trước mất 45 phút, nay AI nháp trong 5 phút, còn bạn kiểm và sửa 20 phút. Lợi ích thật mỗi báo cáo là bao nhiêu?",
    openingOptions: [
      "20 phút (45 trừ 5 trừ 20)",
      "40 phút (45 trừ 5, quên trừ giờ kiểm)",
      "25 phút (45 trừ 20, bỏ qua giờ viết yêu cầu)",
      "45 phút (toàn bộ việc do AI làm)",
    ],
    correctOption: 0,
    explanation:
      "Lợi ích thật là thời gian cũ trừ toàn bộ thời gian mới: 45 trừ 5 (AI nháp) trừ 20 (kiểm và sửa) bằng 20 phút. Con số 40 bỏ quên giờ kiểm và sửa, đó là lỗi phổ biến nhất. Con số 25 trừ giờ sửa nhưng bỏ quên 5 phút AI chạy và soạn yêu cầu. Con số 45 coi như AI làm hết mà không cần người đọc, điều hầu như không bao giờ đúng với việc quan trọng.",
    diagram: [
      { label: "Ghi thời gian mỗi việc trước khi dùng AI", arrow: true },
      { label: "Ghi thời gian mới: nháp + kiểm + sửa", arrow: true },
      { label: "Trừ: giờ cũ trừ giờ mới, mỗi việc", arrow: true },
      { label: "Nhân với số lần mỗi tháng rồi so ba tháng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng hành chính ghi giờ làm bốn việc lặp lại trong ba tháng: soạn biên bản, tóm tắt email, làm báo cáo tuần, soạn thông báo. Khi trừ giờ kiểm và sửa, hai việc cho lợi ích rõ, một việc hoà vốn và một việc (thông báo có nhiều số liệu) lại mất thêm giờ. Phòng chỉ tiếp tục dùng AI ở ba việc đầu.",
    },
    quiz: [
      q(
        "Công thức nào tính giờ tiết kiệm ròng mỗi việc?",
        "Giờ làm cũ trừ giờ AI nháp trừ giờ kiểm và sửa",
        [
          "Giờ làm cũ trừ giờ AI nháp, không tính giờ kiểm vì bạn đọc nhanh",
          "Giờ AI nháp cộng giờ kiểm và sửa rồi chia đôi để lấy trung bình",
          "Giờ làm cũ nhân với tỷ lệ phần trăm công cụ hứa là tiết kiệm được",
        ],
        "Giờ tiết kiệm ròng là giờ cũ trừ toàn bộ giờ mới, gồm cả kiểm và sửa. Bỏ giờ kiểm thổi phồng lợi ích. Chia đôi tổng giờ mới không phải phép trừ nào liên quan tới giờ cũ. Tỷ lệ mà nhà cung cấp hứa không phải số liệu của chính việc bạn làm."
      ),
      q(
        "Việc cũ 40 phút, AI nháp 6 phút, kiểm và sửa 30 phút. Làm 20 lần một tháng thì tiết kiệm ròng bao nhiêu phút mỗi tháng?",
        "80 phút (= 20 × (40 − 6 − 30))",
        [
          "680 phút (= 20 × (40 − 6), quên giờ kiểm và sửa)",
          "200 phút (= 20 × (40 − 30), quên 6 phút AI nháp)",
          "4 phút (= 40 − 6 − 30, quên nhân với 20 lần một tháng)",
        ],
        "Mỗi lần tiết kiệm 40 trừ 6 trừ 30 bằng 4 phút, nhân 20 lần được 80 phút. Con số 680 bỏ giờ kiểm và sửa. Con số 200 bỏ thời gian AI nháp. Con số 4 là lợi ích một lần mà chưa nhân với số lần làm trong tháng."
      ),
      q(
        "Khi nào một việc dùng AI nên bị loại khỏi danh sách tiếp tục dùng?",
        "Khi giờ kiểm và sửa cộng giờ nháp lớn hơn hoặc bằng giờ làm cũ",
        [
          "Khi AI trả lời chậm hơn dự kiến trong một hai lần thử đầu tiên của hôm đó",
          "Khi đồng nghiệp trong phòng chưa quen dùng nên ít ai hào hứng",
          "Khi bản nháp của AI có một vài lỗi nhỏ lần đầu tiên",
        ],
        "Quyết định theo số liệu ròng: nếu giờ mới bằng hoặc vượt giờ cũ thì không có lợi. Một hai lần chậm hay vài lỗi nhỏ ban đầu là bình thường khi học. Sự chưa quen của đồng nghiệp là lý do đào tạo thêm, chưa phải bằng chứng việc đó không hợp."
      ),
      q(
        "Vì sao nên theo dõi ba tháng thay vì một tuần?",
        "Một tuần quá ít việc và người dùng còn đang làm quen nên số liệu dao động mạnh",
        [
          "Vì công cụ AI thường chỉ cho kết quả tốt sau đúng ba tháng sử dụng",
          "Vì sếp chỉ duyệt ngân sách theo quý nên không cần đo ngắn hơn",
          "Vì ba tháng là thời gian bắt buộc để cập nhật mọi số liệu",
        ],
        "Một tuần thì mẫu nhỏ, lại rơi vào lúc học cách dùng, nên con số lúc đầu thường xấu hơn hoặc đẹp hơn thực tế. Kết quả công cụ không phụ thuộc mốc ba tháng. Nhịp ngân sách của sếp không phải lý do khoa học, và không có thời hạn bắt buộc nào."
      ),
      q(
        "Chỉ đo giờ tiết kiệm có thể bỏ sót điều gì quan trọng?",
        "Chất lượng: bản nháp nhanh nhưng sai sót có thể làm mất lợi ích",
        [
          "Số lượng câu lệnh bạn đã gõ, vì nó cho biết bạn dùng giỏi tới đâu",
          "Tên của công cụ AI đã dùng, vì đó là cách so sánh duy nhất",
          "Mức độ hào hứng của cả phòng, vì đây mới là chỉ số chính",
        ],
        "Nhanh mà sai thì lợi ích mất đi ở khâu sửa hoặc ở lúc khách phát hiện. Số câu lệnh không cho biết lợi ích. Tên công cụ chỉ là nhãn, không phải chỉ số. Sự hào hứng có thể ghi nhận, nhưng không thay thế thời gian và chất lượng."
      ),
    ],
    keyTakeaways: [
      "Giờ tiết kiệm ròng = giờ cũ trừ giờ AI nháp trừ giờ kiểm và sửa.",
      "Nhân với số lần làm mỗi tháng rồi mới so sánh các việc với nhau.",
      "Đo ít nhất ba tháng, vì tuần đầu số liệu còn dao động.",
      "Việc có giờ mới bằng hoặc vượt giờ cũ thì không nên tiếp tục dùng AI cho nó.",
      "Theo dõi cả chất lượng, không chỉ tốc độ.",
    ],
    practicePrompt: {
      question:
        "Chị Hoa báo: 'AI giúp tôi tiết kiệm 30 phút mỗi báo cáo vì nháp chỉ mất 10 phút thay vì 40'. Chị quên tính điều gì?",
      options: [
        "Giờ chị đọc kiểm và sửa bản nháp trước khi gửi",
        "Giờ chị tốn để mở công cụ AI mỗi buổi sáng",
        "Giờ chị chờ người khác duyệt lại ở cuối tuần",
        "Giờ chị đã tiết kiệm được từ các việc khác trong phòng",
      ],
      correct: 0,
      explanation:
        "Chị chỉ so giờ nháp với giờ cũ, nên bỏ giờ kiểm và sửa, phần thường lớn nhất. Giờ mở công cụ thường nhỏ và khó đo riêng. Giờ chờ duyệt có ở cả hai cách làm nên không đổi phép trừ. Việc khác trong phòng là phép đo khác.",
    },
    summary: {
      keyIdea: "Lợi ích thật của AI là giờ tiết kiệm sau khi đã trừ giờ kiểm và sửa, nhân theo số lần làm.",
      formula: "Giờ tiết kiệm ròng = (giờ cũ − giờ AI nháp − giờ kiểm và sửa) × số lần mỗi tháng.",
      commonMistake: "Chỉ đếm giờ bản nháp xong nhanh hơn và quên giờ kiểm, sửa.",
      action: "Chọn ba việc lặp lại, ghi giờ cũ và giờ mới trong bốn tuần rồi tính ròng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn đã dùng AI ít nhất ba lần. Ghi ba con số từ các lần thật: giờ làm theo cách cũ (ước tính trung thực), giờ AI nháp và viết yêu cầu, giờ bạn kiểm và sửa. Tính giờ tiết kiệm ròng mỗi lần và nhân với số lần làm trong tháng.",
      secondary: "Nếu kết quả âm hoặc gần bằng 0, ghi thêm một dòng: nên đổi cách đưa việc cho AI hay bỏ việc này khỏi danh sách.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau ba tháng, sếp hỏi AI đã giúp phòng tiết kiệm được bao nhiêu giờ. Bài này dạy một phép trừ đơn giản để con số bạn báo là con số thật, không phải con số đẹp.",
      },
      {
        type: "feynman",
        title: "Đo lợi ích của AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc mua máy rửa bát. Quảng cáo nói nó rửa trong một giờ, nhưng bạn còn phải xếp bát vào, dỡ bát ra và rửa lại vài cái còn dính. Chỉ khi cộng hết mới biết mỗi tối bạn thật sự tiết kiệm bao nhiêu phút.",
        columns: ["Thành phần", "Máy rửa bát", "AI trong công việc"],
        rows: [
          ["Thời gian máy chạy", "Một giờ, bạn không phải đứng đó", "AI nháp, vài phút"],
          ["Công chuẩn bị", "Xếp bát vào máy", "Viết yêu cầu, đưa tài liệu"],
          ["Công kiểm và sửa", "Rửa lại bát còn dính", "Đọc kiểm, sửa chỗ sai"],
          ["Lợi ích thật", "Thời gian rửa tay cũ trừ mọi công mới", "Giờ làm cũ trừ mọi giờ mới"],
        ],
        oneLiner: "Lợi ích là giờ cũ trừ tất cả các giờ mới, kể cả giờ sửa lại phần AI làm chưa sạch.",
      },
      { type: "heading", text: "Một phép trừ, ba con số" },
      {
        type: "paragraph",
        text: "Mỗi việc cần ba con số: giờ làm theo cách cũ, giờ AI nháp (gồm cả viết yêu cầu), và giờ bạn kiểm rồi sửa. Số thứ ba thường là số người ta quên, và cũng là số làm lợi ích co lại nhiều nhất. Biểu đồ dưới đây cho thấy lợi ích ròng mỗi tháng thay đổi thế nào khi thời gian sửa lại tăng.",
      },
      {
        type: "chart",
        title: "Giờ tiết kiệm ròng mỗi tháng theo phút sửa lại mỗi việc",
        caption: "Số liệu minh hoạ. Kéo thanh trượt để thay số lần làm, giờ cũ và giờ AI nháp. Đường thấp là lợi ích thật sau khi trừ giờ sửa lại; đường cao là con số sai khi quên trừ.",
        kind: "line",
        xLabel: "Phút kiểm và sửa mỗi việc",
        yLabel: "Giờ tiết kiệm mỗi tháng",
        x: { from: 0, to: 60, step: 5 },
        params: [
          { id: "viec", label: "Số việc mỗi tháng", min: 5, max: 60, step: 5, value: 20 },
          { id: "truoc", label: "Phút làm theo cách cũ", min: 20, max: 90, step: 5, value: 45 },
          { id: "sau", label: "Phút AI nháp và viết yêu cầu", min: 5, max: 30, step: 5, value: 10 },
        ],
        series: [
          { label: "Giờ tiết kiệm ròng (đã trừ giờ sửa)", expr: "viec * (truoc - sau - x) / 60" },
          { label: "Con số sai (quên trừ giờ sửa)", expr: "viec * (truoc - sau) / 60" },
        ],
      },
      {
        type: "flow",
        title: "Từ ghi giờ tới quyết định sau ba tháng",
        steps: [
          { label: "Ghi giờ cũ", detail: "Trước khi dùng AI, ghi trung thực mỗi việc mất bao lâu. Ước chừng từ vài lần làm gần nhất, không đoán cho đẹp." },
          { label: "Ghi giờ mới ba phần", detail: "Mỗi lần dùng AI ghi ba số: phút viết yêu cầu và chờ nháp, phút đọc kiểm, phút sửa. Một bảng ba cột là đủ." },
          { label: "Tính ròng mỗi việc", detail: "Giờ cũ trừ ba số mới. Kết quả âm hoặc gần 0 nghĩa là việc đó chưa hợp với AI." },
          { label: "Nhân số lần mỗi tháng", detail: "Một việc tiết kiệm 4 phút nhưng làm 100 lần có thể đáng hơn một việc tiết kiệm 30 phút làm 2 lần." },
          { label: "Quyết định", detail: "Giữ, đổi cách đưa việc cho AI, hay bỏ. Xem lại sau ba tháng với cùng thước đo." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng tính lợi ích do một đồng nghiệp và AI lập",
        task: "Dữ kiện thật trong sổ ghi: báo cáo tuần mất 50 phút theo cách cũ; AI nháp và viết yêu cầu 10 phút; đọc kiểm và sửa 25 phút; làm 4 lần mỗi tháng. Đánh dấu các câu sai hoặc tự thêm.",
        segments: [
          { text: "Mỗi báo cáo tuần trước đây mất 50 phút." },
          { text: "Dùng AI, phần nháp và viết yêu cầu mất 10 phút." },
          { text: "Mỗi báo cáo tiết kiệm được 40 phút vì AI làm phần lớn việc.", error: "Phép tính này chỉ trừ 10 phút nháp và bỏ quên 25 phút kiểm và sửa. Lợi ích thật là 50 − 10 − 25 = 15 phút." },
          { text: "Làm 4 lần mỗi tháng, tổng tiết kiệm ròng khoảng 60 phút mỗi tháng." },
          { text: "Theo thống kê của ngành, AI giúp giảm 40% thời gian làm báo cáo nên bảng này là hợp lý.", error: "Không có thống kê nào trong sổ ghi. Con số 40% là AI tự thêm để bảng nghe có căn cứ; lợi ích phải tính từ giờ thật của chính bạn." },
          { text: "Nên đo tiếp ba tháng trước khi kết luận việc này có đáng dùng AI hay không." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tính ròng có trừ giờ sửa",
          text: "Báo được con số thật: 15 phút mỗi báo cáo. So sánh được công bằng giữa các việc. Thấy việc nào không đáng để bỏ. Sếp tin các con số sau này của bạn.",
        },
        right: {
          label: "Chỉ đếm giờ AI nháp nhanh",
          text: "Báo 40 phút mỗi báo cáo, gần gấp ba sự thật. Mọi việc đều trông có lợi nên không bỏ được việc nào. Khi sếp kiểm lại thì bạn mất uy tín.",
        },
      },
      {
        type: "callout",
        label: "Giờ của chính bạn, đừng lấy số của người khác",
        text: "Đừng dùng con số 'tiết kiệm bao nhiêu phần trăm' từ quảng cáo hay bài viết. Mỗi người làm việc khác nhau, nên chỉ có giờ ghi trong sổ của bạn mới đáng tin.",
      },
      {
        type: "scenario",
        title: "Sếp hỏi lợi ích sau ba tháng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sau ba tháng, sếp hỏi bạn về lợi ích thật khi dùng AI soạn thông báo nội bộ. Sổ ghi của bạn có: giờ cũ 30 phút, AI nháp 5 phút, kiểm và sửa 28 phút, làm khoảng 10 lần mỗi tháng.",
            choices: [
              { label: "Báo: 'Tiết kiệm 25 phút mỗi thông báo, 250 phút mỗi tháng'", next: "bad_number" },
              { label: "Tính: 30 trừ 5 trừ 28 bằng âm 3 phút mỗi lần, rồi báo đúng số đó", next: "s2" },
            ],
          },
          bad_number: {
            text: "Sếp quyết định mở rộng việc dùng AI cho cả phòng dựa trên con số 250 phút. Vài tuần sau mọi người phát hiện không ai tiết kiệm được gì và phải bỏ công cụ trong lúc ngại ngùng.",
            ending: "bad",
          },
          s2: {
            text: "Sếp hỏi: 'Vậy có nên bỏ không?' Sổ ghi cho thấy phần sửa mất nhiều vì thông báo có nhiều số liệu cần đối chiếu.",
            choices: [
              { label: "Đề xuất thử đổi cách: đưa số liệu thật cho AI, kỳ vọng giờ sửa giảm, đo lại một tháng", next: "good" },
              { label: "Đề xuất bỏ hẳn AI cho mọi việc của phòng vì việc này không có lợi", next: "bad_overreact" },
            ],
          },
          bad_overreact: {
            text: "Phòng bỏ luôn cả các việc khác đang có lợi ròng rõ ràng như biên bản họp. Sau hai tháng mọi người lại phải làm tay phần việc đó.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý đo thêm một tháng. Bạn giữ AI ở các việc có lợi, thử đổi cách ở việc thông báo, và giữ cùng một bảng ba cột để so sánh.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn ba việc lặp lại mỗi tháng và ghi giờ cũ của chúng.",
          "Bước 2 - Mỗi lần dùng AI, ghi ba số: nháp, kiểm, sửa.",
          "Bước 3 - Tính ròng từng việc rồi nhân với số lần mỗi tháng.",
          "Bước 4 - Sau ba tháng, giữ, đổi cách hoặc bỏ từng việc theo số ròng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đo bằng giờ cũ trừ mọi giờ mới, rồi nhân với số lần: con số đó mới nói thật.",
          "Bài cuối chặng: gom quy tắc, bảng rủi ro, danh sách công cụ, nhật ký và kế hoạch sự cố thành một bộ hồ sơ trình sếp.",
        ],
      },
    ],
  },
  {
    id: 2699,
    slug: "capstone-bo-ho-so-dung-ai-co-trach-nhiem-cho-mot-phong",
    title: "Chặng 64, Bài 20: Capstone: bộ hồ sơ dùng AI có trách nhiệm cho một phòng",
    subtitle: "Năm phần ngắn ghép thành một bộ: quy tắc, bảng rủi ro, công cụ được duyệt, nhật ký, kế hoạch sự cố.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã đi qua quy tắc, bảng rủi ro, danh sách công cụ, nhật ký và kế hoạch sự cố, nhưng mỗi thứ nằm ở một nơi. Sếp không đọc năm tài liệu rời; sếp cần một bộ gọn để hiểu phòng đang dùng AI thế nào và ai chịu trách nhiệm điều gì. Bài cuối chặng này giúp bạn ghép lại thành một bộ trình bày được trong năm phút.",
    openingQuestion:
      "Bạn sắp trình sếp bộ hồ sơ dùng AI của phòng. Cách sắp xếp nào khiến sếp nắm được bức tranh nhanh nhất?",
    openingOptions: [
      "Một trang tóm tắt, rồi năm phần ngắn mỗi phần một trang",
      "Năm tài liệu dài nộp riêng, sếp tự đọc hết rồi tự ghép lại",
      "Một bài thuyết trình hai mươi trang có nhiều biểu đồ đẹp",
      "Chỉ gửi danh sách công cụ, vì đó là phần sếp quan tâm nhất",
    ],
    correctOption: 0,
    explanation:
      "Sếp cần bức tranh trước chi tiết: một trang tóm tắt nói phòng dùng AI vào việc gì, theo quy tắc nào, ai chịu trách nhiệm, khi sự cố thì làm gì. Mỗi phần một trang giúp tra cứu khi cần. Năm tài liệu dài buộc sếp tự ghép và dễ bỏ qua. Hai mươi trang biểu đồ che mất nội dung. Chỉ gửi danh sách công cụ bỏ thiếu quy tắc, rủi ro và kế hoạch sự cố.",
    diagram: [
      { label: "Gom năm phần đã làm: quy tắc, rủi ro, công cụ, nhật ký, sự cố", arrow: true },
      { label: "Rút mỗi phần còn một trang", arrow: true },
      { label: "Viết một trang tóm tắt ghép cả năm", arrow: true },
      { label: "Kiểm chéo: tên người, công cụ và quy tắc khớp nhau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: trưởng phòng marketing gom năm trang của phòng thành một bộ kèm một trang tóm tắt và trình giám đốc trong buổi họp mười lăm phút. Giám đốc chỉ hỏi ba câu, tất cả đều trả lời được từ bộ hồ sơ, và chốt cho phép phòng tiếp tục dùng AI theo đúng bộ quy tắc đó.",
    },
    quiz: [
      q(
        "Năm phần nào cấu thành bộ hồ sơ dùng AI có trách nhiệm của một phòng?",
        "Quy tắc, bảng rủi ro, danh sách công cụ, nhật ký, kế hoạch sự cố",
        [
          "Quy tắc, danh sách công cụ, bảng giá, hợp đồng nhà cung cấp, báo cáo doanh thu",
          "Quy tắc, nhật ký, lịch đào tạo, bảng lương, biên bản họp",
          "Danh sách công cụ, mật khẩu của phòng, nhật ký, kế hoạch mua sắm, bảng rủi ro",
        ],
        "Bộ hồ sơ gồm năm phần đã học: quy tắc, bảng rủi ro, công cụ được duyệt, nhật ký, kế hoạch sự cố. Hợp đồng nhà cung cấp, bảng giá, bảng lương hay mật khẩu đều không thuộc bộ này, và đặt mật khẩu vào hồ sơ trình sếp còn là một rủi ro riêng."
      ),
      q(
        "Vì sao cần một trang tóm tắt ở đầu bộ hồ sơ?",
        "Để người đọc nắm bức tranh trước khi tra chi tiết từng phần",
        [
          "Để thay cho năm phần còn lại khi sếp không có thời gian đọc",
          "Để người soạn không phải kiểm tra sự khớp của các phần",
          "Để bộ hồ sơ nhìn dày hơn và có vẻ công phu hơn",
        ],
        "Trang tóm tắt dẫn người đọc vào chi tiết, không thay cho chi tiết. Nó không giúp bỏ bước kiểm khớp giữa các phần, và độ dày không phải mục đích: một bộ hồ sơ tốt càng gọn càng dễ dùng."
      ),
      q(
        "Khi kiểm chéo, lỗi nào cần bắt nhất?",
        "Công cụ trong nhật ký không có trong danh sách được duyệt",
        [
          "Font chữ ở trang tóm tắt khác với font ở các trang còn lại",
          "Một bảng có nhiều hàng hơn bảng còn lại trong bộ hồ sơ",
          "Ngày soạn các phần lệch nhau vài ngày trong cùng một tuần",
        ],
        "Công cụ lạ trong nhật ký cho thấy quy tắc và thực tế đang lệch, đó mới là lỗi thật. Font, số hàng bảng hay lệch ngày vài hôm chỉ là lỗi hình thức; chúng đáng sửa nhưng không ảnh hưởng tới việc phòng có dùng AI đúng quy tắc hay không."
      ),
      q(
        "Nhờ AI giúp ghép bộ hồ sơ, bạn nên đưa cho nó gì?",
        "Năm phần bạn đã viết, với lệnh chỉ tóm tắt và đánh dấu chỗ không khớp",
        [
          "Chỉ tên phòng và nhờ AI tự viết mọi phần còn lại",
          "Năm phần kèm số liệu thật của khách để AI viết ví dụ",
          "Một bộ hồ sơ của công ty khác trên mạng để AI chép theo",
        ],
        "AI giỏi tóm tắt và so khớp nội dung bạn đã có. Để nó tự viết thì nội dung là bịa. Dữ liệu khách hàng không nên đưa vào. Chép hồ sơ công ty khác không phản ánh công cụ, rủi ro và người phụ trách thật của phòng bạn."
      ),
      q(
        "Ai nên là người ký hoặc duyệt bộ hồ sơ cuối cùng?",
        "Người có thẩm quyền về cách phòng làm việc, thường là sếp trực tiếp",
        [
          "Chính AI đã hỗ trợ ghép bộ hồ sơ, vì nó nắm được toàn bộ nội dung",
          "Bất kỳ đồng nghiệp nào trong phòng vì ai cũng có liên quan",
          "Không ai cả, vì hồ sơ chỉ là tài liệu tham khảo cho vui",
        ],
        "Bộ hồ sơ có giá trị khi có người chịu trách nhiệm. AI không thể ký hay chịu trách nhiệm. Một đồng nghiệp bất kỳ không có thẩm quyền cam kết cho cả phòng. Hồ sơ không ai duyệt sẽ bị quên khi có sự cố."
      ),
    ],
    keyTakeaways: [
      "Bộ hồ sơ gồm năm phần: quy tắc, bảng rủi ro, công cụ, nhật ký, kế hoạch sự cố.",
      "Mỗi phần một trang, cộng một trang tóm tắt mở đầu.",
      "Kiểm chéo: tên người, công cụ và quy tắc phải khớp giữa các phần.",
      "AI giúp tóm tắt và so khớp, nhưng nội dung là của bạn.",
      "Phải có một người có thẩm quyền duyệt và nhận trách nhiệm.",
    ],
    practicePrompt: {
      question:
        "Trong bộ hồ sơ, danh sách công cụ ghi 3 công cụ, nhưng nhật ký tháng qua có dòng dùng một công cụ thứ tư. Nên làm gì?",
      options: [
        "Hỏi người đã dùng, rồi đề nghị thêm vào danh sách hoặc ngừng dùng",
        "Xoá dòng đó khỏi nhật ký cho hồ sơ khớp nhau",
        "Bỏ qua vì chỉ có một dòng nên không đáng để bận tâm",
        "Thêm công cụ thứ tư vào danh sách ngay mà không cần ai duyệt cho nhanh",
      ],
      correct: 0,
      explanation:
        "Chỗ lệch là tín hiệu cần xử lý đúng quy trình: hỏi người dùng và quyết định thêm hay ngừng. Xoá dòng nhật ký là che giấu. Bỏ qua một dòng thì lần sau có thêm nhiều dòng khác. Thêm công cụ không qua duyệt phá chính ý nghĩa của danh sách được duyệt.",
    },
    summary: {
      keyIdea: "Bộ hồ sơ tốt gọn, khớp giữa các phần, và có một người chịu trách nhiệm.",
      formula: "Quy tắc + bảng rủi ro + công cụ + nhật ký + kế hoạch sự cố + trang tóm tắt = bộ hồ sơ trình được.",
      commonMistake: "Nộp năm tài liệu rời, dài, không khớp nhau, và không ai duyệt.",
      action: "Ghép bộ hồ sơ đầu tiên của phòng, kể cả khi mỗi phần mới chỉ có nửa trang.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy phần bạn đã soạn ở các bài trước (quy tắc, bảng rủi ro, công cụ, nhật ký, kế hoạch sự cố), chép mỗi phần một trang vào cùng một tệp. Viết trang tóm tắt năm câu, mỗi câu một phần. Sau đó đối chiếu ba điểm: tên người phụ trách, tên công cụ, và việc nào cần duyệt có khớp giữa các trang không.",
      secondary: "Đặt lịch mười lăm phút với sếp trong tuần này để trình bộ hồ sơ, kể cả khi chưa hoàn hảo.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có đủ các mảnh: quy tắc, bảng rủi ro, danh sách công cụ, nhật ký và kế hoạch sự cố. Bài cuối chặng ghép chúng thành một bộ gọn để sếp đọc trong năm phút.",
      },
      {
        type: "feynman",
        title: "Bộ hồ sơ dùng AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sổ hướng dẫn gia đình khi bạn đi vắng: một trang đầu nói ai lo việc gì, rồi các trang sau ghi cách dùng bình gas, số thợ điện, việc cần làm khi mất điện. Người ở nhà không phải đoán, chỉ cần mở đúng trang.",
        columns: ["Thành phần", "Sổ hướng dẫn gia đình", "Bộ hồ sơ dùng AI"],
        rows: [
          ["Trang đầu", "Ai lo việc gì", "Tóm tắt: phòng dùng AI vào việc gì, ai chịu trách nhiệm"],
          ["Quy định", "Cách dùng bình gas an toàn", "Quy tắc dùng AI cho việc thường ngày"],
          ["Danh bạ", "Số thợ điện, thợ nước", "Danh sách công cụ được duyệt và người phụ trách"],
          ["Khi có chuyện", "Việc cần làm khi mất điện", "Kế hoạch sự cố: dừng, báo, khoanh, sửa, ghi"],
        ],
        oneLiner: "Một trang đầu cho bức tranh, các trang sau để tra cứu: người đọc không phải đoán.",
      },
      { type: "heading", text: "Vì sao năm phần rời vẫn chưa đủ" },
      {
        type: "paragraph",
        text: "Năm phần nằm ở năm nơi sẽ lệch nhau: công cụ trong nhật ký không khớp danh sách, người phụ trách ghi khác tên ở hai trang. Khi ghép vào một bộ, bạn buộc phải kiểm sự khớp đó. Cũng chính lúc đó bạn thấy phần nào còn thiếu, việc mà từng mảnh riêng lẻ không cho bạn thấy.",
      },
      {
        type: "flow",
        title: "Từ năm mảnh tới một bộ hồ sơ",
        steps: [
          { label: "Gom năm phần", detail: "Quy tắc một trang, bảng rủi ro, danh sách công cụ được duyệt, mẫu nhật ký, kế hoạch sự cố năm bước." },
          { label: "Rút mỗi phần còn một trang", detail: "Cắt những gì không ai đọc. Nếu một phần cần hơn một trang, đó là dấu hiệu nó chưa đủ rõ." },
          { label: "Viết trang tóm tắt", detail: "Năm câu, mỗi câu một phần: dùng AI vào việc gì, theo quy tắc nào, công cụ nào, ghi ở đâu, khi sự cố làm gì." },
          { label: "Kiểm chéo", detail: "Tên người, tên công cụ và loại việc cần duyệt phải khớp giữa các trang. Chỗ lệch là chỗ cần hỏi." },
          { label: "Trình và xin duyệt", detail: "Mười lăm phút với sếp. Người có thẩm quyền duyệt và ghi tên, ngày để bộ hồ sơ có người chịu trách nhiệm." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI ghép trang tóm tắt cho bộ hồ sơ",
        task: "Bạn đã có năm phần viết sẵn và dùng một công cụ đã được duyệt. Lắp prompt để AI tóm tắt và so khớp, không tự viết thêm nội dung.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Chỉ nói tên phòng và nhờ AI tự viết các phần còn lại.", feedback: "AI sẽ bịa quy tắc và người phụ trách nghe rất hợp lý, nhưng không phải của phòng bạn." },
              { text: "Dán năm phần tôi đã viết (đã bỏ tên khách và số liệu nhạy cảm) và nhờ tóm tắt.", good: true, feedback: "Nội dung thật là của bạn, AI chỉ làm việc nó giỏi: rút gọn và sắp xếp." },
            ],
          },
          {
            id: "task",
            label: "Việc cần AI làm",
            options: [
              { text: "Viết bộ hồ sơ hoàn chỉnh, thêm các điểm còn thiếu theo kinh nghiệm của các công ty khác.", feedback: "AI thêm quy định và con số nghe chuyên nghiệp nhưng không ai duyệt, và bộ hồ sơ có những điều phòng chưa hề đồng ý." },
              { text: "Viết trang tóm tắt năm câu, mỗi câu một phần, và liệt kê chỗ các phần không khớp nhau.", good: true, feedback: "Hai việc rõ ràng: tóm tắt và so khớp. Chỗ không khớp là thứ bạn cần nhất trước khi trình sếp." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Làm cho thuyết phục và mạnh mẽ để sếp dễ chấp thuận.", feedback: "AI sẽ tô hồng: bỏ bớt rủi ro và làm phóng đại lợi ích, khiến sếp duyệt trên thông tin lệch." },
              { text: "Chỉ dùng thông tin trong năm phần; chỗ thiếu ghi [cần bổ sung]; không thêm quy định mới.", good: true, feedback: "Giới hạn này giữ nội dung đúng nguồn, và các chỗ [cần bổ sung] chính là việc bạn phải làm tiếp." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "task", "limit"],
            text: "Trang tóm tắt:\n1. Phòng dùng AI để soạn nháp thư và tóm tắt tài liệu, không dùng cho quyết định cuối cùng.\n2. Quy tắc: không đưa dữ liệu khách hàng vào công cụ chưa duyệt.\n3. Công cụ: hai công cụ trong danh sách được duyệt.\n4. Nhật ký: ghi việc, công cụ, người duyệt.\n5. Sự cố: dừng, báo, khoanh phạm vi, sửa, ghi lại.\n\nChỗ không khớp: nhật ký nhắc một công cụ không có trong danh sách; người phụ trách sự cố ghi [cần bổ sung].",
          },
          {
            requires: ["input"],
            text: "Phòng chúng tôi cam kết dùng AI có trách nhiệm cao nhất, bảo đảm an toàn tuyệt đối và tuân thủ mọi quy định hiện hành...\n\n(Tô hồng và nói quá: AI thêm cam kết mà phòng chưa hề thông qua.)",
          },
          {
            text: "Bộ hồ sơ mẫu: 1. Quy tắc: cấm mọi công cụ AI ngoài danh sách. 2. Phạt 500.000 đồng cho mỗi vi phạm. 3. Báo cáo lên giám đốc hàng tuần...\n\n(AI bịa quy tắc và mức phạt chưa ai quyết định.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bộ hồ sơ gọn, khớp, có người duyệt",
          text: "Một trang tóm tắt và năm trang chi tiết. Sếp đọc trong năm phút và hỏi được đúng câu. Chỗ lệch được bắt trước khi trình. Khi có sự cố, người ta biết mở trang nào.",
        },
        right: {
          label: "Năm tài liệu rời, dài",
          text: "Sếp phải tự ghép và đa số bỏ qua. Công cụ trong nhật ký lệch danh sách mà không ai biết. Không có người duyệt nên khi sự cố, mỗi người hiểu một kiểu.",
        },
      },
      {
        type: "callout",
        label: "Những điều cần người có chuyên môn xem",
        text: "Nếu bộ hồ sơ chạm tới dữ liệu cá nhân, hợp đồng với khách hoặc nghĩa vụ pháp lý, nhờ bộ phận pháp chế hoặc chuyên gia xem lại trước khi trình. Bộ hồ sơ này là cách làm việc của phòng, không phải ý kiến pháp lý.",
      },
      {
        type: "scenario",
        title: "Mười lăm phút trình sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có mười lăm phút với sếp. Bạn đã ghép bộ hồ sơ có trang tóm tắt và năm phần. Khi kiểm chéo, bạn thấy nhật ký có dòng dùng một công cụ chưa có trong danh sách được duyệt.",
            choices: [
              { label: "Xoá dòng đó khỏi nhật ký để bộ hồ sơ trông khớp nhau", next: "bad_hide" },
              { label: "Giữ nguyên dòng, ghi chú ở trang tóm tắt: 'có một công cụ cần xin duyệt'", next: "s2" },
            ],
          },
          bad_hide: {
            text: "Sếp hỏi: 'Nhật ký chỉ có hai công cụ, sao tôi thấy nhân viên dùng công cụ khác?' Bạn không trả lời được và toàn bộ bộ hồ sơ bị nghi ngờ.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đọc trang tóm tắt và dừng lại ở ghi chú. Sếp hỏi: 'Công cụ đó dùng vào việc gì, dữ liệu nào đã vào?'",
            choices: [
              { label: "Trả lời đúng theo nhật ký: việc soạn thư nháp, chưa có dữ liệu khách; đề nghị xin duyệt hoặc ngừng", next: "good" },
              { label: "Nói: 'Chắc không có dữ liệu gì nhạy cảm đâu ạ' dù bạn chưa kiểm", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Sếp yêu cầu kiểm tra, và hoá ra một nhân viên từng dán danh sách khách vào công cụ đó. Lời bạn nói trong buổi họp trở thành điều bạn phải giải thích.",
            ending: "bad",
          },
          good: {
            text: "Sếp duyệt bộ hồ sơ, yêu cầu phòng xin phê duyệt chính thức hoặc ngừng công cụ thứ tư, và ghi tên, ngày duyệt vào trang đầu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gom năm phần và rút mỗi phần còn một trang.",
          "Bước 2 - Nhờ AI viết trang tóm tắt và đánh dấu chỗ không khớp, không thêm nội dung.",
          "Bước 3 - Tự kiểm chéo tên người, tên công cụ và việc cần duyệt.",
          "Bước 4 - Trình sếp mười lăm phút và xin duyệt, ghi tên và ngày.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang cho bức tranh, năm trang để tra, một người chịu trách nhiệm: đó là dùng AI có trách nhiệm ở cấp một phòng.",
          "Bạn đã xong Chặng 64. Mang bộ hồ sơ này tới buổi họp đầu tiên của phòng.",
        ],
      },
    ],
  },
];
