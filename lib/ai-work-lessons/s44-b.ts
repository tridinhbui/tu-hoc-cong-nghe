import type { Lesson } from "../lesson-types";

// Chặng 44, bài 6-10. Giáo trình: scripts/curriculum/stage-44.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách bấm về nguồn, đối chiếu và ghi lại.
const Q = (question: string, options: string[], explanation: string) => ({ question, options, correct: 0, explanation });

const L6: Lesson = {
  id: 2285,
  slug: "bam-vao-trich-dan-de-ve-trang-goc",
  title: "Chặng 44, Bài 6: Bấm vào trích dẫn để về đúng trang gốc",
  subtitle: "Con số nhỏ cạnh câu trả lời là tấm vé về đoạn gốc. Vé chỉ có giá khi bạn dùng nó.",
  duration: "8 phút",
  difficulty: "Dễ",
  emoji: "🔎",
  track: "personal",
  isFundamental: false,
  whyItMatters:
    "Bạn hỏi trợ lý về bản hợp đồng 30 trang và nhận câu trả lời gọn, kèm mấy con số nhỏ [1], [2]. Nhìn vào thấy yên tâm, nhưng con số nhỏ chỉ nói rằng trợ lý đã chỉ tới một đoạn nào đó. Bấm vào và đọc đoạn ấy mới cho bạn biết đoạn đó có thật sự nói như câu trả lời hay không.",
  openingQuestion:
    "Trợ lý trả lời 'Thời hạn thanh toán là 30 ngày [2]'. Bạn định đưa con số này vào email gửi khách. Việc nên làm trước là gì?",
  openingOptions: [
    "Bấm vào [2], đọc đoạn gốc xem có ghi 30 ngày không",
    "Gửi luôn, vì đã có số [2] nghĩa là trợ lý kiểm rồi",
    "Hỏi lại trợ lý cùng câu đó một lần nữa để so hai câu trả lời",
    "Tìm trên mạng xem hợp đồng loại này thường thanh toán mấy ngày",
  ],
  correctOption: 0,
  explanation:
    "Con số nhỏ là dấu chỉ đường tới đoạn gốc, không phải con dấu xác nhận. Chỉ khi bạn mở đoạn đó ra và thấy chữ '30 ngày' nằm đúng chỗ, câu trả lời mới có căn cứ. Gửi luôn là tin vào dấu chỉ đường. Hỏi lại có thể ra cùng một lỗi. Tìm trên mạng cho biết điều thường gặp, chứ không nói hợp đồng của bạn ghi gì.",
  diagram: [
    { label: "Đọc câu trả lời và các số nhỏ [1], [2]", arrow: true },
    { label: "Bấm số, mở đoạn gốc trong tài liệu", arrow: true },
    { label: "Đọc đoạn gốc bằng mắt mình, so với câu trả lời", arrow: true },
    { label: "Ghi: khớp, lệch, hoặc không tìm thấy" },
  ],
  realWorldExample: {
    company: "Tình huống minh hoạ",
    description:
      "Tình huống minh hoạ: một nhân viên mua hàng hỏi trợ lý về điều khoản bảo hành trong báo giá của nhà cung cấp. Trợ lý trả lời 'bảo hành 24 tháng [3]'. Cô bấm [3] và thấy đoạn gốc ghi 24 tháng cho thân máy, còn linh kiện thay thế chỉ 6 tháng. Nhờ bấm vào, cô đưa cả hai thời hạn vào bảng so sánh thay vì chỉ một.",
  },
  quiz: [
    Q(
      "Câu trả lời có số nhỏ [1], [2] cạnh các ý. Số đó cho bạn cách nào để tự kiểm?",
      [
        "Mở đúng đoạn gốc được chỉ tới và tự đọc xem đoạn đó nói gì",
        "Yên tâm là trợ lý đã kiểm xong, nên chỉ cần đọc lướt",
        "Đếm số nguồn: càng nhiều số thì câu trả lời càng đáng tin hơn hẳn",
        "Chuyển sang xem trợ lý đã dùng bao nhiêu trang tài liệu",
      ],
      "Số nhỏ chỉ chỗ để bạn tự đọc. Nó không chứng minh trợ lý hiểu đúng, nên đọc lướt là bỏ mất phần kiểm. Nhiều số cũng không có nghĩa là đúng: một ý sai vẫn có thể được gắn ba số. Số trang trợ lý dùng không nói gì về việc đoạn đó có khớp ý hay không.",
    ),
    Q(
      "Bạn bấm [3] và đoạn gốc không hề nhắc con số trong câu trả lời. Bạn coi con số đó thế nào?",
      [
        "Chưa có căn cứ, phải tìm lại trong tài liệu",
        "Vẫn đúng, vì trợ lý đã gắn [3] nên chắc là đã đọc kỹ đoạn khác gần đó",
        "Chắc là tổng của vài số khác nên cứ giữ lại, không cần hỏi thêm gì",
        "Đúng, chỉ là nằm ở trang khác nên bỏ qua việc kiểm cho đỡ mất công",
      ],
      "Khi đoạn được chỉ tới không có con số thì con số đó đang lơ lửng. Phải tìm nó trong tài liệu hoặc bỏ nó. Đoán rằng nó nằm gần đó, là tổng của số khác, hay ở trang khác đều là suy đoán chưa ai kiểm, và chính những suy đoán này làm con số sai lọt vào báo cáo.",
    ),
    Q(
      "Một câu trả lời dài có sáu số nhỏ, bạn chỉ có 10 phút. Nên bấm kiểm số nào trước?",
      [
        "Những ý bạn sắp dùng để gửi đi hoặc quyết định việc",
        "Số [1], vì nguồn đầu tiên luôn là nguồn chính của câu trả lời",
        "Số nào đứng cạnh chữ in đậm, vì đó là ý quan trọng nhất của trợ lý",
        "Cả sáu số theo đúng thứ tự, không được bỏ sót số nào dù chỉ một",
      ],
      "Kiểm theo mức rủi ro: ý nào sai sẽ gây hậu quả thì kiểm trước. Thứ tự số không nói gì về độ quan trọng. Chữ đậm do trợ lý chọn theo cách diễn đạt, không theo hậu quả với bạn. Ép mình kiểm đủ sáu số khi hết giờ thường dẫn tới việc kiểm dở rồi bỏ.",
    ),
    Q(
      "Bấm [2] thấy đoạn gốc ở trang 7, trong khi câu trả lời ghi trang 12. Ghi nhận nào đúng?",
      [
        "Vị trí trích dẫn lệch, nên đọc đoạn gốc để biết ý còn đúng không",
        "Không sao, số trang chỉ là chi tiết phụ và nội dung vẫn đúng nên không cần đọc lại đoạn gốc",
        "Trợ lý sai hoàn toàn, nên bỏ cả câu trả lời và hỏi lại từ đầu",
        "Trang 12 chắc là bản khác của tài liệu nên đổi sang đọc bản đó",
      ],
      "Lệch trang là dấu hiệu cần đọc kỹ hơn, chưa đủ để kết luận cả câu sai: nội dung ở trang 7 có thể vẫn khớp ý. Coi trang là chi tiết phụ thì bỏ qua tín hiệu. Bỏ cả câu là phản ứng quá tay. Còn bản khác của tài liệu là điều tự bịa ra chứ không có căn cứ.",
    ),
    Q(
      "Một ý trong câu trả lời không có số trích dẫn nào. Cách xử lý hợp lý là gì?",
      [
        "Hỏi lại, yêu cầu chỉ rõ đoạn nào trong tài liệu nói ý đó",
        "Coi ý đó là đúng, vì các ý khác đều có số và đều khớp cả",
        "Bỏ qua, vì ý không có số chắc chắn là ý phụ không cần kiểm",
        "Xoá ý đó khỏi câu trả lời mà không cần hỏi lý do vì sao thiếu số",
      ],
      "Ý không có số có thể là điều trợ lý suy ra hoặc nói chung chung. Yêu cầu nó chỉ đoạn gốc cho biết ý đó có căn cứ hay không. Các ý khác khớp không bảo đảm ý này khớp. Ý không số có khi lại là ý quan trọng nhất. Xoá thẳng thì mất luôn cơ hội biết ý đó đúng hay sai.",
    ),
  ],
  keyTakeaways: [
    "Số nhỏ là dấu chỉ đường tới đoạn gốc, không phải dấu xác nhận.",
    "Bấm vào và tự đọc đoạn gốc: đó là bước kiểm duy nhất chứng minh được gì.",
    "Kiểm trước những ý sẽ đi vào email, báo cáo hay quyết định.",
    "Ý không có số trích dẫn cần được hỏi lại chứ không được mặc định là đúng.",
    "Ghi kết quả mỗi lần kiểm: khớp, lệch, hoặc không tìm thấy.",
  ],
  practicePrompt: {
    question:
      "Chị Lan hỏi trợ lý về lịch giao hàng và nhận câu trả lời có ba số nhỏ. Chị chỉ kiểm số đầu, thấy khớp, rồi dùng cả ba ý. Chị còn thiếu gì?",
    options: [
      "Bấm và đọc nốt hai số còn lại, ít nhất với ý chị sắp dùng",
      "Không thiếu gì, vì số đầu khớp thì hai số sau cũng khớp theo",
      "Hỏi trợ lý xem nó có chắc chắn về cả ba ý mà chị đang dùng không",
      "Xoá hai số cuối cho câu trả lời gọn rồi đưa vào báo cáo luôn",
    ],
    correct: 0,
    explanation:
      "Mỗi số nhỏ trỏ tới một đoạn riêng, nên một số khớp không nói gì về số khác. Hỏi trợ lý có chắc không thì nó gần như luôn nói chắc. Xoá số làm mất dấu vết để người khác kiểm lại sau.",
  },
  summary: {
    keyIdea: "Trích dẫn cho bạn con đường về nguồn, và việc đi hết con đường ấy vẫn là của bạn.",
    formula: "Câu trả lời + bấm số + đọc đoạn gốc + so với ý = ý có căn cứ.",
    commonMistake: "Thấy có số nhỏ là yên tâm, không bấm vào xem đoạn gốc nói gì.",
    action: "Lần tới trợ lý trả lời kèm số, bấm ít nhất một số và ghi khớp hay lệch.",
  },
  application: {
    title: "Làm ngay trong 15 phút",
    message:
      "Lấy một tài liệu công việc của bạn (hợp đồng, báo giá hoặc quy trình) và đặt cho trợ lý 3 câu hỏi có đáp án nằm rõ trong đó. Với mỗi câu, bấm ít nhất một số trích dẫn, ghi vào ghi chú: khớp, lệch hay không tìm thấy.",
    secondary: "Đánh dấu câu nào có trích dẫn đúng số nhưng đoạn gốc nói khác đi, để làm ví dụ cho bài sau.",
  },
  sections: [
    {
      type: "lead",
      text: "Hai giờ chiều, sếp hỏi 'thời hạn bảo hành là bao lâu?'. Trợ lý trả lời ngay, kèm một con số nhỏ. Bài này dạy bạn thói quen 30 giây: bấm số nhỏ, đọc đoạn gốc, rồi mới trả lời sếp.",
    },
    {
      type: "feynman",
      title: "Trích dẫn đơn giản hơn bạn nghĩ",
      intro: "Hãy nghĩ tới một bài báo có chú thích cuối trang: 'xem sách X, trang 45'. Chú thích chỉ cho bạn chỗ để tra, nó không tự chứng minh điều bài báo viết là đúng. Muốn biết, bạn phải mở trang 45 ra đọc.",
      columns: ["Thành phần", "Chú thích trong sách", "Trích dẫn của trợ lý"],
      rows: [
        ["Dấu chỉ đường", "Số chú thích, trang", "Số nhỏ [1], [2] cạnh câu trả lời"],
        ["Nơi tra", "Trang sách được nêu", "Đoạn trong tài liệu bạn đã tải lên"],
        ["Người kiểm", "Người đọc chịu khó", "Bạn, bằng mắt của mình"],
        ["Khi lệch", "Chú thích chép nhầm số trang", "Số trỏ tới đoạn không nói ý đó"],
      ],
      oneLiner: "Trích dẫn là chỗ để bạn tra, không phải bằng chứng đã tra xong.",
    },
    { type: "heading", text: "Hai giây thấy yên tâm, ba mươi giây thấy sự thật" },
    {
      type: "paragraph",
      text: "Số nhỏ làm câu trả lời trông có căn cứ, và cảm giác yên tâm đến trong hai giây. Bấm vào số ấy và đọc đoạn gốc mất chừng ba mươi giây. Trợ lý có thể chỉ tới một đoạn có liên quan chung chung mà không nói đúng ý đã viết. Vì vậy hãy làm quen với việc bấm, chứ đừng chỉ nhìn.",
    },
    {
      type: "flow",
      title: "Từ số nhỏ về đoạn gốc",
      steps: [
        { label: "Chọn ý cần kiểm", detail: "Ưu tiên ý sẽ đi vào email, báo cáo hoặc quyết định. Ý chỉ để tham khảo có thể kiểm sau." },
        { label: "Bấm số nhỏ", detail: "Công cụ mở đoạn hoặc trang được chỉ tới. Nếu không mở được, ghi lại là 'không tra được' chứ đừng bỏ qua." },
        { label: "Đọc đoạn gốc bằng mắt mình", detail: "Tìm đúng con số, tên hoặc điều kiện trong câu trả lời. Đọc cả câu trước và câu sau đó để không hiểu lệch." },
        { label: "So sánh", detail: "Đoạn gốc nói đúng ý, nói khác đi, hay không nhắc tới điều đó? Chỉ ba khả năng này." },
        { label: "Ghi kết quả", detail: "Một dòng: câu trả lời nào, số nào, khớp hay lệch. Người khác đọc lại sẽ biết bạn đã kiểm gì." },
      ],
    },
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bấm từng số: đoạn nào có căn cứ?",
      task: "Bạn hỏi trợ lý về một báo giá thiết bị văn phòng. Dưới đây là câu trả lời, mỗi đoạn kèm số trích dẫn. Giả sử bạn đã bấm từng số và đối chiếu: bấm vào các đoạn có vấn đề rồi nộp.",
      segments: [
        { text: "Báo giá gồm 10 máy in với đơn giá 4,5 triệu đồng mỗi máy [1]." },
        { text: "Giá đã bao gồm thuế giá trị gia tăng [2].", error: "Bấm [2] thì đoạn gốc chỉ ghi 'giá chưa bao gồm thuế'. Câu trả lời nói ngược với nguồn." },
        { text: "Thời gian giao hàng là 14 ngày làm việc kể từ ngày đặt cọc [3]." },
        { text: "Nhà cung cấp cam kết đổi máy mới trong vòng 30 ngày nếu máy lỗi [4].", error: "Đoạn được trích chỉ nói 'bảo hành sửa chữa', không nhắc gì đến việc đổi máy mới. Cam kết này không có trong báo giá." },
        { text: "Đặt cọc 30% giá trị đơn hàng khi ký xác nhận [5]." },
      ],
    },
    {
      type: "comparison",
      left: {
        label: "Nhìn thấy số nhỏ rồi tin",
        text: "Mất vài giây. Cảm giác có căn cứ nhưng chưa ai đọc đoạn gốc. Nếu trích dẫn trỏ sai hoặc câu trả lời nói ngược nguồn, lỗi vẫn nằm nguyên trong email của bạn.",
      },
      right: {
        label: "Bấm số và tự đọc đoạn gốc",
        text: "Mất chừng ba mươi giây mỗi ý. Bạn thấy chính chữ trong tài liệu, biết ý nào khớp, ý nào lệch và có dòng ghi chú để chứng minh mình đã kiểm.",
      },
    },
    {
      type: "callout",
      label: "Kiểm theo mức rủi ro",
      text: "Không cần bấm mọi số của mọi câu trả lời. Ý sẽ đi vào email gửi khách, báo cáo, hoặc quyết định tiền bạc thì bấm hết. Điều liên quan tới pháp lý hoặc thuế thì hỏi bộ phận pháp chế hoặc kế toán trưởng, không chỉ dựa vào trợ lý.",
    },
    {
      type: "scenario",
      title: "Câu trả lời gấp cho sếp",
      start: "s1",
      nodes: {
        s1: {
          text: "Sếp nhắn: 'Nhà cung cấp cho trả chậm bao nhiêu ngày?'. Trợ lý trả lời '45 ngày [2]'. Bạn có 5 phút.",
          choices: [
            { label: "Trả lời sếp ngay '45 ngày', vì có số [2]", next: "bad1" },
            { label: "Bấm [2], đọc đoạn gốc rồi mới trả lời", next: "s2" },
          ],
        },
        bad1: {
          text: "Sếp báo lại phòng tài chính lịch trả tiền theo 45 ngày. Đoạn gốc thật ra ghi 45 ngày là thời hạn giao hàng, còn trả chậm là 15 ngày. Tuần sau công ty trả trễ.",
          ending: "bad",
        },
        s2: {
          text: "Đoạn gốc ghi: 'giao hàng trong 45 ngày; thanh toán trong 15 ngày kể từ ngày giao'. Câu trả lời của trợ lý nhầm hai con số.",
          choices: [
            { label: "Trả lời sếp '15 ngày kể từ ngày giao, 45 ngày là thời hạn giao hàng', kèm trang", next: "good" },
            { label: "Trả lời '45 ngày' cho đơn giản, vì sếp không quan tâm chi tiết", next: "bad2" },
          ],
        },
        bad2: {
          text: "Bạn đã thấy con số đúng mà vẫn nói con số sai. Sếp lên kế hoạch dòng tiền theo 45 ngày.",
          ending: "bad",
        },
        good: {
          text: "Sếp có con số đúng và biết nó nằm ở trang nào. Bạn còn ghi một dòng vào ghi chú: 'trợ lý nhầm hạn giao với hạn trả'.",
          ending: "good",
        },
      },
    },
    {
      type: "list",
      items: [
        "Bước 1 - Chọn ý sẽ được dùng thật trong câu trả lời.",
        "Bước 2 - Bấm số nhỏ và đọc đoạn gốc, cả câu trước và câu sau.",
        "Bước 3 - Ghi khớp, lệch hoặc không tìm thấy.",
        "Bước 4 - Ý không có số thì hỏi lại để trợ lý chỉ rõ đoạn nào.",
      ],
    },
    {
      type: "closing",
      lines: [
        "Số nhỏ chỉ đường; bạn là người đi và đọc.",
        "Bài sau: khi trích dẫn có thật nhưng ý trả lời vẫn sai.",
      ],
    },
  ],
};

const L7: Lesson = {
  id: 2286,
  slug: "trich-dan-dung-cho-nhung-y-tra-loi-sai",
  title: "Chặng 44, Bài 7: Trích dẫn đúng chỗ nhưng ý trả lời vẫn sai",
  subtitle: "Đoạn gốc có thật, nhưng trợ lý đọc ngược ý. Trích dẫn đúng chỗ chưa đủ để yên tâm.",
  duration: "8 phút",
  difficulty: "Dễ",
  emoji: "🪞",
  track: "personal",
  isFundamental: false,
  whyItMatters:
    "Bạn đã bấm vào số trích dẫn, thấy đoạn gốc nằm đúng trang và có đủ các từ khoá, nên thở phào. Nhưng một đoạn có thật vẫn có thể bị hiểu ngược: 'không được phép' thành 'được phép', 'trừ trường hợp A' thành 'áp dụng cho A'. Bài này dạy bạn đọc lại đoạn gốc để kiểm ý, không chỉ kiểm chỗ.",
  openingQuestion:
    "Trợ lý nói 'Khách được hoàn tiền trong 7 ngày [1]'. Bạn bấm [1] và thấy đúng đoạn nói về hoàn tiền, có chữ '7 ngày'. Bạn nên làm gì tiếp?",
  openingOptions: [
    "Đọc cả câu để xem '7 ngày' đứng với điều kiện nào",
    "Dùng luôn vì đã thấy đúng đoạn và đúng con số",
    "Hỏi trợ lý lần nữa xem nó có giữ nguyên câu trả lời không",
    "Chụp đoạn gốc gửi sếp và nhờ sếp đọc thay cho bạn",
  ],
  correctOption: 0,
  explanation:
    "Con số và từ khoá khớp mới là tín hiệu đầu tiên. Đoạn gốc có thể ghi 'khách được hoàn tiền trong 7 ngày nếu chưa mở niêm phong', và nếu thiếu điều kiện đó thì câu trả lời vẫn sai. Dùng luôn là dừng ở tín hiệu đầu. Hỏi lại thường nhận cùng một câu. Chuyển cho sếp là đẩy việc đọc đi mà chưa tự hiểu đoạn đó.",
  diagram: [
    { label: "Tìm đúng đoạn được trích", arrow: true },
    { label: "Đọc cả câu: điều kiện, ngoại lệ, phủ định", arrow: true },
    { label: "Diễn đạt lại ý của đoạn bằng lời của bạn", arrow: true },
    { label: "So với câu trả lời: cùng ý, khác ý, hay thiếu điều kiện" },
  ],
  realWorldExample: {
    company: "Tình huống minh hoạ",
    description:
      "Tình huống minh hoạ: một nhân viên nhân sự hỏi trợ lý về chính sách nghỉ phép trong sổ tay nhân viên. Trợ lý trả lời 'nhân viên được chuyển 5 ngày phép sang năm sau [2]'. Đoạn [2] có thật và có số 5, nhưng câu gốc viết 'không quá 5 ngày và phải có phê duyệt của quản lý'. Nhân viên đọc lại cả câu nên bổ sung điều kiện phê duyệt trước khi thông báo cho cả phòng.",
  },
  quiz: [
    Q(
      "Bạn bấm số trích dẫn và thấy đúng từ khoá, đúng con số. Vì sao vẫn chưa nên kết luận là đúng?",
      [
        "Ý của cả câu gốc có thể khác, vì có điều kiện hoặc ngoại lệ đi kèm con số",
        "Vì trợ lý hay cố tình gắn sai số trích dẫn để đánh lừa người dùng",
        "Vì từ khoá và con số không bao giờ đủ để kết luận điều gì cả",
        "Vì số trích dẫn luôn dẫn tới trang đầu của tài liệu chứ không đúng chỗ",
      ],
      "Từ khoá và con số cho biết đoạn có liên quan, còn ý nằm ở cả câu, gồm điều kiện, ngoại lệ, phủ định. Trợ lý không cố tình đánh lừa, nó chỉ tóm tắt lệch. 'Không bao giờ đủ' là nói quá, vì nhiều khi khớp thật. Số trích dẫn cũng không luôn dẫn về trang đầu.",
    ),
    Q(
      "Đoạn gốc ghi 'không được hoàn tiền sau 7 ngày'. Trợ lý viết 'được hoàn tiền trong 7 ngày'. Kết luận nào đúng?",
      [
        "Ý gần nhau nhưng thiếu điều kiện: phải đọc cả quy định để biết trường hợp nào được",
        "Hai câu cùng nghĩa, nên trích dẫn đúng và câu trả lời dùng được luôn mà không cần đọc thêm quy định nào khác",
        "Trợ lý sai hoàn toàn, vì nó nói ngược lại những gì đoạn gốc viết",
        "Không kết luận được gì nếu không hỏi lại trợ lý giải thích thêm",
      ],
      "Đoạn gốc chỉ nói sau 7 ngày thì không hoàn, còn chuyện trong 7 ngày có điều kiện gì thì đoạn đó chưa nói. Trợ lý suy ra thêm. Coi hai câu cùng nghĩa là bỏ sót phần suy ra. Nói sai hoàn toàn thì quá tay, vì hướng chung khá gần. Hỏi lại trợ lý cũng không thay được việc đọc quy định.",
    ),
    Q(
      "Cách nào giúp bạn phát hiện trợ lý hiểu ngược một đoạn gốc?",
      [
        "Tự diễn đạt lại đoạn gốc bằng lời mình trước, rồi mới so với câu trả lời",
        "Đếm số từ giống nhau giữa đoạn gốc và câu trả lời của trợ lý, càng trùng nhiều từ thì càng đúng ý",
        "Kiểm xem câu trả lời có đủ lịch sự và rõ ràng để đọc hay không",
        "Hỏi trợ lý có chắc mình hiểu đúng đoạn gốc không rồi tin vào câu đó",
      ],
      "Tự diễn đạt lại buộc bạn hiểu đoạn gốc trước khi bị câu trả lời dẫn dắt, nên lệch ý lộ ra. Đếm từ giống không cho biết ý: câu 'được' và 'không được' gần như trùng từ. Lịch sự, rõ ràng không liên quan tới đúng. Trợ lý gần như luôn đáp là chắc chắn.",
    ),
    Q(
      "Đoạn gốc có chữ 'trừ trường hợp hợp đồng có thoả thuận khác'. Trợ lý bỏ cụm này đi. Nên ghi lại thế nào?",
      [
        "Thiếu ngoại lệ: câu trả lời chỉ đúng khi hợp đồng không quy định khác",
        "Không sao, vì ngoại lệ hiếm khi xảy ra nên bỏ đi cho gọn và người đọc đỡ bị rối",
        "Đúng hoàn toàn, vì cụm 'trừ trường hợp' chỉ là văn phong hành chính",
        "Sai hoàn toàn, nên bỏ cả câu trả lời và không dùng nữa",
      ],
      "Bỏ ngoại lệ là kiểu lệch ý rất hay gặp: câu còn nghe đúng nhưng chỉ đúng trong một số trường hợp. Ngoại lệ hiếm hay không là thứ bạn cần biết với hợp đồng của mình. Văn phong hành chính vẫn mang nghĩa. Còn bỏ cả câu là quá tay, vì chỉ cần bổ sung ngoại lệ.",
    ),
    Q(
      "Bạn thấy một câu trả lời trích đúng đoạn nhưng hiểu ngược ý. Việc hữu ích nhất cho lần sau là gì?",
      [
        "Ghi vào ghi chú kiểu lỗi, rồi hỏi lại và yêu cầu trợ lý chép nguyên văn đoạn gốc",
        "Ngừng dùng trợ lý cho mọi tài liệu có điều kiện hoặc ngoại lệ",
        "Nhờ trợ lý xin lỗi và hứa lần sau sẽ đọc kỹ hơn để khỏi sai",
        "Coi như chuyện may rủi, vì lần sau nó sẽ tự đọc đúng mà không cần làm gì thêm, cũng không cần ghi chép lại",
      ],
      "Ghi kiểu lỗi và yêu cầu nguyên văn giúp bạn so từng chữ, nên lần sau lệch ý dễ lộ. Ngừng dùng cho mọi tài liệu là quá rộng. Lời hứa của trợ lý không lưu lại cho lần sau. Coi là may rủi nghĩa là bỏ qua một kiểu lỗi có thể phòng được.",
    ),
  ],
  keyTakeaways: [
    "Trích dẫn đúng chỗ chỉ chứng minh đoạn có thật, chưa chứng minh ý được hiểu đúng.",
    "Đọc cả câu: điều kiện, ngoại lệ và phủ định quyết định ý.",
    "Tự diễn đạt lại đoạn gốc trước khi so với câu trả lời.",
    "Kiểu lỗi hay gặp: bỏ ngoại lệ, đảo phủ định, thêm điều kiện không có.",
    "Hỏi lại và yêu cầu trợ lý chép nguyên văn để so từng chữ.",
  ],
  practicePrompt: {
    question:
      "Anh Nam thấy đoạn gốc ghi 'phí phạt áp dụng khi chậm quá 10 ngày'. Trợ lý viết 'phạt khi chậm 10 ngày'. Anh nên làm gì?",
    options: [
      "Sửa lại thành 'chậm quá 10 ngày' vì 'quá' làm ngày thứ 10 chưa bị phạt",
      "Giữ nguyên, vì hai cách nói chỉ khác nhau một chữ không đáng kể",
      "Hỏi trợ lý lần nữa cho đến khi nó viết đúng chữ 'quá' trong câu",
      "Bỏ luôn con số 10 ngày khỏi báo cáo cho khỏi phải giải thích thêm với sếp",
    ],
    correct: 0,
    explanation:
      "'Quá 10 ngày' và '10 ngày' khác nhau đúng một ngày, và với tiền phạt một ngày là có thật. Chỉ khác một chữ không có nghĩa là không đáng kể. Hỏi lại nhiều lần không bảo đảm đúng hơn việc tự đọc. Bỏ con số đi làm mất thông tin quan trọng.",
  },
  summary: {
    keyIdea: "Trích dẫn đúng chỗ là điều kiện cần; đọc lại cả câu để chắc ý là phần còn lại.",
    formula: "Đoạn gốc + điều kiện + ngoại lệ + phủ định = ý thật, rồi mới so với câu trả lời.",
    commonMistake: "Thấy đúng từ khoá và con số là dừng kiểm, bỏ qua chữ 'không', 'trừ', 'quá'.",
    action: "Lần tới bấm trích dẫn, gạch chân mọi chữ chỉ điều kiện trong đoạn gốc trước khi so.",
  },
  application: {
    title: "Làm ngay trong 15 phút",
    message:
      "Lấy một tài liệu công việc có điều kiện hoặc ngoại lệ (quy định, chính sách, hợp đồng). Hỏi trợ lý 3 câu dạng 'khi nào thì được/không được...'. Với mỗi câu, bấm trích dẫn, viết ý của đoạn gốc bằng lời mình và đánh dấu có thiếu điều kiện hay ngoại lệ nào không.",
    secondary: "Ghi lại câu nào trợ lý bỏ mất chữ 'không', 'trừ', 'quá' hoặc 'tối đa'.",
  },
  sections: [
    {
      type: "lead",
      text: "Bạn đã bấm vào trích dẫn và mọi thứ có vẻ ổn: đúng trang, đúng từ khoá. Nhưng một đoạn có thật vẫn có thể bị hiểu sai, và cảm giác yên tâm lúc này là cảm giác nguy hiểm nhất. Bài này dạy bạn kiểm ý, không chỉ kiểm chỗ.",
    },
    {
      type: "feynman",
      title: "Trích dẫn sai ý đơn giản hơn bạn nghĩ",
      intro: "Hãy nghĩ tới chuyện bạn kể lại lời sếp cho đồng nghiệp: 'sếp bảo mai nộp báo cáo'. Sếp thật sự nói 'nếu khách đồng ý thì mai nộp báo cáo'. Bạn nhắc đúng người, đúng việc, đúng ngày nhưng bỏ mất chữ 'nếu'.",
      columns: ["Thành phần", "Kể lại lời sếp", "Trợ lý tóm tắt đoạn gốc"],
      rows: [
        ["Nguồn có thật", "Sếp đúng là có nói", "Đoạn gốc đúng là có trong tài liệu"],
        ["Chỗ dễ mất", "Chữ 'nếu', 'trừ khi'", "Điều kiện, ngoại lệ, phủ định"],
        ["Cách phát hiện", "Hỏi lại chính xác sếp nói gì", "Đọc lại cả câu gốc"],
        ["Hậu quả", "Nộp báo cáo khi chưa cần", "Dùng quy định sai cho cả phòng"],
      ],
      oneLiner: "Nguồn có thật không bảo đảm ý được chép đủ: hãy soi chữ 'nếu', 'trừ', 'không', 'quá'.",
    },
    { type: "heading", text: "Khi chỗ đúng mà ý sai" },
    {
      type: "paragraph",
      text: "Trợ lý tóm tắt nên phải cắt bớt. Cái bị cắt thường là những chữ nhỏ nhất: 'không', 'trừ', 'tối đa', 'nếu'. Hiện tượng này khó thấy vì trích dẫn vẫn trỏ đúng đoạn. Cách bắt được là diễn đạt lại đoạn gốc bằng lời của bạn trước, rồi mới xem câu trả lời có cùng ý không.",
    },
    {
      type: "flow",
      title: "Kiểm ý sau khi đã kiểm chỗ",
      steps: [
        { label: "Mở đoạn được trích", detail: "Đọc cả câu và hai câu xung quanh. Điều kiện hay ngoại lệ đôi khi nằm ở câu kế bên." },
        { label: "Gạch chân chữ chỉ điều kiện", detail: "Tìm các chữ như 'nếu', 'trừ', 'không', 'quá', 'tối đa', 'trừ khi'. Đây là chỗ hay bị mất." },
        { label: "Viết lại ý bằng lời của bạn", detail: "Một câu, chưa nhìn câu trả lời của trợ lý. Ví dụ: 'Hoàn tiền trong 7 ngày nếu chưa mở niêm phong'." },
        { label: "So hai câu", detail: "Cùng ý, thiếu điều kiện, hay đảo nghĩa? Nếu thiếu thì bổ sung, nếu đảo thì bỏ câu trả lời." },
        { label: "Ghi kiểu lỗi", detail: "Ví dụ 'bỏ ngoại lệ'. Lần sau bạn biết phải soi chỗ nào đầu tiên." },
      ],
    },
    {
      type: "aiLab",
      mode: "spotError",
      title: "Trích dẫn thật nhưng ý có lệch không?",
      task: "Dưới đây là tóm tắt của trợ lý về một chính sách đổi trả. Mỗi đoạn có số trích dẫn thật. Giả sử bạn đã đọc đoạn gốc của từng số: bấm vào những đoạn trợ lý hiểu sai ý rồi nộp.",
      segments: [
        { text: "Khách được đổi sản phẩm trong vòng 14 ngày kể từ ngày nhận hàng [1]." },
        { text: "Sản phẩm đã mở niêm phong vẫn được đổi trả như thường [2].", error: "Đoạn gốc ghi 'sản phẩm đã mở niêm phong không được đổi trả, trừ khi lỗi nhà sản xuất'. Trợ lý bỏ mất phủ định và ngoại lệ." },
        { text: "Phí vận chuyển đổi hàng do công ty chịu khi lỗi thuộc về công ty [3]." },
        { text: "Hàng khuyến mại được đổi tối đa hai lần trong một đơn [4].", error: "Đoạn gốc ghi 'hàng khuyến mại không áp dụng đổi trả'. Con số 'hai lần' không có trong đoạn này." },
        { text: "Yêu cầu đổi trả cần gửi qua email kèm ảnh chụp sản phẩm [5]." },
      ],
    },
    {
      type: "comparison",
      left: {
        label: "Chỉ kiểm chỗ: đúng trang, đúng từ khoá",
        text: "Nhanh và có cảm giác đã kiểm. Nhưng đoạn gốc bị chép thiếu điều kiện hay đảo phủ định thì không ai thấy, vì trang vẫn đúng.",
      },
      right: {
        label: "Kiểm cả ý: viết lại đoạn gốc bằng lời mình",
        text: "Chậm hơn một chút. Bạn bắt được chữ 'không', 'trừ', 'quá' bị mất, và có dòng ghi rõ câu trả lời thiếu điều kiện gì.",
      },
    },
    {
      type: "callout",
      label: "Điều kiện có hậu quả pháp lý",
      text: "Khi đoạn gốc là điều khoản hợp đồng, quy định về thuế hay quyền lợi lao động, đừng tự kết luận từ việc đọc và tóm tắt. Hỏi bộ phận pháp chế, kế toán trưởng hoặc chuyên gia trước khi thông báo cho người khác.",
    },
    {
      type: "scenario",
      title: "Thông báo chính sách cho cả phòng",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn nhờ trợ lý tóm tắt chính sách công tác phí. Nó trả lời 'được thanh toán taxi khi đi công tác [3]'. Bạn bấm [3] và thấy đúng đoạn nói về taxi. Bạn sắp gửi thông báo cho cả phòng.",
          choices: [
            { label: "Gửi luôn, vì đoạn đúng chủ đề taxi", next: "bad1" },
            { label: "Đọc cả câu gốc trước khi gửi", next: "s2" },
          ],
        },
        bad1: {
          text: "Cả phòng đi taxi và nộp hoá đơn. Câu gốc ghi 'taxi chỉ được thanh toán khi đi sân bay sau 22 giờ'. Kế toán từ chối phần lớn hoá đơn.",
          ending: "bad",
        },
        s2: {
          text: "Câu gốc: 'Taxi chỉ được thanh toán khi đi sân bay sau 22 giờ'. Câu của trợ lý thiếu điều kiện.",
          choices: [
            { label: "Sửa thông báo thành đúng điều kiện và ghi số trang", next: "good" },
            { label: "Gửi bản của trợ lý, nhắc 'có thể có điều kiện, xem chính sách'", next: "bad2" },
          ],
        },
        bad2: {
          text: "Mỗi người hiểu điều kiện một kiểu, nhiều người vẫn đi taxi. Bạn phải trả lời hàng chục câu hỏi lẻ.",
          ending: "bad",
        },
        good: {
          text: "Thông báo có đủ điều kiện và trang tham chiếu. Không ai nộp hoá đơn sai, và kế toán cảm ơn vì đã rõ ràng.",
          ending: "good",
        },
      },
    },
    {
      type: "list",
      items: [
        "Bước 1 - Mở đoạn được trích, đọc cả câu và hai câu quanh nó.",
        "Bước 2 - Gạch chân chữ chỉ điều kiện: nếu, trừ, không, quá, tối đa.",
        "Bước 3 - Viết lại ý bằng lời mình rồi mới so với câu trả lời.",
        "Bước 4 - Bổ sung điều kiện còn thiếu hoặc bỏ câu nếu nó đảo nghĩa.",
      ],
    },
    {
      type: "closing",
      lines: [
        "Đúng chỗ là bước một; đúng ý mới là bước hai.",
        "Bài sau: kiểm số liệu trong câu trả lời với bảng gốc.",
      ],
    },
  ],
};

const L8: Lesson = {
  id: 2287,
  slug: "kiem-so-lieu-trong-cau-tra-loi-voi-bang-goc",
  title: "Chặng 44, Bài 8: Kiểm số liệu trong câu trả lời với bảng gốc",
  subtitle: "Một con số trông chắc chắn trong câu trả lời vẫn có thể lệch một hàng hay một cột so với bảng.",
  duration: "10 phút",
  difficulty: "Dễ",
  emoji: "🔢",
  track: "personal",
  isFundamental: false,
  whyItMatters:
    "Bạn hỏi trợ lý 'doanh thu quý 2 là bao nhiêu' từ bảng báo cáo và nhận lại một con số gọn gàng. Số trong bảng nằm ở hàng, cột, đơn vị rất cụ thể, nên trợ lý có thể lấy nhầm hàng, nhầm kỳ hoặc nhầm đơn vị mà câu trả lời vẫn đọc trơn tru. Đối chiếu với bảng gốc là cách duy nhất để biết.",
  openingQuestion:
    "Trợ lý trả lời 'Chi phí marketing quý 3 là 240 triệu đồng'. Bạn cần con số này cho báo cáo. Cách kiểm nhanh và chắc nhất là gì?",
  openingOptions: [
    "Mở bảng gốc, tìm đúng hàng và cột rồi đọc con số",
    "Tính nhẩm xem 240 triệu có nghe hợp lý với quy mô công ty không",
    "Hỏi lại trợ lý và xem nó có cho cùng một con số hay không",
    "Nhờ trợ lý kiểm lại bằng cách tính một lần nữa từ đầu",
  ],
  correctOption: 0,
  explanation:
    "Số liệu cần đối chiếu với nơi nó được ghi: đúng hàng, đúng cột, đúng kỳ và đúng đơn vị. Nghe hợp lý chưa chứng minh gì, vì con số lệch vài phần trăm vẫn nghe hợp lý. Hỏi lại có thể ra cùng một lỗi lấy nhầm hàng. Nhờ tính lại chỉ cho cùng một cách đọc bảng, nên lỗi vẫn còn nguyên.",
  diagram: [
    { label: "Ghi con số trợ lý đưa ra, kèm đơn vị và kỳ", arrow: true },
    { label: "Mở bảng gốc, tìm đúng hàng và đúng cột", arrow: true },
    { label: "Đọc con số trong bảng, so đơn vị và kỳ", arrow: true },
    { label: "Ghi lại: khớp hoặc lệch bao nhiêu, ở đâu" },
  ],
  realWorldExample: {
    company: "Tình huống minh hoạ",
    description:
      "Tình huống minh hoạ: một nhân viên kế hoạch hỏi trợ lý tổng số đơn hàng tháng 5 từ bảng xuất khẩu. Trợ lý trả lời 1.250 đơn. Cô mở bảng gốc và thấy 1.250 là tổng của tháng 4, còn tháng 5 là 1.320. Số bị lấy nhầm cột, nhưng câu trả lời trông hoàn toàn chắc chắn. Cô ghi lại lệch 70 đơn và sửa trước khi lập kế hoạch kho.",
  },
  quiz: [
    Q(
      "Trợ lý nêu doanh thu quý 2 là 3,2 tỷ đồng. Bạn đối chiếu với bảng gốc. Phải khớp những gì?",
      [
        "Con số, đơn vị, kỳ thời gian và đúng hàng trong bảng",
        "Chỉ con số, vì đơn vị và kỳ thường đã hiểu ngầm rồi",
        "Con số và vẻ hợp lý của nó so với các quý trước đó",
        "Chỉ cần con số làm tròn gần đúng là đủ cho báo cáo nội bộ",
      ],
      "Một số có bốn thứ cần khớp: giá trị, đơn vị, kỳ và hàng. Bỏ đơn vị thì 3,2 tỷ và 3,2 triệu khác nhau ba nghìn lần. Hợp lý so với quý trước không phải là khớp với bảng. Làm tròn gần đúng che mất lệch thật, nhất là khi bạn cần con số đối chiếu chính xác.",
    ),
    Q(
      "Bảng ghi 'nghìn đồng', trợ lý viết '450 triệu' từ ô '450.000'. Bạn đánh giá thế nào?",
      [
        "Đúng: 450.000 nghìn đồng là 450 triệu, đơn vị đã được quy đổi đúng",
        "Sai, vì bảng ghi 450.000 và trợ lý đã tự đổi con số đi",
        "Không xác định được, vì mỗi công cụ quy đổi đơn vị theo cách riêng của nó",
        "Sai, vì đơn vị nghìn đồng không thể quy đổi ra triệu đồng được",
      ],
      "450.000 nghìn đồng bằng 450 triệu đồng, nên trợ lý quy đổi đúng. Điều cần làm là đọc dòng đơn vị của bảng, vì đơn vị chính là chỗ lỗi hay xảy ra. Sai vì con số khác nhau thì chưa xét đơn vị. Quy đổi nghìn sang triệu là phép chia cho 1.000 và không phụ thuộc công cụ.",
    ),
    Q(
      "Bảng có cột 'Kế hoạch' và 'Thực tế'. Trợ lý nêu con số 800, bạn thấy 800 ở cột 'Kế hoạch'. Hậu quả là gì?",
      [
        "Nếu bạn hỏi về kết quả thực tế thì con số này sai cột, dù có thật trong bảng",
        "Không có hậu quả, vì con số có trong bảng thì coi là đúng",
        "Trợ lý chắc chắn bịa số, vì 800 không thể nằm ở cột Kế hoạch",
        "Không biết được, vì hai cột luôn cho cùng một ý nghĩa với người đọc",
      ],
      "Con số có trong bảng vẫn có thể thuộc sai cột, nhất là khi kế hoạch và thực tế gần nhau. Nó không bị bịa, nó lấy nhầm cột. Coi có trong bảng là đủ thì bỏ qua lỗi này. Hai cột không bao giờ có cùng ý nghĩa, vì một cột là mục tiêu và một cột là kết quả.",
    ),
    Q(
      "Bạn kiểm 10 con số và thấy 2 lệch. Ghi chú nào hữu ích nhất cho lần sau?",
      [
        "Hai số lệch nằm ở hàng nào, cột nào và lệch bao nhiêu so với bảng",
        "Chỉ ghi 'trợ lý có sai' để nhớ mà cẩn thận hơn lần sau",
        "Xoá hai câu sai khỏi lịch sử để không bị nhìn thấy lại nữa",
        "Ghi tỷ lệ 20% sai rồi không cần ghi con số nào bị sai cụ thể",
      ],
      "Vị trí và mức lệch cho biết lỗi thuộc dạng nào: nhầm hàng, nhầm cột hay nhầm đơn vị. Ghi 'có sai' thì không dùng lại được. Xoá câu sai làm mất bằng chứng. Tỷ lệ 20% không chỉ ra con số nào đã sai, nên lần sau bạn vẫn phải kiểm lại từ đầu.",
    ),
    Q(
      "Trợ lý cộng tổng giúp bạn và ra 1.480. Bảng có 4 số thành phần: 320, 410, 290, 380. Tổng thật là bao nhiêu?",
      [
        "1.400 (= 320 + 410 + 290 + 380), nên con số 1.480 lệch 80",
        "1.480, vì trợ lý đã cộng đúng cả bốn số thành phần",
        "1.350 (= 320 + 410 + 290 + 330), nên con số 1.480 lệch 130",
        "1.500 (làm tròn lên), nên trợ lý chỉ lệch 20 so với bảng",
      ],
      "320 + 410 = 730, cộng 290 được 1.020, cộng 380 được 1.400. Trợ lý nói 1.480 nên lệch 80. Số 1.350 là kết quả của việc đọc nhầm 380 thành 330. Làm tròn 1.500 là một kiểu che lệch: con số được đưa ra là 1.480 chứ không phải 1.500.",
    ),
  ],
  keyTakeaways: [
    "Một con số cần khớp bốn thứ với bảng: giá trị, đơn vị, kỳ và đúng hàng cột.",
    "Con số có trong bảng vẫn có thể thuộc nhầm cột hoặc nhầm kỳ.",
    "Phép tính của trợ lý phải tự cộng lại, không đoán bằng mắt.",
    "Ghi lại vị trí lệch và mức lệch, không chỉ ghi 'có sai'.",
    "Kiểm nhiều con số làm bạn thấy kiểu lỗi trợ lý hay mắc với tài liệu của mình.",
  ],
  practicePrompt: {
    question:
      "Chị Hoa kiểm con số 'lợi nhuận 120 triệu' và thấy 120 nằm trong bảng. Chị bỏ qua dòng tiêu đề bảng ghi 'nghìn đồng'. Lỗi có thể ở đâu?",
    options: [
      "Đơn vị: 120 nghìn đồng chứ không phải 120 triệu đồng",
      "Không có lỗi, vì con số 120 nằm đúng trong bảng là đủ",
      "Bảng bị sai chứ không phải câu trả lời của trợ lý đã đưa",
      "Lỗi ở chữ 'lợi nhuận' vì nó luôn cần viết hoa cho đúng",
    ],
    correct: 0,
    explanation:
      "Đơn vị nằm ở tiêu đề chứ không nằm trong ô, nên rất dễ bị bỏ qua. 120 nghìn và 120 triệu cách nhau 1.000 lần. Con số nằm trong bảng mới chỉ là một phần của việc khớp. Kết luận bảng sai khi chưa kiểm đơn vị là đổ lỗi quá sớm.",
  },
  summary: {
    keyIdea: "Số liệu trong câu trả lời chỉ đáng tin sau khi bạn đối chiếu nó với đúng ô trong bảng gốc.",
    formula: "Con số + đơn vị + kỳ + hàng cột khớp bảng gốc = số liệu đã kiểm.",
    commonMistake: "Thấy con số có trong bảng là dừng, không xem nó ở cột nào và đơn vị nào.",
    action: "Chọn 5 con số trong một câu trả lời và ghi khớp hay lệch cho từng số.",
  },
  application: {
    title: "Làm ngay trong 20 phút",
    message:
      "Lấy một bảng số của bạn (doanh thu, chi phí, chấm công hoặc tồn kho). Hỏi trợ lý 5 câu về con số cụ thể trong bảng. Với mỗi câu, mở bảng gốc, ghi con số trợ lý đưa ra, con số trong bảng, và đánh dấu khớp hay lệch kèm vị trí.",
    secondary: "Đếm xem trong 5 số có mấy số lệch, và lệch theo dạng nào: hàng, cột hay đơn vị.",
  },
  sections: [
    {
      type: "lead",
      text: "Một con số trong câu trả lời trông rất chắc, vì nó có dấu chấm, có đơn vị, có vẻ đã được tính. Bài này dạy bạn đưa con số ra đối chiếu với đúng ô của bảng gốc, trước khi nó đi vào báo cáo.",
    },
    {
      type: "feynman",
      title: "Kiểm số liệu đơn giản hơn bạn nghĩ",
      intro: "Hãy nghĩ tới việc đối chiếu hoá đơn điện với công tơ: bạn không tin con số trên hoá đơn chỉ vì nó in rõ ràng, mà nhìn công tơ xem kỳ này đã chạy bao nhiêu. Con số của trợ lý cũng vậy, công tơ ở đây là bảng gốc.",
      columns: ["Thành phần", "Hoá đơn điện", "Số liệu của trợ lý"],
      rows: [
        ["Con số cần kiểm", "Số kWh trên hoá đơn", "Con số trong câu trả lời"],
        ["Nơi đối chiếu", "Chỉ số trên công tơ", "Ô trong bảng gốc"],
        ["Lỗi hay gặp", "Nhầm kỳ, nhầm công tơ", "Nhầm hàng, cột, đơn vị"],
        ["Khi lệch", "Gọi điện lực hỏi lại", "Ghi vị trí lệch, dùng số trong bảng"],
      ],
      oneLiner: "Số liệu phải quay về bảng gốc: đúng ô, đúng đơn vị, đúng kỳ.",
    },
    { type: "heading", text: "Bốn chỗ con số hay lệch" },
    {
      type: "paragraph",
      text: "Con số lệch thường không phải do trợ lý bịa, mà do lấy nhầm. Nhầm hàng (lấy quý 1 thay vì quý 2), nhầm cột (kế hoạch thay vì thực tế), nhầm đơn vị (nghìn thay vì triệu), hoặc cộng sai. Bốn dạng này đều nhìn hợp lý, nên chỉ có đối chiếu mới phát hiện được.",
    },
    {
      type: "chart",
      title: "Càng kiểm nhiều con số, càng thấy nhiều chỗ lệch",
      caption: "Số liệu minh hoạ: giả sử một tỷ lệ con số trong câu trả lời bị lệch so với bảng gốc. Kéo thanh trượt để thấy chỉ kiểm một con số thì bỏ sót gần hết chỗ lệch.",
      kind: "line",
      xLabel: "Số con số bạn kiểm",
      yLabel: "Số chỗ lệch tìm thấy",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "rate", label: "Tỷ lệ con số bị lệch (minh hoạ)", min: 5, max: 30, step: 1, value: 15, unit: "%" }],
      series: [
        { label: "Kiểm từng con số một", expr: "x * rate / 100" },
        { label: "Chỉ kiểm con số đầu tiên", expr: "min(x, 1) * rate / 100" },
      ],
    },
    {
      type: "aiLab",
      mode: "spotError",
      title: "Đối chiếu với bảng gốc",
      task: "Bảng gốc (đơn vị triệu đồng): Doanh thu Q1 = 820, Q2 = 910, Q3 = 880; Chi phí Q2 = 640. Trợ lý đã viết bản tóm tắt sau. Bấm vào những câu có số liệu không khớp bảng rồi nộp.",
      segments: [
        { text: "Doanh thu quý 2 đạt 910 triệu đồng." },
        { text: "Doanh thu quý 3 đạt 980 triệu đồng, tăng so với quý 2.", error: "Bảng ghi doanh thu quý 3 là 880 triệu, thấp hơn quý 2 (910). Con số 980 không có trong bảng và hướng tăng là sai." },
        { text: "Chi phí quý 2 là 640 triệu đồng." },
        { text: "Lợi nhuận quý 2 là 370 triệu đồng.", error: "910 - 640 = 270, không phải 370. Phép trừ bị sai một trăm." },
      ],
    },
    {
      type: "comparison",
      left: {
        label: "Đối chiếu đúng ô",
        text: "Bạn thấy con số gốc, đơn vị ghi ở tiêu đề và kỳ đang xét. Sai hàng, sai cột hay sai đơn vị đều lộ ra, và bạn biết lệch bao nhiêu.",
      },
      right: {
        label: "Đánh giá 'nghe hợp lý'",
        text: "Nhanh nhưng không chứng minh gì: con số lệch vài phần trăm vẫn nghe hợp lý. Báo cáo mang số lệch đó đi tiếp mà không ai biết.",
      },
    },
    {
      type: "callout",
      label: "Phép tính cũng cần kiểm",
      text: "Tổng, chênh lệch, phần trăm do trợ lý tính đều có thể sai. Hãy tự cộng lại bằng máy tính hoặc bảng tính. Số liệu đi vào báo cáo tài chính, thuế hay thưởng nhân viên thì nhờ kế toán trưởng hoặc chuyên gia xác nhận.",
    },
    {
      type: "scenario",
      title: "Con số cho buổi họp 9 giờ",
      start: "s1",
      nodes: {
        s1: {
          text: "Trợ lý nói chi phí vận chuyển tháng 6 là 85 triệu đồng. Bạn cần con số này cho buổi họp lúc 9 giờ, còn 20 phút.",
          choices: [
            { label: "Đưa vào slide luôn vì con số nghe hợp lý", next: "bad1" },
            { label: "Mở bảng gốc, tìm hàng 'Vận chuyển' và cột tháng 6", next: "s2" },
          ],
        },
        bad1: {
          text: "Trong họp, kế toán hỏi lại và bảng ghi 58 triệu. Con số bị đảo hai chữ số, và bạn mất uy tín trước cả phòng.",
          ending: "bad",
        },
        s2: {
          text: "Bạn thấy bảng ghi 58 triệu ở cột tháng 6. Trợ lý đã đảo hai chữ số.",
          choices: [
            { label: "Dùng 58 triệu, ghi chú 'trợ lý đọc 85, bảng ghi 58'", next: "good" },
            { label: "Dùng 85 cho đỡ phải sửa slide, vì chênh lệch cũng không nhiều", next: "bad2" },
          ],
        },
        bad2: {
          text: "Chênh lệch 27 triệu làm báo cáo chi phí quý lệch và phải sửa lại sau họp.",
          ending: "bad",
        },
        good: {
          text: "Slide có con số đúng. Bạn còn ghi lại kiểu lỗi 'đảo chữ số' để lần sau kiểm kỹ các số có hai chữ số gần nhau.",
          ending: "good",
        },
      },
    },
    {
      type: "list",
      items: [
        "Bước 1 - Ghi con số, đơn vị và kỳ mà trợ lý đưa ra.",
        "Bước 2 - Mở bảng gốc, tìm đúng hàng và đúng cột.",
        "Bước 3 - Đọc đơn vị ở tiêu đề bảng và so với câu trả lời.",
        "Bước 4 - Tự cộng lại các phép tính và ghi vị trí, mức lệch.",
      ],
    },
    {
      type: "closing",
      lines: [
        "Số liệu chỉ đáng tin khi quay về bảng gốc và khớp từng ô.",
        "Bài sau: khi tài liệu là bản scan hoặc PDF xấu, đọc được đến đâu?",
      ],
    },
  ],
};

const L9: Lesson = {
  id: 2288,
  slug: "tai-lieu-scan-anh-chup-va-pdf-xau-doc-duoc-den-dau",
  title: "Chặng 44, Bài 9: Tài liệu scan, ảnh chụp, PDF xấu: đọc được đến đâu",
  subtitle: "Bản scan lệch và nhoè vẫn hỏi được, nhưng chữ bị đọc sai thì câu trả lời sai theo.",
  duration: "10 phút",
  difficulty: "Dễ",
  emoji: "📷",
  track: "personal",
  isFundamental: false,
  whyItMatters:
    "Hợp đồng ký tay, hoá đơn chụp bằng điện thoại, biên bản scan nghiêng: tài liệu công việc thật hiếm khi sạch sẽ. Công cụ đọc được phần lớn, nhưng chỗ nhoè, chữ viết tay, dấu mờ và con số nhỏ dễ bị đọc sai mà không báo lỗi. Bài này dạy bạn biết chỗ nào nên tin, chỗ nào phải nhìn lại ảnh gốc.",
  openingQuestion:
    "Bạn tải lên hợp đồng scan hơi nhoè và hỏi 'giá trị hợp đồng là bao nhiêu?'. Trợ lý đọc ra một con số. Việc hợp lý nhất là gì?",
  openingOptions: [
    "Nhìn trực tiếp vào ảnh scan, xem chữ số có rõ và khớp không",
    "Tin luôn, vì công cụ đọc chữ trên ảnh rất giỏi và hiếm khi nhầm",
    "Hỏi lại cùng câu hỏi đó ba lần và chọn con số xuất hiện nhiều nhất",
    "Nhờ trợ lý làm rõ ảnh rồi đọc lại con số cho chính xác hơn và dùng luôn",
  ],
  correctOption: 0,
  explanation:
    "Với bản scan, bước đọc chữ từ ảnh có thể nhầm, nhất là với con số: 3 và 8, 1 và 7, dấu phẩy và dấu chấm. Nhìn tận mắt ảnh gốc là cách kiểm duy nhất. Tin luôn là coi việc đọc chữ không bao giờ sai. Hỏi ba lần có thể ra cùng một chữ số bị nhầm cả ba lần. Làm rõ ảnh không tạo thêm chi tiết mà bản scan vốn không có.",
  diagram: [
    { label: "Tải bản scan hoặc ảnh lên, kiểm xem chữ có chọn được không", arrow: true },
    { label: "Hỏi và yêu cầu chỉ rõ vị trí trên trang", arrow: true },
    { label: "Mở ảnh gốc, nhìn tận mắt vùng được trích", arrow: true },
    { label: "Con số hay tên quan trọng thì đọc lại từng ký tự" },
  ],
  realWorldExample: {
    company: "Tình huống minh hoạ",
    description:
      "Tình huống minh hoạ: một nhân viên hành chính chụp hoá đơn bằng điện thoại, ảnh bị bóng đèn làm loá một góc. Trợ lý đọc tổng tiền là 6.480.000 đồng. Khi nhìn lại ảnh, cô thấy số cuối bị loá và có thể là 6.430.000. Cô đối chiếu với tờ hoá đơn giấy còn giữ và sửa lại trước khi nhập kế toán.",
  },
  quiz: [
    Q(
      "Một bản scan bị nhoè ở góc có dòng 'Tổng giá trị'. Vì sao dòng đó cần nhìn lại ảnh gốc?",
      [
        "Chữ nhoè dễ bị đọc nhầm mà câu trả lời vẫn trông chắc chắn",
        "Vì trợ lý không bao giờ đọc được chữ nằm ở góc của trang",
        "Vì tổng giá trị luôn viết bằng font khác nên không thể đọc được",
        "Vì ảnh gốc luôn có nhiều chữ hơn so với phần mà trợ lý đã đọc",
      ],
      "Chữ nhoè dễ bị đọc thành ký tự gần giống, và trợ lý không cảnh báo chỗ nó không chắc. Đọc được chữ ở góc là bình thường. Font khác không phải lý do. Còn số chữ trong ảnh không liên quan: vấn đề là một ký tự đọc sai, chứ không phải thiếu chữ.",
    ),
    Q(
      "Hai cách dùng: A) tải file PDF có chữ chọn được; B) tải ảnh chụp trang giấy. Nhận định nào đúng?",
      [
        "A thường ít lỗi đọc chữ hơn vì chữ đã là văn bản, còn B phải nhận dạng từ ảnh",
        "Hai cách như nhau, vì công cụ luôn đọc ảnh và PDF theo một cách",
        "B luôn chính xác hơn vì ảnh giữ nguyên hình dáng từng chữ trên giấy",
        "A luôn sai vì PDF bị nén nên mất chữ khi đưa vào công cụ",
      ],
      "PDF có chữ chọn được lưu sẵn văn bản, nên ít bước đoán hơn. Ảnh chụp phải qua bước nhận dạng chữ nên dễ nhầm hơn, nhất là khi ảnh mờ. Hai cách không giống nhau. Ảnh không bảo đảm chính xác hơn, và PDF thường không mất chữ vì nén.",
    ),
    Q(
      "Bạn hỏi ba câu về bản scan. Câu nào rủi ro nhất cần kiểm lại ảnh?",
      [
        "Con số tiền và tên bên ký trong phần nhoè",
        "Tiêu đề của tài liệu nằm ở đầu trang đầu tiên của bản scan",
        "Chủ đề chung của tài liệu là hợp đồng mua bán hay hợp đồng thuê",
        "Số trang của tài liệu trong chân trang của bản scan có rõ nét",
      ],
      "Con số tiền và tên người ký là những chi tiết một ký tự sai cũng đổi nghĩa, lại nằm ở vùng nhoè. Tiêu đề chữ lớn, chủ đề chung và số trang ít rủi ro hơn, vì có nhiều dấu hiệu khác xác nhận cho chúng. Hãy dồn công sức kiểm vào chỗ hậu quả lớn.",
    ),
    Q(
      "Trợ lý nói 'tôi không đọc rõ dòng này'. Phản ứng nào hữu ích?",
      [
        "Tự nhìn ảnh gốc đọc dòng đó, nhập lại bằng tay nếu cần dùng",
        "Bảo trợ lý cứ đoán giúp, rồi dùng câu đoán làm câu trả lời",
        "Bỏ dòng đó và kết luận luôn rằng tài liệu không có nội dung này",
        "Chụp lại ảnh nhoè hơn nữa cho công cụ tự lọc nhiễu tốt hơn",
      ],
      "Khi công cụ nói không đọc rõ thì đó là tín hiệu trung thực, và người đọc được tốt nhất là bạn. Bắt nó đoán là tạo ra con số bịa. Bỏ dòng và kết luận tài liệu không có là sai sự thật. Ảnh nhoè hơn chỉ tệ hơn.",
    ),
    Q(
      "Bạn cần bản scan đáng tin hơn cho lần sau. Việc đơn giản nào giúp nhiều nhất?",
      [
        "Scan thẳng, đủ sáng, không bóng loá, độ phân giải đủ rõ để chữ không nhoè",
        "Chụp nhỏ lại để cả trang vừa khung, vì ảnh càng nhỏ thì càng gọn",
        "Thêm bộ lọc làm đẹp cho ảnh để màu chữ nổi bật và ảnh trông rõ",
        "Gửi nhiều lần để công cụ có nhiều cơ hội đọc đúng hơn lần trước",
      ],
      "Chất lượng ảnh quyết định bước đọc chữ: thẳng, sáng, không loá, đủ nét. Ảnh thu nhỏ làm chữ mất nét. Bộ lọc làm đẹp thường làm mất chi tiết. Gửi nhiều lần cùng một ảnh vẫn cho cùng một lỗi đọc.",
    ),
  ],
  keyTakeaways: [
    "Bản scan và ảnh chụp qua bước đọc chữ từ ảnh, bước này có thể nhầm mà không báo.",
    "Con số, tên riêng, ngày tháng là chỗ phải nhìn lại ảnh gốc.",
    "PDF có chữ chọn được ít rủi ro hơn ảnh chụp.",
    "Công cụ nói 'không đọc rõ' là tín hiệu đáng quý, đừng bắt nó đoán.",
    "Ảnh thẳng, sáng, không loá làm giảm lỗi ngay từ đầu.",
  ],
  practicePrompt: {
    question:
      "Anh Tú có hoá đơn scan, trợ lý đọc 'Ngày 18/03'. Ảnh ở góc hơi mờ, anh không chắc là 18 hay 13. Anh nên làm gì?",
    options: [
      "Nhìn ảnh gốc hoặc hoá đơn giấy để xác định ngày đó",
      "Dùng 18 vì trợ lý đọc ra 18 là có cơ sở của nó, nên khỏi kiểm",
      "Chọn 13 vì anh nghĩ con số 13 có vẻ hợp lý hơn với lịch",
      "Bỏ ngày đó khỏi hồ sơ cho khỏi phải quyết định giữa hai số",
    ],
    correct: 0,
    explanation:
      "Hai con số nhìn gần giống thì chỉ ảnh gốc hoặc tờ giấy gốc quyết định được. Dùng số của trợ lý là tin vào bước đọc dễ nhầm. Chọn theo cảm giác của mình cũng là đoán. Bỏ ngày làm hồ sơ thiếu thông tin quan trọng.",
  },
  summary: {
    keyIdea: "Tài liệu xấu vẫn hỏi được, nhưng chỗ nhoè và con số quan trọng phải được nhìn lại bằng mắt bạn.",
    formula: "Bản scan + câu hỏi + nhìn lại ảnh gốc ở chỗ quan trọng = câu trả lời dùng được.",
    commonMistake: "Tin bước đọc chữ từ ảnh tuyệt đối và bỏ qua con số ở vùng nhoè.",
    action: "Với mỗi bản scan, nhìn lại ảnh ở mọi con số và tên riêng trước khi dùng.",
  },
  application: {
    title: "Làm ngay trong 15 phút",
    message:
      "Chọn một tài liệu scan hoặc ảnh chụp có thật của bạn (hoá đơn, biên bản hoặc hợp đồng). Hỏi trợ lý 3 câu về con số và tên riêng trong đó. Với mỗi câu, nhìn lại ảnh gốc và ghi khớp hay lệch, kèm vùng ảnh bị mờ nếu có.",
    secondary: "Thử chụp lại một trang cho thẳng và đủ sáng, so xem kết quả đọc có khác đi không.",
  },
  sections: [
    {
      type: "lead",
      text: "Không phải tài liệu nào cũng là file sạch. Hợp đồng ký tay, hoá đơn chụp lệch, biên bản scan nhoè: bạn vẫn hỏi được. Bài này dạy bạn biết chỗ nào công cụ thường đọc đúng và chỗ nào phải tự nhìn lại.",
    },
    {
      type: "feynman",
      title: "Đọc tài liệu xấu đơn giản hơn bạn nghĩ",
      intro: "Hãy nghĩ tới việc nhờ người bạn đọc hộ chữ trên tờ giấy nhàu: họ đọc được phần lớn, nhưng chỗ chữ mờ họ có thể đọc thành chữ na ná mà không nói cho bạn. Nếu tờ giấy nằm trong tay, bạn chỉ cần liếc lại chỗ quan trọng.",
      columns: ["Thành phần", "Nhờ bạn đọc tờ giấy nhàu", "Công cụ đọc bản scan"],
      rows: [
        ["Chỗ đọc tốt", "Chữ to, rõ, dòng thẳng", "Chữ in rõ, ảnh thẳng, đủ sáng"],
        ["Chỗ dễ nhầm", "Chữ mờ, nhàu, viết tay", "Số nhoè, chữ viết tay, dấu mờ"],
        ["Cách kiểm", "Tự liếc lại tờ giấy", "Nhìn lại ảnh gốc ở chỗ quan trọng"],
        ["Khi không chắc", "Bạn nói 'chỗ này tôi không rõ'", "Công cụ báo không đọc rõ, hoặc đoán"],
      ],
      oneLiner: "Công cụ đọc được phần lớn, còn chỗ mờ và con số quan trọng thì bạn nhìn lại ảnh gốc.",
    },
    { type: "heading", text: "Đọc chữ từ ảnh là một bước riêng, và nó có thể nhầm" },
    {
      type: "paragraph",
      text: "Với bản scan, công cụ trước hết phải nhận ra từng chữ trong ảnh, rồi mới trả lời câu hỏi. Bước nhận chữ có thể nhầm 3 thành 8, dấu phẩy thành dấu chấm, hay bỏ sót một dòng ở mép giấy. Sau đó câu trả lời dựa trên chữ đã nhầm và vẫn rất trôi chảy, nên bạn không thấy lỗi nếu không nhìn lại ảnh.",
    },
    {
      type: "flow",
      title: "Từ bản scan tới câu trả lời đã kiểm",
      steps: [
        { label: "Chuẩn bị bản tốt nhất", detail: "Scan thẳng, đủ sáng, không bóng loá. Có file PDF gốc thì dùng file đó thay vì ảnh chụp." },
        { label: "Hỏi và xin chỉ vị trí", detail: "Yêu cầu nói rõ thông tin nằm ở trang nào, dòng nào để bạn tìm lại trên ảnh." },
        { label: "Nhìn lại ảnh ở chỗ quan trọng", detail: "Con số tiền, ngày tháng, tên riêng, số hợp đồng: đọc lại từng ký tự bằng mắt mình." },
        { label: "Gặp chỗ không rõ", detail: "Nếu công cụ báo không đọc rõ, đừng bắt nó đoán. Tự đọc hoặc hỏi người giữ bản gốc." },
        { label: "Ghi chú độ chắc chắn", detail: "Đánh dấu: đã nhìn lại ảnh, hoặc chưa. Người đọc sau biết chỗ nào còn nghi ngờ." },
      ],
    },
    {
      type: "aiLab",
      mode: "prompt",
      title: "Hỏi về hợp đồng scan nhoè",
      task: "Bạn có một hợp đồng scan hơi nghiêng, vài con số bị nhoè. Lắp câu hỏi để trợ lý đọc được nhiều nhất và không bịa chỗ nhoè.",
      parts: [
        {
          id: "what",
          label: "Điều cần hỏi",
          options: [
            { text: "Tóm tắt hợp đồng này cho tôi.", feedback: "Quá rộng: trợ lý lướt qua cả những chỗ nhoè và viết một bản tóm tắt trơn tru, bạn không biết chỗ nào đọc chưa chắc." },
            { text: "Cho biết giá trị hợp đồng, ngày hiệu lực và tên bên B; nói rõ nằm ở trang nào.", good: true, feedback: "Ba mục cụ thể kèm vị trí: bạn biết nhìn lại chỗ nào trên ảnh để kiểm." },
          ],
        },
        {
          id: "blur",
          label: "Xử lý chỗ nhoè",
          options: [
            { text: "Chỗ nào không đọc rõ thì cứ đoán cho hợp lý.", feedback: "Bạn vừa bảo trợ lý bịa: con số đoán được viết ra với giọng chắc chắn như số đọc được." },
            { text: "Chỗ nào không đọc rõ thì ghi 'không rõ', không được đoán.", good: true, feedback: "Chỗ nhoè hiện ra thành chỗ trống để bạn tự nhìn, thay vì biến thành con số bịa." },
          ],
        },
        {
          id: "check",
          label: "Cách trả về",
          options: [
            { text: "Chỉ cần trả lời ngắn gọn, không cần kèm gì khác.", feedback: "Không có vị trí, bạn phải lục cả hợp đồng để kiểm từng con số." },
            { text: "Mỗi mục kèm đoạn chữ gốc đọc được và độ chắc: chắc, hơi mờ, hoặc không rõ.", good: true, feedback: "Bạn đối chiếu nhanh được chữ trích với ảnh và biết mục nào ưu tiên xem lại." },
          ],
        },
      ],
      responses: [
        {
          requires: ["what", "blur", "check"],
          text: "1. Giá trị hợp đồng (trang 1): 'ba trăm hai mươi triệu đồng' - hơi mờ ở số cuối, hãy nhìn lại ảnh.\n2. Ngày hiệu lực (trang 2): không rõ, dòng bị nhoè.\n3. Bên B (trang 1): 'Công ty TNHH ...' - tên sau đó không đọc rõ.",
        },
        {
          requires: ["what"],
          text: "Giá trị hợp đồng: 320.000.000 đồng. Ngày hiệu lực: 01/07. Bên B: Công ty TNHH Minh Long.\n\n(Đầy đủ và trơn tru, nhưng ngày và tên công ty ở chỗ nhoè có thể là chữ trợ lý đoán.)",
        },
        {
          text: "Đây là hợp đồng mua bán thiết bị giữa hai công ty, có giá trị khoảng ba trăm triệu, thời hạn một năm và điều khoản thanh toán hai đợt.\n\n(Tóm tắt chung chung, có chi tiết tự thêm và không chỉ vị trí để kiểm.)",
        },
      ],
    },
    {
      type: "comparison",
      left: {
        label: "File PDF có chữ chọn được",
        text: "Chữ đã là văn bản, ít bước đoán hơn. Số thường khớp hơn. Vẫn cần kiểm ý như mọi tài liệu khác.",
      },
      right: {
        label: "Ảnh chụp hoặc bản scan",
        text: "Phải nhận chữ từ ảnh: nhoè, nghiêng, loá sáng, chữ viết tay đều gây nhầm. Con số và tên riêng cần nhìn lại ảnh gốc.",
      },
    },
    {
      type: "callout",
      label: "Tài liệu quan trọng thì giữ bản gốc",
      text: "Với hợp đồng hoặc hồ sơ pháp lý, bản scan nhoè không thay được bản gốc. Chữ ký, dấu mộc, con số viết tay do người có trách nhiệm xác nhận. Điều khoản có hậu quả pháp lý thì hỏi bộ phận pháp chế.",
    },
    {
      type: "scenario",
      title: "Hợp đồng scan nghiêng và nhoè",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn có hợp đồng scan nghiêng, hai con số bị nhoè. Bạn hỏi giá trị hợp đồng và trợ lý đọc '280 triệu đồng'. Bạn cần đưa số này vào bảng theo dõi.",
          choices: [
            { label: "Nhập 280 triệu luôn vào bảng theo dõi", next: "bad1" },
            { label: "Mở ảnh scan và nhìn lại dòng giá trị", next: "s2" },
          ],
        },
        bad1: {
          text: "Ba tuần sau kế toán phát hiện hợp đồng ghi 230 triệu, chữ số 3 đã bị đọc thành 8. Bảng theo dõi và kế hoạch tiền mặt phải làm lại.",
          ending: "bad",
        },
        s2: {
          text: "Dòng giá trị bị nhoè. Bạn thấy chữ số thứ hai có thể là 3 hoặc 8 và không chắc.",
          choices: [
            { label: "Chọn 280 cho phù hợp với con số trợ lý đọc", next: "bad2" },
            { label: "Hỏi bộ phận giữ bản gốc, hoặc xem lại phần viết bằng chữ của hợp đồng", next: "good" },
          ],
        },
        bad2: {
          text: "Bạn đã nhìn thấy sự không chắc mà vẫn chọn theo trợ lý. Con số có thể lệch 50 triệu mà không ai biết.",
          ending: "bad",
        },
        good: {
          text: "Phần viết bằng chữ ghi 'hai trăm ba mươi triệu đồng'. Bạn dùng 230 triệu và ghi chú 'đã đối chiếu với số viết bằng chữ'.",
          ending: "good",
        },
      },
    },
    {
      type: "list",
      items: [
        "Bước 1 - Dùng file PDF chọn được chữ nếu có, không thì scan thẳng và đủ sáng.",
        "Bước 2 - Hỏi từng mục cụ thể kèm vị trí, không hỏi chung chung.",
        "Bước 3 - Dặn: chỗ không đọc rõ thì ghi 'không rõ', không được đoán.",
        "Bước 4 - Nhìn lại ảnh ở mọi con số, ngày và tên riêng.",
      ],
    },
    {
      type: "closing",
      lines: [
        "Tài liệu xấu vẫn dùng được nếu bạn biết chỗ nào phải nhìn lại.",
        "Bài sau: dự án nhỏ, kiểm một câu trả lời đến tận nguồn.",
      ],
    },
  ],
};

const L10: Lesson = {
  id: 2289,
  slug: "du-an-nho-kiem-tra-mot-cau-tra-loi-den-tan-goc",
  title: "Chặng 44, Bài 10: Dự án nhỏ: kiểm một câu trả lời đến tận nguồn",
  subtitle: "Chọn 5 câu trả lời quan trọng, lần theo trích dẫn và lập bảng: đúng, sai một phần, sai.",
  duration: "10 phút",
  difficulty: "Dễ",
  emoji: "🧾",
  track: "personal",
  isFundamental: false,
  whyItMatters:
    "Năm bài qua bạn đã tập từng kỹ năng: bấm trích dẫn, đọc lại cả ý, đối chiếu số liệu, nhìn lại bản scan. Dự án nhỏ này gộp chúng thành một thói quen có bằng chứng: năm câu trả lời quan trọng, mỗi câu một dòng trong bảng, và một kết luận bạn có thể đưa cho đồng nghiệp xem.",
  openingQuestion:
    "Trợ lý vừa trả lời 12 câu hỏi về bộ hồ sơ dự án. Bạn chỉ có 20 phút để kiểm trước khi gửi sếp. Nên bắt đầu thế nào?",
  openingOptions: [
    "Chọn 5 câu sẽ đi vào báo cáo và lập bảng kiểm cho từng câu",
    "Kiểm đều cả 12 câu, mỗi câu hai phút, không bỏ câu nào cho chắc",
    "Kiểm 5 câu đầu tiên vì thường các câu đầu là quan trọng nhất",
    "Nhờ trợ lý tự đánh dấu câu nào nó không chắc rồi chỉ kiểm câu đó",
  ],
  correctOption: 0,
  explanation:
    "Thời gian có hạn thì kiểm theo hậu quả: chọn những câu sẽ đi vào báo cáo hoặc quyết định, rồi ghi kết quả vào bảng để có bằng chứng. Kiểm đều 12 câu mỗi câu hai phút thì không câu nào được kiểm đủ sâu. Câu đầu tiên không có nghĩa là quan trọng nhất. Trợ lý thường sai ngay ở chỗ nó nói rất chắc, nên cần kiểm theo hậu quả chứ không theo độ tự tin của nó.",
  diagram: [
    { label: "Chọn 5 câu trả lời sẽ dùng thật", arrow: true },
    { label: "Mỗi câu: bấm trích dẫn, đọc đoạn gốc, đối chiếu số", arrow: true },
    { label: "Ghi bảng: đúng, sai một phần, sai, không tìm thấy", arrow: true },
    { label: "Sửa câu sai, báo lại nguồn, rồi mới dùng" },
  ],
  realWorldExample: {
    company: "Tình huống minh hoạ",
    description:
      "Tình huống minh hoạ: một trợ lý dự án chuẩn bị báo cáo tiến độ từ ba tài liệu của nhà thầu. Cô chọn 5 câu trả lời quan trọng nhất và lập bảng. Kết quả: 2 đúng, 2 sai một phần do thiếu điều kiện, 1 sai vì nhầm kỳ thanh toán. Cô sửa ba câu và đính kèm bảng kiểm khi gửi, nên sếp biết cả báo cáo đã được kiểm đến đâu.",
  },
  quiz: [
    Q(
      "Bạn có 12 câu trả lời nhưng chỉ kiểm được 5. Tiêu chí chọn hợp lý nhất là gì?",
      [
        "Chọn những câu có hậu quả lớn nhất nếu sai",
        "Chọn 5 câu có câu trả lời dài nhất vì chứa nhiều thông tin",
        "Chọn 5 câu mà trợ lý tỏ ra ít chắc chắn nhất trong câu chữ",
        "Chọn ngẫu nhiên để bảo đảm công bằng giữa các câu hỏi khác nhau",
      ],
      "Hậu quả nếu sai là tiêu chí phản ánh đúng rủi ro của bạn. Câu dài không có nghĩa là quan trọng. Trợ lý thường sai ở câu nó nói rất chắc, nên độ chắc trong câu chữ không đáng làm tiêu chí. Chọn ngẫu nhiên có thể bỏ sót đúng câu sẽ vào báo cáo.",
    ),
    Q(
      "Một câu có 2 ý: ý thứ nhất khớp nguồn, ý thứ hai thiếu một điều kiện. Bạn xếp vào loại nào trong bảng?",
      [
        "Sai một phần, ghi rõ phần nào còn thiếu điều kiện",
        "Đúng, vì ý chính trong câu đã khớp với đoạn gốc của tài liệu",
        "Sai, vì chỉ cần một chỗ thiếu là cả câu trả lời phải bỏ hẳn",
        "Không tìm thấy, vì điều kiện còn thiếu nên chưa biết nguồn nào",
      ],
      "Một ý khớp và một ý thiếu điều kiện đúng là 'sai một phần', và bạn ghi rõ phần nào cần sửa. Xếp đúng thì che mất điều kiện bị thiếu. Xếp sai hoàn toàn thì bỏ cả ý đã khớp. 'Không tìm thấy' dành cho ý không có nguồn nào, ở đây nguồn có thật.",
    ),
    Q(
      "Bảng kiểm gồm cột: câu trả lời, số trích dẫn, đoạn gốc, kết quả. Cột nào giúp đồng nghiệp kiểm lại bạn nhanh nhất?",
      [
        "Đoạn gốc: chép nguyên văn hoặc ghi trang và dòng",
        "Kết quả: chỉ cần ghi chữ 'đúng' hoặc 'sai' cho từng hàng",
        "Số trích dẫn: vì số là thứ duy nhất họ cần để tìm lại nguồn",
        "Câu trả lời: vì nó cho biết trợ lý đã nói gì với bạn trước đó",
      ],
      "Đoạn gốc (hoặc trang và dòng) cho phép người khác mở ra đọc và đồng ý hay không, không phải tin vào kết luận của bạn. Cột kết quả một mình chỉ là ý kiến. Số trích dẫn có thể đổi khi hỏi lại. Câu trả lời thì họ đã có trong tài liệu gốc của trợ lý.",
    ),
    Q(
      "Sau khi kiểm 5 câu, bạn có 2 đúng, 2 sai một phần, 1 sai. Bước tiếp theo hợp lý là gì?",
      [
        "Sửa 3 câu theo đoạn gốc, rồi đính kèm bảng kiểm khi gửi",
        "Gửi cả 5 câu như cũ vì 2 đúng là đủ cho báo cáo này",
        "Xoá 3 câu có vấn đề khỏi báo cáo mà không ghi lại gì cả",
        "Hỏi trợ lý sửa lại, rồi tin câu sửa mà không đọc lại đoạn gốc",
      ],
      "Sửa theo đoạn gốc và đính bảng kiểm cho người nhận thấy báo cáo đã được kiểm đến đâu. Gửi như cũ mang lỗi đã biết đi tiếp. Xoá im lặng làm mất chỗ người khác có thể bổ sung. Trợ lý sửa lại thì câu mới cũng cần kiểm lại như câu cũ.",
    ),
    Q(
      "Bạn muốn biết trợ lý hay sai kiểu nào với tài liệu của mình. Cách nào cho câu trả lời tốt nhất?",
      [
        "Ghi kiểu lỗi ở mỗi câu sai, rồi đếm xem kiểu nào lặp lại nhiều nhất sau vài lần kiểm",
        "Nhớ cảm giác chung là trợ lý sai nhiều hay ít là đủ",
        "Hỏi trợ lý xem nó thường sai ở chỗ nào rồi ghi lại câu trả lời đó",
        "Chỉ đếm tổng số câu sai và bỏ qua việc ghi kiểu lỗi cho đỡ tốn công",
      ],
      "Ghi kiểu lỗi (nhầm cột, bỏ ngoại lệ, đọc sai số) rồi đếm cho bạn bản đồ lỗi dựa trên bằng chứng. Cảm giác chung dễ lệch: bạn nhớ vụ sai lớn và quên vụ nhỏ. Trợ lý tự đánh giá bản thân thì không đáng tin. Tổng số câu sai không cho biết phải soi chỗ nào.",
    ),
  ],
  keyTakeaways: [
    "Kiểm theo hậu quả: chọn những câu sẽ đi vào báo cáo hoặc quyết định.",
    "Mỗi câu một dòng bảng: số trích dẫn, đoạn gốc, kết quả.",
    "Bốn kết quả: đúng, sai một phần, sai, không tìm thấy nguồn.",
    "Đính bảng kiểm khi gửi để người nhận biết báo cáo đã kiểm đến đâu.",
    "Ghi kiểu lỗi để lần sau biết chỗ nào phải soi đầu tiên.",
  ],
  practicePrompt: {
    question:
      "Chị Mai có bảng kiểm 5 câu nhưng cột 'đoạn gốc' bỏ trống vì chị đã đọc rồi. Sếp hỏi chị dựa vào đâu. Điều gì còn thiếu?",
    options: [
      "Trang và dòng của đoạn gốc, để sếp tự mở ra đọc lại được",
      "Một câu nhận xét chung là tất cả đều đã kiểm kỹ lưỡng rồi",
      "Một cột ghi tên trợ lý đã dùng để bảng trông chuyên nghiệp hơn",
      "Không thiếu gì, vì chị đã đọc và kết quả của chị là đủ rồi",
    ],
    correct: 0,
    explanation:
      "Bảng kiểm có giá trị khi người khác kiểm lại được. Nhận xét chung là lời khẳng định, không phải bằng chứng. Tên công cụ không giúp truy nguồn. Việc chị đã đọc không chuyển được sang sếp nếu không có trang và dòng.",
  },
  summary: {
    keyIdea: "Một bảng kiểm năm dòng biến 'tôi tin câu trả lời' thành 'tôi đã kiểm và đây là bằng chứng'.",
    formula: "5 câu quan trọng + số trích dẫn + đoạn gốc + kết quả = bảng kiểm có thể kiểm lại.",
    commonMistake: "Kiểm xong trong đầu, không ghi gì, rồi không ai kiểm lại được bạn.",
    action: "Lập bảng kiểm năm dòng cho năm câu trả lời sắp đi vào báo cáo.",
  },
  application: {
    title: "Làm ngay trong 20 phút",
    message:
      "Lấy một tài liệu công việc của bạn và nhờ trợ lý trả lời 8 câu hỏi. Chọn 5 câu quan trọng nhất, lập bảng 4 cột (câu trả lời, số trích dẫn, đoạn gốc kèm trang, kết quả) và điền đủ 5 dòng. Sửa các câu sai theo đoạn gốc.",
    secondary: "Đếm số câu đúng, sai một phần, sai, và ghi kiểu lỗi thường gặp nhất.",
  },
  sections: [
    {
      type: "lead",
      text: "Đến lúc gom mọi thứ lại. Bạn chọn 5 câu trả lời quan trọng, lần theo từng trích dẫn đến tận đoạn gốc và ghi kết quả vào bảng. Bảng này là bằng chứng bạn đã kiểm, và là thứ bạn có thể đưa cho sếp xem.",
    },
    {
      type: "feynman",
      title: "Kiểm một câu trả lời đơn giản hơn bạn nghĩ",
      intro: "Hãy nghĩ tới một kế toán kiểm sổ cuối tháng: không ai kiểm từng dòng trong cả nghìn dòng, mà chọn các khoản lớn rồi đối chiếu với chứng từ gốc và ghi vào biên bản. Bạn làm đúng thế với câu trả lời của trợ lý.",
      columns: ["Thành phần", "Kiểm sổ cuối tháng", "Kiểm câu trả lời"],
      rows: [
        ["Chọn cái cần kiểm", "Các khoản lớn, rủi ro cao", "5 câu sẽ đi vào báo cáo"],
        ["Chứng từ gốc", "Hoá đơn, hợp đồng", "Đoạn gốc trong tài liệu"],
        ["Ghi lại", "Biên bản đối chiếu", "Bảng: đúng, sai một phần, sai"],
        ["Người khác kiểm lại", "Mở chứng từ ra xem", "Mở trang và dòng ra xem"],
      ],
      oneLiner: "Chọn chỗ quan trọng, đối chiếu với nguồn gốc, ghi lại để người khác kiểm lại được.",
    },
    { type: "heading", text: "Bảng kiểm năm dòng" },
    {
      type: "paragraph",
      text: "Mỗi câu một dòng với bốn cột: câu trả lời của trợ lý, số trích dẫn, đoạn gốc (ghi trang và dòng) và kết quả. Kết quả chỉ có bốn loại: đúng, sai một phần, sai, hoặc không tìm thấy nguồn. Ghi như vậy nhanh, và quan trọng nhất là ai cũng mở ra kiểm lại được.",
    },
    {
      type: "flow",
      title: "Từ mười hai câu trả lời tới một bảng kiểm",
      steps: [
        { label: "Chọn 5 câu có hậu quả lớn", detail: "Câu sẽ đi vào email, báo cáo, quyết định tiền hoặc thời hạn. Các câu còn lại ghi 'chưa kiểm'." },
        { label: "Bấm trích dẫn và đọc đoạn gốc", detail: "Đọc cả câu, tìm điều kiện và ngoại lệ. Nếu không có trích dẫn, hỏi lại trợ lý chỉ rõ đoạn nào." },
        { label: "Đối chiếu số liệu", detail: "Con số, đơn vị, kỳ với bảng gốc. Phép tính tự cộng lại. Bản scan thì nhìn lại ảnh." },
        { label: "Ghi kết quả vào bảng", detail: "Đúng, sai một phần, sai hoặc không tìm thấy, kèm trang và dòng của đoạn gốc." },
        { label: "Sửa và gửi kèm bảng", detail: "Sửa câu sai theo đoạn gốc. Đính bảng để người nhận biết cái gì đã kiểm, cái gì chưa." },
      ],
    },
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ trợ lý giúp lập bảng kiểm",
      task: "Bạn đã có 5 câu trả lời cùng trích dẫn. Hãy lắp yêu cầu để trợ lý giúp dựng bảng kiểm, nhưng việc kết luận đúng sai vẫn là của bạn.",
      parts: [
        {
          id: "job",
          label: "Việc giao cho trợ lý",
          options: [
            { text: "Kiểm giúp tôi 5 câu này và cho biết câu nào đúng, câu nào sai.", feedback: "Trợ lý tự chấm bài của chính nó và thường kết luận 'đều đúng'. Bạn không có bằng chứng, chỉ có một ý kiến." },
            { text: "Dựng bảng 4 cột: câu trả lời, số trích dẫn, đoạn gốc chép nguyên văn, để trống cột kết quả cho tôi điền.", good: true, feedback: "Trợ lý làm phần chép và sắp xếp, còn phán đoán đúng sai vẫn nằm ở bạn." },
          ],
        },
        {
          id: "gap",
          label: "Chỗ không có nguồn",
          options: [
            { text: "Nếu không tìm thấy đoạn gốc thì tự suy ra đoạn hợp lý nhất.", feedback: "Đoạn 'suy ra' là đoạn bịa: bảng kiểm của bạn giờ chứa bằng chứng giả." },
            { text: "Nếu không tìm thấy đoạn gốc thì ghi 'không tìm thấy', không được suy ra.", good: true, feedback: "Chỗ thiếu nguồn hiện ra đúng là chỗ thiếu, và bạn biết câu nào phải xử lý thêm." },
          ],
        },
        {
          id: "format",
          label: "Khuôn dạng",
          options: [
            { text: "Trình bày sao cho đẹp và dễ đọc.", feedback: "Mơ hồ: bảng có thể thành đoạn văn hoặc gộp hai câu vào một dòng, khó dán vào bảng tính." },
            { text: "Mỗi câu một dòng, cột cách nhau bằng dấu gạch đứng, để dán được vào bảng tính.", good: true, feedback: "Khuôn dạng rõ: bạn dán vào bảng tính và điền nốt cột kết quả ngay." },
          ],
        },
      ],
      responses: [
        {
          requires: ["job", "gap", "format"],
          text: "Câu trả lời | Số | Đoạn gốc | Kết quả\nThời hạn thanh toán 30 ngày | [2] | 'thanh toán trong vòng 30 ngày kể từ ngày nhận hoá đơn' (trang 4) | (để trống)\nBảo hành 24 tháng | [3] | không tìm thấy | (để trống)",
        },
        {
          requires: ["job"],
          text: "Bảng kiểm: 5 câu, kết quả: đúng, đúng, đúng, đúng, đúng.\n\n(Trợ lý tự chấm bản thân là đều đúng và không chép đoạn gốc nào, nên bạn không có gì để kiểm.)",
        },
        {
          text: "Tôi đã đọc lại tài liệu và các câu trả lời đều phù hợp với nội dung. Bạn có thể yên tâm sử dụng.\n\n(Lời bảo đảm chung, không có đoạn gốc, không có bảng.)",
        },
      ],
    },
    {
      type: "comparison",
      left: {
        label: "Kiểm trong đầu",
        text: "Nhanh, nhưng không để lại dấu vết. Sếp hỏi 'dựa vào đâu' thì bạn không có gì để chỉ, và không ai kiểm lại được bạn.",
      },
      right: {
        label: "Bảng kiểm có trang và dòng",
        text: "Mất thêm vài phút ghi chép. Đổi lại, người khác mở đúng chỗ ra xem được, và bạn thấy kiểu lỗi lặp lại qua nhiều lần kiểm.",
      },
    },
    {
      type: "callout",
      label: "Trợ lý không tự chấm bài của mình",
      text: "Bảo trợ lý 'kiểm lại câu trả lời của bạn' thường nhận về 'đều đúng'. Nó giúp được việc chép đoạn gốc và dựng bảng, còn kết luận đúng sai là của bạn. Điều liên quan tới pháp lý, thuế hoặc tài chính thì hỏi chuyên gia hoặc kế toán trưởng.",
    },
    {
      type: "scenario",
      title: "Gửi báo cáo kèm bảng kiểm",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn đã kiểm xong 5 câu: 2 đúng, 2 sai một phần, 1 sai. Báo cáo phải gửi sếp trước 5 giờ chiều và còn 30 phút.",
          choices: [
            { label: "Gửi báo cáo như trợ lý viết, vì 2 câu đúng là đủ trình bày", next: "bad1" },
            { label: "Sửa 3 câu theo đoạn gốc, rồi gửi kèm bảng kiểm", next: "s2" },
          ],
        },
        bad1: {
          text: "Sếp dùng câu sai trong cuộc họp với khách. Khi bị hỏi, bạn không chỉ ra được nguồn nào vì bảng kiểm chỉ nằm trong đầu bạn.",
          ending: "bad",
        },
        s2: {
          text: "Báo cáo đã sửa xong. Bảng kiểm có cột đoạn gốc kèm trang. Sếp hỏi 'câu nào chưa kiểm?'.",
          choices: [
            { label: "Nói 'tất cả đã kiểm' để sếp yên tâm", next: "bad2" },
            { label: "Nói 'kiểm 5 câu quan trọng, 7 câu còn lại ghi rõ là chưa kiểm'", next: "good" },
          ],
        },
        bad2: {
          text: "Sếp tin cả 12 câu đã kiểm và dùng câu thứ 9 trong email gửi đối tác. Câu đó chưa ai kiểm và hoá ra sai một phần.",
          ending: "bad",
        },
        good: {
          text: "Sếp biết rõ phạm vi đã kiểm và tự kiểm thêm câu nào định dùng. Bảng của bạn trở thành mẫu cho cả phòng.",
          ending: "good",
        },
      },
    },
    {
      type: "list",
      items: [
        "Bước 1 - Chọn 5 câu trả lời có hậu quả lớn nhất.",
        "Bước 2 - Bấm trích dẫn, đọc cả câu gốc, đối chiếu số liệu.",
        "Bước 3 - Ghi bảng: câu, số, đoạn gốc kèm trang, kết quả.",
        "Bước 4 - Sửa câu sai, đính bảng, ghi rõ câu nào chưa kiểm.",
      ],
    },
    {
      type: "closing",
      lines: [
        "Một bảng kiểm năm dòng là khác biệt giữa 'tôi tin' và 'tôi đã kiểm'.",
        "Bài sau: tổng hợp ba tài liệu thành một bản tóm tắt.",
      ],
    },
  ],
};

export const S44_B_LESSONS: Lesson[] = [L6, L7, L8, L9, L10];
