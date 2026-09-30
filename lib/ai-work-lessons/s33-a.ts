import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 33, bài 1-5. Giáo trình: scripts/curriculum/stage-33.json.
// Không bài nào dựa vào một tính năng riêng của công cụ AI: chỉ dạy cách giao việc,
// cách đọc lại kết quả và cách kiểm trước khi gửi. Mọi số liệu là số liệu minh hoạ.

// Viết đáp án đúng đầu tiên; vị trí được cân lại lúc build (lib/lesson-quiz-balance.js).
const Q = (question: string, opts: [string, string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [...opts],
  correct: 0,
  explanation,
});

export const S33_A_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 1 ─────────────────────────
  {
    id: 2060,
    slug: "giao-viec-mot-trang-cho-nguoi-moi",
    title: "Chặng 33, Bài 1: Giao một việc bằng một trang giấy",
    subtitle: "Sáng thứ Hai bạn nói miệng hai phút, chiều thứ Năm nhận về thứ không như ý. Lỗi hiếm khi nằm ở người nhận.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người mới làm trưởng nhóm thường giao việc bằng một câu miệng vì sợ mất thời gian, rồi mất gấp ba thời gian để sửa. Một trang giao việc viết trong năm phút, có AI phụ soạn, giúp người nhận biết chính xác phải nộp gì, khi nào, thế nào là đạt và hỏi ai khi vướng.",
    openingQuestion:
      "Sáng thứ Hai bạn nói với Hà: 'Em làm giúp chị bản báo cáo tồn kho nhé, tuần này gửi chị.' Thứ Năm Hà gửi bản dài 12 trang, tính đến cuối tháng trước, còn bạn cần một trang tính đến thứ Ba. Nguyên nhân chính là gì?",
    openingOptions: [
      "Lời giao không nói rõ kết quả cần, hạn và mức đạt",
      "Hà làm việc chưa nghiêm túc nên tự ý làm dài",
      "Bạn giao quá sớm trong tuần nên Hà quên bớt ý",
      "Hà cần thêm thời gian vì báo cáo tồn kho vốn khó làm",
    ],
    correctOption: 0,
    explanation:
      "Câu 'làm giúp chị bản báo cáo tồn kho, tuần này gửi chị' không nói báo cáo dài mấy trang, tính đến ngày nào, hạn là thứ mấy, và dùng để làm gì. Người nhận buộc phải tự điền những chỗ trống đó bằng phỏng đoán, và mỗi người phỏng đoán một kiểu. Hà không lười và cũng không kém, chị chỉ điền khác bạn. Giao sớm hay muộn trong tuần không đổi được điều này, và độ khó của báo cáo cũng không phải nguyên nhân: cùng một câu giao, người giỏi nhất cũng sẽ đoán sai theo cách riêng của họ.",
    diagram: [
      { label: "Bối cảnh: việc này dùng để làm gì", arrow: true },
      { label: "Kết quả cần: nộp cái gì, dài bao nhiêu", arrow: true },
      { label: "Hạn và mức đạt: khi nào, thế nào là xong", arrow: true },
      { label: "Người quyết định: vướng thì hỏi ai", arrow: true },
      { label: "Người nhận đọc một trang và bắt tay làm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm hành chính 5 người",
      description:
        "Trưởng nhóm thường nhờ việc bằng tin nhắn miệng, hai lần trong ba lần phải làm lại. Sau đó chị viết một trang cho mỗi việc lớn: dùng để làm gì, nộp gì, hạn nào, đạt là gì, hỏi ai. Con số hai trên ba là số liệu minh hoạ, nhưng cái thay đổi thì có thật: người nhận ngừng phải đoán, và trưởng nhóm ngừng phải sửa.",
    },
    quiz: [
      Q(
        "Một trang giao việc tốt gồm những phần nào?",
        [
          "Kết quả cần có, hạn, mức thế nào là đạt và ai quyết định khi vướng",
          "Danh sách từng bước làm chi tiết, tính bằng phút cho người nhận",
          "Lời động viên và mức thưởng nếu làm xong sớm hơn hạn đã hẹn",
          "Tên người giao, tên người nhận và chữ ký xác nhận của hai bên",
        ],
        "Người nhận cần biết nộp gì, khi nào, đạt là gì và hỏi ai. Liệt kê từng bước theo phút là quản lý vi mô: nó không nói kết quả cần ra sao. Lời động viên và mức thưởng không giúp người nhận làm đúng, còn chữ ký chỉ là thủ tục, không cho biết phải nộp gì.",
      ),
      Q(
        "Vì sao nên viết lý do và mục đích của việc, không chỉ tên việc?",
        [
          "Để người nhận tự đưa ra lựa chọn đúng khi gặp chỗ chưa rõ",
          "Để người nhận thấy việc này quan trọng và làm nhanh hơn",
          "Để trang giao việc trông đầy đủ và giống một văn bản chuẩn",
          "Để người nhận biết ai là người chịu trách nhiệm nếu sai",
        ],
        "Khi biết bản báo cáo dùng để sếp quyết định nhập hàng, người nhận sẽ tự hiểu vì sao cần con số tồn tới thứ Ba mà không phải hỏi. Nhấn mạnh quan trọng chỉ tạo áp lực, không cho thông tin. Trang trông đầy đủ không phải mục đích, và việc quy trách nhiệm là chuyện khác hẳn với giúp người ta làm đúng.",
      ),
      Q(
        "Chị viết 'hạn: sớm nhất có thể'. Chỗ nào cần sửa?",
        [
          "Ghi ngày và giờ cụ thể, ví dụ 15h thứ Năm",
          "Đổi thành 'hạn: gấp' và in đậm để người nhận chú ý",
          "Thêm 'quan trọng' và gạch dưới để nhấn mạnh với người nhận",
          "Giữ nguyên, vì người giỏi sẽ tự biết là nên nộp lúc nào",
        ],
        "'Sớm nhất có thể' với người này là chiều nay, với người khác là cuối tuần. Ngày giờ cụ thể là thứ duy nhất hai người hiểu giống nhau. 'Gấp' hay in đậm vẫn chưa nói là gấp tới lúc nào, và giả định người giỏi tự biết chính là nguồn gốc của kiểu giao việc bị hiểu lệch.",
      ),
      Q(
        "Khi nhờ AI soạn trang giao việc, phần nào bạn PHẢI tự cung cấp?",
        [
          "Kết quả cần, hạn thật và người quyết định",
          "Giọng văn lịch sự cho một trang giao việc",
          "Tiêu đề trang cho ngắn gọn và dễ nhớ",
          "Cách trình bày các mục thành gạch đầu dòng",
        ],
        "AI không biết hạn thật, người duyệt thật hay bản báo cáo dùng vào việc gì trong nhóm bạn; nếu bạn bỏ trống, nó sẽ bịa cho có. Giọng văn, tiêu đề và cách trình bày là việc AI làm tốt, và bạn sửa được trong vài giây khi đọc lại.",
      ),
      Q(
        "AI viết trang giao việc có dòng 'Hạn: 17h thứ Sáu' nhưng bạn chưa hề nói hạn. Nên làm gì?",
        [
          "Xoá hoặc thay bằng hạn thật của bạn trước khi gửi",
          "Giữ nguyên vì AI thường chọn hạn hợp lý cho công việc",
          "Gửi luôn rồi bảo người nhận hỏi lại nếu thấy không hợp",
          "Hỏi lại AI 'hạn này đúng không' và tin câu trả lời của nó",
        ],
        "Hạn là thông tin chỉ bạn biết; AI điền một hạn nghe hợp lý, nhưng nó có thể trùng buổi họp lớn của người nhận hoặc lệch với lịch của sếp. Gửi đi rồi bắt người nhận hỏi lại là đẩy việc soát lỗi sang người khác. Hỏi lại AI không phải kiểm chứng vì nó không có dữ kiện nào thêm.",
      ),
    ],
    keyTakeaways: [
      "Một trang giao việc gồm: mục đích, kết quả cần, hạn cụ thể, mức đạt, người quyết định.",
      "Hạn phải là ngày và giờ, không phải 'sớm' hay 'gấp'.",
      "AI giúp viết trơn tru, nhưng hạn, người duyệt và mức đạt phải do bạn nói.",
      "Đọc lại trang như thể mình là người nhận chưa nghe bạn nói câu nào.",
    ],
    practicePrompt: {
      question:
        "Bạn giao Hà làm bản tổng hợp doanh số quý. Câu nào giúp Hà làm đúng ngay lần đầu?",
      options: [
        "Một trang tổng hợp doanh số quý 3 theo từng sản phẩm, nộp 15h thứ Năm, anh Nam duyệt",
        "Tổng hợp doanh số quý giúp chị, làm sớm nhé, cứ làm sao cho đẹp là được",
        "Chị tin em, cứ làm theo cách em thấy hợp lý, xong thì gửi chị lúc nào cũng được nhé em",
        "Làm giống bản quý trước nhé, chị không nhớ rõ nhưng em xem lại là ra",
      ],
      correct: 0,
      explanation:
        "Câu đầu có kết quả (một trang, theo sản phẩm), hạn (15h thứ Năm) và người duyệt. Ba câu còn lại đều để người nhận tự điền chỗ trống: 'đẹp', 'lúc nào cũng được' hay 'giống bản trước' đều là mơ hồ có vẻ lịch sự.",
    },
    summary: {
      keyIdea: "Việc bị làm sai thường là việc bị giao thiếu: người nhận buộc phải đoán những gì bạn chưa viết.",
      formula: "Mục đích + kết quả cần + hạn cụ thể + mức đạt + người quyết định = một trang giao việc.",
      commonMistake: "Nói miệng vì tiết kiệm hai phút, rồi mất hai giờ sửa sản phẩm làm lệch.",
      action: "Viết một trang giao việc cho việc bạn sắp giao tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn sắp giao (hoặc vừa giao bằng lời) trong tuần này. Gõ vào AI mục đích, kết quả cần, hạn thật, mức đạt và người quyết định, nhờ nó xếp thành một trang. Đọc lại, sửa mọi chỗ nó tự thêm, rồi gửi cho người nhận. Ngày mai, ghi lại người nhận có hỏi lại điều gì không.",
      secondary: "Nếu người nhận vẫn hỏi lại, câu hỏi đó chính là phần còn thiếu trong trang giao việc.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn giao việc miệng trong hai phút. Chiều thứ Năm bạn nhận về một thứ khác với thứ trong đầu mình. Bài này cho bạn một trang giấy để hai bên cùng hiểu một việc, và cách nhờ AI soạn nó nhanh.",
      },
      {
        type: "feynman",
        title: "Giao việc bằng một trang giấy đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ người hàng xóm đi chợ giúp. Nói 'mua giúp chị ít cá' thì có thể được cá thu đắt tiền. Nói 'hai con cá diêu hồng cỡ 500 gram, dưới 100 nghìn, mua trước 5 giờ chiều, không có thì gọi chị' thì bạn nhận đúng thứ mình cần. Trang giao việc chính là tờ giấy đi chợ.",
        columns: ["Phần", "Tờ giấy đi chợ", "Trang giao việc"],
        rows: [
          ["Mua cái gì", "Hai con cá diêu hồng cỡ 500 gram", "Kết quả cần: một trang tổng hợp tồn kho"],
          ["Bao giờ", "Trước 5 giờ chiều", "Hạn: 15h thứ Năm"],
          ["Thế nào là được", "Cá còn tươi, dưới 100 nghìn", "Mức đạt: số tính đến hết thứ Ba, không quá một trang"],
          ["Không có thì sao", "Gọi chị trước khi mua thứ khác", "Người quyết định: hỏi anh Nam, đừng tự đổi phạm vi"],
        ],
        oneLiner: "Trang giao việc là tờ giấy đi chợ: người nhận đi một lần là đúng, không phải quay lại hỏi.",
      },
      { type: "heading", text: "Vì sao giao miệng lại hỏng" },
      {
        type: "paragraph",
        text: "Khi bạn nói 'làm giúp chị bản báo cáo tồn kho', trong đầu bạn có sẵn năm điều: báo cáo dùng làm gì, dài mấy trang, tính đến ngày nào, hạn khi nào, ai duyệt. Người nhận chỉ nghe được câu bạn nói. Bốn điều còn lại họ tự đoán, và đoán theo cách hợp lý với mình chứ không phải với bạn.",
      },
      {
        type: "comparison",
        left: {
          label: "Giao miệng",
          text: "Nhanh với người giao: hai phút. Người nhận tự điền chỗ trống. Kết quả là bản dài 12 trang, tính đến sai ngày, phải làm lại.",
        },
        right: {
          label: "Giao bằng một trang",
          text: "Mất năm phút để viết, nhưng người nhận biết trước kết quả, hạn, mức đạt, người duyệt. Ít khi phải làm lại, ít phải nhắn hỏi.",
        },
      },
      { type: "heading", text: "Năm dòng của trang giao việc" },
      {
        type: "list",
        items: [
          "Mục đích: việc này dùng để làm gì, ai sẽ đọc kết quả.",
          "Kết quả cần: nộp cái gì, dài hoặc rộng cỡ nào, ở dạng nào.",
          "Hạn: ngày và giờ cụ thể, không viết 'sớm' hay 'gấp'.",
          "Mức đạt: thế nào là xong, thế nào là chưa đạt.",
          "Người quyết định: khi vướng thì hỏi ai, việc nào người nhận được tự quyết.",
        ],
      },
      {
        type: "flow",
        title: "Từ ý trong đầu đến trang giao việc dùng được",
        steps: [
          {
            label: "Bạn gõ ý thô cho AI",
            detail:
              "Gõ vài dòng: việc gì, để làm gì, hạn nào, ai duyệt. Chưa cần văn hay, chỉ cần các dữ kiện thật của bạn.",
          },
          {
            label: "AI xếp thành một trang",
            detail:
              "AI viết trơn tru và chia đúng mục. Nhưng chỗ nào bạn bỏ trống thì nó tự điền, nghe rất hợp lý.",
          },
          {
            label: "Bạn soát lại từng dòng",
            detail:
              "Đối chiếu với ý thô của mình: hạn, người duyệt, con số nào AI tự thêm thì xoá hoặc sửa. Bước này không giao cho AI được.",
          },
          {
            label: "Gửi và hỏi ngược",
            detail:
              "Gửi cho người nhận kèm câu: 'Em đọc xong nói lại giúp chị bằng một câu xem đã hiểu giống chị chưa.' Nếu họ nói lệch, sửa trang.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn trang giao việc cho Hà",
        task:
          "Bạn cần Hà làm bản tổng hợp tồn kho một trang, tính đến hết thứ Ba, nộp 15h thứ Năm để anh Nam duyệt trước cuộc họp nhập hàng. Lắp một yêu cầu để AI soạn trang giao việc.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              {
                text: "Soạn giúp tôi trang giao việc cho nhân viên.",
                feedback: "AI không biết việc gì, cho ai. Nó sẽ soạn một mẫu chung có thể điền vào bất cứ việc nào.",
              },
              {
                text: "Tôi là trưởng nhóm kho. Hà cần tổng hợp tồn kho để anh Nam quyết định nhập hàng trong họp thứ Sáu.",
                good: true,
                feedback: "Có người, việc và mục đích. AI viết được dòng 'mục đích' đúng ý bạn thay vì đoán.",
              },
            ],
          },
          {
            id: "facts",
            label: "Kết quả và hạn",
            options: [
              {
                text: "Một trang, số tồn tính đến hết thứ Ba, nộp 15h thứ Năm, anh Nam duyệt.",
                good: true,
                feedback: "Đủ kết quả, mốc số liệu, hạn và người duyệt. AI chỉ việc xếp lại, không phải bịa.",
              },
              {
                text: "Hạn thì để AI chọn cho hợp lý, chắc là cuối tuần.",
                feedback: "AI sẽ chọn một hạn nghe hợp lý nhưng có thể trùng cuộc họp mà Hà và anh Nam không thể bỏ.",
              },
            ],
          },
          {
            id: "quality",
            label: "Mức đạt",
            options: [
              {
                text: "Viết cho thật chuyên nghiệp và đầy đủ.",
                feedback: "Chuyên nghiệp là cảm giác, không đo được. Hà vẫn không biết bao nhiêu là đủ.",
              },
              {
                text: "Đạt khi: tính đủ 3 kho, không quá một trang, có dòng nêu 3 mặt hàng sắp hết. Không tự đổi phạm vi, cần đổi thì hỏi anh Nam.",
                good: true,
                feedback: "Mức đạt kiểm được bằng mắt và dòng 'hỏi anh Nam' cho Hà biết ranh giới quyền tự quyết.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "facts", "quality"],
            text:
              "TRANG GIAO VIỆC\nMục đích: giúp anh Nam quyết định nhập hàng trong họp thứ Sáu.\nKết quả cần: một trang tổng hợp tồn kho 3 kho, số tính đến hết thứ Ba.\nHạn: 15h thứ Năm.\nMức đạt: đủ 3 kho, không quá một trang, có dòng nêu 3 mặt hàng sắp hết.\nQuyết định: anh Nam duyệt. Cần đổi phạm vi thì hỏi anh Nam trước khi làm.",
          },
          {
            requires: ["context"],
            text:
              "TRANG GIAO VIỆC\nMục đích: hỗ trợ quyết định nhập hàng.\nKết quả cần: báo cáo tồn kho đầy đủ, chuyên nghiệp.\nHạn: cuối tuần này.\nMức đạt: chất lượng cao.\n(Có mục đích đúng nhưng hạn và mức đạt là AI tự điền và mơ hồ: 'cuối tuần' có thể là sau cuộc họp.)",
          },
          {
            text:
              "TRANG GIAO VIỆC\nMục đích: nâng cao hiệu quả làm việc.\nKết quả cần: báo cáo tổng hợp toàn công ty, 20 trang.\nHạn: 3 ngày.\nNgười duyệt: giám đốc.\n(AI không biết gì về việc của bạn nên bịa từ mục đích tới người duyệt.)",
          },
        ],
      },
      {
        type: "callout",
        label: "AI điền chỗ trống, người nhận cũng vậy",
        text: "Khi bạn bỏ trống hạn hay người duyệt, cả AI lẫn người nhận đều tự điền, và cả hai đều điền những điều nghe hợp lý. Việc của bạn là điền trước, bằng dữ kiện thật.",
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai, bạn giao việc cho Hà",
        start: "s1",
        nodes: {
          s1: {
            text: "8h30 thứ Hai. Bạn có 10 phút trước cuộc họp và cần Hà làm bản tổng hợp tồn kho cho họp nhập hàng thứ Sáu. Bạn định làm gì?",
            choices: [
              { label: "Nói miệng: 'Em làm giúp chị báo cáo tồn kho, tuần này gửi chị nhé', rồi đi họp", next: "bad_verbal" },
              { label: "Dành 5 phút gõ ý thô cho AI để soạn trang giao việc, rồi gửi Hà", next: "s2" },
            ],
          },
          bad_verbal: {
            text: "Thứ Năm Hà gửi bản 12 trang tính đến cuối tháng trước. Bạn cần một trang tính đến thứ Ba, họp thứ Sáu đã gần. Cả hai làm lại tới tối, và Hà thấy bị trách oan.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về trang giao việc gọn, nhưng có dòng 'Hạn: 17h thứ Sáu' mà bạn chưa hề nói. Bạn xử lý thế nào?",
            choices: [
              { label: "Giữ nguyên vì trang trông đã đầy đủ, gửi luôn", next: "bad_deadline" },
              { label: "Sửa hạn thành 15h thứ Năm để anh Nam kịp duyệt, rồi gửi", next: "s3" },
            ],
          },
          bad_deadline: {
            text: "Hà nộp 17h thứ Sáu, đúng giờ họp. Anh Nam chưa kịp đọc, quyết định nhập hàng bị hoãn sang tuần sau.",
            ending: "bad",
          },
          s3: {
            text: "Gửi xong, bạn nhắn thêm: 'Em đọc rồi nói lại giúp chị bằng một câu xem hiểu giống chị chưa.' Hà trả lời: 'Một trang, tính đến hết thứ Ba, nộp 15h thứ Năm, anh Nam duyệt.'",
            choices: [
              { label: "Xác nhận đúng và để Hà làm", next: "good" },
              { label: "Cứ nhắc thêm mỗi buổi sáng cho chắc", next: "bad_micro" },
            ],
          },
          bad_micro: {
            text: "Hà làm đúng, nhưng thấy bị giám sát từng giờ. Trang giao việc đã làm xong phần của nó, nhắc nhiều lần làm Hà mất tự tin.",
            ending: "bad",
          },
          good: {
            text: "Thứ Năm 14h30 Hà nộp đúng một trang. Anh Nam duyệt, chốt nhập hàng ngay trong họp thứ Sáu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một trang giao việc là mất năm phút để khỏi mất năm giờ.",
          "Bài sau: soát một tin nhắn giao việc trước khi gửi.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 2 ─────────────────────────
  {
    id: 2061,
    slug: "kiem-tra-loi-giao-viec-mo-ho",
    title: "Chặng 33, Bài 2: Tìm chỗ mơ hồ trong tin nhắn giao việc",
    subtitle: "Bạn đọc tin nhắn mình vừa gõ và thấy rõ ràng. Người nhận thì đọc bằng đầu của họ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Tin nhắn giao việc nào cũng rõ với người viết, vì người viết tự điền phần thiếu bằng những gì mình biết. Nhờ AI đọc thay người nhận cho bạn thấy các chỗ có thể hiểu hai cách trong năm phút, trước khi tin nhắn tạo ra một buổi chiều làm lại.",
    openingQuestion:
      "Bạn gõ: 'Hà ơi, em làm giúp chị bản báo cáo tồn kho sớm nhé, gửi anh Nam xem, gấp nha.' Chỗ nào có nguy cơ bị hiểu sai nhất?",
    openingOptions: [
      "Các chữ 'sớm' và 'gấp' không nói ngày giờ cụ thể nào",
      "Chữ 'nhé' ở cuối câu nghe hơi thiếu chuyên nghiệp",
      "Việc bạn xưng 'chị' thay vì dùng chức danh trong nhóm",
      "Tên anh Nam bị nhắc mà anh chưa được thông báo trước",
    ],
    correctOption: 0,
    explanation:
      "'Sớm' và 'gấp' là hai chữ mỗi người đo theo thang riêng: với bạn là trước họp chiều nay, với Hà có thể là trong tuần. Đây là chỗ hai người hiểu khác nhau mà không ai biết cho tới khi trễ. Chữ 'nhé' hay cách xưng hô chỉ là giọng văn, không làm người nhận làm sai việc. Anh Nam chưa biết trước là một việc cần lưu ý, nhưng nó không làm bản báo cáo sai. Chỗ mơ hồ nguy hiểm nhất là chỗ quyết định nộp gì và khi nào.",
    diagram: [
      { label: "Tin nhắn nháp của bạn", arrow: true },
      { label: "AI đọc như người nhận chưa biết gì", arrow: true },
      { label: "Danh sách chỗ có thể hiểu hai cách", arrow: true },
      { label: "Bạn đối chiếu, chỉ sửa chỗ có thật", arrow: true },
      { label: "Tin nhắn gửi đi một nghĩa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm chăm sóc khách hàng",
      description:
        "Một trưởng nhóm nhắn 'em xử lý mấy khiếu nại tồn giúp chị cho xong tuần này'. Người nhận hiểu 'mấy' là 5 ca cũ nhất, chị nghĩ là 20 ca. Thứ Sáu cả hai đều tin mình đúng. Chỉ cần một lượt nhờ AI liệt kê chữ có thể hiểu hai cách, 'mấy' và 'xong' sẽ hiện ra trước khi gửi.",
    },
    quiz: [
      Q(
        "Điều nào cho biết một tin nhắn giao việc còn mơ hồ?",
        [
          "Người nhận có thể hiểu ra hai kết quả khác nhau",
          "Tin nhắn dài hơn ba dòng nên người nhận khó đọc nhanh hết",
          "Tin nhắn có dùng từ chuyên môn của công việc",
          "Tin nhắn nhờ nhiều người nhận cùng lúc",
        ],
        "Mơ hồ không phải dài hay ngắn mà là chỗ cho phép hai cách hiểu. Tin nhắn ba dòng vẫn có thể rất rõ, và từ chuyên môn thì người nhận cùng nghề hiểu ngay. Nhờ nhiều người không làm tin mơ hồ, nó làm tăng nguy cơ mỗi người hiểu một kiểu nên lại càng cần rõ.",
      ),
      Q(
        "Chữ nào trong tin nhắn dễ bị hiểu khác nhau nhất?",
        [
          "Các chữ đo bằng cảm giác như 'sớm', 'gấp', 'mấy', 'xong'",
          "Cách xưng hô 'chị', 'em', 'anh' vì mỗi người một kiểu",
          "Tên riêng của người nhận, vì rất dễ gõ nhầm sang một người khác trong nhóm",
          "Dấu câu như dấu chấm than, vì nó làm cả câu nghe gắt hơn với người đọc",
        ],
        "Những chữ đo bằng cảm giác như sớm, gấp, mấy, xong là nơi mỗi người có thang riêng. Cách xưng hô, tên người hay dấu câu thì không đổi việc người nhận phải làm, nên dù có cần tinh chỉnh cũng không gây làm lại.",
      ),
      Q(
        "Sau khi AI liệt kê 5 chỗ mơ hồ, bước tiếp theo đúng là gì?",
        [
          "Đối chiếu từng chỗ với tin nhắn gốc, chỉ sửa chỗ có thật",
          "Sửa hết cả 5 chỗ theo đúng những gì AI gợi ý",
          "Gửi luôn tin nhắn cũ vì AI chỉ hay soi quá mức",
          "Nhờ AI viết lại toàn bộ và gửi mà không đọc",
        ],
        "AI đôi khi khẳng định thứ tin nhắn không hề nói, và bạn phải tự đối chiếu mới biết chỗ nào có thật. Sửa theo mọi gợi ý thì thêm cả những chỗ nó bịa. Bỏ qua cả danh sách thì phí công. Gửi bản viết lại mà chưa đọc là giao cho AI quyền nói thay bạn.",
      ),
      Q(
        "Bạn nhờ AI soát tin nhắn giao việc. Nên dán thêm gì để kết quả sát hơn?",
        [
          "Một dòng nói tin nhắn gửi cho ai và mong họ làm gì",
          "Toàn bộ lịch sử trò chuyện nhóm từ đầu năm tới giờ",
          "Tên đầy đủ, số điện thoại và địa chỉ của người nhận",
          "Bảng lương và đánh giá hiệu suất của người nhận",
        ],
        "AI chỉ cần biết người nhận là ai theo vai trò và họ cần làm gì để đọc như người nhận. Toàn bộ lịch sử chat hay thông tin cá nhân và bảng lương là dữ liệu nhạy cảm, không giúp soát tin nhắn, và không nên gửi vào công cụ khi công ty chưa cho phép.",
      ),
      Q(
        "AI nói: 'Theo quy định công ty, việc gấp phải xong trong 24 giờ.' Bạn chưa từng nhắc quy định này. Đây là gì?",
        [
          "Một 'quy định' AI tự nghĩ ra, cần bỏ đi hoặc kiểm với nguồn thật",
          "Một thông tin bổ sung hữu ích mà AI đã tra được từ nội quy công ty của bạn",
          "Một gợi ý chuẩn của AI, nên đưa vào tin nhắn để người nhận tin hơn",
          "Một lỗi nhỏ về giọng văn, bỏ qua cũng không ảnh hưởng gì tới nội dung",
        ],
        "AI không đọc được nội quy công ty bạn nếu bạn không đưa vào. Một quy định tự tin nhưng bạn chưa từng nói là chữ nghe hợp lý chứ không phải sự thật. Đưa vào tin nhắn sẽ gây hiểu lầm: người nhận tin và làm theo một luật không tồn tại.",
      ),
    ],
    keyTakeaways: [
      "Mơ hồ là chỗ người nhận có thể hiểu hai cách, không phải chỗ câu dài hay ngắn.",
      "Những chữ đo bằng cảm giác (sớm, gấp, mấy, xong) là nơi hay sai nhất.",
      "AI đọc thay người nhận rất nhanh, nhưng có lúc thêm điều tin nhắn không nói.",
      "Luôn đối chiếu danh sách của AI với tin nhắn gốc trước khi sửa.",
    ],
    practicePrompt: {
      question:
        "Tin nhắn: 'Em gửi khách bảng giá mới giúp chị.' AI liệt kê 3 chỗ mơ hồ. Chỗ nào có THẬT trong tin nhắn?",
      options: [
        "'Khách' là khách nào, 'mới' là bản nào, gửi lúc nào",
        "Chữ 'em' nên được đổi thành tên người nhận cho lịch sự",
        "Tin nhắn thiếu chữ ký và số điện thoại của người giao",
        "Bảng giá mới phải được hội đồng quản trị duyệt trước",
      ],
      correct: 0,
      explanation:
        "Ba chỗ đầu đều có trong chính tin nhắn: khách nào, bản nào, khi nào. Đổi 'em' thành tên chỉ là giọng văn. Chữ ký và số điện thoại không liên quan tới việc. Hội đồng quản trị duyệt là điều AI tự thêm, tin nhắn không hề nhắc.",
    },
    summary: {
      keyIdea: "Trước khi gửi, để AI đọc thay người nhận: chỗ nào nó hỏi lại là chỗ người nhận sẽ đoán.",
      formula: "Dán tin nhắn + nói người nhận là ai + nhờ liệt kê chỗ hiểu được hai cách + đối chiếu.",
      commonMistake: "Sửa theo mọi gợi ý của AI, kể cả những thứ tin nhắn gốc không hề có.",
      action: "Soát tin nhắn giao việc tiếp theo bằng AI trước khi bấm gửi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một tin nhắn giao việc bạn đã gửi tuần này (hoặc soạn cái sắp gửi). Dán vào AI, ghi một dòng: 'gửi cho ai, mong họ làm gì'. Nhờ liệt kê mọi chỗ người nhận có thể hiểu hai cách. Với mỗi chỗ, đánh dấu có thật hay AI tự thêm, rồi viết lại tin nhắn. Ngày mai, hỏi người nhận xem họ hiểu thế nào.",
      secondary: "Xoá tên và số liệu nhạy cảm trước khi dán, thay bằng chữ 'khách A', 'bạn B'.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa gõ xong một tin nhắn giao việc, đọc lại thấy rất rõ. Nhưng bạn đọc bằng đầu chứa đủ bối cảnh. Bài này dạy bạn nhờ AI đọc thay người nhận, và phân biệt chỗ nó chỉ đúng với chỗ nó tự thêm.",
      },
      {
        type: "feynman",
        title: "Soát tin nhắn giao việc đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn viết địa chỉ nhà cho người bạn tới chơi: 'Nhà mình ở gần chợ, cái nhà màu vàng.' Với bạn là rõ. Người bạn nhờ một người lạ đọc thử sẽ hỏi ngay: chợ nào, vàng nào? AI trong bài này là người lạ đọc thử đó.",
        columns: ["Chỗ trong địa chỉ", "Người lạ hỏi", "Trong tin nhắn giao việc"],
        rows: [
          ["Gần chợ", "Chợ nào? Gần là bao xa?", "'Sớm': sớm là lúc nào?"],
          ["Nhà màu vàng", "Cả dãy có ba nhà vàng", "'Báo cáo': báo cáo nào, tính đến khi nào?"],
          ["Không ghi số nhà", "Tìm bằng cách nào?", "Không ghi ai duyệt, hỏi ai khi vướng"],
        ],
        oneLiner: "AI đọc thử thay người nhận: chỗ nó hỏi lại là chỗ người nhận sẽ tự đoán.",
      },
      { type: "heading", text: "Vì sao chính bạn khó thấy lỗi" },
      {
        type: "paragraph",
        text: "Khi đọc lại tin nhắn của mình, não bạn tự điền mọi chỗ thiếu bằng những gì bạn biết. 'Báo cáo tồn kho' với bạn là bản tính tới thứ Ba cho kho A và B. Với Hà, nó có thể là bản cuối tháng. Người ngoài mới thấy chỗ trống, và AI đóng vai người ngoài đó rất rẻ.",
      },
      {
        type: "comparison",
        left: {
          label: "Đọc lại một mình",
          text: "Nhanh, nhưng bạn chỉ thấy điều bạn đã biết. Chỗ mơ hồ vẫn trông như rõ ràng vì chính bạn điền vào giúp.",
        },
        right: {
          label: "Nhờ AI đọc như người nhận",
          text: "Nó không biết bối cảnh nên hỏi lại đúng chỗ thiếu. Nhưng nó cũng có thể tự thêm điều tin nhắn không nói, nên bạn phải đối chiếu.",
        },
      },
      {
        type: "list",
        items: [
          "Dán tin nhắn nháp, chưa có tên thật hoặc số liệu nhạy cảm.",
          "Ghi một dòng: gửi cho ai (vai trò), mong họ làm gì.",
          "Nhờ AI: 'Liệt kê từng chỗ người nhận có thể hiểu hai cách, trích đúng chữ trong tin nhắn.'",
          "Với mỗi chỗ, tự hỏi: tin nhắn có chữ này thật không?",
        ],
      },
      {
        type: "flow",
        title: "Từ tin nhắn nháp đến tin nhắn một nghĩa",
        steps: [
          {
            label: "Dán tin nhắn và vai người nhận",
            detail: "Không dán số liệu nhạy cảm hay tên thật nếu chưa cần. Vai người nhận giúp AI đọc đúng góc.",
          },
          {
            label: "AI liệt kê chỗ hiểu được hai cách",
            detail: "Yêu cầu nó trích đúng chữ trong tin nhắn để bạn tìm được ngay chỗ nó nói tới.",
          },
          {
            label: "Bạn đối chiếu từng chỗ",
            detail: "Chỗ nào nó trích được là chỗ có thật. Chỗ nào nó nói mà không trích được thường là chỗ nó tự thêm.",
          },
          {
            label: "Viết lại và hỏi người nhận",
            detail: "Sửa các chỗ có thật bằng ngày giờ, con số, tên cụ thể. Gửi và nhờ người nhận nói lại bằng lời của họ.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản 'soát lỗi' của AI",
        task:
          "Tin nhắn gốc của bạn: 'Hà ơi, em làm giúp chị bản báo cáo tồn kho sớm nhé, nhớ gửi anh Nam xem, gấp nha.' Dưới đây là kết quả AI soát. Đánh dấu những đoạn AI tự thêm điều tin nhắn không nói.",
        segments: [
          {
            text: "Chỗ 1: chữ 'sớm' và 'gấp' không có ngày giờ, người nhận có thể hiểu là chiều nay hoặc cuối tuần.",
          },
          {
            text: "Chỗ 2: 'báo cáo tồn kho' chưa nói kho nào và tính đến ngày nào.",
          },
          {
            text: "Chỗ 3: tin nhắn cho biết anh Nam đã đồng ý xem báo cáo trước 5 giờ chiều thứ Năm.",
            error: "Tin nhắn chỉ nói 'gửi anh Nam xem'. Việc anh Nam đồng ý và mốc 5 giờ chiều là AI bịa.",
          },
          {
            text: "Chỗ 4: 'gửi anh Nam xem' chưa nói anh Nam chỉ đọc hay là người duyệt và quyết.",
          },
          {
            text: "Chỗ 5: theo quy định công ty, báo cáo gấp phải nộp trong vòng 24 giờ.",
            error: "Tin nhắn không nhắc quy định nào. AI bịa ra một luật nghe hợp lý mà bạn chưa hề đưa vào.",
          },
          {
            text: "Chỗ 6: vì người nhận tên Hà nên báo cáo này chắc chắn thuộc bộ phận kho vận.",
            error: "Suy diễn không có cơ sở: tin nhắn không nói Hà làm ở bộ phận nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cái AI hỏi lại mới là phần có giá",
        text: "Điều đáng lấy từ AI là những câu hỏi 'chỗ này là gì?' trích từ chữ của bạn. Những thứ nó khẳng định thêm ngoài tin nhắn đều phải kiểm tra như thông tin lạ.",
      },
      {
        type: "scenario",
        title: "Tin nhắn nháp trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa gõ tin nhắn giao việc cho Hà và sắp vào họp. Bạn làm gì?",
            choices: [
              { label: "Gửi luôn, vì đọc lại thấy rõ rồi", next: "bad_send" },
              { label: "Dán vào AI (đã xoá tên thật) và nhờ liệt kê chỗ hiểu được hai cách", next: "s2" },
            ],
          },
          bad_send: {
            text: "Hà hiểu 'sớm' là cuối tuần, còn bạn cần trước họp chiều thứ Tư. Bạn phát hiện khi đã hết giờ, cả hai phải làm gấp.",
            ending: "bad",
          },
          s2: {
            text: "AI liệt kê 4 chỗ. Một chỗ nói 'quy định 24 giờ' mà bạn chưa hề nhắc. Bạn xử lý thế nào?",
            choices: [
              { label: "Đưa luôn 'quy định 24 giờ' vào tin nhắn cho có căn cứ", next: "bad_rule" },
              { label: "Bỏ chỗ đó, sửa 3 chỗ có thật bằng ngày giờ cụ thể rồi gửi", next: "good" },
            ],
          },
          bad_rule: {
            text: "Hà hỏi phòng nhân sự về 'quy định 24 giờ' và được trả lời là không có. Bạn mất uy tín một chút, và tin nhắn cần gửi lại.",
            ending: "bad",
          },
          good: {
            text: "Hà đọc xong nói lại đúng ý: 'Nộp 15h thứ Tư, kho A và B, số tính tới hết thứ Ba, anh Nam duyệt.' Không ai phải hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI đọc thay người nhận giúp bạn thấy chỗ trống, còn việc điền thì vẫn là của bạn.",
          "Bài sau: khi sếp ném việc gấp lúc cả nhóm đã kín lịch.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 3 ─────────────────────────
  {
    id: 2062,
    slug: "nhan-viec-gap-luc-dang-ban",
    title: "Chặng 33, Bài 3: Sếp ném việc gấp khi nhóm đã kín lịch",
    subtitle: "Ba giờ chiều thứ Tư, sếp nhắn một việc gấp. Trả lời 'vâng' rất dễ, và rất đắt.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trưởng nhóm mới hay nhận mọi việc gấp bằng chữ 'vâng', rồi dồn lên vai người giỏi nhất và làm hỏng những việc đang chạy. Biết cân nhắc trước khi trả lời, và biết dùng AI để nhìn nhanh lịch của nhóm, giúp bạn nói với sếp một câu có lựa chọn thay vì một chữ 'vâng'.",
    openingQuestion:
      "Ba giờ chiều sếp nhắn: 'Em làm gấp bản so sánh ba nhà cung cấp, sáng mai anh cần.' Cả nhóm đang kín lịch tới cuối tuần. Câu trả lời đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Hỏi việc này quan trọng cỡ nào và việc nào đang chạy có thể lùi",
      "Vâng ạ, em làm ngay, việc đang chạy em sẽ tự thu xếp, không cần hỏi lại",
      "Em xin lỗi anh, nhóm em đang quá tải nên không nhận được",
      "Em chuyển việc cho bạn giỏi nhất nhóm, bạn ấy nhanh nhất",
    ],
    correctOption: 0,
    explanation:
      "Sếp thường chưa nhìn thấy lịch của nhóm bạn. Khi bạn hỏi việc quan trọng cỡ nào và việc nào đang chạy có thể lùi, bạn đưa cho sếp lựa chọn thật thay vì một chữ 'vâng' hay 'không'. 'Vâng' ngay khiến việc đang chạy bị dồn lại mà sếp không biết. Từ chối thẳng bỏ lỡ việc có thể quan trọng thật. Chuyển cho người giỏi nhất là cách dồn thêm việc lên đúng người đã đầy, và chính người đó sẽ kiệt sức đầu tiên.",
    diagram: [
      { label: "Nhận việc gấp: hỏi mục đích và hạn thật", arrow: true },
      { label: "Nhìn lịch nhóm: ai còn chỗ, việc nào lùi được", arrow: true },
      { label: "Đề xuất với sếp: ít nhất hai phương án", arrow: true },
      { label: "Sếp chọn, bạn giao việc rõ cho người nhận", arrow: true },
      { label: "Ghi lại việc bị lùi để báo với người liên quan" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm kinh doanh 6 người",
      description:
        "Chiều thứ Tư sếp cần một bản so sánh nhà cung cấp cho sáng thứ Năm. Trưởng nhóm không nhận ngay mà đưa hai lựa chọn: lùi báo cáo tuần sang thứ Hai để làm bản này, hoặc nộp bản so sánh gọn hai trang thay vì mười trang. Sếp chọn bản gọn. Đây là tình huống minh hoạ; điều đáng nhớ là sếp chọn được vì được đưa lựa chọn.",
    },
    quiz: [
      Q(
        "Sếp ném một việc gấp khi nhóm đã kín lịch. Điều nào nên làm trước?",
        [
          "Hỏi hạn thật và mục đích của việc, rồi nhìn lịch nhóm",
          "Nhận ngay để sếp thấy nhóm sẵn sàng và có trách nhiệm với công việc",
          "Giao ngay cho người nào rảnh nhất, sau đó mới báo sếp",
          "Nhờ AI làm hết việc đó rồi đưa cho sếp luôn buổi tối",
        ],
        "Không biết hạn thật và mục đích thì không cân được việc gấp này gấp tới đâu, và không biết lịch nhóm thì không biết nhận sẽ phải bỏ gì. Nhận ngay có thể chỉ dời rủi ro sang cuối tuần. Giao cho người rảnh nhất khi chưa rõ việc là giao việc chưa hiểu. Dùng AI làm hết mà bạn chưa đọc là không kiểm.",
      ),
      Q(
        "Khi nhận việc gấp mới, cách nói nào với sếp là hợp lý?",
        [
          "Nếu làm việc này thì em lùi việc A sang thứ Hai, anh chọn giúp em",
          "Dạ vâng, nhóm em có thể lo tất cả cùng một lúc, anh yên tâm",
          "Việc này làm không nổi đâu anh, nhóm em đang ngập việc rồi",
          "Em sẽ cố hết sức, nếu chậm thì mong anh thông cảm giúp em",
        ],
        "Câu đầu cho sếp thấy cái giá của lựa chọn và trao quyền chọn cho sếp. 'Lo tất cả cùng lúc' thường là lời hứa không giữ được. Từ chối cụt không cho sếp cơ hội điều chỉnh. Hứa cố hết sức rồi xin thông cảm là chuyển rủi ro cho sếp khi đã muộn.",
      ),
      Q(
        "Bạn nhờ AI nhìn lịch nhóm để xem ai còn chỗ. Bạn nên cung cấp gì?",
        [
          "Danh sách việc đang chạy của từng người, kèm hạn và số giờ ước lượng",
          "Chỉ tên các thành viên trong nhóm rồi để AI đoán ai đang rảnh",
          "Bản đánh giá năng lực của từng người để AI chọn ra người giỏi nhất để giao",
          "Toàn bộ tin nhắn riêng của các thành viên trong tuần vừa qua",
        ],
        "AI chỉ cân được lịch khi có dữ kiện thật: việc, hạn, số giờ. Chỉ có tên thì nó phải bịa ai rảnh. Đánh giá năng lực là dữ liệu nhạy cảm và dẫn tới chọn người giỏi làm thêm. Tin nhắn riêng của thành viên là quyền riêng tư của họ, không dán vào công cụ khi họ chưa biết.",
      ),
      Q(
        "AI đề xuất: 'Giao việc gấp cho Hà vì Hà nhanh nhất nhóm.' Bạn nên nghĩ gì?",
        [
          "AI chưa biết lịch thật của Hà, phải đối chiếu với việc Hà đang có",
          "Tin luôn, vì AI phân tích công bằng hơn người quản lý và không thiên vị ai cả",
          "Đồng ý ngay, vì người nhanh nhất luôn là người làm việc gấp tốt nhất nhóm",
          "Bỏ qua hẳn đề xuất này, vì AI không bao giờ hiểu được cách nhóm làm việc",
        ],
        "AI nói 'Hà nhanh nhất' dựa trên điều bạn nói trước đó, chứ không biết Hà đang kín lịch hay kiệt sức. Người nhanh nhất mà đã đủ việc thì thành nút thắt. AI không công bằng hơn người quản lý vì nó không có dữ kiện; nhưng bỏ hẳn gợi ý thì phí, vì nó giúp bạn nghĩ ra thêm phương án.",
      ),
      Q(
        "Việc nào bạn nên báo lại cho người liên quan sau khi chọn lùi một việc?",
        [
          "Việc bị lùi, ngày mới và lý do, gửi cho người đang chờ nó",
          "Không cần báo, vì lùi vài ngày thì không ai để ý đâu",
          "Chỉ báo sếp là đủ, còn người đang chờ việc sẽ tự phát hiện ra sau này",
          "Báo tất cả mọi người trong công ty về việc bị lùi",
        ],
        "Người đang chờ việc bị lùi cần biết sớm để sắp lại lịch của họ; im lặng biến một việc lùi thành một lần hụt hẫng. Chỉ báo sếp bỏ sót người chờ thật. Thông báo cả công ty thì gây nhiễu và không cần thiết.",
      ),
    ],
    keyTakeaways: [
      "Việc gấp không tự động là việc quan trọng: hỏi mục đích và hạn thật trước.",
      "Nói với sếp bằng lựa chọn (nếu làm A thì lùi B), không bằng một chữ 'vâng' hay 'không'.",
      "Người giỏi nhất nhóm không phải bể chứa việc gấp.",
      "AI giúp liệt kê phương án; lịch thật và ai còn chỗ là điều bạn phải kiểm.",
    ],
    practicePrompt: {
      question:
        "Sếp nhắn việc gấp lúc 15h. Nhóm có 3 việc đang chạy, trong đó một việc lùi được 2 ngày. Bạn trả lời gì?",
      options: [
        "Em nhận được nếu lùi việc C sang thứ Hai, hoặc nộp bản gọn hơn, anh chọn giúp em",
        "Em nhận ngay, cả ba việc em vẫn giữ đúng hạn như cũ nhé anh",
        "Việc này em không làm được đâu ạ, nhóm em có ba việc rồi",
        "Em sẽ làm xong tất cả, đêm nay em ở lại làm thêm cho kịp",
      ],
      correct: 0,
      explanation:
        "Câu đầu đưa cho sếp hai phương án cụ thể và cái giá của từng cái. 'Giữ cả ba' và 'ở lại làm thêm' hứa điều sức người khó giữ, còn 'không làm được' không cho sếp lựa chọn nào.",
    },
    summary: {
      keyIdea: "Việc gấp bắt bạn chọn cái gì lùi. Hãy để sếp thấy cái giá và cùng chọn.",
      formula: "Hạn thật + việc lùi được + phương án A/B = câu trả lời có lựa chọn.",
      commonMistake: "Nhận mọi việc bằng chữ 'vâng' rồi dồn lên người giỏi nhất.",
      action: "Liệt kê việc đang chạy của nhóm, đánh dấu việc nào lùi được.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lập danh sách việc đang chạy của nhóm: tên việc, người làm, hạn, một dòng ghi 'lùi được / không lùi được'. Dán vào AI (đã đổi tên thật thành A, B, C) và nhờ đề xuất hai cách nhận thêm một việc gấp giả định. Lưu bản này để lần sau sếp ném việc, bạn trả lời trong hai phút.",
      secondary: "Việc nào bạn ghi 'không lùi được' nhưng thực ra lùi được nếu hỏi sếp, đánh dấu lại để hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba giờ chiều thứ Tư, sếp nhắn một việc gấp cho sáng mai, trong khi cả nhóm đang kín lịch. Bài này dạy bạn trả lời sếp bằng lựa chọn thay vì một chữ 'vâng', và dùng AI để nhìn nhanh phương án.",
      },
      {
        type: "feynman",
        title: "Nhận việc gấp đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đang nấu bữa tối cho cả nhà thì bà bên nhà gọi: 'Nấu thêm món canh cho bà nhé, nửa tiếng nữa bà sang.' Bếp chỉ có hai lò. Muốn nấu thêm phải tạm tắt một nồi hoặc nhờ người khác trông giúp. Việc gấp đến khi nhóm đã kín lịch cũng thế.",
        columns: ["Trong bếp", "Với nhóm", "Nên làm"],
        rows: [
          ["Hai lò đang cháy", "Lịch nhóm đã kín", "Nhìn toàn cảnh trước khi nhận thêm"],
          ["Tắt bớt nồi chưa cần sôi", "Lùi việc chưa gấp", "Chọn việc lùi được cùng sếp"],
          ["Nhờ người trông lò", "Chia lại cho người còn chỗ", "Hỏi họ trước, đừng tự giao"],
          ["Nói bà biết món nào có món nào không", "Báo người chờ việc bị lùi", "Nói sớm để họ sắp lại"],
        ],
        oneLiner: "Việc gấp là nấu thêm món khi hai lò đã cháy: phải chọn tắt nồi nào, không có bữa ăn miễn phí.",
      },
      { type: "heading", text: "Vì sao 'vâng' là câu trả lời đắt" },
      {
        type: "paragraph",
        text: "Nhận việc gấp bằng chữ 'vâng' nghe như có trách nhiệm. Nhưng sếp chưa thấy lịch của nhóm, nên sếp tin nhóm còn chỗ. Thực tế là một việc khác bị đẩy lùi trong im lặng, hoặc một người phải làm đêm. Đến khi lộ ra thì thường đã trễ cả hai việc.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhận bằng chữ 'vâng'",
          text: "Nhanh và dễ chịu lúc đó. Sếp nghĩ mọi việc vẫn ổn. Việc khác bị lùi trong im lặng, người giỏi nhất kiệt sức, hai việc cùng trễ.",
        },
        right: {
          label: "Nhận bằng một lựa chọn",
          text: "Mất hai phút cân nhắc. Sếp thấy cái giá và tự chọn. Việc lùi được báo sớm cho người chờ, không ai bị bất ngờ.",
        },
      },
      { type: "heading", text: "Bốn bước hai phút" },
      {
        type: "list",
        items: [
          "Hỏi: việc này để làm gì, và hạn thật là khi nào (không phải hạn nghe gấp nhất).",
          "Nhìn: việc nào đang chạy lùi được, ai còn chỗ.",
          "Đề xuất: ít nhất hai phương án, ví dụ lùi việc A hoặc nộp bản gọn hơn.",
          "Báo: người chờ việc bị lùi biết ngày mới và lý do.",
        ],
      },
      {
        type: "flow",
        title: "Từ tin nhắn gấp đến quyết định của sếp",
        steps: [
          {
            label: "Nhận tin và chưa trả lời ngay",
            detail: "Trả lời một câu: 'Em xem lịch nhóm và báo anh trong 15 phút.' Khoảng đó đủ để bạn nhìn lịch mà không tỏ ra thiếu sẵn sàng.",
          },
          {
            label: "Liệt kê việc đang chạy",
            detail: "Việc, người làm, hạn, lùi được hay không. Bạn có thể dán bản này (đã ẩn tên thật) vào AI để nhờ nó xếp lại thành bảng.",
          },
          {
            label: "Đề xuất hai phương án",
            detail: "AI giúp nghĩ thêm phương án, nhưng bạn kiểm ai còn chỗ thật, vì AI không biết Hà đã kiệt sức hay chưa.",
          },
          {
            label: "Sếp chọn, bạn giao rõ và báo người chờ",
            detail: "Việc mới được giao bằng một trang (bài 1). Việc bị lùi được báo bằng tin nhắn ngắn: ngày mới, lý do.",
          },
        ],
      },
      {
        type: "callout",
        label: "Người giỏi nhất không phải bể chứa",
        text: "Ai làm nhanh nhất thường bị giao thêm nhiều nhất. Nếu bạn luôn chọn họ vì tiện, họ sẽ quá tải trước, và bạn mất luôn người giỏi nhất. Hỏi trước, chia đều, và để họ có quyền từ chối.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Tư: sếp cần bản so sánh nhà cung cấp",
        start: "s1",
        nodes: {
          s1: {
            text: "15h, sếp nhắn: 'Sáng mai anh cần bản so sánh ba nhà cung cấp.' Nhóm bạn có báo cáo tuần và một bản chào giá đang chạy. Bạn trả lời thế nào?",
            choices: [
              { label: "'Vâng ạ, em làm ngay.' Rồi giao cho Hà vì Hà nhanh nhất", next: "bad_yes" },
              { label: "'Việc này cho anh dùng vào việc gì, và mấy giờ sáng mai anh cần?'", next: "s2" },
              { label: "'Nhóm em kín lịch, không nhận được ạ.'", next: "bad_no" },
            ],
          },
          bad_yes: {
            text: "Hà đang làm bản chào giá cho khách. Cô làm bản so sánh thâu đêm, bản chào giá trễ một ngày, khách hàng nhắn hỏi. Sếp không biết vì sao.",
            ending: "bad",
          },
          bad_no: {
            text: "Sếp im lặng rồi nhờ nhóm khác. Sáng hôm sau bạn biết việc đó phục vụ buổi họp với ban giám đốc, bạn đã bỏ lỡ một cơ hội nhỏ.",
            ending: "bad",
          },
          s2: {
            text: "Sếp trả lời: 'Cho họp lúc 10h sáng mai, anh chỉ cần bản gọn.' Bạn thấy có hai lựa chọn khả thi.",
            choices: [
              { label: "Đề xuất: nộp bản gọn 2 trang lúc 9h; báo cáo tuần lùi sang thứ Hai. Nhờ AI nháp bảng so sánh, bạn tự kiểm số", next: "s3" },
              { label: "Nhận nguyên bản đầy đủ 10 trang và tự hứa làm kịp", next: "bad_over" },
            ],
          },
          bad_over: {
            text: "Không đủ thời gian kiểm số liệu. Bản nộp có một con số sai, sếp phải chỉnh ngay trong họp.",
            ending: "bad",
          },
          s3: {
            text: "Sếp đồng ý. AI nháp bảng, bạn đối chiếu ba con số với báo giá gốc thì phát hiện một số AI đã làm tròn sai. Bạn còn một việc nữa.",
            choices: [
              { label: "Nhắn người đang chờ báo cáo tuần: dời sang thứ Hai, lý do là bản so sánh cho sếp", next: "good" },
              { label: "Không nhắn, chờ họ hỏi mới nói", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Thứ Sáu người chờ báo cáo hỏi thăm, ngạc nhiên vì bị lùi mà không được báo. Họ đã bỏ lỡ việc sắp lịch.",
            ending: "bad",
          },
          good: {
            text: "Bản so sánh nộp đúng 9h với số đã kiểm, người chờ báo cáo tuần biết từ chiều thứ Tư. Cả hai việc đều êm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Việc gấp là phép thử: bạn nói với sếp bằng lựa chọn, không bằng một chữ 'vâng'.",
          "Bài sau: bẻ một việc to thành những việc nhỏ có người nhận.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 4 ─────────────────────────
  {
    id: 2063,
    slug: "chia-viec-lon-thanh-viec-nho",
    title: "Chặng 33, Bài 4: Bẻ một việc to thành các việc nhỏ có người nhận",
    subtitle: "'Chuyển hồ sơ sang bảng tính chung trong tháng này' là một mục tiêu, chưa phải một việc để giao.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một việc lớn giao nguyên khối thường nằm im ba tuần rồi dồn vào ba ngày cuối. Tách nó thành các bước nhỏ, mỗi bước có một chủ và một hạn, cho bạn thấy sớm nếu đang trễ. AI giúp bạn tách nhanh và soát xem bước nào còn thiếu chủ hoặc hạn.",
    openingQuestion:
      "Sếp giao: 'Cuối tháng phải chuyển toàn bộ hồ sơ khách hàng từ tủ giấy sang bảng tính chung.' Bạn ghi vào bảng việc của nhóm đúng một dòng như thế. Điều gì dễ xảy ra nhất?",
    openingOptions: [
      "Không ai biết phần mình nên làm nên việc nằm im đến cuối tháng",
      "Cả nhóm cùng làm một lúc nên hoàn thành sớm hơn hạn nhiều, không cần chia việc",
      "AI sẽ tự nhắc từng người khi hạn cuối tháng đến gần",
      "Sếp sẽ tự chia việc cho từng người vào đầu tháng",
    ],
    correctOption: 0,
    explanation:
      "Một dòng 'chuyển hồ sơ trong tháng' không nói ai làm phần nào, làm xong khi nào, và trong ba tuần đầu không có mốc nào để biết đang chậm. Ai cũng nghĩ có người khác đang lo, và việc dồn về ba ngày cuối. Việc không có chủ thì không tự chạy nhanh hơn khi thêm người. AI cũng chỉ nhắc khi bạn cài sẵn mốc cụ thể, còn sếp giao việc lớn chính là để bạn chia nhỏ, sếp không làm điều đó thay bạn.",
    diagram: [
      { label: "Việc lớn: một câu mục tiêu", arrow: true },
      { label: "Tách thành các bước nhỏ, mỗi bước nộp được một thứ", arrow: true },
      { label: "Mỗi bước có một chủ và một hạn", arrow: true },
      { label: "Mỗi bước có điều kiện xong nhìn thấy được", arrow: true },
      { label: "Theo dõi từng tuần, chỉnh khi trễ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm hành chính 4 người",
      description:
        "Nhóm phải chuyển 600 bộ hồ sơ giấy sang bảng tính trong bốn tuần. Ghi một dòng thì sau ba tuần mới có 90 bộ. Chia thành các đợt 150 bộ, mỗi đợt một người, có mốc cuối mỗi tuần, thì nhóm thấy ngay tuần hai đang chậm và bổ sung người kịp. Các con số 600 và 90 là số liệu minh hoạ.",
    },
    quiz: [
      Q(
        "Một việc nhỏ được giao tốt cần có những gì?",
        [
          "Một người nhận rõ, một hạn cụ thể và điều kiện để biết đã xong",
          "Một mô tả dài, thật nhiều chi tiết và một lời nhắc nhở nghiêm khắc",
          "Tên nhóm phụ trách chung và hạn chót của cả dự án là đủ",
          "Một mức thưởng cho việc hoàn thành và một mức phạt khi trễ",
        ],
        "Người nhận, hạn và điều kiện xong là ba thứ cho phép ai đó bắt tay làm và bạn kiểm được. Mô tả dài hay lời nhắc nghiêm khắc không nói bao giờ xong. Tên nhóm chung để mọi người nghĩ có người khác lo. Thưởng phạt không thay thế được việc nói rõ phải nộp gì.",
      ),
      Q(
        "Bước nào dưới đây đã đủ nhỏ để giao?",
        [
          "Hà nhập 150 bộ hồ sơ đợt 1 vào bảng, xong thứ Sáu tuần này",
          "Chuẩn bị đầy đủ mọi thứ cho việc chuyển hồ sơ",
          "Làm phần hồ sơ khách hàng trong tháng này",
          "Cả nhóm cùng lo phần chuyển hồ sơ sang bảng",
        ],
        "Chỉ bước đầu có người, số lượng, mốc thời gian, thứ để kiểm. 'Chuẩn bị mọi thứ', 'làm hồ sơ' và 'cả nhóm lo' đều là tên của một khu vực công việc, không phải một việc, nên người nhận không biết xong là xong khi nào.",
      ),
      Q(
        "Một việc lớn 120 giờ, giao cho 1 người mỗi tuần làm 10 giờ. Sau 4 tuần còn bao nhiêu giờ?",
        [
          "80 giờ (= 120 − 4 × 10 × 1 người)",
          "40 giờ (= 4 × 10, tính số giờ đã làm rồi quên trừ đi)",
          "110 giờ (= 120 − 10, chỉ trừ đúng một tuần)",
          "30 giờ (= 120 ÷ 4, chia tổng cho số tuần)",
        ],
        "Mỗi tuần một người làm 10 giờ nên bốn tuần được 40 giờ, còn 120 − 40 = 80 giờ. 40 giờ là kết quả nếu có hai người. 110 giờ chỉ trừ một tuần. 0 giờ nếu có ba người, không đúng với đề bài. Bước này cho thấy vì sao chỉ một người nhận thì việc dễ trễ.",
      ),
      Q(
        "Thêm người nhận việc thì tổng giờ còn lại giảm nhanh hơn. Điều gì nên nhớ khi thêm người?",
        [
          "Thêm người kéo theo thời gian phối hợp, nên giờ không giảm đúng tỉ lệ thuận",
          "Thêm người luôn làm số giờ còn lại giảm đúng theo tỷ lệ số người",
          "Thêm người luôn làm việc kéo dài hơn vì ai cũng ngồi chờ người khác làm xong trước",
          "Số người nhận việc không ảnh hưởng gì tới thời gian còn lại",
        ],
        "Mỗi người thêm giúp làm song song, nhưng cũng thêm việc trao đổi, chia và ghép kết quả nên giờ giảm chậm hơn tỉ lệ thuận. Không đúng là thêm người luôn kéo dài, và cũng không đúng là không ảnh hưởng gì. Biểu đồ trong bài là mô hình gọn, số liệu minh hoạ.",
      ),
      Q(
        "Bạn nhờ AI tách việc lớn thành các bước và nó trả 12 bước. Bước tiếp theo đúng là gì?",
        [
          "Gán chủ và hạn thật cho từng bước, rồi xoá hoặc gộp bước thừa",
          "Giao 12 bước cho cả nhóm ngay vì AI đã tính sẵn giúp bạn",
          "Bỏ bớt cho còn khoảng 3 bước để danh sách trông gọn hơn và dễ nhìn hơn nhiều",
          "Đưa danh sách cho sếp duyệt trước khi ai đọc nó",
        ],
        "AI chưa biết ai còn chỗ và hạn thật nên danh sách của nó chỉ là bản nháp. Giao ngay khi chưa gán chủ và hạn thì lại trở về một danh sách không ai nhận. Cắt còn 3 bước làm mỗi bước lớn lại. Đưa sếp duyệt bản chưa có chủ chưa giúp gì thêm.",
      ),
    ],
    keyTakeaways: [
      "Việc lớn không giao được nguyên khối: tách thành các bước nộp được một thứ.",
      "Mỗi bước cần một chủ, một hạn, một điều kiện xong nhìn thấy được.",
      "Thêm người không giảm giờ đúng tỉ lệ vì có thêm chi phí phối hợp.",
      "AI tách bước rất nhanh, nhưng chủ và hạn thật là việc của bạn.",
    ],
    practicePrompt: {
      question:
        "Bước nào cần sửa để giao được? (a) 'Hà nhập 150 hồ sơ đợt 1, xong thứ Sáu' (b) 'Chuẩn bị hồ sơ' (c) 'Nam kiểm 20 bộ mẫu, xong thứ Tư'",
      options: [
        "Bước (b), vì không có chủ, số lượng, hạn hay điều kiện xong",
        "Bước (a), vì Hà chưa được hỏi xem có rảnh không",
        "Bước (c), vì Nam kiểm chỉ 20 bộ là quá ít để tin",
        "Cả ba đều đủ, vì nhóm sẽ tự hiểu ý nhau khi làm",
      ],
      correct: 0,
      explanation:
        "Bước (b) là tên của một khu vực công việc, chưa nói ai, bao nhiêu, khi nào. (a) và (c) đã đủ ba yếu tố; việc hỏi Hà có rảnh không là bước xác nhận riêng, không phải lỗi của câu. Chọn 20 bộ mẫu là một quyết định nghề nghiệp, không phải lỗi giao việc.",
    },
    summary: {
      keyIdea: "Việc lớn chỉ chạy khi mỗi khúc có chủ, hạn và điều kiện xong.",
      formula: "Mục tiêu → các bước nộp được → mỗi bước: chủ + hạn + điều kiện xong.",
      commonMistake: "Ghi cả việc lớn thành một dòng rồi tin có người khác lo.",
      action: "Chọn một việc lớn của nhóm và tách nó thành 6-10 bước có chủ và hạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc kéo dài từ hai tuần của nhóm bạn. Nhờ AI tách thành các bước, rồi tự gán cho mỗi bước một người và một hạn thật. Đánh dấu bước nào chưa nói được điều kiện xong, viết lại cho đến khi ai đọc cũng biết khi nào là xong. Lưu thành bảng dùng ngay tuần này.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn: bước đầu tiên đã có người nhận chưa?",
    },
    sections: [
      {
        type: "lead",
        text: "'Chuyển hồ sơ sang bảng tính chung trong tháng này' nghe như một việc nhưng thực ra là cả một mục tiêu. Bài này dạy bạn bẻ nó thành các việc nhỏ có chủ, có hạn, và dùng AI để tách nhanh mà không mất kiểm soát.",
      },
      {
        type: "feynman",
        title: "Bẻ việc lớn đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dọn một căn nhà trong một cuối tuần. Nếu chỉ dặn cả nhà 'dọn nhà đi', cuối chủ nhật vẫn còn nguyên đống đồ. Nếu chia: Nam lau kính phòng khách, Hà sắp tủ bếp, con lau nhà, mỗi người biết phần mình và biết khi nào xong, nhà sạch trước bữa trưa.",
        columns: ["Dọn nhà", "Việc nhóm", "Vì sao hiệu quả"],
        rows: [
          ["'Dọn nhà đi'", "'Chuyển hồ sơ trong tháng'", "Không ai biết phần mình"],
          ["Nam lau kính phòng khách", "Hà nhập 150 hồ sơ đợt 1", "Có chủ và có phần cụ thể"],
          ["Xong trước 11 giờ", "Xong thứ Sáu tuần này", "Có hạn nhìn thấy được"],
          ["Kính không còn vết là xong", "Đủ 150 dòng, không thiếu cột", "Có điều kiện xong"],
        ],
        oneLiner: "Bẻ việc lớn là chia phòng cho từng người: ai làm phần nào, xong khi nào, thế nào là xong.",
      },
      { type: "heading", text: "Vì sao một dòng là quá ít" },
      {
        type: "paragraph",
        text: "Việc lớn giao nguyên khối có hai lỗi. Thứ nhất, ai cũng tưởng có người khác đang lo. Thứ hai, không có mốc trung gian nên bạn chỉ biết mình trễ khi đã quá muộn. Bẻ nhỏ giúp bạn thấy trễ ở tuần một thay vì tuần bốn.",
      },
      {
        type: "chart",
        title: "Số giờ còn lại theo số người nhận việc",
        caption:
          "Số liệu minh hoạ: một việc 120 giờ. Kéo số người và số giờ mỗi người làm mỗi tuần để xem việc xong sớm hay trễ. Mô hình đơn giản, bỏ qua thời gian phối hợp, nên thực tế giờ giảm chậm hơn.",
        kind: "line",
        xLabel: "Tuần",
        yLabel: "Giờ còn lại",
        x: { from: 0, to: 6, step: 1 },
        params: [
          { id: "total", label: "Tổng số giờ của việc", min: 40, max: 200, step: 10, value: 120, unit: "giờ" },
          { id: "people", label: "Số người nhận việc", min: 1, max: 6, step: 1, value: 1, unit: "người" },
          { id: "perweek", label: "Giờ mỗi người làm mỗi tuần", min: 1, max: 15, step: 1, value: 10, unit: "giờ" },
        ],
        series: [{ label: "Giờ còn lại", expr: "max(0, total - x * people * perweek)" }],
      },
      { type: "heading", text: "Bốn phần của một việc nhỏ" },
      {
        type: "list",
        items: [
          "Nộp được một thứ: một bảng, một trang, một nhóm hồ sơ, không phải 'chuẩn bị'.",
          "Có một chủ: một tên, không phải 'cả nhóm'.",
          "Có một hạn: ngày, không phải 'trong tháng'.",
          "Có điều kiện xong: ai nhìn cũng biết đã xong hay chưa.",
        ],
      },
      {
        type: "flow",
        title: "Tách việc lớn với AI",
        steps: [
          {
            label: "Viết mục tiêu và hạn cuối",
            detail: "Một câu: làm gì, để làm gì, xong khi nào. Thêm số lượng thật (ví dụ 600 bộ hồ sơ) để AI không phải đoán.",
          },
          {
            label: "AI đề xuất các bước",
            detail: "AI tách rất nhanh và hay đủ ý. Nhưng nó không biết nhóm bạn có bao nhiêu người hay việc nào đã làm một phần.",
          },
          {
            label: "Bạn gán chủ và hạn thật",
            detail: "Chọn người theo lịch thật của họ (bài 3), đặt hạn theo mốc cuối tuần. Bước nào chưa có chủ thì chưa giao.",
          },
          {
            label: "Soát và theo dõi mỗi tuần",
            detail: "Nhờ AI soát: bước nào thiếu chủ, thiếu hạn, hay điều kiện xong còn mơ hồ. Mỗi cuối tuần, đối chiếu tiến độ với mốc.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI tách việc chuyển hồ sơ",
        task:
          "Nhóm có 600 bộ hồ sơ khách hàng giấy, phải nhập vào bảng tính chung trong 4 tuần, có 3 người: Hà, Nam, Thu. Lắp yêu cầu để AI tách bước và soát chủ, hạn.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu và số lượng",
            options: [
              {
                text: "Giúp tôi lên kế hoạch chuyển hồ sơ.",
                feedback: "Không có số lượng hay thời hạn, AI sẽ tự bịa: nó có thể tách thành 30 bước hay 3 bước mà không ai biết đúng.",
              },
              {
                text: "Chuyển 600 bộ hồ sơ giấy vào bảng tính chung trong 4 tuần, nhóm có 3 người.",
                good: true,
                feedback: "Có số lượng, hạn và nhân lực. AI tách đợt hợp lý thay vì đoán.",
              },
            ],
          },
          {
            id: "shape",
            label: "Khuôn của mỗi bước",
            options: [
              {
                text: "Mỗi bước phải có: thứ nộp được, một người, một hạn cuối tuần, điều kiện xong.",
                good: true,
                feedback: "Khuôn này buộc AI ghi đủ các phần, và bạn soát được bằng mắt.",
              },
              {
                text: "Liệt kê thật nhiều bước cho đầy đủ.",
                feedback: "'Nhiều' không có nghĩa là nhỏ và có chủ. Bạn sẽ nhận một danh sách dài, thiếu chủ và hạn.",
              },
            ],
          },
          {
            id: "check",
            label: "Bước soát",
            options: [
              {
                text: "Cuối cùng chỉ ra bước nào chưa có người, hạn hay điều kiện xong, và không tự gán thay tôi.",
                good: true,
                feedback: "AI đóng vai người soát và để việc gán người cho bạn, đúng chỗ nó không biết.",
              },
              {
                text: "Tự chia luôn cho Hà, Nam, Thu sao cho hợp lý.",
                feedback: "AI không biết lịch và sức của từng người, nó sẽ chia theo cảm giác và có thể dồn lên một người.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "shape", "check"],
            text:
              "Đợt 1 (tuần 1): 150 bộ, xong thứ Sáu tuần 1, điều kiện xong: đủ 150 dòng, không thiếu cột.\nĐợt 2 (tuần 2): 150 bộ, xong thứ Sáu tuần 2.\nĐợt 3 (tuần 3): 150 bộ. Đợt 4 (tuần 4): 150 bộ và rà soát lần cuối.\nChưa gán người: bạn chọn giữa Hà, Nam, Thu theo lịch thật của họ.\nLưu ý: chưa có chủ cho đợt 1-4, cần bạn gán.",
          },
          {
            requires: ["goal"],
            text:
              "1. Chuẩn bị hồ sơ. 2. Nhập dữ liệu. 3. Kiểm tra. 4. Hoàn thiện.\n(Có số lượng nhưng các bước là tên khu vực công việc, không có chủ, hạn hay điều kiện xong.)",
          },
          {
            text:
              "Tuần 1: Hà 300 bộ. Tuần 2: Nam 500 bộ. Tuần 3: Thu 800 bộ.\n(AI không biết số lượng thật nên bịa: tổng đã hơn 600 bộ, và chia theo cảm giác, dồn lên một người.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thêm người không cứu được việc bị bẻ sai",
        text: "Nếu các bước không rõ điều kiện xong, thêm người chỉ thêm người hỏi nhau 'phần này ai làm?'. Bẻ đúng trước, rồi mới cân chuyện thêm người.",
      },
      {
        type: "scenario",
        title: "Tuần một: soát bảng việc trước khi giao",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đã tách việc chuyển hồ sơ thành 8 bước. Bảng có bước 'Chuẩn bị hồ sơ' chưa có chủ, hạn hay điều kiện xong. Bạn muốn giao ngay hôm nay. Bạn làm gì?",
            choices: [
              { label: "Giao cả 8 bước cho cả nhóm, cứ để họ tự hiểu", next: "bad_all" },
              { label: "Viết lại bước đó: 'Nam đếm và xếp 600 bộ thành 4 đợt, xong thứ Tư', rồi giao", next: "s2" },
            ],
          },
          bad_all: {
            text: "Ba tuần sau chưa ai đụng tới bước 'chuẩn bị hồ sơ' vì ai cũng nghĩ người khác làm. Đợt 1 trễ và kéo cả kế hoạch.",
            ending: "bad",
          },
          s2: {
            text: "Bảng đã có chủ và hạn. Cuối tuần một, đợt 1 mới xong 90/150 bộ. Bạn làm gì?",
            choices: [
              { label: "Chờ thêm, chắc tuần sau họ sẽ bù", next: "bad_wait" },
              { label: "Hỏi Hà có vướng gì, nhờ Thu giúp 60 bộ, chỉnh mốc tuần hai", next: "good" },
            ],
          },
          bad_wait: {
            text: "Tuần hai lại thiếu tiếp. Đến tuần ba bạn mới giật mình khi thiếu tới 240 bộ, và không còn đủ thời gian bù.",
            ending: "bad",
          },
          good: {
            text: "Vì có mốc từng tuần, bạn thấy chậm ngay tuần đầu và bù kịp. Việc xong đúng cuối tháng, không ai phải làm đêm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Việc lớn chạy được khi mỗi khúc có chủ, hạn và điều kiện xong.",
          "Bài sau: gom việc của cả nhóm vào một bảng cho tuần thứ Hai.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 5 ─────────────────────────
  {
    id: 2064,
    slug: "mini-du-an-bang-giao-viec-tuan",
    title: "Chặng 33, Bài 5: Mini-dự án: bảng giao việc cho cả tuần",
    subtitle: "Cuối cùng gom mọi thứ vào một bảng: người nhận, hạn, điều kiện xong. Thứ Hai bạn dùng thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: một trang giao việc, soát tin nhắn, cân việc gấp, bẻ việc lớn. Bài này ghép chúng thành một bảng cho cả tuần, để sáng thứ Hai nhóm biết ai làm gì, xong khi nào, mà bạn không phải nhắc từng người.",
    openingQuestion:
      "Chiều thứ Sáu bạn có 8 việc rải rác trong đầu và trên tin nhắn. Bạn muốn sáng thứ Hai cả nhóm biết mình làm gì. Cách nào có ích nhất?",
    openingOptions: [
      "Gom vào một bảng có người, hạn, điều kiện xong cho từng việc",
      "Nhắn riêng từng người vào sáng thứ Hai và nói miệng khi gặp ở văn phòng",
      "Gửi một email dài mô tả các việc theo từng đoạn văn",
      "Chờ mọi người hỏi việc của mình rồi trả lời từng người",
    ],
    correctOption: 0,
    explanation:
      "Một bảng chung cho mọi người thấy cùng lúc ai làm gì, xong khi nào, và bạn nhìn ra chỗ ai đang quá tải hay việc nào chưa có chủ. Nhắn riêng từng người thì mỗi người chỉ thấy phần mình, không ai thấy toàn cảnh. Email dài thì khó tìm phần của mình, và không dễ kiểm tiến độ. Chờ mọi người hỏi thì bạn chỉ biết việc nào mơ hồ khi đã trễ.",
    diagram: [
      { label: "Gom 8-10 việc đang có vào một danh sách", arrow: true },
      { label: "Mỗi việc: người nhận, hạn, điều kiện xong", arrow: true },
      { label: "Soát tải: ai đang quá nhiều, việc nào chưa có chủ", arrow: true },
      { label: "Gửi bảng và hỏi ngược xem mọi người hiểu giống nhau", arrow: true },
      { label: "Kiểm bảng vào giữa tuần và chiều thứ Sáu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm vận hành 5 người",
      description:
        "Mỗi thứ Hai trưởng nhóm nhắn từng người một, mỗi người nhận một danh sách khác nhau, hay quên việc của người khác. Chuyển sang một bảng chung xem được từ đầu tuần, nhóm thấy có việc hai người cùng làm và một việc không ai làm. Đây là tình huống minh hoạ; cái đổi không phải công cụ mà là mọi người thấy cùng một toàn cảnh.",
    },
    quiz: [
      Q(
        "Bảng giao việc cho cả tuần cần có những cột nào?",
        [
          "Việc, người nhận, hạn và điều kiện xong",
          "Việc, tên sếp duyệt và mức yêu thích của từng người",
          "Việc, ghi chú tự do và lời nhắn nhóm",
          "Việc, số giờ dự tính và điểm đánh giá",
        ],
        "Bốn cột đầu là tối thiểu để bảng dùng được: việc gì, ai, khi nào, thế nào là xong. Mức độ yêu thích và ghi chú tự do không giúp kiểm tiến độ. Điểm đánh giá cuối tuần là chuyện khác, còn số giờ dự tính chỉ bổ sung khi bạn thật sự cần cân tải.",
      ),
      Q(
        "Khi soát bảng thấy Nam có 7 việc còn Thu chỉ 2. Điều nào nên làm?",
        [
          "Hỏi Nam việc nào lùi được, rồi chuyển bớt cho Thu",
          "Giữ nguyên bảng và nhắc riêng Thu tự nhận thêm việc của Nam",
          "Tự chuyển 3 việc từ Nam sang Thu mà chưa hỏi ai",
          "Giữ nguyên bảng, vì Nam làm giỏi nên chắc lo được hết",
        ],
        "Đếm số việc chưa đủ để chia: bạn cần biết việc nào lùi được và Thu có còn chỗ. Hỏi trước rồi chuyển là cách chia đúng. Chuyển thẳng mà không hỏi có thể dồn việc lên người đã đầy. Cho rằng người giỏi lo được hết chính là cách làm họ quá tải.",
      ),
      Q(
        "Việc 'Cập nhật bảng doanh số' chưa có người nhận trong bảng. Bạn xử lý thế nào?",
        [
          "Hỏi từng người còn chỗ để nhận, rồi ghi tên vào trước khi gửi bảng",
          "Ghi 'cả nhóm' vào cột người nhận để mọi người cùng để ý tới việc",
          "Để trống vì đến thứ Sáu chắc có ai đó làm giúp cho xong",
          "Tự làm đêm chủ nhật, không ghi vào bảng để khỏi thêm việc",
        ],
        "Việc chưa có chủ là chỗ hỏng lớn nhất của bảng: ai cũng nghĩ người khác lo. 'Cả nhóm' chính là không ai. Để trống hoặc tự âm thầm làm đều làm bảng không phản ánh thật, và bạn thành nút thắt.",
      ),
      Q(
        "Bạn gửi bảng cho nhóm xong. Bước nào giúp biết mọi người hiểu đúng?",
        [
          "Nhờ mỗi người nói lại bằng một câu việc và hạn của mình",
          "Hỏi 'mọi người hiểu hết chưa' trong nhóm chat",
          "Chờ cuối tuần xem ai nộp việc rồi mới biết",
          "Gửi lại bảng lần hai vào sáng thứ Ba và nhắn mọi người đọc kỹ hơn cho chắc",
        ],
        "Nghe người nhận nói lại bằng lời của họ là cách nhanh nhất để thấy chỗ hai bên hiểu khác. Câu 'hiểu hết chưa' thường chỉ nhận lại chữ 'rồi' lịch sự. Chờ cuối tuần thì quá muộn để sửa. Gửi lại bảng lần hai không thêm thông tin nào.",
      ),
      Q(
        "Khi nhờ AI dựng bảng giao việc, không nên dán loại thông tin nào?",
        [
          "Thông tin cá nhân nhạy cảm của nhân viên như sức khoẻ, gia đình, lương",
          "Tên việc, hạn và điều kiện xong của từng việc trong tuần",
          "Vai trò chung của từng người trong nhóm, viết theo chữ cái như A, B, C thay cho tên thật",
          "Mô tả việc chung như 'cập nhật bảng doanh số tuần'",
        ],
        "Sức khoẻ, gia đình, lương của người trong nhóm là dữ liệu nhạy cảm: không có lý do dán vào công cụ khi bạn chưa chắc nơi lưu và công ty chưa duyệt. Việc, hạn, điều kiện xong và vai trò chung thì bảng cần và rủi ro thấp.",
      ),
    ],
    keyTakeaways: [
      "Bảng giao việc cả tuần gồm: việc, người nhận, hạn, điều kiện xong.",
      "Soát tải trước khi gửi: ai quá nhiều, việc nào chưa có chủ.",
      "Nhờ người nhận nói lại bằng lời của họ để biết đã hiểu chung chưa.",
      "Không dán thông tin nhạy cảm của người trong nhóm vào công cụ AI.",
    ],
    practicePrompt: {
      question:
        "Bảng tuần này có việc 'Hỗ trợ khách A' ghi người nhận là 'cả nhóm', hạn 'cuối tuần'. Cách sửa tốt nhất?",
      options: [
        "Chọn một người, ghi hạn ngày giờ, viết điều kiện xong",
        "Thêm chữ 'quan trọng' cho cả nhóm cùng để ý tới việc này hơn",
        "Đổi hạn thành 'sớm' để nhóm chú ý hơn tới việc này",
        "Giữ nguyên, vì việc hỗ trợ khách thì ai rảnh sẽ làm",
      ],
      correct: 0,
      explanation:
        "Người nhận là một tên, hạn là ngày giờ, điều kiện xong là thứ kiểm được. 'Quan trọng' hay 'sớm' không thêm thông tin, và 'ai rảnh sẽ làm' là công thức cho việc không ai làm.",
    },
    summary: {
      keyIdea: "Một bảng giao việc tốt cho cả nhóm thấy cùng một toàn cảnh và cho bạn thấy chỗ hỏng sớm.",
      formula: "Việc + người + hạn + điều kiện xong, soát tải, gửi, nhờ nói lại.",
      commonMistake: "Ghi 'cả nhóm' vào cột người nhận, nghĩa là không ai.",
      action: "Dựng bảng giao việc tuần tới và dùng thật vào sáng thứ Hai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Gom 6-10 việc thật của nhóm bạn cho tuần tới. Nhờ AI xếp thành bảng bốn cột: việc, người nhận, hạn, điều kiện xong (dùng tên viết tắt nếu chưa chắc công cụ an toàn). Soát: mỗi việc có một chủ chưa, có ai nhiều việc quá không. Gửi nhóm và nhờ mỗi người nói lại việc của mình bằng một câu.",
      secondary: "Chiều thứ Sáu, mở lại bảng và ghi việc nào xong, việc nào lùi, để tuần sau bảng chính xác hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài ghép các bài trước: bạn gom việc thật của nhóm thành một bảng giao việc cho cả tuần. Kết quả là một bảng bạn dùng được vào sáng thứ Hai, và một cách soát nhanh chỗ nào còn thiếu chủ hoặc thiếu hạn.",
      },
      {
        type: "feynman",
        title: "Bảng giao việc đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tấm bảng phân công trực nhật của lớp: ghi tên từng bạn cạnh việc quét sân, lau bảng, tưới cây, và ngày làm. Ai đi qua cũng thấy phần mình, và cô giáo liếc qua biết việc nào chưa có người. Bảng giao việc của nhóm cũng là tấm bảng trực nhật đó.",
        columns: ["Bảng trực nhật", "Bảng giao việc", "Lợi ích"],
        rows: [
          ["Tên bạn cạnh việc", "Cột người nhận", "Ai cũng biết phần mình"],
          ["Ngày trực", "Cột hạn", "Không ai hỏi 'khi nào'"],
          ["Lau bảng là xong", "Cột điều kiện xong", "Không cãi nhau xong hay chưa"],
          ["Ô trống trên bảng", "Việc chưa có chủ", "Cô giáo thấy ngay chỗ hỏng"],
        ],
        oneLiner: "Bảng giao việc là tấm bảng trực nhật của nhóm: ai cũng thấy phần mình, và ô trống hiện ra ngay.",
      },
      { type: "heading", text: "Tại sao cần một bảng chung" },
      {
        type: "paragraph",
        text: "Khi bạn nhắn riêng từng người, mỗi người chỉ thấy phần mình. Không ai thấy hai người đang làm trùng, một việc chưa có chủ, hay một người đang ôm quá nhiều. Một bảng chung cho cả nhóm thấy toàn cảnh, và cho bạn thấy chỗ hỏng khi còn kịp sửa.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhắn riêng từng người",
          text: "Nhanh cho từng cuộc, nhưng không ai thấy toàn cảnh. Việc trùng và việc mồ côi chỉ lộ ra vào thứ Sáu.",
        },
        right: {
          label: "Một bảng cho cả tuần",
          text: "Mất vài phút gom một lần. Cả nhóm thấy cùng thứ, bạn soát tải và việc thiếu chủ ngay đầu tuần.",
        },
      },
      {
        type: "list",
        items: [
          "Gom mọi việc đang có: tin nhắn, email, việc sếp nhờ, việc lặp lại mỗi tuần.",
          "Mỗi việc một dòng: việc, người nhận, hạn (ngày giờ), điều kiện xong.",
          "Soát tải: đếm số việc của từng người, tìm việc chưa có chủ.",
          "Gửi bảng, nhờ mỗi người nói lại việc của mình bằng một câu.",
        ],
      },
      {
        type: "flow",
        title: "Từ đống việc rời rạc đến bảng dùng thứ Hai",
        steps: [
          {
            label: "Gom việc thô",
            detail: "Dán các việc bạn nhớ (viết tắt tên, không kèm thông tin nhạy cảm) vào AI và nhờ xếp thành bảng bốn cột.",
          },
          {
            label: "Điền chỗ AI không biết",
            detail: "Người nhận thật, hạn thật, điều kiện xong thật là của bạn. Chỗ nào AI tự điền thì xoá và viết lại.",
          },
          {
            label: "Soát tải và việc mồ côi",
            detail: "Đếm việc mỗi người, tìm việc chưa có chủ. Nhờ AI đếm giúp rồi bạn tự đếm lại, vì AI có thể đếm sai.",
          },
          {
            label: "Gửi và nhờ nói lại",
            detail: "Gửi bảng, nhờ mỗi người nói lại việc và hạn của mình. Chỗ nói lệch là chỗ cần sửa bảng.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI xếp 8 việc thành bảng tuần",
        task:
          "Bạn có 8 việc rải rác cho tuần tới và 3 người: Hà, Nam, Thu. Lắp yêu cầu để AI xếp thành bảng bốn cột và soát tải.",
        parts: [
          {
            id: "items",
            label: "Dữ liệu đưa vào",
            options: [
              {
                text: "Xếp giúp tôi bảng công việc cho nhóm.",
                feedback: "AI không có danh sách việc nào nên sẽ bịa 8 việc nghe hợp lý cho một nhóm nào đó.",
              },
              {
                text: "Đây là 8 việc kèm hạn tôi biết, và tên viết tắt H, N, T. Việc nào chưa có hạn thì để trống.",
                good: true,
                feedback: "Dữ kiện thật, tên viết tắt, chỗ chưa biết để trống. AI không phải bịa.",
              },
            ],
          },
          {
            id: "columns",
            label: "Khuôn bảng",
            options: [
              {
                text: "Bảng bốn cột: việc, người nhận, hạn (ngày giờ), điều kiện xong. Chỗ chưa biết ghi 'chưa có', không tự điền.",
                good: true,
                feedback: "Khuôn rõ, và cho AI cách xử lý chỗ chưa biết thay vì bịa.",
              },
              {
                text: "Làm bảng cho đẹp và dễ nhìn.",
                feedback: "'Đẹp' không nói cột nào. Bạn sẽ nhận bảng nhiều màu mà thiếu hạn và điều kiện xong.",
              },
            ],
          },
          {
            id: "check",
            label: "Soát",
            options: [
              {
                text: "Cuối bảng liệt kê việc chưa có chủ và số việc của mỗi người, không tự chia lại.",
                good: true,
                feedback: "AI làm phần đếm và chỉ ra chỗ thiếu, quyết định chia lại vẫn ở bạn.",
              },
              {
                text: "Tự chia cho cân bằng giữa ba người.",
                feedback: "AI không biết ai đang kín lịch hay vướng việc riêng, nó chia đều theo số lượng chứ không theo thực tế.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["items", "columns", "check"],
            text:
              "| Việc | Người | Hạn | Xong khi |\n| Cập nhật bảng doanh số | H | 15h thứ Ba | Đủ 5 nhóm sản phẩm |\n| Gọi lại khách A | N | 11h thứ Tư | Có ghi chú kết quả cuộc gọi |\n| Kiểm kho B | T | chưa có | chưa có |\n...\nViệc chưa có chủ: 'Gửi báo giá khách C'. Số việc: H 3, N 4, T 1.",
          },
          {
            requires: ["items"],
            text:
              "| Việc | Người | Hạn |\n| Cập nhật bảng doanh số | H | Trong tuần |\n| Gọi lại khách A | N | Sớm |\n(Có đúng việc bạn đưa nhưng thiếu cột điều kiện xong, và hạn vẫn là 'trong tuần', 'sớm'.)",
          },
          {
            text:
              "| Việc | Người | Hạn |\n| Họp giao ban | Cả nhóm | Thứ Hai |\n| Lập kế hoạch marketing | Hà | Thứ Ba |\n(Toàn việc AI bịa: bạn chưa đưa việc nào nên bảng này không dùng được.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Không dán thông tin nhạy cảm về người trong nhóm",
        text: "Bảng giao việc chỉ cần việc, hạn, điều kiện xong. Chuyện sức khoẻ, gia đình, lương của một bạn trong nhóm không thuộc bảng này và không đưa vào công cụ AI khi công ty chưa duyệt.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu: dựng bảng cho tuần tới",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ Sáu bạn có 8 việc cho tuần tới và 3 người trong nhóm. AI vừa xếp bảng bốn cột, trong đó việc 'Gửi báo giá khách C' chưa có người nhận. Bạn xử lý thế nào?",
            choices: [
              { label: "Ghi 'cả nhóm' vào cột người nhận cho gọn rồi gửi bảng", next: "bad_all" },
              { label: "Hỏi Thu (2 việc) có nhận được không, rồi ghi tên Thu và hạn thứ Tư", next: "s2" },
            ],
          },
          bad_all: {
            text: "Thứ Sáu tuần sau khách C vẫn chưa nhận báo giá vì ai cũng nghĩ người khác gửi. Khách hỏi lại, nhóm mất một cơ hội.",
            ending: "bad",
          },
          s2: {
            text: "Thu nhận. Bạn gửi bảng và nhờ mỗi người nói lại việc của mình. Nam nói: 'Gọi lại khách A trước thứ Ba', còn trong bảng ghi 11h thứ Tư.",
            choices: [
              { label: "Bỏ qua, cả hai đều là đầu tuần nên không sao", next: "bad_mismatch" },
              { label: "Hỏi Nam vì sao hiểu vậy, sửa bảng nếu nhầm, hoặc làm rõ với Nam mốc thật", next: "good" },
            ],
          },
          bad_mismatch: {
            text: "Khách A cần được gọi trước thứ Ba để kịp đơn. Nam gọi lúc thứ Tư, khách đã đặt hàng ở nơi khác.",
            ending: "bad",
          },
          good: {
            text: "Bạn phát hiện bảng ghi sai mốc, sửa lại ngay. Sáng thứ Hai cả nhóm bắt đầu với bảng đúng, và đến chiều thứ Sáu bảng cho thấy 7 trên 8 việc xong đúng hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một bảng giao việc tốt là một tấm bảng trực nhật của nhóm.",
          "Bạn đã có đủ công cụ giao việc rõ ràng. Chặng tiếp theo: phản hồi và trò chuyện 1-1.",
        ],
      },
    ],
  },
];
