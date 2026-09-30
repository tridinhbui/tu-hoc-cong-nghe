import type { Lesson } from "./lesson-types";

// Chặng "Phân tích dữ liệu với AI đơn giản hơn bạn nghĩ" (ids 1820-1825,
// personal track, Chặng 26 của nhóm "Công nghệ cho người đi làm").
//
// Người học là kế toán, FP&A, vận hành, marketing đã có bảng số trong Excel hoặc
// Google Sheets. Chặng này không dạy thống kê hay lập trình: nó dạy thứ tự làm
// việc - làm sạch, hỏi đúng câu, để AI đề xuất, người kiểm từng số - để AI giúp
// nhanh hơn mà không làm sai con số gửi sếp.
//
// Không trùng với các chặng Excel (1431-1436), Kế hoạch FP&A (1511-1515) hay
// "Dữ liệu" (1493-1494): những chặng đó dạy kỹ thuật bảng tính và tư duy dữ
// liệu; chặng này dạy cách đưa AI vào giữa quy trình mà vẫn giữ quyền kiểm.
// Phép tách giá/lượng ở bài 4 cùng quy ước với bài 1204 (lệch do lượng, lệch do
// đơn giá), và nguyên tắc "hỏi vì sao trùng trước khi xoá" ở bài 1 cùng tinh
// thần bài 1493.

export const WORK_DATA_AI_LESSONS: Lesson[] = [
  {
    id: 1820,
    slug: "lam-sach-bang-truoc-khi-hoi-ai",
    title: "Chặng 26, Bài 1: Làm sạch bảng trước khi hỏi AI",
    subtitle: "AI trả lời sai phần lớn vì bảng bẩn, không phải vì AI kém.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧹",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Bảng xuất từ phần mềm kế toán, CRM hay hệ thống bán hàng hầu như không bao giờ sạch: ô gộp, dòng tổng xen giữa, số lưu dạng chữ. Người đọc nhìn là hiểu, nhưng AI và công thức thì đọc từng ô. Mười phút làm sạch trước khi hỏi tiết kiệm cả buổi chiều đi tìm vì sao con số không khớp.",
    openingQuestion:
      "Bạn dán bảng công nợ vào trợ lý AI và hỏi \"tổng nợ phải thu là bao nhiêu\". AI trả lời gấp đôi con số trên sổ. Nguyên nhân hay gặp nhất là gì?",
    openingOptions: [
      "Bảng có sẵn các dòng \"Cộng nhóm\" xen giữa, AI cộng cả chúng",
      "AI không đọc được tiếng Việt có dấu nên đoán sai tên cột",
      "Trợ lý AI chỉ đọc được tệp CSV, còn tệp Excel thì bị đọc lệch",
      "Số tiền quá lớn, vượt giới hạn tính toán mà một mô hình AI xử lý được",
    ],
    correctOption: 0,
    explanation:
      "Báo cáo xuất từ phần mềm thường chèn dòng cộng nhóm và dòng tổng để người đọc tiện xem. Với người, đó là dòng tóm tắt. Với AI hay hàm SUM, đó chỉ là một dòng số như mọi dòng khác, nên mỗi khoản bị cộng hai lần: một lần ở dòng chi tiết, một lần ở dòng cộng nhóm. AI đọc tiếng Việt và tệp Excel bình thường, và con số vài tỷ không làm nó tính sai. Lỗi nằm ở bảng, nên sửa ở bảng: xoá mọi dòng tổng, để công cụ tự cộng.",
    diagram: [
      { label: "Bảng xuất từ phần mềm: dành cho mắt người đọc", arrow: true },
      { label: "Làm sạch: bỏ ô gộp, dòng tổng, đổi số và ngày về đúng kiểu", arrow: true },
      { label: "Kiểm nhanh: tổng khớp sổ, số dòng khớp số chứng từ", arrow: true },
      { label: "Mới hỏi AI, và câu trả lời mới đáng tin" },
    ],
    realWorldExample: {
      company: "Cơ quan Y tế Công cộng Anh (Public Health England), 2020",
      description:
        "Tháng 10/2020, gần 16.000 ca nhiễm COVID-19 bị bỏ sót khỏi báo cáo hằng ngày vì dữ liệu được ghép qua một định dạng Excel cũ có giới hạn số dòng; các dòng vượt giới hạn bị cắt đi mà không báo lỗi. Không ai tính sai cả - dữ liệu mất ngay ở bước chuẩn bị bảng, trước khi ai kịp phân tích.",
    },
    quiz: [
      {
        question: "Cột \"Số tiền\" có ô ghi \"1.250.000\" căn lề trái, ô khác căn lề phải. Điều đó báo hiệu gì?",
        options: [
          "Ô căn trái có thể đang là chữ, không phải số",
          "Hai ô dùng hai phông chữ khác nhau",
          "Ô căn trái là số âm được định dạng khác đi",
          "Người nhập đã căn lề tay cho đẹp, không sao",
        ],
        correct: 0,
        explanation:
          "Excel và Google Sheets mặc định căn số sang phải và chữ sang trái. Một con số căn trái thường là số bị lưu dạng chữ, hay gặp khi dấu phân cách hàng nghìn không khớp cài đặt vùng. Hàm SUM bỏ qua nó mà không báo lỗi, và AI có thể đọc nó theo kiểu khác, nên tổng thiếu đúng khoản đó.",
      },
      {
        question: "Cột ngày có \"03/04/2026\". Làm sao biết đó là 3 tháng 4 hay 4 tháng 3?",
        options: [
          "Tìm trong cột một ngày có phần đầu lớn hơn 12, như 25/04",
          "Hỏi AI, vì nó tự biết người Việt ghi ngày trước tháng sau",
          "Xem năm: năm 2026 thì mặc định theo kiểu ngày trước tháng sau",
          "Đổi định dạng ô sang kiểu ngày dài để Excel tự hiện đúng",
        ],
        correct: 0,
        explanation:
          "Một ngày như 25/04 chỉ có thể là ngày 25 tháng 4, nên nó cho biết cả cột theo quy ước nào. AI chỉ đoán, và phần mềm xuất dữ liệu có thể theo kiểu Mỹ dù người dùng ở Việt Nam. Đổi định dạng hiển thị không sửa được giá trị đã bị hiểu sai lúc nhập - nó chỉ hiện cái sai theo cách khác.",
      },
      {
        question: "Bảng có hai dòng giống hệt nhau từng ô. Nên làm gì trước khi xoá một dòng?",
        options: [
          "Tìm hiểu vì sao trùng: nhập hai lần hay hai giao dịch thật",
          "Xoá ngay, vì dòng trùng chắc chắn là lỗi nhập liệu",
          "Giữ cả hai và chia đôi số tiền cho mỗi dòng để khỏi mất gì",
          "Dùng chức năng xoá trùng lặp cho cả bảng một lần là xong",
        ],
        correct: 0,
        explanation:
          "Hai hoá đơn cùng khách, cùng ngày, cùng số tiền có thể là hai giao dịch thật - ví dụ khách mua hai lần. Cũng có thể là lỗi ghép bảng làm nhân đôi dòng; khi đó xoá dòng chỉ che mất lỗi ở bước ghép. Tìm lý do trước, và ghi lại quyết định. Chia đôi số tiền là bịa ra dữ liệu mới.",
      },
      {
        question: "Vì sao ô gộp (merged cells) gây rắc rối khi lọc hoặc hỏi AI?",
        options: [
          "Chỉ ô đầu tiên giữ giá trị, các dòng còn lại để trống",
          "Ô gộp làm tệp nặng hơn nên AI không đọc hết được",
          "Ô gộp khiến màu nền của bảng bị mất khi xuất CSV",
          "Ô gộp làm công thức trong bảng bị khoá, không sửa được",
        ],
        correct: 0,
        explanation:
          "Khi gộp ba ô \"Miền Bắc\", giá trị chỉ nằm ở ô đầu; hai dòng dưới thực ra trống. Lọc theo Miền Bắc chỉ ra một dòng, còn AI thấy hai dòng không có khu vực. Cách sửa: bỏ gộp rồi điền giá trị xuống cho mọi dòng, để mỗi dòng tự đủ thông tin.",
      },
      {
        question: "Cách kiểm nhanh nhất rằng bảng đã sạch trước khi hỏi AI là gì?",
        options: [
          "Đối chiếu tổng và số dòng với sổ hoặc báo cáo gốc",
          "Nhờ chính AI đó xác nhận giúp là bảng đã sạch rồi",
          "Tô màu toàn bộ bảng để nhìn cho dễ thấy chỗ lỗi",
          "Sắp xếp bảng theo cột đầu tiên xem có lạ gì không",
        ],
        correct: 0,
        explanation:
          "Tổng doanh thu phải khớp sổ cái, số dòng phải khớp số hoá đơn trong kỳ. Hai con số này bắt được dòng tổng sót lại, dòng trùng, và số lưu dạng chữ bị bỏ qua. AI xác nhận \"bảng sạch\" không phải bằng chứng; sắp xếp và tô màu thì chỉ thấy được lỗi mà mắt tình cờ nhìn trúng.",
      },
    ],
    keyTakeaways: [
      "AI trả lời sai thường vì bảng bẩn, không phải vì AI kém.",
      "Năm vết bẩn hay gặp: ô gộp, số dạng chữ, ngày lộn định dạng, dòng tổng xen giữa, dòng trùng.",
      "Bảng sạch: một dòng tiêu đề, mỗi dòng một bản ghi, mỗi cột một kiểu dữ liệu.",
      "Hỏi vì sao dòng trùng trước khi xoá.",
      "Đối chiếu tổng và số dòng với sổ gốc trước khi hỏi bất cứ câu nào.",
    ],
    practicePrompt: {
      question: "Bảng doanh thu xuất từ phần mềm có dòng \"Tổng Quý 1\" nằm giữa tháng 3 và tháng 4. Bạn định hỏi AI \"tháng nào doanh thu cao nhất\". Làm gì trước?",
      options: [
        "Xoá dòng \"Tổng Quý 1\" rồi đối chiếu tổng còn lại với sổ",
        "Dặn AI trong câu hỏi \"bỏ qua các dòng tổng nếu thấy có\"",
        "Tô đậm dòng tổng để AI nhận ra và tự bỏ qua khi tính",
        "Hỏi luôn, vì câu này chỉ cần so sánh chứ không cần cộng",
      ],
      correct: 0,
      explanation:
        "Dòng \"Tổng Quý 1\" lớn hơn mọi tháng, nên câu \"tháng nào cao nhất\" sẽ trả về chính nó - so sánh cũng bị ảnh hưởng, không chỉ phép cộng. Dặn AI bỏ qua có thể được làm theo, có thể không, và bạn không biết lần này nó có làm hay không. Định dạng in đậm thì AI thường không thấy. Xoá khỏi dữ liệu là cách duy nhất chắc chắn.",
    },
    summary: {
      keyIdea: "Làm sạch bảng trước, hỏi AI sau - AI chỉ tính đúng trên dữ liệu đúng.",
      formula: "Bỏ ô gộp + bỏ dòng tổng + số về số + ngày về ngày + xét dòng trùng → đối chiếu tổng → hỏi.",
      commonMistake: "Dán nguyên báo cáo xuất từ phần mềm vào AI, kèm cả dòng tổng và ô gộp.",
      action: "Lấy một bảng bạn dùng tuần này, tìm đủ năm loại vết bẩn và ghi lại mỗi loại có bao nhiêu chỗ.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở một bảng bạn hay xuất từ phần mềm. Tạo bản sao, rồi làm sạch theo năm bước trong bài. Ghi lại tổng trước và sau khi làm sạch, và đối chiếu với sổ.",
      secondary: "Nếu bạn phải làm việc này mỗi tháng, bài Power Query trong chặng Excel giúp bạn làm một lần rồi dùng lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Lan làm kế toán công nợ. Cuối tháng chị xuất bảng từ phần mềm, dán vào ChatGPT và hỏi \"khách nào nợ nhiều nhất\". AI trả lời \"Cộng nhóm Miền Nam\" - vì với nó, đó cũng là một dòng có con số lớn nhất. Chặng này bắt đầu từ bước mà ai cũng muốn bỏ qua.",
      },
      {
        type: "feynman",
        title: "Làm sạch dữ liệu đơn giản hơn bạn nghĩ",
        intro: "Nấu ăn ai cũng biết: rau mua về phải nhặt, rửa, thái đều rồi mới cho vào nồi. Đầu bếp giỏi mấy cũng không cứu được mớ rau còn nguyên đất.",
        columns: ["Thành phần", "Nấu một bữa cơm", "Phân tích một bảng số"],
        rows: [
          ["Nguyên liệu", "Rau, thịt mua ngoài chợ", "Bảng xuất từ phần mềm kế toán, CRM, bán hàng"],
          ["Nhặt và rửa", "Bỏ lá úa, rửa sạch đất cát", "Bỏ ô gộp, dòng tổng, dòng trùng không có lý do"],
          ["Sơ chế đồng đều", "Thái cùng cỡ để chín đều", "Mọi ngày một định dạng, mọi số đúng kiểu số"],
          ["Đầu bếp", "Nấu giỏi nhưng không nhặt rau hộ", "AI tính nhanh nhưng tính trên đúng thứ bạn đưa"],
        ],
        oneLiner: "Nhặt rau trước khi nấu: làm sạch bảng trước khi hỏi, vì AI chỉ nấu được thứ bạn cho vào nồi.",
      },
      { type: "heading", text: "Năm vết bẩn hay gặp nhất" },
      {
        type: "list",
        items: [
          "Ô gộp (merged cells): giá trị chỉ nằm ở ô đầu. Sửa: bỏ gộp, điền giá trị xuống mọi dòng.",
          "Số lưu dạng chữ: căn lề trái, hàm SUM bỏ qua. Hay do dấu chấm và dấu phẩy không khớp cài đặt vùng. Sửa: đổi cả cột về kiểu số và kiểm lại tổng.",
          "Ngày lộn định dạng: 03/04 là 3/4 hay 4/3? Tìm một ngày có phần đầu lớn hơn 12 để biết quy ước, rồi đưa cả cột về một kiểu, tốt nhất là YYYY-MM-DD.",
          "Dòng tổng xen giữa: \"Cộng nhóm\", \"Tổng Quý 1\". Sửa: xoá hết - công cụ và AI sẽ tự cộng.",
          "Dòng trùng: hỏi vì sao trùng trước. Hai giao dịch thật thì giữ, lỗi nhập thì xoá, lỗi ghép bảng thì sửa ở bước ghép.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng để đọc",
          text: "Có tiêu đề nhiều tầng, ô gộp cho đẹp, dòng cộng nhóm, màu sắc đánh dấu. Tốt để in ra và trình bày.",
        },
        right: {
          label: "Bảng để phân tích (dữ liệu gọn - tidy data)",
          text: "Một dòng tiêu đề, mỗi dòng một bản ghi, mỗi cột một kiểu dữ liệu, không ô gộp, không dòng tổng. Tốt để lọc, làm bảng tổng hợp và hỏi AI.",
        },
      },
      {
        type: "paragraph",
        text: "Giữ hai thứ tách nhau: một sheet dữ liệu gọn làm nguồn, và các bảng trình bày tính ra từ nó. Đừng dọn trực tiếp trên bảng trình bày rồi lại tô vẽ tiếp.",
      },
      { type: "heading", text: "Nhờ AI tìm vết bẩn, không phải nhờ nó tự dọn" },
      {
        type: "code",
        language: "text",
        caption: "Prompt mẫu: dán tiêu đề và khoảng 20 dòng đầu (đã che tên khách), không dán cả tệp.",
        code: `Dưới đây là 20 dòng đầu của một bảng công nợ, xuất từ phần mềm kế toán.
Tên khách đã được thay bằng mã.

Đừng tính gì cả. Hãy liệt kê những vấn đề có thể làm sai phép tính:
- ô trống bất thường (có thể do ô gộp)
- số có thể đang lưu dạng chữ
- cột ngày có thể bị lẫn quy ước ngày/tháng
- dòng trông như dòng tổng hoặc dòng cộng nhóm
- dòng trùng lặp

Với mỗi vấn đề, ghi số dòng và lý do bạn nghi ngờ.

[dán dữ liệu ở đây]`,
      },
      {
        type: "callout",
        label: "Dữ liệu nhạy cảm",
        text: "Bảng công nợ, lương, hợp đồng có tên khách và số tiền thật. Trước khi dán vào một công cụ AI, thay tên bằng mã và chỉ dán vài chục dòng mẫu. Với tệp thật, dùng công cụ AI mà công ty đã duyệt, không dùng tài khoản cá nhân.",
      },
      {
        type: "closing",
        lines: [
          "AI không nhặt rau hộ bạn - nhưng nó chỉ cho bạn thấy lá nào úa.",
          "Bài sau: bảng đã sạch, giờ hỏi câu gì cho đúng.",
        ],
      },
    ],
  },
  {
    id: 1821,
    slug: "hoi-dung-cau-voi-bang-tong-hop",
    title: "Chặng 26, Bài 2: Hỏi đúng câu với bảng tổng hợp (pivot)",
    subtitle: "Mọi câu hỏi kinh doanh về con số đều tách được thành \"theo cái gì\" và \"đo cái gì\".",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "Bảng tổng hợp (pivot table) trả lời được phần lớn câu hỏi sếp hay hỏi - \"khu vực nào bán tốt nhất\", \"chi phí tháng này đi đâu\" - trong vài giây và không cần công thức. Cái khó không phải thao tác mà là dịch câu hỏi sang ngôn ngữ của nó. Dịch được thì bạn tự làm, hoặc hỏi AI một câu rõ ràng thay vì một câu mơ hồ.",
    openingQuestion:
      "Sếp hỏi: \"Doanh thu từng khu vực theo từng tháng quý này thế nào?\" Trong bảng tổng hợp, cái gì là số đo (measure)?",
    openingOptions: [
      "Tổng doanh thu",
      "Khu vực và tháng",
      "Quý hiện tại",
      "Số dòng đơn hàng",
    ],
    correctOption: 0,
    explanation:
      "Số đo là con số được cộng, đếm hay lấy trung bình - ở đây là tổng doanh thu. Khu vực và tháng là chiều (dimension): cách bạn chia nhỏ con số ra, một cái vào hàng, một cái vào cột. \"Quý này\" (quý hiện tại) là bộ lọc - nó giới hạn dữ liệu chứ không chia nhỏ. Số dòng đơn hàng cũng là một số đo, nhưng là số đo của một câu hỏi khác (bán được bao nhiêu đơn), không phải câu sếp hỏi.",
    diagram: [
      { label: "Câu hỏi kinh doanh bằng lời", arrow: true },
      { label: "Tách: đo cái gì (số đo), theo cái gì (chiều), trong phạm vi nào (lọc)", arrow: true },
      { label: "Đặt vào bảng tổng hợp: hàng, cột, giá trị, bộ lọc", arrow: true },
      { label: "Đọc kết quả, rồi mới hỏi \"vì sao\"" },
    ],
    realWorldExample: {
      company: "Tình huống: nhóm marketing 4 người",
      description:
        "Mỗi thứ Hai, một bạn trong nhóm mất gần hai giờ lọc tay bảng chiến dịch để trả lời \"kênh nào ra đơn rẻ nhất tuần trước\". Dịch câu đó thành chiều là kênh, số đo là tổng chi phí và số đơn, lọc theo tuần - một bảng tổng hợp làm việc đó trong một phút, và tuần sau chỉ cần làm mới.",
    },
    quiz: [
      {
        question: "Câu \"Mỗi nhân viên bán được bao nhiêu đơn tháng 9?\" tách thế nào?",
        options: [
          "Chiều: nhân viên. Số đo: đếm số đơn. Lọc: tháng 9",
          "Chiều: tháng 9. Số đo: nhân viên. Lọc: số đơn hàng",
          "Chiều: số đơn. Số đo: nhân viên. Lọc: không cần",
          "Chiều: nhân viên và tháng. Số đo: tổng tiền. Lọc: đơn",
        ],
        correct: 0,
        explanation:
          "\"Mỗi nhân viên\" là cách chia, nên là chiều. \"Bao nhiêu đơn\" là con số cần đếm, nên là số đo và dùng phép đếm chứ không phải phép cộng. \"Tháng 9\" giới hạn dữ liệu nên là bộ lọc. Đặt tháng vào chiều cũng ra số, nhưng làm bảng rộng thêm một cột không ai hỏi.",
      },
      {
        question: "Bảng tổng hợp hiện doanh thu Miền Trung giảm 30%. Câu hỏi nào nó KHÔNG tự trả lời được?",
        options: [
          "Vì sao doanh thu Miền Trung giảm",
          "Giảm ở những sản phẩm nào",
          "Tháng nào giảm mạnh nhất",
          "Số đơn hay giá trị đơn giảm",
        ],
        correct: 0,
        explanation:
          "Bảng tổng hợp chia nhỏ con số được: theo sản phẩm, theo tháng, theo số đơn và giá trị mỗi đơn. Nó chỉ ra giảm ở đâu. Còn vì sao - mất một khách lớn, đối thủ giảm giá, mưa bão - nằm ngoài bảng, phải hỏi đội bán hàng. AI đọc bảng cũng chỉ đoán được phần này.",
      },
      {
        question: "Cột \"Biên lợi nhuận %\" có sẵn cho từng đơn. Vì sao không nên lấy trung bình cột đó theo khu vực?",
        options: [
          "Đơn nhỏ và đơn lớn được tính nặng như nhau, kết quả lệch",
          "Pivot không lấy được trung bình của cột phần trăm",
          "Trung bình phần trăm luôn cho ra kết quả lớn hơn một trăm",
          "Vì cột phần trăm phải được đặt vào chiều chứ không phải số đo",
        ],
        correct: 0,
        explanation:
          "Một đơn 1 triệu lãi 50% và một đơn 100 triệu lãi 10%: trung bình hai tỷ lệ là 30%, nhưng biên thật là 10,5 triệu trên 101 triệu, khoảng 10,4%. Đúng là cộng lợi nhuận, cộng doanh thu, rồi mới chia. Bảng tổng hợp lấy trung bình được - chính vì nó làm được nên lỗi này mới hay gặp.",
      },
      {
        question: "Dữ liệu nguồn vừa được thêm 200 dòng tháng mới. Bảng tổng hợp trong Excel vẫn hiện số cũ. Vì sao?",
        options: [
          "Pivot trong Excel không tự cập nhật; cần làm mới",
          "Pivot chỉ nhận số dòng cố định lúc tạo, dòng sau bị bỏ",
          "Dòng mới lưu dạng chữ nên bị bỏ qua",
          "Excel phải khởi động lại mới đọc được",
        ],
        correct: 0,
        explanation:
          "Pivot trong Excel lưu một bản chụp dữ liệu và chỉ tính lại khi bạn làm mới (Refresh). Nếu nguồn là một vùng cố định thay vì một Bảng (Table), dòng mới nằm ngoài vùng và có làm mới cũng không vào. Google Sheets thì tự cập nhật. Số dạng chữ là vấn đề có thật, nhưng không làm bảng đứng yên ở số cũ.",
      },
      {
        question: "Khi nhờ AI dựng bảng tổng hợp, câu hỏi nào cho kết quả dùng được nhất?",
        options: [
          "\"Tổng doanh thu theo khu vực ở hàng, tháng ở cột, chỉ quý 3\"",
          "\"Phân tích bảng này và cho tôi những insight quan trọng nhất\"",
          "\"Làm giúp tôi một bảng tổng hợp thật đẹp để gửi cho sếp xem\"",
          "\"Tóm tắt dữ liệu doanh thu này theo cách bạn thấy hợp lý nhất\"",
        ],
        correct: 0,
        explanation:
          "Câu đúng đã tự tách xong số đo, hai chiều và bộ lọc, nên AI chỉ việc làm và bạn kiểm được. \"Cho tôi insight\" để AI tự chọn câu hỏi - nó sẽ chọn thứ dễ tính, không phải thứ sếp cần. \"Thật đẹp\" nói về trình bày chứ không nói con số nào.",
      },
    ],
    keyTakeaways: [
      "Mọi câu hỏi về con số tách được thành số đo, chiều và bộ lọc.",
      "Số đo là thứ được cộng, đếm, lấy trung bình; chiều là cách chia nhỏ.",
      "Tỷ lệ phải tính lại từ tổng, không lấy trung bình các tỷ lệ.",
      "Bảng tổng hợp cho biết ở đâu, không cho biết vì sao.",
      "Pivot trong Excel phải làm mới khi dữ liệu nguồn đổi.",
    ],
    practicePrompt: {
      question: "Trưởng phòng hỏi: \"Chi phí đi lại quý này của từng phòng ban so với quý trước ra sao?\" Cách đặt bảng tổng hợp nào đúng?",
      options: [
        "Hàng: phòng ban. Cột: quý. Giá trị: tổng chi phí. Lọc: đi lại",
        "Hàng: đi lại. Cột: phòng ban. Giá trị: đếm số quý. Lọc: không",
        "Hàng: quý. Cột: đi lại. Giá trị: tổng chi phí. Lọc: phòng ban",
        "Hàng: phòng ban. Cột: loại chi phí. Giá trị: trung bình. Lọc: quý",
      ],
      correct: 0,
      explanation:
        "Số đo là tổng chi phí. Hai chiều là phòng ban (từng phòng) và quý (quý này so với quý trước). \"Đi lại\" là một loại chi phí, nên là bộ lọc. Lọc chỉ quý này thì mất quý trước để so, và lấy trung bình chi phí thì không trả lời được tổng mỗi phòng đã tiêu bao nhiêu.",
    },
    summary: {
      keyIdea: "Dịch câu hỏi thành số đo, chiều và bộ lọc trước khi mở bảng tổng hợp hay hỏi AI.",
      formula: "Câu hỏi = đo cái gì (giá trị) + theo cái gì (hàng, cột) + trong phạm vi nào (lọc).",
      commonMistake: "Lấy trung bình của cột tỷ lệ, thay vì tính lại tỷ lệ từ tổng tử số và tổng mẫu số.",
      action: "Lấy ba câu sếp hỏi gần đây nhất và tách mỗi câu thành số đo, chiều, bộ lọc.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Viết ra ba câu hỏi về con số bạn nhận được trong tháng này. Tách từng câu thành số đo, chiều và bộ lọc, rồi dựng một bảng tổng hợp cho câu dễ nhất trên bảng đã làm sạch ở bài trước.",
      secondary: "Câu nào không tách được thường là câu \"vì sao\" - ghi lại để hỏi người, không phải hỏi bảng.",
    },
    sections: [
      {
        type: "lead",
        text: "Anh Minh làm FP&A. Sếp nhắn: \"Chi phí tháng này sao cao thế?\" Anh mở bảng 3.000 dòng và lọc tay theo từng loại chi phí, từng phòng, mất cả buổi. Câu hỏi đó thực ra là ba câu nhỏ, và bảng tổng hợp trả lời được hai câu trong vài phút.",
      },
      { type: "heading", text: "Ba phần của một câu hỏi về con số" },
      {
        type: "conceptTable",
        title: "Từ lời nói sang bảng tổng hợp",
        subtitle: "Mỗi phần có một chỗ riêng trong bảng",
        concepts: [
          { vi: "Số đo", en: "Measure", def: "Con số được cộng, đếm hoặc lấy trung bình: doanh thu, số đơn, chi phí. Đặt vào ô Giá trị." },
          { vi: "Chiều", en: "Dimension", def: "Cách chia nhỏ con số: khu vực, tháng, sản phẩm, nhân viên. Đặt vào Hàng hoặc Cột." },
          { vi: "Bộ lọc", en: "Filter", def: "Giới hạn dữ liệu được tính: chỉ quý 3, chỉ chi phí đi lại. Không chia nhỏ, chỉ khoanh vùng." },
          { vi: "Phép gộp", en: "Aggregation", def: "Cộng, đếm, trung bình, lớn nhất. Đếm đơn khác cộng tiền - chọn sai là ra số sai mà trông vẫn hợp lý." },
        ],
      },
      {
        type: "list",
        items: [
          "\"Chi phí tháng này sao cao thế?\" → tách thành: cao hơn bao nhiêu so với tháng trước (số đo: tổng chi phí, chiều: tháng).",
          "Cao ở đâu? → thêm chiều: loại chi phí, rồi phòng ban. Bảng tổng hợp trả lời được.",
          "Vì sao? → bảng chỉ ra dòng nào tăng; lý do phải hỏi người phụ trách dòng đó.",
        ],
      },
      {
        type: "callout",
        label: "Bẫy trung bình của tỷ lệ",
        text: "Cột tỷ lệ (biên lãi, tỷ lệ chuyển đổi) không lấy trung bình được. Cộng tử số, cộng mẫu số, rồi chia. Trong Excel đó là trường tính toán (calculated field); trong Google Sheets cũng có mục tương tự.",
      },
      { type: "heading", text: "Dùng AI ở đâu trong việc này" },
      {
        type: "paragraph",
        text: "Copilot trong Excel và Gemini trong Google Sheets dựng được bảng tổng hợp từ một câu lệnh. ChatGPT, Claude hay Gemini thì hướng dẫn từng bước nếu bạn mô tả bảng. Cả hai cách đều làm tốt khi câu lệnh đã tách sẵn số đo, chiều và bộ lọc - và làm kém khi bạn chỉ xin \"insight\", vì khi đó AI tự chọn câu hỏi thay bạn.",
      },
      {
        type: "comparison",
        left: {
          label: "Câu lệnh mơ hồ",
          text: "\"Phân tích chi phí và cho tôi nhận xét.\" AI sẽ chọn một cách chia bất kỳ và viết nhận xét chung chung, khó kiểm.",
        },
        right: {
          label: "Câu lệnh đã tách",
          text: "\"Tổng chi phí theo loại chi phí ở hàng, tháng 8 và tháng 9 ở cột, chỉ phòng Kinh doanh.\" Kết quả kiểm được bằng một phép lọc tay.",
        },
      },
      {
        type: "closing",
        lines: [
          "Hỏi đúng câu thì nửa việc phân tích đã xong.",
          "Bài sau: khi bảng tổng hợp không đủ, nhờ AI viết công thức và SQL - rồi tự kiểm.",
        ],
      },
    ],
  },
  {
    id: 1822,
    slug: "nho-ai-viet-cong-thuc-va-sql-roi-tu-kiem",
    title: "Chặng 26, Bài 3: Nhờ AI viết công thức và SQL, rồi tự kiểm",
    subtitle: "Mô tả bảng thay vì dán cả tệp; kiểm bằng tính tay trên vài dòng.",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    whyItMatters:
      "AI viết SUMIFS, XLOOKUP hay một câu SQL nhanh hơn bạn tra tài liệu. Nhưng công thức sai thường vẫn ra một con số trông hợp lý, và không có ô nào báo đỏ. Kỹ năng quan trọng không phải là viết công thức mà là mô tả bảng cho AI hiểu, rồi kiểm kết quả bằng vài phép tính tay.",
    openingQuestion:
      "Bạn muốn AI viết công thức tính doanh thu Miền Bắc tháng 7. Nên gửi AI cái gì?",
    openingOptions: [
      "Tên cột, kiểu dữ liệu và 3 dòng ví dụ đã che thông tin",
      "Cả tệp doanh thu gốc để AI tự tìm cột nào là cột nào cho nhanh",
      "Chỉ câu hỏi, vì SUMIFS ở đâu cũng viết như nhau",
      "Ảnh chụp màn hình cả bảng để AI nhìn thấy đúng bố cục của nó",
    ],
    correctOption: 0,
    explanation:
      "AI cần biết cột nằm ở đâu, tên gì, kiểu gì - ngày là ngày thật hay chữ, số tiền có đơn vị gì - và vài dòng ví dụ để thấy hình dạng dữ liệu. Chừng đó đủ để viết đúng công thức. Dán cả tệp đưa dữ liệu thật của khách ra ngoài mà không giúp công thức đúng hơn. Chỉ gửi câu hỏi thì AI phải đoán tên cột và định dạng ngày. Ảnh chụp thì AI phải đọc chữ trong ảnh và vẫn không biết ô ngày là ngày hay chữ.",
    diagram: [
      { label: "Mô tả bảng: tên cột, kiểu, 3 dòng mẫu đã che", arrow: true },
      { label: "Nói rõ câu hỏi: số đo, chiều, bộ lọc", arrow: true },
      { label: "AI viết công thức hoặc SQL, kèm giải thích từng phần", arrow: true },
      { label: "Tính tay trên vài dòng, so với kết quả của công thức" },
    ],
    realWorldExample: {
      company: "Bài báo kinh tế của Reinhart và Rogoff, 2010-2013",
      description:
        "Một nghiên cứu nổi tiếng về nợ công và tăng trưởng, được trích dẫn rộng rãi trong tranh luận chính sách, có một vùng công thức trong bảng tính bỏ sót năm nước khi lấy trung bình. Lỗi được một nghiên cứu sinh phát hiện năm 2013 khi tính lại từ đầu. Công thức không báo lỗi gì - nó chỉ cộng thiếu dòng.",
    },
    quiz: [
      {
        question: "AI viết cho bạn một công thức SUMIFS. Cách kiểm nhanh và chắc nhất là gì?",
        options: [
          "Lọc tay vài dòng thoả điều kiện, cộng, rồi so với kết quả",
          "Hỏi lại chính AI đó xem công thức nó vừa viết có đúng hay không",
          "Xem công thức có chạy ra số mà không báo lỗi gì không",
          "Dán công thức vào ô khác xem có ra cùng kết quả không",
        ],
        correct: 0,
        explanation:
          "Một phép lọc tay trên dữ liệu thật là phép đối chiếu độc lập: nếu hai con số khớp, công thức làm đúng điều bạn muốn. AI tự kiểm thường chỉ đọc lại chính nó. Không báo lỗi chỉ nghĩa là cú pháp đúng - công thức vẫn có thể cộng sai cột hoặc sót điều kiện. Dán ra ô khác thì ra đúng cái sai cũ.",
      },
      {
        question: "Công thức lọc tháng 7 dùng điều kiện ngày \"<= 31/07/2026\". Cột ngày có cả giờ, ví dụ 31/07/2026 15:20. Chuyện gì xảy ra?",
        options: [
          "Các đơn trong ngày 31/7 sau 0 giờ bị bỏ sót",
          "Excel tự bỏ phần giờ nên kết quả vẫn đúng như bình thường",
          "Công thức báo lỗi vì không so sánh được ngày có kèm giờ",
          "Các đơn ngày 31/7 bị cộng hai lần vì có cả ngày lẫn giờ",
        ],
        correct: 0,
        explanation:
          "31/07/2026 không kèm giờ nghĩa là đúng nửa đêm đầu ngày. Đơn lúc 15:20 cùng ngày lớn hơn mốc đó, nên bị loại - không lỗi, chỉ thiếu. Cách an toàn: dùng \"< 01/08/2026\", tức nhỏ hơn đầu ngày của tháng sau. Lỗi này hay gặp ở cả công thức lẫn SQL do AI viết, vì ví dụ mẫu thường không có giờ.",
      },
      {
        question: "Trong câu SQL, GROUP BY khu_vuc có tác dụng gì?",
        options: [
          "Gom các dòng cùng khu vực để tính tổng cho từng khu vực",
          "Sắp xếp kết quả theo khu vực từ A tới Z",
          "Chỉ giữ lại một khu vực có doanh thu cao nhất",
          "Lọc bỏ các dòng không có tên khu vực nào",
        ],
        correct: 0,
        explanation:
          "GROUP BY giống phần \"hàng\" của bảng tổng hợp: nó gom các dòng cùng giá trị lại để SUM, COUNT tính riêng cho từng nhóm. Sắp xếp là việc của ORDER BY, lọc dòng là việc của WHERE. Muốn chỉ giữ khu vực cao nhất thì cần thêm ORDER BY và LIMIT.",
      },
      {
        question: "Vì sao nên yêu cầu AI giải thích từng phần của công thức?",
        options: [
          "Để thấy nó hiểu sai điều kiện nào trước khi bạn dùng",
          "Để công thức chạy nhanh hơn khi bảng có rất nhiều dòng",
          "Vì bảng tính chỉ nhận công thức nào có kèm lời giải thích",
          "Để có sẵn phần chú thích dán vào báo cáo gửi cho sếp đọc",
        ],
        correct: 0,
        explanation:
          "Lời giải thích từng phần cho bạn đọc lại ý định: \"điều kiện 2: cột B bằng Miền Bắc\". Nếu bạn thấy nó đang lọc cột C thay vì B, bạn bắt được lỗi trước khi tính. Giải thích không làm công thức nhanh hơn, và nó để bạn kiểm, không phải để dán vào báo cáo.",
      },
      {
        question: "AI trả về một công thức rất dài, lồng năm hàm IF. Nên làm gì?",
        options: [
          "Xin cách ngắn hơn, hoặc tách thành vài cột phụ dễ kiểm",
          "Dùng luôn, vì công thức dài thường xử lý đủ mọi trường hợp hơn",
          "Tự viết lại từ đầu, vì AI đã viết dài thì chắc chắn là viết sai",
          "Khoá ô công thức để không ai sửa nhầm",
        ],
        correct: 0,
        explanation:
          "Công thức bạn không đọc được thì bạn không kiểm được, và người nhận bàn giao cũng vậy. Tách thành cột phụ, mỗi cột một bước, cho phép kiểm từng bước bằng mắt. Dài không có nghĩa là sai, nhưng dài mà không kiểm được thì rủi ro. Khoá ô chỉ ngăn sửa, không ngăn sai.",
      },
    ],
    keyTakeaways: [
      "Gửi AI mô tả bảng (tên cột, kiểu, 3 dòng mẫu đã che), không gửi cả tệp.",
      "Câu lệnh tốt nói rõ số đo, chiều và bộ lọc như với bảng tổng hợp.",
      "Công thức sai vẫn ra số trông hợp lý - không báo lỗi không có nghĩa là đúng.",
      "Kiểm bằng lọc tay vài dòng và so với kết quả công thức.",
      "Lọc theo tháng: dùng \"nhỏ hơn đầu tháng sau\" để không sót đơn có kèm giờ.",
    ],
    practicePrompt: {
      question: "AI viết SQL tính doanh thu tháng 7 theo khu vực. Bạn kiểm thấy Miền Nam lệch 2% so với bảng tổng hợp. Bước kiểm đầu tiên nên là gì?",
      options: [
        "So điều kiện ngày trong WHERE với bộ lọc ngày của bảng tổng hợp",
        "Bỏ qua, vì chênh 2% là sai số làm tròn chấp nhận được",
        "Nhờ AI viết lại câu SQL khác rồi xem lần này có khớp không",
        "Tin câu SQL hơn, vì cơ sở dữ liệu tính chính xác hơn bảng tính",
      ],
      correct: 0,
      explanation:
        "Tổng tiền không lệch 2% vì làm tròn. Lệch nhỏ ở một khu vực thường do điều kiện biên khác nhau: mốc ngày cuối tháng, đơn huỷ có được tính không, múi giờ. So điều kiện hai bên là tìm ra nguyên nhân; viết lại SQL khác chỉ đổi con số mà không giải thích được vì sao.",
    },
    summary: {
      keyIdea: "Để AI viết công thức, nhưng người kiểm từng kết quả bằng tính tay trên vài dòng.",
      formula: "Mô tả bảng + câu hỏi đã tách → AI viết kèm giải thích → lọc tay vài dòng → so khớp.",
      commonMistake: "Dùng công thức ngay vì nó ra số mà không báo lỗi.",
      action: "Nhờ AI viết một công thức bạn cần tuần này, rồi kiểm bằng lọc tay trước khi dùng.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một con số bạn đang tính tay mỗi tuần. Viết mô tả bảng theo mẫu trong bài, nhờ AI viết công thức, rồi kiểm bằng lọc tay trên ba nhóm khác nhau.",
      secondary: "Lưu lại prompt mô tả bảng - lần sau chỉ cần đổi câu hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Hà làm vận hành, cần doanh thu từng khu vực mỗi tháng. Chị không nhớ cú pháp SUMIFS và chưa từng viết SQL. Chị không cần nhớ - chị cần biết mô tả bảng cho AI, và biết kiểm cái AI đưa lại.",
      },
      { type: "heading", text: "Bước 1: mô tả bảng, không dán cả tệp" },
      {
        type: "code",
        language: "text",
        caption: "Prompt mẫu. Ba dòng ví dụ là dữ liệu bịa cùng hình dạng, không phải dữ liệu thật.",
        code: `Tôi có một bảng trong Excel, sheet "DonHang", vùng A1:E5000, dòng 1 là tiêu đề:
- A: ngay (ngày có kèm giờ, ví dụ 31/07/2026 15:20)
- B: khu_vuc (chữ: Miền Bắc, Miền Trung, Miền Nam)
- C: san_pham (chữ)
- D: so_luong (số nguyên)
- E: doanh_thu (số, đơn vị đồng, đã gồm chiết khấu)

3 dòng ví dụ:
02/07/2026 09:10 | Miền Bắc | SP-A | 3 | 1500000
15/07/2026 14:00 | Miền Nam | SP-B | 1 | 820000
31/07/2026 15:20 | Miền Bắc | SP-A | 2 | 1000000

Viết công thức tính tổng doanh thu Miền Bắc trong tháng 7/2026.
Giải thích từng điều kiện trong công thức.`,
      },
      { type: "heading", text: "Bước 2: đọc công thức AI trả về" },
      {
        type: "code",
        language: "text",
        caption: "Công thức cộng có điều kiện. Lưu ý mốc cuối là \"nhỏ hơn ngày 1/8\", không phải \"nhỏ hơn hoặc bằng 31/7\".",
        code: `=SUMIFS(E:E, B:B, "Miền Bắc", A:A, ">="&DATE(2026,7,1), A:A, "<"&DATE(2026,8,1))`,
      },
      {
        type: "paragraph",
        text: "Đọc từ trái sang: cộng cột E, với điều kiện cột B là Miền Bắc, cột A từ đầu ngày 1/7 và trước đầu ngày 1/8. Nếu AI viết \"<=\"&DATE(2026,7,31), mọi đơn trong ngày 31/7 sau nửa đêm sẽ bị bỏ sót - không lỗi, chỉ thiếu.",
      },
      {
        type: "code",
        language: "sql",
        caption: "Cùng câu hỏi, nhưng cho mọi khu vực, khi dữ liệu nằm trong cơ sở dữ liệu thay vì bảng tính.",
        code: `SELECT
  khu_vuc,
  SUM(doanh_thu) AS tong_doanh_thu,
  COUNT(*)       AS so_dong
FROM don_hang
WHERE ngay >= '2026-07-01'
  AND ngay <  '2026-08-01'
GROUP BY khu_vuc
ORDER BY tong_doanh_thu DESC;`,
      },
      { type: "heading", text: "Bước 3: kiểm bằng tay" },
      {
        type: "list",
        items: [
          "Lọc tay: cột B là Miền Bắc, cột A trong tháng 7. Xem tổng ở thanh trạng thái, so với kết quả công thức.",
          "Kiểm biên: có đơn ngày 31/7 buổi chiều không? Có đơn ngày 1/8 lúc 0 giờ không? Chúng được tính đúng phía chưa?",
          "Kiểm số dòng: COUNT(*) trong SQL có khớp số dòng sau khi lọc tay không.",
          "Kiểm một nhóm nhỏ: chọn khu vực có ít đơn nhất, cộng tay từng đơn.",
        ],
      },
      {
        type: "callout",
        label: "Công thức sai không báo đỏ",
        text: "Một công thức cộng nhầm cột hay sót điều kiện vẫn cho ra một con số trông rất hợp lý. Chỉ có đối chiếu với một cách tính khác mới bắt được nó. Con số nào gửi đi, người gửi chịu trách nhiệm - không phải AI.",
      },
      {
        type: "closing",
        lines: [
          "AI viết, bạn kiểm - và bạn kiểm bằng số, không bằng niềm tin.",
          "Bài sau: dùng đúng cách này cho việc FP&A làm mỗi tháng - phân tích biến động.",
        ],
      },
    ],
  },
  {
    id: 1823,
    slug: "phan-tich-bien-dong-doanh-thu-chi-phi-voi-ai",
    title: "Chặng 26, Bài 4: Phân tích biến động doanh thu - chi phí với AI",
    subtitle: "Thực tế so với kế hoạch và cùng kỳ, tách giá và lượng, để AI viết nhận xét nhưng người kiểm từng con số.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Mỗi tháng FP&A và kế toán quản trị phải trả lời \"vì sao lệch kế hoạch\". Viết nhận xét cho ba mươi dòng chi phí là việc AI làm rất nhanh. Nhưng AI hay nhầm dấu, nhầm mẫu số, và rất tự tin khi bịa lý do. Bài này cho bạn khung tính đúng trước, rồi mới để AI viết lời.",
    openingQuestion:
      "Kế hoạch: 1.000 đơn × 200.000 đ = 200 triệu. Thực tế: 1.100 đơn × 190.000 đ = 209 triệu. Phần chênh lệch do LƯỢNG là bao nhiêu?",
    openingOptions: [
      "+20 triệu (= 100 đơn × 200.000 đ giá kế hoạch)",
      "+9 triệu (= 209 − 200, tổng chênh lệch)",
      "+19 triệu (= 100 đơn × 190.000 đ giá thực tế)",
      "−11 triệu (= −10.000 đ × 1.100 đơn thực tế)",
    ],
    correctOption: 0,
    explanation:
      "Chênh lệch do lượng tính bằng số đơn tăng thêm nhân giá KẾ HOẠCH: 100 × 200.000 = 20 triệu. Chênh lệch do giá tính bằng mức giá giảm nhân lượng THỰC TẾ: −10.000 × 1.100 = −11 triệu. Cộng lại +20 − 11 = +9 triệu, đúng bằng tổng chênh lệch 209 − 200. Dùng giá thực tế cho phần lượng (19 triệu) thì hai phần cộng lại không khớp tổng. Con số −11 triệu là phần do giá, không phải do lượng.",
    diagram: [
      { label: "Tính chênh lệch: thực tế − kế hoạch, và so cùng kỳ", arrow: true },
      { label: "Tách doanh thu thành phần lượng và phần giá", arrow: true },
      { label: "Chọn dòng lệch lớn cả về số tiền lẫn tỷ lệ", arrow: true },
      { label: "AI viết nháp nhận xét; người kiểm từng con số và lý do" },
    ],
    realWorldExample: {
      company: "Tình huống: phòng FP&A của một chuỗi bán lẻ vừa",
      description:
        "Mỗi kỳ đóng sổ, hai chuyên viên mất khoảng một ngày viết nhận xét biến động cho hơn 40 dòng chi phí. Khi chuyển sang để AI viết nháp từ bảng đã tính sẵn chênh lệch, phần viết còn khoảng hai giờ - nhưng họ giữ một bước bắt buộc: mỗi con số trong nhận xét phải tìm thấy trong bảng, và mỗi lý do phải có người phụ trách dòng đó xác nhận.",
    },
    quiz: [
      {
        question: "Chi phí marketing kế hoạch 30 triệu, thực tế 24 triệu. Tỷ lệ chênh lệch so với kế hoạch là bao nhiêu?",
        options: [
          "−20% (= (24 − 30) ÷ 30 kế hoạch)",
          "−25% (= (24 − 30) ÷ 24 thực tế)",
          "+20% (= (30 − 24) ÷ 30, trừ ngược)",
          "−6% (= 24 − 30, coi số tiền là %)",
        ],
        correct: 0,
        explanation:
          "Chênh lệch so với kế hoạch = (thực tế − kế hoạch) ÷ kế hoạch = −6 ÷ 30 = −20%. Chia cho thực tế cho ra −25%, là lỗi mẫu số rất hay gặp. Trừ ngược chiều làm đổi dấu. Với chi phí, âm 20% nghĩa là tiêu ít hơn kế hoạch - thường là tốt, nhưng phải hỏi có phải chiến dịch bị hoãn không.",
      },
      {
        question: "Doanh thu tháng 9 thấp hơn tháng 8 nhưng cao hơn tháng 9 năm ngoái 12%. So sánh nào nên đặt lên đầu nếu ngành có tính mùa vụ?",
        options: [
          "So với tháng 9 năm ngoái (cùng kỳ)",
          "So với tháng 8 liền trước",
          "So với trung bình tháng năm ngoái",
          "So với tháng đỉnh của năm nay",
        ],
        correct: 0,
        explanation:
          "Ngành có mùa vụ thì tháng 9 luôn khác tháng 8 vì mùa, không phải vì kinh doanh tốt lên hay xấu đi. So với tháng 9 năm ngoái loại được yếu tố mùa. Trung bình năm chia 12 thì xoá mất mùa vụ; so với tháng đỉnh thì luôn thấy thiếu. So với tháng trước vẫn hữu ích, nhưng không nên đứng đầu.",
      },
      {
        question: "AI viết nhận xét: \"Doanh thu vượt kế hoạch 9 triệu nhờ giá bán tăng.\" Bảng của bạn cho giá giảm 10.000 đ/đơn. Chuyện gì đã xảy ra?",
        options: [
          "AI bịa ra lý do nghe hợp lý cho một con số đúng",
          "AI đọc sai con số 9 triệu nên suy ra sai lý do theo",
          "Bảng của bạn sai, vì AI tính toán chính xác hơn người làm",
          "Nhận xét vẫn đúng, vì vượt kế hoạch thì chắc chắn là giá tăng",
        ],
        correct: 0,
        explanation:
          "Con số 9 triệu đúng, nhưng lý do sai hẳn: tăng là nhờ lượng (+20 triệu), còn giá kéo xuống (−11 triệu). AI viết câu trôi chảy và tự điền lý do phổ biến nhất khi không được cho phép tách. Vì vậy nhận xét phải kiểm cả con số lẫn lý do, và lý do phải khớp phép tách giá - lượng.",
      },
      {
        question: "Dòng nào nên được viết nhận xét trước trong báo cáo biến động?",
        options: [
          "Dòng lệch lớn cả về số tiền lẫn phần trăm",
          "Dòng có phần trăm lệch cao nhất",
          "Dòng có số tiền lớn nhất bảng",
          "Mọi dòng, theo thứ tự tài khoản",
        ],
        correct: 0,
        explanation:
          "Một dòng văn phòng phẩm lệch 300% có thể chỉ là 2 triệu; một dòng lương lớn nhất bảng mà lệch 0,5% thì không có gì để nói. Nhận xét đáng đọc là những dòng vượt cả hai ngưỡng, ví dụ trên 5% VÀ trên 10 triệu. Viết đều mọi dòng làm người đọc không thấy đâu là chuyện chính.",
      },
      {
        question: "Chi phí giá vốn thực tế cao hơn kế hoạch 8%. Vì sao chưa thể kết luận là xấu?",
        options: [
          "Vì còn phải xem doanh thu và lượng bán có tăng tương ứng không",
          "Vì chi phí tăng thì lúc nào cũng là dấu hiệu công ty đang lớn mạnh lên",
          "Vì 8% vẫn còn nằm dưới mức 10% mà mọi công ty đều chấp nhận",
          "Vì giá vốn không bao giờ được tính vào phân tích biến động",
        ],
        correct: 0,
        explanation:
          "Giá vốn đi theo lượng bán. Nếu bán nhiều hơn kế hoạch 10% mà giá vốn chỉ tăng 8%, mỗi đơn còn rẻ hơn - tốt. Nếu lượng không đổi mà giá vốn tăng 8%, đơn giá đầu vào đang tăng - cần xem. Cùng một con số, hai kết luận ngược nhau, và không có ngưỡng 10% nào chung cho mọi công ty.",
      },
    ],
    keyTakeaways: [
      "Chênh lệch = thực tế − kế hoạch; tỷ lệ chia cho kế hoạch.",
      "So cả kế hoạch lẫn cùng kỳ; ngành mùa vụ thì cùng kỳ quan trọng hơn tháng trước.",
      "Lượng: chênh lệch số lượng × giá kế hoạch. Giá: chênh lệch giá × lượng thực tế. Hai phần cộng lại bằng tổng.",
      "Viết nhận xét cho dòng lệch lớn cả về tiền lẫn phần trăm.",
      "AI viết nháp; người kiểm từng con số và hỏi người phụ trách về lý do.",
    ],
    practicePrompt: {
      question: "Kế hoạch: 500 suất × 80.000 đ = 40 triệu. Thực tế: 450 suất × 90.000 đ = 40,5 triệu. Chênh lệch do GIÁ là bao nhiêu?",
      options: [
        "+4,5 triệu (= 10.000 đ × 450 suất thực tế)",
        "+5 triệu (= 10.000 đ × 500 suất kế hoạch)",
        "−4 triệu (= −50 suất × 80.000 đ, phần do lượng)",
        "+0,5 triệu (= 40,5 − 40, tổng chênh lệch cả hai phần)",
      ],
      correct: 0,
      explanation:
        "Phần giá = (90.000 − 80.000) × 450 suất thực tế = +4,5 triệu. Phần lượng = (450 − 500) × 80.000 giá kế hoạch = −4 triệu. Cộng lại +4,5 − 4 = +0,5 triệu, khớp tổng 40,5 − 40. Nhân chênh lệch giá với lượng kế hoạch cho 5 triệu, và khi đó hai phần không còn cộng ra đúng tổng.",
    },
    summary: {
      keyIdea: "Tính chênh lệch và tách giá - lượng bằng công thức trước, rồi mới để AI viết lời.",
      formula: "Lượng = (SL thực tế − SL kế hoạch) × giá kế hoạch; Giá = (giá thực tế − giá kế hoạch) × SL thực tế.",
      commonMistake: "Để AI vừa tính vừa viết nhận xét, rồi dán thẳng vào báo cáo mà không kiểm con số và lý do.",
      action: "Lấy báo cáo tháng trước, tách giá - lượng cho dòng doanh thu lớn nhất và kiểm hai phần có cộng ra tổng không.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Làm bài tập Python trong bài, rồi áp dụng cho ba dòng thật trong báo cáo tháng này: tính chênh lệch, tỷ lệ, và tách giá - lượng cho dòng doanh thu. Nhờ AI viết nháp nhận xét và gạch chân mọi con số để kiểm.",
      secondary: "Lý do nào AI đưa ra mà bảng không chứng minh được, gửi hỏi người phụ trách dòng đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Ngày thứ ba sau khi đóng sổ, anh Tuấn bên FP&A nhận câu hỏi quen thuộc: \"Tháng này sao lệch kế hoạch?\" Anh có bảng thực tế và kế hoạch cho 40 dòng. Phần tính là việc của công thức. Phần viết có thể là việc của AI. Phần kiểm thì chỉ có thể là việc của anh.",
      },
      { type: "heading", text: "Ba phép so sánh, ba câu hỏi khác nhau" },
      {
        type: "list",
        items: [
          "Thực tế so với kế hoạch: chúng ta có làm được như đã cam kết không?",
          "Thực tế so với cùng kỳ năm trước: chúng ta có lớn lên không, sau khi loại yếu tố mùa vụ?",
          "Thực tế so với tháng trước: xu hướng gần đây đang đi lên hay đi xuống? Cẩn thận với ngành có mùa vụ.",
        ],
      },
      { type: "heading", text: "Tách giá và lượng - một ví dụ nhỏ" },
      {
        type: "code",
        language: "text",
        caption: "Sản phẩm A, tháng 9. Hai phần cộng lại phải đúng bằng tổng chênh lệch - đó là phép kiểm có sẵn.",
        code: `Kế hoạch: 1.000 đơn × 200.000 đ = 200 triệu
Thực tế:  1.100 đơn × 190.000 đ = 209 triệu
Tổng chênh lệch = 209 − 200 = +9 triệu

Phần lượng = (SL thực tế − SL kế hoạch) × giá kế hoạch
           = (1.100 − 1.000) × 200.000 = +20 triệu
Phần giá   = (giá thực tế − giá kế hoạch) × SL thực tế
           = (190.000 − 200.000) × 1.100 = −11 triệu

Kiểm: +20 − 11 = +9 triệu  (khớp tổng)`,
      },
      {
        type: "paragraph",
        text: "Nhận xét đúng: doanh thu tăng nhờ lượng, và việc giảm giá 10.000 đ mỗi đơn đã lấy đi hơn nửa phần tăng đó. Một câu \"vượt kế hoạch 9 triệu\" không nói được điều này.",
      },
      {
        type: "exercise",
        language: "python",
        title: "Sửa phép tính chênh lệch",
        task: "Đoạn mã in chênh lệch và tỷ lệ chênh lệch so với kế hoạch cho ba dòng (đơn vị triệu đồng). Nó đang trừ ngược chiều và chia nhầm mẫu số. Sửa để chênh lệch = thực tế − kế hoạch, tỷ lệ = chênh lệch ÷ kế hoạch × 100.",
        starter: `dong = [
    ("Doanh thu", 200, 209),
    ("Gia von", 120, 130),
    ("Marketing", 30, 24),
]

for ten, ke_hoach, thuc_te in dong:
    chenh_lech = ke_hoach - thuc_te
    ty_le = chenh_lech / thuc_te * 100
    print(f"{ten}: {chenh_lech:+d} ({ty_le:+.1f}%)")
`,
        solution: `dong = [
    ("Doanh thu", 200, 209),
    ("Gia von", 120, 130),
    ("Marketing", 30, 24),
]

for ten, ke_hoach, thuc_te in dong:
    chenh_lech = thuc_te - ke_hoach
    ty_le = chenh_lech / ke_hoach * 100
    print(f"{ten}: {chenh_lech:+d} ({ty_le:+.1f}%)")
`,
        expectedOutput: `Doanh thu: +9 (+4.5%)
Gia von: +10 (+8.3%)
Marketing: -6 (-20.0%)`,
        hints: [
          "Chênh lệch dương nghĩa là thực tế cao hơn kế hoạch, nên lấy thực tế trừ kế hoạch.",
          "Tỷ lệ so với kế hoạch thì mẫu số là kế hoạch.",
        ],
      },
      {
        type: "paragraph",
        text: "Chú ý dấu khi đọc: doanh thu +9 là tốt, nhưng giá vốn +10 là chi nhiều hơn, và marketing −6 là chi ít hơn. Nhiều báo cáo thêm một cột \"thuận lợi / bất lợi\" để người đọc khỏi phải tự đảo dấu cho dòng chi phí.",
      },
      { type: "heading", text: "Để AI viết nháp, không để AI tính" },
      {
        type: "code",
        language: "text",
        caption: "Prompt mẫu. Mọi con số đã được tính sẵn trong bảng; AI chỉ viết lời.",
        code: `Dưới đây là bảng biến động tháng 9 (triệu đồng) đã tính sẵn:
khoản mục | kế hoạch | thực tế | chênh lệch | % | phần lượng | phần giá

Viết nhận xét cho các dòng lệch trên 5% VÀ trên 10 triệu.
Quy tắc:
- Chỉ dùng con số có trong bảng. Không tự tính thêm.
- Không tự đoán lý do. Nếu bảng không cho biết vì sao, ghi "[cần hỏi: ...]".
- Mỗi dòng tối đa 2 câu.`,
      },
      {
        type: "callout",
        label: "Người kiểm từng con số",
        text: "Trước khi gửi, gạch chân mọi con số trong nhận xét và tìm từng số trong bảng. Số nào không tìm thấy thì xoá. Lý do nào không có người phụ trách xác nhận thì để dạng câu hỏi. AI rất giỏi viết một lý do nghe hợp lý - đó chính là lý do phải kiểm.",
      },
      {
        type: "closing",
        lines: [
          "Công thức tính, AI viết, người kiểm - thứ tự này không đảo được.",
          "Bài sau: biến bảng biến động thành một biểu đồ nói đúng một điều.",
        ],
      },
    ],
  },
  {
    id: 1824,
    slug: "tu-bang-toi-bieu-do-ke-chuyen",
    title: "Chặng 26, Bài 5: Từ bảng tới biểu đồ kể chuyện",
    subtitle: "Chọn biểu đồ theo câu hỏi, một biểu đồ một thông điệp, tiêu đề là kết luận.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📈",
    track: "personal",
    whyItMatters:
      "Sếp đọc báo cáo trong vài chục giây. Một bảng 40 dòng hay một biểu đồ nhồi sáu đường màu đều bắt họ tự tìm kết luận - và họ thường không tìm. Một biểu đồ đúng loại, có tiêu đề nói thẳng kết luận, làm thay phần việc đó và làm cho con số bạn đã kiểm kỹ thật sự được đọc.",
    openingQuestion:
      "Bạn muốn cho thấy doanh thu 12 tháng qua tăng đều nhưng tháng 4 giảm mạnh. Biểu đồ nào hợp nhất?",
    openingOptions: [
      "Biểu đồ đường theo tháng",
      "Biểu đồ tròn theo 12 tháng",
      "Cột chồng theo khu vực",
      "Bảng tô đỏ ô tháng 4",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi là xu hướng theo thời gian, và đường là cách mắt đọc xu hướng nhanh nhất: thấy ngay đi lên và thấy ngay chỗ gãy ở tháng 4. Biểu đồ tròn dùng cho cơ cấu của một tổng, không dùng cho thời gian - 12 miếng gần bằng nhau không ai so được. Cột chồng theo khu vực trả lời câu khác (khu vực nào đóng góp bao nhiêu). Bảng tô màu thì chỉ cho thấy tháng 4, không thấy xu hướng quanh nó.",
    diagram: [
      { label: "Viết ra câu hỏi biểu đồ phải trả lời", arrow: true },
      { label: "Chọn loại: xu hướng, so sánh, cơ cấu hay cầu nối", arrow: true },
      { label: "Bỏ hết thứ không phục vụ câu trả lời", arrow: true },
      { label: "Đặt tiêu đề là kết luận, không phải tên dữ liệu" },
    ],
    realWorldExample: {
      company: "Tình huống: báo cáo tháng của phòng vận hành",
      description:
        "Bản cũ có một biểu đồ tên \"Chi phí theo tháng\" với sáu đường màu cho sáu loại chi phí, và ban giám đốc lần nào cũng hỏi lại \"vậy vấn đề là gì\". Bản mới tách thành một biểu đồ duy nhất cho chi phí vận chuyển, tiêu đề \"Chi phí vận chuyển tăng 18% từ tháng 6, sau khi đổi đơn vị giao hàng\" - và cuộc họp đi thẳng vào chuyện có đổi lại hay không.",
    },
    quiz: [
      {
        question: "Tiêu đề nào tốt nhất cho một biểu đồ trong báo cáo gửi sếp?",
        options: [
          "\"Miền Nam chiếm 60% mức tăng doanh thu quý 3\"",
          "\"Doanh thu quý 3 theo khu vực\"",
          "\"Biểu đồ 2: Phân tích doanh thu theo từng khu vực kinh doanh\"",
          "\"Quý 3: một quý đầy thách thức và cơ hội cho công ty\"",
        ],
        correct: 0,
        explanation:
          "Tiêu đề là kết luận thì người đọc biết phải nhìn vào đâu và biết bạn muốn họ rút ra điều gì. \"Doanh thu theo khu vực\" chỉ là tên dữ liệu - người đọc phải tự tìm kết luận. Câu \"thách thức và cơ hội\" nghe hay nhưng không nói điều gì kiểm được.",
      },
      {
        question: "Muốn cho thấy lợi nhuận đi từ kế hoạch 100 tới thực tế 85 qua các khoản tăng giảm. Nên dùng biểu đồ nào?",
        options: [
          "Thác nước (waterfall)",
          "Tròn cho từng khoản",
          "Đường nối qua từng khoản",
          "Hai cột kế hoạch và thực tế",
        ],
        correct: 0,
        explanation:
          "Thác nước vẽ điểm đầu, từng khoản cộng hoặc trừ, và điểm cuối - đúng câu chuyện \"từ 100 xuống 85 vì đâu\". Excel có sẵn loại biểu đồ này. Hai cột cạnh nhau chỉ cho thấy khoảng cách, không cho thấy khoảng cách gồm những gì. Đường dùng cho thời gian, không cho các khoản.",
      },
      {
        question: "Biểu đồ cột so sánh doanh thu ba chi nhánh: 96, 97 và 98 tỷ. Trục dọc bắt đầu từ 95. Vấn đề là gì?",
        options: [
          "Chênh lệch khoảng 2% trông như gấp ba lần",
          "Không có vấn đề gì, vì cắt trục giúp nhìn rõ chênh lệch hơn",
          "Trục phải bắt đầu từ 90 thì mới đủ chỗ ghi nhãn cho cả ba cột",
          "Biểu đồ cột không được dùng khi so sánh ít hơn bốn đối tượng",
        ],
        correct: 0,
        explanation:
          "Với cột, mắt so chiều cao: cột 98 cao gấp ba cột 96 khi trục bắt đầu từ 95, dù thực tế chỉ hơn khoảng 2%. Biểu đồ cột phải bắt đầu từ 0. Biểu đồ đường thì khác - nó nói về xu hướng nên cắt trục thường chấp nhận được, miễn là ghi rõ.",
      },
      {
        question: "AI đề xuất một biểu đồ đẹp nhưng có hai trục dọc, hai đường và bốn cột. Nên làm gì?",
        options: [
          "Hỏi nó nói điều gì, rồi tách thành biểu đồ riêng cho từng ý",
          "Giữ nguyên, vì biểu đồ càng nhiều thông tin thì báo cáo càng có giá trị",
          "Đổi hết sang màu xám cho đỡ rối, giữ nguyên số đường và cột như cũ",
          "Thêm bảng số liệu bên dưới để người đọc tự đối chiếu từng con số",
        ],
        correct: 0,
        explanation:
          "Một biểu đồ một thông điệp. Hai trục dọc đặc biệt dễ gây hiểu sai vì người đọc so chiều cao của hai thứ khác đơn vị. Nếu bạn không nói được trong một câu biểu đồ muốn nói gì, người đọc cũng không. Đổi màu hay thêm bảng không giảm số điều họ phải tự đọc.",
      },
      {
        question: "Khi nào nên dùng Looker Studio thay vì một biểu đồ Excel dán vào báo cáo?",
        options: [
          "Khi cùng biểu đồ phải cập nhật định kỳ cho nhiều người xem",
          "Khi cần một biểu đồ duy nhất cho một buổi họp trong tuần này",
          "Khi dữ liệu chỉ có vài chục dòng nằm trong một sheet duy nhất",
          "Khi muốn biểu đồ trông đẹp hơn so với biểu đồ mặc định của Excel",
        ],
        correct: 0,
        explanation:
          "Looker Studio nối thẳng vào Google Sheets và các nguồn khác, nên mỗi lần dữ liệu cập nhật thì mọi người mở đường link đều thấy số mới - hợp với báo cáo tuần, báo cáo tháng. Một biểu đồ cho một cuộc họp thì Excel hay Sheets nhanh hơn. Đẹp hơn không phải lý do chính.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi chọn biểu đồ: xu hướng dùng đường, so sánh dùng cột, cơ cấu dùng cột chồng hoặc tròn ít phần, cầu nối dùng thác nước.",
      "Một biểu đồ một thông điệp.",
      "Tiêu đề là kết luận, không phải tên dữ liệu.",
      "Biểu đồ cột bắt đầu từ 0; đường thì được cắt trục nếu ghi rõ.",
      "Báo cáo định kỳ nhiều người xem thì dựng một lần trên Looker Studio.",
    ],
    practicePrompt: {
      question: "Bảng biến động có 40 dòng chi phí. Sếp chỉ cần biết \"vì sao lợi nhuận thấp hơn kế hoạch\". Bạn đưa gì lên trang đầu?",
      options: [
        "Thác nước với 4-5 khoản lệch lớn nhất, các khoản khác gộp thành \"khác\"",
        "Toàn bộ bảng 40 dòng với định dạng màu đỏ cho các dòng bị lệch",
        "Biểu đồ tròn cơ cấu chi phí thực tế của tháng này theo từng loại",
        "Biểu đồ cột cho đủ cả 40 dòng chi phí, xếp theo thứ tự tài khoản",
      ],
      correct: 0,
      explanation:
        "Câu hỏi là cầu nối từ kế hoạch tới thực tế, nên dùng thác nước. Giữ 4-5 khoản lớn nhất và gộp phần còn lại để người đọc thấy ngay chuyện chính. Bảng 40 dòng để ở phụ lục. Biểu đồ tròn cơ cấu chi phí không nói gì về lệch kế hoạch.",
    },
    summary: {
      keyIdea: "Viết câu hỏi trước, chọn biểu đồ theo câu hỏi, và để tiêu đề nói kết luận.",
      formula: "Câu hỏi → loại biểu đồ → bỏ thứ thừa → tiêu đề là kết luận.",
      commonMistake: "Nhồi mọi thứ vào một biểu đồ và đặt tiêu đề là tên dữ liệu.",
      action: "Lấy một biểu đồ bạn đã gửi đi, viết lại tiêu đề thành một câu kết luận.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chọn một biểu đồ trong báo cáo gần nhất của bạn. Viết ra câu hỏi nó trả lời, kiểm loại biểu đồ có hợp không, bỏ những đường hoặc cột không phục vụ câu đó, và đổi tiêu đề thành kết luận.",
      secondary: "Nhờ AI đề xuất ba tiêu đề kết luận cho biểu đồ đó - rồi kiểm con số trong từng tiêu đề.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có bảng sạch, câu hỏi rõ, con số đã kiểm. Bước cuối là làm sao để người đọc thấy đúng điều bạn thấy - trong vài giây đầu tiên, trước khi họ lướt sang trang khác.",
      },
      { type: "heading", text: "Câu hỏi chọn biểu đồ" },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi hay gặp và loại biểu đồ hợp",
        concepts: [
          { vi: "Xu hướng", en: "Trend", def: "Thay đổi theo thời gian: doanh thu 12 tháng. Dùng đường." },
          { vi: "So sánh", en: "Comparison", def: "Hạng mục nào lớn hơn: doanh thu theo chi nhánh. Dùng cột, hoặc thanh ngang nếu tên dài. Trục bắt đầu từ 0." },
          { vi: "Cơ cấu", en: "Composition", def: "Một tổng gồm những phần nào: chi phí theo loại. Cột chồng; tròn chỉ khi ít phần và chênh rõ." },
          { vi: "Cầu nối", en: "Bridge / waterfall", def: "Từ số A tới số B qua các khoản tăng giảm: kế hoạch tới thực tế. Dùng thác nước." },
        ],
      },
      { type: "heading", text: "Một biểu đồ, một thông điệp" },
      {
        type: "comparison",
        left: {
          label: "Tiêu đề tên dữ liệu",
          text: "\"Chi phí vận chuyển theo tháng.\" Người đọc phải tự tìm xem có gì đáng chú ý.",
        },
        right: {
          label: "Tiêu đề kết luận",
          text: "\"Chi phí vận chuyển tăng 18% từ tháng 6, sau khi đổi đơn vị giao hàng.\" Người đọc biết nhìn vào đâu, và có thể phản bác nếu thấy khác.",
        },
      },
      {
        type: "list",
        items: [
          "Tô màu nổi đúng một cột hoặc một đường mang thông điệp; phần còn lại màu xám.",
          "Bỏ lưới, bỏ chú giải nếu ghi nhãn trực tiếp được, bỏ hiệu ứng 3D.",
          "Ghi đơn vị trên trục hoặc trong tiêu đề phụ: triệu đồng, %, số đơn.",
          "Ghi nguồn và ngày chốt số ở chân biểu đồ.",
        ],
      },
      { type: "heading", text: "Công cụ và vai trò của AI" },
      {
        type: "paragraph",
        text: "Excel và Google Sheets đủ cho biểu đồ dùng một lần; Excel có sẵn biểu đồ thác nước. Looker Studio hợp cho báo cáo định kỳ: nối vào sheet một lần, mọi người mở link là thấy số mới. AI giúp tốt ở hai chỗ: gợi ý loại biểu đồ cho một câu hỏi, và đề xuất tiêu đề kết luận. Nó không thay bạn quyết định thông điệp nào đáng nói.",
      },
      {
        type: "callout",
        label: "Tiêu đề kết luận cũng là một con số phải kiểm",
        text: "\"Tăng 18%\" trong tiêu đề phải khớp với dữ liệu trong biểu đồ. AI đề xuất tiêu đề rất hay nhưng đôi khi làm tròn hoặc tự tính sai. Tiêu đề là câu người đọc nhớ nhất - sai ở đó là sai ở chỗ nặng nhất.",
      },
      {
        type: "closing",
        lines: [
          "Biểu đồ tốt không đẹp hơn - nó nói ít hơn và rõ hơn.",
          "Bài sau: dự án - ghép cả năm bước thành một trang nhận xét thật.",
        ],
      },
    ],
  },
  {
    id: 1825,
    slug: "du-an-phan-tich-du-lieu-kinh-doanh-bang-ai",
    title: "Chặng 26, Bài 6: Dự án - phân tích dữ liệu kinh doanh bằng AI",
    subtitle: "Một bảng doanh thu - chi phí 6 tháng, từ dữ liệu bẩn tới một trang nhận xét đã kiểm từng số.",
    duration: "30 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    whyItMatters:
      "Năm bài trước là từng bước. Dự án này ghép chúng lại trên một bộ dữ liệu nhỏ có sẵn lỗi, để bạn làm trọn một vòng: làm sạch, hỏi, để AI đề xuất, kiểm từng số, viết một trang. Làm xong một lần trên dữ liệu mẫu, bạn có quy trình để làm lại trên bảng thật của mình.",
    openingQuestion:
      "Bộ dữ liệu mẫu có tháng 3 xuất hiện hai lần giống hệt nhau và một dòng \"Tong\" ở cuối. Nếu dán nguyên vào AI và hỏi tổng doanh thu 6 tháng, kết quả sẽ thế nào?",
    openingOptions: [
      "Hơn gấp đôi số đúng (11.535 thay vì 5.315)",
      "Đúng 5.315, vì AI tự bỏ dòng thừa",
      "Thiếu tháng 3, vì hai dòng trùng triệt tiêu",
      "6.220 (= 5.315 + 905, chỉ thừa tháng 3)",
    ],
    correctOption: 0,
    explanation:
      "Dòng \"Tong\" đã bằng tổng sáu tháng, nên cộng cả nó là nhân đôi; cộng thêm tháng 3 lần thứ hai là thừa thêm một tháng nữa: 5.315 + 5.315 + 905 = 11.535, hơn gấp đôi 5.315. AI có thể tự nhận ra dòng tổng, cũng có thể không, và bạn không biết lần này nó có làm hay không. Hai dòng trùng không triệt tiêu - chúng cộng dồn. Đây là lý do bước làm sạch đứng đầu dự án.",
    diagram: [
      { label: "Làm sạch: bỏ dòng trùng, dòng tổng, số dạng chữ", arrow: true },
      { label: "Hỏi: biên lãi gộp, lợi nhuận hoạt động, tháng bất thường", arrow: true },
      { label: "AI đề xuất nhận xét từ bảng đã tính", arrow: true },
      { label: "Người kiểm từng số, rồi viết một trang" },
    ],
    realWorldExample: {
      company: "Tình huống: kế toán trưởng một công ty dịch vụ 30 người",
      description:
        "Trước đây báo cáo quản trị nửa năm mất hai ngày: một ngày gom và sửa số, một ngày viết. Làm theo đúng quy trình của dự án này - làm sạch trên bản sao, tính bằng công thức, AI viết nháp, kiểm từng số - việc viết rút còn nửa buổi. Phần gom và sửa số thì không rút được nhiều, và đó là phần quyết định số có đúng hay không.",
    },
    quiz: [
      {
        question: "Ô doanh thu tháng 6 ghi \"1.010\" trong ngoặc kép. Rủi ro là gì?",
        options: [
          "Công cụ đọc nó là chữ, hoặc là 1,01 thay vì 1.010",
          "Không có rủi ro gì, vì dấu chấm là dấu phân cách hàng nghìn",
          "Chỉ rủi ro khi in báo cáo, còn tính toán thì vẫn đúng như thường",
          "Công cụ sẽ tự làm tròn con số này xuống thành 1.000 cho gọn",
        ],
        correct: 0,
        explanation:
          "Trong CSV, dấu ngoặc kép giữ nguyên ô là một chuỗi. Công cụ có cài đặt vùng theo kiểu Mỹ đọc dấu chấm là dấu thập phân và ra 1,01; công cụ khác bỏ qua hẳn vì là chữ. Cả hai đều làm tổng sai mà không báo. Sửa: đổi thành số 1010 và kiểm lại tổng.",
      },
      {
        question: "Sau khi làm sạch, biên lãi gộp 6 tháng tính thế nào cho đúng?",
        options: [
          "Tổng lãi gộp 6 tháng ÷ tổng doanh thu 6 tháng",
          "Trung bình biên lãi gộp của 6 tháng",
          "Biên lãi gộp của tháng gần nhất",
          "Lãi gộp bình quân tháng ÷ doanh thu của riêng tháng 6",
        ],
        correct: 0,
        explanation:
          "Biên lãi gộp là tỷ lệ, nên tính lại từ tổng: (5.315 − 3.253) ÷ 5.315 = 2.062 ÷ 5.315 ≈ 38,8%. Trung bình cộng biên từng tháng cho tháng nhỏ nặng bằng tháng lớn - cùng lỗi \"trung bình của tỷ lệ\" ở bài 2. Tháng gần nhất chỉ là một điểm, không phải cả kỳ.",
      },
      {
        question: "AI viết: \"Chi phí bán hàng tăng đều qua 6 tháng.\" Bảng cho 95, 90, 102, 118, 105, 110. Nhận xét của AI sai ở đâu?",
        options: [
          "Không tăng đều: có tháng giảm, và tháng 4 vọt lên 118",
          "Không sai, vì số cuối kỳ cao hơn số đầu kỳ là tăng đều",
          "Sai đơn vị, vì chi phí bán hàng phải tính theo phần trăm",
          "Sai vì AI không được phép nhận xét về chi phí bán hàng",
        ],
        correct: 0,
        explanation:
          "Đầu kỳ 95, cuối kỳ 110 thì có tăng, nhưng \"tăng đều\" là sai: tháng 2 giảm, tháng 4 vọt lên 118 rồi lại giảm. Tháng 4 chính là điểm đáng hỏi nhất - chi phí bán hàng cao nhất trong khi doanh thu lại giảm so với tháng 3. AI hay làm mượt những chỗ gãy như thế thành một câu gọn.",
      },
      {
        question: "Vì sao tiêu chí \"xong\" của dự án đòi mỗi con số trong trang nhận xét phải có ô nguồn?",
        options: [
          "Để người đọc và chính bạn lần lại được từng số",
          "Để trang nhận xét trông chuyên nghiệp hơn khi gửi cho sếp",
          "Vì phần mềm kế toán bắt buộc mọi báo cáo phải ghi ô nguồn",
          "Để AI lần sau đọc lại được báo cáo mà không cần hỏi lại bạn",
        ],
        correct: 0,
        explanation:
          "Một con số không lần lại được là một con số không ai kiểm được - kể cả bạn tuần sau. Ghi ô nguồn (ví dụ \"sheet SACH, ô G8\") biến việc kiểm từ đọc lại cả bảng thành nhìn một ô. Đó cũng là cách bắt con số AI tự tính thêm hoặc làm tròn mà không nói.",
      },
      {
        question: "Bạn định tải bảng lãi lỗ thật của công ty lên một trợ lý AI để làm dự án. Nên làm gì trước?",
        options: [
          "Kiểm quy định công ty về công cụ AI được dùng cho số liệu kinh doanh",
          "Tải lên luôn, vì số liệu tổng hợp theo tháng không có gì nhạy cảm",
          "Tắt lịch sử trò chuyện trong tài khoản cá nhân rồi tải lên thoải mái",
          "Đổi tên tệp thành tên chung chung để không ai nhận ra là của ai",
        ],
        correct: 0,
        explanation:
          "Số lãi lỗ chưa công bố là thông tin nội bộ nhạy cảm, nhất là với công ty niêm yết. Nhiều công ty chỉ cho dùng công cụ AI đã ký hợp đồng doanh nghiệp. Tắt lịch sử trong tài khoản cá nhân không thay được sự cho phép đó, và đổi tên tệp không che được nội dung bên trong.",
      },
    ],
    keyTakeaways: [
      "Quy trình: làm sạch → hỏi → AI đề xuất → người kiểm từng số → một trang.",
      "Đối chiếu tổng sau làm sạch trước khi hỏi bất cứ câu nào.",
      "Tỷ lệ cả kỳ tính từ tổng, không lấy trung bình tỷ lệ từng tháng.",
      "AI hay làm mượt chỗ gãy; chỗ gãy thường là điều đáng nói nhất.",
      "Mỗi con số trong nhận xét phải chỉ được ô nguồn.",
    ],
    practicePrompt: {
      question: "Sau khi làm sạch, lợi nhuận hoạt động từng tháng là 123, 98, 139, 101, 148, 156. Tổng 6 tháng là bao nhiêu?",
      options: [
        "765 (= 2.062 lãi gộp − 620 bán hàng − 677 quản lý)",
        "904 (= 765 + 139, cộng tháng 3 hai lần vì chưa bỏ dòng trùng)",
        "2.062 (= 5.315 − 3.253, lãi gộp)",
        "1.442 (= 2.062 − 620, quên trừ chi phí quản lý doanh nghiệp)",
      ],
      correct: 0,
      explanation:
        "Cộng từng tháng: 123 + 98 + 139 + 101 + 148 + 156 = 765. Tính từ tổng cũng ra cùng số: lãi gộp 2.062 trừ chi phí bán hàng 620 và chi phí quản lý 677 bằng 765. Hai cách khớp nhau chính là một phép kiểm. 2.062 mới là lãi gộp, và 904 là con số bạn nhận được nếu quên bỏ dòng tháng 3 bị trùng.",
    },
    summary: {
      keyIdea: "Một vòng trọn vẹn: làm sạch, hỏi, AI đề xuất, người kiểm từng số, một trang nhận xét.",
      formula: "Sạch (tổng khớp) → hỏi (số đo, chiều) → tính bằng công thức → AI viết nháp → kiểm từng số → một trang.",
      commonMistake: "Bỏ qua bước đối chiếu tổng sau làm sạch, rồi mọi con số phía sau đều lệch theo.",
      action: "Làm dự án trên bộ dữ liệu mẫu, rồi lặp lại trên một bảng thật của bạn trong công cụ AI công ty cho phép.",
    },
    application: {
      title: "Dự án: một trang nhận xét 6 tháng",
      message:
        "Làm đủ 6 bước trong bài trên bộ dữ liệu mẫu. Đầu ra là một trang: 3-5 nhận xét, mỗi nhận xét có con số và ô nguồn, một biểu đồ có tiêu đề là kết luận, và danh sách câu cần hỏi người phụ trách.",
      secondary: "Xong là khi mọi tiêu chí trong mục \"Xong là khi\" đều đánh dấu được.",
    },
    sections: [
      {
        type: "lead",
        text: "Dự án cuối chặng: bạn nhận một bảng doanh thu - chi phí 6 tháng đầu năm của một công ty nhỏ, đơn vị triệu đồng, xuất từ phần mềm và có sẵn vài lỗi. Việc của bạn là biến nó thành một trang nhận xét mà bạn dám ký tên.",
      },
      { type: "heading", text: "Bộ dữ liệu mẫu" },
      {
        type: "code",
        language: "text",
        caption: "Chép vào một tệp .csv hoặc dán vào Google Sheets. Có ba lỗi cố ý: một dòng trùng, một số lưu dạng chữ, một dòng tổng.",
        code: `thang,doanh_thu,gia_von,chi_phi_ban_hang,chi_phi_quan_ly
2026-01,820,492,95,110
2026-02,760,464,90,108
2026-03,905,552,102,112
2026-03,905,552,102,112
2026-04,880,546,118,115
2026-05,940,573,105,114
2026-06,"1.010",626,110,118
Tong,5315,3253,620,677`,
      },
      { type: "heading", text: "Sáu bước" },
      {
        type: "list",
        items: [
          "Bước 1 - Làm sạch trên bản sao: bỏ một dòng tháng 3 (ở đây là lỗi xuất trùng, vì một tháng chỉ có một dòng), đổi \"1.010\" thành số 1010, xoá dòng Tong. Còn đúng 6 dòng.",
          "Bước 2 - Đối chiếu: tổng doanh thu 6 dòng phải bằng 5.315, giá vốn 3.253, bán hàng 620, quản lý 677 - khớp dòng Tong vừa xoá.",
          "Bước 3 - Hỏi đúng câu: thêm cột lãi gộp, biên lãi gộp %, lợi nhuận hoạt động cho từng tháng bằng công thức. Viết ra ba câu hỏi, ví dụ \"tháng nào lợi nhuận hoạt động thấp nhất và vì dòng nào\".",
          "Bước 4 - Để AI đề xuất: gửi bảng đã tính (không gửi dữ liệu thật của công ty nếu chưa được phép), dùng prompt ở bài 4: chỉ dùng số có trong bảng, không tự đoán lý do.",
          "Bước 5 - Kiểm từng số: gạch chân mọi con số trong nhận xét của AI, tìm từng số trong bảng. Kiểm lại cả những từ như \"tăng đều\", \"ổn định\" - AI hay làm mượt chỗ gãy.",
          "Bước 6 - Viết một trang: 3-5 nhận xét, một biểu đồ, danh sách câu cần hỏi người phụ trách.",
        ],
      },
      {
        type: "code",
        language: "python",
        runnable: true,
        caption: "Tuỳ chọn: tính lại bằng Python thuần để có một cách tính thứ hai đối chiếu với bảng tính.",
        code: `thang = [
    ("2026-01", 820, 492, 95, 110),
    ("2026-02", 760, 464, 90, 108),
    ("2026-03", 905, 552, 102, 112),
    ("2026-04", 880, 546, 118, 115),
    ("2026-05", 940, 573, 105, 114),
    ("2026-06", 1010, 626, 110, 118),
]

tong_dt = tong_lg = tong_ln = 0
for t, dt, gv, bh, ql in thang:
    lai_gop = dt - gv
    loi_nhuan = lai_gop - bh - ql
    tong_dt += dt
    tong_lg += lai_gop
    tong_ln += loi_nhuan
    print(f"{t}: lai gop {lai_gop}, bien {lai_gop / dt * 100:.1f}%, LN hoat dong {loi_nhuan}")

print(f"6 thang: doanh thu {tong_dt}, bien lai gop {tong_lg / tong_dt * 100:.1f}%, LN hoat dong {tong_ln}")`,
      },
      {
        type: "paragraph",
        text: "Kết quả để bạn đối chiếu: biên lãi gộp cả kỳ khoảng 38,8%, lợi nhuận hoạt động 6 tháng 765. Tháng 4 là tháng đáng hỏi: doanh thu giảm so với tháng 3 trong khi chi phí bán hàng lên mức cao nhất kỳ (118), nên lợi nhuận hoạt động chỉ còn 101. Bảng không cho biết vì sao - đó là câu phải hỏi phòng kinh doanh, không phải câu để AI đoán.",
      },
      { type: "heading", text: "Xong là khi" },
      {
        type: "list",
        items: [
          "Bảng sạch còn đúng 6 dòng, và tổng từng cột khớp dòng Tong gốc.",
          "Biên lãi gộp và lợi nhuận hoạt động tính bằng công thức, không gõ tay.",
          "Có 3-5 nhận xét; mỗi con số trong đó ghi được ô nguồn.",
          "Không có lý do nào do AI tự đoán: lý do chưa xác nhận được viết thành câu hỏi.",
          "Có một biểu đồ đúng loại với tiêu đề là kết luận, ví dụ lợi nhuận hoạt động theo tháng với tháng 4 được tô nổi.",
          "Bạn giải thích được mọi con số trên trang cho một người không dùng AI.",
        ],
      },
      {
        type: "callout",
        label: "Khi làm trên dữ liệu thật",
        text: "Số lãi lỗ chưa công bố là thông tin nội bộ. Chỉ dùng công cụ AI công ty đã cho phép, hoặc chỉ gửi AI phần mô tả bảng và số đã làm tròn, che tên. Người ký trang nhận xét là bạn, không phải AI.",
      },
      {
        type: "closing",
        lines: [
          "Phân tích với AI không phải là hỏi một câu và nhận một báo cáo - nó là năm bước, và AI chỉ làm nhanh một bước.",
          "Bạn vừa làm trọn một vòng. Lần sau, làm lại trên bảng thật của mình.",
        ],
      },
    ],
  },
  {
    id: 1827,
    slug: "tim-dong-bat-thuong-trong-bang-chi-phi",
    title: "Chặng 26, Bài 8: Tìm dòng bất thường trong bảng chi phí",
    subtitle: "Ngưỡng, trùng lặp, số tròn đáng ngờ: bất thường là lý do để hỏi, chưa phải kết luận sai.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng chi phí hằng tháng có hàng trăm dòng, không ai đọc hết từng dòng. Bảng tính lọc được ngưỡng, dòng trùng và số tròn trong vài giây, AI giúp mô tả các mẫu cần soi. Nhưng một dòng bất thường mới là dòng đáng hỏi, chưa phải dòng sai, và gọi nhầm một nhân viên là gian lận thì hậu quả lớn hơn một con số lệch.",
    openingQuestion:
      "Bảng chi phí tháng có 9 khoản 19,5 triệu đồng của cùng một nhà cung cấp, trong khi ngưỡng cần giám đốc duyệt là 20 triệu (số liệu minh hoạ). Điều nào đúng nhất?",
    openingOptions: [
      "Đáng hỏi lý do, vì có thể là bình thường hoặc là chia nhỏ để tránh duyệt",
      "Chắc chắn là gian lận, vì không có lý do nào để trả nhiều lần sát ngưỡng",
      "Không có vấn đề, vì từng khoản đều nằm trong quyền duyệt của trưởng phòng",
      "Chỉ cần hỏi AI có gian lận hay không và làm theo câu trả lời của nó",
    ],
    correctOption: 0,
    explanation:
      "Chín khoản sát ngưỡng lặp lại là một mẫu đáng chú ý: có thể là hợp đồng thuê hằng tháng đúng giá, có thể là một khoản lớn bị chia nhỏ để lách duyệt. Số liệu chưa đủ để biết, nên việc cần làm là hỏi và xem chứng từ. Kết luận gian lận khi chưa có chứng cứ là quá vội. Coi mọi khoản trong quyền duyệt là ổn thì bỏ sót mẫu chia nhỏ. AI không có hợp đồng nên không thể phán xét thay bạn.",
    diagram: [
      { label: "Bảng chi phí đã làm sạch, đủ ngày, nhà cung cấp, số tiền, người duyệt", arrow: true },
      { label: "Lọc bằng quy tắc: sát ngưỡng, trùng lặp, số tròn, ngoài giờ", arrow: true },
      { label: "Danh sách dòng nghi vấn, mỗi dòng ghi rõ vì sao bị đánh dấu", arrow: true },
      { label: "Hỏi người liên quan, xem chứng từ, rồi mới kết luận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng kế toán giả định lọc bảng chi phí hằng tháng và thấy nhiều khoản ngay dưới ngưỡng duyệt 20 triệu. Khi hỏi, hoá ra là tiền thuê kho trả theo tuần đúng giá hợp đồng, chỉ cần đổi cách ghi. Một khoản khác cùng nhà cung cấp thì thật sự là một đơn hàng bị tách thành ba phiếu, và được duyệt lại đúng quy trình. Đây là ví dụ giả định về cách hỏi trước khi kết luận.",
    },
    quiz: [
      {
        question: "Một khoản chi bị đánh dấu là bất thường vì lớn gấp ba trung bình các tháng trước. Điều đó có nghĩa gì?",
        options: [
          "Khoản này đáng hỏi lý do, nhưng chưa chắc là sai",
          "Chắc chắn sai vì vượt xa mức trung bình",
          "Khoản này chắc chắn đúng vì đã có người duyệt",
          "Khoản này chỉ đáng để ý khi vượt ngưỡng duyệt",
        ],
        correct: 0,
        explanation:
          "Khoản lớn bất thường có thể là mua thiết bị, chi phí theo mùa hay trả trước một năm. Nó chỉ cho biết cần hỏi. Coi là sai chỉ vì lớn thì gọi nhầm nhiều khoản đúng, còn coi là đúng vì đã duyệt thì bỏ qua lỗi bị duyệt sót. Số nhỏ hơn ngưỡng cũng có thể là mẫu đáng soi.",
      },
      {
        question: "Hai dòng cùng nhà cung cấp, cùng số tiền 8.640.000, cách nhau hai ngày. Bước tiếp theo hợp lý là gì?",
        options: [
          "Kiểm số hoá đơn và chứng từ để biết trả hai lần hay hai đơn thật",
          "Xoá dòng thứ hai vì hai khoản giống hệt nhau chắc chắn là lỗi nhập",
          "Giữ cả hai và ghi chú 'trùng' vì hai dòng có cùng số tiền",
          "Nhờ AI cho biết dòng nào đúng dựa trên số tiền và nhà cung cấp",
        ],
        correct: 0,
        explanation:
          "Trùng số tiền và nhà cung cấp là dấu hiệu, chưa phải bằng chứng. Hai số hoá đơn khác nhau có thể là hai đơn thật, còn cùng số hoá đơn thì là trả hai lần cần đòi lại. Xoá dòng khi chưa biết làm sai sổ, và AI chỉ thấy hai dòng giống nhau, không có hoá đơn.",
      },
      {
        question: "Vì sao lọc các khoản chi 'số tròn' như 10.000.000 hoặc 25.000.000 có ích?",
        options: [
          "Số tròn thường là ước tính hoặc khoản chưa có hoá đơn kèm",
          "Số tròn luôn là khoản bịa vì hoá đơn thật hiếm khi tròn số",
          "Số tròn là khoản đã được làm tròn từ một số lẻ nhỏ hơn nhiều",
          "Số tròn cho biết người nhập đã ghi sai dấu phân cách hàng nghìn",
        ],
        correct: 0,
        explanation:
          "Hoá đơn có thuế thường ra số lẻ; nhiều khoản tròn liên tiếp đáng hỏi vì có thể là tạm ứng, ước tính hoặc chưa có chứng từ. Nhưng tiền thuê, phí dịch vụ theo hợp đồng lại hay tròn số, nên số tròn không chứng minh sai. Nó cũng không liên quan tới dấu phân cách hay việc làm tròn từ số lẻ.",
      },
      {
        question: "AI đọc danh sách chi phí và viết 'nhân viên A có dấu hiệu gian lận'. Bạn xử lý câu đó thế nào?",
        options: [
          "Không dùng câu đó, chỉ ghi các dòng cần hỏi kèm lý do",
          "Gửi luôn cho kế toán trưởng để người có quyền quyết định xử lý",
          "Giữ lại vì AI đã phân tích cả bảng nên đủ cơ sở để nghi ngờ",
          "Đổi 'gian lận' thành 'sai sót' cho nhẹ rồi gửi đi",
        ],
        correct: 0,
        explanation:
          "AI chỉ thấy các con số và mẫu, không thấy hợp đồng hay bối cảnh, nên kết luận về một người là suy diễn. Gửi câu đó đi là đưa ra cáo buộc chưa có bằng chứng. Đổi từ ngữ không sửa được điều đó: vẫn là kết luận không có cơ sở. Báo cáo nên nêu sự thật: dòng nào, vì sao đáng hỏi.",
      },
      {
        question: "Khi báo các dòng bất thường lên cấp trên, cách viết nào phù hợp nhất?",
        options: [
          "Nêu mẫu, số dòng, số tiền và câu hỏi cần xác nhận",
          "Nêu tên người duyệt và kết luận họ đã làm sai quy định",
          "Chỉ nêu tổng số tiền nghi vấn để tránh làm căng thẳng phòng",
          "Chờ tới khi chắc chắn 100 phần trăm rồi mới báo lên cấp trên",
        ],
        correct: 0,
        explanation:
          "Báo cáo tốt nêu sự việc kiểm chứng được và điều còn chưa biết. Nêu tên kèm kết luận là vượt quá dữ liệu. Chỉ nêu tổng thì cấp trên không biết chỗ nào để hỏi. Chờ chắc chắn 100 phần trăm thì rủi ro có thể tiếp tục xảy ra trong lúc chờ.",
      },
    ],
    keyTakeaways: [
      "Bất thường là dòng đáng hỏi, không phải dòng sai.",
      "Bốn quy tắc lọc hay dùng: sát ngưỡng duyệt, trùng nhà cung cấp và số tiền, số tròn liên tiếp, lệch xa mức thường.",
      "Mỗi dòng bị đánh dấu phải ghi lý do bị đánh dấu.",
      "AI giúp mô tả mẫu, còn kết luận về người thì cần chứng từ và người có thẩm quyền.",
      "Báo cáo dòng nghi vấn bằng sự việc và câu hỏi, không bằng tên người và tính từ.",
    ],
    practicePrompt: {
      question: "Bạn thấy ba phiếu chi 19,8 triệu, 19,9 triệu, 19,7 triệu cùng nhà cung cấp trong một tuần. Việc nào nên làm trước?",
      options: [
        "Gộp ba phiếu, xem có cùng một đơn hàng hay hợp đồng không rồi hỏi người đề nghị chi",
        "Báo ngay giám đốc là đã có người cố tình chia nhỏ để né ngưỡng duyệt",
        "Bỏ qua vì từng phiếu đều dưới ngưỡng và đã được trưởng phòng ký",
        "Nhờ AI kết luận ba phiếu này có phải gian lận không rồi làm theo",
      ],
      correct: 0,
      explanation:
        "Gộp ba phiếu rồi xem chứng từ và hỏi người đề nghị cho biết đây là một đơn bị tách hay ba đơn độc lập. Báo giám đốc là gian lận khi chưa hỏi là kết luận vội. Bỏ qua vì đã có chữ ký trưởng phòng bỏ sót đúng mẫu ngưỡng cố tình. AI không có hợp đồng nên không thể kết luận.",
    },
    summary: {
      keyIdea: "Dùng quy tắc để tìm dòng đáng hỏi, dùng chứng từ để biết dòng đó đúng hay sai.",
      formula: "Quy tắc lọc → danh sách nghi vấn có lý do → hỏi và xem chứng từ → mới kết luận.",
      commonMistake: "Coi 'bất thường' là 'gian lận', rồi đưa tên người vào báo cáo khi chưa có chứng cứ.",
      action: "Lấy bảng chi phí một tháng, lọc các khoản trong khoảng 90 đến 100 phần trăm ngưỡng duyệt và ghi lý do của từng khoản.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở bảng chi phí một tháng gần nhất. Lọc các khoản có số tiền nằm ngay dưới ngưỡng duyệt của công ty, và các cặp cùng nhà cung cấp cùng số tiền. Với mỗi dòng, ghi lý do đáng hỏi và câu hỏi bạn sẽ đặt, không ghi kết luận.",
      secondary: "Không biết ngưỡng duyệt là bao nhiêu thì hỏi kế toán trưởng, đừng đoán.",
    },
    sections: [
      {
        type: "lead",
        text: "Anh Quân làm kế toán chi phí. Cuối tháng anh có một bảng 700 dòng và một buổi chiều. Anh không thể đọc hết, nhưng có thể nhờ bảng tính lọc ra 30 dòng đáng nhìn kỹ. Câu hỏi hôm nay là: 30 dòng đó nói lên điều gì, và điều gì thì chưa nói lên?",
      },
      {
        type: "feynman",
        title: "Tìm dòng bất thường đơn giản hơn bạn nghĩ",
        intro: "Bạn đi khám định kỳ, phiếu xét nghiệm có chỉ số nằm ngoài khoảng tham chiếu. Bác sĩ không nói ngay 'bạn bị bệnh', mà hỏi thêm: bạn có nhịn ăn không, có đang uống thuốc gì không, rồi có thể làm xét nghiệm lại.",
        columns: ["Việc", "Phiếu xét nghiệm", "Bảng chi phí"],
        rows: [
          ["Khoảng bình thường", "Khoảng tham chiếu do phòng xét nghiệm đặt ra", "Ngưỡng duyệt, mức chi thường thấy, quy định công ty"],
          ["Dấu hiệu", "Một chỉ số ngoài khoảng", "Một dòng sát ngưỡng, trùng lặp hoặc lệch xa mức thường"],
          ["Bước tiếp", "Hỏi thêm bối cảnh, làm lại xét nghiệm", "Hỏi người liên quan, xem hoá đơn và hợp đồng"],
          ["Kết luận", "Bác sĩ đưa ra sau khi có đủ thông tin", "Người có thẩm quyền đưa ra sau khi có chứng từ"],
        ],
        oneLiner: "Chỉ số lệch là lý do để hỏi thêm, chưa phải bản án; dòng bất thường cũng vậy.",
      },
      { type: "heading", text: "Bốn quy tắc lọc, mỗi quy tắc một câu hỏi" },
      {
        type: "list",
        items: [
          "Sát ngưỡng duyệt: nhiều khoản ngay dưới mức cần cấp cao hơn duyệt. Câu hỏi: đây là một khoản lớn bị tách, hay các khoản độc lập?",
          "Trùng lặp: cùng nhà cung cấp, cùng số tiền, ngày gần nhau. Câu hỏi: hai số hoá đơn khác nhau không, hay đã trả hai lần?",
          "Số tròn liên tiếp: nhiều khoản đúng chục triệu. Câu hỏi: có hoá đơn kèm không, hay đây là tạm ứng hoặc ước tính?",
          "Lệch xa mức thường: gấp mấy lần trung bình các tháng trước. Câu hỏi: có sự kiện nào trong tháng giải thích không?",
        ],
      },
      {
        type: "chart",
        title: "Số khoản chi theo mức tiền: chỗ nào nhô lên?",
        caption: "Số liệu minh hoạ cho một công ty giả định có ngưỡng duyệt 20 triệu đồng. Không phải thống kê thật. Cột 15 đến 19,9 triệu cao hơn cột trước nó là dấu hiệu đáng hỏi, chưa phải bằng chứng.",
        kind: "bar",
        yLabel: "Số khoản chi",
        data: [
          { label: "Dưới 5 triệu", values: [412] },
          { label: "5 đến 9,9 triệu", values: [96] },
          { label: "10 đến 14,9 triệu", values: [44] },
          { label: "15 đến 19,9 triệu", values: [71] },
          { label: "Từ 20 triệu trở lên", values: [6] },
        ],
        seriesLabels: ["Số khoản"],
      },
      {
        type: "paragraph",
        text: "Thường số khoản giảm dần khi số tiền tăng. Cột 15 đến 19,9 triệu cao hơn cột ngay trước nó, còn cột từ 20 triệu trở lên lại rất thấp. Hình dạng đó gợi ý một số khoản đang dừng lại trước ngưỡng. Nó vẫn có thể có lý do bình thường, ví dụ một loại chi phí cố định trong khoảng đó, và câu hỏi tiếp theo là khoản nào thuộc nhóm này.",
      },
      {
        type: "comparison",
        left: {
          label: "Bất thường",
          text: "Một dòng hoặc một mẫu khác với phần còn lại theo một quy tắc bạn đặt ra. Đo được bằng bảng tính. Chỉ cho biết chỗ cần nhìn.",
        },
        right: {
          label: "Sai hoặc gian lận",
          text: "Chi sai quy định, chi trùng hay chi không có thật. Chỉ biết được từ chứng từ, hợp đồng và lời giải thích của người liên quan. Kết luận thuộc người có thẩm quyền.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét của AI về bảng chi phí",
        task: "Bạn dán 30 dòng đã che tên và nhờ AI nhận xét. Dữ liệu chỉ có: 9 khoản 19,5 triệu cùng mã nhà cung cấp NCC-07 trong tháng, ngưỡng duyệt 20 triệu, hai dòng cùng 8.640.000 cách nhau hai ngày với hai số hoá đơn khác nhau. Đánh dấu những đoạn vượt quá dữ liệu.",
        segments: [
          { text: "Có 9 khoản 19,5 triệu của NCC-07 trong tháng, sát ngưỡng duyệt 20 triệu." },
          {
            text: "Đây là hành vi cố ý chia nhỏ để tránh duyệt, và người đề nghị chi cần bị xử lý.",
            error: "Dữ liệu chỉ cho thấy mẫu sát ngưỡng. Không có hợp đồng hay lời giải thích, nên 'cố ý' và 'bị xử lý' là kết luận AI tự thêm vào.",
          },
          { text: "Hai khoản 8.640.000 cách nhau hai ngày mang hai số hoá đơn khác nhau, cần đối chiếu chứng từ để biết có phải hai đơn thật." },
          {
            text: "Tổng giá trị nghi vấn là 214,3 triệu đồng.",
            error: "9 khoản 19,5 triệu cộng hai khoản 8,64 triệu là 192,78 triệu; AI đưa ra con số không tính được từ dữ liệu.",
          },
          { text: "Nên hỏi người đề nghị chi lý do các khoản này và xem hợp đồng với NCC-07 trước khi kết luận." },
        ],
      },
      {
        type: "callout",
        label: "Nói về người, cẩn trọng",
        text: "Một dòng chi phí luôn gắn với một người đề nghị và một người duyệt. Đưa tên vào báo cáo cùng chữ 'gian lận' khi chưa có chứng cứ có thể gây hại cho người đó và cho chính bạn. Hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi viết kết luận về bất kỳ ai.",
      },
      {
        type: "closing",
        lines: [
          "Bảng tính tìm chỗ lạ, chứng từ nói chỗ lạ đó có đúng hay không.",
          "Bài sau: dùng bảng tính để lập ngân sách phòng ban, với giả định nói rõ.",
        ],
      },
    ],
  },
  {
    id: 1828,
    slug: "lap-ngan-sach-phong-ban-voi-gia-dinh-ro-rang",
    title: "Chặng 26, Bài 9: Lập ngân sách phòng ban với giả định rõ ràng",
    subtitle: "Giả định để một chỗ, công thức trỏ vào đó; AI viết công thức, bạn kiểm bằng tính tay.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một bảng ngân sách có công thức đẹp nhưng số cứng nằm rải rác trong từng ô thì không ai dám đổi. Khi sếp hỏi 'nếu lương tăng 10% thay vì 7% thì sao', bạn phải dò từng công thức. Giả định viết ở một chỗ, công thức chỉ trỏ tới đó, thì đổi một ô là cả bảng cập nhật, và AI viết công thức nhanh hơn khi bạn nói rõ giả định là gì.",
    openingQuestion:
      "Sếp đưa phòng bạn lập ngân sách năm sau. Bạn đã gõ mức tăng lương 7% thẳng vào 40 công thức khác nhau. Hôm sau sếp bảo đổi thành 9%. Điều gì đúng nhất?",
    openingOptions: [
      "Lẽ ra 7% nên nằm ở một ô giả định, để đổi một chỗ là cả bảng đổi theo",
      "Không sao, tìm và thay 7 bằng 9 trong toàn bộ bảng là đủ và an toàn",
      "Nhờ AI viết lại toàn bộ 40 công thức là nhanh nhất và không lo sót ô nào",
      "Chỉ cần sửa dòng tổng cuối bảng cho khớp với mức 9%, các dòng khác giữ nguyên",
    ],
    correctOption: 0,
    explanation:
      "Con số 7% là một giả định, và giả định đổi theo yêu cầu của sếp. Nếu nó nằm trong 40 công thức, mỗi lần đổi bạn phải sửa 40 chỗ và có thể sót. Tìm và thay có thể thay nhầm số 7 khác, như 7 người hay 17 triệu. AI viết lại công thức vẫn không cho bạn biết ô nào còn giữ số cũ. Sửa dòng tổng cho khớp làm các dòng chi tiết và dòng tổng mâu thuẫn nhau.",
    diagram: [
      { label: "Ghi giả định vào một sheet riêng: tăng lương, số người, giá, tỷ lệ", arrow: true },
      { label: "Công thức ở sheet tính chỉ trỏ tới ô giả định, không gõ số cứng", arrow: true },
      { label: "Nhờ AI viết công thức từ mô tả bảng, tự kiểm một dòng bằng tay", arrow: true },
      { label: "Đổi một giả định, xem kết quả nhảy đúng, rồi gửi sếp kèm danh sách giả định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng hành chính giả định 8 người lập ngân sách lương năm sau. Trưởng phòng đề nghị xem ba kịch bản tăng lương 5%, 7% và 9%. Nhờ mức tăng nằm ở một ô giả định, kế toán đổi ba lần và có ba con số trong vài phút. Số liệu ở đây là giả định để minh hoạ, không phải của một công ty có thật.",
    },
    quiz: [
      {
        question: "Trong bảng ngân sách, giả định 'tăng lương 7%' nên được đặt ở đâu?",
        options: [
          "Một ô riêng, có nhãn, mà các công thức đều trỏ tới",
          "Gõ thẳng vào công thức lương để thấy ngay con số",
          "Ghi chú trong một ô bình luận của bảng và gõ lại vào từng công thức",
          "Lưu trong đầu người lập, và cập nhật công thức khi có ai hỏi",
        ],
        correct: 0,
        explanation:
          "Ô giả định có nhãn giúp người đọc thấy ngay ngân sách dựa trên gì, và đổi một chỗ là mọi công thức cập nhật. Gõ thẳng vào công thức giấu giả định và dễ sót khi đổi. Ghi chú rồi gõ lại là hai nơi có thể lệch nhau, còn giữ trong đầu thì người kế nhiệm không biết.",
      },
      {
        question: "8 người, lương trung bình 15 triệu/tháng, tăng 7%. Chi phí lương 12 tháng (chưa tính bảo hiểm, thuế) là bao nhiêu?",
        options: [
          "1.540,8 triệu (= 8 × 15 × 1,07 × 12)",
          "1.440 triệu (= 8 × 15 × 12)",
          "1.447 triệu (= 8 × 15 × 12 + 7, cộng thẳng 7 triệu thay vì tăng 7%)",
          "2.280 triệu (= 8 × 15 × (12 + 7), cộng 7 vào số tháng)",
        ],
        correct: 0,
        explanation:
          "Lương mỗi tháng sau tăng là 15 × 1,07 = 16,05 triệu; 8 người trong 12 tháng là 1.540,8 triệu. Đáp án 1.440 triệu quên tăng lương. Đáp án 1.447 cộng 7 triệu thay vì tăng 7%, còn 2.280 coi 7% là 7 tháng.",
      },
      {
        question: "AI viết công thức tính chi phí lương cho từng tháng. Cách kiểm nào hợp lý nhất?",
        options: [
          "Tính tay một dòng, rồi đổi giả định và xem kết quả đổi đúng",
          "Chạy công thức cho cả bảng và thấy không có ô nào báo lỗi",
          "Hỏi AI 'công thức có đúng không' và tin câu trả lời của nó",
          "Kiểm tổng cuối bảng, nếu lớn hơn năm ngoái thì công thức hợp lý",
        ],
        correct: 0,
        explanation:
          "Tính tay một dòng cho biết công thức có đúng ở một điểm; đổi giả định cho biết công thức có thật sự trỏ tới ô giả định. Không báo lỗi không có nghĩa là đúng. AI xác nhận công thức của chính nó không phải phép thử, và tổng lớn hơn năm ngoái có thể do nhiều lý do khác.",
      },
      {
        question: "Bạn nhờ AI viết công thức mà chỉ nói 'tính ngân sách lương'. AI có nhiều khả năng làm gì?",
        options: [
          "Tự chọn giả định như mức tăng và số tháng, rồi trình bày như thật",
          "Từ chối viết vì thiếu dữ liệu và yêu cầu bạn gửi đầy đủ tệp",
          "Tự lấy giả định mới nhất từ báo cáo lương của phòng bạn",
          "Viết ra công thức rất chính xác vì AI hiểu ngữ cảnh doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "AI không biết mức tăng của công ty bạn, nên khi thiếu thông tin nó thường điền số nghe hợp lý và không luôn nói rằng đó là điều nó đoán. Nó không tự từ chối, không đọc được báo cáo nội bộ của bạn và không hiểu ngữ cảnh doanh nghiệp nếu bạn không đưa. Vì vậy phải nêu giả định trong yêu cầu.",
      },
      {
        question: "Sếp muốn xem thêm kịch bản tăng lương 9%. Cách làm nào phù hợp với bảng có ô giả định?",
        options: [
          "Đổi ô giả định sang 9%, ghi lại kết quả, rồi đổi về mức cũ",
          "Sao chép cả bảng, tìm và thay 7% thành 9% trong bản sao mới",
          "Nhân kết quả hiện tại với 9 chia 7 để ra con số kịch bản mới",
          "Nhờ AI viết một bảng mới hoàn toàn cho kịch bản 9% và so sánh",
        ],
        correct: 0,
        explanation:
          "Đổi ô giả định cho ra số của kịch bản 9% với đúng cấu trúc bảng cũ. Tìm và thay có thể sót hoặc thay nhầm. Nhân theo tỷ lệ 9 chia 7 sai vì chỉ phần lương phụ thuộc mức tăng, còn phần khác của bảng thì không. Viết bảng mới làm hai bản khó so sánh.",
      },
    ],
    keyTakeaways: [
      "Giả định ghi ở một chỗ có nhãn; công thức chỉ trỏ tới nó.",
      "Nói rõ giả định trong yêu cầu gửi AI, vì AI sẽ tự điền nếu bạn không nói.",
      "Kiểm công thức AI viết bằng cách tính tay một dòng, rồi đổi giả định để thấy nó nhảy đúng.",
      "Gửi ngân sách kèm danh sách giả định để sếp biết bảng dựa trên gì.",
      "Nhiều kịch bản là đổi một ô giả định, không phải làm nhiều bảng.",
    ],
    practicePrompt: {
      question: "Bảng ngân sách của bạn có công thức '=B5*1.07*12' ở 30 ô. Bạn nên làm gì trước khi gửi sếp?",
      options: [
        "Đưa 1,07 và 12 vào ô giả định có nhãn, sửa công thức trỏ tới ô đó",
        "Giữ nguyên vì 1,07 và 12 đều là những số quen thuộc ai cũng hiểu",
        "Thêm bình luận vào từng ô ghi 1,07 là tăng lương để người đọc rõ",
        "Nhờ AI kiểm giúp 30 công thức có cùng một kết quả hay không",
      ],
      correct: 0,
      explanation:
        "Giả định để trong ô riêng thì đổi một lần và người đọc thấy ngay. Số cứng trong công thức khó đổi và khó hiểu với người sau. Bình luận vào 30 ô vẫn giữ 30 số cứng. AI kiểm chỉ cho biết 30 công thức giống nhau, không giúp đổi được giả định.",
    },
    summary: {
      keyIdea: "Ngân sách tốt là bảng có giả định hiển thị, đổi một chỗ là mọi số cập nhật.",
      formula: "Ô giả định có nhãn + công thức trỏ vào ô đó + tính tay một dòng để kiểm.",
      commonMistake: "Gõ số cứng như 1,07 hoặc 12 thẳng vào công thức, rồi giao AI viết tiếp mà không nói giả định.",
      action: "Lấy một bảng ngân sách của phòng, gom mọi số cứng trong công thức vào một sheet 'Giả định'.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở bảng ngân sách hoặc kế hoạch chi phí của phòng. Tìm ba số cứng nằm trong công thức, ví dụ mức tăng, số tháng, tỷ lệ. Đưa chúng vào một sheet 'Giả định', sửa công thức trỏ tới đó, rồi đổi thử một giả định để chắc các số nhảy đúng.",
      secondary: "Nếu bảng thuộc về phòng khác, làm trên bản sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Mai lập ngân sách cho phòng hành chính 8 người. Bảng đẹp, công thức chạy, nhưng mức tăng lương 7% nằm rải trong 40 công thức. Khi sếp hỏi 'nếu là 9% thì sao', chị mất cả buổi để đổi. Chỗ mất thời gian không nằm ở phép tính, mà ở chỗ giả định bị giấu.",
      },
      {
        type: "feynman",
        title: "Lập ngân sách đơn giản hơn bạn nghĩ",
        intro: "Bạn lập kế hoạch chi tiêu gia đình cho năm sau. Bạn ghi lên giấy: thu nhập dự kiến tăng bao nhiêu, tiền điện tăng bao nhiêu, con vào lớp nào. Đổi một điều, cả kế hoạch đổi theo.",
        columns: ["Phần", "Kế hoạch chi tiêu gia đình", "Ngân sách phòng ban"],
        rows: [
          ["Điều bạn đoán", "Thu nhập tăng, giá điện tăng, học phí tăng", "Mức tăng lương, số người, giá thuê, tỷ lệ tăng chi phí"],
          ["Nơi ghi", "Một trang đầu sổ, ai xem cũng thấy", "Một sheet giả định, có nhãn và người chịu trách nhiệm"],
          ["Phép tính", "Cộng, nhân từ các điều đã ghi", "Công thức chỉ trỏ tới ô giả định"],
          ["Khi đổi ý", "Sửa một dòng đầu sổ", "Đổi một ô, cả bảng cập nhật"],
        ],
        oneLiner: "Ghi điều mình đoán ở một chỗ rõ ràng, để mọi phép tính dựa vào nó và ai đọc cũng thấy.",
      },
      { type: "heading", text: "Hai lớp: giả định ở trên, tính toán ở dưới" },
      {
        type: "paragraph",
        text: "Chia bảng làm hai phần. Sheet giả định chứa những thứ bạn đoán hoặc được giao: mức tăng lương, số người, đơn giá, số tháng. Sheet tính chứa công thức, và mọi con số đầu vào đều lấy từ sheet giả định. Nhờ vậy người đọc mở sheet đầu là biết ngân sách dựa trên gì.",
      },
      {
        type: "chart",
        title: "Chi phí lương cộng dồn theo tháng, với ba giả định",
        caption: "Số liệu minh hoạ, tính bằng triệu đồng, chưa gồm bảo hiểm, thuế và thưởng. Kéo từng thanh trượt để thấy đổi một giả định làm cả đường thay đổi.",
        kind: "line",
        xLabel: "Tháng",
        yLabel: "Chi phí lương cộng dồn (triệu đồng)",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "nguoi", label: "Số người", min: 4, max: 20, step: 1, value: 8, unit: "người" },
          { id: "luong", label: "Lương trung bình mỗi tháng", min: 8, max: 30, step: 1, value: 15, unit: "triệu" },
          { id: "tang", label: "Mức tăng lương", min: 0, max: 15, step: 1, value: 7, unit: "%" },
        ],
        series: [{ label: "Chi phí lương cộng dồn", expr: "x * nguoi * luong * (1 + tang / 100)" }],
      },
      { type: "heading", text: "Nhờ AI viết công thức: nói rõ giả định" },
      {
        type: "code",
        language: "text",
        caption: "Prompt mẫu: mô tả bảng và giả định, không dán số liệu nhạy cảm.",
        code: `Tôi có sheet 'Giả định' với các ô: B2 = số người (8), B3 = lương trung bình
mỗi tháng tính bằng triệu (15), B4 = mức tăng lương (7%).
Sheet 'Tính' có cột A là tháng từ 1 đến 12.

Hãy viết công thức cho cột B: chi phí lương của từng tháng.
Yêu cầu:
- chỉ trỏ tới ô ở sheet 'Giả định', không gõ số cứng
- nêu rõ giả định nào bạn đã dùng thêm, nếu có
- cho ví dụ kết quả ở tháng 1 để tôi tự tính tay kiểm`,
      },
      {
        type: "list",
        items: [
          "Bước 1: tự tính trước một tháng bằng máy tính (8 × 15 × 1,07 = 128,4 triệu).",
          "Bước 2: so với ví dụ AI đưa ra, hai con số phải bằng nhau.",
          "Bước 3: đổi ô mức tăng từ 7% sang 9% và xem kết quả có nhảy đúng như tính tay không.",
          "Bước 4: gửi sếp bảng kèm danh sách giả định và nguồn của từng giả định.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI viết công thức ngân sách lương",
        task: "Bạn cần công thức chi phí lương từng tháng cho phòng 8 người, tăng lương 7%. Lắp một prompt để AI viết đúng và bạn kiểm được.",
        parts: [
          {
            id: "assume",
            label: "Giả định",
            options: [
              { text: "Tính ngân sách lương cho phòng tôi.", feedback: "Không có số người, lương hay mức tăng, nên AI tự điền giả định của nó và trình bày như thật." },
              { text: "Sheet Giả định: B2 = 8 người, B3 = 15 triệu mỗi tháng, B4 = tăng lương 7%.", good: true, feedback: "AI có đủ ba giả định và ô chứa chúng nên viết công thức trỏ đúng chỗ." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Viết công thức nào chạy được là đủ, gõ thẳng số vào cho gọn.", feedback: "Số cứng nằm trong công thức, đổi giả định sau này sẽ không cập nhật được." },
              { text: "Chỉ trỏ tới ô Giả định, không gõ số cứng, và nêu giả định nào bạn tự thêm.", good: true, feedback: "Công thức đổi theo giả định, và nếu AI tự thêm điều gì bạn sẽ thấy ngay." },
            ],
          },
          {
            id: "check",
            label: "Cách kiểm",
            options: [
              { text: "Không cần ví dụ, tôi sẽ tin công thức.", feedback: "Không có ví dụ, bạn không có con số nào để so với phép tính tay." },
              { text: "Cho một ví dụ kết quả tháng 1 để tôi tự tính tay so sánh.", good: true, feedback: "Bạn có con số cụ thể để so với 8 × 15 × 1,07 = 128,4." },
            ],
          },
        ],
        responses: [
          {
            requires: ["assume", "rule", "check"],
            text: "Ở ô B2 của sheet Tính, dùng: =Giả định!$B$2 * Giả định!$B$3 * (1 + Giả định!$B$4)\nKhông có giả định nào khác được thêm vào.\nVí dụ tháng 1: 8 × 15 × 1,07 = 128,4 triệu đồng.\nĐổi B4 thành 9% thì tháng 1 thành 8 × 15 × 1,09 = 130,8 triệu đồng.",
          },
          {
            requires: ["assume"],
            text: "Công thức: =8*15*1.07\nĐã tính cho 8 người, lương 15 triệu, tăng 7%.\n\n(Đúng số nhưng gõ cứng, nên đổi mức tăng sang 9% bạn phải sửa lại từng ô và không có ví dụ nào để tự kiểm.)",
          },
          {
            text: "Chi phí lương cả năm khoảng 2.100 triệu đồng, đã gồm bảo hiểm 21,5% và thưởng tháng 13.\n\n(AI không biết số người hay mức lương, nên tự bịa cả tỷ lệ bảo hiểm và khoản thưởng. Những giả định đó nghe có lý nhưng không do bạn đưa ra.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bảo hiểm và thuế",
        text: "Tỷ lệ đóng bảo hiểm, thuế thu nhập và các khoản theo luật thay đổi theo quy định. Đừng nhờ AI nêu tỷ lệ; hỏi kế toán trưởng hoặc bộ phận nhân sự mức áp dụng hiện tại rồi đưa vào ô giả định cùng nguồn.",
      },
      {
        type: "closing",
        lines: [
          "Ngân sách tốt cho phép ai cũng thấy nó dựa trên điều gì và tự đổi thử được.",
          "Bài sau: báo cáo công nợ theo tuổi nợ và soạn tin nhắc thanh toán lịch sự.",
        ],
      },
    ],
  },
  {
    id: 1829,
    slug: "bao-cao-tuoi-no-va-soan-nhac-thanh-toan",
    title: "Chặng 26, Bài 10: Báo cáo tuổi nợ và soạn nhắc thanh toán lịch sự",
    subtitle: "Xếp công nợ phải thu theo tuổi nợ bằng bảng tính; AI soạn nháp nhắc, bạn giữ giọng và số tiền.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một con số tổng công nợ phải thu không cho biết khoản nào đáng lo. Xếp theo tuổi nợ thì thấy ngay khoản nào mới quá hạn vài ngày và khoản nào đã treo gần nửa năm. Nhắc thanh toán cũng cần đúng giọng cho từng nhóm. AI soạn nháp nhanh, nhưng số tiền, số hoá đơn và lời lẽ với khách hàng vẫn phải do bạn kiểm.",
    openingQuestion:
      "Tổng công nợ phải thu của công ty là 1.030 triệu đồng và sếp hỏi 'lo được chưa' (số liệu minh hoạ). Bạn cần thêm thông tin nào để trả lời có ích nhất?",
    openingOptions: [
      "Số tiền đó nằm ở nhóm tuổi nợ nào: trong hạn, quá hạn ngắn hay quá hạn dài",
      "Tên khách nợ nhiều nhất, vì một khách lớn quyết định toàn bộ mức độ rủi ro",
      "Số hoá đơn đã xuất, vì càng nhiều hoá đơn thì khả năng thu hồi càng thấp",
      "Tổng doanh thu cả năm, vì nợ so với doanh thu mới cho biết có đáng lo không",
    ],
    correctOption: 0,
    explanation:
      "Cùng 1.030 triệu, nếu phần lớn còn trong hạn thì tình hình khác hẳn khi phần lớn quá hạn trên 90 ngày. Tuổi nợ cho biết khả năng thu hồi và việc cần làm trước. Tên khách lớn cũng quan trọng nhưng chưa nói nợ đó có quá hạn hay chưa. Số hoá đơn không đo rủi ro, và so với doanh thu chỉ cho một tỷ lệ chung, không chỉ ra khoản nào cần nhắc.",
    diagram: [
      { label: "Bảng công nợ: khách, số hoá đơn, số tiền, ngày đến hạn", arrow: true },
      { label: "Tính số ngày quá hạn = ngày báo cáo trừ ngày đến hạn", arrow: true },
      { label: "Xếp nhóm: trong hạn, 1-30, 31-60, 61-90, trên 90 ngày", arrow: true },
      { label: "Nhắc từng nhóm bằng giọng phù hợp, kế toán trưởng duyệt trường hợp khó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một công ty phân phối nhỏ giả định có 1.030 triệu công nợ phải thu, trong đó 640 triệu còn trong hạn và 37 triệu quá hạn trên 90 ngày. Kế toán không gửi cùng một mẫu nhắc cho tất cả: nhóm quá hạn vài ngày nhận một tin nhắn nhẹ nhàng, nhóm trên 90 ngày được chuyển cho kế toán trưởng và bộ phận bán hàng cùng xử lý. Đây là số liệu giả định để minh hoạ.",
    },
    quiz: [
      {
        question: "Hoá đơn đến hạn ngày 10/9, ngày lập báo cáo là 30/9. Hoá đơn này nằm ở nhóm nào nếu tính tuổi nợ từ ngày đến hạn?",
        options: [
          "Quá hạn 20 ngày, thuộc nhóm 1 đến 30 ngày",
          "Quá hạn 30 ngày, nhóm 1-30 vì tính từ 1/9",
          "Trong hạn vì chưa quá một tháng kể từ ngày đến hạn",
          "Quá hạn 20 ngày, thuộc nhóm 31 đến 60 ngày vì tính cả tháng trước",
        ],
        correct: 0,
        explanation:
          "Từ 10/9 đến 30/9 là 20 ngày, nên nhóm 1 đến 30 ngày quá hạn. Con số 30 ngày là do tính từ đầu tháng, không phải từ ngày đến hạn. Hoá đơn đã qua ngày đến hạn thì không còn trong hạn. Nhóm 31 đến 60 chỉ đúng nếu quá hạn hơn 30 ngày.",
      },
      {
        question: "Vì sao báo cáo tuổi nợ hữu ích hơn tổng công nợ?",
        options: [
          "Cho biết khoản nào cần nhắc trước và mức độ khó thu hồi",
          "Cho biết chính xác khách nào sẽ trả tiền vào tuần sau",
          "Cho biết khách nào cố ý không trả và cần xử lý mạnh tay",
          "Cho số tổng nhỏ hơn nên báo cáo tài chính trông đẹp hơn",
        ],
        correct: 0,
        explanation:
          "Cùng số tổng nhưng cơ cấu tuổi nợ khác nhau dẫn tới việc làm khác nhau: nhóm mới quá hạn thì nhắc nhẹ, nhóm trên 90 ngày cần bàn với bán hàng. Báo cáo không dự đoán được ngày trả, không cho biết ý định của khách, và không làm số tổng nhỏ đi.",
      },
      {
        question: "Bạn nhờ AI soạn tin nhắc khách quá hạn 12 ngày. Bạn nên đưa cho AI những thông tin nào?",
        options: [
          "Mã khách, số hoá đơn, số tiền, ngày đến hạn và giọng cần dùng",
          "Toàn bộ bảng công nợ với tên và số điện thoại của mọi khách",
          "Chỉ tên khách, để AI tự chọn số tiền và ngày đến hạn hợp lý",
          "Số tài khoản công ty và thông tin liên hệ cá nhân",
        ],
        correct: 0,
        explanation:
          "Bản nhắc cần đúng số hoá đơn, số tiền và hạn, còn tên thật thay bằng mã khi đưa vào AI. Đưa cả bảng lộ dữ liệu không cần thiết. Nếu chỉ đưa tên thì AI sẽ tự bịa số tiền và ngày. Số tài khoản và thông tin cá nhân không cần cho việc soạn nháp và không nên đưa vào.",
      },
      {
        question: "Bản nháp AI viết có câu 'nếu không thanh toán trong 3 ngày, chúng tôi sẽ khởi kiện'. Bạn làm gì?",
        options: [
          "Xoá câu đó, đây là điều công ty chưa quyết và thuộc pháp chế",
          "Giữ lại vì lời nhắc mạnh mới khiến khách nhanh chóng thanh toán",
          "Sửa số ngày cho hợp lý hơn rồi giữ nguyên ý khởi kiện của câu",
          "Giữ lại vì AI thường viết đúng các thông lệ pháp lý phổ biến",
        ],
        correct: 0,
        explanation:
          "Doạ khởi kiện là một cam kết mà chỉ công ty, cùng bộ phận pháp chế, mới được quyết. Một câu do AI tự thêm có thể khiến công ty phải giải thích hoặc bị xem là gây áp lực sai. Đổi số ngày không sửa vấn đề. Việc AI viết trôi chảy không có nghĩa nội dung pháp lý đúng.",
      },
      {
        question: "Khách trả lời 'tôi đã chuyển khoản tuần trước rồi'. Bạn xử lý thế nào?",
        options: [
          "Kiểm sao kê xem khoản đó đã về chưa rồi mới trả lời khách",
          "Xin lỗi khách và xoá công nợ ngay vì khách khẳng định đã trả",
          "Nhắc lại lần nữa vì khách nào cũng nói đã chuyển khi bị nhắc",
          "Nhờ AI soạn trả lời và xác nhận với khách là công ty đã nhận",
        ],
        correct: 0,
        explanation:
          "Sao kê là bằng chứng: có khoản về đúng số tiền thì ghi nhận thanh toán, chưa có thì xin khách gửi chứng từ chuyển khoản. Xoá nợ theo lời nói khi chưa thấy tiền là sai sổ, nhắc lại như không nghe khách là thiếu lịch sự, và AI không biết tiền đã về hay chưa nên không thể xác nhận.",
      },
    ],
    keyTakeaways: [
      "Tổng công nợ không đủ; cần xếp theo tuổi nợ.",
      "Nói rõ tuổi nợ tính từ ngày đến hạn hay ngày hoá đơn, theo chính sách công ty.",
      "Nhóm khác nhau thì giọng nhắc khác nhau: nhẹ ở nhóm mới quá hạn, phối hợp với bán hàng ở nhóm dài ngày.",
      "AI soạn nháp từ số hoá đơn, số tiền và hạn bạn đưa; bạn kiểm từng con số.",
      "Không doạ và không nêu hậu quả pháp lý trong tin nhắc; hỏi pháp chế nếu cần.",
    ],
    practicePrompt: {
      question: "Khách quá hạn 75 ngày, nợ 48 triệu, trước đây trả đều đặn. Bạn nên làm gì trước khi gửi nhắc?",
      options: [
        "Hỏi bộ phận bán hàng xem khách có vướng mắc nào về hàng hoá không",
        "Gửi ngay tin nhắc mạnh vì đã quá 60 ngày, nhóm này cần cứng rắn",
        "Nhờ AI soạn thư có nêu khả năng khởi kiện để khách sớm thanh toán",
        "Chuyển thẳng sang xoá nợ vì quá hạn hơn 60 ngày thì coi như mất",
      ],
      correct: 0,
      explanation:
        "Khách vốn trả đều mà quá hạn dài có thể do vướng mắc như hàng lỗi hay sai hoá đơn. Bộ phận bán hàng biết điều đó. Nhắc mạnh khi chưa hiểu lý do dễ làm mất khách, nêu khởi kiện thuộc quyền pháp chế, và xoá nợ là quyết định của kế toán trưởng, không phải vì đã quá hạn.",
    },
    summary: {
      keyIdea: "Xếp công nợ theo tuổi nợ để biết việc nào làm trước, rồi nhắc mỗi nhóm bằng giọng phù hợp.",
      formula: "Ngày báo cáo - ngày đến hạn = số ngày quá hạn → nhóm tuổi nợ → cách xử lý.",
      commonMistake: "Gửi cùng một mẫu nhắc cứng rắn cho mọi khách, hoặc để AI thêm lời doạ không ai duyệt.",
      action: "Lập bảng tuổi nợ cho 20 hoá đơn chưa thu, soạn nháp ba mẫu nhắc cho ba nhóm.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy 20 hoá đơn chưa thu gần nhất. Thêm cột số ngày quá hạn (ngày hôm nay trừ ngày đến hạn) và xếp vào nhóm. Soạn nháp một tin nhắc cho nhóm 1 đến 30 ngày, thay tên khách bằng mã nếu dùng AI, rồi tự kiểm số hoá đơn và số tiền.",
      secondary: "Không chắc nên nhắc thế nào với khách quá hạn lâu thì hỏi kế toán trưởng trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Anh Long phụ trách công nợ phải thu. Sếp hỏi 'nợ khách còn bao nhiêu, lo được chưa'. Anh có một con số tổng, nhưng con số đó chưa trả lời được câu hỏi thứ hai. Muốn trả lời, anh phải biết mỗi đồng nợ đã nằm đó bao lâu.",
      },
      {
        type: "feynman",
        title: "Báo cáo tuổi nợ đơn giản hơn bạn nghĩ",
        intro: "Tủ lạnh nhà bạn có rau, sữa, thịt. Bạn không chỉ đếm có mấy món, mà xem món nào mua hôm qua, món nào đã để cả tuần. Món để càng lâu càng dễ hỏng, nên bạn dùng món cũ trước.",
        columns: ["Điểm", "Thực phẩm trong tủ lạnh", "Công nợ phải thu"],
        rows: [
          ["Cách xếp", "Theo ngày mua hoặc hạn dùng", "Theo số ngày quá hạn kể từ ngày đến hạn"],
          ["Càng lâu", "Càng dễ hỏng, khó dùng", "Càng khó thu hồi"],
          ["Ưu tiên", "Dùng món cũ trước", "Xử lý nhóm quá hạn lâu trước, nhưng cách xử lý khác nhau"],
          ["Điểm khác", "Đồ hỏng thì bỏ", "Nợ quá hạn có thể còn thu được nên xoá nợ là quyết định của người có thẩm quyền"],
        ],
        oneLiner: "Xem mỗi khoản nợ đã nằm đó bao lâu, vì càng lâu càng khó thu và cần cách xử lý khác nhau.",
      },
      { type: "heading", text: "Tính tuổi nợ bằng một cột" },
      {
        type: "paragraph",
        text: "Thêm cột 'số ngày quá hạn' bằng ngày lập báo cáo trừ ngày đến hạn. Nếu kết quả âm hoặc bằng 0, hoá đơn còn trong hạn. Sau đó xếp vào các nhóm: trong hạn, 1 đến 30, 31 đến 60, 61 đến 90 và trên 90 ngày. Hãy hỏi kế toán trưởng công ty tính tuổi nợ từ ngày đến hạn hay từ ngày hoá đơn, vì hai cách cho hai bảng khác nhau.",
      },
      {
        type: "chart",
        title: "Dư nợ phải thu theo nhóm tuổi nợ",
        caption: "Số liệu minh hoạ cho một công ty giả định, tính bằng triệu đồng, tổng 1.030 triệu. Không phải thống kê thật.",
        kind: "bar",
        yLabel: "Dư nợ (triệu đồng)",
        data: [
          { label: "Trong hạn", values: [640] },
          { label: "Quá hạn 1-30 ngày", values: [210] },
          { label: "Quá hạn 31-60 ngày", values: [95] },
          { label: "Quá hạn 61-90 ngày", values: [48] },
          { label: "Quá hạn trên 90 ngày", values: [37] },
        ],
        seriesLabels: ["Dư nợ"],
      },
      {
        type: "paragraph",
        text: "Hơn một nửa dư nợ còn trong hạn, và phần quá hạn trên 90 ngày là 37 triệu. Con số nhỏ nhưng nhóm này cần người bán hàng và kế toán trưởng cùng xem, vì đó là các khoản khó thu nhất.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhóm quá hạn ngắn (1 đến 30 ngày)",
          text: "Thường do quên hoặc chờ duyệt bên khách. Tin nhắc nhẹ nhàng, kèm số hoá đơn và số tài khoản công ty đã dùng trước đó.",
        },
        right: {
          label: "Nhóm quá hạn dài (trên 60 ngày)",
          text: "Có thể có vướng mắc về hàng hoặc hoá đơn. Trước khi nhắc, hỏi bộ phận bán hàng; kế hoạch xử lý do kế toán trưởng quyết định.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn tin nhắc khách quá hạn 12 ngày",
        task: "Khách mã K-045 còn hoá đơn HD-2291, 36.500.000 đồng, hạn 18/9, đã quá 12 ngày. Lắp prompt để AI soạn nháp tin nhắc.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Soạn tin nhắc khách trả tiền.", feedback: "Không có số hoá đơn, số tiền, hạn. AI sẽ tự bịa những con số đó." },
              { text: "Khách K-045, hoá đơn HD-2291, số tiền 36.500.000 đồng, đến hạn 18/9, quá hạn 12 ngày.", good: true, feedback: "Có đủ số hoá đơn, số tiền và hạn, nên bản nháp chỉ việc dùng đúng những dữ kiện này." },
            ],
          },
          {
            id: "tone",
            label: "Giọng nhắc",
            options: [
              { text: "Lịch sự, ngắn gọn, giả định khách chỉ quên, hỏi xem có vướng mắc gì không, không doạ, không nêu hậu quả pháp lý.", good: true, feedback: "Giọng phù hợp nhóm quá hạn ngắn và ngăn AI thêm lời doạ." },
              { text: "Cứng rắn để khách thấy nghiêm trọng và trả ngay.", feedback: "Khách mới quá hạn 12 ngày thường chỉ quên; giọng cứng rắn làm hỏng quan hệ và AI có thể tự thêm điều doạ." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm điều khoản phạt và thời hạn cuối để có sức ép.", feedback: "Đó là những cam kết của công ty mà chưa ai quyết; AI sẽ bịa mức phạt." },
              { text: "Chỉ dùng dữ kiện tôi đưa, không tự thêm mức phạt, hạn mới hay điều khoản nào.", good: true, feedback: "Bản nháp không chứa cam kết nào công ty chưa đưa ra." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "tone", "limit"],
            text: "Kính gửi Quý khách,\n\nChúng tôi xin nhắc nhẹ hoá đơn HD-2291 số tiền 36.500.000 đồng, đến hạn ngày 18/9, hiện đã qua 12 ngày. Có thể Quý khách đã thanh toán và chúng tôi chưa ghi nhận kịp; nếu vậy xin gửi giúp chứng từ chuyển khoản. Nếu có vướng mắc về hàng hoá hay hoá đơn, xin báo để chúng tôi hỗ trợ.\n\nTrân trọng.",
          },
          {
            requires: ["facts"],
            text: "Kính gửi Quý khách,\n\nHoá đơn HD-2291 số tiền 36.500.000 đồng đã quá hạn 12 ngày. Đề nghị Quý khách thanh toán ngay để tránh ảnh hưởng tới các đơn hàng tiếp theo.\n\n(Đúng số liệu nhưng giọng cứng, và câu 'ảnh hưởng tới đơn tiếp theo' là một hàm ý công ty chưa hề quyết định.)",
          },
          {
            text: "Kính gửi Quý khách,\n\nHoá đơn của Quý khách đã quá hạn 30 ngày. Nếu không thanh toán 45.000.000 đồng trước ngày 5/10, công ty sẽ tính phạt 2% mỗi tuần và chuyển hồ sơ cho bộ phận pháp lý.\n\n(AI tự bịa số ngày, số tiền, mức phạt và lời doạ pháp lý, không cái nào từ dữ liệu của bạn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Tên khách và số tiền là dữ liệu nhạy cảm",
        text: "Danh sách khách nợ và số tiền cụ thể là thông tin kinh doanh. Đổi tên thành mã trước khi đưa vào AI, chỉ đưa các dòng cần soạn và dùng công cụ công ty đã duyệt. Khi thay mã bằng tên thật trong bản gửi đi, đối chiếu lại số hoá đơn từng chữ.",
      },
      {
        type: "scenario",
        title: "Khách nói đã chuyển khoản",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi tin nhắc cho khách K-045. Khách trả lời: 'Tôi đã chuyển khoản tuần trước rồi mà'. Bạn chưa thấy khoản đó trong sổ.",
            choices: [
              { label: "Xoá công nợ ngay theo lời khách để khách không phật lòng", next: "bad_delete" },
              { label: "Kiểm sao kê và sổ tiền gửi xem khoản 36.500.000 đã về chưa", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Tuần sau đối chiếu, sao kê không có khoản nào. Khách chuyển nhầm sang tài khoản khác. Công nợ đã xoá khỏi sổ và bạn phải sửa lại, còn báo cáo tuổi nợ tháng trước bị sai.",
            ending: "bad",
          },
          s2: {
            text: "Sao kê có một khoản 36.500.000 vào ngày 26/9 với nội dung chuyển khoản chỉ ghi tên công ty khách, không ghi số hoá đơn. Sổ chưa ghi nhận.",
            choices: [
              { label: "Đối chiếu với hoá đơn HD-2291, ghi nhận thanh toán, và báo lại khách đã nhận", next: "good" },
              { label: "Nhờ AI soạn tin xác nhận đã nhận tiền, gửi luôn mà chưa đối chiếu hoá đơn", next: "bad_confirm" },
            ],
          },
          good: {
            text: "Bạn ghi nhận đúng khoản thanh toán, dư nợ K-045 về không, và khách được cảm ơn bằng một tin ngắn. Báo cáo tuổi nợ tháng sau đúng.",
            ending: "good",
          },
          bad_confirm: {
            text: "Tin đã gửi, nhưng khoản 36.500.000 thực ra thanh toán cho hoá đơn khác của cùng khách. HD-2291 vẫn treo, khách tin rằng đã xong, và cuối tháng công nợ lại phải giải thích lại.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tuổi nợ cho biết khoản nào cần làm trước, giọng nhắc cho biết bạn giữ quan hệ ra sao.",
          "Bốn bài kế toán của chặng này cùng một nguyên tắc: AI gợi ý và soạn nháp, bạn kiểm số và giữ quyết định.",
        ],
      },
    ],
  },
  {
    id: 1826,
    slug: "doi-chieu-sao-ke-ngan-hang-voi-so-sach",
    title: "Chặng 26, Bài 7: Đối chiếu sao kê ngân hàng với sổ sách",
    subtitle: "Đi từng khoản giữa sao kê và sổ tiền gửi thay vì ép hai tổng khớp nhau; AI chỉ gợi ý dòng nghi lệch, bạn quyết định.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng, số dư trên sao kê ngân hàng và số dư trên sổ tiền gửi hiếm khi bằng nhau. Cách làm chắc chắn là dò từng khoản để tìm ra lý do của từng phần chênh, không phải chỉnh một con số cho khớp. AI giúp lọc nhanh các dòng nghi ngờ trong bảng dài, nhưng khoản nào là lỗi, khoản nào chỉ lệch thời điểm thì bạn phải tự xác nhận với chứng từ.",
    openingQuestion:
      "Cuối tháng, số dư sổ tiền gửi thấp hơn sao kê ngân hàng 86 triệu đồng (số liệu minh hoạ). Bạn làm gì trước tiên?",
    openingOptions: [
      "Đặt hai danh sách giao dịch cạnh nhau và dò từng khoản có ở bên này mà thiếu ở bên kia",
      "Ghi một bút toán điều chỉnh 86 triệu vào sổ cho khớp sao kê, chuyện nguyên nhân tính sau khi đóng kỳ",
      "Coi sao kê là đúng tuyệt đối rồi sửa số dư đầu kỳ trong sổ cho hai bên bằng nhau",
      "Hỏi AI 'vì sao lệch 86 triệu' và ghi nhận nguyên nhân AI nêu đầu tiên vào bảng đối chiếu",
    ],
    correctOption: 0,
    explanation:
      "Phần chênh 86 triệu là tổng của nhiều khoản nhỏ, mỗi khoản có nguyên nhân riêng như thu chưa ghi sổ, ghi trùng hay lệch ngày. Dò từng khoản là cách duy nhất tìm ra chúng. Bút toán điều chỉnh chung và sửa số dư đầu kỳ chỉ che chênh lệch đi, còn AI không nhìn thấy chứng từ của bạn nên câu trả lời đầu tiên chỉ là một phỏng đoán.",
    diagram: [
      { label: "Lấy sao kê và sổ tiền gửi cùng kỳ, cùng tài khoản", arrow: true },
      { label: "Ghép từng khoản theo số tiền, ngày và nội dung", arrow: true },
      { label: "Khoản không ghép được thì tìm chứng từ và xếp vào loại: chưa ghi sổ, ghi sai, lệch thời điểm", arrow: true },
      { label: "Lập bảng đối chiếu: số dư hai bên sau các khoản điều chỉnh phải bằng nhau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một công ty thương mại nhỏ giả định thấy sổ tiền gửi thấp hơn sao kê 86 triệu. Kế toán không chỉnh tổng. Chị dò từng khoản và thấy ba nguyên nhân: 34 triệu khách chuyển vào chưa ghi sổ, 4,5 triệu lãi tiền gửi chưa ghi, và một khoản chi 47,5 triệu bị nhập hai lần trong sổ. Sau ba bước, chênh lệch về không. Đây là số liệu giả định để minh hoạ.",
    },
    quiz: [
      {
        question: "Sao kê có khoản thu 34 triệu ngày 28 của một khách, sổ tiền gửi chưa có. Đúng cách xử lý là gì?",
        options: [
          "Tìm chứng từ và hoá đơn của khách rồi ghi thu vào sổ",
          "Bỏ qua vì sổ đã đóng, tháng sau sao kê sẽ tự khớp",
          "Trừ 34 triệu khỏi số dư sao kê cho khớp số dư sổ",
          "Ghi thu ngay theo sao kê, khỏi cần biết khách nào",
        ],
        correct: 0,
        explanation:
          "Tiền đã về tài khoản thì sổ phải ghi, và ghi đúng khách, đúng hoá đơn để công nợ cũng đúng. Bỏ qua sẽ để chênh lệch kéo sang tháng sau và công nợ khách vẫn treo. Trừ số dư sao kê là làm sai số thật của ngân hàng. Ghi mà chưa biết khách nào thì để lại một khoản thu chưa phân loại.",
      },
      {
        question: "Séc công ty đã phát hành và ghi chi trong sổ, nhưng chưa được ngân hàng thanh toán tới cuối tháng. Khoản này thuộc loại nào?",
        options: [
          "Lệch thời điểm, chỉ là khoản đang chờ, không sửa sổ",
          "Lỗi ghi sổ, cần xoá bút toán chi để sổ khớp với sao kê",
          "Khoản ngân hàng sai, cần gửi yêu cầu điều chỉnh sao kê",
          "Khoản trùng lặp, cần huỷ một bên và ghi lại từ đầu",
        ],
        correct: 0,
        explanation:
          "Sổ ghi đúng lúc phát hành, ngân hàng ghi lúc thanh toán, nên chênh nhau chỉ vì khác thời điểm và sẽ tự hết khi séc được thanh toán. Xoá bút toán chi sẽ làm sổ sai. Ngân hàng không có lỗi, và khoản này không bị nhập hai lần nên không có gì để huỷ.",
      },
      {
        question: "Sau khi ghép hết, còn một khoản chi 47,5 triệu xuất hiện hai lần trong sổ nhưng chỉ một lần trong sao kê. Bạn làm gì?",
        options: [
          "Xoá dòng nhập trùng sau khi kiểm chứng từ chỉ có một lần chi",
          "Giữ cả hai dòng và ghi thêm một khoản thu 47,5 triệu để bù lại",
          "Xoá dòng cũ hơn mà không xem chứng từ vì hai dòng như nhau",
          "Để nguyên và ghi vào bảng đối chiếu là chênh lệch không giải thích được",
        ],
        correct: 0,
        explanation:
          "Chứng từ cho biết khoản chi có xảy ra một lần hay hai lần. Chỉ một lần thì dòng thứ hai là nhập trùng và cần xoá hoặc đảo đúng quy định. Ghi thêm khoản thu để bù làm sổ có thêm một nghiệp vụ không có thật. Xoá theo cảm tính có thể giữ dòng sai. Bỏ lửng thì bảng đối chiếu không bao giờ về không.",
      },
      {
        question: "Bạn dán 40 dòng sao kê và 38 dòng sổ (đã đổi tên bằng mã) cho AI, nhờ tìm dòng không khớp. Kết quả AI trả về nên dùng thế nào?",
        options: [
          "Là danh sách nghi vấn để bạn tự đối chiếu với chứng từ",
          "Là kết luận cuối vì AI so sánh số liệu chính xác hơn người",
          "Là căn cứ ghi bút toán điều chỉnh, khỏi xem chứng từ",
          "Là bảng đối chiếu hoàn chỉnh chỉ cần kế toán trưởng ký duyệt",
        ],
        correct: 0,
        explanation:
          "AI có thể bỏ sót dòng, ghép nhầm hai khoản cùng số tiền hoặc bịa nguyên nhân. Vì vậy kết quả chỉ là chỗ để bạn nhìn trước. Coi nó là kết luận, dùng nó ghi bút toán hoặc đem đi ký duyệt khi chưa đối chiếu chứng từ là chuyển trách nhiệm cho công cụ không thấy hồ sơ của bạn.",
      },
      {
        question: "Vì sao không nên chỉ so hai số tổng cuối tháng rồi kết luận khớp hay không khớp?",
        options: [
          "Hai sai sót ngược chiều có thể bù nhau và tổng vẫn bằng nhau",
          "Tổng luôn bằng nhau nếu ngân hàng làm đúng nên so tổng là thừa",
          "Số tổng của sao kê thường tính sai nên chỉ số của sổ mới đáng tin",
          "Tổng chỉ dùng được cho tài khoản có ít hơn 10 giao dịch trong tháng",
        ],
        correct: 0,
        explanation:
          "Một khoản thu chưa ghi 10 triệu và một khoản chi ghi thừa 10 triệu triệt tiêu nhau, nên tổng bằng mà sổ vẫn sai hai chỗ. Đó là lý do phải ghép từng khoản. Tổng bằng nhau không chứng minh ngân hàng đúng, sao kê không phải bên hay sai tổng, và không có mốc số giao dịch nào làm phép so tổng đáng tin.",
      },
    ],
    keyTakeaways: [
      "Đối chiếu là dò từng khoản, không phải chỉnh tổng cho khớp.",
      "Mỗi khoản lệch có một nguyên nhân: chưa ghi sổ, ghi sai hoặc trùng, hay lệch thời điểm.",
      "Chỉ khoản chưa ghi hoặc ghi sai mới sửa sổ; khoản lệch thời điểm thì để trong bảng đối chiếu.",
      "AI lọc dòng nghi ngờ nhanh hơn, nhưng chứng từ và quyết định là của bạn.",
      "Đổi tên đối tác thành mã trước khi đưa dữ liệu vào AI.",
    ],
    practicePrompt: {
      question: "Sổ và sao kê lệch 12 triệu, còn 3 khoản chưa ghép được: 5 triệu, 4 triệu và 3 triệu. Bạn làm gì?",
      options: [
        "Tìm chứng từ của từng khoản trong ba khoản đó để biết mỗi khoản thuộc loại nào",
        "Gộp ba khoản thành một bút toán chênh lệch 12 triệu để bảng đối chiếu về không",
        "Chọn khoản 5 triệu vì lớn nhất và giả định hai khoản còn lại tự khớp sau",
        "Hỏi AI khoản nào nhiều khả năng sai nhất rồi sửa đúng khoản đó",
      ],
      correct: 0,
      explanation:
        "Mỗi khoản có nguyên nhân riêng nên phải có chứng từ riêng. Gộp thành bút toán chênh lệch che lỗi đi, chỉ xử lý khoản lớn nhất bỏ sót hai khoản còn lại, và nhờ AI đoán xác suất không thay được chứng từ mà chỉ nó mới cho biết khoản nào sai thật.",
    },
    summary: {
      keyIdea: "Đối chiếu ngân hàng là đi qua từng khoản, giải thích từng phần chênh và chỉ sửa sổ ở chỗ thật sự sai.",
      formula: "Số dư sao kê ± khoản lệch thời điểm = số dư sổ ± khoản chưa ghi hoặc ghi sai.",
      commonMistake: "Ghi một bút toán điều chỉnh để tổng khớp mà không biết khoản nào gây ra chênh lệch.",
      action: "Chọn một tài khoản ngân hàng, đối chiếu 20 giao dịch gần nhất, xếp từng khoản chưa khớp vào một trong ba loại.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy sao kê và sổ tiền gửi của một tài khoản trong 20 giao dịch gần nhất. Đánh dấu khoản ghép được, rồi với mỗi khoản chưa ghép ghi một dòng: chưa ghi sổ, ghi sai hoặc trùng, hay lệch thời điểm, kèm chứng từ cần tìm. Nếu dùng AI, đổi tên đối tác thành mã và chỉ dùng kết quả để chọn dòng xem trước.",
      secondary: "Nếu công ty có quy trình đối chiếu riêng thì làm theo quy trình đó và hỏi kế toán trưởng trước khi sửa sổ.",
    },
    sections: [
      {
        type: "lead",
        text: "Chị Mai cuối tháng thấy sổ tiền gửi thấp hơn sao kê 86 triệu. Cách nhanh nhất là ghi một bút toán cho hai bên bằng nhau, và chị biết nó nguy hiểm: mai kia sếp hỏi 86 triệu đó là gì thì không ai trả lời được. Chị chọn đi ngược lại từng khoản.",
      },
      {
        type: "feynman",
        title: "Đối chiếu sao kê đơn giản hơn bạn nghĩ",
        intro: "Cuối tuần ví bạn còn ít tiền hơn bạn nghĩ. Bạn không tự nói 'chắc bớt đi đúng chừng đó', mà mở sổ chi tiêu ra và lần lại từng khoản: tiền ăn sáng, tiền xăng, cà phê chưa ghi.",
        columns: ["Điểm", "Ví và sổ chi tiêu cá nhân", "Sao kê và sổ tiền gửi"],
        rows: [
          ["Hai nguồn", "Tiền trong ví và cuốn sổ ghi chi", "Sao kê ngân hàng và sổ kế toán"],
          ["Cách tìm chênh", "Đi qua từng khoản đã tiêu", "Ghép từng giao dịch theo số tiền, ngày, nội dung"],
          ["Nguyên nhân hay gặp", "Quên ghi, ghi hai lần", "Chưa ghi sổ, nhập trùng, lệch thời điểm"],
          ["Điểm khác", "Tự nhớ lại là đủ", "Cần chứng từ để chứng minh từng khoản"],
        ],
        oneLiner: "Đừng ép hai tổng bằng nhau; đi lại từng khoản cho đến khi giải thích được mọi phần chênh.",
      },
      { type: "heading", text: "Ba loại chênh lệch" },
      {
        type: "paragraph",
        text: "Chênh lệch giữa sao kê và sổ thường thuộc ba loại. Loại một là khoản có ở ngân hàng mà chưa vào sổ, như tiền khách chuyển hay lãi tiền gửi. Loại hai là khoản ghi sai hoặc ghi trùng trong sổ. Loại ba là lệch thời điểm, như séc đã phát hành mà ngân hàng chưa thanh toán. Hai loại đầu cần sửa sổ, loại ba chỉ ghi trong bảng đối chiếu và tự hết.",
      },
      {
        type: "chart",
        title: "Chênh lệch còn lại sau từng bước đối chiếu",
        caption: "Số liệu minh hoạ cho một công ty giả định, tính bằng triệu đồng. Không phải thống kê thật.",
        kind: "bar",
        yLabel: "Chênh lệch còn lại (triệu đồng)",
        data: [
          { label: "Ban đầu", values: [86] },
          { label: "Sau khi ghi thu 34 triệu của khách", values: [52] },
          { label: "Sau khi ghi lãi tiền gửi 4,5 triệu", values: [47.5] },
          { label: "Sau khi xoá khoản chi nhập trùng 47,5 triệu", values: [0] },
        ],
        seriesLabels: ["Chênh lệch còn lại"],
      },
      {
        type: "paragraph",
        text: "Mỗi bước có một chứng từ đứng sau: giấy báo có, thông báo lãi, chứng từ chi chỉ có một lần. Chênh lệch giảm dần vì được giải thích, không phải vì ai đó chỉnh số.",
      },
      {
        type: "flow",
        title: "Năm bước đối chiếu một tài khoản",
        steps: [
          { label: "Chốt kỳ và tài khoản", detail: "Lấy sao kê và sổ tiền gửi cùng tài khoản, cùng khoảng ngày. Khác kỳ thì mọi phép so sau đó sai ngay từ đầu." },
          { label: "Ghép các khoản giống nhau", detail: "Đánh dấu cặp có cùng số tiền, ngày gần nhau, nội dung khớp. Phần đã ghép xong thì bỏ qua." },
          { label: "Liệt kê khoản còn lẻ ở mỗi bên", detail: "Khoản chỉ có trên sao kê, khoản chỉ có trong sổ. Đây là danh sách cần giải thích." },
          { label: "Tìm chứng từ và xếp loại", detail: "Với mỗi khoản, tìm giấy báo, hoá đơn hay chứng từ chi, rồi xếp: chưa ghi sổ, ghi sai hoặc trùng, hay lệch thời điểm." },
          { label: "Sửa sổ và lập bảng đối chiếu", detail: "Sửa các khoản thuộc hai loại đầu theo quy định công ty; loại ba ghi trong bảng. Cuối cùng hai số dư sau điều chỉnh phải bằng nhau." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý dòng nghi lệch",
        task: "Bạn có 40 dòng sao kê và 38 dòng sổ tiền gửi, đã đổi tên đối tác thành mã. Lắp prompt để AI chỉ ra các dòng có thể chưa khớp.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              { text: "Đây là sổ và sao kê của công ty, hãy tìm chỗ sai.", feedback: "Không nói rõ dữ liệu nằm ở đâu, kỳ nào và cột nào là gì; AI sẽ đoán cấu trúc." },
              { text: "Hai bảng sau cùng tài khoản, cùng tháng 9, cột: ngày, mã đối tác, số tiền, nội dung. Tên đối tác đã thay bằng mã.", good: true, feedback: "Cấu trúc rõ, cùng kỳ, và không lộ tên đối tác." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Liệt kê các dòng chỉ có ở một bên, mỗi dòng ghi lý do nghi ngờ, và gắn nhãn 'nghi vấn' chứ không kết luận.", good: true, feedback: "AI chỉ gợi ý danh sách để bạn đối chiếu chứng từ." },
              { text: "Tự sửa các dòng lệch rồi đưa tôi bảng đối chiếu đã khớp.", feedback: "AI không có chứng từ nên bảng khớp này có thể là bảng bịa." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu không chắc thì cứ chọn nguyên nhân hợp lý nhất và ghi như thật.", feedback: "Khuyến khích AI bịa nguyên nhân với vẻ chắc chắn." },
              { text: "Không đoán nguyên nhân khi thiếu dữ liệu; ghi 'cần chứng từ' và giữ nguyên số liệu tôi đưa.", good: true, feedback: "Ranh giới rõ: AI không thêm nguyên nhân hay số nào ngoài dữ liệu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "limit"],
            text: "Các dòng nghi vấn (chưa ghép được):\n1. Sao kê 28/9, mã K-017, +34.000.000: không có dòng cùng số tiền trong sổ. Cần giấy báo có.\n2. Sao kê 30/9, +4.500.000, nội dung lãi: không có trong sổ. Cần xác nhận với thông báo lãi.\n3. Sổ 15/9 và 16/9, mã NCC-08, -47.500.000: hai dòng cùng số tiền, sao kê chỉ có một. Cần kiểm chứng từ chi.\n\n(Đây là danh sách để bạn tìm chứng từ; chưa phải kết luận.)",
          },
          {
            requires: ["data"],
            text: "Có ba khoản lệch: 34 triệu là tiền chưa ghi, 4,5 triệu là lãi, 47,5 triệu là chi nhập hai lần. Bạn cần ghi thu 38,5 triệu và xoá dòng trùng.\n\n(Đúng dòng, nhưng AI đã tự khẳng định nguyên nhân khi chưa có chứng từ, nên bạn không nên ghi theo.)",
          },
          {
            text: "Chênh lệch 86 triệu do ngân hàng ghi nhầm một khoản thu 86 triệu của khách hàng lớn. Đề nghị ghi thu 86 triệu để khớp.\n\n(AI tự bịa một nguyên nhân duy nhất, khớp đúng số tiền, không dựa vào dòng nào.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Sao kê chứa dữ liệu nhạy cảm",
        text: "Sao kê có số tài khoản, tên đối tác và số tiền. Đổi tên thành mã, bỏ số tài khoản, chỉ đưa các dòng cần xem và chỉ dùng công cụ công ty đã duyệt. Khi chuyển kết quả về sổ, đối chiếu lại từng số với sao kê gốc.",
      },
      { type: "heading", text: "Trước khi chốt bảng đối chiếu" },
      {
        type: "list",
        items: [
          "Sao kê và sổ cùng tài khoản, cùng kỳ.",
          "Mỗi khoản lệch đều có chứng từ và một nhãn loại.",
          "Khoản lệch thời điểm chỉ nằm trong bảng đối chiếu, không sửa vào sổ.",
          "Hai số dư sau điều chỉnh bằng nhau và bạn giải thích được từng phần đã điều chỉnh.",
        ],
      },
      {
        type: "scenario",
        title: "Còn 47,5 triệu chưa giải thích được",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã ghi thu 34 triệu và lãi 4,5 triệu. Chênh lệch còn 47,5 triệu, đúng bằng một khoản chi của nhà cung cấp NCC-08 thấy hai lần trong sổ. Hạn chốt sổ là chiều nay.",
            choices: [
              { label: "Ghi một bút toán điều chỉnh 47,5 triệu để bảng đối chiếu về không rồi chốt", next: "bad_plug" },
              { label: "Tìm chứng từ chi của NCC-08 xem thực tế chi mấy lần", next: "s2" },
            ],
          },
          bad_plug: {
            text: "Bảng đối chiếu về không nhưng dòng nhập trùng vẫn nằm trong sổ. Công nợ NCC-08 hiển thị đã trả hai lần, và tháng sau kiểm toán nội bộ hỏi khoản 47,5 triệu là gì, không ai giải thích được.",
            ending: "bad",
          },
          s2: {
            text: "Chứng từ chỉ có một lệnh chi và sao kê chỉ có một lần trừ tiền. Dòng thứ hai trong sổ là nhập trùng do lưu hai lần.",
            choices: [
              { label: "Đảo dòng nhập trùng theo quy định công ty, ghi chú lý do và lập bảng đối chiếu", next: "good" },
              { label: "Nhờ AI kết luận và xoá dòng cho nhanh, không ghi chú lý do", next: "bad_delete" },
            ],
          },
          good: {
            text: "Sổ sạch, công nợ NCC-08 đúng, bảng đối chiếu có dòng giải thích cho từng phần chênh và kế toán trưởng duyệt trong buổi chiều.",
            ending: "good",
          },
          bad_delete: {
            text: "Số liệu về đúng nhưng không ai biết vì sao dòng biến mất. Người xem sổ sau đó không thể lần lại và phải hỏi lại bạn.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đối chiếu tốt là giải thích được từng đồng chênh, không phải làm cho hai tổng bằng nhau.",
          "AI giúp bạn nhìn thấy dòng nghi ngờ nhanh hơn, còn chứng từ và quyết định sửa sổ vẫn là của bạn.",
        ],
      },
    ],
  },
];
