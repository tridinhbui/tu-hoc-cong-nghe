import type { Lesson } from "./lesson-types";

// Chặng "Công nghệ trong công việc đơn giản hơn bạn nghĩ" (ids 1800-1805,
// personal track, Chặng 24) - chặng mở đầu của nhóm "Công nghệ cho người đi làm".
//
// Người học là kế toán, marketing, sales, vận hành, nhân sự - không học CS.
// Mục tiêu: nhìn một phần mềm ở công ty mà biết nó thuộc loại gì, dữ liệu nằm
// đâu, và các phần mềm nói chuyện với nhau ra sao, không cần viết mã. Bài 6 là
// dự án vẽ bản đồ công cụ của phòng, và chỗ chép tay tìm được ở đó là đầu vào
// cho chặng tự động hoá (Chặng 27). Dải 1800-1809 còn trống bốn id.

export const WORK_TECH_MAP_LESSONS: Lesson[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1800,
    slug: "moi-cong-nghe-giai-mot-bai-toan-kinh-doanh",
    title: "Chặng 24, Bài 1: Mỗi công nghệ giải một bài toán kinh doanh",
    subtitle: "Sáu từ bạn nghe mỗi ngày ở công ty - và mỗi từ trả lời một câu hỏi khác nhau.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "SaaS, đám mây, dữ liệu, API, tự động hoá, AI - nghe như sáu thứ khó, nhưng mỗi thứ chỉ giải một loại bài toán. Biết bài toán nào dùng cái nào thì bạn đọc được mọi đề xuất công nghệ ở công ty, và biết hỏi đúng câu khi ai đó bảo \"cứ mua phần mềm này là xong\".",
    openingQuestion:
      "Cuối tháng, bạn mất 6 giờ chép doanh số từ phần mềm bán hàng sang file báo cáo của kế toán. Loại công nghệ nào nhắm thẳng vào đúng việc này?",
    openingOptions: [
      "Tự động hoá, nối hai phần mềm qua API của chúng",
      "Mua thêm một phần mềm báo cáo đám mây thật xịn",
      "Nhờ AI viết lại báo cáo tháng cho gọn và đẹp hơn",
      "Chuyển file báo cáo lên ổ đám mây để dễ chia sẻ",
    ],
    correctOption: 0,
    explanation:
      "Bài toán ở đây là dữ liệu phải đi từ hệ thống A sang hệ thống B, và một người đang làm việc đó bằng tay. Đó đúng là việc của tự động hoá: một quy trình chạy theo lịch, lấy số từ phần mềm bán hàng qua API rồi ghi vào file kế toán. Chuyển file lên đám mây chỉ đổi chỗ để file, việc chép tay vẫn còn nguyên. Phần mềm báo cáo mới thêm một hệ thống nữa phải chép sang. AI viết lại báo cáo giải một bài toán khác - trình bày - chứ không phải chuyển số.",
    diagram: [
      { label: "Bài toán kinh doanh: việc gì đang tốn thời gian?", arrow: true },
      { label: "Loại bài toán: lưu, chia sẻ, chuyển, lặp lại hay đọc hiểu?", arrow: true },
      { label: "Loại công nghệ: SaaS, đám mây, dữ liệu, API, tự động hoá, AI", arrow: true },
      { label: "Công cụ cụ thể cho phòng bạn" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng bán hàng 8 người",
      description:
        "Phòng dùng một phần mềm quản lý khách hàng (CRM) thuê bao, Google Sheets để theo dõi chỉ tiêu, và email để gửi báo giá. Khi trưởng phòng muốn \"áp dụng AI\", câu hỏi đầu tiên đúng không phải là mua công cụ AI nào, mà là việc nào đang tốn giờ: hoá ra là chép đơn hàng từ CRM sang Sheets mỗi sáng - một bài toán tự động hoá, không phải bài toán AI.",
    },
    quiz: [
      {
        question: "Trong ví dụ \"công ty như một văn phòng\", API tương ứng với gì?",
        options: [
          "Người bưu tá mang giấy tờ giữa hai phòng",
          "Tủ hồ sơ nơi cất mọi giấy tờ của công ty",
          "Cô trợ lý đọc hồ sơ rồi soạn thư trả lời",
          "Bản quy trình ghi việc nào làm sau việc nào",
        ],
        correct: 0,
        explanation:
          "API là cách hai phần mềm gửi và nhận dữ liệu cho nhau theo một mẫu đã thống nhất - giống bưu tá chuyển giấy tờ giữa hai phòng. Tủ hồ sơ là dữ liệu, bản quy trình là tự động hoá, còn trợ lý đọc hiểu và soạn thư là AI.",
      },
      {
        question: "Phần mềm dạng thuê bao (SaaS) khác phần mềm cài đặt truyền thống ở điểm cốt lõi nào?",
        options: [
          "Nhà cung cấp chạy nó trên máy chủ của họ, bạn dùng qua mạng",
          "SaaS luôn rẻ hơn phần mềm cài đặt nếu tính trong năm năm",
          "SaaS không cần tài khoản, ai có đường dẫn là mở ra dùng được",
          "SaaS chỉ dùng được trên điện thoại, không dùng được trên máy tính",
        ],
        correct: 0,
        explanation:
          "SaaS (Software as a Service) nghĩa là phần mềm chạy ở máy chủ nhà cung cấp, bạn trả phí định kỳ và dùng qua trình duyệt hoặc ứng dụng. Chuyện rẻ hay đắt tuỳ số người dùng và số năm, không có quy luật chung. Tài khoản và phân quyền vẫn cần như mọi phần mềm.",
      },
      {
        question: "Nhân viên mới hỏi \"hợp đồng mẫu mới nhất ở đâu\" mỗi tuần. Bài toán này thuộc loại nào trước tiên?",
        options: [
          "Dữ liệu: chưa có một nơi cất chung, đặt tên rõ",
          "AI: cần một chatbot trả lời thay trưởng phòng",
          "API: cần nối phần mềm hợp đồng với email công ty",
          "Tự động hoá: cần gửi hợp đồng mẫu cho mọi người mỗi tuần",
        ],
        correct: 0,
        explanation:
          "Câu hỏi lặp lại vì tài liệu không có chỗ cất cố định và tên rõ ràng. Sửa chỗ cất trước là đủ phần lớn. Chatbot trên một đống file lộn xộn sẽ trả về bản cũ; gửi hợp đồng mỗi tuần chỉ tạo thêm nhiều bản sao lệch nhau.",
      },
      {
        question: "Khi nào AI là lựa chọn đúng hơn tự động hoá thông thường?",
        options: [
          "Khi đầu vào là chữ tự do cần đọc hiểu, như email khách",
          "Khi cần chép cùng một cột số từ file A sang file B mỗi ngày",
          "Khi cần kết quả giống hệt nhau mọi lần, không được sai",
          "Khi quy trình đã rõ từng bước và không có ngoại lệ nào",
        ],
        correct: 0,
        explanation:
          "Tự động hoá thông thường làm tốt việc có luật rõ ràng: lấy cột này, ghi vào chỗ kia. AI cần khi phải đọc hiểu thứ không có cấu trúc - phân loại email, tóm tắt phản hồi. Việc cần chính xác tuyệt đối và lặp lại y hệt thì đừng giao cho AI, vì nó có thể trả lời khác nhau mỗi lần.",
      },
      {
        question: "Sếp nói \"chuyển hết lên đám mây là tự động hoá xong\". Nhận xét nào đúng?",
        options: [
          "Đám mây là nơi chạy và lưu; tự động hoá là việc tự chạy",
          "Đúng, vì phần mềm trên đám mây tự nối được với nhau hết",
          "Đúng, vì dữ liệu trên đám mây luôn tự đồng bộ giữa các phòng",
          "Sai, vì đám mây chỉ dùng để sao lưu, không chạy được phần mềm",
        ],
        correct: 0,
        explanation:
          "Đám mây trả lời câu \"phần mềm chạy và dữ liệu nằm ở đâu\". Hai phần mềm cùng ở trên đám mây vẫn không tự nói chuyện với nhau - cần API và một quy trình tự động nối chúng. Và đám mây không chỉ để sao lưu: phần lớn phần mềm bạn dùng hằng ngày chạy trên đó.",
      },
    ],
    keyTakeaways: [
      "Bắt đầu từ bài toán kinh doanh, không bắt đầu từ công nghệ.",
      "Dữ liệu = tủ hồ sơ, API = bưu tá, tự động hoá = quy trình, AI = trợ lý.",
      "SaaS và đám mây trả lời câu \"phần mềm chạy ở đâu, ai giữ\".",
      "Việc có luật rõ: tự động hoá. Việc cần đọc hiểu chữ tự do: AI.",
      "Dữ liệu lộn xộn thì công nghệ nào đặt lên trên cũng khập khiễng.",
    ],
    practicePrompt: {
      question: "Phòng chăm sóc khách hàng nhận 200 email mỗi ngày và phải chia vào 5 nhóm vấn đề trước khi xử lý. Ghép nào hợp lý nhất?",
      options: [
        "AI để phân loại email, tự động hoá để đưa vào đúng hàng đợi",
        "Chỉ cần tự động hoá, lọc theo vài từ khoá cố định trong tiêu đề",
        "Chuyển hộp thư lên đám mây, việc phân loại sẽ tự được giải quyết",
        "Mua thêm một phần mềm SaaS thứ hai để chứa bản sao các email",
      ],
      correct: 0,
      explanation:
        "Phân loại email viết tự do là việc đọc hiểu - chỗ AI mạnh, còn lọc theo từ khoá sẽ sót nhiều vì khách viết đủ kiểu. Sau khi có nhãn, đưa email vào đúng hàng đợi là việc có luật rõ, để tự động hoá làm. Đám mây hay thêm phần mềm chứa bản sao không đụng tới bài toán phân loại.",
    },
    summary: {
      keyIdea: "Mỗi loại công nghệ trả lời một câu hỏi: lưu ở đâu, ai chạy, chuyển thế nào, lặp lại ra sao, đọc hiểu cái gì.",
      formula: "Việc tốn giờ → loại bài toán → loại công nghệ → công cụ cụ thể.",
      commonMistake: "Chọn công cụ trước (\"mua AI đi\") rồi mới đi tìm việc cho nó làm.",
      action: "Viết ra ba việc tốn nhiều giờ nhất của bạn tuần này và gán mỗi việc một loại bài toán.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Liệt kê ba việc lặp lại tốn thời gian nhất của bạn. Với mỗi việc, ghi: nó là chuyện lưu trữ, chuyển dữ liệu, lặp lại theo luật, hay đọc hiểu chữ? Rồi gán một trong sáu loại công nghệ.",
      secondary: "Giữ danh sách này - bài 6 của chặng sẽ dùng lại nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Ở công ty, bạn nghe sáu từ lặp đi lặp lại: phần mềm thuê bao, đám mây, dữ liệu, API, tự động hoá, AI. Chúng không khó. Mỗi từ chỉ là câu trả lời cho một loại bài toán - và bài này là tấm bản đồ ghép chúng lại.",
      },
      {
        type: "feynman",
        title: "Công ty như một văn phòng giấy tờ",
        intro: "Hãy quên máy tính một phút. Hình dung công ty bạn là một văn phòng kiểu cũ, toàn giấy tờ, và xem mỗi công nghệ đang đóng vai ai trong đó.",
        columns: ["Thành phần", "Trong văn phòng giấy tờ", "Trong công ty bạn"],
        rows: [
          ["Nơi cất", "Tủ hồ sơ, xếp theo ngăn có nhãn", "Dữ liệu: bảng tính, cơ sở dữ liệu"],
          ["Toà nhà", "Văn phòng thuê, chủ nhà lo điện nước", "Đám mây và phần mềm thuê bao (SaaS)"],
          ["Người đưa thư", "Bưu tá mang giấy giữa các phòng", "API: phần mềm gửi dữ liệu cho nhau"],
          ["Quy trình", "Bảng \"nhận đơn → duyệt → lưu\" dán tường", "Tự động hoá: các bước tự chạy"],
          ["Trợ lý", "Người đọc thư, tóm tắt, soạn nháp", "AI: đọc hiểu và viết chữ"],
        ],
        oneLiner: "Dữ liệu là tủ hồ sơ, API là bưu tá, tự động hoá là quy trình, AI là trợ lý - còn đám mây là toà nhà thuê để đặt tất cả.",
      },
      { type: "heading", text: "Bài toán nào, công nghệ nào" },
      {
        type: "conceptTable",
        title: "Sáu loại công nghệ và câu hỏi mỗi loại trả lời",
        concepts: [
          { vi: "Phần mềm thuê bao", en: "SaaS", def: "Dùng phần mềm người khác chạy hộ, trả phí định kỳ. Ví dụ: Google Workspace, Microsoft 365, phần mềm kế toán trực tuyến." },
          { vi: "Đám mây", en: "Cloud", def: "Máy chủ thuê ở trung tâm dữ liệu. Trả lời câu: phần mềm chạy ở đâu, dữ liệu nằm ở đâu." },
          { vi: "Dữ liệu", en: "Data", def: "Những gì được ghi lại: đơn hàng, khách, hoá đơn. Sạch và có cấu trúc thì mọi thứ phía sau mới chạy." },
          { vi: "Giao diện lập trình", en: "API", def: "Cách hai phần mềm hỏi và trả dữ liệu cho nhau mà không cần người chép tay." },
          { vi: "Tự động hoá", en: "Automation", def: "Chuỗi bước chạy theo luật khi có sự kiện hoặc theo lịch. Công cụ: n8n, Zapier, Make, Power Automate." },
          { vi: "Trí tuệ nhân tạo", en: "AI", def: "Đọc hiểu và viết chữ tự do: tóm tắt, phân loại, soạn nháp. Công cụ: ChatGPT, Claude, Gemini, Copilot." },
        ],
      },
      {
        type: "paragraph",
        text: "Cách dùng bảng này: bắt đầu từ việc đang tốn giờ, rồi hỏi nó là loại gì. Tìm không ra tài liệu là bài toán dữ liệu. Chép số giữa hai hệ thống là API cộng tự động hoá. Đọc 200 email để chia nhóm là AI. Rất nhiều việc cần ghép hai loại.",
      },
      {
        type: "comparison",
        left: { label: "Bắt đầu từ công cụ", text: "\"Công ty mình phải dùng AI.\" Mua một công cụ, rồi đi tìm việc cho nó. Ba tháng sau không ai mở." },
        right: { label: "Bắt đầu từ bài toán", text: "\"Mỗi sáng mất 1 giờ chép đơn từ CRM sang Sheets.\" Bài toán chuyển dữ liệu - chọn tự động hoá, đo giờ tiết kiệm được." },
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Mỗi công cụ mới là thêm một nơi chứa dữ liệu công ty, thêm một tài khoản phải quản lý, và thêm một chỗ có thể hỏng mà không ai để ý. Đừng thêm công cụ khi bài toán thật là dữ liệu đang lộn xộn.",
      },
      {
        type: "list",
        items: [
          "Bài 2: SaaS và đám mây - dữ liệu của bạn thật sự nằm ở đâu.",
          "Bài 3: API - ổ cắm giữa hai phần mềm.",
          "Bài 4: Bảng tính là cơ sở dữ liệu đầu tiên của bạn.",
          "Bài 5: Mua, cấu hình hay tự dựng.",
          "Bài 6: Dự án - vẽ bản đồ công cụ của phòng bạn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Công nghệ không phải một khối lớn - nó là sáu câu trả lời cho sáu loại câu hỏi.",
          "Hỏi đúng câu trước, công cụ sẽ tự lộ ra.",
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1801,
    slug: "saas-va-dam-may-du-lieu-nam-o-dau",
    title: "Chặng 24, Bài 2: SaaS và đám mây - dữ liệu công ty bạn thật sự nằm ở đâu",
    subtitle: "Ai giữ nó, ai được xem nó, và lấy lại thế nào khi thôi dùng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "☁️",
    track: "personal",
    whyItMatters:
      "Gần như mọi phần mềm bạn dùng ở công ty là thuê bao chạy trên đám mây. Dữ liệu khách hàng, hoá đơn, hồ sơ nhân sự nằm trên máy chủ của người khác. Biết nó nằm đâu, ai có quyền, và làm sao lấy ra là điều kiện để công ty không mất dữ liệu khi đổi nhà cung cấp hay khi một nhân viên nghỉ việc.",
    openingQuestion:
      "Công ty bạn dùng một phần mềm CRM thuê bao 3 năm và giờ muốn chuyển sang phần mềm khác. Câu hỏi nào cần trả lời TRƯỚC khi báo huỷ?",
    openingOptions: [
      "Xuất được những dữ liệu gì, định dạng gì, và trong bao lâu",
      "Phần mềm mới có giao diện dễ dùng hơn bản cũ không",
      "Nhà cung cấp cũ có giảm giá nếu mình đồng ý gia hạn thêm một năm",
      "Có cần báo cho khách hàng biết là công ty sắp đổi phần mềm CRM không",
    ],
    correctOption: 0,
    explanation:
      "Dữ liệu trong phần mềm thuê bao nằm trên máy chủ nhà cung cấp. Khi hợp đồng kết thúc, nhiều nơi chỉ giữ dữ liệu thêm một thời gian ngắn rồi xoá. Vì vậy trước khi báo huỷ phải biết: xuất được những gì (khách hàng, lịch sử giao dịch, tệp đính kèm, ghi chú), ra định dạng nào (CSV, Excel) và có hạn chót nào không. Giao diện hay giá gia hạn đều quan trọng, nhưng không cứu được dữ liệu đã bị xoá.",
    diagram: [
      { label: "Bạn dùng phần mềm qua trình duyệt", arrow: true },
      { label: "Phần mềm chạy trên máy chủ của nhà cung cấp", arrow: true },
      { label: "Máy chủ đặt ở trung tâm dữ liệu đám mây", arrow: true },
      { label: "Dữ liệu công ty nằm ở đó - lấy ra bằng xuất file hoặc API" },
    ],
    realWorldExample: {
      company: "Tình huống: công ty thương mại 30 người",
      description:
        "Nhân viên kinh doanh lâu năm nghỉ việc. Toàn bộ danh sách khách và lịch sử báo giá nằm trong tài khoản Google Drive cá nhân anh ấy dùng để làm việc, không phải tài khoản công ty. Công ty không có quyền gì với tài khoản đó. Bài học không phải về công nghệ mà về quyền sở hữu: tài liệu công việc phải nằm trong tài khoản công ty cấp và công ty quản lý.",
    },
    quiz: [
      {
        question: "Dùng một phần mềm kế toán trực tuyến, dữ liệu hoá đơn của công ty bạn nằm ở đâu?",
        options: [
          "Trên máy chủ của nhà cung cấp",
          "Trên ổ cứng máy kế toán",
          "Trong trình duyệt, xoá lịch sử là mất",
          "Không ở đâu, chỉ hiện khi đăng nhập",
        ],
        correct: 0,
        explanation:
          "Phần mềm thuê bao lưu dữ liệu trên máy chủ nhà cung cấp, thường đặt trong một trung tâm dữ liệu đám mây. Trình duyệt chỉ hiển thị, nên xoá lịch sử không mất dữ liệu. Nhưng cũng vì dữ liệu nằm ở chỗ người khác, bạn cần biết cách lấy nó ra.",
      },
      {
        question: "Với phần mềm thuê bao, trách nhiệm nào vẫn nằm ở phía công ty bạn?",
        options: [
          "Quản lý ai được cấp tài khoản và quyền gì",
          "Bảo trì máy chủ và vá lỗi hệ điều hành cho nhà cung cấp",
          "Lắp điện dự phòng cho máy chủ của họ",
          "Không còn gì, vì đã trả tiền thuê thì họ lo hết mọi thứ",
        ],
        correct: 0,
        explanation:
          "Đây là mô hình trách nhiệm chia sẻ: nhà cung cấp lo máy chủ, bảo mật hạ tầng, sao lưu hệ thống. Công ty lo phần mình: ai có tài khoản, quyền gì, khoá tài khoản khi người nghỉ việc, và dữ liệu nào được phép đưa lên. Phần lớn sự cố rò rỉ đến từ phía này.",
      },
      {
        question: "Một nhân viên nghỉ việc hôm nay. Việc nào quan trọng nhất về phần mềm?",
        options: [
          "Khoá tài khoản và chuyển quyền sở hữu tài liệu cho người khác",
          "Đổi mật khẩu Wi-Fi văn phòng để họ không vào được mạng công ty nữa",
          "Xoá ngay tài khoản của họ trên mọi phần mềm để tiết kiệm phí",
          "Nhờ họ tự đăng xuất khỏi các phần mềm trên máy cá nhân",
        ],
        correct: 0,
        explanation:
          "Phần mềm thuê bao dùng được từ bất kỳ đâu, nên đổi Wi-Fi không chặn được gì. Xoá tài khoản ngay có thể xoá luôn tài liệu họ sở hữu. Việc đúng: khoá quyền truy cập, chuyển quyền sở hữu tệp và khách hàng cho người tiếp nhận, rồi mới xoá.",
      },
      {
        question: "\"Có sao lưu\" trong hợp đồng SaaS thường có nghĩa là gì?",
        options: [
          "Nhà cung cấp phục hồi được hệ thống khi họ gặp sự cố",
          "Bạn lấy lại được mọi tệp đã xoá từ bất kỳ thời điểm nào",
          "Họ tự gửi một bản sao dữ liệu về máy công ty mỗi đêm",
          "Dữ liệu được lưu vĩnh viễn kể cả khi đã ngừng trả phí",
        ],
        correct: 0,
        explanation:
          "Sao lưu của nhà cung cấp chủ yếu để họ phục hồi dịch vụ khi máy chủ hỏng, không phải để bạn lấy lại tệp nhân viên lỡ xoá sáu tháng trước. Nhiều nơi chỉ giữ thùng rác một khoảng thời gian. Dữ liệu quan trọng nên được xuất định kỳ về chỗ công ty kiểm soát.",
      },
      {
        question: "Cách nào cho biết một phần mềm thuê bao có dễ lấy dữ liệu ra hay không?",
        options: [
          "Thử xuất một phần dữ liệu thật ngay trong thời gian dùng thử",
          "Hỏi nhân viên bán hàng của họ và tin theo câu trả lời đó",
          "Xem họ có nhiều khách hàng lớn không, đông khách là ổn",
          "Đọc đánh giá sao trên các trang so sánh phần mềm là đủ",
        ],
        correct: 0,
        explanation:
          "Cách chắc nhất là tự làm: nhập vài chục bản ghi thật, bấm xuất, mở file ra xem có đủ cột, có tệp đính kèm, có lịch sử không. Lời chào hàng và số sao không cho bạn biết file xuất có thiếu dữ liệu quan trọng hay không.",
      },
    ],
    keyTakeaways: [
      "Phần mềm thuê bao = chạy trên máy chủ nhà cung cấp, bạn dùng qua mạng.",
      "Nhà cung cấp lo hạ tầng; công ty lo tài khoản, phân quyền và dữ liệu đưa lên.",
      "Tài liệu công việc phải nằm trong tài khoản công ty, không phải tài khoản cá nhân.",
      "Biết cách xuất dữ liệu trước khi cần, không phải lúc sắp huỷ hợp đồng.",
      "Người nghỉ việc: khoá tài khoản, chuyển quyền sở hữu, rồi mới xoá.",
    ],
    practicePrompt: {
      question: "Phòng nhân sự muốn đưa hồ sơ nhân viên (có số CCCD, lương) lên một phần mềm thuê bao mới. Câu hỏi nào cần hỏi nhà cung cấp trước tiên?",
      options: [
        "Ai bên họ xem được dữ liệu, lưu ở đâu, và xuất ra thế nào",
        "Phần mềm có ứng dụng trên điện thoại để nhân viên tự xem lương không",
        "Có mẫu hợp đồng lao động soạn sẵn đi kèm trong phần mềm hay không",
        "Có hỗ trợ đổi màu giao diện theo màu thương hiệu công ty hay không",
      ],
      correct: 0,
      explanation:
        "Hồ sơ nhân sự là dữ liệu cá nhân nhạy cảm - ở Việt Nam việc xử lý nó chịu Nghị định 13/2023 về bảo vệ dữ liệu cá nhân. Trước khi đưa lên phải biết ai được truy cập (kể cả nhân viên nhà cung cấp), dữ liệu đặt ở đâu, và lấy về được không. Tính năng tiện ích tính sau.",
    },
    summary: {
      keyIdea: "Dữ liệu trong phần mềm thuê bao nằm ở nhà cung cấp; công ty vẫn chịu trách nhiệm về quyền truy cập và việc lấy nó ra.",
      formula: "Nằm ở đâu + ai giữ + ai được xem + lấy ra thế nào = hiểu một phần mềm thuê bao.",
      commonMistake: "Nghĩ \"đã lên đám mây là an toàn, họ lo hết\" và để tài liệu công việc trong tài khoản cá nhân.",
      action: "Chọn phần mềm bạn dùng nhiều nhất và thử xuất dữ liệu của mình ra file.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở phần mềm bạn dùng nhiều nhất ở công ty. Tìm chức năng xuất dữ liệu, xuất thử một phần ra CSV hoặc Excel, mở file và ghi lại: có đủ cột không, thiếu gì (tệp đính kèm, ghi chú, lịch sử)?",
      secondary: "Nếu không tìm thấy chức năng xuất, đó chính là một phát hiện đáng báo cho quản lý.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị kế toán mở phần mềm hoá đơn trên trình duyệt mỗi sáng. Hoá đơn không nằm trong máy chị, cũng không nằm trong văn phòng. Nó nằm trên máy chủ của nhà cung cấp, trong một trung tâm dữ liệu có khi ở nước khác. Điều đó tiện - và kéo theo vài câu hỏi ít ai hỏi.",
      },
      { type: "heading", text: "Thuê bao và đám mây: thuê thay vì mua" },
      {
        type: "comparison",
        left: { label: "Phần mềm cài đặt", text: "Mua một lần, cài vào máy công ty. Dữ liệu nằm trong máy của bạn. Bạn tự lo sao lưu, nâng cấp, sửa khi hỏng." },
        right: { label: "Phần mềm thuê bao (SaaS)", text: "Trả phí định kỳ, dùng qua trình duyệt. Dữ liệu nằm ở máy chủ nhà cung cấp. Họ lo nâng cấp và hạ tầng." },
      },
      {
        type: "paragraph",
        text: "Đám mây (cloud) là tầng dưới cùng: những trung tâm dữ liệu khổng lồ cho thuê máy chủ, như AWS, Google Cloud, Microsoft Azure. Phần lớn phần mềm thuê bao bạn dùng chạy trên một trong số đó. Bạn hiếm khi đụng trực tiếp vào đám mây - bạn đụng vào phần mềm chạy trên nó.",
      },
      { type: "heading", text: "Bốn câu hỏi cho mọi phần mềm ở công ty" },
      {
        type: "list",
        items: [
          "Dữ liệu nằm ở đâu? Máy chủ nhà cung cấp, ở nước nào nếu dữ liệu nhạy cảm.",
          "Ai giữ tài khoản? Tài khoản công ty cấp hay tài khoản cá nhân của nhân viên.",
          "Ai xem được gì? Phân quyền theo vai trò, và ai là quản trị viên.",
          "Lấy ra thế nào? Xuất file, qua API, hay phải nhờ nhà cung cấp - và trong bao lâu sau khi huỷ.",
        ],
      },
      {
        type: "callout",
        label: "Trách nhiệm chia sẻ",
        text: "Nhà cung cấp lo máy chủ không sập và không bị xâm nhập ở tầng hạ tầng. Công ty lo ai có tài khoản, mật khẩu có xác thực hai lớp không, và người nghỉ việc có bị khoá không. Phần lớn sự cố nằm ở phía công ty.",
      },
      { type: "heading", text: "Dựng thói quen tốt" },
      {
        type: "list",
        items: [
          "Chỉ làm việc trong tài khoản công ty cấp (Google Workspace, Microsoft 365), không dùng Gmail cá nhân cho tài liệu công việc.",
          "Mỗi phần mềm có ít nhất hai quản trị viên, để một người nghỉ không khoá cả phòng.",
          "Xuất định kỳ dữ liệu quan trọng về một nơi công ty kiểm soát.",
          "Có danh sách việc khi nhân viên nghỉ: khoá tài khoản, chuyển quyền sở hữu tài liệu, rồi mới xoá.",
        ],
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Chia sẻ tệp bằng đường dẫn \"ai có link cũng xem được\" là cách dữ liệu nhạy cảm rời công ty nhanh nhất - đường dẫn bị chuyển tiếp mà không ai biết. Với bảng lương, hồ sơ khách, hợp đồng: chỉ chia sẻ cho người cụ thể.",
      },
      {
        type: "closing",
        lines: [
          "Thuê phần mềm là thuê chỗ để dữ liệu - chứ không phải giao luôn trách nhiệm.",
          "Bài sau: các phần mềm này nói chuyện với nhau bằng cách nào.",
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1802,
    slug: "api-la-o-cam-giua-hai-phan-mem",
    title: "Chặng 24, Bài 3: API là ổ cắm giữa hai phần mềm - hiểu mà không cần code",
    subtitle: "Yêu cầu, phản hồi, khoá API và webhook - bốn khái niệm là đủ để đọc mọi đề xuất tích hợp.",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "🔌",
    track: "personal",
    whyItMatters:
      "Khi ai đó nói \"hai phần mềm này tích hợp được với nhau\", họ đang nói về API. Hiểu API ở mức khái niệm giúp bạn biết một việc chép tay có tự động hoá được không, đọc được dữ liệu một hệ thống trả về, và không làm lộ khoá API - thứ giữ quyền vào dữ liệu công ty.",
    openingQuestion:
      "Đồng nghiệp gửi vào nhóm chat chung khoá API của phần mềm bán hàng để \"ai cần thì dùng\". Chuyện gì đáng lo nhất?",
    openingOptions: [
      "Ai cầm khoá đều đọc hoặc sửa được dữ liệu như chính công ty",
      "Khoá API dài, mọi người dễ chép nhầm một ký tự",
      "Nhóm chat sẽ bị chậm đi vì tin nhắn chứa một đoạn ký tự quá dài",
      "Phần mềm bán hàng sẽ tính thêm phí vì có nhiều người cùng dùng API",
    ],
    correctOption: 0,
    explanation:
      "Khoá API (API key) giống chìa khoá nhà: phần mềm không biết ai đang cầm nó, chỉ biết khoá hợp lệ. Ai có khoá là làm được mọi việc khoá đó cho phép - đọc danh sách khách, có khi sửa hoặc xoá đơn hàng. Tin nhắn trong nhóm chat bị chuyển tiếp, chụp màn hình, và vẫn còn đó khi thành viên rời công ty. Khoá đã lộ thì phải thu hồi và tạo khoá mới, không phải chỉ xoá tin nhắn.",
    diagram: [
      { label: "Phần mềm A gửi yêu cầu kèm khoá API", arrow: true },
      { label: "Phần mềm B kiểm tra khoá và quyền", arrow: true },
      { label: "Phần mềm B trả phản hồi, thường ở dạng JSON", arrow: true },
      { label: "Phần mềm A đọc phản hồi và dùng dữ liệu" },
    ],
    realWorldExample: {
      company: "Tình huống: cửa hàng bán hàng trực tuyến",
      description:
        "Mỗi khi có đơn mới trên website, cổng thanh toán gửi một webhook báo \"đơn 1025 đã thanh toán\". Một quy trình tự động nhận tin đó, gọi API của phần mềm kho để trừ tồn, rồi gửi email xác nhận cho khách. Trước đây nhân viên phải mở ba màn hình để làm ba việc này bằng tay.",
    },
    quiz: [
      {
        question: "Hình ảnh nào mô tả đúng nhất một lần gọi API?",
        options: [
          "Gọi món theo thực đơn và nhận đúng món mang ra",
          "Vào bếp nhà hàng và tự lấy món mình muốn ăn",
          "Chụp màn hình phần mềm rồi gửi cho đồng nghiệp",
          "Mở hai phần mềm cạnh nhau rồi chép số qua lại",
        ],
        correct: 0,
        explanation:
          "API là thực đơn: phần mềm kia công bố những yêu cầu nó nhận, bạn gọi đúng mẫu và nhận phản hồi. Bạn không vào bếp - tức không đụng trực tiếp vào cơ sở dữ liệu của họ. Chép số qua lại giữa hai màn hình chính là việc API sinh ra để thay thế.",
      },
      {
        question: "Khoá API của công ty lỡ bị dán lên một tài liệu công khai. Làm gì trước?",
        options: [
          "Thu hồi khoá đó và tạo khoá mới",
          "Xoá tài liệu công khai đó, chưa ai kịp thấy",
          "Đổi mật khẩu đăng nhập phần mềm",
          "Chờ xem có bị dùng trộm không rồi mới xử lý",
        ],
        correct: 0,
        explanation:
          "Khoá đã công khai phải coi như đã bị lấy - có công cụ tự quét khoá lộ trên mạng chỉ trong vài phút. Xoá tài liệu không làm khoá mất hiệu lực. Mật khẩu đăng nhập và khoá API là hai thứ riêng. Thu hồi khoá cũ trước, cập nhật khoá mới vào những chỗ đang dùng sau.",
      },
      {
        question: "Phản hồi JSON có dòng `\"trang_thai\": \"da_thanh_toan\"`. Phần bên trái dấu hai chấm là gì?",
        options: [
          "Tên trường - nhãn cho biết giá trị bên phải là gì",
          "Giá trị của đơn hàng mà phần mềm trả về cho mình đọc",
          "Mã lỗi phần mềm báo về khi yêu cầu không hợp lệ",
          "Khoá API phần mềm trả lại để lần sau dùng tiếp",
        ],
        correct: 0,
        explanation:
          "JSON gồm các cặp \"tên\": giá trị. Tên trường giống tiêu đề cột trong bảng tính, còn giá trị là nội dung ô. Ở đây trường trang_thai có giá trị da_thanh_toan. Đọc được cấu trúc này là đủ để hiểu phần lớn dữ liệu một API trả về.",
      },
      {
        question: "Webhook khác việc gọi API thông thường ở điểm nào?",
        options: [
          "Bên kia tự báo cho bạn khi có chuyện xảy ra",
          "Webhook nhanh hơn vì không phải đi qua mạng internet",
          "Webhook không cần khoá hay xác thực",
          "Webhook chỉ dùng được cho email, không dùng cho đơn hàng",
        ],
        correct: 0,
        explanation:
          "Gọi API là bạn hỏi: \"có đơn mới chưa?\" - hỏi mãi, phần lớn câu trả lời là chưa. Webhook là bên kia gọi lại khi có chuyện: \"vừa có đơn mới đây\". Nó vẫn đi qua mạng, và vẫn cần xác minh tin đến đúng từ bên gửi thật.",
      },
      {
        question: "Hai phần mềm của phòng bạn đều \"có API\". Điều đó đã chắc chắn nghĩa là gì?",
        options: [
          "Có thể nối được, nhưng phải xem API cho lấy dữ liệu nào",
          "Chúng đã tự động đồng bộ dữ liệu với nhau từ lúc cài đặt",
          "Chỉ cần bật một nút là dữ liệu sẽ chảy qua lại giữa hai bên",
          "Phòng IT bắt buộc phải viết mã thì mới dùng được hai API đó",
        ],
        correct: 0,
        explanation:
          "Có API là có ổ cắm, chưa phải đã cắm dây. Phải có ai đó - một quy trình trong n8n, Zapier hay Make, hoặc một đoạn mã - gọi API bên này và ghi vào bên kia. Và mỗi API chỉ mở một số loại dữ liệu; có khi đúng trường bạn cần lại không có. Nhiều trường hợp nối được mà không cần viết mã.",
      },
    ],
    keyTakeaways: [
      "API là ổ cắm: một phần mềm gửi yêu cầu, phần mềm kia trả phản hồi.",
      "Khoá API là chìa khoá vào dữ liệu công ty - không dán vào chat, email hay tài liệu.",
      "Khoá lộ thì thu hồi và tạo khoá mới; xoá tin nhắn là chưa đủ.",
      "JSON là các cặp \"tên\": giá trị - đọc như một dòng bảng tính.",
      "Webhook là \"gọi lại khi có chuyện\", thay cho việc hỏi liên tục.",
    ],
    practicePrompt: {
      question: "Bạn muốn biết ngay khi có khách điền form đăng ký trên website. Cách nào hợp lý hơn?",
      options: [
        "Dùng webhook: form tự báo sang khi có người vừa gửi",
        "Cứ mỗi phút gọi API hỏi form xem có ai đăng ký mới không",
        "Nhờ một đồng nghiệp mở trang quản trị form và kiểm tra mỗi giờ",
        "Gửi khoá API của form cho cả phòng để ai cũng tự vào xem được",
      ],
      correct: 0,
      explanation:
        "Webhook đúng cho \"báo tôi khi có chuyện\": không tốn lượt gọi vô ích, và tin tới gần như ngay lập tức. Hỏi mỗi phút vẫn chạy được nhưng tốn tài nguyên và có thể chạm giới hạn số lần gọi. Chia khoá API cho cả phòng là rủi ro, không phải giải pháp.",
    },
    summary: {
      keyIdea: "API cho hai phần mềm hỏi và trả dữ liệu theo một mẫu đã thống nhất, có khoá để kiểm soát ai được hỏi.",
      formula: "Yêu cầu (+ khoá) → phản hồi JSON. Webhook: bên kia tự gọi khi có sự kiện.",
      commonMistake: "Chia sẻ khoá API như chia sẻ đường dẫn tài liệu, và chỉ xoá tin nhắn khi khoá đã lộ.",
      action: "Hỏi phòng IT: phần mềm chính của phòng bạn có API không, và ai đang giữ khoá.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn phần mềm bạn dùng nhiều nhất. Tìm trang tài liệu API của nó (thường tìm được bằng \"tên phần mềm + API\"). Ghi lại ba loại dữ liệu nó cho lấy ra, và nó có hỗ trợ webhook không.",
      secondary: "Chưa cần hiểu hết - chỉ cần biết ổ cắm có tồn tại và mở những gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi sáng bạn mở phần mềm bán hàng, chép đơn mới sang bảng tính. Bạn đang làm bưu tá bằng tay. API là cách để hai phần mềm tự chuyển thư cho nhau - và bạn không cần biết lập trình để hiểu nó chạy ra sao.",
      },
      { type: "heading", text: "Yêu cầu và phản hồi" },
      {
        type: "paragraph",
        text: "Một lần gọi API (Application Programming Interface - giao diện lập trình ứng dụng) giống gọi món ở nhà hàng. Thực đơn là tài liệu API: liệt kê những gì bạn được gọi. Bạn gửi yêu cầu, ví dụ \"cho tôi đơn hàng số 1025\". Bếp - tức phần mềm kia - kiểm tra bạn có quyền không, rồi trả phản hồi. Bạn không bao giờ bước vào bếp.",
      },
      {
        type: "callout",
        label: "Khoá API là chìa khoá",
        text: "Mỗi yêu cầu kèm một khoá API (API key) để phần mềm kia biết ai đang hỏi và cho phép làm gì. Ai cầm khoá là có quyền đó. Không dán khoá vào chat, email, tài liệu chia sẻ hay ảnh chụp màn hình. Lộ thì thu hồi ngay và tạo khoá mới.",
      },
      { type: "heading", text: "Đọc một phản hồi JSON" },
      {
        type: "paragraph",
        text: "Phần lớn API trả dữ liệu ở dạng JSON - văn bản có cấu trúc, đọc được bằng mắt. Đây là phản hồi khi hỏi về một đơn hàng:",
      },
      {
        type: "code",
        language: "json",
        code: `{
  "ma_don": 1025,
  "khach_hang": {
    "ten": "Nguyễn Thị Lan",
    "email": "lan@example.com"
  },
  "san_pham": [
    { "ten": "Ấm pha trà", "so_luong": 2, "don_gia": 350000 },
    { "ten": "Hộp trà ô long", "so_luong": 1, "don_gia": 220000 }
  ],
  "tong_tien": 920000,
  "trang_thai": "da_thanh_toan"
}`,
        caption: "Mỗi dòng là một cặp \"tên\": giá trị. Ngoặc nhọn { } gom một đối tượng, ngoặc vuông [ ] là một danh sách.",
      },
      {
        type: "list",
        items: [
          "\"tong_tien\": 920000 - một con số, không có dấu chấm ngăn nghìn và không có chữ \"đ\".",
          "\"khach_hang\" chứa một đối tượng con có tên và email - giống một ô dẫn sang bảng khác.",
          "\"san_pham\" là danh sách hai món - một đơn nhiều dòng hàng.",
          "Tên trường là thứ bạn sẽ chọn khi nối dữ liệu này vào bảng tính hay quy trình tự động.",
        ],
      },
      { type: "heading", text: "Webhook: gọi lại khi có chuyện" },
      {
        type: "comparison",
        left: { label: "Hỏi liên tục (gọi API)", text: "Cứ vài phút hỏi \"có đơn mới chưa?\". Phần lớn câu trả lời là chưa. Tốn lượt gọi, và vẫn trễ vài phút." },
        right: { label: "Webhook", text: "Đăng ký một địa chỉ nhận tin. Khi có đơn mới, phần mềm kia tự gửi sang ngay. Giống dặn bưu điện \"có thư thì mang tới\"." },
      },
      {
        type: "paragraph",
        text: "Công cụ tự động hoá như n8n, Zapier, Make hay Power Automate làm hộ bạn cả hai việc: nhận webhook, gọi API, và chuyển dữ liệu giữa các bước - bằng cách kéo thả, không cần viết mã. Chặng 27 sẽ dựng một quy trình như vậy.",
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Quy trình nối qua API có thể hỏng im lặng: nhà cung cấp đổi tên một trường, khoá hết hạn, và dữ liệu ngừng chảy mà không ai hay. Mỗi quy trình cần một người chịu trách nhiệm và một cảnh báo khi lỗi.",
      },
      {
        type: "closing",
        lines: [
          "API là ổ cắm, JSON là thứ chảy qua dây, khoá API là chìa khoá, webhook là chuông báo.",
          "Bài sau: làm sao để dữ liệu của chính bạn đủ sạch mà cắm vào được.",
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1803,
    slug: "bang-tinh-la-co-so-du-lieu-dau-tien",
    title: "Chặng 24, Bài 4: Bảng tính là cơ sở dữ liệu đầu tiên của bạn",
    subtitle: "Một dòng một bản ghi, một cột một loại - và vì sao dữ liệu sạch quyết định tự động hoá có chạy hay không.",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    whyItMatters:
      "Tự động hoá, dashboard và AI đều đọc dữ liệu của bạn như máy đọc - không đoán ý. Một ô gộp, một ghi chú \"chưa chốt\" lẫn trong cột số, và quy trình dừng hoặc tệ hơn là chạy ra số sai. Sắp bảng tính theo vài quy tắc đơn giản là việc rẻ nhất để mọi công nghệ phía sau chạy được.",
    openingQuestion:
      "Cột \"Số tiền\" trong bảng theo dõi chi phí có các ô: 1.500.000 / 2tr / \"chưa có hoá đơn\" / 800.000 (tạm). Máy tính tổng cột này ra sao?",
    openingOptions: [
      "Bỏ qua các ô chữ, tổng thiếu mà không báo lỗi",
      "Tự hiểu 2tr là 2 triệu và cộng đúng cả bốn ô vào tổng",
      "Báo lỗi ngay ở ô đầu tiên có chữ để bạn vào sửa lại",
      "Hỏi lại bạn nên xử lý các ô ghi chú như thế nào trước",
    ],
    correctOption: 0,
    explanation:
      "Bảng tính coi \"2tr\", \"chưa có hoá đơn\" và \"800.000 (tạm)\" là chữ, không phải số. Hàm SUM bỏ qua chữ và cộng phần còn lại, không cảnh báo gì - tổng ra 1.500.000 trong khi thực tế gần 4,3 triệu. Đây là lỗi im lặng nguy hiểm nhất: con số trông bình thường nên không ai kiểm tra. Một quy trình tự động hay AI đọc cột này sẽ gặp đúng vấn đề đó, ở quy mô lớn hơn.",
    diagram: [
      { label: "Một dòng = một bản ghi (một khoản chi, một đơn hàng)", arrow: true },
      { label: "Một cột = một loại thông tin, cùng kiểu dữ liệu", arrow: true },
      { label: "Không gộp ô, không ghi chú lẫn vào cột số", arrow: true },
      { label: "Máy đọc được → lọc, tổng hợp, tự động hoá, hỏi AI" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng kế toán 5 người",
      description:
        "Mỗi người theo dõi công nợ theo cách riêng: người gộp ô tên khách cho đẹp, người ghi \"đã trả 1 phần\" vào cột số tiền, người thêm dòng tổng giữa bảng. Cuối tháng gộp năm file mất một buổi chiều. Sau khi thống nhất một mẫu - mỗi dòng một hoá đơn, cột trạng thái riêng, cột ghi chú riêng - việc gộp chỉ còn là một bảng tổng hợp (pivot) bấm lại.",
    },
    quiz: [
      {
        question: "Quy tắc nào là nền của một bảng dữ liệu máy đọc được?",
        options: [
          "Mỗi dòng một bản ghi, mỗi cột một loại thông tin",
          "Mỗi tháng một trang tính riêng cho dễ nhìn",
          "Gộp ô tiêu đề và tô màu nhóm cho người đọc dễ theo dõi",
          "Thêm dòng tổng ngay dưới mỗi nhóm để biết số liệu nhanh",
        ],
        correct: 0,
        explanation:
          "Máy đọc bảng theo dòng và cột. Mỗi dòng là một thứ (một đơn, một khoản chi), mỗi cột là một thuộc tính. Tách mỗi tháng một trang làm việc tổng hợp cả năm phải gộp lại; dòng tổng giữa bảng bị cộng hai lần; ô gộp làm các dòng bên dưới mất giá trị.",
      },
      {
        question: "Muốn ghi chú \"hoá đơn còn thiếu\" cho một khoản chi, nên ghi ở đâu?",
        options: [
          "Ở một cột Ghi chú riêng, cạnh cột số tiền",
          "Ngay trong ô số tiền, sau con số, cho dễ thấy",
          "Tô màu đỏ ô số tiền cho cả phòng tự hiểu",
          "Ở một dòng trống chèn ngay bên dưới khoản chi đó",
        ],
        correct: 0,
        explanation:
          "Chữ trong ô số tiền biến cả ô thành chữ, và hàm tổng bỏ qua nó. Màu sắc máy không lọc hay đếm được một cách đáng tin, và người khác không biết màu đỏ nghĩa là gì. Dòng chèn thêm bị tính là một bản ghi mới. Cột Ghi chú riêng giữ cột số sạch mà vẫn giữ thông tin.",
      },
      {
        question: "Cột \"Ngày\" có cả 03/04/2026, 2026-04-05 và \"đầu tháng 4\". Vấn đề là gì?",
        options: [
          "Máy không sắp xếp hay lọc đúng được vì kiểu không thống nhất",
          "Chỉ là chuyện thẩm mỹ, các hàm vẫn tự hiểu đúng hết cả ba cách",
          "Cần đổi tất cả sang chữ để thống nhất rồi máy sẽ đọc được",
          "Chỉ lỗi khi in ra giấy, còn trên máy tính vẫn chạy bình thường",
        ],
        correct: 0,
        explanation:
          "Một cột phải cùng một kiểu. \"đầu tháng 4\" là chữ, không phải ngày. 03/04 có thể được hiểu là 3 tháng 4 hoặc 4 tháng 3 tuỳ cài đặt vùng của máy. Lọc \"tháng 4\" sẽ sót dòng mà không báo. Đổi hết sang chữ thì mất luôn khả năng sắp theo thời gian.",
      },
      {
        question: "Vì sao tự động hoá và AI cần dữ liệu sạch hơn là con người cần?",
        options: [
          "Máy làm đúng theo những gì được ghi, không đoán ý người ghi",
          "Vì máy chậm hơn người khi đọc những bảng tính quá dài",
          "Vì AI chỉ đọc được file có dưới một trăm dòng dữ liệu",
          "Vì phần mềm tự động hoá không mở được file bảng tính",
        ],
        correct: 0,
        explanation:
          "Người đọc \"2tr\" hiểu ngay là hai triệu; quy trình tự động thì không, và nó sẽ chạy tiếp với giá trị sai hoặc trống. AI có thể đoán, nhưng đoán không nhất quán giữa các lần. Dữ liệu sạch biến việc đoán thành việc đọc.",
      },
      {
        question: "Bảng khách hàng có hai dòng \"Cty TNHH Minh An\" và \"Công ty Minh An\". Rủi ro chính là gì?",
        options: [
          "Máy coi là hai khách, doanh số và công nợ bị tách đôi",
          "Không sao, vì hai tên gần giống nhau nên máy tự gộp lại",
          "Chỉ làm bảng dài thêm một dòng, số liệu tổng không đổi gì",
          "Máy sẽ báo lỗi trùng lặp và không cho lưu bảng tính nữa",
        ],
        correct: 0,
        explanation:
          "Máy so chữ từng ký tự, nên hai cách viết là hai khách khác nhau. Doanh số, công nợ và lịch sử của một khách bị chia làm hai. Cách chữa: mỗi khách một mã riêng (ví dụ KH0042) và dùng mã đó ở mọi bảng, tên chỉ để hiển thị.",
      },
    ],
    keyTakeaways: [
      "Một dòng một bản ghi, một cột một loại thông tin.",
      "Không gộp ô, không dòng tổng giữa bảng, không ghi chú lẫn vào cột số.",
      "Mỗi cột một kiểu: số là số, ngày là ngày, chữ là chữ.",
      "Mỗi đối tượng (khách, sản phẩm) một mã riêng, dùng mã ở mọi bảng.",
      "Dữ liệu sạch là điều kiện để tự động hoá, dashboard và AI chạy đúng.",
    ],
    practicePrompt: {
      question: "Bạn muốn hỏi AI \"tháng này chi tiêu nhóm nào tăng nhiều nhất\" trên bảng chi phí. Việc nào nên làm trước?",
      options: [
        "Tách ghi chú khỏi cột số tiền và thống nhất tên các nhóm chi",
        "Dán nguyên bảng vào AI và dặn nó tự bỏ qua những ô bị lỗi",
        "Tô màu từng nhóm chi phí khác nhau để AI dễ phân biệt hơn",
        "Chuyển bảng sang định dạng PDF cho gọn rồi mới gửi cho AI",
      ],
      correct: 0,
      explanation:
        "AI trả lời trên dữ liệu bạn đưa. Nếu \"Marketing\" và \"MKT\" là hai nhóm, hay số tiền có chữ lẫn vào, câu trả lời sai mà trông rất chắc chắn. Làm sạch trước, hỏi sau. Màu sắc và PDF chỉ làm máy khó đọc cấu trúc hơn.",
    },
    summary: {
      keyIdea: "Bảng tính đúng cấu trúc là cơ sở dữ liệu đầu tiên - và là điều kiện để mọi công nghệ phía sau chạy.",
      formula: "Dòng = bản ghi · Cột = một loại · Không gộp ô · Ghi chú ở cột riêng · Mỗi đối tượng một mã.",
      commonMistake: "Thiết kế bảng cho mắt người đọc (gộp ô, tô màu, dòng tổng giữa bảng) thay vì cho máy đọc.",
      action: "Chọn một bảng bạn dùng hằng tuần và sửa ba lỗi cấu trúc đầu tiên bạn thấy.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở một bảng tính bạn cập nhật hằng tuần. Dò theo bốn quy tắc: có ô gộp không, có dòng tổng giữa bảng không, có chữ lẫn trong cột số không, có cột nào trộn nhiều kiểu không. Sửa trên một bản sao và ghi lại mất bao lâu.",
      secondary: "Nếu bảng dùng chung, thống nhất mẫu với đồng nghiệp trước khi sửa bản chính.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn không cần phần mềm cơ sở dữ liệu đắt tiền để có một cơ sở dữ liệu. Một trang Google Sheets hay Excel sắp đúng cách đã là một cơ sở dữ liệu - thứ mà quy trình tự động, dashboard và AI đọc được. Sắp sai thì chúng đọc ra số sai mà không báo.",
      },
      { type: "heading", text: "Bảng cho mắt người và bảng cho máy" },
      {
        type: "comparison",
        left: { label: "Bảng cho mắt người", text: "Tiêu đề gộp ô, mỗi tháng một khối, dòng tổng xen giữa, tô màu đỏ là \"chưa trả\", ghi chú viết thẳng vào ô số." },
        right: { label: "Bảng cho máy", text: "Một dòng tiêu đề duy nhất, mỗi dòng một hoá đơn, cột Tháng, cột Trạng thái, cột Ghi chú. Tổng và màu làm ở báo cáo riêng." },
      },
      {
        type: "code",
        language: "text",
        code: `Ma_HD   | Ngay       | Ma_KH  | Khach_hang       | So_tien   | Trang_thai | Ghi_chu
HD0101  | 2026-04-03 | KH0042 | Cty TNHH Minh An | 1500000   | Da_tra     |
HD0102  | 2026-04-05 | KH0017 | Cty Hoa Sen      | 2000000   | Chua_tra   | Thieu hoa don VAT
HD0103  | 2026-04-08 | KH0042 | Cty TNHH Minh An | 800000    | Tam_tinh   | Cho bao gia chot`,
        caption: "Mỗi dòng một hoá đơn. Số tiền là số thuần. Mọi thứ còn lại có cột riêng.",
      },
      { type: "heading", text: "Năm quy tắc" },
      {
        type: "list",
        items: [
          "Một dòng tiêu đề duy nhất ở hàng đầu tiên, tên cột ngắn và không trùng.",
          "Một dòng là một bản ghi. Không dòng trống, không dòng tổng xen giữa.",
          "Một cột một kiểu: số tiền là số thuần, ngày là ngày, không trộn chữ.",
          "Không gộp ô. Mỗi ô tự đứng được khi lọc hay sắp xếp.",
          "Mỗi khách, mỗi sản phẩm có một mã riêng; tên có thể viết khác, mã thì không.",
        ],
      },
      {
        type: "paragraph",
        text: "Công cụ giúp giữ quy tắc: kiểm tra dữ liệu (data validation) để cột Trạng thái chỉ nhận vài giá trị có sẵn; định dạng bảng (Table trong Excel) để công thức tự kéo theo dòng mới; Power Query trong Excel để làm sạch dữ liệu nhập từ nơi khác theo cùng một cách mỗi lần.",
      },
      {
        type: "callout",
        label: "Vì sao chuyện này quyết định tự động hoá",
        text: "Quy trình tự động đọc cột \"So_tien\" và cộng. Gặp \"2tr\", nó không hỏi lại - nó bỏ qua hoặc dừng. AI thì có thể đoán, nhưng đoán khác nhau mỗi lần. Dữ liệu sạch là thứ duy nhất làm cả hai chạy đúng mà không cần người canh.",
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Làm sạch trên bản chính có thể làm hỏng công thức người khác đang dùng. Luôn làm trên bản sao, và báo trước cho người dùng chung bảng khi đổi cấu trúc cột.",
      },
      {
        type: "closing",
        lines: [
          "Bảng tính sắp đúng là cơ sở dữ liệu miễn phí tốt nhất bạn có.",
          "Bài sau: khi bảng tính không còn đủ, chọn công cụ nào.",
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1804,
    slug: "mua-cau-hinh-hay-tu-dung-cong-cu",
    title: "Chặng 24, Bài 5: Mua, cấu hình hay tự dựng - chọn công cụ cho một nhu cầu",
    subtitle: "Năm tiêu chí để không mua nhầm một phần mềm mà ba năm sau không bỏ ra được.",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Mỗi phòng ban sớm muộn sẽ phải chọn: mua một phần mềm chuyên dụng, cấu hình lại công cụ đã có, hay tự dựng một thứ bằng bảng tính và tự động hoá. Chọn theo bản demo đẹp thường dẫn tới chi phí ẩn, dữ liệu không lấy ra được, và một hệ thống không ai bảo trì khi người dựng nghỉ việc.",
    openingQuestion:
      "Phòng marketing cần theo dõi 40 chiến dịch mỗi quý. Công ty đã có Google Workspace. Nên bắt đầu từ đâu?",
    openingOptions: [
      "Cấu hình một Google Sheets có cấu trúc tốt, chạy thử một quý",
      "Mua ngay phần mềm quản lý chiến dịch chuyên dụng mạnh nhất",
      "Nhờ phòng IT viết riêng một phần mềm quản lý chiến dịch",
      "Mỗi người tự theo dõi chiến dịch của mình theo cách riêng",
    ],
    correctOption: 0,
    explanation:
      "Với 40 chiến dịch mỗi quý, một bảng tính có cấu trúc tốt trên công cụ đã có thường đủ, không tốn thêm phí, và cho phòng hiểu rõ mình thật sự cần gì. Sau một quý, nếu vướng giới hạn thật (nhiều người sửa cùng lúc, cần phân quyền chi tiết), lúc đó mới mua - với danh sách yêu cầu cụ thể. Mua ngay thì trả tiền cho tính năng chưa biết có dùng không; tự viết phần mềm thì tạo ra thứ cần người bảo trì mãi.",
    diagram: [
      { label: "Nhu cầu cụ thể: việc gì, bao nhiêu người, bao nhiêu dữ liệu", arrow: true },
      { label: "Cấu hình công cụ đã có trước", arrow: true },
      { label: "Vướng giới hạn thật → so sánh mua theo năm tiêu chí", arrow: true },
      { label: "Tự dựng chỉ khi không có gì phù hợp và có người bảo trì" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng nhân sự 4 người",
      description:
        "Phòng dựng quy trình duyệt nghỉ phép bằng Google Forms, Sheets và một đoạn Apps Script do một nhân viên tự viết. Chạy tốt hai năm. Người viết nghỉ việc, một năm sau Google đổi một quyền truy cập và đoạn mã ngừng gửi email duyệt - không ai biết sửa, và mất ba tuần mới có người phát hiện đơn nghỉ phép bị treo. Cái sai không phải ở việc tự dựng, mà ở chỗ không có người thứ hai hiểu nó.",
    },
    quiz: [
      {
        question: "\"Chi phí thật\" của một phần mềm thuê bao gồm những gì?",
        options: [
          "Phí thuê theo người dùng, thời gian đào tạo, chuyển dữ liệu và thời gian quản trị",
          "Chỉ phí thuê hằng tháng như trên trang bảng giá của nhà cung cấp",
          "Phí thuê cộng với chi phí mua máy chủ để phần mềm đó chạy",
          "Chỉ phí năm đầu, vì các năm sau nhà cung cấp luôn giảm giá",
        ],
        correct: 0,
        explanation:
          "Giá trên bảng giá thường tính theo người dùng mỗi tháng - phòng tăng người thì tăng theo. Thêm vào đó: giờ đào tạo, công chuyển dữ liệu cũ sang, giờ quản trị tài khoản và quyền hằng tháng. Phần mềm thuê bao không cần bạn mua máy chủ; và giá gia hạn có thể tăng chứ không chắc giảm.",
      },
      {
        question: "\"Khoá chặt vào nhà cung cấp\" (vendor lock-in) nghĩa là gì?",
        options: [
          "Rời đi quá tốn kém vì dữ liệu và quy trình gắn chặt vào họ",
          "Nhà cung cấp khoá tài khoản nếu công ty chậm thanh toán",
          "Nhà cung cấp mã hoá dữ liệu nên người ngoài không đọc được",
          "Hợp đồng bắt công ty phải dùng phần mềm tối thiểu mười năm",
        ],
        correct: 0,
        explanation:
          "Lock-in là khi chi phí rời đi cao tới mức bạn ở lại dù không hài lòng: dữ liệu không xuất ra đủ, quy trình đã xây quanh tính năng riêng của họ, nhân viên chỉ quen một giao diện. Nó thường không nằm trong hợp đồng - nó tích tụ dần. Mã hoá là chuyện bảo mật, không liên quan.",
      },
      {
        question: "Rủi ro lớn nhất của một công cụ \"tự dựng\" bằng bảng tính và Apps Script là gì?",
        options: [
          "Chỉ người dựng hiểu nó, không ai khác sửa được",
          "Bảng tính không chứa nổi quá một nghìn dòng",
          "Apps Script bị cấm dùng trong mọi công ty lớn",
          "Công cụ tự dựng luôn chạy chậm hơn phần mềm đi mua",
        ],
        correct: 0,
        explanation:
          "Công cụ tự dựng rẻ và vừa khít nhu cầu, nhưng hay có một điểm yếu: chỉ người dựng hiểu. Người đó nghỉ, công cụ hỏng lần đầu là không ai sửa được. Bảng tính chứa được nhiều hơn một nghìn dòng rất xa. Cách giảm rủi ro: ghi tài liệu, có người thứ hai, và có cảnh báo khi lỗi.",
      },
      {
        question: "Khi so sánh hai phần mềm, câu hỏi nào thường bị bỏ qua nhất?",
        options: [
          "Khi thôi dùng, dữ liệu xuất ra được đầy đủ không",
          "Giao diện có đẹp, hiện đại hơn bên kia không",
          "Phần mềm có tính năng AI mới được quảng cáo nhiều không",
          "Bên bán có cho dùng thử miễn phí trong tháng đầu hay không",
        ],
        correct: 0,
        explanation:
          "Lúc mua, ai cũng nghĩ tới việc dùng, ít ai nghĩ tới việc rời đi. Nhưng rời đi là chuyện chắc chắn xảy ra - đổi nhu cầu, đổi giá, nhà cung cấp đóng cửa. Hỏi trước về định dạng xuất, API, và hạn giữ dữ liệu sau khi huỷ rẻ hơn nhiều so với phát hiện lúc cần.",
      },
      {
        question: "Với phần mềm mới, \"ai bảo trì\" nghĩa là cần trả lời câu gì?",
        options: [
          "Ai thêm người dùng, sửa cấu hình và xử lý khi nó lỗi",
          "Nhà cung cấp có đội hỗ trợ hai tư giờ mỗi ngày hay không",
          "Ai trong phòng dùng phần mềm này nhiều giờ nhất mỗi ngày",
          "Phòng IT có đồng ý nhận phần mềm này về quản lý hay không",
        ],
        correct: 0,
        explanation:
          "Mọi công cụ đều cần một chủ: người cấp và thu quyền, đổi cấu hình khi quy trình đổi, và là người đầu tiên biết khi nó hỏng. Đội hỗ trợ của nhà cung cấp chỉ lo phần của họ. Không có chủ rõ ràng thì công cụ dần lỗi thời và không ai dám đụng vào.",
      },
    ],
    keyTakeaways: [
      "Thứ tự nên thử: cấu hình công cụ đã có → mua → tự dựng.",
      "Chi phí thật = phí thuê + đào tạo + chuyển dữ liệu + thời gian quản trị.",
      "Hỏi \"rời đi thế nào\" ngay từ lúc mua.",
      "Mọi công cụ cần một người chủ và một người thứ hai hiểu nó.",
      "Lock-in tích tụ dần qua dữ liệu và thói quen, không chỉ qua hợp đồng.",
    ],
    practicePrompt: {
      question: "Phòng vận hành cần một công cụ duyệt đơn mua hàng: 30 đơn/tháng, 3 cấp duyệt. Đồng nghiệp đề xuất tự viết bằng Apps Script. Câu hỏi quan trọng nhất cần hỏi trước là gì?",
      options: [
        "Nếu người viết nghỉ, ai sửa được khi quy trình này hỏng",
        "Apps Script có chạy được trên điện thoại của sếp hay không",
        "Viết bằng Apps Script mất bao lâu so với khi dùng Excel",
        "Có thể thêm biểu đồ màu sắc cho giao diện duyệt đơn không",
      ],
      correct: 0,
      explanation:
        "Quy trình duyệt mua hàng liên quan tới tiền - hỏng là đơn bị treo hoặc duyệt sai. Tự dựng được, nhưng chỉ khi có tài liệu, có người thứ hai hiểu, và có cảnh báo khi lỗi. Nếu không có ai, một công cụ duyệt có sẵn (kể cả tính năng duyệt trong phần mềm đã có) an toàn hơn.",
    },
    summary: {
      keyIdea: "Chọn công cụ theo nhu cầu cụ thể và năm tiêu chí, không theo bản demo.",
      formula: "Chi phí thật · Dữ liệu ra được không · Phân quyền · Ai bảo trì · Mức khoá chặt.",
      commonMistake: "Mua phần mềm mạnh nhất khi một bảng tính có cấu trúc đã đủ, hoặc tự dựng mà chỉ một người hiểu.",
      action: "Chấm điểm một công cụ phòng bạn đang dùng theo năm tiêu chí.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một công cụ phòng bạn đang dùng. Chấm từ 1 tới 3 cho năm tiêu chí: chi phí thật, dữ liệu ra được không, phân quyền, ai bảo trì, mức khoá chặt. Tiêu chí nào 1 điểm là rủi ro cần báo.",
      secondary: "Làm tương tự trước khi đồng ý dùng thử bất kỳ phần mềm mới nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Một buổi demo 30 phút có thể khiến cả phòng muốn mua ngay. Nhưng câu hỏi quyết định không nằm trong demo: tổng chi phí là bao nhiêu, dữ liệu có lấy ra được không, và ai sẽ lo nó khi có chuyện.",
      },
      { type: "heading", text: "Ba lựa chọn" },
      {
        type: "conceptTable",
        title: "Mua, cấu hình, tự dựng",
        concepts: [
          { vi: "Cấu hình công cụ đã có", en: "Configure", def: "Dùng Google Sheets, Excel, Forms, tính năng có sẵn trong Microsoft 365 hay phần mềm công ty đã trả tiền. Rẻ, nhanh, đủ cho phần lớn nhu cầu nhỏ." },
          { vi: "Mua phần mềm chuyên dụng", en: "Buy", def: "Phần mềm thuê bao làm đúng một việc. Nhiều tính năng, có hỗ trợ - đổi lại phí định kỳ và phụ thuộc nhà cung cấp." },
          { vi: "Tự dựng", en: "Build", def: "Ghép bảng tính, Apps Script, n8n hay công cụ no-code thành một quy trình riêng. Vừa khít nhu cầu - và cần người bảo trì." },
        ],
      },
      { type: "heading", text: "Năm tiêu chí" },
      {
        type: "list",
        items: [
          "Chi phí thật: phí thuê theo người dùng, đào tạo, chuyển dữ liệu, giờ quản trị hằng tháng.",
          "Dữ liệu ra được không: xuất file đầy đủ, có API, giữ dữ liệu bao lâu sau khi huỷ.",
          "Phân quyền: ai xem, ai sửa, ai duyệt - có chia được theo vai trò không.",
          "Ai bảo trì: một người chủ rõ ràng và ít nhất một người thứ hai hiểu nó.",
          "Mức khoá chặt: nếu năm sau muốn đổi, mất bao nhiêu công và dữ liệu nào không mang theo được.",
        ],
      },
      {
        type: "paragraph",
        text: "Không có lựa chọn nào luôn đúng. Bảng tính rất tốt khi ít người sửa và dữ liệu vừa phải; nó bắt đầu vướng khi nhiều người sửa cùng lúc và cần phân quyền theo từng dòng. Phần mềm chuyên dụng tốt khi nhu cầu đã rõ; nó tốn kém khi bạn còn đang tìm hiểu mình cần gì.",
      },
      {
        type: "comparison",
        left: { label: "Chọn theo demo", text: "\"Giao diện đẹp, có AI, bên bán hứa hỗ trợ tận tình.\" Ký hợp đồng năm. Sáu tháng sau phát hiện xuất dữ liệu thiếu lịch sử." },
        right: { label: "Chọn theo tiêu chí", text: "Dùng thử với dữ liệu thật, thử xuất ra, hỏi giá khi tăng người, chỉ định người chủ trước khi ký." },
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Dùng thử miễn phí bằng dữ liệu thật của khách hàng là đưa dữ liệu cho một bên chưa có hợp đồng. Dùng dữ liệu mẫu hoặc đã ẩn thông tin cá nhân cho tới khi công ty duyệt nhà cung cấp.",
      },
      {
        type: "closing",
        lines: [
          "Công cụ tốt nhất là công cụ đủ dùng, lấy dữ liệu ra được, và có người chịu trách nhiệm.",
          "Bài sau: vẽ bản đồ toàn bộ công cụ của phòng bạn.",
        ],
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1805,
    slug: "du-an-ban-do-cong-cu-va-luong-du-lieu",
    title: "Chặng 24, Bài 6: Dự án - vẽ bản đồ công cụ và luồng dữ liệu của phòng bạn",
    subtitle: "Một trang giấy cho thấy dữ liệu đi từ đâu tới đâu - và chỗ nào đang có người chép tay.",
    duration: "25 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    whyItMatters:
      "Trước khi tự động hoá hay đưa AI vào, bạn cần biết hiện trạng: phòng dùng những công cụ nào, dữ liệu gì nằm ở đâu, và ở đâu một người đang chép tay từ hệ thống này sang hệ thống kia. Bản đồ đó là đầu vào của mọi dự án cải tiến - và thường tự nó đã lộ ra việc nên sửa đầu tiên.",
    openingQuestion:
      "Khi vẽ bản đồ luồng dữ liệu của phòng, dấu hiệu nào cho thấy một chỗ đáng tự động hoá nhất?",
    openingOptions: [
      "Một người chép cùng dữ liệu giữa hai hệ thống, đều đặn, theo luật rõ",
      "Một công cụ mà cả phòng mở ra dùng nhiều giờ nhất trong ngày",
      "Một phần mềm đắt nhất trong danh sách những thứ phòng đang thuê",
      "Một báo cáo mà sếp hay hỏi nhưng mỗi lần hỏi lại một kiểu khác",
    ],
    correctOption: 0,
    explanation:
      "Tự động hoá hợp nhất với việc lặp lại đều đặn, có luật rõ ràng, và đang tốn giờ người: chép đơn từ phần mềm bán hàng sang bảng tính mỗi sáng, nhập lại hoá đơn từ email vào phần mềm kế toán. Công cụ dùng nhiều giờ chưa chắc có việc chép tay. Phần mềm đắt là câu hỏi chi phí, không phải tự động hoá. Báo cáo mỗi lần một kiểu thì chưa có luật để máy làm theo - cần thống nhất yêu cầu trước.",
    diagram: [
      { label: "Liệt kê mọi công cụ phòng đang dùng", arrow: true },
      { label: "Ghi dữ liệu gì nằm ở công cụ nào, ai giữ", arrow: true },
      { label: "Vẽ mũi tên dữ liệu đi giữa các công cụ", arrow: true },
      { label: "Đánh dấu mũi tên nào đang do người chép tay" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng kinh doanh xuất khẩu 6 người",
      description:
        "Bản đồ vẽ trong một buổi chiều cho thấy 7 công cụ và 11 mũi tên dữ liệu, trong đó 4 mũi tên là người chép tay. Mũi tên tốn nhất: mỗi đơn xác nhận qua email được gõ lại vào phần mềm kế toán, khoảng 5 giờ mỗi tuần. Đó trở thành dự án tự động hoá đầu tiên của phòng - chọn vì nó rõ luật và tốn giờ nhất, không vì nó hấp dẫn nhất.",
    },
    quiz: [
      {
        question: "Cột nào trong bảng kê công cụ giúp phát hiện rủi ro khi một người nghỉ việc?",
        options: [
          "Người quản trị và tài khoản đăng nhập là của ai",
          "Phí thuê bao hằng tháng của từng phần mềm một",
          "Màu giao diện và ngôn ngữ đang cài trên phần mềm",
          "Số lần mỗi người trong phòng mở công cụ đó mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Nếu phần mềm quan trọng chỉ có một quản trị viên, hoặc được đăng ký bằng email cá nhân của một nhân viên, người đó nghỉ là phòng có thể mất quyền vào. Cột này làm lộ rủi ro ngay trên bản đồ. Chi phí quan trọng nhưng là câu hỏi khác.",
      },
      {
        question: "Vì sao cần ghi \"hệ thống gốc\" cho mỗi loại dữ liệu?",
        options: [
          "Để biết khi hai nơi lệch nhau thì tin nơi nào",
          "Để biết phần mềm nào được mua trước và cũ nhất",
          "Để xoá dữ liệu ở mọi nơi khác cho đỡ trùng lặp",
          "Để tính xem phần mềm nào chứa nhiều dữ liệu nhất",
        ],
        correct: 0,
        explanation:
          "Cùng một danh sách khách có thể nằm ở CRM, bảng tính và phần mềm kế toán. Khi số điện thoại ở ba nơi khác nhau, cần biết nơi nào là gốc (source of truth) - nơi được sửa trước, các nơi khác chép theo. Không cần xoá bản sao, chỉ cần biết bản nào đúng.",
      },
      {
        question: "Bạn tìm được 5 chỗ chép tay. Nên chọn chỗ nào làm dự án tự động hoá đầu tiên?",
        options: [
          "Chỗ tốn nhiều giờ nhất mà có luật rõ và ít ngoại lệ",
          "Chỗ khó nhất, để chứng minh tự động hoá làm được mọi thứ",
          "Chỗ liên quan tới nhiều phòng ban nhất trong toàn công ty",
          "Chỗ mà sếp nhắc tới nhiều nhất trong các cuộc họp tuần",
        ],
        correct: 0,
        explanation:
          "Dự án đầu tiên nên thắng nhanh và đo được: tiết kiệm giờ rõ ràng, luật chuyển dữ liệu đơn giản, ít trường hợp đặc biệt. Chọn chỗ khó nhất hay liên quan nhiều phòng dễ kéo dài và thất bại, làm cả phòng mất niềm tin vào tự động hoá.",
      },
      {
        question: "Trên bản đồ, một mũi tên ghi \"xuất CSV, gửi email, người kia nhập lại\". Nó thuộc loại nào?",
        options: [
          "Chép tay - ứng viên tự động hoá",
          "Đã tự động hoá, vì có dùng tính năng xuất file",
          "Tích hợp API vì dữ liệu là CSV",
          "Không phải luồng dữ liệu, chỉ là trao đổi qua email",
        ],
        correct: 0,
        explanation:
          "Có dùng tính năng xuất file không có nghĩa là tự động: vẫn có người bấm xuất, người gửi, người nhập lại - ba chỗ có thể quên hoặc sai. Đây đúng là luồng dữ liệu, và là ứng viên tốt để thay bằng một quy trình gọi API hoặc đọc file tự động.",
      },
      {
        question: "Bản đồ xong có 9 công cụ, trong đó 3 công cụ chứa cùng danh sách khách. Kết luận nào hợp lý?",
        options: [
          "Chọn một nơi làm gốc, các nơi khác đồng bộ theo nó",
          "Phải mua ngay một phần mềm mới để gộp cả ba nơi đó vào",
          "Xoá hai nơi còn lại ngay hôm nay cho gọn bản đồ",
          "Bình thường, cứ để mỗi người sửa ở nơi mình quen",
        ],
        correct: 0,
        explanation:
          "Ba nơi chứa cùng dữ liệu là nguồn lệch số. Nhưng xoá vội có thể làm hỏng quy trình đang dựa vào chúng, và mua thêm phần mềm là thêm nơi thứ tư. Bước đúng: chọn hệ thống gốc, rồi dần dần cho các nơi khác lấy từ đó - thủ công trước, tự động sau.",
      },
    ],
    keyTakeaways: [
      "Vẽ hiện trạng trước khi cải tiến: công cụ, dữ liệu, mũi tên.",
      "Mỗi loại dữ liệu có một hệ thống gốc.",
      "Mũi tên do người chép tay là ứng viên tự động hoá.",
      "Chọn dự án đầu tiên tốn giờ nhất mà có luật rõ, không phải khó nhất.",
      "Ghi người quản trị của mỗi công cụ để thấy rủi ro khi có người nghỉ.",
    ],
    practicePrompt: {
      question: "Bảng kê của bạn có dòng: \"Sheets theo dõi đơn - nhập tay từ email xác nhận - 1 giờ/ngày - chị Hà làm\". Ghi thêm điều gì là quan trọng nhất cho chặng tự động hoá?",
      options: [
        "Email xác nhận có mẫu cố định không, và có những ngoại lệ nào",
        "Chị Hà thường làm việc này vào buổi sáng hay buổi chiều",
        "Bảng Sheets đó đang dùng phông chữ và màu nền như thế nào",
        "Phòng đã dùng Google Sheets được bao nhiêu năm tới nay",
      ],
      correct: 0,
      explanation:
        "Tự động hoá chạy được khi đầu vào có mẫu. Nếu email xác nhận luôn cùng một bố cục, một quy trình đọc được; nếu mỗi khách gửi một kiểu, có thể cần AI trích dữ liệu và người duyệt. Danh sách ngoại lệ cho biết quy trình phải xử lý những trường hợp nào.",
    },
    summary: {
      keyIdea: "Bản đồ công cụ và luồng dữ liệu cho thấy hiện trạng, và các mũi tên chép tay chính là danh sách việc cho tự động hoá.",
      formula: "Công cụ + dữ liệu ở đâu + ai giữ + mũi tên + mũi tên nào chép tay = bản đồ.",
      commonMistake: "Nhảy vào tự động hoá một chỗ nổi bật mà không vẽ hiện trạng, rồi phát hiện dữ liệu gốc lại nằm ở nơi khác.",
      action: "Hoàn thành bảng kê công cụ và bảng luồng dữ liệu của phòng, khoanh ba mũi tên chép tay tốn giờ nhất.",
    },
    application: {
      title: "Dự án: bản đồ của phòng bạn",
      message:
        "Làm theo sáu bước trong bài, điền hai bảng mẫu cho phòng bạn. Xong là khi bạn có: danh sách mọi công cụ kèm người quản trị, hệ thống gốc cho mỗi loại dữ liệu, và ba mũi tên chép tay được xếp theo số giờ mỗi tuần.",
      secondary: "Giữ bản đồ này - Chặng 27 sẽ chọn một mũi tên trong đó để tự động hoá.",
    },
    sections: [
      {
        type: "lead",
        text: "Dự án cuối chặng: vẽ bản đồ công cụ và luồng dữ liệu của phòng bạn. Không cần phần mềm vẽ - một bảng tính hay tờ giấy là đủ. Đầu ra là hai bảng và ba mũi tên được khoanh đỏ, và đó là danh sách việc cho chặng tự động hoá.",
      },
      { type: "heading", text: "Bước 1: Liệt kê mọi công cụ" },
      {
        type: "paragraph",
        text: "Mở trình duyệt và thanh tác vụ của bạn, hỏi hai đồng nghiệp. Ghi mọi thứ phòng dùng để làm việc: phần mềm thuê bao, bảng tính dùng chung, nhóm chat, email, cả tệp Excel trên ổ chung. Một bảng tính quan trọng cũng là một công cụ.",
      },
      {
        type: "code",
        language: "text",
        code: `BANG 1 - CONG CU
Cong_cu            | Loai        | Dung_de_lam           | Quan_tri   | Tai_khoan   | Xuat_du_lieu
CRM (thue bao)     | SaaS        | Khach, co hoi ban     | Anh Minh   | Cong ty     | CSV, co API
Sheets Theo doi don| Bang tinh   | Don hang theo ngay    | Chi Ha     | Cong ty     | Co san
Phan mem ke toan   | SaaS        | Hoa don, cong no      | Ke toan    | Cong ty     | Excel
Zalo nhom phong    | Chat        | Bao don gap           | (khong ro) | Ca nhan     | Khong
Email              | SaaS        | Xac nhan don voi khach| IT         | Cong ty     | -`,
        caption: "Cột Quản trị và Tài khoản làm lộ rủi ro khi có người nghỉ. \"Không rõ\" và \"Cá nhân\" là hai chữ cần để ý.",
      },
      { type: "heading", text: "Bước 2: Mỗi loại dữ liệu nằm ở đâu" },
      {
        type: "list",
        items: [
          "Liệt kê các loại dữ liệu chính: khách hàng, đơn hàng, hoá đơn, sản phẩm, nhân sự...",
          "Với mỗi loại, ghi những công cụ đang chứa nó.",
          "Chọn và ghi rõ một hệ thống gốc: nơi được sửa đầu tiên, nơi đúng khi các nơi lệch nhau.",
          "Ghi loại dữ liệu nào nhạy cảm (thông tin cá nhân, lương, giá vốn) để biết chỗ nào cần cẩn thận.",
        ],
      },
      { type: "heading", text: "Bước 3: Vẽ mũi tên" },
      {
        type: "code",
        language: "text",
        code: `BANG 2 - LUONG DU LIEU
Tu               -> Den              | Du_lieu        | Cach_chuyen              | Tan_suat  | Gio/tuan
Email xac nhan   -> Sheets theo doi  | Don hang       | Chi Ha go tay            | Hang ngay | 5
Sheets theo doi  -> Phan mem ke toan | Don da giao    | Xuat CSV, ke toan nhap   | Hang tuan | 2
CRM              -> Sheets theo doi  | Ten khach      | Chep tay                 | Khi co don| 1
Cong thanh toan  -> Phan mem ke toan | Tien da nhan   | Tich hop san (API)       | Tu dong   | 0`,
        caption: "Mỗi dòng là một mũi tên. Cột Cách chuyển cho biết mũi tên nào đang tự chạy, mũi tên nào do người làm.",
      },
      { type: "heading", text: "Bước 4 đến 6: Khoanh, xếp hạng, kiểm lại" },
      {
        type: "list",
        items: [
          "Bước 4 - Khoanh mọi mũi tên có chữ \"tay\", \"nhập\", \"chép\" hay \"xuất rồi gửi\". Đó là chỗ chép tay.",
          "Bước 5 - Xếp các mũi tên đã khoanh theo giờ mỗi tuần. Ghi thêm: đầu vào có mẫu cố định không, ngoại lệ thường gặp là gì.",
          "Bước 6 - Gửi bản đồ cho một đồng nghiệp và hỏi: \"còn thiếu công cụ hay mũi tên nào không?\" Người làm hằng ngày luôn biết một đường tắt bạn chưa thấy.",
        ],
      },
      {
        type: "callout",
        label: "Xong là khi",
        text: "Bảng 1 có đủ công cụ, mỗi dòng có người quản trị. Bảng 2 có hệ thống gốc cho mỗi loại dữ liệu và mọi mũi tên đã biết. Ba mũi tên chép tay tốn giờ nhất được xếp hạng, kèm ghi chú về mẫu đầu vào và ngoại lệ. Một đồng nghiệp đã đọc và xác nhận.",
      },
      {
        type: "callout",
        label: "Rủi ro",
        text: "Bản đồ này tự nó là thông tin nhạy cảm: nó cho biết dữ liệu quan trọng nằm ở đâu và ai giữ quyền. Lưu trong tài khoản công ty, chia sẻ cho người cụ thể, và không ghi mật khẩu hay khoá API vào đó.",
      },
      {
        type: "closing",
        lines: [
          "Bạn vừa làm việc đầu tiên của mọi dự án công nghệ tốt: nhìn rõ hiện trạng.",
          "Ba mũi tên khoanh đỏ là việc của Chặng 27 - tự động hoá không cần code.",
        ],
      },
    ],
  },
];
