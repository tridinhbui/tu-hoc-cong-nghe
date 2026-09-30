import type { Lesson } from "../lesson-types";

// Chặng 44, bài 16-20. Giáo trình: scripts/curriculum/stage-44.json.
// Nội dung dạy khái niệm bền (phân loại dữ liệu, che thông tin, quyền chia sẻ, kiểm nguồn); không nêu nút bấm hay tính năng riêng của công cụ nào.

const Q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S44_D_LESSONS: Lesson[] = [
  {
    id: 2295,
    slug: "tai-lieu-nao-khong-bao-gio-nen-tai-len",
    title: "Chặng 44, Bài 16: Tài liệu nào tuyệt đối không nên tải lên",
    subtitle: "Ba ngăn kéo: dùng thoải mái, hỏi trước, tuyệt đối không - và chính sách công ty luôn được xem trước.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗄️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng nay bạn định nhờ trợ lý đọc giúp một tệp cho nhanh, nhưng trong thư mục có bảng lương, hợp đồng khách hàng và hồ sơ nhân viên nằm lẫn với biên bản họp. Một lần tải nhầm không rút lại được. Biết phân loại trước khi bấm là thói quen rẻ nhất để không phải giải trình với sếp.",
    openingQuestion:
      "Thư mục của bạn có biên bản họp nội bộ, bảng lương tháng này, hợp đồng với một khách hàng lớn và bài đăng đã công bố trên website. Bạn nên làm gì trước khi tải bất kỳ tệp nào?",
    openingOptions: [
      "Xem chính sách công ty, rồi phân loại từng tệp theo mức nhạy cảm",
      "Tải hết lên vì trợ lý cần đủ dữ liệu mới trả lời đúng được",
      "Đổi tên tệp cho khó đoán rồi tải lên, như vậy là đủ an toàn cho mọi tệp",
      "Chỉ tải tệp nào bạn thấy quan trọng, còn lại thì cứ để ở ngoài",
    ],
    correctOption: 0,
    explanation:
      "Chính sách công ty quyết định công cụ nào được dùng và loại tài liệu nào được đưa vào, nên xem nó trước mọi thứ khác. Sau đó bạn phân loại từng tệp: bài đã công bố thì dùng thoải mái, biên bản họp nội bộ cần hỏi, bảng lương và hồ sơ cá nhân thì không tải. Tải hết vì cần đủ dữ liệu là đánh đổi an toàn lấy sự tiện. Đổi tên tệp không đổi nội dung bên trong. Chọn theo cảm giác quan trọng thì bỏ qua thứ thực sự cần kiểm: mức nhạy cảm.",
    diagram: [
      { label: "Xem chính sách công ty về công cụ và dữ liệu", arrow: true },
      { label: "Phân loại từng tệp: thoải mái, hỏi trước, không tải", arrow: true },
      { label: "Chỉ tải nhóm thoải mái; nhóm hỏi trước gửi câu hỏi", arrow: true },
      { label: "Nhóm cấm: làm việc trên bản che hoặc tự đọc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý hành chính có thư mục gồm 12 tệp. Cô chia thành ba ngăn, thấy 5 tệp đã công bố, 4 tệp nội bộ cần hỏi và 3 tệp gồm bảng lương, hợp đồng, hồ sơ nhân viên. Cô chỉ tải 5 tệp đầu, gửi câu hỏi cho bộ phận công nghệ thông tin về 4 tệp giữa và không đụng tới 3 tệp cuối.",
    },
    quiz: [
      Q(
        "Vì sao phân loại tệp theo mức nhạy cảm nên làm trước khi tải lên một công cụ AI?",
        [
          "Vì mỗi mức cần một cách xử lý khác nhau và tải lên khó thu hồi",
          "Vì công cụ AI đọc tệp nhạy cảm chậm hơn nhiều tệp thường",
          "Vì tệp nào được phân loại xong thì công cụ tự động bảo vệ",
          "Vì phân loại là bước bắt buộc để trợ lý chịu trả lời câu hỏi của bạn",
        ],
        "Phân loại quyết định tệp nào đi, tệp nào hỏi, tệp nào ở lại, và một tệp đã tải thì bạn khó kiểm soát nó đi đâu nữa. Tốc độ đọc không phụ thuộc mức nhạy cảm, việc bạn tự xếp loại không kích hoạt bảo vệ nào, và trợ lý không đòi phân loại mới trả lời.",
      ),
      Q(
        "Tệp nào dưới đây thuộc nhóm tuyệt đối không tải lên công cụ chưa được duyệt?",
        [
          "Bảng lương có tên và số tài khoản",
          "Bài đăng công bố trên website công ty",
          "Bản hướng dẫn dùng máy in tầng ba",
          "Bản tin nội bộ đã gửi công khai cho khách",
        ],
        "Bảng lương gắn tên với số tiền và số tài khoản nên lộ ra là hại cho từng người. Bài đã công bố ai cũng đọc được, hướng dẫn máy in không chứa thông tin cá nhân và bản tin đã gửi ra ngoài không còn là bí mật.",
      ),
      Q(
        "Công ty chưa có quy định rõ về công cụ trợ lý đọc tài liệu. Bạn nên xử lý thế nào?",
        [
          "Hỏi bộ phận công nghệ thông tin hoặc quản lý trực tiếp rồi mới dùng với tài liệu công ty",
          "Coi như được phép vì chưa có quy định nào cấm và nhiều đồng nghiệp đã dùng",
          "Chỉ dùng với tệp có đóng dấu mật để chắc chắn không ai lấy mất dữ liệu",
          "Dùng bản trả phí của công cụ vì tệp của bạn chắc chắn luôn được bảo vệ hơn",
        ],
        "Chưa có quy định nghĩa là chưa ai đồng ý, không phải được phép. Hỏi trước thì rẻ hơn giải trình sau. Tệp đóng dấu mật là loại ít được tải nhất, còn bản trả phí không tự động được công ty chấp thuận.",
      ),
      Q(
        "Hợp đồng với khách hàng có nên tải thẳng lên trợ lý để nhờ tóm tắt điều khoản không?",
        [
          "Không, hỏi pháp chế hoặc công nghệ thông tin trước",
          "Có, vì hợp đồng đã ký nên hết bí mật",
          "Có, nếu xoá tên công ty mình nhưng để nguyên số tiền trong đó",
          "Không cần hỏi, vì chỉ tóm tắt chứ trợ lý không lưu nội dung",
        ],
        "Nhiều hợp đồng có điều khoản giữ bí mật, nghĩa là ký rồi càng phải giữ. Xoá tên một bên mà để số tiền thì vẫn nhận ra được. Việc trợ lý có lưu nội dung hay không phụ thuộc chính sách từng công cụ, bạn hỏi chứ không đoán.",
      ),
      Q(
        "Một đồng nghiệp nói 'đổi tên tệp thành tài liệu-1 là an toàn'. Nhận xét nào đúng?",
        [
          "Sai, tên tệp không đổi nội dung bên trong",
          "Đúng, vì trợ lý chỉ nhìn tên tệp",
          "Đúng, nếu đổi tên xong thì tệp không còn gắn với công ty",
          "Sai, nhưng chỉ khi tệp có nhiều hơn mười trang nội dung",
        ],
        "Điều nhạy cảm nằm trong nội dung: tên người, số tiền, điều khoản. Đổi tên tệp chỉ đổi nhãn bên ngoài. Trợ lý đọc nội dung chứ không đọc nhãn, và số trang không quyết định mức nhạy cảm.",
      ),
    ],
    keyTakeaways: [
      "Xem chính sách công ty trước khi chọn tệp hay công cụ.",
      "Chia ba ngăn: dùng thoải mái, hỏi trước, tuyệt đối không tải.",
      "Bảng lương, hồ sơ cá nhân và hợp đồng khách hàng không đi vào công cụ chưa được duyệt.",
      "Đổi tên tệp hoặc xoá vài chữ không làm tệp hết nhạy cảm.",
      "Chưa có quy định nghĩa là chưa ai đồng ý: hãy hỏi.",
    ],
    practicePrompt: {
      question:
        "Chị Thu có hai tệp: bảng theo dõi chi phí văn phòng phẩm của cả phòng (không có dữ liệu cá nhân) và bảng thưởng cuối năm theo từng nhân viên. Chị muốn nhờ trợ lý tóm tắt. Nên làm gì?",
      options: [
        "Tóm tắt bảng văn phòng phẩm, để bảng thưởng ở ngoài",
        "Tải cả hai tệp vì chị không định chia sẻ kết quả cho ai",
        "Tải cả hai nhưng xoá cột tên nhân viên ở bảng thưởng trước khi tải",
        "Không tải tệp nào cho đến khi công ty có công cụ chính thức riêng",
      ],
      correct: 0,
      explanation:
        "Bảng chi phí chung không chứa dữ liệu cá nhân nên thuộc ngăn thoải mái (nếu công cụ đã được duyệt). Bảng thưởng gắn người với số tiền nên không tải. Không chia sẻ kết quả không làm dữ liệu đã tải biến mất. Xoá cột tên vẫn có thể lộ danh tính qua chức vụ và số tiền. Không dùng gì cả thì bỏ phí cả tệp vô hại.",
    },
    summary: {
      keyIdea: "Phân loại trước khi tải: mỗi tệp thuộc ngăn thoải mái, hỏi trước, hoặc không tải.",
      formula: "Chính sách công ty + mức nhạy cảm của từng tệp = quyết định tải hay không.",
      commonMistake: "Đổi tên tệp hoặc xoá vài chữ rồi coi như đã an toàn.",
      action: "Mở một thư mục bạn hay dùng và gắn nhãn ba ngăn cho 10 tệp đầu tiên.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một thư mục công việc thật của bạn và liệt kê 10 tệp đầu tiên. Bên cạnh mỗi tệp, ghi một trong ba nhãn: thoải mái, hỏi trước, không tải. Với mỗi tệp nhãn 'hỏi trước', viết một câu hỏi gửi cho bộ phận công nghệ thông tin. Chưa cần tải bất kỳ tệp nào.",
      secondary: "Ghi lại tệp nào khiến bạn phân vân nhất để hỏi sếp hoặc bộ phận công nghệ thông tin.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn mở thư mục chung, định nhờ trợ lý đọc một tệp, và thấy bảng lương nằm ngay cạnh biên bản họp. Một cú bấm tải nhầm là xong và không rút lại được. Bài này cho bạn ba ngăn kéo để xếp trước khi bấm.",
      },
      {
        type: "feynman",
        title: "Phân loại tài liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cách bạn xử lý giấy tờ trong nhà: hoá đơn tiền điện vứt được, giấy tờ xe cất trong ngăn kéo, sổ đỏ để két. Bạn không nghĩ lâu, bạn chỉ hỏi: lộ ra thì ai bị ảnh hưởng và nặng đến đâu.",
        columns: ["Mức", "Giấy tờ trong nhà", "Tài liệu ở công việc"],
        rows: [
          ["Thoải mái", "Hoá đơn tiền điện cũ", "Bài đã đăng trên website, bản hướng dẫn chung"],
          ["Hỏi trước", "Giấy tờ xe", "Biên bản họp nội bộ, báo cáo chưa công bố"],
          ["Tuyệt đối không", "Sổ đỏ, giấy tờ tuỳ thân", "Bảng lương, hồ sơ cá nhân, hợp đồng khách hàng"],
          ["Cách xử lý", "Bỏ, cất, hoặc đưa két", "Dùng, hỏi, hoặc giữ ngoài công cụ"],
        ],
        oneLiner: "Không cần nhớ danh sách dài - chỉ hỏi: nếu tệp này lộ ra, ai bị ảnh hưởng và nặng đến đâu?",
      },
      { type: "heading", text: "Vì sao tải lên khác với gửi email" },
      {
        type: "paragraph",
        text: "Khi bạn tải một tệp lên một công cụ bên ngoài, nội dung đi ra khỏi hệ thống của công ty. Công cụ có giữ hay không, dùng vào việc gì, ai trong công ty đó xem được, tuỳ chính sách từng nơi và không phải lúc nào bạn cũng biết. Vì vậy câu hỏi đầu tiên không phải tệp này có hữu ích không mà là công ty tôi cho phép gì.",
      },
      {
        type: "flow",
        title: "Từ thư mục lộn xộn tới ba ngăn kéo",
        steps: [
          { label: "Xem chính sách công ty", detail: "Tìm quy định về công cụ trợ lý và loại dữ liệu được dùng. Chưa có quy định thì hỏi bộ phận công nghệ thông tin." },
          { label: "Liệt kê từng tệp", detail: "Ghi tên tệp và một câu: trong tệp có tên người, số tiền, điều khoản hay bí mật kinh doanh không." },
          { label: "Gắn nhãn ba mức", detail: "Đã công bố thì thoải mái; nội bộ chung thì hỏi trước; dữ liệu cá nhân, tài chính, hợp đồng thì không tải." },
          { label: "Hành động theo nhãn", detail: "Chỉ tải nhóm thoải mái, gửi câu hỏi cho nhóm giữa, giữ nhóm cấm ngoài công cụ." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản phân loại do trợ lý gợi ý",
        task: "Chính sách công ty (bạn có bản gốc) chỉ nói: chỉ dùng công cụ đã được công ty duyệt; không đưa dữ liệu cá nhân của nhân viên hay khách hàng vào công cụ; tài liệu hợp đồng cần hỏi pháp chế. Bạn nhờ trợ lý gợi ý cách xếp ba tệp. Đánh dấu những câu trợ lý tự thêm.",
        segments: [
          { text: "Bảng lương có tên nhân viên thuộc nhóm không tải, vì có dữ liệu cá nhân." },
          { text: "Hợp đồng khách hàng cần hỏi bộ phận pháp chế trước khi dùng." },
          {
            text: "Chính sách cho phép tải hợp đồng nếu đã che số tiền bằng ký hiệu.",
            error: "Bản gốc chỉ nói hợp đồng cần hỏi pháp chế, không nhắc việc che số tiền là đủ. Trợ lý tự thêm một ngoại lệ không có thật.",
          },
          { text: "Bài đăng đã công bố trên website có thể dùng nếu công cụ đã được duyệt." },
          {
            text: "Theo quy định mới nhất của công ty năm nay, mọi công cụ trợ lý đều được dùng với tệp nội bộ.",
            error: "Bản gốc yêu cầu công cụ đã được duyệt. Cụm 'quy định mới nhất năm nay' là chi tiết trợ lý bịa để nghe có căn cứ.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Phân loại trước khi tải",
          text: "Mất vài phút nhưng biết rõ tệp nào đi. Có câu hỏi cụ thể để gửi bộ phận công nghệ thông tin. Nếu có chuyện, bạn chứng minh được mình đã làm đúng quy trình.",
        },
        right: {
          label: "Tải trước, nghĩ sau",
          text: "Nhanh lúc đầu. Nhưng không rút lại được và bạn không biết dữ liệu đi đâu. Khi bị hỏi, bạn chỉ có câu 'tôi không nghĩ nó nhạy cảm'.",
        },
      },
      {
        type: "callout",
        label: "Khi chưa chắc, hãy hỏi",
        text: "Nếu tệp nằm lưng chừng, ví dụ báo cáo nội bộ chưa công bố, đừng tự đoán. Gửi cho bộ phận công nghệ thông tin hoặc quản lý một câu: tôi muốn dùng công cụ X với loại tài liệu Y, có được không. Việc liên quan tới pháp lý, hỏi bộ phận pháp chế.",
      },
      {
        type: "scenario",
        title: "Bốn tệp trong thư mục chung",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần tóm tắt nhanh một báo cáo quý. Thư mục có báo cáo, bảng lương và hợp đồng của khách hàng lớn. Công ty có một công cụ trợ lý đã được duyệt.",
            choices: [
              { label: "Tải cả thư mục lên công cụ cho trợ lý có đủ ngữ cảnh", next: "bad_all" },
              { label: "Mở chính sách công ty và xếp từng tệp vào ba ngăn", next: "s2" },
            ],
          },
          bad_all: {
            text: "Công cụ đã duyệt nhưng chính sách vẫn cấm dữ liệu cá nhân. Bộ phận công nghệ thông tin phát hiện bảng lương nằm trong lịch sử tải lên và bạn phải giải trình.",
            ending: "bad",
          },
          s2: {
            text: "Chính sách nói công cụ được dùng với tài liệu nội bộ chung, còn dữ liệu cá nhân và hợp đồng thì cần hỏi. Báo cáo quý chưa công bố.",
            choices: [
              { label: "Tải báo cáo vì nó chỉ là nội bộ chung, để hai tệp kia ở ngoài", next: "good" },
              { label: "Tải cả hợp đồng sau khi xoá tên khách, vì báo cáo cần so sánh với nó", next: "bad_contract" },
            ],
          },
          bad_contract: {
            text: "Hợp đồng vẫn có số tiền và điều khoản nhận ra được khách. Pháp chế cho biết hợp đồng có điều khoản bảo mật nên lẽ ra phải hỏi trước.",
            ending: "bad",
          },
          good: {
            text: "Bạn tóm tắt xong báo cáo quý, gửi câu hỏi về hợp đồng cho pháp chế và không tệp nhạy cảm nào rời khỏi máy.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mở chính sách công ty, tìm phần công cụ và dữ liệu.",
          "Bước 2 - Liệt kê tệp và gắn nhãn thoải mái, hỏi trước, không tải.",
          "Bước 3 - Chỉ tải nhóm thoải mái, gửi câu hỏi cho nhóm hỏi trước.",
          "Bước 4 - Nhóm không tải: tự đọc hoặc làm trên bản đã che (bài sau).",
        ],
      },
      {
        type: "closing",
        lines: [
          "Xem chính sách, phân loại, rồi mới bấm tải.",
          "Bài sau: che thông tin nhạy cảm để vẫn hỏi được mà không lộ.",
        ],
      },
    ],
  },
  {
    id: 2296,
    slug: "che-thong-tin-nhay-cam-truoc-khi-dua-vao-cong-cu",
    title: "Chặng 44, Bài 17: Che thông tin nhạy cảm trước khi đưa vào công cụ",
    subtitle: "Thay tên và số bằng ký hiệu, kiểm lại tệp - rồi hỏi về hợp đồng mà không lộ ai là ai.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🖍️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn vẫn cần hỏi trợ lý về một hợp đồng: điều khoản thanh toán có bất thường không, hạn giao hàng có rủi ro không. Nhưng hợp đồng có tên công ty, tên người ký, số tiền, số tài khoản. Che đúng cách cho bạn câu trả lời mà không đưa những thứ đó ra ngoài - che sai thì tưởng an toàn mà vẫn lộ.",
    openingQuestion:
      "Bạn muốn hỏi về điều khoản phạt trễ hạn trong một hợp đồng, nhưng hợp đồng có tên hai công ty, số tiền và số tài khoản. Cách nào che hợp lý nhất?",
    openingOptions: [
      "Thay tên, số tiền, số tài khoản bằng ký hiệu rồi kiểm lại toàn tệp",
      "Chỉ thay tên công ty ở trang đầu, các trang còn lại để nguyên như cũ cho nhanh",
      "Tô đen bằng công cụ vẽ rồi lưu thành ảnh, nhìn không thấy nữa",
      "Bỏ hẳn hợp đồng và mô tả bằng lời chung chung cho trợ lý đoán",
    ],
    correctOption: 0,
    explanation:
      "Thay từng loại thông tin bằng ký hiệu thống nhất (BÊN A, SỐ TIỀN 1, TÀI KHOẢN X) giữ nguyên cấu trúc điều khoản nên trợ lý vẫn phân tích được, rồi kiểm lại toàn tệp vì tên thường xuất hiện ở nhiều chỗ. Chỉ thay trang đầu bỏ sót phần còn lại. Tô đen trên ảnh có thể để lại chữ ở lớp dưới hoặc trong thông tin ẩn của tệp. Mô tả chung chung khiến trợ lý trả lời chung chung vì không có câu chữ thật để đọc.",
    diagram: [
      { label: "Xác định loại thông tin cần che: tên, số tiền, tài khoản", arrow: true },
      { label: "Thay bằng ký hiệu, giữ bảng đối chiếu ở máy bạn", arrow: true },
      { label: "Kiểm lại toàn tệp, cả đầu trang, chân trang, thông tin ẩn", arrow: true },
      { label: "Tải bản đã che, hỏi, rồi đối chiếu ngược khi dùng câu trả lời" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên mua hàng cần hỏi về điều khoản phạt trễ hạn trong hợp đồng cung cấp. Anh thay tên hai công ty thành BÊN A và BÊN B, số tiền thành SỐ TIỀN 1 và 2, giữ một bảng đối chiếu ở máy. Sau khi tìm lại toàn tệp, anh còn thấy tên công ty trong chân trang và đổi nốt trước khi tải.",
    },
    quiz: [
      Q(
        "Vì sao nên thay tên bằng ký hiệu như BÊN A thay vì xoá hẳn đi?",
        [
          "Ký hiệu giữ được cấu trúc câu để trợ lý vẫn hiểu ai làm gì",
          "Ký hiệu làm trợ lý tự hiểu đây là dữ liệu bí mật",
          "Xoá hẳn thì tệp không lưu được và bạn phải làm lại",
          "Ký hiệu giúp trợ lý bỏ qua mọi số liệu còn lại trong tệp",
        ],
        "Nếu xoá hẳn, câu trở nên cụt và không rõ chủ thể. Ký hiệu nhất quán cho phép trợ lý phân tích quan hệ giữa các bên. Trợ lý không tự hiểu ký hiệu là bí mật, tệp lưu được dù thiếu tên, và ký hiệu không làm nó bỏ qua số liệu khác.",
      ),
      Q(
        "Sau khi che xong, bước nào không thể bỏ qua trước khi tải?",
        [
          "Tìm lại toàn tệp để chắc tên và số không còn sót chỗ nào",
          "Đọc lại đúng trang đầu, vì nó chứa phần lớn thông tin nhạy cảm",
          "Đổi đuôi tệp sang định dạng khác cho trợ lý khó đọc hơn",
          "Hỏi trợ lý xem tệp còn thông tin nhạy cảm hay không",
        ],
        "Tên công ty thường lặp ở nhiều nơi: chân trang, phụ lục, chữ ký. Tìm toàn tệp bắt được những chỗ đó. Trang đầu không phải chỗ duy nhất, đổi đuôi tệp không che thông tin, và đưa tệp cho trợ lý để hỏi nghĩa là đã tải lên rồi.",
      ),
      Q(
        "Bảng đối chiếu (BÊN A = tên thật) nên được giữ ở đâu?",
        [
          "Trên máy của bạn, không đưa vào công cụ",
          "Trong cùng tệp đã che để tiện tra cứu lại",
          "Trong khung chat cùng lúc để trợ lý nhớ ký hiệu",
          "Ở phụ lục cuối bản đã che, in nhỏ một chút",
        ],
        "Bảng đối chiếu là chìa khoá giải mã. Đặt nó cùng tệp hoặc cùng khung chat là đưa luôn phần che ra ngoài, nên nó phải nằm ở nơi bạn kiểm soát. Trợ lý không cần nó để phân tích, và in nhỏ không làm chữ biến mất.",
      ),
      Q(
        "Sau khi trợ lý trả lời 'BÊN A chịu phạt SỐ TIỀN 1 nếu trễ hạn', bạn nên làm gì?",
        [
          "Đối chiếu ký hiệu với bản gốc để chắc điều khoản đúng như trợ lý nói",
          "Chép nguyên câu đó vào email gửi khách, vì trợ lý đã đọc hợp đồng",
          "Bỏ câu trả lời, vì ký hiệu nghĩa là trợ lý chưa thực sự hiểu hợp đồng",
          "Hỏi trợ lý thêm lần nữa, nếu lần sau giống thì coi như đã đúng",
        ],
        "Trợ lý có thể đọc lệch điều khoản nên bạn luôn mở bản gốc đối chiếu ký hiệu. Chép thẳng vào email bỏ bước kiểm. Bỏ câu trả lời là bỏ phí. Hai lần giống nhau không chứng minh đúng: nó có thể sai giống nhau.",
      ),
      Q(
        "Khi nào che thông tin vẫn chưa đủ và bạn phải dừng để hỏi?",
        [
          "Khi tài liệu có điều khoản bảo mật hoặc chính sách cấm dùng công cụ",
          "Khi tài liệu dài hơn mười trang và có nhiều bảng số liệu",
          "Khi bạn dùng nhiều hơn năm ký hiệu khác nhau trong cùng tệp",
          "Khi trợ lý trả lời chậm hơn bình thường vì tệp quá nặng",
        ],
        "Che là biện pháp của bạn, còn chính sách và điều khoản bảo mật là ràng buộc của công ty. Nếu chúng cấm thì che không thay được việc hỏi. Độ dài, số ký hiệu và tốc độ trả lời không liên quan tới việc được phép hay không.",
      ),
    ],
    keyTakeaways: [
      "Thay tên, số tiền, tài khoản bằng ký hiệu thống nhất, đừng xoá hẳn.",
      "Giữ bảng đối chiếu trên máy bạn, không đưa vào công cụ.",
      "Tìm lại toàn tệp, cả chân trang và phụ lục, trước khi tải.",
      "Che không thay được việc hỏi khi chính sách hay điều khoản cấm.",
      "Đối chiếu câu trả lời với bản gốc trước khi dùng.",
    ],
    practicePrompt: {
      question:
        "Anh Nam che tên khách trong hợp đồng ở trang đầu và tải lên. Trợ lý trả lời nhắc tới 'Công ty Tân Phát' mà anh đã che. Điều gì có thể đã xảy ra?",
      options: [
        "Tên vẫn còn ở trang sau hoặc chân trang mà anh chưa tìm lại",
        "Trợ lý tự đoán tên thật từ kiến thức chung về mọi công ty trên mạng",
        "Công cụ lưu sẵn tên khách của anh từ những lần dùng trước",
        "Ký hiệu BÊN A luôn bị công cụ tự đổi lại thành tên thật",
      ],
      correct: 0,
      explanation:
        "Che một chỗ không che các chỗ khác; đây chính là lý do phải tìm lại toàn tệp. Trợ lý không đoán được tên khách từ hư không. Giả thuyết công cụ lưu sẵn tên và tự đổi ký hiệu thì không có căn cứ trong tình huống này, và sẽ là vấn đề chính sách chứ không phải của cách che.",
    },
    summary: {
      keyIdea: "Che bằng ký hiệu thống nhất, kiểm toàn tệp, giữ bảng đối chiếu ở máy mình.",
      formula: "Ký hiệu thay tên và số + tìm lại toàn tệp + đối chiếu ngược = hỏi được mà không lộ.",
      commonMistake: "Che trang đầu rồi tải lên, bỏ sót tên ở chân trang và phụ lục.",
      action: "Lấy một tài liệu mẫu, thay mọi tên và số bằng ký hiệu, tìm lại toàn tệp để kiểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một hợp đồng hoặc email dài bạn đã có, làm bản sao, rồi thay mọi tên, số tiền và số tài khoản bằng ký hiệu. Lập bảng đối chiếu trong một tệp riêng. Dùng chức năng tìm của phần mềm để kiểm mỗi tên gốc đã biến mất khỏi bản sao. Chưa cần tải lên đâu cả.",
      secondary: "Ghi lại bao nhiêu chỗ bạn bỏ sót ở lần che đầu tiên.",
    },
    sections: [
      {
        type: "lead",
        text: "Hợp đồng nằm trên bàn, câu hỏi nằm trong đầu: phạt trễ hạn tính thế nào? Bạn muốn hỏi trợ lý nhưng tên công ty, số tiền và tài khoản ở khắp nơi. Bài này dạy cách che để hỏi được mà không lộ.",
      },
      {
        type: "feynman",
        title: "Che thông tin đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc hỏi bác sĩ quen qua điện thoại về bệnh của một người bạn: bạn nói 'một người quen, 50 tuổi, bị thế này' mà không nói tên. Câu hỏi vẫn rõ, còn danh tính thì ở lại với bạn.",
        columns: ["Thành phần", "Hỏi bác sĩ", "Hỏi trợ lý về hợp đồng"],
        rows: [
          ["Giữ lại", "Triệu chứng, tuổi", "Cấu trúc điều khoản, quan hệ giữa các bên"],
          ["Che đi", "Tên người bệnh", "Tên công ty, số tiền, số tài khoản"],
          ["Cách gọi thay", "Một người quen", "BÊN A, SỐ TIỀN 1, TÀI KHOẢN X"],
          ["Ai biết thật", "Chỉ bạn", "Chỉ bạn, qua bảng đối chiếu"],
        ],
        oneLiner: "Giữ lại cái cần để hiểu câu hỏi, che đi cái giúp người ta biết đó là ai.",
      },
      { type: "heading", text: "Che cái gì, giữ cái gì" },
      {
        type: "paragraph",
        text: "Không phải thứ gì cũng cần che. Trợ lý cần cấu trúc điều khoản để phân tích: ai làm gì, trong bao lâu, nếu trễ thì sao. Thứ cần che là thứ giúp người khác nhận ra ai là ai hoặc lấy được tiền: tên, số tiền thật, số tài khoản, địa chỉ, số điện thoại. Mỗi loại một ký hiệu, dùng thống nhất từ đầu đến cuối.",
      },
      {
        type: "flow",
        title: "Che một tài liệu trong bốn bước",
        steps: [
          { label: "Gạch chân các loại thông tin nhạy cảm", detail: "Tên bên ký, tên người, số tiền, số tài khoản, địa chỉ. Đọc cả phụ lục và chân trang." },
          { label: "Thay bằng ký hiệu thống nhất", detail: "Mỗi bên một ký hiệu (BÊN A, BÊN B), mỗi số tiền một nhãn (SỐ TIỀN 1, SỐ TIỀN 2). Lập bảng đối chiếu ở tệp riêng trên máy bạn." },
          { label: "Tìm lại toàn tệp", detail: "Dùng chức năng tìm với từng tên và số gốc, bao gồm chân trang, đầu trang và chú thích." },
          { label: "Tải bản che, đối chiếu khi dùng", detail: "Khi có câu trả lời, mở bản gốc và đối chiếu ký hiệu với điều khoản thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Hỏi về hợp đồng đã che",
        task: "Bạn đã che hợp đồng (BÊN A, BÊN B, SỐ TIỀN 1). Lắp prompt để hỏi về điều khoản phạt trễ hạn mà không làm lộ dữ liệu.",
        parts: [
          {
            id: "doc",
            label: "Tài liệu đưa vào",
            options: [
              { text: "Bản hợp đồng gốc, vì trợ lý sẽ đọc chính xác hơn.", feedback: "Bản gốc mang tên công ty và số tiền thật ra ngoài, đúng thứ bạn định che." },
              { text: "Bản đã che bằng ký hiệu BÊN A, BÊN B, SỐ TIỀN 1, và bảng đối chiếu ở lại máy bạn.", good: true, feedback: "Cấu trúc điều khoản còn nguyên, danh tính ở lại với bạn." },
            ],
          },
          {
            id: "ask",
            label: "Câu hỏi",
            options: [
              { text: "Hợp đồng này có ổn không?", feedback: "Câu hỏi quá rộng, trợ lý trả lời chung chung và có thể nói điều nghe hợp lý nhưng không dựa vào điều khoản." },
              { text: "Chỉ dựa vào điều khoản 5 trong bản này: nếu BÊN A trễ hạn thì bị phạt thế nào? Trích nguyên câu rồi giải thích.", good: true, feedback: "Phạm vi rõ và yêu cầu trích nguyên câu, bạn đối chiếu được." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu thiếu thông tin thì đoán cho hợp lý.", feedback: "Cho phép đoán là mời trợ lý bịa điều khoản không có trong tệp." },
              { text: "Nếu điều khoản không ghi rõ, nói là không ghi rõ; không suy diễn, không đưa lời khuyên pháp lý.", good: true, feedback: "Chỗ thiếu được nói thẳng và quyết định pháp lý vẫn dành cho người có chuyên môn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["doc", "ask", "limit"],
            text: "Điều khoản 5: \"Nếu BÊN A giao hàng trễ hơn 7 ngày so với thời hạn ghi trong phụ lục 1, BÊN A chịu phạt theo tỷ lệ ghi tại SỐ TIỀN 2.\" Hợp đồng không nêu mức trần phạt. Phần này nên hỏi pháp chế.",
          },
          {
            requires: ["doc"],
            text: "Hợp đồng này thường có mức phạt 0,5% mỗi ngày trễ, tối đa 8% giá trị hợp đồng...\n\n(Không được yêu cầu bám điều khoản nên trợ lý bịa tỷ lệ và mức trần.)",
          },
          {
            text: "Hợp đồng giữa Công ty Tân Phát và Công ty Hải Long cho thấy mức phạt 45 triệu đồng khi trễ hạn...\n\n(Bản gốc đã được tải lên, tên và số tiền thật ra ngoài công cụ.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Che bằng ký hiệu thống nhất",
          text: "Trợ lý vẫn hiểu ai làm gì. Bạn dịch ngược được nhờ bảng đối chiếu. Một bảng kiểm dùng lại cho mọi hợp đồng.",
        },
        right: {
          label: "Xoá hẳn hoặc tô đen qua loa",
          text: "Câu cụt, trợ lý khó hiểu. Tô đen trên ảnh hoặc che một trang đầu để sót nhiều chỗ khác, nên bạn tưởng an toàn mà vẫn lộ.",
        },
      },
      {
        type: "callout",
        label: "Che không thay cho việc hỏi",
        text: "Nếu chính sách công ty hoặc điều khoản bảo mật trong hợp đồng cấm đưa nội dung ra ngoài, bản che cũng có thể vẫn nằm trong diện cấm. Khi đó hỏi bộ phận pháp chế hoặc công nghệ thông tin, đừng tự coi là đủ.",
      },
      {
        type: "scenario",
        title: "Trước giờ tải bản hợp đồng đã che",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa thay mọi tên và số trong hợp đồng bằng ký hiệu. Công cụ đã được duyệt, còn 10 phút trước khi họp.",
            choices: [
              { label: "Tải lên ngay vì thời gian gấp và trang đầu đã che kỹ", next: "bad_fast" },
              { label: "Tìm lại toàn tệp bằng từng tên và số gốc trước khi tải", next: "s2" },
            ],
          },
          bad_fast: {
            text: "Tên công ty vẫn nằm trong chân trang của mọi trang. Trợ lý nhắc tới tên đó trong câu trả lời và bạn mới nhận ra đã tải bản chưa che hết.",
            ending: "bad",
          },
          s2: {
            text: "Tìm lại thấy còn tên ở chân trang và một số tài khoản trong phụ lục. Bạn thay nốt rồi tải bản che lên.",
            choices: [
              { label: "Đối chiếu ký hiệu với bản gốc rồi mới đem câu trả lời vào cuộc họp", next: "good" },
              { label: "Đem nguyên câu trả lời vào họp vì trợ lý đã đọc kỹ tệp", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Trợ lý đọc lệch một điều khoản, bạn nói sai mức phạt trong họp và đồng nghiệp đọc lại hợp đồng gốc mới thấy.",
            ending: "bad",
          },
          good: {
            text: "Bạn mở bản gốc, thấy câu trả lời khớp điều khoản 5 và vào họp với trích dẫn chính xác.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gạch chân tên, số tiền, số tài khoản, địa chỉ.",
          "Bước 2 - Thay bằng ký hiệu, giữ bảng đối chiếu trên máy.",
          "Bước 3 - Tìm lại toàn tệp với từng tên và số gốc.",
          "Bước 4 - Tải bản che, rồi đối chiếu câu trả lời với bản gốc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Che đủ, kiểm kỹ, đối chiếu ngược.",
          "Bài sau: chia sẻ sổ tay tài liệu với đồng nghiệp sao cho an toàn.",
        ],
      },
    ],
  },
  {
    id: 2297,
    slug: "chia-se-so-tay-voi-dong-nghiep-an-toan",
    title: "Chặng 44, Bài 18: Chia sẻ sổ tay tài liệu với đồng nghiệp an toàn",
    subtitle: "Ai được xem, ai được sửa, và câu hỏi nào gửi bộ phận công nghệ thông tin trước khi mời cả nhóm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã dựng một bộ tài liệu ở chỗ trợ lý đọc được và cả nhóm muốn dùng chung. Mời cả phòng chỉ mất một cú bấm, nhưng nếu trong đó có tài liệu không phải ai cũng được xem, hoặc người sửa làm hỏng bộ tài liệu, bạn là người phải sửa. Vài câu hỏi trước khi mời rẻ hơn nhiều so với gỡ rối sau đó.",
    openingQuestion:
      "Bạn dựng xong bộ tài liệu quy trình cho nhóm 8 người. Bạn định mời cả nhóm. Điều nên làm trước khi mời là gì?",
    openingOptions: [
      "Xem từng tài liệu ai cần xem, rồi cho quyền xem trước quyền sửa",
      "Mời cả nhóm với quyền sửa để ai thấy sai thì sửa luôn cho nhanh",
      "Mời thêm cả phòng ban khác cho nhiều người góp ý hơn là tốt",
      "Gửi liên kết vào nhóm chat chung để ai cần thì tự mở ra xem",
    ],
    correctOption: 0,
    explanation:
      "Nguyên tắc quyền tối thiểu: mỗi người nhận đúng mức họ cần. Hầu hết người dùng chỉ cần xem, một hai người giữ quyền sửa. Cho cả nhóm quyền sửa thì một cú xoá nhầm cũng mất tài liệu của mọi người. Mời thêm phòng ban khác làm lan rộng những thứ có thể nhạy cảm với họ. Liên kết trong nhóm chat chung có thể bị chuyển tiếp cho người ngoài nhóm mà bạn không kiểm soát được.",
    diagram: [
      { label: "Rà từng tài liệu trong bộ: ai cần xem", arrow: true },
      { label: "Chia vai: người xem, người sửa, người quản lý", arrow: true },
      { label: "Hỏi công nghệ thông tin về quy định chia sẻ", arrow: true },
      { label: "Mời đúng người, đúng quyền, rồi định kỳ rà lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm dựng bộ tài liệu quy trình cho 8 người. Anh chia ba vai: 6 người chỉ xem, 1 người duyệt nội dung được sửa, và chính anh quản lý. Trước khi mời, anh hỏi bộ phận công nghệ thông tin về quy định chia sẻ và gỡ hai tài liệu có dữ liệu khách hàng ra khỏi bộ.",
    },
    quiz: [
      Q(
        "Nguyên tắc nào nên dùng khi quyết định quyền cho từng người trong nhóm?",
        [
          "Mỗi người chỉ nhận mức quyền tối thiểu đủ cho việc của họ",
          "Cho quyền cao nhất cho mọi người để không ai phải xin lại",
          "Quyền tuỳ thuộc vào ai làm lâu năm nhất trong nhóm",
          "Cho quyền sửa trước rồi thu hồi khi có chuyện xảy ra",
        ],
        "Quyền tối thiểu giảm rủi ro: một người xem thì không thể xoá nhầm. Cho quyền cao để tiện làm mất kiểm soát. Thâm niên không liên quan tới nhu cầu sửa, và thu hồi khi đã có chuyện là quá muộn vì tài liệu có thể đã mất hay lan đi.",
      ),
      Q(
        "Trong bộ tài liệu có một tệp chứa dữ liệu khách hàng. Nên xử lý thế nào trước khi mời nhóm?",
        [
          "Gỡ tệp ra hoặc hỏi ai được phép xem",
          "Để nguyên và dặn nhóm đừng mở ra",
          "Đổi tên tệp thành từ ít gây chú ý hơn trong danh sách",
          "Mời nhóm trước và gỡ tệp nếu có ai phản ánh lên",
        ],
        "Dặn miệng không ngăn được người mở nhầm hay chuyển tiếp. Đổi tên tệp không đổi nội dung bên trong, và chờ phản ánh nghĩa là dữ liệu đã bị xem. Gỡ hoặc xác định người được xem là cách kiểm soát thực sự.",
      ),
      Q(
        "Vì sao gửi liên kết vào nhóm chat chung là cách chia sẻ kém an toàn?",
        [
          "Người trong nhóm chat có thể chuyển tiếp liên kết cho người ngoài nhóm mà bạn không biết",
          "Liên kết trong nhóm chat luôn hết hạn sau đúng một ngày kể từ lúc được gửi",
          "Nhóm chat làm liên kết hỏng nên bạn phải tạo lại liên kết mới mỗi tuần",
          "Nhóm chat chỉ gửi được liên kết tới tối đa ba người xem cùng một lúc",
        ],
        "Điều khó kiểm soát là việc liên kết đi xa hơn dự định. Không có quy tắc chung nào nói liên kết hết hạn sau một ngày, nhóm chat không làm hỏng liên kết, và cũng không giới hạn ba người.",
      ),
      Q(
        "Ai nên là người có quyền sửa bộ tài liệu dùng chung?",
        [
          "Một hai người chịu trách nhiệm nội dung",
          "Mọi thành viên nhóm để nội dung luôn mới nhất",
          "Người mới vào nhóm để họ học quy trình nhanh hơn",
          "Không ai, vì tài liệu đã đưa vào thì không đổi nữa",
        ],
        "Ít người sửa thì lịch sử thay đổi rõ và nội dung nhất quán. Mọi người cùng sửa dễ dẫn tới sửa chồng nhau. Người mới học bằng cách xem, không cần quyền sửa. Tài liệu không bao giờ đổi sẽ lỗi thời nhanh.",
      ),
      Q(
        "Công ty có quy định riêng về chia sẻ tài liệu ra ngoài nhóm. Bạn nên làm gì?",
        [
          "Hỏi bộ phận công nghệ thông tin và làm theo quy định đó",
          "Bỏ qua vì đây là tài liệu của nhóm bạn chứ không phải công ty",
          "Xem bản của công ty nhưng chỉ áp dụng khi có người kiểm tra",
          "Tự đặt quy tắc riêng cho nhóm, chặt hơn một chút là đủ rồi",
        ],
        "Tài liệu làm việc là tài sản công ty nên quy định chung áp dụng. Chỉ làm đúng khi bị kiểm tra nghĩa là không tuân thủ thực sự, còn tự đặt quy tắc riêng có thể mâu thuẫn với quy định thật, kể cả khi bạn tự thấy nó chặt hơn.",
      ),
    ],
    keyTakeaways: [
      "Quyền tối thiểu: hầu hết người chỉ cần xem.",
      "Một hai người giữ quyền sửa và chịu trách nhiệm nội dung.",
      "Rà từng tài liệu trong bộ trước khi mời, gỡ những tệp không phải ai cũng được xem.",
      "Liên kết trong nhóm chat chung có thể lan ra ngoài ý muốn.",
      "Hỏi bộ phận công nghệ thông tin về quy định chia sẻ của công ty.",
    ],
    practicePrompt: {
      question:
        "Chị Mai muốn cả phòng 12 người dùng chung một bộ tài liệu. Chị định mời tất cả với quyền sửa cho nhanh. Bạn khuyên gì?",
      options: [
        "Cho 11 người quyền xem, chị và một người duyệt giữ quyền sửa",
        "Đồng ý vì nhóm đã quen làm việc với nhau nên sẽ không ai sửa bậy",
        "Cho quyền sửa trong tuần đầu rồi hạ xuống quyền xem sau đó",
        "Chỉ mời 3 người đầu tiên, còn lại tự xin khi nào cần tới",
      ],
      correct: 0,
      explanation:
        "Chia vai làm rủi ro giảm mà ai cần vẫn dùng được. Quen nhau không ngăn được lần xoá nhầm vô ý. Quyền sửa tuần đầu chính là lúc dễ nhầm nhất vì mọi người còn làm quen. Chỉ mời 3 người làm phần còn lại của phòng thiếu công cụ mà không giải quyết được gì về quyền.",
    },
    summary: {
      keyIdea: "Chia sẻ đúng người, đúng quyền, sau khi rà từng tài liệu và hỏi quy định.",
      formula: "Rà tài liệu + vai xem/sửa + quy định công ty = mời nhóm an toàn.",
      commonMistake: "Mời cả nhóm với quyền sửa và gửi liên kết vào nhóm chat chung.",
      action: "Viết bảng ba cột: người, vai, tài liệu cần dùng, cho nhóm của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nghĩ tới nhóm 3-5 người bạn hay làm cùng. Viết bảng: mỗi người một dòng, ghi vai (xem hay sửa) và tài liệu họ thật sự cần. Gạch tên tài liệu nào không nên cho cả nhóm xem. Viết một câu hỏi gửi bộ phận công nghệ thông tin về quy định chia sẻ tài liệu nội bộ.",
      secondary: "Ghi lại ai trong nhóm nên giữ quyền sửa và vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bộ tài liệu của bạn đã chạy tốt, và cả nhóm muốn dùng chung. Mời cả phòng chỉ mất một cú bấm, nhưng ai xem được gì, ai sửa được gì thì khó sửa lại sau. Bài này giúp bạn quyết định trong năm phút trước khi bấm.",
      },
      {
        type: "feynman",
        title: "Chia sẻ an toàn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chìa khoá nhà: bạn không đưa chìa phòng ngủ cho mọi người đến chơi. Khách được vào phòng khách, người nhà có chìa cửa, chỉ một hai người giữ chìa tủ két. Mỗi người chỉ cầm chìa vừa đủ việc của họ.",
        columns: ["Vai", "Trong nhà", "Trong bộ tài liệu"],
        rows: [
          ["Chỉ xem", "Khách vào phòng khách", "Đọc và hỏi, không sửa được"],
          ["Sửa", "Người nhà có chìa cửa", "Một hai người duyệt nội dung"],
          ["Quản lý", "Người giữ chìa tủ két", "Quyết định ai vào, gỡ tài liệu nhạy cảm"],
          ["Nguyên tắc", "Chỉ đưa chìa vừa đủ", "Quyền tối thiểu cho mỗi người"],
        ],
        oneLiner: "Mỗi người cầm đúng chìa họ cần - không hơn, và bạn là người biết ai đang cầm chìa nào.",
      },
      { type: "heading", text: "Ba câu hỏi trước khi mời" },
      {
        type: "paragraph",
        text: "Trước khi bấm mời, tự hỏi ba điều. Thứ nhất, trong bộ này có tài liệu nào không phải ai cũng được xem không. Thứ hai, ai thật sự cần sửa, ai chỉ cần đọc. Thứ ba, công ty có quy định gì về chia sẻ, và nếu chưa rõ thì hỏi bộ phận công nghệ thông tin câu nào.",
      },
      {
        type: "flow",
        title: "Từ bộ tài liệu tới nhóm được mời",
        steps: [
          { label: "Rà từng tài liệu trong bộ", detail: "Mở từng tệp, hỏi: nếu cả nhóm xem được thì có sao không. Tệp nào có dữ liệu khách hoặc nhân sự thì gỡ hoặc để nhóm riêng." },
          { label: "Chia vai cho từng người", detail: "Viết bảng: người, vai, tài liệu cần dùng. Mặc định là chỉ xem; chỉ những ai duyệt nội dung mới có quyền sửa." },
          { label: "Hỏi bộ phận công nghệ thông tin", detail: "Hỏi quy định về chia sẻ trong và ngoài nhóm, về việc lưu lịch sử thay đổi và cách thu hồi quyền khi ai đó chuyển việc." },
          { label: "Mời và rà lại định kỳ", detail: "Mời đúng người, đúng vai. Mỗi quý xem lại danh sách, rút quyền người đã chuyển bộ phận." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Quyền tối thiểu theo vai",
          text: "Ít người sửa nên lịch sử thay đổi rõ. Người xem không thể xoá nhầm. Tài liệu nhạy cảm được tách ra. Khi có người chuyển việc, bạn biết rút quyền ai.",
        },
        right: {
          label: "Mời tất cả với quyền cao",
          text: "Nhanh lúc đầu, nhưng một cú xoá nhầm mất tài liệu của cả nhóm. Không biết ai đã sửa gì. Khi có người chuyển việc, quyền của họ vẫn còn đó.",
        },
      },
      {
        type: "callout",
        label: "Hỏi bộ phận công nghệ thông tin những gì",
        text: "Ba câu: công ty cho chia sẻ tài liệu trong công cụ này tới ai; có lưu lịch sử thay đổi để khôi phục khi sửa nhầm không; khi một người rời nhóm thì thu hồi quyền thế nào. Nếu liên quan tới dữ liệu khách hàng, hỏi thêm pháp chế.",
      },
      {
        type: "scenario",
        title: "Mời cả nhóm vào bộ tài liệu quy trình",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dựng xong bộ tài liệu cho nhóm 8 người. Trong bộ có một bảng theo dõi khách hàng với tên và số điện thoại. Nhóm đang chờ.",
            choices: [
              { label: "Mời cả nhóm ngay với quyền sửa, bảng khách hàng cũng để lại trong bộ", next: "bad_all" },
              { label: "Rà từng tài liệu trước và tách bảng khách hàng ra khỏi bộ", next: "s2" },
            ],
          },
          bad_all: {
            text: "Một đồng nghiệp xoá nhầm một mục quy trình và không ai biết. Hai tuần sau còn phát hiện cả nhóm đều xem được dữ liệu khách hàng mà chỉ hai người cần.",
            ending: "bad",
          },
          s2: {
            text: "Bộ còn lại toàn tài liệu quy trình. Bạn cần quyết định quyền cho 8 người.",
            choices: [
              { label: "Cho 6 người chỉ xem, 1 người duyệt nội dung được sửa, bạn quản lý", next: "s3" },
              { label: "Cho mọi người quyền sửa, vì tin tưởng đồng nghiệp", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Hai người cùng sửa một mục một lúc, nội dung chồng lên nhau và quy trình cũ bị mất. Không có ai chịu trách nhiệm khôi phục.",
            ending: "bad",
          },
          s3: {
            text: "Bạn gửi câu hỏi cho công nghệ thông tin về quy định chia sẻ. Họ nhắc tới việc rà quyền mỗi quý.",
            choices: [
              { label: "Đặt lời nhắc mỗi quý để rà lại danh sách người có quyền", next: "good" },
              { label: "Bỏ qua, vì nhóm ít người và hiếm khi thay đổi", next: "bad_stale" },
            ],
          },
          bad_stale: {
            text: "Nửa năm sau một người đã chuyển bộ phận vẫn giữ quyền xem toàn bộ tài liệu của nhóm.",
            ending: "bad",
          },
          good: {
            text: "Bộ tài liệu chạy ổn, có lịch sử thay đổi rõ và quyền luôn khớp với người đang ở nhóm.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Rà từng tài liệu, gỡ tệp không phải ai cũng được xem.",
          "Bước 2 - Viết bảng người - vai - tài liệu, mặc định chỉ xem.",
          "Bước 3 - Hỏi bộ phận công nghệ thông tin ba câu về quy định.",
          "Bước 4 - Mời, rồi rà lại quyền mỗi quý.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đúng người, đúng quyền, rà lại định kỳ.",
          "Bài sau: thói quen kiểm trước khi đưa câu trả lời vào báo cáo.",
        ],
      },
    ],
  },
  {
    id: 2298,
    slug: "thoi-quen-kiem-tra-truoc-khi-dua-cau-tra-loi-vao-bao-cao",
    title: "Chặng 44, Bài 19: Thói quen kiểm trước khi đưa câu trả lời vào báo cáo",
    subtitle: "Danh sách kiểm ngắn: nguồn, số liệu, ngữ cảnh - dùng lại mỗi lần.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "✅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Câu trả lời của trợ lý đọc trôi chảy nên rất dễ dán thẳng vào báo cáo. Nhưng báo cáo mang tên bạn, và một con số sai hay một trích dẫn không có thật sẽ quay lại hỏi chính bạn. Một danh sách kiểm ba mục, dùng mỗi lần, mất hai phút và chặn gần hết lỗi kiểu này.",
    openingQuestion:
      "Trợ lý trả lời một đoạn có ba con số và một câu trích từ tài liệu bạn đã tải lên. Bạn sắp đưa vào báo cáo gửi sếp. Bạn nên làm gì trước?",
    openingOptions: [
      "Mở tài liệu gốc, đối chiếu từng số và câu trích, rồi mới đưa vào",
      "Đưa thẳng vào vì trợ lý đã đọc đúng tài liệu bạn vừa tải lên",
      "Hỏi trợ lý 'chắc chưa' và tin nếu nó trả lời là chắc chắn rồi đưa vào",
      "Đưa vào nhưng ghi chú 'do AI viết' để sếp biết mà tự kiểm",
    ],
    correctOption: 0,
    explanation:
      "Đối chiếu với nguồn là cách duy nhất biết câu trả lời khớp hay lệch, vì trợ lý có thể đọc lệch, tính nhầm, hoặc gắn một con số vào nhầm ngữ cảnh. Việc trợ lý đọc đúng tài liệu không bảo đảm nó trích đúng. Hỏi lại 'chắc chưa' chỉ nhận được sự tự tin chứ không phải bằng chứng. Ghi chú do AI viết chuyển việc kiểm sang sếp trong khi báo cáo vẫn mang tên bạn.",
    diagram: [
      { label: "Nhận câu trả lời của trợ lý", arrow: true },
      { label: "Kiểm nguồn: trích dẫn và trang có đúng không", arrow: true },
      { label: "Kiểm số liệu: so với bản gốc, tính lại nếu có phép tính", arrow: true },
      { label: "Kiểm ngữ cảnh: số đó nói về kỳ nào, đối tượng nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhờ trợ lý tóm tắt báo cáo thị trường. Bản tóm tắt ghi 'doanh thu tăng 12%'. Khi đối chiếu, anh thấy con số gốc là của quý trước chứ không phải cả năm, và trang trích dẫn ghi sai trang. Nhờ danh sách kiểm ba mục, anh sửa lại trước khi gửi.",
    },
    quiz: [
      Q(
        "Ba mục nào đủ để lập danh sách kiểm ngắn cho câu trả lời của trợ lý?",
        [
          "Nguồn, số liệu, ngữ cảnh",
          "Độ dài, giọng văn",
          "Tốc độ trả lời, số từ, mức lịch sự",
          "Tên công cụ, thời điểm hỏi, cách đặt câu hỏi",
        ],
        "Ba mục này trả lời ba câu hỏi: trích dẫn có thật không, con số có khớp không, và số đó nói về điều gì. Các mục còn lại liên quan trình bày hoặc quá trình hỏi chứ không chạm vào nội dung đúng hay sai.",
      ),
      Q(
        "Trợ lý ghi 'theo trang 14 của báo cáo'. Kiểm nguồn nghĩa là gì?",
        [
          "Mở trang 14 và xem câu đó có thật ở đó không",
          "Tin trang số vì trợ lý đã đọc cả tệp rồi",
          "Hỏi trợ lý đọc lại trang 14 và xem nó có nhắc lại giống không",
          "Xoá số trang đi cho báo cáo gọn hơn rồi đưa nguyên nội dung vào",
        ],
        "Số trang và trích dẫn là thứ trợ lý dễ bịa hoặc ghi lệch nhưng trông rất chắc chắn. Mở trang ra là bằng chứng. Hỏi lại thì trợ lý có thể nhắc lại chính điều sai, còn xoá số trang chỉ làm bạn mất dấu vết để kiểm.",
      ),
      Q(
        "Báo cáo ghi 'tăng 12%'. Bạn đối chiếu thấy 12% đúng nhưng là của quý 2. Lỗi ở đâu?",
        [
          "Sai ngữ cảnh: số đúng nhưng nói về kỳ khác",
          "Sai số liệu: phải tính lại phép cộng của 12%",
          "Sai nguồn: tài liệu gốc chắc chắn không hề có con số này",
          "Không có lỗi, vì 12% vẫn xuất hiện trong tài liệu gốc rồi",
        ],
        "Con số khớp nhưng gắn sai kỳ thì người đọc hiểu sai dù từng chữ đều có trong nguồn. Đó là lỗi ngữ cảnh. Số liệu không sai, nguồn có con số, và 'vẫn xuất hiện' không đủ khi kỳ đã khác.",
      ),
      Q(
        "Trợ lý tính tổng ba khoản là 41,5 triệu. Bạn nên làm gì?",
        [
          "Tự cộng lại ba khoản từ bản gốc",
          "Nhờ trợ lý cộng lại lần nữa",
          "Tin kết quả vì máy tính thì không bao giờ tính sai",
          "Làm tròn thành 42 triệu cho báo cáo gọn và dễ nhớ",
        ],
        "Trợ lý là mô hình ngôn ngữ chứ không phải máy tính, nên phép tính cần kiểm bằng máy tính thật hoặc bảng tính. Nhờ nó cộng lại có thể ra cùng lỗi, và làm tròn mà không nói rõ làm số lệch khỏi nguồn.",
      ),
      Q(
        "Khi nào có thể bỏ bớt danh sách kiểm?",
        [
          "Không nên bỏ khi câu trả lời đi vào báo cáo mang tên bạn",
          "Khi trợ lý đã trả lời đúng ba lần liên tiếp cho bạn",
          "Khi đoạn trả lời ngắn và chỉ có một con số duy nhất",
          "Khi bạn dùng bản trả phí, vì nó hiếm khi mắc lỗi",
        ],
        "Rủi ro nằm ở chỗ câu trả lời đi vào, không ở chuyện trợ lý từng đúng. Ba lần đúng không đảm bảo lần thứ tư. Một con số sai vẫn là một con số sai, và bản trả phí không miễn trừ việc kiểm.",
      ),
    ],
    keyTakeaways: [
      "Danh sách kiểm ba mục: nguồn, số liệu, ngữ cảnh.",
      "Mở trang hay đoạn gốc để xác nhận trích dẫn, đừng tin số trang trợ lý ghi.",
      "Số đúng nhưng sai kỳ hay sai đối tượng vẫn là lỗi.",
      "Phép tính thì tự tính lại bằng bảng tính hoặc máy tính.",
      "Ghi 'do AI viết' không thay cho việc kiểm.",
    ],
    practicePrompt: {
      question:
        "Anh Đức kiểm xong thấy trích dẫn đúng, số đúng nhưng câu trả lời nói về doanh thu của chi nhánh A trong khi báo cáo của anh nói về cả công ty. Mục nào trong danh sách bị trượt?",
      options: [
        "Ngữ cảnh, vì số đúng nhưng nói về đối tượng khác",
        "Nguồn, vì trích dẫn chắc chắn đã bị trợ lý bịa ra",
        "Số liệu, vì con số bị sai một chữ số ở đâu đó",
        "Không mục nào, vì báo cáo vẫn có cùng loại số",
      ],
      correct: 0,
      explanation:
        "Nguồn và số đều đúng nên chỉ còn ngữ cảnh: chi nhánh A khác cả công ty. Trích dẫn đã đúng nên không phải lỗi nguồn, số đã khớp nên không phải lỗi số liệu, còn 'cùng loại số' chính là cái bẫy: cùng loại nhưng khác đối tượng.",
    },
    summary: {
      keyIdea: "Mỗi câu trả lời đi vào báo cáo phải qua ba mục kiểm: nguồn, số liệu, ngữ cảnh.",
      formula: "Đối chiếu nguồn + tính lại số + xác nhận ngữ cảnh = câu trả lời dùng được.",
      commonMistake: "Tin trích dẫn và số trang vì chúng trông chính xác.",
      action: "Viết danh sách kiểm ba dòng và dán vào ghi chú để dùng mỗi lần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một câu trả lời trợ lý đã đưa bạn tuần này (hoặc nhờ nó tóm tắt một tài liệu bạn có). Với mỗi số liệu và trích dẫn, mở tài liệu gốc và kiểm ba mục: nguồn, số liệu, ngữ cảnh. Ghi ra giấy có bao nhiêu chỗ khớp, bao nhiêu chỗ lệch và lệch kiểu nào.",
      secondary: "Lưu danh sách ba dòng vào ghi chú để dùng cho lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu trả lời của trợ lý đọc trôi chảy và có số trang, có con số, có trích dẫn. Chính vì vậy nó dễ được dán thẳng vào báo cáo. Bài này cho bạn một danh sách kiểm ba mục để mất hai phút mà bắt được phần lớn lỗi.",
      },
      {
        type: "feynman",
        title: "Kiểm câu trả lời đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc nhận hàng ở cổng: bạn không chỉ tin phiếu giao, bạn đối chiếu số thùng, xem tên trên nhãn, xem hàng có đúng loại không. Ba việc ngắn đó chặn gần hết sai sót.",
        columns: ["Việc kiểm", "Khi nhận hàng", "Khi nhận câu trả lời"],
        rows: [
          ["Nguồn", "Hàng đến từ đúng nhà cung cấp", "Trích dẫn và số trang có thật ở tài liệu gốc"],
          ["Số liệu", "Số thùng đủ như phiếu", "Con số khớp bản gốc, phép tính tự tính lại"],
          ["Ngữ cảnh", "Đúng loại hàng, đúng lô", "Đúng kỳ, đúng đối tượng, đúng đơn vị"],
          ["Kết quả", "Ký nhận", "Đưa vào báo cáo"],
        ],
        oneLiner: "Ba việc hai phút: nguồn có thật không, số có khớp không, số đó đang nói về cái gì.",
      },
      { type: "heading", text: "Vì sao ba mục này" },
      {
        type: "paragraph",
        text: "Lỗi của trợ lý thường rơi vào ba chỗ. Nó có thể ghi sai nguồn hoặc số trang nhưng giọng rất chắc chắn. Nó có thể đọc lệch hoặc tính nhầm một con số. Nó có thể lấy một con số đúng nhưng gắn cho sai kỳ hoặc sai đối tượng. Mỗi lỗi ứng với một mục kiểm và bạn chỉ thấy khi mở tài liệu gốc ra.",
      },
      {
        type: "flow",
        title: "Hai phút trước khi dán vào báo cáo",
        steps: [
          { label: "Kiểm nguồn", detail: "Mở đúng trang hoặc đoạn trợ lý nói tới. Câu trích có thật và có cùng nghĩa không. Không tìm được thì xem như chưa có nguồn." },
          { label: "Kiểm số liệu", detail: "So từng con số với bản gốc. Với phép tính, tự tính lại bằng bảng tính hoặc máy tính thay vì tin trợ lý." },
          { label: "Kiểm ngữ cảnh", detail: "Số đó nói về kỳ nào, đối tượng nào, đơn vị nào. Đúng số nhưng sai kỳ hay sai đối tượng vẫn làm người đọc hiểu sai." },
          { label: "Đánh dấu điều chưa chắc", detail: "Điều nào chưa kiểm được thì ghi [cần xác nhận] hoặc bỏ ra khỏi báo cáo." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đoạn tóm tắt trước khi vào báo cáo",
        task: "Tài liệu gốc chỉ nói: doanh thu quý 2 tăng khoảng 12% so với quý 1; chi phí vận chuyển giảm; chưa có số liệu cả năm. Bạn nhờ trợ lý tóm tắt. Đánh dấu những câu trợ lý tự thêm hoặc làm lệch.",
        segments: [
          { text: "Báo cáo nói về kết quả kinh doanh quý 2." },
          { text: "Doanh thu quý 2 tăng khoảng 12% so với quý 1." },
          {
            text: "Doanh thu cả năm dự kiến tăng 12% so với năm ngoái.",
            error: "Bản gốc chỉ nói về quý 2 so với quý 1 và nói rõ chưa có số cả năm. Trợ lý đổi kỳ so sánh và thêm dự báo.",
          },
          { text: "Chi phí vận chuyển có xu hướng giảm." },
          {
            text: "Theo khảo sát của một hiệp hội ngành, mức tăng này cao hơn trung bình thị trường.",
            error: "Bản gốc không có khảo sát hay hiệp hội nào. Đây là chi tiết trợ lý bịa để tăng sức thuyết phục.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm ba mục trước khi dùng",
          text: "Mất hai phút. Bắt được lỗi nguồn, số và ngữ cảnh. Điều nào chưa chắc thì được đánh dấu, báo cáo ít rủi ro hơn.",
        },
        right: {
          label: "Tin vì đọc trôi chảy",
          text: "Không mất thời gian lúc đầu. Nhưng số sai hay trích dẫn không có thật chỉ lộ ra khi sếp hoặc khách hỏi nguồn, và lúc đó bạn là người trả lời.",
        },
      },
      {
        type: "callout",
        label: "Trợ lý không phải máy tính",
        text: "Trợ lý viết chữ rất tốt nhưng có thể tính nhầm. Phép cộng, phần trăm, tổng: dùng bảng tính hoặc máy tính thật. Chuyện thuế, pháp lý hay đầu tư, hỏi kế toán trưởng hoặc chuyên gia.",
      },
      {
        type: "scenario",
        title: "Hai phút trước khi gửi báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "Báo cáo gửi sếp lúc 11 giờ. Đoạn tóm tắt trợ lý đưa có hai con số và một câu trích từ báo cáo gốc. Còn 10 phút.",
            choices: [
              { label: "Dán thẳng vào, vì trợ lý đã đọc đúng báo cáo vừa tải lên", next: "bad_paste" },
              { label: "Mở báo cáo gốc, kiểm nguồn trước rồi tới số liệu", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Sếp hỏi nguồn của con số 12% trong cuộc họp. Bạn không tìm ra ở đâu và phải nhận là chưa kiểm.",
            ending: "bad",
          },
          s2: {
            text: "Câu trích có thật nhưng ở trang 9 chứ không phải trang 14. Số 12% khớp. Phép tính tổng thì bạn chưa tính lại.",
            choices: [
              { label: "Tự cộng lại bằng bảng tính, rồi kiểm xem 12% nói về kỳ nào", next: "good" },
              { label: "Nhờ trợ lý cộng lại một lần nữa rồi dùng luôn", next: "bad_recalc" },
            ],
          },
          bad_recalc: {
            text: "Trợ lý ra lại đúng kết quả cũ, cùng sai số lẻ. Bạn gửi đi và đồng nghiệp sau đó cộng tay thấy lệch 1,2 triệu.",
            ending: "bad",
          },
          good: {
            text: "Tổng đúng, nhưng 12% là của quý 2 chứ không phải cả năm. Bạn sửa câu chữ, sếp nhận báo cáo chính xác và không hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mở tài liệu gốc, kiểm nguồn và trang.",
          "Bước 2 - So số liệu, tự tính lại phép tính.",
          "Bước 3 - Kiểm kỳ, đối tượng, đơn vị của mỗi số.",
          "Bước 4 - Điều chưa kiểm được: đánh dấu hoặc bỏ ra.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nguồn, số, ngữ cảnh: hai phút mỗi lần, dùng mãi.",
          "Bài sau: tổng kết chặng bằng một thư viện tài liệu cho mảng việc của bạn.",
        ],
      },
    ],
  },
  {
    id: 2299,
    slug: "capstone-thu-vien-tai-lieu-cho-mot-mang-viec-cua-ban",
    title: "Chặng 44, Bài 20: Tổng kết: thư viện tài liệu cho một mảng việc của bạn",
    subtitle: "Bộ tài liệu, bộ câu hỏi, danh sách kiểm - gói lại để người khác dùng được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📚",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cả chặng bạn đã học hỏi tài liệu, kiểm câu trả lời, giữ an toàn và chia sẻ. Giờ gói lại thành một thứ dùng được: một bộ tài liệu đã lọc, vài câu hỏi hay dùng, một danh sách kiểm. Khi đồng nghiệp hay chính bạn ba tháng sau mở ra vẫn dùng được, đó mới là kết quả thực của chặng này.",
    openingQuestion:
      "Bạn muốn dựng thư viện tài liệu cho mảng việc mình phụ trách để cả nhóm dùng được. Điều nào nên có trong gói giao lại?",
    openingOptions: [
      "Bộ tài liệu đã lọc, bộ câu hỏi mẫu và danh sách kiểm ngắn",
      "Toàn bộ tài liệu của mảng việc để không ai thiếu thứ gì cả",
      "Chỉ liên kết tới thư mục chung, ai cần gì thì tự tìm lấy trong thư mục",
      "Chỉ bộ câu hỏi hay dùng vì tài liệu thì ai cũng có sẵn rồi",
    ],
    correctOption: 0,
    explanation:
      "Một gói dùng lại được cần ba phần nối với nhau: tài liệu đã lọc (đúng loại, đã bỏ phần nhạy cảm), câu hỏi mẫu chỉ ra cách hỏi hiệu quả, và danh sách kiểm để không tin nhầm câu trả lời. Nhét hết tài liệu vào làm lẫn cả thứ nhạy cảm và lỗi thời. Liên kết thư mục chung bắt người dùng tự lọc. Chỉ có câu hỏi thì thiếu nguồn để hỏi.",
    diagram: [
      { label: "Chọn một mảng việc và lọc tài liệu theo ba ngăn", arrow: true },
      { label: "Viết bộ câu hỏi mẫu cho việc hay gặp", arrow: true },
      { label: "Ghi danh sách kiểm và quy định chia sẻ", arrow: true },
      { label: "Nhờ một đồng nghiệp thử dùng, rồi sửa theo phản hồi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự dựng thư viện cho mảng tuyển dụng gồm 8 tài liệu quy trình đã lọc, 6 câu hỏi mẫu và danh sách kiểm ba dòng. Cô nhờ một đồng nghiệp mới thử dùng, thấy hai câu hỏi mẫu hơi mơ hồ và sửa lại trước khi chia sẻ cho cả phòng.",
    },
    quiz: [
      Q(
        "Khi chọn tài liệu cho thư viện, tiêu chí đầu tiên nên là gì?",
        [
          "Tệp không chứa dữ liệu nhạy cảm và công cụ được phép dùng với nó",
          "Tệp càng dài càng tốt vì có nhiều thông tin hơn",
          "Tệp bạn viết gần đây nhất vì nó mới hơn tất cả",
          "Tệp có nhiều người mở nhất trong thư mục chung",
        ],
        "An toàn trước rồi mới tới hữu ích, đúng thứ tự cả chặng. Độ dài, độ mới và độ phổ biến không nói lên tệp có được phép đưa vào công cụ hay không.",
      ),
      Q(
        "Bộ câu hỏi mẫu trong thư viện nên có đặc điểm nào?",
        [
          "Cụ thể, nêu rõ tài liệu nào và yêu cầu trích nguyên câu",
          "Ngắn gọn một câu như 'tóm tắt giúp tôi' cho mọi tài liệu",
          "Dài thật chi tiết kể cả thông tin cá nhân của người dùng",
          "Mở rộng để trợ lý tự do đưa ra ý kiến riêng của mình",
        ],
        "Câu hỏi cụ thể bám vào tài liệu và có yêu cầu trích dẫn thì kiểm được. Câu chung chung cho ra câu trả lời chung chung, còn thông tin cá nhân không có chỗ trong câu hỏi mẫu và tự do ý kiến mời trợ lý bịa.",
      ),
      Q(
        "Vì sao nên nhờ một đồng nghiệp thử dùng thư viện trước khi chia sẻ cả nhóm?",
        [
          "Người chưa biết bối cảnh sẽ chỉ ra chỗ mơ hồ mà bạn không còn thấy",
          "Vì đồng nghiệp sẽ kiểm thay bạn mọi số liệu trong tài liệu gốc",
          "Vì chia sẻ cho một người thì không cần hỏi công nghệ thông tin",
          "Vì công cụ chỉ cho phép thử nghiệm với một người dùng mỗi lần",
        ],
        "Bạn quá quen nên không thấy chỗ khó hiểu. Đồng nghiệp mới thấy ngay. Họ không kiểm số liệu thay bạn, việc hỏi công nghệ thông tin vẫn áp dụng, và không có quy tắc chung về một người dùng.",
      ),
      Q(
        "Danh sách kiểm trong thư viện nên dài cỡ nào?",
        [
          "Ngắn, vài dòng, đủ dùng mỗi lần",
          "Một trang đầy đủ, kể hết mọi tình huống hiếm gặp",
          "Đúng mười mục cho tròn",
          "Không cần, vì bộ câu hỏi mẫu đã thay được việc kiểm",
        ],
        "Danh sách dài thì không ai dùng mỗi lần; vài dòng về nguồn, số liệu, ngữ cảnh thì dùng được. Con số mười không có lý do gì, và câu hỏi mẫu giúp hỏi chứ không thay việc kiểm câu trả lời.",
      ),
      Q(
        "Ba tháng sau tài liệu trong thư viện thay đổi. Nên làm gì?",
        [
          "Đặt lịch rà lại, cập nhật hoặc gỡ phần đã lỗi thời",
          "Để nguyên vì người dùng sẽ tự biết tài liệu nào cũ",
          "Xoá hết rồi dựng lại từ đầu mỗi khi có một thay đổi",
          "Thêm bản mới bên cạnh và để cả hai bản cho người dùng chọn",
        ],
        "Thư viện lỗi thời làm câu trả lời sai mà trông vẫn chắc. Rà định kỳ giữ nội dung đúng. Người dùng thường không biết bản nào cũ, dựng lại từ đầu tốn công, và để hai bản khiến trợ lý có thể dùng bản cũ.",
      ),
    ],
    keyTakeaways: [
      "Gói giao lại gồm ba phần: tài liệu đã lọc, câu hỏi mẫu, danh sách kiểm.",
      "An toàn trước rồi mới hữu ích khi chọn tài liệu.",
      "Câu hỏi mẫu cụ thể, bám tài liệu, có yêu cầu trích dẫn.",
      "Nhờ một đồng nghiệp thử dùng trước khi chia sẻ rộng.",
      "Đặt lịch rà lại để tài liệu không lỗi thời.",
    ],
    practicePrompt: {
      question:
        "Anh Phúc dựng thư viện cho mảng chăm sóc khách hàng gồm 20 tệp gồm cả bảng khiếu nại có tên khách. Anh chưa có câu hỏi mẫu. Bước nào nên làm trước?",
      options: [
        "Gỡ bảng khiếu nại có tên khách, rồi viết vài câu hỏi mẫu",
        "Viết thêm câu hỏi mẫu trước và xử lý bảng khiếu nại sau",
        "Giữ nguyên 20 tệp vì khách hàng đã đồng ý khi khiếu nại",
        "Chia thư viện làm hai bản, một bản có bảng và một không có",
      ],
      correct: 0,
      explanation:
        "An toàn đi trước: bảng có tên khách phải ra khỏi thư viện trước khi ai dùng. Viết câu hỏi mẫu trước thì thư viện vẫn chứa dữ liệu nhạy cảm trong lúc đó. Khách khiếu nại không đồng nghĩa đồng ý đưa dữ liệu vào công cụ, và hai bản chỉ nhân đôi việc phải quản lý.",
    },
    summary: {
      keyIdea: "Thư viện dùng lại được = tài liệu đã lọc + câu hỏi mẫu + danh sách kiểm + quy định chia sẻ.",
      formula: "Lọc an toàn + hỏi có mẫu + kiểm có danh sách = gói người khác dùng được.",
      commonMistake: "Nhét toàn bộ tài liệu vào thư viện mà không lọc và không giao kèm cách kiểm.",
      action: "Chọn một mảng việc và dựng bản nháp thư viện 5 tài liệu, 3 câu hỏi, 3 dòng kiểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một mảng việc bạn phụ trách. Chọn 5 tài liệu đã qua bước phân loại ba ngăn (chỉ nhóm thoải mái), viết 3 câu hỏi mẫu bám vào các tài liệu đó, và ghi danh sách kiểm ba dòng. Gửi bản nháp cho một đồng nghiệp và hỏi họ chỗ nào khó hiểu nhất.",
      secondary: "Ghi ngày sẽ rà lại thư viện vào lịch của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cả chặng này bạn học từng mảnh: hỏi tài liệu, kiểm câu trả lời, giữ an toàn, chia sẻ. Bài cuối gói chúng thành một thứ cầm đi được: một thư viện nhỏ cho một mảng việc của bạn, mà người khác mở ra là dùng.",
      },
      {
        type: "feynman",
        title: "Dựng thư viện đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp dụng cụ sửa xe đạp bạn cho người bạn mượn: không đưa cả garage, chỉ vài dụng cụ đúng loại, một tờ giấy ghi 'làm thế này', và một dòng dặn 'kiểm lại bu-lông trước khi chạy'.",
        columns: ["Phần", "Hộp dụng cụ", "Thư viện tài liệu"],
        rows: [
          ["Đồ nghề", "Vài dụng cụ đúng loại", "Tài liệu đã lọc, đã qua ba ngăn"],
          ["Hướng dẫn", "Tờ giấy 'làm thế này'", "Bộ câu hỏi mẫu"],
          ["Dặn kiểm", "Kiểm bu-lông trước khi chạy", "Danh sách kiểm ba dòng"],
          ["Bảo trì", "Thay dụng cụ hỏng", "Rà lại tài liệu định kỳ"],
        ],
        oneLiner: "Không phải chứa được nhiều nhất, mà là người khác mở ra dùng được ngay và không gây hại.",
      },
      { type: "heading", text: "Ba phần và một việc định kỳ" },
      {
        type: "paragraph",
        text: "Thư viện có ba phần nối nhau. Tài liệu đã lọc: đúng loại, đã bỏ phần nhạy cảm. Câu hỏi mẫu: cho người mới thấy cách hỏi bám tài liệu và đòi trích dẫn. Danh sách kiểm: nguồn, số liệu, ngữ cảnh. Thêm một việc định kỳ là rà lại, vì tài liệu cũ sinh ra câu trả lời sai mà vẫn trông chắc chắn.",
      },
      {
        type: "flow",
        title: "Từ mảng việc của bạn tới thư viện dùng chung",
        steps: [
          { label: "Chọn một mảng việc hẹp", detail: "Ví dụ quy trình tuyển dụng hoặc hỏi đáp về chính sách nghỉ phép. Hẹp thì dễ lọc và dễ kiểm." },
          { label: "Lọc tài liệu bằng ba ngăn", detail: "Chỉ giữ tài liệu nhóm thoải mái; nhóm hỏi trước thì hỏi; nhóm cấm thì để ngoài hoặc che theo bài 17." },
          { label: "Viết câu hỏi mẫu và danh sách kiểm", detail: "Ba đến sáu câu hỏi bám tài liệu và đòi trích nguyên câu; danh sách kiểm ba dòng: nguồn, số liệu, ngữ cảnh." },
          { label: "Thử với một người, rồi chia sẻ đúng quyền", detail: "Nhờ đồng nghiệp thử, sửa chỗ mơ hồ, rồi chia sẻ theo quyền tối thiểu và đặt lịch rà lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết câu hỏi mẫu cho thư viện",
        task: "Thư viện của bạn có bản quy trình xin nghỉ phép đã lọc. Lắp một câu hỏi mẫu để đồng nghiệp dùng lại.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi",
            options: [
              { text: "Dựa vào mọi thứ bạn biết về nghỉ phép.", feedback: "Trợ lý lấy kiến thức chung thay vì quy trình của công ty bạn, câu trả lời có thể trái quy định thật." },
              { text: "Chỉ dựa vào bản quy trình nghỉ phép trong thư viện này.", good: true, feedback: "Phạm vi rõ, câu trả lời bám đúng tài liệu của công ty." },
            ],
          },
          {
            id: "evidence",
            label: "Bằng chứng",
            options: [
              { text: "Trả lời thật ngắn gọn cho nhanh.", feedback: "Ngắn nhưng không có trích dẫn nên bạn không kiểm được." },
              { text: "Trích nguyên câu liên quan và ghi tiêu đề mục chứa câu đó.", good: true, feedback: "Có trích dẫn và mục nên kiểm bằng cách mở đúng chỗ." },
            ],
          },
          {
            id: "gap",
            label: "Chỗ thiếu",
            options: [
              { text: "Nếu thiếu thì tự bổ sung theo thông lệ chung.", feedback: "Thông lệ chung không phải quy định công ty, và trợ lý sẽ nói như thể nó có trong tài liệu." },
              { text: "Nếu quy trình không nêu, nói rõ là không nêu và gợi ý hỏi bộ phận nhân sự.", good: true, feedback: "Chỗ thiếu được nói thẳng và người dùng biết hỏi ai." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "evidence", "gap"],
            text: "Theo mục 'Đơn xin nghỉ': \"Nhân viên gửi đơn cho quản lý trực tiếp trước ít nhất 3 ngày làm việc.\" Quy trình không nêu trường hợp nghỉ đột xuất; bạn nên hỏi bộ phận nhân sự.",
          },
          {
            requires: ["scope"],
            text: "Bạn gửi đơn cho quản lý. Thường các công ty yêu cầu báo trước một tuần...\n\n(Không yêu cầu trích dẫn và thiếu chỗ thừa nhận chưa có thông tin nên trợ lý nói theo thông lệ chung.)",
          },
          {
            text: "Theo luật lao động, bạn được nghỉ phép 12 ngày mỗi năm và phải báo trước 5 ngày...\n\n(Không giới hạn phạm vi nên trợ lý kể kiến thức chung, có thể không khớp quy định của công ty bạn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Thư viện gọn, có mẫu, có danh sách kiểm",
          text: "Người mới mở ra là biết hỏi gì, kiểm gì. Tài liệu đã qua bước an toàn. Có lịch rà lại nên không lỗi thời.",
        },
        right: {
          label: "Thư mục chứa tất cả, ai cần thì tìm",
          text: "Nhiều tệp lỗi thời và nhạy cảm lẫn vào. Người dùng không biết hỏi sao cho kiểm được. Không ai chịu trách nhiệm cập nhật.",
        },
      },
      {
        type: "callout",
        label: "Gói cho người khác phải thử trước",
        text: "Cái bạn thấy rõ có thể mơ hồ với người chưa biết bối cảnh. Nhờ một đồng nghiệp mới thử dùng, ghi lại chỗ họ vấp, rồi sửa. Nếu thư viện có dữ liệu liên quan pháp lý hay khách hàng, hỏi pháp chế hoặc công nghệ thông tin trước khi chia sẻ rộng.",
      },
      {
        type: "scenario",
        title: "Giao lại thư viện cho nhóm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gom tài liệu cho mảng chăm sóc khách hàng. Thư mục có 25 tệp, trong đó vài tệp có tên khách hàng. Sếp cần bản giao lại trong tuần.",
            choices: [
              { label: "Đóng gói nguyên cả 25 tệp để không thiếu gì", next: "bad_all" },
              { label: "Lọc bằng ba ngăn, chỉ giữ tệp thoải mái và viết câu hỏi mẫu, danh sách kiểm", next: "s2" },
            ],
          },
          bad_all: {
            text: "Một đồng nghiệp mới tải bảng có tên khách lên công cụ theo hướng dẫn trong thư viện. Bộ phận công nghệ thông tin yêu cầu giải trình, và bạn là người dựng thư viện.",
            ending: "bad",
          },
          s2: {
            text: "Bản nháp có 8 tài liệu, 4 câu hỏi mẫu và danh sách kiểm ba dòng. Bạn chưa chắc nó đã dễ hiểu.",
            choices: [
              { label: "Nhờ một đồng nghiệp mới thử dùng và sửa chỗ họ vấp", next: "good" },
              { label: "Chia sẻ cho cả phòng luôn vì bạn đã đọc lại kỹ hai lần", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Hai câu hỏi mẫu mơ hồ khiến nhiều người nhận câu trả lời lạc đề. Họ ngừng dùng thư viện sau tuần đầu.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp chỉ ra hai câu hỏi mẫu chưa rõ. Bạn sửa, chia sẻ theo quyền xem và đặt lịch rà lại mỗi quý.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một mảng việc hẹp của bạn.",
          "Bước 2 - Lọc tài liệu bằng ba ngăn, bỏ hoặc che phần nhạy cảm.",
          "Bước 3 - Viết 3-6 câu hỏi mẫu và danh sách kiểm ba dòng.",
          "Bước 4 - Nhờ một người thử, sửa, chia sẻ đúng quyền, đặt lịch rà lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Tài liệu an toàn, câu hỏi có mẫu, câu trả lời có kiểm: đó là thư viện dùng được.",
          "Bạn đã xong chặng 44. Chặng sau mở rộng sang những việc lặp lại hằng tuần.",
        ],
      },
    ],
  },
];
