import type { Lesson } from "./lesson-types";

// Chặng 13 của track cá nhân: vàng, ngoại tệ và tỷ giá.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Vàng là kênh giữ tiền phổ biến bậc nhất ở Việt
// Nam - nhiều gia đình quy tài sản ra lượng trước khi quy ra tiền - và trước
// chặng này track cá nhân có ĐÚNG 0 bài về nó. Người học biết tính duration
// của trái phiếu nhưng không biết chênh lệch mua-bán của một lượng vàng miếng
// là bao nhiêu, hay vì sao giá SJC lệch hẳn giá thế giới.
//
// Ids 320-327 nối tiếp Chặng 12 (310-319) trong dải 299-800.
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts và lib/personal-banking-lessons.ts.

export const GOLD_FX_LESSONS: Lesson[] = [
  {
    id: 320,
    slug: "vang-la-gi-ve-mat-tai-chinh",
    title: "Chặng 13, Bài 1: Vàng là gì về mặt tài chính",
    subtitle: "Một tài sản không sinh ra dòng tiền nào - và điều đó quyết định mọi thứ còn lại",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🪙",
    track: "personal",
    whyItMatters:
      "Vàng được nhắc tới ở Việt Nam nhiều hơn mọi tài sản khác cộng lại, nhưng gần như luôn dưới dạng cảm nhận: vàng an toàn, vàng giữ giá, vàng chống lạm phát. Đặt nó vào đúng khung tài chính thì những câu ấy có cái đúng và có cái không, và phân biệt được là điều kiện để quyết định giữ bao nhiêu.",
    openingQuestion: "Khác biệt cơ bản nhất giữa vàng và cổ phiếu hay trái phiếu là gì?",
    openingOptions: [
      "Vàng không tạo ra dòng tiền nào, nên toàn bộ lợi nhuận đến từ giá bán lại",
      "Vàng luôn tăng giá theo thời gian trong khi cổ phiếu có thể giảm về không",
      "Vàng không chịu tác động của lạm phát vì nó là kim loại có giá trị tự thân",
      "Vàng được nhà nước bảo đảm giá trị nên không bao giờ mất giá hoàn toàn",
    ],
    correctOption: 0,
    explanation:
      "Một doanh nghiệp tạo ra lợi nhuận và trả cổ tức; một trái phiếu trả coupon. Vàng không làm gì cả - một lượng vàng sau mười năm vẫn đúng là một lượng vàng. Toàn bộ khoản lãi hay lỗ của bạn đến từ chênh lệch giữa giá mua và giá bán, không có phần nào đến từ hoạt động của chính tài sản. Hệ quả rất thực dụng: giá vàng được quyết định bởi cung cầu và tâm lý chứ không neo vào một dòng tiền nào để định giá, nên không tồn tại khái niệm vàng đang rẻ hay đắt theo cách người ta nói P/E của cổ phiếu. Vàng cũng không được nhà nước bảo đảm giá, và nó vẫn có những giai đoạn giảm nhiều năm liền.",
    diagram: [
      { label: "Cổ phiếu: doanh nghiệp tạo lợi nhuận", arrow: true },
      { label: "Trái phiếu: người vay trả coupon", arrow: true },
      { label: "Vàng: không tạo ra gì cả", arrow: true },
      { label: "Nên lãi lỗ chỉ đến từ giá bán lại" },
    ],
    realWorldExample: {
      company: "Một lượng vàng sau mười năm",
      description:
        "Gửi 100 triệu vào sổ tiết kiệm mười năm ở mức 6% cho khoảng 179 triệu, và phần tăng thêm đến từ tiền lãi mà ngân hàng trả. Mua vàng bằng 100 triệu thì sau mười năm bạn vẫn có đúng số vàng đã mua - không nhiều hơn một chỉ nào. Tài khoản của bạn thay đổi chỉ vì giá vàng đã đổi, và nó có thể đổi theo cả hai chiều.",
    },
    quiz: [
      {
        question: "Vì sao không thể định giá vàng theo cách định giá cổ phiếu?",
        options: [
          "Vì vàng không có dòng tiền tương lai nào để chiết khấu về hiện tại",
          "Vì giá vàng do ngân hàng nhà nước công bố nên không theo quy luật thị trường",
          "Vì trữ lượng vàng trên thế giới là cố định nên giá luôn tăng theo thời gian",
          "Vì vàng được giao dịch bằng đô la Mỹ nên phải quy đổi qua tỷ giá trước",
        ],
        correct: 0,
        explanation:
          "Mọi phương pháp định giá đều quy về việc ước lượng dòng tiền tương lai. Không có dòng tiền thì không có mẫu số, nên câu hỏi vàng đang đắt hay rẻ không có lời đáp theo cùng nghĩa với cổ phiếu.",
      },
      {
        question: "Câu nào mô tả đúng rủi ro của vàng?",
        options: [
          "Giá có thể giảm và đã từng đi ngang hoặc giảm trong nhiều năm liền",
          "Vàng chỉ mất giá khi bị làm giả hoặc khi hàm lượng vàng không đủ tuổi",
          "Rủi ro duy nhất là mất cắp vì giá vàng về dài hạn luôn tăng đều đặn",
          "Vàng chỉ giảm giá khi ngân hàng nhà nước điều chỉnh chính sách quản lý",
        ],
        correct: 0,
        explanation:
          "Cảm giác vàng luôn tăng đến từ việc nhìn vào những giai đoạn nó tăng mạnh. Có những quãng nhiều năm giá vàng đi ngang hoặc giảm, và người mua ở đỉnh của một chu kỳ phải chờ rất lâu mới hòa vốn.",
      },
      {
        question: "Vàng và tiền gửi khác nhau thế nào về nguồn sinh lời?",
        options: [
          "Tiền gửi trả lãi đều đặn còn vàng chỉ lãi khi bán được giá cao hơn lúc mua",
          "Cả hai đều trả lãi nhưng vàng trả bằng hiện vật thay vì trả bằng tiền mặt",
          "Vàng sinh lời cao hơn nên nó thay thế được vai trò của tiền gửi tiết kiệm",
          "Tiền gửi phụ thuộc vào ngân hàng còn vàng phụ thuộc vào giá thế giới",
        ],
        correct: 0,
        explanation:
          "Đây là điểm phân biệt quan trọng nhất khi so hai kênh. Tiền gửi có phần sinh lời không phụ thuộc vào việc bạn bán lại được giá nào; vàng thì toàn bộ kết quả nằm ở giá bán.",
      },
      {
        question: "Giữ vàng có chi phí gì mà nhiều người bỏ qua?",
        options: [
          "Chi phí cơ hội: cùng số tiền đó ở kênh khác đã sinh lãi trong suốt thời gian nắm giữ",
          "Phí lưu ký bắt buộc mà cửa hàng vàng thu theo một tỷ lệ phần trăm cố định mỗi năm",
          "Thuế tài sản đánh trên giá trị vàng nắm giữ vượt một ngưỡng nhất định",
          "Phí kiểm định tuổi vàng bắt buộc phải làm lại định kỳ mỗi hai năm",
        ],
        correct: 0,
        explanation:
          "Chi phí cơ hội là khoản không xuất hiện trên bất kỳ hóa đơn nào nên rất dễ bỏ qua. Giữ 200 triệu bằng vàng suốt năm năm trong lúc tiền gửi trả 6% nghĩa là đã bỏ lại khoảng 68 triệu tiền lãi.",
      },
      {
        question: "Vai trò hợp lý nhất của vàng trong tài chính cá nhân là gì?",
        options: [
          "Một phần nhỏ của danh mục nhằm phân tán rủi ro, không phải kênh tích lũy chính",
          "Kênh tích lũy chính vì nó an toàn hơn mọi tài sản tài chính khác",
          "Nơi giữ quỹ khẩn cấp vì vàng luôn bán được ngay khi cần tiền gấp",
          "Kênh thay thế hoàn toàn cho tiền gửi trong giai đoạn lãi suất ngân hàng xuống thấp",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp cần giá trị ổn định khi cần dùng, mà giá vàng có thể đang thấp đúng lúc bạn có việc. Còn làm kênh tích lũy chính thì mâu thuẫn với chính đặc điểm không sinh dòng tiền của nó.",
      },
    ],
    keyTakeaways: [
      "Vàng không tạo ra dòng tiền - toàn bộ lãi lỗ đến từ chênh lệch giá mua và giá bán",
      "Không có dòng tiền thì không định giá được theo cách định giá cổ phiếu hay trái phiếu",
      "Giá vàng có thể giảm, và đã từng đi ngang nhiều năm liền",
      "Chi phí lớn nhất của việc giữ vàng là chi phí cơ hội, và nó không hiện trên hóa đơn nào",
    ],
    practicePrompt: {
      question:
        "Một người nói giữ vàng an toàn hơn gửi tiết kiệm vì vàng không mất giá. Chỗ sai là gì?",
      options: [
        "Vàng biến động giá mạnh hơn tiền gửi, nên nó rủi ro hơn chứ không an toàn hơn",
        "Vàng đúng là an toàn hơn nhưng chỉ với vàng miếng có thương hiệu lớn",
        "Không sai, vì vàng đã giữ được giá trị qua hàng nghìn năm lịch sử",
        "Chỉ sai khi lạm phát đang ở mức thấp, còn khi lạm phát lên cao thì câu đó đúng",
      ],
      correct: 0,
      explanation:
        "Từ an toàn đang bị dùng cho hai nghĩa khác nhau. Vàng không phá sản như một doanh nghiệp, nhưng giá của nó dao động mạnh hơn số dư tiền gửi rất nhiều - và với người cần dùng tiền vào một thời điểm cụ thể thì dao động ấy chính là rủi ro.",
    },
    summary: {
      keyIdea: "Vàng là tài sản không sinh dòng tiền, nên mọi kết quả nằm ở giá bán lại",
      commonMistake: "Coi vàng là kênh tích lũy an toàn hơn tiền gửi, và bỏ qua chi phí cơ hội của nhiều năm không lãi",
      action: "Tính xem số tiền bạn đang giữ bằng vàng sẽ sinh bao nhiêu lãi nếu ở tiền gửi cùng kỳ.",
    },
    application: {
      title: "Đặt vàng cạnh một kênh có lãi",
      message:
        "Lấy giá trị số vàng bạn đang giữ, nhân với lãi suất tiền gửi hiện hành và số năm bạn đã giữ. Đó là chi phí cơ hội - khoản bạn đã trả để đổi lấy đặc tính của vàng.",
      secondary:
        "Con số đó không nói rằng giữ vàng là sai. Nó chỉ cho biết cái giá, để bạn quyết định có đáng hay không thay vì mặc định là miễn phí.",
    },
    sections: [
      {
        type: "lead",
        text: "Ở Việt Nam, vàng không chỉ là một tài sản mà còn là một đơn vị đo - người ta quy giá nhà ra lượng, quy của hồi môn ra chỉ. Chặng này không bàn về thói quen đó, nó chỉ đặt vàng vào cùng khung mà chín chặng trước đã dùng cho mọi tài sản khác.",
      },
      { type: "heading", text: "Câu hỏi đầu tiên với mọi tài sản: nó tạo ra cái gì" },
      {
        type: "paragraph",
        text: "Một doanh nghiệp bán hàng và tạo ra lợi nhuận. Một khoản cho vay tạo ra lãi. Một căn nhà cho thuê tạo ra tiền thuê. Vàng không tạo ra gì - đó không phải lời chê, đó là một đặc điểm, và nó dẫn tới hai hệ quả. Thứ nhất, không có dòng tiền để chiết khấu nên không định giá được theo cách thông thường. Thứ hai, khoản lãi duy nhất có thể có là chênh lệch giá, tức là phải có người mua lại với giá cao hơn.",
      },
      {
        type: "conceptTable",
        title: "Ba nguồn sinh lời, vàng chỉ có một",
        subtitle: "Đây là lý do vàng hành xử khác mọi tài sản trong các chặng trước",
        concepts: [
          {
            vi: "Dòng tiền từ tài sản",
            en: "Income",
            def: "Cổ tức, coupon, tiền thuê, lãi tiền gửi. Đến đều đặn và không phụ thuộc vào việc bạn bán được giá nào.",
          },
          {
            vi: "Tăng trưởng nội tại",
            en: "Growth",
            def: "Doanh nghiệp lớn lên nên phần sở hữu của bạn đáng giá hơn. Vàng không có cơ chế này - một lượng vẫn là một lượng.",
          },
          {
            vi: "Chênh lệch giá",
            en: "Price change",
            def: "Nguồn duy nhất của vàng. Nó phụ thuộc vào cung cầu và tâm lý thị trường chứ không neo vào kết quả hoạt động nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không sinh dòng tiền không có nghĩa là vô dụng",
        text: "Vàng có một tính chất mà các tài sản trên không có: nó thường không đi cùng chiều với thị trường cổ phiếu trong các giai đoạn khủng hoảng. Đó là lý do chính đáng để giữ một phần nhỏ trong danh mục - và cũng là lý do phần đó nên nhỏ, vì đổi lại nó không trả cho bạn đồng nào trong suốt thời gian nắm giữ.",
      },
      {
        type: "closing",
        lines: [
          "Vàng không xấu và cũng không thần kỳ; nó là một tài sản có một đặc điểm rất khác các tài sản khác.",
          "Bài sau: ở Việt Nam, cùng là vàng nhưng mua loại nào lại ra hai kết quả rất khác nhau.",
        ],
      },
    ],
  },
  {
    id: 321,
    slug: "vang-mieng-vang-nhan-chenh-lech",
    title: "Chặng 13, Bài 2: Vàng miếng và vàng nhẫn - cùng là vàng, khác giá",
    subtitle: "Phần chênh lệch bạn trả cho thương hiệu không quay lại khi bán",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🏷️",
    track: "personal",
    whyItMatters:
      "Người mua vàng thường chọn theo thói quen hoặc theo lời khuyên truyền miệng, mà hai loại phổ biến nhất ở Việt Nam có cấu trúc giá khác hẳn nhau. Chọn sai loại cho mục đích của mình có thể tốn vài phần trăm giá trị ngay tại thời điểm mua.",
    openingQuestion:
      "Vàng miếng thương hiệu lớn thường đắt hơn vàng nhẫn cùng hàm lượng. Phần chênh lệch đó là gì?",
    openingOptions: [
      "Phần bù cho thương hiệu và tính khan hiếm, không phải cho lượng vàng nhiều hơn",
      "Phần vàng nhiều hơn vì vàng miếng có hàm lượng cao hơn hẳn vàng nhẫn",
      "Phần thuế giá trị gia tăng mà nhà nước thu thêm trên riêng sản phẩm vàng miếng",
      "Phần chi phí gia công và đúc khuôn cao hơn so với chế tác vàng nhẫn trơn",
    ],
    correctOption: 0,
    explanation:
      "Cả hai đều có thể cùng hàm lượng, nên số vàng thật trong một lượng là như nhau. Phần chênh lệch đến từ thương hiệu, từ nguồn cung hạn chế của loại được quản lý chặt, và từ tâm lý thị trường quen coi loại đó là chuẩn. Điều quan trọng không phải phần bù ấy hợp lý hay không, mà là nó có xu hướng thay đổi theo thời gian - nó có thể nới rộng ra hoặc thu hẹp lại độc lập với giá vàng thế giới. Người mua ở lúc phần bù đang rộng và bán ra lúc nó đã thu hẹp sẽ lỗ ngay cả khi giá vàng thế giới không đổi.",
    diagram: [
      { label: "Giá vàng thế giới", arrow: true },
      { label: "Cộng phần bù thương hiệu và nguồn cung", arrow: true },
      { label: "Ra giá niêm yết trong nước", arrow: true },
      { label: "Phần bù tự nó cũng thay đổi theo thời gian" },
    ],
    realWorldExample: {
      company: "Cùng một chỉ vàng, hai mức giá",
      description:
        "Một người mua vàng miếng lúc phần bù so với vàng nhẫn đang rất rộng. Vài năm sau, giá vàng thế giới tăng nhưng phần bù đã thu hẹp đáng kể, nên mức tăng thực nhận thấp hơn hẳn so với người mua vàng nhẫn cùng thời điểm. Cả hai đều mua vàng, đều đúng về xu hướng giá, nhưng một người còn đặt cược thêm vào phần bù mà không biết mình đang đặt cược.",
    },
    quiz: [
      {
        question: "Vàng miếng và vàng nhẫn 9999 khác nhau chủ yếu ở đâu?",
        options: [
          "Ở phần bù giá do thương hiệu và nguồn cung, không ở hàm lượng vàng",
          "Ở hàm lượng vàng nguyên chất chứa trong mỗi đơn vị sản phẩm bán ra",
          "Ở việc vàng miếng được nhà nước bảo đảm mua lại theo giá niêm yết",
          "Ở thời gian cần thiết để bán lại khi chủ sở hữu cần tiền mặt gấp",
        ],
        correct: 0,
        explanation:
          "Khi cùng tuổi vàng thì lượng kim loại quý là như nhau. Toàn bộ khác biệt nằm ở lớp giá phủ bên trên, và lớp đó là thứ dao động độc lập với giá vàng thế giới.",
      },
      {
        question: "Vì sao phần bù thương hiệu là một rủi ro riêng?",
        options: [
          "Vì nó co giãn theo thời gian nên có thể mất đi dù giá vàng thế giới vẫn tăng",
          "Vì nó bị đánh thuế riêng khi bán lại nếu vượt một ngưỡng giá trị nhất định",
          "Vì cửa hàng vàng có quyền từ chối mua lại sản phẩm không phải thương hiệu của họ",
          "Vì phần bù chỉ được tính khi mua chứ không bao giờ được tính khi bán ra",
        ],
        correct: 0,
        explanation:
          "Mua vàng miếng là mua hai thứ cùng lúc: giá vàng và phần bù. Người mua thường chỉ theo dõi thứ nhất, trong khi thứ hai có thể biến động mạnh không kém.",
      },
      {
        question: "Với người mua để tích lũy dài hạn, loại nào thường hợp lý hơn?",
        options: [
          "Loại bám sát giá vàng thế giới nhất, vì nó ít phụ thuộc vào biến động phần bù",
          "Loại có thương hiệu lớn nhất, vì nó luôn dễ bán lại với giá cao hơn",
          "Loại có mẫu mã đẹp nhất, vì giá trị thẩm mỹ sẽ tăng theo thời gian",
          "Loại được đóng gói kèm giấy chứng nhận, vì giấy tờ đi kèm làm tăng giá bán lại",
        ],
        correct: 0,
        explanation:
          "Nếu mục đích là nắm giữ giá trị của kim loại, thì mọi lớp giá phủ bên trên đều là biến số thêm vào chứ không phải giá trị thêm vào. Vàng trang sức có công chế tác không thu lại được, nên nó lại càng không hợp cho mục đích này.",
      },
      {
        question: "Vàng trang sức khác hai loại trên ở điểm nào?",
        options: [
          "Giá bán bao gồm công chế tác, và phần công đó gần như không thu lại khi bán",
          "Vàng trang sức có hàm lượng cao hơn nên giá trị nội tại lớn hơn hẳn",
          "Vàng trang sức được miễn hoàn toàn phần chênh lệch giữa giá mua và giá bán",
          "Vàng trang sức luôn được các cửa hàng mua lại theo đúng giá niêm yết trong ngày",
        ],
        correct: 0,
        explanation:
          "Công chế tác là dịch vụ đã được tiêu dùng, nên nó không nằm lại trong giá trị bán lại. Đó là lý do vàng trang sức là món đồ đeo chứ không phải công cụ tích lũy.",
      },
      {
        question: "Điều gì nên kiểm tra trước khi mua bất kỳ loại vàng nào?",
        options: [
          "Chênh lệch giữa giá mua vào và giá bán ra mà cửa hàng đang niêm yết",
          "Số năm mà thương hiệu đó đã hoạt động trên thị trường trong nước",
          "Trọng lượng sản phẩm có phải số tròn hay không để dễ bán lại về sau",
          "Mẫu mã sản phẩm có đang được nhiều người tìm mua trong thời điểm đó",
        ],
        correct: 0,
        explanation:
          "Chênh lệch mua-bán là khoản lỗ bạn gánh ngay tại giây đầu tiên sau khi mua, và nó khác nhau khá nhiều giữa các loại vàng. Bài sau sẽ nói kỹ về con số này.",
      },
    ],
    keyTakeaways: [
      "Cùng hàm lượng thì lượng vàng thật như nhau - khác biệt nằm ở phần bù phủ bên trên",
      "Phần bù co giãn độc lập với giá vàng thế giới, nên nó là một rủi ro riêng",
      "Mua để tích lũy thì loại bám sát giá thế giới ít biến số hơn",
      "Vàng trang sức mang công chế tác không thu lại được khi bán",
    ],
    practicePrompt: {
      question:
        "Bạn muốn tích lũy vàng đều đặn mỗi tháng một khoản nhỏ. Yếu tố nào nên cân nhắc đầu tiên?",
      options: [
        "Chênh lệch mua-bán và mức phần bù, vì bạn sẽ trả chúng ở mọi lần mua",
        "Thương hiệu nào đang được nhiều người mua nhất tại thời điểm hiện tại",
        "Kích thước sản phẩm lớn nhất mà ngân sách hằng tháng của bạn cho phép",
        "Cửa hàng nào gần nhà nhất để tiện việc mua và cất giữ hằng tháng",
      ],
      correct: 0,
      explanation:
        "Mua đều đặn nghĩa là trả chi phí giao dịch đều đặn, nên một khoản chênh lệch tưởng nhỏ sẽ lặp lại hàng chục lần. Đó là biến có tác động lớn nhất tới kết quả cuối cùng của một kế hoạch tích lũy dài hạn.",
    },
    summary: {
      keyIdea: "Mua vàng miếng là đặt cược vào hai thứ: giá vàng và phần bù thương hiệu",
      commonMistake: "Chỉ theo dõi giá vàng thế giới mà không biết phần bù cũng đang dao động",
      action: "Trước khi mua, so giá của loại bạn định mua với loại bám sát giá thế giới nhất.",
    },
    application: {
      title: "So hai loại trong cùng một ngày",
      message:
        "Mở bảng giá của một cửa hàng lớn, ghi giá mua vào và bán ra của cả vàng miếng lẫn vàng nhẫn cùng tuổi. Khoảng cách giữa hai loại chính là phần bù bạn sắp trả.",
      secondary:
        "Làm lại sau vài tháng. Nếu khoảng cách đó đã thay đổi đáng kể, bạn vừa thấy tận mắt biến số mà bài này nói tới.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói vàng là một tài sản không sinh dòng tiền. Bài này thêm một lớp nữa mà chỉ thị trường Việt Nam mới có: cùng một khối lượng vàng nguyên chất, mua ở hai dạng khác nhau thì trả hai mức giá khác nhau.",
      },
      { type: "heading", text: "Cùng kim loại, khác lớp giá" },
      {
        type: "paragraph",
        text: "Khi hai sản phẩm cùng tuổi vàng, số kim loại quý trong đó là như nhau. Phần chênh lệch giá đến từ những thứ nằm ngoài kim loại: thương hiệu, mức độ khan hiếm của nguồn cung, và thói quen thị trường coi một loại là chuẩn. Vấn đề không nằm ở chỗ phần bù ấy tồn tại - nó tồn tại vì có người sẵn sàng trả. Vấn đề là nó dao động, và người mua thường không theo dõi nó.",
      },
      {
        type: "conceptTable",
        title: "Ba dạng vàng, ba mục đích khác nhau",
        subtitle: "Chọn sai dạng cho mục đích là mất tiền ngay tại lúc mua",
        concepts: [
          {
            vi: "Vàng miếng thương hiệu",
            en: "Branded bar",
            def: "Phần bù cao nhất, thanh khoản tốt trong nước. Mua nó là mua cả giá vàng lẫn phần bù, và phần bù có thể thu hẹp.",
          },
          {
            vi: "Vàng nhẫn trơn",
            en: "Plain ring",
            def: "Bám sát giá vàng thế giới hơn, phần bù mỏng hơn. Hợp với người muốn nắm giữ đúng giá trị của kim loại.",
          },
          {
            vi: "Vàng trang sức",
            en: "Jewellery",
            def: "Giá gồm công chế tác, và phần công gần như mất trắng khi bán. Đây là món đồ đeo, không phải công cụ tích lũy.",
          },
        ],
      },
      {
        type: "callout",
        label: "Hai đặt cược trong một lần mua",
        text: "Khi mua vàng miếng, bạn đồng thời đặt cược rằng giá vàng sẽ tăng và rằng phần bù sẽ không thu hẹp. Nhiều người chỉ nhận ra vế thứ hai khi bán ra và thấy mức lãi thấp hơn hẳn so với đà tăng của giá vàng thế giới mà họ vẫn theo dõi.",
      },
      {
        type: "closing",
        lines: [
          "Trả thêm cho thương hiệu không sai, miễn là bạn biết mình đang trả cho cái gì và cái đó có thể mất đi.",
          "Bài sau: khoản chi phí lớn nhất khi mua vàng lại là khoản không ai gọi là phí.",
        ],
      },
    ],
  },
  {
    id: 322,
    slug: "chenh-lech-mua-ban-vang",
    title: "Chặng 13, Bài 3: Chênh lệch mua-bán - khoản lỗ ngay tại giây đầu tiên",
    subtitle: "Mua xong là đã âm, và giá phải tăng đủ nhiều mới về tới điểm hòa vốn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "↔️",
    track: "personal",
    whyItMatters:
      "Không ai gọi nó là phí, nên nó không xuất hiện trong bất kỳ phép tính nào của người mua. Nhưng nó là chi phí giao dịch lớn nhất của vàng, lớn hơn hẳn phí mua chứng chỉ quỹ hay phí giao dịch cổ phiếu, và nó quyết định vàng có phải kênh phù hợp cho kế hoạch của bạn hay không.",
    openingQuestion:
      "Cửa hàng niêm yết mua vào 74 triệu, bán ra 76 triệu một lượng. Bạn mua một lượng rồi bán lại ngay lập tức thì sao?",
    openingOptions: [
      "Hòa vốn, vì bạn mua và bán trong cùng một ngày với cùng một mức giá thị trường",
      "Lỗ 2 triệu, tức bằng đúng khoảng cách giữa giá bán ra và giá mua vào",
      "Lỗ khoảng 200 nghìn, tức phí giao dịch mà cửa hàng thu trên mỗi lượng",
      "Lãi 2 triệu, vì giá niêm yết bán ra luôn cao hơn giá bạn đã trả để mua",
    ],
    correctOption: 1,
    explanation:
      "Cửa hàng bán cho bạn ở giá bán ra và mua lại của bạn ở giá mua vào, nên toàn bộ khoảng cách giữa hai con số là khoản bạn mất ngay lập tức. Hai triệu trên 76 triệu là khoảng 2,6% - giá vàng phải tăng ít nhất chừng ấy thì bạn mới quay về điểm hòa vốn, và mọi phần lãi chỉ bắt đầu từ sau mốc đó. Đây không phải mánh khóe: khoảng chênh ấy là cách cửa hàng kiếm sống và bù rủi ro giá biến động. Nhưng nó là con số bắt buộc phải đưa vào phép tính, và nó nới rộng ra đúng vào lúc thị trường biến động mạnh - tức là đúng lúc nhiều người muốn mua hoặc bán nhất.",
    diagram: [
      { label: "Bạn mua ở GIÁ BÁN RA", arrow: true },
      { label: "Bạn bán ở GIÁ MUA VÀO", arrow: true },
      { label: "Khoảng cách hai giá là lỗ tức thì", arrow: true },
      { label: "Giá phải tăng qua mốc đó mới bắt đầu có lãi" },
    ],
    interactiveType: "fee-drag",
    realWorldExample: {
      company: "Ba lần mua bán trong một năm",
      description:
        "Một người mua rồi bán vàng ba lần trong năm để lướt theo biến động giá. Mỗi vòng mất khoảng 2,5% cho chênh lệch mua-bán, ba vòng là khoảng 7,5% - trước khi tính tới việc dự đoán giá đúng hay sai. Cùng năm đó, một người mua một lần và giữ nguyên chỉ trả chi phí ấy đúng một lần.",
    },
    quiz: [
      {
        question: "Chênh lệch mua-bán ảnh hưởng thế nào tới người lướt sóng vàng?",
        options: [
          "Mỗi vòng mua bán đều mất khoản đó, nên giao dịch càng nhiều càng bào mòn lợi nhuận",
          "Không ảnh hưởng vì người lướt sóng mua và bán ở cùng một cửa hàng",
          "Chỉ ảnh hưởng khi giữ vàng dài hạn vì khoảng chênh đó tích lũy dần theo thời gian",
          "Ảnh hưởng giảm dần vì cửa hàng ưu đãi cho khách giao dịch thường xuyên",
        ],
        correct: 0,
        explanation:
          "Đây là chi phí theo LẦN GIAO DỊCH chứ không theo thời gian nắm giữ - ngược hẳn với trực giác thông thường. Giữ mười năm trả một lần; mua bán mười lần trong một năm trả mười lần.",
      },
      {
        question:
          "Mua vào 74 triệu, bán ra 76 triệu. Giá phải tăng bao nhiêu phần trăm để hòa vốn?",
        options: [
          "Khoảng 2,7% (= 2 triệu ÷ 74 triệu, phần giá mua vào phải bù)",
          "Khoảng 1,3% (= 1 triệu ÷ 76 triệu, tính một nửa khoảng chênh)",
          "0%, vì giá vàng tăng thì cả giá mua vào lẫn bán ra đều tăng theo",
          "Khoảng 5,4% (= 2 triệu ÷ 74 triệu rồi nhân đôi cho cả hai chiều)",
        ],
        correct: 0,
        explanation:
          "Bạn đã trả 76 và sẽ bán ở giá mua vào, nên giá mua vào phải nhích từ 74 lên 76 - tức tăng khoảng 2,7%. Đúng là cả hai giá cùng tăng khi thị trường lên, và chính vì thế mốc hòa vốn mới là mức tăng chứ không phải một con số tuyệt đối.",
      },
      {
        question: "Khi nào chênh lệch mua-bán thường nới rộng ra?",
        options: [
          "Khi thị trường biến động mạnh, tức đúng lúc nhiều người muốn giao dịch nhất",
          "Vào các ngày lễ tết khi nhu cầu mua vàng làm quà tăng lên đáng kể",
          "Khi giá vàng thế giới đi ngang trong một thời gian dài liên tục",
          "Khi ngân hàng nhà nước công bố điều chỉnh tỷ giá trung tâm hằng ngày",
        ],
        correct: 0,
        explanation:
          "Cửa hàng nới khoảng chênh để tự bảo vệ khi giá có thể nhảy mạnh giữa lúc họ đang giữ hàng. Hệ quả với người mua là chi phí cao nhất rơi đúng vào lúc cảm giác cấp bách cũng cao nhất.",
      },
      {
        question: "Cách giảm tác động của chênh lệch mua-bán là gì?",
        options: [
          "Giảm số lần giao dịch và chọn loại vàng có khoảng chênh hẹp hơn",
          "Chia nhỏ khoản mua thành nhiều lần để trung bình hóa giá mua vào",
          "Chỉ mua vào các ngày thị trường ít biến động trong tuần làm việc",
          "Mua ở cửa hàng nhỏ vì họ thường niêm yết giá bán ra thấp hơn",
        ],
        correct: 0,
        explanation:
          "Chia nhỏ khoản mua giúp trung bình hóa giá nhưng lại nhân số lần trả chênh lệch lên - nó giải quyết một vấn đề bằng cách làm nặng thêm vấn đề này. Với vàng, ít giao dịch hơn gần như luôn rẻ hơn.",
      },
      {
        question: "Vì sao chênh lệch mua-bán khiến vàng không hợp làm quỹ khẩn cấp?",
        options: [
          "Vì bán gấp nghĩa là chấp nhận cả khoảng chênh lẫn mức giá của đúng ngày hôm đó",
          "Vì cửa hàng vàng chỉ mua lại trong giờ hành chính các ngày làm việc",
          "Vì vàng cần thời gian để kiểm định nên không lấy được tiền ngay trong cùng một ngày",
          "Vì bán vàng với khối lượng lớn phải khai báo và chờ phê duyệt trước",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp cần lấy ra được với giá trị biết trước. Vàng cho bạn tính thanh khoản khá tốt nhưng không cho bạn giá trị biết trước, và khoảng chênh làm mọi lần rút gấp đắt thêm vài phần trăm.",
      },
    ],
    keyTakeaways: [
      "Chênh lệch mua-bán là khoản lỗ tức thì, không phải phí tính theo thời gian nắm giữ",
      "Giá phải tăng qua đúng khoảng chênh đó thì mới tới điểm hòa vốn",
      "Khoảng chênh nới rộng khi thị trường biến động - đúng lúc người ta muốn giao dịch nhất",
      "Giao dịch càng nhiều lần thì chi phí này càng nhân lên",
    ],
    practicePrompt: {
      question:
        "Bạn định mua vàng mỗi tháng một chỉ trong ba năm. Điều gì đáng cân nhắc nhất?",
      options: [
        "Ba mươi sáu lần mua nghĩa là trả chênh lệch ba mươi sáu lần",
        "Giá vàng có thể giảm trong ba năm nên nên đợi tới lúc giá thấp hơn",
        "Cửa hàng có thể ngừng bán loại sản phẩm đó giữa chừng kế hoạch",
        "Số vàng tích lũy được sẽ khó cất giữ an toàn khi đã đủ lớn",
      ],
      correct: 0,
      explanation:
        "Mua đều đặn là chiến lược tốt cho tài sản có phí giao dịch thấp như chứng chỉ quỹ. Với vàng, mỗi lần mua đều gánh một khoản chênh vài phần trăm, nên cùng một chiến lược lại cho ra kết quả rất khác.",
    },
    summary: {
      keyIdea: "Khoảng cách giữa giá mua vào và bán ra là khoản lỗ bạn gánh ngay khi vừa mua xong",
      commonMistake: "Bỏ nó ra khỏi phép tính vì không ai gọi nó là phí và nó không có hóa đơn",
      action: "Trước mỗi lần mua, chia khoảng chênh cho giá mua vào để biết giá phải tăng bao nhiêu mới hòa vốn.",
    },
    application: {
      title: "Tính mốc hòa vốn trước khi mua",
      message:
        "Ghi giá mua vào và giá bán ra của loại vàng bạn định mua. Lấy hiệu chia cho giá mua vào - đó là mức tăng tối thiểu để bạn không lỗ.",
      secondary:
        "So con số ấy với lãi suất tiền gửi một năm. Nếu mốc hòa vốn còn cao hơn cả lãi tiền gửi cả năm, bạn vừa biết mình đang xuất phát từ đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi bảng giá vàng đều có hai cột, và phần lớn người mua chỉ nhìn một. Cột còn lại quyết định bạn phải đúng đến mức nào về xu hướng giá thì mới không lỗ.",
      },
      { type: "heading", text: "Hai cột, hai vai" },
      {
        type: "paragraph",
        text: "Cột giá bán ra là mức bạn phải trả khi mua; cột giá mua vào là mức bạn nhận được khi bán. Bạn luôn đứng ở phía bất lợi của cả hai. Khoảng cách giữa chúng không phải một khoản phí được liệt kê ở đâu cả - nó nằm ngay trong giá, nên nó không xuất hiện trong bất kỳ hóa đơn nào và cũng không xuất hiện trong bất kỳ phép tính nào của người mua.",
      },
      {
        type: "formula",
        title: "Mức tăng cần thiết để hòa vốn",
        equation: "Mức hòa vốn = (Giá bán ra − Giá mua vào) ÷ Giá mua vào",
        variables: [
          {
            symbol: "Giá bán ra",
            name: "Mức bạn trả khi mua",
            description: "Luôn là cột cao hơn trong bảng giá niêm yết",
          },
          {
            symbol: "Giá mua vào",
            name: "Mức bạn nhận khi bán",
            description: "Luôn là cột thấp hơn - đây là mức phải nhích lên tới giá bạn đã trả",
          },
        ],
        example: {
          title: "Một khoảng chênh hai triệu",
          calculation: "Mua vào 74 triệu · bán ra 76 triệu · (76 − 74) ÷ 74",
          result: "Giá phải tăng khoảng 2,7% mới hòa vốn",
          explanation:
            "Trước khi có đồng lãi nào, giá vàng phải tăng gần bằng nửa mức lãi suất tiền gửi một năm. Với người mua rồi bán trong vài tháng, đó là một rào cản rất cao và nó có mặt ở mọi lần giao dịch.",
        },
      },
      {
        type: "callout",
        label: "Chi phí theo LẦN, không theo thời gian",
        text: "Đây là chỗ vàng ngược với gần như mọi chi phí khác trong tài chính cá nhân. Phí quản lý quỹ tính theo năm nên giữ lâu trả nhiều; chênh lệch mua-bán tính theo lần nên giao dịch nhiều mới trả nhiều. Hệ quả là chiến lược mua đều đặn mỗi tháng - vốn rất hợp lý với chứng chỉ quỹ - lại đắt bất thường khi áp lên vàng.",
      },
      {
        type: "closing",
        lines: [
          "Khoản chi phí không có tên và không có hóa đơn vẫn là khoản chi phí lớn nhất ở đây.",
          "Bài sau: câu nói vàng chống lạm phát - đúng ở khung thời gian nào và sai ở khung nào.",
        ],
      },
    ],
  },
  {
    id: 323,
    slug: "vang-co-chong-lam-phat-khong",
    title: "Chặng 13, Bài 4: Vàng có chống lạm phát không",
    subtitle: "Đúng trên khung thời gian rất dài, và không đáng tin trên khung mà bạn thật sự sống",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⏳",
    track: "personal",
    whyItMatters:
      "Đây là lý lẽ được dùng nhiều nhất để biện minh cho việc giữ phần lớn tài sản bằng vàng. Nó không sai hoàn toàn, nhưng nó đúng ở một khung thời gian dài hơn nhiều so với khung mà một kế hoạch tài chính cá nhân vận hành - và nhầm lẫn giữa hai khung đó dẫn tới những quyết định rất tốn kém.",
    openingQuestion: "Câu vàng chống lạm phát nên được hiểu thế nào cho đúng?",
    openingOptions: [
      "Đúng trên khung hàng chục năm, nhưng trên khung vài năm thì giá vàng đi theo nhiều yếu tố khác",
      "Đúng ở mọi khung thời gian vì giá vàng luôn tăng cùng nhịp với mặt bằng giá của mọi loại hàng hóa",
      "Sai hoàn toàn vì vàng không liên quan gì tới mức giá chung của nền kinh tế",
      "Chỉ đúng khi lạm phát vượt hai chữ số, còn dưới mức đó thì vàng không phản ứng",
    ],
    correctOption: 0,
    explanation:
      "Trên khung rất dài, vàng có xu hướng giữ được sức mua theo nghĩa một lượng vàng vẫn mua được lượng hàng hóa tương đương. Nhưng trên khung năm hoặc vài năm - tức khung mà mọi kế hoạch cá nhân vận hành - giá vàng chịu tác động của lãi suất thực, tỷ giá, dòng vốn và tâm lý mạnh hơn nhiều so với lạm phát. Đã có những giai đoạn lạm phát cao mà vàng vẫn giảm, và những giai đoạn lạm phát thấp mà vàng tăng mạnh. Nói cách khác, mối liên hệ ấy có tồn tại nhưng lỏng lẻo và chậm, nên dùng nó làm cơ sở để dồn phần lớn tài sản vào vàng là dùng một quy luật dài hạn cho một bài toán ngắn hạn.",
    diagram: [
      { label: "Khung hàng chục năm: vàng giữ được sức mua", arrow: true },
      { label: "Khung vài năm: lãi suất, tỷ giá, tâm lý chi phối", arrow: true },
      { label: "Kế hoạch cá nhân sống ở khung vài năm", arrow: true },
      { label: "Nên vàng là một phần, không phải cả kế hoạch" },
    ],
    realWorldExample: {
      company: "Hai giai đoạn, hai kết luận trái ngược",
      description:
        "Có những quãng nhiều năm liền lạm phát ở mức đáng kể mà giá vàng vẫn đi ngang hoặc giảm - người mua vàng để chống lạm phát trong quãng đó vừa mất sức mua vì giá cả tăng, vừa lỗ vì giá vàng giảm. Cũng có những quãng lạm phát rất thấp mà vàng tăng mạnh vì lãi suất thực xuống thấp và dòng vốn tìm nơi trú. Cùng một tài sản, hai kết luận trái ngược, và cả hai đều được dùng làm bằng chứng.",
    },
    quiz: [
      {
        question: "Trên khung vài năm, yếu tố nào tác động tới giá vàng mạnh hơn lạm phát?",
        options: [
          "Lãi suất thực, tỷ giá và dòng vốn tìm nơi trú ẩn khi thị trường bất ổn",
          "Sản lượng vàng khai thác mới được đưa ra thị trường trong từng năm một",
          "Nhu cầu vàng trang sức trong các dịp lễ tết ở các nước châu Á",
          "Chi phí vận chuyển và bảo hiểm hàng hóa vàng giữa các quốc gia",
        ],
        correct: 0,
        explanation:
          "Cung vàng mới mỗi năm rất nhỏ so với lượng vàng đã tồn tại, nên sản lượng khai thác ít ảnh hưởng tới giá. Vàng không trả lãi, nên khi lãi suất thực xuống thấp thì chi phí cơ hội của việc giữ vàng giảm - đó là kênh tác động mạnh nhất.",
      },
      {
        question: "Vì sao lãi suất thực ảnh hưởng mạnh tới giá vàng?",
        options: [
          "Vì vàng không trả lãi nên lãi suất thực càng cao thì giữ vàng càng thiệt",
          "Vì các ngân hàng dùng lãi suất thực để định giá vàng miếng niêm yết mỗi ngày",
          "Vì người mua vàng thường vay tiền ngân hàng nên lãi vay quyết định nhu cầu",
          "Vì lãi suất thực quyết định trực tiếp chi phí khai thác và tinh luyện vàng",
        ],
        correct: 0,
        explanation:
          "Đây chính là chi phí cơ hội đã nói ở bài đầu chặng, nhìn từ phía thị trường. Khi tiền gửi trả lãi thực cao, giữ vàng tốn kém hơn nên nhu cầu giảm; khi lãi thực về gần không hoặc âm, cái giá ấy biến mất.",
      },
      {
        question: "Kết luận nào rút ra được từ việc mối liên hệ vàng - lạm phát là lỏng lẻo?",
        options: [
          "Vàng nên là một phần nhỏ của danh mục chứ không phải công cụ chính chống lạm phát",
          "Nên bán hết vàng vì nó không có tác dụng bảo vệ nào trước lạm phát",
          "Nên mua vàng đúng vào lúc lạm phát được công bố ở mức cao nhất",
          "Nên chuyển toàn bộ khoản tiền gửi sang vàng ngay khi lãi suất thực chuyển sang âm",
        ],
        correct: 0,
        explanation:
          "Lỏng lẻo không có nghĩa là không tồn tại, nên bán sạch cũng là một kết luận quá đà. Điều nó hàm ý là mức độ tin cậy: một công cụ bảo vệ hoạt động thất thường thì đáng giữ với tỷ trọng nhỏ chứ không đáng đặt cược cả kế hoạch.",
      },
      {
        question: "Tài sản nào có cơ chế chống lạm phát trực tiếp hơn vàng?",
        options: [
          "Tài sản có dòng tiền tự điều chỉnh theo giá cả, như doanh nghiệp tăng được giá bán",
          "Tiền mặt giữ ở nhà vì nó không phụ thuộc vào bất kỳ tổ chức nào",
          "Tiền gửi kỳ hạn dài vì mức lãi suất đã được khóa lại từ trước khi lạm phát tăng lên",
          "Trái phiếu lãi suất cố định vì coupon được trả đều đặn theo cam kết",
        ],
        correct: 0,
        explanation:
          "Trái phiếu lãi cố định và tiền gửi khóa lãi là hai thứ chịu thiệt nhiều nhất khi lạm phát tăng, vì khoản nhận được đã cố định trong khi giá cả thì không. Doanh nghiệp có thể nâng giá bán nên dòng tiền của nó đi cùng chiều với mặt bằng giá.",
      },
      {
        question: "Sai lầm phổ biến khi dùng lý lẽ vàng chống lạm phát là gì?",
        options: [
          "Áp một quy luật đúng trên hàng chục năm vào một kế hoạch chỉ kéo dài vài năm",
          "Cho rằng vàng hoàn toàn không có liên hệ nào với mức giá chung",
          "Chỉ giữ một tỷ trọng nhỏ vàng trong khi lẽ ra nên giữ nhiều hơn",
          "So sánh giá vàng trong nước với giá vàng thế giới khi tính toán các con số",
        ],
        correct: 0,
        explanation:
          "Người cần tiền sau ba năm sống ở khung ba năm, không sống ở khung ba mươi năm. Một quy luật chỉ hiện ra rõ trên khung dài không giúp gì cho người phải bán vào một thời điểm cụ thể.",
      },
    ],
    keyTakeaways: [
      "Trên khung hàng chục năm vàng giữ được sức mua; trên khung vài năm thì mối liên hệ rất lỏng",
      "Lãi suất thực là kênh tác động mạnh nhất, vì vàng không trả lãi",
      "Đã có giai đoạn lạm phát cao mà vàng giảm, và ngược lại",
      "Kế hoạch cá nhân sống ở khung vài năm, nên vàng hợp với vai trò một phần nhỏ",
    ],
    practicePrompt: {
      question:
        "Bạn cần một khoản tiền sau ba năm và lo lạm phát bào mòn nó. Vàng có phải lựa chọn tốt không?",
      options: [
        "Không, vì trên khung ba năm giá vàng có thể đi bất kỳ hướng nào bất kể lạm phát",
        "Có, vì vàng là tài sản chống lạm phát đáng tin cậy nhất hiện có",
        "Có, nếu mua vàng nhẫn thay vì vàng miếng để bám sát giá thế giới",
        "Không, vì ba năm là quá ngắn để giá vàng kịp phản ánh được mức tăng giá chung",
      ],
      correct: 0,
      explanation:
        "Khi có một mốc thời gian cụ thể và một số tiền cụ thể phải có, thứ bạn cần là giá trị biết trước chứ không phải kỳ vọng dài hạn. Đó là công việc của tiền gửi khớp kỳ hạn, đúng như Chặng 12 đã nói.",
    },
    summary: {
      keyIdea: "Vàng chống lạm phát trên khung hàng chục năm, còn kế hoạch của bạn sống ở khung vài năm",
      commonMistake: "Dùng một quy luật dài hạn để biện minh cho việc dồn phần lớn tài sản vào vàng",
      action: "Với mỗi mục tiêu, hỏi khung thời gian của nó là bao lâu trước khi chọn tài sản.",
    },
    application: {
      title: "Ghép khung thời gian với tài sản",
      message:
        "Liệt kê các mục tiêu tài chính của bạn kèm số năm còn lại. Mục tiêu dưới năm năm cần giá trị biết trước; chỉ những mục tiêu rất xa mới hợp với tài sản biến động mạnh.",
      secondary:
        "Nếu một tài sản chỉ tỏ ra đáng tin trên khung dài hơn mọi mục tiêu bạn có, thì lý lẽ dài hạn ấy không áp dụng được cho bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu vàng chống lạm phát được lặp lại nhiều tới mức nó thành hiển nhiên. Nó có phần đúng - và phần đúng ấy nằm ở một khung thời gian mà rất ít kế hoạch cá nhân chạm tới.",
      },
      { type: "heading", text: "Hai khung thời gian, hai câu trả lời" },
      {
        type: "paragraph",
        text: "Trên khung hàng chục năm hoặc dài hơn, vàng có xu hướng giữ được sức mua: nó không mất giá theo cách tiền giấy mất giá. Trên khung một tới năm năm, giá vàng bị chi phối bởi lãi suất thực, tỷ giá, dòng vốn tìm nơi trú và tâm lý thị trường - và những yếu tố đó lấn át hoàn toàn tín hiệu lạm phát. Cả hai câu đều đúng, chúng chỉ nói về hai thứ khác nhau.",
      },
      {
        type: "conceptTable",
        title: "Ba cách một tài sản chống lại lạm phát",
        subtitle: "Vàng dùng cách thứ ba, và đó là cách gián tiếp nhất",
        concepts: [
          {
            vi: "Dòng tiền tự tăng theo giá",
            en: "Pricing power",
            def: "Doanh nghiệp nâng được giá bán thì doanh thu đi cùng chiều với mặt bằng giá. Đây là cơ chế trực tiếp nhất.",
          },
          {
            vi: "Lãi suất điều chỉnh theo",
            en: "Floating rate",
            def: "Tiền gửi ngắn hạn tái tục liên tục sẽ dần bắt kịp mặt bằng lãi suất mới khi lạm phát đẩy lãi suất lên.",
          },
          {
            vi: "Giá tài sản tự nó tăng",
            en: "Store of value",
            def: "Cơ chế của vàng: không có dòng tiền nào điều chỉnh, chỉ có kỳ vọng rằng người sau sẽ trả nhiều hơn. Chậm và thất thường nhất.",
          },
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận với bằng chứng chọn lọc",
        text: "Cả hai phe trong tranh luận này đều có dữ liệu thật để trích dẫn, vì lịch sử giá vàng đủ dài để chứa cả những quãng khẳng định lẫn những quãng bác bỏ. Cách duy nhất không bị dẫn dắt là hỏi khung thời gian của bằng chứng, và so nó với khung thời gian của chính bạn.",
      },
      {
        type: "closing",
        lines: [
          "Một công cụ bảo vệ hoạt động thất thường vẫn có giá trị - miễn là bạn không giao cho nó toàn bộ nhiệm vụ.",
          "Bài sau: đô la Mỹ, tỷ giá, và vì sao giữ ngoại tệ ở Việt Nam khác với bạn nghĩ.",
        ],
      },
    ],
  },
  {
    id: 324,
    slug: "ty-gia-usd-vnd-co-che",
    title: "Chặng 13, Bài 5: Tỷ giá USD/VND vận hành thế nào",
    subtitle: "Tỷ giá tăng nghĩa là gì, ai được lợi và ai chịu thiệt",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "💱",
    track: "personal",
    whyItMatters:
      "Tỷ giá xuất hiện trên bản tin mỗi ngày và ảnh hưởng tới giá hàng nhập khẩu, tiền học của con đi du học, chi phí du lịch và cả lạm phát trong nước. Nhưng cách nó được nói tới rất dễ gây hiểu ngược - riêng chuyện tỷ giá tăng nghĩa là đồng nào mạnh lên đã làm nhiều người nhầm.",
    openingQuestion: "Tỷ giá USD/VND tăng từ 24.000 lên 25.000. Điều đó nghĩa là gì?",
    openingOptions: [
      "Đồng Việt Nam mạnh lên vì con số tỷ giá đã tăng thêm một nghìn đồng",
      "Cần nhiều tiền đồng hơn để mua một đô la, tức đồng Việt Nam yếu đi",
      "Giá trị của cả hai đồng tiền không đổi, chỉ có cách niêm yết thay đổi",
      "Ngân hàng nhà nước đã in thêm tiền nên mọi mức giá trong nước đều tăng",
    ],
    correctOption: 1,
    explanation:
      "Tỷ giá này được niêm yết theo số tiền đồng cần để mua một đô la, nên con số tăng nghĩa là đô la đắt lên và tiền đồng yếu đi. Đây là chỗ dễ nhầm nhất vì trực giác thường gắn số tăng với mạnh lên. Hệ quả rất cụ thể: hàng nhập khẩu đắt hơn, chi phí du học và du lịch nước ngoài tăng, doanh nghiệp vay nợ bằng đô la chịu gánh nặng lớn hơn khi quy ra tiền đồng. Ngược lại, người có thu nhập bằng đô la và doanh nghiệp xuất khẩu được lợi. Việc in tiền có thể là một trong nhiều nguyên nhân dài hạn, nhưng nó không phải định nghĩa của tỷ giá tăng.",
    diagram: [
      { label: "Tỷ giá = số tiền đồng đổi một đô la", arrow: true },
      { label: "Số tăng nghĩa là đô la đắt lên", arrow: true },
      { label: "Tức tiền đồng yếu đi so với đô la", arrow: true },
      { label: "Hàng nhập đắt hơn, người thu ngoại tệ được lợi" },
    ],
    realWorldExample: {
      company: "Một năm du học và một nghìn đồng",
      description:
        "Một gia đình chuẩn bị 40.000 đô la cho một năm học của con. Ở mức 24.000 đồng một đô, khoản đó là 960 triệu. Tỷ giá lên 25.000 thì cùng số đô la ấy cần 1 tỷ đồng - đắt thêm 40 triệu mà không có gì trong kế hoạch học tập thay đổi. Đây là lý do các khoản chi tương lai bằng ngoại tệ cần được nghĩ tới sớm hơn thời điểm phải trả.",
    },
    quiz: [
      {
        question: "Ai chịu thiệt khi tỷ giá USD/VND tăng?",
        options: [
          "Người mua hàng nhập khẩu và người có khoản chi sắp tới bằng đô la",
          "Doanh nghiệp xuất khẩu vì hàng của họ trở nên đắt hơn ở nước ngoài",
          "Người nhận kiều hối từ nước ngoài vì số tiền đồng nhận về giảm đi",
          "Người gửi tiết kiệm bằng tiền đồng vì lãi suất sẽ bị điều chỉnh giảm",
        ],
        correct: 0,
        explanation:
          "Người nhận kiều hối và doanh nghiệp xuất khẩu thực ra được lợi: cùng số đô la nhận được đổi ra nhiều tiền đồng hơn. Bên chịu thiệt là bên phải chi ra ngoại tệ.",
      },
      {
        question: "Vì sao tỷ giá tăng có thể đẩy lạm phát trong nước lên?",
        options: [
          "Vì hàng nhập khẩu và nguyên liệu đầu vào tính bằng ngoại tệ trở nên đắt hơn",
          "Vì ngân hàng nhà nước buộc phải tăng lãi suất huy động khi tỷ giá biến động",
          "Vì người dân rút tiền gửi để mua ngoại tệ nên lượng tiền lưu thông tăng lên",
          "Vì các doanh nghiệp xuất khẩu thu về nhiều tiền đồng hơn và chi tiêu nhiều hơn",
        ],
        correct: 0,
        explanation:
          "Một nền kinh tế nhập nhiều nguyên liệu và máy móc sẽ chuyển phần tăng chi phí ấy vào giá bán trong nước. Đây là kênh truyền dẫn trực tiếp nhất từ tỷ giá sang mặt bằng giá.",
      },
      {
        question: "Yếu tố nào ảnh hưởng tới tỷ giá USD/VND?",
        options: [
          "Chênh lệch lãi suất, cán cân thương mại, dòng vốn và chính sách điều hành",
          "Chỉ có lượng tiền đồng mà ngân hàng nhà nước phát hành trong mỗi năm",
          "Chỉ có giá vàng thế giới vì vàng và đô la luôn biến động ngược chiều nhau",
          "Chỉ có số lượng khách du lịch quốc tế tới Việt Nam trong từng mùa cao điểm",
        ],
        correct: 0,
        explanation:
          "Không có yếu tố đơn lẻ nào quyết định tỷ giá, và đó chính là lý do dự đoán nó rất khó. Với người làm tài chính cá nhân, kết luận thực dụng là đừng đặt kế hoạch dựa trên một dự đoán tỷ giá cụ thể.",
      },
      {
        question:
          "Bạn cần 10.000 đô la sau hai năm. Tỷ giá hiện tại 24.500. Cách xử lý thận trọng nhất là gì?",
        options: [
          "Lập kế hoạch với một mức tỷ giá cao hơn hiện tại để có khoảng đệm an toàn",
          "Tính đúng theo tỷ giá hôm nay vì đó là con số duy nhất biết chắc chắn",
          "Chờ tới sát thời điểm cần rồi mới mua để tránh rủi ro tỷ giá giảm",
          "Vay ngoại tệ ngay bây giờ để khóa mức tỷ giá của thời điểm hiện tại",
        ],
        correct: 0,
        explanation:
          "Tính theo tỷ giá hôm nay là giả định nó đứng yên hai năm, điều gần như chắc chắn không xảy ra. Vay ngoại tệ để khóa tỷ giá thì thêm chi phí lãi vay và thêm rủi ro - một khoảng đệm trong kế hoạch rẻ hơn nhiều.",
      },
      {
        question: "Vì sao người làm tài chính cá nhân không nên dự đoán tỷ giá?",
        options: [
          "Vì nó phụ thuộc quá nhiều biến số mà ngay cả tổ chức chuyên nghiệp cũng dự báo sai",
          "Vì luật không cho phép cá nhân giao dịch dựa trên dự đoán tỷ giá",
          "Vì tỷ giá do ngân hàng nhà nước ấn định nên không có gì để dự đoán cả",
          "Vì biến động tỷ giá quá nhỏ nên không đáng để đưa vào một kế hoạch tài chính cá nhân",
        ],
        correct: 0,
        explanation:
          "Tỷ giá có được điều hành, nhưng nó vẫn dao động và vẫn phản ứng với thị trường - nên nói không có gì để dự đoán là sai theo hướng ngược lại. Điều đúng là dự đoán rất khó, nên kế hoạch nên chịu đựng được nhiều kịch bản thay vì cược vào một kịch bản.",
      },
    ],
    keyTakeaways: [
      "Tỷ giá USD/VND tăng nghĩa là đô la đắt lên và tiền đồng yếu đi",
      "Bên chi ngoại tệ chịu thiệt; bên thu ngoại tệ như xuất khẩu và kiều hối được lợi",
      "Tỷ giá tăng truyền vào lạm phát qua giá hàng nhập và nguyên liệu đầu vào",
      "Đừng đặt kế hoạch dựa trên một dự đoán tỷ giá - hãy để một khoảng đệm",
    ],
    practicePrompt: {
      question:
        "Bạn có kế hoạch cho con du học sau bốn năm. Việc nên làm ngay từ bây giờ là gì?",
      options: [
        "Đưa kịch bản tỷ giá bất lợi vào kế hoạch và tích lũy theo con số đó",
        "Mua đủ số ngoại tệ cần thiết ngay hôm nay để khóa mức tỷ giá hiện tại",
        "Chờ theo dõi tỷ giá vài năm rồi quyết định mua vào lúc thấp nhất",
        "Bỏ qua yếu tố tỷ giá vì bốn năm là đủ dài để mọi biến động triệt tiêu nhau",
      ],
      correct: 0,
      explanation:
        "Mua sẵn toàn bộ ngoại tệ cho bốn năm nữa là khóa một khoản lớn ở nơi gần như không sinh lãi. Chờ mua đúng đáy là dự đoán thị trường. Một khoảng đệm trong kế hoạch không đòi hỏi dự đoán nào và vẫn xử lý được phần lớn kịch bản.",
    },
    summary: {
      keyIdea: "Tỷ giá tăng nghĩa là tiền đồng yếu đi - bên phải chi ngoại tệ là bên chịu thiệt",
      commonMistake: "Lập kế hoạch cho khoản chi ngoại tệ tương lai theo đúng tỷ giá của hôm nay",
      action: "Với mọi mục tiêu có chi phí bằng ngoại tệ, tính lại theo một mức tỷ giá cao hơn hiện tại.",
    },
    application: {
      title: "Thêm một khoảng đệm tỷ giá",
      message:
        "Nếu bạn có khoản chi tương lai bằng ngoại tệ, tính lại tổng số tiền đồng cần thiết ở mức tỷ giá cao hơn hôm nay một khoảng hợp lý. Chênh lệch đó là phần cần tích lũy thêm.",
      secondary:
        "Việc này không dự đoán tỷ giá sẽ tăng - nó chỉ đảm bảo kế hoạch không đổ vỡ nếu tỷ giá tăng.",
    },
    sections: [
      {
        type: "lead",
        text: "Tỷ giá là con số được nhắc tới hằng ngày và bị hiểu ngược thường xuyên nhất. Trước khi bàn có nên giữ ngoại tệ hay không, cần thống nhất một chuyện đơn giản: khi con số ấy tăng thì ai đang mạnh lên.",
      },
      { type: "heading", text: "Đọc đúng chiều" },
      {
        type: "paragraph",
        text: "Tỷ giá USD/VND ở Việt Nam được niêm yết theo số tiền đồng cần để mua một đô la. Nên khi nó đi từ 24.000 lên 25.000, đô la đang đắt lên - tiền đồng yếu đi, không phải mạnh lên. Trực giác dễ nhầm vì con số tăng, và cái tăng ấy là giá của đô la chứ không phải giá trị của đồng nội tệ.",
      },
      {
        type: "conceptTable",
        title: "Tỷ giá tăng thì ai được, ai mất",
        subtitle: "Quy tắc chung: bên nào phải CHI ngoại tệ thì bên đó chịu thiệt",
        concepts: [
          {
            vi: "Được lợi",
            en: "Winners",
            def: "Doanh nghiệp xuất khẩu, người nhận kiều hối, người có thu nhập bằng ngoại tệ - cùng số ngoại tệ đổi ra nhiều tiền đồng hơn.",
          },
          {
            vi: "Chịu thiệt",
            en: "Losers",
            def: "Người mua hàng nhập khẩu, gia đình có con du học, doanh nghiệp vay nợ ngoại tệ hoặc nhập nguyên liệu.",
          },
          {
            vi: "Ảnh hưởng gián tiếp",
            en: "Everyone else",
            def: "Chi phí nhập khẩu tăng thấm vào giá bán trong nước, nên cả người không giao dịch ngoại tệ nào cũng chịu tác động qua lạm phát.",
          },
        ],
      },
      {
        type: "callout",
        label: "Kế hoạch nên chịu được nhiều kịch bản, không nên cược vào một kịch bản",
        text: "Tỷ giá phụ thuộc vào chênh lệch lãi suất, cán cân thương mại, dòng vốn và chính sách điều hành - nhiều biến tới mức các tổ chức chuyên nghiệp cũng thường xuyên dự báo sai. Với tài chính cá nhân, cách xử lý đúng không phải dự đoán giỏi hơn mà là để một khoảng đệm đủ rộng.",
      },
      {
        type: "closing",
        lines: [
          "Đọc đúng chiều của một con số là bước đầu tiên trước mọi quyết định liên quan tới nó.",
          "Bài sau: giữ đô la trong nước - quy định thế nào và vì sao nó không sinh lãi.",
        ],
      },
    ],
  },
  {
    id: 325,
    slug: "giu-ngoai-te-o-viet-nam",
    title: "Chặng 13, Bài 6: Giữ ngoại tệ ở Việt Nam",
    subtitle: "Tiền gửi đô la trả lãi 0%, nên toàn bộ kỳ vọng nằm ở tỷ giá",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "💵",
    track: "personal",
    whyItMatters:
      "Giữ đô la được nhiều người coi là cách phòng thủ khi lo tiền đồng mất giá. Nhưng cơ chế ở Việt Nam có một đặc điểm khiến phép so sánh khác hẳn các nước: tiền gửi ngoại tệ của cá nhân không được trả lãi, nên bài toán chỉ còn đúng một biến.",
    openingQuestion: "Gửi tiết kiệm bằng đô la tại ngân hàng Việt Nam được trả lãi bao nhiêu?",
    openingOptions: [
      "0%/năm theo quy định hiện hành về trần lãi suất tiền gửi ngoại tệ",
      "Bằng khoảng một nửa lãi suất tiền gửi bằng tiền đồng cùng kỳ hạn",
      "Theo lãi suất do ngân hàng trung ương Mỹ công bố tại từng thời điểm",
      "Bằng lãi suất tiền đồng trừ đi mức mất giá dự kiến của tiền đồng",
    ],
    correctOption: 0,
    explanation:
      "Trần lãi suất tiền gửi đô la của cá nhân được đặt ở 0%, và điều này thay đổi hoàn toàn phép so sánh. Giữ tiền đồng trong sổ tiết kiệm sinh lãi mỗi năm; giữ đô la trong tài khoản không sinh gì cả. Nghĩa là để giữ đô la có lợi hơn, tỷ giá phải tăng đủ nhiều để bù lại toàn bộ phần lãi tiền đồng mà bạn đã bỏ qua. Đó là một mốc khá cao và nó lặp lại mỗi năm. Người giữ đô la vì lo tiền đồng mất giá thường chỉ nhìn vế tỷ giá mà không đặt nó cạnh vế lãi suất - và vế bị bỏ qua ấy chạy đều đặn suốt thời gian nắm giữ.",
    diagram: [
      { label: "Tiền gửi VND: sinh lãi mỗi năm", arrow: true },
      { label: "Tiền gửi USD: lãi 0%", arrow: true },
      { label: "Tỷ giá phải tăng đủ bù phần lãi bỏ qua", arrow: true },
      { label: "Đó là mốc phải vượt, lặp lại hằng năm" },
    ],
    realWorldExample: {
      company: "Hai người, một nỗi lo giống nhau",
      description:
        "Hai người cùng lo tiền đồng mất giá và cùng có 500 triệu. Người thứ nhất đổi hết sang đô la và để trong tài khoản. Người thứ hai gửi tiết kiệm tiền đồng ở mức 6%. Sau một năm, người thứ hai có thêm 30 triệu tiền lãi; người thứ nhất chỉ hơn nếu tỷ giá đã tăng hơn 6% trong năm đó. Nỗi lo là chính đáng, nhưng cách xử lý phải vượt qua một mốc cụ thể.",
    },
    quiz: [
      {
        question: "Vì sao lãi suất 0% làm thay đổi toàn bộ phép so sánh?",
        options: [
          "Vì nó biến phần lãi tiền đồng bỏ qua thành mốc mà tỷ giá phải vượt mỗi năm",
          "Vì ngân hàng sẽ thu phí giữ hộ ngoại tệ khi tài khoản không sinh lãi",
          "Vì tiền gửi ngoại tệ không được bảo hiểm tiền gửi khi lãi suất bằng không",
          "Vì người gửi không thể rút ngoại tệ ra tiền mặt khi không có lãi phát sinh",
        ],
        correct: 0,
        explanation:
          "Nếu tiền gửi đô la trả lãi ngang tiền đồng thì bài toán chỉ còn là chọn đồng tiền. Với mức 0%, mỗi năm nắm giữ là một năm bạn tự nguyện bỏ lại phần lãi tiền đồng - và đó là chi phí cơ hội rất cụ thể.",
      },
      {
        question: "Lãi tiền đồng 6% và tỷ giá tăng 4% trong năm. Người giữ đô la ra sao?",
        options: [
          "Thiệt khoảng 2% so với người gửi tiền đồng cùng số vốn ban đầu",
          "Lợi khoảng 4% vì phần tăng tỷ giá là khoản lãi thực nhận được",
          "Hòa vốn vì tỷ giá tăng đã bù được phần lớn lãi suất tiền đồng",
          "Lợi khoảng 10% vì tỷ giá tăng cộng thêm lãi suất tiền gửi ngoại tệ",
        ],
        correct: 0,
        explanation:
          "Người giữ đô la được 4% từ tỷ giá và 0% từ lãi, tổng 4%. Người gửi tiền đồng được 6%. Chênh lệch 2% là phần thiệt, và nó xuất hiện dù tỷ giá đã tăng đúng như lo ngại ban đầu.",
      },
      {
        question: "Ai có lý do chính đáng để giữ ngoại tệ?",
        options: [
          "Người có khoản chi sắp tới bằng chính đồng tiền đó, như học phí hay chữa bệnh ở nước ngoài",
          "Người muốn đa dạng hóa tài sản của mình mà không cần tính tới phần chênh lệch lãi suất giữa hai đồng tiền",
          "Người tin rằng tiền đồng sẽ mất giá nhanh hơn trong vòng vài tháng tới",
          "Người có thu nhập bằng tiền đồng nhưng muốn tài sản trông ổn định hơn",
        ],
        correct: 0,
        explanation:
          "Khi khoản chi tương lai đã được định bằng ngoại tệ, giữ chính đồng tiền ấy loại bỏ rủi ro tỷ giá cho khoản đó - đây là phòng vệ chứ không phải đầu cơ. Còn giữ vì tin tỷ giá sẽ tăng thì là một dự đoán, và nó phải vượt mốc lãi suất bỏ qua.",
      },
      {
        question: "Rủi ro nào ít được nhắc tới khi giữ ngoại tệ tiền mặt tại nhà?",
        options: [
          "Không sinh lãi, có thể mất cắp hoặc hư hỏng, và tờ tiền cũ có thể bị từ chối đổi",
          "Ngân hàng sẽ từ chối đổi ngoại tệ tiền mặt sang tiền đồng cho cá nhân",
          "Ngoại tệ tiền mặt bị đánh thuế tài sản khi vượt một hạn mức nhất định",
          "Tỷ giá áp dụng cho tiền mặt luôn cao hơn hẳn tỷ giá chuyển khoản khi bán ra",
        ],
        correct: 0,
        explanation:
          "Tiền mặt ngoại tệ cộng thêm một lớp rủi ro vật lý vào một tài sản vốn đã không sinh lãi. Tỷ giá tiền mặt thường bất lợi hơn chuyển khoản chứ không có lợi hơn.",
      },
      {
        question: "Kết luận hợp lý về việc giữ ngoại tệ trong tài chính cá nhân là gì?",
        options: [
          "Hợp lý khi có nghĩa vụ chi bằng đồng tiền đó; kém hợp lý khi chỉ vì lo tiền đồng yếu",
          "Luôn nên giữ một phần vì đô la là đồng tiền mạnh nhất thế giới",
          "Không bao giờ nên giữ vì lãi suất bằng không là bất lợi tuyệt đối",
          "Nên giữ toàn bộ tài sản của mình bằng ngoại tệ nếu đang lo ngại về lạm phát trong nước",
        ],
        correct: 0,
        explanation:
          "Cả hai cực đều sai. Phòng vệ cho một nghĩa vụ có thật là dùng đúng công cụ; còn đổi toàn bộ tài sản sang một tài sản không sinh lãi để chống lại một kịch bản chưa xảy ra thì trả giá chắc chắn để phòng một rủi ro không chắc chắn.",
      },
    ],
    keyTakeaways: [
      "Tiền gửi ngoại tệ của cá nhân ở Việt Nam có trần lãi suất 0%",
      "Tỷ giá phải tăng đủ bù toàn bộ lãi tiền đồng bỏ qua thì giữ ngoại tệ mới có lợi",
      "Lý do chính đáng nhất là có nghĩa vụ chi bằng chính đồng tiền đó",
      "Ngoại tệ tiền mặt tại nhà cộng thêm rủi ro vật lý vào một tài sản đã không sinh lãi",
    ],
    practicePrompt: {
      question:
        "Bạn lo tiền đồng mất giá nên định đổi toàn bộ tiết kiệm sang đô la. Điều cần tính trước là gì?",
      options: [
        "Mức tăng tỷ giá tối thiểu mỗi năm để bù phần lãi tiền đồng bạn sẽ bỏ qua",
        "Tỷ giá đã tăng bao nhiêu trong mười hai tháng vừa qua để suy ra xu hướng",
        "Ngân hàng nào đang niêm yết tỷ giá mua vào đô la cao nhất hiện nay",
        "Nên giữ dưới dạng tiền mặt hay tài khoản để thuận tiện khi cần dùng",
      ],
      correct: 0,
      explanation:
        "Đó là ngưỡng quyết định toàn bộ, và nó phải lặp lại mỗi năm chứ không chỉ một lần. Tỷ giá năm ngoái không nói gì về năm tới, và chênh lệch tỷ giá giữa các ngân hàng quá nhỏ so với ngưỡng này.",
    },
    summary: {
      keyIdea: "Lãi 0% biến toàn bộ lãi tiền đồng bỏ qua thành mốc mà tỷ giá phải vượt hằng năm",
      commonMistake: "Chỉ nhìn vế tỷ giá và bỏ qua phần lãi tiền đồng đang chạy đều mỗi năm",
      action: "Tính mức tăng tỷ giá tối thiểu cần có để giữ ngoại tệ hòa vốn so với gửi tiền đồng.",
    },
    application: {
      title: "Một phép so hai vế",
      message:
        "Lấy lãi suất tiền gửi tiền đồng hiện hành - đó là mức tăng tỷ giá tối thiểu mỗi năm để việc giữ ngoại tệ không thiệt. Hỏi mình có tin tỷ giá sẽ tăng vượt mức đó đều đặn không.",
      secondary:
        "Nếu bạn có khoản chi tương lai bằng ngoại tệ, phép tính này không áp dụng - khi đó giữ ngoại tệ là phòng vệ, và mốc hòa vốn không phải câu hỏi đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Giữ đô la là phản xạ quen thuộc khi người ta lo tiền đồng mất giá. Nỗi lo ấy chính đáng; điều đáng xem lại là liệu công cụ này có làm được việc mà người ta giao cho nó không.",
      },
      { type: "heading", text: "Một con số đổi cả bài toán" },
      {
        type: "paragraph",
        text: "Ở nhiều nước, giữ ngoại tệ vẫn nhận lãi theo mặt bằng của đồng tiền đó, nên so sánh giữa hai đồng tiền là so cả lãi lẫn tỷ giá. Ở Việt Nam, trần lãi suất tiền gửi ngoại tệ của cá nhân là 0%, nên một vế biến mất. Toàn bộ kỳ vọng dồn vào tỷ giá, và cái giá phải trả là phần lãi tiền đồng bị bỏ lại - đều đặn, mỗi năm, bất kể tỷ giá đi đâu.",
      },
      {
        type: "conceptTable",
        title: "Ba lý do giữ ngoại tệ, chỉ một lý do vững",
        subtitle: "Phân biệt phòng vệ với đầu cơ là toàn bộ nội dung của bài này",
        concepts: [
          {
            vi: "Có nghĩa vụ chi bằng ngoại tệ",
            en: "Hedging",
            def: "Học phí, chữa bệnh, khoản vay bằng ngoại tệ. Giữ đúng đồng tiền của nghĩa vụ loại bỏ rủi ro tỷ giá cho khoản đó - đây là phòng vệ đúng nghĩa.",
          },
          {
            vi: "Tin tỷ giá sẽ tăng",
            en: "Speculation",
            def: "Đây là một dự đoán, và nó phải đúng nhiều hơn mức lãi tiền đồng bỏ qua thì mới có lợi. Gọi đúng tên giúp bạn đo được nó.",
          },
          {
            vi: "Cho yên tâm",
            en: "Comfort",
            def: "Lý do thật của phần lớn trường hợp. Nó có giá trị tâm lý thật, nhưng nên biết cái giá đang trả là bao nhiêu mỗi năm.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ngoại tệ tiền mặt là lựa chọn kém nhất trong nhóm",
        text: "Nó giữ nguyên nhược điểm không sinh lãi, cộng thêm rủi ro mất cắp và hư hỏng, cộng thêm việc tỷ giá áp cho tiền mặt thường bất lợi hơn chuyển khoản. Nếu đã quyết định giữ ngoại tệ vì một lý do chính đáng, tài khoản ngân hàng gần như luôn tốt hơn.",
      },
      {
        type: "closing",
        lines: [
          "Phòng vệ cho một nghĩa vụ có thật là dùng đúng công cụ; đổi tài sản vì một nỗi lo chung thì phải trả giá đều đặn.",
          "Bài cuối chặng: vậy vàng và ngoại tệ nên chiếm bao nhiêu phần trăm.",
        ],
      },
    ],
  },
  {
    id: 326,
    slug: "vang-ngoai-te-trong-danh-muc",
    title: "Chặng 13, Bài 7: Vàng và ngoại tệ nên chiếm bao nhiêu",
    subtitle: "Một phần nhỏ đủ để phân tán rủi ro; một phần lớn biến danh mục thành một cú đặt cược",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Sáu bài trước giải thích từng công cụ. Câu hỏi thực tế của mọi người là con số: bao nhiêu phần trăm. Câu trả lời không phải một tỷ lệ cố định cho tất cả, nhưng có một khoảng hợp lý và có những mức rõ ràng là quá nhiều.",
    openingQuestion: "Vì sao vàng vẫn đáng giữ một phần dù nó không sinh dòng tiền?",
    openingOptions: [
      "Vì nó thường không đi cùng chiều với cổ phiếu trong các giai đoạn thị trường khủng hoảng",
      "Vì nó cho mức lợi suất dài hạn cao hơn hẳn so với cả cổ phiếu lẫn trái phiếu",
      "Vì nó là tài sản duy nhất không bị ảnh hưởng bởi lạm phát và tỷ giá",
      "Vì nó dễ bán hơn mọi tài sản khác nên phù hợp làm quỹ khẩn cấp",
    ],
    correctOption: 0,
    explanation:
      "Giá trị của vàng trong một danh mục không nằm ở lợi suất kỳ vọng của nó - lợi suất dài hạn của vàng thường thấp hơn cổ phiếu. Nó nằm ở chỗ vàng có xu hướng đi lệch pha với thị trường cổ phiếu, đặc biệt trong các giai đoạn hoảng loạn. Khi một phần danh mục giảm mạnh mà một phần khác giữ được hoặc tăng, mức dao động của toàn bộ giảm xuống - và mức dao động thấp hơn là thứ giúp người ta không bán tháo vào đúng lúc tệ nhất. Đó là lý do một tỷ trọng nhỏ có ích, và cũng là lý do tỷ trọng ấy không cần lớn: tác dụng phân tán đạt gần hết ở mức thấp, còn tăng thêm chỉ kéo lợi suất kỳ vọng của cả danh mục xuống.",
    diagram: [
      { label: "Vàng lệch pha với cổ phiếu khi thị trường hoảng loạn", arrow: true },
      { label: "Một phần nhỏ làm giảm dao động toàn danh mục", arrow: true },
      { label: "Tăng thêm không tăng mấy tác dụng phân tán", arrow: true },
      { label: "Nhưng kéo lợi suất kỳ vọng xuống rõ rệt" },
    ],
    realWorldExample: {
      company: "Ba mức tỷ trọng, ba kết quả khác nhau",
      description:
        "Một danh mục không có vàng dao động mạnh nhất khi thị trường xấu. Thêm một phần nhỏ vàng thì biên độ dao động dịu đi rõ rệt mà lợi suất kỳ vọng gần như không đổi. Nhưng đẩy tỷ trọng vàng lên quá nửa danh mục thì mức dao động không giảm thêm bao nhiêu, trong khi phần tài sản sinh dòng tiền đã bị thay bằng thứ không sinh gì - và điều đó lộ ra sau nhiều năm.",
    },
    quiz: [
      {
        question: "Tác dụng chính của vàng trong danh mục là gì?",
        options: [
          "Giảm mức dao động chung nhờ ít đi cùng chiều với cổ phiếu",
          "Tăng lợi suất kỳ vọng dài hạn của toàn bộ danh mục đầu tư",
          "Thay thế vai trò của trái phiếu vì cả hai đều là tài sản an toàn",
          "Bảo đảm danh mục không bao giờ giảm giá trị trong bất kỳ năm nào",
        ],
        correct: 0,
        explanation:
          "Vàng không thay được trái phiếu vì trái phiếu trả coupon còn vàng không trả gì. Và không tài sản nào bảo đảm danh mục không giảm - mục tiêu chỉ là giảm biên độ, không phải xóa bỏ nó.",
      },
      {
        question: "Vì sao tăng tỷ trọng vàng lên rất cao lại phản tác dụng?",
        options: [
          "Vì lợi ích phân tán đạt gần hết ở mức thấp, còn phần thêm chỉ giảm lợi suất kỳ vọng",
          "Vì cửa hàng vàng giới hạn khối lượng mà một cá nhân được mua mỗi năm",
          "Vì giữ nhiều vàng làm tăng chi phí bảo quản theo cấp số nhân",
          "Vì tỷ trọng vàng cao khiến cả danh mục dao động mạnh hơn cả khi chỉ nắm giữ cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Đây là quy luật lợi ích giảm dần. Những phần trăm đầu tiên mang lại gần như toàn bộ tác dụng phân tán; những phần trăm sau chủ yếu chỉ đổi tài sản sinh dòng tiền lấy tài sản không sinh gì.",
      },
      {
        question: "Người sắp có khoản chi lớn bằng ngoại tệ nên xử lý thế nào?",
        options: [
          "Giữ phần tương ứng bằng chính đồng tiền đó, tách khỏi phần đầu tư dài hạn",
          "Tăng tỷ trọng vàng vì vàng và ngoại tệ có tác dụng phòng vệ tương tự nhau",
          "Chuyển toàn bộ danh mục sang ngoại tệ cho tới khi khoản chi hoàn tất",
          "Giữ nguyên danh mục và đổi tiền vào đúng ngày cần chi trả khoản đó",
        ],
        correct: 0,
        explanation:
          "Vàng không phòng vệ được cho một nghĩa vụ bằng đô la, vì giá vàng và tỷ giá là hai thứ khác nhau. Và đợi tới đúng ngày chi mới đổi là để toàn bộ khoản đó chịu rủi ro tỷ giá của một ngày duy nhất.",
      },
      {
        question: "Thứ tự ưu tiên đúng khi xây danh mục có vàng là gì?",
        options: [
          "Quỹ khẩn cấp trước, rồi tài sản sinh dòng tiền, cuối cùng mới tới phần vàng",
          "Vàng trước vì nó an toàn nhất, rồi mới tới các tài sản còn lại",
          "Chia đều ngay từ đầu cho cả ba nhóm tài sản để cân bằng rủi ro tổng thể",
          "Ngoại tệ trước vì nó bảo vệ khỏi rủi ro mất giá của đồng nội tệ",
        ],
        correct: 0,
        explanation:
          "Vàng là lớp cuối cùng vì nó không giải quyết được nhiệm vụ nào của hai lớp trước: nó không cho giá trị biết trước như quỹ khẩn cấp, và không sinh dòng tiền như lớp giữa.",
      },
      {
        question: "Dấu hiệu nào cho thấy tỷ trọng vàng đã quá cao?",
        options: [
          "Phần lớn tài sản của bạn không sinh ra đồng nào trong nhiều năm liền",
          "Giá vàng biến động khiến bạn phải theo dõi bảng giá mỗi ngày",
          "Bạn phải chia vàng ra cất ở nhiều nơi khác nhau cho an toàn",
          "Giá trị số vàng đang nắm giữ đã vượt qua giá trị khoản tiền gửi tiết kiệm",
        ],
        correct: 0,
        explanation:
          "Đây là phép thử thực dụng nhất và nó không cần tới công thức nào. Nếu tài sản của bạn phần lớn nằm ở thứ không tạo ra dòng tiền, thì toàn bộ tương lai tài chính đang phụ thuộc vào việc người sau trả giá cao hơn.",
      },
    ],
    keyTakeaways: [
      "Vàng có ích vì lệch pha với cổ phiếu, không phải vì lợi suất kỳ vọng cao",
      "Lợi ích phân tán đạt gần hết ở tỷ trọng thấp; thêm nữa chủ yếu làm giảm lợi suất kỳ vọng",
      "Ngoại tệ phòng vệ cho nghĩa vụ bằng ngoại tệ - vàng không thay thế được vai trò đó",
      "Thứ tự: quỹ khẩn cấp, rồi tài sản sinh dòng tiền, cuối cùng mới tới vàng",
    ],
    practicePrompt: {
      question:
        "Danh mục của bạn hiện có 70% vàng, 20% tiền gửi, 10% cổ phiếu. Vấn đề lớn nhất là gì?",
      options: [
        "Phần lớn tài sản không sinh dòng tiền nào, nên tăng trưởng phụ thuộc hoàn toàn vào giá vàng",
        "Tỷ trọng cổ phiếu quá thấp nên danh mục sẽ không theo kịp mức lạm phát trong dài hạn",
        "Tiền gửi 20% là quá nhiều cho một danh mục hướng tới tăng trưởng",
        "Không có vấn đề gì nếu bạn tin rằng giá vàng sẽ tiếp tục tăng",
      ],
      correct: 0,
      explanation:
        "Tỷ trọng cổ phiếu thấp là hệ quả chứ không phải nguyên nhân. Gốc của vấn đề là 70% tài sản đang ở nơi không tạo ra gì, nên nó không còn là danh mục phân tán mà là một cú đặt cược vào một biến duy nhất.",
    },
    summary: {
      keyIdea: "Vàng là lớp phân tán, không phải lớp tăng trưởng - nên nó thuộc về phần nhỏ của danh mục",
      commonMistake: "Đẩy tỷ trọng vàng lên rất cao vì thấy an tâm, và biến danh mục thành một cú đặt cược",
      action: "Tính tỷ lệ tài sản của bạn đang nằm ở những thứ không sinh ra dòng tiền nào.",
    },
    application: {
      title: "Một phép chia đơn giản",
      message:
        "Chia tài sản của bạn thành hai nhóm: nhóm tạo ra dòng tiền và nhóm không. Tính tỷ lệ nhóm thứ hai. Nếu nó chiếm phần lớn, tăng trưởng của bạn đang phụ thuộc hoàn toàn vào giá bán lại.",
      secondary:
        "Phép chia này không nói con số nào là đúng cho bạn. Nó chỉ cho thấy bạn đang đặt cược vào cái gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáu bài trước trả lời vàng và ngoại tệ là gì. Bài này trả lời câu hỏi mà ai cũng hỏi trước tiên và đáng lẽ nên hỏi sau cùng: bao nhiêu phần trăm.",
      },
      { type: "heading", text: "Vì sao một phần nhỏ có ích còn phần lớn thì không" },
      {
        type: "paragraph",
        text: "Vàng có ích trong danh mục không phải vì nó sinh lời tốt mà vì nó thường không giảm cùng lúc với cổ phiếu. Khi một phần danh mục lao dốc mà phần khác đứng vững, biên độ dao động của tổng thể dịu đi - và điều đó quan trọng hơn vẻ ngoài, vì mức dao động thấp hơn là thứ giúp người ta không bán tháo vào đúng đáy. Nhưng tác dụng này bão hòa rất nhanh: những phần trăm đầu tiên mang lại gần hết lợi ích, còn phần thêm chỉ đổi tài sản sinh dòng tiền lấy tài sản không sinh gì.",
      },
      {
        type: "conceptTable",
        title: "Ba lớp của một danh mục, theo thứ tự xây",
        subtitle: "Vàng là lớp cuối vì nó không làm được việc của hai lớp trước",
        concepts: [
          {
            vi: "Lớp an toàn",
            en: "Safety",
            def: "Quỹ khẩn cấp ở tiền gửi. Yêu cầu duy nhất là giá trị biết trước và lấy ra được ngay. Vàng không đáp ứng được vì giá có thể đang thấp đúng lúc cần.",
          },
          {
            vi: "Lớp sinh dòng tiền",
            en: "Income & growth",
            def: "Tiền gửi kỳ hạn, trái phiếu, cổ phiếu, quỹ. Đây là nơi tài sản thật sự lớn lên, và nó nên chiếm phần lớn.",
          },
          {
            vi: "Lớp phân tán",
            en: "Diversifier",
            def: "Vàng, và ngoại tệ khi có nghĩa vụ tương ứng. Mục tiêu là giảm dao động chứ không phải tạo tăng trưởng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Vàng và ngoại tệ không thay thế cho nhau",
        text: "Chúng phòng vệ cho hai rủi ro khác nhau. Ngoại tệ khớp với một nghĩa vụ cụ thể bằng đồng tiền đó - học phí, khoản vay, chi phí điều trị ở nước ngoài. Vàng không khớp với nghĩa vụ nào cả; nó chỉ có xu hướng lệch pha với thị trường cổ phiếu. Dùng cái này để phòng cho rủi ro của cái kia là để hở đúng chỗ bạn tưởng đã che.",
      },
      {
        type: "closing",
        lines: [
          "Một danh mục phần lớn không sinh dòng tiền không còn là danh mục, nó là một cú đặt cược.",
          "Bài cuối chặng: gộp tất cả thành vài câu hỏi trả lời được trước khi mua bất cứ thứ gì.",
        ],
      },
    ],
  },
  {
    id: 327,
    slug: "khi-nao-vang-dang-giu",
    title: "Chặng 13, Bài 8: Tổng kết - khi nào vàng đáng giữ, khi nào không",
    subtitle: "Bốn câu hỏi trả lời được trước khi mua, thay cho mọi lời khuyên truyền miệng",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    whyItMatters:
      "Vàng là chủ đề có nhiều lời khuyên truyền miệng nhất và ít con số nhất. Bảy bài trước cung cấp các con số; bài này gộp chúng thành một quy trình ngắn để bạn tự trả lời thay vì hỏi người khác nên mua hay không.",
    openingQuestion: "Câu hỏi nào nên trả lời TRƯỚC TIÊN khi cân nhắc mua vàng?",
    openingOptions: [
      "Giá vàng hiện đang ở mức cao hay thấp so với vài năm gần đây",
      "Khoản tiền này dùng cho mục đích gì và khi nào tôi cần tới nó",
      "Nên mua vàng miếng thương hiệu lớn hay vàng nhẫn để dễ bán lại",
      "Cửa hàng nào đang có mức chênh lệch mua vào bán ra hẹp nhất",
    ],
    correctOption: 1,
    explanation:
      "Ba câu còn lại đều là câu hỏi hay, nhưng chúng là câu hỏi thứ hai. Mục đích và khung thời gian quyết định vàng có phải công cụ phù hợp hay không, và nếu câu trả lời là không thì mọi câu sau đó trở nên vô nghĩa. Tiền cần dùng trong hai năm không thuộc về một tài sản có thể giảm giá và mất vài phần trăm ngay khi mua. Tiền quỹ khẩn cấp cũng vậy. Chỉ khi khoản tiền đó thật sự dài hạn và bạn đã có hai lớp trước của danh mục thì câu hỏi mua loại nào và mua ở đâu mới đáng đặt ra.",
    diagram: [
      { label: "Mục đích và khung thời gian là gì", arrow: true },
      { label: "Hai lớp trước của danh mục đã đủ chưa", arrow: true },
      { label: "Mốc hòa vốn của chênh lệch mua-bán bao nhiêu", arrow: true },
      { label: "Giờ mới tới câu mua loại nào và mua ở đâu" },
    ],
    realWorldExample: {
      company: "Hai người mua vàng cùng một ngày",
      description:
        "Người thứ nhất đã có quỹ khẩn cấp, có tiền gửi khớp các mốc chi tiêu, và mua vàng bằng khoản dư thật sự dài hạn - chiếm một phần nhỏ tài sản. Người thứ hai dồn cả khoản dự phòng vào vàng vì nghe nói giá sắp tăng. Sáu tháng sau cả hai gặp một khoản chi đột xuất: người đầu rút từ quỹ khẩn cấp, người sau phải bán vàng đúng lúc giá chưa vượt nổi mốc hòa vốn.",
    },
    quiz: [
      {
        question: "Khoản tiền nào KHÔNG nên để bằng vàng?",
        options: [
          "Quỹ khẩn cấp và tiền cho một mốc chi tiêu đã biết trong vài năm tới",
          "Phần tài sản dài hạn chưa có kế hoạch sử dụng cụ thể nào",
          "Khoản thừa kế dự định để lại cho thế hệ sau trong nhiều chục năm",
          "Phần dư sau khi đã có quỹ khẩn cấp và các khoản đầu tư sinh dòng tiền",
        ],
        correct: 0,
        explanation:
          "Cả hai đều cần giá trị biết trước vào một thời điểm cụ thể, mà đó chính là thứ vàng không cung cấp. Ba phương án còn lại đều là tiền dài hạn, tức đúng loại tiền mà biến động giá không gây hậu quả ngay.",
      },
      {
        question: "Vì sao nên hỏi mốc hòa vốn trước khi mua?",
        options: [
          "Vì nó cho biết giá phải tăng bao nhiêu thì bạn mới bắt đầu có lãi",
          "Vì cửa hàng bắt buộc phải công bố mốc hòa vốn cho từng sản phẩm",
          "Vì mốc hòa vốn quyết định mức thuế phải nộp khi bán lại vàng",
          "Vì nó cho biết thời điểm tốt nhất trong năm để mua vàng vào",
        ],
        correct: 0,
        explanation:
          "Chênh lệch mua-bán đặt bạn vào trạng thái lỗ ngay từ giây đầu tiên. Biết con số ấy biến một quyết định cảm tính thành một quyết định có ngưỡng rõ ràng để so sánh.",
      },
      {
        question: "Kết luận nào đúng về vai trò của vàng?",
        options: [
          "Một lớp phân tán chiếm phần nhỏ, sau khi đã có lớp an toàn và lớp sinh dòng tiền",
          "Một kênh tích lũy chính có thể thay thế cho tiền gửi trong giai đoạn lãi suất xuống thấp",
          "Một công cụ chống lạm phát đáng tin cậy trên mọi khung thời gian",
          "Một tài sản nên tránh hoàn toàn vì nó không sinh ra dòng tiền nào",
        ],
        correct: 0,
        explanation:
          "Cả hai thái cực đều bị bảy bài trước bác bỏ. Vàng có một vai trò thật nhưng hẹp, và toàn bộ chặng này là mô tả ranh giới của vai trò ấy.",
      },
      {
        question: "Nếu bạn không trả lời được câu hỏi khi nào cần tới khoản tiền này thì sao?",
        options: [
          "Đó là dấu hiệu nên dừng lại và làm rõ mục đích trước khi mua bất cứ thứ gì",
          "Cứ mua một phần nhỏ trước rồi quyết định mục đích sau khi đã có tài sản",
          "Chọn kỳ hạn dài nhất có thể vì thời gian sẽ tự giải quyết mọi biến động",
          "Chia đôi khoản tiền để một nửa dài hạn và một nửa có thể dùng bất cứ lúc nào",
        ],
        correct: 0,
        explanation:
          "Không biết khung thời gian nghĩa là chưa xác định được rủi ro nào chấp nhận được. Mua trước rồi tính sau là cách chắc chắn để phát hiện mình chọn sai công cụ vào đúng lúc cần tiền.",
      },
      {
        question: "Cách kiểm tra nhanh xem tỷ trọng vàng có quá cao không là gì?",
        options: [
          "Tính tỷ lệ tài sản không sinh ra dòng tiền nào trong tổng tài sản của bạn",
          "So giá trị vàng đang giữ với giá trị vàng của những người xung quanh",
          "Xem giá vàng đã tăng hay giảm kể từ lần mua gần nhất của bạn",
          "Đếm số lượng sản phẩm vàng khác nhau mà bạn đang nắm giữ",
        ],
        correct: 0,
        explanation:
          "Phép thử này không cần công thức và cũng không cần biết giá hiện tại. Nếu phần lớn tài sản không tạo ra gì, tương lai tài chính của bạn đang phụ thuộc hoàn toàn vào giá bán lại.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi đầu tiên luôn là mục đích và khung thời gian, không phải giá đang cao hay thấp",
      "Quỹ khẩn cấp và các mốc chi tiêu gần không thuộc về vàng",
      "Biết mốc hòa vốn biến một quyết định cảm tính thành một quyết định có ngưỡng",
      "Vàng là lớp cuối cùng của danh mục, không phải lớp đầu tiên",
    ],
    practicePrompt: {
      question:
        "Bạn có 200 triệu dư, đã có quỹ khẩn cấp và các khoản tiền gửi khớp mốc chi tiêu. Bước hợp lý tiếp theo là gì?",
      options: [
        "Cân nhắc tỷ trọng nhỏ cho vàng, phần lớn còn lại vào tài sản sinh dòng tiền",
        "Dồn toàn bộ vào vàng vì hai lớp trước đã được lo xong xuôi",
        "Giữ nguyên tiền mặt cho tới khi giá vàng giảm về mức hấp dẫn hơn",
        "Chia đều 200 triệu cho vàng, ngoại tệ và cổ phiếu để phân tán tối đa",
      ],
      correct: 0,
      explanation:
        "Hai lớp trước đã xong nghĩa là bạn đủ điều kiện để nghĩ tới lớp phân tán, không có nghĩa là lớp phân tán nên nuốt toàn bộ phần dư. Chia đều ba phần thì tỷ trọng vàng và ngoại tệ cộng lại đã chiếm hai phần ba - quá cao cho một lớp có vai trò hẹp như vậy.",
    },
    summary: {
      keyIdea: "Mục đích và khung thời gian quyết định vàng có phù hợp không; mọi câu hỏi khác đến sau",
      commonMistake: "Bắt đầu bằng câu hỏi giá đang cao hay thấp, và bỏ qua câu hỏi khoản tiền này để làm gì",
      action: "Trước lần mua vàng tiếp theo, trả lời bốn câu hỏi trong bài theo đúng thứ tự.",
    },
    application: {
      title: "Bốn câu, theo đúng thứ tự",
      message:
        "Khoản tiền này để làm gì và khi nào cần tới. Tôi đã có quỹ khẩn cấp và tài sản sinh dòng tiền chưa. Mốc hòa vốn của chênh lệch mua-bán là bao nhiêu. Và cuối cùng mới tới mua loại nào.",
      secondary:
        "Nếu dừng lại ở câu một hoặc câu hai thì bạn vừa tiết kiệm được cả khoản chênh lệch lẫn nhiều năm chi phí cơ hội.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước là bảy con số. Bài này gộp chúng thành một quy trình đủ ngắn để dùng thật - bốn câu hỏi, theo đúng thứ tự, trước khi bỏ ra đồng nào.",
      },
      { type: "heading", text: "Vì sao thứ tự quan trọng" },
      {
        type: "paragraph",
        text: "Phần lớn cuộc trò chuyện về vàng bắt đầu ở câu hỏi giá đang cao hay thấp, và đó là câu hỏi thứ ba hoặc thứ tư. Nếu khoản tiền ấy là quỹ khẩn cấp thì giá cao hay thấp không đổi được kết luận. Nếu bạn chưa có lớp tài sản sinh dòng tiền nào thì cũng vậy. Hai câu hỏi đầu tiên loại bỏ phần lớn trường hợp, và chúng không cần biết giá hôm nay là bao nhiêu.",
      },
      {
        type: "list",
        items: [
          "Khoản tiền này để làm gì và khi nào tôi cần - nếu dưới vài năm thì dừng ở đây",
          "Tôi đã có quỹ khẩn cấp và tài sản sinh dòng tiền chưa - nếu chưa thì dừng ở đây",
          "Mốc hòa vốn của chênh lệch mua-bán là bao nhiêu phần trăm",
          "Mua loại nào - loại bám sát giá thế giới nếu mục đích là nắm giữ giá trị kim loại",
        ],
      },
      {
        type: "conceptTable",
        title: "Ba câu nói quen thuộc, đặt lại cho đúng",
        subtitle: "Mỗi câu đều có phần đúng, và phần đúng ấy hẹp hơn cách nó được dùng",
        concepts: [
          {
            vi: "Vàng an toàn",
            en: "Gold is safe",
            def: "Đúng theo nghĩa nó không phá sản. Sai theo nghĩa giá trị ổn định - giá vàng dao động mạnh hơn số dư tiền gửi rất nhiều.",
          },
          {
            vi: "Vàng chống lạm phát",
            en: "Gold hedges inflation",
            def: "Đúng trên khung hàng chục năm. Trên khung vài năm - khung mà kế hoạch của bạn sống - mối liên hệ rất lỏng.",
          },
          {
            vi: "Vàng giữ giá trị",
            en: "Gold stores value",
            def: "Đúng, nhưng giữ giá trị không phải tạo ra giá trị. Trong lúc giữ, nó không trả cho bạn đồng nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chặng này không khuyên bạn tránh vàng",
        text: "Nó chỉ đặt vàng vào đúng chỗ: một lớp phân tán chiếm phần nhỏ, đứng sau quỹ khẩn cấp và sau các tài sản sinh dòng tiền. Với tỷ trọng đó, vàng làm được đúng việc mà nó làm tốt, và không bị giao những việc nó không làm được.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 13. Bạn đã có đủ con số để tự trả lời câu hỏi mà trước đây phải đi hỏi người khác.",
          "Và câu trả lời gần như luôn bắt đầu bằng khoản tiền này để làm gì, chứ không bằng giá hôm nay là bao nhiêu.",
        ],
      },
    ],
  },
];
