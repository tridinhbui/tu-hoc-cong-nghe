import type { Lesson } from "./lesson-types";

// Chặng "Định giá phái sinh & quản trị rủi ro thị trường" (ids 1411-1414).
//
// Chặng 9 (ids 181-200) dừng ở mức khái niệm: quyền chọn là gì, hợp đồng
// tương lai là gì, swap là gì. Nó không trả lời câu hỏi kế tiếp mà bất kỳ ai
// làm nghề cũng gặp: giá của quyền chọn từ đâu ra, và vị thế của tôi nhạy với
// cái gì. Bốn bài này lấp đúng khoảng đó - no-arbitrage và put-call parity
// trước (vì đó là nền tảng không cần toán cao cấp), rồi Black-Scholes như
// một hệ quả, rồi Greeks, rồi độ biến động - biến số duy nhất không quan sát
// được và cũng là nơi mọi tranh cãi về giá quyền chọn thực sự diễn ra.

export const DERIVATIVES_PRICING_LESSONS: Lesson[] = [
  {
    id: 1411,
    slug: "put-call-parity-va-nguyen-ly-khong-arbitrage",
    title: "Phái sinh, Bài 1: Put-Call Parity - định giá quyền chọn mà chưa cần công thức nào",
    subtitle: "Nguyên lý không có cơ hội kinh doanh chênh lệch giá và mối ràng buộc giữa call, put, cổ phiếu và trái phiếu",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Trước khi có bất kỳ mô hình định giá nào, đã tồn tại một ràng buộc buộc giá call và giá put phải khớp nhau. Hiểu put-call parity giúp bạn kiểm tra tính hợp lý của giá quyền chọn chỉ bằng phép cộng trừ, và quan trọng hơn, nó dạy cách tư duy nền tảng của mọi định giá phái sinh: tái tạo lại khoản chi trả bằng công cụ khác.",
    openingQuestion:
      "Bạn mua một quyền chọn mua và đồng thời bán khống cổ phiếu cơ sở, giữ tiền mặt bằng hiện giá của giá thực hiện. Danh mục này giống với công cụ nào?",
    openingOptions: [
      "Một quyền chọn bán cùng giá thực hiện và cùng ngày đáo hạn",
      "Một hợp đồng tương lai mua",
      "Một trái phiếu chính phủ thuần túy",
      "Một khoản tiền gửi ngân hàng có kỳ hạn",
    ],
    correctOption: 0,
    explanation:
      "Đây chính là put-call parity: mua call cộng với giữ hiện giá của giá thực hiện bằng tiền mặt, trừ đi cổ phiếu, sẽ tái tạo đúng khoản chi trả của một quyền chọn bán cùng giá thực hiện và ngày đáo hạn. Vì hai danh mục cho cùng một dòng tiền trong mọi kịch bản giá tương lai, chúng buộc phải có cùng giá hôm nay - nếu không, ai cũng có thể mua bên rẻ, bán bên đắt và bỏ túi khoản chênh lệch phi rủi ro.",
    diagram: [
      { label: "Call + tiền mặt PV(K)", arrow: true },
      { label: "Có cùng khoản chi trả mọi kịch bản với", arrow: true },
      { label: "Put + cổ phiếu", arrow: true },
      { label: "Nên phải cùng giá hôm nay" },
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Bàn giao dịch phái sinh",
      description:
        "Trên bàn giao dịch, put-call parity không phải lý thuyết mà là công cụ kiểm tra tức thời. Khi thị trường biến động mạnh, giá quyền chọn niêm yết có thể lệch khỏi quan hệ này trong vài giây; các thuật toán arbitrage tồn tại chính là để đóng khoảng lệch đó. Nhà đầu tư cá nhân hầu như không kịp khai thác, nhưng dùng nó để phát hiện một mức giá vô lý thì luôn kịp.",
    },
    quiz: [
      {
        question: "Công thức put-call parity cho quyền chọn kiểu châu Âu, cổ phiếu không trả cổ tức là gì?",
        options: [
          "C + P = S + K",
          "C + PV(K) = P + S",
          "C − P = K − S",
          "C × P = S × PV(K)",
        ],
        correct: 1,
        explanation:
          "C + PV(K) = P + S. Vế trái: mua call và giữ tiền mặt đủ để thực hiện quyền. Vế phải: mua put và nắm cổ phiếu. Cả hai đều cho khoản chi trả bằng max(S_T, K) tại ngày đáo hạn.",
      },
      {
        question: "Nguyên lý không có cơ hội arbitrage nói gì?",
        options: [
          "Không nhà đầu tư nào có thể thắng thị trường một cách bền vững",
          "Hai danh mục cho cùng dòng tiền tương lai phải cùng giá hôm nay",
          "Giá tài sản luôn phản ánh đầy đủ mọi thông tin đang có trên thị trường",
          "Lợi nhuận kỳ vọng của mọi tài sản đều bằng lãi suất phi rủi ro",
        ],
        correct: 1,
        explanation:
          "Đây là nền tảng của toàn bộ định giá phái sinh. Nếu hai thứ giống hệt nhau về dòng tiền mà khác giá, sẽ tồn tại một chiến lược sinh lời không cần vốn và không chịu rủi ro - điều thị trường lập tức xóa bỏ.",
      },
      {
        question: "Nếu cổ phiếu trả cổ tức trong kỳ, put-call parity thay đổi thế nào?",
        options: [
          "Không đổi, vì quyền chọn cũng hưởng cổ tức",
          "Trừ hiện giá cổ tức khỏi giá cổ phiếu ở vế phải",
          "Cộng cổ tức vào giá thực hiện",
          "Nhân hai vế với tỷ suất cổ tức",
        ],
        correct: 1,
        explanation:
          "Người nắm quyền chọn không nhận cổ tức, còn người nắm cổ phiếu thì có. Vì vậy phải trừ hiện giá cổ tức khỏi giá cổ phiếu để hai vế thực sự tương đương về dòng tiền.",
      },
      {
        question: "Bạn quan sát: S = 100, K = 100, kỳ hạn 1 năm, lãi suất phi rủi ro 5%, C = 12, P = 6. Có gì bất thường?",
        options: [
          "Không có gì bất thường, cả bốn mức giá đều nhất quán với nhau",
          "Vế trái nhỏ hơn vế phải, nên quyền chọn bán đang bị định giá quá rẻ",
          "Vế trái 107,2 lớn hơn vế phải 106, nên parity bị vi phạm",
          "Chưa thể kết luận gì nếu chưa biết độ biến động của cổ phiếu cơ sở",
        ],
        correct: 2,
        explanation:
          "PV(K) = 100/1,05 ≈ 95,2. Vế trái ≈ 107,2 còn vế phải = 106. Chênh lệch khoảng 1,2 cho thấy quan hệ parity bị vi phạm: bán call, mua put, mua cổ phiếu và vay tiền sẽ khóa được khoản chênh này. Đáng chú ý là kết luận này không cần biết độ biến động - đó chính là sức mạnh của lập luận không arbitrage.",
      },
    
    {
      "question": "Vì sao nguyên lý không có cơ hội chênh lệch giá lại đủ mạnh để định giá quyền chọn mà chưa cần công thức nào?",
      "options": [
        "Vì hai danh mục cho cùng dòng tiền mọi kịch bản thì phải cùng giá",
        "Vì thị trường quyền chọn luôn hiệu quả nên giá quyền chọn luôn đúng",
        "Vì xác suất tăng giảm của cổ phiếu được giả định bằng nhau",
        "Vì mọi quyền chọn đều có thể tái tạo bằng một trái phiếu phi rủi ro"
      ],
      "correct": 0,
      "explanation": "Lập luận không cần biết cổ phiếu sẽ đi đâu, chỉ cần biết hai danh mục trả về giống hệt nhau. Nếu giá của chúng khác nhau thì tồn tại một chuỗi giao dịch sinh lời chắc chắn không rủi ro - và điều đó không tồn tại lâu trên thị trường."
    }
    ],
    keyTakeaways: [
      "Put-call parity: C + PV(K) = P + S (điều chỉnh trừ hiện giá cổ tức nếu có)",
      "Toàn bộ định giá phái sinh dựa trên một ý tưởng: tái tạo khoản chi trả bằng công cụ khác rồi buộc hai bên cùng giá",
      "Parity cho phép kiểm tra tính hợp lý của giá quyền chọn mà không cần biết độ biến động",
      "Từ parity suy ra: mua call và bán put cùng giá thực hiện tạo ra một vị thế tương đương nắm giữ cổ phiếu bằng đòn bẩy",
    ],
    practicePrompt: {
      question:
        "Vì sao có thể kiểm tra parity mà không cần biết độ biến động của cổ phiếu?",
      options: [
        "Vì độ biến động không ảnh hưởng đến giá quyền chọn",
        "Vì lập luận dựa trên việc hai danh mục cho cùng dòng tiền trong mọi kịch bản, nên xác suất xảy ra từng kịch bản không còn quan trọng",
        "Vì độ biến động đã nằm sẵn trong lãi suất phi rủi ro",
        "Vì parity chỉ đúng khi độ biến động bằng 0",
      ],
      correct: 1,
      explanation:
        "Đây là điểm sâu sắc nhất của bài. Khi hai danh mục khớp nhau ở mọi trạng thái tương lai, ta không cần biết trạng thái nào dễ xảy ra hơn. Độ biến động chỉ trở nên cần thiết khi ta muốn định giá riêng lẻ một quyền chọn, chứ không phải khi ta so sánh hai thứ đã tương đương.",
    },
    summary: {
      keyIdea: "Giá phái sinh bị ràng buộc bởi khả năng tái tạo, không phải bởi dự đoán thị trường",
      formula: "C + PV(K) = P + S",
      commonMistake: "Nghĩ rằng phải biết hướng đi của giá cổ phiếu mới định giá được quyền chọn",
      action: "Lấy bảng giá quyền chọn của một chỉ số bất kỳ và kiểm tra parity cho hai ba mức giá thực hiện.",
    },
    application: {
      title: "Dùng parity như một bộ lọc",
      message:
        "Trước khi giao dịch bất kỳ quyền chọn nào, hãy kiểm tra parity với put hoặc call đối ứng. Nếu lệch đáng kể sau khi tính đến phí giao dịch và cổ tức, thường là bạn đang đọc sai dữ liệu chứ không phải vừa tìm ra tiền miễn phí.",
      secondary: "Parity cũng cho bạn cách tổng hợp một vị thế: nếu không mua được put, có thể tạo ra nó bằng call cộng bán khống cổ phiếu.",
    },
    sections: [
      {
        type: "lead",
        text: "Người mới học quyền chọn thường tưởng định giá quyền chọn là bài toán dự đoán: cổ phiếu sẽ lên hay xuống, xác suất bao nhiêu. Thực tế, cả ngành phái sinh được xây trên một ý tưởng khác hẳn và ít trực giác hơn nhiều: nếu tôi có thể ghép các công cụ sẵn có để tạo ra đúng khoản chi trả của quyền chọn, thì giá quyền chọn buộc phải bằng chi phí của phép ghép đó.",
      },
      {
        type: "heading",
        text: "Không arbitrage: quy tắc duy nhất cần cho bài này",
      },
      {
        type: "paragraph",
        text: "Nếu hai danh mục cho ra dòng tiền giống hệt nhau trong mọi kịch bản tương lai, chúng phải có cùng mức giá hôm nay. Ngược lại sẽ tồn tại một cỗ máy in tiền: mua danh mục rẻ, bán danh mục đắt, và dù thị trường đi đâu bạn cũng thu về khoản chênh lệch mà không bỏ vốn và không chịu rủi ro. Thị trường có đủ người tìm những cỗ máy như vậy để chúng không tồn tại lâu.",
      },
      {
        type: "formula",
        title: "Put-Call Parity",
        label: "Quyền chọn kiểu châu Âu, cùng giá thực hiện và ngày đáo hạn",
        equation: "C + PV(K) = P + S",
        variables: [
          { symbol: "C", name: "Giá quyền chọn mua", description: "Quyền mua cổ phiếu ở giá K" },
          { symbol: "P", name: "Giá quyền chọn bán", description: "Quyền bán cổ phiếu ở giá K" },
          { symbol: "S", name: "Giá cổ phiếu hiện tại", description: "Trừ hiện giá cổ tức nếu cổ phiếu trả cổ tức trong kỳ" },
          { symbol: "PV(K)", name: "Hiện giá của giá thực hiện", description: "K chiết khấu về hiện tại theo lãi suất phi rủi ro" },
        ],
        example: {
          title: "Kiểm tra hai vế tại ngày đáo hạn",
          calculation: "Nếu S_T = 120, K = 100: vế trái = 20 + 100 = 120; vế phải = 0 + 120 = 120",
          result: "Hai vế bằng nhau trong mọi kịch bản",
          explanation:
            "Thử tiếp với S_T = 80: vế trái = 0 + 100 = 100; vế phải = 20 + 80 = 100. Vì khớp ở mọi mức giá tương lai, hai danh mục phải cùng giá hôm nay.",
        },
      },
      {
        type: "callout",
        label: "Hệ quả thực dụng",
        text: "Từ parity, mua call và bán put cùng giá thực hiện tương đương nắm giữ cổ phiếu bằng vốn vay. Đây là cách các quỹ tạo vị thế cổ phiếu tổng hợp khi bị hạn chế mua trực tiếp, và cũng là lý do phí quyền chọn phản ánh chi phí lãi vay chứ không chỉ kỳ vọng giá.",
      },
      {
        type: "comparison",
        left: {
          label: "Tư duy sai",
          text: "Định giá quyền chọn = ước lượng xác suất cổ phiếu tăng, rồi nhân với mức lãi kỳ vọng.",
        },
        right: {
          label: "Tư duy đúng",
          text: "Định giá quyền chọn = tìm danh mục tái tạo được khoản chi trả, rồi tính chi phí dựng danh mục đó.",
        },
      },
      {
        type: "closing",
        lines: [
          "Put-call parity là bài học nền: giá phái sinh đến từ khả năng tái tạo, không từ dự báo.",
          "Bài sau sẽ cho thấy Black-Scholes chỉ là ý tưởng này được đẩy đến cùng, với danh mục tái tạo được điều chỉnh liên tục theo thời gian.",
        ],
      },
    ],
  },
  {
    id: 1412,
    slug: "black-scholes-hieu-cong-thuc-thay-vi-hoc-thuoc",
    title: "Phái sinh, Bài 2: Black-Scholes - hiểu công thức thay vì học thuộc",
    subtitle: "Năm biến số, một ý tưởng phòng hộ động, và những giả định khiến mô hình sai trong khủng hoảng",
    duration: "13 phút",
    difficulty: "Khó",
    emoji: "🧮",
    track: "professional",
    whyItMatters:
      "Black-Scholes là mô hình được dùng nhiều nhất và cũng bị hiểu sai nhiều nhất trong tài chính. Bạn không cần chứng minh được nó, nhưng nếu không biết nó dựa trên giả định nào thì bạn sẽ không biết khi nào không được tin nó - và những lần thị trường sụp đổ đều là những lần các giả định đó vỡ.",
    openingQuestion:
      "Trong công thức Black-Scholes, biến số nào không quan sát được trực tiếp trên thị trường?",
    openingOptions: [
      "Giá cổ phiếu hiện tại",
      "Giá thực hiện",
      "Độ biến động của cổ phiếu trong tương lai",
      "Thời gian còn lại đến đáo hạn",
    ],
    correctOption: 2,
    explanation:
      "Bốn biến còn lại đều đọc được: giá cổ phiếu, giá thực hiện, thời gian đến đáo hạn và lãi suất phi rủi ro. Riêng độ biến động tương lai thì không ai biết. Đây là lý do trong thực tế người ta thường dùng ngược mô hình: lấy giá quyền chọn đang giao dịch trên thị trường, giải ngược ra độ biến động hàm ý (implied volatility), rồi giao dịch dựa trên quan điểm về chính con số đó. Nói cách khác, thị trường quyền chọn thực chất là thị trường mua bán độ biến động.",
    diagram: [
      { label: "5 đầu vào: S, K, T, r, sigma", arrow: true },
      { label: "Giả định: giá vận động ngẫu nhiên liên tục", arrow: true },
      { label: "Phòng hộ động bằng delta", arrow: true },
      { label: "Ra giá quyền chọn duy nhất không arbitrage" },
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Long-Term Capital Management, 1998",
      description:
        "Quỹ do chính các nhà kinh tế đoạt giải Nobel về định giá quyền chọn tham gia đã sụp đổ năm 1998. Nguyên nhân không phải công thức sai, mà là các giả định nền của nó vỡ cùng lúc: thanh khoản biến mất, giá nhảy gián đoạn thay vì liên tục, và tương quan giữa các thị trường tăng vọt đúng lúc cần chúng độc lập. Mô hình vẫn cho ra một con số - chỉ là con số đó không còn nghĩa gì.",
    },
    quiz: [
      {
        question: "Ý tưởng cốt lõi đằng sau lời giải Black-Scholes là gì?",
        options: [
          "Ước lượng xác suất cổ phiếu tăng giá rồi lấy khoản chi trả kỳ vọng",
          "Tái tạo quyền chọn bằng cổ phiếu và tiền vay, điều chỉnh liên tục",
          "Hồi quy giá quyền chọn trong quá khứ theo các yếu tố thị trường",
          "Nội suy từ giá của các quyền chọn có mức thực hiện lân cận",
        ],
        correct: 1,
        explanation:
          "Đây là phòng hộ động: nắm giữ delta cổ phiếu và vay phần còn lại, liên tục điều chỉnh khi giá thay đổi. Danh mục này tái tạo quyền chọn, nên giá quyền chọn phải bằng chi phí dựng và duy trì nó.",
      },
      {
        question: "Vì sao lợi suất kỳ vọng của cổ phiếu không xuất hiện trong công thức?",
        options: [
          "Vì mọi nhà đầu tư có cùng kỳ vọng lợi suất",
          "Vì phòng hộ đã triệt tiêu rủi ro hướng giá khỏi danh mục",
          "Vì lợi suất kỳ vọng của cổ phiếu trong dài hạn luôn hội tụ về 0",
          "Vì nó đã được phản ánh gián tiếp qua mức giá thực hiện của hợp đồng",
        ],
        correct: 1,
        explanation:
          "Đây là kết quả gây ngạc nhiên nhất của mô hình: hai nhà đầu tư có quan điểm trái ngược về hướng đi của cổ phiếu vẫn phải đồng ý về giá quyền chọn, vì lập luận định giá dựa trên phòng hộ chứ không dựa trên dự báo.",
      },
      {
        question: "Giả định nào của Black-Scholes bị vi phạm rõ nhất trong khủng hoảng?",
        options: [
          "Giá vận động liên tục và độ biến động không đổi theo thời gian",
          "Tồn tại một lãi suất phi rủi ro để chiết khấu các dòng tiền tương lai",
          "Quyền chọn có ngày đáo hạn xác định và chỉ thực hiện được vào ngày đó",
          "Mọi nhà đầu tư đều biết giá thực hiện",
        ],
        correct: 0,
        explanation:
          "Thị trường thật có những cú nhảy giá qua đêm mà không giao dịch nào diễn ra ở khoảng giữa, khiến phòng hộ động không thể thực hiện. Độ biến động cũng thay đổi mạnh theo thời gian. Đây là gốc rễ của hiện tượng nụ cười biến động sẽ học ở bài 4.",
      },
      {
        question: "Độ biến động hàm ý (implied volatility) là gì?",
        options: [
          "Độ lệch chuẩn lợi suất trong quá khứ",
          "Mức biến động khiến công thức khớp đúng giá thị trường",
          "Mức biến động bình quân do sở giao dịch công bố vào cuối mỗi phiên",
          "Chênh lệch giữa giá chào mua và giá chào bán của hợp đồng quyền chọn",
        ],
        correct: 1,
        explanation:
          "Vì bốn biến còn lại đều quan sát được, người ta đảo ngược công thức để rút ra sigma. Nó phản ánh kỳ vọng của thị trường về biến động tương lai, chứ không phải quá khứ.",
      },
      {
        question: "Nói thị trường quyền chọn là thị trường mua bán độ biến động nghĩa là gì?",
        options: [
          "Nhà giao dịch quyền chọn hoàn toàn không quan tâm tới giá cổ phiếu cơ sở",
          "Sau khi phòng hộ delta, thứ còn lại được đặt cược là biến động",
          "Sở giao dịch niêm yết trực tiếp chỉ số biến động thay cho hợp đồng quyền chọn",
          "Chỉ các quỹ phòng hộ chuyên nghiệp mới được phép giao dịch quyền chọn",
        ],
        correct: 1,
        explanation:
          "Một nhà giao dịch quyền chọn phòng hộ delta liên tục sẽ lời nếu biến động thực tế cao hơn mức hàm ý đã mua, và lỗ nếu ngược lại - bất kể cổ phiếu đi lên hay đi xuống.",
      },
    ],
    keyTakeaways: [
      "Năm đầu vào: giá cổ phiếu, giá thực hiện, thời gian, lãi suất phi rủi ro và độ biến động - chỉ độ biến động là không quan sát được",
      "Lợi suất kỳ vọng của cổ phiếu không xuất hiện trong công thức, vì định giá dựa trên phòng hộ chứ không dựa trên dự báo",
      "Trong thực tế mô hình thường được dùng ngược: từ giá thị trường suy ra độ biến động hàm ý",
      "Giả định nguy hiểm nhất là giá vận động liên tục và độ biến động không đổi - cả hai đều vỡ đúng lúc thị trường căng thẳng",
    ],
    practicePrompt: {
      question:
        "Một quyền chọn mua đang được định giá với độ biến động hàm ý 45%, trong khi bạn tin biến động thực tế sẽ chỉ khoảng 25%. Chiến lược tương ứng là gì?",
      options: [
        "Mua quyền chọn mua vì nó sẽ tăng giá",
        "Bán quyền chọn và phòng hộ delta - bạn đang bán biến động ở mức đắt so với mức bạn tin sẽ xảy ra",
        "Mua cổ phiếu cơ sở",
        "Không làm gì vì độ biến động không ảnh hưởng đến lợi nhuận",
      ],
      correct: 1,
      explanation:
        "Đây là giao dịch biến động điển hình. Bán quyền chọn và phòng hộ delta liên tục sẽ có lãi nếu biến động thực tế thấp hơn mức hàm ý. Cần nhấn mạnh: đây là chiến lược có rủi ro đuôi rất lớn nếu một cú nhảy giá xảy ra, và phần thua lỗ không bị giới hạn.",
    },
    summary: {
      keyIdea: "Black-Scholes định giá bằng chi phí tái tạo, không bằng dự báo giá",
      formula: "C = S·N(d1) − K·e^(−rT)·N(d2)",
      commonMistake: "Tin vào con số mô hình xuất ra mà không kiểm tra giả định đầu vào, đặc biệt là độ biến động",
      action: "Lấy giá thị trường của một quyền chọn và dùng công cụ trực tuyến giải ngược ra độ biến động hàm ý; so nó với biến động lịch sử 30 ngày.",
    },
    application: {
      title: "Đọc mô hình như một cỗ máy đổi đơn vị",
      message:
        "Đừng coi Black-Scholes là máy tính ra giá đúng. Hãy coi nó là cỗ máy chuyển đổi giữa hai ngôn ngữ: giá quyền chọn và độ biến động hàm ý. Mọi tranh luận đắt rẻ trên thị trường quyền chọn cuối cùng đều là tranh luận về con số biến động đó.",
      secondary: "Khi thấy giá quyền chọn tăng vọt mà cổ phiếu đứng yên, gần như chắc chắn thị trường vừa nâng kỳ vọng biến động.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước cho thấy khi tái tạo được khoản chi trả, giá bị ép chặt. Nhưng put-call parity chỉ ràng buộc call với put; nó không cho ta giá của riêng từng cái. Black-Scholes trả lời phần còn lại, bằng cách đẩy ý tưởng tái tạo đến giới hạn: tái tạo liên tục theo thời gian.",
      },
      {
        type: "heading",
        text: "Phòng hộ động: linh hồn của mô hình",
      },
      {
        type: "paragraph",
        text: "Giả sử bạn bán một quyền chọn mua. Bạn có thể tự bảo vệ bằng cách nắm giữ một phần cổ phiếu - cụ thể là delta cổ phiếu cho mỗi quyền chọn đã bán. Khi giá cổ phiếu thay đổi, delta thay đổi, và bạn điều chỉnh vị thế. Nếu điều chỉnh liên tục và không mất phí, danh mục này tái tạo chính xác quyền chọn đã bán. Do đó giá quyền chọn phải bằng chi phí dựng và duy trì danh mục ấy - không hơn không kém.",
      },
      {
        type: "formula",
        title: "Công thức Black-Scholes cho quyền chọn mua",
        label: "Kiểu châu Âu, cổ phiếu không trả cổ tức",
        equation: "C = S·N(d1) − K·e^(−rT)·N(d2)",
        variables: [
          { symbol: "S", name: "Giá cổ phiếu hiện tại", description: "Quan sát được" },
          { symbol: "K", name: "Giá thực hiện", description: "Ghi trong hợp đồng" },
          { symbol: "T", name: "Thời gian đến đáo hạn", description: "Tính theo năm" },
          { symbol: "r", name: "Lãi suất phi rủi ro", description: "Theo kỳ hạn tương ứng" },
          { symbol: "sigma", name: "Độ biến động", description: "Biến duy nhất không quan sát được - trung tâm của mọi tranh luận" },
          { symbol: "N(d)", name: "Hàm phân phối chuẩn tích lũy", description: "N(d2) xấp xỉ xác suất quyền chọn được thực hiện trong thế giới trung hòa rủi ro" },
        ],
        example: {
          title: "Cách đọc công thức bằng lời",
          calculation: "Giá quyền chọn = (phần giá trị cổ phiếu bạn kỳ vọng nhận) − (hiện giá số tiền bạn sẽ phải trả)",
          result: "Một phép trừ giữa lợi ích có điều kiện và chi phí có điều kiện",
          explanation:
            "S·N(d1) là giá trị kỳ vọng của cổ phiếu bạn nhận được nếu quyền chọn có lợi; K·e^(−rT)·N(d2) là hiện giá của khoản tiền bạn phải chi ra, cũng chỉ trong kịch bản đó.",
        },
      },
      {
        type: "callout",
        label: "Điều gây ngạc nhiên nhất",
        text: "Lợi suất kỳ vọng của cổ phiếu không có mặt trong công thức. Người rất lạc quan và người rất bi quan về cổ phiếu vẫn phải đồng ý về giá quyền chọn. Lý do: khi danh mục đã được phòng hộ, rủi ro hướng giá biến mất, nên chỉ còn lãi suất phi rủi ro là chiết khấu phù hợp.",
      },
      {
        type: "heading",
        text: "Bốn giả định và bốn chỗ mô hình gãy",
      },
      {
        type: "list",
        items: [
          "Giá vận động liên tục, không nhảy gián đoạn - vỡ khi có tin sốc qua đêm, khiến phòng hộ động bất khả thi",
          "Độ biến động không đổi - vỡ vì biến động tăng vọt đúng lúc thị trường giảm mạnh",
          "Giao dịch không mất phí và có thể điều chỉnh liên tục - vỡ vì chi phí giao dịch làm phòng hộ liên tục trở nên tốn kém",
          "Có thể vay và bán khống tự do ở lãi suất phi rủi ro - vỡ khi thanh khoản biến mất và chi phí vay tăng vọt",
        ],
      },
      {
        type: "paragraph",
        text: "Đây không phải lý do để vứt bỏ mô hình. Black-Scholes vẫn là ngôn ngữ chung của toàn thị trường quyền chọn, giống như cách mọi người vẫn dùng lợi suất đáo hạn để nói về trái phiếu dù biết giả định tái đầu tư của nó không thực tế. Vấn đề chỉ nảy sinh khi ai đó quên rằng đó là ngôn ngữ, không phải sự thật.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình không nói cho bạn giá đúng. Nó dịch giá thị trường thành một con số bạn có thể tranh luận: độ biến động.",
          "Bài sau sẽ mở hộp đen ra: các Greeks cho biết vị thế của bạn nhạy với cái gì và bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 1413,
    slug: "greeks-delta-gamma-vega-theta",
    title: "Phái sinh, Bài 3: Các Greeks - đo độ nhạy của một vị thế quyền chọn",
    subtitle: "Delta, Gamma, Vega, Theta và Rho: bản đồ rủi ro của bất kỳ danh mục phái sinh nào",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Không ai quản trị một danh mục quyền chọn bằng cách nhìn giá từng hợp đồng. Người ta nhìn Greeks, vì đó là cách duy nhất để trả lời câu hỏi thực sự quan trọng: nếu thị trường giảm 3%, hoặc biến động tăng 5 điểm, hoặc chỉ đơn giản là ngày mai đến, danh mục của tôi mất bao nhiêu.",
    openingQuestion:
      "Bạn nắm một danh mục quyền chọn có delta bằng 0. Điều đó có nghĩa danh mục an toàn không?",
    openingOptions: [
      "Có, delta bằng 0 nghĩa là không còn rủi ro",
      "Không, danh mục vẫn chịu rủi ro từ gamma, vega và theta - chỉ rủi ro theo hướng giá là tạm thời bị trung hòa",
      "Có, vì delta là thước đo rủi ro duy nhất",
      "Không xác định được nếu chưa biết giá thực hiện",
    ],
    correctOption: 1,
    explanation:
      "Delta bằng 0 chỉ có nghĩa là với một biến động rất nhỏ của giá cơ sở, giá trị danh mục gần như không đổi. Nhưng delta tự nó thay đổi khi giá dịch chuyển - đó là gamma. Danh mục còn nhạy với thay đổi độ biến động (vega) và mất giá trị theo thời gian (theta). Rất nhiều thua lỗ lớn trong lịch sử đến từ những danh mục được mô tả là trung hòa delta nhưng có gamma âm khổng lồ - an toàn cho tới khi thị trường di chuyển mạnh.",
    diagram: [
      { label: "Delta: nhạy với giá cơ sở", arrow: true },
      { label: "Gamma: delta thay đổi nhanh cỡ nào", arrow: true },
      { label: "Vega: nhạy với độ biến động", arrow: true },
      { label: "Theta: mất giá trị theo thời gian" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Bàn giao dịch quyền chọn của một ngân hàng",
      description:
        "Báo cáo rủi ro cuối ngày của một bàn quyền chọn hầu như không liệt kê từng hợp đồng. Nó liệt kê tổng delta, gamma, vega và theta theo từng kỳ hạn và từng mức giá thực hiện. Hạn mức rủi ro cũng được đặt trên các con số đó. Một nhà giao dịch có thể nắm hàng nghìn hợp đồng nhưng chỉ quản lý bốn năm con số tổng hợp.",
    },
    quiz: [
      {
        question: "Delta của một quyền chọn mua có giá trị trong khoảng nào?",
        options: [
          "Từ −1 đến 0, như quyền chọn bán",
          "Từ 0 đến 1, cùng chiều với giá tài sản",
          "Từ −1 đến 1, gộp cả hai loại quyền chọn",
          "Không bị giới hạn",
        ],
        correct: 1,
        explanation:
          "Delta của call nằm trong khoảng 0 đến 1: sâu ngoài tiền thì gần 0, sâu trong tiền thì gần 1. Delta của put nằm trong khoảng −1 đến 0. Delta cũng xấp xỉ số cổ phiếu cần nắm để phòng hộ một quyền chọn.",
      },
      {
        question: "Gamma cao có ý nghĩa gì với người phòng hộ?",
        options: [
          "Vị thế ổn định, ít phải chỉnh hơn",
          "Delta đổi nhanh theo giá, nên phòng hộ tốn kém hơn",
          "Quyền chọn sắp hết hạn nên rủi ro còn lại là không đáng kể",
          "Độ biến động của cổ phiếu cơ sở đang trong xu hướng giảm dần",
        ],
        correct: 1,
        explanation:
          "Gamma là đạo hàm bậc hai: nó đo tốc độ thay đổi của delta. Gamma cao nhất ở quyền chọn quanh mức ngang giá và gần ngày đáo hạn - đây là lúc phòng hộ tốn kém và dễ sai nhất.",
      },
      {
        question: "Người bán quyền chọn có gamma và theta như thế nào?",
        options: [
          "Gamma dương và theta dương",
          "Gamma âm và theta dương",
          "Gamma âm và theta âm",
          "Gamma dương và theta âm",
        ],
        correct: 1,
        explanation:
          "Đây là đánh đổi trung tâm của việc bán quyền chọn: mỗi ngày trôi qua bạn thu một ít (theta dương), nhưng một cú biến động lớn sẽ gây lỗ tăng dần theo bình phương (gamma âm). Nhặt xu trước máy ủi là hình ảnh thường được dùng để mô tả chiến lược này.",
      },
      {
        question: "Vega đo lường điều gì?",
        options: [
          "Giá quyền chọn đổi bao nhiêu khi độ biến động tăng một điểm phần trăm",
          "Giá quyền chọn đổi bao nhiêu khi lãi suất phi rủi ro tăng một điểm phần trăm",
          "Số ngày còn lại đến đáo hạn, quy đổi thành phần trăm của một năm",
          "Xác suất quyền chọn kết thúc trong trạng thái được thực hiện có lợi",
        ],
        correct: 0,
        explanation:
          "Vega cao nhất ở quyền chọn ngang giá và kỳ hạn dài. Người mua quyền chọn có vega dương: họ hưởng lợi khi thị trường trở nên bất định hơn, ngay cả khi giá cơ sở chưa hề di chuyển.",
      },
      {
        question: "Vì sao theta của người mua quyền chọn luôn âm?",
        options: [
          "Vì mỗi ngày nắm giữ đều tốn phí lưu ký",
          "Vì thời gian còn lại để giá di chuyển có lợi ngày càng ít đi",
          "Vì lãi suất phi rủi ro luôn dương nên chi phí cơ hội tăng theo thời gian",
          "Vì người bán quyền chọn được thu phí ngay tại thời điểm ký hợp đồng",
        ],
        correct: 1,
        explanation:
          "Quyền chọn là quyền có thời hạn. Mỗi ngày trôi qua, khoảng thời gian để kịch bản có lợi xảy ra bị rút ngắn, nên phần giá trị thời gian bào mòn dần - và tốc độ bào mòn tăng nhanh trong những tuần cuối.",
      },
    ],
    keyTakeaways: [
      "Delta: độ nhạy với giá cơ sở, đồng thời là tỷ lệ phòng hộ; call từ 0 đến 1, put từ −1 đến 0",
      "Gamma: tốc độ thay đổi của delta - cao nhất ở quanh ngang giá và gần đáo hạn, quyết định chi phí phòng hộ",
      "Vega: độ nhạy với độ biến động - người mua quyền chọn luôn có vega dương",
      "Theta: sự bào mòn giá trị thời gian - người mua chịu theta âm, người bán hưởng theta dương nhưng đổi lại gamma âm",
    ],
    practicePrompt: {
      question:
        "Một quỹ bán quyền chọn bán ngoài tiền hàng tháng để thu phí, danh mục được giữ trung hòa delta. Rủi ro lớn nhất là gì?",
      options: [
        "Theta âm bào mòn lợi nhuận",
        "Gamma âm kết hợp vega âm: một cú giảm mạnh vừa làm lỗ tăng theo bình phương vừa đẩy độ biến động lên, khiến khoản lỗ nhân đôi",
        "Lãi suất tăng làm giảm rho",
        "Không có rủi ro đáng kể vì đã trung hòa delta",
      ],
      correct: 1,
      explanation:
        "Đây là mô hình rủi ro đã xóa sổ nhiều quỹ bán biến động. Chiến lược cho lợi nhuận đều đặn trong hàng chục tháng, rồi mất nhiều hơn toàn bộ số đó trong vài ngày. Trung hòa delta không hề bảo vệ trước gamma và vega.",
    },
    summary: {
      keyIdea: "Greeks là bản đồ rủi ro: mỗi chữ cái trả lời một câu hỏi nếu-thì khác nhau",
      formula: "Thay đổi giá trị ≈ Delta×ΔS + ½·Gamma×(ΔS)² + Vega×Δsigma + Theta×Δt",
      commonMistake: "Coi trung hòa delta là an toàn, trong khi rủi ro thật nằm ở gamma và vega",
      action: "Với mỗi vị thế phái sinh bạn đang cân nhắc, viết ra bốn con số Greeks trước khi đặt lệnh.",
    },
    application: {
      title: "Kiểm tra vị thế bằng bốn câu hỏi",
      message:
        "Nếu giá cơ sở giảm 5%, tôi mất bao nhiêu (delta và gamma)? Nếu độ biến động tăng 10 điểm, tôi được hay mất (vega)? Nếu một tuần trôi qua mà không có gì xảy ra, tôi được hay mất (theta)? Trả lời được cả bốn nghĩa là bạn thực sự hiểu vị thế mình đang nắm.",
      secondary: "Công thức xấp xỉ ở phần tóm tắt cho phép ước lượng nhanh mà không cần chạy lại mô hình.",
    },
    sections: [
      {
        type: "lead",
        text: "Một quyền chọn không có một rủi ro duy nhất. Nó nhạy với giá cơ sở, với mức độ bất định của thị trường, và với chính sự trôi qua của thời gian. Greeks là cách tách một thứ phức tạp thành vài con số độc lập, mỗi con số trả lời một câu hỏi nếu-thì.",
      },
      {
        type: "conceptTable",
        title: "Bốn Greeks cần thuộc",
        subtitle: "Mỗi chữ cái là một câu hỏi khác nhau về cùng một vị thế",
        concepts: [
          {
            vi: "Độ nhạy giá",
            en: "Delta",
            def: "Giá quyền chọn thay đổi bao nhiêu khi giá cơ sở thay đổi một đơn vị. Cũng chính là số cổ phiếu cần nắm để phòng hộ. Call: 0 đến 1. Put: −1 đến 0.",
          },
          {
            vi: "Độ cong",
            en: "Gamma",
            def: "Delta thay đổi nhanh cỡ nào khi giá dịch chuyển. Cao nhất ở quanh ngang giá và gần đáo hạn. Quyết định tần suất và chi phí điều chỉnh phòng hộ.",
          },
          {
            vi: "Độ nhạy biến động",
            en: "Vega",
            def: "Giá quyền chọn thay đổi bao nhiêu khi độ biến động tăng một điểm phần trăm. Người mua quyền chọn luôn vega dương: bất định tăng thì quyền chọn đắt lên.",
          },
          {
            vi: "Bào mòn thời gian",
            en: "Theta",
            def: "Giá trị mất đi mỗi ngày khi tiến gần đáo hạn. Âm với người mua, dương với người bán, và tăng tốc mạnh trong vài tuần cuối vòng đời quyền chọn.",
          },
        ],
      },
      {
        type: "heading",
        text: "Gamma: nơi các thảm họa được sinh ra",
      },
      {
        type: "paragraph",
        text: "Delta cho bạn cảm giác an toàn giả. Một danh mục trung hòa delta thực sự không nhạy với biến động nhỏ - nhưng chỉ tại thời điểm này, với mức giá này. Khi giá di chuyển, delta thay đổi, và tốc độ thay đổi đó chính là gamma. Người bán quyền chọn có gamma âm: giá càng đi xa, vị thế càng xấu đi nhanh hơn, theo bình phương chứ không tuyến tính.",
      },
      {
        type: "comparison",
        left: {
          label: "Mua quyền chọn",
          text: "Gamma dương, vega dương, theta âm. Trả tiền mỗi ngày để đổi lấy quyền hưởng lợi lớn nếu thị trường di chuyển mạnh.",
        },
        right: {
          label: "Bán quyền chọn",
          text: "Gamma âm, vega âm, theta dương. Thu tiền mỗi ngày, đổi lại nhận rủi ro đuôi lớn khi thị trường di chuyển mạnh.",
        },
      },
      {
        type: "formula",
        title: "Xấp xỉ thay đổi giá trị danh mục",
        label: "Khai triển bậc hai - đủ dùng cho phần lớn tình huống thực tế",
        equation: "ΔV ≈ Delta×ΔS + ½·Gamma×(ΔS)² + Vega×Δsigma + Theta×Δt",
        variables: [
          { symbol: "ΔS", name: "Thay đổi giá cơ sở", description: "Theo đơn vị tiền tệ" },
          { symbol: "Δsigma", name: "Thay đổi độ biến động", description: "Theo điểm phần trăm" },
          { symbol: "Δt", name: "Thời gian trôi qua", description: "Theo ngày hoặc năm, phù hợp với đơn vị của theta" },
        ],
        example: {
          title: "Ví dụ đọc nhanh rủi ro",
          calculation: "Delta 0, Gamma −500, thị trường giảm 4 điểm: ½ × (−500) × 16",
          result: "Lỗ khoảng 4.000 dù danh mục trung hòa delta",
          explanation:
            "Nếu thị trường giảm gấp đôi, tức 8 điểm, khoản lỗ không phải gấp đôi mà gấp bốn: khoảng 16.000. Đó là bản chất của rủi ro phi tuyến do gamma âm.",
        },
      },
      {
        type: "callout",
        label: "Nguyên tắc thực hành",
        text: "Không bao giờ mô tả một vị thế phái sinh chỉ bằng lời. Hãy viết ra bốn con số. Nếu bạn không tính được chúng, bạn chưa đủ hiểu vị thế đó để nắm giữ nó.",
      },
      {
        type: "closing",
        lines: [
          "Greeks biến một vị thế mờ mịt thành vài câu trả lời cụ thể.",
          "Còn một biến số cuối cùng chi phối tất cả, và cũng là biến duy nhất bạn không quan sát được: độ biến động. Đó là nội dung bài cuối chặng.",
        ],
      },
    ],
  },
  {
    id: 1414,
    slug: "do-bien-dong-ham-y-va-nu-cuoi-bien-dong",
    title: "Phái sinh, Bài 4: Độ biến động hàm ý và nụ cười biến động",
    subtitle: "Biến động lịch sử, biến động hàm ý, và vì sao thị trường không tin vào phân phối chuẩn",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🌋",
    track: "professional",
    whyItMatters:
      "Nếu Black-Scholes đúng hoàn toàn, mọi quyền chọn trên cùng một cổ phiếu và cùng ngày đáo hạn phải có chung một độ biến động hàm ý. Thực tế thì không - và hình dạng của sự lệch đó chính là cách thị trường nói cho bạn biết nó sợ điều gì. Đọc được nó là kỹ năng phân biệt người hiểu phái sinh với người chỉ thuộc công thức.",
    openingQuestion:
      "Vì sao quyền chọn bán sâu ngoài tiền của chỉ số cổ phiếu thường có độ biến động hàm ý cao hơn quyền chọn ngang giá?",
    openingOptions: [
      "Vì sở giao dịch quy định mức phí cao hơn cho quyền chọn ngoài tiền",
      "Vì nhà đầu tư sẵn sàng trả thêm để bảo hiểm trước cú sập, và thị trường thật có đuôi trái dày hơn phân phối chuẩn giả định",
      "Vì thanh khoản của quyền chọn ngoài tiền luôn cao hơn",
      "Vì lãi suất phi rủi ro ảnh hưởng mạnh hơn đến quyền chọn ngoài tiền",
    ],
    correctOption: 1,
    explanation:
      "Hiện tượng này gọi là độ nghiêng biến động và trở nên rõ rệt trên thị trường cổ phiếu sau cú sụp năm 1987. Có hai nguyên nhân chồng lên nhau: thứ nhất, lợi suất thị trường thật có đuôi dày hơn phân phối chuẩn, nghĩa là những cú giảm cực đoan xảy ra thường xuyên hơn mô hình dự đoán; thứ hai, luôn có cầu bảo hiểm một chiều từ những người nắm giữ cổ phiếu muốn phòng vệ, đẩy giá quyền chọn bán ngoài tiền lên cao hơn mức mô hình đơn giản gợi ý.",
    diagram: [
      { label: "Giá quyền chọn niêm yết trên thị trường", arrow: true },
      { label: "Giải ngược qua Black-Scholes", arrow: true },
      { label: "Độ biến động hàm ý theo từng giá thực hiện", arrow: true },
      { label: "Vẽ ra: nụ cười hoặc độ nghiêng biến động" },
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Chỉ số biến động VIX",
      description:
        "VIX được tính từ giá của rổ quyền chọn trên chỉ số S&P 500, tức là nó đo kỳ vọng biến động 30 ngày tới do chính thị trường định giá. Nó được gọi là thước đo nỗi sợ vì tăng vọt mỗi khi thị trường giảm mạnh. Điểm đáng chú ý với người phân tích: VIX phản ánh mức giá của bảo hiểm chứ không phải dự báo trung lập, nên nó thường cao hơn mức biến động thực tế xảy ra sau đó - phần chênh chính là phí bảo hiểm rủi ro biến động.",
    },
    quiz: [
      {
        question: "Khác biệt giữa biến động lịch sử và biến động hàm ý là gì?",
        options: [
          "Không có khác biệt thực chất, đó chỉ là hai tên gọi của cùng một đại lượng",
          "Lịch sử tính từ giá quá khứ; hàm ý suy ngược từ giá quyền chọn hiện tại",
          "Lịch sử do sở giao dịch công bố, còn hàm ý do từng công ty chứng khoán tự tính",
          "Hàm ý luôn bằng trung bình trượt của biến động lịch sử trong 30 phiên",
        ],
        correct: 1,
        explanation:
          "Một cái nhìn về quá khứ, một cái nhìn về tương lai. Chênh lệch giữa chúng là thông tin quan trọng: hàm ý cao hơn lịch sử nhiều thường báo hiệu thị trường đang chờ một sự kiện, chẳng hạn báo cáo lợi nhuận hay quyết định chính sách.",
      },
      {
        question: "Nụ cười biến động (volatility smile) là hiện tượng gì?",
        options: [
          "Biến động hàm ý bằng nhau ở mọi giá thực hiện",
          "Biến động hàm ý cao hơn ở hai đầu, tạo hình chữ U",
          "Biến động hàm ý tăng dần theo kỳ hạn",
          "Giá quyền chọn mua tăng khi thị trường tăng",
        ],
        correct: 1,
        explanation:
          "Nếu Black-Scholes mô tả đúng thực tế, đường này phải nằm ngang. Việc nó cong lên ở hai đầu chứng tỏ thị trường định giá xác suất của các kịch bản cực đoan cao hơn mức phân phối chuẩn giả định.",
      },
      {
        question: "Trên thị trường cổ phiếu, hình dạng thường thấy là gì?",
        options: [
          "Một nụ cười cân đối hoàn hảo qua hai phía của mức giá ngang tiền",
          "Độ nghiêng: hàm ý cao ở giá thực hiện thấp, giảm dần lên trên",
          "Một đường thẳng nằm ngang, đúng như mô hình Black-Scholes dự đoán",
          "Biến động hàm ý đạt đỉnh ở mức giá thực hiện cao nhất được niêm yết",
        ],
        correct: 1,
        explanation:
          "Cổ phiếu và chỉ số cổ phiếu có độ nghiêng rõ vì rủi ro sụp đổ là bất đối xứng: thị trường giảm 20% trong một tuần thì có xảy ra, còn tăng 20% trong một tuần thì gần như không. Nhu cầu bảo hiểm cũng chỉ có một chiều.",
      },
      {
        question: "Nếu biến động hàm ý đang cao hơn nhiều so với mức biến động thực tế sau đó, ai được lợi?",
        options: [
          "Người mua quyền chọn, vì đã trả phí",
          "Người bán quyền chọn có phòng hộ delta",
          "Không bên nào, hai bên bù trừ nhau",
          "Chỉ sở giao dịch và môi giới, nhờ phí",
        ],
        correct: 1,
        explanation:
          "Chênh lệch dương giữa hàm ý và thực tế được gọi là phí bảo hiểm rủi ro biến động, và nó tồn tại dai dẳng trong dữ liệu lịch sử. Nhưng khai thác nó đồng nghĩa với việc nhận rủi ro đuôi - thu đều đặn rồi mất rất lớn trong các cú sốc hiếm.",
      },
    
    {
      "question": "Vì sao đường biến động hàm ý trên thị trường cổ phiếu thường nghiêng chứ không đối xứng?",
      "options": [
        "Vì nhà đầu tư sẵn sàng trả thêm để được phòng vệ cho các cú giảm sâu",
        "Vì quyền chọn mua luôn có thanh khoản cao hơn quyền chọn bán",
        "Vì mô hình định giá quyền chọn tính sai với các giá thực hiện thấp",
        "Vì cổ phiếu tăng giá thường xuyên hơn là giảm giá theo thống kê"
      ],
      "correct": 0,
      "explanation": "Nhu cầu mua bảo hiểm cho danh mục cổ phiếu là một chiều: gần như ai cũng muốn được bảo vệ khi thị trường sụp, ít ai cần bảo vệ khi nó tăng. Cầu lệch đó đẩy giá quyền chọn bán ở giá thực hiện thấp lên, và biến động hàm ý quy ra từ giá cũng lệch theo."
    }
    ],
    keyTakeaways: [
      "Biến động hàm ý là giá của bảo hiểm, không phải dự báo trung lập về biến động tương lai",
      "Nếu Black-Scholes đúng, đường biến động hàm ý theo giá thực hiện phải nằm ngang; thực tế nó cong hoặc nghiêng",
      "Thị trường cổ phiếu có độ nghiêng rõ: quyền chọn bán ngoài tiền đắt tương đối vì rủi ro sụp đổ và cầu phòng vệ một chiều",
      "Chênh lệch hàm ý trừ thực tế là phí bảo hiểm rủi ro biến động - có thể khai thác nhưng đi kèm rủi ro đuôi rất lớn",
    ],
    practicePrompt: {
      question:
        "Trước ngày công bố báo cáo lợi nhuận, biến động hàm ý của quyền chọn một cổ phiếu tăng vọt rồi sụt mạnh ngay sau khi tin ra, dù giá cổ phiếu gần như không đổi. Vì sao?",
      options: [
        "Do lỗi hệ thống của sở giao dịch",
        "Volatility crush: tin ra thì sự bất định biến mất",
        "Vì lãi suất phi rủi ro thay đổi trong ngày",
        "Vì theta bào mòn toàn bộ giá trị chỉ trong một ngày",
      ],
      correct: 1,
      explanation:
        "Đây là cái bẫy phổ biến nhất với người mới giao dịch quyền chọn quanh mùa báo cáo: họ đoán đúng hướng giá nhưng vẫn lỗ, vì đã mua quyền chọn ở mức biến động hàm ý quá cao và phần giá trị đó bốc hơi ngay khi sự bất định được giải tỏa.",
    },
    summary: {
      keyIdea: "Biến động hàm ý là giá thị trường của sự bất định, và hình dạng của nó tiết lộ nỗi sợ của thị trường",
      commonMistake: "Mua quyền chọn ngay trước sự kiện lớn mà không kiểm tra biến động hàm ý đã bị đẩy lên cao đến mức nào",
      action: "Trước khi mua bất kỳ quyền chọn nào, so biến động hàm ý hiện tại với vùng dao động của nó trong 12 tháng qua.",
    },
    application: {
      title: "Ba câu hỏi trước khi mua quyền chọn",
      message:
        "Biến động hàm ý hiện tại đang ở đâu so với chính nó 12 tháng qua? Có sự kiện nào sắp diễn ra khiến nó bị thổi lên không? Và nếu tôi đúng về hướng giá nhưng biến động sụt sau sự kiện, tôi còn lãi không?",
      secondary: "Nếu câu trả lời cuối là không, thì bạn không đang giao dịch hướng giá - bạn đang mua biến động ở đỉnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn trong năm đầu vào của Black-Scholes đều tra được. Biến số thứ năm - độ biến động tương lai - thì không ai biết. Nghịch lý là chính biến số không quan sát được ấy lại trở thành thứ được mua bán thật sự trên thị trường quyền chọn.",
      },
      {
        type: "heading",
        text: "Đảo ngược mô hình",
      },
      {
        type: "paragraph",
        text: "Vì giá quyền chọn quan sát được và bốn đầu vào kia cũng vậy, ta có thể giải ngược để tìm mức biến động khiến công thức khớp với giá thị trường. Con số đó là độ biến động hàm ý. Nó không phải dự báo của nhà thống kê mà là mức giá mà người mua và người bán thỏa thuận cho sự bất định.",
      },
      {
        type: "comparison",
        left: {
          label: "Biến động lịch sử",
          text: "Tính từ lợi suất quá khứ. Khách quan, kiểm chứng được, nhưng luôn nhìn về sau và mù trước sự kiện sắp tới.",
        },
        right: {
          label: "Biến động hàm ý",
          text: "Suy từ giá quyền chọn hiện tại. Hướng về tương lai, phản ánh cả kỳ vọng lẫn phí bảo hiểm mà người phòng vệ sẵn sàng trả.",
        },
      },
      {
        type: "heading",
        text: "Nụ cười và độ nghiêng: bằng chứng mô hình chưa đủ",
      },
      {
        type: "paragraph",
        text: "Nếu giả định phân phối chuẩn của Black-Scholes đúng, mọi quyền chọn cùng ngày đáo hạn phải cho ra cùng một độ biến động hàm ý bất kể giá thực hiện. Vẽ thực tế lên đồ thị, ta được một đường cong. Với ngoại hối, đường này thường cân đối như một nụ cười. Với cổ phiếu và chỉ số, nó nghiêng hẳn: giá thực hiện càng thấp, biến động hàm ý càng cao.",
      },
      {
        type: "list",
        items: [
          "Đuôi dày: thị trường thật có nhiều cú giảm cực đoan hơn phân phối chuẩn dự đoán",
          "Cầu phòng vệ một chiều: người nắm cổ phiếu mua quyền chọn bán để bảo hiểm, đẩy giá phía đó lên",
          "Đòn bẩy và tương quan: khi giá giảm, đòn bẩy của doanh nghiệp tăng và các cổ phiếu cùng giảm với nhau, làm rủi ro thực tăng theo",
        ],
      },
      {
        type: "callout",
        label: "Đọc thị trường qua độ nghiêng",
        text: "Độ nghiêng dốc lên đột ngột là dấu hiệu thị trường đang mua bảo hiểm ráo riết trước một rủi ro cụ thể, ngay cả khi chỉ số vẫn đang lập đỉnh. Đây là một trong số ít chỉ báo phản ánh nỗi lo thật bằng tiền thật, chứ không bằng khảo sát ý kiến.",
      },
      {
        type: "closing",
        lines: [
          "Mọi tranh luận về giá quyền chọn, cuối cùng, đều quy về một câu hỏi: mức biến động thị trường đang tính có hợp lý không.",
          "Kết thúc chặng: bạn đã có nguyên lý tái tạo, mô hình, bộ đo độ nhạy, và biến số trung tâm. Phần còn lại là kỷ luật quản trị rủi ro ở các bài tiếp theo trong chặng.",
        ],
      },
    ],
  },
];
