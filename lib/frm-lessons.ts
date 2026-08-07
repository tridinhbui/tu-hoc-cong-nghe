import type { Lesson } from "./lesson-types";

// Chặng "FRM - Nền tảng" (ids 1527-1530 + 1537-1541, professional track -
// 1531-1536 skipped to avoid colliding with lib/audit-lessons.ts, added
// concurrently by another session using the same id range).
//
// Lý do tồn tại: lib/frm-track.ts map lộ trình FRM vào 10 môn chính thức
// GARP, nhưng 3 môn - Foundations of Risk Management, Operational
// Resilience and Risk Management, và Liquidity and Treasury Risk - gần như
// trống, vì không có bài học nào trong 553 bài cũ dạy đúng nội dung đó (đã
// xác nhận bằng cách quét toàn bộ tiêu đề/subtitle, không chỉ đoán theo từ
// khoá). Chín bài dưới đây, ba bài mỗi môn, lấp phần lõi của cả ba: khung
// ERM và văn hoá rủi ro, các thảm hoạ tài chính kinh điển; đo lường và khả
// năng phục hồi rủi ro vận hành, rủi ro mô hình/bên thứ ba; và LCR/NSFR,
// rủi ro tài trợ, ALM. Không phải toàn bộ đề cương GARP - đó là hàng trăm
// trang giáo trình - nhưng đủ để một người mới không còn nhìn thấy ba môn
// trống trơn khi mở lộ trình.

export const FRM_LESSONS: Lesson[] = [
  // ═══════════════ FOUNDATIONS OF RISK MANAGEMENT ═══════════════
  {
    id: 1527,
    slug: "erm-khung-quan-tri-rui-ro-doanh-nghiep",
    title: "FRM Foundations, Bài 1: Khung Quản trị Rủi ro Doanh nghiệp (ERM)",
    subtitle: "Ba tuyến phòng thủ, khẩu vị rủi ro và hạn mức rủi ro: vì sao rủi ro không phải việc riêng của phòng rủi ro",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏛️",
    track: "professional",
    whyItMatters:
      "Phần lớn thảm hoạ tài chính lớn không phải vì không ai nhìn thấy rủi ro, mà vì cấu trúc quản trị không có cơ chế nào bắt buộc phải hành động khi thấy nó. ERM là khung trả lời câu hỏi: ai chịu trách nhiệm gì, và giới hạn nào không được vượt qua dù đang có lãi.",
    openingQuestion: "Trong mô hình ba tuyến phòng thủ (three lines of defense), ai là tuyến đầu tiên chịu trách nhiệm quản lý rủi ro?",
    openingOptions: [
      "Phòng Quản trị Rủi ro độc lập",
      "Bộ phận kinh doanh trực tiếp tạo ra rủi ro đó",
      "Kiểm toán nội bộ",
      "Hội đồng quản trị",
    ],
    correctOption: 1,
    explanation:
      "Tuyến thứ nhất là chính bộ phận kinh doanh (trading desk, tín dụng, vận hành) - họ tạo ra rủi ro nên phải là người đầu tiên kiểm soát nó hằng ngày. Tuyến hai (phòng Rủi ro, Tuân thủ) giám sát độc lập. Tuyến ba (Kiểm toán nội bộ) đánh giá xem hai tuyến trước có thực sự hoạt động không.",
    diagram: [
      { label: "Tuyến 1: Bộ phận kinh doanh tự kiểm soát", arrow: true },
      { label: "Tuyến 2: Rủi ro & Tuân thủ giám sát độc lập", arrow: true },
      { label: "Tuyến 3: Kiểm toán nội bộ đánh giá cả hai tuyến trên", arrow: true },
      { label: "Hội đồng quản trị đặt khẩu vị rủi ro cho toàn bộ" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Barings Bank, 1995",
      description:
        "Nick Leeson vừa là trader vừa tự kiêm luôn việc tất toán (settlement) cho chính giao dịch của mình tại Singapore - tuyến 1 và một phần việc của tuyến 2 gộp làm một. Không ai độc lập kiểm tra vị thế thật của anh ta trong hơn hai năm. Khoản lỗ giấu trong tài khoản 88888 âm thầm phình lên 827 triệu bảng, đủ để xoá sổ một ngân hàng 233 năm tuổi chỉ trong vài tuần khi bị phát hiện.",
    },
    quiz: [
      {
        question: "Khẩu vị rủi ro (risk appetite) khác hạn mức rủi ro (risk limit) ở điểm nào?",
        options: [
          "Khẩu vị rủi ro là tuyên bố cấp cao về mức rủi ro chấp nhận được; hạn mức là con số cụ thể áp xuống từng bàn để hiện thực hoá khẩu vị đó",
          "Hai khái niệm hoàn toàn giống nhau, chỉ khác tên gọi giữa các ngân hàng",
          "Khẩu vị rủi ro do chính trader ở mỗi bàn giao dịch tự đặt ra hằng ngày tuỳ theo diễn biến thị trường, còn hạn mức chỉ được hội đồng quản trị xem xét lại một lần duy nhất mỗi năm",
          "Hạn mức rủi ro chỉ áp dụng cho rủi ro tín dụng, khẩu vị rủi ro chỉ áp dụng cho rủi ro thị trường",
        ],
        correct: 0,
        explanation:
          "Khẩu vị rủi ro là tuyên bố ở cấp hội đồng quản trị (ví dụ: không chấp nhận lỗ quá X% vốn trong một năm). Hạn mức rủi ro là con số cụ thể - VaR limit, stop-loss, hạn mức tín dụng theo đối tác - được chia nhỏ xuống từng bàn giao dịch để đảm bảo tổng rủi ro không vượt khẩu vị đã đặt.",
      },
      {
        question: "Vì sao mô hình ba tuyến phòng thủ yêu cầu tuyến 2 phải độc lập với tuyến 1 về mặt báo cáo?",
        options: [
          "Vì luật ở mọi quốc gia đều bắt buộc như vậy",
          "Để tuyến 2 không bị áp lực doanh số của tuyến 1 chi phối khi cảnh báo rủi ro",
          "Vì tuyến 2 cần dùng phần mềm khác với tuyến 1",
          "Để tuyến 2 có thể nhận thưởng theo doanh thu của tuyến 1",
        ],
        correct: 1,
        explanation:
          "Nếu người kiểm soát rủi ro báo cáo cho chính người tạo ra rủi ro (hoặc được thưởng theo kết quả kinh doanh của họ), động lực sẽ nghiêng về việc im lặng khi có vấn đề. Độc lập báo cáo - thường lên thẳng CRO hoặc hội đồng quản trị - là điều kiện để tuyến 2 dám nói không.",
      },
      {
        question: "Trong vụ Barings Bank, lỗ hổng quản trị cốt lõi là gì?",
        options: [
          "Ngân hàng hoàn toàn không có bất kỳ bộ phận quản trị rủi ro hay quy trình kiểm soát nội bộ nào được thiết lập trên giấy tờ",
          "Một cá nhân vừa giao dịch vừa tự tất toán, xoá bỏ ranh giới giữa tuyến 1 và giám sát độc lập",
          "Thị trường Nhật Bản biến động quá mạnh khiến không ai lường trước được",
          "Ngân hàng bị tấn công mạng làm lộ vị thế giao dịch",
        ],
        correct: 1,
        explanation:
          "Leeson kiêm cả vai trò trader (tạo lệnh) và vai trò settlement (xác nhận, đối chiếu) - đúng chức năng lẽ ra phải tách biệt để một bên kiểm tra bên kia. Gộp hai vai trò này lại là lỗi cấu trúc, không phải lỗi thị trường.",
      },
      {
        question: "Vai trò của hội đồng quản trị trong khung ERM là gì?",
        options: [
          "Trực tiếp phê duyệt từng giao dịch của mọi bàn",
          "Đặt khẩu vị rủi ro và giám sát tuân thủ",
          "Thay hoàn toàn vai trò phòng Quản trị Rủi ro",
          "Chỉ họp khi khủng hoảng đã xảy ra",
        ],
        correct: 1,
        explanation:
          "Hội đồng quản trị hoạt động ở tầng chiến lược: đặt ra mức rủi ro chấp nhận được cho toàn tổ chức, phê duyệt khung ERM, và giám sát báo cáo rủi ro định kỳ. Việc quản lý rủi ro từng giao dịch thuộc về tuyến 1 và 2, không phải hội đồng quản trị.",
      },
    
    {
      "question": "Vì sao hạn mức rủi ro phải được diễn giải xuống tới từng bộ phận thay vì chỉ đặt ở cấp tập đoàn?",
      "options": [
        "Vì người ra quyết định hằng ngày cần biết ranh giới cụ thể của mình",
        "Vì cơ quan quản lý yêu cầu công bố hạn mức của từng bộ phận kinh doanh",
        "Vì tổng các hạn mức bộ phận luôn phải bằng đúng hạn mức của tập đoàn",
        "Vì hạn mức tập đoàn chỉ rà soát mỗi năm một lần"
      ],
      "correct": 0,
      "explanation": "Khẩu vị rủi ro ở cấp cao là một tuyên bố định hướng; nó chỉ có tác dụng khi biến thành con số mà người giao dịch nhìn thấy trên màn hình. Không diễn giải xuống thì mỗi người tự hiểu một kiểu, và tổng rủi ro thật không ai biết."
    }
    ],
    keyTakeaways: [
      "Ba tuyến phòng thủ: tuyến 1 (kinh doanh) tự kiểm soát, tuyến 2 (Rủi ro/Tuân thủ) giám sát độc lập, tuyến 3 (Kiểm toán nội bộ) đánh giá cả hai tuyến trên",
      "Khẩu vị rủi ro là tuyên bố cấp hội đồng quản trị; hạn mức rủi ro là con số cụ thể hiện thực hoá khẩu vị đó xuống từng bàn giao dịch",
      "Độc lập báo cáo giữa tuyến 1 và tuyến 2 là điều kiện tiên quyết, không phải thủ tục hình thức",
      "Gộp vai trò tạo giao dịch và vai trò kiểm soát/tất toán vào một người là lỗi cấu trúc kinh điển dẫn tới thảm hoạ (Barings, 1995)",
    ],
    practicePrompt: {
      question: "Một công ty chứng khoán để cùng một nhân viên vừa thực hiện lệnh mua/bán vừa tự đối chiếu sổ sách cuối ngày cho chính mình. Rủi ro lớn nhất ở đây là gì?",
      options: [
        "Nhân viên đó làm việc quá tải, năng suất giảm",
        "Không còn tuyến kiểm soát độc lập nào phát hiện",
        "Công ty phải trả lương cao hơn cho vị trí kiêm nhiệm",
        "Khách hàng sẽ khiếu nại vì xử lý lệnh chậm",
      ],
      correct: 1,
      explanation:
        "Đây chính xác là lỗi cấu trúc của vụ Barings: gộp tuyến 1 và chức năng kiểm soát vào một người xoá bỏ cơ chế phát hiện sớm. Vấn đề không phải hiệu suất hay chi phí, mà là không còn ai độc lập kiểm tra.",
    },
    summary: {
      keyIdea: "ERM không phải một phòng ban, mà là một cấu trúc trách nhiệm ba tầng bảo đảm rủi ro luôn có người độc lập giám sát",
      commonMistake: "Coi quản trị rủi ro là việc riêng của phòng Rủi ro, trong khi tuyến 1 (người tạo ra rủi ro) mới là tuyến kiểm soát đầu tiên và quan trọng nhất",
      action: "Với bất kỳ quy trình nào bạn phụ trách, tự hỏi: ai là tuyến 1, ai là tuyến 2 độc lập, và họ có thực sự tách biệt về mặt báo cáo không.",
    },
    application: {
      title: "Vẽ ba tuyến cho một quy trình bạn biết",
      message: "Chọn một quy trình bạn đang tham gia - duyệt chi, phê duyệt tín dụng, đặt lệnh - và ghi tên người thật vào từng tuyến. Kiểm điều kiện cứng: tuyến 2 có báo cáo lên một người khác với người tuyến 1 báo cáo không. Nếu cùng một sếp, tuyến 2 chỉ độc lập trên sơ đồ tổ chức.",
      secondary: "Chỗ hay hỏng nhất là một người vừa tạo giao dịch vừa xác nhận nó. Tìm xem trong quy trình của bạn có ai đang ở cả hai chỗ không.",
    },
    sections: [
      {
        type: "lead",
        text: "Hầu hết các vụ sụp đổ tài chính lớn không bắt đầu bằng một quyết định điên rồ duy nhất, mà bằng hàng loạt quyết định nhỏ không ai có trách nhiệm ngăn lại. ERM tồn tại để trả lời câu hỏi: khi rủi ro vượt giới hạn, ai là người bắt buộc phải lên tiếng.",
      },
      {
        type: "heading",
        text: "Ba tuyến phòng thủ",
      },
      {
        type: "conceptTable",
        title: "Ai chịu trách nhiệm gì",
        subtitle: "Mỗi tuyến trả lời một câu hỏi khác nhau về cùng một rủi ro",
        concepts: [
          { vi: "Tuyến 1", en: "First line", def: "Bộ phận kinh doanh trực tiếp tạo ra rủi ro (trading, tín dụng, vận hành) - chịu trách nhiệm quản lý rủi ro hằng ngày trong hạn mức được giao." },
          { vi: "Tuyến 2", en: "Second line", def: "Phòng Quản trị Rủi ro và Tuân thủ - giám sát độc lập, thiết lập chính sách, kiểm tra tuyến 1 có tuân thủ hạn mức không." },
          { vi: "Tuyến 3", en: "Third line", def: "Kiểm toán nội bộ - đánh giá xem cả tuyến 1 và tuyến 2 có thực sự hoạt động đúng thiết kế không, báo cáo thẳng lên hội đồng quản trị." },
        ],
      },
      {
        type: "callout",
        label: "Điểm dễ nhầm",
        text: "Khẩu vị rủi ro (risk appetite) và hạn mức rủi ro (risk limit) không phải một. Khẩu vị là tuyên bố định hướng cấp cao ('không chấp nhận lỗ quá 5% vốn trong một năm'). Hạn mức là con số cụ thể áp cho từng bàn giao dịch để hiện thực hoá tuyên bố đó - VaR limit của bàn FX, hạn mức tín dụng theo đối tác, stop-loss theo ngày.",
      },
      {
        type: "paragraph",
        text: "Khi hai tuyến đầu gộp lại thành một người - như trường hợp Nick Leeson tại Barings - hệ thống mất khả năng tự phát hiện lỗi trước khi nó phá sản cả ngân hàng. Đây không phải rủi ro thị trường, mà là rủi ro cấu trúc quản trị: rủi ro xảy ra ngay cả khi thị trường hoàn toàn bình thường.",
      },
      {
        type: "closing",
        lines: [
          "ERM không phải giấy tờ tuân thủ, mà là câu trả lời cho câu hỏi ai bắt buộc phải nói không.",
          "Bài sau: vì sao ngay cả khi cấu trúc quản trị đúng, văn hoá rủi ro sai vẫn có thể khiến toàn bộ hệ thống im lặng.",
        ],
      },
    ],
  },
  {
    id: 1528,
    slug: "van-hoa-rui-ro-va-dao-duc-nghe-quan-tri-rui-ro",
    title: "FRM Foundations, Bài 2: Văn hoá rủi ro - vì sao cấu trúc đúng vẫn có thể thất bại",
    subtitle: "Sai lệch động lực, thiên kiến hành vi và Bộ Quy tắc Đạo đức GARP",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "professional",
    whyItMatters:
      "Một tổ chức có thể có đủ ba tuyến phòng thủ trên giấy mà vẫn sụp đổ, nếu văn hoá thực tế thưởng cho việc im lặng và trừng phạt người báo cáo rủi ro xấu. Văn hoá rủi ro là lớp vô hình quyết định liệu cấu trúc quản trị có thực sự vận hành hay chỉ tồn tại trên sơ đồ tổ chức.",
    openingQuestion: "Điều gì thường khiến nhân viên tuyến 2 (Rủi ro/Tuân thủ) ngần ngại báo cáo một rủi ro nghiêm trọng, dù họ nhìn thấy nó rõ ràng?",
    openingOptions: [
      "Vì họ không được đào tạo đủ về kỹ thuật đo lường rủi ro",
      "Vì thưởng, đánh giá hiệu suất hoặc sự nghiệp của họ gắn với kết quả kinh doanh của chính bộ phận họ đang giám sát",
      "Vì hệ thống công nghệ thông tin quá chậm để tổng hợp báo cáo",
      "Vì họ không có quyền truy cập vào dữ liệu giao dịch",
    ],
    correctOption: 1,
    explanation:
      "Đây là sai lệch động lực (incentive misalignment) - nguyên nhân văn hoá phổ biến nhất khiến cảnh báo rủi ro bị bỏ qua. Nếu tiền thưởng, đánh giá hoặc cơ hội thăng tiến của người giám sát phụ thuộc vào việc làm hài lòng bộ phận họ giám sát, động lực tự nhiên là im lặng thay vì đối đầu.",
    diagram: [
      { label: "Thưởng/đánh giá gắn với kết quả kinh doanh ngắn hạn", arrow: true },
      { label: "Người phát hiện rủi ro ngại báo cáo vì sợ ảnh hưởng quan hệ/sự nghiệp", arrow: true },
      { label: "Rủi ro tích luỹ âm thầm, không ai bị trừng phạt vì đã im lặng", arrow: true },
      { label: "Vỡ ra thành khủng hoảng khi đã quá muộn để sửa rẻ" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Wells Fargo, 2016",
      description:
        "Nhân viên chi nhánh bị áp chỉ tiêu bán chéo sản phẩm cực cao, gắn trực tiếp với lương và nguy cơ bị sa thải. Hàng nghìn nhân viên mở tới 3,5 triệu tài khoản giả mạo mà khách hàng không hề yêu cầu để đạt chỉ tiêu. Đây không phải lỗi kỹ thuật đo lường rủi ro - hệ thống kiểm soát đã ghi nhận số lượng khiếu nại bất thường từ năm 2011, nhưng văn hoá công ty thưởng cho doanh số và trừng phạt người không đạt chỉ tiêu mạnh hơn nhiều so với cơ chế báo cáo sai phạm.",
    },
    quiz: [
      {
        question: "Văn hoá rủi ro lành mạnh khác gì so với việc chỉ có đầy đủ chính sách rủi ro bằng văn bản?",
        options: [
          "Không có gì khác biệt, có chính sách bằng văn bản là đủ",
          "Nhân viên dám báo cáo và được lắng nghe, không chỉ có quy định trên giấy",
          "Chỉ ngân hàng nhỏ mới cần, ngân hàng lớn đã đủ hệ thống",
          "Văn hoá rủi ro là trách nhiệm duy nhất của phòng nhân sự",
        ],
        correct: 1,
        explanation:
          "Chính sách bằng văn bản là điều kiện cần nhưng không đủ. Văn hoá rủi ro thể hiện ở hành vi thực tế: liệu người báo cáo rủi ro xấu có bị trả đũa không, liệu lãnh đạo có phản ứng nghiêm túc khi nhận cảnh báo hay chỉ coi đó là cản trở kinh doanh.",
      },
      {
        question: "Trong vụ Wells Fargo, tại sao hệ thống kiểm soát nội bộ đã ghi nhận khiếu nại từ sớm nhưng vấn đề vẫn kéo dài nhiều năm?",
        options: [
          "Vì toàn bộ hệ thống công nghệ ghi nhận khiếu nại của ngân hàng bị lỗi kỹ thuật liên tục trong suốt nhiều năm nên không ai đọc được dữ liệu",
          "Vì áp lực chỉ tiêu và lương thưởng mạnh hơn động lực báo cáo, khiến cảnh báo sớm không dẫn tới hành động sửa sai",
          "Vì luật pháp lúc đó không yêu cầu ngân hàng phải báo cáo khiếu nại khách hàng",
          "Vì khách hàng không đủ bằng chứng để khiếu nại chính thức",
        ],
        correct: 1,
        explanation:
          "Đây là ví dụ kinh điển về việc có dữ liệu cảnh báo nhưng văn hoá tổ chức không tạo ra hành động tương ứng - động lực tài chính ngắn hạn (đạt chỉ tiêu bán chéo) mạnh hơn động lực tuân thủ dài hạn.",
      },
      {
        question: "Vì sao gắn thưởng của người kiểm soát rủi ro với lợi nhuận của bộ phận họ giám sát là một thiết kế nguy hiểm?",
        options: [
          "Vì nó làm tăng chi phí lương của ngân hàng",
          "Vì nó tạo động lực để người kiểm soát bỏ qua rủi ro nhằm không làm giảm lợi nhuận mà chính họ cũng được hưởng lợi",
          "Vì luật kế toán không cho phép thiết kế lương như vậy",
          "Vì nó khiến báo cáo tài chính khó kiểm toán hơn",
        ],
        correct: 1,
        explanation:
          "Khi thu nhập của người giám sát tăng theo lợi nhuận của bên họ giám sát, họ có động lực tài chính trực tiếp để không cản trở hoạt động sinh lời - kể cả khi hoạt động đó đang tích luỹ rủi ro quá mức.",
      },
      {
        question: "\"Speaking up\" (dám lên tiếng) trong văn hoá rủi ro có nghĩa là gì trên thực tế?",
        options: [
          "Nhân viên cấp thấp không có quyền góp ý về rủi ro, chỉ lãnh đạo cấp cao mới được phép nêu vấn đề trong các cuộc họp chính thức",
          "Bất kỳ nhân viên nào phát hiện rủi ro bất thường đều được khuyến khích báo cáo mà không sợ trả đũa, và báo cáo đó thực sự được xem xét",
          "Chỉ áp dụng cho phòng Kiểm toán nội bộ khi làm báo cáo cuối năm",
          "Là một khẩu hiệu truyền thông nội bộ không có cơ chế thực thi đi kèm",
        ],
        correct: 1,
        explanation:
          "Văn hoá speaking-up hiệu quả cần hai điều kiện: an toàn tâm lý (không bị trả đũa khi báo cáo) và cơ chế thực thi thật (báo cáo dẫn tới hành động, không chỉ được ghi nhận rồi bỏ qua).",
      },
    
    {
      "question": "Dấu hiệu nào cho thấy văn hóa rủi ro của một tổ chức đang có vấn đề dù chính sách đầy đủ?",
      "options": [
        "Người nêu cảnh báo bị coi là cản trở công việc kinh doanh",
        "Số lượng chính sách rủi ro tăng lên qua mỗi năm rà soát",
        "Các cuộc họp rủi ro được tổ chức định kỳ nhưng không có biên bản",
        "Bộ phận rủi ro có ít nhân sự hơn so với bộ phận kinh doanh"
      ],
      "correct": 0,
      "explanation": "Chính sách đo được nên dễ có đủ. Thứ không đo được là điều gì xảy ra với người đầu tiên nói rằng con số này không ổn. Nếu người đó bị gạt sang bên, thì lần sau không ai nói nữa - và mọi chính sách còn lại chỉ là giấy."
    }
    ],
    keyTakeaways: [
      "Văn hoá rủi ro là lớp vô hình quyết định liệu cấu trúc quản trị đúng trên giấy có thực sự vận hành hay không",
      "Sai lệch động lực (thưởng gắn với kết quả ngắn hạn của bên được giám sát) là nguyên nhân văn hoá phổ biến nhất khiến cảnh báo bị bỏ qua",
      "Có dữ liệu cảnh báo sớm không đủ - cần văn hoá khiến dữ liệu đó dẫn tới hành động (Wells Fargo có khiếu nại từ 2011 nhưng vẫn kéo dài tới 2016)",
      "Văn hoá speaking-up thật cần cả an toàn tâm lý lẫn cơ chế thực thi, không chỉ là khẩu hiệu",
    ],
    practicePrompt: {
      question: "Một chuyên viên rủi ro phát hiện một bàn giao dịch đang vượt hạn mức VaR nhưng bàn đó đang tạo ra 40% lợi nhuận quý của cả phòng. Điều gì cho thấy văn hoá rủi ro của tổ chức đang lành mạnh?",
      options: [
        "Chuyên viên đó im lặng vì sợ ảnh hưởng tới thưởng cuối năm của cả phòng",
        "Cảnh báo được báo cáo, được xem xét nghiêm túc bất kể mức lợi nhuận đang tạo ra, và không ai bị trừng phạt vì đã báo cáo",
        "Lãnh đạo yêu cầu chuyên viên đó điều chỉnh lại mô hình VaR cho tới khi không còn vượt hạn mức",
        "Vấn đề chỉ được đưa ra thảo luận sau khi bàn đó đã lỗ lớn",
      ],
      correct: 1,
      explanation:
        "Văn hoá lành mạnh thể hiện ở việc cảnh báo được xử lý dựa trên bản chất rủi ro, không phải dựa trên việc nó đang sinh lời hay không. Ba phương án còn lại đều là dấu hiệu văn hoá rủi ro yếu - từ im lặng, thao túng mô hình, tới chỉ hành động sau khi đã muộn.",
    },
    summary: {
      keyIdea: "Cấu trúc quản trị đúng trên giấy chỉ chạy được nếu người thấy vấn đề nói ra được mà không mất gì. Đó là thứ văn hoá quyết định, và không sơ đồ tổ chức nào thay thế được.",
      commonMistake: "Coi văn hoá rủi ro là chuyện khẩu hiệu và đào tạo. Nó là chuyện động lực: thưởng gắn với kết quả ngắn hạn sẽ thắng mọi quy định bằng lời.",
    },
    application: {
      title: "Kiểm tra nhanh một tổ chức",
      message: "Hỏi lần gần nhất bộ phận rủi ro chặn được một thương vụ lớn là khi nào. Không có câu trả lời nào trong nhiều năm không có nghĩa là không có gì đáng chặn.",
      secondary: "Và hỏi tiếp: người nêu vấn đề lần đó bây giờ còn làm ở đó không.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai tổ chức có thể có cùng một khung ERM trên giấy, cùng ba tuyến phòng thủ, nhưng một nơi rủi ro được phát hiện và xử lý sớm, nơi kia rủi ro âm thầm tích luỹ tới lúc vỡ. Khác biệt nằm ở văn hoá, không nằm ở cấu trúc.",
      },
      {
        type: "heading",
        text: "Sai lệch động lực: gốc rễ phổ biến nhất",
      },
      {
        type: "paragraph",
        text: "Khi thu nhập, đánh giá hiệu suất hoặc cơ hội thăng tiến của một người gắn chặt với kết quả ngắn hạn của bộ phận họ đang giám sát hoặc phục vụ, họ có động lực tài chính trực tiếp để không làm phiền dòng doanh thu đó - ngay cả khi phát hiện rủi ro thật.",
      },
      {
        type: "comparison",
        left: { label: "Văn hoá rủi ro yếu", text: "Người báo cáo rủi ro bị coi là cản trở kinh doanh; thưởng gắn với lợi nhuận ngắn hạn của bên được giám sát; cảnh báo bị bỏ qua nếu doanh thu vẫn tốt." },
        right: { label: "Văn hoá rủi ro lành mạnh", text: "Báo cáo rủi ro được xử lý dựa trên bản chất, không dựa trên mức lợi nhuận hiện tại; người giám sát có thù lao độc lập với kết quả bên họ giám sát." },
      },
      {
        type: "callout",
        label: "Tinh thần của GARP Code of Conduct",
        text: "Bộ Quy tắc Đạo đức của GARP (bắt buộc với người giữ chứng chỉ FRM) đặt trọng tâm vào tính chính trực, khách quan và trách nhiệm nghề nghiệp - không chỉ tuân thủ luật mà còn chủ động báo cáo khi thấy hành vi hoặc quyết định làm tăng rủi ro vượt mức chấp nhận, kể cả khi điều đó không thoải mái về mặt chính trị nội bộ.",
      },
      {
        type: "closing",
        lines: [
          "Cấu trúc quản trị đúng là điều kiện cần; văn hoá khiến con người thực sự dùng cấu trúc đó là điều kiện đủ.",
          "Bài sau: nhìn lại những thảm hoạ tài chính kinh điển để thấy mẫu hình chung lặp lại qua nhiều thập kỷ.",
        ],
      },
    ],
  },
  {
    id: 1529,
    slug: "nhung-tham-hoa-tai-chinh-kinh-dien",
    title: "FRM Foundations, Bài 3: Những thảm hoạ tài chính kinh điển và mẫu hình chung",
    subtitle: "LTCM, khủng hoảng 2008 và bài học lặp lại: đòn bẩy, tương quan bị đánh giá sai, và rủi ro thanh khoản đến cùng lúc",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "GARP đưa các case study này vào đề thi không phải để nhớ ngày tháng, mà vì mẫu hình thất bại lặp lại gần như y hệt qua nhiều thập kỷ: đòn bẩy cao, giả định tương quan sai trong lúc bình yên, và rủi ro thanh khoản ập tới đúng lúc cần vốn nhất. Nhận ra mẫu hình này sớm là kỹ năng cốt lõi của một risk manager.",
    openingQuestion: "Quỹ Long-Term Capital Management (LTCM) sụp đổ năm 1998 chủ yếu vì lý do gì?",
    openingOptions: [
      "Mô hình định giá của quỹ tính toán sai công thức toán học cơ bản",
      "Đòn bẩy cực cao cộng giả định thị trường không tương quan",
      "Quỹ bị gian lận kế toán nội bộ",
      "Lãi suất Fed tăng đột ngột khiến toàn bộ vị thế trái phiếu mất giá",
    ],
    correctOption: 1,
    explanation:
      "LTCM dùng đòn bẩy hơn 25 lần vốn, dựa trên mô hình cho rằng các cặp giao dịch (arbitrage) gần như không tương quan nên rủi ro tổng thể thấp. Khi Nga vỡ nợ trái phiếu năm 1998, các thị trường vốn hoàn toàn khác nhau bỗng dưng di chuyển cùng chiều (tương quan tiến về 1) đúng lúc quỹ cần thanh khoản nhất - hiện tượng gọi là \"tương quan hội tụ trong khủng hoảng\".",
    diagram: [
      { label: "Đòn bẩy cao nhân rủi ro lên nhiều lần", arrow: true },
      { label: "Mô hình giả định tương quan thấp trong điều kiện bình thường", arrow: true },
      { label: "Cú sốc bất ngờ khiến mọi tài sản tương quan cùng lúc", arrow: true },
      { label: "Cần bán để trả margin call đúng lúc thanh khoản cạn kiệt nhất" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Khủng hoảng tài chính toàn cầu, 2007-2008",
      description:
        "Chứng khoán hoá nợ dưới chuẩn (subprime MBS/CDO) được xếp hạng AAA dựa trên giả định giá nhà ở các bang khác nhau không tương quan. Khi giá nhà giảm đồng loạt trên toàn quốc, giả định đó sụp đổ cùng lúc với toàn bộ hệ thống ngân hàng đầu tư sử dụng đòn bẩy 30 lần vốn trở lên. Rủi ro tín dụng, rủi ro thị trường và rủi ro thanh khoản xảy ra đồng thời - đúng mẫu hình của LTCM một thập kỷ trước, chỉ ở quy mô toàn hệ thống.",
    },
    quiz: [
      {
        question: "\"Tương quan hội tụ trong khủng hoảng\" (correlation breakdown/convergence) nghĩa là gì?",
        options: [
          "Tương quan giữa các tài sản luôn ổn định bất kể điều kiện thị trường đang bình thường hay đang trải qua khủng hoảng nghiêm trọng nhất trong lịch sử tài chính hiện đại",
          "Trong điều kiện bình thường tương quan thấp, nhưng khủng hoảng khiến các tài sản đột ngột di chuyển cùng chiều, làm mất tác dụng đa dạng hoá",
          "Tương quan giữa cổ phiếu và trái phiếu luôn bằng 1 trong mọi giai đoạn",
          "Đây là hiện tượng chỉ xảy ra ở thị trường mới nổi, không xảy ra ở Mỹ hay châu Âu",
        ],
        correct: 1,
        explanation:
          "Đây là lý do vì sao mô hình rủi ro dựa trên dữ liệu lịch sử \"bình thường\" luôn đánh giá thấp rủi ro đuôi: chính trong khủng hoảng - lúc cần đa dạng hoá phát huy tác dụng nhất - tương quan giữa các tài sản lại tăng vọt.",
      },
      {
        question: "Đòn bẩy cao làm trầm trọng thêm khủng hoảng như thế nào?",
        options: [
          "Đòn bẩy không liên quan tới mức độ nghiêm trọng của khủng hoảng, chỉ ảnh hưởng tới lợi nhuận khi thị trường tăng",
          "Đòn bẩy khuếch đại cả lãi lẫn lỗ, và khi thua lỗ chạm ngưỡng margin call, tổ chức buộc phải bán tài sản ngay lập tức bất kể giá, tạo áp lực bán dây chuyền",
          "Đòn bẩy chỉ là vấn đề kế toán, không ảnh hưởng tới dòng tiền thực",
          "Đòn bẩy giúp giảm rủi ro vì phân tán vốn ra nhiều vị thế hơn",
        ],
        correct: 1,
        explanation:
          "Với đòn bẩy 25 lần, một khoản lỗ 4% giá trị tài sản đã xoá sạch vốn tự có. Khi lỗ chạm ngưỡng, bên cho vay yêu cầu ký quỹ bổ sung (margin call) - buộc phải bán tài sản ngay để có tiền mặt, thường đúng lúc giá đang giảm mạnh nhất, khiến giá giảm sâu hơn nữa.",
      },
      {
        question: "Điểm chung giữa LTCM (1998) và khủng hoảng tài chính 2008 là gì?",
        options: [
          "Cả hai đều do cùng một nhóm lãnh đạo ngân hàng cố tình gian lận sổ sách kế toán để che giấu khoản lỗ trước cơ quan quản lý và nhà đầu tư",
          "Cả hai kết hợp đòn bẩy cao, mô hình đánh giá thấp tương quan trong khủng hoảng, và rủi ro thanh khoản ập tới cùng lúc",
          "Cả hai đều chỉ ảnh hưởng tới một quỹ đầu tư đơn lẻ, không lan ra hệ thống",
          "Cả hai đều xảy ra vì lãi suất giảm quá thấp trong thời gian dài",
        ],
        correct: 1,
        explanation:
          "Mẫu hình lặp lại: đòn bẩy cao nhân rủi ro, mô hình dựa trên dữ liệu \"bình thường\" đánh giá thấp khả năng các tài sản tương quan cùng lúc trong khủng hoảng, và khi cú sốc xảy ra, nhu cầu thanh khoản (bán tài sản, trả margin call) ập tới đồng loạt trên toàn hệ thống.",
      },
      {
        question: "Vì sao chứng khoán hoá nợ dưới chuẩn (subprime MBS) trước 2008 được xếp hạng tín nhiệm cao dù rủi ro thực tế lớn?",
        options: [
          "Vì toàn bộ các cơ quan xếp hạng tín nhiệm lớn trên thế giới đều cố tình bỏ qua mọi phân tích rủi ro tín dụng để đổi lấy khoản phí cao hơn từ ngân hàng phát hành trái phiếu",
          "Mô hình xếp hạng giả định giá nhà các khu vực không tương quan nhiều, nên gộp nhiều khoản vay được coi là đa dạng hoá - sai khi giá nhà giảm đồng loạt toàn quốc",
          "Vì lãi suất cho vay dưới chuẩn thấp hơn lãi suất cho vay chuẩn",
          "Vì chính phủ bảo lãnh toàn bộ các khoản vay dưới chuẩn",
        ],
        correct: 1,
        explanation:
          "Giống hệt lỗi mô hình của LTCM: giả định tương quan thấp trong điều kiện lịch sử \"bình thường\" (giá nhà ít khi giảm đồng loạt toàn quốc trước đó), nhưng khi cú sốc hệ thống xảy ra, giả định đó sụp đổ và toàn bộ danh mục tưởng là đa dạng hoá lại mất giá cùng lúc.",
      },
    ],
    keyTakeaways: [
      "Mẫu hình lặp lại qua nhiều thảm hoạ: đòn bẩy cao + mô hình đánh giá thấp tương quan trong khủng hoảng + rủi ro thanh khoản ập tới cùng lúc",
      "Tương quan hội tụ trong khủng hoảng: tài sản tưởng không liên quan lại di chuyển cùng chiều đúng lúc cần đa dạng hoá phát huy tác dụng nhất",
      "Đòn bẩy khuếch đại cả lãi lẫn lỗ, và margin call buộc bán tài sản đúng lúc giá đang giảm mạnh nhất, tạo vòng xoáy bán tháo",
      "LTCM (1998) và khủng hoảng 2008 dùng cùng một mẫu hình thất bại, chỉ khác quy mô - từ một quỹ đơn lẻ tới toàn hệ thống ngân hàng",
    ],
    practicePrompt: {
      question: "Một quỹ đầu tư báo cáo danh mục \"đa dạng hoá tốt\" dựa trên tương quan lịch sử thấp giữa các tài sản trong 5 năm thị trường ổn định gần nhất. Rủi ro nào bạn nên đặt câu hỏi ngay?",
      options: [
        "Rủi ro tỷ giá, vì quỹ có thể đầu tư ra nước ngoài",
        "Tương quan có hội tụ khi thị trường khủng hoảng không",
        "Rủi ro thuế, vì mỗi tài sản có thể chịu thuế suất khác nhau",
        "Rủi ro về phí quản lý quỹ quá cao",
      ],
      correct: 1,
      explanation:
        "Tương quan đo trong giai đoạn bình thường gần như luôn thấp hơn tương quan thực sự khi khủng hoảng xảy ra. Đây chính là lỗi mô hình khiến LTCM và các CDO trước 2008 đánh giá sai mức độ đa dạng hoá thực tế của danh mục.",
    },
    summary: {
      keyIdea: "Các thảm hoạ khác nhau về quy mô và giống nhau về mẫu hình: đòn bẩy cao, mô hình đánh giá thấp tương quan, và thanh khoản biến mất đúng lúc cần bán.",
      commonMistake: "Đọc từng vụ như một câu chuyện riêng. Điều đáng học không phải chi tiết của LTCM hay 2008 mà là ba yếu tố lặp lại ở cả hai.",
    },
    application: {
      title: "Áp mẫu hình lên danh mục của bạn",
      message: "Với bất kỳ vị thế nào, hỏi ba câu: đòn bẩy bao nhiêu, các tài sản có thật sự độc lập không, và bán được trong bao lâu nếu phải bán gấp.",
      secondary: "Ba câu đó là toàn bộ mẫu hình, viết lại ở dạng dùng được.",
    },
    sections: [
      {
        type: "lead",
        text: "GARP không đưa các case study lịch sử vào đề thi để kiểm tra trí nhớ ngày tháng. Mục đích là để người học nhận ra: dù công cụ tài chính thay đổi qua từng thập kỷ, mẫu hình dẫn tới sụp đổ gần như không đổi.",
      },
      {
        type: "heading",
        text: "Ba thành phần lặp lại trong mọi thảm hoạ lớn",
      },
      {
        type: "conceptTable",
        title: "Mẫu hình chung",
        subtitle: "Xuất hiện ở cả LTCM 1998 lẫn khủng hoảng 2008, chỉ khác quy mô",
        concepts: [
          { vi: "Đòn bẩy cao", en: "Excess leverage", def: "Khuếch đại cả lãi và lỗ; một cú sốc nhỏ tương đối cũng đủ xoá sạch vốn tự có và kích hoạt margin call." },
          { vi: "Tương quan bị đánh giá sai", en: "Correlation breakdown", def: "Mô hình dựa trên dữ liệu giai đoạn bình thường cho tương quan thấp, nhưng khủng hoảng khiến các tài sản đột ngột di chuyển cùng chiều." },
          { vi: "Rủi ro thanh khoản đồng thời", en: "Liquidity spiral", def: "Khi cần bán để trả nợ/margin call, mọi người cùng bán một lúc, khiến giá giảm sâu hơn và thanh khoản cạn kiệt đúng lúc cần nhất." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao mô hình \"đúng về mặt toán học\" vẫn sai",
        text: "Mô hình của LTCM không có lỗi tính toán - các công thức đúng theo giả định đầu vào. Vấn đề là giả định đầu vào (tương quan thấp, ước lượng từ dữ liệu lịch sử bình thường) không còn đúng trong điều kiện cực đoan. Đây là lý do risk manager luôn phải hỏi: mô hình này giả định điều gì, và giả định đó có còn đúng khi mọi thứ xấu đi cùng lúc không.",
      },
      {
        type: "closing",
        lines: [
          "Ba câu hỏi luôn phải đặt ra: đòn bẩy ở đâu, tương quan giả định có giữ được khi khủng hoảng không, và ai sẽ cần bán cùng lúc với mình.",
          "Chặng Foundations kết thúc ở đây; các chặng Operational Resilience và Liquidity Risk tiếp theo đi sâu vào từng loại rủi ro cụ thể hơn.",
        ],
      },
    ],
  },

  // ═══════════════ OPERATIONAL RESILIENCE AND RISK MANAGEMENT ═══════════════
  {
    id: 1530,
    slug: "do-luong-rui-ro-van-hanh-lda",
    title: "FRM Operational, Bài 1: Đo lường rủi ro vận hành bằng phương pháp phân phối tổn thất (LDA)",
    subtitle: "Tần suất × Mức độ nghiêm trọng: cách định lượng một loại rủi ro vốn bị coi là \"không đo được\"",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⚙️",
    track: "professional",
    whyItMatters:
      "Rủi ro vận hành - lỗi con người, hệ thống, quy trình, sự kiện bên ngoài - từng bị coi là thứ không thể định lượng, chỉ có thể liệt kê. Loss Distribution Approach (LDA) là cách Basel chấp nhận để biến nó thành một con số vốn dự phòng cụ thể, và là nền tảng của mọi mô hình rủi ro vận hành hiện đại.",
    openingQuestion: "Phương pháp Phân phối Tổn thất (Loss Distribution Approach) mô hình hoá tổn thất vận hành bằng cách kết hợp hai phân phối nào?",
    openingOptions: [
      "Phân phối lợi suất cổ phiếu và phân phối lãi suất",
      "Phân phối tần suất (số lần xảy ra sự cố) và phân phối mức độ nghiêm trọng (thiệt hại mỗi lần)",
      "Phân phối chuẩn và phân phối nhị thức, luôn cố định không đổi",
      "Phân phối tỷ giá hối đoái và phân phối giá hàng hoá",
    ],
    correctOption: 1,
    explanation:
      "LDA tách rủi ro vận hành thành hai câu hỏi độc lập: sự cố loại này xảy ra bao nhiêu lần trong một năm (phân phối tần suất, thường dùng Poisson), và mỗi lần xảy ra thì thiệt hại bao nhiêu (phân phối mức độ nghiêm trọng, thường có đuôi dày như Lognormal). Kết hợp hai phân phối này qua mô phỏng Monte Carlo cho ra phân phối tổn thất tổng, từ đó tính VaR vận hành ở mức tin cậy cao (thường 99,9%).",
    diagram: [
      { label: "Thu thập dữ liệu tổn thất lịch sử theo loại sự kiện", arrow: true },
      { label: "Ước lượng phân phối tần suất (bao nhiêu lần/năm)", arrow: true },
      { label: "Ước lượng phân phối mức độ nghiêm trọng (thiệt hại mỗi lần)", arrow: true },
      { label: "Mô phỏng Monte Carlo kết hợp hai phân phối → VaR vận hành" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Knight Capital, 2012",
      description:
        "Một lỗi triển khai phần mềm giao dịch tự động khiến hệ thống gửi hàng triệu lệnh sai trong 45 phút, gây thiệt hại 440 triệu USD - gần như xoá sổ vốn công ty chỉ trong chưa đầy một giờ. Đây là ví dụ kinh điển của rủi ro vận hành loại \"tần suất thấp, mức độ nghiêm trọng cực cao\" - đúng loại sự kiện mà phần đuôi của phân phối mức độ nghiêm trọng trong LDA phải nắm bắt được, chứ không thể bỏ qua vì hiếm khi xảy ra.",
    },
    quiz: [
      {
        question: "Vì sao phân phối mức độ nghiêm trọng (severity) trong LDA thường được mô hình bằng phân phối có đuôi dày (như Lognormal) thay vì phân phối chuẩn?",
        options: [
          "Vì phân phối chuẩn không cho phép tồn tại giá trị âm nên hoàn toàn không thể dùng được cho bất kỳ loại dữ liệu tài chính nào trong thực tế vận hành ngân hàng",
          "Vì đa số sự cố nhỏ nhưng thỉnh thoảng có sự cố cực lớn (như Knight Capital) - đuôi dày mô tả đúng khả năng xảy ra sự kiện cực đoan này",
          "Vì quy định Basel bắt buộc dùng Lognormal cho mọi loại rủi ro",
          "Vì phân phối chuẩn chỉ áp dụng được cho rủi ro thị trường, không áp dụng được cho bất kỳ loại rủi ro nào khác",
        ],
        correct: 1,
        explanation:
          "Dữ liệu tổn thất vận hành thực tế cho thấy phần lớn sự cố có thiệt hại nhỏ (lỗi nhập liệu, gián đoạn ngắn), nhưng một số ít sự cố hiếm gặp gây thiệt hại cực lớn. Phân phối chuẩn đánh giá thấp xác suất của những sự kiện đuôi này; phân phối đuôi dày mô tả đúng hơn.",
      },
      {
        question: "Trong LDA, \"tần suất\" (frequency) và \"mức độ nghiêm trọng\" (severity) khác nhau như thế nào?",
        options: [
          "Tần suất và mức độ nghiêm trọng thực chất là cùng một khái niệm toán học, chỉ khác nhau ở cách gọi tên giữa các ngân hàng và cơ quan quản lý khác nhau",
          "Tần suất trả lời \"bao nhiêu lần một năm\"; mức độ nghiêm trọng trả lời \"mỗi lần thiệt hại bao nhiêu\" - hai câu hỏi độc lập, mô hình riêng biệt",
          "Tần suất chỉ áp dụng cho gian lận nội bộ, mức độ nghiêm trọng chỉ áp dụng cho lỗi hệ thống",
          "Mức độ nghiêm trọng luôn tỷ lệ thuận trực tiếp với tần suất xảy ra",
        ],
        correct: 1,
        explanation:
          "Đây là điểm cốt lõi của LDA: hai phân phối được ước lượng độc lập từ dữ liệu, sau đó kết hợp lại bằng mô phỏng để ra phân phối tổn thất tổng - thay vì cố gắng mô hình trực tiếp tổng thiệt hại hằng năm, vốn khó ước lượng chính xác hơn nhiều.",
      },
      {
        question: "Sự cố Knight Capital minh hoạ loại rủi ro vận hành nào mà LDA cần đặc biệt chú ý?",
        options: [
          "Loại tần suất cao, mức độ nghiêm trọng thấp (sự cố xảy ra thường xuyên nhưng thiệt hại nhỏ mỗi lần)",
          "Loại tần suất thấp, mức độ nghiêm trọng cực cao - hiếm khi xảy ra nhưng có thể gây thiệt hại đủ lớn để đe doạ sự tồn tại của tổ chức",
          "Loại rủi ro chỉ liên quan tới gian lận từ bên ngoài, không liên quan tới nội bộ",
          "Loại rủi ro không thể xảy ra ở các công ty sử dụng giao dịch tự động",
        ],
        correct: 1,
        explanation:
          "Knight Capital chỉ mất 45 phút để thiệt hại 440 triệu USD từ một lỗi triển khai phần mềm - loại sự kiện hiếm nhưng cực đoan này chính là phần đuôi mà mô hình LDA phải nắm bắt được, vì nó quyết định phần lớn con số vốn dự phòng vận hành cần thiết.",
      },
      {
        question: "Vì sao dữ liệu tổn thất nội bộ của một ngân hàng thường không đủ để ước lượng chính xác phần đuôi của phân phối mức độ nghiêm trọng?",
        options: [
          "Vì quy định lưu trữ hồ sơ của ngân hàng trung ương không cho phép ngân hàng thương mại lưu dữ liệu tổn thất quá 1 năm trước khi buộc phải xoá vĩnh viễn",
          "Vì sự kiện đuôi hiếm khi xảy ra với một ngân hàng đơn lẻ, nên dữ liệu nội bộ thiếu quan sát ở vùng đuôi - cần bổ sung dữ liệu ngành và kịch bản",
          "Vì dữ liệu tổn thất nội bộ luôn bị làm giả để giảm yêu cầu vốn",
          "Vì Basel cấm sử dụng dữ liệu tổn thất nội bộ trong mô hình LDA",
        ],
        correct: 1,
        explanation:
          "Đây là lý do khung Basel cho phép/khuyến khích kết hợp ba nguồn: dữ liệu tổn thất nội bộ, dữ liệu tổn thất của ngành (external loss data), và phân tích kịch bản (scenario analysis) do chuyên gia đánh giá - để bù đắp phần thiếu quan sát ở vùng đuôi hiếm gặp.",
      },
    ],
    keyTakeaways: [
      "LDA tách rủi ro vận hành thành phân phối tần suất (bao nhiêu lần/năm) và phân phối mức độ nghiêm trọng (thiệt hại mỗi lần), kết hợp qua mô phỏng Monte Carlo",
      "Phân phối mức độ nghiêm trọng cần đuôi dày vì đa số sự cố nhỏ nhưng thỉnh thoảng có sự cố cực lớn (Knight Capital: 440 triệu USD trong 45 phút)",
      "Dữ liệu tổn thất nội bộ thường thiếu quan sát ở vùng đuôi hiếm gặp - cần bổ sung dữ liệu ngành và phân tích kịch bản",
      "VaR vận hành thường tính ở mức tin cậy rất cao (99,9%) vì hậu quả của việc đánh giá thấp sự kiện đuôi có thể đe doạ sự tồn tại của tổ chức",
    ],
    practicePrompt: {
      question: "Một ngân hàng chỉ dùng 3 năm dữ liệu tổn thất nội bộ để ước lượng vốn dự phòng rủi ro vận hành, không có sự cố cực lớn nào trong giai đoạn đó. Rủi ro của cách làm này là gì?",
      options: [
        "Không có rủi ro gì, 3 năm dữ liệu là đủ chính xác",
        "Đánh giá thấp phần đuôi vì cửa sổ 3 năm quá ngắn",
        "Mô hình sẽ đánh giá quá cao vốn dự phòng cần thiết",
        "Vấn đề chỉ là dữ liệu quá cũ, cần cập nhật dữ liệu mới nhất",
      ],
      correct: 1,
      explanation:
        "Đây chính là hạn chế cốt lõi được nêu trong bài: sự kiện đuôi hiếm gặp, nên cửa sổ dữ liệu ngắn gần như chắc chắn không chứa quan sát nào ở vùng đuôi, khiến vốn dự phòng ước lượng thấp hơn rủi ro thực tế.",
    },
    summary: {
      keyIdea: "LDA tách rủi ro vận hành thành hai chiều - bao nhiêu lần và mỗi lần bao nhiêu - vì một loại sự cố có thể hiếm mà nặng còn loại khác thường xuyên mà nhẹ.",
      formula: "Tổn thất năm = Tần suất (Poisson) ghép với Mức độ (thường lognormal)",
      commonMistake: "Khớp phân phối lên dữ liệu nội bộ rồi ngoại suy ra mức 99,9%. Ở đó không có quan sát nào, nên con số cuối do dạng phân phối quyết định chứ không do dữ liệu.",
    },
    application: {
      title: "Khi đọc một mô hình rủi ro vận hành",
      message: "Hỏi phần đuôi đến từ nguồn nào. Nếu chỉ từ dữ liệu nội bộ, mô hình đang ngoại suy vào vùng nó chưa từng thấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong nhiều năm, rủi ro vận hành được coi là loại rủi ro \"không đo được bằng số\", chỉ có thể liệt kê danh sách và kiểm soát bằng quy trình. LDA là cách khung Basel biến nó thành một con số vốn dự phòng cụ thể, đủ nghiêm ngặt để quy định chấp nhận.",
      },
      {
        type: "heading",
        text: "Hai câu hỏi độc lập",
      },
      {
        type: "conceptTable",
        title: "Tần suất và mức độ nghiêm trọng",
        subtitle: "Ước lượng riêng biệt, kết hợp bằng mô phỏng",
        concepts: [
          { vi: "Tần suất", en: "Frequency", def: "Số lần một loại sự kiện tổn thất xảy ra trong một năm. Thường mô hình bằng phân phối Poisson." },
          { vi: "Mức độ nghiêm trọng", en: "Severity", def: "Thiệt hại tài chính mỗi lần sự kiện xảy ra. Thường mô hình bằng phân phối đuôi dày như Lognormal, vì đa số nhỏ nhưng có đuôi hiếm gặp cực lớn." },
          { vi: "Tổn thất tổng", en: "Aggregate loss", def: "Kết hợp hai phân phối trên qua mô phỏng Monte Carlo hàng chục nghìn lần để ra phân phối tổn thất cả năm, từ đó đọc VaR vận hành." },
        ],
      },
      {
        type: "callout",
        label: "Ba nguồn dữ liệu Basel cho phép kết hợp",
        text: "Dữ liệu tổn thất nội bộ (internal loss data) một mình không đủ để ước lượng đuôi chính xác. Khung Basel cho phép bổ sung dữ liệu tổn thất của toàn ngành (external loss data, thường qua các cơ sở dữ liệu tổng hợp) và phân tích kịch bản do chuyên gia trong tổ chức xây dựng cho những sự kiện chưa từng xảy ra nhưng có thể xảy ra.",
      },
      {
        type: "closing",
        lines: [
          "LDA không loại bỏ tính chủ quan của rủi ro vận hành, nhưng buộc tổ chức phải định lượng nó thay vì chỉ liệt kê.",
          "Bài sau: rủi ro vận hành không chỉ là tổn thất tài chính, mà còn là khả năng tổ chức tiếp tục hoạt động khi bị gián đoạn - operational resilience.",
        ],
      },
    ],
  },
  {
    id: 1537,
    slug: "kha-nang-phuc-hoi-van-hanh-bcp-cyber",
    title: "FRM Operational, Bài 2: Khả năng phục hồi vận hành - BCP, DR và rủi ro công nghệ",
    subtitle: "Vì sao \"đo lường được tổn thất\" chưa đủ - tổ chức còn phải sống sót qua gián đoạn",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "professional",
    whyItMatters:
      "Sau khủng hoảng 2008 và hàng loạt sự cố công nghệ/mạng lớn, các cơ quan quản lý chuyển trọng tâm từ chỉ đo lường tổn thất vận hành sang khả năng phục hồi (resilience) - liệu tổ chức có thể tiếp tục cung cấp dịch vụ thiết yếu khi bị gián đoạn nghiêm trọng hay không, bất kể nguyên nhân là gì.",
    openingQuestion: "Kế hoạch Liên tục Kinh doanh (Business Continuity Plan - BCP) khác gì với Kế hoạch Khôi phục sau Thảm hoạ (Disaster Recovery - DR)?",
    openingOptions: [
      "Hai kế hoạch này hoàn toàn giống nhau, chỉ khác tên gọi",
      "BCP giữ chức năng kinh doanh thiết yếu; DR khôi phục hệ thống IT",
      "DR chỉ áp dụng cho thiên tai, BCP chỉ áp dụng cho tấn công mạng",
      "BCP là trách nhiệm của phòng IT, DR là trách nhiệm của phòng nhân sự",
    ],
    correctOption: 1,
    explanation:
      "BCP là kế hoạch tổng thể cấp tổ chức: nếu trụ sở chính không dùng được, nhân viên chủ chốt không có mặt, hoặc quy trình chính bị gián đoạn thì làm gì để tiếp tục các chức năng kinh doanh thiết yếu (critical business functions). DR là một phần con của BCP, tập trung kỹ thuật vào việc khôi phục hệ thống công nghệ thông tin và dữ liệu trong khung thời gian mục tiêu (RTO/RPO).",
    diagram: [
      { label: "Xác định chức năng kinh doanh thiết yếu (critical functions)", arrow: true },
      { label: "Đặt mục tiêu thời gian khôi phục (RTO) và điểm khôi phục dữ liệu (RPO)", arrow: true },
      { label: "Xây dựng phương án thay thế: nhân sự, địa điểm, hệ thống dự phòng", arrow: true },
      { label: "Diễn tập định kỳ - kế hoạch chưa test coi như chưa tồn tại" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "CrowdStrike, tháng 7/2024",
      description:
        "Một bản cập nhật phần mềm lỗi từ nhà cung cấp bảo mật CrowdStrike gây ra sự cố \"màn hình xanh chết chóc\" hàng loạt trên hệ thống Windows toàn cầu, làm gián đoạn hãng hàng không, bệnh viện, ngân hàng và sàn giao dịch cùng lúc - dù bản thân các tổ chức bị ảnh hưởng không hề có lỗi gì. Đây là ví dụ rõ nhất của rủi ro bên thứ ba (third-party risk): khả năng phục hồi của tổ chức phụ thuộc vào một nhà cung cấp mà họ không kiểm soát trực tiếp.",
    },
    quiz: [
      {
        question: "RTO (Recovery Time Objective) và RPO (Recovery Point Objective) khác nhau ở điểm nào?",
        options: [
          "RTO là thời gian tối đa chấp nhận để khôi phục hệ thống; RPO là lượng dữ liệu tối đa chấp nhận mất kể từ lần sao lưu gần nhất",
          "Hai khái niệm này thực chất là một, chỉ khác nhau ở cách viết tắt được dùng phổ biến hơn ở châu Âu so với ở Mỹ và châu Á",
          "RTO chỉ áp dụng cho phần cứng, RPO chỉ áp dụng cho phần mềm",
          "RPO luôn phải lớn hơn RTO trong mọi trường hợp",
        ],
        correct: 0,
        explanation:
          "RTO trả lời \"chúng ta có thể chấp nhận hệ thống ngừng hoạt động bao lâu\" (ví dụ 4 giờ). RPO trả lời \"chúng ta có thể chấp nhận mất dữ liệu của bao nhiêu thời gian gần nhất\" (ví dụ 15 phút, nếu sao lưu mỗi 15 phút). Hai chỉ số này quyết định mức đầu tư cần thiết cho hệ thống dự phòng.",
      },
      {
        question: "Vì sao sự cố CrowdStrike năm 2024 được coi là ví dụ điển hình của rủi ro bên thứ ba?",
        options: [
          "Vì tất cả các tổ chức bị ảnh hưởng trên toàn cầu đều mắc chung một lỗi cấu hình y hệt nhau trong hệ thống nội bộ của chính họ, hoàn toàn không liên quan tới bất kỳ nhà cung cấp bên ngoài nào",
          "Vì nguyên nhân gốc nằm ở nhà cung cấp bên ngoài mà tổ chức không kiểm soát trực tiếp, nhưng hậu quả vẫn giáng xuống chính tổ chức đó",
          "Vì sự cố chỉ ảnh hưởng tới một công ty duy nhất, không lan rộng",
          "Vì đây là một cuộc tấn công mạng có chủ đích từ tin tặc",
        ],
        correct: 1,
        explanation:
          "Rủi ro bên thứ ba xảy ra khi tổ chức phụ thuộc vào nhà cung cấp/đối tác bên ngoài cho một chức năng thiết yếu, nhưng lỗi của bên đó (dù không cố ý, không phải tấn công mạng) vẫn trực tiếp gây gián đoạn cho chính tổ chức - và khách hàng cuối cùng không quan tâm lỗi đó đến từ đâu.",
      },
      {
        question: "Vì sao \"kế hoạch chưa được diễn tập\" gần như tương đương với \"chưa có kế hoạch\" trong quản trị BCP?",
        options: [
          "Vì quy định luôn yêu cầu diễn tập ít nhất một lần mỗi thập kỷ",
          "Vì cho tới khi diễn tập thực tế, tổ chức không biết liệu các giả định trong kế hoạch (thời gian chuyển đổi, tính khả dụng của địa điểm dự phòng, năng lực nhân sự thay thế) có đúng với thực tế hay không",
          "Vì diễn tập là yêu cầu duy nhất mà kiểm toán viên bên ngoài kiểm tra",
          "Vì kế hoạch trên giấy không có giá trị pháp lý nếu chưa diễn tập",
        ],
        correct: 1,
        explanation:
          "Một BCP viết trên giấy dựa trên giả định (ví dụ: \"đội dự phòng có thể vận hành từ văn phòng B trong 2 giờ\") có thể sai hoàn toàn khi thực thi thật - thiếu quyền truy cập hệ thống, thiếu người biết quy trình, hoặc địa điểm dự phòng không đủ năng lực. Diễn tập là cách duy nhất phát hiện những khoảng cách này trước khi khủng hoảng thật xảy ra.",
      },
      {
        question: "Một ngân hàng xác định \"xử lý thanh toán liên ngân hàng\" là chức năng kinh doanh thiết yếu với RTO = 2 giờ. Điều này có nghĩa gì?",
        options: [
          "Ngân hàng chấp nhận hệ thống có thể ngừng hoạt động tối đa 2 giờ, và cần đầu tư hạ tầng dự phòng đủ để đạt mục tiêu đó",
          "Ngân hàng sẽ mất đúng 2 giờ dữ liệu giao dịch gần nhất bất kể nguyên nhân sự cố là gì và bất kể tần suất sao lưu dữ liệu thực tế đang áp dụng",
          "Chức năng này chỉ quan trọng trong 2 giờ đầu ngày làm việc",
          "RTO 2 giờ nghĩa là hệ thống phải chạy liên tục 2 giờ mỗi ngày để bảo trì",
        ],
        correct: 0,
        explanation:
          "RTO = 2 giờ là cam kết về thời gian khôi phục tối đa. Với chức năng có RTO ngắn như xử lý thanh toán liên ngân hàng, tổ chức thường phải đầu tư hệ thống dự phòng hot/warm site (sẵn sàng chuyển đổi gần như ngay lập tức), tốn kém hơn nhiều so với chức năng có RTO dài hơn (vài ngày).",
      },
    ],
    practicePrompt: {
      question:
        "Dịch vụ thanh toán đặt RTO 2 giờ và RPO 15 phút. Sự cố xảy ra lúc 14 giờ, hệ thống chạy lại lúc 15 giờ 30 nhưng mất toàn bộ giao dịch từ 13 giờ. Kết quả thế nào?",
      options: [
        "Đạt RTO nhưng trượt RPO, vì mất 60 phút dữ liệu so với ngưỡng 15",
        "Đạt cả hai, vì hệ thống đã chạy lại trong vòng hai giờ cho phép",
        "Trượt cả hai, vì sự cố kéo dài hơn ngưỡng mười lăm phút quy định",
        "Chưa kết luận được nếu chưa biết số lượng giao dịch bị mất là bao nhiêu",
      ],
      correct: 0,
      explanation:
        "RTO và RPO là hai câu hỏi khác nhau và phải chấm riêng. RTO hỏi chịu được bao lâu KHÔNG HOẠT ĐỘNG: một tiếng rưỡi, dưới ngưỡng hai giờ, đạt. RPO hỏi chịu mất bao nhiêu DỮ LIỆU: bản sao lưu gần nhất là 13 giờ nên mất 60 phút giao dịch, gấp bốn lần ngưỡng 15 phút, trượt. Hai chỉ số này đòi hai khoản đầu tư khác nhau - RTO cần hệ thống dự phòng chuyển đổi nhanh, RPO cần sao lưu dày hơn - nên gộp chúng thành một mục tiêu chung là cách chắc chắn để tiêu tiền sai chỗ. Số lượng giao dịch không đổi được kết luận: ngưỡng đặt theo thời gian.",
    },
    keyTakeaways: [
      "BCP là kế hoạch tổng thể duy trì chức năng kinh doanh thiết yếu; DR là phần con kỹ thuật khôi phục hệ thống IT/dữ liệu",
      "RTO = thời gian tối đa chấp nhận ngừng hoạt động; RPO = lượng dữ liệu tối đa chấp nhận mất - hai chỉ số này quyết định mức đầu tư dự phòng cần thiết",
      "Rủi ro bên thứ ba (CrowdStrike 2024) cho thấy khả năng phục hồi của một tổ chức phụ thuộc cả vào nhà cung cấp mà họ không kiểm soát trực tiếp",
      "Kế hoạch chưa diễn tập gần như vô giá trị, vì các giả định trong kế hoạch chỉ được kiểm chứng khi thực thi thật",
    ],
    summary: {
      keyIdea: "RTO và RPO là hai câu hỏi khác nhau - chịu được bao lâu không hoạt động, và chịu mất bao nhiêu dữ liệu. Chúng phải được đặt từ mức hại cho khách hàng, không từ năng lực hiện có.",
      commonMistake: "Có kế hoạch nhưng chưa từng diễn tập. Giả định trong kế hoạch chỉ được kiểm chứng khi chạy thật, và phần lớn chúng sai.",
    },
    application: {
      title: "Một câu hỏi cho mọi dịch vụ trọng yếu",
      message: "Lần gần nhất kịch bản khôi phục được chạy thử với dữ liệu thật là khi nào, và mất bao lâu so với con số ghi trong tài liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau nhiều sự cố công nghệ và mạng quy mô lớn, trọng tâm quản trị rủi ro vận hành đã mở rộng: không chỉ hỏi \"tổn thất tài chính là bao nhiêu\" mà còn hỏi \"tổ chức có thể tiếp tục hoạt động không, và trong bao lâu.\"",
      },
      {
        type: "heading",
        text: "BCP và DR: tổng thể và kỹ thuật",
      },
      {
        type: "comparison",
        left: { label: "Business Continuity Plan (BCP)", text: "Kế hoạch cấp tổ chức: xác định chức năng kinh doanh thiết yếu, phương án nhân sự/địa điểm thay thế, quy trình vận hành khi gián đoạn xảy ra ở bất kỳ nguyên nhân nào." },
        right: { label: "Disaster Recovery (DR)", text: "Phần con kỹ thuật của BCP: khôi phục hệ thống IT, dữ liệu, hạ tầng công nghệ trong khung thời gian mục tiêu RTO/RPO đã đặt ra." },
      },
      {
        type: "callout",
        label: "Rủi ro bên thứ ba - lớp phức tạp thêm",
        text: "Ngân hàng hiện đại phụ thuộc vào hàng trăm nhà cung cấp công nghệ, dữ liệu, thanh toán. BCP hiệu quả phải mở rộng ra cả các nhà cung cấp trọng yếu: đánh giá khả năng phục hồi của họ, có phương án thay thế nếu họ gián đoạn, và không coi \"lỗi không phải do chúng ta\" là lý do chấp nhận được với khách hàng hay cơ quan quản lý.",
      },
      {
        type: "heading",
        text: "Hai con số biến kế hoạch thành thứ kiểm chứng được"
      },
      {
        type: "conceptTable",
        title: "RTO và RPO trả lời hai câu hỏi khác nhau",
        subtitle: "Một kế hoạch không có hai con số này thì không có gì để kiểm định",
        concepts: [
          {
            vi: "Thời gian phục hồi mục tiêu",
            en: "RTO - Recovery Time Objective",
            def: "Dịch vụ được phép ngừng bao lâu. Đặt RTO 4 giờ nghĩa là toàn bộ hạ tầng dự phòng, quy trình chuyển đổi và nhân sự trực phải cùng chạy xong trong 4 giờ - kể cả lúc 2 giờ sáng chủ nhật."
          },
          {
            vi: "Điểm phục hồi mục tiêu",
            en: "RPO - Recovery Point Objective",
            def: "Được phép mất bao nhiêu dữ liệu. RPO 15 phút buộc sao lưu hoặc nhân bản ít nhất mỗi 15 phút; RPO bằng 0 buộc nhân bản đồng bộ, và chi phí nhảy vọt ở đúng chỗ đó."
          },
          {
            vi: "Ngưỡng chịu đựng tác động",
            en: "Impact tolerance",
            def: "Câu hỏi mới mà cơ quan quản lý đặt ra: mức gián đoạn tối đa mà một dịch vụ trọng yếu gây ra vẫn chưa tổn hại tới khách hàng và thị trường. Nó đặt cho dịch vụ, không đặt cho hệ thống - nên trả lời được nó đòi phải biết một dịch vụ đi qua những hệ thống nào."
          }
        ]
      },
      {
        type: "callout",
        label: "Khoảng cách chỉ lộ ra khi diễn tập",
        text: "Giả sử dịch vụ thanh toán có ngưỡng chịu đựng 2 giờ, nhưng bài diễn tập chuyển sang trung tâm dự phòng mất 6 giờ vì phải khởi động lại theo đúng thứ tự phụ thuộc giữa các hệ thống. Khoảng cách 4 giờ đó là kết quả có giá trị nhất của cả bài diễn tập - và nó không bao giờ xuất hiện trong một tài liệu BCP chưa từng được chạy thử. Đó là lý do quy định hiện nay yêu cầu diễn tập trong kịch bản nghiêm trọng nhưng hợp lý, chứ không yêu cầu nộp bản kế hoạch."
      },
      {
        type: "closing",
        lines: [
          "Khả năng phục hồi không phải là tránh mọi gián đoạn - điều đó bất khả thi - mà là chuẩn bị sẵn để gián đoạn không biến thành khủng hoảng.",
          "Bài sau: một loại rủi ro vận hành thường bị bỏ sót - rủi ro nằm trong chính các mô hình được dùng để đo rủi ro khác.",
        ],
      },
    ],
  },
  {
    id: 1538,
    slug: "rui-ro-mo-hinh-va-rui-ro-ben-thu-ba",
    title: "FRM Operational, Bài 3: Rủi ro mô hình và rủi ro bên thứ ba",
    subtitle: "Khi chính công cụ đo rủi ro lại là một nguồn rủi ro - và vì sao kiểm soát nội bộ không dừng lại ở ranh giới tổ chức",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Mọi VaR, mọi xếp hạng tín dụng, mọi mô hình định giá đều dựa trên giả định - và giả định có thể sai. Rủi ro mô hình (model risk) là rủi ro rằng chính công cụ được dùng để đo và quản lý rủi ro khác lại trở thành nguồn gốc của tổn thất. Đây là chủ đề trọng tâm sau khủng hoảng 2008, khi hàng loạt mô hình định giá CDO được chứng minh là sai hệ thống.",
    openingQuestion: "Rủi ro mô hình (model risk) phát sinh từ những nguồn nào?",
    openingOptions: [
      "Chỉ từ lỗi lập trình trong code của mô hình",
      "Từ giả định sai, dữ liệu đầu vào không đại diện, và/hoặc mô hình bị áp dụng sai bối cảnh so với mục đích thiết kế ban đầu",
      "Chỉ xảy ra với các mô hình học máy (machine learning), không xảy ra với mô hình thống kê truyền thống",
      "Rủi ro mô hình chỉ tồn tại về mặt lý thuyết, chưa từng gây tổn thất thực tế đáng kể",
    ],
    correctOption: 1,
    explanation:
      "Rủi ro mô hình có ba nguồn chính: (1) giả định nền tảng sai - ví dụ giả định tương quan thấp của các mô hình CDO trước 2008; (2) dữ liệu đầu vào không đại diện cho tương lai - ví dụ dùng dữ liệu giai đoạn bình yên để dự báo khủng hoảng; (3) mô hình bị dùng ngoài phạm vi nó được thiết kế - ví dụ dùng mô hình định giá quyền chọn châu Âu cho quyền chọn kiểu Mỹ mà không điều chỉnh.",
    diagram: [
      { label: "Mô hình được xây dựng dựa trên giả định + dữ liệu lịch sử", arrow: true },
      { label: "Giả định sai hoặc dữ liệu không đại diện cho tương lai", arrow: true },
      { label: "Mô hình cho kết quả sai nhưng trông vẫn 'có vẻ khoa học'", arrow: true },
      { label: "Quyết định dựa trên kết quả sai đó gây tổn thất thực" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "JPMorgan \"London Whale\", 2012",
      description:
        "Đơn vị Chief Investment Office của JPMorgan chuyển sang một mô hình VaR mới cho danh mục phái sinh tín dụng phức tạp. Mô hình mới, do lỗi triển khai (bao gồm một lỗi excel chia sai công thức), báo cáo mức rủi ro thấp hơn thực tế đáng kể. Vị thế được phép phình to dựa trên con số VaR bị đánh giá thấp, và khi thị trường đi ngược, ngân hàng lỗ hơn 6 tỷ USD - một trong những ví dụ rõ nhất về rủi ro mô hình: không phải thị trường bất ngờ, mà công cụ đo rủi ro chính nó sai.",
    },
    quiz: [
      {
        question: "Trong vụ \"London Whale\" của JPMorgan, nguồn gốc trực tiếp của tổn thất là gì?",
        options: [
          "Một sự kiện thị trường hoàn toàn bất ngờ mà không mô hình rủi ro nào trên thế giới, dù tinh vi tới đâu, có khả năng dự báo hay lường trước được",
          "Mô hình VaR mới bị lỗi triển khai, báo cáo rủi ro thấp hơn thực tế, khiến vị thế phình to quá mức trước khi bị phát hiện",
          "Gian lận kế toán cố ý từ ban lãnh đạo",
          "Một cuộc tấn công mạng làm sai lệch dữ liệu giao dịch",
        ],
        correct: 1,
        explanation:
          "Đây là rủi ro mô hình điển hình: công cụ được dùng để kiểm soát rủi ro (VaR) lại chính là nguồn gốc của vấn đề, vì nó báo cáo sai mức độ rủi ro thực sự, khiến các quyết định dựa trên nó (cho phép vị thế lớn hơn) trở nên sai lầm.",
      },
      {
        question: "Vì sao \"mô hình bị áp dụng ngoài phạm vi thiết kế\" là một nguồn rủi ro mô hình quan trọng?",
        options: [
          "Vì mọi mô hình đều có thể áp dụng cho mọi loại tài sản mà không cần điều chỉnh",
          "Vì một mô hình được hiệu chỉnh và kiểm định cho một loại tài sản/điều kiện thị trường cụ thể có thể cho kết quả sai nghiêm trọng khi áp dụng cho bối cảnh khác mà không kiểm định lại",
          "Vì đây chỉ là vấn đề lý thuyết, không xảy ra trong thực tế vận hành",
          "Vì các cơ quan quản lý cấm hoàn toàn việc dùng lại mô hình cho sản phẩm mới",
        ],
        correct: 1,
        explanation:
          "Ví dụ: mô hình Black-Scholes giả định biến động không đổi và không có cổ tức bất thường - áp dụng nó cho một quyền chọn có đặc điểm khác xa giả định gốc mà không điều chỉnh sẽ cho kết quả định giá sai, dù bản thân công thức toán học không có lỗi.",
      },
      {
        question: "Quản trị rủi ro mô hình (model risk management) hiệu quả cần yếu tố nào then chốt?",
        options: [
          "Chỉ cần chính đội xây dựng mô hình tự rà soát lại code và tài liệu của mình trước khi đưa vào sử dụng chính thức, không cần thêm bên nào khác tham gia",
          "Một đội kiểm định độc lập, tách biệt khỏi đội xây dựng, đánh giá giả định, dữ liệu và phạm vi áp dụng trước khi mô hình được dùng để ra quyết định",
          "Chỉ cần mô hình được viết bằng ngôn ngữ lập trình hiện đại nhất",
          "Không cần kiểm định gì thêm nếu mô hình đã qua nhiều năm sử dụng",
        ],
        correct: 1,
        explanation:
          "Nguyên tắc giống ba tuyến phòng thủ: đội xây dựng mô hình (tuyến 1) không nên là đội duy nhất đánh giá mô hình của chính mình. Đội kiểm định độc lập (tuyến 2) kiểm tra giả định, chất lượng dữ liệu, và liệu mô hình có đang được dùng đúng phạm vi thiết kế hay không - kể cả với mô hình đã dùng lâu năm, vì điều kiện thị trường thay đổi.",
      },
      {
        question: "Rủi ro bên thứ ba (third-party risk) trong bối cảnh vận hành hiện đại chủ yếu liên quan tới điều gì?",
        options: [
          "Chỉ liên quan tới rủi ro pháp lý phát sinh khi soạn thảo và ký kết hợp đồng thương mại với đối tác cung cấp dịch vụ bên ngoài tổ chức",
          "Rủi ro rằng nhà cung cấp bên ngoài mà tổ chức phụ thuộc gặp sự cố, gây gián đoạn/tổn thất cho chính tổ chức dù lỗi không nằm ở tổ chức đó",
          "Chỉ áp dụng cho các công ty công nghệ, không áp dụng cho ngân hàng",
          "Rủi ro này chỉ tồn tại khi hợp đồng với đối tác nước ngoài",
        ],
        correct: 1,
        explanation:
          "Rủi ro bên thứ ba đã được minh hoạ qua sự cố CrowdStrike ở bài trước: dù lỗi nằm ở nhà cung cấp, hậu quả vận hành và uy tín vẫn thuộc về tổ chức sử dụng dịch vụ đó. Quản trị rủi ro bên thứ ba đòi hỏi đánh giá năng lực phục hồi của đối tác trọng yếu, không chỉ dừng ở việc ký hợp đồng.",
      },
    
    {
      "question": "Vì sao dùng một mô hình ngoài phạm vi nó được thiết kế lại là nguồn rủi ro lớn?",
      "options": [
        "Vì mô hình vẫn cho ra kết quả trông hợp lý mà không cảnh báo gì",
        "Vì mô hình sẽ chạy chậm hơn khi xử lý dữ liệu ngoài phạm vi thiết kế",
        "Vì người dùng mới thường không được đào tạo về cách vận hành mô hình",
        "Vì mô hình phải được cơ quan quản lý phê duyệt lại cho mỗi phạm vi mới"
      ],
      "correct": 0,
      "explanation": "Mô hình định giá trái phiếu doanh nghiệp vẫn trả về một con số khi bạn đưa vào một sản phẩm cấu trúc - nó không có cách nào biết rằng giả định nền đã không còn đúng. Đây là lý do quản trị rủi ro mô hình phải ghi rõ phạm vi sử dụng ngay trong hồ sơ mô hình."
    }
    ],
    practicePrompt: {
      question:
        "Một mô hình định giá được xây và kiểm định cho trái phiếu doanh nghiệp có thanh khoản tốt. Một bàn khác dùng nó cho trái phiếu doanh nghiệp nhỏ ít giao dịch. Nguồn rủi ro mô hình nào?",
      options: [
        "Dùng đúng mô hình sai chỗ, tức ngoài phạm vi thiết kế của nó",
        "Giả định nền tảng sai, vì công thức định giá vốn đã không đúng",
        "Dữ liệu không đại diện, vì mẫu huấn luyện đã quá cũ so với nay",
        "Không phải rủi ro mô hình, vì mô hình đã được kiểm định đầy đủ",
      ],
      correct: 0,
      explanation:
        "Ba nguồn rủi ro mô hình cần ba cách chữa khác nhau, nên xác định đúng nguồn là bước đầu tiên. Ở đây mô hình không sai và dữ liệu không sai - nó được xây đúng cho một loại tài sản và đang được dùng cho loại khác, nơi giả định về thanh khoản và về độ tin cậy của giá tham chiếu không còn đúng. Không đợt kiểm định lại nào phát hiện được điều này, vì kiểm định chỉ hỏi mô hình có làm đúng việc nó được thiết kế để làm hay không. Cách chữa là một sổ đăng ký mô hình ghi rõ phạm vi áp dụng, và một chốt kiểm soát khi ai đó dùng mô hình ra ngoài phạm vi đó.",
    },
    keyTakeaways: [
      "Rủi ro mô hình có ba nguồn: giả định nền tảng sai, dữ liệu không đại diện cho tương lai, và mô hình bị dùng ngoài phạm vi thiết kế",
      "London Whale (JPMorgan, 2012): lỗi triển khai mô hình VaR khiến rủi ro bị báo cáo thấp hơn thực tế, cho phép vị thế phình to trước khi lỗ hơn 6 tỷ USD",
      "Quản trị rủi ro mô hình cần đội kiểm định độc lập, tách biệt khỏi đội xây dựng - áp dụng ngay cả với mô hình đã dùng lâu năm",
      "Rủi ro bên thứ ba mở rộng phạm vi kiểm soát nội bộ ra ngoài ranh giới tổ chức, tới cả các nhà cung cấp trọng yếu mà tổ chức không kiểm soát trực tiếp",
    ],
    summary: {
      keyIdea: "Rủi ro mô hình có ba nguồn khác nhau - giả định sai, dữ liệu không đại diện, và dùng đúng mô hình sai chỗ - nên cần ba cách chữa khác nhau chứ không một quy trình chung.",
      commonMistake: "Để đội xây mô hình tự kiểm định mô hình của mình. London Whale là lỗi triển khai, và nó sống được vì không ai độc lập nhìn vào.",
    },
    application: {
      title: "Mở rộng ra ngoài ranh giới tổ chức",
      message: "Liệt kê các nhà cung cấp mà một sự cố của họ làm dịch vụ của bạn dừng. Danh sách đó thường ngắn hơn dự tính, và tập trung hơn nhiều.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một nghịch lý ở trung tâm của quản trị rủi ro hiện đại: công cụ được xây dựng để đo và kiểm soát rủi ro - mô hình VaR, mô hình xếp hạng tín dụng, mô hình định giá - lại có thể chính là nguồn gốc của tổn thất, nếu không ai kiểm tra độc lập giả định bên trong nó.",
      },
      {
        type: "heading",
        text: "Ba nguồn rủi ro mô hình",
      },
      {
        type: "list",
        items: [
          "Giả định nền tảng sai - mô hình đúng về mặt toán học nhưng dựa trên tiền đề không còn đúng với thực tế",
          "Dữ liệu đầu vào không đại diện - hiệu chỉnh mô hình bằng dữ liệu giai đoạn bình yên rồi dùng nó để dự báo giai đoạn khủng hoảng",
          "Áp dụng ngoài phạm vi thiết kế - dùng lại một mô hình cho sản phẩm/điều kiện thị trường khác với mục đích ban đầu mà không kiểm định lại",
        ],
      },
      {
        type: "callout",
        label: "Bài học London Whale",
        text: "Điều đáng chú ý nhất trong vụ JPMorgan không phải là quy mô tổn thất, mà là việc lỗi mô hình (bao gồm một lỗi công thức Excel cơ bản) đã không bị phát hiện trước khi vị thế phình to tới mức không thể kiểm soát. Đây là lý do quản trị rủi ro mô hình hiện là một mảng riêng biệt trong khung Basel, với yêu cầu kiểm định độc lập bắt buộc.",
      },
      {
        type: "closing",
        lines: [
          "Không mô hình nào là hoàn hảo - câu hỏi đúng không phải \"mô hình này có đúng không\" mà là \"ai kiểm tra độc lập nó, và bao lâu một lần.\"",
          "Chặng Operational Resilience kết thúc ở đây; chặng tiếp theo chuyển sang một loại rủi ro khác từng bị đánh giá thấp cho tới khi nó gần như đánh sập cả hệ thống ngân hàng năm 2008 - rủi ro thanh khoản.",
        ],
      },
    ],
  },

  // ═══════════════ LIQUIDITY AND TREASURY RISK MEASUREMENT AND MANAGEMENT ═══════════════
  {
    id: 1539,
    slug: "rui-ro-thanh-khoan-ngan-hang-lcr-nsfr",
    title: "FRM Liquidity, Bài 1: Rủi ro thanh khoản ngân hàng - LCR và NSFR",
    subtitle: "Hai tỷ lệ Basel III ra đời sau 2008 để trả lời: ngân hàng có sống sót qua một tháng hoảng loạn không, và cấu trúc vốn có bền vững dài hạn không",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "💧",
    track: "professional",
    whyItMatters:
      "Trước 2008, các ngân hàng được coi là an toàn nếu đủ vốn (capital adequacy) - nhưng Lehman Brothers và Northern Rock sụp đổ vì cạn thanh khoản, không phải vì mất khả năng thanh toán về mặt kế toán. LCR và NSFR là hai tỷ lệ Basel III tạo ra riêng để đo rủi ro thanh khoản, tách biệt hoàn toàn khỏi rủi ro vốn.",
    openingQuestion: "Tỷ lệ Bảo đảm Thanh khoản (Liquidity Coverage Ratio - LCR) đo lường điều gì?",
    openingOptions: [
      "Tỷ lệ vốn chủ sở hữu trên tổng tài sản có rủi ro",
      "Đủ tài sản thanh khoản chịu 30 ngày căng thẳng",
      "Tỷ lệ nợ xấu trên tổng dư nợ cho vay",
      "Mức độ đa dạng hoá danh mục đầu tư của ngân hàng",
    ],
    correctOption: 1,
    explanation:
      "LCR = Tài sản thanh khoản chất lượng cao (HQLA) / Dòng tiền ra ròng dự kiến trong 30 ngày căng thẳng, yêu cầu tối thiểu 100%. Đây là bài kiểm tra \"sống sót ngắn hạn\": nếu khách hàng rút tiền ồ ạt và thị trường liên ngân hàng đóng băng trong một tháng, ngân hàng có đủ tài sản chuyển đổi nhanh thành tiền mặt để đáp ứng không.",
    diagram: [
      { label: "Xác định Tài sản Thanh khoản Chất lượng Cao (HQLA)", arrow: true },
      { label: "Mô phỏng kịch bản căng thẳng 30 ngày: rút tiền gửi, mất hạn mức tín dụng", arrow: true },
      { label: "LCR = HQLA / Dòng tiền ra ròng ≥ 100%", arrow: true },
      { label: "NSFR kiểm tra cấu trúc tài trợ ổn định trong 1 năm, không chỉ 30 ngày" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Northern Rock, 2007",
      description:
        "Ngân hàng Anh này có bảng cân đối kế toán \"khoẻ mạnh\" về mặt vốn, nhưng phụ thuộc nặng vào tài trợ ngắn hạn từ thị trường bán buôn (wholesale funding) để cho vay thế chấp dài hạn. Khi thị trường tín dụng đóng băng giữa 2007, Northern Rock không thể tái cấp vốn ngắn hạn, dẫn tới cảnh xếp hàng rút tiền đầu tiên tại một ngân hàng Anh sau hơn 100 năm - dù ngân hàng không hề \"mất khả năng thanh toán\" theo nghĩa kế toán truyền thống. Đây là ví dụ kinh điển thúc đẩy ra đời LCR và NSFR.",
    },
    quiz: [
      {
        question: "Điểm khác biệt cốt lõi giữa LCR và NSFR là gì?",
        options: [
          "LCR và NSFR đo cùng một thứ về bản chất, chỉ khác nhau ở đơn vị tính và cách trình bày trên báo cáo tài chính thường niên nộp cho cơ quan quản lý mỗi năm",
          "LCR kiểm tra khả năng sống sót qua căng thẳng 30 ngày; NSFR kiểm tra cấu trúc tài trợ ổn định trong 1 năm, tránh phụ thuộc tài trợ ngắn hạn cho tài sản dài hạn",
          "LCR chỉ áp dụng cho ngân hàng bán lẻ, NSFR chỉ áp dụng cho ngân hàng đầu tư",
          "NSFR đo rủi ro tín dụng, LCR đo rủi ro thị trường",
        ],
        correct: 1,
        explanation:
          "LCR là bài kiểm tra ngắn hạn (30 ngày, kịch bản khủng hoảng cấp tính). NSFR (Net Stable Funding Ratio) là bài kiểm tra cấu trúc dài hạn hơn: tỷ lệ nguồn tài trợ ổn định sẵn có trên nhu cầu tài trợ ổn định bắt buộc, ngăn ngân hàng lặp lại sai lầm của Northern Rock - dùng tài trợ ngắn hạn để nuôi tài sản dài hạn.",
      },
      {
        question: "Vì sao Northern Rock sụp đổ dù \"khoẻ mạnh về vốn\" theo tiêu chuẩn trước 2008?",
        options: [
          "Vì ngân hàng có tỷ lệ nợ xấu quá cao trong danh mục cho vay",
          "Vì ngân hàng phụ thuộc nặng vào tài trợ ngắn hạn từ thị trường bán buôn để tài trợ cho các khoản vay thế chấp dài hạn, và khi thị trường đó đóng băng, ngân hàng không tái cấp vốn được dù vẫn còn dư vốn",
          "Vì ngân hàng bị gian lận kế toán từ ban lãnh đạo",
          "Vì lãi suất huy động tiền gửi của ngân hàng quá cao so với thị trường",
        ],
        correct: 1,
        explanation:
          "Đây chính xác là lệch kỳ hạn tài trợ (funding maturity mismatch) - tài sản dài hạn (thế chấp 20-30 năm) được tài trợ bằng nợ ngắn hạn phải liên tục tái cấp vốn. Khi thị trường tái cấp vốn đóng băng, cấu trúc này sụp đổ bất kể tỷ lệ an toàn vốn (capital adequacy ratio) có đạt chuẩn hay không - đúng vấn đề mà NSFR được thiết kế để ngăn chặn.",
      },
      {
        question: "Trong công thức LCR, \"Tài sản Thanh khoản Chất lượng Cao\" (HQLA) cần có đặc điểm gì?",
        options: [
          "Bất kỳ tài sản nào ngân hàng đang nắm giữ trên bảng cân đối kế toán, kể cả bất động sản đầu tư và cổ phiếu chưa niêm yết của công ty con hoặc đối tác liên doanh",
          "Tài sản chuyển đổi nhanh thành tiền mặt với chiết khấu tối thiểu ngay cả khi thị trường căng thẳng - như trái phiếu chính phủ, tiền mặt, dự trữ tại ngân hàng trung ương",
          "Chỉ tính các khoản vay có tài sản thế chấp bằng bất động sản",
          "Tài sản có lợi suất cao nhất trong danh mục đầu tư của ngân hàng",
        ],
        correct: 1,
        explanation:
          "HQLA phải thoả hai điều kiện: thanh khoản cao (bán được nhanh) và ổn định giá trị ngay cả khi thị trường căng thẳng - không giống như cổ phiếu hay bất động sản có thể mất thanh khoản hoặc giảm giá mạnh đúng lúc cần bán nhất, tức lúc thị trường hoảng loạn.",
      },
      {
        question: "Vì sao các cơ quan quản lý cần một chỉ số riêng cho rủi ro thanh khoản thay vì chỉ dựa vào tỷ lệ an toàn vốn (capital adequacy)?",
        options: [
          "Vì tỷ lệ an toàn vốn đã bao gồm đầy đủ mọi khía cạnh của rủi ro thanh khoản, nên việc tạo thêm một chỉ số riêng chỉ là dư thừa và làm phức tạp hoá báo cáo",
          "Vì một ngân hàng đủ vốn kế toán vẫn có thể sụp đổ nếu thiếu tiền mặt đáp ứng nghĩa vụ ngắn hạn khi bị rút vốn - hai rủi ro độc lập",
          "Vì quy định Basel trước 2008 chưa từng đề cập tới khái niệm vốn ngân hàng",
          "Vì rủi ro thanh khoản chỉ xảy ra ở các ngân hàng nhỏ, không xảy ra ở ngân hàng lớn",
        ],
        correct: 1,
        explanation:
          "Đây là bài học cốt lõi của khủng hoảng 2008: khả năng thanh toán (solvency - tài sản > nợ) và thanh khoản (liquidity - có đủ tiền mặt đúng lúc cần) là hai vấn đề khác nhau. Một tổ chức đủ vốn vẫn có thể sụp đổ nếu tài sản không thể chuyển đổi thành tiền mặt đủ nhanh để đáp ứng nghĩa vụ ngắn hạn.",
      },
    ],
    keyTakeaways: [
      "LCR = HQLA / dòng tiền ra ròng trong kịch bản căng thẳng 30 ngày, yêu cầu tối thiểu 100% - bài kiểm tra sống sót ngắn hạn",
      "NSFR kiểm tra cấu trúc tài trợ ổn định trong khung 1 năm, ngăn lệch kỳ hạn giữa tài trợ ngắn hạn và tài sản dài hạn",
      "Northern Rock (2007) sụp đổ dù đủ vốn, vì phụ thuộc tài trợ bán buôn ngắn hạn cho tài sản thế chấp dài hạn - đúng vấn đề NSFR được thiết kế để ngăn",
      "Khả năng thanh toán (solvency) và thanh khoản (liquidity) là hai rủi ro độc lập - đủ vốn không đồng nghĩa với đủ tiền mặt đúng lúc cần",
    ],
    practicePrompt: {
      question: "Một ngân hàng có tỷ lệ an toàn vốn (CAR) đạt 15%, cao hơn nhiều so với yêu cầu tối thiểu, nhưng 70% nguồn tài trợ đến từ vay liên ngân hàng kỳ hạn 1 tuần để tài trợ cho danh mục cho vay doanh nghiệp kỳ hạn 5 năm. Rủi ro lớn nhất ở đây là gì?",
      options: [
        "Không có rủi ro đáng kể, vì tỷ lệ an toàn vốn đã đủ cao",
        "Rủi ro lệch kỳ hạn tài trợ, giống mẫu hình Northern Rock",
        "Rủi ro duy nhất là rủi ro lãi suất, không liên quan tới thanh khoản",
        "Ngân hàng nên tăng thêm vốn chủ sở hữu để giải quyết vấn đề này",
      ],
      correct: 1,
      explanation:
        "Đây chính xác là cấu trúc rủi ro của Northern Rock: vốn cao không giải quyết được vấn đề lệch kỳ hạn tài trợ. Giải pháp đúng là đa dạng hoá nguồn tài trợ theo kỳ hạn dài hơn (điều NSFR đo lường), không phải tăng thêm vốn chủ sở hữu.",
    },
    summary: {
      keyIdea: "Đủ vốn và đủ thanh khoản là hai chuyện độc lập. Northern Rock sụp trong khi vẫn đủ vốn, vì tài trợ bán buôn ngắn hạn biến mất nhanh hơn tài sản dài hạn bán được.",
      formula: "LCR = HQLA / Dòng tiền ra ròng 30 ngày ≥ 100%  ·  NSFR = Nguồn ổn định sẵn có / Nguồn ổn định bắt buộc ≥ 100%",
      commonMistake: "Hoán đổi chân trời của hai tỷ lệ. LCR là cú sốc 30 ngày; NSFR là cấu trúc một năm.",
    },
    application: {
      title: "Đọc cơ cấu nguồn vốn",
      message: "Xem tỷ trọng tài trợ bán buôn ngắn hạn và mức tập trung kỳ hạn đáo hạn. Hai con số đó nói về khả năng sống sót nhiều hơn tổng tài sản thanh khoản đang nắm.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước 2008, câu hỏi quy định quan tâm nhất là \"ngân hàng có đủ vốn không.\" Sau Lehman Brothers và Northern Rock, câu hỏi bổ sung trở thành trọng tâm ngang hàng: \"ngân hàng có đủ tiền mặt đúng lúc cần không.\" Đó là lý do Basel III tạo ra hẳn hai tỷ lệ riêng cho thanh khoản.",
      },
      {
        type: "heading",
        text: "LCR và NSFR: ngắn hạn và dài hạn",
      },
      {
        type: "formula",
        title: "Tỷ lệ Bảo đảm Thanh khoản",
        label: "LCR",
        numerator: "Tài sản Thanh khoản Chất lượng Cao (HQLA)",
        denominator: "Dòng tiền ra ròng dự kiến trong 30 ngày căng thẳng",
        multiplier: "100%",
        variables: [
          { symbol: "HQLA", name: "High-Quality Liquid Assets", description: "Tiền mặt, dự trữ ngân hàng trung ương, trái phiếu chính phủ - chuyển đổi nhanh, ổn định giá trị kể cả khi thị trường căng thẳng" },
        ],
        example: {
          title: "Đọc kết quả",
          calculation: "LCR = 100 tỷ HQLA / 80 tỷ dòng tiền ra ròng",
          result: "125% - vượt yêu cầu tối thiểu 100%",
          explanation: "Ngân hàng có đủ tài sản thanh khoản để chịu đựng kịch bản rút vốn căng thẳng trong 30 ngày mà không cần bán tháo tài sản kém thanh khoản.",
        },
      },
      {
        type: "callout",
        label: "NSFR nhìn xa hơn LCR",
        text: "LCR chỉ trả lời câu hỏi 30 ngày tới. NSFR đặt câu hỏi dài hạn hơn: liệu cấu trúc tài trợ của ngân hàng có bền vững trong 1 năm không, hay đang âm thầm dùng nợ ngắn hạn để nuôi tài sản dài hạn - đúng cấu trúc đã hạ gục Northern Rock dù ngân hàng đó vượt qua mọi bài kiểm tra vốn truyền thống.",
      },
      {
        type: "heading",
        text: "Tính LCR trên một bảng cân đối cụ thể"
      },
      {
        type: "paragraph",
        text: "Ngân hàng có 1.000 tiền gửi dân cư ổn định và 200 nguồn vốn bán buôn, cùng 100 tài sản thanh khoản chất lượng cao sau haircut. Kịch bản quy định gán tỷ lệ rút cho từng nhóm: tiền gửi dân cư 5%, nguồn bán buôn 40%. Dòng ra 30 ngày là 1.000 × 5% + 200 × 40% = 50 + 80 = 130. Ngân hàng cũng có 50 dòng tiền vào dự kiến, nhưng chỉ được tính tối đa 75% dòng ra - trần ở đây là 97,5 nên cả 50 được tính. Dòng ra ròng là 80, và LCR = 100 / 80 = 125%."
      },
      {
        type: "callout",
        label: "Trần 75% không phải chi tiết kỹ thuật",
        text: "Nếu không có trần đó, một ngân hàng có thể báo cáo LCR rất đẹp bằng cách dựa vào các khoản phải thu đến hạn trong tháng, tức là giả định rằng trong lúc mình gặp khủng hoảng thì mọi đối tác vẫn trả nợ đúng hạn. Trần buộc ít nhất 25% dòng ra phải được phủ bằng tài sản đang nắm trong tay chứ không bằng lời hứa của người khác. Đây là hình mẫu chung của toàn bộ bộ quy định thanh khoản: mọi tham số đều là một giả định hành vi trong căng thẳng, và giá trị của chỉ số nằm ở chỗ mọi ngân hàng phải dùng chung một bộ giả định nên con số so sánh được."
      },
      {
        type: "comparison",
        left: {
          label: "LCR - câu hỏi 30 ngày",
          text: "Tài sản thanh khoản có phủ được dòng tiền ra ròng trong một tháng căng thẳng không. Đây là chỉ số sống sót ngắn hạn, và mẫu số là một kịch bản chứ không phải số liệu quá khứ."
        },
        right: {
          label: "NSFR - câu hỏi một năm",
          text: "Nguồn vốn ổn định sẵn có có phủ được nhu cầu nguồn vốn ổn định của cơ cấu tài sản không. Đây là chỉ số cấu trúc: nó hỏi ngân hàng có đang tài trợ tài sản dài bằng nguồn ngắn tới mức nguy hiểm không, chứ không hỏi tháng tới ra sao."
        }
      },
      {
        type: "closing",
        lines: [
          "Đủ vốn không đồng nghĩa với đủ thanh khoản - hai rủi ro độc lập cần hai bộ chỉ số riêng.",
          "Bài sau: khi LCR/NSFR báo động, ngân hàng cần một kế hoạch hành động cụ thể - contingency funding plan.",
        ],
      },
    ],
  },
  {
    id: 1540,
    slug: "rui-ro-tai-tro-va-ke-hoach-tai-tro-du-phong",
    title: "FRM Liquidity, Bài 2: Rủi ro tài trợ và Kế hoạch Tài trợ Dự phòng (CFP)",
    subtitle: "Đo được rủi ro thanh khoản chưa đủ - phải có sẵn kịch bản hành động trước khi khủng hoảng xảy ra",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🧯",
    track: "professional",
    whyItMatters:
      "LCR và NSFR cho biết ngân hàng có đang ở trong vùng an toàn hay không, nhưng không tự động nói cho ai biết phải làm gì khi chỉ số đó xấu đi. Kế hoạch Tài trợ Dự phòng (Contingency Funding Plan - CFP) là bước tiếp theo bắt buộc: một kịch bản hành động cụ thể, đã được duyệt trước, để không phải ứng biến giữa khủng hoảng.",
    openingQuestion: "Rủi ro tập trung tài trợ (funding concentration risk) là gì?",
    openingOptions: [
      "Rủi ro khi ngân hàng có quá nhiều chi nhánh tập trung ở một khu vực địa lý",
      "Phụ thuộc quá nhiều vào ít nguồn tài trợ hoặc đối tác",
      "Rủi ro khi lãi suất huy động vốn tăng đồng loạt trên toàn thị trường",
      "Rủi ro chỉ áp dụng cho ngân hàng có vốn hoá nhỏ",
    ],
    correctOption: 1,
    explanation:
      "Nếu phần lớn nguồn tài trợ của ngân hàng đến từ một nhóm nhỏ nhà đầu tư tổ chức, một thị trường (ví dụ chỉ thị trường liên ngân hàng trong nước), hoặc một loại kỳ hạn (toàn bộ ngắn hạn), thì một cú sốc niềm tin nhắm vào nhóm/thị trường/kỳ hạn đó có thể rút cạn thanh khoản đồng loạt - đây chính xác là điều đã xảy ra với Northern Rock và Silicon Valley Bank.",
    diagram: [
      { label: "Xác định các chỉ báo cảnh báo sớm (early warning indicators)", arrow: true },
      { label: "Phân cấp mức độ nghiêm trọng: bình thường → căng thẳng → khủng hoảng", arrow: true },
      { label: "Mỗi cấp độ có sẵn danh sách hành động cụ thể, ai quyết định, ai thực thi", arrow: true },
      { label: "Diễn tập định kỳ để kiểm chứng kế hoạch còn khả thi" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Silicon Valley Bank, tháng 3/2023",
      description:
        "SVB có cơ sở khách hàng tập trung cao vào các công ty công nghệ/startup, phần lớn tiền gửi không được bảo hiểm và có thể rút qua ứng dụng ngân hàng trong vài giây. Khi tin đồn về khoản lỗ trái phiếu lan truyền trên mạng xã hội, 42 tỷ USD tiền gửi bị rút chỉ trong một ngày - tốc độ chưa từng có tiền lệ trong lịch sử ngân hàng, vượt xa mọi kịch bản căng thẳng LCR chuẩn của Basel. Đây là ví dụ cho thấy rủi ro tập trung tài trợ (khách hàng đồng nhất, kênh rút tiền tức thời) có thể vượt quá giả định của cả những mô hình thanh khoản tinh vi nhất.",
    },
    quiz: [
      {
        question: "Vì sao Silicon Valley Bank sụp đổ nhanh hơn nhiều so với các cuộc khủng hoảng ngân hàng truyền thống (như Northern Rock 2007, mất vài ngày để rút hàng loạt)?",
        options: [
          "Vì SVB có tỷ lệ nợ xấu trong danh mục cho vay doanh nghiệp cao nhất trong toàn bộ hệ thống ngân hàng thương mại của Mỹ tính tới thời điểm sụp đổ",
          "Vì cơ sở tiền gửi tập trung cao kết hợp rút tiền tức thời qua ứng dụng và lan truyền tin qua mạng xã hội, khiến tốc độ rút vốn vượt xa lịch sử",
          "Vì SVB không có bất kỳ tài sản thanh khoản chất lượng cao nào",
          "Vì cơ quan quản lý đã đóng cửa ngân hàng trước khi khách hàng kịp rút tiền",
        ],
        correct: 1,
        explanation:
          "Đây là bài học quan trọng nhất từ SVB: rủi ro tập trung tài trợ (cơ sở khách hàng đồng nhất, phần lớn tiền gửi không bảo hiểm) kết hợp với công nghệ ngân hàng số hiện đại tạo ra tốc độ rút vốn mà các mô hình LCR truyền thống - vốn dựa trên hành vi rút tiền lịch sử chậm hơn nhiều - chưa từng tính tới.",
      },
      {
        question: "Mục đích chính của Kế hoạch Tài trợ Dự phòng (CFP) là gì?",
        options: [
          "Thay thế hoàn toàn cho việc tính toán LCR và NSFR mỗi kỳ báo cáo, giúp ngân hàng không cần duy trì hai hệ thống đo lường song song tốn kém nguồn lực",
          "Cung cấp sẵn bộ hành động cụ thể, đã duyệt trước, ứng với từng mức độ khủng hoảng thanh khoản, để tổ chức không phải ứng biến giữa lúc khủng hoảng",
          "Chỉ là tài liệu tuân thủ nộp cho cơ quan quản lý mỗi năm một lần, không có giá trị vận hành thực tế",
          "Chỉ áp dụng khi ngân hàng đã chính thức phá sản",
        ],
        correct: 1,
        explanation:
          "CFP hoạt động như một \"sách hướng dẫn khẩn cấp\": xác định trước các chỉ báo cảnh báo sớm, ai là người ra quyết định, và danh sách hành động cụ thể (bán tài sản, kích hoạt hạn mức tín dụng dự phòng, hạn chế cho vay mới...) ứng với từng cấp độ căng thẳng - giúp tổ chức hành động nhanh thay vì họp bàn giữa khủng hoảng.",
      },
      {
        question: "Vì sao rủi ro tập trung tài trợ được coi là một loại rủi ro riêng biệt, không chỉ đơn thuần là \"rủi ro thanh khoản nói chung\"?",
        options: [
          "Vì nó không có cách nào đo lường được",
          "Vì nguồn gốc của nó nằm ở cấu trúc cơ sở khách hàng/nhà đầu tư (đồng nhất về ngành, quy mô, hành vi), khiến một cú sốc niềm tin duy nhất có thể kích hoạt rút vốn đồng loạt - khác với rủi ro thanh khoản do biến động thị trường chung",
          "Vì nó chỉ ảnh hưởng tới ngân hàng có vốn hoá dưới 1 tỷ USD",
          "Vì các cơ quan quản lý chưa từng đưa loại rủi ro này vào bất kỳ khung giám sát nào",
        ],
        correct: 1,
        explanation:
          "Rủi ro tập trung tài trợ là về cấu trúc: nếu 80% tiền gửi đến từ một ngành hoặc một nhóm nhà đầu tư có hành vi tương quan cao, một sự kiện duy nhất ảnh hưởng tới nhóm đó (như tin đồn lan trên mạng xã hội trong cộng đồng startup của SVB) có thể kích hoạt rút vốn đồng loạt nhanh hơn nhiều so với rút vốn phân tán từ cơ sở khách hàng đa dạng.",
      },
      {
        question: "Sau sự kiện SVB, các mô hình LCR truyền thống bị đặt câu hỏi ở điểm nào?",
        options: [
          "Vì công thức toán học dùng để tính HQLA trong tử số của LCR bị các nhà nghiên cứu chứng minh là sai ngay từ khi Basel III mới được ban hành lần đầu năm 2010",
          "Vì giả định tốc độ rút tiền trong kịch bản 30 ngày, xây từ hành vi lịch sử (rút qua quầy, qua séc), không còn đúng với tốc độ rút qua ứng dụng số và mạng xã hội",
          "Vì LCR không áp dụng được cho bất kỳ ngân hàng nào có tài sản dưới 250 tỷ USD",
          "Vì cơ quan quản lý quyết định bãi bỏ hoàn toàn yêu cầu LCR sau sự kiện này",
        ],
        correct: 1,
        explanation:
          "SVB mất 42 tỷ USD tiền gửi trong một ngày - tốc độ mà giả định căng thẳng 30 ngày của LCR truyền thống chưa từng tính tới, vì mô hình được xây dựng dựa trên hành vi rút tiền của các cuộc khủng hoảng trước khi ngân hàng số và mạng xã hội phổ biến. Đây là ví dụ cho thấy mô hình rủi ro cần được cập nhật khi hành vi khách hàng và công nghệ thay đổi - liên hệ trực tiếp tới rủi ro mô hình đã học ở chặng trước.",
      },
    ],
    practicePrompt: {
      question:
        "Một ngân hàng có 90% tiền gửi đến từ các quỹ đầu tư mạo hiểm và công ty công nghệ trong cùng một hệ sinh thái. LCR đạt 160%. Rủi ro chính nằm ở đâu?",
      options: [
        "Tập trung tài trợ: một cú sốc niềm tin làm cả nhóm rút cùng lúc",
        "Không có rủi ro đáng kể, vì LCR 160% vượt xa mức tối thiểu 100%",
        "Rủi ro lãi suất, vì khách hàng công nghệ nhạy cảm với lãi suất hơn",
        "Rủi ro hoạt động, vì phục vụ một ngành đòi hỏi quy trình chuyên biệt",
      ],
      correct: 0,
      explanation:
        "LCR giả định dòng rút trải trong ba mươi ngày, còn một cơ sở khách hàng đồng nhất thì không hành xử như vậy: họ đọc cùng nguồn tin, quen nhau, và cùng nhận một lời khuyên rút tiền trong cùng buổi chiều. SVB mất 42 tỷ USD trong MỘT ngày - tốc độ mà không mô hình nào hiệu chỉnh từ lịch sử dự báo được, vì lịch sử không có ứng dụng ngân hàng và mạng xã hội. Đó là lý do tập trung tài trợ được tách thành một loại rủi ro riêng: nó không hiện ra ở bất kỳ tỷ lệ thanh khoản nào, mà chỉ hiện ra khi hỏi nguồn vốn này đến từ bao nhiêu nhóm hành xử độc lập.",
    },
    keyTakeaways: [
      "Rủi ro tập trung tài trợ xảy ra khi nguồn vốn phụ thuộc quá nhiều vào một nhóm khách hàng/kỳ hạn/thị trường đồng nhất, khiến một cú sốc niềm tin duy nhất kích hoạt rút vốn đồng loạt",
      "SVB (2023): 42 tỷ USD rút trong một ngày - tốc độ vượt xa giả định căng thẳng 30 ngày truyền thống của LCR, do cơ sở khách hàng tập trung và công nghệ rút tiền tức thời",
      "CFP là bộ hành động cụ thể đã duyệt trước theo từng mức độ căng thẳng, giúp tổ chức hành động nhanh thay vì ứng biến giữa khủng hoảng",
      "Mô hình thanh khoản cần cập nhật khi hành vi khách hàng và công nghệ thay đổi - đây là điểm giao giữa rủi ro thanh khoản và rủi ro mô hình",
    ],
    summary: {
      keyIdea: "SVB cho thấy giả định căng thẳng 30 ngày đã lỗi thời: 42 tỷ USD rút trong một ngày, vì thông tin và thao tác chuyển tiền giờ đi nhanh hơn mọi mô hình được hiệu chỉnh trước đó.",
      commonMistake: "Giữ nguyên tham số hành vi khách hàng qua nhiều năm. Đây là chỗ rủi ro thanh khoản gặp rủi ro mô hình.",
    },
    application: {
      title: "Kế hoạch tài trợ dự phòng dùng được",
      message: "Một CFP tốt nói rõ ai quyết định gì ở từng mức căng thẳng, đã duyệt trước. Nếu phải bàn quy trình giữa lúc khủng hoảng thì tốc độ đã thua ngay từ đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "LCR và NSFR cho biết ngân hàng đang ở đâu trên thang đo an toàn thanh khoản. Nhưng biết mình đang gặp nguy hiểm và biết chính xác phải làm gì tiếp theo là hai việc khác nhau - CFP tồn tại để lấp khoảng cách đó.",
      },
      {
        type: "heading",
        text: "Rủi ro tập trung tài trợ - bài học từ SVB",
      },
      {
        type: "paragraph",
        text: "Silicon Valley Bank không thất bại vì thiếu tài sản thanh khoản chất lượng cao theo định nghĩa kỹ thuật, mà vì tốc độ rút tiền vượt xa mọi giả định lịch sử. Cơ sở khách hàng đồng nhất (chủ yếu startup công nghệ, phần lớn tiền gửi vượt hạn mức bảo hiểm) khiến một tin đồn lan truyền trên mạng xã hội biến thành làn sóng rút vốn đồng loạt trong vài giờ, không phải vài ngày.",
      },
      {
        type: "conceptTable",
        title: "Cấu trúc một Kế hoạch Tài trợ Dự phòng",
        subtitle: "Ba thành phần bắt buộc",
        concepts: [
          { vi: "Chỉ báo cảnh báo sớm", en: "Early warning indicators", def: "Các ngưỡng cụ thể (LCR giảm dưới X%, chi phí vay liên ngân hàng tăng đột biến, xếp hạng tín nhiệm bị hạ) kích hoạt việc chuyển sang chế độ giám sát chặt hơn." },
          { vi: "Phân cấp mức độ nghiêm trọng", en: "Severity tiers", def: "Từ bình thường tới căng thẳng tới khủng hoảng - mỗi cấp có ngưỡng kích hoạt và người ra quyết định rõ ràng, tránh tình trạng không ai dám quyết khi tình huống xấu đi." },
          { vi: "Danh sách hành động cụ thể", en: "Action menu", def: "Bán tài sản HQLA, kích hoạt hạn mức tín dụng dự phòng, hạn chế cho vay mới, huy động vốn khẩn cấp - đã lượng hoá tác động và thời gian thực thi từ trước." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Kế hoạch tốt nhất là kế hoạch không bao giờ phải dùng tới, nhưng chỉ có được điều đó nếu nó đã được xây dựng và diễn tập trước khi cần.",
          "Bài sau khép lại chặng Liquidity Risk: quản lý tài sản-nợ (ALM) và rủi ro lãi suất trên sổ ngân hàng - góc nhìn dài hạn hơn về cùng một vấn đề.",
        ],
      },
    ],
  },
  {
    id: 1541,
    slug: "quan-ly-tai-san-no-alm-irrbb",
    title: "FRM Liquidity, Bài 3: Quản lý Tài sản-Nợ (ALM) và rủi ro lãi suất trên sổ ngân hàng",
    subtitle: "Vì sao một ngân hàng có thể lỗ nặng dù không hề giao dịch gì - chỉ vì cấu trúc kỳ hạn tài sản và nợ lệch nhau",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "ALM là chức năng treasury cốt lõi của mọi ngân hàng: cân bằng kỳ hạn, lãi suất và tiền tệ giữa tài sản (chủ yếu là các khoản cho vay) và nợ (chủ yếu là tiền gửi). Rủi ro lãi suất trên sổ ngân hàng (IRRBB) - khác với rủi ro lãi suất trên sổ giao dịch - là rủi ro âm thầm nhất trong ngành ngân hàng, vì nó không hiện trên báo cáo lãi/lỗ hằng ngày cho tới khi đã quá muộn.",
    openingQuestion: "Rủi ro lãi suất trên Sổ Ngân hàng (IRRBB) khác gì với rủi ro lãi suất trên sổ giao dịch (trading book)?",
    openingOptions: [
      "Không có khác biệt, hai khái niệm là một",
      "IRRBB đến từ lệch kỳ hạn giữa tài sản và nợ trên sổ ngân hàng",
      "IRRBB chỉ áp dụng cho trái phiếu chính phủ, không áp dụng cho khoản vay",
      "Rủi ro lãi suất trên sổ giao dịch luôn lớn hơn IRRBB ở mọi ngân hàng",
    ],
    correctOption: 1,
    explanation:
      "Sổ giao dịch (trading book) gồm các vị thế được mua bán tích cực, định giá theo thị trường (mark-to-market) hằng ngày. Sổ ngân hàng (banking book) gồm các khoản cho vay và tiền gửi được giữ tới đáo hạn, không giao dịch thường xuyên. IRRBB đo rủi ro rằng khi lãi suất thị trường thay đổi, giá trị kinh tế của sổ ngân hàng và thu nhập lãi ròng tương lai sẽ biến động - một rủi ro âm thầm, tích luỹ chậm nhưng có thể rất lớn.",
    diagram: [
      { label: "Tài sản (cho vay dài hạn lãi suất cố định) có kỳ hạn dài", arrow: true },
      { label: "Nợ (tiền gửi) thường có kỳ hạn ngắn hơn nhiều", arrow: true },
      { label: "Lãi suất thị trường tăng → chi phí huy động tăng nhanh hơn lãi thu từ tài sản cũ", arrow: true },
      { label: "Thu nhập lãi ròng bị bóp nghẹt, giá trị kinh tế của vốn giảm" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Silicon Valley Bank, 2023 (góc nhìn IRRBB)",
      description:
        "Ngoài rủi ro tập trung tài trợ đã học ở bài trước, gốc rễ sâu xa hơn của SVB là rủi ro lãi suất trên sổ ngân hàng: SVB nắm giữ lượng lớn trái phiếu kho bạc và MBS dài hạn lãi suất cố định, mua khi lãi suất còn thấp. Khi Fed tăng lãi suất nhanh và mạnh năm 2022-2023, giá trị thị trường của các trái phiếu này giảm sâu (dù được phân loại \"giữ tới đáo hạn\" nên không phải ghi nhận lỗ ngay trên báo cáo lãi/lỗ). Khoản lỗ chưa hiện thực hoá này là lý do niềm tin sụp đổ khi tin đồn lan ra - một minh chứng cho việc IRRBB có thể âm thầm tích luỹ trong nhiều năm trước khi trở thành khủng hoảng thanh khoản.",
    },
    quiz: [
      {
        question: "Vì sao IRRBB được coi là \"rủi ro âm thầm\" so với rủi ro trên sổ giao dịch?",
        options: [
          "Vì IRRBB hoàn toàn không có bất kỳ công thức hay phương pháp đo lường định lượng nào được các cơ quan quản lý ngân hàng công nhận chính thức cho tới nay",
          "Vì khoản mục sổ ngân hàng không định giá theo thị trường hằng ngày, nên thiệt hại kinh tế tích luỹ nhiều năm mà không hiện trên báo cáo lãi/lỗ",
          "Vì rủi ro này chỉ tồn tại về mặt lý thuyết trong sách giáo khoa",
          "Vì cơ quan quản lý không yêu cầu ngân hàng phải báo cáo IRRBB",
        ],
        correct: 1,
        explanation:
          "Khác với sổ giao dịch được mark-to-market hằng ngày (lỗ/lãi hiện ngay lập tức), các khoản mục sổ ngân hàng thường được ghi nhận theo giá gốc hoặc phân loại \"giữ tới đáo hạn\". Điều này khiến khoản lỗ kinh tế thực (giá trị hiện tại giảm khi lãi suất tăng) không hiện trên báo cáo tài chính cho tới khi tài sản phải bán hoặc đáo hạn - đúng như trường hợp SVB.",
      },
      {
        question: "Trong ví dụ SVB, vì sao việc nắm giữ trái phiếu dài hạn lãi suất cố định trở thành vấn đề khi Fed tăng lãi suất?",
        options: [
          "Vì bản thân trái phiếu chính phủ Mỹ có rủi ro vỡ nợ tăng vọt bất cứ khi nào Fed điều chỉnh lãi suất điều hành lên mức cao hơn giai đoạn trước đó",
          "Vì giá trị thị trường của trái phiếu lãi suất cố định giảm khi lãi suất tăng (quan hệ nghịch giá-lợi suất), tạo lỗ chưa hiện thực hoá dù vẫn trả lãi/gốc đầy đủ",
          "Vì Fed cấm ngân hàng nắm giữ trái phiếu kho bạc",
          "Vì lãi suất tăng khiến trái phiếu bị mất thanh khoản hoàn toàn, không thể bán được",
        ],
        correct: 1,
        explanation:
          "Đây là quan hệ nghịch cơ bản giữa giá trái phiếu và lợi suất (đã học ở bài Duration/Convexity trong chặng Valuation and Risk Models): khi lãi suất thị trường tăng, giá trị hiện tại của các dòng tiền cố định trong tương lai giảm. Trái phiếu dài hạn nhạy cảm hơn nhiều so với trái phiếu ngắn hạn với cùng một thay đổi lãi suất (duration cao hơn).",
      },
      {
        question: "Chức năng Quản lý Tài sản-Nợ (ALM) trong một ngân hàng chịu trách nhiệm chính về điều gì?",
        options: [
          "Chỉ quản lý quan hệ khách hàng VIP",
          "Cân bằng kỳ hạn, lãi suất và cấu trúc tiền tệ giữa tài sản (chủ yếu cho vay) và nợ (chủ yếu tiền gửi/vay) của ngân hàng, nhằm kiểm soát rủi ro lãi suất và thanh khoản ở cấp độ toàn bảng cân đối kế toán",
          "Chỉ phê duyệt các khoản vay doanh nghiệp lớn",
          "Chịu trách nhiệm marketing sản phẩm tiền gửi",
        ],
        correct: 1,
        explanation:
          "ALM (thường thuộc bộ phận Treasury) nhìn toàn bộ bảng cân đối kế toán như một danh mục cần quản lý rủi ro: đảm bảo kỳ hạn tài sản và nợ không lệch quá xa, dùng công cụ phái sinh (swap lãi suất) để điều chỉnh mức độ nhạy cảm lãi suất, và duy trì đủ thanh khoản - đúng điểm giao giữa IRRBB và rủi ro thanh khoản đã học ở hai bài trước.",
      },
      {
        question: "Điều gì liên kết ba bài trong chặng Liquidity and Treasury Risk lại với nhau (LCR/NSFR, CFP, và IRRBB/ALM)?",
        options: [
          "Không có mối liên hệ nào cả, đây thực chất là ba chủ đề hoàn toàn tách biệt được GARP gộp chung vào một môn thi chỉ vì lý do tổ chức đề cương, không phải vì bản chất kỹ thuật",
          "Cả ba xoay quanh cấu trúc kỳ hạn và tính ổn định của tài trợ ngân hàng - LCR/NSFR đo lường, CFP chuẩn bị hành động, ALM/IRRBB quản lý chiến lược hằng ngày",
          "Cả ba chỉ áp dụng cho ngân hàng đầu tư, không áp dụng cho ngân hàng thương mại",
          "Cả ba đều là các chỉ số được tính toán bởi cùng một công thức duy nhất",
        ],
        correct: 1,
        explanation:
          "Đây là bức tranh tổng thể của môn Liquidity and Treasury Risk: LCR/NSFR là thước đo, CFP là kế hoạch hành động khi thước đo báo động, còn ALM/IRRBB là công việc quản lý hằng ngày để cấu trúc bảng cân đối kế toán không bao giờ đi tới điểm cần dùng tới CFP. Cả ba đều xuất phát từ cùng một rủi ro gốc: lệch kỳ hạn và lệch lãi suất giữa tài sản và nợ.",
      },
    
    {
      "question": "Vì sao rủi ro lãi suất trên sổ ngân hàng được gọi là rủi ro âm thầm?",
      "options": [
        "Vì khoản mục này không định giá lại nên lỗ chưa hiện ra",
        "Vì nó chỉ phát sinh khi ngân hàng có hoạt động kinh doanh phái sinh",
        "Vì chuẩn kế toán không yêu cầu thuyết minh rủi ro lãi suất của sổ ngân hàng",
        "Vì lãi suất thường thay đổi rất chậm nên tác động tích lũy khó nhận ra"
      ],
      "correct": 0,
      "explanation": "Sổ giao dịch định giá lại hằng ngày nên lỗ hiện ra ngay. Trái phiếu giữ tới đáo hạn thì không, nên khoản lỗ nằm im trên bảng cân đối cho tới lúc buộc phải bán để có tiền - đúng kịch bản đã xảy ra năm 2023."
    }
    ],
    keyTakeaways: [
      "IRRBB là rủi ro âm thầm vì sổ ngân hàng không mark-to-market hằng ngày như sổ giao dịch, nên khoản lỗ kinh tế thực có thể tích luỹ nhiều năm trước khi lộ ra",
      "Trái phiếu lãi suất cố định dài hạn mất giá trị thị trường khi lãi suất tăng (quan hệ nghịch giá-lợi suất) - đúng nguyên nhân gốc rễ sâu xa của SVB, trước cả vấn đề rút tiền hàng loạt",
      "ALM/Treasury chịu trách nhiệm cân bằng kỳ hạn, lãi suất, tiền tệ giữa tài sản và nợ ở cấp độ toàn bảng cân đối kế toán",
      "LCR/NSFR (đo lường), CFP (kế hoạch hành động) và ALM/IRRBB (quản lý chiến lược hằng ngày) là ba lớp phòng thủ liên kết chặt chẽ của cùng một loại rủi ro gốc",
    ],
    practicePrompt: {
      question: "Một ngân hàng dùng tiền gửi không kỳ hạn (có thể rút bất kỳ lúc nào) để tài trợ cho các khoản vay mua nhà lãi suất cố định kỳ hạn 20 năm. Khi lãi suất thị trường tăng mạnh, rủi ro nào xuất hiện đồng thời?",
      options: [
        "Chỉ rủi ro tín dụng của người vay mua nhà",
        "Cả rủi ro lãi suất trên sổ ngân hàng lẫn rủi ro thanh khoản nếu người gửi rút",
        "Chỉ rủi ro vận hành vì quy trình xử lý hồ sơ vay chậm hơn",
        "Không có rủi ro nào đáng kể vì tiền gửi không kỳ hạn thường lãi suất thấp và ổn định",
      ],
      correct: 1,
      explanation:
        "Đây là ví dụ kinh điển của lệch kỳ hạn kép: rủi ro lãi suất (tài sản lãi suất cố định dài hạn không điều chỉnh theo lãi suất thị trường mới) và rủi ro thanh khoản (người gửi tiền không kỳ hạn có thể rút bất kỳ lúc nào để tìm nơi trả lãi cao hơn) xuất hiện đồng thời từ cùng một cấu trúc bảng cân đối kế toán.",
    },
    summary: {
      keyIdea: "IRRBB là rủi ro âm thầm vì sổ ngân hàng không định giá lại hàng ngày - khoản lỗ kinh tế đã có thật từ lâu trước khi xuất hiện trên báo cáo.",
      commonMistake: "Yên tâm vì báo cáo chưa ghi nhận lỗ. Không ghi nhận không phải là không có.",
    },
    application: {
      title: "Ba lớp phòng vệ thanh khoản",
      message: "LCR và NSFR đo, CFP lên kế hoạch hành động, ALM quản hằng ngày. Thiếu lớp nào thì hai lớp còn lại đều phải gánh phần việc chúng không được thiết kế để làm.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trong chặng này đều xoay quanh một câu hỏi duy nhất nhìn từ các góc khác nhau: cấu trúc kỳ hạn của một ngân hàng có bền vững không. LCR/NSFR đo nó ở một thời điểm, CFP chuẩn bị hành động khi nó xấu đi, còn ALM là công việc quản lý nó mỗi ngày để không bao giờ phải dùng tới CFP.",
      },
      {
        type: "heading",
        text: "Vì sao rủi ro lãi suất trên sổ ngân hàng lại nguy hiểm",
      },
      {
        type: "comparison",
        left: { label: "Sổ giao dịch (Trading book)", text: "Mark-to-market hằng ngày; lãi/lỗ hiện ngay trên báo cáo; rủi ro được VaR trading desk theo dõi sát." },
        right: { label: "Sổ ngân hàng (Banking book)", text: "Thường ghi nhận theo giá gốc/giữ tới đáo hạn; khoản lỗ kinh tế thực có thể tích luỹ âm thầm nhiều năm mà không xuất hiện trên báo cáo lãi/lỗ." },
      },
      {
        type: "paragraph",
        text: "Đây chính là lý do IRRBB bị nhiều nhà đầu tư và thậm chí một số nhà quản lý đánh giá thấp trong nhiều năm: nó không \"ồn ào\" như một khoản lỗ giao dịch. SVB là minh chứng rõ nhất - khoản lỗ chưa hiện thực hoá trên danh mục trái phiếu tồn tại âm thầm suốt năm 2022, chỉ trở thành khủng hoảng khi niềm tin sụp đổ và ngân hàng buộc phải bán tài sản đó ở mức lỗ thật.",
      },
      {
        type: "closing",
        lines: [
          "Rủi ro nguy hiểm nhất thường không phải rủi ro ồn ào nhất, mà là rủi ro không xuất hiện trên bất kỳ báo cáo nào cho tới ngày nó buộc phải xuất hiện.",
          "Đây là bài cuối của chặng FRM Foundations - Operational Resilience - Liquidity and Treasury Risk. Lộ trình FRM đầy đủ vẫn còn nhiều mảng chưa xây (đặc biệt các case study và LO chi tiết hơn của GARP), nhưng ba môn từng trống trơn giờ đã có nền tảng thật.",
        ],
      },
    ],
  },
];
