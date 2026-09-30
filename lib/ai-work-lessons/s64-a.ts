import type { Lesson } from "../lesson-types";

// Chặng 64, bài 1-5. Giáo trình: scripts/curriculum/stage-64.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy khái niệm bền
// (ai đang dùng gì, thông tin đi đâu, quy tắc ngắn) nên không cần nguồn tài liệu.
export const S64_A_LESSONS: Lesson[] = [
  {
    id: 2680,
    slug: "nhan-vien-tu-dung-ai-khong-ai-biet-buc-tranh-thuc-te",
    title: "Chặng 64, Bài 1: Nhân viên đã tự dùng AI mà không ai biết: bức tranh thật trong phòng",
    subtitle: "Trước khi đặt quy tắc, hãy hỏi ẩn danh xem cả phòng đang dùng AI vào việc gì.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Rất có thể đồng nghiệp của bạn đã nhờ AI viết email, tóm tắt hợp đồng hay chỉnh bảng số từ lâu rồi, chỉ là không ai nói ra vì sợ bị nhắc. Đặt quy tắc khi chưa biết thực tế giống như dán biển chỉ đường cho một con đường chưa ai đi. Một phiếu hỏi ẩn danh ba câu cho bạn bức tranh thật chỉ sau vài ngày.",
    openingQuestion:
      "Sếp nhờ bạn soạn quy tắc dùng AI cho phòng mười hai người. Bạn chưa biết ai đang dùng AI vào việc gì. Bước đầu tiên nên là gì?",
    openingOptions: [
      "Hỏi ẩn danh cả phòng đang dùng AI vào việc gì, rồi mới soạn",
      "Copy quy tắc của một công ty khác và chỉnh tên cho hợp phòng",
      "Gửi email nhắc cả phòng là không được dùng AI cho công việc hằng ngày",
      "Chờ đến khi xảy ra sự cố đầu tiên rồi mới bắt đầu đặt quy tắc",
    ],
    correctOption: 0,
    explanation:
      "Quy tắc tốt bắt đầu từ việc thật người ta đang làm. Phiếu ẩn danh giúp người ta khai thật mà không sợ bị nhắc tên, nên bạn biết việc nào cần hướng dẫn, việc nào cần chặn. Copy quy tắc công ty khác thì có thể lệch hẳn với việc của phòng bạn. Email cấm chung chung thường chỉ làm người ta dùng lén hơn. Chờ sự cố thì bạn trả giá trước rồi mới học.",
    diagram: [
      { label: "Hỏi ẩn danh: dùng AI vào việc gì, đưa gì vào", arrow: true },
      { label: "Gom thành bảng ba cột: việc, tần suất, loại dữ liệu", arrow: true },
      { label: "Nhìn ra nhóm việc an toàn và nhóm việc cần bàn", arrow: true },
      { label: "Dùng bảng này làm nền cho quy tắc của phòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm hành chính gửi phiếu ẩn danh ba câu cho tám người trong nhóm. Kết quả cho thấy năm người đã nhờ AI viết lại email, hai người dán bảng lương tháng để nhờ kiểm công thức, và không ai biết việc của người kia. Chị không tìm ai đã dán bảng lương. Chị đưa 'bảng lương' vào danh sách việc không được làm và hướng dẫn cách che tên trước khi nhờ AI.",
    },
    quiz: [
      {
        question: "Vì sao phiếu khảo sát việc dùng AI trong phòng nên ẩn danh?",
        options: [
          "Người ta khai thật khi không sợ bị nhắc tên, nên bạn thấy đúng thực tế",
          "Để bạn biết chính xác ai dùng AI nhiều nhất rồi nhắc riêng từng người",
          "Vì phiếu ẩn danh luôn có nhiều người điền hơn phiếu ghi tên, nên số liệu đầy đủ",
          "Vì quy định chung là khảo sát nội bộ nào cũng phải ẩn danh",
        ],
        correct: 0,
        explanation:
          "Mục đích là hiểu thực tế để giúp đỡ, không phải tìm người sai. Nếu phiếu dùng để truy người thì lần sau không ai khai thật nữa. Ẩn danh không bảo đảm đông người điền hơn mà chỉ làm câu trả lời trung thực hơn. Và không có quy định chung nào bắt mọi khảo sát nội bộ phải ẩn danh.",
      },
      {
        question: "Phiếu hỏi chỉ có thời gian ngắn. Câu nào cho bạn thông tin hữu ích nhất để sau này đặt quy tắc?",
        options: [
          "Bạn đã dán loại thông tin nào vào công cụ AI, nếu có",
          "Bạn thấy AI hữu ích hay không hữu ích, theo thang một đến năm",
          "Bạn có thích dùng AI hơn làm tay không, chọn một trong hai",
          "Bạn nghĩ công ty nên khuyến khích hay hạn chế việc dùng AI",
        ],
        correct: 0,
        explanation:
          "Quy tắc an toàn xoay quanh loại dữ liệu đi vào công cụ, nên câu hỏi về dữ liệu cho thông tin quyết định. Thang hữu ích hay không chỉ đo cảm nhận. Thích AI hơn làm tay là sở thích cá nhân, không giúp phân loại rủi ro. Ý kiến nên khuyến khích hay hạn chế là quan điểm, còn bạn đang cần sự việc đã xảy ra.",
      },
      {
        question: "Kết quả có bốn người dán dữ liệu khách hàng vào công cụ AI. Bạn nên làm gì trước?",
        options: [
          "Ghi nhóm việc này vào bảng và đưa vào quy tắc, không truy người",
          "Họp cả phòng và đọc to từng câu trả lời để mọi người rút kinh nghiệm",
          "Xoá các câu trả lời đó khỏi bảng để báo cáo trông gọn gàng hơn",
          "Hỏi bộ phận IT tìm ra bốn người đó qua lịch sử truy cập mạng",
        ],
        correct: 0,
        explanation:
          "Thông tin có giá trị ở chỗ nó chỉ ra một nhóm việc cần quy tắc rõ. Đọc to từng câu trả lời phá luôn sự ẩn danh đã hứa. Xoá câu khó chịu khỏi bảng là tự che bức tranh thật. Truy người qua lịch sử truy cập biến phiếu hỏi thành cái bẫy, và lần sau sẽ không ai trả lời thật.",
      },
      {
        question: "Bảng kết quả ba cột nào gọn mà vẫn đủ để bắt đầu soạn quy tắc?",
        options: [
          "Việc đã làm, số người làm hoặc tần suất, loại dữ liệu đưa vào",
          "Tên công cụ, ngày bắt đầu dùng, mức độ hài lòng của người dùng",
          "Tên người trả lời, phòng ban, việc làm hằng ngày của người đó",
          "Giá gói dịch vụ, số người dùng chung, thời hạn của gói đăng ký",
        ],
        correct: 0,
        explanation:
          "Ba cột việc, tần suất và dữ liệu cho bạn biết việc nào phổ biến và việc nào chạm dữ liệu nhạy cảm. Tên công cụ và mức hài lòng không cho biết rủi ro nằm ở đâu. Cột tên người đi ngược với cam kết ẩn danh. Giá gói và số người dùng chung là chuyện mua sắm, chưa phải chuyện quy tắc.",
      },
      {
        question: "Một người nói: 'Tôi dùng AI để viết lại email cho lịch sự hơn, không đưa dữ liệu gì cả.' Cách đọc đúng là gì?",
        options: [
          "Vẫn ghi vào bảng; nội dung email có thể chứa tên khách hay giá",
          "Việc này hoàn toàn vô hại nên có thể bỏ khỏi bảng cho đỡ dài",
          "Người này đã nói không có dữ liệu nên chắc chắn họ không vi phạm gì",
          "Đây là việc cá nhân nên không thuộc phạm vi quy tắc của phòng",
        ],
        correct: 0,
        explanation:
          "Email công việc thường có tên, số tiền hay điều khoản, và người viết có thể không coi đó là dữ liệu. Nên việc này vẫn vào bảng để xem mức chạm dữ liệu. Không phải việc nào 'nghe vô hại' cũng vô hại. Lời tự khai không có dữ liệu là cảm nhận của người đó. Email công việc không phải việc cá nhân.",
      },
    ],
    keyTakeaways: [
      "Hỏi trước, đặt quy tắc sau: quy tắc phải sinh ra từ việc người ta thật sự làm.",
      "Phiếu ẩn danh để hiểu và giúp, không để truy người.",
      "Ba câu đủ dùng: việc gì, bao lâu một lần, đưa loại dữ liệu nào vào.",
      "Bảng ba cột cho thấy ngay nhóm việc an toàn và nhóm cần bàn.",
      "Kết quả khó chịu vẫn phải ghi vào bảng, không được xoá cho đẹp.",
    ],
    practicePrompt: {
      question:
        "Phiếu ẩn danh có một dòng: 'Dán bảng lương để nhờ AI kiểm công thức.' Sếp hỏi bạn: 'Ai làm vậy? Anh cần nói chuyện.' Bạn nên trả lời thế nào?",
      options: [
        "Phiếu ẩn danh nên không ai biết; em sẽ đưa việc này vào quy tắc",
        "Để em lọc theo giờ điền phiếu rồi đoán xem là ai đã điền phiếu đó cho sếp",
        "Em sẽ hỏi từng người một và báo sếp người nào thú nhận",
        "Em xoá dòng đó khỏi kết quả để sếp không phải bận tâm",
      ],
      correct: 0,
      explanation:
        "Đã hứa ẩn danh thì giữ lời, nếu không phiếu sau sẽ không còn ai trả lời thật. Điều sếp thật sự cần là việc này không lặp lại, và quy tắc cùng hướng dẫn che tên làm được điều đó. Đoán người theo giờ điền hay hỏi từng người đều phá cam kết. Xoá dòng thì che mất rủi ro.",
    },
    summary: {
      keyIdea: "Muốn đặt quy tắc dùng AI đúng, hãy bắt đầu từ bức tranh thật của phòng thay vì từ phỏng đoán.",
      formula: "Phiếu ẩn danh ba câu → bảng ba cột (việc, tần suất, dữ liệu) → nhóm an toàn và nhóm cần bàn → quy tắc.",
      commonMistake: "Dùng phiếu khảo sát để truy ra người vi phạm, khiến lần sau không ai dám khai thật.",
      action: "Soạn ba câu hỏi ẩn danh về việc dùng AI trong phòng bạn và gửi đi trong tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Soạn phiếu ba câu cho nhóm của bạn (việc dùng AI vào, bao lâu một lần, loại thông tin đã đưa vào) và gửi bằng một biểu mẫu không ghi tên. Khi có câu trả lời đầu tiên, chép vào bảng ba cột: việc, tần suất, loại dữ liệu. Ngày mai bạn sẽ được hỏi: phiếu đã gửi chưa và bảng có mấy dòng?",
      secondary: "Viết một câu hứa ẩn danh ngay đầu phiếu, ví dụ 'kết quả chỉ dùng để soạn hướng dẫn, không để tìm người'.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai tuần trước, bạn thấy đồng nghiệp gõ gì đó vào một cửa sổ chat, rồi bản tóm tắt cuộc họp xuất hiện chỉ sau hai phút. Không ai nói gì. Bài này giúp bạn hỏi cả phòng một cách an toàn để thấy bức tranh thật.",
      },
      {
        type: "feynman",
        title: "Khảo sát việc dùng AI đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc người quản lý toà nhà muốn biết cư dân hay đi lối nào. Hỏi từng người 'bạn có đi lối cấm không' thì ai cũng nói không. Còn hộp góp ý không ghi tên, hoặc đứng đếm lượt qua lại, thì ra lối nào đông thật. Khảo sát ẩn danh làm đúng việc đó.",
        columns: ["Thành phần", "Toà nhà", "Phòng của bạn"],
        rows: [
          ["Người được hỏi", "Cư dân", "Đồng nghiệp trong phòng"],
          ["Cách hỏi để được nghe sự thật", "Hộp góp ý không ghi tên", "Biểu mẫu không yêu cầu tên"],
          ["Thứ cần biết", "Lối nào đông, lối nào nguy hiểm", "Việc nào dùng AI, việc nào chạm dữ liệu nhạy cảm"],
          ["Dùng kết quả để làm gì", "Đặt biển và gờ giảm tốc", "Soạn quy tắc và hướng dẫn"],
        ],
        oneLiner: "Muốn biết người ta thật sự làm gì, hãy hỏi theo cách không ai sợ bị nhắc tên.",
      },
      { type: "heading", text: "Vì sao người ta dùng lén" },
      {
        type: "paragraph",
        text: "Người dùng AI một mình thường không cố làm điều xấu. Họ thấy việc xong nhanh hơn, và sợ rằng nói ra sẽ bị cấm hoặc bị nghĩ là lười. Kết quả là cả phòng cùng dùng nhưng mỗi người một cách, không ai nhắc ai che tên khách hay số tiền trước khi dán. Bạn không thể quản một thứ mình chưa nhìn thấy.",
      },
      {
        type: "flow",
        title: "Từ một phiếu hỏi tới bảng ba cột",
        steps: [
          { label: "Viết lời hứa ẩn danh", detail: "Ghi ngay đầu phiếu: kết quả chỉ dùng để soạn hướng dẫn cho cả phòng, không để tìm người. Đừng thu tên, đừng hỏi giờ hay máy." },
          { label: "Hỏi ba câu ngắn", detail: "Bạn đã dùng AI vào việc gì? Bao lâu một lần? Đã từng đưa loại thông tin nào vào (số liệu khách, hợp đồng, bảng lương, chỉ là chữ chung chung)?" },
          { label: "Gom vào bảng ba cột", detail: "Một dòng mỗi việc: việc, tần suất, loại dữ liệu. Các câu giống nhau gộp một dòng, câu khó nghe vẫn giữ nguyên." },
          { label: "Tô hai nhóm", detail: "Nhóm không chạm dữ liệu riêng tư (viết lại email chung chung) và nhóm có chạm (khách, lương, hợp đồng). Nhóm thứ hai là chỗ quy tắc phải nói rõ." },
          { label: "Chia sẻ lại bảng cho cả phòng", detail: "Cho mọi người thấy kết quả tổng. Khi người ta thấy khảo sát dẫn tới hướng dẫn hữu ích thay vì trách phạt, lần sau họ còn trả lời thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn phiếu hỏi ẩn danh và khung bảng",
        task: "Bạn cần một phiếu ba câu cho phòng mười hai người và một khung bảng ba cột. Lắp prompt để AI soạn đúng thứ bạn cần, mà không biến phiếu thành công cụ truy người.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích nói với đồng nghiệp",
            options: [
              { text: "Phiếu này để rà soát xem ai đang vi phạm quy định dùng AI.", feedback: "Mục đích 'rà soát vi phạm' khiến người ta khai thiếu hoặc không khai, và bạn nhận về toàn câu trả lời an toàn." },
              { text: "Phiếu này chỉ để hiểu phòng đang dùng AI vào việc gì, nhằm soạn hướng dẫn giúp đỡ, không ghi tên.", good: true, feedback: "Mục đích rõ và có lời hứa ẩn danh: người trả lời hiểu câu trả lời thật sẽ được dùng để giúp họ." },
            ],
          },
          {
            id: "questions",
            label: "Kiểu câu hỏi",
            options: [
              { text: "Hỏi ba câu có ô chọn sẵn: việc làm, tần suất, loại thông tin đã đưa vào.", good: true, feedback: "Ô chọn sẵn trả lời trong một phút và dễ gom thành bảng, nên nhiều người điền hơn." },
              { text: "Hỏi mười hai câu tự luận để mọi người kể chi tiết cảm nhận về AI.", feedback: "Quá dài nên ít người điền hết, và câu tự luận khó gom thành bảng so sánh." },
            ],
          },
          {
            id: "table",
            label: "Khung bảng kết quả",
            options: [
              { text: "Bảng ba cột: việc làm, tần suất, loại dữ liệu; một dòng mỗi việc.", good: true, feedback: "Đúng ba thứ quy tắc cần biết và không có cột nào gắn với tên người." },
              { text: "Bảng bốn cột: tên người, phòng ban, công cụ đã dùng, ngày điền phiếu.", feedback: "Cột tên người phá cam kết ẩn danh, còn công cụ và ngày điền không cho biết rủi ro nằm ở đâu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "questions", "table"],
            text: "Phiếu (ẩn danh, một phút):\n\nCâu 1. Bạn đã dùng AI vào việc gì? (viết lại email / tóm tắt tài liệu / chỉnh bảng số / việc khác)\nCâu 2. Bao lâu một lần? (hằng ngày / hằng tuần / hiếm khi)\nCâu 3. Bạn đã từng đưa loại thông tin nào vào? (chỉ chữ chung chung / tên và số liệu khách / hợp đồng / bảng lương / không chắc)\n\nKhung bảng: | Việc làm | Tần suất | Loại dữ liệu |",
          },
          {
            requires: ["purpose"],
            text: "Phiếu hỏi: 1. Bạn thấy AI hữu ích đến mức nào? 2. Bạn nghĩ công ty nên làm gì? ... (mười hai câu cảm nhận)\n\n(Giọng thân thiện nhưng phiếu dài, toàn cảm nhận nên không đủ để gom bảng việc và dữ liệu.)",
          },
          {
            text: "Kết quả khảo sát cho thấy 85% nhân viên đã vi phạm quy định, tập trung ở phòng Kế toán và nhóm của anh Hùng...\n\n(Số liệu và tên người do AI bịa ra vì prompt không cho nó dữ kiện thật, còn phiếu thì truy người.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Khảo sát ẩn danh để hiểu",
          text: "Người ta khai việc thật và loại dữ liệu đã đưa vào. Bạn thấy nhóm việc phổ biến và nhóm cần quy tắc. Sau đó có hướng dẫn cụ thể, và lần khảo sát sau người ta vẫn trả lời thật.",
        },
        right: {
          label: "Kiểm tra để bắt lỗi",
          text: "Người ta sợ nên khai ít hoặc không khai, việc dùng lén đi sâu hơn. Bạn chỉ thấy phần nhỏ của thực tế. Quy tắc viết ra dựa trên phần nhìn thấy và sẽ lệch với việc thật.",
        },
      },
      {
        type: "callout",
        label: "Một cam kết phải giữ",
        text: "Nếu phiếu ghi ẩn danh thì đừng tìm cách đoán người điền, kể cả khi có một dòng nghe rất đáng lo. Điều đó có thể xử lý bằng quy tắc và hướng dẫn cho cả phòng. Nếu thật sự có dữ liệu khách hàng bị lộ, báo người phụ trách bảo mật hoặc pháp chế để họ quyết định bước tiếp.",
      },
      {
        type: "scenario",
        title: "Kết quả phiếu đầu tiên về tay bạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Mười một trên mười hai người đã điền phiếu. Có một dòng: 'Dán danh sách khách và số điện thoại để nhờ AI chia nhóm gọi điện.' Sếp nhắn: 'Cho anh xem kết quả.'",
            choices: [
              { label: "Đưa sếp bảng tổng hợp ba cột, nhấn mạnh nhóm việc dùng dữ liệu khách", next: "s2" },
              { label: "Xuất toàn bộ câu trả lời thô kèm giờ điền phiếu gửi sếp", next: "bad_raw" },
            ],
          },
          bad_raw: {
            text: "Sếp nhìn giờ điền và đoán ra ngay người dán danh khách. Sau đó chính người đó bị gọi lên nhắc nhở. Cả phòng biết chuyện, lần khảo sát sau chỉ còn ba người điền.",
            ending: "bad",
          },
          s2: {
            text: "Sếp xem bảng và hỏi: 'Vậy ai dán danh khách? Anh muốn nói riêng.'",
            choices: [
              { label: "Nói rằng phiếu đã hứa ẩn danh, và đề xuất đưa việc này vào quy tắc kèm cách che số điện thoại", next: "good" },
              { label: "Đưa ra một cái tên mà bạn đoán vì người đó hay làm việc với danh sách khách", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Bạn đoán sai người. Người bị nhắc oan buồn bực, còn người thật sự dán danh vẫn chưa biết đó là việc cần tránh.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý. Tuần sau phòng có một tờ hướng dẫn ngắn về việc che tên và số điện thoại trước khi nhờ AI. Khi phiếu thứ hai được gửi đi, cả mười hai người đều điền.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết lời hứa ẩn danh và mục đích 'để giúp, không để tìm người' lên đầu phiếu.",
          "Bước 2 - Hỏi ba câu: việc gì, bao lâu một lần, đã đưa loại thông tin nào vào.",
          "Bước 3 - Gom câu trả lời vào bảng ba cột, giữ cả dòng khó nghe.",
          "Bước 4 - Tô nhóm việc có chạm dữ liệu riêng tư để đưa vào quy tắc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Quy tắc tốt bắt đầu bằng việc lắng nghe cách phòng bạn đang thật sự làm việc.",
          "Bài sau: ba đường thông tin công ty có thể đi ra ngoài khi ai đó dùng AI.",
        ],
      },
    ],
  },
  {
    id: 2681,
    slug: "ba-cach-chuyen-thong-tin-cong-ty-ra-ngoai-qua-cong-cu-ai",
    title: "Chặng 64, Bài 2: Ba đường thông tin công ty đi ra ngoài qua công cụ AI",
    subtitle: "Dán, tải lên, kết nối: biết thông tin rời công ty bằng đường nào thì mới chặn đúng chỗ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🚪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một bản hợp đồng nội bộ không 'bay' ra ngoài một cách bí ẩn. Nó đi theo những đường rất cụ thể mà ai cũng có thể vẽ ra: ai đó dán một đoạn, tải cả tệp lên, hay cho một ứng dụng quyền đọc hộp thư. Khi bạn vẽ được ba đường này, mọi quy tắc sau đó sẽ nhắm đúng chỗ thay vì cấm lung tung.",
    openingQuestion:
      "Bạn dán một đoạn hợp đồng có tên khách và giá vào ô chat của một công cụ AI để nhờ tóm tắt. Thông tin đó đã đi theo đường nào?",
    openingOptions: [
      "Đường dán trực tiếp: nội dung rời máy bạn ngay khi bạn gửi",
      "Đường kết nối, vì công cụ AI luôn tự đọc được tệp trong máy bạn",
      "Không đường nào cả, vì dán vào ô chat là chuyện riêng của bạn",
      "Đường tải lên, vì mọi nội dung gửi đi đều gọi là tải tệp lên",
    ],
    correctOption: 0,
    explanation:
      "Đoạn chữ bạn dán được gửi tới dịch vụ của bên cung cấp ngay lúc bạn bấm gửi, nên đó là đường dán trực tiếp. Công cụ AI không tự đọc tệp trong máy bạn mà chỉ thấy thứ bạn đưa hoặc cho phép. Dán vào ô chat không phải chuyện riêng vì nội dung đã rời khỏi máy bạn. Tải tệp lên là một đường khác, khi bạn đính kèm cả tài liệu.",
    diagram: [
      { label: "Đường dán: chữ được gửi đi ngay khi bấm", arrow: true },
      { label: "Đường tải lên: cả tệp đi, gồm phần bạn không để ý", arrow: true },
      { label: "Đường kết nối: ứng dụng được cấp quyền đọc hộp thư, ổ đĩa", arrow: true },
      { label: "Mỗi đường cần một cách chặn hoặc kiểm riêng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên bán hàng tải lên một tệp Excel 40 cột để nhờ AI vẽ biểu đồ doanh số. Anh chỉ cần hai cột, nhưng tệp còn có cột điện thoại khách và cột chiết khấu đặc biệt. Cả tệp đã đi ra ngoài. Nếu anh chỉ chép hai cột cần thiết sang một tệp mới thì điện thoại và chiết khấu không rời khỏi công ty.",
    },
    quiz: [
      {
        question: "Đường nào sau đây là đường 'tải lên' chứ không phải đường 'dán'?",
        options: [
          "Đính kèm cả tệp Excel vào ô chat để AI đọc",
          "Bôi đen một đoạn email rồi dán vào ô chat để AI đọc tiếp",
          "Gõ lại bằng tay vài dòng số liệu vào khung nhập",
          "Cho ứng dụng thêm vào thư mục chung để tự đồng bộ",
        ],
        correct: 0,
        explanation:
          "Tải lên nghĩa là cả tệp đi, kể cả những cột, trang và ghi chú bạn không nhìn tới. Bôi đen rồi dán và gõ tay đều là đường dán, vì chỉ có phần chữ bạn chọn đi ra. Ứng dụng tự đồng bộ thư mục là đường kết nối, vì nó có quyền đọc lâu dài thay vì một lần gửi.",
      },
      {
        question: "Vì sao đường 'kết nối' thường khó để ý hơn hai đường kia?",
        options: [
          "Quyền được cấp một lần, sau đó ứng dụng đọc được mà bạn không thấy",
          "Vì đường kết nối chỉ dùng được cho nhân viên cấp quản lý",
          "Vì dữ liệu đi qua đường kết nối luôn được mã hoá hoàn toàn",
          "Vì kết nối xảy ra tự động ở tầng mạng, không cần ai cho phép",
        ],
        correct: 0,
        explanation:
          "Khi bạn bấm đồng ý cấp quyền, ứng dụng có thể đọc hộp thư hay ổ đĩa về sau mà không hỏi lại. Đường dán và tải lên thì mỗi lần đi ra là một hành động bạn thấy rõ. Kết nối không bị giới hạn theo chức vụ, mã hoá không đồng nghĩa với an toàn về việc ai được đọc, và nó vẫn cần một người cấp quyền.",
      },
      {
        question: "Bạn chỉ cần AI vẽ biểu đồ từ hai cột trong tệp có 40 cột. Cách nào giảm thông tin đi ra ngoài nhiều nhất?",
        options: [
          "Chép hai cột cần dùng sang tệp mới rồi mới đưa cho AI",
          "Tải cả tệp lên rồi dặn AI chỉ được dùng hai cột cần thiết",
          "Tải cả tệp lên và xoá tệp khỏi cuộc trò chuyện ngay sau khi xong",
          "Đổi tên tệp cho khó đoán rồi tải lên như bình thường, để không ai nhận ra",
        ],
        correct: 0,
        explanation:
          "Thứ chưa rời khỏi máy thì không thể lộ. Dặn AI chỉ dùng hai cột không thay đổi việc cả tệp đã được gửi đi. Xoá tệp khỏi cuộc trò chuyện sau khi xong không đảm bảo nội dung đã biến mất khỏi nơi bên cung cấp đã nhận, việc đó cần xem chính sách của họ. Đổi tên tệp không ảnh hưởng gì tới nội dung.",
      },
      {
        question: "Đồng nghiệp hỏi: 'Tôi dùng tài khoản cá nhân thay vì tài khoản công ty thì có sao không?' Điều gì đúng nhất?",
        options: [
          "Thông tin công ty vẫn đi ra ngoài, và công ty mất khả năng quản",
          "Không sao vì tài khoản cá nhân bảo mật hơn tài khoản công ty",
          "Không sao miễn là bạn xoá lịch sử trò chuyện vào cuối ngày làm việc của mình",
          "Có sao, vì tài khoản cá nhân không dùng được cho việc công ty",
        ],
        correct: 0,
        explanation:
          "Đổi tài khoản không đổi đường đi: nội dung vẫn rời công ty, nhưng còn mất luôn chỗ để công ty đặt cài đặt và điều khoản riêng. Tài khoản cá nhân không mặc nhiên an toàn hơn. Xoá lịch sử trên màn hình không nói gì về việc bên cung cấp đã lưu gì. Và không có quy luật kỹ thuật cấm dùng tài khoản cá nhân, chỉ là việc đó đặt công ty ra ngoài vòng kiểm soát.",
      },
      {
        question: "Bạn muốn vẽ 'đường đi' của một tài liệu nội bộ cho cả phòng xem. Sơ đồ nào hữu ích nhất?",
        options: [
          "Tài liệu, ba đường ra (dán, tải lên, kết nối), điểm nên chặn ở mỗi đường",
          "Danh sách tất cả công cụ AI trên thị trường xếp theo thứ tự chữ cái",
          "Sơ đồ tổ chức công ty, gạch chân người có quyền duyệt tài liệu",
          "Bảng so sánh giá các gói dịch vụ AI dành cho doanh nghiệp, theo từng tháng và từng năm",
        ],
        correct: 0,
        explanation:
          "Sơ đồ có điểm xuất phát, ba đường và chỗ chặn cho người xem hiểu phải làm gì ở từng bước. Danh sách công cụ theo chữ cái không nói gì về đường đi của thông tin. Sơ đồ tổ chức cho biết ai duyệt nhưng không cho biết thông tin đi đâu. Bảng giá là chuyện mua sắm và không dẫn tới hành động an toàn nào.",
      },
    ],
    keyTakeaways: [
      "Thông tin ra ngoài theo ba đường: dán, tải lên, kết nối.",
      "Tải cả tệp lên đưa đi nhiều hơn điều bạn định đưa.",
      "Kết nối là quyền cấp một lần nhưng đọc được lâu dài.",
      "Giữ thứ không cần thiết ở lại máy: chép phần cần dùng sang tệp mới.",
      "Đổi sang tài khoản cá nhân không làm thông tin ở lại công ty.",
    ],
    practicePrompt: {
      question:
        "Chị Hà cần AI soạn email từ một báo giá PDF 12 trang, trong đó chỉ có trang 2 là cần. Cách nào giữ thông tin ở lại nhiều nhất?",
      options: [
        "Chép các dòng cần dùng từ trang 2 ra, xoá tên khách rồi dán",
        "Tải cả PDF 12 trang lên công cụ rồi nhờ AI chỉ đọc trang 2 thôi",
        "Cho công cụ quyền đọc thư mục chứa PDF để nó tự tìm trang đúng",
        "Dán cả nội dung 12 trang vì AI sẽ tự biết phần nào liên quan",
      ],
      correct: 0,
      explanation:
        "Chỉ phần bạn chép ra mới rời khỏi công ty, và xoá tên khách bớt thêm một lớp nữa. Tải cả PDF đưa đi cả 12 trang dù AI chỉ đọc một trang. Cấp quyền cho cả thư mục mở rộng đường kết nối ra nhiều hơn. Dán cả 12 trang cũng đưa ra nhiều hơn mức cần.",
    },
    summary: {
      keyIdea: "Thông tin công ty đi ra ngoài qua ba đường cụ thể, và mỗi đường có cách chặn riêng.",
      formula: "Dán (chữ đi ngay) + Tải lên (cả tệp đi) + Kết nối (quyền đọc kéo dài) = ba đường cần vẽ ra.",
      commonMistake: "Tải cả tệp lên trong khi chỉ cần một phần nhỏ, rồi cho rằng dặn AI 'chỉ dùng phần đó' là đủ.",
      action: "Chọn một tài liệu nội bộ bạn hay dùng và vẽ đường đi của nó qua ba đường trên một tờ giấy.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu bạn đã hoặc có thể đưa cho AI (báo giá, bảng số, hợp đồng mẫu). Trên một tờ giấy, vẽ một ô 'tài liệu', rồi ba mũi tên ra: dán, tải lên, kết nối. Dưới mỗi mũi tên ghi một việc bạn sẽ làm để chỉ đưa ra phần cần thiết. Ngày mai bạn sẽ được hỏi: bạn đã chọn tài liệu nào và mũi tên nào đáng lo nhất?",
      secondary: "Gạch chân cột, trang hoặc đoạn nào trong tài liệu bạn tuyệt đối không muốn rời khỏi công ty.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Năm, bạn cần một bản tóm tắt hợp đồng trước khi họp. Có ba cách gửi nó cho AI, và mỗi cách đưa đi một lượng thông tin khác nhau. Bài này dạy bạn vẽ ba đường đó ra giấy.",
      },
      {
        type: "feynman",
        title: "Ba đường thông tin đi ra đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc gửi đồ cho một người bạn ở xa. Bạn có thể đọc to qua điện thoại một đoạn (dán), gửi nguyên một phong bì (tải lên), hoặc đưa chìa khoá nhà để bạn tự vào lấy (kết nối). Lượng đồ đi ra và mức độ bạn kiểm soát khác nhau hoàn toàn.",
        columns: ["Cách gửi", "Đời thường", "Với công cụ AI"],
        rows: [
          ["Đọc một đoạn qua điện thoại", "Chỉ phần bạn đọc được nghe", "Dán: chỉ phần chữ bạn chọn đi ra"],
          ["Gửi nguyên phong bì", "Cả phong bì đi, kể cả tờ giấy kẹp bên trong", "Tải lên: cả tệp đi, kể cả cột và trang bạn quên"],
          ["Đưa chìa khoá nhà", "Người kia vào lúc nào cũng được", "Kết nối: ứng dụng đọc hộp thư hay ổ đĩa lâu dài"],
          ["Cách giảm rủi ro", "Chỉ đưa thứ cần thiết, lấy lại chìa khi xong", "Chỉ đưa phần cần, cấp quyền hẹp, thu lại khi không dùng"],
        ],
        oneLiner: "Dán, tải lên, kết nối: đường nào cũng có cách đưa ít hơn thứ bạn định đưa.",
      },
      { type: "heading", text: "Đường một: dán" },
      {
        type: "paragraph",
        text: "Đây là đường quen thuộc nhất: bạn bôi đen một đoạn rồi dán vào ô chat. Chỉ phần chữ đó đi ra, nên bạn kiểm soát được bằng cách chọn đoạn nào và che tên hay số nào trước khi dán. Nhược điểm là nó quá dễ, nên người ta dán mà không nghĩ.",
      },
      { type: "heading", text: "Đường hai và ba: tải lên, kết nối" },
      {
        type: "paragraph",
        text: "Tải lên đưa cả tệp đi, bao gồm cột ẩn, ghi chú bên lề và các trang bạn chưa mở. Kết nối thì khác: bạn cấp quyền cho một ứng dụng đọc hộp thư, lịch hay ổ đĩa, và quyền đó còn hiệu lực những ngày sau đó. Hai đường này đưa ra nhiều hơn, nên cần tự hỏi 'có thể đưa ít hơn không' trước khi làm.",
      },
      {
        type: "flow",
        title: "Đường đi của một tài liệu nội bộ",
        steps: [
          { label: "Tài liệu nằm trong công ty", detail: "Một hợp đồng mẫu, một bảng doanh số hay một báo giá. Ở đây nó chịu sự quản lý của công ty: ai truy cập, ai sao chép." },
          { label: "Bạn quyết định đưa cho AI", detail: "Đây là điểm bạn có nhiều quyền nhất. Hỏi: AI cần phần nào, và phần đó có thể làm gọn bớt không?" },
          { label: "Chọn một trong ba đường", detail: "Dán một đoạn, tải cả tệp, hoặc cấp quyền kết nối. Mỗi lựa chọn đưa ra một lượng khác nhau và để lại dấu vết khác nhau." },
          { label: "Nội dung tới dịch vụ bên ngoài", detail: "Từ lúc này, việc nó được lưu bao lâu, ai xem và có dùng để cải thiện dịch vụ hay không phụ thuộc điều khoản của bên cung cấp, không còn do bạn quyết định." },
          { label: "Kết quả quay về bạn", detail: "Bạn nhận một bản tóm tắt, nhưng phần tài liệu đã đi ra thì không 'rút lại' được chỉ bằng việc xoá cuộc trò chuyện." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đưa phần cần dùng",
          text: "Chép hai cột cần thiết ra tệp mới, xoá tên khách, dán đoạn đã làm gọn. Phần còn lại ở nguyên trong công ty. Nếu có sự cố, phạm vi thiệt hại nhỏ và bạn biết chính xác cái gì đã đi.",
        },
        right: {
          label: "Đưa nguyên tài liệu",
          text: "Tải cả tệp hay cấp quyền cả thư mục. Nhanh hơn một chút, nhưng mang theo phần bạn không để ý như cột điện thoại hay trang phụ lục. Khó nói chính xác cái gì đã rời công ty.",
        },
      },
      {
        type: "callout",
        label: "Với cả ba đường",
        text: "Công ty nào cũng có chính sách riêng về dữ liệu, và bên cung cấp công cụ có điều khoản riêng về việc họ lưu hay dùng nội dung. Bạn không cần thuộc hết. Chỉ cần biết việc đó tồn tại, và hỏi người phụ trách bảo mật hay pháp chế khi chưa rõ.",
      },
      {
        type: "scenario",
        title: "Tóm tắt hợp đồng trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có hợp đồng mẫu 20 trang, trong đó có tên khách, giá và điều khoản phạt. Sếp muốn bản tóm tắt một trang trong 30 phút. Bạn mở công cụ AI.",
            choices: [
              { label: "Tải cả 20 trang lên và nhờ AI tóm tắt luôn", next: "bad_upload" },
              { label: "Chọn các điều khoản cần tóm tắt, thay tên khách bằng 'Bên B', rồi dán", next: "s2" },
            ],
          },
          bad_upload: {
            text: "Bản tóm tắt ra nhanh. Nhưng cả tên khách, giá và điều khoản phạt đã rời khỏi công ty. Hôm sau pháp chế hỏi tại sao hợp đồng mẫu có mặt trong công cụ bên ngoài và bạn không trả lời được nó đã đi đâu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đã dán bốn điều khoản đã thay tên. AI trả về bản tóm tắt. Trong bản tóm tắt có một số tiền phạt nghe khá chi tiết.",
            choices: [
              { label: "Chép thẳng vào tài liệu họp vì tóm tắt từ chính điều khoản mà", next: "bad_check" },
              { label: "Đối chiếu số tiền phạt với hợp đồng gốc rồi mới dùng", next: "good" },
            ],
          },
          bad_check: {
            text: "Con số AI ghi lệch một chữ số so với hợp đồng. Sếp đọc to trong cuộc họp và phía khách chỉ ra sai sót ngay trước mặt mọi người.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy con số AI ghi sai một chữ số và sửa lại. Bản tóm tắt vào cuộc họp đúng, và không có tên khách hay giá nào rời khỏi công ty.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xác định tài liệu và phần AI thực sự cần.",
          "Bước 2 - Chọn đường ít đưa nhất: dán phần cần, thay tên bằng ký hiệu.",
          "Bước 3 - Chỉ tải tệp lên khi không còn cách nào khác, và đã làm gọn trước.",
          "Bước 4 - Cấp quyền kết nối hẹp và thu lại khi không còn dùng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Biết thông tin đi ra bằng đường nào là nửa đường để giữ nó ở lại.",
          "Bài sau: vì sao cấm tất cả hay cho tất cả đều thất bại.",
        ],
      },
    ],
  },
  {
    id: 2682,
    slug: "cam-tat-ca-hay-cho-tat-ca-vi-sao-ca-hai-deu-that-bai",
    title: "Chặng 64, Bài 3: Cấm tất cả hay cho tất cả: vì sao cả hai đều thất bại",
    subtitle: "Cấm hết thì người ta dùng lén, mở hết thì không ai chịu trách nhiệm. Lối giữa là gì?",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi sếp nghe một chuyện đáng sợ về AI, phản xạ đầu tiên thường là 'cấm hết cho an toàn'. Phía bên kia, có người lại nói 'cứ để mọi người tự do cho nhanh'. Bạn có thể là người giúp sếp thấy lối giữa, nhưng phải có lý lẽ rõ ràng thay vì chỉ nói 'cấm là không hay'.",
    openingQuestion:
      "Sếp nói: 'Sau vụ việc bên công ty khác, anh muốn cấm toàn bộ nhân viên dùng AI.' Điều gì nhiều khả năng xảy ra nhất sau lệnh cấm?",
    openingOptions: [
      "Người ta vẫn dùng, nhưng lén, trên máy cá nhân và không ai nhắc ai cẩn thận",
      "Mọi người ngừng dùng hoàn toàn và rủi ro biến mất sau một ngày",
      "Nhân viên chuyển sang làm tay và năng suất giữ nguyên như cũ",
      "Rủi ro tăng nhưng chỉ ở những người vốn không tuân thủ quy định",
    ],
    correctOption: 0,
    explanation:
      "Khi việc dùng AI giúp xong việc nhanh hơn rõ rệt, lệnh cấm không xoá nhu cầu mà chỉ đẩy nó ra khỏi tầm nhìn: máy cá nhân, điện thoại, không ai hướng dẫn cách che thông tin. Rủi ro không biến mất sau một ngày. Làm tay thì chậm hơn nên năng suất không giữ nguyên. Và người tuân thủ tốt vẫn có thể dùng lén khi bị deadline ép.",
    diagram: [
      { label: "Cấm tất cả: việc dùng AI đi vào chỗ tối", arrow: true },
      { label: "Cho tất cả: mọi người tự quyết, không ai chịu trách nhiệm", arrow: true },
      { label: "Lối giữa: việc rõ ràng được làm, việc rủi ro cần người duyệt", arrow: true },
      { label: "Đo lại sau vài tuần để chỉnh quy tắc cho hợp thực tế" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng nhân sự bị cấm dùng công cụ AI. Sau hai tháng, một nhân viên thú nhận đã dùng công cụ trên điện thoại cá nhân để soạn tin tuyển dụng, vì việc đó giúp chị kịp hạn. Trên điện thoại cá nhân, chị không có tài khoản được công ty cấu hình, cũng không ai dặn chị không dán thông tin ứng viên. Sếp quyết định đổi lệnh cấm thành danh sách 'được làm, cần hỏi, không bao giờ làm'.",
    },
    quiz: [
      {
        question: "Vì sao lệnh cấm hoàn toàn thường không giải quyết được vấn đề?",
        options: [
          "Nhu cầu vẫn còn nên việc dùng chuyển sang chỗ không ai thấy",
          "Vì luật pháp không cho phép công ty cấm nhân viên dùng công cụ",
          "Vì công cụ AI quá nhiều nên không cấm hết được từng cái",
          "Vì nhân viên luôn cố tình chống đối mọi lệnh của cấp trên",
        ],
        correct: 0,
        explanation:
          "Lệnh cấm không làm mất lý do người ta dùng. Họ vẫn cần xong việc nhanh, nên việc dùng chuyển vào chỗ không ai hướng dẫn. Đây không phải chuyện pháp luật, cũng không phải nhân viên chống đối, mà là họ phản ứng với áp lực công việc. Số lượng công cụ chỉ làm lệnh khó theo dõi hơn, không phải nguyên nhân gốc.",
      },
      {
        question: "Vì sao 'ai muốn dùng gì thì dùng' cũng là lối thất bại?",
        options: [
          "Không ai biết việc nào đã đưa dữ liệu ra ngoài nên không ai chịu trách nhiệm",
          "Vì khi ai cũng được dùng, công cụ AI sẽ chạy chậm hơn cho mọi người",
          "Vì nhân viên sẽ tốn quá nhiều thời gian chọn công cụ thay vì làm việc",
          "Vì công ty sẽ phải trả tiền cho mọi công cụ mà nhân viên đã thử",
        ],
        correct: 0,
        explanation:
          "Khi mỗi người tự quyết mà không có quy tắc, có sự cố thì không ai biết cái gì đã đi ra, ai làm, và ai phải xử lý. Công cụ chạy chậm hay tốn thời gian chọn là vấn đề phụ. Việc công ty phải trả tiền cho mọi thứ là giả định không có cơ sở vì đa số công cụ nhân viên tự dùng là tài khoản cá nhân.",
      },
      {
        question: "Bạn trình bày 'lối giữa' với sếp. Câu nào tóm tắt đúng nhất?",
        options: [
          "Cho làm việc an toàn, hỏi trước với việc có rủi ro, cấm hẳn việc không bao giờ được làm",
          "Cho dùng thoải mái một tháng, sau đó xem có sự cố nào không rồi mới cấm",
          "Chỉ cho một nhóm nhỏ dùng AI và giữ bí mật để nhóm khác không biết, còn nhóm khác thì chờ thông báo sau",
          "Cấm AI trong giờ làm nhưng cho dùng ngoài giờ trên máy cá nhân",
        ],
        correct: 0,
        explanation:
          "Lối giữa chia việc theo mức rủi ro: làm ngay, hỏi trước, và không bao giờ. Dùng thoải mái một tháng rồi mới xem là chờ sự cố xảy ra. Giữ bí mật một nhóm tạo ra sự không công bằng và không giải quyết nhu cầu của phần còn lại. Cho dùng ngoài giờ trên máy cá nhân đẩy đúng rủi ro ra khỏi tầm quản lý.",
      },
      {
        question: "Sếp phản đối: 'Cho dùng rồi lỡ lộ dữ liệu thì ai chịu?' Câu trả lời nào thuyết phục nhất?",
        options: [
          "Quy tắc ghi rõ việc không bao giờ được làm và việc cần người duyệt, nên có người chịu từng khâu",
          "Mọi công cụ AI hiện nay đều an toàn tuyệt đối nên sếp không cần lo",
          "Nếu lộ thì nhân viên là người chịu hoàn toàn vì họ đã tự dán, và công ty không liên quan gì tới chuyện đó nữa cả",
          "Lỡ lộ thì công ty mua bảo hiểm, nên rủi ro đã được tính sẵn rồi",
        ],
        correct: 0,
        explanation:
          "Sếp lo vì không có người chịu trách nhiệm, nên câu trả lời phải chỉ ra quy tắc và khâu duyệt. Nói công cụ an toàn tuyệt đối là lời hứa không ai làm được. Đổ hết cho nhân viên khi công ty chưa hề có quy tắc là không công bằng. Và bảo hiểm cụ thể ra sao là điều bạn không biết, không nên khẳng định.",
      },
      {
        question: "Sau ba tuần áp dụng lối giữa, bạn nên kiểm điều gì để biết nó có hiệu quả không?",
        options: [
          "Số yêu cầu xin hỏi tăng lên và số lần dùng lén giảm đi",
          "Số lần nhân viên bấm vào trang hướng dẫn",
          "Số từ trong bản quy tắc có giữ ở dưới một trang hay không",
          "Số công cụ AI mới ra thị trường trong ba tuần vừa qua trên khắp thế giới",
        ],
        correct: 0,
        explanation:
          "Quy tắc tốt làm người ta chịu hỏi thay vì âm thầm làm. Lượt bấm vào trang hướng dẫn chỉ cho thấy người ta xem chứ chưa phải họ làm đúng. Độ dài bản quy tắc là chuyện hình thức. Số công cụ mới ra không liên quan gì tới việc quy tắc của phòng bạn có hiệu quả hay không.",
      },
    ],
    keyTakeaways: [
      "Cấm hoàn toàn đẩy việc dùng AI ra khỏi tầm nhìn chứ không xoá nó.",
      "Cho tất cả khiến khi có sự cố không ai biết cái gì đã đi ra.",
      "Lối giữa chia việc thành ba nhóm: làm ngay, hỏi trước, không bao giờ.",
      "Trình bày với sếp bằng câu hỏi sếp lo: ai chịu trách nhiệm từng khâu.",
      "Đo hiệu quả bằng việc người ta chịu hỏi, không bằng số người bị bắt.",
    ],
    practicePrompt: {
      question:
        "Sếp nói: 'Chúng ta cứ cấm hết một thời gian, khi nào rõ hơn sẽ mở lại.' Đề xuất nào vừa tôn trọng lo lắng của sếp vừa tránh dùng lén?",
      options: [
        "Cho làm ngay một nhóm việc không chạm dữ liệu riêng, cấm hẳn nhóm còn lại",
        "Giữ lệnh cấm nguyên vẹn và tăng phạt với ai bị phát hiện dùng AI",
        "Bỏ lệnh cấm vì khó kiểm soát và để mỗi người tự chịu trách nhiệm",
        "Hỏi từng nhân viên có đang dùng AI không và chỉ cho người thật thà dùng tiếp",
      ],
      correct: 0,
      explanation:
        "Bắt đầu từ nhóm việc rủi ro rất thấp, như viết lại email không có tên khách, cho sếp thấy mở từng bước có kiểm soát. Tăng phạt làm người ta giấu kỹ hơn. Bỏ lệnh cấm mà không có quy tắc là rơi vào lối cho tất cả. Hỏi từng người rồi thưởng cho người thật thà khiến những người còn lại càng im lặng.",
    },
    summary: {
      keyIdea: "Cấm tất cả và cho tất cả đều bỏ trống chỗ cần quy tắc: việc nào làm ngay, việc nào hỏi trước, việc nào không bao giờ.",
      formula: "Cấm hết = dùng lén. Cho hết = không ai chịu trách nhiệm. Chia theo mức rủi ro = có người chịu từng khâu.",
      commonMistake: "Phản xạ ra lệnh cấm sau một tin đáng sợ, rồi ngạc nhiên khi việc dùng vẫn tiếp diễn ở chỗ không ai thấy.",
      action: "Chuẩn bị ba câu để trình bày lối giữa với sếp, mỗi câu trả lời một nỗi lo của sếp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một đoạn ngắn để trình bày với sếp hoặc trưởng nhóm của bạn. Đoạn gồm ba phần: một câu nói vì sao cấm hết sẽ đẩy việc dùng vào chỗ tối, một câu nói vì sao để tự do sẽ không ai chịu trách nhiệm, và ba ví dụ thật của phòng bạn cho nhóm việc 'làm ngay'. Ngày mai bạn sẽ được hỏi: đoạn đã viết chưa và ba ví dụ là gì?",
      secondary: "Ghi thêm một câu hỏi mà bạn đoán sếp sẽ hỏi lại, và câu trả lời của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay sếp bước vào phòng và nói muốn cấm AI sau một chuyện nghe rất đáng sợ ở công ty khác. Bạn biết nửa phòng đang dùng. Bài này giúp bạn trình bày lối giữa mà sếp nghe được.",
      },
      {
        type: "feynman",
        title: "Cấm hay cho tất cả đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới con đường hay bị người đi xe máy đi ngược chiều. Dựng rào chắn kín thì người ta tìm đường khác, đi ngược ở chỗ không có ai trông. Bỏ hết biển báo thì ai cũng tự đi, va chạm không ai chịu. Chỗ tốt là vạch rõ làn, đặt biển ở ngã tư nguy hiểm, và có người trực.",
        columns: ["Lựa chọn", "Con đường", "Với AI trong phòng"],
        rows: [
          ["Dựng rào kín", "Người ta tìm đường khác, đi ngược ở chỗ vắng", "Dùng lén trên máy cá nhân, không ai dặn che thông tin"],
          ["Bỏ hết biển báo", "Ai cũng tự đi, va chạm không rõ lỗi ai", "Ai cũng tự dùng, sự cố không biết ai làm"],
          ["Vạch làn và biển ở ngã tư", "Đi nhanh, nguy hiểm được chặn đúng chỗ", "Việc nào làm ngay, việc nào hỏi trước, việc nào không bao giờ"],
          ["Có người trực", "Nhắc và xử lý khi có va chạm", "Một người phụ trách nhận câu hỏi và sự cố"],
        ],
        oneLiner: "Quy tắc tốt không phải rào kín, mà là vạch làn và biển đặt đúng ngã tư nguy hiểm.",
      },
      { type: "heading", text: "Vì sao cấm kín bị bỏ qua" },
      {
        type: "paragraph",
        text: "Lệnh cấm đánh vào ý định tốt: người ta dùng AI vì nó giúp việc xong nhanh hơn. Khi deadline đến, nhu cầu lớn hơn nỗi sợ bị nhắc. Họ chuyển sang điện thoại cá nhân, và đúng chỗ đó không có tài khoản công ty, không có hướng dẫn, không ai nhắc che tên khách.",
      },
      { type: "heading", text: "Vì sao cho tất cả cũng hỏng" },
      {
        type: "paragraph",
        text: "Bỏ hết hạn chế nghe thoải mái, nhưng khi có một bản hợp đồng bị đưa ra ngoài thì không ai biết người nào đã làm, vào lúc nào, bằng công cụ nào. Không có quy tắc thì cũng không có 'ai là người hỏi'. Chỉ sau sự cố, người ta mới thấy thiếu chỗ nào.",
      },
      {
        type: "flow",
        title: "Từ hai lối cực đoan tới lối giữa",
        steps: [
          { label: "Bắt đầu từ nỗi lo của sếp", detail: "Sếp không ghét AI, sếp sợ lộ dữ liệu và không biết ai chịu trách nhiệm. Nói lại nỗi lo đó bằng lời của sếp trước khi đưa đề xuất." },
          { label: "Chỉ ra điều gì xảy ra sau lệnh cấm", detail: "Dùng ví dụ thật của phòng: người ta vẫn cần xong việc, nên sẽ chuyển sang chỗ không ai thấy và không ai hướng dẫn." },
          { label: "Chia việc thành ba nhóm", detail: "Làm ngay (không chạm dữ liệu riêng), hỏi trước (có chạm), không bao giờ (dữ liệu khách, lương, hợp đồng chưa ký)." },
          { label: "Chỉ định người chịu từng khâu", detail: "Ai duyệt nhóm 'hỏi trước', ai nhận báo cáo sự cố. Có tên người thì nỗi lo 'ai chịu' được trả lời." },
          { label: "Hẹn đo lại sau vài tuần", detail: "Xem người ta có hỏi nhiều hơn và dùng lén ít đi không. Quy tắc đầu tiên không cần hoàn hảo, cần chỉnh được." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Cấm tất cả",
          text: "Dễ nói, dễ viết thành một dòng. Nhưng người ta vẫn dùng ở chỗ không ai thấy, không có hướng dẫn, và khi sự cố xảy ra họ sợ nên không báo.",
        },
        right: {
          label: "Cho tất cả",
          text: "Dễ nói và được nhân viên yêu thích. Nhưng không có quy tắc nên không ai biết việc gì đã đi ra ngoài, và không ai có trách nhiệm xử lý khi có chuyện.",
        },
      },
      {
        type: "callout",
        label: "Hãy nói điều sếp cần nghe",
        text: "Đừng bắt đầu bằng 'cấm là lỗi thời'. Hãy bắt đầu bằng 'lệnh cấm sẽ khiến em không biết ai đang làm gì, còn em muốn có người chịu trách nhiệm từng bước'. Đó là cùng một mục tiêu an toàn, chỉ khác đường đi.",
      },
      {
        type: "scenario",
        title: "Bạn trình bày với sếp trong mười phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi: 'Em nghĩ sao về chuyện cấm AI?' Bạn có mười phút trước cuộc họp tiếp theo.",
            choices: [
              { label: "Nói thẳng 'cấm là cách làm lạc hậu, công ty khác đều đang cho dùng'", next: "bad_attack" },
              { label: "Nói lại nỗi lo của sếp (lộ dữ liệu, không ai chịu) rồi đề xuất chia việc thành ba nhóm", next: "s2" },
            ],
          },
          bad_attack: {
            text: "Sếp thấy bị chê và đáp: 'Công ty khác không phải công ty mình.' Cuộc nói chuyện dừng ở đó và lệnh cấm được ban hành nguyên vẹn.",
            ending: "bad",
          },
          s2: {
            text: "Sếp gật đầu rồi hỏi: 'Vậy nhóm nào được làm ngay?' Bạn cần ví dụ cụ thể.",
            choices: [
              { label: "Đưa ví dụ: viết lại email chung chung, gợi ý tiêu đề, chỉnh câu văn không có tên khách", next: "s3" },
              { label: "Nói 'cứ để mỗi người tự đánh giá việc nào an toàn'", next: "bad_free" },
            ],
          },
          bad_free: {
            text: "Sếp nhớ đúng nỗi lo ban đầu: nếu mỗi người tự đánh giá thì ai chịu khi sai? Sếp quay lại với lệnh cấm.",
            ending: "bad",
          },
          s3: {
            text: "Sếp hỏi tiếp: 'Còn việc có tên khách thì sao? Anh vẫn lo.'",
            choices: [
              { label: "Đề xuất nhóm 'hỏi trước': người đó gửi phần đã che tên cho trưởng phòng duyệt", next: "good" },
              { label: "Hứa rằng 'không ai dám dán tên khách đâu, em bảo đảm'", next: "bad_promise" },
            ],
          },
          bad_promise: {
            text: "Sếp biết bạn không thể bảo đảm điều đó nên không tin đề xuất. Lệnh cấm vẫn ban hành.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý thử ba tuần: nhóm làm ngay mở ra, nhóm hỏi trước có người duyệt, và sếp sẽ xem lại kết quả. Lệnh cấm được thay bằng bản nháp quy tắc.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nói lại nỗi lo của sếp bằng lời của sếp.",
          "Bước 2 - Chỉ ra điều sẽ xảy ra sau lệnh cấm bằng ví dụ thật của phòng.",
          "Bước 3 - Đề xuất ba nhóm việc và một người chịu trách nhiệm từng khâu.",
          "Bước 4 - Hẹn đo lại sau vài tuần để chỉnh quy tắc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hai lối cực đoan đều bỏ trống chỗ cần quy tắc rõ ràng.",
          "Bài sau: viết quy tắc dùng AI một trang cho việc thường ngày của phòng.",
        ],
      },
    ],
  },
  {
    id: 2683,
    slug: "quy-tac-mot-trang-cho-cong-viec-thuong-ngay-cua-phong",
    title: "Chặng 64, Bài 4: Quy tắc dùng AI một trang cho việc thường ngày của phòng",
    subtitle: "Ba nhóm: được làm, cần hỏi, không bao giờ làm, mỗi nhóm kèm ví dụ thật của phòng bạn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quy tắc dài mười trang không ai đọc, còn quy tắc chỉ có câu 'dùng AI một cách có trách nhiệm' thì ai cũng hiểu theo ý mình. Một trang ba nhóm kèm ví dụ thật của phòng là mức vừa đủ: người mới đọc năm phút là biết việc nào làm ngay, việc nào phải hỏi, việc nào tuyệt đối không.",
    openingQuestion:
      "Bạn viết quy tắc dùng AI cho phòng. Bản nào có nhiều khả năng được mọi người đọc và làm theo nhất?",
    openingOptions: [
      "Một trang chia ba nhóm, mỗi nhóm có ví dụ thật của phòng",
      "Mười trang đầy đủ với mọi tình huống có thể xảy ra trong năm",
      "Một câu 'sử dụng AI một cách có trách nhiệm và an toàn' là đủ",
      "Một bản sao nguyên văn chính sách bảo mật chung của cả công ty",
    ],
    correctOption: 0,
    explanation:
      "Một trang đủ ngắn để đọc hết, và ví dụ thật giúp người đọc nhận ra việc của mình. Mười trang không ai đọc hết nên chẳng ai làm theo. Một câu chung chung để mỗi người hiểu một kiểu. Bản sao chính sách chung của công ty viết cho mọi phòng nên không chỉ ra việc cụ thể của phòng bạn.",
    diagram: [
      { label: "Được làm: việc không chạm dữ liệu riêng", arrow: true },
      { label: "Cần hỏi: việc có chạm, người duyệt nhìn trước", arrow: true },
      { label: "Không bao giờ: dữ liệu không được rời công ty", arrow: true },
      { label: "Mỗi nhóm kèm ba ví dụ thật của phòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng phòng chăm sóc khách hàng viết quy tắc một trang. Nhóm 'được làm' có 'viết lại câu trả lời mẫu không có tên khách'. Nhóm 'cần hỏi' có 'tóm tắt một cuộc gọi khiếu nại' và người duyệt là chị. Nhóm 'không bao giờ' có 'dán danh sách khách và số điện thoại'. Người mới vào phòng đọc xong trong năm phút và hỏi lại đúng hai câu.",
    },
    quiz: [
      {
        question: "Ví dụ nào thuộc nhóm 'được làm' của quy tắc phòng?",
        options: [
          "Nhờ AI sửa lỗi chính tả và làm gọn một đoạn email không có tên khách",
          "Dán danh sách khách và số điện thoại để AI chia nhóm gọi",
          "Đưa bảng lương tháng cho AI kiểm tra công thức",
          "Tải hợp đồng chưa ký lên để AI tóm tắt các điều khoản, rồi lưu vào ổ chung",
        ],
        correct: 0,
        explanation:
          "Nhóm 'được làm' là việc không chạm dữ liệu riêng của khách hay nhân viên, và sai cũng ít hậu quả. Danh sách khách có số điện thoại, bảng lương và hợp đồng chưa ký đều chạm dữ liệu nhạy cảm, nên thuộc nhóm 'cần hỏi' hoặc 'không bao giờ' tuỳ quyết định của công ty.",
      },
      {
        question: "Vì sao mỗi nhóm nên có ví dụ thật của phòng thay vì chỉ có nguyên tắc?",
        options: [
          "Người đọc nhận ra việc của mình nên biết ngay nó thuộc nhóm nào",
          "Vì ví dụ làm bản quy tắc dài hơn nên trông nghiêm túc hơn trong mắt sếp và người kiểm tra",
          "Vì nguyên tắc luôn bị người đọc hiểu sai còn ví dụ thì không bao giờ",
          "Vì ví dụ giúp công ty tránh hoàn toàn trách nhiệm khi có sự cố xảy ra sau này",
        ],
        correct: 0,
        explanation:
          "Nguyên tắc như 'không đưa thông tin nhạy cảm' mơ hồ, còn 'không dán danh sách khách' thì ai cũng hiểu. Độ dài không làm quy tắc nghiêm túc hơn. Ví dụ vẫn có thể bị hiểu sai, chỉ là ít hơn. Và không có văn bản nào giúp công ty tránh trách nhiệm, đó cũng không phải mục đích.",
      },
      {
        question: "Khi nào một việc nên xếp vào nhóm 'cần hỏi' thay vì 'được làm'?",
        options: [
          "Khi việc có thể chạm dữ liệu riêng hoặc kết quả sai sẽ gây hậu quả",
          "Khi việc đó mất nhiều hơn mười phút để hoàn thành với AI",
          "Khi việc do nhân viên mới làm lần đầu tiên trong phòng, dù việc đó vốn rất đơn giản",
          "Khi công cụ AI dùng cho việc đó có giao diện tiếng nước ngoài",
        ],
        correct: 0,
        explanation:
          "Hai thứ quyết định mức rủi ro là dữ liệu đi vào và hậu quả nếu kết quả sai, còn thời gian làm hay ngôn ngữ giao diện không nói gì về điều đó. Người mới làm việc an toàn vẫn là việc an toàn, chỉ cần hướng dẫn thêm.",
      },
      {
        question: "Đồng nghiệp hỏi: 'Nhóm không bao giờ làm có nên chỉ ghi \"thông tin nhạy cảm\" không?' Bạn trả lời thế nào?",
        options: [
          "Nên ghi ví dụ cụ thể như lương, danh sách khách, hợp đồng chưa ký",
          "Ghi như vậy là đủ vì ai cũng hiểu thông tin nhạy cảm là gì",
          "Không ghi gì cả để khỏi gợi ý cho người khác các thông tin đó",
          "Chỉ ghi khi có người hỏi, còn bình thường để trống cho ngắn gọn",
        ],
        correct: 0,
        explanation:
          "'Nhạy cảm' mỗi người hiểu một kiểu: người này coi email khách là bình thường, người kia coi là nhạy cảm. Ví dụ cụ thể dập tắt sự mơ hồ. Bỏ trống hay để khi có người hỏi thì bản quy tắc không còn tác dụng phòng ngừa.",
      },
      {
        question: "Bản nháp có 40 dòng. Theo mục tiêu 'một trang', bạn làm gì?",
        options: [
          "Giữ ba nhóm, mỗi nhóm ba ví dụ thật, chuyển phần giải thích dài ra phụ lục",
          "Giữ cả 40 dòng nhưng thu nhỏ chữ để vừa một trang, rồi in hai mặt cho mọi người trong phòng cùng đọc",
          "Bỏ nhóm 'không bao giờ làm' vì nhóm đó đã nằm trong chính sách chung",
          "Xoá hết ví dụ và chỉ giữ tiêu đề ba nhóm cho gọn",
        ],
        correct: 0,
        explanation:
          "Một trang cần đọc được, không phải chỉ in vừa. Phần giải thích dài có thể ra phụ lục cho ai muốn đọc thêm. Thu nhỏ chữ làm bản không ai đọc. Nhóm 'không bao giờ' chính là chỗ người đọc cần rõ nhất. Xoá ví dụ thì quay lại tình trạng mơ hồ của câu 'sử dụng có trách nhiệm'.",
      },
    ],
    keyTakeaways: [
      "Một trang, ba nhóm: được làm, cần hỏi, không bao giờ làm.",
      "Mỗi nhóm có ba ví dụ thật lấy từ việc của phòng.",
      "'Cần hỏi' phải ghi rõ hỏi ai, không chỉ ghi 'hỏi ý kiến'.",
      "'Không bao giờ' nên là danh sách dữ liệu cụ thể, không phải một chữ 'nhạy cảm'.",
      "Phần giải thích dài để ra phụ lục, không để chen vào trang chính.",
    ],
    practicePrompt: {
      question:
        "Bạn có câu: 'Không đưa thông tin quan trọng của công ty cho công cụ AI.' Cách viết lại nào rõ nhất cho người đọc?",
      options: [
        "Không dán danh sách khách, số điện thoại, bảng lương hay hợp đồng chưa ký",
        "Hãy cẩn trọng khi đưa thông tin có giá trị cho công cụ bên ngoài",
        "Thông tin quan trọng cần được bảo vệ theo chính sách của công ty",
        "Mọi nhân viên có nghĩa vụ giữ bí mật thông tin của công ty trong quá trình làm việc",
      ],
      correct: 0,
      explanation:
        "Câu đầu liệt kê những thứ cụ thể nên người đọc đối chiếu được ngay với việc mình sắp làm. Ba câu còn lại dùng từ chung như 'cẩn trọng', 'quan trọng', 'giữ bí mật' mà mỗi người hiểu một cách, nên không ngăn được hành động cụ thể nào.",
    },
    summary: {
      keyIdea: "Quy tắc một trang chia ba nhóm kèm ví dụ thật là cách rẻ nhất để cả phòng cùng hiểu một thứ.",
      formula: "Được làm + Cần hỏi (ghi rõ ai duyệt) + Không bao giờ (ghi dữ liệu cụ thể) + 3 ví dụ mỗi nhóm.",
      commonMistake: "Viết câu chung chung như 'dùng có trách nhiệm' để trông đầy đủ, nhưng không ai biết làm gì từ câu đó.",
      action: "Viết bản nháp một trang với ba nhóm và chín ví dụ thật từ công việc hằng tuần của phòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một trang trống và kẻ ba cột: Được làm, Cần hỏi, Không bao giờ. Điền mỗi cột ba việc có thật trong phòng bạn tuần trước (ví dụ: sửa câu email, tóm tắt cuộc họp, xử lý danh sách khách). Ở cột 'Cần hỏi', ghi tên người duyệt. Ngày mai bạn sẽ được hỏi: chín ví dụ của bạn là gì và ai là người duyệt?",
      secondary: "Đưa trang này cho một đồng nghiệp và hỏi họ việc nào họ thấy khó xếp vào cột nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Một nhân viên mới hỏi bạn: 'Em dùng AI để viết email này được không?' Nếu bạn phải suy nghĩ năm phút mới trả lời, phòng bạn cần một trang quy tắc. Bài này dạy cách viết nó.",
      },
      {
        type: "feynman",
        title: "Quy tắc một trang đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới bảng nội quy trong thang máy: ba dòng 'được', 'hỏi bảo vệ', 'không bao giờ' kèm hình minh hoạ. Không ai đọc cuốn nội quy dày, nhưng ai cũng liếc thấy bảng trong thang máy. Quy tắc dùng AI của phòng nên có hình dạng đó.",
        columns: ["Nhóm", "Nội quy thang máy", "Quy tắc AI của phòng"],
        rows: [
          ["Được làm", "Chở khách, chở hàng nhẹ", "Sửa câu, viết lại email không có tên khách"],
          ["Cần hỏi", "Chở hàng nặng: hỏi bảo vệ", "Tóm tắt cuộc gọi khiếu nại: hỏi trưởng phòng"],
          ["Không bao giờ", "Không dùng khi có cháy", "Không dán danh sách khách hay bảng lương"],
          ["Cách cho người ta nhớ", "Hình vẽ cụ thể", "Ví dụ thật của phòng, không phải từ chung chung"],
        ],
        oneLiner: "Quy tắc ngắn với ví dụ cụ thể thì người ta nhớ, quy tắc dài với từ chung chung thì người ta bỏ qua.",
      },
      { type: "heading", text: "Ba nhóm và lý do chia" },
      {
        type: "paragraph",
        text: "Chia ba nhóm vì có ba loại phản ứng: làm luôn, dừng lại hỏi, và tuyệt đối không. Hai nhóm là chưa đủ, vì khi chỉ có 'được' và 'không' thì mọi việc khó đều bị đẩy vào 'không' và người ta lại dùng lén.",
      },
      {
        type: "flow",
        title: "Từ bảng khảo sát tới quy tắc một trang",
        steps: [
          { label: "Lấy bảng ba cột từ khảo sát", detail: "Mỗi dòng là một việc người ta thật sự làm, kèm loại dữ liệu đi vào. Bạn không phải nghĩ ví dụ từ đầu." },
          { label: "Xếp từng việc vào một nhóm", detail: "Không chạm dữ liệu riêng và sai cũng ít hại: được làm. Có chạm hoặc sai sẽ gây hậu quả: cần hỏi. Dữ liệu khách, lương, hợp đồng chưa ký: không bao giờ." },
          { label: "Viết mỗi nhóm bằng ba ví dụ thật", detail: "Dùng chữ người trong phòng hay dùng. Ví dụ 'danh sách khách gọi lại' dễ nhận hơn 'dữ liệu định danh cá nhân'." },
          { label: "Gắn tên người vào 'cần hỏi'", detail: "Không ghi 'hỏi ý kiến cấp trên'. Ghi 'hỏi chị Lan, nhắn trước 10 giờ, chị trả lời trong ngày'." },
          { label: "Để người khác đọc thử", detail: "Nhờ một người chưa biết gì đọc và xếp lại ba việc. Chỗ họ xếp khác bạn là chỗ câu chữ còn mơ hồ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung quy tắc một trang",
        task: "Bạn có bảng khảo sát mười dòng việc của phòng. Lắp prompt để AI dựng khung quy tắc một trang đúng ba nhóm, bạn sẽ tự chỉnh ví dụ sau.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Đưa mười dòng việc của phòng đã che tên khách và chỉ ghi loại dữ liệu.", good: true, feedback: "Có việc thật của phòng mà không có dữ liệu riêng: AI xếp nhóm được và ví dụ khớp với công việc thật." },
              { text: "Đưa cả file khảo sát gốc kèm danh sách nhân viên đã điền.", feedback: "Đưa thêm danh sách người điền là phá cam kết ẩn danh và chẳng giúp AI xếp nhóm tốt hơn." },
            ],
          },
          {
            id: "structure",
            label: "Cấu trúc yêu cầu",
            options: [
              { text: "Viết một bản quy tắc đầy đủ về cách dùng AI có trách nhiệm trong công ty.", feedback: "Yêu cầu chung chung thì AI cho ra bản văn dài, dùng câu như 'cần cẩn trọng' mà không ai làm theo được." },
              { text: "Chia đúng ba nhóm: được làm, cần hỏi (ghi chỗ để tên người duyệt), không bao giờ; mỗi nhóm 3 ví dụ lấy từ danh sách đã đưa.", good: true, feedback: "Cấu trúc rõ, ví dụ lấy từ dữ liệu bạn đưa nên AI ít có cơ hội bịa việc không có thật." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Tối đa một trang; không tự bịa ví dụ ngoài danh sách; chỗ chưa rõ ghi [cần xác nhận].", good: true, feedback: "Giới hạn độ dài và nguồn ví dụ, chỗ thiếu được đánh dấu để bạn thấy và hỏi." },
              { text: "Viết thật chi tiết, bổ sung những tình huống khác mà phòng có thể gặp.", feedback: "AI sẽ thêm tình huống nó tưởng tượng, bản quy tắc phình to và có ví dụ không phải việc của phòng bạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "structure", "limit"],
            text: "QUY TẮC DÙNG AI CỦA PHÒNG (nháp)\n\nĐƯỢC LÀM\n- Sửa câu, làm gọn email không có tên khách\n- Gợi ý tiêu đề cho báo cáo tuần\n- Giải thích một thuật ngữ trong tài liệu công khai\n\nCẦN HỎI (người duyệt: [cần xác nhận])\n- Tóm tắt biên bản họp có tên đối tác\n- Soạn thư trả lời khiếu nại\n- Dùng số liệu doanh thu theo tháng\n\nKHÔNG BAO GIỜ\n- Dán danh sách khách và số điện thoại\n- Đưa bảng lương\n- Tải hợp đồng chưa ký",
          },
          {
            requires: ["structure"],
            text: "QUY TẮC (nháp)\n\nĐƯỢC LÀM: sửa câu, dịch thuật ngữ, viết báo cáo dự án Orion.\nCẦN HỎI: làm việc với kiểm toán, xử lý hồ sơ pháp lý.\nKHÔNG BAO GIỜ: chia sẻ dữ liệu nhạy cảm.\n\n(Dự án Orion và hồ sơ pháp lý không có trong danh sách bạn đưa: AI tự thêm. Nhóm 'không bao giờ' chỉ có từ chung.)",
          },
          {
            text: "Nhân viên cần sử dụng công cụ AI một cách có trách nhiệm, tuân thủ quy định an toàn thông tin của công ty, hạn chế chia sẻ thông tin nhạy cảm và luôn cân nhắc các rủi ro liên quan...\n\n(Văn bản trơn tru nhưng không có nhóm, không có ví dụ, không ai biết làm gì.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một trang, ba nhóm, ví dụ thật",
          text: "Đọc năm phút, nhớ được, hỏi lại đúng chỗ khó. Người mới vào phòng biết ngay việc nào làm ngay và việc nào phải hỏi ai.",
        },
        right: {
          label: "Văn bản dài, chữ chung chung",
          text: "Không ai đọc hết, và ai đọc thì hiểu mỗi người một kiểu. Khi có sự cố, người ta nói 'tôi tưởng vậy là được'.",
        },
      },
      {
        type: "callout",
        label: "Về chữ 'không bao giờ'",
        text: "Nhóm này nên là những thứ công ty thật sự không cho phép ra ngoài. Đừng tự quyết thay pháp chế hay bộ phận bảo mật: nếu chưa rõ dữ liệu nào bị cấm theo quy định, hỏi họ rồi mới viết vào. Bản của bạn là bản nháp cho đến khi người có trách nhiệm đọc.",
      },
      {
        type: "scenario",
        title: "Người mới hỏi một câu không có trong quy tắc",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản quy tắc đã dán lên kênh chung. Một bạn mới nhắn: 'Em muốn nhờ AI soạn câu trả lời cho một khách đang khiếu nại về hoá đơn. Có tên khách trong email. Em làm được không?'",
            choices: [
              { label: "Trả lời nhanh: 'Được, miễn là em cẩn thận nhé'", next: "bad_vague" },
              { label: "Chỉ vào nhóm 'cần hỏi': che tên khách, gửi bản nháp cho chị Lan duyệt trước khi gửi khách", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Bạn mới dán cả email có tên và số hoá đơn thật. Không ai duyệt, câu trả lời chứa một cam kết hoàn tiền mà phòng chưa đồng ý. Khách giữ lại email làm bằng chứng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn mới làm theo và hỏi thêm: 'Nếu em chưa chắc việc của em thuộc nhóm nào thì sao?'",
            choices: [
              { label: "Nói 'Cứ coi như thuộc nhóm cần hỏi và nhắn chị Lan'", next: "s3" },
              { label: "Nói 'Em tự quyết, việc nào thấy an toàn thì cứ làm'", next: "bad_self" },
            ],
          },
          bad_self: {
            text: "Bạn mới đánh giá 'an toàn' theo cảm giác của mình. Tuần sau em đưa bảng lương tháng vào một công cụ để kiểm công thức vì 'chỉ là con số'.",
            ending: "bad",
          },
          s3: {
            text: "Bạn mới nhắn và chị Lan trả lời trong buổi chiều. Cuối tuần, bạn ghi lại câu hỏi đó để bổ sung ví dụ mới vào quy tắc.",
            choices: [
              { label: "Thêm ví dụ 'soạn thư trả lời khiếu nại' vào nhóm cần hỏi, bản quy tắc vẫn một trang", next: "good" },
              { label: "Thêm một đoạn dài giải thích mọi trường hợp khiếu nại có thể có", next: "bad_long" },
            ],
          },
          bad_long: {
            text: "Quy tắc phình lên ba trang. Người mới bỏ qua và lại hỏi từng việc một.",
            ending: "bad",
          },
          good: {
            text: "Quy tắc vẫn một trang nhưng thêm một ví dụ đúng việc của phòng. Người mới sau này đọc ví dụ đó và không cần hỏi nữa.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Lấy mười dòng việc thật từ khảo sát của phòng.",
          "Bước 2 - Xếp mỗi việc vào một trong ba nhóm theo dữ liệu chạm tới và hậu quả nếu sai.",
          "Bước 3 - Ghi tên người duyệt ở nhóm 'cần hỏi'.",
          "Bước 4 - Nhờ một người đọc thử và sửa chỗ họ xếp khác bạn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang ba nhóm kèm ví dụ thật là quy tắc người ta thật sự đọc.",
          "Bài sau: đọc quy tắc này cùng một đồng nghiệp còn ngờ vực.",
        ],
      },
    ],
  },
  {
    id: 2684,
    slug: "mini-doc-lai-quy-tac-cung-mot-dong-nghiep-khong-thich-ai",
    title: "Chặng 64, Bài 5: Mini: đọc quy tắc cùng một đồng nghiệp còn ngờ vực",
    subtitle: "Người hay nghi ngờ là người đọc kỹ nhất: nhờ họ chỉ ra những câu mơ hồ trong bản nháp của bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản quy tắc bạn tự đọc lại thì câu nào cũng thấy rõ, vì bạn đã biết ý. Người hay nghi ngờ thì không biết ý bạn, nên họ hỏi: 'thông tin nhạy cảm là gì? khi cần thiết là khi nào?'. Mỗi câu hỏi đó là một câu mơ hồ cần sửa trước khi cả phòng đọc.",
    openingQuestion:
      "Bạn đưa bản quy tắc nháp cho một đồng nghiệp hay nghi ngờ AI. Họ nói: 'Câu nào cũng chung chung, tôi đọc xong vẫn không biết làm gì.' Bạn nên làm gì?",
    openingOptions: [
      "Hỏi họ chỉ ra từng câu mơ hồ và sửa thành ví dụ cụ thể",
      "Giải thích cho họ hiểu ý của bạn rồi giữ nguyên câu chữ trong bản nháp",
      "Bỏ qua ý kiến của họ vì họ vốn không ủng hộ việc dùng AI",
      "Chuyển bản nháp cho người thứ ba ủng hộ AI để lấy ý kiến khác",
    ],
    correctOption: 0,
    explanation:
      "Người đọc không biết ý bạn chính là người thử bản quy tắc tốt nhất: chỗ họ không hiểu là chỗ mọi người khác cũng không hiểu. Giải thích miệng thì bản quy tắc vẫn nguyên, và người đọc sau sẽ vấp lại. Bỏ ý kiến vì họ không ủng hộ là bỏ mất phản hồi quý. Người ủng hộ AI thường thấy câu nào cũng ổn vì họ đã hiểu trước.",
    diagram: [
      { label: "Đưa bản nháp cho người hay nghi ngờ", arrow: true },
      { label: "Nhờ họ gạch chân mọi câu khiến họ hỏi lại", arrow: true },
      { label: "Sửa mỗi câu thành một ví dụ cụ thể", arrow: true },
      { label: "Đưa lại bản sửa để họ xác nhận đã rõ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một kế toán thâm niên đọc bản nháp và gạch ba câu: 'hạn chế đưa thông tin nhạy cảm', 'khi thật sự cần thiết' và 'nên cân nhắc kỹ'. Chị hỏi 'nhạy cảm là gì, cần thiết với ai, cân nhắc thế nào'. Người soạn sửa thành 'không dán bảng lương, số tài khoản, hợp đồng chưa ký' và 'việc có tên khách hỏi trưởng phòng trước'. Bản mới ngắn hơn và chị đọc xong nói 'giờ tôi biết mình được làm gì'.",
    },
    quiz: [
      {
        question: "Vì sao nên đưa bản nháp cho người còn ngờ vực AI thay vì người ủng hộ?",
        options: [
          "Họ đọc kỹ từng chữ và chỉ ra chỗ mơ hồ mà người ủng hộ bỏ qua",
          "Vì họ sẽ duyệt nhanh hơn và không bao giờ phản đối bản nháp",
          "Vì ý kiến của người ngờ vực luôn đúng hơn ý kiến của người ủng hộ",
          "Vì như thế bạn sẽ thuyết phục được họ đổi ý ngay sau buổi đọc",
        ],
        correct: 0,
        explanation:
          "Người hay nghi ngờ đọc để tìm lỗi nên lộ ra câu mơ hồ, còn người ủng hộ thường nhìn thấy điều mình đã hiểu. Họ không duyệt nhanh hay dễ dãi hơn. Ý kiến của ai cũng có thể đúng hoặc sai, không có quy luật 'ngờ vực thì luôn đúng hơn'. Và mục tiêu là bản quy tắc rõ hơn chứ không phải thuyết phục ai đổi ý.",
      },
      {
        question: "Câu nào trong quy tắc dễ bị người đọc hỏi 'nghĩa là gì' nhất?",
        options: [
          "Hạn chế đưa thông tin nhạy cảm khi thật sự cần thiết",
          "Không dán danh sách khách và số điện thoại vào công cụ AI",
          "Bản nháp email có tên khách cần gửi chị Lan duyệt trước",
          "Không tải hợp đồng chưa ký lên bất kỳ công cụ AI nào, dù chỉ một phần",
        ],
        correct: 0,
        explanation:
          "Câu đầu có ba chỗ mơ hồ: 'hạn chế' (đến mức nào), 'nhạy cảm' (gồm gì), 'cần thiết' (ai quyết). Ba câu còn lại nói được việc cụ thể, có thể đối chiếu ngay với việc sắp làm: danh sách khách, email có tên, hợp đồng chưa ký.",
      },
      {
        question: "Đồng nghiệp gạch chân chữ 'khi cần thiết'. Cách sửa nào làm câu rõ nhất?",
        options: [
          "Nêu luôn hai tình huống cụ thể và ghi người quyết định là ai",
          "Đổi 'khi cần thiết' thành 'khi thật sự cần thiết' cho mạnh hơn",
          "Xoá hẳn cụm đó và để người đọc tự hiểu theo hoàn cảnh",
          "Thêm chú thích ở cuối trang giải thích khái niệm 'cần thiết'",
        ],
        correct: 0,
        explanation:
          "Chữ 'cần thiết' chỉ rõ khi người ta biết tình huống nào và ai quyết. Thêm 'thật sự' không làm rõ gì thêm mà chỉ nhấn mạnh chữ vốn mơ hồ. Xoá cụm đó thì câu thiếu điều kiện, còn tự hiểu theo hoàn cảnh là đúng điều ta muốn tránh. Chú thích cuối trang là chỗ ít ai đọc.",
      },
      {
        question: "Đồng nghiệp nói: 'Tôi vẫn thấy không nên dùng AI.' Bạn phản hồi thế nào để buổi đọc vẫn có ích?",
        options: [
          "Ghi nhận ý kiến, rồi hỏi họ câu nào trong bản nháp làm họ thấy chưa an toàn",
          "Cố gắng thuyết phục họ bằng các lợi ích của AI cho tới khi họ đồng ý",
          "Dừng buổi đọc và nói rằng bạn sẽ quay lại khi họ sẵn sàng",
          "Đồng ý hết với họ để buổi đọc kết thúc êm đẹp",
        ],
        correct: 0,
        explanation:
          "Chuyển từ quan điểm chung sang câu cụ thể thì bạn có thứ để sửa. Thuyết phục bằng lợi ích khiến buổi đọc thành tranh luận, không ra bản sửa nào. Dừng buổi đọc mất cơ hội nhận phản hồi. Đồng ý hết chỉ để êm đẹp sẽ không giúp bản nháp tốt hơn.",
      },
      {
        question: "Sau khi sửa, làm sao biết một câu đã đủ rõ?",
        options: [
          "Một người chưa đọc bản nháp xếp ba việc vào đúng nhóm như bạn dự định",
          "Chính bạn đọc lại ba lần và thấy không còn câu nào khó hiểu, kể cả khi đọc to thành tiếng",
          "Bản quy tắc đã ngắn hơn bản trước khoảng mười dòng",
          "Sếp đọc lướt và nói rằng bản này nhìn chuyên nghiệp hơn",
        ],
        correct: 0,
        explanation:
          "Thử bằng hành động: nếu người mới xếp đúng nhóm thì câu đủ rõ. Bạn tự đọc lại luôn thấy rõ vì bạn biết ý. Bản ngắn hơn chưa chắc rõ hơn. Sếp nói 'trông chuyên nghiệp' là đánh giá hình thức, không chứng minh người đọc làm đúng.",
      },
    ],
    keyTakeaways: [
      "Người ngờ vực là người thử quy tắc tốt nhất vì họ không biết ý bạn.",
      "Nhờ họ gạch chân mọi câu khiến họ hỏi lại 'nghĩa là gì'.",
      "Sửa bằng ví dụ cụ thể và tên người quyết định, không thêm chữ nhấn mạnh.",
      "Đừng tranh luận về quan điểm; hỏi họ câu nào chưa an toàn.",
      "Thử lại bằng một người chưa đọc: họ xếp việc vào đúng nhóm là đủ rõ.",
    ],
    practicePrompt: {
      question:
        "Đồng nghiệp gạch chân câu 'Hạn chế dùng các công cụ AI không rõ nguồn gốc.' và hỏi: 'Không rõ nguồn gốc là sao?' Bạn sửa thế nào?",
      options: [
        "Chỉ dùng công cụ có trong danh sách phòng đã duyệt (xem trang 2)",
        "Hạn chế tối đa việc dùng công cụ AI mà bạn chưa thật sự hiểu rõ",
        "Cân nhắc kỹ trước khi dùng bất cứ công cụ AI nào mới xuất hiện",
        "Ưu tiên các công cụ AI đáng tin cậy và có uy tín trên thị trường",
      ],
      correct: 0,
      explanation:
        "Câu sửa trỏ tới một danh sách cụ thể nên ai đọc cũng biết công cụ nào được dùng. Ba câu còn lại thay chữ mơ hồ này bằng chữ mơ hồ khác như 'chưa hiểu rõ', 'cân nhắc kỹ', 'đáng tin cậy', mà người đọc vẫn không biết là công cụ nào.",
    },
    summary: {
      keyIdea: "Chỗ người ngờ vực không hiểu là chỗ mọi người khác cũng sẽ vấp, nên đó là nơi sửa đầu tiên.",
      formula: "Đưa bản nháp → họ gạch câu mơ hồ → sửa bằng ví dụ và tên người quyết → thử lại với người chưa đọc.",
      commonMistake: "Giải thích miệng cho người đọc thay vì sửa câu, nên bản quy tắc vẫn mơ hồ với người tiếp theo.",
      action: "Đưa bản nháp quy tắc cho một đồng nghiệp hay nghi ngờ và nhờ họ gạch ba câu khó hiểu nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Đưa bản nháp quy tắc một trang của bạn cho một đồng nghiệp hay đặt câu hỏi và nhờ họ gạch chân mọi câu khiến họ phải hỏi lại. Với mỗi câu bị gạch, viết lại thành một ví dụ cụ thể hoặc thêm tên người quyết định. Ngày mai bạn sẽ được hỏi: họ gạch mấy câu và bạn đã sửa câu nào?",
      secondary: "Ghi lại câu hỏi đầu tiên họ đặt ra, vì đó thường là chỗ mơ hồ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa viết xong bản quy tắc và thấy nó rất rõ ràng. Rồi Hùng ngồi bàn bên, người vẫn nói 'AI toàn chuyện trên mây', đọc xong và hỏi ba câu mà bạn không trả lời được. Đó không phải thất bại, đó là lợi ích.",
      },
      {
        type: "feynman",
        title: "Nhờ người ngờ vực đọc quy tắc đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc thử mật khẩu cửa với người chưa từng vào nhà. Bạn tự thử thì cửa nào cũng mở vì bạn biết mã. Người lạ thử thì lộ ngay chỗ khoá kẹt, chỗ biển chỉ dẫn mờ. Người ngờ vực đọc quy tắc của bạn đóng vai người lạ đó.",
        columns: ["Khía cạnh", "Thử cửa", "Đọc quy tắc"],
        rows: [
          ["Người thử", "Người chưa biết mã", "Đồng nghiệp còn ngờ vực"],
          ["Điều họ phát hiện", "Khoá kẹt, biển mờ", "Câu mơ hồ, chữ có nhiều cách hiểu"],
          ["Bạn tự thử", "Luôn thấy mở vì biết mã", "Luôn thấy rõ vì biết ý mình"],
          ["Sửa thế nào", "Thay khoá, vẽ lại biển", "Thay chữ chung bằng ví dụ cụ thể"],
        ],
        oneLiner: "Người không biết ý bạn là người kiểm tra trung thực nhất cho câu chữ của bạn.",
      },
      { type: "heading", text: "Loại câu hay bị gạch" },
      {
        type: "paragraph",
        text: "Những câu hay bị hỏi lại thường có ba dạng: từ giảm nhẹ như 'hạn chế', 'nên', 'cân nhắc'; từ không có ranh giới như 'nhạy cảm', 'quan trọng'; và điều kiện không có người quyết như 'khi cần thiết'. Người đọc không biết ranh giới ở đâu nên mỗi người tự vẽ một đường khác nhau.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp quy tắc: câu nào khiến người đọc phải hỏi lại?",
        task: "Đồng nghiệp ngờ vực sẽ gạch chân những câu mơ hồ. Bấm các câu bạn nghĩ họ sẽ hỏi 'nghĩa là gì', rồi nộp.",
        segments: [
          { text: "Được dùng AI để sửa lỗi chính tả và làm gọn email không có tên khách hoặc số tiền." },
          { text: "Hạn chế đưa thông tin nhạy cảm cho công cụ AI khi thật sự cần thiết.", error: "Ba chỗ mơ hồ: 'hạn chế' không có ranh giới, 'nhạy cảm' không nói gồm gì, 'cần thiết' không nói ai quyết. Sửa thành danh sách cụ thể: lương, danh sách khách, hợp đồng chưa ký." },
          { text: "Không dán danh sách khách và số điện thoại vào bất kỳ công cụ AI nào." },
          { text: "Nên cân nhắc kỹ trước khi dùng AI cho các việc quan trọng.", error: "'Cân nhắc kỹ' và 'quan trọng' không có tiêu chí. Sửa thành: việc có tên khách hoặc số tiền gửi chị Lan duyệt trước." },
          { text: "Nếu chưa chắc việc của mình thuộc nhóm nào, nhắn chị Lan trước khi làm." },
          { text: "Chỉ dùng các công cụ phù hợp và đáng tin cậy.", error: "'Phù hợp' và 'đáng tin cậy' mỗi người hiểu khác nhau. Sửa thành trỏ tới danh sách công cụ đã duyệt của phòng." },
        ],
      },
      {
        type: "flow",
        title: "Một buổi đọc quy tắc mười lăm phút",
        steps: [
          { label: "Nói trước mục đích", detail: "Nói rõ: 'Mình cần bạn tìm chỗ khó hiểu, không cần bạn đồng ý với cả bản.' Người ngờ vực thường thoải mái hơn khi không bị bắt phải ủng hộ." },
          { label: "Đưa bản nháp và im lặng đọc", detail: "Đừng giải thích trước hay trong khi họ đọc. Nếu bạn giải thích thì bạn đã dán ý của mình lên câu chữ." },
          { label: "Nhờ gạch chân câu khiến họ hỏi lại", detail: "Không cần họ giải thích lý do. Chỉ cần dấu gạch: câu nào khiến họ dừng lại, câu nào họ không biết làm gì." },
          { label: "Sửa ngay tại chỗ, từng câu một", detail: "Hỏi: 'Ví dụ nào khiến bạn hiểu câu này?' Ghi lại chính ví dụ của họ vào bản quy tắc." },
          { label: "Nhờ thử lại bằng việc thật", detail: "Đưa ba việc của tuần này và nhờ họ xếp vào nhóm. Nếu họ xếp giống bạn, bản đã đủ rõ." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Sửa theo chỗ người đọc vấp",
          text: "Mỗi câu bị gạch trở thành một ví dụ cụ thể hoặc một tên người quyết định. Bản quy tắc ngắn hơn nhưng rõ hơn, và người đọc sau ít phải hỏi lại.",
        },
        right: {
          label: "Giải thích miệng rồi giữ nguyên",
          text: "Người đọc đầu tiên hiểu nhờ bạn giải thích. Người đọc sau không có bạn bên cạnh và vấp đúng chỗ đó. Bản quy tắc vẫn mơ hồ.",
        },
      },
      {
        type: "callout",
        label: "Khi họ vẫn không ủng hộ",
        text: "Có người sẽ vẫn không thích dùng AI, và điều đó ổn. Mục tiêu của buổi đọc là bản quy tắc rõ, không phải thuyết phục họ đổi quan điểm. Nếu họ nêu lo ngại về dữ liệu khách hay pháp lý, ghi lại và chuyển cho pháp chế hoặc bộ phận bảo mật xem xét.",
      },
      {
        type: "scenario",
        title: "Buổi đọc với Hùng, người hay nghi ngờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đưa bản nháp cho Hùng. Anh đọc xong, cau mày và nói: 'Câu 'hạn chế thông tin nhạy cảm' này tôi không hiểu. Nhạy cảm là gì? Tôi coi mọi thứ trong email đều nhạy cảm.'",
            choices: [
              { label: "Giải thích: 'Ý mình là những thông tin quan trọng thôi, không phải tất cả'", next: "bad_explain" },
              { label: "Hỏi: 'Bạn thấy thứ nào trong việc hằng tuần của bạn là nhạy cảm nhất?' rồi ghi lại", next: "s2" },
            ],
          },
          bad_explain: {
            text: "Hùng vẫn không biết 'quan trọng' nghĩa là gì. Anh kết luận: 'Quy tắc này không dùng được' và nói vậy với cả nhóm. Bản nháp giữ nguyên câu cũ.",
            ending: "bad",
          },
          s2: {
            text: "Hùng liệt kê: bảng lương, danh sách khách, số tài khoản. Anh nói thêm: 'Nhưng viết lại một câu email thì tôi thấy không sao.'",
            choices: [
              { label: "Đưa ba thứ đó vào nhóm 'không bao giờ' và ghi 'viết lại câu không có tên' vào nhóm 'được làm'", next: "s3" },
              { label: "Bỏ câu đó đi vì 'mỗi người hiểu một khác'", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Bản quy tắc không còn câu nào nói về dữ liệu nhạy cảm. Người mới vào phòng không biết thứ gì bị cấm.",
            ending: "bad",
          },
          s3: {
            text: "Bạn sửa và đưa lại. Bạn nhờ Hùng xếp ba việc của tuần này vào nhóm.",
            choices: [
              { label: "Nhờ anh xếp, rồi so với cách xếp của bạn và sửa câu nếu khác", next: "good" },
              { label: "Bảo anh rằng bản mới tốt rồi, không cần thử nữa", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Không ai kiểm được bản mới có rõ hơn không. Tuần sau hai đồng nghiệp xếp cùng một việc vào hai nhóm khác nhau.",
            ending: "bad",
          },
          good: {
            text: "Hùng xếp đúng hai trên ba việc. Việc còn lại bạn thêm thành ví dụ mới. Anh nói: 'Giờ thì tôi hiểu, dù tôi vẫn không mê AI.' Bản quy tắc đã sẵn sàng cho cả phòng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đưa bản nháp cho một người hay đặt câu hỏi, nói rõ bạn cần tìm chỗ khó hiểu.",
          "Bước 2 - Im lặng để họ đọc, nhờ gạch chân câu khiến họ dừng lại.",
          "Bước 3 - Sửa mỗi câu thành ví dụ cụ thể hoặc tên người quyết định.",
          "Bước 4 - Nhờ họ xếp ba việc thật vào nhóm để thử lại bản mới.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chỗ người ngờ vực không hiểu là chỗ đáng sửa nhất của quy tắc.",
          "Bài sau: chấm điểm một việc dùng AI theo dữ liệu chạm tới và hậu quả khi sai.",
        ],
      },
    ],
  },
];
