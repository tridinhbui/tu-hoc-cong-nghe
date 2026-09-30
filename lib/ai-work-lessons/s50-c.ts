import type { Lesson } from "../lesson-types";

// Chặng 50, bài 11-15. Giáo trình: scripts/curriculum/stage-50.json.
// Không nêu tính năng, giá hay đường dẫn nút bấm của công cụ cụ thể: chỉ dạy cách hỏi nhà cung cấp và cách đối chiếu tài liệu chính thức.

const q = (question: string, correct: string, wrong: [string, string, string], explanation: string) => ({
  question,
  options: [correct, ...wrong],
  correct: 0,
  explanation,
});

export const S50_C_LESSONS: Lesson[] = [
  {
    id: 2410,
    slug: "checklist-danh-gia-ba-cau-hoi-truoc-khi-dua-du-lieu-vao",
    title: "Chặng 50, Bài 11: Ba câu hỏi trước khi đưa dữ liệu công ty vào công cụ mới",
    subtitle: "Trước khi gửi thư, bạn đọc kỹ địa chỉ người nhận. Dữ liệu cũng cần một lần đọc địa chỉ như vậy.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một công cụ mới rất dễ dùng, và chính vì dễ nên người ta dán bảng doanh số vào trước khi hỏi dữ liệu đi đâu. Ba câu hỏi, mất mười lăm phút đọc trang chính sách của nhà cung cấp, tránh được chuyện số liệu khách hàng nằm ở nơi công ty không kiểm soát.",
    openingQuestion:
      "Bạn sắp dán bảng doanh số theo khách hàng vào một công cụ AI mới đồng nghiệp giới thiệu. Bạn nên tìm câu trả lời cho điều gì đầu tiên?",
    openingOptions: [
      "Dữ liệu dán vào được lưu ở đâu và có dùng để huấn luyện không",
      "Công cụ có giao diện đẹp và có nhiều người khen trong nhóm chat không",
      "Công cụ có ra kết quả nhanh hơn công cụ bạn đang dùng hay không",
      "Công cụ có sẵn bản tiếng Việt và hỗ trợ gõ dấu đầy đủ hay không",
    ],
    correctOption: 0,
    explanation:
      "Dán vào ô chat là gửi dữ liệu ra ngoài công ty, nên câu phải trả lời trước là dữ liệu đi đâu và có được dùng để huấn luyện mô hình hay không. Giao diện đẹp, tốc độ và bản tiếng Việt đều là chuyện tiện dùng: chúng quan trọng, nhưng sai ở các điểm đó thì bạn chỉ mất công, còn sai ở điểm dữ liệu thì không rút lại được. Câu trả lời nằm trong chính sách chính thức của nhà cung cấp, không nằm trong lời đồn trên nhóm chat.",
    diagram: [
      { label: "Câu 1: dữ liệu đi đâu, lưu bao lâu", arrow: true },
      { label: "Câu 2: có dùng để huấn luyện không", arrow: true },
      { label: "Câu 3: ai trong công ty đã duyệt", arrow: true },
      { label: "Ghi lại nguồn đối chiếu, rồi mới dán dữ liệu" },
    ],
    realWorldExample: {
      company: "Samsung (2023)",
      description:
        "Năm 2023 có báo cáo nhân viên Samsung dán mã nguồn và nội dung họp nội bộ vào một chatbot công cộng, sau đó công ty hạn chế dùng AI tạo sinh trên thiết bị công ty. Bài học không phải là đừng dùng AI, mà là hỏi trước: thứ mình dán sẽ đi đâu.",
    },
    quiz: [
      q(
        "Bạn muốn biết công cụ mới có dùng dữ liệu của bạn để huấn luyện mô hình hay không. Nên tìm ở đâu?",
        "Trong chính sách dữ liệu và điều khoản chính thức của nhà cung cấp",
        [
          "Trong bài đăng của người nổi tiếng chuyên khen các công cụ AI mới trên mạng xã hội",
          "Trong phần bình luận dưới video hướng dẫn công cụ",
          "Bằng cách hỏi chính chatbot rồi tin câu nó trả lời",
        ],
        "Chính sách và điều khoản chính thức là văn bản nhà cung cấp chịu trách nhiệm. Bài khen và bình luận là ý kiến cá nhân, có thể đã cũ. Hỏi chính chatbot không đáng tin vì nó có thể trả lời nghe hợp lý mà không đúng chính sách hiện hành.",
      ),
      q(
        "Công ty có quy định cấm đưa dữ liệu khách hàng vào công cụ chưa duyệt. Một công cụ mới trông an toàn. Bạn làm gì?",
        "Hỏi người phụ trách IT hoặc bảo mật xem công cụ đã được duyệt chưa",
        [
          "Dán thử một phần nhỏ trước, nếu không thấy sự cố gì thì dán tiếp phần còn lại của bảng",
          "Dùng tài khoản cá nhân của bạn để quy định của công ty không áp dụng lên việc này",
          "Ẩn tên cột rồi dán cả bảng vì như vậy đã coi như được ẩn danh hoàn toàn rồi",
        ],
        "Duyệt công cụ là quyết định của người chịu trách nhiệm bảo mật, không phải của từng nhân viên. Dán thử một phần vẫn là đã gửi dữ liệu đi. Dùng tài khoản cá nhân chỉ đẩy dữ liệu công ty ra khỏi tầm kiểm soát hơn, và bỏ tên cột không làm bảng thành ẩn danh vì số liệu và khách vẫn suy ra được.",
      ),
      q(
        "Trang chính sách ghi: dữ liệu ở gói cá nhân có thể dùng để cải thiện dịch vụ. Điều này nghĩa là gì với bạn?",
        "Không đưa dữ liệu công ty vào gói đó khi chưa có xác nhận bằng văn bản",
        [
          "Dữ liệu chỉ bị đọc bởi máy nên không ảnh hưởng gì tới công ty",
          "Dữ liệu sẽ bị xoá ngay khi bạn đóng cửa sổ trình duyệt lại",
          "Chỉ cần xoá cuộc trò chuyện xong là mọi bản sao đều biến mất hết",
        ],
        "Cụm dùng để cải thiện dịch vụ thường bao gồm cả huấn luyện. Dữ liệu vẫn rời công ty dù chỉ máy xử lý, đóng cửa sổ không xoá bản lưu phía nhà cung cấp, và xoá cuộc trò chuyện chưa chắc xoá mọi bản sao. Vì vậy cần xác nhận bằng văn bản trước.",
      ),
      q(
        "Bảng nào dưới đây hợp lý nhất để thử công cụ lạ lần đầu?",
        "Bảng số liệu giả bạn tự tạo, cùng cấu trúc với bảng thật",
        [
          "Bảng doanh số tháng này sau khi đã xoá toàn bộ cột tên khách hàng đi",
          "Bảng lương phòng bạn, chỉ dán mười dòng đầu thôi",
          "Bảng công nợ khách hàng thật, sau khi bạn khoá file lại",
        ],
        "Dữ liệu giả cùng cấu trúc cho bạn thấy công cụ làm được gì mà không mất gì nếu nó không an toàn. Doanh số thật dù xoá tên vẫn là số liệu công ty, bảng lương là dữ liệu cá nhân nhân viên, còn công nợ là thông tin khách hàng. Khoá file trên máy bạn không ảnh hưởng chuyện gửi dữ liệu đi.",
      ),
      q(
        "Bạn đã đọc xong chính sách. Bước ghi chép nào giúp cả phòng sau này?",
        "Ghi tên nguồn, ngày đọc và điều bạn đối chiếu được",
        [
          "Chỉ ghi chữ đã kiểm tra an toàn vào cuối file ghi chú",
          "Chụp màn hình trang chủ của công cụ để lưu vào máy",
          "Không ghi gì vì chính sách đã nằm sẵn trên trang web rồi",
        ],
        "Chính sách thay đổi theo thời gian, nên điều đáng lưu là nguồn, ngày đọc và điều bạn thấy. Chữ đã kiểm tra an toàn không cho ai cách kiểm lại. Ảnh trang chủ không chứa phần chính sách. Và trang web có thể đổi sau đó, nên không ghi gì là mất bằng chứng.",
      ),
    ],
    keyTakeaways: [
      "Dán vào ô chat là gửi dữ liệu ra ngoài công ty.",
      "Ba câu: dữ liệu đi đâu, có dùng để huấn luyện không, ai đã duyệt.",
      "Câu trả lời nằm trong chính sách chính thức, không phải lời đồn.",
      "Thử công cụ lạ bằng dữ liệu giả cùng cấu trúc.",
      "Ghi lại nguồn và ngày đọc: chính sách có thể đổi.",
    ],
    practicePrompt: {
      question:
        "Nhóm bạn muốn thử công cụ mới để tóm tắt email khách hàng. Bước đầu hợp lý nhất là gì?",
      options: [
        "Hỏi IT về chính sách, thử bằng email giả trước",
        "Dán email khách thật vì đó là cách nhanh nhất để biết công cụ tốt hay không",
        "Nhờ một đồng nghiệp đã dùng thử kể lại cảm nhận rồi làm theo luôn",
        "Đợi tới khi cả công ty dùng mới thử, vì công cụ chưa duyệt thì tuyệt đối không được động tới",
      ],
      correct: 0,
      explanation:
        "Hỏi IT và thử bằng dữ liệu giả vừa giữ an toàn vừa cho bạn thấy công cụ làm được gì. Dán email thật là gửi dữ liệu khách đi trước khi biết điều gì xảy ra với nó. Cảm nhận của đồng nghiệp không nói gì về chính sách dữ liệu. Chờ mãi thì bỏ lỡ cơ hội thử an toàn có sẵn.",
    },
    summary: {
      keyIdea: "Trước khi dán dữ liệu vào công cụ mới, hỏi ba câu và tìm đáp án trong tài liệu chính thức.",
      formula: "Dữ liệu đi đâu + có huấn luyện không + ai duyệt = được dán hay chưa.",
      commonMistake: "Dán thử một phần nhỏ trước cho chắc, rồi coi như đã thử an toàn.",
      action: "Chọn một công cụ bạn định thử và viết ba câu trả lời kèm nguồn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đang muốn thử. Mở trang chính sách dữ liệu hoặc điều khoản của nhà cung cấp, trả lời ba câu (dữ liệu đi đâu, có dùng huấn luyện không, gói nào khác gói nào) và ghi mỗi câu kèm đường dẫn hoặc tên mục bạn đã đọc, cùng ngày đọc. Ghi trong một file riêng trên máy bạn.",
      secondary: "Câu nào bạn không tìm được đáp án thì ghi là chưa rõ và hỏi IT hoặc nhà cung cấp, đừng đoán.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ ba, đồng nghiệp gửi bạn một công cụ AI mới rất hay. Bạn đang cầm bảng doanh số theo khách hàng trong tay. Bài này là mười lăm phút trước khi bạn bấm dán.",
      },
      {
        type: "feynman",
        title: "Hỏi dữ liệu đi đâu đơn giản hơn bạn nghĩ",
        intro: "Trước khi gửi một phong bì có giấy tờ quan trọng, bạn đọc địa chỉ người nhận, hỏi bưu điện có lưu bản sao không, và xem ai trong nhà cho phép gửi.",
        columns: ["Việc", "Gửi phong bì giấy tờ", "Dán dữ liệu vào công cụ"],
        rows: [
          ["Đi đâu", "Đọc kỹ địa chỉ người nhận", "Hỏi dữ liệu được lưu và xử lý ở đâu"],
          ["Có bản sao không", "Hỏi bưu điện có lưu bản chụp không", "Hỏi có dùng để huấn luyện mô hình không"],
          ["Ai cho phép", "Hỏi người nhà đã đồng ý chưa", "Hỏi IT hoặc bảo mật đã duyệt chưa"],
          ["Bằng chứng", "Giữ biên nhận", "Ghi nguồn chính sách và ngày đọc"],
        ],
        oneLiner: "Dữ liệu cũng là một phong bì: đọc địa chỉ trước khi gửi, không phải sau.",
      },
      { type: "heading", text: "Ba câu, theo thứ tự" },
      {
        type: "paragraph",
        text: "Câu một: dữ liệu tôi dán vào được lưu ở đâu và bao lâu. Câu hai: nó có được dùng để huấn luyện (training: dạy thêm cho mô hình) không. Câu ba: ai trong công ty đã xem và duyệt công cụ này. Câu trả lời thường nằm ở trang chính sách dữ liệu, điều khoản sử dụng hoặc trang bảo mật của nhà cung cấp. Đó là văn bản nhà cung cấp chịu trách nhiệm, nên đó là nguồn duy nhất đáng tin.",
      },
      {
        type: "flow",
        title: "Từ lúc nghe về công cụ tới lúc được dán dữ liệu",
        steps: [
          { label: "Tìm trang chính sách", detail: "Mở trang chính sách dữ liệu hoặc điều khoản của chính nhà cung cấp, không đọc lại từ bài đăng của người khác." },
          { label: "Trả lời ba câu", detail: "Dữ liệu đi đâu, có dùng để huấn luyện không, gói miễn phí và gói trả phí có khác nhau không. Câu nào chưa rõ thì ghi chưa rõ." },
          { label: "Hỏi người duyệt", detail: "Gửi cho IT hoặc bảo mật ba câu trả lời kèm đường dẫn, hỏi công cụ đã được duyệt chưa." },
          { label: "Thử bằng dữ liệu giả", detail: "Tạo bảng số liệu giả cùng cấu trúc bảng thật và thử công cụ trên đó." },
          { label: "Ghi lại", detail: "Ghi nguồn, ngày đọc và kết luận để lần sau hoặc đồng nghiệp khỏi phải đọc lại từ đầu." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi trước, dán sau",
          text: "Đọc chính sách chính thức, hỏi người duyệt, thử bằng dữ liệu giả. Mất khoảng mười lăm phút, nhưng mọi bước đều rút lại được.",
        },
        right: {
          label: "Dán trước, hỏi sau",
          text: "Dán dữ liệu thật vào để thử cho nhanh, đọc chính sách sau. Dữ liệu đã đi rồi thì không gọi lại được, dù chính sách hoá ra ổn hay không.",
        },
      },
      { type: "heading", text: "Gói cá nhân và gói doanh nghiệp có thể khác nhau" },
      {
        type: "list",
        items: [
          "Mỗi nhà cung cấp có quy định riêng cho từng gói, và quy định đổi theo thời gian.",
          "Khi đọc, tìm đúng gói bạn định dùng, không đọc nhầm gói khác.",
          "Câu nào chính sách không nói rõ thì coi là chưa biết, không coi là được phép.",
          "Ghi ngày đọc, vì chính sách có thể đã khác khi bạn quay lại.",
        ],
      },
      {
        type: "callout",
        label: "Ẩn tên cột không phải ẩn danh",
        text: "Xoá cột tên khách khỏi bảng doanh số vẫn để lại số liệu công ty, và nhiều khi khách vẫn suy ra được từ con số. Muốn thử an toàn thì dùng số liệu giả.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản ghi chú do đồng nghiệp gửi",
        task: "Đồng nghiệp gửi ghi chú về công cụ mới và bảo đã kiểm tra an toàn. Trang chính sách bạn mở ra chỉ nói: dữ liệu ở gói cá nhân có thể dùng để cải thiện dịch vụ; gói doanh nghiệp có điều khoản riêng; chưa thấy mục nào nói rõ thời gian lưu. Đánh dấu những câu không có trong trang chính sách.",
        segments: [
          { text: "Công cụ có hai loại gói: gói cá nhân và gói doanh nghiệp." },
          {
            text: "Dữ liệu gói cá nhân tuyệt đối không bao giờ được dùng để huấn luyện.",
            error: "Trang chính sách nói ngược lại: dữ liệu gói cá nhân có thể dùng để cải thiện dịch vụ. Chữ tuyệt đối là thứ người viết ghi chú tự thêm cho yên tâm.",
          },
          { text: "Gói doanh nghiệp có điều khoản riêng, cần đọc riêng." },
          {
            text: "Dữ liệu được xoá sau đúng 30 ngày.",
            error: "Trang chính sách không ghi thời gian lưu. Con số 30 ngày là bịa hoặc nhớ nhầm từ công cụ khác.",
          },
          {
            text: "Công ty mình đã duyệt công cụ này cho mọi phòng ban.",
            error: "Không có nguồn nào nói công ty đã duyệt. Đó là điều cần hỏi IT chứ không phải điều trang chính sách của nhà cung cấp có thể xác nhận.",
          },
          { text: "Thời gian lưu chưa rõ nên cần hỏi nhà cung cấp hoặc IT." },
        ],
      },
      {
        type: "scenario",
        title: "Bảng doanh số và công cụ mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ tư, bạn cần tóm tắt bảng doanh số 200 khách. Đồng nghiệp gợi ý một công cụ mới, nói rằng ai cũng dùng.",
            choices: [
              { label: "Dán cả bảng vào, vì ai cũng dùng thì chắc an toàn", next: "bad_paste" },
              { label: "Mở trang chính sách của nhà cung cấp và đọc trước", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bản tóm tắt ra nhanh. Một tuần sau IT hỏi vì sao số liệu khách hàng xuất hiện ở một dịch vụ chưa được duyệt, và bạn không có nguồn nào để trả lời đã kiểm tra gì.",
            ending: "bad",
          },
          s2: {
            text: "Chính sách ghi gói cá nhân có thể dùng dữ liệu để cải thiện dịch vụ, còn gói doanh nghiệp có điều khoản riêng. Công ty bạn chưa có tài khoản doanh nghiệp.",
            choices: [
              { label: "Dùng gói cá nhân nhưng xoá tên khách khỏi bảng", next: "bad_mask" },
              { label: "Gửi IT đường dẫn chính sách, hỏi công cụ đã được duyệt chưa, trong lúc đó thử bằng bảng giả", next: "good" },
            ],
          },
          bad_mask: {
            text: "Bảng vẫn chứa doanh số từng khách, và bạn đã gửi số liệu công ty đi bằng gói cho phép dùng để cải thiện dịch vụ. Việc xoá tên không làm nó thành dữ liệu ẩn danh.",
            ending: "bad",
          },
          good: {
            text: "IT trả lời trong ngày: chưa duyệt, nhưng sẽ xem xét gói doanh nghiệp. Bạn thử tóm tắt bằng bảng giả, thấy công cụ làm được, và đính kèm kết quả vào đề xuất gửi IT.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba câu hỏi, một nguồn chính thức, một bảng số liệu giả: mười lăm phút.",
          "Bài sau: phân biệt gói miễn phí, cá nhân và doanh nghiệp khi đọc trang gói.",
        ],
      },
    ],
  },
  {
    id: 2411,
    slug: "goi-mien-phi-goi-ca-nhan-goi-doanh-nghiep-khac-nhau-o-dau",
    title: "Chặng 50, Bài 12: Gói miễn phí, cá nhân, doanh nghiệp: khác nhau ở đâu",
    subtitle: "Cùng một cửa hàng, mua lẻ ở quầy và đặt hợp đồng cho công ty không giống nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi muốn dùng công cụ cho cả phòng, nhiều người chỉ đăng ký gói cá nhân cho nhanh. Sau đó phát hiện dữ liệu, chia sẻ và quản trị làm khác đi so với điều họ tưởng. Biết đọc trang gói theo ba trục giúp bạn chọn đúng từ đầu.",
    openingQuestion:
      "Bạn định dùng một công cụ cho cả phòng tám người và đang phân vân giữa gói cá nhân và gói doanh nghiệp. Bạn nên so sánh điều gì trước tiên?",
    openingOptions: [
      "Cách xử lý dữ liệu, khả năng chia sẻ và phần quản trị của mỗi gói",
      "Gói nào có tên nghe chuyên nghiệp và quảng cáo nhiều tính năng mới hơn",
      "Gói nào nhiều người trong nhóm chat nói là đang dùng cho thoải mái",
      "Gói nào có giá hiển thị đầu tiên trên trang thấp hơn để khỏi tốn tiền",
    ],
    correctOption: 0,
    explanation:
      "Điều khác nhau thật sự giữa các gói thường nằm ở dữ liệu (có dùng để huấn luyện không), chia sẻ (nhiều người dùng chung thế nào) và quản trị (ai thêm bớt thành viên, ai xem được gì). Tên gói, lời đồn trong nhóm và con số giá đầu tiên trên trang không nói gì về ba điều đó, và nhiều khi giá đầu tiên là giá mỗi người mỗi tháng của một cấu hình chưa phải thứ bạn cần.",
    diagram: [
      { label: "Dữ liệu: dùng huấn luyện không, lưu thế nào", arrow: true },
      { label: "Chia sẻ: nhiều người dùng chung ra sao", arrow: true },
      { label: "Quản trị: ai thêm bớt, ai xem được gì", arrow: true },
      { label: "Ghi lại điều đã đối chiếu, rồi mới chọn gói" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng marketing tám người mỗi người tự đăng ký gói cá nhân bằng email riêng. Khi một bạn nghỉ việc, cả thư viện câu lệnh và lịch sử làm việc nằm trong tài khoản của bạn đó, và công ty không lấy lại được. Đây là tình huống minh hoạ: điều cần học là gói dùng chung có quản trị giải quyết đúng loại rủi ro này.",
    },
    quiz: [
      q(
        "Khi đọc trang gói của nhà cung cấp, trục nào liên quan trực tiếp tới dữ liệu công ty?",
        "Dữ liệu có bị dùng để huấn luyện mô hình hay không",
        [
          "Số lượng màu sắc và kiểu chữ có thể chọn trong giao diện",
          "Công cụ có mở được trên điện thoại không",
          "Ngôn ngữ của trang chủ khi đăng nhập",
        ],
        "Chuyện dữ liệu có dùng huấn luyện hay không quyết định số liệu công ty đi đâu. Màu giao diện, việc mở được trên điện thoại hay ngôn ngữ trang chủ là chuyện tiện dùng, không nói gì về cách dữ liệu được xử lý.",
      ),
      q(
        "Một phòng tám người cùng đăng ký gói cá nhân bằng email riêng. Rủi ro lớn nhất là gì?",
        "Công ty không quản lý được ai dùng và không lấy lại được công việc khi người đó nghỉ",
        [
          "Công cụ sẽ chạy chậm hơn vì có tám tài khoản cùng lúc",
          "Mỗi người sẽ nhận được kết quả khác hẳn dù dùng cùng câu lệnh",
          "Tài khoản sẽ tự khoá sau một tuần vì nhiều người dùng chung thiết bị",
        ],
        "Gói cá nhân gắn với một người, nên khi họ rời đi công ty không thu lại được công việc, và không ai quản lý được việc dùng. Chuyện chạy chậm hoặc kết quả khác nhau không phải đặc điểm của việc có nhiều tài khoản, và không có cơ sở nào để nói tài khoản tự khoá sau một tuần.",
      ),
      q(
        "Trang gói ghi tính năng quản trị chỉ có ở gói doanh nghiệp. Bạn cần hiểu phần quản trị là gì?",
        "Người có quyền thêm bớt thành viên và đặt giới hạn cho cả nhóm",
        [
          "Nhân viên hỗ trợ của nhà cung cấp ngồi cạnh bạn mỗi ngày",
          "Phần mềm tự kiểm tra lỗi chính tả và văn phong trong mọi câu trả lời",
          "Khả năng xem trước điều bạn sẽ gõ ở lần sau để sửa trước khi gửi",
        ],
        "Quản trị nghĩa là có người phụ trách: thêm bớt thành viên, đặt quy định và giới hạn cho cả nhóm. Đó không phải nhân viên ngồi cạnh bạn, không phải sửa chính tả, cũng không phải đoán trước câu bạn sẽ gõ.",
      ),
      q(
        "Trang gói không nói rõ gói miễn phí có dùng dữ liệu để huấn luyện không. Bạn nên coi là gì?",
        "Chưa biết, cần hỏi nhà cung cấp hoặc IT",
        [
          "Có thể dùng bình thường vì không thấy cấm",
          "Chắc chắn là không, vì nhà cung cấp lớn luôn bảo vệ dữ liệu",
          "Không quan trọng, vì gói miễn phí thì dữ liệu chẳng đáng giá gì",
        ],
        "Không thấy điều cấm không có nghĩa được phép: thứ chưa rõ thì coi là chưa biết và hỏi lại. Nhà cung cấp lớn hay nhỏ không phải bằng chứng. Dữ liệu công ty đáng giá dù bạn dùng gói nào.",
      ),
      q(
        "Sau khi so sánh xong, điều gì nên được ghi lại?",
        "Từng điều bạn đối chiếu, nguồn nó nằm ở đâu và ngày đọc",
        [
          "Chỉ tên gói bạn chọn",
          "Giá hiển thị đầu tiên và điều bạn thích nhất trên trang, rồi bỏ qua các gói khác",
          "Một câu ngắn là đã so sánh xong nhiều gói",
        ],
        "Ghi từng điều đối chiếu kèm nguồn và ngày giúp người khác kiểm lại khi trang đổi. Chỉ ghi tên gói hoặc giá đầu tiên không cho thấy vì sao chọn. Một câu đã so sánh xong không có gì để kiểm.",
      ),
    ],
    keyTakeaways: [
      "So sánh gói theo ba trục: dữ liệu, chia sẻ, quản trị.",
      "Gói cá nhân gắn với một người, không gắn với công ty.",
      "Điều trang không nói rõ thì coi là chưa biết.",
      "Ghi điều đã đối chiếu kèm nguồn và ngày đọc.",
      "Tên gói nghe chuyên nghiệp chưa nói gì về nội dung.",
    ],
    practicePrompt: {
      question:
        "Chị Hà muốn cả phòng dùng chung một công cụ. Việc đầu tiên nên làm là gì?",
      options: [
        "Lập bảng ba trục cho từng gói và hỏi IT",
        "Đăng ký một tài khoản cá nhân rồi chia sẻ mật khẩu cho cả phòng dùng chung",
        "Chọn gói rẻ nhất, vì tính năng gói nào rồi cũng giống nhau cả",
        "Để mỗi người tự chọn gói mình thích rồi gộp lại sau khi dùng thử một tháng",
      ],
      correct: 0,
      explanation:
        "Bảng ba trục cho chị thấy điều khác nhau thật, và IT quyết định việc duyệt. Chia sẻ mật khẩu làm mất hẳn chuyện quản lý ai dùng. Chọn gói rẻ nhất mà chưa so sánh thì dễ trúng gói thiếu phần quản trị. Để mỗi người tự chọn thì quay lại đúng rủi ro nhiều tài khoản riêng.",
    },
    summary: {
      keyIdea: "Gói khác nhau ở dữ liệu, chia sẻ và quản trị, không phải ở cái tên.",
      formula: "Dữ liệu + chia sẻ + quản trị, đối chiếu từng gói, ghi nguồn.",
      commonMistake: "Đăng ký gói cá nhân cho cả phòng vì thấy nhanh và rẻ.",
      action: "Lập bảng ba trục cho hai gói của một công cụ bạn đang cân nhắc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI và mở trang gói của nhà cung cấp. Lập bảng hai cột (hai gói) và ba dòng (dữ liệu, chia sẻ, quản trị). Mỗi ô ghi điều trang nói, hoặc chữ chưa rõ nếu trang không nói, kèm tên mục bạn đọc. Lưu bảng thành một file và ghi ngày.",
      secondary: "Gửi bảng cho người quản lý IT hoặc sếp trực tiếp, hỏi họ thấy thiếu ô nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Cả phòng hào hứng với một công cụ mới, và bạn là người được giao đăng ký. Trang gói có ba cột, mỗi cột một tên khác nhau. Bài này dạy cách đọc chúng.",
      },
      {
        type: "feynman",
        title: "Đọc trang gói đơn giản hơn bạn nghĩ",
        intro: "Một cửa hàng cho thuê văn phòng có thể cho thuê chỗ ngồi lẻ theo ngày hoặc ký hợp đồng thuê cả tầng cho công ty. Hai hình thức cùng một toà nhà nhưng khác nhau ở chìa khoá, ai ra vào và ai chịu trách nhiệm.",
        columns: ["Điều cần hỏi", "Chỗ ngồi lẻ và hợp đồng cả tầng", "Gói cá nhân và gói doanh nghiệp"],
        rows: [
          ["Dữ liệu", "Đồ để trong hộc của ai, ai được mở", "Dữ liệu có dùng để huấn luyện không"],
          ["Chia sẻ", "Mỗi người một chìa hay cả nhóm chung một cổng", "Nhiều người dùng chung thế nào"],
          ["Quản trị", "Ai cấp và thu hồi chìa", "Ai thêm bớt thành viên"],
          ["Khi ai đó nghỉ", "Công ty thu hồi chìa được", "Công ty lấy lại được việc của người đó không"],
        ],
        oneLiner: "Đọc trang gói là hỏi ba điều: dữ liệu của ai, chia sẻ thế nào, ai quản trị.",
      },
      { type: "heading", text: "Ba trục thay vì một bảng giá" },
      {
        type: "paragraph",
        text: "Gói miễn phí dành cho người thử một mình, gói cá nhân cho một người dùng lâu dài, gói doanh nghiệp cho nhóm cần quản lý. Tên gọi và nội dung mỗi nhà cung cấp một khác, nên bạn đừng đoán từ tên. Hãy đọc từng gói theo ba trục: dữ liệu được xử lý thế nào, chia sẻ ra sao, và ai quản trị.",
      },
      {
        type: "flow",
        title: "Từ trang gói đến quyết định",
        steps: [
          { label: "Mở đúng trang của nhà cung cấp", detail: "Đọc trang gói và trang chính sách chính thức, không đọc lại từ bài so sánh của người khác." },
          { label: "Lập bảng ba trục", detail: "Mỗi gói một cột, mỗi trục một dòng. Ô nào trang không nói thì ghi chưa rõ." },
          { label: "Gạch chưa rõ", detail: "Gửi nhà cung cấp hoặc IT những ô chưa rõ, đừng điền bằng suy đoán." },
          { label: "Đối chiếu nhu cầu", detail: "Phòng bạn cần gì: chia sẻ chung không, cần quản lý thành viên không, dữ liệu nào sẽ đưa vào." },
          { label: "Ghi và đề xuất", detail: "Ghi nguồn, ngày đọc và đề xuất gói kèm lý do." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Gói cá nhân",
          text: "Gắn với một người và một email. Công ty không quản lý được ai dùng, không thu hồi được công việc khi người đó nghỉ. Dữ liệu có thể có điều khoản khác gói doanh nghiệp, cần đọc đúng gói.",
        },
        right: {
          label: "Gói doanh nghiệp",
          text: "Gắn với công ty, thường có người quản trị, thêm bớt thành viên và điều khoản dữ liệu riêng. Mỗi nhà cung cấp quy định khác nhau nên phải đọc đúng trang của họ.",
        },
      },
      {
        type: "list",
        items: [
          "Bước 1: mở trang gói và trang chính sách chính thức của nhà cung cấp.",
          "Bước 2: lập bảng ba trục cho từng gói.",
          "Bước 3: ô nào chưa rõ thì hỏi, không điền suy đoán.",
          "Bước 4: ghi nguồn và ngày đọc.",
        ],
      },
      {
        type: "callout",
        label: "Chưa rõ không có nghĩa là được",
        text: "Trang không nói gì về một điều không có nghĩa điều đó được phép hay bị cấm. Ghi chưa rõ, rồi hỏi.",
      },
      {
        type: "scenario",
        title: "Đăng ký cho cả phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp bảo bạn đăng ký công cụ mới cho cả phòng tám người trong tuần này. Bạn đang mở trang gói.",
            choices: [
              { label: "Đăng ký gói cá nhân cho nhanh, cả phòng dùng chung một tài khoản", next: "bad_share" },
              { label: "Lập bảng ba trục cho từng gói và ghi ô nào chưa rõ", next: "s2" },
            ],
          },
          bad_share: {
            text: "Hai tuần sau một bạn nghỉ phép dài và không ai vào được. Thư viện câu lệnh nằm trong tài khoản đó, và không ai biết ai đã nhập dữ liệu gì vào.",
            ending: "bad",
          },
          s2: {
            text: "Bảng cho thấy gói doanh nghiệp có phần quản trị và điều khoản dữ liệu riêng, còn trang không nói rõ thời gian lưu dữ liệu. Sếp hỏi có thể đăng ký luôn được chưa.",
            choices: [
              { label: "Nói chưa rõ vài ô, gửi nhà cung cấp hoặc IT hỏi, kèm bảng và nguồn đã đọc", next: "good" },
              { label: "Điền ô thời gian lưu là 30 ngày vì công cụ khác thường là vậy", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Bạn điền suy đoán vào bảng. Sau đó đồng nghiệp trích con số đó trong đề xuất, và khi đối chiếu với nhà cung cấp thì con số khác.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhận một bảng gọn: điều đã rõ kèm nguồn, ba câu hỏi còn chờ trả lời. Quyết định được hoãn hai ngày nhưng dựa trên sự thật.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập bảng so sánh gói từ tài liệu bạn đưa",
        task: "Bạn có hai đoạn trích từ trang gói của nhà cung cấp và muốn AI xếp vào bảng ba trục. Lắp một prompt để AI chỉ dùng điều bạn đưa vào.",
        parts: [
          {
            id: "source",
            label: "Nguồn",
            options: [
              { text: "So sánh gói cá nhân và gói doanh nghiệp của công cụ này giúp tôi.", feedback: "Không có tài liệu, AI sẽ điền từ trí nhớ, và có thể đúng với phiên bản cũ hoặc của công cụ khác." },
              { text: "Dưới đây là hai đoạn tôi chép từ trang gói chính thức, chỉ dùng hai đoạn này để trả lời.", good: true, feedback: "Giới hạn nguồn vào tài liệu bạn đưa, nên mọi ô đều có thể đối chiếu với đoạn chép." },
            ],
          },
          {
            id: "format",
            label: "Hình dạng kết quả",
            options: [
              { text: "Viết thành một đoạn văn dễ đọc.", feedback: "Đoạn văn trộn ba trục lẫn nhau, khó đối chiếu từng điều." },
              { text: "Lập bảng ba dòng (dữ liệu, chia sẻ, quản trị) và hai cột (hai gói).", good: true, feedback: "Bảng ép AI trả lời đúng ba trục cho từng gói, bạn đối chiếu từng ô được." },
            ],
          },
          {
            id: "gap",
            label: "Khi tài liệu không nói",
            options: [
              { text: "Ô nào thiếu thì điền điều hợp lý nhất.", feedback: "Điều hợp lý nhất chính là điều AI bịa. Bạn sẽ không phân biệt được ô nào có nguồn." },
              { text: "Ô nào đoạn chép không nói thì ghi chưa rõ, không suy đoán.", good: true, feedback: "Ô chưa rõ lộ ra đúng chỗ cần hỏi nhà cung cấp, thay vì bị che bằng suy đoán." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "format", "gap"],
            text: "Dữ liệu: gói cá nhân - theo đoạn chép, có thể dùng để cải thiện dịch vụ; gói doanh nghiệp - có điều khoản riêng. Chia sẻ: gói cá nhân - chưa rõ; gói doanh nghiệp - nhiều thành viên cùng không gian. Quản trị: gói cá nhân - chưa rõ; gói doanh nghiệp - có quản trị thành viên.\n\n(Ô nào không có trong đoạn chép thì ghi chưa rõ, bạn biết chính xác cần hỏi gì.)",
          },
          {
            requires: ["source"],
            text: "Gói cá nhân: dữ liệu có thể dùng cải thiện dịch vụ, chia sẻ hạn chế. Gói doanh nghiệp: bảo mật cao hơn, hỗ trợ ưu tiên.\n\n(Bám vào nguồn nhưng câu còn chung chung, không theo ba trục, và lẫn vài ý như hỗ trợ ưu tiên mà đoạn chép không nói.)",
          },
          {
            text: "Gói cá nhân cho phép xuất dữ liệu sang mọi định dạng và tự xoá sau 30 ngày. Gói doanh nghiệp có chứng nhận bảo mật quốc tế và được hỗ trợ 24/7.\n\n(AI không có tài liệu nên tự điền ba chi tiết cụ thể trông rất thật: 30 ngày, chứng nhận, hỗ trợ 24/7. Không cái nào có trong nguồn bạn đưa.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Đọc gói theo ba trục: dữ liệu, chia sẻ, quản trị. Ô nào chưa rõ thì hỏi.",
          "Bài sau: tính chi phí thật khi dùng cho cả phòng.",
        ],
      },
    ],
  },
  {
    id: 2412,
    slug: "tinh-chi-phi-that-cua-mot-cong-cu-dung-cho-ca-phong",
    title: "Chặng 50, Bài 13: Tính chi phí thật của một công cụ dùng cho cả phòng",
    subtitle: "Báo giá ghi theo người mỗi tháng. Số tiền thật còn tuỳ bao nhiêu người thật sự dùng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Báo giá theo người dùng mỗi tháng nhìn rất nhỏ, nhưng nhân với cả phòng rồi cộng thời gian đào tạo thì con số khác hẳn. Và nếu chỉ ba trong tám người dùng nhiều thì trả tiền cho cả tám là tiền bỏ không. Tính trước năm phút để sếp quyết định bằng con số thật.",
    openingQuestion:
      "Báo giá của một công cụ ghi theo từng người dùng mỗi tháng. Phòng bạn có tám người, nhưng chỉ ba người chắc chắn dùng nhiều. Bạn nên tính tổng chi phí thế nào?",
    openingOptions: [
      "Giá mỗi người nhân với số người thật sự dùng, cộng thời gian đào tạo",
      "Giá mỗi người nhân với cả tám người vì báo giá ghi theo đầu người",
      "Lấy giá của gói rẻ nhất trên trang và không tính thêm khoản nào khác",
      "Chia đều giá cho tám người rồi lấy kết quả làm chi phí cho cả phòng",
    ],
    correctOption: 0,
    explanation:
      "Chi phí thật gồm giá mỗi người nhân với số người thật sự cần, cộng khoản ít người nhớ: thời gian đào tạo và làm quen. Nhân với cả tám người thì tính cả người không dùng, còn lấy giá gói rẻ nhất mà không tính gì khác thì bỏ sót cả phần đào tạo lẫn việc gói rẻ có đủ dùng không. Chia đều giá cho tám người là tính sai phép tính, vì tổng vẫn là giá nhân số người chứ không giảm đi.",
    diagram: [
      { label: "Giá mỗi người mỗi tháng", arrow: true },
      { label: "Nhân số người thật sự dùng", arrow: true },
      { label: "Cộng giờ đào tạo và làm quen", arrow: true },
      { label: "So với giờ làm việc tiết kiệm được" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng vận hành tám người được báo giá theo người mỗi tháng. Khi tính, sếp thấy chỉ ba người có việc lặp lại hằng ngày để dùng công cụ. Họ mua cho ba người trước, đo kết quả sau hai tháng rồi mới quyết định mở rộng. Đây là tình huống minh hoạ, các con số chỉ để hình dung.",
    },
    quiz: [
      q(
        "Báo giá 400 nghìn mỗi người mỗi tháng, phòng mua cho 3 người dùng nhiều. Tổng mỗi tháng là bao nhiêu?",
        "1,2 triệu đồng (= 3 × 400 nghìn)",
        [
          "3,2 triệu đồng (= 8 × 400 nghìn, tính cả người không dùng)",
          "133 nghìn đồng (= 400 nghìn ÷ 3, chia nhầm thay vì nhân)",
          "400 nghìn đồng (chỉ tính một người vì cả phòng dùng chung)",
        ],
        "Chi phí tỷ lệ theo số người mua: 3 người × 400 nghìn = 1,2 triệu. Nhân với 8 là tính cả người không dùng. Chia 400 nghìn cho 3 là nhầm phép tính. Còn tính một người là bỏ hai người vẫn có tài khoản.",
      ),
      q(
        "Ngoài tiền mỗi tháng, khoản nào thường bị bỏ sót khi tính chi phí của công cụ mới?",
        "Giờ đào tạo và làm quen của người dùng",
        [
          "Tiền điện của chiếc máy tính bạn đã dùng sẵn rồi",
          "Tiền thuê một chuyên gia bên ngoài viết câu lệnh mỗi ngày",
          "Chi phí quảng cáo công cụ đó cho khách hàng của công ty",
        ],
        "Giờ đào tạo là chi phí thật: mỗi người mất vài giờ làm quen, tính bằng thời gian làm việc. Tiền điện của máy dùng sẵn không tăng thêm đáng kể, không ai cần chuyên gia viết câu lệnh mỗi ngày, và quảng cáo công cụ cho khách là chuyện không liên quan tới dùng nội bộ.",
      ),
      q(
        "Mỗi người mất 4 giờ làm quen, phòng mua cho 3 người. Giờ đào tạo tổng cộng là bao nhiêu?",
        "12 giờ (= 3 người × 4 giờ)",
        [
          "32 giờ (= 8 người × 4 giờ, tính cả người không mua)",
          "7 giờ (= 3 + 4, cộng thay vì nhân)",
          "4 giờ (vì cả nhóm học chung nên chỉ tính một lần)",
        ],
        "Mỗi người tự làm quen nên giờ đào tạo nhân theo số người: 3 × 4 = 12 giờ. Nhân với 8 tính thêm người không dùng, 3 + 4 là cộng nhầm, và học chung không làm mỗi người bớt giờ của mình.",
      ),
      q(
        "Công cụ tiết kiệm mỗi người 2 giờ mỗi tuần. Cách so sánh hợp lý với chi phí là gì?",
        "Quy giờ tiết kiệm ra tiền theo lương giờ rồi so với tổng chi phí",
        [
          "So số giờ tiết kiệm với số người trong phòng",
          "Chỉ nhìn việc cả phòng có thấy công cụ hay hay không",
          "So giá tháng này với giá tháng đầu tiên của chính công cụ",
        ],
        "Muốn so giờ với tiền thì phải quy về cùng đơn vị, thường là lương giờ. So số giờ với số người là hai đơn vị khác nhau. Cảm giác hay thì chưa phải con số. Và giá tháng này so với tháng đầu không nói gì về việc có đáng hay không.",
      ),
      q(
        "Tính toán của bạn dùng giờ tiết kiệm do người bán hứa. Cách xử lý nào đúng?",
        "Dùng con số do chính nhóm đo được khi thí điểm, ghi rõ đó là ước tính",
        [
          "Dùng đúng số người bán hứa vì họ hiểu công cụ của họ nhất",
          "Bỏ phần tiết kiệm đi và chỉ so chi phí với chi phí",
          "Tăng số người bán hứa lên gấp đôi cho đủ an toàn",
        ],
        "Giờ tiết kiệm thật chỉ đo được từ việc thật của nhóm bạn, nên lấy từ thí điểm và ghi rõ là ước tính. Số người bán hứa có lợi ích riêng. Bỏ phần tiết kiệm thì không còn gì để so, và tăng gấp đôi chỉ là thêm một con số không có căn cứ.",
      ),
    ],
    keyTakeaways: [
      "Tổng chi phí = giá mỗi người x số người thật sự dùng.",
      "Cộng giờ đào tạo: nhân giờ làm quen với số người.",
      "Quy giờ tiết kiệm ra tiền bằng lương giờ để so cùng đơn vị.",
      "Giờ tiết kiệm lấy từ thí điểm của nhóm, không lấy từ lời hứa.",
      "Mua trước cho người dùng nhiều, mở rộng sau khi có số.",
    ],
    practicePrompt: {
      question:
        "Giá 500 nghìn mỗi người mỗi tháng. Phòng có 6 người, 2 người dùng nhiều. Tổng chi phí hợp lý để báo sếp lúc bắt đầu là bao nhiêu?",
      options: [
        "1 triệu mỗi tháng (= 2 x 500 nghìn), kèm giờ đào tạo",
        "3 triệu mỗi tháng (= 6 x 500 nghìn), vì cả phòng đều có thể cần dùng",
        "250 nghìn mỗi tháng (= 500 nghìn chia 2 người dùng nhiều)",
        "500 nghìn mỗi tháng, vì báo giá ghi một con số duy nhất trên trang",
      ],
      correct: 0,
      explanation:
        "Hai người dùng nhiều nhân giá 500 nghìn là 1 triệu, cộng giờ đào tạo của hai người. Nhân với 6 tính cả người chưa cần. Chia 500 nghìn cho 2 là nhầm phép chia. Và một con số trên trang là giá mỗi người, chưa phải tổng.",
    },
    summary: {
      keyIdea: "Chi phí thật là giá nhân số người thật sự dùng, cộng giờ đào tạo, so với giờ tiết kiệm đo được.",
      formula: "Tổng = giá x số người + giờ đào tạo x số người x lương giờ.",
      commonMistake: "Nhân giá với cả phòng hoặc chỉ nhìn giá tháng mà quên giờ làm quen.",
      action: "Tính hai phương án (cả phòng và chỉ người dùng nhiều) rồi đưa cả hai cho sếp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ phòng bạn đang cân nhắc. Lấy giá mỗi người từ báo giá, đếm số người thật sự có việc lặp lại để dùng. Ước giờ làm quen mỗi người. Tính hai dòng: mua cho cả phòng và mua cho người dùng nhiều, rồi ghi chênh lệch cả tháng.",
      secondary: "Hỏi một đồng nghiệp xem giờ làm quen họ ước có khớp với bạn không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp hỏi công cụ này tốn bao nhiêu mỗi tháng. Trang báo giá ghi một con số trông rất nhỏ. Bài này là năm phút tính để con số bạn đưa sếp là con số thật.",
      },
      {
        type: "feynman",
        title: "Tính chi phí công cụ đơn giản hơn bạn nghĩ",
        intro: "Giống như thuê bàn trong quán cà phê làm việc: giá ghi theo ghế mỗi tháng, nhưng bạn chỉ thuê cho những người thật sự ngồi làm việc ở đó, chứ không thuê cho cả phòng.",
        columns: ["Khoản", "Thuê ghế quán cà phê", "Mua công cụ"],
        rows: [
          ["Giá ghi", "Theo ghế, mỗi tháng", "Theo người dùng, mỗi tháng"],
          ["Ai cần trả", "Người thật sự đến ngồi", "Người thật sự dùng"],
          ["Khoản ít ai nhớ", "Thời gian đi lại, làm quen chỗ ngồi", "Giờ đào tạo, làm quen"],
          ["Có đáng không", "So với làm việc ở chỗ cũ", "So giờ tiết kiệm đo được với tổng chi phí"],
        ],
        oneLiner: "Trả cho số người thật sự dùng, cộng thời gian làm quen, rồi so với giờ tiết kiệm.",
      },
      { type: "heading", text: "Một phép tính hai dòng" },
      {
        type: "paragraph",
        text: "Dòng một: giá mỗi người nhân số người thật sự dùng. Dòng hai: giờ làm quen của mỗi người, nhân số người, nhân lương giờ. Cộng hai dòng là chi phí tháng đầu. Tháng sau, dòng hai gần như bằng không, nên chi phí ổn định là dòng một.",
      },
      {
        type: "chart",
        title: "Chi phí hằng tháng theo số người dùng công cụ",
        caption: "Số liệu minh hoạ: giá mỗi người do bạn kéo theo báo giá thật của công cụ bạn cân nhắc. Đường trên là mua cho mọi người trong phòng, đường dưới là chỉ mua cho số người dùng nhiều. Khoảng cách giữa hai đường là phần tiền có thể tiết kiệm.",
        kind: "line",
        xLabel: "Số người trong phòng",
        yLabel: "Chi phí mỗi tháng (nghìn đồng)",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "price", label: "Giá mỗi người mỗi tháng", min: 50, max: 1000, step: 50, value: 400, unit: "nghìn" },
          { id: "heavy", label: "Số người dùng nhiều", min: 1, max: 10, step: 1, value: 3, unit: "người" },
        ],
        series: [
          { label: "Mua cho cả phòng", expr: "x * price" },
          { label: "Mua cho người dùng nhiều", expr: "min(x, heavy) * price" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mua cho cả phòng",
          text: "Đơn giản, ai cũng có tài khoản. Nhưng tính cả người chưa có việc lặp lại để dùng, và tiền bỏ không tăng theo số người.",
        },
        right: {
          label: "Mua cho người dùng nhiều trước",
          text: "Rẻ hơn, đo được kết quả thật trước khi mở rộng. Cần có tiêu chí chọn ai và điều kiện mở thêm.",
        },
      },
      {
        type: "list",
        items: [
          "Bước 1: lấy giá mỗi người từ báo giá chính thức, ghi ngày.",
          "Bước 2: đếm số người thật sự có việc lặp lại để dùng.",
          "Bước 3: ước giờ làm quen mỗi người và quy ra tiền.",
          "Bước 4: so với giờ tiết kiệm đo được khi thí điểm.",
        ],
      },
      {
        type: "callout",
        label: "Giờ tiết kiệm phải đo, không nghe hứa",
        text: "Con số giờ tiết kiệm do người bán đưa ra là con số của họ. Số có giá trị với sếp là số nhóm bạn đo được trên việc thật.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn bảng tính chi phí để gửi sếp",
        task: "Bạn có các số: giá 400 nghìn mỗi người mỗi tháng, phòng 8 người, 3 người dùng nhiều, mỗi người mất 4 giờ làm quen. Lắp một prompt để AI soạn bảng chi phí.",
        parts: [
          {
            id: "numbers",
            label: "Con số",
            options: [
              { text: "Tính giúp tôi chi phí công cụ này cho phòng.", feedback: "Không có con số nào, AI sẽ tự đặt giá và số người." },
              { text: "Giá 400 nghìn mỗi người mỗi tháng; phòng 8 người, 3 người dùng nhiều; mỗi người 4 giờ làm quen.", good: true, feedback: "Có đủ dữ kiện, AI chỉ việc sắp xếp, còn con số là của bạn." },
            ],
          },
          {
            id: "scenarios",
            label: "Phương án",
            options: [
              { text: "Chỉ tính cho cả phòng.", feedback: "Một phương án thì sếp không có gì để so, và che mất khoản tiết kiệm khi chỉ mua cho người dùng nhiều." },
              { text: "Lập hai dòng: mua cho cả 8 người và mua cho 3 người dùng nhiều, ghi rõ phép nhân.", good: true, feedback: "Hai phương án kèm phép nhân cho phép sếp so và bạn kiểm lại từng số." },
            ],
          },
          {
            id: "check",
            label: "Kiểm tra",
            options: [
              { text: "Làm tròn cho đẹp và đưa kết quả luôn.", feedback: "Làm tròn mà không ghi lại khiến bạn không đối chiếu được với báo giá." },
              { text: "Ghi rõ mọi phép tính và đánh dấu số nào do tôi ước, số nào lấy từ báo giá.", good: true, feedback: "Phân biệt số ước và số báo giá, nên sếp biết chỗ nào còn cần đo thêm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["numbers", "scenarios", "check"],
            text: "Phương án A, mua cho 8 người: 8 x 400 nghìn = 3,2 triệu mỗi tháng; đào tạo 8 x 4 = 32 giờ (số ước).\nPhương án B, mua cho 3 người: 3 x 400 nghìn = 1,2 triệu mỗi tháng; đào tạo 3 x 4 = 12 giờ (số ước).\nChênh lệch: 2 triệu mỗi tháng. Giá lấy từ báo giá; giờ làm quen là ước tính của tôi.",
          },
          {
            requires: ["numbers"],
            text: "Chi phí khoảng 3,2 triệu mỗi tháng cho cả phòng. Đào tạo mất thêm một ít thời gian.\n\n(Có con số nhưng chỉ một phương án, không ghi phép tính, và đào tạo chưa có con số cụ thể.)",
          },
          {
            text: "Công cụ này thường có giá khoảng 500 nghìn mỗi người, cả phòng 10 người hết 5 triệu, và giảm 15% khi đăng ký theo năm.\n\n(AI không có dữ kiện nên tự đặt giá, số người và mức giảm, không cái nào có trong báo giá của bạn.)",
          },
        ],
      },
      { type: "heading", text: "Thử trên một quyết định giả định" },
      {
        type: "scenario",
        title: "Sếp hỏi chi phí cho cả phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: nếu dùng công cụ này cho phòng tám người thì mỗi tháng hết bao nhiêu. Bạn mở báo giá, thấy giá theo người.",
            choices: [
              { label: "Trả lời luôn giá một người vì đó là con số trên trang", next: "bad_one" },
              { label: "Tính hai phương án (cả phòng, người dùng nhiều) kèm giờ đào tạo", next: "s2" },
            ],
          },
          bad_one: {
            text: "Sếp duyệt với chi phí nhỏ. Khi hoá đơn về, con số gấp nhiều lần và sếp hỏi vì sao bạn không nói từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Bảng cho thấy mua cho ba người dùng nhiều rẻ hơn hẳn. Sếp hỏi bạn có chắc công cụ tiết kiệm đủ giờ không.",
            choices: [
              { label: "Nói công cụ tiết kiệm nhiều giờ vì nhà cung cấp cam kết như vậy", next: "bad_promise" },
              { label: "Đề xuất thí điểm hai tuần, đo giờ tiết kiệm trên việc thật rồi quyết định", next: "good" },
            ],
          },
          bad_promise: {
            text: "Sếp dựa vào lời hứa để duyệt. Ba tháng sau, nhóm đo được giờ tiết kiệm thấp hơn nhiều so với hứa và chi phí không còn hợp lý.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý mua cho ba người trước. Hai tuần sau bạn có số giờ đo được trên việc thật, và quyết định mở rộng dựa vào chúng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giá nhân số người thật sự dùng, cộng giờ đào tạo, so với giờ tiết kiệm đo được.",
          "Bài sau: vì sao công cụ dùng một tuần rồi bỏ, và cách gắn nó vào việc có sẵn.",
        ],
      },
    ],
  },
  {
    id: 2413,
    slug: "cong-cu-dung-mot-tuan-roi-bo-vi-sao-thoi-quen-khong-bam",
    title: "Chặng 50, Bài 14: Công cụ dùng một tuần rồi bỏ: vì sao thói quen không bám",
    subtitle: "Mua thẻ tập gym tháng một rồi tháng ba không ai đi: lý do gần giống nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều công cụ được mua rồi nằm đó vì không ai gắn nó vào việc có sẵn. Hiểu vì sao thói quen không bám giúp bạn đề xuất cách dùng nhỏ và cụ thể, thay vì đợi mọi người tự nhớ dùng.",
    openingQuestion:
      "Cả phòng hào hứng dùng công cụ mới tuần đầu, tuần thứ ba thì mọi người quay lại cách cũ. Nguyên nhân thường gặp nhất là gì?",
    openingOptions: [
      "Công cụ chưa được gắn vào một việc có sẵn mà mọi người làm mỗi tuần",
      "Công cụ quá kém nên không ai muốn dùng nữa dù đã thử kỹ trong tuần đầu",
      "Mọi người lười học, nên chỉ cần nhắc nhiều hơn là họ sẽ tự dùng trở lại",
      "Cần mua thêm gói đắt hơn để có thêm tính năng mà mọi người còn thiếu",
    ],
    correctOption: 0,
    explanation:
      "Hào hứng tuần đầu là chuyện bình thường, nhưng thói quen chỉ bám khi công cụ nằm ngay trong việc có sẵn, ví dụ cuộc họp giao ban thứ Hai hay báo cáo cuối tuần. Kết luận công cụ kém hay mọi người lười là đổ lỗi chưa kiểm chứng, còn mua gói đắt hơn thì giải quyết một vấn đề mà nhóm chưa xác định. Nhắc nhiều hơn chỉ làm mọi người thêm mệt.",
    diagram: [
      { label: "Hào hứng tuần đầu, dùng tự do", arrow: true },
      { label: "Không gắn vào việc có sẵn", arrow: true },
      { label: "Việc gấp quay lại cách cũ", arrow: true },
      { label: "Gắn vào một việc lặp lại cố định để thói quen bám" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm chăm sóc khách hàng thử công cụ soạn nháp thư trả lời, tuần đầu ai cũng dùng. Đến tuần ba chỉ còn một người. Trưởng nhóm đổi cách: mỗi sáng thứ Hai, nhóm soạn nháp ba thư khó nhất của tuần bằng công cụ, rồi cùng xem. Tình huống minh hoạ, điều cần học là gắn công cụ vào một buổi có sẵn.",
    },
    quiz: [
      q(
        "Vì sao thói quen dùng công cụ mới thường tan sau tuần đầu?",
        "Công cụ không nằm trong một việc có sẵn, nên khi bận mọi người quay lại cách cũ",
        [
          "Công cụ mới luôn kém hơn cách làm cũ",
          "Trí nhớ con người chỉ giữ được thói quen trong bảy ngày",
          "Nhân viên nào cũng ghét thay đổi nên bỏ ngay khi có dịp",
        ],
        "Khi bận, người ta làm theo cách có sẵn trong đầu. Công cụ mới chưa gắn vào việc nào thì không nằm trong luồng đó. Các câu còn lại là khẳng định chung không có căn cứ: công cụ không luôn kém, bảy ngày không phải giới hạn của trí nhớ, và không ai ghét thay đổi nói chung.",
      ),
      q(
        "Cách nào gắn công cụ vào việc có sẵn?",
        "Dùng nó để soạn nháp ngay trong buổi họp giao ban thứ Hai hằng tuần",
        [
          "Gửi email nhắc cả nhóm dùng công cụ mỗi ngày, kèm bảng theo dõi ai đã dùng ai chưa",
          "Dán nhãn dùng công cụ lên bàn làm việc của từng người",
          "Đặt mục tiêu cả phòng dùng công cụ càng nhiều càng tốt",
        ],
        "Gắn vào việc có sẵn nghĩa là có một việc cụ thể, lặp lại cố định, dùng công cụ làm một bước. Email nhắc và nhãn dán là nhắc nhở, không đổi việc. Mục tiêu dùng càng nhiều càng tốt không nói dùng vào việc gì.",
      ),
      q(
        "Thống kê sau tuần ba: 8 người có tài khoản, 2 người còn dùng. Tỷ lệ còn dùng là bao nhiêu?",
        "25% (= 2 ÷ 8)",
        [
          "75% (= 6 ÷ 8, tính nhầm người bỏ thành người dùng)",
          "4% (= 1 ÷ 25)",
          "40% (= 2 ÷ 5, nhầm mẫu số)",
        ],
        "Tỷ lệ còn dùng là 2 trên 8 người, tức 25%. 75% là tỷ lệ người đã bỏ. Hai con số còn lại không có phép chia nào tương ứng với số liệu đề bài.",
      ),
      q(
        "Điều gì nên làm khi phát hiện công cụ bị bỏ sau hai tuần?",
        "Hỏi từng người việc nào họ quay lại làm theo cách cũ và vì sao",
        [
          "Mua thêm gói mới để có nhiều tính năng hơn, rồi yêu cầu cả nhóm dùng thử lần nữa",
          "Yêu cầu mọi người báo cáo mỗi ngày đã dùng công cụ chưa",
          "Kết luận công cụ không phù hợp rồi dừng hẳn việc thử",
        ],
        "Việc nào họ quay lại làm cách cũ và vì sao là dữ kiện cho biết công cụ thiếu chỗ nào. Mua thêm gói khi chưa biết thiếu gì là đoán. Báo cáo mỗi ngày làm thêm việc. Dừng hẳn bỏ phí phần công cụ có thể đã hợp.",
      ),
      q(
        "Một bước nhỏ nào giúp người mới bắt đầu dùng công cụ dễ hơn?",
        "Cho họ một mẫu câu lệnh đã chạy được cho việc họ làm mỗi tuần",
        [
          "Gửi tài liệu giới thiệu đầy đủ mọi tính năng của công cụ cho cả nhóm đọc",
          "Cử người hướng dẫn chung trong một buổi dài ba giờ",
          "Để họ tự khám phá cho tới khi thấy hợp",
        ],
        "Mẫu câu lệnh cho việc cụ thể giảm bước bắt đầu xuống còn dán và sửa. Tài liệu đầy đủ mọi tính năng làm người mới choáng, buổi dài ba giờ nhiều thông tin khó nhớ, còn tự khám phá nghĩa là đợi người có thời gian dư.",
      ),
    ],
    keyTakeaways: [
      "Hào hứng tuần đầu không phải dấu hiệu thói quen sẽ bám.",
      "Thói quen bám khi công cụ nằm trong một việc lặp lại cố định.",
      "Đừng kết luận công cụ kém hay mọi người lười khi chưa hỏi.",
      "Hỏi từng người việc nào họ quay lại làm cách cũ.",
      "Một mẫu câu lệnh chạy được cho việc cụ thể là bước khởi đầu nhỏ nhất.",
    ],
    practicePrompt: {
      question:
        "Công cụ mới được thử ở phòng bạn, sau hai tuần chỉ còn một người dùng. Bước tiếp theo hợp lý nhất là gì?",
      options: [
        "Hỏi từng người việc nào họ quay lại cách cũ rồi gắn công cụ vào một việc cụ thể",
        "Mua gói cao hơn vì tính năng hiện tại chắc chắn chưa đủ cho nhu cầu thật của phòng",
        "Nhắn cả nhóm mỗi sáng để nhắc dùng công cụ, rồi theo dõi xem ai chưa dùng",
        "Dừng thử và quay lại hoàn toàn cách làm cũ vì đã chứng minh công cụ không hợp",
      ],
      correct: 0,
      explanation:
        "Hỏi từng người cho biết công cụ vướng ở đâu, còn gắn vào một việc cụ thể đưa nó vào luồng việc có sẵn. Mua gói cao hơn là giả định chưa kiểm chứng, nhắc hằng sáng tăng áp lực mà không đổi việc, và dừng hẳn kết luận quá sớm từ hai tuần.",
    },
    summary: {
      keyIdea: "Thói quen không bám vì công cụ chưa nằm trong việc có sẵn, không phải vì công cụ kém hay người lười.",
      formula: "Một việc lặp lại + một mẫu câu lệnh + một buổi cố định = thói quen bám.",
      commonMistake: "Nhắc mọi người dùng công cụ thay vì đổi một việc cụ thể để nó nằm trong đó.",
      action: "Chọn một việc lặp lại hằng tuần của bạn và quyết định công cụ làm bước nào trong đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lặp lại hằng tuần của bạn (báo cáo tuần, email tồn, biên bản họp). Viết ra bốn bước của việc đó, khoanh bước nào công cụ AI làm nháp được. Soạn một mẫu câu lệnh cho bước đó, chạy thử một lần trên tài liệu của bạn, và đặt lịch cố định cho tuần sau.",
      secondary: "Hỏi một đồng nghiệp xem họ bỏ công cụ nào gần đây và việc gì khiến họ quay lại cách cũ.",
    },
    sections: [
      {
        type: "lead",
        text: "Tuần đầu cả nhóm chat rộ lên về công cụ mới. Tuần ba, bạn mở nhóm chat và không ai nhắc tới nó nữa. Bài này nói vì sao, và làm gì để lần sau thói quen bám.",
      },
      {
        type: "feynman",
        title: "Vì sao thói quen không bám đơn giản hơn bạn nghĩ",
        intro: "Bạn mua thẻ tập gym đầu năm và hăng hái tuần đầu. Sang tháng ba thì thẻ nằm trong ví. Lý do không phải bạn lười: buổi tập không gắn vào việc có sẵn của ngày, nên khi bận thì nó bị bỏ đầu tiên.",
        columns: ["Điều cần có", "Thói quen tập gym", "Thói quen dùng công cụ"],
        rows: [
          ["Một việc có sẵn", "Đi làm về là qua phòng tập", "Họp giao ban thứ Hai là soạn nháp"],
          ["Bắt đầu nhỏ", "Tập mười phút, không đợi đủ một giờ", "Dán mẫu câu lệnh, sửa một chỗ"],
          ["Lịch cố định", "Thứ hai, tư, sáu", "Sáng thứ Hai hằng tuần"],
          ["Cách đo", "Đếm số buổi", "Đếm số việc đã dùng công cụ"],
        ],
        oneLiner: "Thói quen bám khi nó nằm trong việc có sẵn, không phải khi ta nhắc.",
      },
      { type: "heading", text: "Ba nguyên nhân hay gặp" },
      {
        type: "paragraph",
        text: "Một: công cụ chưa gắn vào việc nào cố định, nên khi bận thì quay lại cách cũ. Hai: bước khởi đầu quá lớn, mỗi lần dùng phải nghĩ câu lệnh từ đầu. Ba: không ai đo, nên không ai biết công cụ có giúp hay không. Cả ba đều sửa được mà không cần đổi công cụ.",
      },
      {
        type: "flow",
        title: "Từ hào hứng tuần đầu tới thói quen",
        steps: [
          { label: "Chọn một việc lặp lại", detail: "Chọn việc xảy ra mỗi tuần và tốn thời gian: báo cáo tuần, email tồn, biên bản họp." },
          { label: "Chọn bước công cụ làm", detail: "Khoanh đúng một bước có thể làm nháp, ví dụ soạn nháp lần đầu, còn người vẫn duyệt." },
          { label: "Viết mẫu câu lệnh", detail: "Một mẫu chạy được, người khác dán và sửa là dùng được." },
          { label: "Đặt buổi cố định", detail: "Gắn vào một buổi có sẵn, ví dụ sáng thứ Hai, để không phụ thuộc vào việc nhớ." },
          { label: "Đo và xem lại", detail: "Sau hai tuần đếm số việc đã dùng và hỏi ai quay lại cách cũ vì sao." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhắc nhở",
          text: "Gửi email nhắc, dán nhãn, đặt mục tiêu dùng nhiều. Mọi người chỉ thêm một việc phải nhớ và thường bỏ sau vài tuần.",
        },
        right: {
          label: "Gắn vào việc có sẵn",
          text: "Đổi một bước trong việc đã làm mỗi tuần. Không cần nhớ thêm vì công cụ nằm sẵn trong luồng việc.",
        },
      },
      {
        type: "list",
        items: [
          "Chọn một việc lặp lại, không chọn cả công việc.",
          "Chọn một bước, không chọn mọi bước.",
          "Viết sẵn một mẫu câu lệnh cho bước đó.",
          "Đặt vào một buổi cố định, rồi hỏi người quay lại cách cũ vì sao.",
        ],
      },
      {
        type: "callout",
        label: "Đừng vội đổ lỗi",
        text: "Công cụ kém hay người lười là hai kết luận dễ nhất và ít được kiểm chứng nhất. Hỏi trước: việc nào họ quay lại làm theo cách cũ, và vì sao.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản phân tích nguyên nhân do AI viết",
        task: "Bạn nhờ AI phân tích vì sao nhóm bỏ công cụ. Ghi chú thật của bạn chỉ có: tám người có tài khoản, hai người còn dùng ở tuần ba, ba người nói họ quên dùng vì đang bận, chưa ai hỏi vì sao những người còn lại bỏ. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Sau ba tuần, hai trong tám người vẫn còn dùng công cụ." },
          { text: "Ba người cho biết họ quên dùng vì đang bận." },
          {
            text: "Theo khảo sát, 80% nhân viên văn phòng bỏ công cụ mới trong tháng đầu.",
            error: "Không có khảo sát nào trong ghi chú của bạn. Con số 80% là AI bịa cho nghe có sức nặng.",
          },
          {
            text: "Nguyên nhân chính là công cụ khó dùng.",
            error: "Ghi chú nói ba người quên vì bận và chưa ai hỏi những người còn lại. Kết luận công cụ khó dùng chưa có nguồn nào ủng hộ.",
          },
          {
            text: "Việc tiếp theo là hỏi từng người việc nào họ quay lại làm cách cũ.",
          },
          {
            text: "Phòng marketing ở công ty bên cạnh đã thử cách này và tăng hiệu quả gấp đôi.",
            error: "Không có phòng hay công ty nào trong ghi chú. Đây là ví dụ AI bịa, và hiệu quả gấp đôi cũng không có nguồn.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tuần ba, công cụ đang bị bỏ",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng thứ Hai tuần ba, bạn thấy chỉ còn hai trong tám người mở công cụ. Sếp hỏi bạn tính sao.",
            choices: [
              { label: "Nhắn cả nhóm mỗi sáng nhắc dùng công cụ và theo dõi ai chưa dùng", next: "bad_remind" },
              { label: "Hỏi từng người việc nào họ quay lại cách cũ rồi chọn một việc để gắn công cụ vào", next: "s2" },
            ],
          },
          bad_remind: {
            text: "Nhóm bắt đầu trả lời cho có, rồi thấy phiền. Sau hai tuần nhắc nhở, số người thật sự dùng vẫn không tăng và bạn mất thiện cảm của cả nhóm.",
            ending: "bad",
          },
          s2: {
            text: "Hai người nói họ quay lại cách cũ khi viết email tồn sáng thứ Hai vì cần làm nhanh và không nhớ câu lệnh. Bạn có thể đề xuất một cách.",
            choices: [
              { label: "Gắn công cụ vào đúng việc email tồn sáng thứ Hai và gửi sẵn một mẫu câu lệnh", next: "good" },
              { label: "Tổ chức buổi đào tạo ba giờ về mọi tính năng của công cụ", next: "bad_train" },
            ],
          },
          bad_train: {
            text: "Buổi đào tạo dài và chung, mọi người nghe nhiều tính năng nhưng tuần sau vẫn làm email tồn theo cách cũ vì vẫn không có mẫu sẵn.",
            ending: "bad",
          },
          good: {
            text: "Sáng thứ Hai tuần sau, sáu trong tám người dùng mẫu câu lệnh để soạn nháp email tồn. Bạn hỏi lại cuối tuần xem ai còn vướng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Gắn công cụ vào một việc có sẵn, một buổi cố định, một mẫu câu lệnh.",
          "Bài sau, mini dự án: lập kế hoạch thí điểm nhỏ hai tuần, hai người, một việc.",
        ],
      },
    ],
  },
  {
    id: 2414,
    slug: "du-an-thi-diem-nho-hai-tuan-hai-nguoi-mot-viec",
    title: "Chặng 50, Bài 15: Mini dự án: thí điểm nhỏ hai tuần, hai người, một việc",
    subtitle: "Trước khi mua cả lô áo, người ta thử một cỡ áo cho hai người mặc hai tuần.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mua cho cả phòng khi chưa chắc công cụ hợp thì tốn tiền và mất lòng tin. Một thí điểm giới hạn cho bạn số thật để nói chuyện với sếp, và cho sếp một quyết định nhỏ dễ đồng ý thay vì một quyết định lớn dễ từ chối.",
    openingQuestion:
      "Bạn muốn sếp duyệt một công cụ mới. Cách đề xuất nào có nhiều khả năng được đồng ý và cho kết quả đáng tin nhất?",
    openingOptions: [
      "Thí điểm hai tuần cho hai người làm một việc, có mốc dừng và cách đo",
      "Mua cho cả phòng ngay để mọi người bắt đầu dùng cùng lúc, đỡ phải thử nhiều lần",
      "Gửi bài báo khen công cụ cho sếp đọc và chờ sếp tự quyết định mua luôn",
      "Nói công cụ rất tốt vì nhiều công ty khác đang dùng rồi xin sếp duyệt mua",
    ],
    correctOption: 0,
    explanation:
      "Thí điểm nhỏ cho sếp một quyết định dễ đồng ý: rủi ro giới hạn trong hai người, hai tuần và một việc, và mốc dừng báo trước khi nào xem lại. Có cách đo nên kết quả là số chứ không phải cảm giác. Mua cho cả phòng là quyết định lớn chưa có số liệu. Bài báo khen và nhiều công ty khác dùng đều là ý kiến của người khác, không phải kết quả trên việc thật của bạn.",
    diagram: [
      { label: "Một việc lặp lại, hai người thử", arrow: true },
      { label: "Hai tuần và mốc dừng định trước", arrow: true },
      { label: "Đo trước và sau, dữ liệu giả hoặc đã duyệt", arrow: true },
      { label: "Xem lại cùng sếp và quyết định tiếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng kế toán muốn thử công cụ tóm tắt email nhà cung cấp. Thay vì mua cho cả phòng, hai người thử trên một việc, hai tuần, bằng email đã xoá thông tin nhạy cảm theo chính sách công ty. Họ đo số phút soạn mỗi email trước và sau. Tình huống minh hoạ: điều cần học là khung thí điểm nhỏ.",
    },
    quiz: [
      q(
        "Một bản đề xuất thí điểm tốt cần có điều gì ngay từ đầu?",
        "Mốc dừng và cách đo được định trước, rồi mới bắt đầu thử",
        [
          "Một khoản ngân sách lớn để mua dư công cụ",
          "Danh sách tất cả những người trong công ty đều muốn thử công cụ",
          "Lời cam kết công cụ sẽ tiết kiệm nhiều giờ mỗi tuần",
        ],
        "Mốc dừng và cách đo định từ trước khiến kết quả thí điểm so sánh được, và không bị bẻ theo cảm giác sau đó. Ngân sách lớn, danh sách dài hay lời cam kết đều là điều ngược với tinh thần thí điểm nhỏ.",
      ),
      q(
        "Vì sao nên chọn chỉ một việc cho thí điểm thay vì nhiều việc?",
        "Kết quả thay đổi là do công cụ, không bị lẫn với nhiều yếu tố khác",
        [
          "Vì công cụ AI chỉ làm được duy nhất một việc",
          "Vì nhiều việc thì sếp sẽ không có thời gian đọc hết báo cáo kết quả",
          "Vì làm một việc thì chắc chắn thành công",
        ],
        "Một việc giúp thấy rõ khác biệt trước và sau do công cụ. Công cụ AI không bị giới hạn một việc, báo cáo dài hay ngắn là chuyện khác, và chọn một việc không đảm bảo thành công.",
      ),
      q(
        "Thí điểm đo: trước dùng công cụ mỗi email mất 15 phút, sau mất 9 phút. Tiết kiệm được bao nhiêu phần trăm?",
        "40% (= (15 − 9) ÷ 15)",
        [
          "60% (= 9 ÷ 15)",
          "6% (= 15 − 9)",
          "67% (= (15 − 9) ÷ 9, chia cho thời gian sau)",
        ],
        "Phần trăm tiết kiệm = (trước − sau) ÷ trước = 6 ÷ 15 = 40%. 60% là tỷ lệ thời gian còn lại, 6% nhầm đơn vị phút thành phần trăm, và 67% chia cho thời gian sau thay vì thời gian trước.",
      ),
      q(
        "Hai tuần sau, kết quả thí điểm chưa rõ ràng: tiết kiệm ít, chưa biết vì sao. Bạn nên làm gì?",
        "Báo cáo đúng số đo được, nói rõ chưa kết luận và đề xuất kéo dài có mốc mới",
        [
          "Làm tròn số lên cho kết quả đẹp hơn rồi gửi sếp",
          "Không báo cáo gì vì thí điểm chưa thành công thì không cần nói",
          "Kết luận công cụ hiệu quả vì đã dùng hai tuần",
        ],
        "Báo cáo trung thực số đo được giữ lòng tin của sếp và cho phép quyết định tiếp trên sự thật. Làm tròn số lên là sai lệch, im lặng mất cơ hội học hỏi, và kết luận hiệu quả từ việc đã dùng hai tuần không dựa vào số đo nào.",
      ),
      q(
        "Việc nào nên làm trước khi thí điểm dùng tài liệu công ty với công cụ mới?",
        "Hỏi IT công cụ đã được duyệt chưa, và dùng dữ liệu đã duyệt hoặc dữ liệu giả",
        [
          "Dán tài liệu thật vì thí điểm nhỏ thì rủi ro cũng nhỏ",
          "Chỉ xin sếp duyệt miệng trước, còn phía IT sẽ được báo sau khi thí điểm đã chạy xong rồi",
          "Dùng tài khoản cá nhân của hai người thử để khỏi phải xin phép",
        ],
        "Thí điểm nhỏ vẫn là gửi dữ liệu ra ngoài nếu dán tài liệu thật. Sếp duyệt miệng không thay cho IT, và dùng tài khoản cá nhân đẩy dữ liệu ra xa tầm kiểm soát hơn. Hỏi IT và dùng dữ liệu đã duyệt hoặc giả mới đúng.",
      ),
    ],
    keyTakeaways: [
      "Thí điểm nhỏ: hai người, hai tuần, một việc.",
      "Định trước mốc dừng và cách đo, rồi mới bắt đầu.",
      "Đo trước và sau trên cùng một việc.",
      "Báo cáo đúng số đo được, kể cả khi kết quả chưa rõ.",
      "Hỏi IT trước khi đưa tài liệu công ty vào công cụ.",
    ],
    practicePrompt: {
      question:
        "Bạn viết kế hoạch thí điểm. Phần nào là quan trọng nhất để sếp dễ đồng ý?",
      options: [
        "Một việc, hai người, hai tuần, mốc dừng và cách đo",
        "Danh sách mọi tính năng của công cụ và cách chúng giúp cả công ty làm việc tốt hơn",
        "Lời hứa rằng thí điểm chắc chắn thành công và tiết kiệm nhiều giờ mỗi tuần cho phòng",
        "Đề xuất mua gói cho cả phòng ngay sau khi thí điểm xong, kèm kế hoạch triển khai chi tiết",
      ],
      correct: 0,
      explanation:
        "Phạm vi nhỏ và giới hạn rõ khiến quyết định dễ đồng ý, còn cách đo cho kết quả có số. Danh sách tính năng không nói gì về việc của phòng. Lời hứa thành công là điều chưa có bằng chứng, và đề xuất mua luôn cho cả phòng biến thí điểm thành quyết định lớn.",
    },
    summary: {
      keyIdea: "Thí điểm nhỏ cho sếp quyết định dễ đồng ý và cho bạn số thật.",
      formula: "Một việc + hai người + hai tuần + mốc dừng + cách đo = kế hoạch thí điểm.",
      commonMistake: "Đề xuất mua cho cả phòng khi chưa có số đo trên việc thật.",
      action: "Viết kế hoạch thí điểm một trang cho một công cụ bạn muốn thử.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một trang kế hoạch thí điểm cho một công cụ bạn muốn thử: việc nào, hai ai, hai tuần từ ngày nào, mốc dừng (nếu tiết kiệm dưới mức bao nhiêu thì dừng), cách đo (số phút mỗi lần trước và sau), dữ liệu nào được dùng và IT đã duyệt chưa. Lưu thành file trên máy bạn.",
      secondary: "Gửi bản nháp cho một đồng nghiệp và hỏi họ thấy thiếu gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã đọc chính sách, so sánh gói, tính chi phí và hiểu vì sao thói quen không bám. Bây giờ là bước cuối: đề xuất với sếp một thí điểm nhỏ thay vì một khoản mua lớn.",
      },
      {
        type: "feynman",
        title: "Thí điểm nhỏ đơn giản hơn bạn nghĩ",
        intro: "Trước khi đặt may áo đồng phục cho cả công ty, người ta nhờ hai người mặc thử một bộ mẫu trong hai tuần, rồi hỏi họ thấy ra sao trước khi đặt hàng loạt.",
        columns: ["Điều cần có", "Mặc thử áo đồng phục", "Thí điểm công cụ"],
        rows: [
          ["Phạm vi nhỏ", "Hai người, một mẫu", "Hai người, một việc"],
          ["Thời gian", "Hai tuần mặc thử", "Hai tuần làm thử"],
          ["Mốc dừng", "Nếu áo phai màu sau hai lần giặt thì đổi mẫu", "Nếu tiết kiệm dưới mức đặt ra thì dừng"],
          ["Cách đo", "Hỏi cùng những câu cho mọi người", "Đo số phút mỗi lần trước và sau"],
        ],
        oneLiner: "Thí điểm là mặc thử trước khi đặt hàng loạt: nhỏ, có hạn, có cách đo.",
      },
      { type: "heading", text: "Năm phần của một kế hoạch thí điểm" },
      {
        type: "paragraph",
        text: "Một: việc nào. Hai: ai thử. Ba: thời gian và mốc dừng. Bốn: cách đo trước và sau. Năm: dữ liệu nào được dùng và ai đã duyệt. Đủ năm phần trên một trang là sếp có thể trả lời đồng ý hoặc không chỉ trong vài phút.",
      },
      {
        type: "flow",
        title: "Kế hoạch thí điểm hai tuần",
        steps: [
          { label: "Chọn một việc", detail: "Việc lặp lại, tốn thời gian, dùng dữ liệu đã duyệt hoặc dữ liệu giả." },
          { label: "Chọn hai người", detail: "Một người hào hứng và một người thận trọng, để kết quả không chỉ phản ánh người thích công cụ." },
          { label: "Đo trước", detail: "Trước khi thử, đo số phút mỗi lần làm theo cách cũ, để có mốc so sánh." },
          { label: "Thử hai tuần", detail: "Làm việc đó bằng công cụ, ghi số phút và chỗ phải sửa lại." },
          { label: "Xem lại cùng sếp", detail: "Báo đúng số đo được rồi quyết định dừng, kéo dài hoặc mở rộng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đề xuất mua cho cả phòng",
          text: "Khoản tiền lớn, chưa có số đo, sếp khó đồng ý và nếu đồng ý thì rủi ro cũng lớn.",
        },
        right: {
          label: "Đề xuất thí điểm nhỏ",
          text: "Khoản nhỏ, giới hạn rõ, có mốc dừng và cách đo. Sếp dễ đồng ý, và bạn có số thật cho quyết định sau.",
        },
      },
      {
        type: "list",
        items: [
          "Viết kế hoạch đủ năm phần trên một trang.",
          "Hỏi IT về dữ liệu trước khi thử.",
          "Đo trước khi dùng công cụ, không chỉ đo sau.",
          "Báo đúng số đo được, kể cả khi kết quả chưa rõ.",
        ],
      },
      {
        type: "callout",
        label: "Mốc dừng là để dừng thật",
        text: "Nếu đặt mốc dừng mà khi tới mốc lại tìm lý do đi tiếp, thí điểm mất ý nghĩa. Mốc dừng phải được viết ra trước khi bắt đầu.",
      },
      {
        type: "scenario",
        title: "Đề xuất với sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gặp sếp để đề xuất công cụ mới cho phòng. Sếp hỏi: em muốn mua cho cả phòng hay tính sao.",
            choices: [
              { label: "Đề xuất mua cho cả phòng vì nhiều công ty khác đang dùng", next: "bad_all" },
              { label: "Đề xuất thí điểm hai người hai tuần trên một việc, gửi kèm kế hoạch một trang", next: "s2" },
            ],
          },
          bad_all: {
            text: "Sếp hỏi số liệu ở đâu. Bạn chỉ có lời khen của công ty khác. Sếp hoãn quyết định vô thời hạn.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đồng ý thử. Hai tuần sau, số đo cho thấy mỗi email nhanh hơn chút ít nhưng hai người vẫn phải sửa nhiều chỗ.",
            choices: [
              { label: "Làm tròn số lên cho đẹp trước khi báo sếp", next: "bad_round" },
              { label: "Báo đúng số đo, nói rõ chỗ còn sửa nhiều và đề xuất thêm một tuần với mốc mới", next: "good" },
            ],
          },
          bad_round: {
            text: "Sếp duyệt mua thêm dựa trên số đã làm tròn. Khi phòng mở rộng, kết quả không được như báo cáo và sếp nghi ngờ mọi số liệu bạn đưa sau đó.",
            ending: "bad",
          },
          good: {
            text: "Sếp đánh giá cao sự trung thực và đồng ý thêm một tuần với mốc rõ ràng. Quyết định cuối cùng dựa trên số thật.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn kế hoạch thí điểm một trang",
        task: "Bạn muốn thử công cụ tóm tắt email nhà cung cấp, hai người thử, hai tuần, đo số phút mỗi email. Lắp một prompt để AI soạn kế hoạch một trang.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Soạn giúp tôi kế hoạch thí điểm công cụ AI.", feedback: "Không có việc, người hay thời gian, AI sẽ viết một kế hoạch chung chung ai dùng cũng được." },
              { text: "Việc: tóm tắt email nhà cung cấp. Hai người thử, hai tuần từ ngày 6, đo số phút mỗi email trước và sau.", good: true, feedback: "Đủ việc, người, thời gian và cách đo, nên kế hoạch gắn với việc thật của bạn." },
            ],
          },
          {
            id: "limits",
            label: "Giới hạn",
            options: [
              { text: "Thêm mọi điều bạn thấy cần để kế hoạch hoàn chỉnh.", feedback: "Bạn để AI tự thêm, nên nó có thể thêm khoản ngân sách hay số liệu mà bạn chưa hề có." },
              { text: "Chỉ dùng dữ kiện tôi đưa. Mốc dừng và ngân sách ghi là chưa có, để tôi điền.", good: true, feedback: "Phần chưa biết được đánh dấu để bạn điền, thay vì bị che bằng số AI bịa." },
            ],
          },
          {
            id: "shape",
            label: "Hình dạng",
            options: [
              { text: "Viết thành bài dài, càng chi tiết càng tốt.", feedback: "Bài dài làm sếp khó đọc, và kế hoạch thí điểm cần vừa một trang." },
              { text: "Một trang, năm mục: việc, người, thời gian và mốc dừng, cách đo, dữ liệu.", good: true, feedback: "Năm mục cố định giúp sếp đọc nhanh và bạn thấy ngay mục nào còn trống." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "limits", "shape"],
            text: "1. Việc: tóm tắt email nhà cung cấp.\n2. Người: hai người thử.\n3. Thời gian: hai tuần từ ngày 6. Mốc dừng: chưa có, cần bạn điền.\n4. Cách đo: số phút mỗi email trước và sau.\n5. Dữ liệu: chưa ghi, cần hỏi IT trước khi dùng email thật.\n\n(Mục nào bạn chưa đưa thì ghi chưa có, không bịa.)",
          },
          {
            requires: ["facts"],
            text: "Kế hoạch thí điểm: hai người thử công cụ tóm tắt email trong hai tuần và đo số phút. Ngân sách dự kiến 2 triệu đồng.\n\n(Đúng việc nhưng AI tự thêm ngân sách 2 triệu mà bạn chưa hề đưa, và không theo năm mục nên khó đọc.)",
          },
          {
            text: "Kế hoạch thí điểm ba tháng cho toàn công ty, ngân sách 50 triệu, mục tiêu tiết kiệm 40% thời gian làm việc.\n\n(Không có dữ kiện nên AI tự đặt phạm vi, ngân sách và mục tiêu. Không số nào có trong thông tin của bạn.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Một việc, hai người, hai tuần, mốc dừng, cách đo: một trang cho sếp.",
          "Kết thúc chặng: bạn đã biết cách nghe tin công cụ mới, thử, cân nhắc và đề xuất mà không chạy theo.",
        ],
      },
    ],
  },
];
