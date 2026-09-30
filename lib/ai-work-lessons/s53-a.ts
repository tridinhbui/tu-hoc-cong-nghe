import type { Lesson } from "../lesson-types";

// Chặng 53, bài 1-5. Giáo trình: scripts/curriculum/stage-53.json.
// Cố ý không nêu tên nút, tên menu, gói giấy phép hay tính năng cụ thể của Power
// Automate / Microsoft 365: chỉ dạy khái niệm bền (kích hoạt, điều kiện, hành động,
// quyền và chính sách của tổ chức). Chưa dẫn nguồn tài liệu vì không có khẳng định
// nào về một tính năng cụ thể; việc nào phụ thuộc giấy phép thì hỏi bộ phận CNTT.
export const S53_A_LESSONS: Lesson[] = [
  {
    id: 2460,
    slug: "email-dinh-kem-tu-luu-vao-sharepoint-hay-onedrive",
    title: "Chặng 53, Bài 1: Email có tệp đính kèm về, tệp tự vào đúng thư mục chung",
    subtitle: "Một người trực phòng thư: thư từ ai tới thì bỏ vào ngăn nào, đóng dấu ngày ra sao.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📥",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi sáng bạn mở email, thấy ba báo giá mới, tải từng tệp về Desktop rồi kéo sang thư mục chung của nhóm. Đến tuần sau không ai nhớ tệp nào là của ai, ngày nào. Một luồng tự động làm đúng việc lặp lại này cả khi bạn đang họp, miễn là bạn mô tả rõ quy tắc.",
    openingQuestion:
      "Báo giá của nhà cung cấp về email mỗi ngày dưới dạng tệp đính kèm. Bạn muốn chúng tự vào thư mục chung. Điều gì cần nói rõ đầu tiên khi dựng luồng?",
    openingOptions: [
      "Email nào thì kích hoạt luồng và tệp được đặt tên ra sao",
      "Luồng nên chạy nhanh đến mức nào mỗi lần có thư mới về hộp thư",
      "Thư mục chung nên có màu gì để cả nhóm dễ thấy",
      "Có nên xoá email gốc đi để hộp thư đỡ đầy hay không",
    ],
    correctOption: 0,
    explanation:
      "Một luồng chỉ làm đúng điều bạn mô tả. Nếu không nói email nào được tính (từ ai, có tệp đính kèm không) thì nó hoặc bỏ sót hoặc lưu cả quảng cáo vào thư mục chung. Nếu không nói cách đặt tên thì mọi tệp mang tên gốc lộn xộn. Tốc độ chạy không phải thứ bạn phải quyết định, màu thư mục chẳng liên quan tới luồng, còn xoá email gốc là việc rủi ro, nên để sau khi đã chạy ổn.",
    diagram: [
      { label: "Email có tệp đính kèm đến hộp thư", arrow: true },
      { label: "Kiểm tra: đúng người gửi, đúng loại tệp", arrow: true },
      { label: "Đặt tên: ngày_người gửi_tên gốc", arrow: true },
      { label: "Lưu vào thư mục chung, để nguyên email gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên mua hàng nhận báo giá của bốn nhà cung cấp qua email, mỗi nhà một kiểu đặt tên. Chị mô tả luồng: email từ bốn địa chỉ đã biết, có tệp PDF hoặc Excel, lưu vào thư mục Báo giá với tên bắt đầu bằng ngày. Sau hai tuần thử, chị không còn phải tải tay và tìm báo giá theo ngày chỉ mất vài giây.",
    },
    quiz: [
      {
        question: "Vì sao nên giới hạn luồng chỉ chạy với email từ những người gửi đã biết?",
        options: [
          "Để thư lạ và quảng cáo không bị lưu vào thư mục chung",
          "Vì luồng không đọc được email của người gửi chưa từng quen biết trước đó",
          "Vì luồng chạy nhanh hơn một chút khi có ít người gửi để kiểm tra",
          "Vì quy định bắt buộc mọi luồng phải có danh sách người gửi cố định",
        ],
        correct: 0,
        explanation:
          "Không có điều kiện thì mọi thư có tệp đính kèm, kể cả thư rác, đều bị lưu vào thư mục chung và cả nhóm phải dọn. Luồng vẫn đọc được thư của người lạ nên không phải lý do kỹ thuật, tốc độ chẳng đổi đáng kể, và không có quy định chung nào đòi danh sách cố định: đó là lựa chọn của bạn.",
      },
      {
        question: "Tên tệp nào giúp ba tháng sau vẫn tìm ra báo giá dễ nhất?",
        options: [
          "2026-09-30_NhaCungCapA_baogia.pdf",
          "baogia_final_2_moi.pdf",
          "bao gia moi nhat.pdf",
          "bg.pdf",
        ],
        correct: 0,
        explanation:
          "Ngày viết dạng năm-tháng-ngày giúp danh sách tự xếp đúng thứ tự thời gian, rồi đến người gửi và loại tệp. Tên kiểu final_2 không cho biết ai gửi hay khi nào. Tên dài kể lể mô tả ngày theo cách khó tìm và khó sắp xếp. Tên gốc ngắn như bg.pdf sẽ trùng nhau ngay khi hai nhà cung cấp cùng đặt tên thế.",
      },
      {
        question: "Hai nhà cung cấp cùng gửi tệp tên baogia.pdf trong một ngày. Luồng nên làm gì?",
        options: [
          "Thêm người gửi và giờ vào tên để hai tệp không trùng nhau",
          "Lưu tệp đến sau đè lên tệp trước",
          "Bỏ qua tệp thứ hai vì đã có tệp baogia.pdf rồi, cho thư mục gọn hơn",
          "Nhờ người trong nhóm đổi tên bằng tay mỗi khi gặp hai tệp trùng tên",
        ],
        correct: 0,
        explanation:
          "Đặt tên có người gửi và giờ làm mỗi tệp duy nhất, nên cả hai cùng được giữ. Đè tệp cũ là cách mất dữ liệu âm thầm: không ai biết báo giá nào đã biến mất. Bỏ qua tệp thứ hai cũng làm mất báo giá thật. Nhờ người đổi tên bằng tay là quay về đúng việc thủ công mà luồng sinh ra để bỏ.",
      },
      {
        question: "Sau khi luồng chạy ổn, email gốc có tệp đính kèm nên xử lý thế nào ở tuần đầu?",
        options: [
          "Giữ nguyên trong hộp thư để đối chiếu nếu luồng lưu sai",
          "Xoá ngay cho hộp thư đỡ đầy, vì tệp đã có trong thư mục chung rồi",
          "Chuyển hết sang thư mục rác để chắc rằng không ai đọc lại nữa",
          "Chuyển tiếp cho cả nhóm để mọi người đều có một bản trong hộp thư của mình",
        ],
        correct: 0,
        explanation:
          "Tuần đầu bạn chưa biết luồng có bỏ sót hay lưu nhầm không, nên email gốc là bản đối chiếu duy nhất. Xoá sớm làm mất cách kiểm. Thư mục rác thực chất cũng là một kiểu xoá. Chuyển tiếp cho cả nhóm tạo ra thêm bản sao rải rác, đúng thứ thư mục chung sinh ra để tránh.",
      },
      {
        question: "Bạn mô tả luồng cho AI và nó nói 'cứ để luồng lưu mọi tệp, không cần điều kiện'. Nhận xét nào đúng?",
        options: [
          "Thiếu điều kiện thì luồng lưu cả ảnh chữ ký, logo và tệp không liên quan",
          "Đúng, vì luồng không có điều kiện thì ít lỗi hơn và luôn chạy đúng",
          "Đúng, vì thư mục chung rộng nên lưu thêm tệp thừa cũng không tốn gì",
          "Sai, vì luồng bắt buộc phải có ít nhất ba điều kiện thì mới chạy được",
        ],
        correct: 0,
        explanation:
          "Email công việc thường kèm ảnh chữ ký, logo, tệp xác nhận đọc thư; không lọc thì tất cả bị lưu, thư mục lộn xộn và khó tìm báo giá thật. Bỏ điều kiện không làm luồng ít lỗi hơn. Tệp thừa vẫn tốn công dọn dù thư mục còn chỗ. Và không có quy định nào bắt đúng ba điều kiện: một điều kiện rõ đã đủ.",
      },
    ],
    keyTakeaways: [
      "Luồng chỉ làm đúng điều bạn mô tả: nói rõ email nào được tính và tệp đặt tên ra sao.",
      "Tên tệp bắt đầu bằng ngày (năm-tháng-ngày), rồi người gửi, rồi loại tệp.",
      "Hai tệp trùng tên thì thêm người gửi và giờ, đừng để tệp sau đè tệp trước.",
      "Tuần đầu giữ nguyên email gốc để đối chiếu.",
    ],
    practicePrompt: {
      question:
        "Chị Lan muốn luồng lưu hoá đơn điện tử vào thư mục chung. Chị viết: 'Lưu mọi tệp đính kèm của mọi email tới thư mục.' Bổ sung nào quan trọng nhất?",
      options: [
        "Chỉ email từ địa chỉ nhà cung cấp và tệp PDF, đặt tên có ngày",
        "Thêm câu cảm ơn người gửi ở cuối mỗi lần luồng lưu xong một tệp",
        "Yêu cầu luồng chạy mỗi phút một lần cho chắc không bỏ sót thư nào",
        "Xoá mọi email có tệp đính kèm ngay sau khi lưu xong tệp đó để hộp thư gọn",
      ],
      correct: 0,
      explanation:
        "Giới hạn người gửi và loại tệp chặn rác, còn tên có ngày giúp tìm lại. Câu cảm ơn tự động là việc khác, chưa ai yêu cầu. Chạy mỗi phút không giải quyết thư mục lộn xộn. Xoá email ngay mất bản đối chiếu trong lúc bạn chưa biết luồng có lưu đúng không.",
    },
    summary: {
      keyIdea: "Tệp đính kèm vào đúng chỗ khi bạn mô tả rõ: thư nào, đặt tên gì, trùng thì sao.",
      formula: "Email đúng người gửi + có tệp phù hợp -> đặt tên ngày_người gửi_loại -> lưu vào thư mục chung.",
      commonMistake: "Để luồng lưu mọi tệp của mọi email rồi xoá email gốc ngay, nên lỗi không còn gì để kiểm.",
      action: "Chọn một loại email có tệp đính kèm bạn tải tay mỗi tuần và viết ba dòng mô tả quy tắc lưu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại email có tệp đính kèm bạn thường tải tay (báo giá, hoá đơn, báo cáo). Viết ra giấy hoặc một tệp ghi chú: người gửi nào tính, loại tệp nào tính, tên tệp mẫu theo dạng ngày_người gửi_loại, và việc gì xảy ra khi hai tệp trùng tên. Nhờ AI đọc lại và chỉ ra chỗ còn mơ hồ.",
      secondary: "Hỏi bộ phận CNTT xem công ty có cho dựng luồng chạy trên hộp thư công việc không.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn mở email, thấy ba báo giá mới, rồi lại tải từng tệp về và kéo vào thư mục chung. Việc này nhàm, dễ quên, và lặp lại hằng ngày. Bài này chỉ cách mô tả nó để một luồng tự động làm thay bạn.",
      },
      {
        type: "feynman",
        title: "Luồng lưu tệp tự động đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một người trực phòng thư ở toà nhà. Ai đưa thư tới cũng được anh ấy nhìn tên người gửi, bỏ vào đúng ngăn, rồi đóng dấu ngày. Luồng tự động làm đúng vậy với email của bạn, chỉ khác là nó làm theo quy tắc bạn viết, không tự đoán.",
        columns: ["Thành phần", "Người trực phòng thư", "Luồng lưu tệp"],
        rows: [
          ["Việc khởi đầu", "Thư tới quầy", "Email có tệp đính kèm về hộp thư"],
          ["Kiểm tra", "Nhìn tên người gửi", "Đúng người gửi, đúng loại tệp"],
          ["Xử lý", "Đóng dấu ngày lên thư", "Đặt tên có ngày và người gửi"],
          ["Cất giữ", "Bỏ vào ngăn đúng tên", "Lưu vào thư mục chung của nhóm"],
        ],
        oneLiner:
          "Luồng là người trực phòng thư chỉ làm theo nội quy bạn viết: nội quy mơ hồ thì thư đi sai ngăn.",
      },
      { type: "heading", text: "Quy tắc đủ rõ để máy làm theo" },
      {
        type: "paragraph",
        text: "Người trực phòng thư thông minh sẽ tự hỏi khi gặp thư lạ; luồng thì không. Nó sẽ lưu đúng những gì quy tắc cho phép, kể cả ảnh chữ ký hay tệp rác. Vì vậy phần việc của bạn là nói rõ ba điều: thư nào được tính, tên tệp ra sao, và khi hai tệp trùng tên thì xử lý thế nào.",
      },
      {
        type: "flow",
        title: "Từ email về tới tệp nằm đúng chỗ",
        steps: [
          { label: "Email có tệp đính kèm về", detail: "Đây là khởi đầu của luồng, gọi là kích hoạt. Bạn chỉ định đó là hộp thư nào và có tệp đính kèm hay không." },
          { label: "Kiểm tra người gửi và loại tệp", detail: "Chỉ những thư đúng người gửi đã biết và đúng loại tệp (ví dụ PDF, Excel) mới đi tiếp. Ảnh chữ ký và logo bị bỏ lại." },
          { label: "Đặt tên theo quy ước", detail: "Tên gồm ngày viết năm-tháng-ngày, người gửi và loại tệp. Hai tệp trùng tên thì thêm giờ để không đè nhau." },
          { label: "Lưu vào thư mục chung", detail: "Tệp vào đúng thư mục nhóm cùng dùng. Email gốc vẫn nằm trong hộp thư để đối chiếu." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Mô tả luồng lưu báo giá cho AI",
        task: "Bạn nhờ AI viết bản mô tả luồng để gửi cho đồng nghiệp dựng. Chọn từng phần để lắp yêu cầu tốt.",
        parts: [
          {
            id: "trigger",
            label: "Khi nào luồng chạy",
            options: [
              { text: "Khi có email mới về hộp thư của tôi.", feedback: "Quá rộng: thư họp, thư quảng cáo, thư cá nhân đều kích hoạt, và luồng sẽ lưu cả tệp không ai cần." },
              { text: "Khi có email từ 4 địa chỉ nhà cung cấp (liệt kê) và có tệp PDF hoặc Excel đính kèm.", good: true, feedback: "Có người gửi và loại tệp cụ thể, nên chỉ báo giá thật mới đi vào thư mục." },
            ],
          },
          {
            id: "name",
            label: "Cách đặt tên",
            options: [
              { text: "Giữ nguyên tên gốc của tệp cho đúng với thư.", feedback: "Nhiều nhà cung cấp cùng đặt 'baogia.pdf', nên tệp sau đè tệp trước hoặc không phân biệt nổi." },
              { text: "Đặt tên theo dạng năm-tháng-ngày_người gửi_tên gốc; nếu trùng thì thêm giờ phút.", good: true, feedback: "Danh sách tự xếp theo thời gian, biết ai gửi, và không có hai tệp nào đè nhau." },
            ],
          },
          {
            id: "after",
            label: "Sau khi lưu",
            options: [
              { text: "Xoá email gốc để hộp thư gọn gàng.", feedback: "Nếu luồng lưu sai hay sót, bạn không còn bản gốc để đối chiếu." },
              { text: "Giữ nguyên email gốc, chỉ lưu một bản tệp vào thư mục chung.", good: true, feedback: "Hai tuần đầu bạn còn cách kiểm; khi tin luồng rồi mới tính chuyện dọn hộp thư." },
            ],
          },
        ],
        responses: [
          {
            requires: ["trigger", "name", "after"],
            text: "Mô tả luồng:\n1. Khi có email từ 4 địa chỉ nhà cung cấp đã liệt kê, có tệp PDF hoặc Excel.\n2. Đặt tên: 2026-09-30_NhaCungCapA_baogia.pdf; nếu trùng, thêm giờ phút.\n3. Lưu vào thư mục Báo giá chung, giữ nguyên email gốc.\nCần bạn điền: 4 địa chỉ và đường dẫn thư mục.",
          },
          {
            requires: ["trigger"],
            text: "Mô tả luồng: khi có email từ các nhà cung cấp, lưu tệp PDF hoặc Excel vào thư mục Báo giá. Tên tệp giữ nguyên như gốc.\n(Lọc đúng nhưng tên gốc dễ trùng: hai báo giá cùng tên sẽ đè nhau mà không ai hay.)",
          },
          {
            text: "Mô tả luồng: lưu mọi tệp của mọi email về thư mục chung, rồi xoá email. Có thể dùng ổ đĩa cloud nào cũng được và luồng chạy trong khoảng 2 giây.\n(Thiếu điều kiện, thiếu quy ước tên, và AI tự bịa con số 2 giây mà bạn không hề hỏi.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tải và kéo tay mỗi sáng",
          text: "Mất vài phút mỗi ngày và hay quên khi bận. Tên tệp tuỳ ai đặt nên khó tìm. Người nghỉ phép thì thư mục thiếu tệp. Tuần sau không ai nhớ báo giá nào đã vào.",
        },
        right: {
          label: "Luồng lưu tự động có quy tắc",
          text: "Chạy khi có thư, kể cả lúc bạn đang họp. Tên tệp luôn cùng một dạng. Ai nghỉ phép vẫn đủ tệp. Cần bạn viết quy tắc rõ một lần và kiểm lại trong tuần đầu.",
        },
      },
      {
        type: "callout",
        label: "Hỏi trước khi dựng",
        text: "Hộp thư và thư mục chung thuộc về công ty. Trước khi dựng luồng chạy trên đó, hỏi bộ phận CNTT xem có được phép không và dùng tài khoản nào. Nội dung báo giá có thể là thông tin mật nên đừng đưa vào công cụ chưa được duyệt.",
      },
      {
        type: "scenario",
        title: "Thử luồng bằng một email giả",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã mô tả xong luồng lưu báo giá. Trước khi bật cho cả tuần, bạn cần thử.",
            choices: [
              { label: "Bật luôn và chờ email thật đầu tiên để xem sao", next: "s_real" },
              { label: "Tự gửi cho mình một email giả có tệp PDF từ địa chỉ đã liệt kê", next: "s2" },
            ],
          },
          s_real: {
            text: "Email thật về lúc bạn đi họp. Luồng lưu nhầm cả ảnh chữ ký của nhà cung cấp và hai tệp trùng tên đè lên nhau. Bạn chỉ biết khi cần báo giá để đàm phán.",
            ending: "bad",
          },
          s2: {
            text: "Tệp giả xuất hiện trong thư mục chung, tên đúng dạng ngày_người gửi. Bạn thử thêm một email có ảnh chữ ký.",
            choices: [
              { label: "Thấy tệp đầu đúng rồi nên không thử thêm, bật luôn", next: "s_half" },
              { label: "Gửi tiếp hai email giả cùng tên tệp và một email chỉ có ảnh chữ ký", next: "good" },
            ],
          },
          s_half: {
            text: "Tuần sau hai nhà cung cấp cùng gửi tệp 'baogia.pdf' trong một ngày, và tệp sau đè tệp trước. Bạn mất một báo giá mà không hay biết.",
            ending: "bad",
          },
          good: {
            text: "Hai tệp trùng tên được lưu với giờ khác nhau, ảnh chữ ký không vào thư mục. Bạn bật luồng, giữ email gốc và kiểm lại cuối tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một loại email có tệp đính kèm bạn tải tay lặp lại.",
          "Bước 2 - Viết: người gửi nào, loại tệp nào, tên mẫu, và trùng tên thì sao.",
          "Bước 3 - Thử bằng email giả, gồm cả ca trùng tên và ca không có tệp.",
          "Bước 4 - Giữ email gốc một hai tuần rồi mới tính chuyện dọn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Quy tắc rõ thì luồng là người trực phòng thư chăm chỉ; quy tắc mơ hồ thì nó là người trực đi nhầm ngăn.",
          "Bài sau: luồng tự động, macro hay nhắc việc, chọn cái nào cho việc của bạn.",
        ],
      },
    ],
  },
  {
    id: 2461,
    slug: "luong-tu-dong-so-voi-macro-va-nhac-viec",
    title: "Chặng 53, Bài 2: Luồng tự động, macro hay nhắc việc: chọn cái nào cho việc của bạn",
    subtitle: "Ba dụng cụ trong hộp đồ nghề: cái chạy một mình, cái chạy khi bạn bấm, cái chỉ nhắc bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nghe nói có thể tự động hoá, bạn dễ tưởng mọi việc lặp lại đều nên làm thành luồng. Thực tế có việc hợp với một macro trong tệp Excel, có việc chỉ cần một lời nhắc lúc 9 giờ sáng. Chọn sai công cụ tốn nhiều giờ dựng mà không ai dùng.",
    openingQuestion:
      "Mỗi thứ Sáu bạn phải nhớ gửi báo cáo tuần cho sếp, còn việc soạn báo cáo là bạn tự làm bằng tay. Công cụ nào đủ dùng nhất cho chỗ 'nhớ gửi'?",
    openingOptions: [
      "Một lời nhắc lặp lại vào chiều thứ Sáu",
      "Một luồng tự động kết nối ba hệ thống khác nhau",
      "Một macro phức tạp viết thêm cho mọi tệp Excel",
      "Thuê người viết phần mềm riêng cho công ty",
    ],
    correctOption: 0,
    explanation:
      "Vấn đề ở đây là quên, không phải thao tác. Lời nhắc giải quyết đúng chỗ đó trong một phút cài đặt. Luồng kết nối nhiều hệ thống và macro phức tạp giải quyết việc khác (chuyển dữ liệu, tính toán) mà bạn không cần, lại thêm thứ phải bảo trì. Thuê viết phần mềm thì quá nặng cho một việc chỉ cần bạn nhớ.",
    diagram: [
      { label: "Mô tả việc lặp lại bạn đang làm", arrow: true },
      { label: "Hỏi: việc này chạy ở đâu, ai cần dùng", arrow: true },
      { label: "Chọn: nhắc việc, macro trong tệp, hay luồng tự động", arrow: true },
      { label: "Thử với ca thật nhỏ trước khi giao cho cả nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý hành chính có ba việc lặp lại. Nhắc gia hạn hợp đồng đặt xe cuối mỗi quý, định dạng bảng chấm công mỗi tháng cho giống mẫu, và lưu báo giá từ email vào thư mục chung. Chị chọn lời nhắc cho việc thứ nhất, macro trong tệp cho việc thứ hai vì chỉ chị dùng tệp đó, và luồng tự động cho việc thứ ba vì nó phải chạy cả khi chị vắng.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào cho thấy việc của bạn hợp với luồng tự động hơn là macro trong tệp?",
        options: [
          "Việc phải chạy khi có sự kiện bên ngoài, dù không ai mở tệp nào cả",
          "Việc chỉ diễn ra khi bạn tự mở đúng tệp Excel đó trên máy tính của chính bạn",
          "Việc chỉ cần định dạng lại ô trong một bảng mỗi khi bạn bấm nút",
          "Việc nhỏ đến mức chưa tới một phút là làm xong bằng tay mỗi lần",
        ],
        correct: 0,
        explanation:
          "Luồng chạy theo sự kiện như có email về hay có tệp mới, không cần ai mở gì. Macro thì thường chạy khi có người mở tệp và bấm trên máy của họ, nên việc chỉ xảy ra trong tệp đó hợp với macro. Việc một phút làm tay thường không đáng dựng gì cả.",
      },
      {
        question: "Lời nhắc (báo thức, lịch) KHÔNG làm được việc nào sau đây?",
        options: [
          "Tự chuyển tệp sang thư mục khác",
          "Nhắc bạn gửi báo cáo đúng giờ",
          "Lặp lại mỗi tuần vào cùng một ngày",
          "Gắn kèm ghi chú nhắc bạn cần làm gì",
        ],
        correct: 0,
        explanation:
          "Lời nhắc chỉ gọi bạn nhớ, chứ không thao tác thay bạn: người vẫn phải tự chuyển tệp. Nhắc đúng giờ, lặp lại hằng tuần và kèm ghi chú đều là những việc lời nhắc làm tốt, nên chúng là khả năng chứ không phải giới hạn.",
      },
      {
        question: "Bạn có một việc mà cả nhóm cùng hưởng kết quả nhưng chỉ bạn biết cách làm. Nên chọn thế nào?",
        options: [
          "Dùng công cụ chạy không phụ thuộc máy bạn, để người khác còn dùng khi bạn nghỉ",
          "Viết macro trong tệp trên máy bạn và dặn cả nhóm đừng mở tệp đó khi bạn vắng mặt",
          "Chỉ dùng lời nhắc của riêng bạn, vì người khác chắc sẽ tự nhớ việc đó giùm",
          "Không tự động hoá, vì việc người khác chưa biết thì không bao giờ nên đụng tới",
        ],
        correct: 0,
        explanation:
          "Khi nhiều người cần kết quả thì việc chạy không nên gắn với máy một người. Macro trên máy bạn dừng khi bạn vắng. Lời nhắc riêng chỉ nhắc mình bạn. Còn bỏ không tự động hoá là bỏ cơ hội giảm phụ thuộc vào một người.",
      },
      {
        question: "Ba việc: nhắc gia hạn hợp đồng, định dạng bảng riêng của bạn, lưu tệp từ email. Ghép đúng cặp nào?",
        options: [
          "Lời nhắc, macro trong tệp, luồng tự động theo sự kiện",
          "Luồng tự động cho cả ba, vì nó mạnh nhất",
          "Macro cho cả ba, vì macro chạy ngay trong tệp",
          "Lời nhắc cho cả ba, vì nhắc là cách đơn giản nhất",
        ],
        correct: 0,
        explanation:
          "Nhắc gia hạn chỉ cần lời nhắc; định dạng bảng riêng của bạn hợp macro vì tệp nằm trên máy bạn; lưu tệp từ email cần luồng chạy theo sự kiện. Dùng công cụ mạnh nhất cho mọi việc tạo thêm phần phải bảo trì, còn dùng một công cụ đơn giản cho cả ba thì có việc không làm nổi.",
      },
      {
        question: "Bạn dựng xong luồng cho một việc người ta chỉ làm ba lần mỗi năm. Nhận xét nào đúng nhất?",
        options: [
          "Lời nhắc kèm ghi chú các bước thường đã đủ dùng và rẻ hơn luồng",
          "Đúng hướng, vì luồng càng nhiều càng tiết kiệm thời gian cho cả phòng",
          "Đúng hướng, vì việc ít lặp cần tự động hoá để khỏi quên",
          "Chưa đủ, phải dựng thêm hai luồng nữa dự phòng",
        ],
        correct: 0,
        explanation:
          "Việc hiếm làm không bù nổi công dựng và bảo trì luồng: ghi chú các bước trong lời nhắc là đủ. Không phải luồng nào dựng thêm cũng tiết kiệm, việc ít lặp không cần luồng để khỏi quên cách làm (ghi chú làm được), và dựng luồng dự phòng chỉ nhân công bảo trì.",
      },
    ],
    keyTakeaways: [
      "Nhắc việc giải quyết chuyện quên; macro giải quyết thao tác trong tệp; luồng giải quyết việc chạy theo sự kiện.",
      "Hỏi hai câu: việc này chạy ở đâu, và ai cần dùng kết quả.",
      "Việc hiếm làm thường chỉ cần lời nhắc kèm ghi chú các bước.",
      "Chọn công cụ nhỏ nhất đủ làm việc.",
    ],
    practicePrompt: {
      question:
        "Anh Nam mỗi sáng thứ Hai phải đổi màu ô trong bảng chấm công theo mẫu, chỉ anh dùng tệp đó. Công cụ hợp nhất là gì?",
      options: [
        "Macro trong chính tệp đó",
        "Luồng tự động nối hộp thư với thư mục chung",
        "Thuê một nhà cung cấp dịch vụ tự động hoá bên ngoài",
        "Lời nhắc cuối tuần nhắc anh kiểm lại màu ô bằng mắt",
      ],
      correct: 0,
      explanation:
        "Việc nằm gọn trong một tệp chỉ anh dùng, nên macro là đủ. Luồng nối hộp thư là việc khác, dịch vụ bên ngoài là quá nặng, còn lời nhắc không đổi màu thay anh.",
    },
    summary: {
      keyIdea: "Chọn công cụ theo nơi việc chạy và ai cần dùng, không theo độ mạnh.",
      formula: "Quên -> nhắc việc; thao tác trong tệp của bạn -> macro; sự kiện bên ngoài hoặc nhiều người dùng -> luồng.",
      commonMistake: "Dựng luồng cho một việc người ta chỉ làm vài lần mỗi năm.",
      action: "Liệt kê ba việc lặp lại của bạn và ghi bên cạnh mỗi việc: nhắc, macro hay luồng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê 3 việc lặp lại thật của bạn tuần này. Với mỗi việc ghi: chạy ở đâu (trong một tệp, trên email, trong thư mục chung), ai cần dùng kết quả, rồi chọn nhắc việc, macro hay luồng. Nhờ AI đọc lại và phản biện một lựa chọn bạn thấy chưa chắc.",
      secondary: "Cài ngay lời nhắc cho việc mà bạn chỉ hay quên.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Sáu bạn lại quên gửi báo cáo tuần, rồi tự hỏi có nên nhờ đồng nghiệp làm luồng tự động cho chuyện này. Chưa chắc. Bài này giúp bạn chọn đúng công cụ trước khi bỏ công dựng.",
      },
      {
        type: "feynman",
        title: "Chọn công cụ tự động hoá đơn giản hơn bạn nghĩ",
        intro:
          "Trong nhà có ba thứ: đồng hồ báo thức chỉ kêu để bạn dậy, cái máy pha cà phê bạn bấm nút thì nó pha, và máy giặt hẹn giờ tự chạy khi bạn đi vắng. Ba công cụ văn phòng cũng chia theo cách đó.",
        columns: ["Công cụ", "Trong nhà", "Ở văn phòng"],
        rows: [
          ["Nhắc việc", "Đồng hồ báo thức: chỉ gọi bạn", "Lời nhắc lịch: bạn vẫn tự làm"],
          ["Macro trong tệp", "Máy pha cà phê: bấm mới chạy", "Chạy trong tệp khi bạn mở và bấm"],
          ["Luồng tự động", "Máy giặt hẹn giờ: tự chạy", "Chạy khi có sự kiện, không cần bạn mở gì"],
          ["Khi nào hợp", "Quên giờ, quên việc", "Thao tác riêng, hoặc việc cả nhóm cần"],
        ],
        oneLiner: "Báo thức để nhớ, máy pha cà phê để bấm, máy giặt hẹn giờ để khỏi phải có mặt: chọn theo việc, không theo độ hiện đại.",
      },
      { type: "heading", text: "Hai câu hỏi phân loại" },
      {
        type: "paragraph",
        text: "Trước khi dựng bất cứ thứ gì, hỏi hai câu. Việc này chạy ở đâu: trong một tệp của riêng bạn, hay phải theo một sự kiện như email về hoặc tệp mới? Và ai cần dùng kết quả: chỉ bạn, hay cả nhóm kể cả khi bạn nghỉ? Hai câu trả lời cho bạn gần như ngay công cụ.",
      },
      {
        type: "flow",
        title: "Cây quyết định ba bước",
        steps: [
          { label: "Vấn đề là quên hay là thao tác?", detail: "Nếu việc bạn làm được, chỉ hay quên giờ thì lời nhắc là đủ. Đừng dựng thứ phức tạp hơn vấn đề." },
          { label: "Thao tác nằm trong một tệp của bạn?", detail: "Ví dụ định dạng bảng, tô màu, sắp xếp cột. Macro chạy khi bạn mở và bấm, hợp với việc riêng của bạn." },
          { label: "Có sự kiện bên ngoài hoặc người khác cần?", detail: "Email về, tệp mới trong thư mục, đơn mới gửi tới: đây là chỗ luồng tự động chạy khi bạn không có mặt." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời khuyên AI vừa đưa",
        task: "Bạn nhờ AI phân loại ba việc vào ba công cụ. Đánh dấu những câu AI nói sai hoặc tự bịa thêm.",
        segments: [
          { text: "Nhắc nộp báo cáo tuần: dùng lời nhắc lặp lại vào chiều thứ Sáu." },
          { text: "Lời nhắc cũng sẽ tự soạn và gửi luôn báo cáo giúp bạn mỗi tuần.", error: "Lời nhắc chỉ gọi bạn nhớ, không soạn hay gửi được gì. AI gán cho nó một khả năng nó không có." },
          { text: "Định dạng bảng chấm công trong tệp của bạn: hợp với macro trong tệp đó." },
          { text: "Macro sẽ chạy trên mọi máy của cả công ty mà không cần ai mở tệp.", error: "Macro thường chạy khi có người mở tệp và bấm trên máy của họ. Nó không tự chạy khắp công ty." },
          { text: "Lưu tệp từ email vào thư mục chung khi bạn vắng: hợp với luồng chạy theo sự kiện." },
          { text: "Dựng luồng này sẽ giúp công ty tiết kiệm đúng 40 giờ mỗi năm.", error: "Con số 40 giờ không có trong dữ liệu bạn đưa. AI bịa ra một mức tiết kiệm nghe thuyết phục." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chọn theo việc",
          text: "Hỏi việc chạy ở đâu và ai dùng. Công cụ nhỏ nhất đủ dùng. Dễ bảo trì, người khác hiểu được khi bạn nghỉ. Thử và sửa nhanh.",
        },
        right: {
          label: "Chọn theo độ hiện đại",
          text: "Cái gì nghe mạnh thì dùng cho mọi việc. Nhiều thứ phức tạp phải chăm sóc. Chỉ người dựng hiểu nó. Khi lỗi, cả nhóm không biết sửa thế nào.",
        },
      },
      {
        type: "callout",
        label: "Luồng không phải lúc nào cũng được phép",
        text: "Luồng chạy trên dữ liệu công ty có thể bị giới hạn bởi chính sách và quyền của tổ chức. Trước khi dựng luồng cho cả nhóm, hỏi bộ phận CNTT xem bạn được phép dựng gì và dùng tài khoản nào.",
      },
      {
        type: "scenario",
        title: "Ba việc của chị Mai, chọn công cụ nào",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Mai có việc: mỗi chiều thứ Sáu phải nhớ gửi báo cáo tuần. Báo cáo chị soạn bằng tay. Chị định dùng gì cho chuyện này?",
            choices: [
              { label: "Dựng luồng tự động gửi báo cáo, mất hai ngày học", next: "s_over" },
              { label: "Đặt lời nhắc lặp lại vào 4 giờ chiều thứ Sáu", next: "s2" },
            ],
          },
          s_over: {
            text: "Sau hai ngày, luồng gửi được một bản trống vì báo cáo vẫn do chị soạn. Chị nhận ra việc chỉ là quên chứ không phải thao tác, và lời nhắc đã đủ.",
            ending: "bad",
          },
          s2: {
            text: "Việc thứ hai: mỗi tháng chị chỉnh bảng chấm công cho đúng mẫu, tệp chỉ chị dùng. Chị chọn gì?",
            choices: [
              { label: "Macro trong chính tệp chấm công", next: "s3" },
              { label: "Luồng tự động nối với cả hệ thống nhân sự của công ty", next: "s_over2" },
            ],
          },
          s_over2: {
            text: "Luồng cần quyền từ CNTT và mất ba tuần chờ duyệt, trong khi việc chỉ cần một macro trong tệp của chị.",
            ending: "bad",
          },
          s3: {
            text: "Việc thứ ba: lưu báo giá từ email vào thư mục chung, kể cả lúc chị nghỉ phép. Chị chọn gì?",
            choices: [
              { label: "Luồng chạy theo sự kiện email về, sau khi hỏi CNTT", next: "good" },
              { label: "Macro trong tệp, rồi dặn đồng nghiệp mở tệp mỗi sáng để nó chạy", next: "s_macro" },
            ],
          },
          s_macro: {
            text: "Chị nghỉ phép, không ai nhớ mở tệp, báo giá không được lưu cho tới khi chị về.",
            ending: "bad",
          },
          good: {
            text: "Ba việc, ba công cụ, mỗi cái đúng chỗ: lời nhắc, macro và luồng. Chị khỏi dựng thừa thứ nào.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê 3 việc lặp lại của bạn.",
          "Bước 2 - Với mỗi việc: chạy ở đâu, ai cần dùng kết quả.",
          "Bước 3 - Chọn nhắc việc, macro hay luồng theo cây quyết định.",
          "Bước 4 - Việc nào cần luồng thì hỏi CNTT trước khi dựng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba dụng cụ, ba việc: chọn cái nhỏ nhất làm được việc.",
          "Bài sau: ba phần của một luồng là kích hoạt, điều kiện và hành động.",
        ],
      },
    ],
  },
  {
    id: 2462,
    slug: "ba-phan-cua-mot-luong-kich-hoat-dieu-kien-hanh-dong",
    title: "Chặng 53, Bài 3: Ba phần của một luồng: kích hoạt, điều kiện, hành động, qua ví dụ văn phòng",
    subtitle: "Khi nào bắt đầu, có đúng trường hợp không, rồi làm gì: ba câu hỏi mô tả mọi luồng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn mô tả việc cho đồng nghiệp hay AI bằng một câu dài: 'khi có đơn xin nghỉ thì báo trưởng phòng, còn nghỉ dài thì báo cả giám đốc'. Câu đó trộn ba thứ khác nhau vào nhau nên người nghe hiểu mỗi người một kiểu. Tách ba phần ra là cách nhanh nhất để mô tả luồng rõ ràng.",
    openingQuestion:
      "Bạn nói: 'Khi có đơn xin nghỉ mới thì báo trưởng phòng.' Trong câu này, 'khi có đơn xin nghỉ mới' là phần nào của luồng?",
    openingOptions: [
      "Kích hoạt: sự kiện làm luồng bắt đầu chạy",
      "Điều kiện: phép thử quyết định có tiếp tục không",
      "Hành động: việc luồng làm",
      "Kết quả: con số báo cáo cuối cùng sau khi chạy",
    ],
    correctOption: 0,
    explanation:
      "Kích hoạt là điều xảy ra khiến luồng bắt đầu: ở đây là có đơn xin nghỉ mới. Điều kiện là câu hỏi đúng hay sai đặt sau đó, như 'đơn có dài hơn ba ngày không'. Hành động là việc luồng làm, ở đây là báo trưởng phòng. 'Kết quả' không phải một phần của cấu trúc này, và con số báo cáo không xuất hiện trong ví dụ.",
    diagram: [
      { label: "Kích hoạt: có đơn xin nghỉ mới", arrow: true },
      { label: "Điều kiện: đơn đủ thông tin, hoặc nghỉ dài", arrow: true },
      { label: "Hành động: báo trưởng phòng bằng tin nhắn", arrow: true },
      { label: "Kết thúc: ghi nhận đã báo, chờ người duyệt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhân viên nhân sự muốn trưởng phòng được báo khi có đơn xin nghỉ. Ban đầu chị viết một câu chung chung và đồng nghiệp dựng luồng báo cả lúc đơn chưa điền ngày. Khi chị tách thành kích hoạt (đơn mới được gửi), điều kiện (đã điền ngày bắt đầu và kết thúc) và hành động (nhắn trưởng phòng), luồng chỉ báo khi đơn đủ thông tin.",
    },
    quiz: [
      {
        question: "Phần nào của luồng trả lời câu hỏi 'chỉ trong trường hợp nào thì làm tiếp'?",
        options: [
          "Điều kiện, bước lọc đúng hay sai",
          "Kích hoạt, vì nó mở đầu luồng",
          "Hành động, vì nó là bước cuối quyết định việc có được làm xong",
          "Người dựng luồng, vì người đó chọn trường hợp nào được chạy trong luồng",
        ],
        correct: 0,
        explanation:
          "Điều kiện là bước lọc: đúng thì đi tiếp, sai thì dừng. Kích hoạt chỉ là sự kiện khởi đầu và không lọc gì. Hành động là việc luồng làm khi đã qua lọc. Người dựng chọn điều kiện nhưng không phải một phần nằm trong cấu trúc luồng.",
      },
      {
        question: "'Khi nhận email từ kế toán, lưu tệp vào thư mục.' Đâu là hành động?",
        options: [
          "Lưu tệp vào thư mục chung",
          "Nhận email từ kế toán, vì đó là việc xảy ra đầu tiên",
          "Kế toán gửi email",
          "Cả câu, vì luồng chỉ có một phần duy nhất",
        ],
        correct: 0,
        explanation:
          "Hành động là việc luồng làm: lưu tệp. Nhận email là kích hoạt, không phải hành động. Việc kế toán gửi nằm ngoài luồng, là chuyện xảy ra trước khi luồng chạy. Và một luồng luôn có nhiều phần tách được, không phải một khối.",
      },
      {
        question: "Đơn xin nghỉ chưa điền ngày vẫn gửi tin báo cho trưởng phòng. Phần nào bị thiếu?",
        options: [
          "Điều kiện kiểm đơn đã đủ ngày hay chưa",
          "Kích hoạt, vì luồng lẽ ra phải chạy ít hơn mỗi ngày",
          "Hành động, vì luồng đáng lẽ phải nhắn cho giám đốc thay vì trưởng phòng",
          "Một thông báo thứ hai gửi sau cho chắc rằng trưởng phòng đã thấy tin",
        ],
        correct: 0,
        explanation:
          "Luồng chạy đúng kích hoạt và hành động nhưng thiếu bước lọc, nên đơn thiếu thông tin vẫn đi qua. Đổi kích hoạt hay người nhận không sửa được chuyện đơn chưa đủ, và thêm thông báo thứ hai chỉ làm trưởng phòng bị báo thêm về đơn rỗng.",
      },
      {
        question: "Một luồng có thể có nhiều hành động không?",
        options: [
          "Có, ví dụ vừa báo trưởng phòng vừa ghi dòng vào bảng theo dõi",
          "Không, vì mỗi luồng chỉ làm một việc",
          "Chỉ khi luồng có nhiều kích hoạt",
          "Có, nhưng chỉ khi người dựng là quản lý",
        ],
        correct: 0,
        explanation:
          "Sau một kích hoạt và điều kiện, luồng có thể làm nhiều hành động nối tiếp. Không có quy tắc một luồng một việc, và số hành động không phụ thuộc số kích hoạt hay chức vụ người dựng.",
      },
      {
        question: "Bạn mô tả luồng với AI. Cách nào rõ nhất để AI không hiểu sai?",
        options: [
          "Viết ba dòng: kích hoạt là gì, điều kiện là gì, hành động là gì",
          "Viết một đoạn văn dài kể cả câu chuyện vì sao bạn cần luồng này trong công việc",
          "Chỉ nói 'tự động hoá việc báo đơn nghỉ' rồi để AI tự quyết định các chi tiết",
          "Dán cả email giữa bạn và đồng nghiệp rồi nhờ AI tự rút ra quy tắc giúp bạn",
        ],
        correct: 0,
        explanation:
          "Ba dòng ép bạn nghĩ riêng từng phần, và AI không còn chỗ đoán. Một đoạn văn dài trộn ba thứ, nhắc một câu chung chung để AI tự quyết thì nó sẽ bịa chi tiết, còn dán email thì AI có thể rút sai quy tắc từ những câu đùa hay lời qua loa.",
      },
    ],
    keyTakeaways: [
      "Kích hoạt là sự kiện làm luồng bắt đầu; điều kiện là phép thử; hành động là việc làm.",
      "Thiếu điều kiện thì luồng chạy cả với trường hợp không hợp lệ.",
      "Một luồng có thể có nhiều hành động nối tiếp.",
      "Mô tả luồng bằng ba dòng: kích hoạt, điều kiện, hành động.",
    ],
    practicePrompt: {
      question:
        "'Khi có hoá đơn mới trong thư mục, nếu số tiền trên 10 triệu thì nhắn kế toán trưởng.' Phần 'nếu số tiền trên 10 triệu' là gì?",
      options: [
        "Điều kiện",
        "Kích hoạt, vì nó nói luồng bắt đầu khi nào",
        "Hành động, vì nó là việc luồng phải làm với hoá đơn",
        "Không thuộc phần nào, vì nó chỉ là một chi tiết phụ",
      ],
      correct: 0,
      explanation:
        "Đó là phép thử quyết định có nhắn hay không, tức điều kiện. Kích hoạt là hoá đơn mới xuất hiện, và hành động là nhắn kế toán trưởng. Chi tiết phụ không tồn tại ở đây vì nếu bỏ nó luồng sẽ nhắn về mọi hoá đơn.",
    },
    summary: {
      keyIdea: "Mọi luồng đều tách được thành kích hoạt, điều kiện và hành động.",
      formula: "Khi [sự kiện] -> nếu [phép thử] -> thì [việc làm].",
      commonMistake: "Trộn ba phần vào một câu dài nên không ai biết luồng lọc trường hợp nào.",
      action: "Viết lại một việc lặp lại của bạn thành ba dòng: kích hoạt, điều kiện, hành động.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lặp lại thật trong tuần của bạn (báo khi có đơn, nhắc khi có tệp, chuyển khi có email). Viết đúng ba dòng: Khi ..., Nếu ..., Thì ... Sau đó nhờ AI đọc và chỉ ra trường hợp ngoại lệ bạn chưa nghĩ tới, như thiếu thông tin hay trùng lặp.",
      secondary: "Gạch chân chỗ bạn viết 'và' hay 'hoặc', vì đó thường là hai phần bị trộn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nói với đồng nghiệp: 'Khi có đơn xin nghỉ thì báo trưởng phòng, còn đơn dài thì báo luôn giám đốc.' Anh ấy gật đầu nhưng dựng ra thứ khác hẳn. Bài này cho bạn ba chiếc hộc để bỏ lời mô tả vào, nên không ai hiểu sai.",
      },
      {
        type: "feynman",
        title: "Ba phần của một luồng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chuông cửa có người gác cổng. Chuông reo (có người tới), người gác nhìn qua mắt thần xem có quen không, rồi mới mở cửa hoặc không. Luồng cũng có đúng ba bước đó.",
        columns: ["Phần", "Chuông cửa", "Luồng văn phòng"],
        rows: [
          ["Kích hoạt", "Chuông reo", "Có đơn xin nghỉ mới"],
          ["Điều kiện", "Nhìn mắt thần: quen hay lạ", "Đơn đã điền đủ ngày, hay nghỉ trên ba ngày"],
          ["Hành động", "Mở cửa hoặc không mở", "Nhắn trưởng phòng, ghi vào bảng"],
          ["Nếu sai điều kiện", "Không mở cửa", "Luồng dừng, không làm gì"],
        ],
        oneLiner: "Chuông reo, nhìn mắt thần, rồi mới mở cửa: kích hoạt, điều kiện, hành động.",
      },
      { type: "heading", text: "Tách câu dài thành ba dòng" },
      {
        type: "paragraph",
        text: "Câu 'khi có đơn xin nghỉ thì báo trưởng phòng' nghe đủ, nhưng thiếu mắt thần. Đơn chưa điền ngày vẫn báo? Đơn gửi nhầm cho bạn vẫn báo? Khi bạn tách ra, mỗi phần trả lời một câu hỏi riêng: bắt đầu khi nào, chỉ trong trường hợp nào, rồi làm gì.",
      },
      {
        type: "flow",
        title: "Đơn xin nghỉ đi qua ba phần",
        steps: [
          { label: "Kích hoạt: đơn xin nghỉ mới được gửi", detail: "Sự kiện làm luồng khởi động. Chưa có phép thử nào ở bước này, chỉ là 'có thứ gì đó mới tới'." },
          { label: "Điều kiện: đơn đã đủ ngày bắt đầu và kết thúc?", detail: "Nếu thiếu thì luồng dừng hoặc nhắn người gửi bổ sung. Nếu đủ thì đi tiếp." },
          { label: "Hành động: nhắn trưởng phòng và ghi vào bảng", detail: "Một luồng có thể làm nhiều hành động nối tiếp. Thông báo nên có tên người xin nghỉ, ngày nghỉ và nơi bấm duyệt." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tách ba phần AI vừa viết",
        task: "Bạn nhờ AI tách việc 'báo trưởng phòng khi có đơn xin nghỉ' thành ba phần. Đánh dấu chỗ AI nhầm hoặc tự thêm.",
        segments: [
          { text: "Kích hoạt: một đơn xin nghỉ mới được gửi vào hệ thống." },
          { text: "Điều kiện: đơn đã điền ngày bắt đầu và ngày kết thúc." },
          { text: "Điều kiện: luồng tự duyệt đơn nếu số ngày nghỉ ít hơn ba.", error: "Bạn chỉ yêu cầu báo trưởng phòng. Tự duyệt đơn là việc AI tự thêm, và quyền duyệt thuộc về con người." },
          { text: "Hành động: nhắn trưởng phòng kèm tên người xin nghỉ và các ngày nghỉ." },
          { text: "Hành động: gửi thêm tin nhắn cho giám đốc để họ nắm tình hình.", error: "Không có yêu cầu báo giám đốc. AI tự mở rộng người nhận, nên giám đốc sẽ nhận thông báo mà bạn chưa hề định." },
          { text: "Kích hoạt: luồng chạy khi trưởng phòng bấm duyệt xong đơn.", error: "Nhầm phần: duyệt đơn là việc xảy ra sau hành động, không phải kích hoạt. Kích hoạt là lúc đơn mới được gửi." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mô tả bằng ba dòng",
          text: "Mỗi dòng trả lời một câu hỏi. Người dựng không phải đoán. Dễ thử bằng ví dụ thật. AI chỉ việc điền, ít bịa.",
        },
        right: {
          label: "Mô tả bằng một câu dài",
          text: "Ba phần trộn vào nhau. Mỗi người hiểu một kiểu. Trường hợp thiếu thông tin bị bỏ sót. AI hay tự thêm bước cho đủ câu.",
        },
      },
      {
        type: "callout",
        label: "Đừng thêm việc không ai nhờ",
        text: "Khi nhờ AI dựng luồng, nó hay thêm bước cho 'hoàn chỉnh', như tự duyệt hay báo thêm người. Mỗi bước thêm là một hành động trên dữ liệu thật của công ty, nên chỉ giữ những gì bạn đã mô tả. Việc liên quan đến quyền duyệt hay chế độ nghỉ thì hỏi bộ phận nhân sự.",
      },
      {
        type: "scenario",
        title: "Tách việc báo đơn nghỉ thành ba phần",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần mô tả luồng 'báo trưởng phòng khi có đơn xin nghỉ' cho đồng nghiệp dựng. Bạn bắt đầu thế nào?",
            choices: [
              { label: "Gửi một câu: 'Tự động báo trưởng phòng mỗi khi có đơn nghỉ nhé'", next: "s_vague" },
              { label: "Viết ba dòng: Khi có đơn mới, nếu đã điền ngày, thì nhắn trưởng phòng", next: "s2" },
            ],
          },
          s_vague: {
            text: "Đồng nghiệp dựng luồng báo cả đơn chưa điền ngày và đơn gửi nhầm. Trưởng phòng nhận ba thông báo trống trong tuần đầu và bắt đầu lơ thông báo.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp hỏi: 'Nếu đơn thiếu ngày thì làm gì?' Bạn trả lời thế nào?",
            choices: [
              { label: "Dừng luồng và nhắn người gửi bổ sung ngày", next: "good" },
              { label: "Cứ báo trưởng phòng, để ông ấy tự hỏi người nộp đơn", next: "s_lazy" },
            ],
          },
          s_lazy: {
            text: "Trưởng phòng nhận đơn thiếu ngày và phải tự đi hỏi. Luồng có điều kiện nhưng không xử lý ca thiếu, nên việc vẫn dồn sang một người.",
            ending: "bad",
          },
          good: {
            text: "Luồng chỉ báo khi đơn đủ ngày, đơn thiếu thì người gửi được nhắc bổ sung. Trưởng phòng chỉ nhận đơn sẵn sàng để duyệt.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một việc lặp lại và viết: Khi ... (kích hoạt).",
          "Bước 2 - Viết: Nếu ... (điều kiện), nghĩ tới trường hợp thiếu thông tin.",
          "Bước 3 - Viết: Thì ... (hành động), chỉ những việc đã định.",
          "Bước 4 - Hỏi: nếu điều kiện sai thì sao? rồi ghi luôn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kích hoạt để bắt đầu, điều kiện để lọc, hành động để làm: ba dòng là đủ mô tả.",
          "Bài sau: tài khoản công việc và giới hạn của tổ chức, hỏi ai trước khi dựng luồng.",
        ],
      },
    ],
  },
  {
    id: 2463,
    slug: "quyen-tai-khoan-cong-viec-va-gioi-han-cua-to-chuc",
    title: "Chặng 53, Bài 4: Tài khoản công việc và giới hạn của tổ chức: hỏi ai trước khi dựng luồng",
    subtitle: "Dựng luồng trên dữ liệu công ty giống mượn chìa khoá phòng họp: cần biết ai cho phép.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dựng xong một luồng chạy ngon trên tài khoản cá nhân, rồi mang sang tài khoản công ty thì bị chặn, hoặc tệ hơn: nó chạy và đưa dữ liệu khách hàng ra chỗ không được phép. Hỏi bộ phận CNTT vài câu trước khi dựng tiết kiệm được cả tuần làm lại và tránh một sự cố dữ liệu.",
    openingQuestion:
      "Bạn định dựng luồng lưu tệp hợp đồng từ email vào một dịch vụ lưu trữ ngoài bạn hay dùng. Bước đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Hỏi bộ phận CNTT xem dịch vụ đó có được phép dùng với dữ liệu công ty không",
      "Dựng thử bằng tài khoản cá nhân, nếu chạy ổn thì chuyển sang tài khoản công ty",
      "Dựng luôn trên tài khoản công ty rồi xoá đi nếu có ai phàn nàn",
      "Hỏi đồng nghiệp ở phòng khác xem họ đã từng dùng dịch vụ đó chưa",
    ],
    correctOption: 0,
    explanation:
      "Công ty có thể có chính sách về nơi được lưu dữ liệu, và chỉ bộ phận CNTT hay bảo mật biết rõ. Dựng thử bằng tài khoản cá nhân với dữ liệu thật là đưa dữ liệu công ty ra ngoài ngay từ lần thử. Dựng rồi xoá khi có người phàn nàn thì dữ liệu đã đi trước khi xoá. Ý kiến đồng nghiệp hữu ích nhưng không thay được quy định chính thức.",
    diagram: [
      { label: "Viết rõ luồng chạm vào dữ liệu nào, của ai", arrow: true },
      { label: "Soạn câu hỏi gửi bộ phận CNTT hoặc bảo mật", arrow: true },
      { label: "Nhận trả lời: được phép, tài khoản nào, giới hạn gì", arrow: true },
      { label: "Dựng bằng tài khoản công việc, thử với dữ liệu giả" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh dựng luồng chuyển thông tin khách hàng từ email sang một bảng tính cá nhân để tiện theo dõi. Luồng chạy tốt, nhưng bảng nằm ngoài hệ thống công ty nên một tuần sau bộ phận CNTT phát hiện và yêu cầu dừng. Nếu cô hỏi trước và dùng tài khoản công việc thì đã tránh được một buổi giải trình.",
    },
    quiz: [
      {
        question: "Vì sao nên dùng tài khoản công việc, không dùng tài khoản cá nhân, cho luồng chạy trên dữ liệu công ty?",
        options: [
          "Vì công ty kiểm soát quyền truy cập và dữ liệu nằm trong nơi được phép",
          "Vì tài khoản cá nhân không thể tạo được luồng tự động chạy được",
          "Vì tài khoản công việc chạy luồng nhanh hơn tài khoản cá nhân nhiều",
          "Vì quy định pháp luật cấm mọi luồng tự động trên tài khoản cá nhân",
        ],
        correct: 0,
        explanation:
          "Tài khoản công việc nằm dưới chính sách của tổ chức: quyền, nhật ký, nơi lưu dữ liệu. Tài khoản cá nhân vẫn có thể dựng luồng nên không phải lý do kỹ thuật, tốc độ không thuộc về loại tài khoản, và chuyện pháp luật thì bạn hỏi pháp chế chứ không khẳng định chung chung.",
      },
      {
        question: "Loại thông tin nào nên hỏi CNTT trước khi đưa vào một luồng?",
        options: [
          "Dữ liệu khách hàng, hợp đồng, bảng lương",
          "Lịch họp chung đã được dán lên bảng tin công ty",
          "Mẫu biểu điền trống",
          "Tên các phòng ban đã có trên sơ đồ tổ chức công khai",
        ],
        correct: 0,
        explanation:
          "Thông tin về khách, hợp đồng và lương là dữ liệu nhạy cảm, nên luồng chạm vào chúng cần được duyệt. Lịch họp chung, mẫu trống và sơ đồ tổ chức công khai không chứa thông tin riêng, nên không phải nhóm hỏi trước.",
      },
      {
        question: "CNTT trả lời 'cần giấy phép cao hơn mới dùng được chức năng này'. Bạn nên làm gì?",
        options: [
          "Hỏi xem chức năng nào dùng được với giấy phép hiện có của bạn",
          "Tự mua giấy phép cá nhân",
          "Dựng luồng trên tài khoản của một đồng nghiệp có giấy phép cao hơn",
          "Bỏ hẳn ý định tự động hoá vì công ty chắc chắn không cho làm",
        ],
        correct: 0,
        explanation:
          "Giấy phép quyết định chức năng nào dùng được, nên hỏi 'với giấy phép hiện có thì làm được gì' mở ra lựa chọn thực tế. Mượn tài khoản người khác là vượt quyền, tự mua giấy phép cá nhân đưa dữ liệu công ty ra ngoài, còn bỏ cuộc là bỏ qua việc vẫn có thể làm được.",
      },
      {
        question: "Khi soạn câu hỏi gửi CNTT, thông tin nào giúp họ trả lời nhanh nhất?",
        options: [
          "Luồng chạy khi nào, đọc và ghi dữ liệu gì, ở đâu, ai xem được",
          "Một đoạn dài kể vì sao bạn thấy việc này nhàm chán mỗi ngày",
          "Một câu ngắn 'cho em làm tự động hoá với' rồi chờ họ hỏi lại",
          "Ảnh chụp màn hình cả máy tính của bạn, không kèm lời giải thích",
        ],
        correct: 0,
        explanation:
          "CNTT cần biết luồng chạm vào gì để đánh giá rủi ro: sự kiện khởi động, dữ liệu đọc, nơi ghi, người xem. Lời kể nhàm chán không giúp đánh giá, một câu chung chung bắt họ hỏi lại nhiều vòng, còn ảnh màn hình không kèm giải thích thì khó hiểu mục đích.",
      },
      {
        question: "Bạn nhờ AI soạn câu hỏi gửi CNTT và nó viết: 'Theo điều khoản luật bảo vệ dữ liệu, bạn bắt buộc phải duyệt'. Nên làm gì?",
        options: [
          "Bỏ câu trích luật, vì AI có thể bịa điều khoản, rồi hỏi bằng mô tả việc",
          "Giữ nguyên câu đó, vì có trích luật thì CNTT sẽ phải duyệt nhanh hơn",
          "Thêm số điều khoản cụ thể cho câu nghe chắc chắn và đáng tin hơn nữa với CNTT",
          "Gửi luôn, vì AI được huấn luyện trên nhiều văn bản luật nên chắc đúng",
        ],
        correct: 0,
        explanation:
          "AI có thể nêu điều khoản không tồn tại hoặc sai nội dung mà vẫn trôi chảy. Bạn không cần viện luật: chỉ cần mô tả rõ luồng, còn câu hỏi pháp lý thì để bộ phận pháp chế. Thêm số điều khoản là bịa thêm, và gửi luôn mà không kiểm là đưa ra một khẳng định bạn không chắc.",
      },
    ],
    keyTakeaways: [
      "Luồng chạm vào dữ liệu công ty thì hỏi CNTT trước khi dựng, không phải sau.",
      "Dùng tài khoản công việc, không mượn tài khoản người khác, không dùng tài khoản cá nhân.",
      "Giấy phép quyết định chức năng nào dùng được: hỏi 'với giấy phép hiện có thì làm được gì'.",
      "Câu hỏi tốt mô tả: khi nào chạy, đọc và ghi gì, ở đâu, ai xem được.",
    ],
    practicePrompt: {
      question:
        "Chị Hà chưa rõ công ty có cho lưu tệp nhân sự lên một dịch vụ ngoài không. Chị nên viết gì cho CNTT?",
      options: [
        "Mô tả luồng, loại tệp, nơi lưu, và hỏi có được phép không",
        "Chỉ gửi câu 'em có được dùng dịch vụ đó không' rồi chờ trả lời",
        "Nói 'em đã dùng thử rồi, ổn cả', để họ coi như đã chấp nhận",
        "Nhắn tất cả nhân viên hỏi ý kiến xem ai từng dùng dịch vụ đó",
      ],
      correct: 0,
      explanation:
        "Mô tả đủ để CNTT đánh giá được rủi ro. Câu ngắn buộc họ hỏi lại, báo 'đã dùng thử' là làm trước xin sau, còn hỏi cả công ty chỉ được ý kiến cá nhân chứ không phải quy định.",
    },
    summary: {
      keyIdea: "Dữ liệu công ty đi qua luồng thì cần tài khoản công việc và sự cho phép của tổ chức.",
      formula: "Mô tả luồng (chạy khi nào, đọc/ghi gì, ở đâu, ai xem) + hỏi CNTT = dựng đúng và an toàn.",
      commonMistake: "Thử bằng tài khoản cá nhân với dữ liệu thật rồi mới xin phép.",
      action: "Soạn năm dòng mô tả luồng bạn muốn dựng và gửi cho bộ phận CNTT.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một luồng bạn muốn dựng. Viết bản mô tả ngắn: luồng chạy khi nào, đọc dữ liệu nào, ghi vào đâu, ai xem được, có chứa thông tin khách hay thông tin nhân sự không. Nhờ AI sửa lại cho gọn (không nhờ nó trích luật), rồi gửi cho CNTT hoặc người quản lý.",
      secondary: "Ghi lại câu trả lời để lần dựng luồng sau không phải hỏi lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Luồng của bạn sắp chạm vào thư mục hợp đồng hoặc email khách hàng. Trước khi bấm bất cứ thứ gì, có vài câu nên hỏi người quản lý hệ thống. Bài này giúp bạn hỏi gọn và đúng người.",
      },
      {
        type: "feynman",
        title: "Quyền và giới hạn của tổ chức đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc mượn chìa khoá phòng họp của toà nhà. Bạn không tự đi sao chìa, không mượn chìa của người khác, và bảo vệ cho biết phòng nào được dùng vào giờ nào. Tài khoản công việc và chính sách của công ty cũng vậy.",
        columns: ["Khái niệm", "Chìa khoá phòng họp", "Luồng trong công ty"],
        rows: [
          ["Chìa khoá của bạn", "Thẻ ra vào của chính bạn", "Tài khoản công việc của bạn"],
          ["Quy định toà nhà", "Phòng nào, giờ nào được dùng", "Chính sách về dữ liệu và dịch vụ được phép"],
          ["Loại thẻ", "Thẻ thường hay thẻ nhiều tầng", "Loại giấy phép quyết định chức năng"],
          ["Ai cho phép", "Ban quản lý toà nhà", "Bộ phận CNTT hoặc bảo mật"],
        ],
        oneLiner: "Luồng mượn đúng chìa khoá của bạn và đi đúng phòng công ty cho phép: hỏi quản lý toà nhà trước khi đi.",
      },
      { type: "heading", text: "Ba điều cần biết trước khi dựng" },
      {
        type: "paragraph",
        text: "Thứ nhất, bạn được dựng luồng bằng tài khoản công việc của mình không. Thứ hai, dữ liệu này được phép đi tới nơi nào, vì công ty có thể chặn một số dịch vụ bên ngoài. Thứ ba, giấy phép hiện có cho dùng chức năng nào. Mỗi công ty trả lời khác nhau, nên đừng đoán từ kinh nghiệm cá nhân.",
      },
      {
        type: "flow",
        title: "Từ ý tưởng tới luồng được phép",
        steps: [
          { label: "Viết luồng chạm vào dữ liệu nào", detail: "Ghi: email nào, thư mục nào, bảng nào, có thông tin khách hay nhân sự không. Càng cụ thể CNTT càng trả lời nhanh." },
          { label: "Hỏi bộ phận CNTT hoặc bảo mật", detail: "Hỏi: tôi được dựng không, bằng tài khoản nào, dữ liệu này được lưu hoặc gửi tới đâu, giấy phép của tôi dùng được gì." },
          { label: "Đọc câu trả lời, ghi lại giới hạn", detail: "Nếu bị từ chối, hỏi tiếp có cách nào gần nhất trong phạm vi cho phép. Đừng tìm đường vòng bằng tài khoản khác." },
          { label: "Dựng và thử bằng dữ liệu giả", detail: "Chỉ khi có câu trả lời mới dựng, và thử với tệp giả trước khi chạm dữ liệu thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Soạn câu hỏi gửi CNTT",
        task: "Bạn nhờ AI soạn email hỏi CNTT trước khi dựng luồng lưu hợp đồng. Chọn từng phần để lắp yêu cầu tốt.",
        parts: [
          {
            id: "what",
            label: "Mô tả luồng",
            options: [
              { text: "Em muốn làm một luồng tự động cho công việc của em.", feedback: "Quá chung: CNTT không biết luồng chạm vào gì nên sẽ phải hỏi lại nhiều vòng." },
              { text: "Khi email có hợp đồng PDF về, lưu tệp vào thư mục Hợp đồng chung; không gửi đi đâu ngoài hệ thống.", good: true, feedback: "Có sự kiện, dữ liệu và nơi lưu, nên CNTT đánh giá được ngay." },
            ],
          },
          {
            id: "ask",
            label: "Câu hỏi",
            options: [
              { text: "Em đã dựng thử rồi, nhờ anh duyệt cho.", feedback: "Nói trước rồi xin sau: nếu thử dùng dữ liệu thật thì dữ liệu đã đi trước khi được duyệt." },
              { text: "Em có được dựng không, bằng tài khoản nào, và giấy phép của em dùng được chức năng nào?", good: true, feedback: "Ba câu hỏi đúng chỗ: quyền, tài khoản, giấy phép." },
            ],
          },
          {
            id: "law",
            label: "Cách dẫn căn cứ",
            options: [
              { text: "Theo điều khoản luật bảo vệ dữ liệu, anh bắt buộc phải duyệt.", feedback: "AI có thể bịa điều khoản. Đưa trích dẫn chưa kiểm vào email gửi người khác còn làm bạn mất uy tín." },
              { text: "Không trích luật; nếu cần căn cứ pháp lý thì em sẽ hỏi bộ phận pháp chế.", good: true, feedback: "Bạn hỏi bằng mô tả việc, còn câu pháp lý để đúng người trả lời." },
            ],
          },
        ],
        responses: [
          {
            requires: ["what", "ask", "law"],
            text: "Kính gửi anh/chị bộ phận CNTT,\n\nEm muốn dựng luồng: khi email có hợp đồng PDF về hộp thư công việc, lưu tệp vào thư mục Hợp đồng chung, không gửi ra ngoài hệ thống.\nEm có được dựng không, bằng tài khoản nào, và giấy phép của em dùng được chức năng nào ạ?\nCảm ơn anh/chị.",
          },
          {
            requires: ["what"],
            text: "Kính gửi anh/chị,\n\nEm muốn dựng luồng lưu hợp đồng PDF vào thư mục chung. Em đã dựng thử và chạy rất tốt, theo điều 12 luật bảo vệ dữ liệu thì việc này hợp lệ, nhờ anh duyệt.\n(Mô tả tốt nhưng AI bịa số điều luật, và 'đã dựng thử' là làm trước xin sau.)",
          },
          {
            text: "Kính gửi anh/chị,\n\nEm muốn làm tự động hoá cho công việc của em. Nhờ anh/chị cho phép. Việc này chắc không có rủi ro gì.\n(Thiếu luồng chạm vào dữ liệu nào, và khẳng định 'không có rủi ro' mà chưa ai kiểm.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi trước rồi dựng",
          text: "Biết mình được dùng tài khoản và chức năng nào. Dữ liệu chỉ đi tới nơi cho phép. Nếu bị từ chối thì chưa mất công dựng. Người quản lý hệ thống ghi nhận và hỗ trợ.",
        },
        right: {
          label: "Dựng rồi mới xin phép",
          text: "Có thể tốn cả tuần rồi bị chặn. Dữ liệu có thể đã ra ngoài hệ thống. Bị yêu cầu dừng giữa chừng. Mất tin tưởng của bộ phận CNTT cho lần sau.",
        },
      },
      {
        type: "callout",
        label: "Bạn không cần biết luật, chỉ cần biết hỏi ai",
        text: "Việc dữ liệu nào được lưu ở đâu, hay điều khoản pháp lý nào áp dụng, là việc của bộ phận CNTT, bảo mật và pháp chế. Bạn chỉ cần mô tả rõ luồng và hỏi đúng người. Đừng tự dẫn điều luật, nhất là khi AI đưa ra.",
      },
      {
        type: "scenario",
        title: "Luồng lưu hợp đồng, hỏi ai trước",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn muốn dựng luồng lưu hợp đồng từ email vào thư mục chung. Bạn chưa rõ công ty có cho phép không.",
            choices: [
              { label: "Dựng thử bằng tài khoản cá nhân với một hợp đồng thật để xem chạy ra sao", next: "s_bad" },
              { label: "Soạn mô tả luồng và hỏi bộ phận CNTT trước", next: "s2" },
            ],
          },
          s_bad: {
            text: "Luồng chạy và một hợp đồng khách hàng nằm trong tài khoản cá nhân của bạn. Tuần sau CNTT phát hiện và yêu cầu xoá, bạn phải giải trình.",
            ending: "bad",
          },
          s2: {
            text: "CNTT trả lời: được dựng bằng tài khoản công việc, nhưng chức năng bạn định dùng cần giấy phép cao hơn.",
            choices: [
              { label: "Mượn tài khoản của một đồng nghiệp có giấy phép cao hơn để làm cho xong", next: "s_bad2" },
              { label: "Hỏi lại: với giấy phép hiện có thì làm được cách nào gần nhất", next: "good" },
            ],
          },
          s_bad2: {
            text: "Luồng chạy dưới tên đồng nghiệp. Khi anh ấy nghỉ việc, luồng ngừng hoạt động, và ghi nhận trong hệ thống ghi tên anh ấy cho những việc anh không làm.",
            ending: "bad",
          },
          good: {
            text: "CNTT gợi ý một cách làm trong phạm vi giấy phép hiện có, hơi thủ công hơn nhưng được phép. Bạn dựng bằng tài khoản công việc và thử bằng hợp đồng giả.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết luồng chạy khi nào, chạm vào dữ liệu gì, lưu ở đâu.",
          "Bước 2 - Hỏi CNTT: được dựng không, tài khoản nào, giấy phép dùng được gì.",
          "Bước 3 - Ghi lại câu trả lời và giới hạn.",
          "Bước 4 - Dựng bằng tài khoản công việc, thử bằng dữ liệu giả.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hỏi ba câu trước khi dựng: được không, bằng tài khoản nào, dùng được chức năng gì.",
          "Bài sau: mini dự án báo cả nhóm khi có tệp mới trong thư mục chung.",
        ],
      },
    ],
  },
  {
    id: 2464,
    slug: "mini-du-an-bao-nhom-khi-co-tep-moi-trong-thu-muc",
    title: "Chặng 53, Bài 5: Mini dự án: báo cả nhóm khi có tệp mới trong thư mục chung",
    subtitle: "Một tấm chuông cửa cho thư mục: tệp mới vào thì cả nhóm biết ai bỏ gì vào.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔔",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhóm bạn dùng chung một thư mục, nhưng không ai biết khi có tệp mới. Người ta phải mở thư mục mỗi sáng hoặc hỏi nhau trong nhóm chat. Một luồng báo ngắn, có tên tệp và người tải lên, xoá được việc hỏi đi hỏi lại đó, nếu bạn thử cẩn thận để nó không thành nguồn thông báo rác.",
    openingQuestion:
      "Bạn dựng luồng nhắn cả nhóm khi có tệp mới trong thư mục chung. Nội dung tin nhắn nên có gì để người nhận hành động được ngay?",
    openingOptions: [
      "Tên tệp, người tải lên và liên kết mở tệp",
      "Chỉ dòng 'có tệp mới'",
      "Toàn bộ nội dung tệp dán thẳng vào tin nhắn",
      "Lời chúc mừng cả nhóm và biểu tượng vui vẻ",
    ],
    correctOption: 0,
    explanation:
      "Người nhận cần biết tệp nào, ai tải, và bấm vào đâu để mở. Chỉ ghi 'có tệp mới' buộc họ vào thư mục tự tìm. Dán cả nội dung tệp vào tin nhắn thì tin quá dài và đưa dữ liệu ra một kênh khác. Lời chúc mừng không giúp ai làm việc và làm thông báo dài thêm.",
    diagram: [
      { label: "Kích hoạt: có tệp mới trong thư mục chung", arrow: true },
      { label: "Điều kiện: tệp đúng loại, không phải tệp tạm", arrow: true },
      { label: "Hành động: nhắn cả nhóm kèm tên tệp, người tải, liên kết", arrow: true },
      { label: "Thử bằng tệp giả trước khi bật cho cả nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhóm thiết kế năm người dùng chung thư mục bản thảo. Trưởng nhóm dựng luồng nhắn vào nhóm chat khi có tệp mới, ghi tên tệp và người tải lên. Tuần đầu nhóm nhận cả thông báo về tệp tạm do phần mềm tự sinh, nên trưởng nhóm thêm điều kiện chỉ báo với tệp PDF và hình ảnh.",
    },
    quiz: [
      {
        question: "Luồng báo thêm cả tệp tạm do phần mềm tự sinh ra. Nên sửa phần nào?",
        options: [
          "Thêm điều kiện chỉ báo với loại tệp cần thiết",
          "Đổi kích hoạt cho chạy ít lần",
          "Nhắn riêng cho người tải lên",
          "Tắt luồng đi và quay lại hỏi nhau trong nhóm chat như trước",
        ],
        correct: 0,
        explanation:
          "Vấn đề là luồng báo cả thứ không cần, tức thiếu phép lọc, nên sửa ở điều kiện. Chạy ít lần hơn hay nhắn riêng không loại được tệp tạm, và tắt luồng là bỏ cả thứ có ích chỉ vì một lỗi lọc.",
      },
      {
        question: "Bạn thử luồng bằng cách nào là an toàn nhất trước khi bật cho cả nhóm?",
        options: [
          "Tải một tệp giả lên thư mục và xem tin nhắn nhận được",
          "Bật luôn cho cả nhóm, vì thông báo sai thì không hại gì",
          "Thử bằng một tệp thật chứa dữ liệu khách hàng",
          "Chỉ đọc lại phần mô tả luồng và tin là nó chạy đúng như mô tả",
        ],
        correct: 0,
        explanation:
          "Tệp giả cho thấy luồng chạy đúng mà không chạm dữ liệu thật. Bật luôn cho cả nhóm khiến mọi người nhận thông báo sai và dần tắt tiếng. Tệp thật với dữ liệu khách hàng có thể lộ thông tin trong tin nhắn. Đọc mô tả không bắt được lỗi chỉ hiện lúc chạy, như tệp tạm hay tên dài bị cắt.",
      },
      {
        question: "Mỗi tệp mới có một tin báo, nhóm nhận 40 tin mỗi ngày. Cách nào hợp lý?",
        options: [
          "Gộp thành một bản tóm tắt vào cuối ngày",
          "Giữ nguyên, vì báo đủ từng tệp luôn tốt hơn bản tóm tắt",
          "Giảm chữ trong mỗi tin nhắn cho mỗi tin chỉ còn một từ",
          "Chỉ báo tệp của trưởng nhóm",
        ],
        correct: 0,
        explanation:
          "Gộp giữ đủ thông tin mà giảm số lần làm phiền, còn báo từng tệp với nhóm ít người là nhiều thông báo rác. Giảm chữ không giảm số tin. Chỉ báo tệp của trưởng nhóm thì tệp của người khác bị bỏ sót, cả nhóm vẫn không biết.",
      },
      {
        question: "Tin nhắn nên ghi tên người tải lên vì lý do chính nào?",
        options: [
          "Người nhận biết hỏi ai nếu cần giải thích về tệp",
          "Để khen người làm việc chăm chỉ trước cả nhóm",
          "Để hệ thống tự động tính xem ai tải lên nhiều nhất",
          "Vì luồng không chạy nếu tin nhắn không có tên người",
        ],
        correct: 0,
        explanation:
          "Tên người tải giúp người nhận biết hỏi ai khi có thắc mắc. Khen ngợi không phải mục đích của thông báo, việc thống kê là một luồng khác, và luồng vẫn chạy được mà không cần tên người.",
      },
      {
        question: "Bạn nhờ AI viết tin nhắn mẫu và nó thêm 'Tệp đã được kiểm duyệt an toàn'. Nên làm gì?",
        options: [
          "Xoá câu đó vì luồng không hề kiểm duyệt gì",
          "Giữ lại cho nhóm yên tâm",
          "Đổi thành 'đã quét virus'",
          "Giữ lại nhưng in nhỏ",
        ],
        correct: 0,
        explanation:
          "Luồng của bạn chỉ báo có tệp mới, không kiểm duyệt hay quét gì. Một câu khẳng định an toàn mà không ai kiểm là lời hứa bịa, khiến người ta mở tệp lạ mà yên tâm. Đổi thành 'đã quét virus' là bịa thêm, còn in nhỏ vẫn là khẳng định sai.",
      },
      {
        question: "Hai người cùng tải tệp trong một phút. Luồng nên làm gì?",
        options: [
          "Gửi hai tin riêng, mỗi tin có tên tệp và người tải của nó",
          "Chỉ gửi một tin cho tệp đầu",
          "Đợi cả ngày rồi gửi một tin chỉ liệt kê số lượng tệp",
          "Gửi hai tin nhưng bỏ tên người tải để tin ngắn hơn và dễ đọc hơn",
        ],
        correct: 0,
        explanation:
          "Mỗi tệp có người tải và liên kết riêng, nên hai tin riêng giữ đúng thông tin. Gửi một tin bỏ sót tệp thứ hai. Đợi cả ngày làm mất tính kịp thời và chỉ đếm số thì người nhận không mở được tệp. Bỏ tên người làm mất thứ giúp biết hỏi ai.",
      },
    ],
    keyTakeaways: [
      "Thông báo tốt có tên tệp, người tải lên và liên kết mở tệp.",
      "Thêm điều kiện để không báo tệp tạm hay loại tệp không cần.",
      "Thử bằng tệp giả trước khi bật cho cả nhóm.",
      "Nhiều tin trong ngày thì gộp thành bản tóm tắt.",
    ],
    practicePrompt: {
      question:
        "Luồng báo nhóm thiết kế khi có tệp mới. Hôm nay nó báo 15 lần, trong đó 9 lần là tệp tạm. Sửa gì đầu tiên?",
      options: [
        "Thêm điều kiện lọc loại tệp",
        "Thêm một thông báo thứ hai để nhắc cả nhóm đọc thông báo đầu",
        "Đổi tên luồng cho dễ nhớ hơn trong danh sách luồng của bạn",
        "Mời thêm người vào nhóm để thông báo có nhiều người đọc hơn",
      ],
      correct: 0,
      explanation:
        "Phần lớn lần báo là tệp tạm nên cần lọc. Thông báo thứ hai làm tình trạng nhiều tin hơn. Đổi tên luồng không đổi hành vi của nó, và thêm người chỉ nhân số người bị làm phiền.",
    },
    summary: {
      keyIdea: "Thông báo tốt ngắn, có tên tệp, người tải và liên kết, chỉ báo khi thật cần.",
      formula: "Tệp mới + đúng loại -> tin nhắn: tên tệp, người tải lên, liên kết.",
      commonMistake: "Bật luôn cho cả nhóm mà không thử bằng tệp giả, rồi nhóm nhận tin tệp tạm.",
      action: "Dựng hoặc mô tả luồng báo tệp mới cho một thư mục nhóm bạn và thử bằng một tệp giả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thư mục chung của nhóm bạn. Viết ba dòng mô tả luồng: khi có tệp mới, nếu là loại tệp nào, thì nhắn cho ai với nội dung gì. Soạn mẫu tin nhắn với tên tệp, người tải và liên kết, rồi viết ba ca thử: tệp hợp lệ, tệp tạm, hai tệp cùng lúc.",
      secondary: "Hỏi nhóm xem họ muốn nhận báo từng tệp hay bản tóm tắt cuối ngày.",
    },
    sections: [
      {
        type: "lead",
        text: "Cả nhóm dùng chung một thư mục, và ngày nào cũng có người hỏi 'có bản mới chưa?'. Bài mini dự án này gom các thứ bạn đã học: kích hoạt, điều kiện, hành động, quyền, vào một luồng nhỏ dùng được thật.",
      },
      {
        type: "feynman",
        title: "Luồng báo tệp mới đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tấm bảng tin ở sảnh chung cư: ai dán thông báo mới thì người gác dán thêm mảnh giấy 'có thông báo mới của ai, ở đâu'. Luồng báo tệp mới là người gác đó, và mảnh giấy phải đủ rõ để cư dân biết đi đâu.",
        columns: ["Thành phần", "Bảng tin chung cư", "Luồng báo tệp mới"],
        rows: [
          ["Sự kiện", "Có thông báo mới dán lên", "Có tệp mới vào thư mục chung"],
          ["Lọc", "Bỏ qua mẩu giấy nháp", "Bỏ qua tệp tạm, chỉ lấy loại cần"],
          ["Mảnh giấy báo", "Ai dán, dán ở đâu", "Tên tệp, người tải, liên kết"],
          ["Thử", "Dán một giấy nháp xem người gác làm gì", "Tải một tệp giả lên rồi xem tin nhận được"],
        ],
        oneLiner: "Luồng báo chỉ là người gác bảng tin: lọc giấy nháp, ghi rõ ai dán, ở đâu.",
      },
      { type: "heading", text: "Ba quyết định của mini dự án" },
      {
        type: "paragraph",
        text: "Bạn chỉ cần quyết ba điều. Báo khi nào: mỗi tệp hay gộp cuối ngày. Báo gì: tên tệp, người tải, liên kết, và không gì thêm. Báo ai: cả nhóm hay chỉ người liên quan. Quyết xong thì luồng đơn giản, và việc khó nhất còn lại là thử cho kỹ.",
      },
      {
        type: "flow",
        title: "Luồng báo tệp mới, từng bước",
        steps: [
          { label: "Kích hoạt: tệp mới vào thư mục", detail: "Chọn đúng thư mục chung của nhóm, không phải cả ổ đĩa. Thư mục càng hẹp, thông báo càng ít nhiễu." },
          { label: "Điều kiện: loại tệp cần báo", detail: "Chỉ PDF, hình ảnh hay bảng tính tuỳ nhóm. Tệp tạm do phần mềm tự sinh bị bỏ qua." },
          { label: "Hành động: nhắn vào nhóm", detail: "Tin gồm tên tệp, người tải lên và liên kết mở tệp. Không chứa nội dung tệp." },
          { label: "Thử: tải một tệp giả", detail: "Xem tin có đúng tên, đúng người, liên kết mở được chưa. Thử cả ca tệp tạm và ca hai tệp cùng lúc." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin nhắn báo tệp mới",
        task: "Bạn nhờ AI viết mẫu tin nhắn cho luồng. Chọn từng phần để lắp yêu cầu tốt.",
        parts: [
          {
            id: "content",
            label: "Nội dung tin",
            options: [
              { text: "Viết thông báo có tệp mới cho cả nhóm.", feedback: "Thiếu chỗ trống cụ thể: AI sẽ tự bịa tên tệp và người gửi để tin trông đầy đủ." },
              { text: "Dùng chỗ trống {ten_tep}, {nguoi_tai}, {lien_ket}; không tự điền giá trị nào.", good: true, feedback: "Luồng điền giá trị thật từ thư mục, AI không có cơ hội bịa." },
            ],
          },
          {
            id: "length",
            label: "Độ dài",
            options: [
              { text: "Viết đầy đủ, chi tiết, có lời chào và lời chúc cho cả nhóm.", feedback: "Mỗi tin dài thêm là thêm chữ phải đọc mỗi lần có tệp, nên nhóm sẽ sớm tắt tiếng." },
              { text: "Tối đa hai dòng: dòng một là tên tệp và người tải, dòng hai là liên kết.", good: true, feedback: "Đọc trong hai giây và bấm được ngay." },
            ],
          },
          {
            id: "claims",
            label: "Điều không được nói",
            options: [
              { text: "Không có giới hạn gì thêm, AI cứ viết cho tự nhiên.", feedback: "AI hay thêm câu như 'đã kiểm duyệt an toàn' mà luồng không hề làm." },
              { text: "Không khẳng định gì luồng không làm, như kiểm duyệt, quét virus hay đã duyệt nội dung.", good: true, feedback: "Tin chỉ nói điều luồng thật sự biết: có tệp mới, tên gì, ai tải." },
            ],
          },
        ],
        responses: [
          {
            requires: ["content", "length", "claims"],
            text: "{ten_tep} vừa được {nguoi_tai} tải lên.\nMở tệp: {lien_ket}",
          },
          {
            requires: ["content"],
            text: "Chào cả nhóm! Có tệp mới {ten_tep} do {nguoi_tai} tải lên, đã được kiểm duyệt an toàn. Chúc mọi người một ngày làm việc vui vẻ!\nMở tệp: {lien_ket}\n(Chỗ trống đúng nhưng dài, và AI thêm câu 'đã kiểm duyệt' mà luồng không làm.)",
          },
          {
            text: "Thông báo: Anh Tuấn vừa tải lên bản thảo quý 3 lúc 9 giờ, dung lượng 4 MB.\n(AI bịa tên người, tên tệp, giờ và dung lượng vì không có chỗ trống nào để điền.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Báo từng tệp ngay lập tức",
          text: "Cả nhóm biết ngay khi có bản mới. Hợp với thư mục ít tệp, việc gấp. Khi nhiều tệp thì thông báo dày đặc. Cần điều kiện lọc kỹ.",
        },
        right: {
          label: "Gộp thành bản tóm tắt cuối ngày",
          text: "Mỗi ngày một tin duy nhất, đủ danh sách tệp. Hợp với thư mục nhiều tệp. Người nhận biết chậm hơn đến cuối ngày. Ít bị tắt tiếng.",
        },
      },
      {
        type: "callout",
        label: "Thử bằng tệp giả, đừng thử bằng dữ liệu thật",
        text: "Tin nhắn báo có thể hiện tên tệp, và tên tệp đôi khi chứa tên khách hay số hợp đồng. Dùng tệp giả khi thử, và hỏi bộ phận CNTT xem nhóm chat của bạn có được dùng để nhận thông báo từ thư mục công ty không.",
      },
      {
        type: "scenario",
        title: "Bật luồng báo tệp mới cho nhóm",
        start: "s1",
        nodes: {
          s1: {
            text: "Luồng báo tệp mới đã dựng xong. Nhóm có 6 người và thư mục nhận khoảng 20 tệp mỗi ngày, vài tệp là tệp tạm.",
            choices: [
              { label: "Bật luôn cho cả nhóm, có gì sửa sau", next: "s_bad" },
              { label: "Tải lên ba tệp giả: một PDF, một tệp tạm, hai tệp cùng lúc", next: "s2" },
            ],
          },
          s_bad: {
            text: "Ngày đầu nhóm nhận 20 tin, nửa số đó là tệp tạm. Đến chiều cả nhóm tắt tiếng thông báo, và khi có bản thảo quan trọng không ai thấy.",
            ending: "bad",
          },
          s2: {
            text: "Kết quả thử: tệp PDF được báo đúng, nhưng tệp tạm cũng được báo. Bạn làm gì?",
            choices: [
              { label: "Thêm điều kiện lọc loại tệp rồi thử lại bằng ba tệp giả", next: "s3" },
              { label: "Bỏ qua, vì chỉ vài tệp tạm thôi và cả nhóm chắc sẽ biết đường bỏ qua", next: "s_ignore" },
            ],
          },
          s_ignore: {
            text: "Mỗi ngày vài tin thừa đều đều, và sau hai tuần người ta thôi đọc thông báo, kể cả tin về tệp thật.",
            ending: "bad",
          },
          s3: {
            text: "Giờ tệp tạm không được báo. Hai tệp cùng lúc nhận hai tin riêng, mỗi tin đúng tên và đúng người. Bạn định bật cho nhóm.",
            choices: [
              { label: "Bật cho nhóm và hỏi sau một tuần xem mọi người muốn báo từng tệp hay tóm tắt", next: "good" },
              { label: "Bật và thêm câu 'đã kiểm duyệt an toàn' vào mỗi tin cho nhóm yên tâm", next: "s_claim" },
            ],
          },
          s_claim: {
            text: "Luồng không kiểm duyệt gì. Một đồng nghiệp mở tệp lạ vì tin nhắn nói an toàn, và bạn phải giải thích vì sao câu đó có mặt.",
            ending: "bad",
          },
          good: {
            text: "Nhóm nhận đúng tin cần thiết, và sau một tuần bạn điều chỉnh theo ý kiến của họ.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một thư mục chung và hỏi nhóm họ muốn báo thế nào.",
          "Bước 2 - Viết: Khi có tệp mới, nếu là loại ..., thì nhắn ... kèm tên tệp, người tải, liên kết.",
          "Bước 3 - Thử bằng tệp giả, gồm tệp tạm và hai tệp cùng lúc.",
          "Bước 4 - Bật cho nhóm và xem lại sau một tuần.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Báo đủ thông tin, lọc đúng tệp, thử bằng tệp giả: ba việc làm nên một luồng nhóm muốn giữ.",
          "Bài sau: luồng phê duyệt đơn xin nghỉ một cấp, ai được hỏi và chờ bao lâu.",
        ],
      },
    ],
  },
];
