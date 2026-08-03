import type { Lesson } from "./lesson-types";

// Hai bài mở rộng thêm cho FRM (ids 1562-1563, professional track): rủi ro
// tín dụng chủ quyền (Credit Risk Measurement and Management) và rủi ro hệ
// thống từ tài sản số/stablecoin (Current Issues in Financial Markets) -
// hai lỗ hổng còn lại được ghi chú trong lib/frm-track.ts sau đợt viết
// trước (lib/frm-credit-current-lessons.ts).

export const FRM_SOVEREIGN_DIGITAL_LESSONS: Lesson[] = [
  {
    id: 1562,
    slug: "rui-ro-tin-dung-chu-quyen-sovereign-credit-risk",
    title: "FRM Credit Risk, Bài 4: Rủi ro tín dụng chủ quyền (Sovereign Credit Risk)",
    subtitle: "Một chính phủ không thể bị buộc phá sản như doanh nghiệp - nhưng vẫn có thể chọn không trả nợ",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🏛️",
    track: "professional",
    whyItMatters:
      "Rủi ro tín dụng chủ quyền khác về bản chất so với rủi ro tín dụng doanh nghiệp: không có toà án phá sản quốc tế nào có thể tịch thu tài sản của một chính phủ để trả nợ chủ nợ. Hiểu sự khác biệt này là điều kiện để đọc đúng ý nghĩa của một xếp hạng tín nhiệm quốc gia, và để không nhầm lẫn giữa khả năng trả nợ với sự sẵn lòng trả nợ.",
    openingQuestion: "Điểm khác biệt cốt lõi giữa rủi ro tín dụng chủ quyền và rủi ro tín dụng doanh nghiệp là gì?",
    openingOptions: [
      "Không có khác biệt nào, cả hai được đánh giá bằng đúng một bộ chỉ số tài chính giống hệt nhau",
      "Chủ nợ không thể ép một quốc gia vào thủ tục phá sản hay tịch thu tài sản như với doanh nghiệp, nên vỡ nợ chủ quyền phần lớn là lựa chọn chính trị, không chỉ là hết khả năng chi trả",
      "Rủi ro tín dụng chủ quyền chỉ tồn tại ở các nước đang phát triển, không tồn tại ở các nước phát triển",
      "Doanh nghiệp không bao giờ vỡ nợ nên chỉ có chính phủ mới có loại rủi ro tín dụng này",
    ],
    correctOption: 1,
    explanation:
      "Khi một doanh nghiệp vỡ nợ, chủ nợ có thể khởi kiện, yêu cầu toà án tịch thu và thanh lý tài sản. Không cơ chế tương đương nào áp dụng được cho một quốc gia có chủ quyền - việc trả nợ hay không phần lớn phụ thuộc vào ý chí chính trị của chính phủ đó (willingness to pay), không chỉ khả năng tài chính khách quan (ability to pay). Đây là lý do phân tích tín dụng chủ quyền luôn phải xét cả yếu tố chính trị, không chỉ số liệu kinh tế vĩ mô.",
    diagram: [
      { label: "Đánh giá khả năng trả nợ: GDP, nợ công/GDP, dự trữ ngoại hối", arrow: true },
      { label: "Đánh giá thêm ý chí trả nợ: ổn định chính trị, lịch sử vỡ nợ", arrow: true },
      { label: "Một quốc gia có thể đủ khả năng nhưng vẫn chọn không trả (chính trị)", arrow: true },
      { label: "Không có toà án phá sản quốc tế cưỡng chế thi hành" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Nga, 1998 và Argentina, 2001",
      description:
        "Nga vỡ nợ trái phiếu nội tệ năm 1998 dù về mặt kỹ thuật có thể tự in thêm tiền để trả - chính phủ khi đó chọn ưu tiên ổn định tỷ giá và kiềm chế lạm phát hơn là trả nợ, một quyết định chính trị thuần tuý. Argentina vỡ nợ trái phiếu ngoại tệ năm 2001 sau khủng hoảng kinh tế kéo dài, và tiếp tục tranh chấp pháp lý với một nhóm trái chủ (\"holdout creditors\") trong hơn một thập kỷ sau đó - minh chứng cho việc không có cơ chế cưỡng chế thi hành rõ ràng như phá sản doanh nghiệp.",
    },
    quiz: [
      {
        question: "\"Ability to pay\" và \"willingness to pay\" trong phân tích tín dụng chủ quyền khác nhau ở điểm nào?",
        options: [
          "Ability to pay là khả năng tài chính khách quan; willingness to pay là yếu tố chính trị - liệu chính phủ có chọn trả nợ hay không",
          "Hai khái niệm này hoàn toàn giống nhau và luôn được mọi cơ quan xếp hạng tín nhiệm quốc tế gộp chung thành một chỉ số duy nhất khi công bố báo cáo đánh giá quốc gia",
          "Ability to pay chỉ áp dụng cho doanh nghiệp, willingness to pay chỉ áp dụng cho chính phủ trong mọi trường hợp phân tích tín dụng",
          "Willingness to pay là chỉ số được tính hoàn toàn tự động từ báo cáo ngân sách nhà nước công bố hằng năm",
        ],
        correct: 0,
        explanation:
          "Đây là lý do phân tích tín dụng chủ quyền phức tạp hơn phân tích tín dụng doanh nghiệp thuần tuý: hai quốc gia có chỉ số kinh tế vĩ mô giống hệt nhau vẫn có thể có xếp hạng khác nhau nếu mức độ ổn định chính trị và lịch sử trả nợ khác nhau.",
      },
      {
        question: "Vì sao Nga vẫn vỡ nợ trái phiếu nội tệ năm 1998 dù về lý thuyết có thể tự in thêm tiền để trả?",
        options: [
          "Vì ngân hàng trung ương Nga khi đó không có thẩm quyền pháp lý để phát hành thêm tiền tệ nội địa trong bất kỳ hoàn cảnh nào, kể cả khi được chính phủ trung ương yêu cầu trực tiếp",
          "Chính phủ ưu tiên ổn định tỷ giá và kiềm lạm phát hơn trả nợ bằng in tiền - một lựa chọn chính trị",
          "Vì luật pháp quốc tế cấm hoàn toàn việc các quốc gia in thêm tiền để trả nợ công",
          "Vì Nga không có đủ nhà máy in tiền để sản xuất đủ lượng tiền mặt cần thiết",
        ],
        correct: 1,
        explanation:
          "In tiền để trả nợ nội tệ về mặt kỹ thuật luôn khả thi với một quốc gia có chủ quyền tiền tệ, nhưng cái giá phải trả là lạm phát phi mã và mất giá đồng nội tệ. Nga chọn không làm vậy để bảo vệ tỷ giá - minh chứng rõ ràng cho việc vỡ nợ chủ quyền thường là kết quả của một phép tính đánh đổi chính trị, không phải bất khả kháng kỹ thuật.",
      },
      {
        question: "Tranh chấp giữa Argentina và nhóm \"holdout creditors\" sau 2001 minh hoạ điều gì về rủi ro tín dụng chủ quyền?",
        options: [
          "Minh hoạ rằng chủ nợ luôn thu hồi được toàn bộ khoản nợ đúng hạn thông qua toà án quốc tế trong mọi trường hợp vỡ nợ chủ quyền, bất kể quốc gia vay nợ là ai",
          "Không có cơ chế cưỡng chế rõ ràng như phá sản doanh nghiệp - tranh chấp kéo dài hơn một thập kỷ",
          "Minh hoạ rằng Argentina đã trả đầy đủ 100% nợ gốc và lãi cho mọi trái chủ ngay trong năm 2001",
          "Minh hoạ rằng rủi ro tín dụng chủ quyền chỉ tồn tại trên lý thuyết, chưa từng có quốc gia nào thực sự vỡ nợ",
        ],
        correct: 1,
        explanation:
          "Đây chính là điểm khác biệt cấu trúc so với phá sản doanh nghiệp: không có một toà án phá sản quốc tế thống nhất có thẩm quyền cưỡng chế tái cơ cấu nợ chủ quyền, nên các vụ tranh chấp có thể kéo dài rất lâu, tạo ra sự bất định lớn cho cả chủ nợ lẫn quốc gia vay nợ.",
      },
      {
        question: "Vì sao hai quốc gia có cùng tỷ lệ nợ công/GDP vẫn có thể được xếp hạng tín nhiệm chủ quyền khác nhau?",
        options: [
          "Vì các cơ quan xếp hạng luôn xếp hạng ngẫu nhiên, không dựa trên bất kỳ tiêu chí phân tích cụ thể nào",
          "Vì xếp hạng chủ quyền còn xét tới yếu tố ổn định chính trị, chất lượng thể chế và lịch sử trả nợ (willingness to pay), không chỉ dừng ở tỷ lệ nợ công/GDP đơn thuần",
          "Vì tỷ lệ nợ công/GDP không bao giờ được dùng trong xếp hạng tín nhiệm chủ quyền",
          "Vì chỉ có duy nhất một quốc gia trên thế giới được phép có xếp hạng tín nhiệm chính thức",
        ],
        correct: 1,
        explanation:
          "Đây là ứng dụng trực tiếp của khái niệm willingness to pay: cùng một mức nợ công/GDP, một quốc gia có thể chế ổn định và lịch sử trả nợ tốt thường được xếp hạng cao hơn một quốc gia bất ổn chính trị, dù chỉ số tài chính thuần tuý giống hệt nhau.",
      },
    ],
    keyTakeaways: [
      "Rủi ro tín dụng chủ quyền khác về bản chất với rủi ro doanh nghiệp: không có toà án phá sản quốc tế cưỡng chế thi hành việc trả nợ",
      "Ability to pay (khả năng tài chính khách quan) và willingness to pay (ý chí chính trị) là hai trục đánh giá độc lập, cả hai đều cần thiết",
      "Nga (1998) vỡ nợ dù có thể in thêm tiền - một lựa chọn chính trị ưu tiên ổn định tỷ giá, không phải bất khả kháng kỹ thuật",
      "Argentina - holdout creditors (2001+): thiếu cơ chế cưỡng chế rõ ràng khiến tranh chấp vỡ nợ chủ quyền có thể kéo dài hơn một thập kỷ",
    ],
    summary: {
      keyIdea: "Vỡ nợ chủ quyền hiếm khi là chuyện không thể trả - nó thường là chuyện chọn không trả. Nga 1998 vỡ nợ dù in được tiền, vì ưu tiên ổn định tỷ giá.",
      commonMistake: "Đánh giá quốc gia bằng đúng bộ chỉ số dùng cho doanh nghiệp. Không có toà án phá sản quốc tế nào cưỡng chế được một chính phủ.",
    },
    application: {
      title: "Hai trục phải đọc cùng nhau",
      message: "Khả năng trả đo bằng số liệu; ý chí trả đo bằng chính trị. Một nước có tỷ lệ nợ trên GDP đẹp vẫn có thể vỡ nợ, và ngược lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi phân tích một khoản vay doanh nghiệp, câu hỏi cốt lõi là: công ty này có đủ dòng tiền để trả nợ không. Với một quốc gia, câu hỏi đó chưa đủ - còn phải hỏi thêm: quốc gia này có MUỐN trả nợ không, vì không ai có thể ép buộc một chính phủ có chủ quyền.",
      },
      {
        type: "heading",
        text: "Hai trục đánh giá độc lập",
      },
      {
        type: "conceptTable",
        title: "Ability to pay vs. Willingness to pay",
        subtitle: "Cả hai đều cần thiết, thiếu một cũng làm sai lệch đánh giá",
        concepts: [
          { vi: "Khả năng trả nợ", en: "Ability to pay", def: "Chỉ số tài chính khách quan: GDP, tăng trưởng, nợ công/GDP, dự trữ ngoại hối, cán cân vãng lai." },
          { vi: "Ý chí trả nợ", en: "Willingness to pay", def: "Yếu tố chính trị - thể chế: ổn định chính trị, chất lượng quản trị nhà nước, lịch sử vỡ nợ trong quá khứ, ưu tiên chính sách của chính phủ đương nhiệm." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao không có \"phá sản chủ quyền\" theo nghĩa doanh nghiệp",
        text: "Doanh nghiệp phá sản có quy trình pháp lý rõ ràng: toà án chỉ định người quản lý tài sản, xếp hạng ưu tiên chủ nợ, thanh lý tài sản. Với một quốc gia, không tài sản nào có thể bị \"tịch thu\" theo nghĩa đó - tái cơ cấu nợ chủ quyền luôn là một quá trình đàm phán song phương hoặc đa phương, không có cơ quan tài phán thống nhất toàn cầu.",
      },
      {
        type: "heading",
        text: "Đồng tiền vay nợ quyết định câu hỏi nào là câu hỏi thật"
      },
      {
        type: "comparison",
        left: {
          label: "Nợ bằng đồng tiền của chính mình",
          text: "Về mặt kỹ thuật, chính phủ luôn trả được - nó phát hành được đồng tiền đó. Nghĩa là vỡ nợ ở đây gần như luôn là một LỰA CHỌN, không phải một sự bất khả. Nhưng lựa chọn thay thế cũng có giá: in tiền để trả nợ đẩy lạm phát lên và làm mất giá khoản nợ theo cách khác. Câu hỏi thật ở đây là ý chí trả nợ và cái giá chính trị của từng phương án."
        },
        right: {
          label: "Nợ bằng ngoại tệ",
          text: "Chính phủ không in được đồng tiền đó, nên khả năng trả bị chặn bởi dự trữ ngoại hối và nguồn thu ngoại tệ. Đây là chỗ vỡ nợ chủ quyền thật sự xảy ra, và chỉ số đáng nhìn nhất là dự trữ ngoại hối so với nghĩa vụ ngoại tệ đến hạn trong 12 tháng tới - chứ không phải tỷ lệ nợ trên GDP."
        }
      },
      {
        type: "callout",
        label: "Vì sao không có phá sản chủ quyền theo nghĩa doanh nghiệp",
        text: "Doanh nghiệp phá sản có một quy trình pháp lý rõ ràng: toà án chỉ định người quản lý tài sản, xếp thứ tự ưu tiên chủ nợ, thanh lý hoặc tái cơ cấu theo phán quyết cưỡng chế được. Với một quốc gia thì không có toà án nào có thẩm quyền như vậy và không có tài sản nào bị thu giữ được một cách hệ thống. Tái cơ cấu nợ chủ quyền vì thế là một cuộc đàm phán, không phải một thủ tục - kết quả phụ thuộc vào tương quan đàm phán, vào việc quốc gia đó có cần quay lại thị trường vốn hay không, và vào điều khoản hành động tập thể trong chính hợp đồng trái phiếu."
      },
      {
        type: "paragraph",
        text: "Hệ quả thực hành: hai quốc gia có cùng tỷ lệ nợ trên GDP có thể có rủi ro hoàn toàn khác nhau, và con số đó một mình gần như không nói được gì. Cần đọc kèm ít nhất bốn thứ - tỷ trọng nợ bằng ngoại tệ, cơ cấu kỳ hạn và lượng nợ phải đảo trong năm tới, ai đang nắm nợ đó (trong nước hay nước ngoài), và lịch sử ý chí trả nợ của chính quốc gia đó. Một quốc gia từng vỡ nợ vẫn bị thị trường tính phí cao hơn nhiều năm sau, dù các chỉ số tài khoá đã lành mạnh trở lại."
      },
      {
        type: "closing",
        lines: [
          "Đọc một xếp hạng tín nhiệm quốc gia đòi hỏi hỏi cả hai câu: quốc gia này có tiền không, và quốc gia này có muốn trả không.",
          "Bài này khép lại phần mở rộng của môn Credit Risk Measurement and Management.",
        ],
      },
    ],
  },
  {
    id: 1563,
    slug: "stablecoin-va-rui-ro-he-thong-tai-san-so",
    title: "FRM Current Issues, Bài 3: Stablecoin và rủi ro hệ thống từ tài sản số",
    subtitle: "Một đồng tiền số hứa \"neo giá 1:1\" vẫn có thể mất neo trong vài giờ - và kéo theo cả một hệ sinh thái",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🪙",
    track: "professional",
    whyItMatters:
      "Stablecoin đã phát triển thành một phần quan trọng của hệ thống thanh toán tài sản số, với tổng vốn hoá hàng trăm tỷ USD. Nhưng lời hứa \"ổn định 1:1 với USD\" của chúng dựa trên các cơ chế rất khác nhau - một số được hậu thuẫn hoàn toàn bằng tài sản dự trữ, một số dựa trên thuật toán không có tài sản đảm bảo thực - và sự sụp đổ của loại thứ hai đã trở thành case study kinh điển của current issues trong FRM.",
    openingQuestion: "Điểm khác biệt cốt lõi giữa stablecoin được hậu thuẫn bằng tài sản dự trữ (asset-backed) và stablecoin thuật toán (algorithmic) là gì?",
    openingOptions: [
      "Không có khác biệt gì, cả hai loại đều có cùng mức độ rủi ro và được quản lý bởi cùng một cơ chế kỹ thuật",
      "Stablecoin asset-backed được đảm bảo bằng tài sản dự trữ thực (tiền mặt, trái phiếu kho bạc) có thể kiểm toán; stablecoin thuật toán duy trì giá neo bằng cơ chế cung-cầu và một token phụ trợ, không có tài sản dự trữ tương đương đầy đủ",
          "Stablecoin thuật toán luôn an toàn hơn vì không phụ thuộc vào bất kỳ tổ chức tài chính truyền thống nào",
          "Stablecoin asset-backed chỉ tồn tại trên lý thuyết, chưa từng được phát hành thực tế trên thị trường",
    ],
    correctOption: 1,
    explanation:
      "Stablecoin asset-backed (như USDC, USDT) tuyên bố giữ dự trữ tương đương giá trị token đang lưu hành, dù chất lượng và tính minh bạch của dự trữ đó khác nhau giữa các nhà phát hành. Stablecoin thuật toán (như TerraUSD/UST trước khi sụp đổ) không có dự trữ tương đương, mà dựa vào cơ chế arbitrage giữa token chính và một token phụ trợ để giữ giá neo - một cơ chế chỉ hoạt động khi niềm tin thị trường còn nguyên vẹn.",
    diagram: [
      { label: "Stablecoin thuật toán duy trì giá neo qua cơ chế arbitrage với token phụ trợ", arrow: true },
      { label: "Niềm tin thị trường suy giảm, nhà đầu tư bắt đầu bán tháo", arrow: true },
      { label: "Cơ chế arbitrage không đủ sức hấp thụ áp lực bán, giá neo bị phá vỡ (de-peg)", arrow: true },
      { label: "Vòng xoáy giảm giá tự củng cố - cả token chính và token phụ trợ cùng sụp đổ" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "TerraUSD (UST) và Luna, tháng 5/2022",
      description:
        "UST là stablecoin thuật toán giữ giá neo 1 USD thông qua cơ chế đổi song song với token Luna (đổi 1 UST luôn lấy được 1 USD giá trị Luna và ngược lại). Khi một lượng lớn UST bị bán ra đồng loạt, cơ chế arbitrage không đủ sức hấp thụ, giá UST tuột khỏi mức neo. Cơ chế đổi song song khiến việc \"bảo vệ\" giá neo phải phát hành thêm Luna với tốc độ cực nhanh, làm nguồn cung Luna tăng vọt và giá Luna sụp đổ gần như về 0 chỉ trong vài ngày, xoá sổ khoảng 40 tỷ USD giá trị vốn hoá của cả hệ sinh thái.",
    },
    quiz: [
      {
        question: "Vì sao cơ chế \"đổi song song\" giữa UST và Luna trở thành một vòng xoáy tự huỷ khi niềm tin sụp đổ?",
        options: [
          "Bảo vệ giá neo UST đòi hỏi phát hành thêm Luna nhanh hơn khi áp lực bán tăng, làm giá Luna giảm mạnh",
          "Vì cơ chế đổi song song giữa hai token này hoàn toàn không liên quan gì tới nguồn cung hay giá của bất kỳ token nào trong hệ sinh thái Terra",
          "Vì sàn giao dịch nơi UST niêm yết đã chủ động đóng cửa giao dịch trước khi sự cố xảy ra",
          "Vì chính phủ Hàn Quốc đã ra lệnh cấm hoàn toàn việc giao dịch UST ngay khi ra mắt",
        ],
        correct: 0,
        explanation:
          "Đây là vòng xoáy phản hồi tiêu cực (negative feedback loop) kinh điển: cơ chế được thiết kế để ổn định giá lại chính là nguồn khuếch đại khủng hoảng khi vượt quá một ngưỡng áp lực bán nhất định - không khác gì đòn bẩy khuếch đại tổn thất đã học ở chặng Foundations.",
      },
      {
        question: "Vì sao stablecoin asset-backed (như được hậu thuẫn bằng trái phiếu kho bạc) vẫn không hoàn toàn miễn nhiễm với rủi ro mất giá neo?",
        options: [
          "Chất lượng, thanh khoản thực sự và tính minh bạch kiểm toán của dự trữ có thể khác xa công bố",
          "Vì loại stablecoin này hoàn toàn không có bất kỳ rủi ro nào trong mọi hoàn cảnh thị trường, kể cả khi toàn bộ hệ thống ngân hàng dự trữ sụp đổ cùng lúc",
          "Vì stablecoin asset-backed chỉ được phép phát hành bởi chính phủ, không phải bởi công ty tư nhân",
          "Vì loại stablecoin này chỉ tồn tại trên một sàn giao dịch duy nhất trên toàn thế giới",
        ],
        correct: 0,
        explanation:
          "Đây là điểm liên hệ trực tiếp với chặng Liquidity and Treasury Risk: nếu dự trữ hậu thuẫn không đủ thanh khoản để đáp ứng rút vốn đồng loạt (dù về lý thuyết đủ giá trị), hoặc nếu chất lượng kiểm toán dự trữ không đáng tin cậy, stablecoin vẫn có thể mất giá neo trong một kịch bản rút vốn hàng loạt.",
      },
      {
        question: "Vì sao các cơ quan quản lý tài chính coi rủi ro hệ thống từ stablecoin là một \"current issue\" cần theo dõi sát, dù quy mô còn nhỏ hơn nhiều so với hệ thống ngân hàng truyền thống?",
        options: [
          "Vì stablecoin đã hoàn toàn thay thế tiền pháp định trong mọi giao dịch tài chính toàn cầu tính đến hiện tại",
          "Vì mức độ liên kết giữa hệ sinh thái tài sản số và hệ thống tài chính truyền thống (thông qua sàn giao dịch, quỹ đầu tư, và cả trái phiếu kho bạc làm tài sản dự trữ) đang tăng nhanh, nên một cú sốc trong thị trường stablecoin có thể lan sang thị trường tài chính truyền thống",
          "Vì luật pháp hiện tại đã cấm hoàn toàn mọi hình thức giao dịch stablecoin trên toàn thế giới",
          "Vì rủi ro này chỉ ảnh hưởng tới các nhà đầu tư cá nhân, không có bất kỳ liên hệ nào tới tổ chức tài chính",
        ],
        correct: 1,
        explanation:
          "Đây chính là mẫu hình liên kết hệ thống đã học ở bài trước: quy mô tuyệt đối không phải yếu tố duy nhất quyết định rủi ro hệ thống, mà là mức độ kết nối. Một số stablecoin lớn nắm giữ lượng trái phiếu kho bạc Mỹ đáng kể làm dự trữ, nghĩa là một cú sốc rút vốn hàng loạt khỏi stablecoin cũng có thể buộc bán tháo trái phiếu kho bạc, ảnh hưởng ngược lại thị trường tài chính truyền thống.",
      },
      {
        question: "Bài học chung nào từ sự sụp đổ của TerraUSD/Luna liên hệ trực tiếp tới mẫu hình thất bại đã học ở chặng Foundations of Risk Management (LTCM, khủng hoảng 2008)?",
        options: [
          "Không có bài học chung nào, đây là hai loại sự kiện hoàn toàn không liên quan tới nhau về bản chất kỹ thuật lẫn hành vi thị trường theo bất kỳ khía cạnh phân tích rủi ro nào",
          "Một cơ chế ổn định trong điều kiện bình thường có thể khuếch đại khủng hoảng khi niềm tin sụp đổ",
          "Cả hai chỉ liên quan tới rủi ro lãi suất, không liên quan gì tới rủi ro thanh khoản hay hành vi thị trường",
          "Cả hai đều đã được giải quyết hoàn toàn bằng quy định pháp lý trước khi sự kiện xảy ra",
        ],
        correct: 1,
        explanation:
          "Đây là sợi chỉ xuyên suốt toàn bộ lộ trình FRM: dù là đòn bẩy của LTCM, cấu trúc phân lớp của CDO, hay cơ chế đổi song song của UST/Luna, mẫu hình thất bại luôn giống nhau - một cơ chế ổn định trong điều kiện bình thường trở thành cơ chế khuếch đại khủng hoảng đúng lúc nó được kỳ vọng phát huy tác dụng nhất.",
      },
    ],
    keyTakeaways: [
      "Stablecoin asset-backed được hậu thuẫn bằng tài sản dự trữ có thể kiểm toán; stablecoin thuật toán dựa vào cơ chế cung-cầu không có tài sản đảm bảo tương đương",
      "TerraUSD/Luna (5/2022): cơ chế đổi song song thiết kế để bảo vệ giá neo trở thành vòng xoáy tự huỷ khi áp lực bán vượt ngưỡng, xoá sổ khoảng 40 tỷ USD",
      "Ngay cả stablecoin asset-backed cũng không miễn nhiễm rủi ro mất giá neo nếu chất lượng/thanh khoản dự trữ và tính minh bạch kiểm toán không đảm bảo",
      "Liên kết ngày càng tăng giữa tài sản số và tài chính truyền thống (qua dự trữ trái phiếu kho bạc) khiến rủi ro stablecoin trở thành current issue dù quy mô còn nhỏ hơn hệ thống ngân hàng",
    ],
    summary: {
      keyIdea: "Rủi ro chính của stablecoin không nằm ở công nghệ mà ở chất lượng dự trữ và khả năng quy đổi - tức đúng bài toán rút tiền hàng loạt cổ điển trong một lớp vỏ mới.",
      commonMistake: "Coi stablecoin có tài sản bảo đảm là an toàn tuyệt đối. Nó vẫn mất neo nếu dự trữ kém thanh khoản đúng lúc nhiều người cùng quy đổi.",
    },
    application: {
      title: "Chỗ nối với tài chính truyền thống",
      message: "Dự trữ stablecoin phần lớn nằm ở trái phiếu kho bạc ngắn hạn. Một đợt quy đổi lớn vì thế trở thành một đợt bán trái phiếu lớn - và rủi ro thôi ở lại trong thế giới tài sản số.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài cuối cùng của đợt mở rộng FRM này, và nó khép vòng tròn: mẫu hình thất bại đã học ở bài đầu tiên của chặng Foundations - cơ chế ổn định biến thành cơ chế khuếch đại khủng hoảng - lặp lại y hệt trong một công nghệ ra đời cách đây chưa đầy một thập kỷ.",
      },
      {
        type: "heading",
        text: "Hai cơ chế giữ giá neo, hai loại rủi ro khác nhau",
      },
      {
        type: "comparison",
        left: { label: "Stablecoin Asset-backed", text: "Được hậu thuẫn bằng tài sản dự trữ (tiền mặt, trái phiếu kho bạc) - rủi ro nằm ở chất lượng, thanh khoản và tính minh bạch kiểm toán của dự trữ đó." },
        right: { label: "Stablecoin Thuật toán", text: "Không có tài sản dự trữ tương đương, giữ giá neo bằng cơ chế cung-cầu/arbitrage với token phụ trợ - rủi ro nằm ở chính cơ chế đó khi niềm tin sụp đổ." },
      },
      {
        type: "callout",
        label: "Vì sao đây vẫn là \"current issue\", không phải vấn đề đã đóng",
        text: "Sau sự sụp đổ của UST/Luna, phần lớn stablecoin thuật toán thuần tuý đã mất niềm tin thị trường, nhưng hệ sinh thái tài sản số tiếp tục phát triển các cơ chế mới (stablecoin lai, được hậu thuẫn một phần bằng tài sản thực và một phần bằng thuật toán). Cấu trúc rủi ro luôn thay đổi nhanh hơn tốc độ các cơ quan quản lý có thể ban hành quy định mới - đúng đặc điểm chung của mọi chủ đề trong môn Current Issues in Financial Markets.",
      },
      {
        type: "closing",
        lines: [
          "Từ ERM ở bài đầu chặng Foundations tới stablecoin ở đây: công nghệ thay đổi liên tục, nhưng câu hỏi risk manager cần đặt ra luôn giống nhau - cơ chế này giả định điều gì, và điều đó có còn đúng khi mọi thứ xấu đi cùng lúc không.",
          "Đây là bài cuối của đợt mở rộng lộ trình FRM lần này.",
        ],
      },
    ],
  },
];
