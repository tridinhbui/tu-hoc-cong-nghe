import type { Lesson } from "../lesson-types";

// Chặng 48, bài 16-20. Giáo trình: scripts/curriculum/stage-48.json.
// Nội dung dạy khái niệm bền (bản dặn, tài liệu nền, quyền xem, sổ sửa, lịch rà);
// không ghi đường dẫn nút bấm hay giá của công cụ nào.

type Q = { question: string; options: string[]; correct: number; explanation: string };
const q = (question: string, right: string, d1: string, d2: string, d3: string, explanation: string): Q => ({
  question,
  options: [right, d1, d2, d3],
  correct: 0,
  explanation,
});

export const S48_D_LESSONS: Lesson[] = [
  {
    id: 2375,
    slug: "tro-ly-dung-chung-tai-lieu-nhay-cam-nam-o-dau",
    title: "Chặng 48, Bài 16: Trợ lý dùng chung: tài liệu nhạy cảm nằm ở đâu",
    subtitle: "Trợ lý của cả phòng giống một cuốn sổ đặt ở bàn chung: ai đi ngang cũng lật được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi trợ lý chỉ mình bạn dùng, tài liệu nền lộ ra cho một người. Khi cả phòng dùng chung, mọi thứ bạn đưa vào đều có thể bị người khác hỏi ra, kể cả người không được xem bảng lương hay hợp đồng. Dừng lại hỏi \"ai đọc được gì\" trước khi tải tài liệu rẻ hơn nhiều so với thu hồi một thông tin đã lộ.",
    openingQuestion:
      "Bạn định tải bảng lương cả phòng làm tài liệu nền cho trợ lý chung, để nó trả lời thắc mắc về thang bậc lương. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Hỏi ai trong phòng sẽ dùng trợ lý và những người đó được xem gì",
      "Tải lên luôn, rồi dặn trợ lý không được nói số lương",
      "Xoá cột số tài khoản, giữ tên và mức lương để trợ lý vẫn trả lời chính xác",
      "Tải lên bản mới nhất vì tài liệu cũ thường khiến trợ lý trả lời lệch",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý dùng chung trả lời bất kỳ ai hỏi, và nó không phân biệt người hỏi có quyền xem hay không. Dặn \"đừng nói\" trong bản dặn chỉ là lời nhắc, người hỏi khéo vẫn moi được. Xoá cột số tài khoản chưa đủ vì tên kèm mức lương vẫn là thông tin nhạy cảm. Chọn bản mới nhất là chuyện khác, không liên quan tới ai được đọc gì. Vì vậy câu hỏi phải có trước: ai dùng, và họ được phép thấy những gì.",
    diagram: [
      { label: "Liệt kê người sẽ dùng trợ lý", arrow: true },
      { label: "Với mỗi tài liệu: ai được xem?", arrow: true },
      { label: "Tách phần chung khỏi phần nhạy cảm", arrow: true },
      { label: "Chỉ tải phần chung làm tài liệu nền" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng nhân sự 5 người",
      description:
        "Một phòng nhân sự tải file tổng hợp lương lên trợ lý chung cho cả khối văn phòng để trả lời câu hỏi về thang bậc. Vài ngày sau một nhân viên hỏi khéo \"người cùng chức danh với tôi nhận bao nhiêu\" và trợ lý trả lời đúng con số. Phòng phải gỡ tài liệu, đổi sang bản chỉ có khung lương theo bậc, và báo lại cho quản lý.",
    },
    quiz: [
      q(
        "Bảng lương toàn công ty nên xử lý thế nào khi làm tài liệu nền cho trợ lý cả phòng?",
        "Không đưa vào; nếu cần thì chỉ đưa khung lương theo bậc, không có tên người",
        "Đưa vào nguyên bản, vì trợ lý chỉ trả lời khi được hỏi đúng câu và đúng người có quyền",
        "Đưa vào rồi dặn trợ lý \"đừng tiết lộ\", thế là đủ an toàn",
        "Đưa vào nhưng xoá cột số tài khoản, còn tên và lương giữ nguyên",
        "Khung lương theo bậc giúp trả lời câu hỏi chung mà không chỉ ra ai. Đưa nguyên bản là lộ cho mọi người dùng; lời dặn \"đừng tiết lộ\" chỉ là lời nhắc và có thể bị hỏi vòng qua; xoá số tài khoản vẫn để tên kèm lương."
      ),
      q(
        "Một nhân viên hỏi trợ lý chung về lương của đồng nghiệp. Điều gì quyết định trợ lý có trả lời được?",
        "Tài liệu đó có nằm trong kho nền của trợ lý hay không",
        "Nhân viên đó có thái độ lịch sự khi hỏi hay không, vì trợ lý đánh giá ý định",
        "Trợ lý tự biết người hỏi chức vụ gì và từ chối nếu không đủ quyền",
        "Bản dặn có câu \"giữ bí mật\" ở dòng đầu tiên hay không, mới là yếu tố quyết định",
        "Trợ lý chỉ trả lời từ những gì nó được đưa. Nó không tự biết chức vụ người hỏi, không đánh giá ý định, và một câu dặn không phải là hàng rào. Thứ chặn được là không đưa tài liệu vào."
      ),
      q(
        "Bạn muốn trợ lý trả lời chính sách phép năm cho cả phòng. Tài liệu nào phù hợp nhất để đưa?",
        "Bản chính sách phép năm đã ban hành, dùng chung cho mọi nhân viên",
        "Bảng chấm công chi tiết từng người, để trợ lý tính phép còn lại",
        "Email nội bộ giữa hai trưởng phòng bàn về ngoại lệ cho một nhân viên",
        "File đơn xin nghỉ của cả năm kèm lý do, để trợ lý học cách duyệt",
        "Chính sách đã ban hành ai cũng được xem, nên đưa vào an toàn. Bảng chấm công, email ngoại lệ và đơn xin nghỉ có lý do đều gắn với cá nhân, đưa vào là cho mọi người dùng xem được chuyện riêng của nhau."
      ),
      q(
        "Bạn thấy một file vừa có quy trình chung vừa có một bảng số liệu khách hàng riêng. Nên làm gì?",
        "Tách file: phần quy trình làm tài liệu nền, bảng khách hàng giữ ngoài",
        "Tải nguyên file, vì quy trình và bảng nằm cùng file thì cùng mức nhạy cảm",
        "Tải nguyên file rồi nhờ trợ lý ghi nhớ rằng bảng khách hàng không được dùng",
        "Xoá quy trình, chỉ tải bảng khách hàng vì đó mới là phần có giá trị",
        "Mức nhạy cảm tính theo từng phần nội dung, không theo tên file. Tải nguyên file là đưa luôn bảng khách hàng; dặn trợ lý \"không dùng\" không xoá được dữ liệu đã nằm trong kho; bỏ quy trình thì mất phần hữu ích."
      ),
      q(
        "Vì sao \"tôi tin đồng nghiệp trong phòng\" chưa đủ để đưa tài liệu nhạy cảm vào trợ lý chung?",
        "Người dùng trợ lý có thể đông hơn bạn nghĩ, và về sau còn có người mới được chia sẻ",
        "Vì trợ lý thường tự gửi tài liệu nền cho khách hàng bên ngoài công ty",
        "Vì tài liệu nền sẽ tự xoá sau vài ngày nên không bao giờ hữu ích",
        "Vì người trong phòng thường cố tình tìm cách lấy thông tin của nhau",
        "Vấn đề không phải lòng tin mà là phạm vi: danh sách người dùng thay đổi, và bạn không kiểm soát được ai hỏi gì. Các lý do kia đều là điều không có thật hoặc quy cho ác ý, trong khi rủi ro chỉ cần là lộ vô tình."
      ),
    ],
    keyTakeaways: [
      "Trợ lý dùng chung trả lời bất kỳ ai hỏi; nó không biết ai có quyền xem gì.",
      "Lời dặn \"đừng tiết lộ\" không phải hàng rào: thứ chặn được là không đưa tài liệu vào.",
      "Tách từng file thành phần chung và phần nhạy cảm, chỉ tải phần chung.",
      "Hỏi \"ai sẽ dùng trợ lý này\" trước khi hỏi \"tải gì\".",
      "Không chắc một tài liệu có nhạy cảm không thì hỏi người phụ trách dữ liệu của công ty.",
    ],
    practicePrompt: {
      question:
        "Phòng bạn có 4 file: chính sách đi công tác, bảng chi phí công tác từng người, mẫu đề nghị tạm ứng, thư phản hồi của giám đốc về một ca vi phạm. Nên đưa file nào làm tài liệu nền trợ lý chung?",
      options: [
        "Chính sách đi công tác và mẫu đề nghị tạm ứng",
        "Cả bốn file, vì càng nhiều tài liệu trợ lý càng trả lời đúng",
        "Bảng chi phí từng người, để trợ lý báo ai đã tiêu nhiều",
        "Thư phản hồi của giám đốc, vì nó cho thấy cách xử lý thực tế",
      ],
      correct: 0,
      explanation:
        "Chính sách và mẫu biểu là thông tin chung, ai dùng cũng cần. Bảng chi phí từng người và thư về một ca vi phạm đều gắn với cá nhân nên giữ ngoài. Đưa cả bốn là đổi sự tiện lợi lấy rủi ro lộ chuyện riêng của đồng nghiệp.",
    },
    summary: {
      keyIdea: "Trợ lý chung đọc lại cho mọi người những gì bạn đưa vào, không hơn không kém.",
      formula: "Tài liệu → ai được xem? → tách phần chung → chỉ tải phần chung.",
      commonMistake: "Tải cả file rồi nhờ vào lời dặn \"đừng nói\" để giữ bí mật.",
      action: "Lấy kho tài liệu nền hiện tại của bạn và gạch tên file nào có tên riêng của một người.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở danh sách tài liệu bạn đang dùng (hoặc định dùng) làm nền cho trợ lý. Với mỗi file, ghi một dòng: \"ai trong phòng được phép xem\". File nào chỉ vài người được xem thì đánh dấu đỏ và tìm cách tách phần chung ra một bản riêng, hoặc rút khỏi danh sách.",
      secondary: "Ngày mai bạn sẽ được hỏi: file nào bạn đã rút, và bạn thay nó bằng bản nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn thấy cả phòng hay hỏi về thang bậc lương, và bạn nghĩ ra cách hay: tải bảng lương làm tài liệu nền cho trợ lý chung. Trước khi bấm tải, hãy dừng hai phút: bài này dạy cách hỏi \"ai sẽ đọc được gì\" và tách phần được đưa vào khỏi phần không.",
      },
      {
        type: "feynman",
        title: "Trợ lý dùng chung đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một cuốn sổ hướng dẫn đặt ở bàn chung của phòng. Bất kỳ ai đi ngang cũng lật được, và cuốn sổ không hỏi bạn là ai. Trợ lý chung cũng vậy: nó trả lời người hỏi từ những gì có trong cuốn sổ.",
        columns: ["Điều bạn muốn biết", "Cuốn sổ ở bàn chung", "Trợ lý dùng chung"],
        rows: [
          ["Ai đọc được?", "Mọi người đi ngang bàn", "Mọi người có quyền dùng trợ lý"],
          ["Có hỏi danh tính không?", "Không, cứ lật là thấy", "Không tự kiểm tra chức vụ người hỏi"],
          ["Muốn giữ kín một trang?", "Không dán trang đó vào sổ", "Không tải tài liệu đó vào kho nền"],
          ["Ghi chú \"đừng đọc\" có tác dụng?", "Chỉ nhắc người lịch sự", "Lời dặn chỉ là nhắc, không phải khoá"],
        ],
        oneLiner: "Cái gì nằm trong sổ chung thì ai cũng hỏi ra được; giữ kín bằng cách không đưa vào.",
      },
      { type: "heading", text: "Ba câu hỏi trước khi tải một tài liệu" },
      {
        type: "paragraph",
        text: "Câu một: ai sẽ dùng trợ lý này, hôm nay và sau này khi có người mới được thêm. Câu hai: trong file có chỗ nào gắn với một người cụ thể, như tên kèm lương, kèm đánh giá, kèm lý do nghỉ. Câu ba: nếu người ít quyền nhất trong danh sách hỏi thẳng, bạn có thoải mái để họ thấy câu trả lời không. Nếu câu ba làm bạn ngập ngừng, tài liệu đó chưa sẵn sàng.",
      },
      {
        type: "flow",
        title: "Từ một file lương tới một tài liệu nền an toàn",
        steps: [
          {
            label: "Liệt kê người dùng",
            detail: "Ghi ra tên hoặc nhóm sẽ dùng trợ lý, kể cả người có thể được thêm sau này.",
          },
          {
            label: "Đánh dấu phần gắn với cá nhân",
            detail: "Đọc từng cột của file: tên, mức lương, nhận xét, lý do nghỉ. Gạch chân mọi chỗ chỉ ra một người cụ thể.",
          },
          {
            label: "Tách phần chung",
            detail: "Làm một bản mới chỉ gồm khung lương theo bậc hoặc quy định chung, không có tên người.",
          },
          {
            label: "Tải bản đã tách",
            detail: "Chỉ bản đã tách đi vào kho nền; bản gốc ở lại nơi chỉ người được phép mới mở.",
          },
          {
            label: "Thử hỏi như người ít quyền nhất",
            detail: "Hỏi thử một câu vòng vo để xem trợ lý có nói ra thứ không được nói không.",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Nhạy cảm thường gặp: lương, đánh giá nhân viên, hợp đồng, số tài khoản, dữ liệu khách hàng theo từng người.",
          "Thường an toàn: chính sách đã ban hành, mẫu biểu trống, quy trình chung, bảng giá công khai.",
          "Không chắc thì hỏi người phụ trách dữ liệu hoặc pháp chế của công ty, đừng tự đoán.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Khoá thật",
          text: "Không đưa tài liệu nhạy cảm vào kho nền, hoặc chỉ cho nhóm nhỏ được phép dùng một trợ lý riêng. Kiểm bằng cách hỏi thử như người ít quyền.",
        },
        right: {
          label: "Khoá giả",
          text: "Đưa tài liệu vào rồi dặn trợ lý \"đừng nói\". Người hỏi khéo, hỏi vòng hoặc hỏi lại nhiều lần vẫn có thể lấy ra phần bạn tưởng đã giấu.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát danh sách tài liệu định tải",
        task: "Đồng nghiệp gửi bạn kế hoạch tải kho nền cho trợ lý chung của phòng nhân sự. Đánh dấu những mục không nên có trong kho vì lộ thông tin cá nhân.",
        segments: [
          { text: "1. Quy chế làm việc của công ty, bản đã ban hành." },
          {
            text: "2. Bảng lương tháng 9 đủ họ tên, chức danh, mức lương từng người.",
            error: "Tên kèm mức lương là thông tin cá nhân; ai dùng trợ lý cũng hỏi ra được.",
          },
          { text: "3. Mẫu đơn xin nghỉ phép để trống." },
          {
            text: "4. Bảng đánh giá cuối năm của từng nhân viên kèm nhận xét của quản lý.",
            error: "Đánh giá từng người là chuyện riêng giữa nhân viên và quản lý, không phải tài liệu chung.",
          },
          { text: "5. Hướng dẫn các bước làm thủ tục nhập việc cho nhân viên mới." },
          {
            text: "6. Email giám đốc gửi trưởng phòng về lý do cho một nhân viên nghỉ việc.",
            error: "Lý do nghỉ việc của một người là thông tin riêng; để trong kho chung thì cả phòng hỏi ra được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Một câu dặn không thay được một cái khoá",
        text: "Bản dặn tốt giúp trợ lý nói đúng giọng, không biến nó thành thủ kho giữ bí mật. Nếu một thông tin không được lộ, đừng để nó trong kho.",
      },
      {
        type: "scenario",
        title: "Sếp nhờ làm trợ lý trả lời thắc mắc về lương",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: \"Em làm trợ lý trả lời thắc mắc lương cho anh chị trong phòng, có file bảng lương đây.\" File có tên, chức danh và lương của 30 người.",
            choices: [
              { label: "Tải nguyên file lên rồi dặn trợ lý \"không được nêu tên ai\"", next: "bad_leak" },
              { label: "Hỏi sếp trợ lý dành cho ai, rồi xem trong file phần nào gắn với cá nhân", next: "s2" },
            ],
          },
          bad_leak: {
            text: "Hai hôm sau có người hỏi \"người ở chức danh của tôi nhận bao nhiêu\" và trợ lý trả lời đúng con số. Bạn phải gỡ tài liệu và báo lại sếp.",
            ending: "bad",
          },
          s2: {
            text: "Sếp nói trợ lý dành cho toàn khối văn phòng, 80 người. Trong file, cột tên và cột mức lương từng người là phần gắn với cá nhân.",
            choices: [
              { label: "Làm bản mới chỉ có khung lương theo bậc, không tên người, rồi tải bản đó", next: "good" },
              { label: "Xoá cột tên nhưng giữ nguyên các dòng lương theo thứ tự danh sách", next: "bad_reid" },
            ],
          },
          bad_reid: {
            text: "Phòng 30 người, nhiều chức danh chỉ có một người, nên nhìn dòng lương là đoán ra ai. Trợ lý vẫn vô tình nói ra thông tin cá nhân dù không có cột tên.",
            ending: "bad",
          },
          good: {
            text: "Trợ lý trả lời được câu hỏi về bậc và khoảng lương mà không chỉ ra ai. Bạn thử hỏi vòng \"người đứng đầu nhận bao nhiêu\" và nó không có dữ liệu để trả lời.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Trợ lý chung đọc lại cho mọi người những gì bạn đã đưa vào.",
          "Bài sau: ghi sổ mỗi lần sửa bản dặn để lúc cần còn lùi lại được.",
        ],
      },
    ],
  },
  {
    id: 2376,
    slug: "ghi-ngay-sua-va-ly-do-cho-ban-dan",
    title: "Chặng 48, Bài 17: Sổ ghi ngày sửa và lý do cho bản dặn",
    subtitle: "Bản dặn giống công thức nấu ăn của quán: sửa một lần mà không ghi, ba tháng sau không ai biết vì sao vị đổi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản dặn sống lâu hơn trí nhớ của người viết. Ba tháng sau có một dòng lạ như \"không hứa ngày giao\" và không ai dám xoá vì sợ phá thứ gì đó. Một cuốn sổ một dòng mỗi lần sửa biến mỗi thay đổi thành thứ có thể lùi lại, hỏi lại và giải thích cho người mới.",
    openingQuestion:
      "Bản dặn của trợ lý có dòng \"không hứa ngày giao hàng\" từ ba tháng trước, và không ai nhớ vì sao. Một bạn mới muốn xoá nó cho gọn. Bạn làm gì?",
    openingOptions: [
      "Tìm sổ sửa xem dòng đó thêm khi nào và vì lỗi gì, rồi mới quyết",
      "Xoá luôn, vì dòng không ai nhớ lý do thì có lẽ đã lỗi thời",
      "Giữ nguyên mọi dòng cũ mãi mãi để chắc chắn không phá gì",
      "Hỏi trợ lý xem dòng đó có ích không rồi làm theo câu trả lời của nó",
    ],
    correctOption: 0,
    explanation:
      "Một dòng trong bản dặn thường là vết sẹo của một lỗi đã từng xảy ra, ví dụ trợ lý từng hứa ngày giao mà kho không giữ được. Xoá vì không nhớ lý do là mở lại lỗi cũ. Giữ mọi thứ mãi mãi thì bản dặn phình ra và trợ lý bỏ sót. Hỏi trợ lý cũng vô ích vì nó không biết lịch sử sửa. Sổ ghi ngày và lý do cho bạn biết dòng đó giải quyết chuyện gì, nên bạn quyết dựa trên dữ kiện.",
    diagram: [
      { label: "Sửa bản dặn vì một lỗi cụ thể", arrow: true },
      { label: "Ghi một dòng: ngày, sửa gì, vì sao", arrow: true },
      { label: "Thử lại bằng bộ câu hỏi mẫu", arrow: true },
      { label: "Cần lùi lại thì tra sổ tìm đúng bản" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm chăm sóc khách hàng 4 người",
      description:
        "Nhóm có bản dặn dài ba trang với nhiều dòng \"cấm\" thêm dần qua nhiều tháng. Một bạn mới gọn lại bản dặn và xoá dòng cấm hứa ngày giao vì thấy thừa. Tuần sau trợ lý lại hứa giao \"trong 2 ngày\" với khách. Nhóm lập sổ một dòng mỗi lần sửa và khôi phục dòng đó kèm lý do.",
    },
    quiz: [
      q(
        "Một dòng trong sổ sửa cần có ít nhất những gì để ba tháng sau vẫn dùng được?",
        "Ngày sửa, nội dung sửa và lý do sửa",
        "Tên người sửa và độ dài của bản dặn sau khi sửa",
        "Chỉ nội dung sửa, vì lý do sẽ tự hiện ra khi đọc bản dặn",
        "Điểm số trợ lý đạt được sau khi sửa trên một câu hỏi duy nhất",
        "Ngày cho biết thứ tự, nội dung cho biết đã đổi gì, lý do cho biết vì sao. Thiếu lý do thì không biết dòng có thể xoá hay không; độ dài và điểm một câu hỏi không giúp quyết định gì."
      ),
      q(
        "Bạn sửa ba chỗ khác nhau trong bản dặn trong cùng một buổi chiều. Nên ghi sổ thế nào?",
        "Mỗi chỗ sửa một dòng riêng, mỗi dòng có lý do của nó",
        "Một dòng chung \"sửa bản dặn chiều thứ Ba\" là đủ",
        "Chỉ ghi chỗ sửa quan trọng nhất, hai chỗ kia nhỏ nên bỏ qua",
        "Đợi cuối tuần ghi gộp một lần theo trí nhớ của cả tuần",
        "Mỗi lý do khác nhau thì dòng riêng, để sau này lùi được đúng một thay đổi. Dòng chung chung không chỉ ra sửa gì; bỏ chỗ nhỏ vẫn có thể gây lỗi; ghi gộp cuối tuần là lúc đã quên bớt lý do."
      ),
      q(
        "Sau khi sửa bản dặn, bạn ghi sổ vào lúc nào là tốt nhất?",
        "Ngay lúc sửa, khi bạn còn nhớ lỗi nào khiến phải sửa",
        "Cuối tháng, khi đã có nhiều thay đổi để ghi gọn một lần",
        "Chỉ khi có người hỏi vì sao bản dặn đổi mới ghi lại",
        "Sau khi trợ lý chạy ổn một tuần, để biết bản sửa có hiệu quả",
        "Lý do nằm trong đầu bạn ngay lúc vừa thấy lỗi, để lâu sẽ mờ. Ghi cuối tháng hoặc khi bị hỏi là lúc đã quên; chờ một tuần cũng vậy, và cũng không ai nhớ nên hỏi lại."
      ),
      q(
        "Bản sửa mới khiến trợ lý trả lời tệ hơn. Sổ giúp bạn việc gì?",
        "Biết dòng nào thay đổi gần đây nhất để lùi đúng chỗ đó",
        "Tự động khôi phục bản dặn cũ mà bạn không phải làm gì",
        "Cho trợ lý đọc sổ để nó tự sửa lại câu trả lời của mình",
        "Chứng minh lỗi là do trợ lý chứ không phải do bản dặn",
        "Sổ là bản đồ, không phải nút hoàn tác: nó chỉ ra thay đổi nào đáng nghi để bạn lùi. Nó không tự khôi phục, trợ lý không đọc sổ, và lỗi thường nằm ở chính thay đổi gần nhất."
      ),
      q(
        "Khi nào nên xoá hẳn một dòng khỏi bản dặn?",
        "Khi sổ cho thấy lý do của dòng đó không còn nữa, và bạn ghi lại việc xoá",
        "Khi dòng đó nằm ở cuối bản dặn, vì phần cuối thường ít ai đọc kỹ tới",
        "Khi dòng đó dài hơn các dòng khác, cho bản dặn gọn hơn",
        "Khi trợ lý bỏ sót dòng đó một lần, nghĩa là dòng không cần thiết",
        "Xoá phải dựa trên lý do: lý do hết hiệu lực thì dòng hết tác dụng, và việc xoá cũng vào sổ. Vị trí cuối, độ dài hay một lần bị bỏ sót không nói gì về việc dòng còn cần hay không."
      ),
    ],
    keyTakeaways: [
      "Một dòng trong bản dặn thường là vết sẹo của một lỗi đã xảy ra.",
      "Mỗi lần sửa ghi một dòng: ngày, sửa gì, vì sao.",
      "Ghi ngay lúc sửa; để lâu thì lý do mờ đi.",
      "Sổ là bản đồ để lùi đúng chỗ, không tự hoàn tác.",
      "Xoá một dòng cũng là một lần sửa, và cũng vào sổ.",
    ],
    practicePrompt: {
      question:
        "Trợ lý vừa hứa với khách \"giao trong 2 ngày\" dù kho không cam kết. Bạn thêm vào bản dặn một câu cấm hứa ngày giao. Dòng sổ nào tốt nhất?",
      options: [
        "12/10 - Thêm câu \"không hứa ngày giao cụ thể\" - Vì trợ lý hứa 2 ngày trong khi kho không cam kết",
        "12/10 - Sửa bản dặn",
        "Thêm câu cấm vì trợ lý cần tuân thủ quy định tốt hơn và khách hàng bớt khiếu nại",
        "Bản dặn v2, dài hơn v1 ba dòng, đã lưu vào thư mục chung",
      ],
      correct: 0,
      explanation:
        "Dòng đầu có đủ ngày, nội dung và lý do cụ thể, nên ba tháng sau đọc vẫn hiểu. Dòng \"Sửa bản dặn\" thiếu nội dung lẫn lý do; dòng thứ ba thiếu ngày và lý do mơ hồ; dòng cuối ghi kích thước chứ không phải thay đổi.",
    },
    summary: {
      keyIdea: "Sổ sửa biến một lần chỉnh vội thành một quyết định có thể hỏi lại và lùi lại.",
      formula: "Sửa → ghi ngay một dòng (ngày - sửa gì - vì sao) → thử lại → nếu tệ thì lùi đúng dòng đó.",
      commonMistake: "Xoá dòng \"thừa\" mà không nhớ lý do và mở lại đúng lỗi cũ.",
      action: "Đọc bản dặn hiện tại và viết lý do cho từng dòng mà bạn còn nhớ.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bản dặn trợ lý của bạn, đếm số dòng quy tắc. Tạo một tài liệu \"Sổ sửa\" và viết dòng đầu cho ba dòng quy tắc mà bạn còn nhớ lý do: ngày, nội dung, vì sao. Dòng nào bạn không nhớ lý do thì đánh dấu \"chưa rõ\" và hỏi người từng sửa.",
      secondary: "Ngày mai bạn sẽ được hỏi: sổ sửa của bạn có bao nhiêu dòng và dòng nào còn \"chưa rõ\".",
    },
    sections: [
      {
        type: "lead",
        text: "Ba tháng sau khi bạn dựng trợ lý, một bạn mới hỏi: \"Dòng 'không hứa ngày giao' này để làm gì, em xoá được không?\" Không ai nhớ. Bài này dạy một thói quen nhỏ để lần sau có câu trả lời: lập sổ, mỗi lần sửa một dòng.",
      },
      {
        type: "feynman",
        title: "Sổ sửa bản dặn đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung công thức nấu ăn của một quán phở. Mỗi lần bếp trưởng đổi một thìa gia vị vì khách than mặn, ông ghi lên bìa: ngày nào, đổi gì, vì sao. Ba tháng sau người mới vào bếp đọc là hiểu vì sao công thức có dòng lạ.",
        columns: ["Điều cần biết", "Công thức ở quán phở", "Bản dặn của trợ lý"],
        rows: [
          ["Thay đổi", "Giảm một thìa muối", "Thêm hoặc bớt một câu dặn"],
          ["Ghi chú đi kèm", "Ngày + vì sao (khách than mặn)", "Ngày + vì sao (trợ lý hứa ngày giao)"],
          ["Người mới đọc", "Hiểu vì sao đổi vị, không sửa bậy", "Hiểu vì sao có dòng, không xoá bậy"],
          ["Khi vị lạ đi", "Tra bìa để lùi về bản cũ", "Tra sổ để lùi đúng dòng vừa sửa"],
        ],
        oneLiner: "Mỗi lần sửa một dòng ghi ngày và lý do, để sau này lùi và giải thích được.",
      },
      { type: "heading", text: "Một dòng sổ chỉ cần ba thứ" },
      {
        type: "paragraph",
        text: "Ngày, nội dung sửa, lý do. Ví dụ: \"12/10 - thêm câu không hứa ngày giao cụ thể - vì trợ lý hứa 2 ngày trong khi kho không cam kết\". Mất ba mươi giây khi sửa, nhưng cứu được cả buổi đoán mò ba tháng sau. Phần lý do quan trọng nhất, vì nó cho biết dòng đó còn cần hay đã hết việc.",
      },
      {
        type: "flow",
        title: "Vòng đời một lần sửa bản dặn",
        steps: [
          { label: "Thấy một lỗi cụ thể", detail: "Một câu trả lời sai hoặc lệch giọng mà bạn đã chụp lại làm bằng chứng." },
          { label: "Sửa đúng một chỗ", detail: "Đổi một dòng, không đổi nhiều chỗ một lúc để còn biết chỗ nào có tác dụng." },
          { label: "Ghi sổ ngay", detail: "Ngày, nội dung, lý do - một dòng, làm ngay lúc còn nhớ." },
          { label: "Thử lại", detail: "Chạy lại câu hỏi từng gây lỗi và vài câu khác để chắc không hỏng chỗ khác." },
          { label: "Giữ hoặc lùi", detail: "Tốt hơn thì giữ; tệ hơn thì nhìn sổ và lùi đúng dòng vừa sửa." },
        ],
      },
      {
        type: "list",
        items: [
          "Sổ có thể là một bảng ba cột trong tài liệu chung của phòng.",
          "Sửa nhiều chỗ một lúc thì ghi nhiều dòng, mỗi chỗ một lý do.",
          "Dòng đánh dấu \"chưa rõ lý do\" là dòng cần hỏi lại người từng sửa trước khi đụng vào.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gọn lại một dòng sổ sửa",
        task: "Bạn vừa sửa bản dặn vì trợ lý hứa giao hàng trong 2 ngày. Lắp một yêu cầu để AI viết dòng sổ gọn, đủ ngày, nội dung, lý do.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết dòng sổ cho tôi.", feedback: "Không có chuyện gì xảy ra, AI chỉ có thể bịa một lý do nghe hợp lý." },
              {
                text: "Ngày 12/10 tôi thêm vào bản dặn câu \"không hứa ngày giao cụ thể\" vì trợ lý hứa khách giao trong 2 ngày dù kho không cam kết.",
                good: true,
                feedback: "Đủ ngày, sửa gì và vì sao - AI chỉ cần trình bày lại cho gọn.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một đoạn văn thật đầy đủ và trang trọng.", feedback: "Đoạn văn dài rất khó quét khi tra sổ; ba tháng sau không ai đọc." },
              {
                text: "Một dòng duy nhất theo khuôn: ngày - sửa gì - vì sao, dưới 30 chữ.",
                good: true,
                feedback: "Khuôn cố định giúp cả nhóm ghi đồng nhất và tra nhanh.",
              },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm ý kiến của bạn về cách làm trợ lý tốt hơn.", feedback: "AI sẽ thêm lời khuyên chung chung không ai cần trong sổ." },
              {
                text: "Chỉ dùng thông tin tôi đưa, không thêm lý do hay số liệu nào khác.",
                good: true,
                feedback: "Chặn AI bịa thêm lý do; sổ phải ghi đúng điều đã xảy ra.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "format", "limit"],
            text: "12/10 - Thêm câu \"không hứa ngày giao cụ thể\" - Vì trợ lý hứa khách giao trong 2 ngày trong khi kho không cam kết.",
          },
          {
            requires: ["context"],
            text: "Vào ngày 12 tháng 10, chúng tôi đã tiến hành điều chỉnh bản dặn nhằm nâng cao chất lượng phục vụ... (đủ ý nhưng là một đoạn dài, khó quét khi tra sổ.)",
          },
          {
            text: "Ngày 12/10 - Cải thiện bản dặn để giảm khiếu nại 30% - Vì khách hàng phản ánh... (AI không biết chuyện gì xảy ra nên bịa ra con số 30% và lý do khiếu nại.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng sửa mười chỗ rồi mới ghi",
        text: "Sửa nhiều chỗ một lúc làm cả lý do lẫn hiệu quả lẫn vào nhau: tốt lên hay tệ đi, bạn không biết chỗ nào gây ra. Một lỗi, một chỗ sửa, một dòng sổ.",
      },
      {
        type: "scenario",
        title: "Bạn mới muốn gọn lại bản dặn",
        start: "s1",
        nodes: {
          s1: {
            text: "Một bạn mới trong phòng nhắn: \"Bản dặn có mấy dòng em không hiểu, em xoá cho gọn nhé?\" Trong đó có dòng \"không hứa ngày giao cụ thể\".",
            choices: [
              { label: "Đồng ý, vì bạn mới thường nhìn bản dặn bằng con mắt sạch hơn", next: "bad_delete" },
              { label: "Mở sổ sửa xem dòng đó có ghi lý do không", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Tuần sau trợ lý lại hứa với một khách \"giao trong 2 ngày\". Khách chờ, kho không giao kịp, và bạn mất cả buổi tìm xem dòng nào từng chặn điều này.",
            ending: "bad",
          },
          s2: {
            text: "Sổ ghi: \"12/10 - thêm câu không hứa ngày giao - vì trợ lý hứa 2 ngày mà kho không cam kết\". Lý do còn nguyên vì kho vẫn chưa cam kết ngày giao.",
            choices: [
              { label: "Giữ dòng đó, giải thích lý do cho bạn mới và ghi thêm một dòng ở sổ \"đã xem lại 30/11, giữ\"", next: "good" },
              { label: "Giữ dòng đó nhưng không ghi gì vì không có gì thay đổi", next: "bad_nolog" },
            ],
          },
          bad_nolog: {
            text: "Lần sau lại có người thắc mắc đúng dòng này, vì không có dấu vết nào cho thấy nó đã được xem lại. Cả phòng lại mất thời gian làm đúng việc cũ.",
            ending: "bad",
          },
          good: {
            text: "Bạn mới hiểu vì sao dòng đó tồn tại, và sổ có thêm dấu vết đã xem lại. Lần sau ai hỏi, câu trả lời nằm ngay trong sổ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một dòng sổ hôm nay giúp người lạ ba tháng sau không phá bản dặn.",
          "Bài sau: chính sách đổi, tài liệu nền cũ vẫn trả lời theo chính sách cũ.",
        ],
      },
    ],
  },
  {
    id: 2377,
    slug: "chinh-sach-moi-ra-tro-ly-van-tra-loi-cu",
    title: "Chặng 48, Bài 18: Chính sách mới ra, trợ lý vẫn trả lời theo cái cũ",
    subtitle: "Trợ lý giống tấm bảng giá dán ở cửa: chính sách đổi mà không ai thay bảng thì khách vẫn đọc giá cũ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phòng đổi thời hạn đổi trả từ bảy lên mười bốn ngày, nhưng trợ lý vẫn nói bảy. Nó không biết mình sai, vì trong kho nền của nó chính sách cũ vẫn nằm đó. Mỗi ngày trôi qua là thêm những câu trả lời sai được gửi tới khách một cách rất tự tin. Một lịch rà nhỏ và một cách báo người dùng cắt phần lớn thiệt hại.",
    openingQuestion:
      "Phòng vừa đổi thời hạn đổi trả từ 7 lên 14 ngày. Sáng hôm sau trợ lý vẫn nói \"7 ngày\". Nguyên nhân khả dĩ nhất là gì?",
    openingOptions: [
      "Tài liệu nền vẫn là bản cũ, vì chưa ai thay bản mới vào",
      "Trợ lý cố giữ quy định cũ vì đã quen nó",
      "Trợ lý tự xem tin công ty mỗi sáng nhưng hôm nay bị chậm",
      "Bản dặn thiếu câu \"luôn dùng chính sách mới nhất\" ở dòng đầu",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý trả lời từ những gì nó được đưa. Nếu file chính sách trong kho nền vẫn ghi 7 ngày, nó sẽ nói 7 ngày, bất kể công ty đã đổi. Nó không có thói quen hay cố chấp, không tự đọc tin công ty, và một câu \"dùng bản mới nhất\" không có tác dụng khi bản mới chưa từng được đưa vào. Cách sửa là thay tài liệu, không phải thêm lời dặn.",
    diagram: [
      { label: "Chính sách thay đổi ngoài đời", arrow: true },
      { label: "Người phụ trách thay tài liệu nền", arrow: true },
      { label: "Thử lại bằng câu hỏi về điểm vừa đổi", arrow: true },
      { label: "Báo người dùng và ghi vào sổ sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng trực tuyến nhỏ",
      description:
        "Cửa hàng đổi thời hạn đổi trả từ 7 lên 14 ngày. Trợ lý nhắn tin vẫn nói 7 ngày suốt hai tuần vì file chính sách trong kho nền chưa được thay. Vài khách đã bỏ không đổi hàng vì tin là hết hạn. Sau việc này cửa hàng đặt lịch rà kho nền vào thứ Hai hàng tuần và thêm câu cuối mỗi trả lời: ngày cập nhật tài liệu.",
    },
    quiz: [
      q(
        "Chính sách vừa đổi. Việc nào có tác dụng nhanh nhất để trợ lý nói đúng?",
        "Thay file chính sách trong kho nền bằng bản mới",
        "Thêm vào bản dặn câu \"luôn dùng chính sách mới nhất của công ty\"",
        "Đợi vài ngày cho trợ lý tự học các câu hỏi mới của khách",
        "Hỏi trợ lý \"chính sách đổi trả hiện nay là gì\" thật nhiều lần",
        "Trợ lý chỉ biết những gì trong kho nền. Câu dặn chung không cho nó nội dung mới; nó không tự học từ khách; hỏi đi hỏi lại chỉ nhận lại câu trả lời cũ. Phải thay tài liệu."
      ),
      q(
        "Vì sao trợ lý vẫn nói \"7 ngày\" một cách rất tự tin dù chính sách đã đổi?",
        "Nó không biết kho nền đã cũ; với nó, bản cũ vẫn là sự thật",
        "Nó cố bảo vệ quy định cũ vì được dặn tuân thủ",
        "Nó nhận ra chính sách mới nhưng chọn số dễ nhớ hơn cho khách",
        "Nó tính trung bình giữa hai thời hạn rồi làm tròn thành 7 ngày",
        "Nó không có cơ chế tự đối chiếu với thế giới ngoài kho. Tự tin không chứng tỏ đúng; nó không cố ý, không chọn số dễ nhớ và không tính trung bình hai bản."
      ),
      q(
        "Lịch rà kho nền nên đặt thế nào cho một phòng hay đổi chính sách?",
        "Rà định kỳ cố định và rà thêm ngay khi có thông báo chính sách mới",
        "Chỉ rà khi có khách khiếu nại vì trợ lý trả lời sai",
        "Rà một lần mỗi năm vào dịp tổng kết cho đỡ tốn công của phòng",
        "Rà mỗi khi trợ lý có vẻ trả lời chậm hơn thường lệ trong ngày",
        "Rà định kỳ bắt lỗi thay đổi lẻ, rà theo sự kiện bắt thay đổi lớn. Chờ khiếu nại là khi thiệt hại đã xảy ra; một năm một lần quá thưa; tốc độ trả lời không liên quan tới nội dung cũ hay mới."
      ),
      q(
        "Cách nào giúp người dùng tự nhận ra trợ lý đang dùng tài liệu cũ?",
        "Bản dặn yêu cầu trợ lý nêu ngày cập nhật của tài liệu trong mỗi câu trả lời",
        "Yêu cầu trợ lý luôn kết thúc mọi câu trả lời bằng câu \"thông tin có thể đã cũ\"",
        "Cấm trợ lý trả lời câu hỏi chính sách, chuyển hết sang người thật",
        "Để người dùng tự đoán thông tin cũ khi thấy câu trả lời quá tự tin",
        "Ngày cập nhật là dữ kiện kiểm được: người dùng thấy ngay tài liệu cũ hay mới. Câu cảnh báo chung bị lờn, cấm trả lời bỏ phí trợ lý, và đoán theo cảm giác thì không đáng tin."
      ),
      q(
        "Sau khi thay tài liệu nền, bước kiểm nào là quan trọng nhất?",
        "Hỏi thử đúng câu về điểm vừa đổi và xem trợ lý có nói số mới",
        "Hỏi một câu chào hỏi để xem giọng văn trợ lý còn thân thiện",
        "Xem kích thước file mới có nhỏ hơn hay lớn hơn file cũ để chắc đã thay thật",
        "Tin rằng file đã tải thành công nên trợ lý chắc chắn đã đọc",
        "Chỉ câu hỏi về điểm vừa đổi mới cho biết trợ lý đã dùng bản mới. Giọng chào và kích thước file không liên quan tới nội dung; niềm tin \"chắc đã đọc\" không phải kiểm tra."
      ),
    ],
    keyTakeaways: [
      "Trợ lý trả lời theo kho nền; chính sách đổi mà kho nền không đổi thì nó vẫn nói cái cũ.",
      "Thêm câu \"dùng bản mới nhất\" vào bản dặn không thay được việc đưa bản mới vào.",
      "Rà kho nền định kỳ và ngay khi có thông báo đổi chính sách.",
      "Bắt trợ lý nêu ngày cập nhật của tài liệu để người dùng tự kiểm.",
      "Sau khi thay, hỏi thử đúng câu về điểm vừa đổi.",
    ],
    practicePrompt: {
      question:
        "Phòng vừa đổi thời hạn đổi trả từ 7 lên 14 ngày. Thứ tự việc nào đúng nhất?",
      options: [
        "Thay file chính sách, hỏi thử câu về thời hạn, báo người dùng, ghi sổ sửa",
        "Ghi sổ sửa, báo người dùng, rồi chờ vài ngày xem trợ lý có tự đổi theo không",
        "Báo người dùng \"trợ lý đã cập nhật\" trước cho họ yên tâm rồi mới thay file",
        "Thêm câu \"thời hạn là 14 ngày\" vào bản dặn và giữ nguyên file chính sách cũ",
      ],
      correct: 0,
      explanation:
        "Thay tài liệu rồi kiểm rồi mới báo, để lời báo là thật. Chờ trợ lý tự đổi sẽ không bao giờ xảy ra; báo trước khi thay là nói điều chưa đúng; thêm câu vào bản dặn mà giữ file cũ tạo hai nguồn mâu thuẫn, trợ lý có thể chọn nguồn cũ.",
    },
    summary: {
      keyIdea: "Trợ lý không biết chính sách đã đổi, cho tới khi bạn thay tài liệu của nó.",
      formula: "Chính sách đổi → thay tài liệu nền → hỏi thử điểm vừa đổi → báo người dùng → ghi sổ.",
      commonMistake: "Thêm lời dặn \"dùng bản mới\" rồi để nguyên tài liệu cũ trong kho.",
      action: "Đặt một lịch nhắc rà kho nền hàng tuần hoặc hàng tháng, tuỳ phòng bạn đổi chính sách nhiều hay ít.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê các tài liệu nền trợ lý của bạn đang dùng. Cạnh mỗi tài liệu ghi ngày cập nhật gần nhất và ai là người phụ trách thay khi nội dung đổi. Đặt một lời nhắc lặp lại trong lịch của bạn để rà danh sách này, rồi hỏi thử trợ lý một câu về điểm bạn biết vừa đổi gần đây.",
      secondary: "Ngày mai bạn sẽ được hỏi: tài liệu nào lâu chưa cập nhật nhất và bạn đã đặt nhắc vào ngày nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai phòng thông báo: thời hạn đổi trả tăng từ bảy lên mười bốn ngày. Thứ Ba khách nhắn hỏi và trợ lý vẫn trả lời \"bảy ngày\". Bài này dạy cách lập lịch rà tài liệu nền và cách báo người dùng để lần sau chính sách đổi thì trợ lý không chậm cả tuần.",
      },
      {
        type: "feynman",
        title: "Tài liệu nền cũ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tấm bảng giá dán ở cửa quán. Chủ quán đổi giá trong bếp nhưng quên thay bảng, nên khách vẫn đọc giá cũ và nhân viên cũng chỉ vào bảng. Trợ lý đọc kho nền như khách đọc tấm bảng đó.",
        columns: ["Điều xảy ra", "Bảng giá ở cửa quán", "Trợ lý và kho nền"],
        rows: [
          ["Nguồn để trả lời", "Tấm bảng dán ở cửa", "Tài liệu trong kho nền"],
          ["Giá/chính sách đổi", "Chủ đổi giá trong bếp", "Phòng đổi chính sách ngoài đời"],
          ["Quên thay thì sao", "Khách đọc giá cũ", "Trợ lý nói chính sách cũ rất tự tin"],
          ["Cách sửa", "Thay bảng, ghi ngày dán", "Thay tài liệu, ghi ngày cập nhật"],
        ],
        oneLiner: "Trợ lý chỉ biết cái bảng bạn đưa; đổi chính sách thì phải thay bảng.",
      },
      { type: "heading", text: "Mỗi ngày chờ là thêm câu trả lời sai" },
      {
        type: "paragraph",
        text: "Sai một lần thì sửa được. Nhưng trợ lý trả lời nhiều lần mỗi ngày, nên số câu sai tăng theo số ngày bạn chưa thay tài liệu. Biểu đồ dưới cho thấy điều đó bằng số liệu minh hoạ: kéo thanh trượt cho giống phòng bạn.",
      },
      {
        type: "chart",
        title: "Số câu trả lời theo chính sách cũ tăng theo số ngày chưa cập nhật",
        caption:
          "Số liệu minh hoạ, không phải đo thật. Số câu sai cộng dồn = số ngày x số câu hỏi mỗi ngày x phần trăm câu hỏi chạm vào điểm vừa đổi.",
        kind: "line",
        xLabel: "Số ngày kể từ lần cập nhật tài liệu nền cuối",
        yLabel: "Câu trả lời lỗi thời cộng dồn",
        x: { from: 0, to: 30, step: 2 },
        params: [
          { id: "perDay", label: "Số câu hỏi trợ lý nhận mỗi ngày", min: 1, max: 100, step: 1, value: 20, unit: "câu" },
          { id: "share", label: "Phần trăm câu hỏi chạm vào điểm vừa đổi", min: 1, max: 50, step: 1, value: 15, unit: "%" },
        ],
        series: [{ label: "Câu trả lời lỗi thời", expr: "x * perDay * share / 100" }],
      },
      {
        type: "list",
        items: [
          "Rà định kỳ: ví dụ mỗi thứ Hai, mở từng tài liệu nền và hỏi \"còn đúng không\".",
          "Rà theo sự kiện: có thông báo đổi chính sách là thay tài liệu ngay trong ngày.",
          "Mỗi tài liệu có một người phụ trách, ghi tên cạnh ngày cập nhật.",
          "Báo người dùng bằng một câu ngắn: \"Đã cập nhật chính sách đổi trả ngày 12/10\".",
        ],
      },
      {
        type: "callout",
        label: "Hai nguồn mâu thuẫn còn tệ hơn một nguồn cũ",
        text: "Đừng vá bằng cách thêm câu \"thời hạn mới là 14 ngày\" vào bản dặn mà vẫn để file cũ trong kho. Khi hai nguồn nói khác nhau, trợ lý có thể chọn bên nào cũng được, và mỗi lần một khác.",
      },
      {
        type: "scenario",
        title: "Thời hạn đổi trả đổi từ 7 lên 14 ngày",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng thứ Hai, sếp thông báo thời hạn đổi trả tăng lên 14 ngày, có hiệu lực từ hôm nay. Bạn quản trợ lý chăm sóc khách của phòng.",
            choices: [
              { label: "Thêm vào bản dặn câu \"thời hạn đổi trả là 14 ngày\" và để nguyên file cũ trong kho", next: "bad_two" },
              { label: "Thay file chính sách trong kho nền bằng bản mới", next: "s2" },
            ],
          },
          bad_two: {
            text: "Trợ lý có hai nguồn mâu thuẫn. Có lần nó nói 14 ngày, có lần nói 7 ngày tuỳ câu hỏi. Khách gửi ảnh chụp hai câu trả lời khác nhau cho phòng.",
            ending: "bad",
          },
          s2: {
            text: "File mới đã vào kho. Bạn chưa biết trợ lý đã dùng bản mới chưa.",
            choices: [
              { label: "Hỏi thử một câu về thời hạn đổi trả và xem trợ lý có nói 14 ngày", next: "s3" },
              { label: "Báo cả phòng \"trợ lý đã cập nhật\" ngay, vì file đã tải xong", next: "bad_unverified" },
            ],
          },
          bad_unverified: {
            text: "File có một lỗi định dạng nên trợ lý vẫn đọc bản cũ. Cả phòng tin lời báo và không ai kiểm; một tuần sau khách vẫn nhận câu trả lời \"7 ngày\".",
            ending: "bad",
          },
          s3: {
            text: "Trợ lý trả lời 14 ngày và nêu ngày cập nhật tài liệu. Bạn còn cần một việc để lần sau không phải nhớ bằng đầu.",
            choices: [
              { label: "Đặt lịch rà kho nền hàng tuần, ghi người phụ trách và ghi dòng vào sổ sửa", next: "good" },
              { label: "Hẹn tự nhớ rà khi nào rảnh", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Ba tuần sau phòng đổi thêm một điều khoản và không ai nhớ rà. Trợ lý lại trả lời theo bản cũ cho tới khi có khách phàn nàn.",
            ending: "bad",
          },
          good: {
            text: "Lần đổi chính sách kế tiếp, lịch rà bắt được trong vài ngày và người dùng thấy ngày cập nhật ở mỗi câu trả lời. Thiệt hại chỉ còn vài câu thay vì cả tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chính sách đổi thì tài liệu nền phải đổi, và người dùng phải biết ngày đổi.",
          "Bài sau: khi một trợ lý gánh hai việc và giọng văn lẫn lộn, nên tách làm hai.",
        ],
      },
    ],
  },
  {
    id: 2378,
    slug: "nhac-viec-luc-nao-nen-tach-mot-tro-ly-thanh-hai",
    title: "Chặng 48, Bài 19: Lúc nào tách một trợ lý thành hai",
    subtitle: "Một nhân viên vừa tiếp khách vừa viết báo cáo nội bộ sẽ nói chuyện với khách như viết báo cáo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "✂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trợ lý vừa trả lời khách vừa soạn báo cáo nội bộ có hai bộ quy tắc kéo về hai phía: khách cần giọng ấm và không lộ con số nội bộ, báo cáo cần số liệu và giọng khô. Bản dặn gánh cả hai sẽ dài, mâu thuẫn và giọng lẫn lộn. Nhận ra dấu hiệu sớm giúp bạn tách đúng lúc thay vì vá mãi.",
    openingQuestion:
      "Trợ lý của phòng vừa trả lời khách vừa soạn báo cáo nội bộ. Gần đây thư trả lời khách có lúc khô như báo cáo, báo cáo lại có câu chào thân mật. Dấu hiệu này nói gì?",
    openingOptions: [
      "Hai việc cần hai bộ quy tắc khác nhau, nên cần tách hai trợ lý",
      "Trợ lý bị hỏng và phải cài lại từ đầu bằng một bản dặn hoàn toàn mới",
      "Khách và đồng nghiệp hỏi sai cách, cần hướng dẫn họ gõ câu hỏi đúng",
      "Cần thêm một đoạn vào bản dặn để trợ lý nhớ thêm quy tắc mới cho khách",
    ],
    correctOption: 0,
    explanation:
      "Giọng lẫn lộn là dấu hiệu điển hình khi một bản dặn gánh hai công việc có đối tượng đọc khác nhau. Trợ lý không hỏng, cài lại cũng sẽ lặp lại lỗi với bản dặn cũ. Người dùng không sai. Thêm đoạn dặn nữa làm bản dặn dài hơn và mâu thuẫn thêm, vì hai bộ quy tắc vẫn nằm chung một chỗ. Chia việc ra hai trợ lý, mỗi cái một bản dặn, là cách gỡ tận gốc.",
    diagram: [
      { label: "Nhận ra dấu hiệu: giọng lẫn, quy tắc mâu thuẫn", arrow: true },
      { label: "Chia việc theo người đọc và tài liệu nền", arrow: true },
      { label: "Viết bản dặn riêng cho mỗi trợ lý", arrow: true },
      { label: "Thử cả hai bằng bộ câu hỏi của chính nó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng vận hành 6 người",
      description:
        "Một trợ lý vừa trả lời khách hỏi tình trạng đơn, vừa soạn báo cáo tồn kho cho quản lý. Bản dặn lên tới hai trang, có dòng \"xưng em với khách\" cạnh dòng \"viết ngắn, nhiều số liệu\". Báo cáo nội bộ thì mở đầu \"Dạ anh chị ơi\", còn thư khách có lúc đầy thuật ngữ kho. Phòng tách thành hai trợ lý, mỗi cái một bản dặn một trang.",
    },
    quiz: [
      q(
        "Dấu hiệu nào cho thấy nên tách một trợ lý thành hai?",
        "Hai nhóm người đọc khác nhau cần hai giọng và hai bộ quy tắc mâu thuẫn",
        "Bản dặn đã dài hơn một trang giấy in khổ A4 và nhiều dòng quy tắc phụ",
        "Trợ lý trả lời chậm hơn vào giờ cao điểm buổi sáng và đầu tuần",
        "Có hơn ba người cùng dùng trợ lý trong cùng một ngày làm việc",
        "Tách khi quy tắc kéo về hai phía và đối tượng đọc khác nhau. Độ dài một trang, tốc độ giờ cao điểm hay số người dùng không nói gì về mâu thuẫn giữa hai việc."
      ),
      q(
        "Khi tách, nên chia theo tiêu chí nào?",
        "Theo người đọc kết quả và loại tài liệu nền mỗi việc cần",
        "Theo độ khó của câu hỏi, câu dễ một trợ lý, câu khó một trợ lý",
        "Theo tên người tạo trợ lý trong phòng",
        "Chia đều số dòng của bản dặn hiện tại thành hai nửa bằng nhau",
        "Người đọc và tài liệu nền quyết định giọng và nội dung cần có. Độ khó câu hỏi, tên người tạo hay chia đôi số dòng cắt ngang mạch công việc, để lại mỗi bên một nửa quy tắc."
      ),
      q(
        "Sau khi tách, phần dặn chung cho cả hai trợ lý (ví dụ không bịa số liệu) nên làm thế nào?",
        "Viết lại phần chung vào bản dặn của từng trợ lý, vì mỗi trợ lý đọc riêng bản của mình",
        "Chỉ viết ở trợ lý thứ nhất, trợ lý thứ hai sẽ tự biết qua trợ lý thứ nhất",
        "Bỏ hẳn, vì quy tắc chung nên ngầm hiểu mà không cần viết ra",
        "Viết thành một bản thứ ba rồi tin rằng cả hai trợ lý tự đọc được",
        "Mỗi trợ lý chỉ thấy bản dặn của riêng nó, nên quy tắc chung phải có trong cả hai. Trợ lý không nhắn nhau, không ngầm hiểu, và không tự đọc bản dặn nào ngoài bản được đưa."
      ),
      q(
        "Tách trợ lý có nhược điểm nào cần tính tới?",
        "Bạn phải bảo trì hai bản dặn và hai kho nền, sửa chung thì phải sửa hai nơi",
        "Hai trợ lý sẽ tự cãi nhau và đưa câu trả lời mâu thuẫn cho cùng một người",
        "Mỗi trợ lý sẽ chỉ trả lời được một nửa số câu hỏi của trợ lý cũ vì bị chia đôi trí nhớ",
        "Người dùng không thể biết nên hỏi trợ lý nào vì cả hai giống hệt nhau",
        "Cái giá thật là công bảo trì gấp đôi và quy tắc chung phải đồng bộ. Hai trợ lý không nói chuyện với nhau để cãi nhau, không chia trí nhớ, và nếu đặt tên theo việc thì người dùng biết chọn cái nào."
      ),
      q(
        "Trợ lý chỉ có một việc nhưng bản dặn hơi dài. Có nên tách không?",
        "Không, dài chưa phải lý do; hãy xem còn mâu thuẫn giọng hay đối tượng không",
        "Có, cứ quá một trang là phải tách thành hai để trợ lý đỡ quá tải và đọc kỹ hơn",
        "Có, vì trợ lý đọc được càng ít dòng càng chính xác tuyệt đối",
        "Không, nhưng nên bỏ hết quy tắc phụ để còn đúng ba dòng cho gọn",
        "Độ dài không phải tiêu chí tách; mâu thuẫn mới là dấu hiệu. Ngưỡng một trang là cứng nhắc, trợ lý không chính xác tuyệt đối khi ít dòng, và bỏ quy tắc phụ có thể làm mất điều cần thiết."
      ),
    ],
    keyTakeaways: [
      "Dấu hiệu cần tách: hai nhóm người đọc khác nhau, giọng lẫn lộn, quy tắc mâu thuẫn trong cùng bản dặn.",
      "Chia theo người đọc kết quả và tài liệu nền, không chia theo độ khó hay số dòng.",
      "Quy tắc chung (không bịa số, không nêu thông tin nội bộ) phải viết lại ở từng trợ lý.",
      "Tách là tăng công bảo trì: hai bản dặn, hai kho nền, hai bộ câu hỏi thử.",
      "Dài chưa phải lý do tách; mâu thuẫn mới là lý do.",
    ],
    practicePrompt: {
      question:
        "Trợ lý của phòng vừa trả lời thắc mắc của khách vừa tóm tắt họp nội bộ cho quản lý. Gần đây tóm tắt họp có câu \"dạ anh chị\". Bạn nên làm gì?",
      options: [
        "Tách hai trợ lý: một cho khách, một cho nội bộ, mỗi cái một bản dặn và kho nền",
        "Thêm câu \"không dùng 'dạ' trong tóm tắt họp\" vào bản dặn chung và giữ một trợ lý",
        "Cấm trợ lý tóm tắt họp và để người viết tay cho khỏi lẫn giọng",
        "Đợi thêm vài tuần để xem có phải lỗi ngẫu nhiên hay không rồi mới quyết",
      ],
      correct: 0,
      explanation:
        "Giọng lẫn là dấu hiệu tách. Thêm một câu cấm chỉ vá một triệu chứng, rồi sẽ có triệu chứng kế tiếp. Cấm hẳn tóm tắt họp bỏ phí việc trợ lý làm được. Chờ thêm thì người dùng tiếp tục nhận kết quả lẫn giọng.",
    },
    summary: {
      keyIdea: "Khi hai việc có người đọc khác nhau, mỗi việc xứng đáng một bản dặn riêng.",
      formula: "Giọng lẫn, quy tắc kéo hai phía → chia theo người đọc → hai bản dặn → chép quy tắc chung vào cả hai.",
      commonMistake: "Vá từng triệu chứng bằng thêm câu cấm vào bản dặn chung cho tới khi nó dài và tự mâu thuẫn.",
      action: "Nhìn bản dặn hiện tại và gạch dòng nào chỉ đúng với một loại người đọc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bản dặn trợ lý của bạn. Chia các dòng quy tắc làm hai cột theo người đọc kết quả (khách ngoài, người nội bộ). Dòng nào xếp được vào cả hai cột là quy tắc chung; dòng chỉ thuộc một cột là ứng viên để tách. Nếu cột nào có quá nhiều dòng riêng, viết thử bản dặn một trang cho cột đó.",
      secondary: "Ngày mai bạn sẽ được hỏi: bao nhiêu dòng là quy tắc chung, bao nhiêu dòng chỉ thuộc một loại người đọc.",
    },
    sections: [
      {
        type: "lead",
        text: "Thư trả lời khách hôm nay khô như báo cáo, còn báo cáo nội bộ lại mở đầu bằng \"dạ anh chị ơi\". Trợ lý chung của phòng đang gánh hai việc. Bài này dạy nhận ra dấu hiệu cần tách và cách chia phần dặn cho từng trợ lý.",
      },
      {
        type: "feynman",
        title: "Tách trợ lý đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một nhân viên vừa trực quầy tiếp khách vừa soạn báo cáo cuối tuần cho sếp. Anh ấy phải đổi giọng cả chục lần mỗi ngày, và thỉnh thoảng nói chuyện với khách bằng giọng báo cáo. Giao hai việc cho hai người thì mỗi người giữ một giọng.",
        columns: ["Điều cần", "Một nhân viên gánh hai việc", "Hai trợ lý, mỗi cái một việc"],
        rows: [
          ["Giọng nói", "Lẫn giữa tiếp khách và báo cáo", "Mỗi bên một giọng ổn định"],
          ["Quy tắc", "Dặn cả hai bộ, có chỗ mâu thuẫn", "Mỗi người một bộ gọn"],
          ["Tài liệu cần đọc", "Đủ thứ, dễ lẫn", "Chỉ tài liệu của việc mình"],
          ["Cái giá", "Lỗi lẫn giọng", "Phải quản hai người"],
        ],
        oneLiner: "Khi hai việc có người đọc khác nhau, hai người phụ trách làm đúng hơn một người gánh cả hai.",
      },
      { type: "heading", text: "Ba dấu hiệu nên tách" },
      {
        type: "paragraph",
        text: "Dấu hiệu một: giọng văn lẫn, thư khách khô hoặc báo cáo thân mật quá. Dấu hiệu hai: hai dòng trong bản dặn kéo về hai phía, ví dụ \"xưng em với khách\" và \"viết ngắn, nhiều số liệu\". Dấu hiệu ba: phải thêm câu cấm cho lỗi này thì lỗi kia lại hiện. Có một dấu hiệu chưa chắc phải tách, nhưng có cả ba thì nên.",
      },
      {
        type: "flow",
        title: "Từ một trợ lý gánh hai việc tới hai trợ lý",
        steps: [
          { label: "Liệt kê các việc trợ lý đang làm", detail: "Ghi từng việc và người đọc kết quả: khách ngoài hay người trong công ty." },
          { label: "Gom dòng dặn theo việc", detail: "Mỗi dòng trong bản dặn đúng cho việc nào? Dòng đúng cho cả hai là quy tắc chung." },
          { label: "Viết hai bản dặn", detail: "Mỗi bản có vai, việc, giọng của riêng việc đó, và chép phần quy tắc chung vào cả hai." },
          { label: "Chia tài liệu nền", detail: "Mỗi trợ lý chỉ nhận tài liệu của việc nó làm, để nội dung nội bộ không lọt sang trợ lý cho khách." },
          { label: "Thử từng trợ lý", detail: "Hỏi mỗi trợ lý vài câu của đúng việc mình và một câu của việc kia để xem nó có biết từ chối không." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nên tách",
          text: "Hai nhóm người đọc khác nhau, giọng lẫn lộn, quy tắc mâu thuẫn, và tài liệu nền của việc này không nên cho người dùng việc kia thấy.",
        },
        right: {
          label: "Chưa cần tách",
          text: "Một nhóm người đọc, một giọng, bản dặn hơi dài nhưng không mâu thuẫn. Khi đó nên gọn lại thay vì tách.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản dặn chung của trợ lý hai việc",
        task: "Dưới đây là bản dặn của một trợ lý vừa trả lời khách vừa soạn báo cáo nội bộ. Đánh dấu những dòng xung đột, khiến trợ lý lẫn giọng hoặc lộ thông tin nội bộ.",
        segments: [
          { text: "Không bịa số liệu; nếu thiếu dữ liệu thì nói rõ là thiếu." },
          {
            text: "Khi trả lời khách, xưng \"em\" và dùng giọng thân mật, nhiều lời cảm ơn.",
            error: "Giọng thân mật cho khách mâu thuẫn với dòng báo cáo khô ở dưới; hai dòng cùng bản dặn kéo về hai phía.",
          },
          { text: "Khi soạn báo cáo, mở đầu bằng số liệu chính rồi mới tới nhận xét." },
          {
            text: "Luôn dùng chung một kho tài liệu, gồm cả bảng chi phí nội bộ và chính sách cho khách.",
            error: "Bảng chi phí nội bộ không nên nằm chung kho với trợ lý trả lời khách; khách có thể hỏi ra nó.",
          },
          {
            text: "Báo cáo viết thật khô, không chào hỏi; thư khách cũng theo cách này cho thống nhất.",
            error: "Ép thư khách theo giọng báo cáo sẽ khô với khách, đây chính là dấu hiệu cần tách chứ không phải \"thống nhất\".",
          },
        ],
      },
      {
        type: "scenario",
        title: "Trợ lý chung đang lẫn giọng",
        start: "s1",
        nodes: {
          s1: {
            text: "Tuần này có hai khách phàn nàn thư trả lời nghe lạnh lùng như biên bản, trong khi quản lý lại khen báo cáo nội bộ. Bản dặn chung có 28 dòng.",
            choices: [
              { label: "Thêm một dòng \"hãy ấm áp hơn với khách\" vào cuối bản dặn chung", next: "bad_patch" },
              { label: "Chia các dòng dặn theo người đọc kết quả để xem có mâu thuẫn không", next: "s2" },
            ],
          },
          bad_patch: {
            text: "Thư khách ấm hơn một chút nhưng báo cáo nội bộ bắt đầu có câu \"cảm ơn anh chị đã quan tâm\". Bạn lại thêm một dòng cấm, rồi một dòng nữa, và bản dặn lên 34 dòng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 9 dòng chỉ đúng với khách, 12 dòng chỉ đúng với nội bộ, 7 dòng là quy tắc chung, và có ba dòng kéo về hai phía.",
            choices: [
              { label: "Tách hai trợ lý, chép 7 dòng chung vào cả hai bản dặn", next: "s3" },
              { label: "Giữ một trợ lý và gạch bớt 12 dòng nội bộ cho bản dặn ngắn lại", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Bản dặn gọn hơn nhưng báo cáo nội bộ mất các quy tắc định dạng quan trọng. Quản lý báo báo cáo tuần này thiếu phần so sánh với tuần trước.",
            ending: "bad",
          },
          s3: {
            text: "Bạn có hai bản dặn một trang. Còn một câu hỏi: tài liệu nền chia thế nào?",
            choices: [
              { label: "Chỉ chính sách và mẫu thư cho trợ lý khách; bảng chi phí và biên bản cho trợ lý nội bộ", next: "good" },
              { label: "Cho cả hai cùng dùng một kho cho tiện cập nhật", next: "bad_shared" },
            ],
          },
          bad_shared: {
            text: "Một khách hỏi khéo về giá vốn và trợ lý dành cho khách trả lời bằng con số từ bảng chi phí nội bộ. Bạn phải gỡ tài liệu và xin lỗi sếp.",
            ending: "bad",
          },
          good: {
            text: "Thư khách ấm áp, báo cáo gọn và khô, và trợ lý khách không có thứ gì nội bộ để lộ. Bạn mất công bảo trì hai bản dặn nhưng không còn lỗi lẫn giọng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hai người đọc khác nhau thì hai trợ lý, mỗi cái một bản dặn gọn.",
          "Bài sau: gom bản dặn, tài liệu nền, bộ thử và sổ sửa thành một gói giao cho đồng nghiệp.",
        ],
      },
    ],
  },
  {
    id: 2379,
    slug: "du-an-goi-tro-ly-cho-phong-va-mot-trang-huong-dan",
    title: "Chặng 48, Bài 20: Dự án tổng kết: gói trợ lý cho phòng kèm một trang hướng dẫn",
    subtitle: "Giao một trợ lý cho đồng nghiệp giống giao chìa khoá một quầy hàng: kèm tờ hướng dẫn một trang.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trợ lý tốt mà chỉ mình bạn biết dùng thì chưa phải của phòng. Gói lại bản dặn, tài liệu nền, bộ câu hỏi thử và sổ sửa kèm một trang hướng dẫn ngắn giúp đồng nghiệp dùng đúng, biết khi nào không nên tin và biết báo ai khi trợ lý sai. Đó cũng là cách bạn không phải trả lời lại cùng một câu hỏi hai mươi lần.",
    openingQuestion:
      "Bạn sắp giao trợ lý cho cả phòng dùng. Đồng nghiệp sẽ hỏi gì đầu tiên, và trang hướng dẫn nên trả lời câu nào trước?",
    openingOptions: [
      "Trợ lý làm được gì, không làm được gì, và ai sửa nếu trợ lý sai",
      "Trợ lý được xây bằng công cụ nào và mất bao lâu để dựng xong",
      "Toàn bộ nội dung bản dặn, chép nguyên văn để đồng nghiệp tự đọc",
      "Danh sách mọi câu hỏi bạn đã từng thử và điểm số của từng câu",
    ],
    correctOption: 0,
    explanation:
      "Người dùng mới cần biết ba điều trước hết: nhờ được việc gì, đừng nhờ việc gì, và gặp lỗi thì báo ai. Công cụ nào hay mất bao lâu dựng là chuyện của người làm, không giúp họ dùng. Chép nguyên bản dặn biến trang hướng dẫn thành tài liệu dài không ai đọc. Danh sách câu thử với điểm số hữu ích cho người sửa trợ lý, không cho người chỉ dùng. Trang hướng dẫn ngắn trả lời đúng ba câu đầu là đủ.",
    diagram: [
      { label: "Gom bản dặn, tài liệu nền, bộ thử, sổ sửa", arrow: true },
      { label: "Kiểm lần cuối bằng bộ câu hỏi thử", arrow: true },
      { label: "Viết trang hướng dẫn một trang", arrow: true },
      { label: "Giao cho người dùng thử và sửa theo phản hồi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kế toán 8 người",
      description:
        "Chị trưởng nhóm dựng trợ lý tra cứu quy trình thanh toán và giao cho cả phòng chỉ bằng một tin nhắn \"dùng thử nhé\". Hai tuần sau, nửa phòng hỏi trợ lý cả những việc nó không biết và tin các câu trả lời về tài chính. Chị viết một trang hướng dẫn: làm được gì, không làm được gì, cách kiểm và báo ai khi sai. Số lần phải hỏi lại chị giảm rõ rệt.",
    },
    quiz: [
      q(
        "Gói giao cho đồng nghiệp nên gồm những thành phần nào?",
        "Bản dặn, tài liệu nền, bộ câu hỏi thử, sổ sửa và một trang hướng dẫn",
        "Chỉ bản dặn vì các thứ còn lại là việc riêng của người làm ra trợ lý",
        "Chỉ đường dẫn tới trợ lý, đồng nghiệp sẽ tự mày mò cách dùng",
        "Bản dặn và điểm số cao nhất mà trợ lý từng đạt trong bộ thử",
        "Gói đủ thì người khác dùng, kiểm và sửa được: bản dặn, tài liệu nền, bộ thử, sổ sửa, hướng dẫn. Giao mỗi bản dặn hay mỗi đường dẫn thiếu phần kiểm và sửa; điểm cao nhất từng đạt không chứng minh hôm nay còn đúng."
      ),
      q(
        "Trang hướng dẫn dài bao nhiêu thì hợp lý?",
        "Gọn một trang, đủ để đọc hết trước khi dùng lần đầu",
        "Mười trang, nêu đầy đủ mọi chi tiết kỹ thuật bên trong trợ lý",
        "Không cần trang riêng, chỉ cần một dòng chào khi mở trợ lý",
        "Càng dài càng tốt vì người dùng có thể bỏ qua phần không cần",
        "Một trang thì người bận vẫn đọc hết. Mười trang không ai đọc; một dòng chào không trả lời được câu hỏi nào; và càng dài thì phần quan trọng càng bị chìm."
      ),
      q(
        "Một mục quan trọng của trang hướng dẫn là gì?",
        "Những việc không nên nhờ trợ lý và những điều phải tự kiểm",
        "Lời hứa rằng trợ lý sẽ luôn trả lời đúng mọi câu hỏi",
        "Tên người đã dựng trợ lý và những lời khen từ đồng nghiệp",
        "Hướng dẫn cách đổi bản dặn, để ai cũng tự sửa theo ý mình",
        "Nói rõ giới hạn ngăn người dùng tin quá mức. Lời hứa luôn đúng là sai sự thật; tên người làm và lời khen không giúp dùng; cho ai cũng tự sửa bản dặn làm mất kiểm soát thay đổi."
      ),
      q(
        "Trước khi giao, bạn nên chạy lại bộ câu hỏi thử để làm gì?",
        "Biết trợ lý còn trả lời đúng với bản dặn và tài liệu hiện tại",
        "Chứng minh với sếp rằng bạn đã làm việc chăm chỉ và cẩn thận đủ",
        "Cho trợ lý làm quen và luyện trước với các câu hỏi người dùng sẽ hỏi",
        "Đếm số câu hỏi đã có để tính xem bộ thử đã đủ dài chưa",
        "Bộ thử là phép kiểm cuối: bản dặn hoặc tài liệu đã đổi nhiều lần từ lần thử trước. Trợ lý không nhớ các lần thử và không luyện trước; chứng minh với sếp hay đếm câu không phải mục đích."
      ),
      q(
        "Gói cho đồng nghiệp xong, ai nên là người sửa bản dặn khi phát hiện lỗi?",
        "Một người phụ trách được chỉ định, ghi mọi sửa đổi vào sổ sửa",
        "Bất kỳ ai dùng trợ lý, sửa bản dặn trực tiếp khi gặp lỗi",
        "Không ai cả, vì bản dặn đã xong thì để nguyên cho chắc",
        "Chính trợ lý, bằng cách tự chỉnh bản dặn khi gặp câu hỏi khó",
        "Một người phụ trách giữ sổ thì mọi thay đổi có dấu vết và có người chịu trách nhiệm. Ai cũng sửa thì bản dặn thành mớ chắp vá; để nguyên thì lỗi tồn mãi; trợ lý không tự sửa bản dặn của mình."
      ),
    ],
    keyTakeaways: [
      "Gói giao cho phòng: bản dặn, tài liệu nền, bộ câu hỏi thử, sổ sửa, trang hướng dẫn.",
      "Trang hướng dẫn một trang: làm được gì, không làm được gì, cách kiểm, báo ai khi sai.",
      "Chạy lại bộ câu hỏi thử ngay trước khi giao.",
      "Chỉ định một người phụ trách sửa và giữ sổ sửa.",
      "Giao cho vài người dùng thử trước khi mở cho cả phòng.",
    ],
    practicePrompt: {
      question:
        "Bạn sắp giao trợ lý tra cứu sổ tay cho cả phòng. Điều nào nên có trong trang hướng dẫn một trang?",
      options: [
        "Nhờ được những việc gì, việc nào phải tự kiểm, và báo ai khi trợ lý sai",
        "Toàn bộ bản dặn, dán nguyên văn để đồng nghiệp hiểu cách trợ lý nghĩ, cả phần nội bộ",
        "Lời cam kết rằng trợ lý đã đạt điểm tối đa trên mọi câu hỏi thử",
        "Danh sách các công cụ đã dùng để dựng trợ lý và ngày bắt đầu dựng",
      ],
      correct: 0,
      explanation:
        "Đó là ba câu người dùng mới cần biết. Dán nguyên bản dặn làm trang hướng dẫn quá dài; cam kết điểm tối đa là hứa suông và khiến người dùng bớt kiểm; công cụ và ngày dựng là chuyện của người làm.",
    },
    summary: {
      keyIdea: "Một trợ lý trở thành của cả phòng khi ai cũng biết dùng, kiểm và báo lỗi cho đúng người.",
      formula: "Bản dặn + tài liệu nền + bộ thử + sổ sửa + một trang hướng dẫn = gói giao cho phòng.",
      commonMistake: "Giao đường dẫn trợ lý bằng một tin nhắn mà không nói giới hạn và cách kiểm.",
      action: "Viết trang hướng dẫn một trang và nhờ một đồng nghiệp đọc thử trước khi gửi cả phòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết trang hướng dẫn một trang cho trợ lý của bạn với bốn mục: làm được gì, không nên nhờ gì, cách kiểm câu trả lời, báo ai khi sai. Đưa cho một đồng nghiệp chưa dùng trợ lý bao giờ, đọc thử và hỏi họ hiểu gì, rồi sửa chỗ họ không hiểu.",
      secondary: "Ngày mai bạn sẽ được hỏi: đồng nghiệp đọc thử nói gì, và bạn đã sửa chỗ nào trong trang hướng dẫn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có bản dặn, tài liệu nền, bộ câu hỏi thử và sổ sửa, nhưng mọi thứ nằm rải rác trong máy bạn. Bài tổng kết này gom chúng thành một gói giao cho đồng nghiệp, cùng một trang hướng dẫn cho người mới dùng.",
      },
      {
        type: "feynman",
        title: "Gói trợ lý đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn giao chìa khoá một quầy hàng cho người mới. Bạn không chỉ đưa chìa, mà đưa cả tờ hướng dẫn: mở cửa thế nào, bán được gì, việc gì không tự quyết, gặp sự cố gọi ai. Gói trợ lý cũng vậy.",
        columns: ["Phần trong gói", "Quầy hàng", "Trợ lý"],
        rows: [
          ["Cách làm việc", "Quy trình mở quầy", "Bản dặn"],
          ["Đồ dùng sẵn có", "Hàng hoá và bảng giá", "Tài liệu nền"],
          ["Cách kiểm", "Kiểm quầy cuối ngày", "Bộ câu hỏi thử"],
          ["Lịch sử thay đổi và hướng dẫn", "Nhật ký quầy và tờ hướng dẫn", "Sổ sửa và trang hướng dẫn"],
        ],
        oneLiner: "Giao trợ lý cũng như giao quầy hàng: đưa đủ đồ nghề và một trang hướng dẫn.",
      },
      { type: "heading", text: "Gói gồm năm thứ" },
      {
        type: "paragraph",
        text: "Bản dặn (vai, việc, giọng), tài liệu nền đã chọn và đã tách phần nhạy cảm, bộ câu hỏi thử cùng đáp án mong đợi, sổ sửa ghi ngày và lý do, và một trang hướng dẫn cho người dùng. Bốn thứ đầu là của người làm; thứ thứ năm là của người dùng.",
      },
      {
        type: "flow",
        title: "Từ trợ lý của riêng bạn tới gói cho cả phòng",
        steps: [
          { label: "Gom đủ năm thứ", detail: "Bản dặn, tài liệu nền, bộ câu hỏi thử, sổ sửa, và chỗ trống cho trang hướng dẫn." },
          { label: "Chạy lại bộ câu hỏi thử", detail: "Trợ lý có thể đã lệch từ lần thử trước; chạy lại để chắc nó còn đúng hôm nay." },
          { label: "Viết trang hướng dẫn", detail: "Một trang: làm được gì, không nên nhờ gì, cách kiểm câu trả lời, báo ai khi sai." },
          { label: "Cho hai ba người dùng thử", detail: "Quan sát họ hỏi gì, tin gì, hiểu nhầm gì, rồi sửa trang hướng dẫn hoặc bản dặn." },
          { label: "Mở cho cả phòng", detail: "Chỉ định một người phụ trách sửa và giữ sổ; ghi ngày rà kế tiếp." },
        ],
      },
      {
        type: "list",
        items: [
          "Trang hướng dẫn bắt đầu bằng việc trợ lý làm được, ví dụ \"tra cứu quy trình thanh toán\".",
          "Mục \"không nên nhờ\" nêu cụ thể: quyết định tài chính, tư vấn pháp lý, thông tin cá nhân.",
          "Mục \"cách kiểm\": đối chiếu số và ngày với tài liệu gốc trước khi dùng.",
          "Mục \"báo ai\": tên một người và cách liên lạc, không phải \"bộ phận liên quan\".",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết nháp trang hướng dẫn",
        task: "Bạn cần một trang hướng dẫn cho trợ lý tra cứu sổ tay phòng kế toán. Lắp yêu cầu để AI viết bản nháp sát với trợ lý của bạn.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết hướng dẫn dùng trợ lý AI.", feedback: "Không nêu trợ lý làm gì; AI sẽ viết hướng dẫn chung cho mọi loại trợ lý." },
              {
                text: "Trợ lý của phòng kế toán tra cứu sổ tay quy trình thanh toán; người dùng là 8 nhân viên không rành công nghệ.",
                good: true,
                feedback: "Nêu việc của trợ lý và người đọc, nên hướng dẫn viết đúng việc và đúng giọng.",
              },
            ],
          },
          {
            id: "sections",
            label: "Các mục cần có",
            options: [
              { text: "Viết đủ mọi thứ cần biết về trợ lý.", feedback: "\"Mọi thứ\" làm trang hướng dẫn dài và lan man, không ai đọc." },
              {
                text: "Bốn mục: làm được gì, không nên nhờ gì, cách kiểm câu trả lời, báo ai khi sai.",
                good: true,
                feedback: "Bốn mục trả lời đúng bốn câu người dùng mới cần biết.",
              },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Tự thêm tên người phụ trách và số điện thoại cho đủ thông tin.", feedback: "AI sẽ bịa tên và số điện thoại; bạn phải tự điền thông tin thật." },
              {
                text: "Dưới một trang; chỗ cần tên người phụ trách thì để trống dạng [tên], đừng bịa.",
                good: true,
                feedback: "Giữ gọn và để trống chỗ AI không thể biết, bạn tự điền.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "sections", "limit"],
            text: "HƯỚNG DẪN DÙNG TRỢ LÝ TRA CỨU SỔ TAY\n1. Làm được gì: tra cứu các bước thanh toán trong sổ tay.\n2. Không nên nhờ: quyết định chi tiêu, tư vấn thuế.\n3. Cách kiểm: đối chiếu số và ngày với sổ tay gốc.\n4. Báo ai khi sai: [tên người phụ trách].",
          },
          {
            requires: ["context"],
            text: "Chào mừng bạn đến với trợ lý! Trợ lý có thể giúp bạn rất nhiều việc khác nhau trong công việc hàng ngày... (đúng chủ đề nhưng dài dòng, thiếu mục không nên nhờ và cách kiểm.)",
          },
          {
            text: "Trợ lý AI là công cụ tuyệt vời, liên hệ anh Hùng số 0912 345 678 khi cần... (AI không biết người phụ trách nên bịa tên và số điện thoại.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng hứa trợ lý luôn đúng",
        text: "Trang hướng dẫn phải nói thật giới hạn của trợ lý. Hứa \"luôn đúng\" khiến người dùng thôi kiểm, và lần sai đầu tiên sẽ làm mất lòng tin của cả phòng.",
      },
      {
        type: "scenario",
        title: "Giao trợ lý cho phòng kế toán",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã dựng xong trợ lý tra cứu sổ tay. Sếp muốn cả phòng dùng từ thứ Hai. Hôm nay là thứ Sáu.",
            choices: [
              { label: "Nhắn cả phòng đường dẫn và nói \"dùng thử nhé\"", next: "bad_link" },
              { label: "Chạy lại bộ câu hỏi thử rồi viết trang hướng dẫn một trang", next: "s2" },
            ],
          },
          bad_link: {
            text: "Đầu tuần nửa phòng hỏi trợ lý cả về thuế và tin luôn câu trả lời. Một người dùng số sai trong một bảng thanh toán, và bạn trả lời cùng một câu hỏi hai mươi lần.",
            ending: "bad",
          },
          s2: {
            text: "Bộ thử cho thấy trợ lý đúng 9 trên 10 câu; câu sai là về hạn thanh toán vừa đổi tuần trước. Trang hướng dẫn đã nháp xong.",
            choices: [
              { label: "Sửa tài liệu nền cho đúng hạn mới, chạy lại bộ thử, rồi cho hai người dùng thử", next: "good" },
              { label: "Bỏ qua câu sai vì 9 trên 10 đã đủ tốt, giao luôn cho cả phòng", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Câu hỏi về hạn thanh toán là câu được hỏi nhiều nhất trong tuần đầu. Trợ lý trả lời hạn cũ, hai khoản thanh toán bị trễ.",
            ending: "bad",
          },
          good: {
            text: "Hai người dùng thử chỉ ra một chỗ trang hướng dẫn chưa rõ và bạn sửa. Thứ Hai cả phòng nhận một gói gọn, biết việc nào nên nhờ và báo ai khi trợ lý sai.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bạn đã đi từ câu dặn đầu tiên tới một trợ lý cả phòng dùng được.",
          "Tiếp theo: giữ nó khoẻ bằng sổ sửa, lịch rà và bộ câu hỏi thử đều đặn.",
        ],
      },
    ],
  },
];
