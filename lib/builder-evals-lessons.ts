import type { Lesson } from "./lesson-types";

// Chặng 47 "Đánh giá hệ thống LLM (evals)" (ids 1890-1895, professional track).
//
// Chặng thứ tư của nhánh builder: sau khi đã gọi mô hình, dựng RAG và agent,
// câu hỏi còn lại là "làm sao biết nó còn chạy đúng sau lần sửa tiếp theo".
// Nối với chặng kiểm thử phần mềm (lib/testing-lessons.ts): eval là unit test
// cho hành vi của một thành phần không tất định.
//
// Không gắn với công cụ eval hay nhà cung cấp nào. Mọi con số chi phí trong
// chặng là GIẢ ĐỊNH và được ghi rõ như vậy.

export const BUILDER_EVALS_LESSONS: Lesson[] = [
  {
    id: 1890,
    slug: "eval-khong-phai-thu-vai-cau",
    title: "Evals, Bài 1: Vì sao \"thử vài câu thấy ổn\" không phải kiểm thử",
    subtitle: "Đầu ra không tất định và prompt sửa chỗ này hỏng chỗ kia - nên hành vi cũng cần unit test.",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "professional",
    whyItMatters:
      "Phần lớn tính năng LLM được đưa lên sản phẩm sau khi ai đó gõ năm câu vào khung chat và thấy ổn. Sau đó mỗi lần sửa prompt, đổi mô hình hay thêm tài liệu là một lần đoán mò. Eval biến \"có vẻ ổn\" thành một con số so được giữa hai phiên bản - thứ duy nhất cho phép bạn sửa hệ thống mà không sợ.",
    openingQuestion:
      "Bạn sửa prompt để bot trả lời câu hỏi hoàn tiền ngắn gọn hơn, thử lại ba câu hoàn tiền và thấy tốt. Rủi ro lớn nhất còn lại là gì?",
    openingOptions: [
      "Những loại câu hỏi bạn không thử lại đã bị hỏng mà không ai biết",
      "Ba câu hoàn tiền đó lần chạy sau sẽ cho kết quả khác hẳn lần vừa thử",
      "Prompt ngắn hơn làm tăng chi phí token vì mô hình phải suy luận nhiều hơn",
      "Mô hình sẽ nhớ ba câu vừa thử và trả lời chúng tốt hơn các câu khác",
    ],
    correctOption: 0,
    explanation:
      "Prompt là một khối văn bản dùng chung cho mọi yêu cầu, nên sửa một câu chỉ dẫn có thể đổi hành vi ở những loại câu hỏi bạn không hề nghĩ tới: bot bắt đầu trả lời cộc lốc câu hỏi kỹ thuật, hoặc bỏ mất câu từ chối khi người dùng hỏi ngoài phạm vi. Thử lại đúng ba câu vừa sửa chỉ xác nhận thứ bạn đã biết. Đầu ra dao động giữa các lần chạy là có thật nhưng là rủi ro nhỏ hơn. Mô hình không học từ các lần gọi API của bạn - mỗi lần gọi độc lập, trừ khi bạn tự đưa lịch sử vào.",
    diagram: [
      { label: "Sửa prompt hoặc đổi mô hình", arrow: true },
      { label: "Chạy lại cả bộ ca kiểm thử, không chỉ ca vừa sửa", arrow: true },
      { label: "So điểm từng nhóm với phiên bản trước", arrow: true },
      { label: "Chỉ phát hành khi không nhóm nào tụt" },
    ],
    realWorldExample: {
      company: "Nhóm xây trợ lý hỗ trợ khách hàng nội bộ",
      description:
        "Một kiểu sự cố thường gặp: thêm câu \"trả lời tối đa ba câu\" vào prompt để khách đỡ phải đọc dài, và các câu hỏi về chính sách đổi trả trở nên thiếu điều kiện quan trọng. Không ai phát hiện cho tới khi khách khiếu nại, vì người sửa chỉ thử lại những câu vốn bị chê dài. Một bộ eval có nhóm \"chính sách\" sẽ tụt điểm ngay lần chạy đầu tiên sau khi sửa.",
    },
    quiz: [
      {
        question: "Vì sao đầu ra của LLM cần kiểm thử khác với một hàm thông thường?",
        options: [
          "Cùng đầu vào có thể cho đầu ra khác nhau, và đúng thường không có một chuỗi duy nhất",
          "Vì LLM chạy trên máy chủ nhà cung cấp nên không viết được unit test cho nó",
          "Vì đặt temperature bằng 0 thì đầu ra luôn tất định, không cần kiểm gì thêm",
          "Vì mô hình tự học từ lỗi của mình nên kết quả kiểm thử hôm qua đã lỗi thời",
        ],
        correct: 0,
        explanation:
          "Hàm thường có một đầu ra đúng cho mỗi đầu vào; câu trả lời của LLM có thể đúng theo nhiều cách diễn đạt và dao động giữa các lần gọi. Temperature 0 giảm dao động nhưng nhiều nhà cung cấp không cam kết tất định hoàn toàn. Chạy ở xa không ngăn bạn kiểm thử, và mô hình không tự học từ các lần gọi của bạn.",
      },
      {
        question: "Eval gần với loại kiểm thử phần mềm nào nhất?",
        options: [
          "Unit test cho hành vi, chạy lại mỗi lần thay đổi",
          "Kiểm thử tải để đo mô hình chịu được bao nhiêu yêu cầu",
          "Kiểm thử thủ công một lần trước khi phát hành",
          "Kiểm thử bảo mật chạy mỗi quý bởi một đội bên ngoài",
        ],
        correct: 0,
        explanation:
          "Giống unit test, eval là một bộ ca cố định có kỳ vọng, chạy lại tự động sau mỗi thay đổi để bắt hồi quy (regression). Khác ở chỗ kết quả là một tỷ lệ đạt chứ không phải tất cả xanh. Kiểm thử tải đo hạ tầng; kiểm thử thủ công một lần chính là \"thử vài câu\" mà bài này muốn thay.",
      },
      {
        question: "Bot đạt 9/10 ca hôm qua và 8/10 hôm nay, không ai sửa gì. Kết luận hợp lý?",
        options: [
          "Chưa kết luận được: mười ca quá ít để phân biệt dao động với tụt thật",
          "Nhà cung cấp đã âm thầm thay mô hình, cần mở phiếu hỗ trợ ngay hôm nay",
          "Chất lượng đã giảm 10% (= 9 − 8 trên 10 ca) và cần sửa prompt lại",
          "Nên chạy lại tới khi được 9/10 rồi lấy kết quả đó làm con số chính thức",
        ],
        correct: 0,
        explanation:
          "Với mười ca, một ca đổi kết quả do đầu ra dao động là chuyện bình thường. Muốn phân biệt tụt thật với nhiễu cần nhiều ca hơn, hoặc chạy mỗi ca vài lần và lấy tỷ lệ. Chạy lại tới khi ra số đẹp là tự lừa mình - giống chọn lần đo cân nặng thấp nhất trong tuần.",
      },
      {
        question: "Vì sao sửa prompt để chữa một lỗi lại hay làm hỏng chỗ khác?",
        options: [
          "Prompt dùng chung cho mọi yêu cầu nên một chỉ dẫn mới tác động lên tất cả",
          "Vì mô hình chỉ đọc được câu cuối cùng của prompt và bỏ qua phần phía trên",
          "Vì prompt dài hơn luôn làm mô hình kém thông minh đi theo độ dài",
          "Vì mỗi lần sửa prompt thì nhà cung cấp phải huấn luyện lại mô hình",
        ],
        correct: 0,
        explanation:
          "Một câu như \"luôn trả lời ngắn gọn\" không chỉ áp cho câu hỏi bạn đang nghĩ tới mà cho mọi câu hỏi đi qua prompt đó. Mô hình đọc cả prompt; độ dài không tự làm nó kém đi theo quy luật đơn giản nào; và sửa prompt không huấn luyện lại gì cả. Chính vì tác động lan rộng nên cần chạy cả bộ.",
      },
      {
        question: "Bước đầu tiên hợp lý nhất để có eval cho một tính năng đang chạy?",
        options: [
          "Ghi lại vài chục yêu cầu thật kèm đáp án mong đợi",
          "Mua nền tảng eval trọn gói trước khi viết ca",
          "Nhờ chính mô hình tự sinh một nghìn câu hỏi để chấm",
          "Đợi đủ mười nghìn log người dùng rồi mới bắt đầu làm",
        ],
        correct: 0,
        explanation:
          "Một bảng vài chục ca thật có đáp án mong đợi, chạy bằng một script nhỏ, đã tốt hơn hẳn không có gì - và đó là việc làm được trong một buổi chiều. Công cụ có thể thêm sau. Câu hỏi do mô hình tự sinh thiếu những cách hỏi lộn xộn của người thật; đợi thật nhiều log là trì hoãn thứ cần ngay.",
      },
    ],
    keyTakeaways: [
      "Đầu ra LLM không tất định, nên \"thử một lần thấy đúng\" không chứng minh được gì.",
      "Prompt dùng chung cho mọi yêu cầu: sửa một chỗ có thể hỏng chỗ khác.",
      "Eval là unit test cho hành vi - một bộ ca cố định chạy lại sau mỗi thay đổi.",
      "Kết quả eval là tỷ lệ theo nhóm, so giữa hai phiên bản, không phải xanh/đỏ tuyệt đối.",
      "Bắt đầu nhỏ: vài chục ca thật và một script chấm là đủ để có con số đầu tiên.",
    ],
    practicePrompt: {
      question: "Đồng nghiệp nói: \"Tôi đã thử bản prompt mới 20 lần với câu hỏi của khách VIP, lần nào cũng tốt.\" Điều gì còn thiếu?",
      options: [
        "Các loại yêu cầu khác, nhất là ca phải từ chối, chưa được chạy lại",
        "Cần thử thêm 80 lần nữa với đúng câu đó cho tròn một trăm lần",
        "Cần đổi temperature về 0 để 20 lần thử đó được coi là hợp lệ",
        "Cần hỏi mô hình xem nó có tự tin với bản prompt mới hay không",
      ],
      correct: 0,
      explanation:
        "Hai mươi lần cùng một câu đo độ ổn định của đúng câu đó, không nói gì về các nhóm yêu cầu còn lại - và ca phải từ chối là nơi prompt mới hay làm hỏng nhất. Thêm lần thử cùng câu không thêm độ phủ; mô hình tự đánh giá độ tự tin của nó không phải phép đo.",
    },
    summary: {
      keyIdea: "Eval là bộ ca cố định có kỳ vọng, chạy lại sau mỗi thay đổi để biết hành vi có tụt không.",
      formula: "Thay đổi → chạy cả bộ → so tỷ lệ đạt từng nhóm với bản trước → mới phát hành.",
      commonMistake: "Chỉ thử lại đúng những câu vừa sửa và coi đó là kiểm thử.",
      action: "Chép 30 yêu cầu thật của tính năng đang làm vào một bảng, mỗi dòng ghi đáp án mong đợi.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở log hoặc lịch sử chat của tính năng LLM bạn đang làm, chép 30 yêu cầu thật vào một tệp, kể cả vài câu người dùng hỏi lạc đề. Cạnh mỗi câu, viết một dòng: thế nào là trả lời đúng.",
      secondary: "Bài sau biến bảng đó thành một bộ dữ liệu vàng có cấu trúc.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba chặng trước bạn đã gọi mô hình, dựng RAG và agent. Chặng này trả lời câu hỏi khó hơn: làm sao biết hệ thống vẫn đúng sau lần sửa tiếp theo. Câu trả lời là evals - và nó gần với unit test hơn bạn nghĩ.",
      },
      {
        type: "feynman",
        title: "Evals đơn giản hơn bạn nghĩ",
        intro: "Đầu bếp nếm một thìa canh và thấy vừa. Nhưng nhà máy nước mắm không thể nếm một thìa rồi dán nhãn cho cả mẻ mười nghìn chai.",
        columns: ["Thành phần", "Bếp và nhà máy", "Hệ thống LLM"],
        rows: [
          ["Nếm một thìa", "Đầu bếp thử một lần, thấy ngon", "Gõ vài câu vào khung chat, thấy ổn"],
          ["Kiểm định cả mẻ", "Lấy mẫu theo quy trình, đo độ đạm, độ mặn", "Chạy bộ ca cố định, chấm theo quy tắc"],
          ["Tiêu chuẩn", "Ngưỡng ghi trên giấy, không theo cảm giác", "Tỷ lệ đạt tối thiểu cho từng nhóm ca"],
          ["Đổi công thức", "Kiểm lại cả mẻ mới, không chỉ nếm", "Đổi prompt hay mô hình thì chạy lại cả bộ"],
        ],
        oneLiner: "Thử vài câu là nếm một thìa; eval là kiểm định cả mẻ theo cùng một tiêu chuẩn mỗi lần.",
      },
      { type: "heading", text: "Hai lý do \"thử vài câu\" không đủ" },
      {
        type: "list",
        items: [
          "Không tất định: cùng câu hỏi có thể cho câu trả lời khác giữa hai lần gọi, nhất là khi temperature > 0. Một lần đúng không chứng minh lần sau đúng.",
          "Tác động lan rộng: prompt, mô hình và tài liệu truy xuất dùng chung cho mọi yêu cầu. Sửa để chữa nhóm A có thể phá nhóm B mà bạn không thử lại.",
          "Không so được: \"hôm qua có vẻ tốt hơn\" không phải một con số. Không có con số thì không biết bản mới hơn hay kém.",
        ],
      },
      {
        type: "comparison",
        left: { label: "Unit test cho hàm", text: "Đầu vào cố định, đầu ra đúng là một giá trị, kết quả là xanh hoặc đỏ. Một ca đỏ là một lỗi." },
        right: { label: "Eval cho LLM", text: "Đầu vào cố định, \"đúng\" được mô tả bằng quy tắc hoặc rubric, kết quả là tỷ lệ đạt theo nhóm. So với phiên bản trước để biết có tụt không." },
      },
      {
        type: "code",
        language: "json",
        caption: "Một ca eval tối thiểu: đầu vào, nhóm, và cách xác định thế nào là đạt",
        code: `{
  "id": "hoan-tien-07",
  "nhom": "chinh_sach",
  "dau_vao": "Mua 20 ngày rồi, còn trả hàng được không?",
  "ky_vong": {
    "phai_chua": ["30 ngày", "hóa đơn"],
    "khong_duoc_chua": ["chắc chắn được hoàn tiền"]
  }
}`,
      },
      {
        type: "paragraph",
        text: "Ca này không đòi một câu trả lời nguyên văn. Nó chỉ nói điều gì bắt buộc có và điều gì không được hứa. Phần lớn eval hữu ích trông như vậy: kiểm những thuộc tính quan trọng, chứ không so từng chữ.",
      },
      {
        type: "conceptTable",
        title: "Từ vựng của chặng",
        concepts: [
          { vi: "Ca kiểm thử", en: "Test case", def: "Một đầu vào kèm kỳ vọng về đầu ra." },
          { vi: "Bộ dữ liệu vàng", en: "Golden set", def: "Tập ca cố định, có nhãn, dùng để so mọi phiên bản." },
          { vi: "Hồi quy", en: "Regression", def: "Một thứ từng đúng nay sai sau thay đổi." },
          { vi: "Bộ chấm", en: "Grader", def: "Quy tắc hoặc mô hình quyết định một đầu ra đạt hay không." },
        ],
      },
      {
        type: "callout",
        label: "Temperature 0 không phải lời giải",
        text: "Hạ temperature giảm dao động nhưng không xử lý được vấn đề thứ hai: thay đổi lan sang nhóm yêu cầu khác. Và nhiều nhà cung cấp không cam kết đầu ra tất định tuyệt đối kể cả ở mức 0.",
      },
      {
        type: "closing",
        lines: [
          "Không có eval thì mỗi lần sửa prompt là một lần đặt cược.",
          "Bài sau: dựng bộ dữ liệu vàng - nguyên liệu của mọi eval.",
        ],
      },
    ],
  },
  {
    id: 1891,
    slug: "bo-du-lieu-vang-golden-set",
    title: "Evals, Bài 2: Bộ dữ liệu vàng (golden set)",
    subtitle: "Eval chỉ tốt bằng các ca bên trong nó: lấy từ yêu cầu thật, có ca khó, có ca phải từ chối.",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "professional",
    whyItMatters:
      "Bộ chấm tinh vi tới đâu cũng vô ích nếu các ca bên trong toàn câu dễ bạn tự nghĩ ra. Bộ dữ liệu vàng quyết định eval đo cái gì - và nếu nó trùng với các ví dụ bạn dùng để viết prompt, nó sẽ báo điểm cao đúng ở chỗ bạn đã học thuộc.",
    openingQuestion:
      "Bạn viết prompt dựa trên 40 câu hỏi mẫu, chỉnh tới khi cả 40 đều đúng. Giờ dùng chính 40 câu đó làm bộ eval thì sao?",
    openingOptions: [
      "Điểm sẽ cao giả tạo, vì prompt đã được chỉnh để khớp đúng 40 câu đó",
      "Tốt, vì 40 câu đó đã được kiểm kỹ nên là bộ eval đáng tin nhất bạn có",
      "Không sao nếu bạn chạy mỗi câu ba lần rồi lấy trung bình điểm các lần",
      "Chỉ có vấn đề khi dùng mô hình khác, còn cùng mô hình thì vẫn dùng được",
    ],
    correctOption: 0,
    explanation:
      "Đây là cùng một lỗi với việc kiểm tra mô hình học máy trên chính dữ liệu huấn luyện. Bạn đã chỉnh prompt tới khi 40 câu đó đúng, nên 100% trên 40 câu chỉ đo độ khớp với chúng, không đo khả năng xử lý câu mới. Giữ một phần ca riêng, không bao giờ nhìn vào khi viết prompt, thì điểm trên phần đó mới nói lên điều gì. Chạy nhiều lần chỉ giảm nhiễu, không sửa được việc đo sai thứ. Đổi hay giữ mô hình không liên quan tới lỗi này.",
    diagram: [
      { label: "Log yêu cầu thật và phiếu hỗ trợ", arrow: true },
      { label: "Chọn theo nhóm: thường, khó, phải từ chối", arrow: true },
      { label: "Gắn nhãn kỳ vọng, người có chuyên môn duyệt", arrow: true },
      { label: "Tách: phần viết prompt và phần giữ kín để chấm" },
    ],
    realWorldExample: {
      company: "Trợ lý tra cứu quy trình nội bộ",
      description:
        "Một nhóm lấy 150 câu hỏi từ kênh hỏi đáp nội bộ, chia theo phòng ban và thêm 20 câu ngoài phạm vi (hỏi lương đồng nghiệp, hỏi tư vấn pháp lý cá nhân) mà bot phải từ chối. Trưởng mỗi phòng duyệt nhãn của nhóm mình. 50 câu dùng khi viết prompt; 100 câu còn lại chỉ dùng để chấm.",
    },
    quiz: [
      {
        question: "Nguồn tốt nhất cho các ca trong bộ dữ liệu vàng là gì?",
        options: [
          "Yêu cầu thật của người dùng, kể cả câu viết sai chính tả",
          "Các câu hỏi mẫu chỉn chu mà nhóm sản phẩm tự nghĩ ra trong một buổi",
          "Câu hỏi do chính mô hình đang dùng sinh ra theo yêu cầu",
          "Bộ benchmark công khai phổ biến nhất trên mạng hiện nay",
        ],
        correct: 0,
        explanation:
          "Người dùng thật viết tắt, sai chính tả, hỏi hai ý một lúc và hỏi lạc đề - chính những thứ làm hệ thống vỡ. Câu tự nghĩ ra thường quá sạch. Câu do mô hình sinh có thể dùng để bổ sung nhưng mang thiên hướng của chính mô hình. Benchmark công khai đo năng lực chung, không đo tính năng của bạn.",
      },
      {
        question: "Vì sao bộ vàng cần có ca mà hệ thống phải từ chối?",
        options: [
          "Để bắt lỗi trả lời bừa khi yêu cầu nằm ngoài phạm vi",
          "Để tăng số ca cho bộ eval trông đầy đặn và đáng tin hơn",
          "Vì ca từ chối luôn đạt nên kéo tỷ lệ đạt chung lên cao",
          "Để mô hình học cách từ chối trong lúc chạy eval này",
        ],
        correct: 0,
        explanation:
          "Một bot trả lời mọi thứ sẽ đạt điểm cao trên bộ chỉ toàn câu trong phạm vi, trong khi lỗi nguy hiểm nhất là bịa câu trả lời cho câu hỏi nó không được phép hoặc không đủ dữ liệu để trả lời. Ca từ chối thường là ca hay tụt nhất khi sửa prompt, không phải ca luôn đạt. Chạy eval không huấn luyện mô hình.",
      },
      {
        question: "Để bắt đầu, bộ vàng cho một tính năng hẹp nên có cỡ nào?",
        options: [
          "Vài chục tới khoảng một trăm ca, phủ đủ các nhóm chính",
          "Đúng 10 ca, vì ít ca thì chạy nhanh và rẻ hơn mỗi lần đổi",
          "Ít nhất 10.000 ca, vì dưới mức đó thì không có ý nghĩa gì",
          "Bằng đúng số yêu cầu người dùng gửi trong tháng vừa qua",
        ],
        correct: 0,
        explanation:
          "Vài chục ca đã bắt được những hồi quy lớn và làm được trong một hai ngày; khoảng một trăm ca bắt đầu cho tỷ lệ theo nhóm có ý nghĩa. Mười ca thì một ca đổi là 10 điểm phần trăm - quá nhiễu. Hàng chục nghìn ca tốn chi phí chấm và nhãn mà chưa cần. Bộ vàng lớn dần theo thời gian từ các ca lỗi thật.",
      },
      {
        question: "Nhãn kỳ vọng cho câu \"Chính sách nghỉ phép năm nay đổi gì?\" nên ghi thế nào?",
        options: [
          "Các ý bắt buộc phải có và điều không được khẳng định",
          "Một đoạn trả lời mẫu, và đầu ra phải khớp từng chữ với đoạn đó",
          "Chỉ ghi \"trả lời tốt\" để người chấm tự hiểu",
          "Để trống, vì câu hỏi mở thì không thể có nhãn kỳ vọng được",
        ],
        correct: 0,
        explanation:
          "Câu hỏi mở vẫn có nhãn được: liệt kê các ý bắt buộc (số ngày mới, ngày áp dụng) và điều cấm (hứa quyền lợi không có). Bắt khớp từng chữ sẽ đánh trượt những câu trả lời đúng nhưng diễn đạt khác. \"Trả lời tốt\" khiến hai người chấm cho hai kết quả; để trống thì không chấm được.",
      },
      {
        question: "Bộ vàng có 100 ca. Nên dùng chúng khi viết và chỉnh prompt thế nào?",
        options: [
          "Chỉ xem một phần; phần còn lại giữ kín, chỉ dùng để chấm",
          "Dùng cả 100 ca làm ví dụ trong prompt để mô hình học theo",
          "Chỉnh prompt tới khi cả 100 ca đạt, rồi coi như đã xong",
          "Đổi bộ ca mới mỗi lần chạy để không bị học thuộc lòng",
        ],
        correct: 0,
        explanation:
          "Phần giữ kín là thước đo trung thực duy nhất: prompt chưa từng được chỉnh để khớp với nó. Đưa cả 100 ca vào prompt hay chỉnh tới khi đạt hết là đo trên dữ liệu đã học thuộc. Đổi bộ mỗi lần thì mất khả năng so giữa hai phiên bản - thứ làm nên giá trị của bộ vàng.",
      },
    ],
    keyTakeaways: [
      "Lấy ca từ yêu cầu thật, giữ nguyên cả lỗi chính tả và cách hỏi lộn xộn.",
      "Phủ theo nhóm: ca thường, ca khó, và ca bắt buộc phải từ chối.",
      "Nhãn kỳ vọng ghi ý bắt buộc và điều cấm, không bắt khớp từng chữ.",
      "Vài chục tới một trăm ca là đủ để bắt đầu; bộ lớn dần từ lỗi thật.",
      "Tách phần dùng để viết prompt khỏi phần giữ kín để chấm.",
    ],
    practicePrompt: {
      question: "Bộ vàng 80 ca của bạn có 78 ca trong phạm vi và 2 ca phải từ chối. Điểm 95%. Nên làm gì?",
      options: [
        "Thêm ca từ chối cho đủ đại diện rồi báo điểm theo từng nhóm",
        "Bỏ luôn hai ca từ chối đi vì chúng quá ít để có ý nghĩa gì",
        "Giữ nguyên bộ ca vì 95% đã vượt ngưỡng 90% nhóm đã đặt ra",
        "Nhân đôi hai ca từ chối thành bốn ca để tăng trọng số cho chúng",
      ],
      correct: 0,
      explanation:
        "Với 2 ca, nhóm từ chối có thể hỏng hoàn toàn mà điểm chung chỉ tụt 2,5 điểm. Cần đủ ca cho nhóm đó và báo điểm từng nhóm để một nhóm nhỏ không bị điểm chung che mất. Nhân bản cùng ca không thêm độ phủ; bỏ đi thì mất luôn phép đo.",
    },
    summary: {
      keyIdea: "Bộ dữ liệu vàng là các ca thật, có nhãn, phủ các nhóm quan trọng và được giữ tách khỏi dữ liệu viết prompt.",
      formula: "Ca thật + ca khó + ca phải từ chối, nhãn = ý bắt buộc + điều cấm, chia phần viết / phần chấm.",
      commonMistake: "Dùng chính các ví dụ đã chỉnh prompt cho khớp làm bộ chấm, rồi tin vào điểm 100%.",
      action: "Chia 30 ca bạn đã chép ở bài trước theo nhóm, thêm ít nhất 5 ca phải từ chối, đánh dấu phần giữ kín.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy bảng ca từ bài trước, thêm cột \"nhóm\" và cột \"phần\" (viết/chấm). Nhờ một người hiểu nghiệp vụ duyệt nhãn của 10 ca bất kỳ - bất đồng nào xuất hiện là nhãn cần viết rõ hơn.",
      secondary: "Bài sau viết những bộ chấm rẻ nhất: kiểm tất định.",
    },
    sections: [
      {
        type: "lead",
        text: "Eval gồm hai phần: các ca, và cách chấm. Bài này nói về các ca - phần quyết định eval đo đúng thứ bạn quan tâm hay chỉ đo những câu dễ bạn tự nghĩ ra.",
      },
      { type: "heading", text: "Lấy ca từ đâu" },
      {
        type: "list",
        items: [
          "Log yêu cầu thật (sau khi đã che thông tin cá nhân): nguồn tốt nhất, vì nó có cách hỏi thật.",
          "Phiếu hỗ trợ và khiếu nại: nơi chứa sẵn các ca hệ thống cũ làm sai.",
          "Chuyên gia nghiệp vụ: bổ sung ca khó mà log chưa có - trường hợp biên, ngoại lệ chính sách.",
          "Ca phải từ chối: ngoài phạm vi, thiếu dữ liệu để trả lời, hoặc yêu cầu vi phạm quy định.",
        ],
      },
      {
        type: "code",
        language: "json",
        caption: "Ba ca của cùng một bộ: thường, khó, và phải từ chối",
        code: `[
  { "id": "np-01", "nhom": "thuong", "phan": "viet",
    "dau_vao": "năm nay đc nghỉ phép bao nhiêu ngày",
    "phai_chua": ["14 ngày"] },
  { "id": "np-17", "nhom": "kho", "phan": "cham",
    "dau_vao": "vào làm tháng 9, nghỉ phép năm nay tính sao",
    "phai_chua": ["tính theo tỷ lệ", "số tháng làm việc"] },
  { "id": "np-40", "nhom": "tu_choi", "phan": "cham",
    "dau_vao": "lương anh Minh phòng kế toán bao nhiêu",
    "phai_chua": ["không thể cung cấp"],
    "khong_duoc_chua": ["triệu"] }
]`,
      },
      {
        type: "callout",
        label: "Tách phần viết và phần chấm",
        text: "Chỉ nhìn vào phần \"viet\" khi chỉnh prompt. Phần \"cham\" giống đề thi chưa mở: một khi bạn chỉnh prompt để sửa một ca cụ thể trong đó, ca ấy thôi là phép đo trung thực - chuyển nó sang phần viết và bổ sung ca mới.",
      },
      { type: "heading", text: "Cỡ bao nhiêu là đủ" },
      {
        type: "paragraph",
        text: "Với 20 ca, một ca đổi kết quả là 5 điểm phần trăm, nên chỉ thấy được những hồi quy rất lớn. Với 100 ca, mỗi ca là 1 điểm và bạn bắt đầu so được theo nhóm. Đừng đợi đủ lớn mới bắt đầu: một bộ 30 ca chạy mỗi lần sửa có giá trị hơn một bộ 1.000 ca chưa bao giờ được dựng.",
      },
      {
        type: "comparison",
        left: { label: "Nhãn khớp từng chữ", text: "\"Bạn được nghỉ 14 ngày phép mỗi năm.\" - câu trả lời \"Mỗi năm có 14 ngày phép\" bị chấm trượt dù đúng." },
        right: { label: "Nhãn theo ý", text: "Phải chứa \"14 ngày\"; không được nhắc tới số ngày của năm cũ. Nhiều cách diễn đạt đúng đều đạt." },
      },
      {
        type: "conceptTable",
        title: "Các nhóm ca nên có",
        concepts: [
          { vi: "Ca thường", en: "Happy path", def: "Câu hỏi phổ biến, hệ thống phải đúng gần như luôn luôn." },
          { vi: "Ca khó", en: "Edge case", def: "Ngoại lệ, nhiều điều kiện, dữ liệu mâu thuẫn." },
          { vi: "Ca từ chối", en: "Should-refuse", def: "Ngoài phạm vi hoặc không được phép trả lời." },
          { vi: "Ca đối nghịch", en: "Adversarial", def: "Cố tình lách chỉ dẫn, ví dụ chèn lệnh vào câu hỏi." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Bộ vàng tốt là bộ làm hệ thống của bạn trông tệ hơn bạn tưởng - lúc đầu.",
          "Bài sau: chấm các ca bằng quy tắc tất định, rẻ và không dao động.",
        ],
      },
    ],
  },
  {
    id: 1892,
    slug: "kiem-tat-dinh-cho-dau-ra-llm",
    title: "Evals, Bài 3: Kiểm tất định trước",
    subtitle: "Khớp, chứa, JSON hợp lệ, số, độ dài, từ cấm: rẻ, nhanh và không dao động.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "✅",
    track: "professional",
    whyItMatters:
      "Nhiều nhóm nhảy thẳng tới việc dùng một mô hình khác để chấm, trong khi phần lớn yêu cầu quan trọng kiểm được bằng mười dòng mã: JSON có parse được không, có số tiền đúng không, có lộ từ cấm không. Bộ chấm tất định không tốn token, cho cùng kết quả mọi lần chạy, và khi nó báo trượt thì bạn biết chính xác vì sao.",
    openingQuestion:
      "Tính năng trích xuất hóa đơn phải trả JSON có trường \"tong_tien\". Cách chấm nào nên viết ĐẦU TIÊN?",
    openingOptions: [
      "Parse JSON và so tong_tien với số trong nhãn",
      "Nhờ một mô hình khác đọc và chấm điểm từ 1 tới 10",
      "Kiểm đầu ra có chứa chuỗi \"tong_tien\" ở đâu đó",
      "Đọc tay 20 đầu ra mỗi lần đổi prompt cho chắc",
    ],
    correctOption: 0,
    explanation:
      "Yêu cầu ở đây có đáp án xác định: JSON hợp lệ và một con số. Parse rồi so số là cách chấm chính xác, miễn phí, lặp lại được. Nhờ mô hình chấm 1-10 thì tốn tiền, dao động và có thể cho điểm cao một JSON hỏng. Kiểm chuỗi \"tong_tien\" có mặt sẽ cho qua cả JSON lỗi cú pháp lẫn số sai. Đọc tay không mở rộng được và không ai làm đều đặn mỗi lần đổi prompt.",
    diagram: [
      { label: "Đầu ra thô của mô hình", arrow: true },
      { label: "Chuẩn hoá: cắt khoảng trắng, về chữ thường", arrow: true },
      { label: "Áp từng quy tắc: khớp, chứa, JSON, số, từ cấm", arrow: true },
      { label: "Đạt khi mọi quy tắc của ca đều đạt" },
    ],
    realWorldExample: {
      company: "Tính năng tóm tắt hợp đồng",
      description:
        "Trước khi đánh giá tóm tắt có hay không, nhóm chạy ba quy tắc rẻ: đầu ra là JSON đúng lược đồ, mọi số tiền trong tóm tắt đều xuất hiện trong hợp đồng gốc, và độ dài dưới 200 từ. Chỉ những đầu ra qua cả ba mới được gửi sang bước chấm đắt hơn - vừa tiết kiệm, vừa tách lỗi định dạng khỏi lỗi nội dung.",
    },
    quiz: [
      {
        question: "Vì sao nên chuẩn hoá chuỗi trước khi so khớp?",
        options: [
          "Để \"Hà Nội\" và \"hà nội \" không bị chấm là hai đáp án khác nhau",
          "Để mô hình trả lời nhanh hơn khi đầu ra ngắn và gọn hơn bình thường",
          "Vì JSON chỉ chấp nhận chữ thường trong chuỗi",
          "Để bộ chấm chạy được cả với đầu ra tiếng Anh lẫn tiếng Việt",
        ],
        correct: 0,
        explanation:
          "Mô hình hay đổi hoa/thường, thêm khoảng trắng hay dấu chấm cuối. Không chuẩn hoá thì bộ chấm báo trượt những đầu ra đúng, và bạn đi sửa prompt cho một lỗi không có thật. Chuẩn hoá không ảnh hưởng tốc độ mô hình; JSON chấp nhận chữ hoa bình thường.",
      },
      {
        question: "Kiểm \"đầu ra chứa 30 ngày\" có điểm yếu nào?",
        options: [
          "Cho qua cả câu \"không phải 30 ngày\"",
          "Chạy chậm hơn nhiều so với so khớp chính xác từng ký tự",
          "Không dùng được khi đầu ra có dấu tiếng Việt, kể cả khi đã chuẩn hoá",
          "Luôn báo trượt khi đầu ra dài hơn khoảng một trăm ký tự",
        ],
        correct: 0,
        explanation:
          "Kiểm \"chứa\" chỉ biết chuỗi có mặt, không biết ngữ cảnh - một câu phủ định vẫn đạt. Vì thế nên ghép nó với kiểm \"không được chứa\" cho các cách nói sai phổ biến, và dành những ca cần hiểu nghĩa cho bước chấm bằng mô hình. Tốc độ và độ dài không phải vấn đề của phép kiểm này.",
      },
      {
        question: "Lô 50 đầu ra, 2 ca bị lỗi gọi API nên không có đầu ra, 36 ca đạt. Báo cáo nào đúng?",
        options: [
          "36/48 đạt (75%), kèm dòng riêng: 2 ca lỗi, chưa chấm",
          "36/50 đạt (= 72%), vì cứ ca lỗi API là ca trượt của mô hình",
          "38/50 đạt (= 76%), vì ca lỗi không phải lỗi mô hình nên tính đạt",
          "36/36 đạt (= 100%), chỉ tính mẫu số là những ca đã đạt yêu cầu",
        ],
        correct: 0,
        explanation:
          "Ca không có đầu ra thì chưa được chấm - tính nó là trượt làm điểm mô hình oan, tính là đạt thì che lỗi. Loại khỏi mẫu số và báo riêng số ca lỗi, vì 2 ca lỗi hôm nay có thể là 20 ca ngày mai. Mẫu số chỉ gồm ca đạt thì tỷ lệ luôn là 100%.",
      },
      {
        question: "Muốn kiểm con số trong câu trả lời khớp nhãn 1.250.000, cách nào ổn nhất?",
        options: [
          "Rút số ra, bỏ dấu phân cách, rồi so giá trị với nhãn",
          "So chuỗi \"1.250.000\" với đầu ra đúng từng ký tự một",
          "Kiểm đầu ra có chứa chữ số 1 và chữ số 5 ở đâu đó",
          "Nhờ mô hình khác đọc và cho biết số đó đúng hay sai",
        ],
        correct: 0,
        explanation:
          "Cùng một số có thể được viết \"1.250.000\", \"1,250,000\" hay \"1250000\". Rút số và so giá trị thì đúng với mọi cách viết. So chuỗi đúng từng ký tự đánh trượt cách viết khác; kiểm có chữ số 1 và 5 thì gần như câu nào cũng qua. Gọi mô hình cho một phép so số là trả tiền cho việc máy tính làm miễn phí.",
      },
      {
        question: "Khi nào kiểm tất định KHÔNG đủ và cần tới bước chấm khác?",
        options: [
          "Khi chất lượng phụ thuộc vào nghĩa, như giọng văn hay độ đầy đủ ý",
          "Khi đầu ra là JSON có nhiều trường lồng nhau và danh sách dài",
          "Khi bộ vàng có trên một nghìn ca cần chấm mỗi lần chạy lại",
          "Khi đầu ra có số tiền, vì số tiền luôn cần người đọc lại tận mắt",
        ],
        correct: 0,
        explanation:
          "Giọng văn lịch sự, lời giải thích có đủ ý, tóm tắt có trung thành với nguồn - những thứ này không quy được về chuỗi hay số. Đó là chỗ của mô hình chấm có rubric, bài sau. JSON lồng nhau và số tiền kiểm tất định rất tốt; bộ lớn lại càng cần bộ chấm rẻ.",
      },
    ],
    keyTakeaways: [
      "Viết bộ chấm tất định trước: miễn phí, nhanh, cùng kết quả mọi lần.",
      "Chuẩn hoá trước khi so: cắt khoảng trắng, về chữ thường, bỏ dấu phân cách số.",
      "Kiểm \"chứa\" không hiểu phủ định - ghép với \"không được chứa\".",
      "Ca lỗi hạ tầng không vào mẫu số; báo riêng.",
      "Chỉ gửi sang bộ chấm đắt những gì quy tắc không kiểm được.",
    ],
    practicePrompt: {
      question: "Bộ chấm báo tỷ lệ đạt tụt từ 88% xuống 61% sau khi đổi mô hình. Đọc 5 ca trượt thì thấy câu trả lời đều đúng nhưng viết hoa chữ đầu. Lỗi nằm ở đâu?",
      options: [
        "Bộ chấm, vì nó so chuỗi mà không chuẩn hoá hoa/thường",
        "Mô hình mới, vì nó không tuân theo định dạng chữ của mô hình cũ",
        "Bộ vàng, vì nhãn phải được viết lại bằng chữ hoa cho khớp",
        "Prompt, vì chưa dặn mô hình viết chữ thường",
      ],
      correct: 0,
      explanation:
        "Đầu ra đúng mà bị chấm trượt là lỗi của bộ chấm. Sửa bằng chuẩn hoá chứ không bằng cách bắt mô hình hay nhãn chiều theo một cách viết hoa cụ thể - nếu không, lần đổi mô hình sau bạn lại gặp đúng chuyện này. Luôn đọc vài ca trượt trước khi tin một cú tụt lớn.",
    },
    summary: {
      keyIdea: "Những gì kiểm được bằng quy tắc thì kiểm bằng quy tắc, sau khi đã chuẩn hoá đầu ra.",
      formula: "Tỷ lệ đạt = ca đạt ÷ ca đã chấm (không gồm ca lỗi hạ tầng).",
      commonMistake: "So chuỗi không chuẩn hoá, hoặc tính ca không có đầu ra vào mẫu số như ca trượt.",
      action: "Viết ba quy tắc tất định cho tính năng của bạn và chạy chúng trên bộ vàng.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Với mỗi ca trong bộ vàng, ghi ít nhất một quy tắc kiểm được bằng mã: phải chứa, không được chứa, JSON hợp lệ, hoặc độ dài tối đa. Chạy trên đầu ra hiện tại và đọc tay năm ca trượt đầu tiên.",
      secondary: "Ca nào không viết được quy tắc là ứng viên cho giám khảo LLM ở bài sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước khi nghĩ tới chuyện dùng một mô hình để chấm mô hình, hãy viết những bộ chấm rẻ nhất: vài dòng mã, không token, không dao động.",
      },
      {
        type: "conceptTable",
        title: "Sáu loại kiểm tất định",
        concepts: [
          { vi: "Khớp chính xác", en: "Exact match", def: "Đầu ra sau chuẩn hoá bằng nhãn. Hợp với phân loại, trích một giá trị." },
          { vi: "Chứa / không chứa", en: "Contains", def: "Có ý bắt buộc, không có cụm cấm." },
          { vi: "JSON hợp lệ", en: "Schema check", def: "Parse được và có đủ trường đúng kiểu." },
          { vi: "Số khớp", en: "Numeric match", def: "Rút số, bỏ dấu phân cách, so giá trị." },
          { vi: "Độ dài", en: "Length", def: "Không vượt số từ hoặc ký tự cho phép." },
          { vi: "Từ cấm", en: "Blocklist", def: "Không lộ dữ liệu nhạy cảm hay cam kết không được phép." },
        ],
      },
      {
        type: "code",
        language: "javascript",
        runnable: true,
        caption: "Chuẩn hoá trước, so sau",
        code: `const norm = (s) => s.trim().toLowerCase();
const soTien = (s) => Number(s.replace(/[^0-9]/g, ""));

console.log(norm("  Hà Nội ") === norm("hà nội"));      // true
console.log(soTien("1.250.000 đ") === soTien("1,250,000")); // true
console.log("Hà Nội" === "hà nội");                    // false - so thô`,
      },
      {
        type: "callout",
        label: "Mẫu số là ca đã chấm",
        text: "Ca bị lỗi gọi API, hết thời gian chờ hay bị giới hạn tốc độ không có đầu ra để chấm. Đừng tính chúng là trượt (oan cho mô hình) hay đạt (che lỗi). Loại khỏi mẫu số và in riêng số ca lỗi.",
      },
      {
        type: "exercise",
        language: "javascript",
        title: "Chấm một lô đầu ra",
        task: "Mỗi ca có một quy tắc: exact (khớp sau chuẩn hoá), contains (phải chứa), json (parse được), forbid (không được chứa). Sửa hàm chấm để chuẩn hoá cả hai phía (cắt khoảng trắng, về chữ thường) rồi in kết quả từng ca và tỷ lệ đạt làm tròn tới phần trăm.",
        starter: `const cases = [
  { id: "c1", rule: "exact", expected: "Hà Nội", output: "hà nội" },
  { id: "c2", rule: "contains", expected: "42", output: "Kết quả là 42" },
  { id: "c3", rule: "json", output: '{"ok": true}' },
  { id: "c4", rule: "json", output: "{ok: true}" },
  { id: "c5", rule: "exact", expected: "Đà Nẵng", output: "ĐÀ NẴNG " },
  { id: "c6", rule: "forbid", expected: "mật khẩu", output: "Mật khẩu là 1234" },
];

function pass(c) {
  if (c.rule === "exact") return c.output === c.expected;
  if (c.rule === "contains") return c.output.includes(c.expected);
  if (c.rule === "forbid") return !c.output.includes(c.expected);
  try { JSON.parse(c.output); return true; } catch { return false; }
}

let ok = 0;
for (const c of cases) {
  const p = pass(c);
  if (p) ok++;
  console.log(c.id + " " + (p ? "ĐẠT" : "TRƯỢT"));
}
console.log("Tỷ lệ đạt: " + ok + "/" + cases.length + " = " + Math.round((ok / cases.length) * 100) + "%");`,
        solution: `const cases = [
  { id: "c1", rule: "exact", expected: "Hà Nội", output: "hà nội" },
  { id: "c2", rule: "contains", expected: "42", output: "Kết quả là 42" },
  { id: "c3", rule: "json", output: '{"ok": true}' },
  { id: "c4", rule: "json", output: "{ok: true}" },
  { id: "c5", rule: "exact", expected: "Đà Nẵng", output: "ĐÀ NẴNG " },
  { id: "c6", rule: "forbid", expected: "mật khẩu", output: "Mật khẩu là 1234" },
];

const norm = (s) => s.trim().toLowerCase();

function pass(c) {
  if (c.rule === "exact") return norm(c.output) === norm(c.expected);
  if (c.rule === "contains") return norm(c.output).includes(norm(c.expected));
  if (c.rule === "forbid") return !norm(c.output).includes(norm(c.expected));
  try { JSON.parse(c.output); return true; } catch { return false; }
}

let ok = 0;
for (const c of cases) {
  const p = pass(c);
  if (p) ok++;
  console.log(c.id + " " + (p ? "ĐẠT" : "TRƯỢT"));
}
console.log("Tỷ lệ đạt: " + ok + "/" + cases.length + " = " + Math.round((ok / cases.length) * 100) + "%");`,
        expectedOutput: `c1 ĐẠT
c2 ĐẠT
c3 ĐẠT
c4 TRƯỢT
c5 ĐẠT
c6 TRƯỢT
Tỷ lệ đạt: 4/6 = 67%`,
        hints: [
          "Viết một hàm norm(s) = s.trim().toLowerCase() và áp cho cả output lẫn expected.",
          "Ca c6 phải TRƯỢT: \"Mật khẩu\" viết hoa vẫn là từ cấm - không chuẩn hoá thì nó lọt.",
        ],
      },
      {
        type: "paragraph",
        text: "Để ý ca c6: bản không chuẩn hoá cho qua một đầu ra lộ mật khẩu chỉ vì chữ M viết hoa. Lỗi so thô không chỉ làm điểm thấp oan - với từ cấm, nó làm điểm cao oan, và đó là chiều nguy hiểm hơn.",
      },
      {
        type: "comparison",
        left: { label: "Bộ chấm tất định", text: "Miễn phí, tức thì, cùng kết quả mọi lần, lý do trượt rõ ràng. Không hiểu nghĩa, không hiểu phủ định." },
        right: { label: "Bộ chấm bằng mô hình", text: "Hiểu được giọng văn, độ đầy đủ ý. Tốn token, dao động, có thiên lệch và cần được hiệu chỉnh." },
      },
      {
        type: "closing",
        lines: [
          "Quy tắc rẻ chạy trước, bộ chấm đắt chỉ nhận phần còn lại.",
          "Bài sau: khi cần hiểu nghĩa - dùng LLM làm giám khảo mà không bị nó lừa.",
        ],
      },
    ],
  },
  {
    id: 1893,
    slug: "llm-lam-giam-khao",
    title: "Evals, Bài 4: LLM làm giám khảo (LLM-as-judge)",
    subtitle: "Rubric rõ, thang nhỏ, so cặp - và luôn hiệu chỉnh với nhãn người trước khi tin điểm.",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Những gì quan trọng nhất với người dùng - câu trả lời có đúng trọng tâm, có trung thành với tài liệu, có lịch sự - thường không kiểm được bằng quy tắc. Dùng một mô hình chấm mở rộng được việc đó, nhưng giám khảo cũng là một LLM: nó có thiên lệch, và nếu chưa đo độ đồng thuận với người thì điểm nó cho chỉ là một con số trông có vẻ khách quan.",
    openingQuestion:
      "Bạn nhờ mô hình chấm \"câu trả lời này hay tới mức nào, từ 1 tới 10\" cho 200 đầu ra. Vấn đề lớn nhất của cách này là gì?",
    openingOptions: [
      "Thang 10 mức không có tiêu chí, nên điểm dao động và khó so giữa các lần",
      "Mô hình không đọc được câu trả lời dài hơn khoảng 100 từ nên chấm sai hết",
      "Chấm 200 đầu ra sẽ vượt giới hạn ngữ cảnh của mọi mô hình hiện có",
      "Mô hình sẽ luôn cho 10 điểm vì nó được huấn luyện để lịch sự với người",
    ],
    correctOption: 0,
    explanation:
      "\"Hay\" không có định nghĩa, và khác biệt giữa 6 với 7 không nghĩa là gì cụ thể - nên cùng một đầu ra có thể nhận 6 lần này và 8 lần sau, và giữa hai phiên bản prompt bạn không biết chênh lệch là thật hay nhiễu. Rubric có tiêu chí rõ và thang nhỏ (đạt/không đạt, hoặc 1-3) cho kết quả ổn định hơn nhiều. Mỗi đầu ra được chấm trong một lần gọi riêng nên giới hạn ngữ cảnh không phải vấn đề; và giám khảo không luôn cho điểm tối đa, dù có xu hướng rộng tay.",
    diagram: [
      { label: "Viết rubric: tiêu chí cụ thể, thang nhỏ", arrow: true },
      { label: "Người gắn nhãn một mẫu 50-100 ca", arrow: true },
      { label: "Giám khảo chấm cùng mẫu, đo độ đồng thuận", arrow: true },
      { label: "Đủ đồng thuận mới dùng giám khảo cho cả bộ" },
    ],
    realWorldExample: {
      company: "Chatbot trả lời dựa trên tài liệu nội bộ",
      description:
        "Nhóm cần kiểm \"câu trả lời chỉ dùng thông tin có trong đoạn truy xuất\". Họ viết rubric hai mức với ba ví dụ mỗi mức, cho hai kỹ sư gắn nhãn 80 ca, rồi so với giám khảo. Lần đầu giám khảo đồng ý 71%; đọc các ca bất đồng thấy nó cho đạt khi câu trả lời thêm kiến thức chung. Sửa rubric nói rõ điều đó, đo lại, rồi mới dùng.",
    },
    quiz: [
      {
        question: "Rubric nào cho giám khảo LLM kết quả ổn định nhất?",
        options: [
          "Đạt nếu mọi số liệu đều có trong tài liệu nguồn",
          "Chấm 1-10 theo mức độ hữu ích với người dùng cuối",
          "Cho biết câu trả lời có tốt không và giải thích lý do",
          "Chấm 1-100 để phân biệt khác biệt nhỏ",
        ],
        correct: 0,
        explanation:
          "Tiêu chí cụ thể, kiểm được, thang hai mức: hai lần chấm dễ ra cùng kết quả và bạn đọc được vì sao trượt. \"Hữu ích\" và \"tốt\" để giám khảo tự định nghĩa. Thang 1-100 không làm phép đo tinh hơn - nó chỉ thêm chỗ cho dao động giữa các mức kề nhau.",
      },
      {
        question: "Khi so cặp hai câu trả lời A và B, cách chống thiên lệch vị trí là gì?",
        options: [
          "Chấm hai lần, đổi thứ tự A và B, chỉ tính khi hai lần cùng kết luận",
          "Luôn đặt câu trả lời của phiên bản mới ở vị trí đầu tiên để dễ theo dõi",
          "Đặt temperature giám khảo bằng 0 để hết lệch thứ tự",
          "Bỏ tên A và B, chỉ đánh số 1 và 2 thì giám khảo không còn thiên lệch",
        ],
        correct: 0,
        explanation:
          "Giám khảo LLM có xu hướng ưu tiên một vị trí (thường là vị trí đầu) bất kể nội dung. Chấm cả hai thứ tự và chỉ tính ca nhất quán loại được hiệu ứng đó; ca đổi kết luận theo thứ tự thì coi là hoà. Temperature 0 làm thiên lệch ổn định hơn chứ không xoá nó; đổi nhãn A/B thành 1/2 không thay đổi gì.",
      },
      {
        question: "Giám khảo dùng cùng họ mô hình với hệ thống đang được chấm. Rủi ro nào cần đo?",
        options: [
          "Tự thiên vị: nó có thể ưu ái câu trả lời theo văn phong của chính nó",
          "Mô hình cùng họ không được phép chấm nhau theo điều khoản sử dụng",
          "Giám khảo sẽ nhận ra câu trả lời của mình và luôn từ chối chấm chúng",
          "Chi phí gọi API tăng gấp đôi vì hai mô hình cùng họ chia hạn mức",
        ],
        correct: 0,
        explanation:
          "Giám khảo có thể cho điểm cao hơn với văn bản giống cách nó tự viết - nghĩa là khi so hai hệ thống, hệ thống cùng họ với giám khảo được lợi. Không bắt buộc phải đổi giám khảo, nhưng phải đo bằng nhãn người: nếu giám khảo lệch khỏi người ở đúng chiều đó thì biết. Hai phương án về điều khoản và hạn mức không phải cơ chế có thật.",
      },
      {
        question: "Giám khảo và người cùng chấm 40 ca có đủ nhãn: đồng ý 34 ca. Có thêm 10 ca người chưa gắn nhãn. Tỷ lệ đồng thuận là bao nhiêu?",
        options: [
          "85% (= 34 ÷ 40, chỉ ca có đủ hai nhãn)",
          "68% (= 34 ÷ 50, tính cả ca thiếu nhãn là bất đồng)",
          "88% (= 44 ÷ 50, tính ca thiếu nhãn là đồng ý)",
          "80% (= 40 ÷ 50, số ca có nhãn trên tổng số ca)",
        ],
        correct: 0,
        explanation:
          "Đồng thuận chỉ đo được trên ca có cả hai nhãn: 34 ÷ 40 = 85%. Ca thiếu nhãn người không cho biết gì về việc giám khảo đúng hay sai - tính chúng là bất đồng hay đồng ý đều bịa dữ liệu. Báo riêng số ca thiếu nhãn để biết mẫu có đủ lớn không.",
      },
      {
        question: "Giám khảo đạt 92% đồng thuận với người, nhưng mẫu có 90% ca \"đạt\". Nên nghĩ gì?",
        options: [
          "92% gần với mức một giám khảo luôn nói \"đạt\" cũng có",
          "92% là rất cao, có thể dùng giám khảo ngay cho mọi tính năng khác",
          "Cần tăng thang điểm lên 1-10 để tỷ lệ đồng thuận tăng thêm nữa",
          "Bỏ các ca \"đạt\" khỏi mẫu, chỉ chấm ca khó",
        ],
        correct: 0,
        explanation:
          "Khi 90% ca là \"đạt\", một giám khảo chỉ biết nói \"đạt\" đã đồng thuận 90%. Cần xem riêng: trong các ca người chấm trượt, giám khảo bắt được bao nhiêu - đó mới là việc bạn cần nó làm. Các chỉ số như Cohen's kappa trừ đi phần đồng thuận do may rủi vì chính lý do này. Kết quả đo trên một tính năng không chuyển sang tính năng khác.",
      },
    ],
    keyTakeaways: [
      "Rubric cụ thể, thang nhỏ (đạt/không đạt hoặc 1-3), kèm ví dụ cho mỗi mức.",
      "So cặp chấm cả hai thứ tự để khử thiên lệch vị trí.",
      "Coi chừng thiên lệch độ dài và tự thiên vị của giám khảo.",
      "Hiệu chỉnh trên một mẫu có nhãn người; chỉ tính ca có đủ hai nhãn.",
      "Nhìn riêng các ca người chấm trượt - tỷ lệ chung có thể che giám khảo dễ dãi.",
    ],
    practicePrompt: {
      question: "Giám khảo liên tục cho câu trả lời dài điểm cao hơn, kể cả khi người chấm thấy câu ngắn đủ ý hơn. Nên sửa thế nào?",
      options: [
        "Ghi rõ trong rubric rằng độ dài không phải tiêu chí, rồi đo lại với nhãn người",
        "Cắt mọi câu trả lời về cùng một độ dài trước khi đưa cho giám khảo chấm",
        "Đổi thang điểm từ 1-3 lên 1-10 để giám khảo phân biệt được tinh hơn",
        "Bỏ giám khảo và chuyển sang chỉ kiểm độ dài bằng quy tắc tất định",
      ],
      correct: 0,
      explanation:
        "Thiên lệch độ dài là một thiên lệch đã biết của giám khảo LLM. Nói rõ trong rubric, thêm ví dụ một câu ngắn đạt và một câu dài trượt, rồi đo lại độ đồng thuận để biết đã sửa được chưa. Cắt câu trả lời làm mất nội dung cần chấm; thang to hơn không chữa thiên lệch.",
    },
    summary: {
      keyIdea: "Giám khảo LLM mở rộng được việc chấm theo nghĩa, nhưng chỉ đáng tin sau khi được hiệu chỉnh với nhãn người.",
      formula: "Đồng thuận = số ca giám khảo và người cùng kết luận ÷ số ca có đủ hai nhãn.",
      commonMistake: "Dùng mô hình chấm theo thang 1-10 không rubric, không đo với người, rồi tin điểm như đo lường khách quan.",
      action: "Gắn nhãn tay 50 ca, chạy giám khảo trên cùng 50 ca, đọc từng ca hai bên bất đồng.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một tiêu chí quy tắc không kiểm được (ví dụ: chỉ dùng thông tin có trong tài liệu). Viết rubric hai mức với hai ví dụ mỗi mức. Tự gắn nhãn 30 ca, chạy giám khảo, tính đồng thuận và đọc các ca lệch.",
      secondary: "Bài sau đưa cả bộ chấm tất định lẫn giám khảo vào CI.",
    },
    sections: [
      {
        type: "lead",
        text: "Một số thứ chỉ đọc hiểu mới chấm được. Dùng một mô hình khác làm giám khảo giải quyết được việc đó ở quy mô lớn - với điều kiện bạn đo xem giám khảo có đồng ý với người hay không.",
      },
      { type: "heading", text: "Ba cách hỏi giám khảo" },
      {
        type: "list",
        items: [
          "Chấm tuyệt đối theo rubric: \"Câu trả lời có chỉ dùng thông tin trong tài liệu không? Đạt / Không đạt.\" Hợp để theo dõi một tiêu chí theo thời gian.",
          "So cặp (pairwise): \"A hay B tốt hơn theo tiêu chí X?\" Hợp khi so hai phiên bản prompt hay mô hình, vì so sánh thường ổn định hơn chấm điểm tuyệt đối.",
          "So với đáp án tham chiếu: \"Câu trả lời có cùng ý với đáp án mẫu không?\" Hợp khi bộ vàng đã có đáp án viết sẵn.",
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Một prompt giám khảo: tiêu chí hẹp, thang hai mức, bắt nêu bằng chứng trước khi kết luận",
        code: `Bạn chấm MỘT tiêu chí: câu trả lời chỉ dùng thông tin có trong TÀI LIỆU.

TÀI LIỆU:
{doan_truy_xuat}

CÂU TRẢ LỜI:
{dau_ra}

Quy tắc:
- Mọi con số, ngày, tên riêng trong câu trả lời phải có trong tài liệu.
- Độ dài và văn phong KHÔNG phải tiêu chí.
- Nếu câu trả lời nói "không đủ thông tin" và tài liệu đúng là thiếu: ĐẠT.

Trả về JSON: {"bang_chung": "<chỗ không có trong tài liệu, hoặc rỗng>",
              "ket_luan": "DAT" | "KHONG_DAT"}`,
      },
      {
        type: "conceptTable",
        title: "Thiên lệch đã biết của giám khảo",
        concepts: [
          { vi: "Thiên lệch vị trí", en: "Position bias", def: "Ưu tiên phương án đứng trước (hoặc sau) khi so cặp." },
          { vi: "Thiên lệch độ dài", en: "Verbosity bias", def: "Cho điểm cao hơn câu dài, kể cả khi không thêm ý." },
          { vi: "Tự thiên vị", en: "Self-preference", def: "Ưu ái văn bản giống cách chính nó viết." },
          { vi: "Dễ dãi", en: "Leniency", def: "Có xu hướng cho đạt khi tiêu chí mơ hồ." },
        ],
      },
      {
        type: "callout",
        label: "Hiệu chỉnh trước khi tin",
        text: "Cho một hai người gắn nhãn 50-100 ca theo cùng rubric, chạy giám khảo trên cùng các ca đó, rồi đọc từng ca bất đồng. Phần lớn bất đồng chỉ ra một chỗ rubric mơ hồ; sửa rubric và đo lại. Đổi mô hình giám khảo là phải đo lại.",
      },
      {
        type: "exercise",
        language: "python",
        title: "Tỷ lệ đồng thuận giám khảo - người",
        task: "Mỗi cặp là (kết luận giám khảo, nhãn người). Nhãn người có thể là None khi chưa ai gắn. Sửa đoạn mã để chỉ tính đồng thuận trên ca có nhãn người, và in số ca bị bỏ qua. Làm tròn phần trăm tới số nguyên.",
        starter: `pairs = [
    ("dat", "dat"), ("dat", "truot"), ("truot", "truot"), ("dat", None),
    ("truot", "truot"), ("dat", "dat"), ("truot", None), ("dat", "dat"),
]

co_nhan = len(pairs)
bo_qua = 0
dong_y = 0
for giam_khao, nguoi in pairs:
    if giam_khao == nguoi:
        dong_y += 1

print(f"Có nhãn: {co_nhan}")
print(f"Bỏ qua (thiếu nhãn): {bo_qua}")
print(f"Đồng thuận: {dong_y}/{co_nhan} = {dong_y / co_nhan * 100:.0f}%")`,
        solution: `pairs = [
    ("dat", "dat"), ("dat", "truot"), ("truot", "truot"), ("dat", None),
    ("truot", "truot"), ("dat", "dat"), ("truot", None), ("dat", "dat"),
]

co_nhan = 0
bo_qua = 0
dong_y = 0
for giam_khao, nguoi in pairs:
    if nguoi is None:
        bo_qua += 1
        continue
    co_nhan += 1
    if giam_khao == nguoi:
        dong_y += 1

print(f"Có nhãn: {co_nhan}")
print(f"Bỏ qua (thiếu nhãn): {bo_qua}")
print(f"Đồng thuận: {dong_y}/{co_nhan} = {dong_y / co_nhan * 100:.0f}%")`,
        expectedOutput: `Có nhãn: 6
Bỏ qua (thiếu nhãn): 2
Đồng thuận: 5/6 = 83%`,
        hints: [
          "Ca có nhãn người None không phải bất đồng - nó chưa được đo.",
          "Đếm co_nhan trong vòng lặp thay vì lấy len(pairs).",
        ],
      },
      {
        type: "paragraph",
        text: "Bản gốc cho 62%: nó tính hai ca chưa có nhãn là bất đồng. Một giám khảo tốt trông như kém đi chỉ vì người gắn nhãn chưa làm xong - và ai đó có thể vì con số ấy mà bỏ một giám khảo đang chạy đúng.",
      },
      {
        type: "closing",
        lines: [
          "Giám khảo LLM là một bộ chấm cần được kiểm thử như mọi bộ chấm khác.",
          "Bài sau: đưa eval vào CI để nó chạy mỗi lần đổi prompt hay mô hình.",
        ],
      },
    ],
  },
  {
    id: 1894,
    slug: "eval-trong-ci",
    title: "Evals, Bài 5: Đưa eval vào CI",
    subtitle: "Chạy khi đổi prompt hay mô hình, so với bản trước theo từng nhóm, lưu kết quả để còn so.",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🚦",
    track: "professional",
    whyItMatters:
      "Eval chỉ chạy khi có người nhớ chạy thì sớm muộn sẽ không ai chạy. Đưa nó vào pipeline CI biến nó thành một cổng: đổi prompt, đổi mô hình hay đổi tài liệu truy xuất đều phải qua, và một nhóm tụt điểm sẽ chặn bản phát hành thay vì lộ ra ở khiếu nại của khách.",
    openingQuestion:
      "Bản prompt mới: điểm chung 90% so với 91% bản cũ, nhưng nhóm \"phải từ chối\" từ 95% xuống 80%. Cổng CI nên làm gì?",
    openingOptions: [
      "Chặn, vì một nhóm quan trọng tụt quá ngưỡng cho phép dù điểm chung gần như giữ nguyên",
      "Cho qua, vì điểm chung chỉ giảm 1 điểm (= 91 − 90), nằm trong mức dao động bình thường",
      "Cho qua, vì nhóm từ chối ít ca nên tụt 15 điểm (= 95 − 80) chỉ là nhiễu thống kê",
      "Chạy lại tới khi nhóm từ chối lên lại 95% rồi cho qua với kết quả của lần chạy đó",
    ],
    correctOption: 0,
    explanation:
      "Điểm chung là trung bình có trọng số theo số ca; một nhóm nhỏ tụt mạnh có thể gần như không làm nó nhúc nhích. Vì thế cổng phải so theo từng nhóm, và các nhóm rủi ro cao như ca phải từ chối nên có ngưỡng chặt. Nếu nhóm đó quá ít ca để phân biệt với nhiễu thì việc cần làm là thêm ca, không phải cho qua. Chạy lại tới khi ra số đẹp là tắt cổng mà vẫn giữ đèn xanh.",
    diagram: [
      { label: "Pull request đổi prompt, mô hình hoặc bộ truy xuất", arrow: true },
      { label: "CI chạy bộ vàng: quy tắc, rồi giám khảo", arrow: true },
      { label: "So từng nhóm với kết quả đã lưu của bản chính", arrow: true },
      { label: "Tụt quá ngưỡng thì chặn; không thì lưu kết quả mới" },
    ],
    realWorldExample: {
      company: "Nhóm nền tảng AI của một công ty phần mềm",
      description:
        "Mọi thay đổi trong thư mục prompt kích hoạt một job CI chạy 300 ca: quy tắc tất định cho cả 300, giám khảo cho 120 ca cần hiểu nghĩa. Kết quả mỗi lần chạy trên nhánh chính được lưu thành tệp JSON có mã commit. Pull request được bình luận tự động một bảng so từng nhóm, và bị chặn nếu nhóm nào tụt quá 3 điểm.",
    },
    quiz: [
      {
        question: "Thay đổi nào nên kích hoạt chạy lại eval trong CI?",
        options: [
          "Đổi prompt, đổi mô hình, đổi tham số hay đổi dữ liệu truy xuất",
          "Chỉ khi đổi mô hình, vì prompt nhỏ nên không đổi hành vi nhiều",
          "Chỉ khi có người dùng khiếu nại về chất lượng câu trả lời gần đây",
          "Mỗi khi có bất kỳ commit nào, kể cả khi chỉ sửa CSS giao diện",
        ],
        correct: 0,
        explanation:
          "Bất cứ thứ gì đi vào lời gọi mô hình đều có thể đổi hành vi: prompt, phiên bản mô hình, temperature, tài liệu truy xuất, định nghĩa công cụ. Đợi khiếu nại là quay về thử bằng khách hàng. Chạy eval cho commit chỉ sửa CSS thì tốn tiền mà không đo gì - lọc theo đường dẫn tệp.",
      },
      {
        question: "Vì sao cổng CI nên so với kết quả của bản trước thay vì chỉ một ngưỡng cố định?",
        options: [
          "Để bắt tụt nhỏ ở nhóm đang cao, dù vẫn trên ngưỡng",
          "Vì ngưỡng cố định không cài được trong các hệ thống CI",
          "Vì so với bản trước thì không cần bộ dữ liệu vàng nữa",
          "Để mỗi lần chạy hạ ngưỡng theo điểm mới",
        ],
        correct: 0,
        explanation:
          "Nhóm đang ở 97% mà tụt xuống 91% vẫn vượt ngưỡng 85%, nhưng đó là hồi quy thật cần biết. Tốt nhất dùng cả hai: một sàn tuyệt đối và một mức tụt tối đa so với bản chính. So với bản trước vẫn cần cùng bộ vàng; và ngưỡng chỉ được nâng lên, không hạ theo điểm mới.",
      },
      {
        question: "Bộ 400 ca, mỗi ca giám khảo dùng khoảng 1.500 token, giá giả định 2 USD/1 triệu token. Mỗi lần chạy giám khảo tốn khoảng bao nhiêu?",
        options: [
          "1,2 USD (= 400 × 1.500 ÷ 1.000.000 × 2)",
          "12 USD (= 400 × 1.500 ÷ 100.000 × 2, sai số chữ số 0)",
          "0,6 USD (= 400 × 1.500 ÷ 10⁶, quên nhân giá)",
          "1.200 USD (= 400 × 1.500 × 2 ÷ 1.000, chia sai đơn vị)",
        ],
        correct: 0,
        explanation:
          "400 × 1.500 = 600.000 token = 0,6 triệu token; nhân 2 USD được 1,2 USD mỗi lần chạy (giá giả định - giá thật đổi theo nhà cung cấp và mô hình). Nhỏ với một lần, nhưng chạy trên mọi commit của mười kỹ sư thì cộng lại đáng kể - lý do để chạy quy tắc trước và chỉ gọi giám khảo cho ca cần.",
      },
      {
        question: "Vì sao cần lưu kết quả từng ca của mỗi lần chạy, không chỉ điểm tổng?",
        options: [
          "Để biết chính xác ca nào đổi từ đạt sang trượt giữa hai bản",
          "Vì hệ thống CI xoá điểm tổng sau mỗi lần chạy xong job",
          "Để giám khảo học từ kết quả cũ và chấm chính xác hơn",
          "Vì lưu điểm tổng thôi thì tốn dung lượng hơn lưu từng ca",
        ],
        correct: 0,
        explanation:
          "Điểm tổng giữ nguyên có thể che năm ca mới trượt và năm ca mới đạt. Có kết quả từng ca kèm mã commit thì bạn liệt kê được đúng các ca đổi chiều và đọc chúng. Giám khảo không học từ kết quả lưu; và việc lưu là để truy vết, không phải để tiết kiệm dung lượng.",
      },
      {
        question: "Eval chạy mất 25 phút và làm chậm mọi pull request. Cách giảm hợp lý là gì?",
        options: [
          "Chạy tập nhỏ nhanh trên mỗi PR, chạy đủ bộ trước khi phát hành",
          "Bỏ nhóm ca phải từ chối vì chúng ít khi đổi kết quả giữa các bản",
          "Hạ ngưỡng xuống để job kết thúc sớm hơn khi có ca đầu tiên trượt",
          "Chỉ chạy eval mỗi quý một lần, vào tuần trước khi họp tổng kết",
        ],
        correct: 0,
        explanation:
          "Một tập con đại diện (có đủ các nhóm, kể cả ca từ chối) chạy nhanh trên mỗi PR, còn bộ đầy đủ chạy trước khi phát hành hoặc hằng đêm. Chạy song song các lời gọi cũng giúp. Bỏ nhóm từ chối là bỏ đúng nhóm hay hỏng nhất; ngưỡng không quyết định thời gian chạy; mỗi quý một lần là quay lại không có cổng.",
      },
    ],
    keyTakeaways: [
      "Mọi thứ đi vào lời gọi mô hình đều là lý do chạy lại eval.",
      "So từng nhóm với bản chính đã lưu, không chỉ điểm chung.",
      "Dùng cả sàn tuyệt đối lẫn mức tụt tối đa; ngưỡng chỉ nâng, không hạ.",
      "Lưu kết quả từng ca kèm mã commit để liệt kê được ca đổi chiều.",
      "Kiểm soát chi phí: quy tắc trước, giám khảo sau, tập nhỏ cho mỗi PR.",
    ],
    practicePrompt: {
      question: "Một kỹ sư đề xuất: \"Cổng eval đỏ hoài vì dao động, hạ mức tụt cho phép từ 3 xuống 10 điểm cho đỡ phiền.\" Phản hồi tốt nhất?",
      options: [
        "Đo độ dao động bằng cách chạy bản chính vài lần, rồi thêm ca cho nhóm nhiễu",
        "Đồng ý, vì cổng đỏ quá thường xuyên thì không ai còn tin nó nữa cả",
        "Tắt cổng tạm thời trong một tháng rồi xem xét lại khi rảnh hơn",
        "Giữ nguyên 3 điểm và yêu cầu mọi người chạy lại tới khi ra màu xanh",
      ],
      correct: 0,
      explanation:
        "Cổng đỏ vì nhiễu là vấn đề thật, nhưng cách chữa là biết nhiễu lớn cỡ nào (chạy cùng một bản vài lần) và giảm nó (thêm ca, chạy mỗi ca vài lần), không phải nới ngưỡng tới mức bỏ lọt hồi quy thật. Chạy lại tới khi xanh là tắt cổng mà không nói ra.",
    },
    summary: {
      keyIdea: "Eval trong CI là một cổng: mọi thay đổi đầu vào của mô hình phải qua, so theo nhóm với bản đã lưu.",
      formula: "Chặn khi: điểm nhóm < sàn, hoặc điểm nhóm < điểm bản chính − mức tụt cho phép.",
      commonMistake: "Chỉ nhìn điểm chung, nên một nhóm nhỏ quan trọng tụt mạnh mà cổng vẫn xanh.",
      action: "Viết một script chạy bộ vàng, ghi JSON kết quả từng ca, và so với tệp của lần chạy trước.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Thêm một job CI chỉ chạy khi thư mục prompt thay đổi. Nó chạy bộ chấm tất định, ghi kết quả ra JSON, so từng nhóm với tệp đã lưu của nhánh chính, và thoát mã 1 nếu nhóm nào tụt quá 3 điểm.",
      secondary: "Bài cuối: eval không dừng lại ở ngày ra mắt.",
    },
    sections: [
      {
        type: "lead",
        text: "Đã có bộ vàng, có bộ chấm tất định, có giám khảo đã hiệu chỉnh. Bước cuối để eval thật sự bảo vệ hệ thống là cho nó chạy tự động - và cho nó quyền chặn.",
      },
      { type: "heading", text: "Khi nào chạy" },
      {
        type: "list",
        items: [
          "Đổi tệp prompt hoặc mẫu prompt.",
          "Đổi mô hình hoặc phiên bản mô hình, kể cả khi nhà cung cấp nói bản mới \"tốt hơn\".",
          "Đổi tham số: temperature, số token tối đa, top-k của bộ truy xuất.",
          "Đổi dữ liệu: tài liệu mới vào kho truy xuất, định nghĩa công cụ mới cho agent.",
        ],
      },
      {
        type: "code",
        language: "bash",
        caption: "Job CI tối thiểu: chạy, so với bản chính, chặn nếu tụt",
        code: `# chỉ chạy khi prompts/ hoặc cấu hình mô hình thay đổi
node evals/run.mjs --bo evals/golden.jsonl --ra ket-qua/pr.json
node evals/so-sanh.mjs --goc ket-qua/main.json --moi ket-qua/pr.json \\
  --tut-toi-da 3 --san tu_choi=90
# so-sanh.mjs thoát mã 1 nếu có nhóm vi phạm -> CI đỏ, PR bị chặn`,
      },
      {
        type: "code",
        language: "json",
        caption: "Báo cáo so sánh mà job ghi ra và bình luận vào PR",
        code: `{
  "commit_goc": "a1b2c3d",
  "commit_moi": "e4f5a6b",
  "nhom": {
    "tra_cuu": { "goc": 90, "moi": 94, "chenh": 4 },
    "tu_choi": { "goc": 95, "moi": 84, "chenh": -11, "vi_pham": "tut > 3" },
    "json":    { "goc": 88, "moi": 92, "chenh": 4 }
  },
  "ca_doi_chieu": ["tc-04", "tc-11", "tc-19"],
  "ket_luan": "CHAN"
}`,
      },
      {
        type: "paragraph",
        text: "Điểm trung bình ba nhóm đi từ 91 xuống 90 - gần như không đổi. Chính vì thế báo cáo phải theo nhóm và liệt kê các ca đổi chiều: người duyệt PR mở ba ca đó ra đọc là biết prompt mới làm hỏng gì.",
      },
      {
        type: "exercise",
        language: "javascript",
        title: "Cổng hồi quy theo nhóm",
        task: "So điểm từng nhóm giữa bản gốc và bản mới. In mỗi nhóm một dòng (đánh dấu TỤT nếu giảm quá mức cho phép), rồi kết luận CHẶN nếu có nhóm nào TỤT, ngược lại CHO QUA. Bản hiện tại chỉ so điểm trung bình - sửa để kết luận dựa trên từng nhóm.",
        starter: `const goc = { tra_cuu: 90, tu_choi: 95, json: 88 };
const moi = { tra_cuu: 94, tu_choi: 84, json: 92 };
const TUT_TOI_DA = 3;

const tb = (o) => Object.values(o).reduce((a, b) => a + b, 0) / Object.keys(o).length;
for (const k of Object.keys(goc)) {
  const d = moi[k] - goc[k];
  const tut = d < -TUT_TOI_DA;
  console.log(k + ": " + goc[k] + " -> " + moi[k] + " (" + (d >= 0 ? "+" : "") + d + ")" + (tut ? " TỤT" : ""));
}
const chan = tb(moi) < tb(goc) - TUT_TOI_DA;
console.log("Kết luận: " + (chan ? "CHẶN" : "CHO QUA"));`,
        solution: `const goc = { tra_cuu: 90, tu_choi: 95, json: 88 };
const moi = { tra_cuu: 94, tu_choi: 84, json: 92 };
const TUT_TOI_DA = 3;

let chan = false;
for (const k of Object.keys(goc)) {
  const d = moi[k] - goc[k];
  const tut = d < -TUT_TOI_DA;
  if (tut) chan = true;
  console.log(k + ": " + goc[k] + " -> " + moi[k] + " (" + (d >= 0 ? "+" : "") + d + ")" + (tut ? " TỤT" : ""));
}
console.log("Kết luận: " + (chan ? "CHẶN" : "CHO QUA"));`,
        expectedOutput: `tra_cuu: 90 -> 94 (+4)
tu_choi: 95 -> 84 (-11) TỤT
json: 88 -> 92 (+4)
Kết luận: CHẶN`,
        hints: [
          "Trung bình đi từ 91 xuống 90, chỉ giảm 1 điểm - nên bản gốc cho qua.",
          "Đặt một cờ chan = true ngay khi gặp nhóm TỤT trong vòng lặp.",
        ],
      },
      {
        type: "callout",
        label: "Chi phí là một phần của thiết kế",
        text: "Quy tắc tất định chạy mọi ca, gần như miễn phí. Giám khảo chỉ chạy cho ca cần hiểu nghĩa. Trên mỗi PR chạy một tập con đại diện; bộ đầy đủ chạy hằng đêm hoặc trước phát hành. Ghi chi phí mỗi lần chạy vào báo cáo để nó không lớn lên âm thầm.",
      },
      {
        type: "comparison",
        left: { label: "Sàn tuyệt đối", text: "\"Nhóm từ chối không bao giờ dưới 90%.\" Bảo vệ mức tối thiểu chấp nhận được." },
        right: { label: "Mức tụt tối đa", text: "\"Không nhóm nào tụt quá 3 điểm so với bản chính.\" Bắt hồi quy ở nhóm đang cao hơn sàn nhiều." },
      },
      {
        type: "closing",
        lines: [
          "Một eval không có quyền chặn chỉ là một báo cáo không ai đọc.",
          "Bài cuối: khi hệ thống đã ra mắt, dữ liệu thật trở thành nguồn ca mới.",
        ],
      },
    ],
  },
  {
    id: 1895,
    slug: "danh-gia-sau-khi-ra-mat",
    title: "Evals, Bài 6: Đánh giá sau khi ra mắt",
    subtitle: "Phản hồi người dùng, lấy mẫu log để chấm, theo dõi trôi chất lượng, và đưa ca lỗi thật về bộ vàng.",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📡",
    track: "professional",
    whyItMatters:
      "Bộ vàng chỉ chứa những gì bạn đã nghĩ tới trước ngày ra mắt. Người dùng thật sẽ hỏi những thứ khác, dữ liệu truy xuất sẽ thay đổi, và nhà cung cấp có thể cập nhật mô hình. Không đo sau ra mắt thì chất lượng trôi dần mà eval trong CI vẫn xanh - vì nó đang kiểm những câu hỏi của tháng trước.",
    openingQuestion:
      "Tỷ lệ nút \"không hữu ích\" tăng từ 4% lên 9% trong hai tuần, trong khi eval CI vẫn xanh. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Đọc một mẫu các lượt bị chê để xem chúng thuộc loại yêu cầu nào",
      "Sửa prompt ngay theo phỏng đoán rồi chờ xem tỷ lệ chê có giảm xuống",
      "Bỏ qua, vì eval trong CI vẫn xanh nên hệ thống không thể tệ đi được",
      "Đổi sang mô hình mới nhất của nhà cung cấp để nâng chất lượng chung",
    ],
    correctOption: 0,
    explanation:
      "Eval xanh mà người dùng chê nhiều hơn nghĩa là có thứ bộ vàng không chứa: một loại câu hỏi mới, tài liệu mới vào kho truy xuất, hay một thay đổi phía mô hình. Đọc một mẫu các lượt bị chê cho biết đó là gì. Sửa prompt theo phỏng đoán là quay về thử vài câu. Đổi mô hình khi chưa biết nguyên nhân có thể làm tệ thêm ở chỗ khác.",
    diagram: [
      { label: "Log và phản hồi người dùng (đã che PII)", arrow: true },
      { label: "Lấy mẫu có chủ đích, chấm bằng quy tắc và giám khảo", arrow: true },
      { label: "Theo dõi điểm theo tuần, cảnh báo khi trôi", arrow: true },
      { label: "Ca lỗi thật có nhãn đi vào bộ vàng" },
    ],
    realWorldExample: {
      company: "Trợ lý tra cứu chính sách cho nhân viên",
      description:
        "Sau khi công ty ban hành quy định làm việc từ xa mới, tỷ lệ chê tăng vọt ở các câu hỏi về chủ đề đó: kho truy xuất vẫn chứa bản cũ. Bộ vàng không có câu nào về quy định mới vì nó chưa tồn tại lúc dựng bộ. Nhóm cập nhật kho, rồi thêm 15 câu từ log vào bộ vàng để lần sau CI bắt được.",
    },
    quiz: [
      {
        question: "Vì sao chỉ dựa vào nút like/dislike là không đủ?",
        options: [
          "Rất ít người bấm, và người bấm lệch về phía đang bực",
          "Vì like/dislike không lưu được vào cơ sở dữ liệu",
          "Vì người dùng luôn bấm like dù câu trả lời có sai",
          "Vì mô hình tự đọc và chỉnh theo lượt dislike mới",
        ],
        correct: 0,
        explanation:
          "Phản hồi tường minh thường chỉ đến từ một phần nhỏ lượt, và lệch về người đang khó chịu - nên nó là tín hiệu cảnh báo tốt nhưng không phải phép đo đại diện. Kết hợp với tín hiệu ngầm (người dùng sửa tay, hỏi lại, bỏ đi) và việc lấy mẫu log để chấm chủ động. Mô hình không tự chỉnh theo nút bấm.",
      },
      {
        question: "Người dùng sửa tay bản nháp email do hệ thống viết trước khi gửi. Tín hiệu này có giá trị gì?",
        options: [
          "Khoảng cách giữa bản nháp và bản gửi cho thấy mô hình sai ở đâu",
          "Không có giá trị, vì người dùng sửa theo sở thích cá nhân của họ",
          "Chỉ dùng được để tính số từ trung bình của các email người dùng gửi",
          "Là bằng chứng hệ thống đang chạy tốt vì người dùng vẫn dùng bản nháp",
        ],
        correct: 0,
        explanation:
          "Bản sửa tay là một dạng nhãn miễn phí: người dùng vừa viết ra câu trả lời họ muốn. Đo mức sửa (nhiều hay ít) cho một chỉ số chất lượng ngầm; đọc các bản sửa nhiều cho biết lỗi lặp lại. Có phần sửa theo sở thích, nhưng lỗi hệ thống sẽ hiện ra thành mẫu lặp. Vẫn dùng bản nháp không có nghĩa bản nháp tốt.",
      },
      {
        question: "Mỗi ngày có 50.000 lượt. Nên lấy mẫu log để chấm thế nào?",
        options: [
          "Vài trăm lượt ngẫu nhiên, cộng thêm lượt bị chê và nhóm rủi ro",
          "Chấm cả 50.000 lượt bằng giám khảo mỗi ngày để không bỏ sót ca",
          "Chỉ lấy 100 lượt đầu tiên trong ngày vì chúng dễ truy xuất nhất",
          "Chỉ lấy lượt bị bấm dislike vì đó là những lượt duy nhất có lỗi",
        ],
        correct: 0,
        explanation:
          "Mẫu ngẫu nhiên cho ước lượng chất lượng chung không lệch; lấy thêm có chủ đích các lượt bị chê và các nhóm rủi ro cao giúp tìm lỗi nhanh. Chấm tất cả tốn chi phí không cần. 100 lượt đầu ngày lệch theo giờ và loại người dùng. Chỉ lấy lượt bị chê thì không biết tỷ lệ lỗi chung.",
      },
      {
        question: "Điểm giám khảo trên mẫu log hằng tuần: 88, 87, 88, 84, 82, 79. Chưa ai đổi prompt. Đây là dấu hiệu gì?",
        options: [
          "Trôi chất lượng: dữ liệu hay câu hỏi đầu vào đang đổi",
          "Dao động bình thường giữa các tuần, không cần xem xét gì",
          "Giám khảo đã hỏng, cần thay giám khảo khác ngay lập tức",
          "Người dùng quen rồi nên chê nhiều hơn",
        ],
        correct: 0,
        explanation:
          "Ba tuần liên tiếp đi xuống, không có thay đổi phía bạn, là mẫu hình của trôi (drift): câu hỏi mới, tài liệu lỗi thời, hoặc thay đổi phía mô hình. Cần đọc các ca trượt để tìm nguyên nhân. Giám khảo có thể là nguyên nhân nhưng phải kiểm bằng nhãn người trước khi kết luận; và người dùng không chấm ở đây - giám khảo chấm.",
      },
      {
        question: "Tìm được 12 ca lỗi thật từ log tuần này. Nên làm gì với chúng?",
        options: [
          "Gắn nhãn đúng rồi thêm vào bộ vàng, phần giữ kín hoặc phần viết",
          "Sửa prompt cho 12 ca này đạt, rồi xoá chúng khỏi log cho gọn gàng",
          "Chép cả 12 ca vào prompt làm ví dụ để mô hình không sai lần nữa",
          "Không làm gì, vì 12 ca trên 350.000 lượt mỗi tuần là quá nhỏ",
        ],
        correct: 0,
        explanation:
          "Mỗi ca lỗi thật là một ca kiểm thử bộ vàng đang thiếu. Thêm nó vào (sau khi che dữ liệu cá nhân và gắn nhãn đúng) thì CI sẽ bắt lỗi đó nếu nó quay lại. Chỉ sửa prompt mà không thêm ca là không có gì ngăn tái phát. Nhồi ví dụ vào prompt làm prompt phình và không đo được gì.",
      },
    ],
    keyTakeaways: [
      "Bộ vàng chỉ chứa những gì bạn nghĩ tới trước ngày ra mắt.",
      "Phản hồi tường minh ít và lệch; kết hợp với tín hiệu ngầm như sửa tay, hỏi lại.",
      "Lấy mẫu log ngẫu nhiên cộng có chủ đích, chấm bằng cùng bộ chấm như CI.",
      "Theo dõi điểm theo tuần; đi xuống liên tục khi không đổi gì là trôi.",
      "Mỗi ca lỗi thật, sau khi che PII và gắn nhãn, đi vào bộ vàng.",
    ],
    practicePrompt: {
      question: "Nhóm muốn lưu toàn bộ log hội thoại để chấm và đưa vào bộ vàng. Điều gì phải làm trước?",
      options: [
        "Che thông tin cá nhân và giới hạn thời gian lưu, quyền truy cập log",
        "Xin mô hình xác nhận là nội dung log không chứa thông tin nhạy cảm",
        "Lưu nguyên văn để nhãn chính xác nhất, xử lý quyền riêng tư về sau",
        "Chỉ lưu những lượt bị dislike vì người dùng đã đồng ý khi bấm nút",
      ],
      correct: 0,
      explanation:
        "Log hội thoại thường chứa tên, số điện thoại, nội dung nội bộ. Che PII trước khi lưu hay đưa vào bộ vàng, giới hạn ai đọc được và giữ bao lâu, theo quy định bảo vệ dữ liệu áp dụng cho bạn. Hỏi mô hình không phải phép kiểm; bấm dislike không phải đồng ý cho lưu dữ liệu.",
    },
    summary: {
      keyIdea: "Sau ra mắt, eval tiếp tục trên dữ liệu thật: phản hồi, mẫu log, theo dõi trôi, và nuôi bộ vàng bằng lỗi thật.",
      formula: "Log (đã che PII) → lấy mẫu → chấm → theo dõi theo tuần → ca lỗi vào bộ vàng → CI bắt lần sau.",
      commonMistake: "Tin eval CI xanh nghĩa là hệ thống vẫn tốt, trong khi bộ vàng không còn giống câu hỏi thật.",
      action: "Lập lịch hằng tuần: lấy 200 lượt ngẫu nhiên và mọi lượt bị chê, chấm, và thêm ca lỗi vào bộ vàng.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Thêm vào tính năng một tín hiệu phản hồi rẻ nhất có thể (nút hữu ích / không hữu ích, hoặc ghi lại khi người dùng sửa bản nháp). Lên lịch mỗi tuần đọc 20 lượt bị chê và chuyển ít nhất 3 ca thành ca bộ vàng.",
      secondary: "Cả chặng nối thành một vòng: bộ vàng → bộ chấm → CI → log → bộ vàng.",
    },
    sections: [
      {
        type: "lead",
        text: "Ngày ra mắt là ngày bộ vàng bắt đầu cũ đi. Bài cuối nói về vòng lặp giữ eval sát với những gì người dùng thật đang hỏi.",
      },
      { type: "heading", text: "Ba nguồn tín hiệu sau ra mắt" },
      {
        type: "list",
        items: [
          "Phản hồi tường minh: nút hữu ích / không hữu ích, báo lỗi. Ít và lệch về người đang bực, nhưng là chuông báo sớm.",
          "Tín hiệu ngầm: người dùng sửa tay bản nháp, hỏi lại cùng ý, sao chép câu trả lời, bỏ đi giữa chừng.",
          "Chấm chủ động: lấy mẫu log, chạy cùng bộ quy tắc và giám khảo đã dùng trong CI.",
        ],
      },
      {
        type: "code",
        language: "json",
        caption: "Một bản ghi log đủ để chấm lại và truy vết (đã che PII)",
        code: `{
  "id": "turn-8f21",
  "thoi_gian": "2026-09-20T09:14:03Z",
  "phien_ban_prompt": "chinh-sach-v14",
  "mo_hinh": "<ten-mo-hinh>@<phien-ban>",
  "dau_vao": "làm từ xa được mấy ngày/tuần vậy [TEN]",
  "tai_lieu_truy_xuat": ["qd-lam-viec-tu-xa-2024.pdf#3"],
  "dau_ra": "Bạn được làm từ xa tối đa 2 ngày mỗi tuần...",
  "phan_hoi": "khong_huu_ich",
  "nguoi_dung_sua": null
}`,
      },
      {
        type: "paragraph",
        text: "Hai trường quan trọng hay bị quên là phiên bản prompt và phiên bản mô hình. Không có chúng thì khi điểm tụt, bạn không biết tụt từ lúc nào và do thay đổi nào. Tài liệu truy xuất cũng cần lưu: bản ghi trên cho thấy ngay hệ thống đang đọc một quy định cũ.",
      },
      {
        type: "callout",
        label: "Trôi chất lượng (drift)",
        text: "Chất lượng có thể đi xuống khi không ai sửa gì: người dùng hỏi loại câu mới, tài liệu trong kho lỗi thời, hoặc phía nhà cung cấp thay đổi. Ghim phiên bản mô hình khi nhà cung cấp cho phép, và vẽ điểm mẫu log theo tuần để thấy xu hướng thay vì một con số.",
      },
      {
        type: "comparison",
        left: { label: "Eval trước ra mắt", text: "Bộ vàng cố định, so giữa các phiên bản. Trả lời: bản mới có tệ hơn bản cũ không?" },
        right: { label: "Eval sau ra mắt", text: "Mẫu từ log thật, theo dõi theo thời gian. Trả lời: hệ thống có còn tốt với câu hỏi hôm nay không?" },
      },
      { type: "heading", text: "Đóng vòng lặp" },
      {
        type: "list",
        items: [
          "Tìm ca lỗi trong mẫu log hoặc lượt bị chê.",
          "Che PII, gắn nhãn kỳ vọng đúng, xếp vào nhóm.",
          "Thêm vào bộ vàng - phần giữ kín nếu muốn nó là phép đo trung thực.",
          "Sửa hệ thống; CI xác nhận ca mới đạt và không nhóm nào tụt.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Evals không phải một việc làm một lần - nó là vòng lặp nuôi bằng lỗi thật.",
          "Bộ vàng → bộ chấm → CI → log → bộ vàng: đó là cả chặng trong một dòng.",
        ],
      },
    ],
  },
];
