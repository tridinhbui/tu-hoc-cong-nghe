import type { Lesson } from "./lesson-types";

// Chặng 12 của track cá nhân: ngân hàng, tiết kiệm và tiền gửi.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Track cá nhân dạy rất kỹ cổ phiếu (20 bài), trái
// phiếu (20 bài) và danh mục (22 bài), nhưng nơi mà gần như 100% người học
// Việt Nam thật sự để tiền - sổ tiết kiệm ngân hàng - thì không có bài nào.
// Kết quả là người học biết tính duration của trái phiếu nhưng không biết vì
// sao rút sổ trước hạn lại mất gần hết lãi, hay bảo hiểm tiền gửi bảo vệ tới
// đâu.
//
// Ids 310-319 nối tiếp Chặng 11 (300-309) trong dải 299-800 vốn trống.
// Id là VỊ TRÍ trong lộ trình chứ không phải số tự tăng - xem chú thích đầu
// lib/income-growth-lessons.ts để biết bảy nơi phải cập nhật cùng lúc.

export const PERSONAL_BANKING_LESSONS: Lesson[] = [
  {
    id: 310,
    slug: "gui-tiet-kiem-hoat-dong-the-nao",
    title: "Chặng 12, Bài 1: Gửi tiết kiệm hoạt động thế nào",
    subtitle: "Kỳ hạn, ngày đáo hạn và chuyện gì xảy ra nếu bạn quên mất sổ",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🏦",
    track: "personal",
    whyItMatters:
      "Sổ tiết kiệm là nơi đầu tiên và thường là duy nhất mà người Việt để tiền dư. Nó đơn giản tới mức ít ai đọc kỹ, và chính vì thế mà những chi tiết quyết định số tiền nhận về - kỳ hạn, cách tính lãi, điều gì xảy ra lúc đáo hạn - lại là thứ nhiều người không biết.",
    openingQuestion: "Sổ tiết kiệm kỳ hạn 6 tháng đáo hạn mà bạn không tới ngân hàng thì sao?",
    openingOptions: [
      "Ngân hàng tự động chuyển toàn bộ tiền sang tài khoản thanh toán của bạn",
      "Sổ thường được tự động gia hạn thêm một kỳ hạn cùng loại theo lãi suất hiện hành",
      "Tiền vẫn nằm nguyên ở đó nhưng ngừng sinh lãi cho tới khi bạn ra ngân hàng tất toán sổ",
      "Ngân hàng giữ nguyên mức lãi suất cũ cho tới khi bạn chủ động rút tiền ra",
    ],
    correctOption: 1,
    explanation:
      "Phần lớn sổ tiết kiệm ở Việt Nam mặc định tự động tái tục: tới ngày đáo hạn, gốc và lãi được gộp lại rồi gửi tiếp một kỳ hạn nữa, nhưng theo lãi suất đang niêm yết tại thời điểm đó chứ không phải lãi suất cũ. Đây là chi tiết quan trọng khi mặt bằng lãi suất đang giảm: sổ 8% năm ngoái có thể tự tái tục ở 5% mà không ai báo. Tiền không ngừng sinh lãi và cũng không tự chảy về tài khoản thanh toán - hai ngộ nhận phổ biến. Vì vậy ngày đáo hạn là ngày cần đánh dấu lịch, chứ không phải ngày có thể bỏ qua.",
    diagram: [
      { label: "Gửi tiền, chọn kỳ hạn", arrow: true },
      { label: "Lãi tính theo lãi suất khóa tại ngày gửi", arrow: true },
      { label: "Đáo hạn: gốc và lãi gộp lại", arrow: true },
      { label: "Tự tái tục theo lãi suất MỚI nếu bạn không làm gì" },
    ],
    interactiveType: "interest-rate",
    realWorldExample: {
      company: "Sổ tự tái tục qua một chu kỳ giảm lãi suất",
      description:
        "Một người gửi 200 triệu kỳ hạn 12 tháng lúc lãi suất 7,4%. Một năm sau sổ tự tái tục, nhưng mặt bằng đã về 5,1% nên kỳ thứ hai chỉ sinh khoảng 10,9 triệu thay vì 15,9 triệu. Không có gì sai xảy ra và ngân hàng không làm gì khuất tất - chỉ là ngày đáo hạn trôi qua mà không ai xem lại.",
    },
    quiz: [
      {
        question: "Lãi suất ghi trên sổ tiết kiệm có thay đổi trong kỳ hạn không?",
        options: [
          "Không, nó được khóa cho tới hết kỳ hạn đã chọn",
          "Có, ngân hàng điều chỉnh theo lãi suất niêm yết vào đầu mỗi tháng",
          "Có, nhưng chỉ điều chỉnh tăng chứ không bao giờ điều chỉnh giảm xuống",
          "Không, trừ khi ngân hàng nhà nước thay đổi mức lãi suất điều hành cơ bản",
        ],
        correct: 0,
        explanation:
          "Đây là điểm khác biệt cốt lõi giữa tiền gửi có kỳ hạn và tài khoản thanh toán. Bạn đổi tính linh hoạt lấy một mức lãi cố định, và ngân hàng không được đơn phương đổi mức ấy giữa kỳ.",
      },
      {
        question: "Gửi 100 triệu kỳ hạn 12 tháng lãi 6%/năm thì nhận về bao nhiêu khi đáo hạn?",
        options: [
          "106 triệu (= 100 triệu gốc cộng 6 triệu tiền lãi của một năm)",
          "100,5 triệu (= gốc cộng lãi không kỳ hạn vì chưa rút ra)",
          "112 triệu (= gốc cộng lãi kép tính theo từng nửa năm một)",
          "106 triệu trừ đi phần thuế thu nhập cá nhân tính trên tiền lãi nhận được",
        ],
        correct: 0,
        explanation:
          "Lãi tiền gửi tiết kiệm của cá nhân hiện không chịu thuế thu nhập cá nhân ở Việt Nam, nên số nhận về đúng bằng gốc cộng lãi. Lãi kép chỉ xuất hiện khi sổ được tái tục sang kỳ sau, không xuất hiện bên trong một kỳ hạn.",
      },
      {
        question: "Vì sao kỳ hạn dài thường có lãi suất cao hơn kỳ hạn ngắn?",
        options: [
          "Vì ngân hàng trả thêm cho việc bạn cam kết không rút tiền trong thời gian dài hơn",
          "Vì kỳ hạn dài được bảo hiểm tiền gửi bảo vệ ở mức cao hơn kỳ hạn ngắn",
          "Vì lạm phát trong tương lai luôn cao hơn hiện tại nên ngân hàng phải bù lại đúng phần chênh đó",
          "Vì ngân hàng nhà nước quy định mức lãi suất sàn riêng cho từng kỳ hạn",
        ],
        correct: 0,
        explanation:
          "Ngân hàng cần nguồn vốn ổn định để cho vay dài hạn, nên họ trả thêm cho sự chắc chắn. Đây cũng là lý do khi mặt bằng lãi suất được dự báo giảm, khóa một kỳ hạn dài lại có lợi.",
      },
      {
        question: "Tự động tái tục có bất lợi gì?",
        options: [
          "Kỳ mới áp theo lãi suất hiện hành, có thể thấp hơn hẳn kỳ trước mà không ai báo",
          "Ngân hàng thu một khoản phí gia hạn và trừ thẳng khoản đó vào tiền lãi của kỳ mới",
          "Sổ tái tục không còn được bảo hiểm tiền gửi bảo vệ như kỳ gửi đầu tiên",
          "Bạn mất quyền rút tiền trước hạn trong suốt kỳ hạn được gia hạn thêm",
        ],
        correct: 0,
        explanation:
          "Cơ chế tái tục bản thân nó tiện, và nó cũng không kèm phí. Rủi ro nằm ở chỗ nó im lặng: bạn chỉ phát hiện lãi suất đã đổi khi tình cờ mở lại sổ, có khi cả năm sau.",
      },
      {
        question: "Nên làm gì vào ngày đáo hạn?",
        options: [
          "So lãi suất hiện hành giữa vài ngân hàng rồi quyết định gửi tiếp hay chuyển",
          "Luôn tất toán và gửi lại từ đầu để được hưởng lãi suất ưu đãi cho khách mới",
          "Luôn để sổ tự tái tục vì đó là cách giữ được mức lãi suất cao nhất",
          "Chuyển toàn bộ sang kỳ hạn dài nhất vì kỳ hạn dài luôn có lãi cao hơn",
        ],
        correct: 0,
        explanation:
          "Không có câu trả lời luôn đúng cho mọi thời điểm, vì nó phụ thuộc mặt bằng lãi suất và nhu cầu dùng tiền của bạn. Điều duy nhất luôn đúng là ngày đáo hạn nên được xem lại chứ đừng để trôi qua.",
      },
    ],
    keyTakeaways: [
      "Lãi suất được khóa trong kỳ hạn - đó là thứ bạn đổi lấy việc cam kết không rút",
      "Đáo hạn mà không làm gì thì sổ tự tái tục, nhưng theo lãi suất MỚI chứ không phải lãi cũ",
      "Lãi tiền gửi tiết kiệm cá nhân hiện không chịu thuế thu nhập cá nhân",
      "Kỳ hạn dài trả cao hơn vì ngân hàng mua sự chắc chắn về nguồn vốn",
    ],
    practicePrompt: {
      question:
        "Bạn có 300 triệu chưa dùng tới trong khoảng một năm, mặt bằng lãi suất đang được dự báo giảm. Nên làm gì?",
      options: [
        "Khóa một kỳ hạn dài để giữ mức lãi hiện tại trước khi mặt bằng hạ xuống",
        "Chia thành nhiều sổ kỳ hạn một tháng để linh hoạt điều chỉnh theo thị trường",
        "Để trong tài khoản thanh toán chờ tới khi lãi suất chạm đáy rồi mới gửi",
        "Gửi kỳ hạn ba tháng rồi mỗi lần đáo hạn lại xem xét gia hạn tiếp",
      ],
      correct: 0,
      explanation:
        "Khi lãi suất được dự báo giảm, kỳ hạn dài khóa được mức cao hôm nay cho cả năm. Kỳ hạn ngắn buộc bạn tái gửi nhiều lần, và mỗi lần tái gửi đều rơi vào mặt bằng thấp hơn - đúng chiều bất lợi.",
    },
    summary: {
      keyIdea: "Sổ tiết kiệm khóa lãi suất trong kỳ hạn, và tự tái tục theo lãi suất mới khi đáo hạn",
      commonMistake: "Để ngày đáo hạn trôi qua, rồi cả năm sau mới biết sổ đang chạy ở mức lãi thấp hơn nhiều",
      action: "Đặt lịch nhắc trước ngày đáo hạn của mọi sổ bạn đang có một tuần.",
    },
    application: {
      title: "Đánh dấu ngày đáo hạn tối nay",
      message:
        "Mở ứng dụng ngân hàng, ghi lại ngày đáo hạn và mức lãi suất của từng sổ đang có. Đặt lịch nhắc trước một tuần cho mỗi ngày đó.",
      secondary:
        "Nếu có sổ đã tái tục từ lâu, hãy so mức lãi hiện tại của nó với mức đang niêm yết - chênh lệch có thể lớn hơn bạn nghĩ.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười một chặng vừa qua nói về cổ phiếu, trái phiếu và danh mục. Nhưng nơi phần lớn người Việt thật sự để tiền là sổ tiết kiệm, và nó có những quy tắc riêng đáng biết trước khi bàn tới bất cứ kênh nào khác.",
      },
      { type: "heading", text: "Ba con số trên một cuốn sổ" },
      {
        type: "paragraph",
        text: "Số tiền gốc, kỳ hạn và lãi suất. Lãi suất được khóa tại ngày gửi và không đổi cho tới hết kỳ - đây là thứ bạn nhận lại khi cam kết không rút. Kỳ hạn quyết định mức lãi ấy cao hay thấp, vì ngân hàng trả thêm cho nguồn vốn ổn định. Và ngày đáo hạn là ngày duy nhất bạn có quyền quyết định lại mà không mất gì.",
      },
      {
        type: "conceptTable",
        title: "Ba nơi giữ tiền ở ngân hàng",
        subtitle: "Khác nhau ở chỗ đổi tính linh hoạt lấy bao nhiêu lãi",
        concepts: [
          {
            vi: "Tài khoản thanh toán",
            en: "Current account",
            def: "Rút bất cứ lúc nào, lãi gần như bằng không. Đây là nơi giữ tiền chi tiêu trong tháng, không phải nơi giữ tiền tiết kiệm.",
          },
          {
            vi: "Tiền gửi có kỳ hạn",
            en: "Term deposit",
            def: "Lãi suất khóa theo kỳ hạn đã chọn. Rút trước hạn thì phần lãi gần như mất hết - đó là cái giá của cam kết.",
          },
          {
            vi: "Tiền gửi không kỳ hạn",
            en: "Demand deposit",
            def: "Linh hoạt như tài khoản thanh toán, lãi nhỉnh hơn một chút nhưng vẫn rất thấp. Hợp lý cho khoản chờ dùng trong vài tuần.",
          },
        ],
      },
      {
        type: "callout",
        label: "Tái tục im lặng là rủi ro thật, không phải chuyện nhỏ",
        text: "Ngân hàng không có nghĩa vụ gọi điện báo rằng lãi suất kỳ mới thấp hơn kỳ cũ. Trong một chu kỳ giảm lãi suất, một cuốn sổ để quên có thể chạy ở mức thấp hơn mặt bằng suốt nhiều kỳ liên tiếp - và toàn bộ phần chênh lệch ấy là tiền của bạn.",
      },
      {
        type: "closing",
        lines: [
          "Sổ tiết kiệm đơn giản, nhưng đơn giản không có nghĩa là không cần xem lại.",
          "Bài sau: con số 6% trên sổ không phải phần bạn thật sự giàu thêm - lạm phát lấy đi một phần của nó.",
        ],
      },
    ],
  },
  {
    id: 311,
    slug: "lai-suat-thuc-sau-lam-phat",
    title: "Chặng 12, Bài 2: Lãi suất thực - phần bạn thật sự giàu thêm",
    subtitle: "Gửi 6% trong năm lạm phát 4% thì sức mua của bạn chỉ tăng khoảng 2%",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "personal",
    whyItMatters:
      "Con số trên sổ tiết kiệm là lãi suất danh nghĩa, và nó luôn trông đẹp hơn thực tế. Thứ quyết định bạn mua được nhiều hơn hay ít hơn năm ngoái là phần còn lại sau khi trừ lạm phát - và trong vài giai đoạn, phần còn lại đó là số âm.",
    openingQuestion: "Gửi tiết kiệm 6%/năm, lạm phát năm đó 4%. Sức mua của bạn thay đổi thế nào?",
    openingOptions: [
      "Tăng khoảng 2%, vì phần lạm phát đã ăn mất hai phần ba tiền lãi danh nghĩa",
      "Tăng đúng 6%, vì đó là số tiền thật sự được cộng vào tài khoản của bạn",
      "Không đổi, vì lãi tiền gửi và lạm phát luôn triệt tiêu lẫn nhau về dài hạn",
      "Giảm 4%, vì lạm phát làm mất giá toàn bộ số tiền gốc bạn đang gửi",
    ],
    correctOption: 0,
    explanation:
      "Số dư tài khoản đúng là tăng 6%, nhưng giá cả cũng tăng 4%, nên số hàng hóa bạn mua được chỉ nhiều hơn khoảng 2%. Đó là lãi suất thực, và nó là con số duy nhất nói lên bạn có giàu thêm hay không. Cách tính nhanh là lấy lãi suất danh nghĩa trừ lạm phát - đủ chính xác ở mức lãi suất thông thường. Điều đáng nhớ hơn phép trừ: khi lạm phát vượt lãi tiền gửi, lãi suất thực âm, và giữ tiền trong sổ tiết kiệm khi đó là mất sức mua một cách chậm rãi nhưng chắc chắn.",
    diagram: [
      { label: "Lãi suất danh nghĩa trên sổ", arrow: true },
      { label: "Trừ đi tỷ lệ lạm phát cùng kỳ", arrow: true },
      { label: "Còn lại là lãi suất thực", arrow: true },
      { label: "Âm nghĩa là sức mua đang giảm dần" },
    ],
    interactiveType: "inflation-calculator",
    realWorldExample: {
      company: "Mười năm gửi tiết kiệm liên tục",
      description:
        "Một người gửi 500 triệu suốt mười năm ở mức trung bình 6,5%, tái tục đều đặn. Số dư cuối kỳ khoảng 938 triệu - gần gấp đôi. Nhưng nếu lạm phát trung bình giai đoạn đó là 3,5%, sức mua thật chỉ tăng khoảng 34%, tức tương đương 670 triệu theo giá của mười năm trước. Khoản chênh lệch gần 270 triệu không mất đi đâu cả; nó chưa từng tồn tại.",
    },
    quiz: [
      {
        question: "Lãi suất thực được tính xấp xỉ thế nào?",
        options: [
          "Lãi suất danh nghĩa trừ tỷ lệ lạm phát trong cùng kỳ",
          "Lãi suất danh nghĩa nhân với tỷ lệ lạm phát rồi chia cho một trăm",
          "Lãi suất danh nghĩa cộng lạm phát, vì cả hai đều làm tài khoản tăng lên",
          "Lãi suất danh nghĩa chia cho số năm gửi rồi trừ đi mức lạm phát trung bình",
        ],
        correct: 0,
        explanation:
          "Phép trừ đơn giản đủ chính xác ở dải lãi suất thông thường. Công thức đầy đủ có thêm một số hạng nhỏ, nhưng nó chỉ đáng quan tâm khi cả hai con số đều rất lớn.",
      },
      {
        question: "Lãi suất thực âm nghĩa là gì?",
        options: [
          "Số dư vẫn tăng nhưng bạn mua được ít hàng hóa hơn so với năm trước",
          "Ngân hàng thu phí giữ tiền nên số dư trong tài khoản giảm dần theo tháng",
          "Ngân hàng phải bù phần chênh lệch lạm phát cho người gửi theo quy định",
          "Người gửi tiền được miễn toàn bộ các loại phí dịch vụ trong năm đó",
        ],
        correct: 0,
        explanation:
          "Đây là điều khiến lãi suất thực âm khó nhận ra: tài khoản của bạn vẫn nhiều lên. Chỉ khi đi mua đúng những thứ mua năm ngoái thì mới thấy số tiền ấy mua được ít hơn.",
      },
      {
        question: "Gửi 8% trong năm lạm phát 9% thì kết quả ra sao?",
        options: [
          "Lãi suất thực khoảng −1%, tức sức mua giảm nhẹ dù số dư có tăng",
          "Lãi suất thực khoảng 1%, vì lãi tiền gửi luôn được ưu tiên tính trước",
          "Hòa vốn, vì chênh lệch một điểm phần trăm là quá nhỏ để tính tới",
          "Lãi suất thực khoảng 17%, vì hai tỷ lệ này cộng dồn vào nhau",
        ],
        correct: 0,
        explanation:
          "8 trừ 9 bằng âm 1. Giai đoạn lãi suất thực âm không hiếm, đặc biệt khi lạm phát tăng nhanh hơn tốc độ ngân hàng điều chỉnh lãi huy động - và người gửi thường là bên nhận ra sau cùng.",
      },
      {
        question: "Vì sao lãi suất thực quan trọng hơn lãi suất danh nghĩa khi lập kế hoạch dài hạn?",
        options: [
          "Vì mục tiêu tài chính được đo bằng thứ mua được, không đo bằng số dư tài khoản",
          "Vì ngân hàng dùng chính lãi suất thực để tính khoản lãi trả cho người gửi mỗi kỳ",
          "Vì lãi suất thực luôn ổn định hơn nên dự báo dài hạn sẽ chính xác hơn",
          "Vì cơ quan thuế tính thuế thu nhập dựa trên phần lãi thực sau lạm phát",
        ],
        correct: 0,
        explanation:
          "Kế hoạch hưu trí hay mua nhà đều là kế hoạch về hàng hóa và dịch vụ trong tương lai, không phải về con số trong tài khoản. Quy mọi thứ về sức mua là cách duy nhất để so được hôm nay với hai mươi năm nữa.",
      },
      {
        question: "Khi lãi suất thực âm kéo dài, phản ứng hợp lý là gì?",
        options: [
          "Giữ quỹ khẩn cấp ở tiền gửi, phần dư dài hạn cân nhắc kênh có lợi suất kỳ vọng cao hơn",
          "Rút toàn bộ tiền gửi ra và chuyển hết sang cổ phiếu để bù lại phần mất sức mua",
          "Giữ nguyên mọi thứ vì lãi suất thực sẽ tự quay lại mức dương trong ngắn hạn",
          "Chuyển toàn bộ sang tiền mặt và giữ ở nhà để không còn phụ thuộc vào lãi suất ngân hàng",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp tồn tại để dùng được ngay, nên nó chấp nhận lợi suất thấp - đó không phải khoản để tối ưu. Nhưng phần tiền không cần dùng trong nhiều năm mà vẫn nằm ở lãi suất thực âm thì đang mất sức mua có hệ thống.",
      },
    ],
    keyTakeaways: [
      "Lãi suất thực ≈ lãi suất danh nghĩa − lạm phát, và nó là con số nói bạn có giàu thêm không",
      "Lãi suất thực âm rất khó nhận ra vì số dư tài khoản vẫn tăng đều",
      "Mục tiêu tài chính đo bằng sức mua, nên kế hoạch dài hạn phải tính bằng lãi suất thực",
      "Quỹ khẩn cấp vẫn nên ở tiền gửi dù lợi suất thấp - nó được đánh giá bằng tính sẵn sàng",
    ],
    practicePrompt: {
      question:
        "Bạn định để 800 triệu trong sổ tiết kiệm suốt mười lăm năm tới cho kế hoạch hưu trí. Vấn đề lớn nhất là gì?",
      options: [
        "Lãi suất thực thấp khiến sức mua tăng rất chậm qua một quãng thời gian dài như vậy",
        "Ngân hàng có thể gặp sự cố và bảo hiểm tiền gửi khi đó chỉ bảo vệ được một phần nhỏ",
        "Tiền gửi dài hạn bị phong tỏa nên không rút ra được khi cần dùng gấp",
        "Lãi tiền gửi sẽ bị đánh thuế thu nhập cá nhân với mức lũy tiến theo số dư",
      ],
      correct: 0,
      explanation:
        "Rủi ro ngân hàng có thật nhưng xử lý được bằng cách chia nhỏ theo hạn mức bảo hiểm tiền gửi. Vấn đề khó xử lý hơn nhiều là mười lăm năm ở lãi suất thực quanh 1-2%: nó gần như không tạo ra được khoản tăng trưởng nào đáng kể cho một mục tiêu xa như hưu trí.",
    },
    summary: {
      keyIdea: "Con số trên sổ là danh nghĩa; phần bạn thật sự giàu thêm là phần còn lại sau lạm phát",
      commonMistake: "So sánh các kênh giữ tiền bằng lãi suất danh nghĩa và bỏ qua lạm phát hoàn toàn",
      action: "Lấy lãi suất sổ tiết kiệm hiện tại của bạn trừ đi mức lạm phát gần nhất và xem còn lại bao nhiêu.",
    },
    application: {
      title: "Tính lãi suất thực của chính bạn",
      message:
        "Ghi ra mức lãi suất của sổ bạn đang có, tra mức lạm phát gần nhất, rồi trừ. Con số còn lại là tốc độ sức mua của bạn đang tăng - hoặc giảm.",
      secondary:
        "Làm phép trừ này cho cả khoản quỹ khẩn cấp. Nếu nó âm, đó vẫn ổn - quỹ khẩn cấp không phải khoản để sinh lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về cách sổ tiết kiệm vận hành. Bài này trả lời câu hỏi mà con số trên sổ không trả lời: sau một năm, bạn có mua được nhiều hơn không.",
      },
      { type: "heading", text: "Hai con số, và chỉ một cái quan trọng" },
      {
        type: "paragraph",
        text: "Lãi suất danh nghĩa là con số ngân hàng niêm yết. Lạm phát là tốc độ giá cả tăng lên. Phần chênh lệch giữa chúng - lãi suất thực - là thứ duy nhất nói lên sức mua của bạn đã đổi thế nào. Một người nhận 6% trong năm lạm phát 4% giàu thêm ít hơn nhiều so với cảm giác mà con số 6% tạo ra.",
      },
      {
        type: "formula",
        title: "Lãi suất thực",
        equation: "Lãi suất thực ≈ Lãi suất danh nghĩa − Tỷ lệ lạm phát",
        variables: [
          {
            symbol: "Lãi suất danh nghĩa",
            name: "Con số ngân hàng niêm yết",
            description: "Mức ghi trên sổ tiết kiệm, đã được khóa theo kỳ hạn",
          },
          {
            symbol: "Tỷ lệ lạm phát",
            name: "Tốc độ giá cả tăng",
            description: "Dùng mức của cùng kỳ, không dùng mức của nhiều năm trước",
          },
        ],
        example: {
          title: "Cùng một cuốn sổ, hai bối cảnh lạm phát",
          calculation: "Lãi 6% · lạm phát 4% → thực 2% · Lãi 6% · lạm phát 7% → thực −1%",
          result: "Cùng 6% nhưng một bên giàu lên, một bên nghèo đi",
          explanation:
            "Con số trên sổ không đổi giữa hai trường hợp, và đó chính là lý do nó không đủ để ra quyết định. Chỉ khi đặt cạnh lạm phát thì cùng một mức 6% mới lộ ra hai kết quả trái ngược.",
        },
      },
      {
        type: "callout",
        label: "Vì sao lãi suất thực âm khó nhận ra",
        text: "Mọi tín hiệu bạn nhìn thấy đều đi lên: số dư tài khoản tăng, tin nhắn báo lãi về đều đặn, sổ dày thêm mỗi kỳ. Thứ giảm đi thì không hiện ra ở đâu cả, vì nó chỉ xuất hiện khi bạn so giá của cùng một giỏ hàng hóa qua vài năm.",
      },
      {
        type: "closing",
        lines: [
          "Tiền gửi là nơi an toàn để GIỮ tiền, không phải nơi để tiền lớn lên.",
          "Bài sau: chuyện gì xảy ra khi bạn cần tiền trước ngày đáo hạn.",
        ],
      },
    ],
  },
  {
    id: 312,
    slug: "rut-tiet-kiem-truoc-han",
    title: "Chặng 12, Bài 3: Rút trước hạn - vì sao mất gần hết lãi",
    subtitle: "Toàn bộ số tháng đã gửi bị tính lại theo lãi không kỳ hạn, không phải chỉ phần còn thiếu",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "✂️",
    track: "personal",
    whyItMatters:
      "Đây là điều khoản gây bất ngờ nhiều nhất với người gửi tiết kiệm, và nó là lý do chính khiến việc chọn kỳ hạn quan trọng hơn vẻ ngoài. Rút sớm một ngày trước đáo hạn có thể xóa gần như toàn bộ tiền lãi của mười một tháng rưỡi đã trôi qua.",
    openingQuestion:
      "Sổ 12 tháng lãi 6%, bạn rút ở tháng thứ 11. Lãi được tính thế nào?",
    openingOptions: [
      "Hưởng 6% cho 11 tháng đã gửi, chỉ mất phần lãi của tháng cuối cùng",
      "Toàn bộ 11 tháng bị tính lại theo lãi suất không kỳ hạn, thường quanh 0,1-0,5%",
      "Hưởng một nửa mức lãi suất ghi trên sổ cho toàn bộ thời gian đã gửi",
      "Không được nhận đồng lãi nào và còn bị thu thêm một khoản phí tất toán trước hạn",
    ],
    correctOption: 1,
    explanation:
      "Đây là chỗ trực giác sai hoàn toàn. Nhiều người nghĩ rút sớm thì mất phần lãi tương ứng với thời gian còn thiếu, nhưng cơ chế thật là toàn bộ thời gian đã gửi bị tính lại theo lãi suất không kỳ hạn - mức thường chỉ quanh 0,1 tới 0,5% một năm. Với 100 triệu gửi 12 tháng lãi 6%, giữ đủ kỳ nhận 6 triệu tiền lãi; rút ở tháng 11 chỉ nhận vài trăm nghìn. Bạn không bị phạt thêm phí, nhưng phần mất đi là gần như toàn bộ tiền lãi. Đó là lý do kỳ hạn nên chọn theo thời điểm bạn thật sự cần tiền, không theo mức lãi suất cao nhất.",
    diagram: [
      { label: "Cam kết kỳ hạn để đổi lấy lãi suất cao", arrow: true },
      { label: "Rút sớm là phá vỡ cam kết đó", arrow: true },
      { label: "TOÀN BỘ thời gian tính lại theo lãi không kỳ hạn", arrow: true },
      { label: "Nên chọn kỳ hạn theo lúc cần tiền, không theo lãi cao nhất" },
    ],
    realWorldExample: {
      company: "Mười một tháng bốc hơi trong một chữ ký",
      description:
        "Một người gửi 400 triệu kỳ hạn 12 tháng ở mức 6,2%. Sang tháng thứ mười một thì cần tiền gấp và tất toán sổ. Thay vì khoảng 22,7 triệu tiền lãi cho quãng đã gửi, số nhận về là khoảng 700 nghìn theo lãi không kỳ hạn 0,2%. Chỉ cần chờ thêm bốn tuần thì khoản chênh lệch hơn hai mươi hai triệu đã ở lại trong tài khoản.",
    },
    quiz: [
      {
        question: "Khi rút trước hạn, phần thời gian đã gửi được tính lãi thế nào?",
        options: [
          "Theo lãi suất không kỳ hạn, áp cho toàn bộ quãng thời gian đã gửi",
          "Theo lãi suất ghi trên sổ nhưng trừ đi một khoản phí tất toán cố định",
          "Theo mức trung bình giữa lãi suất trên sổ và lãi suất không kỳ hạn",
          "Theo lãi suất của kỳ hạn ngắn hơn gần nhất mà ngân hàng đang niêm yết",
        ],
        correct: 0,
        explanation:
          "Một số ngân hàng có chính sách rút một phần linh hoạt hơn, nhưng mặc định của tiền gửi có kỳ hạn là toàn bộ quãng đã gửi bị tính lại. Đây là ngộ nhận tốn tiền nhất trong cả chặng này.",
      },
      {
        question:
          "Gửi 200 triệu kỳ hạn 12 tháng lãi 6%, rút ở tháng thứ 9 với lãi không kỳ hạn 0,2%. Nhận khoảng bao nhiêu tiền lãi?",
        options: [
          "Khoảng 300 nghìn (= 200 triệu × 0,2% × 9/12)",
          "Khoảng 9 triệu (= 200 triệu × 6% × 9/12, tính đúng phần đã gửi)",
          "Khoảng 6 triệu (= 200 triệu × 6% × 1/2, tính một nửa mức lãi)",
          "Khoảng 12 triệu (= 200 triệu × 6%, hưởng đủ lãi của cả năm)",
        ],
        correct: 0,
        explanation:
          "Phương án 9 triệu chính là phép tính mà phần lớn người gửi tưởng là đúng - nó áp mức 6% cho chín tháng. Cơ chế thật thay 6% bằng 0,2%, và khoảng cách giữa hai con số là toàn bộ vấn đề.",
      },
      {
        question: "Cách nào giảm thiệt hại khi có khả năng phải rút sớm?",
        options: [
          "Chia tiền thành nhiều sổ nhỏ để chỉ phải tất toán đúng phần cần dùng",
          "Chọn kỳ hạn dài nhất để mức lãi suất cao bù lại phần rủi ro rút sớm",
          "Gửi toàn bộ vào một sổ duy nhất để được hưởng mức lãi ưu đãi số dư lớn",
          "Báo trước cho ngân hàng vài tuần để được giữ nguyên mức lãi trên sổ",
        ],
        correct: 0,
        explanation:
          "Nếu cần 50 triệu mà tiền nằm trong một sổ 300 triệu, bạn phá cả 300 triệu. Chia thành sáu sổ 50 triệu thì chỉ một sổ bị tính lại, năm sổ còn lại vẫn chạy đúng lãi suất đã khóa.",
      },
      {
        question: "Vì sao lãi suất không kỳ hạn lại thấp tới vậy?",
        options: [
          "Vì tiền có thể bị rút bất cứ lúc nào nên ngân hàng không dùng nó cho vay dài hạn được",
          "Vì ngân hàng nhà nước đã quy định một mức trần lãi suất riêng cho tiền gửi không kỳ hạn",
          "Vì khoản tiền gửi không kỳ hạn không được bảo hiểm tiền gửi bảo vệ",
          "Vì ngân hàng phải trích lập dự phòng rủi ro cao hơn cho loại tiền gửi này",
        ],
        correct: 0,
        explanation:
          "Toàn bộ mức chênh lệch giữa lãi có kỳ hạn và không kỳ hạn là giá của sự chắc chắn. Tiền có thể biến mất bất cứ lúc nào thì ngân hàng chỉ dám dùng cho những mục đích rất ngắn hạn, nên họ trả rất ít cho nó.",
      },
      {
        question: "Nguyên tắc chọn kỳ hạn hợp lý nhất là gì?",
        options: [
          "Chọn theo thời điểm bạn thật sự có thể cần tới khoản tiền đó",
          "Luôn chọn kỳ hạn có mức lãi suất niêm yết cao nhất tại thời điểm gửi",
          "Luôn chọn kỳ hạn ngắn nhất để giữ tối đa tính linh hoạt cho bản thân",
          "Chọn kỳ hạn trùng với thời điểm ngân hàng có chương trình khuyến mãi",
        ],
        correct: 0,
        explanation:
          "Mức lãi cao nhất không có giá trị gì nếu bạn phải phá sổ giữa chừng, và kỳ hạn ngắn nhất thì bỏ phí phần lãi lẽ ra nhận được. Câu hỏi đúng luôn là khi nào tôi cần tiền, chứ không phải kỳ hạn nào trả cao nhất.",
      },
    ],
    keyTakeaways: [
      "Rút trước hạn khiến TOÀN BỘ quãng đã gửi bị tính lại theo lãi không kỳ hạn, không chỉ phần còn thiếu",
      "Lãi không kỳ hạn thường quanh 0,1-0,5%/năm, tức gần như bằng không so với lãi có kỳ hạn",
      "Chia thành nhiều sổ nhỏ để chỉ phải phá đúng phần cần dùng",
      "Chọn kỳ hạn theo lúc bạn cần tiền, không theo mức lãi suất cao nhất",
    ],
    practicePrompt: {
      question:
        "Bạn có 600 triệu, chắc chắn cần khoảng 100 triệu trong sáu tháng tới, phần còn lại chưa dùng tới trong hai năm. Nên làm gì?",
      options: [
        "Tách 100 triệu vào kỳ hạn ngắn, 500 triệu chia thành vài sổ kỳ hạn dài",
        "Gửi toàn bộ 600 triệu kỳ hạn 24 tháng để hưởng mức lãi suất cao nhất",
        "Gửi toàn bộ 600 triệu kỳ hạn 6 tháng rồi tái tục liên tục cho an toàn",
        "Để 600 triệu trong tài khoản thanh toán để rút ra bất cứ lúc nào cần",
      ],
      correct: 0,
      explanation:
        "Gửi hết vào kỳ hạn dài buộc bạn phá cả sổ khi cần 100 triệu. Gửi hết kỳ hạn ngắn thì phần 500 triệu bỏ phí phần lãi của kỳ hạn dài suốt hai năm. Tách theo đúng thời điểm cần dùng lấy được cả hai.",
    },
    summary: {
      keyIdea: "Rút sớm không mất phần lãi còn thiếu - nó tính lại toàn bộ quãng đã gửi theo lãi gần bằng không",
      commonMistake: "Dồn hết tiền vào một sổ kỳ hạn dài vì lãi cao, rồi phải phá cả sổ khi cần một phần nhỏ",
      action: "Chia khoản tiết kiệm thành nhiều sổ theo đúng thời điểm bạn có thể cần từng phần.",
    },
    application: {
      title: "Chia sổ theo nhu cầu, không theo mức lãi",
      message:
        "Viết ra các mốc bạn có thể cần tiền trong hai năm tới và số tiền tương ứng. Mỗi mốc là một cuốn sổ với kỳ hạn khớp mốc đó.",
      secondary:
        "Phần không gắn với mốc nào là phần thật sự dài hạn - đó mới là chỗ chọn kỳ hạn theo lãi suất.",
    },
    sections: [
      {
        type: "lead",
        text: "Điều khoản rút trước hạn được in trong mọi hợp đồng tiền gửi và gần như không ai đọc. Nó cũng là điều khoản tốn tiền nhất khi hiểu sai.",
      },
      { type: "heading", text: "Trực giác sai ở chỗ nào" },
      {
        type: "paragraph",
        text: "Cách hiểu tự nhiên là: gửi được chín trên mười hai tháng thì hưởng ba phần tư số lãi. Cơ chế thật khác hẳn - lãi suất 6% chỉ có hiệu lực nếu bạn giữ đủ kỳ hạn, và khi cam kết bị phá thì ngân hàng tính lại từ đầu bằng mức dành cho tiền có thể rút bất cứ lúc nào. Chín tháng ấy không được trả 6%, chúng được trả 0,2%.",
      },
      {
        type: "conceptTable",
        title: "Ba cách giữ tiền cho ba khoảng thời gian",
        subtitle: "Ghép sai khoảng thời gian là nguyên nhân của gần như mọi lần phá sổ",
        concepts: [
          {
            vi: "Cần trong vài tuần",
            en: "Weeks",
            def: "Tài khoản thanh toán hoặc tiền gửi không kỳ hạn. Lãi gần bằng không, nhưng bạn không trả giá gì khi rút.",
          },
          {
            vi: "Cần trong vài tháng",
            en: "Months",
            def: "Kỳ hạn ngắn 1 tới 6 tháng. Lãi thấp hơn kỳ hạn dài, đổi lại ngày đáo hạn nằm gần thời điểm bạn cần tiền.",
          },
          {
            vi: "Chưa cần trong nhiều năm",
            en: "Years",
            def: "Kỳ hạn dài, hoặc các kênh khác nếu lãi suất thực đang thấp. Đây là phần duy nhất nên chọn theo mức lãi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chia nhỏ sổ gần như không tốn gì",
        text: "Lãi suất thường không chênh lệch giữa sổ 50 triệu và sổ 300 triệu ở phần lớn ngân hàng, nên chia thành nhiều sổ hầu như không mất gì. Đổi lại, khi cần 50 triệu bạn chỉ phá một sổ thay vì cả khoản - và khác biệt đó có thể là hàng chục triệu tiền lãi.",
      },
      {
        type: "closing",
        lines: [
          "Kỳ hạn không phải cuộc thi xem ai chọn mức lãi cao nhất, nó là bài toán khớp thời điểm.",
          "Bài sau: một cách sắp xếp giúp bạn vừa có lãi kỳ hạn dài vừa có tiền đáo hạn đều đặn.",
        ],
      },
    ],
  },
  {
    id: 313,
    slug: "bac-thang-tien-gui",
    title: "Chặng 12, Bài 4: Bậc thang tiền gửi - có lãi dài hạn mà vẫn linh hoạt",
    subtitle: "Chia khoản tiết kiệm thành nhiều kỳ hạn lệch nhau để tháng nào cũng có sổ đáo hạn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🪜",
    track: "personal",
    whyItMatters:
      "Bài trước đặt ra một đánh đổi tưởng như không giải được: kỳ hạn dài trả lãi cao nhưng khóa tiền, kỳ hạn ngắn linh hoạt nhưng trả thấp. Bậc thang tiền gửi là cách sắp xếp giúp bạn lấy phần lớn cả hai, và nó chỉ đòi hỏi một lần thiết lập ban đầu.",
    openingQuestion: "Chiến lược bậc thang tiền gửi hoạt động thế nào?",
    openingOptions: [
      "Gửi toàn bộ vào kỳ hạn dài nhất rồi rút dần từng phần khi cần dùng tới",
      "Chia tiền thành nhiều sổ kỳ hạn dài nhưng ngày đáo hạn lệch nhau đều đặn",
      "Chuyển tiền qua lại giữa các ngân hàng để luôn hưởng mức lãi cao nhất",
      "Gửi kỳ hạn ngắn liên tục và tái tục mỗi lần đáo hạn cho tới khi cần tiền",
    ],
    correctOption: 1,
    explanation:
      "Ý tưởng là chia khoản tiết kiệm thành nhiều phần bằng nhau, mỗi phần gửi một kỳ hạn dài nhưng bắt đầu lệch nhau. Ví dụ chia thành bốn sổ 12 tháng, mở cách nhau ba tháng: sau năm đầu, cứ mỗi quý lại có một sổ đáo hạn. Mỗi sổ đều hưởng lãi suất của kỳ hạn 12 tháng, nhưng bạn luôn có tiền sắp về trong vòng ba tháng mà không phải phá sổ nào. Rút dần từ một sổ lớn thì không làm được vì phá sổ là phá toàn bộ; còn chạy theo ngân hàng có lãi cao nhất là việc tốn công và thường chỉ đổi lại vài phần mười điểm phần trăm.",
    diagram: [
      { label: "Chia tiền thành nhiều phần bằng nhau", arrow: true },
      { label: "Mỗi phần gửi kỳ hạn dài, ngày mở lệch nhau", arrow: true },
      { label: "Sau một vòng, đều đặn có sổ đáo hạn", arrow: true },
      { label: "Lãi của kỳ hạn dài, linh hoạt của kỳ hạn ngắn" },
    ],
    realWorldExample: {
      company: "Bốn sổ, một năm, không lần nào phá sổ",
      description:
        "Một người có 400 triệu chia thành bốn sổ 100 triệu kỳ hạn 12 tháng, mở vào tháng Một, Tư, Bảy và Mười. Từ năm thứ hai trở đi, cứ mỗi quý có một sổ đáo hạn: nếu cần tiền thì lấy sổ đó, nếu không thì tái tục thêm 12 tháng. Cả bốn sổ đều hưởng lãi kỳ hạn 12 tháng, và trong ba năm người này chưa lần nào phải tất toán trước hạn.",
    },
    quiz: [
      {
        question: "Lợi ích chính của bậc thang tiền gửi là gì?",
        options: [
          "Hưởng lãi của kỳ hạn dài mà vẫn có tiền đáo hạn đều đặn",
          "Được ngân hàng cộng thêm lãi suất ưu đãi vì mở nhiều sổ cùng lúc",
          "Giảm rủi ro mất tiền nếu một trong các ngân hàng gặp vấn đề",
          "Tránh được hoàn toàn ảnh hưởng của lạm phát lên khoản tiết kiệm",
        ],
        correct: 0,
        explanation:
          "Bậc thang không tạo ra lãi suất mới và cũng không phải công cụ phòng rủi ro ngân hàng - việc đó thuộc về hạn mức bảo hiểm tiền gửi. Nó chỉ giải quyết đúng một bài toán: đánh đổi giữa kỳ hạn và tính sẵn sàng.",
      },
      {
        question: "Chia 600 triệu thành 6 sổ kỳ hạn 12 tháng mở cách nhau 2 tháng thì sau năm đầu ra sao?",
        options: [
          "Cứ mỗi hai tháng lại có một sổ 100 triệu đáo hạn",
          "Toàn bộ 6 sổ cùng đáo hạn vào tháng thứ mười hai của năm",
          "Mỗi tháng có một sổ đáo hạn cho tới khi hết sáu sổ",
          "Chỉ sổ mở đầu tiên đáo hạn, năm sổ còn lại phải chờ sang năm sau",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa các lần đáo hạn đúng bằng khoảng cách giữa các lần mở sổ. Đó là biến bạn tự chọn: mở dày thì tiền về thường xuyên hơn, mở thưa thì ít việc phải theo dõi hơn.",
      },
      {
        question: "Nhược điểm của bậc thang tiền gửi là gì?",
        options: [
          "Phải theo dõi nhiều ngày đáo hạn và cần vài kỳ để thiết lập xong",
          "Lãi suất trung bình thấp hơn hẳn so với gửi toàn bộ vào một sổ dài",
          "Không áp dụng được nếu tổng số tiền tiết kiệm dưới một tỷ đồng",
          "Ngân hàng thu phí quản lý riêng cho mỗi cuốn sổ mà bạn mở thêm",
        ],
        correct: 0,
        explanation:
          "Cái giá là công sức theo dõi chứ không phải tiền. Trong giai đoạn thiết lập, vài sổ đầu phải dùng kỳ hạn ngắn hơn nên lãi trung bình thấp hơn tạm thời - nhưng chỉ trong một vòng đầu.",
      },
      {
        question: "Bậc thang tiền gửi có lợi thế gì khi lãi suất biến động?",
        options: [
          "Mỗi lần có sổ đáo hạn là một cơ hội tái gửi theo mặt bằng mới mà không mất gì",
          "Ngân hàng sẽ tự động điều chỉnh lãi suất của mọi cuốn sổ theo mặt bằng hiện hành",
          "Bạn được quyền yêu cầu ngân hàng áp mức lãi cao nhất cho toàn bộ số sổ",
          "Các sổ trong bậc thang được miễn quy định về rút tiền trước hạn",
        ],
        correct: 0,
        explanation:
          "Dồn hết vào một sổ nghĩa là mỗi năm chỉ có đúng một lần được điều chỉnh theo thị trường. Bậc thang cho bạn nhiều điểm tái gửi rải đều, nên tác động của việc chọn sai thời điểm cũng bị chia nhỏ theo.",
      },
      {
        question: "Khi nào bậc thang tiền gửi không phù hợp?",
        options: [
          "Khi khoản tiền quá nhỏ nên chia ra thành các sổ không đáng kể",
          "Khi bạn dự định giữ khoản tiết kiệm trong hơn năm năm liên tục",
          "Khi lãi suất giữa các kỳ hạn chênh lệch nhau quá nhiều",
          "Khi bạn đã có sẵn quỹ khẩn cấp riêng ở tài khoản thanh toán",
        ],
        correct: 0,
        explanation:
          "Chia 30 triệu thành sáu sổ 5 triệu tạo ra sáu ngày đáo hạn phải nhớ để đổi lấy rất ít lợi ích. Bậc thang bắt đầu có ý nghĩa khi khoản tiền đủ lớn để phần chênh lệch lãi suất giữa các kỳ hạn thành con số đáng kể.",
      },
    ],
    keyTakeaways: [
      "Bậc thang = nhiều sổ kỳ hạn dài, ngày đáo hạn lệch nhau đều đặn",
      "Kết quả: hưởng lãi kỳ hạn dài mà vẫn có tiền về định kỳ, không phải phá sổ",
      "Khoảng cách giữa các lần đáo hạn đúng bằng khoảng cách giữa các lần mở sổ",
      "Cái giá là công theo dõi nhiều ngày đáo hạn, không phải tiền",
    ],
    practicePrompt: {
      question:
        "Bạn có 500 triệu và muốn mỗi quý đều có tiền đáo hạn để linh hoạt. Nên thiết lập thế nào?",
      options: [
        "Bốn sổ kỳ hạn 12 tháng, mở cách nhau ba tháng một sổ",
        "Bốn sổ kỳ hạn 3 tháng, mở cùng lúc rồi tái tục liên tục",
        "Một sổ kỳ hạn 12 tháng và giữ phần còn lại ở tài khoản thanh toán",
        "Mười hai sổ kỳ hạn 1 tháng để có tiền đáo hạn mỗi tháng một lần",
      ],
      correct: 0,
      explanation:
        "Bốn sổ 3 tháng mở cùng lúc thì cùng đáo hạn một ngày và chỉ hưởng lãi kỳ hạn ngắn. Mười hai sổ một tháng cho lãi thấp nhất và nhiều việc nhất. Kỳ hạn dài với ngày mở lệch nhau mới là thứ tạo ra bậc thang.",
    },
    summary: {
      keyIdea: "Lệch ngày đáo hạn chứ không rút ngắn kỳ hạn - đó là cách có cả lãi cao lẫn tính linh hoạt",
      commonMistake: "Rút ngắn kỳ hạn để linh hoạt, và trả giá bằng lãi suất thấp trên toàn bộ số tiền",
      action: "Chia khoản tiết kiệm dài hạn của bạn thành ba tới bốn phần và lên lịch mở lệch nhau.",
    },
    application: {
      title: "Thiết lập bậc thang đầu tiên",
      message:
        "Chia khoản tiết kiệm dài hạn thành bốn phần. Gửi phần đầu kỳ hạn 12 tháng ngay hôm nay, ba phần còn lại lần lượt sau mỗi ba tháng - hoặc dùng kỳ hạn 3, 6, 9 tháng cho ba phần đó để bậc thang chạy ngay từ năm đầu.",
      secondary:
        "Cách thứ hai tốn một chút lãi trong năm đầu nhưng cho bạn bậc thang hoàn chỉnh ngay, thay vì phải chờ đủ một vòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước để lại một đánh đổi: kỳ hạn dài trả cao nhưng khóa tiền, kỳ hạn ngắn linh hoạt nhưng trả thấp. Có một cách sắp xếp lấy được phần lớn cả hai, và nó không đòi hỏi kỹ thuật gì phức tạp.",
      },
      { type: "heading", text: "Ý tưởng nằm ở ngày mở, không ở kỳ hạn" },
      {
        type: "paragraph",
        text: "Cách nghĩ thông thường khi cần linh hoạt là rút ngắn kỳ hạn - và đó là chỗ mất tiền, vì toàn bộ số tiền phải chịu mức lãi thấp. Bậc thang giữ nguyên kỳ hạn dài cho mọi phần, chỉ thay đổi ngày bắt đầu. Kết quả là mỗi phần vẫn hưởng lãi cao nhất của kỳ hạn dài, trong khi ngày đáo hạn thì rải đều quanh năm.",
      },
      {
        type: "list",
        items: [
          "Chia khoản tiết kiệm dài hạn thành ba tới sáu phần bằng nhau",
          "Mỗi phần gửi cùng một kỳ hạn dài, nhưng ngày mở cách đều nhau",
          "Sổ đáo hạn mà chưa cần tiền thì tái tục thêm một kỳ hạn dài nữa",
          "Sổ đáo hạn mà cần tiền thì dùng đúng sổ đó, các sổ khác không bị động tới",
        ],
      },
      {
        type: "callout",
        label: "Có cách rút ngắn giai đoạn thiết lập",
        text: "Thay vì chờ ba tháng mở một sổ, bạn có thể mở cả bốn sổ ngay hôm nay với kỳ hạn 3, 6, 9 và 12 tháng. Từ lần tái tục đầu tiên, cả bốn đều chuyển sang kỳ hạn 12 tháng và bậc thang đã hoàn chỉnh. Cái giá là lãi thấp hơn ở ba sổ trong năm đầu, đổi lấy việc có ngay tính linh hoạt.",
      },
      {
        type: "closing",
        lines: [
          "Bậc thang không tạo ra lãi suất mới, nó chỉ ngăn bạn phải phá sổ - và phá sổ mới là chỗ mất tiền thật.",
          "Bài sau: chứng chỉ tiền gửi trả cao hơn sổ tiết kiệm, và lý do nó trả cao hơn đáng để biết.",
        ],
      },
    ],
  },
  {
    id: 314,
    slug: "chung-chi-tien-gui-vs-so-tiet-kiem",
    title: "Chặng 12, Bài 5: Chứng chỉ tiền gửi và sổ tiết kiệm khác nhau ở đâu",
    subtitle: "Lãi cao hơn vì bạn cam kết chặt hơn, không phải vì nó là sản phẩm tốt hơn",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    whyItMatters:
      "Chứng chỉ tiền gửi thường được chào với mức lãi cao hơn sổ tiết kiệm cùng kỳ hạn, và người gửi dễ coi đó là lựa chọn hiển nhiên tốt hơn. Phần chênh lệch ấy là giá của một ràng buộc cụ thể, và biết ràng buộc đó là gì mới quyết định được nó có hợp với bạn không.",
    openingQuestion: "Vì sao chứng chỉ tiền gửi thường có lãi suất cao hơn sổ tiết kiệm cùng kỳ hạn?",
    openingOptions: [
      "Vì nó thường không cho rút trước hạn, nên ngân hàng có nguồn vốn chắc chắn hơn",
      "Vì nó được bảo hiểm tiền gửi bảo vệ ở mức cao hơn nhiều so với sổ tiết kiệm thường",
      "Vì nó chỉ dành cho khách hàng ưu tiên có số dư lớn tại ngân hàng đó",
      "Vì lãi của nó được trả trước ngay tại thời điểm mua thay vì khi đáo hạn",
    ],
    correctOption: 0,
    explanation:
      "Sổ tiết kiệm cho phép rút trước hạn, chỉ là bạn mất lãi. Nhiều loại chứng chỉ tiền gửi thì không cho rút trước hạn ở bất kỳ mức nào - muốn lấy tiền sớm thì phải chuyển nhượng cho người khác, và việc đó phụ thuộc có tìm được người mua hay không. Ràng buộc chặt hơn ấy cho ngân hàng nguồn vốn chắc chắn hơn, nên họ trả thêm. Về bảo hiểm tiền gửi thì hai loại được đối xử như nhau. Nói cách khác, phần lãi cao hơn không miễn phí - bạn trả bằng tính thanh khoản, và đó là thứ chỉ đáng đổi khi bạn chắc chắn không cần khoản tiền ấy.",
    diagram: [
      { label: "Sổ tiết kiệm: rút được, mất lãi", arrow: true },
      { label: "Chứng chỉ tiền gửi: thường không rút được", arrow: true },
      { label: "Ràng buộc chặt hơn đổi lấy lãi cao hơn", arrow: true },
      { label: "Chỉ hợp khi chắc chắn không cần dùng tới" },
    ],
    realWorldExample: {
      company: "Nửa điểm phần trăm và một cánh cửa khóa",
      description:
        "Một ngân hàng chào chứng chỉ tiền gửi 24 tháng ở 6,8% trong khi sổ tiết kiệm cùng kỳ hạn là 6,3%. Trên 500 triệu, chênh lệch là 2,5 triệu mỗi năm. Người mua chứng chỉ nhận thêm khoản đó, đổi lại nếu cần tiền ở tháng thứ mười thì không có cách nào tất toán - lựa chọn duy nhất là tìm người nhận chuyển nhượng, thường với giá thấp hơn.",
    },
    quiz: [
      {
        question: "Điểm khác biệt cốt lõi giữa hai sản phẩm là gì?",
        options: [
          "Khả năng lấy tiền ra trước hạn",
          "Mức bảo hiểm tiền gửi được áp dụng cho từng loại",
          "Việc lãi được trả theo tháng hay trả một lần khi đáo hạn",
          "Số tiền tối thiểu mà ngân hàng yêu cầu để mở sản phẩm",
        ],
        correct: 0,
        explanation:
          "Số tiền tối thiểu và cách trả lãi đúng là có khác nhau tùy đợt phát hành, nhưng đó là chi tiết. Thứ tạo ra chênh lệch lãi suất và quyết định sản phẩm nào hợp với bạn là tính thanh khoản.",
      },
      {
        question: "Bảo hiểm tiền gửi đối xử với hai sản phẩm này thế nào?",
        options: [
          "Như nhau, vì cả hai đều là tiền gửi của cá nhân tại tổ chức tham gia bảo hiểm",
          "Chứng chỉ tiền gửi được bảo vệ ở mức cao gấp đôi so với sổ tiết kiệm thông thường",
          "Chỉ sổ tiết kiệm được bảo vệ, chứng chỉ tiền gửi thì không thuộc phạm vi",
          "Cả hai đều không được bảo vệ nếu kỳ hạn dài hơn hai mươi bốn tháng",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận khiến người ta chọn sai lý do. Phần lãi cao hơn của chứng chỉ tiền gửi đến từ ràng buộc thanh khoản, không đến từ mức độ an toàn khác biệt nào.",
      },
      {
        question: "Muốn lấy tiền từ chứng chỉ tiền gửi trước hạn thì làm thế nào?",
        options: [
          "Chuyển nhượng cho người khác, và giá phụ thuộc vào việc có tìm được người mua",
          "Tất toán tại ngân hàng và nhận lãi suất không kỳ hạn như sổ tiết kiệm",
          "Yêu cầu ngân hàng mua lại theo đúng mệnh giá đã ghi trên chứng chỉ",
          "Dùng chứng chỉ đó làm tài sản thế chấp bắt buộc theo quy định của từng ngân hàng",
        ],
        correct: 0,
        explanation:
          "Một số ngân hàng có nhận cầm cố chứng chỉ để cho vay, nhưng đó là đi vay chứ không phải lấy tiền của mình ra. Chuyển nhượng là đường chính, và nó không đảm bảo về thời gian lẫn giá.",
      },
      {
        question:
          "Chênh lệch 0,5%/năm trên 400 triệu trong 2 năm tương đương bao nhiêu tiền?",
        options: [
          "Khoảng 4 triệu (= 400 triệu × 0,5% × 2 năm)",
          "Khoảng 2 triệu (= 400 triệu × 0,5%, tính cho một năm)",
          "Khoảng 40 triệu (= 400 triệu × 0,5% × 2, nhân nhầm bậc)",
          "Khoảng 400 nghìn (= 400 triệu × 0,5% chia cho bốn kỳ)",
        ],
        correct: 0,
        explanation:
          "Bốn triệu là con số thật đang được đem ra đổi lấy việc khóa tiền hai năm. Đặt cạnh câu hỏi bạn có chắc không cần 400 triệu trong hai năm không thì quyết định trở nên rõ ràng hơn nhiều.",
      },
      {
        question: "Chứng chỉ tiền gửi hợp lý nhất với ai?",
        options: [
          "Người có khoản tiền chắc chắn không dùng tới và đã có quỹ khẩn cấp riêng",
          "Người muốn có nơi cất tiền linh hoạt để rút ra bất cứ khi nào cần",
          "Người mới bắt đầu tiết kiệm và muốn tối đa hóa lãi ngay từ khoản đầu tiên",
          "Người đang cần một khoản dự phòng cho các chi phí y tế phát sinh",
        ],
        correct: 0,
        explanation:
          "Điều kiện tiên quyết là quỹ khẩn cấp đã nằm ở nơi rút được ngay. Khi đó khoản dư còn lại mới có thể chấp nhận bị khóa để đổi lấy phần lãi cao hơn.",
      },
    ],
    keyTakeaways: [
      "Chênh lệch lãi suất là giá của tính thanh khoản, không phải dấu hiệu sản phẩm tốt hơn",
      "Chứng chỉ tiền gửi thường không cho rút trước hạn - đường ra là chuyển nhượng",
      "Bảo hiểm tiền gửi áp dụng như nhau cho cả hai loại",
      "Chỉ hợp lý khi quỹ khẩn cấp đã nằm ở nơi khác và bạn chắc chắn không cần khoản này",
    ],
    practicePrompt: {
      question:
        "Bạn có 300 triệu, chưa có quỹ khẩn cấp, và được chào chứng chỉ tiền gửi 24 tháng lãi cao hơn 0,6%. Nên làm gì?",
      options: [
        "Tách quỹ khẩn cấp ra trước, phần còn lại mới cân nhắc chứng chỉ tiền gửi",
        "Mua chứng chỉ toàn bộ 300 triệu vì mức chênh lệch lãi suất là đáng kể",
        "Bỏ qua chứng chỉ vì sản phẩm không cho rút trước hạn luôn quá rủi ro",
        "Mua chứng chỉ rồi vay cầm cố chính nó nếu có việc cần tiền gấp",
      ],
      correct: 0,
      explanation:
        "Vay cầm cố để lấy lại tiền của chính mình là trả lãi vay cao hơn phần lãi gửi nhận được - một vòng lỗ. Thứ tự đúng luôn là quỹ khẩn cấp trước, tối ưu lãi suất sau.",
    },
    summary: {
      keyIdea: "Lãi cao hơn của chứng chỉ tiền gửi là tiền trả cho việc bạn từ bỏ quyền rút sớm",
      commonMistake: "Chọn theo mức lãi mà không hỏi lấy tiền ra bằng cách nào nếu có việc",
      action: "Trước khi mua chứng chỉ tiền gửi, kiểm xem quỹ khẩn cấp của bạn đã đủ và nằm ở nơi rút được ngay chưa.",
    },
    application: {
      title: "Hai câu hỏi trước khi ký",
      message:
        "Nếu cần tiền ở tháng thứ mười thì tôi lấy ra bằng cách nào, và tôi đã có quỹ khẩn cấp ở nơi khác chưa? Nếu câu đầu không có lời đáp rõ ràng, phần lãi cao hơn không bù được.",
      secondary:
        "Quy phần chênh lệch lãi suất ra tiền tuyệt đối cho cả kỳ hạn. Con số đó thường nhỏ hơn cảm giác mà mấy phần mười điểm phần trăm tạo ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi nhân viên ngân hàng chào một sản phẩm lãi cao hơn sổ tiết kiệm, câu hỏi đúng không phải cao hơn bao nhiêu mà là cao hơn để đổi lấy cái gì.",
      },
      { type: "heading", text: "Cùng là gửi tiền, khác ở một quyền" },
      {
        type: "paragraph",
        text: "Sổ tiết kiệm luôn cho bạn quyền lấy tiền ra - bài trước đã nói cái giá của quyền đó là gần hết tiền lãi, nhưng quyền vẫn tồn tại. Nhiều loại chứng chỉ tiền gửi bỏ hẳn quyền ấy: trước ngày đáo hạn, ngân hàng không tất toán ở bất kỳ mức lãi nào. Đường ra duy nhất là chuyển nhượng cho người khác, và nó phụ thuộc vào việc có ai muốn mua.",
      },
      {
        type: "conceptTable",
        title: "Đặt cạnh nhau",
        subtitle: "Khác biệt nằm gọn ở hàng đầu tiên",
        concepts: [
          {
            vi: "Lấy tiền trước hạn",
            en: "Early access",
            def: "Sổ tiết kiệm: được, mất lãi. Chứng chỉ tiền gửi: thường không, phải chuyển nhượng cho người khác.",
          },
          {
            vi: "Lãi suất",
            en: "Rate",
            def: "Chứng chỉ thường cao hơn vài phần mười tới nửa điểm phần trăm cho cùng kỳ hạn. Đó là giá của hàng trên.",
          },
          {
            vi: "Bảo hiểm tiền gửi",
            en: "Deposit insurance",
            def: "Như nhau. Đây là chỗ hay bị hiểu nhầm thành lý do chọn, trong khi nó không phân biệt hai sản phẩm.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quy phần chênh lệch ra tiền trước khi quyết định",
        text: "Nửa điểm phần trăm nghe như một khác biệt lớn, nhưng trên 200 triệu trong một năm nó là một triệu đồng. Đặt con số tuyệt đối ấy cạnh câu hỏi bạn có chắc chắn không cần khoản này trong hai năm không, và phần lớn trường hợp câu trả lời tự hiện ra.",
      },
      {
        type: "closing",
        lines: [
          "Sản phẩm trả cao hơn luôn lấy đi một thứ; việc của bạn là biết nó lấy gì.",
          "Bài sau: nếu ngân hàng gặp chuyện thì tiền của bạn được bảo vệ tới đâu.",
        ],
      },
    ],
  },
  {
    id: 315,
    slug: "bao-hiem-tien-gui-viet-nam",
    title: "Chặng 12, Bài 6: Bảo hiểm tiền gửi bảo vệ bạn tới đâu",
    subtitle: "Hạn mức tính trên mỗi người tại mỗi ngân hàng, và đó là chi tiết quyết định cách chia tiền",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Phần lớn người gửi tiền coi ngân hàng là an toàn tuyệt đối và không bao giờ hỏi tới hạn mức bảo vệ. Với số dư nhỏ thì điều đó không gây hậu quả gì, nhưng khi khoản tiết kiệm lớn dần, cách chia tiền giữa các ngân hàng trở thành một quyết định có thật.",
    openingQuestion: "Bảo hiểm tiền gửi ở Việt Nam chi trả theo nguyên tắc nào?",
    openingOptions: [
      "Theo từng cuốn sổ tiết kiệm, mỗi sổ được bảo vệ một hạn mức riêng biệt",
      "Theo mỗi người gửi tại mỗi tổ chức tham gia bảo hiểm tiền gửi",
      "Theo tổng số tiền một người gửi trên toàn bộ hệ thống ngân hàng",
      "Theo tỷ lệ phần trăm cố định trên số dư, không có mức trần tuyệt đối",
    ],
    correctOption: 1,
    explanation:
      "Hạn mức được tính cho mỗi người gửi tại mỗi tổ chức tham gia bảo hiểm tiền gửi, bao gồm cả gốc lẫn lãi. Chi tiết này quan trọng theo hai hướng. Mở nhiều sổ tại cùng một ngân hàng không làm tăng mức bảo vệ - chúng được cộng gộp lại thành một số dư duy nhất. Ngược lại, chia tiền sang một ngân hàng khác thì hạn mức được tính lại từ đầu ở nơi đó. Vì vậy khi khoản tiết kiệm vượt hạn mức, cách xử lý không phải mở thêm sổ mà là mở thêm quan hệ ở tổ chức khác.",
    diagram: [
      { label: "Cộng gộp mọi khoản gửi của bạn tại một ngân hàng", arrow: true },
      { label: "So tổng đó với hạn mức bảo hiểm", arrow: true },
      { label: "Phần vượt hạn mức không được bảo vệ", arrow: true },
      { label: "Chia sang ngân hàng khác để có hạn mức mới" },
    ],
    realWorldExample: {
      company: "Bốn cuốn sổ, một hạn mức",
      description:
        "Một người có bốn sổ tiết kiệm tại cùng một ngân hàng, mỗi sổ 200 triệu, và yên tâm rằng chia nhỏ như vậy là đã phân tán rủi ro. Thực tế cả bốn sổ được cộng gộp thành 800 triệu của một người gửi tại một tổ chức, và phần vượt hạn mức không được bảo hiểm chi trả. Chia nhỏ theo sổ giúp tránh phá sổ khi cần tiền, nhưng không tạo thêm lớp bảo vệ nào.",
    },
    quiz: [
      {
        question: "Mở nhiều sổ tại cùng một ngân hàng có làm tăng mức bảo vệ không?",
        options: [
          "Không, mọi khoản gửi của một người tại một tổ chức được cộng gộp lại",
          "Có, mỗi sổ tiết kiệm được tính là một khoản gửi độc lập với hạn mức riêng",
          "Có, nhưng chỉ khi các sổ có kỳ hạn khác nhau và mở ở các chi nhánh khác nhau",
          "Không, trừ khi các sổ được đứng tên cùng với một người đồng sở hữu khác",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận phổ biến vì việc chia sổ đúng là có ích cho chuyện khác - tránh phải phá cả khoản khi cần một phần. Nhưng về bảo hiểm tiền gửi, bốn sổ tại một ngân hàng vẫn là một người gửi tại một tổ chức.",
      },
      {
        question: "Hạn mức bảo hiểm tiền gửi bao gồm những gì?",
        options: [
          "Cả tiền gốc và tiền lãi phát sinh tính tới thời điểm chi trả",
          "Chỉ tiền gốc, phần lãi đã phát sinh không nằm trong phạm vi bảo vệ",
          "Chỉ phần lãi, vì tiền gốc đã được ngân hàng bảo đảm bằng tài sản riêng",
          "Cả gốc và lãi nhưng chỉ với các khoản gửi có kỳ hạn dưới mười hai tháng",
        ],
        correct: 0,
        explanation:
          "Vì lãi cũng được tính vào, một khoản gửi ban đầu nằm sát hạn mức có thể vượt qua nó sau vài kỳ tái tục mà chủ sổ không để ý.",
      },
      {
        question: "Cách xử lý đúng khi khoản tiết kiệm vượt hạn mức bảo hiểm là gì?",
        options: [
          "Chia phần vượt sang một ngân hàng khác để có hạn mức được tính lại từ đầu",
          "Chia thành nhiều sổ nhỏ hơn tại chính ngân hàng đang gửi hiện tại",
          "Chuyển sang chứng chỉ tiền gửi vì sản phẩm này có mức bảo vệ cao hơn",
          "Yêu cầu ngân hàng cấp văn bản cam kết hoàn trả toàn bộ số dư khi có sự cố",
        ],
        correct: 0,
        explanation:
          "Hạn mức gắn với cặp người gửi và tổ chức, nên biến duy nhất bạn thay đổi được là số tổ chức. Chia sổ hay đổi sản phẩm đều không chạm tới ràng buộc đó.",
      },
      {
        question: "Vì sao hạn mức bảo hiểm ít quan trọng với phần lớn người gửi?",
        options: [
          "Vì số dư tiết kiệm của đa số vẫn nằm dưới hạn mức nên được bảo vệ trọn vẹn",
          "Vì ngân hàng ở Việt Nam chưa từng gặp bất kỳ vấn đề nào về thanh khoản",
          "Vì nhà nước cam kết chi trả toàn bộ số dư cho mọi người gửi khi có sự cố",
          "Vì người gửi luôn được ưu tiên nhận tiền trước tất cả các chủ nợ khác",
        ],
        correct: 0,
        explanation:
          "Với số dư dưới hạn mức thì đây là chuyện không cần bận tâm. Nó chỉ trở thành quyết định thật khi khoản tiết kiệm lớn dần - và thời điểm ấy thường tới mà không ai để ý.",
      },
      {
        question: "Nhược điểm của việc chia tiền sang nhiều ngân hàng là gì?",
        options: [
          "Phải theo dõi nhiều nơi và có thể phải chấp nhận mức lãi thấp hơn ở vài chỗ",
          "Bảo hiểm tiền gửi giảm mức chi trả khi một người gửi ở quá nhiều tổ chức",
          "Ngân hàng thu phí duy trì quan hệ đối với khách hàng có số dư phân tán",
          "Số tiền gửi ở ngân hàng thứ hai trở đi không được tính lãi trong kỳ đầu",
        ],
        correct: 0,
        explanation:
          "Cái giá hoàn toàn nằm ở công sức và ở chỗ ngân hàng trả lãi cao nhất không phải lúc nào cũng còn chỗ trống trong hạn mức của bạn. Đó là đánh đổi giữa tiện lợi và mức độ an toàn.",
      },
    ],
    keyTakeaways: [
      "Hạn mức tính cho mỗi người gửi tại mỗi tổ chức, và bao gồm cả gốc lẫn lãi",
      "Nhiều sổ tại cùng một ngân hàng được cộng gộp - chia sổ không tăng mức bảo vệ",
      "Muốn tăng phần được bảo vệ thì phải tăng số tổ chức, không phải số sổ",
      "Với số dư dưới hạn mức thì đây không phải chuyện đáng bận tâm",
    ],
    practicePrompt: {
      question:
        "Khoản tiết kiệm của bạn đã vượt hạn mức bảo hiểm tại một ngân hàng. Bước hợp lý nhất là gì?",
      options: [
        "Chuyển phần vượt sang ngân hàng khác, cân nhắc cả mức lãi lẫn độ thuận tiện",
        "Tách thành nhiều sổ nhỏ tại chính ngân hàng đó cho an toàn hơn",
        "Rút toàn bộ phần vượt hạn mức ra giữ bằng tiền mặt tại nhà để tránh rủi ro",
        "Chuyển toàn bộ sang chứng chỉ tiền gửi của cùng ngân hàng đó",
      ],
      correct: 0,
      explanation:
        "Giữ tiền mặt ở nhà đổi một rủi ro nhỏ lấy một rủi ro lớn hơn hẳn: mất cắp, hỏa hoạn, và chắc chắn mất sức mua vì không có lãi nào. Chia sang tổ chức khác là cách duy nhất thật sự mở rộng phần được bảo vệ.",
    },
    summary: {
      keyIdea: "Hạn mức gắn với cặp người gửi và tổ chức - muốn được bảo vệ nhiều hơn thì tăng số tổ chức",
      commonMistake: "Chia thành nhiều sổ tại cùng một ngân hàng và tưởng như vậy là đã phân tán rủi ro",
      action: "Cộng toàn bộ số dư của bạn tại từng ngân hàng và so với hạn mức bảo hiểm hiện hành.",
    },
    application: {
      title: "Cộng theo ngân hàng, không theo sổ",
      message:
        "Liệt kê mọi khoản tiền gửi của bạn, nhóm theo ngân hàng rồi cộng lại. So từng tổng với hạn mức bảo hiểm tiền gửi hiện hành - đó mới là con số đang được bảo vệ.",
      secondary:
        "Nhớ tính cả phần lãi sẽ phát sinh. Một khoản gửi sát hạn mức hôm nay có thể vượt qua nó sau vài kỳ tái tục.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi nếu ngân hàng gặp chuyện thì sao nghe xa vời, và với phần lớn số dư thì đúng là xa vời. Nhưng nó trở thành câu hỏi thật khi khoản tiết kiệm lớn dần, và thời điểm ấy tới mà không có tín hiệu nào báo trước.",
      },
      { type: "heading", text: "Hạn mức gắn với cái gì" },
      {
        type: "paragraph",
        text: "Bảo hiểm tiền gửi chi trả theo mỗi người gửi tại mỗi tổ chức tham gia, tính cả gốc lẫn lãi. Hai hệ quả đi kèm. Thứ nhất, mọi khoản của bạn tại một ngân hàng - dù nằm ở bao nhiêu cuốn sổ, bao nhiêu chi nhánh - đều được cộng gộp thành một số dư. Thứ hai, cùng số tiền ấy đặt ở hai ngân hàng thì được tính hai hạn mức riêng biệt.",
      },
      {
        type: "callout",
        label: "Chia sổ và chia ngân hàng giải quyết hai bài toán khác nhau",
        text: "Bài trước khuyên chia thành nhiều sổ, và lời khuyên đó vẫn đúng - nhưng nó giải bài toán thanh khoản, tức tránh phải phá cả khoản khi chỉ cần một phần. Bảo hiểm tiền gửi là bài toán khác, và biến của nó là số tổ chức chứ không phải số sổ. Nhiều người làm đúng việc thứ nhất rồi tưởng đã làm luôn việc thứ hai.",
      },
      {
        type: "list",
        items: [
          "Cộng số dư theo từng ngân hàng, không theo từng sổ",
          "Tính cả phần lãi sẽ phát sinh cho tới ngày đáo hạn",
          "Phần vượt hạn mức là phần bạn đang tự chịu rủi ro - có thể chấp nhận, nhưng nên biết",
          "Chia sang tổ chức khác đổi lấy công theo dõi và đôi khi mức lãi thấp hơn một chút",
        ],
      },
      {
        type: "closing",
        lines: [
          "Với số dư nhỏ thì đây là chuyện không cần nghĩ tới; vấn đề là không ai báo cho bạn biết lúc nó thôi nhỏ.",
          "Bài sau: những khoản phí nhỏ trong tài khoản, và vì sao chúng cộng lại không nhỏ.",
        ],
      },
    ],
  },
  {
    id: 316,
    slug: "phi-ngan-hang-va-cach-khong-mat-oan",
    title: "Chặng 12, Bài 7: Phí ngân hàng - những khoản nhỏ cộng lại không nhỏ",
    subtitle: "Vài chục nghìn mỗi tháng là chuyện vặt; cùng khoản đó trong mười năm thì không",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Phí ngân hàng được thiết kế để không gây chú ý: mỗi khoản đủ nhỏ để không đáng gọi điện hỏi, và chúng bị trừ tự động nên không ai phải quyết định gì. Đó cũng chính là lý do chúng chạy nhiều năm liền mà chủ tài khoản không biết mình đang trả cho cái gì.",
    openingQuestion: "Vì sao phí ngân hàng thường bị bỏ qua dù người ta vẫn theo dõi chi tiêu?",
    openingOptions: [
      "Vì chúng bị trừ tự động và mỗi khoản đủ nhỏ để không lọt vào tầm chú ý",
      "Vì ngân hàng không có nghĩa vụ thông báo các khoản phí đã thu mỗi tháng",
      "Vì phí chỉ hiện trong sao kê giấy mà phần lớn khách hàng không đăng ký nhận",
      "Vì các khoản phí luôn được hoàn lại vào cuối năm nếu khách không khiếu nại",
    ],
    correctOption: 0,
    explanation:
      "Cơ chế khiến phí trở nên vô hình không phải sự che giấu - biểu phí được công bố và giao dịch đều hiện trong ứng dụng. Vấn đề là chúng không đòi hỏi quyết định nào: không có lúc nào bạn phải bấm đồng ý, không có hóa đơn nào để đối chiếu. Một khoản mười lăm nghìn mỗi tháng nằm dưới ngưỡng đáng bận tâm của gần như tất cả mọi người, và nó cứ chạy như vậy trong nhiều năm. Đây là cùng cơ chế với các khoản đăng ký dịch vụ mà bài Chặng 1 đã nói: chi phí thấp cộng với việc không phải quyết định lại bằng một khoản chi vĩnh viễn.",
    diagram: [
      { label: "Phí nhỏ, bị trừ tự động", arrow: true },
      { label: "Không có lúc nào phải quyết định lại", arrow: true },
      { label: "Chạy liên tục nhiều năm", arrow: true },
      { label: "Rà soát một lần, tiết kiệm nhiều năm" },
    ],
    realWorldExample: {
      company: "Ba khoản phí, mười năm",
      description:
        "Một tài khoản trả phí quản lý 11 nghìn, phí thông báo biến động số dư 11 nghìn và phí duy trì thẻ khoảng 8 nghìn mỗi tháng - tổng 30 nghìn, tức 360 nghìn một năm. Nghe không đáng kể. Nhưng nhiều ngân hàng đã miễn phần lớn các khoản này cho tài khoản mở mới hoặc khi đăng ký gói phù hợp, nên phần lớn số tiền ấy là khoản trả cho việc chưa từng rà soát lại.",
    },
    quiz: [
      {
        question: "Khoản phí nào thường xuất hiện mà chủ tài khoản ít để ý nhất?",
        options: [
          "Phí quản lý tài khoản và phí thông báo biến động số dư hằng tháng",
          "Phí chuyển khoản liên ngân hàng cho mỗi giao dịch phát sinh",
          "Phí phát hành thẻ khi mở tài khoản lần đầu tại ngân hàng",
          "Phí đổi mã PIN thẻ tại cây rút tiền tự động của ngân hàng khác",
        ],
        correct: 0,
        explanation:
          "Phí giao dịch gắn với một hành động cụ thể nên người ta nhìn thấy nó. Phí định kỳ thì không gắn với hành động nào - nó tự chạy, và vì thế nó là loại kéo dài lâu nhất.",
      },
      {
        question: "Cách rà soát phí hiệu quả nhất là gì?",
        options: [
          "Lọc sao kê mười hai tháng gần nhất theo các giao dịch do ngân hàng tự trừ",
          "Gọi tổng đài hỏi xem tài khoản của bạn đang chịu những loại phí nào",
          "So sánh biểu phí công bố của vài ngân hàng lớn để biết mặt bằng chung",
          "Kiểm tra số dư đầu tháng và cuối tháng để tìm phần chênh lệch bất thường",
        ],
        correct: 0,
        explanation:
          "Biểu phí cho biết mức có thể bị thu, sao kê cho biết mức thật sự đã bị thu - và hai thứ đó khác nhau vì nhiều khoản được miễn theo gói. Chỉ sao kê của chính bạn mới trả lời được câu hỏi bạn đang trả cái gì.",
      },
      {
        question: "30 nghìn phí mỗi tháng tương đương bao nhiêu trong mười năm?",
        options: [
          "Khoảng 3,6 triệu (= 30 nghìn × 12 tháng × 10 năm)",
          "Khoảng 360 nghìn (= 30 nghìn × 12 tháng, tính cho một năm)",
          "Khoảng 300 nghìn (= 30 nghìn × 10 năm, quên nhân số tháng)",
          "Khoảng 36 triệu (= 30 nghìn × 120 tháng, nhân sai một bậc)",
        ],
        correct: 0,
        explanation:
          "3,6 triệu chưa tính phần lãi mà số tiền đó lẽ ra sinh ra được. Con số không lớn tới mức đổi đời, nhưng nó là khoản gần như không cần đánh đổi gì để lấy lại.",
      },
      {
        question: "Vì sao nên kiểm tra phí sau khi ngân hàng thay đổi chính sách?",
        options: [
          "Vì gói miễn phí bạn đang hưởng có thể đổi điều kiện mà không cần bạn đồng ý",
          "Vì mọi thay đổi biểu phí đều phải được từng khách hàng ký xác nhận lại",
          "Vì ngân hàng sẽ tự động hoàn lại các khoản phí đã thu trong kỳ chuyển đổi",
          "Vì khách hàng có quyền yêu cầu giữ nguyên biểu phí cũ trong ba năm tiếp theo",
        ],
        correct: 0,
        explanation:
          "Điều kiện miễn phí thường gắn với số dư tối thiểu hoặc số giao dịch trong tháng, và cả hai đều có thể thay đổi. Bạn vẫn dùng tài khoản như cũ nhưng thôi đủ điều kiện, và khoản phí lặng lẽ quay lại.",
      },
      {
        question: "Khoản phí nào đáng giữ dù có thể bỏ?",
        options: [
          "Phí cho dịch vụ bạn thật sự dùng và sẽ chủ động trả tiền nếu được hỏi",
          "Phí duy trì mọi loại thẻ để giữ quan hệ tín dụng tốt với ngân hàng",
          "Phí quản lý tài khoản vì bỏ nó sẽ khiến tài khoản bị đóng tự động",
          "Phí thông báo biến động số dư vì đây là khoản bắt buộc theo quy định",
        ],
        correct: 0,
        explanation:
          "Phép thử đơn giản là nếu hôm nay ngân hàng hỏi bạn có muốn mua dịch vụ này với giá đó không, bạn có gật đầu không. Thông báo biến động số dư nhiều người sẽ gật vì nó giúp phát hiện giao dịch lạ; những khoản khác thì thường không.",
      },
    ],
    keyTakeaways: [
      "Phí vô hình vì nó không đòi hỏi quyết định nào, không phải vì nó bị che giấu",
      "Sao kê cho biết bạn đang trả gì; biểu phí chỉ cho biết bạn có thể bị thu gì",
      "Điều kiện miễn phí có thể đổi mà bạn không nhận ra vì cách dùng không đổi",
      "Giữ lại khoản phí cho dịch vụ bạn sẽ chủ động trả tiền nếu được hỏi lại",
    ],
    practicePrompt: {
      question:
        "Bạn phát hiện mình đang trả ba khoản phí định kỳ. Bước tiếp theo hợp lý nhất là gì?",
      options: [
        "Với từng khoản, hỏi xem có gói miễn phí nào phù hợp với cách bạn đang dùng không",
        "Đóng tài khoản hiện tại và mở tài khoản mới ở ngân hàng đang miễn phí",
        "Chấp nhận vì ba khoản đó cộng lại vẫn là con số nhỏ so với thu nhập hằng tháng của bạn",
        "Chuyển toàn bộ số dư sang ví điện tử để không phải chịu phí ngân hàng nữa",
      ],
      correct: 0,
      explanation:
        "Đóng và mở lại tài khoản kéo theo việc cập nhật thông tin nhận lương, các khoản thanh toán tự động và nhiều thứ khác - chi phí chuyển đổi thường lớn hơn khoản phí. Đổi gói tại chính ngân hàng đang dùng thường giải quyết được phần lớn mà không phải động tới thứ gì.",
    },
    summary: {
      keyIdea: "Phí ngân hàng kéo dài vì nó không bao giờ buộc bạn phải quyết định lại",
      commonMistake: "Bỏ qua vì mỗi khoản nhỏ, và không bao giờ cộng chúng lại theo năm",
      action: "Lọc sao kê mười hai tháng gần nhất, tìm mọi khoản do ngân hàng tự trừ và cộng lại.",
    },
    application: {
      title: "Một lần rà soát cho nhiều năm",
      message:
        "Mở sao kê mười hai tháng, tìm các giao dịch có nội dung phí hoặc do hệ thống tự trừ. Cộng lại theo năm rồi hỏi từng khoản: nếu được hỏi hôm nay, tôi có mua nó không?",
      secondary:
        "Việc này mất khoảng hai mươi phút và thường chỉ cần làm một lần, nhưng nó chặn được một dòng chi chạy nhiều năm.",
    },
    sections: [
      {
        type: "lead",
        text: "Không khoản phí nào trong bài này đủ lớn để đáng viết một bài riêng. Điều đáng viết là cơ chế khiến chúng tồn tại lâu tới vậy.",
      },
      { type: "heading", text: "Vì sao chúng sống lâu" },
      {
        type: "paragraph",
        text: "Một khoản chi chỉ bị xem xét lại khi có gì đó buộc bạn phải quyết định. Tiền nhà đòi bạn ký lại hợp đồng mỗi năm; gói cước điện thoại thỉnh thoảng hết hạn. Phí ngân hàng thì không có mốc nào như thế - nó được trừ tự động, không gửi hóa đơn, và mỗi lần trừ đều nhỏ hơn ngưỡng khiến người ta dừng lại để hỏi. Cơ chế ấy không có gì mờ ám, nhưng hệ quả của nó là một dòng chi chạy nhiều năm mà chưa bao giờ được duyệt lại.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm phí, xử lý khác nhau",
        subtitle: "Nhóm giữa là nơi có nhiều tiền nhất",
        concepts: [
          {
            vi: "Phí theo giao dịch",
            en: "Transaction fees",
            def: "Chuyển khoản, rút tiền ngoài hệ thống. Gắn với một hành động nên dễ thấy, và thường giảm được bằng cách đổi cách giao dịch.",
          },
          {
            vi: "Phí định kỳ",
            en: "Recurring fees",
            def: "Quản lý tài khoản, thông báo số dư, duy trì thẻ. Chạy tự động nên sống lâu nhất - đây là nhóm đáng rà soát trước.",
          },
          {
            vi: "Phí do sơ suất",
            en: "Penalty fees",
            def: "Chậm trả thẻ tín dụng, số dư dưới mức tối thiểu. Tránh được hoàn toàn bằng nhắc lịch, và mức phí thường cao hơn hai nhóm trên nhiều.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng đổi ngân hàng chỉ vì phí",
        text: "Chi phí chuyển đổi thật sự không nằm ở thủ tục mở tài khoản mà ở mọi thứ đang trỏ tới tài khoản cũ: nơi nhận lương, các khoản thanh toán tự động, thông tin đã khai ở nhiều nơi. Trong phần lớn trường hợp, đổi sang gói tài khoản khác tại chính ngân hàng đang dùng giải quyết được vấn đề với chi phí gần bằng không.",
      },
      {
        type: "closing",
        lines: [
          "Đây là loại tiền hiếm hoi lấy lại được mà không phải đánh đổi gì cả.",
          "Bài sau: ngân hàng số và ví điện tử - tiện tới đâu và rủi ro nằm ở chỗ nào.",
        ],
      },
    ],
  },
  {
    id: 317,
    slug: "ngan-hang-so-va-vi-dien-tu",
    title: "Chặng 12, Bài 8: Ngân hàng số và ví điện tử",
    subtitle: "Tiện lợi đổi lấy điều gì, và số dư trong ví có được bảo vệ như tiền gửi không",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📱",
    track: "personal",
    whyItMatters:
      "Ví điện tử và ngân hàng số đã thay thế phần lớn giao dịch tiền mặt hằng ngày, và người dùng thường coi số dư trong ví giống hệt tiền trong ngân hàng. Hai thứ đó khác nhau ở vài điểm quan trọng, và sự khác biệt chỉ lộ ra đúng vào lúc có chuyện.",
    openingQuestion: "Số dư trong ví điện tử khác tiền gửi ngân hàng ở điểm nào quan trọng nhất?",
    openingOptions: [
      "Ví điện tử không trả lãi và không phải là tiền gửi được bảo hiểm tiền gửi bảo vệ",
      "Ví điện tử bị giới hạn số tiền tối đa được nạp vào trong mỗi ngày sử dụng của người dùng",
      "Ví điện tử thu phí cho mọi giao dịch chuyển tiền giữa những người dùng",
      "Ví điện tử chỉ dùng được để thanh toán chứ không rút được ra tiền mặt",
    ],
    correctOption: 0,
    explanation:
      "Ví điện tử là dịch vụ trung gian thanh toán, không phải tổ chức nhận tiền gửi. Tiền của người dùng được giữ ở tài khoản đảm bảo tại ngân hàng, nên nó không biến mất, nhưng cơ chế bảo vệ không giống bảo hiểm tiền gửi và số dư không sinh lãi. Hạn mức giao dịch và phí đúng là có tồn tại nhưng khác nhau tùy nhà cung cấp và không phải điểm phân biệt cốt lõi. Kết luận thực dụng: ví điện tử là công cụ thanh toán rất tốt, và giữ số dư lớn trong đó là dùng sai mục đích - phần tiền nhàn rỗi thuộc về nơi vừa sinh lãi vừa được bảo hiểm tiền gửi bảo vệ.",
    diagram: [
      { label: "Ví điện tử: công cụ thanh toán", arrow: true },
      { label: "Không sinh lãi, không phải tiền gửi", arrow: true },
      { label: "Giữ số dư vừa đủ chi tiêu ngắn hạn", arrow: true },
      { label: "Phần nhàn rỗi để ở tiền gửi ngân hàng" },
    ],
    realWorldExample: {
      company: "Tiện tới mức quên rằng nó không sinh lãi",
      description:
        "Một người giữ thói quen để khoảng 30 triệu trong ví điện tử cho tiện thanh toán hằng ngày. Số tiền đó không sinh đồng lãi nào; cùng khoản ấy trong sổ tiết kiệm 6% cho khoảng 1,8 triệu mỗi năm. Ví vẫn là công cụ tốt cho phần chi tiêu trong tuần - vấn đề chỉ là quy mô số dư nằm lại trong đó.",
    },
    quiz: [
      {
        question: "Ví điện tử giữ tiền người dùng ở đâu?",
        options: [
          "Ở tài khoản đảm bảo mở tại ngân hàng, tách khỏi tiền của chính công ty ví",
          "Ở két của công ty cung cấp ví dưới dạng tiền mặt được kiểm đếm định kỳ",
          "Ở tài khoản đầu tư sinh lời do công ty ví tự quản lý và hưởng chênh lệch",
          "Ở tài khoản cá nhân của từng người dùng tại ngân hàng mà họ liên kết",
        ],
        correct: 0,
        explanation:
          "Yêu cầu tách bạch này chính là thứ ngăn tiền người dùng bị dùng vào hoạt động của công ty. Nó là cơ chế bảo vệ thật, chỉ khác với bảo hiểm tiền gửi về bản chất.",
      },
      {
        question: "Vì sao không nên để số dư lớn trong ví điện tử?",
        options: [
          "Vì nó không sinh lãi nên bạn mất phần lợi suất mà tiền gửi mang lại",
          "Vì nhà cung cấp ví có quyền thu phí duy trì trên số dư nhàn rỗi hằng tháng",
          "Vì số dư trong ví bị giới hạn thời gian sử dụng và sẽ hết hạn sau một năm",
          "Vì ví điện tử không cho phép chuyển tiền ngược lại về tài khoản ngân hàng",
        ],
        correct: 0,
        explanation:
          "Chi phí thật của việc để tiền trong ví là khoản lãi không nhận được, và nó chạy âm thầm mỗi ngày. Với vài triệu cho chi tiêu trong tuần thì không đáng kể; với vài chục triệu nằm lại nhiều tháng thì đáng.",
      },
      {
        question: "Rủi ro lớn nhất với người dùng ngân hàng số và ví điện tử là gì?",
        options: [
          "Bị chiếm quyền truy cập tài khoản qua lừa đảo hoặc mất kiểm soát điện thoại",
          "Nhà cung cấp dịch vụ đột ngột ngừng hoạt động và giữ lại toàn bộ số dư",
          "Hệ thống tính sai số dư khiến người dùng mất tiền mà không đối chiếu được",
          "Giao dịch bị chậm vài ngày nên không thanh toán kịp các khoản đến hạn",
        ],
        correct: 0,
        explanation:
          "Rủi ro hệ thống thì có cơ chế quản lý và hiếm khi xảy ra. Rủi ro thật và phổ biến nằm ở phía người dùng: một mã xác thực bị đọc cho người lạ có thể xóa sạch tài khoản trong vài phút, và không cơ chế kỹ thuật nào chặn được điều đó.",
      },
      {
        question: "Nguyên tắc hợp lý cho số dư trong ví điện tử là gì?",
        options: [
          "Giữ vừa đủ cho chi tiêu ngắn hạn, phần còn lại để ở nơi sinh lãi",
          "Giữ tối đa để tận dụng các chương trình hoàn tiền dành cho số dư lớn",
          "Không giữ đồng nào và chỉ nạp đúng số tiền mỗi khi cần thanh toán",
          "Giữ bằng đúng ba tháng chi tiêu như cách tính quỹ khẩn cấp thông thường",
        ],
        correct: 0,
        explanation:
          "Nạp từng lần một thì đánh mất chính sự tiện lợi mà ví mang lại. Còn quỹ khẩn cấp thì nên nằm ở nơi vừa rút được nhanh vừa sinh lãi, chứ không phải trong ví.",
      },
      {
        question: "Ngân hàng số khác ngân hàng truyền thống chủ yếu ở điểm nào?",
        options: [
          "Mô hình vận hành ít chi nhánh, nên thường miễn nhiều loại phí hơn",
          "Không thuộc phạm vi bảo hiểm tiền gửi vì không có mạng lưới chi nhánh",
          "Chỉ nhận tiền gửi không kỳ hạn chứ không cung cấp sản phẩm có kỳ hạn",
          "Lãi suất tiền gửi do thuật toán quyết định nên thay đổi hằng ngày",
        ],
        correct: 0,
        explanation:
          "Nếu đó là ngân hàng được cấp phép thì tiền gửi tại đó được bảo hiểm như mọi ngân hàng khác. Chi phí vận hành thấp hơn là lý do họ cạnh tranh được bằng phí và đôi khi bằng lãi suất.",
      },
    ],
    keyTakeaways: [
      "Ví điện tử là trung gian thanh toán, không phải tiền gửi - không sinh lãi và không được bảo hiểm tiền gửi",
      "Tiền người dùng được giữ tách bạch ở tài khoản đảm bảo tại ngân hàng",
      "Chi phí thật của số dư lớn trong ví là khoản lãi không nhận được",
      "Ngân hàng số vẫn là ngân hàng: tiền gửi ở đó được bảo hiểm như bình thường",
    ],
    practicePrompt: {
      question:
        "Bạn đang để 40 triệu trong ví điện tử vì tiện thanh toán. Nên sắp xếp lại thế nào?",
      options: [
        "Giữ lại phần đủ cho chi tiêu vài tuần, chuyển phần lớn về tiền gửi",
        "Giữ nguyên vì tính tiện lợi quan trọng hơn phần lãi suất nhận được",
        "Chuyển toàn bộ về tài khoản thanh toán để vẫn rút được ngay khi cần",
        "Chia đều giữa ví điện tử và sổ tiết kiệm để cân bằng giữa hai bên",
      ],
      correct: 0,
      explanation:
        "Tài khoản thanh toán cũng gần như không sinh lãi, nên chuyển sang đó chỉ đổi chỗ chứ không giải quyết gì. Chia đều là một con số tùy tiện: mức hợp lý phải xuất phát từ chi tiêu thật của bạn trong vài tuần.",
    },
    summary: {
      keyIdea: "Ví điện tử là công cụ thanh toán, không phải nơi cất tiền - số dư nhàn rỗi ở đó là lãi bị bỏ lại",
      commonMistake: "Coi số dư trong ví như tiền gửi ngân hàng, cả về lợi suất lẫn cơ chế bảo vệ",
      action: "Tính chi tiêu qua ví trong bốn tuần gần nhất và đặt số dư mục tiêu quanh mức đó.",
    },
    application: {
      title: "Đặt mức trần cho ví",
      message:
        "Xem lịch sử giao dịch bốn tuần gần nhất trong ví, cộng lại rồi đặt số dư mục tiêu quanh con số ấy. Phần vượt lên chuyển về tiền gửi.",
      secondary:
        "Nhiều ví có chức năng tự động nạp từ tài khoản liên kết khi số dư xuống thấp - bật nó lên thì giữ được cả sự tiện lợi lẫn phần lãi.",
    },
    sections: [
      {
        type: "lead",
        text: "Với phần lớn người dùng, ví điện tử đã thay thế ví tiền thật. Chuyện đó hoàn toàn hợp lý - vấn đề chỉ nảy sinh khi nó thay thế luôn cả tài khoản tiết kiệm.",
      },
      { type: "heading", text: "Ba thứ đang bị gọi chung là tiền trong điện thoại" },
      {
        type: "conceptTable",
        title: "Ứng dụng nào giữ tiền theo cách nào",
        subtitle: "Trông giống nhau trên màn hình, khác nhau ở phía sau",
        concepts: [
          {
            vi: "Ứng dụng ngân hàng",
            en: "Bank app",
            def: "Chỉ là cửa vào tài khoản ngân hàng của bạn. Tiền vẫn là tiền gửi, vẫn sinh lãi theo sản phẩm và vẫn được bảo hiểm tiền gửi.",
          },
          {
            vi: "Ngân hàng số",
            en: "Digital bank",
            def: "Là ngân hàng được cấp phép, ít chi nhánh nên chi phí thấp hơn. Tiền gửi ở đây được bảo vệ như mọi ngân hàng khác.",
          },
          {
            vi: "Ví điện tử",
            en: "E-wallet",
            def: "Trung gian thanh toán. Tiền giữ tách bạch tại ngân hàng nhưng không phải tiền gửi của bạn, không sinh lãi.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Khác biệt này không nói rằng ví điện tử kém an toàn - tiền của người dùng được giữ tách khỏi tiền của công ty và có cơ chế quản lý riêng. Nó chỉ nói rằng ví được thiết kế cho việc thanh toán, và mọi đồng nằm lại đó lâu hơn mức cần thiết là một đồng không sinh lãi.",
      },
      {
        type: "callout",
        label: "Tiện lợi và lợi suất không phải chọn một",
        text: "Không cần bỏ ví để lấy lại phần lãi. Đặt một mức trần dựa trên chi tiêu thật, bật tự động nạp từ tài khoản liên kết, và bạn giữ được cả hai. Thứ duy nhất cần bỏ là thói quen để tiền nằm trong ví chỉ vì chưa bao giờ nghĩ tới việc chuyển nó đi.",
      },
      {
        type: "closing",
        lines: [
          "Ví điện tử làm rất tốt việc nó sinh ra để làm; cất tiền không nằm trong số đó.",
          "Bài cuối chặng: gộp tất cả thành một bảng - khoản tiền nào thì để ở đâu.",
        ],
      },
    ],
  },
  {
    id: 318,
    slug: "dat-tien-o-dau-cho-tung-muc-dich",
    title: "Chặng 12, Bài 9: Đặt tiền ở đâu cho từng mục đích",
    subtitle: "Câu hỏi không phải nơi nào lãi cao nhất, mà là khi nào bạn cần tới khoản này",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    whyItMatters:
      "Tám bài trước cho bạn các công cụ riêng lẻ. Bài này ghép chúng lại theo đúng cách một người thật ra quyết định: không phải chọn sản phẩm tốt nhất, mà là ghép mỗi khoản tiền với nơi phù hợp với thời điểm bạn cần dùng nó.",
    openingQuestion: "Biến nào quyết định nơi đặt một khoản tiền?",
    openingOptions: [
      "Mức lãi suất cao nhất đang được các ngân hàng niêm yết tại thời điểm đó",
      "Thời điểm bạn cần dùng tới khoản tiền ấy và mức chắc chắn của thời điểm đó",
      "Quy mô khoản tiền, vì số dư càng lớn thì càng có nhiều lựa chọn tốt hơn",
      "Uy tín và quy mô của ngân hàng nơi bạn dự định gửi khoản tiền đó",
    ],
    correctOption: 1,
    explanation:
      "Mọi bài trong chặng này đều quy về một biến duy nhất: khi nào bạn cần tiền. Nó quyết định kỳ hạn, và kỳ hạn quyết định lãi suất - chứ không phải ngược lại. Chọn theo lãi suất cao nhất là cách chắc chắn dẫn tới việc phá sổ giữa chừng và mất gần hết phần lãi ấy. Quy mô khoản tiền chỉ ảnh hưởng tới hạn mức bảo hiểm tiền gửi, tức tới việc chia ra bao nhiêu ngân hàng, chứ không đổi nguyên tắc. Và mức độ chắc chắn của thời điểm cũng quan trọng ngang thời điểm: khoản có thể cần bất cứ lúc nào phải nằm ở nơi rút được ngay, dù lãi thấp.",
    diagram: [
      { label: "Hỏi: khi nào cần tới khoản này", arrow: true },
      { label: "Chắc chắn hay có thể bất ngờ", arrow: true },
      { label: "Ghép với kỳ hạn tương ứng", arrow: true },
      { label: "Lãi suất là kết quả, không phải điểm xuất phát" },
    ],
    realWorldExample: {
      company: "Cùng 700 triệu, hai cách sắp xếp",
      description:
        "Người thứ nhất gửi cả 700 triệu vào kỳ hạn 24 tháng vì lãi cao nhất, rồi tháng thứ tám cần 80 triệu chữa bệnh và phải tất toán toàn bộ - mất gần hết tiền lãi của tám tháng. Người thứ hai tách 60 triệu quỹ khẩn cấp ở nơi rút ngay, 140 triệu kỳ hạn ngắn cho kế hoạch trong năm, 500 triệu chia thành bậc thang dài hạn. Khi có việc, người này rút đúng phần cần và không sổ nào bị động tới.",
    },
    quiz: [
      {
        question: "Quỹ khẩn cấp nên đặt ở đâu?",
        options: [
          "Nơi rút được ngay, chấp nhận lãi thấp vì nó được đánh giá bằng tính sẵn sàng",
          "Kỳ hạn 12 tháng để phần lãi cao bù lại cho rủi ro phải rút sớm",
          "Chứng chỉ tiền gửi vì đây là sản phẩm có mức lãi suất tốt nhất",
          "Chia đều giữa tiền gửi dài hạn và cổ phiếu để chống lại tác động của lạm phát",
        ],
        correct: 0,
        explanation:
          "Quỹ khẩn cấp tồn tại để dùng đúng vào lúc bạn không lường trước, nên mọi ràng buộc về thời gian đều làm hỏng chức năng của nó. Đây là khoản duy nhất trong danh mục mà lợi suất không phải tiêu chí.",
      },
      {
        question: "Tiền dành cho một khoản chi đã biết trước sáu tháng nữa nên để đâu?",
        options: [
          "Kỳ hạn ngắn khớp với thời điểm cần dùng, để không phải tất toán trước hạn",
          "Kỳ hạn dài nhất có thể vì mức lãi suất cao hơn hẳn kỳ hạn ngắn",
          "Tài khoản thanh toán để chắc chắn rút được ngay khi tới hạn chi",
          "Ví điện tử để có thể thanh toán trực tiếp ngay khi tới thời điểm cần dùng tiền",
        ],
        correct: 0,
        explanation:
          "Thời điểm đã biết trước là trường hợp dễ nhất: chọn kỳ hạn đáo hạn ngay trước lúc cần. Để ở tài khoản thanh toán hay ví thì mất trắng phần lãi của sáu tháng mà chẳng đổi lại được gì.",
      },
      {
        question: "Khoản chưa có kế hoạch dùng trong nhiều năm nên xử lý thế nào?",
        options: [
          "Bậc thang tiền gửi dài hạn, và cân nhắc kênh khác nếu lãi suất thực đang thấp",
          "Gửi toàn bộ vào một sổ có kỳ hạn dài nhất để tối đa hóa mức lãi suất nhận được",
          "Giữ ở kỳ hạn một tháng và tái tục liên tục để luôn linh hoạt khi cần",
          "Chuyển toàn bộ sang ví điện tử để thuận tiện khi có cơ hội đầu tư",
        ],
        correct: 0,
        explanation:
          "Một sổ duy nhất kỳ hạn dài buộc bạn phá cả khoản khi có việc, còn kỳ hạn một tháng thì bỏ phí phần lãi suốt nhiều năm. Bậc thang lấy được phần lớn của cả hai, và bài lãi suất thực nhắc rằng tiền gửi không phải câu trả lời duy nhất cho khoản rất dài hạn.",
      },
      {
        question: "Khi nào cần chia tiền sang ngân hàng khác?",
        options: [
          "Khi tổng số dư của bạn tại một ngân hàng vượt hạn mức bảo hiểm tiền gửi",
          "Khi bạn đã mở quá năm cuốn sổ tiết kiệm tại cùng một ngân hàng",
          "Khi ngân hàng hiện tại thay đổi mức lãi suất đang niêm yết giữa kỳ hạn",
          "Khi khoản tiền gửi có kỳ hạn dài hơn hai mươi bốn tháng liên tục",
        ],
        correct: 0,
        explanation:
          "Hạn mức gắn với cặp người gửi và tổ chức, nên số sổ không liên quan. Đây là lý do duy nhất trong chặng này để mở quan hệ ở một ngân hàng thứ hai.",
      },
      {
        question: "Sai lầm phổ biến nhất khi sắp xếp tiền là gì?",
        options: [
          "Bắt đầu từ câu hỏi nơi nào lãi cao nhất thay vì khi nào cần dùng tiền",
          "Chia khoản tiết kiệm thành quá nhiều sổ nhỏ nên khó theo dõi ngày đáo hạn",
          "Giữ quỹ khẩn cấp lớn hơn mức ba tháng chi tiêu thông thường",
          "Đặt tiền ở ngân hàng nhỏ thay vì các ngân hàng lớn có uy tín lâu năm",
        ],
        correct: 0,
        explanation:
          "Bắt đầu sai câu hỏi thì mọi bước sau đều lệch: khoản cần dùng sớm bị khóa vào kỳ hạn dài, rồi bị phá, rồi mất đúng phần lãi mà lựa chọn ban đầu nhắm tới.",
      },
    ],
    keyTakeaways: [
      "Biến quyết định là khi nào bạn cần tiền, không phải nơi nào trả lãi cao nhất",
      "Quỹ khẩn cấp đánh đổi lợi suất lấy tính sẵn sàng - đó là chức năng của nó",
      "Khoản có mốc rõ ràng thì chọn kỳ hạn đáo hạn ngay trước mốc đó",
      "Khoản dài hạn dùng bậc thang; hạn mức bảo hiểm quyết định chia ra mấy ngân hàng",
    ],
    practicePrompt: {
      question:
        "Bạn có 400 triệu: 50 triệu dự phòng, 100 triệu cho học phí sau chín tháng, 250 triệu chưa có kế hoạch. Sắp xếp thế nào?",
      options: [
        "50 triệu nơi rút ngay, 100 triệu kỳ hạn 9 tháng, 250 triệu chia bậc thang dài hạn",
        "Gộp cả 400 triệu vào kỳ hạn 12 tháng để hưởng mức lãi suất cao nhất",
        "Chia đều 400 triệu thành bốn sổ 100 triệu cùng kỳ hạn 12 tháng",
        "Giữ cả 400 triệu ở tài khoản thanh toán để luôn linh hoạt cho mọi tình huống có thể xảy ra",
      ],
      correct: 0,
      explanation:
        "Chia đều thành bốn sổ cùng kỳ hạn nghe có vẻ cân đối nhưng không khớp với bất kỳ mốc nào: sổ nào cũng đáo hạn sau học phí. Ghép từng khoản với đúng thời điểm cần dùng là toàn bộ nội dung của chặng này.",
    },
    summary: {
      keyIdea: "Ghép mỗi khoản tiền với thời điểm bạn cần nó; lãi suất là kết quả của việc ghép đúng",
      commonMistake: "Bắt đầu bằng câu hỏi nơi nào lãi cao nhất, rồi phá sổ và mất chính phần lãi đó",
      action: "Chia số tiền bạn đang có thành ba nhóm theo thời điểm cần dùng và đặt mỗi nhóm đúng chỗ.",
    },
    application: {
      title: "Ba nhóm, ba nơi",
      message:
        "Chia tiền của bạn thành: cần bất cứ lúc nào, cần vào một mốc đã biết, và chưa có kế hoạch trong nhiều năm. Nhóm một để nơi rút ngay, nhóm hai chọn kỳ hạn khớp mốc, nhóm ba dùng bậc thang.",
      secondary:
        "Nếu tổng ở một ngân hàng vượt hạn mức bảo hiểm tiền gửi, chia phần vượt sang tổ chức khác trước khi tối ưu lãi suất.",
    },
    sections: [
      {
        type: "lead",
        text: "Tám bài trước là tám công cụ. Bài này không thêm công cụ nào - nó trả lời câu hỏi mà mọi bài kia để ngỏ: với khoản tiền cụ thể đang nằm trong tài khoản của bạn, dùng công cụ nào.",
      },
      { type: "heading", text: "Một câu hỏi thay cho tất cả" },
      {
        type: "paragraph",
        text: "Khi nào tôi cần tới khoản này, và tôi chắc chắn tới mức nào về thời điểm đó. Hai vế ấy quyết định mọi thứ còn lại. Khoản có thể cần bất cứ lúc nào phải nằm ở nơi rút được ngay, và lãi suất thấp là cái giá hợp lý cho chức năng đó. Khoản có mốc rõ ràng thì chọn kỳ hạn đáo hạn ngay trước mốc. Khoản chưa có kế hoạch nào mới là chỗ duy nhất mà câu hỏi lãi suất trở nên chính đáng.",
      },
      {
        type: "conceptTable",
        title: "Ba nhóm tiền, ba nơi đặt",
        subtitle: "Phần lớn sai lầm là đặt nhóm một vào chỗ của nhóm ba",
        concepts: [
          {
            vi: "Cần bất cứ lúc nào",
            en: "Emergency",
            def: "Quỹ khẩn cấp. Tiền gửi không kỳ hạn hoặc kỳ hạn rất ngắn. Đánh giá bằng tốc độ lấy ra được, không bằng lãi suất.",
          },
          {
            vi: "Cần vào mốc đã biết",
            en: "Planned",
            def: "Học phí, sửa nhà, cưới hỏi. Chọn kỳ hạn đáo hạn ngay trước mốc - đây là trường hợp dễ nhất và ít khi bị làm sai.",
          },
          {
            vi: "Chưa có kế hoạch",
            en: "Long-term",
            def: "Bậc thang tiền gửi, chia theo hạn mức bảo hiểm nếu số dư lớn. Nếu lãi suất thực đang âm kéo dài, đây là phần nên cân nhắc kênh khác.",
          },
        ],
      },
      {
        type: "callout",
        label: "Thứ tự ưu tiên khi ba nguyên tắc xung đột",
        text: "Đầu tiên là tính sẵn sàng của quỹ khẩn cấp - không có ngoại lệ nào cho khoản này. Thứ hai là hạn mức bảo hiểm tiền gửi, vì nó là rủi ro mất vốn chứ không phải chuyện lợi suất. Cuối cùng mới tới việc tối ưu lãi suất. Đảo thứ tự này chính là cách phần lớn sai lầm trong chặng bắt đầu.",
      },
      {
        type: "closing",
        lines: [
          "Nơi lãi cao nhất và nơi đúng nhất hiếm khi là một, và nơi đúng nhất luôn thắng.",
          "Bài cuối chặng: một buổi rà soát toàn bộ tiền gửi của bạn, làm một lần rồi lặp lại mỗi năm.",
        ],
      },
    ],
  },
  {
    id: 319,
    slug: "ra-soat-tien-gui-hang-nam",
    title: "Chặng 12, Bài 10: Buổi rà soát tiền gửi hằng năm",
    subtitle: "Chín bài trước là kiến thức; bài này là ba mươi phút biến chúng thành tiền",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "✅",
    track: "personal",
    whyItMatters:
      "Mọi thứ trong chặng này đều trôi theo thời gian: lãi suất đổi, sổ tự tái tục ở mức thấp hơn, số dư vượt hạn mức bảo hiểm, phí quay lại vì gói miễn phí đổi điều kiện. Không có gì trong số đó tự báo cho bạn biết, nên cần một buổi rà soát định kỳ - và nó ngắn hơn nhiều so với vẻ ngoài.",
    openingQuestion: "Vì sao cần rà soát tiền gửi định kỳ dù không có gì thay đổi trong cách bạn dùng tiền?",
    openingOptions: [
      "Vì lãi suất, số dư và điều kiện miễn phí đều đổi theo thời gian mà không ai báo",
      "Vì ngân hàng yêu cầu khách hàng xác nhận lại thông tin tài khoản mỗi năm một lần",
      "Vì sổ tiết kiệm sẽ tự động bị đóng nếu không có giao dịch trong mười hai tháng",
      "Vì bảo hiểm tiền gửi chỉ có hiệu lực nếu chủ tài khoản xác nhận số dư hằng năm",
    ],
    correctOption: 0,
    explanation:
      "Cách bạn dùng tiền không đổi không có nghĩa là mọi thứ đứng yên. Sổ tự tái tục theo lãi suất mới, và trong một chu kỳ giảm lãi suất thì mức mới thấp hơn hẳn. Số dư lớn dần và có thể đã vượt hạn mức bảo hiểm tiền gửi tại một ngân hàng. Gói miễn phí có thể đã đổi điều kiện nên phí quay lại. Không cơ chế nào trong số này gửi thông báo cho bạn, và tất cả đều được phát hiện trong cùng một buổi ngồi xuống - đó là lý do gộp chúng thành một việc định kỳ thay vì bốn việc rời rạc.",
    diagram: [
      { label: "Liệt kê mọi khoản gửi và ngày đáo hạn", arrow: true },
      { label: "So lãi suất đang hưởng với mặt bằng hiện tại", arrow: true },
      { label: "Cộng số dư theo từng ngân hàng, đối chiếu hạn mức", arrow: true },
      { label: "Rà phí định kỳ trong sao kê mười hai tháng" },
    ],
    realWorldExample: {
      company: "Ba mươi phút, bốn phát hiện",
      description:
        "Một người ngồi xuống rà soát lần đầu sau ba năm. Kết quả: một sổ đã tái tục hai lần và đang chạy thấp hơn mặt bằng 1,3%; tổng số dư tại ngân hàng chính đã vượt hạn mức bảo hiểm; hai khoản phí định kỳ quay lại từ mười tháng trước vì gói cũ đổi điều kiện; và quỹ khẩn cấp bị khóa nhầm trong một sổ kỳ hạn 18 tháng. Không phát hiện nào cần kiến thức mới - chỉ cần ngồi xuống.",
    },
    quiz: [
      {
        question: "Việc nào nên làm đầu tiên trong buổi rà soát?",
        options: [
          "Liệt kê mọi khoản gửi kèm ngân hàng, số tiền, lãi suất và ngày đáo hạn",
          "Gọi điện cho từng ngân hàng để hỏi mức lãi suất ưu đãi hiện đang có",
          "Chuyển toàn bộ tiền về một ngân hàng duy nhất cho dễ theo dõi trong các năm sau",
          "Tất toán các sổ có lãi suất thấp nhất để gửi lại theo mặt bằng mới",
        ],
        correct: 0,
        explanation:
          "Không có danh sách thì mọi bước sau đều làm trên trí nhớ, và trí nhớ là thứ đã để sổ tái tục ba lần mà không ai biết. Tất toán sớm cũng là bước sai vì nó kích hoạt đúng điều khoản rút trước hạn.",
      },
      {
        question: "Phát hiện một sổ đang chạy lãi suất thấp hơn mặt bằng 1,3% thì nên làm gì?",
        options: [
          "Chờ tới ngày đáo hạn rồi mới chuyển, vì tất toán sớm sẽ mất gần hết lãi",
          "Tất toán ngay lập tức để chuyển sang nơi có mức lãi suất cao hơn",
          "Yêu cầu ngân hàng điều chỉnh lãi suất của sổ đó theo mặt bằng hiện hành",
          "Giữ nguyên vì chênh lệch hơn một điểm phần trăm là mức không đáng kể",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ bài rút trước hạn được dùng tới. Chênh lệch 1,3% trong phần kỳ hạn còn lại gần như luôn nhỏ hơn phần lãi bị mất khi tất toán sớm, nên câu trả lời đúng là đánh dấu ngày đáo hạn và hành động vào đúng ngày đó.",
      },
      {
        question: "Bao lâu nên rà soát một lần?",
        options: [
          "Mỗi năm một lần, và thêm một lần khi mặt bằng lãi suất biến động mạnh",
          "Mỗi tháng một lần để luôn nắm được mức lãi suất mới nhất của thị trường",
          "Năm năm một lần vì các điều kiện tiền gửi hiếm khi thay đổi đáng kể",
          "Chỉ khi bạn có thêm một khoản tiền lớn cần gửi vào ngân hàng",
        ],
        correct: 0,
        explanation:
          "Mỗi tháng là quá dày cho một thứ thay đổi chậm, và nó biến việc này thành gánh nặng rồi bị bỏ. Mỗi năm bắt được gần như mọi thứ, vì phần lớn kỳ hạn đều đáo hạn ít nhất một lần trong khoảng đó.",
      },
      {
        question: "Dấu hiệu nào cho thấy quỹ khẩn cấp đang bị đặt sai chỗ?",
        options: [
          "Nó nằm trong sổ có kỳ hạn nên muốn dùng thì phải chấp nhận mất phần lãi",
          "Nó đang được hưởng mức lãi suất thấp hơn các khoản tiết kiệm dài hạn",
          "Nó chiếm tỷ trọng nhỏ hơn hẳn so với tổng khoản tiết kiệm của bạn",
          "Nó nằm ở ngân hàng khác với nơi bạn nhận lương hằng tháng",
        ],
        correct: 0,
        explanation:
          "Lãi thấp hơn là đặc điểm bình thường của quỹ khẩn cấp chứ không phải lỗi. Lỗi là khi nó bị khóa: một quỹ khẩn cấp mà dùng tới phải trả giá thì đã thôi làm đúng chức năng của nó.",
      },
      {
        question: "Vì sao nên gộp bốn việc rà soát vào cùng một buổi?",
        options: [
          "Vì cả bốn đều cần chính danh sách khoản gửi mà bạn vừa lập ra",
          "Vì ngân hàng chỉ cho phép thay đổi thông tin tài khoản một lần mỗi năm",
          "Vì các khoản phí chỉ được hoàn lại nếu khiếu nại toàn bộ cùng một lúc",
          "Vì việc rà soát nhiều lần trong năm sẽ ảnh hưởng tới điểm tín dụng của bạn",
        ],
        correct: 0,
        explanation:
          "Chi phí lớn nhất của việc này là ngồi xuống và mở hết ứng dụng ngân hàng ra. Khi đã trả chi phí đó rồi thì ba việc còn lại gần như miễn phí, nên tách chúng ra làm bốn lần là tự nhân bốn phần khó nhất.",
      },
    ],
    keyTakeaways: [
      "Mọi thứ trôi theo thời gian: lãi suất tái tục, số dư vượt hạn mức, phí quay lại",
      "Bắt đầu bằng một danh sách đầy đủ - không có nó thì mọi bước sau chạy trên trí nhớ",
      "Sổ đang chạy lãi thấp thì chờ đáo hạn rồi chuyển, đừng tất toán sớm",
      "Mỗi năm một lần là đủ, vì phần lớn kỳ hạn đều đáo hạn ít nhất một lần trong khoảng đó",
    ],
    practicePrompt: {
      question:
        "Rà soát xong bạn thấy tổng số dư ở ngân hàng chính đã vượt hạn mức bảo hiểm, và một sổ còn bốn tháng nữa mới đáo hạn. Nên làm gì?",
      options: [
        "Chuyển phần vượt khi sổ đó đáo hạn, đánh dấu lịch ngay từ bây giờ",
        "Tất toán sổ ngay hôm nay để đưa phần vượt sang ngân hàng khác",
        "Mở thêm vài sổ nhỏ tại chính ngân hàng đó để chia nhỏ số dư ra",
        "Bỏ qua vì rủi ro ngân hàng gặp vấn đề trong bốn tháng là rất thấp",
      ],
      correct: 0,
      explanation:
        "Mở thêm sổ tại cùng ngân hàng không thay đổi gì vì hạn mức cộng gộp theo tổ chức. Tất toán sớm thì trả một khoản chắc chắn để né một rủi ro rất nhỏ trong bốn tháng - đánh đổi không hợp lý. Đánh dấu lịch là bước vừa đúng vừa rẻ.",
    },
    summary: {
      keyIdea: "Ba mươi phút mỗi năm bắt được gần như mọi thứ đã trôi khỏi chỗ đúng của nó",
      commonMistake: "Cho rằng không thay đổi gì thì không cần xem lại - trong khi lãi suất và điều kiện tự đổi",
      action: "Đặt một buổi rà soát ba mươi phút vào lịch, lặp lại hằng năm vào cùng một tháng.",
    },
    application: {
      title: "Buổi rà soát đầu tiên, làm ngay tuần này",
      message:
        "Mở mọi ứng dụng ngân hàng, lập một bảng gồm: ngân hàng, số tiền, lãi suất, ngày đáo hạn. Rồi làm bốn việc - so lãi với mặt bằng, cộng số dư theo ngân hàng, rà phí trong sao kê, kiểm quỹ khẩn cấp có bị khóa không.",
      secondary:
        "Giữ lại bảng đó. Năm sau bạn chỉ cần cập nhật thay vì lập lại từ đầu, và buổi rà soát thứ hai sẽ mất chưa tới mười lăm phút.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước giải thích cách mọi thứ vận hành. Bài này chỉ có một nội dung: ngồi xuống ba mươi phút và áp chúng vào số tiền thật của bạn.",
      },
      { type: "heading", text: "Bốn thứ trôi đi mà không báo" },
      {
        type: "list",
        items: [
          "Sổ tự tái tục theo lãi suất mới - trong chu kỳ giảm, mức mới có thể thấp hơn nhiều",
          "Số dư lớn dần và có thể đã vượt hạn mức bảo hiểm tiền gửi tại một ngân hàng",
          "Điều kiện miễn phí đổi, nên phí định kỳ quay lại dù cách bạn dùng không đổi",
          "Quỹ khẩn cấp bị khóa vào một kỳ hạn dài trong lúc sắp xếp lại tiền",
        ],
      },
      {
        type: "paragraph",
        text: "Không thứ nào trong bốn thứ trên gửi thông báo, và không thứ nào gây hậu quả ngay lập tức - đó chính là lý do chúng kéo dài nhiều năm. Điểm chung thứ hai quan trọng hơn: cả bốn đều được phát hiện từ cùng một danh sách, nên chi phí kiểm cái thứ hai, thứ ba và thứ tư gần như bằng không khi đã kiểm cái thứ nhất.",
      },
      {
        type: "conceptTable",
        title: "Bốn bước, và điều cần làm với mỗi phát hiện",
        subtitle: "Phần lớn kết luận là đánh dấu lịch, không phải hành động ngay",
        concepts: [
          {
            vi: "Lãi suất đang hưởng",
            en: "Rate check",
            def: "So với mặt bằng hiện tại. Thấp hơn thì đánh dấu ngày đáo hạn để chuyển - đừng tất toán sớm.",
          },
          {
            vi: "Số dư theo ngân hàng",
            en: "Insurance limit",
            def: "Cộng gộp mọi sổ tại từng nơi, so với hạn mức bảo hiểm. Vượt thì lên kế hoạch chuyển phần vượt vào ngày đáo hạn gần nhất.",
          },
          {
            vi: "Phí định kỳ",
            en: "Recurring fees",
            def: "Lọc sao kê mười hai tháng. Với mỗi khoản, hỏi nếu được chào hôm nay thì bạn có mua không.",
          },
          {
            vi: "Vị trí quỹ khẩn cấp",
            en: "Emergency access",
            def: "Kiểm xem nó có bị khóa vào kỳ hạn nào không. Đây là thứ duy nhất đáng sửa ngay kể cả khi phải chịu thiệt.",
          },
        ],
      },
      {
        type: "callout",
        label: "Phần lớn phát hiện không cần hành động ngay",
        text: "Trực giác sau khi phát hiện một sổ đang chạy lãi thấp là sửa ngay lập tức, và đó thường là quyết định đắt nhất trong cả buổi. Điều khoản rút trước hạn khiến việc tất toán sớm gần như luôn tốn hơn phần chênh lệch lãi suất của quãng còn lại. Ngoại lệ duy nhất là quỹ khẩn cấp bị khóa - vì ở đó cái bạn mua lại là khả năng dùng tiền khi có việc.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 12. Bạn đã biết tiền của mình đang nằm ở đâu, hưởng bao nhiêu, và được bảo vệ tới đâu.",
          "Điều còn lại là ba mươi phút mỗi năm để những câu trả lời đó vẫn còn đúng.",
        ],
      },
    ],
  },
];
