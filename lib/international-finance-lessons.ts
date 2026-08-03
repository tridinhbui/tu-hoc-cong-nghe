import type { Lesson } from "./lesson-types";

// Chặng "Tài chính quốc tế" (ids 1461-1464, professional track).
//
// Track 2 có bài phòng hộ tỷ giá cho doanh nghiệp xuất nhập khẩu và bài về
// dòng vốn quốc tế trong chặng kinh tế học, nhưng thiếu hẳn phần nối chúng
// lại: vì sao tỷ giá kỳ hạn lại đúng bằng mức chênh lệch lãi suất, vì sao
// không được chiết khấu dòng tiền đồng bằng chi phí vốn đô la, và vì sao báo
// cáo hợp nhất của một tập đoàn đa quốc gia lại lỗ tỷ giá mà không mất đồng
// tiền mặt nào. Bốn bài này là phần lý thuyết ràng buộc mọi quyết định
// xuyên biên giới.

export const INTERNATIONAL_FINANCE_LESSONS: Lesson[] = [
  {
    id: 1461,
    slug: "ngang-gia-lai-suat-va-ty-gia-ky-han",
    title: "Tài chính quốc tế, Bài 1: Ngang giá lãi suất - vì sao tỷ giá kỳ hạn không phải dự báo",
    subtitle: "Chênh lệch lãi suất quyết định điểm kỳ hạn, và vì sao lãi suất cao không có nghĩa là lời",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🌐",
    track: "professional",
    whyItMatters:
      "Rất nhiều người tin rằng gửi tiền ở đồng tiền có lãi suất cao rồi phòng hộ tỷ giá là cách kiếm lời không rủi ro. Ngang giá lãi suất chứng minh điều đó không tồn tại, và hiểu vì sao sẽ thay đổi cách bạn đọc mọi báo giá kỳ hạn.",
    openingQuestion:
      "Tỷ giá kỳ hạn được xác định chủ yếu bởi yếu tố nào?",
    openingOptions: [
      "Dự báo của ngân hàng về hướng đi của tỷ giá trong tương lai gần",
      "Chênh lệch lãi suất giữa hai đồng tiền trong cùng kỳ hạn đó",
      "Cán cân thương mại giữa hai quốc gia trong kỳ báo cáo gần nhất",
      "Mức can thiệp mà ngân hàng trung ương dự kiến thực hiện trong kỳ hạn đó",
    ],
    correctOption: 1,
    explanation:
      "Tỷ giá kỳ hạn là kết quả của một phép tính chặn arbitrage, không phải một dự báo. Nếu bạn có thể vay đồng tiền lãi suất thấp, đổi sang đồng tiền lãi suất cao, gửi tiết kiệm và đồng thời khóa tỷ giá bán lại bằng hợp đồng kỳ hạn, thì bạn sẽ có lợi nhuận phi rủi ro nếu tỷ giá kỳ hạn không điều chỉnh. Thị trường lập tức đóng khoảng đó lại bằng cách đẩy điểm kỳ hạn về đúng mức chênh lệch lãi suất. Đây chính là lập luận tái tạo mà bạn đã gặp ở chặng phái sinh, áp dụng cho tiền tệ.",
    diagram: [
      { label: "Vay đồng lãi suất thấp", arrow: true },
      { label: "Đổi và gửi ở đồng lãi suất cao", arrow: true },
      { label: "Khóa tỷ giá bán lại bằng hợp đồng kỳ hạn", arrow: true },
      { label: "Lợi nhuận bằng 0 - đó là ngang giá lãi suất" },
    ],
    interactiveType: "interest-rate",
    realWorldExample: {
      company: "Doanh nghiệp vay ngoại tệ vì lãi suất thấp",
      description:
        "Một doanh nghiệp Việt Nam thấy lãi vay đô la thấp hơn hẳn lãi vay đồng và quyết định vay đô la cho dự án chỉ tạo ra doanh thu bằng đồng. Phần chênh lệch lãi suất mà họ tưởng là tiết kiệm thực chất là khoản bù cho rủi ro tỷ giá mà họ vừa nhận về. Nếu họ mua hợp đồng kỳ hạn để loại rủi ro đó, chi phí kỳ hạn sẽ ăn gần hết phần chênh lãi suất - đúng như ngang giá lãi suất dự báo.",
    },
    quiz: [
      {
        question: "Ngang giá lãi suất có phòng hộ phát biểu điều gì?",
        options: [
          "Lãi suất của hai quốc gia sẽ hội tụ về cùng một mức trong dài hạn",
          "Lợi suất phòng hộ của hai đồng tiền phải bằng nhau",
          "Tỷ giá giao ngay luôn bằng tỷ giá kỳ hạn ở mọi kỳ hạn được niêm yết",
          "Ngân hàng trung ương phải điều chỉnh lãi suất theo biến động của tỷ giá",
        ],
        correct: 1,
        explanation:
          "Sau khi khóa tỷ giá bằng hợp đồng kỳ hạn, hai lựa chọn đầu tư trở nên phi rủi ro như nhau, nên chúng phải cho cùng lợi suất. Đây là quan hệ được duy trì bằng arbitrage thật, không phải một giả thuyết cần kiểm định.",
      },
      {
        question: "Đồng tiền có lãi suất cao hơn sẽ được báo giá kỳ hạn thế nào?",
        options: [
          "Giảm giá kỳ hạn so với tỷ giá giao ngay hiện tại",
          "Tăng giá kỳ hạn so với tỷ giá giao ngay hiện tại",
          "Giữ nguyên vì lãi suất không tác động tới thị trường ngoại hối kỳ hạn",
          "Tùy thuộc vào chênh lệch lạm phát dự kiến giữa hai quốc gia",
        ],
        correct: 0,
        explanation:
          "Đây là điểm phản trực giác. Lãi suất cao hơn phải đi kèm kỳ vọng mất giá trong báo giá kỳ hạn, nếu không sẽ có arbitrage. Vì vậy đồng tiền lãi suất cao luôn bị chiết khấu trong hợp đồng kỳ hạn.",
      },
      {
        question: "Giao dịch chênh lệch lãi suất tiền tệ không phòng hộ hoạt động thế nào?",
        options: [
          "Vay đồng lãi suất thấp, đầu tư đồng lãi suất cao, chấp nhận rủi ro tỷ giá",
          "Vay và đầu tư trong cùng một đồng tiền để tận dụng chênh lệch kỳ hạn",
          "Mua hợp đồng kỳ hạn ở hai ngân hàng khác nhau để hưởng chênh lệch báo giá",
          "Đầu tư vào trái phiếu chính phủ của quốc gia có xếp hạng tín nhiệm cao nhất",
        ],
        correct: 0,
        explanation:
          "Bỏ phần phòng hộ đi thì phần chênh lãi suất trở thành lợi nhuận tiềm năng, đổi lại toàn bộ rủi ro tỷ giá. Đây là chiến lược nổi tiếng với đặc điểm lãi đều đặn nhiều năm rồi mất rất lớn trong vài ngày khi đồng tiền tài trợ tăng giá đột ngột.",
      },
      {
        question: "Vì sao doanh nghiệp không nên vay ngoại tệ chỉ vì lãi suất danh nghĩa thấp hơn?",
        options: [
          "Vì lãi suất ngoại tệ sẽ được điều chỉnh tăng theo hợp đồng sau năm đầu tiên",
          "Vì phần chênh lệch lãi suất là giá của rủi ro tỷ giá vừa nhận về",
          "Vì quy định hiện hành hạn chế doanh nghiệp trong nước vay bằng ngoại tệ",
          "Vì chi phí chuyển đổi ngoại tệ tại ngân hàng thường cao hơn phần lãi tiết kiệm",
        ],
        correct: 1,
        explanation:
          "Vay ngoại tệ trong khi doanh thu bằng nội tệ tạo ra chênh lệch đồng tiền giữa tài sản và nợ - cùng loại rủi ro với chênh lệch kỳ hạn đã học ở bài trái phiếu doanh nghiệp. Khoản tiết kiệm lãi suất chỉ là tạm ứng cho một khoản lỗ tỷ giá có thể đến sau.",
      },
    
    {
      "question": "Vì sao vay ngoại tệ lãi suất thấp không tự nó rẻ hơn vay nội tệ lãi suất cao?",
      "options": [
        "Vì phần chênh lãi suất thường bị bù lại bằng mức mất giá của đồng nội tệ",
        "Vì lãi suất vay ngoại tệ luôn được điều chỉnh tăng dần theo thời gian vay",
        "Vì doanh nghiệp phải trả thêm phí chuyển đổi ngoại tệ cho mỗi kỳ trả nợ",
        "Vì ngân hàng yêu cầu tài sản bảo đảm lớn hơn với các khoản vay ngoại tệ"
      ],
      "correct": 0,
      "explanation": "Ngang giá lãi suất nói rằng phần lợi từ lãi suất thấp về lý thuyết bị triệt tiêu bởi biến động tỷ giá. Doanh nghiệp không có doanh thu ngoại tệ mà vay ngoại tệ vì lãi rẻ thì thực chất đang đặt cược vào tỷ giá, chứ không đang tiết kiệm chi phí vốn."
    }
    ],
    keyTakeaways: [
      "Tỷ giá kỳ hạn là kết quả của lập luận chặn arbitrage, không phải dự báo của ngân hàng",
      "Đồng tiền lãi suất cao luôn bị chiết khấu trong báo giá kỳ hạn",
      "Chênh lệch lãi suất sau khi phòng hộ bằng 0 - không có bữa trưa miễn phí ở đây",
      "Vay ngoại tệ vì lãi suất thấp là nhận rủi ro tỷ giá, không phải tiết kiệm chi phí vốn",
    ],
    practicePrompt: {
      question:
        "Lãi suất đồng A là 8%, đồng B là 2%, kỳ hạn một năm. Hợp đồng kỳ hạn sẽ định giá đồng A thế nào?",
      options: [
        "Tăng giá khoảng 6% so với tỷ giá giao ngay hiện tại",
        "Mất giá khoảng 6% so với tỷ giá giao ngay hiện tại",
        "Không đổi, vì lãi suất không tham gia vào việc xác định tỷ giá kỳ hạn",
        "Chưa xác định được nếu chưa biết chênh lệch lạm phát của hai quốc gia",
      ],
      correct: 1,
      explanation:
        "Nếu không mất giá đúng bằng chênh lệch lãi suất, ai cũng có thể vay đồng B, gửi đồng A và khóa tỷ giá để có lợi nhuận phi rủi ro. Lưu ý điều này không nói tỷ giá giao ngay một năm sau sẽ ở đâu - nó chỉ nói mức giá hôm nay bạn khóa được là bao nhiêu.",
    },
    summary: {
      keyIdea: "Điểm kỳ hạn là chênh lệch lãi suất, không phải quan điểm về tương lai",
      formula: "Tỷ giá kỳ hạn ≈ Tỷ giá giao ngay × (1 + lãi suất đồng định giá) / (1 + lãi suất đồng cơ sở)",
      commonMistake: "Đọc tỷ giá kỳ hạn như dự báo của thị trường rồi giao dịch dựa trên đó",
      action: "Lấy báo giá kỳ hạn một năm của một cặp tiền và kiểm tra nó có khớp với chênh lệch lãi suất không.",
    },
    application: {
      title: "Kiểm tra mọi đề xuất vay ngoại tệ",
      message:
        "Hỏi đúng một câu: doanh thu của dự án này bằng đồng tiền nào? Nếu khác đồng tiền đi vay, phần lãi suất tiết kiệm được chính là mức bù rủi ro, và bạn cần định lượng nó bằng chi phí phòng hộ chứ không bỏ qua.",
      secondary: "Nguyên tắc gốc của quản trị rủi ro tỷ giá: cố gắng khớp đồng tiền của nợ với đồng tiền của dòng tiền.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một câu hỏi tưởng ngây thơ nhưng dẫn tới toàn bộ tài chính quốc tế: nếu đồng tiền này trả lãi 8% còn đồng kia chỉ 2%, sao mọi người không đổ hết tiền sang đồng thứ nhất? Câu trả lời là cơ chế giữ cho thế giới không có tiền miễn phí, và nó quyết định mọi báo giá kỳ hạn bạn sẽ nhìn thấy.",
      },
      {
        type: "formula",
        title: "Ngang giá lãi suất có phòng hộ",
        label: "Quan hệ được duy trì bằng arbitrage thật",
        equation: "F = S × (1 + i_định giá) / (1 + i_cơ sở)",
        variables: [
          { symbol: "F", name: "Tỷ giá kỳ hạn", description: "Mức giá khóa được hôm nay cho giao dịch trong tương lai" },
          { symbol: "S", name: "Tỷ giá giao ngay", description: "Mức giá hiện tại trên thị trường" },
          { symbol: "i", name: "Lãi suất của từng đồng tiền", description: "Cùng kỳ hạn với hợp đồng kỳ hạn đang xét" },
        ],
        example: {
          title: "Vì sao không thể có ngoại lệ",
          calculation: "Nếu F cao hơn mức công thức: vay đồng cơ sở, gửi đồng định giá, bán kỳ hạn",
          result: "Lợi nhuận phi rủi ro không cần vốn",
          explanation:
            "Chỉ cần khoảng lệch đủ bù chi phí giao dịch là các bàn giao dịch ngoại hối sẽ thực hiện với quy mô rất lớn, và chính hành động đó kéo F về đúng công thức trong vài giây.",
        },
      },
      {
        type: "comparison",
        left: {
          label: "Có phòng hộ",
          text: "Khóa tỷ giá bằng hợp đồng kỳ hạn. Lợi suất hai bên bằng nhau. Không còn rủi ro và cũng không còn lợi nhuận thêm.",
        },
        right: {
          label: "Không phòng hộ",
          text: "Giữ nguyên rủi ro tỷ giá để hưởng chênh lệch lãi suất. Lãi đều đặn trong thời gian dài, rồi mất rất nhanh khi đồng tài trợ tăng giá.",
        },
      },
      {
        type: "callout",
        label: "Điểm dễ nhầm nhất",
        text: "Tỷ giá kỳ hạn không nói cho bạn biết tỷ giá tương lai sẽ ở đâu. Nó chỉ nói mức giá bạn khóa được hôm nay. Về mặt thực nghiệm, tỷ giá kỳ hạn là một công cụ dự báo khá tệ - và chính sự lệch đó là nguồn lợi nhuận của giao dịch chênh lệch lãi suất tiền tệ, kèm rủi ro đuôi đi cùng.",
      },
      {
        type: "closing",
        lines: [
          "Ngang giá lãi suất ràng buộc mức giá hôm nay; nó không nói gì về ngày mai.",
          "Bài sau nói về quan hệ ràng buộc tỷ giá trong dài hạn: ngang giá sức mua.",
        ],
      },
    ],
  },
  {
    id: 1462,
    slug: "ngang-gia-suc-mua-va-ty-gia-thuc",
    title: "Tài chính quốc tế, Bài 2: Ngang giá sức mua và tỷ giá thực - neo dài hạn của tỷ giá",
    subtitle: "Lạm phát, tỷ giá thực hiệu dụng và cách đánh giá một đồng tiền đắt hay rẻ",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Ngang giá lãi suất ràng buộc giá hôm nay, còn ngang giá sức mua là lực kéo dài hạn. Đây là khung để trả lời câu hỏi một đồng tiền đang bị định giá cao hay thấp, và để hiểu vì sao lạm phát trong nước cao hơn đối tác thương mại lại bào mòn năng lực cạnh tranh xuất khẩu.",
    openingQuestion:
      "Theo ngang giá sức mua, điều gì xảy ra với đồng tiền của quốc gia có lạm phát cao hơn?",
    openingOptions: [
      "Đồng tiền đó có xu hướng mất giá so với đồng tiền của quốc gia lạm phát thấp",
      "Đồng tiền đó tăng giá vì lãi suất danh nghĩa trong nước cũng cao hơn tương ứng",
      "Tỷ giá không đổi vì lạm phát ảnh hưởng như nhau lên cả hàng hóa xuất và nhập khẩu",
      "Tỷ giá biến động ngẫu nhiên vì lạm phát không liên quan tới thị trường ngoại hối",
    ],
    correctOption: 0,
    explanation:
      "Nếu giá hàng hóa trong nước tăng nhanh hơn ở nước ngoài mà tỷ giá không đổi, hàng nội địa dần đắt lên tương đối, xuất khẩu giảm và nhập khẩu tăng. Áp lực đó đẩy đồng nội tệ xuống cho tới khi sức mua của hai đồng tiền tương đương trở lại. Đây là một lực kéo dài hạn và rất yếu trong ngắn hạn - tỷ giá có thể lệch khỏi mức ngang giá sức mua nhiều năm liền, nên nó là khung tham chiếu chứ không phải công cụ giao dịch.",
    diagram: [
      { label: "Lạm phát trong nước cao hơn", arrow: true },
      { label: "Hàng nội đắt tương đối", arrow: true },
      { label: "Xuất khẩu giảm, nhập khẩu tăng", arrow: true },
      { label: "Áp lực giảm giá lên đồng nội tệ" },
    ],
    interactiveType: "supply-demand",
    realWorldExample: {
      company: "Doanh nghiệp xuất khẩu trong giai đoạn tỷ giá ổn định",
      description:
        "Khi tỷ giá danh nghĩa được giữ ổn định trong nhiều năm nhưng lạm phát trong nước cao hơn các đối thủ cạnh tranh, doanh nghiệp xuất khẩu chịu sức ép âm thầm: chi phí nhân công và nguyên liệu trong nước tăng theo lạm phát, còn giá bán quốc tế thì không. Tỷ giá thực đang lên giá dù tỷ giá danh nghĩa đứng yên, và biên lợi nhuận xuất khẩu bị bào mòn mà không có sự kiện nào rõ ràng để quy trách nhiệm.",
    },
    quiz: [
      {
        question: "Tỷ giá thực khác tỷ giá danh nghĩa ở điểm nào?",
        options: [
          "Tỷ giá thực là mức giá được ngân hàng trung ương công bố chính thức mỗi ngày",
          "Tỷ giá thực đã điều chỉnh cho chênh lệch mức giá giữa hai nền kinh tế",
          "Tỷ giá thực chỉ áp dụng cho các giao dịch thương mại hàng hóa hữu hình",
          "Tỷ giá thực được tính trên giá trị giao dịch đã trừ đi phí chuyển đổi ngoại tệ",
        ],
        correct: 1,
        explanation:
          "Tỷ giá danh nghĩa nói bạn đổi được bao nhiêu đơn vị tiền, còn tỷ giá thực nói bạn mua được bao nhiêu hàng hóa. Với năng lực cạnh tranh, chỉ tỷ giá thực mới có ý nghĩa.",
      },
      {
        question: "Tỷ giá thực hiệu dụng được xây dựng thế nào?",
        options: [
          "Bình quân tỷ giá thực với các đối tác thương mại, theo trọng số kim ngạch",
          "Trung bình cộng tỷ giá danh nghĩa của tất cả các đồng tiền được niêm yết",
          "Tỷ giá thực với đồng tiền có kim ngạch thương mại lớn nhất trong năm gần nhất",
          "Tỷ giá thực được điều chỉnh theo mức dự trữ ngoại hối của quốc gia đó",
        ],
        correct: 0,
        explanation:
          "Một nền kinh tế giao thương với nhiều đối tác nên chỉ nhìn một cặp tiền là thiếu. Chỉ số hiệu dụng cho biết năng lực cạnh tranh tổng thể, và nó có thể đang xấu đi ngay cả khi cặp tiền được theo dõi nhiều nhất vẫn ổn định.",
      },
      {
        question: "Vì sao ngang giá sức mua không dùng được để giao dịch ngắn hạn?",
        options: [
          "Vì dữ liệu lạm phát của các quốc gia không được công bố công khai kịp thời",
          "Vì tỷ giá có thể lệch khỏi mức ngang giá sức mua trong nhiều năm liền",
          "Vì quan hệ này chỉ đúng với các nền kinh tế có cùng quy mô và cơ cấu ngành",
          "Vì chi phí giao dịch trên thị trường ngoại hối làm triệt tiêu mọi khoảng lệch",
        ],
        correct: 1,
        explanation:
          "Dòng vốn, chênh lệch lãi suất và tâm lý thị trường chi phối tỷ giá ngắn hạn mạnh hơn hẳn quan hệ giá cả. Ngang giá sức mua là neo dài hạn, hữu ích cho việc đánh giá mức định giá chứ không cho việc chọn thời điểm.",
      },
      {
        question: "Vì sao chỉ số so sánh giá một sản phẩm giống nhau giữa các nước lại có hạn chế?",
        options: [
          "Vì sản phẩm đó không được bán ở tất cả các quốc gia trên thế giới",
          "Vì giá còn phản ánh chi phí phi thương mại như mặt bằng và nhân công địa phương",
          "Vì tỷ giá chính thức khác tỷ giá thị trường tự do ở nhiều quốc gia",
          "Vì giá bán lẻ đã bao gồm các loại thuế khác nhau ở từng quốc gia",
        ],
        correct: 1,
        explanation:
          "Phần lớn giá thành của một bữa ăn hay một dịch vụ là những thứ không thể xuất nhập khẩu được. Vì vậy quốc gia có mức thu nhập thấp thường có mặt bằng giá thấp một cách hệ thống, và điều đó không có nghĩa là đồng tiền của họ đang bị định giá thấp.",
      },
    
    {
      "question": "Chỉ số so sánh giá cùng một sản phẩm giữa các nước có hạn chế gì?",
      "options": [
        "Giá còn phản ánh chi phí nhân công và mặt bằng địa phương, không chỉ tỷ giá",
        "Sản phẩm đó không được bán ở tất cả các quốc gia nên mẫu so sánh quá nhỏ",
        "Giá bán được các doanh nghiệp điều chỉnh liên tục nên không so sánh được",
        "Chỉ số này chỉ tính được với hàng hóa xuất khẩu chứ không với dịch vụ"
      ],
      "correct": 0,
      "explanation": "Phần lớn giá một bữa ăn nhanh là những thứ không giao thương được: tiền thuê mặt bằng, lương nhân viên, chi phí phân phối nội địa. Ngang giá sức mua chỉ áp được cho hàng hóa mua bán xuyên biên giới, nên chỉ số này là minh họa hay chứ không phải phép đo."
    }
    ],
    keyTakeaways: [
      "Ngang giá sức mua là lực kéo dài hạn: lạm phát cao hơn thì đồng tiền có xu hướng mất giá",
      "Tỷ giá thực mới phản ánh năng lực cạnh tranh; tỷ giá danh nghĩa ổn định vẫn có thể che giấu việc lên giá thực",
      "Tỷ giá thực hiệu dụng nhìn cả rổ đối tác thương mại theo trọng số, không chỉ một cặp tiền",
      "Quan hệ này dùng để đánh giá mức định giá dài hạn, không dùng để chọn thời điểm giao dịch",
    ],
    practicePrompt: {
      question:
        "Tỷ giá danh nghĩa ổn định ba năm, lạm phát trong nước cao hơn đối tác thương mại khoảng 3 điểm phần trăm mỗi năm. Hệ quả với doanh nghiệp xuất khẩu là gì?",
      options: [
        "Không ảnh hưởng gì vì tỷ giá bán hàng ra nước ngoài không thay đổi",
        "Tỷ giá thực lên giá gần 10%, chi phí trong nước tăng còn giá bán quốc tế thì không",
        "Doanh nghiệp hưởng lợi vì tỷ giá ổn định giúp lập kế hoạch kinh doanh dễ dàng hơn",
        "Chỉ ảnh hưởng tới doanh nghiệp nhập khẩu chứ không ảnh hưởng tới xuất khẩu",
      ],
      correct: 1,
      explanation:
        "Đây là dạng xói mòn năng lực cạnh tranh khó nhận ra nhất vì không có sự kiện nào để chỉ vào. Biên lợi nhuận xuất khẩu co lại dần qua nhiều quý, và ban điều hành thường quy cho cạnh tranh gay gắt thay vì cho tỷ giá thực.",
    },
    summary: {
      keyIdea: "Tỷ giá danh nghĩa ổn định không đồng nghĩa với năng lực cạnh tranh ổn định",
      formula: "Tỷ giá thực = Tỷ giá danh nghĩa × (Mức giá nước ngoài / Mức giá trong nước)",
      commonMistake: "Đánh giá tỷ giá bằng con số danh nghĩa mà bỏ qua chênh lệch lạm phát tích lũy",
      action: "Tìm chỉ số tỷ giá thực hiệu dụng của Việt Nam và xem xu hướng năm năm gần nhất.",
    },
    application: {
      title: "Thêm một biến vào mô hình doanh nghiệp xuất khẩu",
      message:
        "Khi dự phóng biên lợi nhuận của doanh nghiệp xuất khẩu, đừng chỉ giả định tỷ giá danh nghĩa. Hãy hỏi chi phí trong nước tăng theo lạm phát bao nhiêu, giá bán quốc tế có tăng tương ứng không, và khoảng cách đó tích lũy thế nào qua giai đoạn dự phóng.",
      secondary: "Đây cũng là lý do các doanh nghiệp xuất khẩu bền vững thường có lợi thế về công nghệ hoặc thương hiệu, chứ không chỉ dựa vào chi phí thấp.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước cho thấy tỷ giá kỳ hạn bị ràng buộc chặt bởi lãi suất. Nhưng còn tỷ giá giao ngay trong dài hạn thì sao - có lực nào kéo nó về đâu không? Câu trả lời là có, và nó đến từ hàng hóa chứ không từ dòng vốn.",
      },
      {
        type: "heading",
        text: "Từ quy luật một giá đến ngang giá sức mua",
      },
      {
        type: "paragraph",
        text: "Nếu cùng một món hàng có thể vận chuyển tự do giữa hai nước, giá quy về cùng đồng tiền phải bằng nhau, nếu không sẽ có người mua rẻ bán đắt. Mở rộng từ một món hàng ra cả rổ hàng hóa, ta có ngang giá sức mua: tỷ giá phải điều chỉnh sao cho cùng một số tiền mua được lượng hàng hóa tương đương ở hai nơi. Trong thực tế, phần lớn giá trị nền kinh tế nằm ở dịch vụ và những thứ không xuất nhập khẩu được, nên quan hệ này chỉ đúng một cách gần đúng và rất chậm.",
      },
      {
        type: "comparison",
        left: {
          label: "Tỷ giá danh nghĩa",
          text: "Con số bạn thấy trên bảng điện. Cho biết đổi được bao nhiêu tiền, không cho biết mua được bao nhiêu hàng.",
        },
        right: {
          label: "Tỷ giá thực",
          text: "Đã điều chỉnh chênh lệch mức giá. Đây mới là thước đo năng lực cạnh tranh của hàng hóa trong nước.",
        },
      },
      {
        type: "callout",
        label: "Hai neo, hai chân trời thời gian",
        text: "Ngang giá lãi suất là quan hệ chặt, đúng gần như tuyệt đối, và chi phối giá kỳ hạn hôm nay. Ngang giá sức mua là quan hệ lỏng, đúng trong nhiều năm, và chi phối xu hướng dài hạn. Nhầm lẫn phạm vi áp dụng của hai quan hệ này là lỗi phổ biến nhất khi phân tích tỷ giá.",
      },
      {
        type: "closing",
        lines: [
          "Trong ngắn hạn tỷ giá đi theo dòng vốn; trong dài hạn nó bị kéo về phía giá cả.",
          "Bài sau đưa tỷ giá và rủi ro quốc gia vào chính mô hình định giá của bạn.",
        ],
      },
    ],
  },
  {
    id: 1463,
    slug: "country-risk-premium-va-dinh-gia-xuyen-bien-gioi",
    title: "Tài chính quốc tế, Bài 3: Định giá xuyên biên giới - chiết khấu đúng đồng tiền, cộng đúng rủi ro quốc gia",
    subtitle: "Phần bù rủi ro quốc gia, chiết khấu theo đồng tiền và những lỗi nhân đôi rủi ro",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🧭",
    track: "professional",
    whyItMatters:
      "Định giá một doanh nghiệp ở thị trường mới nổi luôn vấp vào cùng ba câu hỏi: chiết khấu bằng đồng gì, lãi suất phi rủi ro lấy ở đâu, và cộng thêm bao nhiêu cho rủi ro quốc gia. Trả lời sai bất kỳ câu nào sẽ làm giá trị lệch hàng chục phần trăm.",
    openingQuestion:
      "Dòng tiền dự phóng bằng đồng Việt Nam thì phải chiết khấu bằng gì?",
    openingOptions: [
      "Chi phí vốn tính bằng đô la Mỹ để so sánh được với thị trường quốc tế",
      "Chi phí vốn tính bằng đồng Việt Nam, phản ánh lạm phát và rủi ro của chính đồng đó",
      "Lãi suất trái phiếu chính phủ Mỹ cùng kỳ hạn với giai đoạn dự phóng",
      "Bình quân chi phí vốn của hai đồng tiền theo tỷ trọng doanh thu từng thị trường",
    ],
    correctOption: 1,
    explanation:
      "Nguyên tắc nhất quán đồng tiền là quy tắc nền tảng và cũng là quy tắc bị vi phạm nhiều nhất. Dòng tiền bằng đồng nào thì tỷ suất chiết khấu phải tính bằng đồng đó, vì lạm phát của đồng tiền đã nằm trong cả tử số lẫn mẫu số. Chiết khấu dòng tiền danh nghĩa bằng đồng nội tệ có lạm phát cao bằng chi phí vốn đô la sẽ cho ra giá trị cao hơn thực tế rất nhiều. Muốn định giá bằng đô la, bạn phải chuyển dòng tiền sang đô la theo tỷ giá kỳ vọng trước, rồi mới chiết khấu bằng chi phí vốn đô la.",
    diagram: [
      { label: "Dòng tiền bằng đồng X", arrow: true },
      { label: "Chiết khấu bằng chi phí vốn đồng X", arrow: true },
      { label: "Hoặc: chuyển sang đồng Y theo tỷ giá kỳ vọng", arrow: true },
      { label: "Rồi chiết khấu bằng chi phí vốn đồng Y" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Báo cáo định giá của khối phân tích quốc tế",
      description:
        "Trong các báo cáo định giá doanh nghiệp thị trường mới nổi, phần thuyết minh chi phí vốn thường dài hơn cả phần dự phóng doanh thu, vì mỗi lựa chọn đều gây tranh cãi: lấy lãi suất phi rủi ro của thị trường nào, ước lượng phần bù rủi ro quốc gia bằng chênh lệch lợi suất trái phiếu chính phủ hay bằng cách nhân thêm hệ số biến động, và có cộng phần bù đó cho mọi doanh nghiệp hay chỉ cho doanh nghiệp có doanh thu nội địa. Không có câu trả lời chuẩn, nhưng có yêu cầu bắt buộc là nêu rõ mình đã chọn gì.",
    },
    quiz: [
      {
        question: "Phần bù rủi ro quốc gia thường được ước lượng thế nào?",
        options: [
          "Bằng chênh lệch lợi suất trái phiếu chính phủ so với thị trường phát triển",
          "Bằng chênh lệch lạm phát giữa hai quốc gia trong năm tài chính gần nhất",
          "Bằng mức tăng trưởng GDP bình quân của quốc gia đó trong mười năm qua",
          "Bằng tỷ lệ dự trữ ngoại hối trên tổng kim ngạch nhập khẩu hằng năm",
        ],
        correct: 0,
        explanation:
          "Cách phổ biến nhất là lấy chênh lệch lợi suất trái phiếu chính phủ phát hành bằng ngoại tệ so với trái phiếu kho bạc của thị trường phát triển, đôi khi nhân thêm hệ số phản ánh việc cổ phiếu biến động mạnh hơn trái phiếu. Đây là ước lượng có nhiều tranh cãi, nên phải trình bày rõ phương pháp.",
      },
      {
        question: "Vì sao không nên cộng phần bù rủi ro quốc gia như nhau cho mọi doanh nghiệp trong nước?",
        options: [
          "Vì doanh nghiệp lớn luôn có rủi ro thấp hơn doanh nghiệp nhỏ trong cùng quốc gia",
          "Vì mức phơi nhiễm khác nhau: doanh nghiệp xuất khẩu chịu rủi ro nội địa ít hơn",
          "Vì phần bù này chỉ áp dụng cho doanh nghiệp có vốn đầu tư nước ngoài",
          "Vì cơ quan quản lý quy định mức phần bù riêng cho từng nhóm ngành nghề",
        ],
        correct: 1,
        explanation:
          "Một doanh nghiệp có phần lớn doanh thu từ xuất khẩu sang thị trường phát triển ít phụ thuộc vào rủi ro kinh tế nội địa hơn một doanh nghiệp bán lẻ trong nước. Cách xử lý tinh tế là phân bổ phần bù theo tỷ trọng doanh thu hoặc tài sản theo địa bàn.",
      },
      {
        question: "Lỗi nhân đôi rủi ro trong định giá xuyên biên giới là gì?",
        options: [
          "Vừa hạ dòng tiền dự phóng cho rủi ro vừa cộng phần bù vào tỷ suất chiết khấu",
          "Dùng hai nguồn dữ liệu khác nhau cho cùng một tham số trong mô hình định giá",
          "Chiết khấu hai lần cho cùng một năm dự phóng do lỗi công thức trong bảng tính",
          "Cộng cả rủi ro tỷ giá và rủi ro lãi suất vào cùng một tham số chi phí vốn",
        ],
        correct: 0,
        explanation:
          "Nếu bạn đã hạ kịch bản doanh thu để phản ánh rủi ro chính sách hay rủi ro vĩ mô, rồi lại cộng thêm phần bù rủi ro quốc gia vào chi phí vốn, cùng một rủi ro bị tính hai lần. Hãy chọn một trong hai cách và nói rõ mình chọn cách nào.",
      },
      {
        question: "Khi định giá doanh nghiệp có doanh thu ở nhiều đồng tiền, cách xử lý đúng là gì?",
        options: [
          "Quy toàn bộ doanh thu về đồng tiền báo cáo ngay từ năm đầu tiên rồi chiết khấu một lần",
          "Dự phóng theo từng đồng tiền, quy đổi bằng tỷ giá kỳ vọng, rồi chiết khấu nhất quán",
          "Chọn đồng tiền có tỷ trọng doanh thu lớn nhất và bỏ qua các đồng tiền còn lại",
          "Chiết khấu từng đồng tiền bằng chi phí vốn của đồng đó rồi lấy trung bình kết quả",
        ],
        correct: 1,
        explanation:
          "Cách này giữ được cả cấu trúc kinh tế lẫn tính nhất quán đồng tiền. Điều quan trọng là tỷ giá kỳ vọng dùng để quy đổi nên nhất quán với chênh lệch lạm phát đã giả định trong chính dòng tiền.",
      },
    ],
    keyTakeaways: [
      "Nguyên tắc nhất quán: dòng tiền bằng đồng nào thì chiết khấu bằng chi phí vốn của đồng đó",
      "Phần bù rủi ro quốc gia thường ước lượng từ chênh lệch lợi suất trái phiếu chính phủ, và luôn cần thuyết minh phương pháp",
      "Không cộng phần bù như nhau cho mọi doanh nghiệp - phơi nhiễm khác nhau theo cơ cấu doanh thu",
      "Tránh nhân đôi rủi ro: đã hạ dòng tiền thì đừng cộng thêm vào tỷ suất chiết khấu",
    ],
    practicePrompt: {
      question:
        "Một nhà phân tích dự phóng dòng tiền bằng đồng nội tệ với lạm phát 4%/năm rồi chiết khấu bằng WACC tính theo đô la là 9%. Sai ở đâu?",
      options: [
        "WACC 9% quá thấp so với mặt bằng chi phí vốn của thị trường mới nổi hiện nay",
        "Tử số chứa lạm phát nội tệ còn mẫu số thì không, làm giá trị bị thổi lên",
        "Không sai, vì đô la là đồng tiền tham chiếu chuẩn cho mọi mô hình định giá",
        "Sai ở chỗ chưa cộng thêm phần bù rủi ro tỷ giá vào tỷ suất chiết khấu",
      ],
      correct: 1,
      explanation:
        "Dòng tiền danh nghĩa bằng nội tệ đã bao gồm lạm phát nội tệ, trong khi WACC đô la chỉ phản ánh lạm phát đô la. Chênh lệch lạm phát bị bỏ quên ở mẫu số làm hiện giá cao hơn thực tế một cách hệ thống, và sai lệch càng lớn khi giai đoạn dự phóng càng dài.",
    },
    summary: {
      keyIdea: "Nhất quán đồng tiền là điều kiện tối thiểu để một mô hình định giá có nghĩa",
      commonMistake: "Chiết khấu dòng tiền nội tệ bằng chi phí vốn ngoại tệ",
      action: "Mở một mô hình định giá bạn từng dựng và kiểm tra tử số với mẫu số có cùng đồng tiền và cùng cơ sở lạm phát không.",
    },
    application: {
      title: "Ba dòng phải ghi rõ trong mọi định giá xuyên biên giới",
      message:
        "Mô hình chạy bằng đồng tiền nào; lãi suất phi rủi ro lấy từ đâu; và phần bù rủi ro quốc gia là bao nhiêu, tính bằng phương pháp gì, áp cho toàn bộ hay chỉ một phần doanh thu. Ghi rõ ba dòng này ngay đầu sheet giả định.",
      secondary: "Người phản biện mô hình của bạn sẽ hỏi đúng ba câu đó trước tiên.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước là lý thuyết về tỷ giá. Bài này đưa nó vào đúng chỗ nó gây thiệt hại nhiều nhất: mô hình định giá. Ba lỗi mô tả ở đây xuất hiện thường xuyên trong các báo cáo thật, và mỗi lỗi đều đủ sức làm giá trị lệch hàng chục phần trăm.",
      },
      {
        type: "heading",
        text: "Lỗi 1: lệch đồng tiền giữa tử số và mẫu số",
      },
      {
        type: "paragraph",
        text: "Đây là lỗi nghiêm trọng nhất và cũng dễ mắc nhất, vì dữ liệu chi phí vốn quốc tế luôn sẵn hơn dữ liệu nội địa. Nếu dòng tiền tăng theo lạm phát nội tệ mà tỷ suất chiết khấu chỉ phản ánh lạm phát của một đồng tiền ổn định hơn, mô hình đang so hai thứ khác đơn vị. Sai lệch tích lũy theo thời gian nên ảnh hưởng lớn nhất lên giá trị cuối cùng - phần thường chiếm quá nửa tổng định giá.",
      },
      {
        type: "heading",
        text: "Lỗi 2 và 3: rủi ro quốc gia bị bỏ quên hoặc bị tính hai lần",
      },
      {
        type: "list",
        items: [
          "Bỏ quên: dùng nguyên chi phí vốn của thị trường phát triển cho một doanh nghiệp phụ thuộc hoàn toàn vào kinh tế nội địa",
          "Tính hai lần: vừa hạ kịch bản dòng tiền cho rủi ro chính sách vừa cộng phần bù rủi ro quốc gia vào chi phí vốn",
          "Áp đồng loạt: cộng cùng một mức phần bù cho doanh nghiệp xuất khẩu và doanh nghiệp bán lẻ nội địa, dù mức phơi nhiễm rất khác nhau",
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc trình bày",
        text: "Không có phương pháp nào được cả ngành đồng thuận về phần bù rủi ro quốc gia. Vì vậy tiêu chuẩn nghề nghiệp không phải chọn đúng con số, mà là nêu rõ con số đến từ đâu và trình bày độ nhạy của kết quả với nó. Một định giá kèm bảng độ nhạy theo phần bù rủi ro luôn đáng tin hơn một định giá đưa ra một con số duy nhất.",
      },
      {
        type: "closing",
        lines: [
          "Định giá xuyên biên giới không cần công cụ mới, chỉ cần kỷ luật về đơn vị đo.",
          "Bài cuối chặng chuyển từ định giá sang kế toán: tỷ giá hiện lên thế nào trên báo cáo hợp nhất.",
        ],
      },
    ],
  },
  {
    id: 1464,
    slug: "rui-ro-ty-gia-tren-bao-cao-hop-nhat",
    title: "Tài chính quốc tế, Bài 4: Rủi ro tỷ giá trên báo cáo - giao dịch, chuyển đổi và kinh tế",
    subtitle: "Ba loại phơi nhiễm khác nhau, và vì sao chỉ một trong ba làm doanh nghiệp mất tiền thật",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Doanh nghiệp báo lỗ tỷ giá hàng trăm tỷ là tin xuất hiện mỗi mùa báo cáo, nhưng phần lớn các khoản đó không kèm theo một đồng tiền mặt nào chảy ra. Phân biệt được ba loại phơi nhiễm giúp bạn biết khoản lỗ nào đáng lo và khoản nào chỉ là bút toán quy đổi.",
    openingQuestion:
      "Doanh nghiệp báo lỗ chênh lệch tỷ giá do đánh giá lại khoản vay ngoại tệ cuối kỳ. Đây là loại phơi nhiễm nào?",
    openingOptions: [
      "Phơi nhiễm giao dịch, và khoản lỗ này sẽ thành tiền thật khi trả nợ nếu tỷ giá giữ nguyên",
      "Phơi nhiễm chuyển đổi, chỉ là bút toán quy đổi và không bao giờ ảnh hưởng tới dòng tiền",
      "Phơi nhiễm kinh tế, phản ánh việc năng lực cạnh tranh dài hạn của doanh nghiệp giảm sút",
      "Không thuộc loại nào vì đánh giá lại cuối kỳ chỉ là thủ tục kế toán bắt buộc",
    ],
    correctOption: 0,
    explanation:
      "Khoản vay ngoại tệ là một nghĩa vụ có thật, phải trả bằng ngoại tệ có thật. Việc đánh giá lại cuối kỳ chưa làm tiền chảy ra, nhưng nó ghi nhận trước một khoản sẽ trở thành tiền mặt tại ngày trả nợ nếu tỷ giá không đảo chiều. Vì vậy đây là phơi nhiễm giao dịch, và nó khác hẳn với chênh lệch phát sinh khi quy đổi báo cáo của một công ty con ở nước ngoài - loại thứ hai chỉ thay đổi con số trên giấy.",
    diagram: [
      { label: "Giao dịch: nghĩa vụ có thật bằng ngoại tệ", arrow: true },
      { label: "Chuyển đổi: quy đổi báo cáo công ty con", arrow: true },
      { label: "Kinh tế: năng lực cạnh tranh dài hạn", arrow: true },
      { label: "Chỉ loại đầu chắc chắn thành tiền mặt" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Doanh nghiệp điện và hàng không vay ngoại tệ dài hạn",
      description:
        "Các doanh nghiệp đầu tư tài sản lớn thường vay ngoại tệ dài hạn vì lãi suất thấp hơn và kỳ hạn dài hơn. Mỗi kỳ báo cáo, khoản vay này được đánh giá lại theo tỷ giá cuối kỳ, tạo ra lãi hoặc lỗ chênh lệch tỷ giá rất lớn trên báo cáo kết quả kinh doanh - trong khi doanh thu của họ hầu như hoàn toàn bằng nội tệ. Lợi nhuận vì thế dao động theo tỷ giá chứ không theo hoạt động kinh doanh, và người phân tích buộc phải tách hai phần đó ra mới thấy được xu hướng thật.",
    },
    quiz: [
      {
        question: "Phơi nhiễm chuyển đổi phát sinh từ đâu?",
        options: [
          "Từ việc quy đổi báo cáo tài chính của công ty con nước ngoài khi hợp nhất",
          "Từ các hợp đồng mua bán hàng hóa được thanh toán bằng ngoại tệ trong kỳ",
          "Từ việc doanh nghiệp nắm giữ tiền mặt bằng nhiều loại ngoại tệ khác nhau",
          "Từ chênh lệch giữa tỷ giá mua và tỷ giá bán do ngân hàng thương mại niêm yết",
        ],
        correct: 0,
        explanation:
          "Khoản chênh lệch này thường được ghi vào một mục riêng trong vốn chủ sở hữu chứ không qua báo cáo kết quả kinh doanh, và nó chỉ thành tiền thật nếu doanh nghiệp bán hoặc thanh lý khoản đầu tư ở nước ngoài đó.",
        },
      {
        question: "Phơi nhiễm kinh tế là gì?",
        options: [
          "Ảnh hưởng của biến động tỷ giá lên năng lực cạnh tranh và dòng tiền tương lai",
          "Ảnh hưởng của tỷ giá lên giá trị các khoản phải thu đã phát sinh trong kỳ",
          "Ảnh hưởng của tỷ giá lên giá trị hàng tồn kho nhập khẩu đang lưu tại kho",
          "Ảnh hưởng của tỷ giá lên chi phí lãi vay của các khoản vay bằng ngoại tệ",
        ],
        correct: 0,
        explanation:
          "Đây là loại nguy hiểm nhất vì không có khoản mục kế toán nào ghi nhận nó. Một doanh nghiệp không hề vay ngoại tệ và không nhập khẩu vẫn có thể mất thị phần khi đồng nội tệ lên giá thực và hàng nhập khẩu trở nên rẻ hơn.",
      },
      {
        question: "Cách phòng hộ tự nhiên hiệu quả nhất cho rủi ro tỷ giá là gì?",
        options: [
          "Mua hợp đồng kỳ hạn cho toàn bộ nghĩa vụ ngoại tệ ngay khi phát sinh",
          "Khớp đồng tiền của doanh thu với đồng tiền của chi phí và nợ vay",
          "Giữ một phần lớn tài sản dưới dạng tiền gửi bằng nhiều loại ngoại tệ",
          "Chuyển toàn bộ hợp đồng bán hàng sang thanh toán bằng đồng nội tệ",
        ],
        correct: 1,
        explanation:
          "Phòng hộ tự nhiên không tốn phí và không có rủi ro cơ sở. Doanh nghiệp xuất khẩu vay ngoại tệ để tài trợ vốn lưu động đang tự khớp dòng tiền của mình - đó là lý do cùng một khoản vay ngoại tệ có thể là khôn ngoan với doanh nghiệp này và liều lĩnh với doanh nghiệp khác.",
      },
      {
        question: "Khi đọc báo cáo có khoản lỗ tỷ giá lớn, việc đầu tiên cần làm là gì?",
        options: [
          "Loại khoản đó khỏi lợi nhuận vì mọi khoản lỗ tỷ giá đều là bút toán trên giấy",
          "Xác định nó đến từ đánh giá lại nghĩa vụ thật hay từ quy đổi báo cáo",
          "So sánh mức lỗ với các doanh nghiệp cùng ngành trong cùng kỳ báo cáo",
          "Điều chỉnh lại toàn bộ dự phóng theo mức tỷ giá tại ngày kết thúc kỳ kế toán",
        ],
        correct: 1,
        explanation:
          "Hai nguồn gốc dẫn tới hai kết luận trái ngược. Đánh giá lại khoản vay ngoại tệ là dự báo về tiền mặt sẽ mất trong tương lai; chênh lệch quy đổi báo cáo công ty con thì không. Thuyết minh về chênh lệch tỷ giá cho biết chính xác khoản nào là khoản nào.",
      },
    ],
    keyTakeaways: [
      "Phơi nhiễm giao dịch gắn với nghĩa vụ thật bằng ngoại tệ - sẽ thành tiền mặt",
      "Phơi nhiễm chuyển đổi chỉ là quy đổi báo cáo công ty con, thường ghi vào vốn chủ sở hữu",
      "Phơi nhiễm kinh tế không có khoản mục kế toán nào ghi nhận nhưng ảnh hưởng dòng tiền tương lai",
      "Phòng hộ tự nhiên bằng cách khớp đồng tiền của doanh thu, chi phí và nợ vay là biện pháp rẻ nhất",
    ],
    practicePrompt: {
      question:
        "Doanh nghiệp có doanh thu hoàn toàn bằng nội tệ và khoản vay lớn bằng ngoại tệ. Điều gì đúng?",
      options: [
        "Doanh nghiệp đang phòng hộ tự nhiên vì hai bên bảng cân đối bù trừ cho nhau",
        "Doanh nghiệp có phơi nhiễm giao dịch lớn và lợi nhuận sẽ dao động theo tỷ giá",
        "Rủi ro không đáng kể vì khoản vay chỉ được đánh giá lại một lần khi đến hạn trả",
        "Doanh nghiệp chỉ chịu phơi nhiễm chuyển đổi vì khoản vay nằm trên bảng cân đối",
      ],
      correct: 1,
      explanation:
        "Đây là cấu trúc phơi nhiễm tệ nhất: nghĩa vụ bằng ngoại tệ, khả năng trả nợ bằng nội tệ, không có gì bù trừ. Khi phân tích doanh nghiệp dạng này, hãy tính riêng lợi nhuận trước chênh lệch tỷ giá để thấy xu hướng kinh doanh thật, đồng thời chạy kịch bản tỷ giá bất lợi lên khả năng trả nợ.",
    },
    summary: {
      keyIdea: "Không phải khoản lỗ tỷ giá nào cũng là mất tiền, nhưng khoản gắn với nghĩa vụ thật thì có",
      commonMistake: "Gộp mọi khoản chênh lệch tỷ giá vào một nhóm rồi hoặc bỏ qua hết hoặc lo lắng hết",
      action: "Tìm thuyết minh chênh lệch tỷ giá của một doanh nghiệp vay ngoại tệ và tách phần đánh giá lại khỏi phần đã thực hiện.",
    },
    application: {
      title: "Tách lợi nhuận thành hai phần",
      message:
        "Với doanh nghiệp có nợ ngoại tệ lớn, hãy luôn tính lợi nhuận trước chênh lệch tỷ giá bên cạnh lợi nhuận báo cáo. Phần thứ nhất cho thấy hoạt động kinh doanh, phần chênh lệch cho thấy mức độ phơi nhiễm - và hai câu chuyện đó cần được đánh giá riêng.",
      secondary: "Đây cũng là cách ban điều hành có kinh nghiệm trình bày kết quả cho nhà đầu tư.",
    },
    sections: [
      {
        type: "lead",
        text: "Cứ mỗi mùa báo cáo lại có những tiêu đề về doanh nghiệp lỗ nặng vì tỷ giá. Đôi khi đó là cảnh báo nghiêm túc về khả năng trả nợ, đôi khi chỉ là một bút toán quy đổi không ai mất đồng nào. Phân biệt được hai trường hợp là nội dung của bài này.",
      },
      {
        type: "conceptTable",
        title: "Ba loại phơi nhiễm tỷ giá",
        subtitle: "Cùng một biến động tỷ giá, ba hệ quả rất khác nhau",
        concepts: [
          { vi: "Phơi nhiễm giao dịch", en: "Transaction exposure", def: "Nghĩa vụ hoặc quyền lợi có thật bằng ngoại tệ: khoản vay, khoản phải trả nhà cung cấp nước ngoài, khoản phải thu xuất khẩu. Sẽ thành tiền mặt." },
          { vi: "Phơi nhiễm chuyển đổi", en: "Translation exposure", def: "Phát sinh khi quy đổi báo cáo của công ty con nước ngoài về đồng tiền báo cáo. Thường ghi vào vốn chủ sở hữu, chỉ thành tiền khi thoái vốn." },
          { vi: "Phơi nhiễm kinh tế", en: "Economic exposure", def: "Ảnh hưởng của tỷ giá lên năng lực cạnh tranh và dòng tiền tương lai. Không có khoản mục kế toán nào ghi nhận, và thường là loại lớn nhất." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lỗ tỷ giá đáng lo",
          text: "Đánh giá lại khoản vay ngoại tệ ở doanh nghiệp có doanh thu nội tệ. Nó dự báo dòng tiền sẽ phải bỏ ra nhiều hơn khi trả nợ.",
        },
        right: {
          label: "Lỗ tỷ giá ít đáng lo",
          text: "Chênh lệch quy đổi báo cáo công ty con đang hoạt động ổn định và không có kế hoạch thoái vốn. Không có dòng tiền nào thay đổi.",
        },
      },
      {
        type: "callout",
        label: "Loại nguy hiểm nhất lại vô hình",
        text: "Phơi nhiễm kinh tế không xuất hiện ở bất kỳ dòng nào trên báo cáo tài chính, nhưng nó có thể lớn hơn cả hai loại kia cộng lại. Một doanh nghiệp không vay ngoại tệ, không nhập khẩu, vẫn có thể mất dần thị phần vào tay hàng nhập khẩu khi tỷ giá thực thay đổi - đúng cơ chế đã học ở bài về ngang giá sức mua.",
      },
      {
        type: "closing",
        lines: [
          "Kết thúc chặng: tỷ giá chi phối cả giá kỳ hạn hôm nay, xu hướng dài hạn, mô hình định giá và báo cáo tài chính.",
          "Điểm chung của cả bốn bài là một kỷ luật duy nhất: luôn biết mình đang đo bằng đồng tiền nào.",
        ],
      },
    ],
  },
];
