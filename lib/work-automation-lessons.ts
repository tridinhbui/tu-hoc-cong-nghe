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
];
