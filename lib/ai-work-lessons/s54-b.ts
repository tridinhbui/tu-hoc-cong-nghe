import type { Lesson } from "../lesson-types";

// Chặng 54, bài 6-10. Giáo trình: scripts/curriculum/stage-54.json.
// Không bài nào dựa vào một tính năng riêng của công cụ: nội dung là cách giao việc
// và cách kiểm kết quả, nên không cần dẫn nguồn tài liệu công cụ.
export const S54_B_LESSONS: Lesson[] = [
  {
    id: 2485,
    slug: "tra-loi-mau-cho-cau-hoi-hay-gap",
    title: "Chặng 54, Bài 6: Bộ trả lời mẫu cho năm câu hỏi khách hỏi đi hỏi lại",
    subtitle: "Cùng một câu gõ năm lần trong tuần là một mẫu đang chờ được viết.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phần lớn giờ trả lời khách không nằm ở câu khó mà ở câu dễ gõ đi gõ lại: giờ mở cửa, cách đổi hàng, bao lâu có báo giá. Gom chúng thành mẫu có chỗ trống giúp bạn trả lời trong một phút thay vì năm phút, và quan trọng hơn, mọi khách nhận cùng một thông tin đúng.",
    openingQuestion:
      "Tuần qua bạn gõ gần như y hệt câu «Bên em giao hàng trong bao lâu» tám lần cho tám khách khác nhau. Việc hợp lý nhất để làm tiếp là gì?",
    openingOptions: [
      "Viết thành một mẫu có chỗ trống để điền tên khách và ngày giao",
      "Gõ tiếp như cũ, vì mỗi khách cần một câu trả lời soạn riêng hoàn toàn",
      "Nhờ AI tự trả lời mọi khách hỏi câu đó mà không cần bạn xem lại",
      "Dán câu trả lời của tuần trước cho khách mới và giữ nguyên cả tên cũ",
    ],
    correctOption: 0,
    explanation:
      "Một câu bạn gõ lặp lại tám lần là dấu hiệu rõ nhất cần có mẫu: phần giữ nguyên (thời gian giao, điều kiện) viết một lần, phần thay đổi (tên khách, ngày) để thành chỗ trống. Gõ lại từng lần vừa tốn giờ vừa dễ lệch thông tin giữa các khách. Để AI tự trả lời không cần xem lại là giao cả quyền cam kết cho máy. Dán nguyên bản cũ thì sớm muộn cũng gửi nhầm tên khách khác, một lỗi khách nhìn thấy ngay.",
    diagram: [
      { label: "Đếm câu bạn gõ lại trong tuần", arrow: true },
      { label: "Nhờ AI soạn mẫu có chỗ trống", arrow: true },
      { label: "Bạn sửa cho đúng giọng và đúng chính sách", arrow: true },
      { label: "Mỗi lần dùng: điền chỗ trống và đọc lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng bán đồ gia dụng có hai người nhắn tin",
      description:
        "Hai nhân viên nhận khoảng 40 tin nhắn mỗi ngày, trong đó phần lớn xoay quanh năm câu hỏi: phí giao hàng, thời gian giao, đổi trả, bảo hành, cách thanh toán. Chủ cửa hàng gom năm câu trả lời tốt nhất thành năm mẫu. Thời gian trả lời mỗi tin giảm rõ rệt và quan trọng hơn, hai người không còn nói hai điều khác nhau về cùng một chính sách. Đây là tình huống minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      {
        question: "Khi nào một câu trả lời nên được viết thành mẫu có sẵn?",
        options: [
          "Khi bạn đã gõ lại gần như cùng nội dung từ ba lần trở lên",
          "Khi câu hỏi nghe rất quan trọng với khách",
          "Khi khách hỏi bằng tin nhắn chứ không phải email",
          "Khi nội dung trả lời dài hơn mười dòng",
        ],
        correct: 0,
        explanation:
          "Tiêu chí là sự lặp lại: nếu bạn đã gõ gần như cùng nội dung ba lần thì lần thứ tư đã đáng có mẫu. Câu hỏi quan trọng chưa chắc lặp lại nên chưa đáng làm mẫu, kênh gửi (tin nhắn hay email) không quyết định, và độ dài thì chỉ cho biết mẫu sẽ tiết kiệm được nhiều chữ chứ không cho biết có lặp hay không.",
      },
      {
        question: "Chỗ trống trong mẫu trả lời dùng để làm gì?",
        options: [
          "Điền thông tin riêng của từng khách",
          "Để AI tự đoán rồi điền giá tiền và ngày giao cho nhanh",
          "Để khách biết đây là thư soạn sẵn mà thông cảm",
          "Để mẫu dùng được mãi mà không cần ai xem lại nữa",
        ],
        correct: 0,
        explanation:
          "Chỗ trống là nơi người thật điền tên, số tiền, ngày của đúng khách đang hỏi. AI tự đoán giá và ngày là cách tạo ra con số bịa. Mẫu không nhằm để khách biết nó soạn sẵn, và mẫu nào cũng cần xem lại khi chính sách đổi, nếu không nó sẽ nói điều đã cũ.",
      },
      {
        question: "Nhờ AI soạn mẫu, nên đưa gì vào yêu cầu để mẫu sát cách bạn nói?",
        options: [
          "Một câu trả lời thật bạn từng gửi, đã xoá tên khách",
          "Nguyên email của khách kèm tên và số điện thoại thật cho sát",
          "Chỉ ghi chữ «trả lời lịch sự»",
          "Một mẫu của công ty khác tìm trên mạng để khỏi gõ",
        ],
        correct: 0,
        explanation:
          "Một câu trả lời thật đã xoá tên cho AI thấy giọng và chính sách của bạn mà không lộ thông tin cá nhân của khách. Dán nguyên email có tên và số điện thoại là gửi dữ liệu khách ra ngoài. «Trả lời lịch sự» quá chung nên ra mẫu ai cũng dùng được, và mẫu của công ty khác có thể nói điều chính sách bên bạn không có.",
      },
      {
        question:
          "Tuần qua bạn gõ lại 4 câu hỏi, mỗi câu 5 lần, mỗi lần mất 3 phút. Tổng thời gian gõ lại là bao nhiêu?",
        options: [
          "60 phút (= 4 câu × 5 lần × 3 phút)",
          "12 phút (= 4 + 5 + 3, cộng thay vì nhân)",
          "15 phút (= 5 × 3, quên nhân số câu)",
          "20 phút (= 4 × 5, quên thời gian)",
        ],
        correct: 0,
        explanation:
          "Số câu nhân số lần nhân thời gian mỗi lần: 4 × 5 × 3 = 60 phút, tức một giờ mỗi tuần. 12 phút là cộng ba con số lại, 15 phút quên mất có bốn câu khác nhau, còn 20 phút quên nhân với thời gian mỗi lần gõ. Một giờ mỗi tuần là thời gian đủ lớn để đáng viết mẫu.",
      },
      {
        question: "Chỗ nào AI tuyệt đối không được tự điền trong mẫu trả lời?",
        options: [
          "Số tiền, ngày hẹn, tên khách",
          "Lời chào đầu thư và câu cảm ơn cuối thư",
          "Thứ tự các ý trong đoạn giải thích chung",
          "Cách ngắt dòng để thư dễ đọc hơn",
        ],
        correct: 0,
        explanation:
          "Số tiền, ngày và tên là những thứ khách dùng để làm theo hoặc đối chiếu; AI điền sai một chữ là bạn cam kết sai. Lời chào, thứ tự ý và cách ngắt dòng là việc diễn đạt mà AI làm tốt và bạn đọc lại là thấy, nên không cần cấm.",
      },
    ],
    keyTakeaways: [
      "Đếm trước: câu nào bạn gõ lại từ ba lần trở lên thì đáng thành mẫu.",
      "Mẫu gồm phần giữ nguyên và chỗ trống để điền tên, số tiền, ngày.",
      "Đưa cho AI một câu trả lời thật đã xoá tên khách để nó bắt chước giọng.",
      "Số tiền, ngày, tên do người thật điền, không để AI đoán.",
      "Khi chính sách đổi, sửa mẫu ngay, nếu không mẫu sẽ nói điều đã cũ.",
    ],
    practicePrompt: {
      question:
        "Chị Hà bán đồ handmade, tuần nào cũng gõ lại câu «đơn làm mất 5-7 ngày, nếu gấp phải báo trước». Chị nhờ AI soạn mẫu. Chị nên dặn gì để an toàn?",
      options: [
        "Giữ nguyên 5-7 ngày như chị viết, chỗ tên khách và ngày nhận để trống",
        "Để AI tự chọn số ngày cho nghe hấp dẫn với khách mới",
        "Bảo AI thêm lời hứa giao nhanh hơn để khách thấy yên tâm",
        "Để AI bỏ câu «nếu gấp phải báo trước» cho thư gọn hơn",
      ],
      correct: 0,
      explanation:
        "Chính sách thật (5-7 ngày, báo trước khi gấp) là phần của chị, AI chỉ được viết quanh. Tên khách và ngày nhận là chỗ trống. Để AI chọn số ngày hay hứa nhanh hơn là tạo cam kết không có thật, còn bỏ câu báo trước thì làm mất điều kiện khách cần biết.",
    },
    summary: {
      keyIdea: "Câu gõ đi gõ lại là mẫu chưa được viết; mẫu tốt có chỗ trống cho người thật điền.",
      formula: "Số câu lặp × số lần × phút mỗi lần = giờ bạn có thể lấy lại mỗi tuần.",
      commonMistake: "Để AI tự điền số tiền, ngày hay tên vào chỗ trống cho nhanh.",
      action: "Đếm tuần này bạn gõ lại câu nào từ ba lần trở lên và viết ra năm câu đứng đầu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở tin nhắn và email đã gửi trong 7 ngày qua, đánh dấu những câu bạn gõ lại gần như y hệt, chọn ra 3 câu lặp nhiều nhất. Nhờ AI soạn mẫu cho một câu trong đó từ một câu trả lời thật của bạn (đã xoá tên khách), đặt chỗ trống dạng [TÊN KHÁCH], [NGÀY], [SỐ TIỀN] rồi lưu mẫu vào một ghi chú.",
      secondary: "Ngày mai dùng mẫu đó cho một khách thật và ghi lại bạn phải sửa mấy chỗ.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn trả lời khách câu «bên em giao trong bao lâu» lần thứ tám của tuần. Mỗi lần chỉ vài phút, nhưng cộng lại là một buổi sáng. Bài này dạy bạn biến những câu đó thành mẫu, và giao phần soạn nháp cho AI mà vẫn giữ quyền quyết định những điều khách dùng để làm theo.",
      },
      {
        type: "feynman",
        title: "Mẫu trả lời đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tờ đơn in sẵn ở quầy: phần chữ in là điều ai cũng phải đọc, còn các ô trống là chỗ người làm thủ tục điền tên và ngày của mình.",
        columns: ["Thành phần", "Tờ đơn in sẵn ở quầy", "Mẫu trả lời của bạn"],
        rows: [
          ["Phần in sẵn", "Điều khoản và hướng dẫn giống nhau cho mọi người", "Chính sách, điều kiện, cách làm giống nhau cho mọi khách"],
          ["Ô trống", "Họ tên, ngày tháng, số tiền", "[TÊN KHÁCH], [NGÀY], [SỐ TIỀN] do người thật điền"],
          ["Người soạn mẫu", "Nhân viên viết một lần cho cả quầy", "Bạn viết một lần, có AI soạn nháp giúp"],
          ["Khi quy định đổi", "Phải in lại tờ đơn mới", "Phải sửa mẫu ngay, nếu không khách nhận thông tin cũ"],
        ],
        oneLiner: "Mẫu trả lời là tờ đơn in sẵn của bạn: phần giữ nguyên viết một lần, ô trống để người thật điền.",
      },
      { type: "heading", text: "Đếm trước khi viết" },
      {
        type: "paragraph",
        text: "Đừng viết mẫu cho những câu bạn nghĩ là hay gặp; hãy đếm. Lướt lại tin nhắn một tuần và gạch mỗi lần bạn gõ gần như y hệt một câu cũ. Năm câu đứng đầu thường chiếm phần lớn thời gian gõ lại, và đó mới là chỗ mẫu có lời.",
      },
      {
        type: "chart",
        title: "Giờ gõ lại mỗi tuần theo số câu hỏi lặp",
        caption:
          "Số liệu minh hoạ, không phải đo thật. Kéo hai thanh trượt cho khớp với công việc của bạn: mỗi câu hỏi lặp bị gõ lại bao nhiêu lần một tuần và mỗi lần mất mấy phút.",
        kind: "bar",
        xLabel: "Số câu hỏi lặp",
        yLabel: "Giờ gõ lại mỗi tuần",
        x: { from: 1, to: 10, step: 1 },
        params: [
          { id: "lan", label: "Số lần gõ lại mỗi câu trong tuần", min: 1, max: 20, step: 1, value: 5, unit: "lần" },
          { id: "phut", label: "Phút mỗi lần gõ", min: 1, max: 8, step: 0.5, value: 3, unit: "phút" },
        ],
        series: [{ label: "Giờ gõ lại mỗi tuần", expr: "x * lan * phut / 60" }],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đếm: chọn 5 câu bạn gõ lại nhiều nhất trong 7 ngày.",
          "Bước 2 - Đưa AI một câu trả lời thật của bạn, đã xoá tên khách, và nhờ viết thành mẫu có chỗ trống.",
          "Bước 3 - Đọc lại: chính sách và con số phải đúng như bạn viết, không phải như AI nghĩ.",
          "Bước 4 - Lưu mẫu ở một chỗ cả nhóm tìm được, ghi ngày cập nhật.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn mẫu trả lời «thời gian giao hàng»",
        task: "Cửa hàng của bạn giao trong 2-3 ngày nội thành, 4-6 ngày các tỉnh khác. Lắp một yêu cầu để AI soạn mẫu có chỗ trống.",
        parts: [
          {
            id: "context",
            label: "Dữ kiện chính sách",
            options: [
              {
                text: "Viết mẫu trả lời khách về thời gian giao hàng.",
                feedback: "AI không biết bạn giao bao lâu, nên sẽ tự bịa một con số nghe hợp lý rồi khách tin theo.",
              },
              {
                text: "Nội thành giao 2-3 ngày, tỉnh khác 4-6 ngày, ngày giao tính từ lúc xác nhận thanh toán.",
                good: true,
                feedback: "AI có đúng con số và mốc tính ngày, nên chỉ phải viết quanh dữ kiện bạn đưa.",
              },
            ],
          },
          {
            id: "blank",
            label: "Chỗ trống",
            options: [
              {
                text: "Dùng [TÊN KHÁCH], [NGÀY XÁC NHẬN], [NGÀY GIAO DỰ KIẾN] làm chỗ trống để người gửi điền.",
                good: true,
                feedback: "Những thứ riêng của từng khách được để trống, người thật điền nên không có chuyện AI điền sai.",
              },
              {
                text: "Tự điền tên khách và ngày cho đầy đủ để mẫu dùng ngay.",
                feedback: "AI sẽ bịa tên và ngày; mẫu trông hoàn chỉnh nhưng gửi đi là gửi sai.",
              },
            ],
          },
          {
            id: "style",
            label: "Giọng và độ dài",
            options: [
              {
                text: "Viết cho hay và chuyên nghiệp.",
                feedback: "«Hay» không đo được nên AI viết dài, nhiều câu sáo như «chúng tôi luôn đặt khách hàng lên hàng đầu».",
              },
              {
                text: "Giọng thân thiện như mẫu trả lời bên dưới, dưới 80 chữ, xưng «em» - «anh/chị».",
                good: true,
                feedback: "Giọng, độ dài và cách xưng hô đều rõ ràng nên bản nháp đầu đã gần dùng được.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "blank", "style"],
            text: "Chào anh/chị [TÊN KHÁCH], em cảm ơn anh/chị đã đặt hàng.\n\nĐơn xác nhận ngày [NGÀY XÁC NHẬN]. Nội thành em giao trong 2-3 ngày, tỉnh khác 4-6 ngày, tính từ lúc xác nhận thanh toán, dự kiến tới ngày [NGÀY GIAO DỰ KIẾN].\n\nAnh/chị cần gấp hơn thì nhắn em, em kiểm tra giúp nhé.",
          },
          {
            requires: ["context"],
            text: "Kính gửi Quý khách,\n\nChúng tôi xin trân trọng cảm ơn Quý khách đã tin tưởng. Đơn hàng sẽ được giao trong 2-3 ngày nội thành và 4-6 ngày các tỉnh khác. Chúng tôi luôn nỗ lực hết mình để mang lại trải nghiệm tốt nhất cho Quý khách...\n\n(Đúng con số nhưng thiếu chỗ trống cho tên và ngày, giọng còn sáo và dài.)",
          },
          {
            text: "Chào anh Nam, đơn của anh đặt ngày 12/10 sẽ được giao trong 24 giờ kèm quà tặng miễn phí.\n\n(Không có dữ kiện nên AI tự bịa tên, ngày, thời gian 24 giờ và quà tặng, những điều cửa hàng chưa hề hứa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Giữ mẫu luôn đúng",
        text: "Mẫu cũ là nguồn gây sai lặng lẽ nhất: chính sách đổi mà mẫu vẫn nói điều cũ thì mọi khách sau đó nhận thông tin sai. Ghi ngày cập nhật ở đầu mẫu và xem lại mỗi khi bạn đổi một điều kiện.",
      },
      {
        type: "scenario",
        title: "Mẫu xong rồi, dùng thế nào cho an toàn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa có mẫu «thời gian giao hàng». Khách Lan nhắn hỏi, nhưng đơn của chị ở vùng sâu, thường giao lâu hơn mẫu nói.",
            choices: [
              { label: "Gửi nguyên mẫu, điền tên và ngày như mọi khách", next: "bad_wrong" },
              { label: "Điền chỗ trống rồi sửa câu về thời gian cho đúng vùng của chị Lan, sau khi kiểm với bên vận chuyển", next: "s2" },
            ],
          },
          bad_wrong: {
            text: "Chị Lan tin mẫu, sắp lịch nhận hàng theo 4-6 ngày. Hàng tới sau hơn một tuần, chị nhắn lại bực bội và bạn phải xin lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Bạn kiểm xong và viết thời gian đúng cho vùng của chị. Bạn còn thấy mẫu thiếu trường hợp vùng xa.",
            choices: [
              { label: "Thêm một dòng «vùng xa có thể lâu hơn, em báo lại sau» vào mẫu", next: "good" },
              { label: "Để mẫu y nguyên, lần sau lại sửa tay", next: "bad_lazy" },
            ],
          },
          bad_lazy: {
            text: "Tuần sau bạn lại quên sửa tay cho khách vùng xa khác. Mẫu vẫn chưa đủ, và lỗi cũ lặp lại.",
            ending: "bad",
          },
          good: {
            text: "Mẫu giờ có thêm trường hợp vùng xa. Những khách sau đó nhận thông tin đúng, và bạn mất vài phút một lần để cập nhật thay vì mỗi lần gõ lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đếm câu lặp trước, viết mẫu sau.",
          "Bài sau: làm mẫu nghe như người viết, không như máy.",
        ],
      },
    ],
  },
  {
    id: 2486,
    slug: "mau-tra-loi-khong-nghe-nhu-may",
    title: "Chặng 54, Bài 7: Mẫu trả lời nghe như người viết, không như máy",
    subtitle: "Khách đọc ra giọng máy trong ba giây đầu, và họ không trả lời thư của máy.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗣️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một mẫu đúng thông tin nhưng nghe như thông báo loa phát thanh vẫn làm mất khách: họ thấy mình chỉ là một dòng trong danh sách. Sửa giọng không phải chuyện làm đẹp, mà là cách khách biết có người thật đang lo việc của họ.",
    openingQuestion:
      "AI soạn mẫu trả lời bắt đầu bằng «Cảm ơn Quý khách đã liên hệ. Chúng tôi rất tiếc về sự bất tiện này» cho một khách vừa báo hàng bị vỡ. Điều gì làm câu này nghe như máy nhất?",
    openingOptions: [
      "Nó giống hệt nhau cho mọi khách và không nhắc gì tới cái vỡ của họ",
      "Nó dùng chữ «Quý khách», vì chữ này chỉ dùng trong văn bản hành chính",
      "Nó quá ngắn, vì thư trả lời khách luôn phải dài ít nhất năm câu",
      "Nó có lời cảm ơn, vì cảm ơn ở đầu thư luôn nghe giả tạo",
    ],
    correctOption: 0,
    explanation:
      "Một câu mở đầu dùng được cho mọi khách và mọi sự cố là dấu hiệu rõ nhất của giọng máy: khách không thấy ai đã đọc chuyện của mình. «Quý khách» hay lời cảm ơn tự nó không sai, chúng chỉ nghe giả khi đứng một mình, không đi kèm điều cụ thể. Và độ dài thì không liên quan, vì thư ngắn mà nhắc đúng cái vỡ, đúng mã đơn vẫn nghe như người viết.",
    diagram: [
      { label: "AI soạn bản nháp đúng thông tin", arrow: true },
      { label: "Bạn đọc thành tiếng, gạch câu mình không bao giờ nói", arrow: true },
      { label: "Sửa theo mẫu thư thật bạn từng viết", arrow: true },
      { label: "Giữ nguyên số tiền, ngày, điều kiện" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: bộ phận chăm sóc khách của một cửa hàng trực tuyến",
      description:
        "Nhóm nhận ra các thư xin lỗi do AI soạn đều mở bằng cùng một câu và khách ít khi trả lời lại. Trưởng nhóm đưa cho AI ba thư đã được khách khen làm mẫu và dặn mỗi thư phải nhắc đúng một chi tiết riêng của khách. Số khách trả lời lại thư tăng lên, nhưng chính sách hoàn tiền vẫn do người thật quyết định. Đây là tình huống minh hoạ, không có số liệu thật.",
    },
    quiz: [
      {
        question: "Điều gì làm mẫu trả lời nghe lạnh như máy?",
        options: [
          "Mở và kết giống nhau cho mọi khách, không nhắc việc của họ",
          "Xưng «anh/chị» thay vì «Quý khách» trong mọi thư",
          "Trả lời chỉ vài dòng khi khách hỏi việc đơn giản",
          "Nhắc tên khách ngay câu đầu, đúng chỗ khách ghi",
        ],
        correct: 0,
        explanation:
          "Giọng máy đến từ sự chung chung: câu mở và câu kết dùng được cho bất kỳ ai. Xưng «anh/chị» là hợp lý với nhiều khách, thư ngắn cho việc đơn giản là tôn trọng thời gian khách, và gọi đúng tên khách là điều khách thích, không phải nguyên nhân khiến thư nghe lạnh.",
      },
      {
        question: "Cách nhanh nhất để AI viết đúng giọng của bạn là gì?",
        options: [
          "Đưa hai, ba thư bạn từng viết làm mẫu",
          "Ghi «viết giọng chuyên nghiệp, thân thiện, chân thành» vào yêu cầu",
          "Bảo AI «viết như một người bán hàng giỏi nhất»",
          "Để AI tự chọn giọng rồi nhận bản đầu tiên",
        ],
        correct: 0,
        explanation:
          "Mỗi người hiểu «thân thiện, chân thành» một kiểu, còn ba thư thật thì chỉ có một cách đọc. AI bắt chước mẫu tốt hơn là làm theo tính từ. Bảo nó «giỏi nhất» không cho nó thông tin nào thêm, và để nó tự chọn giọng là nhận giọng trung bình của hàng triệu thư.",
      },
      {
        question:
          "AI viết «Chúng tôi sẽ hoàn tiền trong 24 giờ» nhưng chính sách công ty không nói vậy. Bạn nên làm gì?",
        options: [
          "Xoá hoặc thay bằng đúng điều công ty đã quy định",
          "Giữ lại, vì cam kết cụ thể làm khách yên tâm hơn",
          "Giữ lại nhưng đổi 24 giờ thành 48 giờ cho an toàn",
          "Hỏi lại AI xem câu đó có đúng không",
        ],
        correct: 0,
        explanation:
          "Đây là cam kết AI tự thêm, không có trong chính sách, nên phải thay bằng điều công ty thật sự làm. Giữ hay đổi con số vẫn là bịa ra một cam kết mới, chỉ khác con số. Hỏi lại chính AI không phải kiểm chứng, vì nó có thể xác nhận luôn điều vừa nghĩ ra.",
      },
      {
        question: "Đọc thành tiếng bản trả lời trước khi gửi giúp được gì?",
        options: [
          "Phát hiện câu mà chính bạn không bao giờ nói",
          "Kiểm tra lỗi chính tả, việc tai làm tốt hơn mắt",
          "Đếm xem thư đủ 120 chữ chưa",
          "Để AI học giọng đọc của bạn cho lần sau",
        ],
        correct: 0,
        explanation:
          "Khi đọc thành tiếng, những câu bạn không bao giờ nói ra miệng sẽ vấp ngay, đó chính là chỗ giọng máy. Lỗi chính tả mắt thường nhìn ra tốt hơn, đếm chữ không cần đọc thành tiếng, và AI không nghe bạn đọc để học gì cả.",
      },
      {
        question: "Khi nhờ AI sửa giọng, chỗ nào phải giữ nguyên?",
        options: [
          "Số tiền, ngày, tên và điều kiện đã quy định, không được đổi",
          "Mọi câu chào vì khách đã quen thuộc",
          "Độ dài của thư, vì sửa giọng thì không được đổi chữ",
          "Chỉ tên khách, còn lại cứ để AI viết lại",
        ],
        correct: 0,
        explanation:
          "Sửa giọng là đổi cách nói, không đổi điều được nói: số tiền, ngày, tên và điều kiện phải y nguyên. Câu chào thì chính là chỗ hay cần sửa cho đỡ sáo, và thư có thể ngắn hay dài hơn tuỳ chỗ cần. Giữ mỗi tên khách là chưa đủ, vì AI có thể đổi luôn cả số tiền.",
      },
    ],
    keyTakeaways: [
      "Giọng máy đến từ câu chung chung dùng được cho mọi khách.",
      "Đưa cho AI hai, ba thư thật của bạn làm mẫu giọng, thay vì tính từ.",
      "Đọc thành tiếng: câu nào bạn không nói ra miệng thì sửa.",
      "AI có thể thêm cam kết không có thật, nên soát từng lời hứa.",
      "Sửa giọng không được đổi số tiền, ngày, tên, điều kiện.",
    ],
    practicePrompt: {
      question:
        "Bản nháp AI viết: «Chúng tôi luôn đặt khách hàng làm trung tâm. Đơn của anh sẽ được xử lý trong 24 giờ.» Chính sách thật là 3 ngày làm việc. Cách sửa tốt nhất?",
      options: [
        "Bỏ câu sáo, sửa thành «đơn của anh sẽ xử lý trong 3 ngày làm việc» và thêm tên sự việc của anh",
        "Giữ cả hai câu vì nghe chuyên nghiệp và khách thích nghe nhanh",
        "Đổi 24 giờ thành 2 ngày để ở giữa cho khách đỡ thất vọng",
        "Bỏ hết câu về thời gian để thư không bị sai",
      ],
      correct: 0,
      explanation:
        "Câu «đặt khách hàng làm trung tâm» là sáo rỗng, bỏ đi; «24 giờ» là cam kết bịa, phải thay bằng 3 ngày làm việc đúng chính sách. Đổi thành 2 ngày vẫn là bịa, còn bỏ hết thời gian thì khách không biết bao giờ có tin.",
    },
    summary: {
      keyIdea: "Mẫu nghe như người viết khi nó nhắc đúng việc của khách và nói bằng câu bạn thật sự nói.",
      formula: "Bản nháp AI + mẫu thư thật của bạn + đọc thành tiếng = giọng của bạn.",
      commonMistake: "Nhờ AI viết «thân thiện hơn» rồi gửi, mà không soát xem nó có tự thêm lời hứa.",
      action: "Lấy một mẫu AI soạn, đọc thành tiếng và gạch mọi câu bạn không bao giờ nói.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một mẫu trả lời AI soạn cho bạn (hoặc nhờ AI soạn một mẫu thư xin lỗi). Đọc thành tiếng, gạch tối thiểu ba câu nghe không giống bạn. Nhờ AI viết lại với hai thư bạn từng gửi làm mẫu giọng, rồi đối chiếu số tiền, ngày, điều kiện với chính sách thật của bạn.",
      secondary: "Ghi lại ba câu sáo bạn hay gặp nhất để lần sau dặn AI tránh ngay từ đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách nhắn hàng bị vỡ và nhận về câu «Chúng tôi rất tiếc về sự bất tiện này». Thông tin đúng, nhưng khách biết ngay không ai đã đọc chuyện của mình. Bài này dạy bạn nhận ra giọng máy và sửa nó mà không làm mất thông tin.",
      },
      {
        type: "feynman",
        title: "Giọng máy đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung hai cách báo tin ở nhà ga: tiếng loa phát chung «quý khách lưu ý», và nhân viên quầy nhìn bạn nói «chuyến bạn đi trễ mười phút, đợi ở cửa số hai».",
        columns: ["Thành phần", "Loa phát thanh nhà ga", "Mẫu trả lời nghe như máy"],
        rows: [
          ["Người nhận", "Hàng trăm người cùng nghe", "Mọi khách đều nhận cùng một câu"],
          ["Điều được nói", "Chung chung, ai cũng áp dụng được", "Xin lỗi chung, không nhắc việc của khách"],
          ["Cảm giác", "Không ai đang lo việc của tôi", "Khách thấy mình chỉ là một dòng trong danh sách"],
          ["Cách sửa", "Nhân viên quầy nói riêng với một người", "Nhắc đúng việc và đúng tên của khách đó"],
        ],
        oneLiner: "Giọng máy là tiếng loa phát chung; giọng người là nói riêng với đúng người đó về đúng việc của họ.",
      },
      { type: "heading", text: "Ba dấu hiệu giọng máy" },
      {
        type: "paragraph",
        text: "Một: câu mở và câu kết dùng được cho mọi khách. Hai: những tính từ lớn nhưng rỗng như «luôn đặt khách hàng làm trung tâm». Ba: lời hứa nghe chắc chắn mà bạn chưa từng cam kết. Hai dấu hiệu đầu làm thư lạnh; dấu hiệu thứ ba làm công ty mắc nợ khách một điều không có thật.",
      },
      {
        type: "flow",
        title: "Từ bản nháp của AI tới thư mang giọng bạn",
        steps: [
          {
            label: "AI soạn bản nháp",
            detail: "Bạn đưa dữ kiện (việc của khách, chính sách thật) và hai, ba thư bạn từng viết làm mẫu giọng. AI chỉ có thể bắt chước điều bạn đưa cho nó.",
          },
          {
            label: "Đọc thành tiếng",
            detail: "Đọc chậm, đánh dấu mọi câu bạn không bao giờ nói ra miệng. Đó thường là câu sáo, hoặc câu dài hơn hơi thở của người thường.",
          },
          {
            label: "Soát lời hứa",
            detail: "Mỗi con số, ngày, cam kết phải có trong chính sách thật. Cái nào AI tự thêm vào thì xoá hoặc thay bằng điều công ty đã quy định.",
          },
          {
            label: "Thêm một chi tiết riêng",
            detail: "Một chi tiết mà chỉ khách này có: tên món bị vỡ, ngày đặt, điều họ vừa nói. Một chi tiết là đủ để thư không còn dùng được cho người khác.",
          },
          {
            label: "Gửi và ghi lại",
            detail: "Sau khi gửi, ghi chỗ bạn phải sửa nhiều nhất để lần sau dặn AI tránh ngay từ đầu.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nghe như máy",
          text: "«Cảm ơn Quý khách đã liên hệ. Chúng tôi rất tiếc về sự bất tiện này và luôn đặt khách hàng làm trung tâm. Đơn sẽ được xử lý sớm nhất có thể.»",
        },
        right: {
          label: "Nghe như người viết",
          text: "«Chào chị Lan, em rất tiếc cái bình gốm của chị bị vỡ khi giao. Em gửi lại cho chị một cái mới, chị chụp giúp em tấm ảnh hộp bị móp nhé.»",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản trả lời AI soạn cho khách báo hàng vỡ",
        task: "Khách nhắn: «Bình gốm tôi đặt bị vỡ khi nhận». Chính sách của bạn: đổi cái mới nếu khách gửi ảnh trong 3 ngày. Bạn không có mã vận đơn nào trong dữ kiện. Đánh dấu những câu AI tự thêm hoặc làm thư nghe như máy.",
        segments: [
          { text: "Chào chị, em rất tiếc cái bình gốm của chị bị vỡ khi nhận." },
          {
            text: "Chúng tôi luôn đặt khách hàng làm trung tâm và mong Quý khách thông cảm về sự bất tiện này.",
            error: "Câu sáo rỗng, không nhắc gì tới việc của khách; thêm nữa, đổi từ «em» sang «chúng tôi» làm đổi luôn giọng giữa thư.",
          },
          { text: "Chị gửi giúp em ảnh cái bình vỡ trong vòng 3 ngày, em sẽ đổi cái mới cho chị." },
          {
            text: "Mã vận đơn VN2831 cho thấy kiện hàng đã bị rơi tại kho trung chuyển.",
            error: "Dữ kiện không có mã vận đơn hay chuyện rơi tại kho; AI bịa ra mã và nguyên nhân cho nghe chắc chắn.",
          },
          {
            text: "Chúng tôi sẽ hoàn tiền trong 24 giờ kèm phiếu giảm giá 20% cho đơn sau.",
            error: "Chính sách chỉ nói đổi cái mới nếu có ảnh; hoàn tiền 24 giờ và phiếu 20% là cam kết AI tự thêm.",
          },
          { text: "Có gì chưa rõ chị cứ nhắn em nhé." },
        ],
      },
      {
        type: "callout",
        label: "Bạn là người ký tên",
        text: "Nếu AI viết «hoàn tiền trong 24 giờ» và bạn gửi đi, công ty đã cam kết điều đó với khách, kể cả khi chưa ai quyết. Mọi lời hứa trong thư đều phải khớp với điều công ty thật sự làm; chưa chắc thì hỏi người có thẩm quyền trước khi gửi.",
      },
      {
        type: "scenario",
        title: "Sửa bản nháp trước khi gửi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản nháp AI đã đúng chính sách nhưng mở bằng «Chúng tôi xin chân thành cảm ơn Quý khách đã liên hệ». Bạn chưa gửi.",
            choices: [
              { label: "Gửi luôn, vì thông tin đã đúng", next: "bad_send" },
              { label: "Đọc thành tiếng rồi sửa câu mở thành lời nói của bạn, nhắc đúng cái bình vỡ", next: "s2" },
            ],
          },
          bad_send: {
            text: "Khách đọc câu đầu và thấy đây là thư soạn sẵn. Họ gửi ảnh nhưng thêm một dòng than phiền rằng chẳng ai đọc tin của mình.",
            ending: "bad",
          },
          s2: {
            text: "Thư đã nghe như bạn nói. Nhưng bạn thấy còn một câu «sẽ xử lý sớm nhất có thể» rất mơ hồ.",
            choices: [
              { label: "Đổi thành «em đổi cái mới ngay khi nhận ảnh chị gửi»", next: "good" },
              { label: "Giữ nguyên vì thư đã đủ dài", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Khách không biết bao giờ có cái mới nên nhắn hỏi lại hai lần, và bạn mất thêm thời gian trả lời.",
            ending: "bad",
          },
          good: {
            text: "Thư có đúng giọng của bạn và khách biết chính xác điều sẽ xảy ra tiếp theo. Chị gửi ảnh ngay trong ngày.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đúng thông tin chưa đủ; khách phải thấy có người đã đọc chuyện của họ.",
          "Bài sau: nói không với khách mà vẫn giữ được khách.",
        ],
      },
    ],
  },
  {
    id: 2487,
    slug: "email-tu-choi-lich-su-khong-mat-quan-he",
    title: "Chặng 54, Bài 8: Email từ chối khéo: nói không mà vẫn giữ được khách",
    subtitle: "Từ chối tốt không phải câu «không» mềm hơn, mà là một «không» kèm theo một đường đi khác.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Có những việc bạn không thể nhận: giảm giá quá mức, giao gấp hơn khả năng, thêm tính năng ngoài hợp đồng. Từ chối sai cách mất khách; từ chối khéo thì khách thường ở lại, vì họ biết rõ giới hạn và có lựa chọn khác để đi tiếp.",
    openingQuestion:
      "Một khách quen xin giảm 30%, trong khi công ty chỉ cho phép tối đa 10% với đơn lớn. Bạn nhờ AI viết email từ chối. Điều gì quyết định thư này giữ được khách?",
    openingOptions: [
      "Nói rõ điều chưa làm được và đưa kèm một lựa chọn khác có thật",
      "Xin lỗi thật nhiều để khách thấy bạn rất có thành ý, việc khác nói sau",
      "Viết rất ngắn, chỉ «không được» để khách khỏi hy vọng",
      "Hứa sẽ cố xin cấp trên xem xét để khách còn mong",
    ],
    correctOption: 0,
    explanation:
      "Khách ở lại khi họ hiểu giới hạn và vẫn còn đường đi tiếp: «giảm 30% chưa làm được, nhưng đặt từ 50 thùng thì giảm 10%». Xin lỗi nhiều khiến thư nghe yếu mà vẫn không cho khách lựa chọn nào. Từ chối cụt một dòng nghe như đóng cửa. Hứa «cố xin cấp trên» khi bạn biết chắc không được là nuôi hy vọng giả, và lần sau khách sẽ thất vọng gấp đôi.",
    diagram: [
      { label: "Bạn nêu giới hạn và lựa chọn thật của công ty", arrow: true },
      { label: "AI soạn ba cách từ chối", arrow: true },
      { label: "Bạn chọn cách hợp quan hệ với khách này", arrow: true },
      { label: "Gửi sau khi soát mọi con số và lời hứa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhà cung cấp bao bì cho các cửa hàng nhỏ",
      description:
        "Một khách lâu năm xin giảm giá mạnh cho đơn lần này. Người phụ trách nhờ AI soạn ba bản từ chối với cùng dữ kiện: mức giảm tối đa, điều kiện số lượng, thời hạn. Cô chọn bản nói rõ giới hạn và mở ra một mức giảm có điều kiện. Khách đặt thêm số lượng để được mức giảm đó. Đây là tình huống minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      {
        question: "Thành phần nào giúp email từ chối mà khách vẫn ở lại?",
        options: [
          "Nói rõ điều không làm được và đưa một lựa chọn khác kèm theo",
          "Xin lỗi thật nhiều lần để khách thấy thành ý",
          "Giải thích dài về chi phí nội bộ của công ty",
          "Từ chối ngắn một dòng để khách khỏi hy vọng",
        ],
        correct: 0,
        explanation:
          "Khách cần hai thứ: hiểu rõ giới hạn và biết còn đường khác. Xin lỗi nhiều lần làm thư yếu mà không cho gì, giải thích chi phí nội bộ làm khách thấy bị chất vấn, còn một dòng cụt nghe như đóng cửa với khách quen.",
      },
      {
        question: "AI soạn ba cách từ chối cho cùng một khách. Bạn chọn bản nào?",
        options: [
          "Bản hợp với tình huống và quan hệ với khách này",
          "Bản nào AI viết nghe lịch sự và dài nhất",
          "Bản nào có nhiều lời xin lỗi và cảm ơn nhất trong cả thư",
          "Bản đầu tiên AI đưa ra, vì nó thường tốt nhất",
        ],
        correct: 0,
        explanation:
          "Khách quen lâu năm và khách mới cần cách nói khác nhau, nên tiêu chí là tình huống, không phải độ dài hay số lời xin lỗi. Bản đầu tiên không có lý do gì tốt hơn hai bản sau, và bản dài nhất chỉ là bản nhiều chữ nhất.",
      },
      {
        question:
          "Khách xin giảm 30%, công ty tối đa giảm 10% khi mua từ 50 thùng. Câu nào phù hợp nhất?",
        options: [
          "Giảm 30% chúng tôi chưa làm được; mua từ 50 thùng thì giảm 10%",
          "Giảm 30% chúng tôi chưa làm được, mong Quý khách thông cảm",
          "Chúng tôi sẽ cố xin cấp trên giảm 30% cho Quý khách nhé",
          "Giảm 20% nếu Quý khách đặt thử 10 thùng trước rồi tính lại giá sau",
        ],
        correct: 0,
        explanation:
          "Câu đúng nêu rõ điều không làm được và mở ra đường đi thật theo chính sách. Câu thứ hai chỉ từ chối cụt, câu thứ ba hứa xin cấp trên điều đã biết là không được, còn câu thứ tư cam kết mức 20% không có trong chính sách.",
      },
      {
        question: "Vì sao không nên để AI tự đề xuất mức giảm thay thế?",
        options: [
          "AI không biết biên lợi nhuận của công ty",
          "Mức AI đề xuất luôn quá cao, nên công ty sẽ lỗ mỗi đơn",
          "AI không tính được phần trăm nên con số nào cũng sai",
          "Khách sẽ nhận ra con số do máy nghĩ ra",
        ],
        correct: 0,
        explanation:
          "Mức giảm phụ thuộc biên lợi nhuận và chính sách giá, những thứ AI chưa thấy. Nó không luôn đề xuất quá cao, cũng có thể sai, và tính phần trăm đơn giản thì nó làm được. Khách không nhận ra con số do máy nghĩ, nhưng hậu quả là bạn phải giữ lời hứa đó.",
      },
      {
        question: "Điều nào KHÔNG nên có trong email từ chối?",
        options: [
          "Lời hứa «lần sau chắc chắn giảm»",
          "Một lựa chọn thay thế có điều kiện rõ ràng",
          "Lời cảm ơn vì khách đã quan tâm sản phẩm",
          "Số điện thoại để khách gọi trao đổi thêm",
        ],
        correct: 0,
        explanation:
          "Một lời hứa cho tương lai mà bạn chưa có quyền cam kết sẽ trở thành món nợ. Lựa chọn thay thế có điều kiện, lời cảm ơn và số điện thoại đều là những điều tốt: chúng cho khách đường đi và cho thấy có người thật đang lo việc của họ.",
      },
    ],
    keyTakeaways: [
      "Từ chối khéo = điều không làm được + một lựa chọn khác có thật.",
      "Nhờ AI soạn ba cách rồi chọn theo tình huống và quan hệ với khách.",
      "Con số và điều kiện thay thế do bạn quyết, không để AI nghĩ ra.",
      "Không hứa điều chưa có quyền cam kết, kể cả «lần sau».",
      "Đọc thành tiếng: từ chối khéo nghe như người nói với người.",
    ],
    practicePrompt: {
      question:
        "Khách xin giao gấp trong 1 ngày, trong khi bạn chỉ làm được 3 ngày. Câu từ chối nào tốt nhất?",
      options: [
        "Giao 1 ngày em chưa làm được; em giao trong 3 ngày, hoặc phần gấp em tách ra giao trước nếu anh cần",
        "Em sẽ cố giao trong 1 ngày nếu được, anh đợi em nhé",
        "Xin lỗi anh rất nhiều, bên em không làm được",
        "Giao trong 2 ngày em cam kết, chắc chắn không trễ",
      ],
      correct: 0,
      explanation:
        "Câu đúng nói rõ giới hạn (1 ngày chưa được, 3 ngày được) và mở một lựa chọn có thật (tách phần gấp). «Cố giao nếu được» là hứa mơ hồ, xin lỗi cụt không cho đường đi, còn cam kết 2 ngày là con số không có trong khả năng.",
    },
    summary: {
      keyIdea: "Từ chối khéo là nói rõ giới hạn và mở một đường đi khác có thật.",
      formula: "Điều chưa làm được + lý do ngắn + một lựa chọn thay thế có điều kiện rõ ràng.",
      commonMistake: "Để AI tự nghĩ ra mức giảm hay cam kết thay thế.",
      action: "Nghĩ một yêu cầu khách hay xin mà bạn phải từ chối, rồi viết trước lựa chọn thay thế thật của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại yêu cầu bạn thường phải từ chối (giảm giá, giao gấp, thêm việc ngoài thoả thuận). Ghi rõ giới hạn thật của bạn và một lựa chọn thay thế có điều kiện. Nhờ AI soạn ba cách từ chối, chọn một bản, đọc thành tiếng, rồi lưu thành mẫu có chỗ trống cho tên khách và con số.",
      secondary: "Gửi bản đó cho một đồng nghiệp đọc thử và hỏi họ có thấy cụt hay mềm quá không.",
    },
    sections: [
      {
        type: "lead",
        text: "Một khách quen nhắn: «Em giảm cho anh 30% nhé». Bạn biết mình không làm được, nhưng không muốn mất khách. Bài này dạy cách nhờ AI soạn nhiều cách từ chối và chọn cách hợp nhất, mà vẫn giữ quyền quyết định con số và lời hứa.",
      },
      {
        type: "feynman",
        title: "Từ chối khéo đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung quán cơm hết món: chủ quán không chỉ nói «hết rồi», mà nói «món này hết, bên em còn món gần giống, hoặc anh ghé chiều mai».",
        columns: ["Thành phần", "Chủ quán cơm hết món", "Email từ chối khéo"],
        rows: [
          ["Điều chưa được", "«Món này hết rồi»", "«Giảm 30% em chưa làm được»"],
          ["Lý do ngắn", "«Hôm nay mua ít nên hết sớm»", "Một lý do ngắn, không kể chi phí nội bộ"],
          ["Lựa chọn khác", "«Còn món gần giống, hoặc chiều mai»", "«Mua từ 50 thùng thì giảm 10%»"],
          ["Kết quả", "Khách chọn món khác, vẫn quay lại", "Khách có đường đi tiếp, vẫn ở lại"],
        ],
        oneLiner: "Từ chối khéo là nói «món này hết» kèm «còn món này»: một cánh cửa đóng và một cánh cửa mở.",
      },
      { type: "heading", text: "Ba cách từ chối cho cùng một yêu cầu" },
      {
        type: "paragraph",
        text: "Nhờ AI soạn ba bản với cùng dữ kiện: một bản ấm áp cho khách quen, một bản gọn cho khách mới, một bản trang trọng khi có người thứ ba đọc thư. Bạn chọn bản hợp tình huống. AI giỏi đổi giọng; việc của bạn là giữ con số và điều kiện y nguyên ở cả ba bản.",
      },
      {
        type: "flow",
        title: "Từ yêu cầu khó tới email từ chối khéo",
        steps: [
          {
            label: "Ghi giới hạn thật",
            detail: "Viết ra điều công ty làm được và không làm được: mức giảm tối đa, điều kiện số lượng, thời hạn. Đây là dữ kiện bạn đưa cho AI, không để nó đoán.",
          },
          {
            label: "Nhờ AI soạn ba bản",
            detail: "Yêu cầu ba giọng khác nhau cùng dữ kiện. Dặn rõ: không thêm mức giảm, ngày hay điều kiện nào ngoài danh sách bạn đưa.",
          },
          {
            label: "Chọn theo tình huống",
            detail: "Khách quen lâu năm, khách mới, hay thư có sếp đọc cùng: mỗi trường hợp hợp một bản. Tiêu chí là quan hệ, không phải bản dài nhất.",
          },
          {
            label: "Soát lời hứa",
            detail: "Mỗi con số, điều kiện, thời hạn phải khớp chính sách. Xoá mọi câu kiểu «sẽ cố xin cấp trên» khi bạn biết chắc không được.",
          },
          {
            label: "Đọc thành tiếng rồi gửi",
            detail: "Nghe như người nói với người thì gửi. Nghe cụt hoặc nịnh quá thì sửa lại một lần nữa.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Từ chối làm mất khách",
          text: "«Bên em không thể giảm 30%. Mong anh thông cảm.» Khách không biết còn đường nào, và thấy bị đóng cửa.",
        },
        right: {
          label: "Từ chối khéo",
          text: "«Giảm 30% bên em chưa làm được. Nếu anh đặt từ 50 thùng thì em giảm 10%, anh muốn em tính giá theo hướng đó không?»",
        },
      },
      {
        type: "callout",
        label: "Đừng để AI nghĩ ra ưu đãi",
        text: "AI rất sẵn lòng viết «chúng tôi sẽ giảm 15% cho đơn sau». Đó là cam kết bạn phải giữ. Mọi mức giảm, ngày và điều kiện do bạn đưa vào; nếu chưa chắc được phép, hỏi cấp có thẩm quyền trước khi gửi.",
      },
      {
        type: "scenario",
        title: "Khách quen xin giảm 30%",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Tuấn, khách quen hai năm, xin giảm 30% cho đơn 40 thùng. Chính sách: từ 50 thùng giảm 10%, không có mức nào cao hơn.",
            choices: [
              { label: "Nhờ AI tự đề xuất mức giảm cho khéo rồi gửi", next: "bad_ai" },
              { label: "Đưa AI chính sách thật và nhờ soạn ba bản từ chối có lựa chọn thay thế", next: "s2" },
            ],
          },
          bad_ai: {
            text: "AI viết «chúng tôi sẽ giảm 20% cho anh». Bạn gửi. Anh Tuấn đồng ý và đòi giữ mức đó, còn công ty không cho phép. Bạn phải xin lỗi và mất cả uy tín.",
            ending: "bad",
          },
          s2: {
            text: "Có ba bản: một ấm áp nhắc hai năm hợp tác, một gọn, một rất trang trọng. Anh Tuấn là khách quen và thường nhắn thân mật.",
            choices: [
              { label: "Chọn bản ấm áp, đổi câu cuối mời anh tăng lên 50 thùng để được giảm 10%", next: "good" },
              { label: "Chọn bản trang trọng vì nghe chuyên nghiệp nhất", next: "bad_cold" },
            ],
          },
          bad_cold: {
            text: "Anh Tuấn thấy thư xa cách so với cách hai bên vẫn trao đổi và trả lời ngắn: «Vậy để anh hỏi chỗ khác».",
            ending: "bad",
          },
          good: {
            text: "Anh Tuấn thấy rõ giới hạn và đường đi. Anh nhắn: «Để anh gom đơn tháng sau cho đủ 50 thùng». Quan hệ vẫn giữ nguyên.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một cánh cửa đóng, một cánh cửa mở: đó là từ chối khéo.",
          "Bài sau: nhắc lại khi đối tác im lặng ba ngày.",
        ],
      },
    ],
  },
  {
    id: 2488,
    slug: "nhac-lai-khi-doi-tac-im-lang",
    title: "Chặng 54, Bài 9: Nhắc lại khi đối tác im lặng ba ngày",
    subtitle: "Một lời nhắc tốt nói rõ việc cần làm và mốc ngày, chứ không nói «em nhắc lại nhé».",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⏰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn gửi báo giá hoặc xin xác nhận, rồi im lặng kéo dài. Phần lớn đối tác không từ chối mà chỉ quên hoặc bận. Một chuỗi hai email nhắc, rõ việc và nhã nhặn, mở lại cuộc trao đổi mà không làm ai khó chịu, còn nhắc mơ hồ hoặc nhắc dồn dập thì thường đẩy họ xa hơn.",
    openingQuestion:
      "Bạn gửi báo giá cho đối tác hôm thứ Hai và đến thứ Năm vẫn im lặng. Email nhắc đầu tiên nên có gì?",
    openingOptions: [
      "Một việc cụ thể cần họ làm và mốc ngày để trả lời",
      "Một lời trách nhẹ rằng thư trước có vẻ chưa được đọc",
      "Toàn bộ nội dung thư cũ dán lại để họ xem lại hết",
      "Chỉ lời xin lỗi vì đã làm phiền, không nêu việc gì",
    ],
    correctOption: 0,
    explanation:
      "Người im lặng thường không từ chối, chỉ chưa kịp nghĩ tới; họ cần biết việc gì, làm xong khi nào, và làm thế nào cho dễ. Lời trách nhẹ khiến họ phòng thủ thay vì trả lời. Dán lại cả thư cũ thêm việc cho họ đọc mà không nói họ cần làm gì. Một lời xin lỗi không nêu việc thì nhắc mà không cho họ cái gì để trả lời.",
    diagram: [
      { label: "Gửi việc lần đầu, ghi rõ hạn", arrow: true },
      { label: "Nhắc lần 1 sau vài ngày: việc cần làm và mốc ngày", arrow: true },
      { label: "Nhắc lần 2 ngắn hơn, đưa lựa chọn dễ trả lời", arrow: true },
      { label: "Vẫn im: đổi kênh hoặc hỏi người khác bên họ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kinh doanh dịch vụ in ấn",
      description:
        "Một nhân viên gửi báo giá cho nhiều khách và thường nhận về im lặng. Anh đổi cách nhắc: thư nhắc nêu rõ «chị chỉ cần trả lời ‘đồng ý’ hoặc ‘cần chỉnh’ trước thứ Sáu», thay vì «em nhắc lại báo giá». Số khách trả lời tăng, dù nhiều người vẫn từ chối. Đây là tình huống minh hoạ, không có số liệu thật.",
    },
    quiz: [
      {
        question: "Email nhắc đầu tiên nên có gì?",
        options: [
          "Một việc cần làm cụ thể và một mốc ngày để đối tác trả lời",
          "Lời trách nhẹ rằng thư trước chưa được đọc",
          "Toàn bộ nội dung thư cũ dán lại để đối tác xem",
          "Lời xin lỗi vì đã làm phiền, không nêu việc gì",
        ],
        correct: 0,
        explanation:
          "Một lời nhắc hiệu quả nói rõ việc và hạn. Lời trách làm đối tác phòng thủ, dán lại thư cũ thêm việc cho họ, và chỉ xin lỗi mà không nêu việc thì họ không biết phải trả lời điều gì.",
      },
      {
        question: "Vì sao email nhắc thứ hai nên ngắn hơn email nhắc thứ nhất?",
        options: [
          "Đối tác đã biết bối cảnh",
          "Vì đối tác chỉ đọc một thư mỗi tuần nên ta rút gọn",
          "Vì lần hai cần tỏ ra bực để đối tác hiểu sốt ruột",
          "Vì AI viết thư dài thường bị bộ lọc thư rác chặn",
        ],
        correct: 0,
        explanation:
          "Lần nhắc thứ hai, đối tác đã biết bối cảnh từ hai thư trước nên chỉ cần một câu và một câu hỏi dễ trả lời. Giả vờ bực chỉ làm quan hệ xấu đi, còn chuyện bộ lọc thư rác và «một thư mỗi tuần» không phải lý do chính.",
      },
      {
        question:
          "Bạn gửi báo giá thứ Hai, nhắc lần 1 sau 3 ngày, nhắc lần 2 sau 4 ngày kể từ lần 1. Lần nhắc thứ hai rơi vào thứ mấy?",
        options: [
          "Thứ Hai tuần sau (= thứ Hai + 3 + 4 = 7 ngày)",
          "Thứ Năm (= thứ Hai + 3, chỉ tính một lần)",
          "Chủ nhật (= thứ Hai + 6, đếm thiếu một ngày vì tính cả hai đầu)",
          "Thứ Ba tuần sau (= thứ Hai + 8, đếm dư một ngày)",
        ],
        correct: 0,
        explanation:
          "Thứ Hai cộng 3 ngày là thứ Năm, cộng thêm 4 ngày nữa là 7 ngày kể từ lúc đầu, tức thứ Hai tuần sau. Thứ Năm mới là lần nhắc đầu, Chủ nhật là đếm thiếu một ngày và thứ Ba tuần sau là đếm dư một ngày.",
      },
      {
        question: "Đối tác vẫn im lặng sau hai lần nhắc. Bước hợp lý nhất là gì?",
        options: [
          "Đổi kênh: gọi điện hoặc hỏi người khác bên họ",
          "Gửi lần ba với tiêu đề viết hoa «GẤP» để họ thấy",
          "Coi như họ từ chối và xoá thông tin liên hệ",
          "Nhắc mỗi ngày đến khi họ trả lời thì thôi",
        ],
        correct: 0,
        explanation:
          "Nếu email không tới được họ, thêm một email giống hệt sẽ không khác gì. Đổi kênh (gọi điện, hoặc nhắn người khác cùng bên) là cách thử cái khác. Viết hoa «GẤP» nghe như bực, xoá liên hệ là bỏ khi chưa có câu trả lời, còn nhắc mỗi ngày là làm phiền.",
      },
      {
        question: "Khi nhờ AI soạn chuỗi nhắc, phần nào bạn tự điền?",
        options: [
          "Ngày đã gửi, tên đối tác và việc cụ thể cần họ làm",
          "Lời chào mở đầu, vì chỉ có một cách chào đúng",
          "Độ dài thư, vì AI không biết bao nhiêu là đủ",
          "Giọng văn, vì AI không viết được giọng lịch sự",
        ],
        correct: 0,
        explanation:
          "Ngày, tên và việc cụ thể là những thứ chỉ bạn biết; AI điền sai là khiến lời nhắc vô nghĩa hoặc sai. Lời chào, độ dài và giọng lịch sự là chỗ AI làm tốt và bạn chỉ cần đọc lại.",
      },
    ],
    keyTakeaways: [
      "Người im lặng thường quên hoặc bận, không phải từ chối.",
      "Email nhắc đầu: một việc cụ thể và một mốc ngày.",
      "Email nhắc thứ hai ngắn hơn, đưa lựa chọn dễ trả lời.",
      "Sau hai lần nhắc vẫn im: đổi kênh, đừng gửi thư thứ ba giống hệt.",
      "Ngày, tên, việc do bạn điền; AI chỉ viết quanh.",
    ],
    practicePrompt: {
      question:
        "Đối tác im lặng ba ngày sau báo giá. Câu nào làm email nhắc đầu tiên dễ được trả lời nhất?",
      options: [
        "Anh chỉ cần trả lời «đồng ý» hoặc «cần chỉnh» trước thứ Sáu, em sẽ làm tiếp ngay ạ",
        "Em nhắc lại báo giá hôm thứ Hai, mong anh xem giúp em",
        "Sao đến giờ anh vẫn chưa phản hồi báo giá của em vậy",
        "Em xin lỗi vì đã làm phiền anh nhiều",
      ],
      correct: 0,
      explanation:
        "Câu đúng cho đối tác việc rất nhỏ (chọn một trong hai) và một mốc ngày. «Em nhắc lại» chỉ nói là nhắc, câu hỏi trách cứ làm họ phòng thủ, và lời xin lỗi không nêu việc thì họ chẳng biết phải làm gì.",
    },
    summary: {
      keyIdea: "Nhắc hiệu quả khi nó làm việc của đối tác nhỏ lại: một việc, một hạn, một câu trả lời ngắn.",
      formula: "Nhắc 1: việc + hạn. Nhắc 2: ngắn + lựa chọn dễ. Vẫn im: đổi kênh.",
      commonMistake: "Gửi lời nhắc mơ hồ («em nhắc lại nhé») hoặc dồn dập mỗi ngày.",
      action: "Tìm một thư bạn đang chờ phản hồi và viết lại lời nhắc theo khuôn một việc, một hạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thư bạn đã gửi mà đối tác chưa trả lời (báo giá, xin xác nhận, xin tài liệu). Ghi ngày đã gửi, việc cụ thể cần họ làm và hạn bạn muốn. Nhờ AI soạn hai email nhắc từ dữ kiện đó, rồi đặt nhắc lịch cho lần gửi thứ nhất và thứ hai.",
      secondary: "Ghi lại xem đối tác trả lời sau lần nhắc nào để lần sau chọn khoảng cách hợp lý.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Năm rồi mà đối tác vẫn chưa trả lời báo giá bạn gửi hôm thứ Hai. Bạn ngại làm phiền, nhưng cũng không muốn để việc trôi. Bài này dạy cách soạn hai email nhắc đủ rõ để họ trả lời mà không khó chịu.",
      },
      {
        type: "feynman",
        title: "Nhắc lại đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tiệm may gọi khách: «Chị ơi, áo chị đặt may xong rồi, chị ghé lấy trước thứ Bảy nhé», chứ không phải «tiệm gọi nhắc lại áo ạ».",
        columns: ["Thành phần", "Tiệm may gọi khách", "Email nhắc đối tác"],
        rows: [
          ["Việc cụ thể", "Ghé lấy áo", "Trả lời «đồng ý» hoặc «cần chỉnh»"],
          ["Mốc ngày", "Trước thứ Bảy", "Trước ngày bạn chọn, ví dụ thứ Sáu"],
          ["Giọng", "Nhã nhặn, không trách", "Nhã nhặn, không trách"],
          ["Khi khách vẫn không tới", "Gọi lại bằng cách khác hoặc hỏi người nhà", "Đổi kênh: gọi điện hoặc hỏi người khác bên họ"],
        ],
        oneLiner: "Lời nhắc tốt là một việc nhỏ, một ngày rõ, nói bằng giọng mời chứ không trách.",
      },
      { type: "heading", text: "Vì sao người ta im lặng" },
      {
        type: "paragraph",
        text: "Phần lớn đối tác im lặng không phải vì từ chối. Họ bận, hoặc thư của bạn chìm giữa hàng chục thư khác, hoặc họ chưa biết phải trả lời gì. Vì vậy lời nhắc tốt làm việc của họ nhỏ lại, thay vì thêm áp lực.",
      },
      {
        type: "flow",
        title: "Hai lần nhắc và một lần đổi kênh",
        steps: [
          {
            label: "Gửi lần đầu có hạn",
            detail: "Ngay từ thư đầu, ghi rõ bạn cần họ làm gì và trước ngày nào. Nhờ vậy lời nhắc sau này có chỗ để bám vào.",
          },
          {
            label: "Nhắc lần 1",
            detail: "Sau vài ngày, gửi thư ngắn: nhắc việc, nhắc hạn, đưa lựa chọn dễ như «đồng ý» hoặc «cần chỉnh». Dẫn lại một dòng báo giá để họ khỏi tìm thư cũ.",
          },
          {
            label: "Nhắc lần 2",
            detail: "Ngắn hơn nữa, vì họ đã biết bối cảnh. Một câu hỏi duy nhất, dễ trả lời. Không trách, không viết hoa.",
          },
          {
            label: "Đổi kênh",
            detail: "Vẫn im thì đừng gửi thư thứ ba giống hệt: gọi điện hoặc nhắn một người khác cùng bên họ. Email có thể không tới được họ.",
          },
          {
            label: "Khép lại lịch sự",
            detail: "Nếu vẫn không có tin, viết một dòng khép lại: «Em để báo giá đó tới hết tuần, anh cần thì nhắn em». Bạn không bỏ, nhưng cũng không chờ mãi.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn hai email nhắc báo giá",
        task: "Bạn gửi báo giá cho chị Mai (công ty đối tác) hôm thứ Hai, chưa có phản hồi. Lắp yêu cầu để AI soạn hai email nhắc, cách nhau vài ngày.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              {
                text: "Viết email nhắc đối tác trả lời giúp tôi.",
                feedback: "AI không biết đối tác là ai, nhắc việc gì, nên ra thư chung chung mà ai cũng nhận được.",
              },
              {
                text: "Tôi gửi báo giá 120 triệu cho chị Mai hôm thứ Hai, chưa nhận phản hồi; cần chị xác nhận trước thứ Sáu.",
                good: true,
                feedback: "AI có người, việc, con số và hạn, nên lời nhắc bám vào việc thật.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Soạn hai email: lần 1 nêu việc và hạn, lần 2 ngắn hơn, cho chị chọn «đồng ý» hoặc «cần chỉnh».",
                good: true,
                feedback: "Hai lần nhắc có vai trò khác nhau, và lần 2 đưa một lựa chọn rất dễ trả lời.",
              },
              {
                text: "Soạn email khiến chị Mai phải trả lời ngay.",
                feedback: "Mục tiêu mơ hồ này dễ ra giọng ép buộc và đối tác thấy khó chịu.",
              },
            ],
          },
          {
            id: "tone",
            label: "Giọng",
            options: [
              {
                text: "Nhã nhặn, không trách, dưới 60 chữ mỗi thư, xưng «em» - «chị».",
                good: true,
                feedback: "Giọng, độ dài và cách xưng hô đều rõ, nên thư nhắc gọn và dùng ngay được.",
              },
              {
                text: "Nhấn mạnh rằng tôi đã chờ rất lâu để chị thấy thiếu sót.",
                feedback: "Giọng trách làm đối tác phòng thủ; họ ít khi trả lời một lời nhắc nghe như bị phạt.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "tone"],
            text: "Nhắc 1 (thứ Năm):\nChào chị Mai, em gửi chị báo giá 120 triệu hôm thứ Hai. Chị xác nhận giúp em trước thứ Sáu để em giữ lịch cho chị nhé.\n\nNhắc 2 (thứ Hai tuần sau):\nChào chị Mai, chị chỉ cần trả lời «đồng ý» hoặc «cần chỉnh» cho báo giá 120 triệu là em làm tiếp ạ.",
          },
          {
            requires: ["context"],
            text: "Kính gửi chị Mai,\n\nEm xin phép nhắc lại báo giá 120 triệu đã gửi hôm thứ Hai. Em rất mong nhận được phản hồi của chị sớm nhất có thể để tiện cho cả hai bên...\n\n(Đúng việc nhưng mơ hồ về hạn và không cho chị một lựa chọn dễ trả lời.)",
          },
          {
            text: "Chào anh Hùng, em nhắc lại báo giá 85 triệu em gửi hôm thứ Ba. Anh cho em biết sớm vì giá này chỉ giữ tới ngày mai.\n\n(Không có dữ kiện nên AI bịa tên người, con số và cả hạn giữ giá.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Nhắc không phải ép",
        text: "Có hạn thật mới ghi hạn. Nếu bạn bịa «giá chỉ giữ tới mai» để ép đối tác, bạn đang tạo áp lực giả và mất tin cậy khi họ phát hiện. Hạn trong thư nhắc phải là hạn bạn thực sự giữ.",
      },
      {
        type: "scenario",
        title: "Hai lần nhắc vẫn im lặng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã nhắc hai lần, cách nhau vài ngày, và chị Mai vẫn không trả lời. Bạn biết công ty chị có một anh đầu mối khác.",
            choices: [
              { label: "Gửi lần ba, tiêu đề viết hoa «GẤP», giọng bực hơn", next: "bad_angry" },
              { label: "Gọi điện cho chị Mai, hoặc nhắn anh đầu mối hỏi thăm tình hình", next: "s2" },
            ],
          },
          bad_angry: {
            text: "Chị Mai thấy thư viết hoa và giọng bực. Chị không trả lời, và lần sau chuyển sang nhà cung cấp khác dễ trò chuyện hơn.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gọi được. Chị Mai xin lỗi vì báo giá nằm trong thư chưa đọc và nói ngày mai sẽ trả lời.",
            choices: [
              { label: "Cảm ơn chị và gửi lại một dòng xác nhận việc, hạn mới sau cuộc gọi", next: "good" },
              { label: "Cảm ơn rồi thôi, không gửi gì thêm", next: "bad_loose" },
            ],
          },
          bad_loose: {
            text: "Ngày mai qua, chị Mai bận việc khác và lại quên. Cuộc gọi không để lại dấu vết nên bạn không có gì để nhắc dựa vào.",
            ending: "bad",
          },
          good: {
            text: "Dòng xác nhận sau cuộc gọi giúp chị Mai nhớ việc và hạn. Chị trả lời hôm sau và bạn không phải nhắc lần nữa.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lời nhắc tốt: một việc, một hạn, một câu trả lời ngắn.",
          "Bài sau: gom năm mẫu thành bộ mẫu của riêng bạn, có dòng cấm sửa.",
        ],
      },
    ],
  },
  {
    id: 2489,
    slug: "du-an-nho-bo-mau-tra-loi-cua-rieng-ban",
    title: "Chặng 54, Bài 10: Dự án nhỏ: bộ mẫu trả lời của riêng bạn, có dòng cấm sửa",
    subtitle: "Bộ mẫu tốt phân rõ chỗ người thật điền và chỗ AI không được phép tự thêm.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📚",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Năm mẫu trả lời rời rạc dễ lệch nhau và dễ bị sửa lung tung. Khi bạn gom chúng thành một bộ, đánh dấu rõ chỗ phải người thật điền và chỗ không được tự thêm, bạn có thứ cả nhóm dùng được mà không ai vô tình đổi điều đã được duyệt.",
    openingQuestion:
      "Khi gom năm mẫu trả lời thành một bộ, việc nào đáng làm TRƯỚC khi nhờ AI chỉnh giọng cho cả bộ?",
    openingOptions: [
      "Đánh dấu rõ chỗ phải người thật điền và chỗ AI không được sửa",
      "Đổi tất cả mẫu sang cùng một độ dài cho đều, kể cả chỗ cần người điền",
      "Xoá hết chỗ trống để mẫu đọc liền mạch hơn",
      "Cho AI tự quyết định câu nào là điều khoản bắt buộc",
    ],
    correctOption: 0,
    explanation:
      "Trước khi nhờ AI chỉnh giọng, bạn phải xác định điều gì không được động tới: điều kiện đã duyệt, số tiền, ngày, tên. Đánh dấu chúng trước thì AI chỉ sửa phần được phép sửa. Đổi mọi mẫu sang cùng độ dài là làm mất thông tin cần thiết, xoá chỗ trống làm AI điền bậy, còn để AI tự quyết điều khoản bắt buộc là giao cho máy quyết định điều chỉ người có quyền mới được quyết.",
    diagram: [
      { label: "Gom năm mẫu hay dùng nhất", arrow: true },
      { label: "Đánh dấu chỗ trống [...] và dòng cấm sửa", arrow: true },
      { label: "Nhờ AI chỉnh giọng, chỉ ở phần được phép", arrow: true },
      { label: "Thử trên 5 thư cũ, ghi lỗi rồi cập nhật mẫu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm chăm sóc khách của một cửa hàng trực tuyến",
      description:
        "Nhóm có năm mẫu trả lời nằm rải rác trong tin nhắn cá nhân của từng người. Trưởng nhóm gom thành một tệp duy nhất, đánh dấu chỗ trống bằng ngoặc vuông và ghi «không sửa» cạnh các điều kiện đổi trả đã được duyệt. Sau đó nhóm thử mẫu trên các thư cũ trước khi dùng thật. Đây là tình huống minh hoạ, không có số liệu thật.",
    },
    quiz: [
      {
        question: "«Dòng cấm sửa» trong bộ mẫu là gì?",
        options: [
          "Phần như điều kiện, cam kết đã được người có thẩm quyền duyệt",
          "Chữ in đậm để khách dễ nhìn thấy trong thư",
          "Dòng cuối cố định để kết thư cho lịch sự",
          "Phần AI được phép viết lại tuỳ ý cho mượt",
        ],
        correct: 0,
        explanation:
          "Dòng cấm sửa là những điều đã được người có thẩm quyền duyệt: điều kiện đổi trả, cam kết, giới hạn. Chữ in đậm và dòng kết chỉ là hình thức, còn phần AI được viết lại tuỳ ý là đối lập hoàn toàn với dòng cấm sửa.",
      },
      {
        question: "Chỗ nào trong mẫu phải do người thật điền?",
        options: [
          "Số tiền, ngày hẹn, tên khách",
          "Lời chào đầu thư vì mỗi khách cần một kiểu chào",
          "Câu cảm ơn cuối thư vì AI không biết cảm ơn",
          "Tiêu đề thư vì AI hay đặt tiêu đề dài",
        ],
        correct: 0,
        explanation:
          "Số tiền, ngày và tên là những thứ khách dùng để đối chiếu và làm theo, nên người thật phải điền và kiểm. Lời chào, câu cảm ơn và tiêu đề là chỗ AI làm tốt và bạn đọc lại là thấy.",
      },
      {
        question: "Mẫu có ô [SỐ TIỀN] và AI điền sẵn 1.200.000 đồng vì «nghe hợp lý». Bạn xử lý thế nào?",
        options: [
          "Không dùng; số tiền lấy từ báo giá thật của bạn",
          "Dùng, vì AI đã tính từ thông tin khách đưa trước đó",
          "Dùng nếu con số làm tròn gần với giá thị trường",
          "Dùng tạm rồi sửa sau khi khách phản hồi lại",
        ],
        correct: 0,
        explanation:
          "Con số AI điền chỉ «nghe hợp lý», không đến từ báo giá thật của bạn. Dùng vì «gần giá thị trường» hay «sửa sau» vẫn là gửi một con số chưa kiểm, và khách có thể dựa vào nó để quyết định.",
      },
      {
        question: "Bạn thử mẫu trên 5 thư cũ và 1 thư điền sai ngày. Cách xử lý đúng?",
        options: [
          "Ghi lại lỗi và thêm dòng nhắc kiểm ngày vào mẫu",
          "Bỏ thư đó ra khỏi bộ thử vì bốn thư còn lại đã đủ tốt rồi",
          "Coi là lỗi ngẫu nhiên, không cần ghi gì",
          "Bỏ cả mẫu vì một lỗi là mẫu hỏng",
        ],
        correct: 0,
        explanation:
          "Một lỗi khi thử là thông tin quý: nó chỉ ra chỗ mẫu dễ sai. Ghi lại và thêm dòng nhắc kiểm ngày là cách làm mẫu tốt hơn. Bỏ thư đó hay coi là ngẫu nhiên thì lỗi sẽ lặp lại, còn bỏ cả mẫu là phản ứng quá tay.",
      },
      {
        question: "Vì sao đánh dấu chỗ trống bằng ngoặc vuông như [TÊN KHÁCH]?",
        options: [
          "Để nhìn là biết chỗ nào chưa điền trước khi gửi",
          "Để AI hiểu đó là chỗ nó được tự điền",
          "Để khách thấy mẫu trông chuyên nghiệp hơn",
          "Vì ngoặc vuông là quy định bắt buộc của mọi hộp thư điện tử",
        ],
        correct: 0,
        explanation:
          "Ngoặc vuông là dấu hiệu thị giác: thấy nó còn trong thư nghĩa là chưa điền xong. Nó không nhằm để AI tự điền (ngược lại, là chỗ người thật điền), khách không bao giờ nên thấy nó, và hộp thư không quy định gì về ký hiệu này.",
      },
    ],
    keyTakeaways: [
      "Gom năm mẫu hay dùng nhất vào một nơi duy nhất.",
      "Đánh dấu chỗ trống bằng ngoặc vuông để nhìn là biết chưa điền.",
      "Đánh dấu dòng cấm sửa cho điều kiện và cam kết đã được duyệt.",
      "Số tiền, ngày, tên do người thật điền và kiểm.",
      "Thử mẫu trên thư cũ, ghi lỗi, rồi cập nhật mẫu.",
    ],
    practicePrompt: {
      question:
        "Mẫu «đổi trả» có dòng «Đổi trả trong 7 ngày kể từ ngày nhận hàng». AI đề nghị đổi thành «trong vòng một tuần» cho nghe mềm hơn. Bạn nên làm gì?",
      options: [
        "Đánh dấu dòng đó là cấm sửa, vì đó là điều kiện đã duyệt, không đổi cách diễn đạt",
        "Chấp nhận vì một tuần cũng là 7 ngày",
        "Đổi thành 10 ngày cho khách hài lòng hơn",
        "Bỏ dòng đó vì không ai đọc",
      ],
      correct: 0,
      explanation:
        "Điều kiện đã duyệt nên để nguyên văn, đánh dấu cấm sửa để lần sau AI và người khác không động tới. Đổi thành 10 ngày là cam kết mới không có thật, còn bỏ dòng thì khách không biết điều kiện để làm theo.",
    },
    summary: {
      keyIdea: "Bộ mẫu tốt là bộ phân rõ chỗ người thật điền, dòng cấm sửa và phần AI được tự do.",
      formula: "5 mẫu + chỗ trống [...] + dòng cấm sửa + thử trên thư cũ = bộ mẫu dùng được.",
      commonMistake: "Nhờ AI chỉnh giọng cả bộ mà chưa đánh dấu điều gì không được động tới.",
      action: "Gom năm mẫu hay dùng nhất của bạn vào một tệp và đánh dấu chỗ trống cùng dòng cấm sửa.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Gom năm câu trả lời bạn dùng nhiều nhất vào một tệp duy nhất. Với từng mẫu, đánh dấu chỗ người thật phải điền (số tiền, ngày, tên) bằng [ ] và ghi «KHÔNG SỬA» cạnh điều kiện hoặc cam kết đã được duyệt. Thử từng mẫu trên ba thư cũ và ghi lỗi gặp.",
      secondary: "Gửi bộ mẫu cho một đồng nghiệp đọc và hỏi họ có hiểu chỗ nào phải điền mà không cần hỏi bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có vài mẫu trả lời rải rác trong tin nhắn và ghi chú. Bài này gom chúng thành một bộ duy nhất và thêm hai lớp an toàn: chỗ người thật phải điền, và dòng không ai được sửa. Đó là khác biệt giữa một bộ mẫu dùng được và một bộ mẫu gây lỗi.",
      },
      {
        type: "feynman",
        title: "Bộ mẫu có dòng cấm sửa đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung tờ đơn in sẵn ở ngân hàng: có ô trống để bạn điền, và có khung ghi «phần dành cho ngân hàng, không viết vào đây».",
        columns: ["Thành phần", "Tờ đơn ở ngân hàng", "Bộ mẫu trả lời của bạn"],
        rows: [
          ["Ô trống", "Họ tên, số tiền, ngày", "[TÊN KHÁCH], [SỐ TIỀN], [NGÀY]"],
          ["Khung cấm viết", "Phần dành cho ngân hàng", "Dòng «KHÔNG SỬA» cho điều kiện đã duyệt"],
          ["Người được điền", "Khách hàng", "Người thật gửi thư, không phải AI"],
          ["Khi có thay đổi", "In lại tờ đơn mới", "Cập nhật mẫu và ghi ngày sửa"],
        ],
        oneLiner: "Bộ mẫu của bạn là tờ đơn in sẵn: ô trống cho người thật, khung cấm viết cho những điều đã được duyệt.",
      },
      { type: "heading", text: "Ba loại phần trong một mẫu" },
      {
        type: "paragraph",
        text: "Mỗi mẫu có ba loại phần. Phần giữ nguyên: điều kiện và cam kết đã duyệt, đánh dấu «KHÔNG SỬA». Phần trống: số tiền, ngày, tên, đánh dấu bằng ngoặc vuông cho người thật điền. Phần tự do: lời chào, cách dẫn dắt, câu nối, nơi AI được chỉnh giọng thoải mái.",
      },
      {
        type: "flow",
        title: "Lập bộ mẫu trong một buổi",
        steps: [
          {
            label: "Gom năm mẫu",
            detail: "Đưa năm câu trả lời bạn dùng nhiều nhất vào cùng một tệp. Ghi ngày cập nhật ở đầu tệp.",
          },
          {
            label: "Đánh dấu chỗ trống",
            detail: "Mọi thứ riêng của từng khách (tên, số tiền, ngày) đổi thành [TÊN], [SỐ TIỀN], [NGÀY]. Nhìn thấy ngoặc vuông còn trong thư nghĩa là chưa điền xong.",
          },
          {
            label: "Đánh dấu dòng cấm sửa",
            detail: "Điều kiện, cam kết, giới hạn đã được duyệt thì ghi «KHÔNG SỬA». Không chắc câu nào đã duyệt thì hỏi người có thẩm quyền, đừng đoán.",
          },
          {
            label: "Nhờ AI chỉnh giọng phần tự do",
            detail: "Dặn rõ: chỉ sửa phần tự do, không động tới dòng KHÔNG SỬA, không điền vào chỗ trống. Sau đó so lại với bản gốc.",
          },
          {
            label: "Thử trên thư cũ",
            detail: "Chạy mẫu trên ba đến năm thư cũ, ghi chỗ sai, rồi cập nhật mẫu. Thử trước khi dùng thật rẻ hơn sửa sau khi khách đã nhận.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mẫu chưa an toàn",
          text: "Không có dấu hiệu gì cho biết chỗ nào phải điền, chỗ nào không được sửa. AI chỉnh giọng thì đổi luôn cả điều kiện, và người dùng không biết chỗ nào cần kiểm.",
        },
        right: {
          label: "Mẫu có phân lớp",
          text: "Chỗ trống có [ ], điều kiện có «KHÔNG SỬA», lời chào tự do. AI chỉ chỉnh phần tự do; người gửi chỉ phải điền và kiểm phần trong ngoặc.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát mẫu báo giá AI vừa chỉnh giọng",
        task: "Mẫu gốc của bạn có: [TÊN KHÁCH], [SỐ TIỀN] (do người điền), và dòng KHÔNG SỬA: «Báo giá có hiệu lực 7 ngày kể từ ngày gửi». Bạn không có thông tin bảo hành hay đổi trả trong mẫu. Đánh dấu những chỗ AI tự thêm hoặc làm hỏng mẫu.",
        segments: [
          { text: "Chào [TÊN KHÁCH], em gửi anh/chị báo giá theo yêu cầu hôm qua." },
          { text: "Tổng chi phí là [SỐ TIỀN]." },
          {
            text: "Báo giá có hiệu lực 14 ngày kể từ ngày gửi.",
            error: "Dòng KHÔNG SỬA gốc ghi 7 ngày; AI đổi thành 14 ngày, tức thay đổi một điều kiện đã được duyệt.",
          },
          {
            text: "Sản phẩm được bảo hành 24 tháng và đổi trả miễn phí trong 30 ngày.",
            error: "Mẫu gốc không có bảo hành hay đổi trả; AI tự thêm hai cam kết công ty chưa từng đưa ra.",
          },
          {
            text: "Giá đã bao gồm đầy đủ thuế và phí.",
            error: "Mẫu gốc không nói về thuế; AI tự khẳng định điều cần hỏi bộ phận kế toán trước khi ghi vào thư.",
          },
          { text: "Anh/chị có câu hỏi gì cứ nhắn em nhé." },
        ],
      },
      {
        type: "callout",
        label: "Không chắc thì hỏi người có quyền",
        text: "Điều khoản về thuế, bảo hành, đổi trả hay bất cứ thứ gì có tính pháp lý thì không phải bạn hay AI tự quyết. Hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa vào mẫu, rồi đánh dấu nó là dòng KHÔNG SỬA.",
      },
      {
        type: "scenario",
        title: "Thử bộ mẫu trên thư cũ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã gom năm mẫu, đánh dấu chỗ trống và dòng KHÔNG SỬA. Trước khi dùng thật, bạn có ba thư cũ để thử.",
            choices: [
              { label: "Bỏ qua bước thử, dùng luôn cho khách thật vì mẫu nhìn ổn", next: "bad_skip" },
              { label: "Chạy mẫu trên ba thư cũ và ghi lại chỗ nào điền sai hoặc thiếu", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Mẫu «đổi trả» có một chỗ trống ngày bị bỏ sót, khách nhận thư ghi nguyên «[NGÀY]» ở giữa câu. Khách hỏi lại và bạn phải xin lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy một thư điền sai ngày vì mẫu không nhắc kiểm ngày. Ngoài ra, một mẫu thiếu chỗ trống cho tên sản phẩm.",
            choices: [
              { label: "Thêm dòng nhắc kiểm ngày và chỗ trống tên sản phẩm vào mẫu, ghi ngày cập nhật", next: "good" },
              { label: "Nhớ trong đầu rồi lần sau cẩn thận hơn", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Tuần sau đồng nghiệp dùng mẫu và mắc đúng lỗi đó, vì lỗi chỉ nằm trong đầu bạn chứ không trong mẫu.",
            ending: "bad",
          },
          good: {
            text: "Mẫu đã có dòng nhắc kiểm ngày và chỗ trống tên sản phẩm. Cả nhóm dùng được và ít phải hỏi lại bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bộ mẫu tốt: chỗ trống cho người thật, dòng cấm sửa cho điều đã duyệt.",
          "Bài sau: sang phần lịch họp và nhắc việc.",
        ],
      },
    ],
  },
];
