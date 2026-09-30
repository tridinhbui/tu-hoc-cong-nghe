import type { Lesson } from "../lesson-types";

// Chặng 37, bài 16-20. Giáo trình: scripts/curriculum/stage-37.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và kiểm kết quả.
export const S37_D_LESSONS: Lesson[] = [
  {
    id: 2155,
    slug: "mini-bo-thu-xu-ly-mot-don-giao-tre",
    title: "Chặng 37, Bài 16: Mini-dự án: bộ thư xử lý một đơn giao trễ từ đầu tới cuối",
    subtitle: "Một sự việc, ba người đọc: thư khách, thư nhà vận chuyển, ghi chú nội bộ cùng nói một sự thật.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đơn giao trễ hiếm khi chỉ cần một thư. Khách cần biết khi nào nhận hàng, nhà vận chuyển cần biết bạn đang hỏi về chuyến nào, đồng nghiệp cần biết việc đã làm tới đâu. Nếu ba thư nói ba ngày khác nhau, bạn mất lòng tin của cả ba bên. Dựng ba thư từ một bản ghi duy nhất là cách rẻ nhất để tránh chuyện đó.",
    openingQuestion:
      "Chiều thứ Sáu, một đơn hẹn giao hôm nay chưa tới. Bạn phải viết cho khách, hỏi nhà vận chuyển và để lại ghi chú cho ca sau. Nên bắt đầu từ đâu?",
    openingOptions: [
      "Ghi ra một bản sự việc: mã đơn, ngày hẹn, tình trạng đã biết, việc còn chờ",
      "Viết ngay thư cho khách vì khách là người đang sốt ruột nhất",
      "Nhờ AI viết cả ba thư từ vài dòng nhớ trong đầu của bạn",
      "Gọi nhà vận chuyển trước rồi nhớ lại lời họ nói để viết sau",
    ],
    correctOption: 0,
    explanation:
      "Ba thư khác nhau về giọng và độ chi tiết, nhưng phải giống nhau về sự thật: mã đơn, ngày hẹn, ngày giao mới, nguyên nhân đã biết. Khi các dữ kiện nằm trong một bản ghi, ba thư chỉ là ba cách kể cùng một chuyện. Viết thư khách trước rồi chép sang hai thư kia dễ kéo theo chỗ nhớ nhầm. Nhờ AI viết từ trí nhớ thì AI sẽ lấp chỗ trống bằng chi tiết nghe hợp lý. Gọi điện xong không ghi lại thì lời hứa miệng biến mất.",
    diagram: [
      { label: "Bản sự việc: mã đơn, ngày hẹn, tình trạng, việc chờ", arrow: true },
      { label: "AI viết ba bản nháp từ cùng bản ghi đó", arrow: true },
      { label: "Bạn đặt ba thư cạnh nhau, đối chiếu từng dữ kiện", arrow: true },
      { label: "Gửi thư, cập nhật ghi chú khi có tin mới" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Hoa làm điều phối ở một cửa hàng bán đồ gia dụng online. Một chiếc tủ hẹn giao thứ Sáu nhưng kho báo xe hỏng. Chị ghi bản sự việc năm dòng, rồi nhờ AI dựng ba thư. Khi kho báo lại 'giao thứ Hai', chị chỉ sửa một dòng ngày trong bản ghi và sửa ba thư theo đó, không thư nào còn ngày cũ.",
    },
    quiz: [
      {
        question: "Ba thư cho khách, nhà vận chuyển và đồng nghiệp nhất quán với nhau nhờ điều gì?",
        options: [
          "Cả ba cùng viết từ một bản ghi sự việc đã soát, chỉ đổi giọng và độ chi tiết",
          "AI tự nhớ số liệu từ thư đầu sang hai thư sau",
          "Mỗi thư viết riêng theo điều người nhận quan tâm nhất",
          "Gửi thư nhà vận chuyển trước rồi chép ngày trong đó",
        ],
        correct: 0,
        explanation:
          "Cùng một bản ghi thì cùng một sự thật. AI không giữ số liệu chắc chắn từ thư này sang thư kia nên không thể trông vào trí nhớ của nó. Viết riêng từng thư dễ ra ba ngày khác nhau. Chép từ thư nhà vận chuyển thì mang theo cả điều họ nói chưa được kiểm.",
      },
      {
        question: "Thư cho khách nên nói gì về nguyên nhân trễ?",
        options: [
          "Điều bạn đã xác nhận; chưa rõ thì nói chưa rõ",
          "Đổ cho nhà vận chuyển để khách không trách công ty mình, ghi rõ tên họ",
          "Chọn nguyên nhân nghe hợp lý nhất, khách thường không kiểm tra lại",
          "Không nhắc nguyên nhân, chỉ xin lỗi thật nhiều lần cho khách nguôi",
        ],
        correct: 0,
        explanation:
          "Khách tin thư khi thư chỉ nói điều đã biết. Nếu nguyên nhân bạn đoán bị hé lộ là sai, mọi lời khác trong thư mất giá. Đổ lỗi bằng tên riêng khi chưa xác nhận là rủi ro, và xin lỗi mà không có thông tin thì khách vẫn không biết bao giờ nhận hàng.",
      },
      {
        question: "AI viết thư gửi nhà vận chuyển ghi ngày nhận hàng là 12/9, trong khi bản ghi của bạn là 11/9. Bạn làm gì?",
        options: [
          "Sửa theo bản ghi, rồi đọc lại hai thư kia xem có lệch cùng chỗ không",
          "Bỏ qua vì chênh một ngày, nhà vận chuyển sẽ tự đối chiếu với hệ thống của họ",
          "Nhờ AI tự chọn ngày nào nghe đúng hơn rồi dùng",
          "Gửi luôn, vì có thể bạn gõ nhầm trong bản ghi",
        ],
        correct: 0,
        explanation:
          "Bản ghi là nguồn bạn đã soát nên thư phải theo nó. Một ngày lệch trong thư hỏi nhà vận chuyển làm họ tra nhầm chuyến. Nếu AI lệch ở một thư thì hai thư còn lại cũng cần đọc lại. Để AI chọn ngày là giao lại việc quyết định cho nơi không có dữ kiện.",
      },
      {
        question: "Ghi chú nội bộ về đơn giao trễ dùng để làm gì?",
        options: [
          "Để đồng nghiệp ca sau biết việc đã làm và việc còn chờ, không phải hỏi lại bạn",
          "Để lưu chứng cứ quy trách nhiệm cho nhà vận chuyển, nên viết càng gay gắt càng tốt",
          "Để sếp thấy bạn bận, nên ghi thật dài mọi việc",
          "Để nhắc riêng bạn, nên viết tắt cho nhanh, người khác khỏi đọc",
        ],
        correct: 0,
        explanation:
          "Ghi chú nội bộ là bàn giao: ai đọc cũng phải làm tiếp được. Viết gay gắt không giúp xử lý đơn và có thể bị khách hay nhà vận chuyển đọc lại sau này. Ghi dài để gây ấn tượng làm việc cần làm chìm dưới chi tiết. Viết tắt cho riêng mình thì ca sau vẫn phải gọi hỏi.",
      },
      {
        question: "Ba thư đã viết xong. Bước cuối trước khi gửi là gì?",
        options: [
          "Đặt ba thư cạnh nhau, đối chiếu mã đơn, ngày và số lượng với bản ghi",
          "Nhờ AI tự kiểm xem ba thư có khớp nhau không rồi tin luôn kết quả nó báo là đã khớp hết",
          "Gửi thư khách trước, hai thư còn lại gửi sau cho kịp giờ",
          "Đọc lướt giọng văn từng thư xem đã lịch sự chưa",
        ],
        correct: 0,
        explanation:
          "Chỗ dễ lệch nằm ở dữ kiện chứ không ở giọng văn, nên bạn đối chiếu chúng với bản ghi. AI báo 'đã khớp' cũng có thể sai vì nó không có gì đảm bảo ngoài chữ nó vừa đọc. Gửi thư khách trước khi soát là lúc lỗi lộ ra công khai.",
      },
    ],
    keyTakeaways: [
      "Ghi một bản sự việc trước; ba thư cùng lấy dữ kiện từ đó.",
      "Giọng và độ chi tiết đổi theo người đọc, sự thật thì không đổi.",
      "Thư khách chỉ nói điều đã xác nhận; chưa rõ thì nói chưa rõ.",
      "Ghi chú nội bộ là bàn giao cho người sau, không phải nơi xả giận.",
      "Khi có tin mới, sửa bản ghi trước rồi sửa ba thư theo nó.",
    ],
    practicePrompt: {
      question:
        "Kho báo đơn giao lùi từ thứ Sáu sang thứ Hai. Bạn đã gửi thư cho khách với ngày thứ Sáu. Việc nào làm trước?",
      options: [
        "Sửa ngày trong bản ghi, rồi cập nhật cả ba thư và ghi chú theo ngày mới",
        "Chỉ nhắn khách ngày mới, hai nơi còn lại chắc tự biết",
        "Nhờ AI viết lại toàn bộ ba thư mà không đưa bản ghi",
        "Chờ khách hỏi lại rồi mới cập nhật cho đỡ làm phiền",
      ],
      correct: 0,
      explanation:
        "Bản ghi là nguồn nên sửa nó trước, rồi mọi thư đi theo. Nếu chỉ nhắn khách thì nhà vận chuyển và đồng nghiệp vẫn giữ ngày cũ. Viết lại không đưa bản ghi làm AI phải tự bịa ngày. Chờ khách hỏi là để khách phát hiện lỗi trước bạn.",
    },
    summary: {
      keyIdea: "Ba người đọc, một sự thật: mọi thư viết từ cùng một bản ghi đã soát.",
      formula: "Bản ghi sự việc → ba bản nháp → đối chiếu dữ kiện → gửi → tin mới thì sửa bản ghi trước.",
      commonMistake: "Viết thư khách trước rồi chép sang hai thư kia, mang theo chỗ nhớ nhầm.",
      action: "Chọn một đơn từng trễ, ghi bản sự việc năm dòng cho nó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đơn hàng hoặc lô giao thật từng bị trễ của bạn. Ghi bản sự việc năm dòng (mã đơn, ngày hẹn, tình trạng, nguyên nhân đã biết, việc đang chờ), xoá thông tin cá nhân của khách rồi nhờ AI viết ba bản nháp. Đặt ba bản cạnh nhau và gạch chân mọi ngày, mã, số lượng, đối chiếu với bản ghi.",
      secondary: "Hôm sau, mở lại bản ghi và xem bạn đã phải sửa dữ kiện nào trong nháp của AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Đơn giao trễ là lúc ba người cùng chờ tin từ bạn: khách, nhà vận chuyển và đồng nghiệp. Bài này gom những gì bạn đã học về viết thư, kiểm dữ kiện và bàn giao thành một bộ xử lý trọn vẹn.",
      },
      {
        type: "feynman",
        title: "Bộ thư giao trễ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới bản tin thời tiết. Đài chỉ có một dự báo, nhưng nói cho nông dân khác, nói cho hãng bay khác, và ghi cho ca trực sau khác. Nội dung dự báo thì không đổi.",
        columns: ["Thành phần", "Bản tin thời tiết", "Bộ thư giao trễ"],
        rows: [
          ["Sự thật gốc", "Một bản dự báo của đài", "Một bản ghi sự việc của bạn"],
          ["Người nghe", "Nông dân, hãng bay, ca trực", "Khách, nhà vận chuyển, đồng nghiệp"],
          ["Điều thay đổi", "Cách nói và chi tiết cần cho từng người", "Giọng thư và độ chi tiết"],
          ["Điều không được đổi", "Nhiệt độ, giờ, khu vực", "Mã đơn, ngày, số lượng, nguyên nhân"],
        ],
        oneLiner: "Một bản ghi làm gốc, ba thư là ba cách kể, và dữ kiện không bao giờ đổi theo người nghe.",
      },
      { type: "heading", text: "Vấn đề: ba thư, ba phiên bản của sự thật" },
      {
        type: "paragraph",
        text: "Khi vội, mỗi thư được viết vào một lúc khác nhau, bằng trí nhớ khác nhau. Thư khách hẹn thứ Hai, thư nhà vận chuyển hỏi về chuyến thứ Bảy, ghi chú nội bộ ghi 'chờ kho báo'. Ai đọc cả ba sẽ thấy công ty không biết chuyện gì đang xảy ra. AI viết nhanh nhưng không biết sự việc của bạn, nên nó cần bản ghi để viết cho đúng.",
      },
      {
        type: "flow",
        title: "Từ một đơn trễ tới ba thư khớp nhau",
        steps: [
          { label: "Ghi bản sự việc", detail: "Năm dòng: mã đơn, ngày hẹn, tình trạng đã xác nhận, nguyên nhân đã biết hoặc 'chưa rõ', việc đang chờ. Đây là nguồn duy nhất." },
          { label: "Xoá thông tin cá nhân", detail: "Thay tên và số điện thoại khách bằng 'Khách A' trước khi đưa cho công cụ AI bên ngoài. Điền lại tên thật khi gửi." },
          { label: "Nhờ AI viết ba bản nháp", detail: "Nói rõ ba người đọc, ba mục đích, và dặn AI chỉ dùng dữ kiện trong bản ghi, không tự thêm ngày hay nguyên nhân." },
          { label: "Đặt cạnh nhau và đối chiếu", detail: "Gạch chân mọi ngày, mã đơn, số lượng trong ba thư và so từng cái với bản ghi. Sửa chỗ lệch." },
          { label: "Gửi rồi cập nhật", detail: "Khi có tin mới, sửa bản ghi trước, rồi sửa ba thư theo nó. Ghi chú nội bộ ghi thêm dòng mới kèm giờ." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng ba thư từ một bản ghi",
        task: "Đơn A-207 hẹn giao thứ Sáu, kho báo xe hỏng và giao lại thứ Hai. Lắp prompt để AI viết ba thư khớp nhau.",
        parts: [
          {
            id: "source",
            label: "Nguồn dữ kiện",
            options: [
              { text: "Đơn A-207 bị trễ, viết giúp tôi ba thư cho hợp lý.", feedback: "Không có dữ kiện nên AI tự bịa ngày giao và nguyên nhân, ba thư có thể mỗi thư một ngày." },
              { text: "Bản ghi: đơn A-207, hẹn thứ Sáu 12/9, xe hỏng theo kho, giao lại thứ Hai 15/9, chưa xác nhận khung giờ. Chỉ dùng những dữ kiện này.", good: true, feedback: "Có dữ kiện rõ và có dòng 'chưa xác nhận': AI biết chỗ nào phải để trống." },
            ],
          },
          {
            id: "readers",
            label: "Người đọc",
            options: [
              { text: "Viết một thư dùng được cho tất cả mọi người.", feedback: "Một thư chung vừa quá dài cho khách vừa thiếu chi tiết chuyến xe cho nhà vận chuyển." },
              { text: "Viết ba thư: (1) khách, ngắn, xin lỗi và nêu ngày mới; (2) nhà vận chuyển, hỏi trạng thái chuyến; (3) ghi chú nội bộ, liệt kê việc đã làm và việc chờ.", good: true, feedback: "Mỗi người đọc có mục đích riêng nên mỗi thư ngắn và đúng việc." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết đầy đủ, thêm ưu đãi để khách vui.", feedback: "AI tự hứa giảm giá hay bồi thường mà công ty chưa quyết, bạn phải đi rút lại lời hứa." },
              { text: "Không thêm ưu đãi hay bồi thường, không tự ghi nguyên nhân ngoài bản ghi; điều chưa biết ghi 'sẽ cập nhật'.", good: true, feedback: "Phạm vi rõ nên AI không hứa thay công ty và không bịa nguyên nhân." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "readers", "limit"],
            text: "Thư 1 (khách): Chào anh/chị, đơn A-207 dự kiến giao hôm nay sẽ được giao lại vào thứ Hai 15/9. Xe vận chuyển gặp sự cố theo báo cáo từ kho. Khung giờ chúng tôi sẽ cập nhật ngay khi xác nhận. Xin lỗi anh/chị vì sự bất tiện.\n\nThư 2 (nhà vận chuyển): Đơn A-207 được hẹn giao 12/9, kho báo xe hỏng. Anh/chị cho biết chuyến thay thế 15/9 đã xếp chưa và khung giờ dự kiến.\n\nGhi chú nội bộ: A-207 hẹn 12/9, giao lại 15/9. Đã báo khách. Chờ nhà vận chuyển xác nhận khung giờ.",
          },
          {
            requires: ["source"],
            text: "Có dữ kiện đúng, nhưng chỉ một thư dùng chung cho mọi người nên khách bị đọc chi tiết chuyến xe còn nhà vận chuyển không thấy câu hỏi cần trả lời.\n\n(Đúng ngày, sai đối tượng: mất thời gian hơn khi đọc.)",
          },
          {
            text: "Thư 1 (khách): Đơn giao chậm do bão nên dời sang thứ Tư. Chúng tôi sẽ tặng mã giảm 10% cho lần mua sau.\n\nThư 2: Xin xác nhận chuyến thứ Ba.\n\n(Nguyên nhân, ngày và ưu đãi đều được bịa; hai thư nói hai ngày khác nhau.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ba thư từ một bản ghi",
          text: "Dữ kiện khớp nhau. Sửa một dòng ở bản ghi là sửa cả ba. Bạn soát dữ kiện một lần bằng cách so với bản ghi. Người thứ ba đọc ghi chú làm tiếp được ngay.",
        },
        right: {
          label: "Ba thư viết lần lượt theo trí nhớ",
          text: "Mỗi thư mang một chút nhớ nhầm khác nhau. Khi có tin mới phải tìm sửa ở ba nơi và dễ sót một nơi. Khách và nhà vận chuyển nhận hai phiên bản khác nhau về cùng một đơn.",
        },
      },
      {
        type: "callout",
        label: "Điều chưa biết cứ ghi là chưa biết",
        text: "Nếu chưa rõ nguyên nhân, đừng để AI chọn một nguyên nhân nghe hợp lý. Ghi 'chưa rõ, sẽ cập nhật lúc 16 giờ' rồi giữ đúng lời. Chuyện bồi thường hay hoàn tiền là quyết định của người có thẩm quyền, hỏi quản lý hoặc kế toán trước khi hứa với khách.",
      },
      {
        type: "scenario",
        title: "Bốn giờ chiều thứ Sáu, đơn A-207",
        start: "s1",
        nodes: {
          s1: {
            text: "Kho báo đơn A-207 sẽ giao lại thứ Hai. Bạn có 30 phút trước khi khách gọi. Bạn đã có bản ghi và vài dòng nháp AI viết.",
            choices: [
              { label: "Gửi ngay thư khách theo nháp AI, hai thư kia tính sau", next: "bad_order" },
              { label: "Đối chiếu nháp với bản ghi, sửa chỗ lệch rồi mới gửi", next: "s2" },
            ],
          },
          bad_order: {
            text: "Thư khách ghi 'giao thứ Hai 14/9' trong khi thứ Hai là 15/9. Khách xếp lịch nghỉ làm nhầm ngày, và nhà vận chuyển nhận thư ghi ngày khác.",
            ending: "bad",
          },
          s2: {
            text: "Ba thư đã khớp. Nhà vận chuyển trả lời: khung giờ chưa xác nhận được, sẽ báo trước 10 giờ sáng thứ Hai.",
            choices: [
              { label: "Cập nhật bản ghi và ghi chú nội bộ, hẹn khách thư cập nhật lúc 10 giờ 30 thứ Hai", next: "good" },
              { label: "Nhắn khách 'khung giờ khoảng chiều' cho họ yên tâm", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Sáng thứ Hai nhà vận chuyển xếp giao buổi sáng. Khách vắng nhà buổi sáng vì tin lời 'khoảng chiều', bỏ lỡ chuyến giao.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp ca sau đọc ghi chú và biết chỉ còn việc chờ tin 10 giờ. Khách không phải gọi lại. Thứ Hai bạn gửi thư cập nhật đúng hẹn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết bản sự việc năm dòng, chỗ chưa biết ghi 'chưa rõ'.",
          "Bước 2 - Che tên và số điện thoại khách trước khi đưa AI.",
          "Bước 3 - Nhờ AI dựng ba thư, chỉ dùng dữ kiện trong bản ghi.",
          "Bước 4 - Đặt ba thư cạnh nhau, so từng ngày, mã, số lượng.",
          "Bước 5 - Có tin mới: sửa bản ghi trước, rồi ba thư.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một sự thật, ba cách kể; bản ghi của bạn là nguồn duy nhất.",
          "Bài sau: đối chiếu ba chứng từ đơn đặt, phiếu giao và hoá đơn.",
        ],
      },
    ],
  },
  {
    id: 2156,
    slug: "doi-chieu-hoa-don-phieu-giao-don-dat-hang",
    title: "Chặng 37, Bài 17: Đối chiếu ba chứng từ: đơn đặt, phiếu giao, hoá đơn",
    subtitle: "Như soát hoá đơn nhà hàng: gọi món, nhận món, tính tiền phải khớp nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng, kế toán hỏi vì sao hoá đơn nhà cung cấp tính 100 thùng mà kho chỉ nhận 92. Nếu bạn đã lập sẵn bảng đối chiếu và khoanh các dòng lệch, câu hỏi được trả lời trong năm phút thay vì một buổi chiều lục giấy tờ. AI giúp dựng bảng nhanh, nhưng số và quyết định thì vẫn phải kiểm bằng bảng tính và người có thẩm quyền.",
    openingQuestion:
      "Bạn có ba bảng: đơn đặt hàng, phiếu giao hàng và hoá đơn cùng một nhà cung cấp. Số lượng vài dòng không khớp nhau. Cách làm nào hợp lý nhất?",
    openingOptions: [
      "Ghép ba bảng theo từng mặt hàng, khoanh dòng lệch rồi hỏi người phụ trách",
      "Lấy số trên hoá đơn làm chuẩn vì hoá đơn là chứng từ cuối cùng",
      "Chọn phiếu giao vì hàng thật mới là thứ cần tính tiền",
      "Nhờ AI sửa số ở hai bảng còn lại cho bằng bảng đầu tiên",
    ],
    correctOption: 0,
    explanation:
      "Lệch chỉ lộ ra khi cùng một mặt hàng nằm cạnh nhau trên một dòng ở cả ba tờ. Chọn sẵn một tờ làm chuẩn là quyết định trước khi biết vì sao lệch: có thể kho nhận thiếu, có thể nhà cung cấp tính nhầm, có thể đơn đặt đã sửa. Nhờ AI chỉnh số cho khớp là xoá dấu vết của chính sự việc bạn cần điều tra. Dòng lệch nên đi tới người có thẩm quyền như kế toán hoặc trưởng kho.",
    diagram: [
      { label: "Ba chứng từ: đơn đặt, phiếu giao, hoá đơn", arrow: true },
      { label: "Ghép theo mặt hàng, một dòng, ba cột số lượng", arrow: true },
      { label: "Khoanh dòng lệch, ghi độ lệch bằng bảng tính", arrow: true },
      { label: "Chuyển câu hỏi cho người quyết định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Tuấn phụ trách mua văn phòng phẩm. Đơn đặt 100 hộp giấy, phiếu giao ghi 92, hoá đơn tính 100. Anh dựng bảng ba cột, khoanh dòng giấy và gửi kế toán câu hỏi: 'Hoá đơn tính 8 hộp chưa thấy giao, xin xử lý thế nào'. Kế toán hỏi lại nhà cung cấp, không phải anh Tuấn tự trừ tiền.",
    },
    quiz: [
      {
        question: "Vì sao nên đưa AI cả ba bảng cùng lúc kèm yêu cầu ghép theo mặt hàng và khoanh dòng lệch?",
        options: [
          "Lệch chỉ lộ ra khi cùng một mặt hàng nằm cạnh nhau trên một dòng ở cả ba tờ",
          "AI chỉ đọc được khi có đủ ba tệp thì mới mở được",
          "Ba bảng cùng lúc thì AI tự sửa số hoá đơn cho khớp với hai bảng kia, bạn khỏi mất công",
          "Để AI quyết định tờ nào đúng rồi bạn khỏi đối chiếu",
        ],
        correct: 0,
        explanation:
          "So từng cặp hai tờ dễ bỏ sót dòng chỉ lệch ở tờ thứ ba. AI đọc được từng tệp riêng, và nó không được tự sửa số chứng từ. Quyết định tờ nào đúng thuộc về người có thẩm quyền sau khi xem nguyên nhân lệch.",
      },
      {
        question: "Đơn đặt 100 thùng, phiếu giao 92 thùng, hoá đơn 100 thùng. Dòng này nên gắn nhãn thế nào?",
        options: [
          "Cần hỏi: hoá đơn tính 8 thùng chưa thấy giao, chuyển câu hỏi cho kế toán",
          "Khớp, vì đơn và hoá đơn đều 100 thùng",
          "Lệch 8 thùng, tự trừ tiền 8 thùng trên hoá đơn cho khỏi phải hỏi ai và khỏi mất thời gian",
          "Bỏ qua, phiếu giao thường ghi thiếu vài thùng",
        ],
        correct: 0,
        explanation:
          "100 trừ 92 là 8 thùng: đây là khoảng cách giữa cái được tính tiền và cái kho nhận. Coi là khớp vì hai tờ bằng nhau bỏ qua tờ thứ ba. Tự trừ tiền là quyết định của kế toán chứ không phải của người lập bảng. Đoán phiếu giao ghi thiếu là suy đoán chưa có bằng chứng.",
      },
      {
        question: "AI trả bảng đối chiếu kèm dòng tổng ghi 'chênh lệch 1.250.000 đồng'. Bạn làm gì?",
        options: [
          "Tự cộng lại bằng bảng tính rồi mới tin",
          "Tin luôn vì AI đã liệt kê từng dòng rất rõ ràng",
          "Nhờ AI tính lại lần nữa, hai lần giống nhau thì chắc đúng",
          "Làm tròn xuống hàng trăm nghìn cho khớp với sổ",
        ],
        correct: 0,
        explanation:
          "AI dự đoán chữ chứ không cộng như máy tính, một tổng nghe hợp lý vẫn có thể lệch. Hai lần trả lời giống nhau chưa chứng minh gì vì cả hai đều là dự đoán. Làm tròn cho khớp là cách che chênh lệch thật.",
      },
      {
        question: "Một dòng có đơn vị lệch: đơn đặt ghi 'thùng', phiếu giao ghi 'cái'. Xử lý nào đúng?",
        options: [
          "Hỏi lại quy cách một thùng bằng bao nhiêu cái trước khi kết luận lệch",
          "Coi 1 thùng bằng 1 cái vì AI đã ghép hai dòng vào cùng mặt hàng",
          "Xoá dòng đó khỏi bảng cho bảng gọn",
          "Nhân số thùng với 12, quy cách hay gặp nhất",
        ],
        correct: 0,
        explanation:
          "Quy cách đóng gói do nhà cung cấp quy định và khác nhau theo mặt hàng. Coi thùng bằng cái làm dòng lệch to giả tạo, xoá dòng thì mất cả bằng chứng. Nhân 12 là đoán một con số bạn chưa kiểm.",
      },
      {
        question: "Khi bảng đối chiếu cho thấy một dòng lệch, ai quyết định chấp nhận hay từ chối phần lệch?",
        options: [
          "Người có thẩm quyền như kế toán trưởng hoặc trưởng bộ phận, không phải AI",
          "AI, vì nó so số rất nhanh, không thiên vị bên nào trong ba chứng từ và không bao giờ mệt",
          "Người nhập kho, vì họ cầm hàng thật trong tay",
          "Nhà cung cấp, vì họ lập hoá đơn nên biết số đúng",
        ],
        correct: 0,
        explanation:
          "Chấp nhận hay từ chối một khoản lệch ảnh hưởng tới thanh toán nên do người có thẩm quyền quyết. AI không có thẩm quyền và không thấy hợp đồng. Người nhập kho cung cấp bằng chứng chứ không thay quyết định, còn nhà cung cấp là một bên trong tranh chấp.",
      },
    ],
    keyTakeaways: [
      "Ghép ba chứng từ theo mặt hàng, mỗi mặt hàng một dòng, mỗi tờ một cột số lượng.",
      "Số chênh lệch tính bằng bảng tính, không tin tổng AI viết.",
      "Đơn vị (thùng, cái, kg) phải hỏi lại trước khi kết luận lệch.",
      "Không sửa số chứng từ cho khớp; khoanh dòng và hỏi.",
      "Việc chấp nhận hay từ chối phần lệch là của kế toán hoặc người có thẩm quyền.",
    ],
    practicePrompt: {
      question:
        "Bảng đối chiếu có dòng 'Bút bi': đặt 50 hộp, giao 50 hộp, hoá đơn 55 hộp. Bạn ghi chú thế nào là hợp lý?",
      options: [
        "Hoá đơn tính dư 5 hộp so với đơn và phiếu giao, hỏi kế toán xử lý với nhà cung cấp",
        "Giao dư 5 hộp, cứ nhận luôn cho có lợi",
        "Sửa hoá đơn xuống 50 hộp cho khớp hai tờ kia",
        "Không ghi gì, chênh 5 hộp là nhỏ",
      ],
      correct: 0,
      explanation:
        "Hai tờ khớp nhau ở 50, hoá đơn lệch 55 nên độ lệch là 55 trừ 50 bằng 5 hộp tính dư. Việc xử lý với nhà cung cấp là của kế toán. Kho nhận 50 nên không phải giao dư. Tự sửa hoá đơn là sửa chứng từ không phải của bạn, còn bỏ qua khoản nhỏ thì cộng dồn nhiều dòng thành khoản lớn.",
    },
    summary: {
      keyIdea: "Ba chứng từ phải kể cùng một câu chuyện; chỗ kể khác nhau là chỗ cần hỏi.",
      formula: "Ghép theo mặt hàng → so ba cột → tính độ lệch bằng bảng tính → khoanh → hỏi người có thẩm quyền.",
      commonMistake: "Chọn sẵn một chứng từ làm chuẩn rồi chỉnh hai tờ kia cho khớp.",
      action: "Tuần này lấy một lô hàng đã xong và dựng thử bảng ba cột.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một lô hàng đã nhận xong gần đây, có đủ đơn đặt, phiếu giao, hoá đơn. Chép các dòng hàng vào ba cột trong bảng tính (che tên nhà cung cấp nếu dùng AI bên ngoài), nhờ AI ghép và khoanh dòng lệch. Sau đó tự tính độ lệch từng dòng bằng công thức bảng tính và so với chỗ AI khoanh.",
      secondary: "Ghi ra: AI có khoanh sót hay khoanh thừa dòng nào so với bảng bạn tự tính không.",
    },
    sections: [
      {
        type: "lead",
        text: "Số lượng trên đơn đặt, phiếu giao và hoá đơn hiếm khi trùng khít. Bài này dạy cách nhờ AI dựng bảng đối chiếu để bạn thấy chỗ lệch nhanh, và phần nào vẫn phải do bạn và kế toán làm.",
      },
      {
        type: "feynman",
        title: "Đối chiếu ba chứng từ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới bữa ăn nhóm ở nhà hàng: bạn gọi món, phục vụ mang món ra, cuối bữa có hoá đơn. Nếu hoá đơn ghi năm phần gà mà bàn chỉ nhận bốn, bạn không tự trừ tiền mà gọi phục vụ hỏi.",
        columns: ["Thành phần", "Bữa ăn nhà hàng", "Mua hàng"],
        rows: [
          ["Điều đã gọi", "Danh sách món bạn gọi", "Đơn đặt hàng"],
          ["Điều đã nhận", "Món thực sự được mang ra bàn", "Phiếu giao hàng / phiếu nhập kho"],
          ["Điều bị tính tiền", "Hoá đơn cuối bữa", "Hoá đơn của nhà cung cấp"],
          ["Khi lệch", "Gọi phục vụ hỏi, không tự trừ", "Khoanh dòng, hỏi kế toán"],
        ],
        oneLiner: "Ba tờ phải kể cùng một chuyện; chỗ kể khác nhau thì hỏi, không tự chỉnh.",
      },
      { type: "heading", text: "Vấn đề: ba tờ giấy, ba bảng số khác nhau" },
      {
        type: "paragraph",
        text: "Mỗi chứng từ do một người khác nhau lập vào một thời điểm khác nhau: đơn do bạn, phiếu giao do kho hoặc tài xế, hoá đơn do nhà cung cấp. Đặt cạnh nhau, tên mặt hàng còn viết khác nhau ('giấy A4 70gsm' và 'A4 70'). AI giỏi việc nhận ra hai dòng là cùng một mặt hàng và xếp chúng lại, việc bạn khó làm bằng mắt khi có hàng trăm dòng.",
      },
      {
        type: "flow",
        title: "Từ ba chứng từ tới danh sách dòng cần hỏi",
        steps: [
          { label: "Chuẩn bị ba bảng", detail: "Chép số liệu vào ba bảng có cột mặt hàng và số lượng. Che tên nhà cung cấp và giá riêng nếu đưa vào công cụ AI bên ngoài." },
          { label: "Nhờ AI ghép theo mặt hàng", detail: "Yêu cầu một bảng: mỗi hàng một mặt hàng, ba cột số lượng, và một cột ghi nhận dòng ghép nào AI không chắc." },
          { label: "Tự tính độ lệch", detail: "Dùng công thức trong bảng tính để tính hiệu số giữa các cột. Số của bảng tính thay cho số AI tự viết." },
          { label: "Khoanh và ghi câu hỏi", detail: "Mỗi dòng lệch kèm một câu hỏi cụ thể: 'hoá đơn tính 8 thùng chưa thấy giao, xin xác nhận'." },
          { label: "Chuyển cho người có thẩm quyền", detail: "Gửi kế toán hoặc trưởng kho danh sách dòng lệch. Họ quyết định chấp nhận, từ chối hay hỏi nhà cung cấp." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập bảng đối chiếu",
        task: "Bạn có ba bảng số lượng vật tư của cùng một nhà cung cấp và muốn AI ghép thành một bảng khoanh dòng lệch.",
        parts: [
          {
            id: "data",
            label: "Cách đưa dữ liệu",
            options: [
              { text: "Tôi có ba bảng, tự ghép giúp tôi rồi cho biết kết luận luôn.", feedback: "Không có bảng thật thì AI không có gì để ghép và sẽ bịa dòng hàng cho hợp lý." },
              { text: "Đây là ba bảng (dán): đơn đặt, phiếu giao, hoá đơn, mỗi bảng có cột mặt hàng và số lượng.", good: true, feedback: "AI có dữ liệu thật để ghép, và bạn kiểm được kết quả dòng theo dòng." },
            ],
          },
          {
            id: "output",
            label: "Khuôn đầu ra",
            options: [
              { text: "Tóm tắt xem có lệch gì không.", feedback: "Một đoạn tóm tắt che mất dòng nào lệch, bạn phải tự tìm lại trong ba bảng." },
              { text: "Lập một bảng: mỗi hàng một mặt hàng, ba cột số lượng, một cột 'lệch?' và một cột ghi dòng AI không chắc khi ghép.", good: true, feedback: "Bảng cho bạn khoanh từng dòng, và cột 'không chắc' báo trước chỗ phải soát tay." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nếu số không khớp thì sửa lại cho khớp giúp tôi.", feedback: "AI sẽ chỉnh số trong bảng cho đẹp, xoá mất dấu vết chỗ lệch thật." },
              { text: "Không sửa số nào. Chỉ đánh dấu dòng lệch, không kết luận ai đúng ai sai và không tự tính tổng tiền.", good: true, feedback: "Dữ liệu giữ nguyên, quyết định nằm ở người, và tổng tiền do bảng tính của bạn làm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "output", "limit"],
            text: "Bảng đối chiếu (số lượng)\nGiấy A4 | Đặt 100 | Giao 92 | Hoá đơn 100 | LỆCH (phiếu giao thấp hơn)\nBút bi | Đặt 50 | Giao 50 | Hoá đơn 55 | LỆCH (hoá đơn cao hơn)\nGhim bấm | Đặt 20 | Giao 20 | Hoá đơn 20 | Khớp\nGhép không chắc: dòng 'Kẹp giấy lớn' và 'Kẹp giấy 51mm' có phải cùng mặt hàng, xin bạn xác nhận.\nTôi không sửa số và không kết luận bên nào đúng.",
          },
          {
            requires: ["data"],
            text: "Nhìn chung số lượng khá khớp, có vài dòng lệch nhỏ có thể do làm tròn hoặc giao thiếu.\n\n(Không chỉ ra dòng nào và tự đoán nguyên nhân: bạn không biết phải hỏi gì ai.)",
          },
          {
            text: "Sau khi đối chiếu, tôi đã chỉnh số phiếu giao thành 100 và số hoá đơn thành 50 để ba bảng khớp nhau. Tổng tiền cần thanh toán là 4.820.000 đồng.\n\n(Số chứng từ bị sửa, tổng tiền bịa: mất dấu vết chỗ lệch thật.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng ghép theo mặt hàng",
          text: "Mỗi mặt hàng một dòng, ba số cạnh nhau, lệch hiện ra ngay. Khoanh dòng và hỏi đúng chỗ. Số lượng độ lệch do bảng tính tính nên đáng tin.",
        },
        right: {
          label: "So từng cặp hai tờ bằng mắt",
          text: "Phải lật đi lật lại giữa ba tờ. Dòng chỉ lệch ở tờ thứ ba dễ lọt. Tên mặt hàng viết khác nhau làm bạn tưởng là hai mặt hàng khác nhau.",
        },
      },
      {
        type: "callout",
        label: "Lệch không có nghĩa là ai đó gian dối",
        text: "Phần lớn lệch là do giao thiếu chưa bù, đóng gói khác quy cách, hoặc đơn đặt được sửa miệng. Bảng đối chiếu chỉ cho biết chỗ cần hỏi. Chuyện chấp nhận hay từ chối khoản lệch và cách nói với nhà cung cấp hỏi kế toán trưởng hoặc người phụ trách hợp đồng.",
      },
      {
        type: "scenario",
        title: "Bảng đối chiếu cuối tháng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng đối chiếu của AI cho thấy dòng 'Giấy A4' đặt 100, giao 92, hoá đơn 100. Kế toán chờ danh sách trước 3 giờ chiều.",
            choices: [
              { label: "Nhờ AI sửa số hoá đơn xuống 92 cho bảng khớp, rồi gửi kế toán", next: "bad_edit" },
              { label: "Tự tính độ lệch bằng bảng tính, rồi ghi câu hỏi cho dòng này", next: "s2" },
            ],
          },
          bad_edit: {
            text: "Bảng gửi đi không còn dòng lệch nào. Hoá đơn gốc vẫn tính 100, nên kế toán thanh toán đủ 100 thùng trong khi kho chỉ nhận 92.",
            ending: "bad",
          },
          s2: {
            text: "Bảng tính cho độ lệch 100 trừ 92 bằng 8 thùng. Còn dòng 'Kẹp giấy' AI ghi 'ghép không chắc'.",
            choices: [
              { label: "Đoán chúng là cùng một mặt hàng và gộp luôn cho gọn", next: "bad_guess" },
              { label: "Xem lại phiếu giao và hỏi trưởng kho về quy cách kẹp giấy", next: "good" },
            ],
          },
          bad_guess: {
            text: "Hai loại kẹp có giá khác nhau. Việc gộp làm độ lệch bị tính sai, kế toán phải làm lại phần đối chiếu.",
            ending: "bad",
          },
          good: {
            text: "Trưởng kho xác nhận là hai loại khác nhau. Bạn gửi kế toán bảng có hai dòng tách riêng và câu hỏi cụ thể về 8 thùng giấy. Kế toán hỏi nhà cung cấp trong buổi chiều.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chép ba chứng từ vào ba bảng cột mặt hàng và số lượng.",
          "Bước 2 - Nhờ AI ghép theo mặt hàng và ghi dòng không chắc.",
          "Bước 3 - Tự tính độ lệch bằng công thức bảng tính.",
          "Bước 4 - Ghi mỗi dòng lệch kèm một câu hỏi cụ thể.",
          "Bước 5 - Gửi kế toán hoặc trưởng kho quyết định.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI giúp ghép, bảng tính giúp tính, người có thẩm quyền quyết định.",
          "Bài sau: chứng từ nào không được đưa vào công cụ AI bên ngoài.",
        ],
      },
    ],
  },
  {
    id: 2157,
    slug: "khong-dua-chung-tu-that-vao-cong-cu-ai-ben-ngoai",
    title: "Chặng 37, Bài 18: Chứng từ nào không được đưa vào công cụ AI bên ngoài",
    subtitle: "Trước khi dán, hỏi: nếu tờ này lọt tới đối thủ, ai thiệt?",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang tính chụp hợp đồng có giá riêng và dán vào AI cho nhanh. Một hợp đồng chứa giá, điều khoản và tên khách, thứ mà đối tác đã tin tưởng giao cho công ty. Dán ra ngoài là một lần chuyển dữ liệu mà công ty có thể chưa cho phép. Biết phân loại tài liệu và che phần nhạy cảm giúp bạn vẫn dùng AI mà không đặt công ty vào rủi ro.",
    openingQuestion:
      "Bạn có bốn tài liệu: thông báo nghỉ lễ đã gửi cả công ty, mẫu email nhắc thanh toán chưa điền, bảng giá riêng của một khách lớn, và bài giới thiệu sản phẩm trên website. Tài liệu nào phải suy nghĩ kỹ nhất trước khi đưa cho công cụ AI bên ngoài?",
    openingOptions: [
      "Bảng giá riêng của một khách lớn",
      "Bài giới thiệu sản phẩm đang có trên website",
      "Mẫu email nhắc thanh toán chưa điền tên hay số",
      "Thông báo nghỉ lễ đã gửi toàn công ty",
    ],
    correctOption: 0,
    explanation:
      "Bảng giá riêng là thông tin thương mại nhạy cảm: nó gắn với một khách cụ thể và một mức giá không công khai. Bài trên website đã công khai nên rủi ro thấp. Mẫu email chưa điền không có dữ liệu thật nào. Thông báo nghỉ lễ đã gửi toàn công ty chỉ là thông tin nội bộ nhẹ. Cách phân loại nhanh: tài liệu đã công khai thì thấp, tài liệu nội bộ thông thường thì cân nhắc theo quy định công ty, tài liệu có giá, tên khách hay điều khoản riêng thì không đưa ra ngoài khi chưa được phép.",
    diagram: [
      { label: "Nhìn tài liệu: công khai, nội bộ hay có giá và tên khách riêng?", arrow: true },
      { label: "Tra quy định công ty về công cụ AI, chưa có thì hỏi IT hoặc pháp chế", arrow: true },
      { label: "Che tên và số riêng bằng ký hiệu nếu được phép", arrow: true },
      { label: "Đưa phần đã che cho AI, điền lại thông tin thật ở máy bạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Mai ở phòng mua hàng muốn AI tóm tắt điều khoản thanh toán của một hợp đồng dài. Cô hỏi bộ phận IT và được biết công ty chưa duyệt công cụ nào cho tài liệu hợp đồng. Cô dùng cách khác: tự chép ba điều khoản cần hỏi, thay tên công ty bằng 'Bên B', bỏ hết số tiền, rồi mới nhờ AI giải thích cách đọc.",
    },
    quiz: [
      {
        question: "Loại tài liệu nào thường thuộc nhóm không đưa ra công cụ AI bên ngoài khi chưa được phép?",
        options: [
          "Hợp đồng có giá riêng của từng khách",
          "Thông báo nghỉ lễ đã gửi cho toàn công ty qua email",
          "Bài giới thiệu sản phẩm đã đăng công khai trên website",
          "Mẫu email nhắc thanh toán chưa điền tên hay số tiền",
        ],
        correct: 0,
        explanation:
          "Hợp đồng chứa giá và điều khoản riêng của hai bên, đưa ra ngoài là lộ thông tin thương mại. Ba tài liệu còn lại đã công khai, chỉ là thông tin nội bộ nhẹ hoặc chưa có dữ liệu thật nên rủi ro thấp hơn nhiều.",
      },
      {
        question: "Che dữ liệu nhạy cảm trước khi dán cho AI nghĩa là làm gì?",
        options: [
          "Thay tên và số riêng bằng ký hiệu như Khách A, giá X",
          "Xoá tên công ty ở đầu trang nhưng giữ nguyên mọi số và điều khoản",
          "Đổi tên tệp thành tên khác để công cụ không nhận ra hợp đồng",
          "Dán từng đoạn nhỏ thay vì cả tệp, vì đoạn nhỏ không bị lưu lại",
        ],
        correct: 0,
        explanation:
          "Che nghĩa là bỏ khỏi văn bản những thứ nhận diện được người, công ty và giá. Xoá mỗi tên công ty mà giữ giá và điều khoản vẫn để lộ nội dung. Đổi tên tệp không thay đổi nội dung bên trong. Dán từng đoạn cũng vẫn là gửi từng đoạn dữ liệu thật ra ngoài.",
      },
      {
        question: "Công ty bạn chưa có quy định nào về việc dùng công cụ AI. Việc hợp lý nhất là gì?",
        options: [
          "Hỏi bộ phận IT hoặc pháp chế trước khi dán bất kỳ tài liệu thật nào",
          "Dùng tài khoản cá nhân cho việc công ty, vì tài khoản cá nhân riêng tư hơn",
          "Cứ dùng, chưa cấm tức là được phép",
          "Chỉ dán tài liệu dưới ba trang cho đỡ rủi ro",
        ],
        correct: 0,
        explanation:
          "Chưa có quy định nghĩa là chưa ai trả lời câu hỏi, không phải câu trả lời là 'được'. Dùng tài khoản cá nhân đưa dữ liệu công ty vào nơi công ty không kiểm soát được. Độ dài trang không liên quan tới độ nhạy cảm: một trang hợp đồng vẫn có giá riêng.",
      },
      {
        question: "Một bản nháp AI viết cho bạn có câu: 'Mọi công cụ AI đều xoá dữ liệu bạn dán ngay sau khi trả lời.' Nên xử lý câu này thế nào?",
        options: [
          "Coi là chưa kiểm chứng: mỗi công cụ và gói dùng có chính sách riêng cần đọc",
          "Tin, vì nếu không xoá thì công cụ đó đã bị cấm ở mọi công ty",
          "Tin, vì AI chỉ trả lời chứ không lưu gì",
          "Tin với công cụ trả phí, nghi ngờ công cụ miễn phí",
        ],
        correct: 0,
        explanation:
          "Chính sách lưu và dùng dữ liệu khác nhau theo công cụ, gói dùng và thiết lập công ty, không có quy tắc chung cho mọi công cụ. Câu 'ai cũng xoá' là loại khẳng định AI viết trôi chảy mà không có nguồn. Phân biệt trả phí và miễn phí cũng là giả định chưa kiểm.",
      },
      {
        question: "Bạn lỡ dán nguyên hợp đồng có giá riêng vào một công cụ AI bên ngoài. Việc đúng là gì?",
        options: [
          "Báo ngay cho người phụ trách bảo mật hoặc quản lý để họ xử lý, không giấu",
          "Nhờ AI quên đoạn vừa dán bằng một câu lệnh",
          "Xoá cuộc trò chuyện ở giao diện là coi như chưa từng có chuyện gì xảy ra, dữ liệu mất hẳn",
          "Im lặng, chưa thấy hậu quả thì chưa cần nói",
        ],
        correct: 0,
        explanation:
          "Người phụ trách biết phải làm gì tiếp: xem chính sách công cụ, báo bên liên quan nếu cần. Câu lệnh 'hãy quên' không đảm bảo xoá dữ liệu ở phía nhà cung cấp. Xoá cuộc trò chuyện ở giao diện không chắc xoá bản đã lưu. Im lặng làm mất thời gian mà công ty cần để xử lý.",
      },
    ],
    keyTakeaways: [
      "Phân loại trước khi dán: công khai, nội bộ thông thường, hay có giá và tên riêng.",
      "Hợp đồng có giá, bảng giá riêng, dữ liệu cá nhân: không đưa ra ngoài khi chưa được phép.",
      "Che bằng ký hiệu: Khách A, Bên B, giá X; điền lại thông tin thật ở máy bạn.",
      "Chưa có quy định thì hỏi IT hoặc pháp chế, không tự coi là được.",
      "Lỡ dán thì báo sớm; đừng trông vào câu lệnh 'hãy quên'.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn AI giải thích điều khoản thanh toán 'net 30' trong hợp đồng. Cách nào vừa dùng được AI vừa an toàn?",
      options: [
        "Chép riêng câu điều khoản, thay tên hai bên bằng Bên A, Bên B và bỏ số tiền rồi hỏi",
        "Dán cả hợp đồng, AI đọc nguyên văn mới giải thích đúng",
        "Chụp ảnh trang có chữ ký cho AI đọc nhanh",
        "Không hỏi AI, khái niệm nào cũng phải hỏi luật sư",
      ],
      correct: 0,
      explanation:
        "Câu hỏi về cách hiểu một cụm điều khoản không cần tên hay số tiền thật. Dán cả hợp đồng hay chụp trang chữ ký là đưa dữ liệu thật ra ngoài mà không cần thiết. Không hỏi AI bỏ phí phần nó giải thích khái niệm tốt; còn việc áp dụng vào hợp đồng cụ thể thì hỏi bộ phận pháp chế.",
    },
    summary: {
      keyIdea: "Trước khi dán, phân loại tài liệu; có giá hay tên riêng thì che hoặc không đưa.",
      formula: "Công khai → thấp rủi ro. Nội bộ → theo quy định. Có giá, tên khách, dữ liệu cá nhân → che hoặc không đưa.",
      commonMistake: "Nghĩ rằng đổi tên tệp, xoá tên công ty ở đầu trang hay xoá cuộc trò chuyện là đủ an toàn.",
      action: "Viết ra danh sách ba loại tài liệu bạn hay dùng và gán mức rủi ro cho từng loại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở thư mục tài liệu bạn làm việc hằng tuần, chọn 6 tài liệu và gán từng cái vào ba nhóm: công khai, nội bộ thông thường, có giá hoặc tên riêng. Với một tài liệu thuộc nhóm thứ ba, tập che: thay tên và số bằng ký hiệu trong một bản sao rồi đọc lại xem còn nhận ra khách nào không.",
      secondary: "Ghi ra một câu hỏi bạn cần hỏi IT hoặc pháp chế về quy định công cụ AI ở công ty.",
    },
    sections: [
      {
        type: "lead",
        text: "Dán một tài liệu vào ô chat chỉ mất ba giây, nhưng đó là lần chuyển dữ liệu ra ngoài công ty. Bài này dạy cách phân loại tài liệu và che phần nhạy cảm trước khi dùng AI.",
      },
      {
        type: "feynman",
        title: "Chứng từ và AI bên ngoài đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới việc nhờ người lạ photo giúp một xấp giấy tờ ở tiệm. Giấy quảng cáo thì cứ đưa, giấy nội bộ thì cân nhắc, còn hợp đồng có giá riêng thì bạn không đưa nguyên bản mà che bớt trước.",
        columns: ["Thành phần", "Nhờ người lạ photo", "Dán vào công cụ AI bên ngoài"],
        rows: [
          ["Giấy đã công khai", "Tờ rơi quảng cáo, đưa thoải mái", "Bài đã đăng trên website"],
          ["Giấy nội bộ", "Cân nhắc, tuỳ bạn tin tiệm tới đâu", "Làm theo quy định công ty"],
          ["Giấy có giá và tên riêng", "Không đưa nguyên bản", "Không đưa khi chưa được phép"],
          ["Cách xử lý", "Che tên và số bằng bút rồi mới đưa", "Thay bằng Khách A, giá X"],
        ],
        oneLiner: "Phân loại trước, che phần nhạy cảm sau, và điều chưa chắc thì hỏi người phụ trách.",
      },
      { type: "heading", text: "Vấn đề: tiện tay dán cả tệp" },
      {
        type: "paragraph",
        text: "Người làm mua hàng và kho vận cầm nhiều tài liệu mang tính thương mại: báo giá, hợp đồng, bảng giá theo khách, danh sách nhà cung cấp. Khi vội, ai cũng muốn dán cho AI tóm tắt. Nhưng nội dung nhạy cảm của các tài liệu này thường không cần thiết cho việc bạn định hỏi: hỏi cách đọc một điều khoản không cần biết đó là khách nào.",
      },
      {
        type: "flow",
        title: "Từ tài liệu thật tới câu hỏi cho AI",
        steps: [
          { label: "Phân loại", detail: "Công khai, nội bộ thông thường, hay có giá, tên khách, dữ liệu cá nhân? Tài liệu càng riêng, cách xử lý càng chặt." },
          { label: "Tra quy định", detail: "Công ty có quy định về công cụ AI không? Chưa có thì hỏi bộ phận IT hoặc pháp chế trước khi đưa tài liệu thật." },
          { label: "Chỉ lấy phần cần hỏi", detail: "Chép đúng câu hoặc bảng cần hỏi thay vì cả tệp; phần còn lại ở lại máy bạn." },
          { label: "Che bằng ký hiệu", detail: "Thay tên công ty và tên người bằng Bên A, Khách A; thay giá bằng X. Giữ lại một bảng tra ký hiệu ở máy bạn." },
          { label: "Đưa AI, rồi điền lại", detail: "Nhận kết quả với ký hiệu, rồi điền thông tin thật ở máy bạn. AI chỉ thấy phiên bản đã che." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản hướng dẫn nội bộ do AI viết",
        task: "Một đồng nghiệp nhờ AI viết đoạn hướng dẫn 'dùng AI an toàn' cho phòng mua hàng. Bấm vào những câu đáng ngờ (bịa hoặc nguy hiểm) rồi nộp.",
        segments: [
          { text: "Trước khi dán tài liệu vào công cụ AI, hãy xác định nó thuộc nhóm công khai, nội bộ hay có giá và tên riêng." },
          { text: "Theo chính sách chung của mọi công cụ AI, dữ liệu bạn dán vào đều được xoá ngay sau khi trả lời nên hợp đồng dán vào là an toàn.", error: "Bịa: mỗi công cụ và gói dùng có chính sách lưu dữ liệu riêng, không có 'chính sách chung của mọi công cụ'. Người đọc tin câu này sẽ dán hợp đồng thật." },
          { text: "Khi cần hỏi về một điều khoản, chỉ chép câu điều khoản đó và thay tên các bên bằng Bên A, Bên B." },
          { text: "Nếu đổi tên tệp hợp đồng thành 'tài liệu 1' thì công cụ AI không đọc được nội dung bên trong nên có thể dán thoải mái.", error: "Sai: đổi tên tệp không thay đổi nội dung bên trong; công cụ vẫn đọc toàn bộ chữ trong tệp." },
          { text: "Nếu công ty chưa có quy định về công cụ AI, hãy hỏi bộ phận IT hoặc pháp chế trước khi dán tài liệu thật." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đưa AI phiên bản đã che",
          text: "AI vẫn giải thích được cách đọc điều khoản. Tên khách và giá không rời máy bạn. Bạn giữ bảng tra ký hiệu và điền lại sau. Nếu có sự cố, phần lộ ra không nhận diện được ai.",
        },
        right: {
          label: "Dán nguyên bản cho nhanh",
          text: "Giá riêng, tên khách và điều khoản nằm ngoài tầm kiểm soát của công ty. Khó thu hồi khi đã gửi. Có thể vi phạm điều khoản giữ bí mật mà công ty đã ký với đối tác.",
        },
      },
      {
        type: "callout",
        label: "Đừng tự đoán quy định",
        text: "Quy định về dữ liệu của mỗi công ty và mỗi hợp đồng khác nhau, và bạn không cần nhớ hết. Điều gì liên quan tới bí mật thương mại, dữ liệu cá nhân hay điều khoản giữ bí mật, hỏi bộ phận pháp chế hoặc IT thay vì suy luận từ bài này.",
      },
      {
        type: "scenario",
        title: "Hợp đồng lớn cần tóm tắt trước cuộc họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp cần bản tóm tắt điều khoản thanh toán của một hợp đồng 20 trang trước cuộc họp 2 giờ chiều. Hợp đồng có giá riêng và tên khách. Công ty chưa có quy định về công cụ AI.",
            choices: [
              { label: "Dán cả hợp đồng vào AI cho tiết kiệm thời gian", next: "bad_paste" },
              { label: "Hỏi nhanh IT hoặc pháp chế, đồng thời tự đọc phần điều khoản thanh toán", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bạn nhận bản tóm tắt nhanh, nhưng sau đó pháp chế báo hợp đồng có điều khoản giữ bí mật. Việc dán ra công cụ chưa duyệt phải báo cáo và giải trình.",
            ending: "bad",
          },
          s2: {
            text: "IT trả lời: chưa duyệt công cụ nào cho tài liệu hợp đồng. Bạn vẫn muốn AI giúp phần diễn đạt.",
            choices: [
              { label: "Tự viết bản tóm tắt từ điều khoản đã đọc, rồi che tên và số để AI chỉ chỉnh câu chữ", next: "good" },
              { label: "Đổi tên tệp thành 'tài liệu 1' rồi dán, để công cụ không nhận ra", next: "bad_rename" },
            ],
          },
          bad_rename: {
            text: "Tên tệp không thay được nội dung. Toàn bộ giá và tên khách vẫn nằm trong bản dán và đã rời khỏi công ty.",
            ending: "bad",
          },
          good: {
            text: "Bản tóm tắt sẵn sàng lúc 1 giờ 30. AI chỉ thấy 'Bên A', 'Bên B' và 'giá X'; sếp nhận bản đã điền tên và số thật từ máy bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Phân loại tài liệu: công khai, nội bộ, hay có giá và tên riêng.",
          "Bước 2 - Tra quy định công ty; chưa có thì hỏi IT hoặc pháp chế.",
          "Bước 3 - Chỉ chép phần cần hỏi, không dán cả tệp.",
          "Bước 4 - Che tên và số bằng ký hiệu, giữ bảng tra ở máy bạn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba giây để dán, nhưng không thu hồi được; phân loại và che trước là thói quen rẻ nhất.",
          "Bài sau: cải tiến một quy trình mua hàng nhỏ trong hai tuần.",
        ],
      },
    ],
  },
  {
    id: 2158,
    slug: "ke-hoach-cai-tien-mot-quy-trinh-mua-hang-nho",
    title: "Chặng 37, Bài 19: Cải tiến một quy trình mua hàng nhỏ trong hai tuần",
    subtitle: "Đổi một việc nhỏ, đo trước và sau, giữ nếu tốt, bỏ nếu không.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛠️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Xin duyệt một đơn mua nhỏ mà mất cả tuần vì đề nghị đi qua nhiều người, mỗi người đợi tới lượt mình. Bạn không cần đổi cả hệ thống để cải thiện: chọn một việc lặp lại, vẽ lại các bước, tìm chỗ nghẽn và thử một thay đổi nhỏ trong hai tuần. AI giúp vẽ bước và gợi ý, còn quyết định giữ hay bỏ dựa trên số ngày bạn đo được.",
    openingQuestion:
      "Đề nghị mua vật tư dưới hai triệu đồng của bạn mất trung bình sáu ngày mới được duyệt. Bạn muốn cải thiện. Bước đầu tiên nên là gì?",
    openingOptions: [
      "Ghi lại các bước hiện tại và số ngày đề nghị nằm chờ ở mỗi bước",
      "Nhờ AI thiết kế lại toàn bộ quy trình mua hàng của công ty",
      "Bỏ bớt vài chữ ký cho nhanh, nhất là chữ ký trưởng phòng, để đề nghị đi nhanh hơn",
      "Yêu cầu mọi người duyệt trong vòng một ngày",
    ],
    correctOption: 0,
    explanation:
      "Bạn chưa biết chỗ nghẽn thì chưa biết sửa chỗ nào: có thể đề nghị chờ ở một người hay vắng, hoặc chờ vì thiếu thông tin nên bị trả lại. Ghi các bước và số ngày chờ cho ra một con số đầu để so sánh sau này. Thiết kế lại toàn bộ là việc quá to cho hai tuần. Bỏ chữ ký khi chưa hiểu vì sao có thể mở lỗ hổng kiểm soát chi tiêu. Ra lệnh duyệt một ngày không thay đổi cách làm.",
    diagram: [
      { label: "Ghi các bước hiện tại và số ngày chờ mỗi bước", arrow: true },
      { label: "AI gợi ý chỗ nghẽn và cách sửa, bạn chọn một", arrow: true },
      { label: "Thử trên một nhóm nhỏ trong hai tuần", arrow: true },
      { label: "So số ngày trước và sau rồi giữ hoặc bỏ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhóm mua hàng của một xưởng nhỏ thấy đề nghị dưới hai triệu đồng phải qua bốn người ký lần lượt. Họ ghi lại và thấy đề nghị nằm chờ lâu nhất ở khâu trả lời câu hỏi bổ sung. Họ thử thêm một biểu mẫu có sẵn các thông tin thường bị hỏi, trong hai tuần cho một nhóm. Số ngày duyệt của nhóm thử giảm, và họ mở rộng sau khi trưởng phòng xác nhận.",
    },
    quiz: [
      {
        question: "Vì sao nên chọn một quy trình nhỏ, lặp lại như xin duyệt đơn mua để cải tiến trước?",
        options: [
          "Làm nhỏ thì thử được trong hai tuần, đo được kết quả và quay lại nếu hỏng",
          "Vì quy trình lớn không cần cải tiến, chỉ việc nhỏ mới cần",
          "Vì AI chỉ vẽ được sơ đồ có dưới năm bước",
          "Vì việc nhỏ ít người biết nên không ai phản đối",
        ],
        correct: 0,
        explanation:
          "Quy trình nhỏ và lặp lại cho nhiều lần đo trong thời gian ngắn, sai thì quay lại được. Quy trình lớn vẫn cần cải tiến, chỉ là khó thử. AI vẽ được sơ đồ nhiều hơn năm bước. Ít người biết không phải lý do chọn vì thay đổi ở đâu cũng cần thông báo người liên quan.",
      },
      {
        question: "AI vẽ lại quy trình và đề xuất bỏ bước 'trưởng phòng ký'. Bạn làm gì?",
        options: [
          "Hỏi lý do bước đó tồn tại rồi mới quyết",
          "Bỏ luôn, AI đã phân tích nhiều quy trình tương tự",
          "Giữ nguyên hết, AI không hiểu công ty mình nên bỏ qua",
          "Bỏ bước đó và bước sau nó cho quy trình gọn gấp đôi",
        ],
        correct: 0,
        explanation:
          "Một chữ ký có thể tồn tại vì hạn mức chi tiêu hay yêu cầu kiểm toán mà AI không biết. Biết lý do rồi mới quyết là cách vừa dùng gợi ý vừa giữ kiểm soát. Bỏ luôn hay bỏ thêm bước là quyết khi chưa biết, còn gạt hết gợi ý là bỏ phí phần AI làm tốt.",
      },
      {
        question: "Thời gian duyệt trung bình là 6 ngày, sau hai tuần thử còn 4 ngày. Thời gian duyệt giảm khoảng bao nhiêu phần trăm?",
        options: [
          "Khoảng 33% (= (6 − 4) ÷ 6, chia cho số ngày ban đầu)",
          "50% (= (6 − 4) ÷ 4, chia cho số ngày sau thử)",
          "2 ngày (= 6 − 4, là số ngày giảm, chưa phải phần trăm)",
          "67% (= 4 ÷ 6, đây là phần còn lại chứ không phải phần giảm)",
        ],
        correct: 0,
        explanation:
          "Phần giảm là 6 trừ 4 bằng 2 ngày, chia cho mốc ban đầu 6 bằng khoảng 33%. Chia cho 4 tạo ra 50%, sai mốc gốc. Con số 2 ngày đúng về số ngày nhưng chưa là phần trăm. 67% là phần còn lại sau cải tiến chứ không phải phần đã giảm.",
      },
      {
        question: "Chỉ số nào cho biết thay đổi có hiệu quả sau hai tuần thử?",
        options: [
          "Số ngày từ lúc đề nghị tới lúc duyệt, đo trước và sau",
          "Số người khen quy trình mới trong buổi họp cuối hai tuần",
          "Số bước trên sơ đồ mà AI vẽ ra",
          "Số lần bạn dùng AI trong hai tuần thử nghiệm",
        ],
        correct: 0,
        explanation:
          "Mục tiêu là rút ngắn thời gian chờ nên đo đúng thứ đó, có mốc trước để so sánh. Lời khen phụ thuộc cảm tính và người nói. Số bước trên sơ đồ ít đi không có nghĩa đề nghị được duyệt nhanh hơn. Số lần dùng AI đo việc dùng công cụ chứ không đo kết quả.",
      },
      {
        question: "Bạn nên thử thay đổi trên phạm vi nào trong hai tuần?",
        options: [
          "Một nhóm hoặc một loại đơn nhỏ, giữ cách cũ cho phần còn lại",
          "Toàn bộ đề nghị của công ty cùng lúc để thấy hiệu quả rõ nhanh",
          "Chỉ một đơn duy nhất rồi kết luận",
          "Nửa số đề nghị, chọn ngẫu nhiên ngay từ đầu tuần đầu",
        ],
        correct: 0,
        explanation:
          "Nhóm nhỏ cho đủ số đơn để so sánh mà sai thì ít người bị ảnh hưởng, và phần giữ cách cũ là mốc đối chứng. Áp cho cả công ty rủi ro nếu hỏng. Một đơn không đủ để kết luận. Chia ngẫu nhiên một nửa làm nhiều người phải đổi cách làm khi chưa biết có tốt không.",
      },
    ],
    keyTakeaways: [
      "Chọn một việc nhỏ, lặp lại thường xuyên để cải tiến.",
      "Đo trước: các bước và số ngày chờ ở từng bước.",
      "AI gợi ý chỗ nghẽn; bạn hỏi lý do của từng bước trước khi bỏ.",
      "Thử trong hai tuần trên một nhóm nhỏ, phần còn lại giữ cách cũ.",
      "Phần trăm giảm = (số cũ − số mới) ÷ số cũ.",
    ],
    practicePrompt: {
      question:
        "Trước thử nghiệm đề nghị mất 8 ngày, sau thử còn 6 ngày. Bạn nói với sếp thế nào cho đúng?",
      options: [
        "Giảm 2 ngày, tức khoảng 25% (= (8 − 6) ÷ 8), trên một nhóm thử",
        "Giảm 33% (= (8 − 6) ÷ 6, chia cho số ngày sau thử)",
        "Giảm 75% (= 6 ÷ 8, lấy phần còn lại làm phần giảm)",
        "Giảm chắc chắn nhiều hơn nếu mở cho cả công ty",
      ],
      correct: 0,
      explanation:
        "8 trừ 6 bằng 2 ngày, chia cho mốc ban đầu 8 bằng 25%. Chia cho 6 ra 33% là sai mốc. 6 chia 8 bằng 75% là phần còn lại. Nói chắc chắn sẽ giảm nhiều hơn khi mở rộng là kết luận vượt quá số liệu của nhóm thử.",
    },
    summary: {
      keyIdea: "Cải tiến nhỏ, đo được, thử trên nhóm nhỏ trong hai tuần rồi mới mở rộng.",
      formula: "Ghi bước và số ngày chờ → tìm chỗ nghẽn → thử một thay đổi → so số ngày → giữ hoặc bỏ.",
      commonMistake: "Bỏ một bước vì AI gợi ý mà chưa hỏi vì sao bước đó tồn tại.",
      action: "Chọn một việc lặp lại của bạn và ghi số ngày chờ ở từng bước.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quy trình mua hàng nhỏ bạn làm thường xuyên, như xin duyệt một đơn vật tư. Ghi ra các bước và ước tính số ngày đề nghị nằm chờ ở từng bước (lấy từ ba đơn gần nhất). Đưa danh sách bước, không có tên người và không có giá thật, cho AI và nhờ nó chỉ ra chỗ nghẽn và một thay đổi nhỏ có thể thử.",
      secondary: "Viết một dòng: nếu thử thay đổi đó hai tuần, bạn sẽ đo số ngày nào và so với con số nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Không phải cải tiến nào cũng cần dự án lớn. Bài này dạy cách chọn một việc mua hàng nhỏ, vẽ lại các bước, tìm chỗ nghẽn và thử một thay đổi trong hai tuần, với số liệu để biết có tốt thật hay không.",
      },
      {
        type: "feynman",
        title: "Cải tiến quy trình nhỏ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới đường đi làm buổi sáng của bạn. Muốn tới sớm hơn, bạn không đổi cả thành phố: bạn đo thời gian ở từng đoạn, thấy đoạn kẹt ở một ngã tư, thử đi đường khác trong hai tuần rồi so số phút.",
        columns: ["Thành phần", "Đường đi làm", "Quy trình duyệt đơn mua"],
        rows: [
          ["Đo trước", "Bấm giờ từng đoạn đường", "Ghi số ngày chờ ở từng bước"],
          ["Tìm chỗ kẹt", "Ngã tư đông xe", "Bước đề nghị nằm chờ lâu nhất"],
          ["Thử nhỏ", "Đi đường khác vài buổi", "Thử một thay đổi trên một nhóm"],
          ["So kết quả", "Số phút trước và sau", "Số ngày duyệt trước và sau"],
        ],
        oneLiner: "Đo đoạn kẹt, thử một thay đổi nhỏ, so số trước và sau; không cần đổi cả thành phố.",
      },
      { type: "heading", text: "Vấn đề: đề nghị nhỏ, chờ lâu" },
      {
        type: "paragraph",
        text: "Một đề nghị mua dưới hai triệu đồng đi qua người đề nghị, trưởng nhóm, trưởng phòng rồi kế toán. Mỗi người chỉ mất năm phút, nhưng đề nghị nằm chờ vì ai cũng đang bận việc khác. Phần lớn thời gian là thời gian chờ chứ không phải thời gian duyệt. AI giúp bạn nhìn ra chỗ chờ nếu bạn đưa nó danh sách các bước và số ngày.",
      },
      {
        type: "chart",
        title: "Số ngày từ lúc đề nghị đến lúc duyệt",
        caption: "Số liệu minh hoạ. Kéo thanh trượt cho gần với quy trình của bạn: duyệt lần lượt thì mỗi người thêm một đợt chờ, duyệt gần như song song thì chỉ thêm một phần nhỏ. Đây là mô hình để hình dung, không phải kết quả đo được của công ty nào.",
        kind: "line",
        xLabel: "Số người phải duyệt",
        yLabel: "Số ngày",
        x: { from: 1, to: 8, step: 1 },
        params: [
          { id: "wait", label: "Ngày chờ mỗi người", min: 0.5, max: 4, step: 0.5, value: 1.5, unit: "ngày" },
          { id: "overlap", label: "Mức duyệt song song", min: 0, max: 100, step: 10, value: 70, unit: "%" },
        ],
        series: [
          { label: "Duyệt lần lượt", expr: "x * wait" },
          { label: "Duyệt gần song song", expr: "wait + (x - 1) * wait * (1 - overlap / 100)" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Cải tiến nhỏ, có đo",
          text: "Chọn một việc lặp lại. Ghi số ngày trước. Thử một thay đổi hai tuần. So số ngày rồi quyết. Sai thì quay lại cách cũ ngay.",
        },
        right: {
          label: "Đổi cả quy trình vì AI gợi ý",
          text: "Khó biết thay đổi nào có tác dụng. Nhiều người phải đổi thói quen cùng lúc. Nếu tệ đi thì khó quay lại và khó biết lỗi ở đâu.",
        },
      },
      {
        type: "callout",
        label: "Mỗi bước có thể có lý do bạn chưa thấy",
        text: "Một chữ ký có thể là quy định về hạn mức chi tiêu hay yêu cầu của kiểm toán. AI không biết điều này. Trước khi bỏ hay gộp một bước, hỏi người phụ trách hoặc kế toán trưởng vì sao bước đó tồn tại.",
      },
      {
        type: "scenario",
        title: "Hai tuần thử cải tiến duyệt đơn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã ghi các bước duyệt đơn mua nhỏ: trung bình 6 ngày. AI gợi ý ba thay đổi: bỏ chữ ký trưởng phòng, dùng biểu mẫu có sẵn thông tin thường bị hỏi, hoặc duyệt song song hai người.",
            choices: [
              { label: "Bỏ luôn chữ ký trưởng phòng cho cả công ty vì AI đề xuất", next: "bad_skip" },
              { label: "Chọn biểu mẫu có sẵn thông tin, thử trên nhóm của bạn trong hai tuần", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Hai tuần sau, một khoản mua vượt hạn mức được thanh toán không qua trưởng phòng. Kế toán trưởng yêu cầu khôi phục bước ký và rà lại toàn bộ đơn của hai tuần.",
            ending: "bad",
          },
          s2: {
            text: "Sau hai tuần, nhóm thử duyệt trung bình 4 ngày thay vì 6. Bạn định báo cáo.",
            choices: [
              { label: "Báo 'giảm 33% từ 6 xuống 4 ngày, trên nhóm thử, số đơn còn ít' và đề nghị mở rộng thêm một nhóm", next: "good" },
              { label: "Báo 'quy trình mới nhanh hơn hẳn' rồi áp cho cả công ty ngay", next: "bad_over" },
            ],
          },
          bad_over: {
            text: "Nhóm thử chỉ có 9 đơn và ít đơn phức tạp. Khi áp cho cả công ty, nhiều đơn vẫn bị trả lại vì thiếu thông tin mới, số ngày không giảm như báo cáo.",
            ending: "bad",
          },
          good: {
            text: "Trưởng phòng đồng ý thử thêm một nhóm trong hai tuần nữa. Bạn ghi lại số ngày ở cả hai nhóm để so sánh.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một việc lặp lại, nhỏ và ít rủi ro.",
          "Bước 2 - Ghi các bước và số ngày chờ ở từng bước từ ba đơn gần nhất.",
          "Bước 3 - Nhờ AI chỉ chỗ nghẽn, rồi hỏi lý do trước khi bỏ bước nào.",
          "Bước 4 - Thử một thay đổi trên một nhóm nhỏ trong hai tuần.",
          "Bước 5 - So số ngày trước và sau; giữ, chỉnh hoặc bỏ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đo trước, đổi một thứ, đo sau: cải tiến nhỏ nhưng chắc.",
          "Bài cuối chặng: gom mọi mẫu đã dùng thành bộ làm việc lâu dài.",
        ],
      },
    ],
  },
  {
    id: 2159,
    slug: "bo-mau-lam-viec-ai-cho-nguoi-mua-hang-va-kho-van",
    title: "Chặng 37, Bài 20: Bộ mẫu làm việc với AI cho người mua hàng và kho vận",
    subtitle: "Như hộp dụng cụ của thợ: ít món, đúng chỗ, ai cũng mở ra dùng được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau cả chặng, bạn đã có mẫu thư đặt hàng, cách đọc báo giá, danh sách kiểm và quy tắc che dữ liệu, nhưng chúng nằm rải rác trong các cuộc trò chuyện cũ. Một tháng sau bạn khó tìm lại, và đồng nghiệp mới không biết dùng gì. Gom lại thành một bộ mẫu có tên, ngày cập nhật và người phụ trách giúp cách làm tốt của bạn sống lâu hơn một buổi làm việc.",
    openingQuestion:
      "Bạn đã dùng AI cho nhiều việc mua hàng và kho vận trong chặng này. Cách nào giúp những gì đã học được dùng lâu dài?",
    openingOptions: [
      "Gom mẫu yêu cầu, danh sách kiểm và quy tắc dữ liệu vào một bộ có tên và người phụ trách",
      "Giữ nguyên trong các cuộc trò chuyện cũ, khi cần thì cuộn lên tìm",
      "Nhờ AI nhớ giúp, lần sau nó sẽ tự biết bạn thích gì",
      "Chép hết mọi cuộc trò chuyện vào một tệp lớn để tìm bằng chữ",
    ],
    correctOption: 0,
    explanation:
      "Bộ mẫu có ba phần mà một người khác đọc vào là dùng được: mẫu yêu cầu có chỗ trống, danh sách kiểm sau khi nhận kết quả, và quy tắc dữ liệu về cái gì được dán, cái gì phải che. Cuộn tìm trong cuộc trò chuyện cũ tốn thời gian và không ai khác dùng được. AI không chắc nhớ giữa các lần dùng, nên đừng trông vào đó. Một tệp chứa mọi thứ thì khó tìm và lẫn cả dữ liệu không nên lưu.",
    diagram: [
      { label: "Nhặt mẫu yêu cầu, danh sách kiểm và quy tắc dữ liệu bạn đã dùng", arrow: true },
      { label: "Xoá dữ liệu thật, thay bằng chỗ trống và ví dụ bịa", arrow: true },
      { label: "Ghi tên, ngày cập nhật và người phụ trách cho từng mẫu", arrow: true },
      { label: "Thử với một đồng nghiệp, sửa chỗ họ vướng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhóm mua hàng và kho của một cửa hàng phân phối gom sáu mẫu vào một tài liệu: thư đặt hàng, thư hỏi báo giá, bảng đối chiếu ba chứng từ, thư báo giao trễ, danh sách kiểm kết quả AI và trang quy tắc che dữ liệu. Mỗi mẫu ghi người phụ trách. Một nhân viên mới dùng được mẫu thư đặt hàng ngay tuần đầu.",
    },
    quiz: [
      {
        question: "Bộ mẫu làm việc với AI dùng lâu dài nên gồm những phần nào?",
        options: [
          "Mẫu yêu cầu có chỗ trống, danh sách kiểm kết quả và quy tắc dữ liệu, kèm ai phụ trách",
          "Càng nhiều mẫu càng tốt, mỗi việc nhỏ một trang riêng",
          "Chỉ những câu lệnh hay nhất, không cần quy tắc",
          "Bản sao mọi cuộc trò chuyện với AI trong tháng",
        ],
        correct: 0,
        explanation:
          "Ba phần này tạo thành vòng làm việc đủ: giao việc, kiểm kết quả, giữ dữ liệu an toàn. Mẫu quá nhiều thì không ai nhớ dùng cái nào. Câu lệnh mà thiếu quy tắc dữ liệu dễ kéo người mới dán tài liệu nhạy cảm. Bản sao cuộc trò chuyện chứa dữ liệu thật nên không nên lưu tràn lan.",
      },
      {
        question: "Vì sao mỗi mẫu cần ghi ngày cập nhật và người phụ trách?",
        options: [
          "Để biết mẫu còn dùng được không và hỏi ai khi cần sửa",
          "Để có người bị trách khi AI trả lời sai, dù bạn làm đúng quy trình",
          "Để công cụ AI nhận ra bạn và nhớ mẫu, khỏi phải dán lại",
          "Để mẫu trông chuyên nghiệp hơn khi chia sẻ cho sếp",
        ],
        correct: 0,
        explanation:
          "Quy định, giá, cách làm đổi theo thời gian nên mẫu cũ có thể sai; ngày cập nhật cho biết độ mới, người phụ trách cho biết hỏi ai. Mục đích không phải quy lỗi. Công cụ AI không đọc ghi chú của bạn để nhớ. Vẻ chuyên nghiệp là hệ quả chứ không phải lý do.",
      },
      {
        question: "Đồng nghiệp mới dùng mẫu của bạn nhưng dán nguyên bảng giá riêng của khách vào AI. Bộ mẫu đang thiếu gì?",
        options: [
          "Quy tắc dữ liệu: dòng nào được dán, dòng nào phải che hoặc không dán",
          "Một mẫu yêu cầu thứ hai, vì một mẫu không đủ cho người mới dùng đủ mọi việc trong tuần",
          "Không thiếu gì, lỗi thuộc về đồng nghiệp mới",
          "Ví dụ đầu ra, để người mới thấy kết quả trông thế nào",
        ],
        correct: 0,
        explanation:
          "Người mới dán bảng giá vì không ai nói với họ cái gì không được dán; đó là khoảng trống của quy tắc dữ liệu. Thêm mẫu hay ví dụ đầu ra không ngăn được việc dán sai. Quy lỗi cho người mới bỏ qua chỗ bộ mẫu phải giúp họ.",
      },
      {
        question: "Một mẫu tốt sau ba tháng vẫn chưa ai dùng. Nên làm gì?",
        options: [
          "Hỏi người dùng vì sao, sửa hoặc bỏ mẫu, đừng để mẫu nằm chết trong kho",
          "Nhắc cả phòng dùng bằng được, vì đã mất công soạn thì phải dùng hết",
          "Giữ nguyên, mẫu hay thì cuối cùng cũng có người dùng",
          "Đổi tên mẫu cho hấp dẫn hơn rồi gửi lại cả nhóm",
        ],
        correct: 0,
        explanation:
          "Mẫu không ai dùng là tín hiệu: có thể khó tìm, không hợp việc thật, hoặc thiếu ví dụ. Hỏi người dùng cho biết nguyên nhân. Ép dùng vì đã mất công là thiên kiến chi phí đã bỏ. Chờ mãi hay đổi tên không giải quyết lý do gốc.",
      },
      {
        question: "Trong bộ mẫu, phần nào không nên giao cho AI tự quyết?",
        options: [
          "Con số đặt hàng, cam kết với khách và quyết định duyệt",
          "Lời chào đầu thư, vì lời chào mang cảm xúc của riêng người viết",
          "Tiêu đề thư, vì AI đặt tiêu đề rất dở",
          "Cách xưng hô, vì AI không biết vai vế trong công ty",
        ],
        correct: 0,
        explanation:
          "Con số, cam kết và quyết định duyệt ảnh hưởng tới tiền và lời hứa nên phải do người có trách nhiệm quyết. Lời chào, tiêu đề, cách xưng hô là phần chữ AI viết nháp nhanh và bạn sửa được bằng mắt; bạn chỉ cần dặn rõ vai vế trong mẫu.",
      },
    ],
    keyTakeaways: [
      "Bộ mẫu gồm ba phần: mẫu yêu cầu có chỗ trống, danh sách kiểm, quy tắc dữ liệu.",
      "Mỗi mẫu ghi tên, ngày cập nhật và người phụ trách.",
      "Xoá dữ liệu thật khỏi mẫu; dùng chỗ trống và ví dụ tự bịa.",
      "Thử với một đồng nghiệp mới và sửa chỗ họ vướng.",
      "Con số, cam kết và quyết định duyệt luôn là việc của người.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn lưu mẫu 'thư đặt hàng' vào bộ mẫu chung. Bản nào nên lưu?",
      options: [
        "Bản có chỗ trống {nha_cung_cap}, {so_luong}, {ngay_giao}, kèm một ví dụ bịa và ngày cập nhật",
        "Bản thư thật đã gửi cho một nhà cung cấp để mọi người bắt chước",
        "Chỉ lưu câu lệnh cho AI, không cần ví dụ hay chỗ trống",
        "Lưu cả cuộc trò chuyện với AI để thấy nó đã sửa những gì",
      ],
      correct: 0,
      explanation:
        "Chỗ trống kèm ví dụ bịa cho người khác dùng lại mà không lộ dữ liệu thật; ngày cập nhật cho biết độ mới. Thư thật chứa tên và số của một nhà cung cấp. Câu lệnh trần thiếu chỗ điền và ví dụ khiến người mới không biết điền gì. Cuộc trò chuyện đầy đủ chứa dữ liệu thật và dài để đọc.",
    },
    summary: {
      keyIdea: "Bộ mẫu nhỏ, có tên, có người phụ trách, không chứa dữ liệu thật, thử được với người mới.",
      formula: "Mẫu yêu cầu + danh sách kiểm + quy tắc dữ liệu = vòng làm việc dùng lại được.",
      commonMistake: "Lưu nguyên thư thật hay cuộc trò chuyện làm mẫu, kéo theo dữ liệu nhạy cảm.",
      action: "Gom ba mẫu bạn dùng nhiều nhất thành một tài liệu và cho một đồng nghiệp thử.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lại các cuộc trò chuyện AI và tệp ghi chú của chặng này, chọn ba việc bạn còn hay làm (ví dụ thư đặt hàng, bảng đối chiếu, thư báo giao trễ). Với mỗi việc viết một mẫu có chỗ trống thay cho dữ liệu thật, thêm một dòng danh sách kiểm sau khi nhận kết quả, ghi ngày cập nhật, và thêm một trang ngắn quy tắc dữ liệu: cái gì được dán, cái gì phải che.",
      secondary: "Gửi bộ mẫu cho một đồng nghiệp và hỏi họ vướng ở chỗ nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối chặng, việc quan trọng nhất là làm cho những gì bạn học được không biến mất khi cuộc trò chuyện đóng lại. Bài này gom mẫu yêu cầu, danh sách kiểm và quy tắc dữ liệu thành một bộ dùng lâu dài.",
      },
      {
        type: "feynman",
        title: "Bộ mẫu làm việc đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới hộp dụng cụ của một người thợ. Không phải cửa hàng dụng cụ: chỉ vài món hay dùng, cất đúng chỗ, dán nhãn, và người thợ mới mở ra là biết cái nào làm việc gì.",
        columns: ["Thành phần", "Hộp dụng cụ của thợ", "Bộ mẫu làm việc với AI"],
        rows: [
          ["Dụng cụ chính", "Búa, tua vít, thước", "Mẫu yêu cầu có chỗ trống"],
          ["Kiểm tra", "Thước thăng bằng kiểm lại mối lắp", "Danh sách kiểm kết quả AI"],
          ["An toàn", "Kính và găng tay", "Quy tắc dữ liệu: cái gì được dán"],
          ["Dán nhãn, giữ gọn", "Nhãn từng ngăn, bỏ đồ hỏng", "Tên, ngày cập nhật, người phụ trách"],
        ],
        oneLiner: "Vài món đúng chỗ, có nhãn và người giữ, thay vì cả cửa hàng dụng cụ.",
      },
      { type: "heading", text: "Vấn đề: cách làm tốt nằm trong đầu một người" },
      {
        type: "paragraph",
        text: "Bạn có cách viết thư đặt hàng ít bị hỏi lại, cách nhờ AI đối chiếu chứng từ, thói quen che tên khách. Những thứ này nằm trong đầu bạn và trong các cuộc trò chuyện cũ. Khi bạn nghỉ phép, đồng nghiệp làm lại từ đầu và có thể dán bảng giá thật vào AI. Bộ mẫu là nơi bạn đặt cách làm đó để người khác dùng, sửa và giữ cho mới.",
      },
      {
        type: "flow",
        title: "Từ thói quen cá nhân tới bộ mẫu dùng chung",
        steps: [
          { label: "Nhặt những việc lặp lại", detail: "Chọn ba đến năm việc bạn làm nhiều nhất: thư đặt hàng, hỏi báo giá, đối chiếu chứng từ, báo giao trễ." },
          { label: "Viết mẫu yêu cầu có chỗ trống", detail: "Thay tên, số và giá thật bằng {nha_cung_cap}, {so_luong}; thêm một ví dụ bịa để người mới thấy kết quả." },
          { label: "Thêm danh sách kiểm", detail: "Ba đến năm dòng sau khi nhận kết quả: đối chiếu số với bảng gốc, kiểm ngày, kiểm cam kết." },
          { label: "Viết quy tắc dữ liệu", detail: "Một trang ngắn: cái gì được dán, cái gì phải che bằng ký hiệu, cái gì không đưa ra ngoài và hỏi ai khi chưa chắc." },
          { label: "Ghi nhãn và thử", detail: "Mỗi mẫu có tên, ngày cập nhật, người phụ trách. Cho một đồng nghiệp thử và sửa chỗ họ vướng." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI biến một thư thật thành mẫu dùng chung",
        task: "Bạn có một thư đặt hàng tốt đã gửi cho một nhà cung cấp và muốn nhờ AI biến nó thành mẫu cho cả nhóm.",
        parts: [
          {
            id: "input",
            label: "Đầu vào",
            options: [
              { text: "Dán nguyên thư đã gửi, kèm tên nhà cung cấp, giá và số lượng thật.", feedback: "Dữ liệu thật ra ngoài công ty, và mẫu vẫn còn dính tên nhà cung cấp nên khó dùng cho nơi khác." },
              { text: "Dán thư đã thay tên nhà cung cấp bằng 'Bên A' và bỏ giá, số lượng thật.", good: true, feedback: "AI thấy được cấu trúc và giọng văn mà không thấy dữ liệu thật." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Làm cho thư này hay hơn.", feedback: "Không nói rõ mục tiêu nên AI viết lại cả nội dung, chỗ trống không xuất hiện." },
              { text: "Biến thành mẫu có chỗ trống {nha_cung_cap}, {ten_hang}, {so_luong}, {ngay_giao}, giữ nguyên giọng văn.", good: true, feedback: "Chỗ thay đổi rõ ràng, giọng của bạn được giữ, người khác điền được ngay." },
            ],
          },
          {
            id: "extra",
            label: "Phần đi kèm",
            options: [
              { text: "Không cần gì thêm, mẫu là đủ.", feedback: "Người mới có mẫu nhưng không có danh sách kiểm, không biết phải soát gì trước khi gửi." },
              { text: "Thêm ba dòng danh sách kiểm sau khi điền và một dòng nhắc: không tự thêm giá hay cam kết vào mẫu.", good: true, feedback: "Mẫu đi kèm cách kiểm, và ranh giới giữa phần chữ và phần số rõ ràng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "task", "extra"],
            text: "Mẫu thư đặt hàng\n\nChào {nha_cung_cap},\nChúng tôi đặt {so_luong} {ten_hang}, giao trước ngày {ngay_giao}. Vui lòng xác nhận đơn và thời gian giao.\n\nDanh sách kiểm sau khi điền:\n1. Tên hàng và số lượng khớp đơn đặt nội bộ.\n2. Ngày giao đúng với lịch kho.\n3. Không có giá hay cam kết nào ngoài phần bạn đã điền.\n\nLưu ý: không thêm giá hoặc điều khoản vào mẫu.",
          },
          {
            requires: ["task"],
            text: "Chào {nha_cung_cap},\nChúng tôi đặt {so_luong} {ten_hang}, giao trước ngày {ngay_giao}.\n\n(Mẫu đúng, nhưng thiếu danh sách kiểm nên người mới không biết soát gì trước khi gửi.)",
          },
          {
            text: "Kính gửi Công ty Minh Phát, chúng tôi trân trọng đặt 200 thùng giấy A4 giá 45.000 đồng mỗi ram, mong Quý công ty giao gấp và giảm giá thêm 5%...\n\n(Vẫn dính dữ liệu thật và AI tự thêm điều khoản giảm giá không ai duyệt.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bộ mẫu có nhãn và người phụ trách",
          text: "Người mới mở ra là dùng được. Biết mẫu mới hay cũ và hỏi ai khi cần sửa. Không chứa dữ liệu thật nên chia sẻ được. Quy tắc dữ liệu đi cùng mẫu.",
        },
        right: {
          label: "Thư và cuộc trò chuyện cũ rải rác",
          text: "Phải cuộn tìm và chỉ bạn nhớ cái nào tốt. Thư thật còn chứa tên và số. Đồng nghiệp làm lại từ đầu và có thể mắc lỗi bạn đã tránh.",
        },
      },
      {
        type: "callout",
        label: "Bộ mẫu là của người, không phải của AI",
        text: "Con số đặt hàng, cam kết với khách và quyết định duyệt luôn là việc của người. Điều gì liên quan tới hợp đồng, quy định dữ liệu hay giá, hỏi bộ phận pháp chế, kế toán trưởng hoặc người phụ trách hợp đồng trước khi đưa vào mẫu.",
      },
      {
        type: "scenario",
        title: "Chia sẻ bộ mẫu cho nhóm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã có ba mẫu. Sếp bảo tuần sau cả nhóm sẽ dùng. Mẫu thư đặt hàng của bạn còn dòng ví dụ lấy từ một thư thật gửi nhà cung cấp.",
            choices: [
              { label: "Gửi luôn cho cả nhóm, ví dụ thật giúp người mới hiểu nhanh", next: "bad_real" },
              { label: "Thay ví dụ bằng dữ liệu bịa, thêm ngày cập nhật và tên bạn là người phụ trách", next: "s2" },
            ],
          },
          bad_real: {
            text: "Ví dụ thật chứa tên nhà cung cấp và mức giá riêng. Một đồng nghiệp chép nguyên mẫu gửi cho nhà cung cấp khác, lộ giá của bên đầu tiên.",
            ending: "bad",
          },
          s2: {
            text: "Bộ mẫu đã sạch dữ liệu. Một đồng nghiệp mới thử và báo: mẫu bảng đối chiếu thiếu hướng dẫn dùng đơn vị thùng và cái.",
            choices: [
              { label: "Bảo họ tự tìm hiểu, mẫu của bạn đã đủ", next: "bad_ignore" },
              { label: "Thêm một dòng nhắc kiểm đơn vị vào danh sách kiểm và ghi ngày cập nhật mới", next: "good" },
            ],
          },
          bad_ignore: {
            text: "Nhiều người khác cũng vướng và tự xử theo cách riêng. Sau một tháng, mỗi người dùng một cách đối chiếu khác nhau và bộ mẫu không còn ai dùng.",
            ending: "bad",
          },
          good: {
            text: "Bộ mẫu được cập nhật và mọi người thấy ngày sửa mới nhất. Tuần sau đồng nghiệp thứ hai gửi thêm một dòng góp ý, và bộ mẫu tiếp tục được giữ mới.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn ba việc lặp lại bạn làm nhiều nhất trong chặng này.",
          "Bước 2 - Viết mẫu yêu cầu có chỗ trống và một ví dụ bịa.",
          "Bước 3 - Thêm danh sách kiểm và trang quy tắc dữ liệu.",
          "Bước 4 - Ghi tên, ngày cập nhật và người phụ trách.",
          "Bước 5 - Cho một đồng nghiệp thử rồi sửa chỗ họ vướng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ít mẫu, đúng chỗ, có nhãn: cách làm tốt của bạn sống lâu hơn một buổi làm việc.",
          "Bạn đã hoàn thành chặng logistics, kho vận và mua hàng.",
        ],
      },
    ],
  },
];
