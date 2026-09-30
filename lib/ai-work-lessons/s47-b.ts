import type { Lesson } from "../lesson-types";

// Chặng 47, bài 6-10. Giáo trình: scripts/curriculum/stage-47.json.
// Không nêu tính năng riêng của công cụ nào: bài dạy cách đối chiếu và giao việc.

// Viết đáp án đúng trước cho dễ đọc; vị trí được xáo lại lúc dựng dữ liệu.
const Q = (question: string, right: string, wrong: [string, string, string], explanation: string) => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S47_B_LESSONS: Lesson[] = [
  {
    id: 2345,
    slug: "bien-ban-tu-dong-doc-ky-truoc-khi-gui",
    title: "Chặng 47, Bài 6: Biên bản tự động: đọc kỹ trước khi gửi cả nhóm",
    subtitle: "AI chép rất nhanh, nhưng người nhận việc trong biên bản phải đúng là người đã nhận việc.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai bạn mở biên bản AI tạo sau buổi họp, thấy gọn gàng đủ mục, và muốn bấm gửi ngay. Nhưng một dòng ghi nhầm tên người nhận việc hoặc nhầm hạn sẽ đi tới cả nhóm, và đến thứ Sáu mới lộ ra khi báo cáo chưa ai làm. Đọc đối chiếu mười phút trước khi gửi rẻ hơn rất nhiều.",
    openingQuestion:
      "AI gửi bạn biên bản có dòng: \"Anh Nam làm báo cáo doanh thu, hạn thứ Sáu.\" Bạn nhớ trong họp chị Lan mới là người nhận việc này. Bạn nên làm gì trước khi gửi nhóm?",
    openingOptions: [
      "Nghe lại đoạn ghi âm hoặc đọc bản chép chỗ đó, rồi sửa tên",
      "Gửi luôn vì biên bản do AI tạo nên chắc chắn đúng hơn trí nhớ của bạn",
      "Xoá dòng việc đó khỏi biên bản để khỏi gây tranh cãi trong nhóm",
      "Nhờ AI viết lại biên bản lần nữa và tin bản mới sẽ không còn nhầm",
    ],
    correctOption: 0,
    explanation:
      "Bản chép lời là bằng chứng gần nhất với điều đã nói, còn biên bản là bản AI tóm lại từ đó nên có thể lệch. Đối chiếu đúng chỗ nghi ngờ rồi sửa tên là cách nhanh và chắc. Gửi luôn thì tin AI hơn chính buổi họp. Xoá dòng việc làm mất một cam kết có thật. Nhờ AI viết lại không thêm bằng chứng nào mới nên có thể nhầm lần nữa theo cách khác.",
    diagram: [
      { label: "AI tóm bản chép thành biên bản nháp", arrow: true },
      { label: "Bạn đối chiếu từng việc, người, hạn với bản chép", arrow: true },
      { label: "Sửa chỗ lệch, đánh dấu chỗ chưa chắc", arrow: true },
      { label: "Gửi nhóm và nhờ mọi người xác nhận việc của mình" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: trưởng nhóm kinh doanh nhận biên bản nháp sau buổi họp tuần. Cô lọc riêng các dòng có tên người và ngày, đối chiếu từng dòng với bản chép và thấy hai việc bị gán nhầm người. Cô sửa, gửi nhóm kèm câu \"ai thấy việc của mình ghi sai, trả lời trước trưa mai\", và không ai phải làm lại việc của người khác.",
    },
    quiz: [
      Q(
        "Trong biên bản nháp của AI, loại dòng nào cần đối chiếu với bản chép trước tiên?",
        "Dòng có tên người, con số hoặc hạn, vì nhầm ở đó gây hậu quả ngay",
        [
          "Dòng mở đầu ghi ngày họp, vì đó là chỗ AI hay sai nhất",
          "Dòng có câu chào hỏi và cảm ơn, vì giọng văn cần đúng ý người nói",
          "Dòng dài nhất, vì đoạn dài thì AI chắc chắn đã tóm sai ý",
        ],
        "Tên, số và hạn là thông tin người khác sẽ làm theo, nên sai là tốn công thật. Ngày họp thường có sẵn trong lịch, câu chào không ai làm theo, và độ dài của dòng không cho biết dòng đó đúng hay sai.",
      ),
      Q(
        "Bản chép ghi chị Lan nhận việc, biên bản ghi anh Nam. Bạn sửa theo cách nào?",
        "Sửa theo bản chép, vì bản chép nằm sát lời nói thật",
        [
          "Giữ tên anh Nam vì AI đã tổng hợp kỹ",
          "Ghi cả hai tên rồi để hai người tự thoả thuận",
          "Hỏi anh Nam xem anh có muốn nhận việc không",
        ],
        "Bản chép là nguồn gốc, biên bản là bản tóm. Giữ tên sai thì việc đi nhầm người. Ghi cả hai làm việc không có chủ thật sự, và hỏi lại anh Nam thì bỏ qua điều chị Lan đã nhận trong họp.",
      ),
      Q(
        "Bản chép nói \"để em xem thử rồi báo\". Biên bản AI viết \"Lan cam kết xong thứ Sáu\". Điều gì đã xảy ra?",
        "AI biến một lời hứa mơ hồ thành cam kết có hạn cụ thể",
        [
          "AI tóm đúng ý, vì \"xem thử rồi báo\" nghĩa là sẽ xong trong tuần",
          "AI làm đúng việc của nó, vì biên bản nào cũng phải có hạn mới dùng được",
          "Bản chép nghe sai nên phải ghi âm lại",
        ],
        "Chữ \"thứ Sáu\" không có trong lời nói. AI hay điền cho trọn câu nên thêm hạn mà không ai hứa. Cách xử lý là đánh dấu \"hạn chưa chốt\" và hỏi lại chị Lan, không phải ghi âm lại hay đoán hộ.",
      ),
      Q(
        "Bạn nhờ AI kiểm lại chính biên bản nó vừa viết và nó báo \"không phát hiện lỗi\". Kết luận nào hợp lý?",
        "Chưa đủ, vì nó không nghe thấy cuộc họp và dễ lặp lại lỗi cũ",
        [
          "Đủ rồi, vì hai lần kiểm đều sạch lỗi",
          "Đủ rồi, vì AI kiểm lại thường kỹ hơn",
          "Chưa đủ, chỉ vì AI chưa đọc ghi chú tay",
        ],
        "Nếu không có bản chép để so, AI chỉ đọc lại câu chữ của chính nó và thấy hợp lý. Kiểm lần hai không thêm nguồn sự thật nào. Ghi chú tay có thể giúp, nhưng vấn đề gốc là thiếu đối chiếu với điều đã nói thật.",
      ),
      Q(
        "Sau khi gửi biên bản, câu nào nên thêm vào email để bắt lỗi sót?",
        "Ai thấy việc của mình ghi sai, báo trước trưa mai",
        [
          "Nếu không ai phản hồi thì coi như biên bản hoàn toàn chính xác từng dòng",
          "Mọi người chỉ cần đọc lướt vì biên bản đã được AI kiểm tra kỹ lưỡng",
          "Mọi thắc mắc xin gửi riêng cho trưởng nhóm sau khi việc đã làm xong",
        ],
        "Mỗi người biết rõ việc của mình nhất, nên hạn phản hồi ngắn gợi họ đọc đúng dòng của mình. Im lặng thường là chưa đọc chứ chưa hẳn là đúng, AI kiểm không thay được người nhận việc, và sửa sau khi làm xong thì đã muộn.",
      ),
    ],
    keyTakeaways: [
      "Biên bản AI là bản nháp, bản chép lời mới là bằng chứng gần nhất.",
      "Đối chiếu trước những dòng có tên người, con số và hạn.",
      "AI hay biến lời hứa mơ hồ thành cam kết có ngày cụ thể.",
      "Chỗ chưa chắc thì đánh dấu và hỏi lại, đừng đoán.",
      "Gửi nhóm kèm hạn phản hồi để mỗi người soát việc của mình.",
    ],
    practicePrompt: {
      question:
        "Biên bản ghi \"Phòng kế toán gửi số liệu quý, hạn 15\". Bản chép chỉ có \"kế toán gửi giúp em số quý nhé\". Bạn làm gì?",
      options: [
        "Đánh dấu hạn 15 là chưa chốt và hỏi lại phòng kế toán",
        "Giữ nguyên ngày 15 vì AI chắc đã nghe ở đoạn khác của buổi họp",
        "Xoá luôn dòng này vì không có hạn thì biên bản không cần ghi việc",
        "Đổi hạn thành cuối tháng cho an toàn rồi gửi như đã thống nhất",
      ],
      correct: 0,
      explanation:
        "Bản chép không có hạn nên con số 15 là AI điền thêm. Cách đúng là đánh dấu chưa chốt và hỏi người liên quan. Giữ nguyên tin vào một con số không có nguồn, xoá dòng làm mất một việc có thật, còn tự đổi sang cuối tháng là bịa ngày khác thay cho AI.",
    },
    summary: {
      keyIdea: "Biên bản AI là bản nháp: việc, người và hạn phải khớp với bản chép trước khi gửi.",
      formula: "Biên bản nháp + đối chiếu dòng có tên, số, hạn với bản chép + đánh dấu chỗ chưa chắc = biên bản gửi được.",
      commonMistake: "Thấy biên bản gọn và đủ mục nên tin nó đúng, rồi gửi ngay cả nhóm.",
      action: "Lần tới nhận biên bản nháp, chỉ gạch dưới mọi tên người và ngày, đối chiếu từng chỗ với bản chép.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biên bản hoặc ghi chú họp gần đây của bạn (có thể do AI tạo hoặc bạn tự viết). Gạch dưới mọi dòng có tên người và hạn, đối chiếu với nguồn gốc (bản chép, tin nhắn, lịch) và ghi lại số dòng bị lệch. Nếu cuộc họp có dữ liệu nhạy cảm, hãy che tên trước khi nhờ AI.",
      secondary: "Ghi ra loại lỗi gặp nhiều nhất (nhầm người, nhầm ngày, thêm ý) để lần sau soát đúng chỗ đó trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Buổi họp xong lúc 4 giờ chiều, biên bản AI đã nằm trong hộp thư lúc 4 giờ 05. Nhanh đến mức bạn muốn chuyển tiếp ngay cho cả nhóm. Bài này dạy mười phút đọc đối chiếu giúp biên bản của bạn đáng tin.",
      },
      {
        type: "feynman",
        title: "Biên bản tự động đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người bạn chép bài hộ khi bạn nghỉ học: chép nhanh, gọn, có đủ đầu mục, nhưng thỉnh thoảng ghi nhầm tên bạn ngồi cạnh hoặc hạn nộp bài. Bạn vẫn biết ơn, nhưng trước khi nộp bạn tự xem lại những chỗ có tên và ngày.",
        columns: ["Thành phần", "Bài chép hộ", "Biên bản AI"],
        rows: [
          ["Người chép", "Bạn cùng lớp", "AI tóm từ bản chép lời"],
          ["Chỗ dễ nhầm", "Tên bạn, ngày nộp bài", "Người nhận việc, hạn, con số"],
          ["Cách kiểm", "Hỏi lại bạn hoặc xem sách", "Đối chiếu với bản chép hoặc hỏi người liên quan"],
          ["Ai chịu trách nhiệm khi nộp", "Bạn", "Bạn, người gửi biên bản"],
        ],
        oneLiner: "Biên bản AI là bài chép hộ rất nhanh: dùng được, nhưng chỗ có tên và ngày bạn tự soát trước khi nộp.",
      },
      { type: "heading", text: "Vì sao biên bản trơn tru vẫn có thể sai" },
      {
        type: "paragraph",
        text: "AI viết câu nghe hợp lý, nên một dòng sai vẫn đọc rất mượt. Nó hay nhầm hai người có tên giống nhau, hay gán việc cho người nói nhiều nhất, và hay điền một cái hạn cho câu có vẻ còn thiếu. Bạn không cần đọc lại cả biên bản, chỉ cần đọc kỹ những dòng mà người khác sẽ làm theo.",
      },
      {
        type: "flow",
        title: "Từ biên bản nháp tới biên bản gửi nhóm",
        steps: [
          { label: "Nhận bản nháp", detail: "AI đưa biên bản gồm quyết định, việc, người phụ trách và hạn. Coi đó là bản nháp, chưa phải bản chính thức." },
          { label: "Gạch dưới dòng có tên, số, hạn", detail: "Những dòng người khác sẽ hành động theo là dòng cần soát. Phần mô tả chung có sai nhẹ cũng ít hại hơn." },
          { label: "Đối chiếu với bản chép", detail: "Tìm đúng đoạn nói về việc đó trong bản chép và xem ai nhận, hạn nào. Chỗ nào bản chép không nói thì đó là AI thêm." },
          { label: "Sửa hoặc đánh dấu chưa chắc", detail: "Sửa khi đã rõ. Khi bản chép mơ hồ, ghi \"hạn chưa chốt\" và đi hỏi người liên quan thay vì đoán." },
          { label: "Gửi kèm lời nhờ xác nhận", detail: "Mỗi người đọc phần của mình và trả lời nếu sai, trong một hạn ngắn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Gửi ngay bản AI",
          text: "Nhanh nhất trong 5 phút. Lỗi nhầm người chỉ lộ ra khi đến hạn mà việc chưa ai làm. Bạn là người ký tên gửi nên phải đứng ra giải thích.",
        },
        right: {
          label: "Đối chiếu rồi mới gửi",
          text: "Mất thêm khoảng 10 phút. Những dòng lệch được sửa từ đầu, chỗ chưa chắc được hỏi lại. Nhóm nhận biên bản và tin nó.",
        },
      },
      {
        type: "callout",
        label: "Ba dấu hiệu AI đã tự điền",
        text: "Một hạn cụ thể mà bản chép chỉ nói \"sớm nhé\". Một tên người trong khi lúc đó nhiều người nói. Một con số tròn xuất hiện trong biên bản nhưng không ai đọc lên. Gặp một trong ba dấu hiệu, quay lại đoạn chép lời đó trước khi sửa.",
      },
      {
        type: "scenario",
        title: "Biên bản buổi họp tuần vừa xong",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhận biên bản nháp có 6 việc. Hai việc ghi tên anh Nam, trong khi bạn nhớ chị Lan mới nhận báo cáo. Bạn có bản chép lời trong tay và 20 phút trước khi nhóm chờ biên bản.",
            choices: [
              { label: "Gửi luôn, vì AI ghi lại từng lời nên khó sai", next: "bad_send" },
              { label: "Gạch dưới các dòng có tên và hạn, rồi đối chiếu với bản chép", next: "s2" },
            ],
          },
          bad_send: {
            text: "Biên bản đến cả nhóm. Chị Lan tưởng không phải việc của mình, anh Nam bối rối vì không hề nhận. Thứ Sáu báo cáo không ai nộp và bạn phải giải thích trước sếp.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy việc báo cáo đúng là của chị Lan, nhưng việc \"gửi số liệu quý, hạn 15\" thì bản chép không nhắc hạn nào.",
            choices: [
              { label: "Sửa tên chị Lan, giữ hạn 15 vì nghe cũng hợp lý", next: "bad_date" },
              { label: "Sửa tên chị Lan, ghi \"hạn chưa chốt\" và hỏi lại bộ phận kế toán", next: "s3" },
            ],
          },
          bad_date: {
            text: "Kế toán thấy ngày 15 và nghĩ đó là hạn đã thống nhất, nhưng họ vốn định gửi ngày 20. Hai bên cãi nhau vì một ngày không ai từng hứa.",
            ending: "bad",
          },
          s3: {
            text: "Kế toán trả lời sẽ gửi số liệu ngày 20. Bạn cập nhật và chuẩn bị email gửi nhóm.",
            choices: [
              { label: "Gửi nhóm kèm câu \"ai thấy việc của mình ghi sai, báo trước trưa mai\"", next: "good" },
              { label: "Gửi nhóm không kèm gì, vì đã tự kiểm kỹ rồi", next: "bad_quiet" },
            ],
          },
          bad_quiet: {
            text: "Còn một việc ghi nhầm mà bạn không phát hiện. Không ai báo vì ai cũng nghĩ người khác đã đọc, và lỗi lộ ra khi đã trễ hạn.",
            ending: "bad",
          },
          good: {
            text: "Sáng hôm sau một đồng nghiệp báo dòng của cô ghi thiếu một nửa phạm vi công việc. Bạn sửa kịp, và cả nhóm có một biên bản mà ai cũng đã xác nhận việc của mình.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gạch dưới mọi dòng có tên người, con số và hạn.",
          "Bước 2 - Đối chiếu từng dòng với đúng đoạn trong bản chép.",
          "Bước 3 - Chỗ bản chép mơ hồ thì ghi \"chưa chốt\" và đi hỏi.",
          "Bước 4 - Gửi nhóm kèm hạn để mỗi người soát phần của mình.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Biên bản AI nhanh như người chép hộ: hãy soát những chỗ có tên và ngày.",
          "Bài sau: tách việc cần làm từ một bài nói lan man.",
        ],
      },
    ],
  },
  {
    id: 2346,
    slug: "tach-viec-can-lam-tu-bai-noi-lan-man",
    title: "Chặng 47, Bài 7: Tách việc cần làm từ một bài nói lan man",
    subtitle: "Cuộc họp dài 40 phút, việc cần làm chỉ có sáu dòng - nếu bạn biết xin AI lọc đúng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧺",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp nói nửa tiếng, nhảy từ chuyện khách hàng sang chuyện lịch nghỉ rồi quay lại chuyện báo giá. Bản chép có mười trang và bạn cần biết chính xác ai làm gì đến khi nào. Nếu xin AI một câu chung chung, bạn nhận về một bản tóm tắt dài thay vì danh sách việc. Xin đúng khuôn, bạn nhận một bảng đếm được.",
    openingQuestion:
      "Bạn có bản chép 10 trang một cuộc họp lan man. Yêu cầu nào cho ra danh sách việc dùng được nhất?",
    openingOptions: [
      "Liệt kê việc cần làm: việc, người, hạn, và dòng nào chưa rõ thì ghi riêng",
      "Tóm tắt cuộc họp thật đầy đủ và chi tiết cho tôi",
      "Cho tôi biết cuộc họp này nói về những chủ đề chính nào",
      "Viết lại bản chép cho gọn hơn và dễ đọc hơn giúp tôi",
    ],
    correctOption: 0,
    explanation:
      "Yêu cầu có khuôn cho AI biết cần trích ra những trường nào và có chỗ riêng cho điều chưa rõ, nên bạn không bị trộn việc thật với chuyện bàn chơi. Tóm tắt đầy đủ trả về một bài văn, hỏi chủ đề cho ra danh sách đề tài chứ không phải việc, còn viết lại cho gọn thì vẫn là một khối chữ bạn phải tự đọc để tìm việc.",
    diagram: [
      { label: "Bản chép dài, lẫn chuyện bàn và việc thật", arrow: true },
      { label: "Xin AI trích: việc, người, hạn", arrow: true },
      { label: "Dòng chưa rõ người hoặc hạn đưa sang danh sách hỏi lại", arrow: true },
      { label: "Bạn kiểm từng việc với đoạn gốc rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý văn phòng có bản chép 8 trang buổi họp điều phối. Cô xin AI trích việc theo khuôn \"việc, người, hạn, câu gốc\". Nhờ cột câu gốc, cô thấy ngay hai việc AI gán hạn mà lúc họp không ai nói, đưa chúng sang danh sách hỏi lại và chỉ gửi bốn việc đã rõ.",
    },
    quiz: [
      Q(
        "Vì sao nên yêu cầu AI kèm \"câu gốc\" trong bảng việc cần làm?",
        "Để bạn dò lại chỗ AI trích và thấy ngay việc nào là AI thêm",
        [
          "Để bảng trông đầy đủ hơn khi gửi sếp xem",
          "Để AI có thêm chữ mà viết cho tốt hơn",
          "Để khỏi phải đọc lại bản chép nữa",
        ],
        "Câu gốc là dấu vết để đối chiếu nhanh: việc nào không có câu gốc khớp thì đáng ngờ. Bảng dài ra không làm nó đúng hơn, AI không cần thêm chữ để trích tốt, và câu gốc chỉ thay cho việc đọc lại đoạn đó chứ không cho cả buổi họp.",
      ),
      Q(
        "Đoạn chép có \"để em lo vụ khách Hoàng\". Việc, người và hạn nên ghi thế nào?",
        "Việc: lo vụ khách Hoàng. Người: người nói. Hạn: chưa rõ, cần hỏi",
        [
          "Việc: lo vụ khách Hoàng. Người: người nói. Hạn: cuối tuần theo thông lệ",
          "Không ghi, vì câu nói quá chung chung để coi là một việc thật sự cần làm",
          "Việc: xử lý khách Hoàng. Người: cả phòng. Hạn: ngay sau buổi họp này",
        ],
        "Câu này có việc lờ mờ và có người nhận nhưng chưa có hạn. Điền hạn theo thông lệ là đoán, bỏ qua thì mất một cam kết, và gán cả phòng hay hạn tức thì là thêm điều chưa ai nói.",
      ),
      Q(
        "Bản chép có hai người cùng tên Hương, AI ghi \"Hương làm bảng giá\". Cách xử lý nào tốt nhất?",
        "Dò lại ai nói câu đó, nếu không rõ thì hỏi trực tiếp",
        [
          "Chọn Hương nói nhiều hơn trong buổi họp",
          "Giữ nguyên \"Hương\" và tin nhóm tự hiểu",
          "Ghi cả hai người tên Hương",
        ],
        "Khi tên trùng, chỉ đoạn nói gốc hoặc người liên quan mới phân giải được. Đoán theo lượng lời nói, tin nhóm tự hiểu hoặc ghi cả hai đều làm việc rơi vào tay sai người hoặc vào khoảng trống.",
      ),
      Q(
        "Bạn nên xin AI đặt mục \"cần hỏi lại\" riêng để làm gì?",
        "Để dòng thiếu người hoặc hạn không lẫn với việc đã chắc chắn",
        [
          "Để AI được phép đoán người và hạn mà không bị coi là làm sai",
          "Để bảng chính ngắn lại, các dòng khó tự động bị bỏ khỏi báo cáo",
          "Để sếp thấy nhóm còn nhiều việc chưa xong và tập trung chú ý hơn",
        ],
        "Mục riêng giữ cho danh sách chính chỉ có việc đã rõ, còn chỗ hổng nằm ở một nơi để đi hỏi. Nó không cho phép AI đoán, không có nghĩa bỏ các dòng đó đi, và không phải để gây áp lực cho sếp hay nhóm.",
      ),
      Q(
        "Cuộc họp 40 phút có nhiều chuyện bàn chơi. Ý nào đúng về việc lọc ra việc cần làm?",
        "Chỉ những câu có người nhận và thứ phải làm mới là việc, ý kiến thì không",
        [
          "Mọi câu có chữ \"nên\" hoặc \"cần\" đều là việc cần làm và phải có trong danh sách",
          "Việc nào được nhắc nhiều lần nhất thì là việc quan trọng và nên đứng đầu",
          "Câu nào sếp nói thì là việc, còn câu nhân viên nói thì chỉ là góp ý",
        ],
        "Một câu thành việc khi có thứ phải làm và một người nhận nó. \"Nên\" hay \"cần\" chỉ là ý kiến khi chưa ai nhận, số lần nhắc không bằng mức ưu tiên, và lời nhân viên nhận việc vẫn là một cam kết thật.",
      ),
    ],
    keyTakeaways: [
      "Xin danh sách có khuôn: việc, người, hạn, câu gốc.",
      "Dòng thiếu người hoặc hạn đưa sang mục hỏi lại, không để AI đoán.",
      "Cột câu gốc giúp bạn thấy ngay việc nào do AI thêm.",
      "Một câu là việc khi có thứ phải làm và có người nhận.",
      "Trùng tên và lời hứa mơ hồ là hai chỗ AI hay nhầm nhất.",
    ],
    practicePrompt: {
      question:
        "AI trả về 12 việc từ một cuộc họp, bạn chỉ thấy khoảng 6 việc thật trong trí nhớ. Bạn làm gì tiếp theo?",
      options: [
        "Dò 6 việc còn lại với cột câu gốc để xem có phải chuyện bàn chơi không",
        "Giữ cả 12 việc vì AI đọc kỹ hơn trí nhớ của bạn về cuộc họp",
        "Bỏ hết rồi tự viết danh sách từ trí nhớ vì AI không đáng tin cậy",
        "Nhờ AI cắt còn 6 việc ngẫu nhiên cho khớp con số bạn nhớ về cuộc họp hôm đó",
      ],
      correct: 0,
      explanation:
        "Số lượng chênh nghĩa là có dòng không phải việc hoặc bạn đã quên. Cột câu gốc cho biết ngay dòng nào là việc thật. Giữ cả 12 tin vào AI thiếu kiểm tra, bỏ hết bỏ phí phần nó làm tốt, còn cắt ngẫu nhiên có thể làm mất việc thật.",
    },
    summary: {
      keyIdea: "Từ bài nói lan man, chỉ trích những câu có người nhận và thứ phải làm.",
      formula: "Bản chép dài + khuôn (việc, người, hạn, câu gốc) + mục hỏi lại = danh sách việc kiểm được.",
      commonMistake: "Xin AI tóm tắt chung chung rồi tự đọc để tìm việc trong đống chữ.",
      action: "Lần tới có bản chép dài, dán khuôn bốn cột vào yêu cầu và xem mục hỏi lại có mấy dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bản chép hoặc ghi chú họp dài của bạn (che tên khách và số tiền thật nếu công ty chưa duyệt công cụ). Xin AI trích việc theo khuôn việc, người, hạn, câu gốc và một mục hỏi lại. Đối chiếu từng dòng với bản gốc và ghi số việc AI thêm hoặc bỏ sót.",
      secondary: "Lưu khuôn yêu cầu vào một file để lần sau chỉ việc dán.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuộc họp dài, bản chép dài, việc thật ít. Bài này dạy cách xin AI lọc ra đúng phần bạn cần và để riêng chỗ chưa rõ để đi hỏi.",
      },
      {
        type: "feynman",
        title: "Tách việc cần làm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới bà nội đi chợ: người nhà nói chuyện cả buổi sáng về bữa cơm, bà chỉ ghi lại những món cần mua, số lượng và ai đi chợ. Món nào nghe chưa rõ thì bà hỏi lại trước khi ra cửa.",
        columns: ["Thành phần", "Đi chợ", "Họp"],
        rows: [
          ["Chuyện lan man", "Bàn món ngon, nhớ chuyện cũ", "Ý kiến, chuyện bàn chơi, lời than"],
          ["Thứ cần ghi", "Món, số lượng, người đi", "Việc, người nhận, hạn"],
          ["Chưa rõ", "Mua thịt loại nào? Hỏi lại", "Ai nhận? Hạn nào? Đưa sang mục hỏi lại"],
          ["Kiểm lại", "Đọc list cho cả nhà nghe", "Gửi bảng để mỗi người xác nhận việc"],
        ],
        oneLiner: "Chỉ ghi cái phải làm, ai làm, khi nào, và chỗ nào chưa rõ thì hỏi lại chứ đừng đoán.",
      },
      { type: "heading", text: "Lan man nhưng vẫn có cấu trúc để bắt" },
      {
        type: "paragraph",
        text: "Trong bài nói dài, thứ hiếm nhất là câu có người nhận và thứ phải làm. Bạn không cần AI tóm cả buổi, bạn cần nó đếm đúng các câu đó. Cho AI một khuôn với bốn cột, nó sẽ nhặt ra các câu phù hợp, và cột câu gốc cho phép bạn kiểm từng dòng trong vài giây.",
      },
      {
        type: "flow",
        title: "Từ bản chép dài tới danh sách việc",
        steps: [
          { label: "Dán bản chép và nêu khuôn", detail: "Nói rõ cần bảng bốn cột: việc, người nhận, hạn, câu gốc. Nói rõ chỉ trích điều có trong bản chép." },
          { label: "AI nhặt các câu giống việc", detail: "Mỗi dòng trả về kèm câu gốc, nên bạn thấy ngay nó dựa vào đoạn nào." },
          { label: "Chỗ thiếu thì để riêng", detail: "Câu thiếu người hoặc thiếu hạn đưa vào mục hỏi lại, không được điền cho đủ." },
          { label: "Bạn dò câu gốc", detail: "Mở từng câu gốc, xem người và hạn có khớp. Dòng nào không có câu gốc rõ thì nghi là AI thêm." },
          { label: "Gửi bảng đã chắc", detail: "Gửi phần đã rõ cho nhóm, và đi hỏi phần còn lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu tách việc",
        task: "Bạn có bản chép 10 trang của buổi họp điều phối. Lắp yêu cầu để AI trả về danh sách việc kiểm được.",
        parts: [
          {
            id: "form",
            label: "Khuôn đầu ra",
            options: [
              { text: "Tóm tắt những điểm chính của cuộc họp.", feedback: "Bạn nhận một đoạn văn tóm chủ đề, việc nằm lẫn trong đó và bạn phải tự tìm lại." },
              { text: "Trả về bảng bốn cột: việc, người nhận, hạn, câu gốc trong bản chép.", good: true, feedback: "Khuôn rõ nên mỗi việc thành một dòng, và có câu gốc để kiểm." },
            ],
          },
          {
            id: "source",
            label: "Nguồn",
            options: [
              { text: "Dùng kiến thức chung về cách các phòng ban thường làm việc để bổ sung.", feedback: "AI sẽ thêm việc nghe hợp lý mà không ai nhắc, và bạn khó phân biệt với việc thật." },
              { text: "Chỉ dùng nội dung trong bản chép; không có thì để trống.", good: true, feedback: "Giới hạn nguồn giúp các ô trống hiện ra đúng chỗ thiếu thay vì bị lấp bằng điều bịa." },
            ],
          },
          {
            id: "unknown",
            label: "Chỗ chưa rõ",
            options: [
              { text: "Nếu thiếu hạn hoặc người, hãy chọn giá trị hợp lý nhất.", feedback: "Giá trị hợp lý là giá trị bịa: bạn nhận một hạn trông thật mà không ai từng hứa." },
              { text: "Nếu thiếu người hoặc hạn, đưa dòng đó sang mục riêng tên \"cần hỏi lại\".", good: true, feedback: "Chỗ hổng thành danh sách câu hỏi cụ thể, và bảng chính chỉ chứa việc đã chắc." },
            ],
          },
        ],
        responses: [
          {
            requires: ["form", "source", "unknown"],
            text: "Việc | Người | Hạn | Câu gốc\nGửi báo giá cho khách Hoàng | Lan | thứ Sáu | \"Lan gửi báo giá khách Hoàng trước thứ Sáu nhé\"\nCập nhật bảng tồn kho | Nam | thứ Tư | \"Nam cập nhật tồn kho hôm thứ Tư\"\n\nCần hỏi lại:\n- Đặt lịch giao hàng: chưa rõ ai lo, chưa rõ hạn.",
          },
          {
            requires: ["form"],
            text: "Việc | Người | Hạn | Câu gốc\nGửi báo giá cho khách Hoàng | Lan | thứ Sáu | ...\nChuẩn bị khuyến mãi tháng sau | Phòng marketing | cuối tháng | (không có câu gốc)\n\n(Khuôn đúng nhưng dòng khuyến mãi là AI thêm vì không được giới hạn nguồn.)",
          },
          {
            text: "Cuộc họp bàn về báo giá, tồn kho và giao hàng. Mọi người thống nhất cần phối hợp tốt hơn và sớm hoàn thành các việc quan trọng.\n\n(Một đoạn tóm tắt chung: không có việc nào đếm được, không biết ai làm gì đến khi nào.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Xin tóm tắt chung",
          text: "Ra một đoạn văn mượt về chủ đề. Việc, người, hạn nằm lẫn trong các câu. Bạn vẫn phải đọc lại bản chép để tìm việc. Khó kiểm vì không có câu gốc.",
        },
        right: {
          label: "Xin bảng có khuôn",
          text: "Mỗi việc một dòng, đủ bốn cột. Chỗ thiếu nằm riêng trong mục hỏi lại. Bạn dò được từng dòng qua câu gốc và gửi ngay phần đã chắc.",
        },
      },
      {
        type: "callout",
        label: "Một câu là việc khi nào",
        text: "Câu \"nên làm cái này\" chưa phải việc nếu chưa ai nhận. Câu \"để em lo\" chưa phải việc hoàn chỉnh nếu chưa có hạn. Hai chỗ đó là chỗ AI hay điền cho trọn, nên ta bắt nó đưa sang mục hỏi lại.",
      },
      {
        type: "scenario",
        title: "Bản chép 10 trang lúc 5 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: \"Cuối ngày cho anh danh sách việc của buổi họp.\" Bạn có bản chép dài, AI đã trích ra 9 dòng. Bạn thấy 2 dòng có hạn mà không nhớ ai từng nói.",
            choices: [
              { label: "Gửi sếp cả 9 dòng vì AI đã trích sẵn, đỡ mất thời gian", next: "bad_all" },
              { label: "Mở cột câu gốc của 2 dòng đó để kiểm", next: "s2" },
            ],
          },
          bad_all: {
            text: "Hai hạn đó là AI điền thêm. Sếp đọc rồi nhắn cả nhóm theo hạn sai, và đến hạn các bạn ngỡ ngàng vì chưa ai hứa.",
            ending: "bad",
          },
          s2: {
            text: "Câu gốc của cả hai dòng đều không có hạn. Người nhận việc thì rõ.",
            choices: [
              { label: "Bỏ luôn hai dòng khỏi danh sách cho gọn", next: "bad_drop" },
              { label: "Chuyển hai dòng sang mục \"cần hỏi lại\" kèm câu hỏi cụ thể", next: "s3" },
            ],
          },
          bad_drop: {
            text: "Hai việc thật biến mất khỏi danh sách và không ai theo dõi. Hai tuần sau khách hỏi tới thì cả nhóm mới nhớ ra.",
            ending: "bad",
          },
          s3: {
            text: "Bạn gửi sếp 7 việc đã rõ cùng 2 câu hỏi về hạn. Sếp trả lời 1 câu ngay, câu còn lại sếp cần hỏi khách.",
            choices: [
              { label: "Lưu khuôn bốn cột thành mẫu yêu cầu để dùng cho các buổi họp sau", next: "good" },
              { label: "Quên nó đi và lần sau viết yêu cầu khác từ đầu", next: "bad_repeat" },
            ],
          },
          bad_repeat: {
            text: "Tuần sau bạn lại xin \"tóm tắt cuộc họp\" và phải đọc lại cả bản chép để tìm việc, mất gấp đôi thời gian.",
            ending: "bad",
          },
          good: {
            text: "Từ nay mỗi buổi họp bạn dán cùng một khuôn và có danh sách việc kiểm được trong 10 phút.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xin bảng bốn cột: việc, người, hạn, câu gốc.",
          "Bước 2 - Chỉ dùng bản chép; thiếu thì để trống.",
          "Bước 3 - Dòng thiếu người hoặc hạn sang mục cần hỏi lại.",
          "Bước 4 - Dò câu gốc rồi gửi phần đã chắc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Xin một cái khuôn thay vì một bản tóm tắt, và để chỗ hổng thành câu hỏi.",
          "Bài sau: một cuộc họp, hai bản tóm tắt cho sếp và cho nhóm.",
        ],
      },
    ],
  },
  {
    id: 2347,
    slug: "tom-tat-hop-theo-nguoi-doc-sep-va-nhom",
    title: "Chặng 47, Bài 8: Một cuộc họp, hai bản tóm tắt: cho sếp và cho nhóm",
    subtitle: "Sếp cần hai dòng để quyết định, nhóm cần đủ chi tiết để làm - từ cùng một bản chép.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau buổi họp, sếp nhắn: cho anh hai dòng thôi. Trong khi nhóm cần biết ai làm gì, theo thứ tự nào. Gửi cùng một bản cho cả hai người thì sếp thấy dài, nhóm thấy thiếu. Hiểu người đọc là ai rồi mới nhờ AI tóm tắt, và kiểm chắc hai bản không nói lệch nhau.",
    openingQuestion:
      "Bạn cần gửi sếp hai dòng và gửi nhóm bản đầy đủ từ cùng một cuộc họp. Cách làm nào hợp lý nhất?",
    openingOptions: [
      "Xin hai bản riêng, mỗi bản nói rõ người đọc và độ dài, rồi đối chiếu hai bản",
      "Xin một bản thật chi tiết rồi gửi cho cả sếp và nhóm như nhau",
      "Xin bản hai dòng cho sếp, còn nhóm tự đọc bản chép nếu cần chi tiết",
      "Xin bản hai dòng rồi nhờ AI kéo dài ra cho nhóm và tin nó khớp nhau",
    ],
    correctOption: 0,
    explanation:
      "Người đọc khác nhau cần phần khác nhau: sếp cần kết quả và điều phải quyết, nhóm cần việc và hạn. Nêu rõ người đọc và độ dài giúp AI chọn đúng phần, và đối chiếu hai bản bắt được chỗ lệch. Một bản chi tiết làm sếp lạc, bỏ nhóm tự đọc bản chép tốn giờ, còn kéo dài bản ngắn thì dễ thêm ý AI tự nghĩ ra.",
    diagram: [
      { label: "Một bản chép, hai người đọc khác nhau", arrow: true },
      { label: "Xin bản hai dòng cho sếp, bản đủ việc cho nhóm", arrow: true },
      { label: "Đối chiếu hai bản: số, tên, quyết định phải khớp", arrow: true },
      { label: "Gửi từng người đúng bản của họ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý điều hành làm bản hai dòng cho giám đốc và bản sáu việc cho nhóm sau cùng một buổi họp. Khi đối chiếu, cô thấy bản hai dòng ghi ngân sách 50 triệu trong khi bản chép nói tối đa 50 triệu nếu được duyệt. Cô sửa thành \"tối đa 50 triệu, chờ duyệt\" trước khi gửi.",
    },
    quiz: [
      Q(
        "Câu nào giúp AI viết bản tóm tắt hợp với sếp nhất?",
        "Viết hai dòng cho giám đốc: quyết định và điều cần anh duyệt",
        [
          "Tóm tắt toàn bộ cuộc họp theo thứ tự thời gian, nêu từng người đã phát biểu",
          "Tóm tắt thật dễ hiểu, dùng từ ngữ đơn giản nhất có thể",
          "Viết ngắn gọn nhất có thể mà vẫn giữ được mọi chi tiết của cuộc họp",
        ],
        "Sếp cần biết đã quyết gì và phải duyệt gì, nên nêu người đọc và mục đích là rõ nhất. Tóm theo thời gian hay kể ai nói gì là bản của người chép, còn \"ngắn mà đủ mọi chi tiết\" tự mâu thuẫn và AI sẽ chọn bỏ thứ gì đó ngẫu nhiên.",
      ),
      Q(
        "Bản cho nhóm nên có những gì mà bản của sếp không cần?",
        "Từng việc, người nhận và hạn, vì nhóm cần biết phần của mình",
        [
          "Lời khen từng thành viên, vì nhóm cần được ghi nhận",
          "Toàn bộ bản chép dán nguyên văn để mọi người tự tìm phần mình",
          "Phân tích rủi ro của dự án, vì nhóm cần biết tình hình tổng thể",
        ],
        "Nhóm đọc để làm, nên cần việc, người, hạn. Lời khen có thể thêm nhưng không phải thứ thiết yếu, bản chép nguyên văn bắt mọi người đọc lại cả buổi họp, và phân tích rủi ro là việc của sếp hơn nhóm.",
      ),
      Q(
        "Bản hai dòng viết \"ngân sách 50 triệu\" còn bản chép nói \"tối đa 50 triệu nếu được duyệt\". Đây là lỗi gì?",
        "Lược bớt điều kiện làm con số trông như đã chắc chắn",
        [
          "Không phải lỗi, bản ngắn phải bỏ chữ phụ",
          "Lỗi chính tả số, vì AI đã đọc nhầm con số 50 thành một số khác",
          "Lỗi nhầm người nói, vì AI gán câu của sếp cho người khác trong họp",
        ],
        "Khi rút ngắn, điều kiện \"tối đa\" và \"nếu được duyệt\" hay bị bỏ, khiến một khả năng thành một khoản đã chốt. Con số vẫn đúng và không nhầm người, nhưng ý đã đổi, và ngắn gọn không có nghĩa được bỏ điều kiện.",
      ),
      Q(
        "Sếp đọc bản hai dòng và quyết định theo nó. Vì sao đối chiếu hai bản quan trọng?",
        "Bản ngắn dễ lệch ý mà người đọc không còn gì khác để kiểm",
        [
          "Vì sếp sẽ chấm điểm bạn theo độ dài của bản tóm tắt nhiều hơn nội dung",
          "Vì AI chỉ tạo được một bản đúng, còn bản thứ hai luôn phải viết tay",
          "Vì hai bản giống nhau từng chữ mới được coi là tóm tắt nhất quán",
        ],
        "Người đọc bản ngắn thường tin và quyết định theo nó, nên một chỗ lệch có thể đi thẳng thành quyết định sai. Hai bản không cần giống từng chữ, chỉ cần khớp về tên, số, điều kiện. AI làm được cả hai bản, nên không cần viết tay.",
      ),
      Q(
        "Bạn nhờ AI làm bản cho sếp, nó thêm câu \"nhóm đang rất hào hứng\". Nên làm gì?",
        "Xoá câu đó vì bản chép không có, sếp đọc sẽ coi là tin thật",
        [
          "Giữ lại vì câu đó tạo không khí tích cực",
          "Giữ lại vì AI đọc được giọng nói nên biết nhóm hào hứng hay không",
          "Giữ lại nhưng đổi thành \"hơi hào hứng\" cho đỡ quá lời",
        ],
        "Câu cảm xúc không có trong bản chép là AI thêm cho trọn ý. Sếp dễ coi đó là nhận xét thật của người dự họp. AI làm việc trên chữ của bản chép chứ không cảm nhận được không khí, và đổi mức độ vẫn là bịa.",
      ),
    ],
    keyTakeaways: [
      "Nêu rõ người đọc và độ dài trước khi xin tóm tắt.",
      "Sếp cần quyết định và điều phải duyệt, nhóm cần việc, người, hạn.",
      "Tóm ngắn hay bỏ điều kiện như \"tối đa\", \"nếu được duyệt\".",
      "Đối chiếu tên, số, điều kiện giữa hai bản.",
      "Câu cảm xúc hoặc đánh giá không có trong bản chép là AI thêm.",
    ],
    practicePrompt: {
      question:
        "Bản chép: \"có thể dời ra tháng sau nếu nhà cung cấp chưa giao.\" Bản hai dòng cho sếp ghi \"Dự án dời sang tháng sau\". Vấn đề là gì?",
      options: [
        "Bỏ điều kiện nên một khả năng thành quyết định đã chốt",
        "Bản hai dòng nên dài hơn, vì hai dòng luôn quá ít để tóm",
        "Nên bỏ chữ tháng sau vì sếp không cần biết thời gian cụ thể",
        "Không có vấn đề, vì tóm tắt ngắn thì phải bỏ chữ phụ như thế",
      ],
      correct: 0,
      explanation:
        "\"Có thể\" và \"nếu nhà cung cấp chưa giao\" là điều kiện quyết định. Bỏ chúng thì sếp tưởng dự án đã dời. Bản ngắn vẫn viết được với điều kiện, chỉ cần một mệnh đề. Bỏ thời gian làm mất thông tin cần thiết, và coi điều kiện là chữ phụ là nguồn của lỗi này.",
    },
    summary: {
      keyIdea: "Cùng một bản chép, mỗi người đọc một bản riêng, và hai bản phải khớp về ý.",
      formula: "Bản chép + người đọc và độ dài + đối chiếu tên, số, điều kiện = hai bản đáng gửi.",
      commonMistake: "Tóm ngắn cho sếp đến mức bỏ điều kiện, để một khả năng trông như quyết định.",
      action: "Sau buổi họp tới, làm hai bản và so ba thứ: tên, số, điều kiện.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú của một buổi họp gần đây (che thông tin nhạy cảm nếu chưa có công cụ được duyệt). Xin AI bản hai dòng cho sếp và bản một trang cho nhóm. Đối chiếu ba thứ giữa hai bản và bản gốc: tên, số, điều kiện. Ghi lại chỗ nào bị lệch.",
      secondary: "Lưu hai câu yêu cầu thành mẫu, một cho sếp và một cho nhóm.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau buổi họp bạn có một bản chép và hai người đọc rất khác nhau: sếp có hai phút, nhóm cần làm việc. Bài này dạy xin hai bản đúng người và kiểm chúng không lệch nhau.",
      },
      {
        type: "feynman",
        title: "Hai bản tóm tắt đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn kể chuyến đi về nhà: với sếp, bạn chỉ nói hai câu kết quả chuyến công tác; với gia đình, bạn kể từng chặng và từng chuyện. Hai cách kể khác nhau, nhưng không được nói lệch nhau chuyện bạn đi đâu và gặp ai.",
        columns: ["Thành phần", "Kể chuyến đi", "Tóm tắt họp"],
        rows: [
          ["Người nghe ít thời gian", "Sếp nghe hai câu kết quả", "Sếp đọc hai dòng quyết định"],
          ["Người nghe cần chi tiết", "Gia đình nghe từng chặng", "Nhóm đọc việc, người, hạn"],
          ["Điều không được lệch", "Đi đâu, gặp ai", "Tên, số, điều kiện"],
          ["Cách kiểm", "Nhớ lại chuyến đi thật", "Đối chiếu với bản chép"],
        ],
        oneLiner: "Cùng một câu chuyện, kể dài ngắn khác nhau theo người nghe, nhưng sự thật phải giữ nguyên.",
      },
      { type: "heading", text: "Bắt đầu từ người đọc, không từ bản chép" },
      {
        type: "paragraph",
        text: "Nếu bạn chỉ nói \"tóm tắt cuộc họp\", AI chọn giúp bạn phần nào quan trọng, và cách chọn đó thường là theo thứ tự xuất hiện. Hãy nói trước ai đọc, họ có bao nhiêu thời gian và họ sẽ làm gì với bản đó. Sếp sẽ quyết định, nhóm sẽ hành động, nên hai bản có nội dung khác nhau chứ không chỉ khác độ dài.",
      },
      {
        type: "flow",
        title: "Từ một bản chép tới hai bản",
        steps: [
          { label: "Viết người đọc và mục đích", detail: "Bản 1: sếp, hai dòng, để quyết định và duyệt. Bản 2: nhóm, một trang, để biết việc, người, hạn." },
          { label: "Xin từng bản riêng", detail: "Không xin cả hai cùng lúc rồi tin chúng khớp. Mỗi lần một bản với yêu cầu rõ." },
          { label: "Giữ điều kiện", detail: "Dặn AI: nếu bản chép có \"nếu\", \"tối đa\", \"dự kiến\" thì phải giữ trong bản ngắn." },
          { label: "Đối chiếu hai bản", detail: "So tên, con số và điều kiện giữa hai bản và với bản chép." },
          { label: "Gửi đúng người", detail: "Sếp nhận bản của sếp, nhóm nhận bản của nhóm." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản hai dòng cho sếp",
        task: "Bản chép nói: họp quyết định làm thử gói mới ở một chi nhánh, tối đa 50 triệu nếu được duyệt; chưa ai đo số khách; chị Lan phụ trách. Đánh dấu những câu AI đã tự thêm hoặc làm lệch ý.",
        segments: [
          { text: "Họp thống nhất làm thử gói dịch vụ mới ở một chi nhánh." },
          { text: "Ngân sách 50 triệu đã được chốt cho đợt thử.", error: "Bản chép nói tối đa 50 triệu nếu được duyệt. Bản ngắn bỏ điều kiện nên một khoản chờ duyệt thành khoản đã chốt." },
          { text: "Chị Lan phụ trách triển khai." },
          { text: "Nhóm đang rất hào hứng với gói mới.", error: "Không có câu nào trong bản chép nói về cảm xúc của nhóm. Đây là câu AI thêm cho nghe trọn ý." },
          { text: "Chưa có số liệu về lượng khách quan tâm." },
          { text: "Cần giám đốc duyệt ngân sách để triển khai." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một bản cho cả hai",
          text: "Quá dài cho sếp, thiếu việc cho nhóm. Mỗi người tự chọn phần mình cần. Dễ có người đọc sót và không biết điều kiện nào áp dụng.",
        },
        right: {
          label: "Hai bản theo người đọc",
          text: "Sếp thấy quyết định và điều phải duyệt. Nhóm thấy việc, người, hạn. Bạn kiểm hai bản với nhau và với bản chép trước khi gửi.",
        },
      },
      {
        type: "callout",
        label: "Bản ngắn là bản dễ sai nhất",
        text: "Càng ngắn, AI càng phải bỏ chữ, và điều kiện như \"nếu được duyệt\" là thứ dễ bị bỏ trước. Khi gặp con số trong bản hai dòng, luôn hỏi: bản chép có điều kiện nào đi kèm không?",
      },
      {
        type: "scenario",
        title: "Hai bản tóm tắt trước 5 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: \"Gửi anh hai dòng về buổi họp nhé.\" Nhóm cũng đang chờ bản đầy đủ. Bạn có bản chép và hai bản AI vừa tạo.",
            choices: [
              { label: "Gửi cả hai bản đi ngay vì AI làm từ cùng bản chép nên chắc khớp", next: "bad_skip" },
              { label: "So tên, số, điều kiện giữa hai bản và với bản chép", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Bản sếp ghi ngân sách 50 triệu đã chốt, bản nhóm ghi tối đa 50 triệu nếu được duyệt. Sếp hỏi lại và bạn mất uy tín vì hai bản mâu thuẫn.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy bản của sếp bỏ chữ \"nếu được duyệt\". Bản nhóm thì đúng.",
            choices: [
              { label: "Bỏ chữ \"chờ duyệt\" ở cả hai bản cho thống nhất", next: "bad_align" },
              { label: "Sửa bản sếp thành \"tối đa 50 triệu, chờ duyệt\"", next: "s3" },
            ],
          },
          bad_align: {
            text: "Cả hai bản cùng sai và khớp nhau. Nhóm bắt đầu tiêu ngân sách chưa được duyệt.",
            ending: "bad",
          },
          s3: {
            text: "Hai bản đã khớp về số và điều kiện. Còn câu \"nhóm đang rất hào hứng\" trong bản sếp, bản chép không có.",
            choices: [
              { label: "Giữ lại vì nghe tích cực và sếp sẽ vui", next: "bad_mood" },
              { label: "Xoá câu đó vì không có trong bản chép", next: "good" },
            ],
          },
          bad_mood: {
            text: "Sếp lấy câu đó để báo cáo lên cấp trên rằng nhóm rất ủng hộ. Khi có người hỏi bằng chứng, không ai tìm được.",
            ending: "bad",
          },
          good: {
            text: "Hai bản khớp nhau và khớp bản chép. Sếp duyệt ngân sách đúng điều kiện và nhóm triển khai theo bản của mình.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nói rõ người đọc, độ dài và mục đích của từng bản.",
          "Bước 2 - Xin từng bản riêng và dặn giữ điều kiện.",
          "Bước 3 - So tên, số, điều kiện giữa hai bản và với bản chép.",
          "Bước 4 - Xoá câu cảm xúc hoặc đánh giá không có trong bản chép.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một bản chép, hai người đọc, hai bản khác nhau nhưng không lệch nhau.",
          "Bài sau: họp có chuyện nhạy cảm thì phần nào không đưa cho AI.",
        ],
      },
    ],
  },
  {
    id: 2348,
    slug: "hop-co-noi-dung-nhay-cam-khong-dua-ai-nghe",
    title: "Chặng 47, Bài 9: Họp có chuyện nhạy cảm: phần nào không đưa cho AI",
    subtitle: "Có phần của cuộc họp nên ở lại trong phòng, và quy định của công ty quyết định hơn thói quen của bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Buổi họp quý có hai phần: phần kế hoạch chung và phần bàn về lương, khách hàng lớn, một nhân viên đang bị xem xét. Ghi âm và nhờ AI chép cả buổi tiện thật, nhưng phần nhạy cảm đã đi ra ngoài phòng họp theo cách bạn khó lấy lại. Bài này giúp bạn tách phần nào đưa, phần nào che, phần nào hỏi chính sách trước.",
    openingQuestion:
      "Buổi họp có 30 phút về kế hoạch quý và 15 phút bàn lương của cả phòng. Bạn chưa rõ công ty cho dùng công cụ AI nào. Bước đầu tiên hợp lý là gì?",
    openingOptions: [
      "Hỏi chính sách công ty và chỉ ghi phần kế hoạch chung",
      "Ghi âm cả buổi rồi xoá phần lương sau khi AI đã chép xong",
      "Ghi cả buổi và dùng công cụ AI miễn phí mà bạn đang quen dùng",
      "Bỏ hẳn việc ghi âm và không dùng AI cho mọi buổi họp nữa",
    ],
    correctOption: 0,
    explanation:
      "Công ty quyết định công cụ nào được dùng với dữ liệu nào, nên hỏi trước là bước chắc nhất, và kế hoạch chung ít nhạy cảm hơn lương. Xoá sau khi AI đã chép thì dữ liệu đã đi qua công cụ rồi. Dùng công cụ quen dùng mà chưa duyệt có thể vi phạm chính sách, còn bỏ hẳn AI là quá tay vì phần kế hoạch chung vẫn dùng được.",
    diagram: [
      { label: "Chia cuộc họp: phần chung và phần nhạy cảm", arrow: true },
      { label: "Phần nhạy cảm không ghi hoặc che thông tin", arrow: true },
      { label: "Hỏi chính sách công ty về công cụ được duyệt", arrow: true },
      { label: "Chỉ khi được phép mới đưa phần còn lại cho AI" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng phòng nhân sự có buổi họp gồm phần lịch tuyển dụng và phần thảo luận lương. Cô chỉ bật ghi âm cho phần lịch tuyển dụng, tắt khi chuyển sang lương và ghi tay vài dòng. Cô hỏi bộ phận pháp chế và IT xem công cụ nào được dùng cho phần còn lại trước khi thử.",
    },
    quiz: [
      Q(
        "Loại nội dung nào trong họp nên coi là nhạy cảm và cẩn thận nhất khi dùng AI?",
        "Lương, đánh giá cá nhân và thông tin khách hàng lớn",
        [
          "Lịch họp tuần sau và danh sách phòng họp cho từng nhóm",
          "Ý tưởng chung cho buổi dã ngoại cả phòng vào cuối tháng",
          "Câu hỏi chung về cách chia việc giữa hai nhóm trong phòng",
        ],
        "Lương, đánh giá một người và dữ liệu khách hàng gắn với cá nhân hoặc hợp đồng là thứ người liên quan không muốn lộ. Lịch phòng họp, dã ngoại và cách chia việc chung ít gây hại nếu đi ra ngoài.",
      ),
      Q(
        "Bạn muốn AI giúp tóm tắt phần bàn về một khách lớn. Cách nào vừa có ích vừa an toàn hơn?",
        "Thay tên khách bằng mã và bỏ số tiền, nếu công cụ đã được duyệt",
        [
          "Dán nguyên văn vì AI cần tên thật mới tóm tắt được chính xác",
          "Chỉ đổi tên khách thành viết tắt, còn số tiền để nguyên cho đúng",
          "Dán vào công cụ khác với công cụ thường dùng để không ai biết",
        ],
        "Mã hoá tên và bỏ số giữ phần cấu trúc lập luận, cộng thêm điều kiện công cụ đã được duyệt. AI không cần tên thật để tóm tắt, viết tắt vẫn nhận ra khách, và đổi công cụ không làm dữ liệu bớt nhạy cảm.",
      ),
      Q(
        "Công ty chưa có quy định về AI. Bạn nên làm gì trước khi đưa bản chép họp cho công cụ?",
        "Hỏi IT hoặc pháp chế, và trong lúc chờ chỉ dùng dữ liệu đã che",
        [
          "Coi như được phép vì chưa có quy định nào ở công ty cấm việc này cả",
          "Hỏi đồng nghiệp xem họ có làm vậy chưa rồi làm theo số đông",
          "Đọc điều khoản của công cụ rồi tự kết luận là dùng được",
        ],
        "Chưa có quy định không có nghĩa được phép, và người có thẩm quyền trả lời là IT hoặc pháp chế. Đồng nghiệp làm không chứng minh được gì, và điều khoản công cụ không thay cho chính sách dữ liệu của công ty bạn.",
      ),
      Q(
        "Buổi họp có người ngoài công ty tham dự. Điều gì cần làm trước khi ghi âm?",
        "Nói rõ và xin phép mọi người, kể cả khách, trước khi bấm ghi",
        [
          "Không cần gì vì người ngoài chỉ nghe",
          "Chỉ cần xin phép người chủ trì vì họ chịu trách nhiệm buổi họp",
          "Ghi trước rồi gửi email báo sau để không làm gián đoạn buổi họp",
        ],
        "Người bị ghi âm có quyền biết. Người ngoài công ty và người chủ trì đều không thể thay nhau đồng ý. Báo sau cũng quá muộn. Quy định cụ thể thì hỏi pháp chế, bài này chỉ nhắc xin phép từ đầu.",
      ),
      Q(
        "Một đồng nghiệp nói \"dán vào AI đi, nó xoá ngay sau khi trả lời\". Bạn nên kết luận gì?",
        "Không tin ngay, vì việc lưu hay xoá tuỳ công cụ và chính sách của nó",
        [
          "Tin được, vì mọi công cụ AI đều xoá dữ liệu sau mỗi lần trả lời",
          "Tin được nếu công cụ đó miễn phí vì họ không có lý do gì để giữ",
          "Không tin, vì AI luôn lưu mọi dữ liệu mãi mãi và đem bán cho bên khác",
        ],
        "Chính sách lưu trữ khác nhau giữa các công cụ và các gói, nên không có câu đúng cho tất cả. Miễn phí không bảo đảm xoá, và khẳng định ngược lại rằng luôn lưu mãi và bán cũng là điều chưa ai kiểm chứng. Hỏi IT hoặc đọc chính sách chính thức.",
      ),
    ],
    keyTakeaways: [
      "Chia buổi họp thành phần chung và phần nhạy cảm trước khi dùng AI.",
      "Lương, đánh giá cá nhân, khách hàng lớn: che hoặc không đưa.",
      "Chỉ dùng công cụ công ty đã duyệt; chưa rõ thì hỏi IT hoặc pháp chế.",
      "Xin phép mọi người, kể cả người ngoài công ty, trước khi ghi âm.",
      "Đừng đoán công cụ có xoá dữ liệu hay không.",
    ],
    practicePrompt: {
      question:
        "Bạn đã ghi âm cả buổi họp gồm cả phần bàn lương, và muốn nhờ AI tóm tắt. Cách nào hợp lý nhất?",
      options: [
        "Cắt bỏ phần lương trước, hỏi chính sách rồi mới đưa phần còn lại",
        "Đưa cả buổi rồi dặn AI đừng nhắc tới phần lương trong bản tóm tắt",
        "Đưa cả buổi nhưng chỉ dùng công cụ bạn cảm thấy ít rủi ro hơn",
        "Xoá luôn cả file ghi âm để tránh mọi rủi ro về sau cho chắc",
      ],
      correct: 0,
      explanation:
        "Dặn AI đừng nhắc thì dữ liệu lương vẫn đã được đưa cho nó. Cảm giác về rủi ro không phải chính sách, còn xoá cả file thì mất luôn phần kế hoạch chung. Cách đúng là cắt phần nhạy cảm và hỏi chính sách trước.",
    },
    summary: {
      keyIdea: "Không phải phần nào của cuộc họp cũng đưa cho AI: tách, che và hỏi chính sách trước.",
      formula: "Cuộc họp = phần chung (dùng được) + phần nhạy cảm (che hoặc không đưa) + chính sách công ty quyết định.",
      commonMistake: "Dặn AI \"đừng nhắc phần lương\" sau khi đã đưa cả buổi cho nó.",
      action: "Viết ra ba loại nội dung họp của phòng bạn mà không bao giờ đưa cho AI khi chưa hỏi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhìn lại lịch họp tuần này của bạn và gạch ra buổi nào có nội dung lương, đánh giá, khách hàng lớn hoặc hợp đồng. Với mỗi buổi, ghi một dòng: phần nào ghi được, phần nào không. Soạn một email ngắn hỏi IT hoặc pháp chế công cụ nào được dùng với loại nội dung nào.",
      secondary: "Gửi email hỏi đó và lưu câu trả lời vào thư mục của phòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Có những buổi họp mà nửa đầu là kế hoạch, nửa sau là chuyện không ra khỏi phòng. Bài này dạy bạn chia buổi họp theo mức nhạy cảm và biết khi nào nên dừng lại hỏi.",
      },
      {
        type: "feynman",
        title: "Nội dung nhạy cảm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc photo tài liệu ở tiệm: bạn đem thông báo chung đi photo thoải mái, nhưng không ai đem bảng lương cả phòng ra tiệm photo ngoài đường. Tiệm có thể rất đàng hoàng, nhưng bạn không biết họ làm gì với bản sao, và công ty có quy định riêng.",
        columns: ["Thành phần", "Photo ở tiệm", "Đưa cho AI"],
        rows: [
          ["Đem được", "Thông báo chung, lịch", "Kế hoạch chung, ý tưởng"],
          ["Không đem ra ngoài", "Bảng lương, hồ sơ cá nhân", "Lương, đánh giá, khách hàng lớn"],
          ["Ai quyết định", "Quy định của công ty", "Chính sách dữ liệu của công ty"],
          ["Muốn chắc", "Hỏi người phụ trách", "Hỏi IT hoặc pháp chế"],
        ],
        oneLiner: "Cái gì bạn không đem ra tiệm photo thì cũng đừng đưa cho AI khi chưa được cho phép.",
      },
      { type: "heading", text: "Ba nhóm nội dung trong một buổi họp" },
      {
        type: "paragraph",
        text: "Bạn không cần coi cả buổi họp là bí mật, cũng không nên coi cả buổi là an toàn. Hãy chia làm ba: nội dung chung (kế hoạch, lịch), nội dung cần che (khách, số tiền, tên người), và nội dung không đưa (lương, đánh giá cá nhân, chuyện pháp lý). Nhóm thứ ba không đi qua công cụ nào khi chưa có câu trả lời chính thức.",
      },
      {
        type: "flow",
        title: "Quyết định đưa gì cho AI",
        steps: [
          { label: "Đọc lịch nghị sự", detail: "Nhìn trước các mục họp: mục nào có lương, đánh giá, khách lớn, hợp đồng?" },
          { label: "Đánh dấu mục nhạy cảm", detail: "Tắt ghi âm hoặc ghi tay ở các mục đó. Nếu đã ghi, cắt phần đó trước khi đưa đi." },
          { label: "Che phần cần che", detail: "Thay tên khách bằng mã, bỏ số tiền, bỏ tên người khi chỉ cần cấu trúc lập luận." },
          { label: "Hỏi chính sách", detail: "Hỏi IT hoặc pháp chế công cụ nào được dùng và với loại dữ liệu nào. Đừng tự đoán." },
          { label: "Chỉ đưa phần được phép", detail: "Phần còn lại mới đưa cho công cụ được duyệt." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ghi cả buổi, xử lý sau",
          text: "Tiện vì không phải chia. Phần nhạy cảm đã đi qua công cụ khi bạn chưa kịp quyết. Xoá sau không lấy lại được bản đã gửi. Bạn chịu trách nhiệm về những gì đã đưa đi.",
        },
        right: {
          label: "Chia trước, hỏi chính sách",
          text: "Mất vài phút chuẩn bị. Phần nhạy cảm ở lại trong phòng. Phần chung vẫn được AI giúp. Bạn có câu trả lời chính thức khi ai hỏi.",
        },
      },
      {
        type: "callout",
        label: "Hỏi ai thì hỏi",
        text: "Nếu bạn không chắc một thông tin có nhạy cảm không, hoặc công cụ nào được dùng, hãy hỏi IT, bộ phận pháp chế hoặc quản lý trực tiếp. Bài này không thay cho quy định của công ty bạn, và không đưa ra kết luận về luật.",
      },
      {
        type: "scenario",
        title: "Buổi họp quý có phần bàn lương",
        start: "s1",
        nodes: {
          s1: {
            text: "Buổi họp quý bắt đầu với kế hoạch chung, sau đó sẽ bàn điều chỉnh lương cho cả phòng. Bạn là người viết biên bản. Bạn chưa biết công ty cho dùng công cụ AI nào.",
            choices: [
              { label: "Ghi âm cả buổi, tối về nhờ AI chép và tóm tắt luôn", next: "bad_all" },
              { label: "Hỏi người phụ trách IT hoặc pháp chế trước khi họp, và dự tính tắt ghi âm ở phần lương", next: "s2" },
            ],
          },
          bad_all: {
            text: "Bản chép có toàn bộ con số lương từng người đã đi qua một công cụ chưa được duyệt. Khi bộ phận IT biết, bạn phải giải trình và cả phòng lo lắng.",
            ending: "bad",
          },
          s2: {
            text: "IT trả lời: chưa có công cụ nào được duyệt cho dữ liệu nhân sự, nhưng phần kế hoạch chung thì dùng được công cụ của công ty.",
            choices: [
              { label: "Ghi âm phần kế hoạch, tắt khi bàn lương và ghi tay vài ý", next: "s3" },
              { label: "Vẫn ghi cả buổi, dặn AI đừng đưa phần lương vào biên bản", next: "bad_prompt" },
            ],
          },
          bad_prompt: {
            text: "Phần lương đã nằm trong bản ghi âm đưa cho công cụ. Việc dặn đừng nhắc không xoá được dữ liệu đã đi.",
            ending: "bad",
          },
          s3: {
            text: "Sau họp bạn có bản chép phần kế hoạch và vài dòng ghi tay về lương. Một thành viên muốn bạn gửi luôn bản ghi tay cho AI để viết gọn.",
            choices: [
              { label: "Không đưa, tự viết phần lương và gửi người có thẩm quyền", next: "good" },
              { label: "Đưa nhưng thay tên người bằng chữ cái", next: "bad_mask" },
            ],
          },
          bad_mask: {
            text: "Chữ cái thay tên vẫn đi kèm mức lương và chức danh, đủ để đoán ra người. Phần này vốn không được đưa khi chưa có chính sách.",
            ending: "bad",
          },
          good: {
            text: "Phần kế hoạch được AI giúp tóm tắt nhanh, phần lương ở lại trong tay người có thẩm quyền. Bạn còn lưu lại câu trả lời của IT để dùng cho các buổi sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đọc lịch nghị sự, đánh dấu mục nhạy cảm.",
          "Bước 2 - Tắt ghi âm hoặc ghi tay ở các mục đó.",
          "Bước 3 - Che tên khách và số tiền ở phần còn lại khi có thể.",
          "Bước 4 - Hỏi IT hoặc pháp chế công cụ nào được dùng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chia cuộc họp theo mức nhạy cảm, che khi cần, hỏi chính sách khi chưa chắc.",
          "Bài sau: dự án nhỏ dựng quy trình họp tuần có ghi chép.",
        ],
      },
    ],
  },
  {
    id: 2349,
    slug: "du-an-nho-quy-trinh-hop-moi-tuan-co-ghi-chep",
    title: "Chặng 47, Bài 10: Dự án nhỏ: quy trình họp tuần có ghi chép",
    subtitle: "Bốn bước lặp lại mỗi tuần: xin phép, ghi, kiểm bản chép, gửi biên bản.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Họp tuần nào cũng có. Nếu mỗi tuần bạn làm khác đi một chút, sẽ có tuần quên xin phép, tuần quên kiểm bản chép, tuần biên bản gửi trễ hai ngày. Một quy trình bốn bước viết ra giấy biến những việc bạn hay quên thành thói quen, và ai trong nhóm cũng làm được thay bạn.",
    openingQuestion:
      "Nhóm bạn họp tuần mỗi thứ Hai và muốn dùng AI ghi chép. Điều gì làm quy trình dùng được lâu dài nhất?",
    openingOptions: [
      "Viết ra các bước cố định, ai làm bước nào, và lặp lại mỗi tuần",
      "Chọn công cụ AI mới nhất để không phải kiểm bản chép nữa từ tuần sau",
      "Để mỗi người tự quyết cách ghi chép theo thói quen riêng của mình",
      "Chỉ làm thật kỹ ở buổi họp đầu tiên rồi giữ nguyên các tuần sau",
    ],
    correctOption: 0,
    explanation:
      "Một quy trình có bước, người làm và nhịp lặp lại giúp việc không phụ thuộc trí nhớ của một người. Công cụ mới không bỏ được việc kiểm bản chép. Mỗi người làm một cách thì biên bản không đều và khó kiểm. Làm kỹ một lần rồi bỏ mặc thì đến tuần thứ ba đã có bước bị quên.",
    diagram: [
      { label: "Xin phép và báo mục đích ghi âm", arrow: true },
      { label: "Ghi buổi họp, bỏ phần nhạy cảm", arrow: true },
      { label: "Kiểm bản chép ở chỗ có tên, số, hạn", arrow: true },
      { label: "Gửi biên bản kèm hạn xác nhận cho nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng vận hành sáu người viết quy trình bốn bước lên một trang và dán trên kênh chung. Tuần đầu họ quên bước kiểm bản chép và gửi biên bản nhầm người nhận việc. Từ tuần sau, người làm biên bản luân phiên đọc lại tờ quy trình trước khi gửi, và lỗi nhầm người giảm hẳn.",
    },
    quiz: [
      Q(
        "Bước nào trong quy trình họp có ghi chép phải làm đầu tiên?",
        "Xin phép và nói rõ ghi để làm gì, lưu ở đâu, ai được nghe",
        [
          "Chọn công cụ AI, vì công cụ quyết định mọi bước còn lại",
          "Gửi lịch họp, vì không có lịch thì không ai biết đến họp",
          "Chuẩn bị bản chép mẫu, để AI có khuôn mà điền vào nội dung",
        ],
        "Xin phép phải có trước khi ghi, vì người bị ghi có quyền biết. Công cụ và lịch đã có từ trước, còn bản chép mẫu thì chỉ có nghĩa sau khi có bản ghi.",
      ),
      Q(
        "Tuần nào nhóm cũng có người thắc mắc \"ghi âm để làm gì\". Quy trình nên xử lý ra sao?",
        "Thêm một câu cố định vào lời mở đầu: ghi để làm biên bản, xoá sau khi gửi",
        [
          "Bỏ bước xin phép cho đỡ mất thời gian vì cả nhóm đã biết hết",
          "Chỉ giải thích khi có người hỏi để buổi họp không bị chậm lại",
          "Gửi email giải thích một lần vào đầu năm rồi không nhắc lại nữa",
        ],
        "Một câu cố định tuần nào cũng nói giúp người mới và người quên đều nắm được. Bỏ bước này là bỏ sự đồng ý, chỉ trả lời khi có người hỏi thì nhiều người ngại hỏi, còn email một lần thì nhanh bị quên.",
      ),
      Q(
        "Ai nên là người kiểm bản chép trước khi gửi biên bản?",
        "Người làm biên bản, luân phiên theo tuần, theo danh sách đã viết",
        [
          "AI tự kiểm, vì nó làm ra bản chép nên biết chỗ nào có thể sai",
          "Sếp duyệt mọi biên bản, vì sếp là người chịu trách nhiệm cuối cùng",
          "Không cần ai kiểm nếu công cụ đã dùng ổn định trong nhiều tuần liền",
        ],
        "Người có tên trong quy trình kiểm thì việc không bị rơi. Luân phiên giúp cả nhóm quen. AI tự kiểm không có bằng chứng ngoài, sếp duyệt mọi thứ thì nghẽn, và công cụ ổn định vẫn có thể nhầm tên hay số.",
      ),
      Q(
        "Sau bốn tuần áp dụng, nhóm thấy bước kiểm bản chép hay bị bỏ qua. Nên làm gì?",
        "Tìm xem vì sao bị bỏ, rồi rút gọn bước và ghi rõ ai phụ trách",
        [
          "Coi như bước đó thừa và bỏ hẳn khỏi quy trình của nhóm cho nhẹ việc",
          "Nhắc nhở cả nhóm nghiêm khắc hơn và giữ nguyên quy trình cũ",
          "Thêm nhiều bước kiểm khác nữa để bù cho bước hay bị quên",
        ],
        "Bước hay bị bỏ thường vì quá nặng hoặc không ai chịu trách nhiệm. Rút gọn (chỉ kiểm dòng có tên, số, hạn) và gán người làm sẽ hiệu quả hơn. Bỏ bước làm lỗi quay lại, nhắc nghiêm khắc không đổi gốc rễ, và thêm bước chỉ làm quy trình nặng hơn.",
      ),
      Q(
        "Biên bản gửi nhóm nên kèm điều gì để quy trình khép kín?",
        "Hạn để mỗi người báo nếu việc của mình ghi sai",
        [
          "Bản ghi âm đầy đủ để ai muốn nghe lại đều nghe được cả buổi",
          "Bản chép lời nguyên văn để mọi người tự kiểm toàn bộ nội dung",
          "Một lời nhắc mọi người không cần phản hồi nếu thấy đã ổn cả",
        ],
        "Hạn phản hồi ngắn biến biên bản thành thứ mỗi người xác nhận phần của mình. Gửi kèm ghi âm hoặc bản chép thì mở rộng người nghe ngoài phạm vi đã xin phép, và nói không cần phản hồi làm mất bước bắt lỗi.",
      ),
    ],
    keyTakeaways: [
      "Quy trình bốn bước: xin phép, ghi, kiểm bản chép, gửi biên bản.",
      "Mỗi bước có người làm cụ thể và luân phiên để không phụ thuộc một người.",
      "Một câu xin phép cố định mỗi tuần thay cho giải thích lặp lại.",
      "Bước hay bị bỏ thì rút gọn và gán người, đừng chỉ nhắc nhở.",
      "Biên bản gửi kèm hạn để mỗi người xác nhận việc của mình.",
    ],
    practicePrompt: {
      question:
        "Phòng bạn có quy trình nhưng không ghi ai làm bước kiểm bản chép. Sau ba tuần, biên bản vẫn sai. Sửa gì đầu tiên?",
      options: [
        "Ghi tên người phụ trách từng bước, luân phiên theo tuần",
        "Đổi sang công cụ AI khác vì công cụ hiện tại hay nhầm tên",
        "Tăng số người duyệt biên bản lên ba người cho chắc",
        "Bỏ quy trình và quay lại việc ghi tay như trước đây",
      ],
      correct: 0,
      explanation:
        "Bước không có người chịu trách nhiệm thường bị bỏ qua, nên gán tên là cách sửa rẻ nhất. Đổi công cụ không giải quyết việc không ai kiểm. Thêm người duyệt làm chậm mà vẫn không ai chịu trách nhiệm, còn quay lại ghi tay bỏ phí lợi ích của AI.",
    },
    summary: {
      keyIdea: "Quy trình họp tuần tốt là bốn bước có người làm, lặp lại đều mỗi tuần.",
      formula: "Xin phép + ghi (bỏ phần nhạy cảm) + kiểm bản chép + gửi biên bản kèm hạn = họp có ghi chép đáng tin.",
      commonMistake: "Làm kỹ một lần rồi để mỗi người tự nhớ, đến tuần thứ ba bước kiểm đã bị bỏ.",
      action: "Viết bốn bước lên một trang, ghi tên người làm cho bốn tuần tới.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một trang cho họp tuần của nhóm bạn, gồm bốn bước: câu xin phép cố định, những mục không ghi, danh sách dòng cần kiểm (tên, số, hạn) và câu gửi kèm biên bản. Thêm bảng phân công người làm biên bản cho bốn tuần tới. Gửi cho quản lý xem trước khi dùng.",
      secondary: "Nhờ AI góp ý cho trang này, nhưng chỉ đưa nội dung quy trình, không đưa dữ liệu cuộc họp thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Dự án nhỏ của chặng này: biến những gì bạn đã học thành một quy trình bốn bước cho họp tuần. Xong bài, bạn có một trang dùng được ngay tuần sau.",
      },
      {
        type: "feynman",
        title: "Quy trình họp tuần đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới công thức nấu món canh quen thuộc trong nhà: vài bước cố định, ai nấu cũng ra vị gần giống nhau. Nếu mỗi lần ai đó nêm theo cảm tính thì tuần mặn, tuần nhạt, và khi người nấu chính đi vắng thì cả nhà lúng túng.",
        columns: ["Thành phần", "Công thức nấu canh", "Quy trình họp tuần"],
        rows: [
          ["Các bước cố định", "Sơ chế, nấu, nêm, nếm", "Xin phép, ghi, kiểm, gửi"],
          ["Ai làm", "Mỗi tuần một người trong nhà", "Người làm biên bản luân phiên"],
          ["Bước hay quên", "Nếm lại trước khi dọn", "Kiểm bản chép trước khi gửi"],
          ["Lợi ích", "Vị đều, ai cũng nấu được", "Biên bản đều, ai cũng làm được"],
        ],
        oneLiner: "Viết công thức ra giấy, gán người làm từng bước, và bước hay quên là bước cần giữ nhất.",
      },
      { type: "heading", text: "Bốn bước, mỗi bước một việc rõ" },
      {
        type: "paragraph",
        text: "Một quy trình tốt ngắn đến mức đọc trong một phút. Mỗi bước nói rõ làm gì, ai làm và xong thì trông ra sao. Bạn đã học từng mảnh ở các bài trước: xin phép, chọn phần ghi, kiểm bản chép, tách việc và gửi biên bản. Dự án này ghép chúng thành một thứ dán được lên kênh chung.",
      },
      {
        type: "flow",
        title: "Quy trình họp tuần bốn bước",
        steps: [
          { label: "Bước 1 - Xin phép", detail: "Đầu buổi nói một câu cố định: ghi để làm biên bản, lưu ở đâu, ai được nghe, xoá khi nào. Ai không đồng ý thì không ghi." },
          { label: "Bước 2 - Ghi và bỏ phần nhạy cảm", detail: "Tắt ghi ở mục lương, đánh giá, khách lớn. Ghi tay phần đó nếu cần." },
          { label: "Bước 3 - Kiểm bản chép", detail: "Người làm biên bản gạch dưới dòng có tên, số, hạn và đối chiếu với bản chép. Chỗ chưa rõ ghi \"chưa chốt\"." },
          { label: "Bước 4 - Gửi và xác nhận", detail: "Gửi biên bản kèm hạn để mỗi người báo nếu việc của mình ghi sai. Sau đó xoá bản ghi theo quy định đã nói." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI góp ý cho trang quy trình",
        task: "Bạn đã viết nháp trang quy trình bốn bước. Lắp yêu cầu để AI góp ý mà không cần đưa dữ liệu cuộc họp thật.",
        parts: [
          {
            id: "content",
            label: "Đưa gì cho AI",
            options: [
              { text: "Dán bản chép của buổi họp gần nhất để AI thấy quy trình chạy thế nào.", feedback: "Bản chép thật có thể có tên, số và chuyện nhạy cảm. Để góp ý quy trình, bạn không cần chúng." },
              { text: "Chỉ dán trang quy trình bốn bước của bạn, không kèm dữ liệu cuộc họp.", good: true, feedback: "Quy trình không chứa dữ liệu nhạy cảm, nên đưa được và vẫn đủ để AI góp ý." },
            ],
          },
          {
            id: "ask",
            label: "Việc cần làm",
            options: [
              { text: "Viết lại quy trình cho hay hơn.", feedback: "\"Hay hơn\" không có tiêu chí, AI đổi giọng văn và có thể thêm bước bạn không cần." },
              { text: "Chỉ ra bước nào mơ hồ, bước nào chưa có người làm, và bước nào dễ bị quên.", good: true, feedback: "Ba câu hỏi cụ thể cho bạn danh sách chỗ cần sửa thay vì một bản viết lại." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm những bước còn thiếu theo thông lệ của các công ty khác.", feedback: "AI sẽ thêm bước nghe hợp lý, có bước trái với chính sách của công ty bạn." },
              { text: "Không thêm bước mới, chỉ nêu câu hỏi tôi cần trả lời để làm rõ từng bước.", good: true, feedback: "Bạn giữ quyền quyết định bước nào vào quy trình, AI chỉ chỉ ra chỗ hổng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["content", "ask", "limit"],
            text: "Bước 1: chưa nói rõ ai đọc câu xin phép. Bước 3: chưa có tên người kiểm, dễ bị quên. Bước 4: chưa rõ bản ghi xoá sau bao lâu.\n\nCâu hỏi cần trả lời: ai làm biên bản tuần đầu? Hạn phản hồi là bao lâu?",
          },
          {
            requires: ["ask"],
            text: "Bước 3 chưa có tên người kiểm. Đề xuất thêm bước 5: lưu trữ biên bản 3 năm trong kho chung và bước 6: gửi báo cáo tháng cho pháp chế.\n\n(Chỉ ra đúng chỗ hổng, nhưng thêm bước chưa từng có trong chính sách công ty.)",
          },
          {
            text: "Quy trình họp tuần là công cụ quản lý quan trọng. Để tối ưu, bạn nên ứng dụng các phương pháp hiện đại và đẩy mạnh sự phối hợp giữa các bộ phận...\n\n(Văn bản chung chung, không chỉ ra bước nào cần sửa.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mỗi tuần làm một kiểu",
          text: "Người làm biên bản tự quyết mọi thứ. Có tuần quên xin phép, có tuần quên kiểm. Khi người đó nghỉ, không ai biết làm theo cách nào. Lỗi khó tìm nguyên nhân.",
        },
        right: {
          label: "Quy trình bốn bước viết ra",
          text: "Ai làm cũng theo cùng các bước. Người làm biên bản luân phiên, có danh sách cần kiểm. Khi có lỗi, nhóm thấy bước nào bị bỏ và sửa đúng bước đó.",
        },
      },
      {
        type: "callout",
        label: "Quy trình không thay cho chính sách công ty",
        text: "Các bước ở đây là khung. Những điều như giữ ghi âm bao lâu, ai được nghe, có được ghi họp với khách ngoài không phải do chính sách công ty và bộ phận pháp chế quyết định. Chỗ nào bạn chưa chắc, ghi ra thành câu hỏi và đi hỏi.",
      },
      {
        type: "scenario",
        title: "Tuần đầu áp dụng quy trình",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Hai bạn đưa trang quy trình bốn bước cho nhóm. Anh Nam nói: \"Ghi âm thì xin phép làm gì cho mất thời gian, cứ ghi thôi.\"",
            choices: [
              { label: "Đồng ý bỏ bước xin phép để buổi họp chạy nhanh", next: "bad_skip" },
              { label: "Giữ bước xin phép, rút gọn thành một câu nói trong 10 giây", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Có một đồng nghiệp mới không biết mình bị ghi âm, đến khi phát hiện thì bất bình và báo lên quản lý. Cả nhóm phải dừng dùng ghi âm.",
            ending: "bad",
          },
          s2: {
            text: "Buổi họp chạy tốt. Sau họp, AI đưa biên bản nháp và bạn đang trễ một cuộc hẹn khác.",
            choices: [
              { label: "Gửi luôn biên bản vì quy trình đã có bước ghi và xin phép", next: "bad_nocheck" },
              { label: "Dành 10 phút kiểm dòng có tên, số, hạn với bản chép", next: "s3" },
            ],
          },
          bad_nocheck: {
            text: "Biên bản ghi nhầm người nhận việc, và lỗi lộ ra vào thứ Năm. Anh Nam lấy đó để nói quy trình không có tác dụng.",
            ending: "bad",
          },
          s3: {
            text: "Bạn sửa một tên bị nhầm, đánh dấu một hạn chưa chốt và sẵn sàng gửi. Nhóm hỏi ai làm biên bản tuần sau.",
            choices: [
              { label: "Ghi bảng luân phiên bốn tuần và gửi kèm biên bản", next: "good" },
              { label: "Nói bạn sẽ làm hết, vì bạn đã quen rồi", next: "bad_solo" },
            ],
          },
          bad_solo: {
            text: "Sau hai tháng bạn nghỉ phép và không ai biết làm các bước kiểm. Biên bản tuần đó bị bỏ qua hoàn toàn.",
            ending: "bad",
          },
          good: {
            text: "Mỗi tuần một người làm và quy trình không phụ thuộc vào bạn. Đến tuần thứ tư, nhóm bổ sung thêm một dòng vào trang quy trình từ kinh nghiệm của chính mình.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Một câu xin phép cố định đầu buổi.",
          "Bước 2 - Ghi, và bỏ phần nhạy cảm.",
          "Bước 3 - Kiểm dòng có tên, số, hạn với bản chép.",
          "Bước 4 - Gửi biên bản kèm hạn xác nhận, rồi xoá bản ghi theo quy định.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Viết quy trình ra giấy, gán người làm từng bước, và bước kiểm đừng bao giờ bỏ.",
          "Bài sau: dịch trực tiếp cuộc gọi với đối tác nước ngoài.",
        ],
      },
    ],
  },
];
