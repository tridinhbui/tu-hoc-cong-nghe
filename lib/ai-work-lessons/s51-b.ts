import type { Lesson } from "../lesson-types";

// Chặng 51, bài 6-10. Giáo trình: scripts/curriculum/stage-51.json.
// Nội dung dạy khái niệm bền (trường dữ liệu, ô trống, định dạng, chỗ trống trong mẫu thư, cột của bảng),
// không ghi đường dẫn nút bấm, giá tiền hay tính năng riêng của một công cụ.
// Ví dụ thực tế đều là "Tình huống minh hoạ", không có số liệu thật.
export const S51_B_LESSONS: Lesson[] = [
  {
    id: 2425,
    slug: "truong-du-lieu-ten-email-so-tien-di-dau",
    title: "Chặng 51, Bài 6: Tên, email, số tiền: mỗi mẩu dữ liệu đi đâu qua các bước",
    subtitle: "Mỗi ô trên biểu mẫu là một phiếu có nhãn; luồng chỉ chép đúng khi bạn dặn rõ phiếu nào vào ô nào.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phần lớn lỗi của luồng tự động không nằm ở công cụ mà ở một ô nối nhầm: email rơi vào cột số tiền, tên khách lọt vào ô địa chỉ. Hiểu mỗi mẩu dữ liệu có nhãn và đi theo nhãn giúp bạn tự soát một luồng trong vài phút, trước khi nó chạy với khách thật.",
    openingQuestion:
      "Khách điền biểu mẫu: Họ tên, Email, Số tiền. Luồng ghi một dòng vào bảng, nhưng cột Email hiện chữ \"350.000\". Nhiều khả năng nhất là gì?",
    openingOptions: [
      "Trường Số tiền đang được nối nhầm vào cột Email",
      "Khách đã cố tình điền số tiền vào ô email để thử hệ thống",
      "Bảng tính bị hỏng nên tự đổi chỗ dữ liệu giữa các cột",
      "Biểu mẫu gửi chậm nên dữ liệu đến bảng bị lẫn thứ tự",
    ],
    correctOption: 0,
    explanation:
      "Mỗi mẩu dữ liệu đi theo nhãn của nó: bước ghi dòng hỏi \"trường nào vào cột nào\" và làm đúng như bạn nối. Khi số tiền nằm ở cột Email, cách giải thích gần nhất là chỗ nối đó bị chọn nhầm. Khách hiếm khi cố ý điền sai đúng một ô trong mọi đơn, bảng tính không tự đảo dữ liệu, còn gửi chậm chỉ làm dòng đến muộn chứ không làm đổi nhãn. Vì vậy việc đầu tiên là mở bước ghi dòng và đọc từng cặp nối.",
    diagram: [
      { label: "Khách điền biểu mẫu: Họ tên, Email, Số tiền", arrow: true },
      { label: "Luồng nhận mỗi ô như một trường có nhãn", arrow: true },
      { label: "Bước ghi dòng nối từng trường vào từng cột", arrow: true },
      { label: "Bảng có dòng mới, bạn soát đúng ô chưa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng bánh nhỏ (hypothetical) nhận đơn đặt bánh qua biểu mẫu và tự ghi vào bảng. Tuần đầu, chị chủ thấy cột Email chứa toàn số. Mở bước ghi dòng, chị nhận ra hai ô nối chéo nhau từ lúc dựng luồng. Chị nối lại, chạy thử bằng một đơn giả rồi mới bật cho khách thật.",
    },
    quiz: [
      {
        question: "Trong luồng tự động, \"trường\" (field) là gì?",
        options: [
          "Một mẩu thông tin có nhãn riêng, như Họ tên hay Email, nằm trong một đơn",
          "Một cột của bảng tính, chỉ tồn tại bên trong bảng tính",
          "Một bước làm việc của luồng, ví dụ bước gửi email",
          "Tên của công cụ chạy luồng mà bạn đang dùng",
        ],
        correct: 0,
        explanation:
          "Trường là một mẩu thông tin có nhãn: Họ tên, Email, Số tiền. Cột là chỗ chứa nó ở bảng, còn bước là việc luồng làm; ba thứ này hay bị gộp làm một nhưng khác nhau. Tên công cụ thì hoàn toàn không phải dữ liệu của đơn.",
      },
      {
        question: "Muốn email khách vào đúng cột Email, bạn chỉnh ở đâu?",
        options: [
          "Ở chỗ nối trường Email với cột Email",
          "Ở tiêu đề cột của bảng, đổi tên cột cho giống tên câu hỏi trên biểu mẫu",
          "Ở nội dung thư xác nhận, gõ lại địa chỉ email của khách bằng tay",
          "Ở cài đặt biểu mẫu, đổi thứ tự hai câu hỏi cho khớp thứ tự các cột",
        ],
        correct: 0,
        explanation:
          "Việc nối trường với cột nằm ở bước ghi dòng. Đổi tiêu đề cột chỉ đổi nhãn hiển thị, không đổi dữ liệu chảy vào. Gõ lại bằng tay thì không còn là tự động. Đổi thứ tự câu hỏi có thể không làm gì cả nếu bước ghi dòng nối theo nhãn chứ không theo vị trí.",
      },
      {
        question: "Chạy thử bằng đơn giả, cột Số tiền hiện \"lan@example.com\". Nguyên nhân khả dĩ nhất?",
        options: [
          "Trường Email đang được nối vào cột Số tiền",
          "Bảng tính bị lỗi nên tự đảo dữ liệu giữa hai cột mỗi lần luồng chạy",
          "Đơn giả do chính bạn tạo nhưng bạn đã điền email vào ô tiền trên biểu mẫu",
          "Luồng cần chạy chậm hơn để dữ liệu kịp vào đúng chỗ",
        ],
        correct: 0,
        explanation:
          "Đơn giả do bạn tự điền nên dữ liệu đầu vào đã biết là đúng; email nằm ở cột tiền nghĩa là cặp nối sai. Bảng tính không tự đảo cột. Điền nhầm là khả năng bạn loại được bằng cách đọc lại đơn giả, và tốc độ chạy không làm đổi nhãn dữ liệu.",
      },
      {
        question: "Vì sao nên đặt tên trường rõ như \"So_tien_thanh_toan\" thay vì \"Cau3\"?",
        options: [
          "Để lúc nối ô ở bước sau, nhìn tên là biết đúng dữ liệu",
          "Vì công cụ tự động chỉ nhận tên trường dài trên mười ký tự",
          "Để khách điền biểu mẫu nhanh hơn vì tên trường hiện ngay cho khách",
          "Để bảng tính tự cộng tổng cột đó không cần công thức",
        ],
        correct: 0,
        explanation:
          "Tên rõ giúp người dựng luồng (là bạn, vài tuần sau) nối đúng ô mà khỏi đoán. Không có quy tắc độ dài như vậy. Khách thấy câu hỏi chứ không thấy tên trường bên trong. Còn cộng tổng vẫn cần công thức, tên trường không tạo ra nó.",
      },
      {
        question: "Biểu mẫu có ba trường nhưng bước ghi dòng chỉ cần hai. Nên làm gì với trường thừa?",
        options: [
          "Để nguyên trong dữ liệu đơn, chỉ nối hai trường cần dùng vào bảng",
          "Xoá trường thừa khỏi biểu mẫu, vì luồng chỉ chạy đúng khi mọi trường đều được dùng hết",
          "Nối cả ba, ô thừa ghi vào cột cuối của bảng",
          "Gộp ba trường vào một ô cho gọn",
        ],
        correct: 0,
        explanation:
          "Không phải trường nào cũng phải đi hết các bước; bạn chỉ nối cái cần. Trường thừa không làm luồng lỗi nên không cần xoá, mà xoá khỏi biểu mẫu còn mất thông tin khách đã điền. Nối tất cả hay gộp vào một ô làm bảng khó lọc và khó soát sau này.",
      },
    ],
    keyTakeaways: [
      "Mỗi ô trên biểu mẫu là một trường có nhãn; luồng đi theo nhãn đó.",
      "Bước ghi dòng là nơi nối trường vào cột: nối nhầm ở đây là lỗi phổ biến nhất.",
      "Chạy thử bằng đơn giả có dữ liệu bạn biết trước để thấy ngay ô nào lệch.",
      "Đặt tên trường rõ để vài tuần sau bạn vẫn đọc hiểu luồng của mình.",
    ],
    practicePrompt: {
      question:
        "Đơn thử: tên \"Lan\", email \"lan@example.com\", tiền \"350.000\". Bảng hiện tên ở cột A, tiền ở cột B, email ở cột C, nhưng tiêu đề cột B là \"Email\" và cột C là \"Số tiền\". Bạn sửa gì trước?",
      options: [
        "Đổi lại cho khớp: nối Email vào cột Email, Số tiền vào cột Số tiền",
        "Giữ nguyên dữ liệu, chỉ đổi tiêu đề hai cột cho khớp với nội dung bên dưới, rồi báo mọi người",
        "Xoá hai cột đó và dùng cột ghi chú chung cho cả hai thứ",
        "Chạy thêm vài đơn thử, hy vọng lần sau bảng tự khớp lại",
      ],
      correct: 0,
      explanation:
        "Trong ví dụ này cột Email đang nhận số tiền, nên cặp nối cần đúng theo nhãn để mọi bước sau (gửi thư, tính tổng) lấy đúng dữ liệu. Chỉ đổi tiêu đề thì bảng nhìn ổn nhưng các bước khác vẫn đọc theo tên cột cũ. Xoá cột hoặc chạy thêm không sửa được cặp nối sai.",
    },
    summary: {
      keyIdea: "Mỗi mẩu dữ liệu có một nhãn; luồng chép theo nhãn, nên lỗi thường nằm ở chỗ nối nhãn với ô.",
      formula: "Trường có nhãn → bước nối → cột của bảng. Soát từng cặp bằng một đơn giả.",
      commonMistake: "Sửa tiêu đề cột cho trông khớp mà không sửa cặp nối, nên bước sau vẫn lấy sai dữ liệu.",
      action: "Vẽ ra giấy ba trường và ba cột của một luồng bạn định làm, rồi nối bằng mũi tên.",
    },
    application: {
      title: "Làm trong 15 phút",
      message:
        "Lấy một biểu mẫu hoặc bảng thật của bạn (đơn đặt hàng, đăng ký họp, phiếu yêu cầu). Liệt kê trên giấy tối đa năm trường, rồi ghi cạnh mỗi trường một cột đích. Ngày mai bạn sẽ được hỏi: có cặp nào bạn từng định nối nhưng hoá ra nhầm không?",
      secondary: "Thử đặt lại tên trường cho rõ nghĩa, ví dụ \"Email_lien_he\" thay cho \"Cau2\".",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn mở bảng đơn hàng và thấy cột Email toàn số. Không ai gõ sai cả, chỉ là dữ liệu đã đi sai ô. Bài này cho bạn cách lần theo từng mẩu dữ liệu, từ biểu mẫu tới bảng.",
      },
      {
        type: "feynman",
        title: "Nối trường vào ô đơn giản hơn bạn nghĩ",
        intro: "Hình dung một phiếu giao hàng giấy có các ô in sẵn: Tên người nhận, Số điện thoại, Tiền thu hộ. Nhân viên văn phòng chép từng ô sang sổ theo dõi, mỗi ô vào đúng cột của nó.",
        columns: ["Thành phần", "Phiếu giao hàng giấy", "Luồng tự động"],
        rows: [
          ["Mẩu thông tin", "Một ô in sẵn trên phiếu", "Một trường trên biểu mẫu"],
          ["Nhãn", "Chữ in cạnh ô, như \"Tiền thu hộ\"", "Tên trường, như Số tiền"],
          ["Chỗ đến", "Một cột trong sổ theo dõi", "Một cột trong bảng"],
          ["Lỗi hay gặp", "Chép số điện thoại vào cột tiền", "Nối nhầm trường vào cột"],
        ],
        oneLiner: "Luồng chỉ là người chép phiếu rất nhanh và rất nghe lời: bạn dặn ô nào vào cột nào, nó làm đúng như vậy.",
      },
      { type: "heading", text: "Một đơn hàng có ba mẩu dữ liệu" },
      {
        type: "paragraph",
        text: "Khi khách bấm gửi, biểu mẫu đóng gói câu trả lời thành từng mẩu có nhãn: Họ tên, Email, Số tiền. Mỗi mẩu như vậy gọi là một trường. Bước tiếp theo trong luồng không đọc cả đơn, nó hỏi bạn: lấy trường nào, đưa vào đâu.",
      },
      {
        type: "flow",
        title: "Một đơn đi từ biểu mẫu tới bảng",
        steps: [
          { label: "Khách gửi biểu mẫu", detail: "Khách điền Họ tên, Email, Số tiền rồi bấm gửi. Đây là thời điểm luồng được đánh thức, gọi là kích hoạt." },
          { label: "Luồng nhận ba trường", detail: "Mỗi ô khách điền trở thành một trường có nhãn. Chưa có gì được chép đi đâu cả." },
          { label: "Bước ghi dòng nối trường", detail: "Bạn chọn: trường Họ tên vào cột A, Email vào cột B, Số tiền vào cột C. Mỗi cặp nối là một quyết định của bạn." },
          { label: "Bảng có dòng mới", detail: "Một dòng mới xuất hiện với ba giá trị. Nếu một cặp nối sai, giá trị nằm nhầm cột ngay ở dòng này." },
          { label: "Bước sau dùng lại trường", detail: "Bước gửi thư xác nhận cũng lấy trường Email và Họ tên. Nó dùng cùng nhãn, nên sửa nhãn một chỗ là sửa được cả hai bước." },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Sửa tiêu đề cột cho khớp nội dung chỉ làm bảng nhìn ổn. Dữ liệu chảy theo cặp nối ở bước ghi dòng, nên gốc của lỗi nằm ở đó.",
      },
      { type: "heading", text: "Soát bằng đơn giả có dữ liệu bạn biết trước" },
      {
        type: "list",
        items: [
          "Điền một đơn giả với giá trị dễ nhận ra: tên \"Thử Một\", email \"thu1@example.com\", tiền \"111\".",
          "Mở bảng và đọc từng ô: giá trị nào nằm nhầm cột thì cặp nối đó sai.",
          "Sửa đúng một cặp rồi chạy đơn giả thứ hai với giá trị khác, để chắc lần sửa không làm lệch cặp khác.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản kế hoạch nối ô do AI viết: chỗ nào sai?",
        task: "Bạn nhờ AI mô tả cách nối ô cho luồng ghi đơn hàng. Bấm vào các đoạn bạn thấy sai hoặc bịa, rồi nộp.",
        segments: [
          { text: "Biểu mẫu của bạn có ba trường: Họ tên, Email và Tổng tiền." },
          { text: "Bước 1: trường Họ tên của khách được ghi vào cột A (Khách hàng) của bảng." },
          {
            text: "Bước 2: trường Email được ghi vào cột C (Số tiền) của bảng.",
            error: "Email lại nối vào cột Số tiền: cột tiền sẽ chứa địa chỉ thư, và bước cộng tổng sau này hỏng.",
          },
          {
            text: "Biểu mẫu còn có trường Mã giảm giá, luồng tự động trừ nó vào Tổng tiền trước khi ghi.",
            error: "Bịa ra một trường: biểu mẫu chỉ có ba trường bạn vừa nêu, và bạn chưa hề dặn luồng trừ giảm giá.",
          },
          { text: "Bước 3: thư xác nhận dùng lại trường Họ tên để chào khách và trường Email để biết gửi tới đâu." },
        ],
      },
      { type: "heading", text: "Khi chạy thử thấy lệch thì làm gì" },
      {
        type: "scenario",
        title: "Đơn thử cho ra email nằm sai cột",
        start: "a",
        nodes: {
          a: {
            text: "Bạn chạy đơn thử: tên Lan, email lan@example.com, tiền 350.000. Bảng hiện \"350.000\" ở cột Email. Bạn làm gì đầu tiên?",
            choices: [
              { label: "Mở bước ghi dòng, xem mỗi trường đang nối vào cột nào", next: "b" },
              { label: "Xoá dòng và chạy lại, hy vọng lần sau đúng", next: "c" },
              { label: "Sửa tay cột đó mỗi sáng, cho nhanh", next: "d" },
            ],
          },
          b: {
            text: "Bạn thấy trường Tổng tiền đang nối vào cột Email. Bạn làm gì tiếp?",
            choices: [
              { label: "Nối lại đúng ô, rồi chạy đơn giả thứ hai để chắc", next: "good" },
              { label: "Đổi tiêu đề cột Email thành Số tiền cho khớp nội dung", next: "bad2" },
            ],
          },
          c: { text: "Lần chạy thứ hai vẫn ra đúng lỗi cũ vì cặp nối chưa ai sửa. Bạn mất thêm thời gian và bảng đầy dòng nháp.", ending: "bad" },
          d: { text: "Bạn thành người sửa tay hằng ngày, và thư xác nhận vẫn gửi tới \"địa chỉ\" 350.000 cho đến khi ai đó nhận ra.", ending: "bad" },
          bad2: { text: "Bảng nhìn ổn, nhưng bước gửi thư vẫn lấy trường Email từ cột cũ nên thư đi sai. Lỗi chỉ bị che đi.", ending: "bad" },
          good: { text: "Cặp nối đã đúng, đơn giả thứ hai cũng vào đúng cột. Bạn bật luồng cho khách thật với yên tâm hơn nhiều.", ending: "good" },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi mẩu dữ liệu có một nhãn, và luồng chỉ chép theo nhãn bạn nối.",
          "Lỗi nối ô nằm ở bước ghi dòng, không nằm ở tiêu đề cột.",
          "Một đơn giả có giá trị dễ nhận ra là cách soát nhanh nhất.",
        ],
      },
    ],
  },
  {
    id: 2426,
    slug: "o-trong-o-sai-khi-du-lieu-thieu",
    title: "Chặng 51, Bài 7: Ô trống, ô sai: khi khách quên điền một dòng thì luồng làm gì",
    subtitle: "Luồng không biết thiếu là gì; bạn phải quyết sẵn: dừng, bỏ qua hay báo cho bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🕳️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách nào cũng có lúc bỏ trống một ô. Nếu bạn chưa quyết luồng xử lý thế nào, nó sẽ tự chọn một cách (thường là âm thầm chạy tiếp), và bạn chỉ biết khi phiếu giao hàng in ra một ô trống. Quyết trước ba lối ra giúp bạn không phải chữa cháy.",
    openingQuestion:
      "Khách đặt hàng nhưng bỏ trống số điện thoại. Luồng của bạn vẫn ghi dòng vào bảng và gửi thư xác nhận như không có gì. Điều gì có thể xảy ra ở bước giao hàng?",
    openingOptions: [
      "Phiếu giao có ô điện thoại trống, shipper không gọi được cho khách",
      "Luồng tự đoán ra số điện thoại đúng từ tên và email của khách",
      "Bảng tính tự khoá dòng đó và không cho ai xem tới khi đủ dữ liệu",
      "Không có gì xảy ra vì ô trống không bao giờ làm ảnh hưởng bước khác",
    ],
    correctOption: 0,
    explanation:
      "Ô trống không tự biến mất mà đi tiếp xuống các bước sau như một giá trị rỗng. Đến bước in phiếu giao, ô điện thoại trống nên shipper không có số để gọi. Luồng không có khả năng tự đoán số từ tên hay email, bảng tính cũng không tự khoá dòng thiếu dữ liệu, và khẳng định ô trống không ảnh hưởng gì là sai vì bước nào cần giá trị đó đều bị chạm tới. Cách xử lý phải do bạn quyết từ đầu.",
    diagram: [
      { label: "Khách bỏ trống một ô", arrow: true },
      { label: "Luồng nhận giá trị rỗng", arrow: true },
      { label: "Bạn đã quyết trước: dừng, bỏ qua hay báo", arrow: true },
      { label: "Bước sau không bị bất ngờ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng khám nhỏ (hypothetical) nhận lịch hẹn qua biểu mẫu, tự ghi bảng và nhắn nhắc hẹn. Có khách bỏ trống số điện thoại nên tin nhắc hẹn không gửi được, mà không ai biết. Sau đó nhân viên đặt quy tắc: thiếu số điện thoại thì dòng được gắn nhãn \"thiếu SĐT\" và lễ tân nhận một thông báo để gọi lại.",
    },
    quiz: [
      {
        question: "Khi một ô bắt buộc bị bỏ trống, cách xử lý nào vừa không làm khách mất đơn vừa không để lỗi lọt xuống bước sau?",
        options: [
          "Ghi dòng có nhãn \"thiếu\" và báo bạn để hỏi lại khách",
          "Dừng luồng ngay và không ghi bất cứ thứ gì vào bảng, chờ khách gửi lại",
          "Để luồng chạy tiếp, ô trống cứ trống, bước sau tự lo",
          "Tự điền giá trị giống đơn gần nhất cho đỡ trống",
        ],
        correct: 0,
        explanation:
          "Ghi dòng có nhãn và báo bạn giữ được đơn mà vẫn để người xử lý biết thiếu gì. Dừng hẳn làm mất đơn của khách. Chạy tiếp cho ô trống lọt xuống bước giao. Điền theo đơn gần nhất là tạo ra dữ liệu bịa, còn tệ hơn để trống.",
      },
      {
        question: "Trường \"bắt buộc\" trên biểu mẫu giúp gì cho luồng?",
        options: [
          "Khách không gửi được khi còn trống ô đó",
          "Luồng tự kiểm tra và sửa giá trị khách điền sai định dạng",
          "Biểu mẫu tự nhớ giá trị khách điền ở lần trước để điền sẵn cho lần sau",
          "Dữ liệu khách điền được bảo mật cao hơn các trường còn lại",
        ],
        correct: 0,
        explanation:
          "Đánh dấu bắt buộc chặn ngay tại cửa: khách chưa điền ô đó thì chưa gửi được. Nó không tự sửa giá trị sai định dạng, không nhớ lần trước, và không liên quan gì tới mức bảo mật của dữ liệu.",
      },
      {
        question: "Số điện thoại chỉ là thông tin phụ, không có cũng giao được. Trường này nên là gì?",
        options: [
          "Tuỳ chọn, và luồng có nhánh riêng cho trường hợp để trống",
          "Bắt buộc, vì thông tin càng đầy đủ thì càng tốt cho mọi đơn",
          "Ẩn khỏi biểu mẫu, vì không cần thì không nên hỏi khách",
          "Tuỳ chọn, và nếu trống thì luồng cứ dừng để bạn xử lý",
        ],
        correct: 0,
        explanation:
          "Thông tin không cần cho việc giao thì để tuỳ chọn, nhưng luồng vẫn cần biết phải làm gì khi nó trống (ví dụ bỏ qua bước nhắn tin). Bắt buộc mọi thứ khiến khách bỏ dở biểu mẫu. Ẩn hẳn mất cơ hội có thông tin khi khách muốn cho. Dừng luồng vì một ô không cần là quá tay.",
      },
      {
        question: "Khách điền \"abc\" vào ô số điện thoại, không để trống. Đây là loại vấn đề gì?",
        options: [
          "Ô sai: có giá trị nhưng không hợp lệ, cần kiểm tra riêng",
          "Ô trống: luồng xử lý giống như khách bỏ qua câu hỏi",
          "Không phải vấn đề, vì luồng tự hiểu \"abc\" là không có số nên cứ bỏ qua",
          "Lỗi của biểu mẫu, và không có cách nào chặn từ phía bạn",
        ],
        correct: 0,
        explanation:
          "Ô trống là không có giá trị; ô sai là có giá trị nhưng không dùng được. Hai loại cần hai kiểu kiểm tra khác nhau. Luồng không tự hiểu \"abc\" là thiếu, và bạn có thể chặn bằng cách đặt kiểu số cho trường ở biểu mẫu hoặc thêm bước kiểm tra.",
      },
      {
        question: "Bạn chọn để luồng báo cho mình khi thiếu dữ liệu. Thông báo nên ghi gì để hữu ích?",
        options: [
          "Đơn nào, thiếu trường nào, và liên hệ khách ở đâu",
          "Chỉ cần chữ \"có lỗi\" để bạn vào bảng tự tìm",
          "Toàn bộ nội dung đơn kèm thông tin thanh toán của khách",
          "Chỉ tên trường bị thiếu, không cần nói của đơn nào",
        ],
        correct: 0,
        explanation:
          "Một thông báo hữu ích trả lời ba câu: đơn nào, thiếu gì, hỏi ai. \"Có lỗi\" trơn buộc bạn đi tìm. Gửi cả thông tin thanh toán vào thông báo là đưa dữ liệu nhạy cảm đi xa không cần thiết. Chỉ nêu tên trường mà thiếu đơn nào thì bạn vẫn không biết gọi ai.",
      },
    ],
    keyTakeaways: [
      "Ô trống đi tiếp xuống các bước sau như một giá trị rỗng, không tự mất đi.",
      "Ba lối ra: dừng, bỏ qua, hoặc ghi nhãn rồi báo cho bạn.",
      "Ô bắt buộc chặn ngay ở cửa; ô tuỳ chọn cần một nhánh riêng khi trống.",
      "Ô trống khác ô sai: hai loại cần hai kiểu kiểm tra.",
    ],
    practicePrompt: {
      question:
        "Biểu mẫu đăng ký họp có ô \"Món ăn kiêng\" không bắt buộc. Nhiều người để trống. Luồng nên làm gì khi ô này trống?",
      options: [
        "Ghi dòng bình thường, bỏ qua bước báo bếp về món ăn kiêng",
        "Dừng luồng và gửi thư bắt người đăng ký điền lại biểu mẫu",
        "Tự điền \"không ăn kiêng\" để bảng không có ô trống",
        "Gắn nhãn thiếu thông tin và nhắn cho bạn với mọi đơn trống ô này",
      ],
      correct: 0,
      explanation:
        "Ô này tuỳ chọn, trống là bình thường, nên luồng bỏ qua bước phụ thuộc vào nó. Dừng luồng vì một ô không bắt buộc làm phiền khách. Tự điền \"không ăn kiêng\" là bịa thông tin. Báo bạn mọi đơn trống khiến bạn ngập thông báo vô nghĩa.",
    },
    summary: {
      keyIdea: "Ô trống không tự biến mất; bạn chọn trước luồng dừng, bỏ qua hay báo.",
      formula: "Bắt buộc → chặn ở biểu mẫu. Tuỳ chọn → có nhánh khi trống. Sai định dạng → kiểm riêng.",
      commonMistake: "Để luồng âm thầm chạy tiếp và chỉ phát hiện khi phiếu giao in ra ô trống.",
      action: "Chọn một trường trong biểu mẫu của bạn và ghi ra: nếu nó trống thì tôi muốn luồng làm gì.",
    },
    application: {
      title: "Làm trong 15 phút",
      message:
        "Mở biểu mẫu hoặc bảng thật của bạn, liệt kê các ô. Đánh dấu ô nào bắt buộc, ô nào tuỳ chọn, rồi với mỗi ô tuỳ chọn viết một câu: nếu trống thì luồng bỏ qua hay báo tôi. Ngày mai bạn sẽ được hỏi: ô nào bạn từng để trống mà hoá ra cần?",
      secondary: "Gửi thử một đơn giả bỏ trống một ô bắt buộc và xem biểu mẫu phản ứng thế nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Năm, kho gọi: phiếu giao ghi số điện thoại trống, shipper không liên lạc được khách. Khách không làm gì sai, chỉ là luồng của bạn chưa được dặn phải làm gì khi ô bị bỏ trống.",
      },
      {
        type: "feynman",
        title: "Ô trống đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn làm lễ tân nhận phiếu đăng ký giấy. Một phiếu thiếu số điện thoại. Bạn có ba cách: trả phiếu lại cho khách, ghi \"chưa có SĐT\" rồi cất vào hồ sơ, hoặc báo cho trưởng phòng để cô ấy quyết.",
        columns: ["Cách xử lý", "Lễ tân với phiếu thiếu", "Luồng tự động"],
        rows: [
          ["Trả lại", "Trả phiếu, nhờ khách điền lại", "Dừng luồng, không ghi dòng"],
          ["Ghi nhận rồi đi tiếp", "Ghi \"chưa có SĐT\" vào hồ sơ", "Ghi dòng kèm nhãn thiếu"],
          ["Hỏi người có quyền", "Báo trưởng phòng quyết", "Gửi thông báo cho bạn"],
          ["Không quyết gì", "Cất phiếu, để đến khi có người hỏi", "Chạy tiếp với ô trống"],
        ],
        oneLiner: "Luồng cũng như lễ tân mới: nếu bạn không dặn trước, nó sẽ làm cách dễ nhất là cứ cho phiếu đi tiếp.",
      },
      { type: "heading", text: "Ô trống và ô sai không giống nhau" },
      {
        type: "paragraph",
        text: "Ô trống là khách không điền gì. Ô sai là khách điền nhưng giá trị không dùng được, ví dụ chữ \"abc\" vào ô số điện thoại. Hai loại này cần hai cách kiểm tra khác nhau, và bài này chủ yếu nói về loại thứ nhất.",
      },
      {
        type: "flow",
        title: "Đường đi của một phiếu thiếu số điện thoại",
        steps: [
          { label: "Khách gửi biểu mẫu", detail: "Khách bỏ trống ô số điện thoại nhưng điền đủ tên và email, rồi bấm gửi." },
          { label: "Luồng nhận trường rỗng", detail: "Luồng không biết thiếu là xấu hay tốt. Nó chỉ thấy trường Số điện thoại có giá trị rỗng." },
          { label: "Bước kiểm tra do bạn đặt", detail: "Nếu bạn đặt một bước hỏi \"trường này có trống không\", luồng rẽ sang nhánh bạn chọn. Nếu không, nó đi thẳng." },
          { label: "Một trong ba lối ra", detail: "Dừng và báo khách, ghi dòng có nhãn thiếu, hoặc chạy tiếp. Mỗi lối kéo theo hệ quả ở bước giao hàng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bắt buộc ở biểu mẫu",
          text: "Khách không gửi được khi còn trống. Hợp với thông tin không có thì không làm được việc, như địa chỉ giao hàng. Nhược điểm: hỏi quá nhiều ô bắt buộc thì khách bỏ dở.",
        },
        right: {
          label: "Tuỳ chọn, luồng có nhánh",
          text: "Khách gửi được dù trống. Hợp với thông tin có thì tốt, không có vẫn làm được việc. Luồng cần một nhánh: nếu trống thì bỏ qua bước nhắn tin, hoặc gắn nhãn.",
        },
      },
      {
        type: "callout",
        label: "Nên nhớ",
        text: "Đừng để luồng tự điền giá trị cho đỡ trống. Một giá trị bịa khó phát hiện hơn một ô trống rất nhiều.",
      },
      { type: "heading", text: "Thử quyết định thay cho luồng" },
      {
        type: "scenario",
        title: "Khách bỏ trống số điện thoại",
        start: "a",
        nodes: {
          a: {
            text: "Khách Hoa đặt hàng, bỏ trống số điện thoại. Luồng của bạn sẽ ghi dòng và gửi thư xác nhận; bước giao hàng cần số điện thoại. Bạn đặt luồng xử lý thế nào?",
            choices: [
              { label: "Cho luồng chạy tiếp, ô trống cứ để trống", next: "run" },
              { label: "Dừng hẳn luồng, khách phải điền lại từ đầu", next: "stop" },
              { label: "Ghi dòng kèm nhãn \"thiếu SĐT\" và báo bạn qua email", next: "flag" },
            ],
          },
          run: {
            text: "Hôm sau kho in phiếu giao: ô điện thoại trống, shipper không gọi được. Bạn làm gì?",
            choices: [
              { label: "Gọi hỏi khách qua email rồi thêm quy tắc kiểm tra ô trống", next: "good1" },
              { label: "Bảo kho cứ giao, tới nơi sẽ biết", next: "bad1" },
            ],
          },
          stop: {
            text: "Khách nhận một thông báo lỗi khó hiểu, không biết mình thiếu gì. Bạn làm gì?",
            choices: [
              { label: "Sửa biểu mẫu: đánh dấu số điện thoại bắt buộc và ghi rõ lý do", next: "good2" },
              { label: "Giữ nguyên, khách tự đoán rồi điền lại", next: "bad2" },
            ],
          },
          flag: {
            text: "Sáng sau bạn thấy ba dòng gắn nhãn \"thiếu SĐT\". Bạn làm gì?",
            choices: [
              { label: "Email hỏi lại từng khách, cập nhật ô rồi gỡ nhãn", next: "good3" },
              { label: "Kệ, chúng sẽ tự hết", next: "bad3" },
            ],
          },
          good1: { text: "Bạn lấy được số, đơn giao kịp, và từ nay luồng kiểm tra ô trống trước khi tới bước giao.", ending: "good" },
          bad1: { text: "Shipper đứng trước cửa khách không liên lạc được, đơn bị trả về. Ô trống đã gây ra thiệt hại thật.", ending: "bad" },
          good2: { text: "Khách lần sau không gửi được khi thiếu số và biết rõ vì sao; luồng không còn gặp ô trống này nữa.", ending: "good" },
          bad2: { text: "Nhiều khách bỏ dở vì không hiểu lỗi; bạn mất đơn mà không biết.", ending: "bad" },
          good3: { text: "Dòng thiếu được bù đủ trước khi giao. Nhãn giúp bạn thấy ngay đơn nào cần hỏi lại.", ending: "good" },
          bad3: { text: "Nhãn không tự hết: ba đơn vẫn thiếu số và bị quên cho tới khi khách gọi phàn nàn.", ending: "bad" },
        },
      },
      {
        type: "closing",
        lines: [
          "Ô trống đi tiếp xuống các bước sau nếu bạn không chặn nó.",
          "Quyết trước ba lối ra: dừng, bỏ qua hay báo bạn.",
          "Đừng để luồng tự điền giá trị cho đỡ trống.",
        ],
      },
    ],
  },
  {
    id: 2427,
    slug: "dinh-dang-ngay-so-tien-lech-giua-hai-noi",
    title: "Chặng 51, Bài 8: Ngày tháng và số tiền lệch định dạng giữa hai nơi",
    subtitle: "Cùng một dòng chữ 05/06 có thể là hai ngày khác nhau; bạn cần một quy ước chung.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi dữ liệu đi từ nơi này sang nơi khác, một ngày hay một số tiền có thể đổi nghĩa mà không ai báo lỗi. Ngày 05/06 thành 6 tháng 5, số 1.500 thành 1,5. Biết kiểu lệch này và ghi một quy ước chung giúp bạn tránh lịch hẹn sai ngày và báo cáo sai số.",
    openingQuestion:
      "Bảng của bạn ghi ngày hẹn là 05/06. Hệ thống đặt lịch ở phía bên kia đọc dạng tháng/ngày. Khách nhận lịch ngày nào?",
    openingOptions: [
      "Ngày 6 tháng 5, tức lệch một tháng mà không có cảnh báo",
      "Ngày 5 tháng 6, vì hệ thống nào cũng đọc cùng một cách",
      "Một thông báo lỗi, vì hệ thống nhận ra định dạng bị lệch",
      "Ngày 5 tháng 6, vì 05 luôn là ngày và 06 luôn là tháng",
    ],
    correctOption: 0,
    explanation:
      "Với ngày có số đầu không quá 12, cả hai cách đọc đều hợp lệ, nên hệ thống kia đọc thành 6 tháng 5 mà không thấy gì bất thường và không báo lỗi. Đây là chỗ nguy hiểm: lỗi chỉ lộ ra khi khách đến sai ngày. Không có quy ước toàn cầu nào khiến mọi nơi đọc giống nhau, và \"05 luôn là ngày\" chỉ đúng với nơi dùng thứ tự ngày/tháng.",
    diagram: [
      { label: "Bảng ghi ngày 05/06", arrow: true },
      { label: "Hệ thống kia đọc theo thứ tự khác", arrow: true },
      { label: "Ngày bị hiểu thành 6 tháng 5", arrow: true },
      { label: "Quy ước chung: năm-tháng-ngày" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trung tâm đào tạo (hypothetical) xuất danh sách khoá học từ bảng tính sang một hệ thống đặt lịch. Ngày khai giảng 03/04 bị đọc thành 4 tháng 3. Học viên đến lớp khi khoá đã bắt đầu một tháng trước. Sau đó trung tâm thống nhất ghi ngày dạng 2026-04-03 cho mọi bảng xuất ra.",
    },
    quiz: [
      {
        question: "Vì sao ngày 05/06 nguy hiểm hơn ngày 25/06 khi dữ liệu đi giữa hai hệ thống?",
        options: [
          "Cả hai cách đọc đều hợp lệ nên hệ thống kia đọc sai mà không báo lỗi",
          "Vì 05/06 có số nhỏ hơn nên hệ thống dễ bỏ qua hoặc đọc thiếu số đầu của ngày",
          "Vì tháng 6 có ít ngày hơn nên dễ bị cắt mất ngày",
          "Vì hệ thống chỉ đọc sai các ngày từ 13 trở lên",
        ],
        correct: 0,
        explanation:
          "Ngày có số đầu từ 13 trở lên không thể là tháng nên hệ thống sẽ báo lỗi hoặc buộc phải đọc đúng. Ngày từ 1 tới 12 đọc ra kiểu nào cũng hợp lệ, nên lệch mà im lặng. Kích thước số hay số ngày trong tháng không liên quan, và lập luận \"chỉ sai với ngày từ 13\" thì ngược hẳn sự thật.",
      },
      {
        question: "Định dạng ngày nào ít gây hiểu nhầm nhất khi chuyển dữ liệu giữa nhiều nơi?",
        options: [
          "Năm-tháng-ngày, ví dụ 2026-06-05",
          "Ngày/tháng/năm viết tắt, ví dụ 5/6/26, cho gọn và dễ đọc với người Việt",
          "Tháng/ngày/năm, ví dụ 6/5/2026, vì nhiều phần mềm nước ngoài dùng kiểu này",
          "Ngày viết bằng chữ tuỳ ý, ví dụ \"đầu tháng sáu\"",
        ],
        correct: 0,
        explanation:
          "Năm-tháng-ngày (chuẩn ISO 8601) bắt đầu từ đơn vị lớn nhất nên gần như không thể đọc nhầm thứ tự ngày và tháng. Hai dạng còn lại phụ thuộc vào nơi đọc. Viết chữ tuỳ ý thì máy không phân tích được nhất quán.",
      },
      {
        question: "Số \"1.500\" trong bảng của bạn nghĩa là một nghìn năm trăm đồng. Rủi ro khi gửi sang hệ thống khác là gì?",
        options: [
          "Hệ thống dùng dấu chấm làm dấu thập phân sẽ đọc thành 1,5",
          "Hệ thống sẽ đọc thành 15.000 vì thêm một số không",
          "Hệ thống bỏ dấu chấm và đọc thành 1.500.000",
          "Không rủi ro, vì mọi hệ thống đều hiểu dấu chấm là nghìn",
        ],
        correct: 0,
        explanation:
          "Ở Việt Nam dấu chấm ngăn hàng nghìn, nhưng nhiều hệ thống nước ngoài dùng dấu chấm cho phần thập phân, nên 1.500 thành 1,5. Các cách đọc còn lại (15.000 hay 1.500.000) không xuất phát từ quy tắc nào. Và \"mọi hệ thống đều hiểu như nhau\" chính là giả định gây ra lỗi.",
      },
      {
        question: "Cách ghi số tiền nào an toàn nhất khi xuất dữ liệu ra hệ thống khác?",
        options: [
          "Số trần không dấu nghìn, một loại dấu thập phân, kèm cột ghi rõ đơn vị tiền",
          "Giữ đúng dấu như bạn vẫn đọc, vì người nhận tự hiểu được ý bạn qua ngữ cảnh",
          "Kèm chữ \"đồng\" ngay sau số trong cùng một ô",
          "Dùng dấu phẩy ngăn hàng nghìn, cho giống báo cáo tiếng Anh",
        ],
        correct: 0,
        explanation:
          "Số trần và một dấu thập phân cố định, cùng đơn vị ghi ở cột riêng, giúp máy đọc nhất quán. Để người nhận tự hiểu là chính cách gây lệch. Gắn chữ vào trong ô biến số thành chuỗi chữ, còn dấu phẩy ngăn nghìn chỉ đổi lỗi sang phía bên kia.",
      },
      {
        question: "Bạn phát hiện lịch hẹn bị lệch một tháng ở 40 dòng. Việc nên làm đầu tiên là gì?",
        options: [
          "Sửa dòng đã gửi và ghi quy ước ngày năm-tháng-ngày cho cả hai nơi",
          "Xoá hết lịch hẹn và bắt toàn bộ khách đặt lại từ đầu trên hệ thống mới",
          "Đổi định dạng ô bảng sang kiểu của hệ thống kia mà không báo ai",
          "Sửa lại đúng 40 dòng đó rồi coi như xong",
        ],
        correct: 0,
        explanation:
          "Sửa dòng đã hỏng chỉ là nửa việc; nửa còn lại là chốt quy ước để lỗi không tái diễn. Xoá hết làm phiền khách. Đổi định dạng âm thầm khiến những người khác dùng bảng đọc sai. Sửa 40 dòng mà không chốt quy ước thì đợt sau lại lệch.",
      },
    ],
    keyTakeaways: [
      "05/06 đọc thành 5 tháng 6 hay 6 tháng 5 tuỳ nơi; ngày từ 1 tới 12 lệch mà không báo lỗi.",
      "Số 1.500 có thể là một nghìn năm trăm hoặc 1,5 tuỳ dấu chấm và dấu phẩy.",
      "Quy ước chung an toàn: ngày năm-tháng-ngày, số tiền không dấu nghìn.",
      "Sửa dòng đã lệch xong phải ghi quy ước, nếu không lỗi sẽ quay lại.",
    ],
    practicePrompt: {
      question:
        "Bảng của bạn có ngày 08/09. Bạn gửi sang hệ thống đọc dạng tháng/ngày. Cách nào chắc chắn giữ đúng ngày 8 tháng 9?",
      options: [
        "Đổi cột ngày sang dạng năm-tháng-ngày (2026-09-08) trước khi gửi",
        "Gửi nguyên 08/09 và hy vọng hệ thống kia đoán đúng thứ tự",
        "Viết lại thành 8/9 cho ngắn, vì bỏ số không sẽ dễ đoán hơn",
        "Đổi thành 09/08 để hệ thống kia đọc ra 8 tháng 9, mặc kệ người khác",
      ],
      correct: 0,
      explanation:
        "Dạng năm-tháng-ngày không phụ thuộc thứ tự vùng nên ngày đến nơi đúng là 8 tháng 9. Gửi nguyên là đánh cược. Bỏ số không không làm thứ tự rõ hơn. Đảo thành 09/08 chỉ hợp với một hệ thống và làm người đọc bảng gốc hiểu sai.",
    },
    summary: {
      keyIdea: "Cùng một chuỗi ký tự có thể mang hai nghĩa; máy không báo lỗi khi cả hai đều hợp lệ.",
      formula: "Ngày: năm-tháng-ngày. Số tiền: số trần, một dấu thập phân, đơn vị ở cột riêng.",
      commonMistake: "Tin rằng hai hệ thống sẽ tự hiểu giống nhau vì chữ trông giống nhau.",
      action: "Ghi một dòng quy ước ngày và số tiền cho nơi bạn hay xuất dữ liệu.",
    },
    application: {
      title: "Làm trong 15 phút",
      message:
        "Mở một bảng thật có cột ngày hoặc số tiền mà bạn hay gửi cho người khác hoặc nhập vào phần mềm. Tìm một dòng có ngày từ 1 tới 12 và ghi ra hai cách đọc. Sau đó viết một câu quy ước chung. Ngày mai bạn sẽ được hỏi: quy ước của bạn là gì và đã chia sẻ cho ai chưa?",
      secondary: "Thử xuất bảng đó sang hệ thống kia với một dòng thử và xem ngày hiện ra thế nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn gửi danh sách lịch hẹn sang hệ thống đặt lịch, và khách đầu tiên gọi hỏi vì sao lịch ghi ngày 6 tháng 5 thay vì 5 tháng 6. Không ai gõ sai cả, chỉ là hai nơi đọc cùng một dòng chữ theo hai thứ tự.",
      },
      {
        type: "feynman",
        title: "Lệch định dạng đơn giản hơn bạn nghĩ",
        intro: "Hình dung hai người cùng đọc số 12. Một người nghĩ đó là 12 cm, người kia nghĩ đó là 12 inch. Con số không đổi nhưng đơn vị ẩn đi, và cả hai đều tin mình đúng.",
        columns: ["Thành phần", "Số đo dùng hai loại thước", "Ngày và số tiền giữa hai nơi"],
        rows: [
          ["Con số nhìn thấy", "12", "05/06 hoặc 1.500"],
          ["Quy ước ẩn", "Đơn vị: cm hay inch", "Thứ tự ngày-tháng hay dấu chấm-phẩy"],
          ["Hậu quả", "Đồ cắt sai kích thước", "Lịch sai ngày, số sai gấp nghìn lần"],
          ["Cách chữa", "Ghi rõ đơn vị bên cạnh", "Chốt một quy ước chung, ghi ở đầu bảng"],
        ],
        oneLiner: "Định dạng là đơn vị ẩn của dữ liệu: không ghi rõ thì mỗi nơi tự chọn một loại thước.",
      },
      { type: "heading", text: "Lệch mà không báo lỗi mới nguy hiểm" },
      {
        type: "paragraph",
        text: "Ngày 25/06 đọc kiểu tháng/ngày sẽ thành \"tháng 25\", không tồn tại, nên hệ thống kêu lên. Ngày 05/06 thì cả hai cách đọc đều hợp lệ, nên hệ thống đọc sai mà im lặng. Các ngày từ 1 tới 12 chính là vùng nguy hiểm.",
      },
      {
        type: "chart",
        title: "Bao nhiêu dòng có thể bị đọc lệch",
        caption: "Số liệu minh hoạ, không phải đo thật. Kéo thanh trượt để xem số dòng có nguy cơ lệch thay đổi thế nào theo tổng số dòng nhập, và khi bạn chốt được quy ước chung.",
        kind: "line",
        xLabel: "Tổng số dòng nhập",
        yLabel: "Số dòng có thể lệch",
        x: { from: 50, to: 1000, step: 50 },
        params: [
          { id: "share", label: "Tỉ lệ dòng có ngày từ 1 đến 12", min: 0, max: 100, step: 5, value: 40, unit: "%" },
          { id: "fixed", label: "Tỉ lệ dòng đã thống nhất quy ước", min: 0, max: 100, step: 5, value: 0, unit: "%" },
        ],
        series: [
          { label: "Khi chưa có quy ước", expr: "x * share / 100" },
          { label: "Sau khi thống nhất quy ước", expr: "x * share / 100 * (100 - fixed) / 100" },
        ],
      },
      {
        type: "flow",
        title: "Một ngày đi từ bảng sang hệ thống khác",
        steps: [
          { label: "Bảng ghi 05/06", detail: "Người nhập hiểu đây là ngày 5 tháng 6 theo thói quen của mình." },
          { label: "Xuất dữ liệu", detail: "Ngày đi dưới dạng chữ 05/06, không kèm thông tin về thứ tự ngày-tháng." },
          { label: "Hệ thống kia phân tích", detail: "Nếu nó mặc định tháng/ngày, nó đọc thành 6 tháng 5 và coi là hợp lệ." },
          { label: "Khách nhận lịch", detail: "Lịch hiện một ngày khác ngày bạn định. Chỉ khi khách phản ánh bạn mới biết." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Ghi chú quy ước do AI viết: đoạn nào sai?",
        task: "Bạn nhờ AI soạn ghi chú về lệch định dạng ngày và số tiền. Bấm vào các đoạn sai hoặc bịa, rồi nộp.",
        segments: [
          { text: "Một số hệ thống đọc ngày theo thứ tự tháng/ngày, nên 05/06 có thể thành 6 tháng 5." },
          {
            text: "Lệch chỉ xảy ra với ngày từ 13 trở lên; ngày 05/06 thì không bao giờ bị đọc lệch.",
            error: "Ngược lại: ngày từ 13 trở lên bị lộ ngay vì không thể là tháng; ngày 1-12 mới lệch mà không báo lỗi.",
          },
          { text: "Số tiền 1.500 ở Việt Nam là một nghìn năm trăm, nhưng hệ thống dùng dấu chấm thập phân có thể đọc thành 1,5." },
          {
            text: "Tiêu chuẩn ISO 8601 quy định mọi công ty phải ghi ngày dạng ngày/tháng/năm.",
            error: "Bịa: ISO 8601 dùng thứ tự năm-tháng-ngày, và nó là chuẩn tham khảo, không phải quy định bắt buộc mọi công ty phải tuân theo.",
          },
          { text: "Cách an toàn là thống nhất ghi ngày dạng năm-tháng-ngày, ví dụ 2026-06-05, cho mọi bảng xuất ra." },
        ],
      },
      {
        type: "scenario",
        title: "Khách nhận lịch hẹn sai tháng",
        start: "a",
        nodes: {
          a: {
            text: "Sáng thứ Hai, ba khách gọi: lịch hẹn của họ ghi tháng 5 trong khi bạn định tháng 6. Bạn làm gì?",
            choices: [
              { label: "Sửa ba lịch, rồi ghi quy ước ngày năm-tháng-ngày và áp cho mọi lần xuất", next: "good" },
              { label: "Sửa ba lịch rồi thôi, vì chắc chỉ là lỗi nhất thời", next: "bad1" },
              { label: "Đổi định dạng bảng sang kiểu của hệ thống kia, không báo ai", next: "bad2" },
            ],
          },
          good: { text: "Các lịch xuất sau đó đều đúng. Đồng nghiệp đọc ghi chú quy ước và cũng xuất theo cùng dạng.", ending: "good" },
          bad1: { text: "Tuần sau lại có hai khách lệch ngày. Nguyên nhân vẫn còn đó vì chưa ai chốt quy ước.", ending: "bad" },
          bad2: { text: "Bảng nhìn ổn với hệ thống kia, nhưng đồng nghiệp đọc bảng cũ hiểu sai ngày và lỗi lan sang báo cáo.", ending: "bad" },
        },
      },
      {
        type: "closing",
        lines: [
          "Cùng một chuỗi ký tự có thể mang hai nghĩa khi đi giữa hai nơi.",
          "Ngày từ 1 tới 12 là vùng lệch im lặng, nguy hiểm nhất.",
          "Chốt một quy ước chung và ghi lại: ngày năm-tháng-ngày, số tiền không dấu nghìn.",
        ],
      },
    ],
  },
  {
    id: 2428,
    slug: "nho-ai-viet-lai-noi-dung-email-tu-dong",
    title: "Chặng 51, Bài 9: Nhờ AI viết nội dung email tự động mà vẫn giữ giọng của bạn",
    subtitle: "Mẫu thư có chỗ trống cho tên và số tiền; AI viết lời quanh chỗ trống, bạn chọn và kiểm.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✉️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Email tự động gửi đi hàng chục lần, nên một câu lạ giọng hay một lời hứa bịa được nhân lên theo từng khách. Dùng AI để viết biến thể, còn chỗ trống và lời hứa do bạn giữ, giúp thư nghe như bạn mà bạn không phải viết lại từ đầu.",
    openingQuestion:
      "Bạn có mẫu thư nhắc thanh toán với hai chỗ trống {Tên} và {Số tiền}. Bạn nhờ AI viết lại cho thân thiện hơn. Bản nháp trả về cần kiểm điều gì trước tiên?",
    openingOptions: [
      "Hai chỗ trống còn nguyên vẹn và không có lời hứa nào bạn chưa duyệt",
      "Bản nháp có đủ dài để khách thấy công ty nghiêm túc hay không",
      "Bản nháp có dùng nhiều từ tiếng Anh cho trông chuyên nghiệp hơn hay không",
      "Bản nháp có tự điền tên và số tiền cụ thể cho khách được không",
    ],
    correctOption: 0,
    explanation:
      "Chỗ trống là nơi luồng sẽ điền tên và số tiền thật của từng khách; nếu AI đổi, xoá hoặc viết sai một chỗ trống thì thư gửi đi sẽ hiện chữ thô hoặc thiếu thông tin. AI cũng hay thêm lời hứa hay ưu đãi nghe hợp lý mà bạn chưa duyệt. Độ dài và từ tiếng Anh là chuyện giọng, sửa sau được. Việc tự điền tên và số tiền cụ thể là điều bạn không muốn, vì bản mẫu phải dùng cho mọi khách.",
    diagram: [
      { label: "Mẫu thư có chỗ trống {Tên}, {Số tiền}", arrow: true },
      { label: "AI viết ba biến thể lời thư", arrow: true },
      { label: "Bạn kiểm chỗ trống, số, lời hứa", arrow: true },
      { label: "Chọn một bản, gửi thử cho chính mình" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng nội thất nhỏ (hypothetical) nhờ AI viết lại thư nhắc thanh toán. Bản AI trả về đổi chỗ trống thành \"Quý khách\" và thêm câu \"giảm 10% nếu thanh toán hôm nay\". Chủ cửa hàng phát hiện ở bước gửi thử cho chính mình, bỏ lời hứa, sửa lại chỗ trống rồi mới cho luồng chạy.",
    },
    quiz: [
      {
        question: "Trong mẫu thư tự động, \"chỗ trống\" như {Tên} dùng để làm gì?",
        options: [
          "Giữ chỗ cho luồng điền giá trị thật của từng khách lúc gửi",
          "Để AI tự điền tên ngẫu nhiên cho mỗi bản nháp",
          "Đánh dấu đoạn chữ cần được dịch sang tiếng Anh",
          "Ngăn khách chỉnh sửa nội dung thư sau khi nhận",
        ],
        correct: 0,
        explanation:
          "Chỗ trống là một nhãn thay cho giá trị thật; khi gửi, luồng thay {Tên} bằng tên của từng khách. AI không có nhiệm vụ điền nó và nó không liên quan tới dịch thuật hay chặn chỉnh sửa.",
      },
      {
        question: "Khi nhờ AI viết biến thể, cách nào bảo vệ chỗ trống tốt nhất?",
        options: [
          "Dặn rõ: giữ nguyên {Tên} và {Số tiền}, không thay bằng giá trị cụ thể",
          "Xoá chỗ trống khỏi mẫu rồi tự điền lại bằng tay cho từng khách sau khi AI viết xong",
          "Dán một danh sách khách thật vào để AI điền sẵn cho nhanh",
          "Không dặn gì, vì AI hiểu chỗ trống thế nào là tự nhiên",
        ],
        correct: 0,
        explanation:
          "Một câu dặn rõ giữ chỗ trống nguyên vẹn là cách rẻ nhất. Xoá chỗ trống khiến bạn phải làm lại thủ công. Dán danh sách khách thật vào công cụ AI đưa dữ liệu cá nhân đi xa không cần thiết. Và AI không tự biết chỗ trống cần giữ: nó có thể viết lại hoặc thay thế.",
      },
      {
        question: "AI trả ba biến thể. Biến thể B đọc hay nhất nhưng có câu \"giảm 10% nếu thanh toán hôm nay\". Bạn chưa từng hứa giảm giá. Nên làm gì?",
        options: [
          "Bỏ câu đó khỏi bản B hoặc chọn bản khác",
          "Giữ lại, vì đọc hay là đủ lý do để gửi",
          "Giữ lại nhưng ghi nhỏ ở cuối thư \"điều kiện áp dụng\"",
          "Hỏi lại AI giảm giá này có hợp lệ không rồi tin câu trả lời của nó",
        ],
        correct: 0,
        explanation:
          "Lời hứa do AI thêm vào là thứ bạn chưa duyệt; gửi tức là cam kết với khách điều mà công ty chưa quyết. Đọc hay không là lý do để giữ giọng, không phải để giữ lời hứa. Ghi chú điều kiện nhỏ không xoá được lời hứa. Còn AI không biết chính sách giảm giá của công ty bạn.",
      },
      {
        question: "Vì sao nên gửi thử bản nháp cho chính mình trước khi bật luồng?",
        options: [
          "Để thấy thư thật hiện ra thế nào, gồm cả chỗ trống đã được điền",
          "Vì hệ thống thư yêu cầu mỗi mẫu phải được gửi thử ít nhất một lần mới cho phép bật",
          "Để AI học giọng viết của bạn từ chính những thư bạn nhận lại trong hộp thư",
          "Để tránh bị tính phí gửi thư khi luồng chạy thật cho khách",
        ],
        correct: 0,
        explanation:
          "Gửi thử cho chính mình cho thấy thư cuối cùng: chỗ trống có được điền đúng không, xuống dòng có hợp lý không. Không có yêu cầu bắt buộc nào như vậy, AI không học từ thư bạn nhận, và việc này không liên quan tới phí.",
      },
      {
        question: "Muốn AI viết giống giọng của bạn, cách hiệu quả nhất là gì?",
        options: [
          "Dán hai hoặc ba câu thư bạn đã tự viết và nhờ bắt chước giọng đó",
          "Chỉ cần viết \"giọng thân thiện\" trong yêu cầu là AI biết ngay giọng của bạn",
          "Nhờ AI viết dài hơn, vì thư dài thì giọng rõ hơn",
          "Đặt tên cho AI là tên của bạn để nó nhập vai",
        ],
        correct: 0,
        explanation:
          "Một vài câu mẫu thật cho AI thấy giọng cụ thể: độ trang trọng, cách xưng hô, độ dài câu. \"Thân thiện\" quá chung nên mỗi người hiểu một kiểu. Viết dài không làm giọng giống bạn, và đặt tên cho AI chỉ là hình thức.",
      },
    ],
    keyTakeaways: [
      "Chỗ trống như {Tên} là nhãn; luồng điền giá trị thật lúc gửi.",
      "Dặn AI giữ nguyên chỗ trống, và kiểm lại từng chỗ sau khi nhận nháp.",
      "AI hay thêm lời hứa bạn chưa duyệt: đọc để bắt chúng.",
      "Dán vài câu thư của chính bạn để AI bắt chước giọng.",
      "Gửi thử cho chính mình trước khi bật luồng.",
    ],
    practicePrompt: {
      question:
        "AI trả ba biến thể. Bản A giữ đủ {Tên} và {Số tiền}, hơi dài. Bản B hay nhất nhưng viết {Ten} thiếu dấu. Bản C ngắn và khô. Bạn chọn gì?",
      options: [
        "Bản A, cắt bớt một câu, gửi thử cho chính mình",
        "Bản B vì hay nhất, còn chỗ trống khách sẽ tự hiểu",
        "Bản C vì ngắn nhất thì ít rủi ro nhất cho mọi thư",
        "Yêu cầu AI viết lại từ đầu tới khi có bản hoàn hảo, không cần kiểm lại",
      ],
      correct: 0,
      explanation:
        "Bản A giữ đủ chỗ trống nên luồng điền được. Bản B hỏng chỗ trống: {Ten} không khớp nhãn {Tên} nên thư hiện chữ thô. Bản C đúng chỗ trống nhưng mất giọng. Viết lại mãi mà không kiểm vẫn có thể lặp lỗi chỗ trống.",
    },
    summary: {
      keyIdea: "AI viết lời quanh chỗ trống; bạn giữ chỗ trống, lời hứa và giọng.",
      formula: "Mẫu có chỗ trống + vài câu mẫu của bạn + dặn giữ nguyên chỗ trống → ba biến thể → kiểm → gửi thử.",
      commonMistake: "Chọn bản đọc hay nhất mà không kiểm chỗ trống và lời hứa thêm vào.",
      action: "Viết một mẫu thư có hai chỗ trống và nhờ AI ba biến thể, rồi kiểm bằng danh sách ở bài.",
    },
    application: {
      title: "Làm trong 20 phút",
      message:
        "Chọn một email bạn hay gửi lặp lại (nhắc thanh toán, xác nhận đơn, cảm ơn). Viết mẫu có hai chỗ trống như {Tên} và {Số tiền}, dán hai câu thư thật của bạn, nhờ AI ba biến thể và chọn một. Ngày mai bạn sẽ được hỏi: bản nháp của AI có lời hứa nào bạn phải bỏ không?",
      secondary: "Dùng tên và số tiền giả khi thử; đừng dán dữ liệu khách thật vào công cụ AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi tháng bạn gửi cùng một thư nhắc thanh toán cho năm mươi khách, chỉ đổi tên và số tiền. Bạn muốn thư ấm hơn mà không ngồi viết lại từng bản. Bài này cho bạn cách nhờ AI viết biến thể mà vẫn nghe như bạn.",
      },
      {
        type: "feynman",
        title: "Mẫu thư có chỗ trống đơn giản hơn bạn nghĩ",
        intro: "Hình dung một tấm thiệp mời in sẵn, có chỗ để trống để viết tay tên từng khách. Bạn nhờ một người viết chữ đẹp soạn lại lời thiệp, nhưng dặn: để nguyên chỗ trống tên, đừng tự điền.",
        columns: ["Thành phần", "Thiệp mời in sẵn", "Mẫu thư tự động"],
        rows: [
          ["Phần cố định", "Lời mời in sẵn", "Lời thư do bạn hoặc AI viết"],
          ["Chỗ để trống", "Ô viết tay tên khách", "{Tên}, {Số tiền} do luồng điền"],
          ["Người soạn lời", "Người viết chữ đẹp", "AI"],
          ["Lỗi hay gặp", "Người viết tự điền một cái tên cố định", "AI đổi hoặc xoá chỗ trống"],
        ],
        oneLiner: "AI là người viết lời thiệp: nhờ nó soạn lời thì được, nhưng chỗ trống thì phải giữ nguyên để luồng điền.",
      },
      { type: "heading", text: "AI không biết giọng của bạn, trừ khi bạn cho xem" },
      {
        type: "paragraph",
        text: "Nếu bạn chỉ viết \"giọng thân thiện\", mỗi người hiểu một kiểu. Hai hoặc ba câu thư thật bạn từng viết cho AI thấy cách xưng hô, độ dài câu và mức trang trọng, nên nó bắt chước sát hơn.",
      },
      {
        type: "flow",
        title: "Từ mẫu thư tới thư gửi đi",
        steps: [
          { label: "Viết mẫu có chỗ trống", detail: "Bạn viết một thư ngắn với {Tên} và {Số tiền} ở đúng chỗ cần điền." },
          { label: "Nhờ AI ba biến thể", detail: "Bạn dán mẫu cùng vài câu mẫu của bạn, dặn giữ nguyên chỗ trống, và yêu cầu ba bản khác nhau." },
          { label: "Đọc và kiểm", detail: "Bạn kiểm chỗ trống còn nguyên, số liệu không bị đổi, và không có lời hứa nào bạn chưa duyệt." },
          { label: "Chọn một bản", detail: "Bạn chọn bản hợp giọng nhất, cắt bớt nếu dài, và dán vào bước gửi thư của luồng." },
          { label: "Gửi thử cho chính mình", detail: "Bạn chạy luồng với tên và số tiền giả, đọc thư cuối cùng, rồi mới bật cho khách thật." },
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận",
        text: "Đừng dán tên, email hay số tiền của khách thật vào công cụ AI chỉ để nó điền sẵn. Dùng chỗ trống với giá trị giả khi thử.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết ba biến thể thư nhắc thanh toán",
        task: "Bạn cần thư nhắc thanh toán với chỗ trống {Tên} và {Số tiền}. Lắp một yêu cầu để AI viết ba biến thể dùng được.",
        parts: [
          {
            id: "template",
            label: "Mẫu thư",
            options: [
              { text: "Viết thư nhắc thanh toán.", feedback: "AI không biết thư có những chỗ trống nào, nên sẽ tự chọn tên khách và số tiền bịa ra." },
              {
                text: "Mẫu: \"Chào {Tên}, đơn của bạn còn {Số tiền} chưa thanh toán. Mong bạn sắp xếp giúp.\"",
                good: true,
                feedback: "Có mẫu với hai chỗ trống đặt đúng chỗ: AI biết chính xác phần nào phải để nguyên.",
              },
            ],
          },
          {
            id: "rule",
            label: "Điều cần giữ",
            options: [
              { text: "Viết lại cho hay hơn.", feedback: "Không dặn giữ chỗ trống hay cấm thêm lời hứa, nên AI tự do đổi hoặc thêm." },
              {
                text: "Giữ nguyên {Tên} và {Số tiền}, không thêm ưu đãi hay hạn chót mới, không đổi số.",
                good: true,
                feedback: "Nói rõ phần cố định và điều cấm: AI ít có cơ hội tự thêm lời hứa.",
              },
            ],
          },
          {
            id: "voice",
            label: "Giọng của bạn",
            options: [
              { text: "Giọng chuyên nghiệp.", feedback: "Quá chung: AI sẽ viết một giọng thư công ty khuôn mẫu, không giống bạn." },
              {
                text: "Giọng như hai câu tôi hay viết: \"Chào chị, em nhắc nhẹ chị một chút ạ.\" Viết ba biến thể, mỗi bản dưới 50 chữ.",
                good: true,
                feedback: "Có câu mẫu thật và giới hạn độ dài: ba bản khác nhau vẫn cùng một giọng.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["template", "rule", "voice"],
            text: "Bản 1: Chào {Tên}, em nhắc nhẹ chị một chút ạ: đơn còn {Số tiền} chưa thanh toán, chị sắp xếp giúp em nhé.\nBản 2: Chào {Tên}, đơn của mình còn {Số tiền} chưa thanh toán. Khi nào tiện chị cho em biết ạ.\nBản 3: Chào {Tên}, em gửi chị một lời nhắc nhỏ: khoản {Số tiền} cần thanh toán. Cảm ơn chị nhiều ạ.\n\n(Đủ chỗ trống, đủ giọng, không có ưu đãi lạ.)",
          },
          {
            requires: ["template"],
            text: "Bản 1: Kính gửi Quý khách {Tên}, chúng tôi trân trọng thông báo khoản {Số tiền} chưa được thanh toán. Thanh toán trong hôm nay để nhận ưu đãi giảm 10%.\nBản 2: Kính gửi Quý khách {Tên}, ...\n\n(Chỗ trống còn nguyên nhưng giọng khuôn mẫu, và AI tự thêm ưu đãi 10% mà bạn chưa từng hứa.)",
          },
          {
            text: "Chào anh Nam, đơn của anh còn 2.500.000 đồng chưa thanh toán, hạn chót là thứ Sáu tuần này. Bên em sẽ tính thêm phí trễ hạn nếu quá hạn.\n\n(AI tự bịa tên khách, số tiền, hạn chót và cả phí trễ hạn mà bạn chưa hề nói.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chọn một trong ba biến thể",
        start: "a",
        nodes: {
          a: {
            text: "AI trả ba biến thể. A: thân, đủ chỗ trống, hơi dài. B: đọc hay nhất, nhưng viết {Ten} thiếu dấu và hứa giảm 10%. C: ngắn, khô. Bạn làm gì?",
            choices: [
              { label: "Chọn B vì đọc hay nhất", next: "b" },
              { label: "So từng bản với mẫu: chỗ trống, số, lời hứa", next: "check" },
            ],
          },
          b: {
            text: "Bạn gửi thử cho chính mình: thư hiện chữ \"{Ten}\" nguyên văn và câu hứa giảm 10%. Bạn làm gì?",
            choices: [
              { label: "Sửa chỗ trống, bỏ lời hứa, gửi thử lại rồi mới bật luồng", next: "good1" },
              { label: "Bỏ qua, khách sẽ hiểu và chắc không ai đòi giảm giá", next: "bad1" },
            ],
          },
          check: {
            text: "Bản A giữ đủ chỗ trống và không có lời hứa lạ. Bạn làm gì tiếp?",
            choices: [
              { label: "Chọn A, cắt một câu, gửi thử cho chính mình rồi bật", next: "good2" },
              { label: "Chọn A nhưng dán danh sách khách thật vào AI để nó viết sẵn từng thư", next: "bad2" },
            ],
          },
          good1: { text: "Bạn sửa kịp trước khi khách thật nhận thư. Bước gửi thử đã cứu bạn khỏi một lời hứa không có.", ending: "good" },
          bad1: { text: "Khách nhận thư hiện chữ thô và nhiều người đòi giảm 10% mà bạn chưa từng hứa.", ending: "bad" },
          good2: { text: "Thư giữ giọng của bạn, chỗ trống được điền đúng, và bạn đã thấy kết quả thật trước khi bật.", ending: "good" },
          bad2: { text: "Bạn đưa tên và số tiền của cả danh sách khách vào công cụ ngoài mà không cần thiết, và thư viết sẵn dễ lẫn giữa các khách.", ending: "bad" },
        },
      },
      {
        type: "closing",
        lines: [
          "AI viết lời quanh chỗ trống; chỗ trống, số và lời hứa là phần bạn giữ.",
          "Vài câu thư thật của bạn dạy AI giọng tốt hơn chữ \"thân thiện\".",
          "Luôn gửi thử cho chính mình với dữ liệu giả trước khi bật.",
        ],
      },
    ],
  },
  {
    id: 2429,
    slug: "mini-du-an-bang-theo-doi-don-cap-nhat-tu-dong",
    title: "Chặng 51, Bài 10: Mini dự án: bảng theo dõi đơn tự thêm dòng khi có đơn mới",
    subtitle: "Bạn thiết kế luồng đưa mỗi đơn mới vào một dòng bảng kèm trạng thái ban đầu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng theo dõi đơn là luồng tự động hữu ích và dễ làm nhất cho người không viết code. Nhưng nếu chọn sai cột ngay từ đầu, vài tuần sau bạn không lọc được đơn chưa xử lý và phải sửa cả bảng. Bài này cho bạn chọn cột đúng trước khi dựng.",
    openingQuestion:
      "Bạn muốn mỗi đơn mới tự thành một dòng trong bảng. Tuần sau bạn sẽ cần lọc các đơn chưa xử lý. Cột nào phải có ngay từ đầu?",
    openingOptions: [
      "Cột Trạng thái, mỗi dòng mới ghi sẵn là \"Mới\"",
      "Cột Ghi chú chung, để chứa mọi thông tin của đơn",
      "Cột Màu, tô đỏ các đơn quan trọng bằng tay",
      "Cột Lịch sử, nơi ghi mọi lần bạn mở dòng xem",
    ],
    correctOption: 0,
    explanation:
      "Muốn lọc đơn chưa xử lý, máy cần một giá trị để lọc: cột Trạng thái có giá trị \"Mới\" cho mọi đơn vừa vào. Cột ghi chú chung gộp mọi thứ lại nên không lọc được, tô màu bằng tay phụ thuộc vào việc bạn nhớ làm, và cột lịch sử không cho biết đơn đã xử lý hay chưa. Nghĩa là trạng thái ban đầu nên được luồng ghi sẵn chứ không chờ ai gõ.",
    diagram: [
      { label: "Khách gửi đơn mới", arrow: true },
      { label: "Luồng kiểm đơn đã có chưa", arrow: true },
      { label: "Thêm một dòng với trạng thái Mới", arrow: true },
      { label: "Bạn lọc theo trạng thái để xử lý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một xưởng may nhỏ (hypothetical) nhận đơn qua biểu mẫu. Ban đầu bảng chỉ có tên và số tiền. Khi số đơn tăng, chị chủ không lọc được đơn nào chưa làm. Chị thêm cột Trạng thái, cho luồng ghi \"Mới\" mỗi khi có đơn, và từ đó mỗi sáng chỉ cần lọc các dòng \"Mới\".",
    },
    quiz: [
      {
        question: "Mỗi dòng của bảng theo dõi đơn nên đại diện cho điều gì?",
        options: [
          "Một đơn, với mỗi thông tin của đơn nằm ở một cột riêng",
          "Một ngày làm việc, gom mọi đơn trong ngày vào một dòng",
          "Một khách hàng, dù khách đặt bao nhiêu đơn thì cũng chỉ có một dòng duy nhất",
          "Một bước của luồng, ghi lại bước nào vừa chạy",
        ],
        correct: 0,
        explanation:
          "Một dòng một đơn, mỗi thông tin một cột, giúp lọc và đếm được. Gộp nhiều đơn vào một dòng hay một khách vào một dòng làm mất từng đơn riêng lẻ. Một dòng một bước là nhật ký của luồng chứ không phải bảng theo dõi đơn.",
      },
      {
        question: "Nhóm cột nào là đủ tối thiểu cho một bảng theo dõi đơn?",
        options: [
          "Mã đơn, ngày đặt, tên, email, số tiền, trạng thái",
          "Chỉ tên và số tiền, vì hai thứ đó là quan trọng nhất",
          "Tên khách và một cột ghi chú chung cho mọi chi tiết còn lại",
          "Mã đơn và trạng thái thôi, còn chi tiết xem ở biểu mẫu gốc",
        ],
        correct: 0,
        explanation:
          "Mã để phân biệt đơn, ngày để sắp xếp, tên và email để liên hệ, số tiền để tính, trạng thái để lọc. Thiếu bất kỳ cột nào là lúc cần nhất bạn không có dữ liệu. Ghi chú chung không lọc được, và phải mở biểu mẫu gốc là mất mục đích của bảng.",
      },
      {
        question: "Khách bấm gửi biểu mẫu hai lần và bảng có hai dòng giống hệt. Cách chữa tốt nhất là gì?",
        options: [
          "Thêm bước kiểm tra mã đơn đã có trong bảng chưa trước khi ghi dòng",
          "Dặn khách đừng bấm hai lần, rồi mỗi sáng tự đối chiếu bằng mắt xem có dòng nào trùng",
          "Xoá dòng thừa bằng tay mỗi sáng",
          "Cho luồng chạy chậm lại vài giây để khách không kịp bấm gửi lần hai",
        ],
        correct: 0,
        explanation:
          "Kiểm tra mã đơn trước khi ghi giải quyết tận gốc, vì luồng tự biết đơn đã có. Dặn khách không kiểm soát được hành vi của khách. Xoá tay là việc lặp lại bạn đang muốn tự động. Chạy chậm không ngăn hai lần bấm.",
      },
      {
        question: "Vì sao luồng nên ghi sẵn trạng thái \"Mới\" thay vì để ô trống cho bạn tự gõ?",
        options: [
          "Để mọi dòng ngay từ đầu đã có giá trị lọc được, không phụ thuộc vào việc bạn nhớ gõ",
          "Vì bảng tính không cho để trống cột trạng thái, nên luồng bắt buộc phải điền trước khi ghi dòng",
          "Để khách nhìn thấy đơn của mình đã được ghi nhận",
          "Vì ô có chữ thì tải nhanh hơn ô trống",
        ],
        correct: 0,
        explanation:
          "Giá trị ban đầu tự ghi làm cho bộ lọc đáng tin từ dòng đầu tiên. Bảng tính cho phép ô trống, khách không nhìn thấy bảng nội bộ của bạn, và tốc độ tải không khác biệt vì một chữ.",
      },
      {
        question: "Sau vài tuần bạn muốn thêm cột \"Người phụ trách\". Nên làm gì với các dòng cũ?",
        options: [
          "Thêm cột mới, điền giá trị cho dòng cũ rồi sửa luồng để dòng mới có sẵn giá trị",
          "Xoá bảng cũ và làm lại từ đầu với cột mới, rồi nhập lại các đơn cũ bằng tay từng dòng",
          "Chỉ thêm cột, để dòng cũ trống mãi, vì bộ lọc vẫn chạy được với các dòng mới là đủ",
          "Đổi tên một cột hiện có, ví dụ cột Email, thành Người phụ trách cho đỡ thêm cột",
        ],
        correct: 0,
        explanation:
          "Thêm cột, điền dòng cũ và sửa luồng là cách giữ dữ liệu cũ mà không phải làm lại. Xoá bảng làm mất lịch sử. Để dòng cũ trống khiến bộ lọc thiếu. Đổi tên cột đang có thì phá dữ liệu vốn thuộc về cột đó.",
      },
      {
        question: "Trước khi bật luồng cho khách thật, bạn nên làm gì?",
        options: [
          "Gửi hai đơn giả có giá trị khác nhau và soát dòng mới trong bảng",
          "Bật luôn và chờ đơn thật đầu tiên để xem luồng có chạy không",
          "Gửi một đơn giả duy nhất, nếu đúng là đủ chắc chắn",
          "Nhờ AI đọc luồng và cam đoan là đã đúng",
        ],
        correct: 0,
        explanation:
          "Hai đơn giả khác nhau cho thấy cột nào nhận đúng, và sửa một cặp nối không làm lệch cặp khác. Chờ đơn thật là lấy khách làm người thử nghiệm. Một đơn giả có thể đúng ngẫu nhiên. AI đọc luồng không thay cho việc chạy thật.",
      },
    ],
    keyTakeaways: [
      "Một dòng một đơn, mỗi thông tin một cột.",
      "Cột Trạng thái có giá trị ban đầu do luồng ghi giúp lọc đáng tin từ đầu.",
      "Kiểm mã đơn đã có trước khi thêm dòng để tránh trùng.",
      "Thêm cột mới sau này: điền dòng cũ và sửa luồng, đừng làm lại bảng.",
      "Chạy hai đơn giả có giá trị khác nhau trước khi bật cho khách thật.",
    ],
    practicePrompt: {
      question:
        "Bảng của bạn chỉ có cột Tên và Số tiền, nay cần lọc đơn chưa làm. Bạn làm gì?",
      options: [
        "Thêm cột Trạng thái, điền \"Mới\" cho dòng cũ và sửa luồng ghi \"Mới\" từ giờ",
        "Tô màu tay các đơn chưa làm và nhớ màu nào là màu nào",
        "Xoá bảng và dựng lại một bảng mới từ đầu có thêm cột",
        "Ghi thêm \"chưa làm\" vào cuối cột Tên của từng đơn",
      ],
      correct: 0,
      explanation:
        "Thêm cột riêng giữ dữ liệu cũ và cho bộ lọc hoạt động. Tô màu tay không lọc được và dễ quên. Xoá bảng mất lịch sử. Nhét \"chưa làm\" vào cột Tên làm bẩn dữ liệu tên và khó lọc.",
    },
    summary: {
      keyIdea: "Luồng tốt bắt đầu từ cột đúng: mỗi đơn một dòng, trạng thái ban đầu do luồng ghi.",
      formula: "Đơn mới → kiểm mã đã có chưa → thêm dòng (Mã, Ngày, Tên, Email, Tiền, Trạng thái = Mới).",
      commonMistake: "Bắt đầu với quá ít cột rồi phải làm lại bảng khi cần lọc.",
      action: "Liệt kê các cột bảng theo dõi đơn của bạn và ghi trạng thái ban đầu.",
    },
    application: {
      title: "Làm trong 20 phút",
      message:
        "Chọn một loại đơn hoặc yêu cầu thật của bạn (đơn hàng, yêu cầu hỗ trợ, đăng ký). Viết ra sáu cột của bảng theo dõi, gồm một cột trạng thái có giá trị ban đầu, và ghi một câu về cách luồng tránh trùng đơn. Ngày mai bạn sẽ được hỏi: bảng của bạn có những cột nào và vì sao?",
      secondary: "Điền hai dòng thử trong bảng để xem bộ lọc theo trạng thái có hoạt động không.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi sáng bạn mở hộp thư, chép từng đơn mới sang bảng theo dõi. Mười đơn thì còn được, ba mươi đơn thì bắt đầu sót. Bài mini dự án này cho bạn thiết kế luồng tự chép từng đơn vào một dòng, và chọn cột đúng ngay từ đầu.",
      },
      {
        type: "feynman",
        title: "Bảng theo dõi đơn đơn giản hơn bạn nghĩ",
        intro: "Hình dung một cuốn sổ đặt bàn ở quán ăn: mỗi lượt đặt là một dòng, có giờ, tên, số người và một ô ghi \"chờ\" hay \"đã xếp bàn\". Cuối ngày chủ quán chỉ cần nhìn ô đó.",
        columns: ["Thành phần", "Sổ đặt bàn", "Bảng theo dõi đơn"],
        rows: [
          ["Một dòng", "Một lượt đặt bàn", "Một đơn"],
          ["Các cột", "Giờ, tên, số người", "Mã đơn, ngày, tên, email, tiền"],
          ["Ô tình trạng", "\"Chờ\" hoặc \"Đã xếp bàn\"", "Trạng thái: Mới, Đang làm, Xong"],
          ["Người ghi", "Nhân viên ghi ngay khi khách gọi", "Luồng ghi ngay khi đơn gửi tới"],
        ],
        oneLiner: "Bảng theo dõi là cuốn sổ đặt bàn do luồng ghi: dòng nào cũng có sẵn ô tình trạng để bạn lọc.",
      },
      { type: "heading", text: "Bắt đầu từ các cột" },
      {
        type: "paragraph",
        text: "Trước khi dựng luồng, hãy chọn cột. Sáu cột là đủ cho đa số đơn: Mã đơn, Ngày đặt, Tên, Email, Số tiền, Trạng thái. Nhớ rằng Trạng thái phải có giá trị ngay từ đầu, và đó là việc của luồng chứ không phải việc của bạn.",
      },
      {
        type: "flow",
        title: "Một đơn mới đi vào bảng",
        steps: [
          { label: "Đơn mới gửi tới", detail: "Khách gửi biểu mẫu; luồng được kích hoạt với các trường Mã đơn, Tên, Email, Số tiền." },
          { label: "Kiểm mã đơn", detail: "Luồng tìm trong bảng xem mã đơn này đã có chưa. Nếu có, nó dừng để không tạo dòng trùng." },
          { label: "Thêm dòng mới", detail: "Nếu chưa có, luồng ghi một dòng: Mã, Ngày đặt, Tên, Email, Số tiền." },
          { label: "Ghi trạng thái ban đầu", detail: "Cột Trạng thái được luồng ghi sẵn là \"Mới\", để bộ lọc dùng được ngay." },
          { label: "Bạn lọc theo trạng thái", detail: "Mỗi sáng bạn lọc \"Mới\", xử lý rồi đổi sang \"Đang làm\" hoặc \"Xong\"." },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Đừng gộp nhiều thông tin vào một cột. Một cột chứa cả tên, tiền và ghi chú nhìn gọn nhưng không lọc, không cộng, không sắp xếp được.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết bản mô tả luồng theo dõi đơn",
        task: "Bạn cần một bản mô tả ngắn cho luồng bảng theo dõi đơn, để gửi cho đồng nghiệp dựng hoặc soát. Lắp yêu cầu để AI viết bản mô tả dùng được.",
        parts: [
          {
            id: "trigger",
            label: "Điều kích hoạt",
            options: [
              { text: "Khi có việc gì đó.", feedback: "Quá mơ hồ: AI không biết luồng bắt đầu từ đâu, nên sẽ tự chọn một sự kiện." },
              {
                text: "Khi khách gửi biểu mẫu đặt hàng, có các trường Mã đơn, Tên, Email, Số tiền.",
                good: true,
                feedback: "Nói rõ sự kiện và các trường đi kèm: bản mô tả bám đúng dữ liệu thật.",
              },
            ],
          },
          {
            id: "columns",
            label: "Các cột của bảng",
            options: [
              { text: "Cột nào cũng được, tuỳ AI.", feedback: "AI sẽ tự đặt cột có thể thiếu Trạng thái hoặc Mã đơn, và bạn không lọc hay kiểm trùng được." },
              {
                text: "Sáu cột: Mã đơn, Ngày đặt, Tên, Email, Số tiền, Trạng thái, và Trạng thái ban đầu là \"Mới\".",
                good: true,
                feedback: "Liệt kê đủ cột và giá trị ban đầu: bản mô tả có thể dùng ngay để dựng.",
              },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc đặc biệt",
            options: [
              { text: "Không cần quy tắc gì thêm.", feedback: "Khách bấm hai lần sẽ sinh hai dòng trùng vì bản mô tả không nhắc gì tới việc này." },
              {
                text: "Nếu Mã đơn đã có trong bảng thì không thêm dòng, và ghi chú lại để tôi biết.",
                good: true,
                feedback: "Có quy tắc chặn trùng và cách báo: luồng an toàn hơn với khách bấm hai lần.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["trigger", "columns", "rule"],
            text: "Luồng: khi có biểu mẫu đặt hàng mới (Mã đơn, Tên, Email, Số tiền), kiểm Mã đơn đã có trong bảng chưa. Nếu có thì dừng và ghi chú để chủ bảng biết. Nếu chưa thì thêm một dòng với sáu cột: Mã đơn, Ngày đặt (ngày hôm nay), Tên, Email, Số tiền, Trạng thái = \"Mới\".\n\n(Đủ sự kiện, đủ cột, có quy tắc chặn trùng.)",
          },
          {
            requires: ["trigger"],
            text: "Luồng: khi có biểu mẫu đặt hàng mới, thêm một dòng vào bảng với Tên, Email và Số tiền của khách.\n\n(Đúng sự kiện nhưng thiếu Mã đơn, Trạng thái và chống trùng; bạn sẽ không lọc được đơn mới.)",
          },
          {
            text: "Luồng: mỗi khi có tin nhắn mới, AI tự phân loại khách và cập nhật bảng doanh thu tháng, đồng thời gửi báo cáo cho giám đốc.\n\n(AI tự bịa ra những việc bạn chưa yêu cầu vì đầu bài quá mơ hồ.)",
          },
        ],
      },
      { type: "heading", text: "Thử thiết kế bảng của bạn" },
      {
        type: "scenario",
        title: "Chọn cột cho bảng theo dõi đơn",
        start: "a",
        nodes: {
          a: {
            text: "Bạn thiết kế luồng đưa mỗi đơn mới vào một dòng của bảng. Bạn chọn các cột thế nào?",
            choices: [
              { label: "Chỉ hai cột: Tên và Số tiền, cho gọn", next: "few" },
              { label: "Đủ cột: Mã đơn, Ngày, Tên, Email, Số tiền, Trạng thái = Mới", next: "full" },
              { label: "Dán cả nội dung đơn vào một cột cho đỡ phải nối ô", next: "one" },
            ],
          },
          few: {
            text: "Tuần sau bạn cần lọc đơn chưa xử lý nhưng bảng không có cột Trạng thái. Bạn làm gì?",
            choices: [
              { label: "Thêm cột Trạng thái, điền \"Mới\" cho dòng cũ và sửa luồng ghi \"Mới\" từ giờ", next: "good1" },
              { label: "Xoá hết bảng và làm lại", next: "bad1" },
            ],
          },
          one: { text: "Cột duy nhất chứa cả tên, email và tiền. Bạn không lọc được, không cộng được tiền, và phải đọc từng dòng bằng mắt.", ending: "bad" },
          full: {
            text: "Đơn thử đầu chạy xong, dòng hiện đủ. Sau đó một khách bấm gửi hai lần và bảng có hai dòng giống hệt. Bạn làm gì?",
            choices: [
              { label: "Thêm bước kiểm Mã đơn đã có trong bảng chưa, trước khi thêm dòng", next: "good2" },
              { label: "Dặn khách đừng bấm hai lần", next: "bad2" },
            ],
          },
          good1: { text: "Bảng có thêm cột đúng chỗ, dòng cũ vẫn còn, và bộ lọc đã chạy được.", ending: "good" },
          bad1: { text: "Bạn mất hết lịch sử đơn và phải dựng lại luồng chỉ vì thiếu một cột.", ending: "bad" },
          good2: { text: "Luồng tự bỏ qua đơn trùng, bảng sạch, và bạn biết mỗi dòng là một đơn thật.", ending: "good" },
          bad2: { text: "Khách không biết bạn dặn gì, và đơn trùng vẫn xuất hiện mỗi lần có người bấm đúp.", ending: "bad" },
        },
      },
      {
        type: "closing",
        lines: [
          "Một dòng một đơn, mỗi thông tin một cột, và trạng thái ban đầu do luồng ghi.",
          "Kiểm mã đơn trước khi thêm dòng để bảng không có đơn trùng.",
          "Chọn cột đúng từ đầu rẻ hơn nhiều so với sửa bảng về sau.",
        ],
      },
    ],
  },
];
