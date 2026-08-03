import type { Lesson } from "./lesson-types";

// Chặng "Bút toán và sổ sách" (ids 1721-1725, professional track).
//
// Vì sao chặng này tồn tại: kho có rất nhiều bài dạy ĐỌC báo cáo tài chính và
// không bài nào dạy báo cáo đó được LẬP ra như thế nào. Quét theo từ khoá bút
// toán, sổ cái, nhật ký chung, hạch toán cho ra đúng 0 bài - trong khi "Kế
// toán viên" là một nghề có tên trong bản đồ và đó là toàn bộ công việc hằng
// ngày của họ.
//
// Khoảng trống này còn ảnh hưởng xa hơn nghề kế toán. Người phân tích đọc báo
// cáo mà chưa từng thấy một bút toán nào sẽ không giải thích được vì sao lợi
// nhuận tăng mà tiền không tăng, vì sao một khoản dự phòng làm giảm lợi nhuận
// năm nay và làm đẹp lợi nhuận năm sau. Những câu đó chỉ sáng ra khi nhìn thấy
// hai vế của một định khoản.
//
// Chặng dạy nguyên lý và cách nghĩ, không dạy thao tác trên một phần mềm cụ
// thể: màn hình của Misa hay Fast đổi theo phiên bản, còn quy tắc ghi sổ thì
// không đổi kể từ thế kỷ 15.

export const BOOKKEEPING_LESSONS: Lesson[] = [
  {
    id: 1721,
    slug: "but-toan-ghi-so-kep-hai-ve",
    title: "Sổ sách, Bài 1: Ghi sổ kép - vì sao mọi nghiệp vụ đều có hai vế",
    subtitle: "Nợ và Có thực sự nghĩa là gì, quy tắc tăng giảm của từng loại tài khoản, và vì sao tổng luôn cân",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "professional",
    whyItMatters:
      "Đây là quy tắc duy nhất trong kế toán mà nếu không nắm thì mọi thứ phía sau chỉ là học thuộc. Nắm rồi thì phần lớn nghiệp vụ tự suy ra được, kể cả những nghiệp vụ chưa gặp bao giờ.",
    openingQuestion: "Công ty mua một máy in giá 20 triệu, trả bằng tiền mặt. Ghi sổ thế nào?",
    openingOptions: [
      "Nợ tài sản cố định 20 triệu, Có tiền mặt 20 triệu",
      "Nợ chi phí 20 triệu, Có tiền mặt 20 triệu",
      "Nợ tiền mặt 20 triệu, Có tài sản cố định 20 triệu",
      "Nợ tài sản cố định 20 triệu, Có chi phí quản lý doanh nghiệp 20 triệu",
    ],
    correctOption: 0,
    explanation:
      "Một tài sản tăng, một tài sản khác giảm - tổng tài sản không đổi, công ty chỉ đổi hình thái của cùng một lượng của cải. Đây là chỗ người mới hay nhầm: bỏ tiền ra không đồng nghĩa với phát sinh chi phí. Chi phí là phần của cải thực sự tiêu hao đi; mua máy in chưa tiêu hao gì cả, cái máy vẫn còn đó và sẽ tiêu hao dần qua khấu hao trong nhiều năm. Ghi thẳng vào chi phí sẽ làm lợi nhuận năm nay thấp giả tạo và làm biến mất một tài sản khỏi bảng cân đối. Từ \"Nợ\" và \"Có\" ở đây cũng không mang nghĩa vay mượn - chúng chỉ là tên của hai cột trái và phải, giữ lại từ tiếng Latin qua bảy thế kỷ.",
    diagram: [
      { label: "Một nghiệp vụ phát sinh", arrow: true },
      { label: "Ghi vào ít nhất hai tài khoản", arrow: true },
      { label: "Tổng bên Nợ = tổng bên Có", arrow: true },
      { label: "Nên phương trình kế toán luôn cân sau mỗi bút toán" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Luca Pacioli, Venice, 1494",
      description:
        "Nhà toán học người Ý mô tả hệ thống ghi sổ kép mà thương nhân Venice đã dùng, trong một cuốn sách về số học. Bảy thế kỷ và vô số cuộc cách mạng công nghệ sau, mọi phần mềm kế toán trên thế giới vẫn chạy đúng quy tắc đó - vì nó không phải một quy ước, nó là hệ quả của việc mỗi giao dịch luôn có hai đầu.",
    },
    quiz: [
      {
        question: "Bên Nợ tăng lên với loại tài khoản nào?",
        options: [
          "Tài sản và chi phí",
          "Nợ và vốn chủ",
          "Doanh thu và các khoản thu nhập khác",
          "Mọi tài khoản, vì Nợ luôn là vế ghi tăng theo quy ước",
        ],
        correct: 0,
        explanation:
          "Tài sản và chi phí tăng bên Nợ; nợ phải trả, vốn chủ và doanh thu tăng bên Có. Đây là bảng duy nhất phải thuộc, phần còn lại suy ra được.",
      },
      {
        question: "Vay ngân hàng 500 triệu về tài khoản công ty. Bút toán là gì?",
        options: [
          "Nợ tiền gửi 500, Có vay ngân hàng 500",
          "Nợ vay 500, Có tiền gửi 500",
          "Nợ tiền gửi 500, Có doanh thu tài chính 500",
          "Nợ tiền gửi 500, Có vốn chủ sở hữu 500 do nguồn vốn tăng thêm",
        ],
        correct: 0,
        explanation:
          "Tài sản tăng nên ghi Nợ; nghĩa vụ trả nợ tăng nên ghi Có. Tiền vay không phải doanh thu và cũng không phải vốn chủ - nó phải trả lại.",
      },
      {
        question: "Vì sao mua tài sản không tạo ra chi phí ngay?",
        options: [
          "Vì của cải chưa tiêu hao, mới đổi từ tiền sang tài sản khác",
          "Vì chuẩn mực cho hoãn ghi chi phí",
          "Vì chi phí chỉ được ghi nhận khi doanh nghiệp thanh lý tài sản đó",
          "Vì tài sản cố định được theo dõi riêng ngoài hệ thống sổ kế toán",
        ],
        correct: 0,
        explanation:
          "Chi phí là của cải mất đi. Cái máy vẫn còn nên chưa mất gì; nó tiêu hao dần qua khấu hao, và mỗi kỳ khấu hao mới là một chi phí.",
      },
      {
        question: "Sau mỗi bút toán đúng, điều gì luôn giữ nguyên?",
        options: [
          "Tài sản = Nợ phải trả + Vốn chủ sở hữu",
          "Tổng tài sản của doanh nghiệp",
          "Số dư tiền mặt tại quỹ và tại các tài khoản ngân hàng",
          "Tỷ lệ giữa nợ phải trả và vốn chủ sở hữu trên bảng cân đối",
        ],
        correct: 0,
        explanation:
          "Phương trình luôn cân, đó là ý nghĩa của ghi sổ kép. Tổng tài sản thì có thể đổi - vay tiền làm nó tăng, trả nợ làm nó giảm.",
      },
      {
        question: "Một bút toán ghi Nợ 10 triệu và Có 12 triệu. Điều này nghĩa là gì?",
        options: [
          "Bút toán sai, hai vế bắt buộc bằng nhau",
          "Chênh lệch vào lợi nhuận cuối kỳ",
          "Bút toán hợp lệ nếu phần chênh được ghi chú trong thuyết minh",
          "Bút toán hợp lệ khi nghiệp vụ liên quan tới nhiều hơn hai tài khoản",
        ],
        correct: 0,
        explanation:
          "Một bút toán được ghi vào nhiều tài khoản, nhưng tổng hai bên vẫn phải khớp. Lệch là sai, và phần mềm kế toán sẽ từ chối lưu.",
      },
    ],
    keyTakeaways: [
      "Mỗi nghiệp vụ ghi vào ít nhất hai tài khoản, tổng Nợ luôn bằng tổng Có.",
      "Tài sản và chi phí tăng bên Nợ; nợ phải trả, vốn chủ và doanh thu tăng bên Có.",
      "Chi ra tiền không đồng nghĩa phát sinh chi phí - mua tài sản chỉ là đổi hình thái của cải.",
      "\"Nợ\" và \"Có\" chỉ là tên hai cột, không mang nghĩa vay mượn.",
    ],
    sections: [
      {
        type: "lead",
        text: "Kế toán chỉ có đúng một quy tắc gốc, và mọi thứ khác là hệ quả của nó: mỗi giao dịch có hai đầu, nên phải ghi hai lần.",
      },
      { type: "heading", text: "Nợ và Có không có nghĩa gì cả" },
      {
        type: "paragraph",
        text: "Đây là rào cản đầu tiên và nó hoàn toàn do ngôn ngữ. \"Nợ\" không có nghĩa là nợ nần, \"Có\" không có nghĩa là sở hữu. Chúng là tên của cột trái và cột phải, dịch từ tiếng Latin và giữ nguyên qua bảy thế kỷ. Ai cố tìm ý nghĩa trong hai từ đó sẽ mắc kẹt; ai coi chúng là trái và phải sẽ đi tiếp được ngay.",
      },
      {
        type: "conceptTable",
        title: "Bảng duy nhất phải thuộc",
        subtitle: "Phần còn lại của kế toán suy ra được từ đây",
        concepts: [
          { vi: "Tài sản", en: "Assets", def: "Tăng ghi bên Nợ, giảm ghi bên Có. Tiền, hàng tồn kho, máy móc, khoản phải thu." },
          { vi: "Chi phí", en: "Expenses", def: "Tăng ghi bên Nợ. Cùng chiều với tài sản vì cả hai đều là nơi của cải đi tới." },
          { vi: "Nợ phải trả", en: "Liabilities", def: "Tăng ghi bên Có. Vay ngân hàng, phải trả người bán, thuế phải nộp." },
          { vi: "Vốn chủ sở hữu", en: "Equity", def: "Tăng ghi bên Có. Vốn góp và lợi nhuận giữ lại." },
          { vi: "Doanh thu", en: "Revenue", def: "Tăng ghi bên Có. Cùng chiều với vốn chủ vì doanh thu làm vốn chủ lớn lên." },
        ],
      },
      { type: "heading", text: "Bốn dạng nghiệp vụ" },
      {
        type: "list",
        items: [
          "Tài sản tăng, tài sản khác giảm: mua máy trả tiền mặt. Tổng tài sản không đổi.",
          "Tài sản tăng, nợ tăng: vay ngân hàng. Bảng cân đối phình ra hai bên.",
          "Tài sản giảm, nợ giảm: trả nợ vay. Bảng cân đối co lại hai bên.",
          "Chi phí tăng, tài sản giảm hoặc nợ tăng: trả lương, nhận hoá đơn điện. Đây là dạng duy nhất làm lợi nhuận giảm.",
        ],
      },
      {
        type: "callout",
        label: "Chỗ người mới sai nhiều nhất",
        text: "Coi mọi khoản chi tiền là chi phí. Trả lương là chi phí vì công sức đã tiêu hao; mua máy in thì không, vì cái máy vẫn còn đó. Phân biệt được hai thứ này là phân biệt được báo cáo kết quả kinh doanh với bảng cân đối kế toán.",
      },
      {
        type: "closing",
        lines: [
          "Học thuộc bảng tăng giảm ở trên, rồi tự đặt câu hỏi cho mỗi nghiệp vụ: cái gì tăng, cái gì giảm.",
          "Hai câu trả lời đó chính là hai vế của bút toán.",
        ],
      },
    ],
  },

  {
    id: 1722,
    slug: "so-nhat-ky-so-cai-va-bang-can-doi-thu",
    title: "Sổ sách, Bài 2: Từ nhật ký tới báo cáo - đường đi của một nghiệp vụ",
    subtitle: "Nhật ký chung, sổ cái, bảng cân đối thử: ba chặng biến hàng nghìn bút toán thành bốn trang báo cáo",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "professional",
    whyItMatters:
      "Biết đường đi này là biết chỗ để tìm khi một con số trên báo cáo trông sai. Người không biết sẽ nhìn báo cáo và đoán; người biết sẽ lần ngược về đúng bút toán đã tạo ra nó.",
    openingQuestion: "Sổ cái khác nhật ký chung ở chỗ nào?",
    openingOptions: [
      "Nhật ký ghi theo thời gian, sổ cái gom theo từng tài khoản",
      "Nhật ký do kế toán viên ghi còn sổ cái do kế toán trưởng lập vào cuối kỳ",
      "Nhật ký ghi nghiệp vụ tiền mặt, sổ cái ghi nghiệp vụ không dùng tiền mặt",
      "Nhật ký là sổ nội bộ, còn sổ cái là sổ nộp cho cơ quan thuế theo quy định",
    ],
    correctOption: 0,
    explanation:
      "Cùng một dữ liệu, hai cách sắp xếp phục vụ hai câu hỏi khác nhau. Nhật ký chung trả lời \"ngày 12 tháng 3 đã xảy ra chuyện gì\" - nó xếp theo thứ tự thời gian và là nơi bút toán được ghi lần đầu. Sổ cái trả lời \"tài khoản tiền mặt biến động ra sao trong kỳ\" - nó gom mọi bút toán chạm vào tiền mặt lại một chỗ để ra số dư cuối kỳ. Không có bước gom này thì muốn biết số dư tiền mặt phải đọc lại toàn bộ nhật ký từ đầu năm. Báo cáo tài chính lấy số dư từ sổ cái, không lấy từ nhật ký.",
    diagram: [
      { label: "Chứng từ gốc (hoá đơn, phiếu chi)", arrow: true },
      { label: "Nhật ký chung - xếp theo thời gian", arrow: true },
      { label: "Sổ cái - gom theo tài khoản, ra số dư", arrow: true },
      { label: "Bảng cân đối thử - kiểm tra tổng Nợ = tổng Có", arrow: true },
      { label: "Báo cáo tài chính" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Phần mềm kế toán và cái bẫy của nó",
      description:
        "Misa, Fast hay bất kỳ phần mềm nào cũng làm ba bước này tự động: gõ một bút toán vào là sổ cái và bảng cân đối thử cập nhật ngay. Tiện, nhưng nó khiến người mới không bao giờ nhìn thấy đường đi - nên khi một số liệu sai, họ không biết bắt đầu tìm từ đâu. Người biết đường đi sẽ mở sổ cái của tài khoản đáng ngờ và lần ngược về bút toán gốc.",
    },
    quiz: [
      {
        question: "Nhật ký chung sắp xếp theo tiêu chí nào?",
        options: [
          "Thứ tự thời gian phát sinh",
          "Theo số hiệu tài khoản",
          "Giá trị nghiệp vụ từ lớn xuống nhỏ trong kỳ",
          "Loại chứng từ gốc kèm theo từng nghiệp vụ ghi nhận",
        ],
        correct: 0,
        explanation:
          "Nhật ký trả lời câu hỏi \"hôm đó có chuyện gì\". Muốn biết một tài khoản biến động ra sao thì phải sang sổ cái.",
      },
      {
        question: "Bảng cân đối thử dùng để làm gì?",
        options: [
          "Kiểm tra tổng số dư bên Nợ có bằng tổng bên Có không",
          "Trình bày tình hình tài sản và nguồn vốn cho người ngoài doanh nghiệp",
          "So thực tế với kế hoạch",
          "Đối chiếu số dư sổ sách với số dư xác nhận từ ngân hàng và đối tác",
        ],
        correct: 0,
        explanation:
          "Đây là bước kiểm tra nội bộ trước khi lập báo cáo. Nó không phải bảng cân đối kế toán - tên gần giống nhau nhưng mục đích khác hẳn.",
      },
      {
        question: "Bảng cân đối thử cân bằng có nghĩa là sổ sách đã đúng chưa?",
        options: [
          "Chưa - ghi nhầm tài khoản vẫn giữ hai bên cân nhau",
          "Rồi, vì mọi sai sót đều làm hai vế lệch nhau",
          "Chưa, vì còn phải đợi kiểm toán độc lập xác nhận số liệu",
          "Rồi, nếu số dư khớp với chứng từ gốc của từng nghiệp vụ",
        ],
        correct: 0,
        explanation:
          "Ghi Nợ nhầm sang tài khoản khác thì tổng hai bên vẫn bằng nhau. Bảng cân đối thử chỉ bắt được lỗi số học, không bắt được lỗi phân loại.",
      },
      {
        question: "Một con số trên báo cáo trông sai. Tìm từ đâu?",
        options: [
          "Mở sổ cái của tài khoản đó rồi lần ngược về bút toán gốc",
          "So với báo cáo kỳ trước",
          "Rà soát toàn bộ nhật ký chung từ đầu kỳ theo thứ tự thời gian",
          "Lập lại bảng cân đối thử và kiểm tra tổng hai bên có khớp không",
        ],
        correct: 0,
        explanation:
          "Sổ cái gom mọi bút toán chạm vào tài khoản đó, nên nó là đường ngắn nhất từ con số nghi ngờ về chứng từ đã tạo ra nó.",
      },
      {
        question: "Số dư trên báo cáo tài chính lấy từ đâu?",
        options: [
          "Sổ cái của từng tài khoản",
          "Nhật ký chung",
          "Tập hợp chứng từ gốc của kỳ",
          "Sổ chi tiết của từng đối tượng công nợ",
        ],
        correct: 0,
        explanation:
          "Sổ cái là nơi số dư cuối kỳ của từng tài khoản được kết lại. Nhật ký chỉ có các bút toán rời, chưa cộng thành số dư.",
      },
    ],
    keyTakeaways: [
      "Chứng từ → nhật ký (theo thời gian) → sổ cái (theo tài khoản) → bảng cân đối thử → báo cáo.",
      "Bảng cân đối thử chỉ bắt lỗi số học, không bắt lỗi ghi nhầm tài khoản.",
      "Số dư trên báo cáo lấy từ sổ cái, không lấy từ nhật ký.",
      "Nghi một con số thì mở sổ cái tài khoản đó và lần ngược - đó là đường ngắn nhất.",
    ],
    sections: [
      {
        type: "lead",
        text: "Một doanh nghiệp cỡ vừa phát sinh vài nghìn bút toán mỗi tháng, và cuối năm phải ra bốn trang báo cáo. Đường đi giữa hai đầu đó có ba chặng, và biết chúng là biết chỗ để tìm khi có gì sai.",
      },
      { type: "heading", text: "Ba chặng" },
      {
        type: "comparison",
        left: { label: "Nhật ký chung", text: "Xếp theo thời gian. Trả lời: ngày 12 tháng 3 đã có những nghiệp vụ nào. Đây là nơi bút toán được ghi lần đầu." },
        right: { label: "Sổ cái", text: "Gom theo tài khoản. Trả lời: tiền mặt biến động ra sao trong kỳ và còn bao nhiêu. Đây là nơi báo cáo lấy số." },
      },
      {
        type: "paragraph",
        text: "Chặng thứ ba là bảng cân đối thử: liệt kê số dư của mọi tài khoản và cộng hai bên xem có khớp. Đây là bước kiểm tra trước khi lập báo cáo, và tên của nó gần giống bảng cân đối kế toán tới mức gây nhầm - nhưng một cái là công cụ kiểm tra nội bộ, cái kia là báo cáo gửi ra ngoài.",
      },
      { type: "heading", text: "Cân không có nghĩa là đúng" },
      {
        type: "callout",
        label: "Bốn loại lỗi bảng cân đối thử không bắt được",
        text: "Ghi nhầm tài khoản nhưng đúng số tiền; ghi sót hoàn toàn một nghiệp vụ; ghi trùng cả hai vế; đảo ngược cả Nợ lẫn Có. Cả bốn đều giữ tổng hai bên bằng nhau - nên một bảng cân bằng chỉ chứng minh không có lỗi cộng trừ, chứ không chứng minh sổ sách phản ánh đúng thực tế.",
      },
      {
        type: "closing",
        lines: [
          "Phần mềm làm cả ba chặng trong một cú bấm, nên rất dễ không bao giờ nhìn thấy chúng.",
          "Nhưng ngày một con số trông sai, người biết đường đi tìm mất mười phút, người không biết ngồi đoán.",
        ],
      },
    ],
  },

  {
    id: 1723,
    slug: "but-toan-dieu-chinh-cuoi-ky",
    title: "Sổ sách, Bài 3: Bút toán điều chỉnh - vì sao cuối kỳ vẫn phải ghi thêm",
    subtitle: "Trích trước, phân bổ, khấu hao, dự phòng: bốn nhóm bút toán không có chứng từ nào nhắc bạn ghi",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🔧",
    track: "professional",
    whyItMatters:
      "Mọi bút toán trong kỳ đều có một tờ giấy thúc bạn ghi. Bút toán điều chỉnh thì không - không ai gửi hoá đơn nhắc trích khấu hao. Đây là chỗ phân biệt người ghi sổ với người làm kế toán, và cũng là chỗ dễ điều chỉnh lợi nhuận nhất.",
    openingQuestion:
      "Công ty trả trước tiền thuê văn phòng 120 triệu cho 12 tháng vào ngày 1/1. Cuối tháng 1 phải ghi gì?",
    openingOptions: [
      "Nợ chi phí thuê 10 triệu, Có chi phí trả trước 10 triệu",
      "Không ghi gì thêm vì đã ghi toàn bộ khi trả tiền hồi đầu năm",
      "Nợ chi phí thuê 120 triệu, Có tiền mặt 120 triệu ngay tại tháng 1",
      "Nợ chi phí trả trước 10 triệu, Có chi phí thuê văn phòng 10 triệu",
    ],
    correctOption: 0,
    explanation:
      "Lúc trả tiền, 120 triệu vào tài khoản chi phí trả trước - đó là một tài sản, quyền được dùng văn phòng trong 12 tháng. Mỗi tháng trôi qua, một phần quyền đó tiêu hao, nên chuyển 10 triệu từ tài sản sang chi phí. Không có hoá đơn nào phát sinh trong tháng 1, không ai nhắc, và đó chính là đặc điểm của bút toán điều chỉnh: nó tồn tại vì thời gian trôi, chứ không vì một giao dịch xảy ra. Bỏ qua nó thì tháng 1 lãi giả 10 triệu và tháng 12 lỗ dồn 120 triệu - báo cáo từng tháng đều sai dù cả năm cộng lại vẫn đúng.",
    diagram: [
      { label: "Trong kỳ: ghi theo chứng từ", arrow: true },
      { label: "Cuối kỳ: hỏi cái gì đã tiêu hao mà chưa ghi", arrow: true },
      { label: "Bốn nhóm: trích trước, phân bổ, khấu hao, dự phòng", arrow: true },
      { label: "Ghi điều chỉnh → báo cáo phản ánh đúng kỳ" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Chênh lệch giữa báo cáo tự lập và báo cáo sau kiểm toán",
      description:
        "Phần lớn chênh lệch nằm ở đúng bốn nhóm bút toán này - đặc biệt là dự phòng phải thu khó đòi và dự phòng giảm giá hàng tồn kho. Chúng là những con số dựa trên ước tính, nên là chỗ rộng nhất để lợi nhuận được điều chỉnh, và cũng là chỗ kiểm toán viên soi kỹ nhất.",
    },
    quiz: [
      {
        question: "Điểm chung của mọi bút toán điều chỉnh là gì?",
        options: [
          "Không có chứng từ bên ngoài nào phát sinh để nhắc ghi",
          "Đều làm giảm lợi nhuận của kỳ báo cáo đang lập",
          "Đều liên quan tới các khoản đã thu hoặc chi bằng tiền mặt",
          "Đều phải được kế toán trưởng phê duyệt trước khi vào sổ",
        ],
        correct: 0,
        explanation:
          "Chúng phát sinh vì thời gian trôi hoặc vì một ước tính thay đổi, không vì có giao dịch. Nên không ai nhắc, và bỏ sót là chuyện thường gặp.",
      },
      {
        question: "Trích trước chi phí là gì?",
        options: [
          "Ghi chi phí đã phát sinh nhưng chưa nhận hoá đơn",
          "Ghi trước một khoản chi dự kiến sẽ phát sinh ở kỳ sau",
          "Phân bổ một khoản chi lớn ra nhiều kỳ cho đều nhau",
          "Trích lập một quỹ dự phòng cho các rủi ro chưa xác định được",
        ],
        correct: 0,
        explanation:
          "Điện tháng 12 dùng rồi, hoá đơn sang tháng 1 mới về. Chi phí thuộc về tháng 12 nên phải ghi vào tháng 12, dù chưa có giấy tờ.",
      },
      {
        question: "Vì sao dự phòng là nhóm dễ bị dùng để điều chỉnh lợi nhuận nhất?",
        options: [
          "Vì nó dựa trên ước tính chứ không dựa trên một con số có sẵn",
          "Vì chuẩn mực không quy định gì về cách trích lập các khoản dự phòng",
          "Vì dự phòng không xuất hiện trên báo cáo kết quả kinh doanh",
          "Vì kiểm toán viên không có quyền yêu cầu điều chỉnh khoản mục này",
        ],
        correct: 0,
        explanation:
          "Trích thêm dự phòng làm lợi nhuận năm nay giảm và tạo sẵn dư địa cho năm sau hoàn nhập. Vì là ước tính nên khoảng dao động hợp lý khá rộng.",
      },
      {
        question: "Bỏ sót bút toán khấu hao trong tháng gây hậu quả gì?",
        options: [
          "Lợi nhuận tháng đó cao giả tạo và tài sản bị ghi cao hơn thực tế",
          "Chỉ ảnh hưởng tới bảng cân đối, báo cáo kết quả kinh doanh vẫn đúng",
          "Không ảnh hưởng gì vì cả năm cộng lại con số vẫn khớp với thực tế",
          "Thuế phải nộp giảm xuống do chi phí được ghi nhận chậm hơn",
        ],
        correct: 0,
        explanation:
          "Sai cả hai báo cáo cùng lúc - đó là bản chất của ghi sổ kép. Và \"cả năm cộng lại vẫn đúng\" không cứu được báo cáo từng quý.",
      },
      {
        question: "Doanh thu đã thực hiện nhưng chưa xuất hoá đơn thì xử lý thế nào?",
        options: [
          "Ghi nhận vào kỳ đã thực hiện, không đợi hoá đơn",
          "Đợi xuất hoá đơn rồi ghi nhận vào kỳ xuất hoá đơn",
          "Ghi một nửa vào kỳ này và một nửa vào kỳ sau cho cân đối",
          "Chỉ ghi nhận khi khách hàng đã thanh toán đầy đủ tiền hàng",
        ],
        correct: 0,
        explanation:
          "Nguyên tắc dồn tích: ghi nhận theo thời điểm phát sinh, không theo thời điểm có giấy tờ hay có tiền. Hoá đơn là chứng từ, không phải điều kiện.",
      },
    ],
    keyTakeaways: [
      "Bút toán điều chỉnh không có chứng từ nhắc - chúng phát sinh vì thời gian trôi.",
      "Bốn nhóm: trích trước, phân bổ chi phí trả trước, khấu hao, dự phòng.",
      "Dự phòng dựa trên ước tính nên là chỗ rộng nhất để điều chỉnh lợi nhuận.",
      "Bỏ sót một bút toán điều chỉnh làm sai cả hai báo cáo cùng lúc.",
    ],
    sections: [
      {
        type: "lead",
        text: "Trong kỳ, mọi bút toán đều có một tờ giấy thúc bạn ghi: hoá đơn về thì ghi, chi tiền thì ghi. Cuối kỳ thì không có tờ giấy nào cả, mà vẫn còn việc phải làm - và đó là phần khó của nghề.",
      },
      { type: "heading", text: "Bốn nhóm" },
      {
        type: "conceptTable",
        title: "Bút toán điều chỉnh cuối kỳ",
        concepts: [
          { vi: "Trích trước", en: "Accrued expense", def: "Đã dùng, chưa có hoá đơn. Điện nước tháng 12, lãi vay chưa tới kỳ trả, lương tháng cuối chưa chi." },
          { vi: "Phân bổ trả trước", en: "Prepaid expense", def: "Đã trả tiền cho nhiều kỳ. Mỗi kỳ chuyển một phần từ tài sản sang chi phí: tiền thuê, bảo hiểm, công cụ dụng cụ." },
          { vi: "Khấu hao", en: "Depreciation", def: "Tài sản dài hạn tiêu hao dần. Không ai gửi hoá đơn khấu hao - nó chỉ tồn tại vì thời gian trôi." },
          { vi: "Dự phòng", en: "Provision", def: "Ước tính phần sẽ mất: phải thu khó đòi, hàng tồn kho giảm giá. Dựa trên phán đoán, nên là chỗ rộng nhất." },
        ],
      },
      { type: "heading", text: "Vì sao nguyên tắc dồn tích bắt phải làm việc này" },
      {
        type: "paragraph",
        text: "Kế toán dồn tích ghi nhận theo thời điểm nghiệp vụ phát sinh, không theo thời điểm tiền chuyển. Điện tháng 12 dùng trong tháng 12, nên chi phí thuộc tháng 12, dù hoá đơn về tháng 1 và tiền chuyển tháng 2. Không có bút toán điều chỉnh thì báo cáo từng kỳ đều lệch, dù cả năm cộng lại vẫn đúng - và người đọc báo cáo quý không có cả năm để cộng.",
      },
      {
        type: "callout",
        label: "Vì sao kiểm toán soi kỹ nhất nhóm dự phòng",
        text: "Ba nhóm đầu có căn cứ khá cứng: hợp đồng thuê, bảng khấu hao, hoá đơn tháng sau. Dự phòng thì dựa trên ước tính về tương lai, nên khoảng dao động hợp lý rất rộng - và trong khoảng đó, trích nhiều hay ít là một lựa chọn về lợi nhuận năm nay chứ không chỉ là một phép tính.",
      },
      {
        type: "closing",
        lines: [
          "Ghi sổ theo chứng từ là công việc có thể chỉ dẫn từng bước.",
          "Cuối kỳ ngồi tự hỏi cái gì đã tiêu hao mà chưa ai ghi - đó mới là nghề.",
        ],
      },
    ],
  },

  {
    id: 1724,
    slug: "doi-chieu-va-tim-sai-sot-so-sach",
    title: "Sổ sách, Bài 4: Đối chiếu - tìm ra chỗ sai trước khi người khác tìm ra",
    subtitle: "Đối chiếu ngân hàng, công nợ, kho, và một mẹo số học tìm lỗi đảo chữ số trong ba giây",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Sổ sách sai là chuyện bình thường; sổ sách sai mà không ai phát hiện cho tới lúc kiểm toán mới là vấn đề. Đối chiếu là cơ chế tự bắt lỗi của nghề kế toán, và nó là việc hằng tháng chứ không phải việc cuối năm.",
    openingQuestion: "Sổ quỹ ghi 250 triệu, sao kê ngân hàng ghi 235 triệu. Nguyên nhân khả dĩ nhất?",
    openingOptions: [
      "Séc đã phát hành nhưng người nhận chưa mang đi rút",
      "Ngân hàng đã ghi nhận sai số dư tài khoản của doanh nghiệp",
      "Kế toán đã ghi trùng một nghiệp vụ thu tiền trong kỳ báo cáo",
      "Doanh nghiệp quên hạch toán một khoản chi phí lãi vay phát sinh",
    ],
    correctOption: 0,
    explanation:
      "Đây là khoản chênh do thời điểm, nguyên nhân phổ biến nhất khi đối chiếu ngân hàng. Công ty ghi giảm tiền ngay lúc phát hành séc, còn ngân hàng chỉ ghi giảm khi séc được mang đi rút - trong khoảng giữa, hai sổ lệch nhau mà không bên nào sai. Cùng họ với nó là khoản tiền khách chuyển vào cuối ngày mà ngân hàng ghi sang ngày hôm sau, và phí dịch vụ ngân hàng trừ tự động mà công ty chưa biết để ghi. Ba nguyên nhân còn lại đều là lỗi thật và cũng có thể xảy ra, nhưng chênh lệch do thời điểm phải được loại trừ trước khi đi tìm lỗi.",
    diagram: [
      { label: "Số dư sổ sách", arrow: true },
      { label: "± khoản chênh do thời điểm (séc chưa rút, tiền về sau giờ)", arrow: true },
      { label: "± khoản ngân hàng đã ghi mà công ty chưa biết (phí, lãi)", arrow: true },
      { label: "= số dư sao kê. Còn lệch → mới là lỗi thật" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Đối chiếu công nợ cuối năm",
      description:
        "Gửi thư xác nhận số dư cho khách hàng và nhà cung cấp là thủ tục kiểm toán bắt buộc, nhưng doanh nghiệp quản trị tốt làm việc đó hằng quý cho các đối tác lớn. Lý do rất thực tế: một khoản phải thu ghi sai phát hiện sau 12 tháng thường đã thành khoản không đòi được, còn phát hiện sau 3 tháng thì vẫn còn là một cuộc gọi điện thoại.",
    },
    quiz: [
      {
        question: "Chênh lệch do thời điểm giữa sổ quỹ và sao kê ngân hàng nghĩa là gì?",
        options: [
          "Cả hai bên đều ghi đúng, chỉ khác thời điểm ghi nhận",
          "Một trong hai bên đã ghi sai và cần điều chỉnh lại số liệu",
          "Ngân hàng chưa cập nhật hệ thống nên số dư hiển thị bị chậm",
          "Doanh nghiệp phải ghi bổ sung một bút toán để hai bên khớp nhau",
        ],
        correct: 0,
        explanation:
          "Séc chưa được mang đi rút là ví dụ điển hình. Phải loại trừ hết nhóm này trước, phần còn lệch mới là lỗi cần tìm.",
      },
      {
        question: "Khoản nào doanh nghiệp phải ghi bổ sung sau khi đối chiếu ngân hàng?",
        options: [
          "Phí dịch vụ ngân hàng đã trừ mà công ty chưa hạch toán",
          "Séc đã phát hành nhưng người nhận chưa mang đi rút tiền",
          "Tiền khách chuyển cuối ngày mà ngân hàng ghi sang hôm sau",
          "Khoản chuyển tiền nội bộ giữa hai tài khoản của cùng công ty",
        ],
        correct: 0,
        explanation:
          "Phí và lãi ngân hàng là nghiệp vụ đã thực sự xảy ra mà công ty chưa biết, nên phải vào sổ. Chênh lệch do thời điểm thì tự hết, không ghi gì.",
      },
      {
        question: "Chênh lệch chia hết cho 9 thường là dấu hiệu của lỗi gì?",
        options: [
          "Đảo chữ số khi nhập liệu",
          "Ghi trùng một nghiệp vụ vào sổ hai lần",
          "Bỏ sót một nghiệp vụ chưa được ghi vào sổ",
          "Nhầm lẫn giữa hai tài khoản có số hiệu gần giống nhau",
        ],
        correct: 0,
        explanation:
          "Viết 54 thành 45 lệch 9, viết 730 thành 370 lệch 360 - cũng chia hết cho 9. Mẹo này thu hẹp phạm vi tìm kiếm chỉ trong vài giây.",
      },
      {
        question: "Vì sao nên đối chiếu công nợ hằng quý thay vì chỉ cuối năm?",
        options: [
          "Vì sai sót phát hiện sớm còn đòi được, để lâu thành nợ khó thu",
          "Vì quy định yêu cầu doanh nghiệp đối chiếu công nợ theo từng quý",
          "Vì kiểm toán viên sẽ giảm phí nếu doanh nghiệp đối chiếu thường xuyên",
          "Vì số dư công nợ cuối năm thường lớn hơn nên khó đối chiếu chính xác",
        ],
        correct: 0,
        explanation:
          "Đây là lý do kinh tế chứ không phải lý do thủ tục. Chênh lệch phát hiện sau ba tháng là một cuộc gọi; sau mười hai tháng thường là một khoản mất.",
      },
      {
        question: "Đối chiếu kho phát hiện thực tế ít hơn sổ sách. Bước đúng là gì?",
        options: [
          "Tìm nguyên nhân trước, điều chỉnh sổ sau",
          "Điều chỉnh sổ theo số thực tế rồi tìm nguyên nhân sau",
          "Giữ nguyên sổ sách và ghi chú chênh lệch vào thuyết minh",
          "Trích lập dự phòng giảm giá hàng tồn kho tương ứng phần thiếu",
        ],
        correct: 0,
        explanation:
          "Sửa sổ cho khớp trước là xoá mất dấu vết. Thiếu hàng có thể là ghi sai, xuất nhầm, hoặc mất - ba nguyên nhân dẫn tới ba xử lý hoàn toàn khác nhau.",
      },
    ],
    keyTakeaways: [
      "Loại trừ chênh lệch do thời điểm trước; phần còn lệch mới là lỗi thật.",
      "Phí và lãi ngân hàng phải ghi bổ sung; séc chưa rút thì không ghi gì.",
      "Chênh lệch chia hết cho 9 gần như luôn là lỗi đảo chữ số.",
      "Thiếu hàng trong kho thì tìm nguyên nhân trước, sửa sổ sau - sửa trước là xoá dấu vết.",
    ],
    sections: [
      {
        type: "lead",
        text: "Không ai ghi sổ cả năm mà không sai lần nào. Nghề này không được thiết kế quanh giả định không sai - nó được thiết kế quanh việc tự bắt được lỗi của mình trước khi người khác bắt.",
      },
      { type: "heading", text: "Ba cuộc đối chiếu bắt buộc" },
      {
        type: "list",
        items: [
          "Ngân hàng: sổ quỹ so với sao kê, hằng tháng. Bắt được ghi sót, ghi trùng và cả những khoản chi không ai duyệt.",
          "Công nợ: gửi xác nhận số dư cho khách hàng và nhà cung cấp lớn, hằng quý.",
          "Kho: kiểm kê thực tế so với sổ sách. Đây là cuộc đối chiếu duy nhất phải đứng dậy đi đếm.",
        ],
      },
      { type: "heading", text: "Đọc một bảng đối chiếu ngân hàng" },
      {
        type: "paragraph",
        text: "Bắt đầu từ số dư sổ sách, cộng trừ các khoản chênh do thời điểm - séc đã phát hành chưa rút, tiền về sau giờ giao dịch - rồi cộng trừ những gì ngân hàng đã ghi mà công ty chưa biết, như phí dịch vụ và lãi tiền gửi. Nhóm sau phải vào sổ; nhóm trước thì không, vì nó tự hết trong vài ngày. Sau hai bước đó mà vẫn còn lệch, phần lệch đó mới là lỗi.",
      },
      {
        type: "callout",
        label: "Mẹo chia hết cho 9",
        text: "Nếu chênh lệch chia hết cho 9, gần như chắc chắn có một cặp chữ số bị đảo: 54 thành 45 lệch 9, 730 thành 370 lệch 360. Biết điều này biến việc dò cả trang sổ thành việc quét tìm những con số có hai chữ số gần nhau, và thường mất chưa tới một phút.",
      },
      {
        type: "closing",
        lines: [
          "Đối chiếu là việc hằng tháng, không phải việc cuối năm.",
          "Một chênh lệch ba tháng tuổi là một cuộc điện thoại. Cùng chênh lệch đó mười hai tháng tuổi thường là một khoản mất.",
        ],
      },
    ],
  },

  {
    id: 1725,
    slug: "khoa-so-cuoi-ky-va-ket-chuyen",
    title: "Sổ sách, Bài 5: Khoá sổ - kết chuyển và vì sao doanh thu bắt đầu lại từ 0",
    subtitle: "Tài khoản tạm thời và thường xuyên, trình tự kết chuyển, và cách một kỳ kế toán thực sự đóng lại",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🔒",
    track: "professional",
    whyItMatters:
      "Khoá sổ là lúc lợi nhuận rời báo cáo kết quả kinh doanh và trở thành một dòng trên bảng cân đối. Hiểu bước này là hiểu vì sao hai báo cáo đó nối với nhau, và vì sao lợi nhuận giữ lại là số cộng dồn của mọi năm đã qua.",
    openingQuestion: "Vì sao doanh thu đầu năm mới luôn bắt đầu từ 0 còn tiền mặt thì không?",
    openingOptions: [
      "Vì doanh thu đo một khoảng thời gian, tiền mặt đo một thời điểm",
      "Vì quy định kế toán yêu cầu đóng các tài khoản doanh thu vào cuối mỗi năm",
      "Vì doanh thu năm cũ đã được chuyển hết sang tài khoản phải thu khách hàng",
      "Vì tiền mặt là tài sản thực còn doanh thu chỉ là con số ghi nhận trên sổ",
    ],
    correctOption: 0,
    explanation:
      "Đây là khác biệt giữa hai loại tài khoản, và nó bắt nguồn từ chính câu hỏi mà mỗi báo cáo trả lời. Doanh thu, chi phí, lợi nhuận là tài khoản tạm thời: chúng đo hoạt động trong một khoảng thời gian, nên hỏi \"doanh thu là bao nhiêu\" mà không nói khoảng nào thì câu hỏi vô nghĩa. Hết kỳ, chúng được kết chuyển về 0 để bắt đầu đo khoảng mới. Tiền mặt, tài sản, nợ phải trả là tài khoản thường xuyên: chúng đo trạng thái tại một thời điểm, và trạng thái cuối ngày 31/12 chính là trạng thái đầu ngày 1/1 - không có lý do gì để về 0. Toàn bộ lợi nhuận của kỳ không biến mất khi kết chuyển: nó chảy vào lợi nhuận giữ lại, một tài khoản thường xuyên.",
    diagram: [
      { label: "Cuối kỳ: kết chuyển doanh thu và chi phí", arrow: true },
      { label: "Ra lợi nhuận trong kỳ", arrow: true },
      { label: "Trừ phần chia cổ tức", arrow: true },
      { label: "Phần còn lại cộng vào lợi nhuận giữ lại (thường xuyên)", arrow: true },
      { label: "Tài khoản tạm thời về 0, kỳ mới bắt đầu" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Dòng lợi nhuận giữ lại trên bảng cân đối",
      description:
        "Con số đó không phải lợi nhuận năm nay - nó là tổng lợi nhuận mọi năm kể từ khi thành lập, trừ đi mọi khoản cổ tức đã chia. Một công ty lãi đều mười năm nhưng chia hết cổ tức sẽ có lợi nhuận giữ lại gần bằng 0, và điều đó không nói gì xấu về công ty đó - nó chỉ nói rằng lợi nhuận đã về túi cổ đông thay vì ở lại trong doanh nghiệp.",
    },
    quiz: [
      {
        question: "Tài khoản nào là tài khoản tạm thời?",
        options: [
          "Doanh thu bán hàng",
          "Phải trả người bán",
          "Hàng tồn kho trong kho công ty",
          "Vay dài hạn từ ngân hàng thương mại",
        ],
        correct: 0,
        explanation:
          "Doanh thu, chi phí và các khoản thu nhập khác đo hoạt động trong một khoảng thời gian nên phải về 0 mỗi kỳ. Ba lựa chọn kia đo trạng thái.",
      },
      {
        question: "Lợi nhuận sau khi kết chuyển đi về đâu?",
        options: [
          "Lợi nhuận giữ lại thuộc vốn chủ sở hữu",
          "Tài khoản tiền mặt của doanh nghiệp tại ngân hàng",
          "Quỹ đầu tư phát triển theo tỷ lệ do đại hội cổ đông quyết định",
          "Tài khoản phải thu khách hàng, chờ tới khi thu được tiền về",
        ],
        correct: 0,
        explanation:
          "Lãi làm vốn chủ lớn lên, và nó vào lợi nhuận giữ lại chứ không vào tiền mặt - lãi trên sổ không đồng nghĩa có tiền trong tài khoản.",
      },
      {
        question: "Lợi nhuận giữ lại trên bảng cân đối là con số gì?",
        options: [
          "Tổng lợi nhuận mọi năm trừ tổng cổ tức đã chia",
          "Lợi nhuận sau thuế của riêng năm tài chính vừa kết thúc",
          "Phần lợi nhuận công ty dự kiến giữ lại để tái đầu tư năm tới",
          "Số tiền mặt công ty đang giữ lại chưa dùng đến cho hoạt động",
        ],
        correct: 0,
        explanation:
          "Nó cộng dồn từ ngày thành lập. Một công ty lãi đều nhưng chia hết cổ tức sẽ có con số này gần 0, và điều đó không nói gì xấu.",
      },
      {
        question: "Vì sao tài khoản tiền mặt không được kết chuyển về 0?",
        options: [
          "Vì số dư cuối ngày 31/12 chính là số dư đầu ngày 1/1",
          "Vì tiền mặt không thuộc phạm vi của báo cáo kết quả kinh doanh",
          "Vì kết chuyển tiền mặt sẽ làm phương trình kế toán mất cân bằng",
          "Vì chỉ những tài khoản có phát sinh trong kỳ mới cần kết chuyển",
        ],
        correct: 0,
        explanation:
          "Tài khoản thường xuyên đo trạng thái tại một thời điểm, và trạng thái không biến mất vì lịch sang năm mới.",
      },
      {
        question: "Sau khi khoá sổ, phát hiện một bút toán bị bỏ sót thuộc kỳ vừa khoá. Xử lý thế nào?",
        options: [
          "Ghi vào kỳ hiện tại nếu nhỏ, điều chỉnh hồi tố nếu trọng yếu",
          "Mở lại sổ kỳ cũ và ghi bổ sung vào đúng ngày phát sinh nghiệp vụ",
          "Bỏ qua vì kỳ đã khoá và báo cáo đã được công bố ra bên ngoài",
          "Ghi vào kỳ hiện tại trong mọi trường hợp để giữ nguyên số liệu cũ",
        ],
        correct: 0,
        explanation:
          "Ngưỡng trọng yếu quyết định. Sai sót nhỏ xử lý ở kỳ hiện tại; sai sót trọng yếu phải điều chỉnh hồi tố và trình bày lại số liệu so sánh.",
      },
    ],
    keyTakeaways: [
      "Tài khoản tạm thời (doanh thu, chi phí) đo một khoảng thời gian nên về 0 mỗi kỳ.",
      "Tài khoản thường xuyên (tài sản, nợ, vốn chủ) đo một thời điểm nên mang số dư sang kỳ sau.",
      "Lợi nhuận kết chuyển vào lợi nhuận giữ lại, không vào tiền mặt.",
      "Lợi nhuận giữ lại là số cộng dồn từ ngày thành lập trừ mọi cổ tức đã chia.",
    ],
    sections: [
      {
        type: "lead",
        text: "Khoá sổ nghe như một thủ tục hành chính, nhưng nó là chỗ hai báo cáo tài chính nối vào nhau. Lợi nhuận rời báo cáo kết quả kinh doanh ở đây, và xuất hiện lại trên bảng cân đối kế toán dưới một cái tên khác.",
      },
      { type: "heading", text: "Hai loại tài khoản" },
      {
        type: "comparison",
        left: { label: "Tạm thời", text: "Doanh thu, chi phí. Đo hoạt động trong một khoảng thời gian. Hỏi \"doanh thu bao nhiêu\" mà không nói khoảng nào là câu hỏi vô nghĩa - nên hết kỳ phải về 0." },
        right: { label: "Thường xuyên", text: "Tài sản, nợ phải trả, vốn chủ. Đo trạng thái tại một thời điểm. Số dư cuối 31/12 chính là số dư đầu 1/1, không có lý do gì để về 0." },
      },
      { type: "heading", text: "Trình tự kết chuyển" },
      {
        type: "list",
        items: [
          "Kết chuyển toàn bộ doanh thu và thu nhập khác sang tài khoản xác định kết quả.",
          "Kết chuyển toàn bộ chi phí sang cùng tài khoản đó.",
          "Chênh lệch chính là lợi nhuận (hoặc lỗ) của kỳ.",
          "Kết chuyển lợi nhuận đó vào lợi nhuận giữ lại; phần chia cổ tức trừ ra khỏi lợi nhuận giữ lại.",
        ],
      },
      {
        type: "callout",
        label: "Lãi không có nghĩa là có tiền",
        text: "Lợi nhuận kết chuyển vào lợi nhuận giữ lại - một dòng thuộc vốn chủ sở hữu - chứ không vào tiền mặt. Một công ty có thể lãi 100 tỷ và không đủ tiền trả lương tháng sau, nếu 100 tỷ đó đang nằm ở khoản phải thu và hàng tồn kho. Đây chính là chỗ báo cáo lưu chuyển tiền tệ tồn tại để trả lời.",
      },
      {
        type: "closing",
        lines: [
          "Kỳ kế toán đóng lại, tài khoản tạm thời về 0, và bảng cân đối mang mọi thứ còn lại sang kỳ mới.",
          "Đó là lý do bảng cân đối kể được lịch sử của cả doanh nghiệp, còn báo cáo kết quả kinh doanh chỉ kể được một năm.",
        ],
      },
    ],
  },
];
