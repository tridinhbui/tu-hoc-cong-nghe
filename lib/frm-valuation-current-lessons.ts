import type { Lesson } from "./lesson-types";

// Hai môn FRM mỏng nhất còn lại sau đợt lib/frm-core-gaps-lessons.ts (xem
// lib/frm-track.ts): Valuation and Risk Models chiếm 30% Part I - tỷ trọng
// lớn nhất của cả phần - nhưng toàn bộ 16 bài đều mượn từ nơi khác, không
// có bài nào viết riêng; và Current Issues 7 bài trên 10%.
//
// ids 1637-1648, professional track.

export const FRM_VALUATION_CURRENT_LESSONS: Lesson[] = [
  {
    id: 1637,
    slug: "frm-dinh-gia-khong-kinh-doanh-chenh-lech-gia",
    title: "FRM Valuation, Bài 1: Nguyên lý không kinh doanh chênh lệch giá",
    subtitle: "Viên gạch đầu tiên của mọi mô hình định giá - và lý do định giá không cần biết bạn nghĩ giá sẽ đi đâu",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "professional",
    whyItMatters: "Toàn bộ chương định giá của FRM đứng trên một giả định duy nhất: không tồn tại bữa trưa miễn phí. Hiểu nguyên lý này rồi thì cây nhị thức, Black-Scholes và định giá hoán đổi đều là cùng một ý tưởng mặc ba bộ áo khác nhau.",
    openingQuestion: "Nguyên lý không kinh doanh chênh lệch giá phát biểu điều gì?",
    openingOptions: [
      "Hai dòng tiền tương lai giống hệt nhau phải có cùng một giá hôm nay",
      "Mọi tài sản tài chính đều phải sinh lời cao hơn lãi suất phi rủi ro trong dài hạn",
      "Giá tài sản luôn phản ánh đúng giá trị nội tại của doanh nghiệp phát hành",
      "Nhà đầu tư luôn hành động hợp lý và không bao giờ mắc sai lầm khi định giá"
    ],
    correctOption: 0,
    explanation: "Nguyên lý không có cơ hội kinh doanh chênh lệch giá là nền của toàn bộ định giá phái sinh: nếu hai gói dòng tiền y hệt nhau mà giá khác nhau, ai cũng mua rẻ bán đắt cho tới khi chênh lệch biến mất. Điều đáng chú ý là nó không đòi hỏi nhà đầu tư hợp lý hay thị trường hiệu quả - chỉ cần đủ người tham lam để nhặt tiền rơi. Nhờ giả định nhẹ như vậy, kết luận rút ra từ nó bền hơn nhiều so với các kết luận dựa trên giả thuyết thị trường hiệu quả.",
    diagram: [
      {
        label: "Dựng một danh mục sao chép đúng dòng tiền của tài sản cần định giá",
        arrow: true
      },
      {
        label: "Giá của danh mục sao chép quan sát được trên thị trường",
        arrow: true
      },
      {
        label: "Không chênh lệch giá → tài sản phải có đúng giá đó",
        arrow: true
      },
      {
        label: "Không cần biết xác suất thực của các kịch bản"
      }
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Vì sao định giá phái sinh không cần dự báo giá",
      description: "Điểm khiến người mới học ngạc nhiên nhất khi gặp định giá quyền chọn: công thức không chứa suất sinh lời kỳ vọng của cổ phiếu. Hai nhà phân tích bất đồng hoàn toàn về việc cổ phiếu sẽ lên hay xuống vẫn phải đồng ý về giá quyền chọn, vì cả hai đều đồng ý rằng không ai được phép kiếm tiền phi rủi ro. Dự báo của họ đã nằm sẵn trong giá cổ phiếu hiện tại rồi."
    },
    quiz: [
      {
        question: "Danh mục sao chép trong định giá phái sinh có vai trò gì?",
        options: [
          "Tái tạo đúng dòng tiền của phái sinh bằng các tài sản đã có giá thị trường",
          "Đa dạng hoá danh mục để hạ độ lệch chuẩn",
          "Dự báo giá tương lai của tài sản cơ sở",
          "Bảo đảm khoản lãi tối thiểu cho người nắm giữ"
        ],
        correct: 0,
        explanation: "Nếu ta ghép được cổ phiếu và tiền vay sao cho dòng tiền y hệt quyền chọn ở mọi kịch bản, thì giá quyền chọn buộc phải bằng chi phí dựng danh mục đó - nếu không sẽ có cơ hội kiếm tiền phi rủi ro."
      },
      {
        question: "Vì sao xác suất trung tính rủi ro không phải là xác suất thật của thị trường?",
        options: [
          "Đó là bộ trọng số toán học làm giá chiết khấu về đúng, không phải dự báo",
          "Vì thị trường luôn định giá sai xác suất xảy ra của các kịch bản tương lai",
          "Vì không có cách nào ước lượng được xác suất thật từ dữ liệu lịch sử giá",
          "Vì cơ quan quản lý cấm sử dụng xác suất thật trong các mô hình định giá"
        ],
        correct: 0,
        explanation: "Xác suất trung tính rủi ro là công cụ tính, không phải niềm tin. Nó gộp sẵn phần bù rủi ro vào bên trong, nhờ đó ta được phép chiết khấu bằng lãi suất phi rủi ro - một mẹo đại số, không phải một tuyên bố về thế giới."
      },
      {
        question: "Trong thực tế, vì sao các chênh lệch giá nhỏ vẫn tồn tại dai dẳng trên thị trường?",
        options: [
          "Vì chi phí giao dịch và vốn có hạn khiến khai thác không đáng",
          "Vì các nhà giao dịch chuyên nghiệp không có công cụ để phát hiện ra chúng",
          "Vì luật pháp nghiêm cấm mọi hoạt động kinh doanh chênh lệch giá",
          "Vì chúng chỉ xuất hiện ở các thị trường chưa được số hoá"
        ],
        correct: 0,
        explanation: "Không kinh doanh chênh lệch giá là giả định giới hạn, không phải mô tả chính xác. Một chênh lệch nhỏ hơn chi phí thực hiện sẽ nằm nguyên đó - đây là lý do mô hình định giá luôn có sai số so với giá quan sát."
      }
    ,
    {
      "question": "Vì sao nguyên lý không kinh doanh chênh lệch giá không đòi hỏi nhà đầu tư phải hợp lý?",
      "options": [
        "Vì chỉ cần vài người tham lam nhặt tiền rơi là chênh lệch bị xoá",
        "Vì nguyên lý chỉ đúng ở thị trường có nhà tạo lập",
        "Vì các nhà đầu tư không hợp lý sẽ bị loại khỏi thị trường trong dài hạn",
        "Vì mọi mô hình định giá đều giả định nhà đầu tư trung tính với rủi ro"
      ],
      "correct": 0,
      "explanation": "Đây là điểm mạnh của lập luận: nó không cần đa số hành xử hợp lý, chỉ cần một số ít có vốn và có động cơ. Nhờ vậy nó bền hơn nhiều so với các kết luận dựa trên giả thuyết thị trường hiệu quả."
    },
    {
      "question": "Vì sao các chênh lệch giá nhỏ vẫn tồn tại dai dẳng trên thị trường thật?",
      "options": [
        "Vì chi phí giao dịch, vốn và rủi ro tài trợ làm việc khai thác không đáng",
        "Vì các nhà đầu tư lớn đã có thoả thuận ngầm với nhau về việc không khai thác chênh lệch nhỏ",
        "Vì quy định cấm giao dịch nhằm mục đích khai thác chênh lệch giá",
        "Vì các mô hình định giá hiện đại đã loại bỏ hết chênh lệch có ý nghĩa"
      ],
      "correct": 0,
      "explanation": "Lý thuyết giả định giao dịch không mất phí và vốn vô hạn. Trong thực tế, khoản chênh vài điểm cơ bản đòi đòn bẩy lớn để đáng làm, mà đòn bẩy lớn thì kéo theo rủi ro bị gọi ký quỹ trước khi giá hội tụ - đúng thứ đã kết liễu LTCM."
    }
    ],
    practicePrompt: {
      question:
        "Cổ phiếu đang 100.000đ, lãi suất phi rủi ro 6% một năm, không trả cổ tức. Một hợp đồng kỳ hạn một năm đang được chào ở 104.000đ. Nên làm gì?",
      options: [
        "Mua kỳ hạn và bán khống cổ phiếu, chốt 2.000đ",
        "Bán kỳ hạn và mua cổ phiếu, chốt 2.000đ",
        "Không làm gì, vì 104.000 vẫn cao hơn giá giao ngay",
        "Mua cả hai, vì giá kỳ hạn thấp báo hiệu giá sẽ tăng",
      ],
      correct: 0,
      explanation:
        "Giá kỳ hạn hợp lý là 100.000 × 1,06 = 106.000đ, nên hợp đồng đang được chào rẻ 2.000đ. Cách khai thác: bán khống cổ phiếu lấy 100.000đ, gửi số tiền đó ở lãi suất phi rủi ro thành 106.000đ sau một năm, đồng thời mua kỳ hạn để cam kết mua lại cổ phiếu ở 104.000đ. Sau một năm trả cổ phiếu về, còn dư đúng 2.000đ mà không chịu rủi ro giá nào - dù cổ phiếu lên hay xuống. Phương án bán kỳ hạn và mua cổ phiếu là đúng chiều ngược lại, và nó lỗ đúng 2.000đ. Chú ý phép tính không cần biết gì về triển vọng của cổ phiếu.",
    },
    keyTakeaways: [
      "Hai dòng tiền giống hệt nhau phải có cùng một giá, nếu không sẽ có tiền rơi",
      "Danh mục sao chép biến bài toán định giá thành bài toán cộng giá các thành phần",
      "Xác suất trung tính rủi ro là công cụ tính, không phải dự báo về thế giới",
      "Chi phí giao dịch và vốn có hạn khiến chênh lệch nhỏ tồn tại được trong thực tế"
    ],
    summary: {
      keyIdea: "Định giá phái sinh không cần dự báo giá tương lai, chỉ cần giả định không ai được kiếm tiền phi rủi ro",
      commonMistake: "Hiểu xác suất trung tính rủi ro như dự báo thật của thị trường về khả năng tăng giảm",
      action: "Với mọi công thức định giá gặp phải, hỏi: danh mục sao chép ở đây gồm những gì"
    },
    application: {
      title: "Thử với một ví dụ đơn giản",
      message: "Một hợp đồng hứa trả đúng 100 triệu sau một năm, không rủi ro. Giá hôm nay của nó phải bằng 100 triệu chiết khấu ở lãi suất phi rủi ro - nếu ai bán rẻ hơn, bạn mua và vay đúng khoản đó là có lãi chắc chắn.",
      secondary: "Toàn bộ định giá phái sinh chỉ là phiên bản phức tạp hơn của phép so sánh này."
    },
    sections: [
      {
        type: "lead",
        text: "Có một câu hỏi làm người mới học phái sinh bối rối rất lâu: vì sao công thức định giá quyền chọn không hề chứa dự đoán của ta về việc cổ phiếu sẽ lên hay xuống?"
      },
      {
        type: "heading",
        text: "Giả định duy nhất"
      },
      {
        type: "paragraph",
        text: "Không kinh doanh chênh lệch giá nghĩa là: không tồn tại một chiến lược nào cần vốn bằng 0, không rủi ro, mà vẫn sinh lời chắc chắn. Nó không đòi hỏi nhà đầu tư thông minh hay thị trường hiệu quả - chỉ cần có đủ người sẵn sàng nhặt tiền khi thấy tiền rơi trên sàn."
      },
      {
        type: "heading",
        text: "Từ giả định tới công thức"
      },
      {
        type: "paragraph",
        text: "Nếu dựng được một danh mục gồm các tài sản đã có giá, sao cho dòng tiền của nó trùng khớp với phái sinh trong mọi kịch bản, thì hai thứ phải có cùng giá. Bài toán định giá vì thế chuyển thành bài toán xây dựng danh mục sao chép - và đó là toàn bộ nội dung của cây nhị thức lẫn Black-Scholes."
      },
      {
        type: "callout",
        label: "Vì sao dự báo của bạn không xuất hiện trong công thức",
        text: "Quan điểm của bạn về hướng đi của cổ phiếu đã nằm trong giá cổ phiếu hiện tại - thứ mà công thức lấy làm đầu vào. Đưa thêm dự báo vào lần nữa là tính hai lần cùng một thông tin."
      },
      {
        type: "heading",
        text: "Dựng lại một quyền chọn bằng cổ phiếu và tiền vay"
      },
      {
        type: "paragraph",
        text: "Cổ phiếu đang 100, sau một kỳ chỉ có thể lên 120 hoặc xuống 90. Lãi suất phi rủi ro 5%. Quyền chọn mua giá thực hiện 100 trả 20 ở nhánh trên, 0 ở nhánh dưới. Mua Δ cổ phiếu và vay B, chọn Δ và B sao cho danh mục trả đúng 20 và 0: Δ = (20 − 0)/(120 − 90) = 0,667, và B = −57,14. Kiểm lại: nhánh trên 0,667×120 − 57,14×1,05 = 20; nhánh dưới 0,667×90 − 57,14×1,05 = 0. Danh mục này giống hệt quyền chọn trong MỌI kịch bản, nên hôm nay nó phải có cùng giá: 0,667×100 − 57,14 = 9,52."
      },
      {
        type: "callout",
        label: "Nếu quyền chọn không bán ở 9,52 thì có tiền miễn phí",
        text: "Giả sử thị trường ra giá 11. Bán quyền chọn thu 11, đồng thời mua danh mục sao chép hết 9,52 - bỏ túi 1,48 ngay hôm nay. Đến kỳ sau, dù giá lên 120 hay xuống 90, danh mục trả đúng bằng nghĩa vụ của quyền chọn vừa bán, nên khoản 1,48 kia là lợi nhuận không rủi ro, không cần vốn. Chính vì ai cũng làm được điều đó nên giá 11 không tồn tại lâu, và đó là toàn bộ sức mạnh của một giả định nghe rất yếu."
      },
      {
        type: "heading",
        text: "Xác suất trung hoà rủi ro chỉ là cách viết khác của cùng phép tính"
      },
      {
        type: "paragraph",
        text: "Từ đúng bộ số trên, đặt π = [(1 + 0,05)×100 − 90] / (120 − 90) = 0,5. Giá quyền chọn = (0,5×20 + 0,5×0) / 1,05 = 9,52 - trùng khít con số vừa dựng bằng danh mục sao chép. π KHÔNG phải xác suất thật của việc giá lên; nó là con số khiến cổ phiếu, nếu chiết khấu ở lãi suất phi rủi ro, có giá đúng bằng 100 hôm nay. Nói cách khác, xác suất thật đã bị thay thế bằng giá cổ phiếu - và đó là lý do dự đoán của bạn về hướng đi không xuất hiện ở đâu trong công thức."
      },
      {
        type: "closing",
        lines: [
          "Định giá không hỏi giá sẽ đi đâu; nó chỉ hỏi giá nào khiến không ai kiếm được tiền miễn phí.",
          "Bài tiếp theo: cách áp nguyên lý này vào một cây hai nhánh."
        ]
      }
    ]
  },
  {
    id: 1638,
    slug: "frm-cay-nhi-thuc-dinh-gia-quyen-chon",
    title: "FRM Valuation, Bài 2: Cây nhị thức định giá quyền chọn",
    subtitle: "Mô hình đơn giản nhất cho thấy toàn bộ logic - và là thứ duy nhất định giá được quyền chọn kiểu Mỹ",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🌳",
    track: "professional",
    whyItMatters: "Cây nhị thức là nơi nguyên lý không chênh lệch giá hiện ra rõ nhất bằng số học đơn giản, và nó xử lý được thứ Black-Scholes không làm nổi: quyền thực hiện sớm.",
    openingQuestion: "Trong mô hình cây nhị thức một bước, giá quyền chọn được xác định bằng cách nào?",
    openingOptions: [
      "Dựng danh mục cổ phiếu và tiền vay khớp dòng tiền quyền chọn ở cả hai nhánh",
      "Lấy trung bình có trọng số của hai giá trị tương lai theo xác suất thật rồi chiết khấu về hiện tại bằng suất sinh lời kỳ vọng của cổ phiếu",
      "Nhân giá cổ phiếu hiện tại với độ biến động hàng năm",
      "Lấy giá thị trường của quyền chọn tương tự đang niêm yết"
    ],
    correctOption: 0,
    explanation: "Cây nhị thức định giá quyền chọn bằng cách chia thời gian thành các bước, mỗi bước giá chỉ có hai khả năng. Với hai kịch bản và hai công cụ - cổ phiếu và tiền - luôn giải được một danh mục cho ra đúng giá trị quyền chọn ở cả hai nhánh, và chi phí dựng danh mục đó chính là giá quyền chọn. Điều đáng chú ý là phép tính không cần biết xác suất thật của mỗi nhánh. Tăng số bước lên rất lớn thì kết quả hội tụ về Black-Scholes.",
    diagram: [
      {
        label: "Giá cổ phiếu hôm nay, hai kịch bản ở bước sau",
        arrow: true
      },
      {
        label: "Tính delta: bao nhiêu cổ phiếu để khớp chênh lệch giá trị quyền chọn",
        arrow: true
      },
      {
        label: "Bù phần còn lại bằng vay hoặc gửi ở lãi suất phi rủi ro",
        arrow: true
      },
      {
        label: "Chi phí danh mục = giá quyền chọn"
      }
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Vì sao cây nhị thức vẫn được dùng dù đã có công thức đóng",
      description: "Black-Scholes cho lời giải tức thì nhưng chỉ đúng với quyền chọn kiểu Âu - loại chỉ thực hiện được đúng ngày đáo hạn. Quyền chọn kiểu Mỹ cho phép thực hiện bất cứ lúc nào, và giá trị của quyền đó phụ thuộc vào việc ở mỗi nút cây, thực hiện ngay có tốt hơn giữ tiếp hay không. Cây nhị thức trả lời được câu hỏi đó ở từng nút; công thức đóng thì không có chỗ để hỏi."
    },
    quiz: [
      {
        question: "Delta trong cây nhị thức một bước được tính thế nào?",
        options: [
          "Chênh lệch giá trị quyền chọn giữa hai nhánh chia cho chênh lệch giá cổ phiếu",
          "Trung bình hai giá trị tương lai theo xác suất thật rồi chiết khấu",
          "Giá quyền chọn chia cho giá cổ phiếu hiện tại",
          "Độ biến động nhân căn bậc hai của thời gian còn lại"
        ],
        correct: 0,
        explanation: "Delta là số cổ phiếu cần nắm để danh mục biến động cùng nhịp với quyền chọn. Lấy chênh lệch giá trị quyền chọn chia cho chênh lệch giá cổ phiếu cho ra đúng tỷ lệ đó - và nó cũng chính là ý nghĩa của delta trong bộ Greeks."
      },
      {
        question: "Vì sao cây nhị thức xử lý được quyền chọn kiểu Mỹ còn Black-Scholes thì không?",
        options: [
          "Vì ở mỗi nút so được thực hiện ngay với giữ tiếp",
          "Vì cây nhị thức sử dụng độ biến động chính xác hơn công thức đóng",
          "Vì quyền chọn Mỹ không có ngày đáo hạn",
          "Vì Black-Scholes chỉ áp dụng được cho hàng hoá, không cho cổ phiếu"
        ],
        correct: 0,
        explanation: "Quyền thực hiện sớm là một quyết định lặp lại ở mọi thời điểm, nên định giá nó cần một cấu trúc có các mốc trung gian. Cây có nút để đặt câu hỏi ở từng bước; công thức đóng chỉ có một điểm đáo hạn."
      },
      {
        question: "Khi tăng số bước của cây lên rất lớn, kết quả tiến tới đâu?",
        options: [
          "Hội tụ về giá theo công thức Black-Scholes",
          "Phân kỳ dần do sai số tích luỹ qua từng bước",
          "Về đúng giá trị nội tại của quyền chọn hôm nay",
          "Về 0 vì biến động mỗi bước cũng nhỏ dần"
        ],
        correct: 0,
        explanation: "Đây là mối liên hệ đẹp nhất của chương này: cây nhị thức với số bước tiến ra vô cùng hội tụ về công thức Black-Scholes. Hai mô hình trông rất khác nhau nhưng cùng đứng trên một nguyên lý."
      }
    ,
    {
      "question": "Vì sao xác suất trung hoà rủi ro trong cây nhị thức không phải xác suất thật của thị trường?",
      "options": [
        "Vì nó là con số suy ra từ điều kiện không có chênh lệch giá, không phải từ dự báo",
        "Vì xác suất thật luôn cao hơn xác suất trung hoà rủi ro với mọi tài sản",
        "Vì xác suất thật không thể quan sát được nên buộc phải thay bằng một con số quy ước",
        "Vì xác suất trung hoà rủi ro chỉ dùng được khi tài sản cơ sở không trả cổ tức"
      ],
      "correct": 0,
      "explanation": "Toàn bộ lập luận định giá không cần biết cổ phiếu có khả năng tăng bao nhiêu phần trăm. Nó chỉ cần một danh mục tái tạo đúng khoản chi trả trong mọi kịch bản - và chi phí dựng danh mục đó là giá quyền chọn, dù bạn tin xác suất nào."
    },
    {
      "question": "Vì sao cây nhị thức xử lý được quyền chọn kiểu Mỹ trong khi công thức Black-Scholes thì không?",
      "options": [
        "Vì tại mỗi nút có thể so sánh giá trị thực hiện ngay với giá trị tiếp tục nắm giữ",
        "Vì cây nhị thức hoàn toàn không cần giả định gì về phân phối của lợi suất tài sản cơ sở",
        "Vì công thức Black-Scholes chỉ áp dụng cho tài sản có trả cổ tức đều đặn",
        "Vì quyền chọn kiểu Mỹ luôn được thực hiện trước ngày đáo hạn"
      ],
      "correct": 0,
      "explanation": "Quyền thực hiện sớm là một quyết định lặp lại ở mọi thời điểm, và cây nhị thức có sẵn cấu trúc để kiểm tra nó tại từng nút. Công thức đóng thì cho ra một con số duy nhất, không có chỗ nào để chèn quyết định trung gian đó vào."
    }
    ],
    practicePrompt: {
      question:
        "Cây một bước: cổ phiếu đang 100, sau một kỳ lên 120 hoặc xuống 90. Quyền chọn mua có giá thực hiện 105. Delta của quyền chọn bằng bao nhiêu?",
      options: [
        "0,50 (= chênh 15 chia chênh 30)",
        "0,15 (= 15 chia giá cổ phiếu 100)",
        "1,00 vì quyền chọn đang có lãi",
        "0,33 (= 10 chia cho chênh 30)",
      ],
      correct: 0,
      explanation:
        "Ở nhánh lên, quyền chọn đáng 120 − 105 = 15; ở nhánh xuống nó vô giá trị. Delta là chênh lệch giá trị quyền chọn chia chênh lệch giá cổ phiếu: 15 / (120 − 90) = 0,50. Con số đó có nghĩa rất cụ thể - nắm nửa cổ phiếu cho mỗi quyền chọn bán ra là dựng được danh mục sao chép cho cùng dòng tiền ở cả hai nhánh, và chi phí dựng danh mục đó CHÍNH LÀ giá quyền chọn. Không chỗ nào trong phép tính cần biết xác suất thật của việc giá lên hay xuống, và đó là toàn bộ sức mạnh của nguyên lý không chênh lệch giá.",
    },
    keyTakeaways: [
      "Giá quyền chọn = chi phí dựng danh mục sao chép, không cần xác suất thật",
      "Delta = chênh lệch giá trị quyền chọn chia chênh lệch giá cổ phiếu",
      "Cây xử lý được quyền chọn kiểu Mỹ vì có nút để so thực hiện ngay với giữ tiếp",
      "Số bước tiến ra vô cùng thì cây hội tụ về giá Black-Scholes"
    ],
    summary: {
      keyIdea: "Cây nhị thức là nguyên lý không chênh lệch giá viết ra bằng số học lớp mười, và là công cụ chuẩn cho quyền chọn có quyền thực hiện sớm",
      commonMistake: "Dùng xác suất tăng giảm thật thay vì xác suất trung tính rủi ro khi tính ngược từ các nút",
      action: "Khi gặp một quyền chọn phức tạp, hỏi trước: nó có quyền thực hiện sớm không - nếu có thì phải dùng cây"
    },
    application: {
      title: "Tự dựng một cây một bước",
      message: "Cổ phiếu 100, sau một kỳ lên 120 hoặc xuống 80. Quyền chọn mua giá thực hiện 100 sẽ đáng 20 hoặc 0. Delta = (20−0)/(120−80) = 0,5 - tức nửa cổ phiếu cộng một khoản vay là sao chép được quyền chọn đó.",
      secondary: "Làm tay đúng một lần thì toàn bộ chương định giá quyền chọn sáng ra."
    },
    sections: [
      {
        type: "lead",
        text: "Cây nhị thức được dạy trước Black-Scholes không phải vì nó kém quan trọng hơn, mà vì nó là chỗ duy nhất bạn nhìn thấy được toàn bộ lập luận bằng phép cộng trừ."
      },
      {
        type: "heading",
        text: "Hai kịch bản, hai công cụ"
      },
      {
        type: "paragraph",
        text: "Ở một bước, giá cổ phiếu chỉ có thể đi lên hoặc đi xuống. Ta có hai công cụ để sao chép: chính cổ phiếu đó và tiền ở lãi suất phi rủi ro. Hai phương trình, hai ẩn - luôn giải được. Số cổ phiếu cần nắm chính là delta."
      },
      {
        type: "formula",
        title: "Delta trong cây một bước",
        equation: "Δ = (Cu − Cd) / (Su − Sd)",
        variables: [
          {
            symbol: "Cu, Cd",
            name: "Giá trị quyền chọn ở nhánh tăng và nhánh giảm"
          },
          {
            symbol: "Su, Sd",
            name: "Giá cổ phiếu ở nhánh tăng và nhánh giảm"
          }
        ]
      },
      {
        type: "heading",
        text: "Quyền thực hiện sớm"
      },
      {
        type: "paragraph",
        text: "Với quyền chọn kiểu Mỹ, ở mỗi nút ta so hai con số: giá trị nếu thực hiện ngay tại đó, và giá trị nếu giữ tiếp. Lấy con số lớn hơn rồi tính ngược về gốc. Cấu trúc nút là thứ khiến phép so sánh này khả thi - và là lý do công thức đóng bó tay."
      },
      {
        type: "callout",
        label: "Xác suất trung tính rủi ro, không phải xác suất thật",
        text: "Khi tính ngược qua cây, trọng số dùng cho hai nhánh là xác suất trung tính rủi ro - đại lượng suy ra từ lãi suất phi rủi ro và biên độ hai nhánh, không phải từ niềm tin của ai về khả năng cổ phiếu tăng."
      },
      {
        type: "heading",
        text: "Hai bước, và con số hiện ra"
      },
      {
        type: "paragraph",
        text: "Giữ nguyên bộ số của bài trước: giá 100, mỗi bước lên 20% hoặc xuống 10%, lãi suất phi rủi ro 5% mỗi kỳ, nên xác suất trung hoà rủi ro vẫn là π = 0,5. Sau hai bước, giá có thể là 144, 108 hoặc 81. Quyền chọn mua giá thực hiện 100 trả lần lượt 44, 8 và 0. Lùi ngược từng nút: ở nhánh trên, giá trị là (0,5×44 + 0,5×8)/1,05 = 24,76; ở nhánh dưới, (0,5×8 + 0,5×0)/1,05 = 3,81. Lùi thêm một bước về gốc: (0,5×24,76 + 0,5×3,81)/1,05 = 13,61. Toàn bộ phương pháp chỉ là lặp lại một phép tính duy nhất từ phải sang trái."
      },
      {
        type: "heading",
        text: "Thứ mà công thức đóng không làm được"
      },
      {
        type: "paragraph",
        text: "Cây trở nên cần thiết khi quyền chọn cho phép thực hiện sớm. Xét quyền chọn BÁN giá thực hiện 100 trên cùng cây đó. Ở nút giá 90 sau bước một, giá trị nếu tiếp tục nắm giữ là (0,5×0 + 0,5×19)/1,05 = 9,05. Nhưng thực hiện ngay tại đó thu được 100 − 90 = 10. Với quyền chọn kiểu Mỹ, người nắm giữ chọn 10 - và con số 10 đó được mang ngược về gốc thay cho 9,05."
      },
      {
        type: "callout",
        label: "Chênh lệch 0,45 chính là quyền thực hiện sớm",
        text: "Tính tiếp về gốc: quyền chọn bán kiểu Âu định giá 4,31, kiểu Mỹ định giá 4,76. Khoảng cách 0,45 là giá của quyền được chọn thời điểm - thứ mà Black-Scholes không định giá được vì nó giả định chỉ thực hiện tại đáo hạn. Đây là lý do thực tiễn khiến cây nhị thức không bị công thức đóng thay thế: mọi hợp đồng có quyền chọn kiểu Mỹ, quyền mua lại trước hạn, hay bất kỳ quyết định nào ở giữa đường đều cần một mô hình đi từng bước. Và điều kiện để nó chạy đúng chỉ có một - ở mỗi nút, so giá trị nắm giữ tiếp với giá trị thực hiện ngay, rồi lấy số lớn hơn."
      },
      {
        type: "closing",
        lines: [
          "Một cây hai nhánh chứa đủ toàn bộ ý tưởng của định giá phái sinh hiện đại.",
          "Bài tiếp theo: chuyện gì xảy ra khi cho số bước tiến ra vô cùng."
        ]
      }
    ]
  },
  {
    id: 1639,
    slug: "frm-black-scholes-gia-dinh-va-gioi-han",
    title: "FRM Valuation, Bài 3: Black-Scholes-Merton - giả định và giới hạn",
    subtitle: "Công thức nổi tiếng nhất tài chính, và năm giả định mà thị trường thật vi phạm hằng ngày",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📐",
    track: "professional",
    whyItMatters: "FRM không kiểm tra bạn có nhớ công thức không - nó kiểm tra bạn có biết công thức sai ở đâu không. Mọi thất bại phái sinh lớn đều là một giả định của mô hình này gãy trong thực tế.",
    openingQuestion: "Đầu vào nào của Black-Scholes không quan sát trực tiếp được trên thị trường?",
    openingOptions: [
      "Độ biến động tài sản cơ sở trong kỳ còn lại",
      "Giá thực hiện ghi trong hợp đồng quyền chọn",
      "Thời gian còn lại tính tới ngày đáo hạn",
      "Giá hiện tại của tài sản cơ sở trên thị trường"
    ],
    correctOption: 0,
    explanation: "Black-Scholes cần năm đầu vào, trong đó bốn cái đọc thẳng từ hợp đồng và bảng giá: giá tài sản, giá thực hiện, thời gian còn lại, lãi suất phi rủi ro. Riêng độ biến động tương lai thì không ai biết. Đó là lý do trong thực tế người ta chạy ngược công thức - lấy giá thị trường của quyền chọn để suy ra biến động hàm ý. Mô hình vì vậy được dùng như một hàm chuyển đổi giữa giá và biến động, chứ không phải như một máy tính giá đúng.",
    diagram: [
      {
        label: "Năm đầu vào: giá cơ sở, giá thực hiện, thời gian, lãi suất, biến động",
        arrow: true
      },
      {
        label: "Bốn đầu đầu quan sát được; biến động thì không",
        arrow: true
      },
      {
        label: "Thực tế: chạy ngược từ giá thị trường ra biến động hàm ý",
        arrow: true
      },
      {
        label: "Biến động hàm ý khác nhau theo giá thực hiện → nụ cười biến động"
      }
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Nụ cười biến động: bằng chứng thị trường không tin mô hình",
      description: "Nếu Black-Scholes mô tả đúng thế giới, mọi quyền chọn trên cùng một cổ phiếu với cùng ngày đáo hạn phải cho ra một con số biến động hàm ý duy nhất. Thực tế các quyền chọn ở xa giá luôn hàm ý biến động cao hơn - thị trường đang tự tay cộng thêm phần bù cho khả năng biến cố cực đoan mà giả định phân phối chuẩn của mô hình gán xác suất gần bằng 0. Nụ cười đó là mô hình bị thị trường sửa lưng."
    },
    quiz: [
      {
        question: "Giả định nào của Black-Scholes bị thực tế thị trường vi phạm rõ nhất?",
        options: [
          "Lợi suất phân phối chuẩn, biến động không đổi",
          "Quyền chọn chỉ thực hiện đúng ngày đáo hạn",
          "Giá thực hiện được ghi cố định trong hợp đồng ngay từ lúc ký kết",
          "Tài sản cơ sở có thể mua bán được trên một thị trường có tổ chức"
        ],
        correct: 0,
        explanation: "Lợi suất tài chính có đuôi dày hơn phân phối chuẩn nhiều bậc, và biến động thì dồn cụm chứ không phải hằng số. Hai giả định này gãy hằng ngày, và nụ cười biến động chính là dấu vết mà thị trường để lại."
      },
      {
        question: "Biến động hàm ý được hiểu đúng nhất là gì?",
        options: [
          "Mức biến động khiến công thức khớp giá thị trường",
          "Độ lệch chuẩn lợi suất đo từ dữ liệu lịch sử",
          "Mức biến động tối đa cơ quan quản lý cho phép",
          "Chênh lệch giá mua và giá bán quyền chọn"
        ],
        correct: 0,
        explanation: "Nó là đầu ra của phép chạy ngược, nên nó phản ánh niềm tin của thị trường chứ không phải một đại lượng đo được. Đây cũng là lý do nó được coi là thước đo nỗi sợ của thị trường."
      },
      {
        question: "Vì sao giả định phòng hộ liên tục là điểm yếu thực tế của mô hình?",
        options: [
          "Vì phòng hộ thật là rời rạc và tốn phí",
          "Vì quy định giới hạn số lần chỉnh",
          "Vì tài sản cơ sở không luôn sẵn có",
          "Vì phải nắm toàn bộ cổ phiếu lưu hành"
        ],
        correct: 0,
        explanation: "Lập luận dẫn ra công thức giả định danh mục sao chép được chỉnh lại liên tục và miễn phí. Trong thực tế mỗi lần chỉnh đều mất phí và chỉ xảy ra rời rạc, nên vị thế phòng hộ luôn lệch một chút - và lệch nhiều nhất đúng lúc thị trường nhảy."
      }
    ,
    {
      "question": "Vì sao mô hình Black-Scholes vẫn được dùng rộng rãi dù các giả định của nó bị vi phạm?",
      "options": [
        "Vì nó là ngôn ngữ chung để quy giá quyền chọn về một con số biến động so sánh được",
        "Vì mọi mô hình thay thế đều cho kết quả sai lệch nhiều hơn trong mọi trường hợp",
        "Vì giả định của nó chỉ bị vi phạm với quyền chọn có kỳ hạn trên một năm",
        "Vì cơ quan quản lý yêu cầu dùng mô hình này khi báo cáo giá trị quyền chọn"
      ],
      "correct": 0,
      "explanation": "Thị trường không thực sự tin mô hình đúng - họ dùng nó như một hàm chuyển đổi giữa giá và biến động hàm ý. Chính vì thế nụ cười biến động tồn tại: nó là dấu vết của việc thị trường đang bù lại cho phần mô hình sai."
    },
    {
      "question": "Giả định phân phối chuẩn của lợi suất gây sai lệch theo hướng nào?",
      "options": [
        "Đánh giá thấp xác suất các cú dịch chuyển cực đoan, nên quyền chọn xa giá bị định giá thấp",
        "Đánh giá quá cao xác suất của các cú dịch chuyển cực đoan, nên quyền chọn xa giá bị định giá cao",
        "Không gây sai lệch có hệ thống, vì sai số hai chiều triệt tiêu lẫn nhau",
        "Chỉ gây sai lệch với quyền chọn bán, không ảnh hưởng tới quyền chọn mua"
      ],
      "correct": 0,
      "explanation": "Lợi suất thật có đuôi dày hơn phân phối chuẩn, nên cú sốc cực đoan xảy ra thường xuyên hơn mức mô hình dự báo. Sai lệch này có hệ thống và lệch về một phía - đó là lý do nó nguy hiểm hơn một sai số ngẫu nhiên."
    }
    ],
    practicePrompt: {
      question:
        "Trên cùng một cổ phiếu và cùng ngày đáo hạn, quyền chọn giá thực hiện thấp có biến động hàm ý 34%, còn giá thực hiện cao có 22%. Điều này nói lên gì?",
      options: [
        "Thị trường định giá đuôi trái dày hơn phân phối chuẩn",
        "Có cơ hội kinh doanh chênh lệch giữa hai quyền chọn này",
        "Một trong hai quyền chọn đang bị định giá sai rõ rệt",
        "Biến động thật của cổ phiếu sẽ nằm giữa 22% và 34%",
      ],
      correct: 0,
      explanation:
        "Black-Scholes giả định một độ biến động duy nhất cho mọi giá thực hiện, nên nếu giả định đó đúng thì đường biến động hàm ý phải phẳng. Nó không phẳng, và độ dốc nghiêng về phía giá thực hiện thấp nói rằng thị trường trả thêm tiền cho bảo hiểm chống sụt giá - tức tin rằng một cú giảm mạnh xảy ra thường xuyên hơn phân phối chuẩn cho phép. Đó là một tuyên bố về phân phối, không phải một sai lệch định giá, nên không có chênh lệch nào để kiếm. Và biến động hàm ý là giá quy đổi ra một đơn vị so sánh được, không phải dự báo về biến động thật sẽ xảy ra.",
    },
    keyTakeaways: [
      "Bốn đầu vào quan sát được, riêng độ biến động tương lai thì không",
      "Thực tế chạy ngược công thức để ra biến động hàm ý từ giá thị trường",
      "Nụ cười biến động là bằng chứng giả định phân phối chuẩn không đúng",
      "Phòng hộ thật là rời rạc và tốn phí, để lại sai số mà mô hình bỏ qua"
    ],
    summary: {
      keyIdea: "Giá trị của Black-Scholes ngày nay nằm ở chỗ nó là ngôn ngữ chung để quy đổi giá thành biến động hàm ý, không phải ở chỗ nó cho giá đúng",
      commonMistake: "Coi biến động hàm ý là dự báo biến động tương lai, trong khi nó còn chứa cả phần bù rủi ro của người bán quyền chọn",
      action: "Khi dùng bất kỳ mô hình định giá nào, liệt kê trước các giả định rồi hỏi giả định nào yếu nhất trong tình huống này"
    },
    application: {
      title: "Nhìn nụ cười biến động",
      message: "Nếu tiếp cận được bảng giá quyền chọn, thử lấy biến động hàm ý ở vài mức giá thực hiện khác nhau cùng ngày đáo hạn. Đường nối chúng lại gần như không bao giờ nằm ngang.",
      secondary: "Độ cong của đường đó cho biết thị trường đang sợ chiều nào hơn."
    },
    sections: [
      {
        type: "lead",
        text: "Black-Scholes là mô hình sai nổi tiếng nhất trong tài chính, và vẫn được cả ngành dùng mỗi ngày. Hiểu vì sao cả hai điều đó cùng đúng là nội dung thật của bài này."
      },
      {
        type: "heading",
        text: "Năm đầu vào"
      },
      {
        type: "list",
        items: [
          "Giá tài sản cơ sở hiện tại - đọc từ bảng giá",
          "Giá thực hiện - ghi trong hợp đồng",
          "Thời gian còn lại - đếm lịch",
          "Lãi suất phi rủi ro - quan sát trên thị trường",
          "Độ biến động trong quãng thời gian còn lại - không ai biết"
        ]
      },
      {
        type: "heading",
        text: "Vì sao ngành vẫn dùng một mô hình sai"
      },
      {
        type: "paragraph",
        text: "Vì nó trở thành ngôn ngữ quy đổi. Thay vì tranh luận giá quyền chọn bằng tiền, người ta nói bằng biến động hàm ý - và con số đó so sánh được giữa các kỳ hạn, các giá thực hiện, các tài sản. Mô hình sai nhưng là một cái thước nhất quán, và một cái thước nhất quán vẫn rất hữu ích."
      },
      {
        type: "callout",
        label: "Giả định gãy đầu tiên khi thị trường sụp",
        text: "Mô hình giả định giá đi liên tục, không nhảy. Đúng vào những ngày quan trọng nhất - tin bất ngờ, mở cửa sau cú sốc qua đêm - giá nhảy một bước lớn, danh mục phòng hộ không kịp chỉnh, và sai số phòng hộ bùng ra đúng lúc nó đắt nhất."
      },
      {
        type: "conceptTable",
        title: "Năm giả định, và thị trường vi phạm chúng ra sao",
        subtitle: "Không giả định nào đúng; câu hỏi là sai theo hướng nào và bao nhiêu",
        concepts: [
          {
            vi: "Biến động không đổi",
            en: "Constant volatility",
            def: "Vi phạm rõ nhất và đo được: nếu đúng, biến động hàm ý phải bằng nhau ở mọi giá thực hiện. Thực tế nó vẽ thành nụ cười - quyền chọn xa tiền đắt hơn mô hình. Chính nụ cười đó là bằng chứng thị trường không tin giả định này."
          },
          {
            vi: "Giá đi liên tục, không nhảy",
            en: "Continuous paths",
            def: "Vỡ đúng vào những ngày quan trọng nhất: công bố kết quả, tin bất ngờ, mở cửa sau cú sốc qua đêm. Mô hình cho rằng phòng hộ động luôn kịp; một cú nhảy qua đêm là chỗ nó không kịp."
          },
          {
            vi: "Vay và cho vay cùng một lãi suất phi rủi ro",
            en: "Single risk-free rate",
            def: "Không ai vay được ở lãi suất kho bạc. Chênh lệch này nhỏ với quyền chọn ngắn hạn, lớn dần theo kỳ hạn."
          },
          {
            vi: "Không phí giao dịch, chia nhỏ vô hạn",
            en: "Frictionless markets",
            def: "Phòng hộ động cần giao dịch liên tục. Có phí thì càng phòng hộ dày càng tốn, nên trong thực tế người ta phòng hộ theo ngưỡng - và chấp nhận sai số."
          },
          {
            vi: "Lợi suất phân phối loga chuẩn",
            en: "Lognormal returns",
            def: "Đuôi thật dày hơn phân phối chuẩn. Những cú giảm mà mô hình coi là gần như không thể xảy ra vài lần trong một đời người."
          }
        ]
      },
      {
        type: "callout",
        label: "Vì sao một mô hình sai vẫn không bị thay",
        text: "Vì cả ngành đã đồng ý dùng nó làm đơn vị quy đổi. Không ai nói 'quyền chọn này giá 4,20 đô' rồi so với một quyền chọn khác giá 6,80 - hai con số đó không so được vì khác giá thực hiện, khác kỳ hạn. Nói 'biến động hàm ý 22% so với 28%' thì so được ngay. Công thức được dùng ngược: cắm giá thị trường vào, giải ra biến động. Ở chiều đó, tính đúng hay sai của giả định không còn quan trọng bằng việc mọi người dùng chung một cái thước."
      },
      {
        type: "closing",
        lines: [
          "Mô hình không cần đúng để hữu ích, nhưng người dùng cần biết nó sai ở đâu.",
          "Bài tiếp theo: các đạo hàm của công thức này - bộ Greeks."
        ]
      }
    ]
  },
  {
    id: 1640,
    slug: "frm-cac-greeks-delta-gamma-vega-theta",
    title: "FRM Valuation, Bài 4: Bộ Greeks - delta, gamma, vega, theta, rho",
    subtitle: "Năm câu hỏi \"nếu thứ này đổi thì vị thế của tôi đổi bao nhiêu\"",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔢",
    track: "professional",
    whyItMatters: "Không ai quản trị rủi ro quyền chọn bằng giá. Người ta quản bằng Greeks, vì chúng trả lời đúng câu hỏi thực tế: nếu thị trường nhích một chút theo hướng này thì tôi mất bao nhiêu.",
    openingQuestion: "Gamma của một vị thế quyền chọn đo lường điều gì?",
    openingOptions: [
      "Tốc độ thay đổi của delta khi giá tài sản cơ sở thay đổi",
      "Mức thay đổi giá quyền chọn khi độ biến động hàm ý tăng thêm một điểm phần trăm",
      "Phần giá trị quyền chọn mất đi sau mỗi ngày trôi qua",
      "Độ nhạy của giá quyền chọn trước thay đổi của lãi suất phi rủi ro"
    ],
    correctOption: 0,
    explanation: "Bộ Greeks tách rủi ro của một vị thế quyền chọn thành từng chiều riêng. Delta cho biết vị thế nhạy thế nào với giá tài sản cơ sở; gamma cho biết chính delta đó thay đổi nhanh ra sao khi giá dịch chuyển. Vega đo độ nhạy với biến động, theta đo phần giá trị mất đi theo thời gian, rho đo độ nhạy với lãi suất. Điểm quan trọng khi đọc chúng là các chiều này liên hệ với nhau: một vị thế thu theta đều đặn gần như luôn kèm gamma âm, tức là lỗ tăng nhanh khi thị trường động mạnh.",
    diagram: [
      {
        label: "Delta: đổi theo giá cơ sở",
        arrow: true
      },
      {
        label: "Gamma: delta đổi nhanh thế nào",
        arrow: true
      },
      {
        label: "Vega: đổi theo biến động hàm ý",
        arrow: true
      },
      {
        label: "Theta: đổi theo thời gian trôi · Rho: đổi theo lãi suất"
      }
    ],
    interactiveType: "payoff",
    realWorldExample: {
      company: "Vì sao bán quyền chọn được ví như nhặt tiền lẻ trước xe lu",
      description: "Vị thế bán quyền chọn có theta dương - mỗi ngày trôi qua là một khoản thu nhỏ đều đặn - nhưng gamma âm, nghĩa là mỗi cú dịch chuyển lớn của giá làm khoản lỗ tăng nhanh hơn tuyến tính. Chiến lược này cho chuỗi lợi nhuận đẹp trong thời gian dài rồi mất sạch trong một phiên. Bảng Greeks nhìn thấy trước cấu trúc đó, còn chuỗi lợi suất quá khứ thì không."
    },
    quiz: [
      {
        question: "Vega của một vị thế mua quyền chọn mang dấu gì và ý nghĩa ra sao?",
        options: [
          "Dương - vị thế có lãi khi biến động hàm ý tăng lên",
          "Âm - vị thế lỗ khi thị trường trở nên bất ổn hơn mức bình thường",
          "Bằng 0 - biến động không ảnh hưởng tới giá trị quyền chọn đã mua",
          "Dương với quyền chọn mua và âm với quyền chọn bán"
        ],
        correct: 0,
        explanation: "Cả quyền chọn mua lẫn quyền chọn bán đều đắt lên khi biến động tăng, vì cơ hội rơi vào vùng có lợi rộng ra. Người mua quyền chọn vì thế luôn có vega dương, bất kể là mua hay bán quyền."
      },
      {
        question: "Quan hệ giữa gamma và theta trong một vị thế quyền chọn thường là gì?",
        options: [
          "Ngược dấu nhau - gamma dương thường đi kèm theta âm và ngược lại",
          "Cùng dấu nhau, vì cả hai đều là đạo hàm bậc hai của giá quyền chọn",
          "Không có quan hệ nào, chúng đo hai đại lượng hoàn toàn độc lập",
          "Luôn bằng nhau về độ lớn nhưng khác nhau về đơn vị đo"
        ],
        correct: 0,
        explanation: "Đây là đánh đổi trung tâm của giao dịch quyền chọn: muốn hưởng lợi từ biến động lớn (gamma dương) thì phải trả bằng giá trị thời gian mất đi mỗi ngày (theta âm). Người bán quyền chọn nhận đánh đổi ngược lại."
      },
      {
        question: "Vì sao vị thế trung hoà delta vẫn có thể lỗ nặng?",
        options: [
          "Vì delta bằng 0 chỉ đúng tại một điểm giá, và gamma làm nó lệch ngay khi giá dịch",
          "Vì trung hoà delta chỉ có hiệu lực trong phiên giao dịch buổi sáng",
          "Vì phí giao dịch khi thiết lập vị thế luôn lớn hơn khoản lãi thu được",
          "Vì cơ quan quản lý không công nhận vị thế trung hoà delta là phòng hộ"
        ],
        correct: 0,
        explanation: "Trung hoà delta là ảnh chụp tại một mức giá. Gamma càng lớn thì bức ảnh đó càng nhanh lỗi thời, nên phòng hộ chỉ dựa vào delta sẽ vỡ đúng lúc giá chạy mạnh - lúc mà nó cần hoạt động nhất."
      }
    ,
    {
      "question": "Vì sao người bán quyền chọn thường có theta dương nhưng gamma âm?",
      "options": [
        "Vì họ thu giá trị thời gian mỗi ngày, đổi lại chịu lỗ tăng nhanh khi giá dịch chuyển mạnh",
        "Vì họ nhận toàn bộ phí quyền chọn ngay từ đầu nên mọi Greeks của họ đều mang dấu dương",
        "Vì theta và gamma luôn ngược dấu nhau ở mọi vị thế quyền chọn",
        "Vì vị thế bán quyền chọn không chịu ảnh hưởng của biến động ngầm định"
      ],
      "correct": 0,
      "explanation": "Đây là đánh đổi trung tâm của mọi vị thế quyền chọn: thu tiền đều đặn theo thời gian đi kèm rủi ro lỗ phi tuyến khi thị trường động mạnh. Hình dạng lợi nhuận đó - nhiều lãi nhỏ, thỉnh thoảng một lỗ rất lớn - làm mọi thước đo dựa trên độ lệch chuẩn đánh giá sai."
    },
    {
      "question": "Rho ít được chú ý hơn các Greeks khác trong điều kiện bình thường vì lý do gì?",
      "options": [
        "Vì lãi suất đổi chậm hơn nhiều so với giá tài sản cơ sở",
        "Vì rho chỉ áp dụng cho quyền chọn kiểu Mỹ chứ không áp dụng cho kiểu châu Âu",
        "Vì ảnh hưởng của lãi suất đã được tính vào delta của vị thế",
        "Vì rho luôn có giá trị rất nhỏ bất kể kỳ hạn của quyền chọn"
      ],
      "correct": 0,
      "explanation": "Trong một ngày, giá cơ sở có thể động vài phần trăm còn lãi suất gần như đứng yên - nên delta và gamma chi phối. Nhưng với quyền chọn kỳ hạn dài, hoặc trong giai đoạn ngân hàng trung ương đổi lãi suất nhanh, rho trở lại thành đại lượng đáng theo dõi."
    }
    ],
    practicePrompt: {
      question:
        "Một vị thế bán quyền chọn đã được trung hoà delta vào cuối phiên. Qua đêm cổ phiếu nhảy 12%. Vì sao vị thế vẫn lỗ nặng?",
      options: [
        "Gamma âm: delta lệch nhanh khi giá chạy xa điểm trung hoà",
        "Vega âm khiến vị thế lỗ khi biến động hàm ý giảm xuống",
        "Theta dương nên vị thế mất giá trị theo thời gian trôi",
        "Rho âm khiến lãi suất qua đêm ăn vào giá trị vị thế",
      ],
      correct: 0,
      explanation:
        "Trung hoà delta chỉ đúng TẠI MỘT ĐIỂM GIÁ, và gamma cho biết nó hỏng nhanh cỡ nào khi giá rời điểm đó. Người bán quyền chọn có gamma âm, nên giá chạy về phía nào thì delta cũng lệch về phía bất lợi, và cú nhảy càng lớn thì phần lỗ càng lớn theo bình phương chứ không theo tỷ lệ. Đó là mặt trái của theta dương: người bán được trả tiền cho thời gian trôi, và cái giá là họ chịu toàn bộ phần phi tuyến khi giá nhảy. Vega âm và theta dương trong ba phương án kia đều mô tả đúng dấu của một vị thế bán quyền, chỉ là không cái nào giải thích được khoản lỗ do một cú nhảy giá qua đêm.",
    },
    keyTakeaways: [
      "Delta đo độ nhạy với giá, gamma đo tốc độ thay đổi của chính delta",
      "Vega dương với mọi vị thế mua quyền chọn, cả mua lẫn bán quyền",
      "Gamma và theta thường ngược dấu - đó là đánh đổi cốt lõi của quyền chọn",
      "Trung hoà delta chỉ đúng tại một điểm giá; gamma quyết định nó lệch nhanh ra sao"
    ],
    summary: {
      keyIdea: "Greeks biến một vị thế phi tuyến thành một bảng các độ nhạy đọc được, và đó là cách duy nhất quản trị rủi ro quyền chọn trong thực tế",
      commonMistake: "Coi trung hoà delta là đã phòng hộ xong, bỏ qua gamma và vega",
      action: "Với mỗi vị thế quyền chọn, đọc gamma và vega trước khi đọc lãi lỗ - chúng cho biết rủi ro nằm ở đâu"
    },
    application: {
      title: "Đọc một bảng Greeks",
      message: "Nếu tài khoản chứng khoán của bạn có phái sinh, thử tìm bảng Greeks của một vị thế: dấu của gamma và theta cho biết bạn đang đứng ở phía nào của đánh đổi biến động - thời gian.",
      secondary: "Gamma âm cộng theta dương là cấu trúc đã làm nhiều tài khoản bốc hơi trong một phiên."
    },
    sections: [
      {
        type: "lead",
        text: "Giá của một quyền chọn là một con số. Rủi ro của nó cần năm con số, vì giá trị đó phản ứng phi tuyến với năm thứ khác nhau."
      },
      {
        type: "list",
        items: [
          "Delta: giá cơ sở đổi một đơn vị thì giá quyền chọn đổi bao nhiêu",
          "Gamma: delta đổi nhanh thế nào khi giá cơ sở dịch chuyển",
          "Vega: biến động hàm ý tăng một điểm thì giá quyền chọn đổi bao nhiêu",
          "Theta: một ngày trôi qua thì mất bao nhiêu giá trị thời gian",
          "Rho: lãi suất đổi thì giá quyền chọn đổi bao nhiêu"
        ]
      },
      {
        type: "heading",
        text: "Vì sao gamma là Greek đáng sợ nhất"
      },
      {
        type: "paragraph",
        text: "Delta cho ta một vị thế phòng hộ tại thời điểm này. Gamma cho biết vị thế đó hỏng nhanh ra sao. Gamma lớn nghĩa là mỗi bước giá đều đòi chỉnh lại phòng hộ, và mỗi lần chỉnh đều mất phí - nên gamma vừa là rủi ro vừa là chi phí."
      },
      {
        type: "comparison",
        left: {
          label: "Mua quyền chọn",
          text: "Gamma dương, theta âm. Trả tiền mỗi ngày để đổi lấy quyền hưởng lợi nếu giá chạy mạnh theo bất kỳ chiều nào."
        },
        right: {
          label: "Bán quyền chọn",
          text: "Gamma âm, theta dương. Thu tiền đều mỗi ngày, đổi lại gánh phần lỗ tăng nhanh hơn tuyến tính khi giá chạy mạnh."
        }
      },
      {
        type: "callout",
        label: "Greeks cộng được, giá thì khó",
        text: "Ưu điểm thực tế lớn nhất: delta của cả danh mục là tổng delta các vị thế, tương tự với gamma và vega. Nhờ vậy một bàn giao dịch nắm hàng nghìn hợp đồng vẫn tóm tắt được rủi ro thành vài con số theo dõi hằng ngày."
      },
      {
        type: "heading",
        text: "Một vị thế cụ thể, và điều gì xảy ra khi giá nhích 2 đồng"
      },
      {
        type: "paragraph",
        text: "Giả sử một quyền chọn mua có delta 0,50, gamma 0,05, vega 0,15, theta −0,02 mỗi ngày. Cổ phiếu tăng 2 đồng. Giá trị quyền chọn thay đổi xấp xỉ 0,50 × 2 + ½ × 0,05 × 2² = 1,00 + 0,10 = 1,10. Phần 1,00 là delta, phần 0,10 là gamma - và chính phần thứ hai giải thích vì sao ước lượng chỉ dùng delta luôn sai theo một hướng: nó bỏ sót độ cong. Quan trọng hơn, delta bây giờ không còn là 0,50 mà là 0,50 + 0,05 × 2 = 0,60."
      },
      {
        type: "callout",
        label: "Gamma là thứ biến phòng hộ thành một việc phải làm liên tục",
        text: "Nếu bạn đã bán 50 cổ phiếu để phòng hộ 100 quyền chọn ở delta 0,50, thì sau cú tăng 2 đồng bạn cần bán thêm 10 cổ phiếu nữa để về trạng thái trung hoà. Rồi giá lại đổi, rồi lại phải điều chỉnh. Đó là toàn bộ nội dung của phòng hộ động, và nó cũng cho thấy vì sao chi phí phòng hộ tăng theo gamma chứ không theo delta: delta cho biết bạn cần bao nhiêu cổ phiếu, gamma cho biết bạn phải thay đổi con số đó nhanh tới mức nào."
      },
      {
        type: "conceptTable",
        title: "Năm đạo hàm, năm câu hỏi khác nhau",
        subtitle: "Cùng một quyền chọn, nhưng mỗi Greek trả lời một loại rủi ro riêng",
        concepts: [
          {
            vi: "Delta",
            en: "Theo giá tài sản cơ sở",
            def: "Giá đổi 1 thì quyền chọn đổi bao nhiêu. Cũng xấp xỉ số cổ phiếu cần để phòng hộ, và xấp xỉ xác suất trung hoà rủi ro của việc kết thúc trong tiền."
          },
          {
            vi: "Gamma",
            en: "Theo chính delta",
            def: "Delta đổi nhanh thế nào. Lớn nhất khi giá quanh mức thực hiện và gần đáo hạn - đúng lúc phòng hộ khó nhất và tốn nhất."
          },
          {
            vi: "Vega",
            en: "Theo biến động",
            def: "Biến động hàm ý tăng 1 điểm phần trăm thì giá trị tăng 0,15 trong ví dụ trên. Đây là Greek duy nhất đo độ nhạy với một đại lượng không quan sát trực tiếp được."
          },
          {
            vi: "Theta",
            en: "Theo thời gian",
            def: "Mất 0,02 mỗi ngày chỉ vì thời gian trôi, kể cả khi không có gì xảy ra. Người bán quyền chọn thu khoản này, và đó là phần bù cho gamma âm mà họ đang gánh."
          },
          {
            vi: "Rho",
            en: "Theo lãi suất",
            def: "Nhỏ nhất trong năm với quyền chọn ngắn hạn, nên hay bị bỏ qua - nhưng lớn dần theo kỳ hạn và không bỏ qua được với hợp đồng nhiều năm."
          }
        ]
      },
      {
        type: "closing",
        lines: [
          "Quản trị rủi ro quyền chọn là quản trị các đạo hàm, không phải quản trị giá.",
          "Bài tiếp theo: bộ độ nhạy tương đương cho thế giới trái phiếu."
        ]
      }
    ]
  },
  {
    id: 1641,
    slug: "frm-dv01-duration-hieu-dung-convexity",
    title: "FRM Valuation, Bài 5: DV01, duration hiệu dụng và convexity",
    subtitle: "Delta và gamma của thế giới trái phiếu, chỉ khác tên gọi",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "professional",
    whyItMatters: "Bàn giao dịch trái phiếu không nói về duration bằng năm - họ nói bằng tiền: một điểm cơ bản lãi suất đổi thì danh mục mất bao nhiêu. DV01 là ngôn ngữ đó, và nó cộng được giữa các vị thế.",
    openingQuestion: "DV01 của một trái phiếu đo lường điều gì?",
    openingOptions: [
      "Mức thay đổi giá trị bằng tiền khi lợi suất đổi một điểm cơ bản",
      "Số năm bình quân có trọng số để nhận lại toàn bộ dòng tiền của trái phiếu",
      "Tỷ lệ phần trăm giá trái phiếu thay đổi khi lợi suất tăng một phần trăm",
      "Chênh lệch lợi suất giữa trái phiếu doanh nghiệp và trái phiếu chính phủ"
    ],
    correctOption: 0,
    explanation: "DV01 trả lời câu hỏi lãi suất tăng một điểm cơ bản thì danh mục mất bao nhiêu tiền. Nó đo bằng tiền chứ không bằng phần trăm hay năm, và đó chính là ưu điểm: hai vị thế rất khác nhau về kỳ hạn và mệnh giá vẫn cộng DV01 lại được để ra rủi ro lãi suất của cả danh mục. Duration đo cùng thứ nhưng theo tỷ lệ phần trăm, còn convexity mô tả phần phi tuyến mà duration bỏ sót - và phần đó chỉ đáng kể khi lãi suất dịch chuyển lớn.",
    diagram: [
      {
        label: "Duration: xấp xỉ bậc một, phần trăm giá đổi theo lợi suất",
        arrow: true
      },
      {
        label: "DV01: cùng ý tưởng nhưng quy ra tiền, nên cộng được",
        arrow: true
      },
      {
        label: "Convexity: bổ sung phần cong mà bậc một bỏ sót",
        arrow: true
      },
      {
        label: "Trái phiếu có quyền mua lại → phải dùng duration hiệu dụng"
      }
    ],
    interactiveType: "bond",
    realWorldExample: {
      company: "Vì sao duration hiệu dụng tồn tại",
      description: "Duration thường được tính từ chính dòng tiền hợp đồng của trái phiếu. Nhưng với trái phiếu có quyền mua lại trước hạn hay khoản vay có quyền trả trước, chính dòng tiền lại thay đổi theo lãi suất - lãi suất giảm thì tổ chức phát hành mua lại, dòng tiền biến mất. Duration hiệu dụng đo bằng cách dịch cả đường cong lên xuống rồi định giá lại, nên nó bắt được hiệu ứng đó; công thức dựa trên dòng tiền cố định thì không."
    },
    quiz: [
      {
        question: "Convexity dương mang lại lợi ích gì cho người nắm giữ trái phiếu?",
        options: [
          "Giá giảm ít hơn và tăng nhiều hơn so với mức duration dự báo",
          "Trái phiếu được trả lãi suất coupon cao hơn mức thị trường hiện hành",
          "Tổ chức phát hành không được phép mua lại trái phiếu trước hạn",
          "Giá trái phiếu không còn phụ thuộc vào biến động của lãi suất"
        ],
        correct: 0,
        explanation: "Quan hệ giá và lợi suất là một đường cong lồi, còn duration chỉ là tiếp tuyến của nó. Độ cong đó có lợi ở cả hai chiều, nên trái phiếu convexity cao thường phải trả giá bằng lợi suất thấp hơn."
      },
      {
        question: "Vì sao trái phiếu có quyền mua lại trước hạn có thể mang convexity âm?",
        options: [
          "Vì khi lãi suất giảm, khả năng bị mua lại tăng và giá bị chặn trên",
          "Vì loại trái phiếu này luôn có kỳ hạn ngắn hơn trái phiếu thông thường",
          "Vì tổ chức phát hành phải trả thêm phí bảo hiểm cho người nắm giữ",
          "Vì coupon của nó được điều chỉnh theo lãi suất thị trường mỗi kỳ"
        ],
        correct: 0,
        explanation: "Người nắm giữ đã bán một quyền chọn cho tổ chức phát hành. Quyền đó được thực hiện đúng lúc lãi suất giảm và trái phiếu lẽ ra tăng giá mạnh nhất - nên phần lợi bị cắt cụt, đường giá cong ngược lại."
      },
      {
        question: "Hạn chế chung của cả duration và convexity là gì?",
        options: [
          "Cả hai giả định đường cong lợi suất dịch chuyển song song ở mọi kỳ hạn",
          "Cả hai chỉ áp dụng được cho trái phiếu chính phủ, không cho doanh nghiệp",
          "Cả hai đòi hỏi trái phiếu phải còn kỳ hạn trên mười năm mới tính được",
          "Cả hai không tính được khi lợi suất thị trường mang giá trị âm"
        ],
        correct: 0,
        explanation: "Thực tế đường cong thường đổi độ dốc: đầu ngắn và đầu dài dịch chuyển khác nhau, có khi ngược chiều. Vì vậy danh mục lớn cần đo thêm độ nhạy theo từng vùng kỳ hạn, chứ một con số duration tổng là chưa đủ."
      }
    ,
    {
      "question": "Duration hiệu dụng khác duration Macaulay ở chỗ nào?",
      "options": [
        "Nó tính bằng cách định giá lại trái phiếu ở hai mức lãi suất, nên xử lý được quyền chọn kèm theo",
        "Nó đo bằng đơn vị tiền thay vì đo bằng đơn vị năm",
        "Nó chỉ áp dụng được cho trái phiếu không trả coupon nào trong suốt kỳ hạn nắm giữ, kể cả kỳ cuối",
        "Nó bỏ qua ảnh hưởng của coupon và chỉ tính tới ngày đáo hạn"
      ],
      "correct": 0,
      "explanation": "Với trái phiếu có quyền mua lại hay quyền bán lại, dòng tiền tương lai thay đổi theo lãi suất - nên công thức dựa trên dòng tiền cố định không dùng được. Cách duy nhất là dịch lãi suất lên xuống rồi định giá lại, và đó chính là duration hiệu dụng."
    },
    {
      "question": "Hạn chế chung của cả duration và convexity là gì?",
      "options": [
        "Chúng giả định đường cong dịch chuyển song song",
        "Chúng chỉ đúng với trái phiếu có kỳ hạn dưới mười năm",
        "Chúng không tính được cho danh mục có nhiều loại trái phiếu khác nhau",
        "Chúng đòi hỏi phải biết trước hướng thay đổi của lãi suất"
      ],
      "correct": 0,
      "explanation": "Đường cong hiếm khi dịch song song - phần lớn biến động thật là đổi độ dốc và độ cong. Đó là lý do người quản lý danh mục trái phiếu phải bổ sung đo lường theo từng điểm kỳ hạn thay vì chỉ nhìn một con số duration."
    }
    ],
    practicePrompt: {
      question:
        "Danh mục trái phiếu trị giá 500 tỷ có duration hiệu dụng 6,2. Lãi suất tăng 25 điểm cơ bản. Giá trị danh mục mất xấp xỉ bao nhiêu?",
      options: [
        "7,75 tỷ (= 500 × 6,2 × 0,25%)",
        "3,1 tỷ (= 500 × 6,2 × 0,1%)",
        "31 tỷ (= 500 × 6,2 × 1%)",
        "1,55 tỷ (= 500 × 6,2 × 0,05%)",
      ],
      correct: 0,
      explanation:
        "Duration hiệu dụng nhân giá trị danh mục nhân mức thay đổi lãi suất cho phần mất xấp xỉ: 500 × 6,2 × 0,0025 = 7,75 tỷ. Đây là xấp xỉ BẬC MỘT, tức nó coi quan hệ giá - lãi suất là đường thẳng. Với 25 điểm cơ bản thì sai số nhỏ; với một cú dịch 200 điểm thì convexity bắt đầu đáng kể, và nó luôn nghiêng về phía có lợi cho người nắm trái phiếu thường: giá giảm ít hơn con số duration dự báo khi lãi suất tăng, và tăng nhiều hơn khi lãi suất giảm. Cả hai con số đều giả định đường cong dịch song song, điều thực tế hiếm khi đúng.",
    },
    keyTakeaways: [
      "DV01 quy độ nhạy lãi suất ra tiền nên cộng được giữa các vị thế",
      "Convexity là phần cong mà xấp xỉ bậc một của duration bỏ sót",
      "Trái phiếu có quyền mua lại có thể mang convexity âm - phần lợi bị chặn trên",
      "Cả hai đều giả định đường cong dịch song song, điều thực tế hiếm khi đúng"
    ],
    summary: {
      keyIdea: "DV01 và convexity là delta và gamma của trái phiếu; hiểu chúng như một cặp thì cả hai thế giới phái sinh và thu nhập cố định dùng chung một khung tư duy",
      commonMistake: "Dùng duration tính từ dòng tiền hợp đồng cho trái phiếu có quyền mua lại, trong đó dòng tiền lại phụ thuộc vào lãi suất",
      action: "Với mỗi công cụ thu nhập cố định, hỏi trước: dòng tiền của nó có cố định không - nếu không thì phải dùng duration hiệu dụng"
    },
    application: {
      title: "Ước lượng nhanh bằng duration",
      message: "Danh mục trái phiếu duration 6 gặp lãi suất tăng 1 điểm phần trăm sẽ mất khoảng 6% giá trị. Đây là phép tính nhẩm dùng được ngay, chỉ cần nhớ nó là xấp xỉ và convexity sẽ làm khoản lỗ thật nhỏ hơn một chút.",
      secondary: "Với biến động lớn thì phần chênh giữa xấp xỉ và thực tế bắt đầu đáng kể."
    },
    sections: [
      {
        type: "lead",
        text: "Người làm quyền chọn nói delta và gamma. Người làm trái phiếu nói DV01 và convexity. Hai cặp từ mô tả cùng một thứ: độ nhạy bậc một và phần cong bậc hai."
      },
      {
        type: "formula",
        title: "Ước lượng hai bậc",
        equation: "% thay đổi giá ≈ − Duration × Δr + ½ × Convexity × (Δr)²",
        variables: [
          {
            symbol: "Δr",
            name: "Mức thay đổi của lợi suất"
          },
          {
            symbol: "Duration",
            name: "Độ nhạy bậc một"
          },
          {
            symbol: "Convexity",
            name: "Phần điều chỉnh bậc hai, luôn cộng thêm khi convexity dương"
          }
        ]
      },
      {
        type: "heading",
        text: "Vì sao bàn giao dịch thích DV01 hơn duration"
      },
      {
        type: "paragraph",
        text: "Duration là phần trăm, mà phần trăm của hai vị thế khác quy mô thì không cộng được. DV01 quy về tiền: mỗi vị thế đóng góp bao nhiêu đồng cho mỗi điểm cơ bản. Cộng lại là ra rủi ro lãi suất của cả danh mục, và trừ đi là ra khối lượng phòng hộ cần thiết."
      },
      {
        type: "heading",
        text: "Duration hiệu dụng cho dòng tiền không cố định"
      },
      {
        type: "paragraph",
        text: "Khi trái phiếu có quyền mua lại hoặc khoản vay có quyền trả trước, chính dòng tiền thay đổi theo lãi suất. Duration hiệu dụng không tính từ công thức dòng tiền mà đo bằng thực nghiệm: dịch cả đường cong lên và xuống một chút, định giá lại, rồi lấy chênh lệch."
      },
      {
        type: "callout",
        label: "Cả hai đều giả định dịch chuyển song song",
        text: "Đây là giới hạn chung ít được nhắc tới. Đường cong lợi suất thường xoay chứ không tịnh tiến - kỳ hạn ngắn và dài có thể đi ngược nhau. Với danh mục lớn, phải đo độ nhạy theo từng vùng kỳ hạn thay vì tin vào một con số duy nhất."
      },
      {
        type: "closing",
        lines: [
          "Một con số duration cho cả danh mục là tiện, và tiện thì luôn có giá của nó.",
          "Bài tiếp theo: xếp hạng tín nhiệm - đầu vào của mọi mô hình rủi ro tín dụng."
        ]
      }
    ]
  },
  {
    id: 1642,
    slug: "frm-xep-hang-tin-nhiem-noi-bo-va-ben-ngoai",
    title: "FRM Valuation, Bài 6: Xếp hạng tín nhiệm nội bộ, bên ngoài và rủi ro quốc gia",
    subtitle: "Ba chữ cái đứng sau hàng nghìn tỷ đồng quyết định cho vay - và điều chúng không nói",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔤",
    track: "professional",
    whyItMatters: "Xếp hạng tín nhiệm là đầu vào của mô hình vốn, giới hạn đầu tư của quỹ và điều khoản hợp đồng vay. Một chữ cái sai lan ra khắp hệ thống, và khủng hoảng 2008 là ví dụ đắt nhất về điều đó.",
    openingQuestion: "Xếp hạng tín nhiệm bên ngoài đo lường điều gì?",
    openingOptions: [
      "Khả năng tương đối tổ chức phát hành không trả được nợ đúng hạn",
      "Mức lợi nhuận kỳ vọng mà nhà đầu tư sẽ nhận được khi nắm giữ trái phiếu",
      "Giá trị thị trường hợp lý của trái phiếu do tổ chức đó phát hành",
      "Mức độ thanh khoản của trái phiếu trên thị trường thứ cấp"
    ],
    correctOption: 0,
    explanation: "Xếp hạng tín nhiệm là thước đo thứ hạng chứ không phải xác suất tuyệt đối: nó nói tổ chức này an toàn hơn tổ chức kia, không nói xác suất vỡ nợ là bao nhiêu phần trăm. Nó cũng không nói gì về giá hợp lý hay thanh khoản - hai thứ nhà đầu tư hay gán nhầm cho nó. Xếp hạng nội bộ khác ở chỗ nó được hiệu chỉnh trên chính danh mục của tổ chức và cập nhật nhanh hơn, nhưng đổi lại không so sánh được với bên ngoài và chịu áp lực từ bộ phận kinh doanh.",
    diagram: [
      {
        label: "Xếp hạng bên ngoài: thứ hạng tương đối, do tổ chức xếp hạng công bố",
        arrow: true
      },
      {
        label: "Xếp hạng nội bộ: ngân hàng tự chấm, gắn với PD ước lượng riêng",
        arrow: true
      },
      {
        label: "Trần quốc gia: hạn chế mức xếp hạng của doanh nghiệp trong nước",
        arrow: true
      },
      {
        label: "Cả ba đều là đầu vào của mô hình vốn và giới hạn đầu tư"
      }
    ],
    realWorldExample: {
      company: "Xung đột lợi ích trong mô hình bên phát hành trả phí",
      description: "Tổ chức xếp hạng được trả tiền bởi chính bên phát hành mà họ đánh giá - một xung đột lợi ích rất thẳng thắn, vì tổ chức xếp hạng có động cơ giữ khách. Cộng với việc mô hình đánh giá sản phẩm tài chính cấu trúc dựa trên giả định tương quan vỡ nợ quá thấp, kết quả là hàng loạt xếp hạng AAA sụp đổ trong khủng hoảng 2008. Từ đó, quy định ở nhiều nước siết lại việc phụ thuộc máy móc vào xếp hạng bên ngoài."
    },
    quiz: [
      {
        question: "Trần quốc gia trong xếp hạng tín nhiệm nghĩa là gì?",
        options: [
          "Doanh nghiệp thường không được xếp cao hơn chính quốc gia nơi nó hoạt động",
          "Mỗi quốc gia chỉ được phép có một số lượng doanh nghiệp hạng AAA nhất định",
          "Tổ chức xếp hạng phải được cấp phép riêng tại từng quốc gia mới được hoạt động",
          "Trái phiếu chính phủ luôn có lợi suất thấp hơn trái phiếu doanh nghiệp cùng kỳ hạn"
        ],
        correct: 0,
        explanation: "Lập luận là doanh nghiệp chịu chung rủi ro của môi trường nơi nó hoạt động - kiểm soát vốn, khủng hoảng tiền tệ, can thiệp chính sách. Nguyên tắc này có ngoại lệ, nhưng nó giải thích vì sao doanh nghiệp rất mạnh ở thị trường mới nổi vẫn bị chặn trần."
      },
      {
        question: "Xếp hạng nội bộ khác xếp hạng bên ngoài ở điểm nào quan trọng nhất?",
        options: [
          "Xếp hạng nội bộ thường gắn với một xác suất vỡ nợ ước lượng cụ thể",
          "Xếp hạng nội bộ chỉ áp dụng cho khách hàng cá nhân, không cho doanh nghiệp",
          "Xếp hạng nội bộ được công bố công khai cho toàn bộ thị trường tham khảo",
          "Xếp hạng nội bộ không cần được cơ quan quản lý kiểm định hay phê duyệt"
        ],
        correct: 0,
        explanation: "Ngân hàng cần một con số để đưa vào mô hình vốn, nên hệ thống nội bộ phải ánh xạ từng hạng sang một PD ước lượng. Xếp hạng bên ngoài thì cố ý giữ tính thứ hạng và không cam kết một xác suất cụ thể."
      },
      {
        question: "Vì sao dựa hoàn toàn vào xếp hạng bên ngoài là rủi ro với một định chế?",
        options: [
          "Vì xếp hạng phản ứng chậm và nhiều bên cùng bị buộc bán khi bị hạ hạng",
          "Vì các tổ chức xếp hạng không được phép đánh giá trái phiếu doanh nghiệp",
          "Vì xếp hạng chỉ có giá trị trong vòng ba mươi ngày kể từ ngày công bố",
          "Vì mọi tổ chức xếp hạng đều sử dụng chung một mô hình đánh giá duy nhất"
        ],
        correct: 0,
        explanation: "Hạ hạng thường tới sau khi thị trường đã định giá lại. Tệ hơn, nhiều quỹ có điều khoản buộc bán khi tài sản rơi khỏi hạng đầu tư, nên một lần hạ hạng kích hoạt làn sóng bán đồng loạt - rủi ro biến thành rủi ro hệ thống."
      }
    ,
    {
      "question": "Vì sao dựa hoàn toàn vào xếp hạng bên ngoài là rủi ro với một định chế?",
      "options": [
        "Vì xếp hạng phản ứng chậm và nhiều bên cùng bán khi nó bị hạ",
        "Vì tổ chức xếp hạng không chịu trách nhiệm pháp lý",
        "Vì xếp hạng bên ngoài không có sẵn cho phần lớn doanh nghiệp niêm yết",
        "Vì phí trả cho tổ chức xếp hạng thường cao hơn chi phí xây mô hình nội bộ"
      ],
      "correct": 0,
      "explanation": "Xếp hạng thường đổi sau khi thị trường đã đổi, nên nó ít giá trị cảnh báo sớm. Tệ hơn, vì nhiều điều lệ quỹ gắn với ngưỡng xếp hạng, một lần hạ bậc kích hoạt bán tháo đồng loạt - biến đánh giá thành một cú sốc thanh khoản."
    },
    {
      "question": "Trần quốc gia trong xếp hạng tín nhiệm nghĩa là gì?",
      "options": [
        "Doanh nghiệp thường không được xếp cao hơn xếp hạng của chính quốc gia đó",
        "Mỗi quốc gia chỉ được cấp một số lượng xếp hạng bậc cao nhất định",
        "Xếp hạng quốc gia là mức trần của lãi suất mà doanh nghiệp trong nước phải trả",
        "Doanh nghiệp nước ngoài không được xếp hạng cao hơn doanh nghiệp trong nước"
      ],
      "correct": 0,
      "explanation": "Lập luận đằng sau là rủi ro chuyển đổi và chuyển tiền: chính phủ gặp khó có thể hạn chế chuyển ngoại tệ ra ngoài, và khi đó doanh nghiệp khoẻ mạnh vẫn không trả được nợ ngoại tệ. Có ngoại lệ, nhưng phải chứng minh nguồn thu nằm ngoài lãnh thổ."
    }
    ],
    practicePrompt: {
      question:
        "Một doanh nghiệp có các chỉ số tài chính tương đương mức A, nhưng quốc gia của nó đang được xếp hạng BB. Xếp hạng ngoại tệ của doanh nghiệp thường sẽ ra sao?",
      options: [
        "Bị chặn quanh mức BB vì trần quốc gia áp lên",
        "Vẫn là A, vì xếp hạng đo chính doanh nghiệp",
        "Trung bình cộng của A và BB, tức khoảng BBB",
        "Cao hơn A, vì doanh nghiệp mạnh hơn quốc gia",
      ],
      correct: 0,
      explanation:
        "Trần quốc gia phản ánh một rủi ro mà bảng cân đối của doanh nghiệp không nói gì được: khi một quốc gia gặp khủng hoảng ngoại tệ, chính phủ có thể hạn chế chuyển đổi hoặc chuyển tiền ra nước ngoài, và khi đó một doanh nghiệp hoàn toàn khoẻ mạnh vẫn không trả được nợ ngoại tệ đúng hạn. Đó là lý do trần áp lên xếp hạng NGOẠI TỆ chứ không phải xếp hạng nội tệ. Vẫn có ngoại lệ vượt trần - doanh nghiệp có nguồn thu ngoại tệ nằm ngoài nước hoặc có bảo lãnh từ công ty mẹ nước ngoài - nhưng đó là ngoại lệ phải chứng minh, không phải mặc định.",
    },
    keyTakeaways: [
      "Xếp hạng bên ngoài là thứ hạng tương đối, không phải xác suất vỡ nợ tuyệt đối",
      "Xếp hạng nội bộ phải ánh xạ sang PD cụ thể để đưa vào mô hình vốn",
      "Trần quốc gia thường chặn mức xếp hạng của doanh nghiệp trong nước",
      "Phụ thuộc máy móc vào xếp hạng tạo ra làn sóng bán đồng loạt khi bị hạ hạng"
    ],
    summary: {
      keyIdea: "Xếp hạng là một ý kiến có cấu trúc về thứ hạng rủi ro, không phải một phép đo, và mô hình phí do bên phát hành trả khiến ý kiến đó có xung đột lợi ích ngay trong thiết kế",
      commonMistake: "Đọc xếp hạng như xác suất vỡ nợ, hoặc như đánh giá về giá trị đầu tư của trái phiếu",
      action: "Khi thấy một xếp hạng, hỏi thêm: ai trả tiền cho đánh giá này, và nó đã được cập nhật lần cuối khi nào"
    },
    application: {
      title: "Đọc một bản xếp hạng",
      message: "Khi gặp xếp hạng của một tổ chức phát hành, tìm thêm hai thứ: triển vọng kèm theo (tích cực, ổn định, tiêu cực) và ngày cập nhật gần nhất. Chữ cái nói hiện trạng, triển vọng mới nói chiều đang đi.",
      secondary: "Một hạng cao kèm triển vọng tiêu cực nói nhiều hơn bản thân chữ cái."
    },
    sections: [
      {
        type: "lead",
        text: "Ba chữ cái quyết định một doanh nghiệp vay được với lãi suất nào, quỹ nào được phép nắm trái phiếu của họ, và ngân hàng phải giữ bao nhiêu vốn cho khoản cho vay đó."
      },
      {
        type: "comparison",
        left: {
          label: "Xếp hạng bên ngoài",
          text: "Do tổ chức xếp hạng công bố, mang tính thứ hạng tương đối. Không cam kết một xác suất vỡ nợ cụ thể và cố ý giữ tính ổn định qua chu kỳ."
        },
        right: {
          label: "Xếp hạng nội bộ",
          text: "Ngân hàng tự chấm, phải ánh xạ sang PD cụ thể để đưa vào mô hình vốn, và chịu kiểm định của cơ quan quản lý."
        }
      },
      {
        type: "heading",
        text: "Trần quốc gia"
      },
      {
        type: "paragraph",
        text: "Doanh nghiệp thường không được xếp hạng cao hơn quốc gia nơi nó hoạt động, vì nó chịu chung các rủi ro của môi trường đó: kiểm soát vốn, khủng hoảng tiền tệ, thay đổi chính sách đột ngột. Nguyên tắc này có ngoại lệ nhưng nó giải thích vì sao một doanh nghiệp rất mạnh ở thị trường mới nổi vẫn bị chặn trần."
      },
      {
        type: "callout",
        label: "Vì sao phụ thuộc vào xếp hạng lại nguy hiểm ở cấp hệ thống",
        text: "Nhiều quỹ có điều khoản buộc bán khi tài sản rơi khỏi hạng đầu tư. Một lần hạ hạng vì thế không chỉ là thông tin - nó là mệnh lệnh bán đồng thời cho rất nhiều bên, và làn sóng bán đó tự tạo ra chính cú sụt giá mà xếp hạng vừa cảnh báo."
      },
      {
        type: "heading",
        text: "Hai loại xếp hạng trả lời hai câu hỏi khác nhau"
      },
      {
        type: "comparison",
        left: {
          label: "Xếp hạng bên ngoài - xuyên chu kỳ",
          text: "Cố ý giữ ổn định qua chu kỳ kinh tế: một doanh nghiệp không bị hạ hạng chỉ vì quý này khó khăn. Ưu điểm là nó không tạo ra biến động giả; nhược điểm là nó phản ứng chậm, và khi nó phản ứng thì thường đã muộn."
        },
        right: {
          label: "Xếp hạng nội bộ - tại thời điểm",
          text: "Ước lượng xác suất vỡ nợ trong 12 tháng tới theo điều kiện hiện tại, nên nó nhạy và dịch chuyển theo chu kỳ. Đây là loại mà chuẩn mực kế toán về tổn thất tín dụng dự kiến cần tới, và cũng là loại làm trích lập dự phòng biến động mạnh theo chu kỳ."
        }
      },
      {
        type: "callout",
        label: "Vách đứng hạng đầu tư",
        text: "Rất nhiều quỹ có điều khoản buộc bán khi tài sản rơi khỏi nhóm hạng đầu tư. Một bậc hạ hạng qua đúng ranh giới đó vì thế không chỉ là thay đổi một ý kiến - nó kích hoạt một làn bán cưỡng bức từ nhiều bên cùng lúc, đẩy giá xuống, làm chi phí vay của doanh nghiệp tăng, và khiến chính rủi ro tín dụng vừa được đánh giá trở nên tệ hơn. Đây là chỗ việc phụ thuộc vào xếp hạng biến một ý kiến thành một cơ chế khuếch đại ở cấp hệ thống, và là lý do các quy định sau 2008 tìm cách giảm dần việc viện dẫn xếp hạng thẳng vào điều khoản."
      },
      {
        type: "paragraph",
        text: "Trần quốc gia là ràng buộc ít được để ý nhưng có sức nặng lớn: một doanh nghiệp thường không được xếp hạng cao hơn quốc gia nơi nó hoạt động, vì nó chịu chung rủi ro kiểm soát vốn, rủi ro chuyển đổi ngoại tệ và rủi ro can thiệp chính sách. Nghĩa là một công ty vận hành xuất sắc, dòng tiền mạnh, nợ thấp, vẫn có thể bị chặn trần bởi một yếu tố hoàn toàn nằm ngoài tầm kiểm soát của ban lãnh đạo - và khi quốc gia bị hạ hạng, cả nhóm doanh nghiệp trong nước bị hạ theo cùng lúc."
      },
      {
        type: "closing",
        lines: [
          "Xếp hạng là ý kiến của người được bên được đánh giá trả tiền - hữu ích, nhưng phải đọc kèm điều đó.",
          "Đây là bài cuối của phần Valuation and Risk Models mở rộng."
        ]
      }
    ]
  },
  {
    id: 1643,
    slug: "frm-ai-machine-learning-trong-quan-tri-rui-ro",
    title: "FRM Current Issues, Bài 4: AI và học máy trong quản trị rủi ro",
    subtitle: "Mô hình dự báo tốt hơn, giải thích kém hơn - và cơ quan quản lý đòi cả hai",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🤖",
    track: "professional",
    whyItMatters: "Học máy đã vào chấm điểm tín dụng, phát hiện gian lận và giám sát giao dịch. Nhưng quản trị rủi ro có một ràng buộc mà nhiều lĩnh vực khác không có: quyết định phải giải thích được cho khách hàng và cho cơ quan quản lý.",
    openingQuestion: "Đánh đổi cốt lõi khi đưa mô hình học máy vào quyết định tín dụng là gì?",
    openingOptions: [
      "Dự báo chính xác hơn nhưng khó giải thích vì sao một hồ sơ bị từ chối",
      "Chi phí vận hành thấp hơn nhưng thời gian xử lý mỗi hồ sơ kéo dài hơn",
      "Xử lý được nhiều hồ sơ hơn nhưng chỉ áp dụng được cho khách hàng doanh nghiệp",
      "Giảm rủi ro tín dụng nhưng làm tăng rủi ro thanh khoản của ngân hàng"
    ],
    correctOption: 0,
    explanation: "Mô hình tuyến tính cho biết mỗi biến đóng góp bao nhiêu; mô hình phi tuyến nhiều tầng thì không có câu trả lời gọn như vậy. Vấn đề là quy định ở nhiều nước yêu cầu nêu được lý do từ chối cấp tín dụng - nên độ chính xác cao hơn không tự động đồng nghĩa với dùng được.",
    diagram: [
      {
        label: "Học máy bắt được quan hệ phi tuyến mà mô hình truyền thống bỏ sót",
        arrow: true
      },
      {
        label: "Đổi lại: khó truy vì sao ra quyết định đó",
        arrow: true
      },
      {
        label: "Rủi ro mới: thiên lệch trong dữ liệu huấn luyện, trôi mô hình",
        arrow: true
      },
      {
        label: "Khung quản trị mô hình phải mở rộng để bao được cả hai"
      }
    ],
    realWorldExample: {
      company: "Vì sao thiên lệch trong dữ liệu huấn luyện là rủi ro pháp lý, không chỉ kỹ thuật",
      description: "Mô hình học từ quyết định trong quá khứ, nên nó học luôn cả các thiên lệch có trong quá khứ đó. Nếu dữ liệu lịch sử phản ánh việc một nhóm khách hàng từng bị từ chối nhiều hơn mức đáng có, mô hình sẽ tái tạo lại đúng khuôn mẫu ấy và còn làm nó hiệu quả hơn. Điều nguy hiểm là nó không cần biến nhạy cảm nào để làm vậy - các biến thay thế như nơi ở hay lịch sử tiêu dùng đã đủ."
    },
    quiz: [
      {
        question: "Hiện tượng trôi mô hình nghĩa là gì?",
        options: [
          "Quan hệ giữa dữ liệu đầu vào và kết quả thay đổi khiến mô hình kém dần đi",
          "Mô hình chạy chậm dần theo thời gian do khối lượng dữ liệu tích luỹ tăng lên",
          "Tham số mô hình bị thay đổi do lỗi kỹ thuật trong quá trình lưu trữ",
          "Mô hình được huấn luyện lại quá thường xuyên nên kết quả thiếu ổn định"
        ],
        correct: 0,
        explanation: "Thế giới đổi thì quan hệ mô hình học được từ quá khứ cũng cũ đi - hành vi khách hàng đổi, chu kỳ kinh tế đổi. Đây là lý do giám sát hiệu năng sau triển khai quan trọng ngang việc kiểm định trước khi triển khai."
      },
      {
        question: "Vì sao mô hình học máy có thể tái tạo thiên lệch mà không dùng biến nhạy cảm nào?",
        options: [
          "Vì các biến thay thế như nơi cư trú có thể tương quan chặt với biến nhạy cảm",
          "Vì thuật toán học máy được thiết kế để tự động phân nhóm khách hàng theo nhân khẩu",
          "Vì dữ liệu huấn luyện luôn phải chứa đầy đủ thông tin nhân khẩu học",
          "Vì mô hình không thể hoạt động nếu thiếu các biến nhân khẩu học cơ bản"
        ],
        correct: 0,
        explanation: "Loại bỏ biến nhạy cảm khỏi đầu vào không loại bỏ được thông tin đó, vì nó nằm rải trong các biến khác. Kiểm định công bằng vì thế phải đo kết quả đầu ra theo nhóm, chứ không dừng ở việc rà danh sách biến đầu vào."
      },
      {
        question: "Vì sao mô hình càng nhiều bên cùng sử dụng thì rủi ro hệ thống càng tăng?",
        options: [
          "Vì nhiều tổ chức cùng phản ứng giống nhau trước cùng một tín hiệu",
          "Vì các nhà cung cấp mô hình sẽ tăng giá khi có nhiều khách hàng hơn",
          "Vì mô hình dùng chung sẽ chạy chậm hơn do quá tải hạ tầng tính toán",
          "Vì cơ quan quản lý cấm nhiều tổ chức cùng dùng một nhà cung cấp mô hình"
        ],
        correct: 0,
        explanation: "Đây là tính đồng loạt ở dạng mới. Khi các định chế dùng mô hình giống nhau trên dữ liệu giống nhau, họ cùng thấy tín hiệu bán vào cùng một lúc - hành vi hợp lý của từng bên tạo ra cú sụt cho tất cả."
      }
    ,
    {
      "question": "Vì sao mô hình học máy trong tín dụng bị đòi hỏi khả năng giải thích cao hơn nhiều so với mô hình dùng trong marketing?",
      "options": [
        "Vì quy định buộc nêu được lý do cụ thể khi từ chối cấp tín dụng cho khách",
        "Vì mô hình tín dụng thường có độ chính xác thấp hơn mô hình marketing",
        "Vì dữ liệu tín dụng chứa nhiều biến nhạy cảm hơn dữ liệu hành vi mua sắm",
        "Vì mô hình tín dụng phải được cơ quan quản lý phê duyệt trước khi triển khai"
      ],
      "correct": 0,
      "explanation": "Đây là ràng buộc pháp lý chứ không phải sở thích kỹ thuật: người bị từ chối có quyền biết vì sao. Một mô hình chính xác hơn nhưng không nêu được lý do vẫn không dùng được ở khâu đó - nên đánh đổi giữa độ chính xác và khả năng giải thích là đánh đổi thật."
    },
    {
      "question": "Vì sao cần theo dõi phân phối dữ liệu đầu vào chứ không chỉ theo dõi độ chính xác của mô hình?",
      "options": [
        "Đầu vào lệch khỏi dữ liệu huấn luyện là tín hiệu sớm hơn",
        "Vì độ chính xác của mô hình chỉ tính được sau khi có kết quả thực tế nhiều tháng",
        "Vì phân phối đầu vào quyết định số lượng biến mà mô hình được phép sử dụng",
        "Vì dữ liệu đầu vào thay đổi sẽ làm mô hình ngừng hoạt động hoàn toàn"
      ],
      "correct": 0,
      "explanation": "Với mô hình tín dụng, kết quả thật chỉ biết sau nhiều tháng - lúc đó khoản lỗ đã phát sinh. Theo dõi độ trôi của chính dữ liệu đầu vào là tín hiệu sớm duy nhất có được ngay, và nó không cần chờ nhãn thực tế nào."
    }
    ],
    practicePrompt: {
      question:
        "Mô hình chấm điểm tín dụng học máy giữ nguyên độ chính xác 88% suốt sáu tháng, nhưng tỷ lệ hồ sơ lao động tự do trong dòng vào đã tăng từ 5% lên 30%. Việc cần làm là gì?",
      options: [
        "Theo dõi phân phối đầu vào: trôi mô hình đến trước khi độ chính xác rơi",
        "Không cần làm gì, vì độ chính xác 88% vẫn giữ nguyên suốt sáu tháng",
        "Huấn luyện lại ngay bằng toàn bộ dữ liệu lịch sử đã có từ trước",
        "Bỏ biến nghề nghiệp khỏi mô hình để tránh thiên lệch nhóm này",
      ],
      correct: 0,
      explanation:
        "Độ chính xác được đo trên các hồ sơ đã có kết quả, tức các khoản vay giải ngân từ nhiều tháng trước, khi dòng vào còn giống dữ liệu huấn luyện. Nó là chỉ báo trễ. Phân phối đầu vào thì đo được ngay hôm nay, và một nhóm đi từ 5% lên 30% nghĩa là mô hình đang chấm điểm cho một tổng thể khác với tổng thể nó học - độ chính xác sẽ rơi, chỉ là chưa quan sát được. Bỏ biến nghề nghiệp không giải quyết gì: mô hình học máy tái tạo được thiên lệch qua các biến tương quan mà không cần biến nhạy cảm nào, nên bỏ biến chỉ làm mất khả năng nhìn thấy chứ không làm mất thiên lệch.",
    },
    keyTakeaways: [
      "Đánh đổi trung tâm: độ chính xác cao hơn đổi lấy khả năng giải thích thấp hơn",
      "Mô hình học cả thiên lệch trong dữ liệu quá khứ, kể cả khi không có biến nhạy cảm",
      "Trôi mô hình khiến giám sát sau triển khai quan trọng ngang kiểm định trước",
      "Mô hình dùng chung rộng rãi làm tăng tính đồng loạt và rủi ro hệ thống"
    ],
    summary: {
      keyIdea: "Học máy không tạo ra loại rủi ro hoàn toàn mới, nhưng làm rủi ro mô hình nặng hơn và khó nhìn thấy hơn nhiều",
      commonMistake: "Đánh giá mô hình chỉ bằng độ chính xác trên tập kiểm tra, bỏ qua khả năng giải thích và tính công bằng của kết quả",
      action: "Với mỗi mô hình học máy đưa vào quyết định, hỏi: nếu khách hàng hỏi vì sao bị từ chối, ta trả lời thế nào"
    },
    application: {
      title: "Câu hỏi nên đặt cho mọi mô hình",
      message: "Ba câu đủ để lộ phần lớn vấn đề: mô hình học từ dữ liệu giai đoạn nào, kết quả có khác nhau giữa các nhóm khách hàng không, và ai chịu trách nhiệm khi nó sai.",
      secondary: "Ba câu này áp dụng được cho cả mô hình truyền thống lẫn học máy."
    },
    sections: [
      {
        type: "lead",
        text: "Học máy vào ngành tài chính không mang theo một loại rủi ro chưa từng có. Nó lấy một rủi ro đã biết - rủi ro mô hình - rồi làm nó nặng hơn và khó nhìn hơn."
      },
      {
        type: "heading",
        text: "Ba rủi ro mới nổi bật"
      },
      {
        type: "list",
        items: [
          "Khả năng giải thích: quy định nhiều nước đòi nêu lý do từ chối cấp tín dụng",
          "Thiên lệch: mô hình học cả các khuôn mẫu bất công có sẵn trong dữ liệu quá khứ",
          "Trôi mô hình: quan hệ học được từ quá khứ cũ dần khi thế giới thay đổi"
        ]
      },
      {
        type: "callout",
        label: "Loại biến nhạy cảm không đủ để công bằng",
        text: "Thông tin về giới tính hay nhóm dân cư nằm rải trong hàng chục biến khác - nơi ở, thói quen tiêu dùng, loại thiết bị dùng để nộp hồ sơ. Kiểm định công bằng vì thế phải đo chênh lệch ở đầu ra theo nhóm, chứ không dừng ở việc rà danh sách biến đầu vào."
      },
      {
        type: "heading",
        text: "Chiều hệ thống"
      },
      {
        type: "paragraph",
        text: "Khi nhiều định chế mua mô hình từ cùng vài nhà cung cấp và huấn luyện trên dữ liệu tương tự, họ bắt đầu phản ứng giống nhau trước cùng một tín hiệu. Đây là tính đồng loạt - thứ đã biến nhiều cú sốc riêng lẻ thành khủng hoảng chung, giờ có thêm một kênh lan truyền mới."
      },
      {
        type: "heading",
        text: "Vì sao bỏ biến nhạy cảm ra không giải quyết được gì"
      },
      {
        type: "paragraph",
        text: "Một mô hình chấm điểm tín dụng không được dùng giới tính hay dân tộc - và việc bỏ hai cột đó ra là bước dễ nhất, cũng là bước ít tác dụng nhất. Mã bưu chính, loại điện thoại dùng để nộp hồ sơ, giờ trong ngày người vay bấm nút, tên cửa hàng hay xuất hiện trong sao kê: mỗi biến chỉ tương quan yếu với nhóm dân cư, nhưng một mô hình phi tuyến với vài trăm biến ghép chúng lại và tái tạo được biến đã bị xoá với độ chính xác cao. Đó là lý do kiểm định công bằng phải đo trên KẾT QUẢ theo từng nhóm, không phải kiểm danh sách biến đầu vào."
      },
      {
        type: "conceptTable",
        title: "Ba câu hỏi cơ quan quản lý sẽ hỏi, và thứ phải chuẩn bị sẵn",
        subtitle: "Đều trả lời được trước khi triển khai, hoặc không trả lời được nữa",
        concepts: [
          {
            vi: "Vì sao hồ sơ này bị từ chối",
            en: "Adverse action reason",
            def: "Phải nêu được lý do cụ thể cho từng quyết định. Mô hình cây tăng cường với hàng nghìn nhánh không tự nêu được, nên cần một lớp giải thích - và lời giải thích ấy phải khớp với quyết định thật, không phải một câu chung chung dán vào sau."
          },
          {
            vi: "Mô hình có đối xử khác nhau giữa các nhóm không",
            en: "Disparate impact",
            def: "Đo tỷ lệ chấp thuận và tỷ lệ sai theo từng nhóm, không phải xem danh sách biến. Một mô hình sạch về đầu vào vẫn có thể lệch rõ ở đầu ra."
          },
          {
            vi: "Mô hình còn đúng không",
            en: "Ongoing monitoring",
            def: "Học máy suy giảm nhanh hơn hồi quy khi hành vi đổi, vì nó bám sát dữ liệu huấn luyện hơn. Cần theo dõi trôi dạt phân phối đầu vào, không chỉ theo dõi độ chính xác - độ chính xác chỉ tụt sau khi thiệt hại đã xảy ra."
          }
        ]
      },
      {
        type: "closing",
        lines: [
          "Một mô hình không giải thích được là một mô hình không phản biện được.",
          "Bài tiếp theo: loại rủi ro mà mọi dữ liệu quá khứ đều không có mẫu."
        ]
      }
    ]
  },
  {
    id: 1644,
    slug: "frm-rui-ro-khi-hau-va-stress-test-khi-hau",
    title: "FRM Current Issues, Bài 5: Rủi ro khí hậu và kiểm định sức chịu đựng khí hậu",
    subtitle: "Rủi ro vật lý, rủi ro chuyển đổi, và bài toán không có dữ liệu lịch sử để hiệu chỉnh",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🌏",
    track: "professional",
    whyItMatters: "Cơ quan quản lý ở nhiều nước đã đưa kiểm định khí hậu vào chương trình giám sát ngân hàng. Đây cũng là bài toán rủi ro đầu tiên mà toàn bộ hộp công cụ dựa trên dữ liệu quá khứ gần như vô dụng.",
    openingQuestion: "Rủi ro vật lý khác rủi ro chuyển đổi trong rủi ro khí hậu ở điểm nào?",
    openingOptions: [
      "Vật lý là thiên tai, chuyển đổi là chính sách",
      "Vật lý áp dụng cho tài sản hữu hình, chuyển đổi áp dụng cho tài sản tài chính",
      "Vật lý xảy ra trong ngắn hạn, chuyển đổi chỉ xuất hiện sau năm mươi năm nữa",
      "Vật lý do doanh nghiệp gánh, chuyển đổi do ngân sách nhà nước gánh"
    ],
    correctOption: 0,
    explanation: "Rủi ro khí hậu chia làm hai nhánh có cơ chế hoàn toàn khác nhau. Rủi ro vật lý là bão, lũ, hạn phá huỷ tài sản và làm gián đoạn hoạt động. Rủi ro chuyển đổi là thiệt hại từ chính quá trình chuyển sang kinh tế phát thải thấp: thuế carbon, quy định mới, công nghệ thay thế khiến tài sản cũ mất giá trước hạn. Với doanh nghiệp thâm dụng carbon, nhánh thứ hai thường lớn hơn nhánh thứ nhất - và nó có thể xuất hiện đột ngột dù quá trình chuyển đổi diễn ra chậm.",
    diagram: [
      {
        label: "Rủi ro vật lý: thiên tai cấp tính và biến đổi mãn tính",
        arrow: true
      },
      {
        label: "Rủi ro chuyển đổi: chính sách, công nghệ, thị hiếu thị trường đổi",
        arrow: true
      },
      {
        label: "Cả hai truyền vào rủi ro tín dụng, thị trường và hoạt động",
        arrow: true
      },
      {
        label: "Không có dữ liệu lịch sử tương ứng → phải dùng kịch bản dài hạn"
      }
    ],
    realWorldExample: {
      company: "Vì sao kiểm định khí hậu không giống mọi bài kiểm định khác",
      description: "Kiểm định sức chịu đựng thông thường lấy một cú sốc trong quá khứ làm mẫu - khủng hoảng 2008, lãi suất tăng sốc - rồi hỏi bảng cân đối hôm nay chịu được không. Kiểm định khí hậu không có mẫu nào để lấy: chưa từng có giai đoạn nào trong lịch sử tài chính hiện đại giống với thứ đang được mô hình hoá, và chân trời thời gian là hàng chục năm thay vì vài quý. Vì vậy nó là bài tập kịch bản chứ không phải bài tập thống kê."
    },
    quiz: [
      {
        question: "Tài sản mắc kẹt trong bối cảnh rủi ro chuyển đổi là gì?",
        options: [
          "Tài sản mất giá trị trước hạn do chính sách hoặc công nghệ thay đổi",
          "Tài sản không thể bán được do thị trường thứ cấp thiếu thanh khoản tạm thời",
          "Tài sản bị cơ quan quản lý phong toả trong quá trình điều tra vi phạm",
          "Tài sản nằm ở khu vực địa lý có nguy cơ thiên tai cao trong tương lai"
        ],
        correct: 0,
        explanation: "Một mỏ than hay nhà máy nhiệt điện có thể còn nguyên giá trị kỹ thuật nhưng mất giá trị kinh tế khi quy định siết lại hoặc công nghệ thay thế rẻ đi. Với ngân hàng, đó là tài sản bảo đảm bốc hơi trong khi khoản vay vẫn còn nguyên."
      },
      {
        question: "Vì sao chân trời thời gian dài là khó khăn đặc thù của rủi ro khí hậu?",
        options: [
          "Vì nó vượt xa chu kỳ lập kế hoạch và nhiệm kỳ của người ra quyết định",
          "Vì mô hình tài chính không tính toán được cho giai đoạn trên năm năm",
          "Vì dữ liệu khí hậu chỉ được các cơ quan khí tượng công bố mỗi mười năm",
          "Vì lãi suất chiết khấu không xác định được cho các kỳ hạn quá dài"
        ],
        correct: 0,
        explanation: "Đây được gọi là bi kịch của chân trời: thiệt hại lớn nhất rơi ra ngoài khoảng thời gian mà người ra quyết định hôm nay chịu trách nhiệm, nên động cơ hành động sớm rất yếu dù chi phí hành động muộn cao hơn nhiều."
      },
      {
        question: "Kiểm định khí hậu khác kiểm định sức chịu đựng truyền thống ở điểm nào?",
        options: [
          "Nó là bài tập kịch bản dài hạn, không hiệu chỉnh được từ dữ liệu quá khứ",
          "Nó chỉ áp dụng cho các ngân hàng có hoạt động cho vay ngành năng lượng",
          "Nó cho ra một con số vốn yêu cầu bắt buộc thay vì chỉ mang tính tham khảo",
          "Nó được thực hiện hằng ngày thay vì theo chu kỳ hằng năm như thông thường"
        ],
        correct: 0,
        explanation: "Không có tiền lệ nào trong lịch sử tài chính hiện đại để hiệu chỉnh, nên kết quả phụ thuộc gần như hoàn toàn vào giả định kịch bản. Giá trị của nó nằm ở việc buộc tổ chức nhìn ra danh mục đang phơi nhiễm vào đâu, hơn là ở con số cuối cùng."
      }
    ,
    {
      "question": "Kiểm định sức chịu đựng khí hậu khác kiểm định truyền thống ở điểm nào?",
      "options": [
        "Chân trời thời gian dài hàng chục năm nên không thể giữ nguyên bảng cân đối hiện tại",
        "Nó chỉ áp dụng cho danh mục cho vay chứ không cho danh mục đầu tư",
        "Kết quả của nó không được dùng để xác định mức vốn phải trích lập",
        "Nó dùng dữ liệu lịch sử về thiên tai trong nhiều thập kỷ thay vì dùng kịch bản giả định"
      ],
      "correct": 0,
      "explanation": "Kiểm định thông thường giả định bảng cân đối đứng yên trong một cú sốc vài quý - hợp lý ở khung thời gian đó. Với ba mươi năm, giả định đó vô nghĩa: cả danh mục lẫn mô hình kinh doanh của khách hàng đều sẽ khác, nên phải mô hình cả phản ứng thích nghi."
    },
    {
      "question": "Vì sao rủi ro chuyển đổi có thể xuất hiện đột ngột dù quá trình chuyển đổi diễn ra chậm?",
      "options": [
        "Vì thị trường định giá lại một lần khi kỳ vọng đổi chiều, không đổi dần từng năm",
        "Vì các quy định về khí hậu luôn có hiệu lực ngay khi được ban hành",
        "Vì công nghệ thay thế thường xuất hiện mà không có dấu hiệu báo trước",
        "Vì tác động vật lý của biến đổi khí hậu đang diễn ra nhanh hơn mọi dự báo khoa học"
      ],
      "correct": 0,
      "explanation": "Giá tài sản phản ánh kỳ vọng, và kỳ vọng dịch chuyển theo bậc: một quyết định chính sách, một mốc chi phí công nghệ bị vượt qua. Quá trình vật lý thì chậm, còn việc thị trường thừa nhận nó diễn ra trong vài phiên."
    }
    ],
    practicePrompt: {
      question:
        "Một nhà máy nhiệt điện than còn 18 năm tuổi thọ kỹ thuật, nhưng quy định mới vừa ban hành buộc dừng vận hành sau 7 năm. Ngân hàng đang cho vay kỳ hạn 12 năm nên làm gì?",
      options: [
        "Ghi nhận tài sản mắc kẹt và soát lại thời hạn khoản vay",
        "Không đổi gì, vì tài sản vẫn vận hành tốt về kỹ thuật",
        "Chờ tới khi quy định có hiệu lực rồi mới đánh giá lại",
        "Chuyển khoản vay sang nhóm rủi ro vật lý thay vì chuyển đổi",
      ],
      correct: 0,
      explanation:
        "Tài sản mắc kẹt là tài sản còn nguyên giá trị KỸ THUẬT nhưng mất giá trị KINH TẾ trước hạn, và đây là ví dụ sạch nhất của nó: máy vẫn chạy được 18 năm, nhưng dòng tiền chỉ còn 7 năm. Khoản vay 12 năm vì thế mất nguồn trả nợ từ năm thứ tám, và tài sản bảo đảm gần như không còn giá trị thanh lý vào đúng lúc cần tới nó. Chờ tới khi quy định có hiệu lực là muộn năm năm: giá trị kinh tế rơi vào ngày quy định được BAN HÀNH, không phải ngày nó có hiệu lực - đó cũng là lý do rủi ro chuyển đổi xuất hiện đột ngột dù quá trình chuyển đổi diễn ra chậm.",
    },
    keyTakeaways: [
      "Rủi ro vật lý là thiệt hại từ thiên tai; rủi ro chuyển đổi là từ chính sách và công nghệ",
      "Tài sản mắc kẹt: còn giá trị kỹ thuật nhưng mất giá trị kinh tế trước hạn",
      "Bi kịch chân trời: thiệt hại lớn nhất nằm ngoài nhiệm kỳ người quyết định hôm nay",
      "Kiểm định khí hậu là bài tập kịch bản, không hiệu chỉnh được từ lịch sử"
    ],
    summary: {
      keyIdea: "Khí hậu là loại rủi ro đầu tiên buộc ngành phải quản trị nghiêm túc một thứ không có dữ liệu lịch sử tương ứng",
      commonMistake: "Coi kết quả kiểm định khí hậu như một con số đo được, trong khi nó chủ yếu phản ánh giả định kịch bản đã chọn",
      action: "Đọc kết quả kiểm định khí hậu bằng cách xem danh mục phơi nhiễm ở đâu, đừng dừng ở con số tổn thất"
    },
    application: {
      title: "Nhìn danh mục qua lăng kính chuyển đổi",
      message: "Với bất kỳ danh mục nào, thử hỏi: nếu ngày mai có thuế carbon đáng kể, tài sản nào trong đây mất giá trước tiên?",
      secondary: "Câu hỏi đó thường lộ ra mức tập trung ngành mà bảng phân bổ thông thường không cho thấy."
    },
    sections: [
      {
        type: "lead",
        text: "Mọi công cụ trong chương trình FRM đều dựa vào dữ liệu quá khứ ở mức độ nào đó. Rủi ro khí hậu là bài toán đầu tiên mà cách làm đó không dùng được."
      },
      {
        type: "comparison",
        left: {
          label: "Rủi ro vật lý",
          text: "Cấp tính: bão, lũ, cháy rừng phá huỷ tài sản bảo đảm. Mãn tính: nước biển dâng, thay đổi lượng mưa làm giảm năng suất cả vùng."
        },
        right: {
          label: "Rủi ro chuyển đổi",
          text: "Thuế carbon, quy định mới, công nghệ thay thế và thị hiếu đổi làm tài sản mất giá trước hạn - kể cả khi vẫn hoạt động tốt về mặt kỹ thuật."
        }
      },
      {
        type: "heading",
        text: "Nó truyền vào đâu"
      },
      {
        type: "paragraph",
        text: "Khí hậu không phải một loại rủi ro riêng đứng cạnh tín dụng và thị trường - nó là một nguồn gây ra chính các loại đó. Lũ phá nhà xưởng của khách vay là rủi ro tín dụng; thuế carbon làm cổ phiếu ngành mất giá là rủi ro thị trường; trụ sở ngập là rủi ro hoạt động."
      },
      {
        type: "callout",
        label: "Bi kịch của chân trời",
        text: "Phần lớn thiệt hại rơi vào khoảng thời gian dài hơn nhiệm kỳ của ban điều hành, dài hơn kỳ lập kế hoạch, và dài hơn cả kỳ hạn nhiều khoản vay. Động cơ hành động hôm nay vì thế rất yếu, dù chi phí của việc hành động muộn cao hơn nhiều - đây là lý do phần này phải do cơ quan quản lý thúc đẩy."
      },
      {
        type: "heading",
        text: "Khí hậu không phải một loại rủi ro mới, nó là một nguồn gây ra các loại đã có"
      },
      {
        type: "conceptTable",
        title: "Hai kênh, và chúng đi vào đâu trong sổ sách",
        subtitle: "Không có dòng nào tên là rủi ro khí hậu - nó hiện ra dưới dạng tín dụng, thị trường và hoạt động",
        concepts: [
          {
            vi: "Rủi ro vật lý",
            en: "Physical risk",
            def: "Bão, lũ, hạn, nước biển dâng làm hỏng tài sản bảo đảm và gián đoạn dòng tiền của bên vay. Đi vào rủi ro tín dụng qua cả PD và LGD, và vào rủi ro hoạt động qua chính cơ sở vật chất của ngân hàng."
          },
          {
            vi: "Rủi ro chuyển đổi",
            en: "Transition risk",
            def: "Giá carbon, quy định mới, thay đổi công nghệ và thay đổi sở thích người tiêu dùng làm mô hình kinh doanh của bên vay mất giá trị. Đi vào rủi ro tín dụng của các ngành phát thải cao và vào rủi ro thị trường qua định giá lại tài sản."
          },
          {
            vi: "Quan hệ giữa hai kênh",
            en: "Đánh đổi, không cộng dồn",
            def: "Hành động chính sách mạnh và sớm làm rủi ro chuyển đổi cao nhưng rủi ro vật lý thấp; không hành động thì ngược lại. Nghĩa là kịch bản tệ nhất cho một danh mục ngân hàng không phải kịch bản tệ nhất cho khí hậu, và đó là chỗ dễ dựng kịch bản sai nhất."
          }
        ]
      },
      {
        type: "callout",
        label: "Bi kịch của chân trời",
        text: "Phần lớn thiệt hại rơi vào khoảng thời gian dài hơn nhiệm kỳ của ban điều hành, dài hơn kỳ lập kế hoạch kinh doanh, và dài hơn cả kỳ hạn phần lớn khoản vay. Một khoản vay mua nhà 25 năm chịu rủi ro nước biển dâng; một ngân hàng lập kế hoạch 3 năm thì không nhìn thấy nó. Vì không có dữ liệu lịch sử để hiệu chỉnh - không tồn tại một chuỗi thời gian về việc giá carbon tăng gấp năm lần - nên phân tích kịch bản thay thế mô hình thống kê, và khi đó giả định trở thành phần quan trọng nhất của kết quả. Điều cần công bố không phải con số cuối cùng mà là bộ giả định sinh ra nó."
      },
      {
        type: "closing",
        lines: [
          "Không có dữ liệu để hiệu chỉnh thì kịch bản thay thế mô hình, và giả định trở thành phần quan trọng nhất.",
          "Bài tiếp theo: một cuộc chuyển đổi khác đã hoàn tất và để lại bài học rõ ràng."
        ]
      }
    ]
  },
  {
    id: 1645,
    slug: "frm-chuyen-doi-libor-sang-lai-suat-tham-chieu-moi",
    title: "FRM Current Issues, Bài 6: Từ LIBOR sang lãi suất tham chiếu mới",
    subtitle: "Thay một con số nằm trong hàng trăm nghìn tỷ đô hợp đồng - và những gì nó dạy về rủi ro chuẩn tham chiếu",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🔗",
    track: "professional",
    whyItMatters: "Đây là cuộc phẫu thuật hạ tầng lớn nhất mà thị trường tài chính từng thực hiện, và nó cho một bài học chung: một chuẩn tham chiếu dựa trên phán đoán thay vì giao dịch thật là một điểm yếu nằm sẵn trong hệ thống.",
    openingQuestion: "Vấn đề cốt lõi khiến LIBOR phải bị thay thế là gì?",
    openingOptions: [
      "Nó dựa trên báo giá ước tính của các ngân hàng thay vì giao dịch thật",
      "Nó chỉ được công bố cho đồng đô la Mỹ nên không dùng được cho tiền tệ khác",
      "Nó được tính theo phương pháp quá phức tạp khiến thị trường khó kiểm chứng",
      "Nó chỉ có kỳ hạn qua đêm nên không phù hợp cho hợp đồng dài hạn"
    ],
    correctOption: 0,
    explanation: "LIBOR hỏi các ngân hàng rằng họ ước tính vay được với lãi suất nào - một phán đoán, không phải một giao dịch. Thị trường vay liên ngân hàng không bảo đảm co lại sau 2008 khiến phán đoán đó ngày càng ít có cơ sở, và cấu trúc dựa trên báo giá cũng mở đường cho các vụ thao túng bị phát hiện sau đó.",
    diagram: [
      {
        label: "LIBOR: báo giá ước tính, có rủi ro tín dụng ngân hàng, nhiều kỳ hạn",
        arrow: true
      },
      {
        label: "Lãi suất mới: giao dịch thật, gần như phi rủi ro, qua đêm",
        arrow: true
      },
      {
        label: "Khác biệt cấu trúc → cần chênh lệch điều chỉnh khi chuyển đổi",
        arrow: true
      },
      {
        label: "Hợp đồng cũ cần điều khoản dự phòng để không rơi vào khoảng trống pháp lý"
      }
    ],
    realWorldExample: {
      company: "Rủi ro hợp đồng cũ trong một cuộc chuyển đổi chuẩn tham chiếu",
      description: "Phần khó nhất không phải chọn lãi suất mới mà là hàng loạt hợp đồng dài hạn đã ký, trong đó nhiều hợp đồng chỉ có điều khoản dự phòng viết cho tình huống LIBOR gián đoạn tạm thời một vài ngày - không phải cho việc nó biến mất vĩnh viễn. Nếu không sửa, một số hợp đồng sẽ rơi vào tình trạng lãi suất bị cố định ở mức công bố cuối cùng, hoặc không xác định được lãi suất, và cả hai đều dẫn tới tranh chấp."
    },
    quiz: [
      {
        question: "Vì sao lãi suất tham chiếu mới cần một khoản chênh lệch điều chỉnh khi thay cho LIBOR?",
        options: [
          "Vì LIBOR có chứa rủi ro tín dụng của ngân hàng",
          "Vì lãi suất mới công bố chậm hơn một ngày",
          "Vì hai loại dùng số ngày trong năm khác nhau",
          "Vì muốn giảm chi phí vay cho doanh nghiệp nhỏ"
        ],
        correct: 0,
        explanation: "LIBOR là lãi suất vay không bảo đảm giữa các ngân hàng, nên nó luôn cao hơn một lãi suất gần như phi rủi ro. Chuyển thẳng mà không cộng chênh lệch sẽ chuyển giá trị từ bên này sang bên kia của mọi hợp đồng."
      },
      {
        question: "Khác biệt cấu trúc lớn nhất giữa LIBOR và các lãi suất tham chiếu mới là gì?",
        options: [
          "LIBOR nhiều kỳ hạn nhìn tới trước, lãi suất mới qua đêm nhìn lại sau",
          "LIBOR do ngân hàng trung ương công bố, lãi suất mới do các ngân hàng tự thoả thuận",
          "LIBOR chỉ dùng cho phái sinh, lãi suất mới chỉ dùng cho khoản vay doanh nghiệp",
          "LIBOR được cập nhật hằng giờ, lãi suất mới chỉ được công bố mỗi tuần một lần"
        ],
        correct: 0,
        explanation: "Đây là khác biệt gây nhiều việc nhất trong thực tế: người vay từng biết trước tiền lãi kỳ này ngay từ đầu kỳ, còn với lãi suất qua đêm cộng dồn thì con số chỉ chốt được vào cuối kỳ - toàn bộ hệ thống vận hành và kế toán phải sửa theo."
      },
      {
        question: "Bài học chung của cuộc chuyển đổi này với quản trị rủi ro là gì?",
        options: [
          "Chuẩn dựa trên phán đoán thay vì giao dịch thật",
          "Mọi hợp đồng tài chính nên có kỳ hạn dưới năm năm để dễ sửa khi cần",
          "Nên tránh lãi suất thả nổi trong hợp đồng dài",
          "Cơ quan quản lý nên tự công bố toàn bộ các loại lãi suất tham chiếu"
        ],
        correct: 0,
        explanation: "Một con số được hàng trăm nghìn tỷ đô hợp đồng tham chiếu tới mà lại dựa trên ước tính của một nhóm nhỏ người tham gia là một rủi ro tập trung, cả về thao túng lẫn về việc thị trường nền teo dần đi."
      }
    ,
    {
      "question": "Vì sao lãi suất tham chiếu mới cần khoản chênh lệch điều chỉnh khi thay cho LIBOR?",
      "options": [
        "Vì LIBOR chứa phần bù rủi ro tín dụng, lãi suất mới thì không",
        "Vì lãi suất mới được công bố theo ngày còn LIBOR công bố theo kỳ hạn",
        "Vì hợp đồng cũ ghi bằng LIBOR nên phải quy đổi theo tỷ giá tại ngày chuyển",
        "Vì cơ quan quản lý yêu cầu mọi hợp đồng chuyển đổi phải có khoản bù cho bên vay"
      ],
      "correct": 0,
      "explanation": "LIBOR là lãi suất vay không bảo đảm giữa các ngân hàng, nên nó gồm cả rủi ro tín dụng của chính ngân hàng. Lãi suất tham chiếu mới dựa trên giao dịch có bảo đảm nên gần như phi rủi ro - chuyển thẳng không có khoản bù thì một bên trong mọi hợp đồng cũ sẽ thiệt."
    },
    {
      "question": "Bài học chung của cuộc chuyển đổi này với quản trị rủi ro là gì?",
      "options": [
        "Một chỉ số hạ tầng dùng chung có thể trở thành rủi ro hệ thống khi nền của nó rỗng dần",
        "Các hợp đồng tài chính nên tránh dùng lãi suất thả nổi để không phải chuyển đổi",
        "Cơ quan quản lý nên tự công bố lãi suất tham chiếu thay vì để thị trường tự hình thành",
        "Rủi ro chuyển đổi chỉ ảnh hưởng tới hợp đồng phái sinh, không tới hợp đồng vay"
      ],
      "correct": 0,
      "explanation": "LIBOR chống đỡ hàng trăm nghìn tỷ đô hợp đồng trong khi thị trường thật đằng sau nó teo lại gần như không còn giao dịch. Không ai sở hữu rủi ro đó, và nó chỉ lộ ra khi bê bối thao túng buộc phải nhìn kỹ."
    }
    ],
    practicePrompt: {
      question:
        "Một hợp đồng cũ trả LIBOR 3 tháng cộng 1,2%. Khi chuyển sang lãi suất tham chiếu mới nhìn lại sau, vì sao phải thêm một khoản chênh lệch điều chỉnh?",
      options: [
        "Vì LIBOR chứa rủi ro tín dụng ngân hàng, cái mới thì không",
        "Vì lãi suất mới luôn cao hơn LIBOR ở mọi kỳ hạn tham chiếu",
        "Vì kỳ hạn ba tháng không có bản tương ứng ở lãi suất mới",
        "Vì cơ quan quản lý yêu cầu mọi hợp đồng phải đổi cùng mức",
      ],
      correct: 0,
      explanation:
        "LIBOR là lãi suất mà một ngân hàng ước tính mình phải trả để vay không bảo đảm, nên nó luôn cao hơn lãi suất phi rủi ro đúng bằng phần bù rủi ro tín dụng ngân hàng. Các lãi suất tham chiếu mới dựa trên giao dịch thật, phần lớn có bảo đảm hoặc qua đêm, nên không mang phần bù đó. Thay thẳng một chuỗi bằng chuỗi kia là lặng lẽ cắt vài chục điểm cơ bản khỏi tiền lãi của một bên và chuyển cho bên kia - khoản chênh lệch điều chỉnh tồn tại để việc chuyển đổi trung tính về giá trị kinh tế, chứ không phải để hai con số bằng nhau.",
    },
    keyTakeaways: [
      "LIBOR dựa trên báo giá ước tính, lãi suất mới dựa trên giao dịch thật",
      "LIBOR chứa rủi ro tín dụng ngân hàng nên chuyển đổi cần chênh lệch điều chỉnh",
      "Lãi suất mới là qua đêm nhìn lại sau, buộc sửa cả hệ thống vận hành và kế toán",
      "Rủi ro lớn nhất nằm ở hợp đồng cũ thiếu điều khoản dự phòng cho việc ngừng vĩnh viễn"
    ],
    summary: {
      keyIdea: "Thay một chuẩn tham chiếu là bài toán hợp đồng và vận hành nhiều hơn là bài toán chọn con số, và bài học còn lại là chuẩn phải neo vào giao dịch thật",
      commonMistake: "Coi đây là chuyện kỹ thuật của bộ phận vận hành, trong khi nó dịch chuyển giá trị kinh tế giữa hai bên của mọi hợp đồng",
      action: "Với bất kỳ hợp đồng dài hạn nào, đọc điều khoản dự phòng và hỏi: nó viết cho gián đoạn tạm thời hay cho việc biến mất hẳn"
    },
    application: {
      title: "Kiểm tra một hợp đồng vay",
      message: "Nếu bạn có khoản vay lãi suất thả nổi, tìm xem hợp đồng tham chiếu tới lãi suất nào và quy định gì nếu lãi suất đó ngừng được công bố. Rất nhiều hợp đồng không nói gì về tình huống đó.",
      secondary: "Khoảng trống ấy chính là thứ đã tạo ra khối lượng công việc khổng lồ trong cuộc chuyển đổi vừa qua."
    },
    sections: [
      {
        type: "lead",
        text: "Có lúc LIBOR là con số được tham chiếu bởi khối hợp đồng lớn hơn cả GDP toàn cầu. Nó được tạo ra bằng cách hỏi vài chục ngân hàng: nếu vay, các anh nghĩ mình vay được với lãi bao nhiêu?"
      },
      {
        type: "heading",
        text: "Vì sao một câu hỏi lại thành rủi ro hệ thống"
      },
      {
        type: "paragraph",
        text: "Câu trả lời là ước tính, không phải giao dịch. Sau 2008 thị trường vay liên ngân hàng không bảo đảm co lại mạnh, nên ước tính đó ngày càng thiếu cơ sở thực tế. Cùng lúc, cấu trúc dựa trên báo giá tạo điều kiện cho các vụ thao túng bị phát hiện sau đó."
      },
      {
        type: "comparison",
        left: {
          label: "LIBOR",
          text: "Báo giá ước tính, có kỳ hạn nhìn tới trước, chứa rủi ro tín dụng ngân hàng - nên biết trước tiền lãi ngay từ đầu kỳ."
        },
        right: {
          label: "Lãi suất tham chiếu mới",
          text: "Dựa trên giao dịch thật, qua đêm, gần như phi rủi ro - lãi kỳ này chỉ chốt được vào cuối kỳ sau khi cộng dồn."
        }
      },
      {
        type: "callout",
        label: "Phần khó nhất là hợp đồng cũ",
        text: "Rất nhiều hợp đồng dài hạn chỉ có điều khoản dự phòng viết cho tình huống LIBOR gián đoạn vài ngày, không phải cho việc nó biến mất hẳn. Không sửa thì hợp đồng hoặc bị cố định lãi ở mức cuối cùng, hoặc không xác định được lãi - và cả hai đều là tranh chấp."
      },
      {
        type: "heading",
        text: "Hai khoảng cách phải bắc cầu, không phải một"
      },
      {
        type: "paragraph",
        text: "LIBOR là lãi suất vay tín chấp giữa các ngân hàng, có kỳ hạn. Lãi suất tham chiếu mới thuộc loại gần như phi rủi ro, có bảo đảm, và chỉ có kỳ hạn qua đêm. Hai khác biệt đó phải xử lý riêng. Khác biệt tín dụng được xử lý bằng một khoản điều chỉnh cố định cho từng kỳ hạn, tính bằng trung vị của chênh lệch lịch sử trong 5 năm và chốt cứng vào tháng 3/2021 - với kỳ hạn 3 tháng, con số đó vào khoảng 26 điểm cơ bản. Chốt cứng là chủ ý: một khoản điều chỉnh thả nổi sẽ tái tạo lại đúng vấn đề vừa bỏ đi."
      },
      {
        type: "callout",
        label: "Khác biệt kỳ hạn tạo ra một vấn đề vận hành hoàn toàn mới",
        text: "Với LIBOR, lãi suất của kỳ tính lãi được biết ngay từ ngày đầu kỳ, nên người vay biết trước phải trả bao nhiêu. Với một lãi suất qua đêm, mức của cả kỳ chỉ tính ra được bằng cách gộp lãi từng ngày cho tới cuối kỳ - nghĩa là số tiền phải trả chỉ rõ vào ngày cuối cùng. Thị trường xử lý bằng cách nhìn lùi vài ngày làm việc để có thời gian phát hành thông báo. Đó là một thay đổi nhỏ trong công thức nhưng chạm tới hệ thống kế toán, hệ thống thanh toán và cả cách viết hợp đồng."
      },
      {
        type: "paragraph",
        text: "Bài học chung nằm ở chỗ khác: rủi ro không nằm ở việc LIBOR bị thao túng, mà ở việc một con số được hàng trăm nghìn tỷ đô hợp đồng tham chiếu lại dựa trên câu trả lời ước tính cho một thị trường đã teo đi. Câu hỏi nên hỏi với bất kỳ chuẩn tham chiếu nào đang dùng là: nó neo vào bao nhiêu giao dịch thật mỗi ngày, và điều gì xảy ra với hợp đồng của tôi nếu nó ngừng công bố."
      },
      {
        type: "closing",
        lines: [
          "Một chuẩn tham chiếu phải neo vào giao dịch có thật, nếu không nó là một điểm yếu chờ ngày lộ ra.",
          "Bài tiếp theo: hình thức tiền mới và câu hỏi nó đặt ra cho hệ thống ngân hàng."
        ]
      }
    ]
  },
  {
    id: 1646,
    slug: "frm-cbdc-va-he-thong-ngan-hang",
    title: "FRM Current Issues, Bài 7: Tiền kỹ thuật số ngân hàng trung ương và hệ thống ngân hàng",
    subtitle: "Nếu ai cũng gửi được tiền thẳng ở ngân hàng trung ương, ngân hàng thương mại còn lại gì",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🏛️",
    track: "professional",
    whyItMatters: "Rất nhiều ngân hàng trung ương đang nghiên cứu hoặc thí điểm CBDC. Câu hỏi rủi ro không phải công nghệ mà là cấu trúc: nó động thẳng vào nguồn vốn rẻ nhất và ổn định nhất của ngân hàng thương mại.",
    openingQuestion: "Rủi ro lớn nhất mà CBDC bán lẻ đặt ra cho hệ thống ngân hàng thương mại là gì?",
    openingOptions: [
      "Tiền gửi chảy khỏi ngân hàng thương mại, làm mất nguồn vốn rẻ và ổn định",
      "Ngân hàng thương mại phải nâng cấp toàn bộ hệ thống công nghệ lõi",
      "Chi phí tuân thủ chống rửa tiền tăng lên do có thêm một kênh thanh toán",
      "Ngân hàng trung ương sẽ trực tiếp cạnh tranh trong mảng cho vay doanh nghiệp"
    ],
    correctOption: 0,
    explanation: "Tiền gửi dân cư là nguồn vốn rẻ nhất và bám dai nhất của ngân hàng. Một khoản tiền gửi ở ngân hàng trung ương thì gần như không có rủi ro tín dụng, nên nếu không có giới hạn nắm giữ, nó là lựa chọn thay thế hấp dẫn hơn hẳn - đặc biệt trong lúc thị trường căng thẳng.",
    diagram: [
      {
        label: "CBDC bán lẻ: nghĩa vụ trực tiếp của ngân hàng trung ương",
        arrow: true
      },
      {
        label: "An toàn hơn tiền gửi ngân hàng thương mại về rủi ro tín dụng",
        arrow: true
      },
      {
        label: "Nguy cơ rút tiền gửi, đặc biệt trong khủng hoảng",
        arrow: true
      },
      {
        label: "Thiết kế phải có trần nắm giữ hoặc lãi suất bậc thang để hãm lại"
      }
    ],
    realWorldExample: {
      company: "Vì sao thiết kế CBDC thường kèm trần nắm giữ",
      description: "Các đề án CBDC bán lẻ được nghiên cứu nghiêm túc gần như luôn kèm một cơ chế hãm: trần số dư mỗi người được giữ, hoặc lãi suất bậc thang phạt phần vượt ngưỡng. Lý do là kịch bản tháo chạy trong khủng hoảng - khi người gửi nghi ngờ ngân hàng, việc chuyển sang một tài sản không có rủi ro tín dụng chỉ bằng vài thao tác sẽ khiến làn sóng rút tiền nhanh hơn bất kỳ tiền lệ nào."
    },
    quiz: [
      {
        question: "Vì sao CBDC có thể làm các cuộc tháo chạy ngân hàng diễn ra nhanh hơn?",
        options: [
          "Vì chuyển sang tài sản không rủi ro chỉ mất vài thao tác",
          "Vì ngân hàng trung ương sẽ công bố danh sách các ngân hàng đang gặp khó khăn",
          "Vì CBDC trả lãi suất cao hơn hẳn tiền gửi tại ngân hàng thương mại",
          "Vì hệ thống thanh toán sẽ ngừng hoạt động khi có nhiều lệnh chuyển cùng lúc"
        ],
        correct: 0,
        explanation: "Tháo chạy ngân hàng vốn bị hãm bởi ma sát - phải tới quầy, phải tìm chỗ gửi khác cũng có rủi ro. CBDC xoá cả hai ma sát đó cùng lúc, nên tốc độ rút có thể vượt xa mọi mô hình hiệu chỉnh từ dữ liệu lịch sử."
      },
      {
        question: "Mô hình CBDC hai tầng hoạt động thế nào?",
        options: [
          "Ngân hàng trung ương phát hành, tư nhân lo phân phối",
          "Mỗi quốc gia phát hành hai loại CBDC riêng cho dân cư và cho doanh nghiệp",
          "CBDC được phát hành đồng thời bởi ngân hàng trung ương và các ngân hàng lớn nhất",
          "Người dùng phải mở hai tài khoản riêng"
        ],
        correct: 0,
        explanation: "Mô hình này giữ ngân hàng trung ương ở vai trò phát hành và vận hành sổ cái, trong khi phần tiếp xúc khách hàng - mở tài khoản, định danh, hỗ trợ - vẫn nằm ở khu vực tư nhân. Nó tránh việc ngân hàng trung ương phải phục vụ hàng chục triệu khách hàng lẻ."
      },
      {
        question: "Vì sao stablecoin và CBDC đặt ra hai loại câu hỏi rủi ro khác nhau?",
        options: [
          "Stablecoin phụ thuộc chất lượng tài sản bảo chứng",
          "Stablecoin không được phép sử dụng cho các giao dịch thanh toán xuyên biên giới",
          "CBDC chỉ tồn tại dưới dạng vật lý còn stablecoin chỉ tồn tại dưới dạng điện tử",
          "CBDC không chịu quy định giám sát nào"
        ],
        correct: 0,
        explanation: "CBDC là nghĩa vụ trực tiếp của ngân hàng trung ương nên rủi ro tín dụng gần như bằng 0; câu hỏi của nó là câu hỏi cấu trúc hệ thống. Stablecoin thì chỉ đáng tin bằng đúng tài sản bảo chứng đằng sau, nên nó mang rủi ro tháo chạy giống một quỹ thị trường tiền tệ."
      }
    ,
    {
      "question": "Vì sao thiết kế CBDC thường kèm hạn mức nắm giữ cho mỗi cá nhân?",
      "options": [
        "Để tiền gửi không dịch chuyển ồ ạt khỏi ngân hàng thương mại sang ngân hàng trung ương",
        "Để hạn chế việc CBDC được dùng cho các giao dịch có giá trị lớn",
        "Vì hệ thống kỹ thuật của ngân hàng trung ương không xử lý được số dư lớn",
        "Vì quy định phòng chống rửa tiền yêu cầu giới hạn số dư của mọi loại tài khoản điện tử"
      ],
      "correct": 0,
      "explanation": "Tiền gửi dân cư là nguồn vốn rẻ và bám dai nhất của ngân hàng thương mại. Một tài khoản ở ngân hàng trung ương gần như không có rủi ro tín dụng, nên không có hạn mức thì nó hút vốn - đặc biệt trong lúc thị trường căng thẳng, đúng lúc ngân hàng cần vốn nhất."
    },
    {
      "question": "Mô hình CBDC hai tầng khác mô hình trực tiếp ở điểm nào?",
      "options": [
        "Ngân hàng trung ương phát hành, còn ngân hàng thương mại giữ quan hệ với người dùng cuối",
        "Ngân hàng thương mại tự phát hành CBDC dưới sự giám sát của ngân hàng trung ương",
        "CBDC hai tầng chỉ dùng cho thanh toán liên ngân hàng, không dùng cho bán lẻ",
        "Mô hình hai tầng cho phép mọi người dùng mở tài khoản trực tiếp tại ngân hàng trung ương"
      ],
      "correct": 0,
      "explanation": "Mô hình này giữ lại vai trò của ngân hàng thương mại ở khâu định danh khách hàng, dịch vụ và xử lý tranh chấp - những việc ngân hàng trung ương không có bộ máy để làm. Nó cũng giảm bớt phần nào lực hút vốn khỏi hệ thống ngân hàng."
    }
    ],
    practicePrompt: {
      question:
        "Một quốc gia phát hành CBDC bán lẻ không đặt trần nắm giữ cho mỗi cá nhân. Trong một đợt căng thẳng, rủi ro lớn nhất với ngân hàng thương mại là gì?",
      options: [
        "Tiền gửi chạy sang CBDC ngay lập tức, không cần xếp hàng",
        "Chi phí công nghệ để kết nối với hệ thống CBDC tăng vọt",
        "Ngân hàng trung ương cạnh tranh lãi suất huy động trực tiếp",
        "Khách hàng mất niềm tin vì tiền gửi không còn được bảo hiểm",
      ],
      correct: 0,
      explanation:
        "Trong một đợt tháo chạy truyền thống, người gửi tiền phải chuyển sang một ngân hàng khác - mà ngân hàng đó cũng có thể đang bị nghi ngờ - hoặc rút tiền mặt, việc bị giới hạn bởi quầy và cây ATM. Cả hai đều tạo ma sát, và ma sát đó là thứ mua thời gian cho cơ quan quản lý. CBDC xoá ma sát: nó là nghĩa vụ của ngân hàng trung ương, an toàn tuyệt đối theo định nghĩa, và chuyển sang nó chỉ mất vài giây trên điện thoại. Đó là lý do gần như mọi thiết kế CBDC đều kèm trần nắm giữ hoặc lãi suất bậc thang - không phải vì công nghệ, mà để dựng lại đúng phần ma sát vừa bị xoá.",
    },
    keyTakeaways: [
      "Rủi ro chính của CBDC bán lẻ là hút tiền gửi khỏi ngân hàng thương mại",
      "Thiết kế thường kèm trần nắm giữ hoặc lãi suất bậc thang để hãm nguy cơ tháo chạy",
      "Mô hình hai tầng giữ khu vực tư nhân ở khâu phân phối và định danh khách hàng",
      "Stablecoin mang rủi ro tài sản bảo chứng; CBDC mang câu hỏi về cấu trúc hệ thống"
    ],
    summary: {
      keyIdea: "Câu hỏi rủi ro của CBDC không nằm ở công nghệ mà ở chỗ nó cạnh tranh trực tiếp với nguồn vốn nền tảng của ngân hàng thương mại",
      commonMistake: "Đánh giá CBDC như một dự án công nghệ thanh toán, bỏ qua tác động lên cấu trúc huy động vốn của cả hệ thống",
      action: "Khi đọc một đề án CBDC, tìm ngay phần cơ chế hãm - trần nắm giữ hay lãi suất bậc thang - vì đó là chỗ xử lý rủi ro thật"
    },
    application: {
      title: "So sánh ba loại tiền bạn đang giữ",
      message: "Tiền mặt là nghĩa vụ của ngân hàng trung ương. Tiền trong tài khoản là nghĩa vụ của ngân hàng thương mại. Tiền trong ví điện tử là nghĩa vụ của một công ty tư nhân. Ba mức rủi ro tín dụng khác nhau cho thứ trông giống nhau.",
      secondary: "CBDC sẽ là loại thứ tư, và vị trí của nó trong bảng này chính là lý do nó gây tranh luận."
    },
    sections: [
      {
        type: "lead",
        text: "Tiền trong tài khoản ngân hàng của bạn không phải tiền của ngân hàng trung ương - nó là một khoản nợ mà ngân hàng thương mại nợ bạn. CBDC xoá đi sự phân biệt đó, và toàn bộ tranh luận nằm ở hệ quả của việc xoá."
      },
      {
        type: "heading",
        text: "Vì sao đây là câu hỏi cấu trúc"
      },
      {
        type: "paragraph",
        text: "Ngân hàng thương mại vận hành được nhờ tiền gửi rẻ và ổn định. Nếu người dân giữ được một tài sản có tính thanh toán tương đương nhưng không mang rủi ro tín dụng nào, phần lớn lý do để giữ tiền ở ngân hàng thương mại biến mất - kéo theo chi phí vốn tăng và khả năng cho vay giảm."
      },
      {
        type: "callout",
        label: "Kịch bản đáng lo nhất là tháo chạy",
        text: "Tháo chạy ngân hàng truyền thống bị hãm bởi ma sát: phải xếp hàng, và chỗ chuyển sang cũng là một ngân hàng khác cũng có rủi ro. CBDC xoá cả hai ma sát cùng lúc, nên tốc độ rút tiền có thể vượt xa mọi mô hình hiệu chỉnh từ lịch sử - đây là lý do trần nắm giữ gần như luôn có mặt trong các đề án."
      },
      {
        type: "heading",
        text: "Con số làm rõ vì sao đây là câu hỏi cấu trúc"
      },
      {
        type: "paragraph",
        text: "Một ngân hàng thương mại điển hình huy động phần lớn nguồn vốn từ tiền gửi, và tiền gửi không kỳ hạn là nguồn rẻ nhất - trả gần 0% trong khi tài sản cho vay sinh lời vài phần trăm. Chênh lệch đó là phần lớn lợi nhuận của mô hình ngân hàng. Nếu người dân chuyển được một phần tiền gửi sang tài khoản ở ngân hàng trung ương, ngân hàng phải bù bằng nguồn đắt hơn - phát hành giấy tờ có giá hoặc huy động kỳ hạn - và chi phí vốn tăng lên. Chi phí ấy không biến mất; nó đi vào lãi suất cho vay."
      },
      {
        type: "callout",
        label: "Hạn mức nắm giữ không phải chi tiết kỹ thuật",
        text: "Đó là lý do gần như mọi thiết kế CBDC đang thử nghiệm đều đặt trần số dư mỗi người được giữ, hoặc trả lãi 0% và bậc thang âm khi vượt ngưỡng. Cả hai đều nhằm đúng một việc: giữ CBDC ở vai trò phương tiện thanh toán, chặn nó trở thành nơi trú ẩn khi có biến. Con số trần đó chính là nút vặn quyết định ngân hàng thương mại mất bao nhiêu tiền gửi - và nó là một lựa chọn chính sách, không phải tham số kỹ thuật."
      },
      {
        type: "comparison",
        left: {
          label: "Tháo chạy ngân hàng kiểu cũ",
          text: "Bị hãm bởi ma sát: phải đến quầy hoặc chờ chuyển khoản, và nơi chuyển tới cũng là một ngân hàng có rủi ro. Thời gian đó đủ để nhà điều hành can thiệp."
        },
        right: {
          label: "Tháo chạy khi có CBDC",
          text: "Không ma sát và không cần chọn ngân hàng thay thế: đích đến là chính ngân hàng trung ương, an toàn tuyệt đối theo định nghĩa. Tốc độ tính bằng phút, và điều đó đổi hẳn bài toán xử lý khủng hoảng."
        }
      },
      {
        type: "closing",
        lines: [
          "Thiết kế tiền là thiết kế cấu trúc hệ thống tài chính, không phải chọn công nghệ.",
          "Bài tiếp theo: khi hạ tầng dùng chung trở thành điểm đổ vỡ chung."
        ]
      }
    ]
  },
  {
    id: 1647,
    slug: "frm-rui-ro-tap-trung-nha-cung-cap-dam-may",
    title: "FRM Current Issues, Bài 8: Rủi ro tập trung nhà cung cấp đám mây",
    subtitle: "Khi cả ngành thuê ngoài cho cùng ba công ty, rủi ro riêng lẻ thành rủi ro hệ thống",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "☁️",
    track: "professional",
    whyItMatters: "Mỗi định chế chuyển lên đám mây đều có lý do đúng: rẻ hơn, an toàn hơn, chạy nhanh hơn. Nhưng khi tất cả cùng chọn một trong số ít nhà cung cấp, tổng lại thành một điểm đổ vỡ mà không ai sở hữu.",
    openingQuestion: "Vì sao cơ quan quản lý lo ngại tập trung nhà cung cấp đám mây trong ngành tài chính?",
    openingOptions: [
      "Một sự cố có thể gián đoạn nhiều định chế cùng lúc",
      "Nhà cung cấp đám mây thường có mức bảo mật thấp hơn hệ thống tự vận hành",
      "Chi phí thuê đám mây tăng đều mỗi năm làm giảm lợi nhuận của các ngân hàng",
      "Dữ liệu khách hàng bắt buộc phải được lưu trữ trong lãnh thổ quốc gia"
    ],
    correctOption: 0,
    explanation: "Ở góc độ từng tổ chức, hạ tầng đám mây thường an toàn hơn tự vận hành: nhà cung cấp lớn có đội ngũ an ninh và năng lực dự phòng mà một ngân hàng cỡ vừa không xây nổi. Vấn đề nằm ở cấp hệ thống. Khi hàng loạt định chế cùng phụ thuộc vào vài nhà cung cấp, một sự cố duy nhất tạo ra gián đoạn đồng thời trên toàn ngành, và không định chế nào tự phòng ngừa được bằng biện pháp nội bộ - đó là lý do cơ quan quản lý nhiều nước bắt đầu giám sát trực tiếp chính các nhà cung cấp.",
    diagram: [
      {
        label: "Mỗi tổ chức chuyển lên đám mây vì lý do hợp lý riêng",
        arrow: true
      },
      {
        label: "Số nhà cung cấp đủ năng lực rất ít",
        arrow: true
      },
      {
        label: "Tổng lại: điểm đổ vỡ chung cho cả ngành",
        arrow: true
      },
      {
        label: "Không định chế đơn lẻ nào có động cơ tự giải quyết"
      }
    ],
    realWorldExample: {
      company: "Vì sao khung thuê ngoài truyền thống không đủ cho đám mây",
      description: "Quy định về thuê ngoài được viết cho quan hệ song phương: ngân hàng đánh giá nhà cung cấp, ký hợp đồng có điều khoản kiểm toán, chuẩn bị phương án thay thế. Với đám mây, cả ba bước đều khó thực hiện đúng nghĩa - ngân hàng nhỏ không có đòn bẩy đàm phán với nhà cung cấp lớn hơn mình nhiều lần, quyền kiểm toán tại chỗ thường không khả thi, và chuyển sang nhà cung cấp khác là dự án nhiều năm chứ không phải phương án dự phòng."
    },
    quiz: [
      {
        question: "Vì sao khả năng chuyển đổi nhà cung cấp lại là vấn đề thực tế?",
        options: [
          "Vì hệ thống được xây theo dịch vụ riêng của nhà cung cấp nên khó gỡ ra",
          "Vì hợp đồng đám mây luôn có thời hạn tối thiểu mười năm không được chấm dứt",
          "Vì cơ quan quản lý yêu cầu mỗi tổ chức chỉ được dùng một nhà cung cấp duy nhất",
          "Vì dữ liệu lưu trên đám mây không thể sao chép ra ngoài vì lý do kỹ thuật"
        ],
        correct: 0,
        explanation: "Ứng dụng dùng càng nhiều dịch vụ đặc thù của nền tảng thì càng khó tách ra. Đây là lý do phương án dự phòng trên giấy - nếu có sự cố thì chuyển sang nhà cung cấp khác - thường không kiểm chứng được trong thực tế."
      },
      {
        question: "Vì sao đây được xếp vào rủi ro hệ thống chứ không chỉ là rủi ro hoạt động của từng ngân hàng?",
        options: [
          "Vì gián đoạn xảy ra đồng thời ở nhiều định chế nên không bên nào bù cho bên nào",
          "Vì các nhà cung cấp đám mây cũng nắm giữ cổ phần tại các ngân hàng lớn",
          "Vì sự cố đám mây luôn kéo dài hơn một tuần trước khi được khắc phục",
          "Vì dữ liệu tài chính trên đám mây được chia sẻ giữa các định chế với nhau"
        ],
        correct: 0,
        explanation: "Rủi ro hoạt động thông thường có tính riêng lẻ: ngân hàng này sập thì khách chuyển sang ngân hàng khác. Khi cả ngành dùng chung một hạ tầng, sự cố đánh vào tất cả cùng lúc và cơ chế bù trừ tự nhiên đó biến mất."
      },
      {
        question: "Hướng xử lý mà cơ quan quản lý nhiều nước đang đi là gì?",
        options: [
          "Giám sát trực tiếp nhà cung cấp trọng yếu thay vì chỉ giám sát qua ngân hàng",
          "Cấm hoàn toàn các định chế tài chính sử dụng dịch vụ điện toán đám mây",
          "Yêu cầu mọi ngân hàng phải tự xây dựng trung tâm dữ liệu riêng của mình",
          "Buộc các nhà cung cấp đám mây phải xin giấy phép hoạt động ngân hàng"
        ],
        correct: 0,
        explanation: "Vì không định chế đơn lẻ nào có đủ đòn bẩy hay động cơ để xử lý rủi ro chung này, xu hướng là đưa nhà cung cấp trọng yếu vào diện giám sát trực tiếp - tương tự cách hạ tầng thị trường tài chính được giám sát."
      }
    ,
    {
      "question": "Vì sao việc chuyển sang nhà cung cấp đám mây khác lại khó trong thực tế?",
      "options": [
        "Vì hệ thống bám vào dịch vụ riêng của nhà cung cấp",
        "Vì hợp đồng đám mây thường có thời hạn tối thiểu mười năm",
        "Vì dữ liệu lưu trên đám mây không được phép chuyển ra khỏi nhà cung cấp gốc",
        "Vì cơ quan quản lý phải phê duyệt lại toàn bộ hệ thống sau mỗi lần chuyển"
      ],
      "correct": 0,
      "explanation": "Ứng dụng hiện đại không chỉ thuê máy chủ - nó dùng dịch vụ cơ sở dữ liệu, xếp hàng tin nhắn, xác thực riêng của nền tảng. Chuyển đi nghĩa là viết lại phần lớn hệ thống, nên phương án dự phòng trên giấy thường không thực hiện được trong khủng hoảng."
    },
    {
      "question": "Hướng xử lý mà cơ quan quản lý nhiều nước đang đi với rủi ro này là gì?",
      "options": [
        "Giám sát trực tiếp chính các nhà cung cấp quan trọng thay vì chỉ giám sát ngân hàng",
        "Cấm các định chế tài chính chuyển hệ thống lõi lên hạ tầng đám mây",
        "Yêu cầu mỗi ngân hàng phải dùng ít nhất ba nhà cung cấp song song",
        "Buộc các nhà cung cấp đám mây phải xin giấy phép hoạt động ngân hàng"
      ],
      "correct": 0,
      "explanation": "Không ngân hàng nào tự phòng ngừa được rủi ro này bằng biện pháp nội bộ, nên khung giám sát cũ - đặt nghĩa vụ lên từng định chế - không giải quyết được. Cách đang đi là đưa chính nhà cung cấp vào phạm vi giám sát khi họ đủ quan trọng với hệ thống."
    }
    ],
    practicePrompt: {
      question:
        "Mười hai ngân hàng lớn của một nước đều chọn cùng một nhà cung cấp đám mây, và mỗi bên đều đã thẩm định nhà cung cấp đó rất kỹ. Vấn đề nằm ở đâu?",
      options: [
        "Mỗi quyết định đều đúng, tổng lại thành điểm đổ vỡ chung",
        "Thẩm định của cả mười hai bên đều đã bỏ sót cùng một điểm",
        "Nhà cung cấp đó có rủi ro vận hành cao hơn các bên khác",
        "Hợp đồng thuê ngoài của họ thiếu điều khoản chuyển đổi",
      ],
      correct: 0,
      explanation:
        "Đây là nghịch lý hợp thành ở dạng sạch nhất: mỗi ngân hàng chọn nhà cung cấp có hạ tầng tốt nhất và thẩm định kỹ nhất, và chính vì tất cả cùng làm đúng nên tất cả cùng chọn một bên. Rủi ro sinh ra không nằm trong bất kỳ quyết định nào và cũng không ai sở hữu nó - không ngân hàng nào có thể tự sửa, vì bên duy nhất nhìn thấy toàn cảnh là cơ quan quản lý. Khung thuê ngoài truyền thống không với tới được, vì nó giả định một quan hệ song phương trong đó bên thuê có quyền mặc cả, còn ở đây bên thuê nhỏ hơn nhà cung cấp nhiều lần.",
    },
    keyTakeaways: [
      "Hợp lý ở cấp từng tổ chức nhưng tạo điểm đổ vỡ chung ở cấp hệ thống",
      "Khung thuê ngoài truyền thống giả định quan hệ song phương cân bằng, điều không đúng ở đây",
      "Khả năng chuyển đổi nhà cung cấp thường chỉ tồn tại trên giấy",
      "Xu hướng quản lý: giám sát trực tiếp nhà cung cấp trọng yếu"
    ],
    summary: {
      keyIdea: "Đây là ví dụ rõ nhất của nghịch lý hợp thành: mỗi quyết định riêng lẻ đều đúng, tổng lại thành một rủi ro không ai sở hữu",
      commonMistake: "Đánh giá rủi ro đám mây chỉ ở cấp tổ chức, nơi kết luận gần như luôn là an toàn hơn tự vận hành",
      action: "Khi rà soát rủi ro bên thứ ba, hỏi thêm: bao nhiêu đối thủ của chúng ta cũng đang dùng đúng nhà cung cấp này"
    },
    application: {
      title: "Nhìn ra tập trung ẩn",
      message: "Thử liệt kê các dịch vụ số bạn dùng hằng ngày rồi tra xem chúng chạy trên hạ tầng của ai. Danh sách thường ngắn hơn nhiều so với số lượng ứng dụng.",
      secondary: "Đó chính là hình dạng của rủi ro tập trung mà cả ngành tài chính đang đối mặt."
    },
    sections: [
      {
        type: "lead",
        text: "Nếu hỏi riêng từng ngân hàng, chuyển lên đám mây gần như luôn làm giảm rủi ro hoạt động của họ. Câu hỏi khó chỉ xuất hiện khi cộng tất cả các câu trả lời lại."
      },
      {
        type: "heading",
        text: "Nghịch lý hợp thành"
      },
      {
        type: "paragraph",
        text: "Số nhà cung cấp đủ năng lực phục vụ định chế tài chính lớn là rất ít. Khi phần lớn ngành cùng chọn trong nhóm nhỏ đó, một sự cố ở một nhà cung cấp không còn là sự cố của một tổ chức - nó là gián đoạn đồng thời của nhiều tổ chức, đúng lúc không ai còn ở trạng thái bình thường để bù cho nhau."
      },
      {
        type: "list",
        items: [
          "Đòn bẩy đàm phán lệch: ngân hàng nhỏ khó áp điều khoản lên nhà cung cấp lớn hơn mình",
          "Quyền kiểm toán tại chỗ thường không khả thi với mô hình vận hành của đám mây",
          "Khả năng chuyển đổi bị khoá bởi các dịch vụ đặc thù của nền tảng",
          "Chuỗi phụ thuộc nhiều tầng: nhà cung cấp của nhà cung cấp cũng có thể trùng nhau"
        ]
      },
      {
        type: "callout",
        label: "Vì sao thị trường không tự giải quyết được",
        text: "Không định chế đơn lẻ nào có động cơ gánh chi phí đa dạng hoá hạ tầng để giảm một rủi ro mà cả ngành cùng chịu. Đây là dạng ngoại ứng kinh điển, và cũng là lý do lời giải phải đến từ phía quy định chứ không từ phía thị trường."
      },
      {
        type: "heading",
        text: "Nghịch lý hợp thành, phát biểu cho gọn"
      },
      {
        type: "paragraph",
        text: "Hỏi riêng từng ngân hàng: chuyển hệ thống lên đám mây gần như luôn làm giảm rủi ro hoạt động của họ. Nhà cung cấp lớn có đội an ninh, hạ tầng dự phòng và tần suất vá lỗi mà một trung tâm dữ liệu tự vận hành khó theo kịp. Hỏi cả ngành: khi phần lớn định chế cùng chọn trong ba nhà cung cấp, một sự cố duy nhất chạm tới tất cả cùng lúc. Cả hai câu trả lời đều đúng, và đó chính là nghịch lý - tối ưu cho từng thành phần không cộng lại thành tối ưu cho tổng thể."
      },
      {
        type: "callout",
        label: "Vì sao thị trường không tự giải quyết được",
        text: "Không định chế đơn lẻ nào có động cơ gánh chi phí đa dạng hoá hạ tầng để giảm một rủi ro mà cả ngành cùng chịu. Nếu một ngân hàng tự chạy hai nền tảng song song, nó trả gấp đôi chi phí trong khi phần rủi ro hệ thống giảm được gần như bằng không - vì khi nhà cung cấp lớn sập, khách hàng và đối tác của nó vẫn tê liệt. Đây là dạng ngoại ứng kinh điển, và nó chỉ xử lý được ở cấp quy định chứ không ở cấp hợp đồng."
      },
      {
        type: "conceptTable",
        title: "Ba việc quy định hiện đòi hỏi, và vì sao từng việc",
        subtitle: "Cả ba đều là câu trả lời cho việc hợp đồng song phương không đủ",
        concepts: [
          {
            vi: "Đăng ký nhà cung cấp trọng yếu",
            en: "Critical third-party register",
            def: "Cơ quan quản lý phải biết ai đang phụ thuộc vào ai trước khi sự cố xảy ra. Không có bản đồ đó thì mức tập trung của cả ngành là điều không ai đo được, kể cả khi từng hợp đồng riêng lẻ đều chặt chẽ."
          },
          {
            vi: "Kế hoạch rút lui và khả năng thay thế",
            en: "Exit and substitutability",
            def: "Phải chứng minh được rằng nếu nhà cung cấp ngừng phục vụ thì chuyển đi được, trong bao lâu, và sang đâu. Đòn bẩy đàm phán của một ngân hàng nhỏ với một nhà cung cấp lớn hơn nó rất yếu, nên điều khoản trên giấy không thay thế được một kế hoạch đã thử."
          },
          {
            vi: "Quyền kiểm toán và tiếp cận",
            en: "Audit rights",
            def: "Trên thực tế thường bị thay bằng báo cáo chứng nhận dùng chung cho mọi khách hàng. Điều đó chấp nhận được cho phần lớn dịch vụ, nhưng nó nghĩa là ngân hàng đang dựa vào đánh giá của một bên thứ ba khác, chứ không phải tự mình kiểm tra."
          }
        ]
      },
      {
        type: "closing",
        lines: [
          "Thuê ngoài chuyển được hoạt động, nhưng không chuyển được trách nhiệm - và ở đây cũng không chuyển được rủi ro.",
          "Bài tiếp theo: một đợt bất ổn ngân hàng gần đây và những gì nó xác nhận."
        ]
      }
    ]
  },
  {
    id: 1648,
    slug: "frm-bat-on-ngan-hang-2023-bai-hoc",
    title: "FRM Current Issues, Bài 9: Bất ổn ngân hàng 2023 và ba bài học",
    subtitle: "Rủi ro lãi suất trong sổ ngân hàng, tiền gửi không bảo hiểm, và tốc độ rút tiền thời số hoá",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🏦",
    track: "professional",
    whyItMatters: "Đây là đợt căng thẳng ngân hàng lớn nhất kể từ 2008, và điều đáng chú ý là nó không đến từ rủi ro tín dụng. Nó là bài kiểm tra thực tế cho gần như mọi chương trong FRM Part II cùng lúc.",
    openingQuestion: "Nguyên nhân trực tiếp dẫn tới đợt bất ổn ngân hàng năm 2023 ở Mỹ là gì?",
    openingOptions: [
      "Lỗ chưa thực hiện trên danh mục trái phiếu khi lãi suất tăng mạnh",
      "Tỷ lệ nợ xấu tăng vọt trong danh mục cho vay bất động sản thương mại",
      "Gian lận nội bộ quy mô lớn tại bộ phận giao dịch tự doanh",
      "Sự cố công nghệ kéo dài làm gián đoạn hệ thống thanh toán liên ngân hàng"
    ],
    correctOption: 0,
    explanation: "Đợt bất ổn 2023 khác 2008 ở chỗ khoản lỗ không đến từ người vay mất khả năng trả nợ. Nó đến từ trái phiếu chính phủ - tài sản không có rủi ro tín dụng - mất giá khi lãi suất tăng, trong khi phần lớn tiền gửi lại không được bảo hiểm nên rất nhạy cảm. Ba bài học rút ra: rủi ro lãi suất trên sổ ngân hàng có thể lớn ngang rủi ro tín dụng; cơ cấu người gửi tiền quan trọng ngang tổng số dư; và tốc độ rút tiền thời ngân hàng số đã vượt xa giả định mà chuẩn thanh khoản được xây trên đó.",
    diagram: [
      {
        label: "Lãi suất tăng nhanh → danh mục trái phiếu lỗ chưa thực hiện",
        arrow: true
      },
      {
        label: "Tiền gửi phần lớn không bảo hiểm, tập trung một nhóm khách",
        arrow: true
      },
      {
        label: "Tin lan trên mạng xã hội, rút tiền qua ứng dụng trong vài giờ",
        arrow: true
      },
      {
        label: "Bán tài sản lỗ để trả → lỗ thành hiện thực → mất khả năng thanh toán"
      }
    ],
    realWorldExample: {
      company: "Vì sao phân loại kế toán giấu được vấn đề một thời gian",
      description: "Trái phiếu xếp vào nhóm giữ tới đáo hạn không phải đánh giá lại theo giá thị trường trên báo cáo, nên khoản lỗ chưa thực hiện không hiện ra ở vốn chủ sở hữu công bố. Trên giấy tờ ngân hàng vẫn đủ vốn. Nhưng khi buộc phải bán để đáp ứng lệnh rút, phân loại kế toán không cứu được ai - khoản lỗ trở thành hiện thực đúng vào lúc tệ nhất."
    },
    quiz: [
      {
        question: "Vì sao tỷ lệ tiền gửi không được bảo hiểm cao lại là yếu tố khuếch đại?",
        options: [
          "Vì người gửi vượt hạn mức bảo hiểm có động cơ rút trước tất cả những người khác",
          "Vì tiền gửi không bảo hiểm phải chịu lãi suất cao hơn làm tăng chi phí vốn",
          "Vì cơ quan quản lý yêu cầu giữ thêm vốn cho phần tiền gửi không bảo hiểm",
          "Vì loại tiền gửi này không được tính vào tỷ lệ bao phủ thanh khoản"
        ],
        correct: 0,
        explanation: "Bảo hiểm tiền gửi tồn tại chính để triệt tiêu động cơ chạy trước: nếu tiền được bảo đảm thì không việc gì phải vội. Khi phần lớn số dư vượt hạn mức, cơ chế hãm đó biến mất và tháo chạy trở thành phản ứng hợp lý của từng cá nhân."
      },
      {
        question: "Bài học về tốc độ mà đợt bất ổn này để lại là gì?",
        options: [
          "Rút tiền qua ứng dụng cộng tin lan trên mạng xã hội nhanh hơn mọi tiền lệ",
          "Các cơ quan quản lý cần rút ngắn thời gian công bố báo cáo tài chính quý",
          "Ngân hàng cần tăng số lượng chi nhánh vật lý để phân tán dòng người rút tiền",
          "Thị trường liên ngân hàng cần được mở cửa hai mươi bốn giờ mỗi ngày"
        ],
        correct: 0,
        explanation: "Các mô hình thanh khoản được hiệu chỉnh trên những đợt tháo chạy trong quá khứ, khi người gửi phải xếp hàng ở quầy. Đợt này cho thấy giả định tốc độ đó đã lạc hậu về mặt cấu trúc chứ không chỉ về mặt tham số."
      },
      {
        question: "Vì sao đợt này được xem như bài kiểm tra cho quản trị tài sản - nợ?",
        options: [
          "Vì thất bại nằm ở việc không phòng hộ rủi ro lãi suất giữa tài sản dài và nguồn vốn ngắn",
          "Vì các ngân hàng liên quan đều không có bộ phận quản trị rủi ro tín dụng",
          "Vì nguyên nhân chính là chênh lệch tỷ giá giữa tài sản và nguồn vốn ngoại tệ",
          "Vì các ngân hàng đã cho vay vượt quá giới hạn với một nhóm khách hàng liên quan"
        ],
        correct: 0,
        explanation: "Đây đúng là bài toán khớp duration ở dạng kinh điển: tài sản dài hạn lãi cố định, nguồn vốn ngắn hạn có thể rút bất cứ lúc nào, và không có phòng hộ lãi suất tương xứng. Chương ALM/IRRBB mô tả chính xác kịch bản này từ trước khi nó xảy ra."
      }
    ,
    {
      "question": "Vì sao khoản lỗ chưa thực hiện trên danh mục giữ đến đáo hạn lại trở thành vấn đề thật vào năm 2023?",
      "options": [
        "Rút tiền ồ ạt buộc phải bán, lỗ trên sổ thành lỗ thật",
        "Vì chuẩn mực kế toán 2023 buộc ghi theo giá thị trường",
        "Vì trái phiếu trong danh mục bị hạ xếp hạng",
        "Vì cơ quan quản lý buộc bán toàn bộ danh mục"
      ],
      "correct": 0,
      "explanation": "Phân loại giữ đến đáo hạn cho phép không ghi nhận biến động giá - hợp lý nếu thật sự giữ được tới cuối. Nhưng khi người gửi rút hàng loạt, ngân hàng buộc bán trước hạn, và phân loại kế toán không cứu được điều đó."
    },
    {
      "question": "Bài học về tốc độ mà đợt bất ổn 2023 để lại là gì?",
      "options": [
        "Giả định dòng rút trải ba mươi ngày đã lỗi thời",
        "Cơ quan quản lý cần ba ngày để can thiệp",
        "Tin lan trên mạng xã hội chỉ hại các ngân hàng nhỏ",
        "Ngân hàng cần tăng vốn để bù tốc độ rút"
      ],
      "correct": 0,
      "explanation": "Chuẩn thanh khoản được xây trên hình dung về hàng người xếp trước quầy. Khi chuyển tiền chỉ mất vài thao tác và tin lan trong vài giờ, cả tháng đệm bị nén thành một buổi chiều - và không lượng tài sản thanh khoản nào bán kịp."
    }
    ],
    practicePrompt: {
      question:
        "Một ngân hàng có danh mục giữ tới đáo hạn 90.000 tỷ đang lỗ chưa thực hiện 12.000 tỷ, trong khi vốn chủ sở hữu ghi sổ là 10.000 tỷ. Nhận định nào đúng?",
      options: [
        "Vốn kinh tế đã âm, dù báo cáo vẫn cho thấy đủ vốn",
        "Vẫn an toàn vì lỗ chưa thực hiện không phải lỗ thật",
        "Chỉ thành vấn đề nếu chất lượng tín dụng xấu đi",
        "Đủ vốn, vì giữ tới đáo hạn thì thu về đủ mệnh giá",
      ],
      correct: 0,
      explanation:
        "Phân loại giữ tới đáo hạn cho phép không ghi nhận biến động giá vào vốn, nên báo cáo vẫn hiển thị 10.000 tỷ vốn chủ. Nhưng nếu bán ra hôm nay thì khoản lỗ 12.000 tỷ thành thật và vốn chủ âm 2.000 tỷ. Lập luận 'giữ tới đáo hạn thì thu đủ mệnh giá' đúng về mặt số học và vô dụng về mặt thanh khoản: nó chỉ thành lập nếu ngân hàng KHÔNG BAO GIỜ PHẢI BÁN, mà cái buộc phải bán chính là người gửi tiền rút. Đây là điểm khác 2008: khoản lỗ đến từ rủi ro lãi suất chưa phòng hộ, không từ tín dụng, nên soi chất lượng khoản vay sẽ không thấy gì.",
    },
    keyTakeaways: [
      "Khoản lỗ đến từ rủi ro lãi suất, không phải rủi ro tín dụng - khác hẳn 2008",
      "Phân loại giữ tới đáo hạn giấu được lỗ trên báo cáo nhưng không cứu được khi phải bán",
      "Tiền gửi không bảo hiểm tập trung tạo động cơ chạy trước rất mạnh",
      "Tốc độ rút tiền thời ứng dụng và mạng xã hội vượt xa mọi mô hình hiệu chỉnh từ lịch sử"
    ],
    summary: {
      keyIdea: "Một ngân hàng có thể đủ vốn trên báo cáo và vẫn sụp trong vài ngày, khi rủi ro lãi suất chưa phòng hộ gặp nguồn vốn có thể bốc hơi trong vài giờ",
      commonMistake: "Đọc vốn chủ sở hữu công bố như thước đo sức chịu đựng mà không xem lỗ chưa thực hiện trong danh mục giữ tới đáo hạn",
      action: "Khi phân tích một ngân hàng, tìm hai con số: lỗ chưa thực hiện trên danh mục trái phiếu và tỷ lệ tiền gửi không được bảo hiểm"
    },
    application: {
      title: "Hai con số cần tìm",
      message: "Trong thuyết minh báo cáo tài chính ngân hàng, tìm giá trị hợp lý của danh mục giữ tới đáo hạn và so với giá trị ghi sổ. Chênh lệch đó là khoản lỗ chưa hiện ra ở vốn chủ sở hữu.",
      secondary: "Đối chiếu tiếp với tỷ lệ tiền gửi không bảo hiểm là ra được bức tranh mà đợt 2023 đã dạy cả ngành."
    },
    sections: [
      {
        type: "lead",
        text: "Điều đáng học nhất ở đợt bất ổn 2023 không phải là quy mô, mà là việc nó xảy ra mà gần như không có khoản nợ xấu nào."
      },
      {
        type: "heading",
        text: "Chuỗi nhân quả"
      },
      {
        type: "paragraph",
        text: "Lãi suất tăng nhanh làm danh mục trái phiếu dài hạn mất giá. Khoản lỗ đó chưa hiện trên báo cáo nhờ phân loại giữ tới đáo hạn. Nhưng nguồn vốn lại là tiền gửi phần lớn không được bảo hiểm và tập trung ở một nhóm khách hàng giống nhau. Khi nghi ngờ xuất hiện, việc rút tiền diễn ra qua ứng dụng trong vài giờ, buộc bán trái phiếu và biến khoản lỗ trên giấy thành lỗ thật."
      },
      {
        type: "list",
        items: [
          "Bài học một: rủi ro lãi suất trong sổ ngân hàng đủ sức đánh sập một ngân hàng, không cần nợ xấu",
          "Bài học hai: cơ cấu tiền gửi quan trọng ngang quy mô tiền gửi - không bảo hiểm và tập trung là tổ hợp dễ vỡ nhất",
          "Bài học ba: giả định tốc độ rút tiền hiệu chỉnh từ lịch sử đã lạc hậu về cấu trúc"
        ]
      },
      {
        type: "callout",
        label: "Vì sao phân loại kế toán không cứu được ai",
        text: "Giữ tới đáo hạn là một ý định, không phải một khả năng. Ý định đó chỉ giữ được chừng nào không ai buộc bạn bán - và đúng vào lúc người gửi rút tiền đồng loạt thì bạn buộc phải bán. Lúc ấy khoản lỗ chưa thực hiện trở thành khoản lỗ thực hiện ngay lập tức."
      },
      {
        type: "heading",
        text: "Ba con số làm rõ vì sao lần này khác"
      },
      {
        type: "conceptTable",
        title: "Không phải quy mô, mà là cấu trúc và tốc độ",
        subtitle: "Cả ba đều đọc được từ báo cáo công khai trước khi sự việc xảy ra",
        concepts: [
          {
            vi: "Tỷ trọng tiền gửi không được bảo hiểm",
            en: "Uninsured deposits",
            def: "Ở ngân hàng đổ vỡ đầu tiên, phần lớn tiền gửi vượt hạn mức bảo hiểm - theo các báo cáo là khoảng 90% trở lên. Người gửi vượt hạn mức không có lý do gì để ở lại chờ xem, nên cả nhóm này hành xử như một khối."
          },
          {
            vi: "Lỗ chưa ghi nhận trên danh mục giữ tới đáo hạn",
            en: "Unrealised HTM losses",
            def: "Lãi suất tăng nhanh làm danh mục trái phiếu dài hạn mất giá, nhưng phân loại giữ tới đáo hạn cho phép không ghi nhận khoản lỗ đó vào vốn. Con số ẩn ấy đủ lớn để xoá phần lớn vốn chủ sở hữu nếu buộc phải bán."
          },
          {
            vi: "Tốc độ rút tiền",
            en: "Run speed",
            def: "Năm 2008, một vụ tháo chạy lớn diễn ra trong khoảng chục ngày. Năm 2023, lượng rút tương đương xảy ra trong một ngày - vì lệnh chuyển tiền đi qua ứng dụng và tin lan qua mạng xã hội chứ không qua hàng người xếp trước quầy."
          }
        ]
      },
      {
        type: "callout",
        label: "Vì sao chuỗi này khép kín",
        text: "Ba con số trên không độc lập, chúng kích hoạt lẫn nhau. Người gửi không được bảo hiểm đọc được khoản lỗ chưa ghi nhận, nên rút. Rút nhiều buộc ngân hàng bán danh mục, mà bán thì khoản lỗ đang ẩn hiện ra thành lỗ thật và ăn vào vốn. Vốn giảm làm người gửi còn lại rút nhanh hơn. Không bước nào cần một khoản nợ xấu nào, và đó là điều đáng học nhất: một ngân hàng có thể đủ vốn theo mọi tỷ lệ quy định và vẫn không sống qua được một tuần."
      },
      {
        type: "closing",
        lines: [
          "Vốn đủ trên báo cáo và sống sót qua tuần này là hai câu hỏi khác nhau.",
          "Đây là bài cuối của phần Current Issues mở rộng."
        ]
      }
    ]
  }
];
