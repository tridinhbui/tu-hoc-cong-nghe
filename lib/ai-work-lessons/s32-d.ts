import type { Lesson } from "../lesson-types";

// Chặng 32, bài 16-20. Giáo trình: scripts/curriculum/stage-32.json.
export const S32_D_LESSONS: Lesson[] = [
  {
    id: 2055,
    slug: "email-gui-nhieu-ben-moi-ben-mot-nhu-cau",
    title: "Chặng 32, Bài 16: Email gửi nhiều bên: mỗi bên cần thấy điều của riêng họ",
    subtitle: "Một tin dự án, ba người đọc: mỗi người tìm thấy ngay việc của mình ở dòng đầu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Dự án trễ năm ngày, và bạn phải báo cho anh kỹ thuật, chị kế toán và khách hàng. Gửi một email chung dài thì ai cũng phải lội tìm phần của mình, có người bỏ ngang, có người đọc phải chuyện không dành cho họ. Viết ba phiên bản từ cùng một bản tin gốc giúp mỗi người hành động đúng ngay lần đọc đầu.",
    openingQuestion:
      "Vật tư về muộn nên việc lắp đặt trễ 5 ngày. Bạn cần báo cho kỹ thuật, kế toán và khách. Cách nào hợp lý nhất?",
    openingOptions: [
      "Viết ba phiên bản từ cùng một bản tin gốc, mỗi bản nêu việc của bên đó",
      "Gửi một email chung ghi đủ mọi chi tiết để ai cũng đọc được tất cả trong một lần",
      "Nhờ AI viết một bản thật ngắn rồi gửi giống hệt cho cả ba bên",
      "Chỉ báo khách, còn kỹ thuật và kế toán sẽ nghe ngóng từ người khác",
    ],
    correctOption: 0,
    explanation:
      "Sự thật của dự án chỉ có một, nhưng điều mỗi người cần làm với sự thật đó thì khác nhau: kỹ thuật cần lịch mới để xếp người, kế toán cần biết khoản nào dời kỳ thanh toán, khách cần biết ngày nhận và điều họ phải chuẩn bị. Một email chung buộc ai cũng tự lọc phần của mình. Bản ngắn giống hệt cho cả ba thì thiếu việc cụ thể của từng bên. Báo mỗi khách thì hai bên còn lại biết tin muộn và bị động.",
    diagram: [
      { label: "Viết bản tin gốc: sự thật, ngày, việc còn dở", arrow: true },
      { label: "Với mỗi bên, hỏi: họ cần làm gì và lo điều gì", arrow: true },
      { label: "AI dựng ba phiên bản, chỉ dùng sự thật trong bản gốc", arrow: true },
      { label: "Bạn soát: mỗi bên chỉ thấy điều được phép thấy" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một điều phối viên công trình sửa nhà báo tin trễ lịch. Bản gửi thợ nêu ngày vào công trình mới và thứ tự việc. Bản gửi kế toán nêu khoản nào phải dời ngày thanh toán. Bản gửi gia chủ nêu ngày bàn giao mới và việc họ cần chốt trước thứ Sáu. Chi tiết mâu thuẫn nội bộ với nhà cung cấp chỉ nằm trong bản gốc của điều phối viên, không đi vào thư gửi gia chủ.",
    },
    quiz: [
      {
        question: "Vì sao một tin dự án nên có nhiều phiên bản cho nhiều bên?",
        options: [
          "Vì mỗi bên cần làm một việc khác, nên điều họ cần thấy đầu thư cũng khác",
          "Vì AI chỉ viết được thư ngắn nên phải chia nhỏ tin ra thành nhiều thư riêng cho từng người",
          "Vì gửi nhiều thư thì người nhận thấy được coi trọng hơn",
          "Vì thư chung thường bị máy chủ email chặn lại",
        ],
        correct: 0,
        explanation:
          "Người đọc mở thư để biết mình phải làm gì, nên điều đó phải nằm ở dòng đầu. AI không bị giới hạn ở thư ngắn, nên đây không phải lý do. Số lượng thư không làm ai thấy được coi trọng, chỉ có nội dung đúng việc mới làm được. Thư chung không bị chặn chỉ vì là thư chung.",
      },
      {
        question: "Bản tin gốc cho AI nên chứa gì để ba phiên bản không mâu thuẫn nhau?",
        options: [
          "Sự thật đã chốt, ngày mới, việc còn dở",
          "Bản nháp thư gửi khách, để AI đổi giọng cho hai bên còn lại",
          "Toàn bộ chuỗi email nội bộ, để AI tự chọn phần cần dùng cho từng bên",
          "Chỉ lý do trễ, vì ngày và việc cụ thể AI sẽ tự suy ra",
        ],
        correct: 0,
        explanation:
          "Cả ba phiên bản phải xuất phát từ cùng một bộ sự thật đã chốt thì mới không lệch nhau. Đưa bản nháp thư khách thì các bên khác nhận lại giọng và ưu tiên của khách. Đưa cả chuỗi nội bộ là mở đường cho chi tiết không nên chia sẻ lọt vào thư ngoài. Ngày và việc mà AI tự suy ra là số bịa, không phải sự thật đã chốt.",
      },
      {
        question: "Phiên bản gửi khách nên KHÔNG chứa điều gì?",
        options: [
          "Lời trách nhà cung cấp và chi tiết tranh cãi nội bộ chưa ngã ngũ",
          "Ngày bàn giao mới, để khách biết khi nào nhận việc",
          "Việc khách cần chốt trước một ngày cụ thể để kịp lịch mới",
          "Lời xin lỗi ngắn, thẳng thắn về sự chậm trễ này",
        ],
        correct: 0,
        explanation:
          "Khách cần ngày, việc của họ và lời xin lỗi gọn; chuyện đổ lỗi hay tranh cãi chưa xong chỉ làm khách mất tin vào cả đội. Ngày mới, việc cần chốt và lời xin lỗi đều là thứ khách thật sự cần đọc, nên bỏ chúng đi mới là sai. Nếu không chắc chi tiết nào nên nói, hỏi người phụ trách dự án.",
      },
      {
        question: "AI viết bản gửi kế toán có câu 'khoản thanh toán đợt 2 dời sang tháng sau'. Bản gốc của bạn chưa nói gì về thanh toán. Cách xử lý nào đúng?",
        options: [
          "Xoá câu đó, hoặc đánh dấu [chưa chốt] rồi hỏi người quyết định",
          "Giữ lại vì kế toán sẽ tự đối chiếu với hợp đồng khi cần",
          "Giữ lại nhưng thêm chữ 'dự kiến' để nghe nhẹ nhàng hơn",
          "Nhờ AI kiểm tra lại câu đó thêm một lần bằng cách hỏi lại nó có chắc câu này đúng không",
        ],
        correct: 0,
        explanation:
          "Câu không có trong bản gốc là AI tự thêm cho đủ ý; với kế toán, một khoản dời kỳ sai có thể kéo theo dòng tiền sai. Thêm chữ 'dự kiến' không làm câu có căn cứ. Hỏi lại AI chỉ cho câu trả lời trôi chảy khác, vì nó không có nguồn để đối chiếu; người chốt mới là nguồn.",
      },
      {
        question: "Trước khi gửi ba phiên bản, bước soát nào đáng làm nhất?",
        options: [
          "Đối chiếu ngày và số trong từng bản với bản tin gốc, và xem mỗi người nhận có lọt chi tiết không dành cho họ không",
          "Đọc kỹ bản gửi khách vì đây là bản quan trọng nhất, hai bản còn lại nội dung giống nhau nên không cần đọc lại từng chữ",
          "Nhờ AI chấm điểm độ lịch sự và độ rõ ràng của cả ba bản, rồi chọn bản điểm cao nhất để gửi cho cả ba bên",
          "Gửi khách trước để xem phản ứng, sau đó mới gửi hai bên còn lại vì họ ít cần biết tin này gấp hơn",
        ],
        correct: 0,
        explanation:
          "Lỗi hay gặp là một ngày lệch giữa các bản, hoặc chi tiết nội bộ nằm nhầm trong thư ngoài; chỉ đối chiếu với bản gốc mới bắt được. Ba bản khác nhau về nội dung, nên đọc một bản không đảm bảo hai bản kia. Điểm lịch sự không đo được độ chính xác. Gửi khách trước làm hai bên còn lại biết tin sau khách.",
      },
    ],
    keyTakeaways: [
      "Sự thật chỉ có một; cách nói và việc cần làm thì mỗi bên một khác.",
      "Viết bản tin gốc trước, rồi mới dựng các phiên bản từ nó.",
      "Mỗi bản mở bằng điều người đọc phải làm hoặc cần biết nhất.",
      "Chi tiết nội bộ chưa chốt không đi vào thư gửi ngoài.",
      "Soát bằng cách đối chiếu ngày và số với bản gốc.",
    ],
    practicePrompt: {
      question:
        "Chị Lan báo tin đổi lịch họp cho ba nhóm bằng một email dài chung. Kỹ thuật nói 'chị nên ghi rõ tôi phải chuẩn bị gì'. Điều chỉnh nào đúng nhất?",
      options: [
        "Tách thành các bản riêng, mỗi bản mở bằng việc của nhóm đó",
        "Rút gọn email chung xuống ba dòng cho ai cũng đọc kịp",
        "In đậm toàn bộ email chung để không ai bỏ sót điều quan trọng",
        "Gửi lại email chung mỗi ngày cho tới khi mọi người trả lời",
      ],
      correct: 0,
      explanation:
        "Vấn đề là mỗi nhóm phải tự tìm việc của mình trong một bản chung; tách bản và đưa việc của họ lên đầu giải quyết đúng chỗ đó. Rút gọn thì mất chi tiết cần cho từng nhóm. In đậm tất cả tức là không nhấn mạnh gì. Gửi lặp lại mỗi ngày làm người nhận bỏ qua thư.",
    },
    summary: {
      keyIdea: "Một sự thật, nhiều cách nói: mỗi bên đọc điều họ cần làm ngay ở dòng đầu.",
      formula: "Bản tin gốc + câu hỏi 'bên này cần làm gì?' + soát với bản gốc = các phiên bản không lệch nhau.",
      commonMistake: "Gửi một email dài chung và mong mỗi người tự tìm phần của mình.",
      action: "Lấy một tin bạn sắp báo cho nhiều bên và viết ra đầu thư của từng bên.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tin thật trong tuần này cần báo cho ít nhất hai bên (đổi lịch, thiếu người, đổi phạm vi). Viết bản tin gốc năm dòng. Nhờ AI dựng hai phiên bản, rồi gạch ra mỗi bản: dòng đầu là việc gì, và có chi tiết nào không nên đi tới bên đó không. Chưa cần gửi.",
      secondary: "Ghi lại câu nào AI tự thêm mà bản gốc không có, để lần sau dặn rõ hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Năm, bạn biết dự án sẽ trễ năm ngày. Ba người cần biết tin đó, và ba người sẽ làm ba việc khác nhau sau khi đọc. Bài này dạy cách viết một lần sự thật, rồi dựng ba bản đúng người nhận, với AI làm phần chữ và bạn giữ phần thật.",
      },
      {
        type: "feynman",
        title: "Email nhiều bên đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới bản tin thời tiết cho ba người: ngư dân quan tâm sóng và gió, bà con phơi lúa quan tâm có mưa hay không, khách du lịch quan tâm nắng để đi chơi. Trời chỉ có một, nhưng bản tin nói cho mỗi người phần họ cần. Email nhiều bên cũng vậy.",
        columns: ["Thành phần", "Bản tin thời tiết", "Email nhiều bên"],
        rows: [
          ["Sự thật chung", "Một trạng thái thời tiết", "Tin dự án đã chốt: ngày mới, lý do, việc còn dở"],
          ["Người đọc", "Ngư dân, nông dân, khách du lịch", "Kỹ thuật, kế toán, khách"],
          ["Điều nêu trước", "Điều ảnh hưởng tới việc của họ", "Việc họ phải làm hoặc quyết"],
          ["Điều không nói", "Chi tiết khí tượng họ không cần", "Chuyện nội bộ chưa chốt"],
        ],
        oneLiner: "Sự thật chỉ có một; mỗi người đọc cần được nói phần của họ trước.",
      },
      { type: "heading", text: "Vấn đề: một thư chung, ba người đọc lạc" },
      {
        type: "paragraph",
        text: "Thư chung dài buộc mỗi người tự tìm phần mình, và người bận sẽ chỉ đọc vài dòng đầu. Kỹ thuật cần biết ngày vào công trình mới. Kế toán cần biết khoản nào bị dời. Khách cần biết ngày nhận và điều họ phải chốt. Ba việc khác nhau này không nên chen chúc trong một đoạn.",
      },
      {
        type: "paragraph",
        text: "Có một điều nữa: có chuyện chỉ người trong đội nên biết, như việc nhà cung cấp làm chậm và hai bên đang cãi nhau. Nếu chuyện đó lọt vào thư gửi khách, khách đọc thấy một đội đang lục đục thay vì một kế hoạch mới.",
      },
      {
        type: "flow",
        title: "Từ một tin đến ba bản đúng người",
        steps: [
          { label: "Viết bản tin gốc", detail: "Năm dòng: chuyện gì xảy ra, ngày mới, lý do đã biết, việc còn dở, ai quyết điều gì. Đây là nguồn duy nhất của mọi bản sau." },
          { label: "Ghi điều mỗi bên cần", detail: "Với từng bên: họ cần làm gì, họ lo điều gì, họ không nên thấy điều gì. Chỉ bạn biết mối quan hệ này, AI thì không." },
          { label: "Nhờ AI dựng từng bản", detail: "Dặn rõ: chỉ dùng sự thật trong bản gốc; điều gì thiếu thì ghi [chưa chốt] chứ không tự thêm." },
          { label: "Soát với bản gốc", detail: "Đối chiếu từng ngày, từng số với bản gốc, và xem có chi tiết nội bộ nào nằm nhầm trong thư ngoài." },
          { label: "Gửi cùng một thời điểm", detail: "Ba bên biết tin gần như cùng lúc, để không ai nghe tin qua người khác trước khi nghe từ bạn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng bản tin gửi khách và kế toán",
        task: "Vật tư về muộn nên bàn giao trễ 5 ngày. Lắp prompt để AI dựng phiên bản gửi khách, đúng việc của khách, không lộ chuyện nội bộ.",
        parts: [
          {
            id: "facts",
            label: "Nguồn sự thật",
            options: [
              { text: "Dự án trễ, bạn viết thư báo giúp tôi và giải thích lý do cho hợp lý.", feedback: "Không đưa sự thật nào, AI sẽ tự bịa lý do và ngày; thư nghe hợp lý nhưng có thể sai." },
              { text: "Sự thật đã chốt: bàn giao mới 12/10, lý do là vật tư về muộn. Chỉ dùng những điều này; thiếu thì ghi [chưa chốt].", good: true, feedback: "Nguồn rõ và có lối thoát cho chỗ thiếu; AI không có cơ hội bịa ngày hay lý do." },
            ],
          },
          {
            id: "reader",
            label: "Người đọc",
            options: [
              { text: "Viết cho tất cả mọi người liên quan tới dự án.", feedback: "Không có người đọc cụ thể nên thư chung chung; khách phải tự tìm việc của mình." },
              { text: "Người đọc là khách hàng, chỉ cần biết ngày nhận mới và việc họ phải chốt trước 8/10; không nhắc chuyện tranh cãi với nhà cung cấp.", good: true, feedback: "Xác định việc của khách và điều không được nói; thư mở bằng ngày và việc cần làm." },
            ],
          },
          {
            id: "form",
            label: "Khuôn dạng",
            options: [
              { text: "Viết đủ chi tiết để khách hiểu toàn bộ diễn biến.", feedback: "Đủ chi tiết nghĩa là dài: khách phải lội qua chuyện không liên quan mới thấy ngày nhận." },
              { text: "Dưới 100 chữ, dòng đầu là ngày bàn giao mới, dòng thứ hai là việc khách cần chốt, kết bằng một lời xin lỗi ngắn.", good: true, feedback: "Khuôn dạng ép điều quan trọng lên đầu và giữ thư đủ ngắn để đọc trọn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "reader", "form"],
            text: "Chào anh/chị,\n\nNgày bàn giao mới là 12/10 (trễ 5 ngày so với kế hoạch). Anh/chị vui lòng chốt mẫu vật tư trước ngày 8/10 để chúng tôi kịp lắp đặt.\n\nChúng tôi xin lỗi vì sự chậm trễ này và sẽ báo ngay nếu lịch có thay đổi.",
          },
          {
            requires: ["facts"],
            text: "Chào anh/chị,\n\nDự án sẽ bàn giao ngày 12/10 vì vật tư về muộn. Nhà cung cấp làm việc thiếu chuyên nghiệp và chúng tôi đang làm việc lại với họ...\n\n(Ngày đúng nhưng AI đưa chuyện nội bộ và lời trách vào thư gửi khách.)",
          },
          {
            text: "Chào anh/chị,\n\nDo một số khó khăn khách quan, dự án có thể bàn giao chậm khoảng hai tuần và chúng tôi sẽ giảm 10% phí để bù đắp...\n\n(Ngày bị bịa, còn hứa giảm phí mà chưa ai quyết.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một bản riêng cho từng bên",
          text: "Mỗi người thấy việc của mình ngay dòng đầu. Chi tiết nội bộ nằm ngoài thư ngoài. Ngày và số khớp vì cùng đi ra từ một bản gốc. Bạn soát ba bản ngắn thay vì một bản dài.",
        },
        right: {
          label: "Một email chung cho tất cả",
          text: "Ai cũng phải tự tìm phần của mình. Chi tiết dành cho bên này dễ lọt tới bên kia. Người bận đọc dòng đầu rồi thôi, nên việc quan trọng của họ nằm ở đoạn ba thì bị bỏ qua.",
        },
      },
      {
        type: "callout",
        label: "Cẩn thận với người nhận và dữ liệu",
        text: "Trước khi bấm gửi, kiểm tra từng người trong ô nhận và ô đồng gửi. Đừng dán bản tin gốc chứa thông tin nội bộ hoặc dữ liệu khách vào công cụ AI chưa được công ty duyệt. Nếu có điều khoản hay cam kết tiền bạc trong thư, hỏi người phụ trách hoặc bộ phận pháp chế trước khi gửi.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Năm, tin trễ 5 ngày",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản tin gốc năm dòng và AI đã dựng hai phiên bản: một cho khách, một cho kế toán. Bạn đọc bản gửi khách và thấy một câu: 'Nhà cung cấp X đã làm sai đơn hàng của chúng tôi'.",
            choices: [
              { label: "Giữ câu đó, vì nó cho khách thấy lỗi không phải của mình", next: "bad_blame" },
              { label: "Xoá câu đó, vì bản gốc chưa xác nhận lỗi của ai và khách không cần nghe chuyện này", next: "s2" },
            ],
          },
          bad_blame: {
            text: "Khách chuyển tiếp thư cho nhà cung cấp X, người mà bạn còn cần trong bốn tuần nữa. X phản ứng gay gắt và việc giao vật tư còn bị chậm thêm.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đối chiếu ngày trong hai bản với bản gốc. Bản kế toán ghi 'bàn giao 17/10', bản khách ghi '12/10'.",
            choices: [
              { label: "Gửi cả hai, vì kế toán quan tâm tiền chứ không quan tâm ngày", next: "bad_date" },
              { label: "Sửa cho khớp bản gốc là 12/10, rồi soát lại các ngày còn lại", next: "s3" },
            ],
          },
          bad_date: {
            text: "Kế toán xếp lịch thanh toán theo 17/10. Khách cầm thư ghi 12/10 và hỏi lý do ba ngày lệch; hai bên phải gọi nhau để đối chiếu, mất cả buổi chiều.",
            ending: "bad",
          },
          s3: {
            text: "Ba bản đã khớp ngày. Còn ô người nhận: bạn thấy một người bên khách thuộc một phòng không liên quan.",
            choices: [
              { label: "Bỏ người đó khỏi ô nhận và gửi cả hai thư cùng lúc", next: "good" },
              { label: "Giữ nguyên vì thêm người đọc thì cũng không sao", next: "bad_cc" },
            ],
          },
          bad_cc: {
            text: "Người đó đọc tin trễ hạn và chuyển thư khắp phòng của họ, khiến khách nhận ba cuộc gọi hỏi cùng một chuyện trong ngày hôm sau.",
            ending: "bad",
          },
          good: {
            text: "Kỹ thuật, kế toán và khách nhận tin gần như cùng lúc, mỗi người thấy việc của mình ở dòng đầu. Không ai phải hỏi lại ngày.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết bản tin gốc năm dòng: sự thật đã chốt, ngày, việc còn dở.",
          "Bước 2 - Ghi cho mỗi bên: họ cần làm gì và không nên thấy gì.",
          "Bước 3 - Nhờ AI dựng từng bản, cấm thêm ngày hay lý do ngoài bản gốc.",
          "Bước 4 - Đối chiếu ngày và số, kiểm tra ô người nhận, rồi gửi cùng lúc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Sự thật do bạn giữ, cách nói do AI giúp, việc của từng người ở dòng đầu.",
          "Bài sau: họp với bên ngoài khi hai bên không nói cùng một thứ tiếng chuyên môn.",
        ],
      },
    ],
  },
  {
    id: 2056,
    slug: "hop-voi-ben-ngoai-khong-cung-mot-ngon-ngu",
    title: "Chặng 32, Bài 17: Họp với bên ngoài không cùng ngôn ngữ chuyên môn",
    subtitle: "Nhà thầu nói tiếng của họ, bạn hỏi lại cho tới khi ra việc, ngày và người làm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗣️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhà thầu nói 'hạng mục này phải chờ nghiệm thu giai đoạn trước', và bạn gật đầu cho khỏi mất mặt. Ba ngày sau bạn không biết việc nào đang chờ, chờ ai, tới bao giờ. Bạn không cần hiểu hết thuật ngữ, bạn cần dịch được nó sang việc, ngày và người, và ghi lại điều hai bên đã hiểu.",
    openingQuestion:
      "Trong cuộc họp, nhà thầu nói một câu đầy thuật ngữ và bạn không hiểu hết. Điều nào nên làm ngay lúc đó?",
    openingOptions: [
      "Hỏi lại: việc cụ thể là gì, ai làm, xong ngày nào, rồi nhắc lại bằng lời của bạn",
      "Gật đầu cho cuộc họp đỡ mất thời gian, về nhờ AI giải thích sau",
      "Nói 'tôi hiểu rồi' để nhà thầu thấy bạn cũng am hiểu chuyên môn",
      "Bảo họ gửi tài liệu kỹ thuật đầy đủ rồi tự đọc để hiểu",
    ],
    correctOption: 0,
    explanation:
      "Điều bạn cần lấy khỏi cuộc họp là việc, ngày và người, không phải thuật ngữ. Hỏi lại ngay lúc đó là lúc rẻ nhất, vì người nói còn ở đó để sửa nếu bạn hiểu sai. Gật đầu rồi hỏi AI sau thì AI không biết nhà thầu định nói gì. Nói 'tôi hiểu rồi' khiến bạn mất đúng cơ hội hỏi. Xin tài liệu kỹ thuật có thể đưa thêm thuật ngữ mà vẫn không cho bạn biết ai làm gì và khi nào.",
    diagram: [
      { label: "Nghe thuật ngữ, ghi lại nguyên văn", arrow: true },
      { label: "Hỏi: việc gì, ai làm, xong ngày nào, chờ cái gì", arrow: true },
      { label: "Nhắc lại bằng lời của bạn để họ xác nhận", arrow: true },
      { label: "Gửi ghi chú xác nhận trong ngày, nhờ AI gọt câu chữ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chủ tiệm mở thêm cửa hàng làm việc với nhà thầu điện nước. Nhà thầu nói 'đi âm ống trước khi trát'. Chủ tiệm hỏi: 'Nghĩa là tuần này thợ làm gì, tuần sau làm gì, và tôi phải chọn gì trước thứ Tư?' Nhà thầu trả lời cụ thể, chủ tiệm gửi lại ba dòng ghi chú ngay chiều đó và nhà thầu trả lời 'đúng rồi'. Từ đó cả hai cùng nhìn một danh sách việc thay vì mỗi người một cách hiểu.",
    },
    quiz: [
      {
        question: "Mục tiêu chính của bạn khi làm việc với bên ngoài nói nhiều thuật ngữ là gì?",
        options: [
          "Dịch điều họ nói sang việc, ngày và người chịu trách nhiệm",
          "Học thuộc thuật ngữ của ngành để lần sau họ không phải giải thích lại nữa",
          "Cho họ thấy mình cũng am hiểu chuyên môn để họ nể mặt và nói ít thuật ngữ hơn",
          "Ghi hết thuật ngữ vào biên bản để không ai chối được điều đã nói",
        ],
        correct: 0,
        explanation:
          "Việc, ngày và người là thứ bạn theo dõi và quyết định được. Học thuộc thuật ngữ mất thời gian mà chưa chắc dùng. Cố tỏ ra am hiểu làm bạn mất cơ hội hỏi. Ghi thuật ngữ vào biên bản mà không kèm việc cụ thể thì hai bên vẫn hiểu khác nhau.",
      },
      {
        question: "Cách hỏi nào lấy được thông tin có ích nhất từ một câu đầy thuật ngữ?",
        options: [
          "Cho tôi hỏi lại: tuần này ai làm gì và xong ngày nào?",
          "Anh có thể giải thích rõ hơn về thuật ngữ đó không?",
          "Điều đó có phải là mọi thứ vẫn ổn không anh?",
          "Sao anh không nói đơn giản hơn cho mọi người dễ hiểu?",
        ],
        correct: 0,
        explanation:
          "Câu hỏi có sẵn ba chỗ điền: ai, việc gì, ngày nào, nên người trả lời khó nói mơ hồ. Xin giải thích thuật ngữ cho bạn thêm một khái niệm nhưng chưa có việc. Hỏi 'mọi thứ ổn không' chỉ nhận về chữ 'ổn'. Câu cuối nghe như trách và làm người kia phòng thủ.",
      },
      {
        question: "Sau cuộc họp, điều nào biến 'điều tôi hiểu' thành 'điều hai bên đã thống nhất'?",
        options: [
          "Gửi ghi chú ngắn nêu việc, ngày, người và nhờ họ trả lời 'đúng' hoặc sửa",
          "Ghi âm cuộc họp và giữ file phòng khi có tranh cãi sau này",
          "Nhờ AI viết lại toàn bộ cuộc họp thành một biên bản đẹp",
          "Đợi tới cuộc họp sau để hỏi họ xem việc nào đã làm xong",
        ],
        correct: 0,
        explanation:
          "Chỉ khi bên kia trả lời đúng hoặc sửa thì hiểu biết mới thành chung. Ghi âm giúp nghe lại nhưng không cho bạn biết họ hiểu giống bạn hay không, và có thể cần xin phép người tham gia. AI viết lại thì chỉ tạo văn bản đẹp từ ghi chú của bạn, chưa có xác nhận của họ. Chờ cuộc họp sau thì sai lệch đã chạy thêm cả tuần.",
      },
      {
        question: "Bạn nhờ AI đoán nghĩa một thuật ngữ nhà thầu nói. Cách dùng nào an toàn?",
        options: [
          "Xem như gợi ý để có câu hỏi cho nhà thầu, không xem là câu trả lời",
          "Tin hoàn toàn vào giải thích của AI vì nó đã đọc rất nhiều tài liệu về mọi thuật ngữ trong ngành",
          "Dùng giải thích của AI làm căn cứ để từ chối yêu cầu của họ",
          "Dán cả bản báo giá của nhà thầu vào AI công cộng để nó dịch",
        ],
        correct: 0,
        explanation:
          "Thuật ngữ mỗi nơi có thể dùng khác nhau, nên AI chỉ giúp bạn biết nên hỏi gì; nghĩa đúng trong dự án của bạn do nhà thầu xác nhận. Tin AI hoàn toàn là dùng một giải thích chung cho một tình huống riêng. Từ chối yêu cầu dựa trên giải thích đó có thể sai. Báo giá là dữ liệu kinh doanh, chỉ dán vào công cụ đã được duyệt.",
      },
      {
        question: "Nhà thầu nói 'khoảng hai tuần nữa thì xong'. Bạn nên ghi gì vào ghi chú xác nhận?",
        options: [
          "Xong ngày cụ thể nào, tính từ khi nào, và điều gì làm ngày đó dịch chuyển",
          "Hai tuần nữa xong, đúng như anh nói trong cuộc họp hôm nay, vì đó là cam kết của nhà thầu",
          "Tuần sau nhà thầu sẽ báo lại ngày xong rõ hơn cho chúng ta",
          "Ghi nguyên văn 'khoảng hai tuần', vì đó là điều họ đã cam kết",
        ],
        correct: 0,
        explanation:
          "'Khoảng hai tuần' không có mốc bắt đầu, không có điều kiện; ghi ngày cụ thể và điều có thể làm nó lệch mới cho bạn cái để theo dõi. Ghi lại y nguyên thì mơ hồ vẫn còn đó. Hẹn báo lại tuần sau chỉ dời câu hỏi. Và 'khoảng' không phải là cam kết, nên nói nó là cam kết là sai.",
      },
    ],
    keyTakeaways: [
      "Bạn cần việc, ngày và người, không cần thuộc thuật ngữ.",
      "Hỏi lại ngay lúc họp, khi người nói còn ở đó để sửa.",
      "Nhắc lại bằng lời của bạn để họ xác nhận hoặc sửa.",
      "Gửi ghi chú xác nhận trong ngày; im lặng chưa phải đồng ý.",
      "AI giúp nghĩ câu hỏi, còn nghĩa đúng do bên kia xác nhận.",
    ],
    practicePrompt: {
      question:
        "Sau họp, chị Mai gửi ghi chú cho nhà thầu: 'Hạng mục A sẽ xong sớm, thợ vào tuần tới'. Điều gì còn thiếu để ghi chú này dùng được?",
      options: [
        "Ngày xong cụ thể, tên người làm và điều bạn cần chuẩn bị",
        "Thêm lời cảm ơn và một câu chúc để thư nghe thân thiện hơn",
        "Đính kèm bản ghi âm cả cuộc họp để nhà thầu nghe lại từ đầu",
        "Gửi thêm cho tất cả nhân viên công ty để mọi người cùng biết",
      ],
      correct: 0,
      explanation:
        "'Sớm' và 'tuần tới' là hai chỗ mơ hồ; nhà thầu có thể hiểu khác chị Mai. Ghi ngày, người và việc chị cần làm mới biến nó thành thứ theo dõi được. Lời chúc không làm ghi chú rõ hơn. Bản ghi âm dài buộc người ta nghe lại thay vì đọc ba dòng. Gửi cho cả công ty làm nhiều người nhận thứ không dành cho họ.",
    },
    summary: {
      keyIdea: "Bạn không cần hiểu thuật ngữ; bạn cần ra khỏi họp với việc, ngày, người và một lời xác nhận.",
      formula: "Thuật ngữ + 'ai làm gì, xong ngày nào?' + nhắc lại + ghi chú xác nhận = hai bên cùng một cách hiểu.",
      commonMistake: "Gật đầu trong họp, rồi mới phát hiện ba ngày sau là mỗi bên hiểu một khác.",
      action: "Trong cuộc họp bên ngoài tiếp theo, hỏi ít nhất một lần: 'ai làm gì, xong ngày nào?'",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một cuộc họp gần đây với người ngoài mà bạn còn chỗ chưa rõ. Viết ra ba câu họ đã nói, rồi dịch mỗi câu thành: việc gì, ai làm, xong ngày nào, còn thiếu gì. Chỗ nào bạn không dịch được thì viết thành câu hỏi. Nhờ AI gọt lời câu hỏi cho lịch sự, sau đó gửi cho họ nếu bạn thấy phù hợp.",
      secondary: "Ghi lại thuật ngữ nào bạn phải hỏi nhiều nhất để lần sau hỏi trước ở đầu họp.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn ngồi họp với nhà thầu, nhà cung cấp hay đối tác kỹ thuật, và họ nói một thứ tiếng mà bạn chỉ nghe được một nửa. Bài này không dạy bạn thuộc thuật ngữ, mà dạy bạn dịch nó thành việc, ngày và người, rồi ghi lại điều hai bên đã hiểu.",
      },
      {
        type: "feynman",
        title: "Họp với bên ngoài đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới lúc thợ sửa xe nói 'bạc đạn đã rơ, phải thay cùng bộ láp'. Bạn không cần biết bạc đạn là gì, bạn chỉ cần hỏi: mất bao lâu, tốn thêm gì, và tôi phải làm gì trong lúc đó. Họp với bên ngoài cũng vậy.",
        columns: ["Thành phần", "Sửa xe", "Họp với bên ngoài"],
        rows: [
          ["Thuật ngữ", "Bạc đạn, láp", "Nghiệm thu giai đoạn, đi âm ống, phụ thuộc hạng mục"],
          ["Điều bạn cần", "Bao lâu, tốn bao nhiêu, tôi làm gì", "Việc gì, ai làm, xong ngày nào, chờ cái gì"],
          ["Cách kiểm tra", "Nhắc lại: 'vậy chiều thứ Năm tôi lấy xe?'", "Nhắc lại bằng lời của bạn để họ xác nhận"],
          ["Bằng chứng", "Phiếu sửa xe ghi việc và ngày", "Ghi chú xác nhận gửi trong ngày"],
        ],
        oneLiner: "Không cần hiểu ngôn ngữ của họ, chỉ cần dịch ra việc, ngày và người rồi hỏi lại cho tới khi khớp.",
      },
      { type: "heading", text: "Vấn đề: gật đầu trong họp, hiểu khác nhau sau họp" },
      {
        type: "paragraph",
        text: "Khi người kia nói thuật ngữ, có hai áp lực đẩy bạn im lặng: sợ mất mặt và sợ mất thời gian. Nhưng cái giá thật xuất hiện sau đó: bạn không biết việc nào đang chờ, chờ ai và chờ tới bao giờ. Người bên kia cũng tưởng bạn đã hiểu và đồng ý.",
      },
      {
        type: "paragraph",
        text: "Cách thoát là ba câu hỏi nhỏ, nói đi nói lại trong họp: việc cụ thể là gì, ai làm, xong ngày nào. Câu thứ tư, khi cần: việc này chờ điều gì khác. Người chuyên môn thường vui khi được hỏi đúng, vì nó giúp họ khỏi bị hiểu nhầm.",
      },
      {
        type: "flow",
        title: "Từ thuật ngữ đến ghi chú hai bên cùng đồng ý",
        steps: [
          { label: "Ghi lại nguyên văn câu khó", detail: "Chép chính xác cụm từ họ dùng, đừng cố đoán nghĩa khi ghi. Sau họp bạn sẽ cần chính từ đó để hỏi lại." },
          { label: "Hỏi ba câu", detail: "Việc cụ thể là gì? Ai làm? Xong ngày nào? Thêm khi cần: việc này chờ điều gì khác?" },
          { label: "Nhắc lại bằng lời của bạn", detail: "'Vậy là tuần này thợ làm A, tuần sau làm B, và tôi chọn xong mẫu trước thứ Tư, đúng không?' Nếu họ sửa, bạn vừa tránh được một hiểu nhầm." },
          { label: "Gửi ghi chú ngắn trong ngày", detail: "Ba bốn dòng: việc, ngày, người, điều bạn phải làm. Nhờ họ trả lời 'đúng' hoặc sửa. AI có thể giúp gọt câu chữ, nội dung vẫn là của cuộc họp." },
          { label: "Theo dõi theo ghi chú", detail: "Cuộc họp sau bắt đầu bằng ghi chú này: việc nào đã xong, việc nào lệch." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi lại ngay, ghi chú xác nhận",
          text: "Hiểu nhầm lộ ra khi còn rẻ để sửa. Có một danh sách việc, ngày và người chung cho hai bên. Cuộc họp sau bắt đầu từ chỗ đã thống nhất, không phải từ trí nhớ mỗi người.",
        },
        right: {
          label: "Gật đầu, về tự hiểu",
          text: "Mỗi bên nhớ một khác và chỉ phát hiện khi việc đã chậm. Bạn không có gì để chỉ ra khi có tranh cãi. Bên kia tưởng bạn đã đồng ý với điều bạn chưa hiểu.",
        },
      },
      {
        type: "callout",
        label: "AI giúp nghĩ câu hỏi, không thay nhà thầu trả lời",
        text: "Bạn có thể nhờ AI gợi ý câu hỏi từ một cụm thuật ngữ, hoặc gọt ghi chú xác nhận cho lịch sự. Nhưng nghĩa của thuật ngữ trong dự án của bạn, ngày và cam kết là của bên kia xác nhận. Đừng dán báo giá hay hợp đồng vào công cụ chưa được duyệt, và điều liên quan tới điều khoản, hỏi bộ phận pháp chế.",
      },
      {
        type: "scenario",
        title: "Họp với nhà thầu: 'chờ nghiệm thu giai đoạn trước'",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhà thầu nói: 'Hạng mục hoàn thiện phải chờ nghiệm thu giai đoạn trước rồi mới đi tiếp.' Mọi người gật đầu. Bạn không chắc mình hiểu.",
            choices: [
              { label: "Gật đầu, để khỏi làm chậm cuộc họp", next: "bad_nod" },
              { label: "Hỏi: 'Nghĩa là việc nào đang chờ, ai nghiệm thu, và dự kiến ngày nào?'", next: "s2" },
            ],
          },
          bad_nod: {
            text: "Ba ngày sau bạn nhận được tin thợ hoàn thiện chưa vào. Bạn không biết ai nghiệm thu, chờ ai, và đã hứa với khách ngày bàn giao cũ.",
            ending: "bad",
          },
          s2: {
            text: "Nhà thầu đáp: 'Tổ điện phải được bên tư vấn kiểm tra, thường vào thứ Năm tuần sau, xong mới trát được.' Bạn thấy khá rõ rồi.",
            choices: [
              { label: "Ghi trong đầu, đợi tới họp sau", next: "bad_memory" },
              { label: "Nhắc lại: 'Vậy thứ Năm tuần sau bên tư vấn kiểm điện, sau đó mới trát, đúng không?'", next: "s3" },
            ],
          },
          bad_memory: {
            text: "Tuần sau bạn nhớ là 'thứ Sáu', còn nhà thầu nhớ là 'thứ Năm'. Bạn hẹn khách theo thứ Sáu và phải xin lỗi vì lệch một ngày.",
            ending: "bad",
          },
          s3: {
            text: "Nhà thầu sửa: 'Kiểm tra điện thứ Năm, nhưng trát thì phải chờ thêm hai ngày cho khô.' Bạn vừa tránh được một hiểu nhầm.",
            choices: [
              { label: "Gửi ghi chú ba dòng trong chiều nay và nhờ họ trả lời 'đúng'", next: "good" },
              { label: "Không gửi, vì họ đã sửa ngay trong họp rồi", next: "bad_nonote" },
            ],
          },
          bad_nonote: {
            text: "Một tuần sau, một người khác của nhà thầu nói 'trát xong thứ Sáu' vì không ai ghi lại điều đã thống nhất. Lịch của bạn lại lệch.",
            ending: "bad",
          },
          good: {
            text: "Nhà thầu trả lời 'đúng' trong nửa giờ. Bạn có một dòng thời gian mà cả hai bên cùng nhìn, và hẹn khách đúng ngày.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Trong họp - ghi nguyên văn cụm khó, hỏi: việc gì, ai làm, xong ngày nào.",
          "Trong họp - nhắc lại bằng lời của bạn và chờ họ xác nhận hoặc sửa.",
          "Sau họp - gửi ghi chú ba bốn dòng trong ngày, nhờ trả lời 'đúng'.",
          "Nhờ AI gợi ý câu hỏi hoặc gọt câu chữ, không nhờ nó quyết nghĩa thuật ngữ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Không cần hiểu hết thuật ngữ: cần việc, ngày, người và một lời xác nhận.",
          "Bài sau: báo cáo tuần cho sếp, viết điều cần quyết trước điều đã làm.",
        ],
      },
    ],
  },
  {
    id: 2057,
    slug: "bao-cao-tuan-cho-sep-viet-dieu-can-quyet",
    title: "Chặng 32, Bài 18: Báo cáo tuần cho sếp: viết điều cần quyết trước điều đã làm",
    subtitle: "Sếp đọc hai dòng đầu. Hai dòng đó nên là điều sếp cần quyết, không phải danh sách việc bạn đã làm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn viết báo cáo tuần rất kỹ, liệt kê hai mươi việc đã làm, và sếp chỉ đọc hai dòng đầu rồi đóng thư. Điều bạn cần sếp quyết nằm ở dòng mười tám. Đảo thứ tự để quyết định lên trên cùng khiến báo cáo được đọc đúng chỗ, và việc chờ sếp không bị kẹt cả tuần.",
    openingQuestion:
      "Sếp thường chỉ đọc hai dòng đầu báo cáo tuần. Bạn có một việc cần sếp duyệt trước thứ Tư. Nên đặt nó ở đâu?",
    openingOptions: [
      "Dòng đầu: điều cần sếp quyết, hạn quyết và phương án bạn đề xuất",
      "Cuối báo cáo, sau khi đã kể đủ mọi việc đã làm trong tuần",
      "Giữa báo cáo, để sếp đọc đủ bối cảnh rồi mới tới điều cần quyết",
      "Trong một email riêng gửi vào cuối ngày thứ Sáu cho đỡ làm phiền",
    ],
    correctOption: 0,
    explanation:
      "Báo cáo tuần có hai việc khác nhau: cho sếp biết tình hình, và xin sếp quyết điều gì đó. Việc thứ hai làm dự án chạy tiếp hay đứng lại, nên nó phải nằm chỗ sếp chắc chắn đọc tới. Để ở cuối hay giữa thì sếp có thể không đọc tới nơi. Gửi riêng vào thứ Sáu là quá muộn cho hạn thứ Tư, và tách khỏi báo cáo thì sếp không thấy nó nằm trong bức tranh chung.",
    diagram: [
      { label: "Dòng đầu: điều cần sếp quyết và hạn quyết", arrow: true },
      { label: "Tình trạng chung và rủi ro chính, vài dòng", arrow: true },
      { label: "Việc đã xong và việc tuần tới, dạng ngắn", arrow: true },
      { label: "Chi tiết ở phần đính kèm cho ai muốn đọc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm vận hành viết báo cáo tuần cho giám đốc. Bản cũ mở bằng 'Tuần này nhóm hoàn thành 14 việc'. Bản mới mở bằng 'Cần anh duyệt thêm một người làm thời vụ trước thứ Tư, nếu không đợt hàng ngày 15 sẽ trễ; đề xuất: duyệt.' Giám đốc trả lời trong một tiếng, còn ở bản cũ những yêu cầu như vậy thường nằm im tới cuối tuần.",
    },
    quiz: [
      {
        question: "Vì sao nên đặt điều cần quyết lên dòng đầu báo cáo tuần?",
        options: [
          "Việc chờ sếp quyết làm dự án đứng, và dòng đầu là chỗ chắc chắn được đọc",
          "Vì sếp thường thích báo cáo ngắn và ít chữ hơn so với bản cũ",
          "Vì như vậy phần việc đã làm không bị đọc và không bị hỏi tới",
          "Vì AI luôn viết dòng đầu hay hơn các dòng ở phía sau",
        ],
        correct: 0,
        explanation:
          "Lý do là quyết định, không phải độ dài: điều chờ sếp là điều duy nhất bạn không tự làm được. Báo cáo ngắn hay dài không phải mục tiêu. Đặt lên trên không nhằm giấu việc đã làm, mà để việc quan trọng nhất được thấy trước. Và AI không viết dòng đầu hay hơn theo vị trí, chỉ theo nội dung bạn đưa.",
      },
      {
        question: "Cách viết dòng đầu nào sếp dễ trả lời 'được' hoặc 'không' nhất?",
        options: [
          "Xin duyệt thêm 1 người thời vụ trước thứ Tư; nếu không, đợt hàng ngày 15 trễ 3 ngày",
          "Có một số vấn đề về nhân sự cần anh xem xét khi có thời gian",
          "Nhóm đang thiếu người; mong anh quan tâm và hỗ trợ giúp nhóm",
          "Tuần này nhóm khá bận nhưng đã cố gắng hoàn thành nhiều việc quan trọng, mong anh thông cảm cho các chậm trễ",
        ],
        correct: 0,
        explanation:
          "Câu đầu có bốn thứ sếp cần: xin gì, hạn nào, không làm thì sao. Câu 'xem xét khi có thời gian' không nói hạn và không xin gì cụ thể. Câu 'mong anh quan tâm' là lời than, còn câu cuối là kể lể; cả hai đều không cho sếp cái gì để trả lời có hoặc không.",
      },
      {
        question: "AI viết trong bản nháp: 'Khách đã đồng ý gia hạn thêm một tuần.' Ghi chú của bạn không có điều này. Nên làm gì?",
        options: [
          "Xoá hoặc thay bằng điều bạn thật sự có bằng chứng",
          "Giữ lại, vì AI thường đúng ở những câu ngắn kiểu này",
          "Giữ lại nhưng chuyển sang giọng 'có thể khách sẽ đồng ý'",
          "Hỏi lại AI xem nó có chắc không rồi tin theo câu trả lời",
        ],
        correct: 0,
        explanation:
          "Một câu không có trong ghi chú là AI tự thêm cho báo cáo trọn ý; đưa lên sếp thì sếp sẽ ra quyết định dựa trên điều chưa xảy ra. Độ ngắn của câu không liên quan tới độ đúng. Đổi giọng thành 'có thể' vẫn là điều bạn không có. Và hỏi lại AI chỉ ra thêm một câu trả lời trôi chảy khác, không phải bằng chứng.",
      },
      {
        question: "Bạn có thể dùng dữ liệu nào để cho sếp thấy tình hình mà không cần liệt kê từng việc?",
        options: [
          "Số việc theo trạng thái (xong, đang làm, bị chặn) so với tuần trước",
          "Một danh sách đầy đủ mọi việc đã làm trong tuần theo thứ tự thời gian",
          "Đoạn văn kể lại diễn biến từng ngày để sếp hình dung được không khí",
          "Ảnh chụp màn hình toàn bộ bảng công việc gửi kèm không chú thích",
        ],
        correct: 0,
        explanation:
          "Con số theo trạng thái cho thấy xu hướng: tuần này việc bị chặn tăng hay giảm. Danh sách đầy đủ theo thời gian buộc sếp tự tính xu hướng. Kể diễn biến từng ngày thì dài và che mất điều chính. Ảnh chụp không chú thích để sếp tự đoán chỗ nào quan trọng.",
      },
      {
        question: "Sếp hỏi lại 'vậy số việc bị chặn là bao nhiêu?', và bạn không nhớ. Điều nào nên là bài học cho báo cáo sau?",
        options: [
          "Luôn để một con số cố định theo trạng thái ở mỗi báo cáo, lấy từ bảng công việc",
          "Nhờ AI ước lượng con số dựa trên báo cáo các tuần trước",
          "Viết thật nhiều số để lần sau sếp không hỏi thêm nữa",
          "Không đưa số nào vào báo cáo để tránh bị hỏi mà không trả lời được",
        ],
        correct: 0,
        explanation:
          "Một bộ số cố định lấy từ bảng công việc mỗi tuần giúp sếp so sánh và giúp bạn không phải nhớ. AI chỉ ước lượng số, không đếm được việc trong bảng của bạn. Nhiều số không làm rõ điều nào quan trọng. Và bỏ số đi thì báo cáo còn ít cơ sở hơn, sếp sẽ hỏi nhiều hơn chứ không ít hơn.",
      },
    ],
    keyTakeaways: [
      "Hai dòng đầu là điều cần sếp quyết, hạn quyết và đề xuất của bạn.",
      "Xu hướng (số việc theo trạng thái) có ích hơn danh sách dài.",
      "Chi tiết để ở phần sau hoặc đính kèm cho ai muốn đọc.",
      "Con số lấy từ bảng công việc, không để AI đoán.",
      "Câu AI thêm mà bạn không có bằng chứng phải xoá.",
    ],
    practicePrompt: {
      question:
        "Báo cáo tuần của anh Bình mở bằng 'Tuần này nhóm rất nỗ lực và đạt nhiều kết quả'. Việc anh cần sếp duyệt nằm ở dòng 15. Sửa thế nào đúng nhất?",
      options: [
        "Đưa điều cần duyệt, hạn và đề xuất lên dòng đầu",
        "Thêm nhiều số liệu vào dòng đầu để thể hiện nhóm làm việc tốt",
        "Giữ nguyên nhưng in đậm dòng 15 để sếp dễ thấy hơn",
        "Chia báo cáo thành hai thư gửi liên tiếp trong cùng một buổi",
      ],
      correct: 0,
      explanation:
        "Vấn đề là thứ tự: điều cần quyết bị chôn ở dòng 15. Thêm số vào lời khen vẫn không cho sếp việc gì để làm. In đậm một dòng ở giữa có thể bị bỏ qua nếu sếp không đọc tới. Gửi hai thư liên tiếp làm sếp phải ghép hai thư lại.",
    },
    summary: {
      keyIdea: "Báo cáo cho người bận: điều cần quyết trước, tình hình sau, chi tiết cuối cùng.",
      formula: "Điều cần quyết + hạn + đề xuất, rồi xu hướng bằng số, rồi chi tiết = báo cáo được đọc và được trả lời.",
      commonMistake: "Liệt kê hai mươi việc đã làm và để điều cần sếp quyết nằm ở dòng mười tám.",
      action: "Viết lại dòng đầu của báo cáo tuần gần nhất thành 'xin quyết gì, trước ngày nào, đề xuất gì'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở báo cáo tuần gần nhất của bạn (hoặc ghi chú tuần này). Tìm điều bạn cần người khác quyết, viết nó thành một câu gồm: xin gì, hạn nào, đề xuất gì. Rồi đếm số việc xong, đang làm và bị chặn từ bảng công việc của bạn. Nhờ AI sắp lại báo cáo theo thứ tự mới, và đối chiếu từng con số với bảng của bạn.",
      secondary: "Ghi lại câu nào AI thêm mà bạn không có bằng chứng, xoá nó khỏi bản nháp.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu bạn gửi báo cáo tuần và tự thấy nó rất đầy đủ. Thứ Hai sếp hỏi lại một điều bạn đã viết ở dòng mười tám. Bài này dạy bạn đảo thứ tự: điều cần quyết lên đầu, tình hình ngay sau, chi tiết ở cuối, và cách kiểm bản nháp AI viết cho bạn.",
      },
      {
        type: "feynman",
        title: "Báo cáo cho sếp đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tờ giấy dán trên cửa tủ lạnh khi bạn đi vắng: dòng đầu là 'Nhớ gọi thợ điện trước thứ Tư', rồi mới đến 'Cơm để trong tủ, rau đã rửa'. Người đọc vội đọc dòng đầu và làm được việc quan trọng nhất. Báo cáo cho sếp cũng vậy.",
        columns: ["Thành phần", "Tờ giấy trên tủ lạnh", "Báo cáo tuần cho sếp"],
        rows: [
          ["Dòng đầu", "Việc phải làm trước thứ Tư", "Điều cần sếp quyết, hạn, đề xuất"],
          ["Ngay sau", "Điều cần biết để làm việc đó", "Tình hình chung, rủi ro chính, vài dòng"],
          ["Cuối tờ", "Cơm để đâu", "Việc đã xong, việc tuần tới"],
          ["Người đọc", "Người vội, chỉ liếc", "Sếp bận, đọc hai dòng"],
        ],
        oneLiner: "Điều người đọc phải làm đặt trên cùng; điều bạn đã làm xếp phía sau.",
      },
      { type: "heading", text: "Vấn đề: báo cáo kể chuyện của bạn, không phải việc của sếp" },
      {
        type: "paragraph",
        text: "Báo cáo tuần thường được viết theo thứ tự bạn làm: thứ Hai làm gì, thứ Ba làm gì. Thứ tự đó tiện cho người viết, không tiện cho người đọc. Sếp cần biết ba thứ: có chuyện gì cần tôi quyết, tình hình có đáng lo không, và tuần sau có gì thay đổi.",
      },
      {
        type: "paragraph",
        text: "Nhờ AI sắp lại là việc AI làm tốt, với điều kiện bạn đưa cho nó ghi chú thật và dặn rõ: chỉ dùng thông tin trong ghi chú, điều gì thiếu thì ghi [chưa có]. Nếu không dặn, nó có thể thêm những câu nghe hợp lý như 'khách đã đồng ý' mà chưa từng xảy ra.",
      },
      {
        type: "chart",
        title: "Số việc theo trạng thái qua các tuần",
        caption: "Số liệu minh hoạ: nhóm có 40 việc; kéo thanh trượt để thấy số việc đã xong tăng và số việc còn lại giảm nếu nhóm xong thêm mỗi tuần. Con số của bạn lấy từ bảng công việc.",
        kind: "line",
        xLabel: "Tuần",
        yLabel: "Số việc",
        x: { from: 1, to: 8, step: 1 },
        params: [
          { id: "rate", label: "Việc xong mỗi tuần", min: 2, max: 8, step: 1, value: 5, unit: "việc" },
          { id: "total", label: "Tổng số việc của dự án", min: 20, max: 60, step: 5, value: 40, unit: "việc" },
        ],
        series: [
          { label: "Đã xong", expr: "min(total, rate * x)" },
          { label: "Còn lại", expr: "max(0, total - rate * x)" },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp báo cáo tuần do AI viết: câu nào không có căn cứ?",
        task: "Ghi chú thật của bạn: xong 9 việc, đang làm 6, bị chặn 3; cần sếp duyệt 1 người thời vụ trước thứ Tư; khách chưa trả lời về gia hạn. Bấm các câu trong bản nháp mà ghi chú không hỗ trợ, rồi nộp.",
        segments: [
          { text: "Cần anh duyệt thêm 1 người thời vụ trước thứ Tư; đề xuất: duyệt." },
          { text: "Tuần này nhóm xong 9 việc, đang làm 6 việc và có 3 việc bị chặn." },
          { text: "Khách đã đồng ý gia hạn thêm một tuần cho hạng mục B.", error: "Ghi chú nói khách chưa trả lời về gia hạn. Đây là câu AI thêm cho trọn ý, và sếp có thể quyết định dựa trên điều chưa xảy ra." },
          { text: "Ba việc bị chặn đều do chờ phản hồi từ bên ngoài." },
          { text: "Chi phí phát sinh tuần này chỉ khoảng 2% ngân sách.", error: "Ghi chú không có con số chi phí nào. Phần trăm này là AI bịa, và một con số cụ thể trông rất đáng tin." },
          { text: "Tuần tới nhóm tập trung vào hạng mục B và C." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Quyết định lên đầu, xu hướng bằng số",
          text: "Sếp thấy ngay việc phải làm và hạn. Số việc theo trạng thái cho thấy dự án lên hay xuống. Chi tiết nằm ở cuối cho ai cần. Bạn nhận được câu trả lời nhanh và ít bị hỏi lại.",
        },
        right: {
          label: "Kể theo thứ tự thời gian",
          text: "Điều cần quyết chìm ở giữa. Sếp phải tự đếm và tự rút ra xu hướng. Sếp đọc hai dòng đầu rồi thôi, nên việc cần duyệt nằm im tới hết hạn.",
        },
      },
      {
        type: "callout",
        label: "Con số và cam kết là của bạn",
        text: "AI sắp xếp câu chữ tốt, nhưng mọi con số phải đối chiếu với bảng công việc, và mọi câu kiểu 'khách đã đồng ý' phải có bằng chứng. Báo cáo là thứ sếp dùng để ra quyết định, và bạn chịu trách nhiệm nếu nó sai. Nếu có dữ liệu nhạy cảm, chỉ dùng công cụ đã được công ty duyệt.",
      },
      {
        type: "scenario",
        title: "Thứ Sáu, báo cáo tuần và một việc cần duyệt",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có ghi chú tuần và cần sếp duyệt thêm một người thời vụ trước thứ Tư. AI đã sắp lại báo cáo, nhưng dòng đầu là 'Tuần này nhóm nỗ lực hoàn thành nhiều việc'.",
            choices: [
              { label: "Gửi luôn, vì điều cần duyệt đã có trong báo cáo ở đoạn ba", next: "bad_buried" },
              { label: "Sửa dòng đầu thành: 'Cần anh duyệt 1 người thời vụ trước thứ Tư; nếu không, đợt hàng ngày 15 trễ'", next: "s2" },
            ],
          },
          bad_buried: {
            text: "Sếp đọc hai dòng đầu, thấy 'nỗ lực' và đóng thư. Thứ Tư qua đi không ai duyệt, đợt hàng ngày 15 trễ ba ngày.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đọc tiếp và thấy AI viết 'Chi phí phát sinh chỉ khoảng 2% ngân sách'. Ghi chú của bạn không có số này.",
            choices: [
              { label: "Giữ câu đó cho báo cáo có vẻ chắc chắn", next: "bad_invented" },
              { label: "Xoá câu đó hoặc thay bằng con số thật từ bảng chi phí", next: "s3" },
            ],
          },
          bad_invented: {
            text: "Sếp hỏi lại nguồn của con số 2%. Bạn không có. Từ đó, sếp đọc các con số trong báo cáo của bạn kỹ hơn và tin ít hơn.",
            ending: "bad",
          },
          s3: {
            text: "Bạn đối chiếu số việc xong, đang làm và bị chặn với bảng công việc: khớp. Còn một việc: gửi ngay hay để đến sáng thứ Hai.",
            choices: [
              { label: "Gửi ngay chiều thứ Sáu để sếp có thời gian trả lời trước thứ Tư", next: "good" },
              { label: "Để sáng thứ Hai cho sếp đỡ bị làm phiền cuối tuần", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Sếp đọc báo cáo sáng thứ Hai và duyệt ngay, nhưng người thời vụ cần một ngày để vào việc, nên đợt hàng ngày 15 vẫn dịch sang chiều thứ Năm.",
            ending: "bad",
          },
          good: {
            text: "Sếp duyệt trong một tiếng. Người thời vụ vào việc thứ Hai và đợt hàng ngày 15 đúng hẹn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Từ bảng công việc, đếm việc xong, đang làm, bị chặn.",
          "Bước 2 - Viết điều cần quyết thành một câu: xin gì, hạn nào, đề xuất gì.",
          "Bước 3 - Nhờ AI sắp lại theo thứ tự mới, chỉ dùng ghi chú của bạn.",
          "Bước 4 - Gạch mọi câu hoặc số không có căn cứ, đối chiếu số với bảng rồi gửi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Quyết định lên đầu, số lấy từ bảng, câu nào AI thêm mà bạn không có bằng chứng thì xoá.",
          "Bài sau: báo tin xấu sớm và đi kèm phương án.",
        ],
      },
    ],
  },
  {
    id: 2058,
    slug: "bao-tin-xau-som-va-co-phuong-an",
    title: "Chặng 32, Bài 19: Báo tin xấu sớm và đi kèm phương án",
    subtitle: "Trễ hai tuần là tin xấu; báo ngay kèm ba lựa chọn thì là một quyết định có thể xử lý.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn biết dự án sẽ trễ hai tuần, và cái cám dỗ lớn nhất là chờ thêm vài ngày xem có gỡ được không. Mỗi ngày chờ làm người nghe có ít lựa chọn hơn. Báo sớm, nêu đúng sự thật đã biết và đi kèm vài phương án khiến tin xấu trở thành một việc cần quyết, thay vì một cú sốc ở phút chót.",
    openingQuestion:
      "Bạn vừa biết dự án sẽ trễ hai tuần, nhưng chưa rõ nguyên nhân hết. Bạn nên làm gì?",
    openingOptions: [
      "Báo ngay điều đã biết, nói rõ điều chưa biết và đưa vài phương án",
      "Chờ tới khi tìm ra nguyên nhân đầy đủ rồi mới báo để khỏi bị hỏi dồn",
      "Báo nhưng nói nhẹ đi là chỉ trễ vài ngày để mọi người đỡ lo",
      "Nhờ AI viết thật khéo để thông báo nghe như một tin tốt",
    ],
    correctOption: 0,
    explanation:
      "Người nhận tin cần thời gian để phản ứng: dời việc, báo khách, tìm thêm người. Mỗi ngày bạn giữ tin là một ngày họ mất. Nói rõ điều đã biết và điều chưa biết giúp họ tin bạn và biết còn phải chờ gì. Chờ có đủ nguyên nhân thì có thể quá muộn để có phương án. Nói nhẹ đi vài ngày là sự thật bị bóp méo và sẽ lộ ra sau. Viết khéo để tin xấu nghe như tin tốt làm người đọc mất niềm tin khi họ hiểu ra.",
    diagram: [
      { label: "Ghi sự thật đã biết và điều chưa biết", arrow: true },
      { label: "Nêu tác động: ai bị ảnh hưởng, bao lâu", arrow: true },
      { label: "Đưa hai đến ba phương án, mỗi phương án có cái giá", arrow: true },
      { label: "Nêu đề xuất và hạn cần quyết, rồi gửi ngay" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một điều phối viên sự kiện biết địa điểm tiệc cuối năm chỉ sắp xếp được sau hai tuần so với kế hoạch. Cô báo ngay cho trưởng phòng: điều đã biết (địa điểm bận), điều chưa biết (địa điểm khác còn trống không), ba phương án (đổi địa điểm, đổi ngày, thu nhỏ quy mô) kèm cái giá của từng cái, và đề xuất một phương án. Trưởng phòng chọn trong buổi chiều, thay vì biết tin khi thiệp mời đã in.",
    },
    quiz: [
      {
        question: "Vì sao nên báo tin xấu sớm, ngay cả khi chưa có đủ thông tin?",
        options: [
          "Người nhận cần thời gian phản ứng, và mỗi ngày giữ tin làm họ mất bớt lựa chọn",
          "Vì báo càng sớm thì người nhận càng ít trách bạn",
          "Vì tin xấu để lâu sẽ tự xấu thêm dù không có gì thay đổi",
          "Vì quy tắc chung của mọi công ty là phải báo trong vòng một giờ",
        ],
        correct: 0,
        explanation:
          "Lợi ích thật của báo sớm là thời gian cho người khác hành động; lời trách có thể vẫn tới. Tin xấu không tự xấu thêm, chính lựa chọn mới bị thu hẹp lại theo thời gian. Và không có quy tắc chung 'trong một giờ'; mỗi nơi có quy định riêng, hãy hỏi người phụ trách.",
      },
      {
        question: "Một tin nhắn báo tin xấu tốt gồm những phần nào?",
        options: [
          "Sự thật đã biết, điều chưa biết, tác động, các phương án và đề xuất",
          "Lời xin lỗi thật dài, rồi tới lý do và cuối cùng là lời hứa sẽ không tái diễn",
          "Chỉ cần ngày trễ mới, còn lý do và phương án thì để bàn sau khi họp trực tiếp",
          "Lý do trễ nêu thật chi tiết để người nhận thấy đây không phải lỗi của bạn",
        ],
        correct: 0,
        explanation:
          "Năm phần này cho người đọc đủ chất liệu để quyết. Xin lỗi dài và lời hứa không thay cho phương án. Chỉ có ngày mới thì người đọc không biết mình phải làm gì. Nêu lý do dài để chứng minh mình không có lỗi là đặt mình vào giữa thay vì đặt việc cần quyết vào giữa.",
      },
      {
        question: "Khi đưa phương án, điều nào làm chúng có giá trị nhất cho người quyết?",
        options: [
          "Mỗi phương án nêu cái giá cụ thể: thời gian, tiền hoặc rủi ro",
          "Nêu càng nhiều phương án càng tốt để người quyết có nhiều chọn lựa",
          "Nêu một phương án duy nhất vì người quyết bận và không thích phải chọn",
          "Để AI xếp thứ hạng các phương án rồi chỉ gửi cái đứng đầu cho người quyết",
        ],
        correct: 0,
        explanation:
          "Người quyết cần so sánh được, và chỉ giá cụ thể mới so sánh được. Quá nhiều phương án làm họ mệt và chậm quyết; hai đến ba là vừa. Một phương án duy nhất thì họ không có gì để chọn, chỉ có thể đồng ý hoặc từ chối. Và AI không biết ràng buộc thật của công ty nên xếp hạng của nó là phỏng đoán.",
      },
      {
        question: "Nguyên nhân trễ chưa rõ hết. Câu nào trung thực nhất về điều đó?",
        options: [
          "Nguyên nhân chính đã biết là A; chúng tôi đang kiểm tra thêm B và sẽ báo lại thứ Tư",
          "Nguyên nhân là A, không còn gì khác cần xem",
          "Có thể do nhiều yếu tố khác nhau, chúng tôi đang tìm hiểu thêm và sẽ báo anh khi có kết quả rõ ràng",
          "Nguyên nhân không quan trọng bằng việc giải quyết nó",
        ],
        correct: 0,
        explanation:
          "Câu đúng tách điều đã biết khỏi điều chưa biết và có hạn báo lại. Nói chắc là 'A, không còn gì' mà sau đó lộ ra B thì mất tin. 'Nhiều yếu tố' không cho người đọc biết gì cả. Còn 'không quan trọng' là né câu hỏi mà người nghe chắc chắn sẽ hỏi.",
      },
      {
        question: "Nhờ AI soạn tin báo trễ, bạn cần đặc biệt kiểm điều gì trước khi gửi?",
        options: [
          "Mọi ngày, số và lý do trong bản nháp có đúng với điều bạn thật sự biết không",
          "Bản nháp có đủ lời xin lỗi và lời lẽ nhẹ nhàng không",
          "Bản nháp có dài ngang một trang để trông đủ nghiêm túc không",
          "Giọng của bản nháp có giống giọng một chuyên gia quản lý dự án không",
        ],
        correct: 0,
        explanation:
          "Tin xấu càng cần đúng vì người nhận sẽ hành động dựa trên nó; AI có thể thêm lý do hoặc ngày nghe hợp lý mà bạn không có. Đủ xin lỗi hay đủ dài không làm tin đúng hơn. Giọng chuyên gia cũng vậy, vì nó không thay được sự thật.",
      },
      {
        question: "Nếu tin xấu liên quan tới một người cụ thể, tin nhắn nên nói thế nào?",
        options: [
          "Nêu sự kiện và tác động, để việc đánh giá con người cho người có trách nhiệm",
          "Nêu tên người đó và mô tả lỗi của họ thật cụ thể để tin rõ ràng nhất cho người quyết",
          "Nói giảm tên người đó và đổ nguyên nhân cho quy trình chung",
          "Bỏ qua chi tiết này để không làm người đó khó xử",
        ],
        correct: 0,
        explanation:
          "Tin xấu cần sự kiện và tác động, còn nhận xét về cá nhân thuộc người quản lý. Nêu tên và lỗi biến tin thành lời buộc tội khi bạn chưa đủ thông tin. Đổ cho 'quy trình chung' khi thật ra không phải là bóp méo. Bỏ qua chi tiết mà nó là nguyên nhân chính làm người quyết thiếu điều cần thiết.",
      },
    ],
    keyTakeaways: [
      "Báo sớm để người khác còn thời gian và lựa chọn.",
      "Nói rõ điều đã biết, điều chưa biết và hạn báo lại.",
      "Mỗi phương án đi kèm cái giá cụ thể.",
      "Hai đến ba phương án cùng một đề xuất của bạn.",
      "Ngày, số và lý do trong bản AI soạn phải là điều bạn thật sự biết.",
    ],
    practicePrompt: {
      question:
        "Anh Tú biết đợt giao hàng sẽ trễ hai tuần. Anh nhắn: 'Có chút vấn đề về tiến độ, để em xem rồi báo sau'. Điều gì cần sửa nhất?",
      options: [
        "Nêu ngay ngày trễ, tác động, phương án và hạn cần quyết",
        "Thêm lời xin lỗi thật lớn ở đầu tin nhắn để thể hiện thiện chí",
        "Đợi thêm hai ngày để có đầy đủ thông tin hơn rồi mới nhắn lại",
        "Gửi tin nhắn tới tất cả mọi người trong công ty để minh bạch",
      ],
      correct: 0,
      explanation:
        "Tin nhắn này báo là có chuyện nhưng không cho người đọc gì để hành động: bao nhiêu, ai bị ảnh hưởng, cần quyết gì. Xin lỗi lớn không thay được phương án. Đợi thêm là kéo dài đúng điều đang làm người khác mất lựa chọn. Gửi cả công ty làm nhiều người nhận tin không liên quan tới họ.",
    },
    summary: {
      keyIdea: "Tin xấu báo sớm, đủ thật và có phương án thì là một việc cần quyết, không phải một cú sốc.",
      formula: "Điều đã biết + điều chưa biết + tác động + 2-3 phương án có giá + đề xuất + hạn = tin xấu dùng được.",
      commonMistake: "Chờ thêm vài ngày cho chắc rồi báo, khi người khác đã hết đường lựa chọn.",
      action: "Nghĩ tới một việc bạn đang lo bị trễ và viết ngay tin báo năm dòng cho nó, dù chưa gửi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc đang chạy của bạn có nguy cơ trễ hoặc lệch (thật hoặc giả định). Viết ra: điều đã biết, điều chưa biết, ai bị ảnh hưởng, hai đến ba phương án mỗi cái có một cái giá, và đề xuất của bạn. Nhờ AI gọt thành tin nhắn ngắn, rồi gạch mọi ngày hoặc lý do mà bạn không thật sự biết.",
      secondary: "Không cần gửi; chỉ cần có sẵn để khi tin xấu tới thật, bạn không phải viết từ đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa biết một việc sẽ trễ hai tuần, và một giọng nói trong đầu bảo: đợi thêm vài ngày xem sao. Bài này dạy cách báo tin xấu ngay khi còn lựa chọn, bằng tin nhắn nêu đúng sự thật, chỉ ra điều chưa biết và đưa cho người quyết vài phương án để chọn.",
      },
      {
        type: "feynman",
        title: "Báo tin xấu sớm đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới lúc bạn báo với người thân rằng chuyến bay bị hoãn. Nếu báo ngay khi biết và nói 'có chuyến chiều hoặc sáng mai, mỗi cái tốn thế này', họ còn sắp xếp được. Nếu báo lúc họ đã ở sân bay, họ chỉ còn cách chịu. Tin xấu nào cũng vậy.",
        columns: ["Thành phần", "Chuyến bay hoãn", "Dự án trễ"],
        rows: [
          ["Sự thật", "Chuyến 9 giờ hoãn tới 4 giờ chiều", "Dự án trễ hai tuần"],
          ["Điều chưa biết", "Hãng chưa nói lý do", "Nguyên nhân phụ đang kiểm tra"],
          ["Phương án", "Đổi chuyến sáng mai, hoặc chờ chuyến chiều", "Đổi phạm vi, thêm người, hoặc dời ngày"],
          ["Người quyết", "Người đi bay", "Sếp, khách hoặc người chịu trách nhiệm"],
        ],
        oneLiner: "Tin xấu nói sớm, nói thật và có phương án thì người nghe còn quyền chọn.",
      },
      { type: "heading", text: "Vấn đề: chờ cho chắc thì hết đường chọn" },
      {
        type: "paragraph",
        text: "Cám dỗ của người mang tin xấu là chờ: chờ tìm ra nguyên nhân, chờ xem có gỡ được không, chờ một thời điểm đỡ căng. Nhưng mỗi ngày chờ thì người kia mất một ngày để thuê người, dời hẹn hoặc nói với khách. Cái mà bạn cho là 'chưa chắc' thường khiến họ mất nhiều hơn cái bạn nghĩ.",
      },
      {
        type: "paragraph",
        text: "Cái thứ hai là cách nói. Nói nhẹ đi vài ngày, hoặc nhờ AI viết sao cho nghe như tin tốt, sẽ lộ ra khi sự thật tới. Cách tốt hơn là nói thật gọn và mang sẵn phương án, để người nghe thấy bạn đang giúp họ xử lý chứ không chỉ báo lỗi.",
      },
      {
        type: "flow",
        title: "Từ 'sắp trễ' đến tin nhắn có phương án",
        steps: [
          { label: "Ghi điều đã biết", detail: "Chỉ những điều có bằng chứng: ngày trễ dự kiến, việc nào bị ảnh hưởng, nguyên nhân đã xác nhận." },
          { label: "Ghi điều chưa biết và hạn báo lại", detail: "Nói rõ điều đang kiểm tra và ngày bạn sẽ báo lại. Người nghe tin bạn hơn khi bạn phân biệt được hai thứ này." },
          { label: "Nêu tác động", detail: "Ai bị ảnh hưởng, nặng nhẹ ra sao. Ví dụ: khách nhận muộn hai tuần, kế toán dời một đợt thanh toán." },
          { label: "Đưa hai đến ba phương án có cái giá", detail: "Ví dụ: thêm người (tốn thêm tiền, kịp hạn), thu hẹp phạm vi (giữ hạn, bớt một hạng mục), dời hạn (không tốn thêm, khách phải chờ)." },
          { label: "Nêu đề xuất và hạn cần quyết", detail: "Bạn nghiêng về phương án nào và vì sao, người quyết cần trả lời trước ngày nào. AI có thể gọt câu chữ, nhưng ngày và số là của bạn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Báo sớm, thật, có phương án",
          text: "Người nghe còn thời gian và lựa chọn. Họ thấy bạn kiểm soát được tình hình, dù tin xấu. Họ có thứ để trả lời ngay: chọn phương án nào.",
        },
        right: {
          label: "Chờ cho chắc, nói nhẹ đi",
          text: "Lựa chọn bị thu hẹp mỗi ngày. Sự thật lộ ra sau và mất niềm tin. Người nghe nhận một vấn đề mà không có gì để làm với nó.",
        },
      },
      {
        type: "callout",
        label: "Thời điểm và kênh",
        text: "Tin xấu lớn (trễ hạn với khách, chi phí tăng đáng kể) nên báo trực tiếp cho người quyết, bằng cuộc gọi hoặc tin nhắn riêng, rồi ghi lại bằng văn bản. Nếu tin xấu có liên quan tới hợp đồng hay tiền, hỏi người phụ trách hoặc bộ phận pháp chế trước khi hứa gì. Đừng đưa dữ liệu nhạy cảm vào công cụ AI chưa được duyệt.",
      },
      {
        type: "scenario",
        title: "Thứ Ba, dự án sẽ trễ hai tuần",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa biết nhà cung cấp giao vật tư muộn nên dự án trễ hai tuần. Nguyên nhân phụ còn đang kiểm tra. Sếp sẽ hỏi lịch vào thứ Sáu.",
            choices: [
              { label: "Chờ tới thứ Sáu, khi có thêm thông tin, rồi nói luôn", next: "bad_wait" },
              { label: "Nhắn sếp ngay hôm nay, nói điều đã biết và điều đang kiểm tra", next: "s2" },
            ],
          },
          bad_wait: {
            text: "Thứ Sáu sếp biết tin và đã hứa với khách ngày cũ vào thứ Tư. Sếp phải xin lỗi khách và không còn phương án nào rẻ để cứu lịch.",
            ending: "bad",
          },
          s2: {
            text: "Sếp trả lời nhanh: 'Tình hình ra sao, tôi cần làm gì?' Bạn có ba phương án trong đầu.",
            choices: [
              { label: "Đưa ba phương án, mỗi phương án nêu giá, kèm đề xuất và hạn cần chọn", next: "s3" },
              { label: "Nói 'em sẽ tìm cách gỡ, anh cứ yên tâm' và không nêu phương án", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Sếp yên tâm và không làm gì. Hai tuần sau tình hình chưa gỡ được, sếp không còn thời gian để chọn phương án nào ngoài việc chịu trễ.",
            ending: "bad",
          },
          s3: {
            text: "Bạn nhờ AI gọt tin nhắn, và thấy nó viết 'nhà cung cấp cam kết giao trong 5 ngày'. Không ai cam kết như vậy với bạn.",
            choices: [
              { label: "Xoá câu đó, chỉ giữ điều bạn thật sự có bằng chứng, rồi gửi", next: "good" },
              { label: "Giữ câu đó cho tin nhắn có vẻ có hy vọng", next: "bad_hope" },
            ],
          },
          bad_hope: {
            text: "Sếp báo lại cho khách theo '5 ngày'. Nhà cung cấp không giao đúng, sếp mất uy tín và bạn phải giải thích một cam kết mà không ai đưa ra.",
            ending: "bad",
          },
          good: {
            text: "Sếp chọn phương án thu hẹp phạm vi ngay chiều đó và báo khách với lịch mới. Không ai bị bất ngờ.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi điều đã biết, điều chưa biết và ngày bạn sẽ báo lại.",
          "Bước 2 - Nêu tác động: ai bị ảnh hưởng và trong bao lâu.",
          "Bước 3 - Nghĩ hai đến ba phương án, mỗi cái một cái giá, và chọn một đề xuất.",
          "Bước 4 - Nhờ AI gọt câu chữ, gạch mọi điều bạn không có bằng chứng, rồi gửi ngay.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Báo sớm, nói thật, đi kèm phương án: tin xấu thành một việc có thể quyết.",
          "Bài sau: capstone, điều phối một dự án nhỏ từ phạm vi đến tổng kết bài học.",
        ],
      },
    ],
  },
  {
    id: 2059,
    slug: "capstone-dieu-phoi-mot-du-an-nho-tu-a-den-z",
    title: "Chặng 32, Bài 20: Capstone: điều phối một dự án nhỏ từ phạm vi đến tổng kết bài học",
    subtitle: "Một dự án nhỏ, đi hết vòng: phạm vi, họp, tiến độ, rủi ro, báo cáo, bài học, và chỗ AI không thay bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã học từng mảnh: viết phạm vi, họp có chương trình, biên bản có người nhận việc, bảng rủi ro, báo cáo cho sếp, báo tin xấu. Bài cuối gom chúng lại trên một dự án nhỏ có thật, để bạn thấy AI giúp ở đâu, và ở những chỗ nào phải là chính bạn quyết, xác nhận và chịu trách nhiệm.",
    openingQuestion:
      "Bạn điều phối một dự án nhỏ từ đầu tới cuối và dùng AI ở nhiều bước. Việc nào không nên giao cho AI làm thay?",
    openingOptions: [
      "Quyết định phạm vi, xác nhận cam kết với người khác và chịu trách nhiệm kết quả",
      "Viết nháp biên bản họp từ ghi chú và đổi giọng văn cho từng người nhận",
      "Sắp xếp ghi chú rời thành bảng việc theo người và hạn",
      "Gợi ý các rủi ro thường gặp ở dự án cùng loại để bạn chọn lọc",
    ],
    correctOption: 0,
    explanation:
      "AI làm tốt phần chữ: viết nháp, sắp xếp, gợi ý để bạn chọn. Nhưng phạm vi là điều bạn và người có thẩm quyền quyết, cam kết với người khác chỉ có giá trị khi người đó xác nhận, và trách nhiệm không chuyển sang phần mềm. Ba lựa chọn còn lại đều là việc AI hỗ trợ được, miễn bạn soát lại với nguồn thật trước khi dùng. Ranh giới là: AI đề xuất, bạn quyết định và chịu trách nhiệm.",
    diagram: [
      { label: "Phạm vi: làm gì, không làm gì, xong khi nào", arrow: true },
      { label: "Họp và biên bản: việc, người, hạn", arrow: true },
      { label: "Tiến độ, rủi ro và báo cáo: điều cần quyết lên đầu", arrow: true },
      { label: "Báo tin xấu sớm, rồi tổng kết bài học không đổ lỗi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên văn phòng được giao tổ chức hội nghị khách hàng nhỏ cho bốn mươi người trong sáu tuần. Cô viết một trang phạm vi, họp khởi động có chương trình, theo dõi bảng việc và rủi ro mỗi tuần, báo sếp điều cần quyết ở dòng đầu, và báo sớm khi địa điểm đổi lịch. Sau sự kiện, cô cùng nhóm viết ba điều làm tốt, ba điều cải thiện, không nêu tên ai. AI giúp cô ở phần chữ; con số ngân sách, cam kết với địa điểm và quyết định chốt đều do cô và sếp xác nhận.",
    },
    quiz: [
      {
        question: "Dự án nhỏ bắt đầu bằng một trang phạm vi. Trang đó cần nêu điều gì mà nhiều người hay bỏ sót?",
        options: [
          "Điều dự án sẽ KHÔNG làm, cùng tiêu chí để biết khi nào xong",
          "Danh sách mọi việc có thể làm nếu còn thời gian và ngân sách",
          "Tên các thành viên và chức danh của họ trong công ty, để ai cũng biết mình thuộc phần nào",
          "Lời hứa nhóm sẽ cố gắng hết sức để hoàn thành sớm",
        ],
        correct: 0,
        explanation:
          "Ranh giới 'không làm' và tiêu chí xong là hai thứ ngăn việc phình ra và ngăn tranh cãi cuối dự án. Danh sách 'nếu còn thời gian' mở rộng phạm vi thay vì giữ nó. Tên và chức danh không nói dự án làm gì. Lời hứa cố gắng không đo được nên không giúp ai biết khi nào xong.",
      },
      {
        question: "Cuối một cuộc họp, điều nào biến cuộc họp thành việc thật?",
        options: [
          "Mỗi việc có một người nhận, một hạn, và biên bản gửi trong ngày",
          "Mọi người gật đầu với nhau về hướng đi chung",
          "Chủ trì nhắc lại rằng ai cũng cần cố gắng hơn tuần sau",
          "Cuộc họp kéo dài đến khi mọi ý kiến đều được nói hết",
        ],
        correct: 0,
        explanation:
          "Việc không có người nhận và hạn thì không ai chịu trách nhiệm, và biên bản trong ngày giúp phát hiện hiểu nhầm sớm. Gật đầu chung chung không nói ai làm gì. Nhắc 'cố gắng hơn' không phải một việc. Kéo dài họp cho hết ý kiến không tạo ra người nhận việc nào.",
      },
      {
        question: "Bảng rủi ro của dự án nên được dùng như thế nào?",
        options: [
          "Xem lại mỗi tuần, ghi rõ ai theo dõi và dấu hiệu báo động của từng rủi ro",
          "Lập một lần ở đầu dự án rồi cất đi cho tới khi kết thúc",
          "Liệt kê thật nhiều rủi ro để cho thấy nhóm đã nghĩ kỹ",
          "Nhờ AI lập bảng rồi dùng nguyên văn vì nó đã biết mọi rủi ro của các dự án cùng loại",
        ],
        correct: 0,
        explanation:
          "Rủi ro thay đổi theo tuần, nên bảng chỉ có ích khi xem lại và mỗi rủi ro có người theo dõi cùng dấu hiệu để nhận ra sớm. Lập một lần rồi cất là bảng chết. Nhiều rủi ro không có người theo dõi chỉ làm bảng dài. AI gợi ý rủi ro chung, còn rủi ro của dự án bạn phải do bạn chọn.",
      },
      {
        question: "Buổi tổng kết bài học không đổ lỗi nên hỏi những câu nào?",
        options: [
          "Điều gì đã giúp, điều gì làm chậm, và lần sau ta làm khác đi điều gì",
          "Ai là người gây ra các sự cố lớn nhất của dự án này và đã bỏ sót điều gì",
          "Ai xứng đáng được khen nhất để làm gương cho lần sau",
          "Vì sao dự án không đạt hết mục tiêu mà bạn đã đặt ra ban đầu",
        ],
        correct: 0,
        explanation:
          "Câu hỏi về điều giúp, điều cản và điều đổi khác hướng tới quy trình và hành động, nên mọi người nói thật. Hỏi ai gây ra sự cố thì mọi người sẽ giấu. Chọn người xứng đáng nhất biến buổi họp thành bảng xếp hạng. Còn 'vì sao không đạt' nghe như chất vấn và thường nhận về lời bào chữa.",
      },
      {
        question: "AI viết bản tổng kết có câu 'Nhóm đã tiết kiệm được 18% chi phí so với kế hoạch'. Con số này không có trong dữ liệu của bạn. Làm gì?",
        options: [
          "Xoá hoặc thay bằng con số tính từ bảng chi phí thật",
          "Giữ lại vì con số cụ thể cho thấy bản tổng kết có căn cứ rõ ràng",
          "Giữ lại và thêm chữ 'khoảng' để con số nghe bớt tuyệt đối hơn",
          "Hỏi lại AI nguồn của con số rồi tin vào câu trả lời của nó",
        ],
        correct: 0,
        explanation:
          "Một số cụ thể không có trong dữ liệu là số bịa, và chính vì cụ thể nó trông đáng tin. Thêm 'khoảng' không cho nó căn cứ. AI trả lời câu hỏi nguồn bằng một câu nghe hợp lý, không phải bằng bảng chi phí. Số đúng chỉ có thể tính từ dữ liệu của bạn.",
      },
      {
        question: "Ở bước báo cáo tiến độ và báo tin xấu, điều nào bạn luôn giữ lấy cho mình?",
        options: [
          "Quyết định nói gì với ai và xác nhận mọi ngày, số, cam kết",
          "Việc gõ từng câu, vì AI viết luôn kém hơn người viết thật nhiều",
          "Việc chọn giọng văn, vì đó là điều duy nhất AI không làm được",
          "Việc gửi thư đi, vì AI không có quyền gửi email cho bất kỳ ai",
        ],
        correct: 0,
        explanation:
          "Quyết định nói gì và xác nhận sự thật là phần chỉ người chịu trách nhiệm làm được. AI viết câu tốt nên không cần giữ việc gõ từng câu. Giọng văn AI bắt chước được khi có ví dụ. Còn quyền gửi thư phụ thuộc cách bạn cấu hình, không phải ranh giới đáng dựa vào.",
      },
    ],
    keyTakeaways: [
      "Một dự án nhỏ vẫn cần phạm vi có ranh giới và tiêu chí xong.",
      "Cuộc họp tốt kết thúc bằng việc, người, hạn và biên bản trong ngày.",
      "Bảng rủi ro xem lại mỗi tuần, mỗi rủi ro có người theo dõi.",
      "Báo cáo đặt điều cần quyết lên đầu; tin xấu báo sớm kèm phương án.",
      "AI đề xuất; bạn quyết định, xác nhận và chịu trách nhiệm.",
    ],
    practicePrompt: {
      question:
        "Chị Hà điều phối một sự kiện nhỏ. Cuối dự án chị nhờ AI viết tổng kết và gửi thẳng cho sếp. Bước nào còn thiếu nhất?",
      options: [
        "Đối chiếu mọi con số và câu khẳng định với dữ liệu thật rồi mới gửi",
        "Thêm nhiều lời khen nhóm để bản tổng kết nghe tích cực hơn với ban lãnh đạo",
        "Nhờ AI viết dài hơn để bản tổng kết có vẻ đầy đủ hơn",
        "Gửi bản tổng kết cho cả công ty để mọi người cùng học hỏi",
      ],
      correct: 0,
      explanation:
        "Bản tổng kết là tài liệu sếp dựa vào để đánh giá, nên con số và khẳng định phải đúng; AI có thể thêm chi tiết nghe hợp lý mà bạn không có. Lời khen và độ dài không làm nó đúng hơn. Gửi cả công ty làm dữ liệu dự án đi tới người không cần.",
    },
    summary: {
      keyIdea: "Điều phối là chuỗi những việc nhỏ có ranh giới rõ; AI giúp chữ, còn quyết định và trách nhiệm ở bạn.",
      formula: "Phạm vi + họp có việc + theo dõi rủi ro + báo cáo điều cần quyết + tin xấu sớm + tổng kết không đổ lỗi = dự án nhỏ điều phối được.",
      commonMistake: "Để AI viết mọi thứ rồi gửi luôn mà không đối chiếu số và cam kết với nguồn thật.",
      action: "Chọn một dự án nhỏ của bạn và hoàn thành trang phạm vi trước khi làm bất cứ việc gì khác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một dự án thật hoặc giả định trong công việc của bạn (một sự kiện, một đợt cập nhật quy trình, một đợt chuyển chỗ làm). Viết trang phạm vi năm dòng: làm gì, không làm gì, ai quyết, xong khi nào, ba rủi ro đầu tiên. Nhờ AI gợi ý thêm hai rủi ro bạn chưa nghĩ tới, rồi chọn cái nào đúng với dự án của bạn và ghi ai theo dõi.",
      secondary: "Viết một dòng: bước nào trong dự án này AI không được làm thay bạn, và vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã học từng mảnh của việc điều phối. Bài cuối gom chúng lại trên một dự án nhỏ: từ trang phạm vi đầu tiên đến buổi tổng kết bài học, kèm câu hỏi quan trọng nhất của cả chặng: ở đâu AI giúp được, ở đâu chỉ bạn làm được.",
      },
      {
        type: "feynman",
        title: "Điều phối một dự án nhỏ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới chuyến đi chơi cuối tuần của cả nhà. Bạn chốt đi đâu và không đi đâu, phân ai lo xe, ai lo đồ ăn, xem thời tiết mỗi ngày, báo cả nhà sớm khi mưa và cuối chuyến hỏi nhau lần sau làm khác gì. Dự án nhỏ là chuyến đi đó, chỉ có thêm sếp và khách.",
        columns: ["Thành phần", "Chuyến đi cả nhà", "Dự án nhỏ"],
        rows: [
          ["Phạm vi", "Đi đâu, không đi đâu, về lúc nào", "Làm gì, không làm gì, xong khi nào"],
          ["Phân việc", "Ai lo xe, ai lo đồ ăn", "Mỗi việc một người và một hạn"],
          ["Theo dõi", "Xem thời tiết, xe đã kiểm chưa", "Bảng việc và bảng rủi ro xem lại mỗi tuần"],
          ["Báo tin xấu", "Báo cả nhà sớm khi trời mưa, kèm chỗ thay thế", "Báo sớm kèm phương án và cái giá"],
          ["Tổng kết", "Lần sau mang thêm áo mưa", "Điều giúp, điều cản, điều đổi khác, không đổ lỗi"],
        ],
        oneLiner: "Điều phối là làm rõ ranh giới, chia việc, nhìn trước rủi ro, nói sớm và học sau khi xong.",
      },
      { type: "heading", text: "Sáu mảnh ghép, một vòng đầy đủ" },
      {
        type: "paragraph",
        text: "Một dự án nhỏ đi qua sáu chỗ. Phạm vi cho biết đích. Họp khởi động chia việc. Biên bản giữ lời hứa. Bảng tiến độ và rủi ro cho thấy chỗ sắp lệch. Báo cáo đặt điều cần quyết lên đầu. Và tổng kết biến kinh nghiệm thành thói quen. Mỗi chỗ AI giúp ở phần chữ, nhưng phần quyết định thuộc về bạn.",
      },
      {
        type: "paragraph",
        text: "Câu hỏi để giữ trong đầu cả vòng: chỗ này AI đề xuất hay AI quyết? Đề xuất, bạn chọn: tốt. Nếu nó đang quyết thay cho bạn phạm vi, cam kết với người khác, hay điều gì được nói với ai thì bạn đã trao nhầm chỗ.",
      },
      {
        type: "flow",
        title: "Một dự án nhỏ từ A đến Z",
        steps: [
          { label: "Phạm vi một trang", detail: "Làm gì, không làm gì, ai quyết, xong khi nào và ba rủi ro đầu tiên. AI giúp gọt câu chữ, bạn và người có thẩm quyền chốt ranh giới." },
          { label: "Họp khởi động và biên bản", detail: "Chương trình ngắn, mỗi việc có người nhận và hạn. Biên bản gửi trong ngày, người nhận việc trả lời 'đúng' hoặc sửa." },
          { label: "Theo dõi tiến độ và rủi ro", detail: "Mỗi tuần đếm việc xong, đang làm, bị chặn, xem lại bảng rủi ro. Số lấy từ bảng của bạn, không để AI đoán." },
          { label: "Báo cáo cho sếp", detail: "Dòng đầu là điều cần quyết, hạn và đề xuất. Sau đó là xu hướng bằng số và chi tiết ở cuối." },
          { label: "Báo tin xấu sớm", detail: "Khi có việc lệch, báo ngay điều đã biết, điều chưa biết, tác động và hai đến ba phương án có giá." },
          { label: "Tổng kết không đổ lỗi", detail: "Điều giúp, điều cản, điều đổi khác. Mỗi điều đổi khác có một người nhận và một hạn để không nằm trên giấy." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "AI đề xuất, bạn quyết",
          text: "AI viết nháp, sắp xếp, gợi ý rủi ro và câu hỏi. Bạn chọn, đối chiếu số với nguồn, xác nhận cam kết và chịu trách nhiệm. Sai sót được bắt trước khi nó rời khỏi tay bạn.",
        },
        right: {
          label: "AI quyết, bạn chuyển tiếp",
          text: "AI tự thêm ngày, số và cam kết nghe hợp lý, và bạn gửi đi. Khi sai, người nhận sẽ hỏi bạn chứ không hỏi phần mềm. Bạn mất niềm tin vì điều bạn chưa từng kiểm.",
        },
      },
      {
        type: "callout",
        label: "Những chỗ AI không được thay bạn",
        text: "Quyết định phạm vi, xác nhận cam kết với người khác, con số ngân sách và ngày hạn, điều nói với khách, đánh giá con người, và mọi điều liên quan tới hợp đồng hay pháp lý (hỏi bộ phận pháp chế). Dữ liệu nhạy cảm chỉ đi vào công cụ đã được công ty duyệt.",
      },
      {
        type: "scenario",
        title: "Tuần cuối của hội nghị khách hàng nhỏ",
        start: "s1",
        nodes: {
          s1: {
            text: "Hội nghị 40 người sẽ diễn ra tuần sau. Địa điểm vừa báo họ chỉ giữ được phòng vào chiều thứ Sáu thay vì sáng thứ Năm. Bạn cần báo sếp và khách.",
            choices: [
              { label: "Đợi thêm hai ngày xem địa điểm có gỡ được không rồi mới báo", next: "bad_wait" },
              { label: "Báo sếp ngay: điều đã biết, điều chưa biết, hai phương án và giá của từng cái", next: "s2" },
            ],
          },
          bad_wait: {
            text: "Hai ngày sau địa điểm xác nhận không gỡ được. Khách đã sắp lịch bay theo thứ Năm và sếp không còn thời gian để chọn phương án nào rẻ.",
            ending: "bad",
          },
          s2: {
            text: "Sếp chọn dời sang chiều thứ Sáu. Bạn nhờ AI soạn thư cho khách và thấy nó viết 'địa điểm đã đồng ý giảm 10% phí vì sự bất tiện'.",
            choices: [
              { label: "Xoá câu đó vì không ai đồng ý như vậy, chỉ giữ ngày giờ mới và việc khách cần chốt", next: "s3" },
              { label: "Giữ câu đó để thư nghe có thiện chí hơn", next: "bad_promise" },
            ],
          },
          bad_promise: {
            text: "Khách nhắc lại lời giảm 10% tại buổi họp. Không ai đã hứa điều đó và bạn phải giải thích trước mặt sếp và khách.",
            ending: "bad",
          },
          s3: {
            text: "Hội nghị diễn ra tốt. Tuần sau, buổi tổng kết bắt đầu và ai đó nói: 'Lần này chậm là do bạn A quên xác nhận với địa điểm.'",
            choices: [
              { label: "Chuyển câu hỏi thành: bước nào của quy trình thiếu xác nhận và lần sau sửa thế nào", next: "good" },
              { label: "Ghi tên bạn A vào biên bản để rõ trách nhiệm", next: "bad_blame" },
            ],
          },
          bad_blame: {
            text: "Từ đó mọi người bớt nói thật trong các buổi tổng kết vì sợ bị ghi tên. Lỗi cùng loại lặp lại ở dự án sau mà không ai báo sớm.",
            ending: "bad",
          },
          good: {
            text: "Nhóm thêm một bước 'xác nhận bằng văn bản với địa điểm trước ba ngày' vào mẫu dự án, giao cho một người và một hạn. Lần sau không lặp lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết trang phạm vi năm dòng, gồm cả điều dự án không làm.",
          "Bước 2 - Chia việc: mỗi việc một người, một hạn; biên bản trong ngày.",
          "Bước 3 - Mỗi tuần: đếm việc theo trạng thái, xem lại rủi ro, báo cáo điều cần quyết ở dòng đầu.",
          "Bước 4 - Báo tin xấu sớm kèm phương án; tổng kết không đổ lỗi và giao người cho từng điều đổi khác.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI viết nháp và gợi ý; bạn giữ phạm vi, cam kết, con số và trách nhiệm.",
          "Chặng này khép lại ở đây: bạn đã đi hết vòng điều phối một dự án nhỏ.",
        ],
      },
    ],
  },
];
