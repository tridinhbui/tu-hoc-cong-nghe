import type { Lesson } from "../lesson-types";

// Chặng 59, bài 6-10. Giáo trình: scripts/curriculum/stage-59.json.
// Chỉ dạy khái niệm bền (HTTPS, tên miền, DNS, email công ty, khoá bí mật); không ghi đường dẫn nút bấm, giá tiền hay tính năng riêng của một nhà cung cấp.
export const S59_B_LESSONS: Lesson[] = [
  {
    id: 2585,
    slug: "o-khoa-https-nghia-la-gi-va-khong-nghia-la-gi",
    title: "Chặng 59, Bài 6: Ổ khoá HTTPS nghĩa là gì và không có nghĩa là gì",
    subtitle: "Một phong bì niêm phong kín vẫn có thể do người lạ gửi: khoá nói về đường đi, không nói về người gửi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người học được rằng 'có ổ khoá là an toàn' rồi nhập mật khẩu vào một trang giả mà không chút nghi ngờ. Hiểu đúng ổ khoá hứa điều gì giúp bạn vừa không hoảng khi thấy trang không có khoá, vừa không tin mù quáng khi thấy nó.",
    openingQuestion:
      "Bạn nhận tin nhắn 'tài khoản sắp bị khoá, bấm vào đây để xác nhận'. Trang mở ra có ổ khoá trên thanh địa chỉ và giao diện giống hệt ngân hàng. Ổ khoá đó cho bạn biết điều gì chắc chắn?",
    openingOptions: [
      "Dữ liệu đi giữa bạn và trang được mã hoá",
      "Trang này đúng là của ngân hàng bạn đang dùng",
      "Chủ trang đã được cơ quan nhà nước kiểm tra",
      "Trang này không chứa gì nhằm lừa người dùng",
    ],
    correctOption: 0,
    explanation:
      "Ổ khoá HTTPS chỉ bảo đảm hai việc: đường truyền được mã hoá để người đứng giữa khó đọc được, và trang bạn đang kết nối đúng là trang giữ cái tên miền hiện trên thanh địa chỉ. Nó không nói tên miền đó có phải của ngân hàng thật không, cũng không nói chủ trang là ai hay có ý đồ gì. Kẻ lừa đảo vẫn xin được khoá cho tên miền riêng của họ, nên một trang giả hoàn toàn có thể có ổ khoá.",
    diagram: [
      { label: "Bạn mở một địa chỉ trang", arrow: true },
      { label: "Trình duyệt đòi trang xuất trình 'giấy chứng nhận' cho tên miền đó", arrow: true },
      { label: "Hai bên thống nhất mã khoá, dữ liệu đi đường kín", arrow: true },
      { label: "Bạn vẫn phải tự xem tên miền có đúng nơi mình định tới không" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kế toán nhận email 'cập nhật thông tin thuế' dẫn tới trang có ổ khoá. Cô định nhập mật khẩu thì để ý tên miền có thêm một cụm lạ phía sau tên cơ quan quen thuộc. Cô đóng trang, tự gõ địa chỉ thường dùng và báo bộ phận IT. Ổ khoá không cứu cô, việc đọc kỹ tên miền mới cứu.",
    },
    quiz: [
      {
        question: "Ổ khoá HTTPS trên thanh địa chỉ cho bạn biết điều gì?",
        options: [
          "Dữ liệu đi giữa bạn và trang được mã hoá",
          "Chủ trang đã được xác minh là doanh nghiệp trung thực",
          "Nội dung trang đã được kiểm duyệt là không lừa đảo",
          "Trang không chứa phần mềm độc hại ở bất cứ chỗ nào",
        ],
        correct: 0,
        explanation:
          "Ổ khoá chỉ nói về đường truyền: mã hoá để người đứng giữa khó đọc, và xác nhận bạn đang nói chuyện với đúng tên miền. Nó không xác minh chủ trang trung thực, không kiểm duyệt nội dung và không quét phần mềm độc hại, nên ba phương án còn lại đều gán cho ổ khoá những việc nó không làm.",
      },
      {
        question: "Vì sao một trang lừa đảo vẫn có thể hiện ổ khoá?",
        options: [
          "Ai cũng xin được chứng nhận cho tên miền của chính mình",
          "Kẻ lừa đảo đánh cắp chứng nhận của chính ngân hàng thật để dùng",
          "Khoá chỉ hiện khi nhà nước đã cho phép trang đó hoạt động",
          "Trình duyệt bị lỗi nên hiện khoá cho cả những trang không an toàn",
        ],
        correct: 0,
        explanation:
          "Chứng nhận chỉ chứng minh người xin đang quản lý tên miền đó, kể cả tên miền giả mạo. Không cần đánh cắp gì của ngân hàng thật. Nhà nước không cấp phép từng trang cho ổ khoá, và đây không phải lỗi trình duyệt mà là cách hệ thống chứng nhận vốn hoạt động.",
      },
      {
        question: "Bạn mở link trong tin nhắn, trang có ổ khoá và đòi mật khẩu. Việc đầu tiên nên làm?",
        options: [
          "Đọc kỹ tên miền trên thanh địa chỉ, hoặc tự gõ địa chỉ quen thuộc",
          "Nhập thử một mật khẩu cũ không quan trọng, nếu trang báo sai thì mới nghi ngờ",
          "Kiểm tra giao diện có giống trang thật không",
          "Bấm vào ổ khoá, thấy có tên công ty là yên tâm",
        ],
        correct: 0,
        explanation:
          "Giao diện giống hệt là điều kẻ lừa đảo làm đầu tiên nên không phải bằng chứng. Nhập thử mật khẩu cũ là đưa mật khẩu cho trang chưa kiểm chứng. Thông tin trong ổ khoá không thay cho việc xem tên miền và cách mở trang: từ link lạ hay từ địa chỉ bạn tự gõ.",
      },
      {
        question: "Ổ khoá HTTPS giúp bảo vệ bạn tốt nhất trong tình huống nào?",
        options: [
          "Bạn dùng chung Wi-Fi quán cà phê và có người muốn đọc lén dữ liệu bạn gửi",
          "Bạn mở một tệp đính kèm lạ gửi qua email từ một người không quen biết bên công ty khác",
          "Bạn nhập mật khẩu vào trang giả có tên miền na ná trang thật",
          "Bạn cài một ứng dụng lấy từ nguồn không rõ ràng",
        ],
        correct: 0,
        explanation:
          "Mã hoá đường truyền đúng là nhằm chống người nghe lén trên đường đi, như trên mạng chung. Nó không ngăn tệp độc hại bạn tự mở, không ngăn bạn tự nhập mật khẩu vào trang giả, và không kiểm tra ứng dụng bạn cài.",
      },
      {
        question: "Một trang nội bộ công ty không có ổ khoá. Kết luận nào hợp lý nhất?",
        options: [
          "Nên hỏi IT trước khi nhập thông tin nhạy cảm vào",
          "Trang chắc chắn đã bị hack",
          "Trang chắc chắn là trang giả mạo nên xoá ngay khỏi máy",
          "Không sao, vì nội bộ thì luôn an toàn hơn mạng ngoài",
        ],
        correct: 0,
        explanation:
          "Thiếu ổ khoá nghĩa là đường truyền không được mã hoá, nên thông tin nhạy cảm có thể bị đọc. Điều đó chưa chứng minh trang bị hack hay giả mạo, nhưng cũng không có lý do để coi nội bộ là mặc nhiên an toàn. Cách hợp lý là hỏi người phụ trách.",
      },
    ],
    keyTakeaways: [
      "Ổ khoá nghĩa là: đường truyền được mã hoá và trang đúng là chủ của tên miền trên thanh địa chỉ.",
      "Ổ khoá không nói trang trung thực, không nói trang của tổ chức bạn nghĩ tới.",
      "Trang lừa đảo vẫn xin được ổ khoá cho tên miền riêng của nó.",
      "Kiểm tên miền và cách bạn tới trang quan trọng hơn hình ổ khoá.",
      "Trang không có ổ khoá thì đừng nhập thông tin nhạy cảm vào.",
    ],
    practicePrompt: {
      question:
        "Chị Mai mở link trong email, thấy ổ khoá và giao diện y hệt trang ngân hàng nên nhập mật khẩu. Sai sót lớn nhất của chị là gì?",
      options: [
        "Coi ổ khoá và giao diện là bằng chứng trang đúng của ngân hàng",
        "Dùng mật khẩu dài hơn mức cần thiết cho trang ngân hàng",
        "Mở trang bằng trình duyệt thay vì ứng dụng của điện thoại",
        "Mở email vào buổi sáng thay vì buổi chiều khi đầu óc còn tỉnh táo hơn",
      ],
      correct: 0,
      explanation:
        "Giao diện có thể sao chép y hệt và ổ khoá chỉ nói về đường truyền, không nói về chủ trang. Việc cần làm là xem tên miền hoặc tự gõ địa chỉ quen thuộc. Độ dài mật khẩu, trình duyệt hay giờ mở email không phải nguyên nhân trang giả lấy được mật khẩu.",
    },
    summary: {
      keyIdea: "Ổ khoá nói đường truyền kín, không nói người ở đầu kia đáng tin.",
      formula: "Ổ khoá + tên miền đúng + bạn tự tìm tới trang = mới đủ yên tâm.",
      commonMistake: "Thấy ổ khoá rồi nhập mật khẩu vào trang mở từ link lạ.",
      action: "Lần tới mở trang đòi mật khẩu, đọc to tên miền trước khi gõ gì.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở ba trang bạn dùng hằng ngày (email, ngân hàng hoặc ví điện tử, công cụ công ty). Với mỗi trang, chụp hoặc chép lại phần tên miền trên thanh địa chỉ và ghi chắc chắn rằng bạn vào bằng cách tự gõ hay dùng dấu trang. Sau đó tìm trong hộp thư một email có link nhờ bạn đăng nhập và đọc tên miền của nó từng chữ một. Ghi lại kết quả để tối mai đối chiếu.",
      secondary: "Nếu bạn thấy tên miền nào lạ, đừng bấm: chuyển cho IT hoặc bộ phận an ninh thông tin.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, một tin nhắn báo tài khoản sắp bị khoá. Trang mở ra có ổ khoá nhỏ và giao diện quen mắt. Bài này giúp bạn biết ổ khoá ấy hứa điều gì, và điều gì nó chưa hề hứa.",
      },
      {
        type: "feynman",
        title: "Ổ khoá HTTPS đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một phong bì niêm phong gửi qua bưu điện: người đưa thư không bóc xem được, và bưu điện xác nhận thư đi đúng địa chỉ ghi ngoài bì. Nhưng phong bì kín không bảo đảm người viết thư là người tử tế.",
        columns: ["Thành phần", "Phong bì niêm phong", "Trang có ổ khoá HTTPS"],
        rows: [
          ["Người đưa thư / người nghe lén", "Không bóc xem được", "Khó đọc được dữ liệu đi đường"],
          ["Địa chỉ", "Đúng địa chỉ ghi ngoài bì", "Đúng trang giữ tên miền trên thanh địa chỉ"],
          ["Người viết thư", "Không ai xác nhận người viết tốt hay xấu", "Không ai xác nhận chủ trang tốt hay xấu"],
          ["Việc bạn phải tự làm", "Xem người gửi có quen không", "Xem tên miền có đúng nơi mình định tới không"],
        ],
        oneLiner: "Ổ khoá là phong bì niêm phong: kín đường đi, nhưng không bảo đảm người gửi đáng tin.",
      },
      { type: "heading", text: "Vấn đề: một hình ảnh nhỏ gánh quá nhiều niềm tin" },
      {
        type: "paragraph",
        text: "Nhiều năm người ta dạy nhau 'nhớ tìm ổ khoá'. Lời dạy đó đúng với một nửa chuyện: trang đòi mật khẩu mà không có khoá thì đúng là đáng ngại. Nhưng chiều ngược lại không đúng. Ai sở hữu một tên miền, kể cả tên miền giả, cũng xin được khoá cho nó. Ổ khoá chứng minh bạn đang nói chuyện với chủ của tên miền ghi trên thanh địa chỉ. Còn chủ đó là ngân hàng thật hay kẻ mạo danh thì chỉ có tên miền và thói quen của bạn trả lời.",
      },
      {
        type: "flow",
        title: "Khi bạn mở một trang có ổ khoá, chuyện gì xảy ra",
        steps: [
          { label: "Trình duyệt hỏi tên", detail: "Bạn gõ hoặc bấm vào một địa chỉ. Trình duyệt tìm máy chủ giữ tên miền đó và bắt đầu nói chuyện." },
          { label: "Trang xuất trình giấy chứng nhận", detail: "Trang đưa ra một giấy chứng nhận cho tên miền, do một tổ chức chuyên cấp giấy phát hành. Trình duyệt kiểm giấy còn hạn và đúng tên miền." },
          { label: "Hai bên thống nhất mã khoá", detail: "Nếu giấy hợp lệ, hai bên cùng tạo một mã dùng riêng cho phiên này. Người đứng giữa nhìn thấy dữ liệu nhưng khó đọc được." },
          { label: "Ổ khoá hiện lên", detail: "Trình duyệt hiện ổ khoá nghĩa là hai bước trên đã qua. Nó hoàn toàn không đánh giá chủ trang là ai hay trang có trung thực không." },
          { label: "Bạn là chốt cuối", detail: "Bạn đọc tên miền, nhớ mình tới bằng cách nào (tự gõ hay từ link lạ) rồi mới quyết định nhập gì vào trang." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ổ khoá cho bạn biết",
          text: "Dữ liệu đi giữa bạn và trang được mã hoá. Bạn đang kết nối đúng với trang giữ tên miền hiện trên thanh địa chỉ. Giấy chứng nhận còn hạn và hợp lệ với trình duyệt.",
        },
        right: {
          label: "Ổ khoá KHÔNG cho bạn biết",
          text: "Chủ trang có phải tổ chức bạn nghĩ hay không. Trang có ý đồ lừa đảo hay không. Trang có phần mềm độc hại hay không. Nội dung trang đúng hay sai.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản giải thích về ổ khoá do AI viết",
        task: "Đồng nghiệp nhờ AI viết một đoạn 'cách nhận biết trang an toàn' để dán vào nhóm chat. Đánh dấu những câu sai hoặc dễ làm người đọc hiểu nhầm.",
        segments: [
          { text: "Ổ khoá HTTPS nghĩa là dữ liệu đi giữa bạn và trang được mã hoá." },
          {
            text: "Vì vậy trang có ổ khoá đã được xác minh là an toàn, bạn có thể nhập mật khẩu thoải mái.",
            error: "Sai: ổ khoá chỉ nói về đường truyền. Trang lừa đảo vẫn xin được ổ khoá cho tên miền riêng, nên khoá không chứng minh trang an toàn.",
          },
          { text: "Hãy luôn đọc kỹ tên miền trên thanh địa chỉ, nhất là khi tới trang từ một đường link." },
          {
            text: "Theo quy định, cơ quan nhà nước kiểm duyệt từng trang trước khi trang được phép hiện ổ khoá.",
            error: "Bịa: không có cơ quan nào duyệt từng trang cho ổ khoá hiện. Câu này nghe chắc chắn nhưng AI không đưa nguồn và không đúng với cách hệ thống chứng nhận hoạt động.",
          },
          { text: "Với thông tin quan trọng, nên tự gõ địa chỉ quen thuộc thay vì bấm link trong tin nhắn." },
        ],
      },
      {
        type: "callout",
        label: "Một thói quen đáng tập",
        text: "Trước khi gõ mật khẩu vào bất cứ trang nào, hãy tự hỏi: 'Mình tới trang này bằng cách nào?'. Nếu đáp án là 'bấm link ai đó gửi', hãy đóng lại và tự gõ hoặc mở từ dấu trang bạn đã lưu.",
      },
      {
        type: "scenario",
        title: "Tin nhắn báo tài khoản bị khoá",
        start: "s1",
        nodes: {
          s1: {
            text: "Điện thoại báo tin: 'Tài khoản của bạn sắp bị khoá, bấm vào đây để xác nhận.' Bạn bấm và thấy trang có ổ khoá, logo quen thuộc, ô đòi mật khẩu.",
            choices: [
              { label: "Có ổ khoá và logo rồi, nhập mật khẩu cho nhanh", next: "bad_enter" },
              { label: "Dừng lại, đóng trang và tự kiểm tra bằng cách khác", next: "s2" },
            ],
          },
          bad_enter: {
            text: "Tên miền thật ra có thêm vài chữ lạ phía sau tên ngân hàng. Bạn vừa đưa mật khẩu cho người lạ, và vài phút sau có một giao dịch bạn không thực hiện.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đóng trang. Bạn muốn biết tài khoản có thật sự bị khoá hay không.",
            choices: [
              { label: "Tự gõ địa chỉ ngân hàng hoặc mở ứng dụng chính thức rồi xem thông báo trong đó", next: "s3" },
              { label: "Gọi số điện thoại ghi ở cuối tin nhắn để hỏi", next: "bad_call" },
            ],
          },
          bad_call: {
            text: "Số điện thoại trong tin nhắn cũng do kẻ gửi tin đặt ra. Người bắt máy nói rất chuyên nghiệp và xin bạn đọc mã xác thực.",
            ending: "bad",
          },
          s3: {
            text: "Trong ứng dụng chính thức không có cảnh báo khoá nào. Còn tin nhắn kia thì sao?",
            choices: [
              { label: "Chuyển tin cho bộ phận IT hoặc ngân hàng theo số chính thức rồi xoá", next: "good" },
              { label: "Bỏ qua, chờ xem có ai khác bị không", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Tin nhắn tới nhiều đồng nghiệp. Một người bên cạnh đã nhập mật khẩu vào trang đó, và không ai kịp cảnh báo vì bạn im lặng.",
            ending: "bad",
          },
          good: {
            text: "Bạn thông báo cho người phụ trách, họ nhắc cả phòng không bấm vào tin nhắn này. Không ai mất mật khẩu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Khi trang đòi thông tin nhạy cảm, đọc tên miền từng chữ.",
          "Bước 2 - Nhớ lại: mình tới đây bằng cách tự gõ, dấu trang, hay link ai đó gửi?",
          "Bước 3 - Nếu tới từ link lạ, đóng lại và tự mở địa chỉ chính thức.",
          "Bước 4 - Không có ổ khoá thì không nhập thông tin nhạy cảm; có ổ khoá vẫn chưa đủ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ổ khoá bảo vệ con đường, còn người đi trên đường vẫn là bạn.",
          "Bài sau: trang của bạn báo 'không tìm thấy' và bạn lần theo từng chặng để tìm chỗ hỏng.",
        ],
      },
    ],
  },
  {
    id: 2586,
    slug: "cau-hinh-sai-tro-tenmien-ve-noi-khac",
    title: "Chặng 59, Bài 7: Tên miền trỏ nhầm chỗ: đọc lỗi khi trang không mở được",
    subtitle: "Danh bạ ghi sai số thì gọi nhầm nhà: tên miền trỏ sai thì trang thật vẫn sống mà không ai tới được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi trang báo 'không tìm thấy', người ta thường hoảng và mua thêm dịch vụ hoặc làm lại từ đầu. Phần lớn lỗi nằm ở một trong vài chặng nối tên miền với nơi đặt trang. Biết kiểm từng chặng tiết kiệm cho bạn cả buổi và đúng câu hỏi để hỏi người kỹ thuật.",
    openingQuestion:
      "Bạn vừa đổi nơi đặt trang của công ty. Sáng hôm sau đồng nghiệp báo mở địa chỉ cũ thì hiện 'không tìm thấy', trong khi bạn mở thẳng địa chỉ của nơi đặt mới thì trang vẫn chạy. Nghi ngờ hợp lý nhất là gì?",
    openingOptions: [
      "Tên miền vẫn trỏ về chỗ cũ hoặc chưa được trỏ sang chỗ mới",
      "Trang bị hỏng hoàn toàn và phải làm lại từ đầu, dù chỉ đổi nơi đặt",
      "Nơi đặt mới bị hacker tấn công trong đêm qua",
      "Trình duyệt của đồng nghiệp cần được cài lại",
    ],
    correctOption: 0,
    explanation:
      "Trang chạy khi mở bằng địa chỉ riêng của nơi đặt mới nghĩa là bản thân trang không hỏng. Chỗ hỏng nằm ở đường nối: tên miền đang chỉ vào nơi cũ, hoặc thay đổi mới chưa lan ra khắp nơi. Đây là lỗi cấu hình thường gặp sau khi chuyển nơi đặt. Làm lại từ đầu hay cài lại trình duyệt không chạm vào nguyên nhân thật, và không có dấu hiệu nào cho thấy nơi đặt mới bị tấn công.",
    diagram: [
      { label: "Người dùng gõ tên miền", arrow: true },
      { label: "Danh bạ tên miền (bản ghi DNS) chỉ ra địa chỉ máy chủ", arrow: true },
      { label: "Nơi đặt trang nhận yêu cầu và tìm đúng trang", arrow: true },
      { label: "Trang hiện ra; hỏng ở chặng nào thì lỗi hiện khác nhau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm nhỏ chuyển trang giới thiệu sang nơi đặt mới vào cuối tuần. Thứ Hai, một nửa đồng nghiệp vào trang cũ vẫn thấy bản cũ, nửa còn lại thấy lỗi. Người phụ trách kiểm bản ghi trong danh bạ tên miền, thấy vẫn còn địa chỉ cũ và một địa chỉ mới bị gõ nhầm một chữ số. Sửa lại một dòng thì trang mở bình thường.",
    },
    quiz: [
      {
        question: "Trang chạy bình thường khi mở bằng địa chỉ của nơi đặt, nhưng không mở bằng tên miền. Nên kiểm chặng nào trước?",
        options: [
          "Bản ghi trong danh bạ tên miền xem có trỏ đúng nơi đặt không",
          "Nội dung các trang xem có tệp hình ảnh hoặc chữ nào bị hỏng hay thiếu không",
          "Thiết bị của từng người dùng xem có cần cài lại hệ điều hành không",
          "Gói dịch vụ của nơi đặt xem có cần nâng cấp lên mức cao hơn để chịu được nhiều người truy cập",
        ],
        correct: 0,
        explanation:
          "Trang đã chạy được ở nơi đặt nên nội dung và gói dịch vụ không phải thủ phạm. Đường nối giữa tên miền và nơi đặt là chỗ chưa được kiểm. Cài lại hệ điều hành của từng người là việc quá lớn so với một lỗi nằm ở cấu hình chung.",
      },
      {
        question: "Bản ghi DNS của tên miền giống thứ gì nhất trong đời thường?",
        options: [
          "Một dòng trong danh bạ: tên cửa hàng đi với một địa chỉ",
          "Bản sao lưu toàn bộ nội dung trang để khôi phục lại phòng khi trang hỏng",
          "Ổ khoá bảo vệ trang khỏi người lạ truy cập trái phép vào bên trong",
          "Hợp đồng thuê chỗ đặt trang với nhà cung cấp dịch vụ trong một năm",
        ],
        correct: 0,
        explanation:
          "DNS làm đúng việc một danh bạ làm: nhận một cái tên và trả về nơi cần tới. Nó không lưu nội dung trang như bản sao lưu, không mã hoá như ổ khoá, và không phải hợp đồng thuê chỗ, vốn là thoả thuận riêng với nhà cung cấp.",
      },
      {
        question: "Bạn sửa bản ghi tên miền lúc 9 giờ sáng, 10 giờ vẫn còn người mở ra trang cũ. Cách nghĩ nào hợp lý?",
        options: [
          "Thay đổi có thể mất một thời gian để lan ra, nên chờ và kiểm lại",
          "Sửa sai rồi, cần xoá toàn bộ bản ghi và làm lại ngay từ đầu để hệ thống nhận giá trị mới sạch sẽ",
          "Nhà cung cấp tên miền đang cố tình chặn việc thay đổi của bạn",
          "Chắc chắn máy chủ bị hỏng, phải gọi cho nơi đặt trang ngay",
        ],
        correct: 0,
        explanation:
          "Danh bạ tên miền được nhiều nơi ghi nhớ tạm để chạy nhanh, nên thay đổi mất một lúc mới tới mọi người, có khi vài phút, có khi lâu hơn. Xoá làm lại sẽ tạo thêm khoảng trống. Nhà cung cấp không chặn bạn, và máy chủ vẫn chạy: đó chỉ là chờ thay đổi lan tới.",
      },
      {
        question: "Bạn mở trang, thấy báo tên miền 'đã hết hạn' hoặc trang của một nhà đăng ký. Điều gì nhiều khả năng xảy ra?",
        options: [
          "Tên miền chưa được gia hạn đúng hạn",
          "Nơi đặt trang bị quá tải vì có quá nhiều người truy cập cùng lúc",
          "Mạng internet của bạn đang bị chặn bởi nhà mạng địa phương",
          "Tệp giao diện của trang bị lỗi và cần được tải lại từ đầu",
        ],
        correct: 0,
        explanation:
          "Khi tên miền hết hạn, nhà đăng ký thường đổi bản ghi sang trang thông báo của họ. Quá tải cho lỗi khác (chậm hoặc báo bận), nhà mạng chặn thường làm mọi trang cùng hỏng, còn tệp giao diện lỗi chỉ làm trang hiển thị xấu chứ không thay cả địa chỉ.",
      },
      {
        question: "Bạn nhờ AI chẩn đoán lỗi 'không tìm thấy trang'. Câu trả lời nào đáng tin hơn?",
        options: [
          "Liệt kê các chặng có thể hỏng và nói rõ cách kiểm từng chặng",
          "Khẳng định chắc chắn do máy chủ hỏng, cần mua gói cao hơn",
          "Đưa ra một địa chỉ máy chủ cụ thể để bạn điền ngay vào bản ghi",
          "Bảo bạn gỡ hết mọi thứ và dựng lại trang từ đầu cho chắc chắn",
        ],
        correct: 0,
        explanation:
          "AI không nhìn thấy cấu hình thật của bạn nên chỉ hữu ích khi nêu các khả năng và cách kiểm. Câu khẳng định chắc chắn mà không có bằng chứng là đoán. Một địa chỉ máy chủ cụ thể do nó đưa ra có thể bịa. Gỡ hết làm lại là đòn nặng khi chưa biết nguyên nhân.",
      },
    ],
    keyTakeaways: [
      "Trang mở được bằng địa chỉ nơi đặt nhưng không mở bằng tên miền: nghi đường nối, chưa phải nội dung.",
      "Tên miền trỏ đúng nơi nhờ bản ghi trong danh bạ tên miền (DNS).",
      "Sửa bản ghi xong cần chờ thay đổi lan ra rồi mới kiểm lại.",
      "Hết hạn tên miền là nguyên nhân hay bị quên.",
      "Hỏi AI để lấy danh sách chặng cần kiểm, không để nó khẳng định nguyên nhân.",
    ],
    practicePrompt: {
      question:
        "Sau khi đổi nơi đặt, anh Nam mở tên miền thì báo 'không tìm thấy'. Anh liền mua gói cao hơn ở nơi đặt mới. Điều gì hợp lý hơn để làm trước?",
      options: [
        "Kiểm bản ghi tên miền có trỏ tới nơi đặt mới không",
        "Đổi sang một nơi đặt thứ ba để xem có chạy hơn không",
        "Xoá sạch trang cũ trước rồi mới nghĩ tiếp việc khác",
        "Nhắn cho toàn bộ khách hàng xin lỗi về sự cố kéo dài",
      ],
      correct: 0,
      explanation:
        "Lỗi 'không tìm thấy' sau khi đổi chỗ thường nằm ở đường nối tên miền. Mua gói cao hơn không sửa đường nối. Đổi nơi đặt thứ ba là lặp lại lỗi cũ, xoá trang cũ làm mất đường lui, và nhắn khách khi chưa biết nguyên nhân là quá sớm.",
    },
    summary: {
      keyIdea: "Trang còn sống mà không ai tới được thường là lỗi ở đường nối, không phải ở trang.",
      formula: "Tên miền còn hạn + bản ghi trỏ đúng + nơi đặt nhận tên miền = trang mở được.",
      commonMistake: "Mua thêm dịch vụ hoặc làm lại trang khi chưa kiểm bản ghi tên miền.",
      action: "Ghi ra giấy ba chặng: tên miền, bản ghi, nơi đặt - và ai quản lý từng chặng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một địa chỉ trang bạn biết (của công ty hoặc một trang cá nhân). Ghi ra ba thứ: tên miền là gì, ngày hết hạn là bao giờ (hỏi người đứng tên hoặc xem email nhắc gia hạn), và trang đang đặt ở đâu. Nếu không biết một thứ, viết 'cần hỏi' và tên người bạn sẽ hỏi. Dán bản ghi chú vào tài liệu chung của nhóm.",
      secondary: "Đặt một lời nhắc lịch trước ngày hết hạn tên miền 30 ngày.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay trang của bạn báo 'không tìm thấy', trong khi hôm qua vẫn chạy. Đừng vội làm lại từ đầu. Bài này dạy cách lần theo từng chặng từ tên miền tới nơi đặt trang để tìm đúng chỗ hỏng.",
      },
      {
        type: "feynman",
        title: "Tên miền trỏ đúng chỗ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cuốn danh bạ điện thoại: bạn tìm tên 'Tiệm bánh Hoa', danh bạ chỉ ra số điện thoại hoặc địa chỉ. Tiệm có thể vẫn mở cửa bình thường, nhưng nếu danh bạ ghi sai số thì khách gọi nhầm nhà.",
        columns: ["Thành phần", "Cuốn danh bạ", "Hệ thống tên miền"],
        rows: [
          ["Cái tên", "Tên tiệm bánh", "Tên miền, ví dụ tenmiencuaban.vn"],
          ["Địa chỉ được ghi", "Số điện thoại hoặc địa chỉ tiệm", "Địa chỉ máy chủ nơi đặt trang"],
          ["Khi chuyển tiệm", "Phải sửa lại danh bạ", "Phải sửa bản ghi tên miền"],
          ["Khi ghi sai", "Khách gọi nhầm nhà dù tiệm vẫn mở", "Trang vẫn chạy nhưng không ai tới được bằng tên miền"],
        ],
        oneLiner: "Tên miền là một dòng trong danh bạ: ghi sai nơi đến thì trang thật vẫn sống mà không ai tìm thấy.",
      },
      { type: "heading", text: "Vấn đề: hỏng ở chặng nào cũng chỉ thấy 'không mở được'" },
      {
        type: "paragraph",
        text: "Người dùng chỉ thấy một màn hình lỗi, dù nguyên nhân có thể ở một trong ba chặng: tên miền hết hạn, bản ghi trỏ sai, hoặc nơi đặt chưa biết tên miền đó thuộc về trang nào. Mỗi chặng do một bên khác nhau giữ. Kiểm theo thứ tự từ ngoài vào trong giúp bạn biết phải gọi ai thay vì đoán.",
      },
      {
        type: "flow",
        title: "Lần theo từng chặng khi trang không mở được",
        steps: [
          { label: "Chặng 1: tên miền còn hạn không", detail: "Xem ngày hết hạn ở nơi bạn mua tên miền. Hết hạn thì mọi thứ phía sau đều vô nghĩa." },
          { label: "Chặng 2: bản ghi trỏ đi đâu", detail: "Vào nơi quản lý tên miền, xem bản ghi chỉ tới địa chỉ nào. So với địa chỉ nơi đặt đưa cho bạn, từng ký tự một." },
          { label: "Chặng 3: thay đổi đã lan ra chưa", detail: "Sau khi sửa, cần chờ một lúc. Thử mở bằng mạng khác hoặc điện thoại dùng 4G để loại trừ trí nhớ tạm của máy." },
          { label: "Chặng 4: nơi đặt có biết tên miền không", detail: "Nhiều nơi đặt phải được khai báo tên miền nào thuộc trang nào. Chưa khai thì họ nhận yêu cầu nhưng không biết đưa trang nào." },
          { label: "Chặng 5: đọc thông điệp lỗi", detail: "Lỗi hiện ra thường gợi chặng hỏng. Ghi lại nguyên văn và ảnh chụp trước khi gọi người hỗ trợ." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lỗi ở đường nối",
          text: "Mở bằng địa chỉ nơi đặt thì được, mở bằng tên miền thì không. Người này thấy bản cũ, người kia thấy lỗi. Xảy ra ngay sau khi đổi nơi đặt hoặc sửa bản ghi.",
        },
        right: {
          label: "Lỗi ở chính trang",
          text: "Mở bằng mọi cách đều cùng một lỗi. Trang hiện nhưng thiếu ảnh, thiếu phần. Xảy ra sau khi bạn sửa nội dung hoặc cập nhật trang.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản chẩn đoán do AI viết",
        task: "Bạn mô tả cho AI: 'trang mở được bằng địa chỉ của nơi đặt nhưng không mở bằng tên miền'. Nó trả lời như dưới đây. Đánh dấu câu bịa hoặc khẳng định khi chưa có bằng chứng.",
        segments: [
          { text: "Khả năng cao là tên miền chưa trỏ đúng tới nơi đặt mới, hoặc thay đổi chưa kịp lan ra." },
          { text: "Bạn nên kiểm bản ghi tên miền và so địa chỉ với thông tin nơi đặt cung cấp." },
          {
            text: "Chắc chắn máy chủ của bạn đã hỏng và cần được thay thế ngay trong hôm nay.",
            error: "Bịa và mâu thuẫn: trang mở được bằng địa chỉ của nơi đặt, nghĩa là máy chủ vẫn chạy. AI khẳng định mà không có bằng chứng.",
          },
          {
            text: "Địa chỉ đúng cần điền vào bản ghi là 203.0.113.45, bạn điền nguyên giá trị này.",
            error: "Bịa: AI không biết địa chỉ thật của nơi đặt của bạn. Địa chỉ phải lấy từ thông tin nhà cung cấp, không lấy từ câu trả lời của AI.",
          },
          { text: "Sau khi sửa, chờ một lúc rồi thử mở bằng điện thoại dùng 4G để tránh trí nhớ tạm." },
        ],
      },
      {
        type: "callout",
        label: "Ghi lại trước khi sửa",
        text: "Trước khi đổi bất kỳ bản ghi nào, chụp ảnh giá trị đang có. Nếu sửa sai, bạn trả lại được ngay thay vì đoán xem lúc đầu nó như thế nào.",
      },
      {
        type: "scenario",
        title: "Trang báo 'không tìm thấy' sau khi chuyển chỗ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa chuyển trang sang nơi đặt mới tối qua. Sáng nay khách báo mở tên miền thì báo 'không tìm thấy'. Bạn mở thử địa chỉ riêng của nơi đặt mới: trang chạy tốt.",
            choices: [
              { label: "Xoá trang ở nơi đặt mới và dựng lại, vì chắc chắn trang bị lỗi", next: "bad_rebuild" },
              { label: "Vào nơi quản lý tên miền, xem bản ghi đang trỏ tới đâu", next: "s2" },
            ],
          },
          bad_rebuild: {
            text: "Bạn mất hai giờ dựng lại trang, vẫn báo 'không tìm thấy' vì bản ghi chưa hề được sửa. Khách chờ thêm cả buổi sáng.",
            ending: "bad",
          },
          s2: {
            text: "Bản ghi vẫn trỏ tới địa chỉ của nơi đặt cũ. Bạn cần sửa sang địa chỉ mới.",
            choices: [
              { label: "Chụp ảnh giá trị hiện tại, rồi điền địa chỉ mới lấy từ thông tin của nơi đặt", next: "s3" },
              { label: "Nhờ AI cho một địa chỉ thường dùng rồi điền luôn vào", next: "bad_ai" },
            ],
          },
          bad_ai: {
            text: "Địa chỉ AI đưa không thuộc về nơi đặt của bạn. Trang của bạn giờ trỏ sang một máy chủ lạ, còn khách thấy nội dung không phải của công ty.",
            ending: "bad",
          },
          s3: {
            text: "Bạn đã sửa. Hai mươi phút sau bạn vẫn thấy lỗi trên máy mình.",
            choices: [
              { label: "Thử bằng điện thoại dùng 4G, nếu chưa được thì chờ thêm rồi kiểm lại", next: "good" },
              { label: "Xoá hết bản ghi, tạo lại, rồi sửa tiếp mỗi năm phút", next: "bad_churn" },
            ],
          },
          bad_churn: {
            text: "Mỗi lần sửa làm thay đổi phải lan lại từ đầu, và bạn không còn biết giá trị nào đang được áp dụng. Sự cố kéo dài sang ngày hôm sau.",
            ending: "bad",
          },
          good: {
            text: "Trên điện thoại 4G trang đã mở đúng. Máy bạn vẫn giữ bản cũ tạm thời và tự cập nhật sau một lúc. Bạn báo khách thử lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mở thử bằng địa chỉ nơi đặt: chạy thì trang không hỏng.",
          "Bước 2 - Kiểm tên miền còn hạn và bản ghi trỏ đúng địa chỉ nơi đặt.",
          "Bước 3 - Sau khi sửa, thử bằng mạng khác và chờ thay đổi lan ra.",
          "Bước 4 - Chụp ảnh lỗi nguyên văn trước khi nhờ người hỗ trợ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Lỗi 'không tìm thấy' hiếm khi là cả trang hỏng; thường chỉ là một dòng trong danh bạ.",
          "Bài sau: thư gửi từ công cụ mới của bạn vào hộp spam, vì sao, và nhờ ai kiểm.",
        ],
      },
    ],
  },
  {
    id: 2587,
    slug: "email-cong-ty-va-ten-mien-ai-dang-gui-thu-thay-ban",
    title: "Chặng 59, Bài 8: Email công ty và tên miền: thư của bạn có bị vào hộp spam",
    subtitle: "Thư gửi đi phải chứng minh được 'tôi gửi thay công ty', không thì hộp thư người nhận nghi ngờ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ mới của bạn gửi thư xác nhận cho khách, và một nửa thư rơi vào mục spam. Khách tưởng bạn không gửi, còn bạn tưởng công cụ hỏng. Hiểu vì sao nó xảy ra giúp bạn nhờ đúng người kiểm đúng chỗ, thay vì đổi công cụ liên tục.",
    openingQuestion:
      "Bạn dựng biểu mẫu đăng ký, công cụ tự gửi thư xác nhận từ địa chỉ của công ty. Nhiều khách báo không nhận được thư, hoá ra nằm trong spam. Nguyên nhân thường gặp nhất là gì?",
    openingOptions: [
      "Tên miền chưa khai rằng công cụ này được phép gửi thư thay công ty",
      "Nội dung thư quá ngắn nên hệ thống coi là thư rác hàng loạt",
      "Khách dùng email miễn phí nên không thể nhận thư của công ty",
      "Công cụ gửi thư quá nhanh nên bị khoá tài khoản vĩnh viễn",
    ],
    correctOption: 0,
    explanation:
      "Hộp thư người nhận tự hỏi: thư này nói là từ công ty bạn, nhưng máy gửi có thật được công ty cho phép không? Câu trả lời nằm trong các khai báo gắn với tên miền của công ty. Nếu công cụ mới chưa được khai, thư bị nghi là giả mạo và vào spam. Nội dung ngắn hay loại email của khách thường không phải nguyên nhân chính, và việc khoá tài khoản vĩnh viễn không phải hiện tượng chung.",
    diagram: [
      { label: "Công cụ gửi thư mang địa chỉ @tenmiencongty", arrow: true },
      { label: "Hộp thư người nhận tra khai báo của tên miền đó", arrow: true },
      { label: "Khai báo có nêu công cụ này không, thư có chữ ký hợp lệ không", arrow: true },
      { label: "Có: vào hộp thư chính; không: nghi giả mạo, vào spam" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng chăm sóc khách hàng dùng công cụ mới để gửi thư cảm ơn. Sau tuần đầu, bộ phận IT mới thấy công cụ chưa được khai trong cấu hình email của tên miền công ty. Cô nhân viên không tự sửa cấu hình mà gửi IT tên công cụ, địa chỉ gửi và ảnh chụp thư nằm trong spam. IT khai bổ sung, thư đến hộp chính ở những lần gửi sau.",
    },
    quiz: [
      {
        question: "Vì sao hộp thư của người nhận nghi ngờ thư từ công cụ mới của bạn?",
        options: [
          "Công cụ chưa được khai là bên được phép gửi thư thay tên miền công ty",
          "Thư chứa hình ảnh và đường dẫn nên hộp thư tự coi là thư quảng cáo hàng loạt",
          "Địa chỉ người nhận chưa từng nhắn tin cho bạn",
          "Tên miền công ty mới quá nên bị chặn hoàn toàn mọi thư",
        ],
        correct: 0,
        explanation:
          "Hộp thư kiểm xem bên gửi có được chủ tên miền cho phép không. Hình ảnh hay việc người nhận chưa từng liên lạc không đủ làm thư vào spam vì thư hợp lệ gửi cho người lạ mỗi ngày. Tên miền mới không tự động bị chặn mọi thư.",
      },
      {
        question: "Có ba khai báo hay gặp (người ta gọi là SPF, DKIM, DMARC). Mục đích chung của chúng là gì?",
        options: [
          "Chứng minh thư đến từ bên được công ty cho phép, không bị giả mạo",
          "Nén dung lượng thư để thư đến hộp nhận nhanh hơn và tiết kiệm băng thông mạng",
          "Dịch nội dung thư sang ngôn ngữ của người nhận tự động",
          "Đếm số người đã mở thư để gửi báo cáo cho bộ phận marketing",
        ],
        correct: 0,
        explanation:
          "Cả ba là cách tên miền khai: ai được gửi thư mang tên mình, thư có chữ ký đúng không, và thư đáng ngờ thì xử lý thế nào. Chúng không nén thư, không dịch thư và không theo dõi lượt mở, mặc dù việc theo dõi lượt mở là tính năng riêng của một số công cụ.",
      },
      {
        question: "Bạn nghi thư bị vào spam vì cấu hình tên miền. Ai nên là người sửa cấu hình đó?",
        options: [
          "Người quản lý tên miền hoặc IT, sau khi bạn đưa đủ thông tin công cụ",
          "Bạn tự sửa ngay bằng cách làm theo câu trả lời AI vừa đưa ra",
          "Khách hàng nhận thư, bằng cách thêm địa chỉ gửi vào danh sách tin cậy",
          "Nhà cung cấp công cụ gửi thư sửa thay bạn mà không cần ai cho phép",
        ],
        correct: 0,
        explanation:
          "Khai báo nằm trong tên miền của công ty nên chỉ người quản lý nó sửa được, nên việc của bạn là chuẩn bị đủ thông tin. Sửa theo câu trả lời AI khi chưa rõ hệ thống có thể làm hỏng thư của cả công ty. Nhờ khách thêm địa chỉ không giải quyết cho người khác, còn nhà cung cấp công cụ không tự vào tên miền của bạn được.",
      },
      {
        question: "Thông tin nào nên gửi cho IT khi báo thư vào spam?",
        options: [
          "Tên công cụ, địa chỉ gửi thư, một thư mẫu nằm trong spam và thời điểm gửi",
          "Mật khẩu tài khoản quản trị công cụ gửi thư và mật khẩu email cá nhân của bạn",
          "Toàn bộ danh sách khách đã nhận thư",
          "Một bản tóm tắt dài về cảm nhận của bạn với công cụ",
        ],
        correct: 0,
        explanation:
          "IT cần biết công cụ nào, gửi từ địa chỉ nào và một ví dụ cụ thể để kiểm đúng chỗ. Mật khẩu quản trị là thông tin không chia sẻ qua tin nhắn, danh sách khách không cần để tìm lỗi cấu hình, và cảm nhận chung chung không giúp xác định nguyên nhân.",
      },
      {
        question: "Bạn chưa rõ khai báo email có tác dụng gì. Cách dùng AI nào hợp lý nhất?",
        options: [
          "Nhờ AI giải thích khái niệm, rồi đưa câu hỏi cụ thể cho IT kiểm",
          "Nhờ AI viết sẵn dòng cấu hình và dán vào tên miền ngay",
          "Nhờ AI kiểm tên miền thật của công ty và báo lại cho bạn tình trạng",
          "Nhờ AI cam đoan thư sẽ vào hộp chính sau khi làm theo bạn hướng dẫn",
        ],
        correct: 0,
        explanation:
          "AI giỏi giải thích khái niệm và soạn danh sách câu hỏi. Nó không nhìn được cấu hình thật, nên không báo được tình trạng, và dòng cấu hình sai dán vào tên miền có thể làm cả thư công ty bị từ chối. Nó cũng không thể cam đoan thư vào hộp chính.",
      },
    ],
    keyTakeaways: [
      "Thư gửi từ công cụ mới cần được tên miền công ty khai là 'được phép gửi thay'.",
      "Ba khai báo thường nghe nhắc là SPF, DKIM và DMARC - bạn chưa cần tự cấu hình, chỉ cần biết chúng tồn tại.",
      "Thư bị nghi ngờ thường vào spam, không phải 'mất'.",
      "Người quản lý tên miền hoặc IT mới là người sửa; bạn chuẩn bị thông tin đầy đủ cho họ.",
      "AI giúp giải thích và soạn câu hỏi, không thay việc kiểm cấu hình thật.",
    ],
    practicePrompt: {
      question:
        "Chị Thu thấy thư xác nhận từ công cụ mới vào spam, liền nhờ AI viết dòng cấu hình và tự dán vào tên miền của công ty. Điều gì đáng lo nhất?",
      options: [
        "Dòng cấu hình sai có thể làm cả thư công ty bị từ chối",
        "Thư sẽ quá ngắn so với mức tiêu chuẩn của hộp thư",
        "Khách hàng sẽ không nhìn thấy tên công ty ở đầu thư",
        "Công cụ gửi thư sẽ tự động bị khoá trong vòng 24 giờ sau đó",
      ],
      correct: 0,
      explanation:
        "Khai báo email áp dụng cho mọi thư gửi từ tên miền, nên một dòng sai có thể làm hỏng cả thư của các phòng khác. Độ dài thư, tên hiển thị hay việc khoá công cụ không phải hệ quả trực tiếp. Việc này cần người quản lý tên miền kiểm.",
    },
    summary: {
      keyIdea: "Thư chỉ đến hộp chính khi tên miền công ty nói rõ công cụ gửi là bên được phép.",
      formula: "Công cụ gửi thư + khai báo của tên miền + chữ ký hợp lệ = thư tin cậy hơn.",
      commonMistake: "Tự dán cấu hình do AI viết vào tên miền, hoặc đổi liên tục công cụ khi chưa kiểm khai báo.",
      action: "Gửi thử một thư từ công cụ tới email cá nhân và ghi lại thư nằm ở hộp chính hay spam.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ của công ty hoặc của bạn có gửi thư tự động (biểu mẫu, hệ thống đặt lịch, bản tin). Gửi thử một thư tới hai địa chỉ email khác nhau của bạn, ghi lại thư vào hộp chính hay spam. Nếu có thư vào spam, soạn sẵn một tin gửi IT gồm: tên công cụ, địa chỉ gửi, ảnh chụp thư trong spam và giờ gửi. Không gửi mật khẩu.",
      secondary: "Ghi chú tên người quản lý tên miền để lần sau biết gọi ai.",
    },
    sections: [
      {
        type: "lead",
        text: "Công cụ mới của bạn gửi thư cho khách, và một số thư rơi thẳng vào spam. Bài này giải thích vì sao hộp thư người nhận lại nghi ngờ, và bạn cần nhờ ai, cung cấp thông tin gì để kiểm.",
      },
      {
        type: "feynman",
        title: "Email công ty và tên miền đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một lá thư có con dấu của công ty. Người nhận nhìn dấu và tự hỏi: dấu này có thật là của công ty không, người đóng dấu có được phép không? Tên miền công ty giữ danh sách những ai được phép đóng dấu đó.",
        columns: ["Thành phần", "Thư giấy có dấu công ty", "Email từ tên miền công ty"],
        rows: [
          ["Con dấu", "Dấu đỏ của công ty", "Địa chỉ gửi có đuôi tên miền công ty"],
          ["Danh sách người được đóng dấu", "Sổ đăng ký người có quyền ký", "Khai báo trong tên miền: bên nào được gửi thay"],
          ["Chữ ký", "Chữ ký tay của người có thẩm quyền", "Chữ ký số gắn vào thư để chứng minh không bị sửa"],
          ["Người nhận nghi ngờ", "Thư không có dấu hợp lệ thì bỏ vào thùng", "Thư không khớp khai báo thì vào spam"],
        ],
        oneLiner: "Tên miền giữ danh sách 'ai được gửi thư mang tên công ty'; công cụ chưa có trong danh sách thì thư bị nghi.",
      },
      { type: "heading", text: "Vấn đề: thư đúng nội dung nhưng vẫn bị nghi ngờ" },
      {
        type: "paragraph",
        text: "Ai cũng có thể gõ một địa chỉ gửi bất kỳ vào một thư, và đó là cách kẻ lừa đảo giả danh công ty. Vì vậy hộp thư của người nhận không tin địa chỉ gửi, mà kiểm xem tên miền có xác nhận bên gửi hay không. Công cụ mới của bạn gửi thay tên công ty nhưng công ty chưa báo điều đó cho thế giới, nên thư bị coi là đáng ngờ dù nội dung hoàn toàn đúng.",
      },
      {
        type: "flow",
        title: "Hộp thư người nhận quyết định thế nào",
        steps: [
          { label: "Thư tới với địa chỉ gửi @tenmiencongty", detail: "Công cụ của bạn gửi thư, ghi địa chỉ của công ty ở chỗ người gửi." },
          { label: "Hộp thư tra tên miền", detail: "Hộp thư của người nhận tìm khai báo mà tên miền công ty đã công bố: những bên nào được phép gửi." },
          { label: "So khớp bên gửi", detail: "Nếu máy vừa gửi thư nằm trong danh sách được phép, bước này qua. Nếu không, thư bị đánh dấu đáng ngờ." },
          { label: "Kiểm chữ ký", detail: "Thư có thể mang chữ ký số do công ty cấp. Chữ ký khớp nghĩa là thư không bị sửa trên đường đi." },
          { label: "Quyết định", detail: "Qua hết: thư vào hộp chính. Không qua: thư vào spam, hoặc bị từ chối tuỳ quy định công ty đặt cho tên miền." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Việc của bạn",
          text: "Nhận ra triệu chứng: thư vào spam. Ghi lại tên công cụ, địa chỉ gửi, ảnh thư trong spam, giờ gửi. Gửi đủ thông tin cho IT. Kiểm lại sau khi IT báo đã khai.",
        },
        right: {
          label: "Việc của người quản lý tên miền",
          text: "Xem khai báo hiện có của tên miền. Bổ sung bên gửi mới vào danh sách được phép. Bật chữ ký cho thư từ công cụ. Quyết định cách xử lý thư đáng ngờ của toàn công ty.",
        },
      },
      {
        type: "callout",
        label: "Đừng tự sửa tên miền chỉ vì AI đưa dòng cấu hình",
        text: "Khai báo email áp dụng cho mọi thư từ tên miền công ty. Một dòng sai có thể làm thư của cả công ty bị từ chối. Nếu không phải người quản lý tên miền, hãy gửi thông tin cho người đó và để họ làm.",
      },
      {
        type: "scenario",
        title: "Thư xác nhận vào spam, làm gì",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi thử một thư xác nhận từ công cụ mới tới email cá nhân: thư nằm trong mục spam. Khách cũng báo vài trường hợp tương tự.",
            choices: [
              { label: "Đổi sang một công cụ gửi thư khác để xem có hơn không", next: "bad_swap" },
              { label: "Ghi lại tên công cụ, địa chỉ gửi, ảnh thư trong spam rồi báo IT", next: "s2" },
            ],
          },
          bad_swap: {
            text: "Công cụ thứ hai cũng chưa được tên miền khai, nên thư lại vào spam. Bạn mất cả tuần thử công cụ mà nguyên nhân vẫn còn nguyên.",
            ending: "bad",
          },
          s2: {
            text: "IT xem khai báo của tên miền và hỏi bạn thêm thông tin. Họ cần biết công cụ nào đang gửi thay.",
            choices: [
              { label: "Gửi tên công cụ và địa chỉ gửi, không gửi mật khẩu", next: "s3" },
              { label: "Gửi luôn mật khẩu quản trị công cụ để IT tự vào xem", next: "bad_pwd" },
            ],
          },
          bad_pwd: {
            text: "Mật khẩu nằm trong tin nhắn chat chung của nhóm. Một người ngoài nhóm đọc được và đổi cấu hình công cụ.",
            ending: "bad",
          },
          s3: {
            text: "IT bổ sung công cụ vào danh sách được phép. Bạn cần biết việc đã hoạt động hay chưa.",
            choices: [
              { label: "Gửi thử lại tới hai email khác nhau và xem thư nằm ở đâu", next: "good" },
              { label: "Tin là đã xong và báo khách mọi thứ bình thường", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Thay đổi chưa áp dụng hết, vài thư tiếp theo vẫn vào spam, và khách được bạn báo 'đã ổn' lại càng thấy thiếu chuyên nghiệp.",
            ending: "bad",
          },
          good: {
            text: "Cả hai thư đều vào hộp chính. Bạn ghi lại ngày IT sửa để sau này có công cụ mới thì biết phải báo cho ai.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gửi thử từ công cụ tới hai email khác nhau, ghi thư vào hộp chính hay spam.",
          "Bước 2 - Chuẩn bị tên công cụ, địa chỉ gửi, ảnh thư trong spam, giờ gửi.",
          "Bước 3 - Gửi IT hoặc người quản lý tên miền, không gửi mật khẩu.",
          "Bước 4 - Sau khi họ sửa, gửi thử lại và xác nhận.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thư vào spam thường không mất, chỉ đang chờ tên miền xác nhận bạn là người gửi hợp lệ.",
          "Bài sau: vẽ sơ đồ đường đi từ tên miền tới trang của bạn và ghi ai quản lý từng chặng.",
        ],
      },
    ],
  },
  {
    id: 2588,
    slug: "du-an-nho-so-do-tu-ten-mien-toi-trang-cua-ban",
    title: "Chặng 59, Bài 9: Dự án nhỏ: vẽ sơ đồ đường đi từ tên miền tới trang của bạn",
    subtitle: "Một tờ giấy ghi 'chặng nào, ai giữ, gọi ai khi hỏng' đáng giá hơn một buổi chiều đoán mò.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi trang chết lúc 8 giờ tối, phần lớn thời gian mất vào việc tìm xem ai giữ chìa khoá của chặng nào. Một sơ đồ một trang, làm khi mọi thứ còn bình thường, rút giờ xử lý sự cố từ hàng giờ xuống vài phút.",
    openingQuestion:
      "Trang của nhóm bạn hỏng, nhưng người dựng trang đã nghỉ việc và không ai nhớ tên miền mua ở đâu. Điều gì lẽ ra đã giúp nhiều nhất?",
    openingOptions: [
      "Một sơ đồ ghi từng chặng, ai quản lý và đăng nhập ở đâu",
      "Một nơi đặt trang đắt tiền hơn với bảo hành đặc biệt từ nhà cung cấp",
      "Một bản sao nội dung trang lưu trong điện thoại người dựng",
      "Một nhóm chat riêng cho người dựng và người từng trực trang",
    ],
    correctOption: 0,
    explanation:
      "Sự cố kéo dài thường vì không ai biết chặng nào do ai giữ, chứ không phải vì thiếu tiền hay thiếu công nghệ. Sơ đồ ghi rõ tên miền mua ở đâu, bản ghi nằm ở đâu, trang đặt ở đâu và người nào đứng tên từng tài khoản thì bất kỳ ai cũng biết gọi ai. Nơi đặt đắt hơn không bù được việc mất dấu tài khoản, bản sao trên điện thoại không chỉ đường, và nhóm chat không thay cho bản ghi chép cố định.",
    diagram: [
      { label: "Tên miền: mua ở đâu, ai đứng tên, hết hạn khi nào", arrow: true },
      { label: "Danh bạ tên miền: bản ghi nằm ở đâu, ai sửa được", arrow: true },
      { label: "Nơi đặt trang: nhà cung cấp, ai đăng nhập", arrow: true },
      { label: "Trang và dịch vụ kèm: thư, biểu mẫu, ai quản lý; hỏng gọi ai" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm bán hàng nhỏ có trang đặt lịch tư vấn do một bạn thực tập dựng. Khi bạn đó kết thúc kỳ thực tập, tên miền sắp hết hạn mà không ai có mật khẩu tài khoản mua tên miền. Tìm lại tài khoản mất gần hai tuần. Sau sự cố, nhóm làm một bảng một trang ghi từng chặng, người đứng tên và người dự phòng.",
    },
    quiz: [
      {
        question: "Mục nào đáng ghi vào sơ đồ chặng nhất, vì hay bị quên khi nhân sự thay đổi?",
        options: [
          "Ai đứng tên tài khoản của từng chặng và người dự phòng",
          "Bộ màu chủ đạo của giao diện và kiểu chữ dùng trong toàn trang",
          "Tên từng thư mục chứa ảnh và tệp dùng trong trang",
          "Số lần trang được bấm vào mỗi tháng theo từng ngày",
        ],
        correct: 0,
        explanation:
          "Khi người dựng nghỉ việc, cái mất đi là quyền vào các tài khoản chứ không phải màu giao diện hay thư mục ảnh. Số lượt xem là thông tin hay nhưng không giúp gỡ sự cố. Người đứng tên và người dự phòng quyết định bạn gọi ai lúc cần.",
      },
      {
        question: "Trong sơ đồ, mật khẩu của các tài khoản nên được xử lý thế nào?",
        options: [
          "Không ghi vào sơ đồ; chỉ ghi nơi cất giữ an toàn và người giữ",
          "Ghi thẳng mật khẩu để lúc khẩn cấp mở ra dùng ngay",
          "Ghi mật khẩu nhưng in chữ nhỏ và đặt ở cuối trang sơ đồ",
          "Gửi sơ đồ kèm mật khẩu vào nhóm chat chung để mọi người có sẵn",
        ],
        correct: 0,
        explanation:
          "Sơ đồ được nhiều người xem, nên chứa mật khẩu là biến nó thành chìa khoá chung. In nhỏ hay để cuối trang không làm mật khẩu bớt lộ. Nhóm chat chung lưu lại mãi và nhiều người truy cập được. Chỉ ghi nơi cất và người giữ thì vừa tìm được vừa an toàn.",
      },
      {
        question: "Bạn nhờ AI vẽ khung sơ đồ. Thông tin nào nên đưa cho AI?",
        options: [
          "Tên chặng và vai trò từng chặng, dùng tên giả hoặc chỗ trống thay cho giá trị thật",
          "Mật khẩu thật của từng tài khoản để AI điền đúng chỗ",
          "Địa chỉ email riêng và số điện thoại của mọi người liên quan",
          "Toàn bộ hợp đồng thuê nơi đặt trang và hoá đơn thanh toán",
        ],
        correct: 0,
        explanation:
          "AI chỉ cần cấu trúc để dựng khung: chặng nào, vai trò gì. Mật khẩu, thông tin liên hệ riêng và hợp đồng không cần cho việc đó và không nên đưa vào công cụ chưa được duyệt. Giá trị thật bạn tự điền sau khi có khung.",
      },
      {
        question: "AI dựng khung, thấy cột 'Ngày hết hạn' và điền ngày '31/12/2027' cho tên miền của bạn. Nên làm gì?",
        options: [
          "Xoá và điền ngày thật lấy từ nơi bạn mua tên miền",
          "Giữ lại vì AI thường ước lượng ngày hết hạn khá chính xác",
          "Giữ lại nhưng đổi màu để nhớ kiểm lại khi có thời gian",
          "Giữ lại, vì đúng là ngày hết hạn phổ biến nhất của các tên miền",
        ],
        correct: 0,
        explanation:
          "AI không biết bạn mua tên miền lúc nào nên ngày nó điền là bịa. Đổi màu chỉ che giấu lỗi, và ngày 'phổ biến' không nói gì về tên miền của bạn. Ngày thật phải lấy từ nguồn, rồi ghi nguồn đó vào sơ đồ.",
      },
      {
        question: "Bao lâu nên xem lại sơ đồ để nó không lỗi thời?",
        options: [
          "Mỗi khi có người vào hoặc rời nhóm, và định kỳ vài tháng một lần",
          "Một lần khi làm xong, sau đó chỉ xem lại khi trang hỏng",
          "Chỉ khi nhà cung cấp tự gửi thông báo thay đổi điều khoản",
          "Mỗi ngày vào buổi sáng, vì mọi thứ có thể đổi bất kỳ lúc nào",
        ],
        correct: 0,
        explanation:
          "Sơ đồ lỗi thời nhanh nhất khi người đứng tên thay đổi, nên sự kiện người vào hoặc rời là mốc rõ ràng để rà soát. Chờ trang hỏng mới xem thì đã muộn, chờ nhà cung cấp báo thì họ không biết nhóm bạn đổi người, và kiểm mỗi ngày là tốn sức không cần thiết.",
      },
      {
        question: "Một chặng trong sơ đồ có cột 'gọi ai khi hỏng' để trống vì bạn chưa biết. Nên làm gì?",
        options: [
          "Ghi '[cần hỏi]' kèm tên người sẽ hỏi và hạn trả lời",
          "Ghi tên chính bạn cho nhanh dù bạn không có quyền ở chặng đó",
          "Để trống, vì bảng không cần điền đầy đủ mọi cột",
          "Nhờ AI điền người hợp lý nhất cho cột đó",
        ],
        correct: 0,
        explanation:
          "Chỗ chưa biết phải được đánh dấu rõ và có người chịu trách nhiệm tìm ra. Ghi tên bạn khi bạn không có quyền sẽ làm sơ đồ sai đúng lúc khẩn cấp. Để trống bị bỏ quên, còn AI không biết ai quản lý chặng nào trong tổ chức của bạn.",
      },
    ],
    keyTakeaways: [
      "Sơ đồ một trang: chặng, ai quản lý, đăng nhập ở đâu, hỏng thì gọi ai.",
      "Không ghi mật khẩu vào sơ đồ; chỉ ghi nơi cất giữ và người giữ.",
      "Đưa cho AI cấu trúc, không đưa giá trị thật.",
      "Chỗ chưa biết ghi '[cần hỏi]' và gán người tìm câu trả lời.",
      "Rà sơ đồ mỗi khi có người vào hoặc rời nhóm.",
    ],
    practicePrompt: {
      question:
        "Anh Dũng dán cả mật khẩu thật các tài khoản vào AI để 'cho nó vẽ sơ đồ đầy đủ'. Đâu là lỗi chính?",
      options: [
        "Đưa mật khẩu thật cho công cụ không cần biết chúng",
        "AI vẽ sơ đồ chậm hơn khi có nhiều dữ liệu được đưa vào",
        "Sơ đồ cần nhiều màu hơn để dễ phân biệt từng chặng",
        "AI không biết vẽ sơ đồ nếu không được đưa tên công ty",
      ],
      correct: 0,
      explanation:
        "AI chỉ cần tên chặng và vai trò để dựng khung. Mật khẩu thật không cần và có thể bị lưu lại ở ngoài công ty. Tốc độ vẽ, màu sắc và việc có tên công ty đều không phải vấn đề của tình huống này.",
    },
    summary: {
      keyIdea: "Sơ đồ chặng giúp sự cố xử lý theo quy trình thay vì theo trí nhớ của một người.",
      formula: "Chặng + người đứng tên + nơi đăng nhập + gọi ai = một dòng của sơ đồ.",
      commonMistake: "Ghi mật khẩu vào sơ đồ, hoặc để AI điền những ô nó không thể biết.",
      action: "Vẽ sơ đồ cho một trang hoặc công cụ bạn đang dùng và nhờ đồng nghiệp đọc thử.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một trang hoặc công cụ của nhóm (hoặc một ví dụ giả nếu chưa có). Dùng bảng có bốn cột: chặng, ai quản lý, đăng nhập ở đâu (chỉ ghi tên dịch vụ, không ghi mật khẩu), gọi ai khi hỏng. Điền ít nhất bốn hàng: tên miền, danh bạ tên miền, nơi đặt, dịch vụ kèm. Ô nào chưa biết thì ghi '[cần hỏi]'. Gửi bảng cho một đồng nghiệp đọc thử.",
      secondary: "Hẹn một ngày để gom các ô '[cần hỏi]' thành danh sách việc.",
    },
    sections: [
      {
        type: "lead",
        text: "Lúc trang chạy ổn là lúc thích hợp nhất để vẽ sơ đồ: không ai đang hoảng, và bạn còn nhớ ai giữ cái gì. Bài này dẫn bạn tạo một tờ sơ đồ một trang, nhờ AI dựng khung và bạn điền giá trị thật.",
      },
      {
        type: "feynman",
        title: "Sơ đồ chặng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sơ đồ tủ điện trong nhà: mỗi cầu dao ghi rõ 'bếp', 'phòng ngủ', 'máy giặt'. Khi mất điện ở bếp, bạn không phải mò từng dây, chỉ cần nhìn nhãn và gạt đúng cầu dao.",
        columns: ["Thành phần", "Tủ điện trong nhà", "Sơ đồ đường đi của trang"],
        rows: [
          ["Mỗi cầu dao", "Một khu vực trong nhà", "Một chặng: tên miền, bản ghi, nơi đặt, dịch vụ kèm"],
          ["Nhãn dán", "Ghi tên khu vực", "Ghi ai quản lý chặng đó"],
          ["Khi có sự cố", "Xem nhãn, gạt đúng cầu dao", "Xem sơ đồ, gọi đúng người"],
          ["Khi thay người", "Sửa nhãn khi đổi phòng", "Sửa sơ đồ khi có người vào hoặc rời"],
        ],
        oneLiner: "Sơ đồ chặng là tấm nhãn dán trên tủ điện: làm khi mọi thứ bình thường, cứu bạn khi mất điện.",
      },
      { type: "heading", text: "Vấn đề: chìa khoá nằm trong đầu một người" },
      {
        type: "paragraph",
        text: "Khi trang được dựng bởi một người, phần lớn thông tin nằm trong trí nhớ của họ: tên miền mua ở đâu, ai đứng tên, nơi đặt nào. Người đó nghỉ việc, đi nghỉ phép hoặc đơn giản quên mất, nhóm còn lại không biết bắt đầu từ đâu. Một sơ đồ một trang, không chứa mật khẩu, chuyển phần trí nhớ đó thành tài liệu cả nhóm dùng được.",
      },
      {
        type: "flow",
        title: "Từ một ý tưởng tới sơ đồ dùng được",
        steps: [
          { label: "Liệt kê chặng", detail: "Viết ra đường đi của người dùng: gõ tên miền, danh bạ tên miền, nơi đặt trang, dịch vụ kèm như gửi thư hoặc biểu mẫu." },
          { label: "Nhờ AI dựng khung bảng", detail: "Đưa cho AI tên chặng và vai trò, không đưa mật khẩu, nhờ dựng bảng bốn cột và đánh dấu ô nào cần người điền." },
          { label: "Điền giá trị thật", detail: "Bạn tự điền tên nhà cung cấp, người quản lý và ngày hết hạn, lấy từ hoá đơn, email nhắc hoặc hỏi người liên quan." },
          { label: "Đánh dấu chỗ chưa biết", detail: "Ô nào chưa rõ ghi '[cần hỏi]' kèm tên người sẽ hỏi. Không bịa, không bỏ trống." },
          { label: "Cho một người đọc thử", detail: "Nhờ đồng nghiệp chưa từng làm trang đọc và hỏi: nếu trang hỏng, bạn sẽ gọi ai đầu tiên? Nếu họ trả lời được là sơ đồ đạt." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung sơ đồ đường đi",
        task: "Nhóm bạn có một trang đặt lịch tư vấn. Lắp prompt để AI dựng khung bảng sơ đồ chặng mà không cần biết mật khẩu hay giá trị thật.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Vẽ sơ đồ cho trang của tôi.", feedback: "AI không biết trang có những chặng nào nên sẽ bịa một sơ đồ chung chung, kể cả những chặng bạn không có." },
              { text: "Trang đặt lịch tư vấn của nhóm gồm: tên miền, danh bạ tên miền, nơi đặt trang, biểu mẫu và email tự động. Dùng tên chung, không có giá trị thật.", good: true, feedback: "Đủ chặng thật của bạn và rõ rằng không có giá trị thật, nên AI chỉ dựng khung." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Làm bảng cho đẹp và đầy đủ thông tin.", feedback: "'Đầy đủ' khiến AI tự thêm cột và điền thông tin nó bịa ra." },
              { text: "Bảng bốn cột: chặng, ai quản lý, đăng nhập ở đâu (chỉ tên dịch vụ), gọi ai khi hỏng. Để trống các ô cần tôi điền.", good: true, feedback: "Cột rõ ràng, và ô chưa biết để trống cho bạn thay vì để AI điền." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu thiếu thông tin thì tự bổ sung cho hợp lý.", feedback: "Đây đúng là cách AI bịa tên nhà cung cấp, ngày hết hạn và người phụ trách." },
              { text: "Không điền tên, ngày, mật khẩu hay người phụ trách. Ô nào cần thông tin thật thì ghi [cần hỏi].", good: true, feedback: "AI giữ đúng vai dựng khung; giá trị thật do bạn điền từ nguồn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "format", "limit"],
            text: "| Chặng | Ai quản lý | Đăng nhập ở đâu | Gọi ai khi hỏng |\n|---|---|---|---|\n| Tên miền | [cần hỏi] | [cần hỏi: tên dịch vụ] | [cần hỏi] |\n| Danh bạ tên miền (bản ghi) | [cần hỏi] | [cần hỏi: tên dịch vụ] | [cần hỏi] |\n| Nơi đặt trang | [cần hỏi] | [cần hỏi: tên dịch vụ] | [cần hỏi] |\n| Biểu mẫu | [cần hỏi] | [cần hỏi: tên dịch vụ] | [cần hỏi] |\n| Email tự động | [cần hỏi] | [cần hỏi: tên dịch vụ] | [cần hỏi] |",
          },
          {
            requires: ["context"],
            text: "| Chặng | Ai quản lý | Ngày hết hạn | Nhà cung cấp |\n|---|---|---|---|\n| Tên miền | Bộ phận IT | 15/06/2027 | Nhà đăng ký ABC |\n| Nơi đặt trang | Anh Nam | hằng tháng | Công ty XYZ |\n\n(Giọng đúng khung nhưng AI tự điền ngày, người và nhà cung cấp bạn chưa hề đưa - toàn bộ là bịa.)",
          },
          {
            text: "Sơ đồ gồm: người dùng → mạng internet → máy chủ → dữ liệu. Đây là sơ đồ chung cho mọi trang web hiện đại...\n\n(Không có chặng nào của bạn, và không cột nào trả lời câu 'hỏng thì gọi ai'.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Sơ đồ dùng được khi có sự cố",
          text: "Mỗi chặng có người quản lý và người dự phòng. Ô chưa biết được đánh dấu và có người đi hỏi. Không chứa mật khẩu, chỉ ghi nơi cất giữ. Có ngày hết hạn lấy từ nguồn thật.",
        },
        right: {
          label: "Sơ đồ chỉ để cho đẹp",
          text: "Đẹp nhưng không ghi ai đứng tên. Có ô được AI điền mà không ai kiểm. Ghi cả mật khẩu nên không dám chia sẻ rộng. Không ai cập nhật khi nhóm đổi người.",
        },
      },
      {
        type: "scenario",
        title: "Người dựng trang nghỉ việc, tên miền sắp hết hạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn thực tập vừa dựng trang đặt lịch cho nhóm đã nghỉ việc. Hôm nay email nhắc tên miền sắp hết hạn trong 10 ngày gửi về hộp thư chung. Không ai biết tài khoản mua tên miền.",
            choices: [
              { label: "Nhờ AI đoán tên miền mua ở nhà đăng ký nào rồi thử đăng nhập", next: "bad_guess" },
              { label: "Xem email nhắc để biết nhà đăng ký, rồi hỏi bạn thực tập và người quản lý nhóm", next: "s2" },
            ],
          },
          bad_guess: {
            text: "AI đưa ra một cái tên nhà đăng ký nghe hợp lý nhưng không phải nơi bạn mua. Bạn mất cả ngày thử đăng nhập vào các tài khoản không liên quan.",
            ending: "bad",
          },
          s2: {
            text: "Email nhắc ghi rõ nhà đăng ký và địa chỉ email đứng tên. Đó là email cá nhân của bạn thực tập.",
            choices: [
              { label: "Liên hệ bạn thực tập để được chuyển quyền hoặc khôi phục tài khoản về email công ty", next: "s3" },
              { label: "Tạo tài khoản mới và mua lại tên miền khác cho nhanh", next: "bad_new" },
            ],
          },
          bad_new: {
            text: "Tên miền mới khác địa chỉ khách đã lưu. Trang cũ hết hạn, khách không tìm thấy trang nữa và bạn mất luôn chỗ đã xếp hạng trên tìm kiếm.",
            ending: "bad",
          },
          s3: {
            text: "Bạn lấy lại được quyền. Bây giờ cần tránh lặp lại sự cố.",
            choices: [
              { label: "Lập sơ đồ chặng: ghi người đứng tên, người dự phòng, ngày hết hạn, đặt lời nhắc lịch", next: "good" },
              { label: "Nhớ trong đầu là tên miền đứng tên email chung, không ghi gì", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Sáu tháng sau, người nhớ chuyện đó chuyển phòng ban và sự cố lặp lại y hệt.",
            ending: "bad",
          },
          good: {
            text: "Nhóm có sơ đồ một trang, tên miền đứng tên email chung của công ty và người dự phòng biết việc gia hạn. Sự cố sau đó chỉ tốn mười phút.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê các chặng từ tên miền tới trang và dịch vụ kèm.",
          "Bước 2 - Nhờ AI dựng khung bốn cột, không đưa mật khẩu hay giá trị thật.",
          "Bước 3 - Tự điền người quản lý và ngày hết hạn từ nguồn thật; ô chưa biết ghi '[cần hỏi]'.",
          "Bước 4 - Cho đồng nghiệp đọc thử và rà lại mỗi khi nhóm đổi người.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Sơ đồ tốt là tờ giấy ai cũng đọc được và không chứa bí mật nào.",
          "Bài sau: khoá bí mật là gì, vì sao dán vào trang công khai là lỗi nặng.",
        ],
      },
    ],
  },
  {
    id: 2589,
    slug: "mat-khau-va-khoa-bi-mat-la-gi-vi-sao-khong-dan-vao-ma",
    title: "Chặng 59, Bài 10: Khoá bí mật là gì và vì sao không được dán vào chỗ công khai",
    subtitle: "Chìa khoá nhà dán lên cửa thì ai đi qua cũng mở được: khoá bí mật nằm trong trang công khai cũng vậy.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ bạn dựng thường nối với dịch vụ khác như gửi thư, lưu bảng tính, gọi AI, và mỗi kết nối cần một khoá. Khoá dán nhầm vào chỗ ai cũng xem được có thể bị người lạ dùng và bạn trả tiền hoặc mất dữ liệu. Biết nhận ra khoá và giữ kín là kỹ năng cơ bản nhất của người đưa sản phẩm lên mạng.",
    openingQuestion:
      "Bạn nhờ AI viết trang nhỏ gọi một dịch vụ bên ngoài. Nó trả về đoạn mã có một dòng dài bắt đầu bằng 'sk-...', và bảo dán thẳng vào trang rồi công bố. Bạn nên làm gì?",
    openingOptions: [
      "Dừng lại, vì dòng đó là khoá bí mật và không được để trong trang công khai",
      "Dán nguyên vào trang, vì AI đã viết sẵn thì chắc chắn dùng được",
      "Dán vào trang nhưng đổi màu chữ thành trắng để người xem không thấy",
      "Dán vào trang nhưng chỉ chia sẻ đường dẫn cho vài người thân thiết",
    ],
    correctOption: 0,
    explanation:
      "Khoá bí mật giống mật khẩu của một dịch vụ: ai có nó là dùng được với danh nghĩa và hạn mức của bạn. Mọi thứ trong một trang công khai đều gửi về máy người xem, nên họ đọc được bằng cách xem nguồn trang. Đổi màu chữ chỉ che mắt, không che dữ liệu, và chia sẻ cho vài người vẫn là chia sẻ: một đường dẫn có thể bị chuyển tiếp. Khoá phải nằm ở nơi chỉ phần bên trong của sản phẩm đọc được.",
    diagram: [
      { label: "Bạn cần một dịch vụ bên ngoài làm việc cho sản phẩm", arrow: true },
      { label: "Dịch vụ cấp một khoá để biết là bạn đang gọi", arrow: true },
      { label: "Khoá để ở nơi kín của sản phẩm, không nằm trong trang công khai", arrow: true },
      { label: "Nếu khoá lộ: thu hồi, tạo khoá mới, báo người phụ trách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên marketing tự dựng trang nhỏ nhờ AI, dán khoá dịch vụ gửi thư thẳng vào trang rồi công bố. Hai ngày sau, hoá đơn dịch vụ gửi thư tăng bất thường vì có người lạ dùng khoá để gửi hàng nghìn thư. Người phụ trách thu hồi khoá, tạo khoá mới đặt ở nơi kín và kiểm lại hoá đơn với nhà cung cấp.",
    },
    quiz: [
      {
        question: "Khoá bí mật (khoá API) của một dịch vụ giống thứ gì nhất?",
        options: [
          "Mật khẩu để dịch vụ biết ai đang gọi và tính tiền cho ai",
          "Địa chỉ trang công khai của dịch vụ đó",
          "Tên gọi của sản phẩm trong danh sách cửa hàng ứng dụng",
          "Bản hướng dẫn cách sử dụng dịch vụ dành cho người dùng mới",
        ],
        correct: 0,
        explanation:
          "Khoá là bằng chứng 'tôi là chủ tài khoản này' mà dịch vụ dùng để cho phép gọi và tính tiền. Địa chỉ trang, tên sản phẩm và bản hướng dẫn đều là thông tin công khai, ai cũng xem được nên không cần giữ kín.",
      },
      {
        question: "Vì sao dán khoá bí mật vào một trang công khai là nguy hiểm?",
        options: [
          "Mọi thứ trong trang gửi về máy người xem nên ai cũng đọc được khoá",
          "Khoá sẽ tự hết hạn sau vài giờ khi dịch vụ phát hiện nó nằm trong trang",
          "Trang sẽ tải chậm hơn vì khoá là một chuỗi ký tự rất dài",
          "Dịch vụ chỉ cho một người dùng khoá tại một thời điểm nên sẽ bị chặn",
        ],
        correct: 0,
        explanation:
          "Trang công khai được gửi nguyên về trình duyệt người xem, nên xem nguồn trang là đọc được khoá, và người đọc được dùng khoá thay bạn. Không có cơ chế tự hết hạn nhanh như vậy, độ dài chuỗi không làm trang chậm đáng kể, và khoá thường dùng được từ nhiều nơi cùng lúc.",
      },
      {
        question: "Bạn nghi khoá đã nằm trong một trang đang công khai. Việc làm nào là đúng nhất?",
        options: [
          "Thu hồi khoá ở dịch vụ rồi tạo khoá mới, sau đó gỡ khoá khỏi trang",
          "Xoá dòng chứa khoá khỏi trang là đủ",
          "Đổi tên trang để người lạ không tìm thấy nữa",
          "Đợi xem hoá đơn tháng sau có bất thường không mới quyết định",
        ],
        correct: 0,
        explanation:
          "Khoá đã lộ thì xoá khỏi trang chưa đủ vì người khác có thể đã sao chép. Đổi tên trang không ngăn người đã có khoá. Chờ hoá đơn là để thiệt hại tăng theo giờ. Thu hồi khoá làm khoá cũ vô dụng ngay, rồi mới tạo khoá mới cất kín.",
      },
      {
        question: "Bạn cần đưa một khoá cho đồng nghiệp dùng chung công cụ. Cách nào ổn nhất?",
        options: [
          "Dùng chỗ cất giữ do công ty duyệt, hoặc nhờ IT cấp quyền riêng",
          "Dán khoá vào nhóm chat chung để ai cần cũng có sẵn",
          "Gửi khoá qua email kèm chủ đề 'khoá, xem xong thì xoá nhé'",
          "Ghi khoá lên bảng trắng trong phòng họp của nhóm",
        ],
        correct: 0,
        explanation:
          "Chat và email lưu lại rất lâu và nhiều người đọc được, dòng nhắc 'xoá nhé' không xoá được bản đã lưu ở nơi khác. Bảng trắng ai đi qua cũng nhìn thấy. Chỗ cất giữ được duyệt hoặc quyền cấp riêng cho từng người thì có thể thu hồi từng người khi cần.",
      },
      {
        question: "Trang của bạn có một khoá 'công khai' (publishable) theo tài liệu của nhà cung cấp. Bạn nên hiểu thế nào?",
        options: [
          "Một số khoá được thiết kế để công khai; hỏi người kỹ thuật xem khoá này thuộc loại nào",
          "Mọi khoá đều công khai được, vì nhà cung cấp luôn đã bảo vệ khoá sẵn",
          "Khoá nào có chữ 'key' cũng đều phải giữ kín tuyệt đối",
          "Khoá công khai hay bí mật không khác gì nhau nên bạn tuỳ chọn",
        ],
        correct: 0,
        explanation:
          "Có hai loại khoá: loại bí mật phải giấu, và loại được thiết kế để nằm trong trang với quyền rất hạn chế. Bạn không nên tự đoán loại nào, mà hỏi người kỹ thuật hoặc đọc tài liệu nhà cung cấp. Nói mọi khoá đều công khai được là nguy hiểm, còn nói mọi khoá đều bí mật thì bỏ qua loại được thiết kế công khai.",
      },
      {
        question: "AI viết mã mẫu có dòng khoá ví dụ 'sk-EXAMPLE1234'. Bạn nên xử lý thế nào?",
        options: [
          "Thay bằng khoá thật của mình ở nơi kín và không dán khoá thật vào chính cuộc trò chuyện",
          "Dán khoá thật của mình vào cuộc trò chuyện để AI sửa mã giúp",
          "Giữ nguyên khoá ví dụ khi công bố vì nó là khoá của AI cấp",
          "Xoá dòng khoá đi, mã sẽ vẫn chạy bình thường không cần khoá",
        ],
        correct: 0,
        explanation:
          "Khoá ví dụ chỉ là chỗ trống minh hoạ và không hoạt động thật. Dán khoá thật vào cuộc trò chuyện là đưa bí mật ra ngoài. Khoá ví dụ không phải khoá AI cấp, và xoá dòng khoá thì dịch vụ sẽ từ chối yêu cầu.",
      },
    ],
    keyTakeaways: [
      "Khoá bí mật là mật khẩu của dịch vụ: ai có nó dùng được như bạn.",
      "Mọi thứ trong trang công khai đều gửi về máy người xem, nên không đặt khoá bí mật ở đó.",
      "Che mắt (chữ trắng, đổi tên trang) không phải bảo vệ.",
      "Khoá lộ thì thu hồi và tạo khoá mới, không chỉ xoá dòng.",
      "Không dán khoá thật vào cuộc trò chuyện với AI hay nhóm chat chung.",
    ],
    practicePrompt: {
      question:
        "Chị Lan phát hiện khoá dịch vụ gửi thư nằm trong trang đang công khai. Chị xoá dòng đó khỏi trang. Điều gì còn thiếu?",
      options: [
        "Thu hồi khoá cũ và tạo khoá mới, vì khoá đã bị lộ ra ngoài",
        "Đổi màu nền của trang để người xem không chú ý đến phần đầu",
        "Nhắn khách hàng xin lỗi về việc trang bị chậm đi vài phút",
        "Chờ vài ngày rồi xem nhà cung cấp có báo cáo gì bất thường",
      ],
      correct: 0,
      explanation:
        "Khoá nằm công khai dù chỉ một lúc có thể đã bị sao chép. Xoá dòng khỏi trang không làm khoá cũ mất hiệu lực. Đổi màu nền, xin lỗi khách và chờ báo cáo đều không đóng cánh cửa đã mở.",
    },
    summary: {
      keyIdea: "Khoá bí mật là mật khẩu của dịch vụ, chỉ được để ở nơi kín của sản phẩm.",
      formula: "Khoá bí mật trong trang công khai = cửa nhà dán chìa khoá.",
      commonMistake: "Tin rằng che chữ hoặc chia sẻ hẹp là đủ, và chỉ xoá dòng khi khoá đã lộ.",
      action: "Nhìn lại trang hoặc công cụ bạn dựng: có dòng nào giống khoá dài bắt đầu bằng chữ lạ không?",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một trang hoặc tệp bạn đã dựng hoặc được đồng nghiệp gửi (hoặc một mã mẫu AI viết cho bạn). Đọc từ đầu tới cuối, đánh dấu mọi chuỗi ký tự dài lạ trông giống khoá, mật khẩu hoặc email cá nhân. Ghi lại từng dòng bạn đánh dấu và quyết định: giữ kín, hỏi người kỹ thuật, hay đã là ví dụ giả. Không dán giá trị thật vào bất cứ chỗ nào.",
      secondary: "Nếu bạn tìm thấy một khoá thật, báo người phụ trách ngay và không tự xoá hay sao chép.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI dựng một trang nhỏ gọi dịch vụ gửi thư, và trong mã có một dòng dài lạ. Đó là khoá bí mật. Bài này dạy bạn nhận ra nó, hiểu vì sao nó không được đặt ở chỗ công khai, và biết làm gì nếu nó đã lộ.",
      },
      {
        type: "feynman",
        title: "Khoá bí mật đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chìa khoá nhà bạn. Nó không tự biết bạn là ai, chỉ cần ai cầm nó là mở được cửa. Dán chìa khoá lên cánh cửa thì mọi người đi qua đều vào được, dù bạn không hề mời.",
        columns: ["Thành phần", "Chìa khoá nhà", "Khoá bí mật của dịch vụ"],
        rows: [
          ["Công dụng", "Mở cửa nhà bạn", "Cho dịch vụ biết ai đang gọi và tính tiền cho ai"],
          ["Ai cầm là dùng được", "Kẻ trộm cầm cũng mở được", "Người lạ có khoá dùng được với danh nghĩa bạn"],
          ["Để ở đâu", "Trong túi bạn hoặc hộp kín", "Ở nơi kín của sản phẩm, không trong trang công khai"],
          ["Khi mất", "Đổi ổ khoá", "Thu hồi khoá, tạo khoá mới"],
        ],
        oneLiner: "Khoá bí mật là chìa khoá nhà: ai cầm cũng dùng được, nên không bao giờ dán lên cửa.",
      },
      { type: "heading", text: "Vấn đề: trang công khai nghĩa là cho mọi người xem" },
      {
        type: "paragraph",
        text: "Khi bạn công bố một trang, toàn bộ nội dung được gửi về máy của từng người mở nó, kể cả những dòng người dùng không nhìn thấy trên màn hình. Xem nguồn trang là thấy hết. Vì thế khoá bí mật đặt trong trang đã bị lộ ngay từ lúc công bố. Người lạ dùng nó để gọi dịch vụ, bạn trả tiền hoặc dữ liệu của bạn bị đọc. Cách đúng là để khoá ở phần 'sau cánh cửa': nơi chỉ máy chủ của sản phẩm đọc được.",
      },
      {
        type: "flow",
        title: "Đường đi của một khoá khi làm đúng",
        steps: [
          { label: "Dịch vụ cấp khoá", detail: "Bạn xin khoá ở dịch vụ bên ngoài. Khoá xuất hiện, thường chỉ hiện đầy đủ một lần." },
          { label: "Cất khoá ở nơi kín", detail: "Đặt khoá vào chỗ cất giữ do công ty hoặc nhà cung cấp nơi đặt trang duyệt, không dán vào trang." },
          { label: "Phần bên trong gọi dịch vụ", detail: "Khi cần, phần bên trong (không phải trang hiển thị cho người xem) đọc khoá từ chỗ cất và gọi dịch vụ." },
          { label: "Người xem chỉ thấy kết quả", detail: "Trang chỉ nhận kết quả, không bao giờ nhận khoá." },
          { label: "Nếu lộ: thu hồi", detail: "Vào dịch vụ, thu hồi khoá cũ, tạo khoá mới, cập nhật chỗ cất, rồi kiểm tra hoạt động bất thường." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét của AI về một trang nhỏ",
        task: "Bạn nhờ AI đọc một trang dựng vội có sẵn một dòng 'khoá = sk-EXAMPLE...' (giá trị giả). AI trả lời như dưới đây. Đánh dấu câu sai hoặc bịa.",
        segments: [
          { text: "Trong trang có một dòng trông giống khoá bí mật của dịch vụ gửi thư." },
          {
            text: "Dòng này an toàn vì đã được đặt trong đoạn mã nên người xem không đọc được.",
            error: "Sai: mã trong trang công khai vẫn gửi về máy người xem, họ xem nguồn trang là đọc được. Không có chuyện 'nằm trong mã thì ẩn'.",
          },
          { text: "Nên di chuyển khoá ra khỏi trang và cất ở nơi kín của sản phẩm." },
          {
            text: "Theo thống kê, hơn 90% khoá bị lộ được phát hiện trong vòng một giờ nên bạn không cần vội đổi.",
            error: "Bịa: AI đưa ra con số không có nguồn, và kết luận 'không cần vội' sai vì người lạ có thể dùng khoá ngay khi nó lộ.",
          },
          { text: "Nếu khoá đã lộ, cần thu hồi khoá cũ, tạo khoá mới và báo người phụ trách." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Thường phải giữ kín",
          text: "Khoá API và mật khẩu của dịch vụ. Chuỗi 'bí mật' của tài khoản quản trị. Tệp dữ liệu khách hàng. Email và số điện thoại cá nhân của người khác.",
        },
        right: {
          label: "Có thể công khai (hỏi người kỹ thuật)",
          text: "Tên sản phẩm, địa chỉ trang, nội dung trang. Một số loại khoá công khai được dịch vụ thiết kế riêng để đặt trong trang. Khi chưa chắc là loại nào, coi như bí mật và hỏi.",
        },
      },
      {
        type: "callout",
        label: "Đừng dán khoá thật vào AI hay nhóm chat",
        text: "Khi nhờ AI sửa mã, thay khoá thật bằng chuỗi giả như KHOA_MAU. Cuộc trò chuyện và nhóm chat lưu lại lâu và nhiều người có thể đọc được.",
      },
      {
        type: "scenario",
        title: "Khoá nằm trong trang đã công bố",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đọc lại trang bạn công bố hôm qua và thấy khoá dịch vụ gửi thư nằm ngay trong mã. Trang đã có người xem.",
            choices: [
              { label: "Xoá dòng khoá khỏi trang rồi coi như xong", next: "bad_delete" },
              { label: "Thu hồi khoá ở dịch vụ trước, rồi báo người phụ trách", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Một người đã sao chép khoá từ hôm qua. Hai ngày sau hoá đơn dịch vụ gửi thư tăng vọt vì hàng nghìn thư lạ gửi đi bằng tên bạn.",
            ending: "bad",
          },
          s2: {
            text: "Khoá cũ đã vô hiệu. Giờ trang của bạn cần một khoá mới để chạy lại.",
            choices: [
              { label: "Tạo khoá mới, cất vào chỗ kín, rồi sửa trang để bỏ khoá khỏi mã", next: "s3" },
              { label: "Dán khoá mới vào trang như cũ vì trang đang cần chạy gấp", next: "bad_repeat" },
            ],
          },
          bad_repeat: {
            text: "Khoá mới lại nằm trong trang công khai. Bạn lặp lại đúng lỗi cũ và khoá mới cũng bị lộ trong vài giờ.",
            ending: "bad",
          },
          s3: {
            text: "Trang chạy lại, khoá đã nằm ở nơi kín. Bạn cần biết khoá cũ có bị dùng trong lúc lộ hay không.",
            choices: [
              { label: "Xem lịch sử sử dụng và hoá đơn dịch vụ, báo người phụ trách kết quả", next: "good" },
              { label: "Không kiểm, vì đã đổi khoá rồi nên coi như hết chuyện", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Có một lượng thư lạ đã được gửi trước khi bạn đổi khoá. Bạn không biết, và tên miền công ty bị đưa vào danh sách nghi gửi thư rác.",
            ending: "bad",
          },
          good: {
            text: "Lịch sử cho thấy một vài yêu cầu lạ. Người phụ trách làm việc với nhà cung cấp về hoá đơn và nhóm bổ sung thói quen kiểm khoá trước khi công bố.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhận ra khoá: chuỗi dài lạ, thường gắn với tên dịch vụ hoặc chữ 'key', 'secret', 'token'.",
          "Bước 2 - Không dán khoá thật vào trang công khai, vào AI hay nhóm chat.",
          "Bước 3 - Khi chưa chắc khoá thuộc loại nào, coi là bí mật và hỏi người kỹ thuật.",
          "Bước 4 - Nếu đã lộ: thu hồi, tạo khoá mới, kiểm tra hoạt động, báo người phụ trách.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Khoá bí mật chỉ ở nơi kín; trang công khai chỉ chứa thứ ai cũng được xem.",
          "Bài sau: tài khoản quản trị của sản phẩm và việc bật xác thực hai lớp, chia quyền.",
        ],
      },
    ],
  },
];
