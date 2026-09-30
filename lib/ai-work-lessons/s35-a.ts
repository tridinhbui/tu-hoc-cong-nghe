import type { Lesson } from "../lesson-types";

// Chặng 35, bài 1-5. Giáo trình: scripts/curriculum/stage-35.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm kết quả.

type Q = { question: string; options: string[]; correct: number; explanation: string };
const q = (question: string, right: string, wrong: [string, string, string], explanation: string): Q => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

const fey = (title: string, intro: string, mid: string, right: string, rows: [string, string, string][], oneLiner: string) =>
  ({ type: "feynman" as const, title, intro, columns: ["Thành phần", mid, right], rows, oneLiner });

export const S35_A_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- 2100
  {
    id: 2100,
    slug: "tra-loi-tin-nhan-dat-phong-luc-nua-dem",
    title: "Chặng 35, Bài 1: Trả lời tin nhắn hỏi đặt phòng lúc nửa đêm",
    subtitle: "Một tờ giấy nhắn để lại cho ca sáng: điều chắc chắn viết một cột, điều cần xác nhận viết một cột.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🌙",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách hay nhắn hỏi phòng lúc quầy đã đóng, và ai trả lời nhanh và rõ thường được chọn. Nhưng trả lời vội dễ hứa điều chưa kiểm: phòng còn hay hết, giá đã gồm bữa sáng chưa. AI giúp bạn có sẵn câu trả lời mẫu tách bạch điều chắc chắn với điều phải xác nhận sáng mai, để khách vẫn thấy được đón tiếp mà bạn không nợ lời hứa nào.",
    openingQuestion:
      "Một giờ sáng, khách nhắn hỏi còn phòng đôi cho tối mai không. Quầy đóng, bạn chưa xem bảng phòng. Câu trả lời nào an toàn nhất?",
    openingOptions: [
      "Cảm ơn quý khách, chúng tôi sẽ kiểm tra phòng và báo lại trước 9 giờ sáng",
      "Dạ còn phòng ạ, mời quý khách cứ đến, chúng tôi luôn giữ chỗ",
      "Dạ hết phòng rồi ạ, quý khách vui lòng tìm nơi khác giúp",
      "Không trả lời gì cả vì ngoài giờ làm việc, sáng mai xem sau",
    ],
    correctOption: 0,
    explanation:
      "Khách cần biết hai điều: tin nhắn đã được nhận và bao giờ sẽ có câu trả lời thật. Nói còn phòng khi chưa xem bảng phòng là hứa điều chưa kiểm, có thể dẫn tới việc khách đến mà không còn chỗ. Nói hết phòng cũng là đoán, và đẩy khách đi mất. Im lặng cả đêm khiến khách nhắn sang nơi khác. Câu trả lời tốt nhận tin, hẹn giờ cụ thể và không khẳng định điều chưa biết.",
    diagram: [
      { label: "Khách nhắn hỏi ngoài giờ quầy", arrow: true },
      { label: "AI soạn mẫu: điều chắc chắn / điều cần xác nhận", arrow: true },
      { label: "Bạn sửa cho đúng thông tin của cơ sở", arrow: true },
      { label: "Gửi ngay, sáng mai xác nhận thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhà nghỉ nhỏ ven biển có một lễ tân ca ngày và chủ nhà trực đêm bằng điện thoại. Chủ nhà thường ngủ quên tin nhắn lúc khuya, khách hỏi xong không thấy trả lời thì đặt chỗ khác. Sau khi có sẵn một câu trả lời mẫu nhận tin và hẹn giờ xác nhận, khách ít bỏ đi hơn. Đây là tình huống giả định để minh hoạ cách làm, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Vì sao câu trả lời nửa đêm nên tách điều chắc chắn khỏi điều cần xác nhận?",
        "Khách biết đâu là thông tin chắc chắn, đâu là phần còn chờ bạn",
        [
          "Để văn bản dài hơn và trông chuyên nghiệp hơn với khách nước ngoài",
          "Để khách phải hỏi lại nhiều lần và bạn có thêm thời gian kiểm tra",
          "Để AI không phải chịu trách nhiệm về những điều nó đã viết ra hộ",
        ],
        "Tách hai phần giúp khách hiểu đúng điều đã chắc và điều còn chờ. Kéo dài văn bản không phải mục đích. Cố ý làm khách hỏi lại là mất khách. Và trách nhiệm cuối cùng vẫn là của bạn, không chuyển sang AI được.",
      ),
      q(
        "AI soạn giúp câu trả lời mẫu. Điều nào bạn PHẢI tự điền hoặc kiểm?",
        "Tình trạng phòng, giá và điều kiện của đúng ngày khách hỏi",
        [
          "Lời chào mở đầu và lời cảm ơn cuối tin nhắn của cơ sở mình",
          "Cách xưng hô lịch sự bằng \"quý khách\" trong toàn bộ câu trả lời",
          "Thứ tự các câu trong tin nhắn sao cho dễ đọc trên màn hình điện thoại",
        ],
        "AI không nhìn thấy bảng phòng của bạn, nên phòng còn hay hết, giá và điều kiện là dữ kiện bạn phải đưa vào hoặc kiểm. Lời chào, xưng hô và thứ tự câu là phần chữ, đọc lướt là sửa được.",
      ),
      q(
        "Bạn nhờ AI: \"trả lời khách hỏi phòng\" mà không đưa thêm gì. Rủi ro lớn nhất là gì?",
        "AI tự bịa giá, giờ nhận phòng hoặc chính sách rồi viết rất tự tin",
        [
          "AI từ chối trả lời vì thiếu thông tin về khách sạn của bạn trong đoạn chat",
          "AI viết quá ngắn nên khách không hiểu mình đang được hỏi gì",
          "AI trả lời bằng ngôn ngữ khác ngôn ngữ khách vừa nhắn cho bạn",
        ],
        "Khi thiếu dữ kiện, AI thường không từ chối mà lấp chỗ trống bằng chi tiết nghe hợp lý, như giá hoặc giờ nhận phòng. Đó là điều nguy hiểm vì nó trông giống thông tin thật. Độ dài hay ngôn ngữ chỉnh lại dễ hơn nhiều.",
      ),
      q(
        "Câu nào trong tin nhắn nửa đêm thể hiện đúng \"điều cần xác nhận sáng mai\"?",
        "Chúng tôi sẽ báo lại tình trạng phòng ngày 12 và 13 trước 9 giờ sáng",
        [
          "Phòng đôi ngày 12 và 13 vẫn còn, mời quý khách đặt luôn ngay đêm nay",
          "Giá phòng là mức thấp nhất, quý khách sẽ không tìm được nơi rẻ hơn",
          "Chúng tôi sẽ cố gắng hết sức để phục vụ quý khách trong thời gian sớm nhất",
        ],
        "Câu đúng nêu việc cụ thể, ngày cụ thể và giờ hẹn cụ thể. Câu còn phòng là khẳng định chưa kiểm. Câu giá thấp nhất là lời hứa không chứng minh được. Câu cố gắng hết sức nghe lịch sự nhưng khách không biết bao giờ mới có trả lời.",
      ),
      q(
        "Khách nhắn tiếng Việt, AI viết mẫu trả lời. Việc cuối cùng trước khi gửi là gì?",
        "Đọc lại từng con số, ngày và lời hứa với bảng phòng thật",
        [
          "Đọc lại xem câu văn có hay và có nhiều từ đẹp hay chưa nhé",
          "Nhờ chính AI xác nhận lại rằng nội dung nó viết đều đúng",
          "Gửi luôn vì AI viết trôi chảy thì thường cũng đúng thôi",
        ],
        "Điểm đáng kiểm là số, ngày và lời hứa vì chúng gắn với cơ sở của bạn. Hỏi lại AI không phải kiểm chứng, nó có thể xác nhận luôn điều nó vừa bịa. Trôi chảy không đồng nghĩa với đúng, và hay chưa quan trọng bằng đúng.",
      ),
    ],
    keyTakeaways: [
      "Tin nhắn nửa đêm cần nhận tin và hẹn giờ trả lời thật, không cần chốt mọi thứ ngay.",
      "Tách rõ hai phần: điều chắc chắn, và điều cần xác nhận sáng mai.",
      "Đưa cho AI dữ kiện thật của cơ sở, nếu không nó sẽ tự bịa giá và giờ.",
      "Tình trạng phòng, giá, điều kiện là phần bạn tự kiểm trước khi gửi.",
      "Lưu câu trả lời mẫu tốt để dùng lại cho khách kế tiếp.",
    ],
    practicePrompt: {
      question:
        "Khách hỏi lúc 0 giờ 30: \"Còn phòng cho 2 người ngày 20 không, giá bao nhiêu?\". Bạn chưa xem bảng phòng. Câu nào nên có trong bản nháp?",
      options: [
        "Sáng mai trước 9 giờ chúng tôi sẽ báo tình trạng phòng và giá ngày 20",
        "Phòng ngày 20 còn, giá khoảng 500 nghìn, cứ đến là có ngay",
        "Chúng tôi nhận được tin và sẽ liên hệ lại khi nào có thời gian",
        "Ngày 20 thường đông khách nên chắc là đã hết, xin thông cảm và thử ngày khác",
      ],
      correct: 0,
      explanation:
        "Câu đúng có ngày, việc, giờ hẹn cụ thể và không nói điều chưa biết. Câu còn phòng kèm giá là đoán. Câu liên hệ khi có thời gian không cho khách mốc nào để chờ. Câu chắc là đã hết cũng là đoán, và có thể mất một khách đang có phòng thật.",
    },
    summary: {
      keyIdea: "Nửa đêm bạn chưa cần trả lời hết, chỉ cần khách biết tin đã tới và bao giờ có câu trả lời thật.",
      formula: "Nhận tin + điều chắc chắn + điều cần xác nhận + giờ hẹn cụ thể = câu trả lời an toàn.",
      commonMistake: "Để AI viết cho trôi rồi gửi, quên rằng nó không biết phòng nào còn hay giá nào đúng.",
      action: "Soạn một câu trả lời mẫu nửa đêm cho cơ sở của bạn và lưu vào ghi chú điện thoại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở 3 tin nhắn hỏi đặt phòng hoặc đặt chỗ gần nhất mà bạn trả lời chậm. Nhờ AI soạn một câu trả lời mẫu có hai phần: điều chắc chắn của cơ sở bạn và điều cần xác nhận sáng mai. Sửa cho đúng giờ hẹn thật, rồi lưu lại để dùng ngay tối nay.",
      secondary: "Ngày mai hãy để ý: có khách nào nhắn ngoài giờ mà bạn đã dùng được mẫu này chưa?",
    },
    sections: [
      {
        type: "lead",
        text: "Một giờ sáng điện thoại sáng lên: khách hỏi còn phòng không. Quầy đã đóng, bảng phòng chưa xem. Bài này dạy cách nhờ AI soạn sẵn câu trả lời để khách yên tâm mà bạn không hứa điều chưa chắc.",
      },
      fey(
        "Trả lời khách ngoài giờ đơn giản hơn bạn nghĩ",
        "Hình dung bạn để lại một tờ giấy nhắn trên quầy cho ca sáng. Tờ giấy tốt chia hai cột: việc đã chắc chắn, và việc cần xác nhận. AI soạn câu trả lời giúp bạn giống một người viết sẵn mẫu giấy nhắn đó.",
        "Tờ giấy nhắn cho ca sáng",
        "Câu trả lời mẫu do AI soạn",
        [
          ["Cột chắc chắn", "Ghi điều đã biết: giờ mở quầy, địa chỉ", "Ghi điều cơ sở luôn đúng, bạn đưa vào"],
          ["Cột cần xác nhận", "Ghi điều chưa biết: còn phòng không", "Ghi rõ là sẽ báo lại, kèm giờ hẹn"],
          ["Người đọc", "Đồng nghiệp ca sáng", "Khách vừa nhắn"],
          ["Người kiểm", "Bạn đọc lại trước khi để lại", "Bạn đọc lại trước khi gửi"],
        ],
        "Câu trả lời nửa đêm là tờ giấy nhắn hai cột: điều chắc chắn ở trên, điều chờ xác nhận ở dưới.",
      ),
      { type: "heading", text: "Khoảnh khắc: tin nhắn tới khi quầy đã đóng" },
      {
        type: "paragraph",
        text: "Khách đi du lịch thường hỏi nhiều nơi cùng lúc, và người trả lời trước, rõ ràng thường được để ý. Nhưng trả lời nhanh mà sai thì tệ hơn trả lời chậm: khách đến nơi mới biết hết phòng. Vậy nên mục tiêu ban đêm không phải chốt phòng mà là làm khách thấy đã được nhận tin.",
      },
      {
        type: "flow",
        title: "Từ tin nhắn nửa đêm tới câu trả lời thật",
        steps: [
          { label: "Khách nhắn hỏi", detail: "Tin tới lúc quầy đã đóng. Bạn chưa xem được bảng phòng, nên chưa biết còn hay hết." },
          { label: "Đưa dữ kiện cho AI", detail: "Bạn nói cho AI biết cơ sở là gì, khách hỏi ngày nào và bạn chắc điều gì. Điều bạn chưa biết thì nói rõ là chưa biết." },
          { label: "AI soạn mẫu hai phần", detail: "AI viết một câu nhận tin, điều chắc chắn và điều sẽ xác nhận. Nó không thấy bảng phòng, nên không được để nó tự điền còn hay hết." },
          { label: "Bạn sửa và gửi", detail: "Bạn đọc lại từng ngày và giờ hẹn, sửa cho đúng giọng cơ sở, rồi gửi để khách yên tâm chờ." },
          { label: "Sáng mai xác nhận thật", detail: "Bạn mở bảng phòng, trả lời đúng hẹn. Câu trả lời thật luôn đến từ bảng phòng, không đến từ AI." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu trả lời an toàn",
          text: "Cảm ơn quý khách đã nhắn. Cơ sở nhận phòng từ 14 giờ. Về phòng đôi ngày 20, sáng mai trước 9 giờ chúng tôi sẽ báo lại tình trạng phòng và giá.",
        },
        right: {
          label: "Câu trả lời vội vàng",
          text: "Còn phòng ạ, giá 500 nghìn có bữa sáng, quý khách cứ đến là có ngay. Chúng tôi luôn giữ chỗ cho khách nhắn sớm.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn câu trả lời nửa đêm",
        task: "Khách nhắn lúc 0 giờ 30 hỏi phòng đôi ngày 20, giá bao nhiêu. Quầy đóng, bạn chưa xem bảng phòng. Lắp một prompt để AI soạn câu trả lời mẫu.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Trả lời khách hỏi phòng giúp tôi.", feedback: "AI không biết cơ sở là loại gì, ở đâu, khách hỏi ngày nào - nó sẽ tự bịa giờ nhận phòng và giá." },
              { text: "Tôi quản lý nhà nghỉ nhỏ. Khách hỏi phòng đôi ngày 20 lúc quầy đã đóng; tôi chưa biết còn phòng hay không, nhận phòng từ 14 giờ.", good: true, feedback: "Đủ loại cơ sở, ngày khách hỏi, điều chưa biết và điều đã chắc - AI viết quanh đúng dữ kiện đó." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Viết câu trả lời nhận tin, nêu giờ nhận phòng, hẹn báo tình trạng phòng và giá trước 9 giờ sáng, không khẳng định còn hay hết phòng.", good: true, feedback: "Nói rõ điều được nêu, điều phải hẹn và điều cấm khẳng định - bản nháp không nợ khách lời hứa nào." },
              { text: "Viết câu để khách chắc chắn đặt phòng của mình.", feedback: "Mục tiêu là chốt khách - AI sẽ dễ hứa còn phòng và giữ chỗ, những điều bạn chưa kiểm." },
            ],
          },
          {
            id: "format",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết cho thật đẹp và chuyên nghiệp.", feedback: "\"Đẹp\" không đo được - AI viết dài dòng, nhiều từ hoa mỹ và có khi thêm ưu đãi." },
              { text: "Ngắn dưới 60 chữ, xưng \"chúng tôi\" và \"quý khách\", chia hai ý: đã chắc, sẽ báo lại.", good: true, feedback: "Độ dài, xưng hô, cấu trúc rõ - bản nháp dùng gần như ngay, chỉ cần chỉnh giờ hẹn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Cảm ơn quý khách đã nhắn cho chúng tôi. Cơ sở nhận phòng từ 14 giờ. Về phòng đôi ngày 20, chúng tôi sẽ kiểm tra và báo lại tình trạng phòng cùng giá trước 9 giờ sáng mai.",
          },
          {
            requires: ["context"],
            text: "Cảm ơn quý khách đã nhắn. Chúng tôi rất vinh dự được phục vụ quý khách và sẽ cố gắng hết sức trong thời gian sớm nhất...\n\n(Có đúng dữ kiện nhưng không có giờ hẹn cụ thể và không tách điều chắc chắn với điều cần xác nhận.)",
          },
          {
            text: "Dạ phòng đôi ngày 20 còn ạ, giá 500 nghìn có bữa sáng và đưa đón sân bay miễn phí. Quý khách cứ đến là có ngay.\n\n(AI không biết gì về cơ sở nên tự bịa giá, bữa sáng và đưa đón - những điều bạn chưa hề hứa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Người gửi là bạn",
        text: "AI không nhìn thấy bảng phòng, giá hay chính sách hoàn huỷ của bạn. Mọi con số, ngày và lời hứa trong bản nháp đều phải đối chiếu với nguồn thật trước khi gửi. Nếu khách sau này chỉ vào tin nhắn đó, người chịu trách nhiệm là cơ sở của bạn.",
      },
      {
        type: "scenario",
        title: "Tin nhắn 1 giờ sáng: gửi mẫu hay đoán",
        start: "s1",
        nodes: {
          s1: {
            text: "1 giờ sáng, khách nhắn: \"Tối mai còn phòng đôi không? Giá sao ạ?\". Bạn nhờ AI soạn giúp, bản nháp có câu: \"Phòng còn, giá 500 nghìn có bữa sáng.\"",
            choices: [
              { label: "Gửi luôn cho nhanh, khách chờ là mất khách", next: "bad_promise" },
              { label: "Sửa bản nháp: bỏ phần còn phòng và giá, thêm hẹn báo lại trước 9 giờ sáng", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Khách đặt xe theo tin nhắn. Sáng ra bảng phòng cho thấy phòng đôi ngày đó đã có người giữ, giá thật cũng khác. Bạn phải gọi khách xin lỗi và họ huỷ chuyến.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gửi bản đã sửa. Sáng hôm sau bạn mở bảng phòng: còn một phòng đôi, giá cao hơn bản nháp đã ghi.",
            choices: [
              { label: "Trả lời đúng giờ hẹn với tình trạng phòng và giá thật, kèm cách giữ chỗ", next: "good" },
              { label: "Nhắn giá thấp như trong bản nháp cho khách đỡ ngại", next: "bad_price" },
            ],
          },
          bad_price: {
            text: "Khách đến nơi thì quầy thu giá thật. Khách bực vì \"nhắn một giá, trả một giá\" và để lại đánh giá không tốt.",
            ending: "bad",
          },
          good: {
            text: "8 giờ 40, khách nhận tin đúng hẹn: còn phòng, giá rõ, cách giữ chỗ rõ. Khách giữ chỗ luôn và nhắn cảm ơn vì được phản hồi đúng như đã nói.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ban đêm chỉ cần nhận tin và hẹn giờ; câu trả lời thật đến từ bảng phòng.",
          "Bài sau: tập soát một câu trả lời AI viết hứa quá tay.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2101
  {
    id: 2101,
    slug: "soat-cau-tra-loi-hua-qua-tay",
    title: "Chặng 35, Bài 2: Câu trả lời khách này hứa điều quầy chưa chắc làm được",
    subtitle: "Như soát một bản hợp đồng: gạch chân mọi chỗ có chữ \"được\", \"miễn phí\", \"chắc chắn\".",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI viết câu trả lời khách rất niềm nở, và chính sự niềm nở đó hay kéo theo lời hứa: nhận phòng sớm, đón sân bay miễn phí, nâng hạng. Khách giữ tin nhắn làm bằng chứng. Biết gạch ra những lời hứa cần hỏi lại trước khi gửi giúp bạn không phải đền bù cho điều mình chưa hề định cho.",
    openingQuestion:
      "AI viết cho khách: \"Chúng tôi sẽ nhận phòng sớm lúc 9 giờ và đón sân bay miễn phí.\" Cơ sở bạn chưa quyết hai điều này. Bạn làm gì?",
    openingOptions: [
      "Bỏ hoặc đổi thành \"sẽ xác nhận với quý khách\" cho tới khi hỏi được quản lý",
      "Giữ nguyên vì lời hứa tử tế luôn làm khách vui và dễ đặt phòng",
      "Giữ nguyên rồi nhờ AI nhắc lại lời hứa trong tin nhắn kế tiếp",
      "Xoá cả câu trả lời và viết lại từ đầu mà không dùng AI nữa",
    ],
    correctOption: 0,
    explanation:
      "Lời hứa trong tin nhắn là cam kết của cơ sở, và khách có thể chụp màn hình làm bằng chứng. Chưa quyết thì chỉ nói sẽ xác nhận, rồi hỏi quản lý. Giữ nguyên hoặc nhắc lại lời hứa là làm nặng thêm điều chưa được duyệt. Xoá hết và bỏ AI cũng không cần: AI vẫn viết phần chữ rất tốt, bạn chỉ cần soát các lời hứa.",
    diagram: [
      { label: "AI viết câu trả lời niềm nở", arrow: true },
      { label: "Bạn tìm mọi lời hứa: giờ, giá, quà, ưu tiên", arrow: true },
      { label: "Lời hứa chưa được duyệt đổi thành \"sẽ xác nhận\"", arrow: true },
      { label: "Hỏi quản lý rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một khách sạn nhỏ dùng AI soạn câu trả lời cho khách đặt qua tin nhắn. Bản nháp viết \"nhận phòng sớm, đưa đón miễn phí\" vì nghe rất mến khách. Nhân viên gửi luôn, và khách đến lúc 9 giờ sáng chờ được phòng. Quầy không có chính sách đó nên phải đền bù bằng một bữa ăn. Đây là tình huống giả định để minh hoạ, không phải sự việc có thật.",
    },
    quiz: [
      q(
        "Vì sao AI hay viết những lời hứa mà cơ sở của bạn chưa hề đưa ra?",
        "Nó nối tiếp câu niềm nở theo cách nghe hợp lý, không biết chính sách thật",
        [
          "Nó đọc được chính sách nội bộ của cơ sở rồi viết lại đúng theo quy định đang áp dụng",
          "Nó được lập trình để luôn hứa nhiều hơn khả năng thật của khách sạn",
          "Nó chỉ chép lời hứa từ các đối thủ đang có mặt trên mạng internet",
        ],
        "AI dự đoán chữ nghe hợp lý sau một tin nhắn mến khách, và lời hứa nhận phòng sớm hay đón sân bay là loại chữ hay đi cùng nhau. Nó không đọc được chính sách nội bộ của bạn nếu bạn không đưa vào. Nó cũng không cố ý hứa quá tay hay chép từ đối thủ.",
      ),
      q(
        "Trong một tin nhắn AI viết, cụm nào cần soát kỹ nhất?",
        "\"Miễn phí\", \"chắc chắn\", giờ cụ thể và cam kết ưu tiên",
        [
          "Lời chào ở đầu tin nhắn và tên khách được nhắc lại trong thư",
          "Các dấu chấm câu và cách xuống dòng trong đoạn văn của tin nhắn",
          "Câu cảm ơn cuối thư và chữ ký của cơ sở trong tin nhắn",
        ],
        "Lời hứa thường nằm ở những chữ như miễn phí, chắc chắn, một giờ cụ thể, ưu tiên: đó là chỗ phát sinh chi phí và tranh cãi. Lời chào, chấm câu, chữ ký là phần chữ vô hại, sai cũng chỉ mất vài giây sửa.",
      ),
      q(
        "AI viết \"nhận phòng sớm 9 giờ\", bạn chưa biết phòng có sẵn không. Cách sửa tốt nhất là gì?",
        "Đổi thành: nhận phòng từ 14 giờ; nếu phòng sẵn sàng sớm, chúng tôi báo ngay",
        [
          "Xoá luôn chuyện nhận phòng khỏi tin nhắn để khách khỏi hỏi lại",
          "Giữ 9 giờ, vì khách đến sớm thì có thể để hành lý đợi phòng",
          "Đổi thành 10 giờ cho đỡ hứa quá tay so với giờ AI viết",
        ],
        "Cách sửa giữ giờ chuẩn của cơ sở và mở khả năng sớm hơn mà không hứa. Xoá luôn thì khách sẽ hỏi lại đúng câu đó. Giữ 9 giờ vẫn là hứa. Đổi thành 10 giờ chỉ là hứa một giờ khác, vẫn chưa được duyệt.",
      ),
      q(
        "Tin nhắn có \"đón sân bay miễn phí\". Việc đầu tiên bạn nên làm là gì?",
        "Hỏi quản lý xem cơ sở có dịch vụ đó và với điều kiện nào",
        [
          "Tự tra mạng xem khách sạn khác có đón miễn phí không",
          "Hỏi lại AI xem câu đó có đúng với cơ sở của bạn hay không",
          "Giữ lại và chờ khách thắc mắc rồi mới hỏi người quyết định",
        ],
        "Người quyết định dịch vụ của cơ sở là quản lý hoặc chủ, không phải AI hay khách sạn khác. Hỏi AI thì nó chỉ nghe hợp lý trở lại. Chờ khách thắc mắc là đã muộn, vì lời hứa nằm trong tin nhắn từ lúc gửi đi.",
      ),
      q(
        "Bạn soát xong và sửa bản nháp. Bước tốt nhất trước khi gửi là gì?",
        "Đọc lại toàn tin nhắn một lần nữa, tìm thêm mọi lời hứa còn sót",
        [
          "Gửi luôn vì đã sửa hai chỗ lớn nhất trong bản nháp rồi",
          "Nhờ AI viết thêm một đoạn nói rõ cơ sở luôn hài lòng khách",
          "Xoá bớt lời chào để khách tập trung vào phần thông tin",
        ],
        "Lời hứa hay đi thành cụm, sửa được hai chỗ chưa có nghĩa hết. Đọc lại lần nữa để bắt chỗ sót là bước rẻ nhất. Thêm đoạn nói luôn hài lòng lại là thêm một lời hứa mới, và bỏ lời chào làm tin nhắn cộc lốc, không giải quyết gì.",
      ),
    ],
    keyTakeaways: [
      "AI viết niềm nở nên hay kèm lời hứa mà cơ sở chưa quyết.",
      "Tìm các chữ như miễn phí, chắc chắn, giờ cụ thể, ưu tiên, nâng hạng.",
      "Lời hứa chưa được duyệt đổi thành \"sẽ xác nhận\", rồi hỏi người quyết định.",
      "Hỏi lại chính AI không phải cách kiểm chứng chính sách của bạn.",
      "Đọc lại toàn tin một lần nữa trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Bản nháp AI viết có 4 ý: nhận phòng lúc 9 giờ, đón sân bay miễn phí, phòng nhìn ra biển, bữa sáng từ 6 giờ 30. Bạn biết chắc bữa sáng và phòng nhìn biển. Nên hỏi lại trước những ý nào?",
      options: [
        "Nhận phòng lúc 9 giờ và đón sân bay miễn phí",
        "Phòng nhìn ra biển và bữa sáng từ 6 giờ 30, hai ý đã chắc",
        "Cả bốn ý, vì AI viết nên không ý nào đáng tin hoàn toàn",
        "Không cần hỏi ý nào vì cả bốn nghe đều rất hợp lý",
      ],
      correct: 0,
      explanation:
        "Chỉ cần hỏi lại phần bạn chưa chắc và phần gắn với chi phí hay giờ giấc: nhận sớm và đón sân bay. Hai ý bạn đã chắc thì giữ, kiểm lại cho khớp thực tế là đủ. Hỏi cả bốn là mất thời gian không cần thiết. Nghe hợp lý thì không phải bằng chứng.",
    },
    summary: {
      keyIdea: "AI viết niềm nở nên dễ hứa hộ bạn: việc của bạn là tìm và gạch những lời hứa chưa được duyệt.",
      formula: "Đọc bản nháp → gạch giờ, giá, quà, ưu tiên → hỏi người quyết định → đổi thành \"sẽ xác nhận\" nếu chưa có câu trả lời.",
      commonMistake: "Chỉ soát lỗi chính tả và giọng văn, bỏ qua các lời hứa nằm giữa câu.",
      action: "Lấy 2 câu trả lời AI đã viết cho khách và gạch mọi lời hứa trong đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI viết một câu trả lời khách hỏi về nhận phòng sớm và đưa đón. Chép bản nháp ra, dùng bút gạch mọi cụm có giờ, miễn phí, chắc chắn, ưu tiên. Với mỗi cụm, ghi bên cạnh: đã có chính sách chưa, hỏi ai. Rồi viết lại thành bản có thể gửi.",
      secondary: "Hỏi quản lý một lần và ghi lại câu trả lời để lần sau khỏi hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI trả lời khách hỏi về nhận phòng sớm. Bản nháp ra rất dễ thương, và có hai lời hứa bạn chưa hề định cho. Bài này tập soát bản nháp như soát một bản hợp đồng.",
      },
      fey(
        "Soát lời hứa đơn giản hơn bạn nghĩ",
        "Hình dung bạn đọc một hợp đồng thuê nhà trước khi ký. Bạn không đọc để khen văn hay, bạn gạch chân chỗ có tiền, ngày, điều kiện và chữ \"cam kết\". Soát bản nháp AI viết cũng làm đúng như vậy.",
        "Đọc hợp đồng trước khi ký",
        "Soát câu trả lời AI viết",
        [
          ["Chỗ gạch chân", "Tiền, ngày, điều kiện, chữ cam kết", "Miễn phí, giờ cụ thể, chắc chắn, ưu tiên"],
          ["Hỏi ai", "Người có quyền quyết định của bên cho thuê", "Quản lý hoặc chủ của cơ sở"],
          ["Chưa rõ thì", "Không ký, hỏi lại", "Đổi thành \"sẽ xác nhận\", chưa hứa"],
          ["Bằng chứng", "Chữ ký trên giấy", "Tin nhắn khách có thể chụp lại"],
        ],
        "Tin nhắn gửi khách là một bản cam kết mềm: gạch chân mọi chỗ có giờ, tiền, quà trước khi ký gửi.",
      ),
      { type: "heading", text: "Khoảnh khắc: bản nháp đẹp quá" },
      {
        type: "paragraph",
        text: "Bạn đọc bản nháp và thấy nó rất mến khách. Chính vì thế bạn hay đọc lướt. Lời hứa nguy hiểm nhất là lời hứa nằm giữa câu, nghe rất tự nhiên, như \"đón bạn tại sân bay\" hay \"phòng sẽ sẵn sàng khi bạn tới\".",
      },
      {
        type: "flow",
        title: "Soát một bản nháp trước khi gửi",
        steps: [
          { label: "Đọc một lượt", detail: "Đọc cả bản nháp không dừng, để hiểu tin nhắn nói gì. Chưa sửa gì ở bước này." },
          { label: "Gạch mọi lời hứa", detail: "Đọc lần hai, dùng bút gạch mọi cụm có giờ, tiền, quà, ưu tiên hoặc chữ chắc chắn. Mỗi cụm là một cam kết tiềm năng." },
          { label: "Hỏi từng lời hứa", detail: "Với mỗi cụm, tự hỏi: cơ sở đã có chính sách này chưa? Nếu chưa chắc, hỏi quản lý chứ không hỏi AI." },
          { label: "Sửa hoặc bỏ", detail: "Lời hứa đã có chính sách thì giữ đúng chữ. Chưa có thì đổi thành \"sẽ xác nhận với quý khách\" hoặc bỏ." },
          { label: "Đọc lại lần cuối", detail: "Đọc lại toàn tin để bắt chỗ sót, rồi mới gửi." },
        ],
      },
      {
        type: "list",
        items: [
          "Giờ giấc: nhận phòng sớm, trả phòng muộn, giờ ăn sáng.",
          "Tiền: miễn phí, giảm giá, giá đã gồm gì.",
          "Dịch vụ: đón sân bay, giữ hành lý, nâng hạng phòng.",
          "Chắc chắn: \"đảm bảo\", \"chắc chắn có\", \"luôn luôn\".",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát câu trả lời AI viết cho khách",
        task: "Khách hỏi giờ nhận phòng và đưa đón. Bạn biết chắc: nhận phòng từ 14 giờ, bữa sáng 6 giờ 30 đến 9 giờ. Đón sân bay và nhận phòng sớm chưa có chính sách. Đánh dấu những đoạn hứa quá tay.",
        segments: [
          { text: "Cảm ơn quý khách đã đặt phòng tại chỗ chúng tôi." },
          { text: "Phòng được nhận từ 14 giờ ngày đến." },
          { text: "Riêng quý khách, chúng tôi sẽ nhận phòng sớm lúc 9 giờ sáng.", error: "Cơ sở chưa có chính sách nhận sớm. AI tự thêm giờ 9 giờ nghe hợp lý; đến lúc khách tới, phòng chưa chắc trống." },
          { text: "Chúng tôi đón quý khách tại sân bay miễn phí bằng xe riêng.", error: "Chưa có dịch vụ đón sân bay. AI tự bịa lời hứa kèm chữ \"miễn phí\" và \"xe riêng\"." },
          { text: "Bữa sáng phục vụ từ 6 giờ 30 đến 9 giờ." },
          { text: "Phòng chắc chắn sẽ được nâng lên hạng cao hơn khi quý khách tới.", error: "Chưa ai hứa nâng hạng. \"Chắc chắn\" biến một ý tưởng thành cam kết mà quầy sẽ phải thực hiện." },
        ],
      },
      {
        type: "callout",
        label: "Tin nhắn là bằng chứng",
        text: "Khách có thể chụp màn hình tin nhắn và đưa cho quầy khi tới. Nếu có câu \"nhận phòng sớm 9 giờ\" thì đó là lời cơ sở đã nói. Khách không cần biết câu đó do AI viết hay do bạn viết.",
      },
      {
        type: "scenario",
        title: "Khách hỏi về đón sân bay, bạn chưa chắc",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách nhắn: \"Bên bạn có đón sân bay miễn phí không? Chuyến bay tôi tới lúc 22 giờ.\" Bạn chưa biết chính sách, quản lý đã tan ca.",
            choices: [
              { label: "Nhờ AI trả lời \"có đón miễn phí\" cho khách yên tâm", next: "bad_free" },
              { label: "Trả lời: chúng tôi sẽ xác nhận dịch vụ đón sân bay với quý khách vào sáng mai", next: "s2" },
            ],
          },
          bad_free: {
            text: "Khách đặt chuyến bay tới muộn vì tin có xe đón. 22 giờ không có ai ở sân bay. Khách phải tự bắt xe và yêu cầu bạn hoàn phí xe.",
            ending: "bad",
          },
          s2: {
            text: "Sáng mai bạn hỏi quản lý: cơ sở có xe đón nhưng thu phí 150 nghìn và cần đặt trước 24 giờ.",
            choices: [
              { label: "Báo khách đúng như vậy: có dịch vụ, có phí, cần đặt trước", next: "good" },
              { label: "Báo \"miễn phí\" vì bản nháp AI đã viết như thế", next: "bad_repeat" },
            ],
          },
          bad_repeat: {
            text: "Khách tới sân bay, tài xế thu 150 nghìn. Khách chìa ra tin nhắn ghi \"miễn phí\". Quầy phải tự trả phí xe.",
            ending: "bad",
          },
          good: {
            text: "Khách đặt xe với đúng giá đã biết và nhắn cảm ơn vì được nói rõ. Tới sân bay lúc 22 giờ, tài xế đã đứng đó.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Gạch chân mọi lời hứa: giờ, tiền, quà, chắc chắn.",
          "Bài sau: khi khách đã đứng ở quầy, bạn nói gì để họ thấy được đón tiếp.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2102
  {
    id: 2102,
    slug: "khach-den-som-phong-chua-don-xong",
    title: "Chặng 35, Bài 3: Khách đến sớm hơn giờ nhận phòng trong khi phòng chưa sẵn sàng",
    subtitle: "Như một người phục vụ ở nhà hàng đầy chỗ: không nói \"hết bàn\" mà nói \"mời ngồi quầy, mười phút nữa có bàn\".",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧳",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách đến sớm thường mệt sau chuyến đi, có khi kèm trẻ nhỏ và hành lý. Câu bạn nói trong 30 giây đầu quyết định họ thấy mình được chào đón hay bị đuổi khéo. AI có thể giúp bạn có sẵn vài cách nói và đề xuất, nhưng người đứng ở quầy phải chọn đúng cách cho từng gia đình.",
    openingQuestion:
      "Một gia đình đến lúc 10 giờ, giờ nhận phòng là 14 giờ, phòng còn đang dọn. Câu nào nên nói trước tiên?",
    openingOptions: [
      "Chào mừng anh chị. Phòng đang dọn, tôi giữ hành lý giúp và báo ngay khi xong",
      "Giờ nhận phòng là 14 giờ, anh chị vui lòng quay lại đúng giờ đó",
      "Chúng tôi không nhận khách sớm, đây là quy định của khách sạn",
      "Anh chị chờ ở ngoài sảnh nhé, khi nào xong tôi sẽ gọi tên",
    ],
    correctOption: 0,
    explanation:
      "Câu đầu tiên nên chào đón, cho biết chuyện gì đang xảy ra và đưa ra một việc cụ thể bạn làm giúp ngay. Nhắc giờ quy định hoặc nói không nhận đẩy khách đi ngay khi họ vừa tới. Bảo chờ ngoài sảnh không cho khách biết bao lâu và cho họ làm gì trong lúc chờ. Quy định vẫn đúng, chỉ là nói kèm việc giúp thì khách nghe khác hẳn.",
    diagram: [
      { label: "Khách tới sớm, phòng chưa xong", arrow: true },
      { label: "Chào đón + nói rõ tình hình", arrow: true },
      { label: "Đề xuất việc giúp ngay: giữ hành lý, chỗ chờ", arrow: true },
      { label: "Báo lại ngay khi phòng sẵn sàng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một khách sạn ba sao thường có khách bay đêm tới lúc sáng sớm. Phòng phần lớn còn khách cũ đến 12 giờ trưa. Lễ tân chuẩn bị sẵn một mẩu nói chào mừng, giữ hành lý, mời ăn sáng tại nhà hàng và báo giờ dự kiến. Khách ít phàn nàn hơn dù giờ nhận phòng vẫn là 14 giờ. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Khách đến sớm và phòng chưa xong. Điều gì làm khách bớt khó chịu nhất?",
        "Nghe một việc cụ thể bạn làm giúp ngay, kèm giờ dự kiến",
        [
          "Nghe nhắc rõ quy định nhận phòng 14 giờ bằng giọng thật lịch sự",
          "Nghe lời xin lỗi thật dài rồi tự tìm chỗ chờ ở sảnh ngoài",
          "Nghe bạn nói sẽ cố gắng hết sức để phòng xong thật nhanh nhé",
        ],
        "Khách bớt khó chịu khi thấy có người lo cho mình: giữ hành lý, mời chỗ chờ, nói giờ dự kiến. Nhắc quy định là đúng nhưng chưa giúp gì. Xin lỗi dài rồi để khách tự lo vẫn không giải quyết. \"Cố gắng hết sức\" thì không có giờ nào cả.",
      ),
      q(
        "AI đề xuất cho khách chờ: \"mời ăn sáng miễn phí\". Bạn nên làm gì trước khi nói?",
        "Kiểm xem cơ sở có cho phép và ai duyệt",
        [
          "Nói luôn vì mời ăn sáng là cách phổ biến ở mọi khách sạn",
          "Bỏ ý đó vì AI không bao giờ hiểu được chính sách khách sạn",
          "Chỉ nói với khách quen còn khách mới thì bỏ qua ý đó",
        ],
        "Mời ăn miễn phí là chi phí của cơ sở, cần biết có được phép và ai duyệt. Phổ biến ở nơi khác không có nghĩa là được ở đây. Ý của AI không đáng bỏ ngay, chỉ đáng kiểm. Và phân biệt khách quen hay mới là tự đặt ra quy tắc chưa ai duyệt.",
      ),
      q(
        "Bạn nói \"phòng xong trong 30 phút\" nhưng chưa hỏi buồng phòng. Rủi ro là gì?",
        "Quá 30 phút chưa xong thì khách nhớ lời hứa và thấy bị lừa",
        [
          "Khách sẽ không tin bạn ngay từ những câu đầu tiên ở quầy",
          "Buồng phòng sẽ dọn nhanh hơn nên phòng xong sớm hơn dự kiến",
          "Không có rủi ro vì khách thường không nhớ chính xác từng con số",
        ],
        "Giờ dự kiến là lời hứa nhỏ. Quá giờ đó, khách nhớ và tin nhắn hay câu nói trở thành điều khách trích lại. Nói được thì phải hỏi buồng phòng trước. Khách thường nhớ số cụ thể rất kỹ, nhất là khi đang đứng chờ.",
      ),
      q(
        "Bạn nhờ AI soạn vài cách nói với khách đến sớm. Cách dùng nào đúng?",
        "Chọn một cách, sửa cho hợp cơ sở, kiểm mọi điều hứa rồi mới dùng",
        [
          "Đọc nguyên văn bản AI viết vì nó đã cân nhắc đủ mọi khía cạnh nên khỏi sửa",
          "Không dùng vì lời nói ở quầy phải tự nhiên, AI không viết nổi",
          "Dùng cả ba cách liên tiếp để khách chọn cách họ ưa thích nhất",
        ],
        "AI cho bạn nhiều phương án nhanh, nhưng chỉ bạn biết giờ dọn phòng thật và chính sách thật. Đọc nguyên văn sẽ nghe cứng và có thể hứa sai. Bỏ hẳn AI thì phí. Nói liên tiếp ba cách khiến khách rối, không phải hài lòng.",
      ),
      q(
        "Gia đình có trẻ nhỏ đứng chờ ở quầy. Đề xuất nào hợp nhất?",
        "Mời họ ngồi khu chờ và báo giờ dự kiến, đồ ăn nhẹ nếu cơ sở có",
        [
          "Nhắc họ sảnh khách sạn không phải chỗ để cả gia đình nghỉ lại lâu",
          "Đề nghị họ đi tham quan quanh đó rồi quay lại lúc 14 giờ",
          "Cho họ nhận phòng khác đang trống dù là hạng phòng cao hơn nhiều",
        ],
        "Với gia đình có trẻ nhỏ, một chỗ ngồi thoải mái và giờ dự kiến rõ là điều họ cần nhất lúc này. Nhắc sảnh không phải chỗ nghỉ là đuổi khéo. Bảo đi tham quan lúc mệt là bỏ mặc. Cho phòng hạng cao hơn là quyết định chi phí chưa ai duyệt.",
      ),
    ],
    keyTakeaways: [
      "Câu đầu tiên chào đón, nói rõ tình hình, rồi đưa một việc cụ thể bạn làm giúp.",
      "Giữ hành lý, chỗ chờ, báo giờ dự kiến là những việc nhỏ nhưng khách nhớ.",
      "Chỉ nói giờ dự kiến sau khi hỏi buồng phòng.",
      "Ưu đãi có chi phí (ăn sáng, nâng hạng) phải kiểm trước khi đề xuất.",
      "AI cho vài cách nói; bạn chọn cho đúng gia đình đang đứng trước mặt.",
    ],
    practicePrompt: {
      question:
        "Khách tới lúc 10 giờ, buồng phòng báo phòng xong khoảng 12 giờ 30. Câu nào nên nói?",
      options: [
        "Phòng dự kiến xong khoảng 12 rưỡi, trong lúc chờ tôi giữ hành lý cho anh chị",
        "Phòng sẽ xong ngay thôi ạ, anh chị chờ một chút là được",
        "Giờ nhận phòng là 14 giờ, anh chị quay lại lúc đó giúp tôi",
        "Không có phòng sớm, anh chị gửi hành lý rồi đi chơi nhé",
      ],
      correct: 0,
      explanation:
        "Câu đúng nói giờ dự kiến từ buồng phòng thật và kèm việc giúp ngay. \"Ngay thôi\" và \"một chút\" không có mốc nào. Câu nhắc 14 giờ đúng quy định nhưng nghe như đuổi. Câu không có phòng sớm nói sai sự thật vì phòng sắp xong lúc 12 rưỡi.",
    },
    summary: {
      keyIdea: "Khách đến sớm cần thấy được đón tiếp: nói tình hình, làm một việc giúp ngay và cho một mốc giờ thật.",
      formula: "Chào + tình hình + việc giúp ngay + giờ dự kiến (đã hỏi buồng phòng) = khách chờ được.",
      commonMistake: "Nhắc quy định 14 giờ ngay câu đầu, hoặc hứa \"xong ngay\" khi chưa hỏi buồng phòng.",
      action: "Viết ba câu mở lời cho khách đến sớm và chọn một câu hợp giọng cơ sở của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI viết 3 cách nói với khách đến sớm cho cơ sở của bạn (một gia đình, một khách công tác, một khách nước ngoài). Kiểm từng việc giúp mà nó đề xuất: cơ sở có làm được không, ai duyệt. Giữ lại một cách nói cho mỗi loại khách và ghi vào tờ giấy ở quầy.",
      secondary: "Hỏi buồng phòng một câu: thường mất bao lâu để dọn xong một phòng?",
    },
    sections: [
      {
        type: "lead",
        text: "10 giờ sáng, một gia đình đứng ở quầy với hai vali và một em bé đang ngủ. Giờ nhận phòng là 14 giờ, phòng đang dọn. Bài này tập chọn cách nói và cách đề xuất để họ vẫn thấy được đón tiếp.",
      },
      fey(
        "Đón khách đến sớm đơn giản hơn bạn nghĩ",
        "Hình dung một nhà hàng đông khách, có người bước vào khi bàn chưa dọn xong. Người phục vụ giỏi không nói \"hết bàn\", họ nói \"mời anh chị ngồi quầy, khoảng mười phút nữa có bàn\". Đón khách đến sớm cũng vậy.",
        "Người phục vụ nhà hàng đầy chỗ",
        "Lễ tân đón khách đến sớm",
        [
          ["Câu đầu tiên", "Mời ngồi, chào đón", "Chào mừng, nói rõ phòng đang dọn"],
          ["Việc giúp ngay", "Ghế chờ ở quầy, ly nước", "Giữ hành lý, chỗ chờ, đồ uống nếu có"],
          ["Mốc thời gian", "\"Khoảng mười phút\", đã hỏi bếp", "Giờ dự kiến, đã hỏi buồng phòng"],
          ["Điều không nói", "Không hứa bàn cụ thể chưa chắc có", "Không hứa phòng cụ thể hay nâng hạng"],
        ],
        "Khách đến sớm cần ba thứ: được chào đón, được cho việc giúp ngay, và một mốc giờ thật.",
      ),
      { type: "heading", text: "Khoảnh khắc: 30 giây đầu ở quầy" },
      {
        type: "paragraph",
        text: "Khách đã đi xa, đang mệt và chưa biết cơ sở của bạn thế nào. Ba mươi giây đầu quyết định họ nhớ điều gì. Nhắc quy định là đúng, nhưng nếu đó là câu đầu tiên, họ nhớ cảm giác bị từ chối.",
      },
      {
        type: "flow",
        title: "Ba mươi giây đón khách đến sớm",
        steps: [
          { label: "Chào và nói tình hình", detail: "Chào khách bằng tên nếu biết, nói phòng đang được dọn. Nói thật, ngắn, không lý do dài dòng." },
          { label: "Hỏi buồng phòng", detail: "Hỏi một câu: phòng này khoảng mấy giờ xong. Con số này là thứ khách sẽ trích lại, nên chỉ nói khi đã có nguồn." },
          { label: "Đề xuất việc giúp", detail: "Giữ hành lý, mời chỗ chờ, chỉ chỗ ăn sáng gần đó. Ưu đãi có chi phí thì hỏi người duyệt trước." },
          { label: "Báo lại khi xong", detail: "Xin số điện thoại hoặc nhớ tên khách, báo ngay khi phòng sẵn sàng. Đó là lời hứa duy nhất bạn chắc giữ được." },
        ],
      },
      {
        type: "scenario",
        title: "Gia đình đứng ở quầy lúc 10 giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Một gia đình bốn người tới lúc 10 giờ, có em bé đang ngủ trên vai mẹ. Phòng đặt của họ đang được dọn, chưa biết bao giờ xong. Bạn vừa nhờ AI vài cách nói.",
            choices: [
              { label: "Nói: giờ nhận phòng là 14 giờ, xin anh chị quay lại đúng giờ", next: "bad_rule" },
              { label: "Chào, nói phòng đang dọn, mời ngồi khu chờ rồi gọi hỏi buồng phòng", next: "s2" },
            ],
          },
          bad_rule: {
            text: "Người mẹ nhìn đứa bé rồi nhìn bạn. Họ để hành lý rồi đi ra ngoài trong nắng. Sau này họ ghi đánh giá: \"lễ tân lạnh lùng\".",
            ending: "bad",
          },
          s2: {
            text: "Buồng phòng báo: phòng xong khoảng 12 giờ 30. Bạn nhớ AI có đề xuất mời cả nhà ăn sáng miễn phí, nhưng chưa biết cơ sở có cho phép không.",
            choices: [
              { label: "Nói luôn với khách: mời cả nhà ăn sáng miễn phí trong lúc chờ", next: "bad_free" },
              { label: "Báo giờ dự kiến 12 rưỡi, giữ hành lý, rồi hỏi quản lý về ăn sáng cho khách chờ lâu", next: "good" },
            ],
          },
          bad_free: {
            text: "Nhà hàng không có lệnh miễn phí cho khách chờ. Nhân viên bếp từ chối tính cho khách và quản lý phải giải quyết trước mặt họ. Cả gia đình thấy ngượng.",
            ending: "bad",
          },
          good: {
            text: "Gia đình ngồi khu chờ, hành lý đã có nhãn. Quản lý đồng ý một phần ăn nhẹ cho trẻ nhỏ. 12 giờ 25 bạn báo phòng xong, họ cảm ơn và nói sẽ quay lại lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Cách nói khách nhớ lâu",
          text: "Chào mừng anh chị. Phòng đang dọn, dự kiến xong khoảng 12 rưỡi. Trong lúc chờ, tôi giữ hành lý giúp anh chị, mời anh chị ngồi ở khu chờ.",
        },
        right: {
          label: "Cách nói khách bực",
          text: "Anh chị đến sớm quá, giờ nhận phòng là 14 giờ. Phòng chưa xong. Anh chị chờ một chút hoặc quay lại sau nhé.",
        },
      },
      {
        type: "callout",
        label: "AI không biết phòng nào đang dọn",
        text: "AI có thể viết vài câu mở lời rất hay, nhưng nó không biết phòng nào đang dọn, buồng phòng làm xong lúc nào hay cơ sở có ăn sáng cho khách chờ không. Giờ dự kiến và ưu đãi luôn đến từ người trong cơ sở, không đến từ AI.",
      },
      {
        type: "closing",
        lines: [
          "Chào đón, nói thật tình hình, cho việc giúp ngay và một mốc giờ đã hỏi.",
          "Bài sau: gom những câu khách hay hỏi thành bộ hỏi đáp cho homestay.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2103
  {
    id: 2103,
    slug: "bo-cau-hoi-thuong-gap-cho-homestay",
    title: "Chặng 35, Bài 4: Gom bộ câu hỏi thường gặp của homestay",
    subtitle: "Như thuộc lòng những câu thầy cô hay hỏi trong kỳ thi: gom lại một chỗ, rồi kiểm từng câu với sách.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🏡",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chủ homestay trả lời đi trả lời lại cùng vài câu: giờ nhận phòng, đường vào, chỗ để xe, có nấu ăn không. Gom chúng thành một mục hỏi đáp giúp bạn khỏi gõ lại, khách có thông tin ngay và bớt nhắn hỏi. AI gom rất nhanh từ tin nhắn cũ, nhưng câu trả lời phải đúng với nhà bạn hôm nay chứ không phải với nhà bạn năm ngoái.",
    openingQuestion:
      "Bạn dán 30 tin nhắn cũ của khách vào AI và nhờ gom thành mục hỏi đáp. Bản AI viết có câu \"đậu xe miễn phí ngay trước cổng\". Bạn làm gì?",
    openingOptions: [
      "Kiểm lại chỗ đậu xe hiện tại rồi mới giữ câu đó",
      "Giữ nguyên vì AI lấy từ chính tin nhắn cũ của bạn nên chắc đúng",
      "Xoá hết mục đậu xe vì khách nào cũng biết tự đậu",
      "Nhờ AI kiểm tra lại xem câu đó có còn đúng hôm nay không",
    ],
    correctOption: 0,
    explanation:
      "Tin nhắn cũ phản ánh nhà bạn ở thời điểm gửi. Chỗ đậu xe có thể đã đổi, cổng có thể đã sửa, có khi bạn từng cho ngoại lệ một lần. AI tổng hợp lại chứ không biết điều đó còn đúng hay không. Xoá mục này làm mất câu khách hỏi nhiều. Nhờ AI kiểm thì nó không nhìn được cổng nhà bạn, chỉ bạn mới biết.",
    diagram: [
      { label: "Dán tin nhắn cũ (đã xoá tên khách)", arrow: true },
      { label: "AI gom câu hỏi và soạn trả lời", arrow: true },
      { label: "Bạn kiểm từng câu với thực tế hôm nay", arrow: true },
      { label: "Lưu thành mục hỏi đáp, ghi ngày kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một homestay ở vùng đồi có bốn phòng, chủ nhà tự trả lời tin nhắn. Sau khi gom các câu khách hỏi lại nhiều nhất và trả lời một lần, chủ nhà gửi mục hỏi đáp kèm xác nhận đặt phòng. Khách hỏi ít hơn về giờ giấc và đường đi. Đây là tình huống giả định để minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Nguồn tốt nhất để gom câu hỏi thường gặp của homestay là gì?",
        "Tin nhắn thật khách đã hỏi bạn, sau khi xoá tên và số điện thoại",
        [
          "Danh sách câu hỏi AI tự nghĩ ra cho một homestay bình thường, không cần dữ liệu gì từ bạn",
          "Mục hỏi đáp của một homestay khác trông có vẻ rất chuyên nghiệp",
          "Những câu bạn cho rằng khách chắc sẽ hỏi trong tương lai gần",
        ],
        "Tin nhắn thật cho biết khách thực sự hỏi gì, nên mục hỏi đáp có ích ngay. Câu AI tự nghĩ ra thường chung chung. Sao chép của nơi khác dễ chứa thông tin không đúng với nhà bạn. Đoán khách sẽ hỏi gì thì hay bỏ sót câu họ hỏi nhiều nhất.",
      ),
      q(
        "Trước khi dán tin nhắn cũ vào AI, bạn cần làm gì?",
        "Xoá tên, số điện thoại, số phòng và chi tiết cá nhân của khách",
        [
          "Sắp xếp tin theo thứ tự thời gian để AI đọc cho dễ hơn",
          "Dịch hết sang tiếng Anh để AI hiểu chính xác hơn nội dung",
          "Bỏ các tin nhắn có lời phàn nàn để mục hỏi đáp tích cực hơn và khách đọc thấy dễ chịu",
        ],
        "Tin nhắn có thông tin cá nhân của khách, không nên gửi ra công cụ bên ngoài. Xoá trước là bước bắt buộc. Sắp xếp theo thời gian không cần thiết. Dịch sang tiếng Anh chưa cần. Còn phàn nàn thường chính là câu hỏi cần trả lời, nên bỏ đi là mất thông tin quý.",
      ),
      q(
        "AI gom được mục hỏi đáp có 12 câu. Bạn kiểm câu nào trước?",
        "Câu có giờ giấc, tiền, đường đi, quy định vì khách sẽ làm theo",
        [
          "Câu có văn phong lủng củng nhất vì đó là chỗ dễ sai nhất và làm khách khó hiểu nhất",
          "Câu đầu tiên vì khách thường chỉ đọc câu đầu của mục hỏi đáp",
          "Câu dài nhất vì thông tin dài thường chứa nhiều lỗi hơn cả",
        ],
        "Khách làm theo giờ, tiền, đường đi và quy định, nên sai ở đó tốn kém nhất. Văn phong, thứ tự hay độ dài sửa dễ và ít hậu quả. Kiểm theo mức hậu quả chứ không theo vị trí trong danh sách.",
      ),
      q(
        "Bạn nhờ AI trả lời câu \"đường từ bến xe về homestay đi thế nào\". Rủi ro chính là gì?",
        "AI tự bịa tên đường, mốc chỉ dẫn hoặc khoảng cách không đúng",
        [
          "AI chỉ đường quá dài dòng làm khách đọc không hết bài",
          "AI không biết bến xe nào, nên không trả lời được câu đó",
          "AI sẽ trả lời bằng bản đồ mà khách không mở ra được",
        ],
        "Đường đi là thông tin cụ thể về nơi thật. Nếu bạn không đưa mô tả thật, AI sẽ tự nghĩ ra tên đường và mốc nghe hợp lý. Độ dài sửa được. AI không thấy bản đồ mà cũng không từ chối, nó điền chỗ trống bằng chữ tự tin.",
      ),
      q(
        "Vì sao nên ghi ngày kiểm lần cuối bên cạnh mục hỏi đáp?",
        "Thông tin đổi theo thời gian, ngày kiểm nhắc bạn xem lại định kỳ",
        [
          "Để khách biết mục hỏi đáp được cập nhật thường xuyên và tin tưởng hơn",
          "Để công cụ AI biết cần viết lại mục hỏi đáp mỗi tháng",
          "Để tính thời gian bạn đã bỏ ra khi làm mục hỏi đáp này",
        ],
        "Giờ giấc, giá, chỗ đậu xe đổi theo mùa. Ngày kiểm là lời nhắc cho chính bạn khi nào cần xem lại. Nó không tự làm khách tin hơn, AI không tự viết lại, và mục đích không phải đo thời gian làm.",
      ),
    ],
    keyTakeaways: [
      "Gom câu hỏi từ tin nhắn thật của khách, sau khi xoá thông tin cá nhân.",
      "AI gom và soạn trả lời nhanh, nhưng câu trả lời phải đúng với nhà bạn hôm nay.",
      "Kiểm trước giờ giấc, tiền, đường đi, quy định vì khách làm theo đúng chữ.",
      "Nhà bạn đổi theo mùa: ghi ngày kiểm để biết bao giờ xem lại.",
      "Câu nào bạn chưa chắc, để trống hoặc ghi \"hỏi chủ nhà\", không để AI điền.",
    ],
    practicePrompt: {
      question:
        "Bạn có 40 tin nhắn cũ. Cách nào cho mục hỏi đáp đúng nhất với nhà bạn?",
      options: [
        "Xoá thông tin khách, nhờ AI gom câu hỏi, rồi tự điền đáp án đúng từng câu",
        "Nhờ AI gom câu hỏi và tự nghĩ luôn đáp án cho một homestay điển hình rồi đăng",
        "Dán cả tin nhắn có tên khách để AI hiểu ngữ cảnh rõ hơn",
        "Chép mục hỏi đáp của homestay nổi tiếng rồi sửa vài chỗ cho khác",
      ],
      correct: 0,
      explanation:
        "AI gom câu hỏi rất tốt, nhưng đáp án phải đến từ bạn vì chỉ bạn biết giờ, giá, chỗ đậu xe thật. Để AI nghĩ đáp án sẽ ra homestay điển hình, không phải nhà bạn. Dán tin có tên khách là lộ thông tin cá nhân. Chép nơi khác dễ sai với nhà bạn.",
    },
    summary: {
      keyIdea: "AI giúp gom câu hỏi và soạn chữ; đáp án đúng luôn là của bạn.",
      formula: "Tin nhắn thật (đã xoá tên) → AI gom câu hỏi → bạn điền và kiểm đáp án → ghi ngày kiểm.",
      commonMistake: "Để AI viết luôn đáp án rồi tin, đặc biệt ở giờ giấc, đường đi, chỗ đậu xe.",
      action: "Chọn 10 tin nhắn cũ, xoá thông tin khách, nhờ AI gom 5 câu hỏi hay gặp nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 10 tin nhắn khách đã hỏi bạn, xoá tên và số điện thoại. Nhờ AI gom thành 5 câu hỏi thường gặp, chỉ bảo AI viết câu hỏi, để trống phần trả lời. Tự viết đáp án đúng cho từng câu, đọc lại với thực tế nhà bạn, ghi ngày kiểm.",
      secondary: "Gửi thử mục hỏi đáp này cho khách kế tiếp cùng xác nhận đặt phòng.",
    },
    sections: [
      {
        type: "lead",
        text: "Cùng một câu khách hỏi lần thứ hai mươi: giờ nhận phòng, đường vào, chỗ để xe. Bài này dạy cách nhờ AI gom chúng thành mục hỏi đáp từ tin nhắn thật, và cách kiểm từng thông tin để mục đó không hứa sai.",
      },
      fey(
        "Bộ câu hỏi thường gặp đơn giản hơn bạn nghĩ",
        "Hình dung học sinh ôn thi: gom những câu thầy cô hay hỏi vào một cuốn, rồi mở sách kiểm từng đáp án. Không ai chép đáp án của bạn học rồi tin ngay. Gom câu hỏi khách bằng AI cũng cần một bước mở sách như thế.",
        "Cuốn sổ ôn thi",
        "Mục hỏi đáp gom bằng AI",
        [
          ["Gom câu hỏi", "Nhìn lại các đề cũ", "Dán tin nhắn cũ của khách"],
          ["Điền đáp án", "Mở sách giáo khoa kiểm từng ý", "Bạn điền từ thực tế nhà bạn hôm nay"],
          ["Kiểm lại", "Đối chiếu với sách trước kỳ thi", "Kiểm mỗi mùa, ghi ngày kiểm"],
          ["Rủi ro", "Chép nhầm đáp án của lớp khác", "AI điền đáp án của homestay điển hình"],
        ],
        "AI gom câu hỏi, còn đáp án đúng luôn phải mở \"sách\" là nhà của bạn để kiểm.",
      ),
      { type: "heading", text: "Khoảnh khắc: lần thứ hai mươi gõ cùng một câu" },
      {
        type: "paragraph",
        text: "Bạn để ý mình gõ đi gõ lại: nhận phòng từ 14 giờ, đường vào hẻm nhỏ, xe máy đậu trong sân. Mỗi lần ngắn, nhưng cộng lại là hàng giờ. Gom một lần, trả lời đúng một lần, rồi dùng lại là cách tiết kiệm nhất.",
      },
      {
        type: "flow",
        title: "Từ tin nhắn cũ đến mục hỏi đáp",
        steps: [
          { label: "Chọn 10 đến 20 tin nhắn", detail: "Chọn tin nhắn khách thật, ưu tiên những tin khách hay hỏi lặp lại. Xoá tên, số điện thoại, số phòng." },
          { label: "AI gom câu hỏi", detail: "Nhờ AI nhóm các tin giống nhau thành câu hỏi. Ở bước này chỉ cần câu hỏi, chưa cần đáp án." },
          { label: "Bạn viết đáp án", detail: "Bạn điền đáp án từ thực tế nhà mình. Có thể nhờ AI viết lại cho gọn, nhưng dữ kiện là của bạn." },
          { label: "Kiểm điều khách sẽ làm theo", detail: "Soát kỹ giờ giấc, tiền, đường đi, chỗ đậu xe, quy định. Sai ở đây khách sẽ làm sai theo." },
          { label: "Ghi ngày kiểm", detail: "Ghi ngày cuối cùng bạn kiểm, để lần sau biết cần xem lại khi nào." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gom câu hỏi từ tin nhắn cũ",
        task: "Bạn có 10 tin nhắn khách hỏi giờ nhận phòng, đường đi, chỗ để xe. Lắp một prompt để AI gom thành mục hỏi đáp.",
        parts: [
          {
            id: "source",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Gom câu hỏi thường gặp cho homestay.", feedback: "AI không có tin nhắn nào trong tay - nó sẽ viết mục hỏi đáp của một homestay điển hình, không phải của bạn." },
              { text: "Dưới đây là 10 tin nhắn khách hỏi (đã xoá tên và số điện thoại). Hãy gom các câu hỏi giống nhau thành nhóm.", good: true, feedback: "AI làm việc trên tin nhắn thật và không có thông tin cá nhân, nên nhóm câu hỏi đúng với khách của bạn." },
            ],
          },
          {
            id: "answer",
            label: "Cách xử lý phần trả lời",
            options: [
              { text: "Viết luôn câu trả lời cho từng câu hỏi.", feedback: "AI sẽ tự nghĩ giờ nhận phòng, chỗ đậu xe - những điều chỉ bạn biết - và viết như thật." },
              { text: "Chỉ viết câu hỏi và để trống phần trả lời. Tôi sẽ tự điền đáp án.", good: true, feedback: "Bạn giữ quyền viết đáp án, AI chỉ làm phần nhóm và gọn câu hỏi." },
            ],
          },
          {
            id: "format",
            label: "Định dạng",
            options: [
              { text: "Làm cho đẹp và chuyên nghiệp.", feedback: "Không đo được - AI có thể thêm mục lạ như chính sách hoàn huỷ mà bạn chưa hề có." },
              { text: "Trình bày dạng bảng hai cột: câu hỏi, và ô trống cho đáp án. Tối đa 8 câu, xếp theo tần suất khách hỏi.", good: true, feedback: "Cấu trúc và số lượng rõ - mục hỏi đáp dùng được ngay sau khi bạn điền đáp án." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "answer", "format"],
            text: "| Câu hỏi | Trả lời |\n| Giờ nhận phòng và trả phòng là mấy giờ? | (bạn điền) |\n| Từ bến xe về homestay đi thế nào? | (bạn điền) |\n| Chỗ để xe máy và ô tô ở đâu? | (bạn điền) |\n| Homestay có nấu ăn cho khách không? | (bạn điền) |",
          },
          {
            requires: ["source"],
            text: "1. Giờ nhận phòng? Nhận từ 14 giờ, trả trước 12 giờ.\n2. Chỗ để xe? Xe đậu miễn phí trước cổng.\n\n(Có nhóm câu hỏi đúng nhưng AI đã tự điền đáp án như giờ nhận phòng và chuyện xe miễn phí.)",
          },
          {
            text: "Câu hỏi thường gặp: Homestay có hồ bơi không? Có nhận thú cưng không? Có dịch vụ thuê xe máy không?\n\n(AI không có tin nhắn của bạn nên tự nghĩ ra những câu hỏi về dịch vụ nhà bạn có thể không có.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thông tin khách là của khách",
        text: "Tin nhắn cũ có tên, số điện thoại, đôi khi cả ngày đi và người đi cùng. Xoá hết trước khi dán vào bất kỳ công cụ nào. Bản mục hỏi đáp không cần thông tin đó, chỉ cần câu hỏi.",
      },
      {
        type: "scenario",
        title: "Mục hỏi đáp AI viết nói đậu xe miễn phí",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả về mục hỏi đáp gọn gàng. Có câu: \"Xe máy và ô tô đều đậu miễn phí ngay trước cổng homestay.\" Bạn nhớ tháng trước hàng xóm phàn nàn về xe ô tô của khách.",
            choices: [
              { label: "Giữ nguyên câu đó, vì nó lấy từ tin nhắn cũ của bạn", next: "bad_keep" },
              { label: "Ra cổng xem thực tế, hỏi hàng xóm, rồi sửa câu cho đúng", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Một khách đi ô tô làm theo mục hỏi đáp và đậu trước cổng. Hàng xóm gõ cửa phàn nàn giữa đêm, khách bực vì \"trong hướng dẫn nói miễn phí mà\".",
            ending: "bad",
          },
          s2: {
            text: "Hàng xóm nói xe ô tô không được đậu trước cổng vì chặn lối đi. Xe máy vẫn đậu trong sân được. Ô tô có chỗ ở bãi cách hai trăm mét.",
            choices: [
              { label: "Sửa: xe máy đậu trong sân; ô tô đậu ở bãi cách 200 m, ghi ngày kiểm", next: "good" },
              { label: "Xoá mục đậu xe cho khỏi rắc rối", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Câu hỏi về đậu xe là câu khách hỏi nhiều nhất. Không có mục đó, khách lại nhắn hỏi từng người một, và bạn quay lại như lúc chưa có mục hỏi đáp.",
            ending: "bad",
          },
          good: {
            text: "Khách đi ô tô đọc mục hỏi đáp, đậu đúng bãi và không có ai phải gõ cửa. Tin nhắn hỏi đậu xe của tuần sau ít hẳn đi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Gom câu hỏi từ tin nhắn thật, tự điền đáp án, ghi ngày kiểm.",
          "Bài sau: ghép cả chuỗi tin nhắn mẫu, từ lúc khách đặt đến khi khách tới.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2104
  {
    id: 2104,
    slug: "mini-du-an-tin-nhan-mau-truoc-chuyen-di",
    title: "Chặng 35, Bài 5: Mini-dự án: chuỗi tin nhắn mẫu từ lúc đặt đến khi khách đến",
    subtitle: "Như một chuyến tàu có ba ga: xác nhận, dặn trước, chào ngày đến - mỗi ga một tin nhắn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✉️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách đặt phòng xong thường lo: đã giữ chỗ chưa, đường tới đó thế nào, mấy giờ được vào. Ba tin nhắn gửi đúng lúc trả lời hết những lo này và giảm số tin nhắn hỏi lại. Soạn một lần bằng AI, kiểm một lần, rồi dùng cho mọi khách sau.",
    openingQuestion:
      "Bạn định gửi một tin nhắn duy nhất chứa mọi thứ khách cần biết ngay sau khi đặt phòng. Vì sao chia thành ba tin gửi ở ba thời điểm thường hiệu quả hơn?",
    openingOptions: [
      "Mỗi tin trả lời đúng điều khách quan tâm vào lúc đó và dễ đọc hơn",
      "Gửi nhiều tin nhắn thì khách nghĩ cơ sở làm việc rất chuyên nghiệp",
      "Ba tin nhắn giúp bạn tránh phải kiểm lại thông tin mỗi lần gửi",
      "Khách không nhớ được nội dung của một tin nhắn dài hơn ba dòng",
    ],
    correctOption: 0,
    explanation:
      "Ngay sau khi đặt, khách cần biết đã giữ chỗ. Vài ngày trước chuyến đi, họ cần đường tới và giờ giấc. Sáng ngày đến, họ cần một lời chào và một đầu mối. Nhét cả ba vào một tin thì khách đọc lướt và quên. Số lượng tin nhắn không tạo ra sự chuyên nghiệp, và ba tin vẫn phải kiểm thông tin. Khách cũng nhớ được tin dài nếu đọc đúng lúc cần.",
    diagram: [
      { label: "Tin 1: xác nhận đặt phòng", arrow: true },
      { label: "Tin 2: dặn trước ngày đến", arrow: true },
      { label: "Tin 3: chào sáng ngày nhận phòng", arrow: true },
      { label: "Lưu thành mẫu, kiểm mỗi mùa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cơ sở lưu trú nhỏ gửi cho mỗi khách ba tin nhắn: xác nhận khi đặt, hướng dẫn đường đi ba ngày trước và lời chào sáng ngày đến. Chủ cơ sở soạn ba mẫu một lần, chỉ thay tên khách và ngày. Số tin nhắn hỏi đường và giờ nhận phòng giảm rõ rệt. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Tin nhắn xác nhận đặt phòng nên có gì trước tiên?",
        "Ngày đến, ngày đi, loại phòng và tổng tiền hoặc tiền đã cọc",
        [
          "Lời giới thiệu về lịch sử cơ sở",
          "Danh sách tất cả điểm tham quan gần cơ sở để khách lên kế hoạch",
          "Lời hứa nâng hạng phòng nếu khách để lại đánh giá tốt sau chuyến đi",
        ],
        "Xác nhận là để khách yên tâm: đúng ngày, đúng phòng, đúng tiền. Lịch sử cơ sở và điểm tham quan để tin khác. Hứa nâng hạng là cam kết chưa ai duyệt và gắn với đánh giá, việc khách sạn thường không được làm.",
      ),
      q(
        "Bạn nhờ AI soạn tin dặn trước ngày đến. Điều gì bạn phải tự cung cấp?",
        "Địa chỉ thật, đường đi, giờ nhận phòng và số liên lạc",
        [
          "Giọng văn chung của mọi khách sạn",
          "Lời chào mở đầu thật hay để khách thấy cơ sở rất chuyên nghiệp",
          "Số lượng từ trong tin nhắn cho khách đọc hết trong một lần nhìn",
        ],
        "Địa chỉ, đường đi, giờ nhận phòng, số liên lạc là dữ kiện thật chỉ bạn biết, AI sẽ tự bịa nếu thiếu. Giọng văn, lời chào và độ dài là phần chữ AI viết được và bạn sửa nhanh.",
      ),
      q(
        "AI viết tin chào sáng ngày đến: \"Phòng của quý khách đã sẵn sàng từ sáng\". Bạn nên làm gì?",
        "Kiểm với buồng phòng, rồi sửa nếu chưa chắc",
        [
          "Giữ nguyên vì đó là câu mở đầu rất dễ chịu với khách",
          "Xoá cả tin nhắn vì AI không nên viết tin cho ngày đến",
          "Đổi thành \"phòng sẽ sẵn sàng lúc 12 giờ\" cho có mốc thời gian",
        ],
        "Câu này là khẳng định về tình trạng phòng, nên phải hỏi buồng phòng. Không kiểm mà giữ là hứa điều chưa chắc. Xoá cả tin là bỏ phần có ích. Đổi sang 12 giờ là tự bịa một giờ mới.",
      ),
      q(
        "Bạn dùng chung một mẫu cho mọi khách. Điều gì phải đổi cho từng người?",
        "Tên khách, ngày đến, loại phòng và số người",
        [
          "Địa chỉ của cơ sở vì mỗi khách sẽ đi theo một đường khác nhau",
          "Cách xưng hô vì mỗi khách có tuổi khác nhau nên không dùng chung được",
          "Giờ nhận phòng vì mỗi người đặt vào một ngày khác nhau",
        ],
        "Tên, ngày, loại phòng, số người khác nhau giữa các khách. Địa chỉ cơ sở không đổi. Xưng hô \"quý khách\" dùng chung được. Giờ nhận phòng chuẩn không đổi theo người đặt, chỉ đổi nếu cơ sở đổi quy định.",
      ),
      q(
        "Khi nào nên xem lại ba tin nhắn mẫu?",
        "Khi giờ giấc, giá, địa chỉ hoặc quy định của cơ sở đổi, và mỗi mùa",
        [
          "Chỉ khi có khách phàn nàn trực tiếp về một tin nhắn cụ thể",
          "Không cần xem lại vì mẫu tốt thì dùng được nhiều năm liền",
          "Mỗi khi công cụ AI ra phiên bản mới để viết lại cho hay hơn",
        ],
        "Mẫu chứa thông tin cơ sở nên phải đổi theo cơ sở, và nên có lịch kiểm mỗi mùa. Chờ khách phàn nàn là đã sai với những khách trước. Dùng nhiều năm không kiểm sẽ sai dần. Phiên bản AI mới không liên quan tới thông tin nhà bạn.",
      ),
    ],
    keyTakeaways: [
      "Ba tin nhắn ở ba thời điểm: xác nhận, dặn trước, chào ngày đến.",
      "Mỗi tin trả lời đúng điều khách quan tâm vào lúc đó.",
      "Dữ kiện thật (địa chỉ, giờ, số liên lạc) là của bạn; AI chỉ viết phần chữ.",
      "Chỉ đổi tên, ngày, loại phòng cho từng khách; phần còn lại là mẫu.",
      "Kiểm mẫu mỗi mùa hoặc khi cơ sở đổi quy định.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn AI soạn tin dặn trước ngày đến. Prompt nào cho bản nháp dùng được nhất?",
      options: [
        "Đây là địa chỉ, đường đi, giờ nhận phòng và số liên lạc; soạn tin ngắn dặn khách",
        "Soạn tin nhắn dặn khách trước ngày đến thật hay và cảm động",
        "Soạn tin dặn khách, tự thêm những thông tin cần thiết cho đủ",
        "Viết một tin nhắn thật dài để khách không phải hỏi lại điều gì",
      ],
      correct: 0,
      explanation:
        "Prompt tốt đưa dữ kiện thật và giới hạn độ dài, nên AI chỉ viết phần chữ. Prompt \"hay và cảm động\" chỉ về giọng, thiếu dữ kiện. Prompt \"tự thêm thông tin\" khiến AI bịa. Prompt \"thật dài\" cho tin khó đọc và vẫn phải bịa chỗ thiếu.",
    },
    summary: {
      keyIdea: "Ba tin nhắn đúng lúc thay cho hàng chục tin hỏi lại; soạn một lần, kiểm một lần, dùng nhiều lần.",
      formula: "Tin 1 xác nhận + tin 2 dặn trước + tin 3 chào ngày đến, mỗi tin có dữ kiện thật của bạn.",
      commonMistake: "Nhét mọi thứ vào một tin dài, hoặc để AI tự điền giờ và địa chỉ.",
      action: "Soạn và lưu ba tin mẫu trong ghi chú điện thoại, kèm ngày kiểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Ghi ra 5 dữ kiện thật của cơ sở: địa chỉ, cách đi từ điểm khách hay tới, giờ nhận và trả phòng, số liên lạc, giờ ăn sáng. Nhờ AI soạn ba tin mẫu từ các dữ kiện đó, dưới 80 chữ mỗi tin. Đọc lại và kiểm từng dữ kiện, rồi lưu lại kèm ngày kiểm.",
      secondary: "Gửi thử ba tin cho một đồng nghiệp và hỏi: có chỗ nào khó hiểu không?",
    },
    sections: [
      {
        type: "lead",
        text: "Khách vừa đặt phòng và đã bắt đầu lo: đã giữ chỗ chưa, đi đường nào, mấy giờ vào được. Bài mini-dự án này ghép ba tin nhắn mẫu cho ba thời điểm, để bạn dùng lại cho khách kế tiếp.",
      },
      fey(
        "Chuỗi tin nhắn đơn giản hơn bạn nghĩ",
        "Hình dung một chuyến tàu có ba ga. Mỗi ga có một thông báo riêng: ga đầu báo đã lên tàu, ga giữa dặn chuẩn bị xuống, ga cuối chào đón tới nơi. Ba tin nhắn cho khách cũng là ba ga trên hành trình từ lúc đặt đến khi đến.",
        "Ba ga trên chuyến tàu",
        "Ba tin nhắn cho khách",
        [
          ["Ga đầu", "Báo đã lên tàu, giờ tàu chạy", "Xác nhận: ngày, phòng, tiền"],
          ["Ga giữa", "Dặn chuẩn bị hành lý, đến ga nào", "Dặn trước: đường đi, giờ nhận, liên lạc"],
          ["Ga cuối", "Chào đón khi tàu tới nơi", "Chào sáng ngày đến, đầu mối liên lạc"],
          ["Người kiểm", "Nhân viên soát giờ tàu", "Bạn kiểm dữ kiện trước khi lưu mẫu"],
        ],
        "Mỗi tin nhắn là một ga: nói đúng điều khách cần vào đúng lúc, không nhồi hết vào một thông báo.",
      ),
      { type: "heading", text: "Khoảnh khắc: khách vừa đặt xong" },
      {
        type: "paragraph",
        text: "Khách đặt xong chưa yên tâm ngay: họ hay hỏi lại đã giữ chỗ chưa, hoặc tới lúc gần đi mới hỏi đường. Nếu bạn để họ hỏi từng lần, bạn trả lời mười lần cho mười khách. Nếu chủ động gửi đúng lúc, chỉ cần soạn một lần.",
      },
      {
        type: "flow",
        title: "Ba tin nhắn từ lúc đặt đến ngày đến",
        steps: [
          { label: "Tin 1: xác nhận", detail: "Gửi ngay khi khách đặt. Nêu tên khách, ngày đến và đi, loại phòng, tiền đã cọc hoặc còn phải trả. Mục đích là khách yên tâm chỗ đã được giữ." },
          { label: "Tin 2: dặn trước", detail: "Gửi vài ngày trước chuyến đi. Có địa chỉ, cách đi, giờ nhận phòng, số liên lạc. Mục đích là khách biết đi thế nào và gọi ai." },
          { label: "Tin 3: chào ngày đến", detail: "Gửi sáng ngày khách tới. Một lời chào ngắn, nhắc giờ nhận phòng và số liên lạc. Không hứa phòng sẵn sàng nếu chưa hỏi buồng phòng." },
          { label: "Lưu mẫu và kiểm", detail: "Lưu ba tin, chỉ đổi tên, ngày, loại phòng. Mỗi mùa kiểm lại dữ kiện." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn tin dặn trước ngày đến",
        task: "Bạn cần một tin dặn trước ngày đến cho khách của nhà nghỉ. Lắp prompt để AI soạn mẫu dùng lại được.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện đưa vào",
            options: [
              { text: "Soạn tin dặn khách trước ngày đến.", feedback: "AI không có địa chỉ, giờ hay số liên lạc nào - nó sẽ tự bịa những thứ đó cho nghe đủ thông tin." },
              { text: "Nhà nghỉ ở số 12, đường Ven Biển; nhận phòng từ 14 giờ; trả phòng trước 12 giờ; số liên lạc 09xx xxx xxx (ví dụ); đường đi từ bến xe: taxi khoảng 10 phút.", good: true, feedback: "Dữ kiện thật, cụ thể - AI chỉ việc viết quanh chúng, không cần bịa gì thêm." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết đầy đủ thật, cho khách khỏi phải hỏi gì thêm.", feedback: "Không có giới hạn - AI viết dài và dễ thêm những điều bạn chưa hứa như đón khách hoặc phòng đã sẵn sàng." },
              { text: "Dưới 80 chữ. Chỉ dùng dữ kiện tôi đưa, không thêm dịch vụ hoặc lời hứa nào khác.", good: true, feedback: "Độ dài rõ và cấm thêm dữ kiện - bản nháp không có lời hứa ngoài ý bạn." },
            ],
          },
          {
            id: "form",
            label: "Chỗ để thay",
            options: [
              { text: "Viết luôn cho khách tên Lan, đến ngày 20.", feedback: "Tin nhắn dính chặt một khách - bạn phải soạn lại mỗi lần có khách mới." },
              { text: "Dùng ô [TÊN KHÁCH] và [NGÀY ĐẾN] để tôi điền cho từng khách.", good: true, feedback: "Có chỗ trống để đổi - cùng một mẫu dùng được cho mọi khách." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "limit", "form"],
            text: "Chào [TÊN KHÁCH], hẹn gặp bạn ngày [NGÀY ĐẾN]. Nhà nghỉ ở số 12 đường Ven Biển, từ bến xe đi taxi khoảng 10 phút. Nhận phòng từ 14 giờ, trả phòng trước 12 giờ. Cần gì bạn gọi 09xx xxx xxx nhé.",
          },
          {
            requires: ["facts"],
            text: "Chào bạn Lan! Rất mong được đón bạn vào ngày 20. Nhà nghỉ ở số 12 đường Ven Biển... Chúng tôi sẽ chuẩn bị bữa sáng và phòng sẵn sàng khi bạn đến...\n\n(Đủ dữ kiện nhưng dính khách cụ thể và tự thêm bữa sáng, phòng sẵn sàng - chưa ai hứa.)",
          },
          {
            text: "Chào quý khách! Nhà nghỉ chúng tôi ở trung tâm, đón sân bay miễn phí, wifi tốc độ cao, có hồ bơi...\n\n(AI không có dữ kiện nên viết một nhà nghỉ điển hình với những dịch vụ bạn có thể không có.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Mẫu dùng lại là lời hứa lặp lại",
        text: "Một câu sai trong mẫu sẽ được gửi cho mọi khách. Vì vậy kiểm mẫu kỹ hơn kiểm một tin lẻ: mỗi dữ kiện về giờ, địa chỉ, số liên lạc phải đối chiếu với thực tế trước khi lưu.",
      },
      {
        type: "scenario",
        title: "Tin dặn trước hứa phòng sẵn sàng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ AI soạn tin chào sáng ngày đến. Bản nháp có câu: \"Phòng của bạn đã sẵn sàng, mời bạn đến nhận bất cứ lúc nào.\" Bạn định lưu mẫu và gửi cho mọi khách.",
            choices: [
              { label: "Lưu nguyên mẫu, vì nghe rất mến khách", next: "bad_ready" },
              { label: "Sửa câu đó: nhận phòng từ 14 giờ, nếu sớm hơn bạn sẽ báo", next: "s2" },
            ],
          },
          bad_ready: {
            text: "Một khách bay đêm đến lúc 7 giờ sáng theo tin nhắn. Phòng chưa dọn, khách chìa tin nhắn ra. Quầy phải xin lỗi và mời bữa sáng để dịu lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn lưu mẫu đã sửa. Tuần sau đổi giờ nhận phòng từ 14 giờ sang 13 giờ 30 vì đổi ca dọn phòng.",
            choices: [
              { label: "Sửa ngay dữ kiện giờ nhận phòng trong cả ba mẫu và ghi ngày kiểm", next: "good" },
              { label: "Để đó, khi nào khách hỏi thì nói giờ mới", next: "bad_stale" },
            ],
          },
          bad_stale: {
            text: "Mẫu vẫn ghi 14 giờ. Vài khách đến 13 giờ 30 chờ thêm nửa tiếng dù phòng đã sẵn sàng, vài khách khác thắc mắc vì tin nhắn nói khác với quầy.",
            ending: "bad",
          },
          good: {
            text: "Ba mẫu ghi đúng 13 giờ 30 và có ngày kiểm. Khách đến đúng giờ được vào phòng ngay, tin nhắn và quầy nói cùng một điều.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba tin, ba lúc: xác nhận, dặn trước, chào ngày đến.",
          "Bài sau: lịch trình ba ngày cho một đoàn khách, với AI làm nháp và bạn kiểm giờ mở cửa.",
        ],
      },
    ],
  },
];
