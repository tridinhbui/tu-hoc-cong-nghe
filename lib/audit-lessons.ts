import type { Lesson } from "./lesson-types";

// Chặng "Kiểm toán: cách một báo cáo được xác nhận" (ids 1531-1536,
// professional track).
//
// Có hai nghề kiểm toán trong lib/finance-careers.ts (auditor, internal-audit)
// và trước chặng này cả kho chỉ có đúng một bài liên quan - 1254 về khung
// COSO. Lộ trình học của nghề "Kiểm toán viên" gồm năm bài kế toán chung,
// không bài nào nói kiểm toán làm gì.
//
// Khoảng trống đáng kể vì Big 4 là nơi tuyển nhiều sinh viên tài chính nhất,
// và vì mọi người đọc báo cáo tài chính đều đang dựa vào một ý kiến kiểm toán
// mà phần lớn không biết nó khẳng định điều gì - và quan trọng hơn, không
// khẳng định điều gì.

export const AUDIT_LESSONS: Lesson[] = [
  {
    id: 1531,
    slug: "kiem-toan-la-gi-va-bon-loai-y-kien",
    title: "Kiểm toán, Bài 1: Ý kiến kiểm toán khẳng định điều gì - và không khẳng định điều gì",
    subtitle: "Bốn loại ý kiến, ranh giới trách nhiệm giữa ban giám đốc và kiểm toán viên, và hiểu lầm phổ biến nhất",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Mọi phân tích bạn đã học đều bắt đầu từ một bộ báo cáo tài chính đã kiểm toán. Nhưng phần lớn người đọc không biết ý kiến kiểm toán khẳng định điều gì, nên vừa tin nó quá mức ở chỗ không nên, vừa bỏ qua đúng chỗ nó đang cảnh báo.",
    openingQuestion:
      "Báo cáo tài chính được kiểm toán chấp nhận toàn phần. Điều đó có nghĩa là số liệu chắc chắn không có sai sót nào?",
    openingOptions: [
      "Đúng, đó là mục đích của việc kiểm toán",
      "Không: nó nói báo cáo không còn sai sót trọng yếu, tức là sai sót nhỏ vẫn có thể tồn tại",
      "Đúng, nếu do công ty kiểm toán lớn thực hiện",
      "Không, vì kiểm toán viên chỉ kiểm tra phần doanh thu",
    ],
    correctOption: 1,
    explanation:
      "Chữ trọng yếu là toàn bộ nội dung của lời khẳng định. Kiểm toán viên không kiểm tra từng giao dịch - điều đó bất khả thi về chi phí - mà đưa ra sự đảm bảo hợp lý rằng báo cáo không chứa sai sót đủ lớn để làm thay đổi quyết định của người đọc. Một sai sót vài chục triệu trong doanh nghiệp nghìn tỷ có thể tồn tại và ý kiến vẫn là chấp nhận toàn phần. Đây cũng là lý do một vụ gian lận bị phát hiện không tự động chứng minh kiểm toán viên đã làm sai.",
    diagram: [
      { label: "Chấp nhận toàn phần", arrow: true },
      { label: "Ngoại trừ: sai ở một phần", arrow: true },
      { label: "Trái ngược: sai lan tỏa", arrow: true },
      { label: "Từ chối: không đủ bằng chứng để kết luận" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Khoảng cách kỳ vọng",
      description:
        "Sau mỗi vụ đổ vỡ doanh nghiệp lớn, câu hỏi lặp lại là kiểm toán viên ở đâu. Hiện tượng này có tên riêng trong nghề: khoảng cách kỳ vọng - chênh lệch giữa điều công chúng tin rằng kiểm toán viên phải làm và điều chuẩn mực thực sự yêu cầu. Công chúng đọc ý kiến chấp nhận toàn phần như một lời bảo đảm doanh nghiệp lành mạnh. Chuẩn mực chỉ yêu cầu ý kiến về việc báo cáo có phản ánh trung thực và hợp lý theo khuôn khổ kế toán áp dụng hay không. Doanh nghiệp có thể trung thực báo cáo rằng mình đang trên bờ vực.",
    },
    quiz: [
      {
        question: "Trách nhiệm lập báo cáo tài chính thuộc về ai?",
        options: [
          "Ban giám đốc doanh nghiệp; kiểm toán viên chỉ đưa ra ý kiến độc lập về báo cáo đó",
          "Kiểm toán viên độc lập, vì họ là bên có chuyên môn cao nhất về chuẩn mực kế toán hiện hành",
          "Hai bên cùng chịu trách nhiệm ngang nhau theo quy định của chuẩn mực kiểm toán quốc tế",
          "Bộ phận kế toán nội bộ, còn ban giám đốc chỉ ký duyệt sau khi kiểm toán đã hoàn tất công việc",
        ],
        correct: 0,
        explanation:
          "Ranh giới này là nền tảng của toàn bộ nghề. Kiểm toán viên không lập số, không sửa số, và trong nhiều trường hợp không được phép làm hộ - làm hộ thì mất tính độc lập.",
      },
      {
        question: "Ý kiến kiểm toán dạng ngoại trừ nghĩa là gì?",
        options: [
          "Báo cáo trung thực hợp lý, trừ một hoặc vài khoản mục cụ thể được nêu rõ trong ý kiến",
          "Kiểm toán viên hoàn toàn không thể đưa ra kết luận vì không tiếp cận được sổ sách kế toán",
          "Toàn bộ báo cáo tài chính không phản ánh trung thực tình hình tài chính của doanh nghiệp",
          "Doanh nghiệp được miễn trừ nghĩa vụ kiểm toán cho một số khoản mục theo quy định pháp luật",
        ],
        correct: 0,
        explanation:
          "Đây là ý kiến hay bị đọc lướt nhất. Người phân tích nên đọc kỹ phần cơ sở của ý kiến ngoại trừ, vì nó chỉ đúng chỗ số liệu không đáng tin.",
      },
      {
        question: "Khi nào kiểm toán viên từ chối đưa ra ý kiến?",
        options: [
          "Khi không thu thập đủ bằng chứng để kết luận, chứ không phải khi phát hiện báo cáo sai",
          "Khi phát hiện doanh nghiệp có dấu hiệu gian lận trong việc ghi nhận doanh thu của kỳ báo cáo",
          "Khi doanh nghiệp không thanh toán đầy đủ phí dịch vụ kiểm toán theo hợp đồng đã ký kết",
          "Khi báo cáo tài chính có nhiều sai sót trọng yếu lan tỏa trên toàn bộ các khoản mục chính",
        ],
        correct: 0,
        explanation:
          "Phân biệt với ý kiến trái ngược: trái ngược là biết báo cáo sai, từ chối là không biết được. Từ chối đưa ra ý kiến thường nghiêm trọng hơn với doanh nghiệp vì nó cho thấy sổ sách không kiểm chứng được.",
      },
      {
        question: "Đoạn nhấn mạnh về giả định hoạt động liên tục nói lên điều gì?",
        options: [
          "Kiểm toán viên lưu ý người đọc về nghi ngờ đáng kể đối với khả năng doanh nghiệp tiếp tục hoạt động",
          "Doanh nghiệp đã chính thức nộp đơn xin mở thủ tục phá sản lên tòa án có thẩm quyền",
          "Báo cáo tài chính có sai sót trọng yếu ở phần trình bày các khoản nợ ngắn hạn phải trả",
          "Kiểm toán viên đã thay đổi phương pháp kiểm toán so với kỳ báo cáo của năm trước đó",
        ],
        correct: 0,
        explanation:
          "Đây là tín hiệu mạnh nhất mà một báo cáo kiểm toán phát ra trong khi ý kiến vẫn có thể là chấp nhận toàn phần - và cũng là đoạn hay bị bỏ qua nhất khi đọc nhanh.",
      },
    ],
    keyTakeaways: [
      "Đảm bảo hợp lý về sai sót trọng yếu, không phải bảo đảm tuyệt đối về mọi con số",
      "Ban giám đốc lập báo cáo, kiểm toán viên chỉ đưa ý kiến - làm hộ là mất tính độc lập",
      "Ngoại trừ: sai ở một phần. Trái ngược: sai lan tỏa. Từ chối: không đủ bằng chứng để biết",
      "Đoạn nhấn mạnh hoạt động liên tục là tín hiệu mạnh dù ý kiến vẫn chấp nhận toàn phần",
      "Khoảng cách kỳ vọng: công chúng đọc ý kiến như bảo đảm doanh nghiệp lành mạnh, chuẩn mực không nói vậy",
    ],
    practicePrompt: {
      question:
        "Bạn đọc báo cáo có ý kiến chấp nhận toàn phần, kèm đoạn nhấn mạnh về hoạt động liên tục. Nên hiểu thế nào?",
      options: [
        "Báo cáo tốt, đoạn nhấn mạnh chỉ là thủ tục",
        "Số liệu đáng tin, nhưng kiểm toán viên đang cảnh báo doanh nghiệp có thể không tồn tại đủ 12 tháng tới",
        "Báo cáo có sai sót trọng yếu",
        "Kiểm toán viên không đủ bằng chứng để kết luận",
      ],
      correct: 1,
      explanation:
        "Hai vế này không mâu thuẫn và hay bị đọc lẫn. Ý kiến chấp nhận toàn phần nói về chất lượng số liệu - chúng phản ánh đúng tình hình. Đoạn nhấn mạnh nói về chính tình hình đó - và tình hình đang xấu. Một doanh nghiệp có thể trung thực báo cáo rằng mình sắp hết tiền, và đó chính xác là điều đang được nói ở đây.",
    },
    summary: {
      keyIdea: "Kiểm toán xác nhận báo cáo không sai trọng yếu, không xác nhận doanh nghiệp khỏe mạnh",
      commonMistake: "Đọc ý kiến chấp nhận toàn phần như lời bảo đảm không có sai sót nào",
      action: "Mở báo cáo kiểm toán của một doanh nghiệp niêm yết và đọc trọn phần ý kiến, kể cả các đoạn nhấn mạnh.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Tìm báo cáo tài chính đã kiểm toán của ba doanh nghiệp niêm yết và với mỗi báo cáo, xác định: loại ý kiến là gì, có đoạn nhấn mạnh nào không, và các vấn đề kiểm toán chủ yếu được nêu là gì. Phần cuối cho biết kiểm toán viên đã dành nhiều công sức nhất ở đâu.",
      secondary: "Chính danh sách vấn đề kiểm toán chủ yếu là chỗ người phân tích nên bắt đầu đọc, không phải phần kết luận.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi bài về đọc báo cáo tài chính trong ứng dụng này đều ngầm giả định số liệu đáng tin. Chặng này nói về cơ chế tạo ra niềm tin đó, giới hạn của nó, và cách đọc chính lời xác nhận ấy.",
      },
      {
        type: "heading",
        text: "Bốn loại ý kiến, xếp theo mức độ nghiêm trọng",
      },
      {
        type: "conceptTable",
        title: "Đọc ý kiến kiểm toán",
        subtitle: "Ba loại sau đều là tín hiệu, và mức độ nghiêm trọng không theo thứ tự trực giác",
        concepts: [
          { vi: "Chấp nhận toàn phần", en: "Unqualified", def: "Báo cáo phản ánh trung thực và hợp lý trên các khía cạnh trọng yếu. Đây là kết quả của phần lớn cuộc kiểm toán." },
          { vi: "Ngoại trừ", en: "Qualified", def: "Trung thực hợp lý, trừ một hoặc vài khoản mục được nêu tên. Phần cơ sở của ý kiến chỉ đúng chỗ số liệu không đáng tin." },
          { vi: "Trái ngược", en: "Adverse", def: "Báo cáo không phản ánh trung thực. Sai sót lan tỏa chứ không khu trú. Hiếm gặp và rất nghiêm trọng." },
          { vi: "Từ chối đưa ý kiến", en: "Disclaimer", def: "Không đủ bằng chứng để kết luận. Khác trái ngược ở chỗ: trái ngược là biết sai, từ chối là không biết được." },
        ],
      },
      {
        type: "callout",
        label: "Hai từ mang toàn bộ giới hạn của nghề",
        text: "Đảm bảo hợp lý, không phải đảm bảo tuyệt đối. Sai sót trọng yếu, không phải mọi sai sót. Kiểm toán viên làm việc bằng cách chọn mẫu trong giới hạn thời gian và chi phí, nên luôn tồn tại rủi ro một sai sót lọt qua. Chuẩn mực thừa nhận điều này công khai. Người đọc báo cáo cần hiểu rằng mình đang nhận một mức độ tin cậy cao, chứ không phải một sự chắc chắn.",
      },
      {
        type: "closing",
        lines: [
          "Kiểm toán không nói doanh nghiệp tốt. Nó nói con số kể đúng câu chuyện, kể cả khi câu chuyện đó tệ.",
          "Bài sau đi vào chính hai chữ đã giới hạn tất cả: trọng yếu nghĩa là bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 1532,
    slug: "trong-yeu-va-mo-hinh-rui-ro-kiem-toan",
    title: "Kiểm toán, Bài 2: Trọng yếu và rủi ro - cách quyết định kiểm tra cái gì",
    subtitle: "Mức trọng yếu được tính ra sao, ba thành phần của rủi ro kiểm toán, và vì sao nơi rủi ro cao mới được kiểm kỹ",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Trọng yếu quyết định sai sót nào đáng quan tâm, và mô hình rủi ro quyết định công sức đổ vào đâu. Hai khái niệm này giải thích vì sao hai doanh nghiệp cùng quy mô lại được kiểm toán rất khác nhau, và vì sao phí kiểm toán chênh lệch lớn đến vậy.",
    openingQuestion:
      "Mức trọng yếu trong một cuộc kiểm toán thường được xác định thế nào?",
    openingOptions: [
      "Một con số cố định do cơ quan quản lý ban hành cho từng ngành",
      "Một tỷ lệ phần trăm trên một chỉ tiêu nền như lợi nhuận trước thuế, doanh thu hoặc tổng tài sản",
      "Bằng đúng số dư nhỏ nhất trên bảng cân đối kế toán",
      "Do doanh nghiệp được kiểm toán tự đề xuất",
    ],
    correctOption: 1,
    explanation:
      "Kiểm toán viên chọn một chỉ tiêu nền phù hợp với bản chất doanh nghiệp rồi áp một tỷ lệ lên đó. Doanh nghiệp có lãi ổn định thường lấy nền là lợi nhuận trước thuế; doanh nghiệp đang lỗ hoặc lợi nhuận biến động mạnh thì lợi nhuận là nền tệ, nên chuyển sang doanh thu hoặc tổng tài sản. Việc chọn nền là phán đoán nghề nghiệp, và nó ảnh hưởng trực tiếp tới khối lượng công việc: mức trọng yếu càng thấp thì càng nhiều khoản mục phải kiểm tra.",
    diagram: [
      { label: "Chọn chỉ tiêu nền", arrow: true },
      { label: "Áp tỷ lệ → mức trọng yếu tổng thể", arrow: true },
      { label: "Đánh giá rủi ro từng khoản mục", arrow: true },
      { label: "Rủi ro cao → thử nghiệm nhiều hơn" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Vì sao doanh nghiệp đang lỗ lại khó chọn mức trọng yếu",
      description:
        "Với doanh nghiệp có lợi nhuận trước thuế 100 tỷ ổn định qua các năm, mức trọng yếu tính trên nền lợi nhuận cho ra một con số hợp lý. Nhưng nếu năm nay lợi nhuận rơi về 2 tỷ do một khoản chi phí bất thường, dùng cùng tỷ lệ sẽ cho mức trọng yếu nhỏ đến mức phi lý - gần như mọi bút toán đều thành trọng yếu và khối lượng kiểm toán bùng nổ. Đây là lý do chuẩn mực cho phép đổi chỉ tiêu nền, và cũng là chỗ phán đoán nghề nghiệp bị soi kỹ nhất khi hồ sơ kiểm toán được rà soát lại.",
    },
    quiz: [
      {
        question: "Ba thành phần của rủi ro kiểm toán là gì?",
        options: [
          "Rủi ro tiềm tàng, rủi ro kiểm soát và rủi ro phát hiện",
          "Rủi ro thị trường, rủi ro tín dụng và rủi ro thanh khoản của doanh nghiệp được kiểm toán",
          "Rủi ro gian lận, rủi ro sai sót do nhầm lẫn và rủi ro do thay đổi chuẩn mực kế toán mới",
          "Rủi ro pháp lý, rủi ro danh tiếng và rủi ro mất khách hàng của chính công ty kiểm toán",
        ],
        correct: 0,
        explanation:
          "Hai thành phần đầu thuộc về doanh nghiệp và kiểm toán viên không thay đổi được. Chỉ thành phần thứ ba nằm trong tầm kiểm soát, thông qua việc làm nhiều hay ít thử nghiệm.",
      },
      {
        question: "Kiểm toán viên tác động được vào thành phần rủi ro nào?",
        options: [
          "Rủi ro phát hiện, bằng cách tăng hoặc giảm khối lượng thử nghiệm cần thực hiện",
          "Rủi ro tiềm tàng, bằng cách yêu cầu doanh nghiệp thay đổi bản chất hoạt động kinh doanh",
          "Rủi ro kiểm soát, bằng cách trực tiếp thiết kế lại hệ thống kiểm soát nội bộ cho khách hàng",
          "Cả ba thành phần, vì kiểm toán viên chịu trách nhiệm cuối cùng về chất lượng của cuộc kiểm toán",
        ],
        correct: 0,
        explanation:
          "Thiết kế lại kiểm soát nội bộ cho chính khách hàng mình kiểm toán sẽ vi phạm tính độc lập - đó là lý do lựa chọn thứ ba sai chứ không phải vì bất khả thi.",
      },
      {
        question: "Rủi ro tiềm tàng cao ở khoản mục nào nhất?",
        options: [
          "Khoản mục cần ước tính và phán đoán, như dự phòng nợ khó đòi hoặc giá trị tài sản vô hình",
          "Khoản tiền mặt tại quỹ vì đây là tài sản có tính thanh khoản cao nhất trên bảng cân đối",
          "Các khoản mục có số dư lớn nhất trong tổng tài sản của doanh nghiệp tại ngày kết thúc kỳ",
          "Những khoản mục mới phát sinh lần đầu trong kỳ báo cáo và chưa từng xuất hiện trước đó",
        ],
        correct: 0,
        explanation:
          "Càng nhiều phán đoán thì càng nhiều khoảng để sai - dù vô tình hay cố ý. Đây cũng là lý do các vụ gian lận lớn thường nằm ở ước tính chứ không ở tiền mặt.",
      },
      {
        question: "Mức trọng yếu thấp hơn dẫn tới điều gì?",
        options: [
          "Khối lượng công việc kiểm toán tăng lên vì nhiều khoản mục hơn vượt ngưỡng cần kiểm tra",
          "Rủi ro kiểm toán giảm xuống bằng không vì mọi sai sót đều sẽ được phát hiện một cách đầy đủ",
          "Phí kiểm toán giảm đi do phạm vi kiểm tra được thu hẹp lại quanh các khoản mục lớn",
          "Ý kiến kiểm toán chắc chắn sẽ là chấp nhận toàn phần cho báo cáo tài chính của kỳ đó",
        ],
        correct: 0,
        explanation:
          "Đây là mối liên hệ trực tiếp giữa một phán đoán ở đầu cuộc kiểm toán và chi phí của cả cuộc - và là lý do việc chọn chỉ tiêu nền được rà soát kỹ.",
      },
    ],
    keyTakeaways: [
      "Trọng yếu = tỷ lệ áp lên một chỉ tiêu nền, và việc chọn nền là phán đoán nghề nghiệp",
      "Doanh nghiệp lỗ hoặc lợi nhuận biến động thì không dùng nền lợi nhuận được",
      "Rủi ro kiểm toán = tiềm tàng × kiểm soát × phát hiện",
      "Chỉ rủi ro phát hiện nằm trong tầm kiểm soát của kiểm toán viên",
      "Rủi ro tiềm tàng cao nhất ở khoản mục cần ước tính, không ở khoản mục số dư lớn",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp có hệ thống kiểm soát nội bộ yếu. Kiểm toán viên nên làm gì?",
      options: [
        "Từ chối kiểm toán vì không đủ cơ sở làm việc",
        "Tăng khối lượng thử nghiệm cơ bản, vì rủi ro kiểm soát cao thì rủi ro phát hiện phải kéo xuống",
        "Giữ nguyên kế hoạch kiểm toán như với doanh nghiệp có kiểm soát tốt",
        "Yêu cầu doanh nghiệp thuê tư vấn xây lại hệ thống kiểm soát trước khi kiểm toán",
      ],
      correct: 1,
      explanation:
        "Đây là cách mô hình rủi ro được dùng trong thực tế. Rủi ro kiểm toán tổng thể phải giữ ở mức chấp nhận được; hai thành phần đầu do doanh nghiệp quyết định, nên khi chúng cao thì cách duy nhất là hạ rủi ro phát hiện xuống - tức làm nhiều thử nghiệm hơn. Đó cũng là lý do doanh nghiệp có kiểm soát nội bộ tốt trả phí kiểm toán thấp hơn.",
    },
    summary: {
      keyIdea: "Trọng yếu quyết định cái gì đáng quan tâm, mô hình rủi ro quyết định công sức đổ vào đâu",
      commonMistake: "Cho rằng khoản mục số dư lớn nhất là khoản mục rủi ro nhất",
      action: "Với một doanh nghiệp bạn biết, thử liệt kê ba khoản mục cần nhiều ước tính nhất - đó là nơi rủi ro tiềm tàng cao nhất.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy báo cáo tài chính một doanh nghiệp niêm yết, tính thử mức trọng yếu theo ba nền khác nhau: 5% lợi nhuận trước thuế, 0,5% doanh thu, và 1% tổng tài sản. So ba con số và tự trả lời nền nào phù hợp nhất với doanh nghiệp này.",
      secondary: "Nếu ba con số chênh nhau nhiều lần, đó chính là lý do việc chọn nền được coi là phán đoán quan trọng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước kết ở hai chữ trọng yếu. Bài này mở chúng ra, cùng với khung tư duy quyết định kiểm toán viên dành thời gian ở đâu - vì thời gian là nguồn lực khan hiếm nhất của một cuộc kiểm toán.",
      },
      {
        type: "heading",
        text: "Mô hình rủi ro kiểm toán",
      },
      {
        type: "formula",
        title: "Ba thành phần nhân với nhau",
        equation: "Rủi ro kiểm toán = Rủi ro tiềm tàng × Rủi ro kiểm soát × Rủi ro phát hiện",
        variables: [
          { symbol: "Tiềm tàng", name: "Inherent risk", description: "Khả năng sai sót tự thân của khoản mục, trước khi tính tới kiểm soát. Cao ở chỗ cần ước tính." },
          { symbol: "Kiểm soát", name: "Control risk", description: "Khả năng hệ thống kiểm soát nội bộ không ngăn hoặc phát hiện được sai sót đó." },
          { symbol: "Phát hiện", name: "Detection risk", description: "Khả năng thủ tục kiểm toán bỏ sót sai sót. Đây là thành phần duy nhất kiểm toán viên điều chỉnh được." },
        ],
        example: {
          title: "Cách dùng trong thực tế",
          calculation: "Hai thành phần đầu cao",
          result: "Phải kéo rủi ro phát hiện xuống",
          explanation: "Nghĩa là làm nhiều thử nghiệm hơn, chọn mẫu lớn hơn, hoặc kiểm tra tại thời điểm cuối kỳ thay vì giữa kỳ.",
        },
      },
      {
        type: "callout",
        label: "Vì sao ước tính rủi ro hơn tiền mặt",
        text: "Trực giác thường cho rằng tiền mặt là khoản mục nguy hiểm nhất vì dễ mất. Thực tế tiền mặt lại dễ kiểm chứng nhất: có sao kê ngân hàng đối chiếu được với bên thứ ba. Các vụ gian lận báo cáo tài chính lớn hầu như luôn nằm ở chỗ khác - dự phòng, ghi nhận doanh thu theo tiến độ, giá trị tài sản vô hình - vì ở đó con số đúng là một khoảng chứ không phải một điểm, và ban giám đốc có thể chọn đầu nào của khoảng đó.",
      },
      {
        type: "closing",
        lines: [
          "Kiểm toán không phân bổ công sức đều. Nó dồn về nơi con số phụ thuộc vào phán đoán.",
          "Bài sau nói về thứ kiểm toán viên đi thu thập: bằng chứng, và bằng chứng nào đáng tin hơn.",
        ],
      },
    ],
  },
  {
    id: 1533,
    slug: "bang-chung-kiem-toan-va-thu-tuc",
    title: "Kiểm toán, Bài 3: Bằng chứng kiểm toán - cái gì đáng tin hơn cái gì",
    subtitle: "Thứ bậc độ tin cậy của bằng chứng, thử nghiệm kiểm soát so với thử nghiệm cơ bản, và các thủ tục chính",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "professional",
    whyItMatters:
      "Ý kiến kiểm toán chỉ mạnh bằng bằng chứng đứng sau nó. Hiểu thứ bậc độ tin cậy của bằng chứng cũng là kỹ năng dùng được ngoài nghề kiểm toán: bất kỳ ai thẩm định một con số do người khác đưa ra đều đang làm cùng một việc.",
    openingQuestion:
      "Loại bằng chứng nào đáng tin cậy nhất trong kiểm toán?",
    openingOptions: [
      "Giải trình bằng lời của ban giám đốc doanh nghiệp",
      "Xác nhận nhận trực tiếp từ bên thứ ba độc lập, như thư xác nhận số dư từ ngân hàng",
      "Sổ sách kế toán nội bộ đã được đối chiếu đầy đủ",
      "Báo cáo của bộ phận kiểm toán nội bộ",
    ],
    correctOption: 1,
    explanation:
      "Thứ bậc độ tin cậy đi theo hai trục. Trục thứ nhất là nguồn: bằng chứng từ bên ngoài độc lập đáng tin hơn bằng chứng do chính doanh nghiệp tạo ra. Trục thứ hai là cách kiểm toán viên có được nó: tự mình quan sát hoặc tính toán lại đáng tin hơn là nhận từ người khác. Thư xác nhận ngân hàng gửi thẳng cho kiểm toán viên đứng cao ở cả hai trục. Giải trình bằng lời của ban giám đốc đứng thấp nhất - nó vẫn được thu thập, nhưng không bao giờ đủ để một mình chống đỡ một kết luận.",
    diagram: [
      { label: "Bên thứ ba gửi thẳng cho kiểm toán viên", arrow: true },
      { label: "Kiểm toán viên tự tính lại, tự quan sát", arrow: true },
      { label: "Tài liệu bên ngoài do doanh nghiệp giữ", arrow: true },
      { label: "Sổ sách nội bộ và giải trình bằng lời" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao thư xác nhận phải gửi thẳng cho kiểm toán viên",
      description:
        "Thủ tục chuẩn là kiểm toán viên tự gửi thư xác nhận tới ngân hàng và khách hàng của doanh nghiệp, và yêu cầu thư trả lời gửi thẳng về địa chỉ của mình. Nghe thừa, nhưng chính bước này là cái bảo vệ giá trị của bằng chứng: nếu thư đi qua tay doanh nghiệp, nó không còn là bằng chứng độc lập nữa. Nhiều vụ gian lận lớn trong lịch sử ngành có chung một chi tiết - thư xác nhận giả, hoặc thư thật nhưng bị chặn và thay thế trên đường về.",
    },
    quiz: [
      {
        question: "Thử nghiệm kiểm soát khác thử nghiệm cơ bản ở điểm nào?",
        options: [
          "Thử nghiệm kiểm soát xem quy trình có vận hành hiệu quả không; thử nghiệm cơ bản kiểm tra chính con số",
          "Thử nghiệm kiểm soát do bộ phận kiểm toán nội bộ thực hiện còn thử nghiệm cơ bản do kiểm toán độc lập làm",
          "Thử nghiệm kiểm soát chỉ áp dụng cho doanh nghiệp niêm yết, còn doanh nghiệp chưa niêm yết thì không cần",
          "Thử nghiệm kiểm soát được thực hiện vào cuối kỳ còn thử nghiệm cơ bản được làm trong suốt cả năm tài chính",
        ],
        correct: 0,
        explanation:
          "Nếu kiểm soát chạy tốt, kiểm toán viên có thể giảm bớt thử nghiệm cơ bản. Đó là mối liên hệ trực tiếp giữa chất lượng quản trị của doanh nghiệp và chi phí kiểm toán.",
      },
      {
        question: "Vì sao giải trình bằng lời của ban giám đốc là bằng chứng yếu?",
        options: [
          "Vì nó đến từ chính bên chịu trách nhiệm lập báo cáo nên không mang tính độc lập",
          "Vì lời nói không được chuẩn mực kiểm toán công nhận là một dạng bằng chứng hợp lệ",
          "Vì ban giám đốc thường không nắm rõ chi tiết các nghiệp vụ kế toán phát sinh trong kỳ",
          "Vì giải trình bằng lời không thể lưu lại trong hồ sơ kiểm toán để phục vụ việc rà soát sau",
        ],
        correct: 0,
        explanation:
          "Nó vẫn được thu thập và lưu hồ sơ, đôi khi dưới dạng thư giải trình bằng văn bản. Điểm mấu chốt là nó bổ sung chứ không thay thế cho bằng chứng độc lập.",
      },
      {
        question: "Thủ tục phân tích trong kiểm toán là gì?",
        options: [
          "So sánh số liệu với kỳ trước, với kế hoạch hoặc với ngành để tìm biến động bất thường cần giải thích",
          "Phân tích khả năng sinh lời của doanh nghiệp nhằm tư vấn chiến lược cho ban điều hành sau kiểm toán",
          "Kiểm tra toàn bộ các giao dịch phát sinh trong kỳ theo trình tự thời gian từ đầu năm đến cuối năm",
          "Đánh giá năng lực chuyên môn của đội ngũ kế toán viên đang làm việc tại doanh nghiệp được kiểm toán",
        ],
        correct: 0,
        explanation:
          "Đây là thủ tục rẻ và nhanh, thường chạy trước để định hướng nên đào sâu ở đâu. Một biến động không giải thích được sẽ kéo theo thử nghiệm chi tiết.",
      },
      {
        question: "Vì sao kiểm toán viên tự tính lại một con số thay vì xem doanh nghiệp tính?",
        options: [
          "Vì bằng chứng do chính kiểm toán viên tạo ra có độ tin cậy cao hơn bằng chứng nhận lại từ bên khác",
          "Vì chuẩn mực yêu cầu mọi phép tính trong báo cáo tài chính đều phải được thực hiện lại hai lần",
          "Vì doanh nghiệp thường không lưu giữ các bảng tính chi tiết đứng sau những con số đã công bố",
          "Vì phương pháp tính toán của kiểm toán viên khác với phương pháp mà bộ phận kế toán của doanh nghiệp đang áp dụng",
        ],
        correct: 0,
        explanation:
          "Đây là trục thứ hai của thứ bậc bằng chứng: cách kiểm toán viên có được nó. Tự tính lại đứng cao vì loại bỏ hoàn toàn khả năng con số đã bị chỉnh sửa trên đường đi.",
      },
    ],
    keyTakeaways: [
      "Hai trục quyết định độ tin cậy: nguồn bên ngoài hay nội bộ, và kiểm toán viên tự lấy hay nhận lại",
      "Thư xác nhận phải gửi thẳng về kiểm toán viên, đi qua doanh nghiệp là mất giá trị",
      "Thử nghiệm kiểm soát xem quy trình chạy tốt không; thử nghiệm cơ bản kiểm tra chính con số",
      "Kiểm soát tốt thì giảm được thử nghiệm cơ bản - đây là lý do phí kiểm toán khác nhau",
      "Giải trình của ban giám đốc bổ sung chứ không thay thế bằng chứng độc lập",
    ],
    practicePrompt: {
      question:
        "Kiểm toán viên cần xác nhận số dư phải thu từ một khách hàng lớn. Cách nào cho bằng chứng mạnh nhất?",
      options: [
        "Xem hợp đồng và hóa đơn do doanh nghiệp cung cấp",
        "Gửi thư xác nhận tới khách hàng đó và nhận thư trả lời gửi thẳng về mình",
        "Hỏi kế toán trưởng của doanh nghiệp",
        "Đối chiếu số dư với sổ chi tiết công nợ",
      ],
      correct: 1,
      explanation:
        "Ba lựa chọn còn lại đều là bằng chứng do doanh nghiệp tạo ra hoặc do doanh nghiệp giữ, nên chúng chỉ chứng minh sổ sách nhất quán với chính nó - điều vẫn đúng ngay cả khi khoản phải thu là khống. Chỉ thư xác nhận từ bên thứ ba mới trả lời được câu hỏi khoản nợ này có thật hay không.",
    },
    summary: {
      keyIdea: "Độ tin cậy của bằng chứng do nguồn và cách thu thập quyết định, không do khối lượng",
      commonMistake: "Coi sổ sách nội bộ khớp nhau là bằng chứng đủ mạnh",
      action: "Với một con số bạn cần thẩm định, hỏi: bằng chứng này đến từ đâu, và ai có thể đã chỉnh sửa nó trên đường đi.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một khoản mục lớn trên báo cáo của một doanh nghiệp và liệt kê những loại bằng chứng có thể xác minh nó. Xếp chúng theo hai trục đã học, rồi tự đánh giá bằng chứng mạnh nhất trong tay bạn thuộc bậc nào.",
      secondary: "Bài tập này dùng được cho mọi việc thẩm định số liệu, không riêng kiểm toán.",
    },
    sections: [
      {
        type: "lead",
        text: "Ý kiến kiểm toán chỉ mạnh bằng bằng chứng đứng sau nó. Và không phải bằng chứng nào cũng ngang nhau - có một thứ bậc rõ ràng mà người ngoài nghề hiếm khi được chỉ cho.",
      },
      {
        type: "heading",
        text: "Thứ bậc độ tin cậy",
      },
      {
        type: "list",
        items: [
          "Mạnh nhất: bên thứ ba độc lập gửi thẳng cho kiểm toán viên - thư xác nhận ngân hàng, xác nhận công nợ",
          "Rất mạnh: kiểm toán viên tự tạo ra - tự kiểm kê hàng tồn kho, tự tính lại khấu hao",
          "Trung bình: tài liệu do bên ngoài phát hành nhưng doanh nghiệp giữ - hợp đồng, hóa đơn nhà cung cấp",
          "Yếu hơn: tài liệu nội bộ do doanh nghiệp tự lập - phiếu xuất kho, bảng tính phân bổ",
          "Yếu nhất: giải trình của ban giám đốc - luôn thu thập, không bao giờ đủ để đứng một mình",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Thử nghiệm kiểm soát",
          text: "Kiểm tra quy trình có vận hành như thiết kế không: mọi khoản chi trên một mức có được phê duyệt đúng cấp không. Kết quả tốt cho phép giảm bớt phần thử nghiệm cơ bản phía sau.",
        },
        right: {
          label: "Thử nghiệm cơ bản",
          text: "Kiểm tra chính con số: đối chiếu, tính lại, xác nhận với bên thứ ba, kiểm kê thực tế. Đây là phần không bao giờ bỏ hẳn được, chỉ tăng giảm khối lượng.",
        },
      },
      {
        type: "callout",
        label: "Kỹ năng này dùng được ngoài nghề kiểm toán",
        text: "Bất kỳ ai nhận một con số từ người khác - nhà phân tích đọc số liệu công ty cung cấp, người mua thẩm định doanh nghiệp mục tiêu, quản lý nhận báo cáo từ cấp dưới - đều đang đối mặt cùng câu hỏi: bằng chứng này đến từ đâu và ai đã có cơ hội chỉnh sửa nó. Thứ bậc ở trên là câu trả lời được hệ thống hóa qua nhiều thập kỷ, và nó áp dụng nguyên vẹn ngoài phạm vi một cuộc kiểm toán.",
      },
      {
        type: "closing",
        lines: [
          "Sổ sách khớp với chính nó không chứng minh được gì ngoài việc chúng khớp với nhau.",
          "Bài sau trả lời câu hỏi thực tế nhất: kiểm tra bao nhiêu thì đủ.",
        ],
      },
    ],
  },
  {
    id: 1534,
    slug: "chon-mau-trong-kiem-toan",
    title: "Kiểm toán, Bài 4: Chọn mẫu - vì sao không ai kiểm tra hết, và điều đó có ổn không",
    subtitle: "Chọn mẫu thống kê và phi thống kê, suy rộng sai sót, và cách một mẫu nhỏ vẫn cho kết luận có cơ sở",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🎲",
    track: "professional",
    whyItMatters:
      "Chọn mẫu là chỗ toàn bộ nghề kiểm toán đặt cược: kết luận về hàng trăm nghìn giao dịch được rút ra từ vài chục mẫu. Hiểu cơ chế này giải thích cả sức mạnh lẫn giới hạn thật của một cuộc kiểm toán, và nó dùng chung nền thống kê với chặng Định lượng.",
    openingQuestion:
      "Kiểm toán viên kiểm tra 60 hóa đơn trong tổng số 40.000 và không thấy sai sót. Kết luận đúng là gì?",
    openingOptions: [
      "Toàn bộ 40.000 hóa đơn đều không có sai sót",
      "Có cơ sở hợp lý để tin tỷ lệ sai sót thấp hơn ngưỡng đã đặt, với một mức độ tin cậy xác định",
      "Mẫu quá nhỏ nên không kết luận được gì",
      "Cần kiểm tra ít nhất 10% tổng số hóa đơn mới kết luận được",
    ],
    correctOption: 1,
    explanation:
      "Đây chính là suy diễn thống kê đã học ở chặng Định lượng, đặt vào bối cảnh kiểm toán. Mẫu không chứng minh tổng thể sạch, nó cho phép nói rằng nếu tỷ lệ sai sót thực sự cao hơn ngưỡng chấp nhận được thì khả năng cao mẫu đã lộ ra ít nhất một lỗi. Điều đáng chú ý và phản trực giác: cỡ mẫu cần thiết gần như không phụ thuộc vào tổng thể lớn bao nhiêu. Kiểm tra 40.000 hóa đơn hay 400.000 hóa đơn cần cỡ mẫu tương đương nhau, miễn cùng mức tin cậy và cùng ngưỡng.",
    diagram: [
      { label: "Đặt ngưỡng sai sót chấp nhận được", arrow: true },
      { label: "Chọn mức độ tin cậy", arrow: true },
      { label: "Tính cỡ mẫu, chọn mẫu", arrow: true },
      { label: "Suy rộng sai sót tìm thấy ra tổng thể" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Suy rộng một sai sót nhỏ thành con số trọng yếu",
      description:
        "Kiểm toán viên chọn 50 hóa đơn từ tổng thể 5.000 hóa đơn với tổng giá trị 500 tỷ, và tìm thấy hai hóa đơn ghi sai tổng cộng 30 triệu. Sai sót này tự nó không trọng yếu. Nhưng mẫu đại diện cho cả tổng thể, nên phải suy rộng: nếu tỷ lệ sai giữ nguyên trên toàn bộ, sai sót ước tính lên tới khoảng 3 tỷ. Con số suy rộng đó mới là con số đem so với mức trọng yếu, và nó có thể đủ lớn để yêu cầu doanh nghiệp điều chỉnh hoặc để mở rộng phạm vi kiểm tra.",
    },
    quiz: [
      {
        question: "Vì sao sai sót phát hiện trong mẫu phải được suy rộng ra tổng thể?",
        options: [
          "Vì mẫu đại diện cho tổng thể, nên tỷ lệ sai trong mẫu ngụ ý một mức sai sót tương ứng ở phần chưa kiểm",
          "Vì chuẩn mực kiểm toán yêu cầu nhân mọi sai sót tìm được với một hệ số an toàn cố định",
          "Vì doanh nghiệp thường cố tình đặt các sai sót lớn ở ngoài phạm vi mẫu được chọn kiểm tra",
          "Vì giá trị của các phần tử không được chọn vào mẫu luôn lớn hơn giá trị của những phần tử đã được chọn ra",
        ],
        correct: 0,
        explanation:
          "Đây là bước hay bị bỏ qua nhất và cũng quan trọng nhất: một sai sót 30 triệu trong mẫu có thể tương ứng vài tỷ trên tổng thể.",
      },
      {
        question: "Cỡ mẫu cần thiết phụ thuộc chủ yếu vào yếu tố nào?",
        options: [
          "Mức độ tin cậy mong muốn và ngưỡng sai sót chấp nhận được, chứ gần như không phụ thuộc quy mô tổng thể",
          "Quy mô của tổng thể, theo một tỷ lệ phần trăm cố định do chuẩn mực kiểm toán quốc tế hiện hành quy định",
          "Tổng giá trị bằng tiền của toàn bộ các phần tử có trong tổng thể được chọn mẫu để kiểm tra",
          "Số lượng nhân sự mà công ty kiểm toán bố trí được cho cuộc kiểm toán trong kỳ báo cáo đó",
        ],
        correct: 0,
        explanation:
          "Kết quả phản trực giác này đến thẳng từ thống kê suy diễn: sai số chuẩn phụ thuộc cỡ mẫu chứ không phụ thuộc quy mô tổng thể khi tổng thể đủ lớn.",
      },
      {
        question: "Chọn mẫu theo đơn vị tiền tệ có đặc điểm gì?",
        options: [
          "Phần tử có giá trị càng lớn thì xác suất được chọn càng cao, nên rủi ro trọng yếu được phủ tốt hơn",
          "Mọi phần tử trong tổng thể đều có xác suất được chọn hoàn toàn bằng nhau không phân biệt giá trị",
          "Chỉ chọn những phần tử có giá trị vượt quá mức trọng yếu tổng thể đã được xác định từ trước",
          "Phần tử được chọn theo thứ tự thời gian phát sinh, bắt đầu từ giao dịch đầu tiên trong kỳ báo cáo",
        ],
        correct: 0,
        explanation:
          "Cách này gắn xác suất chọn với giá trị, nên tự động dồn sự chú ý vào chỗ một sai sót có thể gây hậu quả lớn - hợp với mục tiêu về trọng yếu.",
      },
      {
        question: "Rủi ro chọn mẫu là gì?",
        options: [
          "Khả năng kết luận rút ra từ mẫu khác với kết luận nếu kiểm tra toàn bộ tổng thể",
          "Khả năng kiểm toán viên chọn nhầm phương pháp chọn mẫu không phù hợp với loại nghiệp vụ",
          "Khả năng doanh nghiệp phát hiện ra phần tử nào đã được chọn và can thiệp vào hồ sơ đó",
          "Khả năng cỡ mẫu tính ra vượt quá thời gian và ngân sách dành cho cuộc kiểm toán đó",
        ],
        correct: 0,
        explanation:
          "Rủi ro này không loại bỏ được, chỉ giảm bằng cách tăng cỡ mẫu. Nó là một phần của rủi ro phát hiện trong mô hình rủi ro ở bài trước.",
      },
    ],
    keyTakeaways: [
      "Mẫu không chứng minh tổng thể sạch, nó cho kết luận có mức tin cậy xác định",
      "Sai sót trong mẫu phải suy rộng ra tổng thể trước khi so với mức trọng yếu",
      "Cỡ mẫu phụ thuộc mức tin cậy và ngưỡng, gần như không phụ thuộc quy mô tổng thể",
      "Chọn mẫu theo đơn vị tiền tệ cho phần tử giá trị lớn xác suất được chọn cao hơn",
      "Rủi ro chọn mẫu không loại bỏ được, chỉ giảm bằng cách tăng cỡ mẫu",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp A có 5.000 giao dịch, doanh nghiệp B có 50.000 giao dịch cùng loại. Cùng mức tin cậy và ngưỡng, cỡ mẫu thế nào?",
      options: [
        "Doanh nghiệp B cần mẫu lớn gấp 10 lần",
        "Hai bên cần cỡ mẫu gần bằng nhau, vì cỡ mẫu không tỷ lệ với quy mô tổng thể",
        "Doanh nghiệp B cần mẫu lớn hơn nhưng không gấp 10 lần",
        "Không so sánh được nếu chưa biết giá trị từng giao dịch",
      ],
      correct: 1,
      explanation:
        "Đây là kết quả gây bất ngờ nhất với người mới, và nó giống hệt lý do một cuộc thăm dò 1.000 người có thể đại diện cho cả nước. Sai số chuẩn phụ thuộc căn bậc hai của cỡ mẫu, không phụ thuộc tổng thể - miễn tổng thể đủ lớn so với mẫu. Đây cũng là lý do phí kiểm toán không tăng tuyến tính theo quy mô doanh nghiệp.",
    },
    summary: {
      keyIdea: "Kiểm toán rút kết luận về tổng thể từ một mẫu nhỏ, bằng đúng nền thống kê suy diễn",
      commonMistake: "Coi việc không tìm thấy sai sót trong mẫu là bằng chứng tổng thể không có sai sót",
      action: "Đọc lại bài về mẫu và khoảng tin cậy ở Chặng 22 - toàn bộ cơ sở của bài này nằm ở đó.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Giả sử bạn kiểm tra 40 chứng từ trong tổng thể 4.000 chứng từ trị giá 200 tỷ, và tìm thấy sai sót 5 triệu. Tính con số suy rộng ra tổng thể, rồi so với mức trọng yếu bạn đã tính ở bài trước. Kết luận nên làm gì tiếp.",
      secondary: "Nếu con số suy rộng vượt mức trọng yếu, kiểm toán viên phải mở rộng thử nghiệm hoặc yêu cầu điều chỉnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là chỗ nghề kiểm toán đặt cược lớn nhất: kết luận về hàng trăm nghìn giao dịch được rút ra từ vài chục mẫu. Cơ sở của việc đó không phải kinh nghiệm, mà là thống kê - chính bộ công cụ ở Chặng 22.",
      },
      {
        type: "heading",
        text: "Hai cách chọn mẫu",
      },
      {
        type: "conceptTable",
        title: "Chọn mẫu thống kê và phi thống kê",
        subtitle: "Cả hai đều được chuẩn mực cho phép, khác nhau ở chỗ có định lượng được rủi ro hay không",
        concepts: [
          { vi: "Chọn mẫu thống kê", en: "Statistical sampling", def: "Cỡ mẫu tính từ mức tin cậy và ngưỡng, phần tử chọn ngẫu nhiên. Cho phép định lượng rủi ro chọn mẫu bằng con số." },
          { vi: "Chọn mẫu phi thống kê", en: "Judgemental sampling", def: "Kiểm toán viên chọn dựa trên phán đoán nghề nghiệp: giao dịch bất thường, gần ngày khóa sổ, với bên liên quan." },
          { vi: "Theo đơn vị tiền tệ", en: "Monetary unit sampling", def: "Xác suất được chọn tỷ lệ với giá trị phần tử. Dồn sự chú ý vào chỗ sai sót gây hậu quả lớn nhất." },
        ],
      },
      {
        type: "callout",
        label: "Bước hay bị quên: suy rộng",
        text: "Tìm thấy một sai sót 30 triệu trong mẫu rồi kết luận sai sót không trọng yếu là sai về nguyên tắc. Mẫu đại diện cho tổng thể, nên tỷ lệ sai trong mẫu ngụ ý một khối sai sót tương ứng ở phần chưa kiểm tra. Con số phải đem so với mức trọng yếu là con số đã suy rộng, không phải con số tìm thấy trực tiếp. Đây là chỗ một sai sót trông nhỏ biến thành lý do phải mở rộng phạm vi kiểm toán.",
      },
      {
        type: "closing",
        lines: [
          "Không tìm thấy sai sót không có nghĩa là không có sai sót - nó có nghĩa là nếu có nhiều, ta đã thấy.",
          "Bài sau nói về loại sai sót được thiết kế để không lộ ra trong mẫu: gian lận.",
        ],
      },
    ],
  },
  {
    id: 1535,
    slug: "gian-lan-va-trach-nhiem-kiem-toan-vien",
    title: "Kiểm toán, Bài 5: Gian lận - tam giác gian lận và giới hạn trách nhiệm kiểm toán viên",
    subtitle: "Vì sao gian lận khó phát hiện hơn nhầm lẫn, ba điều kiện tạo ra nó, và dấu hiệu cảnh báo trên báo cáo",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🚩",
    track: "professional",
    whyItMatters:
      "Gian lận khác nhầm lẫn ở một điểm quyết định: nó được thiết kế để không bị phát hiện. Hiểu cơ chế của nó vừa là phần lõi của nghề kiểm toán, vừa là kỹ năng đọc báo cáo tài chính hoài nghi mà mọi nhà đầu tư đều cần.",
    openingQuestion:
      "Vì sao gian lận khó phát hiện hơn nhầm lẫn kế toán thông thường?",
    openingOptions: [
      "Vì gian lận thường có giá trị lớn hơn nhầm lẫn",
      "Vì nó cố ý và có người chủ động che giấu, thường bằng cách làm giả chứng từ hoặc thông đồng",
      "Vì chuẩn mực kiểm toán không yêu cầu tìm gian lận",
      "Vì gian lận chỉ xảy ra ở doanh nghiệp lớn",
    ],
    correctOption: 1,
    explanation:
      "Nhầm lẫn để lại dấu vết tự nhiên: một bút toán lệch, một đối chiếu không khớp. Gian lận thì ngược lại - người thực hiện biết kiểm toán viên sẽ kiểm tra gì và chuẩn bị sẵn cho điều đó. Nguy hiểm nhất là gian lận có thông đồng, vì khi hai người trở lên cùng tham gia thì chính hệ thống kiểm soát nội bộ - vốn dựa trên nguyên tắc phân tách nhiệm vụ - bị vô hiệu hóa. Chuẩn mực thừa nhận thẳng điều này: một cuộc kiểm toán được thiết kế đúng vẫn có thể không phát hiện được gian lận có thông đồng ở cấp cao.",
    diagram: [
      { label: "Áp lực: chỉ tiêu, nợ, kỳ vọng thị trường", arrow: true },
      { label: "Cơ hội: kiểm soát yếu, quyền lực tập trung", arrow: true },
      { label: "Biện minh: tự thuyết phục là chấp nhận được", arrow: true },
      { label: "Đủ ba yếu tố → rủi ro gian lận cao" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Vì sao ghi nhận doanh thu là nơi gian lận hay xảy ra nhất",
      description:
        "Thống kê các vụ gian lận báo cáo tài chính cho thấy phần lớn nằm ở doanh thu, và lý do khớp hoàn hảo với tam giác gian lận. Áp lực: thưởng của ban điều hành và kỳ vọng thị trường đều gắn với tăng trưởng doanh thu. Cơ hội: thời điểm ghi nhận doanh thu là vấn đề phán đoán, đặc biệt với hợp đồng nhiều giai đoạn hoặc bán hàng có điều kiện trả lại. Biện minh: ghi sớm vài ngày được tự thuyết phục là chỉ đẩy sang kỳ sau chứ không phải tạo doanh thu khống. Đó là lý do chuẩn mực coi rủi ro gian lận doanh thu là giả định mặc định phải phản bác chứ không phải phải chứng minh.",
    },
    quiz: [
      {
        question: "Ba yếu tố của tam giác gian lận là gì?",
        options: [
          "Áp lực, cơ hội và sự biện minh của người thực hiện hành vi",
          "Động cơ tài chính, năng lực chuyên môn và vị trí quản lý trong doanh nghiệp",
          "Kiểm soát nội bộ yếu, kiểm toán viên thiếu kinh nghiệm và chuẩn mực kế toán lỏng lẻo",
          "Quy mô doanh nghiệp lớn, cơ cấu sở hữu phân tán và hoạt động trên nhiều quốc gia",
        ],
        correct: 0,
        explanation:
          "Kiểm toán viên chỉ tác động được vào yếu tố cơ hội, thông qua đánh giá kiểm soát nội bộ. Hai yếu tố còn lại nằm ngoài tầm với nhưng vẫn phải được nhận diện.",
      },
      {
        question: "Vì sao gian lận có thông đồng đặc biệt nguy hiểm?",
        options: [
          "Vì nó vô hiệu hóa nguyên tắc phân tách nhiệm vụ, vốn là nền tảng của kiểm soát nội bộ",
          "Vì số tiền bị chiếm đoạt trong các vụ có thông đồng luôn lớn hơn nhiều so với vụ đơn lẻ",
          "Vì các vụ có thông đồng thường kéo dài nhiều năm nên chứng từ gốc đã bị tiêu hủy hết",
          "Vì chuẩn mực kiểm toán không cho phép kiểm toán viên điều tra hành vi của nhiều người cùng lúc",
        ],
        correct: 0,
        explanation:
          "Phân tách nhiệm vụ hoạt động dựa trên giả định người phê duyệt và người thực hiện không cùng phe. Thông đồng phá đúng giả định đó, nên kiểm soát vẫn chạy mà không còn tác dụng.",
      },
      {
        question: "Trách nhiệm của kiểm toán viên đối với gian lận là gì?",
        options: [
          "Đảm bảo hợp lý rằng báo cáo không còn sai sót trọng yếu, dù do gian lận hay do nhầm lẫn",
          "Phát hiện toàn bộ các hành vi gian lận đã xảy ra tại doanh nghiệp trong kỳ báo cáo được kiểm toán",
          "Không có trách nhiệm nào về gian lận, vì đó thuộc thẩm quyền của cơ quan điều tra chuyên trách",
          "Chỉ chịu trách nhiệm với gian lận do nhân viên cấp thấp thực hiện chứ không phải do ban điều hành",
        ],
        correct: 0,
        explanation:
          "Chữ trọng yếu và hợp lý vẫn ràng buộc như ở bài đầu chặng. Kiểm toán không phải điều tra, nhưng cũng không được phép bỏ qua dấu hiệu.",
      },
      {
        question: "Dấu hiệu nào trên báo cáo tài chính đáng nghi ngờ nhất?",
        options: [
          "Lợi nhuận tăng đều nhiều năm trong khi dòng tiền từ hoạt động kinh doanh không theo kịp",
          "Doanh nghiệp thay đổi chính sách kế toán khấu hao sau khi mua sắm tài sản cố định mới",
          "Chi phí quản lý doanh nghiệp tăng nhanh hơn tốc độ tăng doanh thu trong cùng kỳ báo cáo",
          "Doanh nghiệp phát hành thêm cổ phiếu để huy động vốn trong năm tài chính vừa kết thúc",
        ],
        correct: 0,
        explanation:
          "Lợi nhuận là ý kiến kế toán, tiền là sự thật - khoảng cách kéo dài giữa hai đại lượng này là dấu hiệu cảnh báo được nhắc tới nhiều nhất trong phân tích pháp y.",
      },
    ],
    keyTakeaways: [
      "Gian lận khác nhầm lẫn ở chỗ cố ý và được che giấu chủ động",
      "Tam giác gian lận: áp lực, cơ hội, biện minh - kiểm toán viên chỉ tác động được vào cơ hội",
      "Thông đồng vô hiệu hóa phân tách nhiệm vụ, nên kiểm soát vẫn chạy mà mất tác dụng",
      "Rủi ro gian lận doanh thu là giả định mặc định phải phản bác, không phải phải chứng minh",
      "Lợi nhuận tăng đều mà dòng tiền không theo kịp là dấu hiệu cảnh báo mạnh nhất",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp có lợi nhuận tăng 25% mỗi năm suốt bốn năm, nhưng dòng tiền từ hoạt động kinh doanh gần như đứng yên. Nên nghĩ gì?",
      options: [
        "Doanh nghiệp đang tăng trưởng tốt",
        "Cần tìm hiểu vì sao lợi nhuận không chuyển thành tiền: có thể là phải thu phình to hoặc doanh thu ghi nhận sớm",
        "Đây là chuyện bình thường với doanh nghiệp tăng trưởng",
        "Doanh nghiệp đang đầu tư mạnh vào tài sản cố định",
      ],
      correct: 1,
      explanation:
        "Khoảng cách một năm giữa lợi nhuận và dòng tiền là bình thường, đặc biệt khi doanh nghiệp mở rộng. Khoảng cách kéo dài bốn năm liên tiếp thì không - nó nghĩa là lợi nhuận đang được ghi nhận mà tiền không bao giờ về. Bước tiếp theo là soi số ngày thu tiền bình quân qua các năm: nếu nó tăng đều, doanh thu có thể đang được ghi nhận cho những khoản không thu được.",
    },
    summary: {
      keyIdea: "Gian lận được thiết kế để vượt qua đúng những thủ tục mà nó biết sẽ được thực hiện",
      commonMistake: "Cho rằng ý kiến chấp nhận toàn phần loại trừ khả năng có gian lận",
      action: "Với một doanh nghiệp bạn theo dõi, vẽ đồ thị lợi nhuận và dòng tiền hoạt động trong năm năm cạnh nhau.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một doanh nghiệp niêm yết và kiểm tra ba dấu hiệu: khoảng cách giữa lợi nhuận và dòng tiền hoạt động qua các năm, xu hướng số ngày thu tiền bình quân, và tỷ trọng doanh thu ghi nhận trong quý cuối năm so với ba quý đầu.",
      secondary: "Ba dấu hiệu này không chứng minh gian lận, chúng chỉ cho biết nên đọc kỹ thuyết minh ở đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về sai sót để lại dấu vết tự nhiên. Bài này nói về loại sai sót có người chủ động xóa dấu vết - và vì sao chuẩn mực thừa nhận công khai rằng không phải lúc nào cũng bắt được nó.",
      },
      {
        type: "heading",
        text: "Tam giác gian lận",
      },
      {
        type: "conceptTable",
        title: "Ba điều kiện cùng xuất hiện",
        subtitle: "Thiếu một yếu tố thì rủi ro giảm mạnh - đó là lý do khung này hữu ích cho việc đánh giá",
        concepts: [
          { vi: "Áp lực", en: "Pressure", def: "Chỉ tiêu lợi nhuận, điều khoản vay ràng buộc chỉ số tài chính, kỳ vọng thị trường, thưởng gắn với kết quả. Nằm ngoài tầm can thiệp của kiểm toán viên." },
          { vi: "Cơ hội", en: "Opportunity", def: "Kiểm soát nội bộ yếu, quyền lực tập trung vào một người, khoản mục cần nhiều phán đoán. Đây là yếu tố duy nhất kiểm toán viên đánh giá và tác động được." },
          { vi: "Biện minh", en: "Rationalisation", def: "Tự thuyết phục rằng hành vi chấp nhận được: chỉ mượn tạm, chỉ đẩy sang kỳ sau, ai cũng làm thế. Là yếu tố tâm lý và khó quan sát nhất." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhầm lẫn",
          text: "Không cố ý. Để lại dấu vết tự nhiên: đối chiếu không khớp, bút toán lệch, số dư bất thường. Thủ tục kiểm toán thông thường đủ để phát hiện.",
        },
        right: {
          label: "Gian lận",
          text: "Cố ý và được che giấu. Người thực hiện biết kiểm toán viên sẽ kiểm tra gì và chuẩn bị trước. Cần thái độ hoài nghi nghề nghiệp chứ không chỉ thủ tục.",
        },
      },
      {
        type: "callout",
        label: "Hoài nghi nghề nghiệp",
        text: "Chuẩn mực yêu cầu kiểm toán viên duy trì thái độ hoài nghi nghề nghiệp trong suốt cuộc kiểm toán, nghĩa là không cho rằng ban giám đốc trung thực và cũng không cho rằng họ không trung thực. Nghe đơn giản nhưng khó duy trì trong thực tế: kiểm toán viên làm việc với cùng một khách hàng nhiều năm, quan hệ trở nên thân thiện, và giải trình của một người mình đã tin tưởng nhiều năm rất dễ được chấp nhận mà không đòi bằng chứng. Đây là lý do có quy định luân chuyển kiểm toán viên chính sau một số năm nhất định.",
      },
      {
        type: "closing",
        lines: [
          "Kiểm toán không hứa bắt được mọi gian lận. Nó hứa sẽ không bỏ qua dấu hiệu mà một người hoài nghi phải thấy.",
          "Bài cuối chặng nói về tuyến phòng vệ đứng bên trong doanh nghiệp, trước khi kiểm toán độc lập vào cuộc.",
        ],
      },
    ],
  },
  {
    id: 1536,
    slug: "kiem-toan-noi-bo-va-ba-tuyen-phong-ve",
    title: "Kiểm toán, Bài 6: Kiểm toán nội bộ và ba tuyến phòng vệ - ai canh gác cái gì",
    subtitle: "Khác biệt với kiểm toán độc lập, vì sao báo cáo thẳng lên ủy ban kiểm toán, và mô hình ba tuyến",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "professional",
    whyItMatters:
      "Kiểm toán nội bộ là nghề riêng với logic riêng, không phải phiên bản thu nhỏ của kiểm toán độc lập. Mô hình ba tuyến phòng vệ cũng là khung tư duy quản trị rủi ro dùng chung cho ngân hàng, bảo hiểm và mọi tổ chức có quy mô.",
    openingQuestion:
      "Kiểm toán nội bộ nên báo cáo trực tiếp cho ai?",
    openingOptions: [
      "Tổng giám đốc, vì đó là người điều hành cao nhất",
      "Ủy ban kiểm toán thuộc hội đồng quản trị, để giữ độc lập với chính bộ máy điều hành mà mình kiểm tra",
      "Giám đốc tài chính, vì phần lớn nội dung kiểm tra liên quan tài chính",
      "Kiểm toán độc lập bên ngoài",
    ],
    correctOption: 1,
    explanation:
      "Kiểm toán nội bộ kiểm tra chính bộ máy điều hành, nên nếu báo cáo cho người đứng đầu bộ máy đó thì tính độc lập mất ngay: một phát hiện bất lợi cho tổng giám đốc sẽ đi qua bàn của chính tổng giám đốc trước khi tới hội đồng quản trị. Vì vậy thông lệ quản trị tốt tách hai tuyến: về hành chính có thể trực thuộc ban điều hành, nhưng về chuyên môn và báo cáo phát hiện thì thẳng lên ủy ban kiểm toán - cơ quan gồm các thành viên hội đồng quản trị độc lập.",
    diagram: [
      { label: "Tuyến 1: bộ phận vận hành tự kiểm soát", arrow: true },
      { label: "Tuyến 2: quản trị rủi ro, tuân thủ", arrow: true },
      { label: "Tuyến 3: kiểm toán nội bộ", arrow: true },
      { label: "Bên ngoài: kiểm toán độc lập" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Vì sao ngân hàng bắt buộc có ba tuyến",
      description:
        "Trong một ngân hàng, tuyến một là chính các đơn vị kinh doanh - người cấp tín dụng phải tự thẩm định theo quy trình. Tuyến hai là khối quản trị rủi ro và tuân thủ, đặt hạn mức và giám sát độc lập với đơn vị kinh doanh. Tuyến ba là kiểm toán nội bộ, kiểm tra xem cả hai tuyến trên có thực sự vận hành như thiết kế không. Cấu trúc này là yêu cầu quản lý chứ không phải lựa chọn, vì bài học lặp lại từ các vụ đổ vỡ ngân hàng là khi tuyến hai báo cáo cho chính người chịu trách nhiệm doanh số, hạn mức rủi ro luôn bị nới ra.",
    },
    quiz: [
      {
        question: "Khác biệt cơ bản giữa kiểm toán nội bộ và kiểm toán độc lập là gì?",
        options: [
          "Kiểm toán nội bộ phục vụ hội đồng quản trị và ban điều hành; kiểm toán độc lập phục vụ người dùng báo cáo bên ngoài",
          "Kiểm toán nội bộ chỉ kiểm tra số liệu kế toán, còn kiểm toán độc lập thì kiểm tra cả quy trình vận hành lẫn sổ sách",
          "Kiểm toán nội bộ được thực hiện hằng quý còn kiểm toán độc lập chỉ thực hiện một lần vào cuối năm",
          "Kiểm toán nội bộ do nhân viên doanh nghiệp làm nên không cần tuân theo chuẩn mực nghề nghiệp nào",
        ],
        correct: 0,
        explanation:
          "Từ khác biệt về đối tượng phục vụ này mà mọi khác biệt khác chảy ra: phạm vi, tần suất, và cả cách xử lý phát hiện.",
      },
      {
        question: "Phạm vi công việc của kiểm toán nội bộ so với kiểm toán độc lập thế nào?",
        options: [
          "Rộng hơn: gồm cả hiệu quả vận hành, tuân thủ nội bộ và quản trị rủi ro chứ không chỉ báo cáo tài chính",
          "Hẹp hơn: chỉ tập trung vào việc kiểm tra tính chính xác của các số liệu kế toán được ghi nhận",
          "Tương đương nhau, vì cả hai đều áp dụng chung một bộ chuẩn mực kiểm toán quốc tế hiện hành",
          "Rộng hơn, nhưng chỉ trong phạm vi các đơn vị thành viên chứ không bao gồm chính công ty mẹ của tập đoàn",
        ],
        correct: 0,
        explanation:
          "Một cuộc kiểm toán nội bộ có thể xem xét quy trình mua sắm có lãng phí không - câu hỏi hoàn toàn nằm ngoài phạm vi kiểm toán báo cáo tài chính.",
      },
      {
        question: "Tuyến phòng vệ thứ hai gồm những bộ phận nào?",
        options: [
          "Quản trị rủi ro, tuân thủ và kiểm soát tài chính - giám sát độc lập với đơn vị kinh doanh",
          "Chính các đơn vị kinh doanh trực tiếp, vì họ là người hiểu rõ rủi ro của mình nhất",
          "Kiểm toán nội bộ, vì đây là tuyến giám sát chuyên trách đầu tiên trong cơ cấu tổ chức",
          "Kiểm toán độc lập bên ngoài cùng với các cơ quan quản lý nhà nước có thẩm quyền giám sát trực tiếp",
        ],
        correct: 0,
        explanation:
          "Điểm quan trọng là tuyến hai phải độc lập về báo cáo với tuyến một. Khi nó báo cáo cho chính người chịu trách nhiệm doanh số, chức năng giám sát mất tác dụng.",
      },
      {
        question: "Vì sao kiểm toán độc lập không được coi là một trong ba tuyến phòng vệ?",
        options: [
          "Vì họ ở ngoài tổ chức, nên đóng vai trò đảm bảo bổ sung chứ không phải một lớp kiểm soát nội tại",
          "Vì họ chỉ làm việc mỗi năm một lần nên không đủ tần suất để được tính là một tuyến phòng vệ thực thụ",
          "Vì phạm vi của họ hẹp hơn nhiều so với ba tuyến bên trong tổ chức nên không tương đương",
          "Vì họ được doanh nghiệp trả phí nên không đủ độc lập để được xem là một tuyến giám sát",
        ],
        correct: 0,
        explanation:
          "Mô hình mô tả cách một tổ chức tự quản trị rủi ro của mình. Kiểm toán độc lập và cơ quan quản lý là lớp bên ngoài, thường được vẽ nằm ngoài cả ba tuyến.",
      },
    ],
    keyTakeaways: [
      "Kiểm toán nội bộ phục vụ hội đồng quản trị; kiểm toán độc lập phục vụ người đọc báo cáo bên ngoài",
      "Báo cáo thẳng lên ủy ban kiểm toán, vì nó kiểm tra chính bộ máy điều hành",
      "Phạm vi rộng hơn: hiệu quả vận hành và quản trị rủi ro, không chỉ báo cáo tài chính",
      "Ba tuyến: vận hành tự kiểm soát, quản trị rủi ro giám sát, kiểm toán nội bộ kiểm tra cả hai",
      "Tuyến hai mất tác dụng khi nó báo cáo cho chính người chịu trách nhiệm doanh số",
    ],
    practicePrompt: {
      question:
        "Trưởng kiểm toán nội bộ báo cáo trực tiếp và duy nhất cho tổng giám đốc. Vấn đề ở đâu?",
      options: [
        "Không có vấn đề gì, đó là cấu trúc báo cáo thông thường",
        "Mất tính độc lập: phát hiện bất lợi cho ban điều hành phải đi qua chính người bị kiểm tra trước khi tới hội đồng",
        "Trưởng kiểm toán nội bộ sẽ quá tải công việc",
        "Chi phí bộ phận kiểm toán nội bộ sẽ tăng lên",
      ],
      correct: 1,
      explanation:
        "Đây là lỗi cấu trúc quản trị chứ không phải vấn đề về con người - nó tồn tại kể cả khi mọi người đều có thiện chí. Cách khắc phục chuẩn là đường báo cáo kép: hành chính trực thuộc ban điều hành cho các việc thường ngày, nhưng chuyên môn và mọi phát hiện thì báo cáo thẳng lên ủy ban kiểm toán của hội đồng quản trị.",
    },
    summary: {
      keyIdea: "Độc lập của kiểm toán nội bộ đến từ đường báo cáo, không từ phẩm chất cá nhân",
      commonMistake: "Xem kiểm toán nội bộ như phiên bản thu nhỏ của kiểm toán độc lập",
      action: "Tìm mục quản trị công ty trong báo cáo thường niên của một doanh nghiệp niêm yết và xem kiểm toán nội bộ báo cáo cho ai.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Với một doanh nghiệp niêm yết, tra báo cáo thường niên để trả lời: có ủy ban kiểm toán không, có bao nhiêu thành viên độc lập, và bộ phận kiểm toán nội bộ báo cáo cho ai. Ba câu này cho biết khá nhiều về chất lượng quản trị.",
      secondary: "Doanh nghiệp không trả lời được cả ba câu trong tài liệu công bố cũng đã là một câu trả lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước nói về kiểm toán độc lập - người từ bên ngoài vào mỗi năm một lần. Bài này nói về tuyến phòng vệ nằm sẵn bên trong, và vì sao cấu trúc báo cáo của nó lại quan trọng hơn năng lực của nó.",
      },
      {
        type: "heading",
        text: "Mô hình ba tuyến phòng vệ",
      },
      {
        type: "conceptTable",
        title: "Ai canh gác cái gì",
        subtitle: "Mỗi tuyến giám sát tuyến trước, và tính độc lập giữa các tuyến là điều kiện để mô hình chạy",
        concepts: [
          { vi: "Tuyến 1", en: "Đơn vị vận hành", def: "Chính bộ phận kinh doanh sở hữu và kiểm soát rủi ro của mình theo quy trình đã ban hành. Đây là nơi rủi ro phát sinh và cũng là nơi được xử lý đầu tiên." },
          { vi: "Tuyến 2", en: "Quản trị rủi ro & tuân thủ", def: "Đặt khung, giới hạn và giám sát tuyến một. Phải độc lập về báo cáo với tuyến một, nếu không thì hạn mức luôn bị nới." },
          { vi: "Tuyến 3", en: "Kiểm toán nội bộ", def: "Kiểm tra xem cả hai tuyến trên có vận hành như thiết kế không. Báo cáo thẳng lên ủy ban kiểm toán để giữ độc lập với ban điều hành." },
        ],
      },
      {
        type: "callout",
        label: "Độc lập là chuyện cấu trúc, không phải chuyện phẩm chất",
        text: "Một trưởng kiểm toán nội bộ liêm chính vẫn không thể độc lập nếu lương, thưởng và việc bổ nhiệm của họ do chính người bị kiểm tra quyết định. Đây là lý do các khuyến nghị quản trị đều tập trung vào cấu trúc: ai bổ nhiệm, ai đánh giá, phát hiện đi tới đâu. Cùng lập luận đó áp dụng cho kiểm toán độc lập - và là lý do có quy định về luân chuyển kiểm toán viên chính cùng giới hạn về các dịch vụ phi kiểm toán được phép cung cấp cho cùng một khách hàng.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi đúng về một chức năng giám sát không phải họ có giỏi không, mà là họ báo cáo cho ai.",
          "Chặng này khép lại phần kiểm toán: từ đọc một ý kiến, tới hiểu cỗ máy tạo ra nó.",
        ],
      },
    ],
  },
];
