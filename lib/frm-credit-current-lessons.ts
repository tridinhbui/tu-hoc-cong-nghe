import type { Lesson } from "./lesson-types";

// Chặng "FRM - Tín dụng nâng cao & Vấn đề thời sự" (ids 1557-1561,
// professional track). Tiếp nối lib/frm-lessons.ts: môn Credit Risk
// Measurement and Management (20% đề thi) có nền tảng (xếp hạng, credit
// spread, 5C, credit scoring) nhưng thiếu hoàn toàn phần phái sinh tín dụng
// và rủi ro tín dụng cấu trúc - phần chiếm phần lớn nội dung GARP thực tế.
// Môn Current Issues in Financial Markets (10%) chỉ có 4 bài liên quan lỏng
// lẻo (khí hậu, ESG, embedded finance, crypto) - thêm hai chủ đề thời sự
// đúng nghĩa GARP: ngân hàng ngầm và rủi ro liên kết hệ thống.

export const FRM_CREDIT_CURRENT_LESSONS: Lesson[] = [
  // ═══════════════ CREDIT RISK MEASUREMENT AND MANAGEMENT ═══════════════
  {
    id: 1557,
    slug: "credit-default-swap-co-che-va-dinh-gia",
    title: "FRM Credit Risk, Bài 1: Credit Default Swap (CDS) - cơ chế và định giá cơ bản",
    subtitle: "Mua bảo hiểm cho một khoản nợ mà bạn thậm chí không cần nắm giữ trái phiếu đó",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔀",
    track: "professional",
    whyItMatters:
      "CDS là công cụ phái sinh tín dụng phổ biến nhất, đồng thời là nhân vật trung tâm của khủng hoảng 2008 (AIG bán CDS mà không đủ vốn dự phòng). Hiểu cơ chế CDS là điều kiện để hiểu cả cách phòng hộ rủi ro tín dụng lẫn cách rủi ro đó có thể lan ra ngoài bảng cân đối kế toán của ngân hàng gốc.",
    openingQuestion: "Trong một hợp đồng Credit Default Swap (CDS), bên mua bảo vệ (protection buyer) làm gì?",
    openingOptions: [
      "Trả phí định kỳ (spread) cho bên bán bảo vệ để đổi lấy khoản bồi thường nếu tổ chức tham chiếu (reference entity) xảy ra sự kiện tín dụng",
      "Cho tổ chức tham chiếu vay tiền trực tiếp với lãi suất cố định",
      "Mua cổ phiếu của tổ chức tham chiếu để phòng hộ rủi ro giá",
      "Nhận phí định kỳ và chịu rủi ro nếu tổ chức tham chiếu vỡ nợ",
    ],
    correctOption: 0,
    explanation:
      "CDS hoạt động như một hợp đồng bảo hiểm: bên mua bảo vệ trả phí (CDS spread, tính theo điểm cơ bản/năm trên mệnh giá) đều đặn cho bên bán bảo vệ. Nếu xảy ra sự kiện tín dụng (vỡ nợ, tái cơ cấu nợ) với tổ chức tham chiếu, bên bán phải bồi thường. Khác với vay trực tiếp, hai bên không cần có bất kỳ quan hệ tín dụng nào với tổ chức tham chiếu - đây chính là lý do CDS có thể được dùng để đầu cơ, không chỉ để phòng hộ.",
    diagram: [
      { label: "Bên mua bảo vệ trả phí định kỳ (CDS spread)", arrow: true },
      { label: "Bên bán bảo vệ nhận phí, cam kết bồi thường nếu có sự kiện tín dụng", arrow: true },
      { label: "Sự kiện tín dụng xảy ra (vỡ nợ, tái cơ cấu)", arrow: true },
      { label: "Bên bán bồi thường theo tỷ lệ tổn thất (1 − tỷ lệ thu hồi)" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "AIG, 2008",
      description:
        "AIG Financial Products bán một lượng lớn hợp đồng CDS bảo vệ cho các CDO liên quan tới nợ dưới chuẩn, thu phí đều đặn trong nhiều năm mà gần như không trích lập vốn dự phòng cho kịch bản vỡ nợ hàng loạt. Khi thị trường nhà ở Mỹ sụp đổ, AIG phải bồi thường cho hàng loạt hợp đồng cùng lúc, dẫn tới khoản lỗ khiến chính phủ Mỹ phải giải cứu 182 tỷ USD - vì AIG, dù không phải ngân hàng, đã trở thành mắt xích rủi ro hệ thống thông qua thị trường CDS.",
    },
    quiz: [
      {
        question: "CDS spread (phí CDS) phản ánh điều gì về tổ chức tham chiếu?",
        options: [
          "Lãi suất huy động tiền gửi hiện tại của tổ chức đó",
          "Thị trường đánh giá xác suất vỡ nợ càng cao thì CDS spread càng lớn, vì bên bán bảo vệ phải được trả nhiều hơn để chấp nhận rủi ro bồi thường cao hơn",
          "Giá cổ phiếu hiện tại của tổ chức tham chiếu trên sàn giao dịch",
          "Số lượng hợp đồng CDS đang lưu hành trên thị trường tại một thời điểm bất kỳ trong suốt vòng đời giao dịch, hoàn toàn không liên quan gì tới việc đánh giá rủi ro tín dụng thực sự của tổ chức tham chiếu",
        ],
        correct: 1,
        explanation:
          "CDS spread là thước đo thị trường về rủi ro tín dụng gần như theo thời gian thực - tăng nhanh khi thị trường lo ngại khả năng trả nợ của một tổ chức, thường phản ứng nhanh hơn cả xếp hạng tín nhiệm chính thức vì không phải chờ cơ quan xếp hạng đánh giá lại.",
      },
      {
        question: "Vì sao CDS có thể được dùng để đầu cơ, không chỉ để phòng hộ?",
        options: [
          "Vì luật pháp mọi quốc gia yêu cầu CDS chỉ được dùng cho mục đích đầu cơ",
          "Bên mua bảo vệ không bắt buộc phải sở hữu trái phiếu/khoản vay của tổ chức tham chiếu - có thể mua CDS \"trần\" (naked CDS) chỉ để đặt cược tổ chức đó sẽ vỡ nợ",
          "Vì CDS chỉ giao dịch được trên sàn chứng khoán tập trung có giám sát chặt chẽ của cơ quan quản lý nhà nước, không bao giờ giao dịch qua thị trường OTC phi tập trung như phần lớn phái sinh khác",
          "Vì phí CDS luôn cố định suốt vòng đời hợp đồng, không phản ánh rủi ro thực tế",
        ],
        correct: 1,
        explanation:
          "Không giống bảo hiểm tài sản thông thường (phải chứng minh có \"quyền lợi bảo hiểm\" - insurable interest), CDS cho phép mua bảo vệ mà không cần nắm giữ khoản nợ gốc. \"Naked CDS\" này là công cụ đầu cơ thuần tuý, và cũng là điểm gây tranh cãi lớn sau khủng hoảng 2008 vì nó khuếch đại quy mô rủi ro hệ thống vượt xa quy mô nợ thực tế.",
      },
      {
        question: "Trong vụ AIG năm 2008, sai lầm cốt lõi trong quản trị rủi ro là gì?",
        options: [
          "AIG bán CDS và thu phí đều đặn nhiều năm mà không trích lập đủ vốn dự phòng cho kịch bản nhiều hợp đồng phải bồi thường cùng lúc",
          "AIG hoàn toàn không tham gia bất kỳ hoạt động nào liên quan tới thị trường phái sinh tín dụng trước khi khủng hoảng 2008 xảy ra, theo báo cáo tài chính công bố khi đó",
          "AIG chỉ mua CDS để phòng hộ, không bán CDS cho bất kỳ tổ chức nào khác",
          "Chính phủ Mỹ đã cấm AIG tham gia thị trường CDS trước khi khủng hoảng xảy ra",
        ],
        correct: 0,
        explanation:
          "Đây là bài học liên hệ trực tiếp tới rủi ro mô hình và quản trị rủi ro doanh nghiệp đã học: thu phí đều đặn tạo cảm giác an toàn giả, trong khi rủi ro đuôi (nhiều sự kiện tín dụng xảy ra đồng thời trong khủng hoảng hệ thống) không được định giá đúng và không có vốn dự phòng tương xứng.",
      },
      {
        question: "Điều gì xảy ra với bên bán bảo vệ khi tổ chức tham chiếu xảy ra sự kiện tín dụng?",
        options: [
          "Bên bán phải bồi thường cho bên mua theo tỷ lệ tổn thất, tức mệnh giá trừ đi giá trị thu hồi được từ khoản nợ vỡ nợ đó",
          "Hợp đồng CDS tự động chấm dứt mà không bên nào phải thanh toán gì thêm",
          "Bên mua bảo vệ phải trả thêm phí phạt cho bên bán vì đã gây ra sự kiện tín dụng",
          "Cả hai bên đều được hoàn lại toàn bộ phí đã thanh toán trong suốt vòng đời hợp đồng",
        ],
        correct: 0,
        explanation:
          "Khoản bồi thường bằng mệnh giá trừ tỷ lệ thu hồi (recovery rate) - nếu trái phiếu vỡ nợ vẫn thu hồi được 40% giá trị qua thủ tục phá sản, bên bán chỉ phải bồi thường 60% mệnh giá, không phải toàn bộ.",
      },
    
    {
      "question": "Điều gì xảy ra với bên bán bảo vệ khi tổ chức tham chiếu xảy ra sự kiện tín dụng?",
      "options": [
        "Phải bù phần chênh giữa mệnh giá và giá trị còn lại của trái phiếu",
        "Phải hoàn lại toàn bộ số phí đã nhận cho bên mua bảo vệ",
        "Phải mua lại toàn bộ trái phiếu của tổ chức tham chiếu theo mệnh giá gốc",
        "Không phải làm gì nếu bên mua bảo vệ không nắm giữ trái phiếu tham chiếu"
      ],
      "correct": 0,
      "explanation": "Khoản bồi thường bằng phần tổn thất, tức mệnh giá trừ tỷ lệ thu hồi. Đáng chú ý là phương án cuối cùng sai một cách quan trọng: hợp đồng không đòi bên mua phải sở hữu tài sản tham chiếu, và chính điều đó cho phép dùng nó để đầu cơ."
    }
    ],
    keyTakeaways: [
      "CDS là hợp đồng bảo vệ tín dụng: bên mua trả phí định kỳ, bên bán bồi thường nếu xảy ra sự kiện tín dụng với tổ chức tham chiếu",
      "CDS spread phản ánh xác suất vỡ nợ theo đánh giá của thị trường - phản ứng nhanh, thường nhanh hơn xếp hạng tín nhiệm chính thức",
      "\"Naked CDS\" không đòi hỏi sở hữu khoản nợ gốc, biến CDS thành công cụ đầu cơ thuần tuý, khuếch đại rủi ro hệ thống",
      "AIG (2008): thu phí CDS đều đặn nhiều năm mà không trích lập đủ vốn dự phòng cho kịch bản nhiều sự kiện tín dụng xảy ra đồng thời",
    ],
    summary: {
      keyIdea: "CDS spread là đánh giá của thị trường về xác suất vỡ nợ, và nó phản ứng nhanh hơn xếp hạng tín nhiệm vì nó là giá chứ không phải một ý kiến.",
      commonMistake: "Coi bên bán bảo vệ luôn có khả năng chi trả. AIG thu phí đều nhiều năm mà không trích đủ vốn cho kịch bản nhiều sự kiện tín dụng cùng lúc.",
    },
    application: {
      title: "Đọc CDS như một tín hiệu",
      message: "Khi CDS spread của một tổ chức nới rộng trong lúc xếp hạng chưa đổi, thị trường đang nói điều mà tổ chức xếp hạng chưa nói.",
    },
    sections: [
      {
        type: "lead",
        text: "CDS thường bị hiểu nhầm là phức tạp, nhưng cơ chế cốt lõi đơn giản như một hợp đồng bảo hiểm: trả phí đều đặn, nhận bồi thường nếu điều xấu xảy ra. Phần phức tạp - và phần nguy hiểm - nằm ở việc ai được phép mua bảo hiểm đó mà không cần sở hữu thứ được bảo hiểm.",
      },
      {
        type: "heading",
        text: "Cơ chế cơ bản",
      },
      {
        type: "conceptTable",
        title: "Các thành phần của một hợp đồng CDS",
        subtitle: "Bốn yếu tố định nghĩa mọi hợp đồng",
        concepts: [
          { vi: "Tổ chức tham chiếu", en: "Reference entity", def: "Bên phát hành nợ mà hợp đồng CDS bảo vệ - một công ty, ngân hàng, hoặc chính phủ." },
          { vi: "Sự kiện tín dụng", en: "Credit event", def: "Điều kiện kích hoạt bồi thường - thường gồm vỡ nợ, tái cơ cấu nợ, hoặc mất khả năng thanh toán, định nghĩa chuẩn hoá bởi ISDA." },
          { vi: "CDS spread", en: "CDS spread", def: "Phí bên mua trả cho bên bán, tính theo điểm cơ bản/năm trên mệnh giá - thước đo rủi ro tín dụng theo thời gian thực." },
          { vi: "Tỷ lệ thu hồi", en: "Recovery rate", def: "Phần trăm mệnh giá thu hồi được sau vỡ nợ qua thủ tục phá sản - quyết định khoản bồi thường thực tế (1 − recovery rate)." },
        ],
      },
      {
        type: "callout",
        label: "Naked CDS - điểm gây tranh cãi nhất",
        text: "Sau khủng hoảng 2008, nhiều nhà lập pháp châu Âu đề xuất cấm naked CDS trên nợ công vì lo ngại nó tạo động lực đầu cơ đặt cược vào sự sụp đổ của một quốc gia. Đây là minh chứng cho việc một công cụ phòng hộ hợp lý (mua CDS để bảo vệ khoản nợ mình đang nắm giữ) và một công cụ đầu cơ thuần tuý (mua CDS không sở hữu gì) dùng chung một cơ chế kỹ thuật, nhưng mang ý nghĩa rủi ro hệ thống hoàn toàn khác nhau.",
      },
      {
        type: "closing",
        lines: [
          "CDS chuyển rủi ro tín dụng từ nơi nó phát sinh sang nơi ai đó sẵn sàng chấp nhận nó - nhưng không xoá bỏ rủi ro, chỉ di chuyển nó, đôi khi tới nơi không đủ vốn để gánh.",
          "Bài sau: khi hàng trăm khoản vay được gộp lại và cắt thành nhiều lớp rủi ro khác nhau - chứng khoán hoá và cấu trúc CDO.",
        ],
      },
    ],
  },
  {
    id: 1558,
    slug: "chung-khoan-hoa-va-cau-truc-cdo",
    title: "FRM Credit Risk, Bài 2: Chứng khoán hoá và rủi ro tín dụng cấu trúc (CDO)",
    subtitle: "Cách hàng nghìn khoản vay riêng lẻ biến thành một chứng khoán được xếp hạng AAA - và vì sao lớp cắt quyết định tất cả",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🧱",
    track: "professional",
    whyItMatters:
      "Chứng khoán hoá (securitization) là công cụ tài chính hợp lý - giúp ngân hàng giải phóng vốn để cho vay tiếp - nhưng cấu trúc phân lớp (tranching) của nó là nơi rủi ro bị che giấu tinh vi nhất trong khủng hoảng 2008. Hiểu cơ chế waterfall là điều kiện để không bị đánh lừa bởi một xếp hạng tín nhiệm cao gắn trên một sản phẩm rủi ro thực chất rất lớn.",
    openingQuestion: "Trong một cấu trúc CDO (Collateralized Debt Obligation), lớp Senior (senior tranche) có đặc điểm gì?",
    openingOptions: [
      "Chịu tổn thất đầu tiên khi danh mục tài sản cơ sở bắt đầu vỡ nợ, đổi lại lợi suất cao nhất",
      "Được ưu tiên nhận dòng tiền đầu tiên và chỉ chịu tổn thất sau khi các lớp thấp hơn đã bị xoá sổ hoàn toàn, nên xếp hạng tín nhiệm cao nhất và lợi suất thấp nhất",
      "Có mức rủi ro và lợi suất giống hệt tất cả các lớp khác trong cùng cấu trúc",
      "Không nhận bất kỳ dòng tiền nào từ danh mục tài sản cơ sở",
    ],
    correctOption: 1,
    explanation:
      "Cấu trúc CDO chia dòng tiền từ một rổ tài sản (thường là khoản vay, trái phiếu) thành nhiều lớp (tranche) theo thứ tự ưu tiên: Senior nhận trước, Mezzanine nhận sau, Equity (lớp thấp nhất) nhận cuối cùng và chịu tổn thất đầu tiên. Cơ chế này gọi là \"waterfall\" - dòng tiền chảy từ trên xuống, tổn thất hấp thụ từ dưới lên. Senior an toàn hơn không phải vì tài sản cơ sở ít rủi ro hơn, mà vì các lớp dưới đóng vai trò \"đệm\" hấp thụ tổn thất trước.",
    diagram: [
      { label: "Gộp hàng trăm/nghìn khoản vay vào một rổ tài sản (pool)", arrow: true },
      { label: "Cắt dòng tiền thành các lớp: Senior → Mezzanine → Equity", arrow: true },
      { label: "Dòng tiền chảy từ trên xuống (Senior nhận trước)", arrow: true },
      { label: "Tổn thất hấp thụ từ dưới lên (Equity chịu đầu tiên)" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "CDO thế chấp dưới chuẩn, 2004-2007",
      description:
        "Nhiều CDO được cấu trúc từ chính các lớp Mezzanine của những CDO khác (gọi là CDO-squared), khiến việc truy vết rủi ro thực sự nằm ở đâu trở nên gần như bất khả thi ngay cả với chính người mua. Lớp Senior của những cấu trúc này vẫn được xếp hạng AAA vì mô hình xếp hạng giả định tương quan thấp giữa các khoản vay dưới chuẩn gốc - đúng lỗi mô hình đã học ở chặng Foundations. Khi giá nhà giảm đồng loạt, ngay cả lớp Senior tưởng an toàn nhất cũng mất giá trị nghiêm trọng.",
    },
    quiz: [
      {
        question: "Vì sao lớp Equity (lớp thấp nhất) trong một CDO có lợi suất cao nhất?",
        options: [
          "Vì lớp Equity luôn được chính phủ bảo lãnh toàn bộ khi có vỡ nợ xảy ra trong danh mục tài sản cơ sở, giống như tiền gửi ngân hàng được bảo hiểm",
          "Vì lớp Equity chịu tổn thất đầu tiên khi danh mục tài sản bắt đầu vỡ nợ, nên nhà đầu tư đòi lợi suất cao hơn để bù đắp rủi ro lớn hơn nhiều",
          "Vì lớp Equity không chịu bất kỳ rủi ro nào từ danh mục tài sản cơ sở",
          "Vì quy định pháp luật bắt buộc lớp Equity phải có lợi suất cao nhất trong mọi cấu trúc",
        ],
        correct: 1,
        explanation:
          "Đây là nguyên tắc rủi ro-lợi suất áp dụng trong cấu trúc phân lớp: lớp chịu rủi ro tổn thất đầu tiên (Equity) phải được trả lợi suất cao hơn để bù đắp, trong khi lớp Senior được bảo vệ bởi các lớp dưới nên chấp nhận lợi suất thấp hơn nhiều.",
      },
      {
        question: "CDO-squared (CDO cấu trúc từ các lớp Mezzanine của CDO khác) tạo ra rủi ro gì đặc biệt nguy hiểm?",
        options: [
          "Không có rủi ro gì đặc biệt, đây chỉ là một biến thể kỹ thuật đơn giản của CDO thông thường mà bất kỳ nhà đầu tư cá nhân bình thường nào cũng có thể dễ dàng hiểu rõ và định giá chính xác",
          "Việc truy vết rủi ro thực sự nằm ở đâu trở nên gần như bất khả thi, kể cả với người mua, vì rủi ro bị xáo trộn và gộp lại qua nhiều lớp cấu trúc chồng lên nhau",
          "CDO-squared chỉ được phép giao dịch bởi chính phủ, không bán được cho nhà đầu tư tư nhân",
          "CDO-squared luôn có lợi suất thấp hơn CDO thông thường vì được coi là an toàn hơn",
        ],
        correct: 1,
        explanation:
          "Mỗi lớp cấu trúc thêm vào làm tăng độ mờ đục (opacity): nhà đầu tư mua lớp Senior của một CDO-squared gần như không thể biết chính xác những khoản vay gốc nào cuối cùng đứng sau khoản đầu tư của họ, hay mức độ tương quan thực sự giữa chúng.",
      },
      {
        question: "Vì sao lớp Senior của nhiều CDO thế chấp dưới chuẩn vẫn được xếp hạng AAA trước 2008 dù rủi ro thực tế lớn?",
        options: [
          "Vì các cơ quan xếp hạng dùng phương pháp hoàn toàn khác, không liên quan gì tới giả định tương quan giữa các khoản vay",
          "Vì mô hình xếp hạng giả định tương quan thấp giữa các khoản vay dưới chuẩn gốc, nên cấu trúc phân lớp được coi là đủ bảo vệ - giả định này sai khi giá nhà giảm đồng loạt toàn quốc",
          "Vì chính phủ Mỹ trực tiếp bảo lãnh cho mọi lớp Senior của tất cả các CDO tư nhân được phát hành trên thị trường, hoàn toàn tương tự như cách trái phiếu kho bạc Mỹ được bảo lãnh",
          "Vì lớp Senior không hề chịu bất kỳ ảnh hưởng nào từ biến động của tài sản cơ sở",
        ],
        correct: 1,
        explanation:
          "Đây chính xác là lỗi mô hình đã học ở chặng Foundations (LTCM, subprime MBS): giả định tương quan thấp trong điều kiện lịch sử \"bình thường\" không còn đúng khi cú sốc hệ thống (giá nhà giảm đồng loạt) xảy ra, khiến ngay cả lớp được coi là an toàn nhất cũng mất giá trị nghiêm trọng.",
      },
      {
        question: "Cơ chế \"waterfall\" trong một CDO hoạt động như thế nào?",
        options: [
          "Dòng tiền chảy từ trên xuống (Senior nhận trước), còn tổn thất hấp thụ từ dưới lên (Equity chịu trước) - hai chiều ngược nhau của cùng một cấu trúc",
          "Dòng tiền và tổn thất đều chảy từ trên xuống theo cùng một chiều duy nhất trong mọi cấu trúc CDO, không hề có sự khác biệt nào giữa cách phân bổ hai loại này cho từng lớp",
          "Mỗi lớp nhận một phần dòng tiền và một phần tổn thất bằng nhau, chia đều theo tỷ lệ mệnh giá nắm giữ",
          "Lớp Equity luôn nhận dòng tiền trước tất cả các lớp khác trong mọi trường hợp",
        ],
        correct: 0,
        explanation:
          "Đây là bản chất của tên gọi \"waterfall\": hình dung dòng tiền như nước chảy từ đỉnh thác xuống, lấp đầy bể Senior trước, rồi mới tràn xuống Mezzanine, cuối cùng mới tới Equity. Tổn thất thì ngược lại - như nước rút từ đáy lên, Equity cạn trước, rồi mới ảnh hưởng tới Mezzanine, và chỉ tới Senior khi cả hai lớp dưới đã bị xoá sổ hoàn toàn.",
      },
    
    {
      "question": "Vì sao lớp cao nhất của nhiều sản phẩm cấu trúc dưới chuẩn vẫn được xếp hạng cao nhất trước 2008?",
      "options": [
        "Vì mô hình giả định các khoản vay hầu như không cùng vỡ nợ",
        "Vì tổ chức xếp hạng không được tiếp cận dữ liệu của các khoản vay gốc",
        "Vì lớp này được một tổ chức bảo hiểm đứng ra bảo lãnh toàn bộ",
        "Vì phần lớn khoản vay trong rổ đều có tài sản bảo đảm giá trị cao"
      ],
      "correct": 0,
      "explanation": "Toàn bộ phép màu nằm ở giả định tương quan thấp: nếu vỡ nợ rải rác thì lớp dưới hấp thụ hết và lớp trên gần như an toàn. Khi giá nhà giảm trên cả nước, các khoản vay vỡ cùng lúc, và lớp đệm bên dưới bốc hơi trong vài tháng."
    }
    ],
    keyTakeaways: [
      "CDO chia dòng tiền từ một rổ tài sản thành nhiều lớp (tranche): Senior nhận trước và chịu tổn thất sau cùng, Equity nhận sau cùng và chịu tổn thất trước",
      "Lợi suất cao hơn ở lớp thấp bù đắp cho việc chịu rủi ro tổn thất đầu tiên - nguyên tắc rủi ro-lợi suất áp dụng trong cấu trúc phân lớp",
      "CDO-squared (cấu trúc từ lớp Mezzanine của CDO khác) làm rủi ro gần như không thể truy vết, ngay cả với người mua",
      "Xếp hạng AAA của lớp Senior trước 2008 dựa trên giả định tương quan thấp sai lầm - cùng lỗi mô hình đã thấy ở LTCM và subprime MBS",
    ],
    summary: {
      keyIdea: "Chia tranche không làm rủi ro biến mất, nó chỉ phân phối lại: lớp thấp nhận tổn thất đầu tiên và được trả nhiều hơn vì đúng chuyện đó.",
      commonMistake: "Tin vào xếp hạng AAA của lớp Senior mà không hỏi giả định tương quan đứng sau nó. Đó chính là chỗ hỏng năm 2008.",
    },
    application: {
      title: "Câu hỏi cho mọi sản phẩm cấu trúc",
      message: "Hỏi lớp này chịu tổn thất khi rổ tài sản mất bao nhiêu phần trăm, và giả định tương quan nào tạo ra con số đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Chứng khoán hoá tự nó không phải là điều xấu - nó cho phép ngân hàng giải phóng vốn từ những khoản vay đã cấp để tiếp tục cho vay mới, và cho phép nhà đầu tư chọn đúng mức rủi ro họ muốn chấp nhận. Vấn đề nằm ở cách cấu trúc phân lớp bị lạm dụng để biến rủi ro cao thành một nhãn AAA.",
      },
      {
        type: "heading",
        text: "Cấu trúc phân lớp (Tranching)",
      },
      {
        type: "conceptTable",
        title: "Ba lớp cơ bản của một CDO",
        subtitle: "Thứ tự ưu tiên nhận dòng tiền, ngược lại với thứ tự chịu tổn thất",
        concepts: [
          { vi: "Senior", en: "Senior tranche", def: "Nhận dòng tiền đầu tiên, chịu tổn thất sau cùng. Xếp hạng tín nhiệm cao nhất, lợi suất thấp nhất." },
          { vi: "Mezzanine", en: "Mezzanine tranche", def: "Ở giữa - nhận dòng tiền sau Senior, chịu tổn thất sau Equity. Rủi ro và lợi suất trung bình." },
          { vi: "Equity", en: "Equity/first-loss tranche", def: "Nhận dòng tiền cuối cùng, chịu tổn thất đầu tiên. Lợi suất cao nhất, thường do bên khởi tạo (originator) giữ lại một phần để tạo động lực thẩm định kỹ." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao \"an toàn\" không có nghĩa là \"không rủi ro\"",
        text: "Lớp Senior an toàn hơn Equity trong điều kiện bình thường, nhưng \"an toàn hơn\" khác với \"không rủi ro\". Khi tổn thất trong danh mục tài sản cơ sở vượt quá khả năng hấp thụ của các lớp dưới - đúng điều đã xảy ra năm 2008 khi giá nhà giảm đồng loạt toàn quốc - ngay cả lớp Senior cũng mất giá trị nghiêm trọng, dù mô hình xếp hạng ban đầu coi khả năng đó gần như bằng không.",
      },
      {
        type: "closing",
        lines: [
          "Một xếp hạng tín nhiệm cao chỉ tốt bằng chất lượng của giả định đứng sau nó - và giả định tương quan luôn là điểm yếu nhất trong mọi cấu trúc phân lớp.",
          "Bài sau khép lại môn Credit Risk: rủi ro tín dụng đối tác (CVA) và cách đo lường rủi ro tín dụng ở cấp độ toàn danh mục.",
        ],
      },
    ],
  },
  {
    id: 1559,
    slug: "rui-ro-tin-dung-doi-tac-cva-va-danh-muc",
    title: "FRM Credit Risk, Bài 3: Rủi ro tín dụng đối tác (CVA) và mô hình rủi ro tín dụng danh mục",
    subtitle: "Vì sao một hợp đồng phái sinh có giá trị dương với bạn vẫn có thể khiến bạn mất tiền",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🤝",
    track: "professional",
    whyItMatters:
      "Rủi ro tín dụng không chỉ nằm ở người vay tiền trực tiếp. Bất kỳ hợp đồng phái sinh nào (swap lãi suất, forward, CDS) đều có rủi ro rằng đối tác bên kia không thực hiện được nghĩa vụ khi hợp đồng có giá trị dương với bạn. CVA (Credit Valuation Adjustment) là cách định lượng chính xác chi phí của rủi ro đó, và là một trong những khoản mục vốn Basel III yêu cầu ngân hàng phải trích lập riêng.",
    openingQuestion: "CVA (Credit Valuation Adjustment) đo lường điều gì?",
    openingOptions: [
      "Chi phí vốn cần thiết để mở một chi nhánh ngân hàng mới ở khu vực rủi ro cao",
      "Khoản điều chỉnh giảm giá trị của một hợp đồng phái sinh để phản ánh rủi ro rằng đối tác giao dịch (counterparty) có thể vỡ nợ trước khi hợp đồng đáo hạn",
      "Tỷ lệ nợ xấu trung bình của toàn ngành ngân hàng trong một năm tài chính",
      "Mức phí bảo hiểm tiền gửi mà ngân hàng phải nộp cho cơ quan bảo hiểm tiền gửi",
    ],
    correctOption: 1,
    explanation:
      "CVA = giá trị thị trường của hợp đồng phái sinh (không có rủi ro đối tác) trừ đi phần điều chỉnh do rủi ro đối tác vỡ nợ. Về bản chất, CVA định giá chính xác một câu hỏi đơn giản: nếu đối tác của tôi vỡ nợ đúng lúc hợp đồng đang có lợi cho tôi, tôi mất bao nhiêu? Con số này càng lớn khi xác suất vỡ nợ của đối tác càng cao và khi giá trị kỳ vọng của hợp đồng càng lớn.",
    diagram: [
      { label: "Ký hợp đồng phái sinh với một đối tác (ví dụ swap lãi suất)", arrow: true },
      { label: "Giá trị hợp đồng biến động theo thị trường, có lúc dương có lúc âm với bạn", arrow: true },
      { label: "Nếu đối tác vỡ nợ đúng lúc hợp đồng có giá trị dương với bạn", arrow: true },
      { label: "Bạn mất phần giá trị đó - CVA là chi phí kỳ vọng của rủi ro này" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Lehman Brothers, 2008",
      description:
        "Khi Lehman Brothers phá sản, hàng nghìn đối tác giao dịch phái sinh (chủ yếu swap lãi suất và CDS) trên toàn cầu đột nhiên phải xử lý rủi ro đối tác đã hiện thực hoá: các hợp đồng đang có giá trị dương với họ (Lehman nợ họ) trở thành khoản phải đòi trong thủ tục phá sản kéo dài nhiều năm, thường chỉ thu hồi được một phần nhỏ giá trị. Sự kiện này là lý do trực tiếp khiến Basel III đưa yêu cầu vốn CVA vào khung quy định - trước đó, nhiều ngân hàng không trích lập vốn riêng cho loại rủi ro này.",
    },
    quiz: [
      {
        question: "Vì sao CVA chỉ phát sinh khi hợp đồng phái sinh có giá trị dương với bạn, không phải khi nó có giá trị âm?",
        options: [
          "Vì hợp đồng phái sinh không bao giờ có giá trị âm trong thực tế",
          "Vì nếu hợp đồng có giá trị âm với bạn (tức bạn đang nợ đối tác), việc đối tác vỡ nợ không gây tổn thất cho bạn - bạn vẫn nợ họ số tiền đó dù họ còn tồn tại hay không",
          "Vì CVA chỉ áp dụng cho các hợp đồng có kỳ hạn dưới một năm",
          "Vì quy định Basel III cấm hoàn toàn việc tính CVA cho bất kỳ hợp đồng phái sinh nào đang có giá trị âm tại thời điểm định giá, bất kể loại hợp đồng hay đối tác giao dịch",
        ],
        correct: 1,
        explanation:
          "Rủi ro đối tác một chiều: chỉ khi đối tác NỢ bạn (hợp đồng có giá trị dương với bạn) thì việc họ vỡ nợ mới khiến bạn mất tiền. Nếu bạn nợ họ, việc họ vỡ nợ không thay đổi nghĩa vụ của bạn - đây là lý do CVA được tính dựa trên phần giá trị dương kỳ vọng (expected positive exposure), không phải toàn bộ giá trị hợp đồng.",
      },
      {
        question: "Yêu cầu vốn CVA theo Basel III được thêm vào khung quy định chủ yếu vì lý do gì?",
        options: [
          "Vì các cơ quan quản lý muốn tăng doanh thu thuế từ ngành ngân hàng",
          "Vì khủng hoảng 2008 (đặc biệt sự kiện Lehman Brothers) cho thấy nhiều ngân hàng chịu tổn thất lớn từ rủi ro đối tác trên các hợp đồng phái sinh mà trước đó không được trích lập vốn dự phòng riêng",
          "Vì CVA thay thế hoàn toàn cho yêu cầu vốn tín dụng thông thường của Basel II",
          "Vì các ngân hàng tự nguyện đề xuất thêm yêu cầu vốn này để tăng uy tín với nhà đầu tư và cơ quan xếp hạng tín nhiệm quốc tế, hoàn toàn không phải do áp lực từ cơ quan quản lý nhà nước",
        ],
        correct: 1,
        explanation:
          "Trước khủng hoảng 2008, rủi ro tín dụng đối tác trên sổ phái sinh phần lớn nằm ngoài các yêu cầu vốn chính thức. Sự sụp đổ của Lehman cho thấy loại tổn thất này (gọi là \"CVA losses\") có thể lớn hơn cả tổn thất do vỡ nợ trực tiếp trong nhiều trường hợp, dẫn tới Basel III chính thức yêu cầu vốn riêng cho rủi ro CVA.",
      },
      {
        question: "Mô hình rủi ro tín dụng danh mục (portfolio credit risk model) khác gì so với đánh giá tín dụng từng khoản vay riêng lẻ?",
        options: [
          "Không có khác biệt gì, hai cách tiếp cận cho ra cùng một kết quả",
          "Mô hình danh mục tính đến tương quan vỡ nợ giữa các khoản vay/đối tác khác nhau, vì tổn thất tổng của danh mục phụ thuộc vào việc các khoản vay có xu hướng vỡ nợ cùng lúc hay độc lập với nhau",
          "Mô hình danh mục chỉ áp dụng được cho các khoản vay có cùng một mức xếp hạng tín nhiệm, hoàn toàn không dùng được khi danh mục có nhiều mức xếp hạng khác nhau trong cùng một rổ tài sản đầu tư",
          "Mô hình danh mục bỏ qua hoàn toàn xác suất vỡ nợ của từng khoản vay riêng lẻ",
        ],
        correct: 1,
        explanation:
          "Đây là lý do tương quan tín dụng (credit correlation) là tham số quan trọng nhất và khó ước lượng nhất trong quản trị rủi ro tín dụng danh mục - đúng vấn đề đã gây ra thất bại của các mô hình CDO trước 2008: đánh giá thấp mức độ các khoản vay có thể vỡ nợ đồng loạt trong một cú sốc hệ thống.",
      },
      {
        question: "Nếu xác suất vỡ nợ của một đối tác tăng lên (ví dụ xếp hạng tín nhiệm bị hạ), điều gì xảy ra với CVA của các hợp đồng đang có giá trị dương với đối tác đó?",
        options: [
          "CVA tăng lên, vì rủi ro không nhận được khoản đối tác đang nợ bạn tăng theo xác suất vỡ nợ cao hơn",
          "CVA không thay đổi, vì CVA chỉ phụ thuộc vào giá trị thị trường của hợp đồng, không liên quan tới xếp hạng tín nhiệm",
          "CVA giảm xuống, vì đối tác rủi ro cao thường phải trả phí giao dịch thấp hơn để bù đắp",
          "CVA trở thành số âm, biến hợp đồng thành một khoản lợi nhuận chắc chắn",
        ],
        correct: 0,
        explanation:
          "CVA tỷ lệ thuận với xác suất vỡ nợ của đối tác - khi rủi ro đối tác tăng, chi phí kỳ vọng của việc không nhận được khoản họ đang nợ (nếu hợp đồng có giá trị dương với bạn) cũng tăng theo, buộc ngân hàng phải ghi nhận một khoản lỗ CVA ngay cả khi chưa có sự kiện vỡ nợ thực sự nào xảy ra.",
      },
    
    {
      "question": "Vì sao điều chỉnh định giá tín dụng chỉ phát sinh khi hợp đồng phái sinh đang có giá trị dương với bạn?",
      "options": [
        "Vì chỉ khi đó bạn mới là bên có khoản phải thu nếu đối tác vỡ nợ",
        "Vì hợp đồng có giá trị âm sẽ tự động được chấm dứt trước hạn",
        "Vì bên có giá trị âm không phải nộp tài sản bảo đảm cho đối tác",
        "Vì chuẩn kế toán chỉ yêu cầu ghi nhận điều chỉnh cho phần tài sản"
      ],
      "correct": 0,
      "explanation": "Đối tác vỡ nợ khi họ đang nợ bạn thì bạn mất tiền; vỡ nợ khi bạn đang nợ họ thì bạn không được lợi gì thêm. Rủi ro tín dụng đối tác vì vậy chỉ tồn tại ở một chiều - và chính tính bất đối xứng đó khiến việc định giá nó phức tạp."
    }
    ],
    keyTakeaways: [
      "CVA định lượng chi phí rủi ro rằng đối tác giao dịch phái sinh vỡ nợ đúng lúc hợp đồng đang có giá trị dương với bạn",
      "CVA chỉ phát sinh từ phần giá trị dương kỳ vọng - nếu bạn đang nợ đối tác, việc họ vỡ nợ không gây tổn thất cho bạn",
      "Lehman Brothers (2008) là lý do trực tiếp Basel III thêm yêu cầu vốn CVA - tổn thất từ rủi ro đối tác phái sinh từng nằm ngoài khung vốn chính thức",
      "Mô hình rủi ro tín dụng danh mục cần tính tương quan vỡ nợ giữa các khoản vay, không chỉ xác suất vỡ nợ riêng lẻ - cùng bài học tương quan đã thấy ở CDO",
    ],
    practicePrompt: {
      question: "Một ngân hàng ký hợp đồng swap lãi suất với một công ty vừa bị hạ xếp hạng tín nhiệm từ A xuống BB. Hợp đồng hiện đang có giá trị dương 5 triệu USD với ngân hàng. Điều gì nên xảy ra với khoản CVA ngân hàng ghi nhận?",
      options: [
        "CVA nên tăng lên, vì xác suất vỡ nợ của đối tác tăng làm tăng chi phí kỳ vọng của việc không thu được khoản 5 triệu USD đang có lợi cho ngân hàng",
        "CVA không cần điều chỉnh vì hợp đồng đã ký, xếp hạng tín nhiệm sau này không còn liên quan",
        "Ngân hàng nên xoá bỏ hoàn toàn giá trị hợp đồng khỏi sổ sách ngay lập tức",
        "CVA chỉ áp dụng cho hợp đồng CDS, không áp dụng cho swap lãi suất",
      ],
      correct: 0,
      explanation:
        "CVA phải được cập nhật liên tục theo cả giá trị thị trường của hợp đồng lẫn xác suất vỡ nợ hiện tại của đối tác (thường ước lượng từ CDS spread nếu có). Xếp hạng giảm là tín hiệu trực tiếp cần điều chỉnh CVA tăng lên.",
    },
    summary: {
      keyIdea: "Chỉ phần giá trị dương mới tạo phơi nhiễm - nếu hợp đồng đang âm với bạn thì đối tác vỡ nợ không làm bạn mất gì. Đó là lý do mọi công thức CVA đều có max(·, 0).",
      commonMistake: "Tính phơi nhiễm trên giá trị danh nghĩa. Con số danh nghĩa gần như luôn lớn hơn phơi nhiễm thật rất nhiều lần.",
    },
    application: {
      title: "Sau khi đo phơi nhiễm",
      message: "Phần lớn việc giảm rủi ro đối tác nằm ở điều khoản bù trừ và cơ chế tài sản bảo đảm, không nằm ở mô hình. Mô hình chỉ đo phần còn lại sau khi hai thứ kia đã làm việc.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước học về rủi ro tín dụng của người vay trực tiếp và của một rổ tài sản được chứng khoán hoá. Bài này khép lại môn Credit Risk với một góc nhìn khác: rủi ro tín dụng ẩn trong chính các hợp đồng phái sinh mà nhiều người không nghĩ tới như một khoản tín dụng.",
      },
      {
        type: "heading",
        text: "CVA: định giá rủi ro đối tác",
      },
      {
        type: "formula",
        title: "Công thức khái niệm CVA",
        label: "CVA",
        equation: "CVA ≈ Xác suất vỡ nợ của đối tác × (1 − Tỷ lệ thu hồi) × Giá trị dương kỳ vọng của hợp đồng",
        variables: [
          { symbol: "PD", name: "Xác suất vỡ nợ", description: "Ước lượng từ CDS spread của đối tác nếu có, hoặc từ mô hình xếp hạng nội bộ" },
          { symbol: "EPE", name: "Expected Positive Exposure", description: "Giá trị dương kỳ vọng của hợp đồng tại các thời điểm trong tương lai, tính bằng mô phỏng" },
        ],
        example: {
          title: "Đọc kết quả",
          calculation: "PD = 5%, tỷ lệ thu hồi = 40%, EPE = 2 triệu USD",
          result: "CVA ≈ 5% × 60% × 2 triệu = 60.000 USD",
          explanation: "Đây là chi phí ngân hàng phải ghi nhận ngay khi ký hợp đồng, phản ánh rủi ro đối tác trong suốt vòng đời giao dịch, không chờ tới khi vỡ nợ thực sự xảy ra.",
        },
      },
      {
        type: "callout",
        label: "Liên hệ với tương quan tín dụng",
        text: "Ở cấp độ danh mục, rủi ro tín dụng không đơn giản là tổng các rủi ro riêng lẻ cộng lại. Nếu một ngân hàng có 100 hợp đồng phái sinh với 100 đối tác khác nhau nhưng tất cả đều hoạt động trong cùng một ngành (ví dụ năng lượng), một cú sốc giá dầu có thể khiến nhiều đối tác vỡ nợ cùng lúc - đúng mẫu hình tương quan hội tụ trong khủng hoảng đã học ở chặng Foundations.",
      },
      {
        type: "closing",
        lines: [
          "Rủi ro tín dụng không chỉ nằm ở người vay tiền - nó ẩn trong mọi hợp đồng nơi một bên có thể nợ bên kia, kể cả một hợp đồng phái sinh trông thuần tuý kỹ thuật.",
          "Môn Credit Risk Measurement and Management khép lại ở đây; chặng tiếp theo chuyển sang một môn khác thường bị xem nhẹ vì chỉ chiếm 10% đề thi - Current Issues in Financial Markets.",
        ],
      },
    ],
  },

  // ═══════════════ CURRENT ISSUES IN FINANCIAL MARKETS ═══════════════
  {
    id: 1560,
    slug: "ngan-hang-ngam-shadow-banking",
    title: "FRM Current Issues, Bài 1: Ngân hàng ngầm (Shadow Banking) và rủi ro hệ thống ngoài bảng cân đối",
    subtitle: "Khi các chức năng của ngân hàng được thực hiện bởi những tổ chức không chịu giám sát như ngân hàng",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🌘",
    track: "professional",
    whyItMatters:
      "Ngày càng nhiều hoạt động tín dụng - cho vay, kỳ hạn hoá tài sản, tạo thanh khoản - diễn ra bên ngoài hệ thống ngân hàng được giám sát chặt chẽ, tại các quỹ đầu tư tư nhân, quỹ thị trường tiền tệ, và các nền tảng cho vay phi ngân hàng. Vì các tổ chức này không có mạng lưới an toàn (bảo hiểm tiền gửi, cửa sổ chiết khấu ngân hàng trung ương) như ngân hàng truyền thống, rủi ro hệ thống có thể tích luỹ ở nơi ít được giám sát nhất.",
    openingQuestion: "\"Ngân hàng ngầm\" (shadow banking) đề cập tới điều gì?",
    openingOptions: [
      "Các hoạt động ngân hàng bất hợp pháp, trốn thuế hoặc rửa tiền có tổ chức",
      "Các tổ chức tài chính phi ngân hàng (quỹ đầu tư, quỹ thị trường tiền tệ, nền tảng cho vay) thực hiện các chức năng giống ngân hàng - trung gian tín dụng, chuyển đổi kỳ hạn - nhưng không chịu khung giám sát và mạng lưới an toàn như ngân hàng chính thức",
      "Chỉ các ngân hàng nước ngoài hoạt động không có giấy phép tại một quốc gia",
      "Một thuật ngữ lỗi thời không còn được các cơ quan quản lý tài chính quốc tế sử dụng",
    ],
    correctOption: 1,
    explanation:
      "Shadow banking không có nghĩa là bất hợp pháp - phần lớn là hoạt động hoàn toàn hợp pháp: quỹ thị trường tiền tệ, quỹ tín dụng tư nhân (private credit), các nền tảng cho vay ngang hàng. Điểm chung là chúng thực hiện chức năng trung gian tín dụng tương tự ngân hàng (nhận vốn ngắn hạn, cho vay dài hạn) nhưng không có bảo hiểm tiền gửi hay quyền tiếp cận thanh khoản khẩn cấp từ ngân hàng trung ương khi khủng hoảng xảy ra.",
    diagram: [
      { label: "Nhà đầu tư góp vốn vào quỹ thị trường tiền tệ/quỹ tín dụng tư nhân", arrow: true },
      { label: "Quỹ cho vay hoặc mua tài sản có kỳ hạn dài hơn nhiều so với vốn góp", arrow: true },
      { label: "Không có bảo hiểm tiền gửi hay cửa sổ chiết khấu ngân hàng trung ương", arrow: true },
      { label: "Khi hoảng loạn xảy ra, rút vốn ồ ạt không có \"người cho vay cuối cùng\" hỗ trợ" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Quỹ thị trường tiền tệ Reserve Primary Fund, 2008",
      description:
        "Sau khi Lehman Brothers phá sản, Reserve Primary Fund - một quỹ thị trường tiền tệ lớn nắm giữ giấy tờ thương mại của Lehman - \"vỡ mệnh giá\" (broke the buck), tức giá trị tài sản ròng trên mỗi cổ phần giảm xuống dưới 1 USD, điều gần như chưa từng xảy ra trước đó với loại quỹ này. Sự kiện gây ra làn sóng rút vốn hàng loạt khỏi toàn bộ ngành quỹ thị trường tiền tệ trong vài ngày, buộc Bộ Tài chính Mỹ phải tung ra chương trình bảo lãnh khẩn cấp chưa từng có tiền lệ để ngăn sự sụp đổ lan rộng sang thị trường giấy tờ thương mại toàn nền kinh tế.",
    },
    quiz: [
      {
        question: "Vì sao các tổ chức shadow banking dễ tổn thương hơn ngân hàng truyền thống trong khủng hoảng thanh khoản?",
        options: [
          "Vì shadow banking luôn có tỷ lệ nợ xấu cao hơn ngân hàng truyền thống trong mọi giai đoạn của chu kỳ kinh tế, kể cả giai đoạn kinh tế đang tăng trưởng ổn định và lãi suất duy trì ở mức thấp trong thời gian dài",
          "Vì chúng không có bảo hiểm tiền gửi hay quyền tiếp cận cửa sổ chiết khấu của ngân hàng trung ương - khi hoảng loạn xảy ra, không có \"người cho vay cuối cùng\" nào hỗ trợ thanh khoản khẩn cấp",
          "Vì shadow banking bị cấm hoạt động tại hầu hết các quốc gia phát triển",
          "Vì shadow banking chỉ phục vụ khách hàng cá nhân, không phục vụ doanh nghiệp",
        ],
        correct: 1,
        explanation:
          "Ngân hàng truyền thống có hai lớp bảo vệ khi khủng hoảng thanh khoản xảy ra: bảo hiểm tiền gửi (giảm động lực người gửi rút tiền hàng loạt) và cửa sổ chiết khấu ngân hàng trung ương (nguồn thanh khoản khẩn cấp). Các tổ chức shadow banking không có cả hai, nên một cú sốc niềm tin có thể lan nhanh hơn nhiều - đúng như trường hợp Reserve Primary Fund.",
      },
      {
        question: "Sự kiện Reserve Primary Fund \"vỡ mệnh giá\" năm 2008 gây ra hậu quả gì mang tính hệ thống?",
        options: [
          "Chỉ ảnh hưởng tới các nhà đầu tư của riêng quỹ đó, hoàn toàn không lan sang bất kỳ tổ chức hay quỹ đầu tư nào khác trong cùng ngành quỹ thị trường tiền tệ toàn cầu",
          "Gây ra làn sóng rút vốn hàng loạt khỏi toàn bộ ngành quỹ thị trường tiền tệ, buộc chính phủ phải tung chương trình bảo lãnh khẩn cấp chưa từng có tiền lệ",
          "Khiến chính phủ Mỹ quyết định đóng cửa vĩnh viễn toàn bộ ngành quỹ thị trường tiền tệ",
          "Không có tác động đáng kể nào tới thị trường giấy tờ thương mại của nền kinh tế",
        ],
        correct: 1,
        explanation:
          "Đây là ví dụ kinh điển của rủi ro lan truyền (contagion risk) trong hệ thống shadow banking: một sự kiện tại một quỹ đơn lẻ làm mất niềm tin vào cả loại hình sản phẩm, kích hoạt rút vốn hàng loạt vượt xa quy mô vấn đề ban đầu.",
      },
      {
        question: "Vì sao các cơ quan quản lý coi shadow banking là một \"vấn đề thời sự\" (current issue) đáng theo dõi liên tục, thay vì một rủi ro đã được giải quyết dứt điểm sau 2008?",
        options: [
          "Vì shadow banking đã hoàn toàn biến mất khỏi hệ thống tài chính toàn cầu ngay sau các cải cách quy định hậu khủng hoảng 2008, theo báo cáo chính thức của Uỷ ban Ổn định Tài chính (FSB) công bố hằng năm kể từ đó",
          "Vì quy mô và hình thức của hoạt động tín dụng phi ngân hàng (như quỹ tín dụng tư nhân, cho vay fintech) liên tục thay đổi và mở rộng, thường di chuyển sang đúng những khoảng trống mà quy định mới chưa kịp bao phủ",
          "Vì luật pháp hiện tại đã cấm hoàn toàn mọi hình thức shadow banking trên toàn thế giới",
          "Vì đây chỉ là vấn đề mang tính lịch sử, không còn liên quan tới thị trường tài chính hiện đại",
        ],
        correct: 1,
        explanation:
          "Đây chính là bản chất của một \"current issue\" trong FRM: rủi ro không tĩnh, nó di chuyển. Khi quy định siết chặt ngân hàng truyền thống sau 2008, một phần hoạt động tín dụng chuyển sang các kênh ít giám sát hơn (private credit đã tăng trưởng mạnh trong thập kỷ qua), đòi hỏi risk manager phải liên tục theo dõi nơi rủi ro đang di chuyển tới, không chỉ nơi nó từng xảy ra.",
      },
      {
        question: "Chức năng \"chuyển đổi kỳ hạn\" (maturity transformation) mà cả ngân hàng truyền thống lẫn shadow banking đều thực hiện là gì?",
        options: [
          "Chuyển đổi tiền tệ giao dịch từ đồng nội tệ sang ngoại tệ mạnh",
          "Nhận vốn có kỳ hạn ngắn (tiền gửi có thể rút bất kỳ lúc nào, hoặc cổ phần quỹ thị trường tiền tệ) và cho vay/đầu tư vào tài sản có kỳ hạn dài hơn nhiều",
          "Chuyển đổi trái phiếu doanh nghiệp thành cổ phiếu thông qua quyền chọn chuyển đổi được quy định sẵn trong điều khoản phát hành ban đầu của tổ chức phát hành",
          "Chuyển đổi tài sản từ hình thức hữu hình sang hình thức số hoá trên blockchain",
        ],
        correct: 1,
        explanation:
          "Đây là chức năng kinh tế cốt lõi mà cả ngân hàng truyền thống lẫn shadow banking cùng thực hiện, và cũng là nguồn gốc của lệch kỳ hạn - đúng vấn đề đã học ở chặng Liquidity and Treasury Risk (Northern Rock, SVB), chỉ khác là shadow banking thực hiện chức năng này mà không có mạng lưới an toàn đi kèm.",
      },
    
    {
      "question": "Vì sao các tổ chức tín dụng ngoài hệ thống ngân hàng dễ tổn thương hơn trong khủng hoảng thanh khoản?",
      "options": [
        "Vì họ không có cửa sổ chiết khấu lẫn bảo hiểm tiền gửi",
        "Vì họ không được phép nắm giữ tài sản thanh khoản chất lượng cao",
        "Vì hoạt động của họ nằm ngoài khuôn khổ pháp luật hiện hành",
        "Vì họ chỉ huy động vốn từ nhà đầu tư cá nhân nhỏ lẻ"
      ],
      "correct": 0,
      "explanation": "Họ làm cùng một việc là chuyển kỳ hạn - huy động ngắn để cho vay dài - nhưng không có lưới an toàn nào phía sau. Khi nguồn tài trợ ngắn hạn đóng lại, không có người cho vay cuối cùng, và họ buộc phải bán tài sản đúng lúc giá xấu nhất."
    }
    ],
    keyTakeaways: [
      "Shadow banking là các tổ chức phi ngân hàng thực hiện chức năng trung gian tín dụng tương tự ngân hàng nhưng không có bảo hiểm tiền gửi hay cửa sổ chiết khấu ngân hàng trung ương",
      "Reserve Primary Fund (2008): một sự kiện tại một quỹ đơn lẻ kích hoạt rút vốn hàng loạt khỏi cả ngành quỹ thị trường tiền tệ",
      "Chức năng chuyển đổi kỳ hạn tạo ra cùng loại rủi ro lệch kỳ hạn đã học ở Liquidity Risk, nhưng thiếu mạng lưới an toàn của ngân hàng truyền thống",
      "Rủi ro shadow banking không tĩnh - nó di chuyển tới nơi quy định mới chưa kịp bao phủ, nên đòi hỏi giám sát liên tục thay vì coi là vấn đề đã giải quyết xong",
    ],
    summary: {
      keyIdea: "Shadow banking làm đúng việc của ngân hàng - chuyển đổi kỳ hạn - nhưng không có mạng an toàn của ngân hàng, nên cùng một rủi ro lệch kỳ hạn ở đó không có ai đỡ.",
      commonMistake: "Coi đây là một danh mục cố định các tổ chức. Nó là một chức năng, và nó di chuyển tới nơi quy định chưa với tới.",
    },
    application: {
      title: "Nhìn theo chức năng thay vì theo tên",
      message: "Hỏi ai đang vay ngắn để cho vay dài trong hệ thống này, và ai sẽ đỡ nếu bên cho vay ngắn cùng rút một lúc.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau khủng hoảng 2008, các quy định như Basel III siết chặt đáng kể ngân hàng truyền thống. Nhưng nhu cầu tín dụng của nền kinh tế không biến mất - nó tìm đường khác. Phần \"đường khác\" đó, hoạt động ngoài khung giám sát ngân hàng, chính là shadow banking.",
      },
      {
        type: "heading",
        text: "Cùng chức năng, khác mạng lưới an toàn",
      },
      {
        type: "comparison",
        left: { label: "Ngân hàng truyền thống", text: "Nhận tiền gửi, cho vay - có bảo hiểm tiền gửi và cửa sổ chiết khấu ngân hàng trung ương làm mạng lưới an toàn khi khủng hoảng thanh khoản xảy ra." },
        right: { label: "Shadow banking", text: "Quỹ thị trường tiền tệ, quỹ tín dụng tư nhân, nền tảng cho vay - thực hiện chức năng tương tự nhưng không có mạng lưới an toàn tương đương." },
      },
      {
        type: "callout",
        label: "Private credit - làn sóng mới nhất",
        text: "Trong thập kỷ gần đây, các quỹ tín dụng tư nhân (private credit funds) đã tăng trưởng mạnh, lấp vào khoảng trống cho vay doanh nghiệp vừa và nhỏ mà ngân hàng truyền thống rút bớt sau các quy định vốn chặt chẽ hơn. Đây là ví dụ hiện tại nhất của việc rủi ro tín dụng di chuyển sang một kênh ít minh bạch và ít giám sát hơn - đúng loại \"current issue\" mà GARP muốn người học theo dõi liên tục, không chỉ nhìn lại quá khứ.",
      },
      {
        type: "closing",
        lines: [
          "Giám sát rủi ro hệ thống không thể chỉ nhìn vào bảng cân đối kế toán của ngân hàng - phải nhìn cả nơi các chức năng của ngân hàng đang được thực hiện bởi ai khác.",
          "Bài cuối cùng của chặng: khi các tổ chức tài chính liên kết chặt chẽ tới mức một tổ chức sụp đổ có thể kéo theo cả hệ thống - rủi ro liên kết hệ thống.",
        ],
      },
    ],
  },
  {
    id: 1561,
    slug: "rui-ro-lien-ket-he-thong-too-interconnected",
    title: "FRM Current Issues, Bài 2: Rủi ro liên kết hệ thống - Too-Interconnected-to-Fail",
    subtitle: "Vì sao quy mô không phải là thước đo duy nhất của tầm quan trọng hệ thống của một tổ chức tài chính",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🕸️",
    track: "professional",
    whyItMatters:
      "Sau 2008, thuật ngữ \"too-big-to-fail\" (quá lớn để sụp đổ) trở nên quen thuộc. Nhưng AIG không phải ngân hàng lớn nhất, và sự sụp đổ của nó vẫn đe doạ cả hệ thống - vì nó liên kết với hàng nghìn đối tác qua thị trường CDS. Bài học quan trọng nhất của khủng hoảng cho quản trị rủi ro hệ thống là: mức độ liên kết (interconnectedness), không chỉ quy mô, mới quyết định một tổ chức có gây rủi ro hệ thống hay không.",
    openingQuestion: "\"Too-interconnected-to-fail\" khác gì với \"too-big-to-fail\"?",
    openingOptions: [
      "Hai khái niệm hoàn toàn giống nhau, chỉ là hai cách diễn đạt khác nhau của cùng một ý",
      "Too-big-to-fail dựa trên quy mô tài sản của một tổ chức; too-interconnected-to-fail dựa trên mức độ tổ chức đó liên kết với các tổ chức khác trong hệ thống (qua phái sinh, cho vay liên ngân hàng, thanh toán), nên một tổ chức tương đối nhỏ vẫn có thể gây rủi ro hệ thống lớn nếu liên kết đủ dày đặc",
      "Too-interconnected-to-fail chỉ áp dụng cho các công ty công nghệ, không áp dụng cho tổ chức tài chính",
      "Too-big-to-fail là khái niệm mới hơn, thay thế hoàn toàn cho too-interconnected-to-fail sau 2008",
    ],
    correctOption: 1,
    explanation:
      "AIG là ví dụ kinh điển: không phải ngân hàng lớn nhất nước Mỹ, nhưng thông qua thị trường CDS, nó liên kết với hàng nghìn đối tác trên toàn cầu (ngân hàng đầu tư, quỹ hưu trí, công ty bảo hiểm khác). Nếu AIG sụp đổ, toàn bộ mạng lưới đối tác đó đồng loạt chịu tổn thất cùng lúc - một kiểu rủi ro hệ thống không liên quan trực tiếp tới quy mô tài sản của riêng AIG.",
    diagram: [
      { label: "Một tổ chức có mức độ liên kết cao qua phái sinh, cho vay liên ngân hàng, thanh toán", arrow: true },
      { label: "Tổ chức đó gặp khó khăn hoặc sụp đổ", arrow: true },
      { label: "Tổn thất lan truyền đồng thời tới hàng trăm/nghìn đối tác liên kết", arrow: true },
      { label: "Rủi ro hệ thống xảy ra bất kể quy mô riêng lẻ của tổ chức gốc" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Trung tâm thanh toán bù trừ (CCP) - rủi ro tập trung hoá",
      description:
        "Sau 2008, quy định mới bắt buộc nhiều giao dịch phái sinh OTC phải được thanh toán qua trung tâm bù trừ trung tâm (Central Counterparty - CCP) thay vì song phương, nhằm giảm rủi ro liên kết kiểu mạng lưới phức tạp. Nhưng điều này tạo ra một dạng rủi ro liên kết mới: CCP giờ trở thành điểm tập trung rủi ro cực lớn - nếu một CCP lớn gặp sự cố, hậu quả lan ra toàn bộ thành viên thanh toán qua nó cùng lúc, biến vấn đề \"quá liên kết để sụp đổ\" thành \"CCP quá quan trọng để sụp đổ\", một mối lo ngại các cơ quan quản lý vẫn đang tích cực theo dõi.",
    },
    quiz: [
      {
        question: "Vì sao AIG được coi là ví dụ điển hình của \"too-interconnected-to-fail\" thay vì \"too-big-to-fail\"?",
        options: [
          "Vì AIG là tổ chức tài chính lớn nhất thế giới tính theo tổng tài sản tại thời điểm 2008, vượt qua mọi ngân hàng đầu tư và công ty bảo hiểm khác cùng thời điểm đó trên toàn cầu, kể cả các ngân hàng Trung Quốc",
          "Vì AIG không phải ngân hàng lớn nhất, nhưng thông qua thị trường CDS nó liên kết với hàng nghìn đối tác toàn cầu, khiến sự sụp đổ của nó đe doạ lan tổn thất đồng thời ra khắp hệ thống",
          "Vì AIG có số lượng chi nhánh vật lý nhiều nhất trong ngành bảo hiểm",
          "Vì chính phủ Mỹ sở hữu phần lớn cổ phần của AIG trước năm 2008",
        ],
        correct: 1,
        explanation:
          "Đây chính là điểm phân biệt hai khái niệm: quy mô tài sản của AIG không phải điều khiến nó nguy hiểm với hệ thống, mà là vai trò trung tâm của nó trong mạng lưới CDS - hàng nghìn hợp đồng liên kết AIG với các tổ chức khác, nên sụp đổ của một điểm nút này lan ra toàn mạng lưới.",
      },
      {
        question: "Việc chuyển giao dịch phái sinh OTC sang thanh toán qua trung tâm bù trừ trung tâm (CCP) sau 2008 giải quyết vấn đề gì, và tạo ra rủi ro mới nào?",
        options: [
          "Giải quyết hoàn toàn và vĩnh viễn mọi rủi ro hệ thống liên quan tới thị trường phái sinh toàn cầu mà không hề tạo ra bất kỳ loại rủi ro tập trung mới nào cần các cơ quan quản lý tiếp tục theo dõi thêm trong tương lai gần hay xa",
          "Giảm rủi ro liên kết kiểu mạng lưới phức tạp song phương, nhưng tạo ra rủi ro tập trung mới: CCP trở thành điểm tập trung rủi ro cực lớn mà nếu gặp sự cố sẽ ảnh hưởng đồng loạt tới mọi thành viên thanh toán qua nó",
          "Chỉ làm tăng chi phí giao dịch mà không thay đổi bản chất rủi ro hệ thống",
          "Loại bỏ hoàn toàn nhu cầu về yêu cầu vốn CVA đã học ở môn Credit Risk",
        ],
        correct: 1,
        explanation:
          "Đây là ví dụ về việc giải pháp cho một loại rủi ro hệ thống có thể tạo ra một loại rủi ro hệ thống khác: thay vì rủi ro phân tán qua mạng lưới song phương phức tạp khó theo dõi, giờ rủi ro tập trung vào một số ít CCP lớn - dễ giám sát hơn nhưng nếu chính CCP đó gặp sự cố, hậu quả còn tập trung và tức thời hơn.",
      },
      {
        question: "Vì sao \"rủi ro liên kết hệ thống\" là chủ đề phù hợp với môn Current Issues in Financial Markets thay vì chỉ là lịch sử của khủng hoảng 2008?",
        options: [
          "Vì rủi ro liên kết chỉ tồn tại trong quá khứ và không còn liên quan tới cấu trúc thị trường hiện tại",
          "Vì cấu trúc liên kết của hệ thống tài chính liên tục thay đổi theo công nghệ và quy định mới (CCP, private credit, fintech), nên đòi hỏi risk manager phải liên tục đánh giá lại đâu là điểm nút quan trọng nhất của hệ thống tại từng thời điểm",
          "Vì chỉ các cơ quan quản lý mới cần quan tâm tới rủi ro liên kết, không liên quan tới công việc của risk manager tại từng tổ chức",
          "Vì rủi ro liên kết hệ thống đã được giải quyết dứt điểm bằng quy định CCP nên không cần theo dõi thêm",
        ],
        correct: 1,
        explanation:
          "Giống như shadow banking ở bài trước, rủi ro liên kết không tĩnh - cấu trúc mạng lưới tài chính thay đổi liên tục (CCP tập trung hoá thanh toán, private credit mở rộng, fintech kết nối theo cách mới), nên \"điểm nút quan trọng nhất của hệ thống\" của năm 2008 (AIG qua CDS song phương) khác với điểm nút quan trọng nhất hiện tại.",
      },
      {
        question: "Điểm chung giữa bài học từ AIG (liên kết hệ thống) và bài học từ CDO-squared (đã học ở môn Credit Risk) là gì?",
        options: [
          "Không có điểm chung nào, đây là hai chủ đề hoàn toàn tách biệt trong đề cương FRM",
          "Cả hai đều cho thấy: khi cấu trúc tài chính trở nên phức tạp và liên kết chặt chẽ hơn, việc truy vết rủi ro thực sự nằm ở đâu trở nên khó khăn hơn nhiều, ngay cả với chính những người tham gia thị trường",
          "Cả hai chỉ liên quan tới rủi ro tín dụng thuần tuý, hoàn toàn không liên quan gì tới rủi ro thanh khoản hay rủi ro vận hành đã học ở các chặng trước của lộ trình FRM Part I và Part II mà bạn vừa hoàn thành",
          "Cả hai đều đã được giải quyết hoàn toàn bằng các quy định vốn Basel III hiện hành",
        ],
        correct: 1,
        explanation:
          "Đây là sợi chỉ xuyên suốt của toàn bộ lộ trình FRM vừa học: dù là tương quan bị đánh giá sai (LTCM), cấu trúc phân lớp che giấu rủi ro (CDO), hay mạng lưới liên kết phức tạp (AIG), độ phức tạp gia tăng luôn đi kèm với việc rủi ro thực sự trở nên khó nhìn thấy hơn - đúng lúc risk manager cần nhìn thấy nó rõ nhất.",
      },
    
    {
      "question": "Chuyển giao dịch phái sinh sang thanh toán qua trung tâm bù trừ giải quyết được gì và tạo ra rủi ro mới nào?",
      "options": [
        "Giảm mạng lưới đối tác chằng chịt, nhưng dồn rủi ro vào một điểm duy nhất",
        "Giảm chi phí giao dịch, nhưng làm giảm thanh khoản của thị trường phái sinh",
        "Tăng minh bạch giá, nhưng khiến các hợp đồng khó tùy chỉnh theo nhu cầu",
        "Giảm rủi ro tín dụng đối tác, nhưng làm tăng rủi ro lãi suất cho hai bên"
      ],
      "correct": 0,
      "explanation": "Trước đây mỗi bên là một mắt xích và không ai nhìn được cả mạng. Đưa qua trung tâm bù trừ làm mạng gọn lại và ai cũng nhìn thấy, nhưng chính trung tâm đó trở thành tổ chức không được phép sụp - nên yêu cầu vốn và ký quỹ của nó là chuyện hệ thống."
    }
    ],
    keyTakeaways: [
      "Too-interconnected-to-fail: mức độ liên kết với hệ thống, không chỉ quy mô tài sản, quyết định một tổ chức có gây rủi ro hệ thống hay không (AIG qua thị trường CDS)",
      "Chuyển giao dịch phái sinh sang CCP giảm rủi ro mạng lưới song phương nhưng tạo ra rủi ro tập trung mới ở chính CCP",
      "Cấu trúc liên kết của hệ thống tài chính thay đổi liên tục theo công nghệ và quy định - điểm nút quan trọng nhất luôn di chuyển, không cố định",
      "Sợi chỉ xuyên suốt FRM: độ phức tạp và liên kết gia tăng luôn làm rủi ro thực sự khó nhìn thấy hơn, dù biểu hiện qua tương quan sai (LTCM), cấu trúc phân lớp (CDO), hay mạng lưới liên kết (AIG)",
    ],
    summary: {
      keyIdea: "Quy mô không quyết định một tổ chức có gây rủi ro hệ thống hay không - mức độ liên kết mới quyết định. Một bên nhỏ nằm ở nút quan trọng nguy hiểm hơn một bên lớn nằm ngoài rìa.",
      commonMistake: "Cho rằng chuyển sang CCP là xong. Nó đổi rủi ro mạng lưới lấy rủi ro tập trung, và tập trung vào chính CCP.",
    },
    application: {
      title: "Sợi chỉ xuyên suốt FRM",
      message: "Độ phức tạp và liên kết tăng lên luôn làm rủi ro khó nhìn thấy hơn, kể cả khi từng mắt xích riêng lẻ đều được đo cẩn thận.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài cuối cùng của lộ trình FRM Foundations - Operational Resilience - Liquidity - Credit Risk - Current Issues vừa xây. Nó khép lại bằng đúng câu hỏi mở đầu chặng Foundations: rủi ro hệ thống thường không tới từ nơi lớn nhất, mà từ nơi liên kết chặt chẽ nhất.",
      },
      {
        type: "heading",
        text: "Quy mô và liên kết là hai trục khác nhau",
      },
      {
        type: "conceptTable",
        title: "Hai loại \"quá quan trọng để sụp đổ\"",
        subtitle: "Cùng hậu quả, khác nguyên nhân",
        concepts: [
          { vi: "Too-big-to-fail", en: "Quá lớn", def: "Rủi ro dựa trên quy mô tài sản/hoạt động - tổ chức lớn tới mức sụp đổ trực tiếp gây gián đoạn kinh tế đáng kể." },
          { vi: "Too-interconnected-to-fail", en: "Quá liên kết", def: "Rủi ro dựa trên số lượng và mức độ liên kết với các tổ chức khác - có thể tương đối nhỏ về quy mô nhưng vẫn là điểm nút trung tâm của mạng lưới." },
        ],
      },
      {
        type: "callout",
        label: "Câu hỏi cho risk manager hiện đại",
        text: "Cơ quan quản lý hiện dùng các chỉ số đo mức độ liên kết hệ thống (như phương pháp SIFI - Systemically Important Financial Institution của FSB) bên cạnh quy mô tài sản để xác định tổ chức nào cần giám sát chặt hơn. Nhưng những chỉ số này luôn đi sau cấu trúc thị trường thực tế một bước - đúng lý do vì sao đây vẫn là một \"current issue\", không phải một vấn đề đã đóng lại.",
      },
      {
        type: "closing",
        lines: [
          "Từ ERM ở bài đầu chặng Foundations tới rủi ro liên kết hệ thống ở đây: quản trị rủi ro không phải một danh sách kiểm tra tĩnh, mà là năng lực liên tục hỏi lại câu hỏi cũ trong một cấu trúc thị trường luôn thay đổi.",
          "Đây là bài cuối của đợt mở rộng lộ trình FRM lần này. Credit Risk vẫn còn thiếu phần rủi ro tín dụng chủ quyền (sovereign credit risk) và Current Issues vẫn còn nhiều chủ đề khác của GARP chưa có bài riêng - phần việc cho những đợt xây tiếp theo.",
        ],
      },
    ],
  },
];
