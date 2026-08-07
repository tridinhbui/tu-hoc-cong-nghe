import type { Lesson } from "./lesson-types";

// Chặng "Tài chính dự án bất động sản" (ids 1731-1735, professional track).
//
// Vì sao chặng này tồn tại: kho đã có phía ĐỊNH GIÁ của bất động sản - cap
// rate, FFO/AFFO, định giá tài sản - nhưng quét pháp lý đất đai, dòng tiền dự
// án, cấu trúc vốn dự án thì ra 0 bài. Nghĩa là người học biết định giá một
// toà nhà đã xây xong và không biết gì về quãng đường từ mảnh đất tới toà nhà
// đó, trong khi phần lớn tiền của ngành được kiếm và mất ở chính quãng đó.
//
// Điểm khác biệt lớn nhất so với mọi chặng tài chính doanh nghiệp khác: ở đây
// pháp lý không phải một chương phụ lục, nó là biến số đầu tiên của mô hình.
// Một dự án chưa đủ điều kiện mở bán thì không có dòng tiền vào, bất kể thị
// trường tốt tới đâu và chủ đầu tư giỏi tới đâu.

export const REAL_ESTATE_PROJECT_LESSONS: Lesson[] = [
  {
    id: 1731,
    slug: "phap-ly-du-an-bat-dong-san-va-dong-tien",
    title: "Dự án BĐS, Bài 1: Pháp lý - vì sao dòng tiền bắt đầu từ tờ giấy",
    subtitle: "Bốn mốc pháp lý quyết định khi nào tiền được phép chảy vào, và vì sao chậm một mốc đắt hơn vượt chi phí xây dựng",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📜",
    track: "professional",
    whyItMatters:
      "Trong mô hình tài chính của một dự án bất động sản, biến số nhạy nhất không phải giá bán hay chi phí xây dựng - đó là ngày dự án đủ điều kiện mở bán. Người dựng mô hình mà không biết mốc đó phụ thuộc vào gì sẽ dự báo một dòng tiền không bao giờ xảy ra.",
    openingQuestion: "Dự án đã có quyền sử dụng đất và đã khởi công. Chủ đầu tư được nhận tiền của khách chưa?",
    openingOptions: [
      "Chưa, còn cần đủ điều kiện huy động vốn theo quy định",
      "Rồi, vì đã khởi công là đã có giấy phép xây dựng",
      "Rồi, nếu hai bên tự thoả thuận bằng hợp đồng đặt cọc dân sự",
      "Chưa, phải đợi tới khi công trình hoàn thành và được nghiệm thu bàn giao",
    ],
    correctOption: 0,
    explanation:
      "Có đất và có giấy phép xây dựng vẫn chưa đủ. Luật kinh doanh bất động sản đặt thêm điều kiện riêng cho việc bán nhà hình thành trong tương lai - trong đó có việc hoàn thành móng với chung cư và có văn bản của cơ quan quản lý xác nhận đủ điều kiện. Đây là mốc quan trọng nhất trong cả vòng đời dự án về mặt dòng tiền: trước mốc đó, mọi đồng tiền đi ra đều là vốn chủ hoặc vốn vay; sau mốc đó, tiền của người mua bắt đầu chảy vào và trở thành nguồn tài trợ rẻ nhất mà chủ đầu tư có. Chậm mốc này ba tháng làm tăng chi phí lãi vay của toàn bộ phần vốn đã bỏ ra, chứ không chỉ của một hạng mục.",
    diagram: [
      { label: "Chấp thuận chủ trương đầu tư", arrow: true },
      { label: "Giao đất, quyền sử dụng đất", arrow: true },
      { label: "Giấy phép xây dựng → khởi công", arrow: true },
      { label: "Đủ điều kiện huy động vốn → tiền khách bắt đầu vào", arrow: true },
      { label: "Nghiệm thu, bàn giao, sổ cho người mua" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Các dự án 'đắp chiếu' tại TP.HCM và Hà Nội",
      description:
        "Phần lớn dự án dừng nhiều năm không dừng vì hết tiền xây, mà vì vướng một mốc pháp lý - tiền sử dụng đất chưa xác định xong, quy hoạch điều chỉnh, hoặc nguồn gốc đất có tranh chấp. Trong thời gian đó, lãi vay vẫn chạy trên toàn bộ vốn đã bỏ ra, nên một dự án lãi trên giấy có thể lỗ thật chỉ vì đứng yên.",
    },
    quiz: [
      {
        question: "Mốc pháp lý nào quyết định thời điểm tiền của người mua được chảy vào?",
        options: [
          "Đủ điều kiện huy động vốn cho nhà hình thành trong tương lai",
          "Ngày chủ đầu tư chính thức khởi công xây dựng công trình",
          "Ngày được cấp giấy chứng nhận quyền sử dụng đất cho dự án",
          "Ngày cơ quan quản lý chấp thuận chủ trương đầu tư cho dự án",
        ],
        correct: 0,
        explanation:
          "Ba mốc kia đều cần thiết nhưng chưa cho phép nhận tiền. Chỉ mốc này mở dòng tiền vào - và đó là nguồn vốn rẻ nhất của chủ đầu tư.",
      },
      {
        question: "Vì sao chậm pháp lý đắt hơn vượt chi phí xây dựng cùng giá trị?",
        options: [
          "Vì lãi vay chạy trên toàn bộ vốn đã bỏ ra, không riêng phần bị chậm",
          "Vì chi phí xây dựng có thể đàm phán lại với nhà thầu còn pháp lý thì không",
          "Vì chậm pháp lý luôn kéo theo tiền phạt từ phía cơ quan quản lý nhà nước",
          "Vì nhà đầu tư sẽ rút vốn ngay khi dự án chậm tiến độ so với kế hoạch",
        ],
        correct: 0,
        explanation:
          "Vượt chi phí là một khoản một lần. Chậm tiến độ là chi phí vốn nhân với thời gian, áp lên toàn bộ số tiền đang nằm trong dự án.",
      },
      {
        question: "Tiền sử dụng đất chưa được xác định xong ảnh hưởng thế nào?",
        options: [
          "Chưa xác định được tổng mức đầu tư nên chưa chốt được giá bán",
          "Vẫn triển khai, nộp bổ sung sau",
          "Chỉ ảnh hưởng nghĩa vụ thuế",
          "Được tạm nộp rồi quyết toán sau",
        ],
        correct: 0,
        explanation:
          "Đây là khoản chi phí lớn nhất và bất định nhất của nhiều dự án. Chưa biết nó là bao nhiêu thì mọi con số phía sau đều là giả định.",
      },
      {
        question: "Rủi ro pháp lý nên được đưa vào mô hình tài chính như thế nào?",
        options: [
          "Làm kịch bản theo các mốc thời gian chậm khác nhau",
          "Cộng một khoản dự phòng cố định",
          "Nâng tỷ suất chiết khấu của cả dự án lên vài điểm phần trăm",
          "Ghi chú định tính trong phần thuyết minh của báo cáo thẩm định",
        ],
        correct: 0,
        explanation:
          "Rủi ro này biểu hiện bằng thời gian chứ không bằng tiền, nên phải mô hình hoá bằng thời gian. Một khoản dự phòng cố định không nói được chậm sáu tháng khác chậm hai năm ra sao.",
      },
      {
        question: "Vì sao tiền người mua trả trước là nguồn vốn rẻ nhất?",
        options: [
          "Vì nó không tính lãi và không cần tài sản bảo đảm",
          "Vì nó vào doanh thu ngay khi nhận",
          "Vì người mua không có quyền đòi lại khi dự án chậm bàn giao",
          "Vì ngân hàng cho vay với lãi suất ưu đãi khi đã có tiền khách vào",
        ],
        correct: 0,
        explanation:
          "Nhưng nó không miễn phí: đổi lại là nghĩa vụ bàn giao đúng hạn, và tiền phạt chậm bàn giao trong hợp đồng thường không nhỏ.",
      },
    ],
    keyTakeaways: [
      "Bốn mốc: chấp thuận chủ trương, quyền sử dụng đất, giấy phép xây dựng, đủ điều kiện huy động vốn.",
      "Mốc thứ tư quyết định dòng tiền vào - trước đó mọi đồng đều là vốn chủ hoặc vốn vay.",
      "Chậm pháp lý tính bằng chi phí vốn nhân thời gian, áp lên toàn bộ vốn đã bỏ ra.",
      "Mô hình hoá rủi ro pháp lý bằng kịch bản thời gian, không bằng một khoản dự phòng cố định.",
    ],
    summary: {
      keyIdea: "Mốc đủ điều kiện huy động vốn quyết định ngày tiền của người mua được phép chảy vào",
      commonMistake: "Coi rủi ro pháp lý là một khoản dự phòng cố định. Nó biểu hiện bằng thời gian, nên phải mô hình hoá bằng thời gian.",
      action: "Trong mô hình dự án, đặt ngày đủ điều kiện huy động vốn thành một biến và chạy kịch bản chậm 6, 12, 24 tháng.",
    },
    application: {
      title: "Tìm biến nhạy nhất của một dự án",
      message: "Với một dự án bất kỳ, thử lần lượt: giá bán giảm 10%, chi phí xây tăng 10%, và pháp lý chậm 12 tháng. So ba kết quả để xem cái nào ăn vào lợi nhuận nhiều nhất.",
      secondary: "Ở phần lớn dự án, biến thứ ba thắng - vì lãi vay chạy trên toàn bộ vốn đã bỏ ra chứ không riêng phần bị chậm.",
    },
    sections: [
      {
        type: "lead",
        text: "Ở mọi ngành khác, pháp lý là một chương phụ lục của hồ sơ đầu tư. Ở bất động sản, nó là biến số đầu tiên của mô hình - vì nó quyết định ngày tiền được phép chảy vào.",
      },
      { type: "heading", text: "Bốn mốc và ý nghĩa dòng tiền của chúng" },
      {
        type: "conceptTable",
        title: "Đường pháp lý của một dự án",
        concepts: [
          { vi: "Chấp thuận chủ trương", en: "Investment approval", def: "Nhà nước đồng ý cho làm dự án này ở đây. Chưa có gì để xây, nhưng đã bắt đầu tiêu tiền: tư vấn, quy hoạch, giải phóng mặt bằng." },
          { vi: "Quyền sử dụng đất", en: "Land use right", def: "Kèm theo là nghĩa vụ tiền sử dụng đất - khoản lớn nhất và bất định nhất của nhiều dự án, và nó thường được xác định muộn." },
          { vi: "Giấy phép xây dựng", en: "Construction permit", def: "Được khởi công. Từ đây chi phí xây dựng bắt đầu chảy ra theo tiến độ, mỗi tháng một khoản." },
          { vi: "Đủ điều kiện huy động vốn", en: "Pre-sale eligibility", def: "Mốc duy nhất mở dòng tiền VÀO. Với chung cư còn cần xong móng và có văn bản xác nhận của cơ quan quản lý." },
        ],
      },
      { type: "heading", text: "Vì sao thời gian là loại chi phí đắt nhất ở đây" },
      {
        type: "paragraph",
        text: "Vượt chi phí xây dựng 50 tỷ là một khoản một lần. Chậm pháp lý một năm khi đang có 500 tỷ nằm trong dự án với chi phí vốn 12% cũng là 60 tỷ - nhưng nó không nằm ở dòng nào trong bảng dự toán, nên rất dễ không ai theo dõi. Đó là lý do trong hồ sơ thẩm định dự án bất động sản, tiến độ pháp lý được soi kỹ hơn cả đơn giá vật liệu.",
      },
      {
        type: "callout",
        label: "Cách đưa vào mô hình",
        text: "Đừng cộng một khoản dự phòng cố định cho rủi ro pháp lý. Rủi ro này biểu hiện bằng THỜI GIAN, nên hãy làm ba kịch bản: đúng hạn, chậm sáu tháng, chậm hai năm - rồi nhìn NPV của cả ba. Khoảng cách giữa chúng thường lớn hơn khoảng cách giữa kịch bản giá bán cao và giá bán thấp.",
      },
      {
        type: "closing",
        lines: [
          "Một dự án bất động sản không lỗ vì xây đắt. Nó lỗ vì đứng yên.",
          "Và trong lúc đứng yên, thứ duy nhất vẫn chạy đúng tiến độ là lãi vay.",
        ],
      },
    ],
  },

  {
    id: 1732,
    slug: "dong-tien-du-an-phat-trien-bat-dong-san",
    title: "Dự án BĐS, Bài 2: Đường cong chữ J - tiền ra trước, tiền vào sau",
    subtitle: "Dòng tiền của một dự án phát triển, đỉnh vốn cần huy động, và vì sao IRR đẹp vẫn có thể làm chủ đầu tư chết",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Chỉ số quyết định một dự án có làm được hay không thường không phải IRR, mà là đỉnh vốn âm - số tiền lớn nhất chủ đầu tư phải xoay ra cùng lúc. Một dự án IRR 25% mà cần 800 tỷ ở tháng thứ 18 là dự án không làm được nếu chỉ có 500 tỷ.",
    openingQuestion:
      "Dự án có NPV dương và IRR 25%. Đỉnh vốn âm là 800 tỷ, chủ đầu tư huy động tối đa được 500 tỷ. Kết luận?",
    openingOptions: [
      "Dự án không khả thi với chủ đầu tư này dù các chỉ số đều tốt",
      "Vẫn làm được vì NPV dương nghĩa là dự án tạo ra giá trị",
      "Vẫn làm được vì IRR 25% đủ cao để vay thêm phần còn thiếu",
      "Cần tính lại vì NPV dương và thiếu vốn là hai điều không thể cùng xảy ra",
    ],
    correctOption: 0,
    explanation:
      "NPV và IRR nói dự án có đáng làm không; đỉnh vốn âm nói có làm nổi không. Hai câu hỏi hoàn toàn khác nhau và câu thứ hai bị bỏ qua nhiều hơn hẳn. Một dự án tốt nhưng thiếu vốn giữa chừng sẽ dừng, và dừng ở bất động sản là kịch bản tệ nhất: tiền đã chôn vào đất và móng, lãi vẫn chạy, mà chưa có gì để bán. Đó là lý do bên cho vay dự án nhìn biểu đồ dòng tiền tích luỹ trước khi nhìn IRR, và vì sao cấu trúc vốn của dự án bất động sản luôn được thiết kế quanh đúng cái đỉnh đó.",
    diagram: [
      { label: "Giai đoạn 1: đất, pháp lý, thiết kế - chỉ có tiền ra", arrow: true },
      { label: "Giai đoạn 2: xây dựng - tiền ra nhiều nhất, đỉnh vốn âm", arrow: true },
      { label: "Giai đoạn 3: mở bán - tiền khách bắt đầu vào", arrow: true },
      { label: "Giai đoạn 4: bàn giao, thu nốt, quyết toán" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Cách ngân hàng thẩm định một dự án bất động sản",
      description:
        "Hồ sơ vay dự án luôn kèm bảng dòng tiền theo tháng, và câu hỏi đầu tiên của bên cho vay là đỉnh vốn âm rơi vào tháng nào và bằng bao nhiêu. Con số đó quyết định hạn mức, chứ không phải IRR - vì ngân hàng không chia lợi nhuận, họ chỉ cần chắc rằng dự án không dừng giữa chừng.",
    },
    quiz: [
      {
        question: "Đỉnh vốn âm của một dự án là gì?",
        options: [
          "Số tiền lớn nhất chủ đầu tư phải bỏ ra cùng lúc",
          "Tổng chi phí đầu tư của dự án tính trên toàn bộ vòng đời",
          "Khoản lỗ luỹ kế lớn nhất ghi nhận trên báo cáo kết quả kinh doanh",
          "Phần vốn vay tối đa mà ngân hàng chấp thuận cấp cho dự án",
        ],
        correct: 0,
        explanation:
          "Nó là điểm thấp nhất của dòng tiền tích luỹ. Tổng chi phí là con số khác và không nói gì về việc chủ đầu tư có xoay kịp hay không.",
      },
      {
        question: "Vì sao ngân hàng nhìn đỉnh vốn âm trước khi nhìn IRR?",
        options: [
          "Vì ngân hàng không chia lợi nhuận, chỉ cần dự án không dừng giữa chừng",
          "Vì IRR là chỉ số không đáng tin trong lĩnh vực bất động sản",
          "Vì quy định buộc tổ chức tín dụng thẩm định theo dòng tiền tuyệt đối",
          "Vì đỉnh vốn âm dễ tính hơn IRR nên được dùng để sàng lọc hồ sơ ban đầu",
        ],
        correct: 0,
        explanation:
          "IRR cao chỉ có nghĩa nếu dự án về đích. Bên cho vay quan tâm xác suất về đích, và nút thắt của xác suất đó nằm ở đỉnh vốn.",
      },
      {
        question: "Vì sao dừng giữa chừng là kịch bản tệ nhất của một dự án BĐS?",
        options: [
          "Vì tiền đã chôn vào đất và móng, lãi vẫn chạy, chưa có gì bán được",
          "Vì chủ đầu tư sẽ bị thu hồi đất ngay khi dự án dừng quá sáu tháng",
          "Vì chi phí xây dựng luôn tăng gấp đôi khi khởi động lại công trình",
          "Vì người mua được hoàn tiền kèm lãi phạt",
        ],
        correct: 0,
        explanation:
          "Một dự án dở dang gần như không có giá trị thanh lý. Đó là lý do rủi ro thanh khoản ở đây nghiêm trọng hơn rủi ro lợi nhuận.",
      },
      {
        question: "Mở bán sớm hơn ba tháng ảnh hưởng thế nào tới đỉnh vốn âm?",
        options: [
          "Kéo đỉnh vốn xuống vì dòng tiền vào đến sớm hơn",
          "Không ảnh hưởng, doanh thu vẫn thế",
          "Làm đỉnh vốn sâu hơn do phát sinh chi phí bán hàng sớm hơn dự kiến",
          "Chỉ ảnh hưởng tới IRR chứ không ảnh hưởng tới nhu cầu vốn của dự án",
        ],
        correct: 0,
        explanation:
          "Đây là lý do các mốc pháp lý được theo đuổi quyết liệt tới vậy: mỗi tháng mở bán sớm là một tháng bớt phải tự nuôi dự án bằng vốn.",
      },
      {
        question: "Dòng tiền dự án phát triển có hình chữ J vì sao?",
        options: [
          "Vì chi phí phát sinh trước, doanh thu chỉ đến sau khi đủ điều kiện bán",
          "Vì giá bán bất động sản thường tăng dần theo tiến độ xây dựng",
          "Vì chi phí lãi vay được vốn hoá vào giá trị công trình đang xây dựng",
          "Vì chủ đầu tư giữ lại hàng bán cuối",
        ],
        correct: 0,
        explanation:
          "Đất, pháp lý và móng đều phải trả trước khi được phép nhận đồng đầu tiên của khách. Hình chữ J là hệ quả trực tiếp của trình tự đó.",
      },
    ],
    keyTakeaways: [
      "NPV và IRR nói dự án có đáng làm không; đỉnh vốn âm nói có làm nổi không.",
      "Đỉnh vốn âm là điểm thấp nhất của dòng tiền tích luỹ, và nó quyết định hạn mức vay.",
      "Dừng giữa chừng là kịch bản tệ nhất: tài sản dở dang gần như không có giá trị thanh lý.",
      "Mở bán sớm kéo đỉnh vốn lên - đó là lý do các mốc pháp lý được theo đuổi tới cùng.",
    ],
    summary: {
      keyIdea: "NPV và IRR nói dự án có đáng làm không; đỉnh vốn âm nói có làm nổi không",
      commonMistake: "Duyệt dự án bằng IRR mà không nhìn điểm thấp nhất của dòng tiền tích luỹ - nơi quyết định hạn mức vay cần có.",
      action: "Vẽ dòng tiền tích luỹ theo tháng và đánh dấu điểm thấp nhất. Đó là số tiền phải thu xếp được trước khi bắt đầu.",
    },
    application: {
      title: "Tìm đỉnh vốn của một dự án",
      message: "Lập bảng dòng tiền theo quý cho một dự án giả định, cộng dồn qua các quý, và tìm quý có số cộng dồn âm sâu nhất. So con số đó với vốn chủ cộng hạn mức vay đang có.",
      secondary: "Nếu đỉnh vốn lớn hơn nguồn thu xếp được, dự án có NPV dương vẫn không làm được - và dừng giữa chừng là kịch bản tệ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Vẽ dòng tiền tích luỹ của một dự án phát triển ra giấy thì được một chữ J: đi xuống rất sâu, rất lâu, rồi mới ngoi lên. Toàn bộ nghề tài chính dự án nằm ở việc quản cái đáy của chữ J đó.",
      },
      { type: "heading", text: "Bốn giai đoạn" },
      {
        type: "list",
        items: [
          "Đất và pháp lý: chỉ có tiền ra, kéo dài không đoán trước được, và là giai đoạn rủi ro nhất.",
          "Xây dựng: tiền ra đều đặn và lớn nhất. Đỉnh vốn âm thường rơi vào cuối giai đoạn này.",
          "Mở bán: dòng tiền vào bắt đầu, thường theo tiến độ thanh toán của người mua.",
          "Bàn giao và quyết toán: thu nốt phần còn lại, trả nợ vay, chốt lãi lỗ.",
        ],
      },
      { type: "heading", text: "Hai câu hỏi khác nhau" },
      {
        type: "comparison",
        left: { label: "Có đáng làm không", text: "NPV, IRR. Trả lời bằng tỷ suất và giá trị. Đây là câu hỏi của chủ đầu tư và nhà đầu tư góp vốn." },
        right: { label: "Có làm nổi không", text: "Đỉnh vốn âm, thời điểm chạm đáy. Trả lời bằng số tiền tuyệt đối tại một tháng cụ thể. Đây là câu hỏi của bên cho vay." },
      },
      {
        type: "formula",
        title: "Nhu cầu vốn tại đáy",
        equation: "Đỉnh vốn âm = min(dòng tiền tích luỹ theo tháng)",
        variables: [
          { symbol: "dòng tiền tích luỹ", name: "cộng dồn từ tháng đầu", description: "gồm cả lãi vay phát sinh trong kỳ xây dựng" },
        ],
        example: {
          title: "Vì sao phải cộng cả lãi",
          calculation: "500 tỷ vốn + lãi vốn hoá 18 tháng",
          result: "đỉnh sâu hơn con số vốn đầu tư thuần",
          explanation: "Lãi trong thời gian xây dựng thường được vốn hoá vào giá trị công trình, nên nó không xuất hiện ở báo cáo kết quả kinh doanh - nhưng nó vẫn là tiền phải chi ra thật.",
        },
      },
      {
        type: "callout",
        label: "Sai lầm hay gặp trong hồ sơ dự án",
        text: "Trình bày IRR rất chi tiết và để dòng tiền theo tháng ở phần phụ lục. Người thẩm định có kinh nghiệm sẽ mở phụ lục trước - vì IRR là kết luận, còn dòng tiền theo tháng mới là chỗ nhìn ra dự án có xoay được không.",
      },
      {
        type: "closing",
        lines: [
          "Một dự án tốt vẫn chết nếu hết tiền ở tháng thứ 18.",
          "Nên trước khi hỏi lãi bao nhiêu, hãy hỏi đáy sâu bao nhiêu và rơi vào lúc nào.",
        ],
      },
    ],
  },

  {
    id: 1733,
    slug: "cau-truc-von-du-an-bat-dong-san",
    title: "Dự án BĐS, Bài 3: Ba nguồn vốn - vốn chủ, vay xây dựng và tiền người mua",
    subtitle: "Thứ tự ưu tiên của từng nguồn, chi phí thật của tiền trả trước, và vì sao đòn bẩy cao ở đây nguy hiểm hơn nơi khác",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏗️",
    track: "professional",
    whyItMatters:
      "Cấu trúc vốn của một dự án bất động sản quyết định ai chịu thiệt khi dự án chậm - và trong ba nguồn vốn thì có một nguồn mà người cấp vốn hầu như không có công cụ tự bảo vệ nào. Biết điều đó là biết vì sao quy định về huy động vốn ngày càng chặt.",
    openingQuestion: "Nguồn vốn nào của dự án bất động sản có chi phí danh nghĩa thấp nhất?",
    openingOptions: [
      "Tiền người mua trả theo tiến độ",
      "Vay xây dựng từ ngân hàng thương mại trong nước",
      "Vốn góp của chủ đầu tư và các nhà đầu tư cùng tham gia",
      "Trái phiếu doanh nghiệp phát hành riêng lẻ cho nhà đầu tư tổ chức",
    ],
    correctOption: 0,
    explanation:
      "Tiền người mua không tính lãi, không cần tài sản bảo đảm, không có điều khoản ràng buộc tài chính - trên giấy nó gần như miễn phí. Nhưng chi phí thật của nó không nằm ở lãi suất: nó nằm ở nghĩa vụ bàn giao đúng hạn, ở khoản phạt chậm bàn giao trong hợp đồng, và ở chỗ người mua là chủ nợ duy nhất không thể tự bảo vệ mình. Ngân hàng có tài sản bảo đảm và có quyền dừng giải ngân; nhà đầu tư góp vốn có ghế trong hội đồng; người mua nhà chỉ có một hợp đồng và một hy vọng. Đó là lý do quy định về điều kiện huy động vốn tồn tại và ngày càng chặt.",
    diagram: [
      { label: "Vốn chủ - vào trước, ra sau cùng", arrow: true },
      { label: "Vay xây dựng - có tài sản bảo đảm, giải ngân theo tiến độ", arrow: true },
      { label: "Tiền người mua - rẻ nhất, nhưng đi kèm nghĩa vụ bàn giao", arrow: true },
      { label: "Khi dự án chậm: người mua chịu rủi ro lớn nhất" },
    ],
    interactiveType: "ratios",
    realWorldExample: {
      company: "Trái phiếu doanh nghiệp bất động sản 2022",
      description:
        "Nhiều chủ đầu tư dùng trái phiếu riêng lẻ để tài trợ giai đoạn pháp lý - giai đoạn ngân hàng không cho vay vì chưa có tài sản bảo đảm rõ ràng. Khi kênh này siết lại, hàng loạt dự án dừng ở đúng giai đoạn tốn tiền nhất mà chưa được phép bán, cho thấy nguồn vốn nào tài trợ giai đoạn nào quan trọng không kém tổng số vốn.",
    },
    quiz: [
      {
        question: "Vì sao ngân hàng ít cho vay ở giai đoạn pháp lý?",
        options: [
          "Vì chưa có tài sản bảo đảm rõ ràng và tiến độ chưa xác định được",
          "Vì quy định cấm cho vay giai đoạn này",
          "Vì giai đoạn này chi phí nhỏ",
          "Vì lãi suất giai đoạn đầu bị khống chế",
        ],
        correct: 0,
        explanation:
          "Đây là giai đoạn rủi ro nhất và ít thế chấp được nhất, nên nó thường phải dựa vào vốn chủ hoặc các kênh đắt hơn như trái phiếu.",
      },
      {
        question: "Chi phí thật của tiền người mua trả trước nằm ở đâu?",
        options: [
          "Nghĩa vụ bàn giao đúng hạn và tiền phạt khi chậm",
          "Lãi suất ngầm tính trong phần chiết khấu cho khách thanh toán sớm",
          "Hoa hồng môi giới khi ký hợp đồng",
          "Khoản thuế phải nộp ngay khi nhận tiền theo tiến độ từ người mua",
        ],
        correct: 0,
        explanation:
          "Chiết khấu thanh toán sớm cũng là một chi phí thật, nhưng nhỏ hơn nhiều so với rủi ro pháp lý và tài chính của việc chậm bàn giao.",
      },
      {
        question: "Ai chịu rủi ro lớn nhất khi một dự án chậm tiến độ?",
        options: [
          "Người mua nhà đã đóng tiền theo tiến độ",
          "Ngân hàng cho vay dự án",
          "Nhà thầu thi công đang triển khai công trình",
          "Nhà đầu tư góp vốn cùng chủ đầu tư vào dự án",
        ],
        correct: 0,
        explanation:
          "Ngân hàng có tài sản bảo đảm và quyền dừng giải ngân; nhà đầu tư góp vốn có ghế trong hội đồng. Người mua chỉ có một hợp đồng.",
      },
      {
        question: "Vì sao đòn bẩy cao ở dự án BĐS nguy hiểm hơn ở doanh nghiệp sản xuất?",
        options: [
          "Vì dự án không có dòng tiền nào cho tới khi được phép bán",
          "Vì lãi suất bất động sản cao hơn",
          "Vì tài sản bảo đảm là bất động sản nên khó định giá chính xác",
          "Vì quy định giới hạn tỷ lệ vốn vay trên tổng mức đầu tư của dự án",
        ],
        correct: 0,
        explanation:
          "Doanh nghiệp sản xuất có doanh thu hằng tháng để trả lãi. Một dự án chưa mở bán không có đồng nào, nên toàn bộ lãi phải nuôi bằng vốn.",
      },
      {
        question: "Thứ tự thiệt hại khi dự án thất bại là gì?",
        options: [
          "Vốn chủ mất trước, sau đó mới tới các chủ nợ có bảo đảm",
          "Người mua nhà mất trước",
          "Chia đều theo tỷ lệ vốn góp của từng bên tham gia vào dự án",
          "Nhà thầu mất trước vì họ đã thi công mà chưa được thanh toán",
        ],
        correct: 0,
        explanation:
          "Trên lý thuyết vốn chủ đứng cuối hàng và chịu lỗ đầu tiên. Thực tế thu hồi từ một dự án dở dang thường không đủ, nên các bên phía sau vẫn mất.",
      },
    ],
    keyTakeaways: [
      "Ba nguồn: vốn chủ (đắt nhất, chịu rủi ro đầu), vay xây dựng (có bảo đảm), tiền người mua (rẻ nhất).",
      "Giai đoạn pháp lý khó vay ngân hàng nhất, nên thường phải dựa vào vốn chủ hoặc trái phiếu.",
      "Chi phí thật của tiền trả trước là nghĩa vụ bàn giao, không phải lãi suất.",
      "Đòn bẩy ở đây nguy hiểm hơn vì dự án chưa mở bán không có dòng tiền nào để trả lãi.",
    ],
    summary: {
      keyIdea: "Tiền người mua là nguồn rẻ nhất về lãi suất và đắt nhất về nghĩa vụ bàn giao",
      commonMistake: "Tính chi phí vốn của tiền trả trước bằng 0 vì nó không tính lãi, bỏ qua tiền phạt chậm bàn giao trong hợp đồng.",
      action: "Xếp ba nguồn vốn theo thứ tự chịu rủi ro và ghi rõ điều kiện kích hoạt của từng nguồn.",
    },
    application: {
      title: "Xếp lịch ba nguồn vốn",
      message: "Với một dự án, vẽ trục thời gian và đánh dấu giai đoạn nào dùng vốn chủ, giai đoạn nào vay được ngân hàng, giai đoạn nào tiền người mua bắt đầu vào.",
      secondary: "Giai đoạn pháp lý là giai đoạn khó vay nhất và cũng là giai đoạn dài nhất - đó là chỗ phần lớn dự án chết.",
    },
    sections: [
      {
        type: "lead",
        text: "Một dự án bất động sản được tài trợ bằng ba nguồn rất khác nhau, và điều quan trọng không phải tỷ lệ giữa chúng mà là nguồn nào tài trợ giai đoạn nào.",
      },
      { type: "heading", text: "Ba nguồn, ba giai đoạn" },
      {
        type: "conceptTable",
        title: "Ai cấp vốn cho phần nào",
        concepts: [
          { vi: "Vốn chủ sở hữu", en: "Equity", def: "Tài trợ đất và pháp lý - giai đoạn không ai khác dám cho vay. Chịu lỗ đầu tiên, nhận lãi sau cùng." },
          { vi: "Vay xây dựng", en: "Construction loan", def: "Giải ngân theo tiến độ thi công, có tài sản bảo đảm, và bên cho vay có quyền dừng giữa chừng nếu tiến độ lệch." },
          { vi: "Tiền người mua", en: "Pre-sale proceeds", def: "Chỉ được nhận sau khi đủ điều kiện huy động vốn. Không lãi, không bảo đảm - nhưng đổi lại là một hạn bàn giao không dời được." },
        ],
      },
      { type: "heading", text: "Vì sao đòn bẩy ở đây khác" },
      {
        type: "paragraph",
        text: "Một doanh nghiệp sản xuất vay nhiều vẫn có doanh thu hằng tháng để trả lãi. Một dự án bất động sản trước ngày mở bán không có một đồng doanh thu nào, nên toàn bộ lãi phải được nuôi bằng vốn - và nếu vốn đó cũng là vốn vay thì lãi chồng lên lãi trong suốt giai đoạn dài nhất và bất định nhất của dự án.",
      },
      {
        type: "callout",
        label: "Người mua là chủ nợ duy nhất không tự bảo vệ được",
        text: "Ngân hàng có tài sản bảo đảm và quyền dừng giải ngân. Nhà đầu tư góp vốn có ghế trong hội đồng và quyền tiếp cận sổ sách. Người mua nhà có một hợp đồng, và khi dự án dừng thì thứ họ nắm giữ là quyền đòi một căn hộ chưa tồn tại. Toàn bộ hệ thống quy định về điều kiện huy động vốn tồn tại vì sự bất cân xứng đó.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi đúng không phải dự án vay bao nhiêu phần trăm.",
          "Mà là: trong giai đoạn chưa có đồng doanh thu nào, ai đang trả lãi, và trả bằng tiền của ai.",
        ],
      },
    ],
  },

  {
    id: 1734,
    slug: "du-an-cho-thue-noi-va-cap-rate",
    title: "Dự án BĐS, Bài 4: Tài sản cho thuê - NOI và vì sao nó khác lợi nhuận kế toán",
    subtitle: "Cách tính thu nhập hoạt động ròng, quan hệ giữa NOI và cap rate, và ba khoản người mới luôn quên trừ",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🏢",
    track: "professional",
    whyItMatters:
      "Định giá một toà nhà cho thuê là phép chia NOI cho cap rate, nên sai NOI 10% là sai giá trị toà nhà 10%. Và NOI là con số dễ bị thổi phồng nhất trong hồ sơ chào bán, vì nó không có chuẩn mực kế toán nào ràng buộc.",
    openingQuestion: "Toà nhà có NOI 40 tỷ/năm, cap rate thị trường 8%. Giá trị ước tính?",
    openingOptions: [
      "500 tỷ",
      "320 tỷ",
      "3,2 tỷ",
      "Không xác định được nếu chưa biết chi phí xây dựng ban đầu của toà nhà",
    ],
    correctOption: 0,
    explanation:
      "40 / 0,08 = 500 tỷ. Đây là phép định giá bằng vốn hoá trực tiếp, và nó là cách thị trường bất động sản cho thuê thực sự vận hành - không ai định giá một toà nhà bằng chi phí đã bỏ ra để xây nó, vì người mua trả tiền cho dòng tiền tương lai chứ không cho lịch sử. Chú ý quan hệ nghịch: cap rate là tỷ suất người mua đòi hỏi, nên cap rate tăng thì giá giảm. Cùng một toà nhà với NOI không đổi, cap rate nhích từ 8% lên 9% làm giá trị rơi từ 500 xuống 444 tỷ - mất 11% mà toà nhà không có gì thay đổi.",
    diagram: [
      { label: "Doanh thu cho thuê tiềm năng (lấp đầy 100%)", arrow: true },
      { label: "− trống và nợ khó đòi", arrow: true },
      { label: "− chi phí vận hành (quản lý, bảo trì, thuế, bảo hiểm)", arrow: true },
      { label: "= NOI", arrow: true },
      { label: "÷ cap rate = giá trị tài sản" },
    ],
    interactiveType: "multiples",
    realWorldExample: {
      company: "Hồ sơ chào bán toà nhà văn phòng",
      description:
        "NOI trong hồ sơ chào bán thường được tính với giả định lấp đầy cao hơn thực tế và chi phí bảo trì thấp hơn thực tế. Người mua có kinh nghiệm luôn dựng lại NOI từ hợp đồng thuê thật và hoá đơn vận hành 24 tháng gần nhất, thay vì lấy con số trong hồ sơ - vì chênh 10% ở NOI là chênh 10% ở giá.",
    },
    quiz: [
      {
        question: "NOI được tính thế nào?",
        options: [
          "Doanh thu thuê thực tế trừ chi phí vận hành",
          "Doanh thu thuê trừ mọi chi phí, cả lãi vay",
          "Lợi nhuận sau thuế cộng lại khấu hao",
          "Tổng tiền thuê thu được trong năm",
        ],
        correct: 0,
        explanation:
          "NOI đứng trước lãi vay, thuế và khấu hao - nó đo hiệu quả của bản thân tài sản, độc lập với cách chủ sở hữu tài trợ cho nó.",
      },
      {
        question: "Cap rate tăng từ 8% lên 9% với NOI không đổi thì giá trị thay đổi ra sao?",
        options: [
          "Giảm khoảng 11%, vì giá trị tỉ lệ nghịch với cap rate",
          "Tăng khoảng 12,5% do tỷ suất sinh lời cao hơn",
          "Giảm đúng 1%, bằng mức cap rate vừa tăng thêm",
          "Không đổi vì NOI mới là yếu tố quyết định giá trị tài sản",
        ],
        correct: 0,
        explanation:
          "40/0,08 = 500 và 40/0,09 = 444. Cap rate là mẫu số, nên quan hệ là nghịch đảo chứ không phải trừ đi một điểm phần trăm.",
      },
      {
        question: "Khoản nào KHÔNG được trừ khi tính NOI?",
        options: [
          "Lãi vay ngân hàng",
          "Phí quản lý toà nhà",
          "Bảo hiểm tài sản",
          "Chi phí bảo trì",
        ],
        correct: 0,
        explanation:
          "Lãi vay là chi phí của cách tài trợ, không phải của tài sản. Trừ nó vào NOI sẽ khiến cùng một toà nhà có hai giá trị khác nhau tuỳ ai đang sở hữu.",
      },
      {
        question: "Ba khoản người mới hay quên trừ khi tính NOI là gì?",
        options: [
          "Tỷ lệ trống, nợ khó đòi và chi phí thay thế định kỳ",
          "Thuế, khấu hao và lãi vay",
          "Hoa hồng môi giới, phí công chứng và lệ phí trước bạ khi mua bán",
          "Chi phí marketing, chi phí nhân sự và chi phí điện nước của toà nhà",
        ],
        correct: 0,
        explanation:
          "Giả định lấp đầy 100% và bỏ qua khoản thay thế thang máy, điều hoà theo chu kỳ là hai cách phổ biến nhất để NOI trong hồ sơ đẹp hơn NOI thật.",
      },
      {
        question: "Vì sao NOI dễ bị thổi phồng hơn lợi nhuận kế toán?",
        options: [
          "Vì không có chuẩn mực kế toán nào ràng buộc cách tính NOI",
          "Vì NOI không phải nộp thuế",
          "Vì NOI chỉ được dùng nội bộ và không xuất hiện trong hợp đồng mua bán",
          "Vì chuẩn mực cho phép ghi nhận doanh thu thuê theo phương pháp dồn tích",
        ],
        correct: 0,
        explanation:
          "Lợi nhuận kế toán có chuẩn mực và có kiểm toán. NOI là một quy ước ngành, nên mỗi hồ sơ có thể định nghĩa hơi khác - và chênh lệch đó nhân thẳng vào giá.",
      },
    ],
    keyTakeaways: [
      "NOI = doanh thu thuê thực tế − chi phí vận hành. Đứng trước lãi vay, thuế và khấu hao.",
      "Giá trị = NOI / cap rate. Cap rate là mẫu số nên quan hệ với giá là nghịch đảo.",
      "Không trừ lãi vay vào NOI - đó là chi phí của cách tài trợ, không phải của tài sản.",
      "Ba khoản hay bị quên: tỷ lệ trống, nợ khó đòi, chi phí thay thế định kỳ.",
    ],
    summary: {
      keyIdea: "NOI đứng trước lãi vay, thuế và khấu hao, nên nó đo tài sản chứ không đo cách tài trợ",
      formula: "Giá trị = NOI / cap rate",
      commonMistake: "Trừ lãi vay vào NOI. Lãi vay là chi phí của cách tài trợ, không phải của toà nhà.",
      action: "Khi nhận một con số NOI, kiểm ba khoản hay bị bỏ: tỷ lệ trống, nợ khó đòi, và chi phí thay thế định kỳ.",
    },
    application: {
      title: "Kiểm một con số NOI",
      message: "Lấy một bảng tính NOI bất kỳ và hỏi ba câu: doanh thu đã trừ tỷ lệ trống chưa, đã trừ phần không thu được chưa, và đã có khoản dự trữ thay thế thiết bị chưa.",
      secondary: "Thiếu cả ba thì NOI cao hơn thực tế chừng 10-15%, và vì giá trị bằng NOI chia cap rate, sai số đó đi thẳng vào định giá.",
    },
    sections: [
      {
        type: "lead",
        text: "Một toà nhà cho thuê không được định giá bằng chi phí đã bỏ ra để xây nó. Nó được định giá bằng dòng tiền nó tạo ra - và trong ngành này, dòng tiền đó có một cái tên và một cách tính riêng.",
      },
      { type: "heading", text: "Từ tiền thuê tới NOI" },
      {
        type: "formula",
        title: "Thu nhập hoạt động ròng",
        equation: "NOI = doanh thu thuê tiềm năng − trống và nợ khó đòi − chi phí vận hành",
        variables: [
          { symbol: "trống", name: "vacancy", description: "phần diện tích không có khách thuê trong kỳ" },
          { symbol: "chi phí vận hành", name: "operating expenses", description: "quản lý, bảo trì, bảo hiểm, thuế tài sản - không gồm lãi vay và khấu hao" },
        ],
        example: {
          title: "Toà văn phòng 10.000 m²",
          calculation: "Thuê tiềm năng 60 tỷ − trống 10% − vận hành 14 tỷ",
          result: "NOI = 40 tỷ",
          explanation: "Với cap rate thị trường 8%, giá trị ước tính là 500 tỷ. Nếu tỷ lệ trống thực tế là 20% chứ không phải 10%, NOI còn 34 tỷ và giá trị rơi xuống 425 tỷ.",
        },
      },
      { type: "heading", text: "Vì sao lãi vay không nằm trong NOI" },
      {
        type: "paragraph",
        text: "NOI đo hiệu quả của bản thân tài sản, độc lập với việc ai sở hữu và họ vay bao nhiêu. Nếu trừ lãi vay vào, cùng một toà nhà sẽ có giá trị khác nhau tuỳ người mua vay nhiều hay ít - điều đó vô lý, vì toà nhà không đổi. Cách tài trợ ảnh hưởng tới lợi nhuận của chủ sở hữu, không tới giá trị của tài sản.",
      },
      {
        type: "callout",
        label: "Ba khoản trong hồ sơ chào bán hay thiếu",
        text: "Tỷ lệ trống lấy theo giả định thay vì theo lịch sử; nợ khó đòi bằng 0; và chi phí thay thế định kỳ - thang máy, điều hoà, chống thấm - bị bỏ hẳn vì chúng không phát sinh hằng năm. Cả ba đều đẩy NOI lên, và mỗi 10% NOI là 10% giá.",
      },
      {
        type: "closing",
        lines: [
          "NOI là con số duy nhất cần tính đúng khi mua một toà nhà cho thuê.",
          "Và cách kiểm tra nó không nằm trong hồ sơ chào bán, mà nằm ở hợp đồng thuê và hoá đơn vận hành hai năm gần nhất.",
        ],
      },
    ],
  },

  {
    id: 1735,
    slug: "rui-ro-du-an-bat-dong-san-va-kich-ban",
    title: "Dự án BĐS, Bài 5: Ba rủi ro và cách chúng cộng dồn vào nhau",
    subtitle: "Chậm pháp lý, vượt chi phí, thị trường quay đầu - và vì sao chúng không bao giờ xảy ra riêng lẻ",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⚠️",
    track: "professional",
    whyItMatters:
      "Bảng độ nhạy một chiều là công cụ chuẩn của mọi hồ sơ dự án, và nó có một điểm mù nghiêm trọng: nó giả định các rủi ro xảy ra riêng lẻ. Trong bất động sản chúng gần như luôn đi cùng nhau, và đó là lý do những dự án đổ vỡ thường đổ nhanh hơn mọi kịch bản đã dựng.",
    openingQuestion:
      "Dự án chậm pháp lý 18 tháng. Chi phí xây dựng và giá bán bị ảnh hưởng thế nào?",
    openingOptions: [
      "Chi phí thường tăng và giá bán có thể đã đổi - ba rủi ro đi cùng nhau",
      "Chỉ tăng chi phí lãi vay, chi phí xây dựng và giá bán giữ nguyên",
      "Giá bán tăng theo lạm phát nên phần nào bù được chi phí chậm tiến độ",
      "Không ảnh hưởng gì nếu hợp đồng với nhà thầu đã chốt đơn giá cố định",
    ],
    correctOption: 0,
    explanation:
      "Đây là điểm mù của bảng độ nhạy một chiều. Chậm 18 tháng không chỉ cộng lãi vay: đơn giá vật liệu và nhân công đã đổi, hợp đồng nhà thầu giá cố định thường có điều khoản điều chỉnh khi kéo dài, và quan trọng nhất là thị trường 18 tháng sau có thể không còn là thị trường lúc lập kế hoạch. Ba rủi ro này tương quan dương với nhau, nên kịch bản xấu thật luôn xấu hơn tổng ba kịch bản xấu tính riêng. Cách xử lý không phải là dự phòng lớn hơn, mà là dựng kịch bản trong đó cả ba cùng xảy ra - và xem chủ đầu tư còn trụ được không.",
    diagram: [
      { label: "Chậm pháp lý", arrow: true },
      { label: "→ lãi vay tích thêm + đơn giá xây dựng đã đổi", arrow: true },
      { label: "→ mở bán vào một thị trường khác", arrow: true },
      { label: "Ba rủi ro tương quan dương, không cộng đơn giản" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Chu kỳ bất động sản Việt Nam 2019-2023",
      description:
        "Nhiều dự án khởi động khi thị trường đang nóng, vướng pháp lý hai đến ba năm, rồi đủ điều kiện mở bán đúng lúc tín dụng siết và nhu cầu nguội. Không rủi ro nào trong ba cái là bất ngờ; cái bất ngờ là chúng đến cùng lúc, và đó chính là điều mà bảng độ nhạy một chiều không bao giờ chỉ ra.",
    },
    quiz: [
      {
        question: "Điểm mù của bảng độ nhạy một chiều là gì?",
        options: [
          "Nó giả định mỗi biến số thay đổi riêng lẻ",
          "Nó không tính được ảnh hưởng của lãi suất tới dòng tiền dự án",
          "Nó đòi hỏi quá nhiều dữ liệu lịch sử nên khó áp dụng thực tế",
          "Nó chỉ dùng cho dự án cho thuê",
        ],
        correct: 0,
        explanation:
          "Trong thực tế các biến số tương quan với nhau. Bảng một chiều cho ra một dải kết quả hẹp hơn hẳn dải rủi ro thật.",
      },
      {
        question: "Vì sao chậm pháp lý kéo theo tăng chi phí xây dựng?",
        options: [
          "Vì đơn giá vật liệu và nhân công đã đổi khi dự án khởi động lại",
          "Vì nhà thầu tính phí phạt tạm dừng",
          "Vì hạ tầng xuống cấp phải xây lại",
          "Vì phải áp tiêu chuẩn xây dựng mới",
        ],
        correct: 0,
        explanation:
          "Hợp đồng đơn giá cố định thường có điều khoản điều chỉnh khi thời gian kéo dài quá một ngưỡng, nên nó không bảo vệ được như người ta tưởng.",
      },
      {
        question: "Cách xử lý đúng khi ba rủi ro tương quan dương là gì?",
        options: [
          "Dựng kịch bản trong đó cả ba cùng xảy ra",
          "Tăng khoản dự phòng lên tương ứng với tổng ba rủi ro riêng lẻ",
          "Nâng tỷ suất chiết khấu để phản ánh mức rủi ro cao hơn của dự án",
          "Giảm quy mô dự án xuống để tổng vốn cần huy động nhỏ lại",
        ],
        correct: 0,
        explanation:
          "Câu hỏi cần trả lời là chủ đầu tư có trụ được qua kịch bản đó không. Một khoản dự phòng lớn hơn không trả lời được câu đó.",
      },
      {
        question: "Rủi ro nào của dự án BĐS khó phòng ngừa nhất?",
        options: [
          "Thị trường quay đầu vào đúng lúc mở bán",
          "Vượt dự toán xây dựng",
          "Nhà thầu chậm tiến độ so với hợp đồng đã ký kết",
          "Lãi suất vay tăng trong giai đoạn thi công công trình",
        ],
        correct: 0,
        explanation:
          "Ba rủi ro kia đều có công cụ: hợp đồng đơn giá cố định, điều khoản phạt tiến độ, hợp đồng lãi suất. Chu kỳ thị trường thì không có công cụ nào.",
      },
      {
        question: "Vì sao dự án đổ vỡ thường đổ nhanh hơn kịch bản đã dựng?",
        options: [
          "Vì các rủi ro xảy ra cùng lúc và khuếch đại lẫn nhau",
          "Vì chủ đầu tư thường giấu thông tin cho tới khi không giấu được nữa",
          "Vì ngân hàng đồng loạt thu hồi nợ ngay khi thấy dấu hiệu bất lợi",
          "Vì người mua ngừng thanh toán theo tiến độ khi công trình chậm",
        ],
        correct: 0,
        explanation:
          "Chậm làm tăng chi phí, chi phí tăng làm cạn vốn, cạn vốn làm chậm thêm. Đó là một vòng lặp, và mô hình tuyến tính không mô tả được vòng lặp.",
      },
    ],
    keyTakeaways: [
      "Ba rủi ro chính: chậm pháp lý, vượt chi phí, thị trường quay đầu - và chúng tương quan dương.",
      "Bảng độ nhạy một chiều cho dải kết quả hẹp hơn dải rủi ro thật.",
      "Dựng kịch bản cả ba cùng xảy ra, rồi hỏi chủ đầu tư có trụ nổi không.",
      "Chu kỳ thị trường là rủi ro duy nhất không có công cụ phòng ngừa bằng hợp đồng.",
    ],
    summary: {
      keyIdea: "Ba rủi ro chính tương quan dương với nhau, nên chúng không bao giờ xảy ra riêng lẻ",
      commonMistake: "Dùng bảng độ nhạy một chiều rồi kết luận dải kết quả hẹp - nó hẹp vì mỗi lần chỉ đổi một biến.",
      action: "Dựng một kịch bản có cả ba rủi ro cùng xảy ra ở mức vừa phải, rồi hỏi chủ đầu tư có trụ nổi không.",
    },
    application: {
      title: "Kịch bản ba rủi ro cùng lúc",
      message: "Lấy một dự án và đặt đồng thời: pháp lý chậm 12 tháng, chi phí xây vượt 10%, giá bán giảm 10%. Tính lại đỉnh vốn và lợi nhuận trong kịch bản đó.",
      secondary: "Ba biến này cùng bị đẩy bởi chu kỳ thị trường, nên xác suất chúng cùng xấu cao hơn nhiều so với tích ba xác suất riêng lẻ.",
    },
    sections: [
      {
        type: "lead",
        text: "Hồ sơ dự án nào cũng có một bảng độ nhạy: giá bán giảm 10% thì sao, chi phí tăng 10% thì sao. Bảng đó hữu ích, và nó có một điểm mù đủ lớn để làm hỏng cả kết luận.",
      },
      { type: "heading", text: "Ba rủi ro" },
      {
        type: "list",
        items: [
          "Chậm pháp lý: không đoán trước được thời lượng, và là rủi ro duy nhất có thể kéo dài nhiều năm.",
          "Vượt chi phí: đơn giá vật liệu, phát sinh thiết kế, chi phí giải phóng mặt bằng cao hơn dự tính.",
          "Thị trường quay đầu: mở bán vào một chu kỳ khác với chu kỳ lúc lập kế hoạch.",
        ],
      },
      { type: "heading", text: "Vì sao không được cộng riêng lẻ" },
      {
        type: "paragraph",
        text: "Chậm 18 tháng làm lãi vay tích thêm, làm đơn giá xây dựng đã đổi so với dự toán, và đẩy ngày mở bán vào một thị trường khác. Ba biến số trong bảng độ nhạy hoá ra là ba biểu hiện của cùng một nguyên nhân. Cộng ba kịch bản xấu riêng lẻ vẫn ra một con số nhẹ hơn thực tế, vì thực tế còn có vòng lặp: cạn vốn làm chậm thêm, chậm thêm làm cạn vốn nhanh hơn.",
      },
      {
        type: "comparison",
        left: { label: "Bảng độ nhạy", text: "Đổi một biến, giữ nguyên phần còn lại. Trả lời: dự án chịu được bao nhiêu nếu chỉ một thứ hỏng." },
        right: { label: "Kịch bản", text: "Đổi cả nhóm biến cùng lúc theo một câu chuyện có thật. Trả lời: chủ đầu tư có trụ được qua một năm xấu không." },
      },
      {
        type: "callout",
        label: "Rủi ro không mua bảo hiểm được",
        text: "Đơn giá cố định phòng được rủi ro chi phí. Điều khoản phạt phòng được rủi ro nhà thầu. Hợp đồng lãi suất phòng được rủi ro lãi vay. Chu kỳ thị trường thì không có công cụ nào - cách duy nhất là không để đỉnh vốn âm rơi vào lúc mình không còn khả năng xoay.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi cuối cùng của mọi hồ sơ dự án không phải lãi bao nhiêu.",
          "Mà là: nếu ba thứ cùng hỏng một lúc, chúng ta còn đứng được không.",
        ],
      },
    ],
  },
];
