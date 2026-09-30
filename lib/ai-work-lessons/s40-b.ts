import type { Lesson } from "../lesson-types";

// Chặng 40, bài 6-10. Giáo trình: scripts/curriculum/stage-40.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm kết quả.

const Q = (question: string, options: string[], explanation: string) => ({ question, options, correct: 0, explanation });

export const S40_B_LESSONS: Lesson[] = [
  {
    id: 2205,
    slug: "truyen-thong-viet-cam-nang-giong-thuong-hieu",
    title: "Chặng 40, Bài 6: Viết một trang mô tả giọng văn của công ty từ ví dụ thật",
    subtitle: "Ba bài đã đăng được khen là mỏ vàng: giọng văn của bạn nằm sẵn trong đó.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🎙️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi người trong phòng viết một kiểu nên bài đăng nghe như của năm công ty khác nhau. Một trang mô tả giọng văn ngắn, rút từ bài thật, giúp cả người viết lẫn AI viết cùng một giọng, và giúp bạn không phải sửa lại từ đầu mỗi lần.",
    openingQuestion:
      "Bạn có ba bài đăng được khách và sếp khen. Bạn nhờ AI: \"Rút giọng văn công ty từ ba bài này.\" Bản AI trả về nói công ty \"chuyên nghiệp, thân thiện, gần gũi\". Việc nên làm tiếp là gì?",
    openingOptions: [
      "Đối chiếu từng nhận xét với câu cụ thể trong ba bài, xoá chỗ chung chung",
      "Dùng luôn, vì AI đã đọc cả ba bài nên tả chính xác",
      "Thêm vài tính từ đẹp hơn cho bản mô tả nghe sang",
      "Nhờ AI viết dài hơn để bản mô tả trông đầy đủ",
    ],
    correctOption: 0,
    explanation:
      "\"Chuyên nghiệp, thân thiện, gần gũi\" đúng với hàng nghìn công ty nên không giúp ai viết đúng giọng của bạn. AI dễ tả chung chung khi không bị ép chỉ ra bằng chứng. Bạn cần mỗi đặc điểm đi kèm một câu trích thật trong bài và một điều công ty không viết. Dùng luôn hay thêm tính từ chỉ làm bản mô tả đẹp hơn mà vẫn rỗng, còn viết dài hơn chỉ thêm chữ.",
    diagram: [
      { label: "Chọn ba bài đã đăng được khen", arrow: true },
      { label: "AI rút đặc điểm kèm câu trích làm bằng chứng", arrow: true },
      { label: "Bạn gạch bỏ chỗ chung chung, sửa cho đúng", arrow: true },
      { label: "Trang giọng văn một mặt, có ví dụ nên và không nên" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng cà phê 4 chi nhánh",
      description:
        "Ba nhân viên cùng viết bài mạng xã hội cho một chuỗi cà phê, mỗi người một kiểu: một người viết như thông báo hành chính, một người dùng toàn biểu tượng, một người viết như quảng cáo truyền hình. Chủ quán chọn ba bài khách hay chia sẻ nhất, nhờ AI rút đặc điểm rồi tự gạch bỏ những chỗ nói chung chung. Kết quả là một trang có tám dòng, kèm hai câu mẫu \"nên viết\" và hai câu \"không viết\".",
    },
    quiz: [
      Q(
        "Vì sao nên đưa AI ba bài thật thay vì chỉ nói \"giọng của chúng tôi là gần gũi\"?",
        [
          "Bài thật cho AI thấy câu chữ và cách ngắt câu cụ thể của bạn",
          "Vì AI đọc bài dài thì viết ra cũng luôn dài và kỹ hơn",
          "Vì ba bài đủ để AI hiểu toàn bộ chiến lược kinh doanh",
          "Vì chỉ khi có bài mẫu thì AI mới chịu trả lời yêu cầu",
        ],
        "Một từ như \"gần gũi\" mỗi người hiểu một kiểu, còn câu chữ thật thì cho thấy bạn xưng hô ra sao, câu dài hay ngắn, có đùa hay không. Ba bài không nói gì về chiến lược, AI vẫn trả lời được khi không có mẫu và độ dài đầu ra không phụ thuộc vào việc bài mẫu dài.",
      ),
      Q(
        "AI mô tả giọng văn công ty là \"chuyên nghiệp và tận tâm\". Đó là dấu hiệu gì?",
        [
          "Mô tả chung chung, không giúp ai viết đúng giọng",
          "Mô tả đúng vì hai từ này ai cũng đồng ý, nên có thể dùng ngay",
          "AI đã đọc đúng bài, chỉ cần bạn thêm vài ví dụ vui vào cuối trang",
          "Lỗi của máy, cần yêu cầu AI chạy lại toàn bộ từ đầu cho chuẩn",
        ],
        "Hai từ ấy dùng cho công ty nào cũng được, nên bỏ đi không mất gì. Đây không phải lỗi máy mà là thói quen của AI khi thiếu bằng chứng. Thêm ví dụ vui hay chạy lại không giải quyết được, chỉ có việc buộc mỗi nhận xét đi kèm một câu trích thật mới sửa được.",
      ),
      Q(
        "Một trang mô tả giọng văn dùng được cần có phần nào ngoài các tính từ?",
        [
          "Câu mẫu nên viết, câu không viết, và các từ công ty tránh dùng",
          "Lịch sử thành lập công ty, toàn bộ sơ đồ tổ chức và danh sách cổ đông",
          "Danh sách mười tính từ, xếp từ hay nhất đến ít hay nhất",
          "Bảng giá dịch vụ để người viết khỏi phải hỏi lại",
        ],
        "Người viết cần thấy giọng văn qua ví dụ: câu nào đúng chất, câu nào lệch. Lịch sử công ty và bảng giá là thông tin khác, không dạy cách viết. Xếp hạng tính từ vẫn chỉ là tính từ, nên chưa giúp ai đặt câu.",
      ),
      Q(
        "AI đưa nhận xét \"công ty hay dùng câu ngắn\" nhưng ba bài của bạn toàn câu dài. Xử lý ra sao?",
        [
          "Xoá hoặc sửa nhận xét, vì không khớp với bài thật",
          "Giữ nguyên, vì AI đọc nhiều hơn bạn",
          "Viết lại ba bài cho đúng nhận xét của AI, vì bài mới sẽ nhất quán hơn",
          "Giữ, rồi ghi thêm \"đôi khi\" cho đỡ sai",
        ],
        "Nhận xét phải khớp với bài thật, nên khi lệch thì bạn sửa nhận xét. Tin AI hơn tài liệu của chính mình là đảo ngược thứ tự. Viết lại ba bài vốn đã được khen là phá thứ tốt, còn thêm \"đôi khi\" chỉ che chỗ sai bằng một chữ mơ hồ.",
      ),
      Q(
        "Ai là người chốt trang giọng văn cuối cùng?",
        [
          "Bạn hoặc người phụ trách thương hiệu, sau khi soát từng dòng",
          "AI, vì nó đã đọc mọi bài của công ty và nhớ hết các đặc điểm giọng văn",
          "Freelancer nào nộp bài đầu tiên tuần này",
          "Bất kỳ ai trong phòng, khi có thời gian rảnh",
        ],
        "Giọng văn là quyết định về hình ảnh công ty nên phải có người chịu trách nhiệm. AI chỉ gợi ý dựa trên mẫu bạn đưa, freelancer không nắm hết bối cảnh, và để mặc ai muốn sửa thì trang mô tả sẽ lại trôi thành nhiều giọng.",
      ),
    ],
    keyTakeaways: [
      "Giọng văn của bạn nằm sẵn trong những bài đã đăng và được khen.",
      "Buộc AI đưa câu trích thật cho mỗi đặc điểm nó nêu ra.",
      "Gạch bỏ mọi tính từ dùng cho công ty nào cũng được.",
      "Một trang tốt có ví dụ nên viết và không nên viết.",
      "Người chốt là bạn hoặc người phụ trách thương hiệu, không phải AI.",
    ],
    practicePrompt: {
      question:
        "AI viết: \"Giọng công ty tinh tế và đẳng cấp.\" Ba bài mẫu của bạn toàn câu ngắn, xưng \"mình - bạn\", có một câu đùa. Bạn sửa thế nào?",
      options: [
        "Đổi thành: câu ngắn, xưng \"mình - bạn\", thỉnh thoảng đùa nhẹ, kèm một câu trích",
        "Giữ nguyên vì \"tinh tế, đẳng cấp\" nghe hợp với thương hiệu",
        "Thêm \"sang trọng, chỉn chu\" cho đủ bộ tính từ",
        "Xoá cả bản mô tả và để mỗi người viết theo cảm nhận",
      ],
      correct: 0,
      explanation:
        "Bằng chứng trong bài thật là câu ngắn, xưng hô thân mật và một câu đùa, nên bản mô tả phải nói đúng như vậy. \"Tinh tế, đẳng cấp\" ngược hẳn với bài mẫu, thêm tính từ chỉ tệ hơn, và xoá bản mô tả thì mất luôn công cụ giữ giọng thống nhất.",
    },
    summary: {
      keyIdea: "Giọng văn tả bằng câu trích thật, không tả bằng tính từ.",
      formula: "Đặc điểm + câu trích trong bài + một điều công ty không viết.",
      commonMistake: "Giữ bản AI tả chung chung vì nghe hợp lý.",
      action: "Chọn ba bài đã được khen, nhờ AI rút đặc điểm kèm câu trích và gạch những dòng không có bằng chứng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba bài bạn hoặc phòng bạn đã đăng và được khen (email, bài web hay bài mạng xã hội). Dán vào công cụ AI công ty cho phép, nhờ rút 6 đặc điểm kèm câu trích. Gạch mọi dòng không có câu trích khớp, rồi ghi ra một trang có 3 câu nên viết và 3 câu không viết.",
      secondary: "Ngày mai bạn sẽ được hỏi: đặc điểm nào AI nêu mà bạn đã gạch, và vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn duyệt ba bài đăng của ba người, đọc lên như của ba công ty khác nhau. Sếp hỏi: \"Giọng của mình là gì?\" và bạn chưa có câu trả lời viết ra giấy. Bài này giúp bạn có nó trong một buổi chiều.",
      },
      {
        type: "feynman",
        title: "Mô tả giọng văn đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn cần tả giọng nói của một người bạn cho người chưa từng gặp. Nói \"anh ấy dễ mến\" thì vô ích, nhưng nói \"anh hay gọi mọi người là bạn, ít khi nói quá ba câu liền\" thì người kia nhận ra ngay.",
        columns: ["Thành phần", "Tả giọng nói người bạn", "Tả giọng văn công ty"],
        rows: [
          ["Tả chung chung", "\"Anh ấy dễ mến\"", "\"Chuyên nghiệp, thân thiện\""],
          ["Tả cụ thể", "\"Hay gọi mọi người là bạn\"", "\"Xưng mình - bạn, câu dưới 20 chữ\""],
          ["Bằng chứng", "Một câu anh đã nói", "Một câu trích trong bài đã đăng"],
          ["Người kiểm", "Người từng nghe anh nói", "Bạn, người biết bài thật"],
        ],
        oneLiner: "Tả giọng văn bằng thói quen viết cụ thể và câu trích thật, không bằng tính từ.",
      },
      { type: "heading", text: "Bắt đầu từ ba bài đã được khen" },
      {
        type: "paragraph",
        text: "Chọn ba bài mà khách hoặc sếp đã khen. Đó là bằng chứng giọng văn nào đang hiệu quả. Đừng chọn bài do bạn thích nhất, hãy chọn bài người đọc thật đã phản hồi.",
      },
      {
        type: "callout",
        label: "Dữ liệu trước khi dán",
        text: "Chỉ dán bài đã đăng công khai vào công cụ AI công ty cho phép. Bản nháp nội bộ, bài chứa tên khách hoặc số liệu chưa công bố thì bỏ ra trước, rồi mới nhờ AI.",
      },
      { type: "heading", text: "Buộc AI đưa bằng chứng" },
      {
        type: "paragraph",
        text: "Hãy nhờ: \"Rút 6 đặc điểm giọng văn từ ba bài này. Mỗi đặc điểm phải kèm một câu trích nguyên văn và một điều công ty không viết.\" Khi phải đưa bằng chứng, AI khó tả chung chung hơn hẳn, nhưng vẫn có thể trích sai hoặc gán cho bài này câu của bài khác, nên bạn mở bài ra đối chiếu.",
      },
      {
        type: "flow",
        title: "Từ ba bài mẫu đến một trang giọng văn",
        steps: [
          { label: "Chọn ba bài", detail: "Bài đã đăng công khai và đã được khen. Mỗi bài có phản hồi thật từ người đọc chứ không chỉ bạn thấy hay." },
          { label: "Nhờ AI rút đặc điểm", detail: "Ép mỗi đặc điểm phải kèm một câu trích và một điều công ty không viết. Không có câu trích thì đặc điểm không được tính." },
          { label: "Bạn đối chiếu từng dòng", detail: "Mở bài gốc, tìm câu trích. Câu không có thật hoặc đặc điểm ngược với bài thì gạch." },
          { label: "Gạch chỗ chung chung", detail: "Tính từ nào dùng cho công ty khác cũng được thì bỏ. Chỉ giữ những gì người viết mới có thể làm theo." },
          { label: "Thêm ví dụ nên và không nên", detail: "Viết hai câu mẫu đúng giọng và hai câu sai giọng. Đây là phần người viết dùng nhiều nhất." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản AI chung chung",
          text: "Giọng văn chuyên nghiệp, thân thiện, gần gũi, đáng tin cậy, luôn đặt khách hàng làm trung tâm. Ai đọc xong cũng gật đầu và không biết viết thế nào.",
        },
        right: {
          label: "Bản bạn đã sửa",
          text: "Xưng \"mình - bạn\". Câu dưới 20 chữ. Mở bằng việc khách đang gặp. Không dùng \"kính mong quý khách\". Người viết đọc xong biết ngay đặt câu ra sao.",
        },
      },
      {
        type: "scenario",
        title: "Bản mô tả AI vừa viết cho bạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đưa AI ba bài mẫu. Nó trả về tám đặc điểm, chỉ có hai đặc điểm kèm câu trích. Phần còn lại nói \"đáng tin cậy, sáng tạo, năng động\". Bạn sắp giao trang này cho cả phòng dùng từ mai.",
            choices: [
              { label: "Giao luôn, vì bản mô tả đọc lên rất hợp với công ty", next: "bad_generic" },
              { label: "Giữ hai đặc điểm có câu trích, yêu cầu AI đưa bằng chứng cho phần còn lại", next: "s2" },
            ],
          },
          bad_generic: {
            text: "Cả phòng đọc, gật đầu, rồi vẫn viết theo cách của mình. Một tháng sau bài đăng vẫn ba kiểu, và không ai chỉ ra được bài nào lệch vì bản mô tả không nói gì cụ thể.",
            ending: "bad",
          },
          s2: {
            text: "AI đưa thêm ba câu trích. Bạn mở bài gốc và thấy một câu trích là từ bài khác, một câu bị đổi vài chữ.",
            choices: [
              { label: "Sửa lại câu trích đúng nguyên văn, bỏ đặc điểm nào không tìm ra bằng chứng", next: "good" },
              { label: "Bỏ qua, chữ đổi vài từ thì ý vẫn vậy", next: "bad_quote" },
            ],
          },
          bad_quote: {
            text: "Người viết mới bắt chước câu trích đã bị đổi và không khớp bài thật. Khi ai đó hỏi câu này lấy từ đâu, bạn không chỉ ra được bài nào.",
            ending: "bad",
          },
          good: {
            text: "Bạn có một trang sáu dòng, mỗi dòng đều có câu trích khớp bài gốc và hai câu ví dụ nên - không nên. Người viết mới đọc trong hai phút và viết được đoạn đầu đúng giọng.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản mô tả giọng văn do AI viết",
        task: "Ba bài mẫu của cửa hàng chỉ có: câu ngắn, xưng \"mình - bạn\", một bài có câu đùa nhẹ về cà phê buổi sáng, không bài nào nhắc khuyến mãi. Đánh dấu những dòng AI tự thêm.",
        segments: [
          { text: "Xưng \"mình - bạn\" trong mọi bài." },
          { text: "Câu ngắn, thường dưới 20 chữ." },
          {
            text: "Luôn kết thúc bằng lời chúc bằng tiếng Anh.",
            error: "Không bài mẫu nào kết thúc bằng tiếng Anh. AI bịa một thói quen cho nghe có phong cách.",
          },
          { text: "Thỉnh thoảng đùa nhẹ về đời sống buổi sáng." },
          {
            text: "Hay nhắc khuyến mãi ngay ở câu đầu để hút khách.",
            error: "Ba bài mẫu không bài nào nhắc khuyến mãi. Dòng này ngược với bằng chứng thật.",
          },
        ],
      },
      { type: "heading", text: "Kết thúc bằng một trang" },
      {
        type: "list",
        items: [
          "Sáu đến tám đặc điểm, mỗi cái có câu trích thật.",
          "Ba từ hoặc kiểu câu công ty tránh dùng.",
          "Hai câu mẫu nên viết, hai câu không nên viết.",
          "Tên người duyệt trang và ngày soát lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI rút đặc điểm; bạn mở bài gốc để xác nhận từng dòng.",
          "Bài sau: dùng trang này để chấm bản nháp của người khác.",
        ],
      },
    ],
  },
  {
    id: 2206,
    slug: "truyen-thong-kiem-tra-ban-nhap-co-hop-giong-khong",
    title: "Chặng 40, Bài 7: Đo bản nháp có hợp giọng thương hiệu hay không",
    subtitle: "Bản nháp freelancer gửi đọc trôi chảy, nhưng có nghe như công ty bạn không?",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📏",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "\"Đọc thấy không giống mình\" là cảm giác khó nói thành lời cho người viết sửa. Một bảng chấm ngắn theo cẩm nang giúp bạn chỉ đúng câu lệch và lý do, và AI giúp bạn tìm nhanh, còn quyết định sửa hay giữ vẫn là của bạn.",
    openingQuestion:
      "Freelancer gửi bản nháp 600 chữ. Bạn nhờ AI: \"Bản này có hợp giọng công ty không?\" và nhận về \"Có, bản nháp hợp giọng\". Vấn đề nằm ở đâu?",
    openingOptions: [
      "Yêu cầu quá mở, chưa đưa cẩm nang và tiêu chí chấm để AI đo",
      "AI luôn chấm sai, không nên dùng để soát bài",
      "Bản nháp quá dài nên AI chỉ đọc được đoạn đầu",
      "Freelancer nên tự chấm bài của mình thay AI",
    ],
    correctOption: 0,
    explanation:
      "Không có cẩm nang và tiêu chí thì AI chỉ trả lời theo cảm giác chung, và câu \"có hợp\" là câu dễ nói nhất. AI không luôn sai, nó sai khi thiếu thước đo. Độ dài 600 chữ không phải là vấn đề, còn để freelancer tự chấm thì người chấm cũng là người viết, không có ai nhìn từ bên ngoài.",
    diagram: [
      { label: "Cẩm nang giọng văn một trang", arrow: true },
      { label: "Bảng chấm 5 dòng, mỗi dòng có thể kiểm bằng mắt", arrow: true },
      { label: "AI chỉ ra câu lệch kèm dòng vi phạm", arrow: true },
      { label: "Bạn quyết định sửa, giữ hay trả lại người viết" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: công ty phần mềm kế toán cỡ nhỏ",
      description:
        "Phòng truyền thông thuê hai freelancer viết bài blog. Bản nháp đọc được, nhưng mỗi lần trưởng phòng gửi lại chỉ có câu \"chưa đúng giọng, sửa giúp\". Sau khi lập bảng chấm năm dòng từ cẩm nang, bà gửi kèm bảng cho freelancer, nhờ AI đánh dấu câu lệch rồi tự đọc lại từng câu bị đánh dấu. Số lần sửa qua lại giảm từ ba xuống còn một.",
    },
    quiz: [
      Q(
        "Một bảng chấm giọng văn dùng được nên gồm những dòng nào?",
        [
          "Các điều có thể đếm hoặc thấy bằng mắt, như cách xưng hô và độ dài câu",
          "Cảm nhận chung của người đọc, chấm từ 1 đến 10 điểm",
          "Đánh giá tổng thể xem bài có hay hay không",
          "Xếp hạng bài theo mức độ mới lạ so với đối thủ",
        ],
        "Dòng chấm phải kiểm bằng mắt được, như xưng hô hay có dùng từ cấm không, để hai người chấm ra cùng kết quả. Điểm 1-10 và \"hay không\" là cảm nhận riêng, còn độ mới lạ so với đối thủ là câu hỏi khác, không đo giọng văn.",
      ),
      Q(
        "AI đánh dấu 9 câu \"lệch giọng\" trong bài, bạn đọc lại thấy 3 câu thật sự lệch. Nên làm gì?",
        [
          "Chỉ sửa 3 câu đó và ghi lại lý do 6 câu còn lại không lệch",
          "Sửa cả 9 câu theo AI để bản nháp chắc chắn hợp giọng hơn",
          "Bỏ hết báo cáo vì AI đã sai tới 6 lần trong 9 câu, không đáng tin",
          "Đưa 9 câu cho freelancer tự chọn câu nào sửa",
        ],
        "Bạn là người quyết định, và 6 câu kia có thể là tín hiệu bảng chấm còn mơ hồ chỗ nào. Sửa hết theo AI làm bài mất chất riêng của người viết. Bỏ hết thì mất 3 câu đúng, còn giao freelancer chọn là đẩy việc soát về người viết.",
      ),
      Q(
        "Khi đưa bản nháp và cẩm nang cho AI, cách yêu cầu nào giúp kết quả kiểm chứng được?",
        [
          "Với mỗi dòng bảng chấm, trích câu vi phạm nguyên văn hoặc ghi \"không có\"",
          "Cho tôi điểm tổng trên thang 10 và một câu nhận xét ngắn gọn",
          "Viết lại toàn bộ bài cho hợp giọng công ty của chúng tôi",
          "Nói bài có ổn không, kèm lý do ngắn gọn, đừng trích câu",
        ],
        "Buộc trích nguyên văn thì bạn mở bài ra tìm câu đó được và biết AI có bịa không. Điểm tổng và \"ổn hay không\" không cho bạn gì để kiểm. Nhờ viết lại cả bài là việc khác và làm mất chỗ để bạn thấy câu nào cần sửa.",
      ),
      Q(
        "Bảng chấm nên dài bao nhiêu dòng để dùng thường xuyên?",
        [
          "Khoảng 5 dòng",
          "Ít nhất 40 dòng",
          "Chỉ một dòng",
          "Mỗi câu một dòng",
        ],
        "Năm dòng là đủ để bao quát các điểm chính mà vẫn chấm nhanh. Bốn mươi dòng thì không ai dùng, một dòng thì lại thành câu hỏi mơ hồ ban đầu, còn một dòng mỗi câu chính là đọc lại cả bài từ đầu.",
      ),
      Q(
        "Sau khi AI đánh dấu câu lệch, việc nào KHÔNG nên giao cho AI?",
        [
          "Quyết định trả bài hay nhận bài của freelancer",
          "Trích các câu có dùng từ trong danh sách cấm của cẩm nang",
          "Đếm số câu dài hơn 25 chữ trong toàn bộ bản nháp gửi về",
          "Gợi ý ba cách viết lại một câu bị đánh dấu lệch giọng",
        ],
        "Trả hay nhận bài kéo theo tiền, quan hệ và uy tín nên là việc của bạn. Trích từ cấm, đếm câu dài và gợi ý cách viết lại đều là việc AI làm nhanh và bạn kiểm được bằng mắt.",
      ),
    ],
    keyTakeaways: [
      "Không đưa cẩm nang và tiêu chí thì AI chỉ trả lời theo cảm giác chung.",
      "Bảng chấm chỉ gồm những dòng kiểm được bằng mắt, khoảng năm dòng.",
      "Bắt AI trích câu vi phạm nguyên văn để bạn mở bài ra kiểm.",
      "AI chỉ ra câu lệch; bạn quyết định sửa, giữ hay trả bài.",
      "Gửi bảng chấm kèm bản nháp cho người viết để họ sửa đúng chỗ.",
    ],
    practicePrompt: {
      question:
        "AI báo có 5 câu lệch giọng trong bản nháp. Bạn mở bài và thấy 2 câu trích không có trong bài. Việc tiếp theo là gì?",
      options: [
        "Bỏ 2 câu bịa, chỉ xét 3 câu còn lại và soát lại bảng chấm",
        "Sửa cả 5 câu vì AI đã cảnh báo",
        "Gửi nguyên báo cáo của AI cho freelancer",
        "Chạy lại AI đến khi ra kết quả ưng ý",
      ],
      correct: 0,
      explanation:
        "Câu trích không có trong bài là AI bịa, nên loại đi và giữ những câu bạn xác nhận được. Sửa theo cả 5 thì bạn sửa một câu không tồn tại, gửi nguyên báo cáo làm freelancer mất thời gian tìm câu không có, còn chạy lại đến khi ưng ý là chọn kết quả theo ý muốn thay vì theo bằng chứng.",
    },
    summary: {
      keyIdea: "Đo giọng văn bằng bảng chấm kiểm được, không bằng cảm giác.",
      formula: "Cẩm nang + bảng chấm 5 dòng + yêu cầu trích câu vi phạm.",
      commonMistake: "Hỏi AI \"bài có hợp giọng không\" và tin câu trả lời có.",
      action: "Lập bảng chấm 5 dòng từ cẩm nang và thử trên một bản nháp thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy trang giọng văn (hoặc 3 điểm giọng văn bạn nhận ra) và tạo bảng chấm 5 dòng, mỗi dòng kiểm được bằng mắt. Chạy bảng đó trên một bản nháp thật của đồng nghiệp hoặc của chính bạn bằng công cụ AI công ty cho phép, mở bài đối chiếu từng câu AI trích, rồi ghi ra câu nào bạn sửa và câu nào giữ.",
      secondary: "Ngày mai bạn sẽ được hỏi: bao nhiêu câu AI trích không có thật trong bài.",
    },
    sections: [
      {
        type: "lead",
        text: "Bản nháp đã về hộp thư, đọc trôi chảy, không lỗi chính tả. Nhưng đọc xong bạn có cảm giác nó không phải giọng của công ty mình, và bạn chưa nói được vì sao. Bài này giúp bạn nói được.",
      },
      {
        type: "feynman",
        title: "Đo giọng văn đơn giản hơn bạn nghĩ",
        intro: "Giống chấm một chiếc bánh có công thức: bạn không chỉ nếm và bảo \"chưa ngon\". Bạn kiểm từng điều có thể đo được: có đúng lượng đường, có đúng nhiệt độ nướng, có đủ trứng.",
        columns: ["Thành phần", "Chấm chiếc bánh", "Chấm bản nháp"],
        rows: [
          ["Công thức chuẩn", "Công thức bánh của tiệm", "Cẩm nang giọng văn một trang"],
          ["Dòng kiểm", "Đường, nhiệt độ, thời gian nướng", "Cách xưng hô, độ dài câu, từ cấm"],
          ["Người kiểm", "Thợ cả nếm và đối chiếu", "Bạn mở bài và đối chiếu"],
          ["Chỗ máy giúp được", "Đồng hồ đo nhiệt độ", "AI tìm và trích câu vi phạm"],
        ],
        oneLiner: "Chấm giọng văn bằng dòng kiểm cụ thể; AI chỉ giúp tìm, bạn mới quyết định.",
      },
      { type: "heading", text: "Vì sao \"đọc thấy không giống mình\" chưa đủ" },
      {
        type: "paragraph",
        text: "Câu đó đúng nhưng người viết không sửa được. Họ cần biết câu nào, lệch điểm nào. Một bảng chấm 5 dòng biến cảm giác của bạn thành những chỗ chỉ được bằng ngón tay.",
      },
      { type: "heading", text: "Dựng bảng chấm từ cẩm nang" },
      {
        type: "list",
        items: [
          "Xưng hô: bài có xưng đúng \"mình - bạn\" (hoặc cách xưng của công ty) từ đầu đến cuối không?",
          "Độ dài câu: có câu nào vượt mức cẩm nang cho phép không?",
          "Từ cấm: có từ công ty tránh dùng không?",
          "Câu mở đầu: có mở bằng việc người đọc đang gặp không?",
          "Lời kêu gọi cuối bài: có đúng kiểu công ty vẫn dùng không?",
        ],
      },
      {
        type: "flow",
        title: "Từ bản nháp đến quyết định của bạn",
        steps: [
          { label: "Bạn đưa AI ba thứ", detail: "Bản nháp, cẩm nang giọng văn và bảng chấm 5 dòng. Thiếu một thứ thì AI quay về đánh giá theo cảm giác chung." },
          { label: "AI chấm từng dòng", detail: "Với mỗi dòng, nó trích câu vi phạm nguyên văn hoặc ghi \"không có\". Bạn đặt yêu cầu này ngay trong prompt." },
          { label: "Bạn mở bài đối chiếu", detail: "Tìm từng câu trích trong bản nháp. Câu không có trong bài là AI bịa, loại ra khỏi danh sách." },
          { label: "Bạn quyết định", detail: "Câu nào thật sự lệch thì sửa hoặc trả người viết. Câu AI đánh dấu nhưng bạn thấy ổn thì giữ và ghi lý do." },
          { label: "Gửi lại kèm bảng chấm", detail: "Người viết nhận bảng có dòng cụ thể nên sửa đúng chỗ, không phải đoán \"giọng\" là gì." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chấm bản nháp bài blog",
        task: "Bạn có bản nháp blog 600 chữ từ freelancer, cẩm nang giọng văn một trang và bảng chấm 5 dòng. Lắp một prompt để AI chỉ ra câu lệch.",
        parts: [
          {
            id: "input",
            label: "Tài liệu đưa vào",
            options: [
              { text: "Chỉ dán bản nháp và hỏi \"có hợp giọng không\".", feedback: "AI không có thước đo nên trả lời chung chung, thường là \"có\"." },
              { text: "Dán bản nháp, cẩm nang giọng văn và bảng chấm 5 dòng.", good: true, feedback: "Đủ nguyên liệu để AI đối chiếu từng dòng chấm với từng câu." },
            ],
          },
          {
            id: "output",
            label: "Cách trả lời",
            options: [
              { text: "Cho điểm tổng trên thang 10 và một câu nhận xét.", feedback: "Bạn không kiểm được điểm 7 từ đâu ra, và người viết không biết sửa gì." },
              { text: "Với mỗi dòng bảng chấm, trích câu vi phạm nguyên văn hoặc ghi \"không có\".", good: true, feedback: "Bạn mở bài tìm từng câu trích được, nên biết AI có bịa hay không." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Sửa luôn bài cho hợp giọng và gửi bản mới.", feedback: "AI sửa cả những câu không lệch, bạn mất chỗ thấy đâu là vấn đề thật." },
              { text: "Chỉ chỉ ra câu lệch, không viết lại. Nếu không chắc thì ghi \"không chắc\".", good: true, feedback: "Bạn giữ quyền quyết định, và phần \"không chắc\" cho bạn biết chỗ cần tự đọc kỹ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "output", "limit"],
            text: "1) Xưng hô: câu 4 dùng \"chúng tôi kính mời quý khách\" (cẩm nang: \"mình - bạn\").\n2) Độ dài câu: câu 9 dài 34 chữ (giới hạn 20).\n3) Từ cấm: không có.\n4) Câu mở đầu: đúng, mở bằng việc người đọc đang gặp.\n5) Lời kêu gọi cuối: không chắc, cẩm nang chưa nêu ví dụ.",
          },
          {
            requires: ["input"],
            text: "Bản nháp nhìn chung hợp giọng công ty, có vài chỗ có thể trau chuốt thêm cho tự nhiên hơn. Điểm tổng: 8/10.\n\n(Có tài liệu nhưng không có cách trả lời cụ thể nên chỉ ra điểm số, bạn không dùng được để sửa.)",
          },
          {
            text: "Bản nháp hợp giọng thương hiệu. Câu chữ mạch lạc và chuyên nghiệp.\n\n(Không có cẩm nang và bảng chấm nên AI trả lời chung chung, và kết luận \"hợp\" chẳng có bằng chứng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "AI cũng có thể bịa câu vi phạm",
        text: "Khi bị ép trích câu, AI đôi khi đưa ra câu nghe rất hợp lý nhưng không có trong bài. Đó là lý do bạn luôn mở bản nháp và tìm từng câu trích trước khi gửi phản hồi.",
      },
      {
        type: "scenario",
        title: "Nhận báo cáo chấm từ AI lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả về 6 câu lệch giọng. Bài phải duyệt trước 5 giờ. Trong báo cáo, có một câu trích bạn không nhớ đã đọc trong bài.",
            choices: [
              { label: "Gửi nguyên báo cáo cho freelancer để kịp giờ", next: "bad_send" },
              { label: "Mở bài, tìm 6 câu trích để đối chiếu trước", next: "s2" },
            ],
          },
          bad_send: {
            text: "Freelancer mất gần một tiếng tìm câu trích không có trong bài, rồi trả lời lại là bạn nhầm. Bài trễ hạn, lòng tin giảm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm ra 5 câu có thật, còn 1 câu không có trong bài. Trong 5 câu thật, có 4 câu lệch rõ, 1 câu bạn thấy vẫn đúng giọng.",
            choices: [
              { label: "Gửi 4 câu lệch rõ kèm dòng bảng chấm liên quan, giữ câu còn lại", next: "good" },
              { label: "Gửi cả 5 câu, để freelancer tự quyết câu nào sửa", next: "bad_dump" },
            ],
          },
          bad_dump: {
            text: "Freelancer sửa cả câu vẫn đúng giọng, bài mất một điểm nhấn của người viết. Lần sau họ đoán ý bạn thay vì theo bảng chấm.",
            ending: "bad",
          },
          good: {
            text: "Freelancer nhận đúng 4 câu, mỗi câu có dòng bảng chấm đi kèm và sửa xong trước 5 giờ. Bạn ghi lại câu thứ năm để cập nhật cẩm nang nếu nó lặp lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bảng chấm biến cảm giác thành dòng; AI tìm câu, bạn quyết định.",
          "Bài sau: dựng bản tin nội bộ hàng tháng từ ghi chú rời rạc.",
        ],
      },
    ],
  },
  {
    id: 2207,
    slug: "truyen-thong-ban-tin-noi-bo-hang-thang",
    title: "Chặng 40, Bài 8: Dựng bản tin nội bộ hàng tháng từ ghi chú rời rạc",
    subtitle: "Năm phòng gửi năm kiểu ghi chú, và bạn có hai ngày để ghép thành một bản tin.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản tin nội bộ hay bị dồn vào những ngày cuối tháng, và ghép thủ công vài chục ghi chú rất tốn giờ. AI ghép nhanh, nhưng khi nó tự viết thêm một ngày họp hay con số thì cả công ty đọc sai, nên phần xác nhận với phòng gửi tin là việc của bạn.",
    openingQuestion:
      "Năm phòng gửi ghi chú cho bản tin tháng. Bạn dán cả vào AI và nhờ ghép thành bản tin có mục rõ ràng. Bản nháp rất đẹp. Trước khi đăng, việc gì quan trọng nhất?",
    openingOptions: [
      "Đối chiếu mọi ngày, tên, con số trong bản nháp với ghi chú gốc và hỏi lại phòng gửi",
      "Đổi phông chữ và màu tiêu đề cho hợp bản tin cũ",
      "Nhờ AI viết thêm lời mở đầu cho bản tin dài hơn",
      "Gửi luôn vì AI đã ghép từ đúng ghi chú của các phòng",
    ],
    correctOption: 0,
    explanation:
      "AI ghép ghi chú thành văn xuôi thì có thể làm tròn, đổi ngày hoặc thêm chi tiết mà ghi chú không có, và nó viết những chỗ đó tự tin như chỗ đúng. Đối chiếu với ghi chú gốc và xác nhận với phòng gửi là cách duy nhất bắt được. Đổi phông là việc trình bày, thêm lời mở đầu chỉ làm bài dài hơn, còn gửi luôn nghĩa là chuyển lỗi của AI thành lỗi của bạn.",
    diagram: [
      { label: "Các phòng gửi ghi chú rời rạc", arrow: true },
      { label: "AI ghép thành mục có tiêu đề rõ ràng", arrow: true },
      { label: "Bạn đối chiếu ngày, tên, số với ghi chú gốc", arrow: true },
      { label: "Phòng gửi xác nhận, rồi mới đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: công ty logistics 120 nhân viên",
      description:
        "Mỗi tháng phòng truyền thông một người mất hai ngày ghép tin từ sáu phòng. Từ tháng sau, họ nhờ AI ghép, rồi gửi bản nháp cho từng phòng kèm dòng \"xác nhận các con số và ngày tháng của phòng bạn trước 15 giờ\". Việc dựng nhanh hơn, nhưng lần đầu vẫn có một ngày họp bị AI ghi sai vì ghi chú viết \"thứ Năm tuần sau\" mà không kèm ngày cụ thể.",
    },
    quiz: [
      Q(
        "Thời gian dựng bản tin thay đổi thế nào khi số phòng đóng góp tăng?",
        [
          "Thời gian ghép tăng ít hơn, nhưng thời gian xác nhận tăng theo số phòng",
          "Thời gian tăng đều theo số phòng trong mọi trường hợp, vì ghi chú nào cũng phải ghép tay",
          "Không đổi, vì AI xử lý nhanh bất kể có bao nhiêu phòng",
          "Giảm dần, vì càng nhiều phòng thì càng ít cần xác nhận",
        ],
        "AI ghép gần như một lượt dù có bao nhiêu ghi chú, nhưng mỗi phòng vẫn cần một lần xác nhận nên phần đó tăng theo số phòng. Không phải mọi thời gian tăng đều, cũng không có chuyện xác nhận ít đi khi nhiều phòng tham gia, và AI không làm chuyện xác nhận thay bạn.",
      ),
      Q(
        "Ghi chú của phòng kế toán viết \"nộp hồ sơ hạn thứ Sáu\". Nên làm gì khi đưa vào bản tin?",
        [
          "Hỏi phòng kế toán ngày cụ thể rồi mới ghi",
          "Nhờ AI tự điền ngày thứ Sáu gần nhất để bản tin đỡ thiếu",
          "Bỏ chữ \"thứ Sáu\" đi để khỏi ghi sai ngày trong bản tin",
          "Ghi \"cuối tuần này\" cho gần đúng với hạn nộp",
        ],
        "Người đọc bản tin ở nhiều thời điểm nên cần ngày cụ thể, và chỉ phòng kế toán biết thứ Sáu nào. Để AI tự điền là cho phép nó đoán, bỏ thứ đi thì mất thông tin, còn \"cuối tuần này\" vừa mơ hồ vừa dễ sai với người đọc muộn.",
      ),
      Q(
        "Điều nào giúp AI ghép bản tin ít bịa chi tiết hơn?",
        [
          "Dặn: chỉ dùng thông tin trong ghi chú, chỗ thiếu thì ghi \"cần hỏi phòng\"",
          "Dặn: viết hấp dẫn và đầy đủ nhất có thể",
          "Dặn: thêm vài số liệu để bản tin thuyết phục hơn",
          "Cho AI xem thêm các bản tin năm trước để nó tự bổ sung",
        ],
        "Cho phép ghi \"cần hỏi phòng\" là lối thoát để AI không phải bịa cho đủ. Yêu cầu \"đầy đủ nhất\" hay \"thêm số liệu\" khuyến khích nó lấp chỗ trống bằng chi tiết tự nghĩ, còn bản tin cũ có thể khiến nó chép số cũ vào bài mới.",
      ),
      Q(
        "Sau khi đối chiếu xong với ghi chú gốc, vì sao vẫn nên gửi bản nháp cho từng phòng?",
        [
          "Ghi chú gốc có thể đã cũ hoặc sót, chỉ phòng đó biết chắc",
          "Để phòng đó viết lại phần của mình cho dài và đầy đủ hơn, vì bản tin ngắn trông sơ sài",
          "Vì quy định là mỗi phòng phải gửi tin hai lần",
          "Để chia bớt việc sửa lỗi chính tả cho họ",
        ],
        "Đối chiếu với ghi chú chỉ cho biết AI có chép đúng ghi chú không, còn ghi chú đó đúng hay chưa thì chỉ phòng biết. Việc chính tả và viết dài không phải mục đích, và không có quy định hai lần gửi.",
      ),
      Q(
        "Trong quy trình dựng bản tin, việc nào là việc để AI làm?",
        [
          "Nhóm ghi chú theo chủ đề và đề xuất tiêu đề mục",
          "Quyết định tin nào được phép công bố toàn công ty",
          "Xác nhận một dự án đã hoàn thành đúng hạn hay chưa",
          "Chọn ảnh chân dung nhân viên xuất hiện đầu bản tin",
        ],
        "Nhóm và đặt tiêu đề là việc chữ, bạn kiểm được ngay bằng mắt. Quyết định công bố thuộc về người có thẩm quyền, xác nhận tiến độ thuộc về phòng phụ trách, còn ảnh chân dung liên quan quyền riêng tư của từng người.",
      ),
    ],
    keyTakeaways: [
      "AI ghép ghi chú nhanh, nhưng có thể tự thêm hoặc làm tròn chi tiết.",
      "Dặn AI chỉ dùng thông tin trong ghi chú và ghi \"cần hỏi phòng\" khi thiếu.",
      "Đối chiếu ngày, tên, con số với ghi chú gốc trước khi đăng.",
      "Gửi bản nháp cho từng phòng xác nhận phần của họ.",
      "Số phòng tăng thì thời gian xác nhận tăng, dù việc ghép vẫn nhanh.",
    ],
    practicePrompt: {
      question:
        "Ghi chú phòng nhân sự: \"Khám sức khoẻ định kỳ tuần sau, đăng ký qua chị Hà.\" AI viết: \"Khám sức khoẻ ngày 14/11, đăng ký qua chị Hà trước ngày 10/11.\" Bạn làm gì?",
        options: [
        "Hỏi phòng nhân sự ngày khám và hạn đăng ký, vì ghi chú không nêu ngày",
        "Giữ nguyên, vì ngày nghe hợp lý với tuần sau",
        "Xoá tên chị Hà cho chắc vì tên cũng có thể sai",
        "Nhờ AI tính lại ngày bằng lịch của tháng sau",
      ],
      correct: 0,
      explanation:
        "Ghi chú không có ngày nào, nên 14/11 và 10/11 do AI tự nghĩ ra. Chỉ phòng nhân sự biết ngày thật. Giữ nguyên là đăng ngày bịa, xoá tên chị Hà làm mất phần thông tin đúng, còn nhờ AI tính lại thì vẫn là đoán.",
    },
    summary: {
      keyIdea: "AI ghép nhanh, nhưng ngày và số trong bản tin phải do phòng gửi xác nhận.",
      formula: "Ghi chú gốc + dặn \"chỉ dùng ghi chú\" + đối chiếu + phòng xác nhận.",
      commonMistake: "Đăng bản nháp đẹp mà chưa đối chiếu với ghi chú gốc.",
      action: "Lập danh sách ngày, tên, số trong bản nháp và gửi từng dòng cho phòng liên quan.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 3 đến 5 ghi chú thật (từ email, tin nhắn phòng bạn hoặc phòng bạn quen). Dán vào công cụ AI công ty cho phép, dặn chỉ dùng thông tin trong ghi chú và ghi \"cần hỏi phòng\" khi thiếu. Gạch chân mọi ngày, tên, con số trong bản nháp, đối chiếu từng cái với ghi chú gốc rồi ghi ra bao nhiêu chỗ AI tự thêm.",
      secondary: "Ngày mai bạn sẽ được hỏi: có mấy chi tiết trong bản nháp không có trong ghi chú gốc.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng, hộp thư của bạn có năm email từ năm phòng: mỗi email một kiểu, có cái viết cả trang, có cái chỉ hai dòng. Bạn có hai ngày để biến chúng thành một bản tin cả công ty đọc được.",
      },
      {
        type: "feynman",
        title: "Dựng bản tin từ ghi chú rời đơn giản hơn bạn nghĩ",
        intro: "Giống một người dọn tủ hồ sơ: người trợ lý giúp bạn xếp giấy vào từng ngăn và dán nhãn rất nhanh. Nhưng nếu tờ giấy bị nhoè, người trợ lý có thể đoán chữ, và bạn phải hỏi lại chủ tờ giấy.",
        columns: ["Thành phần", "Dọn tủ hồ sơ", "Dựng bản tin"],
        rows: [
          ["Giấy tờ rời", "Hồ sơ nhiều kiểu", "Ghi chú của các phòng"],
          ["Người trợ lý", "Xếp ngăn, dán nhãn nhanh", "AI nhóm và đặt tiêu đề mục"],
          ["Chỗ nhoè", "Đoán chữ khó đọc", "AI tự điền ngày hoặc số thiếu"],
          ["Người xác nhận", "Chủ tờ giấy", "Phòng gửi tin"],
        ],
        oneLiner: "AI xếp và dán nhãn rất nhanh; chỗ thiếu thì phải hỏi phòng chứ không để nó đoán.",
      },
      { type: "heading", text: "Bốn mục quen thuộc của một bản tin" },
      {
        type: "list",
        items: [
          "Việc đã xong tháng này, mỗi phòng một hai dòng.",
          "Việc sắp tới, kèm ngày cụ thể và người liên hệ.",
          "Thay đổi cần biết: người mới, chính sách, lịch.",
          "Một tin vui hoặc câu chuyện ngắn để bản tin có hồn.",
        ],
      },
      {
        type: "paragraph",
        text: "Khung này giữ cố định mỗi tháng. Người đọc sẽ biết tìm gì ở đâu, và bạn chỉ thay phần nội dung.",
      },
      {
        type: "chart",
        title: "Dựng bản tin mất bao nhiêu phút theo số phòng gửi ghi chú",
        caption: "Số liệu minh hoạ, không phải đo thực tế. Kéo hai thanh trượt cho khớp với công ty bạn: thời gian tự ghép tay mỗi phòng và thời gian xác nhận với mỗi phòng khi có AI. Việc ghép bằng AI ít tăng theo số phòng, còn xác nhận thì luôn tăng.",
        kind: "line",
        xLabel: "Số phòng gửi ghi chú",
        yLabel: "Phút dựng bản tin",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "hand", label: "Ghép tay mỗi phòng", min: 10, max: 60, step: 5, value: 30, unit: "phút" },
          { id: "confirm", label: "Xác nhận với mỗi phòng", min: 3, max: 30, step: 1, value: 10, unit: "phút" },
        ],
        series: [
          { label: "Tự ghép tay", expr: "x * hand + 20" },
          { label: "Có AI + xác nhận từng phòng", expr: "25 + x * confirm + x * 2" },
        ],
      },
      { type: "heading", text: "Dặn AI để nó bớt bịa chỗ thiếu" },
      {
        type: "paragraph",
        text: "Câu dặn quan trọng nhất: \"Chỉ dùng thông tin trong các ghi chú dưới đây. Chỗ nào thiếu ngày, tên hoặc con số, ghi [cần hỏi phòng X] thay vì tự điền.\" Với câu đó, chỗ trống hiện ra để bạn hỏi thay vì bị lấp bằng chữ nghe hợp lý.",
      },
      {
        type: "flow",
        title: "Từ ghi chú rời rạc đến bản tin đã xác nhận",
        steps: [
          { label: "Gom ghi chú", detail: "Nhờ mỗi phòng gửi vào một chỗ chung, ghi rõ ai gửi và ngày gửi để sau còn biết hỏi ai." },
          { label: "Dặn AI ghép theo khung", detail: "Đưa khung bốn mục và câu dặn: chỉ dùng ghi chú, chỗ thiếu ghi [cần hỏi phòng]." },
          { label: "Đối chiếu với ghi chú gốc", detail: "Gạch chân mọi ngày, tên, con số trong bản nháp và tìm từng cái trong ghi chú. Cái nào không tìm thấy là AI tự thêm." },
          { label: "Phòng gửi xác nhận", detail: "Gửi phần của phòng nào cho phòng đó, kèm hạn phản hồi. Ghi chú gốc có thể đã đổi từ lúc gửi." },
          { label: "Bạn duyệt và đăng", detail: "Chỉ đăng khi mọi dòng cần hỏi đã có trả lời. Ghi lại chỗ đã sửa để tháng sau nhắc phòng viết rõ hơn." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tin tháng do AI ghép",
        task: "Ghi chú gốc: (1) IT: hệ thống chấm công bảo trì \"cuối tuần này\". (2) Nhân sự: chào mừng chị Mai vào phòng kinh doanh. (3) Kế toán: hạn nộp hồ sơ hoàn ứng là \"thứ Sáu\". (4) Kinh doanh: doanh số tháng đạt \"gần đủ kế hoạch\". Đánh dấu những chỗ AI tự thêm.",
        segments: [
          { text: "Chào mừng chị Mai về phòng kinh doanh." },
          {
            text: "Hệ thống chấm công bảo trì từ 22 giờ thứ Bảy đến 6 giờ sáng Chủ nhật.",
            error: "Ghi chú chỉ nói \"cuối tuần này\", không có giờ nào. AI bịa giờ bảo trì cụ thể.",
          },
          { text: "Hạn nộp hồ sơ hoàn ứng là thứ Sáu, cần hỏi phòng kế toán ngày cụ thể." },
          {
            text: "Doanh số tháng đạt 97,5% kế hoạch, cao nhất trong năm.",
            error: "Ghi chú chỉ nói \"gần đủ kế hoạch\". Con số 97,5% và \"cao nhất trong năm\" đều do AI thêm.",
          },
          { text: "Phòng kinh doanh sẽ báo cáo chi tiết trong buổi họp sau." },
        ],
      },
      {
        type: "scenario",
        title: "Hai giờ trước khi bản tin gửi cả công ty",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản nháp AI ghép trông hoàn chỉnh. Bạn thấy một dòng: \"Đợt tuyển dụng mới mở từ ngày 3/12.\" Ghi chú phòng nhân sự chỉ ghi \"tuyển dụng đầu tháng sau\". Còn hai giờ.",
            choices: [
              { label: "Nhắn phòng nhân sự hỏi ngày mở đợt tuyển dụng, đợi họ trả lời", next: "s2" },
              { label: "Để nguyên vì \"đầu tháng sau\" cũng gần ngày 3", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Ngày mở thật là 5/12. Nhiều người đăng ký sớm rồi thấy chưa mở, và phòng nhân sự phải gửi email đính chính cả công ty.",
            ending: "bad",
          },
          s2: {
            text: "Phòng nhân sự trả lời: ngày mở là 5/12. Bạn sửa lại dòng đó và nhớ ra còn hai chỗ khác trong bản nháp cũng có ngày.",
            choices: [
              { label: "Đối chiếu tiếp hai chỗ ngày còn lại với ghi chú gốc và hỏi nếu không khớp", next: "good" },
              { label: "Đăng luôn vì chỗ chính đã sửa xong", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Một chỗ ngày còn lại là do AI tự thêm. Ai đó phát hiện sau khi bản tin đã gửi đi, và độ tin cậy của cả bản tin bị hỏi lại.",
            ending: "bad",
          },
          good: {
            text: "Bạn tìm ra một chỗ ngày khác AI tự thêm, hỏi phòng gửi và sửa. Bản tin gửi đúng giờ, và mọi ngày trong đó đều có người xác nhận.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI ghép và dán nhãn; ngày, tên, số phải do phòng gửi xác nhận.",
          "Bài sau: biến biên bản họp dài thành tin cho toàn công ty.",
        ],
      },
    ],
  },
  {
    id: 2208,
    slug: "truyen-thong-tom-tat-cuoc-hop-thanh-tin-toan-cong-ty",
    title: "Chặng 40, Bài 9: Biến biên bản họp dài thành tin cho toàn công ty",
    subtitle: "Không phải điều gì được nói trong phòng họp cũng được nói với toàn công ty.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📣",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau họp lãnh đạo, mọi người muốn biết chuyện gì đã quyết, nhưng biên bản có cả phần nhạy cảm chưa được công bố. Dán cả biên bản cho AI rồi đăng bản tóm tắt là cách nhanh nhất để lộ điều không được lộ.",
    openingQuestion:
      "Biên bản họp ban lãnh đạo dài 5 trang, có phần bàn về nhân sự và phần chưa quyết. Bạn cần viết tin cho toàn công ty. Bước đầu tiên hợp lý nhất là gì?",
    openingOptions: [
      "Chọn trước phần được phép công bố, rồi mới đưa riêng phần đó cho AI viết lại",
      "Dán cả biên bản cho AI và dặn bỏ phần nhạy cảm",
      "Nhờ AI tự quyết phần nào nên công bố",
      "Đăng luôn bản tóm tắt sau khi đọc lướt một lần",
    ],
    correctOption: 0,
    explanation:
      "Việc chọn phần được công bố là quyết định về thông tin nên do bạn và người chủ trì làm trước, và chỉ phần đã chọn mới được đưa cho AI. Dán cả biên bản rồi dặn bỏ phần nhạy cảm là đã gửi dữ liệu nhạy cảm ra ngoài, và AI vẫn có thể để lọt ý từ phần đó. AI không có thẩm quyền quyết định công bố, còn đọc lướt rồi đăng bỏ qua cả hai việc trên.",
    diagram: [
      { label: "Biên bản họp đầy đủ", arrow: true },
      { label: "Bạn chọn phần được phép công bố", arrow: true },
      { label: "AI viết lại phần đã chọn cho dễ đọc", arrow: true },
      { label: "Người chủ trì duyệt, rồi mới đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: công ty sản xuất bao bì",
      description:
        "Sau họp ban lãnh đạo hàng quý, trợ lý giám đốc phải viết tin cho 300 nhân viên. Chị lập một quy tắc: chỉ những mục người chủ trì đánh dấu \"được nói\" mới đưa cho AI, và bản viết lại phải quay về người chủ trì duyệt. Quý đầu có một câu AI viết \"sẽ điều chỉnh nhân sự\" dù biên bản không có ý đó, và người duyệt bắt được trước khi đăng.",
    },
    quiz: [
      Q(
        "Trong biên bản họp có mục \"dự kiến cơ cấu lại phòng X, chưa quyết\". Xử lý mục này thế nào khi viết tin toàn công ty?",
        [
          "Không đưa vào tin, trừ khi người chủ trì cho phép công bố",
          "Đưa vào và ghi thêm chữ \"dự kiến\" cho an toàn",
          "Nhờ AI diễn đạt thật nhẹ nhàng để nhân viên đọc xong không bị lo lắng quá mức",
          "Đưa cho mọi người biết để có thời gian chuẩn bị",
        ],
        "Thông tin chưa quyết dễ gây hoang mang và có thể sai so với quyết định cuối. Ghi \"dự kiến\" hay diễn đạt nhẹ nhàng không đổi việc nó chưa được phép công bố. Chuyện \"để người ta chuẩn bị\" cũng không phải quyết định của người viết tin.",
      ),
      Q(
        "Vì sao chỉ đưa cho AI phần biên bản đã được chọn công bố?",
        [
          "Phần nhạy cảm không bị gửi ra hệ thống ngoài và không lọt vào tin",
          "AI đọc ít chữ thì viết ngắn hơn và luôn đúng hơn so với khi đọc cả biên bản",
          "Vì AI không hiểu được phần nhạy cảm của biên bản",
          "Để bản tóm tắt đọc nhanh, bỏ bớt việc cho người duyệt",
        ],
        "Cách an toàn nhất để phần nhạy cảm không xuất hiện là không đưa nó vào. AI viết ngắn hay đúng không phụ thuộc chuyện đọc ít chữ, nó vẫn hiểu phần nhạy cảm nếu bạn đưa, và người duyệt vẫn phải duyệt đầy đủ dù bản tin ngắn.",
      ),
      Q(
        "AI viết lại: \"Ban lãnh đạo thống nhất tăng ngân sách đào tạo.\" Biên bản ghi \"đề xuất tăng ngân sách đào tạo, chờ tài chính xem\". Lỗi ở đâu?",
        [
          "Biến một đề xuất thành quyết định đã thống nhất",
          "Dùng từ \"ngân sách\" thay cho từ \"kinh phí\" trong biên bản",
          "Viết quá ngắn nên thiếu con số tiền cụ thể cho người đọc",
          "Câu quá dài nên khó đọc với nhân viên ở các phòng khác",
        ],
        "\"Đề xuất, chờ xem\" và \"thống nhất\" là hai trạng thái khác hẳn nhau, và AI hay đẩy chữ về phía chắc chắn hơn. Thay từ đồng nghĩa không phải lỗi thật, biên bản không có số tiền để AI ghi, và câu này không dài.",
      ),
      Q(
        "Người chủ trì cuộc họp nên làm gì với bản viết lại của AI?",
        [
          "Đọc đối chiếu với biên bản, xác nhận từng ý rồi duyệt",
          "Chỉ liếc qua tiêu đề vì AI đã viết đúng và người chủ trì rất bận việc",
          "Giao lại cho AI tự đánh giá bản của chính nó",
          "Chuyển thẳng cho phòng truyền thông đăng",
        ],
        "Người chủ trì là người biết điều đã quyết và điều chưa, nên là người duy nhất bắt được câu \"lố\" so với biên bản. AI tự đánh giá bản của nó cũng có thể bỏ sót y hệt, còn chuyển thẳng đăng là bỏ khâu duyệt.",
      ),
      Q(
        "Điều nào giúp bản tin toàn công ty dễ đọc mà không đổi ý của biên bản?",
        [
          "Mở bằng quyết định chính, rồi mỗi quyết định một đoạn ngắn kèm người phụ trách",
          "Copy nguyên các đoạn biên bản và thêm tiêu đề lớn",
          "Thêm bình luận cá nhân của người viết về từng quyết định",
          "Viết thành một đoạn dài để không bỏ sót ý",
        ],
        "Mở bằng quyết định và ghi người phụ trách giúp người đọc thấy điều liên quan đến mình. Copy nguyên biên bản đưa cả ngôn ngữ họp nội bộ ra ngoài, bình luận cá nhân là thêm ý, còn một đoạn dài khiến ít ai đọc hết.",
      ),
    ],
    keyTakeaways: [
      "Chọn phần được công bố trước, rồi mới đưa cho AI.",
      "Việc quyết định công bố là của người chủ trì, không phải của AI.",
      "AI hay biến \"đề xuất\" thành \"đã quyết\", nên soát trạng thái từng ý.",
      "Người chủ trì duyệt bản viết lại với biên bản gốc trước khi đăng.",
      "Tin toàn công ty mở bằng quyết định chính và người phụ trách.",
    ],
    practicePrompt: {
      question:
        "Bạn có 6 mục trong biên bản. Người chủ trì đánh dấu \"được nói\" cho 3 mục. Bạn đưa AI cả 6 mục và dặn \"chỉ viết 3 mục được nói\". Điều gì có thể xảy ra?",
      options: [
        "Nội dung 3 mục kia đã ra hệ thống ngoài và có thể lọt vào bản viết",
        "Không sao, vì AI làm đúng theo lời dặn của bạn",
        "Bản tin sẽ ngắn hơn vì AI bỏ ba mục",
        "AI tự tìm thêm thông tin cho 3 mục còn lại",
      ],
      correct: 0,
      explanation:
        "Đã dán thì dữ liệu của 3 mục kia đã rời khỏi tay bạn, và AI có thể để lọt một ý từ đó vào bản viết. Lời dặn không phải hàng rào an toàn. Việc bản tin ngắn hay AI tìm thêm không phải rủi ro chính ở đây.",
    },
    summary: {
      keyIdea: "Chọn điều được nói trước; AI chỉ viết lại phần đã được chọn.",
      formula: "Chọn phần công bố + AI viết lại + người chủ trì duyệt với biên bản gốc.",
      commonMistake: "Dán cả biên bản rồi dặn AI tự bỏ phần nhạy cảm.",
      action: "Đánh dấu \"được nói / chưa được nói\" cho từng mục biên bản trước khi mở công cụ AI.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một biên bản họp thật (của phòng bạn, không phải phần mật). Đánh dấu từng mục là \"được nói\" hoặc \"chưa\", hỏi người chủ trì nếu không chắc. Chỉ đưa các mục được nói cho công cụ AI công ty cho phép để viết tin 150 chữ, rồi so từng câu với biên bản và ghi lại chỗ AI đổi \"đề xuất\" thành \"đã quyết\".",
      secondary: "Ngày mai bạn sẽ được hỏi: mục nào bạn đánh dấu chưa được nói, và ai là người quyết.",
    },
    sections: [
      {
        type: "lead",
        text: "Họp ban lãnh đạo xong lúc 5 giờ chiều. Đến 5 giờ 30, có người nhắn: \"Họp có gì mới không?\" Bạn có biên bản 5 trang trong tay, và không phải dòng nào cũng được nói ra.",
      },
      {
        type: "feynman",
        title: "Viết tin từ biên bản họp đơn giản hơn bạn nghĩ",
        intro: "Giống người thư ký mang hồ sơ ra tủ kính của công ty: trước hết chị chọn những tờ được phép dán ra ngoài, rồi nhờ người viết chữ đẹp chép lại. Tờ nào chưa được dán thì không đưa cho người chép.",
        columns: ["Thành phần", "Tủ kính công ty", "Tin toàn công ty"],
        rows: [
          ["Hồ sơ gốc", "Cả tập giấy tờ họp", "Biên bản họp đầy đủ"],
          ["Người chọn", "Thư ký hỏi trưởng phòng", "Bạn hỏi người chủ trì"],
          ["Người chép chữ đẹp", "Người viết bảng", "AI viết lại phần đã chọn"],
          ["Người duyệt", "Trưởng phòng xem bảng trước khi dán", "Người chủ trì duyệt bản viết lại"],
        ],
        oneLiner: "Chọn tờ nào được dán ra trước, rồi mới nhờ người chép: đó là thứ tự của việc này.",
      },
      { type: "heading", text: "Ba loại nội dung trong một biên bản" },
      {
        type: "list",
        items: [
          "Đã quyết và được phép nói: đưa vào tin.",
          "Đề xuất hoặc chưa quyết: chỉ đưa khi người chủ trì cho phép, và ghi đúng trạng thái.",
          "Nhạy cảm (nhân sự cá nhân, khách hàng, số liệu chưa công bố): giữ ngoài tin và ngoài công cụ AI.",
        ],
      },
      {
        type: "callout",
        label: "Dặn AI không phải là hàng rào",
        text: "Câu \"bỏ phần nhạy cảm\" không ngăn được điều gì vì dữ liệu đã được gửi đi khi bạn dán. Cách chắc chắn là không đưa phần đó vào ngay từ đầu.",
      },
      {
        type: "flow",
        title: "Từ biên bản họp đến tin toàn công ty",
        steps: [
          { label: "Đánh dấu từng mục", detail: "Với mỗi mục, ghi \"được nói\", \"chưa được nói\" hoặc \"hỏi lại\". Mục hỏi lại thì hỏi người chủ trì trước khi làm tiếp." },
          { label: "Chỉ trích các mục được nói", detail: "Sao chép riêng các mục đó sang một tài liệu mới. Đó là thứ duy nhất bạn đưa cho AI, không phải cả biên bản." },
          { label: "AI viết lại cho người ngoài phòng họp", detail: "Nhờ mở bằng quyết định chính, bỏ ngôn ngữ họp nội bộ, mỗi ý ghi người phụ trách. Dặn giữ nguyên trạng thái đề xuất hay đã quyết." },
          { label: "Bạn đối chiếu với biên bản", detail: "Soát từng câu: có mục nào bị đẩy từ \"đề xuất\" thành \"đã quyết\", có con số hay tên nào bị thêm không." },
          { label: "Người chủ trì duyệt", detail: "Người chủ trì đọc bản viết lại cùng biên bản gốc và đồng ý bằng văn bản, rồi mới đăng." },
        ],
      },
      {
        type: "scenario",
        title: "Biên bản họp ban lãnh đạo lúc 5 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Biên bản có 6 mục: 3 mục đã quyết, 2 mục đề xuất chưa quyết, 1 mục bàn về một trưởng phòng. Sếp nhắn: \"Em viết tin cho cả công ty ngay chiều nay nhé.\"",
            choices: [
              { label: "Dán cả biên bản cho AI, dặn bỏ phần nhạy cảm", next: "bad_paste" },
              { label: "Hỏi người chủ trì mục nào được nói, rồi chỉ đưa các mục đó cho AI", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bản viết lại có câu \"một số thay đổi nhân sự sẽ được cân nhắc\". Câu này không có trong biên bản, nhưng AI đã thấy mục nhân sự. Tin lan trong công ty trước khi trưởng phòng đó được thông báo.",
            ending: "bad",
          },
          s2: {
            text: "Người chủ trì cho phép công bố 3 mục đã quyết và 1 mục đề xuất, nói rõ phải ghi là đề xuất. AI trả về bản viết lại. Câu về mục đề xuất ghi: \"Công ty sẽ mở lớp đào tạo mới.\"",
            choices: [
              { label: "Sửa thành \"đề xuất mở lớp đào tạo mới, chờ phê duyệt\" rồi gửi người chủ trì duyệt", next: "good" },
              { label: "Giữ nguyên vì nghe tự nhiên và tích cực", next: "bad_status" },
            ],
          },
          bad_status: {
            text: "Nhiều người đăng ký lớp đào tạo chưa được phê duyệt. Phòng nhân sự phải gửi email đính chính và tin của bạn mất độ tin cậy.",
            ending: "bad",
          },
          good: {
            text: "Người chủ trì đối chiếu bản viết với biên bản, đồng ý rồi cho đăng. Tin đúng trạng thái từng mục, và không có chi tiết nhạy cảm nào lọt ra.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát tin AI viết từ ba mục được phép công bố",
        task: "Ba mục được phép: (1) đã quyết chuyển kho sang địa điểm mới vào quý sau; (2) đề xuất thêm một ca làm việc buổi tối, chưa duyệt; (3) đã quyết tổ chức họp toàn công ty đầu năm, chưa có ngày. Đánh dấu chỗ AI tự thêm hoặc đổi trạng thái.",
        segments: [
          { text: "Ban lãnh đạo đã quyết chuyển kho sang địa điểm mới vào quý sau." },
          {
            text: "Công ty sẽ áp dụng ca làm buổi tối từ tháng tới.",
            error: "Đây mới là đề xuất chưa duyệt, và biên bản không có mốc tháng tới. AI đẩy nó thành quyết định.",
          },
          { text: "Họp toàn công ty đầu năm sẽ được tổ chức, ngày cụ thể sẽ thông báo sau." },
          {
            text: "Buổi họp sẽ diễn ra tại hội trường tầng 5 lúc 9 giờ sáng.",
            error: "Biên bản chưa có ngày, chưa có nơi và giờ. AI bịa địa điểm và giờ cho nghe cụ thể.",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Chọn điều được nói trước; AI viết lại; người chủ trì duyệt.",
          "Bài sau: dự án nhỏ, dựng ba số bản tin với cùng một khung.",
        ],
      },
    ],
  },
  {
    id: 2209,
    slug: "truyen-thong-du-an-nho-bo-ban-tin-ba-so",
    title: "Chặng 40, Bài 10: Dự án nhỏ: dựng ba số bản tin nội bộ với cùng một khung",
    subtitle: "Làm ba số liên tiếp và ghi lại việc nào đã giao AI, việc nào bạn giữ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Làm một số bản tin thì may rủi, làm ba số theo cùng một khung mới cho thấy quy trình có chạy ổn hay không. Ghi lại việc nào giao AI, việc nào bạn giữ giúp bạn giao đúng việc và không quên bước kiểm chứng khi bận.",
    openingQuestion:
      "Bạn dựng số bản tin thứ hai và thấy thời gian không giảm nhiều so với số đầu. Bạn xem lại và thấy mình vẫn tự ghép tay phần lớn. Điều gì giúp nhất cho số ba?",
    openingOptions: [
      "Ghi rõ việc nào giao AI, việc nào giữ, rồi giao thêm phần ghép và đặt tiêu đề",
      "Bỏ hết bước kiểm chứng để tiết kiệm thời gian",
      "Đổi khung bản tin mỗi số cho người đọc không chán",
      "Nhờ AI làm cả kiểm chứng và duyệt để khỏi tốn thời gian",
    ],
    correctOption: 0,
    explanation:
      "Danh sách việc giao AI và việc giữ cho bạn thấy chỗ nào đang tự làm mà AI làm được (ghép, đặt tiêu đề) và chỗ nào phải giữ (kiểm chứng, duyệt). Bỏ kiểm chứng tiết kiệm giờ nhưng đổi bằng lỗi trong bản tin. Đổi khung mỗi số làm mất lợi thế của việc lặp lại, và giao kiểm chứng cho AI là để chính nguồn có thể bịa tự kiểm mình.",
    diagram: [
      { label: "Khung bản tin cố định bốn mục", arrow: true },
      { label: "Mỗi số: AI ghép, bạn kiểm chứng và duyệt", arrow: true },
      { label: "Ghi lại việc giao AI và việc bạn giữ", arrow: true },
      { label: "Số sau giao thêm được việc phù hợp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng truyền thông 2 người",
      description:
        "Hai người phụ trách bản tin của công ty 80 nhân viên. Họ dùng một khung bốn mục cho ba số liên tiếp và ghi vào một bảng nhỏ: việc AI làm (ghép, đặt tiêu đề, đề xuất câu dẫn), việc người giữ (xác nhận ngày và số, duyệt, quyết định tin nào lên). Sau số ba, họ thấy phần ghép đã gần như không cần sửa, nên chuyển thời gian đó sang việc gọi các phòng xác nhận.",
    },
    quiz: [
      Q(
        "Vì sao dùng cùng một khung cho ba số liên tiếp?",
        [
          "Lặp lại cho bạn biết bước nào đã ổn và bước nào còn lỗi",
          "Để bản tin cả ba số giống hệt nhau từng chữ, người đọc đỡ phải làm quen",
          "Vì AI chỉ làm được một khung duy nhất",
          "Để bạn khỏi phải đọc lại bản nháp mỗi số",
        ],
        "Khi khung cố định, khác biệt giữa các số chính là chất lượng quy trình, nên bạn thấy chỗ nào tốn giờ hoặc hay sai. Bản tin không cần giống từng chữ, AI làm được nhiều khung khác nhau, và bạn vẫn phải đọc lại mỗi số.",
      ),
      Q(
        "Việc nào nên giữ cho bạn thay vì giao AI trong quy trình bản tin?",
        [
          "Xác nhận ngày, tên, con số với phòng gửi và duyệt trước khi đăng",
          "Đặt tiêu đề gợi ý cho từng mục của bản tin nội bộ tháng này để đăng luôn",
          "Nhóm các ghi chú rời rạc theo chủ đề để chia mục cho bản tin",
          "Viết câu dẫn mở đầu từ ba ý gạch đầu dòng người ta đưa",
        ],
        "Xác nhận và duyệt liên quan trách nhiệm và sự thật, AI không tự biết ngày nào thật. Đặt tiêu đề, nhóm ghi chú và viết câu dẫn đều là việc chữ mà bạn kiểm được bằng mắt, nên giao AI thì hợp lý.",
      ),
      Q(
        "Một bảng ghi \"giao AI / bạn giữ\" giúp gì sau ba số?",
        [
          "Cho thấy việc nào đang tự làm dù AI làm được, để chuyển bớt",
          "Chứng minh với sếp rằng AI có thể thay được cả phòng truyền thông",
          "Cho phép bỏ hẳn bước kiểm chứng ở các số bản tin về sau này",
          "Giúp AI tự học từ bảng ghi và không còn sai ở số tiếp theo",
        ],
        "Bảng là bản ghi cho chính bạn, giúp tìm việc đáng giao thêm. Nó không chứng minh gì về thay thế người, không cho phép bỏ kiểm chứng, và AI không học từ bảng của bạn giữa các cuộc trò chuyện.",
      ),
      Q(
        "Số hai bạn thấy AI tự thêm 3 chi tiết không có trong ghi chú. Nên làm gì ở số ba?",
        [
          "Dặn rõ \"chỉ dùng ghi chú, thiếu thì ghi cần hỏi\" và soát ngay các ngày, số",
          "Bỏ AI hẳn và tự ghép tay từ đầu mọi số về sau, vì AI đã chứng tỏ là không đáng tin cậy để ghép tin",
          "Bỏ qua vì ba chi tiết đó nhỏ và người đọc cũng khó nhận ra",
          "Yêu cầu AI viết ngắn hơn để có ít chỗ sai hơn trong bản",
        ],
        "Câu dặn thu hẹp chỗ AI được phép điền, còn soát ngày và số bắt những gì lọt. Bỏ hẳn AI mất phần việc nó làm tốt, chi tiết nhỏ vẫn là chi tiết sai, và viết ngắn hơn chỉ giảm số chỗ có thể sai chứ không sửa được nguyên nhân.",
      ),
      Q(
        "Kết thúc dự án ba số, ghi chép nào có ích nhất cho người kế nhiệm?",
        [
          "Khung bản tin, câu dặn AI đã dùng và danh sách việc phải giữ",
          "Toàn bộ bản nháp của cả ba số để người sau chỉ việc sao chép lại nội dung",
          "Tên các phòng hay gửi ghi chú trễ nhất",
          "Số phút bạn đã tiết kiệm được mỗi số",
        ],
        "Khung, câu dặn và danh sách việc giữ là thứ người sau dùng lại được ngay. Bản nháp cũ chứa nội dung đã hết hạn, danh sách phòng trễ là chuyện khác, còn số phút chỉ là kết quả chứ không phải cách làm.",
      ),
    ],
    keyTakeaways: [
      "Ba số liên tiếp theo cùng một khung cho thấy quy trình có ổn không.",
      "Ghi rõ việc nào giao AI, việc nào bạn giữ cho từng số.",
      "Kiểm chứng và duyệt luôn thuộc về bạn, không giao AI.",
      "Dùng cùng một câu dặn AI và cải tiến nó sau mỗi số.",
      "Ghi khung, câu dặn và danh sách việc để người kế nhiệm dùng lại.",
    ],
    practicePrompt: {
      question:
        "Sau số một bạn ghi: AI ghép và đặt tiêu đề; bạn ghép tay phần tin từ phòng IT và kiểm chứng. Số hai bạn nên đổi gì?",
      options: [
        "Giao thêm phần tin của phòng IT cho AI ghép, vẫn giữ kiểm chứng",
        "Giao cả kiểm chứng cho AI vì AI đã ghép được",
        "Giữ y nguyên vì ghép tay cho chắc chắn nhất",
        "Đổi hết khung để thử cách khác",
      ],
      correct: 0,
      explanation:
        "Phần ghép tin của phòng IT là việc chữ mà AI làm được, nên chuyển bớt là hợp lý, và kiểm chứng vẫn ở bạn. Giao kiểm chứng cho AI bỏ mất chốt an toàn, giữ y nguyên thì không rút ra được gì từ số một, còn đổi khung làm mất khả năng so sánh giữa các số.",
    },
    summary: {
      keyIdea: "Làm lặp cùng khung và ghi lại phân công cho biết việc nào giao thêm AI được.",
      formula: "Khung cố định + AI ghép + bạn kiểm chứng và duyệt + bảng ghi việc.",
      commonMistake: "Tự làm tay từ đầu mỗi số mà không ghi lại việc nào giao được.",
      action: "Dựng số đầu theo khung bốn mục và ghi cột \"AI làm / tôi giữ\" ngay khi làm xong.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy khung bốn mục (việc đã xong, việc sắp tới, thay đổi cần biết, một tin vui) cho một bản tin thật hoặc thử của phòng bạn. Dựng số một từ ghi chú thật, dùng công cụ AI công ty cho phép. Ghi một bảng hai cột: việc AI làm, việc bạn giữ, và chép câu dặn AI bạn đã dùng.",
      secondary: "Ngày mai bạn sẽ được hỏi: cột \"bạn giữ\" của bạn có những việc gì, và vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học cách ghép ghi chú và xác nhận. Bài này gom các kỹ năng đó thành một dự án nhỏ: ba số bản tin liên tiếp, cùng một khung, và một bảng ghi lại ai làm gì.",
      },
      {
        type: "feynman",
        title: "Ba số theo cùng một khung đơn giản hơn bạn nghĩ",
        intro: "Giống tập nấu cùng một món ba tối liên tiếp: tối đầu bạn mò mẫm, tối hai biết bước nào tốn giờ, tối ba đã giao được người phụ bếp gọt rau, còn bạn giữ phần nêm nếm vì chỉ bạn biết vị.",
        columns: ["Thành phần", "Nấu một món ba tối", "Dựng ba số bản tin"],
        rows: [
          ["Công thức cố định", "Cùng một món", "Cùng khung bốn mục"],
          ["Việc giao phụ bếp", "Gọt rau, thái thịt", "AI ghép ghi chú, đặt tiêu đề"],
          ["Việc bạn giữ", "Nêm nếm", "Xác nhận ngày, số và duyệt"],
          ["Ghi chép", "Sổ nấu ăn nhỏ", "Bảng \"AI làm / tôi giữ\""],
        ],
        oneLiner: "Lặp cùng một khung ba lần để thấy việc nào giao được, việc nào phải tự giữ.",
      },
      { type: "heading", text: "Khung cho cả ba số" },
      {
        type: "list",
        items: [
          "Việc đã xong: một hai dòng mỗi phòng.",
          "Việc sắp tới: kèm ngày cụ thể và người liên hệ.",
          "Thay đổi cần biết: người mới, chính sách, lịch.",
          "Một tin vui hoặc câu chuyện ngắn.",
        ],
      },
      { type: "heading", text: "Việc nào giao AI, việc nào bạn giữ" },
      {
        type: "comparison",
        left: {
          label: "Giao AI, rồi đọc lại",
          text: "Nhóm ghi chú theo mục. Đặt tiêu đề gợi ý. Viết câu dẫn từ vài ý. Đổi văn nói thành văn viết. Soát lỗi chính tả và câu dài.",
        },
        right: {
          label: "Bạn giữ",
          text: "Xác nhận ngày, tên, con số với phòng gửi. Quyết định tin nào lên bản tin. Duyệt lần cuối trước khi đăng. Bảo vệ dữ liệu nhạy cảm không đưa vào công cụ.",
        },
      },
      {
        type: "flow",
        title: "Một số bản tin trong dự án ba số",
        steps: [
          { label: "Thu ghi chú", detail: "Các phòng gửi vào một chỗ chung, đúng hạn. Ghi chú nào thiếu ngày hoặc số thì hỏi lại ngay, đừng chờ đến lúc dựng." },
          { label: "AI ghép theo khung", detail: "Đưa khung bốn mục và câu dặn cố định: chỉ dùng ghi chú, chỗ thiếu ghi [cần hỏi]." },
          { label: "Bạn kiểm chứng", detail: "Gạch chân ngày, tên, con số trong bản nháp, đối chiếu với ghi chú gốc, gửi phòng liên quan xác nhận." },
          { label: "Duyệt và đăng", detail: "Bạn hoặc người có thẩm quyền đọc lần cuối rồi mới đăng. Chỉ đăng khi mọi dòng cần hỏi đã có trả lời." },
          { label: "Ghi lại và cải tiến", detail: "Ghi việc AI làm được, việc phải sửa nhiều. Số sau cải tiến câu dặn và chuyển bớt việc phù hợp cho AI." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp prompt cho số bản tin thứ hai",
        task: "Số một xong, bạn thấy AI tự thêm vài ngày họp. Lắp prompt cho số hai để bớt lỗi đó và đúng khung bốn mục.",
        parts: [
          {
            id: "frame",
            label: "Khung bản tin",
            options: [
              { text: "Ghép các ghi chú này thành bản tin cho hay.", feedback: "Không có khung, mỗi số một kiểu, khó so sánh và người đọc khó tìm tin." },
              { text: "Ghép theo bốn mục: việc đã xong, việc sắp tới, thay đổi cần biết, tin vui.", good: true, feedback: "Khung cố định giúp các số so sánh được và người đọc biết tìm gì ở đâu." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc cho chỗ thiếu",
            options: [
              { text: "Nếu thiếu ngày hoặc số, hãy bổ sung cho hợp lý.", feedback: "Đây chính là câu cho phép AI bịa ngày và số cho bản tin nghe đầy đủ." },
              { text: "Chỉ dùng thông tin trong ghi chú. Chỗ thiếu ghi [cần hỏi phòng X], không tự điền.", good: true, feedback: "Chỗ trống hiện ra để bạn hỏi thay vì bị lấp bằng chữ nghe hợp lý." },
            ],
          },
          {
            id: "output",
            label: "Đầu ra",
            options: [
              { text: "Viết thật dài, đầy đủ mọi chi tiết có thể.", feedback: "Dài không đồng nghĩa hay, và \"mọi chi tiết\" khuyến khích AI thêm chi tiết tự nghĩ." },
              { text: "Mỗi mục dưới 80 chữ, mỗi tin ghi tên phòng gửi để tôi xác nhận.", good: true, feedback: "Có tên phòng đi kèm mỗi tin nên bạn biết hỏi ai khi xác nhận." },
            ],
          },
        ],
        responses: [
          {
            requires: ["frame", "rule", "output"],
            text: "VIỆC ĐÃ XONG\n- Kho (phòng Vận hành): hoàn tất kiểm kê quý.\n\nVIỆC SẮP TỚI\n- Bảo trì hệ thống chấm công cuối tuần này [cần hỏi phòng IT: ngày và giờ cụ thể].\n\nTHAY ĐỔI CẦN BIẾT\n- Chị Mai chuyển sang phòng Kinh doanh (phòng Nhân sự).\n\nTIN VUI\n- Phòng Kinh doanh gần đạt kế hoạch tháng (phòng Kinh doanh) [cần hỏi: con số cụ thể].",
          },
          {
            requires: ["frame"],
            text: "VIỆC ĐÃ XONG\n- Kho hoàn tất kiểm kê quý, đạt 99% độ chính xác.\n\nVIỆC SẮP TỚI\n- Bảo trì hệ thống chấm công từ 22 giờ thứ Bảy.\n\n(Đúng khung nhưng không có quy tắc cho chỗ thiếu, nên AI bịa \"99%\" và \"22 giờ thứ Bảy\".)",
          },
          {
            text: "Tháng này công ty ghi nhận nhiều thành tựu nổi bật! Các phòng đã nỗ lực hết mình, mang lại kết quả ấn tượng và mở ra nhiều cơ hội mới...\n\n(Không khung, không quy tắc, nên bản tin mở ra toàn lời khen chung chung và không có thông tin nào dùng được.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Số ba bản tin và cái bảng ghi chép",
        start: "s1",
        nodes: {
          s1: {
            text: "Đến số ba, bảng ghi của bạn cho thấy: AI ghép tốt, nhưng bạn vẫn tự đặt tiêu đề cho từng mục. Hạn gửi bản tin là 4 giờ chiều và bạn chưa xác nhận xong ngày họp với hai phòng.",
            choices: [
              { label: "Giao AI đặt tiêu đề, dùng thời gian tiết kiệm để gọi hai phòng xác nhận ngày", next: "s2" },
              { label: "Tự đặt tiêu đề như cũ, xác nhận ngày nếu kịp", next: "bad_slow" },
            ],
          },
          bad_slow: {
            text: "Hết giờ trước khi bạn gọi được hai phòng. Bản tin đăng với ngày chưa xác nhận, và một phòng phải đính chính sau đó.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về ba tiêu đề gợi ý trong một phút. Bạn chọn một tiêu đề, và gọi hai phòng. Một phòng nói ngày họp đã đổi so với ghi chú.",
            choices: [
              { label: "Sửa ngày theo phòng xác nhận, ghi vào bảng \"AI làm / tôi giữ\" và lưu câu dặn", next: "good" },
              { label: "Giữ ngày trong ghi chú vì AI ghép theo ghi chú đó", next: "bad_stale" },
            ],
          },
          bad_stale: {
            text: "Ngày trong ghi chú đã cũ. Nhiều người sắp xếp lịch theo ngày sai và phải đổi lại.",
            ending: "bad",
          },
          good: {
            text: "Bản tin đúng ngày và gửi kịp giờ. Bảng ghi của bạn thêm dòng \"đặt tiêu đề: giao AI\", và người kế nhiệm dùng lại được khung, câu dặn và danh sách việc phải giữ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lặp cùng một khung: AI ghép, bạn kiểm chứng và duyệt, rồi ghi lại việc nào giao được.",
          "Bài sau: đánh dấu mọi con số và tên riêng cần soát trước khi đăng.",
        ],
      },
    ],
  },
];
