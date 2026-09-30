import type { Lesson } from "../lesson-types";

// Chặng 65, bài 16-20. Giáo trình: scripts/curriculum/stage-65.json.
// Không dựa vào tính năng riêng của công cụ nào; mọi số liệu trong bài là số liệu minh hoạ.
export const S65_D_LESSONS: Lesson[] = [
  {
    id: 2715,
    slug: "xoa-that-su-ban-sao-trong-thu-muc-email-va-thung-rac",
    title: "Chặng 65, Bài 16: Xoá thật sự: bản sao trong thư mục, email và thùng rác",
    subtitle: "Kéo tệp vào thùng rác giống như bỏ thư vào sọt dưới bàn: nó vẫn ở trong nhà bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗑️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi một khách xin xoá dữ liệu, hay khi lịch lưu trữ nói tệp đã hết hạn, bạn bấm Delete và tưởng xong. Nhưng cùng một bảng khách có thể còn ở thùng rác, thư mục tải về, hộp thư đã gửi, bản đính kèm trong email của đồng nghiệp và ổ đĩa cá nhân. Nói 'đã xoá' khi còn sáu bản ở đâu đó là hứa điều mình chưa làm.",
    openingQuestion:
      "Bạn vừa xoá bảng khách hàng khỏi thư mục chung của phòng vì đã hết hạn giữ. Điều nào sau đây là đúng nhất về tệp đó?",
    openingOptions: [
      "Có thể còn bản ở thùng rác, email đã gửi, máy cá nhân hoặc bản sao lưu",
      "Đã biến mất hoàn toàn khỏi công ty vì bạn vừa bấm xoá",
      "Chỉ còn trong thùng rác, dọn thùng rác là hết mọi bản ở mọi nơi trong công ty",
      "Chỉ còn trong email nếu bạn từng gửi, còn lại đã mất thật",
    ],
    correctOption: 0,
    explanation:
      "Một tệp thường có nhiều bản: bản trong thư mục chung, bản tải về máy, bản đính kèm trong email đã gửi và nhận, bản trong thùng rác, đôi khi cả bản sao lưu tự động. Bấm xoá ở một chỗ chỉ xoá chỗ đó. Dọn thùng rác vẫn không đụng tới email và máy cá nhân. Và tin rằng 'đã biến mất hoàn toàn' là cách phổ biến nhất để hứa với khách một việc chưa làm.",
    diagram: [
      { label: "Liệt kê mọi nơi tệp từng được lưu hoặc gửi", arrow: true },
      { label: "Xoá ở từng nơi bạn có quyền", arrow: true },
      { label: "Nhờ IT xử lý thùng rác chung và bản sao lưu", arrow: true },
      { label: "Ghi lại ngày xoá và những nơi còn lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên chăm sóc khách hàng nhận yêu cầu xoá thông tin của một khách và xoá dòng đó khỏi bảng chung. Hai tuần sau khách vẫn nhận tin nhắn khuyến mãi, vì bảng cũ còn ở thư mục Tải về của đồng nghiệp marketing và trong email gửi đối tác. Lần sau, nhân viên này bắt đầu bằng một danh sách 'tệp này từng đi đâu' trước khi bấm xoá bất cứ thứ gì.",
    },
    quiz: [
      {
        question: "Bạn kéo tệp khách hàng vào thùng rác của máy. Tệp đó lúc này như thế nào?",
        options: [
          "Vẫn còn trong thùng rác cho tới khi bạn dọn thùng",
          "Đã bị xoá vĩnh viễn khỏi mọi nơi trong công ty vì bạn bấm xoá",
          "Đã bị mã hoá tự động nên không ai mở lại được nữa kể cả bạn",
          "Tự biến mất sau đúng 24 giờ theo mặc định",
        ],
        correct: 0,
        explanation:
          "Thùng rác là chỗ cất tạm để bạn còn lấy lại nếu lỡ tay, nên tệp còn nguyên bên trong. Nó không xoá các bản ở nơi khác, không mã hoá tệp, và không có một giờ tự động xoá áp dụng cho mọi máy, vì cách hoạt động do hệ thống và cài đặt của công ty quyết định.",
      },
      {
        question: "Nơi nào dễ bị quên nhất khi bạn dọn một tệp có dữ liệu cá nhân?",
        options: [
          "Bản đính kèm trong email đã gửi và email đồng nghiệp nhận",
          "Thư mục chung của phòng mà cả nhóm đều biết và thường xuyên mở",
          "Thùng rác nằm ngay góc trên màn hình máy bạn",
          "Bản gốc bạn vừa mở trên màn hình để chuẩn bị xoá ngay lúc này",
        ],
        correct: 0,
        explanation:
          "Email đã gửi và email người khác nhận là bản sao nằm ngoài tầm tay bạn, nên dễ bị bỏ sót. Thư mục chung, thùng rác và bản gốc thì bạn thấy ngay trước mặt nên ít khi quên. Khi cần, bạn nhờ người nhận xoá và nhờ IT hỗ trợ phần còn lại.",
      },
      {
        question: "Bảng khách có 4 bản: thư mục chung, máy bạn, email gửi đối tác, thùng rác. Bạn xoá 2 bản. Còn bao nhiêu bản cần xử lý?",
        options: [
          "2 bản (= 4 − 2, còn lại cần xoá hoặc nhờ người khác xoá)",
          "0 bản (= 4 − 4, coi như xoá hết vì bản chính đã mất)",
          "4 bản (= 4 − 0, xoá ở một nơi không ảnh hưởng nơi khác)",
          "3 bản (= 4 − 1, chỉ tính bản bạn đã xoá hẳn khỏi thùng rác)",
        ],
        correct: 0,
        explanation:
          "4 bản trừ 2 bản đã xoá còn 2 bản. Con số 0 coi bản chính là tất cả, 4 sai vì xoá một chỗ có làm giảm số bản ở chỗ đó, còn 3 trừ thiếu một bản do nhầm cách đếm. Điều quan trọng là bạn đếm được, rồi ghi bản nào còn lại và ai xử lý.",
      },
      {
        question: "Bản sao lưu tự động của hệ thống công ty có thể còn giữ tệp bạn đã xoá. Bạn nên làm gì?",
        options: [
          "Hỏi IT bản sao lưu giữ bao lâu và ghi vào danh sách việc",
          "Tự cho rằng bản sao lưu sẽ tự hết hạn rồi bỏ qua",
          "Nói với khách rằng mọi bản đã xoá hết không còn sót",
          "Tự đăng nhập vào hệ thống sao lưu để xoá thủ công",
        ],
        correct: 0,
        explanation:
          "Bản sao lưu thuộc phạm vi của IT, không phải của bạn. Việc của bạn là biết nó tồn tại, hỏi chính sách giữ, và ghi lại. Cứ cho rằng nó sẽ tự hết hạn là đoán. Báo khách 'đã xoá hết' khi chưa hỏi là hứa điều chưa làm. Tự chui vào hệ thống sao lưu là vượt quyền của bạn và có thể làm hỏng bản sao lưu của cả công ty.",
      },
      {
        question: "Đổi tên tệp 'khach-hang.xlsx' thành 'cu.xlsx' rồi để trong thư mục chung có tính là đã xoá không?",
        options: [
          "Không, nội dung vẫn còn nguyên và vẫn mở được",
          "Có, vì tên mới không còn gợi ra nội dung bên trong",
          "Có, nếu thư mục chung đã đặt mật khẩu truy cập",
          "Có, miễn là bạn ghi 'không dùng nữa' vào trong tên",
        ],
        correct: 0,
        explanation:
          "Đổi tên không đổi nội dung: bảng vẫn đầy tên và số điện thoại người thật, ai mở cũng thấy. Tên kín hơn chỉ khiến người ta khó tìm nó để xoá về sau. Mật khẩu thư mục chỉ hạn chế người xem, không làm tệp biến mất, và ghi chú trong tên cũng không đổi gì về dữ liệu.",
      },
    ],
    keyTakeaways: [
      "Xoá ở một nơi chỉ xoá nơi đó: thùng rác, tải về, email gửi và nhận, ổ cá nhân, sao lưu là các nơi khác nhau.",
      "Trước khi xoá, lập danh sách tệp đã đi đâu; sau khi xoá, ghi ngày và nơi còn lại.",
      "Phần bạn không có quyền (thùng rác chung, sao lưu) thì nhờ IT, đừng tự đoán.",
      "Đổi tên, đặt mật khẩu hay 'ẩn đi' không phải là xoá.",
    ],
    practicePrompt: {
      question:
        "Sếp hỏi: 'Bảng khách cũ em xoá xong chưa?'. Bạn đã xoá khỏi thư mục chung, nhưng chưa kiểm email, máy cá nhân, thùng rác. Câu trả lời trung thực là gì?",
      options: [
        "Mới xoá ở thư mục chung; em đang kiểm email, máy cá nhân và thùng rác, sẽ báo lại",
        "Xong rồi anh, em đã xoá hết rồi",
        "Xong anh, vì thư mục chung là nơi duy nhất lưu bảng đó",
        "Chưa xoá gì vì em chờ IT làm giúp phần việc này",
      ],
      correct: 0,
      explanation:
        "Nói đúng phần đã làm và phần còn lại cho sếp biết việc chưa xong, có người đang làm. Nói 'xong hết' khi chưa kiểm là hứa sai. Tin rằng thư mục chung là nơi duy nhất là phỏng đoán. Còn chờ IT làm tất cả thì bỏ qua các bản nằm trong tay bạn.",
    },
    summary: {
      keyIdea: "'Đã xoá' chỉ đúng khi bạn đã đi qua mọi nơi tệp từng ở và ghi lại nơi nào còn.",
      formula: "Danh sách nơi lưu + xoá từng nơi + nhờ IT phần còn lại + ghi ngày = xoá thật sự.",
      commonMistake: "Bấm xoá ở thư mục chung rồi báo 'xong', bỏ quên email, tải về, thùng rác và máy cá nhân.",
      action: "Chọn một tệp có tên khách và viết ra 6 nơi nó có thể còn nằm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tệp có dữ liệu người thật mà bạn từng gửi hoặc tải về (ví dụ bảng khách hay danh sách ứng viên). Lập danh sách mọi nơi nó có thể còn: thư mục chung, Tải về, thùng rác, hộp thư gửi, email đồng nghiệp nhận, ổ cá nhân, sao lưu. Đánh dấu nơi bạn tự xoá được và nơi cần nhờ người khác, rồi xoá phần của bạn.",
      secondary: "Ghi ngày giờ bạn xoá; hôm sau xem lại xem còn nơi nào bạn chưa nghĩ tới.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn nhận lệnh: 'Xoá bảng khách chiến dịch cũ'. Bạn mở thư mục chung, bấm Delete, thấy tệp biến mất và trả lời 'xong anh'. Nhưng bảng đó đã được bạn tải về máy, gửi cho đối tác và đính kèm trong ba email. Bài này dạy bạn đếm trước khi nói 'đã xoá'.",
      },
      {
        type: "feynman",
        title: "Xoá thật sự đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc bỏ một tờ giấy ghi số điện thoại khách. Bạn xé tờ trên bàn và thả vào sọt dưới chân. Nhưng bạn cũng từng chụp ảnh gửi đồng nghiệp và dán bản sao lên bảng ghi chú. Tờ giấy chỉ thật sự hết khi bạn xử lý cả các bản ấy.",
        columns: ["Thành phần", "Tờ giấy ghi số khách", "Tệp trên máy"],
        rows: [
          ["Bản gốc", "Tờ trên bàn", "Tệp trong thư mục chung"],
          ["Sọt rác", "Sọt dưới chân, chưa đổ", "Thùng rác của máy, chưa dọn"],
          ["Bản đã đưa người khác", "Ảnh chụp gửi đồng nghiệp", "Email đính kèm, tệp tải về, ổ cá nhân"],
          ["Bản lưu phòng xa", "Bản photo trong tủ hồ sơ công ty", "Bản sao lưu tự động do IT quản lý"],
        ],
        oneLiner: "Xoá thật sự là đi qua mọi chỗ tờ giấy từng tới, không chỉ xé tờ trên bàn.",
      },
      { type: "heading", text: "Một tệp thường nằm ở nhiều chỗ hơn bạn tưởng" },
      {
        type: "paragraph",
        text: "Mỗi lần bạn mở một tệp từ email, tải về, gửi qua chat hay chép ra USB, bạn tạo thêm một bản. Công ty cũng tự tạo thêm bản sao lưu phòng khi hỏng ổ đĩa. Các bản này không biết nhau: xoá bản này không làm bản kia biến mất. Vì vậy 'xoá' là một danh sách việc, không phải một cú bấm.",
      },
      {
        type: "list",
        items: [
          "Nơi bạn tự xoá được: thư mục chung, Tải về, Màn hình nền, thùng rác của máy, ổ cá nhân.",
          "Nơi cần người khác: email đồng nghiệp đã nhận, đối tác đã nhận, chat nhóm.",
          "Nơi chỉ IT xử lý: thùng rác chung của hệ thống, bản sao lưu, điện thoại công ty.",
          "Việc cuối: ghi ngày xoá và nơi còn lại, để khi ai hỏi bạn trả lời được.",
        ],
      },
      {
        type: "flow",
        title: "Từ 'đã bấm xoá' tới 'đã xoá thật sự'",
        steps: [
          { label: "Đếm các nơi tệp từng ở", detail: "Nhớ lại: bạn mở tệp từ đâu, tải về đâu, gửi cho ai, đính kèm trong email nào. Viết thành danh sách ngắn trước khi xoá bất cứ thứ gì." },
          { label: "Xoá phần của bạn", detail: "Xoá ở thư mục chung, Tải về, email đã gửi, ổ cá nhân. Sau đó dọn thùng rác của máy mình." },
          { label: "Nhờ người nhận xoá", detail: "Nhắn đồng nghiệp hoặc đối tác đã nhận tệp, nói rõ tệp nào, vì sao, và xin họ xác nhận đã xoá." },
          { label: "Hỏi IT phần còn lại", detail: "Hỏi thùng rác chung và bản sao lưu còn giữ bao lâu. Bạn không tự chui vào các hệ thống này." },
          { label: "Ghi lại", detail: "Ghi ngày xoá, nơi đã xoá, nơi còn lại và lý do. Khi có người hỏi 'xoá chưa', đây là bằng chứng của bạn." },
        ],
      },
      {
        type: "callout",
        label: "Đừng hứa quá lời",
        text: "Nếu khách hay sếp hỏi 'đã xoá hết chưa', câu trung thực là 'đã xoá ở các nơi X, Y, còn Z đang chờ IT'. Nói 'xoá hết rồi' khi bạn chưa đi qua danh sách là lời hứa bạn không kiểm chứng được.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát báo cáo 'đã xoá' của đồng nghiệp",
        task: "Đồng nghiệp gửi bạn báo cáo sau khi 'xoá bảng khách chiến dịch cũ'. Đánh dấu những câu không đúng hoặc không chứng minh được việc xoá thật sự.",
        segments: [
          { text: "Tôi đã xoá tệp khach-cu.xlsx khỏi thư mục chung của phòng." },
          {
            text: "Vậy là tệp đã biến mất hoàn toàn khỏi công ty.",
            error: "Mới xoá ở thư mục chung; bản ở thùng rác, email, máy cá nhân và sao lưu có thể còn. Kết luận 'hoàn toàn' là điều chưa kiểm chứng.",
          },
          { text: "Bản đính kèm trong email tôi gửi đối tác tháng trước vẫn còn trong hộp thư đã gửi, tôi sẽ xoá và nhắn đối tác xoá theo." },
          {
            text: "Bản tải về máy cá nhân của tôi thì không cần lo vì máy đó là của tôi.",
            error: "Dữ liệu khách không thuộc về cá nhân chỉ vì nằm trên máy cá nhân. Bản này phải xoá như các bản khác.",
          },
          { text: "Bản sao lưu tự động có thể còn giữ tệp thêm một thời gian; tôi đã hỏi IT thời hạn và chờ trả lời." },
          {
            text: "Tôi đã đổi tên tệp thành 'cu.xlsx' để không ai tìm thấy, coi như đã xoá.",
            error: "Đổi tên không đổi nội dung: tệp vẫn đầy dữ liệu khách và vẫn mở được. Nó chỉ khó tìm hơn khi cần xoá thật.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Khách xin xoá, bạn đang ở bước nào",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Mai, một khách cũ, nhắn xin xoá số điện thoại. Bạn thấy số chị trong bảng chung, và nhớ mình từng tải bảng về máy và gửi cho đồng nghiệp marketing.",
            choices: [
              { label: "Xoá dòng của chị Mai trong bảng chung rồi trả lời 'đã xoá hết dữ liệu của chị'", next: "bad_promise" },
              { label: "Liệt kê các nơi có thể còn số của chị trước khi trả lời", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Tuần sau chị Mai vẫn nhận tin khuyến mãi từ marketing, vì bảng cũ nằm trong máy họ. Chị nhắn lại, bực bội, và công ty khó giải thích vì bạn đã hứa 'xoá hết'.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có bảng chung, bảng tải về máy, email gửi marketing, và có thể cả bản sao lưu. Bạn xoá được hai nơi đầu.",
            choices: [
              { label: "Xoá hai nơi của mình, nhờ marketing xoá bản của họ, hỏi IT về sao lưu, ghi lại từng việc", next: "good" },
              { label: "Xoá hai nơi của mình và coi phần còn lại là việc của người khác", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Bạn không báo marketing, nên họ vẫn nhắn chị Mai. Phần 'của người khác' hoá ra vẫn là việc của bạn vì bạn là người nhận yêu cầu.",
            ending: "bad",
          },
          good: {
            text: "Bạn nhắn chị Mai: đã xoá ở các nơi A, B; marketing đã xác nhận xoá; bản sao lưu đang được IT xử lý theo lịch của họ. Chị yên tâm vì câu trả lời cụ thể, và bạn có ghi chép để trả lời nếu bị hỏi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đếm các bản trước khi nói 'đã xoá'.",
          "Bài sau: nhân viên nghỉ việc, tài khoản và tệp còn lại.",
        ],
      },
    ],
  },
  {
    id: 2716,
    slug: "nhan-vien-nghi-viec-tai-khoan-tep-va-du-lieu-con-lai",
    title: "Chặng 65, Bài 17: Nhân viên nghỉ việc: tài khoản, tệp và dữ liệu còn lại",
    subtitle: "Người đi rồi nhưng chìa khoá vẫn còn trong túi: danh sách thu hồi một trang cho ngày cuối.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi một đồng nghiệp nghỉ việc, cả phòng tập trung vào bàn giao công việc, còn tài khoản, thư mục chia sẻ, tệp tải về máy và tin nhắn nhóm ít ai nhớ. Những thứ đó chứa tên, số điện thoại và hồ sơ của khách lẫn của chính nhân viên. Một danh sách thu hồi ngắn giúp bạn không để lại cửa mở sau lưng người đã rời đi.",
    openingQuestion:
      "Anh Hùng nghỉ việc vào thứ Sáu. Trưởng phòng nhờ bạn lo phần 'dọn dẹp'. Bạn bắt đầu từ đâu là hợp lý nhất?",
    openingOptions: [
      "Lập danh sách tài khoản, thư mục, tệp và thiết bị anh Hùng đang giữ rồi làm cùng nhân sự và IT",
      "Xoá hết tệp của anh Hùng ngay trong ngày để không còn gì tồn lại",
      "Để nguyên mọi thứ để phòng khi công việc cần, dọn sau cũng được",
      "Chuyển toàn bộ tệp của anh Hùng sang ổ cá nhân của bạn để tiện xem",
    ],
    correctOption: 0,
    explanation:
      "Bạn chưa biết anh Hùng đang giữ những gì, nên bước đầu là lập danh sách rồi chia việc: thu hồi quyền là việc của IT, xử lý tệp của nhân viên liên quan nhân sự, còn công việc dang dở thuộc trưởng phòng. Xoá hết ngay có thể mất tệp phòng còn cần. Để nguyên là để cửa mở với một tài khoản không còn người chịu trách nhiệm. Chuyển sang ổ cá nhân của bạn chỉ chuyển rủi ro sang chỗ khác.",
    diagram: [
      { label: "Lập danh sách tài khoản, tệp, thiết bị", arrow: true },
      { label: "Bàn giao tệp còn cần cho người kế nhiệm", arrow: true },
      { label: "IT thu hồi quyền truy cập", arrow: true },
      { label: "Nhân sự và pháp chế quyết định phần dữ liệu cá nhân còn lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên kinh doanh nghỉ việc và sang làm cho công ty cùng ngành. Ba tuần sau, tài khoản cũ của anh vẫn đăng nhập được vào thư mục khách hàng chung vì không ai nhớ báo IT. Công ty phải rà xem anh đã mở những tệp nào. Sau sự việc, phòng có thêm một tờ danh sách 'ngày cuối' mà trưởng phòng ký xác nhận cùng IT.",
    },
    quiz: [
      {
        question: "Việc nào nên làm đầu tiên trong ngày cuối của nhân viên nghỉ việc?",
        options: [
          "Lập danh sách tài khoản và thư mục người đó đang có quyền",
          "Xoá hộp thư công ty của người đó cho khỏi rắc rối",
          "Tắt mọi quyền truy cập trước khi ai kịp bàn giao",
          "Hỏi người đó có muốn mang một bản tệp đi không",
        ],
        correct: 0,
        explanation:
          "Bạn cần biết người đó có gì thì mới thu hồi đủ và bàn giao đúng. Xoá hộp thư ngay có thể mất email khách đang chờ xử lý. Tắt quyền trước bàn giao làm công việc dang dở đứng lại. Hỏi mang bản tệp đi là cho phép người rời công ty giữ dữ liệu khách, việc cần được hỏi nhân sự và pháp chế chứ không tự cho.",
      },
      {
        question: "Ai chịu trách nhiệm thu hồi quyền truy cập hệ thống của nhân viên nghỉ việc?",
        options: [
          "IT, theo yêu cầu của nhân sự hoặc trưởng phòng",
          "Bạn, bằng cách tự đổi mật khẩu tài khoản người đó",
          "Chính nhân viên nghỉ việc, vì họ biết mình dùng gì",
          "Đồng nghiệp ngồi cạnh, vì quen thuộc công việc nhất",
        ],
        correct: 0,
        explanation:
          "Quyền truy cập do IT quản lý; nhân sự hoặc trưởng phòng là người gửi yêu cầu kèm danh sách. Tự đổi mật khẩu của người khác là dùng tài khoản không phải của mình. Để người nghỉ việc tự thu hồi không đảm bảo gì, và đồng nghiệp ngồi cạnh không có quyền lẫn trách nhiệm đó.",
      },
      {
        question: "Anh Hùng có 120 tệp cá nhân: 45 tệp là việc phòng còn cần, 30 tệp là dữ liệu khách đã hết mục đích. Còn bao nhiêu tệp chưa phân loại, cần xem tiếp?",
        options: [
          "45 tệp (= 120 − 45 − 30)",
          "30 tệp (= chỉ đếm nhóm dữ liệu khách, bỏ qua nhóm việc còn cần)",
          "75 tệp (= 45 + 30, cộng hai nhóm đã biết cách xử lý thay vì trừ)",
          "0 tệp (= 120 − 120, cho rằng mọi tệp đã được phân loại xong)",
        ],
        correct: 0,
        explanation:
          "120 − 45 − 30 = 45 tệp chưa phân loại, nên còn 45 tệp cần xem. 30 chỉ đếm một nhóm, 75 cộng hai nhóm đã có cách xử lý thay vì trừ chúng, còn 0 cho rằng đã xong khi còn 45 tệp chưa được xem.",
      },
      {
        question: "Tệp việc phòng còn cần nằm trong thư mục cá nhân của người nghỉ việc. Nên làm gì?",
        options: [
          "Chuyển sang thư mục chung của phòng và giao cho người kế nhiệm",
          "Để nguyên tại thư mục cá nhân của người đó, ai cần thì nhắn hỏi lại sau",
          "Chép về ổ cá nhân của trưởng phòng để dễ quản lý",
          "Gửi cho cả phòng qua email để mọi người đều có bản",
        ],
        correct: 0,
        explanation:
          "Tệp việc phải có chủ mới và nằm ở nơi công ty kiểm soát. Để nguyên trong thư mục của người đã đi thì tài khoản đó không thể đóng. Ổ cá nhân của trưởng phòng là chỗ công ty không kiểm soát. Gửi email cho cả phòng nhân thêm bản sao và rải dữ liệu ra nhiều hộp thư.",
      },
      {
        question: "Nhân viên nghỉ việc nhắn: 'Em mang theo bảng khách em tự làm nhé?'. Phản hồi phù hợp là gì?",
        options: [
          "Bảng đó có dữ liệu khách, anh xin hỏi nhân sự và pháp chế rồi báo em sau",
          "Được, bảng em làm thì em giữ, anh không cần biết",
          "Không được, em phải xoá ngay lúc này không cần hỏi ai",
          "Em gửi về email cá nhân của anh rồi anh giữ hộ",
        ],
        correct: 0,
        explanation:
          "Bảng chứa dữ liệu khách không phải tài sản riêng của người làm ra nó; cho hay không cho mang đi do công ty quyết định, không phải bạn. Trả lời 'được' là nhường quyết định đó. Bắt xoá ngay không hỏi có thể mất dữ liệu phải giữ. Gửi về email cá nhân của bạn chỉ chuyển dữ liệu sang chỗ khác.",
      },
    ],
    keyTakeaways: [
      "Ngày cuối cần một danh sách: tài khoản, thư mục, tệp tải về, thiết bị, nhóm chat.",
      "IT thu hồi quyền; nhân sự và pháp chế quyết định phần dữ liệu cá nhân còn lại.",
      "Tệp việc còn cần thì chuyển về thư mục chung và giao người kế nhiệm.",
      "Dữ liệu khách không đi theo người nghỉ việc và không chuyển sang ổ cá nhân của bạn.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nghỉ việc. Bạn thấy trong thư mục chị một tệp 'luong-2024.xlsx' có họ tên và lương của cả phòng. Nên làm gì với tệp này?",
      options: [
        "Không mở thêm, báo nhân sự và IT để xử lý theo quy định",
        "Mở ra xem cho chắc chắn đây là tệp của phòng hay tệp cá nhân",
        "Xoá luôn cho gọn vì chị Lan đã nghỉ",
        "Chuyển cho cả phòng để mọi người cùng kiểm tra",
      ],
      correct: 0,
      explanation:
        "Bảng lương là dữ liệu cá nhân nhạy cảm của nhiều người; cách xử lý do nhân sự và IT quyết định. Mở ra xem thêm là đọc thứ bạn không cần. Xoá ngay có thể mất hồ sơ phải giữ. Chuyển cho cả phòng là làm lộ lương.",
    },
    summary: {
      keyIdea: "Người rời đi, nhưng tài khoản và tệp của họ vẫn ở lại; ngày cuối cần một danh sách có chủ.",
      formula: "Danh sách tài khoản và tệp + IT thu hồi quyền + nhân sự quyết phần dữ liệu cá nhân = ngày cuối không để cửa mở.",
      commonMistake: "Tập trung vào bàn giao công việc mà quên tài khoản, thư mục chia sẻ và tệp tải về.",
      action: "Viết danh sách 'ngày cuối' một trang cho phòng bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một danh sách 'ngày cuối của nhân viên nghỉ việc' cho phòng bạn, tối đa 10 dòng: tài khoản nào, thư mục chung nào, nhóm chat nào, thiết bị nào, tệp nào có dữ liệu khách hoặc lương. Ghi cạnh mỗi dòng ai làm: IT, nhân sự hay trưởng phòng. Gửi trưởng phòng xem có thiếu dòng nào không.",
      secondary: "Ngày mai kiểm lại: dòng nào bạn chưa biết ai làm?",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, cả phòng mua bánh chia tay anh Hùng. Anh gập máy, bàn giao ba dự án và đi. Thứ Hai, tài khoản của anh vẫn đăng nhập được vào thư mục khách hàng chung, và trong máy anh còn một bảng 2.000 dòng số điện thoại. Bài này là tờ giấy bạn cần trước ngày cuối của bất kỳ ai.",
      },
      {
        type: "feynman",
        title: "Ngày cuối đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc người thuê nhà dọn đi: bạn thu lại chìa khoá, xem trong nhà còn đồ gì của chủ nhà, và hỏi đồ riêng của họ mang đi đâu. Nhân viên nghỉ việc cũng để lại 'chìa khoá' là tài khoản và 'đồ đạc' là tệp.",
        columns: ["Thành phần", "Người thuê nhà dọn đi", "Nhân viên nghỉ việc"],
        rows: [
          ["Chìa khoá", "Thu chìa cửa chính, chìa phòng", "IT thu hồi tài khoản, quyền vào thư mục chung"],
          ["Đồ của chủ nhà", "Bàn ghế, tủ lạnh ở lại", "Tệp việc phòng còn cần, bàn giao cho người kế nhiệm"],
          ["Đồ riêng", "Người thuê mang đi", "Tệp cá nhân: xem kỹ trước khi cho mang, dữ liệu khách không được mang"],
          ["Biên bản bàn giao", "Hai bên ký xác nhận", "Danh sách ngày cuối có chữ ký hoặc xác nhận của trưởng phòng"],
        ],
        oneLiner: "Thu chìa khoá, bàn giao đồ của chủ nhà, hỏi kỹ đồ riêng, và ghi lại.",
      },
      { type: "heading", text: "Ba nhóm cần nghĩ tới" },
      {
        type: "paragraph",
        text: "Nhóm một là tài khoản và quyền: email công ty, thư mục chung, công cụ quản lý khách, nhóm chat. Nhóm hai là tệp: thư mục cá nhân, Tải về, USB, tệp gửi về email riêng. Nhóm ba là dữ liệu cá nhân trong các tệp đó, của khách lẫn của chính nhân viên (hồ sơ nhân sự, bảng lương). Nhóm ba là nhóm bạn không tự quyết một mình.",
      },
      {
        type: "list",
        items: [
          "Quyền truy cập: nhờ IT thu hồi, không tự đổi mật khẩu hay đăng nhập tài khoản người khác.",
          "Tệp việc còn cần: chuyển sang thư mục chung, giao người kế nhiệm và ghi vào biên bản.",
          "Tệp có dữ liệu cá nhân: hỏi nhân sự và pháp chế giữ hay xoá, bao lâu.",
          "Thiết bị và bản sao: máy công ty, USB, email gửi về hộp thư riêng: nhắc người nghỉ việc trả hoặc xoá theo hướng dẫn.",
        ],
      },
      {
        type: "flow",
        title: "Danh sách ngày cuối của một nhân viên",
        steps: [
          { label: "Liệt kê", detail: "Trưởng phòng và người nghỉ việc cùng viết ra tài khoản, thư mục, nhóm chat, thiết bị và tệp có dữ liệu cá nhân đang giữ." },
          { label: "Bàn giao tệp còn cần", detail: "Tệp việc chuyển sang thư mục chung và giao người kế nhiệm, ghi tên người nhận vào danh sách." },
          { label: "IT thu hồi quyền", detail: "Gửi IT danh sách tài khoản cần khoá hoặc chuyển chủ, kèm ngày giờ có hiệu lực." },
          { label: "Hỏi về dữ liệu cá nhân", detail: "Tệp có dữ liệu khách hoặc hồ sơ nhân viên: hỏi nhân sự và pháp chế xử lý thế nào, không tự xoá hàng loạt." },
          { label: "Xác nhận và lưu biên bản", detail: "Người nghỉ việc, trưởng phòng và IT cùng xác nhận đã xong, ghi ngày; giữ biên bản theo lịch lưu trữ của phòng." },
        ],
      },
      {
        type: "callout",
        label: "Người đi không nên là người tự dọn",
        text: "Đừng để người sắp nghỉ tự quyết xoá hay mang tệp đi vào phút cuối. Việc đó cần một người thứ hai cùng xem danh sách; nếu không có biên bản, sau này khó chứng minh điều gì đã xảy ra.",
      },
      {
        type: "scenario",
        title: "Thứ Năm trước ngày nghỉ của anh Hùng",
        start: "s1",
        nodes: {
          s1: {
            text: "Trưởng phòng giao bạn việc dọn dẹp cho anh Hùng, nghỉ vào thứ Sáu. Anh đang giữ thư mục khách chung, 15 tệp trong thư mục cá nhân và có quyền vào công cụ quản lý khách hàng.",
            choices: [
              { label: "Ngồi cùng anh Hùng lập danh sách tài khoản, thư mục và tệp anh đang giữ", next: "s2" },
              { label: "Nhờ anh Hùng 'tự dọn xong rồi báo lại' vì anh biết rõ nhất", next: "bad_self" },
            ],
          },
          bad_self: {
            text: "Anh Hùng xoá vội vài thư mục, trong đó có bảng hợp đồng khách đang xử lý. Thứ Hai cả phòng mất nửa ngày tìm lại. Và không ai biết anh có mang tệp nào đi không.",
            ending: "bad",
          },
          s2: {
            text: "Danh sách có 3 tài khoản, 2 thư mục chung, và 15 tệp, trong đó 6 tệp có tên và số điện thoại khách.",
            choices: [
              { label: "Gửi danh sách cho IT thu hồi quyền vào thứ Sáu và nhờ nhân sự xem 6 tệp có dữ liệu khách", next: "s3" },
              { label: "Tự đăng nhập tài khoản anh Hùng để xoá các tệp cho nhanh", next: "bad_login" },
            ],
          },
          bad_login: {
            text: "Bạn dùng tài khoản của người khác, vượt quyền của mình. Nhật ký hệ thống ghi việc đăng nhập và IT hỏi vì sao; việc tốt nhưng cách làm sai.",
            ending: "bad",
          },
          s3: {
            text: "Nhân sự và pháp chế trả lời: 4 tệp hết mục đích, hỏi được xoá; 2 tệp phải giữ theo lịch lưu trữ. IT hẹn khoá quyền lúc 17 giờ thứ Sáu.",
            choices: [
              { label: "Bàn giao 9 tệp việc cho người kế nhiệm, xoá 4 tệp, chuyển 2 tệp phải giữ vào thư mục lưu trữ và ghi biên bản", next: "good" },
              { label: "Xoá cả 6 tệp có dữ liệu khách cho đơn giản", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "2 tệp trong đó là hồ sơ phải giữ theo quy định. Khi kế toán cần, tệp đã mất và bạn không có biên bản nào cho thấy ai đã cho phép xoá.",
            ending: "bad",
          },
          good: {
            text: "Thứ Sáu 17 giờ, IT khoá quyền, biên bản có chữ ký ba bên. Thứ Hai người kế nhiệm mở đúng thư mục chung và không ai phải hỏi lại anh Hùng.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn danh sách thu hồi cho ngày cuối",
        task: "Bạn cần danh sách kiểm cho ngày cuối của một nhân viên kinh doanh. Lắp yêu cầu để AI soạn khung, không dán tên hay dữ liệu thật của người đó.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Làm danh sách cho nhân viên nghỉ việc.", feedback: "AI không biết vai trò hay công cụ nào; nó trả danh sách chung, thiếu thư mục khách và công cụ quản lý khách." },
              { text: "Nhân viên kinh doanh nghỉ việc, dùng email công ty, thư mục khách chung, công cụ quản lý khách và nhóm chat. Không đưa tên hay dữ liệu thật.", good: true, feedback: "Đủ vai trò và nhóm tài khoản để AI soạn đúng khung, không lộ dữ liệu người thật." },
              { text: "Anh Hùng, số điện thoại 09xx, có bảng khách 2.000 dòng dưới đây, dán cả vào...", feedback: "Bạn vừa đưa thông tin cá nhân của nhân viên lẫn khách vào một công cụ bên ngoài chỉ để lập danh sách." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Soạn danh sách 4 nhóm: tài khoản, tệp việc, tệp có dữ liệu cá nhân, thiết bị; mỗi dòng ghi ai làm (IT, nhân sự, trưởng phòng).", good: true, feedback: "Chia nhóm và gán người làm, nên danh sách dùng được ngay." },
              { text: "Viết một thông báo thật hay cho cả phòng về việc nhân viên nghỉ việc.", feedback: "Đó là việc khác; bạn sẽ nhận một thông báo đẹp mà không có danh sách nào để làm." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Ở dòng dữ liệu cá nhân, ghi 'hỏi nhân sự và pháp chế', không tự ghi giữ hay xoá bao lâu.", good: true, feedback: "Bạn chặn AI đoán thời hạn hay quyết định thay người có thẩm quyền." },
              { text: "Ghi luôn nên giữ bao nhiêu năm cho mỗi loại tệp theo luật.", feedback: "AI sẽ đưa con số nghe hợp lý nhưng không ai xác nhận." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "rule"],
            text: "1. Tài khoản (IT): email công ty, công cụ quản lý khách, nhóm chat, thư mục khách chung - thu hồi hoặc chuyển chủ vào ngày cuối.\n2. Tệp việc còn cần (trưởng phòng): chuyển vào thư mục chung, ghi người kế nhiệm.\n3. Tệp có dữ liệu cá nhân (nhân sự, pháp chế): hỏi giữ hay xoá, không tự xử lý.\n4. Thiết bị (IT): thu hồi máy, USB; kiểm tra email chuyển về hộp thư riêng.\n\n(Khung đủ nhóm, mỗi dòng có người làm, không có thời hạn bịa.)",
          },
          {
            requires: ["context"],
            text: "Danh sách ngày cuối: thu hồi email; khoá tài khoản; xoá tệp cá nhân sau 30 ngày; giữ hồ sơ khách 5 năm.\n\n(Có khung, nhưng không ai chịu trách nhiệm từng dòng, và AI tự điền '30 ngày', '5 năm' mà không ai xác nhận.)",
          },
          {
            text: "Chúc mừng anh Hùng đã có một chặng đường cống hiến. Sau đây là danh sách: kiểm tra 2.000 số điện thoại khách, xoá mọi dữ liệu trong 7 ngày theo quy định...\n\n(Yêu cầu mơ hồ hoặc lộ dữ liệu: AI viết lời chúc, bịa quy định '7 ngày' và dùng dữ liệu bạn không cần đưa.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Danh sách trước, thu hồi quyền cùng IT, dữ liệu cá nhân hỏi nhân sự và pháp chế.",
          "Bài sau: khách hỏi dữ liệu của họ ở đâu hoặc xin xoá.",
        ],
      },
    ],
  },
  {
    id: 2717,
    slug: "khach-yeu-cau-xem-hoac-xoa-du-lieu-cua-ho-ban-lam-gi-hom-nay",
    title: "Chặng 65, Bài 18: Khách hỏi dữ liệu của họ đang ở đâu hoặc xin xoá: bạn làm gì hôm nay",
    subtitle: "Bạn không cần là luật sư để trả lời đúng trong ngày đầu: nhận, chuyển đúng người, ghi lại.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một ngày nào đó khách nhắn: 'Các bạn đang giữ những gì về tôi? Xoá giúp tôi'. Thường tin nhắn rơi vào người trực fanpage hay nhân viên chăm sóc khách hàng, không phải pháp chế. Nếu bạn im lặng, trả lời bừa hoặc hứa xoá ngay, cả khách lẫn công ty đều chịu thiệt. Việc bạn làm hôm nay rất đơn giản nhưng phải đúng thứ tự.",
    openingQuestion:
      "Một khách nhắn qua fanpage: 'Cho tôi biết công ty đang lưu những gì về tôi, và xoá giúp tôi'. Bạn là người đầu tiên đọc tin. Việc hợp lý nhất bạn làm ngay là gì?",
    openingOptions: [
      "Trả lời tạm là đã nhận, chuyển đúng người phụ trách và ghi lại thời điểm nhận",
      "Xoá ngay dòng của khách trong bảng bạn đang dùng rồi báo khách xong",
      "Không trả lời để khỏi hứa điều mình chưa chắc, chờ khách nhắn lại",
      "Trả lời rằng công ty không lưu gì về khách để khách yên tâm",
    ],
    correctOption: 0,
    explanation:
      "Bạn chưa biết công ty đang giữ gì ở những nơi nào và thủ tục cụ thể do pháp chế xác nhận, nên việc đúng là xác nhận đã nhận, chuyển đúng người và ghi thời điểm. Xoá ngay một bảng rồi báo xong là hứa điều bạn chưa kiểm. Im lặng làm khách bực và mất dấu thời điểm nhận. Nói 'không lưu gì' mà chưa kiểm là nói điều có thể sai.",
    diagram: [
      { label: "Nhận tin và ghi thời điểm", arrow: true },
      { label: "Trả lời tạm: đã nhận, sẽ có người liên hệ", arrow: true },
      { label: "Chuyển đúng người phụ trách", arrow: true },
      { label: "Người phụ trách kiểm các nơi lưu và trả lời chính thức" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một cửa hàng trực tuyến nhỏ nhận tin xin xoá thông tin từ một khách. Người trực hộp thư trả lời 'đã nhận, bộ phận phụ trách sẽ liên hệ trong thời gian sớm nhất', chuyển tin cho trưởng nhóm và ghi lại giờ nhận. Pháp chế xác nhận cách xử lý, nhóm kiểm các nơi lưu, rồi gửi khách câu trả lời đầy đủ. Khách được trả lời ngay hôm đó, dù việc xoá xong vài ngày sau.",
    },
    quiz: [
      {
        question: "Khách nhắn xin xoá dữ liệu. Câu trả lời đầu tiên của bạn nên có gì?",
        options: [
          "Xác nhận đã nhận, nói sẽ có người phụ trách liên hệ",
          "Cam kết cụ thể dữ liệu của khách sẽ bị xoá hết trong hôm nay",
          "Hỏi khách lý do xin xoá rồi mới quyết định có xử lý hay không",
          "Giải thích dài về các quy định pháp luật liên quan đến yêu cầu này",
        ],
        correct: 0,
        explanation:
          "Câu trả lời tạm chỉ nên xác nhận đã nhận và ai sẽ liên hệ, không hứa thứ chưa biết. Cam kết xoá hết trong hôm nay có thể sai vì còn sao lưu hay hồ sơ phải giữ. Bắt khách giải thích lý do là tự đặt điều kiện không có trong việc của bạn. Giải thích luật cho khách là việc của pháp chế.",
      },
      {
        question: "Ai nên chính thức trả lời khách về việc công ty đang giữ dữ liệu gì và có xoá được không?",
        options: [
          "Người phụ trách do pháp chế hoặc lãnh đạo chỉ định",
          "Bạn, nếu bạn đã xem qua bảng khách của phòng mình",
          "Nhân viên bán hàng đã từng làm việc với khách đó",
          "Công cụ AI soạn thư trả lời dựa trên mô tả của bạn",
        ],
        correct: 0,
        explanation:
          "Câu trả lời chính thức cần người biết các nơi công ty lưu dữ liệu và thủ tục đã được xác nhận. Xem một bảng không đủ để biết hết. Nhân viên bán hàng chỉ biết phần việc của họ. AI có thể giúp soạn nháp câu chữ, nhưng không biết công ty bạn lưu gì và không chịu trách nhiệm về nội dung.",
      },
      {
        question: "Bạn ghi lại việc nhận yêu cầu của khách. Thông tin nào quan trọng nhất cần ghi?",
        options: [
          "Ngày giờ nhận, kênh nhận, yêu cầu là gì và bạn chuyển cho ai",
          "Cảm nhận của bạn về thái độ của khách khi nhắn tin",
          "Toàn bộ lịch sử mua hàng của khách để tiện trả lời",
          "Chỉ tên khách, các chi tiết khác có thể hỏi lại sau",
        ],
        correct: 0,
        explanation:
          "Ngày giờ, kênh, nội dung yêu cầu và người nhận việc là bằng chứng công ty đã xử lý đúng hạn. Cảm nhận cá nhân không cần cho việc này. Sao chép toàn bộ lịch sử mua hàng là lại tạo thêm một bản dữ liệu khách. Chỉ có tên thì không đủ để chứng minh điều gì.",
      },
      {
        question: "Yêu cầu nhận hôm thứ Hai, bạn chuyển ngay nhưng quên ghi giờ. Đến thứ Tư khách hỏi 'đã xử lý chưa'. Điều gì xảy ra?",
        options: [
          "Bạn không chứng minh được mốc nhận và khó trả lời khách",
          "Không sao, vì khách sẽ tự nhớ ngày mình gửi tin",
          "Việc vẫn xong đúng hạn vì người phụ trách sẽ tự biết",
          "Khách phải nhắn lại từ đầu, yêu cầu cũ coi như hết hiệu lực",
        ],
        correct: 0,
        explanation:
          "Khi có thời hạn trả lời, mốc nhận là điểm bắt đầu tính; thiếu nó bạn không nói được công ty đã chậm hay chưa. Khách nhớ ngày không thay cho ghi chép của công ty. Người phụ trách không tự biết nếu bạn không ghi. Khách nhắn lại không làm yêu cầu cũ hết hiệu lực; đó là cách đẩy lỗi sang khách.",
      },
      {
        question: "Khách hỏi: 'Công ty có dùng số của tôi để gọi quảng cáo không?'. Bạn không chắc. Nên trả lời thế nào?",
        options: [
          "Em sẽ chuyển câu hỏi cho bộ phận phụ trách kiểm tra rồi báo lại anh chị",
          "Không đâu ạ, chúng tôi chỉ dùng số điện thoại của anh chị để giao hàng thôi ạ",
          "Có thể có, nhưng anh chị không cần lo vì công ty rất an toàn",
          "Đây là thông tin nội bộ nên chúng tôi không thể nói",
        ],
        correct: 0,
        explanation:
          "Khi chưa biết, câu trung thực là nhận câu hỏi và chuyển người kiểm tra. Nói 'chỉ dùng để giao hàng' là khẳng định điều bạn chưa kiểm và nếu sai sẽ mất lòng tin. 'Có thể có' mà không chi tiết làm khách lo thêm. Từ chối vì 'nội bộ' là tránh trả lời câu hỏi về chính dữ liệu của họ.",
      },
      {
        question: "Bạn soạn thư trả lời tạm cho khách bằng trợ lý AI. Điều nào nên làm?",
        options: [
          "Đưa vào nội dung yêu cầu đã bỏ tên và số, rồi tự đọc lại trước khi gửi",
          "Dán nguyên tin nhắn có họ tên, số điện thoại của khách vào AI cho nó hiểu ngữ cảnh đầy đủ",
          "Gửi luôn thư AI viết vì đó là câu chữ chuẩn nhất",
          "Nhờ AI cam kết thời hạn xử lý cụ thể vào thư",
        ],
        correct: 0,
        explanation:
          "AI chỉ cần nội dung yêu cầu, không cần tên hay số của khách, nên bỏ chúng ra trước khi đưa vào. Gửi thư không đọc lại là bỏ qua bước kiểm. Để AI cam kết thời hạn là để nó bịa một con số công ty chưa hề xác nhận. Còn dán nguyên tin nhắn là đưa dữ liệu khách ra ngoài không cần thiết.",
      },
    ],
    keyTakeaways: [
      "Hôm nay bạn chỉ cần: xác nhận đã nhận, chuyển đúng người, ghi thời điểm.",
      "Đừng hứa xoá hết, đừng nói 'không lưu gì' khi chưa kiểm.",
      "Thủ tục cụ thể và câu trả lời chính thức do pháp chế xác nhận.",
      "Nếu nhờ AI soạn thư, bỏ tên và số của khách ra trước.",
    ],
    practicePrompt: {
      question:
        "Khách xin xoá số điện thoại, bạn trả lời tạm xong. Bước tiếp theo hợp lý nhất là gì?",
      options: [
        "Gửi yêu cầu cho người phụ trách kèm thời điểm nhận và ghi vào sổ theo dõi",
        "Tự xoá số ở mọi nơi bạn có thể truy cập rồi báo xong",
        "Chờ vài ngày xem khách có nhắn lại không rồi mới chuyển",
        "Trả lời khách thêm lần nữa để khách đỡ sốt ruột",
      ],
      correct: 0,
      explanation:
        "Chuyển ngay kèm mốc nhận để người phụ trách bắt đầu kiểm các nơi lưu. Tự xoá ở mọi nơi bạn truy cập được có thể xoá dữ liệu phải giữ và bỏ sót các nơi bạn không thấy. Chờ vài ngày làm chậm thời hạn. Trả lời thêm không đẩy việc đi.",
    },
    summary: {
      keyIdea: "Hôm nay bạn chỉ làm ba việc nhỏ và đúng: nhận, chuyển, ghi.",
      formula: "Trả lời tạm + chuyển đúng người + ghi thời điểm = yêu cầu không bị rơi.",
      commonMistake: "Hứa xoá ngay, hoặc nói 'chúng tôi không lưu gì' khi chưa ai kiểm.",
      action: "Soạn sẵn một câu trả lời tạm và hỏi trưởng nhóm yêu cầu kiểu này chuyển cho ai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Soạn sẵn một câu trả lời tạm 3 dòng cho khách hỏi hoặc xin xoá dữ liệu (đã nhận, ai sẽ liên hệ, không hứa thời hạn hay kết quả). Sau đó hỏi trưởng nhóm hoặc pháp chế: yêu cầu này chuyển cho ai, qua kênh nào. Ghi lại tên người và kênh vào một ghi chú dễ tìm.",
      secondary: "Ngày mai kiểm lại: bạn đã biết ai nhận yêu cầu chưa? Nếu chưa, đó là việc cần hỏi đầu tiên.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba, hộp thư trang bán hàng nhận một tin: 'Mình từng mua hàng bên bạn. Cho mình biết các bạn đang lưu gì về mình và xoá giúp mình nhé.' Bạn là người trực trang, không phải pháp chế. Bài này cho bạn ba việc nhỏ để làm đúng ngay hôm đó.",
      },
      {
        type: "feynman",
        title: "Yêu cầu của khách đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới lễ tân một toà nhà nhận một lá thư gửi cho trưởng phòng. Lễ tân không mở thư, cũng không trả lời thay; họ ký nhận, ghi giờ và đưa đúng phòng. Khi khách xin xem hay xoá dữ liệu, bạn đóng vai lễ tân ấy.",
        columns: ["Thành phần", "Lễ tân nhận thư", "Bạn nhận yêu cầu của khách"],
        rows: [
          ["Nhận", "Ký nhận, ghi giờ", "Ghi ngày giờ, kênh nhận và nội dung yêu cầu"],
          ["Xác nhận với người gửi", "Nói thư đã nhận", "Trả lời tạm: đã nhận, sẽ có người liên hệ"],
          ["Đưa đúng chỗ", "Đưa đúng phòng, không mở thư", "Chuyển đúng người phụ trách, không tự quyết thay"],
          ["Không làm", "Không trả lời thay trưởng phòng", "Không hứa xoá, không khẳng định công ty 'không lưu gì'"],
        ],
        oneLiner: "Bạn là lễ tân của yêu cầu: nhận, xác nhận, chuyển đúng người và ghi lại.",
      },
      { type: "heading", text: "Vì sao không nên xoá hay trả lời thật đầy đủ ngay" },
      {
        type: "paragraph",
        text: "Dữ liệu của một khách thường nằm ở nhiều nơi: bảng bán hàng, hộp thư, công cụ chăm sóc khách, bản sao lưu, cả đối tác giao hàng. Bạn chỉ nhìn được một hai nơi. Một số loại hồ sơ có thể phải giữ theo quy định, nhưng thời hạn và trường hợp cụ thể do pháp chế xác nhận, không phải bạn đoán. Vì thế câu trả lời đầy đủ cần người kiểm hết các nơi; việc của bạn hôm nay là không để yêu cầu rơi mất.",
      },
      {
        type: "list",
        items: [
          "Nhận: ghi ngày giờ, kênh (fanpage, email, điện thoại) và nguyên văn yêu cầu.",
          "Xác nhận: một câu trả lời tạm, không hứa kết quả hay thời hạn.",
          "Chuyển: gửi cho người phụ trách (pháp chế hoặc người được chỉ định), kèm mốc nhận.",
          "Theo dõi: ghi vào sổ, hẹn ngày hỏi lại người phụ trách đã trả lời khách chưa.",
        ],
      },
      {
        type: "flow",
        title: "Từ tin nhắn của khách tới câu trả lời chính thức",
        steps: [
          { label: "Bạn nhận và ghi", detail: "Chụp lại hoặc chép nguyên văn yêu cầu, ghi ngày giờ và kênh. Không sửa, không diễn giải." },
          { label: "Trả lời tạm", detail: "Một hai câu: đã nhận yêu cầu, bộ phận phụ trách sẽ liên hệ. Không hứa ngày xong, không nói kết quả." },
          { label: "Chuyển người phụ trách", detail: "Gửi yêu cầu kèm mốc nhận cho người được giao (thường là pháp chế hoặc quản lý). Hỏi lại người đó nếu chưa biết là ai." },
          { label: "Kiểm các nơi lưu", detail: "Người phụ trách cùng các nhóm liên quan xem dữ liệu của khách nằm ở đâu: bảng bán hàng, hộp thư, công cụ, sao lưu." },
          { label: "Trả lời chính thức", detail: "Gửi khách câu trả lời đầy đủ, theo thủ tục đã được xác nhận; bạn ghi ngày gửi vào sổ theo dõi." },
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc 'hỏi pháp chế'",
        text: "Thủ tục, thời hạn trả lời và những hồ sơ phải giữ theo quy định do pháp chế hoặc chuyên gia xác nhận. Bạn đừng trích điều luật hay hứa một con số ngày; hãy ghi 'theo thủ tục của công ty'.",
      },
      {
        type: "scenario",
        title: "Tin nhắn của chị Hà lúc 9 giờ sáng",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Hà nhắn qua fanpage: 'Cho chị xem các bạn đang lưu gì về chị, và xoá số điện thoại giúp chị.' Bạn là người trực fanpage.",
            choices: [
              { label: "Nhắn lại ngay: 'Em đã xoá số của chị rồi ạ' sau khi xoá một dòng trong bảng của mình", next: "bad_promise" },
              { label: "Ghi ngày giờ, trả lời tạm đã nhận, rồi chuyển cho người phụ trách", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Số của chị Hà vẫn còn trong hộp thư marketing và công cụ chăm sóc khách. Tuần sau chị nhận tin khuyến mãi và nhắn lại, gay gắt vì đã được báo là xoá.",
            ending: "bad",
          },
          s2: {
            text: "Người phụ trách (chị Quyên ở pháp chế) nhắn: 'Em gửi yêu cầu nguyên văn và giờ nhận. Em cũng ghi giúp chị các nơi em từng dùng số của chị Hà nhé.'",
            choices: [
              { label: "Gửi yêu cầu nguyên văn, giờ nhận, và danh sách các nơi em từng dùng số của chị Hà", next: "good" },
              { label: "Nói: 'Em chỉ trực fanpage, các nơi khác em không biết nên em không ghi gì'", next: "bad_unknown" },
            ],
          },
          bad_unknown: {
            text: "Chị Quyên phải tự đi hỏi từng nhóm. Việc chậm hai ngày, và chị Hà phải nhắn hỏi lại vì không thấy ai liên hệ.",
            ending: "bad",
          },
          good: {
            text: "Chị Quyên có đủ thông tin để kiểm đúng các nơi. Ba ngày sau chị Hà nhận câu trả lời chính thức, cụ thể: dữ liệu ở đâu, đã xử lý thế nào. Bạn ghi ngày gửi vào sổ theo dõi.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn câu trả lời tạm cho khách",
        task: "Khách xin xem và xoá dữ liệu. Lắp yêu cầu để AI soạn câu trả lời tạm, không đưa tên hay số của khách.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Soạn thư trả lời khách xin xoá dữ liệu.", feedback: "AI sẽ tự chọn giọng và hứa vài điều; không biết công ty bạn có bước chuyển người phụ trách nào." },
              { text: "Tôi trực hộp thư bán hàng. Khách xin xem và xoá dữ liệu. Tôi sẽ chuyển cho bộ phận phụ trách. Không đưa tên hay số của khách.", good: true, feedback: "AI biết vai của bạn, bước tiếp theo trong công ty, và bạn không gửi dữ liệu thật." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Soạn thư 3 câu: xác nhận đã nhận, nói bộ phận phụ trách sẽ liên hệ, cảm ơn khách.", good: true, feedback: "Ba ý nhỏ đủ dùng và không hứa điều chưa biết." },
              { text: "Soạn thư cam kết đã xoá toàn bộ dữ liệu của khách và xin lỗi nếu có bất tiện.", feedback: "Cam kết đã xoá là điều bạn chưa kiểm; thư đó có thể thành lời hứa sai." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Không nêu thời hạn xong, không nhắc điều luật, không khẳng định kết quả. Xưng 'chúng tôi', giọng lịch sự.", good: true, feedback: "Ba điều cấm này chặn đúng những chỗ AI hay hứa bừa." },
              { text: "Thêm thời hạn xử lý cụ thể và điều luật liên quan để thư trông chắc chắn.", feedback: "AI sẽ bịa thời hạn và điều luật nghe hợp lý, rất dễ sai." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "rule"],
            text: "Kính gửi Quý khách,\n\nChúng tôi đã nhận được yêu cầu của Quý khách về dữ liệu cá nhân. Bộ phận phụ trách sẽ xem xét và liên hệ lại với Quý khách. Xin cảm ơn Quý khách đã thông báo cho chúng tôi.\n\n(Ba câu, không hứa gì chưa biết.)",
          },
          {
            requires: ["context"],
            text: "Kính gửi Quý khách,\n\nChúng tôi rất tiếc về sự bất tiện này. Yêu cầu của Quý khách sẽ được xử lý trong vòng 3 ngày làm việc theo quy định hiện hành...\n\n(Có khung thư, nhưng AI tự thêm '3 ngày làm việc' và 'quy định hiện hành' mà không ai xác nhận.)",
          },
          {
            text: "Xin chào, dữ liệu của bạn đã được xoá vĩnh viễn khỏi mọi hệ thống của chúng tôi theo đúng điều luật.\n\n(Yêu cầu mơ hồ: AI khẳng định đã xoá vĩnh viễn và viện dẫn luật mà công ty chưa làm và chưa kiểm.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Nhận, trả lời tạm, chuyển đúng người, ghi lại.",
          "Bài sau: sếp muốn xem lịch sử duyệt web của nhân viên.",
        ],
      },
    ],
  },
  {
    id: 2718,
    slug: "giam-sat-nhan-vien-khi-nao-thanh-xam-pham-cau-hoi-can-hoi",
    title: "Chặng 65, Bài 19: Giám sát nhân viên: khi nào thành xâm phạm, câu hỏi cần hỏi",
    subtitle: "Sếp muốn xem lịch sử duyệt web của cả phòng: bạn không cần cãi, chỉ cần hỏi đúng ba câu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "👀",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp nhắn: 'Em xuất giúp anh lịch sử duyệt web và tin nhắn của cả phòng tuần qua'. Có thể anh có lý do chính đáng, cũng có thể anh chỉ tò mò. Nếu bạn im lặng làm theo, bạn trở thành người chạm vào dữ liệu riêng tư của đồng nghiệp. Nếu từ chối ngay, bạn mất lòng sếp. Ba câu hỏi về mục đích, mức độ và thông báo trước giúp bạn đi giữa hai cực đó.",
    openingQuestion:
      "Sếp nhờ bạn xuất lịch sử duyệt web của cả phòng trong tuần qua 'để xem ai làm việc riêng'. Phản ứng hợp lý nhất của bạn là gì?",
    openingOptions: [
      "Hỏi sếp mục đích, phạm vi cần xem và nhân viên đã được báo trước chưa",
      "Xuất ngay tất cả dữ liệu vì sếp có quyền xem mọi thứ của công ty",
      "Từ chối thẳng vì giám sát nhân viên luôn là vi phạm quyền riêng tư của họ dù có lý do",
      "Xuất trước rồi báo nhân viên sau để không ai kịp xoá lịch sử",
    ],
    correctOption: 0,
    explanation:
      "Giám sát có thể chính đáng nếu có mục đích rõ, mức độ vừa đủ và nhân viên được biết trước; việc đó do lãnh đạo, nhân sự và pháp chế quyết định. Xuất ngay tất cả bỏ qua cả ba điều kiện, còn từ chối thẳng với lý do 'luôn vi phạm' nói quá: nhiều công ty hợp pháp giám sát thiết bị công ty theo chính sách đã công bố. Báo sau là đi ngược nguyên tắc thông báo trước.",
    diagram: [
      { label: "Mục đích: sếp cần giải quyết việc gì", arrow: true },
      { label: "Mức độ: có cách nhẹ hơn không", arrow: true },
      { label: "Thông báo: nhân viên đã biết trước chưa", arrow: true },
      { label: "Người có thẩm quyền (nhân sự, pháp chế) duyệt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: trưởng phòng một công ty dịch vụ muốn xem lịch sử duyệt web của cả nhóm sau khi hiệu suất giảm. Người quản trị hệ thống hỏi lại: mục đích là gì, có cách nhẹ hơn như xem kết quả công việc không, và chính sách công ty có nêu việc giám sát chưa. Hai bên quay lại đặt chỉ tiêu công việc rõ ràng và cập nhật chính sách giám sát thiết bị công ty, thay vì xem lịch sử từng người.",
    },
    quiz: [
      {
        question: "Yếu tố nào quan trọng nhất để việc giám sát nhân viên có thể chính đáng?",
        options: [
          "Mục đích rõ ràng, mức độ vừa đủ và nhân viên được biết trước",
          "Sếp là người yêu cầu nên không cần thêm điều kiện nào khác, vì sếp chịu trách nhiệm",
          "Theo dõi càng nhiều càng tốt để không bỏ sót vấn đề nào",
          "Giấu nhân viên để họ hành xử tự nhiên, cho kết quả đúng",
        ],
        correct: 0,
        explanation:
          "Ba điều kiện mục đích, mức độ và thông báo là cốt lõi của câu hỏi. Yêu cầu của sếp không thay cho chúng. Theo dõi nhiều chỉ tạo thêm dữ liệu cá nhân mà không gắn với mục đích. Giấu nhân viên là đi ngược nguyên tắc biết trước, và nếu lộ ra sẽ phá lòng tin.",
      },
      {
        question: "Sếp nói 'để xem ai làm việc riêng'. Câu hỏi nào giúp làm rõ mục đích?",
        options: [
          "Anh đang gặp vấn đề cụ thể nào, ví dụ chậm tiến độ hay lộ thông tin?",
          "Anh có chắc mình có quyền làm việc này không ạ?",
          "Nếu em xuất thì anh định xử lý ai trước?",
          "Sao anh không tin nhân viên của mình ạ?",
        ],
        correct: 0,
        explanation:
          "Hỏi về vấn đề cụ thể đưa cuộc nói chuyện về mục đích và mở ra cách giải quyết nhẹ hơn. Hỏi 'có quyền không' nghe như chất vấn sếp. Hỏi ai bị xử lý trước đã ngầm coi mục đích là kết tội. Câu cuối là trách móc, dễ khiến cuộc nói chuyện kết thúc sớm.",
      },
      {
        question: "Mục đích là kiểm tra tiến độ. Cách nào ít xâm phạm hơn việc xem lịch sử duyệt web?",
        options: [
          "Theo dõi kết quả công việc và chỉ tiêu đã thống nhất",
          "Xem tin nhắn cá nhân trong chat để đoán mức độ làm việc",
          "Chụp màn hình máy của từng người vài lần mỗi ngày",
          "Theo dõi vị trí điện thoại cá nhân của nhân viên",
        ],
        correct: 0,
        explanation:
          "Khi mục đích là tiến độ, kết quả công việc trả lời thẳng câu hỏi mà không chạm vào đời sống riêng. Tin nhắn cá nhân, chụp màn hình thường xuyên và vị trí điện thoại riêng đều thu nhiều hơn mức cần và có thể chạm tới việc ngoài công việc.",
      },
      {
        question: "Chính sách công ty đã ghi 'thiết bị công ty có thể được giám sát' và nhân viên đã ký nhận. Điều này có nghĩa là gì?",
        options: [
          "Giám sát thiết bị công ty có nền tảng, nhưng vẫn cần mục đích và mức độ hợp lý",
          "Công ty được xem mọi dữ liệu, kể cả tài khoản cá nhân đăng nhập trên máy",
          "Không cần hỏi thêm ai trước khi xem dữ liệu của từng người",
          "Mọi yêu cầu giám sát của sếp đều được coi là hợp lệ vì sếp đại diện cho công ty",
        ],
        correct: 0,
        explanation:
          "Chính sách đã thông báo là một điều kiện tốt, nhưng không xoá yêu cầu về mục đích và mức độ vừa đủ. Tài khoản cá nhân đăng nhập trên máy vẫn là đời sống riêng. Việc nào được xem và ai duyệt vẫn do người có thẩm quyền quyết; không phải mọi yêu cầu của sếp đều tự động hợp lệ.",
      },
      {
        question: "Bạn nên làm gì khi nhận yêu cầu giám sát mà mục đích chưa rõ?",
        options: [
          "Ghi lại yêu cầu, hỏi lại mục đích và chuyển cho nhân sự hoặc pháp chế cho ý kiến",
          "Làm theo trước rồi hỏi sau, vì sếp đang cần gấp và không muốn bị trễ",
          "Bỏ qua tin nhắn và coi như chưa nhận được yêu cầu",
          "Tự ý quyết định chỉ xuất một phần dữ liệu thấy ít nhạy cảm nhất cho an toàn",
        ],
        correct: 0,
        explanation:
          "Ghi lại và chuyển cho người có thẩm quyền giữ bạn ở đúng vai: người chuyển việc, không phải người quyết định. Làm theo trước rồi hỏi sau là hành động không thể rút lại. Bỏ qua tin khiến sếp không được trả lời. Xuất một phần theo ý mình vẫn là quyết định thay người có thẩm quyền.",
      },
    ],
    keyTakeaways: [
      "Giám sát có thể chính đáng khi có mục đích rõ, mức vừa đủ và nhân viên được biết trước.",
      "Ba câu hỏi: mục đích là gì, có cách nhẹ hơn không, nhân viên đã biết chưa.",
      "Thiết bị công ty khác đời sống riêng: tài khoản cá nhân và tin nhắn riêng cần thận trọng hơn.",
      "Bạn chuyển yêu cầu cho nhân sự hoặc pháp chế, không tự quyết thay họ.",
    ],
    practicePrompt: {
      question:
        "Sếp nhắn: 'Xuất cho anh tin nhắn Zalo cá nhân của hai bạn mới vào, anh nghi họ bàn chuyện nghỉ việc'. Phản hồi phù hợp nhất là gì?",
      options: [
        "Em xin ghi lại yêu cầu và chuyển nhân sự, pháp chế cho ý kiến vì đây là tin nhắn cá nhân",
        "Dạ em xuất ngay cho anh",
        "Anh không có quyền xem tin nhắn cá nhân của họ",
        "Em sẽ âm thầm xem trước rồi tóm tắt cho anh",
      ],
      correct: 0,
      explanation:
        "Tin nhắn cá nhân là dữ liệu riêng tư mà mục đích 'nghi họ nghỉ việc' chưa đủ để chạm tới. Đúng vai là ghi lại, chuyển người có thẩm quyền và không tự xem. Xuất ngay hoặc xem âm thầm đều vượt vai. Khẳng định 'anh không có quyền' là kết luận pháp lý bạn không được phép đưa ra.",
    },
    summary: {
      keyIdea: "Bạn không phải người cho phép hay cấm giám sát; bạn hỏi đúng câu để yêu cầu đi tới đúng người.",
      formula: "Mục đích rõ + mức vừa đủ + thông báo trước + người có thẩm quyền duyệt = giám sát có thể chấp nhận được.",
      commonMistake: "Làm theo ngay vì 'sếp yêu cầu', hoặc từ chối thẳng bằng lý do pháp lý mình không xác nhận được.",
      action: "Soạn sẵn ba câu hỏi và hỏi nhân sự xem chính sách giám sát của công ty nói gì.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết vào ghi chú ba câu hỏi bạn sẽ dùng khi được nhờ xem dữ liệu của đồng nghiệp: vấn đề cụ thể là gì, có cách nhẹ hơn không, nhân viên đã biết chưa. Sau đó hỏi nhân sự chính sách giám sát thiết bị công ty đã có chưa và ở đâu để đọc.",
      secondary: "Ngày mai xem lại: bạn đã biết cần chuyển yêu cầu kiểu này cho ai chưa?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, sếp nhắn riêng: 'Em xuất giúp anh lịch sử duyệt web của cả phòng tuần qua, anh nghi có người làm việc riêng'. Bạn có quyền truy cập công cụ quản trị, nên xuất rất dễ. Bài này dạy bạn dừng một nhịp và hỏi ba câu trước khi bấm.",
      },
      {
        type: "feynman",
        title: "Ranh giới giám sát đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới camera ở quầy thu ngân cửa hàng: có bảng báo 'khu vực có camera', chỉ quay quầy, và dùng để xem khi có mất tiền. Camera trong phòng thay đồ thì khác hẳn. Giám sát nhân viên cũng xoay quanh ba điều: vì sao đặt, đặt ở đâu, và người ta có biết không.",
        columns: ["Thành phần", "Camera quầy thu ngân", "Giám sát nhân viên"],
        rows: [
          ["Mục đích", "Phòng mất tiền, tranh chấp", "Bảo vệ thông tin công ty, kiểm tiến độ công việc"],
          ["Phạm vi", "Chỉ quầy, không quay phòng thay đồ", "Thiết bị công ty, không chạm tài khoản và tin nhắn riêng"],
          ["Thông báo", "Bảng 'có camera' ở cửa", "Chính sách nêu rõ, nhân viên biết trước"],
          ["Người xem", "Chủ hoặc người được giao, khi có việc", "Người có thẩm quyền, theo quy trình"],
        ],
        oneLiner: "Có lý do, đúng chỗ, báo trước: đó là ba chân của một việc giám sát chấp nhận được.",
      },
      { type: "heading", text: "Vì sao không đáp 'được' hay 'không' ngay" },
      {
        type: "paragraph",
        text: "Hai phản xạ phổ biến đều sai. Phản xạ một là làm theo vì sếp yêu cầu: bạn thành người trực tiếp chạm vào dữ liệu riêng của đồng nghiệp. Phản xạ hai là từ chối và kết luận 'như vậy là vi phạm' trong khi bạn chưa biết chính sách và lý do. Cách ổn hơn là hỏi, vì câu hỏi làm rõ vấn đề thật của sếp và mở ra cách giải quyết nhẹ hơn.",
      },
      {
        type: "list",
        items: [
          "Mục đích: 'Anh đang gặp vấn đề cụ thể nào - chậm tiến độ, lộ thông tin hay việc khác?'",
          "Mức độ: 'Có cách nhẹ hơn để trả lời vấn đề đó không, ví dụ xem kết quả công việc?'",
          "Thông báo: 'Nhân viên đã được báo trước về việc này trong chính sách chưa?'",
          "Người duyệt: 'Mình nhờ nhân sự và pháp chế cho ý kiến trước nhé?'",
        ],
      },
      {
        type: "flow",
        title: "Đi từ yêu cầu của sếp tới quyết định",
        steps: [
          { label: "Nhận và ghi lại", detail: "Ghi ngày, người yêu cầu, nội dung yêu cầu. Chưa xuất, chưa xem dữ liệu gì." },
          { label: "Hỏi mục đích", detail: "Hỏi vấn đề cụ thể là gì. Nhiều khi chỉ cần trò chuyện là thấy cách khác, không cần theo dõi ai." },
          { label: "Hỏi mức độ", detail: "Có cách ít chạm tới đời sống riêng hơn không? Kết quả công việc, báo cáo tiến độ, hay cài đặt chung thay vì xem từng người." },
          { label: "Kiểm thông báo", detail: "Chính sách công ty có nêu việc giám sát thiết bị chưa? Nhân viên đã biết hay chưa." },
          { label: "Chuyển người duyệt", detail: "Gửi yêu cầu cùng các câu trả lời cho nhân sự và pháp chế; họ quyết định có làm, làm tới đâu." },
        ],
      },
      {
        type: "callout",
        label: "Bạn giữ đúng vai",
        text: "Bạn không cấp phép, cũng không cấm. Bạn làm cho yêu cầu rõ hơn và đưa nó tới đúng người. Nếu được giao làm một việc đã được duyệt, hãy ghi lại ai duyệt và phạm vi được duyệt.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát một đoạn hướng dẫn giám sát do AI soạn",
        task: "Bạn nhờ AI soạn hướng dẫn nội bộ về giám sát máy tính công ty. Đánh dấu những câu không ổn.",
        segments: [
          { text: "Công ty có thể giám sát thiết bị công ty vì mục đích bảo vệ thông tin và kiểm tra việc dùng đúng mục đích." },
          {
            text: "Công ty được xem mọi tin nhắn cá nhân của nhân viên, kể cả tài khoản riêng đăng nhập trên máy công ty.",
            error: "Tài khoản và tin nhắn riêng là đời sống riêng của nhân viên; không có lý do chính đáng gắn với mục đích công việc thì không nên xem. Câu này nói quá.",
          },
          { text: "Chính sách giám sát cần được thông báo cho nhân viên trước khi áp dụng." },
          {
            text: "Có thể giám sát bí mật để nhân viên hành xử tự nhiên nhất.",
            error: "Giám sát bí mật đi ngược nguyên tắc thông báo trước và dễ phá lòng tin khi bị phát hiện.",
          },
          { text: "Mức giám sát nên vừa đủ so với mục đích, ưu tiên cách ít chạm tới đời sống riêng." },
          {
            text: "Quy định cụ thể đã được xác nhận là hợp pháp ở mọi ngành, bạn không cần hỏi pháp chế.",
            error: "Không ai xác nhận điều đó; quy định khác nhau theo ngành và thời điểm, nên cần hỏi pháp chế cho trường hợp cụ thể.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Yêu cầu từ sếp vào chiều thứ Sáu",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: 'Em xuất lịch sử duyệt web cả phòng tuần qua, anh nghi có người làm việc riêng'. Bạn có quyền xuất.",
            choices: [
              { label: "Xuất và gửi sếp ngay vì em có quyền truy cập", next: "bad_export" },
              { label: "Hỏi sếp anh đang gặp vấn đề cụ thể nào và hai bên cùng xem cách nhẹ hơn", next: "s2" },
            ],
          },
          bad_export: {
            text: "Bạn gửi dữ liệu có cả trang cá nhân và tìm kiếm riêng tư của mọi người. Sếp nhắc một bạn trước cả phòng. Khi đồng nghiệp biết bạn là người xuất, niềm tin vào bạn giảm hẳn.",
            ending: "bad",
          },
          s2: {
            text: "Sếp nói: 'Hai dự án chậm mà anh không biết vì sao'. Bạn nhận ra vấn đề là tiến độ, không phải từng người làm gì trên web.",
            choices: [
              { label: "Đề xuất xem tiến độ theo chỉ tiêu công việc và họp ngắn hàng tuần, đồng thời hỏi nhân sự về chính sách giám sát", next: "good" },
              { label: "Tự xem lịch sử trước để 'chắc chắn' rồi báo sếp sau", next: "bad_peek" },
            ],
          },
          bad_peek: {
            text: "Bạn đã tự xem dữ liệu riêng của đồng nghiệp khi chưa ai duyệt. Dù không nói với ai, bạn đã vượt vai và nếu bị phát hiện, bạn là người chịu trách nhiệm.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý: họp ngắn thứ Hai, xem chỉ tiêu tuần. Nhân sự gửi lại chính sách thiết bị công ty để cả phòng đọc. Hai dự án về đúng hướng, và không ai bị xem lịch sử duyệt web.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mục đích, mức độ, thông báo trước, người duyệt.",
          "Bài cuối: ghép mọi thứ thành bộ quy tắc cho nhóm bạn.",
        ],
      },
    ],
  },
  {
    id: 2719,
    slug: "capstone-bo-quy-tac-va-lo-trinh-du-lieu-ca-nhan-cho-nhom-cua-ban",
    title: "Chặng 65, Bài 20: Capstone: bộ quy tắc và danh sách việc về dữ liệu cá nhân cho nhóm bạn",
    subtitle: "Một trang cho cả nhóm: dữ liệu ở đâu, ai xem, giữ bao lâu, xoá thế nào, và câu hỏi gửi pháp chế.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã đi qua mười chín bài nhỏ: nhận ra dữ liệu cá nhân, thu ít, nói rõ mục đích, làm mờ, giữ có hạn, xoá thật. Nếu chúng nằm trong đầu bạn thì cả nhóm vẫn làm theo thói quen cũ. Một trang giấy có tên người chịu trách nhiệm biến chúng thành thói quen chung, và biến những điều bạn chưa chắc thành danh sách câu hỏi gửi pháp chế.",
    openingQuestion:
      "Bạn đã học nhiều bài về dữ liệu cá nhân và muốn nhóm cùng làm theo. Bước nào giúp thay đổi thói quen thật sự?",
    openingOptions: [
      "Viết bộ quy tắc một trang có người chịu trách nhiệm và danh sách câu hỏi cho pháp chế",
      "Gửi email dài kể lại tất cả những gì bạn đã học cho cả nhóm",
      "Yêu cầu mọi người tự đọc lại các bài học vào cuối tuần",
      "Chờ công ty ban hành chính sách rồi mới làm theo",
    ],
    correctOption: 0,
    explanation:
      "Quy tắc một trang, có tên người chịu trách nhiệm và ngày xem lại, là thứ cả nhóm mở ra làm theo được. Email dài thường không ai đọc hết, và tự đọc cuối tuần không có ai kiểm. Chờ chính sách của công ty là bỏ qua những việc nhóm bạn tự làm được từ bây giờ: liệt kê dữ liệu, thu ít hơn, dọn tệp hết hạn. Phần chưa chắc thì chuyển thành câu hỏi gửi pháp chế, không tự đoán.",
    diagram: [
      { label: "Bản đồ dữ liệu: vào từ đâu, ai xem, để ở đâu", arrow: true },
      { label: "Quy tắc chia sẻ và gửi tệp", arrow: true },
      { label: "Lịch giữ và xoá, người chịu trách nhiệm", arrow: true },
      { label: "Danh sách câu hỏi gửi pháp chế" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhóm chăm sóc khách hàng 6 người của một công ty thương mại điện tử nhỏ viết một trang gồm bốn phần: dữ liệu khách nhóm đang dùng và nơi lưu, quy tắc gửi tệp (chỉ qua kênh công ty, chia sẻ theo người), lịch giữ và xoá với người phụ trách, và năm câu hỏi gửi pháp chế. Trưởng nhóm ký xác nhận, pháp chế trả lời ba trong năm câu tuần sau, hai câu còn lại được ghi 'đang chờ'. Sau một quý, nhóm mở lại trang để rà.",
    },
    quiz: [
      {
        question: "Bộ quy tắc một trang cho nhóm nên có những phần nào?",
        options: [
          "Bản đồ dữ liệu, quy tắc chia sẻ, lịch giữ và xoá, câu hỏi cho pháp chế",
          "Danh sách lỗi của từng thành viên trong quý trước",
          "Toàn bộ văn bản luật liên quan chép nguyên văn",
          "Ý kiến cá nhân của trưởng nhóm về rủi ro dữ liệu",
        ],
        correct: 0,
        explanation:
          "Bốn phần này gom lại mọi việc của cả chặng: biết dữ liệu ở đâu, chia sẻ thế nào, giữ và xoá ra sao, và những gì cần người có thẩm quyền trả lời. Danh sách lỗi cá nhân biến trang này thành công cụ trách móc. Chép nguyên văn luật không ai đọc và dễ lỗi thời. Ý kiến cá nhân không cho nhóm một quy tắc để làm theo.",
      },
      {
        question: "Mỗi dòng trong bộ quy tắc nên có gì để không bị bỏ quên?",
        options: [
          "Tên người chịu trách nhiệm và ngày xem lại",
          "Một câu trích từ sách về quyền riêng tư",
          "Tên công cụ AI nhóm đang thích dùng nhất",
          "Số trang của tài liệu hướng dẫn gốc mà nhóm đã đọc",
        ],
        correct: 0,
        explanation:
          "Việc không có tên người và ngày thì ai cũng nghĩ là việc của người khác. Trích sách không biến thành hành động. Tên công cụ ưa thích không liên quan tới trách nhiệm. Số trang tài liệu gốc không giúp ai làm việc gì vào tuần sau.",
      },
      {
        question: "Bạn chưa chắc một loại hồ sơ phải giữ bao lâu. Ô thời hạn trong bảng nên ghi gì?",
        options: [
          "'Hỏi pháp chế' kèm ngày bạn gửi câu hỏi",
          "Con số phổ biến nhất bạn thấy khi tìm trên mạng",
          "'Giữ vô thời hạn' cho chắc, vì giữ thừa ít rủi ro hơn xoá nhầm",
          "Con số AI trả lời khi bạn hỏi thời hạn luật định",
        ],
        correct: 0,
        explanation:
          "Khi không chắc, ghi rõ là đang chờ người có thẩm quyền và khi nào gửi câu hỏi. Con số tìm được trên mạng có thể sai hoặc của nơi khác. Giữ vô thời hạn cũng là một quyết định, và nó làm dữ liệu nằm lâu hơn cần thiết. Con số AI đưa ra nghe hợp lý nhưng không phải nguồn xác nhận.",
      },
      {
        question: "Nhóm bạn có 4 loại dữ liệu khách. Bạn đã ghi người chịu trách nhiệm cho 3 loại và đã hỏi pháp chế 2 loại. Còn mấy loại chưa có người chịu trách nhiệm?",
        options: [
          "1 loại (= 4 − 3)",
          "2 loại (= 4 − 2, lẫn số loại đã hỏi pháp chế với số loại đã có người phụ trách)",
          "5 loại (= 3 + 2, cộng hai số không cùng đo một thứ)",
          "0 loại (= 4 − 4, cho rằng đã xong vì đã hỏi pháp chế)",
        ],
        correct: 0,
        explanation:
          "Người chịu trách nhiệm và việc đã hỏi pháp chế là hai cột khác nhau. Số loại chưa có người chịu trách nhiệm là 4 − 3 = 1. Con số 2 lẫn cột pháp chế, 5 cộng hai số không cùng đơn vị, còn 0 cho rằng hỏi pháp chế thay được việc giao người.",
      },
      {
        question: "Nhóm muốn thu thêm một loại dữ liệu khách mới. Câu hỏi đầu tiên nên hỏi là gì?",
        options: [
          "Dữ liệu này dùng để làm việc gì, và có thể làm mà không cần thu không?",
          "Dữ liệu này có dễ thu không và có tốn thêm bao nhiêu ô trong biểu mẫu?",
          "Đối thủ của chúng ta có đang thu loại dữ liệu này không?",
          "Nếu thu thêm thì dữ liệu này có bán được cho bên khác không?",
        ],
        correct: 0,
        explanation:
          "Nguyên tắc thu ít hỏi mục đích trước. Dễ thu hay tốn ô trong biểu mẫu là chuyện kỹ thuật, không phải lý do. Việc đối thủ thu cũng không cho bạn mục đích. Còn hỏi có bán được không là đã định dùng dữ liệu vào việc khác với lúc thu.",
      },
    ],
    keyTakeaways: [
      "Bộ quy tắc một trang: bản đồ dữ liệu, quy tắc chia sẻ, lịch giữ và xoá, câu hỏi cho pháp chế.",
      "Mỗi dòng có người chịu trách nhiệm và ngày xem lại.",
      "Phần chưa chắc ghi 'hỏi pháp chế' và ngày gửi câu hỏi, không đoán.",
      "Mở lại trang mỗi quý để rà; quy tắc không xem lại sẽ lỗi thời.",
    ],
    practicePrompt: {
      question:
        "Trang quy tắc của nhóm có dòng: 'Bảng khách - giữ 5 năm theo luật'. Bạn không nhớ ai xác nhận con số đó. Nên làm gì với dòng này?",
      options: [
        "Đổi thành 'hỏi pháp chế' và gửi câu hỏi kèm ngày cho người có thẩm quyền",
        "Giữ nguyên vì con số 5 năm nghe rất quen và hợp lý",
        "Xoá dòng này vì không chắc thì không cần ghi",
        "Nhờ AI kiểm tra giúp con số 5 năm có đúng không",
      ],
      correct: 0,
      explanation:
        "Một con số không rõ nguồn là rủi ro hơn một ô trống: người đọc tin nó. Đổi thành 'hỏi pháp chế' cho người xác nhận điền. Con số quen chưa chắc đúng. Xoá dòng khiến loại dữ liệu đó không có quy tắc. AI kiểm tra con số pháp lý cũng chỉ trả lời điều nghe hợp lý.",
    },
    summary: {
      keyIdea: "Biến điều đã học thành một trang có tên người và ngày xem lại, và biến điều chưa chắc thành câu hỏi gửi pháp chế.",
      formula: "Bản đồ dữ liệu + quy tắc chia sẻ + lịch giữ và xoá + câu hỏi pháp chế + người chịu trách nhiệm = bộ quy tắc của nhóm.",
      commonMistake: "Viết quy tắc dài, không ai chịu trách nhiệm, và điền số mà không ai xác nhận.",
      action: "Viết bản nháp một trang, gửi trưởng nhóm và pháp chế xem trong tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một trang trống và viết bốn mục cho nhóm bạn, mỗi mục tối đa năm dòng: (1) dữ liệu cá nhân nhóm dùng và nơi lưu, (2) quy tắc gửi tệp, (3) lịch giữ và xoá kèm người phụ trách, (4) ba câu hỏi gửi pháp chế. Gửi bản nháp cho trưởng nhóm kèm đề nghị họp 15 phút để rà.",
      secondary: "Ngày mai kiểm lại: mục nào vẫn chưa có tên người chịu trách nhiệm?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn sắp họp nhóm và muốn nói điều gì đó về dữ liệu cá nhân. Nếu chỉ nói 'mọi người nhớ cẩn thận', một tuần sau không ai nhớ. Nếu đưa ra một trang có tên từng người, ngày rà lại và danh sách câu hỏi cho pháp chế, cuộc họp có kết quả thật. Bài này giúp bạn viết trang đó.",
      },
      {
        type: "feynman",
        title: "Bộ quy tắc đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tờ nội quy dán cạnh bếp chung: vài dòng, có người phụ trách dọn, và có ngày kiểm tủ lạnh. Không ai đọc cả quyển luật, nhưng ai cũng làm theo tờ nội quy vì nó ngắn và có tên. Bộ quy tắc dữ liệu cá nhân của nhóm cũng vậy.",
        columns: ["Thành phần", "Nội quy bếp chung", "Quy tắc dữ liệu của nhóm"],
        rows: [
          ["Nội dung", "Vài dòng ngắn dán cạnh bếp", "Một trang: dữ liệu ở đâu, chia sẻ thế nào, giữ bao lâu"],
          ["Người chịu trách nhiệm", "Ai dọn tuần này", "Tên người cho từng dòng"],
          ["Ngày rà lại", "Thứ Sáu kiểm tủ lạnh", "Mỗi quý mở trang ra xem lại"],
          ["Điều chưa rõ", "Hỏi quản lý toà nhà", "Hỏi pháp chế, ghi vào danh sách câu hỏi"],
        ],
        oneLiner: "Một trang ngắn, có tên người, có ngày rà lại, và nói rõ điều gì cần hỏi ai.",
      },
      { type: "heading", text: "Bốn phần của một trang" },
      {
        type: "list",
        items: [
          "Bản đồ dữ liệu: nhóm dùng dữ liệu cá nhân nào (bài 5), vào từ đâu, ai xem, để ở đâu, đi đâu tiếp.",
          "Quy tắc chia sẻ: gửi tệp qua kênh công ty, chia sẻ theo người thay vì theo đường dẫn chung, làm mờ trước khi đưa vào AI, không dùng kênh cá nhân (bài 10, 12).",
          "Lịch giữ và xoá: từng loại tệp có mục đích, người chịu trách nhiệm, mốc xem lại, và xoá thật sự (bài 15, 16).",
          "Câu hỏi cho pháp chế: những gì bạn chưa chắc, ví dụ thời hạn giữ, cách trả lời yêu cầu của khách, giám sát (bài 18, 19).",
        ],
      },
      {
        type: "paragraph",
        text: "Điều khó nhất là giữ trang ngắn. Mỗi phần tối đa năm dòng; dòng nào không có người chịu trách nhiệm thì chưa phải quy tắc, chỉ là mong muốn. Và dòng nào có con số bạn không xác nhận được thì đổi thành câu hỏi. Quy tắc ngắn và đúng tốt hơn quy tắc dài mà chứa điều đoán.",
      },
      {
        type: "flow",
        title: "Từ cuộc họp tới một quý sau",
        steps: [
          { label: "Viết bản nháp một trang", detail: "Điền bốn phần, mỗi phần tối đa năm dòng. Dùng AI để gợi ý khung thì chỉ đưa tên loại dữ liệu, không đưa dữ liệu thật." },
          { label: "Họp nhóm 15 phút", detail: "Đọc lần lượt từng dòng, giao tên người chịu trách nhiệm, bỏ dòng không ai nhận." },
          { label: "Gửi câu hỏi cho pháp chế", detail: "Gom các điều chưa chắc thành ba đến năm câu ngắn, kèm ngày gửi." },
          { label: "Làm theo và ghi lại", detail: "Mỗi người làm phần của mình; việc xong ghi ngày vào trang, việc chờ ghi 'đang chờ'." },
          { label: "Rà lại sau một quý", detail: "Mở trang, cập nhật theo câu trả lời của pháp chế, bỏ dòng hết hạn, thêm dòng mới nếu nhóm có quy trình mới." },
        ],
      },
      {
        type: "callout",
        label: "Bộ quy tắc không thay thế người có thẩm quyền",
        text: "Trang này là thỏa thuận làm việc của nhóm, không phải ý kiến pháp lý. Mọi điều liên quan tới thời hạn giữ, thủ tục với khách và giám sát phải được pháp chế hoặc chuyên gia xác nhận; nhóm chỉ ghi lại câu trả lời của họ.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn khung trang quy tắc",
        task: "Bạn cần một khung trang quy tắc dữ liệu cá nhân cho nhóm chăm sóc khách hàng 6 người. Lắp yêu cầu để AI soạn khung, không đưa dữ liệu thật.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết quy tắc dữ liệu cá nhân cho nhóm.", feedback: "Quá mơ hồ: AI sẽ viết một bản dài kiểu chính sách chung, không gắn với việc hằng ngày của nhóm." },
              { text: "Nhóm chăm sóc khách hàng 6 người, dùng bảng khách, hộp thư chung và một công cụ chat. Không đưa dữ liệu thật, chỉ tên loại.", good: true, feedback: "AI biết nhóm dùng gì nên khung bám việc thật, và bạn không gửi dữ liệu khách ra ngoài." },
              { text: "Đây là bảng 500 khách của nhóm, mời AI xem để viết quy tắc cho sát: Nguyễn Văn A, 09xx...", feedback: "Bạn đưa dữ liệu thật ra ngoài chỉ để soạn khung, việc không cần tới nó." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Soạn khung một trang bốn mục, mỗi mục tối đa 5 dòng, mỗi dòng có cột người chịu trách nhiệm và ngày rà lại.", good: true, feedback: "Giới hạn dòng và cột trách nhiệm ép khung ngắn và dùng được." },
              { text: "Soạn một chính sách quyền riêng tư hoàn chỉnh, càng chi tiết càng tốt.", feedback: "Bạn sẽ nhận bản dài, nhiều điều khoản do AI tự viết mà không ai xác nhận." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Ở mọi ô thời hạn hay thủ tục pháp lý, ghi 'hỏi pháp chế', không điền số hay điều luật.", good: true, feedback: "Bạn chặn AI bịa thời hạn và điều luật." },
              { text: "Điền thời hạn và điều luật cụ thể để trang nhìn chuyên nghiệp.", feedback: "Số và điều luật AI đưa ra nghe hợp lý, nhưng có thể sai hoặc cũ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "rule"],
            text: "1. Bản đồ dữ liệu | Người chịu trách nhiệm: (tên) | Rà lại: (ngày)\n- Dữ liệu khách nhóm dùng: bảng khách, hộp thư chung, chat\n- Nơi lưu và người xem: (điền)\n2. Quy tắc chia sẻ | (tên) | (ngày)\n- Gửi tệp qua kênh công ty, chia sẻ theo người\n3. Giữ và xoá | (tên) | (ngày)\n- Thời hạn: hỏi pháp chế\n4. Câu hỏi cho pháp chế | (tên) | (ngày)\n- Thời hạn giữ bảng khách? Thủ tục khi khách xin xoá?\n\n(Khung gọn, có chỗ điền tên và ngày, không có số bịa.)",
          },
          {
            requires: ["context"],
            text: "CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN\nĐiều 1. Nhóm cam kết giữ dữ liệu khách 5 năm theo quy định.\nĐiều 2. Mọi yêu cầu của khách được xử lý trong 72 giờ...\n\n(Có khung nhưng AI tự viết điều khoản, thời hạn '5 năm', '72 giờ' không ai xác nhận, và không có người chịu trách nhiệm.)",
          },
          {
            text: "Dạ, để viết quy tắc, xin bạn gửi bảng khách. Dựa trên Nguyễn Văn A, nhóm cần bảo vệ dữ liệu của những khách hàng VIP 100%...\n\n(Yêu cầu mơ hồ hoặc lộ dữ liệu: AI xin thêm dữ liệu thật và nói những điều không có trong bất kỳ tài liệu nào của bạn.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Cuộc họp nhóm sáng thứ Hai",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn mang bản nháp một trang tới cuộc họp. Trưởng nhóm đọc lướt và nói: 'Hay đấy, nhưng dòng nào cũng viết thế này thì ai làm?'",
            choices: [
              { label: "Đề nghị giao tên một người và một ngày rà lại cho từng dòng, bỏ dòng không ai nhận", next: "s2" },
              { label: "Nói: 'Chắc mọi người tự giác làm thôi anh'", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Ba tuần sau, không ai nhớ bản nháp. Khi có khách hỏi dữ liệu của họ, cả nhóm lại làm theo thói quen cũ và không biết ai phụ trách.",
            ending: "bad",
          },
          s2: {
            text: "Mỗi dòng có tên. Khi đọc tới ô 'giữ bảng khách bao lâu', chị Linh nói: 'Mình thống nhất 3 năm cho chắc, không cần hỏi ai'.",
            choices: [
              { label: "Ghi 'hỏi pháp chế' vào ô đó kèm ngày gửi câu hỏi, và đề nghị chị Linh gửi câu hỏi trong tuần", next: "good" },
              { label: "Ghi luôn 3 năm vì cả nhóm đã đồng ý", next: "bad_number" },
            ],
          },
          bad_number: {
            text: "Con số 3 năm nằm trong trang như một quy tắc. Sáu tháng sau kế toán báo có loại hồ sơ phải giữ lâu hơn, và nhóm đã xoá nhiều tệp theo con số tự chọn.",
            ending: "bad",
          },
          good: {
            text: "Cuối cuộc họp, trang có tên người cho từng dòng và ba câu hỏi gửi pháp chế. Chị Linh gửi trong chiều, pháp chế trả lời trong tuần, và nhóm cập nhật ô thời hạn bằng câu trả lời có văn bản.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một trang, có tên người, có ngày rà lại, và danh sách câu hỏi gửi pháp chế.",
          "Hết Chặng 65: dữ liệu của người khác là dữ liệu của người thật.",
        ],
      },
    ],
  },
];
