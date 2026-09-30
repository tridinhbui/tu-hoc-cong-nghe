import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 47, bài 1-5. Giáo trình: scripts/curriculum/stage-47.json.
// Nội dung dạy khái niệm bền (xin phép, kiểm bản chép, đối chiếu nguồn), không
// dựa vào tính năng hay nút bấm riêng của công cụ nào.

// Đáp án đúng để ở vị trí 0; vị trí được xáo lại lúc build.
const Q = (question: string, good: string, bad: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [good, ...bad],
  correct: 0,
  explanation,
});

export const S47_A_LESSONS: Lesson[] = [
  {
    id: 2340,
    slug: "ghi-am-cuoc-hop-nho-xin-phep-truoc",
    title: "Chặng 47, Bài 1: Ghi âm cuộc họp: xin phép trước khi bấm nút",
    subtitle: "Một câu xin phép nói rõ ghi để làm gì, lưu ở đâu, ai được nghe - trước khi đèn ghi âm sáng lên.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎙️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai bạn định bật ghi âm buổi họp nhóm để khỏi phải chép tay. Nhưng trong phòng có người đang bàn chuyện khách hàng, có người ngại bị ghi lại. Một câu xin phép rõ ràng giữ được lòng tin của đồng nghiệp và tránh rắc rối về sau.",
    openingQuestion:
      "Bạn là người viết biên bản của buổi họp nhóm và muốn ghi âm để khỏi bỏ sót ý. Việc nào nên làm đầu tiên?",
    openingOptions: [
      "Hỏi mọi người trước, nói rõ ghi để làm gì, lưu ở đâu và ai được nghe",
      "Bật ghi âm lặng lẽ, vì mục đích chỉ là viết biên bản cho chính xác",
      "Bật ghi âm rồi thông báo sau họp để không làm gián đoạn cuộc họp",
      "Chỉ hỏi người chủ trì, vì người tham dự khác sẽ làm theo người chủ trì",
    ],
    correctOption: 0,
    explanation:
      "Người ta chỉ thoải mái nói thật khi biết giọng mình sẽ đi đâu. Vì vậy câu xin phép cần ba thứ: ghi để làm gì, lưu ở đâu, ai được nghe. Ghi lén dù mục đích tốt vẫn làm mất lòng tin và có thể vi phạm quy định của công ty. Thông báo sau thì người ta đã lỡ nói xong. Chỉ hỏi người chủ trì bỏ qua những người có quyền từ chối. Luật về ghi âm khác nhau theo nơi và theo công ty, nên bạn hỏi bộ phận pháp chế hoặc quy định nội bộ.",
    diagram: [
      { label: "Xác định mục đích ghi: chỉ để viết biên bản", arrow: true },
      { label: "Xin phép cả phòng: làm gì, lưu đâu, ai nghe", arrow: true },
      { label: "Ai không đồng ý thì không ghi hoặc ghi phần khác", arrow: true },
      { label: "Ghi, dùng đúng mục đích rồi xoá theo thời hạn đã hứa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý hành chính muốn ghi âm họp phòng hằng tuần. Đầu buổi chị nói: 'Em ghi âm để viết biên bản, file lưu trong thư mục chung của phòng, chỉ phòng mình nghe, em xoá sau khi biên bản được duyệt. Ai không muốn bị ghi thì báo em.' Một đồng nghiệp xin tắt ghi ở phần bàn về đánh giá nhân sự, và chị tắt đúng phần đó.",
    },
    quiz: [
      Q(
        "Câu xin phép ghi âm cuộc họp cần nói rõ những gì?",
        "Ghi để làm gì, lưu ở đâu, ai được nghe và khi nào xoá",
        ["Chỉ cần nói là ghi âm để cho nhanh, còn chi tiết khác thì không cần", "Tên phần mềm đang dùng, dung lượng file ghi âm và tên người phụ trách kỹ thuật", "Cuộc họp dài bao lâu, vì người ta chỉ quan tâm bị ghi trong bao lâu"],
        "Người nghe quan tâm giọng mình đi đâu, chứ không quan tâm phần mềm hay dung lượng. Chỉ nói 'cho nhanh' thì không trả lời được câu hỏi ai sẽ nghe lại. Thời lượng ghi chỉ là một chi tiết nhỏ, còn mục đích, nơi lưu, người nghe và hạn xoá mới là thứ làm nên sự đồng ý có hiểu biết."
      ),
      Q(
        "Một đồng nghiệp nói: 'Mình không muốn bị ghi âm.' Bạn nên làm gì?",
        "Tôn trọng: không ghi phần của người đó hoặc chỉ ghi chú tay",
        ["Giải thích rằng ghi âm chỉ để viết biên bản nên người đó không cần lo, rồi vẫn ghi", "Bỏ phiếu trong phòng và làm theo số đông", "Ghi âm bình thường nhưng hứa sẽ không nghe lại phần của người đó"],
        "Sự đồng ý chỉ có giá trị khi người ta có thể từ chối. Thuyết phục rồi vẫn ghi là biến lời xin phép thành thông báo. Bỏ phiếu theo số đông cũng vậy, vì quyền của một người không phải để đa số quyết. Hứa không nghe lại thì file vẫn chứa giọng người đó, và lời hứa khó kiểm chứng."
      ),
      Q(
        "Vì sao không nên bật ghi âm lén dù mục đích chỉ là viết biên bản cho đúng?",
        "Mục đích tốt không thay được sự đồng ý, và có thể vi phạm quy định",
        ["Vì ghi lén làm chất lượng âm thanh kém hơn ghi công khai", "Vì biên bản viết từ bản ghi lén thường bị sai nhiều chỗ hơn", "Vì người chủ trì luôn phát hiện ra và xử lý kỷ luật người ghi"],
        "Điểm mấu chốt là sự đồng ý và quy định, không phải kỹ thuật. Chất lượng âm thanh không phụ thuộc chuyện lén hay công khai. Độ chính xác của biên bản cũng vậy. Và không phải lúc nào cũng bị phát hiện, nên không thể lấy đó làm lý do; lý do đúng là lòng tin và quy định."
      ),
      Q(
        "Họp tuần nào cũng ghi âm. Có cần xin phép lại mỗi tuần không?",
        "Có, nhắc nhanh một câu đầu buổi, nhất là khi có người mới tham dự",
        ["Không, đã đồng ý một lần thì mọi buổi sau đều tính là đồng ý", "Chỉ cần xin lại khi đổi người viết biên bản", "Chỉ cần xin lại khi cuộc họp bàn đề tài nhạy cảm, còn họp thường thì thôi"],
        "Người mới vào phòng chưa từng đồng ý, và người cũ có thể đổi ý. Một câu nhắc đầu buổi chỉ mất vài giây. Đổi người viết biên bản không phải lý do duy nhất để xin lại, và chờ tới khi có đề tài nhạy cảm là muộn, vì bạn không biết trước ai đang ngại."
      ),
      Q(
        "File ghi âm nên được xử lý thế nào sau khi biên bản đã được duyệt?",
        "Xoá hoặc lưu theo đúng thời hạn đã nói khi xin phép",
        ["Giữ vô thời hạn trên máy cá nhân phòng khi cần tra lại", "Gửi cho cả phòng để mọi người tự nghe lại khi cần", "Tải lên bất kỳ công cụ AI miễn phí nào để lưu trữ cho gọn"],
        "Lời hứa về thời hạn là một phần của sự đồng ý, nên làm đúng điều đã nói. Giữ vô thời hạn trên máy cá nhân vừa trái lời hứa vừa có nguy cơ rò rỉ. Gửi cả phòng mở rộng số người nghe ngoài điều đã hứa, còn đưa lên công cụ chưa được duyệt là đưa dữ liệu công ty ra ngoài."
      ),
    ],
    keyTakeaways: [
      "Xin phép trước khi bấm nút ghi, không phải sau.",
      "Câu xin phép có ba phần: để làm gì, lưu ở đâu, ai được nghe (cộng hạn xoá).",
      "Ai từ chối thì tôn trọng: không ghi phần đó.",
      "Nhắc lại đầu mỗi buổi, nhất là khi có người mới.",
      "Quy định ghi âm khác nhau theo nơi và theo công ty: hỏi bộ phận pháp chế hoặc quy định nội bộ.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nói đầu buổi họp: 'Mình ghi âm nhé.' Mọi người gật đầu. Câu xin phép này còn thiếu gì?",
      options: [
        "Mục đích, nơi lưu, ai được nghe và khi nào xoá",
        "Tên công cụ ghi âm và thời lượng tối đa của file",
        "Lời xin lỗi vì làm gián đoạn đầu buổi họp",
        "Chữ ký của từng người trên một tờ giấy cam kết",
      ],
      correct: 0,
      explanation:
        "Gật đầu trước một câu quá ngắn chưa phải đồng ý có hiểu biết vì người ta không biết file đi đâu. Tên công cụ và thời lượng không trả lời câu hỏi đó. Lời xin lỗi không thay được thông tin. Chữ ký từng người thường không cần cho một buổi họp nhóm, cái cần là nội dung rõ ràng, còn nếu công ty có mẫu riêng thì hỏi bộ phận pháp chế.",
    },
    summary: {
      keyIdea: "Ghi âm họp bắt đầu bằng sự đồng ý rõ ràng, không bắt đầu bằng nút bấm.",
      formula: "Xin phép = để làm gì + lưu ở đâu + ai được nghe + khi nào xoá.",
      commonMistake: "Nói 'mình ghi âm nhé' rồi bấm luôn, hoặc ghi lén vì nghĩ mục đích mình tốt.",
      action: "Soạn sẵn một câu xin phép ba phần và dùng ở buổi họp tới.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở buổi họp nhóm sắp tới trong lịch của bạn. Viết sẵn câu xin phép ghi âm của riêng bạn (mục đích, nơi lưu, ai nghe, hạn xoá), tối đa 3 câu. Tìm xem công ty có quy định về ghi âm họp không; nếu không rõ thì nhắn hỏi quản lý hoặc bộ phận pháp chế. Ngày mai dán câu đó vào ghi chú họp.",
      secondary: "Ghi lại một câu hỏi bạn dự đoán đồng nghiệp sẽ hỏi lại để chuẩn bị câu trả lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai này bạn định bật ghi âm buổi họp nhóm để lúc viết biên bản khỏi phải nhớ lại từng câu. Trước khi bấm nút, bài này dạy một thứ mất 20 giây: câu xin phép đúng.",
      },
      {
        type: "feynman",
        title: "Xin phép ghi âm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn muốn chụp ảnh đồng nghiệp đăng lên nhóm chung. Bạn hỏi: chụp để làm gì, đăng ở đâu, ai xem được. Ghi âm họp cũng là đúng ba câu hỏi ấy, chỉ khác là giọng nói nhạy hơn tấm ảnh.",
        columns: ["Điều cần nói", "Chụp ảnh đăng nhóm", "Ghi âm buổi họp"],
        rows: [
          ["Để làm gì", "Làm kỷ niệm sinh nhật", "Viết biên bản"],
          ["Lưu ở đâu", "Nhóm Zalo của phòng", "Thư mục chung của phòng"],
          ["Ai xem/nghe", "Chỉ thành viên nhóm", "Chỉ người trong phòng"],
          ["Ai không muốn", "Không chụp hoặc che mặt", "Không ghi phần của người đó"],
        ],
        oneLiner: "Xin phép ghi âm là trả lời trước ba câu hỏi: để làm gì, lưu ở đâu, ai được nghe.",
      },
      { type: "heading", text: "Vì sao giọng nói cần cẩn thận hơn chữ" },
      {
        type: "paragraph",
        text: "Một bản ghi âm giữ nguyên giọng, ngập ngừng, cả câu nói lỡ. Trong họp, người ta hay nói nháp: 'chắc là tháng sau' hay 'tôi nghĩ là hơi khó'. Khi biết mình đang bị ghi, họ nói cẩn thận hơn, nên biết trước ai nghe lại là chuyện lợi cho chính cuộc họp.",
      },
      {
        type: "flow",
        title: "Từ ý định ghi đến khi xoá file",
        steps: [
          { label: "Tự hỏi: ghi để làm gì", detail: "Nếu mục đích chỉ là viết biên bản, hãy nói đúng như vậy, đừng mở rộng sang việc khác như đánh giá ai nói nhiều." },
          { label: "Kiểm quy định công ty", detail: "Hỏi bộ phận pháp chế hoặc xem quy định nội bộ về ghi âm họp. Bạn không cần biết luật, chỉ cần biết công ty cho phép gì." },
          { label: "Xin phép cả phòng", detail: "Nói ba phần: để làm gì, lưu ở đâu, ai được nghe, và hạn xoá. Dừng lại vài giây để người ta kịp phản ứng." },
          { label: "Tôn trọng người từ chối", detail: "Tắt ghi ở phần họ nói hoặc chỉ ghi chú tay. Đừng hỏi lại lần hai." },
          { label: "Dùng đúng mục đích rồi xoá", detail: "Viết biên bản, được duyệt xong thì xoá hoặc lưu theo hạn đã hứa." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn câu xin phép ghi âm",
        task: "Bạn nhờ AI soạn một câu xin phép ngắn để đọc đầu buổi họp nhóm 8 người. Lắp yêu cầu cho AI bằng cách chọn một phương án mỗi phần.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích ghi",
            options: [
              { text: "Ghi lại cuộc họp để dùng cho nhiều việc sau này.", feedback: "'Nhiều việc' là mơ hồ: đồng nghiệp không biết có bị dùng để đánh giá mình không, nên dễ từ chối hoặc ngại nói." },
              { text: "Chỉ để viết biên bản họp tuần, không dùng vào việc khác.", good: true, feedback: "Mục đích hẹp và rõ: người nghe biết giọng mình chỉ phục vụ biên bản." },
            ],
          },
          {
            id: "storage",
            label: "Lưu trữ và người nghe",
            options: [
              { text: "File lưu thư mục chung của phòng, chỉ phòng mình nghe, xoá sau khi biên bản được duyệt.", good: true, feedback: "Nói rõ nơi lưu, người nghe và hạn xoá: đủ để người ta quyết định có thoải mái hay không." },
              { text: "File được lưu an toàn, bạn không cần lo.", feedback: "'An toàn' là lời trấn an chứ không phải thông tin: không nói ai nghe và lưu bao lâu nên không ai biết mình đồng ý với điều gì." },
            ],
          },
          {
            id: "optout",
            label: "Quyền từ chối",
            options: [
              { text: "Nếu ai không muốn bị ghi, mình sẽ tắt ghi ở phần đó hoặc chỉ ghi chú tay.", good: true, feedback: "Có lối ra rõ ràng nên sự đồng ý là thật, không phải bị ép." },
              { text: "Mọi người vui lòng thông cảm vì việc này rất cần thiết.", feedback: "Câu này ép đồng ý: người ngại sẽ khó nói 'tôi không muốn' trước cả phòng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "storage", "optout"],
            text: "Trước khi bắt đầu, mình xin phép ghi âm buổi họp này. Mình ghi chỉ để viết biên bản, file lưu trong thư mục chung của phòng, chỉ phòng mình nghe và mình xoá sau khi biên bản được duyệt. Ai không muốn bị ghi thì nói mình, mình sẽ tắt ghi ở phần đó hoặc chỉ ghi chú tay.",
          },
          {
            requires: ["purpose"],
            text: "Mình ghi âm buổi họp để viết biên bản nhé, mọi người thông cảm vì việc này rất cần thiết.\n\n(Có mục đích nhưng thiếu nơi lưu, người nghe, hạn xoá và không cho ai từ chối.)",
          },
          {
            text: "Mình ghi âm lại cuộc họp để dùng cho nhiều việc sau này, file được lưu an toàn, mọi người đừng lo.\n\n(Mơ hồ: đồng nghiệp không biết file đi đâu và dùng vào việc gì.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Xin phép rõ ràng",
          text: "Mọi người biết file đi đâu nên nói thoải mái hơn. Người ngại có lối ra. Nếu ai hỏi lại, bạn đã có câu trả lời sẵn. Lòng tin trong nhóm giữ được.",
        },
        right: {
          label: "Bấm ghi trước, giải thích sau",
          text: "Người ta phát hiện thì thấy bị qua mặt. Họ ngừng nói thật trong các buổi sau. Bạn có thể vi phạm quy định công ty mà không biết. Một bản ghi tốt không bù được lòng tin đã mất.",
        },
      },
      {
        type: "scenario",
        title: "Đầu buổi họp nhóm, đèn ghi âm sắp sáng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn là người viết biên bản. Tám người đã vào phòng, bạn có điện thoại đặt sẵn trên bàn.",
            choices: [
              { label: "Bấm ghi âm luôn, không nói gì để khỏi mất thời gian", next: "bad_secret" },
              { label: "Đọc câu xin phép ba phần: mục đích, nơi lưu, ai nghe", next: "s2" },
            ],
          },
          bad_secret: {
            text: "Giữa buổi, một đồng nghiệp thấy màn hình ghi âm và hỏi. Cả phòng im lặng, mọi người bắt đầu nói rất ngắn gọn. Biên bản thiếu hẳn các ý nháp.",
            ending: "bad",
          },
          s2: {
            text: "Một đồng nghiệp nói: 'Phần bàn về lương thì mình không muốn bị ghi.'",
            choices: [
              { label: "Nói: 'Không sao, mình sẽ tắt ghi ở phần đó'", next: "good" },
              { label: "Nói: 'Ghi thôi, mình chỉ dùng viết biên bản mà'", next: "bad_push" },
            ],
          },
          bad_push: {
            text: "Người đó im lặng suốt phần còn lại. Phần lương được bàn vội và sau đó có hai người nhắn riêng hỏi file sẽ ai nghe.",
            ending: "bad",
          },
          good: {
            text: "Bạn tắt ghi ở phần đó và chép tay vài dòng. Mọi người thấy lời xin phép là thật, nên các phần còn lại được bàn cởi mở.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Luật khác nhau theo nơi và theo công ty",
        text: "Quy định về ghi âm cuộc họp khác nhau giữa các nước, giữa các công ty và giữa họp nội bộ với họp có khách. Bạn không cần tự giải thích luật: hỏi bộ phận pháp chế hoặc quản lý trực tiếp, và làm theo quy định nội bộ.",
      },
      {
        type: "closing",
        lines: [
          "Ba câu hỏi trước nút ghi: để làm gì, lưu ở đâu, ai được nghe.",
          "Bài sau: bản chép lời từ AI, đọc lại và đánh dấu chỗ nghi ngờ.",
        ],
      },
    ],
  },
  {
    id: 2341,
    slug: "ban-chep-loi-tu-ai-doc-lai-va-danh-dau-nghi-ngo",
    title: "Chặng 47, Bài 2: Bản chép lời từ AI: đọc lại và đánh dấu chỗ nghi ngờ",
    subtitle: "Bản chép 20 phút trông rất sạch, nhưng số, tên riêng và chỗ nghe khó mới là nơi cần nghe lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn vừa nhận bản chép lời 20 phút của cuộc họp với khách. Nó có dấu câu đàng hoàng, đọc lướt thấy ổn. Nhưng một con số nghe nhầm hay một tên khách sai có thể đi thẳng vào biên bản. Biết chỗ nào cần nghe lại giúp bạn kiểm trong 5 phút thay vì nghe lại 20 phút.",
    openingQuestion:
      "Bạn nhận bản chép lời 20 phút từ AI, trông rất sạch và đúng chính tả. Bạn sẽ kiểm bằng cách nào hiệu quả nhất?",
    openingOptions: [
      "Nghe lại đoạn có số, tên riêng, ngày giờ và chỗ nghe không rõ, rồi sửa",
      "Đọc lướt một lượt, vì văn bản sạch nghĩa là AI đã nghe đúng hết",
      "Nhờ chính AI đó đọc lại bản chép và tự báo chỗ nó sai",
      "Nghe lại toàn bộ 20 phút và so từng chữ với bản chép",
    ],
    correctOption: 0,
    explanation:
      "Bản chép sạch chữ không bảo đảm nghe đúng: AI đoán chữ hợp lý nên một con số hay tên riêng sai vẫn trông bình thường. Chỗ rủi ro cao là số, tên riêng, ngày giờ và đoạn nhiều người nói chồng nhau, nên bạn nghe lại đúng những chỗ ấy. Đọc lướt không phát hiện được lỗi nghe. Nhờ AI tự kiểm thì nó không có thêm thông tin nào ngoài cái nó đã nghe. Nghe lại toàn bộ tốn thời gian mà không cần thiết.",
    diagram: [
      { label: "Nhận bản chép lời từ AI", arrow: true },
      { label: "Đánh dấu số, tên riêng, ngày giờ, chỗ nhiều người nói", arrow: true },
      { label: "Nghe lại đúng các chỗ đã đánh dấu", arrow: true },
      { label: "Sửa bản chép và ghi chú chỗ vẫn chưa chắc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh nhận bản chép lời cuộc gọi với khách. Bản chép ghi 'giao hàng ngày mười lăm', nhưng khi nghe lại đoạn đó, khách nói 'mười năm' là tên của một mã hàng chứ không phải ngày. Nhờ đánh dấu số và nghe lại mà chị sửa kịp trước khi gửi email xác nhận.",
    },
    quiz: [
      Q(
        "Bản chép lời AI trông sạch và đúng chính tả. Điều này nói gì về độ chính xác?",
        "Chưa nói gì: AI đoán chữ hợp lý nên lỗi vẫn nằm trong câu đọc mượt",
        ["Nghĩa là AI đã nghe đúng gần hết, chỉ còn vài lỗi dấu câu nhỏ", "Nghĩa là âm thanh tốt, nên không cần nghe lại chỗ nào nữa", "Nghĩa là bản chép đã được một người thật kiểm lại trước đó"],
        "Độ sạch của văn bản và độ đúng của nội dung là hai chuyện khác nhau. Một tên khách bị nghe thành tên khác vẫn viết đúng chính tả. Âm thanh tốt giúp giảm lỗi nhưng không xoá hết, và bản chép tự động không có người thật kiểm sau lưng trừ khi bạn tự làm."
      ),
      Q(
        "Đoạn nào trong bản chép nên ưu tiên nghe lại đầu tiên?",
        "Đoạn có số tiền, ngày giờ, tên khách và mã hàng",
        ["Đoạn chào hỏi đầu buổi, vì đó là chỗ mọi người nói lộn xộn nhất", "Đoạn dài nhất vì xác suất sai tỷ lệ với số chữ", "Đoạn cuối cùng vì AI thường mệt và nghe kém hơn về cuối"],
        "Hậu quả sai khác nhau: sai một câu chào ít ảnh hưởng, sai một con số hay tên khách thì đi vào biên bản. Đoạn dài chỉ đáng nghe lại nếu nó chứa số hoặc tên. Và AI không mệt dần: vị trí trong bản ghi không quyết định độ sai."
      ),
      Q(
        "Hai người nói chồng lên nhau, bản chép ghi một câu trơn tru. Nên xử lý thế nào?",
        "Nghe lại, nếu vẫn không rõ thì đánh dấu [không rõ]",
        ["Giữ nguyên câu AI ghi, vì AI nghe tốt hơn tai người", "Xoá hẳn đoạn đó khỏi bản chép cho đỡ rối mắt", "Đoán ý người nói rồi viết lại câu cho hợp lý với phần còn lại"],
        "Đoạn nói chồng là nơi AI dễ ghép hai câu thành một câu không ai nói. Giữ nguyên tin vào chỗ không đáng tin. Xoá đoạn làm mất nội dung, còn tự đoán ý là bịa thay AI. Đánh dấu [không rõ] giữ sự trung thực với bản ghi và nhắc hỏi lại người nói."
      ),
      Q(
        "Bản chép ghi 'hạn nộp ngày 13 tháng 5', bạn nhớ người họp nói 30. Bạn làm gì?",
        "Nghe lại đoạn đó tại đúng chỗ, rồi xác nhận với người nói nếu còn mơ hồ",
        ["Tin vào trí nhớ của mình vì bạn có mặt trong cuộc họp", "Tin bản chép vì máy không nhầm ngày", "Ghi cả hai ngày vào biên bản cho chắc"],
        "Khi trí nhớ và bản chép mâu thuẫn, bản ghi âm là nguồn gốc để phân xử. Cả trí nhớ và AI đều có thể nhầm. Ghi cả hai ngày làm biên bản mơ hồ về đúng thứ người đọc cần biết."
      ),
      Q(
        "Nhờ chính AI đã chép lời đọc lại và 'tìm chỗ bạn sai' có đủ không?",
        "Không đủ: nó chỉ có cái nó đã nghe, nên bạn vẫn phải nghe lại chỗ rủi ro",
        ["Đủ, vì AI biết rõ chỗ nào nó không chắc và sẽ báo lại một cách trung thực cho bạn", "Đủ, nếu yêu cầu nó kiểm hai lần liên tiếp", "Đủ, nếu dùng một công cụ AI thứ hai để kiểm chéo mọi chỗ"],
        "Khi chép sai, AI thường tự tin vào chữ đã viết và không có thêm thông tin nào từ âm thanh gốc. Kiểm hai lần chỉ lặp lại cùng hiểu lầm. Một công cụ thứ hai có thể giúp gợi ý chỗ khác nhau, nhưng chỉ tai người nghe lại mới quyết định đúng sai."
      ),
    ],
    keyTakeaways: [
      "Văn bản sạch không có nghĩa là nghe đúng.",
      "Số, tên riêng, ngày giờ và đoạn nhiều người nói là chỗ cần nghe lại.",
      "Chỗ vẫn không rõ thì đánh dấu [không rõ], đừng đoán.",
      "Bản ghi âm là nguồn gốc, bản chép chỉ là bản nháp.",
      "Chất lượng âm thanh quyết định bạn phải sửa nhiều hay ít.",
    ],
    practicePrompt: {
      question:
        "Anh Phong có bản chép 30 phút, anh chỉ có 10 phút để kiểm. Cách dùng 10 phút nào hợp lý nhất?",
      options: [
        "Tìm các con số và tên riêng, nghe lại từng chỗ đó",
        "Nghe lại 10 phút đầu tiên, phần còn lại tin vào AI",
        "Đọc nhanh cả bản chép từ đầu đến cuối một lượt",
        "Nhờ AI chép lại lần hai rồi so hai bản với nhau",
      ],
      correct: 0,
      explanation:
        "Thời gian ít thì dồn vào nơi sai gây hậu quả nhất: số và tên. Nghe lại 10 phút đầu bỏ qua hai phần ba còn lại, nơi cũng có số. Đọc nhanh không phát hiện lỗi nghe. Chép lần hai có thể lặp cùng lỗi và hai bản giống nhau không chứng minh đúng.",
    },
    summary: {
      keyIdea: "Bản chép lời là bản nháp sạch: kiểm bằng cách nghe lại đúng những chỗ rủi ro cao.",
      formula: "Kiểm = đánh dấu số, tên, ngày giờ, chỗ nhiều người nói + nghe lại đúng các chỗ đó.",
      commonMistake: "Thấy văn bản đẹp, đọc lướt rồi tin hoàn toàn vào bản chép.",
      action: "Lấy một bản chép bất kỳ và gạch chân mọi số và tên riêng trước khi nghe lại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đoạn ghi âm 5 phút của chính bạn (họp, cuộc gọi hoặc tự đọc một đoạn). Chép lời bằng công cụ bạn được phép dùng. Gạch chân mọi con số và tên riêng, nghe lại từng chỗ đó và ghi lại số chỗ phải sửa. Ngày mai bạn sẽ được hỏi bao nhiêu chỗ.",
      secondary: "Ghi chú loại chỗ nào AI sai nhiều nhất ở đoạn của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bản chép lời 20 phút xuất hiện chỉ sau vài phút, sạch và có dấu câu. Đó là điều dễ làm bạn chủ quan. Bài này dạy cách kiểm nó trong 5 phút, nghe lại đúng chỗ cần nghe.",
      },
      {
        type: "feynman",
        title: "Kiểm bản chép lời đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người gõ lại băng cho bạn thuê: họ nghe rất nhanh, nhưng tên khách và số điện thoại thì họ dễ nghe nhầm. Bạn không nghe lại cả cuốn băng, bạn chỉ kiểm đúng những chỗ đó. AI chép lời cũng giống vậy.",
        columns: ["Chỗ cần xem", "Người gõ băng thuê", "AI chép lời"],
        rows: [
          ["Dễ sai", "Tên khách, số điện thoại", "Tên riêng, số, ngày giờ"],
          ["Ít sai", "Câu chào, lời nói thường", "Câu nói thông thường rõ tiếng"],
          ["Chỗ khó", "Hai người nói cùng lúc", "Nói chồng, ồn, nói nhỏ"],
          ["Cách kiểm", "Nghe lại đúng chỗ khó", "Nghe lại chỗ đã đánh dấu"],
        ],
        oneLiner: "Đừng nghe lại tất cả: hãy nghe lại những chỗ mà sai một chữ là sai cả việc.",
      },
      { type: "heading", text: "Vì sao bản sạch vẫn có thể sai" },
      {
        type: "paragraph",
        text: "AI chép lời chọn từ nghe hợp lý nhất cho đoạn âm thanh. Khi tiếng không rõ, nó vẫn viết ra một chữ thật hợp lý thay vì viết 'không nghe được'. Vì vậy lỗi không hiện ra dưới dạng chữ lạ, mà dưới dạng một từ đúng chính tả nhưng sai nghĩa.",
      },
      {
        type: "chart",
        title: "Càng ồn, càng nhiều chỗ phải sửa",
        caption: "Số liệu minh hoạ: tỷ lệ chỗ cần sửa tăng theo mức ồn nền. Kéo thanh trượt để xem âm thanh kém làm công kiểm tăng ra sao.",
        kind: "line",
        xLabel: "Mức ồn nền (1 = yên tĩnh, 10 = rất ồn)",
        yLabel: "Tỷ lệ chỗ cần sửa (%)",
        x: { from: 1, to: 10, step: 1 },
        params: [
          { id: "base", label: "Tỷ lệ sai khi yên tĩnh", min: 2, max: 10, step: 1, value: 4, unit: "%" },
          { id: "k", label: "Mỗi mức ồn thêm bao nhiêu % lỗi", min: 1, max: 6, step: 1, value: 3, unit: "%" },
        ],
        series: [
          { label: "Tỷ lệ chỗ cần sửa", expr: "min(100, base + k * x)" },
        ],
      },
      {
        type: "flow",
        title: "Kiểm một bản chép lời trong 5 phút",
        steps: [
          { label: "Đọc lướt để nắm ý chung", detail: "Một phút đầu chỉ để hiểu cuộc họp nói về gì, chưa sửa gì." },
          { label: "Gạch chân chỗ rủi ro", detail: "Mọi số, tên riêng, ngày giờ, mã hàng và đoạn nhiều người nói chồng." },
          { label: "Nghe lại đúng các chỗ ấy", detail: "Mở bản ghi tại từng chỗ, nghe câu đó hai lần nếu cần." },
          { label: "Sửa hoặc đánh dấu", detail: "Nghe rõ thì sửa, không rõ thì để [không rõ] và hỏi lại người nói." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm chỗ AI chép sai hoặc bịa",
        task: "Dưới đây là bản chép lời một cuộc họp 10 phút. Bản ghi âm gốc không có câu nào về khuyến mãi hay hoàn tiền. Bấm vào các đoạn bạn nghi ngờ rồi nộp.",
        segments: [
          { text: "Chị Hoa: Tuần này mình chốt lịch giao hàng cho khách Minh Phát." },
          { text: "Anh Tùng: Đơn của họ là 40 thùng, giao ngày 15, khoảng 9 giờ sáng." },
          { text: "Chị Hoa: Vậy mình hẹn xe ngày 15 nhé, anh Tùng báo kho chuẩn bị." },
          { text: "Anh Tùng: Công ty cũng đồng ý khuyến mãi 10% cho đơn này và hoàn tiền nếu giao trễ.", error: "Đoạn ghi âm không có câu nào nói về khuyến mãi hay hoàn tiền; AI ghép thêm cho 'đủ ý'. Cần nghe lại và xoá." },
          { text: "Chị Hoa: [không rõ] thì báo lại cho mình trong chiều nay." },
        ],
      },
      {
        type: "scenario",
        title: "Bản chép vừa về, còn 10 phút trước khi gửi khách",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản chép 20 phút, sạch đẹp. Khách đang chờ email xác nhận giờ giao hàng.",
            choices: [
              { label: "Đọc lướt một lượt, thấy ổn thì gửi luôn", next: "bad_skim" },
              { label: "Gạch chân số và tên, nghe lại các chỗ đó", next: "s2" },
            ],
          },
          bad_skim: {
            text: "Bản chép ghi giao 'ngày mười lăm' trong khi khách nói 'mười năm' là một mã hàng. Kho chuẩn bị nhầm và khách phải gọi hỏi.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nghe lại và thấy một đoạn hai người nói chồng, bản chép ghi một câu trơn tru.",
            choices: [
              { label: "Giữ nguyên câu AI ghi vì nghe có vẻ hợp lý", next: "bad_keep" },
              { label: "Đánh dấu [không rõ] và nhắn hỏi lại người nói", next: "good" },
            ],
          },
          bad_keep: {
            text: "Câu đó là AI ghép hai lời thành một cam kết chưa ai nói. Khách hiểu đó là hứa hẹn và sau này bạn phải xin lỗi.",
            ending: "bad",
          },
          good: {
            text: "Người nói xác nhận lại ý thật. Email gửi khách đúng giờ, đúng mã hàng, và bạn giữ file ghi âm để đối chiếu.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Bản ghi âm là nguồn, bản chép là nháp",
        text: "Khi bản chép và trí nhớ mâu thuẫn, hãy nghe lại bản ghi. Nếu nội dung nhạy cảm, hỏi quản lý trước khi đưa file cho công cụ chép lời nào chưa được công ty duyệt.",
      },
      {
        type: "closing",
        lines: [
          "Bản chép sạch chưa phải bản chép đúng: nghe lại số, tên và chỗ nói chồng.",
          "Bài sau: ba việc làm trước khi ghi để bản chép ít sai ngay từ đầu.",
        ],
      },
    ],
  },
  {
    id: 2342,
    slug: "am-thanh-tot-hon-truoc-khi-nho-ai-nghe",
    title: "Chặng 47, Bài 3: Âm thanh tốt hơn: ba việc làm trước khi ghi",
    subtitle: "Chỗ ngồi, khoảng cách micro và tiếng ồn nền: ba việc nhỏ quyết định bản chép sai ít hay nhiều.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎧",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hai cuộc họp cùng nội dung, nhưng một buổi ghi ở phòng kín với micro đặt giữa bàn, một buổi ghi ở quán cà phê bằng điện thoại trong túi. Bản chép của buổi thứ hai sẽ đầy lỗ hổng. Ba việc làm trước khi ghi tốn 2 phút và tiết kiệm cả buổi sửa.",
    openingQuestion:
      "Bạn sắp ghi âm buổi họp 6 người trong phòng họp có máy lạnh ồn. Việc nào giúp bản chép ít lỗi nhất?",
    openingOptions: [
      "Đặt micro gần người nói, tắt nguồn ồn và thử ghi 10 giây trước",
      "Bật ghi và hy vọng AI đủ thông minh để lọc được tiếng ồn",
      "Đặt điện thoại ở góc phòng để thu được tất cả mọi người cùng lúc",
      "Bảo mọi người nói to hơn bình thường trong suốt buổi họp",
    ],
    correctOption: 0,
    explanation:
      "Chất lượng đầu vào quyết định chất lượng chép lời: micro gần miệng người nói và ít tiếng ồn nền giúp AI nghe rõ hơn. Thử ghi 10 giây rồi nghe lại là cách rẻ nhất để phát hiện vấn đề. AI chỉ lọc được một phần tiếng ồn. Đặt máy ở góc phòng thu cả tiếng vang và tiếng ồn hơn là giọng người. Bảo mọi người nói to làm cuộc họp gượng gạo mà vẫn không xoá được tiếng ồn nền.",
    diagram: [
      { label: "Chọn chỗ: phòng yên, tắt nguồn ồn", arrow: true },
      { label: "Đặt micro gần người nói, giữa bàn", arrow: true },
      { label: "Thử ghi 10 giây và nghe lại", arrow: true },
      { label: "Ghi chính thức, so bản chép hai lần ghi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự ghi âm hai buổi phỏng vấn nội bộ có xin phép. Buổi đầu điện thoại để trong túi áo, buổi sau đặt giữa bàn, cách hai người nói khoảng một gang tay. Khi đếm số chỗ phải sửa trong bản chép, buổi sau ít hơn rõ rệt. Chị ghi lại cách đặt máy đó thành thói quen.",
    },
    quiz: [
      Q(
        "Việc nào trước khi ghi giúp bản chép lời ít lỗi nhất, chi phí thấp nhất?",
        "Thử ghi 10 giây rồi nghe lại để kiểm tiếng ồn và khoảng cách",
        ["Mua micro đắt tiền mà chưa thử xem phòng họp có ồn không", "Bật ghi ngay từ khi vào phòng để chắc không bỏ sót gì", "Nhờ AI chép lời cả buổi rồi mới kiểm xem âm thanh có tốt không"],
        "Thử ngắn trước là cách rẻ nhất để phát hiện lỗi còn sửa được. Micro đắt không cứu được căn phòng ồn. Bật ghi từ sớm không cải thiện âm thanh mà còn thu thêm đoạn không cần. Kiểm sau khi chép lời thì buổi họp đã xong, không ghi lại được."
      ),
      Q(
        "Điện thoại đặt ở đâu trên bàn họp thì thu giọng người tốt hơn?",
        "Giữa bàn, gần những người sẽ nói, hướng micro lên trên",
        ["Ở góc phòng, để không chắn tầm nhìn của ai và thu được cả phòng", "Trong túi áo của người viết biên bản cho đỡ mất trật tự", "Trên kệ cao ở cuối phòng để tránh tiếng gõ bàn"],
        "Micro thu tốt nhất khi gần nguồn tiếng. Góc phòng thu cả tiếng vang và tiếng ồn, túi áo làm tiếng bị bóp nghẹt và sột soạt, kệ cao thì xa người nói. Giữa bàn giúp mọi người cách micro tương đối đều nhau."
      ),
      Q(
        "Máy lạnh trong phòng kêu ro ro suốt buổi. Bạn nên làm gì?",
        "Tắt hoặc hạ máy lạnh khi họp nếu được, hoặc đổi phòng",
        ["Giữ nguyên, vì AI chép lời được huấn luyện để bỏ qua tiếng máy", "Bảo mọi người nói to hơn hẳn bình thường để át tiếng máy lạnh", "Ghi âm rồi lọc ồn bằng phần mềm sau cho tiết kiệm thời gian"],
        "Loại bỏ nguồn ồn từ đầu hiệu quả hơn sửa sau. AI có thể vẫn nghe sai khi tiếng nền lớn. Nói to làm méo giọng và không át được tiếng đều. Lọc ồn sau ghi giúp một phần nhưng thường làm giọng méo và không khôi phục được chữ đã bị nuốt."
      ),
      Q(
        "Bạn ghi hai buổi họp cùng đề tài, bản chép buổi thứ hai ít sai hơn hẳn. Bước tiếp theo hợp lý nhất?",
        "Ghi lại điều đã khác (chỗ ngồi, khoảng cách, tiếng ồn) thành thói quen",
        ["Kết luận rằng công cụ AI đã tự cải thiện sau một tuần nên khỏi chỉnh gì nữa", "Bỏ qua, vì hai buổi khác nhau nên không so được", "Dùng bản chép buổi hai làm chuẩn cho mọi buổi sau mà không cần kiểm"],
        "Khi có hai lần ghi để so, cái khác biệt là chỗ ngồi, khoảng cách và tiếng ồn, vì những thứ đó bạn điều khiển được. Công cụ không tự cải thiện trong một tuần theo cách đó. So sánh vẫn có giá trị dù đề tài giống nhau. Và ít sai hơn không có nghĩa là hết cần kiểm."
      ),
      Q(
        "Họp có người tham dự qua điện thoại bằng loa ngoài, tiếng nhỏ và rè. Nên làm gì?",
        "Nhờ người đó dùng tai nghe có micro, hoặc ghi chú tay phần của họ",
        ["Chép bình thường, AI sẽ tự phục hồi được phần tiếng bị rè và nhỏ đi", "Bảo họ đọc lại toàn bộ ý kiến sau buổi họp", "Bỏ phần của họ khỏi biên bản vì âm thanh không đạt"],
        "Tiếng vào qua loa ngoài đã mất chất lượng trước khi tới micro của bạn, nên AI không phục hồi được. Yêu cầu đọc lại sau buổi họp tốn thời gian và dễ lệch ý. Bỏ phần của họ làm biên bản thiếu ý của người đang tham dự, nên cần giải pháp âm thanh hoặc ghi chú thay thế."
      ),
    ],
    keyTakeaways: [
      "Chất lượng âm thanh đầu vào quyết định số chỗ phải sửa.",
      "Ba việc: chỗ ngồi yên, micro gần người nói, thử ghi 10 giây.",
      "Loại bỏ nguồn ồn từ đầu tốt hơn lọc sau.",
      "So bản chép của hai lần ghi để biết điều gì thực sự giúp ích.",
      "Người tham dự qua loa ngoài cần tai nghe hoặc ghi chú thay thế.",
    ],
    practicePrompt: {
      question:
        "Chị Mai ghi họp ở quán cà phê vì phòng họp đang bận. Bản chép có nhiều lỗ hổng. Điều nào nên thử đầu tiên ở lần sau?",
      options: [
        "Chọn chỗ yên hơn và đặt micro gần người nói hơn",
        "Đổi sang công cụ chép lời khác ngay lần sau",
        "Nói chậm hơn một nửa so với tốc độ bình thường",
        "Ghi lâu hơn để AI có nhiều dữ liệu học giọng mình",
      ],
      correct: 0,
      explanation:
        "Nguyên nhân dễ thấy nhất là tiếng quán và khoảng cách, đó là thứ chị sửa được. Đổi công cụ khi âm thanh vẫn kém thì lỗi vẫn còn. Nói chậm một nửa làm buổi họp dài gấp đôi. Và ghi lâu hơn không làm AI học giọng bạn trong một cuộc ghi.",
    },
    summary: {
      keyIdea: "Âm thanh tốt là khoản đầu tư rẻ nhất để bản chép ít sai.",
      formula: "Bản chép ít sai = chỗ yên + micro gần người nói + thử ghi trước.",
      commonMistake: "Bật ghi ở quán ồn hoặc để điện thoại trong túi rồi trách AI nghe kém.",
      action: "Tập thói quen thử ghi 10 giây và nghe lại trước mỗi buổi họp quan trọng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Ghi hai lần cùng một đoạn 1 phút tự đọc: lần một với điện thoại trong túi ở chỗ ồn, lần hai đặt cách miệng một gang tay ở chỗ yên. Chép lời cả hai bằng công cụ bạn được phép dùng và đếm số chỗ sai của từng bản. Ngày mai bạn sẽ được hỏi lần nào ít sai hơn.",
      secondary: "Viết ra ba điều bạn sẽ làm trước mỗi buổi họp sắp tới.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai buổi họp cùng nội dung có thể cho hai bản chép chất lượng khác hẳn chỉ vì cách đặt điện thoại. Bài này dạy ba việc làm trước khi bấm ghi, tốn hai phút và đỡ cả buổi sửa.",
      },
      {
        type: "feynman",
        title: "Âm thanh tốt đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc nghe người bạn nói chuyện trong quán ồn: bạn phải nghiêng người lại gần, và họ phải nói rõ hơn. AI chép lời cũng vậy: nó 'nghe' bằng đúng những gì micro thu vào, nên bạn chuẩn bị chỗ cho micro nghe rõ trước khi nhờ AI.",
        columns: ["Điều kiện", "Nghe bạn trong quán ồn", "Micro ghi họp"],
        rows: [
          ["Khoảng cách", "Nghiêng lại gần mới nghe rõ", "Đặt micro gần người nói"],
          ["Tiếng ồn", "Ra chỗ yên hơn", "Tắt nguồn ồn, đóng cửa"],
          ["Kiểm tra", "Hỏi lại 'bạn nói gì?'", "Thử ghi 10 giây rồi nghe lại"],
          ["Hậu quả nếu bỏ qua", "Nghe nhầm ý bạn", "Bản chép đầy lỗ hổng"],
        ],
        oneLiner: "Micro giống đôi tai: muốn bản chép đúng thì cho nó nghe rõ trước.",
      },
      { type: "heading", text: "Ba việc trước khi bấm ghi" },
      {
        type: "list",
        items: [
          "Chỗ ngồi: chọn phòng yên, đóng cửa, tắt hoặc hạ nguồn ồn như quạt hay máy lạnh.",
          "Micro: đặt giữa bàn, gần những người sẽ nói, không để trong túi hay dưới tập giấy.",
          "Thử nhanh: ghi 10 giây, nghe lại. Nếu nghe không rõ thì AI cũng không rõ.",
        ],
      },
      {
        type: "flow",
        title: "Chuẩn bị âm thanh trong 2 phút",
        steps: [
          { label: "Chọn chỗ và tắt nguồn ồn", detail: "Đóng cửa, hạ quạt hoặc máy lạnh nếu cuộc họp cho phép, tránh ngồi gần cửa ra vào." },
          { label: "Đặt micro giữa bàn", detail: "Hướng micro lên, cách mọi người khoảng bằng nhau; không đặt dưới tập giấy vì tiếng lật giấy sẽ lấn." },
          { label: "Thử ghi 10 giây và nghe lại", detail: "Nói vài câu như trong họp. Nghe lại bằng tai nghe xem giọng xa nhất có rõ không." },
          { label: "Ghi chính thức và so sánh về sau", detail: "Sau họp, đếm số chỗ phải sửa. So giữa các buổi để biết cách đặt nào tốt nhất." },
        ],
      },
      {
        type: "scenario",
        title: "Họp phòng 6 người, 10 phút nữa bắt đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Phòng họp có máy lạnh kêu to và bạn chỉ có điện thoại. Mọi người đã đồng ý cho ghi âm.",
            choices: [
              { label: "Đặt điện thoại ở góc phòng rồi ghi luôn", next: "bad_corner" },
              { label: "Hạ máy lạnh, đặt điện thoại giữa bàn và thử ghi 10 giây", next: "s2" },
            ],
          },
          bad_corner: {
            text: "Bản chép đầy lỗ hổng, hai đoạn quan trọng hoàn toàn không đọc được. Bạn phải ngồi nhớ lại và hỏi từng người.",
            ending: "bad",
          },
          s2: {
            text: "Nghe lại đoạn thử, bạn nghe người ngồi đầu bàn hơi nhỏ nhưng vẫn rõ.",
            choices: [
              { label: "Ghi luôn, nhắc người ngồi xa nói gần micro hơn một chút", next: "good" },
              { label: "Bảo cả phòng nói to gấp đôi suốt buổi", next: "bad_loud" },
            ],
          },
          bad_loud: {
            text: "Mọi người nói gượng gạo, cuộc họp căng thẳng, và giọng to làm méo tiếng mà máy vẫn nghe sai nhiều chỗ.",
            ending: "bad",
          },
          good: {
            text: "Bản chép về với rất ít chỗ phải sửa. Bạn ghi lại vị trí đặt máy vào ghi chú để lần sau làm giống vậy.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Chuẩn bị âm thanh",
          text: "Mất khoảng hai phút trước họp. Bản chép ít lỗ hổng, việc sửa nhanh. Bạn biết mình đã làm gì để có kết quả đó.",
        },
        right: {
          label: "Bật ghi và hy vọng",
          text: "Không tốn thời gian chuẩn bị nhưng phải sửa nhiều sau đó. Đoạn bị nuốt tiếng không khôi phục được. Bạn không biết nguyên nhân để làm tốt hơn lần sau.",
        },
      },
      {
        type: "callout",
        label: "Nhớ xin phép trước khi thử ghi",
        text: "Nếu thử ghi trong phòng có người, hãy nói rõ bạn đang thử âm thanh và xoá đoạn thử ngay sau đó. Quy định ghi âm khác nhau theo công ty: hỏi quản lý hoặc bộ phận pháp chế khi chưa rõ.",
      },
      {
        type: "closing",
        lines: [
          "Chỗ yên, micro gần, thử 10 giây: ba việc trước khi ghi.",
          "Bài sau: giọng vùng miền, tên riêng và thuật ngữ, những chỗ AI hay nghe sai.",
        ],
      },
    ],
  },
  {
    id: 2343,
    slug: "tieng-viet-giong-vung-mien-ten-rieng-hay-bi-sai",
    title: "Chặng 47, Bài 4: Giọng vùng miền, tên riêng, thuật ngữ: chỗ AI hay nghe sai",
    subtitle: "Lập một danh sách ngắn các từ hay bị sai của phòng bạn để sửa nhanh cả loạt.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗣️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phòng bạn có tên khách khó đọc, mã hàng viết tắt và vài thuật ngữ nội bộ. Mỗi lần AI chép lời, nó lại nghe sai đúng mấy từ đó, và bạn sửa lại từ đầu. Một danh sách ngắn các từ hay sai giúp sửa nhanh và đều tay cho mọi bản chép sau.",
    openingQuestion:
      "Bản chép nào của phòng bạn cũng ghi sai tên khách 'Minh Phát' thành 'minh phát' và mã 'PA-204' thành 'pê a hai lẻ bốn'. Cách xử lý lâu dài nào hợp lý nhất?",
    openingOptions: [
      "Lập danh sách từ hay sai và đối chiếu mỗi bản chép với danh sách đó",
      "Sửa tay từng bản chép, vì lần sau AI chắc chắn sẽ tự nhớ",
      "Đổi công cụ AI liên tục cho tới khi có công cụ nghe đúng hết",
      "Bỏ hẳn tên riêng và mã hàng khỏi biên bản cho đỡ sai",
    ],
    correctOption: 0,
    explanation:
      "Lỗi lặp lại với cùng một nhóm từ thì cách rẻ nhất là ghi chúng vào một danh sách dùng chung: từ đúng, cách AI hay nghe sai, ai phụ trách. Sửa tay từng bản tốn công mỗi lần và không ai học từ lần trước. AI thông thường không tự nhớ bản chép cũ của bạn trừ khi bạn đưa lại. Đổi công cụ liên tục hiếm khi giải quyết tên riêng của riêng phòng bạn. Bỏ tên và mã khỏi biên bản làm mất đúng thông tin cần nhất.",
    diagram: [
      { label: "Thu thập các từ AI hay nghe sai sau vài bản chép", arrow: true },
      { label: "Ghi bảng: từ đúng, cách hay bị sai, ghi chú", arrow: true },
      { label: "Dán bảng vào yêu cầu hoặc dùng để tìm và thay", arrow: true },
      { label: "Kiểm lại số chỗ sai và cập nhật bảng mỗi tháng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng chăm sóc khách hàng nhận thấy bản chép cuộc gọi thường viết sai tên ba khách lớn và hai mã sản phẩm. Họ lập một bảng 12 dòng dùng chung, mỗi dòng gồm từ đúng và kiểu sai hay gặp. Nhân viên mở bảng khi kiểm bản chép, và người mới cũng dùng được ngay vì không cần nhớ hết.",
    },
    quiz: [
      Q(
        "Vì sao AI chép lời hay sai tên riêng và mã hàng của riêng công ty bạn?",
        "Những từ này hiếm hoặc chưa từng xuất hiện trong dữ liệu nó học, nên nó đoán từ quen thuộc gần giống",
        ["Vì AI được lập trình cố tình bỏ qua tên riêng để bảo vệ quyền riêng tư của mọi người", "Vì tên riêng luôn được người nói đọc to hơn bình thường nên gây nhiễu cho micro", "Vì AI chỉ chép được những từ có sẵn trong từ điển tiếng Việt thông dụng"],
        "AI chọn từ có xác suất cao nhất cho âm nghe được, nên từ hiếm dễ bị thay bằng từ quen gần giống. Nó không cố tình bỏ qua tên riêng. Tên riêng không đọc to hơn mà chỉ lạ hơn với mô hình. Và AI cũng chép được nhiều từ không có trong từ điển, chỉ là dễ sai hơn."
      ),
      Q(
        "Bảng các từ hay sai của phòng nên có những cột nào?",
        "Từ đúng, kiểu hay bị sai, ghi chú cách đọc",
        ["Từ đúng và tên người đã phát hiện ra lỗi đầu tiên", "Từ sai và số lần bị sai, xếp từ cao xuống thấp", "Từ đúng và định nghĩa dài đầy đủ bằng hai câu"],
        "Bảng chỉ cần giúp người kiểm nhận ra lỗi và sửa nhanh: biết từ đúng, biết dạng sai hay gặp, biết cách đọc. Tên người phát hiện lỗi không giúp sửa. Số lần sai hữu ích để ưu tiên nhưng thiếu từ đúng thì không sửa được. Định nghĩa dài làm bảng khó tra nhanh."
      ),
      Q(
        "Người nói giọng vùng miền khác, bản chép ghi nhiều chỗ khác nghĩa. Nên làm gì?",
        "Nghe lại các chỗ khác nghĩa và sửa, đồng thời ghi từ lặp lại vào bảng",
        ["Nhờ người nói đổi sang giọng chuẩn cho AI dễ nghe hơn mỗi khi họp, dù họ quen giọng mình", "Loại người đó khỏi các buổi họp có ghi âm", "Tin vào bản chép vì AI đã quen mọi giọng tiếng Việt"],
        "Giọng vùng miền là chuyện bình thường, thứ cần chỉnh là quy trình kiểm. Bắt người nói đổi giọng là không công bằng và không bền. Loại họ khỏi cuộc họp còn tệ hơn. Và AI không hoàn toàn quen mọi giọng, nhất là khi kèm từ riêng và tiếng ồn."
      ),
      Q(
        "Sau khi có bảng, cách dùng nào giúp sửa nhanh nhất nhiều bản chép?",
        "Tìm các kiểu sai trong bảng và thay bằng từ đúng, rồi nghe lại những chỗ nghi ngờ",
        ["Thay tự động mọi từ trong bảng mà không cần xem lại ngữ cảnh", "Chỉ sửa ở bản chép đầu tiên, các bản sau giống nhau nên tự đúng theo mà khỏi cần xem lại", "Đưa cả bảng cho AI rồi yêu cầu nó tự quyết chỗ nào cần sửa"],
        "Tìm và thay giúp nhanh, nhưng vẫn cần kiểm ngữ cảnh vì cùng một âm có thể là hai từ khác nhau trong hai câu. Thay mù quáng sinh lỗi mới. Bản chép sau không tự đúng vì AI vẫn nghe sai y như cũ. Nhờ AI tự quyết chỗ cần sửa lại đặt lòng tin vào chính thứ đã sai."
      ),
      Q(
        "Bảng từ hay sai có chứa tên khách hàng thật. Nên lưu và chia sẻ thế nào?",
        "Lưu ở nơi chung của phòng theo quy định công ty, chỉ chia sẻ cho người làm việc với khách đó",
        ["Dán công khai lên nhóm chat chung của cả công ty cho mọi người cùng dùng, vì bảng này ai xem cũng có lợi", "Lưu trên máy cá nhân của mỗi người để tiện mở", "Dán vào mọi công cụ AI miễn phí để được gợi ý chính xác hơn"],
        "Tên khách là dữ liệu kinh doanh nên theo quy định của công ty về nơi lưu và người xem. Dán cả công ty mở rộng người xem hơn mức cần. Mỗi người một bản thì không ai cập nhật và khó quản lý. Đưa vào công cụ chưa được duyệt là đưa dữ liệu khách ra ngoài."
      ),
    ],
    keyTakeaways: [
      "Từ hiếm (tên khách, mã hàng, thuật ngữ nội bộ) là nơi AI hay nghe sai nhất.",
      "Lập bảng: từ đúng, kiểu hay bị sai, ghi chú cách đọc.",
      "Tìm và thay nhanh nhưng luôn kiểm ngữ cảnh.",
      "Giọng vùng miền là lý do để kiểm kỹ, không phải lỗi của người nói.",
      "Bảng có tên khách là dữ liệu kinh doanh: lưu theo quy định công ty.",
    ],
    practicePrompt: {
      question:
        "Anh Đạt thấy AI ghi 'Hòa Phát' thành 'hoà phát' ở ba bản chép liên tiếp. Anh nên làm gì?",
      options: [
        "Thêm dòng này vào bảng từ hay sai và kiểm nhanh ở các bản sau",
        "Chỉ sửa tay mỗi lần vì lỗi nhỏ không đáng lập bảng",
        "Bỏ tên công ty ra khỏi biên bản để khỏi sai chính tả",
        "Yêu cầu AI chép lại cho tới khi nào nó ghi đúng tên công ty mới thôi",
      ],
      correct: 0,
      explanation:
        "Lỗi lặp lại ba lần là dấu hiệu nên ghi vào bảng chung. Sửa tay mãi tốn công và không ai học từ đó. Bỏ tên công ty làm mất thông tin. Chép lại nhiều lần có thể ra cùng một lỗi vì AI nghe giống nhau.",
    },
    summary: {
      keyIdea: "Lỗi lặp lại thì đáng có một bảng: ghi từ đúng một lần, kiểm nhanh mãi về sau.",
      formula: "Bảng từ hay sai = từ đúng + kiểu hay bị sai + ghi chú cách đọc.",
      commonMistake: "Sửa tay cùng một lỗi ở mỗi bản chép mà không ghi lại.",
      action: "Sau ba bản chép, tập hợp các lỗi lặp lại thành bảng 10 dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 2 bản chép lời gần đây của phòng bạn (hoặc bản ghi tự đọc). Tìm 5 từ AI đã nghe sai, gồm ít nhất một tên riêng hoặc mã. Lập bảng ba cột: từ đúng, kiểu sai, ghi chú. Kiểm quy định công ty trước khi lưu tên khách vào đâu. Ngày mai bạn sẽ được hỏi bảng có bao nhiêu dòng.",
      secondary: "Chọn một người trong phòng để cùng bổ sung bảng mỗi tuần.",
    },
    sections: [
      {
        type: "lead",
        text: "Bản chép nào của phòng bạn cũng sai cùng mấy từ: tên khách, mã hàng, thuật ngữ nội bộ. Bạn sửa lại mỗi lần từ đầu. Bài này dạy cách ghi chúng thành một bảng ngắn để sửa nhanh và đều.",
      },
      {
        type: "feynman",
        title: "Bảng từ hay sai đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ giấy dán cạnh điện thoại bàn của lễ tân: tên những khách quen, cách đọc và chức vụ của họ. Ai nhận máy cũng xem được và không phải nhớ hết. Bảng từ hay sai làm việc giống vậy cho bản chép lời.",
        columns: ["Phần", "Giấy dán cạnh điện thoại", "Bảng từ hay sai"],
        rows: [
          ["Nội dung", "Tên khách quen và cách đọc", "Từ đúng và kiểu hay bị nghe sai"],
          ["Ai dùng", "Bất kỳ ai nhận máy", "Bất kỳ ai kiểm bản chép"],
          ["Khi nào cập nhật", "Khi có khách mới", "Khi thấy lỗi lặp lại"],
          ["Lợi ích", "Không phải nhớ hết", "Sửa nhanh, đều tay"],
        ],
        oneLiner: "Ghi một lần những từ hay sai, để mỗi lần kiểm không phải nhớ lại từ đầu.",
      },
      { type: "heading", text: "Vì sao AI sai đúng những từ này" },
      {
        type: "paragraph",
        text: "AI chép lời chọn từ nghe hợp lý nhất. Tên riêng và mã hàng của riêng công ty bạn là từ hiếm, nên nó dễ thay bằng từ quen gần giống âm. Giọng vùng miền cộng tiếng ồn làm khó thêm, nên bạn cần biết mình phải nghe lại những chỗ nào.",
      },
      {
        type: "flow",
        title: "Từ lỗi lặp lại đến bảng dùng chung",
        steps: [
          { label: "Thu thập lỗi sau vài bản chép", detail: "Mỗi lần sửa, ghi lại từ đúng và dạng AI đã viết sai. Sau ba bản chép bạn sẽ thấy các lỗi lặp lại." },
          { label: "Lập bảng ba cột", detail: "Từ đúng, kiểu hay bị sai, ghi chú cách đọc (ví dụ mã 'PA-204' đọc là 'pê a hai không bốn')." },
          { label: "Dùng bảng khi kiểm", detail: "Tìm từng kiểu sai trong bản chép và thay bằng từ đúng, vẫn xem ngữ cảnh trước khi thay." },
          { label: "Cập nhật định kỳ", detail: "Mỗi tuần thêm từ mới, bỏ từ không còn xuất hiện; cất bảng ở nơi phòng được phép lưu." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp lập bảng từ hay sai",
        task: "Bạn dán đoạn chép lời đã sửa vào công cụ AI được duyệt và nhờ lập bảng các từ hay sai. Lắp yêu cầu bằng cách chọn một phương án mỗi phần.",
        parts: [
          {
            id: "input",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Đoạn chép gốc và đoạn bạn đã sửa, đặt cạnh nhau, đã thay tên khách thật bằng tên giả.", good: true, feedback: "Có cả bản sai và bản đúng để AI so, và không đưa tên khách thật ra ngoài." },
              { text: "Chỉ đoạn chép gốc, và nhờ AI tự biết chỗ nào sai.", feedback: "Không có bản đúng thì AI chỉ đoán, có thể thêm từ không sai vào bảng." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng bảng",
            options: [
              { text: "Bảng ba cột: từ đúng, kiểu bị sai, ghi chú; mỗi dòng một từ.", good: true, feedback: "Khuôn dạng rõ nên kết quả dùng được ngay để tìm và thay." },
              { text: "Viết thành đoạn văn giải thích các lỗi thường gặp.", feedback: "Đoạn văn khó tra nhanh và khó đưa vào quy trình tìm và thay." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ liệt kê từ có trong đoạn tôi đưa; không thêm từ khác.", good: true, feedback: "AI không bịa thêm lỗi chưa từng xảy ra." },
              { text: "Thêm các lỗi phổ biến khác mà phòng tôi có thể gặp.", feedback: "AI sẽ bịa ra những lỗi trông hợp lý nhưng chưa từng xảy ra ở phòng bạn, làm bảng loãng và khó tin." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "format", "limit"],
            text: "| Từ đúng | Kiểu bị sai | Ghi chú |\n| Minh Phát | minh phát, Minh Phác | tên khách, viết hoa cả hai chữ |\n| PA-204 | pê a hai lẻ bốn | mã hàng, đọc 'pê a hai không bốn' |\n| Hòa Phát | hoà phát | tên công ty, giữ dấu hòa kiểu cũ |",
          },
          {
            requires: ["format"],
            text: "| Từ đúng | Kiểu bị sai | Ghi chú |\n| Minh Phát | minh phát | tên khách |\n| Vina Express | vi na ex press | (AI tự thêm: từ này không có trong đoạn bạn đưa) |\n| DHL-7 | đê hát lờ bảy | (AI tự thêm: bạn không hề nhắc mã này) |",
          },
          {
            text: "Phòng bạn thường gặp lỗi tên riêng bị viết thường, mã hàng bị đọc thành chữ, và thuật ngữ tiếng Anh bị phiên âm sai. Bạn nên chú ý các trường hợp này khi kiểm bản chép.\n\n(Chỉ là lời khuyên chung, không có bảng dùng được.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản chép thứ ba có lại đúng lỗi cũ",
        start: "s1",
        nodes: {
          s1: {
            text: "Lần thứ ba, AI lại ghi sai tên khách 'Minh Phát'. Bạn đang sửa tay, và đồng nghiệp hỏi sao không ghi lại.",
            choices: [
              { label: "Sửa tay như mọi lần, lỗi nhỏ thôi", next: "bad_again" },
              { label: "Thêm dòng vào bảng chung và dùng tìm và thay", next: "s2" },
            ],
          },
          bad_again: {
            text: "Một tuần sau người mới vào phòng sửa kiểu khác, biên bản của cùng một khách có ba cách viết tên. Khách để ý và hỏi có phải công ty nhầm người.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thay hàng loạt 'minh phát' thành 'Minh Phát' nhưng thấy một câu nói về 'phát minh'.",
            choices: [
              { label: "Thay mù quáng mọi chỗ trùng chữ", next: "bad_blind" },
              { label: "Xem ngữ cảnh từng chỗ rồi mới thay", next: "good" },
            ],
          },
          bad_blind: {
            text: "Câu 'phát minh mới' bị biến thành tên khách, biên bản có một câu vô nghĩa và bạn phải tìm lại trong nhiều bản.",
            ending: "bad",
          },
          good: {
            text: "Bản chép đúng và nhất quán. Bảng chung có thêm một dòng, và người mới dùng được ngay hôm sau.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Bảng có tên khách là dữ liệu kinh doanh",
        text: "Lưu bảng ở nơi phòng được phép, chỉ chia sẻ cho người làm việc với khách đó. Đừng dán tên khách thật vào công cụ AI chưa được công ty duyệt: hỏi bộ phận CNTT hoặc quản lý về quy định.",
      },
      {
        type: "closing",
        lines: [
          "Ghi lỗi lặp lại thành bảng, kiểm theo bảng, cập nhật mỗi tuần.",
          "Bài sau: dự án nhỏ, biến một bản chép thành biên bản một cuộc họp 15 phút.",
        ],
      },
    ],
  },
  {
    id: 2344,
    slug: "du-an-nho-bien-ban-mot-cuoc-hop-15-phut",
    title: "Chặng 47, Bài 5: Dự án nhỏ: biên bản một cuộc họp 15 phút",
    subtitle: "Đi từ bản chép lời đến biên bản có quyết định, việc, người phụ trách và hạn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuộc họp 15 phút kết thúc và sếp hỏi: 'Chốt gì rồi? Ai làm gì, khi nào?' Bản chép lời dài ba trang không trả lời câu đó. Biên bản bốn mục (quyết định, việc, người, hạn) thì trả lời trong 30 giây, nếu bạn đối chiếu nó với bản chép trước khi gửi.",
    openingQuestion:
      "Bạn có bản chép lời 15 phút và cần gửi biên bản cho nhóm trong buổi chiều. Cách làm nào an toàn và nhanh nhất?",
    openingOptions: [
      "Nhờ AI trích quyết định, việc, người, hạn; rồi đối chiếu từng việc với bản chép",
      "Nhờ AI viết biên bản và gửi luôn vì nó đã có bản chép trong tay",
      "Tự viết biên bản từ trí nhớ và bỏ qua bản chép cho nhanh",
      "Gửi nguyên bản chép lời cho cả nhóm để mọi người tự đọc",
    ],
    correctOption: 0,
    explanation:
      "AI giỏi gom và sắp xếp nên trích bốn mục rất nhanh, nhưng nó có thể gán nhầm người hoặc hạn, hoặc thêm một việc không ai nhận. Vì vậy mỗi việc phải có một câu trong bản chép làm bằng chứng. Gửi luôn thì lỗi đi thẳng tới cả nhóm. Viết từ trí nhớ dễ quên và lệch. Gửi nguyên bản chép thì mỗi người tự đọc ba trang, không ai biết mình được giao gì.",
    diagram: [
      { label: "Có bản chép lời đã kiểm số và tên", arrow: true },
      { label: "AI trích: quyết định, việc, người phụ trách, hạn", arrow: true },
      { label: "Đối chiếu từng việc với một câu trong bản chép", arrow: true },
      { label: "Chỗ không chắc hỏi lại người nói, rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: sau buổi họp 15 phút về kế hoạch sự kiện, AI trích ra ba việc. Một việc ghi 'chị Thu đặt địa điểm, hạn thứ Sáu', nhưng khi đối chiếu bản chép, chị Thu chỉ nói 'để chị hỏi giá' còn người chốt địa điểm là anh Khánh. Nhờ đối chiếu mà biên bản gửi đi đúng người, đúng việc.",
    },
    quiz: [
      Q(
        "Một biên bản họp tốt cần có những mục nào?",
        "Quyết định đã chốt, việc cần làm, người phụ trách và hạn",
        ["Toàn bộ lời nói của từng người theo đúng thứ tự trong cuộc họp", "Danh sách người dự họp và thời gian ngồi từng người", "Đánh giá của người viết về ai làm việc tốt hơn trong cuộc họp"],
        "Biên bản trả lời: chốt gì, ai làm gì, khi nào. Ghi nguyên lời nói là bản chép, không phải biên bản. Danh sách ngồi và thời gian ngồi không giúp ai hành động. Đánh giá cá nhân không thuộc biên bản và dễ gây mất lòng tin."
      ),
      Q(
        "AI trích ra 'anh Nam làm báo cáo, hạn thứ Sáu'. Bạn kiểm thế nào?",
        "Tìm câu trong bản chép có anh Nam nhận báo cáo và hạn thứ Sáu",
        ["Tin AI vì nó đã đọc hết toàn bộ bản chép nên nhớ chính xác hơn người", "Hỏi lại AI 'bạn có chắc không' rồi tin vào câu trả lời nó đưa ra", "Gửi luôn cho cả nhóm, nếu có sai thì anh Nam sẽ tự báo lại cho mình"],
        "Mỗi việc phải có một câu bằng chứng trong bản chép: ai nhận, nhận việc gì, hạn nào. AI trích sai người hoặc hạn vẫn đọc trơn tru. Hỏi 'có chắc không' thường nhận được câu khẳng định lại lỗi cũ. Để người bị giao nhầm tự phát hiện thì lỗi đã lan ra cả nhóm."
      ),
      Q(
        "Trong bản chép, việc 'gửi báo giá' được nói nhưng không ai nhận. Biên bản nên ghi sao?",
        "Ghi việc 'gửi báo giá' với người phụ trách là [chưa rõ] rồi hỏi nhóm",
        ["Gán cho người có vẻ phụ trách nhất theo vai trò", "Bỏ việc đó vì không ai nhận tức là không quan trọng", "Ghi tên người chủ trì cuộc họp để cho chắc có người làm"],
        "Biên bản ghi đúng điều đã chốt, nên chỗ chưa rõ phải hiện ra để người có quyền quyết định. Gán cho người có vẻ phụ trách là bịa thay họ. Bỏ việc đi làm mất thông tin. Ghi tên người chủ trì áp việc cho người chưa hề nhận."
      ),
      Q(
        "Cuộc họp dài 15 phút, bản chép có 2.400 chữ. Bạn nên nhờ AI gì?",
        "Trích quyết định, việc, người, hạn kèm câu trong bản chép làm bằng chứng",
        ["Viết lại thật ngắn gọn cho sếp đọc trong 10 giây", "Dịch sang tiếng Anh cho mọi người dễ đọc", "Sửa văn phong cho hay hơn và thêm lời khen nhóm"],
        "Đích của biên bản là hành động, nên cần trích có cấu trúc và có bằng chứng để kiểm. Viết quá ngắn làm mất việc và hạn. Dịch không phục vụ mục đích này. Sửa văn phong và thêm lời khen là thêm thứ không có trong cuộc họp."
      ),
      Q(
        "Khi nào nên gửi biên bản cho cả nhóm?",
        "Sau khi bạn đã đối chiếu từng việc và hỏi lại chỗ chưa rõ",
        ["Ngay khi AI trả biên bản, để mọi người có thông tin sớm nhất", "Sau một tuần, để chắc chắn là không ai còn muốn sửa đổi gì nữa cả", "Chỉ khi có người hỏi xin biên bản của buổi họp đó, còn lại thì thôi"],
        "Gửi sớm có giá trị khi nội dung đã đúng, nên đối chiếu trước rồi gửi ngay trong ngày. Chờ một tuần làm mọi người quên việc và hạn. Chờ có người hỏi nghĩa là không ai biết mình được giao gì."
      ),
    ],
    keyTakeaways: [
      "Biên bản trả lời: chốt gì, ai làm gì, khi nào.",
      "AI trích nhanh, nhưng có thể gán nhầm người hoặc hạn.",
      "Mỗi việc phải có một câu trong bản chép làm bằng chứng.",
      "Chỗ chưa rõ ghi [chưa rõ] và hỏi lại, đừng đoán.",
      "Gửi trong ngày, sau khi đã đối chiếu.",
    ],
    practicePrompt: {
      question:
        "Biên bản nháp của AI ghi 5 việc. Bạn chỉ có thời gian kiểm 2 việc. Nên chọn việc nào?",
      options: [
        "Hai việc có hạn gần nhất và người nhận là người bạn ít chắc nhất",
        "Hai việc đầu tiên trong danh sách vì đó là những việc quan trọng nhất",
        "Hai việc ngắn nhất vì dễ kiểm nhanh nhất",
        "Không kiểm việc nào vì AI đã đọc cả bản chép",
      ],
      correct: 0,
      explanation:
        "Dồn thời gian vào chỗ sai gây hậu quả lớn nhất: hạn gần và người nhận chưa chắc. Thứ tự trong danh sách do AI sắp, không phản ánh độ quan trọng. Việc ngắn chưa chắc ít rủi ro. Và AI đọc hết bản chép vẫn có thể gán nhầm.",
    },
    summary: {
      keyIdea: "Biên bản tốt là bản chép được rút thành bốn mục và đối chiếu từng việc với nguồn.",
      formula: "Biên bản = quyết định + việc + người phụ trách + hạn, mỗi việc kèm một câu bằng chứng.",
      commonMistake: "Gửi biên bản AI trích ra mà không đối chiếu người và hạn với bản chép.",
      action: "Lấy một bản chép ngắn và trích tay bốn mục trước, rồi so với bản AI.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bản chép lời của một cuộc họp ngắn (hoặc ghi chú họp của bạn, bỏ tên khách nếu cần). Nhờ công cụ AI được phép dùng trích quyết định, việc, người, hạn. Với mỗi việc, tìm câu trong bản chép làm bằng chứng và ghi lại việc nào không có bằng chứng. Ngày mai bạn sẽ được hỏi bao nhiêu việc đã đúng.",
      secondary: "Soạn một câu hỏi lại cho người chưa rõ việc của họ.",
    },
    sections: [
      {
        type: "lead",
        text: "Họp xong 15 phút, sếp hỏi 'chốt gì rồi?'. Dự án nhỏ này đi từ bản chép lời đến một biên bản bốn mục mà bạn dám gửi, nhờ một bước đối chiếu.",
      },
      {
        type: "feynman",
        title: "Biên bản đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ giấy nhắc việc dán tủ lạnh sau bữa cơm gia đình: 'Ai đón con thứ Tư, ai mua gạo, hạn là khi nào'. Không ai dán cả bản ghi cuộc trò chuyện lên tủ lạnh. Biên bản họp cũng là tờ giấy nhắc việc đó.",
        columns: ["Phần", "Giấy dán tủ lạnh", "Biên bản họp"],
        rows: [
          ["Chốt gì", "Cuối tuần đi ăn ngoài", "Quyết định đã thống nhất"],
          ["Việc", "Mua gạo", "Việc cần làm"],
          ["Ai làm", "Bố đón con, mẹ mua gạo", "Người phụ trách có tên"],
          ["Khi nào", "Thứ Tư, trước 6 giờ", "Hạn cụ thể"],
        ],
        oneLiner: "Biên bản là tờ giấy nhắc việc, không phải cuốn băng chép lại cuộc nói chuyện.",
      },
      { type: "heading", text: "Từ ba trang chữ thành bốn mục" },
      {
        type: "paragraph",
        text: "Một cuộc họp 15 phút cho ra hơn hai nghìn chữ. AI giỏi gom những câu rời rạc thành bốn mục: quyết định, việc, người, hạn. Nhưng nó có thể gán nhầm, nên mỗi việc cần một câu trong bản chép làm bằng chứng mà bạn kiểm được.",
      },
      {
        type: "flow",
        title: "Từ bản chép đến biên bản gửi nhóm",
        steps: [
          { label: "Bắt đầu từ bản chép đã kiểm", detail: "Số, tên và ngày giờ đã nghe lại. Nếu chưa kiểm, làm bước đó trước." },
          { label: "Nhờ AI trích bốn mục kèm bằng chứng", detail: "Yêu cầu mỗi việc có một câu trích nguyên văn từ bản chép, và việc nào thiếu người hoặc hạn thì ghi [chưa rõ]." },
          { label: "Đối chiếu từng việc", detail: "Đọc câu bằng chứng: ai thực sự nhận, hạn nào. Không có câu thì xoá việc hoặc hỏi lại." },
          { label: "Gửi cho nhóm trong ngày", detail: "Mỗi người thấy việc của mình và hạn; ghi rõ chỗ [chưa rõ] để nhóm xác nhận." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm chỗ biên bản AI gán sai hoặc bịa",
        task: "Dưới đây là biên bản nháp AI trích từ bản chép. Trong bản chép: anh Khánh nhận chốt địa điểm, chị Thu chỉ nhận hỏi giá, không ai nhận việc in thiệp, và không ai nhắc ngân sách. Bấm các dòng bạn nghi ngờ rồi nộp.",
        segments: [
          { text: "Quyết định: tổ chức sự kiện khách hàng vào thứ Bảy tuần sau." },
          { text: "Việc 1: chị Thu chốt địa điểm, hạn thứ Sáu.", error: "Trong bản chép, chị Thu chỉ nhận 'hỏi giá'; người chốt địa điểm là anh Khánh. AI gán nhầm người." },
          { text: "Việc 2: anh Khánh nhận báo giá từ hai nhà hàng, hạn thứ Năm." },
          { text: "Việc 3: in thiệp mời do chị Hà phụ trách, hạn thứ Tư.", error: "Không ai nhận việc in thiệp trong bản chép; AI tự thêm người phụ trách. Nên ghi [chưa rõ]." },
          { text: "Ngân sách đã duyệt: 50 triệu đồng.", error: "Bản chép không nhắc con số ngân sách nào; AI bịa thêm cho 'đủ ý'." },
        ],
      },
      {
        type: "scenario",
        title: "Biên bản nháp vừa về, 4 giờ chiều phải gửi",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả biên bản ba việc, trông gọn và rõ. Sếp chờ trong nhóm chat.",
            choices: [
              { label: "Gửi luôn vì AI đã đọc cả bản chép", next: "bad_send" },
              { label: "Đối chiếu từng việc với câu trong bản chép", next: "s2" },
            ],
          },
          bad_send: {
            text: "Chị Thu nhận biên bản, thấy mình phải chốt địa điểm dù chị chỉ nhận hỏi giá. Hai ngày sau cả nhóm mới biết không ai chốt địa điểm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy việc in thiệp không có câu nào trong bản chép, và người nhận việc địa điểm khác với bản nháp.",
            choices: [
              { label: "Sửa người cho đúng, ghi việc in thiệp là [chưa rõ người phụ trách]", next: "good" },
              { label: "Giao việc in thiệp cho người rảnh nhất cho gọn", next: "bad_assign" },
            ],
          },
          bad_assign: {
            text: "Người được giao bất ngờ vì chưa hề nhận việc này, và việc bị trễ vì không ai xác nhận hạn với họ.",
            ending: "bad",
          },
          good: {
            text: "Biên bản gửi đúng giờ. Nhóm xác nhận người in thiệp ngay trong chiều nay, và mọi việc đều có người và hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Biên bản có đối chiếu",
          text: "Mỗi việc có câu bằng chứng trong bản chép. Người bị giao nhầm được phát hiện trước khi gửi. Nhóm biết việc và hạn của mình. Chỗ chưa rõ hiện ra để hỏi.",
        },
        right: {
          label: "Biên bản gửi thẳng từ AI",
          text: "Đọc trơn tru nên khó thấy lỗi. Việc không ai nhận có thể bị gán cho ai đó. Số hay ngân sách bị bịa có thể lọt qua. Sửa sau thì cả nhóm đã hiểu sai.",
        },
      },
      {
        type: "callout",
        label: "Nội dung nhạy cảm thì hỏi trước",
        text: "Biên bản có lương, khách hàng hoặc kế hoạch chưa công bố: hỏi quản lý hoặc bộ phận pháp chế trước khi đưa bản chép cho công cụ AI và trước khi gửi rộng.",
      },
      {
        type: "closing",
        lines: [
          "Bản chép thành biên bản bốn mục, mỗi việc kèm một câu bằng chứng.",
          "Bài sau: biên bản tự động, đọc kỹ trước khi gửi cả nhóm.",
        ],
      },
    ],
  },
];
