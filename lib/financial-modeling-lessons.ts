import type { Lesson } from "./lesson-types";

// Chặng "Mô hình tài chính thực hành" (ids 1311-1320, professional track).
//
// Deliberate design note: financial modelling is a hands-on Excel skill and
// these are text lessons. Rather than pretend to teach keystrokes, each
// lesson targets the part that actually separates a good model from a bad
// one and that DOES transfer through prose: structure, the logic linking the
// statements, and the judgment calls behind assumptions. Learners are told
// explicitly to rebuild each concept in their own spreadsheet.

export const FINANCIAL_MODELING_LESSONS: Lesson[] = [
  {
    id: 1311,
    slug: "nguyen-tac-dung-mo-hinh-tai-chinh",
    title: "Mô hình TC, Bài 1: Nguyên tắc dựng mô hình - cấu trúc trước công thức",
    subtitle: "Vì sao mô hình sai thường do bố cục, không phải do phép tính",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🏗️",
    track: "professional",
    whyItMatters:
      "Phần lớn lỗi mô hình tài chính trong thực tế không đến từ công thức sai, mà từ cấu trúc lộn xộn khiến người dùng không phát hiện được lỗi. Nắm quy ước dựng mô hình trước khi viết công thức đầu tiên là thứ phân biệt người làm nghề với người ghép số.",
    openingQuestion:
      "Nguyên tắc quan trọng nhất khi bố cục một mô hình tài chính là gì?",
    openingOptions: [
      "Dùng càng nhiều sheet càng tốt để chia nhỏ nội dung",
      "Tách bạch giả định, phần tính toán và phần kết quả",
      "Giấu các dòng trung gian để bảng trông gọn gàng",
      "Viết công thức càng dài càng tốt để giảm số dòng",
    ],
    correctOption: 1,
    explanation:
      "Mô hình tốt tách ba lớp riêng biệt: INPUT (giả định, thường tô màu xanh, là thứ duy nhất được gõ tay), CALCULATION (công thức, không bao giờ chứa số cứng), và OUTPUT (báo cáo, biểu đồ). Khi ba lớp lẫn vào nhau, không ai - kể cả người dựng - biết được con số nào là giả định và con số nào là kết quả.",
    diagram: [
      { label: "INPUT: giả định (gõ tay)", arrow: true },
      { label: "CALCULATION: công thức thuần", arrow: true },
      { label: "OUTPUT: báo cáo & biểu đồ" },
    ],
    realWorldExample: {
      company: "Quy ước trong ngân hàng đầu tư",
      description:
        "Các ngân hàng đầu tư áp dụng quy ước màu gần như thống nhất: ô màu xanh dương là số nhập tay, ô màu đen là công thức trong cùng sheet, ô màu xanh lá là liên kết sang sheet khác. Nhờ vậy một người mới nhận bàn giao mô hình có thể nhìn màu là biết ngay đâu là chỗ được phép sửa - không cần đọc từng ô.",
    },
    quiz: [
      {
        question: "Vì sao không nên gõ số cứng vào giữa công thức?",
        options: [
          "Vì làm chậm tốc độ tính toán của file",
          "Vì người khác không nhìn thấy giả định đó, nên không kiểm tra và không sửa được khi cần",
          "Vì Excel không cho phép",
          "Vì số cứng luôn sai về mặt toán học",
        ],
        correct: 1,
        explanation:
          "Số cứng nằm trong công thức là giả định bị 'chôn'. Không ai biết nó tồn tại, nên không ai chất vấn hay cập nhật được nó - nguồn lỗi phổ biến nhất trong mô hình thực tế.",
      },
      {
        question: "Quy ước màu tiêu chuẩn trong mô hình tài chính là gì?",
        options: [
          "Xanh dương = nhập tay, đen = công thức, xanh lá = liên kết sheet khác",
          "Đỏ = quan trọng, vàng = cần kiểm tra, xanh = đã duyệt",
          "Không có quy ước, tùy người dựng",
          "Mọi ô đều để mặc định để tránh rối",
        ],
        correct: 0,
        explanation:
          "Quy ước này gần như phổ quát trong ngành, giúp bất kỳ ai mở mô hình cũng biết ngay ô nào được phép chỉnh sửa.",
      },
      {
        question: "Một mô hình 'kiểm toán được' (auditable) nghĩa là gì?",
        options: [
          "Đã được công ty kiểm toán ký duyệt",
          "Người khác có thể lần theo từ kết quả ngược về giả định gốc mà không cần hỏi người dựng",
          "Có mật khẩu bảo vệ",
          "Chỉ chứa số liệu từ báo cáo đã kiểm toán",
        ],
        correct: 1,
        explanation:
          "Tính kiểm toán được là khả năng truy vết: mỗi con số kết quả phải lần ngược được về các giả định đầu vào qua chuỗi công thức rõ ràng.",
      },
      {
        question: "Vì sao nên giữ một dòng thời gian thống nhất cho cả mô hình?",
        options: [
          "Để file nhẹ hơn",
          "Để mọi sheet dùng chung một trục kỳ (năm/quý), tránh lệch cột khi liên kết giữa các phần",
          "Vì Excel yêu cầu bắt buộc",
          "Để dễ in ra giấy",
        ],
        correct: 1,
        explanation:
          "Khi mỗi sheet có trục thời gian riêng, việc liên kết dễ bị lệch một cột - loại lỗi rất khó phát hiện vì mô hình vẫn chạy và vẫn ra số.",
      },
    ],
    keyTakeaways: [
      "Tách ba lớp: INPUT (gõ tay) - CALCULATION (công thức thuần) - OUTPUT (báo cáo)",
      "Không bao giờ chôn số cứng vào giữa công thức; mọi giả định phải nằm ở vùng input",
      "Quy ước màu: xanh dương = nhập tay, đen = công thức, xanh lá = liên kết sheet khác",
      "Dùng một trục thời gian thống nhất cho toàn bộ mô hình",
    ],
    practicePrompt: {
      question:
        "Bạn nhận bàn giao một mô hình, thấy công thức doanh thu là `=B12*1,08`. Vấn đề lớn nhất ở đây là gì?",
      options: [
        "Công thức quá đơn giản, cần thêm biến số",
        "Tỷ lệ tăng trưởng 8% bị chôn trong công thức",
        "Không có vấn đề gì nếu 8% là con số đúng",
        "Nên dùng hàm SUM thay vì phép nhân",
      ],
      correct: 1,
      explanation:
        "Con số 1,08 là một giả định quan trọng nhưng đang vô hình. Cách đúng: đặt 8% vào ô giả định riêng ở vùng input, rồi công thức tham chiếu đến ô đó. Khi cần chạy kịch bản tăng trưởng 5% hay 12%, bạn chỉ sửa một ô thay vì rà toàn bộ mô hình.",
    },
    summary: {
      keyIdea: "Cấu trúc quyết định chất lượng mô hình nhiều hơn công thức",
      commonMistake: "Chôn giả định vào giữa công thức, khiến mô hình không kiểm tra và không chạy kịch bản được.",
      action: "Mở một mô hình bạn từng dựng và đánh dấu xem có bao nhiêu số cứng đang nằm trong công thức.",
    },
    application: {
      title: "Dựng khung trước khi điền số",
      message:
        "Mở một file trống, tạo ba vùng rõ ràng: Giả định, Tính toán, Kết quả. Đặt trục thời gian thống nhất ở hàng trên cùng. Chỉ sau đó mới bắt đầu viết công thức đầu tiên.",
      secondary: "Thói quen này tốn 10 phút ban đầu nhưng tiết kiệm hàng giờ gỡ lỗi về sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Người mới thường nghĩ dựng mô hình tài chính là chuyện thành thạo hàm Excel. Thực tế, phần lớn mô hình hỏng không phải vì công thức sai mà vì bố cục khiến không ai phát hiện được lỗi - kể cả người dựng ra nó.",
      },
      { type: "heading", text: "Ba lớp phải tách bạch" },
      {
        type: "list",
        items: [
          "**INPUT** - toàn bộ giả định: tăng trưởng doanh thu, biên lợi nhuận, lãi suất, thuế suất. Đây là nơi DUY NHẤT được gõ số bằng tay.",
          "**CALCULATION** - các bảng tính trung gian và ba báo cáo. Chỉ chứa công thức, tuyệt đối không có số cứng.",
          "**OUTPUT** - bảng tóm tắt, biểu đồ, các chỉ số dùng để ra quyết định.",
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc vàng",
        text: "Nếu bạn phải sửa một con số ở hai nơi trở lên để chạy một kịch bản, mô hình của bạn đã sai cấu trúc. Mỗi giả định chỉ được tồn tại đúng một lần, ở một ô duy nhất.",
      },
      { type: "heading", text: "Quy ước màu - ngôn ngữ chung của ngành" },
      {
        type: "conceptTable",
        title: "Quy ước phổ biến",
        concepts: [
          { vi: "Ô xanh dương", en: "Blue - hardcoded input", def: "Số nhập tay, là giả định - được phép sửa" },
          { vi: "Ô đen", en: "Black - formula", def: "Công thức tính trong cùng sheet - không sửa trực tiếp" },
          { vi: "Ô xanh lá", en: "Green - link", def: "Liên kết sang sheet khác trong cùng file" },
          { vi: "Tính kiểm toán được", en: "Auditability", def: "Khả năng lần ngược từ kết quả về giả định gốc mà không cần hỏi ai" },
        ],
      },
      {
        type: "heading",
        text: "Một con số cứng nằm trong công thức tốn bao nhiêu",
      },
      {
        type: "paragraph",
        text: "Giả sử thuế suất 20% được gõ thẳng vào công thức lợi nhuận sau thuế, ở 5 năm dự phóng × 3 kịch bản = 15 ô. Đến khi cần thử mức 17%, bạn phải tìm và sửa đúng 15 chỗ, và chỉ cần bỏ sót một ô là mô hình vẫn chạy, vẫn ra số đẹp, chỉ sai. Không có cách nào để Excel báo cho bạn biết. Cùng giả định ấy đặt ở MỘT ô trong sheet giả định, mọi công thức trỏ về đó: đổi một lần, mọi kịch bản cập nhật, và không có ô nào để bỏ sót. Đây là toàn bộ lý do của quy tắc một-giả-định-một-chỗ - nó không phải chuyện gọn gàng, nó là chuyện có bỏ sót được hay không.",
      },
      {
        type: "conceptTable",
        title: "Bốn quy tắc cấu trúc, và loại lỗi mà bỏ qua nó sẽ sinh ra",
        subtitle: "Đều là quy ước, không phải kỹ thuật - nhưng đây là chỗ mô hình hỏng",
        concepts: [
          {
            vi: "Mỗi giả định đúng một ô",
            en: "Single source of truth",
            def: "Bỏ qua: sửa kịch bản phải sửa nhiều chỗ, và sai số vào mô hình qua đúng cái ô bị quên.",
          },
          {
            vi: "Thời gian chảy một chiều, trái sang phải",
            en: "One direction of time",
            def: "Bỏ qua: công thức năm 3 trỏ ngược về năm 5, và không ai lần được thứ tự tính - cũng là nguồn gốc phần lớn vòng lặp ngoài ý muốn.",
          },
          {
            vi: "Cùng một hàng, cùng một công thức",
            en: "Consistent rows",
            def: "Bỏ qua: một ô giữa hàng bị sửa riêng. Đây là lỗi khó thấy nhất vì hàng vẫn trông đều tăm tắp; chỉ Ctrl+' hoặc chế độ hiện công thức mới lộ ra.",
          },
          {
            vi: "Không trộn đơn vị trong một hàng",
            en: "One unit per row",
            def: "Bỏ qua: tỷ đồng và triệu đồng nằm chung một hàng, tổng cộng ra một con số vô nghĩa mà vẫn cộng được.",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Cấu trúc tốt khiến lỗi tự lộ diện; cấu trúc tệ khiến lỗi ẩn mình.",
          "Bài tiếp theo: dự phóng doanh thu - phần giả định quan trọng nhất của mọi mô hình.",
        ],
      },
    ],
  },

  {
    id: 1312,
    slug: "du-phong-doanh-thu-revenue-build",
    title: "Mô hình TC, Bài 2: Dự phóng doanh thu từ động lực thật",
    subtitle: "Vì sao 'tăng 10% mỗi năm' là một giả định lười",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "professional",
    whyItMatters:
      "Doanh thu là dòng đầu tiên và là dòng chi phối toàn bộ mô hình - sai ở đây thì mọi thứ phía dưới đều sai. Dự phóng bằng động lực thật thay vì một tỷ lệ tăng trưởng chung chung là khác biệt lớn nhất giữa mô hình thuyết phục và mô hình bị bác bỏ.",
    openingQuestion:
      "Cách dự phóng doanh thu nào có sức thuyết phục cao nhất khi trình bày với nhà đầu tư?",
    openingOptions: [
      "Giả định doanh thu tăng đều 10% mỗi năm trong 5 năm",
      "Tách thành động lực kiểm chứng được: lượng × giá",
      "Lấy trung bình tăng trưởng ngành rồi áp cho công ty",
      "Dùng đúng mức tăng trưởng của năm gần nhất",
    ],
    correctOption: 1,
    explanation:
      "Dự phóng theo động lực (driver-based) tách doanh thu thành các thành phần có thể chất vấn và kiểm chứng riêng lẻ. Thay vì tranh luận '10% có hợp lý không' - câu hỏi không ai trả lời được - bạn tranh luận về từng biến: công suất có đủ không, giá có tăng được không, thị phần lấy từ đâu. Đó là cuộc thảo luận có căn cứ.",
    diagram: [
      { label: "Tách động lực doanh thu", arrow: true },
      { label: "Số lượng × Giá bán", arrow: true },
      { label: "Kiểm chứng từng biến", arrow: true },
      { label: "Doanh thu dự phóng" },
    ],
    realWorldExample: {
      company: "Chuỗi bán lẻ",
      description:
        "Với một chuỗi cửa hàng, dự phóng 'doanh thu tăng 15%' gần như không có giá trị phân tích. Cách đúng là tách: số cửa hàng cuối kỳ × doanh thu trung bình mỗi cửa hàng, trong đó số cửa hàng lại tách thành cửa hàng hiện có cộng số mở mới trừ số đóng cửa. Khi đó nhà đầu tư có thể chất vấn từng giả định: kế hoạch mở 20 cửa hàng có khả thi về vốn và mặt bằng không?",
    },
    quiz: [
      {
        question: "Dự phóng theo động lực (driver-based) nghĩa là gì?",
        options: [
          "Áp một tỷ lệ tăng trưởng cố định cho mọi năm",
          "Tách doanh thu thành các biến số cấu thành có thể kiểm chứng và chất vấn riêng lẻ",
          "Chỉ dùng số liệu quá khứ để ngoại suy",
          "Lấy dự phóng từ báo cáo phân tích của công ty chứng khoán",
        ],
        correct: 1,
        explanation:
          "Bản chất là phân rã doanh thu thành các thành phần có ý nghĩa kinh doanh, để mỗi giả định đều có thể được thảo luận dựa trên bằng chứng.",
      },
      {
        question:
          "Với doanh nghiệp SaaS, cách phân rã doanh thu hợp lý nhất là gì?",
        options: [
          "Tổng chi phí marketing × hệ số chuyển đổi",
          "Số khách hàng đầu kỳ + khách mới − khách rời bỏ, nhân với doanh thu bình quân mỗi khách",
          "Số nhân viên × năng suất trung bình",
          "Vốn hóa thị trường × tỷ lệ tăng trưởng",
        ],
        correct: 1,
        explanation:
          "Mô hình SaaS xoay quanh tập khách hàng định kỳ: cần theo dõi khách mới, tỷ lệ rời bỏ (churn) và doanh thu bình quân mỗi khách (ARPU).",
      },
      {
        question:
          "Vì sao nên kiểm tra dự phóng doanh thu với ràng buộc công suất?",
        options: [
          "Vì công suất quyết định thuế phải nộp",
          "Vì mô hình có thể cho ra sản lượng vượt quá năng lực nhà máy hoặc quy mô thị trường - một kết quả vô nghĩa nhưng vẫn chạy được",
          "Vì kiểm toán viên yêu cầu",
          "Vì công suất luôn bằng doanh thu",
        ],
        correct: 1,
        explanation:
          "Excel không biết nhà máy chỉ sản xuất được 1 triệu sản phẩm/năm. Nếu không tự đặt ràng buộc, mô hình sẽ vui vẻ dự phóng 3 triệu sản phẩm mà không báo lỗi.",
      },
      {
        question:
          "Dấu hiệu nào cho thấy dự phóng doanh thu thiếu tin cậy?",
        options: [
          "Doanh thu tăng trưởng đều tăm tắp một con số duy nhất suốt 5 năm, không gắn với bất kỳ động lực nào",
          "Tăng trưởng khác nhau giữa các năm",
          "Có phân tích kịch bản kèm theo",
          "Doanh thu được tách theo từng dòng sản phẩm",
        ],
        correct: 0,
        explanation:
          "Tăng trưởng phẳng lì và không giải thích được là dấu hiệu điển hình của giả định lười - thường bị bác ngay khi bị hỏi 'con số này từ đâu ra'.",
      },
    ],
    keyTakeaways: [
      "Tách doanh thu thành động lực: số lượng × giá, hoặc khách hàng × giá trị × tần suất",
      "Mỗi động lực phải kiểm chứng được bằng dữ liệu hoặc kế hoạch cụ thể",
      "Luôn đối chiếu với ràng buộc thực tế: công suất, quy mô thị trường, nguồn lực",
      "Tăng trưởng đều một con số suốt nhiều năm là dấu hiệu giả định lười",
    ],
    practicePrompt: {
      question:
        "Một nhà máy có công suất tối đa 1 triệu sản phẩm/năm, hiện chạy 800.000 sản phẩm. Mô hình dự phóng sản lượng tăng 15%/năm trong 5 năm. Vấn đề là gì?",
      options: [
        "Không có vấn đề, 15% là mức tăng trưởng hợp lý",
        "Năm thứ 2 sản lượng đã vượt công suất thiết kế",
        "Nên giảm xuống 10% cho an toàn",
        "Cần đổi sang dự phóng theo doanh thu thay vì sản lượng",
      ],
      correct: 1,
      explanation:
        "800.000 × 1,15 = 920.000 (vẫn trong công suất); × 1,15 nữa = 1.058.000, đã vượt trần 1 triệu. Từ năm 3 trở đi mô hình đang dự phóng một điều bất khả thi về mặt vật lý. Cách xử lý đúng: hoặc thêm giả định CapEx mở rộng công suất kèm chi phí tương ứng, hoặc dùng hàm chặn ở mức trần.",
    },
    summary: {
      keyIdea: "Doanh thu = tích của các động lực kiểm chứng được, không phải một tỷ lệ tăng trưởng áp đặt",
      commonMistake: "Dùng một tỷ lệ tăng trưởng chung cho mọi năm mà không gắn với động lực kinh doanh nào.",
      action: "Chọn một doanh nghiệp và thử phân rã doanh thu của họ thành 2-3 động lực chính.",
    },
    application: {
      title: "Phân rã doanh thu một doanh nghiệp thật",
      message:
        "Lấy báo cáo thường niên của một công ty niêm yết. Tìm xem họ công bố những động lực nào: số cửa hàng, sản lượng, số thuê bao, giá bán bình quân. Thử dựng lại doanh thu năm gần nhất từ các động lực đó.",
      secondary: "Nếu ráp lại khớp với doanh thu công bố, bạn đã hiểu đúng mô hình kinh doanh của họ.",
    },
    sections: [
      {
        type: "lead",
        text: "Doanh thu là dòng đầu tiên của mô hình và chi phối mọi thứ phía dưới. Nhưng đây cũng là nơi người dựng mô hình dễ lười nhất: gõ một con số tăng trưởng rồi kéo sang phải cho hết 5 năm.",
      },
      { type: "heading", text: "Vì sao 'tăng 10% mỗi năm' bị bác bỏ" },
      {
        type: "paragraph",
        text: "Một tỷ lệ tăng trưởng áp đặt không thể chất vấn được. Người nghe chỉ có thể nói 'tôi thấy hơi cao' hoặc 'nghe cũng hợp lý' - không có căn cứ nào để thảo luận. Ngược lại, khi bạn tách doanh thu thành số lượng và giá bán, mỗi phần đều gắn với một câu hỏi có thể trả lời bằng dữ liệu.",
      },
      {
        type: "comparison",
        left: {
          label: "Giả định áp đặt",
          text: "Doanh thu = năm trước × 110%. Không ai biết 10% đến từ đâu, và không thể kiểm chứng.",
        },
        right: {
          label: "Dự phóng theo động lực",
          text: "Doanh thu = sản lượng × giá bán, trong đó sản lượng gắn với công suất và giá gắn với mặt bằng thị trường. Mỗi biến kiểm chứng được riêng.",
        },
      },
      { type: "heading", text: "Các cách phân rã theo loại hình kinh doanh" },
      {
        type: "list",
        items: [
          "**Sản xuất:** sản lượng × giá bán bình quân, ràng buộc bởi công suất nhà máy",
          "**Bán lẻ:** số điểm bán × doanh thu bình quân mỗi điểm; số điểm bán = đầu kỳ + mở mới − đóng cửa",
          "**SaaS / thuê bao:** khách đầu kỳ + khách mới − khách rời bỏ, nhân doanh thu bình quân mỗi khách",
          "**Dịch vụ:** số nhân sự tính phí × số giờ tính phí × đơn giá giờ",
        ],
      },
      {
        type: "callout",
        label: "Excel không biết giới hạn vật lý",
        text: "Mô hình sẽ vui vẻ dự phóng sản lượng vượt công suất nhà máy, thị phần vượt 100%, hoặc số khách hàng lớn hơn dân số. Ràng buộc thực tế phải do bạn chủ động đưa vào - không có cảnh báo tự động nào cả.",
      },
      {
        type: "closing",
        lines: [
          "Dự phóng tốt không phải dự đoán đúng, mà là làm rõ bạn đang đặt cược vào điều gì.",
          "Bài tiếp theo: liên kết ba báo cáo - trái tim của mô hình tài chính.",
        ],
      },
    ],
  },

  {
    id: 1313,
    slug: "mo-hinh-ba-bao-cao-lien-ket",
    title: "Mô hình TC, Bài 3: Mô hình 3 báo cáo liên kết",
    subtitle: "Cách P&L, bảng cân đối và lưu chuyển tiền tệ khớp vào nhau",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Mô hình 3 báo cáo liên kết là kỹ năng nền tảng của mọi công việc phân tích tài chính, và là bài kiểm tra phổ biến nhất trong phỏng vấn ngành. Hiểu được các mắt xích khiến ba báo cáo tự khớp với nhau là hiểu được cách kế toán vận hành trong thực tế.",
    openingQuestion:
      "Trong mô hình 3 báo cáo, điều gì chứng tỏ mô hình của bạn đúng?",
    openingOptions: [
      "Lợi nhuận ròng dương qua mọi năm dự phóng",
      "Bảng cân đối cân: Tài sản = Nợ + Vốn chủ",
      "Doanh thu tăng trưởng ổn định",
      "Dòng tiền hoạt động luôn lớn hơn lợi nhuận ròng",
    ],
    correctOption: 1,
    explanation:
      "Bảng cân đối cân là phép kiểm tra tự động của mô hình 3 báo cáo. Nếu mọi mắt xích được nối đúng - lợi nhuận ròng chảy vào lợi nhuận giữ lại, khấu hao cộng ngược vào dòng tiền, thay đổi vốn lưu động phản ánh đúng - thì bảng cân đối sẽ tự cân. Lệch dù chỉ một đồng nghĩa là có mắt xích bị nối sai.",
    diagram: [
      { label: "P&L: ra Lợi nhuận ròng", arrow: true },
      { label: "→ Lợi nhuận giữ lại (BS)", arrow: true },
      { label: "→ CF: cộng lại khấu hao, ± vốn lưu động", arrow: true },
      { label: "→ Tiền mặt cuối kỳ (BS) → BS cân" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Bài kiểm tra phỏng vấn kinh điển",
      description:
        "Câu hỏi phỏng vấn phổ biến nhất ngành tài chính: 'Khấu hao tăng 10 đồng thì ba báo cáo thay đổi thế nào?' Đáp án: P&L - chi phí tăng 10, lợi nhuận trước thuế giảm 10, thuế giảm 2 (thuế suất 20%), lợi nhuận ròng giảm 8. CF - bắt đầu từ lợi nhuận ròng −8, cộng ngược khấu hao +10, dòng tiền tăng 2. BS - tiền mặt tăng 2, tài sản cố định giảm 10, tổng tài sản giảm 8; lợi nhuận giữ lại giảm 8. Hai vế khớp.",
    },
    quiz: [
      {
        question:
          "Lợi nhuận ròng từ P&L chảy vào bảng cân đối qua khoản mục nào?",
        options: [
          "Tiền mặt",
          "Vốn góp chủ sở hữu",
          "Lợi nhuận giữ lại (retained earnings)",
          "Nợ dài hạn",
        ],
        correct: 2,
        explanation:
          "Lợi nhuận giữ lại cuối kỳ = lợi nhuận giữ lại đầu kỳ + lợi nhuận ròng − cổ tức. Đây là mắt xích chính nối P&L với bảng cân đối.",
      },
      {
        question: "Vì sao khấu hao được cộng ngược lại trong báo cáo lưu chuyển tiền tệ?",
        options: [
          "Vì đó là quy định kế toán không có lý do cụ thể",
          "Vì nó đã bị trừ khỏi lợi nhuận trên P&L nhưng không thực sự làm tiền rời khỏi doanh nghiệp",
          "Vì nó làm tăng giá trị tài sản",
          "Vì nó là khoản thu nhập bị bỏ sót",
        ],
        correct: 1,
        explanation:
          "Khấu hao là chi phí phi tiền mặt. Dòng tiền hoạt động bắt đầu từ lợi nhuận ròng nên phải cộng ngược lại các khoản đã trừ mà không tiêu tiền.",
      },
      {
        question:
          "Khoản phải thu tăng 50 tỷ trong kỳ ảnh hưởng đến dòng tiền thế nào?",
        options: [
          "Tăng dòng tiền 50 tỷ vì doanh thu tăng",
          "Giảm dòng tiền 50 tỷ vì tiền bị đọng ở khách hàng chưa thu được",
          "Không ảnh hưởng đến dòng tiền",
          "Tăng dòng tiền 50 tỷ nhưng giảm lợi nhuận",
        ],
        correct: 1,
        explanation:
          "Doanh thu đã được ghi nhận trên P&L nhưng tiền chưa về. Tài sản lưu động tăng là dòng tiền giảm - đây là lý do doanh nghiệp tăng trưởng nhanh vẫn có thể cạn tiền.",
      },
      {
        question: "Mắt xích cuối cùng khép kín mô hình 3 báo cáo là gì?",
        options: [
          "Doanh thu từ P&L đưa sang bảng cân đối",
          "Tiền mặt cuối kỳ từ báo cáo lưu chuyển tiền tệ đưa vào dòng tiền mặt trên bảng cân đối",
          "Chi phí lãi vay đưa vào vốn chủ sở hữu",
          "Khấu hao đưa vào doanh thu",
        ],
        correct: 1,
        explanation:
          "Số dư tiền cuối kỳ từ báo cáo lưu chuyển tiền tệ chính là dòng tiền mặt trên bảng cân đối. Nối xong mắt xích này, bảng cân đối sẽ tự cân nếu mọi thứ khác đã đúng.",
      },
    ],
    keyTakeaways: [
      "Ba mắt xích chính: NI → lợi nhuận giữ lại; khấu hao cộng ngược vào CF; tiền cuối kỳ CF → tiền mặt BS",
      "Bảng cân đối cân là phép kiểm tra tự động - lệch nghĩa là có mắt xích sai",
      "Tài sản lưu động tăng = dòng tiền giảm; nợ phải trả tăng = dòng tiền tăng",
      "Không bao giờ 'ép' bảng cân đối cân bằng một số điều chỉnh thủ công - hãy đi tìm lỗi thật",
    ],
    practicePrompt: {
      question:
        "Mô hình của bạn cho bảng cân đối lệch đúng 200 tỷ ở mọi năm dự phóng, con số lệch không đổi qua các kỳ. Nguyên nhân khả dĩ nhất là gì?",
      options: [
        "Một khoản mục bị nối sai từ kỳ đầu tiên",
        "Thuế suất bị nhập sai",
        "Doanh thu dự phóng quá cao",
        "Cần thêm một dòng điều chỉnh 200 tỷ để cân lại",
      ],
      correct: 0,
      explanation:
        "Lệch một con số KHÔNG ĐỔI qua mọi kỳ là dấu hiệu điển hình của lỗi tại kỳ gốc - thường do nhập thiếu một khoản mục trên bảng cân đối đầu kỳ, rồi lỗi đó được cộng dồn sang các kỳ sau. Nếu lệch tăng dần thì thường là lỗi ở một dòng chảy định kỳ. Tuyệt đối không thêm dòng điều chỉnh để 'ép cân' - đó là che lỗi chứ không phải sửa lỗi.",
    },
    summary: {
      keyIdea: "Ba báo cáo nối bằng ba mắt xích; bảng cân đối cân là bằng chứng nối đúng",
      formula: "Lợi nhuận giữ lại cuối kỳ = đầu kỳ + Lợi nhuận ròng − Cổ tức",
      commonMistake: "Thêm dòng 'plug' để ép bảng cân đối cân, che mất lỗi thật bên dưới.",
      action: "Tự trả lời câu hỏi phỏng vấn kinh điển: khấu hao tăng 10 thì ba báo cáo đổi thế nào?",
    },
    application: {
      title: "Tự kiểm tra bằng câu hỏi khấu hao",
      message:
        "Không cần mở Excel: lấy giấy bút, giả định khấu hao tăng 10 đồng với thuế suất 20%, và viết ra thay đổi trên cả ba báo cáo. Nếu hai vế bảng cân đối khớp, bạn đã nắm được cơ chế liên kết.",
      secondary: "Đây là bài kiểm tra được dùng nhiều nhất trong phỏng vấn phân tích tài chính.",
    },
    sections: [
      {
        type: "lead",
        text: "Mô hình 3 báo cáo là nơi kế toán trở nên sống động: bạn thấy rõ một quyết định kinh doanh chảy qua lợi nhuận, đọng lại trên bảng cân đối và cuối cùng biến thành tiền mặt - hoặc không.",
      },
      { type: "heading", text: "Ba mắt xích nối ba báo cáo" },
      {
        type: "list",
        items: [
          "**P&L → Bảng cân đối:** lợi nhuận ròng cộng vào lợi nhuận giữ lại (sau khi trừ cổ tức)",
          "**P&L → Lưu chuyển tiền tệ:** bắt đầu từ lợi nhuận ròng, cộng ngược các chi phí phi tiền mặt như khấu hao",
          "**Lưu chuyển tiền tệ → Bảng cân đối:** số dư tiền cuối kỳ trở thành dòng tiền mặt trên bảng cân đối",
        ],
      },
      {
        type: "formula",
        title: "Phép kiểm tra bắt buộc",
        equation: "Tổng tài sản = Nợ phải trả + Vốn chủ sở hữu",
        example: {
          title: "Ví dụ khấu hao tăng 10, thuế suất 20%",
          calculation:
            "P&L: chi phí +10 → LNTT −10 → thuế −2 → LN ròng −8  ||  CF: −8 (LN ròng) +10 (cộng lại khấu hao) = +2 tiền mặt  ||  BS: tiền +2, TSCĐ −10 → tổng tài sản −8; lợi nhuận giữ lại −8",
          result: "Hai vế đều giảm 8 - bảng cân đối vẫn cân",
          explanation:
            "Đây chính là câu hỏi phỏng vấn kinh điển. Trả lời trôi chảy được nghĩa là bạn đã nắm cơ chế liên kết, không chỉ học thuộc công thức.",
        },
      },
      {
        type: "callout",
        label: "Đừng bao giờ 'ép cân'",
        text: "Khi bảng cân đối lệch, cám dỗ lớn nhất là thêm một dòng điều chỉnh cho khớp. Đừng. Con số lệch chính là thông tin quý nhất bạn đang có: lệch cố định qua các kỳ thường là lỗi ở kỳ gốc; lệch tăng dần thường là lỗi ở một dòng chảy định kỳ.",
      },
      {
        type: "conceptTable",
        title: "Quy tắc dấu trong dòng tiền",
        concepts: [
          { vi: "Tài sản lưu động tăng", en: "Current asset increases", def: "Dòng tiền GIẢM - tiền bị đọng trong tồn kho hoặc khoản phải thu" },
          { vi: "Nợ phải trả tăng", en: "Current liability increases", def: "Dòng tiền TĂNG - đang chiếm dụng vốn nhà cung cấp" },
          { vi: "Chi phí phi tiền mặt", en: "Non-cash expense", def: "Cộng ngược lại vào dòng tiền hoạt động (khấu hao, phân bổ)" },
          { vi: "Dòng điều chỉnh ép cân", en: "Plug", def: "Dòng thêm vào để ép bảng cân đối khớp - dấu hiệu mô hình có lỗi chưa tìm ra" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảng cân đối cân không phải mục tiêu - nó là bằng chứng bạn đã nối đúng.",
          "Bài tiếp theo: các bảng hỗ trợ khiến mô hình chạy được thật.",
        ],
      },
    ],
  },

  {
    id: 1314,
    slug: "bang-ho-tro-khau-hao-von-luu-dong",
    title: "Mô hình TC, Bài 4: Bảng hỗ trợ - khấu hao và vốn lưu động",
    subtitle: "Hai bảng phụ quyết định độ tin cậy của dòng tiền",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Ba báo cáo chính không tự chạy được nếu thiếu các bảng hỗ trợ phía sau. Bảng khấu hao và bảng vốn lưu động là hai bảng quan trọng nhất - chúng biến các giả định vận hành thành con số cụ thể chảy vào cả P&L, bảng cân đối lẫn dòng tiền.",
    openingQuestion:
      "Bảng vốn lưu động trong mô hình thường được dự phóng dựa trên cơ sở nào?",
    openingOptions: [
      "Một tỷ lệ cố định trên tổng tài sản",
      "Số ngày luân chuyển: DIO, DSO, DPO gắn với doanh thu và giá vốn",
      "Bằng đúng số dư năm trước, giữ nguyên",
      "Theo tỷ lệ lạm phát hằng năm",
    ],
    correctOption: 1,
    explanation:
      "Vốn lưu động được dự phóng qua số ngày luân chuyển: tồn kho theo DIO (số ngày tồn kho, gắn với giá vốn), khoản phải thu theo DSO (số ngày thu tiền, gắn với doanh thu), khoản phải trả theo DPO (số ngày trả nhà cung cấp, gắn với giá vốn). Cách này giữ vốn lưu động tự động co giãn theo quy mô kinh doanh.",
    diagram: [
      { label: "Giả định số ngày (DIO/DSO/DPO)", arrow: true },
      { label: "→ Số dư vốn lưu động từng kỳ", arrow: true },
      { label: "→ Thay đổi vốn lưu động", arrow: true },
      { label: "→ Dòng tiền hoạt động" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Doanh nghiệp tăng trưởng nhanh",
      description:
        "Một công ty tăng doanh thu gấp đôi thường thấy tồn kho và khoản phải thu cũng tăng gần gấp đôi. Nếu mô hình giữ vốn lưu động cố định, dòng tiền dự phóng sẽ đẹp một cách phi thực tế. Đây là lý do nhiều doanh nghiệp tăng trưởng nhanh vẫn cạn tiền - hiện tượng 'growing broke' mà mô hình phải phản ánh được.",
    },
    quiz: [
      {
        question: "Bảng khấu hao trong mô hình có nhiệm vụ gì?",
        options: [
          "Chỉ tính thuế phải nộp",
          "Theo dõi nguyên giá tài sản, cộng CapEx mới, trừ khấu hao để ra giá trị còn lại cuối kỳ",
          "Tính lãi vay phải trả",
          "Dự phóng doanh thu từ tài sản",
        ],
        correct: 1,
        explanation:
          "Bảng khấu hao là sổ theo dõi tài sản cố định: số dư đầu kỳ + CapEx − khấu hao trong kỳ = số dư cuối kỳ, chảy thẳng vào bảng cân đối.",
      },
      {
        question: "DSO tăng từ 30 lên 60 ngày nghĩa là gì với dòng tiền?",
        options: [
          "Dòng tiền cải thiện vì bán được nhiều hơn",
          "Dòng tiền xấu đi vì tiền bị đọng ở khách hàng lâu gấp đôi",
          "Không ảnh hưởng vì doanh thu không đổi",
          "Chỉ ảnh hưởng đến lợi nhuận, không ảnh hưởng dòng tiền",
        ],
        correct: 1,
        explanation:
          "DSO dài hơn nghĩa là khách trả chậm hơn, khoản phải thu phình lên và tiền mặt bị giữ lại ngoài doanh nghiệp.",
      },
      {
        question: "CapEx trong mô hình nên được dự phóng thế nào?",
        options: [
          "Luôn bằng 0 để đơn giản hóa",
          "Gắn với nhu cầu tăng trưởng - thường theo tỷ lệ trên doanh thu, hoặc theo kế hoạch đầu tư cụ thể",
          "Bằng đúng khấu hao mỗi năm trong mọi trường hợp",
          "Bằng lợi nhuận ròng",
        ],
        correct: 1,
        explanation:
          "CapEx nên phản ánh nhu cầu thật: duy trì công suất hiện có cộng đầu tư mở rộng nếu mô hình dự phóng tăng trưởng sản lượng.",
      },
      {
        question:
          "Vì sao 'thay đổi' vốn lưu động mới là con số chảy vào dòng tiền, chứ không phải số dư?",
        options: [
          "Vì số dư đã nằm trên bảng cân đối rồi",
          "Vì dòng tiền đo dòng chảy trong kỳ, còn số dư là điểm dừng tại một thời điểm - chỉ phần chênh lệch giữa hai kỳ mới là tiền thực sự vào hoặc ra",
          "Vì số dư luôn bằng 0",
          "Vì quy định kế toán yêu cầu vậy",
        ],
        correct: 1,
        explanation:
          "Báo cáo lưu chuyển tiền tệ ghi nhận dòng chảy. Tồn kho 100 tỷ hai kỳ liên tiếp không tạo ra dòng tiền nào; chỉ khi nó tăng lên 130 tỷ thì 30 tỷ tiền mới bị đọng thêm.",
      },
    ],
    keyTakeaways: [
      "Bảng khấu hao: số dư đầu kỳ + CapEx − khấu hao = số dư cuối kỳ",
      "Vốn lưu động dự phóng theo số ngày luân chuyển DIO/DSO/DPO, tự co giãn theo quy mô",
      "Chỉ THAY ĐỔI vốn lưu động giữa hai kỳ mới chảy vào dòng tiền, không phải số dư",
      "Giữ vốn lưu động cố định khi doanh thu tăng mạnh sẽ cho dòng tiền dự phóng phi thực tế",
    ],
    practicePrompt: {
      question:
        "Doanh thu tăng từ 500 lên 750 tỷ. DSO giữ nguyên 60 ngày. Khoản phải thu thay đổi thế nào và tác động ra sao đến dòng tiền?",
      options: [
        "Không đổi vì DSO không đổi",
        "Tăng từ khoảng 82 lên 123 tỷ, làm dòng tiền giảm khoảng 41 tỷ",
        "Giảm vì bán hàng tốt hơn",
        "Tăng gấp đôi vì doanh thu tăng gấp rưỡi",
      ],
      correct: 1,
      explanation:
        "Khoản phải thu = doanh thu × DSO / 365. Trước: 500 × 60/365 ≈ 82 tỷ. Sau: 750 × 60/365 ≈ 123 tỷ. Tăng 41 tỷ, và tài sản lưu động tăng nghĩa là dòng tiền giảm tương ứng 41 tỷ. Dù hiệu quả thu tiền không hề xấu đi, tăng trưởng vẫn hút tiền ra khỏi doanh nghiệp.",
    },
    summary: {
      keyIdea: "Bảng hỗ trợ biến giả định vận hành thành con số chảy vào cả ba báo cáo",
      formula: "Khoản phải thu = Doanh thu × DSO / 365",
      commonMistake: "Giữ vốn lưu động cố định trong khi doanh thu tăng, làm dòng tiền dự phóng đẹp giả tạo.",
      action: "Tính DIO, DSO, DPO thực tế của một doanh nghiệp từ báo cáo tài chính gần nhất.",
    },
    application: {
      title: "Tính số ngày luân chuyển thực tế",
      message:
        "Lấy báo cáo của một công ty niêm yết, tính DIO = tồn kho × 365 / giá vốn, DSO = phải thu × 365 / doanh thu, DPO = phải trả × 365 / giá vốn. Đây chính là các giả định bạn sẽ dùng để dự phóng.",
      secondary: "So sánh với doanh nghiệp cùng ngành để biết con số nào là bất thường.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba báo cáo chính là phần ai cũng nhìn thấy, nhưng thứ khiến chúng chạy được là các bảng hỗ trợ phía sau. Hai bảng quan trọng nhất: khấu hao và vốn lưu động.",
      },
      { type: "heading", text: "Bảng khấu hao - sổ theo dõi tài sản cố định" },
      {
        type: "formula",
        title: "Cấu trúc cuộn chiếu (roll-forward)",
        equation: "TSCĐ cuối kỳ = TSCĐ đầu kỳ + CapEx − Khấu hao trong kỳ",
        example: {
          title: "Vì sao cấu trúc này quan trọng",
          calculation: "Khấu hao → P&L (chi phí) và CF (cộng ngược lại); CapEx → CF (dòng tiền đầu tư); Số dư cuối kỳ → Bảng cân đối",
          result: "Một bảng cấp số liệu cho cả ba báo cáo",
          explanation:
            "Đây là lý do bảng khấu hao phải dựng riêng thay vì nhét công thức rải rác - một nguồn duy nhất nuôi ba nơi.",
        },
      },
      { type: "heading", text: "Bảng vốn lưu động - nơi tăng trưởng ăn tiền" },
      {
        type: "paragraph",
        text: "Vốn lưu động được dự phóng qua số ngày luân chuyển chứ không phải số tuyệt đối, để nó tự co giãn theo quy mô kinh doanh. **Khoản phải thu = Doanh thu × DSO / 365**; **Tồn kho = Giá vốn × DIO / 365**; **Khoản phải trả = Giá vốn × DPO / 365**.",
      },
      {
        type: "callout",
        label: "Tăng trưởng luôn hút tiền",
        text: "Ngay cả khi hiệu quả vận hành không đổi, doanh thu tăng sẽ kéo tồn kho và khoản phải thu tăng theo, hút tiền ra khỏi doanh nghiệp. Mô hình giữ vốn lưu động cố định sẽ che mất rủi ro này - đúng thứ rủi ro đã khiến nhiều doanh nghiệp tăng trưởng nhanh phá sản.",
      },
      {
        type: "heading",
        text: "Tăng trưởng ăn tiền như thế nào, tính bằng số",
      },
      {
        type: "paragraph",
        text: "Doanh thu 1.000 tỷ, giá vốn 700 tỷ. Số ngày: phải thu 60, tồn kho 45, phải trả 30. Vốn lưu động = 1.000×60/365 + 700×45/365 − 700×30/365 = 164 + 86 − 58 ≈ 193 tỷ. Sang năm doanh thu tăng 30% lên 1.300 tỷ, giá vốn tăng cùng nhịp lên 910 tỷ, số ngày giữ nguyên: 214 + 112 − 75 ≈ 251 tỷ. Chênh 58 tỷ - đó là tiền doanh nghiệp phải bỏ ra chỉ để nuôi phần tăng trưởng, trước khi nói tới bất kỳ khoản đầu tư tài sản cố định nào.",
      },
      {
        type: "callout",
        label: "Vì sao doanh nghiệp có lãi vẫn chết vì tiền",
        text: "Nếu lợi nhuận sau thuế của năm tăng trưởng đó là 50 tỷ mà vốn lưu động ngốn 58 tỷ, dòng tiền hoạt động đã âm dù báo cáo kết quả kinh doanh rất đẹp. Càng tăng nhanh càng hút mạnh, và đó là lý do một doanh nghiệp đang lớn nhanh có thể phá sản trong khi vẫn có lãi từng quý. Mô hình dự phóng vốn lưu động bằng một con số cố định sẽ không bao giờ cho thấy điều này - nó chỉ hiện ra khi vốn lưu động được buộc vào doanh thu qua số ngày luân chuyển.",
      },
      {
        type: "closing",
        lines: [
          "Bảng hỗ trợ là nơi giả định vận hành biến thành tiền thật.",
          "Bài tiếp theo: nợ vay, lãi vay và vòng lặp khiến Excel báo lỗi.",
        ],
      },
    ],
  },

  {
    id: 1315,
    slug: "no-vay-lai-vay-vong-lap-circularity",
    title: "Mô hình TC, Bài 5: Nợ vay, lãi vay và vòng lặp trong mô hình",
    subtitle: "Vì sao lãi vay tạo ra circular reference và cách xử lý",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "🔄",
    track: "professional",
    whyItMatters:
      "Vòng lặp lãi vay là vấn đề kỹ thuật kinh điển mà mọi người dựng mô hình đều gặp. Hiểu vì sao nó xuất hiện và các cách xử lý là dấu hiệu rõ ràng phân biệt người đã thực sự dựng mô hình với người chỉ đọc lý thuyết.",
    openingQuestion:
      "Vì sao tính lãi vay trên số dư nợ bình quân lại tạo ra vòng lặp (circular reference)?",
    openingOptions: [
      "Vì Excel không xử lý được phép chia",
      "Vì lãi vay ảnh hưởng lợi nhuận → ảnh hưởng tiền mặt → ảnh hưởng số dư nợ cuối kỳ → lại ảnh hưởng ngược về chính lãi vay",
      "Vì số dư nợ luôn âm",
      "Vì lãi suất thay đổi theo thời gian",
    ],
    correctOption: 1,
    explanation:
      "Chuỗi phụ thuộc khép vòng: lãi vay tính trên số dư nợ bình quân → lãi vay làm giảm lợi nhuận ròng → lợi nhuận ròng ảnh hưởng dòng tiền → dòng tiền quyết định phải vay thêm hay trả bớt nợ → thay đổi số dư nợ cuối kỳ → thay đổi số dư bình quân → thay đổi lãi vay. Excel phát hiện ô phụ thuộc vào chính nó và báo lỗi circular reference.",
    diagram: [
      { label: "Lãi vay", arrow: true },
      { label: "→ Lợi nhuận ròng → Dòng tiền", arrow: true },
      { label: "→ Số dư nợ cuối kỳ", arrow: true },
      { label: "→ quay lại Lãi vay (vòng lặp)" },
    ],
    realWorldExample: {
      company: "Mô hình có revolver",
      description:
        "Trong các mô hình có hạn mức tín dụng tuần hoàn (revolver), vòng lặp gần như không tránh khỏi: doanh nghiệp rút thêm hạn mức khi thiếu tiền và trả bớt khi dư tiền, mà chính lãi vay lại là một phần của nhu cầu tiền đó. Đây là lý do nhiều mô hình chuyên nghiệp phải bật chế độ tính lặp hoặc thiết kế công tắc ngắt vòng lặp.",
    },
    quiz: [
      {
        question: "Cách xử lý vòng lặp đơn giản và an toàn nhất là gì?",
        options: [
          "Xóa hết công thức lãi vay",
          "Tính lãi vay trên số dư nợ ĐẦU KỲ thay vì bình quân - vòng lặp biến mất hoàn toàn",
          "Nhập tay lãi vay mỗi năm",
          "Tăng số vòng lặp tối đa lên 1000",
        ],
        correct: 1,
        explanation:
          "Dùng số dư đầu kỳ cắt đứt chuỗi phụ thuộc vì số dư đầu kỳ đã biết trước, không phụ thuộc kết quả trong kỳ. Đây là đánh đổi độ chính xác nhỏ để lấy sự ổn định lớn.",
      },
      {
        question: "Bật 'iterative calculation' trong Excel làm gì?",
        options: [
          "Xóa vòng lặp khỏi mô hình",
          "Cho phép Excel tính lặp nhiều lần đến khi kết quả hội tụ, thay vì báo lỗi",
          "Tăng tốc độ tính toán",
          "Tự động sửa công thức sai",
        ],
        correct: 1,
        explanation:
          "Excel sẽ lặp lại phép tính đến khi chênh lệch giữa hai vòng nhỏ hơn ngưỡng đặt trước. Nó giải được vòng lặp nhưng làm mô hình dễ vỡ và khó gỡ lỗi hơn.",
      },
      {
        question: "Rủi ro khi để mô hình chạy với iterative calculation là gì?",
        options: [
          "Không có rủi ro nào",
          "Mô hình có thể không hội tụ, cho kết quả khác nhau mỗi lần tính, và một lỗi nhỏ có thể lan ra toàn bộ mô hình dưới dạng #VALUE",
          "File bị khóa không sửa được",
          "Excel tự động đổi công thức",
        ],
        correct: 1,
        explanation:
          "Vòng lặp làm lỗi lan rộng và khó truy vết. Nhiều tổ chức cấm dùng iterative calculation và yêu cầu thiết kế mô hình không có vòng lặp.",
      },
      {
        question: "Vai trò của revolver trong mô hình là gì?",
        options: [
          "Ghi nhận vốn góp của cổ đông",
          "Đóng vai trò van điều tiết: tự động rút thêm khi tiền mặt xuống dưới mức tối thiểu, tự động trả bớt khi dư tiền",
          "Tính khấu hao tài sản",
          "Dự phóng doanh thu",
        ],
        correct: 1,
        explanation:
          "Revolver giữ số dư tiền mặt không bao giờ xuống dưới ngưỡng an toàn, phản ánh cách doanh nghiệp thực sự quản lý thanh khoản ngắn hạn.",
      },
    ],
    keyTakeaways: [
      "Vòng lặp sinh ra khi lãi vay tính trên số dư bình quân, vì lãi vay ảnh hưởng ngược lại chính số dư đó",
      "Cách xử lý an toàn nhất: tính lãi trên số dư ĐẦU KỲ, cắt đứt chuỗi phụ thuộc",
      "Iterative calculation giải được vòng lặp nhưng làm mô hình dễ vỡ và khó gỡ lỗi",
      "Revolver là van điều tiết giữ tiền mặt không xuống dưới mức tối thiểu",
    ],
    practicePrompt: {
      question:
        "Mô hình của bạn báo lỗi circular reference sau khi thêm dòng lãi vay. Bạn đang trình bày với ban lãnh đạo trong 30 phút nữa. Hướng xử lý hợp lý nhất là gì?",
      options: [
        "Bật iterative calculation và hy vọng mô hình hội tụ kịp",
        "Tính lãi vay trên số dư nợ đầu kỳ để bỏ vòng lặp",
        "Xóa dòng lãi vay để mô hình chạy được",
        "Nhập tay số lãi vay ước lượng cho từng năm",
      ],
      correct: 1,
      explanation:
        "Chuyển sang số dư đầu kỳ là giải pháp sạch, tức thì và minh bạch: mô hình hết vòng lặp, kết quả ổn định, và sai số so với cách tính bình quân thường không đáng kể ở cấp độ ra quyết định. Quan trọng là ghi chú rõ lựa chọn này trong phần giả định. Xóa lãi vay hay nhập tay đều là che vấn đề, còn bật iterative ngay trước buổi họp là rủi ro không cần thiết.",
    },
    summary: {
      keyIdea: "Lãi vay tạo vòng lặp vì nó vừa là kết quả vừa là đầu vào của số dư nợ",
      commonMistake: "Bật iterative calculation mà không hiểu rủi ro, khiến mô hình cho kết quả không ổn định.",
      action: "Thử dựng một mô hình nợ đơn giản và cố ý tạo ra vòng lặp để thấy Excel phản ứng thế nào.",
    },
    application: {
      title: "Thử nghiệm với vòng lặp",
      message:
        "Dựng bảng nợ 3 năm với lãi tính trên số dư bình quân, xem Excel báo lỗi. Sau đó đổi sang số dư đầu kỳ và so sánh kết quả hai cách để tự đánh giá mức sai lệch.",
      secondary: "Biết mức sai lệch thực tế giúp bạn tự tin bảo vệ lựa chọn thiết kế của mình.",
    },
    sections: [
      {
        type: "lead",
        text: "Circular reference là lỗi khiến người mới dựng mô hình bối rối nhất, vì mô hình đang chạy tốt bỗng nhiên báo lỗi ngay khi thêm một dòng tưởng chừng vô hại: lãi vay.",
      },
      { type: "heading", text: "Vòng lặp hình thành thế nào" },
      {
        type: "list",
        items: [
          "Lãi vay được tính trên số dư nợ bình quân trong kỳ",
          "Lãi vay là chi phí, làm giảm lợi nhuận ròng",
          "Lợi nhuận ròng ảnh hưởng dòng tiền hoạt động",
          "Dòng tiền quyết định doanh nghiệp phải vay thêm hay trả bớt nợ",
          "Số dư nợ cuối kỳ thay đổi → số dư bình quân thay đổi → quay lại bước 1",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lãi trên số dư bình quân",
          text: "Chính xác hơn về mặt tài chính, nhưng tạo vòng lặp và cần iterative calculation.",
        },
        right: {
          label: "Lãi trên số dư đầu kỳ",
          text: "Sai số nhỏ, nhưng cắt đứt vòng lặp hoàn toàn. Là lựa chọn mặc định của nhiều tổ chức vì tính ổn định.",
        },
      },
      {
        type: "callout",
        label: "Đánh đổi cần cân nhắc",
        text: "Sự chính xác thêm được từ cách tính bình quân thường rất nhỏ so với sai số vốn có của các giả định doanh thu. Đổi một chút chính xác lấy sự ổn định và khả năng gỡ lỗi thường là lựa chọn đúng - miễn là bạn ghi chú rõ ràng.",
      },
      {
        type: "heading",
        text: "Sai số thực tế nhỏ tới mức nào",
      },
      {
        type: "paragraph",
        text: "Nợ đầu kỳ 100 tỷ, trong năm vay thêm 20 tỷ, lãi suất 10%. Tính trên số dư đầu kỳ: lãi = 10 tỷ. Tính trên số dư bình quân (100 + 120)/2 = 110: lãi = 11 tỷ. Chênh 1 tỷ trên một doanh nghiệp có lợi nhuận trước thuế vài trăm tỷ - dưới mức nhiễu của chính giả định doanh thu, vốn thường sai vài phần trăm. Đó là toàn bộ cái giá của việc cắt vòng lặp. Đổi lại, mô hình luôn cho ra cùng một kết quả với cùng một bộ giả định, và ai mở file cũng lần được từ ô này sang ô kia mà không rơi vào đường tròn.",
      },
      {
        type: "conceptTable",
        title: "Ba cách xử lý, và cái giá của từng cách",
        subtitle: "Xếp theo mức độ an toàn khi mô hình được người khác dùng lại",
        concepts: [
          {
            vi: "Chuyển sang số dư đầu kỳ",
            en: "Beginning balance",
            def: "Cắt đứt vòng lặp ở gốc. Sai số dưới mức nhiễu của giả định. Lựa chọn mặc định của phần lớn ngân hàng đầu tư, và là cách duy nhất còn kiểm toán được bằng mắt.",
          },
          {
            vi: "Bật tính lặp",
            en: "Iterative calculation",
            def: "Excel giải xấp xỉ bằng cách chạy lại nhiều vòng cho tới khi hai lần liên tiếp chênh nhau dưới ngưỡng. Giữ được cách tính bình quân, nhưng kết quả phụ thuộc giá trị khởi đầu, và một ô lỗi ở bất kỳ đâu sẽ làm cả mô hình đứng lại ở số cũ mà không báo gì.",
          },
          {
            vi: "Công tắc ngắt mạch",
            en: "Circuit breaker",
            def: "Một ô bật/tắt ép lãi vay về 0 để phá vòng lặp khi cần gỡ lỗi, rồi bật lại. Dùng kèm tính lặp; không thay thế được nó.",
          },
        ],
      },
      {
        type: "callout",
        label: "Vì sao bật tính lặp ngay trước buổi họp là rủi ro",
        text: "Tính lặp hội tụ tới một nghiệm gần đúng, không phải nghiệm duy nhất - đổi thứ tự tính hoặc mở file trên máy khác có ngưỡng khác là con số nhúc nhích. Tệ hơn: khi trong mô hình xuất hiện một lỗi #REF! hay #DIV/0!, Excel ngừng lặp và giữ nguyên kết quả của vòng trước, nên bảng vẫn hiện số đẹp trong khi nó đã ngừng phản ánh giả định hiện tại. Không có cảnh báo nào cho việc đó. Nếu buộc phải dùng, hãy đặt một ô kiểm tra so hai vế của bảng cân đối và tô đỏ khi lệch.",
      },
      {
        type: "closing",
        lines: [
          "Vòng lặp không phải lỗi Excel - nó phản ánh một quan hệ nhân quả có thật trong tài chính.",
          "Bài tiếp theo: đưa mô hình vào định giá DCF.",
        ],
      },
    ],
  },

  {
    id: 1316,
    slug: "dcf-trong-mo-hinh-fcf-wacc-terminal-value",
    title: "Mô hình TC, Bài 6: DCF trong mô hình - FCF, WACC và giá trị cuối",
    subtitle: "Biến dự phóng thành một con số định giá",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "💰",
    track: "professional",
    whyItMatters:
      "DCF là nơi toàn bộ mô hình hội tụ thành một con số duy nhất: giá trị doanh nghiệp. Đây cũng là nơi các giả định nhỏ tạo ra khác biệt khổng lồ - hiểu chỗ nào nhạy cảm nhất giúp bạn biết nên tranh luận về điều gì.",
    openingQuestion:
      "Trong một mô hình DCF điển hình 5 năm, phần nào thường chiếm tỷ trọng lớn nhất trong tổng giá trị?",
    openingOptions: [
      "Dòng tiền năm thứ nhất",
      "Tổng dòng tiền 5 năm dự phóng",
      "Giá trị cuối, thường chiếm 60-80% tổng",
      "Giá trị tài sản cố định trên bảng cân đối",
    ],
    correctOption: 2,
    explanation:
      "Giá trị cuối đại diện cho toàn bộ dòng tiền từ năm 6 đến vô hạn, nên thường chiếm 60-80% tổng giá trị doanh nghiệp trong DCF 5 năm. Đây là nghịch lý của DCF: phần bạn dự phóng chi tiết nhất lại đóng góp ít nhất, còn phần dựa trên một giả định tăng trưởng dài hạn duy nhất lại chi phối kết quả.",
    diagram: [
      { label: "FCF từng năm dự phóng", arrow: true },
      { label: "+ Giá trị cuối (terminal value)", arrow: true },
      { label: "Chiết khấu về hiện tại theo WACC", arrow: true },
      { label: "= Giá trị doanh nghiệp (EV)" },
    ],
    interactiveType: "interest-rate",
    realWorldExample: {
      company: "Độ nhạy của giả định tăng trưởng dài hạn",
      description:
        "Với WACC 10% và tăng trưởng dài hạn g = 2%, hệ số nhân giá trị cuối là 1/(0,10−0,02) = 12,5 lần. Chỉ cần nâng g lên 3%, hệ số thành 1/(0,10−0,03) = 14,3 lần - tăng hơn 14% giá trị cuối chỉ từ một thay đổi 1 điểm phần trăm. Đây là lý do mọi bản DCF nghiêm túc đều đi kèm bảng độ nhạy theo WACC và g.",
    },
    quiz: [
      {
        question: "Free Cash Flow to Firm (FCFF) được tính thế nào?",
        options: [
          "Lợi nhuận ròng + khấu hao",
          "EBIT × (1 − thuế suất) + khấu hao − CapEx − thay đổi vốn lưu động",
          "Doanh thu − chi phí hoạt động",
          "Dòng tiền hoạt động − cổ tức",
        ],
        correct: 1,
        explanation:
          "FCFF là dòng tiền còn lại cho cả chủ nợ và cổ đông, nên bắt đầu từ EBIT sau thuế (chưa trừ lãi vay), cộng lại khấu hao phi tiền mặt, trừ CapEx và trừ phần vốn bị đọng vào vốn lưu động.",
      },
      {
        question: "WACC đại diện cho điều gì?",
        options: [
          "Tỷ suất lợi nhuận mục tiêu của ban lãnh đạo",
          "Chi phí vốn bình quân gia quyền của cả nợ và vốn chủ sở hữu - tức tỷ suất sinh lời tối thiểu doanh nghiệp phải tạo ra",
          "Lãi suất ngân hàng hiện hành",
          "Tỷ lệ tăng trưởng dài hạn",
        ],
        correct: 1,
        explanation:
          "WACC kết hợp chi phí nợ sau thuế và chi phí vốn chủ theo tỷ trọng cơ cấu vốn. Nó là mức sinh lời tối thiểu để không phá hủy giá trị.",
      },
      {
        question:
          "Giả định tăng trưởng dài hạn g phải thỏa mãn điều kiện gì?",
        options: [
          "Càng cao càng tốt để phản ánh tiềm năng",
          "Phải nhỏ hơn WACC, và hợp lý là không vượt tốc độ tăng trưởng dài hạn của nền kinh tế",
          "Bằng đúng tốc độ tăng trưởng năm cuối dự phóng",
          "Luôn bằng 0",
        ],
        correct: 1,
        explanation:
          "Nếu g ≥ WACC thì công thức cho kết quả âm hoặc vô hạn - vô nghĩa về mặt toán học. Về mặt kinh tế, một doanh nghiệp không thể tăng trưởng vĩnh viễn nhanh hơn nền kinh tế, vì như vậy nó sẽ lớn hơn cả nền kinh tế.",
      },
      {
        question: "Đi từ Enterprise Value sang Equity Value thế nào?",
        options: [
          "EV + tiền mặt − nợ vay",
          "EV − nợ vay + tiền mặt",
          "EV × (1 − thuế suất)",
          "EV + vốn lưu động",
        ],
        correct: 1,
        explanation:
          "Enterprise Value là giá trị cho toàn bộ nhà cung cấp vốn. Trừ nợ vay (phần của chủ nợ) và cộng tiền mặt dư thừa sẽ ra phần thuộc về cổ đông.",
      },
    ],
    keyTakeaways: [
      "FCFF = EBIT×(1−t) + Khấu hao − CapEx − Δ Vốn lưu động",
      "Giá trị cuối thường chiếm 60-80% tổng giá trị trong DCF 5 năm",
      "g bắt buộc phải nhỏ hơn WACC, và nên ≤ tăng trưởng dài hạn của nền kinh tế",
      "Equity Value = Enterprise Value − Nợ vay + Tiền mặt",
    ],
    practicePrompt: {
      question:
        "FCF năm cuối dự phóng là 100 tỷ, WACC 10%, tăng trưởng dài hạn 2%. Giá trị cuối theo mô hình Gordon là bao nhiêu?",
      options: [
        "1.000 tỷ đồng",
        "1.275 tỷ đồng",
        "1.250 tỷ đồng",
        "5.000 tỷ đồng",
      ],
      correct: 1,
      explanation:
        "Công thức Gordon: TV = FCF năm cuối × (1 + g) / (WACC − g) = 100 × 1,02 / (0,10 − 0,02) = 102 / 0,08 = 1.275 tỷ đồng. Lưu ý phải nhân (1+g) vì công thức chiết khấu dòng tiền của năm TIẾP THEO, không phải năm cuối. Bỏ quên bước này là lỗi rất phổ biến và làm giá trị thấp đi 2%.",
    },
    summary: {
      keyIdea: "DCF = hiện giá của FCF dự phóng cộng hiện giá của giá trị cuối",
      formula: "TV = FCF_cuối × (1+g) / (WACC − g)",
      commonMistake: "Quên nhân (1+g) trong công thức Gordon, hoặc đặt g quá cao khiến giá trị bị thổi phồng.",
      action: "Tính thử tổng giá trị với g = 2% và g = 3% để tự thấy mức độ nhạy cảm.",
    },
    application: {
      title: "Kiểm tra tỷ trọng giá trị cuối",
      message:
        "Trong bất kỳ mô hình DCF nào bạn gặp, hãy tính xem giá trị cuối chiếm bao nhiêu phần trăm tổng giá trị. Nếu vượt 85%, mô hình đang phụ thuộc gần như hoàn toàn vào một giả định duy nhất.",
      secondary: "Khi đó, tranh luận về dự phóng 5 năm gần như vô nghĩa - hãy tranh luận về g và WACC.",
    },
    sections: [
      {
        type: "lead",
        text: "DCF là nơi mọi dòng của mô hình hội tụ về một con số. Nhưng cũng chính ở đây, một thay đổi nhỏ trong giả định có thể làm giá trị doanh nghiệp nhảy hàng chục phần trăm.",
      },
      { type: "heading", text: "Ba bước của một DCF" },
      {
        type: "formula",
        title: "Từ dự phóng đến giá trị",
        equation: "EV = Σ [FCF_t / (1+WACC)^t] + TV / (1+WACC)^n",
        variables: [
          { symbol: "FCF", name: "Dòng tiền tự do", description: "EBIT×(1−t) + Khấu hao − CapEx − Δ Vốn lưu động" },
          { symbol: "WACC", name: "Chi phí vốn bình quân", description: "Tỷ suất chiết khấu, phản ánh rủi ro của doanh nghiệp" },
          { symbol: "TV", name: "Giá trị cuối", description: "FCF_cuối × (1+g) / (WACC − g)" },
        ],
        example: {
          title: "Giá trị cuối với FCF 100 tỷ, WACC 10%, g 2%",
          calculation: "TV = 100 × 1,02 / (0,10 − 0,02) = 102 / 0,08",
          result: "1.275 tỷ đồng",
          explanation:
            "Con số này còn phải chiết khấu tiếp về hiện tại theo (1+WACC)^n trước khi cộng vào tổng giá trị.",
        },
      },
      {
        type: "callout",
        label: "Nghịch lý của DCF",
        text: "Bạn bỏ nhiều công sức nhất để dự phóng 5 năm chi tiết, nhưng phần đó thường chỉ đóng góp 20-40% giá trị. Phần còn lại đến từ giá trị cuối - vốn chỉ dựa trên hai con số: g và WACC. Vì vậy bảng độ nhạy theo hai biến này quan trọng hơn việc tinh chỉnh dự phóng từng năm.",
      },
      {
        type: "conceptTable",
        title: "Thuật ngữ định giá DCF",
        concepts: [
          { vi: "Dòng tiền tự do cho doanh nghiệp", en: "FCFF", def: "Dòng tiền còn lại cho cả chủ nợ và cổ đông" },
          { vi: "Chi phí vốn bình quân", en: "WACC", def: "Tỷ suất sinh lời tối thiểu cần đạt, dùng làm tỷ lệ chiết khấu" },
          { vi: "Giá trị cuối", en: "Terminal value", def: "Hiện giá toàn bộ dòng tiền sau giai đoạn dự phóng chi tiết" },
          { vi: "Giá trị doanh nghiệp", en: "Enterprise Value", def: "Giá trị toàn bộ hoạt động kinh doanh, trước khi trừ nợ" },
        ],
      },
      {
        type: "closing",
        lines: [
          "DCF không cho bạn một con số đúng - nó cho bạn một khoảng giá trị gắn với các giả định rõ ràng.",
          "Bài tiếp theo: làm rõ khoảng đó bằng phân tích độ nhạy và kịch bản.",
        ],
      },
    ],
  },

  {
    id: 1317,
    slug: "phan-tich-do-nhay-va-kich-ban",
    title: "Mô hình TC, Bài 7: Phân tích độ nhạy và kịch bản",
    subtitle: "Từ một con số đơn lẻ đến một khoảng giá trị có ý nghĩa",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎚️",
    track: "professional",
    whyItMatters:
      "Một mô hình đưa ra đúng một con số luôn sai. Giá trị thật của mô hình là chỉ ra kết quả thay đổi thế nào khi giả định thay đổi - và giả định nào đáng để tranh luận nhất.",
    openingQuestion:
      "Khác biệt cốt lõi giữa phân tích độ nhạy (sensitivity) và phân tích kịch bản (scenario) là gì?",
    openingOptions: [
      "Không có khác biệt, hai tên gọi của cùng một việc",
      "Độ nhạy đổi một biến; kịch bản đổi nhiều biến",
      "Độ nhạy dùng cho doanh thu, kịch bản dùng cho chi phí",
      "Kịch bản chỉ áp dụng cho mô hình DCF",
    ],
    correctOption: 1,
    explanation:
      "Độ nhạy trả lời 'nếu WACC tăng 1% thì giá trị đổi bao nhiêu' - cô lập từng biến. Kịch bản trả lời 'nếu suy thoái xảy ra thì sao' - khi đó doanh thu giảm, biên lợi nhuận co lại và lãi suất tăng cùng lúc, vì chúng có quan hệ với nhau. Kịch bản phản ánh thực tế tốt hơn; độ nhạy chỉ ra biến nào quan trọng nhất.",
    diagram: [
      { label: "Mô hình cơ sở (base case)", arrow: true },
      { label: "Độ nhạy: đổi 1-2 biến", arrow: true },
      { label: "Kịch bản: đổi nhiều biến nhất quán", arrow: true },
      { label: "Khoảng giá trị để ra quyết định" },
    ],
    realWorldExample: {
      company: "Bảng độ nhạy trong báo cáo định giá",
      description:
        "Hầu hết báo cáo định giá của các công ty chứng khoán đều đính kèm một bảng hai chiều: WACC ở một trục, tăng trưởng dài hạn ở trục kia, và giá mục tiêu ở các ô giao. Người đọc nhờ đó tự đánh giá được kết quả nhạy đến mức nào với hai giả định khó xác định nhất, thay vì phải tin vào một con số duy nhất.",
    },
    quiz: [
      {
        question: "Mục đích chính của bảng độ nhạy hai chiều là gì?",
        options: [
          "Làm báo cáo trông chuyên nghiệp hơn",
          "Cho thấy kết quả thay đổi thế nào khi hai giả định quan trọng nhất biến động, giúp người đọc tự đánh giá rủi ro",
          "Tìm ra con số chính xác duy nhất",
          "Thay thế cho việc dự phóng chi tiết",
        ],
        correct: 1,
        explanation:
          "Bảng độ nhạy chuyển thông điệp từ 'giá trị là X' sang 'giá trị nằm trong khoảng này tùy giả định', trung thực hơn nhiều.",
      },
      {
        question: "Một bộ kịch bản tốt thường gồm những gì?",
        options: [
          "Chỉ kịch bản lạc quan để thuyết phục nhà đầu tư",
          "Base case (cơ sở), upside (thuận lợi) và downside (bất lợi), mỗi kịch bản có câu chuyện kinh tế nhất quán phía sau",
          "Càng nhiều kịch bản càng tốt, ít nhất 20 kịch bản",
          "Chỉ cần một kịch bản duy nhất nếu dự phóng đủ chính xác",
        ],
        correct: 1,
        explanation:
          "Ba kịch bản là chuẩn mực phổ biến. Điều quan trọng không phải số lượng mà là mỗi kịch bản phải nhất quán nội tại - các biến thay đổi cùng chiều với câu chuyện.",
      },
      {
        question:
          "Vì sao trong kịch bản suy thoái không nên chỉ giảm doanh thu mà giữ nguyên mọi thứ khác?",
        options: [
          "Vì như vậy tính toán phức tạp hơn",
          "Vì các biến có quan hệ với nhau: suy thoái thường kéo theo biên lợi nhuận giảm, khách trả chậm hơn và chi phí vốn tăng",
          "Vì doanh thu không bao giờ giảm trong thực tế",
          "Vì quy định kế toán không cho phép",
        ],
        correct: 1,
        explanation:
          "Kịch bản chỉ có ý nghĩa khi nội tại nhất quán. Giảm doanh thu mà giữ biên lợi nhuận và DSO như cũ là mô tả một tình huống không tồn tại trong thực tế.",
      },
      {
        question:
          "Nếu bảng độ nhạy cho thấy giá trị dao động từ 80 đến 400 tỷ, điều đó nói lên gì?",
        options: [
          "Mô hình sai và cần dựng lại",
          "Kết quả quá phụ thuộc vào giả định nên chưa đủ cơ sở ra quyết định lớn - cần thu hẹp bằng dữ liệu tốt hơn cho các biến nhạy nhất",
          "Nên lấy trung bình 240 tỷ làm kết quả",
          "Nên chọn con số 400 tỷ nếu là bên bán",
        ],
        correct: 1,
        explanation:
          "Khoảng dao động rộng là tín hiệu cảnh báo hữu ích: nó chỉ đúng chỗ cần đầu tư thêm công sức nghiên cứu, thay vì giả vờ rằng một con số nào đó là đáng tin.",
      },
    ],
    keyTakeaways: [
      "Độ nhạy cô lập 1-2 biến; kịch bản thay đổi nhiều biến theo một câu chuyện nhất quán",
      "Bảng độ nhạy hai chiều (WACC × g) là chuẩn mực trong báo cáo định giá",
      "Kịch bản phải nhất quán nội tại - không thể giảm doanh thu mà giữ nguyên biên lợi nhuận",
      "Khoảng giá trị quá rộng là tín hiệu cần thêm dữ liệu, không phải lý do lấy trung bình",
    ],
    practicePrompt: {
      question:
        "Bạn xây kịch bản downside cho một doanh nghiệp bán lẻ. Bộ giả định nào nhất quán nhất?",
      options: [
        "Doanh thu −20%, biên lợi nhuận giữ nguyên, DSO giữ nguyên, WACC giữ nguyên",
        "Doanh thu −20%, biên lợi nhuận giảm, DSO dài hơn, WACC cao hơn",
        "Doanh thu −20%, biên lợi nhuận tăng do cắt giảm chi phí, mọi thứ khác tốt hơn",
        "Chỉ giảm giá trị cuối, giữ nguyên toàn bộ dự phóng 5 năm",
      ],
      correct: 1,
      explanation:
        "Kịch bản bất lợi thực tế có các biến xấu đi cùng nhau: doanh thu giảm nhưng chi phí cố định không giảm tương ứng nên biên lợi nhuận co lại; khách hàng gặp khó nên trả chậm hơn làm DSO dài ra; rủi ro tăng nên nhà đầu tư đòi tỷ suất cao hơn, đẩy WACC lên. Phương án A bỏ qua các mối liên hệ này nên mô tả một tình huống không thực tế.",
    },
    summary: {
      keyIdea: "Mô hình tốt cho một khoảng giá trị kèm điều kiện, không phải một con số",
      commonMistake: "Xây kịch bản bằng cách chỉ đổi một biến, tạo ra tình huống không nhất quán về mặt kinh tế.",
      action: "Thêm bảng độ nhạy hai chiều vào mô hình gần nhất bạn dựng.",
    },
    application: {
      title: "Xác định biến nhạy nhất",
      message:
        "Lần lượt thay đổi từng giả định chính ±10% và ghi lại mức thay đổi của kết quả. Biến nào làm kết quả đổi mạnh nhất chính là biến bạn cần dành nhiều thời gian nghiên cứu nhất.",
      secondary: "Thường thì đó là tăng trưởng dài hạn, WACC và biên lợi nhuận - không phải các chi tiết nhỏ.",
    },
    sections: [
      {
        type: "lead",
        text: "Một mô hình đưa ra chính xác một con số luôn tạo cảm giác tin cậy giả tạo. Giá trị thật của mô hình nằm ở chỗ nó cho thấy kết quả phụ thuộc vào điều gì và nhạy đến mức nào.",
      },
      { type: "heading", text: "Hai công cụ, hai câu hỏi khác nhau" },
      {
        type: "comparison",
        left: {
          label: "Phân tích độ nhạy",
          text: "'Nếu WACC tăng 1 điểm phần trăm thì giá trị đổi bao nhiêu?' Cô lập từng biến để tìm ra biến nào quan trọng nhất.",
        },
        right: {
          label: "Phân tích kịch bản",
          text: "'Nếu suy thoái xảy ra thì sao?' Thay đổi nhiều biến cùng lúc theo một câu chuyện kinh tế nhất quán.",
        },
      },
      { type: "heading", text: "Nguyên tắc nhất quán nội tại" },
      {
        type: "paragraph",
        text: "Sai lầm phổ biến nhất khi xây kịch bản là chỉ đổi một biến. Trong thực tế các biến liên đới với nhau: khi doanh thu giảm mạnh, chi phí cố định không giảm theo tỷ lệ nên biên lợi nhuận co lại; khách hàng khó khăn nên trả chậm hơn; rủi ro cảm nhận tăng nên chi phí vốn tăng. Kịch bản chỉ đáng tin khi phản ánh được các mối liên hệ này.",
      },
      {
        type: "callout",
        label: "Khoảng rộng là thông tin, không phải thất bại",
        text: "Nếu bảng độ nhạy cho khoảng giá trị rất rộng, đó không phải dấu hiệu mô hình tệ - đó là dấu hiệu bài toán vốn dĩ bất định. Phản ứng đúng là đầu tư nghiên cứu vào các biến nhạy nhất, không phải lấy trung bình rồi giả vờ đã chắc chắn.",
      },
      {
        type: "heading",
        text: "Chọn hai biến nào cho bảng độ nhạy",
      },
      {
        type: "paragraph",
        text: "Bảng độ nhạy hai chiều chỉ có hai trục, nên câu hỏi thật là chọn biến nào. Cách làm là chạy trước một lượt: đổi từng giả định một, mỗi lần ±10%, ghi lại giá trị định giá thay đổi bao nhiêu, rồi xếp theo biên độ - biểu đồ xếp hạng đó gọi là tornado vì các thanh dài nhất nằm trên cùng. Hai biến đứng đầu là hai trục của bảng. Kết quả gần như luôn giống nhau ở mô hình DCF: WACC và tốc độ tăng trưởng dài hạn, vì cả hai đều nằm trong mẫu số của giá trị cuối kỳ - vốn chiếm 70-80% tổng giá trị. Đặt biên lợi nhuận hay doanh thu năm 2 lên trục là lãng phí một bảng.",
      },
      {
        type: "callout",
        label: "Khoảng rộng không phải lỗi của mô hình",
        text: "WACC ±1% và g ±0,5% có thể cho khoảng định giá rộng gấp đôi từ đáy tới đỉnh. Phản ứng sai là siết dải lại cho đẹp báo cáo. Phản ứng đúng là nói thẳng: định giá doanh nghiệp này nhạy tới mức đó với hai giả định không ai biết chắc, nên con số điểm giữa không đáng tin hơn phần còn lại của dải. Một khoảng trung thực còn dùng để ra quyết định được; một con số giả vờ chính xác thì không.",
      },
      {
        type: "closing",
        lines: [
          "Trình bày một khoảng giá trị kèm điều kiện đáng tin hơn nhiều so với một con số không có ngữ cảnh.",
          "Bài tiếp theo: mô hình LBO - khi đòn bẩy trở thành trung tâm.",
        ],
      },
    ],
  },

  {
    id: 1318,
    slug: "mo-hinh-lbo-don-gian",
    title: "Mô hình TC, Bài 8: Mô hình LBO đơn giản",
    subtitle: "Vì sao đòn bẩy tạo ra lợi nhuận cho quỹ đầu tư",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "LBO là mô hình chuẩn của private equity và là bài kiểm tra thường gặp trong tuyển dụng ngân hàng đầu tư. Hiểu cơ chế của nó cũng là hiểu sâu hơn về vai trò của đòn bẩy và dòng tiền trong việc tạo ra lợi nhuận.",
    openingQuestion:
      "Trong một thương vụ LBO, ba nguồn tạo ra lợi nhuận chính cho quỹ đầu tư là gì?",
    openingOptions: [
      "Chỉ có việc bán lại với giá cao hơn",
      "Trả bớt nợ bằng dòng tiền, cải thiện lợi nhuận hoạt động, và chênh lệch hệ số định giá khi thoái vốn",
      "Chỉ có cắt giảm chi phí nhân sự",
      "Chỉ có việc phát hành thêm cổ phiếu",
    ],
    correctOption: 1,
    explanation:
      "Ba động lực: (1) Trả nợ - dòng tiền doanh nghiệp dùng trả bớt nợ, phần vốn chủ tăng lên tương ứng dù giá trị doanh nghiệp không đổi; (2) Cải thiện EBITDA - tăng doanh thu hoặc biên lợi nhuận; (3) Chênh lệch hệ số - mua ở bội số thấp, bán ở bội số cao. Nguồn thứ nhất là đặc trưng riêng của LBO.",
    diagram: [
      { label: "Mua bằng nợ + ít vốn chủ", arrow: true },
      { label: "Dòng tiền trả bớt nợ", arrow: true },
      { label: "Cải thiện EBITDA", arrow: true },
      { label: "Thoái vốn → IRR cho quỹ" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Cơ chế trả nợ tạo giá trị",
      description:
        "Giả sử quỹ mua doanh nghiệp giá 1.000 tỷ với 300 tỷ vốn chủ và 700 tỷ nợ. Sau 5 năm, doanh nghiệp dùng dòng tiền trả bớt 300 tỷ nợ, còn 400 tỷ. Nếu bán lại vẫn đúng giá 1.000 tỷ, phần vốn chủ giờ là 1.000 − 400 = 600 tỷ. Vốn chủ tăng gấp đôi từ 300 lên 600 tỷ dù giá trị doanh nghiệp hoàn toàn không đổi - đó là sức mạnh của việc trả nợ bằng dòng tiền.",
    },
    quiz: [
      {
        question: "Vì sao doanh nghiệp mục tiêu của LBO thường có dòng tiền ổn định?",
        options: [
          "Vì quy định pháp luật yêu cầu",
          "Vì phải trả được lãi và gốc của khối nợ lớn; dòng tiền biến động mạnh sẽ khiến doanh nghiệp mất khả năng thanh toán",
          "Vì dòng tiền ổn định luôn đi kèm tăng trưởng cao",
          "Vì ngân hàng chỉ cho vay doanh nghiệp mới thành lập",
        ],
        correct: 1,
        explanation:
          "Đòn bẩy cao đòi hỏi nghĩa vụ trả nợ đều đặn. Doanh nghiệp có dòng tiền thất thường rất dễ vi phạm điều kiện vay khi gặp kỳ kinh doanh xấu.",
      },
      {
        question: "IRR trong LBO đo lường điều gì?",
        options: [
          "Tổng lợi nhuận tuyệt đối của thương vụ",
          "Tỷ suất sinh lời nội bộ có tính đến yếu tố thời gian - cùng số tiền lãi, thoái vốn sớm cho IRR cao hơn",
          "Tỷ lệ nợ trên vốn chủ sở hữu",
          "Biên lợi nhuận gộp của doanh nghiệp",
        ],
        correct: 1,
        explanation:
          "IRR nhạy với thời gian. Nhân đôi vốn trong 3 năm cho IRR cao hơn nhiều so với nhân đôi trong 7 năm, dù bội số tiền nhận về giống nhau.",
      },
      {
        question: "Điều gì xảy ra khi doanh nghiệp LBO vi phạm điều kiện vay (covenant)?",
        options: [
          "Không có hậu quả gì đáng kể",
          "Chủ nợ có thể yêu cầu trả nợ trước hạn, đàm phán lại điều kiện hoặc trong trường hợp xấu là tiếp quản doanh nghiệp",
          "Lãi suất tự động giảm",
          "Quỹ đầu tư được bơm thêm vốn miễn phí",
        ],
        correct: 1,
        explanation:
          "Vi phạm covenant trao quyền cho chủ nợ. Đây là rủi ro lớn nhất của cấu trúc đòn bẩy cao và là lý do mô hình LBO luôn phải theo dõi các chỉ số ràng buộc theo từng kỳ.",
      },
      {
        question:
          "Nếu quỹ mua ở bội số 8x EBITDA và bán ở 8x sau 5 năm, lợi nhuận đến từ đâu?",
        options: [
          "Không có lợi nhuận vì bội số không đổi",
          "Từ việc trả bớt nợ bằng dòng tiền và từ phần EBITDA tăng thêm trong 5 năm",
          "Chỉ từ cổ tức nhận được",
          "Từ chênh lệch tỷ giá",
        ],
        correct: 1,
        explanation:
          "Ngay cả khi bội số không đổi, hai nguồn còn lại vẫn hoạt động: nợ giảm làm phần vốn chủ tăng, và EBITDA cao hơn nhân với cùng bội số cho giá trị doanh nghiệp lớn hơn.",
      },
    ],
    keyTakeaways: [
      "Ba nguồn lợi nhuận LBO: trả bớt nợ, cải thiện EBITDA, chênh lệch bội số khi thoái vốn",
      "Trả nợ bằng dòng tiền làm tăng phần vốn chủ ngay cả khi giá trị doanh nghiệp không đổi",
      "Mục tiêu LBO lý tưởng: dòng tiền ổn định, dự đoán được, CapEx thấp",
      "IRR nhạy với thời gian nắm giữ - thoái vốn sớm cho IRR cao hơn với cùng bội số tiền",
    ],
    practicePrompt: {
      question:
        "Quỹ mua doanh nghiệp 1.000 tỷ (300 vốn chủ, 700 nợ). Sau 5 năm trả được 300 tỷ nợ và bán lại đúng 1.000 tỷ. Bội số tiền quỹ nhận về là bao nhiêu?",
      options: [
        "1,0x - không lãi vì giá bán bằng giá mua",
        "2,0x - vốn chủ tăng từ 300 lên 600 tỷ",
        "3,3x",
        "0,5x - lỗ vì phải trả nợ",
      ],
      correct: 1,
      explanation:
        "Khi thoái vốn: giá trị doanh nghiệp 1.000 tỷ trừ nợ còn lại 400 tỷ = 600 tỷ thuộc về vốn chủ. So với 300 tỷ bỏ ra ban đầu, bội số = 600/300 = 2,0x. Toàn bộ lợi nhuận đến từ việc trả nợ, không cần giá bán tăng một đồng nào - đây chính là cơ chế cốt lõi của LBO.",
    },
    summary: {
      keyIdea: "LBO tạo lợi nhuận chủ yếu bằng cách dùng dòng tiền doanh nghiệp trả nợ, chuyển giá trị sang vốn chủ",
      commonMistake: "Nghĩ rằng LBO chỉ có lãi khi bán được giá cao hơn giá mua.",
      action: "Tự tính bội số vốn chủ cho một thương vụ giả định với các mức trả nợ khác nhau.",
    },
    application: {
      title: "Thử mô hình LBO tối giản",
      message:
        "Dựng bảng 5 năm: EBITDA, trừ lãi vay, trừ thuế, trừ CapEx và thay đổi vốn lưu động ra dòng tiền tự do; dùng dòng tiền đó trả nợ. Cuối kỳ tính giá trị doanh nghiệp theo bội số rồi trừ nợ còn lại.",
      secondary: "Chỉ cần 20 dòng là đủ nắm được cơ chế cốt lõi.",
    },
    sections: [
      {
        type: "lead",
        text: "LBO là thương vụ mua lại doanh nghiệp chủ yếu bằng vốn vay, với chính dòng tiền và tài sản của doanh nghiệp mục tiêu làm nguồn trả nợ. Cơ chế tạo lợi nhuận của nó khác hẳn đầu tư cổ phiếu thông thường.",
      },
      { type: "heading", text: "Ba nguồn tạo lợi nhuận" },
      {
        type: "list",
        items: [
          "**Trả bớt nợ:** dòng tiền doanh nghiệp dùng để giảm nợ; phần vốn chủ tăng tương ứng dù giá trị doanh nghiệp giữ nguyên",
          "**Cải thiện hoạt động:** tăng doanh thu hoặc biên lợi nhuận, làm EBITDA cao hơn khi thoái vốn",
          "**Chênh lệch bội số:** mua ở bội số thấp và bán ở bội số cao - nguồn khó kiểm soát nhất vì phụ thuộc thị trường",
        ],
      },
      {
        type: "formula",
        title: "Giá trị vốn chủ khi thoái vốn",
        equation: "Vốn chủ khi thoái = (EBITDA_cuối × Bội số) − Nợ còn lại",
        example: {
          title: "Mua 1.000 tỷ với 300 vốn chủ, trả được 300 tỷ nợ sau 5 năm",
          calculation: "Giá trị doanh nghiệp 1.000 tỷ − nợ còn lại 400 tỷ = 600 tỷ vốn chủ; so với 300 tỷ ban đầu",
          result: "Bội số vốn chủ = 2,0x",
          explanation:
            "Nhân đôi vốn mà giá bán không cao hơn giá mua một đồng nào. Toàn bộ đến từ việc chuyển giá trị từ chủ nợ sang chủ sở hữu qua việc trả nợ.",
        },
      },
      {
        type: "callout",
        label: "Đòn bẩy khuếch đại cả hai chiều",
        text: "Cùng cơ chế làm vốn chủ nhân đôi khi thuận lợi cũng có thể xóa sạch vốn chủ khi bất lợi. Nếu EBITDA giảm khiến doanh nghiệp không trả nổi lãi, quỹ có thể mất toàn bộ khoản đầu tư. Đây là lý do LBO chỉ phù hợp với doanh nghiệp có dòng tiền thực sự ổn định.",
      },
      {
        type: "closing",
        lines: [
          "LBO biến dòng tiền đều đặn thành lợi nhuận vốn chủ thông qua đòn bẩy.",
          "Bài tiếp theo: cách kiểm tra mô hình trước khi đưa cho người khác.",
        ],
      },
    ],
  },

  {
    id: 1319,
    slug: "kiem-tra-mo-hinh-va-bay-thuong-gap",
    title: "Mô hình TC, Bài 9: Kiểm tra mô hình và những cái bẫy thường gặp",
    subtitle: "Danh sách rà soát trước khi đưa mô hình cho người khác",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Một lỗi mô hình phát hiện muộn có thể dẫn đến quyết định đầu tư sai hàng trăm tỷ đồng. Quy trình kiểm tra có hệ thống là thứ phân biệt người làm nghề cẩn trọng với người chỉ ghép công thức cho ra số.",
    openingQuestion:
      "Cách kiểm tra tính hợp lý (sanity check) nhanh nhất cho một mô hình vừa dựng xong là gì?",
    openingOptions: [
      "Kiểm tra font chữ và định dạng có đẹp không",
      "So sánh dự phóng với lịch sử và ngành",
      "Đếm số công thức trong file",
      "Chạy lại file trên máy khác",
    ],
    correctOption: 1,
    explanation:
      "Sanity check tốt nhất là đối chiếu với thực tế: biên lợi nhuận dự phóng có nhất quán với lịch sử không, vòng quay vốn lưu động có hợp lý không, tăng trưởng có vượt quá mức mà ngành từng đạt được không. Mô hình có thể cân đối hoàn hảo về mặt kỹ thuật mà vẫn mô tả một doanh nghiệp không tồn tại.",
    diagram: [
      { label: "Kiểm tra kỹ thuật: BS cân, không lỗi", arrow: true },
      { label: "Kiểm tra logic: truy vết công thức", arrow: true },
      { label: "Kiểm tra thực tế: so lịch sử & ngành", arrow: true },
      { label: "Mô hình sẵn sàng bàn giao" },
    ],
    realWorldExample: {
      company: "Lỗi kéo công thức",
      description:
        "Một trong những lỗi tốn kém và phổ biến nhất là kéo công thức thiếu một cột hoặc thừa một hàng khi tính tổng. Mô hình vẫn chạy, vẫn ra số đẹp, bảng cân đối vẫn có thể cân nếu lỗi nằm ở phần không ảnh hưởng cân đối. Chỉ khi đối chiếu tổng với con số kiểm tra độc lập mới phát hiện ra.",
    },
    quiz: [
      {
        question: "Vì sao mô hình cân bảng cân đối vẫn có thể sai?",
        options: [
          "Không thể sai nếu đã cân",
          "Vì cân đối chỉ chứng minh các mắt xích kế toán nối đúng, không chứng minh các giả định kinh doanh hợp lý",
          "Vì Excel tính sai phép cộng",
          "Vì bảng cân đối không quan trọng",
        ],
        correct: 1,
        explanation:
          "Bảng cân đối cân là điều kiện cần chứ không đủ. Một mô hình dự phóng biên lợi nhuận 80% cho ngành bán lẻ vẫn có thể cân hoàn hảo mà hoàn toàn vô lý.",
      },
      {
        question: "Kiểm tra 'dòng tiền tự do âm kéo dài' cho biết điều gì?",
        options: [
          "Mô hình chắc chắn có lỗi kỹ thuật",
          "Doanh nghiệp cần huy động thêm vốn liên tục - mô hình phải phản ánh nguồn vốn đó, nếu không thì thiếu nhất quán",
          "Doanh nghiệp sắp phá sản trong mọi trường hợp",
          "Không cần quan tâm nếu lợi nhuận dương",
        ],
        correct: 1,
        explanation:
          "Dòng tiền âm kéo dài phải đi kèm giả định vay thêm hoặc phát hành cổ phần. Mô hình để tiền mặt âm mà không có nguồn tài trợ là mô tả một tình huống bất khả thi.",
      },
      {
        question: "Vì sao nên có ô kiểm tra (check cell) hiển thị rõ trong mô hình?",
        options: [
          "Để trang trí cho mô hình",
          "Để tự động báo động khi bảng cân đối lệch hoặc các điều kiện quan trọng bị vi phạm, thay vì phải rà thủ công",
          "Vì Excel yêu cầu bắt buộc",
          "Để tăng tốc độ tính toán",
        ],
        correct: 1,
        explanation:
          "Các ô kiểm tra hiển thị ngay lỗi phát sinh khi bạn thay đổi giả định. Không có chúng, một thay đổi nhỏ có thể phá vỡ mô hình mà không ai nhận ra.",
      },
      {
        question: "Bẫy nào sau đây khó phát hiện nhất?",
        options: [
          "Công thức trả về #REF! rõ ràng trên màn hình",
          "Công thức kéo lệch một cột nhưng vẫn cho ra con số trông hợp lý",
          "File không mở được",
          "Sheet bị đặt tên sai",
        ],
        correct: 1,
        explanation:
          "Lỗi báo rõ ràng dễ sửa. Nguy hiểm nhất là lỗi âm thầm cho ra con số trông bình thường - chúng có thể tồn tại qua nhiều vòng rà soát mà không ai để ý.",
      },
    ],
    keyTakeaways: [
      "Ba lớp kiểm tra: kỹ thuật (cân đối, không lỗi), logic (truy vết công thức), thực tế (so lịch sử và ngành)",
      "Bảng cân đối cân là điều kiện CẦN nhưng không ĐỦ để mô hình đúng",
      "Đặt các ô kiểm tra tự động báo động khi giả định thay đổi phá vỡ mô hình",
      "Lỗi nguy hiểm nhất là lỗi âm thầm cho ra con số trông hợp lý",
    ],
    practicePrompt: {
      question:
        "Mô hình dự phóng biên lợi nhuận gộp tăng từ 22% lên 38% trong 3 năm cho một doanh nghiệp bán lẻ, trong khi trung bình ngành là 20-25%. Phản ứng đúng là gì?",
      options: [
        "Chấp nhận vì mô hình đã cân đối và không báo lỗi",
        "Yêu cầu giải thích điều gì tạo ra mức cải thiện đó",
        "Tăng luôn lên 45% cho nhất quán với tăng trưởng doanh thu",
        "Bỏ qua vì biên lợi nhuận không ảnh hưởng định giá",
      ],
      correct: 1,
      explanation:
        "Nhảy 16 điểm phần trăm biên lợi nhuận và vượt xa toàn ngành là dấu hiệu cảnh báo rất mạnh. Mô hình vẫn chạy trơn tru vì Excel không biết ngành bán lẻ hoạt động thế nào. Đây chính là loại lỗi mà chỉ kiểm tra thực tế mới phát hiện được - và nếu không có lời giải thích thuyết phục, giả định phải được sửa.",
    },
    summary: {
      keyIdea: "Kiểm tra ba lớp: kỹ thuật, logic và thực tế - thiếu lớp nào cũng để lọt lỗi",
      commonMistake: "Chỉ kiểm tra bảng cân đối có cân không rồi coi như mô hình đã đúng.",
      action: "Thêm một khối ô kiểm tra tự động vào đầu mô hình của bạn.",
    },
    application: {
      title: "Xây khối kiểm tra tự động",
      message:
        "Đặt ở đầu mô hình một khối nhỏ gồm: chênh lệch bảng cân đối (phải bằng 0), tiền mặt tối thiểu (không được âm), và các chỉ số ràng buộc quan trọng. Cho hiển thị màu đỏ khi vi phạm.",
      secondary: "Khối này giúp bạn phát hiện lỗi ngay khi thay đổi giả định, thay vì lúc đang trình bày.",
    },
    sections: [
      {
        type: "lead",
        text: "Mô hình chạy được không có nghĩa là mô hình đúng. Excel sẽ vui vẻ tính toán một doanh nghiệp có biên lợi nhuận 90%, thị phần 150% hay dòng tiền âm vĩnh viễn mà không hề cảnh báo.",
      },
      { type: "heading", text: "Ba lớp kiểm tra" },
      {
        type: "list",
        items: [
          "**Kỹ thuật:** bảng cân đối cân ở mọi kỳ, không có ô lỗi #REF!/#DIV/0!, không có tham chiếu vòng ngoài ý muốn",
          "**Logic:** truy vết công thức của vài dòng quan trọng từ kết quả ngược về giả định gốc; kiểm tra không có số cứng bị chôn",
          "**Thực tế:** đối chiếu biên lợi nhuận, vòng quay vốn, tăng trưởng với lịch sử doanh nghiệp và mặt bằng ngành",
        ],
      },
      {
        type: "conceptTable",
        title: "Những cái bẫy thường gặp",
        concepts: [
          { vi: "Kéo công thức lệch", en: "Copy-paste offset", def: "Công thức thiếu hoặc thừa một cột/hàng nhưng vẫn ra số trông hợp lý" },
          { vi: "Số cứng bị chôn", en: "Buried hardcode", def: "Giả định nằm trong công thức, không ai thấy và không kiểm tra được" },
          { vi: "Dòng điều chỉnh ép cân", en: "Balancing plug", def: "Dòng thêm vào để ép bảng cân đối khớp, che mất lỗi thật" },
          { vi: "Tiền mặt âm", en: "Negative cash", def: "Mô hình để tiền mặt âm mà không có nguồn tài trợ - tình huống bất khả thi" },
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc bàn giao",
        text: "Trước khi gửi mô hình cho người khác, hãy tự hỏi: nếu người nhận thay đổi một giả định bất kỳ, mô hình có tự báo lỗi khi bị phá vỡ không? Nếu không, bạn chưa hoàn thành công việc.",
      },
      {
        type: "heading",
        text: "Năm phép thử tính hợp lý, có ngưỡng cụ thể",
      },
      {
        type: "conceptTable",
        title: "Excel không bao giờ báo những lỗi này - phải tự hỏi",
        subtitle: "Mỗi dòng là một câu hỏi có câu trả lời đúng/sai rõ ràng",
        concepts: [
          {
            vi: "Thị phần ngầm định",
            en: "Implied market share",
            def: "Lấy doanh thu dự phóng năm cuối chia quy mô thị trường. Vượt 100% là vô lý; vượt gấp đôi thị phần hiện tại mà không có lý do cụ thể cũng vậy.",
          },
          {
            vi: "Tăng trưởng vĩnh viễn",
            en: "Terminal growth",
            def: "Phải thấp hơn tăng trưởng GDP dài hạn. Cao hơn nghĩa là doanh nghiệp cuối cùng sẽ lớn hơn cả nền kinh tế - toán học không cấm, nhưng thực tế thì có.",
          },
          {
            vi: "Biên lợi nhuận so với ngành",
            en: "Margin vs peers",
            def: "Dự phóng biên vượt hẳn mọi doanh nghiệp cùng ngành thì phải trả lời được: nhờ cái gì, và vì sao đối thủ không làm được.",
          },
          {
            vi: "ROIC mãi mãi trên WACC",
            en: "Excess returns forever",
            def: "Cạnh tranh kéo ROIC về gần WACC theo thời gian. Mô hình cho ROIC 25% trên WACC 10% tới vô hạn là mô hình giả định không ai bước vào ngành này.",
          },
          {
            vi: "Capex so với khấu hao",
            en: "Capex vs D&A",
            def: "Ở trạng thái ổn định hai con số phải xấp xỉ nhau. Capex thấp hơn khấu hao mãi mãi nghĩa là doanh nghiệp đang teo dần tài sản mà vẫn tăng trưởng doanh thu.",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Mô hình đáng tin không phải mô hình không có lỗi, mà là mô hình khiến lỗi tự lộ ra.",
          "Bài cuối: ráp toàn bộ vào một case hoàn chỉnh.",
        ],
      },
    ],
  },

  {
    id: 1320,
    slug: "case-tong-ket-mo-hinh-tai-chinh",
    title: "Mô hình TC, Bài 10: Tổng kết - quy trình dựng mô hình hoàn chỉnh",
    subtitle: "Ráp chín bài trước thành một quy trình làm việc",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🎓",
    track: "professional",
    whyItMatters:
      "Biết từng phần rời rạc không đủ - giá trị nằm ở khả năng đi từ trang giấy trắng đến một mô hình hoàn chỉnh theo trình tự hợp lý. Bài này cho bạn quy trình đó dưới dạng checklist áp dụng được ngay.",
    openingQuestion:
      "Thứ tự hợp lý nhất khi dựng một mô hình 3 báo cáo từ đầu là gì?",
    openingOptions: [
      "Dựng bảng cân đối trước, rồi suy ngược ra P&L",
      "Lịch sử → giả định → P&L → bảng cân đối",
      "Bắt đầu từ DCF rồi suy ngược ra các báo cáo",
      "Dựng đồng thời cả ba báo cáo từ đầu",
    ],
    correctOption: 1,
    explanation:
      "Trình tự chuẩn: (1) nhập lịch sử để có nền so sánh; (2) đặt vùng giả định; (3) dựng P&L đến EBITDA; (4) dựng các bảng hỗ trợ - khấu hao, vốn lưu động, nợ vay; (5) hoàn thiện P&L, bảng cân đối và dòng tiền; (6) nối mắt xích khép vòng; (7) kiểm tra và chạy kịch bản. Mỗi bước phụ thuộc bước trước nên đảo thứ tự sẽ phải làm lại nhiều lần.",
    diagram: [
      { label: "Lịch sử → Giả định", arrow: true },
      { label: "P&L → Bảng hỗ trợ", arrow: true },
      { label: "BS + CF → Nối khép vòng", arrow: true },
      { label: "Kiểm tra → Kịch bản → Định giá" },
    ],
    realWorldExample: {
      company: "Quy trình chuẩn trong thực tế",
      description:
        "Người dựng mô hình có kinh nghiệm dành phần lớn thời gian ở hai đầu: thu thập và làm sạch dữ liệu lịch sử ở đầu vào, và kiểm tra kèm chạy kịch bản ở đầu ra. Phần viết công thức ở giữa thường là phần nhanh nhất - vì cấu trúc đã được quyết định từ trước và các mắt xích đã rõ ràng.",
    },
    quiz: [
      {
        question: "Vì sao nên nhập số liệu lịch sử trước khi dự phóng?",
        options: [
          "Để file trông đầy đủ hơn",
          "Vì lịch sử cung cấp nền tham chiếu để đặt giả định hợp lý và để kiểm tra tính hợp lý của dự phóng",
          "Vì quy định kế toán yêu cầu",
          "Vì không thể dự phóng nếu thiếu lịch sử",
        ],
        correct: 1,
        explanation:
          "Lịch sử cho biết biên lợi nhuận, vòng quay vốn và tăng trưởng thực tế của doanh nghiệp - cơ sở duy nhất để đánh giá giả định dự phóng có hợp lý không.",
      },
      {
        question: "Phần nào của quy trình thường tốn nhiều thời gian nhất?",
        options: [
          "Viết công thức trong các báo cáo",
          "Thu thập, làm sạch dữ liệu lịch sử và kiểm tra kết quả cuối",
          "Định dạng màu sắc",
          "Đặt tên các sheet",
        ],
        correct: 1,
        explanation:
          "Với cấu trúc rõ ràng, phần viết công thức khá nhanh. Dữ liệu đầu vào và kiểm tra đầu ra mới là nơi quyết định chất lượng và tốn công nhất.",
      },
      {
        question:
          "Sau khi mô hình đã cân và chạy được, bước tiếp theo nên là gì?",
        options: [
          "Gửi ngay cho ban lãnh đạo",
          "Chạy kịch bản và phân tích độ nhạy để biết kết quả phụ thuộc vào đâu",
          "Xóa các bảng hỗ trợ cho gọn",
          "Khóa file bằng mật khẩu",
        ],
        correct: 1,
        explanation:
          "Một con số đơn lẻ không đủ để ra quyết định. Kịch bản và độ nhạy biến mô hình từ máy tính số thành công cụ hỗ trợ ra quyết định.",
      },
      {
        question: "Dấu hiệu của một mô hình thực sự tốt là gì?",
        options: [
          "Có nhiều sheet và công thức phức tạp",
          "Người khác mở ra hiểu được cấu trúc, tìm được giả định, và thay đổi được kịch bản mà không cần hỏi người dựng",
          "Cho ra con số đúng như kỳ vọng của lãnh đạo",
          "Chạy nhanh và file nhẹ",
        ],
        correct: 1,
        explanation:
          "Mô hình là công cụ giao tiếp. Nếu chỉ người dựng mới dùng được, nó đã thất bại ở mục đích quan trọng nhất.",
      },
    ],
    keyTakeaways: [
      "Trình tự: lịch sử → giả định → P&L → bảng hỗ trợ → BS & CF → nối khép vòng → kiểm tra → kịch bản",
      "Thời gian dồn vào hai đầu: chuẩn bị dữ liệu và kiểm tra kết quả, không phải viết công thức",
      "Mô hình tốt là mô hình người khác dùng được mà không cần hỏi người dựng",
      "Luôn kết thúc bằng kịch bản và độ nhạy, không dừng ở một con số duy nhất",
    ],
    practicePrompt: {
      question:
        "Bạn được giao dựng mô hình định giá cho một doanh nghiệp niêm yết trong 2 ngày. Nên phân bổ thời gian thế nào?",
      options: [
        "Dành cả 2 ngày viết công thức cho thật chi tiết",
        "Ngày 1: dữ liệu và giả định. Ngày 2: dựng và kiểm tra",
        "Ngày 1: dựng xong toàn bộ. Ngày 2: định dạng cho đẹp",
        "Dành phần lớn thời gian cho phần DCF vì đó là kết quả cuối",
      ],
      correct: 1,
      explanation:
        "Dữ liệu lịch sử và cấu trúc quyết định chất lượng toàn bộ mô hình - làm ẩu ở đây thì mọi thứ sau đều phải làm lại. Phần viết công thức khá nhanh khi cấu trúc đã rõ. Và không bao giờ được cắt bỏ bước kiểm tra và chạy kịch bản, vì đó chính là phần biến mô hình thành thứ dùng được để ra quyết định.",
    },
    summary: {
      keyIdea: "Mô hình tốt = cấu trúc rõ + giả định kiểm chứng được + kiểm tra kỹ + kịch bản đầy đủ",
      commonMistake: "Nhảy thẳng vào viết công thức mà chưa có dữ liệu lịch sử và cấu trúc rõ ràng.",
      action: "Dựng một mô hình 3 báo cáo hoàn chỉnh cho một doanh nghiệp niêm yết bạn quan tâm.",
    },
    application: {
      title: "Dự án cuối chặng",
      message:
        "Chọn một doanh nghiệp niêm yết có báo cáo tài chính công khai. Dựng mô hình 3 báo cáo 5 năm theo đúng trình tự đã học, kết thúc bằng DCF kèm bảng độ nhạy WACC × g.",
      secondary:
        "Đây là sản phẩm cụ thể bạn có thể đưa vào hồ sơ năng lực khi ứng tuyển các vị trí phân tích tài chính.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước cho bạn từng thành phần: cấu trúc, doanh thu, ba báo cáo, bảng hỗ trợ, nợ vay, DCF, kịch bản, LBO và kiểm tra. Bài này ráp chúng thành một quy trình bạn có thể lặp lại cho bất kỳ doanh nghiệp nào.",
      },
      { type: "heading", text: "Quy trình bảy bước" },
      {
        type: "list",
        items: [
          "**1. Nhập lịch sử:** ít nhất 3 năm số liệu thực để có nền tham chiếu",
          "**2. Đặt vùng giả định:** mọi biến số tập trung một chỗ, không chôn trong công thức",
          "**3. Dựng P&L đến EBITDA:** doanh thu theo động lực, chi phí theo tỷ lệ hoặc theo động lực riêng",
          "**4. Dựng bảng hỗ trợ:** khấu hao, vốn lưu động, lịch nợ vay",
          "**5. Hoàn thiện ba báo cáo:** đưa kết quả bảng hỗ trợ vào P&L, bảng cân đối và dòng tiền",
          "**6. Nối khép vòng:** lợi nhuận giữ lại, tiền mặt cuối kỳ - rồi kiểm tra bảng cân đối cân",
          "**7. Kiểm tra và chạy kịch bản:** ba lớp kiểm tra, bảng độ nhạy, kịch bản base/upside/downside",
        ],
      },
      {
        type: "callout",
        label: "Nơi thời gian thực sự đi",
        text: "Người mới thường nghĩ phần lớn công sức nằm ở viết công thức. Thực tế, với cấu trúc rõ ràng thì bước 3-6 khá nhanh. Thời gian dồn vào bước 1 (làm sạch dữ liệu) và bước 7 (kiểm tra, chạy kịch bản) - hai bước quyết định mô hình có dùng được hay không.",
      },
      {
        type: "comparison",
        left: {
          label: "Mô hình tính toán",
          text: "Cho ra một con số. Chỉ người dựng hiểu được cấu trúc. Đổi giả định phải sửa nhiều nơi.",
        },
        right: {
          label: "Mô hình hỗ trợ quyết định",
          text: "Cho ra một khoảng giá trị kèm điều kiện. Người khác mở ra dùng được ngay. Đổi kịch bản chỉ cần sửa vùng giả định.",
        },
      },
      {
        type: "callout",
        label: "Về giới hạn của chặng học này",
        text: "Đây là các bài học dạng chữ, tập trung vào cấu trúc, logic liên kết và các quyết định giả định - phần chuyển tải được qua đọc hiểu. Kỹ năng thao tác bảng tính chỉ hình thành qua thực hành. Hãy dựng lại từng khái niệm trong file của chính bạn; đó mới là nơi kiến thức trở thành kỹ năng.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình tài chính không dự đoán tương lai - nó làm rõ bạn đang đặt cược vào điều gì.",
          "Và giá trị lớn nhất của nó là buộc mọi giả định phải hiện ra thành con số có thể tranh luận.",
        ],
      },
    ],
  },
];
