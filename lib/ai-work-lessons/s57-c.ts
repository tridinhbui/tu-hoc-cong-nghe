import type { Lesson } from "../lesson-types";

// Chặng 57, bài 11-15. Giáo trình: scripts/curriculum/stage-57.json.
// Nội dung dựa trên khái niệm bền của web (dữ liệu trong trình duyệt, máy chủ, tệp xuất);
// không nêu đường dẫn nút bấm hay tính năng riêng của công cụ nào.

type Quiz = Lesson["quiz"][number];
// Phương án đúng luôn viết đầu tiên; vị trí được xáo lại lúc build.
const Q = (question: string, right: string, wrong: [string, string, string], explanation: string): Quiz => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S57_C_LESSONS: Lesson[] = [
  {
    id: 2550,
    slug: "du-lieu-luu-o-may-ban-hay-tren-may-chu",
    title: "Chặng 57, Bài 11: Dữ liệu công cụ nằm ở đâu: máy bạn, trình duyệt hay máy chủ",
    subtitle: "Cuốn sổ bỏ túi của riêng bạn khác hẳn tủ hồ sơ chung của cả phòng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗄️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ nhỏ bạn nhờ AI dựng chạy rất đẹp trên máy bạn, rồi đồng nghiệp mở lên thì bảng trống trơn. Không phải công cụ hỏng: dữ liệu đang nằm ở một chỗ mà người khác không với tới. Biết hỏi đúng câu này từ đầu giúp bạn tránh mất dữ liệu thật và tránh hứa với nhóm điều công cụ không làm được.",
    openingQuestion:
      "Bạn gửi đường dẫn công cụ theo dõi công nợ cho đồng nghiệp. Họ mở lên thấy bảng trống, trong khi máy bạn có 40 dòng. Nguyên nhân khả dĩ nhất là gì?",
    openingOptions: [
      "Dữ liệu được lưu riêng trong trình duyệt trên máy bạn",
      "Đường dẫn bị sai một ký tự nên mở ra một công cụ khác hẳn",
      "Đồng nghiệp chưa có quyền xem nên công cụ ẩn hết dữ liệu đi",
      "Công cụ quá tải vì 40 dòng là nhiều với một trang web nhỏ",
    ],
    correctOption: 0,
    explanation:
      "Nhiều công cụ nhỏ do AI dựng lưu dữ liệu ngay trong trình duyệt của người đang dùng, không gửi đi đâu cả. Mỗi máy, mỗi trình duyệt có một kho riêng, nên đồng nghiệp mở cùng đường dẫn vẫn thấy kho trống của họ. Đường dẫn sai sẽ báo lỗi chứ không hiện công cụ giống hệt; quyền xem cần một hệ thống đăng nhập mà loại công cụ này thường không có; còn 40 dòng là quá nhỏ để gây quá tải.",
    diagram: [
      { label: "Bạn nhập dữ liệu vào công cụ", arrow: true },
      { label: "Công cụ chọn nơi lưu: trình duyệt hay máy chủ", arrow: true },
      { label: "Trình duyệt: chỉ máy này thấy. Máy chủ: ai có quyền đều thấy", arrow: true },
      { label: "Bạn biết nơi lưu thì mới hứa được với nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kế toán nhờ AI dựng bảng theo dõi công nợ, nhập 40 khách rồi gửi đường dẫn cho trưởng phòng. Trưởng phòng mở lên thấy bảng trống. Khi hỏi AI dữ liệu đang lưu ở đâu, chị mới biết mọi dòng chỉ nằm trong trình duyệt máy chị. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Đồng nghiệp mở công cụ của bạn mà bảng trống. Công cụ lưu trong trình duyệt. Vì sao?",
        "Dữ liệu nằm trong trình duyệt trên máy bạn, máy khác không có",
        [
          "Tệp bị hỏng lúc gửi đường dẫn nên toàn bộ dữ liệu bên trong đã mất",
          "Đồng nghiệp dùng máy cấu hình yếu hơn nên công cụ tải không hết dữ liệu",
          "Công cụ tự xoá toàn bộ dữ liệu sau mỗi lần bạn đóng tab lại",
        ],
        "Kho trong trình duyệt thuộc về từng máy và từng trình duyệt, nên người khác không thấy. Không có tệp nào bị hỏng khi gửi đường dẫn, cấu hình máy không quyết định dữ liệu có hiện hay không, và việc xoá sau khi đóng tab chỉ xảy ra với một số chế độ như cửa sổ ẩn danh.",
      ),
      Q(
        "Muốn cả nhóm cùng thấy một bảng dữ liệu, dữ liệu nên nằm ở đâu?",
        "Một nơi lưu chung trên máy chủ",
        [
          "Trình duyệt của từng người, nếu mở cùng một đường dẫn",
          "Tệp gửi qua email, vì ai cũng nhận đúng một bản giống nhau",
          "Bộ nhớ tạm của trang web, vì nó tự đồng bộ giữa các máy",
        ],
        "Chỉ một nơi lưu chung, có đăng nhập và có quyền, mới cho mọi người nhìn cùng một dữ liệu. Cùng đường dẫn không làm hai trình duyệt chia sẻ kho; tệp email tạo ra nhiều bản chép dần lệch nhau; bộ nhớ tạm không tự đồng bộ giữa các máy.",
      ),
      Q(
        "Bạn nhập dữ liệu trong cửa sổ ẩn danh rồi đóng cửa sổ. Công cụ lưu trong trình duyệt sẽ ra sao?",
        "Thường mất dữ liệu, vì cửa sổ ẩn danh xoá kho khi đóng",
        [
          "Còn nguyên và tự đồng bộ sang cửa sổ thường trên cùng một máy tính",
          "Còn nguyên, vì bạn đã bấm Lưu trước khi đóng",
          "Chỉ mất phần nhập sau 5 phút cuối, phần cũ vẫn giữ",
        ],
        "Cửa sổ ẩn danh được thiết kế để không giữ lại dấu vết sau khi đóng, kể cả kho của công cụ. Nút Lưu trong công cụ không đổi điều đó, và không có cơ chế giữ phần cũ theo từng mốc thời gian.",
      ),
      Q(
        "Bạn xoá dữ liệu duyệt web cho máy nhẹ. Công cụ nhỏ lưu trong trình duyệt bị ảnh hưởng thế nào?",
        "Có thể mất dữ liệu, nên cần xuất tệp dự phòng trước",
        [
          "Không đổi gì, vì dữ liệu công cụ tách khỏi dữ liệu duyệt web",
          "Chạy nhanh hơn và giữ nguyên mọi bản ghi",
          "Tự khôi phục từ máy chủ của nhà cung cấp AI",
        ],
        "Kho của công cụ thường được tính vào dữ liệu trang web nên có thể bị xoá cùng. Không có máy chủ nào của nhà cung cấp AI giữ bản sao dữ liệu của bạn, nên cách an toàn là xuất tệp dự phòng trước khi dọn máy.",
      ),
      Q(
        "Cách nào ổn nhất để biết một công cụ nhỏ lưu dữ liệu ở đâu, khi bạn không biết code?",
        "Hỏi AI chỉ ra đoạn lưu dữ liệu, rồi kiểm bằng cách mở trên máy khác",
        [
          "Đoán theo giao diện: có nút Lưu nghĩa là dữ liệu đã nằm trên máy chủ rồi",
          "Tin câu trả lời đầu tiên của AI mà không cần thử lại",
          "Hỏi đồng nghiệp xem họ nghĩ nó lưu ở đâu",
        ],
        "Câu trả lời của AI cần được kiểm bằng một phép thử thật: mở trên máy khác xem dữ liệu có hiện không. Nút Lưu chỉ là giao diện, không nói dữ liệu đi đâu; tin ngay câu trả lời đầu tiên hay hỏi ý kiến đoán của người khác đều không phải kiểm chứng.",
      ),
    ],
    keyTakeaways: [
      "Dữ liệu trong trình duyệt chỉ thuộc về máy và trình duyệt đó.",
      "Dùng chung cần một nơi lưu chung trên máy chủ, có đăng nhập.",
      "Cửa sổ ẩn danh và xoá dữ liệu duyệt web có thể làm mất dữ liệu công cụ.",
      "Hỏi AI dữ liệu lưu ở đâu, rồi kiểm bằng cách mở trên máy khác.",
    ],
    practicePrompt: {
      question:
        "Bảng theo dõi việc của nhóm 5 người lưu trong trình duyệt. Mỗi người mở thấy một danh sách khác nhau. Bước đầu tiên hợp lý là gì?",
      options: [
        "Xác nhận dữ liệu đang nằm riêng ở từng máy, rồi chọn nơi lưu chung",
        "Bảo mỗi người nhập lại toàn bộ danh sách cho giống nhau",
        "Gửi từng người một tệp mới mỗi sáng thay cho công cụ",
        "Nhờ AI làm cho giao diện đẹp hơn để đỡ nhầm",
      ],
      correct: 0,
      explanation:
        "Gốc rễ là dữ liệu nằm riêng ở từng máy, nên phải xác nhận điều đó trước rồi mới chọn nơi lưu chung. Nhập lại chỉ tạo thêm năm bản tiếp tục lệch nhau, gửi tệp mỗi sáng là quay về cách làm cũ, còn làm đẹp giao diện không đụng tới nơi lưu.",
    },
    summary: {
      keyIdea: "Dữ liệu ở đâu quyết định ai thấy nó và nó mất khi nào.",
      formula: "Lưu trong trình duyệt = sổ riêng của một máy. Lưu trên máy chủ = tủ chung có chìa khoá.",
      commonMistake: "Gửi đường dẫn cho cả nhóm và tin rằng ai cũng thấy cùng một dữ liệu.",
      action: "Hỏi AI: dữ liệu công cụ này lưu ở đâu, rồi mở thử trên một máy khác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một công cụ hoặc bảng bạn đang dùng (hoặc một bản thử do AI dựng). Mở nó trên một máy hoặc một trình duyệt khác và ghi lại: dữ liệu có hiện không? Sau đó hỏi AI một câu: dữ liệu công cụ này đang lưu ở đâu, chỉ ra đoạn làm việc đó. Ghi kết luận vào một dòng trong sổ tay của bạn.",
      secondary: "Ngày mai hệ thống sẽ hỏi bạn đã thử mở trên máy khác chưa và dữ liệu nằm ở đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn gửi đường dẫn công cụ theo dõi công nợ cho trưởng phòng. Năm phút sau anh nhắn: bảng của em trống trơn. Bài này giúp bạn tự tìm ra dữ liệu đang nằm ở đâu, thay vì đoán.",
      },
      {
        type: "feynman",
        title: "Nơi lưu dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung ba nơi cất giấy tờ: cuốn sổ bỏ túi của riêng bạn, tủ hồ sơ chung của cả phòng, và tệp bạn chép ra để mang đi. Công cụ nhỏ cũng chỉ chọn một trong ba.",
        columns: ["Nơi cất", "Đời thường", "Công cụ nhỏ"],
        rows: [
          ["Trong trình duyệt", "Sổ bỏ túi: chỉ bạn cầm, mất sổ là mất hết", "Kho riêng của một máy, một trình duyệt"],
          ["Trên máy chủ", "Tủ hồ sơ chung: ai có chìa khoá đều mở được", "Kho chung, có đăng nhập và phân quyền"],
          ["Tệp xuất ra", "Bản photo mang theo, cũ dần so với bản gốc", "Một bản chép tại thời điểm bạn xuất"],
        ],
        oneLiner: "Trước khi tin một công cụ, hỏi: dữ liệu của tôi đang nằm ở đâu, và ai với tới được?",
      },
      { type: "heading", text: "Vấn đề: bảng trống ở máy người khác" },
      {
        type: "paragraph",
        text: "Khi AI dựng cho bạn một công cụ nhỏ, nó thường chọn cách đơn giản nhất: lưu ngay trong trình duyệt của người đang dùng. Cách này chạy ngay, không cần đăng nhập, không cần máy chủ. Nhưng chính vì thế, đồng nghiệp mở cùng đường dẫn sẽ thấy kho của họ, và kho đó trống.",
      },
      {
        type: "flow",
        title: "Bạn bấm Lưu: dữ liệu đi đâu",
        steps: [
          { label: "Bạn nhập dòng mới", detail: "Bạn gõ một khách hàng vào bảng và bấm Lưu. Nhìn từ ngoài, mọi thứ trông như nhau dù dữ liệu đi theo đường nào." },
          { label: "Công cụ chọn nơi cất", detail: "Đoạn mã bên trong quyết định: giữ ngay tại trình duyệt này, hay gửi qua mạng tới một máy chủ. Đây là điều bạn cần biết mà màn hình không nói." },
          { label: "Đường 1: kho trình duyệt", detail: "Dữ liệu nằm lại trong máy bạn. Nhanh, không cần đăng nhập, nhưng chỉ trình duyệt này đọc được và có thể mất khi dọn dữ liệu duyệt web." },
          { label: "Đường 2: máy chủ chung", detail: "Dữ liệu đi qua mạng tới một nơi lưu chung. Nhiều người cùng thấy, nhưng cần đăng nhập và ai đó phải lo giữ máy chủ hoạt động." },
          { label: "Mở lại hoặc mở máy khác", detail: "Đường 1: chỉ thấy lại trên đúng máy cũ. Đường 2: thấy ở mọi máy sau khi đăng nhập. Phép thử đơn giản nhất là mở trên một máy khác." },
        ],
      },
      { type: "heading", text: "Hai cách lưu, hai kết quả" },
      {
        type: "comparison",
        left: {
          label: "Lưu trong trình duyệt",
          text: "Hợp với công cụ dùng một mình: ghi chú cá nhân, máy tính nhanh. Không cần tài khoản. Nhưng không chia sẻ được, và dọn dữ liệu duyệt web hay dùng cửa sổ ẩn danh có thể làm mất sạch.",
        },
        right: {
          label: "Lưu trên máy chủ",
          text: "Hợp với công cụ cả nhóm cùng dùng: bảng theo dõi đơn, danh sách việc. Mọi người thấy cùng dữ liệu. Đổi lại, phải có đăng nhập, phải lo phân quyền và ai đó chịu trách nhiệm giữ máy chủ.",
        },
      },
      {
        type: "callout",
        label: "Câu hỏi đáng hỏi AI",
        text: "Sau khi AI dựng xong, hỏi ngay: dữ liệu công cụ này lưu ở đâu? Nếu nó trả lời kiểu trong trình duyệt, hãy nhớ rằng dùng chung cả nhóm là chưa được. Đừng hứa với đồng nghiệp trước khi bạn tự thử mở trên máy khác.",
      },
      {
        type: "scenario",
        title: "Bảng công nợ trống ở máy trưởng phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Trưởng phòng nhắn: mở công cụ em gửi thì bảng trống, em làm gì vậy? Bạn thấy 40 dòng ngay trên máy mình.",
            choices: [
              { label: "Gửi lại đường dẫn và bảo anh thử bấm tải lại vài lần", next: "bad_retry" },
              { label: "Hỏi anh mở trên máy nào, rồi tự mở thử trên một máy khác", next: "s2" },
            ],
          },
          bad_retry: {
            text: "Anh thử ba lần vẫn trống và bắt đầu nghĩ công cụ của bạn không đáng tin. Nguyên nhân không nằm ở việc tải lại: dữ liệu vốn không ở máy anh.",
            ending: "bad",
          },
          s2: {
            text: "Trên máy thứ hai của bạn cũng trống. Bạn nghi dữ liệu nằm riêng ở từng máy. Bạn cần xác nhận điều đó.",
            choices: [
              { label: "Nhờ AI: dữ liệu công cụ này lưu ở đâu, chỉ ra đoạn thực hiện", next: "s3" },
              { label: "Nhập lại 40 dòng trên máy anh cho nhanh", next: "bad_dup" },
            ],
          },
          bad_dup: {
            text: "Giờ có hai bản 40 dòng ở hai máy. Tuần sau bạn sửa một khách ở máy mình, máy anh vẫn giữ số cũ. Hai bản lệch nhau mà không ai biết.",
            ending: "bad",
          },
          s3: {
            text: "AI trả lời: dữ liệu lưu trong trình duyệt, không có máy chủ. Nghĩa là mỗi máy giữ một kho riêng. Bạn còn hai lựa chọn để báo nhóm.",
            choices: [
              { label: "Báo nhóm: bản này dùng riêng từng máy; xuất tệp làm bản tạm và tìm chỗ lưu chung cho bản sau", next: "good_end" },
              { label: "Để nguyên và mong ai cũng tự nhập đủ", next: "bad_hope" },
            ],
          },
          good_end: {
            text: "Nhóm hiểu giới hạn, bạn có bản tạm bằng tệp để chia sẻ và một kế hoạch rõ: khi cần dùng chung thì chuyển sang nơi lưu chung có quyền.",
            ending: "good",
          },
          bad_hope: {
            text: "Hai tuần sau, mỗi người một danh sách, số liệu công nợ không ai đối chiếu nổi. Bạn mất thời gian hơn lúc ban đầu.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Mở công cụ trên một máy khác và xem dữ liệu có hiện không.",
          "Hỏi AI: dữ liệu lưu ở đâu, chỉ ra đoạn mã đó.",
          "Nếu lưu trong trình duyệt: dùng một mình, và xuất tệp dự phòng thường xuyên.",
          "Nếu cần dùng chung: chuyển sang nơi lưu chung, có đăng nhập và phân quyền.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dữ liệu nằm ở đâu quyết định ai thấy nó và khi nào nó mất.",
          "Phép thử rẻ nhất là mở công cụ trên một máy khác.",
          "Đừng hứa dùng chung khi dữ liệu còn nằm trong trình duyệt của riêng bạn.",
        ],
      },
    ],
  },
  {
    id: 2551,
    slug: "nhap-du-lieu-that-vao-cong-cu-thi-can-nghi-gi",
    title: "Chặng 57, Bài 12: Đừng dán dữ liệu khách thật vào bản thử của công cụ",
    subtitle: "Thử món mới trên nguyên liệu mẫu, không thử trên bữa tiệc thật.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản thử của công cụ hay có lỗi, và bạn sẽ nhập thử rất nhiều lần. Nếu mỗi lần bạn dán dòng khách thật vào, họ tên, số điện thoại và địa chỉ của hàng trăm người có thể nằm trong những chỗ bạn không kiểm soát. Dữ liệu giả có cùng hình dạng thử được y hệt mà không gây rủi ro.",
    openingQuestion:
      "Bạn có bảng 300 khách hàng thật và đang thử bản đầu của công cụ tra cứu. Cách nào hợp lý nhất để thử?",
    openingOptions: [
      "Tạo khoảng 20 dòng khách giả có cùng các cột rồi thử trên đó",
      "Dán cả 300 dòng thật vào để thử cho sát thực tế nhất",
      "Dán 10 dòng thật nhưng xoá tên, giữ nguyên số điện thoại khách",
      "Chỉ dán đúng các dòng khách quen vì họ dễ thông cảm hơn",
    ],
    correctOption: 0,
    explanation:
      "Dữ liệu giả có cùng cột và cùng dạng (số điện thoại đủ số, tên có dấu, ô bỏ trống) thử được mọi trường hợp mà không đưa thông tin ai ra ngoài. Dán cả bảng thật là rủi ro lớn nhất. Xoá tên nhưng giữ số điện thoại vẫn để lộ người đó, vì số điện thoại tự nó là định danh. Khách quen không đồng ý cho bạn thử công cụ bằng thông tin của họ.",
    diagram: [
      { label: "Bảng khách thật: mỗi cột có một mức nhạy cảm", arrow: true },
      { label: "Phân loại cột: định danh, liên lạc, nội bộ, công khai", arrow: true },
      { label: "Tạo dữ liệu giả có cùng hình dạng cột", arrow: true },
      { label: "Thử công cụ trên dữ liệu giả, dữ liệu thật để sau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên chăm sóc khách hàng dán danh sách 200 khách (tên, số điện thoại, địa chỉ) vào một công cụ AI miễn phí để dựng bảng tra cứu. Sau đó cô mới nhận ra công ty chưa duyệt công cụ đó cho dữ liệu khách. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Cột nào trong bảng khách hàng nhạy cảm nhất khi dán vào bản thử?",
        "Họ tên kèm số điện thoại và địa chỉ nhà",
        [
          "Mã đơn hàng chỉ gồm chữ và số do hệ thống tự sinh",
          "Tên sản phẩm khách đã mua",
          "Ngày đặt hàng, vì ai cũng đặt vào ngày nào đó",
        ],
        "Tên kèm số điện thoại và địa chỉ nhận diện trực tiếp một người, nên là nhóm nhạy cảm nhất. Mã đơn nội bộ, tên sản phẩm và ngày đặt không tự nó chỉ ra ai, dù vẫn là thông tin nội bộ.",
      ),
      Q(
        "Bạn xoá cột họ tên nhưng giữ cột số điện thoại. Dữ liệu đã ẩn danh chưa?",
        "Chưa, vì số điện thoại vẫn chỉ ra đúng một người",
        [
          "Rồi, vì không còn cột nào ghi rõ họ tên",
          "Rồi, nếu bạn chỉ thử trong vài phút rồi xoá",
          "Rồi, vì số điện thoại chỉ là dãy số, không phải thông tin cá nhân",
        ],
        "Một dãy số điện thoại có thể gọi thẳng tới một người, nên vẫn là dữ liệu định danh dù đã bỏ họ tên. Thử ngắn hạn không làm dữ liệu hết nhạy cảm, và dãy số không phải ngoại lệ chỉ vì nó là số.",
      ),
      Q(
        "Điều nào làm dữ liệu giả thử công cụ được tốt?",
        "Có cùng cột và cả các trường hợp lạ như ô trống, tên dài",
        [
          "Là các dòng mẫu hoàn hảo, không có ô trống hay lỗi nào",
          "Chỉ cần vài dòng giống nhau lặp lại cho nhanh",
          "Là bản sao dữ liệu thật đã đổi màu phông chữ",
        ],
        "Dữ liệu giả tốt phải đủ dạng thật, kể cả ô trống và chuỗi dài, để công cụ lộ lỗi. Dòng hoàn hảo giấu lỗi, dòng lặp lại không thử được gì mới, và đổi màu chữ không làm bản sao thật thành giả.",
      ),
      Q(
        "Bạn dùng AI tạo 20 khách giả. Nên kiểm điều gì trước khi dùng?",
        "Số điện thoại giả không trùng số đang dùng thật của ai",
        [
          "Tên có hay không, vì AI luôn đặt tên rất lạ",
          "Có đúng 20 dòng, vì số lượng mới quan trọng hơn nội dung",
          "Không cần kiểm gì vì dữ liệu do AI tạo luôn ngẫu nhiên",
        ],
        "AI có thể sinh ra một số điện thoại trùng với số của người thật. Việc kiểm cần làm là bảo đảm dữ liệu giả không trỏ tới ai, ví dụ dùng số rõ ràng là giả. Đếm dòng hay bàn chuyện tên lạ không xử lý rủi ro này, và dữ liệu do AI sinh không đảm bảo ngẫu nhiên.",
      ),
      Q(
        "Khi nào mới nên đưa dữ liệu thật vào công cụ?",
        "Khi công cụ đã thử kỹ bằng dữ liệu giả và nơi lưu được công ty cho phép",
        [
          "Ngay khi giao diện trông đủ đẹp để đem khoe với sếp",
          "Khi một đồng nghiệp đã bấm thử và nói là dùng được rồi",
          "Khi AI trả lời rằng công cụ an toàn để dùng",
        ],
        "Hai điều kiện đều cần: công cụ đã chạy đúng với dữ liệu giả và nơi chứa dữ liệu được công ty cho phép. Giao diện đẹp, lời khen của đồng nghiệp hay lời AI khẳng định an toàn đều không chứng minh dữ liệu khách được bảo vệ.",
      ),
    ],
    keyTakeaways: [
      "Mỗi cột trong bảng có một mức nhạy cảm; họ tên, số điện thoại, địa chỉ là nhóm cao nhất.",
      "Xoá tên nhưng giữ số điện thoại vẫn là dữ liệu định danh.",
      "Dữ liệu giả tốt có cùng cột và cả các trường hợp lạ.",
      "Dữ liệu thật chỉ vào khi công cụ đã thử kỹ và nơi lưu được cho phép.",
    ],
    practicePrompt: {
      question:
        "Bảng khách có cột: Mã đơn, Họ tên, Số điện thoại, Sản phẩm, Ghi chú tự do. Cột nào cần thay bằng giá trị giả trước khi thử?",
      options: [
        "Họ tên, Số điện thoại và Ghi chú tự do",
        "Chỉ Họ tên",
        "Chỉ Số điện thoại",
        "Mã đơn và Sản phẩm",
      ],
      correct: 0,
      explanation:
        "Họ tên và số điện thoại định danh trực tiếp, còn ghi chú tự do hay chứa tên người, địa chỉ, chuyện riêng. Chỉ thay một cột vẫn để lộ người qua cột còn lại. Mã đơn và sản phẩm thì ít nhạy cảm hơn nhiều.",
    },
    summary: {
      keyIdea: "Thử công cụ bằng dữ liệu giả có cùng hình dạng, không thử bằng khách thật.",
      formula: "Phân loại cột → thay cột nhạy cảm bằng giá trị giả → thử → chỉ khi đó mới xét dữ liệu thật.",
      commonMistake: "Xoá mỗi cột họ tên rồi tin rằng bảng đã ẩn danh.",
      action: "Mở bảng của bạn, gắn mức nhạy cảm cho từng cột và tạo 15 dòng giả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một bảng thật bạn hay dùng (khách, nhân viên hoặc đơn hàng). Liệt kê tên từng cột và ghi bên cạnh: nhạy cảm cao, vừa hay thấp. Rồi nhờ AI tạo 15 dòng giả có đúng các cột đó, trong đó có ít nhất hai ô bỏ trống và một tên rất dài. Lưu bộ dữ liệu giả thành một tệp riêng để dùng thử.",
      secondary: "Ngày mai hệ thống sẽ hỏi bạn đã phân loại cột và tạo được bộ dữ liệu giả chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa có bản thử đầu của công cụ tra cứu khách hàng và định dán cả bảng 300 dòng vào xem nó chạy ra sao. Khoan đã: bản thử sẽ hỏng nhiều lần, và mỗi lần dán là một lần dữ liệu thật đi qua những nơi bạn chưa kiểm soát.",
      },
      {
        type: "feynman",
        title: "Dữ liệu giả đơn giản hơn bạn nghĩ",
        intro:
          "Đầu bếp thử món mới trên nguyên liệu mẫu ở bếp, không thử ngay trên bữa tiệc khách đã đặt. Bản thử của công cụ cũng vậy: nó cần đủ dạng nguyên liệu, không cần nguyên liệu của khách.",
        columns: ["Thành phần", "Nhà bếp", "Công cụ của bạn"],
        rows: [
          ["Nguyên liệu thật", "Hàng của bữa tiệc đã đặt", "Dữ liệu khách thật"],
          ["Nguyên liệu mẫu", "Thử món bằng nguyên liệu cùng loại", "Dòng khách giả, cùng cột, cùng dạng"],
          ["Lỗi khi thử", "Cháy mẫu thì bỏ mẫu đi", "Lỗi trên dữ liệu giả không hại ai"],
        ],
        oneLiner: "Thử bằng dữ liệu giả giống hệt về hình dạng, để lỗi chỉ làm hỏng bản thử.",
      },
      { type: "heading", text: "Vấn đề: mỗi cột nặng nhẹ khác nhau" },
      {
        type: "paragraph",
        text: "Không phải cột nào cũng như nhau. Họ tên, số điện thoại, địa chỉ chỉ ra đúng một người. Mã đơn hay tên sản phẩm thì không tự chỉ ra ai. Bước đầu tiên không phải là cố giấu hết, mà là xếp từng cột vào một mức để biết cột nào phải thay bằng giá trị giả.",
      },
      {
        type: "flow",
        title: "Từ bảng thật đến bộ dữ liệu giả",
        steps: [
          { label: "Liệt kê cột", detail: "Viết ra tên từng cột của bảng thật, ví dụ Mã đơn, Họ tên, Số điện thoại, Sản phẩm, Ghi chú. Chưa cần dán dữ liệu nào vào đâu cả." },
          { label: "Gắn mức nhạy cảm", detail: "Mỗi cột một mức: cao (chỉ ra một người), vừa (nội bộ), thấp (công khai). Cột ghi chú tự do hay lẫn tên và chuyện riêng, nên xếp cao." },
          { label: "Mô tả hình dạng", detail: "Với mỗi cột, ghi dạng của nó: số điện thoại 10 số, tên có dấu, ngày theo ngày/tháng/năm, có thể bỏ trống. Chỉ mô tả, không dán giá trị thật." },
          { label: "Nhờ AI sinh dòng giả", detail: "Đưa AI bảng mô tả hình dạng và yêu cầu khoảng 15-20 dòng giả, gồm cả ô trống và tên rất dài. Số điện thoại giả nên rõ ràng là giả." },
          { label: "Thử trên dữ liệu giả", detail: "Dùng bộ giả để thử mọi thao tác. Dữ liệu thật chỉ xét sau, khi công cụ đã chạy đúng và nơi lưu được công ty cho phép." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát kế hoạch thử do AI đề xuất",
        task: "Bạn đưa AI danh sách các cột (Mã đơn, Họ tên, Số điện thoại, Ghi chú tự do) và nhờ đề xuất cách thử an toàn. Bản nháp có vài câu không đúng. Bấm vào những câu đáng ngờ rồi nộp.",
        segments: [
          { text: "Trước hết, xếp Họ tên và Số điện thoại vào nhóm nhạy cảm cao vì mỗi cột chỉ ra một người." },
          {
            text: "Cột Số điện thoại có thể giữ nguyên khi thử vì ai cũng có thể biết số người khác.",
            error: "Sai: số điện thoại gọi thẳng tới một người, là dữ liệu định danh. Việc người khác có thể biết số không làm nó hết nhạy cảm.",
          },
          { text: "Cột Ghi chú tự do cần xếp cao vì nhân viên hay gõ lẫn tên và chuyện riêng của khách vào đó." },
          {
            text: "Dán bản thật 300 dòng lên công cụ thử là cách chính xác nhất để phát hiện lỗi.",
            error: "Sai: bộ giả đủ dạng cũng lộ lỗi y hệt, mà không đưa thông tin khách ra ngoài. Dùng bản thật cho bản thử là rủi ro không cần thiết.",
          },
          { text: "Bộ dữ liệu giả nên có vài ô bỏ trống và một tên rất dài để thử các trường hợp lạ." },
          {
            text: "Công ty nào cũng cho phép dán dữ liệu khách vào công cụ AI miễn phí nên không cần hỏi ai.",
            error: "Bịa điều chưa ai xác nhận: quy định này khác nhau theo công ty, phải hỏi bộ phận phụ trách an toàn thông tin hoặc pháp chế.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chỉ đưa dữ liệu thật vào khi nào",
        text: "Khi công cụ đã chạy đúng trên dữ liệu giả, và nơi lưu hoặc công cụ AI đó được công ty cho phép dùng với dữ liệu khách. Nếu chưa chắc, hỏi bộ phận phụ trách an toàn thông tin hoặc pháp chế, đừng tự suy ra.",
      },
      {
        type: "scenario",
        title: "Sếp giục thử ngay bằng bảng khách thật",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: em dán luôn bảng 300 khách vào thử cho nhanh, chiều anh cần xem. Công cụ thử của bạn chạy trên một dịch vụ ngoài công ty chưa ai kiểm tra.",
            choices: [
              { label: "Dán cả 300 dòng để kịp chiều", next: "bad_paste" },
              { label: "Tạo 20 dòng khách giả cùng cột và thử trước, báo sếp lý do", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Công cụ chạy mượt, nhưng 300 khách giờ nằm ở một nơi công ty chưa duyệt. Tuần sau bộ phận an toàn thông tin hỏi, bạn không trả lời được dữ liệu đó đã đi đâu.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ chạy đúng với 20 dòng giả, nhưng bạn thấy bảng thật có ô số điện thoại bỏ trống mà bản giả chưa thử.",
            choices: [
              { label: "Thêm vài dòng giả có ô trống và tên dài, thử lại", next: "good_end" },
              { label: "Đưa thêm 5 dòng thật có ô trống vào thử", next: "bad_mix" },
            ],
          },
          good_end: {
            text: "Bạn bắt được lỗi hiển thị khi ô trống mà không đụng tới ai. Sếp xem bản chạy trên dữ liệu giả và đồng ý chờ quyết định nơi lưu dữ liệu thật.",
            ending: "good",
          },
          bad_mix: {
            text: "Năm dòng nghe ít, nhưng vẫn là năm khách thật ở nơi chưa duyệt. Đã dùng bản giả được thì không có lý do mang dữ liệu thật vào.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Liệt kê cột và gắn mức nhạy cảm cho từng cột.",
          "Mô tả hình dạng mỗi cột, không dán giá trị thật.",
          "Nhờ AI sinh 15-20 dòng giả, có ô trống và tên dài.",
          "Kiểm số điện thoại giả không trùng số thật của ai.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dữ liệu giả đủ dạng cho mọi phép thử.",
          "Xoá tên mà giữ số điện thoại vẫn chưa ẩn danh.",
          "Dữ liệu thật vào sau, khi công cụ đã đúng và nơi lưu đã được cho phép.",
        ],
      },
    ],
  },
  {
    id: 2552,
    slug: "phan-quyen-ai-duoc-xem-ai-duoc-sua",
    title: "Chặng 57, Bài 13: Ai được xem, ai được sửa: phân quyền cho công cụ nhóm",
    subtitle: "Chìa khoá tủ hồ sơ: người chỉ cần xem không cần chìa mở ngăn kéo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ dùng một mình thì không cần quyền. Công cụ cả nhóm cùng dùng thì luôn có người bấm nhầm nút xoá, hoặc thấy cột họ không nên thấy. Ghi ra ba nhóm người dùng và quyền của từng nhóm chỉ mất mười phút, nhưng tránh được những sự cố rất khó sửa sau khi dữ liệu đã mất.",
    openingQuestion:
      "Bạn dựng bảng theo dõi đơn cho nhóm: nhân viên nhập đơn, trưởng nhóm duyệt, kế toán xem số tiền. Điều nào nên quyết định đầu tiên?",
    openingOptions: [
      "Mỗi nhóm được xem và sửa những phần nào",
      "Màu nút duyệt là xanh hay cam",
      "Bảng có bao nhiêu cột trên màn hình chính",
      "Chữ trên tiêu đề dùng phông nào",
    ],
    correctOption: 0,
    explanation:
      "Quyền của từng nhóm quyết định ai làm hỏng được dữ liệu và ai thấy được thông tin nhạy cảm, nên cần chốt trước khi xây. Màu nút, số cột, phông chữ đều sửa được sau trong vài phút mà không gây mất dữ liệu. Sai quyền thì có thể lộ số tiền hoặc mất đơn, và khó sửa ngược.",
    diagram: [
      { label: "Ghi ra các nhóm người dùng", arrow: true },
      { label: "Với mỗi nhóm: xem gì, sửa gì, xoá gì", arrow: true },
      { label: "Nhờ AI đọc lại để tìm lỗ hổng", arrow: true },
      { label: "Kiểm bằng cách thử từng vai trò" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm bán hàng dùng chung bảng theo dõi đơn và ai cũng có quyền như nhau. Một nhân viên mới xoá nhầm cả cột giá chiết khấu lúc dọn bảng. Nhóm mất nửa ngày dựng lại. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Công cụ có ba nhóm người dùng. Bạn nên xác định quyền ở đâu?",
        "Cho từng nhóm: xem được gì, sửa được gì, xoá được gì",
        [
          "Một quyền chung cho cả ba nhóm để khỏi rối",
          "Tuỳ từng người, hôm nào ai xin quyền thì thêm cho người đó ngay",
          "Theo chức danh trên danh thiếp, không cần viết ra",
        ],
        "Quyền theo nhóm và theo hành động (xem, sửa, xoá) giúp bạn nhìn ra lỗ hổng. Một quyền chung hoặc cấp theo từng lời xin làm mất kiểm soát, còn không viết ra thì không ai kiểm được.",
      ),
      Q(
        "Kế toán chỉ cần xem số tiền. Nên cho họ quyền nào?",
        "Chỉ xem, không sửa và không xoá",
        [
          "Xem và sửa, phòng khi họ thấy số sai cần chỉnh tại chỗ",
          "Xem, sửa và xoá, vì kế toán là bộ phận đáng tin nhất",
          "Sửa nhưng không xem, để không ai thấy số tiền",
        ],
        "Nguyên tắc là cho đúng quyền cần thiết và không hơn. Kế toán chỉ cần xem nên không cần sửa hay xoá; số sai nên báo cho người nhập. Quyền sửa mà không xem thì vô nghĩa, và đáng tin không phải lý do để cấp thừa quyền.",
      ),
      Q(
        "Công cụ ẩn nút Xoá với nhân viên. Như vậy đã khoá quyền xoá chưa?",
        "Chưa, vì ẩn nút chỉ là giao diện, dữ liệu vẫn xoá được bằng đường khác",
        [
          "Rồi, vì nhân viên không còn thấy nút để bấm",
          "Rồi, nếu nút ẩn được đặt ở cuối trang",
          "Chưa, nhưng chỉ có người viết code mới xoá nổi",
        ],
        "Ẩn nút chỉ che giao diện, còn dữ liệu được bảo vệ hay không phụ thuộc hệ thống kiểm quyền phía sau. Vị trí nút không đổi điều đó, và không chỉ người viết code mới tìm được đường khác.",
      ),
      Q(
        "Sau khi ghi xong bảng quyền, nhờ AI đọc lại nhằm mục đích gì?",
        "Tìm chỗ thiếu hoặc mâu thuẫn, rồi bạn tự quyết định sửa",
        [
          "Để AI thay bạn quyết định luôn nhóm nào được quyền gì",
          "Để AI bảo đảm công cụ sau đó không thể bị ai lạm dụng nữa",
          "Để AI viết luôn chính sách bảo mật cho toàn bộ công ty bạn",
        ],
        "AI giỏi soát câu chữ và chỉ ra chỗ hở, nhưng quyết định quyền thuộc về người hiểu công việc. Không AI nào đảm bảo tuyệt đối công cụ không bị lạm dụng, và chính sách công ty do bộ phận phụ trách soạn.",
      ),
      Q(
        "Trưởng nhóm cần duyệt đơn nhưng không cần sửa số tiền. Phân quyền hợp lý là gì?",
        "Xem tất cả đơn và đổi trạng thái sang đã duyệt, không sửa số tiền",
        [
          "Xem và sửa mọi cột của mọi đơn, vì trưởng nhóm duyệt cả nhóm",
          "Chỉ xem, còn việc duyệt thì để chính nhân viên tự bấm cho nhanh",
          "Chỉ sửa trạng thái nhưng không được xem số tiền để khỏi lộ",
        ],
        "Quyền cần khớp việc: duyệt nghĩa là đổi được trạng thái, nhưng không cần sửa tiền. Cho sửa mọi cột là cấp thừa, chỉ xem thì không duyệt được, và không xem số tiền thì duyệt mù.",
      ),
    ],
    keyTakeaways: [
      "Cho mỗi nhóm đúng quyền cần thiết và không hơn.",
      "Ghi quyền theo ba hành động: xem, sửa, xoá.",
      "Ẩn nút trên giao diện không phải là khoá quyền.",
      "AI giúp soát lỗ hổng, nhưng người hiểu việc quyết định quyền.",
    ],
    practicePrompt: {
      question:
        "Bảng công nợ có nhóm Nhập liệu, Trưởng phòng và Kế toán. Nhóm nào nên có quyền xoá một dòng?",
      options: [
        "Chỉ Trưởng phòng, hoặc không nhóm nào mà chỉ đánh dấu huỷ",
        "Cả ba nhóm để ai thấy sai cũng sửa được ngay",
        "Chỉ Nhập liệu vì họ là người tạo ra dòng đó",
        "Chỉ Kế toán vì họ là người chịu trách nhiệm về số tiền trong dòng đó",
      ],
      correct: 0,
      explanation:
        "Xoá là hành động khó lấy lại nên chỉ cấp cho người có trách nhiệm cao nhất, hoặc thay bằng đánh dấu huỷ để còn dấu vết. Cho cả ba nhóm thì ai cũng xoá nhầm được; người nhập hay người giữ số tiền đều không tự nhiên có quyền xoá hẳn.",
    },
    summary: {
      keyIdea: "Phân quyền là quyết định trước: ai xem gì, sửa gì, xoá gì.",
      formula: "Nhóm × hành động → bảng quyền → nhờ AI soát lỗ hổng → thử từng vai trò.",
      commonMistake: "Ẩn nút trên giao diện và tin rằng quyền đã được khoá.",
      action: "Ghi bảng quyền ba nhóm cho một công cụ của bạn và nhờ AI đọc lại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ hoặc bảng cả nhóm cùng dùng. Ghi ra ba nhóm người dùng và với mỗi nhóm ba việc: xem được gì, sửa được gì, xoá được gì. Dán bảng đó cho AI và hỏi: chỗ nào thiếu hoặc mâu thuẫn, nhóm nào đang có quyền thừa? Ghi lại ít nhất một chỗ hở AI chỉ ra.",
      secondary: "Ngày mai hệ thống sẽ hỏi bạn đã có bảng quyền ba nhóm chưa và AI chỉ ra chỗ hở nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Hôm qua một bạn mới dọn bảng theo dõi đơn của cả nhóm và xoá nhầm cột giá chiết khấu. Không ai cố ý, chỉ là ai cũng có quyền như nhau. Bài này dạy bạn ghi ra quyền của từng nhóm trước khi sự cố xảy ra.",
      },
      {
        type: "feynman",
        title: "Phân quyền đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tủ hồ sơ của phòng: ai cũng vào phòng được, nhưng chìa ngăn tiền lương chỉ kế toán có. Phân quyền trong công cụ cũng là phát chìa theo nhóm, không phải khoá cả căn phòng.",
        columns: ["Nhóm", "Tủ hồ sơ", "Công cụ của bạn"],
        rows: [
          ["Chỉ cần xem", "Được đọc hồ sơ tại chỗ, không được mang đi", "Quyền xem"],
          ["Cần cập nhật", "Được thêm hoặc sửa trang trong ngăn của mình", "Quyền sửa, giới hạn theo phần việc"],
          ["Quản lý", "Giữ chìa mở mọi ngăn và được huỷ hồ sơ", "Quyền xoá và đổi quyền người khác"],
        ],
        oneLiner: "Phát chìa theo việc của từng nhóm, đừng phát chìa vạn năng.",
      },
      { type: "heading", text: "Ba hành động, ba nhóm" },
      {
        type: "paragraph",
        text: "Cách dễ nhất để ghi quyền là vẽ một bảng nhỏ: hàng là nhóm người dùng, cột là ba hành động xem, sửa, xoá. Mỗi ô chỉ điền có hoặc không. Nhìn vào bảng bạn thấy ngay ô nào thừa, ví dụ người chỉ cần xem mà có quyền xoá.",
      },
      {
        type: "flow",
        title: "Một yêu cầu đi qua lớp kiểm quyền",
        steps: [
          { label: "Người dùng bấm một nút", detail: "Ví dụ nhân viên bấm Xoá đơn. Nút chỉ là giao diện: nó gửi yêu cầu đi, chưa quyết định điều gì." },
          { label: "Hệ thống biết bạn là ai", detail: "Công cụ cần biết người bấm là ai, thường qua đăng nhập. Không có bước này thì không thể phân quyền theo người." },
          { label: "Đối chiếu bảng quyền", detail: "Hệ thống tra: nhóm của người này có quyền xoá không? Đây mới là nơi quyền thật sự được giữ, không phải ở việc nút có hiện hay không." },
          { label: "Cho phép hoặc từ chối", detail: "Nếu có quyền thì thực hiện; nếu không thì từ chối và nên báo rõ lý do. Kết quả nên ghi lại để sau này xem ai đã làm gì." },
        ],
      },
      {
        type: "callout",
        label: "Ẩn nút chưa phải là khoá",
        text: "Một công cụ dựng nhanh thường chỉ ẩn nút Xoá với người không có quyền. Nhưng nếu phía sau không kiểm quyền thật, dữ liệu vẫn xoá được bằng đường khác. Hỏi AI: quyền này được kiểm ở phía sau hay chỉ ẩn trên giao diện?",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soát bảng quyền ba nhóm",
        task: "Bạn đã ghi: Nhập liệu tạo và sửa đơn của mình, Trưởng nhóm duyệt đơn, Kế toán xem số tiền. Ghép một câu lệnh để AI tìm lỗ hổng trong bảng quyền đó.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Kiểm tra giúp tôi bảng quyền.", feedback: "AI không biết công cụ làm gì, có những nhóm nào: nó sẽ trả lời chung chung hoặc tự bịa nhóm." },
              {
                text: "Công cụ theo dõi đơn có ba nhóm: Nhập liệu tạo và sửa đơn của chính mình, Trưởng nhóm duyệt đơn, Kế toán xem số tiền.",
                good: true,
                feedback: "Đủ nhóm và việc của từng nhóm: AI soát được trên đúng dữ kiện của bạn.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Chỉ ra nhóm nào có quyền thừa, nhóm nào thiếu quyền, và trường hợp nào một người làm sai gây hại nhất.",
                good: true,
                feedback: "Yêu cầu nêu rõ cần tìm thừa, thiếu và kịch bản xấu nhất: câu trả lời sẽ đi vào lỗ hổng thật.",
              },
              { text: "Nói xem bảng này có ổn không.", feedback: "Câu hỏi có hay không: AI dễ trả lời ổn cho xong và bỏ qua lỗ hổng." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng kết quả",
            options: [
              { text: "Viết dài nhất có thể cho đầy đủ.", feedback: "Dài không đồng nghĩa với rõ: kết quả lẫn ý chính với chi tiết phụ." },
              {
                text: "Trả về bảng ba cột: nhóm, vấn đề, cách sửa đề xuất; không thêm quyền mới nếu tôi chưa hỏi.",
                good: true,
                feedback: "Khuôn dạng rõ và có giới hạn: dễ đọc và AI không tự thêm quyền bạn chưa duyệt.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Nhóm | Vấn đề | Cách sửa đề xuất |\n| Nhập liệu | Sửa được đơn đã duyệt, nên số tiền có thể đổi sau khi duyệt | Khoá sửa khi đơn đã ở trạng thái đã duyệt |\n| Trưởng nhóm | Duyệt được đơn do chính mình nhập | Yêu cầu người duyệt khác người nhập |\n| Kế toán | Chỉ xem: hợp lý, chưa thấy quyền thừa | Giữ nguyên |",
          },
          {
            requires: ["context"],
            text: "Bảng quyền nhìn chung hợp lý. Bạn có thể xem lại quyền sửa của Nhập liệu sau khi đơn đã duyệt, và nên cân nhắc thêm nhật ký thao tác.",
          },
          {
            text: "Bảng quyền của bạn ổn. Hệ thống phân quyền hiện đại thường có sáu nhóm chuẩn: khách, thành viên, biên tập, quản trị, chủ sở hữu và siêu quản trị. Bạn nên thêm đủ sáu nhóm này.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Nhân viên mới xoá nhầm cột giá",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng nay bạn mới nhận ra cột giá chiết khấu bị xoá. Bảng dùng chung, ai cũng sửa được. Đã 10 giờ và sắp có người cần lấy báo giá.",
            choices: [
              { label: "Hỏi cả nhóm ai xoá rồi nhắc họ lần sau cẩn thận", next: "bad_blame" },
              { label: "Khôi phục từ bản xuất gần nhất, rồi ghi bảng quyền ba nhóm", next: "s2" },
            ],
          },
          bad_blame: {
            text: "Không ai nhận, cột vẫn mất, và lần sau ai cũng có thể làm y như vậy. Lời nhắc không thay được việc phát chìa đúng nhóm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn khôi phục được giá từ bản xuất hôm qua, thiếu một giờ dữ liệu sáng nay. Giờ cần quyết định quyền.",
            choices: [
              { label: "Chỉ Trưởng nhóm được sửa cột giá; nhập liệu chỉ thêm đơn mới", next: "good_end" },
              { label: "Ẩn cột giá khỏi mắt nhân viên là đủ", next: "bad_hide" },
            ],
          },
          good_end: {
            text: "Bảng quyền ghi rõ ai làm gì. Sự cố sau đó, nếu có, chỉ chạm vào phần việc của đúng nhóm.",
            ending: "good",
          },
          bad_hide: {
            text: "Ẩn cột chỉ che giao diện. Một nhân viên tò mò mở bản chuyển ra tệp và thấy cả cột giá. Bạn vừa mất cả quyền sửa lẫn quyền riêng tư.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Ghi ra các nhóm người dùng, tối đa ba nhóm cho bản đầu.",
          "Với mỗi nhóm điền có hoặc không cho xem, sửa, xoá.",
          "Nhờ AI soát quyền thừa và kịch bản xấu nhất.",
          "Thử từng vai trò bằng tài khoản giả trước khi phát cho nhóm.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Phát chìa theo nhóm, không phát chìa vạn năng.",
          "Ẩn nút không phải là khoá quyền.",
          "AI soát lỗ hổng, người hiểu việc quyết định.",
        ],
      },
    ],
  },
  {
    id: 2553,
    slug: "xuat-nhap-du-lieu-ra-file-de-khong-bi-nhot",
    title: "Chặng 57, Bài 14: Xuất dữ liệu ra tệp để công cụ hỏng cũng không mất trắng",
    subtitle: "Một bản photo hồ sơ cất ở nhà khác cứu bạn khi tủ chính bị cháy.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ nhỏ có thể hỏng, bị xoá hoặc mất dữ liệu trình duyệt bất cứ lúc nào, và lúc đó bạn cần một bản sao cất riêng. Nút xuất ra tệp thêm vào mất vài phút, nhưng chỉ có ích nếu bạn đã thử mở lại tệp đó ở máy khác và dữ liệu còn đủ dòng, đúng dấu tiếng Việt.",
    openingQuestion:
      "Bạn đã thêm nút Xuất ra tệp vào công cụ theo dõi đơn. Trước khi tin nút này, việc kiểm nào là quan trọng nhất?",
    openingOptions: [
      "Mở tệp vừa xuất ở máy khác xem đủ dòng và đúng chữ không",
      "Kiểm tên tệp có đẹp và có ghi ngày tháng năm không, rồi gửi đi",
      "Xem kích thước tệp có nhỏ hơn 1 MB không",
      "Bấm nút xuất thêm vài lần cho chắc là nút chạy",
    ],
    correctOption: 0,
    explanation:
      "Một bản sao chỉ có ích nếu mở lại được và còn nguyên: đủ số dòng, không lệch cột, tiếng Việt không vỡ chữ. Tên tệp đẹp hay dung lượng nhỏ không chứng minh nội dung đúng, và bấm nhiều lần chỉ cho ra nhiều tệp chưa ai kiểm. Bản sao chưa kiểm thì đến lúc cần mới biết nó hỏng, khi đã quá muộn.",
    diagram: [
      { label: "Công cụ có dữ liệu trong kho", arrow: true },
      { label: "Bấm Xuất: ghi dữ liệu ra một tệp", arrow: true },
      { label: "Mở tệp ở máy khác: đếm dòng, xem dấu tiếng Việt", arrow: true },
      { label: "Hỏng công cụ thì nhập lại từ tệp, không mất trắng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kho dùng bảng theo dõi nhập xuất do AI dựng suốt ba tháng. Khi máy được cài lại, toàn bộ dữ liệu trong trình duyệt biến mất, và chị chưa từng xuất tệp nào. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Xuất dữ liệu ra tệp trước khi dọn máy nhằm mục đích gì?",
        "Có bản sao riêng để nhập lại nếu công cụ mất dữ liệu",
        [
          "Làm công cụ chạy nhanh hơn và nhẹ hơn sau khi dọn máy xong",
          "Để AI tự đồng bộ dữ liệu giữa tệp và công cụ vào lần sau",
          "Vì mọi tệp xuất ra đều được công ty tự động sao lưu hộ bạn",
        ],
        "Mục đích là có một bản sao nằm ngoài công cụ để khôi phục khi cần. Tệp xuất ra không làm công cụ nhanh hơn, AI không tự đồng bộ, và tệp nằm ở đâu thì bạn phải tự cất, không có ai sao lưu hộ.",
      ),
      Q(
        "Bạn xuất 120 dòng, mở lại ở máy khác chỉ thấy 118 dòng. Nên làm gì?",
        "Tìm hai dòng thiếu và sửa cách xuất trước khi tin tệp này",
        [
          "Bỏ qua, vì hai dòng ít không đáng kể so với 120",
          "Đếm lại bằng mắt vì có thể máy khác hiển thị sai số dòng",
          "Xuất lại thật nhiều lần cho đến khi đủ 120",
        ],
        "Thiếu dòng là dấu hiệu tệp không đáng tin, nên phải tìm nguyên nhân hai dòng rơi đâu. Hai dòng có thể là hai khách hoặc hai khoản tiền quan trọng. Đổ cho máy khác hay xuất lại nhiều lần mà không tìm nguyên nhân thì lỗi vẫn còn.",
      ),
      Q(
        "Mở tệp xuất ra thấy chữ có dấu bị vỡ thành ký tự lạ. Đây thường là lỗi nào?",
        "Bảng mã ký tự của tệp không khớp với cách phần mềm mở nó",
        [
          "Dữ liệu trong công cụ gốc đã bị hỏng ngay từ lúc bạn nhập vào",
          "Máy khác thiếu phông chữ tiếng Việt nên không hiện nổi các dấu",
          "Tệp quá lớn nên phải nén lại trước khi mở ra thì mới đúng chữ",
        ],
        "Chữ vỡ thường do bảng mã (cách lưu ký tự) không khớp giữa nơi ghi và nơi mở; chỉ cần ghi hoặc mở lại đúng bảng mã là khỏi. Dữ liệu gốc thường vẫn nguyên, phông chữ thiếu chỉ làm hiện ô vuông chứ không đổi ký tự, và dung lượng không gây ra lỗi này.",
      ),
      Q(
        "Bạn nên xuất tệp dự phòng bao lâu một lần?",
        "Theo mức bạn chấp nhận mất: nhập nhiều mỗi ngày thì xuất mỗi ngày",
        [
          "Một lần duy nhất khi dựng xong công cụ",
          "Chỉ khi bạn thấy công cụ có dấu hiệu chạy chậm",
          "Mỗi quý một lần là đủ cho mọi loại công cụ",
        ],
        "Tần suất xuất phụ thuộc lượng dữ liệu bạn sẵn lòng nhập lại nếu mất: nhập nhiều mỗi ngày thì mất một ngày là đau. Xuất một lần duy nhất hay đợi công cụ chậm đều để dữ liệu mới nằm ngoài bản sao, và mỗi quý cho mọi công cụ là quá thưa.",
      ),
      Q(
        "Tệp xuất ra nên cất ở đâu cho đúng mục đích dự phòng?",
        "Ở nơi khác với máy đang chạy công cụ, theo quy định công ty",
        [
          "Ngay trong thư mục của công cụ trên cùng một máy để lúc cần tìm cho dễ",
          "Gửi qua ứng dụng chat cá nhân của bạn để sau này tiện tìm lại",
          "Đặt tên thật đẹp rồi để luôn ngoài màn hình nền của chính máy đó",
        ],
        "Bản sao phải sống sót khi máy gốc hỏng, nên cất ở nơi khác và nơi đó phải được công ty cho phép với loại dữ liệu này. Cất cùng máy thì mất cả hai, ứng dụng chat cá nhân có thể vi phạm quy định, và màn hình nền vẫn là cùng một máy.",
      ),
    ],
    keyTakeaways: [
      "Tệp xuất ra là bản sao nằm ngoài công cụ, dùng khi công cụ hỏng.",
      "Chỉ tin tệp sau khi mở ở máy khác, đếm dòng và xem dấu tiếng Việt.",
      "Xuất thường xuyên theo lượng dữ liệu bạn sẵn lòng nhập lại.",
      "Cất tệp ở nơi khác máy chạy công cụ và theo quy định công ty.",
    ],
    practicePrompt: {
      question:
        "Bạn xuất bảng 50 đơn rồi đóng máy. Sáng sau mở tệp ở máy khác thấy 50 dòng nhưng cột Ngày toàn là dãy số lạ. Nhận định nào đúng nhất?",
      options: [
        "Tệp đủ dòng nhưng định dạng ngày bị lỗi, cần sửa cách xuất",
        "Tệp hoàn toàn ổn vì đủ 50 dòng",
        "Dữ liệu ngày trong công cụ gốc chắc chắn đã mất",
        "Đổi sang máy thứ ba thử, biết đâu nó hiện đúng",
      ],
      correct: 0,
      explanation:
        "Đủ dòng chưa đủ: cột ngày vỡ nghĩa là bản sao không dùng được để khôi phục. Không nên kết luận dữ liệu gốc đã mất khi chưa kiểm công cụ; thử thêm máy chỉ hợp lý sau khi bạn đã xem lại cách xuất.",
    },
    summary: {
      keyIdea: "Tệp xuất ra chỉ là bản dự phòng thật khi bạn đã mở lại ở máy khác và thấy đủ, đúng.",
      formula: "Xuất → mở máy khác → đếm dòng → xem dấu tiếng Việt và ngày → cất nơi khác.",
      commonMistake: "Có nút xuất nhưng chưa bao giờ mở lại tệp đó.",
      action: "Xuất một bản ngay hôm nay và mở nó trên máy khác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng hoặc công cụ nhỏ bạn đang dùng. Xuất dữ liệu ra một tệp, rồi mở tệp trên một máy khác hoặc một phần mềm khác. Ghi lại ba thứ: số dòng gốc và số dòng trong tệp, chữ tiếng Việt có đúng dấu không, cột ngày có đúng không. Nếu có chỗ lệch, nhờ AI chỉ ra nguyên nhân.",
      secondary: "Ngày mai hệ thống sẽ hỏi bạn đã mở lại tệp xuất chưa và có lệch chỗ nào không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã dùng bảng theo dõi đơn ba tháng. Một sáng máy báo cài lại. Dữ liệu nằm trong trình duyệt và bạn chưa từng xuất tệp nào. Bài này dạy bạn tạo bản dự phòng, và quan trọng hơn, biết bản dự phòng đó dùng được.",
      },
      {
        type: "feynman",
        title: "Xuất tệp đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn photo toàn bộ hồ sơ rồi cất ở nhà người thân. Nếu văn phòng cháy, bạn còn bản photo. Nhưng nếu bản photo bị mờ hoặc thiếu trang, nó vô dụng ngay lúc bạn cần nhất.",
        columns: ["Bước", "Photo hồ sơ", "Xuất tệp"],
        rows: [
          ["Sao chép", "Photo toàn bộ hồ sơ", "Công cụ ghi dữ liệu ra một tệp"],
          ["Cất riêng", "Để ở nơi khác với văn phòng", "Lưu tệp ở máy hoặc nơi khác"],
          ["Kiểm lại", "Xem bản photo có đủ và rõ không", "Mở tệp, đếm dòng, xem dấu tiếng Việt"],
        ],
        oneLiner: "Bản sao chỉ có giá trị khi bạn đã kiểm nó đủ và đọc được.",
      },
      { type: "heading", text: "Dữ liệu tích lũy nhanh hơn bạn tưởng" },
      {
        type: "paragraph",
        text: "Một công cụ nhỏ trông chỉ là vài chục dòng, nhưng mỗi ngày dùng là thêm dòng. Sau vài tháng, mất dữ liệu nghĩa là nhập lại hàng nghìn dòng. Biểu đồ dưới đây giúp bạn hình dung bản sao dự phòng quý giá thế nào theo thời gian.",
      },
      {
        type: "chart",
        title: "Số dòng dữ liệu theo số tháng dùng công cụ",
        caption: "Số liệu minh hoạ. Giả định bạn nhập đều mỗi ngày dùng. Kéo thanh trượt cho khớp việc của bạn để thấy nếu mất dữ liệu ở tháng đó thì phải nhập lại bao nhiêu dòng.",
        kind: "line",
        xLabel: "Số tháng dùng",
        yLabel: "Số dòng dữ liệu tích luỹ",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "rows", label: "Số dòng nhập mỗi ngày dùng", min: 1, max: 50, step: 1, value: 8, unit: "dòng" },
          { id: "days", label: "Số ngày dùng mỗi tháng", min: 5, max: 26, step: 1, value: 22, unit: "ngày" },
        ],
        series: [{ label: "Số dòng tích luỹ", expr: "x * rows * days" }],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát báo cáo kiểm tệp xuất do AI viết",
        task: "Bạn xuất bảng 120 đơn, mở ở máy khác và thấy: 118 dòng, cột Họ tên có chữ bị vỡ thành ký tự lạ, cột Ngày hiển thị đúng. Bạn nhờ AI viết báo cáo kiểm. Bản nháp có câu không khớp với điều bạn thấy. Bấm vào những câu đáng ngờ rồi nộp.",
        segments: [
          { text: "Tệp xuất ra mở được ở máy thứ hai, không báo lỗi khi mở." },
          {
            text: "Tệp chứa đủ 120 dòng như bảng gốc.",
            error: "Sai: bạn đếm được 118 dòng. Báo cáo không được ghi số dòng khác với thực tế, vì hai dòng thiếu là chỗ phải tìm nguyên nhân.",
          },
          { text: "Cột Ngày hiển thị đúng định dạng ngày/tháng/năm." },
          {
            text: "Chữ tiếng Việt trong cột Họ tên hiển thị đầy đủ dấu.",
            error: "Sai: bạn thấy chữ bị vỡ thành ký tự lạ. Đây là lỗi bảng mã, chưa được xử lý.",
          },
          { text: "Cần tìm hai dòng thiếu và kiểm lại cách xuất chữ có dấu trước khi dùng tệp này làm bản dự phòng." },
        ],
      },
      {
        type: "scenario",
        title: "Công cụ mất dữ liệu sau khi dọn máy",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dọn dữ liệu duyệt web cho máy nhẹ hơn rồi mở công cụ: bảng trống. Tuần trước bạn có xuất một tệp nhưng chưa mở lại lần nào.",
            choices: [
              { label: "Nhập lại tất cả từ trí nhớ và giấy tờ rời", next: "bad_manual" },
              { label: "Mở tệp xuất tuần trước trước, kiểm đủ dòng và chữ có dấu, rồi nhập lại từ đó", next: "s2" },
            ],
          },
          bad_manual: {
            text: "Bạn mất hai ngày dựng lại và vẫn thiếu vài đơn cuối tuần. Tệp xuất tuần trước nằm đó mà không ai mở.",
            ending: "bad",
          },
          s2: {
            text: "Tệp có 340 dòng, dấu tiếng Việt đúng, nhưng thiếu các đơn từ tuần này. Công cụ chấp nhận nhập lại từ tệp.",
            choices: [
              { label: "Nhập lại từ tệp, rồi nhập thêm đơn tuần này từ giấy tờ và đặt lịch xuất mỗi cuối ngày", next: "good_end" },
              { label: "Nhập lại từ tệp và coi như xong, lần sau hãy tính", next: "bad_again" },
            ],
          },
          good_end: {
            text: "Bạn mất hơn một giờ chứ không phải hai ngày, và từ nay sự cố tương tự chỉ làm mất tối đa một ngày dữ liệu.",
            ending: "good",
          },
          bad_again: {
            text: "Lần sau máy lại cài đặt lại và bạn mất thêm một tháng đơn. Bản xuất chỉ cứu được khi bạn xuất đều đặn.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Xuất dữ liệu ra tệp theo lịch hợp với lượng bạn nhập.",
          "Mở tệp ở máy khác, đếm dòng và xem chữ có dấu.",
          "Kiểm cột ngày và cột số có đúng không.",
          "Cất tệp ở nơi khác máy chạy công cụ, theo quy định công ty.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bản sao chưa kiểm chưa phải bản dự phòng.",
          "Đủ dòng chưa đủ: phải đúng dấu tiếng Việt và đúng ngày.",
          "Xuất theo lượng dữ liệu bạn sẵn lòng nhập lại.",
        ],
      },
    ],
  },
  {
    id: 2554,
    slug: "du-an-nho-cong-cu-co-nho-lai-du-lieu-sau-khi-tat-may",
    title: "Chặng 57, Bài 15: Dự án nhỏ: công cụ nhớ dữ liệu sau khi tắt trình duyệt",
    subtitle: "Tắt hẳn rồi mở lại: phép thử rẻ nhất cho một công cụ biết nhớ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ nhìn đúng khi bạn đang mở không chứng minh nó nhớ được gì. Nhiều lỗi mất dữ liệu chỉ lộ ra sau khi đóng hẳn và mở lại, đúng lúc bạn cần dùng thật. Bài này gom những gì đã học trong chặng thành một phép thử gọn và một dòng ghi chú về nơi dữ liệu nằm.",
    openingQuestion:
      "Công cụ vừa có thêm tính năng lưu. Bạn nhập 5 dòng, thấy bảng cập nhật đúng. Phép thử nào cho biết nó nhớ thật?",
    openingOptions: [
      "Đóng hẳn trình duyệt, mở lại và xem 5 dòng còn không",
      "Bấm tải lại trang một lần rồi xem ngay 5 dòng còn không",
      "Xem nút Lưu có hiện thông báo thành công không",
      "Hỏi AI xem công cụ đã lưu chưa rồi tin câu trả lời",
    ],
    correctOption: 0,
    explanation:
      "Đóng hẳn và mở lại mô phỏng đúng điều xảy ra vào ngày hôm sau, khi bạn quay lại làm việc. Tải lại trang chưa chắc khác gì, thông báo thành công chỉ nói công cụ tưởng mình đã lưu, và lời AI không thay cho việc tự thấy dữ liệu còn nguyên. Vì vậy phép thử phải tái tạo đúng hoàn cảnh của sáng hôm sau.",
    diagram: [
      { label: "Nhập vài dòng mẫu vào công cụ", arrow: true },
      { label: "Đóng hẳn trình duyệt", arrow: true },
      { label: "Mở lại: đối chiếu từng dòng với bản đã nhập", arrow: true },
      { label: "Ghi lại: dữ liệu lưu ở đâu, mất khi nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên nhân sự nhờ AI thêm tính năng lưu cho bảng chấm công. Cô thử bằng cách bấm tải lại trang và thấy dữ liệu còn nên kết luận là xong. Hôm sau mở máy, bảng trống: tính năng chỉ giữ dữ liệu khi trang còn mở. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật.",
    },
    quiz: [
      Q(
        "Sau khi thêm tính năng lưu, cách kiểm nào gần nhất với việc dùng thật hôm sau?",
        "Đóng hẳn trình duyệt, mở lại và đối chiếu dữ liệu",
        [
          "Tải lại trang một lần rồi nhìn thoáng qua bảng",
          "Hỏi đồng nghiệp xem công cụ trông có ổn để dùng không",
          "Đọc lại mô tả tính năng AI viết cho chắc",
        ],
        "Đóng hẳn rồi mở lại tái tạo đúng hoàn cảnh hôm sau. Tải lại trang chỉ kiểm được một phần, còn hỏi ý kiến hay đọc mô tả không cho bạn thấy dữ liệu còn hay mất.",
      ),
      Q(
        "Khi đối chiếu sau khi mở lại, bạn nên làm gì với dữ liệu mẫu?",
        "So từng dòng với bản đã nhập, gồm cả dòng có ký tự lạ",
        [
          "Đếm tổng số dòng là đủ, vì khớp số lượng là khớp nội dung",
          "Chỉ nhìn dòng đầu tiên, vì nếu dòng đầu đúng thì các dòng khác cũng đúng",
          "Xoá hết dữ liệu đã lưu rồi nhập lại cho sạch sẽ",
        ],
        "So từng dòng mới bắt được lỗi như mất ký tự có dấu hay cột bị lệch. Đếm tổng số dòng có thể bỏ sót dòng sai nội dung, chỉ nhìn dòng đầu thì bỏ qua phần còn lại, và xoá nhập lại là bỏ phép thử.",
      ),
      Q(
        "Bạn dặn AI thêm tính năng lưu. Câu lệnh nào cho kết quả dễ kiểm nhất?",
        "Lưu ngay mỗi lần thêm dòng, đọc lại khi mở, và nói rõ dữ liệu lưu ở đâu",
        [
          "Làm cho công cụ nhớ dữ liệu tốt hơn",
          "Lưu dữ liệu thật thông minh để không bao giờ mất",
          "Thêm tính năng lưu dữ liệu giống các ứng dụng lớn",
        ],
        "Câu lệnh nên nêu hành vi kiểm được: lưu khi nào, đọc khi nào, và nơi lưu phải nói rõ. Các câu mơ hồ như tốt hơn, thông minh hay giống ứng dụng lớn không cho AI tiêu chí nào, và không ai kiểm được là đã đạt chưa.",
      ),
      Q(
        "Sau phép thử, bạn cần ghi lại điều gì để người khác dùng công cụ không bị bất ngờ?",
        "Dữ liệu lưu ở đâu, và những việc làm mất nó",
        [
          "Thời gian bạn thử và tên AI đã dựng công cụ này hôm nay",
          "Danh sách tính năng mới nhất của công cụ",
          "Màu sắc và phông chữ của giao diện hiện tại",
        ],
        "Người dùng khác cần biết công cụ nhớ ở đâu và việc gì làm mất dữ liệu (dọn dữ liệu duyệt web, dùng máy khác). Tên AI, danh sách tính năng hay màu sắc không giúp họ tránh mất dữ liệu.",
      ),
      Q(
        "Phép thử cho thấy dữ liệu mất sau khi đóng hẳn trình duyệt. Bước tiếp theo hợp lý là gì?",
        "Báo AI kết quả thử, yêu cầu sửa rồi lặp lại đúng phép thử đó",
        [
          "Nhờ AI giải thích tại sao dữ liệu mất rồi coi như đã xong",
          "Tải lại trang và thử nhập dữ liệu mới, hy vọng lần này được",
          "Đổi sang trình duyệt khác và dùng bình thường mà không báo lại",
        ],
        "Quy trình là báo rõ kết quả thử để AI sửa, rồi chạy lại đúng phép thử cũ để xác nhận. Nghe giải thích mà không sửa thì dữ liệu vẫn mất, thử ngẫu nhiên không tìm ra nguyên nhân, còn đổi trình duyệt chỉ che lỗi.",
      ),
    ],
    keyTakeaways: [
      "Đóng hẳn trình duyệt rồi mở lại là phép thử gần việc dùng thật nhất.",
      "Đối chiếu từng dòng, không chỉ đếm số dòng.",
      "Dặn AI bằng hành vi kiểm được: lưu khi nào, đọc khi nào, lưu ở đâu.",
      "Ghi lại nơi lưu và những việc làm mất dữ liệu.",
    ],
    practicePrompt: {
      question:
        "Bạn thử công cụ: nhập 5 dòng, tải lại trang thấy còn đủ, và kết luận công cụ đã lưu được. Sau đó đóng trình duyệt, hôm sau mở lại thì trống. Điều gì đã sai trong cách thử?",
      options: [
        "Tải lại trang không mô phỏng việc đóng hẳn và mở lại hôm sau",
        "Chỉ nhập 5 dòng là quá ít để thử",
        "Phải thử bằng dữ liệu thật mới đúng",
        "Lẽ ra phải hỏi AI trước khi tải lại",
      ],
      correct: 0,
      explanation:
        "Tải lại trang có thể vẫn giữ trạng thái trong bộ nhớ tạm của trang, nên không chứng minh dữ liệu sống qua đêm. Số dòng không phải vấn đề, và dùng dữ liệu thật đi ngược lại bài 12; hỏi AI trước cũng không thay được phép thử đúng.",
    },
    summary: {
      keyIdea: "Công cụ chỉ nhớ thật khi dữ liệu còn sau khi đóng hẳn và mở lại.",
      formula: "Nhập dữ liệu giả → đóng hẳn → mở lại → đối chiếu từng dòng → ghi nơi lưu.",
      commonMistake: "Tin nút Lưu hoặc việc tải lại trang mà không đóng hẳn rồi mở lại.",
      action: "Làm phép thử đóng mở với một công cụ của bạn và ghi nơi lưu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dùng công cụ nhỏ (hoặc bản thử) bạn đang có. Nhập 5 dòng giả, trong đó có một dòng chữ có dấu và một dòng bỏ trống. Đóng hẳn trình duyệt, mở lại, đối chiếu từng dòng. Ghi vào ba dòng: dữ liệu còn đủ không, nó lưu ở đâu, việc gì có thể làm mất nó. Nếu có lỗi, nhờ AI sửa rồi làm lại phép thử.",
      secondary: "Ngày mai hệ thống sẽ hỏi bạn đã đóng mở thử chưa và ghi nơi lưu ra sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhập đơn cả ngày, bảng luôn đúng, nút Lưu luôn báo thành công. Sáng hôm sau mở máy thì bảng trống. Bài cuối của phần này gom những gì bạn đã học thành một phép thử gọn, để lần sau bạn biết trước chứ không phải phát hiện lúc đã cần.",
      },
      {
        type: "feynman",
        title: "Phép thử đóng mở đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn ghi số điện thoại lên tấm bảng trắng trong phòng họp. Bảng đang đầy chữ thì trông ổn, nhưng hôm sau nhân viên vệ sinh lau sạch. Muốn biết số có còn không, bạn phải chờ đến hôm sau hoặc giả lập điều đó.",
        columns: ["Tình huống", "Tấm bảng trắng", "Công cụ của bạn"],
        rows: [
          ["Đang dùng", "Chữ còn trên bảng", "Dữ liệu còn trong bộ nhớ của trang"],
          ["Sau một đêm", "Có thể đã bị lau", "Chỉ còn nếu đã được ghi vào nơi lưu"],
          ["Cách kiểm", "Quay lại hôm sau xem", "Đóng hẳn trình duyệt, mở lại và đối chiếu"],
        ],
        oneLiner: "Trông đúng khi đang mở chưa chứng minh công cụ nhớ: chỉ phép thử đóng mở mới cho biết.",
      },
      { type: "heading", text: "Vòng thử gồm năm bước" },
      {
        type: "paragraph",
        text: "Phép thử này nhỏ nhưng gom nhiều điều đã học: dùng dữ liệu giả (bài 12), biết dữ liệu nằm ở đâu (bài 11) và xem bản xuất có đủ không (bài 14). Bạn chạy nó mỗi khi có thay đổi về cách lưu.",
      },
      {
        type: "flow",
        title: "Vòng thử: nhớ dữ liệu sau khi tắt trình duyệt",
        steps: [
          { label: "Nhập dữ liệu mẫu", detail: "Nhập khoảng 5 dòng giả, trong đó có một dòng chữ có dấu, một dòng ô trống và một dòng rất dài. Đủ dạng để lộ lỗi." },
          { label: "Ghi lại cái bạn đã nhập", detail: "Chụp màn hình hoặc chép ra giấy các dòng vừa nhập. Không có bản gốc để đối chiếu thì sau này không biết thiếu gì." },
          { label: "Đóng hẳn trình duyệt", detail: "Đóng cả cửa sổ, không chỉ tab. Nếu được, chờ vài phút hoặc thử lại vào hôm sau: đó là điều xảy ra khi dùng thật." },
          { label: "Mở lại và đối chiếu", detail: "Mở công cụ và so từng dòng với bản đã ghi: đủ dòng, đúng dấu, đúng ô trống. Đếm dòng thôi là chưa đủ." },
          { label: "Ghi nơi lưu", detail: "Viết một dòng: dữ liệu lưu ở đâu và việc gì làm mất nó. Đây là ghi chú sống để người dùng sau không bị bất ngờ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI thêm tính năng lưu, rồi yêu cầu nó nói rõ chỗ lưu",
        task: "Công cụ của bạn hiện chỉ giữ dữ liệu khi trang còn mở. Ghép một câu lệnh để AI thêm tính năng lưu và nói rõ dữ liệu nằm ở đâu.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Công cụ của tôi hay mất dữ liệu.", feedback: "AI không biết công cụ làm gì, dữ liệu gồm gì: nó sẽ tự đoán và viết lại cả công cụ." },
              {
                text: "Công cụ là bảng theo dõi đơn một trang, hiện dữ liệu chỉ có khi trang đang mở, tắt trình duyệt là mất.",
                good: true,
                feedback: "Nêu đúng công cụ và triệu chứng: AI biết phải sửa chỗ nào.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Làm sao cho dữ liệu nhớ tốt hơn và thông minh hơn.", feedback: "Mục tiêu mơ hồ: AI sẽ thêm đủ thứ mà không ai kiểm được là đạt chưa." },
              {
                text: "Lưu ngay mỗi lần thêm hoặc sửa dòng, tự đọc lại khi mở công cụ, và không đổi phần còn lại.",
                good: true,
                feedback: "Mô tả hành vi kiểm được và giới hạn phạm vi thay đổi: dễ chạy lại phép thử.",
              },
            ],
          },
          {
            id: "report",
            label: "Điều cần AI báo lại",
            options: [
              {
                text: "Nói rõ dữ liệu được lưu ở đâu, tệp hay trình duyệt, và việc gì làm mất nó.",
                good: true,
                feedback: "Bạn có sẵn dòng ghi nơi lưu cho người dùng sau.",
              },
              { text: "Không cần nói gì, chỉ gửi bản mới.", feedback: "Bạn không biết dữ liệu nằm ở đâu, nên không ghi chú được cho người dùng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "report"],
            text: "Đã sửa: mỗi lần thêm hoặc sửa dòng, công cụ ghi toàn bộ danh sách vào kho của trình duyệt này, và khi mở lại sẽ đọc từ kho đó. Phần còn lại giữ nguyên.\n\nNơi lưu: trong trình duyệt của máy bạn, không có máy chủ.\nDữ liệu có thể mất khi: xoá dữ liệu duyệt web, dùng cửa sổ ẩn danh, đổi máy hoặc đổi trình duyệt.\nNên xuất tệp dự phòng định kỳ.",
          },
          {
            requires: ["context"],
            text: "Đã thêm tính năng lưu. Công cụ giờ nhớ dữ liệu tốt hơn. Bạn nên thử lại để xem có ổn không.",
          },
          {
            text: "Tôi đã nâng cấp công cụ với bộ nhớ thông minh đồng bộ đám mây, bảo đảm không bao giờ mất dữ liệu trên mọi thiết bị.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Phép thử đóng mở phát hiện lỗi",
        start: "s1",
        nodes: {
          s1: {
            text: "AI báo đã thêm tính năng lưu. Bạn nhập 5 dòng thấy hiện đúng và bấm tải lại thì dữ liệu còn. Đồng nghiệp hỏi: xong chưa, cho anh dùng luôn nhé?",
            choices: [
              { label: "Báo xong, cho đồng nghiệp dùng luôn vì đã tải lại thử rồi", next: "bad_ship" },
              { label: "Đóng hẳn trình duyệt, mở lại rồi mới trả lời", next: "s2" },
            ],
          },
          bad_ship: {
            text: "Hôm sau đồng nghiệp nhập cả ngày đơn, tối đóng máy. Sáng mở lại thì trống, và anh không còn tin công cụ của bạn nữa.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi đóng hẳn và mở lại, bảng trống. Bạn phát hiện ngay lỗi trước khi ai dùng thật.",
            choices: [
              { label: "Báo AI kết quả thử, nhờ sửa, rồi chạy lại đúng phép thử đó", next: "s3" },
              { label: "Bỏ tính năng lưu và dặn mọi người đừng đóng trình duyệt", next: "bad_dont" },
            ],
          },
          bad_dont: {
            text: "Không ai nhớ quy tắc đó. Một lần máy tự cập nhật và khởi động lại, cả bảng biến mất.",
            ending: "bad",
          },
          s3: {
            text: "Phép thử lần hai cho thấy đủ 5 dòng, đúng dấu, đúng ô trống. Bạn hỏi AI nơi lưu và được câu trả lời: trong trình duyệt của máy này.",
            choices: [
              { label: "Ghi chú: lưu trong trình duyệt, mất khi dọn dữ liệu duyệt web hoặc đổi máy; nên xuất tệp định kỳ", next: "good_end" },
              { label: "Không ghi gì, mọi người sẽ tự biết", next: "bad_quiet" },
            ],
          },
          good_end: {
            text: "Đồng nghiệp biết công cụ nhớ tới đâu và biết xuất tệp. Khi có lần dọn máy, họ không mất trắng và không quay lại trách bạn.",
            ending: "good",
          },
          bad_quiet: {
            text: "Hai tuần sau một đồng nghiệp dọn trình duyệt và mất hết. Họ trách bạn, và đúng là bạn đã biết nơi lưu mà không nói.",
            ending: "bad",
          },
        },
      },
      {
        type: "list",
        items: [
          "Nhập 5 dòng giả có dấu, ô trống và dòng rất dài.",
          "Đóng hẳn trình duyệt rồi mở lại.",
          "Đối chiếu từng dòng với bản đã ghi.",
          "Ghi một dòng: dữ liệu lưu ở đâu và việc gì làm mất nó.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nút Lưu báo thành công chưa chứng minh công cụ nhớ.",
          "Đóng hẳn rồi mở lại là phép thử rẻ nhất.",
          "Ghi nơi lưu để người dùng sau không bị bất ngờ.",
        ],
      },
    ],
  },
];
