import type { Lesson } from "../lesson-types";
import { VIBECODE_PROJECT_EXERCISE } from "./s67-project";

// Chặng 67, bài 1-4: "Giao việc cho AI". Hành trình /hoc-theo-nhu-cau/vibecode.
// Không gắn công cụ nào: dạy thao tác (nói rõ muốn gì, chia bước, đặt ranh giới,
// nghiệm thu), vì tên công cụ đổi nhanh hơn bài học. Dải 2745-2749 dành cho
// phần "đọc và kiểm tra thứ AI viết"; các bài sửa lỗi nằm ở chặng 58.
export const S67_A_LESSONS: Lesson[] = [
  {
    id: 2740,
    slug: "giao-viec-cho-ai-nhu-giao-viec-cho-tho",
    title: "Chặng 67, Bài 1: Giao việc cho AI như giao việc cho thợ - nói muốn gì và để làm gì",
    subtitle: "Cùng một AI, hai câu yêu cầu khác nhau cho hai kết quả khác hẳn.",
    duration: "16 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phần lớn người thấy AI viết code \"không ra gì\" thật ra đã giao việc như nói với người lạ: một câu ngắn, không nói để làm gì, cho ai dùng. Người thợ giỏi mấy cũng làm ra căn phòng chung chung nếu chỉ nghe \"làm giúp tôi cái phòng\". Học cách giao việc rõ là kỹ năng rẻ nhất và đem lại khác biệt lớn nhất khi làm sản phẩm cùng AI.",
    openingQuestion:
      "Bạn gõ cho AI: \"Làm cho tôi một trang web bán hàng.\" Kết quả là một trang chung chung, đầy chữ mẫu. Nguyên nhân chính là gì?",
    openingOptions: [
      "Mô hình AI còn yếu nên cần đợi bản mới hơn rồi mới thử lại",
      "Yêu cầu thiếu mục đích, người xem và kết quả mong đợi",
      "Chưa dùng thuật ngữ như HTML hay CSS trong yêu cầu nên AI không hiểu",
      "Trang bán hàng quá phức tạp, AI chỉ làm được trang giới thiệu",
    ],
    correctOption: 1,
    explanation:
      "AI không biết bạn bán gì, bán cho ai, khách xem bằng thiết bị nào. Thiếu những điều đó, nó điền chỗ trống bằng giá trị phổ biến nhất - chính là trang chung chung với chữ mẫu. Đợi mô hình mới không bù được thông tin bạn chưa nói. Thuật ngữ cũng không cần thiết: nói bằng lời thường rõ ý là đủ. Còn chuyện trang bán hàng quá phức tạp thì không đúng, vì AI làm được trang bán hàng đơn giản nếu bạn mô tả đủ.",
    diagram: [
      { label: "Mục đích: trang này để làm gì?", arrow: true },
      { label: "Người dùng: ai mở nó, bằng gì, lúc nào?", arrow: true },
      { label: "Kết quả mong đợi: xong thì trông ra sao?", arrow: true },
      { label: "Giao việc rõ: AI làm sát ý, bạn ít phải sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị chủ quán cà phê nhờ AI \"làm trang web quán\" và nhận về một trang đầy chữ mẫu về công ty. Lần hai chị viết: \"Trang giới thiệu quán nhỏ, khách xem trên điện thoại, cần giờ mở cửa, địa chỉ và nút gọi điện.\" Bản làm ra dùng được ngay sau hai lần chỉnh. Cùng một AI, khác nhau chỉ ở ba câu chị đã nói rõ.",
    },
    quiz: [
      {
        question: "Yêu cầu nào dưới đây giao việc tốt nhất cho AI?",
        options: [
          "Trang web quán cà phê dùng HTML và CSS hiện đại, có hiệu ứng chuyển động",
          "Trang web thật chuyên nghiệp, đẹp và hiện đại như các thương hiệu lớn",
          "Trang quán cà phê nhỏ, khách xem trên điện thoại, có giờ mở cửa và nút gọi",
          "Trang web quán cà phê với càng nhiều tính năng càng tốt",
        ],
        correct: 2,
        explanation:
          "Yêu cầu nói rõ khách xem bằng điện thoại, cần giờ mở cửa và nút gọi cho AI đúng ba điều nó cần: trang để làm gì (giới thiệu quán), ai xem và bằng gì (khách, điện thoại), và cần có gì (giờ mở cửa, nút gọi). Những yêu cầu dùng từ khen chung chung hoặc thuật ngữ vẫn không nói được mục đích. Yêu cầu \"càng nhiều tính năng càng tốt\" khiến AI nhồi những thứ bạn không cần.",
      },
      {
        question: "Vì sao nên nói trang web dùng để làm gì?",
        options: [
          "Mục đích càng dài thì mô hình càng chạy nhanh và ít tốn tiền hơn",
          "Mô hình chỉ làm việc khi yêu cầu có đủ ba câu trở lên",
          "AI chọn bố cục, chữ và nội dung theo mục đích bạn nêu",
          "Mục đích chỉ để bạn nhớ lại sau này, AI không dùng đến nó",
        ],
        correct: 2,
        explanation:
          "Mục đích là căn cứ để AI quyết định đặt cái gì lên đầu trang, viết giọng nào, bỏ bớt gì. Độ dài của yêu cầu không làm mô hình nhanh hơn hay rẻ hơn, và không có quy tắc \"đủ ba câu\" nào. AI cũng có đọc mục đích; nó là phần quan trọng nhất của yêu cầu.",
      },
      {
        question: "Bạn ghi \"làm giúp tôi\" và AI hỏi lại vài câu. Nên làm gì?",
        options: [
          "Bỏ qua và bấm tạo lại cho tới khi ra bản vừa ý ngay lần đầu",
          "Trả lời 'sao cũng được' để AI tự chọn mọi thứ thay cho bạn",
          "Trả lời từng câu, vì câu hỏi lại giúp bản làm ra sát ý bạn hơn",
          "Đóng cuộc trò chuyện, vì AI hỏi lại nghĩa là nó không làm được",
        ],
        correct: 2,
        explanation:
          "Câu hỏi lại là AI đang xin đúng những thông tin còn thiếu: trả lời chúng là cách nhanh nhất để có bản đúng ý. Tạo lại nhiều lần không thêm thông tin nên chỉ đổi kết quả ngẫu nhiên. Trả lời 'sao cũng được' trao hết quyết định cho AI. Hỏi lại không có nghĩa là nó bất lực, ngược lại đó là dấu hiệu nó cần thêm dữ kiện.",
      },
      {
        question: "Ba điều nên có trong một yêu cầu giao việc là gì?",
        options: [
          "Ngày giao, người duyệt và ngân sách dành cho phần mềm",
          "Tên công cụ, tên ngôn ngữ lập trình và phiên bản mới nhất",
          "Làm để làm gì, ai sẽ dùng, và xong thì trông ra sao",
          "Độ dài tối đa, giọng điệu và số lần được phép hỏi lại",
        ],
        correct: 2,
        explanation:
          "Mục đích, người dùng và kết quả mong đợi là ba thứ AI không tự đoán đúng được. Tên công cụ hay phiên bản là chi tiết kỹ thuật, có thể để AI đề xuất rồi bạn duyệt. Ngày giao và ngân sách là chuyện quản lý dự án giữa người với người, AI không dùng đến. Giọng điệu và độ dài hữu ích khi viết văn bản, nhưng chưa phải cốt lõi của việc giao việc làm sản phẩm.",
      },
      {
        question: "Bạn muốn \"làm app quản lý tiền\". Câu bổ sung nào hữu ích nhất?",
        options: [
          "Hãy làm thật thông minh, dễ dùng và có đầy đủ mọi chức năng cần thiết",
          "Dùng công nghệ mới nhất và bảo mật cao nhất có thể cho ứng dụng",
          "Cho chi tiêu cá nhân, nhập tay mỗi tối, cần xem tổng theo tuần",
          "Làm ra thật nhanh, tôi sẽ tự sửa những chỗ chưa vừa ý sau",
        ],
        correct: 2,
        explanation:
          "Câu bổ sung nói ai dùng (cá nhân), dùng thế nào (nhập tay mỗi tối) và cần kết quả gì (tổng theo tuần): AI biết ngay nên làm gì và bỏ gì. Những câu chỉ khen hay hứa hẹn chung chung không thêm một dữ kiện nào để AI quyết định.",
      },
    ],
    keyTakeaways: [
      "AI điền chỗ trống bằng giá trị phổ biến nhất; yêu cầu càng thiếu, bản làm ra càng chung chung.",
      "Ba điều nên nói: để làm gì, ai dùng, xong thì trông ra sao.",
      "Dùng lời thường rõ ý; thuật ngữ không làm yêu cầu tốt hơn.",
      "Khi AI hỏi lại, trả lời từng câu: đó là dữ kiện còn thiếu.",
      "Tính từ như \"đẹp\", \"thông minh\" không phải thông tin; ví dụ cụ thể mới là thông tin.",
    ],
    practicePrompt: {
      question: "Bạn nhờ AI viết email nhắc khách thanh toán. Thông tin nào nên thêm trước tiên?",
      options: [
        "Khách là ai, hạn thanh toán và giọng thân thiện hay nghiêm",
        "Số lượng từ chính xác và tên phông chữ muốn dùng trong thư",
        "Tên mô hình AI đang dùng và ngày mô hình được huấn luyện",
        "Email gửi từ điện thoại hay từ máy tính để bàn của bạn",
      ],
      correct: 0,
      explanation:
        "Khách là ai, hạn thanh toán và giọng điệu quyết định nội dung và cách viết của email. Số từ và phông chữ là chi tiết định dạng, đổi sau cũng được. Tên mô hình hay thiết bị gửi không ảnh hưởng gì tới việc nên viết gì.",
    },
    summary: {
      keyIdea: "AI làm sát ý khi bạn nói rõ mục đích, người dùng và kết quả mong đợi.",
      formula: "Yêu cầu tốt = để làm gì + ai dùng (bằng gì) + xong thì trông ra sao.",
      commonMistake: "Dùng tính từ khen (\"đẹp\", \"chuyên nghiệp\") thay cho dữ kiện cụ thể.",
      action: "Viết lại một yêu cầu cũ của bạn theo ba điều trên rồi so hai kết quả.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Chọn một việc bạn từng nhờ AI mà kết quả chung chung. Viết lại yêu cầu theo ba dòng: để làm gì, ai dùng và bằng gì, xong thì trông ra sao. Gửi lại và đặt hai kết quả cạnh nhau để thấy khác biệt.",
      secondary: "Giữ cả hai bản yêu cầu: cách viết tốt nhất là cách bạn so sánh được.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nói với AI \"làm cho tôi cái trang web\" và nhận về thứ ai cũng từng thấy. Lỗi hiếm khi nằm ở AI. Bài này cho bạn ba câu hỏi để biến một yêu cầu một dòng thành một bản giao việc.",
      },
      {
        type: "feynman",
        title: "Giao việc cho AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn thuê một người thợ giỏi nhưng chưa từng vào nhà bạn. Nghe \"sửa giúp tôi cái phòng\", họ sẽ làm một căn phòng ai cũng làm. AI cũng vậy.",
        columns: ["Điều cần nói", "Với người thợ", "Với AI"],
        rows: [
          ["Để làm gì", "Phòng này để ngủ hay để làm việc", "Trang này để giới thiệu quán hay để bán hàng"],
          ["Ai dùng", "Có trẻ nhỏ và người già sống ở đây", "Khách xem trên điện thoại, đa số lúc đang đi đường"],
          ["Xong thì trông ra sao", "Cho xem ảnh một căn phòng giống ý", "Nêu những thứ bắt buộc có: giờ mở cửa, nút gọi"],
          ["Không nói thì sao", "Thợ làm theo kiểu họ quen", "AI điền bằng kiểu phổ biến nhất"],
        ],
        oneLiner: "AI làm nhanh, nhưng chỉ làm đúng điều bạn nói rõ.",
      },
      {
        type: "flow",
        title: "Từ một ý mơ hồ tới một bản giao việc",
        steps: [
          { label: "Bắt đầu từ ý mơ hồ", detail: "\"Làm cho tôi trang web quán.\"" },
          { label: "Trả lời: để làm gì?", detail: "Giới thiệu quán nhỏ để khách biết giờ mở cửa." },
          { label: "Trả lời: ai dùng, bằng gì?", detail: "Khách quanh khu phố, xem bằng điện thoại." },
          { label: "Trả lời: xong thì trông ra sao?", detail: "Có giờ mở cửa, địa chỉ và nút gọi ở đầu trang." },
          { label: "Gửi đi", detail: "Ba câu trả lời ghép lại chính là yêu cầu giao việc." },
        ],
      },
      { type: "heading", text: "Ba câu hỏi trước khi gửi" },
      {
        type: "paragraph",
        text: "Trước khi bấm gửi, tự hỏi: trang (hay app) này để làm gì? Ai sẽ mở nó, bằng thiết bị gì? Khi xong, tôi nhìn vào đâu để biết là đúng? Ba câu trả lời đó chính là yêu cầu của bạn, viết bằng lời thường.",
      },
      {
        type: "comparison",
        left: {
          label: "Yêu cầu một dòng",
          text: "\"Làm cho tôi trang web quán cà phê.\" AI phải tự đoán mọi thứ, nên ra bản chung chung và bạn mất nhiều lượt chỉnh.",
        },
        right: {
          label: "Yêu cầu ba điều",
          text: "\"Trang giới thiệu quán nhỏ, khách xem trên điện thoại, cần giờ mở cửa và nút gọi.\" AI biết đặt gì lên đầu, bạn chỉnh ít.",
        },
      },
      {
        type: "list",
        items: [
          "Nói để làm gì thay vì chỉ nói làm cái gì.",
          "Nói ai dùng và dùng bằng gì, nhất là khi là điện thoại.",
          "Nêu một hai thứ bắt buộc phải có; đừng liệt kê cả chục thứ.",
          "Khi AI hỏi lại, trả lời đủ rồi hãy xin bản mới.",
        ],
      },
      {
        type: "callout",
        label: "Tính từ không phải thông tin",
        text: "\"Đẹp\", \"hiện đại\", \"chuyên nghiệp\" ai cũng hiểu một kiểu khác nhau. \"Nền sáng, chữ lớn, nút gọi to ở đầu trang\" thì chỉ có một cách hiểu.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp một yêu cầu giao việc cho trang quán cà phê",
        task: "Bạn cần một trang giới thiệu quán. Chọn từng phần để ghép thành yêu cầu và xem AI trả lời ra sao.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích",
            options: [
              { text: "Làm cho tôi một trang web đẹp.", feedback: "Từ \"đẹp\" không cho AI biết trang để làm gì, nên nó phải đoán." },
              { text: "Trang này giới thiệu quán cà phê nhỏ của tôi để khách biết giờ mở cửa và chỗ ngồi.", good: true, feedback: "Có mục đích rõ: AI biết thông tin nào phải nằm ở đầu trang." },
            ],
          },
          {
            id: "user",
            label: "Người dùng",
            options: [
              { text: "Khách quanh khu phố, thường mở trang bằng điện thoại khi đang đi trên đường.", good: true, feedback: "AI hiểu cần chữ lớn, bố cục một cột và nút bấm dễ chạm." },
              { text: "Mọi người trên mạng, ai cũng có thể xem.", feedback: "Quá rộng: AI không biết thiết kế cho thiết bị hay nhu cầu nào." },
            ],
          },
          {
            id: "result",
            label: "Kết quả mong đợi",
            options: [
              { text: "Có giờ mở cửa, địa chỉ và một nút gọi điện ở đầu trang; nền sáng, chữ lớn.", good: true, feedback: "Bạn có thể kiểm tra từng ý khi nhận bản làm ra." },
              { text: "Trông thật chuyên nghiệp và có đầy đủ mọi thứ một quán cần.", feedback: "Không kiểm tra được: \"chuyên nghiệp\" và \"đầy đủ\" mỗi người hiểu một kiểu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "user", "result"],
            text: "Đây là trang một cột cho điện thoại: đầu trang có tên quán, giờ mở cửa và nút \"Gọi quán\" to; bên dưới là địa chỉ, ảnh quán và vài món chính. Tôi dùng nền sáng, chữ lớn. Bạn muốn thêm bản đồ không?\n(Bản sát ý: vì yêu cầu nói rõ ba điều.)",
          },
          {
            requires: ["purpose"],
            text: "Đây là một trang giới thiệu quán với phần đầu, thực đơn và liên hệ. Tôi chọn bố cục phổ biến và màu trung tính.\n(Đúng hướng nhưng chung chung vì chưa biết ai xem và cần có gì.)",
          },
          {
            text: "Đây là một trang web hiện đại với banner lớn, ba cột dịch vụ và mẫu chữ lorem ipsum để bạn thay sau.\n(Chung chung vì yêu cầu không nói gì cụ thể.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 1/10",
        text: "Cả chặng này, bạn xây phần mềm đặt món cho một quán cà phê nhỏ. Mỗi bài thêm một bước và có một bài tập chạy được; tiến độ được lưu khi bài tập đạt. Bước 1 là bản giao việc cho AI.",
      },
      VIBECODE_PROJECT_EXERCISE[2740],
      {
        type: "scenario",
        title: "Bản đầu tiên không đúng ý",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi \"làm trang web cho quán\" và nhận về một trang đầy chữ mẫu. Bạn thấy khó chịu và cần quyết định bước tiếp.",
            choices: [
              { label: "Viết lại: trang giới thiệu quán nhỏ, xem trên điện thoại, cần giờ mở cửa và nút gọi", next: "good" },
              { label: "Bấm tạo lại liên tục cho tới khi ra bản ưng ý", next: "bad_retry" },
            ],
          },
          bad_retry: {
            text: "Sau năm lần, mỗi bản đều chung chung theo một kiểu khác. Bạn mất cả buổi mà vẫn chưa có trang dùng được.",
            ending: "bad",
          },
          good: {
            text: "Bản mới có giờ mở cửa và nút gọi ngay đầu trang. Bạn chỉ phải đổi hai dòng chữ. Bạn nhận ra mình đã thêm đúng những điều AI không thể đoán.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba câu hỏi trước khi gửi: để làm gì, ai dùng, xong thì trông ra sao.",
          "Bài sau: yêu cầu rõ mà quá lớn thì AI vẫn làm hỏng - cách chia thành từng bước nhỏ.",
        ],
      },
    ],
  },
  {
    id: 2741,
    slug: "mot-luot-mot-viec-chia-du-an-thanh-buoc-kiem-duoc",
    title: "Chặng 67, Bài 2: Một lượt một việc - chia dự án thành những bước kiểm tra được",
    subtitle: "Xin cả dự án trong một câu thì lỗi nằm khắp nơi; xin từng bước thì lỗi có địa chỉ.",
    duration: "15 phút",
    difficulty: "Dễ",
    emoji: "🪜",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Yêu cầu rõ vẫn có thể quá lớn. Xin AI làm cả một ứng dụng trong một lượt, bạn nhận về hàng trăm dòng mã chạy lỗi và không biết lỗi từ đâu. Chia nhỏ là cách duy nhất để vẫn hiểu được thứ đang được xây, và để biết bước nào làm hỏng bước nào.",
    openingQuestion:
      "Bạn xin AI làm app ghi chi tiêu có đăng nhập, biểu đồ, nhắc nợ và xuất Excel trong một câu. Kết quả chạy lỗi khắp nơi. Cách xử lý tốt hơn là gì?",
    openingOptions: [
      "Viết lại yêu cầu dài hơn gấp đôi để AI không bỏ sót chức năng nào",
      "Đổi sang một mô hình khác và dán lại đúng nguyên yêu cầu ban đầu",
      "Xin làm phần nhập chi tiêu trước, chạy thử xong mới xin phần kế",
      "Xin AI tạo lại cả app nhiều lần rồi chọn bản ít lỗi nhất",
    ],
    correctOption: 2,
    explanation:
      "Bốn chức năng cùng lúc tạo ra lỗi chồng lên nhau, khó biết lỗi nào gây ra lỗi nào. Làm phần nhập chi tiêu trước, chạy thử, xác nhận chạy rồi mới thêm phần kế tiếp thì mỗi lỗi mới chỉ có thể đến từ bước vừa thêm. Viết yêu cầu dài hơn làm bài toán lớn thêm. Đổi mô hình hay tạo lại nhiều lần chỉ đổi kết quả ngẫu nhiên mà không giải quyết kích thước bài toán.",
    diagram: [
      { label: "Chọn một bước nhỏ: một màn hình, một chức năng", arrow: true },
      { label: "Xin AI làm đúng bước đó", arrow: true },
      { label: "Chạy thử: nó có làm đúng điều bạn muốn không?", arrow: true },
      { label: "Đúng thì sang bước kế; sai thì sửa ngay tại bước này" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn xin AI làm app theo dõi chi tiêu với bảy chức năng trong một lượt, nhận về ba tệp mã và bốn lỗi khác nhau. Mất hai tối mà vẫn không chạy. Làm lại từ màn hình nhập khoản chi, chạy thử mỗi bước, bạn ấy có bản dùng được sau một buổi, vì mỗi lần hỏng đều biết do bước nào.",
    },
    quiz: [
      {
        question: "Vì sao nên chia dự án thành bước nhỏ khi làm cùng AI?",
        options: [
          "Mỗi bước chạy thử được, lỗi lộ sớm và dễ khoanh vùng",
          "Mô hình chỉ cho phép trả lời một việc trong mỗi lượt hội thoại",
          "Bước nhỏ khiến AI tính ít tiền hơn nên bản làm ra tốt hơn hẳn",
          "Yêu cầu ngắn thì AI bắt buộc làm đúng từng chữ bạn viết",
        ],
        correct: 0,
        explanation:
          "Giá trị chính của bước nhỏ là kiểm tra được: lỗi nào cũng xuất hiện ngay sau bước vừa làm nên dễ tìm. Không có giới hạn một việc mỗi lượt; chi phí và chất lượng không tự tốt hơn chỉ vì ngắn; và AI không làm đúng từng chữ chỉ vì yêu cầu ngắn.",
      },
      {
        question: "Vừa xong một bước và nó chạy. Nên làm gì trước khi sang bước kế?",
        options: [
          "Xin luôn bước tiếp theo, vì lỗi nào cũng sẽ lộ ra ở cuối cùng",
          "Xoá lịch sử hội thoại để AI không bị nhiễu bởi bước cũ",
          "Xác nhận bước vừa làm hoạt động đúng ý, rồi mới xin bước tiếp",
          "Nhờ AI tự kiểm tra, nếu nó nói ổn thì đi tiếp mà không chạy",
        ],
        correct: 2,
        explanation:
          "Chính bạn chạy và nhìn kết quả mới xác nhận được bước đó đúng. Dồn kiểm tra về cuối làm lỗi chồng nhau. Xoá lịch sử khiến AI mất bối cảnh của dự án. Tin lời AI \"ổn rồi\" mà không chạy là tin một lời khẳng định chưa kiểm.",
      },
      {
        question: "Với app ghi chi tiêu, bước đầu tiên hợp lý nhất là gì?",
        options: [
          "Một màn hình nhập khoản chi, chưa cần đăng nhập hay biểu đồ",
          "Toàn bộ cơ sở dữ liệu cho mọi chức năng sẽ có sau này",
          "Thiết kế logo và bảng màu cho cả ứng dụng trước tiên",
          "Phần đăng nhập bằng tài khoản, vì mọi app đều cần có nó",
        ],
        correct: 0,
        explanation:
          "Việc nhập một khoản chi là lõi của app và kiểm tra được ngay. Dựng cả cơ sở dữ liệu cho tương lai là làm trước khi biết cần gì. Logo và bảng màu không giúp app chạy. Đăng nhập là chức năng quan trọng nhưng không phải thứ để xác nhận ý tưởng.",
      },
      {
        question: "Một bước vừa làm bị lỗi. Cách xử lý nào hợp lý?",
        options: [
          "Xin AI viết lại từ đầu để loại bỏ mọi lỗi cũ cùng lúc",
          "Bỏ qua lỗi nhỏ và xin bước kế, sửa chung ở cuối dự án",
          "Dán thông báo lỗi kèm bước vừa làm, sửa xong mới đi tiếp",
          "Đổi tên các tệp trong dự án rồi chạy lại xem có hết lỗi",
        ],
        correct: 2,
        explanation:
          "Lỗi có địa chỉ rõ (bước vừa làm) nên sửa ngay tại đó là nhanh nhất. Viết lại từ đầu bỏ cả phần đang chạy tốt. Dồn lỗi về cuối làm chúng chồng lên nhau. Đổi tên tệp ngẫu nhiên không có lý do gì làm hết lỗi.",
      },
      {
        question: "Một bước tốt nên có kích cỡ thế nào?",
        options: [
          "Càng nhiều chức năng càng tốt để đỡ phải xin thêm lần sau",
          "Đúng bằng một dòng mã để AI không thể làm sai",
          "Đủ nhỏ để bạn tự kiểm tra được trong vài phút",
          "Bằng nửa dự án để nửa còn lại bạn tự làm lấy",
        ],
        correct: 2,
        explanation:
          "Thước đo là khả năng kiểm tra: nếu bạn không kiểm được trong vài phút thì bước đó còn lớn. Quá nhiều chức năng làm mất lợi ích chia nhỏ; một dòng mã thì quá vụn để có ý nghĩa; nửa dự án vẫn là bước khổng lồ.",
      },
    ],
    keyTakeaways: [
      "Yêu cầu rõ mà quá lớn vẫn cho kết quả lỗi chồng lỗi.",
      "Mỗi lượt một việc nhỏ, chạy thử rồi mới sang việc kế.",
      "Bước nhỏ đo bằng khả năng kiểm tra được trong vài phút.",
      "Lỗi sau một bước nhỏ luôn có địa chỉ: bước vừa làm.",
      "Tự chạy và nhìn kết quả; lời \"ổn rồi\" của AI không thay được việc đó.",
    ],
    practicePrompt: {
      question: "Bạn muốn làm trang đặt lịch cắt tóc có chọn giờ, nhắc qua tin nhắn và thanh toán. Nên xin AI làm gì trước?",
      options: [
        "Trang chọn giờ hiển thị các khung giờ còn trống",
        "Toàn bộ trang gồm chọn giờ, nhắc tin nhắn và thanh toán",
        "Phần thanh toán trực tuyến, vì đây là phần khó nhất",
        "Bảng màu và phông chữ cho toàn bộ các trang sau này",
      ],
      correct: 0,
      explanation:
        "Chọn giờ là lõi của trang và kiểm tra được ngay bằng mắt. Xin cả ba chức năng cùng lúc tái tạo đúng lỗi chồng lỗi. Bắt đầu từ thanh toán khi chưa có gì để thanh toán là làm sai thứ tự; còn màu và phông chữ có thể làm sau khi chức năng chạy.",
    },
    summary: {
      keyIdea: "Chia dự án thành bước đủ nhỏ để bạn tự kiểm tra, rồi đi từng bước.",
      formula: "Một bước nhỏ → AI làm → bạn chạy thử → đúng thì bước kế.",
      commonMistake: "Xin cả dự án trong một lượt rồi không biết lỗi nằm ở đâu.",
      action: "Chia một dự án bạn định làm thành 4-5 bước, mỗi bước kiểm tra được trong vài phút.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Chọn một sản phẩm nhỏ bạn muốn làm. Viết 5 bước, mỗi bước một dòng, và cạnh mỗi bước ghi \"tôi sẽ kiểm tra bằng cách...\". Xin AI làm bước một và chạy thử trước khi xin bước hai.",
      secondary: "Nếu một bước bạn không biết kiểm tra thế nào, đó là dấu hiệu bước đó còn quá lớn hoặc chưa rõ.",
    },
    sections: [
      {
        type: "lead",
        text: "Yêu cầu của bạn đã rõ, AI đã hiểu, nhưng cả ứng dụng làm ra vẫn không chạy. Lần này lỗi nằm ở kích cỡ: việc quá lớn trong một lượt. Bài này dạy cách cắt việc thành những lát bạn kiểm tra được.",
      },
      {
        type: "feynman",
        title: "Chia bước đơn giản hơn bạn nghĩ",
        intro: "Xây nhà không đổ cả toà một lần: làm móng, kiểm tra, rồi mới xây tường. Làm cùng AI cũng thế.",
        columns: ["Việc", "Xây nhà", "Làm sản phẩm cùng AI"],
        rows: [
          ["Làm từng phần", "Móng trước, tường sau, mái cuối", "Màn hình nhập trước, biểu đồ sau, xuất file cuối"],
          ["Kiểm tra mỗi phần", "Đo móng cho phẳng trước khi xây tiếp", "Chạy thử màn hình nhập trước khi xin thêm"],
          ["Khi hỏng", "Biết ngay do phần vừa xây", "Lỗi chỉ có thể đến từ bước vừa thêm"],
          ["Làm một lượt hết", "Tường nứt mà không biết do móng hay mái", "Lỗi chồng lỗi, không biết bắt đầu sửa từ đâu"],
        ],
        oneLiner: "Mỗi lượt một việc đủ nhỏ để kiểm tra, thì lỗi luôn có địa chỉ.",
      },
      { type: "heading", text: "Một vòng làm việc" },
      {
        type: "flow",
        title: "Từ một ý tưởng lớn tới một app chạy được",
        steps: [
          { label: "Viết ý tưởng lớn bằng một câu", detail: "Ví dụ: app ghi chi tiêu hằng ngày cho cá nhân." },
          { label: "Cắt thành bước nhỏ", detail: "Nhập khoản chi, xem danh sách, tổng theo tuần, rồi mới tới thứ khác." },
          { label: "Xin AI làm bước một", detail: "Chỉ bước một, nói rõ nó kết thúc ở đâu." },
          { label: "Chạy thử", detail: "Nhập thử vài khoản chi thật; đúng mới đi tiếp." },
          { label: "Sang bước kế", detail: "Lặp lại cho tới khi xong; mỗi lần hỏng thì sửa ngay." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Cả dự án một lượt", text: "Hàng trăm dòng mã, vài lỗi chồng nhau, không biết bắt đầu sửa từ đâu và dễ bỏ cuộc giữa chừng." },
        right: { label: "Từng bước nhỏ", text: "Mỗi lượt vài chục dòng mã, kiểm tra được ngay, lỗi nào cũng có địa chỉ, bạn luôn hiểu mình đang xây gì." },
      },
      {
        type: "callout",
        label: "Dấu hiệu bước còn quá lớn",
        text: "Nếu bạn không nghĩ ra cách kiểm tra bước đó trong vài phút, hãy cắt nhỏ hơn.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu cho bước đầu tiên",
        task: "Bạn làm app ghi chi tiêu. Chọn cách xin AI làm bước đầu để được kết quả kiểm tra được.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi bước",
            options: [
              { text: "Làm cả app: nhập chi tiêu, đăng nhập, biểu đồ, nhắc nợ và xuất Excel.", feedback: "Quá lớn: lỗi sẽ chồng lên nhau và khó biết chỗ sửa." },
              { text: "Chỉ làm một màn hình nhập khoản chi gồm số tiền, ghi chú và ngày.", good: true, feedback: "Nhỏ và kiểm tra được: bạn nhập thử ngay là biết đúng hay không." },
            ],
          },
          {
            id: "stop",
            label: "Điểm dừng",
            options: [
              { text: "Làm xong thì cứ làm tiếp những gì bạn thấy cần thêm.", feedback: "AI sẽ tự thêm chức năng, bước không còn nhỏ nữa." },
              { text: "Dừng sau khi nhập được khoản chi và thấy nó hiện lên danh sách; chưa làm gì khác.", good: true, feedback: "Điểm dừng rõ giúp bạn biết khi nào bước này xong." },
            ],
          },
          {
            id: "check",
            label: "Cách kiểm tra",
            options: [
              { text: "Nói cho tôi cách tự thử bước này trong vài phút.", good: true, feedback: "Bạn có cách kiểm tra cụ thể ngay trong câu trả lời." },
              { text: "Cứ làm đi, tôi sẽ xem kết quả khi nào rảnh.", feedback: "Không có cách kiểm tra, lỗi sẽ để lại tới khi chồng nhiều thứ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "stop", "check"],
            text: "Đây là màn hình nhập khoản chi với ba ô: số tiền, ghi chú, ngày; bấm Lưu thì khoản chi hiện ở danh sách bên dưới. Tôi chưa làm đăng nhập hay biểu đồ.\nCách thử: nhập ba khoản chi khác nhau, đóng rồi mở lại trang, xem chúng còn không.\n(Bước nhỏ, có điểm dừng và cách kiểm tra.)",
          },
          {
            requires: ["scope"],
            text: "Đây là màn hình nhập khoản chi, và tôi thêm luôn danh sách theo tháng cùng một biểu đồ nhỏ cho tiện.\n(Đúng hướng, nhưng AI làm thêm vì chưa có điểm dừng.)",
          },
          {
            text: "Đây là toàn bộ ứng dụng với bảy tệp: đăng nhập, nhập chi tiêu, biểu đồ, nhắc nợ, xuất Excel... Bạn chạy thử nhé.\n(Quá lớn để kiểm tra từng phần.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 2/10",
        text: "Bước 2: hàm tính tổng tiền giỏ hàng, một việc nhỏ chạy thử được.",
      },
      VIBECODE_PROJECT_EXERCISE[2741],
      {
        type: "scenario",
        title: "Bước hai bị lỗi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bước một chạy tốt. Bạn xin thêm bước hai, thêm tổng theo tuần, và trang báo lỗi đỏ.",
            choices: [
              { label: "Dán thông báo lỗi, nói rằng bạn vừa thêm tổng theo tuần, nhờ sửa riêng phần đó", next: "good" },
              { label: "Xin AI làm thêm hai chức năng nữa, hy vọng chúng che được lỗi", next: "bad_stack" },
            ],
          },
          bad_stack: {
            text: "Ba lỗi chồng nhau và không ai biết lỗi nào đến trước. Bạn phải quay lại bước một và làm lại từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Vì bước một vẫn chạy, bạn và AI biết lỗi nằm ở đoạn tính tổng. Sửa xong trong vài phút, bạn sang bước ba với bản đang chạy đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi lượt một việc nhỏ, chạy thử rồi mới đi tiếp.",
          "Bài sau: nói cho AI biết điều gì KHÔNG được động tới.",
        ],
      },
    ],
  },
  {
    id: 2742,
    slug: "noi-ro-dieu-khong-duoc-doi-khi-giao-viec-cho-ai",
    title: "Chặng 67, Bài 3: Nói rõ điều không được đổi - giữ phần đang chạy tốt khi nhờ AI sửa",
    subtitle: "AI sửa một chỗ rất dễ làm đổi luôn chỗ khác nếu bạn không dặn.",
    duration: "18 phút",
    difficulty: "Dễ",
    emoji: "🚧",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhờ AI sửa một chỗ là lúc dễ mất công nhất: nó thấy đoạn khác \"chưa tối ưu\" và viết lại luôn. Phần bạn đã kiểm tra, đã chạy tốt, bỗng khác đi mà không ai báo. Biết đặt ranh giới - chỉ sửa chỗ này, giữ nguyên chỗ kia - là thói quen bảo vệ công sức của bạn.",
    openingQuestion:
      "Trang của bạn chạy tốt, chỉ nút \"Gửi\" bị lỗi. Bạn nhờ \"sửa trang giúp tôi\" và AI trả về trang đổi cả bố cục, màu sắc lẫn nút. Điều gì đã thiếu?",
    openingOptions: [
      "Phạm vi: yêu cầu chưa nói chỉ sửa nút Gửi và giữ nguyên phần còn lại",
      "Lời xin lỗi trước khi nhờ, vì AI làm tốt hơn khi được hỏi lịch sự",
      "Tên mô hình AI mới nhất, vì các bản cũ hay tự ý sửa những chỗ không được nhờ",
      "Một yêu cầu dài hơn, vì AI chỉ cẩn thận khi đọc được nhiều chữ",
    ],
    correctOption: 0,
    explanation:
      "\"Sửa trang\" cho AI toàn quyền với cả trang. Nó thấy chỗ nào có thể cải thiện là sửa, vì không ai bảo dừng. Câu dặn phạm vi - chỉ sửa nút Gửi, không đụng bố cục và màu - biến việc đó thành thay đổi nhỏ kiểm tra được. Lịch sự không đổi hành vi này, tên mô hình cũng không, và độ dài yêu cầu không thay thế cho câu dặn đúng chỗ.",
    diagram: [
      { label: "Nói chỗ cần sửa: nút Gửi không hoạt động", arrow: true },
      { label: "Nói chỗ giữ nguyên: bố cục, màu, các nút khác", arrow: true },
      { label: "Xin nêu những gì đã thay đổi", arrow: true },
      { label: "Bạn đối chiếu: chỉ chỗ được phép mới đổi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn nhờ AI \"sửa lỗi nút đặt hàng\" trong trang bán hàng nhỏ. AI sửa nút và cũng đổi cách tính giá ở trang khác vì thấy \"chưa gọn\". Ba hôm sau khách báo giá sai. Lần sau bạn viết: \"Chỉ sửa nút đặt hàng, không đổi cách tính giá, và liệt kê mọi dòng đã đổi.\" Bản trả về chỉ khác đúng ba dòng.",
    },
    quiz: [
      {
        question: "Khi nhờ AI sửa một lỗi, điều nên dặn thêm là gì?",
        options: [
          "Chỉ sửa chỗ này và giữ nguyên mọi phần khác",
          "Hãy sửa cho tốt hơn mọi thứ mà bạn thấy cần cải thiện",
          "Cứ tự quyết định phần nào nên đổi vì bạn hiểu rõ hơn tôi",
          "Viết lại cả tệp cho sạch đẹp rồi mới sửa lỗi này",
        ],
        correct: 0,
        explanation:
          "Câu dặn phạm vi giữ thay đổi nhỏ và kiểm tra được. Ba lựa chọn còn lại đều trao cho AI quyền sửa rộng hơn chỗ bạn nhờ: đó chính là cách phần đang chạy tốt bị đổi mà không ai hay.",
      },
      {
        question: "Vì sao AI hay sửa cả những chỗ bạn không nhờ?",
        options: [
          "Vì nó được lập trình để luôn phá phần đang chạy tốt của dự án",
          "Vì nó thấy chỗ có thể cải thiện và không có ranh giới nào ngăn lại",
          "Vì mỗi yêu cầu sửa luôn tính phí theo số dòng được thay đổi",
          "Vì nó không đọc được phần còn lại của tệp mà bạn dán vào",
        ],
        correct: 1,
        explanation:
          "AI cố làm kết quả tốt hơn theo cách nó hiểu, và nếu bạn không đặt ranh giới thì nó coi cả tệp là phạm vi. Nó không phá có chủ ý, không tính phí theo dòng, và thường đọc được cả tệp - vì thế mới sửa được những chỗ ngoài ý muốn.",
      },
      {
        question: "AI báo \"đã sửa xong\". Bạn nên xin thêm điều gì để kiểm tra phạm vi?",
        options: [
          "Một lời hứa rằng lần sau nó sẽ không sửa quá phần được nhờ",
          "Danh sách chính xác các dòng hay chỗ đã đổi so với bản cũ",
          "Một bản tóm tắt chung về chất lượng của toàn bộ mã nguồn",
          "Bản viết lại toàn bộ tệp để tiện so sánh với bản đầu tiên",
        ],
        correct: 1,
        explanation:
          "Danh sách chỗ đã đổi cho bạn đối chiếu với phạm vi đã dặn: chỗ nào ngoài danh sách được phép là dấu hiệu AI đi quá. Lời hứa cho lần sau không kiểm được. Bản tóm tắt chất lượng không nói gì về phạm vi. Bản viết lại toàn bộ lại càng khó so sánh.",
      },
      {
        question: "Phần nào nên dặn \"không được đổi\" khi nhờ sửa nút Gửi?",
        options: [
          "Chính nút Gửi, vì nó là chỗ bị lỗi cần xử lý",
          "Tên của chính bạn, vì AI sẽ đổi nó theo ý nó",
          "Những phần đã chạy đúng: bố cục, màu và các nút khác",
          "Mọi thứ trong dự án, vì như vậy mới chắc chắn AI không làm hỏng được",
        ],
        correct: 2,
        explanation:
          "Phần đang chạy đúng là thứ bạn muốn bảo vệ, nên đó là chỗ cần dặn giữ nguyên. Nút Gửi là chỗ cần sửa nên không thể cấm đổi. Dặn \"mọi thứ không được đổi\" thì AI không còn gì để sửa.",
      },
      {
        question: "Bạn dặn giữ nguyên phần khác nhưng bản trả về vẫn đổi màu. Nên làm gì?",
        options: [
          "Chấp nhận thay đổi đó, vì màu mới thường đẹp hơn cả bản cũ của bạn",
          "Nói rõ chỗ đổi ngoài ý muốn và xin quay lại bản cũ ở chỗ đó",
          "Xoá hết và nhờ AI làm lại cả trang để màu chắc chắn mới",
          "Tự đoán nguyên nhân và đổi tên tệp màu trong thư mục",
        ],
        correct: 1,
        explanation:
          "Chỉ ra đúng chỗ lệch phạm vi và xin khôi phục là cách sửa gọn nhất, đồng thời nhắc AI về ranh giới. Chấp nhận thay đổi ngoài ý muốn là mất quyền kiểm soát. Làm lại cả trang bỏ phần đang tốt. Đổi tên tệp ngẫu nhiên không giải quyết gì.",
      },
    ],
    keyTakeaways: [
      "Không đặt ranh giới thì AI coi cả tệp là phạm vi được sửa.",
      "Nói hai điều: chỗ cần sửa và chỗ giữ nguyên.",
      "Xin AI liệt kê mọi chỗ đã đổi để đối chiếu với phạm vi.",
      "Chỗ đổi ngoài phạm vi thì chỉ rõ và xin khôi phục.",
      "Bảo vệ phần đang chạy tốt quan trọng ngang với sửa phần lỗi.",
    ],
    practicePrompt: {
      question: "Bảng giá trong trang của bạn đúng, chỉ chữ ở nút \"Mua\" bị lệch dòng. Câu nhờ nào đặt ranh giới tốt nhất?",
      options: [
        "Chỉ sửa chữ lệch ở nút Mua, giữ nguyên bảng giá, liệt kê dòng đã đổi",
        "Sửa trang cho đẹp và đúng, vì bạn biết rõ phải làm gì hơn cả tôi",
        "Sửa nút Mua và tiện thể tối ưu luôn tất cả phần còn lại của trang",
        "Viết lại cả trang bán hàng để chữ không bao giờ còn lệch dòng nữa",
      ],
      correct: 0,
      explanation:
        "Câu nhờ nêu chỗ cần sửa, chỗ giữ nguyên và yêu cầu liệt kê thay đổi là câu đặt ranh giới tốt. Các câu khác mở rộng phạm vi: giao quyền quyết định, tối ưu tiện thể hoặc viết lại cả trang, mỗi cái đều đe doạ bảng giá đang đúng.",
    },
    summary: {
      keyIdea: "Dặn chỗ cần sửa và chỗ giữ nguyên, rồi đối chiếu danh sách thay đổi.",
      formula: "Chỉ sửa [chỗ A]; giữ nguyên [chỗ B, C]; liệt kê mọi dòng đã đổi.",
      commonMistake: "Nói \"sửa giúp tôi\" mà không nói phạm vi nên AI tự sửa luôn chỗ khác.",
      action: "Lần sau nhờ AI sửa, thêm một câu \"không đổi...\" và một câu \"liệt kê thay đổi\".",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Lấy một lỗi nhỏ trong sản phẩm hoặc bài tập của bạn. Viết yêu cầu có ba phần: chỗ cần sửa, chỗ giữ nguyên, và yêu cầu liệt kê thay đổi. Gửi và đối chiếu danh sách với những gì bạn mong đợi.",
      secondary: "Nếu danh sách có chỗ bạn không dặn, hỏi vì sao nó đổi rồi quyết định giữ hay quay lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI sửa một nút, nó trả về cả trang mới. Phần đã chạy tốt giờ khác đi, và bạn không biết khác ở đâu. Bài này dạy cách nói \"chỉ chỗ này thôi\" cho đúng.",
      },
      {
        type: "feynman",
        title: "Đặt ranh giới đơn giản hơn bạn nghĩ",
        intro: "Gọi thợ sửa một vòi nước, bạn không muốn họ đập luôn bức tường bên cạnh vì thấy gạch cũ. Phải dặn trước.",
        columns: ["Điều cần dặn", "Với thợ sửa vòi", "Với AI sửa code"],
        rows: [
          ["Chỗ cần sửa", "Vòi trong nhà tắm bị rỉ", "Nút Gửi không hoạt động"],
          ["Chỗ giữ nguyên", "Đừng động vào gạch và đường điện", "Bố cục, màu sắc và các nút khác giữ y như cũ"],
          ["Báo lại", "Nói tôi biết đã thay bộ phận nào", "Liệt kê mọi dòng đã đổi"],
          ["Không dặn", "Thợ có thể sửa rộng hơn bạn nghĩ", "AI sửa cả những chỗ nó thấy chưa tối ưu"],
        ],
        oneLiner: "Không dặn thì AI coi cả tệp là của nó.",
      },
      { type: "heading", text: "Câu dặn có ba phần" },
      {
        type: "list",
        items: [
          "Chỉ sửa: gọi tên đúng chỗ, như \"nút Gửi trong biểu mẫu liên hệ\".",
          "Giữ nguyên: nêu những thứ bạn không muốn đụng tới.",
          "Báo lại: yêu cầu liệt kê chỗ đã đổi để bạn đối chiếu.",
        ],
      },
      {
        type: "flow",
        title: "Một lượt nhờ sửa có ranh giới",
        steps: [
          { label: "Nêu lỗi", detail: "Nút Gửi bấm vào không có phản ứng." },
          { label: "Đặt ranh giới", detail: "Chỉ sửa nút Gửi; giữ nguyên bố cục, màu và các nút khác." },
          { label: "Nhận bản sửa và danh sách đổi", detail: "Yêu cầu AI liệt kê từng chỗ đã đổi." },
          { label: "Đối chiếu", detail: "Chỗ nào ngoài ranh giới thì hỏi hoặc xin quay lại." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Không đặt ranh giới", text: "\"Sửa trang giúp tôi.\" AI sửa nút, đổi luôn bố cục và màu. Bạn không biết đã khác ở đâu." },
        right: { label: "Có ranh giới", text: "\"Chỉ sửa nút Gửi, giữ nguyên phần còn lại, liệt kê dòng đã đổi.\" Thay đổi nhỏ, kiểm tra được." },
      },
      {
        type: "callout",
        label: "AI không phá có chủ ý",
        text: "Nó chỉ cố làm tốt hơn theo cách nó hiểu. Ranh giới của bạn là thứ duy nhất nói cho nó biết \"tốt hơn\" dừng ở đâu.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu sửa nút Gửi có ranh giới",
        task: "Trang chạy tốt, chỉ nút Gửi lỗi. Ghép yêu cầu để AI sửa đúng chỗ.",
        parts: [
          {
            id: "fix",
            label: "Chỗ cần sửa",
            options: [
              { text: "Trang liên hệ bị lỗi, sửa giúp tôi.", feedback: "Không chỉ ra chỗ nào: AI có thể sửa bất kỳ nơi nào." },
              { text: "Nút Gửi trong biểu mẫu liên hệ bấm vào không có phản ứng.", good: true, feedback: "Nêu đúng chỗ và triệu chứng." },
            ],
          },
          {
            id: "keep",
            label: "Chỗ giữ nguyên",
            options: [
              { text: "Giữ nguyên bố cục, màu sắc và các ô nhập; chỉ đổi thứ cần để nút hoạt động.", good: true, feedback: "Ranh giới rõ: phần chạy tốt được bảo vệ." },
              { text: "Cứ làm cho cả trang tốt nhất có thể.", feedback: "Mở rộng phạm vi: AI sẽ sửa cả những gì đã chạy tốt." },
            ],
          },
          {
            id: "report",
            label: "Báo lại",
            options: [
              { text: "Cho tôi danh sách từng dòng bạn đã đổi.", good: true, feedback: "Bạn đối chiếu được ngay với phạm vi đã dặn." },
              { text: "Xong thì báo là ổn.", feedback: "\"Ổn\" không cho bạn biết gì đã thay đổi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["fix", "keep", "report"],
            text: "Nút Gửi lỗi vì thiếu bước gắn hành động khi bấm. Tôi chỉ thêm đoạn gắn đó.\nThay đổi: (1) thêm 3 dòng gắn sự kiện bấm cho nút Gửi; (2) không đổi bố cục, màu hay ô nhập.\n(Đúng phạm vi, kiểm tra được.)",
          },
          {
            requires: ["fix"],
            text: "Tôi đã sửa nút Gửi và cũng làm gọn lại bố cục, đổi màu nút cho dễ nhìn hơn.\n(Đúng chỗ lỗi nhưng đi quá phạm vi vì chưa có ranh giới.)",
          },
          {
            text: "Tôi đã viết lại trang liên hệ với cấu trúc mới, màu mới và nút Gửi hoạt động.\n(Không nói rõ chỗ nào đổi, bạn không đối chiếu được.)",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Đối chiếu danh sách thay đổi với phạm vi đã dặn",
        task: "Bạn chỉ nhờ AI sửa nút Gửi và dặn giữ nguyên phần khác. Đây là bản liệt kê AI gửi lại. Bấm vào những dòng đi quá phạm vi, rồi nộp.",
        segments: [
          { text: "Đã thêm 3 dòng gắn hành động khi bấm cho nút Gửi trong biểu mẫu liên hệ." },
          { text: "Đã đổi màu tiêu đề từ xanh sang cam cho nổi bật hơn.", error: "Ngoài phạm vi: bạn chỉ nhờ sửa nút Gửi, không ai nhờ đổi màu tiêu đề." },
          { text: "Các ô nhập và bố cục của trang được giữ nguyên như cũ." },
          { text: "Đã sửa luôn cách tính tổng tiền ở trang giỏ hàng cho gọn hơn.", error: "Ngoài phạm vi và rủi ro: đây là trang khác, lại là phần tính tiền, và không ai nhờ." },
          { text: "Không đổi tên tệp hay thư mục nào trong dự án." },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 3/10",
        text: "Bước 3: thêm mã giảm giá mà không đổi hàm tính tiền đã chạy tốt.",
      },
      VIBECODE_PROJECT_EXERCISE[2742],
      {
        type: "scenario",
        title: "Bản sửa có vẻ ổn nhưng khác đi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ sửa nút Gửi và dặn giữ nguyên phần khác. AI báo xong. Mở trang, nút chạy nhưng bạn thấy màu tiêu đề hơi khác.",
            choices: [
              { label: "Xin danh sách các dòng đã đổi rồi đối chiếu với phạm vi đã dặn", next: "good" },
              { label: "Bỏ qua vì màu mới cũng ổn, rồi đưa trang lên dùng luôn", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Vài hôm sau bạn thấy nhiều chỗ nữa đã đổi mà không ai báo, trong đó có cả cách tính phí vận chuyển. Bạn mất thời gian tìm xem AI đã sửa những gì.",
            ending: "bad",
          },
          good: {
            text: "Danh sách có hai dòng đổi màu tiêu đề, ngoài phạm vi. Bạn xin khôi phục hai dòng đó và giữ phần sửa nút. Trang đúng như bạn muốn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chỉ sửa chỗ này, giữ nguyên chỗ kia, liệt kê điều đã đổi.",
          "Bài sau: nghiệm thu trước khi nhận - chạy thử và đọc những gì AI báo đã làm.",
        ],
      },
    ],
  },
  {
    id: 2743,
    slug: "nghiem-thu-truoc-khi-nhan-chay-thu-va-doc-bao-cao-cua-ai",
    title: "Chặng 67, Bài 4: Nghiệm thu trước khi nhận - chạy thử và đọc lời báo cáo của AI",
    subtitle: "\"Đã xong\" là một lời khẳng định. Chạy thử mới là bằng chứng.",
    duration: "15 phút",
    difficulty: "Dễ",
    emoji: "✅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI thường báo \"đã sửa xong, mọi thứ hoạt động\" bằng giọng rất chắc chắn, kể cả khi chưa hề chạy mã. Nếu bạn nhận việc theo lời báo, lỗi sẽ chỉ lộ ra khi người dùng thật gặp. Nghiệm thu bằng cách tự chạy thử vài trường hợp thật là bước ngắn nhất để biến lời khẳng định thành bằng chứng.",
    openingQuestion:
      "AI trả lời: \"Đã sửa xong lỗi, giờ mọi thứ hoạt động bình thường.\" Việc đầu tiên bạn nên làm là gì?",
    openingOptions: [
      "Tin luôn, vì AI đã báo rõ rằng mọi thứ hoạt động",
      "Tự chạy thử với một vài trường hợp thật, rồi mới nhận bản sửa",
      "Xin AI nhắc lại lần nữa rằng nó chắc chắn đã sửa xong lỗi này",
      "Hỏi AI xem nó có tự tin tuyệt đối vào bản sửa mình vừa đưa",
    ],
    correctOption: 1,
    explanation:
      "Câu báo cáo của AI là một lời khẳng định, không phải kết quả thử nghiệm: nó có thể chưa chạy gì và vẫn nói rất chắc. Bạn tự chạy vài trường hợp thật mới có bằng chứng. Xin nhắc lại hay hỏi độ tự tin chỉ cho ra thêm những câu nói nghe chắc chắn mà không cho thêm dữ kiện nào.",
    diagram: [
      { label: "Nhận bản AI làm và lời báo cáo", arrow: true },
      { label: "Tự chạy thử: trường hợp thường, biên và sai", arrow: true },
      { label: "So kết quả với điều bạn mong đợi", arrow: true },
      { label: "Khớp thì nhận; lệch thì báo lại cho AI kèm kết quả thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: AI báo đã sửa lỗi tính tiền giảm giá. Bạn thử một đơn thường và thấy đúng, rồi thử đơn trị giá đúng bằng mức tối thiểu để được giảm thì tiền vẫn tính sai. Chỉ vì thử thêm một trường hợp biên mà lỗi lộ ra trước khi khách thật mua hàng.",
    },
    quiz: [
      {
        question: "Vì sao không nên chỉ tin vào lời \"đã sửa xong\" của AI?",
        options: [
          "Vì mọi câu AI nói đều sai và cần được kiểm tra lại từng chữ",
          "Vì đó là lời khẳng định, nó có thể chưa chạy thử gì cả",
          "Vì AI cố ý nói dối để người dùng ngừng đặt câu hỏi cho nó",
          "Vì lời báo cáo của AI luôn bị cắt bớt khi gửi tới bạn",
        ],
        correct: 1,
        explanation:
          "AI có thể nói rất chắc về điều nó chưa kiểm. Điều này không có nghĩa mọi câu đều sai hay nó cố ý nói dối, mà đơn giản là lời nói không thay cho bằng chứng. Việc câu bị cắt bớt cũng không phải lý do.",
      },
      {
        question: "Nên thử những trường hợp nào khi nghiệm thu một bản sửa?",
        options: [
          "Một trường hợp thường, một ở mép giới hạn và một nhập sai",
          "Chỉ đúng trường hợp AI đã dùng làm ví dụ trong lời báo cáo",
          "Mười lần liên tiếp cùng một trường hợp dễ nhất để cho chắc",
          "Không cần thử gì thêm nếu mã trông gọn gàng, dễ đọc và có chú thích",
        ],
        correct: 0,
        explanation:
          "Trường hợp thường kiểm tra việc cơ bản, mép giới hạn là nơi lỗi hay ẩn, trường hợp sai kiểm tra ứng xử khi nhập bậy. Thử đúng ví dụ AI đưa là thử điều nó đã chọn sẵn. Lặp một trường hợp dễ không thêm thông tin. Mã gọn không chứng minh mã đúng.",
      },
      {
        question: "Bạn thử và kết quả khác mong đợi. Cách báo lại cho AI tốt nhất là gì?",
        options: [
          "Nói là còn lỗi và nhờ nó thử sửa thêm lần nữa",
          "Viết lại toàn bộ yêu cầu ban đầu bằng giọng nghiêm khắc hơn",
          "Nêu bạn nhập gì, mong đợi gì, và thực tế nhận được gì",
          "Xoá cuộc trò chuyện và bắt đầu lại với một bản mô tả khác",
        ],
        correct: 2,
        explanation:
          "Ba mẩu thông tin - đã nhập gì, mong đợi gì, nhận gì - cho AI đúng dữ kiện để tìm lỗi. \"Còn lỗi\" mà không nói lỗi nào buộc nó đoán. Giọng nghiêm khắc không thêm thông tin, và bắt đầu lại làm mất bối cảnh đã có.",
      },
      {
        question: "Khi nghiệm thu, bạn nên coi lời báo cáo của AI như thế nào?",
        options: [
          "Như một phiếu kết quả đã có đóng dấu của người kiểm tra",
          "Như lời của người thợ, cần kiểm lại bằng việc chạy thử",
          "Như một bản quảng cáo, nên bỏ qua mà không đọc gì cả",
          "Như điều luật bắt buộc, nên làm theo mọi gợi ý trong đó",
        ],
        correct: 1,
        explanation:
          "Lời thợ báo là thông tin hữu ích, cho biết họ nghĩ đã làm gì, nhưng phải kiểm lại. Coi nó là phiếu đã kiểm là tin quá; bỏ qua hoàn toàn là phí thông tin; làm theo mọi gợi ý là bỏ phán đoán của bạn.",
      },
      {
        question: "Cách nghiệm thu nào nhanh nhất mà vẫn có ích?",
        options: [
          "Đọc thật kỹ từng dòng mã dù bạn chưa hiểu mã làm gì",
          "Thử ba trường hợp thật trong vài phút và ghi lại kết quả",
          "Chờ khách dùng thật rồi sửa theo những gì họ phàn nàn",
          "Nhờ AI giải thích lại bản sửa rồi tin vào phần giải thích",
        ],
        correct: 1,
        explanation:
          "Ba trường hợp thật chạy trong vài phút cho bằng chứng trực tiếp. Đọc từng dòng khi chưa hiểu mất thời gian mà ít kết quả. Chờ khách phàn nàn là chuyển chi phí lỗi sang người dùng. Phần giải thích của AI vẫn là lời nói chứ chưa phải kết quả chạy.",
      },
    ],
    keyTakeaways: [
      "Lời báo \"đã xong\" của AI là khẳng định, không phải bằng chứng.",
      "Nghiệm thu bằng cách chạy thử ba loại trường hợp: thường, biên, sai.",
      "Lệch kết quả thì báo: đã nhập gì, mong đợi gì, nhận gì.",
      "Thử trước khi dùng thật; lỗi lộ ra rẻ nhất lúc này.",
      "Ghi lại các trường hợp đã thử để dùng lại sau mỗi lần sửa.",
    ],
    practicePrompt: {
      question: "AI báo đã sửa lỗi tính phí vận chuyển. Bộ ba trường hợp thử nào đầy đủ nhất?",
      options: [
        "Đơn bình thường, đơn đúng bằng mức được miễn phí, đơn nhập số âm",
        "Ba đơn bình thường có giá trị gần giống nhau một chút thôi",
        "Một đơn bình thường rồi thử lại đúng đơn đó thêm hai lần nữa",
        "Đơn AI đã nêu trong lời báo cáo và hai đơn có giá trị bất kỳ nào đó",
      ],
      correct: 0,
      explanation:
        "Đơn thường kiểm việc cơ bản, đơn đúng mức miễn phí là mép giới hạn nơi lỗi hay ẩn, và số âm kiểm ứng xử khi nhập sai. Ba đơn giống nhau hay lặp một đơn không thêm thông tin; dùng ví dụ AI chọn sẵn thì thử đúng điều nó đã chắc.",
    },
    summary: {
      keyIdea: "Biến lời khẳng định của AI thành bằng chứng bằng cách tự chạy thử.",
      formula: "Nghiệm thu = 1 trường hợp thường + 1 trường hợp biên + 1 trường hợp sai.",
      commonMistake: "Nhận bản sửa chỉ vì AI nói chắc chắn là đã xong.",
      action: "Viết sẵn ba trường hợp thử cho sản phẩm của bạn và chạy lại sau mỗi lần AI sửa.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Chọn một chức năng trong sản phẩm của bạn. Viết ba trường hợp thử: một thường, một ở mép giới hạn, một nhập sai. Chạy chúng, ghi kết quả vào giấy và giữ để dùng sau mỗi lần nhờ AI sửa.",
      secondary: "Nếu bạn không nghĩ ra trường hợp biên, hỏi AI: \"Giá trị nào dễ làm chức năng này sai nhất?\" rồi tự thử chúng.",
    },
    sections: [
      {
        type: "lead",
        text: "AI báo \"xong rồi\" bằng giọng rất chắc chắn. Nhưng chắc chắn không phải bằng chứng. Bài này dạy một thói quen ba phút để biến lời báo thành điều bạn đã nhìn tận mắt.",
      },
      {
        type: "feynman",
        title: "Nghiệm thu đơn giản hơn bạn nghĩ",
        intro: "Thợ báo \"xong rồi\", bạn vẫn mở vòi nước thử trước khi trả tiền. Với AI cũng vậy: mở vòi trước, trả tiền sau.",
        columns: ["Bước", "Nghiệm thu nhà", "Nghiệm thu bản AI làm"],
        rows: [
          ["Nghe báo cáo", "Thợ nói đã thay xong vòi", "AI nói đã sửa xong lỗi"],
          ["Thử cơ bản", "Mở vòi, nước ra bình thường", "Chạy một trường hợp thường"],
          ["Thử chỗ dễ sai", "Mở hết cỡ, xem khớp nối có rỉ", "Thử giá trị ở mép giới hạn"],
          ["Thử sai", "Vặn ngược xem có hư không", "Nhập giá trị sai xem có báo lỗi dễ hiểu"],
        ],
        oneLiner: "Lời báo cáo cho biết AI nghĩ gì; chạy thử cho biết sự thật.",
      },
      { type: "heading", text: "Ba trường hợp là đủ để bắt đầu" },
      {
        type: "list",
        items: [
          "Trường hợp thường: việc bình thường nhất người dùng sẽ làm.",
          "Trường hợp biên: giá trị đúng ở mốc, như đơn đúng bằng mức miễn phí vận chuyển.",
          "Trường hợp sai: để trống, nhập chữ vào ô số, nhập số âm.",
        ],
      },
      {
        type: "flow",
        title: "Từ lời báo cáo tới bằng chứng",
        steps: [
          { label: "AI báo đã sửa xong", detail: "Ghi lại điều nó nói đã thay đổi." },
          { label: "Bạn chạy ba trường hợp", detail: "Thường, biên, sai - mất vài phút." },
          { label: "So với mong đợi", detail: "Ghi từng kết quả: đúng hay lệch." },
          { label: "Lệch thì báo lại", detail: "Kèm: đã nhập gì, mong đợi gì, nhận gì." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Nhận theo lời báo", text: "Nhanh, nhưng lỗi chỉ lộ ra khi khách thật gặp, lúc đó sửa tốn kém và mất uy tín." },
        right: { label: "Nghiệm thu bằng chạy thử", text: "Tốn vài phút, nhưng lỗi lộ ra khi chỉ có bạn nhìn thấy và sửa còn rẻ." },
      },
      {
        type: "callout",
        label: "Giọng chắc chắn không đo được độ đúng",
        text: "AI nói \"chắc chắn đã sửa\" với cùng một giọng dù có chạy thử hay chưa. Chỉ bạn chạy mới biết.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Báo lại một kết quả lệch cho AI",
        task: "Bạn thử đơn đúng bằng mức miễn phí vận chuyển và phí vẫn bị tính. Chọn cách báo lại.",
        parts: [
          {
            id: "input",
            label: "Điều bạn đã nhập",
            options: [
              { text: "Tôi thử vài đơn, vẫn thấy lỗi.", feedback: "Không nói đơn nào: AI không có gì để tái hiện lỗi." },
              { text: "Đơn có tổng tiền đúng 500.000 đồng.", good: true, feedback: "Giá trị cụ thể giúp AI tái hiện đúng lỗi." },
            ],
          },
          {
            id: "expect",
            label: "Điều bạn mong đợi",
            options: [
              { text: "Phí vận chuyển phải bằng 0, vì từ 500.000 đồng trở lên được miễn phí.", good: true, feedback: "AI biết quy tắc đúng để so với kết quả." },
              { text: "Phải đúng như bình thường.", feedback: "\"Bình thường\" mơ hồ: AI không biết đúng là bao nhiêu." },
            ],
          },
          {
            id: "actual",
            label: "Điều thực tế nhận được",
            options: [
              { text: "Có vẻ sai.", feedback: "Không có con số: AI không biết sai ở đâu." },
              { text: "Phí vận chuyển vẫn hiện 30.000 đồng.", good: true, feedback: "Con số cụ thể cho thấy lỗi nằm ở mốc so sánh." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "expect", "actual"],
            text: "Lỗi nằm ở điều kiện so sánh: mã đang dùng \"lớn hơn 500.000\" thay vì \"lớn hơn hoặc bằng\". Tôi đã đổi một dòng; đơn đúng 500.000 đồng sẽ có phí bằng 0.\nBạn thử lại với 500.000 và 499.999 đồng để chắc.\n(Đủ dữ kiện để tìm ra lỗi ở mốc.)",
          },
          {
            requires: ["input"],
            text: "Có thể do cách tính phí ở mốc miễn phí. Bạn cho tôi biết chính xác kết quả nhận được và kết quả mong đợi nhé.\n(AI phải hỏi lại vì thiếu hai trong ba dữ kiện.)",
          },
          {
            text: "Tôi sẽ kiểm tra lại toàn bộ cách tính phí vận chuyển và các điều kiện miễn phí để đảm bảo mọi thứ hoạt động tốt.\n(Chung chung vì không có dữ kiện cụ thể.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 4/10",
        text: "Bước 4: nghiệm thu hàm phí giao hàng bằng các đơn thử thay vì tin lời báo cáo.",
      },
      VIBECODE_PROJECT_EXERCISE[2743],
      {
        type: "scenario",
        title: "Trước khi đưa trang cho khách",
        start: "s1",
        nodes: {
          s1: {
            text: "AI báo đã sửa lỗi tính phí vận chuyển và chúc bạn dùng tốt. Khách đầu tiên sẽ đặt hàng chiều nay.",
            choices: [
              { label: "Thử ba đơn: một thường, một đúng mức miễn phí, một nhập số âm", next: "s2" },
              { label: "Tin lời báo và công bố trang luôn cho kịp buổi chiều", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Khách đặt đơn đúng mức miễn phí và vẫn bị tính phí. Họ phàn nàn công khai và bạn phải hoàn tiền.",
            ending: "bad",
          },
          s2: {
            text: "Đơn thường đúng, đơn số âm bị từ chối, nhưng đơn đúng mức miễn phí vẫn bị tính 30.000 đồng.",
            choices: [
              { label: "Báo AI: nhập 500.000, mong phí 0, nhận 30.000; rồi chạy lại cả ba đơn", next: "good" },
              { label: "Nói chung chung \"vẫn còn lỗi\" và chờ AI tự tìm", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "AI kiểm tra những chỗ không liên quan và báo lại là đã ổn. Bạn mất thêm hai lượt mà lỗi vẫn còn.",
            ending: "bad",
          },
          good: {
            text: "AI chỉ ra lỗi ở dấu so sánh và sửa một dòng. Ba đơn đều đúng. Trang ra mắt đúng giờ mà không có sự cố nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lời báo cáo chưa phải bằng chứng; chạy thử ba trường hợp mới là bằng chứng.",
          "Bài sau: viết ca thử trước khi nhờ AI làm tính năng mới, để biết thế nào là xong.",
        ],
      },
    ],
  },
];
