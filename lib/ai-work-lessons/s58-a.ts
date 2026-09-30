import type { Lesson } from "../lesson-types";

// Chặng 58, bài 1-5. Giáo trình: scripts/curriculum/stage-58.json.
// Không nêu tính năng riêng của công cụ nào: chỉ dạy cách đọc lỗi, mô tả lỗi và giao việc cho AI.

// Đáp án đúng luôn ở vị trí 0 trong tệp này; thứ tự được cân lại lúc build.
const Q = (
  question: string,
  ok: string,
  bad: [string, string, string],
  explanation: string,
) => ({ question, options: [ok, ...bad], correct: 0, explanation });

export const S58_A_LESSONS: Lesson[] = [
  {
    id: 2560,
    slug: "thong-bao-loi-do-tren-man-hinh-doc-tu-dau",
    title: "Chặng 58, Bài 1: Màn hình báo lỗi đỏ chót: đọc từ dòng nào trước",
    subtitle: "Một khối chữ đỏ dài như lá thư: bạn chỉ cần tìm ba thứ là nó nói gì, ở đâu, do đâu.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🚨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chiều thứ Năm bạn bấm xuất báo cáo và cả khối chữ đỏ hiện ra. Phản xạ của đa số người là đóng lại rồi thử lại, hoặc gọi người hỗ trợ mà không nói được mình thấy gì. Biết đọc ba thứ trong thông báo lỗi giúp bạn tự xử lý được nhiều lỗi nhỏ, và khi phải nhờ người khác thì nhờ đúng.",
    openingQuestion:
      "Công cụ báo cáo bỗng hiện một khối chữ đỏ dài mười mấy dòng. Bạn nên làm gì đầu tiên?",
    openingOptions: [
      "Tìm dòng nói lỗi là gì và lỗi xảy ra ở chỗ nào",
      "Đóng cửa sổ rồi bấm lại cho chắc",
      "Chụp cả màn hình rồi gửi ngay cho người hỗ trợ kỹ thuật mà không đọc",
      "Cài lại công cụ từ đầu vì khối chữ đỏ nghĩa là chương trình đã hỏng hẳn",
    ],
    correctOption: 0,
    explanation:
      "Khối chữ đỏ dài trông đáng sợ nhưng thường chỉ có một hai dòng thật sự mang tin: dòng nói lỗi là gì, và dòng chỉ ra chỗ xảy ra (tên tệp, số dòng, tên trường). Phần còn lại là vết đường đi mà người viết công cụ cần. Đóng rồi bấm lại thường cho lỗi y hệt, chụp gửi mà không đọc thì người kia phải hỏi lại, còn cài lại công cụ hiếm khi cần và có thể làm mất cài đặt của bạn.",
    diagram: [
      { label: "Thấy khối chữ đỏ, dừng lại không bấm lung tung", arrow: true },
      { label: "Tìm dòng nói lỗi là gì (nó nói gì)", arrow: true },
      { label: "Tìm chỗ xảy ra: tệp, dòng, ô, tên trường (ở đâu)", arrow: true },
      { label: "Đoán sơ nguyên nhân: dữ liệu, quyền hay dịch vụ (do đâu)" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kế toán nhập bảng công nợ vào công cụ báo cáo và thấy khối lỗi dài. Cô bỏ qua phần đầu, chỉ đọc dòng có chữ 'dòng 14' và thấy ô ngày ghi '31/02'. Sửa ô đó, chạy lại là xong, không cần gọi ai. Cùng khối lỗi ấy, người không đọc sẽ chỉ kể 'nó báo đỏ lòm' và mất cả buổi chờ hỗ trợ.",
    },
    quiz: [
      Q(
        "Khối lỗi dài mười mấy dòng, phần nào thường đáng đọc nhất?",
        "Dòng mô tả lỗi và dòng chỉ chỗ xảy ra",
        [
          "Toàn bộ khối, từ dòng đầu đến dòng cuối, đọc lần lượt từng chữ một",
          "Chỉ những dòng có chữ in hoa vì đó luôn là chỗ quan trọng nhất",
          "Dòng ở giữa khối, vì người viết công cụ hay giấu nguyên nhân ở đó",
        ],
        "Vết đường đi dài chủ yếu phục vụ người viết công cụ. Bạn chỉ cần dòng nói lỗi là gì và chỗ xảy ra. Đọc từng chữ tốn công mà không thêm tin, chữ in hoa chỉ là kiểu trình bày, và không có quy luật 'dòng giữa' nào cả.",
      ),
      Q(
        "Thông báo ghi 'không tìm thấy trường Ngày giao, dòng 9'. Đây là tin gì?",
        "Chỗ xảy ra: dòng 9 thiếu hoặc sai tên trường Ngày giao",
        [
          "Công cụ hỏng hoàn toàn, phải cài lại ngay",
          "Mạng bị đứt nên dữ liệu không gửi được tới máy chủ của công cụ",
          "Bạn chưa đăng nhập nên công cụ chưa biết bạn là ai để cho làm việc",
        ],
        "Câu này nêu cụ thể tên trường và số dòng, nên nó chỉ vào dữ liệu ở dòng 9. Công cụ hỏng hay mất mạng thường cho thông báo khác (không kết nối, hết thời gian chờ), và chưa đăng nhập thì thông báo nói về quyền hoặc phiên làm việc.",
      ),
      Q(
        "Vì sao không nên đóng thông báo lỗi rồi bấm lại ngay?",
        "Bạn mất lời nhắn chính xác của lỗi mà có thể sẽ cần",
        [
          "Vì bấm lại nhiều lần sẽ khoá tài khoản",
          "Vì thông báo lỗi chỉ hiện đúng một lần duy nhất rồi không bao giờ xuất hiện lại nữa",
          "Vì đóng thông báo là hành động bị cấm trong mọi công cụ làm việc",
        ],
        "Thông báo có thể đổi nếu bạn thử thêm bước khác, nên hãy chụp hoặc chép lại trước. Khoá tài khoản vĩnh viễn là nói quá, và lỗi thường hiện lại nếu nguyên nhân vẫn còn, chỉ là bạn không còn nguyên văn để đối chiếu.",
      ),
      Q(
        "Ba câu hỏi nào giúp bạn hiểu một thông báo lỗi?",
        "Nó nói gì, xảy ra ở đâu, có thể do đâu",
        [
          "Ai làm hỏng, hỏng lúc mấy giờ, và phải bồi thường bao nhiêu",
          "Chương trình nào cũ nhất, máy nào chậm nhất, mạng nào yếu nhất trong phòng",
          "Có phải lỗi của công cụ không, có nên đổi công cụ không, đổi sang cái nào",
        ],
        "Nói gì, ở đâu, do đâu là khung đọc lỗi đủ dùng cho người không biết kỹ thuật. Tìm người làm hỏng hay đổi công cụ là bước nhảy quá xa khi bạn chưa đọc được lỗi, còn so máy cũ hay mạng yếu chỉ đúng khi dấu hiệu chỉ về phần cứng.",
      ),
      Q(
        "Bạn dán lỗi cho AI. Cách nhờ nào hợp lý nhất?",
        "Nhờ AI giải thích lỗi bằng lời thường, rồi hỏi bước kiểm tra",
        [
          "Bảo AI 'sửa đi' rồi làm theo hết các bước",
          "Chỉ gõ tên công cụ rồi chờ AI tự đoán",
          "Nhờ AI đăng nhập thay bạn để chạy lại",
        ],
        "AI chỉ thấy chữ bạn dán, nên giải thích lỗi trước rồi mới xin cách kiểm tra thì bạn hiểu và kiểm soát được. Làm theo mọi bước mà không đọc có thể đổi nhầm dữ liệu, còn chỉ gõ tên công cụ thì AI đoán bừa, và AI trò chuyện không tự đăng nhập hộ bạn.",
      ),
    ],
    keyTakeaways: [
      "Khối lỗi đỏ dài thường chỉ có 1-2 dòng mang tin thật.",
      "Đọc ba thứ: nó nói gì, xảy ra ở đâu, có thể do đâu.",
      "Chụp hoặc chép nguyên văn lỗi trước khi bấm thêm gì.",
      "Nhờ AI giải thích lỗi bằng lời thường trước, xin cách sửa sau.",
    ],
    practicePrompt: {
      question:
        "Công cụ báo: 'Dòng 14: giá trị ngày không hợp lệ (31/02)'. Việc đầu tiên nên làm là gì?",
      options: [
        "Mở dòng 14 và xem ô ngày có ghi sai không",
        "Nhập lại toàn bộ bảng từ dòng 1 cho chắc ăn",
        "Gọi người hỗ trợ kỹ thuật và chờ họ xử lý thay bạn",
        "Đổi sang công cụ báo cáo khác vì công cụ này không chịu nhận ngày",
      ],
      correct: 0,
      explanation:
        "Thông báo đã chỉ đích danh dòng 14 và lý do: 31/02 không tồn tại. Kiểm đúng ô đó mất một phút. Nhập lại cả bảng, gọi hỗ trợ hay đổi công cụ đều tốn hơn nhiều cho một lỗi chỉ nằm ở một ô.",
    },
    summary: {
      keyIdea: "Thông báo lỗi là một lá thư: phần lớn dòng là phong bì, chỉ 1-2 dòng là nội dung.",
      formula: "Nó nói gì + Xảy ra ở đâu + Có thể do đâu = đủ để tự xử lý hoặc nhờ đúng người.",
      commonMistake: "Đóng thông báo rồi báo người khác 'nó hỏng' mà không nhớ nguyên văn.",
      action: "Lần tới gặp lỗi, chép lại nguyên văn và gạch dưới dòng nói lỗi là gì.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một lỗi gần nhất bạn gặp khi dùng công cụ ở chỗ làm (hoặc cố tình nhập sai một ô ngày để tạo lỗi). Chụp hoặc chép lại thông báo, gạch dưới dòng nói lỗi là gì và chỗ xảy ra, rồi viết ba dòng: nó nói gì, ở đâu, có thể do đâu.",
      secondary: "Nếu còn thời gian, dán thông báo cho AI và so lời giải thích của nó với ba dòng bạn tự viết.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai bạn mở công cụ quen thuộc, bấm xuất báo cáo và cả màn hình hiện một khối chữ đỏ. Bài này dạy bạn đọc khối đó như đọc một lá thư: tìm ba thứ, bỏ qua phần còn lại.",
      },
      {
        type: "feynman",
        title: "Đọc thông báo lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung công cụ gửi bạn một lá thư báo hỏng. Lá thư có phong bì, lời chào và đường đi của người đưa thư, nhưng nội dung thật chỉ có một hai câu.",
        columns: ["Thành phần", "Lá thư báo hỏng", "Thông báo lỗi"],
        rows: [
          ["Nội dung chính", "Câu nói việc gì đã hỏng", "Dòng mô tả lỗi, ví dụ 'giá trị ngày không hợp lệ'"],
          ["Địa chỉ", "Nhà số mấy, phòng nào", "Tên tệp, số dòng, ô hoặc tên trường"],
          ["Phong bì, dấu bưu điện", "Đường thư đã đi qua", "Vết đường đi dài, người viết công cụ mới cần"],
          ["Người nhận làm gì", "Đọc câu chính và địa chỉ rồi đi sửa", "Đọc dòng lỗi và chỗ xảy ra, kiểm đúng chỗ đó"],
        ],
        oneLiner: "Thông báo lỗi là lá thư: đọc nội dung và địa chỉ, phần phong bì cứ để đó.",
      },
      { type: "heading", text: "Vì sao khối chữ đỏ lại dài như vậy" },
      {
        type: "paragraph",
        text: "Công cụ được viết cho cả người viết công cụ lẫn người dùng, nên nó in ra mọi thứ nó biết. Phần lớn dòng ghi lại công cụ đã đi qua những bước nào trước khi hỏng. Với bạn, chỉ cần hai loại tin: lỗi là gì, và chỗ nào bị lỗi.",
      },
      { type: "heading", text: "Ba thứ cần tìm" },
      {
        type: "list",
        items: [
          "Nó nói gì: câu mô tả lỗi, thường có chữ như 'không hợp lệ', 'không tìm thấy', 'không có quyền', 'hết thời gian chờ'.",
          "Ở đâu: tên tệp, số dòng, tên ô hoặc tên trường dữ liệu đang bị nhắc tới.",
          "Do đâu: đoán sơ nguyên nhân là dữ liệu của bạn, quyền truy cập hay dịch vụ bên ngoài đang gặp sự cố.",
          "Giữ nguyên văn: chụp hoặc chép lại trước khi bấm thêm bất cứ thứ gì.",
        ],
      },
      {
        type: "callout",
        label: "Đừng đoán ra ngoài thông báo",
        text: "Nếu thông báo nói 'dòng 14 sai ngày' thì đừng nghi ngờ cả công cụ. Mỗi lần bạn đoán rộng hơn thông báo, bạn tốn thêm thời gian kiểm những chỗ chưa có dấu hiệu nào.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giải thích một khối lỗi",
        task: "Công cụ báo cáo hiện khối lỗi kết thúc bằng 'Dòng 14: giá trị ngày không hợp lệ (31/02)'. Lắp câu hỏi để AI giúp bạn hiểu lỗi (không xin sửa vội).",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              {
                text: "Tôi bấm xuất báo cáo công nợ từ bảng 40 dòng thì hiện lỗi này.",
                good: true,
                feedback: "AI biết bạn đang làm việc gì và dữ liệu cỡ nào nên giải thích sát tình huống.",
              },
              {
                text: "Nó lỗi rồi.",
                feedback: "AI không biết bạn đang làm gì nên chỉ trả lời chung chung, có khi đoán sai công cụ.",
              },
            ],
          },
          {
            id: "error",
            label: "Nội dung lỗi",
            options: [
              {
                text: "Lỗi như sau (nguyên văn): Dòng 14: giá trị ngày không hợp lệ (31/02).",
                good: true,
                feedback: "Nguyên văn cho AI đúng dấu hiệu để đọc, nên không phải suy đoán.",
              },
              {
                text: "Nó báo gì đó về ngày tháng thì phải.",
                feedback: "Bạn tự tóm tắt nên mất chi tiết dòng 14 và 31/02, AI sẽ đoán thay.",
              },
            ],
          },
          {
            id: "ask",
            label: "Điều bạn xin",
            options: [
              {
                text: "Giải thích lỗi bằng lời thường: nó nói gì, ở đâu, và tôi nên kiểm gì đầu tiên.",
                good: true,
                feedback: "Bạn hiểu lỗi trước rồi mới tự quyết sửa, nên không làm theo mù quáng.",
              },
              {
                text: "Sửa luôn cho tôi và viết lại toàn bộ bảng.",
                feedback: "AI có thể đổi cả dữ liệu đang đúng để 'cho chạy được' mà bạn không biết nó đổi gì.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "error", "ask"],
            text: "Lỗi nói rằng ở dòng 14 có một ngày không tồn tại: 31/02, vì tháng 2 không có ngày 31. Nó chỉ rõ chỗ xảy ra nên đây nhiều khả năng là dữ liệu bạn nhập chứ không phải công cụ hỏng.\n\nViệc nên kiểm đầu tiên: mở dòng 14, xem ô ngày. Có thể bạn gõ nhầm 31/02 thay vì 31/01 hoặc 28/02. Sửa xong, chạy lại. Nếu lỗi chuyển sang dòng khác thì lặp lại cách đọc này.",
          },
          {
            requires: ["error"],
            text: "Có vẻ có một ngày không hợp lệ ở dòng 14. Bạn thử kiểm tra định dạng ngày trong bảng.\n\n(Đúng hướng nhưng AI chưa biết bạn làm gì nên không chỉ được chính xác bước kiểm tiếp theo.)",
          },
          {
            text: "Lỗi này thường do phiên bản công cụ đã cũ. Bạn hãy cập nhật lên bản mới nhất và khởi động lại máy, sau đó nhập lại toàn bộ dữ liệu.\n\n(AI không thấy lỗi nguyên văn nên bịa ra nguyên nhân 'phiên bản cũ' nghe hợp lý nhưng không có căn cứ.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Khối chữ đỏ lúc bốn giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn bấm xuất báo cáo và khối chữ đỏ dài hiện ra. Cuối khối có dòng 'Dòng 14: giá trị ngày không hợp lệ'. Còn một tiếng là hết giờ làm.",
            choices: [
              { label: "Đóng cửa sổ, bấm xuất lại và hy vọng lần này được", next: "bad_retry" },
              { label: "Chép nguyên văn lỗi, đọc dòng cuối và mở dòng 14 trong bảng", next: "s2" },
            ],
          },
          bad_retry: {
            text: "Lỗi hiện y hệt, rồi lần thứ tư bạn không còn nhớ dòng nào bị nhắc. Bạn mất nửa tiếng mà chưa biết mình đang gặp gì.",
            ending: "bad",
          },
          s2: {
            text: "Ô ngày ở dòng 14 ghi 31/02. Bảng còn các dòng khác trông giống nhau.",
            choices: [
              { label: "Sửa ô đó cho đúng ngày thật rồi chạy lại", next: "good" },
              { label: "Xoá toàn bộ cột ngày và nhập lại từ đầu cho chắc", next: "bad_wipe" },
            ],
          },
          bad_wipe: {
            text: "Bạn xoá cả cột, nhập lại 40 dòng bằng trí nhớ và nhầm thêm hai ngày mà chưa ai phát hiện.",
            ending: "bad",
          },
          good: {
            text: "Bạn sửa một ô, chạy lại và báo cáo ra đúng. Bạn chép thêm lỗi này vào sổ tay để lần sau nhận ra ngay.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Từ khối chữ đỏ tới hành động",
        steps: [
          { label: "Dừng lại", detail: "Không bấm thêm gì. Mỗi lần thử mới có thể làm thông báo đổi hoặc mất." },
          { label: "Giữ nguyên văn", detail: "Chụp màn hình hoặc chép chữ. Bạn sẽ cần khi dán cho AI hoặc báo người hỗ trợ." },
          { label: "Tìm dòng lỗi và chỗ xảy ra", detail: "Gạch dưới câu mô tả lỗi, tên tệp, số dòng hoặc tên trường." },
          { label: "Đoán sơ nguyên nhân", detail: "Dữ liệu của bạn, quyền truy cập hay dịch vụ bên ngoài. Chỉ đoán trong phạm vi thông báo." },
          { label: "Kiểm đúng chỗ đó", detail: "Sửa một chỗ rồi chạy lại. Còn lỗi thì lặp lại đọc ba thứ trên thông báo mới." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Đọc lỗi là tìm ba thứ: nó nói gì, ở đâu, do đâu.",
          "Bài sau: phân biệt lỗi do bạn nhập, do công cụ hay do dịch vụ bên ngoài.",
        ],
      },
    ],
  },
  {
    id: 2561,
    slug: "loi-cua-ban-hay-loi-cua-he-thong-khac",
    title: "Chặng 58, Bài 2: Lỗi do bạn nhập, do công cụ hay do dịch vụ bên ngoài",
    subtitle: "Ba nhóm lỗi, ba nơi sửa khác nhau: biết mình đang ở nhóm nào đỡ mất cả buổi sai chỗ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi công cụ báo lỗi, có ba khả năng: bạn nhập sai, công cụ có vấn đề, hoặc một dịch vụ khác mà công cụ dựa vào đang trục trặc. Mỗi khả năng có cách sửa riêng và người sửa riêng. Đổ nhầm nhóm thì bạn hoặc phí thời gian tự sửa thứ không sửa được, hoặc làm phiền người khác vì lỗi do chính mình nhập.",
    openingQuestion:
      "Công cụ báo 'Lỗi 403: bạn không có quyền truy cập thư mục này'. Nhóm lỗi nào có khả năng nhất và ai sửa?",
    openingOptions: [
      "Quyền truy cập: người quản lý thư mục cần cấp quyền cho bạn",
      "Dữ liệu bạn nhập sai định dạng nên bạn phải nhập lại toàn bộ tệp",
      "Dịch vụ bên ngoài đang sập nên mọi người đều phải chờ tới khi nó chạy lại",
      "Công cụ bị lỗi phần mềm nên nhà cung cấp phải phát hành bản vá mới",
    ],
    correctOption: 0,
    explanation:
      "Chữ 'không có quyền' cho biết hệ thống biết bạn là ai nhưng chưa cho phép thao tác này. Đó không phải chuyện dữ liệu của bạn sai, cũng không phải sập dịch vụ (khi sập thì thông báo thường nói không kết nối được hoặc hết thời gian chờ) hay lỗi phần mềm cần bản vá. Người cần hành động là người có quyền cấp truy cập, nên việc của bạn là nhờ đúng người đó.",
    diagram: [
      { label: "Đọc thông báo: nó nhắc dữ liệu, quyền hay kết nối", arrow: true },
      { label: "Xếp vào nhóm: bạn nhập, công cụ hoặc dịch vụ ngoài", arrow: true },
      { label: "Chọn nơi sửa: tự sửa, hỏi quản lý hay chờ và thử lại", arrow: true },
      { label: "Thử lại sau khi sửa để xác nhận đúng nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: ba đồng nghiệp cùng gặp lỗi lúc tải file lên một nền tảng chia sẻ. Một người thấy 'định dạng ngày không hợp lệ', một người thấy 'không có quyền', một người thấy 'dịch vụ tạm thời không khả dụng'. Cả ba đều nói 'tải file bị lỗi' với nhau, nhưng cách sửa khác hẳn: sửa ô ngày, xin cấp quyền, và chờ rồi thử lại. Nếu chỉ nói 'bị lỗi', họ sẽ thử cách của nhau và không ai xong.",
    },
    quiz: [
      Q(
        "Thông báo 'không tìm thấy trường Mã khách' ở dòng 5 thường là nhóm nào?",
        "Dữ liệu bạn nhập, vì nó chỉ vào đúng dòng và trường",
        [
          "Lỗi công cụ, vì phần mềm bị hỏng hẳn",
          "Dịch vụ ngoài sập, vì mọi lỗi không tìm thấy đều là do đường truyền yếu",
          "Quyền truy cập, vì công cụ không thấy thì nghĩa là bạn chưa được phép thấy",
        ],
        "Nhắc đích danh dòng và trường là dấu hiệu dữ liệu. Công cụ hỏng thường báo lỗi chung ở mọi dữ liệu, dịch vụ sập thì báo không kết nối, còn thiếu quyền thì thông báo dùng chữ như 'không được phép' chứ không nhắc tên trường.",
      ),
      Q(
        "Thông báo 'hết thời gian chờ, thử lại sau' thường gợi ý nhóm nào?",
        "Dịch vụ bên ngoài hoặc đường truyền đang chậm",
        [
          "Bạn nhập sai nên phải nhập lại toàn bộ",
          "Bạn chưa đăng nhập nên cần xin quản trị viên cấp lại mật khẩu cho mình",
          "Công cụ đã bị khoá vĩnh viễn và phải mua bản mới mới dùng tiếp được",
        ],
        "Hết thời gian chờ nghĩa là công cụ gửi yêu cầu nhưng không nhận phản hồi kịp, nên thử lại sau vài phút là phép thử hợp lý. Nhập lại dữ liệu, xin cấp lại mật khẩu hay mua bản mới đều không liên quan tới dấu hiệu đó.",
      ),
      Q(
        "Bạn nên làm gì khi nhận lỗi 'không có quyền'?",
        "Báo người quản lý, kèm tên thư mục và thao tác bạn định làm",
        [
          "Bấm lại nhiều lần cho tới khi hệ thống cho phép",
          "Nhờ đồng nghiệp đưa mật khẩu của họ để bạn tạm dùng cho nhanh việc",
          "Đổi toàn bộ dữ liệu sang tệp khác cho đến khi thông báo lỗi biến mất",
        ],
        "Quyền do người quản lý cấp, nên cần nói rõ thư mục và thao tác. Bấm lại không đổi quyền, còn mượn mật khẩu đồng nghiệp là vi phạm an toàn thông tin và có thể gây rắc rối cho cả hai người. Đổi tệp khác chỉ né lỗi mà không xử lý gốc.",
      ),
      Q(
        "Cùng một thao tác, đồng nghiệp làm được còn bạn thì báo lỗi. Nhóm nào đáng nghi nhất?",
        "Do riêng bạn: dữ liệu, quyền hoặc cài đặt của bạn",
        [
          "Do dịch vụ bên ngoài đang sập hoàn toàn",
          "Do công cụ hỏng hoàn toàn, nên đồng nghiệp chỉ làm được nhờ may mắn",
          "Do chưa cài AI trên máy bạn nên công cụ không chạy được như máy họ",
        ],
        "Nếu người khác làm được thì công cụ và dịch vụ ngoài đang chạy, phần khác nhau nằm ở phía bạn: dữ liệu bạn đưa vào, quyền tài khoản bạn hoặc cài đặt máy bạn. Dịch vụ sập thì ảnh hưởng nhiều người, và AI không phải điều kiện để công cụ chạy.",
      ),
      Q(
        "Vì sao phân nhóm lỗi trước khi sửa lại tiết kiệm thời gian?",
        "Vì mỗi nhóm có cách sửa và người sửa khác nhau",
        [
          "Vì công cụ sẽ ngừng hiện lỗi cho bạn",
          "Vì nhóm lỗi nào cũng chỉ cần gọi chung một số điện thoại hỗ trợ duy nhất",
          "Vì phân nhóm là bước bắt buộc để hệ thống ghi nhận lỗi của bạn vào sổ",
        ],
        "Lỗi do bạn thì bạn sửa, lỗi quyền thì chờ người cấp, lỗi dịch vụ thì đợi và thử lại. Biết nhóm là biết hành động. Phân nhóm không làm lỗi biến mất, không có một số điện thoại dùng cho mọi nhóm, và nó cũng không phải thủ tục bắt buộc của hệ thống.",
      ),
    ],
    keyTakeaways: [
      "Ba nhóm lỗi: dữ liệu bạn nhập, quyền hoặc công cụ, dịch vụ bên ngoài.",
      "Thông báo nhắc dòng hoặc trường cụ thể: hướng về dữ liệu của bạn.",
      "Chữ 'không có quyền' nghĩa là nhờ người quản lý, không phải nhập lại.",
      "'Hết thời gian chờ' hoặc 'không khả dụng': chờ rồi thử lại, hỏi vài đồng nghiệp xem có ai bị không.",
    ],
    practicePrompt: {
      question:
        "Cả phòng không ai đăng nhập được công cụ chấm công từ sáng. Nhóm lỗi nào khả dĩ nhất?",
      options: [
        "Dịch vụ hoặc hệ thống chung đang gặp sự cố",
        "Dữ liệu bạn nhập sai ở một dòng nào đó trong bảng",
        "Quyền truy cập riêng của từng người bị thu hồi cùng lúc",
        "Một nhân viên đã gõ sai mật khẩu nhiều lần và khoá cả phòng",
      ],
      correct: 0,
      explanation:
        "Khi nhiều người cùng bị một lúc, nguyên nhân thường nằm ở thứ chung: dịch vụ hoặc hệ thống. Dữ liệu một dòng chỉ ảnh hưởng người nhập, quyền thường đổi theo từng người chứ không đồng loạt, và gõ sai mật khẩu chỉ khoá tài khoản của người gõ.",
    },
    summary: {
      keyIdea: "Biết lỗi thuộc nhóm nào là biết ai sửa và sửa ở đâu.",
      formula: "Nhắc dòng hoặc trường: dữ liệu. 'Không có quyền': người cấp quyền. 'Hết thời gian chờ': chờ và thử lại.",
      commonMistake: "Nói 'bị lỗi' chung chung rồi thử cách của người khác, dù lỗi thuộc nhóm khác.",
      action: "Lần tới gặp lỗi, ghi một chữ: dữ liệu, quyền hay dịch vụ, trước khi hành động.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 3 thông báo lỗi bạn từng gặp (hoặc tìm trong email, chat nhờ hỗ trợ của phòng bạn). Với mỗi thông báo, viết một dòng: nhóm nào (dữ liệu, quyền, dịch vụ) và ai sẽ sửa. Hỏi lại đồng nghiệp xem họ phân loại có giống bạn không.",
      secondary: "Giữ danh sách này ở một tệp ghi chú để lần sau đối chiếu nhanh.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai người cùng báo 'công cụ bị lỗi' nhưng một người cần sửa ô ngày, người kia cần xin quyền. Bài này giúp bạn xếp lỗi vào đúng nhóm trước khi bắt tay sửa.",
      },
      {
        type: "feynman",
        title: "Phân loại lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn gọi điện đặt một món ăn mà không thành. Có ba khả năng: bạn đọc sai địa chỉ, nhà hàng không nhận đơn của bạn, hoặc đường giao hàng đang tắc.",
        columns: ["Tình huống", "Đặt món không thành", "Lỗi công cụ"],
        rows: [
          ["Bạn nói sai", "Đọc nhầm số nhà nên shipper không tìm thấy", "Dữ liệu bạn nhập sai định dạng hoặc thiếu"],
          ["Bên nhận từ chối", "Nhà hàng không nhận đơn từ số của bạn", "Công cụ hoặc quyền: bạn chưa được phép làm việc này"],
          ["Đường tắc", "Giao lâu hơn, chờ rồi sẽ tới", "Dịch vụ bên ngoài chậm hoặc không phản hồi"],
          ["Cách xử lý", "Sửa địa chỉ, xin nhà hàng nhận, hoặc chờ", "Sửa dữ liệu, nhờ cấp quyền, hoặc chờ và thử lại"],
        ],
        oneLiner: "Trước khi sửa, hỏi: mình nói sai, bên nhận từ chối, hay đường đang tắc?",
      },
      { type: "heading", text: "Ba nhóm và dấu hiệu nhận ra" },
      {
        type: "comparison",
        left: {
          label: "Nằm ở phía bạn",
          text: "Dữ liệu nhập sai hoặc thiếu, tệp sai định dạng, ô trống bắt buộc. Thông báo thường nhắc dòng, ô hoặc tên trường cụ thể. Bạn sửa được ngay.",
        },
        right: {
          label: "Nằm ở phía hệ thống",
          text: "Không có quyền, tài khoản hết hạn, hoặc dịch vụ bên ngoài chậm, không khả dụng. Thông báo dùng chữ như 'không được phép', 'hết thời gian chờ'. Bạn báo người phụ trách hoặc chờ rồi thử lại.",
        },
      },
      {
        type: "list",
        items: [
          "Nhắc dòng, ô, trường cụ thể: nhiều khả năng dữ liệu của bạn.",
          "'Không có quyền' hoặc 'từ chối truy cập': quyền, nhờ người quản lý.",
          "'Hết thời gian chờ', 'tạm thời không khả dụng': dịch vụ hoặc mạng, chờ rồi thử lại.",
          "Chỉ mình bạn bị còn đồng nghiệp thì không: nhìn vào dữ liệu, quyền, cài đặt của riêng bạn.",
        ],
      },
      {
        type: "callout",
        label: "Một mẹo phân biệt nhanh",
        text: "Hỏi một đồng nghiệp cùng làm thao tác đó có bị không. Cả hai cùng bị thì nhiều khả năng lỗi ở phía hệ thống chung; chỉ mình bạn bị thì xem lại dữ liệu và quyền của bạn.",
      },
      {
        type: "scenario",
        title: "Ba thông báo lỗi trong một tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Hai bạn tải bảng công nợ lên công cụ báo cáo và thấy 'Dòng 14: định dạng ngày không hợp lệ'.",
            choices: [
              { label: "Báo ngay bộ phận hỗ trợ kỹ thuật là công cụ hỏng", next: "bad_support" },
              { label: "Mở dòng 14, sửa ô ngày cho đúng rồi tải lại", next: "s2" },
            ],
          },
          bad_support: {
            text: "Bộ phận hỗ trợ mở dòng 14 lên và chỉ ra ô ngày sai. Bạn mất nửa ngày chờ và họ ghi nhận bạn chưa đọc lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Báo cáo chạy. Thứ Tư bạn mở một thư mục chung thì thấy 'Lỗi 403: bạn không có quyền truy cập thư mục này'.",
            choices: [
              { label: "Nhắn người quản lý thư mục, nói rõ tên thư mục và việc cần làm", next: "s3" },
              { label: "Xin đồng nghiệp đưa mật khẩu của họ để mở tạm cho nhanh", next: "bad_password" },
            ],
          },
          bad_password: {
            text: "Bạn mở được, nhưng hệ thống ghi lại là đồng nghiệp đã xem. Khi có sự cố, cả hai bị hỏi và phòng an toàn thông tin nhắc nhở.",
            ending: "bad",
          },
          s3: {
            text: "Bạn được cấp quyền. Thứ Sáu công cụ hiện 'Dịch vụ tạm thời không khả dụng, thử lại sau'.",
            choices: [
              { label: "Xoá toàn bộ dữ liệu đã nhập và nhập lại từ đầu", next: "bad_wipe" },
              { label: "Hỏi một đồng nghiệp xem có bị không, chờ vài phút rồi thử lại", next: "good" },
            ],
          },
          bad_wipe: {
            text: "Bạn nhập lại cả buổi chiều. Dịch vụ chạy lại sau mười phút và dữ liệu cũ vốn không hề sai.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp cũng bị. Sau vài phút dịch vụ chạy lại, bạn tải tiếp mà không mất gì.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Quyết định sửa ở đâu",
        steps: [
          { label: "Đọc lỗi nhắc điều gì", detail: "Dòng, trường, quyền hay kết nối. Chữ chính trong thông báo là manh mối đầu tiên." },
          { label: "Hỏi một người cùng làm", detail: "Nếu họ cũng bị, nghiêng về phía hệ thống chung. Nếu không, nghiêng về phía bạn." },
          { label: "Xếp nhóm", detail: "Dữ liệu của bạn, quyền hoặc công cụ, hoặc dịch vụ bên ngoài." },
          { label: "Hành động đúng nhóm", detail: "Tự sửa dữ liệu, nhờ người cấp quyền, hoặc chờ rồi thử lại." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Mỗi nhóm lỗi có một nơi sửa: đừng sửa nhầm chỗ.",
          "Bài sau: chụp lỗi và ghi các bước để ai cũng làm lại được.",
        ],
      },
    ],
  },
  {
    id: 2562,
    slug: "chup-man-hinh-loi-va-ghi-lai-cac-buoc-de-lap-lai",
    title: "Chặng 58, Bài 3: Chụp lỗi và ghi các bước để ai cũng làm lại được",
    subtitle: "Đồng nghiệp báo 'không chạy được': ba dòng của bạn biến câu đó thành thứ người khác xử lý được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📸",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một lời báo 'không chạy được' bắt người nhận hỏi lại ít nhất ba câu: bạn làm gì, bạn mong thấy gì, bạn thấy gì. Mỗi lượt hỏi đáp mất nửa ngày vì hai bên bận. Ba dòng viết sẵn tiết kiệm hầu hết những lượt đó, dù người nhận là đồng nghiệp, bộ phận hỗ trợ hay AI.",
    openingQuestion:
      "Đồng nghiệp nhắn: 'Chị ơi, công cụ không chạy được'. Bạn cần viết lại để người khác xử lý được. Thông tin nào quan trọng nhất?",
    openingOptions: [
      "Các bước đã làm, kết quả mong muốn và kết quả thực tế",
      "Tên công cụ và lời phàn nàn rằng nó lúc nào cũng hay bị trục trặc",
      "Chữ 'khẩn' in hoa ở đầu tin nhắn để người nhận xử lý trước",
      "Nguyên nhân bạn đoán, viết chắc chắn",
    ],
    correctOption: 0,
    explanation:
      "Ba thứ này cho người khác tái hiện được lỗi: làm theo các bước, so kết quả mong muốn với kết quả thật là thấy chỗ lệch. Phàn nàn chung không cho họ điều gì để làm, chữ 'khẩn' chỉ đổi thứ tự xếp hàng chứ không giúp sửa, và nguyên nhân đoán khẳng định dễ dẫn người nhận đi sai hướng ngay từ đầu.",
    diagram: [
      { label: "Chụp lỗi nguyên văn, giữ cả thời điểm", arrow: true },
      { label: "Ghi các bước đã làm theo thứ tự", arrow: true },
      { label: "Viết kết quả mong muốn và kết quả thực tế", arrow: true },
      { label: "Nhờ người khác thử làm lại đúng theo ba dòng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhân viên kinh doanh báo 'bảng báo giá xuất ra bị sai'. Người hỗ trợ hỏi lại ba lượt mất hai ngày. Lần sau cô viết: 'Bước 1 mở mẫu báo giá, bước 2 chọn khách Minh Phát, bước 3 bấm Xuất. Mong muốn: tổng 12 triệu. Thực tế: tổng 0 đồng.' Người hỗ trợ làm lại đúng ba bước và thấy ngay mã khách bị trống.",
    },
    quiz: [
      Q(
        "Ba thứ nên có trong bản mô tả lỗi để người khác làm lại được là gì?",
        "Các bước đã làm, kết quả mong muốn và kết quả thực tế",
        [
          "Tên người gây lỗi và giờ xảy ra lỗi đó",
          "Phiên bản công cụ và giá tiền đã trả",
          "Ảnh chụp cả bàn làm việc của bạn",
        ],
        "Các bước cho người khác làm lại, còn hai kết quả cho họ thấy chỗ lệch giữa điều nên xảy ra và điều đã xảy ra. Tên người, giá tiền hay ảnh bàn làm việc không giúp tái hiện lỗi, và mức bực mình không thay cho mô tả cụ thể.",
      ),
      Q(
        "Khi chụp màn hình lỗi, nên chú ý điều gì?",
        "Chụp đủ cả dòng lỗi và phần màn hình trước đó, không cắt sát chữ",
        [
          "Cắt chỉ còn chữ 'Lỗi' cho gọn mắt",
          "Chụp thật nhỏ cho tệp nhẹ hơn nhiều",
          "Chỉ gửi ảnh, không ghi thêm chữ nào",
        ],
        "Ảnh cắt sát chữ làm mất chỗ xảy ra lỗi, ảnh nhỏ quá thì không đọc được số dòng hay tên trường. Ảnh giúp nhiều nhưng vẫn cần vài dòng chữ về các bước đã làm, vì ảnh không cho biết bạn bấm gì trước đó.",
      ),
      Q(
        "Bước 'mở bảng, chọn cột ngày, bấm Xuất' có ưu điểm gì so với 'tôi thử xuất thì lỗi'?",
        "Người khác làm theo đúng từng bước được",
        [
          "Nó ngắn hơn nên người nhận chắc chắn sẽ trả lời nhanh hơn rất nhiều",
          "Nó nghe chuyên môn hơn nên tạo ấn tượng bạn rành về kỹ thuật công cụ",
          "Nó cho phép người nhận đoán trước nguyên nhân mà không cần mở công cụ",
        ],
        "Cụ thể và theo thứ tự là thứ người nhận cần để tái hiện lỗi. Độ dài ngắn hay giọng chuyên môn không quyết định việc xử lý được, và người nhận vẫn cần thử mới biết nguyên nhân chứ không đoán từ xa.",
      ),
      Q(
        "Mô tả 'kết quả mong muốn' giúp người nhận ở điểm nào?",
        "Họ biết thế nào là đúng để thấy chỗ lệch",
        [
          "Họ có cớ để từ chối xử lý những lỗi chưa được ghi rõ kết quả",
          "Họ không cần đọc phần kết quả thực tế nữa vì đã có mong muốn",
          "Họ có thể tự sửa dữ liệu của bạn mà không cần hỏi lại bạn",
        ],
        "Nếu chỉ nói 'ra sai' thì 'đúng' là gì vẫn mơ hồ. Mong muốn và thực tế đứng cạnh nhau cho thấy độ lệch. Hai phần bổ sung cho nhau chứ không thay nhau, và kết quả mong muốn không cho phép ai sửa dữ liệu thay bạn.",
      ),
      Q(
        "Bạn nên xử lý thế nào với nguyên nhân mình đoán được?",
        "Ghi riêng là phỏng đoán của bạn, tách khỏi phần sự kiện",
        [
          "Bỏ hẳn, vì người đoán là người hiểu sai",
          "Viết như sự thật chắc chắn để người nhận tin ngay và đỡ tốn công hỏi",
          "Đưa lên đầu tin nhắn và xoá các bước để ngắn gọn cho người đọc",
        ],
        "Phỏng đoán có ích nếu được đánh dấu là đoán, vì người nhận biết đó là gợi ý chứ không phải sự kiện. Viết như chắc chắn dễ đưa họ đi sai, còn bỏ hết các bước thì họ không tái hiện được lỗi.",
      ),
    ],
    keyTakeaways: [
      "Ba dòng: các bước đã làm, kết quả mong muốn, kết quả thực tế.",
      "Chụp đủ dòng lỗi và phần xung quanh, không cắt sát chữ.",
      "Viết các bước theo thứ tự như khi dặn người lạ làm theo.",
      "Phỏng đoán nguyên nhân thì ghi riêng, đừng trộn với sự kiện.",
    ],
    practicePrompt: {
      question:
        "Lời báo nào giúp người hỗ trợ xử lý nhanh nhất?",
      options: [
        "Mở mẫu báo giá, chọn khách A, bấm Xuất. Mong tổng 12 triệu, thực tế 0 đồng",
        "Bảng báo giá hôm nay bị sai, anh xem giúp em với ạ",
        "Em nghĩ lỗi do phiên bản mới nên anh cài lại giúp em bản cũ",
        "Công cụ này lúc nào cũng trục trặc, mong phòng IT xem xét lại toàn bộ giúp em",
      ],
      correct: 0,
      explanation:
        "Lời báo đầu có bước, mong muốn và thực tế, nên người kia làm lại được trong một phút. Ba lời báo còn lại chỉ có cảm nhận, phỏng đoán hoặc phàn nàn chung, nên người nhận vẫn phải hỏi lại mọi thứ.",
    },
    summary: {
      keyIdea: "Một bản báo lỗi tốt cho phép người khác làm lại đúng lỗi của bạn.",
      formula: "Các bước đã làm + kết quả mong muốn + kết quả thực tế = lỗi tái hiện được.",
      commonMistake: "Nói 'không chạy được' rồi chờ người khác hỏi lại từng thứ.",
      action: "Viết ba dòng cho lần báo lỗi tiếp theo trước khi bấm gửi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một lỗi có thật bạn gặp gần đây hoặc một lỗi bạn tạo ra cố ý (ví dụ để trống một ô bắt buộc). Chụp màn hình lỗi, rồi viết ba dòng: các bước, kết quả mong muốn, kết quả thực tế. Nhờ một đồng nghiệp làm theo đúng ba dòng đó và xem họ có gặp cùng lỗi không.",
      secondary: "Nếu họ phải hỏi lại bạn điều gì, hãy thêm điều đó vào ba dòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Đồng nghiệp nhắn cho bạn: 'Không chạy được'. Bạn biết họ gặp vấn đề nhưng không biết bắt đầu từ đâu. Bài này dạy bạn viết (và đòi) ba dòng khiến lỗi trở thành thứ ai cũng làm lại được.",
      },
      {
        type: "feynman",
        title: "Báo lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn báo cho thợ sửa ống nước: 'nhà em bị rò nước'. Thợ sẽ hỏi rò ở đâu, lúc nào, nhỏ giọt hay chảy thành dòng. Nếu bạn nói sẵn các điều đó, họ tới là sửa được ngay.",
        columns: ["Điều thợ cần", "Báo cho thợ ống nước", "Báo lỗi công cụ"],
        rows: [
          ["Bạn làm gì", "Tôi vặn vòi bồn rửa chén", "Các bước đã làm theo thứ tự"],
          ["Mong thấy gì", "Nước chảy ra ở vòi", "Kết quả mong muốn"],
          ["Thực tế thấy gì", "Nước rỉ ở chỗ nối dưới bồn", "Kết quả thực tế, kèm ảnh lỗi"],
          ["Kết quả", "Thợ tới đúng chỗ, xử lý một lần", "Người nhận làm lại được, xử lý ngay"],
        ],
        oneLiner: "Nói rõ làm gì, mong gì, thấy gì: người nghe làm lại được là gần xong.",
      },
      { type: "heading", text: "Ba dòng nên viết" },
      {
        type: "list",
        items: [
          "Dòng 1 - Các bước: đánh số 1, 2, 3 theo đúng thứ tự bạn đã bấm.",
          "Dòng 2 - Kết quả mong muốn: bạn cho rằng lẽ ra phải thấy gì.",
          "Dòng 3 - Kết quả thực tế: bạn thấy gì, kèm nguyên văn thông báo lỗi.",
          "Kèm ảnh chụp đủ dòng lỗi, nhưng đừng để ảnh thay cho chữ.",
        ],
      },
      {
        type: "paragraph",
        text: "Ba dòng này dùng được cho cả đồng nghiệp lẫn AI. Khi bạn dán cho AI, các bước cho nó biết bối cảnh, mong muốn và thực tế cho nó thấy chỗ lệch. Không có chúng, AI sẽ đoán theo trường hợp phổ biến nhất chứ không theo trường hợp của bạn.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết lại thành ba dòng báo lỗi",
        task: "Đồng nghiệp nhắn 'không chạy được'. Bạn biết: mở mẫu báo giá, chọn khách Minh Phát, bấm Xuất, mong thấy tổng 12 triệu nhưng ra 0 đồng. Lắp prompt để AI viết bản báo lỗi ba dòng.",
        parts: [
          {
            id: "steps",
            label: "Các bước",
            options: [
              {
                text: "Bước 1: mở mẫu báo giá. Bước 2: chọn khách Minh Phát. Bước 3: bấm Xuất.",
                good: true,
                feedback: "Có thứ tự rõ ràng nên AI đưa được vào bản báo lỗi đúng như bạn làm.",
              },
              {
                text: "Tôi thử xuất báo giá.",
                feedback: "Thiếu bước chọn khách, AI sẽ điền bước cho đầy đủ theo trí tưởng tượng.",
              },
            ],
          },
          {
            id: "expected",
            label: "Mong muốn và thực tế",
            options: [
              {
                text: "Mong thấy tổng 12 triệu đồng, thực tế thấy 0 đồng.",
                good: true,
                feedback: "Hai con số cụ thể cho thấy độ lệch, AI không phải đoán sai đúng là gì.",
              },
              {
                text: "Kết quả bị sai.",
                feedback: "AI không biết sai theo hướng nào nên sẽ bịa một ví dụ cho nghe hợp lý.",
              },
            ],
          },
          {
            id: "form",
            label: "Khuôn dạng",
            options: [
              {
                text: "Viết đúng 3 dòng: Các bước, Mong muốn, Thực tế. Không thêm nguyên nhân tôi chưa biết.",
                good: true,
                feedback: "Khuôn cố định và cấm thêm nguyên nhân nên bản viết ra chỉ chứa sự kiện.",
              },
              {
                text: "Viết một bài báo cáo lỗi thật chuyên nghiệp.",
                feedback: "'Chuyên nghiệp' không đo được, AI viết dài và dễ thêm nguyên nhân tự chế.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["steps", "expected", "form"],
            text: "Các bước: 1) Mở mẫu báo giá. 2) Chọn khách Minh Phát. 3) Bấm Xuất.\nMong muốn: tổng báo giá là 12 triệu đồng.\nThực tế: tổng hiển thị 0 đồng.",
          },
          {
            requires: ["expected"],
            text: "Các bước: Xuất báo giá cho khách.\nMong muốn: 12 triệu đồng.\nThực tế: 0 đồng.\n\n(Đúng số nhưng thiếu bước chọn khách nên người nhận chưa làm lại chính xác được.)",
          },
          {
            text: "Kính gửi bộ phận hỗ trợ, chúng tôi gặp sự cố nghiêm trọng khi xuất báo giá cho khách hàng lớn, nhiều khả năng do phiên bản mới cập nhật tuần trước...\n\n(AI tự thêm 'khách hàng lớn' và 'phiên bản mới', những điều bạn chưa từng nói.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tin nhắn 'không chạy được'",
        start: "s1",
        nodes: {
          s1: {
            text: "Đồng nghiệp nhắn 'Chị ơi, không chạy được'. Bạn đang rảnh mười phút.",
            choices: [
              { label: "Trả lời 'em thử restart máy đi' rồi quay lại việc của mình", next: "bad_guess" },
              { label: "Hỏi lại ba điều: đã làm bước nào, mong thấy gì, thấy gì, kèm ảnh lỗi", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Đồng nghiệp restart máy, lỗi vẫn còn, và hai người mất thêm một buổi nhắn tin qua lại mà không ai biết lỗi ở đâu.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp gửi ảnh và ba dòng: mở báo giá, chọn khách Minh Phát, bấm Xuất, mong 12 triệu, thực tế 0 đồng.",
            choices: [
              { label: "Làm lại đúng ba bước trên máy bạn để xem có gặp cùng lỗi không", next: "good" },
              { label: "Đoán luôn là do mã khách rồi bảo họ xoá hết dữ liệu khách", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Đồng nghiệp xoá dữ liệu khách theo lời bạn, và nguyên nhân thật là một ô công thức bị lệch. Dữ liệu mất, lỗi vẫn còn.",
            ending: "bad",
          },
          good: {
            text: "Bạn làm lại và thấy cùng lỗi, rồi thấy ô công thức bị lệch. Bạn sửa trong năm phút và lưu ba dòng này làm mẫu báo lỗi của phòng.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Từ 'không chạy được' tới bản báo lỗi làm lại được",
        steps: [
          { label: "Dừng lại, giữ hiện trạng", detail: "Đừng thay đổi gì trước khi chụp và ghi, để lỗi còn nguyên." },
          { label: "Chụp đủ thông báo", detail: "Cả dòng lỗi và phần màn hình xung quanh, đọc được chữ khi phóng to." },
          { label: "Ghi các bước", detail: "Đánh số theo thứ tự bạn đã làm, không bỏ bước 'hiển nhiên'." },
          { label: "Ghi mong muốn và thực tế", detail: "Hai câu ngắn, nếu có con số thì nêu con số." },
          { label: "Nhờ người khác thử", detail: "Họ làm theo đúng chữ của bạn. Chỗ họ vướng là chỗ cần viết thêm." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba dòng: làm gì, mong gì, thấy gì. Người khác làm lại được là lỗi đã gần được xử lý.",
          "Bài sau: chấm điểm một bản báo lỗi 'nó hỏng rồi' xem thiếu gì.",
        ],
      },
    ],
  },
  {
    id: 2563,
    slug: "tim-thong-tin-thua-trong-mot-bao-cao-loi",
    title: "Chặng 58, Bài 4: Bản báo lỗi thiếu gì: chấm điểm một bản báo lỗi mẫu",
    subtitle: "Đọc bản 'nó hỏng rồi' bằng mắt người phải sửa: năm thứ họ sẽ phải hỏi lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi bạn đứng ở phía nhận (trưởng nhóm, người hỗ trợ, hay chính AI), bạn sẽ gặp vô số bản báo lỗi kiểu 'nó hỏng rồi'. Biết đọc ra chỗ thiếu giúp bạn hỏi đúng một lần thay vì năm lần, và chính bạn viết báo lỗi cũng sót ít hơn.",
    openingQuestion:
      "Bạn nhận tin: 'Nó hỏng rồi, mai cần gấp'. Người nhận sẽ phải hỏi lại điều gì đầu tiên?",
    openingOptions: [
      "Cái gì hỏng, bạn đã làm gì và thấy thông báo gì",
      "Bạn đã ăn sáng chưa và có bị căng thẳng vì hạn chót không",
      "Bạn dùng công cụ này từ khi nào và đã trả bao nhiêu tiền cho nó",
      "Bạn tự sửa được không",
    ],
    correctOption: 0,
    explanation:
      "'Nó hỏng' không nói nó là cái gì, hỏng ở bước nào, hay thông báo ra sao. Ba thứ đó là thứ tối thiểu để bắt đầu tìm lỗi. Hỏi chuyện sức khoẻ hay chi phí không đưa người nhận tới gần nguyên nhân hơn, và hỏi 'có thể tự sửa được không' chỉ đẩy việc lại cho người báo mà chưa cho thêm thông tin gì.",
    diagram: [
      { label: "Đọc bản báo lỗi với tư cách người phải sửa", arrow: true },
      { label: "Gạch chỗ không kiểm được hoặc không làm lại được", arrow: true },
      { label: "Liệt kê những thứ phải hỏi lại, ưu tiên theo mức cần thiết", arrow: true },
      { label: "Hỏi một lần đủ các thứ, không hỏi rải rác" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm nhận năm báo lỗi trong tuần, bốn cái chỉ ghi 'hỏng' hoặc 'không được'. Chị lập sẵn một mẫu hỏi lại gồm năm câu: cái gì, bước nào, thấy gì, mong gì, từ khi nào. Sau hai tuần, các báo lỗi đến đã kèm sẵn câu trả lời, và thời gian xử lý trung bình mỗi việc ngắn đi rõ rệt.",
    },
    quiz: [
      Q(
        "Bản báo 'nó hỏng rồi' thiếu tin gì quan trọng nhất?",
        "Nó là cái gì, bạn làm gì và thấy gì khi hỏng",
        [
          "Tên của người gửi báo lỗi và chức vụ của họ trong công ty",
          "Giờ gửi báo lỗi và ngày tháng chính xác đến từng giây một",
          "Số lượng người khác cũng đang mong lỗi này được sửa xong",
        ],
        "Đối tượng, bước đã làm và kết quả thấy là ba thứ tối thiểu để tái hiện lỗi. Tên người gửi người nhận đã biết qua kênh gửi, giờ gửi thì hệ thống đã ghi, và số người mong sửa chỉ ảnh hưởng độ ưu tiên chứ không giúp tìm nguyên nhân.",
      ),
      Q(
        "Báo lỗi ghi 'tải file lên rồi nó lỗi'. Câu nào nên hỏi lại đầu tiên?",
        "Tải file nào, lên đâu và thông báo lỗi ghi gì",
        [
          "Bạn dùng công cụ mấy lần rồi",
          "Bạn có hài lòng với tốc độ mạng ở văn phòng mình hiện nay không",
          "Bạn đã thử gọi cho phòng hành chính để xin đổi máy tính khác chưa",
        ],
        "Câu hỏi nên nhắm vào chỗ khuyết trong bản báo: đối tượng, đích và nội dung lỗi. Tần suất dùng, mức hài lòng hay đổi máy không cho người nhận dấu hiệu nào về lỗi cụ thể này.",
      ),
      Q(
        "Vì sao nên hỏi một lần đủ các thứ còn thiếu thay vì hỏi từng câu?",
        "Mỗi lượt hỏi đáp chờ nửa ngày vì hai bên đều bận",
        [
          "Vì người báo sẽ tự sửa lỗi nhanh hơn",
          "Vì hỏi nhiều câu một lượt buộc hệ thống ghi nhận lỗi là khẩn cấp",
          "Vì từng câu hỏi lẻ sẽ bị bộ phận hỗ trợ tự động coi là spam",
        ],
        "Thời gian tốn nằm ở những lần chờ trả lời chứ không phải ở việc viết câu hỏi. Hỏi đủ một lần rút số lượt. Người báo không 'tự sửa' vì bị hỏi dồn, hệ thống không đánh dấu khẩn theo số câu hỏi, và câu hỏi lẻ không bị coi là spam.",
      ),
      Q(
        "Bản báo có 'lỗi xảy ra từ khi cập nhật tuần trước'. Nên xem thông tin này thế nào?",
        "Một manh mối cần kiểm, vì có thể là trùng hợp",
        [
          "Sự thật đã rõ nên cứ gỡ cập nhật là xong",
          "Một chi tiết vô nghĩa nên xoá khỏi bản báo để người nhận đọc ngắn",
          "Bằng chứng duy nhất cần thiết để kết luận lỗi do nhà cung cấp gây ra",
        ],
        "Thời điểm lỗi bắt đầu là manh mối có giá trị nhưng chưa chứng minh nguyên nhân: hai việc xảy ra cùng lúc chưa chắc liên quan. Gỡ cập nhật ngay là hành động vội, còn xoá nó đi thì mất đầu mối đáng kiểm.",
      ),
      Q(
        "Bạn nên ưu tiên xử lý bản báo lỗi nào trước khi chỉ có thời gian cho một?",
        "Bản có các bước và thông báo rõ, làm lại được ngay",
        [
          "Bản dài nhất, vì người viết tốn công",
          "Bản đến đầu tiên trong tuần, bất kể nó đã mô tả đủ hay chưa đủ",
          "Bản có nhiều chữ 'gấp' nhất, vì chữ gấp cho thấy mức độ nghiêm trọng",
        ],
        "Bản làm lại được cho phép bắt đầu sửa ngay và có kết quả nhanh. Độ dài không đo chất lượng, thứ tự đến không đo độ rõ, và chữ 'gấp' lặp lại không cho biết lỗi nghiêm trọng hay chỉ là lo lắng.",
      ),
    ],
    keyTakeaways: [
      "'Nó hỏng rồi' thiếu: là cái gì, làm gì, thấy gì, mong gì.",
      "Hỏi một lần đủ các thứ còn thiếu, không hỏi rải rác.",
      "Thời điểm lỗi bắt đầu là manh mối, chưa phải nguyên nhân.",
      "Ưu tiên bản báo làm lại được ngay.",
    ],
    practicePrompt: {
      question:
        "Báo lỗi có câu 'lỗi do bản cập nhật tuần trước, phòng IT gỡ đi giúp em'. Cách đọc nào đúng?",
      options: [
        "Xem đây là phỏng đoán, tách ra và hỏi các bước cùng thông báo lỗi",
        "Gỡ bản cập nhật ngay vì người báo chắc chắn đã biết nguyên nhân",
        "Bỏ qua cả bản báo vì người báo tự kết luận nên chắc không tin được",
        "Chuyển cho nhà cung cấp công cụ mà không cần xác minh gì thêm",
      ],
      correct: 0,
      explanation:
        "Người báo có thể đúng, nhưng kết luận chưa kiểm vẫn chỉ là phỏng đoán. Hỏi các bước và thông báo giúp kiểm điều đó. Gỡ ngay có thể làm mất tính năng người khác đang dùng, bỏ cả bản báo thì mất thông tin, còn chuyển đi chưa xác minh thì đẩy việc sang người khác một cách vội vàng.",
    },
    summary: {
      keyIdea: "Đọc báo lỗi bằng mắt người sửa để thấy chỗ thiếu, và hỏi đủ một lần.",
      formula: "Là cái gì + bước đã làm + thông báo + mong muốn + từ khi nào = bản báo đủ dùng.",
      commonMistake: "Hỏi từng câu một, mỗi lần chờ nửa ngày.",
      action: "Lập mẫu năm câu hỏi lại và dán vào ghi chú.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm 2 bản báo lỗi thật (email, chat nhờ hỗ trợ, hoặc do chính bạn từng viết). Với mỗi bản, gạch những chỗ thiếu trong năm mục: là cái gì, bước nào, thấy gì, mong gì, từ khi nào. Viết lại một bản cho đủ rồi nhờ đồng nghiệp đọc thử xem còn thiếu gì.",
      secondary: "Lưu năm mục này thành mẫu trong ghi chú để dùng cho lần báo lỗi sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước bạn viết ba dòng báo lỗi. Bài này đổi chỗ: bạn là người nhận, đọc một bản 'nó hỏng rồi' và chỉ ra người sửa sẽ phải hỏi lại điều gì.",
      },
      {
        type: "feynman",
        title: "Chấm bản báo lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn gọi taxi và chỉ nói 'đón tôi đi'. Tài xế sẽ hỏi bạn ở đâu, đi đâu, mấy người. Bản báo lỗi cũng vậy: thiếu gì thì người nhận phải hỏi cái đó.",
        columns: ["Điều cần biết", "Gọi taxi", "Báo lỗi"],
        rows: [
          ["Đối tượng", "Tôi đang đứng ở đâu", "Lỗi xảy ra ở công cụ hoặc tệp nào"],
          ["Bước đã làm", "Đi từ đâu tới đâu", "Các bước bạn đã bấm theo thứ tự"],
          ["Điều thấy", "Đứng trước toà nhà nào", "Nguyên văn thông báo lỗi"],
          ["Mong muốn", "Muốn tới đâu, mấy giờ", "Kết quả bạn đã kỳ vọng"],
        ],
        oneLiner: "Thiếu điều gì thì người nhận phải hỏi điều đó: đọc báo lỗi là tìm chỗ thiếu.",
      },
      { type: "heading", text: "Năm thứ thường thiếu" },
      {
        type: "list",
        items: [
          "Là cái gì: công cụ, tệp hoặc màn hình nào bị lỗi.",
          "Bước nào: bạn đã bấm và nhập gì trước khi lỗi xuất hiện.",
          "Thấy gì: nguyên văn thông báo hoặc ảnh chụp.",
          "Mong gì: kết quả lẽ ra phải có.",
          "Từ khi nào: lỗi có từ bao giờ, có do thay đổi nào gần đây không.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản báo lỗi 'nó hỏng rồi'",
        task: "Đọc bản báo lỗi dưới đây. Mỗi câu trông hợp lý, nhưng có câu chỉ là phỏng đoán chưa kiểm hoặc không ai làm lại được. Đánh dấu các câu đó.",
        segments: [
          { text: "Chào anh, em là Hà bên phòng kinh doanh." },
          { text: "Công cụ làm báo giá hỏng rồi, sáng mai em cần gấp." },
          { text: "Em mở mẫu, chọn khách rồi bấm Xuất thì ra tổng bằng 0 đồng.", },
          {
            text: "Lỗi này do bản cập nhật tuần trước, chắc chắn 100%.",
            error: "Đây là phỏng đoán chưa kiểm: người báo chỉ thấy lỗi và cập nhật cùng thời điểm, chưa chứng minh liên quan. Cần tách khỏi sự kiện.",
          },
          {
            text: "Bảng này em làm đúng theo mẫu nên không thể do em nhập sai.",
            error: "Khẳng định không căn cứ: chưa ai kiểm dữ liệu nhập. Dữ liệu thiếu một ô vẫn có thể gây đúng lỗi này, nên không được loại trừ trước khi kiểm.",
          },
          {
            text: "Mọi người trong phòng đều bị lỗi này suốt một tháng qua.",
            error: "Không có căn cứ trong bản báo, và mâu thuẫn với chuyện chỉ vừa phát hiện hôm nay. Cần hỏi lại và xác nhận với từng người.",
          },
          { text: "Em đính kèm ảnh chụp màn hình lỗi ở dưới." },
        ],
      },
      {
        type: "callout",
        label: "Sự kiện và phỏng đoán",
        text: "Sự kiện là thứ bạn nhìn thấy và kiểm lại được: 'ra tổng 0 đồng'. Phỏng đoán là lời giải thích bạn nghĩ ra: 'do bản cập nhật'. Khi nhận hay viết báo lỗi, hãy tách hai loại đó, vì phỏng đoán chưa kiểm dễ kéo cả nhóm đi sai hướng.",
      },
      {
        type: "scenario",
        title: "Trả lời một bản báo 'nó hỏng rồi'",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn là trưởng nhóm, nhận bản báo: 'Nó hỏng rồi, sáng mai em cần gấp'. Bạn phải quyết cách phản hồi.",
            choices: [
              { label: "Hỏi gộp một lần: cái gì, bước nào, thấy gì, mong gì, từ khi nào", next: "s2" },
              { label: "Trả lời 'anh xem rồi báo lại' và chờ có thời gian mới mở ra xem", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Tới chiều bạn mở ra và vẫn không biết gì để xử lý. Khi hỏi lại thì người báo đã ra ngoài gặp khách tới tối.",
            ending: "bad",
          },
          s2: {
            text: "Người báo trả lời kèm ảnh và các bước. Bạn thấy cả câu 'chắc chắn do bản cập nhật tuần trước'.",
            choices: [
              { label: "Làm lại theo các bước trước và coi câu về bản cập nhật là giả thuyết để kiểm sau", next: "good" },
              { label: "Gỡ ngay bản cập nhật vì người báo đã khẳng định chắc chắn", next: "bad_rollback" },
            ],
          },
          bad_rollback: {
            text: "Gỡ cập nhật làm mất tính năng mới của cả phòng mà lỗi vẫn còn, vì nguyên nhân thật là một ô mã khách bị trống.",
            ending: "bad",
          },
          good: {
            text: "Bạn làm lại, thấy ô mã khách trống và sửa trong năm phút. Bạn lưu năm câu hỏi thành mẫu cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Đọc một bản báo lỗi như người sửa",
        steps: [
          { label: "Đọc hết một lượt", detail: "Chưa kết luận gì. Chỉ đánh dấu điều đã biết." },
          { label: "Tách sự kiện và phỏng đoán", detail: "Sự kiện kiểm được, phỏng đoán cần thử." },
          { label: "Gạch chỗ thiếu trong năm mục", detail: "Là cái gì, bước nào, thấy gì, mong gì, từ khi nào." },
          { label: "Hỏi một lần đủ các thứ", detail: "Gộp vào một tin nhắn để chỉ tốn một lượt chờ." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Đọc báo lỗi là tìm chỗ thiếu và tách phỏng đoán khỏi sự kiện.",
          "Bài sau: dự án nhỏ, viết bản báo lỗi một trang cho một lỗi thật của bạn.",
        ],
      },
    ],
  },
  {
    id: 2564,
    slug: "du-an-nho-viet-bao-cao-loi-mot-trang-cho-loi-that",
    title: "Chặng 58, Bài 5: Dự án nhỏ: một bản báo lỗi mà người khác sửa được ngay",
    subtitle: "Chọn một lỗi thật của bạn, viết bản báo lỗi đầy đủ để đưa cho AI hoặc người hỗ trợ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: đọc lỗi, phân nhóm, viết ba dòng, chấm bản báo. Bài này ghép lại thành một sản phẩm dùng được: một bản báo lỗi một trang cho lỗi thật của bạn. Có sản phẩm cụ thể trong tay, bạn dùng ngay tuần này thay vì chỉ nhớ lý thuyết.",
    openingQuestion:
      "Bạn sắp viết bản báo cho một lỗi thật của mình. Thứ tự hợp lý nhất là gì?",
    openingOptions: [
      "Chép lỗi nguyên văn, ghi các bước và kết quả, rồi mới phân nhóm lỗi",
      "Nhờ AI đoán nguyên nhân rồi viết thành lời khẳng định ở đầu bản báo",
      "Viết phần cảm xúc và mức khẩn cấp trước, còn chi tiết bổ sung sau",
      "Đợi lỗi xảy ra thêm vài lần để khỏi phải viết nhiều lần bản báo",
    ],
    correctOption: 0,
    explanation:
      "Nguyên văn lỗi và các bước là sự kiện, nên đi trước; phân nhóm dựa trên chúng. Nhờ AI đoán nguyên nhân rồi khẳng định ngay sẽ đặt phỏng đoán lên đầu, cảm xúc và mức khẩn cấp không giúp tái hiện lỗi, còn đợi thêm lần lỗi thì bạn có thể quên các bước và mất nguyên văn.",
    diagram: [
      { label: "Chọn một lỗi có thật và còn tái hiện được", arrow: true },
      { label: "Chép nguyên văn, ghi các bước và kết quả", arrow: true },
      { label: "Phân nhóm: dữ liệu, quyền hay dịch vụ", arrow: true },
      { label: "Nhờ AI sắp thành một trang, bạn kiểm rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự hay bị lỗi khi nhập danh sách nghỉ phép vào công cụ quản lý. Cô chọn lần lỗi gần nhất, viết bản báo một trang gồm các bước, ảnh lỗi và nhóm lỗi nghi ngờ là dữ liệu. Người hỗ trợ mở dòng ghi trong bản báo, thấy ô tên có dấu cách thừa, và hướng dẫn cô cách kiểm cột tên trước khi nhập.",
    },
    quiz: [
      Q(
        "Khi chọn lỗi để viết bản báo, tiêu chí nào quan trọng nhất?",
        "Lỗi có thật, còn tái hiện được và bạn còn nhớ các bước",
        [
          "Lỗi nghe to tát nhất trong tuần",
          "Lỗi cũ nhất trong sổ của phòng",
          "Lỗi bạn chưa chắc có xảy ra thật",
        ],
        "Lỗi tái hiện được cho phép người khác làm lại và kiểm. Lỗi nghe to tát hay lỗi cũ chưa chắc còn tái hiện, còn lỗi bạn không chắc có xảy ra thì không viết được các bước cụ thể.",
      ),
      Q(
        "Bản báo một trang nên chứa phần nào?",
        "Nguyên văn lỗi, các bước, mong muốn, thực tế và nhóm lỗi nghi ngờ",
        [
          "Lịch sử email trao đổi về công cụ",
          "Bảng so sánh công cụ này với ba công cụ cạnh tranh trên thị trường",
          "Ý kiến cá nhân về chất lượng nhà cung cấp và các lần họ làm bạn thất vọng",
        ],
        "Một trang đủ dùng khi chỉ chứa thứ giúp tái hiện và định hướng lỗi. Lịch sử email, so sánh công cụ và ý kiến về nhà cung cấp làm loãng bản báo và không giúp người nhận tìm lỗi nhanh hơn.",
      ),
      Q(
        "Bạn dán bản báo cho AI để nhờ gợi ý. Điều nào nên làm trước khi dán?",
        "Xoá thông tin nhạy cảm như mật khẩu và dữ liệu khách",
        [
          "Dịch bản báo sang tiếng Anh cho AI",
          "Thêm lời khen AI cho nó nhiệt tình",
          "Xoá hết các bước cho bản báo ngắn",
        ],
        "Dán vào ô chat là gửi dữ liệu ra ngoài nên mật khẩu, địa chỉ, dữ liệu khách phải được ẩn đi. AI hiểu tiếng Việt nên không cần dịch, lời khen không đổi chất lượng trả lời, và xoá bước làm mất thứ AI cần.",
      ),
      Q(
        "AI đề xuất nguyên nhân cho lỗi của bạn. Bạn nên coi nó là gì?",
        "Một giả thuyết cần thử, chưa phải kết luận",
        [
          "Kết luận cuối cùng vì AI đã đọc rất nhiều tài liệu kỹ thuật",
          "Một nhận xét không có giá trị vì AI không thấy máy bạn thật",
          "Một mệnh lệnh phải làm theo ngay để khỏi mất thời gian thử",
        ],
        "AI có thể đưa ra gợi ý hữu ích nhưng không nhìn thấy dữ liệu và máy của bạn, nên gợi ý là giả thuyết để kiểm. Coi là kết luận thì dễ sửa sai chỗ, coi là vô giá trị thì bỏ phí một hướng thử, còn coi là mệnh lệnh thì có thể làm hỏng thêm.",
      ),
      Q(
        "Sau khi gửi bản báo, việc nào giúp bạn nhất cho lần sau?",
        "Lưu bản báo làm mẫu và ghi kết quả xử lý ở cuối",
        [
          "Xoá bản báo đi cho gọn chỗ",
          "Gửi lại bản đó mỗi ngày cho tới khi xong",
          "Chờ người hỗ trợ tự liên hệ lại",
        ],
        "Bản báo có kết quả xử lý là tài liệu để tra khi lỗi tương tự xảy ra. Xoá thì mất kinh nghiệm, gửi lại mỗi ngày làm phiền người nhận, và không theo dõi thì bạn không biết lỗi đã được xử lý hay chưa.",
      ),
    ],
    keyTakeaways: [
      "Chọn lỗi có thật và còn tái hiện được.",
      "Bản báo một trang: nguyên văn, các bước, mong muốn, thực tế, nhóm lỗi nghi ngờ.",
      "Xoá mật khẩu, địa chỉ, dữ liệu khách trước khi dán cho AI.",
      "Lưu bản báo và kết quả để dùng làm mẫu lần sau.",
    ],
    practicePrompt: {
      question:
        "Bản báo của bạn có dòng 'Mật khẩu của em là ...'. Trước khi dán cho AI bạn nên làm gì?",
      options: [
        "Xoá mật khẩu và đổi mật khẩu nếu đã lỡ dán ở đâu khác",
        "Giữ lại để AI biết chính xác tài khoản nào đang bị lỗi",
        "Đổi sang một chữ viết tắt dễ đoán để AI vẫn hiểu được",
        "Gửi riêng mật khẩu cho AI ở một tin nhắn khác cho an toàn",
      ],
      correct: 0,
      explanation:
        "Mật khẩu không bao giờ cần cho việc phân tích lỗi, và dán vào công cụ ngoài công ty là đưa nó ra khỏi tầm kiểm soát. Giữ lại hay tách sang tin nhắn khác vẫn gửi nó đi, và chữ viết tắt dễ đoán không an toàn hơn.",
    },
    summary: {
      keyIdea: "Ghép các mảnh đã học thành một bản báo lỗi một trang dùng được ngay.",
      formula: "Nguyên văn + các bước + mong muốn + thực tế + nhóm lỗi nghi ngờ - thông tin nhạy cảm.",
      commonMistake: "Dán cả mật khẩu hay dữ liệu khách vào AI cho đủ ngữ cảnh.",
      action: "Viết bản báo cho một lỗi thật trong 20 phút và lưu làm mẫu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một lỗi có thật bạn gặp trong 2 tuần qua (hoặc tạo lại một lỗi cũ). Viết bản báo một trang gồm: nguyên văn lỗi, các bước, mong muốn, thực tế, nhóm lỗi nghi ngờ (dữ liệu, quyền, dịch vụ). Xoá mật khẩu và dữ liệu khách rồi nhờ AI sắp lại cho gọn. Lưu bản báo làm mẫu để dùng cho lần sau.",
      secondary: "Gửi bản này cho một đồng nghiệp và hỏi xem họ có làm lại được lỗi không.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài dự án của phần đầu chặng. Bạn không học thêm khái niệm mới: bạn chọn một lỗi có thật và biến các mảnh đã học thành một bản báo một trang.",
      },
      {
        type: "feynman",
        title: "Bản báo lỗi một trang đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn điền phiếu khám bệnh: khai đã thấy gì, từ khi nào, đã làm gì. Bác sĩ đọc một trang và biết phải hỏi thêm gì. Bản báo lỗi cũng là một phiếu như vậy, chỉ khác là bạn khai cho người sửa công cụ.",
        columns: ["Mục trong phiếu", "Phiếu khám", "Bản báo lỗi"],
        rows: [
          ["Triệu chứng", "Đau ở đâu, đau thế nào", "Nguyên văn thông báo lỗi và ảnh chụp"],
          ["Diễn biến", "Bắt đầu từ khi nào, sau việc gì", "Các bước bạn đã làm theo thứ tự"],
          ["Điều bình thường", "Bình thường thì không đau", "Kết quả mong muốn"],
          ["Nghi ngờ", "Bạn nghĩ có thể do đâu", "Nhóm lỗi nghi ngờ, ghi rõ là phỏng đoán"],
        ],
        oneLiner: "Bản báo lỗi là phiếu khai bệnh: khai đủ, rõ, đúng sự thật, người sửa mới làm nhanh.",
      },
      { type: "heading", text: "Cấu trúc một trang" },
      {
        type: "list",
        items: [
          "Tiêu đề: một câu nêu công cụ và lỗi, ví dụ 'Xuất báo giá ra tổng 0 đồng'.",
          "Nguyên văn lỗi: chép hoặc dán, kèm ảnh chụp đủ dòng.",
          "Các bước: đánh số 1, 2, 3 theo thứ tự đã làm.",
          "Mong muốn và thực tế: mỗi mục một câu.",
          "Nhóm lỗi nghi ngờ: dữ liệu, quyền hay dịch vụ, ghi rõ là phỏng đoán.",
        ],
      },
      {
        type: "callout",
        label: "Trước khi dán cho AI",
        text: "Đọc lại bản báo và xoá mật khẩu, mã xác thực, địa chỉ nhà, số điện thoại, tên và dữ liệu của khách hàng. Dùng ký hiệu thay thế như [KHÁCH A]. Dán vào ô chat là gửi ra ngoài công ty, và nếu không chắc được phép hay không, hỏi bộ phận IT hoặc pháp chế trước.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI sắp xếp bản báo lỗi một trang",
        task: "Bạn có ghi chú lộn xộn về lỗi 'xuất báo giá ra tổng 0 đồng'. Lắp prompt để AI sắp thành bản báo một trang mà không thêm điều bạn chưa nói.",
        parts: [
          {
            id: "data",
            label: "Nội dung đưa cho AI",
            options: [
              {
                text: "Ghi chú của tôi: mở mẫu, chọn khách [KHÁCH A], bấm Xuất, mong 12 triệu, thực tế 0 đồng. Lỗi ghi: 'Không tính được tổng'.",
                good: true,
                feedback: "Có bước, hai kết quả và nguyên văn lỗi; tên khách đã được thay bằng ký hiệu.",
              },
              {
                text: "Ghi chú kèm tên thật, số điện thoại và mật khẩu đăng nhập của tôi.",
                feedback: "Đưa dữ liệu nhạy cảm ra ngoài công ty mà AI không cần tới để sắp xếp bản báo.",
              },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc",
            options: [
              {
                text: "Chỉ dùng thông tin tôi đưa. Chỗ thiếu thì ghi [CẦN BỔ SUNG], không tự thêm.",
                good: true,
                feedback: "Chỗ trống lộ ra điều bạn cần tự bổ sung thay vì bị AI bịa cho đầy.",
              },
              {
                text: "Viết cho đầy đủ và thuyết phục, thiếu gì thì tự suy ra.",
                feedback: "AI sẽ tự suy ra nguyên nhân, phiên bản hoặc thời điểm không hề có trong ghi chú.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              {
                text: "Một trang với 5 mục: Tiêu đề, Nguyên văn lỗi, Các bước, Mong muốn và thực tế, Nhóm lỗi nghi ngờ.",
                good: true,
                feedback: "Khuôn rõ nên bạn đối chiếu được từng mục với ghi chú gốc.",
              },
              {
                text: "Viết thành một đoạn văn dài kể lại câu chuyện.",
                feedback: "Đoạn văn dài khó kiểm từng bước và người nhận khó làm theo.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "rule", "format"],
            text: "Tiêu đề: Xuất báo giá ra tổng 0 đồng\nNguyên văn lỗi: 'Không tính được tổng'\nCác bước: 1) Mở mẫu báo giá. 2) Chọn khách [KHÁCH A]. 3) Bấm Xuất.\nMong muốn / Thực tế: mong tổng 12 triệu đồng / thực tế 0 đồng.\nNhóm lỗi nghi ngờ: [CẦN BỔ SUNG]",
          },
          {
            requires: ["data"],
            text: "Tiêu đề: Lỗi nghiêm trọng khi xuất báo giá\nCác bước: mở mẫu, chọn khách, bấm Xuất.\nNguyên nhân có thể: cập nhật phần mềm gần đây.\n\n(Đủ bước nhưng AI tự thêm 'nghiêm trọng' và nguyên nhân 'cập nhật phần mềm' bạn chưa từng nói.)",
          },
          {
            text: "Kính gửi bộ phận hỗ trợ, tôi tên là Hà, số điện thoại 09xx... Tôi nhập mật khẩu đúng nhưng hệ thống vẫn báo lỗi nên chắc chắn đã bị lộ dữ liệu...\n\n(Nội dung nhạy cảm bị lộ ra ngoài và AI tự kết luận 'lộ dữ liệu' không có căn cứ.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Gửi bản báo lỗi đi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản báo của bạn đã xong, nhưng còn dòng 'Tài khoản: ha.kd@... mật khẩu: ...' mà bạn dán từ lúc thử đăng nhập.",
            choices: [
              { label: "Dán nguyên bản cho AI vì nó cần biết tài khoản nào", next: "bad_leak" },
              { label: "Xoá tài khoản và mật khẩu, thay tên khách bằng ký hiệu rồi mới dán", next: "s2" },
            ],
          },
          bad_leak: {
            text: "Mật khẩu đã nằm ở công cụ ngoài công ty. Phòng IT yêu cầu bạn đổi mật khẩu và báo cáo sự cố, mất gần một buổi.",
            ending: "bad",
          },
          s2: {
            text: "AI sắp lại bản báo gọn và gợi ý nguyên nhân có thể là ô mã khách bị trống.",
            choices: [
              { label: "Coi đó là giả thuyết: kiểm ô mã khách rồi mới kết luận", next: "good" },
              { label: "Gửi người hỗ trợ kèm câu 'nguyên nhân chắc chắn là mã khách bị trống'", next: "bad_claim" },
            ],
          },
          bad_claim: {
            text: "Nguyên nhân thật là công thức bị lệch. Người hỗ trợ tin lời bạn, sửa sai chỗ và mất thêm một ngày.",
            ending: "bad",
          },
          good: {
            text: "Bạn kiểm ô mã khách, thấy nó chỉ là dấu hiệu phụ của công thức lệch. Bạn sửa công thức, ghi kết quả vào bản báo và lưu làm mẫu.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Quy trình viết bản báo lỗi một trang",
        steps: [
          { label: "Chọn lỗi thật", detail: "Lỗi còn tái hiện được và bạn còn nhớ các bước." },
          { label: "Chép sự kiện", detail: "Nguyên văn lỗi, ảnh chụp, các bước, mong muốn, thực tế." },
          { label: "Xoá thông tin nhạy cảm", detail: "Mật khẩu, địa chỉ, dữ liệu khách. Thay bằng ký hiệu." },
          { label: "Nhờ AI sắp thành một trang", detail: "Cho nó dùng chỉ thông tin bạn đưa, chỗ thiếu ghi [CẦN BỔ SUNG]." },
          { label: "Kiểm rồi gửi", detail: "So từng mục với ghi chú gốc, tách phỏng đoán khỏi sự kiện, lưu làm mẫu." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Một bản báo một trang: sự kiện rõ, phỏng đoán tách riêng, không có dữ liệu nhạy cảm.",
          "Phần sau: hỏi AI đúng cách khi dán lỗi, giải thích trước rồi mới xin cách sửa.",
        ],
      },
    ],
  },
];
