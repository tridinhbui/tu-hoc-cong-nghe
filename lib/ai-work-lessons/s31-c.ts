import type { Lesson } from "../lesson-types";

// Chặng 31, bài 11-15. Giáo trình: scripts/curriculum/stage-31.json.
// Nội dung dạy khái niệm bền (giao việc, đối chiếu hồ sơ, không tin máy dò), không nêu nút bấm hay giá của công cụ nào.
export const S31_C_LESSONS: Lesson[] = [
  {
    id: 2030,
    slug: "nhan-xet-ai-viet-cho-hoc-sinh-dung-hay-sai-giong",
    title: "Chặng 31, Bài 11: Nhận xét do AI viết: khi nào nghe đúng mà sai với em này",
    subtitle: "Áo may sẵn vừa với nhiều người, nhưng chưa chắc vừa với em đứng trước mặt bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối kỳ bạn phải viết nhận xét cho cả lớp, và AI cho ra những câu mượt chỉ trong vài giây. Nhưng có một em vừa tụt điểm mà nhận xét mẫu vẫn khen 'tiến bộ', phụ huynh đọc là thấy lệch ngay. Bạn cần một thói quen soát nhận xét theo hồ sơ thật của từng em trước khi ký.",
    openingQuestion:
      "AI viết cho em Nam nhận xét: 'Em tiến bộ rõ rệt, tiếp tục phát huy.' Trong sổ điểm, Nam vừa tụt từ 7,5 xuống 5,5. Bạn nên làm gì?",
    openingOptions: [
      "Đối chiếu từng ý với sổ điểm và ghi chú về Nam rồi sửa cho khớp",
      "Giữ nguyên vì nhận xét tích cực thì em nào đọc cũng vui",
      "Nhờ AI viết lại cho 'hay hơn' mà không cần đưa thêm thông tin gì cho nó",
      "Xoá hết và dùng lại nhận xét cũ của em ở kỳ trước cho nhanh",
    ],
    correctOption: 0,
    explanation:
      "AI không nhìn thấy sổ điểm của Nam nên nó viết câu hợp với đa số học sinh, và câu đó sai với riêng em này. Chỉ bạn có hồ sơ thật để so từng ý. Giữ nguyên chỉ vì câu vui là đánh đổi sự thật lấy cảm giác dễ chịu. Bảo AI viết lại 'hay hơn' mà không thêm thông tin thì nó vẫn đoán. Nhận xét kỳ trước thì có thể đã lỗi thời.",
    diagram: [
      { label: "Lấy nhận xét mẫu AI nháp cho một em", arrow: true },
      { label: "Mở hồ sơ thật: điểm, ghi chú, chuyện đã xảy ra", arrow: true },
      { label: "Gạch những câu khớp mẫu chung mà không khớp em này", arrow: true },
      { label: "Sửa bằng một chi tiết thật rồi mới ký" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Hạnh nhờ AI nháp nhận xét cho 40 em. Khi soát, cô thấy câu 'chăm chỉ, hoàn thành bài đầy đủ' xuất hiện ở em vốn hay nộp muộn. Cô thay bằng một chi tiết thật: 'Em làm rất tốt bài thảo luận nhóm tuần trước, nhưng ba bài về nhà còn nộp muộn.' Câu mới ngắn hơn, đúng hơn và em đọc xong biết mình cần sửa gì.",
    },
    quiz: [
      {
        question: "Nhận xét mẫu khen 'tiến bộ' cho em vừa tụt từ 7,5 xuống 5,5. Vấn đề chính là gì?",
        options: [
          "Câu hợp với đa số nhưng không dựa trên hồ sơ của em này",
          "Câu quá ngắn nên em không biết làm gì tiếp",
          "Câu dùng từ chưa đủ trang trọng cho một văn bản gửi phụ huynh",
          "Câu chưa nêu đủ tên môn học nên có thể bị hiểu nhầm sang môn khác",
        ],
        correct: 0,
        explanation:
          "AI viết theo mẫu phổ biến của một lời nhận xét cuối kỳ, không theo sổ điểm của em. Độ dài hay độ trang trọng không phải gốc của lỗi này, và việc thiếu tên môn học chỉ là chi tiết nhỏ. Điều làm người đọc thấy sai là một câu khen không khớp với con số họ đã biết.",
      },
      {
        question: "Cách nào nhanh nhất để nhận xét nghe đúng với riêng một em?",
        options: [
          "Thêm một chi tiết thật từ hồ sơ hoặc buổi học",
          "Thêm tính từ khen thật mạnh cho em vui",
          "Chép nhận xét của em có điểm gần nhất rồi đổi tên cho phù hợp",
          "Cho AI viết lại thêm ba lần rồi chọn bản nghe hay nhất trong bốn bản",
        ],
        correct: 0,
        explanation:
          "Một chi tiết thật như bài nào làm tốt, buổi nào vắng, làm nhận xét gắn với em ngay. Thêm tính từ mạnh chỉ làm câu chung chung nghe to hơn. Chép của em điểm gần nhất là cùng lỗi mẫu chung. Viết lại nhiều lần vẫn để AI đoán vì nó không có hồ sơ.",
      },
      {
        question: "Vì sao không nên dán nguyên họ tên, điểm và hoàn cảnh gia đình của em vào công cụ AI trên mạng?",
        options: [
          "Đó là dữ liệu cá nhân của học sinh, cần theo quy định của nhà trường",
          "Vì AI sẽ tính sai điểm nếu dữ liệu ghi kèm tên học sinh",
          "Vì tên học sinh thường làm câu nhận xét bị dài ra quá mức",
          "Vì công cụ AI không đọc được chữ tiếng Việt có dấu trong tên riêng",
        ],
        correct: 0,
        explanation:
          "Thông tin về học sinh là dữ liệu nhạy cảm, nhà trường thường có quy định về việc đưa nó ra ngoài. Hãy hỏi ban giám hiệu hoặc người phụ trách dữ liệu, và dùng mã hoặc mô tả ẩn danh khi nháp. AI không tính sai điểm vì có tên, độ dài không phải mối lo, và các công cụ hiện nay đọc tiếng Việt có dấu bình thường.",
      },
      {
        question: "Đoạn nào trong một nhận xét đáng nghi nhất khi soát?",
        options: [
          "Câu chứa nhận định về nguyên nhân hoặc tính cách mà hồ sơ không nói",
          "Câu nêu điểm số đúng với bảng điểm mà bạn vừa đối chiếu xong",
          "Câu trích đúng một hoạt động lớp học mà bạn nhớ chính xác",
          "Câu nhắc lịch nộp bài đã có trong thông báo gửi cả lớp",
        ],
        correct: 0,
        explanation:
          "AI hay thêm lời giải thích như 'do em thiếu tự tin' hay 'em lười' dù không có căn cứ; đó là suy đoán về một đứa trẻ, dễ gây hại nhất. Các câu còn lại đều có thể kiểm với nguồn bạn đang cầm: bảng điểm, buổi học, thông báo.",
      },
      {
        question: "Bạn soát 40 nhận xét và thấy 12 em nhận cùng một câu kết. Điều này nói lên gì?",
        options: [
          "Mẫu AI đang lặp và cần thay bằng chi tiết riêng từng em",
          "Đó là dấu hiệu mười hai em có kết quả giống hệt nhau",
          "Đó là lỗi hiển thị nên chỉ cần tải lại trang là hết",
          "Đó là cách viết chuẩn của nhận xét nên có thể để nguyên cả 12 câu",
        ],
        correct: 0,
        explanation:
          "AI có xu hướng dùng lại cụm câu quen thuộc, nên các em khác nhau vẫn nhận lời kết giống nhau. Nó không chứng minh kết quả giống nhau. Đây cũng không phải lỗi hiển thị. Và nhận xét chuẩn không có nghĩa là mười hai em nhận cùng một lời.",
      },
      {
        question: "Bạn đã sửa nhận xét bằng chi tiết thật. Việc cuối trước khi ký là gì?",
        options: [
          "Đọc như phụ huynh của em",
          "Nhờ AI chấm lại xem nhận xét đã đạt chuẩn chưa",
          "Gửi bản nháp cho đồng nghiệp bằng ứng dụng nhắn tin chung của trường",
          "Đếm số chữ để mọi em có nhận xét dài bằng nhau",
        ],
        correct: 0,
        explanation:
          "Đọc như phụ huynh giúp bạn thấy câu nào nghe lạ, quá nặng hoặc không đúng với em mà họ biết. AI chấm lại chỉ dựa trên chính văn bản, không có hồ sơ. Gửi bản nháp có tên em lên nhóm chung có thể lộ thông tin. Độ dài bằng nhau không làm nhận xét đúng hơn.",
      },
    ],
    keyTakeaways: [
      "Nhận xét mẫu của AI hợp với đa số, không phải với riêng một em.",
      "Đối chiếu từng ý với sổ điểm và ghi chú thật trước khi ký.",
      "Một chi tiết thật làm nhận xét đúng và hữu ích hơn ba tính từ khen.",
      "Đừng để AI suy đoán nguyên nhân hay tính cách của học sinh.",
      "Hỏi nhà trường trước khi đưa thông tin cá nhân của em vào công cụ AI.",
    ],
    practicePrompt: {
      question:
        "Nhận xét AI nháp cho em Lan: 'Em rất tự tin phát biểu.' Ghi chú của bạn: Lan ít nói, chỉ giơ tay một lần cả kỳ. Bạn nên làm gì?",
      options: [
        "Bỏ câu đó và thay bằng điều bạn quan sát thật về em",
        "Giữ câu đó vì được khen sẽ giúp em tự tin lên thật nhiều",
        "Hỏi AI vì sao em Lan tự tin rồi dùng lời giải thích của nó",
        "Đổi thành 'em rất chăm phát biểu' vì nghe vẫn tích cực",
      ],
      correct: 0,
      explanation:
        "Câu đó mâu thuẫn với ghi chú của bạn, tức là AI viết theo mẫu chứ không theo em. Khen sai còn làm em nghĩ bạn không để ý tới mình. Hỏi lại AI chỉ nhận thêm lời giải thích bịa, còn đổi từ ngữ thì vẫn giữ một điều không có thật.",
    },
    summary: {
      keyIdea: "AI viết nhận xét theo mẫu chung, bạn là người biết em nào đang đứng trước mình.",
      formula: "Nhận xét mẫu → đối chiếu hồ sơ thật → gạch câu lệch → thêm một chi tiết thật → đọc như phụ huynh.",
      commonMistake: "Thấy câu nhận xét mượt và tích cực nên ký luôn mà không mở sổ điểm.",
      action: "Chọn ba em và soát nhận xét đã có theo sổ điểm, sửa mỗi em một chi tiết thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ba nhận xét bạn hoặc AI đã viết cho ba em có tình hình khác nhau (một em tiến bộ, một em tụt, một em ổn định). Đặt cạnh sổ điểm hoặc ghi chú của bạn, gạch câu không khớp và viết lại mỗi em một câu có chi tiết thật. Nếu dùng AI để nháp, chỉ dùng mã hoặc mô tả ẩn danh.",
      secondary: "Ghi lại xem có bao nhiêu câu trùng nhau giữa ba nhận xét: đó là số câu mẫu bạn phải thay.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối kỳ, cả tập nhận xét chờ bạn ký và AI cho bạn bản nháp chỉ trong vài giây. Bài này dạy cách soát bản nháp theo hồ sơ thật, để lời nhận xét không nghe đúng mà sai với em này.",
      },
      {
        type: "feynman",
        title: "Soát nhận xét AI đơn giản hơn bạn nghĩ",
        intro: "Một bộ đồng phục may sẵn vừa với nhiều người, nhưng em cao hơn hay thấp hơn vẫn phải chỉnh gấu. Nhận xét mẫu của AI là bộ đồng phục ấy: vừa với số đông, còn từng em thì cần chỉnh.",
        columns: ["Thành phần", "Đồng phục may sẵn", "Nhận xét AI nháp"],
        rows: [
          ["Sản phẩm sẵn", "Cỡ M, L, XL", "Câu mẫu hợp với đa số học sinh"],
          ["Số đo thật", "Thước dây trên người", "Sổ điểm, ghi chú, chuyện đã xảy ra"],
          ["Chỉnh sửa", "Sửa gấu, thu eo", "Thay câu lệch bằng chi tiết thật"],
          ["Thử áo", "Mặc thử trước gương", "Đọc như phụ huynh của em"],
        ],
        oneLiner: "AI đưa bộ áo may sẵn; bạn cầm thước đo và chỉnh cho đúng người.",
      },
      { type: "heading", text: "Vì sao câu nghe đúng vẫn có thể sai" },
      {
        type: "paragraph",
        text: "AI viết theo những gì hay đi cùng nhau trong hàng triệu lời nhận xét: điểm đi lên thì 'tiến bộ', điểm ở giữa thì 'cần cố gắng thêm'. Nó không biết Nam vừa tụt điểm vì ốm hai tuần, và cũng không biết Lan ít nói. Nó viết câu ổn cho một học sinh trung bình tưởng tượng. Phần việc của bạn là nhận ra chỗ học sinh trung bình ấy không phải em đang cầm sổ.",
      },
      {
        type: "flow",
        title: "Soát một nhận xét trong hai phút",
        steps: [
          { label: "Đặt cạnh hồ sơ", detail: "Mở sổ điểm và ghi chú của riêng em, đặt cạnh nhận xét AI nháp. Đừng soát bằng trí nhớ chung về cả lớp." },
          { label: "Gạch câu lệch", detail: "Câu nào nói điều sổ không có (tự tin, lười, tiến bộ) hoặc trái với sổ thì gạch. Đó là chỗ AI đoán." },
          { label: "Thay bằng chi tiết thật", detail: "Một bài làm tốt, một buổi vắng, một lần em giúp bạn. Chi tiết cụ thể là thứ AI không thể bịa ra đúng." },
          { label: "Bỏ suy đoán về tính cách", detail: "Chỉ mô tả điều quan sát được, không kết luận vì sao em như vậy. Nguyên nhân cần hỏi em hoặc gia đình." },
          { label: "Đọc như phụ huynh", detail: "Đọc một lần như cha mẹ em: có câu nào làm họ ngạc nhiên hoặc tổn thương không? Nếu có, sửa trước khi ký." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét cho em Nam",
        task: "Hồ sơ của Nam: điểm giữa kỳ 7,5, cuối kỳ 5,5; vắng hai tuần vì ốm; nộp đủ bài về nhà; làm tốt bài thảo luận nhóm. Đánh dấu những câu không khớp hồ sơ.",
        segments: [
          { text: "Nam đã nộp đầy đủ bài về nhà trong kỳ này." },
          { text: "Em tiến bộ rõ rệt so với giữa kỳ, tiếp tục phát huy.", error: "Điểm của Nam giảm từ 7,5 xuống 5,5 nên 'tiến bộ rõ rệt' trái với sổ điểm. AI viết câu khen mẫu mà không có số liệu." },
          { text: "Em làm rất tốt ở bài thảo luận nhóm." },
          { text: "Việc điểm giảm là do Nam thiếu tập trung và lơ là học tập.", error: "Hồ sơ ghi Nam vắng hai tuần vì ốm; nguyên nhân 'lơ là' do AI tự thêm và có thể làm tổn thương em." },
          { text: "Nam đã nghỉ hai tuần vì ốm nên cần được hỗ trợ học bù." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhận xét mẫu chung",
          text: "Nghe mượt và tích cực, dùng được cho nhiều em. Không nhắc bài nào, buổi nào. Phụ huynh đọc thấy giống nhận xét của con nhà khác. Em đọc xong không biết mình cần làm gì.",
        },
        right: {
          label: "Nhận xét có chi tiết thật",
          text: "Nêu một việc em đã làm hoặc chưa làm được. Khớp với sổ điểm và ghi chú. Phụ huynh nhận ra con mình trong câu chữ. Em biết bước tiếp theo cần làm là gì.",
        },
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu, 40 nhận xét chờ ký",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đã nháp 40 nhận xét cho bạn. Bạn có ba mươi phút trước khi phải nộp cho tổ trưởng, và bạn biết vài em trong lớp có chuyện riêng.",
            choices: [
              { label: "Ký cả 40 nhận xét vì chúng đều được viết lịch sự và tích cực", next: "bad_sign" },
              { label: "Soát trước những em có biến động: điểm tụt, vắng nhiều, chuyện riêng", next: "s2" },
            ],
          },
          bad_sign: {
            text: "Em Nam vừa tụt điểm nhận câu 'tiến bộ rõ rệt'. Phụ huynh gọi điện hỏi cô có xem bài của con không, và bạn mất cả buổi tối giải thích.",
            ending: "bad",
          },
          s2: {
            text: "Bạn soát được bảy em có câu lệch với hồ sơ. Còn hai mươi phút.",
            choices: [
              { label: "Nhờ AI viết lại bảy nhận xét đó và tin bản mới vì nó đã 'hiểu' hơn", next: "bad_again" },
              { label: "Tự thay câu lệch bằng một chi tiết thật rồi đọc lại như phụ huynh", next: "good" },
            ],
          },
          bad_again: {
            text: "AI không có thêm thông tin nên bản mới vẫn chung chung, một câu còn đoán nguyên nhân tụt điểm. Bạn nộp và phải sửa lại sau khi tổ trưởng đọc.",
            ending: "bad",
          },
          good: {
            text: "Bạn nộp đúng giờ. Bảy em có nhận xét gắn với việc thật, và không phụ huynh nào phải hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nhận xét là lời của bạn",
        text: "Chữ ký cuối cùng là của bạn, không phải của AI. Việc liên quan tới đánh giá, kỷ luật hoặc hồ sơ chính thức của học sinh thì làm theo quy định của nhà trường và hỏi ban giám hiệu khi chưa chắc.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nháp nhận xét bằng mã hoặc mô tả ẩn danh, không dán tên thật.",
          "Bước 2 - Mở hồ sơ từng em và gạch câu không khớp.",
          "Bước 3 - Thay bằng một chi tiết thật, bỏ suy đoán về tính cách.",
          "Bước 4 - Đọc như phụ huynh rồi mới ký.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI cho bạn bản nháp nhanh; hồ sơ thật và con mắt của bạn quyết định câu nào ở lại.",
          "Bài sau: dựng kế hoạch ôn tập cho nhóm em học yếu một chủ đề.",
        ],
      },
    ],
  },
  {
    id: 2031,
    slug: "ke-hoach-on-tap-cho-nhom-yeu-mot-chu-de",
    title: "Chặng 31, Bài 12: Kế hoạch ôn tập cho nhóm học yếu một chủ đề",
    subtitle: "Bác sĩ hỏi đau ở đâu trước khi kê đơn: xem các em sai ở chỗ nào rồi mới lên kế hoạch ôn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bài kiểm tra vừa chấm xong và có tám em dưới trung bình cùng một dạng bài. Bạn không có thời gian cho một khoá học lại, chỉ có vài buổi ngắn. AI có thể dựng khung kế hoạch nhanh, nhưng nếu không cho nó biết các em sai ở đâu thì nó chỉ gợi ý 'ôn lại toàn bộ chương', đúng kiểu tốn công mà không đúng chỗ.",
    openingQuestion:
      "Tám em cùng sai dạng bài giải phương trình bậc nhất có ngoặc. Bạn nhờ AI lên kế hoạch ôn ba buổi. Điều gì nên có trong yêu cầu đầu tiên?",
    openingOptions: [
      "Các lỗi sai cụ thể của tám em, thời lượng mỗi buổi và mục tiêu sau ba buổi",
      "Chỉ cần nói 'giúp các em yếu Toán học tốt hơn' để AI tự quyết mọi thứ còn lại",
      "Danh sách tên và điểm của cả lớp để AI tự tìm ra ai cần ôn thêm",
      "Yêu cầu một kế hoạch ôn trọn chương, càng chi tiết càng tốt",
    ],
    correctOption: 0,
    explanation:
      "Kế hoạch ôn tốt bắt đầu từ chỗ sai cụ thể: các em bỏ dấu khi mở ngoặc, hay chuyển vế sai? Khi có lỗi thật, thời lượng và mục tiêu, AI đề xuất được ba buổi bám đúng chỗ. Yêu cầu chung chung chỉ cho ra khung chung. Danh sách cả lớp thêm dữ liệu cá nhân mà không thêm hiểu biết về lỗi. Ôn trọn chương thì mỗi buổi quá tải.",
    diagram: [
      { label: "Nhìn bài làm, gom các lỗi sai thành vài nhóm", arrow: true },
      { label: "Nhờ AI đề xuất ba buổi ngắn, mỗi buổi một mục tiêu nhỏ", arrow: true },
      { label: "Bạn chọn hoạt động phù hợp em và thời gian thật", arrow: true },
      { label: "Cuối mỗi buổi làm một câu kiểm nhanh để biết có tiến không" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: thầy Bình thấy tám em sai bài giải phương trình có ngoặc; xem bài, thầy nhận ra sáu em nhân sai dấu khi mở ngoặc còn hai em chuyển vế sai. Thầy đưa hai nhóm lỗi này cho AI và xin ba buổi 15 phút. Buổi một tập mở ngoặc với số âm, buổi hai chuyển vế, buổi ba làm lại đề kiểm tra nhỏ. Cả ba buổi đều bám đúng nhóm lỗi, không ôn lan man.",
    },
    quiz: [
      {
        question: "Bước đầu tiên trước khi nhờ AI lên kế hoạch ôn cho nhóm em yếu?",
        options: [
          "Xem bài làm và gom các lỗi sai thành vài nhóm cụ thể",
          "Hỏi AI xem chủ đề nào thường khiến học sinh yếu nhất",
          "Xin AI một đề thi mới thật khó để các em làm lại ngay",
          "Chuyển các em xuống nhóm học chậm hơn để bài giảng phù hợp",
        ],
        correct: 0,
        explanation:
          "Không biết các em sai ở đâu thì mọi kế hoạch đều là đoán. Hỏi AI về chủ đề chung không nói được gì về lớp bạn. Đề khó chỉ làm các em nản. Chuyển nhóm là quyết định tổ chức lớp lớn hơn nhiều so với nhu cầu ôn một chủ đề.",
      },
      {
        question: "Kế hoạch ba buổi ngắn thường hợp lý hơn một buổi dài vì sao?",
        options: [
          "Học lặp cách quãng giúp nhớ lâu hơn học một mạch",
          "Vì AI chỉ chia kế hoạch được thành ba buổi",
          "Vì học sinh yếu không thể tập trung quá năm phút mỗi buổi",
          "Vì ba buổi luôn cho kết quả tốt hơn hai buổi trong mọi trường hợp",
        ],
        correct: 0,
        explanation:
          "Ôn lặp lại sau vài ngày thường giúp nhớ bền hơn ôn dồn một lần. Ba không phải con số thần kỳ và AI không bị giới hạn như vậy. Thời lượng tập trung của mỗi em khác nhau, nên không có mức năm phút cố định. Số buổi tốt nhất phụ thuộc thời gian bạn thật sự có.",
      },
      {
        question: "AI đề xuất buổi ôn dài 60 phút, nhưng bạn chỉ có 15 phút giờ ra chơi. Nên làm gì?",
        options: [
          "Cắt xuống một mục tiêu nhỏ vừa 15 phút",
          "Giữ nguyên rồi cố dạy nhanh hơn để kịp hết nội dung",
          "Bỏ kế hoạch và ôn tự do vì AI không hiểu điều kiện của lớp mình",
          "Kéo dài sang buổi học chính khoá mà không báo lại cho các em khác trong lớp",
        ],
        correct: 0,
        explanation:
          "Bạn là người biết thời gian thật, nên hãy bảo AI rút gọn còn một mục tiêu vừa 15 phút. Dạy nhanh hơn làm các em yếu càng không theo kịp. Bỏ hẳn kế hoạch là bỏ luôn phần AI làm tốt. Lấn vào giờ chính khoá ảnh hưởng những em khác.",
      },
      {
        question: "Cuối mỗi buổi ôn, việc nào cho bạn biết kế hoạch có hiệu quả?",
        options: [
          "Một câu kiểm nhanh đúng nhóm lỗi vừa ôn",
          "Hỏi 'các em hiểu chưa?' rồi đếm tay",
          "Nhờ AI đánh giá xem buổi ôn vừa rồi có thành công không",
          "Chờ tới bài kiểm tra kỳ sau rồi mới biết các em có tiến bộ không",
        ],
        correct: 0,
        explanation:
          "Một câu kiểm nhanh cho thấy từng em có làm được không, ngay lúc bạn còn sửa được buổi sau. Gật đầu thường chỉ là phép lịch sự. AI không có mặt trong buổi ôn nên không đánh giá được. Chờ kỳ sau thì mất thời gian sửa kế hoạch.",
      },
      {
        question: "Vì sao không nên dán tên thật và điểm từng em vào AI để lên kế hoạch?",
        options: [
          "Kế hoạch chỉ cần nhóm lỗi, không cần biết em nào",
          "Vì AI nhầm các em nếu có hơn năm tên",
          "Vì tên học sinh khiến kế hoạch thiên vị em có điểm cao hơn",
          "Vì điểm số thật làm AI trả lời chậm và thiếu chính xác hơn",
        ],
        correct: 0,
        explanation:
          "Để dựng ba buổi ôn, AI chỉ cần biết nhóm lỗi và thời lượng, còn tên và điểm là dữ liệu cá nhân của học sinh nên nên tránh đưa ra ngoài, và hỏi nhà trường nếu chưa rõ quy định. Số lượng tên không làm AI nhầm theo kiểu đó, tên không gây thiên vị, và điểm không làm AI chậm hơn.",
      },
    ],
    keyTakeaways: [
      "Bắt đầu từ lỗi sai cụ thể của các em, không từ tên chương.",
      "Ba buổi ngắn với mỗi buổi một mục tiêu nhỏ hợp thời gian thật hơn.",
      "Bạn cắt và chọn hoạt động; AI chỉ đề xuất.",
      "Cuối buổi làm một câu kiểm nhanh đúng nhóm lỗi.",
      "Không cần đưa tên và điểm từng em để dựng kế hoạch.",
    ],
    practicePrompt: {
      question:
        "AI đề xuất kế hoạch ôn cả chương phân số trong ba buổi. Nhóm em của bạn chỉ sai phần quy đồng mẫu số. Nên xử lý thế nào?",
      options: [
        "Bảo AI thu hẹp mỗi buổi vào quy đồng mẫu số",
        "Dùng nguyên kế hoạch vì ôn nhiều hơn thì không bao giờ hại",
        "Bỏ kế hoạch và giảng lại từ đầu chương cho các em",
        "Nhờ AI thêm nhiều bài tập nữa vào mỗi buổi cho các em đủ bận",
      ],
      correct: 0,
      explanation:
        "Thu hẹp vào chỗ sai giúp mỗi buổi ngắn mà trúng. Ôn cả chương làm loãng thời gian vào những phần các em đã ổn. Giảng lại từ đầu tốn công hơn và không đúng nhu cầu, còn thêm bài tập chỉ làm buổi ôn nặng nề mà không sửa được lỗi gốc.",
    },
    summary: {
      keyIdea: "Kế hoạch ôn tập hiệu quả nhất khi nó bám đúng chỗ các em sai và vừa với thời gian thật của bạn.",
      formula: "Gom nhóm lỗi → xin ba buổi ngắn → cắt cho vừa thời gian → câu kiểm nhanh cuối buổi.",
      commonMistake: "Xin AI kế hoạch ôn cả chương rồi dùng nguyên văn dù các em chỉ sai một chỗ.",
      action: "Lần tới sau một bài kiểm tra, gom lỗi thành hai hoặc ba nhóm trước khi nhờ AI dựng buổi ôn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bài kiểm tra gần nhất của lớp bạn. Xem khoảng 8 bài sai nhiều nhất và gom lỗi thành hai hoặc ba nhóm. Nhờ AI đề xuất ba buổi ôn 15 phút cho từng nhóm lỗi (không dán tên em), rồi cắt lại theo giờ bạn thật sự có và viết sẵn một câu kiểm nhanh cho mỗi buổi.",
      secondary: "Ghi lại buổi nào bạn phải cắt nhiều nhất: đó là chỗ AI chưa hiểu điều kiện lớp bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau bài kiểm tra, tám em cùng gặp khó ở một dạng bài, và bạn chỉ có vài buổi ngắn để giúp. Bài này dạy cách dùng AI dựng khung ôn ba buổi bám đúng chỗ sai.",
      },
      {
        type: "feynman",
        title: "Lập kế hoạch ôn tập bằng AI đơn giản hơn bạn nghĩ",
        intro: "Đi khám, bác sĩ không kê đơn ngay. Họ hỏi đau ở đâu, bao lâu rồi, rồi mới chọn thuốc. Kế hoạch ôn cũng vậy: hỏi các em sai ở đâu trước, rồi mới chọn cách ôn.",
        columns: ["Thành phần", "Đi khám bệnh", "Kế hoạch ôn tập"],
        rows: [
          ["Triệu chứng", "Đau ở đâu, từ khi nào", "Các lỗi sai trong bài làm"],
          ["Chẩn đoán", "Bác sĩ gọi tên bệnh", "Bạn gom lỗi thành hai hoặc ba nhóm"],
          ["Toa thuốc", "Liều nhỏ, đúng chỗ", "Ba buổi ngắn, mỗi buổi một mục tiêu"],
          ["Tái khám", "Kiểm tra lại sau đợt thuốc", "Câu kiểm nhanh cuối mỗi buổi"],
        ],
        oneLiner: "Chẩn đoán trước, kê đơn sau: nhìn lỗi sai trước khi nhờ AI lên kế hoạch.",
      },
      { type: "heading", text: "Vì sao 'ôn lại cả chương' ít hiệu quả" },
      {
        type: "paragraph",
        text: "Khi không biết em sai ở đâu, AI cho một kế hoạch trọn chương: nhắc lại lý thuyết, làm vài chục bài. Kế hoạch đó nghe chu đáo nhưng tốn công. Phần lớn thời gian rơi vào chỗ các em đã ổn, còn chỗ sai thật chỉ chiếm vài phút. Nếu bạn cho nó biết đó là bỏ dấu khi mở ngoặc, ba buổi ngắn sẽ đủ.",
      },
      {
        type: "flow",
        title: "Từ bài kiểm tra tới ba buổi ôn",
        steps: [
          { label: "Đọc bài sai", detail: "Xem khoảng tám bài sai nhiều nhất và ghi lỗi mỗi bài: mở ngoặc sai dấu, chuyển vế sai, đọc đề nhầm." },
          { label: "Gom nhóm lỗi", detail: "Chỉ giữ hai hoặc ba nhóm lỗi chiếm nhiều nhất. Lỗi hiếm thì để dạy riêng." },
          { label: "Xin ba buổi ngắn", detail: "Nói cho AI nhóm lỗi, thời lượng thật mỗi buổi và mục tiêu cuối cùng; không cần đưa tên hay điểm từng em." },
          { label: "Cắt cho vừa lớp", detail: "Bạn bỏ hoạt động không hợp em hoặc không đủ thời gian. AI không biết phòng học, giờ ra chơi hay em nào cần ngồi gần." },
          { label: "Câu kiểm nhanh", detail: "Cuối mỗi buổi cho một câu đúng nhóm lỗi để biết ai đã làm được, ai cần thêm." },
        ],
      },
      {
        type: "scenario",
        title: "Tám em dưới trung bình, ba buổi 15 phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa chấm xong bài kiểm tra chương phương trình. Tám em sai cùng một dạng và bạn chỉ có 15 phút mỗi buổi trong ba ngày.",
            choices: [
              { label: "Bảo AI lập kế hoạch ôn cả chương, rồi dạy theo đúng thứ tự AI xếp", next: "bad_wide" },
              { label: "Đọc bài sai, gom lỗi thành nhóm rồi mới nhờ AI dựng ba buổi", next: "s2" },
            ],
          },
          bad_wide: {
            text: "Buổi đầu tiêu hết vào phần lý thuyết các em đã thuộc. Đến buổi ba mới chạm đúng chỗ sai, nhưng không còn thời gian luyện. Tám em vẫn sai dạng đó ở bài sau.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy sáu em nhân sai dấu khi mở ngoặc, hai em chuyển vế sai. AI đề xuất ba buổi: mở ngoặc, chuyển vế, làm lại đề nhỏ.",
            choices: [
              { label: "Dùng nguyên kế hoạch nhưng thêm bài tập để mỗi buổi kéo dài thành 40 phút", next: "bad_long" },
              { label: "Giữ mỗi buổi 15 phút, làm một mục tiêu và kết thúc bằng một câu kiểm nhanh", next: "good" },
            ],
          },
          bad_long: {
            text: "Buổi ôn kéo qua giờ vào lớp, các em mệt và một nửa bỏ dở. Câu kiểm cuối buổi không ai làm xong nên bạn không biết ai đã hiểu.",
            ending: "bad",
          },
          good: {
            text: "Sau buổi ba, sáu trong tám em làm đúng câu kiểm nhanh. Bạn biết hai em còn chuyển vế sai và hẹn gặp riêng.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch bám lỗi",
          text: "Mỗi buổi 15 phút với một mục tiêu nhỏ. Các em thấy mình sửa được đúng chỗ đã sai. Bạn biết buổi nào có tác dụng nhờ câu kiểm nhanh, và dễ đổi hướng.",
        },
        right: {
          label: "Kế hoạch ôn cả chương",
          text: "Nhiều nội dung nhưng loãng, phần lớn các em đã biết. Buổi nào cũng quá dài với thời gian thật. Không có điểm kiểm nên khó biết đã sửa được lỗi nào.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI dựng ba buổi ôn",
        task: "Nhóm 8 em sai bài giải phương trình bậc nhất có ngoặc: sáu em mở ngoặc sai dấu, hai em chuyển vế sai. Bạn có ba buổi 15 phút. Lắp prompt để AI dựng kế hoạch.",
        parts: [
          {
            id: "error",
            label: "Chỗ các em sai",
            options: [
              { text: "Các em yếu Toán, giúp ôn lại.", feedback: "Không nói chỗ sai, AI trả về kế hoạch ôn cả chương như một chủ đề chung." },
              { text: "Sáu em mở ngoặc sai dấu, hai em chuyển vế sai trong phương trình bậc nhất.", good: true, feedback: "AI thấy hai nhóm lỗi cụ thể nên mỗi buổi sẽ bám vào một nhóm." },
            ],
          },
          {
            id: "time",
            label: "Thời gian thật",
            options: [
              { text: "Thời gian thoải mái, bao lâu cũng được.", feedback: "AI có thể đề xuất buổi 60 phút mà lớp bạn không có, và bạn phải tự cắt lại." },
              { text: "Ba buổi, mỗi buổi 15 phút vào giờ ra chơi.", good: true, feedback: "AI phải chia mục tiêu vừa 15 phút, nên mỗi buổi chỉ có một việc." },
            ],
          },
          {
            id: "check",
            label: "Cách biết đã hiểu",
            options: [
              { text: "Không cần kiểm tra, cứ ôn hết là được.", feedback: "Không có điểm kiểm thì bạn không biết em nào cần thêm, kế hoạch sẽ không có phản hồi." },
              { text: "Cuối mỗi buổi có một câu kiểm nhanh đúng nhóm lỗi vừa ôn.", good: true, feedback: "Bạn nhận về câu kiểm cho từng buổi để biết ai đã làm được ngay hôm đó." },
            ],
          },
        ],
        responses: [
          {
            requires: ["error", "time", "check"],
            text: "Buổi 1 (15 phút): mở ngoặc có dấu trừ phía trước; 3 ví dụ mẫu, 4 bài đôi bạn. Câu kiểm: 5 - 2(x - 3) = ?\nBuổi 2: chuyển vế đổi dấu; 2 ví dụ, 4 bài. Câu kiểm: 3x + 4 = x - 6.\nBuổi 3: làm lại 3 bài giống đề kiểm tra, tự đối chiếu đáp án.",
          },
          {
            requires: ["error"],
            text: "Buổi 1: mở ngoặc và chuyển vế, khoảng 45 phút gồm ví dụ, luyện tập và bài tổng hợp.\nBuổi 2 và 3 tương tự. (Đúng chỗ sai nhưng mỗi buổi dài 45 phút, không vừa giờ ra chơi.)",
          },
          {
            text: "Buổi 1: nhắc lại khái niệm phương trình, định nghĩa ẩn số và nghiệm.\nBuổi 2: ôn hệ phương trình và bất phương trình.\nBuổi 3: làm đề tổng hợp cả chương. (Kế hoạch chung chung, không nhắm vào chỗ sai của các em.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Kế hoạch là gợi ý, quyết định là của bạn",
        text: "AI không biết em nào mệt, em nào cần ngồi gần bảng, hay giờ ra chơi hôm nay có bị đổi không. Việc cần hỏi ý kiến gia đình hoặc phối hợp với nhà trường (học thêm, xếp nhóm) thì làm theo quy định và hỏi ban giám hiệu trước.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xem bài sai, gom lỗi thành hai hoặc ba nhóm.",
          "Bước 2 - Nhờ AI dựng ba buổi ngắn, không đưa tên hay điểm từng em.",
          "Bước 3 - Cắt cho vừa thời gian thật, giữ mỗi buổi một mục tiêu.",
          "Bước 4 - Làm câu kiểm nhanh cuối buổi và chỉnh buổi sau theo kết quả.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nhìn lỗi sai trước, kế hoạch sau, và để câu kiểm nhanh cho bạn biết kế hoạch có tác dụng.",
          "Bài sau: giải thích lại bằng cách thứ hai khi cách đầu không thông.",
        ],
      },
    ],
  },
  {
    id: 2032,
    slug: "giai-thich-lai-theo-cach-thu-hai",
    title: "Chặng 31, Bài 13: Giải thích lại theo cách thứ hai khi cách đầu không thông",
    subtitle: "Đường này tắc thì rẽ đường khác: cùng một điểm đến, có nhiều lối đi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã giảng hai lần mà em ấy vẫn nhìn bạn với vẻ khó hiểu. Lần thứ ba bạn có xu hướng nhắc lại y hệt, chỉ nói to và chậm hơn. AI giúp bạn nghĩ ra những cách tiếp cận khác trong vài giây, nhưng chọn cách nào cho em này vẫn là việc của bạn.",
    openingQuestion:
      "Em Mai vẫn không hiểu phân số sau hai lần bạn giảng bằng hình tròn chia phần. Bạn nhờ AI giúp. Yêu cầu nào hữu ích nhất?",
    openingOptions: [
      "Đề xuất ba cách giải thích khác, nói rõ mỗi cách hợp em kiểu nào",
      "Giải thích phân số lại một lần nữa thật chậm và đầy đủ từng bước một",
      "Viết cho tôi định nghĩa phân số chính xác nhất trong sách toán",
      "Cho biết vì sao em Mai không hiểu phân số",
    ],
    correctOption: 0,
    explanation:
      "Cách đầu tiên không thông nghĩa là cần một lối đi khác, không phải nhắc lại cùng lối. Xin ba cách khác nhau cho bạn quyền chọn: dùng hình, dùng đồ ăn, dùng đo lường. Giải thích lại chậm hơn vẫn là cách cũ. Định nghĩa chính xác thường khó hiểu hơn cho em đang mắc. Và AI không thể biết vì sao em Mai không hiểu vì nó chưa gặp em.",
    diagram: [
      { label: "Nói AI cách đã dùng và chỗ em bị kẹt", arrow: true },
      { label: "Xin ba cách khác, mỗi cách một kiểu ví dụ", arrow: true },
      { label: "Bạn chọn một cách hợp em và thử trong vài phút", arrow: true },
      { label: "Hỏi em nhắc lại bằng lời của em để biết đã thông chưa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Thu giảng phân số bằng hình tròn hai lần mà em Mai vẫn lúng túng. Cô nhờ AI ba cách khác: chia bánh, chia dây, đo cốc nước. Cô biết Mai hay giúp mẹ nấu ăn nên chọn cốc nước. Sau ba phút, Mai tự nói được 'nửa cốc và hai phần tư cốc là bằng nhau'.",
    },
    quiz: [
      {
        question: "Khi giảng lần hai mà em vẫn không hiểu, điều nào đúng nhất?",
        options: [
          "Đổi cách tiếp cận thay vì lặp lại cùng một cách chậm hơn",
          "Giảng lại y hệt nhưng nói chậm hơn và to hơn để em nghe rõ nội dung",
          "Chuyển sang bài tiếp theo vì em nào cũng sẽ tự hiểu dần khi học tiếp",
          "Bảo em về nhà tự đọc lại sách giáo khoa cho đến khi thấy rõ",
        ],
        correct: 0,
        explanation:
          "Cách giảng cũ đã thất bại hai lần, lặp lại chậm hơn hiếm khi đổi kết quả. Bỏ qua phần chưa hiểu sẽ khiến các bài sau, vốn xây trên phần này, càng khó. Bảo tự đọc sách giáo khoa dành cho em đang kẹt là giao lại đúng chỗ khó nhất cho em.",
      },
      {
        question: "AI đề xuất bốn cách giải thích khác nhau. Bạn chọn cách nào?",
        options: [
          "Cách hợp với những gì em Mai đã biết hoặc hay làm",
          "Cách nghe hay nhất và có nhiều từ chuyên môn nhất trong bốn cách",
          "Cách AI xếp đầu tiên vì chắc là tốt nhất",
          "Cách dài nhất vì nhiều chi tiết thì em sẽ dễ hiểu hơn",
        ],
        correct: 0,
        explanation:
          "Cách hợp với trải nghiệm của em, như em hay nấu ăn hay hay chơi bóng, dễ nối với hiểu biết sẵn có nhất. Từ chuyên môn thường làm em rối hơn. Thứ tự AI xếp không phản ánh em Mai, và dài hơn không có nghĩa dễ hiểu hơn.",
      },
      {
        question: "AI giải thích: 'Phân số giống như chia pizza, nên 1/2 luôn lớn hơn 1/3 vì pizza nào cũng vậy.' Câu nào cần soát?",
        options: [
          "Có thể đúng cho hai chiếc bánh cùng cỡ, nhưng chưa nói rõ điều kiện cùng cỡ",
          "Hoàn toàn đúng nên bạn có thể dùng nguyên văn",
          "Sai hoàn toàn vì phân số không liên quan tới chia bánh",
          "Chỉ đúng khi bánh là hình tròn nên hình vuông thì khác",
        ],
        correct: 0,
        explanation:
          "1/2 lớn hơn 1/3 chỉ khi so trên cùng một cái bánh. Nếu bánh lớn nhỏ khác nhau, 1/3 của bánh to có thể lớn hơn 1/2 của bánh bé. Ví dụ đời thường hay thiếu điều kiện, bạn cần thêm vào. Nhưng nói 'sai hoàn toàn' cũng không đúng vì chia bánh là ví dụ phổ biến và hình dạng bánh không làm đổi kết quả.",
      },
      {
        question: "Sau khi thử cách mới, dấu hiệu nào cho thấy em đã thông?",
        options: [
          "Em tự nói lại bằng lời mình và làm được một bài mới",
          "Em gật đầu và nói 'dạ em hiểu rồi' khi cô hỏi",
          "Em chép lại nguyên văn lời giải thích của cô vào vở",
          "Em không hỏi thêm gì trong suốt phần còn lại của tiết",
        ],
        correct: 0,
        explanation:
          "Tự diễn đạt bằng lời mình và làm được bài mới chứng tỏ em nắm ý chứ không chỉ nhớ câu. Gật đầu và 'dạ hiểu rồi' là phép lịch sự, chép lại nguyên văn là ghi nhớ mà chưa chắc hiểu, còn im lặng có thể là em ngại hỏi.",
      },
      {
        question: "Khi nhờ AI đổi cách giải thích, thông tin nào nên đưa vào yêu cầu?",
        options: [
          "Cách đã dùng, chỗ em bị kẹt, tuổi của em",
          "Họ tên đầy đủ, ngày sinh và điểm tất cả các môn của em",
          "Chỉ tên khái niệm cần giải thích, không thêm gì khác",
          "Toàn bộ nhận xét học bạ của em từ đầu năm học tới nay",
        ],
        correct: 0,
        explanation:
          "Ba thông tin này đủ để AI đưa ra cách khác thật sự khác và hợp lứa tuổi. Tên, ngày sinh và điểm mọi môn là dữ liệu cá nhân không cần cho việc này. Chỉ nêu tên khái niệm thì AI đưa lại cách đã dùng, còn nhận xét học bạ dài là quá mức cần thiết và nhạy cảm.",
      },
    ],
    keyTakeaways: [
      "Cách thứ nhất không thông thì đổi lối đi, đừng lặp lại chậm hơn.",
      "Nói AI cách đã dùng và chỗ em bị kẹt để nhận cách thực sự khác.",
      "Chọn cách nối với điều em đã biết hoặc hay làm.",
      "Soát điều kiện ẩn trong ví dụ đời thường AI đưa ra.",
      "Kiểm tra bằng việc em tự nói lại và làm bài mới.",
    ],
    practicePrompt: {
      question:
        "Bạn giảng 'diện tích' bằng công thức hai lần mà em Tú vẫn rối. AI đề xuất: xếp ô vuông giấy phủ kín mặt bàn rồi đếm. Bạn nên làm gì trước khi dùng?",
      options: [
        "Thử với một hình đơn giản trước và xem em có nối được với công thức không",
        "Dùng ngay cho cả lớp vì AI đã chọn cách tốt nhất",
        "Bỏ cách này vì cách đầu bằng công thức mới là cách đúng",
        "Nhờ AI giải thích lại công thức thêm một lần nữa cho rõ hơn",
      ],
      correct: 0,
      explanation:
        "Thử nhỏ với một hình đơn giản cho bạn thấy em có nối được ô vuông với công thức không, trước khi cả lớp cùng dùng. AI đề xuất, không chọn giúp bạn. Cách công thức không phải cách duy nhất đúng, và giải thích công thức thêm lần nữa vẫn là lối đi đã tắc.",
    },
    summary: {
      keyIdea: "Khi một cách giảng không thông, hãy đổi lối đi; AI giúp bạn có nhiều lối, còn bạn chọn lối hợp em.",
      formula: "Nói cách đã dùng và chỗ kẹt → ba cách khác → chọn theo em → em tự nói lại.",
      commonMistake: "Lặp lại cùng một lời giảng, chỉ chậm hơn hoặc to hơn.",
      action: "Lần tới giảng hai lần không thông, xin AI ba cách khác trước khi thử lần thứ ba.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một khái niệm mà học sinh của bạn hay mắc. Nhờ AI ba cách giải thích khác cách bạn thường dùng, ghi rõ cách bạn đã dùng, chỗ các em bị kẹt và lứa tuổi. Chọn một cách, soát điều kiện ẩn của ví dụ, rồi chuẩn bị một câu hỏi để em tự nói lại bằng lời mình.",
      secondary: "Viết ra ba điều em cần nói được để bạn tin là đã thông.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã giảng hai lần và một em vẫn chưa hiểu. Bài này dạy cách nhờ AI đề xuất những cách khác, rồi chọn cách hợp em mà không giao cả quyết định cho máy.",
      },
      {
        type: "feynman",
        title: "Giải thích lần thứ hai đơn giản hơn bạn nghĩ",
        intro: "Đi đường tắc, bạn không nhấn còi to hơn, bạn xem bản đồ tìm đường khác. Điểm đến vẫn là nơi cũ, chỉ có lối đi đổi.",
        columns: ["Thành phần", "Đi đường tắc", "Giải thích lại"],
        rows: [
          ["Điểm đến", "Nhà bạn", "Em hiểu khái niệm"],
          ["Đường đã đi", "Đường tắc", "Cách giảng đã dùng hai lần"],
          ["Bản đồ", "Ứng dụng chỉ đường", "AI đề xuất các cách khác"],
          ["Người lái", "Bạn chọn lối", "Bạn chọn cách hợp em"],
        ],
        oneLiner: "Đổi lối đi chứ đừng nhấn còi: cách khác, cùng điểm đến.",
      },
      { type: "heading", text: "Vì sao lặp lại cùng cách ít có tác dụng" },
      {
        type: "paragraph",
        text: "Em không hiểu thường vì cách giảng chưa nối được với điều em đã biết, không phải vì em nghe chưa rõ. Nói lại chậm hơn không nối thêm gì. Cách khác, như ví dụ nấu ăn thay cho hình tròn, tạo một cầu nối mới. AI rất nhanh trong việc nghĩ ra các cầu nối; bạn là người biết em nào hay làm gì.",
      },
      {
        type: "flow",
        title: "Từ 'em chưa hiểu' tới một cách mới",
        steps: [
          { label: "Nói cách đã dùng", detail: "Cho AI biết hai lần trước bạn giảng thế nào và em phản ứng ra sao, để nó không đưa lại cách cũ." },
          { label: "Nêu chỗ kẹt", detail: "Em kẹt ở đâu: đọc đề, hình dung, hay phép tính? Chỗ kẹt cụ thể cho cách khác thật sự khác." },
          { label: "Xin ba cách", detail: "Yêu cầu ba cách với ví dụ đời thường khác nhau và một câu cho biết cách nào hợp em kiểu nào." },
          { label: "Soát ví dụ", detail: "Đọc từng ví dụ tìm điều kiện ẩn, như bánh phải cùng cỡ. Ví dụ đời thường hay thiếu điều kiện này." },
          { label: "Thử nhỏ và hỏi lại", detail: "Thử vài phút với em, rồi bảo em tự nói lại bằng lời mình. Nói lại được mới là thông." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI đề xuất cách giải thích khác",
        task: "Em Mai lớp 6 chưa hiểu phân số sau hai lần bạn giảng bằng hình tròn chia phần; em hay giúp mẹ nấu ăn. Lắp prompt để AI đề xuất cách khác.",
        parts: [
          {
            id: "tried",
            label: "Cách đã dùng và chỗ kẹt",
            options: [
              { text: "Giải thích phân số cho học sinh lớp 6.", feedback: "AI đưa lại cách quen thuộc giống cách bạn đã dùng: chia hình tròn." },
              { text: "Tôi đã giảng phân số bằng hình tròn hai lần; em không hình dung được 1/2 bằng 2/4.", good: true, feedback: "AI biết cách nào đã thất bại và chỗ kẹt, nên đề xuất lối khác hẳn." },
            ],
          },
          {
            id: "count",
            label: "Số cách và khuôn dạng",
            options: [
              { text: "Cho tôi cách giải thích tốt nhất.", feedback: "Bạn chỉ nhận một cách và không có gì để chọn theo em." },
              { text: "Cho ba cách khác nhau, mỗi cách một ví dụ đời thường, ghi cách nào hợp em kiểu nào.", good: true, feedback: "Bạn có ba lối để chọn và biết cách nào hợp kiểu em nào." },
            ],
          },
          {
            id: "know",
            label: "Điều em đã biết",
            options: [
              { text: "Không cần nói gì thêm về em.", feedback: "AI đưa ví dụ chung, có thể là thứ em chưa từng gặp." },
              { text: "Em lớp 6, hay giúp mẹ nấu ăn, chưa quen dùng công thức.", good: true, feedback: "AI chọn ví dụ từ chỗ em đã biết, như cốc và thìa, nên cầu nối gần hơn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["tried", "count", "know"],
            text: "Cách 1 (đo lường): rót nước vào cốc, nửa cốc và hai phần tư cốc cùng một mực nước. Hợp em hay nấu ăn.\nCách 2 (dây): gấp một sợi dây làm đôi, rồi làm tư.\nCách 3 (tiền xu): so hai xu 500 đồng với một xu 1.000 đồng.\nGợi ý: thử cách 1 trước. Lưu ý: cốc phải cùng cỡ khi so.",
          },
          {
            requires: ["tried"],
            text: "Bạn có thể thử giải thích bằng cách chia một chiếc bánh làm 2 phần, sau đó chia mỗi phần làm đôi. Em sẽ thấy 1/2 và 2/4 bằng nhau.\n(Chỉ một cách và lại quanh quẩn việc chia hình, chưa nối với điều em biết.)",
          },
          {
            text: "Phân số là một số biểu diễn phần của một tổng thể, gồm tử số ở trên và mẫu số ở dưới. Hai phân số bằng nhau khi tích chéo bằng nhau. (Định nghĩa và công thức, gần như lặp lại cách bạn đã dùng.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đổi cách giải thích",
          text: "Tạo một cầu nối mới tới điều em đã biết. Bạn có ba lối để chọn và thử nhanh. Nếu một cách không hợp, còn hai cách nữa, và em thấy cô đang cố tìm đường với mình.",
        },
        right: {
          label: "Lặp lại chậm hơn",
          text: "Vẫn cùng một cầu nối đã không nối được. Em càng thấy mình chậm hơn các bạn. Thời gian tiết học mất đi mà không có thông tin mới cho em.",
        },
      },
      {
        type: "scenario",
        title: "Em Mai vẫn nhìn bạn ngơ ngác",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn giảng phân số bằng hình tròn hai lần. Em Mai vẫn chưa nối được 1/2 với 2/4. Còn mười phút tới hết tiết.",
            choices: [
              { label: "Giảng lại lần thứ ba, chậm hơn và to hơn", next: "bad_repeat" },
              { label: "Nhờ AI ba cách khác, chọn một cách hợp Mai và thử nhỏ", next: "s2" },
            ],
          },
          bad_repeat: {
            text: "Mai gật đầu cho xong. Tuần sau làm bài, em vẫn đoán mò. Em bắt đầu nghĩ mình không giỏi Toán.",
            ending: "bad",
          },
          s2: {
            text: "AI đề xuất cốc nước, dây gấp và tiền xu. Bạn biết Mai hay nấu ăn.",
            choices: [
              { label: "Dùng ngay ví dụ pizza AI đưa mà không xem có đúng không", next: "bad_pizza" },
              { label: "Dùng ví dụ cốc nước, đọc lại điều kiện 'cùng một loại cốc' rồi mới thử", next: "s3" },
            ],
          },
          bad_pizza: {
            text: "AI viết '1/2 luôn lớn hơn 1/3'. Một bạn hỏi: 'Bánh to chia ba có to hơn bánh nhỏ chia hai không cô?' Cả lớp rối thêm.",
            ending: "bad",
          },
          s3: {
            text: "Bạn rót nước vào hai cốc cùng cỡ cho Mai. Mai nhìn mực nước và nói: 'Ơ, hai cái ngang nhau.'",
            choices: [
              { label: "Hỏi Mai tự nói lại bằng lời mình và cho một bài mới", next: "good" },
              { label: "Nói 'Đúng rồi!' rồi sang bài khác vì em đã gật đầu", next: "bad_check" },
            ],
          },
          bad_check: {
            text: "Bạn không biết Mai hiểu thật hay chỉ thấy cốc nước. Hôm sau, em vẫn không làm được bài có phân số khác mẫu.",
            ending: "bad",
          },
          good: {
            text: "Mai nói: 'Nửa cốc và hai phần tư cốc là một mực nước.' Em làm đúng bài mới. Bạn ghi lại cách này để dùng cho những em tương tự.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Ví dụ đời thường cần điều kiện",
        text: "Ví dụ hay nhưng nhiều ví dụ đời thường sai khi bỏ điều kiện: bánh cùng cỡ, cốc cùng loại, cùng đơn vị. Luôn đọc lại xem ví dụ đúng khi nào và sai khi nào trước khi giảng.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nói cho AI cách đã dùng và chỗ em bị kẹt.",
          "Bước 2 - Xin ba cách khác, mỗi cách một ví dụ đời thường.",
          "Bước 3 - Chọn cách nối với điều em đã biết, đọc kỹ điều kiện ví dụ.",
          "Bước 4 - Thử nhỏ, rồi bảo em tự nói lại và làm một bài mới.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Cách nào không thông thì đổi lối đi, và chỉ em nói lại được mới cho bạn biết đã thông.",
          "Bài sau: bài tập phân hoá mà không gắn nhãn học sinh.",
        ],
      },
    ],
  },
  {
    id: 2033,
    slug: "bai-tap-phan-hoa-ma-khong-gan-nhan-hoc-sinh",
    title: "Chặng 31, Bài 14: Bài tập phân hoá mà không gắn nhãn học sinh",
    subtitle: "Thực đơn có món cho mọi người: ai cũng chọn được, không ai bị xếp vào bàn riêng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎚️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trong lớp có em làm xong bài sau năm phút và có em còn chưa hiểu đề. Bạn muốn giao bài khác nhau, nhưng nếu phát 'phiếu xanh cho em giỏi, phiếu vàng cho em yếu' thì cả lớp nhận ra ngay ai bị xếp loại nào. AI giúp bạn soạn nhiều mức bài nhanh, còn cách trình bày để em nào cũng thấy mình được chọn là việc bạn thiết kế.",
    openingQuestion:
      "Bạn có bốn mức bài tập cho cùng một chủ đề. Cách phát nào giữ được phân hoá mà không khiến em nào thấy mình bị gắn nhãn?",
    openingOptions: [
      "Trình bày như thực đơn: các em tự chọn mức, bạn gợi ý riêng khi cần",
      "Phát phiếu màu khác nhau theo điểm kiểm tra gần nhất của từng em trong lớp",
      "Xếp các em ngồi theo nhóm giỏi, khá, trung bình và yếu",
      "Đưa mức khó cho cả lớp và để em nào không làm được thì bỏ qua",
    ],
    correctOption: 0,
    explanation:
      "Khi mỗi em được chọn mức bài, không ai bị 'chỉ định', và bạn vẫn gợi ý riêng cho em cần thêm hỗ trợ hay thử thách. Phiếu màu theo điểm làm cả lớp nhìn ra thứ hạng. Xếp nhóm giỏi, yếu là gắn nhãn công khai. Đưa mức khó cho cả lớp thì em yếu bị bỏ lại, không phải được hỗ trợ.",
    diagram: [
      { label: "Nhờ AI soạn bài cùng mục tiêu nhưng ba mức độ", arrow: true },
      { label: "Đặt tên mức theo việc làm, không theo trình độ", arrow: true },
      { label: "Để em tự chọn, bạn gợi ý riêng cho từng em khi cần", arrow: true },
      { label: "Nhìn lại mức em chọn và kết quả để chỉnh lần sau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Lan soạn ba nhóm bài tập đặt tên 'Khởi động', 'Tăng tốc', 'Khám phá' thay cho dễ, vừa, khó. Cô nói 'chọn mức hôm nay em thấy hợp, được đổi giữa chừng'. Không em nào bị ai gọi là nhóm yếu, và cô để ý những em chọn 'Khởi động' quá nhiều để nói chuyện riêng.",
    },
    quiz: [
      {
        question: "Vì sao đặt tên mức bài là 'Khởi động, Tăng tốc, Khám phá' tốt hơn 'Dễ, Vừa, Khó'?",
        options: [
          "Tên mô tả việc làm nên không xếp hạng em nào",
          "Tên có hình ảnh làm bài tập nhìn hấp dẫn và vui mắt hơn hẳn",
          "Tên ngắn giúp học sinh nhớ nhanh hơn",
          "Tên nghe hiện đại nên các em sẽ thấy giờ học được đổi mới",
        ],
        correct: 0,
        explanation:
          "'Dễ' và 'Khó' cho các em tự so mình với bạn: chọn 'Dễ' nghĩa là mình kém. Tên theo việc làm bỏ đi phép so sánh đó. Hình ảnh hấp dẫn, độ ngắn hay vẻ hiện đại đều là phụ, không phải lý do phân hoá bớt gắn nhãn.",
      },
      {
        question: "Bạn nhờ AI soạn ba mức bài. Điều gì cần giữ giống nhau ở cả ba mức?",
        options: [
          "Mục tiêu học",
          "Số câu hỏi trong mỗi mức",
          "Cách trình bày và phông chữ của mỗi phiếu bài tập",
          "Thời gian làm bài mỗi mức là đúng mười phút",
        ],
        correct: 0,
        explanation:
          "Ba mức là ba đường lên cùng một đỉnh: mục tiêu học phải như nhau, nếu không mức dễ thành bài học khác. Số câu, giao diện hay thời gian có thể khác theo mức. Điều quan trọng là mọi em cuối cùng đều chạm được mục tiêu.",
      },
      {
        question: "Bạn thấy em Tú luôn chọn mức thấp nhất dù làm bài kiểm tra khá tốt. Nên làm gì?",
        options: [
          "Nói riêng với em, hỏi lý do và gợi ý thử một câu ở mức cao hơn",
          "Chỉ định luôn em sang mức cao hơn từ tuần sau",
          "Thông báo trước lớp rằng em Tú nên chọn mức khó hơn",
          "Để em chọn mãi mức đó, vì tự do chọn nghĩa là không được can thiệp",
        ],
        correct: 0,
        explanation:
          "Nói riêng vừa giữ quyền chọn của em vừa cho bạn biết lý do, có thể là sợ sai. Chỉ định hoặc nói trước lớp làm em mất quyền chọn và bị chú ý. Để nguyên mãi thì bỏ qua một em có thể làm được nhiều hơn, và tự do chọn không có nghĩa là bạn không được gợi ý riêng.",
      },
      {
        question: "AI soạn mức 'Khám phá' với câu hỏi tính nhiều bước nhưng chưa có lời giải. Việc nên làm trước khi phát?",
        options: [
          "Tự giải từng câu để chắc đề có đáp án đúng",
          "Tin AI vì bài toán được soạn ra thì chắc chắn có đáp án đúng",
          "Chỉ xem lướt đề bài vì đáp án sẽ để học sinh tự tìm ra",
          "Nhờ AI giải luôn rồi so đáp án với chính bản nháp của nó",
        ],
        correct: 0,
        explanation:
          "AI có thể soạn câu có đáp án lệch, mơ hồ hoặc không giải được, và học sinh sẽ là người phát hiện trước bạn. Tự giải là cách đáng tin. Đáp án do chính AI viết không phải nguồn độc lập, và xem lướt bỏ qua rủi ro đó.",
      },
      {
        question: "Cuối tiết, cách nào cho bạn thông tin thật về việc phân hoá có hiệu quả?",
        options: [
          "Ghi mức em chọn và xem em hoàn thành mục tiêu chưa",
          "Hỏi cả lớp mức nào vui nhất",
          "Nhờ AI đánh giá xem ba mức bài có cân bằng không",
          "Đếm số phiếu đã nộp mà không xem nội dung bên trong",
        ],
        correct: 0,
        explanation:
          "Biết em chọn mức nào và có chạm mục tiêu chưa cho bạn biết mức nào cần chỉnh và em nào cần hỗ trợ. Mức 'vui nhất' không nói gì về học được. AI không thấy bài làm nên không đánh giá được, và đếm phiếu chỉ cho biết ai nộp.",
      },
      {
        question: "Vì sao không nên đưa danh sách em giỏi và em yếu vào AI để nó tự xếp bài?",
        options: [
          "Đó là dữ liệu cá nhân, và ba mức bài chỉ cần mô tả bài, không cần biết em nào",
          "Vì AI chỉ soạn được bài khi không biết học sinh là ai cả",
          "Vì danh sách dài làm AI nhầm mức bài giữa các em với nhau",
          "Vì AI luôn xếp các em theo thứ tự chữ cái tên bất kể yêu cầu",
        ],
        correct: 0,
        explanation:
          "AI dựng được ba mức bài chỉ từ mô tả mục tiêu và độ khó, không cần tên và xếp loại học sinh, vốn là dữ liệu cá nhân nên hỏi nhà trường trước khi đưa ra ngoài. AI soạn bài được khi biết học sinh, độ dài danh sách không làm nó nhầm theo cách đó, và nó không tự xếp theo bảng chữ cái.",
      },
    ],
    keyTakeaways: [
      "Cùng mục tiêu, nhiều mức bài, đặt tên theo việc làm.",
      "Để em tự chọn mức; gợi ý riêng khi cần, không chỉ định công khai.",
      "Tự giải bài AI soạn trước khi phát.",
      "Ghi mức em chọn và kết quả để chỉnh lần sau.",
      "Không cần đưa danh sách xếp loại học sinh vào AI.",
    ],
    practicePrompt: {
      question:
        "Bạn định phát phiếu vàng cho nhóm em yếu và phiếu xanh cho nhóm em giỏi, AI đề xuất cách này. Nên làm gì?",
      options: [
        "Đổi sang ba mức có tên theo việc làm và để em tự chọn",
        "Giữ nguyên vì phiếu màu là cách phân hoá rõ ràng nhất",
        "Đổi màu phiếu sang cam và tím để không giống xếp loại",
        "Phát cả hai phiếu cho mọi em nhưng chỉ chấm phiếu xanh",
      ],
      correct: 0,
      explanation:
        "Phiếu vàng và xanh theo nhóm học lực vẫn cho cả lớp nhìn ra thứ hạng, kể cả khi bạn đổi màu. Mức có tên theo việc làm và em tự chọn bỏ được gắn nhãn. Phát cả hai phiếu rồi chỉ chấm một loại là bất công với em làm phiếu còn lại.",
    },
    summary: {
      keyIdea: "Phân hoá tốt là nhiều đường lên cùng một mục tiêu, để em tự chọn mà không ai bị xếp loại.",
      formula: "Một mục tiêu → ba mức đặt tên theo việc làm → em chọn → bạn gợi ý riêng → ghi lại để chỉnh.",
      commonMistake: "Phát phiếu màu theo điểm số để cả lớp nhìn ra ai ở nhóm nào.",
      action: "Lần tới giao bài, soạn ba mức đặt tên theo việc làm và cho em tự chọn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bài tập bạn sắp giao. Nhờ AI soạn ba mức bài cùng mục tiêu, không dán tên em nào, đặt tên mức theo việc làm. Tự giải từng câu để chắc đáp án, chọn cách nói khi phát bài, và viết một câu bạn sẽ nói riêng với em hay chọn mức thấp.",
      secondary: "Dự đoán trước em nào có thể chọn mức bất ngờ, sau tiết đối chiếu với thực tế.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn muốn giao bài khác nhau cho các em khác nhau nhưng không muốn ai thấy mình bị xếp loại. Bài này dạy cách dùng AI soạn nhiều mức bài và trình bày sao cho em nào cũng chọn được.",
      },
      {
        type: "feynman",
        title: "Bài tập phân hoá đơn giản hơn bạn nghĩ",
        intro: "Ở quán ăn, không ai bị chỉ định 'bàn dành cho người ăn ít'. Thực đơn có nhiều món, mỗi người tự chọn theo bụng đói, và người phục vụ khéo thì gợi ý riêng nhỏ nhẹ.",
        columns: ["Thành phần", "Quán ăn", "Bài tập phân hoá"],
        rows: [
          ["Thực đơn", "Nhiều món cho một bữa", "Ba mức bài cùng mục tiêu"],
          ["Tên món", "Tên mô tả món", "Tên mức mô tả việc làm"],
          ["Người chọn", "Khách tự chọn", "Em tự chọn mức"],
          ["Người phục vụ", "Gợi ý nhỏ nhẹ", "Bạn gợi ý riêng khi cần"],
        ],
        oneLiner: "Cho các em chọn từ thực đơn thay vì chỉ định bàn: ai cũng có phần, không ai bị gắn nhãn.",
      },
      { type: "heading", text: "Nhãn không cần nói ra cũng vẫn hiện" },
      {
        type: "paragraph",
        text: "Các em rất nhạy với thứ hạng. Phiếu màu, nhóm ngồi hay cách gọi tên đều đủ để cả lớp hiểu ai giỏi, ai yếu. Một em bị xếp vào nhóm thấp lâu dần tin điều đó và làm ít hơn khả năng của mình. Phân hoá vẫn cần thiết, nhưng cách trình bày quyết định nó giúp hay làm hại.",
      },
      {
        type: "flow",
        title: "Từ một mục tiêu tới bài tập ai cũng chọn được",
        steps: [
          { label: "Chốt một mục tiêu", detail: "Viết một câu: cuối bài các em làm được gì. Ba mức bài cùng dẫn tới mục tiêu này." },
          { label: "Nhờ AI soạn ba mức", detail: "Yêu cầu AI soạn ba mức với độ khó tăng dần và cùng mục tiêu; không đưa tên hay xếp loại em nào." },
          { label: "Đặt tên theo việc làm", detail: "Đặt tên như Khởi động, Tăng tốc, Khám phá. Tránh Dễ, Vừa, Khó vì các em hiểu ngay là đang bị xếp hạng." },
          { label: "Tự giải và soát", detail: "Bạn giải từng câu để chắc đáp án đúng và đề không mơ hồ. AI có thể soạn câu có đáp án lệch." },
          { label: "Để em chọn, bạn gợi ý riêng", detail: "Em tự chọn và được đổi giữa chừng. Nếu em chọn mãi mức thấp hoặc mức quá cao, nói riêng chứ không nói trước lớp." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ba mức em tự chọn",
          text: "Không ai bị chỉ định, nên không ai bị xếp loại công khai. Em đổi mức được khi thấy quá dễ hoặc quá khó. Bạn nhìn ra em nào chọn lệch và nói riêng.",
        },
        right: {
          label: "Nhóm và phiếu màu theo điểm",
          text: "Cả lớp nhìn ra ngay ai ở nhóm nào. Em ở nhóm thấp mất động lực, em ở nhóm cao thấy mình phải giữ vị trí. Rất khó đổi nhóm sau khi đã dán nhãn.",
        },
      },
      {
        type: "scenario",
        title: "Bốn mức bài và một lớp 35 em",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có ba mức bài AI soạn cho bài phân số. Cuối tiết trước, bạn thấy vài em xong quá nhanh và vài em còn lúng túng.",
            choices: [
              { label: "Phát phiếu vàng cho em còn lúng túng, phiếu xanh cho em xong nhanh", next: "bad_color" },
              { label: "Đặt tên ba mức theo việc làm và nói 'chọn mức hôm nay em thấy hợp'", next: "s2" },
            ],
          },
          bad_color: {
            text: "Một em cầm phiếu vàng hỏi nhỏ: 'Cô ơi em ngu hơn bạn ạ?' Hai em đổi phiếu với nhau cho đỡ ngại và bài hôm đó lệch mục tiêu.",
            ending: "bad",
          },
          s2: {
            text: "Phần lớn các em chọn xong. Em Tú, vốn làm bài khá, chọn mức thấp nhất.",
            choices: [
              { label: "Nói thẳng trước lớp: 'Tú, em phải chọn mức Khám phá đi'", next: "bad_public" },
              { label: "Đến bàn Tú nói nhỏ, hỏi vì sao và gợi ý thử một câu mức trên", next: "s3" },
            ],
          },
          bad_public: {
            text: "Tú đỏ mặt và làm bài mức Khám phá trong im lặng, không hỏi ai. Từ hôm sau em không dám tự chọn nữa.",
            ending: "bad",
          },
          s3: {
            text: "Tú nói em sợ sai trước bạn. Bạn gợi ý em làm câu đầu của mức trên, nếu khó thì quay lại được.",
            choices: [
              { label: "Ghi lại mức em chọn và kết quả để buổi sau chỉnh", next: "good" },
              { label: "Không ghi gì vì thấy Tú đã vui vẻ làm bài", next: "bad_log" },
            ],
          },
          bad_log: {
            text: "Tuần sau bạn không nhớ Tú đã thử mức nào. Bạn lại phải hỏi từ đầu, và Tú thấy cô không thật sự để ý.",
            ending: "bad",
          },
          good: {
            text: "Tuần sau, bạn thấy Tú tự chọn mức giữa. Bảng ghi giúp bạn chỉnh các mức và biết em nào cần hỗ trợ thêm.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI soạn ba mức bài phân hoá",
        task: "Bạn cần ba mức bài về cộng phân số cùng mẫu số cho lớp 5, cùng mục tiêu, tên mức không gắn nhãn. Lắp prompt để AI soạn.",
        parts: [
          {
            id: "goal",
            label: "Mục tiêu chung",
            options: [
              { text: "Soạn bài tập phân số cho các em giỏi và các em yếu.", feedback: "Bài soạn theo nhóm học lực, dễ thành hai bộ bài với mục tiêu khác nhau." },
              { text: "Mục tiêu: cộng được hai phân số cùng mẫu số; soạn ba mức đều dẫn tới mục tiêu này.", good: true, feedback: "Ba mức cùng đích, chỉ khác độ dốc của đường đi." },
            ],
          },
          {
            id: "name",
            label: "Tên các mức",
            options: [
              { text: "Đặt tên mức là Dễ, Vừa và Khó.", feedback: "Tên xếp hạng khiến em chọn Dễ tự thấy mình kém." },
              { text: "Đặt tên theo việc làm: Khởi động, Tăng tốc, Khám phá.", good: true, feedback: "Tên mô tả việc, nên em chọn theo hứng thú và không thấy bị xếp loại." },
            ],
          },
          {
            id: "student",
            label: "Thông tin về học sinh",
            options: [
              { text: "Dưới đây là danh sách em giỏi, khá, yếu của lớp tôi.", feedback: "Đưa dữ liệu học sinh ra ngoài không cần thiết, và AI dễ soạn theo nhóm gắn nhãn." },
              { text: "Không đưa tên hay xếp loại em nào; lớp có nhiều trình độ khác nhau.", good: true, feedback: "AI có đủ để soạn ba mức mà bạn không phải chia sẻ dữ liệu cá nhân của học sinh." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "name", "student"],
            text: "Khởi động: 1/5 + 2/5; 3/7 + 2/7 kèm hình minh hoạ.\nTăng tốc: 4/9 + 3/9; bài toán lời văn ngắn về chia bánh.\nKhám phá: hai bạn cùng ăn phần bánh, tổng có vượt một cái bánh không?\nCả ba mức đều kết thúc bằng câu: tại sao mẫu số giữ nguyên?",
          },
          {
            requires: ["goal"],
            text: "Mức Dễ: cộng phân số có hình. Mức Vừa: cộng không hình. Mức Khó: lời văn nhiều bước.\n(Đúng mục tiêu nhưng tên mức là Dễ, Vừa, Khó nên các em vẫn xếp hạng nhau.)",
          },
          {
            text: "Nhóm giỏi: bài tập nâng cao về hỗn số. Nhóm khá: bài tập trung bình. Nhóm yếu: bài tập cơ bản đọc lại quy tắc. (Ba bộ bài khác mục tiêu, gắn nhãn nhóm.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Chọn mức không có nghĩa là bỏ mặc",
        text: "Cho em quyền chọn không thay việc bạn quan sát. Em chọn mãi mức thấp hay mức quá cao đều cần bạn gợi ý riêng. Việc hỗ trợ học sinh có nhu cầu đặc biệt thì làm theo quy định của nhà trường và hỏi ban giám hiệu hoặc chuyên gia.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chốt một mục tiêu duy nhất cho cả lớp.",
          "Bước 2 - Nhờ AI soạn ba mức, đặt tên theo việc làm, không đưa dữ liệu em nào.",
          "Bước 3 - Tự giải mỗi câu, rồi để em tự chọn mức.",
          "Bước 4 - Ghi mức em chọn và kết quả, nói riêng với em cần gợi ý.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nhiều đường cùng một đích, em tự chọn, bạn gợi ý riêng: đó là phân hoá không gắn nhãn.",
          "Bài sau: mini project gói hỗ trợ cho ba học sinh ở ba tình huống.",
        ],
      },
    ],
  },
  {
    id: 2034,
    slug: "mini-project-goi-ho-tro-ba-hoc-sinh",
    title: "Chặng 31, Bài 15: Mini project: gói hỗ trợ cho ba học sinh ở ba tình huống",
    subtitle: "Ba em, ba trang hỗ trợ ngắn: cùng một khung, mỗi trang một nhu cầu riêng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trong lớp bạn có em vừa nghỉ ốm dài ngày, em làm nhanh nhưng chán, và em chưa tự tin phát biểu. Mỗi em cần một thứ khác, nhưng bạn chỉ có 20 phút trong tối nay. Bài cuối phần này ghép mọi thứ đã học: nhận xét đúng hồ sơ, cách giải thích thứ hai, bài tập không gắn nhãn, thành một trang hỗ trợ ngắn cho mỗi em.",
    openingQuestion:
      "Bạn cần làm gói hỗ trợ cho ba em có ba nhu cầu khác nhau trong 20 phút. Cách làm nào hiệu quả nhất?",
    openingOptions: [
      "Dùng một khung chung cho cả ba, điền nhu cầu riêng vào từng trang rồi soát",
      "Nhờ AI viết một gói hỗ trợ chung cho cả ba em cho nhanh",
      "Chép nguyên gói hỗ trợ của em giống nhất trong các năm trước",
      "Nhờ AI viết cả ba trang từ đầu mà không cho biết nhu cầu từng em",
    ],
    correctOption: 0,
    explanation:
      "Khung chung tiết kiệm thời gian vì ba trang cùng có mục tiêu, việc làm và cách theo dõi, còn phần nhu cầu riêng là chỗ bạn điền. Gói chung cho cả ba làm mất chỗ riêng của từng em. Chép gói của năm trước bỏ qua em thật đang đứng đó. Viết cả ba trang mà AI không biết nhu cầu thì ra ba trang giống hệt nhau.",
    diagram: [
      { label: "Ghi nhu cầu thật của ba em, không dùng tên thật", arrow: true },
      { label: "Nhờ AI dựng khung: mục tiêu, việc làm, cách theo dõi", arrow: true },
      { label: "Điền riêng từng em và soát theo hồ sơ", arrow: true },
      { label: "Đặt lịch xem lại sau hai tuần để chỉnh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Vy có ba em: em A nghỉ ốm hai tuần, em B xong bài rất nhanh rồi làm việc riêng, em C ngại phát biểu. Cô dùng một khung ba dòng: mục tiêu trong hai tuần, hai việc nhỏ mỗi ngày, cách cô theo dõi. Trang của A là học bù ba bài trọng tâm, của B là một câu hỏi mở thêm, của C là một lần nói với một bạn trước khi nói với cả lớp.",
    },
    quiz: [
      {
        question: "Vì sao dùng một khung chung cho ba trang hỗ trợ?",
        options: [
          "Khung chung đảm bảo mỗi trang đủ mục tiêu, việc làm và cách theo dõi, phần riêng là nhu cầu của em",
          "Khung chung làm ba trang trông giống nhau nên các em không so sánh",
          "Khung chung cho phép AI viết hộ toàn bộ phần nhu cầu riêng",
          "Khung chung giúp bạn khỏi phải soát lại từng trang trước khi phát",
        ],
        correct: 0,
        explanation:
          "Khung chung giữ cho trang nào cũng đủ ba phần, còn nhu cầu riêng vẫn do bạn điền theo từng em. Trang giống hệt nhau không phải mục tiêu, AI không viết hộ được phần nhu cầu vì nó không biết em, và soát lại vẫn là việc bắt buộc.",
      },
      {
        question: "Trang hỗ trợ cho em nghỉ ốm hai tuần nên bắt đầu từ đâu?",
        options: [
          "Ba bài trọng tâm phải học bù",
          "Toàn bộ nội dung đã học trong hai tuần em vắng, theo đúng thứ tự thời khoá biểu",
          "Nhận xét về sự chăm chỉ và thái độ học tập của em trước khi nghỉ ốm",
          "Danh sách những bạn đã học xong để em so sánh tiến độ cho có động lực",
        ],
        correct: 0,
        explanation:
          "Em vắng nhiều nên cần ưu tiên: ba bài quyết định việc học tiếp. Học bù mọi thứ theo đúng thứ tự làm em quá tải. Nhận xét thái độ không giúp bắt kịp bài, và so tiến độ với bạn dễ làm em nản hơn là có động lực.",
      },
      {
        question: "AI viết trong trang cho em C: 'Em C hay ngại vì thiếu tự tin do gia đình.' Bạn nên làm gì?",
        options: [
          "Xoá câu nguyên nhân và chỉ ghi điều quan sát được",
          "Giữ nguyên vì AI thường nhận ra nguyên nhân sâu xa tốt hơn giáo viên",
          "Chuyển câu này cho phụ huynh xem",
          "Sửa 'gia đình' thành 'hoàn cảnh' cho dễ nghe hơn rồi giữ nguyên",
        ],
        correct: 0,
        explanation:
          "AI không biết gia đình em, câu đó là suy đoán về một đứa trẻ và có thể sai và tổn thương. Chỉ ghi điều bạn thấy, ví dụ 'em ít giơ tay trong tiết thảo luận'. Chuyển suy đoán cho phụ huynh hay đổi từ ngữ không làm nó có căn cứ. Việc liên quan tới hoàn cảnh gia đình hoặc tâm lý của em, trao đổi với nhà trường và người phụ trách.",
      },
      {
        question: "Bạn làm xong ba trang. Bước nào giúp biết gói hỗ trợ có tác dụng?",
        options: [
          "Đặt lịch xem lại sau hai tuần với dấu hiệu cụ thể",
          "Hỏi ba em có thích trang hỗ trợ không rồi ghi lại câu trả lời",
          "Nhờ AI chấm điểm ba trang xem trang nào tốt nhất",
          "Chờ tới cuối kỳ xem điểm ba em có tăng không",
        ],
        correct: 0,
        explanation:
          "Lịch xem lại sau hai tuần với dấu hiệu rõ, như em A làm xong ba bài học bù, cho bạn thời điểm và thước đo để chỉnh. Em thích hay không chưa nói là có tác dụng. AI không thấy các em thật, và chờ cuối kỳ thì đã muộn để sửa kế hoạch.",
      },
      {
        question: "Ba trang hỗ trợ đều có câu 'em cần cố gắng hơn'. Điều đó cho thấy gì?",
        options: [
          "AI đang lặp câu mẫu và cần thay bằng việc cụ thể",
          "Cả ba em đều thiếu cố gắng như nhau nên cần nhắc lại",
          "Đó là câu chuẩn nên giữ để các trang thống nhất",
          "Đó là chỗ AI hiểu đúng nhất về cả ba em",
        ],
        correct: 0,
        explanation:
          "Cùng một câu chung ở ba trang cho ba nhu cầu khác nhau là dấu hiệu AI dùng mẫu, không phải quan sát. Ba em có ba tình huống, và 'cố gắng hơn' không cho em biết làm gì. Câu chuẩn hay thống nhất không phải lý do để giữ một lời khuyên rỗng.",
      },
    ],
    keyTakeaways: [
      "Một khung chung, phần nhu cầu riêng điền theo từng em.",
      "Ưu tiên việc quan trọng nhất cho em cần bắt kịp.",
      "Chỉ ghi điều quan sát được, không đoán nguyên nhân.",
      "Đặt lịch xem lại với dấu hiệu cụ thể.",
      "Câu giống nhau ở nhiều trang là dấu hiệu mẫu chung.",
    ],
    practicePrompt: {
      question:
        "Trang hỗ trợ AI nháp cho em B (xong bài nhanh rồi làm việc riêng) chỉ ghi: 'Em B cần thêm bài tập.' Bạn nên làm gì?",
      options: [
        "Đổi thành một thử thách mở cụ thể và cách bạn theo dõi",
        "Giữ nguyên vì thêm bài tập là cách xử lý em giỏi phổ biến nhất",
        "Phạt em vì làm việc riêng trong giờ để em biết kỷ luật",
        "Nhờ AI thêm hai mươi bài tập nữa cho em B làm hết tiết",
      ],
      correct: 0,
      explanation:
        "Em xong nhanh thường cần điều để nghĩ, không cần thêm lượng bài giống nhau. Một thử thách mở kèm cách theo dõi giữ em bận và cho bạn thông tin. Thêm bài tập cùng loại chỉ làm em chán, phạt bỏ qua nguyên nhân, và hai mươi bài cho đủ tiết cũng không giúp em học thêm gì.",
    },
    summary: {
      keyIdea: "Ba em, ba nhu cầu, một khung: AI giúp dựng khung nhanh, bạn điền cái riêng của từng em.",
      formula: "Nhu cầu thật → khung chung → điền riêng → soát → hẹn xem lại sau hai tuần.",
      commonMistake: "Để AI viết cả ba trang mà không cho biết nhu cầu, nhận về ba bản giống nhau.",
      action: "Chọn ba em và làm mỗi em một trang hỗ trợ ngắn theo khung này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba em có nhu cầu khác nhau (ví dụ vừa nghỉ dài, xong nhanh, ngại phát biểu). Ghi nhu cầu bằng mã, không dùng tên. Nhờ AI dựng khung ba dòng: mục tiêu hai tuần, hai việc nhỏ mỗi ngày, cách bạn theo dõi. Điền riêng từng em, xoá mọi câu đoán nguyên nhân và đặt lịch xem lại sau hai tuần.",
      secondary: "Đếm số câu giống nhau giữa ba trang và thay bằng việc cụ thể.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài ghép: bạn làm cho ba em ba trang hỗ trợ ngắn trong 20 phút, dùng những gì đã học về nhận xét đúng hồ sơ, cách giải thích khác và bài tập không gắn nhãn.",
      },
      {
        type: "feynman",
        title: "Gói hỗ trợ cho từng em đơn giản hơn bạn nghĩ",
        intro: "Đầu bếp làm ba món khác nhau cho ba khách nhưng dùng chung một bộ nồi, chung một quy trình: sơ chế, nấu, nêm nếm. Khung chung là bộ nồi, phần riêng của từng em là gia vị.",
        columns: ["Thành phần", "Bếp nhà hàng", "Gói hỗ trợ"],
        rows: [
          ["Quy trình chung", "Sơ chế, nấu, nêm", "Mục tiêu, việc làm, cách theo dõi"],
          ["Gia vị riêng", "Khẩu vị từng khách", "Nhu cầu thật của từng em"],
          ["Người nếm", "Đầu bếp nếm thử", "Bạn soát theo hồ sơ thật"],
          ["Phục vụ", "Mang ra đúng bàn", "Trang riêng đúng em, không lộ với lớp"],
        ],
        oneLiner: "Một khung, ba nhu cầu: AI dựng khung, bạn nêm phần riêng.",
      },
      { type: "heading", text: "Ba em, ba câu hỏi khác nhau" },
      {
        type: "paragraph",
        text: "Em nghỉ ốm hỏi 'phải học bù gì trước'. Em xong nhanh hỏi 'tôi làm gì tiếp'. Em ngại phát biểu hỏi 'làm sao dám nói'. Cùng một giáo viên, cùng một tuần học, nhưng cần ba trang khác nhau. Khung chung giúp bạn không phải nghĩ lại cấu trúc mỗi lần, để tập trung vào điều riêng của từng em.",
      },
      {
        type: "flow",
        title: "Làm ba trang hỗ trợ trong 20 phút",
        steps: [
          { label: "Ghi nhu cầu bằng mã", detail: "Ghi ngắn: em A vắng hai tuần, em B xong nhanh, em C ít giơ tay. Dùng mã thay tên khi nháp với AI." },
          { label: "Dựng khung chung", detail: "Nhờ AI khung ba dòng: mục tiêu trong hai tuần, hai việc nhỏ mỗi ngày, cách bạn theo dõi." },
          { label: "Điền phần riêng", detail: "Em A: ba bài trọng tâm phải học bù. Em B: một thử thách mở. Em C: nói với một bạn trước khi nói với cả lớp." },
          { label: "Soát theo hồ sơ", detail: "Xoá câu đoán nguyên nhân, xoá câu giống nhau giữa ba trang và đối chiếu điều AI viết với điều bạn quan sát." },
          { label: "Hẹn xem lại", detail: "Đặt lịch sau hai tuần với dấu hiệu rõ, như em A làm xong ba bài, em C tự giơ tay ít nhất một lần." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Yêu cầu AI dựng khung và điền phần riêng cho em C",
        task: "Em C (mã) ít giơ tay phát biểu, làm bài viết khá tốt. Bạn cần trang hỗ trợ hai tuần. Lắp prompt để AI dựng trang cho em này.",
        parts: [
          {
            id: "need",
            label: "Nhu cầu và điều đã quan sát",
            options: [
              { text: "Em C là học sinh nhút nhát, hãy giúp em tự tin.", feedback: "Nhãn 'nhút nhát' là kết luận, AI sẽ dựng trang theo nhãn thay vì theo điều bạn thấy." },
              { text: "Em C (mã) ít giơ tay trong tiết thảo luận, làm bài viết khá tốt.", good: true, feedback: "Chỉ điều quan sát được, AI đề xuất bước nhỏ hợp với hành vi thật." },
            ],
          },
          {
            id: "frame",
            label: "Khung của trang",
            options: [
              { text: "Viết một đoạn tư vấn dài cho em C.", feedback: "Đoạn tư vấn dài hiếm khi có việc làm cụ thể và khó theo dõi." },
              { text: "Ba dòng: mục tiêu hai tuần, hai việc nhỏ mỗi ngày, cách cô theo dõi.", good: true, feedback: "Khung ba dòng cho việc làm cụ thể và cách bạn biết em có tiến bộ hay không." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn với AI",
            options: [
              { text: "Hãy tự suy ra nguyên nhân em ngại và ghi vào trang.", feedback: "AI sẽ đoán nguyên nhân về gia đình hoặc tính cách mà không ai kiểm được." },
              { text: "Chỉ dựa trên điều tôi mô tả; không suy đoán nguyên nhân hay tâm lý em.", good: true, feedback: "Trang không có câu đoán, phần nguyên nhân để bạn hỏi em hoặc trao đổi với người phụ trách." },
            ],
          },
        ],
        responses: [
          {
            requires: ["need", "frame", "limit"],
            text: "Mục tiêu 2 tuần: em C nói một câu trong nhóm nhỏ mỗi tuần.\nViệc nhỏ: (1) viết sẵn một câu trả lời vào vở trước tiết; (2) nói câu đó với một bạn ngồi cạnh.\nCô theo dõi: ghi số lần em nói trong nhóm nhỏ; xem lại sau hai tuần.",
          },
          {
            requires: ["need"],
            text: "Em C thiếu tự tin, có thể do áp lực từ gia đình. Cô nên động viên em nhiều hơn và khuyến khích em mạnh dạn phát biểu.\n(Bám đúng hành vi nhưng tự thêm nguyên nhân về gia đình mà bạn không hề nêu.)",
          },
          {
            text: "Em C nhút nhát, hướng nội, ngại giao tiếp. Nên tổ chức các hoạt động rèn luyện sự tự tin và cố gắng hơn nữa trong học tập.\n(Toàn nhãn và câu chung, không có việc nào bạn làm được ngay.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tối thứ Tư, ba trang hỗ trợ và 20 phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có ba em cần hỗ trợ: em A nghỉ ốm hai tuần, em B xong nhanh rồi làm việc riêng, em C ngại phát biểu. Bạn chỉ có 20 phút tối nay.",
            choices: [
              { label: "Bảo AI viết ba trang hỗ trợ và in ngay, không cần mô tả từng em", next: "bad_generic" },
              { label: "Ghi nhu cầu từng em bằng mã, nhờ AI dựng khung rồi điền phần riêng", next: "s2" },
            ],
          },
          bad_generic: {
            text: "Ba trang giống nhau tới từng câu: 'cần cố gắng hơn, phát huy mặt mạnh'. Em A vẫn không biết bài nào phải học bù, em B vẫn làm việc riêng, và em C không biết làm gì trước.",
            ending: "bad",
          },
          s2: {
            text: "Khung ba dòng đã có. Trang em C ghi 'em thiếu tự tin do gia đình' mà bạn không nêu điều đó.",
            choices: [
              { label: "Giữ câu đó vì AI đọc nhiều nên chắc biết nguyên nhân", next: "bad_guess" },
              { label: "Xoá câu, chỉ ghi điều bạn thấy: em ít giơ tay, viết bài khá tốt", next: "s3" },
            ],
          },
          bad_guess: {
            text: "Phụ huynh em C đọc trang và thấy nhắc tới gia đình. Họ cảm thấy bị đánh giá, và bạn mất nhiều buổi để lấy lại lòng tin.",
            ending: "bad",
          },
          s3: {
            text: "Ba trang xong, mỗi trang đủ mục tiêu, việc nhỏ và cách theo dõi. Bạn còn năm phút.",
            choices: [
              { label: "Đặt lịch xem lại sau hai tuần với dấu hiệu rõ cho từng em", next: "good" },
              { label: "Cất ba trang vào ngăn kéo và tin là các em sẽ tự tiến bộ", next: "bad_drawer" },
            ],
          },
          bad_drawer: {
            text: "Hai tuần sau bạn quên các trang này. Em A vẫn thiếu ba bài, em B vẫn chán, em C vẫn chưa nói câu nào trong nhóm.",
            ending: "bad",
          },
          good: {
            text: "Hai tuần sau, em A đã học bù xong ba bài, em C nói được một câu trong nhóm nhỏ. Bạn chỉnh lại trang em B vì thử thách chưa đủ hấp dẫn.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Chuyện riêng của em ở lại với người cần biết",
        text: "Trang hỗ trợ chỉ nên chứa điều bạn quan sát và việc làm cụ thể, cất ở nơi an toàn và chỉ chia sẻ với người có trách nhiệm. Khi liên quan tới sức khoẻ, hoàn cảnh gia đình hoặc tâm lý, hỏi ban giám hiệu hay người phụ trách trong trường thay vì tự kết luận.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi nhu cầu ba em bằng mã, chỉ điều quan sát được.",
          "Bước 2 - Nhờ AI dựng khung ba dòng và điền phần riêng.",
          "Bước 3 - Xoá câu đoán nguyên nhân và câu giống nhau giữa ba trang.",
          "Bước 4 - Đặt lịch xem lại sau hai tuần với dấu hiệu cụ thể.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một khung chung, phần riêng do bạn nêm: đó là cách hỗ trợ từng em mà vẫn kịp trong 20 phút.",
          "Bài sau: dấu hiệu bài làm do AI viết và giới hạn của máy dò.",
        ],
      },
    ],
  },
];
