import type { Lesson } from "./lesson-types";

// Chặng 27 "Tự động hoá công việc đơn giản hơn bạn nghĩ (không cần code)"
// (ids 1830-1835, personal track).
//
// Dành cho người đi làm không học CS: kế toán, vận hành, kinh doanh. Công cụ
// chính là n8n và Google Sheets + Apps Script; Zapier, Make, Power Automate chỉ
// được nhắc như lựa chọn tương đương, vì khái niệm trigger → điều kiện → hành
// động giống nhau ở mọi nơi còn giao diện thì đổi liên tục. Vì thế bài mô tả ở
// mức khái niệm và thứ tự bước, không ghi đường dẫn nút bấm hay giá tiền.
//
// Phần API (khoá, JSON, giới hạn tần suất, webhook) đã dạy kỹ ở chặng 7
// (id 269-278); bài 6 ở đây chỉ dùng lại những ý đó, không dạy lại.

export const WORK_AUTOMATION_LESSONS: Lesson[] = [
  // ── Bài 1 ────────────────────────────────────────────────────────────────
  {
    id: 1830,
    slug: "giai-phau-mot-workflow-tu-dong",
    title: "Chặng 27, Bài 1: Giải phẫu một workflow - kích hoạt, điều kiện, hành động",
    subtitle: "Mọi workflow tự động, dù trong công cụ nào, đều ghép từ ba loại mảnh giống nhau.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🔀",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Người đi làm mất hàng giờ mỗi tuần cho việc chép dữ liệu từ chỗ này sang chỗ kia rồi báo cho ai đó. Phần lớn những việc ấy là một workflow chỉ gồm ba loại mảnh. Nhìn ra ba mảnh đó trong công việc của mình là bước khó nhất; phần dựng trong công cụ về sau chỉ là kéo thả.",
    openingQuestion:
      "Mỗi khi có đơn mới trong Google Form, chị Lan chép sang bảng tính rồi email cho kho. Nếu tự động hoá việc này, đâu là trình kích hoạt (trigger)?",
    openingOptions: [
      "Có một câu trả lời mới được gửi lên từ biểu mẫu",
      "Email gửi cho kho, vì đó là bước cuối của quy trình",
      "Bảng tính, vì mọi dữ liệu đơn hàng đều nằm ở đó",
      "Việc chép dữ liệu từ biểu mẫu sang bảng tính",
    ],
    correctOption: 0,
    explanation:
      "Trình kích hoạt là SỰ KIỆN làm workflow bắt đầu chạy - ở đây là lúc khách gửi biểu mẫu. Chép sang bảng tính và gửi email cho kho là hai hành động (action) chạy sau đó. Bảng tính là nơi dữ liệu nằm, không phải sự kiện. Phân biệt được \"cái gì làm nó chạy\" với \"nó làm gì\" là nền của mọi workflow, trong n8n, Zapier, Make hay Power Automate đều vậy.",
    diagram: [
      { label: "Trình kích hoạt: có đơn mới", arrow: true },
      { label: "Điều kiện: đơn trên 5 triệu?", arrow: true },
      { label: "Hành động: ghi bảng tính, gửi email", arrow: true },
      { label: "Dữ liệu của đơn đi qua từng bước" },
    ],
    realWorldExample: {
      company: "Tình huống: cửa hàng online 3 người",
      description:
        "Chủ cửa hàng chép tay mỗi đơn từ biểu mẫu sang bảng tính rồi nhắn cho người đóng gói, khoảng 3 phút một đơn. Khi viết quy trình ra giấy, họ thấy nó chỉ là: có đơn mới (kích hoạt) → ghi một dòng (hành động) → đơn giao nhanh thì báo riêng (điều kiện) → gửi tin cho người đóng gói (hành động).",
    },
    quiz: [
      {
        question: "Trong một workflow, \"hành động\" (action) là gì?",
        options: [
          "Một việc workflow làm, như ghi một dòng hay gửi email",
          "Sự kiện làm workflow bắt đầu chạy, như có đơn hàng mới",
          "Điều kiện quyết định nhánh nào sẽ được chạy tiếp theo",
          "Dữ liệu đi qua các bước, như tên và số điện thoại",
        ],
        correct: 0,
        explanation:
          "Hành động là việc workflow thực sự làm: ghi dòng, gửi email, tạo tệp, gọi một dịch vụ khác. Sự kiện làm nó bắt đầu là trình kích hoạt; bước tách nhánh là điều kiện; còn tên, số điện thoại là dữ liệu chảy qua các bước. Bốn khái niệm này hay bị trộn lẫn khi mới bắt đầu.",
      },
      {
        question: "Đơn trên 5 triệu cần quản lý duyệt, đơn nhỏ gửi thẳng cho kho. Bước nào tách hai loại đơn?",
        options: [
          "Một bước điều kiện so giá trị đơn với 5 triệu",
          "Trình kích hoạt, vì nó biết ngay đơn nào là đơn lớn",
          "Bước gửi email, để quản lý tự lọc thư nào cần duyệt",
          "Bảng tính, vì các đơn lớn sẽ tự được tô màu nổi bật",
        ],
        correct: 0,
        explanation:
          "Việc tách nhánh thuộc về bước điều kiện (thường gọi là IF hoặc Filter): nó đọc giá trị đơn rồi đưa dữ liệu sang nhánh \"cần duyệt\" hoặc \"gửi kho\". Trình kích hoạt chỉ báo có đơn, không phân loại. Đẩy việc lọc cho người nhận email là tự động hoá nửa vời - người vẫn phải làm phần khó.",
      },
      {
        question: "Bước gửi email cần tên khách. Tên đó lấy từ đâu?",
        options: [
          "Từ dữ liệu các bước trước chuyển tới",
          "Gõ cứng tên khách vào nội dung email mỗi lần",
          "Workflow tự đoán tên từ địa chỉ email của khách",
          "Mở lại biểu mẫu để hỏi khách thêm một lần nữa",
        ],
        correct: 0,
        explanation:
          "Mỗi bước nhận dữ liệu từ bước trước: trình kích hoạt mang theo các câu trả lời của biểu mẫu, và bước email chỉ việc tham chiếu trường \"Họ tên\" trong đó. Gõ cứng tên thì mọi email đều mang một tên; đoán từ địa chỉ email thì sai với phần lớn khách.",
      },
      {
        question: "Zapier, Make và Power Automate khác n8n ở điểm nào?",
        options: [
          "Cùng ý trigger - hành động, khác giao diện và cách tính phí",
          "Chúng chỉ dành cho lập trình viên, còn n8n cho người thường",
          "Chúng là công cụ tạo biểu mẫu, không chạy được workflow",
          "Chúng là AI viết nội dung, không nối được các ứng dụng",
        ],
        correct: 0,
        explanation:
          "Cả bốn đều là công cụ tự động hoá theo cùng mô hình: trình kích hoạt, điều kiện, hành động, dữ liệu đi qua các bước. Chúng khác nhau ở giao diện, số ứng dụng tích hợp sẵn, cách tính phí và việc có tự cài trên máy chủ riêng được hay không (n8n làm được). Học khái niệm ở một công cụ là dùng được ở công cụ kia.",
      },
      {
        question: "Trước khi mở công cụ để dựng workflow, việc đầu tiên nên làm là gì?",
        options: [
          "Viết ra quy trình làm tay hiện tại, từng bước một",
          "Chọn công cụ có nhiều tích hợp nhất trên thị trường",
          "Dựng ngay trên dữ liệu thật để thấy kết quả sớm",
          "Nhờ AI dựng cả workflow rồi sửa dần khi có lỗi",
        ],
        correct: 0,
        explanation:
          "Workflow tự động chỉ là quy trình làm tay được viết lại cho máy. Viết từng bước ra giấy giúp bạn thấy đâu là kích hoạt, đâu là điều kiện, dữ liệu nào cần mang theo - và thường lộ ra những bước thừa nên bỏ trước khi tự động. Dựng trên dữ liệu thật ngay từ đầu là cách gửi nhầm email cho khách.",
      },
    ],
    keyTakeaways: [
      "Workflow = trình kích hoạt + điều kiện + hành động, và dữ liệu chảy qua từng bước.",
      "Trình kích hoạt là sự kiện làm workflow chạy, không phải nơi dữ liệu nằm.",
      "Điều kiện tách nhánh; đừng đẩy việc lọc sang cho người nhận email.",
      "n8n, Zapier, Make, Power Automate dùng cùng khái niệm, khác giao diện và giá.",
      "Viết quy trình làm tay ra giấy trước khi mở công cụ.",
    ],
    practicePrompt: {
      question:
        "Workflow: \"8 giờ sáng mỗi ngày, lấy danh sách hoá đơn quá hạn; nếu có thì gửi email cho kế toán.\" Đâu là cách chia đúng?",
      options: [
        "Kích hoạt: 8 giờ sáng; điều kiện: có hoá đơn quá hạn; hành động: gửi email",
        "Kích hoạt: có hoá đơn quá hạn; điều kiện: 8 giờ sáng; hành động: gửi email",
        "Kích hoạt: gửi email; điều kiện: 8 giờ sáng; hành động: lấy danh sách hoá đơn",
        "Kích hoạt: kế toán; điều kiện: hoá đơn quá hạn; hành động: đúng 8 giờ sáng",
      ],
      correct: 0,
      explanation:
        "Sự kiện làm workflow chạy là giờ hẹn - đây là trình kích hoạt theo lịch. \"Có hoá đơn quá hạn không\" là điều kiện kiểm tra sau khi lấy danh sách. Gửi email là hành động. Lỗi hay gặp là coi hoá đơn quá hạn là trình kích hoạt, trong khi không có sự kiện nào báo \"hoá đơn vừa quá hạn\" - phải có ai đó đi kiểm tra theo giờ.",
    },
    summary: {
      keyIdea: "Mọi workflow là trình kích hoạt, điều kiện, hành động, với dữ liệu đi qua từng bước.",
      formula: "Sự kiện → (điều kiện?) → hành động → hành động…, mỗi bước dùng dữ liệu của bước trước.",
      commonMistake: "Nhầm nơi chứa dữ liệu (bảng tính) với sự kiện kích hoạt, hoặc bỏ bước điều kiện rồi bắt người nhận tự lọc.",
      action: "Chọn một việc lặp lại của bạn và viết nó thành bốn dòng: kích hoạt, điều kiện, hành động, dữ liệu cần mang theo.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một việc bạn làm tay mỗi tuần, ví dụ chép đơn hoặc nhắc hạn. Viết ra: sự kiện nào làm nó bắt đầu, có nhánh nào cần tách, bạn làm những hành động gì, và mỗi hành động cần dữ liệu gì. 15 phút là đủ.",
      secondary: "Bài sau: trong danh sách việc của bạn, việc nào thật sự đáng tự động hoá.",
    },
    sections: [
      {
        type: "lead",
        text: "Tự động hoá nghe như việc của kỹ sư. Thực ra phần lớn việc lặp lại ở văn phòng chỉ là: có chuyện gì đó xảy ra, kiểm tra một điều, rồi làm một vài việc. Bài này cho bạn cách nhìn ra cấu trúc đó trước khi đụng tới công cụ nào.",
      },
      {
        type: "feynman",
        title: "Workflow đơn giản hơn bạn nghĩ",
        intro: "Hãy nhìn một tiệm giặt ủi. Không ai gọi đó là \"tự động hoá\", nhưng nó chạy đúng như một workflow.",
        columns: ["Thành phần", "Tiệm giặt ủi", "Workflow trong n8n"],
        rows: [
          ["Trình kích hoạt", "Khách mang túi đồ tới gửi", "Có câu trả lời biểu mẫu mới"],
          ["Điều kiện", "Phân loại: đồ trắng, đồ màu, đồ giặt khô", "Bước IF: đơn trên 5 triệu hay không"],
          ["Hành động", "Giặt, sấy, ủi, gấp", "Ghi dòng vào bảng tính, tạo tệp"],
          ["Thông báo", "Nhắn khách đồ đã xong, tới lấy", "Gửi email hoặc tin nhắn cho người cần biết"],
          ["Dữ liệu đi theo", "Phiếu ghi tên khách đi cùng túi đồ", "Các trường của đơn chuyển từ bước này sang bước sau"],
        ],
        oneLiner: "Workflow là một dây chuyền: có việc tới, phân loại, xử lý, báo lại - và phiếu ghi tên đi theo suốt.",
      },
      { type: "heading", text: "Vấn đề: 3 phút mỗi đơn, nhân lên cả tháng" },
      {
        type: "paragraph",
        text: "Một cửa hàng nhận 30 đơn mỗi ngày qua biểu mẫu. Mỗi đơn mất khoảng 3 phút để chép sang bảng tính và nhắn cho kho - tức 90 phút mỗi ngày cho việc không cần suy nghĩ. Chép tay lâu ngày còn sinh lỗi: gõ nhầm số điện thoại, quên báo một đơn.",
      },
      { type: "heading", text: "Bốn mảnh ghép" },
      {
        type: "conceptTable",
        title: "Từ vựng chung của mọi công cụ tự động hoá",
        subtitle: "n8n, Zapier, Make, Power Automate đều dùng bốn khái niệm này, chỉ khác tên gọi",
        concepts: [
          { vi: "Trình kích hoạt", en: "Trigger", def: "Sự kiện làm workflow chạy: có biểu mẫu mới, có email tới, hoặc đến giờ hẹn (chạy theo lịch)." },
          { vi: "Điều kiện", en: "IF / Filter", def: "Bước kiểm tra một giá trị rồi quyết định đi nhánh nào, hoặc dừng." },
          { vi: "Hành động", en: "Action", def: "Việc workflow làm: ghi dòng, gửi email, tạo tệp, gọi một dịch vụ khác." },
          { vi: "Dữ liệu đi qua bước", en: "Data / Fields", def: "Các trường (tên, số tiền, email) mà bước trước chuyển cho bước sau dùng." },
        ],
      },
      { type: "heading", text: "Công cụ" },
      {
        type: "paragraph",
        text: "n8n là công cụ chính của chặng này: có bản cloud và bản tự cài trên máy chủ riêng, và mỗi bước (node) hiện rõ dữ liệu vào, dữ liệu ra - rất hợp để học. Nếu công ty bạn đã dùng Zapier, Make hay Power Automate (đi kèm Microsoft 365), mọi khái niệm trong chặng dùng được y nguyên. Với việc chỉ quanh Google Sheets, Apps Script có sẵn trong bảng tính là đủ.",
      },
      { type: "heading", text: "Dựng thế nào: từ giấy tới công cụ" },
      {
        type: "list",
        items: [
          "Viết quy trình làm tay hiện tại, mỗi bước một dòng.",
          "Khoanh sự kiện mở đầu - đó là trình kích hoạt.",
          "Đánh dấu chỗ bạn phải \"xem rồi quyết định\" - đó là điều kiện.",
          "Liệt kê các việc bạn làm - đó là hành động; ghi mỗi việc cần dữ liệu gì.",
          "Chỉ lúc này mới mở công cụ và kéo các bước vào đúng thứ tự.",
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: tự động hoá cả cái sai",
        text: "Workflow làm đúng những gì bạn dặn, nhanh và không mệt - kể cả khi bạn dặn sai. Một quy trình tay đang lộn xộn sẽ thành một quy trình tự động lộn xộn, chạy nhiều lần hơn. Gọn quy trình trước, tự động sau.",
      },
      {
        type: "closing",
        lines: [
          "Ba loại mảnh, một dòng dữ liệu chảy qua - đó là toàn bộ bộ khung.",
          "Bài sau: chọn việc nào đáng tự động, và bao lâu thì hoàn vốn công dựng.",
        ],
      },
    ],
  },

  // ── Bài 2 ────────────────────────────────────────────────────────────────
  {
    id: 1831,
    slug: "chon-viec-dang-tu-dong-hoa",
    title: "Chặng 27, Bài 2: Chọn việc đáng tự động hoá - và việc không nên",
    subtitle: "Tần suất × thời gian cho biết lợi; mức rủi ro nếu sai cho biết có nên làm.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Tự động hoá sai việc là cách nhanh nhất để mất một tuần dựng thứ tiết kiệm được mười phút mỗi quý - hoặc tệ hơn, để máy tự làm một việc mà sai một lần là mất tiền. Một phép tính đơn giản trên giấy giúp bạn chọn đúng việc trước khi bỏ công.",
    openingQuestion: "Việc nào đáng tự động hoá nhất?",
    openingOptions: [
      "Chép số từ 3 file vào báo cáo, 20 phút mỗi ngày",
      "Soạn chiến lược năm, mất 3 ngày nhưng mỗi năm chỉ một lần",
      "Trả lời khiếu nại của khách VIP, mỗi ca cần đọc kỹ ngữ cảnh",
      "Duyệt chi khoản lớn, 5 phút mỗi lần nhưng sai là mất tiền",
    ],
    correctOption: 0,
    explanation:
      "Việc đáng tự động có ba đặc điểm: lặp lại thường xuyên, tốn thời gian mỗi lần, và làm theo quy tắc rõ ràng nên sai thì dễ phát hiện. Chép số 20 phút mỗi ngày là khoảng 7 giờ mỗi tháng, quy tắc rõ. Chiến lược năm làm một lần và cần phán đoán. Khiếu nại VIP cần đọc ngữ cảnh. Duyệt chi thì nhanh nhưng rủi ro cao - đó chính là chỗ con người phải giữ lại.",
    diagram: [
      { label: "Tần suất × thời gian mỗi lần = giờ tiết kiệm", arrow: true },
      { label: "Trừ thời gian bảo trì", arrow: true },
      { label: "So với công dựng → thời gian hoàn vốn", arrow: true },
      { label: "Lọc qua mức rủi ro nếu sai" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng kế toán 5 người",
      description:
        "Nhóm liệt kê 12 việc lặp lại, ghi tần suất và số phút mỗi lần. Hai việc chiếm hơn nửa tổng thời gian: đối chiếu sao kê hằng ngày và gửi nhắc công nợ hằng tuần. Họ tự động hoá phần gom dữ liệu của cả hai, nhưng giữ bước duyệt trước khi gửi nhắc nợ, vì gửi nhầm cho khách đã trả là mất lòng khách.",
    },
    quiz: [
      {
        question: "Một việc mất 15 phút, làm 4 lần mỗi tuần. Dựng workflow mất 5 giờ. Bao lâu thì hoàn vốn?",
        options: [
          "Khoảng 5 tuần (tiết kiệm 1 giờ mỗi tuần)",
          "Khoảng 20 tuần (= 5 giờ × 4 lần, nhân thay vì chia)",
          "Khoảng 1,25 tuần (= 5 giờ ÷ 4 lần, quên nhân 15 phút)",
          "Khoảng 1 tuần (= 15 phút × 4 ≈ 1 giờ, lấy nhầm số giờ)",
        ],
        correct: 0,
        explanation:
          "Mỗi tuần tiết kiệm 15 phút × 4 = 60 phút = 1 giờ. Công dựng 5 giờ chia cho 1 giờ mỗi tuần là 5 tuần. Nhân 5 giờ với 4 lần là trộn hai đại lượng khác nhau; chia 5 giờ cho 4 lần thì quên mất mỗi lần chỉ tốn 15 phút; còn \"1 tuần\" là đọc nhầm 1 giờ tiết kiệm thành thời gian hoàn vốn.",
      },
      {
        question: "Việc nào KHÔNG nên để workflow tự làm trọn từ đầu tới cuối?",
        options: [
          "Chuyển tiền cho nhà cung cấp ngay khi AI đọc xong hoá đơn",
          "Gửi email xác nhận khi khách điền biểu mẫu đăng ký",
          "Sao lưu bảng tính mỗi đêm sang một thư mục riêng",
          "Nhắc lịch họp giao ban cho cả nhóm mỗi sáng thứ Hai",
        ],
        correct: 0,
        explanation:
          "Chuyển tiền không rút lại được, và AI đọc hoá đơn có thể đọc sai số tiền hoặc số tài khoản - hoá đơn giả cũng là thủ đoạn lừa đảo phổ biến. Workflow nên làm phần chuẩn bị (đọc, đối chiếu, lập danh sách) rồi dừng chờ người duyệt. Ba việc còn lại rủi ro thấp: sai thì dễ thấy và dễ sửa.",
      },
      {
        question: "Một việc làm mỗi tháng một lần, mất 30 phút, và quy trình đổi mỗi quý. Nên làm gì?",
        options: [
          "Chưa tự động; viết checklist, làm tay cho ổn định trước",
          "Tự động ngay, vì việc gì lặp lại đều nên tự động hoá",
          "Tự động ngay, rồi sửa workflow mỗi lần quy trình đổi",
          "Dựng một workflow thật phức tạp để lo mọi thay đổi",
        ],
        correct: 0,
        explanation:
          "30 phút mỗi tháng là 6 giờ mỗi năm, trong khi quy trình đổi mỗi quý nghĩa là workflow phải sửa bốn lần một năm - công sửa có thể vượt công tiết kiệm. Một checklist rẻ hơn nhiều, và khi quy trình đã ổn định thì chính checklist đó là bản thiết kế cho workflow.",
      },
      {
        question: "Ngoài số giờ tiết kiệm, yếu tố nào quyết định có nên tự động hoá một việc?",
        options: [
          "Hậu quả nếu workflow làm sai mà không ai thấy",
          "Công cụ tự động hoá đó có đang được nhiều người dùng",
          "Việc đó có làm người đang phụ trách thấy nhàm chán",
          "Sếp có đặt chỉ tiêu dùng công cụ AI trong quý này",
        ],
        correct: 0,
        explanation:
          "Giờ tiết kiệm cho biết lợi; mức rủi ro nếu sai cho biết có nên làm và cần chốt chặn gì. Một việc tiết kiệm nhiều giờ nhưng sai là mất tiền hoặc lộ dữ liệu vẫn có thể tự động - nhưng phải có bước người duyệt. Độ phổ biến của công cụ hay chỉ tiêu dùng AI không trả lời câu hỏi đó.",
      },
      {
        question: "Khi tính thời gian tiết kiệm được mỗi tháng, cần trừ đi gì?",
        options: [
          "Thời gian bảo trì và kiểm tra workflow",
          "Thời gian nghỉ trưa của người đang làm việc đó tay",
          "Số lần workflow chạy thành công mà không ai phải xem",
          "Tiền điện của chiếc máy tính đang chạy workflow",
        ],
        correct: 0,
        explanation:
          "Workflow không chạy mãi mà không cần ai: biểu mẫu đổi câu hỏi, cột bị đổi tên, dịch vụ đổi cách đăng nhập - mỗi lần như vậy phải có người sửa. Thêm thời gian xem nhật ký định kỳ. Bỏ qua phần này là lý do nhiều workflow trông có lãi trên giấy nhưng thực tế thì không.",
      },
    ],
    keyTakeaways: [
      "Giờ tiết kiệm = tần suất × thời gian mỗi lần − thời gian bảo trì.",
      "Thời gian hoàn vốn = công dựng ÷ giờ tiết kiệm mỗi kỳ.",
      "Rủi ro nếu sai quyết định có nên làm và cần người duyệt ở đâu.",
      "Việc không rút lại được (chuyển tiền, gửi cho khách) luôn cần bước duyệt.",
      "Quy trình còn đổi liên tục thì viết checklist trước, tự động sau.",
    ],
    practicePrompt: {
      question:
        "Việc A: 10 phút × 5 lần mỗi tuần. Việc B: 2 giờ × 1 lần mỗi tháng. Chỉ xét thời gian, trong một tháng (4 tuần) việc nào tốn hơn?",
      options: [
        "Việc A: khoảng 200 phút, so với 120 phút của việc B",
        "Việc B: 120 phút mỗi lần, dài gấp 12 lần một lần của A",
        "Việc B: 2 giờ so với 50 phút (= 10 × 5, quên nhân 4 tuần)",
        "Việc A: 50 × 4 = 200 giờ, gấp 100 lần việc B mỗi tháng",
      ],
      correct: 0,
      explanation:
        "Việc A: 10 phút × 5 lần × 4 tuần = 200 phút, khoảng 3,3 giờ. Việc B: 2 giờ = 120 phút. Một lần của B dài hơn, nhưng A lặp nhiều hơn nên tổng lớn hơn. Quên nhân số tuần ra 50 phút; ghi 200 thành giờ là nhầm đơn vị. Đây là lý do phải nhân tần suất trước khi so.",
    },
    summary: {
      keyIdea: "Chọn việc lặp nhiều, tốn thời gian, quy tắc rõ; giữ người duyệt ở chỗ sai là mất tiền.",
      formula: "Hoàn vốn = công dựng ÷ (tần suất × phút mỗi lần − bảo trì), cùng một đơn vị thời gian.",
      commonMistake: "Chọn việc dài nhất thay vì việc tốn nhiều nhất tính cả tần suất, và quên trừ công bảo trì.",
      action: "Lập bảng 5 việc lặp lại của bạn: tần suất, phút mỗi lần, rủi ro nếu sai; khoanh việc đầu bảng.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở một bảng tính, liệt kê 5 việc lặp lại của bạn với bốn cột: số lần mỗi tháng, phút mỗi lần, tổng phút (nhân hai cột), và \"sai thì sao\" (thấp, vừa, cao). Sắp theo tổng phút, bỏ các việc rủi ro cao chưa có ai duyệt.",
      secondary: "Việc đứng đầu bảng là ứng viên cho workflow đầu tiên ở bài sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Không phải việc lặp lại nào cũng đáng tự động. Bài này cho bạn một phép tính trên giấy và một câu hỏi về rủi ro - đủ để chọn đúng việc trước khi bỏ công dựng.",
      },
      { type: "heading", text: "Vấn đề: tự động nhầm việc" },
      {
        type: "paragraph",
        text: "Một nhân viên vận hành dành hai ngày dựng workflow cho báo cáo quý - việc mất 40 phút, bốn lần một năm. Trong khi đó, việc đối chiếu đơn hàng 15 phút mỗi sáng vẫn làm tay. Cảm giác \"việc này phiền\" không phải là thước đo; tổng thời gian mới là thước đo.",
      },
      { type: "heading", text: "Phép tính trên giấy" },
      {
        type: "list",
        items: [
          "Giờ tiết kiệm mỗi tháng = số lần mỗi tháng × phút mỗi lần, rồi trừ phút bảo trì.",
          "Thời gian hoàn vốn = số giờ dựng ÷ giờ tiết kiệm mỗi tháng.",
          "Ví dụ: 15 phút × 4 lần/tuần = 1 giờ/tuần. Dựng mất 5 giờ → hoàn vốn sau 5 tuần.",
          "Ví dụ ngược: 30 phút × 1 lần/tháng = 6 giờ/năm. Dựng mất 8 giờ → hơn một năm mới hoàn vốn, chưa kể sửa.",
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Công thức cho bảng tính của bạn (cột B: lần/tháng, C: phút/lần, D: phút bảo trì/tháng, E: giờ dựng)",
        code: "Giờ tiết kiệm/tháng:  =(B2*C2 - D2)/60\nHoàn vốn (tháng):     =E2 / ((B2*C2 - D2)/60)",
      },
      { type: "heading", text: "Lọc thứ hai: sai thì sao?" },
      {
        type: "comparison",
        left: {
          label: "Tự động trọn vẹn được",
          text: "Sai thì dễ thấy và sửa được: sao lưu tệp, nhắc lịch, chép dữ liệu nội bộ, gửi email xác nhận cho chính người vừa điền biểu mẫu.",
        },
        right: {
          label: "Tự động phần chuẩn bị, người duyệt phần cuối",
          text: "Sai là mất tiền, mất khách hoặc lộ dữ liệu: chuyển khoản, nhắc nợ khách hàng, gửi báo cáo cho sếp hay đối tác, bất cứ gì liên quan lương.",
        },
      },
      {
        type: "callout",
        label: "Việc không nên tự động",
        text: "Việc cần phán đoán theo ngữ cảnh (khiếu nại khó, đàm phán), việc làm quá hiếm, và việc có quy trình còn đổi liên tục. Với loại cuối, một checklist làm tay là bước đúng - khi quy trình đã ổn, checklist đó thành bản thiết kế workflow.",
      },
      {
        type: "paragraph",
        text: "Công cụ để làm bảng chấm điểm này chính là Google Sheets hoặc Excel bạn đang dùng. Chưa cần n8n hay Zapier - chọn đúng việc trước, rồi mới chọn công cụ.",
      },
      {
        type: "closing",
        lines: [
          "Tần suất × thời gian cho biết lợi; rủi ro nếu sai cho biết cần chốt ở đâu.",
          "Bài sau: dựng workflow đầu tiên - biểu mẫu, bảng tính, email.",
        ],
      },
    ],
  },

  // ── Bài 3 ────────────────────────────────────────────────────────────────
  {
    id: 1832,
    slug: "workflow-dau-tien-bieu-mau-bang-tinh-email",
    title: "Chặng 27, Bài 3: Workflow đầu tiên - biểu mẫu, bảng tính, email",
    subtitle: "Dựng một workflow ba bước bằng n8n, hoặc bằng Google Form cùng vài dòng Apps Script.",
    duration: "9 phút",
    difficulty: "Dễ",
    emoji: "📨",
    track: "personal",
    whyItMatters:
      "Biểu mẫu → bảng tính → email là workflow phổ biến nhất ở văn phòng: đăng ký tư vấn, yêu cầu nghỉ phép, đề nghị mua hàng. Dựng được nó một lần là bạn có khuôn cho hàng chục việc khác, và có trải nghiệm thật về trình kích hoạt, dữ liệu đi qua bước và chạy thử.",
    openingQuestion:
      "Khách điền Google Form đăng ký tư vấn, câu trả lời vào bảng tính, và bạn muốn nhân viên tư vấn nhận email ngay. Cách gọn nhất để bắt đầu là gì?",
    openingOptions: [
      "Để Form tự ghi vào sheet, thêm một bước gửi email khi có câu trả lời mới",
      "Viết một ứng dụng web riêng thay cho Google Form để kiểm soát mọi thứ",
      "Mỗi tối mở sheet, lọc các dòng mới rồi tự gửi email cho nhân viên tư vấn",
      "Nhờ AI đọc sheet mỗi giờ rồi tự quyết định có nên gửi email hay không",
    ],
    correctOption: 0,
    explanation:
      "Google Form đã tự ghi câu trả lời vào bảng tính - bạn chỉ thiếu một bước: khi có câu trả lời mới thì gửi email. Đó là một trình kích hoạt và một hành động, dựng được trong n8n hoặc bằng vài dòng Apps Script. Viết ứng dụng riêng là quá tay; lọc tay mỗi tối thì khách chờ cả ngày; còn dùng AI để quyết định một quy tắc đơn giản là thêm chỗ có thể sai mà không thêm giá trị.",
    diagram: [
      { label: "Khách gửi Google Form", arrow: true },
      { label: "Câu trả lời thành một dòng trong sheet", arrow: true },
      { label: "Trình kích hoạt: có câu trả lời mới", arrow: true },
      { label: "Gửi email cho hộp thư nhóm tư vấn" },
    ],
    realWorldExample: {
      company: "Tình huống: trung tâm đào tạo nhỏ",
      description:
        "Trước đây nhân viên kiểm tra bảng đăng ký hai lần mỗi ngày, nên khách đăng ký buổi sáng có khi tới chiều mới được gọi. Sau khi thêm bước gửi email khi có đăng ký mới vào hộp thư nhóm, người trực nhận được thông tin trong vài phút, và bảng tính vẫn là nơi lưu mọi đăng ký như cũ.",
    },
    quiz: [
      {
        question: "Vì sao dùng trình kích hoạt \"khi gửi biểu mẫu\" thay vì chạy theo giờ?",
        options: [
          "Email đi ngay khi có đăng ký, không phải quét lại cả bảng",
          "Vì Apps Script không có loại trình kích hoạt chạy theo giờ",
          "Vì chạy theo giờ sẽ xoá các dòng đã đọc ở những lần trước",
          "Vì kích hoạt theo giờ chỉ chạy khi máy tính của bạn đang bật",
        ],
        correct: 0,
        explanation:
          "Trình kích hoạt theo sự kiện chạy đúng lúc có câu trả lời, mang theo đúng câu trả lời đó - không cần quét bảng tìm dòng mới và không lo gửi lại dòng cũ. Apps Script có cả loại chạy theo giờ, và cả hai đều chạy trên máy chủ của Google, không phụ thuộc máy bạn có bật hay không.",
      },
      {
        question: "Email thông báo cho nhân viên tư vấn nên chứa gì?",
        options: [
          "Tên, cách liên hệ, nhu cầu, và đường dẫn tới bảng tính",
          "Toàn bộ nội dung sheet, để nhân viên có đủ mọi bối cảnh",
          "Chỉ dòng \"có đăng ký mới\", để nhân viên tự mở sheet",
          "Số CCCD của khách để nhân viên xác minh cho nhanh",
        ],
        correct: 0,
        explanation:
          "Email cần đủ để người nhận hành động ngay - gọi lại khách - và có đường dẫn nếu cần xem thêm. Gửi cả sheet là đưa dữ liệu của mọi khách vào hộp thư của từng người. Chỉ báo \"có đăng ký mới\" thì người nhận vẫn phải mở sheet. Giấy tờ tuỳ thân không nên thu qua biểu mẫu kiểu này, càng không nên đi qua email.",
      },
      {
        question: "Chạy thử workflow lần đầu nên dùng dữ liệu gì?",
        options: [
          "Vài câu trả lời giả, email gửi về hộp thư của bạn",
          "Đăng ký thật của khách hôm qua, để kết quả sát thực tế",
          "Toàn bộ danh sách khách cũ, để kiểm tra một lượt cho hết",
          "Địa chỉ của nhân viên tư vấn, gửi thật luôn cho nhanh",
        ],
        correct: 0,
        explanation:
          "Chạy thử là lúc workflow sai nhiều nhất, nên cái sai phải rơi vào chỗ không ai bị ảnh hưởng: dữ liệu giả, người nhận là bạn. Dùng đăng ký thật hay danh sách khách cũ có thể khiến nhân viên gọi lại khách đã được xử lý, hoặc gửi hàng loạt email không ai muốn.",
      },
      {
        question: "Trong n8n, bước gửi email lấy tên khách từ bước biểu mẫu bằng cách nào?",
        options: [
          "Tham chiếu trường \"Họ tên\" trong dữ liệu mà bước trước chuyển tới",
          "Sao chép tay tên khách vào ô cấu hình của bước email mỗi lần chạy",
          "Không chọn được trường; n8n luôn gửi nguyên toàn bộ dữ liệu đi",
          "Dữ liệu chỉ đi qua bảng tính, không chuyển thẳng giữa các bước",
        ],
        correct: 0,
        explanation:
          "Mỗi node trong n8n hiện dữ liệu nó nhận vào và trả ra. Ở bước email, bạn kéo trường \"Họ tên\" từ dữ liệu của bước trước vào tiêu đề hoặc nội dung - mỗi lần chạy, chỗ đó được thay bằng tên của đúng khách vừa đăng ký. Không cần đi vòng qua bảng tính.",
      },
      {
        question:
          "Đoạn Apps Script đọc e.namedValues[\"Email\"]. Bạn đổi câu hỏi trong Form thành \"Địa chỉ email\". Chuyện gì xảy ra?",
        options: [
          "Script không tìm thấy trường \"Email\" và lần chạy bị lỗi",
          "Script tự nhận ra tên mới vì nội dung câu hỏi gần giống",
          "Không sao, vì script đọc theo thứ tự cột chứ không theo tên",
          "Email vẫn đi, nhưng tới địa chỉ của chủ sở hữu biểu mẫu",
        ],
        correct: 0,
        explanation:
          "namedValues dùng chính nội dung câu hỏi làm tên trường. Đổi câu hỏi là đổi tên trường, nên e.namedValues[\"Email\"] không còn, và dòng mã lấy phần tử đầu của nó báo lỗi. Đây là lỗi hay gặp nhất của workflow biểu mẫu: ai đó sửa câu chữ cho đẹp mà không biết có một workflow phụ thuộc vào nó.",
      },
    ],
    keyTakeaways: [
      "Form ghi vào sheet sẵn; workflow chỉ cần thêm trình kích hoạt và bước email.",
      "Kích hoạt theo sự kiện mang theo đúng câu trả lời mới, không cần quét bảng.",
      "Email thông báo chứa đủ để hành động, không chứa dữ liệu thừa hay nhạy cảm.",
      "Chạy thử bằng dữ liệu giả, gửi về hộp thư của chính bạn.",
      "Đổi câu hỏi trong Form có thể làm hỏng workflow đọc theo tên câu hỏi.",
    ],
    practicePrompt: {
      question: "Bạn muốn chỉ gửi email khi khách chọn \"Cần gọi lại gấp\". Cần thêm gì vào workflow?",
      options: [
        "Một bước điều kiện kiểm tra câu trả lời, đặt trước bước gửi email",
        "Một biểu mẫu thứ hai dành riêng cho những khách cần gọi lại gấp",
        "Một cột mới trong sheet đánh dấu chữ \"gấp\" bằng màu đỏ nổi bật",
        "Một bước gửi email thứ hai, chạy ngay sau bước gửi email đầu tiên",
      ],
      correct: 0,
      explanation:
        "Đây đúng là việc của bước điều kiện: đọc câu trả lời, nếu là \"Cần gọi lại gấp\" thì đi tiếp tới bước email, không thì dừng. Tách thành hai biểu mẫu làm khách phải tự phân loại; tô màu trong sheet không làm workflow đổi hành vi; thêm bước email nữa thì chỉ gửi nhiều hơn.",
    },
    summary: {
      keyIdea: "Workflow đầu tiên chỉ cần một trình kích hoạt và một hành động: có câu trả lời mới thì gửi email.",
      formula: "Form → sheet (có sẵn) → kích hoạt \"khi gửi biểu mẫu\" → gửi email với các trường của câu trả lời.",
      commonMistake: "Chạy thử bằng dữ liệu thật gửi thẳng cho người nhận thật, hoặc đổi câu hỏi trong Form mà quên workflow đọc theo tên.",
      action: "Dựng workflow này với một biểu mẫu thử 3 câu hỏi và gửi về hộp thư của chính bạn.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tạo một Google Form thử 3 câu (Họ tên, Số điện thoại, Nhu cầu), liên kết với một bảng tính, rồi dựng bước gửi email bằng n8n hoặc bằng đoạn Apps Script trong bài. Tự điền 3 lần và kiểm tra 3 email về đúng hộp thư của bạn.",
      secondary: "Xong rồi thì thử đổi tên một câu hỏi và xem workflow báo lỗi ra sao - đó là chủ đề bài sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Workflow đầu tiên nên nhỏ tới mức chạy được trong buổi chiều nay. Biểu mẫu → bảng tính → email là lựa chọn tốt: hai bước đầu Google đã làm sẵn, bạn chỉ dựng bước cuối.",
      },
      { type: "heading", text: "Vấn đề: khách chờ vì không ai nhìn bảng tính" },
      {
        type: "paragraph",
        text: "Đăng ký tư vấn nằm trong bảng tính, nhưng không ai ngồi nhìn bảng tính cả ngày. Người trực kiểm tra hai lần mỗi ngày, nên khách đăng ký lúc 9 giờ có thể tới 3 giờ chiều mới được gọi - lúc họ đã tìm chỗ khác.",
      },
      { type: "heading", text: "Cách 1: dựng bằng n8n" },
      {
        type: "list",
        items: [
          "Bước kích hoạt: chọn loại \"có dòng mới trong Google Sheets\", hoặc dùng biểu mẫu có sẵn của n8n thay cho Google Form.",
          "Kết nối tài khoản Google một lần; n8n lưu thông tin đăng nhập riêng, không nằm trong workflow.",
          "Bước hành động: gửi email (Gmail hoặc Outlook). Kéo các trường Họ tên, Số điện thoại, Nhu cầu từ bước trước vào nội dung.",
          "Người nhận: hộp thư nhóm tư vấn, không phải hộp thư cá nhân của một người.",
          "Chạy thử với một dòng giả, xem dữ liệu vào và ra ở từng node, rồi mới bật workflow.",
        ],
      },
      { type: "heading", text: "Cách 2: Google Form + Apps Script" },
      {
        type: "paragraph",
        text: "Nếu mọi thứ đã ở Google, Apps Script có sẵn trong bảng tính (mục Tiện ích mở rộng). Dán đoạn dưới, lưu, rồi thêm một trình kích hoạt loại \"khi gửi biểu mẫu\" gắn vào hàm khiCoDangKy. Lần đầu chạy, Google sẽ hỏi quyền đọc bảng tính và gửi email thay bạn.",
      },
      {
        type: "code",
        language: "javascript",
        caption: "Apps Script: gửi email mỗi khi có câu trả lời biểu mẫu mới. Tên trường phải khớp đúng nội dung câu hỏi trong Form.",
        code: `function khiCoDangKy(e) {
  // e.namedValues: { "Họ tên": ["..."], "Số điện thoại": ["..."], "Nhu cầu": ["..."] }
  const d = e.namedValues;
  const ten = d["Họ tên"][0];
  const lienHe = d["Số điện thoại"][0];
  const nhuCau = d["Nhu cầu"][0];

  const nguoiNhan = "tuvan@example.com"; // hộp thư nhóm, không phải cá nhân
  const tieuDe = "Đăng ký tư vấn mới: " + ten;
  const noiDung =
    "Khách: " + ten + "\\n" +
    "Liên hệ: " + lienHe + "\\n" +
    "Nhu cầu: " + nhuCau + "\\n" +
    "Bảng đăng ký: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  MailApp.sendEmail(nguoiNhan, tieuDe, noiDung);
}`,
      },
      {
        type: "comparison",
        left: {
          label: "n8n (hoặc Zapier, Make)",
          text: "Nối được Google, Microsoft, Slack, CRM và nhiều dịch vụ khác. Nhìn thấy dữ liệu ở từng bước. Hợp khi workflow đi qua nhiều ứng dụng.",
        },
        right: {
          label: "Apps Script",
          text: "Có sẵn trong Google Sheets, không cần thêm tài khoản. Hợp khi mọi thứ nằm trong Google. Phải đọc được vài dòng mã, và có hạn mức gửi email mỗi ngày.",
        },
      },
      {
        type: "callout",
        label: "Rủi ro: dữ liệu khách trong hộp thư",
        text: "Email là nơi dữ liệu dễ bị chuyển tiếp nhầm nhất. Chỉ gửi những trường cần để gọi lại khách; đừng thu hay gửi giấy tờ tuỳ thân, thông tin tài khoản ngân hàng qua workflow kiểu này.",
      },
      {
        type: "closing",
        lines: [
          "Một trình kích hoạt, một hành động, chạy thử bằng dữ liệu giả - bạn vừa dựng workflow đầu tiên.",
          "Bài sau: khi nó hỏng, và nó sẽ hỏng, bạn biết bằng cách nào?",
        ],
      },
    ],
  },

  // ── Bài 4 ────────────────────────────────────────────────────────────────
  {
    id: 1833,
    slug: "khi-workflow-hong",
    title: "Chặng 27, Bài 4: Khi workflow hỏng - lỗi im lặng, gửi trùng và ai chịu trách nhiệm",
    subtitle: "Workflow không hỏng ồn ào; nó ngừng làm việc mà không ai hay.",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🧯",
    track: "personal",
    whyItMatters:
      "Khi làm tay, bạn biết ngay hôm nay mình chưa gửi báo cáo. Khi đã tự động, không ai nhìn nữa - nên một workflow ngừng chạy có thể im lặng cả tuần. Bài này là những chốt chặn tối thiểu để lỗi lộ ra sớm, trước khi khách hoặc sếp phát hiện giúp bạn.",
    openingQuestion:
      "Workflow báo đơn cho kho đã chạy ổn ba tuần. Hôm nay kho than không nhận được email nào từ thứ Hai, dù đơn vẫn về đều. Khả năng cao nhất là gì?",
    openingOptions: [
      "Workflow lỗi từ thứ Hai và không ai được báo",
      "Kho lọc nhầm email vào thư rác; workflow chắc chắn vẫn chạy ổn",
      "Công cụ tự động hoá tự tắt mọi workflow sau đúng ba tuần chạy",
      "Email gửi trùng quá nhiều nên hộp thư của kho tự khoá lại",
    ],
    correctOption: 0,
    explanation:
      "Đơn vẫn về nhưng email không đi là dấu hiệu kinh điển của lỗi im lặng: workflow gặp lỗi (ai đó đổi cột, hết hạn đăng nhập) và dừng, còn không ai cài thông báo khi lỗi. Việc đầu tiên là mở nhật ký chạy (execution log) - n8n và Apps Script đều có - xem lần chạy cuối thành công là khi nào và lỗi ở bước nào. Thư rác là khả năng có thật, nhưng \"chắc chắn vẫn chạy ổn\" là kết luận khi chưa nhìn nhật ký.",
    diagram: [
      { label: "Chạy thử trên dữ liệu giả", arrow: true },
      { label: "Kiểm tra đầu vào, dừng nếu thiếu cột", arrow: true },
      { label: "Đánh dấu đã xử lý để chống gửi trùng", arrow: true },
      { label: "Nhật ký chạy + thông báo khi lỗi cho người sở hữu" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng kinh doanh 6 người",
      description:
        "Một workflow gửi báo giá tự động dừng suốt 9 ngày vì người dựng đổi mật khẩu email, làm kết nối hết hiệu lực. Không ai biết cho tới khi khách hỏi vì sao chưa nhận báo giá. Sau đó nhóm bật thông báo lỗi về một hộp thư chung và ghi rõ tên người sở hữu workflow trong mô tả của nó.",
    },
    quiz: [
      {
        question: "Cách chống gửi trùng khi workflow chạy lại trên cùng một bảng?",
        options: [
          "Ghi \"đã gửi\" vào dòng, và bỏ qua dòng đã có dấu đó",
          "Cho workflow chạy chậm lại để không kịp gửi hai lần",
          "Xoá dòng khỏi sheet ngay sau khi đã gửi xong email",
          "Nhờ người nhận tự bỏ qua các email có tiêu đề trùng",
        ],
        correct: 0,
        explanation:
          "Đánh dấu dòng đã xử lý biến việc chạy lại thành an toàn: lần sau workflow thấy dấu và bỏ qua. Chạy chậm không ngăn được trùng khi workflow chạy lại do lỗi. Xoá dòng là mất dữ liệu gốc. Đẩy việc lọc trùng cho người nhận thì khách nhận hai email nhắc nợ - đúng loại sai khiến họ mất lòng tin.",
      },
      {
        question: "Nhật ký chạy (execution log) của workflow giúp bạn điều gì?",
        options: [
          "Biết lần chạy nào lỗi, lỗi ở bước nào, với dữ liệu gì",
          "Làm workflow chạy nhanh hơn nhờ lưu sẵn kết quả lần trước",
          "Tự sửa lỗi bằng cách chạy lại mãi bước vừa bị hỏng",
          "Chặn người khác mở workflow khi bạn đang chỉnh sửa",
        ],
        correct: 0,
        explanation:
          "Nhật ký là thứ đầu tiên cần mở khi có người báo \"không nhận được\": nó cho biết lần chạy cuối, bước nào đỏ, và dữ liệu gây lỗi. n8n lưu danh sách các lần chạy kèm dữ liệu từng node; Apps Script có mục các lần thực thi. Nhật ký không tự sửa gì - nó chỉ cho bạn biết sửa ở đâu.",
      },
      {
        question:
          "Workflow gửi 500 dòng cùng lúc tới một dịch vụ và nhận lỗi \"quá nhiều yêu cầu\". Nên làm gì?",
        options: [
          "Chia lô nhỏ, nghỉ giữa các lô, và chỉ thử lại vài lần",
          "Chạy lại ngay lập tức cho tới khi cả 500 dòng đều qua",
          "Đổi sang một khoá API khác mỗi khi dịch vụ báo lỗi",
          "Bỏ qua các dòng lỗi, vì phần lớn đã gửi thành công",
        ],
        correct: 0,
        explanation:
          "Dịch vụ đang báo bạn vượt giới hạn tần suất - chặng API đã nói phải đọc giới hạn này trước. Chia lô và nghỉ giữa lô là cách tôn trọng nó; thử lại có giới hạn số lần để không lặp vô hạn. Gọi lại ngay làm tình hình tệ hơn; xoay vòng khoá để né giới hạn thường vi phạm điều khoản; bỏ qua dòng lỗi là mất dữ liệu trong im lặng.",
      },
      {
        question: "Người dựng workflow nghỉ việc. Rủi ro lớn nhất là gì?",
        options: [
          "Workflow chạy bằng tài khoản của họ và dừng khi tài khoản bị khoá",
          "Workflow tự xoá nếu người tạo không đăng nhập trong ba mươi ngày",
          "Người mới không đọc được workflow vì các bước ghi bằng tiếng Anh",
          "Dữ liệu cũ trong sheet tự chuyển sang tài khoản của trưởng phòng",
        ],
        correct: 0,
        explanation:
          "Workflow thường kết nối bằng tài khoản Google hay email của người dựng. Khi tài khoản đó bị khoá, mọi kết nối hết hiệu lực và workflow dừng - thường là im lặng. Cách phòng: dùng tài khoản dịch vụ hoặc tài khoản nhóm, ghi rõ ai sở hữu, và có tài liệu một trang mô tả workflow làm gì.",
      },
      {
        question: "Ai đó đổi tên cột \"Email\" thành \"E-mail\". Workflow tốt nên phản ứng thế nào?",
        options: [
          "Dừng lại và báo lỗi rõ cho người sở hữu workflow",
          "Bỏ qua các dòng thiếu email rồi chạy tiếp như thường",
          "Gửi tới một địa chỉ mặc định để không mất thông báo",
          "Tự đổi tên cột về \"Email\" rồi chạy tiếp như cũ",
        ],
        correct: 0,
        explanation:
          "Dữ liệu thiếu cột là lỗi cấu trúc, không phải một dòng lẻ - mọi dòng sau đều sẽ thiếu. Dừng và báo rõ là cách duy nhất để người sở hữu biết và sửa. Bỏ qua dòng là lỗi im lặng điển hình; gửi tới địa chỉ mặc định che mất lỗi; tự đổi tên cột có thể phá một báo cáo khác đang dựa vào tên mới.",
      },
    ],
    keyTakeaways: [
      "Lỗi nguy hiểm nhất là lỗi im lặng: workflow dừng mà không ai được báo.",
      "Bật thông báo khi lỗi, gửi tới hộp thư nhóm, và xem nhật ký chạy định kỳ.",
      "Đánh dấu dòng đã xử lý để chạy lại không gây gửi trùng.",
      "Thiếu cột thì dừng và báo; đừng bỏ qua dòng rồi chạy tiếp.",
      "Mỗi workflow có một người sở hữu có tên, và không chạy bằng tài khoản cá nhân.",
    ],
    practicePrompt: {
      question: "Trước khi bật workflow gửi nhắc nợ cho 200 khách, bước kiểm tra nào quan trọng nhất?",
      options: [
        "Chạy trên vài dòng giả, gửi về hộp thư của bạn, đọc kỹ từng email",
        "Bật cho cả 200 khách rồi theo dõi xem có ai phàn nàn gì không",
        "Hỏi một trợ lý AI xem workflow có lỗi gì không rồi bật lên",
        "Chạy thật một lần cho cả 200 khách, nhưng vào lúc nửa đêm",
      ],
      correct: 0,
      explanation:
        "Nhắc nợ gửi cho khách là loại việc không rút lại được, nên lỗi phải lộ ra trên dữ liệu giả trước. Đọc từng email: đúng tên, đúng số tiền, đúng hạn, không trùng. Theo dõi phàn nàn là để khách kiểm tra hộ bạn; AI không nhìn thấy dữ liệu thật đi qua workflow; chạy lúc nửa đêm vẫn là chạy thật.",
    },
    summary: {
      keyIdea: "Workflow cần chốt chặn để lỗi lộ ra: nhật ký, thông báo khi lỗi, chống trùng, kiểm tra đầu vào, người sở hữu.",
      formula: "Chạy thử dữ liệu giả → kiểm tra đầu vào → đánh dấu đã xử lý → báo lỗi cho người sở hữu có tên.",
      commonMistake: "Nghĩ workflow chạy ổn vì không ai phàn nàn, trong khi nó đã dừng im lặng từ lâu.",
      action: "Với workflow bài trước: bật thông báo lỗi, thêm cột \"Đã gửi\", và ghi tên người sở hữu vào mô tả.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy workflow biểu mẫu → email của bài trước. Cố tình làm hỏng nó: đổi tên một câu hỏi trong Form. Xem lỗi hiện ra ở đâu, và bạn có được báo không. Nếu không, bật thông báo lỗi (Apps Script có thông báo khi trình kích hoạt thất bại; n8n có workflow xử lý lỗi riêng).",
      secondary: "Rồi làm bài tập lọc đơn trong bài: đúng loại lỗi im lặng hay gặp nhất khi đọc dữ liệu từ bảng tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Làm tay thì hỏng ồn ào: bạn quên và bạn biết mình quên. Tự động thì hỏng im lặng: không ai nhìn nữa. Bài này là năm chốt chặn để workflow của bạn không âm thầm ngừng việc.",
      },
      { type: "heading", text: "Vấn đề: 9 ngày không ai biết" },
      {
        type: "paragraph",
        text: "Workflow báo giá dừng vì một mật khẩu bị đổi. Nó không gửi email lỗi cho ai, vì không ai cài. Chín ngày sau, một khách hỏi vì sao chưa có báo giá. Không có dòng mã nào sai - chỉ thiếu chốt chặn.",
      },
      { type: "heading", text: "Bốn kiểu hỏng hay gặp" },
      {
        type: "conceptTable",
        title: "Hỏng thế nào, chặn thế nào",
        subtitle: "Gần như mọi sự cố workflow ở văn phòng rơi vào bốn loại này",
        concepts: [
          { vi: "Lỗi im lặng", en: "Silent failure", def: "Workflow dừng hoặc bỏ qua dữ liệu mà không báo ai. Chặn: thông báo khi lỗi + xem nhật ký định kỳ." },
          { vi: "Thiếu cột, sai kiểu", en: "Schema change", def: "Ai đó đổi tên cột, đổi câu hỏi, hoặc ô đánh dấu về dưới dạng chữ. Chặn: kiểm tra đầu vào, thiếu thì dừng và báo." },
          { vi: "Gửi trùng", en: "Duplicate", def: "Workflow chạy lại sau lỗi và gửi lại những dòng đã gửi. Chặn: cột \"Đã gửi\", kiểm tra trước khi gửi." },
          { vi: "Giới hạn tần suất", en: "Rate limit / quota", def: "Dịch vụ từ chối vì gọi quá nhiều, hoặc hết hạn mức gửi email trong ngày. Chặn: chia lô, nghỉ giữa lô, thử lại có giới hạn." },
        ],
      },
      { type: "heading", text: "Năm chốt chặn tối thiểu" },
      {
        type: "list",
        items: [
          "Nhật ký chạy: biết lần chạy cuối thành công là khi nào. n8n lưu từng lần chạy kèm dữ liệu; Apps Script có mục các lần thực thi.",
          "Thông báo khi lỗi: gửi về hộp thư nhóm, không chỉ hộp thư của người dựng. n8n cho gắn một workflow xử lý lỗi; Apps Script gửi email khi trình kích hoạt thất bại.",
          "Chạy thử trên dữ liệu giả, người nhận là chính bạn, trước mỗi lần sửa lớn.",
          "Kiểm tra đầu vào: thiếu cột hoặc giá trị lạ thì dừng và báo, không đoán.",
          "Người sở hữu có tên, tài khoản nhóm thay vì tài khoản cá nhân, và một đoạn mô tả workflow làm gì.",
        ],
      },
      {
        type: "exercise",
        language: "javascript",
        title: "Lọc đơn cần gửi thông báo",
        task: "Dữ liệu đọc từ bảng tính qua một công cụ tự động hoá: ô đánh dấu \"đã thông báo\" về dưới dạng CHỮ \"TRUE\" hoặc \"FALSE\", không phải đúng/sai. Workflow phải gửi cho các đơn \"Đã giao\" mà CHƯA thông báo. Mã hiện tại chạy không báo lỗi nhưng không gửi đơn nào - lỗi im lặng. Sửa điều kiện so sánh để in đúng hai đơn cần gửi.",
        starter: `const donHang = [
  { ma: "DH001", trangThai: "Đã giao", email: "an@example.com", daThongBao: "TRUE" },
  { ma: "DH002", trangThai: "Đã giao", email: "binh@example.com", daThongBao: "FALSE" },
  { ma: "DH003", trangThai: "Đang giao", email: "chi@example.com", daThongBao: "FALSE" },
  { ma: "DH004", trangThai: "Đã giao", email: "dung@example.com", daThongBao: "FALSE" },
  { ma: "DH005", trangThai: "Đã huỷ", email: "em@example.com", daThongBao: "FALSE" },
];

// Cần gửi: đơn đã giao VÀ chưa thông báo.
const canGui = donHang.filter((d) => d.trangThai === "Đã giao" && !d.daThongBao);

console.log("Cần gửi: " + canGui.length);
canGui.forEach((d) => console.log(d.ma + " - " + d.email));`,
        solution: `const donHang = [
  { ma: "DH001", trangThai: "Đã giao", email: "an@example.com", daThongBao: "TRUE" },
  { ma: "DH002", trangThai: "Đã giao", email: "binh@example.com", daThongBao: "FALSE" },
  { ma: "DH003", trangThai: "Đang giao", email: "chi@example.com", daThongBao: "FALSE" },
  { ma: "DH004", trangThai: "Đã giao", email: "dung@example.com", daThongBao: "FALSE" },
  { ma: "DH005", trangThai: "Đã huỷ", email: "em@example.com", daThongBao: "FALSE" },
];

// Cần gửi: đơn đã giao VÀ chưa thông báo.
// "FALSE" là một chuỗi có chữ, nên !"FALSE" luôn là false - phải so đúng chuỗi.
const canGui = donHang.filter((d) => d.trangThai === "Đã giao" && d.daThongBao === "FALSE");

console.log("Cần gửi: " + canGui.length);
canGui.forEach((d) => console.log(d.ma + " - " + d.email));`,
        expectedOutput: "Cần gửi: 2\nDH002 - binh@example.com\nDH004 - dung@example.com",
        hints: [
          "Trong JavaScript, mọi chuỗi không rỗng đều được coi là đúng - kể cả chuỗi \"FALSE\".",
          "Vậy !d.daThongBao luôn sai với dữ liệu này. Hãy so trực tiếp: d.daThongBao === \"FALSE\".",
        ],
      },
      {
        type: "callout",
        label: "Ai chịu trách nhiệm",
        text: "Workflow không có người sở hữu thì khi hỏng không ai sửa, và khi nó gửi sai thì không ai trả lời khách. Ghi tên người sở hữu ngay trong mô tả workflow, và bàn giao nó như bàn giao một công việc khi người đó chuyển việc.",
      },
      {
        type: "closing",
        lines: [
          "Workflow tốt không phải workflow không bao giờ hỏng - mà là hỏng thì có người biết ngay.",
          "Hai bài tiếp theo là dự án: ghép mọi thứ đã học thành workflow có đầu ra thật.",
        ],
      },
    ],
  },

  // ── Bài 5: DỰ ÁN ─────────────────────────────────────────────────────────
  {
    id: 1834,
    slug: "du-an-tu-dong-hoa-bao-cao-thang",
    title: "Chặng 27, Bài 5: DỰ ÁN - Tự động hoá báo cáo tháng, có người duyệt trước khi gửi",
    subtitle: "Gom số từ nhiều sheet, tính chỉ số, AI viết nhận xét nháp, người duyệt bấm gửi.",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Báo cáo tháng là việc lặp lại, tốn giờ và có quy tắc rõ - đúng loại đáng tự động. Nhưng nó cũng đi thẳng tới sếp, nên sai một con số là mất uy tín. Dự án này dạy cách chia việc: máy gom và tính, AI viết nháp, con người duyệt - mỗi bên làm phần mình giỏi.",
    openingQuestion: "Trong workflow báo cáo tháng, AI nên đảm nhận phần nào?",
    openingOptions: [
      "Viết đoạn nhận xét nháp từ các chỉ số đã tính sẵn",
      "Tính doanh thu và biên lợi nhuận từ dữ liệu thô của các sheet",
      "Gửi thẳng báo cáo cho sếp sau khi tự kiểm tra lại các con số",
      "Chọn xem tháng này nên đưa những chỉ số nào vào báo cáo",
    ],
    correctOption: 0,
    explanation:
      "Công thức trong bảng tính tính cùng một kết quả mỗi lần; mô hình ngôn ngữ thì có thể tính sai hoặc bịa số mà giọng vẫn rất chắc. Vì vậy phần tính chỉ số để cho công thức. AI làm tốt phần diễn đạt: đọc bảng chỉ số đã tính rồi viết đoạn nhận xét nháp. Gửi cho sếp là quyết định của con người, sau khi đối chiếu số. Chọn chỉ số nào quan trọng cũng là việc của người hiểu kinh doanh, và nên cố định từ đầu.",
    diagram: [
      { label: "Gom số từ các sheet chi nhánh", arrow: true },
      { label: "Công thức tính chỉ số, kiểm tra thiếu dữ liệu", arrow: true },
      { label: "AI viết đoạn nhận xét nháp", arrow: true },
      { label: "Email cho người duyệt", arrow: true },
      { label: "Người duyệt sửa, rồi mới gửi sếp" },
    ],
    realWorldExample: {
      company: "Tình huống: FP&A của chuỗi 4 cửa hàng",
      description:
        "Mỗi cuối tháng, một chuyên viên mất khoảng 6 giờ chép số từ 4 file cửa hàng, tính tăng trưởng và viết nhận xét. Sau khi tự động phần gom và tính, bước còn lại của người là đọc bản nháp và sửa - chừng 30 phút. Bản nháp AI viết từng ghi \"tăng mạnh nhờ khuyến mãi\" cho một cửa hàng không chạy khuyến mãi nào: đó chính là lý do bước duyệt tồn tại.",
    },
    quiz: [
      {
        question: "Vì sao chỉ số phải tính bằng công thức trong bảng tính, không nhờ AI tính?",
        options: [
          "Công thức ra cùng kết quả mỗi lần; AI có thể tính sai",
          "Vì AI không đọc được số, chỉ đọc được chữ trong bảng tính",
          "Vì nhờ AI tính tốn nhiều tiền hơn dùng một bảng tính",
          "Vì sếp chỉ tin con số có công thức Excel đi kèm bên cạnh",
        ],
        correct: 0,
        explanation:
          "Mô hình ngôn ngữ đoán chữ tiếp theo chứ không chạy phép tính, nên có lúc cộng sai hoặc đảo số - và vẫn viết rất tự tin. Công thức thì chạy giống nhau mỗi tháng và ai cũng kiểm tra lại được. AI đọc được số; vấn đề là độ tin cậy của phép tính, không phải chi phí.",
      },
      {
        question: "Người duyệt nhận email bản nháp. Họ cần kiểm tra gì trước tiên?",
        options: [
          "Mọi con số trong đoạn nhận xét có khớp với bảng chỉ số",
          "Văn phong đã đủ trang trọng để gửi ban giám đốc chưa",
          "Đoạn nhận xét có dài đủ một trang như các tháng trước",
          "Email có được gửi đúng giờ đã hẹn trong lịch hay không",
        ],
        correct: 0,
        explanation:
          "Lỗi nguy hiểm nhất của bản nháp AI là con số hoặc nguyên nhân bịa ra nghe hợp lý: \"tăng 18%\" khi bảng ghi 12%, hay \"nhờ khuyến mãi\" khi không có khuyến mãi. Đối chiếu từng con số với bảng chỉ số trước, rồi mới tới văn phong. Độ dài và giờ gửi không làm báo cáo đúng hơn.",
      },
      {
        question: "Tháng này một sheet chi nhánh chưa cập nhật. Workflow nên làm gì?",
        options: [
          "Dừng, và báo người duyệt đang thiếu dữ liệu chi nhánh đó",
          "Dùng số tháng trước cho chi nhánh đó để báo cáo vẫn kịp hạn",
          "Bỏ chi nhánh đó ra, tính tổng trên các chi nhánh còn lại",
          "Nhờ AI ước lượng số chi nhánh đó từ xu hướng các tháng",
        ],
        correct: 0,
        explanation:
          "Cả ba cách còn lại đều cho ra một báo cáo trông hoàn chỉnh nhưng sai - và không ai biết nó sai. Dùng số cũ hay ước lượng là bịa dữ liệu; bỏ chi nhánh làm tổng doanh thu tụt giả. Kiểm tra \"đủ dữ liệu chưa\" phải là một bước điều kiện ngay sau bước gom, trước khi tính bất cứ gì.",
      },
      {
        question: "Dữ liệu gửi cho AI để viết nhận xét nên là gì?",
        options: [
          "Bảng chỉ số tổng hợp, không kèm tên và lương từng người",
          "Toàn bộ các sheet gốc, để AI có đủ bối cảnh khi viết nhận xét",
          "Ảnh chụp dashboard, vì AI đọc hình tốt hơn đọc số",
          "Chỉ tên các chỉ số, để AI tự tìm số liệu trên mạng",
        ],
        correct: 0,
        explanation:
          "AI chỉ cần những gì nó phải viết về: bảng chỉ số đã tính, cộng vài dòng bối cảnh như mục tiêu tháng. Gửi sheet gốc là đưa dữ liệu chi tiết - có khi cả lương, thông tin khách - ra ngoài mà không cần. Ảnh chụp thêm một bước đọc có thể sai; để AI tự tìm số là mời nó bịa.",
      },
      {
        question: "Tiêu chí \"xong\" nào hợp lý cho dự án này?",
        options: [
          "Chạy hai tháng liền, người duyệt không phải sửa số nào",
          "Workflow chạy được một lần và gửi được email cho sếp",
          "AI viết được nhận xét dài hơn bản nhân viên vẫn viết tay",
          "Mọi bước đều dùng AI, không còn việc gì làm bằng tay",
        ],
        correct: 0,
        explanation:
          "Chạy được một lần mới chỉ chứng minh các bước nối với nhau. Hai tháng liền với số đúng mới cho thấy phần gom và tính đáng tin, và bước duyệt vẫn giữ nguyên - không bao giờ là việc bỏ đi. Dài hơn không phải tốt hơn, và AI ở mọi bước là ngược với mục đích.",
      },
    ],
    keyTakeaways: [
      "Công thức tính số; AI viết chữ; con người duyệt và bấm gửi.",
      "Kiểm tra đủ dữ liệu ngay sau bước gom - thiếu thì dừng, không đoán.",
      "Chỉ gửi cho AI bảng chỉ số tổng hợp, không gửi dữ liệu gốc.",
      "Người duyệt đối chiếu từng con số trong bản nháp với bảng chỉ số.",
      "Xong là khi chạy hai tháng liền không phải sửa số - không phải khi chạy được một lần.",
    ],
    practicePrompt: {
      question:
        "Doanh thu tháng 8 là 480 triệu, tháng 7 là 400 triệu. Bản nháp AI viết \"doanh thu tăng 16,7%\". Người duyệt nên sửa thành gì?",
      options: [
        "Tăng 20% (= 80 ÷ 400)",
        "Giữ 16,7% (= 80 ÷ 480, chia cho tháng này)",
        "Tăng 80%, vì chênh lệch là 80 triệu đồng",
        "Tăng 120% (= 480 ÷ 400, quên trừ đi 100%)",
      ],
      correct: 0,
      explanation:
        "Tăng trưởng so với tháng trước = (480 − 400) ÷ 400 = 80 ÷ 400 = 20%. Con số 16,7% là 80 ÷ 480 - chia nhầm cho tháng sau, lỗi AI rất hay mắc mà câu chữ vẫn trơn tru. 80 là số triệu chênh lệch, không phải phần trăm; 120% là tỷ lệ tháng 8 so với tháng 7, chưa trừ 100%.",
    },
    summary: {
      keyIdea: "Tự động phần gom và tính, để AI viết nháp, và luôn có người duyệt trước khi báo cáo tới sếp.",
      formula: "Gom → kiểm tra đủ dữ liệu → công thức tính chỉ số → AI viết nháp → email người duyệt → người gửi.",
      commonMistake: "Để AI tính số hoặc gửi thẳng cho sếp, và tin một bản nháp trơn tru mà không đối chiếu từng con số.",
      action: "Dựng bước 1-3 của dự án với số liệu giả của 2 chi nhánh trước khi nối AI và email.",
    },
    application: {
      title: "Dự án: làm trong tuần này",
      message:
        "Tạo 2 sheet chi nhánh bằng số liệu giả, một sheet tổng hợp bằng công thức, và một câu lệnh nhờ AI viết nhận xét. Chạy trọn workflow một lần với người duyệt là chính bạn. Tự đối chiếu mọi con số trong bản nháp với bảng chỉ số.",
      secondary: "Ghi lại mọi chỗ bạn phải sửa trong bản nháp - đó là danh sách để siết câu lệnh cho tháng sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Dự án này ghép mọi thứ của chặng: trình kích hoạt theo lịch, kiểm tra dữ liệu, một bước AI, và một chốt người duyệt. Đầu ra là một email bản nháp báo cáo tháng nằm trong hộp thư người duyệt, sẵn để sửa và gửi.",
      },
      { type: "heading", text: "Vấn đề: 6 giờ chép số mỗi cuối tháng" },
      {
        type: "paragraph",
        text: "Bốn cửa hàng, bốn file, mỗi file một kiểu. Cuối tháng, một người mở từng file, chép doanh thu và chi phí sang bảng tổng, tính tăng trưởng, rồi viết một đoạn nhận xét. Việc có quy tắc rõ, lặp mỗi tháng, và chép tay thì dễ sai một chữ số.",
      },
      { type: "heading", text: "Chia việc: ai làm gì" },
      {
        type: "conceptTable",
        title: "Mỗi bên làm phần mình giỏi",
        subtitle: "Đây là thiết kế người trong vòng lặp (human-in-the-loop)",
        concepts: [
          { vi: "Công thức / workflow", en: "Deterministic", def: "Gom số, kiểm tra đủ dữ liệu, tính chỉ số. Chạy giống nhau mỗi tháng, ai cũng kiểm tra lại được." },
          { vi: "AI", en: "Draft", def: "Đọc bảng chỉ số đã tính và viết đoạn nhận xét nháp. Không tính số, không gửi đi đâu." },
          { vi: "Người duyệt", en: "Human-in-the-loop", def: "Đối chiếu từng con số, sửa nhận định sai, rồi mới gửi sếp. Bước này không bao giờ bị tự động hoá." },
        ],
      },
      { type: "heading", text: "Từng bước" },
      {
        type: "list",
        items: [
          "Bước 1 - Chuẩn hoá nguồn: mỗi chi nhánh một sheet cùng cấu trúc cột (Tháng, Doanh thu, Chi phí). Nếu chưa cùng cấu trúc, sửa nguồn trước.",
          "Bước 2 - Gom: trong Google Sheets dùng IMPORTRANGE hoặc Apps Script; trong Excel dùng Power Query; hoặc một node đọc sheet trong n8n.",
          "Bước 3 - Kiểm tra đủ dữ liệu: chi nhánh nào thiếu số tháng này thì dừng và báo người duyệt, không tính tiếp.",
          "Bước 4 - Tính chỉ số bằng công thức: doanh thu, tăng trưởng so với tháng trước, biên lợi nhuận, chi nhánh cao nhất và thấp nhất.",
          "Bước 5 - Gọi AI (ChatGPT, Claude, Gemini hoặc Copilot qua node AI của n8n hay qua API) với bảng chỉ số và câu lệnh ở dưới.",
          "Bước 6 - Gửi email cho người duyệt, kèm bảng chỉ số và bản nháp, tiêu đề ghi rõ \"NHÁP - cần duyệt\".",
          "Bước 7 - Kích hoạt theo lịch: ngày làm việc thứ 2 của tháng, sau hạn chót nhập số của các chi nhánh.",
        ],
      },
      {
        type: "code",
        language: "text",
        caption: "Câu lệnh mẫu cho bước 5 - bảng chỉ số được chèn vào chỗ {BANG_CHI_SO}",
        code: `Bạn là chuyên viên phân tích. Dưới đây là bảng chỉ số tháng này, đã được tính sẵn.

{BANG_CHI_SO}

Viết một đoạn nhận xét 5-7 câu cho ban giám đốc.
Quy tắc:
- Chỉ dùng số có trong bảng. Không tự tính thêm con số mới.
- Không nêu nguyên nhân nếu bảng không có thông tin về nguyên nhân;
  thay vào đó ghi "[cần bổ sung lý do]".
- Nêu chi nhánh cao nhất, thấp nhất, và một điểm cần theo dõi.`,
      },
      {
        type: "callout",
        label: "Rủi ro: bản nháp trơn tru nhưng sai",
        text: "AI rất giỏi viết câu nghe hợp lý - kể cả khi nó bịa nguyên nhân hoặc chia nhầm để ra phần trăm. Vì thế bước 6 gửi cho người duyệt, không gửi cho sếp, và người duyệt đối chiếu từng con số. Chỉ gửi cho AI bảng chỉ số tổng hợp, không gửi sheet gốc có dữ liệu cá nhân.",
      },
      { type: "heading", text: "Xong là khi…" },
      {
        type: "list",
        items: [
          "Workflow tự chạy theo lịch, không ai phải bấm.",
          "Thiếu dữ liệu một chi nhánh thì dừng và báo đúng tên chi nhánh.",
          "Người duyệt nhận email có bảng chỉ số và bản nháp trong một thư.",
          "Hai tháng liền, người duyệt không phải sửa con số nào (chỉ sửa câu chữ).",
          "Có người sở hữu có tên và thông báo khi lỗi, như bài trước.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Máy gom và tính, AI viết nháp, người duyệt quyết - đó là cách tự động một báo cáo mà không đánh cược uy tín.",
          "Bài cuối: dashboard tự làm mới từ một API.",
        ],
      },
    ],
  },

  // ── Bài 6: DỰ ÁN ─────────────────────────────────────────────────────────
  {
    id: 1835,
    slug: "du-an-dashboard-tu-lam-moi-tu-api",
    title: "Chặng 27, Bài 6: DỰ ÁN - Dashboard tự làm mới từ một API",
    subtitle: "Workflow theo lịch lấy dữ liệu từ API vào Google Sheets, Looker Studio vẽ từ đó.",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "📡",
    track: "personal",
    whyItMatters:
      "Rất nhiều số liệu công việc cần - tỷ giá, giá hàng hoá, dữ liệu thống kê công khai - có sẵn qua API. Nối một API vào bảng tính theo lịch là bước từ \"chép số mỗi sáng\" sang \"mở dashboard là thấy\". Đây là lần tích hợp API đơn giản nhất bạn có thể tự làm, không cần viết ứng dụng.",
    openingQuestion: "Bạn muốn bảng tính có tỷ giá USD/VND cập nhật mỗi sáng. Cách bền nhất là gì?",
    openingOptions: [
      "Workflow theo lịch gọi API tỷ giá rồi ghi thêm một dòng vào sheet",
      "Mỗi sáng mở trang ngân hàng rồi chép tỷ giá vào ô A1 của sheet",
      "Hỏi chatbot AI tỷ giá mỗi sáng rồi dán câu trả lời vào sheet",
      "Ghi đè một ô tỷ giá mỗi sáng để sheet chỉ giữ con số mới nhất",
    ],
    correctOption: 0,
    explanation:
      "API trả dữ liệu có cấu trúc, máy đọc được, nên workflow theo lịch lấy về và ghi vào sheet không cần ai. Ghi THÊM một dòng mỗi ngày thay vì ghi đè giữ được lịch sử - đó là thứ dashboard cần để vẽ xu hướng. Chép tay mỗi sáng là việc bài này muốn bỏ. Chatbot có thể trả tỷ giá cũ hoặc bịa, vì nó không nhất thiết tra nguồn thật mỗi lần hỏi.",
    diagram: [
      { label: "Trình kích hoạt theo lịch: 8 giờ sáng", arrow: true },
      { label: "Gọi API, khoá lấy từ kho bí mật", arrow: true },
      { label: "Kiểm tra JSON có đủ trường", arrow: true },
      { label: "Ghi thêm một dòng vào sheet dữ liệu", arrow: true },
      { label: "Looker Studio đọc sheet và vẽ" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng mua hàng nhập khẩu",
      description:
        "Nhân viên mua hàng cần tỷ giá mỗi sáng để báo giá, và trước đây chép tay từ trang web vào bảng tính - có hôm quên, có hôm chép nhầm ngày. Sau khi đặt một workflow theo lịch ghi tỷ giá vào sheet, họ có thêm một dashboard xu hướng 90 ngày mà trước đó không ai có thời gian làm.",
    },
    quiz: [
      {
        question: "Khoá API của dịch vụ tỷ giá nên để ở đâu?",
        options: [
          "Trong kho thông tin xác thực của n8n, hoặc thuộc tính của script",
          "Trong một ô ẩn của sheet mà cả phòng đang cùng dùng chung",
          "Ngay trong mã Apps Script, vì chỉ mình bạn mở phần mã",
          "Trong tiêu đề cột, để workflow tìm thấy khoá dễ hơn",
        ],
        correct: 0,
        explanation:
          "Khoá API là thông tin bí mật: ai có nó là gọi được dịch vụ dưới tên bạn, và hết hạn mức hoặc phát sinh phí là bạn chịu. Ô ẩn vẫn đọc được bởi mọi người có quyền xem sheet. Mã Apps Script đi theo bảng tính khi được chia sẻ hoặc sao chép. n8n có kho thông tin xác thực riêng; Apps Script có thuộc tính của script (Script Properties).",
      },
      {
        question: "Với phản hồi JSON mẫu trong bài, lấy tỷ giá VND bằng đường dẫn nào?",
        options: [
          "data.rates.VND",
          "data.VND",
          "data.base_code.VND",
          "data.rates[0].VND",
        ],
        correct: 0,
        explanation:
          "VND nằm trong đối tượng rates, và rates nằm trực tiếp trong phản hồi - nên đường dẫn là data.rates.VND. base_code chỉ là chuỗi \"USD\", không chứa tỷ giá. rates là một đối tượng tra theo mã tiền, không phải danh sách, nên không có phần tử [0].",
      },
      {
        question: "Looker Studio đọc từ loại tab nào trong sheet là tốt nhất?",
        options: [
          "Một tab dữ liệu gọn: mỗi dòng một ngày, mỗi cột một trường",
          "Tab báo cáo có ô gộp, màu nền và tiêu đề nhiều tầng đẹp mắt",
          "Nhiều tab, mỗi tab một tháng, để dễ tìm lại theo thời gian",
          "Tab chứa khoá API để Looker Studio tự gọi được dữ liệu mới",
        ],
        correct: 0,
        explanation:
          "Công cụ dashboard đọc bảng dạng \"dài\": một hàng tiêu đề, mỗi dòng một bản ghi, mỗi cột một trường. Ô gộp và tiêu đề nhiều tầng làm hỏng cách nó nhận cột. Chia mỗi tháng một tab thì mỗi tháng phải nối thêm nguồn. Looker Studio không cần và không nên thấy khoá API.",
      },
      {
        question: "API trả lỗi, hoặc JSON trả về thiếu trường rates. Workflow nên làm gì?",
        options: [
          "Không ghi dòng mới; ghi nhật ký và báo người sở hữu",
          "Ghi số 0 vào sheet để dashboard vẫn đủ dữ liệu ngày đó",
          "Chép tỷ giá hôm qua sang hôm nay để biểu đồ không gãy",
          "Thử lại liên tục mỗi phút cho tới khi API trả kết quả",
        ],
        correct: 0,
        explanation:
          "Một dòng số 0 hoặc số hôm qua trông như dữ liệu thật, và biểu đồ sẽ vẽ một cú rơi hay một ngày đứng yên không có thật - lỗi im lặng dạng khó thấy nhất. Bỏ trống ngày đó và báo lỗi thì người xem biết thiếu. Thử lại liên tục mỗi phút dễ đụng giới hạn tần suất của API.",
      },
      {
        question: "Lịch chạy workflow lấy tỷ giá nên đặt thế nào?",
        options: [
          "Theo tần suất nguồn cập nhật, ví dụ mỗi ngày một lần",
          "Mỗi phút một lần, để dashboard lúc nào cũng mới nhất",
          "Chỉ khi có người mở dashboard, để đỡ tốn tài nguyên",
          "Chạy tay khi sếp hỏi số, vì lịch tự động hay bị lỗi",
        ],
        correct: 0,
        explanation:
          "Gọi nhiều hơn tần suất nguồn cập nhật chỉ lấy về cùng một con số, tốn hạn mức và làm sheet phình ra. Đọc tài liệu API xem dữ liệu đổi bao lâu một lần rồi đặt lịch theo đó. Looker Studio không kích hoạt được workflow khi có người mở. Chạy tay là quay lại đúng việc dự án muốn bỏ.",
      },
    ],
    keyTakeaways: [
      "Workflow theo lịch + API + sheet dữ liệu + Looker Studio = dashboard tự làm mới.",
      "Ghi thêm dòng mỗi lần chạy để giữ lịch sử, đừng ghi đè.",
      "Khoá API nằm trong kho thông tin xác thực hoặc Script Properties, không trong sheet hay mã.",
      "API lỗi hoặc thiếu trường thì không ghi gì và báo lỗi; đừng điền số giả.",
      "Đặt lịch theo tần suất nguồn cập nhật, không dày hơn.",
    ],
    practicePrompt: {
      question: "Sheet đã có dòng tỷ giá hôm nay, nhưng dashboard vẫn hiện số hôm qua. Nguyên nhân hay gặp nhất là gì?",
      options: [
        "Looker Studio còn dùng dữ liệu lưu đệm, chưa làm mới",
        "Khoá API hết hạn nên Looker Studio không đọc được sheet nữa",
        "Biểu đồ Looker Studio chỉ cập nhật vào đầu mỗi tháng",
        "Dashboard phải xuất lại thành tệp PDF mới cập nhật số",
      ],
      correct: 0,
      explanation:
        "Looker Studio giữ dữ liệu lưu đệm (cache) một thời gian để dashboard mở nhanh, nên có độ trễ sau khi sheet đổi. Bạn có thể bấm làm mới dữ liệu hoặc chỉnh độ tươi dữ liệu của nguồn. Looker Studio đọc sheet bằng quyền Google của bạn, không dùng khoá API của dịch vụ tỷ giá.",
    },
    summary: {
      keyIdea: "Một workflow theo lịch đưa dữ liệu API vào sheet, và dashboard đọc sheet đó - không ai phải chép số nữa.",
      formula: "Lịch → gọi API (khoá từ kho bí mật) → kiểm tra JSON → ghi thêm dòng → Looker Studio.",
      commonMistake: "Để khoá API trong sheet chia sẻ, ghi đè thay vì ghi thêm dòng, và điền số 0 khi API lỗi.",
      action: "Chọn một API công khai miễn phí, gọi thử một lần, đọc JSON, rồi ghi 1 dòng vào sheet bằng tay trước khi tự động.",
    },
    application: {
      title: "Dự án: làm trong tuần này",
      message:
        "Chọn một API công khai miễn phí (tỷ giá, thời tiết, hoặc dữ liệu thống kê). Dựng workflow theo lịch mỗi ngày ghi một dòng vào tab \"du_lieu\", rồi nối Looker Studio vào tab đó và vẽ một biểu đồ đường. Để nó chạy 5 ngày và kiểm tra có đủ 5 dòng.",
      secondary: "Thử tắt mạng hoặc đổi sai khoá một lần để chắc rằng bạn nhận được thông báo lỗi.",
    },
    sections: [
      {
        type: "lead",
        text: "Dự án cuối của chặng: một dashboard tự làm mới. Workflow theo lịch lấy dữ liệu từ API vào Google Sheets, Looker Studio vẽ từ sheet. Không có ứng dụng nào phải viết, và bạn dùng lại mọi chốt chặn của bài 4.",
      },
      { type: "heading", text: "Vấn đề: chép số mỗi sáng" },
      {
        type: "paragraph",
        text: "Mỗi sáng một người mở trang web, chép tỷ giá vào bảng tính. Năm phút, nhưng mỗi ngày làm việc - và hôm nào người đó nghỉ thì bảng trống. Không ai có lịch sử đủ dài để vẽ xu hướng.",
      },
      { type: "heading", text: "API trả về gì" },
      {
        type: "paragraph",
        text: "Chặng 7 đã dạy API là một hợp đồng: gửi yêu cầu theo khuôn, nhận lại dữ liệu theo khuôn - thường là JSON. Dưới đây là dạng phản hồi của một API tỷ giá điển hình (số chỉ để minh hoạ). Mỗi dịch vụ đặt tên trường khác nhau, nên luôn gọi thử một lần và đọc dữ liệu thật trước khi dựng.",
      },
      {
        type: "code",
        language: "json",
        caption: "Phản hồi mẫu (số minh hoạ). Tỷ giá VND nằm ở rates.VND.",
        code: `{
  "result": "success",
  "base_code": "USD",
  "time_last_update_utc": "Mon, 21 Sep 2026 00:00:01 +0000",
  "rates": {
    "USD": 1,
    "VND": 25350,
    "EUR": 0.91,
    "JPY": 146.2
  }
}`,
      },
      { type: "heading", text: "Từng bước" },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn API: đọc tài liệu xem có cần khoá không, giới hạn tần suất bao nhiêu, dữ liệu cập nhật bao lâu một lần.",
          "Bước 2 - Gọi thử một lần (trình duyệt hoặc node HTTP Request của n8n) và ghi lại đường dẫn tới trường cần lấy.",
          "Bước 3 - Tạo tab \"du_lieu\" với hàng tiêu đề: Ngày, Tiền gốc, Tỷ giá VND. Không gộp ô, không tô màu.",
          "Bước 4 - Dựng workflow: kích hoạt theo lịch → gọi API → kiểm tra có rates.VND → ghi thêm một dòng.",
          "Bước 5 - Cất khoá API vào kho thông tin xác thực của n8n, hoặc Script Properties nếu dùng Apps Script.",
          "Bước 6 - Bật thông báo khi lỗi về hộp thư nhóm.",
          "Bước 7 - Trong Looker Studio, thêm nguồn Google Sheets trỏ vào tab \"du_lieu\", vẽ biểu đồ đường theo Ngày.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        caption: "Apps Script cho bước 4-5, gắn với trình kích hoạt theo giờ mỗi ngày. Khoá đọc từ Script Properties, không nằm trong mã.",
        code: `function capNhatTyGia() {
  const khoa = PropertiesService.getScriptProperties().getProperty("TY_GIA_API_KEY");
  const phanHoi = UrlFetchApp.fetch("https://api.example.com/latest?base=USD", {
    headers: { Authorization: "Bearer " + khoa },
    muteHttpExceptions: true,
  });

  if (phanHoi.getResponseCode() !== 200) {
    throw new Error("API lỗi " + phanHoi.getResponseCode()); // lỗi => Google gửi email báo
  }
  const data = JSON.parse(phanHoi.getContentText());
  if (!data.rates || !data.rates.VND) {
    throw new Error("Phản hồi thiếu rates.VND - không ghi dòng nào");
  }

  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("du_lieu")
    .appendRow([new Date(), data.base_code, data.rates.VND]);
}`,
      },
      {
        type: "callout",
        label: "Rủi ro: khoá API trong sheet chia sẻ",
        text: "Một khoá dán vào ô, dù là ô ẩn, sẽ đi theo mọi bản sao và mọi người có quyền xem. Mã Apps Script cũng đi theo bảng tính khi bị sao chép. Ai có khoá là gọi được dịch vụ dưới tên bạn. Cất khoá trong kho bí mật, và nếu lỡ lộ thì thu hồi, tạo khoá mới ngay.",
      },
      {
        type: "comparison",
        left: {
          label: "Ghi đè một ô mỗi ngày",
          text: "Chỉ thấy số hôm nay. Không vẽ được xu hướng, và API lỗi một hôm là mất luôn dấu vết.",
        },
        right: {
          label: "Ghi thêm một dòng mỗi ngày",
          text: "Có lịch sử để vẽ biểu đồ, thấy ngay ngày nào thiếu, và kiểm tra lại được khi có ai hỏi \"hôm đó tỷ giá bao nhiêu\".",
        },
      },
      { type: "heading", text: "Xong là khi…" },
      {
        type: "list",
        items: [
          "Workflow chạy 5 ngày liền theo lịch, tab dữ liệu có đủ 5 dòng.",
          "Khoá API không xuất hiện ở bất kỳ ô hay dòng mã nào.",
          "Cố tình làm API lỗi một lần thì bạn nhận được thông báo, và sheet không có dòng số giả.",
          "Dashboard Looker Studio hiện biểu đồ đường và làm mới được sau khi có dòng mới.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Lịch, API, sheet, dashboard - bốn mảnh, và không ai phải chép số mỗi sáng nữa.",
          "Bạn vừa đi hết chặng: từ nhìn ra cấu trúc của một workflow tới hai dự án chạy thật.",
        ],
      },
    ],
  },

  // ── Bài 7 ────────────────────────────────────────────────────────────────
  {
    id: 1836,
    slug: "nhac-khach-chua-thanh-toan-hoac-bo-gio-hang",
    title: "Chặng 27, Bài 7: Nhắc khách chưa thanh toán hoặc bỏ giỏ hàng - đúng lúc, đúng giọng, và lúc nào không nên nhắn",
    subtitle: "Tin nhắc tự động sinh lời khi nó giống một nhân viên tinh ý, và gây hại khi nó giống một cái loa.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔔",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chủ shop nhỏ thường mất đơn không phải vì khách chê hàng, mà vì khách bận rồi quên. Một tin nhắc đúng lúc kéo được đơn đó về. Nhưng nếu cài sai, tin nhắc tự động sẽ nhắn cho người đã trả tiền, nhắn giữa đêm, nhắn mười lần - và biến khách thành người chặn shop. Bài này dạy ba quy tắc: nhắn lúc nào, nói giọng nào, và khi nào phải im.",
    openingQuestion:
      "Chị Hoa bán mỹ phẩm online. Khách chọn chuyển khoản, đặt đơn lúc 21 giờ nhưng chưa chuyển tiền. Chị cài để hệ thống tự nhắn nhắc. Lần nhắc đầu tiên nên gửi lúc nào?",
    openingOptions: [
      "Sáng hôm sau, trong giờ làm việc, kèm thông tin đơn",
      "Ngay lúc 21 giờ 05, khi khách còn nhớ rõ đơn hàng vừa đặt, để khách khỏi quên",
      "Cứ mỗi 30 phút cho tới khi khách trả lời, để khách không có cơ hội quên",
      "Sau đúng 7 ngày, để khách không thấy bị làm phiền",
    ],
    correctOption: 0,
    explanation:
      "Khách đặt đơn buổi tối thường đang tính chuyển khoản sau, nên nhắn ngay hoặc nhắn dồn dập chỉ tạo cảm giác bị săn đuổi và khách dễ chặn shop. Nhắn quá muộn, sau cả tuần, thì khách đã quên hoặc mua chỗ khác. Điểm cân bằng là một lần nhắc nhẹ vào lúc khách có thể đọc và làm - thường là sáng hôm sau, trong giờ làm việc - và trong tin có đủ mã đơn, số tiền, cách trả để khách khỏi phải tìm lại.",
    diagram: [
      { label: "Sự kiện: đơn tạo, chưa thấy tiền", arrow: true },
      { label: "Chờ tới sáng hôm sau, trong giờ làm việc", arrow: true },
      { label: "Kiểm tra lại: đã trả chưa? đã huỷ chưa?", arrow: true },
      { label: "Gửi một tin nhắc nhẹ, ghi lại đã nhắc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một shop bán đồ handmade có cài tin nhắc tự động: cứ đơn chưa trả sau 2 tiếng thì nhắn, sau 4 tiếng nhắn tiếp, sau 6 tiếng nhắn nữa. Một khách vừa chuyển khoản lúc 23 giờ thì nhận tin nhắc lúc 1 giờ sáng vì bảng đối soát chỉ cập nhật vào buổi sáng, và đăng lên trang shop một bình luận phàn nàn. Sau đó chủ shop đổi thành: một tin sáng hôm sau, một tin nữa sau hai ngày, và luôn kiểm tra trạng thái ngay trước khi gửi.",
    },
    quiz: [
      {
        question: "Trước khi tin nhắc đi, bước kiểm tra nào quan trọng nhất?",
        options: [
          "Đọc lại trạng thái thanh toán của đơn ngay lúc gửi",
          "Đọc trạng thái thanh toán lúc đơn được tạo, vì lúc đó dữ liệu đầy đủ nhất",
          "Đếm hôm nay đã gửi bao nhiêu tin nhắc để hệ thống không bị quá tải",
          "Kiểm tra tên khách đã viết hoa đúng chưa để tin nhắn trông chuyên nghiệp",
        ],
        correct: 0,
        explanation:
          "Khách có thể đã chuyển tiền trong khoảng chờ, nên trạng thái phải được đọc lại đúng lúc gửi. Trạng thái lúc tạo đơn luôn là chưa trả nên vô ích. Đếm số tin hay soát chính tả đều tốt nhưng không ngăn được lỗi tệ nhất: nhắc người đã trả tiền.",
      },
      {
        question: "Số lần nhắc hợp lý cho một đơn chưa thanh toán là bao nhiêu?",
        options: [
          "Tối đa hai lần, cách nhau ít nhất một ngày, rồi dừng",
          "Mỗi ngày một lần tới khi khách trả, vì kiên trì mới chốt",
          "Đúng một lần; nếu khách im lặng thì chắc chắn đã bỏ đơn",
          "Tăng dần: nhẹ ngày đầu, ngày ba nói rõ đơn sẽ bị huỷ",
        ],
        correct: 0,
        explanation:
          "Một hai lần nhắc là nhắc nhở, nhiều hơn là làm phiền. Nhắc mỗi ngày không thời hạn khiến khách chặn shop. Một lần duy nhất bỏ sót người chỉ quên. Nhắc tăng dần bằng lời doạ huỷ thì đổi giọng từ hỏi han sang ép buộc, và chỉ nên dùng khi đơn thật sự có hạn giữ hàng do chính shop công bố.",
      },
      {
        question: "Khách bỏ giỏ hàng, tin nhắc nào đúng giọng nhất?",
        options: [
          "Hỏi thăm, nhắc giỏ vẫn còn giữ, hỏi khách cần shop giúp gì",
          "Ghi chỉ còn 1 sản phẩm, nhanh kẻo hết, dù kho còn nhiều",
          "Nhắc khách đã bỏ quên đơn và nói việc này làm mất thời gian của shop",
          "Tặng ngay giảm 30% cho mọi giỏ bị bỏ, không cần hỏi lý do khách rời đi",
        ],
        correct: 0,
        explanation:
          "Người bỏ giỏ thường còn phân vân về giá, ship hay kích cỡ, nên một lời hỏi thăm mở đường cho họ nói. Tạo khan hiếm giả là nói sai sự thật. Trách khách làm mất khách. Giảm giá cho mọi giỏ bỏ dạy khách thói quen bỏ giỏ để chờ mã giảm và cắt lợi nhuận của cả những người vốn sẽ mua.",
      },
      {
        question: "Trường hợp nào tuyệt đối không nên để tin nhắc tự động gửi?",
        options: [
          "Khách vừa nhắn báo huỷ đơn hoặc đang phàn nàn về đơn",
          "Khách mua lần đầu, vì họ chưa quen shop nên dễ thấy phiền",
          "Ngày hôm đó là cuối tuần, vì không ai đọc tin nhắn cuối tuần cả",
          "Đơn có giá trị nhỏ, vì nhắc đơn nhỏ không đáng công",
        ],
        correct: 0,
        explanation:
          "Khách đã báo huỷ hoặc đang khiếu nại cần một con người xử lý; nhận thêm tin nhắc đòi tiền lúc đó là chọc vào chỗ đau. Khách mới vẫn nên được nhắc nhẹ. Cuối tuần vẫn có người đọc, chỉ cần tránh giờ khuya. Đơn nhỏ tốn hệ thống gần như không gì, nên không có lý do bỏ.",
      },
      {
        question: "Tin nhắc nhầm người đã trả tiền thì ai chịu trách nhiệm?",
        options: [
          "Chủ shop, nên phải có nhật ký và chỗ để khách phản hồi",
          "Công cụ tự động hoá, vì chính nó là bên soạn và gửi tin",
          "Khách hàng, vì họ nên báo lại nếu đã trả rồi",
          "Không ai cả, vì đây là lỗi hiếm mà hệ thống nào cũng có",
        ],
        correct: 0,
        explanation:
          "Công cụ chỉ làm đúng điều chủ shop cài; tin đi dưới tên shop nên shop chịu. Vì vậy cần nhật ký để biết ai bị nhắn, và một câu như: nếu bạn đã thanh toán, trả lời tin này để shop kiểm tra. Đổ cho công cụ hay cho khách không giúp khách đã bị làm phiền, còn coi là lỗi hiếm thì lặp lại mãi.",
      },
    ],
    keyTakeaways: [
      "Nhắc một đến hai lần, cách nhau ít nhất một ngày, trong giờ làm việc, rồi dừng.",
      "Luôn đọc lại trạng thái thanh toán ngay trước khi gửi, không dùng trạng thái cũ.",
      "Giọng của tin nhắc là hỏi thăm và giúp, không phải trách móc, khan hiếm giả hay ép.",
      "Không nhắn khi khách đã huỷ, đang khiếu nại, hoặc đã xin dừng nhận tin.",
      "Tin nhắc nào cũng cần một câu cho khách đã trả rồi và một dòng nhật ký cho shop.",
    ],
    practicePrompt: {
      question:
        "Đơn của khách Lan đặt 20 giờ thứ Sáu, chưa trả. Quy tắc nào của chị Hoa hợp lý nhất?",
      options: [
        "Sáng thứ Bảy 9 giờ nhắc một lần; thứ Hai nhắc lần hai; cả hai lần đều kiểm tra trạng thái trước khi gửi",
        "Nhắc lúc 20 giờ 10, 22 giờ và 0 giờ thứ Bảy, để chắc chắn khách nhìn thấy ít nhất một tin",
        "Đợi tới thứ Ba tuần sau mới nhắc một lần, để khách không bao giờ thấy bị thúc giục",
        "Nhắc mỗi sáng tới khi khách trả, và bỏ kiểm tra trạng thái vì việc kiểm tra làm chậm tin",
      ],
      correct: 0,
      explanation:
        "Hai tin trong giờ làm việc, cách nhau cuối tuần, kèm kiểm tra trạng thái ngay trước khi gửi là quy tắc đủ nhắc mà không phiền. Ba tin trong hai tiếng và giữa đêm là săn đuổi. Đợi tới thứ Ba thì đơn đã nguội. Bỏ kiểm tra để gửi nhanh thì sớm muộn cũng nhắn nhầm người đã trả.",
    },
    summary: {
      keyIdea: "Tin nhắc tự động tốt là tin đúng lúc, đúng giọng, và biết khi nào không gửi.",
      formula: "Chờ đủ lâu → kiểm tra lại trạng thái → một tin hỏi thăm → ghi nhật ký → tối đa hai lần rồi dừng.",
      commonMistake: "Cài lịch nhắc dày mà không kiểm tra lại trạng thái, nên nhắn cả người đã trả tiền hoặc đã báo huỷ.",
      action: "Viết ra ba điều kiện khiến shop của bạn không được nhắn cho khách.",
    },
    application: {
      title: "Viết quy tắc nhắc cho shop của bạn",
      message:
        "Mở đơn hàng của tuần trước và tìm 3 đơn khách để dở, chưa thanh toán hoặc bỏ giỏ. Với mỗi đơn, ghi ra: khách có thể đã bận gì, bạn sẽ nhắn lúc nào và câu đầu tiên của tin là gì. Cuối cùng viết 3 trường hợp shop không bao giờ được nhắn. Khoảng 15 phút, ghi vào một tệp ghi chú.",
      secondary: "Ngày mai bạn sẽ được hỏi: quy tắc nào bạn đã viết, và có đơn thật nào khớp với ba trường hợp không nhắn không.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu 21 giờ, một khách đặt hai lọ kem chống nắng rồi tắt điện thoại đi ngủ, tiền chưa chuyển. Sáng thứ Bảy bạn quên không hỏi. Tới thứ Hai khách đã mua ở chỗ khác. Bài này dạy cách để một tin nhắc tự động làm việc của một nhân viên tinh ý thay vì của một cái loa.",
      },
      {
        type: "feynman",
        title: "Nhắc khách đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới người bán hàng khéo ở chợ: khách chọn hàng rồi bỏ đó đi xem chỗ khác.",
        columns: ["Điều người bán khéo làm", "Người bán ở chợ", "Tin nhắc tự động"],
        rows: [
          ["Chờ một lúc rồi mới hỏi", "Đợi khách đi một vòng chứ không chạy theo ngay", "Đặt khoảng chờ vài tiếng tới sáng hôm sau"],
          ["Nhìn xem khách còn đó không", "Liếc xem khách đã mua ở quầy khác chưa", "Kiểm tra lại trạng thái thanh toán trước khi gửi"],
          ["Hỏi thăm chứ không ép", "Chị cần em giúp chọn size không?", "Tin nhắc có câu hỏi mở, không doạ, không khan hiếm giả"],
          ["Biết lúc nào thôi", "Khách lắc đầu thì không nài nỉ nữa", "Tối đa hai lần, ai xin dừng thì dừng"],
        ],
        oneLiner: "Tin nhắc tự động chỉ là người bán khéo được viết thành quy tắc: chờ, nhìn lại, hỏi thăm, biết dừng.",
      },
      { type: "heading", text: "Ba quy tắc: lúc nào, giọng nào, khi nào im" },
      {
        type: "paragraph",
        text: "Lúc nào: chờ đủ lâu để khách có cơ hội tự làm, nhưng không lâu tới mức họ quên. Với đơn đặt buổi tối thì sáng hôm sau trong giờ làm việc là hợp lý; tránh giờ khuya và giờ nghỉ. Giọng nào: hỏi thăm và giúp, có mã đơn, số tiền, cách trả ngay trong tin. Khi nào im: khách đã trả, đã huỷ, đang khiếu nại, hoặc đã xin dừng nhận tin. Nếu bạn nhắn cho khách vì mục đích quảng cáo chứ không chỉ về đơn họ đã đặt, hãy hỏi người phụ trách pháp lý về việc khách đã đồng ý nhận tin chưa.",
      },
      {
        type: "flow",
        title: "Một tin nhắc đi qua những chốt nào trước khi gửi",
        steps: [
          { label: "Đơn được tạo, chưa có tiền", detail: "Sự kiện làm quy tắc bắt đầu chạy. Hệ thống chỉ ghi lại rằng đơn này đang chờ, chưa gửi gì cả." },
          { label: "Chờ tới sáng hôm sau", detail: "Khoảng chờ cho khách tự thanh toán. Tin không bao giờ đi trong đêm hay ngay sau khi vừa đặt." },
          { label: "Đọc lại trạng thái", detail: "Ngay trước khi gửi, quy tắc kiểm tra lại: đơn đã được trả chưa, đã huỷ chưa, khách có ghi chú khiếu nại hay xin dừng nhắn không. Nếu có, dừng." },
          { label: "Gửi tin hỏi thăm", detail: "Tin có mã đơn, số tiền, cách trả, và một câu cho người đã trả rồi: hãy trả lời tin này để shop kiểm tra." },
          { label: "Ghi nhật ký, đếm lần nhắc", detail: "Ghi đơn nào, giờ nào, lần thứ mấy. Đủ hai lần thì đánh dấu đã nhắc xong để không bao giờ gửi lần ba." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin nhắc thanh toán",
        task: "Khách Lan đặt đơn #1042 gồm 2 lọ kem chống nắng, tổng 450.000đ, chuyển khoản, shop giữ hàng tới hết thứ Hai. Lắp một yêu cầu để AI soạn nháp tin nhắc; bạn sẽ đọc lại trước khi cài vào công cụ.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết tin nhắn nhắc khách thanh toán.", feedback: "AI không biết đơn nào, bao nhiêu tiền, hạn giữ hàng - nó sẽ tự bịa những chi tiết đó." },
              {
                text: "Shop mỹ phẩm. Đơn #1042 của khách Lan: 2 lọ kem chống nắng, 450.000đ, chuyển khoản, shop giữ hàng tới hết thứ Hai.",
                good: true,
                feedback: "Có đủ mã đơn, số tiền, hạn giữ hàng do chính shop công bố - AI chỉ cần viết quanh những dữ kiện thật.",
              },
            ],
          },
          {
            id: "tone",
            label: "Giọng và điều cấm",
            options: [
              { text: "Viết thật thuyết phục để khách trả tiền ngay.", feedback: "Thuyết phục là mệnh lệnh mơ hồ - AI thường viết ép và thêm hạn chót, giảm giá không có thật." },
              {
                text: "Giọng thân thiện, hỏi thăm, không doạ, không nói hết hàng hay giảm giá nếu tôi không cho phép.",
                good: true,
                feedback: "Chặn sẵn hai lỗi hay gặp: ép khách và hứa những điều shop chưa nói.",
              },
            ],
          },
          {
            id: "format",
            label: "Độ dài và câu cho người đã trả",
            options: [
              { text: "Viết dài, đầy đủ để khách hiểu hết mọi chuyện.", feedback: "Tin dài trên điện thoại thường không được đọc tới đoạn cách trả tiền." },
              {
                text: "Dưới 50 chữ, có cách trả, và một câu: nếu bạn đã chuyển khoản rồi, hãy trả lời tin này để shop kiểm tra.",
                good: true,
                feedback: "Ngắn, có việc cần làm, và có lối thoát cho khách đã trả - nhắc nhầm cũng không thành sự cố.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "tone", "format"],
            text: "Chào chị Lan, shop nhắc nhẹ đơn #1042 (2 lọ kem chống nắng, 450.000đ) đang chờ chuyển khoản; shop giữ hàng tới hết thứ Hai ạ. Chị cần shop hỗ trợ gì cứ nhắn nhé. Nếu chị đã chuyển rồi, chị trả lời tin này để shop kiểm tra giúp.",
          },
          {
            requires: ["context"],
            text: "Chào chị Lan, đơn #1042 của chị (450.000đ) chưa được thanh toán. Rất mong chị sớm chuyển khoản để chúng tôi có thể xử lý đơn hàng của chị một cách nhanh chóng nhất, tránh ảnh hưởng tới quyền lợi của chị...\n\n(Đủ dữ kiện nhưng giọng nặng nề, không có lối thoát cho người đã trả.)",
          },
          {
            text: "Chào bạn, hàng bên mình sắp hết rồi! Trả tiền trong 1 giờ tới để nhận ngay ưu đãi giảm 20% nhé!\n\n(Không có mã đơn nào, còn tự bịa hạn 1 giờ, ưu đãi 20% và tình trạng sắp hết hàng - những điều shop chưa từng nói.)",
          },
        ],
      },
      { type: "heading", text: "Bốn trường hợp cần một người, không cần máy" },
      {
        type: "list",
        items: [
          "Khách đã nhắn báo huỷ hoặc phàn nàn về đơn: chuyển cho người xử lý, dừng mọi tin nhắc.",
          "Khách trả lời ngay sau tin nhắc bằng một câu hỏi: người trả lời, không để quy tắc gửi tiếp lần hai.",
          "Đơn giá trị lớn hoặc khách quen lâu năm: một cuộc gọi hoặc tin nhắn tay từ chủ shop hiệu quả hơn tin tự động.",
          "Khách nhắn dừng, không nhận tin nữa: ghi vào danh sách không nhắn và giữ vĩnh viễn.",
        ],
      },
      {
        type: "scenario",
        title: "Cài quy tắc nhắc cho đơn 21 giờ",
        start: "start",
        nodes: {
          start: {
            text: "Khách đặt đơn lúc 21 giờ, chọn chuyển khoản, chưa trả. Bạn đang cài quy tắc nhắc đầu tiên trong công cụ tự động hoá.",
            choices: [
              { label: "Nhắn mỗi 30 phút cho tới khi khách trả lời", next: "spam" },
              { label: "Nhắn một lần vào sáng hôm sau trong giờ làm việc", next: "morning" },
            ],
          },
          spam: {
            text: "Khách nhận sáu tin trong đêm, tắt thông báo và chặn shop. Bạn mất cả đơn hàng lẫn một khách quen.",
            ending: "bad",
          },
          morning: {
            text: "Sáng hôm sau quy tắc chạy. Nhưng đêm qua khách đã chuyển tiền lúc 23 giờ, còn bảng đối soát của bạn chỉ cập nhật vào 10 giờ. Bạn cần quyết định cách gửi.",
            choices: [
              { label: "Cứ gửi theo lịch 9 giờ, dữ liệu trong bảng chắc đúng rồi", next: "wrong" },
              { label: "Đọc lại trạng thái ngay trước khi gửi và thêm câu: nếu đã chuyển rồi, hãy trả lời tin này", next: "good" },
            ],
          },
          wrong: {
            text: "Khách vừa trả tiền lại nhận tin nhắc đòi tiền lúc 9 giờ, thấy mình bị theo dõi kém và đăng phàn nàn. Bạn mất một buổi chiều xin lỗi.",
            ending: "bad",
          },
          good: {
            text: "Hệ thống thấy đơn đã trả nên tự bỏ qua tin nhắc; những đơn còn lại nhận một tin nhẹ nhàng với lối thoát cho người đã trả. Không ai bị làm phiền, bạn lấy lại được đơn của người thật sự quên.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nhớ: tin đi dưới tên shop của bạn",
        text: "Công cụ tự động hoá chỉ gửi đúng thứ bạn cài. Khách chỉ thấy tên shop, không thấy công cụ, nên mọi tin sai đều là tin sai của bạn. Vì vậy quy tắc phải có kiểm tra lại, giới hạn số lần, và một dòng nhật ký để bạn biết ai đã bị nhắn.",
      },
      {
        type: "closing",
        lines: [
          "Chờ đủ lâu, nhìn lại một lần, hỏi thăm nhẹ, biết dừng - bốn việc của người bán khéo.",
          "Bài sau: khách nhắn hỏi giá và còn hàng lúc nửa đêm - trả lời nửa tự động mà không hứa bừa.",
        ],
      },
    ],
  },

  // ── Bài 8 ────────────────────────────────────────────────────────────────
  {
    id: 1837,
    slug: "tra-loi-tin-nhan-hoi-gia-ton-kho-nua-tu-dong",
    title: "Chặng 27, Bài 8: Trả lời tin nhắn hỏi giá và tồn kho nửa tự động - mẫu, người duyệt và ranh giới lời hứa",
    subtitle: "Máy trả lời những gì bảng tính nói; người trả lời những gì cần cam kết.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hai câu hỏi lặp lại nhiều nhất của khách online là giá bao nhiêu và còn hàng không. Trả lời chậm mất đơn, trả lời tự động bừa thì hứa những điều shop không làm. Nửa tự động nghĩa là chia đôi: máy điền những gì có trong bảng tính, còn lời hứa và mọi câu lạ đều qua tay người.",
    openingQuestion:
      "Chị Mai bán áo sơ mi. Lúc 22 giờ khách nhắn: áo này còn size M không, giá bao nhiêu? Cách tự động hoá nào an toàn nhất?",
    openingOptions: [
      "Điền giá và số tồn từ bảng tính vào mẫu; câu lạ chuyển cho người",
      "Cho AI tự trả lời mọi tin, kể cả hứa ngày giao hoặc giảm giá để chốt nhanh hơn",
      "Trả lời còn hàng cho mọi câu hỏi tồn kho để khách không bỏ đi",
      "Chỉ bật một câu shop sẽ phản hồi sau cho mọi tin, rồi không cần xem lại tin nào nữa",
    ],
    correctOption: 0,
    explanation:
      "Giá và số tồn là dữ kiện có sẵn trong bảng tính, nên máy điền vào mẫu là an toàn và nhanh. Những câu ngoài mẫu - đổi trả, giao hàng gấp, giảm giá - là lời cam kết của shop, phải qua người. Cho AI tự trả lời mọi thứ sẽ có lúc nó bịa chính sách; trả lời còn hàng mà chưa kiểm sẽ bán hàng không có; còn chỉ gửi một câu hẹn rồi không xem lại thì khách đợi mãi, mất đơn như không có gì.",
    diagram: [
      { label: "Khách hỏi giá, hỏi còn hàng", arrow: true },
      { label: "Máy điền giá và tồn từ bảng tính vào mẫu", arrow: true },
      { label: "Câu ngoài mẫu: gửi cho người duyệt", arrow: true },
      { label: "Người trả lời và cập nhật mẫu nếu câu hỏi lặp lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một shop nhỏ cài trả lời tự động cho tin hỏi giá. Bản đầu cho AI tự viết mọi câu trả lời; hai tuần sau chủ shop đọc lại thì thấy AI đã nhiều lần nhắn khách rằng đổi trả miễn phí trong 90 ngày, trong khi shop chỉ đổi trong 7 ngày. Bản sau chỉ cho máy điền giá và tồn vào một mẫu cố định, còn câu về đổi trả, giao hàng, giảm giá thì chuyển cho người.",
    },
    quiz: [
      {
        question: "Giá và số tồn trong tin trả lời tự động nên lấy từ đâu?",
        options: [
          "Bảng tính hiện hành của shop, đọc ngay lúc trả lời",
          "Trí nhớ của AI về các cuộc trò chuyện trước, vì nó đã thấy giá nhiều lần",
          "Tin trả lời hôm qua được lưu làm mẫu, chỉ cần sửa lại tên khách",
          "Ước lượng của AI từ tên sản phẩm và giá phổ biến của các shop cùng loại",
        ],
        correct: 0,
        explanation:
          "Giá và tồn thay đổi hằng ngày; chỉ bảng tính hiện hành mới là nguồn đúng. AI không nhớ giá của shop bạn và sẽ đoán; tin cũ đã lỗi thời; giá của shop khác không phải giá của bạn. Mỗi lần dùng một nguồn ngoài bảng là một lần có thể báo sai giá cho khách.",
      },
      {
        question: "Điều nào máy tuyệt đối không được tự hứa, nếu chưa có người duyệt?",
        options: [
          "Ngày giao, giảm giá, đổi trả và hoàn tiền",
          "Chỉ tin giận dữ; lời hứa nhẹ thì tự gửi",
          "Chỉ tin dài trên 5 dòng, vì tin ngắn ít cam kết",
          "Chỉ tin cho khách cũ, khách mới chưa đòi được",
        ],
        correct: 0,
        explanation:
          "Những cam kết về ngày giao, giá, đổi trả, hoàn tiền ràng buộc shop, nên phải do người quyết. Một lời hứa nhẹ nhàng vẫn là lời hứa; tin ngắn như ok giao trong ngày cũng là cam kết; và khách mới đòi shop giữ lời cũng chính đáng như khách cũ. Câu về pháp lý hay hoàn tiền phức tạp hãy hỏi người phụ trách.",
      },
      {
        question: "Bảng ghi size M còn 4, cập nhật sáng nay; khách hỏi chiều. Nên trả lời thế nào?",
        options: [
          "Theo cập nhật sáng nay còn 4 cái; mời khách chốt để shop xác nhận",
          "Còn 4 cái ạ, shop giữ hàng cho chị đến hết ngày hôm nay nhé",
          "Còn hàng ạ - bỏ con số, vì số có thể đã cũ và gây rắc rối",
          "Hết hàng ạ, để chắc ăn vì bảng chưa cập nhật lại từ sáng tới giờ",
        ],
        correct: 0,
        explanation:
          "Nói rõ mốc thời gian của con số cho khách biết độ tin cậy và để shop xác nhận. Tự hứa giữ hàng là cam kết chưa được duyệt. Chỉ nói còn hàng khiến khách đặt cả 6 cái. Nói hết hàng để chắc ăn thì mất đơn không cần thiết chỉ vì bảng chưa cập nhật.",
      },
      {
        question: "Khách hỏi shop có xuất hoá đơn đỏ không - câu không có trong mẫu nào. Máy nên làm gì?",
        options: [
          "Chuyển cho người, khách nhận tin shop sẽ trả lời trong giờ làm việc",
          "Suy luận theo thông lệ ngành rồi trả lời, vì shop nào cũng có hoá đơn",
          "Bỏ qua tin vì không có trong mẫu, người sẽ tự thấy nếu nó quan trọng",
          "Trả lời bằng mẫu gần nhất, chắc khách sẽ tự hiểu ý và hỏi lại nếu cần",
        ],
        correct: 0,
        explanation:
          "Câu lạ là chỗ máy dễ bịa nhất; hoá đơn liên quan kế toán và thuế nên chỉ người phụ trách mới biết. Bỏ qua khiến khách bị bỏ rơi; trả lời mẫu gần nhất đưa thông tin không trả lời câu khách hỏi. Tin hẹn giờ cho khách biết đã có người nhận.",
      },
      {
        question: "Sau hai tuần chạy, cách nào đánh giá trả lời nửa tự động tốt nhất?",
        options: [
          "Đọc lại các tin đã gửi và các tin khách phàn nàn hoặc hỏi lại",
          "Đếm số tin đã gửi; càng nhiều tin tự động là hệ thống càng tốt",
          "Chỉ xem có khách nào khen không; không ai khen là ổn",
          "Chỉ xem doanh thu tuần đó tăng bao nhiêu so tuần trước",
        ],
        correct: 0,
        explanation:
          "Đọc tin thật và những lần khách hỏi lại hoặc phàn nàn cho thấy mẫu nào trả lời chưa đúng ý. Số tin gửi chỉ đo khối lượng; im lặng không có nghĩa là khách hài lòng; doanh thu chịu ảnh hưởng của quá nhiều thứ khác. Từ đó bạn sửa mẫu hoặc thêm câu vào danh sách phải qua người.",
      },
    ],
    keyTakeaways: [
      "Máy điền giá và tồn từ bảng tính vào mẫu; câu lạ và mọi lời hứa qua tay người.",
      "Ghi mốc thời gian của số tồn, và dùng còn khoảng hoặc theo cập nhật lúc thay vì cam kết chắc chắn.",
      "Ngày giao, giảm giá, đổi trả, hoàn tiền: luôn cần người duyệt.",
      "Câu ngoài mẫu: chuyển cho người, khách được báo đã có người nhận.",
      "Đọc lại tin thật mỗi hai tuần để sửa mẫu và thêm câu vào danh sách cần người.",
    ],
    practicePrompt: {
      question:
        "Khách hỏi: mua 20 cái thì có giảm không, và khi nào giao tới Đà Nẵng? Bảng chỉ có giá lẻ và tồn. Máy nên xử lý thế nào?",
      options: [
        "Chuyển cho người vì cả giảm giá và ngày giao đều là cam kết; máy chỉ báo giá lẻ và tồn nếu khách hỏi",
        "Tự trả lời giảm 10% cho lô 20 cái và giao 3 ngày, vì đó là mức phổ biến của các shop",
        "Bỏ qua phần khó, chỉ trả lời giá lẻ và im lặng về hai câu còn lại của khách",
        "Trả lời shop sẽ tính giá tốt nhất cho khách và giao nhanh nhất có thể, không nêu con số nào",
      ],
      correct: 0,
      explanation:
        "Giảm giá theo số lượng và thời gian giao là cam kết, phải do người quyết. Tự đưa 10% hay 3 ngày là bịa. Im lặng với hai câu khó làm khách hiểu shop không quan tâm. Những câu tốt nhất và nhanh nhất là lời hứa mơ hồ, khách sẽ đòi shop giữ lời sau này.",
    },
    summary: {
      keyIdea: "Nửa tự động là chia việc: máy điền dữ kiện trong bảng, người giữ mọi lời cam kết.",
      formula: "Khách hỏi → máy điền giá/tồn vào mẫu → câu lạ hoặc có cam kết qua người → đọc lại sau hai tuần.",
      commonMistake: "Để AI tự trả lời mọi thứ và tin rằng nó biết chính sách của shop, trong khi nó chỉ biết những gì bạn đã đưa.",
      action: "Viết ra 5 điều shop bạn không bao giờ để máy tự hứa.",
    },
    application: {
      title: "Viết mẫu trả lời và danh sách phải qua người",
      message:
        "Mở lịch sử tin nhắn của shop và chọn ra 5 câu khách hỏi lặp lại nhiều nhất. Với mỗi câu, ghi: dữ kiện nào lấy từ bảng tính, mẫu trả lời gồm những gì, và câu hỏi có cần người duyệt không. Cuối cùng viết danh sách 5 điều máy không được tự hứa. Khoảng 20 phút, ghi vào một tệp ghi chú.",
      secondary: "Ngày mai bạn sẽ được hỏi: mẫu nào bạn muốn cho máy tự trả lời, và điều nào bạn để người quyết.",
    },
    sections: [
      {
        type: "lead",
        text: "Tối muộn, điện thoại rung: áo này còn size M không, giá bao nhiêu? Bạn đang ăn cơm, nên khách chờ hai tiếng rồi mua chỗ khác. Bài này dạy cách để máy trả lời phần dễ ngay lập tức mà không bao giờ hứa thay bạn.",
      },
      {
        type: "feynman",
        title: "Trả lời nửa tự động đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới một quầy bán hàng có bảng giá dán tường và một nhân viên mới vào làm.",
        columns: ["Việc", "Quầy hàng có nhân viên mới", "Trả lời nửa tự động"],
        rows: [
          ["Đọc giá", "Nhân viên mới đọc giá trên bảng dán tường", "Máy điền giá từ bảng tính vào mẫu"],
          ["Xem còn hàng", "Nhìn kệ, hoặc đọc sổ tồn cập nhật lúc sáng", "Máy đọc số tồn và ghi kèm mốc cập nhật"],
          ["Câu lạ", "Có thể giảm không? - nhân viên mới hỏi chủ", "Câu ngoài mẫu chuyển cho người"],
          ["Lời hứa", "Chỉ chủ mới được nói giảm, giữ hàng, đổi trả", "Máy không tự hứa; người duyệt mọi cam kết"],
        ],
        oneLiner: "Máy là nhân viên mới có bảng giá: đọc đúng những gì dán trên tường, còn lời hứa thì hỏi chủ.",
      },
      { type: "heading", text: "Ba tầng của một tin trả lời" },
      {
        type: "paragraph",
        text: "Tầng một là dữ kiện: giá, số tồn, size, màu, lấy nguyên từ bảng tính. Tầng hai là mẫu: lời chào, câu chốt, cách đặt hàng, viết một lần rồi dùng lại. Tầng ba là cam kết: ngày giao, giảm giá, đổi trả, hoàn tiền, giữ hàng, và mọi câu lạ. Máy được phép tự làm tầng một và hai; tầng ba luôn qua người. Nếu dùng AI để soạn nháp, nó chỉ soạn trong khuôn mẫu, và mọi con số vẫn lấy từ bảng tính chứ không từ trí nhớ của AI.",
      },
      {
        type: "flow",
        title: "Một tin hỏi giá đi qua đâu",
        steps: [
          { label: "Tin nhắn của khách tới", detail: "Công cụ tự động hoá nhận tin và tìm tên sản phẩm cùng loại câu hỏi: hỏi giá, hỏi tồn, hay câu khác." },
          { label: "Tra bảng tính", detail: "Với câu hỏi giá và tồn, máy đọc đúng dòng sản phẩm trong bảng tính, lấy giá, số tồn và ngày cập nhật gần nhất." },
          { label: "Điền vào mẫu", detail: "Mẫu ghi: giá là..., theo cập nhật lúc ... còn ... cái, mời chị chốt để shop xác nhận. Không có câu hứa nào trong mẫu." },
          { label: "Câu ngoài mẫu đi sang người", detail: "Tin có chữ giảm, đổi, giao gấp, hoá đơn hay câu máy không hiểu được gửi sang người duyệt, khách nhận tin shop sẽ trả lời trong giờ làm việc." },
          { label: "Người duyệt, sửa mẫu", detail: "Người trả lời tin. Nếu câu hỏi xuất hiện lại nhiều lần thì thêm vào mẫu, hoặc ghi vào danh sách chỉ người trả lời." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp AI viết cho khách hỏi áo",
        task: "Bảng tính của shop chỉ ghi: áo sơ mi linen, giá 249.000đ, size M còn 4 cái (cập nhật sáng nay). Không có thông tin gì về ngày giao, giảm giá hay đổi trả. Bấm vào các đoạn AI đã bịa rồi nộp.",
        segments: [
          { text: "Chào chị, áo sơ mi linen giá 249.000đ ạ." },
          { text: "Size M hiện còn 4 cái theo cập nhật sáng nay." },
          { text: "Shop giao trong 2 giờ với mọi đơn nội thành.", error: "Bảng tính không có thông tin giao hàng. Thời gian giao là cam kết của shop, AI tự bịa ra." },
          { text: "Chị đặt hôm nay được giảm thêm 10% nhé.", error: "Không có ưu đãi nào trong bảng. Đây là lời hứa giảm giá do AI tự nghĩ ra, người quản lý chưa hề duyệt." },
          { text: "Shop đổi trả miễn phí trong 90 ngày.", error: "Chính sách đổi trả không có trong dữ liệu. Bịa chính sách là lỗi nặng vì khách sẽ đòi shop giữ đúng lời." },
          { text: "Chị nhắn shop để chốt đơn, shop xác nhận lại ngay ạ." },
        ],
      },
      { type: "heading", text: "Cái gì luôn qua người" },
      {
        type: "list",
        items: [
          "Mọi lời hứa: ngày giao, giữ hàng, giảm giá, tặng quà, hoàn tiền, đổi trả.",
          "Câu về hoá đơn, thuế, hợp đồng: chuyển cho kế toán hoặc người phụ trách pháp lý.",
          "Khách đang bực hoặc khiếu nại: người trả lời, không dùng mẫu.",
          "Bất kỳ câu nào máy không chắc mình hiểu: tự nhận không biết còn hơn đoán.",
        ],
      },
      {
        type: "scenario",
        title: "Khách hỏi lúc nửa đêm",
        start: "start",
        nodes: {
          start: {
            text: "22 giờ, khách hỏi: áo linen size M còn không, giá sao, mai giao được không? Bảng tính có giá và tồn, nhưng không có gì về giao hàng ngày mai. Bạn cài quy tắc nào cho câu trả lời tự động?",
            choices: [
              { label: "Trả lời giá và tồn từ bảng, còn câu giao ngày mai thì hẹn người trả lời", next: "split" },
              { label: "Để AI trả lời hết, kể cả giao ngày mai, cho khách khỏi chờ", next: "invent" },
            ],
          },
          invent: {
            text: "AI trả lời giao ngày mai chắc chắn. Kho hôm sau không kịp đóng hàng, khách phàn nàn và đòi bồi thường vì đã hứa. Bạn phải xin lỗi và chịu phí ship nhanh.",
            ending: "bad",
          },
          split: {
            text: "Khách nhận tức thì giá, số tồn theo cập nhật sáng nay, và câu shop sẽ báo thời gian giao trong giờ làm việc. Sáng hôm sau bạn xem tin, kiểm tra kho và trả lời cụ thể. Bạn có thêm việc cập nhật mẫu?",
            choices: [
              { label: "Không cần, chuyện này chắc chỉ gặp một lần", next: "lost" },
              { label: "Thêm mẫu giao hàng đã được duyệt cho lần sau, ghi rõ điều kiện", next: "learn" },
            ],
          },
          lost: {
            text: "Tuần sau ba khách khác hỏi cùng câu. Tin nào cũng phải chờ bạn, hai khách mua chỗ khác trong lúc chờ.",
            ending: "bad",
          },
          learn: {
            text: "Mẫu giao hàng do bạn duyệt được máy điền vào lần sau, các câu đơn giản có trả lời ngay, các ca đặc biệt vẫn chuyển cho người. Đơn về đều hơn và không ai bị hứa bừa.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Cẩn thận: bảng tính cũ là nói dối chậm",
        text: "Nếu số tồn trong bảng không được cập nhật, tin trả lời tự động đúng công thức mà sai sự thật. Luôn ghi mốc cập nhật vào tin, và đừng để máy dùng chữ chắc chắn kiểu chắc chắn còn hàng.",
      },
      {
        type: "closing",
        lines: [
          "Máy đọc bảng, người giữ lời hứa - hai vai rõ ràng thì khách nhận được câu trả lời nhanh mà vẫn đáng tin.",
          "Bài sau: chính cái bảng tồn kho ấy - làm sao để nó tự báo khi sắp hết hàng.",
        ],
      },
    ],
  },

  // ── Bài 9 ────────────────────────────────────────────────────────────────
  {
    id: 1838,
    slug: "theo-doi-ton-kho-bang-tinh-canh-bao-sap-het-hang",
    title: "Chặng 27, Bài 9: Theo dõi tồn kho trong bảng tính và cảnh báo sắp hết hàng - ngưỡng đặt lại",
    subtitle: "Một cột cảnh báo đặt đúng ngưỡng còn đáng tin hơn trí nhớ của người bận rộn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hết hàng đúng lúc bán chạy là mất đơn; đặt hàng quá sớm thì ứ vốn. Chủ shop nhỏ thường quyết theo cảm giác. Một bảng tính có ngưỡng đặt lại và tự báo cho bạn biết khi tồn chạm ngưỡng làm phần việc nhớ hộ, để bạn dành trí tuệ cho việc đặt bao nhiêu, đặt của ai.",
    openingQuestion:
      "Anh Tuấn bán ốp lưng điện thoại. Loại A bán khoảng 6 cái mỗi ngày, nhà cung cấp giao sau 5 ngày kể từ lúc đặt. Anh nên đặt thêm hàng vào lúc nào?",
    openingOptions: [
      "Khi tồn còn khoảng 30 cái, cộng thêm ít dự phòng",
      "Khi tồn về đúng 0, vì lúc đó mới chắc chắn là cần thêm hàng",
      "Khi tồn còn 6 cái, tức đúng lượng bán trong một ngày (bỏ qua 5 ngày chờ giao)",
      "Khi tồn còn 5 cái, ứng với 5 ngày giao (nhầm số ngày với số cái)",
    ],
    correctOption: 0,
    explanation:
      "Trong 5 ngày chờ hàng về, shop vẫn bán mỗi ngày 6 cái, tức 6 × 5 = 30 cái. Nếu chờ tới lúc còn đúng 30 mới đặt thì hàng về vừa lúc kho cạn, nên cần cộng thêm một ít dự phòng cho lúc bán nhanh hơn hoặc nhà cung cấp giao trễ. Đặt khi về 0 nghĩa là hết hàng suốt 5 ngày; còn 6 hoặc 5 cái là nhầm đơn vị: ngưỡng tính bằng số cái bán trong thời gian chờ, không phải một ngày hay số ngày.",
    diagram: [
      { label: "Bán mỗi ngày × số ngày chờ hàng", arrow: true },
      { label: "Cộng dự phòng = ngưỡng đặt lại", arrow: true },
      { label: "Tồn thực tế trong bảng tính", arrow: true },
      { label: "Tồn chạm ngưỡng: bảng báo, người quyết đặt bao nhiêu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một shop phụ kiện điện thoại nhớ tồn kho bằng đầu óc. Một tuần cao điểm, ốp lưng loại bán chạy nhất hết hàng ba ngày, khách quay sang mua ở shop khác. Sau đó chủ shop lập bảng: mỗi mặt hàng có cột số bán trung bình mỗi ngày, số ngày chờ hàng, dự phòng, và một cột báo ĐẶT HÀNG khi tồn chạm ngưỡng. Bảng không quyết định thay chủ shop, nhưng không còn mặt hàng nào cạn mà không ai hay.",
    },
    quiz: [
      {
        question: "Ngưỡng đặt lại hàng được tính thế nào?",
        options: [
          "Bán mỗi ngày nhân số ngày chờ hàng về, cộng dự phòng",
          "Bán mỗi ngày cộng số ngày chờ hàng về, cộng dự phòng (cộng thay vì nhân)",
          "Tổng bán tháng trước chia hai, bỏ qua số ngày chờ",
          "Số tồn lúc mới nhập hàng chia cho ba, để lúc nào cũng còn một phần ba",
        ],
        correct: 0,
        explanation:
          "Mỗi ngày chờ hàng shop lại bán thêm một lượng, nên phải nhân số bán mỗi ngày với số ngày chờ. Cộng thay vì nhân mô tả sai hoàn toàn quan hệ. Bán cả tháng chia hai bỏ qua thời gian giao, còn chia ba tồn đầu kỳ không liên quan tốc độ bán.",
      },
      {
        question: "Bán 8 cái mỗi ngày, giao sau 4 ngày, dự phòng 10 cái. Ngưỡng đặt lại là bao nhiêu?",
        options: [
          "42 cái",
          "22 cái (= 8 + 4 + 10, cộng thay vì nhân số ngày chờ)",
          "32 cái (= 8 × 4, quên cộng phần dự phòng)",
          "112 cái (= 8 × (4 + 10), nhân cả dự phòng như số ngày)",
        ],
        correct: 0,
        explanation:
          "Đúng công thức là 8 × 4 + 10 = 42 cái: 32 cái sẽ bán trong lúc chờ hàng, cộng 10 cái dự phòng. 22 là cộng thay vì nhân; 32 quên dự phòng; 112 nhân dự phòng như thể nó cũng là số ngày.",
      },
      {
        question: "Vì sao phải có phần dự phòng trong ngưỡng đặt lại?",
        options: [
          "Bán nhanh hơn dự kiến hoặc giao trễ đều có thể làm hết hàng",
          "Để bảng tính không báo lỗi khi số tồn không chẵn",
          "Để luôn đặt số hàng chẵn, dễ nhớ và dễ thanh toán",
          "Vì nhà cung cấp thường tính thêm phí nếu đặt đúng bằng số cần",
        ],
        correct: 0,
        explanation:
          "Số bán mỗi ngày chỉ là trung bình; một ngày khuyến mãi hoặc một chuyến giao trễ đều rút ngắn thời gian còn hàng. Dự phòng là tấm đệm cho hai bất trắc đó. Nó không liên quan tới lỗi bảng tính, số chẵn hay phí nhà cung cấp.",
      },
      {
        question: "Số tồn trong bảng lệch với số hàng đếm thật trên kệ. Xử lý thế nào?",
        options: [
          "Kiểm đếm kệ định kỳ và sửa bảng kèm ghi lý do lệch",
          "Tin bảng vì có công thức nên chắc không sai",
          "Chỉ kiểm khi khách khiếu nại hết hàng, vì kiểm thường xuyên tốn công",
          "Xoá dòng bị lệch để cột cảnh báo khỏi hiện số sai gây rối",
        ],
        correct: 0,
        explanation:
          "Công thức chỉ tính đúng nếu số nhập vào đúng; hàng trả, hỏng, thất thoát đều làm lệch. Kiểm đếm định kỳ và ghi lý do cho biết lỗi từ đâu. Đợi khách khiếu nại là quá muộn, còn xoá dòng lệch chỉ giấu vấn đề khỏi cột cảnh báo.",
      },
      {
        question: "Cảnh báo sắp hết hàng nên gửi cho chủ shop như thế nào?",
        options: [
          "Một tin cho mỗi mặt hàng khi vừa chạm ngưỡng, không gửi lại khi đã báo",
          "Mỗi sáng gửi toàn bộ danh sách 200 mặt hàng kèm số tồn hiện tại",
          "Một tin mỗi lần có đơn bán làm số tồn giảm đi, để luôn cập nhật",
          "Chỉ gửi khi tồn về đúng 0, vì lúc đó mới thực sự cần đặt hàng",
        ],
        correct: 0,
        explanation:
          "Chỉ những mặt hàng chạm ngưỡng mới cần chú ý, và báo một lần là đủ để người ta hành động. Danh sách 200 dòng mỗi sáng chìm mất cảnh báo thật; tin mỗi đơn bán thành tiếng ồn; báo khi về 0 thì đã quá muộn để hàng kịp về.",
      },
    ],
    keyTakeaways: [
      "Ngưỡng đặt lại = bán mỗi ngày × số ngày chờ hàng + dự phòng.",
      "Đặt khi tồn về 0 nghĩa là hết hàng suốt thời gian chờ nhà cung cấp giao.",
      "Số bán trung bình mỗi ngày cần cập nhật theo tháng; hàng theo mùa đổi ngưỡng theo mùa.",
      "Bảng tính chỉ đúng khi số nhập đúng: kiểm đếm kệ định kỳ và ghi lý do lệch.",
      "Cảnh báo một lần cho mỗi mặt hàng chạm ngưỡng; người quyết đặt bao nhiêu.",
    ],
    practicePrompt: {
      question:
        "Loại B bán 5 cái mỗi ngày, giao sau 7 ngày, dự phòng 15 cái, tồn hiện tại 48. Bảng nên hiện gì?",
      options: [
        "Ngưỡng 50 (= 5 × 7 + 15); tồn 48 thấp hơn ngưỡng nên báo đặt hàng",
        "Ngưỡng 27 (= 5 + 7 + 15, cộng thay vì nhân); tồn 48 còn xa ngưỡng nên chưa cần đặt",
        "Ngưỡng 35 (= 5 × 7, bỏ dự phòng); tồn 48 cao hơn ngưỡng nên chưa cần đặt",
        "Ngưỡng 105 (= 5 × (7 + 15), nhân cả dự phòng); tồn 48 báo đặt gấp và đặt số rất lớn",
      ],
      correct: 0,
      explanation:
        "Đúng: 5 × 7 + 15 = 50, tồn 48 đã dưới ngưỡng nên phải đặt. Các cách khác đều sai công thức và cho kết quả chưa cần đặt hoặc đặt quá tay. Người vẫn quyết định số lượng đặt dựa trên khoảng cách tới lần đặt tiếp theo.",
    },
    summary: {
      keyIdea: "Ngưỡng đặt lại biến trí nhớ thành một con số mà bảng tính có thể canh hộ bạn.",
      formula: "Ngưỡng = bán mỗi ngày × số ngày chờ hàng + dự phòng; tồn chạm ngưỡng thì báo đặt hàng.",
      commonMistake: "Đợi tới khi hết hàng mới đặt, hoặc tin số trong bảng mà không bao giờ đếm lại kệ.",
      action: "Tính ngưỡng đặt lại cho ba mặt hàng bán chạy nhất của bạn.",
    },
    application: {
      title: "Tính ngưỡng cho ba mặt hàng",
      message:
        "Chọn 3 mặt hàng bạn bán chạy nhất. Với mỗi mặt hàng ghi ba số: số bán trung bình mỗi ngày (xem đơn 2 tuần gần nhất), số ngày nhà cung cấp giao, và dự phòng bạn muốn giữ. Tính ngưỡng, rồi đối chiếu với số tồn hôm nay: mặt hàng nào đã dưới ngưỡng? Khoảng 15 phút trong bảng tính.",
      secondary: "Ngày mai bạn sẽ được hỏi: mặt hàng nào đã chạm ngưỡng, và bạn định đặt bao nhiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Tuần khuyến mãi, mặt hàng bán chạy nhất của bạn hết veo sau hai ngày. Nhà cung cấp hẹn giao sau 5 ngày. Suốt 5 ngày đó khách vào hỏi, bạn chỉ nói hết rồi. Bài này dạy cách để bảng tính nhắc bạn đặt hàng trước khi chuyện ấy xảy ra.",
      },
      {
        type: "feynman",
        title: "Cảnh báo sắp hết hàng đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới bình gas trong bếp nhà bạn: bạn không chờ tới khi bếp tắt giữa lúc nấu mới gọi đại lý.",
        columns: ["Việc", "Bình gas ở nhà", "Tồn kho trong bảng tính"],
        rows: [
          ["Mức dùng", "Nấu mỗi ngày dùng chừng một phần bình", "Bán trung bình mỗi ngày"],
          ["Thời gian chờ", "Đại lý giao sau khoảng 1 ngày", "Nhà cung cấp giao sau vài ngày"],
          ["Lúc gọi", "Gọi khi gas còn đủ nấu tới lúc bình mới về", "Ngưỡng đặt lại = bán mỗi ngày × số ngày chờ"],
          ["Đệm an toàn", "Nhà có khách nên gọi sớm hơn một chút", "Cộng thêm dự phòng cho ngày bán nhanh"],
        ],
        oneLiner: "Ngưỡng đặt lại là lúc gọi đại lý: còn đủ dùng cho tới khi hàng mới về, cộng một ít cho chắc.",
      },
      { type: "heading", text: "Bảng tính có gì mà tự cảnh báo được" },
      {
        type: "paragraph",
        text: "Mỗi hàng là một mặt hàng. Các cột: tên, tồn hiện tại, số bán trung bình mỗi ngày, số ngày nhà cung cấp giao, dự phòng, ngưỡng đặt lại (cột tính), và một cột trạng thái cho biết tồn đã chạm ngưỡng chưa. Công cụ tự động hoá hoặc chính bảng tính có thể gửi bạn một tin khi trạng thái chuyển sang cần đặt. Bạn không cần biết công thức chi tiết của từng công cụ; điều quan trọng là bạn hiểu ngưỡng nghĩa là gì và biết kiểm nó.",
      },
      {
        type: "chart",
        title: "Tồn giảm dần và ngưỡng đặt lại",
        caption:
          "Số liệu minh hoạ, không phải thống kê thật. Kéo thanh trượt cho khớp mặt hàng của bạn: đường xanh là tồn còn lại theo ngày nếu không đặt thêm, đường ngang là ngưỡng đặt lại. Ngày nào đường tồn cắt xuống dưới đường ngưỡng là ngày bạn nên đặt hàng.",
        kind: "line",
        xLabel: "Số ngày kể từ hôm nay",
        yLabel: "Số cái",
        x: { from: 0, to: 30, step: 1 },
        params: [
          { id: "ton", label: "Tồn hiện tại", min: 0, max: 300, step: 5, value: 120, unit: "cái" },
          { id: "ban", label: "Bán mỗi ngày", min: 1, max: 20, step: 1, value: 6, unit: "cái" },
          { id: "giao", label: "Ngày chờ hàng về", min: 1, max: 14, step: 1, value: 5, unit: "ngày" },
          { id: "duphong", label: "Dự phòng", min: 0, max: 60, step: 5, value: 10, unit: "cái" },
        ],
        series: [
          { label: "Tồn còn lại (nếu không đặt thêm)", expr: "max(ton - ban * x, 0)" },
          { label: "Ngưỡng đặt lại", expr: "ban * giao + duphong" },
        ],
      },
      {
        type: "flow",
        title: "Từ đơn bán tới cảnh báo",
        steps: [
          { label: "Có đơn bán", detail: "Mỗi đơn hoàn tất làm cột tồn của mặt hàng giảm đi đúng số lượng đã bán. Nếu bảng nhập tay thì đây là bước dễ sai nhất." },
          { label: "Tính lại ngưỡng", detail: "Cột ngưỡng tính từ số bán trung bình, số ngày chờ hàng và dự phòng. Cập nhật số bán trung bình mỗi tháng." },
          { label: "So tồn với ngưỡng", detail: "Cột trạng thái chuyển sang cần đặt khi tồn nhỏ hơn hoặc bằng ngưỡng, và về bình thường khi hàng mới về." },
          { label: "Gửi một tin cảnh báo", detail: "Công cụ tự động hoá gửi chủ shop một tin cho mặt hàng vừa chạm ngưỡng, ghi tên, số tồn và ngưỡng. Không gửi lại mỗi ngày." },
          { label: "Người quyết đặt bao nhiêu", detail: "Số lượng đặt phụ thuộc mùa, tiền vốn và khuyến mãi sắp tới - việc của người, không phải của bảng." },
        ],
      },
      {
        type: "scenario",
        title: "Cột cảnh báo chuyển sang đỏ",
        start: "start",
        nodes: {
          start: {
            text: "Sáng nay, cột cảnh báo của ốp lưng loại A chuyển sang đỏ: tồn 28 cái, ngưỡng 30. Bạn đang định đặt hàng.",
            choices: [
              { label: "Đặt ngay số lượng giống lần trước vì bảng đã báo", next: "blind" },
              { label: "Đếm nhanh số ốp lưng thật trên kệ rồi mới đặt", next: "count" },
              { label: "Đợi tới khi tồn về 10 cho chắc rồi mới đặt", next: "late" },
            ],
          },
          blind: {
            text: "Lần trước bạn đặt số lớn vì đang khuyến mãi. Lần này không có khuyến mãi nên hàng về dư hơn 100 cái, vốn nằm im trên kệ nhiều tuần.",
            ending: "bad",
          },
          late: {
            text: "Hàng về sau 5 ngày, nhưng tồn đã cạn từ ngày thứ ba. Bạn hết hàng hai ngày đúng lúc khách hỏi nhiều nhất.",
            ending: "bad",
          },
          count: {
            text: "Trên kệ thật chỉ còn 22 cái: bảng lệch 6 vì hàng khách trả về chưa được cộng lại vào tồn. Bạn xử lý thế nào?",
            choices: [
              { label: "Giữ số trong bảng, 6 cái là nhỏ, không cần sửa", next: "ignore" },
              { label: "Sửa tồn thành 22, ghi lý do lệch, và thêm bước cộng tồn khi nhận hàng trả", next: "fix" },
            ],
          },
          ignore: {
            text: "Tuần sau cột cảnh báo vẫn nghĩ tồn nhiều hơn thật, báo muộn 6 cái, và lỗi lặp lại mỗi lần có hàng trả.",
            ending: "bad",
          },
          fix: {
            text: "Bạn đặt hàng với số lượng hợp lý theo mùa, bảng khớp với kệ, và từ nay hàng trả cũng được ghi vào tồn. Cột cảnh báo đáng tin hơn từng tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Bảng chỉ đúng khi số bạn nhập đúng",
        text: "Cột cảnh báo là công thức, nó không biết hàng nào bị trả, hỏng hay mất. Mỗi tháng đếm thật một vài mặt hàng, so với bảng, và ghi lại lý do khi lệch. Một bảng lệch vẫn báo rất tự tin.",
      },
      {
        type: "closing",
        lines: [
          "Ngưỡng là một con số tính được, bảng canh giúp bạn, còn quyết định đặt bao nhiêu vẫn là của người.",
          "Bài cuối: báo cáo doanh thu cuối ngày tự gửi - và cách kiểm để nó không im lặng sai.",
        ],
      },
    ],
  },

  // ── Bài 10 ───────────────────────────────────────────────────────────────
  {
    id: 1839,
    slug: "bao-cao-doanh-thu-cuoi-ngay-tu-gui-va-cach-kiem",
    title: "Chặng 27, Bài 10: Báo cáo doanh thu cuối ngày tự gửi - và cách kiểm để báo cáo không im lặng sai",
    subtitle: "Một báo cáo không báo lỗi vẫn có thể sai; vài dòng kiểm cuối báo cáo giúp bạn biết khi nào.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bài trước về workflow hỏng dạy cách phát hiện khi workflow ngừng chạy. Báo cáo tự gửi có một dạng lỗi khó hơn: nó vẫn chạy đúng giờ, vẫn gửi con số nhìn rất hợp lý, nhưng con số thiếu đơn cuối ngày, đếm trùng hoặc lẫn ngày. Chủ shop tin số đó để nhập hàng và chạy quảng cáo, nên bài này dạy cách cài vài chốt để báo cáo tự cho bạn biết mình đáng tin đến đâu.",
    openingQuestion:
      "Báo cáo doanh thu tự gửi mỗi 18 giờ. Hôm nay báo cáo ghi 4,2 triệu, thấp lạ dù shop bận cả chiều. Cách kiểm nhanh nhất là gì?",
    openingOptions: [
      "Đối chiếu số đơn và tổng tiền với danh sách đơn gốc trong ngày",
      "Tin báo cáo vì tự động nên không thể sai, chắc chỉ ế khách",
      "Tắt báo cáo tự động và quay lại làm tay mãi, vì không thể tin được nữa",
      "Chờ tới cuối tuần xem tổng tuần có bù lại số hôm nay không rồi mới xét",
    ],
    correctOption: 0,
    explanation:
      "Cách nhanh nhất là đếm lại từ nguồn gốc: danh sách đơn của ngày hôm nay có bao nhiêu đơn, tổng bao nhiêu, và so với con số trên báo cáo. Nếu khớp thì hôm nay thật sự ế; nếu lệch, bạn thấy ngay lệch ở đâu, thường là đơn tới sau giờ chạy hoặc bị đếm nhầm ngày. Coi báo cáo là không thể sai sẽ bỏ lỡ lỗi; tắt hẳn là bỏ đi công cụ tốt chỉ vì một lỗi; chờ cuối tuần là để lỗi lan sang cả tuần.",
    diagram: [
      { label: "Lấy đơn của ngày từ nguồn gốc", arrow: true },
      { label: "Cộng và tính báo cáo", arrow: true },
      { label: "Gắn dòng kiểm: số đơn, mốc giờ, đối chiếu", arrow: true },
      { label: "Gửi chủ shop; mỗi tuần đếm tay một ngày" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một shop cài báo cáo doanh thu chạy lúc 18 giờ. Vài tuần liền con số hôm nào cũng thấp hơn cảm giác của chủ shop chút ít. Khi đối chiếu một ngày với danh sách đơn gốc, chủ shop phát hiện những đơn đặt từ 17 giờ 40 trở đi chưa kịp đồng bộ khi báo cáo chạy nên chưa được tính. Lỗi không bao giờ hiện ra vì báo cáo chưa bao giờ báo thất bại. Sau đó báo cáo dời giờ chạy và ghi dòng số liệu tính đến mấy giờ.",
    },
    quiz: [
      {
        question: "Dòng kiểm cuối báo cáo nên có gì?",
        options: [
          "Số đơn, mốc giờ cắt dữ liệu và tổng đối chiếu với nguồn gốc",
          "Chỉ tổng doanh thu in đậm thật lớn để chủ shop nhìn thấy ngay số đó",
          "Tên người dựng báo cáo và ngày dựng, để biết cần hỏi ai khi có lỗi",
          "Lời chúc cuối ngày vui vẻ để báo cáo có giọng thân thiện",
        ],
        correct: 0,
        explanation:
          "Số đơn, mốc giờ và tổng đối chiếu cho chủ shop biết báo cáo tính từ đâu và đủ chưa; ba thứ đó tự phát hiện được nhiều lỗi. Chỉ một con số lớn là dễ tin mà khó kiểm; tên người dựng có ích nhưng không cho biết số đúng hay sai; lời chúc chỉ trang trí.",
      },
      {
        question: "Báo cáo chạy 18 giờ nhưng đơn 17 giờ 58 chưa đồng bộ vào bảng. Cách xử lý đúng?",
        options: [
          "Ghi rõ dữ liệu tính tới lúc nào, hoặc dời giờ chạy sau giờ chốt",
          "Yêu cầu khách đặt trước 17 giờ để đơn kịp lịch báo cáo",
          "Cộng tay những đơn thiếu vào báo cáo mỗi tối",
          "Chạy báo cáo mỗi 5 phút để chắc chắn sớm muộn cũng đủ đơn",
        ],
        correct: 0,
        explanation:
          "Mốc giờ cắt dữ liệu hoặc dời giờ chạy giải đúng nguyên nhân: báo cáo chạy trước khi dữ liệu về đủ. Ép khách đổi giờ mua là đổi kinh doanh vì công cụ; cộng tay hằng tối là làm lại việc đã tự động; chạy mỗi 5 phút gửi hàng chục báo cáo trùng và vẫn không nói được số nào là chốt.",
      },
      {
        question: "AI viết thêm nhờ chiến dịch quảng cáo hôm qua, doanh thu hôm nay tăng 35%. Vì sao không nên tin câu này?",
        options: [
          "Dữ liệu chỉ có con số, không có nguyên nhân; đó là suy đoán",
          "Quảng cáo luôn là nguyên nhân chính nên câu đó thừa",
          "AI chỉ hay sai khi phần trăm tăng lớn hơn 50%, còn 35% thì đáng tin",
          "Câu đó chỉ đáng tin nếu AI viết bằng giọng chắc chắn và có con số kèm theo",
        ],
        correct: 0,
        explanation:
          "Con số 35% tính được từ dữ liệu, nhưng nguyên nhân thì dữ liệu không nói. AI thấy hai sự việc gần nhau nên nối chúng lại. Không phải mọi tăng là do quảng cáo, mức phần trăm không quyết định độ tin cậy, và giọng chắc chắn không chứng minh gì.",
      },
      {
        question: "Cách nào kiểm báo cáo tự động bền nhất?",
        options: [
          "Mỗi tuần chọn một ngày, đếm tay số đơn và tổng, so với báo cáo",
          "Chỉ kiểm khi số liệu trông lạ, vì lúc thường báo cáo là đúng",
          "Kiểm mỗi ngày toàn bộ đơn bằng tay để chắc chắn, như hồi chưa tự động",
          "So báo cáo hôm nay với hôm qua; hai số gần nhau là chắc đúng",
        ],
        correct: 0,
        explanation:
          "Chọn ngẫu nhiên một ngày mỗi tuần vừa nhẹ vừa bắt được lỗi hệ thống. Chỉ kiểm khi lạ bỏ sót lỗi làm số thấp đều đặn nhìn rất bình thường. Kiểm hằng ngày bằng tay là bỏ công tự động hoá. Hai ngày gần nhau có thể cùng thiếu đơn cuối ngày.",
      },
      {
        question: "Đơn huỷ và đơn hoàn tiền cần xử lý thế nào trong báo cáo doanh thu?",
        options: [
          "Chọn một quy tắc cho cả hai và ghi vào báo cáo",
          "Cứ tính hết vào doanh thu, chủ shop sẽ tự nhớ mà trừ ra sau",
          "Loại bỏ mọi đơn có bất kỳ ghi chú nào, vì ghi chú nghĩa là có vấn đề",
          "Để công cụ tự quyết vì nó luôn có mặc định hợp lý cho mọi loại shop",
        ],
        correct: 0,
        explanation:
          "Quy tắc rõ và ghi trong báo cáo giúp mọi người đọc cùng một nghĩa. Tính hết rồi nhờ chủ shop nhớ trừ sẽ sai khi có nhiều đơn huỷ. Loại mọi đơn có ghi chú xoá cả đơn bình thường. Mặc định của công cụ có thể không khớp sổ sách. Nếu số dùng cho sổ sách hoặc thuế, hỏi kế toán trưởng trước khi chốt quy tắc.",
      },
    ],
    keyTakeaways: [
      "Báo cáo tự gửi có thể sai mà không báo lỗi: thiếu đơn cuối ngày, trùng đơn, lẫn ngày.",
      "Gắn dòng kiểm cuối báo cáo: số đơn, mốc giờ cắt dữ liệu, tổng đối chiếu nguồn gốc.",
      "Mỗi tuần chọn một ngày, đếm tay số đơn và tổng để so với báo cáo.",
      "AI chỉ tóm tắt số có trong dữ liệu; nguyên nhân là phần người phải kiểm.",
      "Quy tắc đơn huỷ, hoàn tiền cần một câu ghi rõ; số cho sổ sách hỏi kế toán trưởng.",
    ],
    practicePrompt: {
      question:
        "Báo cáo hôm nay ghi 46 đơn, 18,4 triệu. Danh sách gốc có 49 đơn. Bước hợp lý nhất tiếp theo là gì?",
      options: [
        "Tìm 3 đơn lệch trong danh sách gốc và xem chúng đến trước hay sau giờ báo cáo chạy",
        "Bỏ qua, 3 đơn chỉ chiếm chưa tới 7% nên không đáng để công tìm hiểu",
        "Cộng tay 3 đơn vào tổng rồi gửi cho chủ shop mà không cần điều tra thêm",
        "Chạy lại báo cáo cho tới khi ra đúng 49 đơn mà không cần hiểu lý do",
      ],
      correct: 0,
      explanation:
        "Tìm đúng 3 đơn lệch cho thấy nguyên nhân: đến sau giờ chạy, trùng, hoặc lẫn ngày; từ đó sửa gốc. Bỏ qua để lỗi lặp mỗi ngày; cộng tay che vấn đề; chạy lại nhiều lần không hiểu lý do thì lần sau lỗi vẫn còn.",
    },
    summary: {
      keyIdea: "Báo cáo tự gửi đáng tin khi nó tự nói mình tính từ đâu và được đối chiếu với nguồn gốc.",
      formula: "Số đơn + mốc giờ + tổng đối chiếu = dòng kiểm; cộng một lần đếm tay mỗi tuần.",
      commonMistake: "Tin báo cáo chỉ vì nó chạy đúng giờ và ra con số nhìn hợp lý.",
      action: "Chọn một ngày gần đây, đếm tay số đơn và tổng rồi so với báo cáo.",
    },
    application: {
      title: "Đếm tay một ngày và so với báo cáo",
      message:
        "Chọn một ngày gần đây và lấy danh sách đơn gốc của ngày đó. Đếm số đơn, cộng tổng tiền, rồi so với báo cáo doanh thu của cùng ngày. Nếu lệch, ghi rõ lệch bao nhiêu đơn và bạn nghĩ nguyên nhân là gì (giờ cắt, trùng, huỷ). Nếu khớp, ghi lại để biết báo cáo đáng tin ở mức nào. Khoảng 15 phút.",
      secondary: "Ngày mai bạn sẽ được hỏi: báo cáo của bạn khớp hay lệch, và bạn định thêm dòng kiểm nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáu giờ chiều, báo cáo doanh thu tự đến hộp thư. Nó luôn đúng giờ, luôn có con số, chưa bao giờ báo lỗi. Bạn dùng con số đó để quyết định nhập hàng ngày mai. Bài này hỏi một câu khó chịu: con số đó đúng không, và bạn biết bằng cách nào?",
      },
      {
        type: "feynman",
        title: "Kiểm báo cáo đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới thu ngân chốt ca ở quầy: máy in ra tổng, nhưng thu ngân vẫn đếm tiền trong két.",
        columns: ["Việc", "Thu ngân chốt ca", "Báo cáo tự gửi"],
        rows: [
          ["Số máy in ra", "Máy tính tổng doanh thu ca", "Báo cáo tính tổng doanh thu ngày"],
          ["Đếm thật", "Đếm tiền trong két so với tổng trên máy", "Đếm số đơn và tổng trong danh sách gốc"],
          ["Ghi mốc", "Ca từ 14 giờ đến 22 giờ", "Dữ liệu tính đến 18 giờ"],
          ["Lệch thì hỏi", "Lệch mười nghìn cũng tìm ra vì sao", "Lệch ba đơn cũng tìm ra ba đơn nào"],
        ],
        oneLiner: "Máy in tổng, người vẫn đếm két một lần: báo cáo tự động cũng cần một lần đối chiếu.",
      },
      { type: "heading", text: "Ba kiểu sai thầm lặng" },
      {
        type: "paragraph",
        text: "Báo cáo vẫn chạy nhưng sai theo ba cách hay gặp. Thứ nhất, chạy trước khi dữ liệu về đủ: đơn cuối ngày chưa kịp vào bảng. Thứ hai, đếm sai: một đơn bị ghi hai lần hoặc lẫn sang ngày khác do lệch giờ. Thứ ba, quy tắc mơ hồ: đơn huỷ, hoàn tiền, hay đơn giảm giá có tính hay không mà không ai ghi lại. Cả ba đều cho ra con số nhìn rất bình thường. Điểm khác so với bài về workflow hỏng: lỗi ở đây không làm workflow dừng, nên không có thông báo lỗi nào để bật sẵn.",
      },
      {
        type: "flow",
        title: "Một báo cáo có dòng kiểm đi qua các bước nào",
        steps: [
          { label: "Lấy đơn của ngày", detail: "Công cụ đọc danh sách đơn từ nguồn gốc, lọc đúng ngày theo giờ Việt Nam, và ghi lại giờ đơn cuối cùng đã nhận được." },
          { label: "Cộng theo quy tắc", detail: "Tính tổng theo quy tắc đã ghi: đơn huỷ loại ra, đơn hoàn tiền trừ đi. Quy tắc này cũng nằm trong báo cáo." },
          { label: "Tính dòng kiểm", detail: "Đếm số đơn, ghi mốc giờ cắt dữ liệu, và tính lại tổng bằng một cách khác (ví dụ từ tệp thanh toán) để so sánh." },
          { label: "Gửi báo cáo kèm dòng kiểm", detail: "Chủ shop nhận con số cùng dòng: 46 đơn, dữ liệu tới 18:00, tổng đối chiếu khớp hoặc lệch bao nhiêu." },
          { label: "Đếm tay mỗi tuần một ngày", detail: "Mỗi tuần chọn một ngày ngẫu nhiên, đếm tay số đơn và tổng rồi so với báo cáo để bắt lỗi mà dòng kiểm bỏ sót." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản tóm tắt AI viết dưới báo cáo",
        task: "Dữ liệu duy nhất bạn đưa cho AI: hôm nay 46 đơn, tổng 18,4 triệu đồng; hôm qua 13,6 triệu; 2 đơn huỷ. Không có dữ liệu về sản phẩm hay quảng cáo. Bấm vào các đoạn AI đã bịa hoặc suy đoán rồi nộp.",
        segments: [
          { text: "Hôm nay shop có 46 đơn với tổng doanh thu 18,4 triệu đồng." },
          { text: "So với hôm qua (13,6 triệu), doanh thu tăng khoảng 35%." },
          { text: "Có 2 đơn huỷ trong tổng số 46 đơn." },
          { text: "Kem chống nắng là sản phẩm bán chạy nhất, chiếm 60% doanh thu.", error: "Dữ liệu không có thông tin theo sản phẩm. AI tự bịa tên sản phẩm và tỷ lệ 60%." },
          { text: "Mức tăng đến từ chiến dịch quảng cáo triển khai hôm qua.", error: "Dữ liệu không hề nói tới quảng cáo hay nguyên nhân của mức tăng; đây là suy đoán trình bày như sự thật." },
        ],
      },
      { type: "heading", text: "Chốt kiểm tối thiểu" },
      {
        type: "list",
        items: [
          "Dòng kiểm cuối báo cáo: số đơn, mốc giờ cắt dữ liệu, tổng đối chiếu.",
          "Quy tắc đơn huỷ, hoàn tiền và giảm giá ghi thành một câu trong báo cáo.",
          "Mỗi tuần đếm tay một ngày ngẫu nhiên và so với báo cáo.",
          "Nếu số dùng cho sổ sách hoặc thuế, hỏi kế toán trưởng về quy tắc trước khi tin.",
        ],
      },
      {
        type: "scenario",
        title: "Báo cáo báo 46 đơn, danh sách gốc có 49",
        start: "start",
        nodes: {
          start: {
            text: "Bạn đếm tay ngày hôm nay và thấy 49 đơn, nhưng báo cáo ghi 46 đơn. Con số doanh thu nhìn vẫn bình thường.",
            choices: [
              { label: "Bỏ qua, chênh 3 đơn chỉ là chuyện nhỏ", next: "ignore" },
              { label: "Tìm ba đơn bị thiếu và xem chúng khác gì so với các đơn còn lại", next: "find" },
            ],
          },
          ignore: {
            text: "Tuần sau bạn nhập hàng theo báo cáo thấp hơn thực tế vài chục đơn mỗi tuần. Hàng thiếu đúng lúc bán chạy mà không ai biết vì sao.",
            ending: "bad",
          },
          find: {
            text: "Cả ba đơn đến sau 17 giờ 50 nên chưa kịp có trong bảng khi báo cáo chạy lúc 18 giờ. Bạn xử lý thế nào?",
            choices: [
              { label: "Mỗi tối tự cộng tay ba đơn thiếu vào báo cáo", next: "manual" },
              { label: "Dời giờ chạy sau giờ chốt và thêm dòng dữ liệu tính đến mấy giờ", next: "fixed" },
            ],
          },
          manual: {
            text: "Bạn cộng tay được vài hôm rồi quên một hôm; báo cáo lại lệch mà không ai hay. Công cụ làm nửa việc còn bạn làm nửa còn lại, sớm muộn lại có ngày bỏ sót.",
            ending: "bad",
          },
          fixed: {
            text: "Báo cáo chạy sau giờ chốt, ghi rõ 49 đơn, dữ liệu tính đến 18:15, tổng đối chiếu khớp. Chủ shop biết mình đang nhìn số nào, tuần sau đếm tay vẫn khớp.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nhớ: khớp một ngày không chứng minh mọi ngày",
        text: "Một lần đếm tay khớp chỉ cho biết ngày đó đúng. Điều bạn tìm là thói quen đếm, mỗi tuần một ngày khác nhau, để nếu báo cáo bắt đầu lệch thì bạn phát hiện trong vài ngày chứ không phải vài tháng.",
      },
      {
        type: "closing",
        lines: [
          "Báo cáo tự gửi tiện, nhưng người đọc chỉ nên tin khi nó tự nói mình tính từ đâu và đã được đối chiếu.",
          "Bạn vừa đi hết chuỗi việc nhỏ của một shop: nhắc khách, trả lời tin nhắn, canh tồn kho, và kiểm báo cáo.",
        ],
      },
    ],
  },
];
