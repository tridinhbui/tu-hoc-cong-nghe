import type { Lesson } from "../lesson-types";

// Chặng 56, bài 11-15. Giáo trình: scripts/curriculum/stage-56.json.
// Không có khẳng định riêng của công cụ nào: chỉ khái niệm bền (giao việc hẹp,
// kiểm lại, xem trên màn hình nhỏ, tương phản, dung lượng ảnh, chữ mô tả ảnh).

const Q = (
  question: string,
  correct: string,
  d1: string,
  d2: string,
  d3: string,
  explanation: string,
) => ({ question, options: [correct, d1, d2, d3], correct: 0, explanation });

export const S56_C_LESSONS: Lesson[] = [
  {
    id: 2530,
    slug: "sua-mot-cho-khong-lam-hong-cho-khac",
    title: "Chặng 56, Bài 11: Sửa một chỗ mà không làm hỏng chỗ khác",
    subtitle: "Như nhờ thợ sơn một bức tường mà không muốn họ sơn luôn cả căn phòng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛠️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trang của bạn đã chạy được, chỉ có dòng tiêu đề cần đổi. Bạn nhờ AI sửa, nó trả về cả trang mới: tiêu đề đã đổi, nhưng số điện thoại biến mất và nút bấm đổi màu. Biết cách nói rõ chỗ nào được đụng, chỗ nào giữ nguyên, và nhìn lại toàn trang sau mỗi lần, giúp bạn sửa nhanh mà không mất thứ đã làm xong.",
    openingQuestion:
      "Trang của bạn đã xong, bạn chỉ muốn đổi dòng tiêu đề. Bạn nên nhờ AI như thế nào?",
    openingOptions: [
      "Nói rõ chỉ đổi dòng tiêu đề thành câu mới, giữ nguyên mọi phần còn lại",
      "Dán lại cả trang và bảo AI viết lại cho hay hơn một chút",
      "Nói tiêu đề chưa ổn rồi để AI tự chọn chỗ nào cần sửa",
      "Nhờ AI làm lại cả trang từ đầu với tiêu đề mới",
    ],
    correctOption: 0,
    explanation:
      "AI có xu hướng viết lại cả khối chữ khi yêu cầu còn rộng, và mỗi lần viết lại là một cơ hội làm mất chi tiết bạn đã chốt: số điện thoại, giờ mở cửa, màu nút. Khi bạn chỉ đích danh chỗ cần đổi và dặn giữ nguyên phần còn lại, phạm vi sửa nhỏ, bạn kiểm được nhanh. Viết lại cho hay hơn, để AI tự chọn chỗ sửa hay làm lại từ đầu đều mở rộng phạm vi thay đổi ra ngoài dòng bạn muốn.",
    diagram: [
      { label: "Lưu bản đang chạy tốt", arrow: true },
      { label: "Nói rõ: chỉ đổi chỗ này, giữ nguyên phần còn lại", arrow: true },
      { label: "AI trả bản mới", arrow: true },
      { label: "Bạn xem lại toàn trang rồi mới giữ bản mới" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Hà bán bánh tại nhà, có trang giới thiệu nhỏ. Chị nhờ AI đổi dòng khuyến mãi tháng này. Bản mới đổi đúng dòng đó nhưng giờ mở cửa cũng bị đổi từ 7 giờ thành 8 giờ. May là chị xem lại toàn trang trước khi gửi link cho khách, nên bắt được lỗi ngay và quay về bản đã lưu.",
    },
    quiz: [
      Q(
        "Bạn chỉ muốn đổi số điện thoại trên trang. Cách nhờ AI nào ít rủi ro nhất?",
        "Chỉ đổi số điện thoại ở phần liên hệ thành số này, giữ nguyên mọi chữ và màu khác",
        "Sửa số điện thoại giúp mình, và nếu thấy chỗ nào chưa hay thì cứ chỉnh luôn",
        "Dán lại cả trang kèm số mới rồi nhờ AI xuất ra một bản hoàn chỉnh mới",
        "Nói trang cần cập nhật liên hệ và để AI tự quyết định chi tiết nào đổi",
        "Phạm vi càng hẹp thì càng ít chỗ để hỏng. Cho phép chỉnh thêm chỗ chưa hay, xuất cả trang mới hay để AI tự quyết đều mở rộng phạm vi ra ngoài số điện thoại, nên bạn khó biết nó đã đụng tới đâu.",
      ),
      Q(
        "Sau khi AI sửa xong một dòng, bạn nên làm gì tiếp?",
        "Mở và xem lại cả trang từ trên xuống",
        "Chỉ nhìn đúng dòng vừa sửa vì phần khác chắc không đổi",
        "Hỏi AI có chắc không đụng chỗ khác rồi tin",
        "Lưu luôn và chờ khách báo nếu chỗ nào đó bị hỏng",
        "Lỗi thường nằm ở chỗ bạn không nhìn. Chỉ xem dòng vừa sửa sẽ bỏ sót phần bị đổi, hỏi AI thì nó có thể xác nhận nhầm, còn chờ khách báo nghĩa là khách là người kiểm thử đầu tiên của bạn.",
      ),
      Q(
        "Vì sao AI đôi khi làm hỏng chỗ bạn không hề nhắc tới?",
        "Nó viết lại cả khối chữ thay vì chỉ thay đúng chỗ bạn nêu",
        "Nó dùng chữ in hoa trong yêu cầu của bạn như lệnh sửa toàn bộ",
        "Nó luôn nhớ nhầm những phần cũ vì trang đã quá ba màn hình",
        "Nó cố làm khác đi để bạn thấy nhiều thay đổi",
        "AI sinh ra chữ mới mỗi lần, nên khi viết lại khối chữ nó có thể đổi chi tiết mà không báo. Không phải vì chữ in hoa, độ dài trang hay ý đồ gây khác biệt; nguyên nhân là phạm vi yêu cầu còn rộng.",
      ),
      Q(
        "Bản hiện tại đang chạy tốt. Trước khi nhờ AI sửa, việc nào nên làm?",
        "Lưu một bản sao, đặt tên có ngày, rồi mới nhờ sửa",
        "Xoá bản cũ đi để tránh nhầm lẫn giữa hai phiên bản của trang",
        "Chỉ ghi nhớ trong đầu trang cũ trông thế nào để so sánh sau",
        "Nhờ AI tự giữ bản cũ giúp vì nó luôn lưu lại mọi phiên bản",
        "Bản sao là đường lui khi bản mới hỏng. Xoá bản cũ thì mất đường lui, nhớ trong đầu thì không đủ chính xác để so từng chi tiết, và AI không tự giữ bản của bạn trừ khi bạn tự lưu.",
      ),
      Q(
        "Bạn có ba chỗ cần sửa. Cách làm nào đáng tin hơn?",
        "Sửa từng chỗ một, xem lại toàn trang sau mỗi lần",
        "Liệt kê cả ba chỗ trong một yêu cầu để AI sửa một lượt cho tiện",
        "Sửa cả ba rồi chỉ kiểm chỗ làm sau cùng",
        "Nhờ AI sửa hết rồi hỏi nó đã đổi gì để đỡ xem",
        "Mỗi lần chỉ một thay đổi nên khi có lỗi bạn biết ngay lần nào gây ra. Gộp ba chỗ làm lỗi khó truy nguồn, kiểm mỗi chỗ cuối là bỏ sót hai chỗ kia, còn báo cáo của AI về chính nó chưa phải kiểm chứng.",
      ),
    ],
    keyTakeaways: [
      "Lưu một bản chạy tốt trước khi nhờ sửa.",
      "Nói rõ chỗ được đổi và chỗ phải giữ nguyên.",
      "Mỗi lần chỉ một thay đổi.",
      "Sau mỗi lần sửa, xem lại cả trang, không chỉ chỗ vừa sửa.",
      "Nếu bản mới hỏng, quay về bản đã lưu thay vì vá tiếp.",
    ],
    practicePrompt: {
      question:
        "Anh Nam nhờ AI đổi giờ mở cửa từ 8 giờ thành 7 giờ rồi chỉ nhìn đúng dòng giờ mở cửa và lưu. Bước nào còn thiếu?",
      options: [
        "Xem lại cả trang, vì AI có thể đã đổi chỗ khác",
        "Nhờ AI đổi thêm lần nữa để chắc giờ mới đúng",
        "Gửi link cho khách và chờ phản hồi nếu có gì sai",
        "Xoá bản cũ để khỏi có hai phiên bản của trang",
      ],
      correct: 0,
      explanation:
        "Đổi đúng dòng chưa có nghĩa phần còn lại nguyên vẹn. Đổi thêm lần nữa làm tăng thêm rủi ro, gửi link rồi chờ phản hồi đẩy việc kiểm cho khách, còn xoá bản cũ thì mất đường lui khi bản mới có lỗi.",
    },
    summary: {
      keyIdea: "Sửa nhỏ, nói hẹp, kiểm rộng: phạm vi yêu cầu hẹp, phạm vi kiểm tra là cả trang.",
      formula: "Lưu bản tốt + yêu cầu chỉ đổi một chỗ + xem lại toàn trang = sửa không mất gì.",
      commonMistake: "Chỉ nhìn chỗ vừa sửa và tin rằng phần còn lại vẫn như cũ.",
      action: "Lần tới sửa trang, ghi trước câu giữ nguyên phần còn lại vào yêu cầu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở trang bạn đang làm (hoặc bất kỳ văn bản ngắn của bạn). Lưu một bản sao đặt tên có ngày. Chọn một dòng, nhờ AI chỉ đổi dòng đó và giữ nguyên phần còn lại. Sau đó đọc lại toàn bộ và ghi ra giấy bao nhiêu chỗ khác đã bị đổi.",
      secondary: "Ngày mai bạn sẽ được hỏi: có chỗ nào bị đổi ngoài ý muốn không, và bạn phát hiện bằng cách nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu bạn chỉ muốn đổi một dòng khuyến mãi trên trang. Mười phút sau số điện thoại biến mất. Bài này dạy cách sửa từng chỗ mà không phải sợ làm hỏng những chỗ đã xong.",
      },
      {
        type: "feynman",
        title: "Sửa một chỗ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc nhờ thợ sơn một bức tường trong nhà. Nếu bạn chỉ nói nhà này cần sơn lại cho đẹp, họ có thể sơn cả căn phòng, kể cả bức tường bạn vừa ưng ý. Nếu bạn chỉ tay vào một bức tường và nói chỉ sơn bức này, che các chỗ khác lại, thì nhà chỉ đổi một chỗ.",
        columns: ["Thành phần", "Nhờ thợ sơn", "Nhờ AI sửa trang"],
        rows: [
          ["Chỉ đúng chỗ", "Chỉ tay vào một bức tường", "Nêu dòng chữ cần đổi"],
          ["Che chỗ không sơn", "Dán băng keo quanh khung cửa", "Dặn giữ nguyên phần còn lại"],
          ["Xem kết quả", "Đi một vòng nhìn cả phòng", "Xem lại toàn trang"],
          ["Đường lui", "Chụp ảnh phòng trước khi sơn", "Lưu một bản sao trước khi sửa"],
        ],
        oneLiner: "Chỉ đúng chỗ, che phần còn lại, rồi đi một vòng xem cả nhà: đó là toàn bộ nghệ thuật sửa nhỏ.",
      },
      { type: "heading", text: "Vấn đề: sửa một chỗ, hỏng chỗ khác" },
      {
        type: "paragraph",
        text: "Khi bạn nhờ AI sửa, nó thường trả về cả trang chứ không chỉ dòng bạn nói. Mỗi lần viết lại, nó có thể đổi một con số, bỏ một dòng hay đổi một cụm từ mà không báo. Chữ vẫn trôi chảy nên bạn không thấy lạ, đến khi khách hỏi sao giờ mở cửa khác lúc trước.",
      },
      {
        type: "flow",
        title: "Một vòng sửa an toàn",
        steps: [
          { label: "Lưu bản đang chạy tốt", detail: "Sao chép file và đặt tên có ngày. Đây là đường lui: nếu bản mới hỏng, bạn quay về đây thay vì cố vá." },
          { label: "Nói rõ phạm vi", detail: "Nêu đúng dòng cần đổi, chữ mới là gì, và dặn giữ nguyên mọi phần còn lại, kể cả số, giờ, màu." },
          { label: "Nhận bản mới", detail: "AI trả về bản đã sửa. Chưa dùng vội: đây mới là bản đề xuất." },
          { label: "Xem lại toàn trang", detail: "Đọc từ trên xuống, để ý số điện thoại, giờ, giá, tên nút. Đặt bản cũ cạnh bản mới nếu có thể." },
          { label: "Giữ hoặc quay lại", detail: "Đúng hết thì giữ bản mới và lưu thành bản tốt tiếp theo. Có chỗ hỏng thì quay về bản cũ và nói hẹp hơn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Yêu cầu hẹp",
          text: "Chỉ đổi dòng tiêu đề thành câu này. Giữ nguyên số điện thoại, giờ mở cửa, màu nút. Bạn biết chỗ nào phải nhìn kỹ và dễ thấy khi có gì khác.",
        },
        right: {
          label: "Yêu cầu rộng",
          text: "Sửa trang cho hay hơn, cập nhật thông tin mới. AI tự chọn chỗ nào đổi nên mọi chỗ đều có thể đã đổi, và bạn phải đọc lại cả trang như lần đầu.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản AI vừa sửa",
        task: "Bạn chỉ nhờ AI đổi dòng khuyến mãi. Bản gốc có: tiêu đề Bánh nhà Hà, mở cửa 7 giờ - 18 giờ, số điện thoại ghi trong phần liên hệ. AI trả về bản dưới đây. Đánh dấu những đoạn AI đã tự đổi ngoài yêu cầu.",
        segments: [
          { text: "Bánh nhà Hà - bánh ngọt làm mỗi sáng." },
          { text: "Khuyến mãi tháng này: mua 3 tặng 1." },
          {
            text: "Mở cửa từ 8 giờ đến 18 giờ.",
            error: "Bản gốc ghi mở cửa 7 giờ; AI đổi sang 8 giờ dù bạn không yêu cầu, khách có thể đến nhầm giờ.",
          },
          {
            text: "Nhấn nút Đặt bánh để gửi đơn cho chị Hà.",
            error: "Bản gốc không có nút đặt bánh này; AI tự thêm một chức năng chưa hề tồn tại nên khách bấm sẽ không có gì xảy ra.",
          },
          { text: "Địa chỉ và số điện thoại ở phần liên hệ bên dưới." },
        ],
      },
      { type: "heading", text: "Tập làm: một buổi sửa thật" },
      {
        type: "scenario",
        title: "Sửa dòng khuyến mãi trước giờ mở bán",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn 30 phút trước khi bạn đăng link trang. Bạn cần đổi khuyến mãi từ mua 2 tặng 1 thành mua 3 tặng 1. Trang hiện đang chạy tốt.",
            choices: [
              { label: "Nhờ AI sửa ngay trên bản duy nhất đang có", next: "bad_nosave" },
              { label: "Lưu một bản sao có ngày, rồi nhờ sửa", next: "s2" },
            ],
          },
          bad_nosave: {
            text: "AI trả về bản mới, lỡ bỏ mất phần bản đồ. Bạn không còn bản cũ nào để so, phải tự dựng lại phần bản đồ từ trí nhớ và trễ giờ đăng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đã có bản sao. Giờ viết yêu cầu cho AI.",
            choices: [
              { label: "Chỉ đổi dòng khuyến mãi thành mua 3 tặng 1, giữ nguyên mọi phần khác", next: "s3" },
              { label: "Cập nhật trang cho khớp khuyến mãi mới", next: "bad_wide" },
            ],
          },
          bad_wide: {
            text: "AI đổi dòng khuyến mãi nhưng cũng viết lại phần giới thiệu và đổi tên nút. Bạn phải đọc lại cả trang để tìm xem còn gì khác, mất thêm nhiều thời gian.",
            ending: "bad",
          },
          s3: {
            text: "AI trả về bản mới. Dòng khuyến mãi đã đổi đúng.",
            choices: [
              { label: "Đăng luôn vì dòng khuyến mãi đúng rồi", next: "bad_skim" },
              { label: "Xem lại cả trang, so với bản sao trước khi đăng", next: "good" },
            ],
          },
          bad_skim: {
            text: "Sau khi đăng, một khách hỏi sao không thấy số điện thoại. AI đã bỏ dòng đó mà bạn không xem tới. Bạn phải sửa khi khách đã thấy.",
            ending: "bad",
          },
          good: {
            text: "Bạn phát hiện số điện thoại bị đổi một chữ số, quay về đúng số, rồi mới đăng. Bạn lưu bản này thành bản tốt tiếp theo.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nếu bản mới hỏng",
        text: "Đừng vá tiếp trên bản hỏng. Quay về bản đã lưu, và lần sau nói hẹp hơn: nêu đúng dòng và nhắc lại những gì phải giữ nguyên.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Lưu bản sao đặt tên có ngày.",
          "Bước 2 - Nêu đúng chỗ đổi và dặn giữ nguyên phần còn lại.",
          "Bước 3 - Xem lại toàn trang, để ý số, giờ, giá, tên nút.",
          "Bước 4 - Hỏng thì quay về bản cũ, đúng thì lưu thành bản tốt mới.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nói hẹp, kiểm rộng, luôn có đường lui.",
          "Bài sau: xem trang trên điện thoại, nơi khách của bạn thường xem.",
        ],
      },
    ],
  },
  {
    id: 2531,
    slug: "xem-tren-dien-thoai-truoc-vi-khach-xem-o-do",
    title: "Chặng 56, Bài 12: Xem trên điện thoại trước: khách của bạn thường xem ở đó",
    subtitle: "Như đi thử cửa hàng bằng đôi giày của khách: bạn chỉ thấy chỗ vấp khi đứng đúng chỗ họ đứng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📱",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn dựng trang trên máy tính và thấy ổn. Khách mở link từ tin nhắn trên điện thoại: chữ nhỏ phải phóng to, hai nút sát nhau bấm nhầm, ảnh tràn khỏi màn hình. Khách không báo lỗi, họ chỉ thoát. Xem trên màn hình nhỏ trước và mô tả chính xác điều bạn thấy cho AI giúp bạn sửa đúng chỗ.",
    openingQuestion:
      "Bạn dựng xong trang trên máy tính, trông rất đẹp. Bạn sắp gửi link cho khách qua tin nhắn. Bước nào nên làm trước?",
    openingOptions: [
      "Mở trang trên điện thoại và xem từ trên xuống, ghi chỗ khó đọc",
      "Gửi luôn vì máy tính đẹp thì điện thoại cũng sẽ đẹp tương tự",
      "Phóng to trình duyệt máy tính lên hết cỡ để kiểm tra kỹ hơn",
      "Hỏi AI trang này trên điện thoại có đẹp không rồi tin câu trả lời",
    ],
    correctOption: 0,
    explanation:
      "Màn hình điện thoại hẹp hơn nhiều nên cùng một trang được xếp khác đi: chữ dồn lại, nút xích sát, ảnh rộng hơn khung. Những thứ đó chỉ hiện ra khi bạn nhìn thật trên màn hình nhỏ. Máy tính đẹp không bảo đảm điều gì cho điện thoại, phóng to trình duyệt máy tính làm ngược lại, còn AI không nhìn thấy trang của bạn nên câu trả lời chỉ là đoán.",
    diagram: [
      { label: "Mở trang trên điện thoại thật", arrow: true },
      { label: "Ghi chỗ vấp: chữ, nút, ảnh", arrow: true },
      { label: "Mô tả cho AI đúng điều bạn thấy", arrow: true },
      { label: "Xem lại trên điện thoại sau khi sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Tuấn mở tiệm sửa xe và gửi link trang cho khách qua tin nhắn. Khách kể phải kéo ngang màn hình mới thấy hết số điện thoại. Anh mở trang bằng điện thoại của mình và thấy ngay một tấm ảnh rộng hơn màn hình. Anh nhờ AI chỉnh ảnh vừa khung, rồi mở lại trên điện thoại để xác nhận.",
    },
    quiz: [
      Q(
        "Vì sao nên xem trang trên điện thoại trước khi gửi cho khách?",
        "Màn hình hẹp xếp trang khác đi và làm lộ lỗi mà máy tính không cho thấy",
        "Vì điện thoại mạnh hơn máy tính nên hiển thị chữ rõ nét hơn nhiều",
        "Vì khách hàng chỉ dùng điện thoại và không bao giờ dùng máy tính",
        "Vì trình duyệt điện thoại sửa được những lỗi của trang khi hiển thị",
        "Cùng một trang được xếp lại theo chiều rộng màn hình nên lỗi chỉ hiện trên màn nhỏ. Điện thoại không rõ nét hơn, khách vẫn có người dùng máy tính, và trình duyệt không tự sửa lỗi giúp bạn.",
      ),
      Q(
        "Hai nút Gọi và Nhắn tin nằm sát nhau, bạn bấm nhầm hai lần. Cách mô tả nào giúp AI sửa đúng?",
        "Hai nút quá sát, hãy tăng khoảng cách và kích thước",
        "Trang trên điện thoại trông chưa ổn, bạn sửa giúp tôi cho đẹp hơn",
        "Bố cục điện thoại bị lỗi, hãy dựng lại toàn bộ phần liên hệ",
        "Nút chạy sai, hãy thay bằng loại nút khác mà bạn thấy hợp hơn",
        "Mô tả đúng chỗ vấp và kết quả mong muốn thì AI sửa đúng chỗ. Nói chung chung là chưa ổn hoặc để AI dựng lại cả phần làm phạm vi lan rộng, và đổi loại nút không giải quyết việc chúng sát nhau.",
      ),
      Q(
        "Ảnh trên trang rộng hơn màn hình điện thoại, bạn phải kéo ngang mới thấy hết. Bạn nên nói gì với AI?",
        "Ảnh đang tràn khỏi chiều rộng màn hình điện thoại, hãy cho vừa khung",
        "Ảnh này quá to nên hãy xoá hẳn ảnh đi cho trang đỡ nặng hơn",
        "Trang bị lỗi trên điện thoại, hãy viết lại toàn bộ trang",
        "Hãy thu nhỏ mọi chữ trên trang cho vừa với chiều rộng của ảnh",
        "Mô tả hiện tượng (ảnh tràn chiều rộng) và kết quả muốn có (vừa khung) là đủ để AI xử lý đúng chỗ. Xoá ảnh làm mất nội dung, viết lại cả trang là phạm vi quá rộng, còn thu nhỏ chữ chữa sai nguyên nhân.",
      ),
      Q(
        "Chữ trong đoạn giới thiệu nhỏ đến mức phải phóng to hai ngón tay để đọc. Đó là dấu hiệu gì?",
        "Cỡ chữ quá nhỏ cho màn hình điện thoại, cần tăng lên",
        "Khách hàng nên tự chỉnh cỡ chữ trong máy của họ cho dễ đọc",
        "Điện thoại của bạn đời cũ nên hiển thị chữ nhỏ hơn bình thường",
        "Đoạn chữ này quá dài nên cần thay bằng một tấm ảnh chứa chữ",
        "Khách phải phóng to để đọc nghĩa là cỡ chữ chưa phù hợp, và đó là việc của trang chứ không phải việc của khách. Đổ lỗi cho máy cũ hay thay chữ bằng ảnh đều không giải quyết, còn làm chữ khó đọc hơn.",
      ),
      Q(
        "Sau khi AI chỉnh xong, bạn làm gì để chắc lỗi đã hết?",
        "Mở lại trên điện thoại và kiểm lại cả những chỗ không được nhắc tới",
        "Chỉ xem trên máy tính vì AI chắc đã chỉnh",
        "Hỏi AI đã sửa xong chưa và tin vào câu trả lời của nó",
        "Gửi luôn cho khách và chờ phản hồi nếu còn chỗ nào chưa ổn",
        "Chỉ có nhìn lại trên đúng màn hình nhỏ mới biết lỗi còn hay hết, và một lần sửa có thể làm lệch chỗ khác. Xem trên máy tính, hỏi AI hay chờ khách đều không thay được lần kiểm bằng mắt của bạn.",
      ),
    ],
    keyTakeaways: [
      "Khách thường mở link bằng điện thoại, nên xem ở đó trước.",
      "Ba thứ hay vấp: chữ quá nhỏ, nút quá sát, ảnh tràn khung.",
      "Mô tả cho AI điều bạn thấy và điều bạn muốn, không chỉ nói chưa đẹp.",
      "Sửa xong, mở lại trên điện thoại một lần nữa.",
      "Dùng điện thoại thật nếu có; khung xem thử trên máy tính chỉ là bước đầu.",
    ],
    practicePrompt: {
      question:
        "Chị Mai xem trang trên điện thoại thấy nút Gọi ngay bé xíu, sát với nút Nhắn tin. Chị nên nhờ AI như thế nào?",
      options: [
        "Hai nút quá nhỏ và sát nhau, hãy làm to hơn và cách xa nhau",
        "Phần liên hệ chưa đẹp, hãy làm lại phần đó cho chuyên nghiệp",
        "Trang cần thêm nhiều nút hơn để khách có nhiều lựa chọn liên hệ",
        "Bỏ hẳn nút Nhắn tin đi để khỏi bấm nhầm và chỉ giữ lại nút Gọi thôi",
      ],
      correct: 0,
      explanation:
        "Nói rõ hiện tượng và kết quả muốn có thì AI sửa đúng việc. Làm lại cả phần liên hệ thì mơ hồ và rộng, thêm nút không chữa nút sát nhau, còn bỏ nút là bỏ một cách liên hệ mà khách có thể cần.",
    },
    summary: {
      keyIdea: "Xem trang bằng mắt của khách: màn hình nhỏ, ngón tay to, thời gian ít.",
      formula: "Mở trên điện thoại + ghi chỗ vấp + mô tả cụ thể cho AI + mở lại = trang dễ dùng.",
      commonMistake: "Tin rằng trang đẹp trên máy tính thì cũng đẹp trên điện thoại.",
      action: "Mở trang của bạn trên điện thoại và ghi ba điều khiến bạn vấp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một trang của bạn (hoặc một trang bất kỳ có nút liên hệ) trên điện thoại. Cuộn từ đầu đến cuối và ghi lại ba chỗ chữ quá nhỏ, nút quá sát hoặc ảnh tràn. Viết mỗi chỗ thành một câu mô tả mà bạn sẽ gửi cho AI.",
      secondary: "Ngày mai bạn sẽ được hỏi ba chỗ vấp đó là gì và bạn đã mô tả cho AI ra sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn gửi link cho khách qua tin nhắn và họ mở ngay trên điện thoại. Trang bạn tự hào trên máy tính có thể là một màn hình khó đọc ở đó. Bài này dạy cách xem trang bằng mắt của khách.",
      },
      {
        type: "feynman",
        title: "Xem trên điện thoại đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc dựng một cửa hàng: bạn chỉ biết lối đi có chật không khi tự đi thử, tay xách túi, như một khách. Xem trang trên điện thoại cũng vậy, bạn đứng ở chỗ khách đứng để thấy chỗ vấp.",
        columns: ["Thành phần", "Đi thử cửa hàng", "Xem trang trên điện thoại"],
        rows: [
          ["Góc nhìn", "Đứng ở cửa như khách", "Cầm điện thoại như khách"],
          ["Chỗ vấp", "Lối đi hẹp, biển nhỏ", "Chữ nhỏ, nút sát, ảnh tràn"],
          ["Ghi lại", "Đánh dấu chỗ khách khó đi", "Ghi từng chỗ khó đọc hoặc khó bấm"],
          ["Sửa", "Dời kệ, đổi biển", "Mô tả cho AI để chỉnh đúng chỗ"],
        ],
        oneLiner: "Muốn biết khách vấp ở đâu thì phải đứng đúng chỗ khách đứng: cầm điện thoại, cuộn trang, bấm thử.",
      },
      { type: "heading", text: "Vì sao điện thoại phải đi trước" },
      {
        type: "paragraph",
        text: "Màn hình điện thoại hẹp, nên các phần nằm cạnh nhau trên máy tính bị xếp chồng lên nhau hoặc bị ép lại. Ngón tay lại to hơn con trỏ chuột rất nhiều, nên nút nhỏ hay sát nhau dễ bấm nhầm. Nhiều khách lần đầu thấy trang của bạn qua một tin nhắn, nên ấn tượng đầu tiên thường đến từ màn hình nhỏ.",
      },
      {
        type: "flow",
        title: "Một vòng xem trên điện thoại",
        steps: [
          { label: "Mở trang bằng điện thoại", detail: "Mở link như khách sẽ mở: từ tin nhắn hoặc từ ô địa chỉ. Đừng phóng to hay xoay ngang." },
          { label: "Cuộn từ trên xuống dưới", detail: "Đọc thật, không lướt. Ghi bất cứ chỗ nào bạn phải nheo mắt, phóng to hoặc kéo ngang." },
          { label: "Bấm thử các nút", detail: "Nút gọi, nút nhắn tin, đường dẫn bản đồ: bấm thử từng cái bằng ngón tay, xem có bấm nhầm không." },
          { label: "Ghi thành câu cụ thể", detail: "Ví dụ: chữ trong phần giá quá nhỏ; hai nút ở cuối trang sát nhau; ảnh đầu trang rộng hơn màn hình." },
          { label: "Nhờ AI sửa rồi xem lại", detail: "Đưa từng câu cho AI, sửa từng chỗ, rồi mở lại trên điện thoại để xác nhận." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mô tả cụ thể",
          text: "Ảnh đầu trang rộng hơn màn hình, phải kéo ngang mới thấy hết. Hãy cho ảnh vừa chiều rộng màn hình. AI biết sửa đúng chỗ nào.",
        },
        right: {
          label: "Mô tả mơ hồ",
          text: "Trang trên điện thoại trông chưa ổn, bạn sửa cho đẹp hơn. AI phải tự đoán chỗ chưa ổn và dễ đổi cả những chỗ đã ổn.",
        },
      },
      {
        type: "callout",
        label: "AI không nhìn thấy trang của bạn",
        text: "Nếu bạn chỉ dán chữ và hỏi trang có đẹp trên điện thoại không, AI chỉ đoán. Mắt bạn, trên điện thoại thật, mới là công cụ kiểm tra. AI giúp ở bước sửa sau khi bạn mô tả được điều mình thấy.",
      },
      { type: "heading", text: "Tập làm: một lần duyệt trang trên điện thoại" },
      {
        type: "scenario",
        title: "Trước giờ gửi link cho khách",
        start: "s1",
        nodes: {
          s1: {
            text: "Trang tiệm sửa xe của bạn đã xong, đẹp trên máy tính. Bạn định gửi link cho 50 khách quen qua Zalo chiều nay.",
            choices: [
              { label: "Gửi ngay vì trên máy tính đã đẹp", next: "bad_send" },
              { label: "Mở trang trên điện thoại của bạn, cuộn một lượt", next: "s2" },
            ],
          },
          bad_send: {
            text: "Nhiều khách mở trên điện thoại và thấy số điện thoại nằm lệch ra ngoài màn hình. Vài người thoát ra không gọi. Bạn chỉ biết khi một khách quen nhắn hỏi sao không thấy số.",
            ending: "bad",
          },
          s2: {
            text: "Trên điện thoại, bạn thấy hai chỗ: chữ giờ mở cửa rất nhỏ, và ảnh đầu trang rộng hơn màn hình. Bạn mở ứng dụng AI để nhờ sửa.",
            choices: [
              { label: "Gõ: Trang trên điện thoại xấu, sửa giúp tôi", next: "bad_vague" },
              { label: "Gõ: Chữ giờ mở cửa quá nhỏ, hãy tăng cỡ; ảnh đầu trang tràn khung, hãy cho vừa chiều rộng", next: "s3" },
            ],
          },
          bad_vague: {
            text: "AI đổi toàn bộ màu, phông chữ và bố cục theo ý nó. Giờ mở cửa vẫn nhỏ, ảnh vẫn tràn, còn trang thì khác hẳn bản bạn đã duyệt.",
            ending: "bad",
          },
          s3: {
            text: "AI trả về bản mới. Bạn cần biết hai lỗi kia đã hết chưa.",
            choices: [
              { label: "Mở lại trên điện thoại, cuộn lại cả trang và bấm thử các nút", next: "good" },
              { label: "Chỉ xem trên máy tính vì tiện hơn", next: "bad_desktop" },
            ],
          },
          bad_desktop: {
            text: "Trên máy tính trang vẫn đẹp, nên bạn gửi link. Trên điện thoại, ảnh vẫn hơi tràn vì AI chỉ sửa một nửa. Khách lại thấy lỗi bạn tưởng đã hết.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy chữ đã đọc được, ảnh vừa khung, nút bấm không nhầm. Chiều đó bạn gửi link và không khách nào phải hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mở link trên điện thoại thật như khách sẽ mở.",
          "Bước 2 - Cuộn hết trang và ghi chỗ chữ nhỏ, nút sát, ảnh tràn.",
          "Bước 3 - Viết mỗi chỗ thành một câu nêu hiện tượng và điều muốn.",
          "Bước 4 - Nhờ AI sửa từng chỗ rồi mở lại trên điện thoại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Xem bằng mắt khách, mô tả bằng câu cụ thể.",
          "Bài sau: chọn màu và chữ để đọc dễ mà không cần là nhà thiết kế.",
        ],
      },
    ],
  },
  {
    id: 2532,
    slug: "chon-mau-va-chu-de-doc-khong-moi-mat",
    title: "Chặng 56, Bài 13: Chọn màu và chữ để đọc dễ, không cần là nhà thiết kế",
    subtitle: "Như chọn đồng phục cho quán: ít màu, một kiểu, nhìn vào là biết của ai.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn hỏi AI về màu cho trang và nhận về chín màu cùng ba kiểu chữ, đều nghe rất hợp lý. Dùng hết thì trang rối và khó đọc. Bạn không cần con mắt nhà thiết kế, chỉ cần một luật đơn giản: hai màu, một kiểu chữ, và chọn theo độ dễ đọc chứ không theo độ lạ.",
    openingQuestion:
      "AI đề xuất cho trang của bạn sáu màu và bốn kiểu chữ, màu nào cũng đẹp. Bạn nên làm gì?",
    openingOptions: [
      "Giữ tối đa hai màu và một kiểu chữ, chọn theo độ dễ đọc",
      "Dùng hết sáu màu để trang trông phong phú và nổi bật hơn",
      "Dùng bốn kiểu chữ, mỗi phần một kiểu để không bị nhàm chán",
      "Nhờ AI chọn lại cho đến khi ra bộ màu trông ấn tượng nhất",
    ],
    correctOption: 0,
    explanation:
      "Trang càng nhiều màu và kiểu chữ thì mắt người đọc càng khó biết nhìn vào đâu. Hai màu và một kiểu chữ tạo ra sự nhất quán và giữ chữ dễ đọc. Dùng hết sáu màu hay bốn kiểu chữ làm trang rối. Nhờ AI chọn lại tới khi ấn tượng là chọn theo độ lạ, không theo việc khách có đọc được hay không.",
    diagram: [
      { label: "Giới hạn: hai màu, một kiểu chữ", arrow: true },
      { label: "AI đề xuất ba phương án", arrow: true },
      { label: "Bạn thử đọc trên điện thoại", arrow: true },
      { label: "Chọn phương án dễ đọc nhất" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng khám nha khoa nhỏ nhờ AI gợi ý màu cho trang. Bản đầu có chữ xám nhạt trên nền trắng, rất thanh lịch nhưng khách lớn tuổi phải cố mới đọc được giờ khám. Phòng khám chọn bản chữ tối trên nền sáng, ít màu hơn nhưng ai cũng đọc được ngay.",
    },
    quiz: [
      Q(
        "Khi chọn màu cho trang đầu tiên của mình, giới hạn nào là hợp lý?",
        "Hai màu chính và một kiểu chữ cho toàn trang",
        "Càng nhiều màu càng tốt để trang trông nổi bật hơn hẳn",
        "Mỗi phần một bộ màu và một kiểu chữ riêng cho khỏi nhàm chán",
        "Không giới hạn gì, vì AI luôn biết phối màu đẹp hơn người thường",
        "Giới hạn giúp trang nhất quán và dễ đọc. Càng nhiều màu hay mỗi phần một kiểu làm mắt khách lạc hướng, và AI có thể phối màu đẹp nhưng không biết khách của bạn đọc trong điều kiện nào.",
      ),
      Q(
        "Khi so ba phương án AI đưa ra, tiêu chí nào đáng ưu tiên nhất?",
        "Chữ có đọc dễ không, nhất là trên màn hình điện thoại",
        "Phương án nào trông khác lạ và ít thấy trên các trang khác",
        "Phương án nào có nhiều màu tươi nhất vì dễ gây chú ý",
        "Phương án nào AI giải thích bằng câu chữ dài và thuyết phục nhất",
        "Khách vào trang để đọc thông tin, nên độ dễ đọc đứng trước độ lạ hay độ rực. Lời giải thích dài của AI cũng không chứng minh phương án đó đọc dễ; bạn phải tự nhìn thử.",
      ),
      Q(
        "Chữ xám nhạt trên nền trắng trông thanh lịch trên máy tính của bạn. Vấn đề có thể nằm ở đâu?",
        "Độ tương phản thấp nên khách dùng điện thoại ngoài nắng khó đọc",
        "Xám nhạt chỉ hợp in giấy, trang web thì không hiển thị được màu xám",
        "Chữ xám nhạt làm trang tải chậm hơn chữ đen vì nặng hơn",
        "Không có vấn đề gì vì mắt mọi người đều nhìn rõ như mắt bạn",
        "Tương phản giữa chữ và nền quyết định việc đọc được, nhất là với mắt kém hoặc màn hình có nắng. Trang web hiển thị màu xám bình thường, màu không làm trang nặng hơn, và mắt mỗi người nhìn rất khác nhau.",
      ),
      Q(
        "Bạn muốn AI đề xuất màu, cách ghi yêu cầu nào cho kết quả dùng được nhất?",
        "Trang tiệm bánh, khách lớn tuổi, cần tối đa hai màu, chữ tối trên nền sáng",
        "Hãy chọn cho tôi màu đẹp nhất mà bạn biết cho một trang web",
        "Phối màu cho trang của tôi thật sáng tạo và khác biệt",
        "Cho tôi mười bộ màu thịnh hành năm nay để tôi chọn cho kịp xu hướng",
        "Nêu loại trang, người xem và giới hạn giúp AI đề xuất đúng hoàn cảnh. Đẹp nhất, sáng tạo hay thịnh hành đều không rõ tiêu chí, nên ra kết quả hoa mỹ mà chưa chắc đọc được.",
      ),
      Q(
        "Bạn đã chọn bộ màu. Cách kiểm tra nào đáng tin nhất?",
        "Mở trang trên điện thoại, đọc một đoạn dài ngoài chỗ sáng",
        "Xem trên màn hình máy tính trong phòng tối vì màu hiện rõ hơn",
        "Hỏi AI bộ màu này dễ đọc không và dùng câu trả lời của nó",
        "Đưa cho một người bạn xem và hỏi họ có thấy đẹp không",
        "Dễ đọc là việc của mắt, nên phải đọc thật trên thiết bị khách dùng, ở chỗ sáng. Phòng tối làm bộ màu trông tốt hơn thực tế, AI không nhìn thấy trang, và hỏi có đẹp không là hỏi sở thích chứ không hỏi khả năng đọc.",
      ),
    ],
    keyTakeaways: [
      "Giới hạn: hai màu chính và một kiểu chữ.",
      "Chọn theo độ dễ đọc, không theo độ lạ.",
      "Chữ tối trên nền sáng (hoặc ngược lại) có tương phản tốt.",
      "Nhờ AI ba phương án, bạn chọn một sau khi đọc thử.",
      "Kiểm tra trên điện thoại, chỗ sáng, bằng một đoạn chữ dài.",
    ],
    practicePrompt: {
      question:
        "Anh Bình nhờ AI: Chọn màu đẹp cho trang của tôi. AI trả về bảy màu. Lần sau anh nên đổi yêu cầu thế nào?",
      options: [
        "Nêu loại trang, người xem, và giới hạn hai màu, chữ dễ đọc",
        "Xin AI thêm mười màu nữa để có nhiều lựa chọn hơn",
        "Yêu cầu AI chọn giúp màu đẹp nhất và không cần giải thích gì thêm",
        "Gõ lại y nguyên câu cũ cho tới khi AI đưa ít màu hơn",
      ],
      correct: 0,
      explanation:
        "AI trả lời theo yêu cầu bạn đưa, nên yêu cầu có hoàn cảnh và giới hạn cho kết quả dùng được. Xin thêm màu làm bạn càng khó chọn, đẹp nhất không có nghĩa dễ đọc, và gõ lại y nguyên không thay đổi thông tin AI nhận được.",
    },
    summary: {
      keyIdea: "Không cần là nhà thiết kế: giới hạn lựa chọn, rồi chọn cái đọc dễ nhất.",
      formula: "Hai màu + một kiểu chữ + ba phương án + thử đọc trên điện thoại = bộ màu dùng được.",
      commonMistake: "Chọn bộ màu vì nó trông đẹp trên máy tính mà chưa đọc thử trên điện thoại.",
      action: "Viết yêu cầu có loại trang, người xem và giới hạn hai màu, rồi nhờ AI ba phương án.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một yêu cầu cho AI: loại trang của bạn, khách là ai, tối đa hai màu, một kiểu chữ. Xin ba phương án. Mở từng phương án trên điện thoại, đọc một đoạn ba dòng ở chỗ sáng và chọn một. Ghi lý do chọn trong một câu.",
      secondary: "Ngày mai bạn sẽ được hỏi bạn chọn phương án nào và vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn không cần học thiết kế để có một trang dễ nhìn. Bạn cần vài luật đơn giản và một cách kiểm tra bằng mắt. Bài này cho bạn cả hai.",
      },
      {
        type: "feynman",
        title: "Chọn màu và chữ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới đồng phục của một quán cà phê: một hai màu, một kiểu chữ trên biển hiệu, nhìn từ xa là biết quán nào. Nếu mỗi nhân viên mặc một màu, một kiểu, khách sẽ thấy rối. Trang của bạn cũng vậy.",
        columns: ["Thành phần", "Đồng phục quán", "Trang của bạn"],
        rows: [
          ["Số màu", "Một hai màu chủ đạo", "Tối đa hai màu chính"],
          ["Kiểu chữ", "Một kiểu trên biển hiệu", "Một kiểu chữ cho cả trang"],
          ["Điều quan trọng nhất", "Khách nhận ra ngay quán", "Khách đọc được ngay thông tin"],
          ["Cách thử", "Nhìn từ đầu phố", "Đọc trên điện thoại ở chỗ sáng"],
        ],
        oneLiner: "Ít màu, một kiểu chữ, và cái đọc dễ nhất thắng cái lạ nhất.",
      },
      { type: "heading", text: "Vấn đề: quá nhiều lựa chọn đều nghe hợp lý" },
      {
        type: "paragraph",
        text: "AI rất giỏi đưa ra thật nhiều phương án, và phương án nào cũng có lời giải thích nghe hợp lý. Đó là cái bẫy: lời giải thích hay không có nghĩa màu đó dễ đọc. Bạn cần một tiêu chí do chính bạn đặt ra: khách đọc được thông tin trong vài giây.",
      },
      {
        type: "comparison",
        left: {
          label: "Nên",
          text: "Hai màu chính. Một kiểu chữ. Chữ tối trên nền sáng hoặc chữ sáng trên nền tối. Dùng màu thứ hai cho nút quan trọng nhất để khách biết bấm đâu.",
        },
        right: {
          label: "Nên tránh",
          text: "Nhiều màu tươi cạnh nhau. Chữ xám nhạt trên nền trắng. Mỗi phần một kiểu chữ. Chữ màu đặt trên nền ảnh khiến khó đọc.",
        },
      },
      {
        type: "flow",
        title: "Từ yêu cầu tới bộ màu dùng được",
        steps: [
          { label: "Viết giới hạn", detail: "Nói loại trang, người xem và luật: tối đa hai màu, một kiểu chữ, chữ phải dễ đọc." },
          { label: "Xin ba phương án", detail: "Đừng xin mười. Ba phương án đủ để so mà không bị choáng." },
          { label: "Mở từng phương án trên điện thoại", detail: "Đọc một đoạn ba dòng chữ thường, không chỉ tiêu đề. Nhìn ở chỗ sáng nếu có thể." },
          { label: "Chọn theo độ dễ đọc", detail: "Phương án nào bạn đọc thoải mái nhất thì giữ, dù nó kém lạ nhất." },
          { label: "Ghi lại lựa chọn", detail: "Ghi hai màu và kiểu chữ đã chọn để các trang sau dùng lại, trang sẽ nhất quán." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Xin AI ba phương án màu cho trang tiệm bánh",
        task: "Bạn làm trang cho tiệm bánh nhỏ, khách chủ yếu là người lớn tuổi xem trên điện thoại. Lắp một yêu cầu để AI đề xuất ba phương án dùng được.",
        parts: [
          {
            id: "context",
            label: "Hoàn cảnh",
            options: [
              { text: "Làm cho tôi một trang đẹp.", feedback: "AI không biết trang về gì và khách là ai, nên sẽ đề xuất màu chung chung hoặc đoán bừa." },
              { text: "Trang giới thiệu tiệm bánh nhỏ; khách lớn tuổi, xem chủ yếu trên điện thoại.", good: true, feedback: "Có loại trang, người xem và thiết bị - AI đề xuất sát hoàn cảnh hơn, ví dụ chú ý cỡ chữ và tương phản." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Dùng tất cả màu nào bạn thấy hợp để trang phong phú.", feedback: "Không giới hạn thì AI đề xuất cả chục màu, bạn lại phải tự lọc và trang dễ rối." },
              { text: "Tối đa hai màu chính và một kiểu chữ cho cả trang.", good: true, feedback: "Giới hạn rõ nên ba phương án chỉ khác nhau ở lựa chọn hai màu, dễ so sánh." },
            ],
          },
          {
            id: "criteria",
            label: "Tiêu chí",
            options: [
              { text: "Chọn phương án nổi bật và khác biệt nhất.", feedback: "Nổi bật không phải là đọc được. AI có thể chọn màu rực rỡ mà chữ khó đọc với người lớn tuổi." },
              { text: "Ưu tiên chữ tối trên nền sáng, dễ đọc ngoài nắng; nêu lý do từng phương án trong một câu.", good: true, feedback: "Tiêu chí đo được bằng mắt, và mỗi phương án có lý do ngắn để bạn đối chiếu với điều bạn nhìn thấy." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "limit", "criteria"],
            text: "Phương án 1: nền kem, chữ nâu sẫm, nút màu cam đất. Tương phản cao, ấm, hợp tiệm bánh.\nPhương án 2: nền trắng, chữ xanh than, nút màu vàng. Gọn, dễ đọc ngoài nắng.\nPhương án 3: nền be nhạt, chữ đen, nút màu đỏ gạch. Rõ nhất cho người lớn tuổi.\nMột kiểu chữ không chân, cỡ lớn, cho cả ba. Hãy mở từng phương án trên điện thoại rồi chọn.",
          },
          {
            requires: ["context"],
            text: "Đây là sáu phương án: hồng pastel, xanh mint, tím lavender, cam đào, vàng nắng, xanh dương nhạt, kèm bốn kiểu chữ...\n(Có đúng hoàn cảnh nhưng quá nhiều lựa chọn và chưa ưu tiên việc đọc được, bạn sẽ phải tự lọc.)",
          },
          {
            text: "Trang của bạn nên dùng gradient xanh tím kết hợp neon, phông chữ trang trí, hiệu ứng chữ phát sáng để thật khác biệt...\n(AI không biết khách là ai nên ưu tiên sự khác biệt, còn chữ có thể rất khó đọc.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chọn bộ màu cho trang phòng khám",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa ba phương án cho trang phòng khám nha khoa. Phương án A: chữ xám nhạt trên nền trắng, rất thanh lịch. Phương án B: chữ xanh đậm trên nền trắng. Phương án C: sáu màu pastel xen nhau.",
            choices: [
              { label: "Chọn phương án A vì trông sang nhất trên máy tính", next: "bad_a" },
              { label: "Mở cả ba trên điện thoại và đọc một đoạn dài ở chỗ sáng", next: "s2" },
            ],
          },
          bad_a: {
            text: "Ngoài nắng, chữ xám nhạt gần như biến mất. Khách lớn tuổi không đọc được giờ khám và gọi điện hỏi lại liên tục.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy A khó đọc ngoài sáng, C làm mắt mỏi, B đọc thoải mái. Nhưng B trông đơn giản hơn hai bản kia.",
            choices: [
              { label: "Chọn B vì đọc dễ nhất, và nhờ AI thêm một màu nhấn cho nút đặt lịch", next: "good" },
              { label: "Đổi sang C vì nhìn vui mắt hơn dù đọc hơi mỏi", next: "bad_c" },
            ],
          },
          bad_c: {
            text: "Trang trông vui nhưng nhiều màu làm mắt không biết nhìn vào đâu. Khách khó tìm nút đặt lịch và nhiều người bỏ trang.",
            ending: "bad",
          },
          good: {
            text: "Trang có hai màu, chữ rõ, nút đặt lịch nổi bật. Khách lớn tuổi đọc được giờ khám ngay khi mở.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết loại trang, người xem và giới hạn hai màu, một kiểu chữ.",
          "Bước 2 - Xin ba phương án, mỗi phương án một lý do ngắn.",
          "Bước 3 - Đọc thử từng phương án trên điện thoại ở chỗ sáng.",
          "Bước 4 - Chọn theo độ dễ đọc và ghi lại để dùng cho các trang sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ít màu, một kiểu chữ, đọc dễ hơn là trông lạ.",
          "Bài sau: hình ảnh thật, nhẹ và có chú thích.",
        ],
      },
    ],
  },
  {
    id: 2533,
    slug: "hinh-anh-that-nhe-va-co-chu-thich",
    title: "Chặng 56, Bài 14: Hình ảnh thật: chọn, thu nhỏ và viết chú thích thay thế",
    subtitle: "Như gửi hàng bằng xe máy: thùng càng nặng, khách chờ càng lâu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🖼️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn chụp ảnh sản phẩm bằng điện thoại, mỗi tấm vài chục megabyte, rồi đưa thẳng lên trang. Trên mạng yếu khách chờ rất lâu và thoát ra. Ngoài ra, người dùng trình đọc màn hình không thấy ảnh, họ cần một câu mô tả. Bài này dạy cách chọn ảnh, giảm dung lượng và viết câu mô tả đúng.",
    openingQuestion:
      "Bạn định đưa bốn ảnh chụp thẳng từ điện thoại lên trang, mỗi ảnh khoảng 5 MB. Điều gì dễ xảy ra với khách dùng mạng chậm?",
    openingOptions: [
      "Trang tải lâu vì tổng dung lượng ảnh lớn nên khách dễ bỏ đi",
      "Trang vẫn hiện ngay vì trình duyệt tự thu nhỏ ảnh giúp bạn",
      "Ảnh hiện rất nét nên khách càng muốn chờ để xem hết ảnh",
      "Không ảnh hưởng gì, vì mạng nào cũng tải 20 MB trong vài giây",
    ],
    correctOption: 0,
    explanation:
      "Mỗi tấm ảnh là một cục dữ liệu khách phải tải về qua mạng của họ. Bốn ảnh 5 MB là khoảng 20 MB, và trên mạng chậm đó là nhiều giây hoặc lâu hơn. Trình duyệt không tự thu nhỏ file để tiết kiệm băng thông cho bạn, ảnh nét hơn cũng không giữ chân ai nếu họ chờ quá lâu, và tốc độ mạng của khách rất khác tốc độ mạng của bạn.",
    diagram: [
      { label: "Chọn ít ảnh, đúng ý nghĩa", arrow: true },
      { label: "Thu nhỏ kích thước và dung lượng", arrow: true },
      { label: "Viết chú thích thay thế cho từng ảnh", arrow: true },
      { label: "Mở thử trên mạng chậm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Lan bán hoa có trang với sáu ảnh chụp trực tiếp từ điện thoại. Khách ở vùng sóng yếu nói trang không mở được. Cô chọn ba ảnh đẹp nhất, nhờ AI hướng dẫn cách thu nhỏ, và viết thêm một câu mô tả cho mỗi ảnh. Trang mở nhanh hơn rõ rệt và người dùng đọc bằng trình đọc màn hình cũng biết trong ảnh có gì.",
    },
    quiz: [
      Q(
        "Vì sao ảnh chụp trực tiếp từ điện thoại thường không nên đưa thẳng lên trang?",
        "File rất nặng nên khách phải chờ lâu, nhất là khi mạng chậm",
        "Ảnh từ điện thoại bị trình duyệt từ chối hiển thị vì quá sắc nét",
        "Ảnh lớn luôn làm trang bị lỗi và không thể mở được trên máy khách",
        "Ảnh điện thoại có màu khác ảnh máy ảnh nên trang sẽ bị lệch màu",
        "Ảnh chụp điện thoại thường rất lớn so với nhu cầu hiển thị nhỏ trên trang, nên tải lâu. Trình duyệt không từ chối ảnh sắc nét, trang không hỏng mà chỉ chậm, và màu ảnh không phải lý do chính.",
      ),
      Q(
        "Một ảnh nặng 4 MB tải qua mạng 4 Mbps. Khoảng bao nhiêu giây (dùng số liệu minh hoạ, 1 MB là 8 Mb)?",
        "Khoảng 8 giây, vì 4 x 8 = 32 Mb rồi chia cho 4 Mbps",
        "Khoảng 1 giây, vì 4 MB chia cho 4 Mbps bằng 1 (quên đổi đơn vị)",
        "Khoảng 16 giây, vì lấy 4 x 4 = 16 (nhân tốc độ thay vì chia)",
        "Khoảng 4 giây, vì cứ mỗi MB thì mất đúng một giây",
        "Dung lượng tính bằng byte còn tốc độ mạng tính bằng bit; 1 MB là 8 Mb. 32 Mb chia cho 4 Mb mỗi giây là 8 giây. Quên đổi đơn vị cho ra 1 giây, nhân thay vì chia cho 16, còn mỗi MB một giây là con số bịa.",
      ),
      Q(
        "Chú thích thay thế (mô tả ảnh) dùng để làm gì?",
        "Cho người không nhìn được ảnh biết trong ảnh có gì",
        "Làm ảnh trông đẹp hơn và giảm dung lượng file khi tải xuống",
        "Đặt tên cho file ảnh để dễ tìm lại",
        "Giúp ảnh hiện nhanh hơn vì trình duyệt đọc chữ trước khi tải ảnh",
        "Chú thích thay thế là câu chữ cho người dùng trình đọc màn hình và hiện khi ảnh không tải được. Nó không đổi chất lượng ảnh, không phải tên file, và không làm ảnh tải nhanh hơn.",
      ),
      Q(
        "Đâu là chú thích thay thế tốt cho ảnh một bó hoa hồng đỏ trong bình thủy tinh?",
        "Bó mười hai bông hồng đỏ cắm trong bình thủy tinh đặt trên bàn gỗ",
        "Hình ảnh đẹp, hoa, hồng, hoa tươi, bán hoa, mua hoa, hoa rẻ",
        "Ảnh số 3 trong thư mục ảnh của tiệm hoa",
        "Bó hoa hồng đỏ rực rỡ tuyệt đẹp, chất lượng nhất thị trường",
        "Chú thích tốt mô tả điều có trong ảnh bằng câu ngắn và đúng. Một chuỗi từ khoá không đọc được như câu, cái tên kiểu ảnh số 3 không nói gì, còn lời quảng cáo không mô tả ảnh.",
      ),
      Q(
        "Bạn có sáu ảnh đều đẹp. Nên chọn thế nào cho trang đầu tiên?",
        "Giữ vài ảnh mỗi tấm kể một ý khác nhau, bỏ ảnh na ná nhau",
        "Giữ cả sáu ảnh vì bỏ tấm nào cũng tiếc và khách xem càng nhiều càng thích",
        "Chỉ giữ ảnh nào có nhiều màu nhất để trang trông rực rỡ",
        "Nhờ AI chọn ảnh giúp bằng cách mô tả tất cả ảnh bằng lời",
        "Mỗi ảnh nên có một việc riêng, như sản phẩm, người làm, không gian. Giữ tất cả làm trang nặng, chọn theo số màu không liên quan tới nội dung, và AI không nhìn thấy ảnh của bạn nên chọn qua mô tả chỉ là đoán.",
      ),
    ],
    keyTakeaways: [
      "Mỗi ảnh là một cục dữ liệu khách phải tải; tải càng nhiều càng lâu.",
      "Thời gian tải xấp xỉ dung lượng (MB) nhân 8, chia cho tốc độ mạng (Mbps).",
      "Chọn ít ảnh, mỗi ảnh một việc riêng.",
      "Thu nhỏ kích thước và dung lượng trước khi đưa lên trang.",
      "Mỗi ảnh có một câu mô tả ngắn, đúng, như đang kể cho người không thấy.",
    ],
    practicePrompt: {
      question:
        "Chị Thu có ba ảnh 6 MB. Khách ở vùng mạng 6 Mbps. Chị muốn tải nhanh. Việc nào nên làm đầu tiên?",
      options: [
        "Thu nhỏ ảnh về kích thước và dung lượng vừa phải trước khi đưa lên",
        "Xoá hết ảnh vì trang chỉ cần chữ là đủ để khách đọc thông tin nhanh hơn",
        "Đổi tên ảnh thành chữ in hoa cho trình duyệt dễ nhận ra",
        "Yêu cầu khách đổi sang mạng nhanh hơn trước khi xem trang",
      ],
      correct: 0,
      explanation:
        "Thu nhỏ trực tiếp giảm lượng dữ liệu phải tải mà vẫn giữ ảnh. Xoá hết ảnh bỏ mất nội dung quan trọng của trang, đổi tên không đổi dung lượng, và khách không phải người điều chỉnh mạng cho trang của bạn.",
    },
    summary: {
      keyIdea: "Ảnh đẹp nhưng nặng thì khách đợi; ảnh không có mô tả thì có người không biết trong ảnh có gì.",
      formula: "Thời gian tải (giây) = dung lượng (MB) x 8 / tốc độ mạng (Mbps), và mỗi ảnh một câu mô tả.",
      commonMistake: "Đưa ảnh thẳng từ điện thoại lên trang rồi chỉ thử trên mạng nhanh của mình.",
      action: "Chọn ba ảnh, xem dung lượng mỗi tấm, tính thời gian tải trên mạng 4 Mbps.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba ảnh bạn định dùng cho trang. Xem dung lượng từng tấm trong máy (số MB). Tính thời gian tải trên mạng 4 Mbps bằng công thức dung lượng x 8 chia 4. Viết cho mỗi ảnh một câu mô tả chỉ nói điều thấy trong ảnh.",
      secondary: "Ngày mai bạn sẽ được hỏi tổng dung lượng ba ảnh là bao nhiêu và thời gian tải ước tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Ảnh thật làm trang đáng tin hơn ảnh mẫu, nhưng ảnh chụp nguyên bản có thể làm trang chậm đến mức khách bỏ đi. Bài này dạy cách chọn ảnh, đo độ nặng của chúng và viết câu mô tả cho những người không nhìn thấy ảnh.",
      },
      {
        type: "feynman",
        title: "Ảnh nặng và nhẹ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc gửi hàng bằng xe máy: thùng càng nặng và càng nhiều thùng thì xe đi càng lâu. Đường là mạng của khách, thùng là ảnh của bạn. Nếu thùng quá nặng thì khách đứng chờ ở cửa.",
        columns: ["Thành phần", "Gửi hàng bằng xe máy", "Ảnh trên trang"],
        rows: [
          ["Hàng hoá", "Thùng hàng", "File ảnh"],
          ["Độ nặng", "Số ký của thùng", "Dung lượng tính bằng MB"],
          ["Đường đi", "Đường xe chạy", "Mạng của khách, nhanh hay chậm"],
          ["Cách giảm chờ", "Đóng gói gọn, gửi ít thùng", "Thu nhỏ ảnh, chọn ít ảnh"],
        ],
        oneLiner: "Thời gian chờ phụ thuộc vào độ nặng của hàng và tốc độ đường, và bạn chỉ kiểm soát được độ nặng.",
      },
      { type: "heading", text: "Vấn đề: ảnh đẹp nhưng trang chậm" },
      {
        type: "paragraph",
        text: "Điện thoại chụp ảnh rất lớn, vì chúng được làm để in hoặc để xem trên màn hình lớn. Trang của bạn chỉ hiển thị ảnh trong một khung nhỏ, nhưng khách vẫn phải tải cả file nặng. Bạn không cảm thấy điều này vì mạng của bạn nhanh, còn khách ở vùng sóng yếu thì cảm thấy rất rõ.",
      },
      {
        type: "chart",
        title: "Thời gian tải ảnh theo dung lượng mỗi ảnh",
        caption: "Số liệu minh hoạ: thời gian (giây) = số ảnh x dung lượng mỗi ảnh (MB) x 8 / tốc độ mạng (Mbps). Kéo thanh trượt để xem khách ở mạng chậm phải chờ bao lâu. Đây là ước tính thô, chưa tính chữ và các phần khác của trang.",
        kind: "line",
        xLabel: "Dung lượng mỗi ảnh (MB)",
        yLabel: "Giây chờ",
        x: { from: 0.2, to: 8, step: 0.2 },
        params: [
          { id: "photos", label: "Số ảnh trên trang", min: 1, max: 10, step: 1, value: 4, unit: "ảnh" },
          { id: "speed", label: "Tốc độ mạng của khách", min: 1, max: 50, step: 1, value: 5, unit: "Mbps" },
        ],
        series: [{ label: "Giây chờ", expr: "x * photos * 8 / speed" }],
      },
      {
        type: "flow",
        title: "Từ ảnh gốc tới ảnh đưa lên trang",
        steps: [
          { label: "Chọn ít ảnh", detail: "Mỗi ảnh một việc: sản phẩm, người làm, không gian. Ảnh na ná nhau thì bỏ bớt." },
          { label: "Xem dung lượng", detail: "Kiểm tra số MB của từng ảnh trong máy. Ảnh hàng chục MB là dấu hiệu cần thu nhỏ." },
          { label: "Thu nhỏ", detail: "Giảm kích thước về cỡ vừa với khung hiển thị trên trang và giảm dung lượng. Bạn có thể nhờ AI hướng dẫn cách làm bằng công cụ có sẵn trên máy." },
          { label: "Viết chú thích thay thế", detail: "Mỗi ảnh một câu tả điều có trong ảnh, như bạn kể cho người bên cạnh không nhìn thấy." },
          { label: "Thử trên mạng chậm", detail: "Mở trang bằng dữ liệu di động ở chỗ sóng yếu để thấy khách thấy gì." },
        ],
      },
      {
        type: "callout",
        label: "Chú thích thay thế không phải để nhồi từ khoá",
        text: "Câu mô tả tốt nghe như lời kể: Bó mười hai bông hồng đỏ trong bình thủy tinh. Nó không phải chuỗi từ khoá, không phải lời quảng cáo, và không bịa điều không có trong ảnh. Nếu nhờ AI viết thì đọc lại và bỏ mọi chi tiết không có thật.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát chú thích AI viết cho bốn ảnh",
        task: "Bạn có bốn ảnh của tiệm hoa: bó hoa hồng đỏ trong bình thủy tinh, cửa tiệm nhìn từ ngoài, người chủ đang cắt cành, và giỏ hoa cúc trắng. AI viết chú thích như sau. Đánh dấu chú thích không đúng với ảnh.",
        segments: [
          { text: "Ảnh 1: Bó hoa hồng đỏ cắm trong bình thủy tinh." },
          { text: "Ảnh 2: Cửa tiệm hoa nhìn từ ngoài phố." },
          {
            text: "Ảnh 3: Người chủ tiệm đang cắt cành hoa, đứng cạnh giải thưởng Tiệm hoa đẹp nhất năm.",
            error: "Trong ảnh không có giải thưởng nào; AI bịa thêm chi tiết nghe hợp lý cho chú thích hấp dẫn hơn.",
          },
          { text: "Ảnh 4: Giỏ hoa cúc trắng đặt trên quầy." },
        ],
      },
      {
        type: "scenario",
        title: "Sáu ảnh nặng cho một trang hoa",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có sáu ảnh hoa chụp từ điện thoại, mỗi ảnh khoảng 6 MB. Khách của bạn ở vùng mạng chậm. Bạn chuẩn bị đưa ảnh lên trang.",
            choices: [
              { label: "Đưa cả sáu ảnh nguyên bản lên trang", next: "bad_all" },
              { label: "Chọn ba ảnh đẹp nhất, mỗi ảnh một ý", next: "s2" },
            ],
          },
          bad_all: {
            text: "Tổng 36 MB. Trên mạng 4 Mbps, mất khoảng 72 giây để tải hết. Khách chờ vài giây đã thoát và bạn không biết vì sao lượt xem thấp.",
            ending: "bad",
          },
          s2: {
            text: "Ba ảnh, mỗi ảnh 6 MB, vẫn còn 18 MB. Bạn cần giảm thêm.",
            choices: [
              { label: "Thu nhỏ kích thước và dung lượng từng ảnh trước khi đưa lên", next: "s3" },
              { label: "Giữ nguyên dung lượng vì ba ảnh đã đủ ít", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Vẫn khoảng 36 giây trên mạng 4 Mbps. Ba ảnh ít hơn sáu nhưng vẫn quá nặng với khách ở vùng sóng yếu.",
            ending: "bad",
          },
          s3: {
            text: "Sau khi thu nhỏ, mỗi ảnh còn khoảng 0,5 MB. Giờ cần câu mô tả cho từng ảnh.",
            choices: [
              { label: "Viết câu tả đúng điều có trong ảnh, đọc lại cho chắc", next: "good" },
              { label: "Để AI viết chú thích hay nhất rồi dùng luôn", next: "bad_alt" },
            ],
          },
          bad_alt: {
            text: "AI viết một chú thích có giải thưởng không hề có trong ảnh. Người dùng trình đọc màn hình nghe thấy thông tin sai về cửa tiệm của bạn.",
            ending: "bad",
          },
          good: {
            text: "Ba ảnh nhẹ, mỗi ảnh một mô tả đúng. Trang mở nhanh trên mạng chậm và người không nhìn thấy ảnh vẫn biết trong ảnh có gì.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn ba ảnh, mỗi ảnh một việc riêng.",
          "Bước 2 - Xem dung lượng mỗi ảnh, tính thời gian tải trên mạng 4 Mbps.",
          "Bước 3 - Thu nhỏ ảnh về vừa khung hiển thị.",
          "Bước 4 - Viết câu mô tả từng ảnh và đọc lại để bỏ chi tiết không có thật.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ít ảnh, ảnh nhẹ, mỗi ảnh một câu mô tả thật.",
          "Bài sau: dự án nhỏ, chạy danh sách kiểm sáu mục cho trang của bạn.",
        ],
      },
    ],
  },
  {
    id: 2534,
    slug: "du-an-nho-trang-dep-hon-tren-ca-hai-man-hinh",
    title: "Chặng 56, Bài 15: Dự án nhỏ: trang ổn trên cả điện thoại lẫn máy tính",
    subtitle: "Như kiểm xe trước chuyến đi: sáu việc kiểm, việc nào chưa đạt thì sửa trước khi lăn bánh.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "✅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã học sửa từng chỗ, xem trên điện thoại, chọn màu, xử lý ảnh. Đến lúc gom chúng thành một danh sách kiểm duy nhất để chạy một lượt, tìm mục chưa đạt và sửa từng mục. Nhờ danh sách, bạn không bỏ sót mục nào và không phải nhớ hết trong đầu.",
    openingQuestion:
      "Trang của bạn gần xong. Trước khi cho người khác xem, cách nào giúp bạn ít bỏ sót nhất?",
    openingOptions: [
      "Chạy một danh sách kiểm có sáu mục rồi sửa từng mục chưa đạt",
      "Nhìn lướt trang một lần và sửa chỗ nào thấy xấu nhất trước hết",
      "Nhờ AI xác nhận trang ổn rồi gửi link luôn cho khách",
      "Sửa theo trí nhớ những lỗi mà lần trước bạn từng gặp",
    ],
    correctOption: 0,
    explanation:
      "Danh sách kiểm biến việc nhìn chung chung thành sáu câu hỏi cụ thể, nên mục nào chưa đạt thì hiện ra. Nhìn lướt thường bỏ sót chỗ không nổi bật, chẳng hạn giờ mở cửa cỡ chữ nhỏ. AI không nhìn thấy trang của bạn nên lời xác nhận của nó không phải kiểm tra, và trí nhớ chỉ nhớ lỗi cũ chứ không phát hiện lỗi mới.",
    diagram: [
      { label: "Chạy sáu mục: chữ, nút, ảnh, màu, liên hệ, tốc độ", arrow: true },
      { label: "Ghi mục chưa đạt", arrow: true },
      { label: "Nhờ AI sửa từng mục", arrow: true },
      { label: "Chạy lại danh sách từ đầu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Đạt làm trang cho tiệm sửa điện thoại. Anh chạy danh sách sáu mục trên điện thoại của mình và thấy hai mục chưa đạt: nút Gọi quá nhỏ và ảnh đầu trang nặng. Anh nhờ AI sửa từng mục, chạy lại danh sách, và lần này cả sáu mục đạt trước khi anh gửi link cho khách.",
    },
    quiz: [
      Q(
        "Sáu mục trong danh sách kiểm gồm những gì?",
        "Chữ, nút, ảnh, màu, liên hệ và tốc độ tải",
        "Tên trang, logo, mạng xã hội, quảng cáo, nhạc nền và hiệu ứng",
        "Số ảnh, số chữ, số nút, số màu, số trang và số kiểu chữ",
        "Đẹp, sáng tạo, độc đáo, hiện đại, nổi bật và thu hút khách",
        "Sáu mục là những thứ khách chạm tới khi dùng trang: đọc chữ, bấm nút, xem ảnh, nhìn màu, tìm cách liên hệ, chờ tải. Các danh sách khác toàn là thứ trang trí hoặc cảm giác, khó kiểm và không gắn với việc khách làm.",
      ),
      Q(
        "Mục chưa đạt là ảnh đầu trang nặng 9 MB. Bạn nên nhờ AI như thế nào?",
        "Ảnh đầu trang nặng 9 MB, hãy hướng dẫn thu nhỏ và giữ nguyên các phần khác",
        "Trang tải chậm, hãy làm lại toàn bộ trang cho nhẹ hơn",
        "Ảnh không đẹp, hãy thay bằng ảnh nào AI thấy hợp hơn",
        "Hãy tối ưu hoá tất cả các phần của trang một lượt",
        "Nêu đúng mục, số đo thật và điều cần giữ nguyên thì AI xử lý đúng chỗ. Làm lại toàn trang, thay ảnh theo ý AI hay tối ưu mọi phần đều mở rộng phạm vi ra ngoài lỗi bạn đã tìm thấy.",
      ),
      Q(
        "Bạn đã sửa xong mục nút. Bước tiếp theo nào hợp lý?",
        "Chạy lại cả danh sách từ đầu, kể cả mục đã đạt",
        "Chuyển sang sửa mục kế tiếp mà không kiểm lại mục còn lại",
        "Nhờ AI cho biết mục còn lại có bị ảnh hưởng không rồi tin",
        "Coi như xong vì mục nút đã đạt, mục khác chắc vẫn đạt",
        "Một lần sửa có thể làm lệch mục khác, như nút to hơn đẩy chữ xuống. Chạy lại danh sách từ đầu bắt được điều đó. Bỏ qua kiểm lại, tin lời AI hay cho rằng các mục khác chắc vẫn đạt đều để lỗi mới lọt qua.",
      ),
      Q(
        "Mục liên hệ đạt khi nào?",
        "Bạn bấm thử nút gọi và nhắn tin trên điện thoại và chúng đưa tới đúng số",
        "Khi trang có dòng chữ Liên hệ với chúng tôi ở cuối trang",
        "Khi AI đã viết xong phần liên hệ với số điện thoại đầy đủ",
        "Khi số điện thoại hiển thị bằng chữ in đậm và màu nổi bật",
        "Liên hệ đạt khi khách thực sự liên hệ được, tức nút bấm đưa đến đúng số, đúng nơi. Có dòng chữ, có số do AI viết hay chữ in đậm đều chưa chứng minh nút làm đúng việc; chỉ bấm thử mới biết.",
      ),
      Q(
        "Bạn chạy danh sách và thấy cả sáu mục đều đạt ngay lần đầu. Điều nào hợp lý?",
        "Kiểm lại cách bạn đã thử, vì đạt hết ngay lần đầu là hiếm",
        "Gửi link ngay vì đạt hết nghĩa là trang hoàn hảo rồi",
        "Nhờ AI chạy danh sách lại giúp và tin câu trả lời của nó mà không tự thử",
        "Bỏ danh sách đi vì các trang sau chắc cũng sẽ đạt như vậy",
        "Đạt hết ngay lần đầu có thể đúng, nhưng cũng có thể do bạn thử chưa kỹ, như chưa thử trên điện thoại thật. Hoàn hảo là quá lời, AI không chạy được danh sách thay bạn, và trang sau có thể vấp những lỗi khác.",
      ),
    ],
    keyTakeaways: [
      "Danh sách kiểm sáu mục: chữ, nút, ảnh, màu, liên hệ, tốc độ.",
      "Mỗi mục là một câu hỏi bạn trả lời bằng cách xem hoặc bấm thử.",
      "Ghi mục chưa đạt, sửa từng mục, nói hẹp với AI.",
      "Sau mỗi lần sửa, chạy lại cả danh sách từ đầu.",
      "Kiểm bằng điện thoại thật và bằng mắt của bạn, không bằng lời AI.",
    ],
    practicePrompt: {
      question:
        "Chị Hoa chạy danh sách và thấy mục nút chưa đạt. Chị sửa xong và chuyển ngay sang chuẩn bị gửi link. Bước nào còn thiếu?",
      options: [
        "Chạy lại cả danh sách vì sửa nút có thể làm lệch mục khác",
        "Nhờ AI sửa thêm một lần để chắc mục nút đã đạt",
        "Bỏ mục nút khỏi danh sách vì đã đạt và không cần kiểm nữa",
        "Đợi khách báo nếu còn thấy nút nào chưa đúng thì sửa sau",
      ],
      correct: 0,
      explanation:
        "Một chỗ sửa có thể đẩy chỗ khác lệch đi, nên cần chạy lại toàn bộ. Sửa thêm lần nữa tăng rủi ro, bỏ mục khỏi danh sách làm mất khả năng bắt lỗi quay lại, còn chờ khách báo biến khách thành người kiểm thử.",
    },
    summary: {
      keyIdea: "Danh sách kiểm sáu mục biến cảm giác trang ổn thành sáu việc kiểm được.",
      formula: "Chạy sáu mục + ghi mục chưa đạt + sửa hẹp từng mục + chạy lại = trang ổn cả hai màn hình.",
      commonMistake: "Sửa xong rồi bỏ qua bước chạy lại cả danh sách.",
      action: "Chạy sáu mục trên trang của bạn, ghi mục chưa đạt và sửa ít nhất một mục.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở trang của bạn trên điện thoại. Đi qua sáu mục: chữ đọc được, nút bấm không nhầm, ảnh vừa khung và nhẹ, màu tương phản tốt, liên hệ bấm đúng số, trang mở nhanh. Đánh dấu đạt hoặc chưa đạt cho từng mục, rồi nhờ AI sửa một mục chưa đạt.",
      secondary: "Ngày mai bạn sẽ được hỏi mục nào chưa đạt, bạn đã sửa thế nào và sau đó mục khác có bị ảnh hưởng không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã biết sửa từng chỗ, xem trên điện thoại, chọn màu và xử lý ảnh. Bài này gom chúng lại thành một danh sách sáu mục để bạn chạy một lượt và biết chắc trang đã ổn chưa.",
      },
      {
        type: "feynman",
        title: "Danh sách kiểm đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc kiểm xe trước chuyến đi xa: đèn, phanh, lốp, nước, xăng, giấy tờ. Bạn không đoán xe ổn, bạn đi qua từng thứ và kiểm. Trang của bạn cũng cần một lượt như vậy trước khi khách dùng.",
        columns: ["Thành phần", "Kiểm xe trước chuyến đi", "Kiểm trang trước khi gửi"],
        rows: [
          ["Số mục", "Vài thứ cố định", "Sáu mục cố định"],
          ["Cách kiểm", "Nhìn và thử từng thứ", "Xem và bấm thử từng mục"],
          ["Khi có mục hỏng", "Sửa rồi kiểm lại", "Sửa hẹp rồi chạy lại cả danh sách"],
          ["Ai kiểm", "Chính bạn", "Chính bạn, trên điện thoại thật"],
        ],
        oneLiner: "Đừng hỏi trang có ổn không, hãy đi qua sáu câu hỏi và trả lời bằng mắt và ngón tay của bạn.",
      },
      { type: "heading", text: "Sáu mục và cách kiểm từng mục" },
      {
        type: "list",
        items: [
          "Chữ - đọc được trên điện thoại mà không phải phóng to, đoạn văn ngắn gọn.",
          "Nút - bấm được bằng một ngón tay, không sát nhau, tên nút nói rõ việc nó làm.",
          "Ảnh - vừa khung, không tràn, mỗi ảnh nhẹ và có câu mô tả.",
          "Màu - tối đa hai màu chính, chữ và nền tương phản rõ.",
          "Liên hệ - nút gọi, nhắn tin, bản đồ bấm thử và đưa tới đúng nơi.",
          "Tốc độ - mở trang trên mạng di động và xem mất bao lâu để thấy nội dung chính.",
        ],
      },
      {
        type: "flow",
        title: "Một vòng chạy danh sách",
        steps: [
          { label: "Mở trên điện thoại thật", detail: "Mở như khách: từ link. Đừng dùng máy tính vì nó che mất nhiều lỗi." },
          { label: "Đi qua sáu mục", detail: "Với mỗi mục, ghi đạt hoặc chưa đạt và một câu mô tả điều bạn thấy." },
          { label: "Chọn một mục chưa đạt", detail: "Mỗi lần chỉ một mục. Lưu bản hiện tại trước khi sửa." },
          { label: "Nhờ AI sửa hẹp", detail: "Nêu đúng mục, điều bạn thấy và điều cần giữ nguyên, rồi xem kết quả." },
          { label: "Chạy lại cả danh sách", detail: "Sửa một mục có thể làm lệch mục khác, nên kiểm lại từ đầu." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI sửa mục nút chưa đạt",
        task: "Khi chạy danh sách, nút Gọi ngay quá nhỏ và nằm sát nút Nhắn tin. Lắp một yêu cầu để AI sửa đúng mục này mà không đụng chỗ khác.",
        parts: [
          {
            id: "what",
            label: "Điều bạn thấy",
            options: [
              { text: "Phần liên hệ chưa ổn.", feedback: "AI không biết chưa ổn ở chỗ nào, nên phải đoán và có thể đổi cả màu, chữ hay bố cục." },
              { text: "Trên điện thoại, nút Gọi ngay rất nhỏ và sát nút Nhắn tin nên tôi bấm nhầm.", good: true, feedback: "Nêu hiện tượng cụ thể - AI biết việc cần chỉnh là kích thước và khoảng cách giữa hai nút." },
            ],
          },
          {
            id: "want",
            label: "Điều bạn muốn",
            options: [
              { text: "Làm cho đẹp và chuyên nghiệp hơn.", feedback: "Không đo được, nên AI có thể chỉnh nhiều thứ không liên quan tới việc bấm nhầm." },
              { text: "Làm hai nút to hơn và cách nhau rõ ràng để bấm một ngón tay không nhầm.", good: true, feedback: "Kết quả mong muốn nói rõ, bạn dễ kiểm lại bằng cách bấm thử." },
            ],
          },
          {
            id: "keep",
            label: "Điều giữ nguyên",
            options: [
              { text: "Bạn cứ chỉnh sao cho hợp lý nhất.", feedback: "Không nói giữ gì thì AI có thể đổi số điện thoại, màu hay chữ nút mà bạn không biết." },
              { text: "Chỉ chỉnh hai nút này, giữ nguyên chữ trên nút, số điện thoại và màu của cả trang.", good: true, feedback: "Phạm vi hẹp và có danh sách giữ nguyên - bạn biết chỗ nào cần kiểm lại sau khi sửa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["what", "want", "keep"],
            text: "Đã chỉnh: nút Gọi ngay và Nhắn tin to hơn, đặt cách nhau một khoảng rõ ràng, nằm cạnh nhau thành hai nút đủ rộng cho một ngón tay. Chữ trên nút, số điện thoại và màu của toàn trang được giữ nguyên.\n(Bạn hãy mở trên điện thoại, bấm thử và chạy lại cả sáu mục.)",
          },
          {
            requires: ["what"],
            text: "Đã chỉnh hai nút to hơn. Tôi cũng đổi màu nút thành xanh lá cho dễ nhìn và sắp xếp lại phần liên hệ gọn hơn...\n(Đúng chỗ nhưng AI tự đổi màu và sắp xếp lại chỗ bạn không yêu cầu, bạn phải kiểm lại toàn bộ.)",
          },
          {
            text: "Tôi đã làm mới phần liên hệ với thiết kế hiện đại: nút bo tròn, nền gradient, biểu tượng mới và thêm một nút Đặt lịch...\n(AI không biết bạn bấm nhầm ở đâu nên làm lại cả phần liên hệ và thêm nút chưa hề có.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chạy danh sách lần cuối trước khi gửi link",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn chạy sáu mục trên điện thoại. Năm mục đạt, mục ảnh chưa đạt vì ảnh đầu trang nặng 9 MB và tải lâu.",
            choices: [
              { label: "Gửi link luôn vì năm trên sáu mục đã đạt", next: "bad_five" },
              { label: "Nhờ AI chỉ chỉnh ảnh đầu trang, giữ nguyên các phần khác", next: "s2" },
            ],
          },
          bad_five: {
            text: "Khách ở vùng sóng yếu chờ rất lâu mới thấy trang. Vài người thoát ra trước khi thấy nội dung, và bạn không biết vì sao.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về bản mới với ảnh đầu trang nhẹ hơn nhiều.",
            choices: [
              { label: "Chỉ xem lại mục ảnh vì đó là mục vừa sửa", next: "bad_one" },
              { label: "Chạy lại cả sáu mục từ đầu trên điện thoại", next: "good" },
            ],
          },
          bad_one: {
            text: "Ảnh đã nhẹ, nhưng khi thu nhỏ AI cũng làm nút Gọi ngay đẩy sát mép màn hình. Bạn chỉ biết khi khách bấm nhầm.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy cả sáu mục đều đạt. Bạn lưu bản này, rồi gửi link cho khách.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Bản này là bản tốt, hãy lưu lại",
        text: "Sau khi cả sáu mục đạt, lưu một bản sao đặt tên có ngày. Khi sau này sửa thêm, bạn có chỗ quay về nếu có gì hỏng.",
      },
      {
        type: "closing",
        lines: [
          "Sáu mục, một vòng chạy, sửa hẹp, chạy lại.",
          "Chặng tiếp theo: thay chữ mẫu bằng nội dung thật và đưa cho người khác xem.",
        ],
      },
    ],
  },
];
