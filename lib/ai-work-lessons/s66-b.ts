import type { Lesson } from "../lesson-types";

// Chặng 66, bài 6-10. Giáo trình: scripts/curriculum/stage-66.json.
// Nội dung dạy khái niệm bền (đường đi của tín hiệu mạng, băng thông dùng chung,
// mạng khách, Wi-Fi công cộng); không nêu đường dẫn nút bấm hay thông số của hãng nào.
export const S66_B_LESSONS: Lesson[] = [
  {
    id: 2725,
    slug: "wifi-cham-do-modem-do-nha-mang-hay-do-may-ban",
    title: "Chặng 66, Bài 6: Wi-Fi chậm: lỗi ở máy bạn, ở bộ phát hay ở nhà mạng",
    subtitle: "Ba phép thử không cần biết kỹ thuật để khoanh vùng chỗ nghẽn trước khi gọi ai.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📶",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "9 giờ sáng bạn vào họp trực tuyến, hình đứng, tiếng đứt. Cả phòng nhìn bạn. Nếu bạn khởi động lại mọi thứ một cách ngẫu nhiên thì mất mười phút mà vẫn không biết lỗi ở đâu, lần sau lại bị lại. Ba phép thử đơn giản giúp bạn nói được với bộ phận IT hoặc nhà mạng: lỗi nằm ở máy tôi, ở bộ phát, hay ở đường vào nhà.",
    openingQuestion:
      "Họp trực tuyến giật lúc 9 giờ. Điện thoại của bạn, cùng mạng Wi-Fi, vẫn lướt mạng bình thường, chỉ máy tính xách tay bị giật. Điều nào gần đúng nhất?",
    openingOptions: [
      "Nhiều khả năng vấn đề nằm ở máy tính chứ không phải đường mạng",
      "Nhà mạng đang sự cố, vì đã giật thì luôn là lỗi của nhà mạng rồi",
      "Bộ phát Wi-Fi hỏng hoàn toàn, nên phải mua bộ phát mới ngay hôm nay",
      "Điện thoại luôn nhanh hơn máy tính nên so sánh này không cho biết gì",
    ],
    correctOption: 0,
    explanation:
      "Hai thiết bị cùng dùng một bộ phát và một đường vào nhà. Nếu điện thoại vẫn chạy ổn thì bộ phát và nhà mạng ít khả năng là thủ phạm chính, nên bạn nhìn vào máy tính: nhiều ứng dụng đang mở, đang tải bản cập nhật, hoặc ngồi quá xa bộ phát. Quy cho nhà mạng khi chưa thử gì là đoán. Bộ phát hỏng hoàn toàn thì điện thoại cũng mất mạng. Và so sánh hai thiết bị chính là phép thử rẻ nhất để khoanh vùng.",
    diagram: [
      { label: "Máy của bạn (máy tính, điện thoại)", arrow: true },
      { label: "Bộ phát Wi-Fi trong nhà hoặc văn phòng", arrow: true },
      { label: "Modem nối ra đường cáp của nhà mạng", arrow: true },
      { label: "Nhà mạng và Internet bên ngoài" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh hay bị giật hình khi họp buổi sáng. Cô thử ba phép: mở cùng cuộc họp trên điện thoại, đứng gần bộ phát Wi-Fi, rồi cắm dây mạng vào máy. Cuộc họp trên điện thoại mượt, cắm dây cũng mượt, chỉ giật khi ngồi ở cuối phòng. Kết luận của cô là sóng Wi-Fi yếu ở chỗ ngồi, không phải lỗi nhà mạng, nên cô xin IT dời bộ phát thay vì gọi tổng đài.",
    },
    quiz: [
      {
        question: "Vì sao nên thử cùng một việc trên hai thiết bị khác nhau cùng Wi-Fi?",
        options: [
          "Để biết lỗi nằm ở thiết bị nào hay ở đường mạng chung",
          "Vì hai thiết bị luôn giống nhau nếu mạng khỏe",
          "Vì thiết bị thứ hai sẽ tự động sửa giúp thiết bị thứ nhất bị chậm",
          "Vì nhà mạng chỉ nhận khiếu nại khi đã thử hai thiết bị",
        ],
        correct: 0,
        explanation:
          "Hai thiết bị cùng đi qua một bộ phát và một đường vào nhà, nên nếu chỉ một cái chậm thì lỗi gần thiết bị đó. Kết quả hai máy khác nhau là chuyện bình thường vì cấu hình khác nhau. Thiết bị này không sửa được thiết bị kia, và nhà mạng không đặt điều kiện như vậy cho khiếu nại.",
      },
      {
        question: "Bạn cắm dây mạng vào máy tính và cuộc họp hết giật. Điều này gợi ý gì?",
        options: [
          "Đường vào nhà ổn, chỗ yếu có thể là sóng Wi-Fi tới máy bạn",
          "Nhà mạng chắc chắn đã sửa xong sự cố đúng lúc bạn cắm dây",
          "Dây mạng làm Internet nhanh hơn gấp nhiều lần gói cước bạn đang trả tiền",
          "Wi-Fi hỏng vĩnh viễn và chỉ còn dùng dây từ nay về sau thôi",
        ],
        correct: 0,
        explanation:
          "Dây mạng bỏ qua đoạn sóng vô tuyến, nên nếu có dây mà mượt thì đoạn từ bộ phát tới máy là nghi can: tường dày, quá xa, nhiều thiết bị. Trùng hợp với việc nhà mạng vừa sửa là khả năng nhỏ. Dây không làm vượt quá gói cước, nó chỉ ổn định hơn. Wi-Fi yếu thường cải thiện bằng cách đổi chỗ ngồi hoặc chỗ đặt bộ phát.",
      },
      {
        question: "Tất cả thiết bị trong nhà đều chậm, kể cả khi đứng sát bộ phát và cắm dây. Nên làm gì tiếp?",
        options: [
          "Ghi lại giờ và kết quả các phép thử rồi báo nhà mạng",
          "Mua máy tính mới vì máy cũ thường là nguyên nhân của mọi thứ chậm",
          "Đổi mật khẩu Wi-Fi vì mật khẩu cũ làm mạng chạy chậm đi từng ngày",
          "Tắt bộ phát suốt ngày để nó nghỉ rồi bật lại vào cuối tuần cho khỏe",
        ],
        correct: 0,
        explanation:
          "Khi mọi thiết bị, kể cả có dây, đều chậm, phần chung còn lại là modem và đường của nhà mạng. Báo kèm giờ và kết quả thử giúp họ kiểm tra nhanh hơn. Máy mới không giúp vì máy không phải nghi can. Đổi mật khẩu không tăng tốc. Tắt bộ phát cả ngày không giải quyết đường truyền.",
      },
      {
        question: "Việc nào hợp lý nhất để thử trước khi gọi bộ phận IT của công ty?",
        options: [
          "Đóng bớt tab, ứng dụng đang tải nặng rồi thử lại cuộc họp",
          "Gỡ hết phần mềm trên máy để máy nhẹ và nhanh hơn, khỏi phải hỏi ai",
          "Gọi IT ngay khi hình vừa đứng một giây, còn chưa thử gì cả",
          "Chờ đến cuối ngày xem mạng có tự lành lại hay không",
        ],
        correct: 0,
        explanation:
          "Nhiều tab, video, đồng bộ tệp đang chạy nền có thể chiếm đường mạng ngay trên máy bạn, đóng bớt là phép thử nhanh và không hại gì. Gỡ hết phần mềm là quá đà và có thể làm mất công cụ làm việc. Gọi IT mà chưa thử gì thì họ phải hỏi lại chính những câu này. Chờ cuối ngày thì cuộc họp đã xong.",
      },
      {
        question: "Khi báo lỗi mạng cho IT, thông tin nào giúp họ khoanh vùng nhanh nhất?",
        options: [
          "Giờ xảy ra, chỗ ngồi, thiết bị nào chậm, đã thử những gì",
          "Một câu chung là mạng hôm nay tệ lắm, kèm vài dấu chấm than",
          "Mật khẩu Wi-Fi và mật khẩu tài khoản để họ tự vào xem giúp",
          "Ảnh chụp toàn bộ màn hình làm việc, gồm cả các tệp đang mở",
        ],
        correct: 0,
        explanation:
          "Giờ, chỗ ngồi, thiết bị và các phép thử đã làm cho IT biết vùng nào loại trừ rồi. 'Tệ lắm' không cho họ manh mối nào. Không ai cần mật khẩu của bạn để khắc phục mạng, và gửi đi là rủi ro. Ảnh cả màn hình có thể lộ tệp công việc mà vẫn không cho biết mạng chậm ở đâu.",
      },
    ],
    keyTakeaways: [
      "Đường đi: máy bạn, bộ phát Wi-Fi, modem, nhà mạng. Lỗi nằm ở một khúc, không nằm ở tất cả.",
      "Phép thử 1: cùng việc đó trên thiết bị khác cùng Wi-Fi.",
      "Phép thử 2: đứng gần bộ phát hoặc cắm dây mạng.",
      "Phép thử 3: nếu mọi thiết bị đều chậm, ghi giờ và báo nhà mạng.",
      "Không gửi mật khẩu cho ai khi nhờ sửa mạng.",
    ],
    practicePrompt: {
      question:
        "Chị Lan họp trực tuyến bị giật. Chị cắm dây mạng vào máy và hết giật, còn điện thoại của chị ngồi cuối phòng vẫn giật. Nên xử lý thế nào?",
      options: [
        "Báo IT rằng sóng Wi-Fi yếu ở chỗ ngồi cuối phòng và xin đổi chỗ hoặc dời bộ phát",
        "Gọi nhà mạng vì đường truyền chắc chắn đang sự cố",
        "Mua máy tính xách tay mới cho chị Lan",
        "Đổi mật khẩu Wi-Fi của cả văn phòng",
      ],
      correct: 0,
      explanation:
        "Có dây thì mượt, còn thiết bị dùng sóng ở cuối phòng thì giật: khúc yếu là sóng Wi-Fi tới chỗ ngồi đó. Gọi nhà mạng khi đường vào nhà vẫn ổn chỉ mất thời gian. Máy mới không liên quan vì cắm dây máy vẫn ổn. Đổi mật khẩu không thay đổi cường độ sóng.",
    },
    summary: {
      keyIdea: "Mạng chậm là một chuỗi nhiều khúc; ba phép thử rẻ cho bạn biết khúc nào đang yếu.",
      formula: "Thiết bị khác + đứng gần hoặc cắm dây + hỏi chỗ khác = khoanh được vùng lỗi.",
      commonMistake: "Đổ hết cho nhà mạng hoặc khởi động mọi thứ ngẫu nhiên mà không ghi lại kết quả.",
      action: "Lần tới mạng chậm, làm đủ ba phép thử và ghi giờ cùng kết quả trước khi báo ai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Ngồi đúng chỗ bạn hay làm việc. Mở cùng một video hoặc một cuộc gọi thử trên máy tính và trên điện thoại, rồi đứng gần bộ phát Wi-Fi và thử lại. Ghi ba dòng vào ghi chú: chỗ ngồi nào mượt, chỗ nào giật, thiết bị nào chậm hơn. Mai mở lại ghi chú này nếu mạng chậm.",
      secondary: "Chụp ảnh chỗ đặt bộ phát Wi-Fi, vì bộ phận IT sẽ hỏi nó đặt ở đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Họp lúc 9 giờ, hình đứng, cả phòng nhìn bạn. Trước khi đổ lỗi cho nhà mạng hay khởi động mọi thứ, hãy học cách khoanh vùng: lỗi nằm ở máy bạn, ở bộ phát hay ở đường vào nhà.",
      },
      {
        type: "feynman",
        title: "Mạng chậm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới nước chảy từ nhà máy nước tới vòi trong bếp nhà bạn. Nước yếu có thể do nhà máy, do ống chính ngoài đường, do ống trong nhà bị tắc, hoặc do vòi bị bẩn. Muốn biết chỗ nào, bạn mở thử vòi khác trong nhà: nếu vòi khác mạnh, lỗi ở chiếc vòi bạn đang dùng.",
        columns: ["Khúc", "Ví dụ nước", "Ví dụ mạng"],
        rows: [
          ["Nguồn ở xa", "Nhà máy nước", "Nhà mạng và Internet"],
          ["Đường vào nhà", "Ống chính tới nhà", "Modem và dây cáp vào nhà"],
          ["Chia trong nhà", "Ống chia tới từng phòng", "Bộ phát Wi-Fi"],
          ["Điểm cuối", "Vòi nước bạn dùng", "Máy tính, điện thoại của bạn"],
        ],
        oneLiner: "Mở thử một vòi khác: thiết bị khác cùng mạng cho bạn biết lỗi ở vòi hay ở đường ống.",
      },
      { type: "heading", text: "Vì sao phải khoanh vùng trước khi gọi ai" },
      {
        type: "paragraph",
        text: "Gọi nhà mạng khi lỗi ở chỗ ngồi cuối phòng thì họ kiểm đường truyền thấy ổn và bạn mất nửa tiếng. Gọi IT mà không biết thiết bị nào chậm thì họ hỏi lại những câu bạn chưa thử. Ba phép thử dưới đây mất khoảng năm phút và chẳng cần biết kỹ thuật.",
      },
      {
        type: "flow",
        title: "Ba phép thử theo thứ tự",
        steps: [
          { label: "Thử thiết bị khác", detail: "Mở cùng video hay cuộc họp trên điện thoại cùng Wi-Fi. Nếu nó mượt còn máy tính giật, lỗi gần máy tính: quá nhiều ứng dụng, đang cập nhật, hoặc máy yếu." },
          { label: "Đứng gần bộ phát hoặc cắm dây", detail: "Mang máy tới gần bộ phát Wi-Fi, hoặc cắm dây mạng nếu có. Mượt hơn nghĩa là sóng tới chỗ bạn ngồi đang yếu." },
          { label: "Thử nhiều nơi và nhiều thiết bị", detail: "Nếu mọi thiết bị, kể cả khi có dây, đều chậm, phần chung còn lại là modem và nhà mạng. Đó là lúc ghi giờ và báo họ." },
          { label: "Ghi lại rồi mới báo", detail: "Viết giờ, chỗ ngồi, thiết bị, kết quả mỗi phép thử. Bản ghi ba dòng này là thứ người hỗ trợ cần nhất." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời chẩn đoán AI vừa đưa",
        task: "Bạn kể với AI: máy tính giật, điện thoại cùng Wi-Fi vẫn mượt, cắm dây mạng thì máy tính hết giật. AI trả lời như dưới đây. Bấm vào những câu nó tự thêm mà bạn không hề kể.",
        segments: [
          { text: "Điện thoại vẫn mượt cho thấy đường vào nhà và bộ phát đang hoạt động được." },
          { text: "Cắm dây mạng mà hết giật gợi ý sóng Wi-Fi tới máy tính là khúc yếu." },
          { text: "Nhà mạng của bạn đang gặp sự cố diện rộng từ 8 giờ sáng nay.", error: "Bạn không kể gì về sự cố của nhà mạng, và điện thoại vẫn mượt là dấu hiệu ngược lại. AI không có cách nào biết tình trạng mạng của nơi bạn ở." },
          { text: "Bạn thử ngồi gần bộ phát hơn hoặc đóng bớt ứng dụng nặng rồi thử lại." },
          { text: "Bộ phát của bạn đã quá 3 năm tuổi nên cần thay ngay trong tuần này.", error: "Bạn không nói tuổi của bộ phát. Con số '3 năm' và lời khuyên thay ngay là AI tự thêm, không có dữ liệu nào ủng hộ." },
          { text: "Nếu vẫn giật, hãy ghi lại giờ và chỗ ngồi để báo cho IT." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Khoanh vùng bằng ba phép thử",
          text: "Mất khoảng năm phút. Bạn biết lỗi ở máy, ở sóng hay ở đường vào nhà. Báo IT hoặc nhà mạng kèm bằng chứng nên họ kiểm đúng chỗ. Lần sau gặp lại, bạn đã có sẵn cách làm.",
        },
        right: {
          label: "Khởi động mọi thứ rồi hy vọng",
          text: "Mất mười đến mười lăm phút mà vẫn không biết lỗi ở đâu. Nếu hết giật, bạn không hiểu vì sao. Nếu không hết, bạn gọi ai đó mà không có thông tin gì để kể. Lỗi quay lại đúng lúc họp kế tiếp.",
        },
      },
      {
        type: "scenario",
        title: "9 giờ sáng, cuộc họp giật",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn 10 phút là họp với khách. Hình của bạn bắt đầu đứng. Bạn ngồi cuối phòng, cách bộ phát hai bức tường.",
            choices: [
              { label: "Gọi ngay tổng đài nhà mạng để báo mạng tệ", next: "bad_call" },
              { label: "Mở thử cuộc họp trên điện thoại rồi cắm dây mạng vào máy", next: "s2" },
            ],
          },
          bad_call: {
            text: "Tổng đài bắt bạn đợi, hỏi mấy câu bạn chưa thử và kết luận đường truyền bình thường. Cuộc họp bắt đầu trễ mười phút mà mạng vẫn giật.",
            ending: "bad",
          },
          s2: {
            text: "Trên điện thoại hình vẫn hơi giật, nhưng khi cắm dây vào máy tính thì mượt. Còn 6 phút.",
            choices: [
              { label: "Họp bằng máy tính cắm dây, sau đó báo IT về chỗ ngồi cuối phòng", next: "good" },
              { label: "Khởi động lại bộ phát Wi-Fi của cả văn phòng ngay lúc này", next: "bad_restart" },
            ],
          },
          bad_restart: {
            text: "Cả tầng mất mạng ba phút, đồng nghiệp đang họp cũng bị rớt. Bạn vẫn chưa biết sóng ở chỗ bạn yếu, và họp trễ.",
            ending: "bad",
          },
          good: {
            text: "Bạn họp mượt. Buổi chiều bạn báo IT: chỗ ngồi cuối phòng sóng yếu, cắm dây thì ổn. Họ dời bộ phát vào tuần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Không tự ý chỉnh thiết bị của công ty",
        text: "Bộ phát và modem của công ty do IT quản lý. Bạn thử trên máy mình thoải mái, nhưng tắt, rút hay đổi cài đặt bộ phát chung thì hỏi IT trước. Và không gửi mật khẩu cho ai qua tin nhắn khi nhờ sửa mạng.",
      },
      {
        type: "closing",
        lines: [
          "Hỏi một vòi khác trước khi trách đường ống: thiết bị khác, gần bộ phát hoặc cắm dây, rồi ghi lại.",
          "Bài sau: vì sao cả văn phòng chung một đường mạng thì giờ cao điểm chậm hơn.",
        ],
      },
    ],
  },
  {
    id: 2726,
    slug: "bang-thong-va-so-nguoi-dung-chung-mot-duong-mang",
    title: "Chặng 66, Bài 7: Cả văn phòng chung một đường mạng: vì sao giờ cao điểm chậm hơn",
    subtitle: "Đường mạng như một ống nước chung: càng nhiều người mở vòi, mỗi người hứng được càng ít.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🚰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chiều thứ sáu, cả phòng cùng tải tệp lớn và gửi video cho khách. Mạng ì ạch, bạn tưởng máy mình hỏng hay bộ phát có vấn đề. Thật ra đường mạng của văn phòng có một sức chứa nhất định và mọi người chia nhau. Hiểu điều này giúp bạn biết khi nào nên chờ, khi nào nên dời việc nặng sang giờ vắng.",
    openingQuestion:
      "Văn phòng có 20 người, cùng dùng một đường Internet. Chiều thứ sáu mọi người cùng tải tệp lớn. Điều gì thường xảy ra với tốc độ của mỗi người?",
    openingOptions: [
      "Mỗi người hứng được phần nhỏ hơn vì cùng chia một đường mạng",
      "Tốc độ của mỗi người giữ nguyên vì mạng không liên quan số người",
      "Tốc độ của mỗi người tăng lên vì mạng chạy tốt hơn khi đông người",
      "Chỉ người dùng máy mới bị chậm, còn máy cũ thì vẫn nhanh như thường",
    ],
    correctOption: 0,
    explanation:
      "Đường Internet vào văn phòng có một sức chứa nhất định, giống một ống nước. Khi nhiều người cùng tải, họ chia nhau sức chứa đó, nên phần mỗi người nhận giảm đi. Nói mạng không liên quan số người là bỏ qua việc dùng chung. Đông người không làm mạng tốt hơn. Tuổi của máy không quyết định việc chia phần này, nó chỉ ảnh hưởng chuyện máy xử lý nhanh hay chậm sau khi dữ liệu đã tới.",
    diagram: [
      { label: "Đường Internet vào văn phòng (một ống chung)", arrow: true },
      { label: "Bộ phát Wi-Fi chia mạng cho từng người", arrow: true },
      { label: "Nhiều người cùng tải lớn: mỗi người một phần nhỏ", arrow: true },
      { label: "Chuyển việc nặng ra giờ vắng để ai cũng đủ phần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một văn phòng 15 người nhận ra mạng hay ì ạch vào chiều thứ sáu. Trưởng phòng hỏi từng người và thấy ba người cùng đẩy video lớn lên kho chung, hai người tải bản cập nhật phần mềm, trong khi các cuộc họp trực tuyến vẫn đang chạy. Họ thống nhất việc nặng như đồng bộ video để sau 5 giờ chiều, và các cuộc họp được ưu tiên. Mạng không đổi nhưng ai cũng thấy nhanh hơn.",
    },
    quiz: [
      {
        question: "Đường Internet 100 đơn vị tốc độ được chia đều cho 20 người đang tải cùng lúc. Mỗi người được bao nhiêu?",
        options: [
          "5 đơn vị (= 100 ÷ 20)",
          "120 đơn vị (= 100 + 20, cộng thay vì chia)",
          "2000 đơn vị (= 100 × 20, nhân thay vì chia)",
          "80 đơn vị (= 100 − 20, trừ thay vì chia)",
        ],
        correct: 0,
        explanation:
          "Chia đều thì lấy tổng chia cho số người: 100 ÷ 20 = 5. Cộng, nhân hay trừ đều là nhầm phép tính, và chúng còn cho ra kết quả vô lý, vì chia đường mạng cho nhiều người không bao giờ làm phần mỗi người lớn lên. Số liệu ở đây chỉ là minh hoạ. Trên thực tế phần chia không hoàn toàn đều.",
      },
      {
        question: "Khi chỉ còn 3 người đang dùng mạng vào buổi tối, vì sao mỗi người thường nhanh hơn ban ngày?",
        options: [
          "Vì ít người chia nhau cùng một đường mạng",
          "Vì nhà mạng tự nâng gói cước",
          "Vì màn hình sáng hơn về đêm nên trang web tải nhanh hơn",
          "Vì máy tính chạy nhanh hơn khi nhiệt độ trong phòng giảm xuống",
        ],
        correct: 0,
        explanation:
          "Cùng một ống mà ít người hứng thì mỗi người được phần lớn hơn. Nhà mạng không tự nâng gói cước theo giờ. Độ sáng màn hình không ảnh hưởng tốc độ tải. Nhiệt độ phòng có thể ảnh hưởng đôi chút tới máy, nhưng không phải lý do chính khiến mạng nhanh lên khi vắng người.",
      },
      {
        question: "Việc nào nên dời sang giờ văn phòng vắng nếu mạng đang ì ạch?",
        options: [
          "Đồng bộ thư mục video lớn và tải bản cập nhật phần mềm nặng",
          "Gửi một email ngắn vài dòng, không có tệp đính kèm",
          "Mở một trang web văn bản để tra cứu số điện thoại khách hàng",
          "Mọi việc có dùng Internet, kể cả cuộc họp trực tuyến với khách",
        ],
        correct: 0,
        explanation:
          "Việc nặng và không gấp, như đồng bộ video, tải tệp lớn, cập nhật, là ứng viên để dời sang giờ vắng. Email ngắn và trang văn bản gần như không chiếm đường mạng. Còn họp trực tuyến với khách là việc có giờ cố định, nên không thể dời, mà cần được ưu tiên.",
      },
      {
        question: "Mạng chậm chỉ vào khoảng 5 giờ chiều thứ sáu, các giờ khác vẫn ổn. Giả thuyết hợp lý nhất?",
        options: [
          "Giờ đó nhiều người cùng dùng nặng nên chia nhau đường mạng",
          "Bộ phát Wi-Fi bị hỏng vào đúng chiều thứ sáu hằng tuần như lịch",
          "Nhà mạng cố ý làm chậm mạng cuối tuần để tiết kiệm điện",
          "Máy tính của bạn tự động chậm lại khi tới giờ tan sở mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Chậm đúng theo giờ và ổn các lúc khác là dấu hiệu của tải theo giờ: nhiều người cùng tải. Thiết bị hỏng thường không hỏng theo lịch. 'Cố ý làm chậm để tiết kiệm điện' là lời đồn, không có bằng chứng. Máy tính không có đồng hồ tan sở nào khiến nó chậm lại.",
      },
      {
        question: "Bạn muốn nhanh hơn trong giờ cao điểm mà không tốn tiền. Cách nào có tác dụng thật?",
        options: [
          "Thống nhất cả phòng hẹn giờ cho việc nặng, ưu tiên họp trực tuyến",
          "Đổi tên mạng Wi-Fi thành một cái tên ngắn và dễ nhớ hơn",
          "Đặt bộ phát Wi-Fi quay ra cửa sổ thay vì quay vào phòng",
          "Mỗi người mở thêm nhiều tab để mạng nhận ra đông người cần dùng và cấp thêm tốc độ",
        ],
        correct: 0,
        explanation:
          "Sức chứa đường mạng có hạn, nên cách miễn phí hiệu quả nhất là giảm việc nặng cùng lúc. Đổi tên mạng không thay đổi tốc độ. Hướng của bộ phát không tạo thêm sức chứa cho đường vào. Mở thêm tab làm tải thêm, còn mạng không biết 'nhận ra' nhu cầu nào.",
      },
    ],
    keyTakeaways: [
      "Đường Internet của văn phòng là một ống chung, mọi người chia nhau sức chứa.",
      "Mỗi người hứng được khoảng tổng sức chứa chia cho số người đang tải cùng lúc.",
      "Việc nặng không gấp, như video lớn và bản cập nhật, dời sang giờ vắng.",
      "Họp trực tuyến là việc cần ưu tiên nên đừng tải nặng cùng lúc.",
      "Số liệu ở bài này là minh hoạ, tốc độ thật chia không đều tuyệt đối.",
    ],
    practicePrompt: {
      question:
        "Văn phòng có 10 người, cả nhóm sắp họp trực tuyến lúc 3 giờ. Hai đồng nghiệp đang đồng bộ thư mục video 20 GB. Nên làm gì?",
      options: [
        "Nhờ họ tạm dừng đồng bộ và chạy lại sau giờ họp",
        "Bảo cả nhóm họp bằng hai thiết bị cùng lúc để chắc ăn",
        "Đổi mật khẩu Wi-Fi để hai người kia bị ngắt mạng",
        "Bỏ qua, vì đồng bộ chạy nền không ảnh hưởng gì tới cuộc họp",
      ],
      correct: 0,
      explanation:
        "Việc đồng bộ video lớn và không gấp nên chờ. Dùng hai thiết bị cùng lúc chỉ tăng tải lên đường chung. Đổi mật khẩu để ngắt mạng người khác gây rối và không phải cách phối hợp. Còn nói đồng bộ chạy nền không ảnh hưởng là sai: nó vẫn chiếm phần đường mạng của cả nhóm.",
    },
    summary: {
      keyIdea: "Đường mạng là ống chung: càng nhiều người tải nặng cùng lúc, phần mỗi người càng nhỏ.",
      formula: "Phần mỗi người xấp xỉ tổng sức chứa ÷ số người đang tải nặng.",
      commonMistake: "Tưởng mạng chậm lúc đông người là máy mình hỏng, rồi khởi động lại hoặc mua thiết bị mới.",
      action: "Hẹn với nhóm một khung giờ cho việc nặng và một quy tắc ưu tiên họp trực tuyến.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê ba việc nặng mạng mà bạn hay làm (đồng bộ thư mục, gửi video, tải bản cập nhật). Ghi cạnh mỗi việc một giờ vắng hợp lý, rồi nhắn một đồng nghiệp cùng phòng đề nghị cả hai cùng dời việc nặng sang giờ đó trong tuần này. Mai xem mạng buổi chiều có khác không.",
      secondary: "Ghi lại giờ nào trong tuần bạn thấy mạng chậm nhất để lần sau so sánh.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ sáu cả phòng tải tệp lớn và mạng ì ạch. Bài này cho bạn thấy vì sao: đường mạng là thứ dùng chung, và phần mỗi người nhận được co lại khi đông người tải nặng.",
      },
      {
        type: "feynman",
        title: "Đường mạng chung đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một ống nước cấp cho cả tòa nhà. Một nhà mở vòi thì nước chảy mạnh. Hai mươi nhà cùng mở vòi lúc sáu giờ tối thì mỗi vòi yếu đi, dù ống vẫn vậy và vòi nhà bạn không hỏng. Đường Internet của văn phòng hoạt động như thế.",
        columns: ["Thành phần", "Tòa nhà", "Văn phòng"],
        rows: [
          ["Ống cấp chung", "Đường ống vào tòa nhà", "Đường Internet vào văn phòng"],
          ["Người dùng", "Các hộ mở vòi", "Đồng nghiệp đang tải, họp, xem video"],
          ["Giờ cao điểm", "Sáu giờ tối, ai cũng nấu cơm", "Chiều thứ sáu, ai cũng gửi tệp"],
          ["Cách giảm nghẽn", "Nhà nào tưới cây thì tưới sáng sớm", "Việc nặng không gấp để sau giờ làm"],
        ],
        oneLiner: "Đông người cùng mở vòi thì mỗi người hứng ít nước hơn: ống chung nghĩa là chia nhau.",
      },
      { type: "heading", text: "Cùng một ống, mỗi người một phần" },
      {
        type: "paragraph",
        text: "Người ta gọi sức chứa của đường mạng là băng thông, đo bằng số lượng dữ liệu đi qua mỗi giây. Bạn chỉ cần nhớ hình ảnh ống nước: ống có sức chứa cố định và mọi người chia nhau. Kéo thanh trượt bên dưới để thấy phần mỗi người co lại khi số người tăng.",
      },
      {
        type: "chart",
        title: "Tốc độ mỗi người theo số người dùng chung mạng",
        caption:
          "Số liệu minh hoạ: giả sử sức chứa được chia đều cho mọi người đang tải cùng lúc. Thực tế phần chia không đều tuyệt đối, nhưng xu hướng thì đúng: càng đông người, mỗi người hứng càng ít.",
        kind: "line",
        xLabel: "Số người cùng tải",
        yLabel: "Mỗi người (đơn vị minh hoạ)",
        x: { from: 1, to: 40, step: 1 },
        params: [
          { id: "total", label: "Sức chứa đường mạng của văn phòng", min: 50, max: 500, step: 10, value: 200, unit: "đơn vị" },
          { id: "need", label: "Mức cần để họp video mượt", min: 2, max: 20, step: 1, value: 6, unit: "đơn vị" },
        ],
        series: [
          { label: "Phần mỗi người nhận", expr: "total/x" },
          { label: "Mức cần để họp video mượt", expr: "need" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giờ vắng người",
          text: "Ít người tải cùng lúc nên mỗi người hứng phần lớn. Tệp lớn tải nhanh, họp trực tuyến mượt. Đây là lúc hợp lý cho việc nặng như đồng bộ video hay cập nhật phần mềm.",
        },
        right: {
          label: "Giờ cao điểm",
          text: "Nhiều người cùng tải nặng nên phần mỗi người co lại, có khi thấp hơn mức cần cho họp video. Bạn thấy hình đứng hay tệp tải lâu dù máy mình không có gì sai.",
        },
      },
      {
        type: "scenario",
        title: "Chiều thứ sáu, mạng ì ạch",
        start: "s1",
        nodes: {
          s1: {
            text: "Bốn giờ chiều, bạn sắp họp với khách lúc 4 giờ 30. Đường mạng chậm hẳn và bạn thấy vài đồng nghiệp đang đồng bộ thư mục video lớn.",
            choices: [
              { label: "Nhắn nhóm xin tạm dừng đồng bộ video tới sau giờ họp", next: "s2" },
              { label: "Mở thêm hai thiết bị nữa để họp cho chắc ăn", next: "bad_more" },
            ],
          },
          bad_more: {
            text: "Ba thiết bị của bạn cùng chiếm đường mạng, các đồng nghiệp vẫn đang đồng bộ. Hình vẫn đứng, và bây giờ bạn còn phải nhớ thiết bị nào đang tiếng.",
            ending: "bad",
          },
          s2: {
            text: "Hai đồng nghiệp tạm dừng. Mạng khá hơn, nhưng vẫn còn một người đang tải bản cập nhật rất nặng.",
            choices: [
              { label: "Hỏi lịch tải bản cập nhật đó và nhờ họ chuyển sang sau 5 giờ", next: "good" },
              { label: "Đổi mật khẩu Wi-Fi của văn phòng để người đó bị ngắt", next: "bad_pw" },
            ],
          },
          bad_pw: {
            text: "Cả phòng bị ngắt mạng, kể cả người đang họp khác. IT phải vào reset lại và bạn bị phàn nàn vì tự ý đổi cài đặt chung.",
            ending: "bad",
          },
          good: {
            text: "Bạn họp mượt lúc 4 giờ 30. Sau đó cả phòng đồng ý để việc nặng sau 5 giờ chiều, và ghi vào quy tắc chung của nhóm.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nghẽn chung không phải lỗi của ai",
        text: "Khi mạng chậm vì đông người, đó là giới hạn của đường vào chứ không phải ai làm sai. Thương lượng giờ dùng với đồng nghiệp hiệu quả hơn là đổ lỗi. Nếu lúc nào cũng chậm dù đã thống nhất giờ, hãy nhờ IT xem gói cước văn phòng có còn đủ không.",
      },
      {
        type: "closing",
        lines: [
          "Một ống chung thì phần mỗi người là tổng chia cho số người tải cùng lúc.",
          "Bài sau: mạng công ty và mạng khách, vì sao tách riêng lại an toàn hơn.",
        ],
      },
    ],
  },
  {
    id: 2727,
    slug: "mang-cong-ty-va-mang-khach-vi-sao-co-hai-ten",
    title: "Chặng 66, Bài 8: Mạng công ty và mạng khách: vì sao tách riêng lại an toàn hơn",
    subtitle: "Phòng khách và phòng làm việc: khách vào được một chỗ, không đi lung tung vào chỗ khác.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🚪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách đến họp hỏi mật khẩu Wi-Fi, và bạn đọc luôn mật khẩu của mạng công ty vì đó là mạng duy nhất bạn biết. Chỉ vài giây nhưng bạn vừa cho một thiết bị lạ vào cùng mạng với máy in, máy chủ tệp và máy của đồng nghiệp. Biết vì sao công ty có mạng riêng cho khách giúp bạn chọn đúng và giải thích cho khách lịch sự.",
    openingQuestion:
      "Khách đến họp xin mật khẩu Wi-Fi. Công ty có một mạng nội bộ và một mạng khách. Bạn nên đưa mạng nào?",
    openingOptions: [
      "Mạng khách, vì nó tách khỏi máy in và tệp nội bộ của công ty",
      "Mạng nội bộ, vì mạng này luôn nhanh và ổn định hơn cho khách",
      "Mạng nào cũng như nhau vì khách chỉ vào Internet chứ không xem gì khác",
      "Không cho khách dùng Wi-Fi nào, bảo họ dùng dữ liệu di động của mình",
    ],
    correctOption: 0,
    explanation:
      "Mạng khách được dựng riêng để thiết bị của khách vào được Internet nhưng không thấy máy in, thư mục chung hay máy của nhân viên. Đưa mạng nội bộ cho khách là cho một thiết bị bạn không kiểm soát vào cùng chỗ với dữ liệu công ty. Nói mạng nào cũng như nhau là bỏ qua lý do tách. Còn từ chối hẳn thì khách không họp được, và mạng khách tồn tại chính để tiếp khách an toàn.",
    diagram: [
      { label: "Khách đến họp, cần vào Internet", arrow: true },
      { label: "Mạng khách: chỉ ra Internet", arrow: true },
      { label: "Mạng nội bộ: máy in, tệp chung, máy nhân viên", arrow: true },
      { label: "Tách riêng để thiết bị lạ không chạm vào dữ liệu công ty" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một công ty nhỏ dùng chung một mạng Wi-Fi cho cả nhân viên và khách. Một khách vô tình mang laptop đã nhiễm phần mềm độc hại vào họp, và máy đó nhìn thấy cả thư mục chung của phòng kế toán. Sau việc đó IT dựng thêm mạng khách tách riêng, đổi mật khẩu mạng nội bộ và hướng dẫn lễ tân chỉ đưa mạng khách. Đây là ví dụ giả định để minh hoạ vì sao tách mạng.",
    },
    quiz: [
      {
        question: "Mục đích chính của mạng khách là gì?",
        options: [
          "Cho khách ra Internet mà không chạm vào tài nguyên nội bộ",
          "Giúp Internet của khách nhanh gấp đôi mạng nhân viên",
          "Giúp công ty theo dõi từng trang web khách xem để bán thông tin",
          "Giúp nhân viên đỡ phải nhớ mật khẩu Wi-Fi nội bộ",
        ],
        correct: 0,
        explanation:
          "Mạng khách tách khách khỏi máy in, thư mục chung và máy nhân viên. Tốc độ thường không cao hơn, và không phải mục tiêu. Theo dõi khách để bán thông tin là một ý đồ không có thật trong lý do dựng mạng khách. Còn chuyện mật khẩu nội bộ thì hoàn toàn độc lập.",
      },
      {
        question: "Khách xin mật khẩu nhưng bạn không biết công ty có mạng khách không. Nên làm gì?",
        options: [
          "Hỏi lễ tân hoặc IT mạng khách là gì và mật khẩu của nó",
          "Đọc mật khẩu mạng nội bộ cho nhanh rồi nhờ IT đổi sau cũng được",
          "Tạo điểm phát Wi-Fi từ điện thoại công ty của bạn cho khách dùng",
          "Bảo khách đoán mật khẩu theo tên công ty, vì thường dễ đoán",
        ],
        correct: 0,
        explanation:
          "Hỏi người quản lý mạng là cách chắc chắn: họ biết có mạng khách hay không. Đọc mật khẩu nội bộ rồi đổi sau là mở cửa trước rồi mới khóa. Tự phát Wi-Fi từ máy công ty có thể vi phạm quy định và tiêu hao dữ liệu của công ty. Đoán mật khẩu là khuyến khích hành vi truy cập trái phép.",
      },
      {
        question: "Vì sao không nên dùng chung mật khẩu Wi-Fi nội bộ cho khách rồi đổi mật khẩu sau buổi họp?",
        options: [
          "Thiết bị của khách đã ở cùng mạng với máy công ty trong suốt buổi họp",
          "Vì đổi mật khẩu sẽ làm công ty phải trả thêm phí cho nhà mạng",
          "Vì đổi mật khẩu Wi-Fi luôn làm hỏng bộ phát và phải thay mới",
          "Vì khách nào cũng sẽ nhớ mật khẩu và quay lại dùng nhiều năm sau",
        ],
        correct: 0,
        explanation:
          "Rủi ro xảy ra ngay trong lúc khách ở cùng mạng, đổi mật khẩu sau đó không xoá được khoảng thời gian ấy. Đổi mật khẩu không tốn phí nhà mạng và không làm hỏng bộ phát. Việc khách nhớ mật khẩu có thể xảy ra nhưng không phải lý do chính.",
      },
      {
        question: "Một người lạ xin vào mạng nội bộ vì 'mạng khách chậm quá'. Phản ứng hợp lý nhất?",
        options: [
          "Lịch sự từ chối, đề nghị họ dùng mạng khách hoặc dữ liệu di động của mình",
          "Đưa mật khẩu nội bộ vì họ đã nói rất lịch sự và trông đáng tin",
          "Đưa mật khẩu nhưng dặn họ không được mở thư mục nào",
          "Nhờ họ viết giấy cam đoan trước rồi mới đưa mật khẩu nội bộ",
        ],
        correct: 0,
        explanation:
          "Mạng nội bộ chỉ dành cho thiết bị đã được công ty kiểm soát. Người lạ trông đáng tin vẫn chưa được kiểm chứng. Dặn dò không mở thư mục không ngăn được phần mềm tự quét mạng. Giấy cam đoan không thay cho ranh giới kỹ thuật.",
      },
      {
        question: "Bạn giải thích ngắn gọn cho khách vì sao họ chỉ dùng được mạng khách. Câu nào ổn nhất?",
        options: [
          "Mạng khách giữ máy anh chị tách khỏi máy in và tệp của công ty, hai bên cùng an toàn",
          "Công ty không tin khách nên không cho vào mạng chính, vì khách có thể làm hỏng hệ thống",
          "Mạng chính chỉ dành cho người làm ở đây",
          "Đó là quy định, tôi cũng không rõ lý do",
        ],
        correct: 0,
        explanation:
          "Câu đúng nêu lý do chung cho cả hai bên: bảo vệ khách và công ty. Nói công ty không tin khách tạo ấn tượng xấu. Câu 'chỉ dành cho người làm ở đây' đúng nhưng cụt và nghe như đuổi. Và 'không rõ lý do' bỏ lỡ cơ hội giúp khách hiểu.",
      },
      {
        question: "Khi được hỏi, đâu là cách dùng AI hợp lý để soạn lời giải thích cho khách?",
        options: [
          "Nhờ AI viết một câu ngắn, lịch sự, không đưa tên mạng hay mật khẩu thật vào",
          "Dán cả mật khẩu và tên mạng nội bộ vào AI để nó soạn hướng dẫn đầy đủ và chính xác cho khách",
          "Nhờ AI đoán giúp công ty bạn có mạng khách hay không rồi làm theo",
          "Để AI tự quyết định cho khách dùng mạng nào theo giọng khách nói",
        ],
        correct: 0,
        explanation:
          "AI giúp soạn câu chữ, còn mật khẩu và tên mạng thật là thông tin bảo mật không nên dán vào công cụ ngoài. AI không biết mạng công ty bạn có gì nên đoán là bịa. Quyết định khách dùng mạng nào là việc của công ty chứ không của AI hay của giọng nói khách.",
      },
    ],
    keyTakeaways: [
      "Mạng nội bộ dành cho thiết bị công ty, mạng khách dành cho người ngoài.",
      "Mạng khách cho ra Internet nhưng không thấy máy in, tệp chung hay máy nhân viên.",
      "Đổi mật khẩu sau buổi họp không xoá được thời gian khách đã ở cùng mạng.",
      "Không biết mạng khách là gì thì hỏi IT hoặc lễ tân, đừng đọc mật khẩu nội bộ.",
      "Mật khẩu và tên mạng thật không dán vào công cụ AI.",
    ],
    practicePrompt: {
      question:
        "Anh Nam muốn soạn tin nhắn gửi khách kèm mật khẩu mạng khách. Cách nhờ AI nào an toàn nhất?",
      options: [
        "Nhờ AI viết mẫu có chỗ trống {mat_khau}, rồi tự điền sau",
        "Dán mật khẩu thật vào để AI viết luôn tin nhắn hoàn chỉnh",
        "Nhờ AI tự nghĩ ra một mật khẩu cho mạng khách của công ty",
        "Nhờ AI gửi tin nhắn thẳng cho khách thay anh, kèm luôn mật khẩu",
      ],
      correct: 0,
      explanation:
        "Mẫu có chỗ trống giữ mật khẩu ngoài công cụ AI và vẫn tiết kiệm thời gian viết. Dán mật khẩu thật là đưa thông tin bảo mật ra ngoài. Mật khẩu của mạng do IT đặt và quản lý chứ không do AI nghĩ ra. Và AI trò chuyện thường không gửi tin thay anh, nếu có thì anh vẫn phải duyệt nội dung.",
    },
    summary: {
      keyIdea: "Tách mạng khách khỏi mạng nội bộ để thiết bị lạ không đi vào chỗ có dữ liệu công ty.",
      formula: "Khách + mạng khách = ra Internet được, chạm vào tài nguyên nội bộ thì không.",
      commonMistake: "Đọc luôn mật khẩu mạng nội bộ vì tiện, định đổi sau buổi họp.",
      action: "Hỏi IT hoặc lễ tân xem công ty có mạng khách không và ghi lại cách nói với khách.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Hỏi IT hoặc lễ tân: công ty có mạng khách không, tên là gì, ai đổi mật khẩu và đổi bao lâu một lần. Ghi ba câu trả lời vào một ghi chú riêng. Sau đó viết sẵn một câu giải thích ngắn với khách để dùng lần tới, không ghi mật khẩu thật vào đó.",
      secondary: "Nếu công ty chưa có mạng khách, ghi lại và báo IT như một đề xuất.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách xin mật khẩu Wi-Fi ngay giữa buổi họp, và mạng duy nhất bạn biết là mạng công ty. Bài này cho bạn lý do tách mạng khách, và cách từ chối mạng nội bộ mà vẫn lịch sự.",
      },
      {
        type: "feynman",
        title: "Mạng khách đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới phòng khách và phòng làm việc trong một tòa nhà. Khách tới được phòng khách, uống nước, xem ti vi. Nhưng cửa vào khu làm việc có khóa, vì trong đó có hồ sơ và máy tính. Mạng khách là phòng khách của công ty: vào được Internet, không bước tiếp vào khu làm việc.",
        columns: ["Khu vực", "Trong tòa nhà", "Trên mạng"],
        rows: [
          ["Khu tiếp khách", "Phòng khách, ai cũng vào", "Mạng khách, chỉ ra Internet"],
          ["Khu làm việc", "Cửa có khóa", "Mạng nội bộ có mật khẩu riêng"],
          ["Vật quý bên trong", "Hồ sơ, tủ chứa tài liệu", "Máy in, tệp chung, máy nhân viên"],
          ["Người giữ chìa khóa", "Lễ tân hoặc bảo vệ", "Bộ phận IT"],
        ],
        oneLiner: "Khách ngồi phòng khách là chuyện bình thường; cho họ thẳng vào khu làm việc là chuyện cần cân nhắc.",
      },
      { type: "heading", text: "Vì sao công ty cần hai mạng có hai tên" },
      {
        type: "paragraph",
        text: "Thiết bị của khách là thiết bị công ty không kiểm soát: có thể đã nhiễm phần mềm độc hại mà chủ nhân không biết. Nếu nó cùng mạng với máy in và thư mục chung, phần mềm đó có cơ hội nhìn thấy và lây sang các máy khác. Hai mạng tách nhau giữ rủi ro của khách ở bên ngoài.",
      },
      {
        type: "flow",
        title: "Khách đến họp, bạn làm gì",
        steps: [
          { label: "Khách xin mật khẩu Wi-Fi", detail: "Đừng đọc ngay mật khẩu bạn đang dùng. Hỏi trước: mình có mạng khách không?" },
          { label: "Kiểm tra mạng khách với IT hoặc lễ tân", detail: "Họ biết tên mạng khách, mật khẩu hiện tại và ai đổi định kỳ." },
          { label: "Đưa đúng mạng khách", detail: "Nói rõ tên mạng và mật khẩu của mạng khách, không nhắc mạng nội bộ." },
          { label: "Giải thích một câu nếu khách hỏi", detail: "Mạng khách giữ máy anh chị tách khỏi máy in và tệp nội bộ, nên hai bên cùng an toàn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn lời giải thích cho khách",
        task: "Bạn cần một tin nhắn ngắn, lịch sự giải thích vì sao khách dùng mạng khách. Lắp yêu cầu để AI soạn đúng mà không cần biết mật khẩu thật.",
        parts: [
          {
            id: "tone",
            label: "Giọng và người nhận",
            options: [
              { text: "Viết tin nhắn giải thích mạng Wi-Fi.", feedback: "Không nói ai đọc và giọng nào, nên AI viết một đoạn kỹ thuật dài, khách chẳng muốn đọc." },
              { text: "Viết 2 câu lịch sự, gửi cho khách đến họp, bằng tiếng Việt thân thiện, không dùng thuật ngữ.", good: true, feedback: "Có người nhận, độ dài và giọng: AI ra một tin nhắn ngắn, dễ hiểu." },
            ],
          },
          {
            id: "secret",
            label: "Thông tin nhạy cảm",
            options: [
              { text: "Mạng tên CongTy-Noibo, mật khẩu của mạng là (dán mật khẩu thật).", feedback: "Mật khẩu và tên mạng nội bộ thật đi ra ngoài công cụ AI. Nếu nhầm còn là chính mạng nội bộ bạn đưa cho khách." },
              { text: "Dùng {ten_mang_khach} và {mat_khau} làm chỗ trống, tôi sẽ tự điền. Không nhắc mạng nội bộ.", good: true, feedback: "Chỗ trống giữ thông tin bảo mật ngoài AI, và tin nhắn chỉ nhắc mạng khách." },
            ],
          },
          {
            id: "reason",
            label: "Lý do nêu ra",
            options: [
              { text: "Nói rõ công ty không cho người ngoài vào mạng chính.", feedback: "Giọng đóng cửa, dễ làm khách thấy bị nghi ngờ thay vì được tiếp đón." },
              { text: "Nêu một lý do chung cho hai bên: mạng khách giữ máy của khách và dữ liệu công ty tách nhau.", good: true, feedback: "Lý do công bằng cho cả hai bên nên khách thấy mình được bảo vệ chứ không bị nghi ngờ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["tone", "secret", "reason"],
            text: "Chào anh/chị, anh/chị dùng giúp mạng khách {ten_mang_khach}, mật khẩu {mat_khau} nhé. Mạng này giữ máy của anh/chị tách khỏi máy in và tệp của công ty để hai bên cùng an toàn. Chúc buổi họp suôn sẻ!",
          },
          {
            requires: ["tone", "reason"],
            text: "Chào anh/chị, mật khẩu Wi-Fi là CongTy-2024. Mạng này tách biệt để bảo vệ hai bên...\n\n(Giọng ổn nhưng mật khẩu thật bị lộ vì bạn đã đưa nó cho AI, và AI tự điền vào tin nhắn.)",
          },
          {
            text: "Kính gửi Quý khách, vì lý do an ninh hệ thống thông tin, chúng tôi không cho phép người ngoài truy cập mạng chính. Vui lòng sử dụng mạng khách theo quy định đính kèm...\n\n(Dài, cứng nhắc và nghe như đang nghi ngờ khách.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Cho khách vào mạng khách",
          text: "Khách ra Internet ngay. Thiết bị lạ không nhìn thấy máy in hay thư mục chung. Nếu mật khẩu mạng khách bị lộ thì chỉ cần đổi nó, không ảnh hưởng ai trong công ty.",
        },
        right: {
          label: "Cho khách vào mạng nội bộ",
          text: "Khách ra Internet ngay, cũng ở cùng mạng với máy in và máy nhân viên. Nếu thiết bị của khách có phần mềm độc hại thì nó ở cạnh dữ liệu công ty. Lộ mật khẩu thì phải đổi và cấu hình lại mọi thiết bị của công ty.",
        },
      },
      {
        type: "scenario",
        title: "Khách xin mật khẩu giữa buổi họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách ngồi vào bàn họp và hỏi: Cho tôi xin mật khẩu Wi-Fi nhé. Bạn chỉ thuộc mật khẩu mạng nội bộ của công ty.",
            choices: [
              { label: "Đọc luôn mật khẩu mạng nội bộ, họp xong sẽ nhờ IT đổi", next: "bad_internal" },
              { label: "Nói xin vài giây, nhắn lễ tân hoặc IT hỏi mạng khách và mật khẩu", next: "s2" },
            ],
          },
          bad_internal: {
            text: "Laptop của khách vào cùng mạng với máy in và máy chủ tệp. Buổi họp xong, IT phải đổi mật khẩu và khởi động lại mọi thiết bị, còn bạn bị nhắc nhở.",
            ending: "bad",
          },
          s2: {
            text: "Lễ tân trả lời nhanh: có mạng khách, tên và mật khẩu đều có trên tấm thẻ ở quầy. Khách hỏi thêm: Sao không dùng mạng chính cho nhanh?",
            choices: [
              { label: "Đưa mạng khách và nói: Mạng này giữ máy anh tách khỏi tệp công ty, hai bên cùng an toàn", next: "good" },
              { label: "Nói: Quy định là vậy, tôi cũng không rõ", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Khách hơi khó chịu, nghĩ công ty giấu điều gì. Buổi họp bắt đầu với không khí nghi ngờ và bạn mất thời gian làm dịu lại.",
            ending: "bad",
          },
          good: {
            text: "Khách gật đầu, kết nối mạng khách và họp ngay. Bạn cũng nhớ ghi lại câu trả lời này để dùng lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Cách an toàn khi nhờ AI",
        text: "Tên mạng, mật khẩu, địa chỉ thiết bị trong công ty: đừng dán vào AI. Nếu cần AI giúp soạn tin nhắn, dùng chỗ trống {mat_khau} và tự điền sau. Việc thiết lập hay đổi mạng khách là của IT, bạn đừng tự ý chỉnh.",
      },
      {
        type: "closing",
        lines: [
          "Khách vào phòng khách, không vào khu làm việc: mạng khách là phòng khách của công ty.",
          "Bài sau: làm việc ở quán cà phê, việc nào ổn và việc nào để về văn phòng.",
        ],
      },
    ],
  },
  {
    id: 2728,
    slug: "wifi-quan-ca-phe-lam-viec-duoc-gi-khong-nen-lam-gi",
    title: "Chặng 66, Bài 9: Làm việc ở quán cà phê: việc nào ổn, việc nào để về văn phòng",
    subtitle: "Wi-Fi công cộng như bàn chung ngoài quán: đọc báo thì được, để hồ sơ nhạy cảm thì đừng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "☕",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn ngồi quán cà phê và sếp nhắn: gửi gấp bảng lương tháng này. Wi-Fi quán miễn phí, ai cũng dùng được, và bạn chỉ cần bấm gửi. Chính vì ai cũng dùng được nên có người lạ ngồi cạnh nhìn thấy màn hình hoặc cố thử đọc lưu lượng mạng. Phân loại việc nào hợp lý ở quán, việc nào để về văn phòng giúp bạn vừa linh hoạt vừa không gây rủi ro cho công ty.",
    openingQuestion:
      "Bạn đang ở quán cà phê dùng Wi-Fi miễn phí, sếp nhắn gửi bảng lương cả phòng. Điều nào hợp lý nhất?",
    openingOptions: [
      "Hẹn gửi khi về văn phòng hoặc dùng kênh an toàn công ty cho phép",
      "Gửi ngay qua Wi-Fi quán vì mật khẩu Wi-Fi có đặt nên an toàn rồi",
      "Chụp màn hình bảng lương gửi qua mạng xã hội cho nhanh",
      "Nhờ người ngồi bàn bên cạnh giữ hộ máy trong lúc bạn đi gọi cà phê",
    ],
    correctOption: 0,
    explanation:
      "Bảng lương là dữ liệu nhạy cảm nên xử lý ở nơi và bằng kênh công ty tin tưởng: văn phòng, hoặc kênh công ty cho phép như VPN do IT cấp. Wi-Fi quán dùng chung với rất nhiều người lạ, nên có mật khẩu chung chưa chứng minh gì về độ an toàn. Gửi qua mạng xã hội là đưa dữ liệu ra ngoài kênh công việc. Nhờ người lạ giữ máy là rủi ro thêm, dù bạn chỉ rời đi một lúc.",
    diagram: [
      { label: "Phân loại việc: công khai, bình thường hay nhạy cảm", arrow: true },
      { label: "Việc công khai hoặc bình thường: làm được ở quán", arrow: true },
      { label: "Việc nhạy cảm: về văn phòng hoặc dùng kênh công ty duyệt", arrow: true },
      { label: "Luôn khóa màn hình khi rời bàn, dù chỉ một phút" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự làm việc ở quán cà phê, mở bảng lương trên màn hình để soát lần cuối. Người ngồi bàn sau liếc thấy cột số và tên đồng nghiệp trên màn hình. Không cần tấn công mạng nào, dữ liệu đã lộ qua ánh mắt. Sau việc đó cô quy định cho mình: bảng lương và hợp đồng chỉ mở trong văn phòng.",
    },
    quiz: [
      {
        question: "Việc nào phù hợp để làm ở quán cà phê dùng Wi-Fi công cộng?",
        options: [
          "Soạn nháp bài thuyết trình không có số liệu nội bộ",
          "Mở bảng lương toàn công ty để soát số lần cuối",
          "Gửi danh sách khách hàng kèm số điện thoại cho bên thứ ba",
          "Nhập mật khẩu quản trị hệ thống kế toán của công ty",
        ],
        correct: 0,
        explanation:
          "Bản nháp không chứa dữ liệu nhạy cảm thì có bị nhìn thấy cũng ít hại. Bảng lương và danh sách khách có số điện thoại là dữ liệu cá nhân cần xử lý ở nơi an toàn. Nhập mật khẩu quản trị ở nơi công cộng vừa có nguy cơ bị nhìn trộm vừa đi qua mạng bạn không kiểm soát.",
      },
      {
        question: "Rủi ro thực tế nhất của việc mở tài liệu nhạy cảm ở quán cà phê là gì?",
        options: [
          "Người xung quanh nhìn thấy màn hình, cộng thêm mạng dùng chung với người lạ",
          "Quán cà phê tự động sao chép tệp của bạn về máy chủ của họ",
          "Cà phê đổ lên máy tính làm mất hết tệp đã lưu trên đám mây",
          "Wi-Fi công cộng luôn làm máy tính bị nhiễm phần mềm độc hại ngay",
        ],
        correct: 0,
        explanation:
          "Hai rủi ro phổ biến là bị nhìn trộm màn hình và dùng chung mạng với người lạ. Quán không tự sao chép tệp của bạn chỉ vì bạn dùng Wi-Fi của họ. Đổ cà phê làm hỏng máy nhưng tệp đã lưu trên đám mây vẫn còn. Và dùng Wi-Fi công cộng không phải lúc nào cũng làm nhiễm phần mềm độc hại.",
      },
      {
        question: "Công ty có cấp VPN và quy định dùng khi làm việc ngoài văn phòng. Nên làm gì ở quán cà phê?",
        options: [
          "Bật VPN của công ty trước khi mở tài liệu công việc",
          "Bỏ qua VPN vì nó chậm, tải tài liệu trực tiếp cho nhanh",
          "Cài thêm một VPN miễn phí tìm được trên mạng để dùng thay",
          "Chỉ bật VPN khi đã thấy máy có dấu hiệu bị xâm nhập",
        ],
        correct: 0,
        explanation:
          "VPN của công ty là kênh IT đã kiểm tra và cho phép. Bỏ qua nó vì chậm là đánh đổi an toàn lấy tốc độ. VPN miễn phí không rõ nguồn là rủi ro khác, vì bạn đưa lưu lượng cho một bên không ai kiểm chứng. Bật VPN khi đã có dấu hiệu xâm nhập thì quá muộn.",
      },
      {
        question: "Bạn cần đi vệ sinh hai phút, máy mở sẵn tài liệu công việc. Cách làm đúng?",
        options: [
          "Khóa màn hình hoặc mang máy theo",
          "Để máy mở nguyên và nhờ người bàn bên trông giúp một chút",
          "Gập nắp máy xuống nhưng không khóa vì đã tắt màn hình",
          "Để máy mở nguyên vì quán có camera nên không ai dám đụng tới",
        ],
        correct: 0,
        explanation:
          "Khóa màn hình hoặc mang máy theo là hai cách duy nhất chắc chắn. Nhờ người lạ trông thì chính họ có thể xem. Gập nắp đôi khi chỉ làm máy ngủ chứ chưa chắc khóa. Có camera không ngăn được người thò tay chụp màn hình trong vài giây.",
      },
      {
        question: "Dùng điểm phát Wi-Fi từ điện thoại của bạn thay cho Wi-Fi quán. Nhận định nào đúng?",
        options: [
          "Ít người lạ dùng chung hơn nên thường tốt hơn Wi-Fi công cộng của quán",
          "Hoàn toàn an toàn tuyệt đối vì đó là điện thoại của chính bạn",
          "Không có tác dụng gì vì mọi mạng đều giống nhau về mức rủi ro",
          "Bị cấm ở mọi công ty nên không ai được phép dùng cách này",
        ],
        correct: 0,
        explanation:
          "Điểm phát từ điện thoại là mạng của riêng bạn, không chia sẻ với khách quán, nên thường tốt hơn mạng công cộng. Nhưng không có gì an toàn tuyệt đối: vẫn cần mật khẩu mạnh cho điểm phát và xem quy định công ty. Nói mọi mạng như nhau là sai. Và không phải công ty nào cũng cấm, nên hãy hỏi IT.",
      },
      {
        question: "Quy tắc phân loại nào giúp bạn quyết việc nào làm ở quán cà phê?",
        options: [
          "Nếu lộ ra thì công ty hoặc người khác bị thiệt thì để về văn phòng",
          "Nếu việc đó dài hơn mười phút hoặc cần nhiều tệp lớn thì để về văn phòng",
          "Nếu việc đó cần Internet thì để về văn phòng",
          "Nếu việc đó làm trên máy tính thì để về văn phòng",
        ],
        correct: 0,
        explanation:
          "Tiêu chí hợp lý là hậu quả nếu lộ. Độ dài việc không liên quan độ nhạy cảm. Cần Internet thì gần như mọi việc đều cần, nên quy tắc đó vô dụng. Và làm trên máy tính cũng là gần như mọi việc, nên quy tắc này cũng không phân loại được.",
      },
    ],
    keyTakeaways: [
      "Wi-Fi công cộng dùng chung với nhiều người lạ, và màn hình có thể bị nhìn trộm.",
      "Phân loại theo hậu quả nếu lộ: nhạy cảm thì để về văn phòng hoặc dùng kênh công ty duyệt.",
      "Nếu công ty có VPN, bật trước khi mở tài liệu công việc.",
      "Rời bàn dù một phút cũng khóa màn hình hoặc mang máy theo.",
      "Chưa rõ quy định thì hỏi IT, đừng tự đoán.",
    ],
    practicePrompt: {
      question:
        "Chị Mai ngồi quán cà phê, cần trả lời khách bằng email có đính kèm bảng giá nội bộ. Chị nên làm gì trước?",
      options: [
        "Xem bảng giá có phải tài liệu nhạy cảm không và hỏi IT về kênh cho phép",
        "Gửi luôn vì email nào cũng an toàn như nhau ở mọi nơi",
        "Đăng bảng giá lên mạng xã hội rồi gửi đường dẫn cho khách",
        "Nhờ AI gửi email giúp vì AI biết rõ kênh nào an toàn",
      ],
      correct: 0,
      explanation:
        "Phân loại trước rồi mới chọn kênh. Email an toàn tới đâu còn tuỳ tài liệu và quy định công ty, nên không nói được mọi nơi như nhau. Đăng công khai bảng giá nội bộ là lộ dữ liệu. AI không biết quy định của công ty bạn và không thay việc hỏi IT.",
    },
    summary: {
      keyIdea: "Ở nơi công cộng, việc nhạy cảm cần chờ tới nơi an toàn; việc bình thường thì làm được.",
      formula: "Nếu lộ thì hại bao nhiêu? Nhiều thì về văn phòng hoặc dùng kênh duyệt.",
      commonMistake: "Nghĩ Wi-Fi quán có mật khẩu nghĩa là riêng tư.",
      action: "Viết ba việc bạn sẽ không làm ở nơi công cộng và ba việc làm được.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết hai danh sách ngắn trong ghi chú: ba loại tài liệu bạn chỉ mở ở văn phòng (ví dụ bảng lương, hợp đồng, danh sách khách), và ba việc làm được ở quán cà phê. Hỏi IT xem công ty có VPN hay kênh an toàn nào cho làm việc từ xa, rồi ghi tên kênh đó vào cuối ghi chú.",
      secondary: "Đặt thói quen khóa màn hình bằng phím tắt mỗi khi rời bàn.",
    },
    sections: [
      {
        type: "lead",
        text: "Quán cà phê là nơi dễ làm việc và cũng là nơi dễ lộ dữ liệu. Bài này dạy một cách phân loại việc đơn giản: việc nào làm ở quán được, việc nào để về văn phòng.",
      },
      {
        type: "feynman",
        title: "Wi-Fi công cộng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chiếc bàn chung ở quán. Bạn ngồi đọc báo hay viết nháp thì thoải mái. Nhưng bạn sẽ không trải hồ sơ khách hàng ra bàn đó, vì người ngồi cạnh có thể nhìn thấy. Wi-Fi công cộng giống chiếc bàn chung ấy: chung với người lạ.",
        columns: ["Khía cạnh", "Bàn chung ở quán", "Wi-Fi quán"],
        rows: [
          ["Ai ngồi cạnh", "Người lạ", "Người lạ cùng mạng"],
          ["Việc hợp lý", "Đọc báo, viết nháp", "Soạn nháp, đọc tin, họp thông thường"],
          ["Việc không nên", "Trải hồ sơ khách hàng ra", "Mở bảng lương, hợp đồng, mật khẩu quản trị"],
          ["Cách an toàn", "Mang hồ sơ về văn phòng", "Về văn phòng hoặc dùng kênh công ty duyệt"],
        ],
        oneLiner: "Không phải mọi việc đều cấm ở quán: chỉ cần tự hỏi nếu lộ ra thì ai bị hại.",
      },
      { type: "heading", text: "Một câu hỏi để phân loại: nếu lộ thì sao?" },
      {
        type: "paragraph",
        text: "Bạn không cần thuộc danh sách dài. Trước mỗi việc, hỏi một câu: nếu người lạ thấy hoặc lấy được nội dung này, công ty hay khách hàng có bị thiệt không? Nếu có, việc đó chờ tới khi ở nơi an toàn. Nếu không, bạn làm thoải mái ở quán.",
      },
      {
        type: "flow",
        title: "Ba bước trước khi mở tài liệu ở quán",
        steps: [
          { label: "Phân loại tài liệu", detail: "Công khai, thông thường hay nhạy cảm? Bảng lương, hợp đồng, danh sách khách là nhạy cảm." },
          { label: "Chọn nơi và kênh", detail: "Nhạy cảm thì về văn phòng hoặc dùng kênh công ty duyệt, như VPN do IT cấp. Bình thường thì làm được ở quán." },
          { label: "Giữ thói quen an toàn", detail: "Ngồi quay lưng vào tường nếu được, khóa màn hình khi rời bàn, đăng xuất khi xong." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát danh sách mẹo AI đưa cho bạn",
        task: "Bạn nhờ AI liệt kê mẹo làm việc ở quán cà phê. Bấm vào những câu nói điều AI không thể biết hoặc khẳng định quá mức.",
        segments: [
          { text: "Khóa màn hình hoặc mang máy theo mỗi khi bạn rời bàn." },
          { text: "Việc có dữ liệu nhạy cảm như bảng lương nên để về văn phòng hoặc dùng kênh công ty duyệt." },
          { text: "Wi-Fi của quán bạn đang ngồi chắc chắn đã bị tin tặc xâm nhập từ hôm qua.", error: "AI không có cách nào biết tình trạng Wi-Fi của một quán cụ thể. Khẳng định như vậy là bịa để dọa." },
          { text: "Nếu công ty có VPN, hãy bật nó trước khi mở tài liệu công việc." },
          { text: "Chỉ cần mạng có mật khẩu thì mọi việc, kể cả gửi bảng lương, đều an toàn tuyệt đối.", error: "Mật khẩu chung cho cả quán không ngăn người lạ cùng mạng hay người nhìn trộm màn hình. Không có thứ gì an toàn tuyệt đối." },
          { text: "Hỏi IT của công ty nếu bạn chưa chắc một việc có được làm ngoài văn phòng không." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Làm ở quán cà phê được",
          text: "Soạn nháp, đọc tài liệu công khai, họp thông thường không đụng tới dữ liệu nhạy cảm, viết email không đính kèm tệp nội bộ. Hậu quả nếu bị nhìn thấy là nhỏ.",
        },
        right: {
          label: "Để về văn phòng",
          text: "Bảng lương, hợp đồng, danh sách khách kèm số điện thoại, nhập mật khẩu quản trị, tải dữ liệu nội bộ lớn. Nếu lộ thì công ty hoặc người khác bị thiệt và khó lấy lại.",
        },
      },
      {
        type: "scenario",
        title: "Gửi bảng lương từ quán cà phê",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đang ngồi quán cà phê dùng Wi-Fi miễn phí. Sếp nhắn: Em gửi gấp bảng lương tháng này cho kế toán trưởng nhé.",
            choices: [
              { label: "Mở bảng lương ra soát rồi gửi luôn qua Wi-Fi quán", next: "bad_send" },
              { label: "Nhắn sếp: Bảng lương để em gửi qua kênh an toàn khi về văn phòng hoặc qua VPN", next: "s2" },
            ],
          },
          bad_send: {
            text: "Người ngồi bàn sau liếc thấy cột số và tên đồng nghiệp trên màn hình. Mấy ngày sau có tin đồn về mức lương trong phòng, và bạn là người bị hỏi đầu tiên.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đồng ý chờ, nhưng nói: Em chắc kịp trong một tiếng chứ? Bạn đang cách văn phòng khoảng 20 phút.",
            choices: [
              { label: "Đặt tách cà phê xuống, đi về và gửi ở văn phòng hoặc bằng VPN công ty", next: "good" },
              { label: "Ở lại quán và nhờ bạn bên cạnh giữ hộ máy trong lúc đi lấy thêm cà phê", next: "bad_leave" },
            ],
          },
          bad_leave: {
            text: "Bạn quay lại thì máy đã bị người lạ xem qua lúc không ai để ý. Bạn không biết họ xem những gì và phải báo IT.",
            ending: "bad",
          },
          good: {
            text: "Bạn về văn phòng, gửi bảng lương đúng hạn qua kênh công ty cho phép. Quán cà phê vẫn dùng được cho việc soạn nháp buổi chiều.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Khi nhờ AI giúp việc ngoài văn phòng",
        text: "AI không biết quy định bảo mật của công ty bạn, nên đừng hỏi AI việc nào được làm ở ngoài. Hỏi IT hoặc bộ phận an toàn thông tin. AI chỉ nên giúp soạn nháp hay tóm tắt những thứ không chứa dữ liệu nhạy cảm.",
      },
      {
        type: "closing",
        lines: [
          "Hỏi một câu trước khi mở tài liệu: nếu lộ ra thì ai bị hại?",
          "Bài sau: vẽ sơ đồ mạng nhà hoặc văn phòng của bạn và nhờ AI chỉ chỗ nghẽn, chỗ rủi ro.",
        ],
      },
    ],
  },
  {
    id: 2729,
    slug: "du-an-nho-so-do-mang-nha-hoac-van-phong-cua-ban",
    title: "Chặng 66, Bài 10: Dự án nhỏ: vẽ sơ đồ mạng nhà hoặc văn phòng của bạn",
    subtitle: "Liệt kê thiết bị nối vào đâu, rồi nhờ AI chỉ ra chỗ nghẽn và chỗ rủi ro.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã biết mạng chia nhau, mạng khách tách riêng và Wi-Fi công cộng chung với người lạ. Dự án nhỏ này gom lại thành một trang: thiết bị nào nối vào đâu, dây hay sóng, mạng nào. Khi có một trang như vậy, lúc mạng chậm hay có sự cố bạn và người hỗ trợ không phải đoán, và bạn thấy ngay chỗ nào đang chen chúc hay lộ.",
    openingQuestion:
      "Bạn định nhờ AI xem mạng nhà hoặc văn phòng có chỗ nào nghẽn hay rủi ro không. Điều nào nên làm trước khi hỏi AI?",
    openingOptions: [
      "Tự liệt kê thiết bị và cách nối của từng cái thành một trang ngắn",
      "Hỏi AI luôn mạng nhà tôi có vấn đề gì không, không cần nói thêm thiết bị nào",
      "Chụp ảnh bảng mật khẩu ở mặt sau bộ phát rồi gửi cho AI xem",
      "Đợi tới khi mạng hỏng hẳn rồi mới bắt đầu vẽ sơ đồ cho chắc",
    ],
    correctOption: 0,
    explanation:
      "AI chỉ biết những gì bạn kể: không có danh sách thiết bị thì nó chỉ nói chung chung hoặc đoán. Một trang ngắn liệt kê thiết bị, nối bằng dây hay sóng, thuộc mạng nào cho nó đủ chất liệu để chỉ chỗ nghẽn và rủi ro. Hỏi trống không sẽ nhận lời khuyên ai cũng áp dụng được. Mật khẩu ở mặt sau bộ phát là thông tin bảo mật, không nên gửi. Và chờ hỏng mới vẽ thì đã muộn, vì sơ đồ hữu ích nhất khi có trước sự cố.",
    diagram: [
      { label: "Liệt kê thiết bị: máy, điện thoại, máy in, camera", arrow: true },
      { label: "Ghi cách nối (dây hay Wi-Fi) và mạng (nội bộ hay khách)", arrow: true },
      { label: "Nhờ AI chỉ ra chỗ nghẽn và chỗ rủi ro, không gửi mật khẩu", arrow: true },
      { label: "Bạn kiểm lại từng nhận xét với thực tế rồi ghi việc cần làm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chủ tiệm nhỏ liệt kê thiết bị ở tiệm: hai máy tính tiền, một máy in hóa đơn, một camera, điện thoại nhân viên và điện thoại khách. Nhìn bảng, anh thấy mọi thứ, kể cả camera và điện thoại khách, cùng nối vào một mạng Wi-Fi duy nhất. Anh quyết định nhờ người lắp đặt tách mạng khách ra riêng. Bản liệt kê mất mười lăm phút nhưng cho anh thấy điều trước đó anh chưa nghĩ tới.",
    },
    quiz: [
      {
        question: "Thông tin nào nên có trong bản liệt kê thiết bị để AI nhận xét được?",
        options: [
          "Tên thiết bị, nối bằng dây hay Wi-Fi, thuộc mạng nào",
          "Mật khẩu Wi-Fi, mật khẩu trang quản trị bộ phát và địa chỉ nhà",
          "Chỉ tên hãng của bộ phát Wi-Fi, vì AI tự suy ra phần còn lại",
          "Chỉ số lượng thiết bị là đủ, tên từng thiết bị thì không cần",
        ],
        correct: 0,
        explanation:
          "Tên thiết bị, dây hay sóng và mạng nào là ba thông tin đủ cho nhận xét về nghẽn và rủi ro. Mật khẩu và địa chỉ nhà là thông tin nhạy cảm không cần cho việc này. Tên hãng không cho biết cách nối. Và chỉ có số lượng thì AI không phân biệt được camera với máy in.",
      },
      {
        question: "Sơ đồ cho thấy 12 thiết bị cùng nối Wi-Fi vào một bộ phát, trong đó 3 cái xem video suốt ngày. Nhận xét hợp lý?",
        options: [
          "Đây có thể là chỗ nghẽn, vì các thiết bị cùng chia một đường mạng",
          "Chắc chắn không có vấn đề vì 12 là con số nhỏ so với bộ phát",
          "Chắc chắn phải thay bộ phát mới vì bộ phát cũ nào cũng hỏng",
          "Video không dùng mạng nên ba thiết bị đó không ảnh hưởng gì",
        ],
        correct: 0,
        explanation:
          "Nhiều thiết bị chia nhau đường mạng và ba cái xem video chiếm phần lớn, nên đó là nghi can cho chỗ nghẽn. Nhưng chỉ là nghi can, cần thử thêm. Nói chắc chắn không sao hay chắc chắn phải thay đều là kết luận vượt quá dữ kiện. Và video dùng nhiều mạng hơn hầu hết các việc khác.",
      },
      {
        question: "Bạn thấy camera và điện thoại khách cùng nối vào mạng với máy tính tiền. Điều đáng ghi nhận là gì?",
        options: [
          "Rủi ro: thiết bị lạ ở chung mạng với thiết bị xử lý tiền",
          "Điểm tốt: tất cả thiết bị cùng một mạng thì dễ quản lý",
          "Không đáng quan tâm vì camera và điện thoại khách không làm gì cả",
          "Hiển nhiên phải cấm khách dùng điện thoại trong tiệm",
        ],
        correct: 0,
        explanation:
          "Theo bài trước, thiết bị lạ nên ở mạng khách, tách khỏi thiết bị nhạy cảm. Dễ quản lý không bù được rủi ro đó. Camera và điện thoại khách có nối mạng và có thể bị nhiễm mà chủ không biết. Cấm khách dùng điện thoại là phản ứng thái quá, còn tách mạng thì giải quyết đúng chỗ.",
      },
      {
        question: "AI nhận xét: 'Bộ phát của bạn là loại chuẩn mới nhất nên không cần nâng cấp'. Bạn chưa hề kể loại bộ phát. Nên làm gì?",
        options: [
          "Gạch câu đó đi vì AI không có dữ liệu để khẳng định",
          "Tin vì AI thường đúng với mọi thiết bị mạng hiện nay",
          "Ghi vào sơ đồ như một sự thật rồi đưa cho IT xem",
          "Hỏi lại AI thêm ba lần, câu nào lặp lại nhiều nhất thì tin",
        ],
        correct: 0,
        explanation:
          "Bạn không đưa thông tin nên câu khẳng định đó do AI tự thêm, cần bỏ hoặc kiểm chứng bằng nhãn trên thiết bị. Tin vì AI thường đúng là bỏ qua việc nó không thấy bộ phát của bạn. Ghi vào sơ đồ rồi đưa IT sẽ đưa ra một điều sai thành bằng chứng. Hỏi nhiều lần và đếm câu lặp lại không biến phỏng đoán thành dữ kiện.",
      },
      {
        question: "Sau khi có nhận xét của AI, bước cuối cùng đúng là gì?",
        options: [
          "Kiểm từng nhận xét với thực tế rồi ghi việc cần làm",
          "Làm theo mọi nhận xét ngay, vì AI đã xem kỹ sơ đồ rồi",
          "Xóa sơ đồ đi để thông tin không bị lộ ra ngoài",
          "Gửi sơ đồ kèm mật khẩu cho một người bạn giữ giúp",
        ],
        correct: 0,
        explanation:
          "Nhận xét của AI là đề xuất để bạn kiểm: nhìn thiết bị thật, thử lại, hỏi IT nếu cần. Làm theo hết sẽ gồm cả điều AI đoán sai. Xóa sơ đồ thì mất công dùng được. Gửi mật khẩu cho người khác giữ là tạo thêm chỗ rò thay vì bớt.",
      },
    ],
    keyTakeaways: [
      "Một trang liệt kê thiết bị, dây hay sóng, mạng nào đã đủ để phân tích.",
      "Thiết bị lạ như camera và điện thoại khách nên ở mạng riêng, tách khỏi thiết bị xử lý tiền hay dữ liệu.",
      "Nhiều thiết bị xem video chung một bộ phát là nghi can chỗ nghẽn.",
      "Không gửi mật khẩu hay địa chỉ thật cho AI.",
      "Nhận xét của AI là đề xuất để kiểm, không phải kết luận.",
    ],
    practicePrompt: {
      question:
        "Anh Phúc liệt kê thiết bị của văn phòng 8 người và chuẩn bị nhờ AI phân tích. Anh nên đưa gì vào yêu cầu?",
      options: [
        "Bảng thiết bị có cách nối và mạng, đã bỏ mật khẩu, kèm câu hỏi cụ thể",
        "Toàn bộ thông tin đăng nhập trang quản trị bộ phát cho AI vào xem trực tiếp và tự tìm lỗi giúp anh",
        "Chỉ một câu hỏi chung chung: mạng của tôi ổn không",
        "Bản sơ đồ của một văn phòng khác trên mạng để so sánh",
      ],
      correct: 0,
      explanation:
        "Bảng thiết bị không mật khẩu cùng câu hỏi cụ thể cho AI đủ chất liệu mà không lộ thông tin bảo mật. Thông tin đăng nhập trang quản trị là thứ tuyệt đối không đưa. Câu hỏi chung chung cho ra câu trả lời chung chung. Sơ đồ của văn phòng khác không phản ánh mạng của anh.",
    },
    summary: {
      keyIdea: "Một trang sơ đồ mạng giúp bạn thấy chỗ nghẽn và rủi ro trước khi có sự cố.",
      formula: "Liệt kê thiết bị + cách nối + mạng nào + nhờ AI rà + tự kiểm = danh sách việc cần làm.",
      commonMistake: "Hỏi AI trống không, hoặc gửi cả mật khẩu cho AI để nó xem giúp.",
      action: "Dành 20 phút liệt kê thiết bị và xếp việc cần làm cho mạng nhà hoặc văn phòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một tờ giấy hoặc ghi chú và liệt kê mọi thiết bị nối mạng ở nhà hoặc văn phòng: tên thiết bị, nối bằng dây hay Wi-Fi, thuộc mạng nào. Bỏ hết mật khẩu, rồi dán bảng này vào AI và hỏi: chỗ nào có thể nghẽn, chỗ nào rủi ro. Mai mở lại trang ghi chú và đánh dấu nhận xét nào bạn đã kiểm với thực tế.",
      secondary: "Chọn một việc trong danh sách kết quả và làm trong tuần này.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau năm bài về mạng, đây là dự án gom lại: một trang sơ đồ cho chính mạng nhà hoặc văn phòng của bạn, rồi nhờ AI chỉ chỗ nghẽn và chỗ rủi ro. Bạn giữ phần thật, AI giúp phần rà.",
      },
      {
        type: "feynman",
        title: "Sơ đồ mạng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sơ đồ đường ống nước trong nhà: ống chính vào đâu, chia ra những phòng nào, vòi nào ở đâu. Khi nhà có chỗ yếu hay rò, thợ nhìn sơ đồ là biết khoanh vùng. Sơ đồ mạng là sơ đồ ống nước của Internet trong nhà bạn.",
        columns: ["Phần", "Ống nước trong nhà", "Mạng trong nhà"],
        rows: [
          ["Đường vào", "Ống chính từ ngoài đường", "Modem, dây cáp của nhà mạng"],
          ["Chia ra từng chỗ", "Ống nhánh tới các phòng", "Bộ phát Wi-Fi, dây mạng"],
          ["Điểm dùng", "Các vòi nước", "Máy tính, điện thoại, máy in, camera"],
          ["Chỗ yếu hay rò", "Vòi yếu, chỗ rò nước", "Chỗ nghẽn và chỗ thiết bị lạ vào chung"],
        ],
        oneLiner: "Có sơ đồ trong tay, bạn chỉ chỗ yếu được thay vì đoán mò.",
      },
      { type: "heading", text: "Năm phút liệt kê, mười lăm phút rà" },
      {
        type: "paragraph",
        text: "Bạn không cần biết kỹ thuật để làm sơ đồ. Chỉ cần đi một vòng và ghi từng thiết bị nối mạng: nó là gì, nối bằng dây hay sóng, thuộc mạng nội bộ hay mạng khách. Đừng ghi mật khẩu vào đó. Sau đó nhờ AI rà, và bạn tự kiểm lại bằng mắt.",
      },
      {
        type: "flow",
        title: "Từ bản liệt kê tới danh sách việc cần làm",
        steps: [
          { label: "Đi một vòng ghi thiết bị", detail: "Máy tính, điện thoại, máy in, camera, tivi, loa thông minh. Mỗi thứ một dòng." },
          { label: "Ghi cách nối và mạng", detail: "Dây hay Wi-Fi? Mạng nội bộ hay mạng khách? Nếu chưa biết, ghi dấu hỏi." },
          { label: "Nhờ AI rà chỗ nghẽn và rủi ro", detail: "Dán bảng đã bỏ mật khẩu và nêu câu hỏi cụ thể. Dặn AI chỉ dựa trên bảng, thiếu thì ghi [cần bổ sung]." },
          { label: "Tự kiểm với thực tế", detail: "Đối chiếu từng nhận xét với thiết bị thật. Điều AI tự thêm mà bảng không có thì gạch." },
          { label: "Chọn ba việc làm trước", detail: "Ghi việc, ai làm, hạn. Việc thuộc về IT thì gửi đề nghị thay vì tự chỉnh." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI rà sơ đồ mạng văn phòng nhỏ",
        task: "Bạn có bảng 10 thiết bị của văn phòng. Lắp yêu cầu để AI chỉ chỗ nghẽn và chỗ rủi ro mà không bịa thêm.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Văn phòng tôi có mấy cái máy, hỏi xem mạng có ổn không.", feedback: "Thiếu thiết bị, cách nối và mạng, AI chỉ có thể đưa lời khuyên chung chung hoặc đoán." },
              { text: "Đây là bảng 10 thiết bị, cách nối, mạng nào (dán, đã bỏ mật khẩu). Chỉ dựa trên bảng này.", good: true, feedback: "Có dữ liệu thật và giới hạn nguồn nên AI bám vào bảng và không bịa thêm." },
            ],
          },
          {
            id: "ask",
            label: "Câu hỏi",
            options: [
              { text: "Cho tôi mọi lời khuyên để mạng nhanh nhất có thể.", feedback: "Quá rộng, AI trả về danh sách dài có cả mẹo mua thiết bị đắt tiền." },
              { text: "Chỉ ra tối đa 3 chỗ có thể nghẽn và 3 chỗ rủi ro, mỗi chỗ kèm lý do lấy từ bảng.", good: true, feedback: "Giới hạn số lượng và đòi lý do lấy từ bảng để bạn kiểm được từng điều." },
            ],
          },
          {
            id: "unknown",
            label: "Khi thiếu thông tin",
            options: [
              { text: "Nếu thiếu gì, hãy tự giả định cho hợp lý.", feedback: "Mở cửa cho bịa: AI sẽ giả định loại bộ phát, tốc độ gói cước rồi trình bày như sự thật." },
              { text: "Nếu thiếu thông tin, ghi [cần bổ sung] và hỏi tôi, không tự giả định.", good: true, feedback: "Chỗ thiếu hiện rõ nên bạn biết cần bổ sung hay kiểm gì." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "ask", "unknown"],
            text: "Chỗ có thể nghẽn: (1) 6 thiết bị nối Wi-Fi vào một bộ phát, trong đó tivi phòng họp và 2 máy xem video; (2) máy in nối Wi-Fi ở cuối phòng, có thể yếu sóng.\nChỗ rủi ro: (1) camera và điện thoại khách cùng mạng với máy tính kế toán; (2) [cần bổ sung] bảng không ghi máy in thuộc mạng nào.",
          },
          {
            requires: ["data"],
            text: "Mạng của bạn dùng bộ phát chuẩn Wi-Fi 6 nên khá nhanh, gói cước khoảng 300 Mbps là đủ cho 10 thiết bị. Nên nâng cấp lên mạng mesh để tốt hơn.\n\n(Bảng không ghi loại bộ phát hay gói cước, AI tự thêm cả hai rồi gợi ý mua thiết bị.)",
          },
          {
            text: "Để mạng nhanh nhất, bạn nên thay toàn bộ thiết bị bằng loại mới, bật mọi tính năng tăng tốc, mua gói cước cao nhất và đặt bộ phát ở trung tâm...\n\n(Lời khuyên ai cũng áp dụng được, tốn tiền và không bám vào mạng thật của bạn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Có sơ đồ rồi nhờ AI rà",
          text: "AI bám vào bảng của bạn nên nhận xét cụ thể và kiểm được. Bạn thấy ngay thiết bị lạ nằm ở mạng nào. Khi có sự cố, bạn đưa sơ đồ cho người hỗ trợ và họ vào việc nhanh hơn.",
        },
        right: {
          label: "Hỏi AI mà không có sơ đồ",
          text: "AI chỉ có thể đưa lời khuyên chung hoặc đoán thiết bị của bạn. Bạn không biết câu nào áp dụng thật. Dễ tốn tiền nâng cấp một thứ không phải chỗ nghẽn.",
        },
      },
      {
        type: "scenario",
        title: "Rà mạng tiệm nhỏ cuối tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã liệt kê xong: 2 máy tính tiền, 1 máy in hóa đơn, 1 camera, 3 điện thoại nhân viên, điện thoại khách, tất cả đều nối một mạng Wi-Fi. Đã tới lúc nhờ AI rà.",
            choices: [
              { label: "Dán cả bảng kèm mật khẩu Wi-Fi và mật khẩu trang quản trị vào AI cho nó xem kỹ", next: "bad_pw" },
              { label: "Xóa mật khẩu khỏi bảng, dán vào AI, dặn chỉ dựa trên bảng và ghi chỗ thiếu", next: "s2" },
            ],
          },
          bad_pw: {
            text: "Mật khẩu của mạng tiệm nằm trong lịch sử một công cụ bên ngoài. Bạn phải đổi toàn bộ mật khẩu và cấu hình lại từng thiết bị, mất cả buổi chiều.",
            ending: "bad",
          },
          s2: {
            text: "AI chỉ ra: camera và điện thoại khách cùng mạng với máy tính tiền, và nó còn thêm: bộ phát của bạn là loại cũ nên chậm.",
            choices: [
              { label: "Ghi lại cả hai nhận xét như sự thật và đưa cho chủ tiệm", next: "bad_trust" },
              { label: "Giữ nhận xét đầu vì có trong bảng, gạch nhận xét về bộ phát vì bảng không ghi", next: "good" },
            ],
          },
          bad_trust: {
            text: "Chủ tiệm mua bộ phát mới theo lời AI, còn mạng khách vẫn chung với máy tính tiền. Tiền tốn nhưng rủi ro chính vẫn còn nguyên.",
            ending: "bad",
          },
          good: {
            text: "Bạn đề nghị tách mạng khách cho camera và điện thoại khách, việc còn lại đưa IT. Sơ đồ một trang được lưu lại cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Giữ kín những gì không cần cho AI",
        text: "Mật khẩu Wi-Fi, mật khẩu trang quản trị bộ phát, địa chỉ nhà, ảnh mặt sau thiết bị có nhãn: không đưa vào AI. Bảng thiết bị không có các thứ đó vẫn đủ để phân tích. Nếu mạng của công ty, hãy hỏi IT trước khi gửi sơ đồ ra ngoài.",
      },
      {
        type: "closing",
        lines: [
          "Một trang sơ đồ, một lượt AI rà, một lượt bạn tự kiểm: đủ để biết chỗ nghẽn và chỗ rủi ro.",
          "Bài sau: đám mây là máy tính của người khác mà bạn thuê chỗ để.",
        ],
      },
    ],
  },
];
