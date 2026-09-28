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
];
