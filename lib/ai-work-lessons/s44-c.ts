import type { Lesson } from "../lesson-types";

// Chặng 44, bài 11-15. Giáo trình: scripts/curriculum/stage-44.json.
// Không nêu giới hạn kích thước/số lượng cụ thể, giá hay đường dẫn nút bấm của bất kỳ công cụ nào:
// những thứ đó đổi liên tục và chưa được kiểm chứng ở đây; bài chỉ dạy cách chia nhỏ và kiểm nguồn.
export const S44_C_LESSONS: Lesson[] = [
  {
    id: 2290,
    slug: "tong-hop-ba-tai-lieu-thanh-mot-ban-tom-tat",
    title: "Chặng 44, Bài 11: Tổng hợp ba tài liệu thành một bản tóm tắt",
    subtitle: "Ba báo cáo, ba giọng kể: nhờ trợ lý xếp điểm chung và điểm lệch, rồi bạn mở nguồn xác nhận.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng bạn thường phải ghép báo cáo của nhiều phòng ban thành một trang cho sếp. Nếu nhờ tổng hợp mà không dặn cách trình bày, bạn nhận một đoạn văn mượt trong đó không ai biết ý nào từ báo cáo nào, và điểm mâu thuẫn bị làm phẳng mất. Nhờ đúng cách thì ba tài liệu thành một bản có nguồn từng ý.",
    openingQuestion:
      "Bạn tải báo cáo của phòng Kinh doanh, Kho và Kế toán lên trợ lý đọc tài liệu và nhờ tổng hợp. Bản trả lời là một đoạn văn liền mạch, không ghi nguồn. Vấn đề lớn nhất là gì?",
    openingOptions: [
      "Bạn không biết ý nào lấy từ báo cáo nào nên không kiểm được",
      "Đoạn văn liền mạch quá dài, sếp sẽ không đọc hết được trong một lần",
      "Trợ lý chỉ đọc được một trong ba báo cáo mỗi lần hỏi",
      "Giọng văn của đoạn tổng hợp quá trang trọng cho sếp",
    ],
    correctOption: 0,
    explanation:
      "Tổng hợp tốt không chỉ là ngắn gọn mà là truy được về nguồn. Khi ba báo cáo trộn thành một đoạn, một con số sai hay một chỗ hai phòng nói khác nhau bị làm phẳng thành câu nghe hợp lý, và bạn không biết mở báo cáo nào để đối chiếu. Độ dài và giọng văn sửa được trong vài giây; còn ý không rõ nguồn thì bạn phải đọc lại cả ba tài liệu, đúng việc bạn muốn tránh.",
    diagram: [
      { label: "Tải lên ba báo cáo, đặt tên rõ từng file", arrow: true },
      { label: "Nhờ xếp: điểm chung, điểm khác, kèm nguồn từng ý", arrow: true },
      { label: "Bản tổng hợp có ghi báo cáo nào, đoạn nào", arrow: true },
      { label: "Bạn mở nguồn xác nhận các ý quan trọng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trợ lý điều hành phải gộp báo cáo tuần của ba phòng thành một trang cho giám đốc. Cô nhờ trợ lý đọc tài liệu liệt kê điểm chung, điểm lệch và ghi tên báo cáo cạnh mỗi ý. Nhờ bảng điểm lệch, cô thấy hai phòng dùng hai mốc thời gian khác nhau cho cùng một chỉ số, hỏi lại từng phòng trước khi gửi. Đây là tình huống giả định để minh hoạ cách làm.",
    },
    quiz: [
      {
        question: "Cách nhờ nào giúp bản tổng hợp ba báo cáo kiểm chứng được?",
        options: [
          "Yêu cầu chia thành điểm chung và điểm khác, mỗi ý ghi rõ lấy từ báo cáo nào",
          "Yêu cầu viết một đoạn văn thống nhất, không cần ghi nguồn cho gọn",
          "Chỉ hỏi ba báo cáo nói gì rồi tin vào câu trả lời đầu tiên",
          "Dán ba báo cáo thành một khối để công cụ tự chia ý",
        ],
        correct: 0,
        explanation:
          "Chia điểm chung, điểm khác và gắn nguồn cho từng ý cho phép bạn mở đúng báo cáo để đối chiếu. Viết thành một đoạn thống nhất làm mất dấu nguồn. Tin câu trả lời đầu là bỏ bước kiểm. Dán thành một khối khiến công cụ không phân biệt được ý thuộc file nào.",
      },
      {
        question: "Trong bản tổng hợp, phần nào cần bạn đọc kỹ nhất?",
        options: [
          "Điểm hai báo cáo nói khác nhau về cùng một việc",
          "Câu mở đầu nói ba báo cáo này được gửi từ những phòng ban nào",
          "Câu cuối chúc sếp một tuần làm việc thật hiệu quả và thuận lợi",
          "Tiêu đề của bản tổng hợp mà công cụ tự đề xuất cho bạn",
        ],
        correct: 0,
        explanation:
          "Chỗ lệch là nơi có rủi ro: có thể một bên sai, hoặc hai bên đo khác nhau, hoặc công cụ hiểu nhầm. Câu mở đầu, lời chúc và tiêu đề sai thì bạn nhìn là sửa được và không đổi quyết định của ai.",
      },
      {
        question: "Ba báo cáo đều ghi doanh thu quý nhưng con số khác nhau. Bạn nên làm gì?",
        options: [
          "Hỏi từng phòng họ tính theo cách nào",
          "Lấy trung bình ba con số cho công bằng và ghi vào bản tóm tắt",
          "Chọn con số lớn nhất vì nó thể hiện kết quả tốt nhất của công ty",
          "Bỏ hẳn dòng doanh thu khỏi bản tổng hợp để khỏi mâu thuẫn",
        ],
        correct: 0,
        explanation:
          "Các con số khác nhau thường do cách tính khác nhau (trước hay sau chiết khấu, theo ngày ghi nhận hay ngày thu tiền). Trung bình hay chọn số lớn nhất là tự bịa ra một con số không ai báo cáo, còn bỏ dòng doanh thu là giấu đúng chỗ sếp cần biết.",
      },
      {
        question: "Vì sao nên đặt tên file rõ ràng trước khi tải ba báo cáo lên?",
        options: [
          "Để câu trả lời ghi được nguồn dễ nhận ra, ví dụ Kho_T9 hay KeToan_T9",
          "Vì công cụ chỉ đọc được file có tên dài hơn mười ký tự",
          "Vì file có tên ngắn sẽ bị công cụ tự động xoá khỏi danh sách nguồn của bạn",
          "Vì tên file quyết định mức độ tin cậy công cụ gán cho nội dung",
        ],
        correct: 0,
        explanation:
          "Tên file thường xuất hiện trong phần nguồn, nên tên như bao-cao-1, bao-cao-2 khiến bạn khó nhớ ý nào của phòng nào. Công cụ không loại file vì tên ngắn, và không chấm độ tin cậy theo tên.",
      },
      {
        question: "Bản tổng hợp ghi: 'Cả ba phòng đều đồng ý cần tuyển thêm người.' Bạn kiểm thế nào?",
        options: [
          "Mở từng báo cáo tìm ý tuyển thêm người và xem có đúng cả ba không",
          "Tin luôn vì công cụ đã đọc cả ba báo cáo trước khi viết",
          "Hỏi lại công cụ câu này có đúng không rồi tin câu trả lời",
          "Chỉ mở báo cáo đầu tiên, nếu đúng thì hai báo cáo còn lại cũng đúng",
        ],
        correct: 0,
        explanation:
          "Câu 'cả ba đều' là khẳng định mạnh, chỉ cần một phòng không nói vậy là sai. Hỏi lại chính công cụ không phải kiểm chứng, và một báo cáo đúng không chứng minh hai báo cáo kia.",
      },
    ],
    keyTakeaways: [
      "Nhờ tổng hợp theo khung: điểm chung, điểm khác, và nguồn cho từng ý.",
      "Đặt tên file dễ nhận để phần nguồn đọc được.",
      "Điểm hai tài liệu lệch nhau là chỗ cần đọc kỹ và hỏi lại người viết.",
      "Khẳng định kiểu 'cả ba đều' phải kiểm ở cả ba nguồn.",
    ],
    practicePrompt: {
      question:
        "Hai trong ba báo cáo ghi 'giao hàng đúng hạn 95%', báo cáo thứ ba ghi 88%. Bản tổng hợp chỉ ghi '95%'. Nên làm gì?",
      options: [
        "Yêu cầu ghi cả hai con số kèm nguồn, rồi hỏi phòng ghi 88% cách tính",
        "Giữ 95% vì đa số báo cáo ghi vậy, số ít bị coi là ngoại lệ, nên bỏ số 88%",
        "Ghi trung bình 92,7% (= (95 + 95 + 88) / 3) cho công bằng",
        "Bỏ dòng này vì các báo cáo không thống nhất với nhau",
      ],
      correct: 0,
      explanation:
        "Đa số không chứng minh đúng: phòng ghi 88% có thể dùng định nghĩa nghiêm hơn. Trung bình ba số là con số không ai báo cáo. Bỏ dòng thì mất thông tin quan trọng. Ghi cả hai kèm nguồn rồi hỏi lại người viết là cách làm đúng.",
    },
    summary: {
      keyIdea: "Tổng hợp nhiều tài liệu tốt là bản có nguồn từng ý và chỉ rõ chỗ các tài liệu lệch nhau.",
      formula: "Điểm chung + điểm khác + nguồn từng ý → bạn mở nguồn xác nhận chỗ quan trọng.",
      commonMistake: "Nhận một đoạn văn mượt không ghi nguồn rồi gửi thẳng cho sếp.",
      action: "Tìm 2-3 tài liệu cùng một chủ đề của bạn và thử nhờ liệt kê điểm chung, điểm khác kèm nguồn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba tài liệu của chính bạn về cùng một việc (ví dụ ba báo cáo tuần hay ba email báo giá). Đặt tên file rõ, tải lên trợ lý đọc tài liệu và nhờ: 'Liệt kê điểm chung, điểm khác nhau, ghi tên tài liệu cạnh mỗi ý.' Chọn hai ý bất kỳ và mở tài liệu gốc xác nhận.",
      secondary: "Ghi lại có ý nào trong bản tổng hợp mà bạn không tìm thấy trong nguồn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng, ba phòng gửi ba báo cáo và sếp muốn một trang duy nhất. Bài này dạy cách nhờ trợ lý đọc tài liệu ghép chúng lại mà vẫn biết ý nào từ đâu.",
      },
      {
        type: "feynman",
        title: "Tổng hợp nhiều tài liệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một đồng nghiệp đọc ba tập hồ sơ rồi báo cáo lại. Người đồng nghiệp tốt sẽ nói: 'Cả ba đều nói A. Riêng tập hai nói B, ở trang 4.' Người kém sẽ kể một câu chuyện liền mạch mà không ai biết trang nào.",
        columns: ["Thành phần", "Đồng nghiệp đọc ba tập hồ sơ", "Trợ lý đọc tài liệu"],
        rows: [
          ["Đầu vào", "Ba tập hồ sơ để trên bàn", "Ba file bạn tải lên"],
          ["Bản báo cáo tốt", "Nói rõ điều gì từ tập nào, trang nào", "Ghi nguồn cạnh từng ý"],
          ["Chỗ nguy hiểm", "Kể liền mạch, bỏ qua chỗ hai tập nói khác nhau", "Làm phẳng chỗ lệch thành một câu hợp lý"],
          ["Việc của bạn", "Hỏi trang nào, rồi mở ra xem", "Mở nguồn xác nhận các ý quan trọng"],
        ],
        oneLiner: "Tổng hợp tốt là bản có địa chỉ cho từng ý, để bạn tìm lại được.",
      },
      { type: "heading", text: "Bắt đầu: đặt tên và chọn khung" },
      {
        type: "paragraph",
        text: "Trước khi tải lên, đổi tên file thành thứ bạn nhận ra được, ví dụ KinhDoanh_T9, Kho_T9, KeToan_T9. Sau đó chọn khung trả lời: điểm chung, điểm khác, ý chỉ một tài liệu có. Ba nhóm này cho bạn thấy ngay chỗ cần đọc kỹ.",
      },
      {
        type: "flow",
        title: "Từ ba báo cáo đến một trang có nguồn",
        steps: [
          { label: "Đặt tên file", detail: "Mỗi báo cáo một tên dễ nhớ, có phòng và kỳ báo cáo, để phần nguồn trong câu trả lời đọc hiểu ngay." },
          { label: "Tải lên và nêu khung", detail: "Bạn nhờ liệt kê điểm chung, điểm khác và ghi tên tài liệu cạnh mỗi ý, thay vì xin một đoạn tóm tắt chung." },
          { label: "Đọc bảng điểm lệch trước", detail: "Chỗ hai tài liệu nói khác nhau là nơi rủi ro nằm. Đọc phần này đầu tiên, rồi mới đến điểm chung." },
          { label: "Mở nguồn xác nhận", detail: "Với mỗi ý quan trọng hoặc mỗi con số, mở tài liệu gốc và tìm đúng đoạn được trích." },
          { label: "Hỏi người viết khi lệch", detail: "Nếu hai phòng ghi khác nhau, hỏi họ cách tính hoặc mốc thời gian trước khi chọn số nào vào bản gửi sếp." },
        ],
      },
      {
        type: "list",
        items: [
          "Nêu rõ: 'Chỉ dùng nội dung trong các tài liệu tôi tải lên.'",
          "Xin bảng ba cột: ý, tài liệu nguồn, đoạn hoặc trang.",
          "Xin thêm mục: 'Những điểm các tài liệu nói khác nhau.'",
          "Với khẳng định 'tất cả đều', kiểm ở từng tài liệu.",
        ],
      },
      {
        type: "callout",
        label: "Mâu thuẫn không phải lỗi của công cụ",
        text: "Hai tài liệu nói khác nhau thường vì họ đo khác nhau hoặc chốt số ở ngày khác nhau. Công cụ chỉ ra chỗ lệch; người hiểu công việc mới quyết định con số nào dùng.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ trợ lý tổng hợp ba báo cáo tuần",
        task: "Bạn có ba báo cáo tuần: Kinh doanh, Kho, Kế toán. Lắp một câu lệnh để nhận bản tổng hợp kiểm chứng được.",
        parts: [
          {
            id: "scope",
            label: "Phạm vi",
            options: [
              { text: "Tóm tắt giúp tôi.", feedback: "Trợ lý không biết tóm tắt cái gì, cho ai, và có thể lấy thêm ý ngoài tài liệu." },
              {
                text: "Chỉ dùng ba báo cáo tuần Kinh doanh, Kho, Kế toán tôi vừa tải lên, không thêm thông tin ngoài.",
                good: true,
                feedback: "Giới hạn nguồn rõ ràng nên câu trả lời bám vào ba file, không lấy thêm ý từ nơi khác.",
              },
            ],
          },
          {
            id: "frame",
            label: "Khung trình bày",
            options: [
              { text: "Viết một đoạn văn thật mượt gộp cả ba.", feedback: "Đoạn văn mượt xoá dấu nguồn, và chỗ hai phòng nói khác nhau bị làm phẳng." },
              {
                text: "Trình bày ba mục: điểm chung, điểm khác nhau, ý chỉ có ở một báo cáo; mỗi ý ghi tên báo cáo.",
                good: true,
                feedback: "Khung ba mục cho bạn thấy ngay chỗ lệch và biết mở báo cáo nào để kiểm.",
              },
            ],
          },
          {
            id: "check",
            label: "Yêu cầu kiểm chứng",
            options: [
              {
                text: "Với mỗi con số, ghi kèm trích nguyên văn ngắn từ báo cáo; nếu không có trong tài liệu thì ghi 'không thấy trong tài liệu'.",
                good: true,
                feedback: "Trích nguyên văn giúp bạn tìm lại trong vài giây, và câu 'không thấy' ngăn việc bịa con số.",
              },
              { text: "Đảm bảo mọi con số đều đúng nhé.", feedback: "Trợ lý không có cách tự đảm bảo; nó vẫn trả lời tự tin ngay cả khi diễn giải sai." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "frame", "check"],
            text: "Điểm chung: cả ba báo cáo cho biết tuần này đơn hàng tăng (Kinh doanh: 'đơn mới tăng so với tuần trước'; Kho: 'lượng xuất kho tăng').\n\nĐiểm khác: Kinh doanh ghi giao đúng hạn 95%; Kho ghi 88% (trích: 'đúng hạn 88% số đơn').\n\nChỉ có ở một báo cáo: Kế toán nhắc công nợ quá hạn; hai báo cáo kia không đề cập.\n\nKhông thấy trong tài liệu: nguyên nhân chênh lệch 95% và 88%.",
          },
          {
            requires: ["scope"],
            text: "Tuần này đơn hàng tăng, giao hàng phần lớn đúng hạn và công nợ cần theo dõi.\n\n(Bám đúng ba file nhưng là đoạn văn liền: bạn không biết 'phần lớn' là 95% hay 88%, và chỗ lệch biến mất.)",
          },
          {
            text: "Tuần này công ty tăng trưởng 12% nhờ chiến dịch khuyến mãi mới, tỷ lệ giao đúng hạn 97%, không có công nợ đáng lo.\n\n(Không giới hạn nguồn nên trợ lý bịa: 12%, chiến dịch khuyến mãi và 97% không có trong báo cáo nào.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản tổng hợp gửi sếp lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Trợ lý trả về bản tổng hợp gọn, có mục điểm khác: hai phòng ghi hai tỷ lệ giao đúng hạn khác nhau. Sếp cần bản tổng hợp lúc 5 giờ.",
            choices: [
              { label: "Chọn con số cao hơn cho đẹp báo cáo rồi gửi", next: "bad_pick" },
              { label: "Mở hai báo cáo gốc, xem mỗi phòng tính tỷ lệ theo cách nào", next: "s2" },
            ],
          },
          bad_pick: {
            text: "Sếp đem con số cao đi họp. Phòng Kho nêu con số của họ thấp hơn vì tính cả đơn giao muộn một ngày. Sếp mất uy tín vì con số không thống nhất trong công ty.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy Kinh doanh tính theo đơn đã xuất kho, Kho tính theo đơn khách đã nhận. Còn hai mươi phút.",
            choices: [
              { label: "Ghi cả hai con số, nêu rõ mỗi bên tính theo cách nào, và đề nghị sếp chọn chuẩn", next: "good" },
              { label: "Bỏ dòng giao đúng hạn ra khỏi bản gửi cho khỏi phải giải thích", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Bản gửi sếp không còn mâu thuẫn nhưng cũng không còn chỉ số quan trọng nhất về dịch vụ khách hàng. Sếp phải hỏi lại ngay trong cuộc họp.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhận bản có hai con số kèm cách tính, và quyết định dùng chuẩn của phòng Kho cho báo cáo lên trên. Bạn ghi lại để lần sau hỏi trước.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tổng hợp tốt = có nguồn từng ý + chỉ ra chỗ lệch.",
          "Bài sau: hai tài liệu nói ngược nhau thì tin bên nào?",
        ],
      },
    ],
  },
  {
    id: 2291,
    slug: "hai-tai-lieu-noi-nguoc-nhau-ai-dung",
    title: "Chặng 44, Bài 12: Hai tài liệu nói ngược nhau: ai đúng",
    subtitle: "Quy định cũ và mới khác nhau: công cụ chỉ ra chỗ khác, còn việc chọn bản chuẩn là của bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trong thư mục của bạn hay có hai bản cùng một quy định: bản cũ in năm ngoái và bản mới gửi qua email. Đọc tay thì mất cả buổi để tìm chỗ khác. Trợ lý đọc tài liệu làm phần tìm chỗ khác rất nhanh, nhưng nó không biết bản nào đang có hiệu lực. Bạn cần biết việc nào giao cho nó, việc nào giữ lại.",
    openingQuestion:
      "Bạn tải bản quy chế nghỉ phép cũ và mới lên trợ lý, nhờ chỉ chỗ khác. Nó liệt kê năm điểm khác. Bước tiếp theo hợp lý nhất là gì?",
    openingOptions: [
      "Mở hai bản, xác nhận từng điểm khác, rồi xem bản nào có hiệu lực",
      "Theo bản mới hơn vì trợ lý đã xác định bản mới là bản đúng nên khỏi mở bản cũ",
      "Hỏi trợ lý bản nào đúng rồi làm theo câu trả lời của nó",
      "Coi như năm điểm khác đều đúng và thông báo cho cả công ty",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý so hai văn bản rất tốt, nhưng câu hỏi bản nào có hiệu lực không nằm trong hai file: nó nằm ở ngày ban hành, người ký, thông báo chính thức. Nếu nó trả lời chắc chắn thì đó là suy đoán dựa trên ngày tháng nó thấy. Và đừng thông báo trước khi tự mở từng điểm khác đối chiếu, vì công cụ có thể hiểu nhầm một câu thành một thay đổi.",
    diagram: [
      { label: "Tải lên bản cũ và bản mới", arrow: true },
      { label: "Nhờ liệt kê điểm khác, kèm trích từng bản", arrow: true },
      { label: "Bạn mở hai bản xác nhận từng điểm", arrow: true },
      { label: "Bạn xác định bản chuẩn qua ngày ban hành và người có thẩm quyền" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên nhân sự có hai bản quy chế nghỉ phép trong thư mục chung, không rõ bản nào mới nhất. Cô nhờ trợ lý chỉ chỗ khác, nhận danh sách khác biệt và hai trích dẫn. Khi đối chiếu, cô thấy một điểm công cụ báo thay đổi thực ra chỉ là đổi cách diễn đạt. Cô hỏi trưởng phòng bản nào đang áp dụng. Đây là tình huống giả định.",
    },
    quiz: [
      {
        question: "Trợ lý đọc tài liệu làm tốt nhất việc nào với hai bản quy định?",
        options: [
          "Chỉ ra chỗ hai bản khác nhau kèm trích đoạn từng bản",
          "Quyết định bản nào đang có hiệu lực hiện tại",
          "Cho biết quy định đó có phù hợp với luật hiện hành không",
          "Dự đoán công ty sẽ ban hành bản quy định tiếp theo khi nào",
        ],
        correct: 0,
        explanation:
          "So sánh nội dung hai file là việc nằm gọn trong dữ liệu bạn đưa. Hiệu lực phụ thuộc thông báo và người có thẩm quyền, tính hợp pháp cần chuyên gia pháp chế, còn dự đoán tương lai không có trong file nào.",
      },
      {
        question: "Ai nên quyết định bản quy định nào là bản chuẩn?",
        options: [
          "Người có thẩm quyền ban hành, dựa trên ngày và văn bản chính thức",
          "Trợ lý đọc tài liệu, vì nó đã đọc kỹ cả hai bản",
          "Người đầu tiên trong nhóm mở file ra đọc",
          "Bản nào có nhiều chữ hơn vì chắc chắn chi tiết hơn",
        ],
        correct: 0,
        explanation:
          "Hiệu lực là việc của người ban hành và các văn bản chính thức. Công cụ chỉ đọc hai file bạn đưa. Người mở file đầu tiên hay độ dài văn bản không liên quan đến hiệu lực.",
      },
      {
        question: "Trợ lý báo: 'Bản mới bỏ quy định làm bù giờ.' Bạn kiểm thế nào?",
        options: [
          "Tìm từ khoá 'làm bù' trong cả hai bản",
          "Tin vì trợ lý đã so sánh toàn bộ hai bản",
          "Hỏi lại trợ lý xem câu đó có chắc chắn không",
          "Bỏ qua vì thay đổi nhỏ không ảnh hưởng ai",
        ],
        correct: 0,
        explanation:
          "Một câu 'bản mới bỏ điều gì' chỉ kiểm được bằng cách tìm điều đó trong hai bản: nó có trong bản cũ, không còn trong bản mới, hay chỉ đổi tên (ví dụ 'bù công'). Hỏi lại công cụ không cho bằng chứng mới, và bỏ qua có thể làm sai quyền lợi của nhiều người.",
      },
      {
        question: "Công cụ liệt kê sáu điểm khác, bạn kiểm ba điểm thấy đúng. Điều hợp lý nhất?",
        options: [
          "Kiểm nốt ba điểm còn lại trước khi thông báo cho mọi người",
          "Coi ba điểm còn lại là đúng vì xác suất cả ba cùng sai là rất thấp",
          "Chỉ thông báo ba điểm đã kiểm và không nhắc điểm còn lại",
          "Yêu cầu công cụ chạy lại danh sách và so kết quả hai lần",
        ],
        correct: 0,
        explanation:
          "Ba điểm đúng không chứng minh ba điểm còn lại đúng: mỗi điểm là một nhận định riêng. Chỉ nói ba điểm thì người đọc thiếu thông tin. Chạy lại hai lần có thể cho hai danh sách khác nhau mà không cái nào đã được kiểm.",
      },
      {
        question: "Hai bản không ghi ngày ban hành. Làm gì trước khi quyết định bản nào áp dụng?",
        options: [
          "Hỏi người soạn hoặc bộ phận ban hành quy định",
          "Chọn bản có tên file ghi ngày mới hơn trong thư mục",
          "Nhờ trợ lý đoán bản mới hơn theo giọng văn",
          "Áp dụng những điểm có lợi nhất từ cả hai bản cho nhân viên",
        ],
        correct: 0,
        explanation:
          "Khi tài liệu không nói ngày, cách chắc chắn duy nhất là hỏi người có thẩm quyền. Tên file và giọng văn dễ sai, và trộn điểm có lợi từ hai bản tạo ra một quy định chưa ai ban hành.",
      },
    ],
    keyTakeaways: [
      "Giao cho công cụ việc chỉ ra chỗ khác, kèm trích từng bản.",
      "Bản nào có hiệu lực là việc của người có thẩm quyền, không phải công cụ.",
      "Kiểm từng điểm khác bằng cách tìm trong cả hai bản.",
      "Thiếu ngày ban hành thì hỏi người soạn, đừng đoán.",
    ],
    practicePrompt: {
      question:
        "Trợ lý ghi 'bản mới tăng tiền ăn trưa lên 50.000 đồng', nhưng bản mới chỉ ghi 'theo mức công ty quy định từng thời kỳ'. Đây là lỗi kiểu nào?",
      options: [
        "Công cụ bịa một con số không có trong bản mới",
        "Công cụ trích đúng, chỉ diễn đạt lại cho dễ hiểu",
        "Bản cũ và bản mới bị công cụ đọc nhầm thứ tự trong file",
        "Lỗi do file quá dài nên công cụ chỉ đọc nửa đầu",
      ],
      correct: 0,
      explanation:
        "Con số 50.000 đồng không có trong bản mới, nên đó là chi tiết công cụ thêm vào. Diễn đạt lại không tự thêm số. Đọc nhầm thứ tự hay đọc nửa file là những giả thuyết không có bằng chứng ở đây. Cách kiểm: tìm con số trong file.",
    },
    summary: {
      keyIdea: "Công cụ chỉ ra chỗ hai tài liệu khác nhau; bạn và người có thẩm quyền quyết định bản nào chuẩn.",
      formula: "Điểm khác kèm trích từng bản → bạn xác nhận → người có thẩm quyền chốt.",
      commonMistake: "Hỏi công cụ bản nào đúng rồi làm theo.",
      action: "Tìm một tài liệu của bạn có hai phiên bản và thử nhờ liệt kê điểm khác kèm trích.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm hai phiên bản của một tài liệu bạn đang dùng (quy trình, bảng giá nội bộ hay mẫu hợp đồng của công ty). Tải cả hai lên, nhờ: 'Liệt kê mọi chỗ khác nhau, trích nguyên văn từng bản.' Mở tài liệu gốc kiểm ít nhất ba điểm, rồi hỏi người phụ trách bản nào đang áp dụng.",
      secondary: "Đánh dấu điểm nào là thay đổi thật, điểm nào chỉ đổi cách diễn đạt.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong thư mục của bạn có hai bản quy định: một bản cũ, một bản vừa gửi qua email. Bạn cần biết chính xác chỗ nào đã đổi, và bản nào đang áp dụng.",
      },
      {
        type: "feynman",
        title: "So hai bản tài liệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung hai bản nháp hợp đồng chồng lên nhau rồi soi dưới đèn: chỗ nào lệch thì hiện ra. Chiếc đèn chỉ cho bạn chỗ lệch, không nói được bản nào mới được ký.",
        columns: ["Thành phần", "Soi hai bản dưới đèn", "Trợ lý đọc tài liệu"],
        rows: [
          ["Việc làm được", "Thấy ngay chỗ hai bản khác nhau", "Liệt kê điểm khác, trích từng bản"],
          ["Việc không làm được", "Nói bản nào đã được ký", "Nói bản nào có hiệu lực"],
          ["Rủi ro", "Nhìn nhầm một nét mờ thành chỗ khác", "Hiểu nhầm diễn đạt lại thành thay đổi, hoặc thêm chi tiết"],
          ["Người quyết định", "Người ký", "Người có thẩm quyền ban hành"],
        ],
        oneLiner: "Công cụ là chiếc đèn soi chỗ lệch; chọn bản chuẩn là việc của người có thẩm quyền.",
      },
      { type: "heading", text: "Hai việc khác hẳn nhau" },
      {
        type: "paragraph",
        text: "Việc thứ nhất là tìm chỗ khác, nằm gọn trong hai file và công cụ làm nhanh. Việc thứ hai là quyết định bản nào áp dụng; nó nằm ngoài file, ở ngày ban hành, thông báo chính thức và người ký. Nhiều người nhờ công cụ làm cả hai và nhận về một câu trả lời chắc chắn nhưng không có căn cứ.",
      },
      {
        type: "flow",
        title: "Từ hai bản đến một bản chuẩn",
        steps: [
          { label: "Tải hai bản, đặt tên rõ", detail: "Đặt tên QuyChe_cu và QuyChe_moi để câu trả lời phân biệt được bản nào là bản nào." },
          { label: "Nhờ liệt kê điểm khác", detail: "Xin một bảng: nội dung, bản cũ ghi gì, bản mới ghi gì, kèm trích nguyên văn ngắn." },
          { label: "Kiểm từng điểm", detail: "Dùng chức năng tìm chữ trong hai file để thấy thay đổi thật hay chỉ đổi cách viết." },
          { label: "Tìm ngày và người ban hành", detail: "Xem ngày ký, số văn bản nội bộ, email thông báo. Không có thì hỏi người soạn." },
          { label: "Ghi lại kết luận và nguồn", detail: "Viết một dòng: áp dụng bản nào, theo thông báo nào, để người sau không phải làm lại." },
        ],
      },
      {
        type: "comparison",
        left: { label: "Giao cho công cụ", text: "Liệt kê chỗ khác nhau. Trích nguyên văn hai bản cạnh nhau. Gợi ý các điểm bạn nên hỏi người soạn." },
        right: { label: "Giữ cho bạn và người phụ trách", text: "Bản nào có hiệu lực. Điểm nào đủ quan trọng để thông báo cho mọi người. Tính phù hợp với quy định pháp luật (hỏi bộ phận pháp chế)." },
      },
      {
        type: "callout",
        label: "Câu trả lời chắc chắn chưa phải bằng chứng",
        text: "Nếu công cụ nói 'bản mới là bản chuẩn', nó chỉ đoán từ chữ trong file. Hãy hỏi ngược: căn cứ vào đâu, rồi tự mở căn cứ đó ra xem.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng so sánh quy chế nghỉ phép do trợ lý lập",
        task: "Bản cũ ghi: nghỉ phép 12 ngày/năm, báo trước 3 ngày. Bản mới ghi: nghỉ phép 12 ngày/năm, báo trước 5 ngày, nghỉ không lương cần trưởng phòng duyệt. Đánh dấu những dòng trợ lý ghi sai hoặc tự thêm.",
        segments: [
          { text: "Số ngày nghỉ phép hằng năm không đổi: 12 ngày ở cả hai bản." },
          { text: "Thời gian báo trước tăng từ 3 ngày lên 5 ngày." },
          {
            text: "Bản mới cho phép nghỉ phép chuyển sang năm sau tối đa 5 ngày.",
            error: "Không bản nào nhắc việc chuyển phép sang năm sau. Trợ lý thêm một quy định không có trong tài liệu.",
          },
          { text: "Nghỉ không lương phải được trưởng phòng duyệt." },
          {
            text: "Bản mới có hiệu lực từ ngày 1/1 năm nay.",
            error: "Hai bản không ghi ngày hiệu lực. Ngày này là trợ lý đoán; hỏi người ban hành mới biết.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Hai bảng giá, một khách đang chờ báo giá",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có hai bảng giá nội bộ, file tháng 6 và file tháng 9. Trợ lý liệt kê bốn sản phẩm khác giá. Khách cần báo giá trước trưa.",
            choices: [
              { label: "Dùng bảng giá trong file tháng 9 vì tên file mới hơn", next: "bad_guess" },
              { label: "Kiểm bốn điểm khác trong hai file rồi nhắn người phụ trách bảng giá xác nhận", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Bảng giá tháng 9 hoá ra là bản nháp chưa duyệt. Khách nhận báo giá thấp hơn giá thật và công ty phải xin lỗi khi báo lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai sản phẩm đổi giá thật, hai sản phẩm chỉ đổi tên. Người phụ trách chưa trả lời, còn một tiếng.",
            choices: [
              { label: "Gọi điện trực tiếp cho người phụ trách để chốt bản đang áp dụng", next: "good" },
              { label: "Chờ thêm đến chiều rồi báo giá sau", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Khách gửi yêu cầu sang hai nhà cung cấp khác và chọn bên báo giá nhanh hơn.",
            ending: "bad",
          },
          good: {
            text: "Người phụ trách xác nhận bản tháng 9 đã duyệt từ đầu tháng. Bạn báo đúng giá trước trưa và ghi lại nguồn xác nhận.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Công cụ chỉ chỗ khác; người có thẩm quyền chốt bản chuẩn.",
          "Bài sau: khi tải cả thư mục, công cụ có thể từ chối hoặc bỏ sót.",
        ],
      },
    ],
  },
  {
    id: 2292,
    slug: "gioi-han-kich-thuoc-va-so-luong-tai-lieu-khi-dua-vao",
    title: "Chặng 44, Bài 13: Giới hạn kích thước và số lượng tài liệu",
    subtitle: "Tải cả thư mục lên mà công cụ bỏ sót: học cách chia nhỏ và kiểm xem nó đã đọc những gì.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn gom hết tài liệu dự án vào một thư mục rồi tải lên. Có file bị từ chối, có file được nhận nhưng chỉ đọc một phần, và câu trả lời trông vẫn đầy đủ. Nếu không biết công cụ có giới hạn và có thể âm thầm bỏ sót, bạn sẽ tin vào câu trả lời thiếu mà không hề biết.",
    openingQuestion:
      "Bạn tải 40 file báo cáo lên trợ lý đọc tài liệu và hỏi 'tháng nào doanh thu thấp nhất?'. Nó trả lời chắc chắn. Điều đáng kiểm đầu tiên là gì?",
    openingOptions: [
      "Công cụ đã đọc đủ cả 40 file hay chỉ một phần",
      "Công cụ trả lời nhanh hay chậm so với lần trước",
      "Câu trả lời có dùng đúng định dạng số tiền Việt Nam không",
      "Tên các file có được sắp theo thứ tự chữ cái không",
    ],
    correctOption: 0,
    explanation:
      "Mỗi công cụ có giới hạn về dung lượng và số nguồn, và giới hạn đổi theo thời gian. Khi vượt giới hạn, có thể có file bị từ chối, nhưng cũng có thể công cụ vẫn trả lời dựa trên phần nó đọc được. Câu trả lời 'tháng thấp nhất' chỉ đúng nếu mọi tháng đều được đọc. Tốc độ, định dạng số tiền và thứ tự tên file không ảnh hưởng đến độ đầy đủ của câu trả lời.",
    diagram: [
      { label: "Gom tài liệu theo chủ đề, không gom hết", arrow: true },
      { label: "Tải lên và xem danh sách file được nhận", arrow: true },
      { label: "Hỏi thử một câu có đáp án bạn đã biết", arrow: true },
      { label: "Chia thành nhiều nhóm nhỏ nếu phần nào bị thiếu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên vận hành tải 60 báo cáo tháng lên trợ lý đọc tài liệu và hỏi tổng hợp cả năm. Câu trả lời chỉ nhắc tám tháng. Cô hỏi ngược: 'Bạn đã đọc những file nào?' và thấy danh sách thiếu bốn tháng. Cô chia thành hai nhóm sáu tháng rồi hỏi từng nhóm. Đây là tình huống giả định.",
    },
    quiz: [
      {
        question: "Vì sao không nên tin câu trả lời khi bạn tải lên quá nhiều file cùng lúc?",
        options: [
          "Công cụ có thể không đọc hết mà câu trả lời vẫn trông đầy đủ",
          "Công cụ sẽ tự xoá các file cũ của bạn khỏi máy tính",
          "Công cụ chỉ trả lời đúng khi có từ mười file trở lên",
          "Công cụ luôn đọc hết nên câu trả lời chắc chắn đầy đủ",
        ],
        correct: 0,
        explanation:
          "Giới hạn là có thật và đổi theo công cụ, nên phần vượt có thể bị bỏ sót hoặc chỉ đọc một phần. Công cụ không xoá file trên máy bạn, và không có ngưỡng 'tối thiểu' nào để trả lời đúng. Nghĩ rằng luôn đọc hết mới là chỗ nguy hiểm.",
      },
      {
        question: "Cách nào kiểm xem công cụ có thực sự dùng một file nào đó không?",
        options: [
          "Đặt một câu hỏi mà bạn biết đáp án nằm đúng trong file đó",
          "Nhìn xem tên file có nằm trong danh sách bên trái không",
          "Hỏi công cụ 'bạn đã đọc hết chưa' và tin câu trả lời",
          "Đếm số file bạn tải lên và so với số file công cụ báo là đã xử lý xong",
        ],
        correct: 0,
        explanation:
          "Một câu hỏi có đáp án đã biết cho bạn bằng chứng thật. Tên file nằm trong danh sách chỉ nói rằng file đã được tải, chưa nói đã đọc toàn bộ. Hỏi 'đã đọc hết chưa' có thể nhận câu 'rồi' mà không có căn cứ. Đếm số file cũng không cho biết phần nào được đọc.",
      },
      {
        question: "Bạn có 12 báo cáo tháng. Cách chia nào hợp lý khi công cụ đọc thiếu?",
        options: [
          "Chia theo quý, hỏi từng quý rồi nhờ tổng hợp bốn câu trả lời",
          "Xoá bớt sáu báo cáo bất kỳ cho đủ dung lượng",
          "Gộp 12 báo cáo thành một file thật dài để chỉ phải tải một lần",
          "Chỉ hỏi về hai tháng đầu và suy ra phần còn lại",
        ],
        correct: 0,
        explanation:
          "Chia theo nhóm có nghĩa (quý) giúp mỗi lần hỏi nằm trong khả năng của công cụ, và bạn kiểm được từng nhóm. Xoá file bất kỳ làm mất dữ liệu. Gộp thành một file dài vẫn vượt giới hạn, còn suy ra từ hai tháng là đoán.",
      },
      {
        question: "Bạn thấy một file 300 trang bị từ chối. Điều gì hợp lý nhất?",
        options: [
          "Tách thành các phần theo chương rồi tải từng phần",
          "Tải lại cho tới khi công cụ chịu nhận file",
          "Nén file thành dạng nén để nhìn nhỏ hơn rồi tải lại",
          "Chỉ tải trang đầu và trang cuối cho nhanh",
        ],
        correct: 0,
        explanation:
          "Tách theo chương vừa vượt giới hạn vừa giữ trọn ý mỗi phần. Tải lại nhiều lần không đổi kết quả. Nén file thường không đổi số trang công cụ phải đọc. Chỉ tải đầu và cuối sẽ bỏ phần giữa có thể chứa đáp án.",
      },
      {
        question: "Muốn biết giới hạn hiện tại của một công cụ, nguồn nào đáng tin nhất?",
        options: [
          "Trang trợ giúp chính thức của công cụ, xem kèm ngày cập nhật",
          "Bài viết cũ của một đồng nghiệp trong nhóm chat",
          "Con số công cụ tự nói khi bạn hỏi trong khung chat",
          "Trí nhớ của bạn từ lần dùng trước, cách đây khoảng nửa năm rồi",
        ],
        correct: 0,
        explanation:
          "Giới hạn thay đổi theo thời gian, nên chỉ trang chính thức và có ngày mới đáng tin. Bài cũ của đồng nghiệp hay trí nhớ của bạn có thể đã lỗi thời. Công cụ trả lời qua khung chat có thể nói sai về giới hạn của chính nó.",
      },
    ],
    keyTakeaways: [
      "Công cụ có giới hạn dung lượng và số nguồn, và giới hạn đổi theo thời gian.",
      "Có thể bị bỏ sót mà câu trả lời vẫn trông đầy đủ.",
      "Kiểm bằng một câu hỏi bạn đã biết đáp án.",
      "Chia theo chủ đề hay theo quý rồi hỏi từng nhóm.",
    ],
    practicePrompt: {
      question:
        "Bạn tải 30 hợp đồng và hỏi 'hợp đồng nào hết hạn trong quý 4?'. Công cụ liệt kê 3 hợp đồng. Bạn biết chắc ít nhất 5 hợp đồng hết hạn trong quý 4. Điều này cho thấy gì?",
      options: [
        "Công cụ có thể chưa đọc đủ nên danh sách thiếu",
        "Công cụ luôn đúng, còn trí nhớ của bạn bị nhầm",
        "Công cụ chỉ liệt kê hợp đồng có tên bắt đầu bằng chữ cái đầu",
        "Nên tin danh sách của công cụ vì nó đã đọc hết các hợp đồng",
      ],
      correct: 0,
      explanation:
        "Thiếu 2 trên 5 là dấu hiệu công cụ đọc không đủ hoặc bỏ sót. Không có căn cứ để nói nó liệt kê theo chữ cái. Nếu tin danh sách, bạn sẽ bỏ lỡ hai hợp đồng hết hạn. Hãy chia nhỏ và hỏi lại theo từng nhóm.",
    },
    summary: {
      keyIdea: "Công cụ có giới hạn và có thể bỏ sót mà vẫn trả lời đầy đủ; bạn phải kiểm nó đã đọc những gì.",
      formula: "Chia nhóm nhỏ → tải → kiểm bằng câu hỏi biết đáp án → hỏi từng nhóm.",
      commonMistake: "Tải cả thư mục rồi tin câu trả lời 'tổng hợp' mà không kiểm phần bị thiếu.",
      action: "Thử một câu hỏi bạn đã biết đáp án trên một thư mục lớn của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thư mục có hơn 10 tài liệu của bạn. Tải lên trợ lý đọc tài liệu và hỏi một câu mà bạn biết chắc đáp án nằm ở một file cụ thể. Nếu công cụ trả lời sai hoặc không nhắc tới file đó, chia thư mục thành hai nhóm theo chủ đề và hỏi lại từng nhóm.",
      secondary: "Xem trang trợ giúp chính thức của công cụ, ghi lại ngày bạn đọc để nhớ rằng nó có thể đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn gom hết tài liệu dự án vào một thư mục rồi tải lên. Bài này dạy vì sao nhiều hơn chưa chắc tốt hơn, và cách chia để không bị bỏ sót.",
      },
      {
        type: "feynman",
        title: "Giới hạn tài liệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một người bạn đọc hộ đống hồ sơ. Đưa ba tập thì họ đọc kỹ. Đưa cả xe đẩy thì họ chỉ kịp lướt và vẫn trả lời như thể đã đọc hết.",
        columns: ["Thành phần", "Người bạn đọc hộ hồ sơ", "Trợ lý đọc tài liệu"],
        rows: [
          ["Sức đọc", "Có hạn trong một buổi", "Có giới hạn dung lượng và số nguồn"],
          ["Khi quá tải", "Lướt, đọc thiếu nhưng vẫn trả lời", "Có thể đọc một phần mà vẫn trả lời đầy đủ"],
          ["Cách giao việc", "Chia thành từng đợt nhỏ", "Chia nhóm theo chủ đề hoặc kỳ"],
          ["Cách kiểm", "Hỏi một chi tiết bạn đã biết", "Đặt câu hỏi có đáp án đã biết"],
        ],
        oneLiner: "Giới hạn là có thật và đổi theo thời gian; quá tải thì thiếu, nhưng câu trả lời vẫn trông đầy đủ.",
      },
      { type: "heading", text: "Khi nào bị bỏ sót" },
      {
        type: "paragraph",
        text: "Có hai kiểu. Kiểu rõ ràng: công cụ báo file quá lớn hoặc quá nhiều, bạn biết ngay và xử lý. Kiểu âm thầm: file được nhận, nhưng chỉ một phần được dùng khi trả lời. Kiểu thứ hai nguy hiểm hơn vì bạn không nhận được cảnh báo nào.",
      },
      {
        type: "chart",
        title: "Tải nhiều hơn giới hạn thì phần đọc được không tăng thêm",
        caption: "Số liệu minh hoạ, không phải giới hạn của công cụ cụ thể nào. Kéo thanh giới hạn giả định để thấy: khi số trang vượt giới hạn, phần đọc được dừng lại còn phần bỏ sót tăng dần.",
        kind: "line",
        xLabel: "Số trang tải lên",
        yLabel: "Số trang",
        x: { from: 0, to: 600, step: 50 },
        params: [
          { id: "limit", label: "Giới hạn giả định", min: 100, max: 500, step: 50, value: 300, unit: "trang" },
        ],
        series: [
          { label: "Trang công cụ đọc được", expr: "min(x, limit)" },
          { label: "Trang bị bỏ sót", expr: "max(0, x - limit)" },
        ],
      },
      {
        type: "flow",
        title: "Chia nhỏ để không bị bỏ sót",
        steps: [
          { label: "Gom theo chủ đề", detail: "Không ném cả thư mục vào một lần. Nhóm theo quý, theo dự án hoặc theo khách hàng." },
          { label: "Tải và xem danh sách", detail: "Kiểm danh sách nguồn: có file nào bị từ chối, bị thiếu hay không." },
          { label: "Hỏi thử câu đã biết đáp án", detail: "Chọn một chi tiết nằm ở file cuối cùng hay file to nhất. Nếu công cụ trả lời đúng, nó đã đọc tới đó." },
          { label: "Hỏi từng nhóm", detail: "Hỏi từng nhóm nhỏ, rồi tự ghép câu trả lời hoặc nhờ tổng hợp từ các câu trả lời đã có nguồn." },
        ],
      },
      {
        type: "callout",
        label: "Giới hạn đổi theo thời gian",
        text: "Bài này cố ý không ghi con số giới hạn của công cụ nào. Muốn biết con số hiện tại, xem trang trợ giúp chính thức và ghi lại ngày bạn đọc.",
      },
      {
        type: "scenario",
        title: "Thư mục 40 hợp đồng và câu hỏi về hạn thanh toán",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn tải 40 hợp đồng lên và hỏi: 'Hợp đồng nào có hạn thanh toán trên 60 ngày?'. Công cụ liệt kê ba hợp đồng. Bạn nhớ có hơn ba.",
            choices: [
              { label: "Gửi danh sách ba hợp đồng cho sếp vì công cụ đã trả lời", next: "bad_trust" },
              { label: "Hỏi một câu bạn biết chắc đáp án nằm trong hợp đồng thứ 38", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Sếp quyết định đàm phán lại ba hợp đồng. Một tuần sau kế toán phát hiện thêm bốn hợp đồng có hạn 75 ngày mà không ai nhắc tới.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ không tìm thấy nội dung trong hợp đồng thứ 38. Nó chỉ đọc phần đầu của thư mục.",
            choices: [
              { label: "Chia 40 hợp đồng thành bốn nhóm mười hợp đồng và hỏi từng nhóm", next: "good" },
              { label: "Tải lại cả 40 file, hy vọng lần này công cụ đọc hết", next: "bad_retry" },
            ],
          },
          bad_retry: {
            text: "Kết quả gần như giống cũ. Bạn mất thêm nửa tiếng mà danh sách vẫn thiếu.",
            ending: "bad",
          },
          good: {
            text: "Mỗi nhóm trả lời đủ, bạn tìm thêm bốn hợp đồng và đối chiếu từng cái với file gốc. Danh sách cuối cùng có bảy hợp đồng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chia nhóm nhỏ, kiểm bằng câu hỏi biết đáp án.",
          "Bài sau: nghe bản tóm tắt dạng âm thanh, dùng để làm gì và vì sao chưa đủ.",
        ],
      },
    ],
  },
  {
    id: 2293,
    slug: "tom-tat-dang-am-thanh-nghe-de-lam-gi-va-nghe-khong-du",
    title: "Chặng 44, Bài 14: Tóm tắt dạng âm thanh: nghe để làm gì và vì sao chưa đủ",
    subtitle: "Nghe bản tóm tắt trên đường đi làm để làm quen chủ đề, rồi vẫn đọc nguồn cho việc quan trọng.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎧",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều trợ lý đọc tài liệu có thể biến nguồn của bạn thành một bản nghe giống như hai người trò chuyện. Nghe trên đường đi làm rất tiện, nhưng lời nói trôi qua nhanh, khó dừng lại kiểm từng con số. Biết nên nghe để làm gì, và khi nào phải quay về đọc nguồn, giúp bạn không biến cuộc trò chuyện dễ nghe thành quyết định sai.",
    openingQuestion:
      "Bạn nghe bản tóm tắt âm thanh về hợp đồng mới trong lúc đi làm và nhớ có nhắc một mức phạt chậm giao. Trước khi nhắn cho khách về mức phạt đó, bạn làm gì?",
    openingOptions: [
      "Mở hợp đồng gốc, tìm điều khoản và đọc đúng mức phạt",
      "Nhắn luôn vì bản tóm tắt được tạo từ chính hợp đồng",
      "Nghe lại bản âm thanh một lần nữa để chắc chắn hơn",
      "Hỏi đồng nghiệp xem họ có nhớ bản tóm tắt nói gì không",
    ],
    correctOption: 0,
    explanation:
      "Bản âm thanh là bản diễn đạt lại: nó rút gọn, đổi cách nói và có thể làm lệch một con số hay một điều kiện. Nghe lại chỉ lặp lại cùng một diễn đạt, còn trí nhớ của đồng nghiệp cũng là nghe lại. Một mức phạt có hệ quả tiền bạc, nên bạn cần đọc đúng câu trong hợp đồng, kể cả khi bản nghe do chính hợp đồng tạo ra.",
    diagram: [
      { label: "Nguồn: tài liệu bạn tải lên", arrow: true },
      { label: "Công cụ tạo bản nghe diễn đạt lại nguồn", arrow: true },
      { label: "Bạn nghe để làm quen, ghi lại chỗ cần kiểm", arrow: true },
      { label: "Bạn đọc nguồn cho mọi con số và điều khoản quan trọng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chuyên viên mua hàng có 40 phút đi làm mỗi sáng. Cô tạo bản nghe từ ba báo cáo nhà cung cấp, nghe để nắm bức tranh chung và ghi ra ba điều cần kiểm. Đến cơ quan, cô mở báo cáo gốc, phát hiện một điều kiện thanh toán bản nghe nói gọn quá mức nên đổi nghĩa. Đây là tình huống giả định.",
    },
    quiz: [
      {
        question: "Bản tóm tắt âm thanh hợp nhất cho việc nào?",
        options: [
          "Làm quen nhanh với một chủ đề mới trước khi đọc nguồn",
          "Thay hẳn việc đọc kỹ hợp đồng trước khi bạn ký cam kết với đối tác",
          "Làm bằng chứng khi có tranh chấp với khách hàng",
          "Đối chiếu từng con số trong báo cáo tài chính",
        ],
        correct: 0,
        explanation:
          "Nghe tiện để hình dung bức tranh chung và nhận ra điều cần tìm hiểu thêm. Hợp đồng, tranh chấp và đối chiếu con số đòi hỏi đúng chữ trong nguồn, mà bản nghe chỉ là diễn đạt lại.",
      },
      {
        question: "Vì sao nghe xong vẫn chưa đủ cho việc quan trọng?",
        options: [
          "Bản nghe diễn đạt lại nên có thể làm lệch con số hoặc điều kiện",
          "Giọng đọc của công cụ quá nhanh nên không ai nghe kịp các con số trong đó",
          "Bản nghe luôn sai vì công cụ không đọc được tài liệu tiếng Việt",
          "Bản nghe chỉ chứa phần mở đầu của tài liệu nguồn",
        ],
        correct: 0,
        explanation:
          "Khi rút gọn thành lời nói, chi tiết như 'trừ trường hợp', 'sau khi trừ chiết khấu' dễ bị bỏ. Nói là luôn sai hay chỉ có phần mở đầu là khẳng định không có căn cứ; tốc độ đọc chỉ là vấn đề tiện lợi.",
      },
      {
        question: "Khi nghe, cách nào giúp biến bản nghe thành việc có ích?",
        options: [
          "Ghi lại ba điều cần kiểm rồi tìm đúng trong nguồn",
          "Nghe cho tới khi nhớ thuộc lòng các con số được nhắc",
          "Chép lại toàn bộ lời nói thành văn bản để nộp cho sếp xem",
          "Chỉ nghe kỹ những đoạn nghe có vẻ quan trọng nhất",
        ],
        correct: 0,
        explanation:
          "Ghi ra vài điểm cần kiểm biến nghe thụ động thành danh sách việc có hướng. Thuộc lòng số vẫn là nhớ diễn đạt lại. Chép lời nói không kiểm được nguồn. Đoạn nghe có vẻ quan trọng lại là phần dễ rút gọn sai nhất.",
      },
      {
        question: "Bản nghe nhắc 'giá tăng khoảng mười phần trăm'. Nguồn ghi 'tăng từ 8 đến 12 phần trăm tuỳ gói'. Điều này nói gì?",
        options: [
          "Bản nghe làm tròn và mất chi tiết phụ thuộc vào gói",
          "Bản nghe chính xác vì con số mười nằm giữa tám và mười hai",
          "Nguồn đã lỗi thời vì bản nghe được tạo sau nguồn tài liệu",
          "Hai cách nói đều cùng một nghĩa nên không cần phân biệt",
        ],
        correct: 0,
        explanation:
          "Khi quyết định theo từng gói, con số 'khoảng mười' che mất khác biệt từ 8 đến 12 (với gói giá cao là 4 điểm phần trăm). Việc con số nằm giữa không làm bản nghe chính xác, và bản nghe không bao giờ sửa nguồn.",
      },
      {
        question: "Bạn muốn chia sẻ bản nghe với cả nhóm. Điều cần làm thêm là gì?",
        options: [
          "Gửi kèm danh sách nguồn và nói rõ đây chỉ là bản tóm tắt",
          "Gửi riêng bản nghe, vì nguồn sẽ làm nhóm rối",
          "Gửi bản nghe và nói nó đã được kiểm chứng đầy đủ",
          "Gửi bản nghe mà không nói nó được tạo bằng công cụ",
        ],
        correct: 0,
        explanation:
          "Người nghe cần biết nguồn ở đâu và bản này chỉ là tóm tắt để họ biết cần kiểm gì. Nói 'đã kiểm chứng đầy đủ' khi chưa kiểm là sai sự thật, và giấu việc dùng công cụ làm người khác tin hơn mức nên tin.",
      },
    ],
    keyTakeaways: [
      "Nghe để làm quen chủ đề, không để thay việc đọc nguồn.",
      "Bản nghe là diễn đạt lại, có thể làm lệch con số và điều kiện.",
      "Ghi lại vài điều cần kiểm khi nghe, rồi mở nguồn.",
      "Chia sẻ bản nghe thì kèm nguồn và nói rõ đây là tóm tắt.",
    ],
    practicePrompt: {
      question:
        "Bản nghe nói 'khách được trả hàng trong vòng vài ngày'. Bạn định báo khách như vậy. Làm gì hợp lý nhất?",
      options: [
        "Mở chính sách gốc, tìm số ngày cụ thể và điều kiện trả hàng",
        "Báo 'vài ngày' vì khách sẽ tự hiểu theo cách của họ",
        "Tự chọn 7 ngày vì đó là con số phổ biến của nhiều cửa hàng khác",
        "Nghe lại bản nghe hy vọng lần này có nhắc số ngày",
      ],
      correct: 0,
      explanation:
        "'Vài ngày' là cách nói rút gọn, không phải cam kết. Tự chọn 7 ngày là bịa một chính sách. Nghe lại không thêm thông tin mà nguồn chưa có. Chỉ chính sách gốc cho số ngày và điều kiện đúng.",
    },
    summary: {
      keyIdea: "Bản tóm tắt âm thanh giúp làm quen nhanh nhưng là diễn đạt lại, nên việc quan trọng vẫn cần đọc nguồn.",
      formula: "Nghe → ghi ra điều cần kiểm → mở nguồn xác nhận.",
      commonMistake: "Hành động theo điều vừa nghe mà không mở lại nguồn.",
      action: "Tạo một bản nghe từ tài liệu của bạn, ghi ba điều cần kiểm và xác nhận trong nguồn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu dài của bạn mà hôm nay bạn chưa có thời gian đọc. Nếu công cụ bạn dùng có tạo tóm tắt âm thanh thì tạo và nghe một đoạn; nếu không, nhờ trợ lý đọc tài liệu tóm tắt thành năm ý. Ghi ba điều cần kiểm và tìm đúng từng điều trong tài liệu gốc.",
      secondary: "Ghi lại điều nào bản tóm tắt nói khác so với nguồn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có 40 phút đi làm mỗi sáng và một chồng tài liệu chưa đọc. Một bản tóm tắt dạng âm thanh nghe rất hấp dẫn; bài này nói nghe để làm gì, và đến lúc nào phải quay về đọc.",
      },
      {
        type: "feynman",
        title: "Tóm tắt âm thanh đơn giản hơn bạn nghĩ",
        intro: "Hình dung một đồng nghiệp đọc xong tài liệu rồi kể lại cho bạn trên xe. Nghe rất dễ hiểu, nhưng họ sẽ rút gọn và nói theo cách của họ, nên với việc quan trọng bạn vẫn cần xem chính tài liệu.",
        columns: ["Thành phần", "Đồng nghiệp kể lại trên xe", "Bản tóm tắt âm thanh"],
        rows: [
          ["Ưu điểm", "Dễ hiểu, nghe lúc rảnh tay", "Tiện nghe khi đi lại, làm quen chủ đề nhanh"],
          ["Giới hạn", "Rút gọn và nói theo ý mình", "Diễn đạt lại nên có thể lệch số, bỏ điều kiện"],
          ["Dùng để", "Nắm bức tranh chung", "Nhận ra điều cần kiểm"],
          ["Việc quan trọng", "Bạn cầm tài liệu xem lại", "Bạn mở nguồn đọc đúng câu"],
        ],
        oneLiner: "Nghe để biết cần tìm gì; đọc nguồn để biết đúng là gì.",
      },
      { type: "heading", text: "Nghe để làm gì" },
      {
        type: "paragraph",
        text: "Bản nghe hợp với ba việc: làm quen một chủ đề mới, ôn lại tài liệu đã đọc, và tìm ra câu hỏi cần hỏi. Nó không hợp với việc cần đúng từng chữ: hợp đồng, mức phạt, số liệu báo cáo.",
      },
      {
        type: "flow",
        title: "Cách dùng bản nghe cho an toàn",
        steps: [
          { label: "Chọn nguồn đã kiểm", detail: "Chỉ đưa vào tài liệu bạn tin cậy; bản nghe không tốt hơn nguồn của nó." },
          { label: "Nghe và ghi điểm cần kiểm", detail: "Khi nghe thấy con số, tên hay điều kiện quan trọng, ghi lại thay vì nhớ." },
          { label: "Mở nguồn, tìm từng điểm", detail: "Đọc đúng câu trong tài liệu gốc để biết bản nghe nói đúng, rút gọn hay lệch." },
          { label: "Chia sẻ kèm nguồn", detail: "Nếu gửi cho người khác, đính kèm tài liệu gốc và nói rõ bản nghe chỉ là tóm tắt." },
        ],
      },
      {
        type: "list",
        items: [
          "Nghe để hình dung bức tranh chung, không để chốt quyết định.",
          "Con số, ngày, điều khoản, tên riêng: luôn tìm lại trong nguồn.",
          "Điểm nghe chưa rõ: ghi lại và hỏi trợ lý kèm nguồn.",
          "Công cụ và tính năng thay đổi nhanh; xem trang chính thức của công cụ bạn dùng.",
        ],
      },
      {
        type: "callout",
        label: "Dễ nghe không có nghĩa là đúng",
        text: "Giọng trò chuyện tự nhiên tạo cảm giác đáng tin. Hãy nhớ: đó chỉ là cách trình bày, không phải bằng chứng.",
      },
      {
        type: "scenario",
        title: "Nghe tóm tắt hợp đồng trên xe buýt",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nghe bản tóm tắt hợp đồng nhà cung cấp mới. Nó nhắc 'thanh toán trong khoảng một tháng'. Sáng nay bạn phải báo kế toán hạn thanh toán.",
            choices: [
              { label: "Nhắn kế toán: hạn thanh toán là một tháng", next: "bad_relay" },
              { label: "Ghi lại điểm này, đến cơ quan mở hợp đồng tìm điều khoản thanh toán", next: "s2" },
            ],
          },
          bad_relay: {
            text: "Hợp đồng ghi 30 ngày kể từ ngày nhận hàng, chưa phải kể từ ngày ký. Kế toán tính sai mốc và thanh toán trễ, nhà cung cấp tính phí chậm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hợp đồng ghi 'trong 30 ngày kể từ ngày nhận hàng'. Bản nghe đã bỏ mốc tính ngày.",
            choices: [
              { label: "Báo kế toán đúng nguyên văn và mốc tính, kèm số trang hợp đồng", next: "good" },
              { label: "Báo 30 ngày, bỏ mốc vì cho là chi tiết nhỏ", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Kế toán tính 30 ngày từ ngày ký hợp đồng, sớm hơn thực tế, nên chuyển tiền trước khi hàng về.",
            ending: "bad",
          },
          good: {
            text: "Kế toán nhận đúng mốc, đặt lịch thanh toán chính xác. Bạn ghi lại: bản nghe giúp nắm ý, nguồn mới chốt số.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản chép lời tóm tắt âm thanh",
        task: "Nguồn ghi: hợp đồng 12 tháng, giao hàng hằng tháng, phạt chậm giao 0,5% giá trị đợt giao mỗi ngày. Bản nghe được chép lại bên dưới. Đánh dấu những câu nói sai hoặc thêm điều nguồn không có.",
        segments: [
          { text: "Hợp đồng kéo dài 12 tháng." },
          { text: "Hàng được giao mỗi tháng một đợt." },
          {
            text: "Phạt chậm giao tối đa 10% tổng giá trị hợp đồng.",
            error: "Nguồn không ghi mức trần 10%; bản nghe thêm một giới hạn không có trong tài liệu.",
          },
          { text: "Mức phạt là 0,5% giá trị đợt giao cho mỗi ngày chậm." },
          {
            text: "Bên mua được quyền huỷ hợp đồng nếu chậm quá một tuần.",
            error: "Nguồn không nhắc quyền huỷ; đây là chi tiết bản nghe thêm và có thể dẫn tới quyết định sai.",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Nghe để biết cần tìm gì; đọc nguồn để biết đúng là gì.",
          "Bài sau: dự án nhỏ, bộ tài liệu tự học một chủ đề mới.",
        ],
      },
    ],
  },
  {
    id: 2294,
    slug: "du-an-nho-bo-tai-lieu-hoc-cho-mot-chu-de-moi",
    title: "Chặng 44, Bài 15: Dự án nhỏ: bộ tài liệu tự học một chủ đề mới",
    subtitle: "Gom bốn tài liệu tin cậy cho một chủ đề mới, hỏi theo từng bước và tự kiểm tra xem mình đã hiểu chưa.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📚",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công việc đổi, bạn phải nắm nhanh một lĩnh vực mới: quy trình xuất khẩu, một phần mềm kế toán, một chính sách khách hàng. Đọc lung tung trên mạng thì mất thời gian và dễ lẫn nguồn kém. Một bộ bốn tài liệu tin cậy cộng trợ lý đọc tài liệu cho bạn cách học có kiểm soát, với điều kiện bạn chọn nguồn tốt và tự kiểm tra mình.",
    openingQuestion:
      "Bạn sắp phụ trách mảng xuất khẩu và chưa biết gì. Bạn tìm được hai mươi bài trên mạng. Cách nào là khởi đầu tốt nhất cho bộ tài liệu tự học?",
    openingOptions: [
      "Chọn khoảng bốn tài liệu đáng tin, đa dạng góc nhìn, rồi tải lên",
      "Tải cả hai mươi bài lên để công cụ có nhiều thông tin nhất dù nhiều bài lặp ý nhau",
      "Chỉ chọn bài ngắn nhất để học cho nhanh",
      "Để công cụ tự tìm nguồn trên mạng rồi tin theo",
    ],
    correctOption: 0,
    explanation:
      "Chất lượng câu trả lời của trợ lý đọc tài liệu không vượt chất lượng nguồn bạn đưa vào. Bốn tài liệu đáng tin, gồm cả tài liệu chính thức và tài liệu của chính công ty bạn, dễ kiểm hơn và nằm trong khả năng đọc của công cụ. Hai mươi bài lẫn lộn sẽ làm tăng khả năng mâu thuẫn và bị bỏ sót. Bài ngắn nhất chưa chắc đầy đủ, và để công cụ tự chọn nguồn là bỏ bước kiểm.",
    diagram: [
      { label: "Chọn bốn tài liệu tin cậy, khác góc nhìn", arrow: true },
      { label: "Hỏi từng bước: khái niệm, quy trình, sai lầm hay gặp", arrow: true },
      { label: "Nhờ ra câu hỏi tự kiểm tra từ chính nguồn", arrow: true },
      { label: "Tự trả lời, đối chiếu nguồn, ghi chỗ chưa vững" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên vừa chuyển sang phòng chăm sóc khách hàng bảo hiểm cần nắm nhanh quy trình bồi thường. Anh gom bốn tài liệu: sổ tay nội bộ, hướng dẫn của công ty, một bài giảng nội bộ và một tài liệu chính thức. Anh hỏi từng phần, tự làm bộ câu hỏi và hỏi đồng nghiệp ở chỗ trả lời chưa chắc. Đây là tình huống giả định.",
    },
    quiz: [
      {
        question: "Bốn tài liệu nào tạo thành bộ tự học tốt cho một chủ đề mới?",
        options: [
          "Một tài liệu nhập môn, một chính thức, một của công ty, một ví dụ thực tế",
          "Bốn bài viết cùng tác giả nói gần như cùng một ý",
          "Bốn bài ngẫu nhiên đầu tiên tìm thấy trên mạng",
          "Bốn tài liệu dài nhất bạn tìm được về chủ đề",
        ],
        correct: 0,
        explanation:
          "Nguồn đa dạng và có tài liệu chính thức cho phép bạn đối chiếu. Bốn bài cùng tác giả chỉ lặp lại một góc nhìn; bài ngẫu nhiên không bảo đảm độ tin cậy; dài nhất không có nghĩa là đúng hay phù hợp.",
      },
      {
        question: "Cách hỏi nào giúp học chắc hơn với bộ tài liệu đã tải?",
        options: [
          "Hỏi từng bước từ khái niệm đến quy trình rồi đến sai lầm hay gặp",
          "Hỏi một câu duy nhất: hãy dạy tôi toàn bộ chủ đề này từ đầu đến cuối",
          "Chỉ hỏi phần bạn thấy dễ để khỏi mất thời gian",
          "Xin công cụ cho đáp án thi rồi học thuộc",
        ],
        correct: 0,
        explanation:
          "Hỏi từng bước giúp mỗi câu trả lời nhỏ và kiểm được với nguồn. Một câu hỏi quá rộng cho câu trả lời chung chung. Bỏ phần khó để lại lỗ hổng, và học thuộc đáp án không cho biết bạn có hiểu không.",
      },
      {
        question: "Bạn nhờ công cụ ra câu hỏi tự kiểm tra. Điều gì làm cho câu hỏi này đáng tin?",
        options: [
          "Mỗi câu hỏi kèm đoạn nguồn chứa đáp án",
          "Công cụ tự nhận xét rằng câu hỏi này khá khó với người mới",
          "Câu hỏi nghe giống đề thi thật",
          "Số lượng câu hỏi nhiều hơn hai mươi",
        ],
        correct: 0,
        explanation:
          "Đoạn nguồn chứa đáp án cho phép bạn biết câu hỏi bám vào tài liệu, không phải bịa. Độ khó tự nhận, vẻ giống đề thi hay số lượng đều không chứng minh câu hỏi đúng.",
      },
      {
        question: "Khi tự trả lời câu hỏi, bạn thấy mình sai ba trên mười câu. Nên làm gì?",
        options: [
          "Đọc lại đúng phần nguồn của ba câu sai rồi tự trả lời lại",
          "Nhờ công cụ đổi sang bộ câu hỏi dễ hơn",
          "Coi đó là bình thường và sang chủ đề khác luôn",
          "Học thuộc đáp án ba câu đó mà không đọc nguồn",
        ],
        correct: 0,
        explanation:
          "Câu sai chỉ ra chỗ chưa hiểu. Quay về đúng đoạn nguồn và thử lại là vòng học có hiệu quả. Đổi sang câu dễ hơn che lỗ hổng, bỏ qua thì lỗ hổng còn đó, học thuộc đáp án không đổi được hiểu biết.",
      },
      {
        question: "Bạn hỏi 'chi phí khai báo hải quan thường là bao nhiêu?' và nguồn không nhắc. Công cụ trả lời một con số. Điều đúng là gì?",
        options: [
          "Con số không có trong nguồn nên coi là chưa đáng tin cho tới khi tìm được nguồn",
          "Con số đáng tin vì rất nhiều người xung quanh bạn cũng nghĩ như vậy",
          "Dùng con số đó làm mốc tạm thời vì hiện chưa có con số nào khác trong tay để so sánh",
          "Coi con số là đúng khi công cụ nói bằng giọng rất tự tin và chắc chắn",
        ],
        correct: 0,
        explanation:
          "Khi nguồn không nhắc, công cụ có thể đang dùng kiến thức chung hoặc bịa. Bạn cần một câu hỏi yêu cầu chỉ dựa trên nguồn, hoặc tìm thêm tài liệu. Độ tự tin của giọng văn và việc 'nhiều người nghĩ vậy' đều không phải bằng chứng.",
      },
    ],
    keyTakeaways: [
      "Khoảng bốn tài liệu tin cậy, khác góc nhìn, tốt hơn hai mươi bài lẫn lộn.",
      "Hỏi từng bước: khái niệm, quy trình, sai lầm hay gặp.",
      "Nhờ ra câu hỏi tự kiểm tra kèm đoạn nguồn chứa đáp án.",
      "Câu trả lời sai chỉ ra chỗ cần đọc lại nguồn.",
    ],
    practicePrompt: {
      question:
        "Bạn có bốn tài liệu về xuất khẩu nhưng công cụ trả lời dài dòng, không nói rõ lấy từ tài liệu nào. Bạn sửa cách hỏi thế nào?",
      options: [
        "Yêu cầu trả lời ngắn, chỉ dùng tài liệu đã tải, ghi tên tài liệu cho từng ý",
        "Hỏi lại cùng câu, hy vọng lần này câu trả lời có nguồn",
        "Thêm câu 'hãy trả lời thật chính xác' vào cuối câu hỏi",
        "Xoá hết tài liệu và tải lại từ đầu để công cụ đọc mới",
      ],
      correct: 0,
      explanation:
        "Giới hạn nguồn, độ dài và yêu cầu ghi tên tài liệu là các chỉ dẫn cụ thể công cụ làm theo được. Lặp lại câu hỏi hay thêm 'chính xác' không đổi cách trả lời, và tải lại không giải quyết vấn đề cách hỏi.",
    },
    summary: {
      keyIdea: "Bộ tài liệu nhỏ, tin cậy và cách hỏi từng bước cho bạn học nhanh mà vẫn kiểm được.",
      formula: "Bốn nguồn tốt → hỏi từng bước → tự kiểm tra kèm nguồn → đọc lại chỗ sai.",
      commonMistake: "Tải thật nhiều bài lẫn lộn rồi tin mọi câu trả lời.",
      action: "Chọn một chủ đề bạn cần nắm trong tháng này và gom bốn tài liệu cho nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một chủ đề mới bạn cần hiểu cho công việc tháng này. Gom bốn tài liệu tin cậy (ít nhất một của công ty hoặc chính thức), tải lên trợ lý đọc tài liệu và hỏi ba câu theo thứ tự: khái niệm chính, các bước cơ bản, ba sai lầm hay gặp. Nhờ ra năm câu hỏi tự kiểm tra kèm đoạn nguồn, tự trả lời rồi đối chiếu.",
      secondary: "Ghi lại câu nào bạn trả lời sai để đọc lại vào ngày mai.",
    },
    sections: [
      {
        type: "lead",
        text: "Công việc đổi và bạn phải nắm nhanh một lĩnh vực mới. Bài cuối của chặng gom lại mọi điều đã học thành một dự án nhỏ: bộ tài liệu tự học.",
      },
      {
        type: "feynman",
        title: "Bộ tài liệu tự học đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn có một kệ bốn cuốn sách chọn lọc và một người hướng dẫn chỉ trả lời dựa trên bốn cuốn đó. Học nhanh vì kệ nhỏ; học chắc vì bạn tự kiểm tra.",
        columns: ["Thành phần", "Kệ bốn cuốn sách chọn lọc", "Bộ tài liệu cho trợ lý"],
        rows: [
          ["Nguồn", "Sách bạn đã chọn và tin", "Tài liệu bạn tải lên"],
          ["Người hướng dẫn", "Chỉ trả lời theo bốn cuốn", "Trả lời bám theo nguồn, ghi tên tài liệu"],
          ["Cách học", "Hỏi từng chương, tự làm bài tập", "Hỏi từng bước, tự trả lời câu kiểm tra"],
          ["Chỗ nguy hiểm", "Sách sai hoặc lỗi thời", "Nguồn kém, hoặc công cụ trả lời ngoài nguồn"],
        ],
        oneLiner: "Bộ nguồn nhỏ và tốt, hỏi từng bước, rồi tự kiểm tra mình.",
      },
      { type: "heading", text: "Bước 1: chọn bốn tài liệu" },
      {
        type: "paragraph",
        text: "Chọn một tài liệu nhập môn dễ đọc, một tài liệu chính thức hay của công ty, một tài liệu có ví dụ thực tế và một tài liệu nói về sai lầm hay gặp. Ít nhưng khác góc nhìn giúp bạn thấy chỗ hai nguồn lệch nhau.",
      },
      {
        type: "flow",
        title: "Bốn bước của dự án tự học",
        steps: [
          { label: "Gom bốn nguồn", detail: "Một nhập môn, một chính thức, một ví dụ thực tế, một về sai lầm hay gặp. Đặt tên file rõ." },
          { label: "Hỏi từng bước", detail: "Hỏi khái niệm chính trước, rồi quy trình, rồi sai lầm hay gặp. Mỗi câu nhờ ghi tên tài liệu." },
          { label: "Tự kiểm tra", detail: "Nhờ ra năm câu hỏi kèm đoạn nguồn chứa đáp án. Tự trả lời trước khi xem đáp án." },
          { label: "Đọc lại chỗ sai", detail: "Câu nào sai thì mở đúng đoạn nguồn, đọc lại và trả lời lại sau một ngày." },
        ],
      },
      {
        type: "list",
        items: [
          "Nguồn đáng tin: tài liệu chính thức, tài liệu nội bộ đã duyệt, sách hay bài giảng của người có chuyên môn.",
          "Hỏi 'theo tài liệu đã tải' để công cụ không lấy thêm từ nơi khác.",
          "Câu trả lời không có nguồn: coi là chưa kiểm.",
          "Chủ đề liên quan đến luật, thuế hay sức khoẻ: hỏi bộ phận pháp chế, kế toán trưởng hoặc chuyên gia.",
        ],
      },
      {
        type: "callout",
        label: "Nguồn kém thì học kém",
        text: "Trợ lý đọc tài liệu giúp bạn học nhanh từ nguồn bạn đưa vào, nhưng không biến nguồn sai thành đúng. Dành thời gian chọn nguồn trước khi hỏi.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ trợ lý dạy quy trình xuất khẩu từ bốn tài liệu",
        task: "Bạn vừa nhận mảng xuất khẩu và đã tải lên bốn tài liệu. Lắp câu lệnh đầu tiên để bắt đầu học.",
        parts: [
          {
            id: "role",
            label: "Bối cảnh và nguồn",
            options: [
              { text: "Dạy tôi về xuất khẩu.", feedback: "Quá rộng: không giới hạn nguồn, câu trả lời dễ lẫn kiến thức chung và chi tiết bịa." },
              {
                text: "Tôi là người mới phụ trách xuất khẩu. Chỉ dựa trên bốn tài liệu đã tải lên, giải thích quy trình cơ bản.",
                good: true,
                feedback: "Nêu rõ người học và giới hạn nguồn nên câu trả lời bám vào tài liệu và đúng mức người mới.",
              },
            ],
          },
          {
            id: "shape",
            label: "Hình dạng câu trả lời",
            options: [
              {
                text: "Liệt kê các bước theo thứ tự, mỗi bước một câu và ghi tên tài liệu nguồn.",
                good: true,
                feedback: "Các bước có thứ tự và có nguồn cho bạn đường kiểm từng bước.",
              },
              { text: "Viết một bài thật dài và đầy đủ.", feedback: "Bài dài khó kiểm và dễ lẫn chi tiết thêm vào; bạn không biết đoạn nào từ nguồn nào." },
            ],
          },
          {
            id: "gap",
            label: "Xử lý chỗ thiếu",
            options: [
              { text: "Nếu không có trong tài liệu thì tự suy ra cho đầy đủ.", feedback: "Suy ra là cách công cụ thêm chi tiết không có trong nguồn." },
              {
                text: "Nếu tài liệu không nói, ghi 'không có trong tài liệu' thay vì đoán.",
                good: true,
                feedback: "Câu này cho bạn biết chỗ cần tìm thêm nguồn, thay vì nhận một chi tiết bịa.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["role", "shape", "gap"],
            text: "Quy trình cơ bản theo bốn tài liệu:\n1. Chuẩn bị hợp đồng mua bán (Tài liệu 2: Sổ tay nội bộ).\n2. Chuẩn bị bộ chứng từ (Tài liệu 1: Nhập môn, Tài liệu 3: Ví dụ thực tế).\n3. Khai báo và làm thủ tục thông quan (Tài liệu 2).\n4. Theo dõi giao hàng và thanh toán (Tài liệu 3).\n\nKhông có trong tài liệu: chi phí cụ thể cho từng bước.",
          },
          {
            requires: ["role"],
            text: "Xuất khẩu gồm chuẩn bị hợp đồng, chứng từ, thông quan, giao hàng và thanh toán. Mỗi bước cần phối hợp nhiều bên...\n\n(Đúng hướng nhưng là bài dài, không ghi nguồn và không cho biết chỗ nào tài liệu không nói.)",
          },
          {
            text: "Xuất khẩu tốn trung bình 3% giá trị lô hàng cho chi phí thủ tục và cần giấy phép đặc biệt với mọi mặt hàng...\n\n(Không giới hạn nguồn nên công cụ bịa: 3% và giấy phép mọi mặt hàng không có trong tài liệu nào.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tuần đầu phụ trách mảng xuất khẩu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã hỏi ba câu và công cụ trả lời trôi chảy. Thứ Sáu bạn có buổi trao đổi với trưởng phòng về quy trình.",
            choices: [
              { label: "Tin các câu trả lời vì đều có vẻ hợp lý và đi họp", next: "bad_trust" },
              { label: "Nhờ công cụ ra năm câu hỏi tự kiểm tra kèm đoạn nguồn, tự trả lời trước", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Trưởng phòng hỏi một bước bạn không nắm chắc, và bạn nhận ra mình chỉ đọc qua câu trả lời mà chưa hiểu. Buổi trao đổi trở thành buổi giảng lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn trả lời sai hai trên năm câu. Đối chiếu nguồn, một câu bạn nhớ lẫn hai bước, câu kia là một điều kiện bạn chưa từng đọc.",
            choices: [
              { label: "Đọc lại hai đoạn nguồn, ghi ra điểm chưa chắc và hỏi trưởng phòng đúng hai điểm đó", next: "good" },
              { label: "Bỏ hai câu đó vì chỉ chiếm 40% bộ câu hỏi", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Hai chỗ bạn bỏ qua lại là điều kiện quan trọng nhất của quy trình. Tuần sau bạn chuẩn bị thiếu chứng từ.",
            ending: "bad",
          },
          good: {
            text: "Trưởng phòng bổ sung hai điểm trong 5 phút. Bạn ghi vào sổ tay cá nhân và lặp lại bộ câu hỏi vào tuần sau để kiểm tiến bộ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nguồn nhỏ, tin cậy; hỏi từng bước; tự kiểm tra mình.",
          "Chặng này đã dạy bạn đọc tài liệu cùng trợ lý mà vẫn giữ quyền kiểm chứng.",
        ],
      },
    ],
  },
];
