import type { Lesson } from "./lesson-types";

// Chặng "Cơ chế thương vụ M&A" (ids 1521-1526, professional track).
//
// Chặng 10 và các bài M&A rời rạc đã dạy vì sao mua, mua ai, trả bằng gì và
// vì sao hậu sáp nhập hay hỏng. Chặng này lo phần cơ khí ở giữa: con số nào
// động khi thương vụ đóng, tiền từ đâu ra, tài sản được ghi lại thế nào, và
// ai phải ký vào đâu.
//
// Đây cũng là phần mà bộ câu hỏi phỏng vấn IB hỏi nhiều nhất - Merger Model
// và Accounting là hai nhóm lớn nhất trong bank - nhưng cho tới giờ không có
// bài học nào trong ứng dụng dạy nó. Bài 1 (pha loãng EPS) là câu hỏi mở đầu
// của gần như mọi vòng technical cho vị trí M&A.

export const MA_EXECUTION_LESSONS: Lesson[] = [
  {
    id: 1521,
    slug: "thuong-vu-lam-tang-hay-giam-eps",
    title: "Thương vụ, Bài 1: Tăng hay pha loãng EPS - phép tính đầu tiên của mọi thương vụ",
    subtitle: "Ba nguồn chi phí của một thương vụ, quy tắc P/E cho deal toàn cổ phiếu, và vì sao nó không phải thước đo giá trị",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "➗",
    track: "professional",
    whyItMatters:
      "Đây là câu hỏi mở đầu của gần như mọi vòng phỏng vấn technical cho vị trí M&A, và cũng là phép tính đầu tiên bên mua chạy khi cân nhắc một mục tiêu. Nó không nói thương vụ có tạo ra giá trị hay không, nhưng nó quyết định thương vụ có được đưa ra hội đồng quản trị hay không.",
    openingQuestion:
      "Một thương vụ toàn cổ phiếu: bên mua có P/E 20, bên bán có P/E 15. Kết quả EPS thế nào?",
    openingOptions: [
      "Pha loãng, vì phát hành thêm cổ phiếu luôn làm giảm thu nhập trên mỗi cổ phiếu của bên mua",
      "Tăng, vì bên mua đang mua lợi nhuận với giá rẻ hơn mức thị trường đang trả cho lợi nhuận của chính nó",
      "Không đổi, vì hai bên được cộng gộp theo đúng tỷ lệ giá trị",
      "Không xác định được nếu chưa biết quy mô doanh thu hai bên",
    ],
    correctOption: 1,
    explanation:
      "Trong thương vụ toàn cổ phiếu, quy tắc rất gọn: bên mua có P/E cao hơn thì tăng EPS, thấp hơn thì pha loãng. Trực giác đằng sau là bạn đang trả 15 đồng cho mỗi đồng lợi nhuận mua về, trong khi thị trường đang trả 20 đồng cho mỗi đồng lợi nhuận của bạn. Lưu ý điều kiện: quy tắc này chỉ đúng khi thương vụ toàn cổ phiếu. Nếu trả bằng tiền mặt hoặc nợ vay thì P/E hai bên không còn liên quan, vì không có cổ phiếu nào được phát hành.",
    diagram: [
      { label: "Lợi nhuận bên bán cộng vào", arrow: true },
      { label: "Trừ lãi vay mới và lãi tiền gửi mất đi", arrow: true },
      { label: "Chia cho số cổ phiếu mới", arrow: true },
      { label: "So EPS mới với EPS cũ" },
    ],
    realWorldExample: {
      company: "Vì sao một thương vụ tốt vẫn có thể pha loãng",
      description:
        "Bên mua nhắm một công ty tăng trưởng nhanh nhưng lợi nhuận hiện tại còn mỏng, nên P/E của bên bán rất cao. Thương vụ pha loãng EPS ngay năm đầu, và nếu hội đồng quản trị chỉ nhìn con số đó thì nó bị bác. Nhưng phần lớn giá trị của mục tiêu nằm ở dòng tiền các năm sau, thứ mà phép tính EPS năm một không nhìn thấy. Đây là lý do các thương vụ mua công ty công nghệ hầu như luôn pha loãng lúc công bố, và cũng là lý do ban điều hành phải trình bày thêm thời điểm thương vụ hòa vốn về EPS thay vì chỉ con số năm đầu.",
    },
    quiz: [
      {
        question: "Ba nguồn làm giảm EPS của bên mua trong một thương vụ là gì?",
        options: [
          "Lãi vay của khoản nợ mới, lãi tiền gửi mất đi khi dùng tiền mặt, và cổ phiếu phát hành thêm",
          "Chi phí tư vấn phải trả cho ngân hàng đầu tư, phí luật sư và các khoản thuế phát sinh khi đóng thương vụ",
          "Lợi thế thương mại được ghi nhận, chi phí tái cấu trúc sau sáp nhập và khoản dự phòng cho rủi ro pháp lý",
          "Chênh lệch tỷ giá, chi phí tích hợp hệ thống công nghệ thông tin và tiền thưởng giữ chân nhân sự chủ chốt",
        ],
        correct: 0,
        explanation:
          "Ba nguồn này tương ứng ba cách trả tiền: vay nợ, dùng tiền mặt sẵn có, phát hành cổ phiếu. Các khoản phí một lần có thật nhưng thường được loại ra khi tính EPS điều chỉnh.",
      },
      {
        question: "Vì sao quy tắc so sánh P/E chỉ áp dụng cho thương vụ toàn cổ phiếu?",
        options: [
          "Vì nếu trả bằng tiền mặt hoặc nợ vay thì không có cổ phiếu nào được phát hành, nên P/E hai bên không còn liên quan",
          "Vì cơ quan quản lý chỉ yêu cầu công bố hệ số P/E trong các thương vụ hoán đổi cổ phiếu giữa hai công ty niêm yết",
          "Vì hệ số P/E của bên bán chỉ được xác định một cách đáng tin cậy khi thương vụ được thanh toán bằng cổ phiếu",
          "Vì thương vụ trả bằng tiền mặt luôn làm tăng EPS nên không cần thực hiện bất kỳ phép so sánh nào nữa",
        ],
        correct: 0,
        explanation:
          "Trong thương vụ tiền mặt, phép so sánh đúng là giữa lợi suất sau thuế của khoản tiền hoặc nợ bỏ ra và lợi suất lợi nhuận của bên bán, chứ không phải giữa hai hệ số P/E.",
      },
      {
        question: "Vì sao tăng EPS không đồng nghĩa với thương vụ tạo ra giá trị?",
        options: [
          "Vì EPS chỉ phản ánh lợi nhuận kế toán năm đầu, không nói gì về giá đã trả so với giá trị nhận được",
          "Vì chỉ số EPS được tính theo chuẩn mực kế toán nên không được các nhà đầu tư tổ chức sử dụng đến",
          "Vì lợi nhuận của bên bán luôn phải điều chỉnh lại theo chính sách kế toán mới của bên mua sau sáp nhập",
          "Vì EPS sau thương vụ chỉ được xác định chính thức sau khi kiểm toán kết thúc năm tài chính đầu tiên",
        ],
        correct: 0,
        explanation:
          "Trả quá đắt cho một công ty vẫn có thể làm tăng EPS nếu tài trợ bằng nợ giá rẻ. EPS đo tác động kế toán, không đo chênh lệch giữa giá trả và giá trị nhận.",
      },
      {
        question: "Điểm hòa vốn EPS của một thương vụ nghĩa là gì?",
        options: [
          "Năm mà EPS sau thương vụ bắt đầu bằng hoặc vượt EPS lẽ ra bên mua đạt được nếu không mua",
          "Thời điểm mà toàn bộ khoản nợ vay dùng để tài trợ cho thương vụ đã được hoàn trả xong hoàn toàn",
          "Mức giá mua mà tại đó thương vụ không làm thay đổi thu nhập trên mỗi cổ phiếu của bên mua",
          "Năm mà tổng lợi ích cộng hưởng thực tế đạt được bằng đúng con số đã cam kết với thị trường",
        ],
        correct: 0,
        explanation:
          "Với các thương vụ pha loãng ban đầu, đây là con số ban điều hành phải trình bày cùng lúc với mức pha loãng năm đầu, nếu không hội đồng chỉ nhìn thấy nửa bức tranh.",
      },
    
    {
      "question": "Vì sao một thương vụ làm tăng EPS vẫn có thể phá hủy giá trị?",
      "options": [
        "Vì EPS không tính tới cái giá đã trả và rủi ro mới nhận về",
        "Vì EPS chỉ tăng trong năm đầu rồi giảm trở lại ở các năm sau",
        "Vì phần tăng EPS đến từ cộng hưởng thường không bao giờ đạt được",
        "Vì việc tính EPS sau sáp nhập dựa trên số liệu chưa được kiểm toán"
      ],
      "correct": 0,
      "explanation": "Một phép chia có thể cải thiện chỉ vì bạn dùng nợ rẻ để mua lợi nhuận. Nó không nói gì về việc bạn trả cao hơn giá trị nội tại bao nhiêu, hay bảng cân đối vừa gánh thêm rủi ro gì - nên đây là phép tính đầu tiên, không phải phép tính quyết định."
    }
    ],
    keyTakeaways: [
      "Ba nguồn giảm EPS: lãi vay mới, lãi tiền gửi mất đi, cổ phiếu phát hành thêm",
      "Deal toàn cổ phiếu: bên mua P/E cao hơn thì tăng EPS, thấp hơn thì pha loãng",
      "Quy tắc P/E không áp dụng cho deal tiền mặt hay nợ vay - lúc đó so lợi suất, không so P/E",
      "Tăng EPS không có nghĩa là tạo giá trị: trả quá đắt vẫn tăng EPS được nếu vay rẻ",
      "Deal pha loãng năm đầu phải trình bày kèm điểm hòa vốn EPS",
    ],
    practicePrompt: {
      question:
        "Bên mua trả toàn bộ bằng tiền mặt đang gửi ngân hàng lãi 4%/năm. Bên bán có lợi suất lợi nhuận (E/P) là 6%. Thương vụ tăng hay pha loãng EPS?",
      options: [
        "Pha loãng, vì tiền mặt giảm đi",
        "Tăng, vì lợi nhuận nhận thêm 6% lớn hơn phần lãi tiền gửi sau thuế bị mất đi",
        "Không đổi, vì không phát hành cổ phiếu nào",
        "Phải biết P/E của bên mua mới trả lời được",
      ],
      correct: 1,
      explanation:
        "Đây là phép so sánh đúng cho thương vụ tiền mặt: cái mất là lãi tiền gửi sau thuế, cái được là lợi nhuận của bên bán, và số cổ phiếu không đổi nên toàn bộ chênh lệch rơi vào EPS. P/E của bên mua không tham gia vào phép tính, vì không có cổ phiếu nào được phát hành - đó chính là bẫy của lựa chọn cuối.",
    },
    summary: {
      keyIdea: "EPS đo tác động kế toán của cách trả tiền, không đo giá trị thương vụ tạo ra",
      commonMistake: "Áp quy tắc so sánh P/E cho cả thương vụ trả bằng tiền mặt",
      action: "Với một thương vụ giả định, tính EPS mới theo ba bước: cộng lợi nhuận, trừ chi phí tài trợ, chia số cổ phiếu mới.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy hai công ty niêm yết thật và giả định một bên mua bên kia với mức phụ trội 30%. Tính kết quả EPS trong ba tình huống: toàn tiền mặt, toàn nợ vay lãi suất 8%, và toàn cổ phiếu. Ba con số sẽ khác nhau đáng kể trên cùng một mức giá mua.",
      secondary: "Chính khoảng chênh đó là lý do cơ cấu thanh toán được đàm phán gay gắt không kém mức giá.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng IB & Phân tích đã dạy vì sao mua, mua ai và trả bằng gì. Chặng này bắt đầu ở phép tính mà bên mua chạy ngay sau khi có ba câu trả lời đó, và cũng là phép tính người phỏng vấn hỏi đầu tiên.",
      },
      {
        type: "heading",
        text: "Ba nguồn chi phí, tương ứng ba cách trả tiền",
      },
      {
        type: "conceptTable",
        title: "Cái gì làm EPS giảm",
        subtitle: "Mỗi cách thanh toán mang theo đúng một loại chi phí",
        concepts: [
          { vi: "Trả bằng nợ vay", en: "Debt", def: "Phát sinh lãi vay sau thuế. So sánh đúng: lãi suất vay sau thuế với lợi suất lợi nhuận của bên bán." },
          { vi: "Trả bằng tiền mặt", en: "Cash", def: "Mất phần lãi tiền gửi đang nhận, cũng tính sau thuế. Thường là cách rẻ nhất khi lãi tiền gửi thấp." },
          { vi: "Trả bằng cổ phiếu", en: "Stock", def: "Phát hành thêm cổ phiếu nên mẫu số tăng. Đây là chỗ quy tắc so sánh P/E áp dụng, và chỉ ở đây." },
        ],
      },
      {
        type: "formula",
        title: "EPS sau thương vụ",
        equation: "EPS mới = (LN bên mua + LN bên bán − Lãi vay mới sau thuế − Lãi tiền gửi mất đi sau thuế) ÷ (CP cũ + CP phát hành thêm)",
        variables: [
          { symbol: "LN", name: "Lợi nhuận sau thuế", description: "Lấy lợi nhuận độc lập của từng bên trước khi cộng gộp" },
          { symbol: "CP", name: "Số cổ phiếu lưu hành", description: "Chỉ tăng khi thương vụ có phần thanh toán bằng cổ phiếu" },
        ],
        example: {
          title: "Kiểm tra nhanh",
          calculation: "Nếu tử số tăng nhanh hơn mẫu số theo tỷ lệ phần trăm",
          result: "EPS tăng",
          explanation: "Toàn bộ bài toán rút gọn về việc so tốc độ tăng của tử số và mẫu số - đó cũng là trực giác đằng sau quy tắc P/E.",
        },
      },
      {
        type: "callout",
        label: "Vì sao chỉ số này vẫn được dùng dù ai cũng biết nó thiếu sót",
        text: "EPS không đo giá trị, và người trong nghề biết rõ điều đó. Nó vẫn là chỉ số đầu tiên được nhìn vì thị trường phản ứng với nó, vì tiền thưởng của ban điều hành thường gắn với nó, và vì nó tính được trong vài phút trước khi bất kỳ mô hình chi tiết nào được dựng. Hiểu đúng vai trò của nó - một bộ lọc nhanh, không phải một kết luận - là điều tách người phân tích với người chạy công thức.",
      },
      {
        type: "closing",
        lines: [
          "Tăng EPS là điều kiện để thương vụ được đưa ra bàn, không phải bằng chứng nó đáng làm.",
          "Bài sau đi vào câu hỏi đứng ngay trước đó: tiền để trả cho thương vụ này lấy ở đâu.",
        ],
      },
    ],
  },
  {
    id: 1522,
    slug: "nguon-va-su-dung-von-trong-thuong-vu",
    title: "Thương vụ, Bài 2: Nguồn và sử dụng vốn - tiền ở đâu ra và đi về đâu",
    subtitle: "Bảng Sources & Uses, vì sao giá trị doanh nghiệp khác số tiền phải chi, và các khoản hay bị quên",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "professional",
    whyItMatters:
      "Bảng nguồn và sử dụng vốn là trang đầu tiên của mọi hồ sơ thương vụ, và là chỗ phát hiện sớm nhất rằng cơ cấu tài trợ không khả thi. Nó cũng là nơi các khoản chi hay bị quên lộ diện - phí tư vấn, phí thu xếp vốn, tiền trả nợ cũ của bên bán.",
    openingQuestion:
      "Bên mua đồng ý mua 100% vốn chủ sở hữu với giá 500 tỷ. Tổng số tiền cần chuẩn bị có phải 500 tỷ?",
    openingOptions: [
      "Đúng, đó là giá đã thỏa thuận giữa hai bên",
      "Không: thường phải cộng thêm phần nợ vay của bên bán phải trả ngay và các loại phí giao dịch",
      "Không, vì còn phải trừ đi tiền mặt của bên bán",
      "Chỉ đúng nếu thương vụ được trả toàn bộ bằng tiền mặt",
    ],
    correctOption: 1,
    explanation:
      "Giá mua vốn chủ sở hữu là khoản trả cho cổ đông bên bán. Nhưng phần lớn hợp đồng vay có điều khoản đổi quyền kiểm soát buộc phải trả hết nợ khi công ty đổi chủ, nên khoản đó cũng phải nằm trong bảng. Cộng thêm phí tư vấn, phí pháp lý và phí thu xếp vốn - thường vài phần trăm giá trị thương vụ. Tiền mặt của bên bán có làm giảm số phải chi ròng, nhưng nó xuất hiện ở cột nguồn chứ không phải bằng cách trừ vào giá.",
    diagram: [
      { label: "Sử dụng: giá mua vốn chủ", arrow: true },
      { label: "+ trả nợ cũ + phí giao dịch", arrow: true },
      { label: "Nguồn: nợ vay mới + vốn góp", arrow: true },
      { label: "+ tiền mặt sẵn có. Hai cột phải bằng nhau" },
    ],
    realWorldExample: {
      company: "Khoảng cách giữa giá thỏa thuận và tiền phải chuẩn bị",
      description:
        "Một thương vụ được công bố ở mức 500 tỷ giá trị vốn chủ sở hữu. Bảng nguồn và sử dụng vốn thực tế: 500 tỷ trả cổ đông, 180 tỷ trả hết dư nợ vay của bên bán do điều khoản đổi quyền kiểm soát, 22 tỷ phí tư vấn và pháp lý, 8 tỷ phí thu xếp khoản vay mới - tổng cộng 710 tỷ. Bên mua thu xếp 400 tỷ nợ vay mới, dùng 250 tỷ tiền mặt của chính mình và 60 tỷ tiền mặt sẵn có trên bảng cân đối của bên bán. Con số 500 tỷ trên báo chí và con số 710 tỷ phải chuẩn bị là hai đại lượng khác nhau.",
    },
    quiz: [
      {
        question: "Vì sao nợ vay của bên bán thường xuất hiện ở cột sử dụng vốn?",
        options: [
          "Vì hợp đồng vay thường có điều khoản buộc trả hết khi công ty đổi quyền kiểm soát",
          "Vì chuẩn mực kế toán không cho phép ghi nhận khoản nợ của bên bán trên báo cáo hợp nhất của bên mua",
          "Vì bên cho vay cũ luôn từ chối cấp tín dụng tiếp",
          "Vì giá trị khoản nợ phải được cộng vào giá mua vốn chủ sở hữu theo thông lệ đàm phán quốc tế",
        ],
        correct: 0,
        explanation:
          "Đây gọi là điều khoản đổi quyền kiểm soát. Nếu khoản nợ được phép giữ nguyên thì nó không nằm ở cột sử dụng, và nhu cầu tài trợ giảm đi tương ứng.",
      },
      {
        question: "Tiền mặt sẵn có của bên bán được xử lý thế nào trong bảng?",
        options: [
          "Xuất hiện ở cột nguồn vốn, vì sau khi đóng thương vụ bên mua sử dụng được khoản tiền đó",
          "Được trừ thẳng vào giá mua vốn chủ sở hữu để ra số tiền thực tế phải thanh toán cho cổ đông",
          "Không xuất hiện vì tiền đó thuộc bên bán",
          "Xuất hiện ở cột sử dụng vốn, vì đó là một tài sản mà bên mua phải bỏ tiền ra để mua lại",
        ],
        correct: 0,
        explanation:
          "Nhiều người nhầm sang cách trừ vào giá. Kết quả ròng giống nhau, nhưng đặt ở cột nguồn mới cho thấy đúng bức tranh: đó là một nguồn tài trợ, không phải một khoản giảm giá.",
      },
      {
        question: "Hai cột nguồn và sử dụng vốn phải có quan hệ gì?",
        options: [
          "Luôn bằng nhau, vì mọi đồng chi ra đều phải có một đồng từ đâu đó tài trợ cho nó",
          "Cột nguồn phải lớn hơn một khoản dự phòng 10%",
          "Không có ràng buộc nào, vì hai cột phản ánh hai giai đoạn khác nhau của quá trình thực hiện",
          "Cột sử dụng phải lớn hơn để phản ánh phần giá trị cộng hưởng dự kiến đạt được sau sáp nhập",
        ],
        correct: 0,
        explanation:
          "Đây là ràng buộc kế toán đơn giản nhưng hữu ích: khi hai cột không khớp, nghĩa là có một khoản chi chưa có nguồn, và đó là lúc phát hiện cơ cấu tài trợ chưa đủ.",
      },
      {
        question: "Khoản chi nào hay bị bỏ sót nhất khi lập bảng lần đầu?",
        options: [
          "Phí thu xếp khoản vay mới và các chi phí tư vấn, pháp lý đi kèm thương vụ",
          "Giá mua phần vốn chủ sở hữu mà bên mua phải thanh toán cho cổ đông của bên bán",
          "Tiền mặt trên bảng cân đối của bên bị mua",
          "Giá trị hàng tồn kho và các khoản phải thu mà bên mua tiếp nhận sau thương vụ",
        ],
        correct: 0,
        explanation:
          "Các khoản phí thường chiếm vài phần trăm giá trị thương vụ, đủ lớn để thay đổi cơ cấu tài trợ nhưng lại không xuất hiện trong bất kỳ cuộc đàm phán về giá nào.",
      },
    
    {
      "question": "Khoản chi nào hay bị bỏ sót nhất khi lập bảng nguồn và sử dụng vốn lần đầu?",
      "options": [
        "Phí giao dịch và phí thu xếp vốn cho phần nợ mới",
        "Giá mua phần vốn chủ sở hữu trả cho cổ đông bên bán",
        "Khoản nợ vay hiện hữu của bên bán phải tất toán khi đổi chủ",
        "Phần vốn tự có mà bên mua bỏ ra để tài trợ thương vụ"
      ],
      "correct": 0,
      "explanation": "Ba khoản kia to và hiển nhiên nên không ai quên. Phí tư vấn, phí pháp lý và phí thu xếp vốn thì lẻ tẻ nhưng cộng lại thường vài phần trăm giá trị thương vụ - đủ để bảng lệch và đủ để đổi cả cấu trúc tài trợ."
    }
    ],
    keyTakeaways: [
      "Giá mua vốn chủ sở hữu không phải tổng số tiền cần chuẩn bị",
      "Nợ cũ của bên bán thường phải trả ngay do điều khoản đổi quyền kiểm soát",
      "Tiền mặt của bên bán nằm ở cột nguồn, không phải trừ vào giá",
      "Hai cột phải bằng nhau - lệch nghĩa là có khoản chi chưa có nguồn tài trợ",
      "Phí tư vấn, pháp lý và thu xếp vốn chiếm vài phần trăm và hay bị quên",
    ],
    practicePrompt: {
      question:
        "Giá mua vốn chủ 300 tỷ, nợ cũ phải trả 100 tỷ, phí 15 tỷ. Bên bán có 40 tỷ tiền mặt. Bên mua vay được 250 tỷ. Cần góp thêm bao nhiêu vốn?",
      options: [
        "125 tỷ",
        "125 tỷ",
        "165 tỷ",
        "50 tỷ",
      ],
      correct: 1,
      explanation:
        "Tổng cột sử dụng là 300 + 100 + 15 = 415 tỷ. Cột nguồn đã có 250 tỷ nợ vay mới và 40 tỷ tiền mặt sẵn có của bên bán, tổng 290 tỷ. Phần còn thiếu 125 tỷ chính là vốn bên mua phải bỏ ra. Lựa chọn 165 tỷ là kết quả của việc quên mất khoản tiền mặt 40 tỷ - lỗi phổ biến nhất ở bài này.",
    },
    summary: {
      keyIdea: "Bảng nguồn và sử dụng vốn cho thấy số tiền thật phải chuẩn bị, không phải con số trên báo chí",
      commonMistake: "Trừ tiền mặt của bên bán vào giá mua thay vì đặt nó ở cột nguồn",
      action: "Dựng bảng cho một thương vụ giả định, và kiểm tra hai cột có bằng nhau không trước khi làm gì tiếp.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Tìm một thương vụ M&A đã công bố trên thị trường Việt Nam, lấy con số giá trị thương vụ từ báo chí, rồi tra báo cáo tài chính gần nhất của bên bán để tìm dư nợ vay và số dư tiền mặt. Dựng bảng nguồn và sử dụng vốn ước tính của bạn.",
      secondary: "Khoảng cách giữa con số bạn tính ra và con số được đưa tin thường lớn hơn nhiều so với dự đoán ban đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước khi chạy bất kỳ mô hình nào, người làm thương vụ dựng một bảng hai cột. Nó đơn giản đến mức hay bị xem nhẹ, và là chỗ phát hiện sớm nhất rằng cơ cấu tài trợ không đứng được.",
      },
      {
        type: "heading",
        text: "Hai cột của một thương vụ",
      },
      {
        type: "comparison",
        left: {
          label: "Sử dụng vốn (Uses)",
          text: "Giá mua phần vốn chủ sở hữu. Trả hết nợ vay cũ của bên bán nếu có điều khoản đổi quyền kiểm soát. Phí tư vấn, pháp lý, kiểm toán. Phí thu xếp khoản vay mới. Đôi khi có khoản tiền giữ lại đảm bảo cam kết.",
        },
        right: {
          label: "Nguồn vốn (Sources)",
          text: "Nợ vay mới thu xếp được. Vốn góp của bên mua. Tiền mặt sẵn có trên bảng cân đối của bên bán. Trong một số cấu trúc còn có phần cổ phần mà ban điều hành bên bán giữ lại thay vì nhận tiền.",
        },
      },
      {
        type: "callout",
        label: "Vì sao giá trị doanh nghiệp và giá mua vốn chủ khác nhau",
        text: "Giá trị doanh nghiệp bằng giá trị vốn chủ cộng nợ vay trừ tiền mặt - công thức đã học ở phần định giá. Bảng nguồn và sử dụng vốn chính là công thức đó diễn ra bằng tiền thật: khoản nợ cộng vào xuất hiện ở cột sử dụng vì phải trả, khoản tiền mặt trừ đi xuất hiện ở cột nguồn vì dùng được. Ai từng lẫn hai đại lượng này khi học định giá sẽ thấy bảng này làm sáng tỏ nó nhanh hơn bất kỳ định nghĩa nào.",
      },
      {
        type: "heading",
        text: "Một bảng Sources & Uses, đủ số"
      },
      {
        type: "paragraph",
        text: "Định giá doanh nghiệp mục tiêu ở 1.000. Doanh nghiệp đang có nợ vay 250 và tiền mặt 50, tức nợ ròng 200. Giá trả cho cổ đông vì thế là 1.000 − 200 = 800 - và đây mới là con số xuất hiện trên báo chí. Nhưng tiền phải chuẩn bị thì nhiều hơn: 800 mua vốn chủ, cộng 200 để tất toán khoản nợ hiện hữu vì hợp đồng vay thường có điều khoản đáo hạn khi đổi chủ, cộng 30 phí tư vấn, phí thu xếp vốn và phí pháp lý. Tổng SỬ DỤNG là 1.030."
      },
      {
        type: "callout",
        label: "Cột nguồn phải bằng đúng 1.030",
        text: "Ví dụ: vay mới 600, vốn của bên mua bỏ ra 380, và 50 tiền mặt sẵn có trên bảng cân đối của chính doanh nghiệp mục tiêu - vì sau khi mua thì tiền đó thuộc về bên mua và dùng được ngay để trả một phần giá mua. Cộng lại đúng 1.030. Chính khoản tiền mặt 50 này là lý do giá trị doanh nghiệp trừ đi TIỀN MẶT chứ không chỉ trừ nợ: mua một doanh nghiệp có sẵn tiền trong két thì phần tiền đó không phải trả thêm."
      },
      {
        type: "comparison",
        left: {
          label: "Ba khoản hay bị quên ở cột sử dụng",
          text: "Phí giao dịch, thường 2-3% giá trị thương vụ và không nhỏ. Chi phí tất toán nợ cũ, gồm cả phí phạt trả trước hạn. Và vốn lưu động cần bơm thêm ngay sau khi hoàn tất, vì doanh nghiệp mục tiêu thường được bàn giao ở mức vốn lưu động thấp hơn mức vận hành bình thường."
        },
        right: {
          label: "Vì sao dựng bảng này trước mọi mô hình",
          text: "Nó buộc trả lời câu hỏi tiền ở đâu ra trước khi bàn tới lợi nhuận. Một thương vụ có định giá hấp dẫn nhưng không thu xếp đủ nguồn thì không tồn tại, và bảng hai cột này phát hiện điều đó trong mười phút - trước khi ai đó bỏ ra ba tuần dựng mô hình dòng tiền chiết khấu."
        }
      },
      {
        type: "closing",
        lines: [
          "Con số trên báo chí là giá trả cho cổ đông. Con số trong bảng này là tiền phải có trong tài khoản.",
          "Bài sau nói về chuyện xảy ra ngay sau khi tiền được chuyển: tài sản của bên bán được ghi lại thế nào.",
        ],
      },
    ],
  },
  {
    id: 1523,
    slug: "phan-bo-gia-mua-va-loi-the-thuong-mai",
    title: "Thương vụ, Bài 3: Phân bổ giá mua - lợi thế thương mại từ đâu ra và vì sao nó bị ghi giảm",
    subtitle: "Đánh giá lại tài sản theo giá trị hợp lý, tài sản vô hình nhận diện được, và cái bẫy khấu hao sau thương vụ",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🏷️",
    track: "professional",
    whyItMatters:
      "Phân bổ giá mua quyết định lợi nhuận báo cáo của bên mua trong nhiều năm sau thương vụ, thông qua khấu hao tài sản vô hình mới ghi nhận. Nó cũng là nơi sinh ra con số lợi thế thương mại - khoản mục lớn nhất trên bảng cân đối của nhiều tập đoàn, và là khoản bị ghi giảm mỗi khi một thương vụ thất bại.",
    openingQuestion:
      "Bên mua trả 500 tỷ cho một công ty có giá trị sổ sách vốn chủ sở hữu 200 tỷ. Chênh lệch 300 tỷ đi đâu?",
    openingOptions: [
      "Toàn bộ ghi vào lợi thế thương mại",
      "Trước hết phân bổ cho tài sản được đánh giá lại và tài sản vô hình nhận diện được, phần dư mới là lợi thế thương mại",
      "Ghi thẳng vào chi phí trong năm phát sinh",
      "Ghi vào thặng dư vốn cổ phần của bên mua",
    ],
    correctOption: 1,
    explanation:
      "Lợi thế thương mại là phần dư sau cùng, không phải điểm bắt đầu. Quy trình đi theo thứ tự: đánh giá lại tài sản hiện có theo giá trị hợp lý - bất động sản mua từ lâu thường có giá trị thị trường cao hơn sổ sách nhiều; nhận diện các tài sản vô hình chưa từng được ghi nhận như thương hiệu, quan hệ khách hàng, công nghệ; ghi nhận thuế hoãn lại phát sinh từ các khoản đánh giá lại đó. Chỉ phần còn lại sau cùng mới là lợi thế thương mại, và phần này về bản chất là cái giá trả cho những thứ không quy được về một tài sản cụ thể nào.",
    diagram: [
      { label: "Giá mua", arrow: true },
      { label: "− Giá trị hợp lý tài sản thuần hiện có", arrow: true },
      { label: "− Tài sản vô hình nhận diện được", arrow: true },
      { label: "= Lợi thế thương mại (phần dư)" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Vì sao lợi nhuận bên mua giảm trong nhiều năm sau thương vụ",
      description:
        "Sau khi phân bổ, một phần lớn giá mua được gán cho quan hệ khách hàng với thời gian hữu dụng ước tính tám năm. Khoản này bị khấu hao vào chi phí mỗi năm, làm giảm lợi nhuận kế toán của bên mua trong suốt tám năm dù hoạt động kinh doanh không hề xấu đi. Đó là lý do các công ty thực hiện nhiều thương vụ thường báo cáo song song một chỉ tiêu lợi nhuận đã loại trừ khấu hao tài sản vô hình từ thương vụ - và cũng là lý do nhà đầu tư cần biết chỉ tiêu đó được điều chỉnh những gì trước khi so sánh giữa các công ty.",
    },
    quiz: [
      {
        question: "Vì sao lợi thế thương mại được gọi là phần dư?",
        options: [
          "Vì nó là phần còn lại của giá mua sau khi đã phân bổ hết cho các tài sản nhận diện được",
          "Vì nó chỉ được ghi nhận vào phần dư thừa của vốn chủ sở hữu trên bảng cân đối kế toán hợp nhất",
          "Vì giá trị của nó thường nhỏ hơn nhiều so với các khoản mục tài sản khác trong cùng thương vụ",
          "Vì nó là khoản mục duy nhất được phép điều chỉnh lại trong vòng một năm kể từ ngày mua",
        ],
        correct: 0,
        explanation:
          "Thứ tự này quan trọng: càng nhận diện được nhiều tài sản vô hình cụ thể thì lợi thế thương mại càng nhỏ, và phần khấu hao hằng năm càng lớn.",
      },
      {
        question: "Lợi thế thương mại và tài sản vô hình nhận diện được khác nhau thế nào về kế toán?",
        options: [
          "Lợi thế thương mại không khấu hao mà chỉ ghi giảm khi suy giảm giá trị; tài sản vô hình thì khấu hao theo thời gian hữu dụng",
          "Cả hai đều được khấu hao theo cùng một thời gian hữu dụng do doanh nghiệp tự ước tính khi thương vụ hoàn tất",
          "Lợi thế thương mại được khấu hao đều hằng năm còn tài sản vô hình chỉ ghi giảm khi có dấu hiệu suy giảm",
          "Cả hai đều được ghi giảm toàn bộ ngay trong năm đầu tiên sau khi thương vụ được hoàn tất theo quy định",
        ],
        correct: 0,
        explanation:
          "Khác biệt này khiến việc phân bổ nhiều hay ít vào tài sản vô hình có tác động rất khác nhau lên lợi nhuận báo cáo các năm sau.",
      },
      {
        question: "Vì sao đánh giá lại tài sản làm phát sinh thuế hoãn lại?",
        options: [
          "Vì giá trị ghi sổ mới cao hơn cơ sở tính thuế, tạo ra chênh lệch tạm thời phải ghi nhận",
          "Vì cơ quan thuế yêu cầu doanh nghiệp nộp thuế ngay trên phần giá trị tăng thêm của tài sản",
          "Vì việc đánh giá lại tài sản làm thay đổi mức thuế suất áp dụng cho doanh nghiệp sau sáp nhập",
          "Vì tài sản được đánh giá lại phải chịu thuế chuyển nhượng theo quy định về thuế tài sản hiện hành",
        ],
        correct: 0,
        explanation:
          "Khấu hao trên giá trị mới cao hơn được ghi vào sổ kế toán nhưng không được trừ khi tính thuế, nên khoản chênh lệch đó phải được ghi nhận ngay tại thời điểm mua.",
      },
      {
        question: "Ghi giảm lợi thế thương mại nói lên điều gì?",
        options: [
          "Bên mua thừa nhận thương vụ không mang lại giá trị như kỳ vọng ban đầu khi định giá",
          "Doanh nghiệp bị mua lại đã ngừng hoạt động hoàn toàn hoặc bị bán lại cho một bên thứ ba khác",
          "Cơ quan kiểm toán đã phát hiện sai sót trong việc xác định giá mua tại thời điểm hoàn tất",
          "Khoản lợi thế thương mại đã hết thời gian hữu dụng theo ước tính ban đầu của ban điều hành",
        ],
        correct: 0,
        explanation:
          "Đây là khoản mục hiếm hoi mà chính báo cáo tài chính thừa nhận một quyết định trong quá khứ đã sai. Nó không ảnh hưởng dòng tiền nhưng ảnh hưởng lớn tới uy tín của ban điều hành.",
      },
    
    {
      "question": "Ghi giảm lợi thế thương mại nói lên điều gì về thương vụ trước đó?",
      "options": [
        "Dòng tiền tương lai kỳ vọng lúc mua đã không còn giữ được",
        "Doanh nghiệp bị mua đã bị bán lại hoặc ngừng hoạt động hoàn toàn",
        "Giá trị hợp lý của tài sản hữu hình đã bị đánh giá sai lúc mua",
        "Chuẩn mực kế toán yêu cầu khấu hao lợi thế thương mại theo thời gian"
      ],
      "correct": 0,
      "explanation": "Lợi thế thương mại không khấu hao, nó chỉ bị ghi giảm khi kiểm tra tổn thất cho thấy phần dòng tiền kỳ vọng không còn đỡ nổi con số trên sổ. Nói cách khác, đó là lời thừa nhận công khai rằng cái giá trả hồi đó là quá cao."
    }
    ],
    keyTakeaways: [
      "Lợi thế thương mại là phần dư sau cùng, không phải toàn bộ chênh lệch giá mua trừ sổ sách",
      "Thứ tự: đánh giá lại tài sản, nhận diện tài sản vô hình, ghi thuế hoãn lại, còn lại mới là lợi thế thương mại",
      "Lợi thế thương mại không khấu hao, chỉ ghi giảm khi suy giảm; tài sản vô hình thì khấu hao",
      "Khấu hao tài sản vô hình làm giảm lợi nhuận báo cáo nhiều năm dù kinh doanh không xấu đi",
      "Ghi giảm lợi thế thương mại là lời thừa nhận trên báo cáo rằng thương vụ đã trả quá đắt",
    ],
    practicePrompt: {
      question:
        "Hai bên mua trả cùng 500 tỷ cho hai công ty giống hệt nhau. Bên A phân bổ 250 tỷ vào tài sản vô hình 10 năm, bên B chỉ phân bổ 50 tỷ. Ai báo cáo lợi nhuận cao hơn trong 10 năm tới?",
      options: [
        "Bên A, vì ghi nhận được nhiều tài sản hơn",
        "Bên B, vì khấu hao tài sản vô hình hằng năm ít hơn nên chi phí thấp hơn",
        "Hai bên như nhau vì cùng giá mua",
        "Không so sánh được nếu chưa biết doanh thu hai bên",
      ],
      correct: 1,
      explanation:
        "Cùng một thương vụ, hai cách phân bổ, hai bức tranh lợi nhuận khác nhau suốt mười năm - trong khi dòng tiền thật hoàn toàn giống nhau. Bên B mang lợi thế thương mại lớn hơn, tức là rủi ro phải ghi giảm một cục lớn hơn về sau nếu thương vụ không như kỳ vọng. Đây là lý do người phân tích luôn đọc thuyết minh phân bổ giá mua, không chỉ nhìn con số lợi nhuận.",
    },
    summary: {
      keyIdea: "Phân bổ giá mua quyết định lợi nhuận báo cáo nhiều năm sau, dù dòng tiền không đổi",
      commonMistake: "Coi toàn bộ chênh lệch giữa giá mua và giá trị sổ sách là lợi thế thương mại",
      action: "Tìm thuyết minh phân bổ giá mua trong báo cáo tài chính của một tập đoàn vừa hoàn tất thương vụ và đọc bảng chi tiết.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Mở báo cáo tài chính hợp nhất của một doanh nghiệp niêm yết vừa mua lại công ty khác, tìm phần thuyết minh về hợp nhất kinh doanh, và liệt kê: giá mua, giá trị hợp lý tài sản thuần, các tài sản vô hình được nhận diện kèm thời gian khấu hao, và lợi thế thương mại còn lại.",
      secondary: "Sau đó tính xem khấu hao tài sản vô hình chiếm bao nhiêu phần trăm lợi nhuận trước thuế của năm gần nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Tiền đã chuyển, thương vụ đã đóng. Câu hỏi kế toán tiếp theo nghe kỹ thuật nhưng quyết định con số lợi nhuận bên mua công bố trong nhiều năm: 500 tỷ vừa chi ra được ghi vào đâu trên bảng cân đối.",
      },
      {
        type: "heading",
        text: "Bốn bước phân bổ, theo đúng thứ tự",
      },
      {
        type: "conceptTable",
        title: "Từ giá mua tới lợi thế thương mại",
        subtitle: "Mỗi bước lấy bớt một phần, phần cuối cùng còn lại mới là lợi thế thương mại",
        concepts: [
          { vi: "Đánh giá lại tài sản hiện có", en: "Fair value step-up", def: "Bất động sản, nhà xưởng mua từ lâu thường có giá trị thị trường cao hơn giá trị còn lại trên sổ. Phần chênh được ghi tăng." },
          { vi: "Nhận diện tài sản vô hình", en: "Identifiable intangibles", def: "Thương hiệu, quan hệ khách hàng, công nghệ, hợp đồng dài hạn - những thứ bên bán chưa từng ghi nhận vì chúng được tạo ra chứ không phải mua về." },
          { vi: "Ghi nhận thuế hoãn lại", en: "Deferred tax", def: "Phần đánh giá lại không được cơ quan thuế công nhận, tạo chênh lệch tạm thời phải ghi nhận ngay tại ngày mua." },
          { vi: "Phần dư còn lại", en: "Goodwill", def: "Cái giá trả cho những gì không quy về được một tài sản cụ thể: đội ngũ, vị thế, và cả phần trả thừa nếu có." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao con số này lại là đối tượng của phán đoán",
        text: "Thời gian hữu dụng của quan hệ khách hàng là bao nhiêu năm? Thương hiệu đáng giá bao nhiêu? Không có câu trả lời khách quan, và mỗi lựa chọn đều đổi con số lợi nhuận nhiều năm sau. Bên mua có động cơ nghiêng về phía phân bổ ít vào tài sản vô hình để giảm khấu hao - đổi lại họ mang khối lợi thế thương mại lớn hơn và rủi ro phải ghi giảm một cục lớn hơn. Người phân tích cần đọc phần thuyết minh này chứ không chỉ nhìn dòng lợi nhuận.",
      },
      {
        type: "closing",
        lines: [
          "Lợi thế thương mại không phải một tài sản theo nghĩa thông thường, nó là số dư của một phép trừ.",
          "Bài sau đi theo hướng ngược lại: bán đi một mảng của chính mình, và vì sao việc đó khó hơn mua.",
        ],
      },
    ],
  },
  {
    id: 1524,
    slug: "thoai-von-carve-out-va-spin-off",
    title: "Thương vụ, Bài 4: Thoái vốn - vì sao bán một mảng khó hơn mua cả công ty",
    subtitle: "Carve-out, spin-off, chi phí bị bỏ lại, và báo cáo tài chính của một thứ chưa từng tồn tại độc lập",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "✂️",
    track: "professional",
    whyItMatters:
      "Phần lớn tài liệu M&A nói về việc mua, nhưng mọi thương vụ mua đều có một bên bán, và không ít trong số đó là tập đoàn đang cắt bớt một mảng. Việc tách một mảng ra khỏi cơ thể mẹ đặt ra những câu hỏi mà thương vụ mua nguyên công ty không gặp.",
    openingQuestion:
      "Vì sao lập báo cáo tài chính cho một mảng kinh doanh sắp bán lại khó hơn nhiều so với cho một công ty độc lập?",
    openingOptions: [
      "Vì mảng đó thường có quy mô nhỏ nên số liệu ít tin cậy",
      "Vì mảng đó chưa từng tồn tại độc lập: nó dùng chung hệ thống, nhân sự và chi phí với công ty mẹ",
      "Vì chuẩn mực kế toán không có quy định cho trường hợp này",
      "Vì dữ liệu quá khứ thường đã bị xóa khỏi hệ thống",
    ],
    correctOption: 1,
    explanation:
      "Một mảng nằm trong tập đoàn dùng chung phòng nhân sự, hệ thống công nghệ, thương hiệu, hợp đồng mua hàng và cả quan hệ ngân hàng. Khi tách ra, phải trả lời: nếu mảng này đứng riêng thì chi phí thật của nó là bao nhiêu. Câu trả lời gần như luôn cao hơn con số phân bổ nội bộ hiện tại, vì tập đoàn mua sắm với quy mô lớn hơn. Bộ báo cáo dựng cho tình huống này được lập trên các giả định về một thực thể chưa từng tồn tại, nên nó là ước tính có cơ sở chứ không phải lịch sử.",
    diagram: [
      { label: "Tách doanh thu và chi phí trực tiếp", arrow: true },
      { label: "Ước tính chi phí đứng riêng", arrow: true },
      { label: "Nhận diện chi phí bị bỏ lại", arrow: true },
      { label: "Thỏa thuận dịch vụ chuyển tiếp" },
    ],
    realWorldExample: {
      company: "Chi phí bị bỏ lại sau khi bán một mảng",
      description:
        "Một tập đoàn bán mảng chiếm 20% doanh thu và ghi nhận khoản lãi từ thương vụ. Nhưng chi phí quản lý chung không giảm 20%: trụ sở vẫn thuê nguyên, ban điều hành vẫn đủ người, hệ thống lõi vẫn chạy. Phần chi phí trước đây được phân bổ cho mảng đã bán giờ dồn sang các mảng còn lại, khiến biên lợi nhuận của chúng xấu đi ngay quý đầu tiên. Hiện tượng này có tên riêng - chi phí bị bỏ lại - và nó là lý do nhiều thương vụ thoái vốn trông có lãi trên giấy lại làm lợi nhuận tập đoàn giảm trong năm kế tiếp.",
    },
    quiz: [
      {
        question: "Chi phí bị bỏ lại trong một thương vụ thoái vốn là gì?",
        options: [
          "Phần chi phí chung từng phân bổ cho mảng đã bán nhưng không biến mất khi mảng đó ra đi",
          "Các khoản chi phí phát sinh trong quá trình đàm phán mà bên bán phải tự chịu nếu thương vụ đổ vỡ",
          "Chi phí bồi thường cho người lao động thuộc mảng kinh doanh được chuyển giao sang chủ sở hữu mới",
          "Khoản chi phí lãi vay còn lại của các khoản nợ đã dùng để đầu tư vào mảng kinh doanh đó trước đây",
        ],
        correct: 0,
        explanation:
          "Đây là lý do lợi nhuận tập đoàn hay xấu đi sau một thương vụ thoái vốn có lãi. Nó phải được tính trước, không phải phát hiện ở quý sau.",
      },
      {
        question: "Thỏa thuận dịch vụ chuyển tiếp dùng để làm gì?",
        options: [
          "Để công ty mẹ tiếp tục cung cấp các dịch vụ dùng chung cho mảng đã bán trong một thời gian có hạn",
          "Để bên mua được quyền trả chậm một phần giá mua cho tới khi hoàn tất việc tách hệ thống dữ liệu",
          "Để hai bên thống nhất cách xử lý các tranh chấp phát sinh sau khi thương vụ đã được hoàn tất",
          "Để giữ lại đội ngũ quản lý chủ chốt của mảng kinh doanh trong ít nhất hai năm sau ngày chuyển giao",
        ],
        correct: 0,
        explanation:
          "Không có thỏa thuận này, mảng vừa bán có thể mất khả năng vận hành ngay ngày đầu tiên vì hệ thống lương, kế toán hay công nghệ vẫn nằm ở công ty mẹ.",
      },
      {
        question: "Spin-off khác carve-out ở điểm nào?",
        options: [
          "Spin-off chia cổ phần mảng tách ra cho chính cổ đông hiện hữu; carve-out bán cho bên thứ ba lấy tiền",
          "Spin-off chỉ áp dụng cho các mảng kinh doanh đang thua lỗ còn carve-out dành cho mảng đang có lãi tốt",
          "Spin-off cần được cơ quan quản lý phê duyệt trước còn carve-out thì chỉ cần thông báo sau khi hoàn tất",
          "Spin-off diễn ra trong cùng một tập đoàn còn carve-out bắt buộc phải có yếu tố nước ngoài tham gia",
        ],
        correct: 0,
        explanation:
          "Khác biệt cốt lõi nằm ở dòng tiền: spin-off không mang tiền về cho công ty mẹ, nó chỉ tách một tài sản ra thành cổ phiếu riêng trong tay cùng nhóm cổ đông.",
      },
      {
        question: "Vì sao bộ báo cáo tài chính lập cho mảng sắp bán được coi là ước tính chứ không phải lịch sử?",
        options: [
          "Vì nó dựa trên giả định về chi phí mà mảng đó sẽ chịu nếu đứng riêng, điều chưa từng xảy ra",
          "Vì các số liệu quá khứ của mảng kinh doanh đó thường không được kiểm toán một cách độc lập",
          "Vì chuẩn mực kế toán yêu cầu trình bày số liệu dự phóng thay cho số liệu thực tế trong trường hợp này",
          "Vì thời điểm lập báo cáo luôn nằm trước ngày hoàn tất thương vụ nên số liệu chưa được chốt cuối cùng",
        ],
        correct: 0,
        explanation:
          "Đây là điểm bên mua phải soi kỹ nhất khi thẩm định: các giả định chi phí đứng riêng có được xây dựng thận trọng hay đang bị đặt quá lạc quan để đẩy giá bán lên.",
      },
    
    {
      "question": "Vì sao bộ báo cáo tài chính lập cho một mảng sắp bán được coi là ước tính chứ không phải lịch sử?",
      "options": [
        "Vì phải giả định chi phí của mảng đó nếu nó từng đứng riêng",
        "Vì số liệu của mảng đó chưa từng được kiểm toán độc lập trước đây",
        "Vì doanh thu nội bộ giữa các mảng không được ghi nhận trong tập đoàn",
        "Vì kỳ báo cáo của mảng đó không trùng với kỳ báo cáo của tập đoàn"
      ],
      "correct": 0,
      "explanation": "Mảng đó chưa bao giờ tự trả tiền cho phòng nhân sự, hệ thống công nghệ hay quan hệ ngân hàng - nó dùng ké của tập đoàn. Dựng lại chi phí độc lập là một chuỗi giả định, và bên mua sẽ chất vấn từng giả định một."
    }
    ],
    keyTakeaways: [
      "Mảng trong tập đoàn chưa từng đứng riêng, nên báo cáo của nó là ước tính chứ không phải lịch sử",
      "Chi phí đứng riêng gần như luôn cao hơn chi phí phân bổ nội bộ hiện tại",
      "Chi phí bị bỏ lại: bán 20% doanh thu không làm chi phí chung giảm 20%",
      "Thỏa thuận dịch vụ chuyển tiếp giữ cho mảng vừa bán vận hành được sau ngày đầu tiên",
      "Spin-off chia cổ phần cho cổ đông hiện hữu và không mang tiền về; carve-out bán lấy tiền",
    ],
    practicePrompt: {
      question:
        "Tập đoàn bán một mảng với giá cao hơn giá trị sổ sách và ghi nhận lãi. Vì sao lợi nhuận năm sau vẫn có thể giảm?",
      options: [
        "Vì khoản lãi từ thương vụ chỉ được ghi nhận một lần",
        "Vì mất phần lợi nhuận thường xuyên của mảng đó, cộng với chi phí chung bị bỏ lại dồn sang các mảng còn lại",
        "Vì phải nộp thuế trên khoản lãi",
        "Vì bên mua sẽ cạnh tranh trực tiếp",
      ],
      correct: 1,
      explanation:
        "Hai tác động cộng dồn và cả hai đều kéo dài, trong khi khoản lãi ghi nhận chỉ xuất hiện một lần. Đây là lý do người phân tích luôn tách khoản lãi từ thoái vốn ra khỏi lợi nhuận thường xuyên khi đánh giá xu hướng - nếu không, một năm bán tài sản sẽ trông như một năm kinh doanh tốt.",
    },
    summary: {
      keyIdea: "Tách một mảng ra khỏi cơ thể mẹ tạo ra các chi phí không xuất hiện trên bất kỳ báo cáo nào trước đó",
      commonMistake: "Giả định chi phí chung giảm theo đúng tỷ lệ doanh thu của mảng bị bán đi",
      action: "Với một tập đoàn đa ngành, thử ước tính chi phí thật nếu mảng nhỏ nhất của họ phải đứng riêng.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một tập đoàn có nhiều mảng kinh doanh và giả định họ bán mảng nhỏ nhất. Liệt kê những chức năng mảng đó đang dùng chung với công ty mẹ, rồi ước tính chi phí phải bỏ ra nếu tự làm. So con số đó với phần chi phí chung đang được phân bổ cho mảng.",
      secondary: "Chênh lệch giữa hai con số chính là thứ bên mua sẽ mặc cả, và bên bán thường không muốn nhắc tới.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi thương vụ mua đều có một bên bán. Khi bên bán là một tập đoàn đang cắt bớt một mảng, bài toán đổi hẳn: thứ đem bán chưa bao giờ tồn tại như một doanh nghiệp độc lập.",
      },
      {
        type: "heading",
        text: "Ba hình thức tách mảng",
      },
      {
        type: "conceptTable",
        title: "Bán, tách hay chia",
        subtitle: "Khác nhau ở chỗ tiền chảy về đâu và ai nắm cổ phần sau cùng",
        concepts: [
          { vi: "Carve-out", en: "Bán cho bên thứ ba", def: "Tách mảng ra và bán cho một người mua. Công ty mẹ nhận tiền. Đây là hình thức phổ biến nhất và cũng phức tạp nhất về mặt tách bạch." },
          { vi: "Spin-off", en: "Chia cho cổ đông", def: "Mảng thành công ty riêng, cổ phần chia cho chính cổ đông hiện hữu. Không có tiền về, mục đích là để thị trường định giá riêng từng mảng." },
          { vi: "Bán tài sản", en: "Asset sale", def: "Chỉ bán một số tài sản cụ thể chứ không bán cả pháp nhân. Đơn giản nhất về pháp lý, nhưng bên mua không nhận được hợp đồng và giấy phép đi kèm." },
        ],
      },
      {
        type: "callout",
        label: "Câu hỏi thẩm định quan trọng nhất trong một thương vụ carve-out",
        text: "Không phải mảng này lãi bao nhiêu, mà là: con số chi phí trong bộ báo cáo được lập trên giả định nào, và ai kiểm chứng chúng. Bên bán có động cơ đặt giả định chi phí đứng riêng ở mức lạc quan, vì mỗi đồng chi phí giả định thấp hơn đều đẩy giá bán lên theo bội số định giá. Đây là chỗ bên mua nên bỏ nhiều thời gian thẩm định nhất, và cũng là chỗ hay bị bỏ qua vì nó nằm trong thuyết minh chứ không nằm trong bảng số chính.",
      },
      {
        type: "closing",
        lines: [
          "Mua là ghép hai thứ đã tồn tại. Bán một mảng là tạo ra một thứ chưa từng tồn tại rồi mới ghép.",
          "Bài sau chuyển từ con số sang quy trình: từ lúc ký thư quan tâm tới lúc thương vụ được phép đóng.",
        ],
      },
    ],
  },
  {
    id: 1525,
    slug: "quy-trinh-thuong-vu-va-phe-duyet-canh-tranh",
    title: "Thương vụ, Bài 5: Từ thư quan tâm tới ngày đóng - quy trình và các cửa phải qua",
    subtitle: "Các mốc tài liệu, khoảng trống giữa ký và đóng, điều kiện tiên quyết và phê duyệt cạnh tranh",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🚦",
    track: "professional",
    whyItMatters:
      "Một thương vụ đã ký vẫn có thể không bao giờ đóng. Khoảng trống giữa hai thời điểm đó kéo dài từ vài tháng tới hơn một năm, và những gì xảy ra trong khoảng đó - phê duyệt cạnh tranh, biến động kinh doanh, điều kiện tiên quyết không đạt - quyết định thương vụ có thành hay không.",
    openingQuestion:
      "Ký hợp đồng mua bán và đóng thương vụ có phải là một thời điểm?",
    openingOptions: [
      "Đúng, ký xong là thương vụ hoàn tất",
      "Không: giữa hai mốc thường có vài tháng để hoàn thành các điều kiện tiên quyết như phê duyệt của cơ quan quản lý",
      "Không, nhưng khoảng cách chỉ vài ngày làm việc",
      "Tùy thuộc vào việc thanh toán bằng tiền mặt hay cổ phiếu",
    ],
    correctOption: 1,
    explanation:
      "Ký là thời điểm hai bên cam kết với các điều khoản đã thỏa thuận. Đóng là thời điểm quyền sở hữu và tiền thực sự đổi chủ. Giữa hai mốc là giai đoạn hoàn thành điều kiện tiên quyết: phê duyệt tập trung kinh tế, phê duyệt của đại hội đồng cổ đông, chấp thuận từ bên cho vay, hoặc xin phép ngành nghề có điều kiện. Trong giai đoạn này bên bán bị ràng buộc phải vận hành doanh nghiệp như bình thường, và bất kỳ thay đổi bất lợi trọng yếu nào cũng có thể cho phép bên mua rút lui.",
    diagram: [
      { label: "Thư quan tâm và thỏa thuận bảo mật", arrow: true },
      { label: "Thẩm định và đàm phán hợp đồng", arrow: true },
      { label: "Ký: cam kết các điều khoản", arrow: true },
      { label: "Đóng: hoàn thành điều kiện, chuyển tiền" },
    ],
    realWorldExample: {
      company: "Khoảng trống giữa ký và đóng trong các thương vụ lớn",
      description:
        "Các thương vụ có quy mô đủ lớn để phải xin phê duyệt tập trung kinh tế thường mất từ sáu tháng tới hơn một năm giữa ngày ký và ngày đóng. Trong khoảng đó, thị trường có thể đổi chiều, kết quả kinh doanh của bên bán có thể xấu đi, và bên mua đôi khi muốn rút. Đó là lý do hợp đồng luôn có điều khoản về thay đổi bất lợi trọng yếu và điều khoản phí phá vỡ - khoản tiền một bên phải trả nếu đơn phương chấm dứt. Chính hai điều khoản này thường được đàm phán gay gắt không kém mức giá.",
    },
    quiz: [
      {
        question: "Thư quan tâm ban đầu có ràng buộc pháp lý không?",
        options: [
          "Phần lớn nội dung không ràng buộc, trừ một số điều khoản như bảo mật và độc quyền đàm phán",
          "Có ràng buộc toàn bộ, vì đây là văn bản đầu tiên hai bên cùng ký trong quá trình thực hiện thương vụ",
          "Không ràng buộc bất kỳ nội dung nào, kể cả các cam kết về bảo mật thông tin được trao đổi",
          "Chỉ ràng buộc với bên bán, còn bên mua được quyền rút lui vào bất kỳ thời điểm nào mà không chịu phí",
        ],
        correct: 0,
        explanation:
          "Sự phân đôi này quan trọng: điều khoản độc quyền đàm phán tuy ngắn nhưng ràng buộc thật, và nó khóa bên bán không được thương lượng với người khác trong thời hạn đã định.",
      },
      {
        question: "Điều kiện tiên quyết trong hợp đồng mua bán là gì?",
        options: [
          "Những việc phải hoàn thành trước ngày đóng, nếu không đạt thì thương vụ không bắt buộc phải hoàn tất",
          "Các cam kết mà bên bán phải thực hiện trong vòng một năm sau khi thương vụ đã được hoàn tất xong",
          "Danh sách các tài sản mà bên mua có quyền loại trừ khỏi phạm vi thương vụ trước thời điểm ký kết",
          "Những khoản thanh toán bổ sung mà bên mua trả thêm nếu doanh nghiệp đạt chỉ tiêu kinh doanh đề ra",
        ],
        correct: 0,
        explanation:
          "Phê duyệt của cơ quan quản lý cạnh tranh là điều kiện tiên quyết phổ biến nhất trong các thương vụ lớn, và cũng là điều kiện mất nhiều thời gian nhất.",
      },
      {
        question: "Điều khoản thay đổi bất lợi trọng yếu bảo vệ ai và bảo vệ khỏi điều gì?",
        options: [
          "Bảo vệ bên mua khỏi việc phải hoàn tất thương vụ khi doanh nghiệp mục tiêu xấu đi nghiêm trọng trước ngày đóng",
          "Bảo vệ bên bán khỏi việc bên mua trì hoãn thanh toán sau khi các điều kiện tiên quyết đã hoàn thành",
          "Bảo vệ cả hai bên khỏi các biến động chung của thị trường xảy ra trong giai đoạn giữa ký và đóng",
          "Bảo vệ người lao động của doanh nghiệp mục tiêu khỏi việc bị cắt giảm trong năm đầu sau sáp nhập",
        ],
        correct: 0,
        explanation:
          "Phạm vi của điều khoản này được đàm phán rất kỹ, đặc biệt ở chỗ có loại trừ các biến động chung của cả ngành hay không - vì nếu không loại trừ, bên mua có thể rút chỉ vì thị trường đi xuống.",
      },
      {
        question: "Cơ quan quản lý cạnh tranh xem xét điều gì khi thẩm định một thương vụ?",
        options: [
          "Liệu thương vụ có làm giảm đáng kể mức độ cạnh tranh trên thị trường liên quan hay không",
          "Liệu mức giá hai bên thỏa thuận có phản ánh đúng giá trị hợp lý của doanh nghiệp mục tiêu không",
          "Liệu bên mua có đủ năng lực tài chính để hoàn thành nghĩa vụ thanh toán theo hợp đồng đã ký không",
          "Liệu người lao động của doanh nghiệp mục tiêu có được bảo đảm quyền lợi sau khi sáp nhập hay không",
        ],
        correct: 0,
        explanation:
          "Trọng tâm là tác động lên cạnh tranh, không phải lên hai bên tham gia. Trong một số trường hợp thương vụ được chấp thuận kèm điều kiện, chẳng hạn buộc bán bớt một mảng để giảm thị phần.",
      },
    
    {
      "question": "Vì sao khoảng thời gian giữa ngày ký và ngày đóng lại là giai đoạn rủi ro nhất của một thương vụ?",
      "options": [
        "Vì hai bên đã cam kết nhưng thương vụ vẫn có thể đổ vì điều kiện chưa hoàn thành",
        "Vì bên bán được phép tiếp tục đàm phán với các bên mua khác trong giai đoạn này",
        "Vì giá mua được điều chỉnh lại theo kết quả kinh doanh của từng tháng",
        "Vì bên mua chưa được tiếp cận thông tin nội bộ"
      ],
      "correct": 0,
      "explanation": "Đã cam kết công khai nhưng chưa nắm quyền: nhân sự chủ chốt có thể rời đi, khách hàng lớn có thể chờ xem, và cơ quan quản lý có thể chưa chấp thuận. Đây là lý do hợp đồng luôn có điều khoản về thay đổi bất lợi trọng yếu và phí phá vỡ thỏa thuận."
    }
    ],
    keyTakeaways: [
      "Ký và đóng là hai thời điểm khác nhau, cách nhau từ vài tháng tới hơn một năm",
      "Thư quan tâm phần lớn không ràng buộc, trừ bảo mật và độc quyền đàm phán",
      "Điều kiện tiên quyết không đạt thì thương vụ không bắt buộc phải hoàn tất",
      "Điều khoản thay đổi bất lợi trọng yếu cho bên mua đường lui khi mục tiêu xấu đi trước ngày đóng",
      "Cơ quan cạnh tranh nhìn tác động lên thị trường, không nhìn giá hay năng lực hai bên",
    ],
    practicePrompt: {
      question:
        "Thương vụ đã ký, đang chờ phê duyệt. Bốn tháng sau, lợi nhuận bên bán giảm 40% do thị trường chung suy thoái. Bên mua có rút được không?",
      options: [
        "Có, vì kết quả kinh doanh đã xấu đi rõ rệt",
        "Tùy điều khoản: nếu thay đổi bất lợi trọng yếu loại trừ biến động chung của ngành thì bên mua không rút được",
        "Không, vì đã ký thì bắt buộc phải hoàn tất",
        "Có, nhưng phải trả toàn bộ giá trị thương vụ",
      ],
      correct: 1,
      explanation:
        "Đây chính là lý do phạm vi của điều khoản này được đàm phán căng thẳng. Cách viết phổ biến là loại trừ các yếu tố tác động lên toàn ngành, với lập luận rằng bên mua đã chấp nhận rủi ro thị trường khi ký. Nếu suy giảm đến từ nguyên nhân riêng của doanh nghiệp - mất một khách hàng lớn chẳng hạn - thì kết luận sẽ khác.",
    },
    summary: {
      keyIdea: "Thương vụ đã ký chưa phải thương vụ đã xong; khoảng giữa mới là chỗ nhiều thương vụ đổ vỡ",
      commonMistake: "Coi ngày ký hợp đồng là ngày thương vụ hoàn tất",
      action: "Tìm một thương vụ đã công bố và tra xem khoảng cách giữa ngày ký và ngày đóng là bao lâu, vì sao.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một thương vụ lớn đã hoàn tất và dựng lại dòng thời gian của nó: ngày công bố, các mốc phê duyệt, ngày đóng. Với mỗi khoảng chờ, tìm hiểu điều kiện tiên quyết nào đang được xử lý trong giai đoạn đó.",
      secondary: "Dòng thời gian này là thứ ứng viên phỏng vấn M&A hay bị hỏi và ít người trả lời được cụ thể.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước nói về con số. Bài này nói về thời gian và các cửa phải qua - phần mà mô hình tài chính không thể hiện được, nhưng lại quyết định thương vụ có tồn tại hay không.",
      },
      {
        type: "heading",
        text: "Các mốc tài liệu theo thứ tự",
      },
      {
        type: "list",
        items: [
          "Thỏa thuận bảo mật: điều kiện để bên bán mở dữ liệu, ký trước mọi thứ khác",
          "Thư quan tâm hoặc bản điều khoản chính: khung giá và cấu trúc, phần lớn không ràng buộc trừ bảo mật và độc quyền đàm phán",
          "Thẩm định: tài chính, pháp lý, thuế, thương mại - chạy song song và thường phát hiện điều khiến giá được đàm phán lại",
          "Hợp đồng mua bán: văn bản ràng buộc đầy đủ, gồm cam kết, bảo đảm, điều kiện tiên quyết và cơ chế điều chỉnh giá",
          "Đóng thương vụ: sau khi mọi điều kiện tiên quyết hoàn thành, quyền sở hữu và tiền đổi chủ",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tại ngày ký",
          text: "Giá và cấu trúc đã chốt. Hai bên bị ràng buộc pháp lý. Nhưng chưa có tiền nào chuyển, chưa có quyền sở hữu nào đổi, và doanh nghiệp vẫn do bên bán điều hành.",
        },
        right: {
          label: "Tại ngày đóng",
          text: "Điều kiện tiên quyết đã hoàn thành. Tiền chuyển, cổ phần chuyển, hội đồng quản trị thay đổi. Đây mới là thời điểm bắt đầu tính các mốc hậu sáp nhập.",
        },
      },
      {
        type: "callout",
        label: "Vì sao khoảng giữa lại rủi ro",
        text: "Trong giai đoạn chờ, bên bán vẫn điều hành doanh nghiệp mà bên mua đã cam kết trả tiền, nên hợp đồng phải ràng buộc họ vận hành như thường lệ và không được ra các quyết định lớn. Cùng lúc, nhân sự giỏi bắt đầu tìm việc khác vì tương lai bất định, khách hàng lớn cân nhắc lại quan hệ, và đối thủ tận dụng khoảng thời gian đó. Giá trị thực của doanh nghiệp mục tiêu có thể giảm đi trong chính giai đoạn không ai được phép làm gì.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình cho biết thương vụ đáng bao nhiêu. Quy trình quyết định nó có xảy ra hay không.",
          "Bài cuối chặng nói về người phải ký vào quyết định cuối cùng, và cơ sở nào để họ ký.",
        ],
      },
    ],
  },
  {
    id: 1526,
    slug: "y-kien-cong-bang-va-nghia-vu-hoi-dong",
    title: "Thương vụ, Bài 6: Ý kiến về tính công bằng và nghĩa vụ của hội đồng quản trị",
    subtitle: "Ai bảo vệ cổ đông nhỏ, ngân hàng đầu tư ký vào cái gì, và vì sao xung đột lợi ích là vấn đề cấu trúc",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Hội đồng quản trị của bên bán quyết định thay mặt hàng nghìn cổ đông không có tiếng nói trong đàm phán. Ý kiến về tính công bằng là công cụ chính thức để chứng minh họ đã làm đúng trách nhiệm - và hiểu giới hạn của công cụ đó quan trọng không kém hiểu bản thân nó.",
    openingQuestion:
      "Ý kiến về tính công bằng do ngân hàng đầu tư phát hành khẳng định điều gì?",
    openingOptions: [
      "Rằng đây là mức giá tốt nhất có thể đạt được trên thị trường",
      "Rằng mức giá nằm trong khoảng hợp lý về mặt tài chính đối với cổ đông, tại thời điểm phát hành",
      "Rằng thương vụ sẽ mang lại lợi ích cho cả hai bên",
      "Rằng doanh nghiệp mục tiêu đã được thẩm định đầy đủ",
    ],
    correctOption: 1,
    explanation:
      "Đây là văn bản hay bị hiểu quá lên. Nó không nói giá tốt nhất, không nói thương vụ nên làm, và không thay thế cho việc thẩm định. Nó chỉ khẳng định một điều hẹp: xét về mặt tài chính, mức giá này nằm trong khoảng hợp lý đối với cổ đông tại thời điểm phát hành, dựa trên các phương pháp định giá và giả định được nêu rõ trong chính văn bản. Giá trị pháp lý của nó nằm ở chỗ chứng minh hội đồng quản trị đã tham vấn ý kiến độc lập trước khi quyết định.",
    diagram: [
      { label: "Hội đồng quyết định thay cổ đông", arrow: true },
      { label: "Thuê tư vấn phát hành ý kiến độc lập", arrow: true },
      { label: "Ý kiến: giá có nằm trong khoảng hợp lý", arrow: true },
      { label: "Cổ đông biểu quyết dựa trên hồ sơ đó" },
    ],
    realWorldExample: {
      company: "Xung đột lợi ích trong cách trả phí tư vấn",
      description:
        "Ngân hàng đầu tư tư vấn cho bên bán thường nhận phí thành công - chỉ được trả nếu thương vụ hoàn tất, và tỷ lệ với giá trị thương vụ. Nếu chính ngân hàng đó cũng phát hành ý kiến về tính công bằng, họ đang được trả tiền để thương vụ diễn ra và đồng thời được yêu cầu đánh giá khách quan xem giá có công bằng không. Thông lệ tốt là thuê một tổ chức khác phát hành ý kiến này với mức phí cố định, không phụ thuộc kết quả. Trong các vụ kiện của cổ đông, cách trả phí là một trong những điểm đầu tiên bị chất vấn.",
    },
    quiz: [
      {
        question: "Nghĩa vụ chính của hội đồng quản trị bên bán trong một thương vụ là gì?",
        options: [
          "Hành động vì lợi ích tốt nhất của cổ đông, kể cả khi điều đó khác với lợi ích của chính họ",
          "Bảo đảm thương vụ được hoàn tất đúng tiến độ đã cam kết với bên mua trong hợp đồng nguyên tắc",
          "Giữ nguyên việc làm cho toàn bộ người lao động của doanh nghiệp trong ít nhất ba năm sau đó",
          "Chọn bên mua có tiềm lực tài chính mạnh nhất trong số các bên đã nộp hồ sơ chào mua hợp lệ",
        ],
        correct: 0,
        explanation:
          "Vế sau là phần quan trọng: ban điều hành có thể mất việc hoặc ngược lại được hưởng lợi lớn từ thương vụ, và nghĩa vụ này tồn tại chính vì những xung đột đó.",
      },
      {
        question: "Vì sao ý kiến về tính công bằng thường được thuê từ một tổ chức khác với tư vấn thương vụ?",
        options: [
          "Vì tư vấn thương vụ nhận phí thành công nên có lợi ích tài chính gắn với việc thương vụ được hoàn tất",
          "Vì một tổ chức không được phép vừa tư vấn vừa phát hành ý kiến theo quy định của cơ quan quản lý",
          "Vì tổ chức phát hành ý kiến cần có giấy phép hành nghề riêng mà các ngân hàng đầu tư không có",
          "Vì chi phí thuê hai tổ chức khác nhau thường thấp hơn so với giao toàn bộ cho một tổ chức duy nhất",
        ],
        correct: 0,
        explanation:
          "Đây là xung đột mang tính cấu trúc chứ không phải vấn đề đạo đức cá nhân, nên cách xử lý cũng phải mang tính cấu trúc: tách vai trò và trả phí cố định.",
      },
      {
        question: "Điều khoản không chào mời trong hợp đồng có tác dụng gì?",
        options: [
          "Ngăn bên bán chủ động tìm kiếm người mua khác sau khi đã ký với bên mua hiện tại",
          "Ngăn bên mua tiếp cận nhân sự chủ chốt của bên bán trước khi thương vụ chính thức hoàn tất",
          "Ngăn cả hai bên tiết lộ thông tin về thương vụ ra bên ngoài trước ngày công bố chính thức",
          "Ngăn cổ đông của bên bán chuyển nhượng cổ phần trong giai đoạn giữa ngày ký và ngày đóng",
        ],
        correct: 0,
        explanation:
          "Điều khoản này thường đi kèm ngoại lệ cho phép hội đồng xem xét đề nghị tốt hơn nếu có bên khác chủ động tìm đến - chính vì nghĩa vụ với cổ đông không thể bị hợp đồng vô hiệu hóa hoàn toàn.",
      },
      {
        question: "Giới hạn quan trọng nhất của một ý kiến về tính công bằng là gì?",
        options: [
          "Nó chỉ đánh giá mức giá tại một thời điểm và không khẳng định đây là phương án tốt nhất",
          "Nó chỉ có hiệu lực trong vòng ba mươi ngày kể từ ngày được tổ chức tư vấn chính thức phát hành",
          "Nó không được sử dụng làm bằng chứng trong các tranh chấp pháp lý phát sinh sau thương vụ",
          "Nó chỉ áp dụng cho các thương vụ có giá trị vượt một ngưỡng nhất định theo quy định hiện hành",
        ],
        correct: 0,
        explanation:
          "Một mức giá có thể vừa nằm trong khoảng hợp lý vừa thấp hơn mức lẽ ra đạt được nếu quy trình chào bán cạnh tranh hơn. Ý kiến này không trả lời câu hỏi thứ hai.",
      },
    
    {
      "question": "Giới hạn quan trọng nhất của một ý kiến về tính công bằng là gì?",
      "options": [
        "Nó chỉ nói giá nằm trong khoảng hợp lý, không nói đây là giá tốt nhất",
        "Nó chỉ có hiệu lực trong vòng ba mươi ngày kể từ ngày phát hành",
        "Nó không được công bố cho cổ đông mà chỉ dành cho hội đồng quản trị",
        "Nó chỉ đánh giá phần thanh toán bằng tiền mặt"
      ],
      "correct": 0,
      "explanation": "Văn bản này hay bị hiểu quá lên. Nó không khẳng định thương vụ nên làm, không khẳng định không còn bên nào trả cao hơn, và không thay cho thẩm định - nó chỉ nói mức giá này nằm trong khoảng hợp lý xét về tài chính, tại thời điểm đó."
    }
    ],
    keyTakeaways: [
      "Ý kiến về tính công bằng chỉ nói giá nằm trong khoảng hợp lý tại một thời điểm, không nói giá tốt nhất",
      "Hội đồng quản trị có nghĩa vụ với cổ đông kể cả khi nó ngược lợi ích của chính họ",
      "Phí thành công tạo xung đột cấu trúc: nên tách vai trò phát hành ý kiến và trả phí cố định",
      "Điều khoản không chào mời thường kèm ngoại lệ cho đề nghị tốt hơn đến từ bên ngoài",
      "Giá hợp lý và giá tốt nhất là hai câu hỏi khác nhau - văn bản này chỉ trả lời câu đầu",
    ],
    practicePrompt: {
      question:
        "Hội đồng chấp nhận đề nghị đầu tiên nhận được, có ý kiến về tính công bằng ủng hộ. Cổ đông kiện vì cho rằng chưa chào bán cạnh tranh. Ý kiến đó có bảo vệ được hội đồng không?",
      options: [
        "Có, vì đã có tổ chức độc lập xác nhận giá công bằng",
        "Không hoàn toàn: nó chứng minh giá nằm trong khoảng hợp lý, nhưng không chứng minh quy trình đã tìm được phương án tốt nhất",
        "Không, vì ý kiến này không có giá trị pháp lý",
        "Có, nếu ý kiến do một tổ chức không nhận phí thành công phát hành",
      ],
      correct: 1,
      explanation:
        "Đây là ranh giới hay bị nhầm nhất trong cả bài. Ý kiến về tính công bằng nói về kết quả - mức giá. Khiếu nại của cổ đông ở đây nói về quy trình - hội đồng đã làm đủ để tìm giá tốt hơn chưa. Hai thứ được đánh giá riêng, và một ý kiến ủng hộ không tự động trả lời cho câu hỏi về quy trình.",
    },
    summary: {
      keyIdea: "Ý kiến về tính công bằng đánh giá mức giá, không đánh giá chất lượng quy trình đi tới mức giá đó",
      commonMistake: "Coi ý kiến này như lời khẳng định rằng thương vụ là phương án tốt nhất cho cổ đông",
      action: "Tìm phần trình bày ý kiến về tính công bằng trong một tài liệu lấy ý kiến cổ đông và đọc kỹ đoạn nêu giới hạn.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Mở tài liệu lấy ý kiến cổ đông của một thương vụ đã công bố. Tìm phần mô tả ý kiến về tính công bằng và trả lời ba câu: tổ chức nào phát hành, họ được trả phí theo cách nào, và văn bản tự nêu ra những giới hạn gì cho kết luận của mình.",
      secondary: "Phần nêu giới hạn thường dài hơn phần kết luận, và nó cho biết chính xác văn bản đó không khẳng định điều gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này khép lại ở câu hỏi ít mang tính kỹ thuật nhất nhưng có hậu quả thật nhất: ai chịu trách nhiệm khi một thương vụ được đồng ý, và họ dựa vào cái gì để ký.",
      },
      {
        type: "heading",
        text: "Hai câu hỏi khác nhau mà một văn bản chỉ trả lời được một",
      },
      {
        type: "comparison",
        left: {
          label: "Câu hỏi về mức giá",
          text: "Mức giá này có nằm trong khoảng hợp lý xét về mặt tài chính không. Đây là câu hỏi ý kiến về tính công bằng trả lời, bằng các phương pháp định giá đã học ở phần định giá.",
        },
        right: {
          label: "Câu hỏi về quy trình",
          text: "Hội đồng đã làm đủ để tìm được phương án tốt nhất chưa: có chào bán cạnh tranh không, có xử lý xung đột lợi ích không, có xem xét các đề nghị khác không. Văn bản kia không trả lời câu này.",
        },
      },
      {
        type: "conceptTable",
        title: "Các cơ chế bảo vệ cổ đông nhỏ",
        subtitle: "Không cơ chế nào đủ một mình, chúng bù cho nhau",
        concepts: [
          { vi: "Ý kiến độc lập về giá", en: "Fairness opinion", def: "Xác nhận mức giá nằm trong khoảng hợp lý. Mạnh nhất khi do tổ chức không nhận phí thành công phát hành." },
          { vi: "Ủy ban độc lập", en: "Special committee", def: "Gồm các thành viên hội đồng không có lợi ích trong thương vụ, đàm phán thay cho toàn hội đồng. Quan trọng nhất khi ban điều hành cũng là bên mua." },
          { vi: "Quyền biểu quyết", en: "Shareholder vote", def: "Thương vụ lớn phải được đại hội đồng cổ đông thông qua. Đây là cơ chế cuối cùng và cũng là lý do hồ sơ gửi cổ đông phải đầy đủ." },
        ],
      },
      {
        type: "callout",
        label: "Khi ban điều hành đứng ở cả hai phía",
        text: "Trường hợp khó nhất là khi chính ban điều hành tham gia mua lại công ty mình đang quản lý. Họ vừa biết rõ giá trị thật hơn bất kỳ ai, vừa có lợi ích trực tiếp trong việc mua rẻ. Ở đây một ý kiến về tính công bằng là không đủ: thông lệ đòi hỏi một ủy ban độc lập có quyền thuê tư vấn riêng và quyền từ chối thương vụ, cùng với việc những người liên quan không được tham gia biểu quyết.",
      },
      {
        type: "closing",
        lines: [
          "Một văn bản xác nhận giá hợp lý không thay được một quy trình đi tìm giá tốt hơn.",
          "Chặng này khép lại phần cơ chế thương vụ: từ phép tính EPS đầu tiên tới chữ ký cuối cùng.",
        ],
      },
    ],
  },
];
