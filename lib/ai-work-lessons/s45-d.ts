import type { Lesson } from "../lesson-types";

// Chặng 45, bài 16-20. Giáo trình: scripts/curriculum/stage-45.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách hỏi, cách đọc nguồn và cách ghi lại.

const q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S45_D_LESSONS: Lesson[] = [
  {
    id: 2315,
    slug: "khi-cac-nguon-noi-nguoc-nhau",
    title: "Chặng 45, Bài 16: Hai nguồn nói ngược nhau thì làm gì",
    subtitle: "Hai con số cho cùng một câu hỏi: thường cả hai cùng đúng, chỉ là đo khác nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp nhờ bạn tìm tỷ lệ khách quay lại của ngành. Bạn mở hai bài báo: một bài ghi 35%, bài kia ghi 62%. Nếu chọn bừa một số, hoặc lấy trung bình, báo cáo của bạn sẽ dựa trên một con số không ai đo cả. Phần lớn các cặp con số mâu thuẫn có lời giải thích rất đời thường, và bạn tìm được nó nếu biết hỏi ba câu.",
    openingQuestion:
      "Bài báo A ghi tỷ lệ khách quay lại của ngành là 35%, bài báo B ghi 62%. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Xem mỗi bài định nghĩa, thời điểm và đối tượng đo của con số",
      "Chọn bài của tờ báo nổi tiếng hơn vì tờ đó có uy tín hơn",
      "Lấy trung bình hai con số, khoảng 48%, để báo cáo cho công bằng",
      "Hỏi AI con số nào đúng rồi ghi theo câu trả lời của nó",
    ],
    correctOption: 0,
    explanation:
      "Hai con số cùng tên nhưng khác nhau thường vì đo khác thứ: một bài tính khách mua lại trong 30 ngày, bài kia trong 12 tháng; một bài đo trên khách đã đăng ký, bài kia trên mọi người ghé qua. Vì vậy việc đầu tiên là đọc phần định nghĩa và phương pháp của từng bài. Chọn theo độ nổi tiếng không cho biết bài nào đo đúng thứ bạn cần. Trung bình hai số tạo ra một con số chưa ai đo. Hỏi AI mà không đưa nội dung hai bài thì nó chỉ đoán.",
    diagram: [
      { label: "Hai nguồn, hai con số khác nhau", arrow: true },
      { label: "Đọc định nghĩa, thời điểm, đối tượng đo của từng số", arrow: true },
      { label: "Giải thích chênh lệch hoặc ghi rõ là chưa giải thích được", arrow: true },
      { label: "Báo cáo nêu cả hai số kèm nguồn, không chọn lặng lẽ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh tìm thấy hai bài báo về tỷ lệ khách hàng quay lại. Một bài ghi 35%, bài kia ghi 62%. Cô mở hai bài và thấy bài đầu tính khách mua lại trong 30 ngày, bài sau tính trong 12 tháng. Khi ghi cả hai con số cùng khung thời gian vào báo cáo, sếp không còn hỏi đâu là con số đúng nữa. Các con số trong ví dụ chỉ là số liệu minh hoạ.",
    },
    quiz: [
      q(
        "Hai bài báo cho hai con số khác nhau về cùng một chỉ tiêu. Cách làm nào đúng nhất?",
        [
          "Xem mỗi bài định nghĩa con số ấy thế nào, đo khi nào và đo trên ai",
          "Chọn bài của báo nổi tiếng hơn, vì nguồn uy tín hơn",
          "Lấy trung bình hai con số rồi ghi vào báo cáo",
          "Hỏi AI con số nào đúng rồi theo câu trả lời",
        ],
        "Chênh lệch thường nằm ở cách đo, nên phải đọc định nghĩa, thời điểm và nhóm được đo. Chọn theo tên báo không cho biết bài nào đo đúng thứ bạn cần, trung bình hai số tạo ra con số chưa ai đo, còn hỏi AI khi chưa đưa nội dung hai bài chỉ nhận về một lời đoán trôi chảy.",
      ),
      q(
        "Bài A tính khách mua lại trong 30 ngày, bài B tính trong 12 tháng. Kết luận nào hợp lý?",
        [
          "Hai con số đo hai thứ khác nhau",
          "Một trong hai bài chắc chắn đã chia sai nên phải bỏ hẳn bài đó đi",
          "Bài có con số cao hơn luôn đã cố ý thổi phồng để gây chú ý cho độc giả",
          "Số liệu tự đổi ngẫu nhiên theo từng lần đo nên không bài nào dùng được",
        ],
        "Khung thời gian dài hơn thì thường có nhiều khách mua lại hơn, nên hai số khác nhau mà không bài nào sai. Bỏ một bài vì nghi tính sai, buộc tội cố ý thổi phồng hay coi cả hai là ngẫu nhiên đều là kết luận không có bằng chứng trong hai bài.",
      ),
      q(
        "Một nguồn ghi số của năm 2021, nguồn kia ghi số của năm 2024. Báo cáo nên ghi thế nào?",
        [
          "Ghi từng con số kèm năm của nó, không đặt chung một câu như cùng thời điểm",
          "Ghi con số mới hơn và bỏ con số cũ, vì số cũ chắc chắn đã lỗi thời và làm người đọc phân vân",
          "Ghi cả hai không kèm năm cho ngắn gọn",
          "Ghi con số nằm giữa hai số để phản ánh cả hai thời điểm",
        ],
        "Thị trường đổi theo năm nên năm là một phần của con số. Bỏ số cũ làm mất thông tin về xu hướng, ghi không kèm năm làm người đọc hiểu nhầm là cùng thời điểm, và con số ở giữa là số chưa ai đo.",
      ),
      q(
        "AI giải thích: 'hai bài khác nhau vì khác định nghĩa'. Bạn nên làm gì tiếp theo?",
        [
          "Mở hai bài kiểm xem phần định nghĩa đó có thật được ghi hay không",
          "Tin luôn vì lời giải thích nghe hợp lý với cả hai con số của hai bài",
          "Hỏi lại AI tới khi hai câu trả lời giống nhau thì coi như đã kiểm xong",
          "Xoá một bài khỏi danh sách để lần sau AI trả lời gọn hơn",
        ],
        "Lời giải thích của AI là một giả thuyết hợp lý, chưa phải bằng chứng. Phải tìm đúng câu trong hai bài ghi định nghĩa hoặc cách đo. Hai lần trả lời giống nhau chỉ cho biết AI nhất quán, không cho biết nó đúng, và xoá bài thì làm mất chính dữ kiện cần so sánh.",
      ),
      q(
        "Bạn đã đọc kỹ mà vẫn không giải thích được vì sao hai con số lệch. Báo cáo nên viết gì?",
        [
          "Nêu cả hai con số kèm nguồn, nói rõ chưa giải thích được chênh lệch và đang hỏi ai",
          "Chọn con số làm báo cáo đẹp hơn và bỏ con số còn lại",
          "Ghi con số ở giữa hai số để không bên nào bị coi là sai",
          "Bỏ hẳn mục đó cho tới khi tìm được nguồn thứ ba",
        ],
        "Trung thực về chỗ chưa biết là phần việc của người làm nghiên cứu, và sếp có thể nhờ người khác trong ngành giải thích. Chọn số đẹp là che mâu thuẫn, số ở giữa là số bịa ra, còn bỏ mục thì mất cả hai dữ kiện có thật.",
      ),
    ],
    keyTakeaways: [
      "Hai con số mâu thuẫn thường đo hai thứ khác nhau, chưa chắc có số sai.",
      "Ba câu hỏi: định nghĩa là gì, đo khi nào, đo trên ai.",
      "Không lấy trung bình và không chọn lặng lẽ.",
      "Lời giải thích của AI là giả thuyết, phải tìm câu tương ứng trong nguồn.",
      "Chưa giải thích được thì ghi cả hai số và nói rõ điều đó.",
    ],
    practicePrompt: {
      question:
        "Nguồn A ghi doanh thu ngành 40 nghìn tỷ, nguồn B ghi 55 nghìn tỷ, cùng năm. Bạn mở ra thấy B tính cả hàng xuất khẩu còn A chỉ tính trong nước. Bạn làm gì?",
      options: [
        "Ghi cả hai, chú thích A là trong nước và B gồm xuất khẩu",
        "Ghi số lớn hơn, vì nó bao quát hơn nên tốt hơn cho báo cáo",
        "Ghi số nhỏ hơn, vì số thận trọng thì ít bị sếp hỏi lại hơn",
        "Ghi hiệu của hai số, 15 nghìn tỷ, làm doanh thu xuất khẩu",
      ],
      correct: 0,
      explanation:
        "Hai số đo hai phạm vi nên cả hai đều đúng trong phạm vi của nó, chỉ cần chú thích. Chọn số lớn hay số nhỏ là chọn một phạm vi mà không nói, còn hiệu của hai số chỉ đúng nếu hai nguồn tính cùng phương pháp, điều bạn chưa kiểm. Các con số trong câu này là số liệu minh hoạ.",
    },
    summary: {
      keyIdea: "Nguồn nói ngược nhau thường đo khác nhau: tìm chỗ khác trước khi nghĩ có nguồn sai.",
      formula: "Hai số lệch → hỏi định nghĩa, thời điểm, đối tượng → giải thích hoặc ghi rõ chưa giải thích được.",
      commonMistake: "Lấy trung bình hai con số hoặc chọn con số nghe hợp ý mà không nói với người đọc.",
      action: "Lần tới gặp hai số lệch nhau, viết ba dòng: định nghĩa, thời điểm, đối tượng của từng số.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một con số trong công việc của bạn mà bạn đã thấy hai nguồn khác nhau (giá trung bình, quy mô thị trường, tỷ lệ gì đó). Mở cả hai nguồn và ghi vào ba dòng cho mỗi nguồn: định nghĩa, năm, nhóm được đo. Sau đó viết một câu báo cáo nêu cả hai số kèm lý do khác nhau.",
      secondary: "Nếu không tìm ra lý do, viết câu 'chưa giải thích được' và hỏi một đồng nghiệp trong ngành.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn tìm một con số cho báo cáo và hai bài báo cho hai con số khác hẳn nhau. Đừng vội chọn: hầu hết các cặp mâu thuẫn như vậy có lời giải thích, và tìm được nó chính là phần việc có giá trị của bạn.",
      },
      {
        type: "feynman",
        title: "Hai nguồn nói ngược nhau đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hai người cùng báo 'quán này đông khách': một người đến vào trưa thứ Bảy, người kia đến chiều thứ Ba. Cả hai đều nói thật, nhưng họ nhìn quán ở hai thời điểm khác nhau. Hai bài báo cũng vậy: mỗi bài nhìn con số từ một góc.",
        columns: ["Điều khác nhau", "Hai người tả cái quán", "Hai bài báo"],
        rows: [
          ["Thời điểm", "Trưa thứ Bảy và chiều thứ Ba", "Số của năm 2021 và số của năm 2024"],
          ["Cách đếm", "Đếm người ngồi và đếm cả người mua mang đi", "Khách mua trong 30 ngày và khách mua trong 12 tháng"],
          ["Nhóm được nhìn", "Khách quen và mọi người đi ngang", "Khách đã đăng ký và mọi người ghé trang"],
          ["Cách xử lý", "Hỏi từng người đến lúc nào, đếm kiểu gì", "Mở từng bài, tìm định nghĩa, thời điểm, đối tượng"],
        ],
        oneLiner: "Trước khi hỏi ai đúng, hãy hỏi mỗi người đo cái gì, lúc nào, trên ai.",
      },
      { type: "heading", text: "Ba câu hỏi để giải thích chênh lệch" },
      {
        type: "paragraph",
        text: "Khi hai con số lệch nhau, hãy đặt cạnh nhau ba thứ. Thứ nhất là định nghĩa: 'khách quay lại' nghĩa là mua lần hai hay chỉ ghé lại. Thứ hai là thời điểm: số của năm nào, đo trong bao lâu. Thứ ba là nhóm được đo: toàn thị trường hay chỉ khách của một công ty. Phần lớn chênh lệch nằm ở một trong ba chỗ này.",
      },
      {
        type: "flow",
        title: "Từ hai con số lệch tới một câu báo cáo trung thực",
        steps: [
          { label: "Ghi hai con số và nguồn", detail: "Chép nguyên văn từng con số, tên bài, ngày đăng. Chưa kết luận gì." },
          { label: "Tìm định nghĩa trong từng bài", detail: "Tìm câu nói con số này đếm cái gì. Nếu bài không ghi, đó là một điểm yếu của bài." },
          { label: "So thời điểm và nhóm được đo", detail: "Năm nào, bao lâu, trên ai. Hai bài cùng năm vẫn có thể khác nhóm." },
          { label: "Giải thích hoặc thừa nhận chưa giải thích được", detail: "Nếu tìm ra lý do thì ghi lý do. Nếu không, ghi cả hai số và nói chưa rõ vì sao." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp so hai nguồn",
        task: "Bạn có hai đoạn trích ghi 35% và 62%. Lắp prompt để AI giúp tìm lý do chênh lệch mà không bịa.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Hai bài báo nói 35% và 62%, bạn cho biết con số nào đúng.", feedback: "AI không được nhìn thấy nội dung bài, nên nó sẽ chọn một số và bịa lý do nghe hợp lý." },
              { text: "Dán hai đoạn có câu định nghĩa, kèm tên bài và ngày đăng của từng bài.", good: true, feedback: "AI có chữ thật của hai bài để so, nên lý do nó đưa ra có thể kiểm lại từng câu." },
            ],
          },
          {
            id: "ask",
            label: "Việc cần làm",
            options: [
              { text: "Kết luận giúp tôi bài nào chính xác hơn.", feedback: "Bắt AI phán xử khi nó không có bằng chứng thì nó sẽ phán theo giọng tự tin." },
              { text: "Liệt kê điểm khác nhau về định nghĩa, thời điểm, nhóm được đo, mỗi điểm trích câu trong bài làm bằng chứng.", good: true, feedback: "Mỗi lý do đều đi kèm câu trích, nên bạn mở bài ra đối chiếu được ngay." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Trả lời đầy đủ nhất có thể.", feedback: "Không có giới hạn, AI lấp chỗ trống bằng những lý do nghe hợp lý nhưng không có trong bài." },
              { text: "Chỗ nào bài không ghi rõ thì viết 'bài không nói', không đoán.", good: true, feedback: "Khoảng trống được gọi tên là khoảng trống, bạn biết chỗ nào phải tự hỏi thêm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "ask", "limit"],
            text: "1. Định nghĩa: bài A ghi 'khách mua lại trong 30 ngày'; bài B ghi 'khách mua lại trong 12 tháng'.\n2. Thời điểm: A nêu số quý 1; B nêu số cả năm.\n3. Nhóm được đo: bài không nói rõ.\n\nKết luận: hai số không so trực tiếp được vì khung thời gian khác nhau.",
          },
          {
            requires: ["input"],
            text: "Bài A chính xác hơn vì mẫu lớn hơn, và bài B có thể đã tính cả khách vãng lai.\n\n(AI tự thêm 'mẫu lớn hơn' mà hai đoạn không hề nói.)",
          },
          {
            text: "Con số đúng là 48%, trung bình của hai bài, và nó khớp với mức phổ biến của ngành.\n\n(Con số 48% và 'mức phổ biến của ngành' đều do AI tự nghĩ ra.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giải thích rồi mới báo cáo",
          text: "Hai số đi cùng định nghĩa và năm của chúng. Sếp hiểu vì sao lệch. Khi người khác hỏi, bạn chỉ vào đúng câu trong nguồn.",
        },
        right: {
          label: "Chọn số hoặc lấy trung bình",
          text: "Báo cáo gọn hơn nhưng giấu mâu thuẫn. Khi sếp vô tình thấy bài còn lại, bạn không có câu trả lời và mất cả niềm tin vào các số khác.",
        },
      },
      {
        type: "callout",
        label: "Khi mâu thuẫn là thật",
        text: "Đôi khi hai nguồn đo cùng một thứ mà vẫn lệch: một bên sai hoặc lỗi thời. Khi đó hãy ưu tiên nguồn gốc (người trực tiếp thu số liệu) hơn bài chép lại, và hỏi người am hiểu trong ngành. Nếu con số ảnh hưởng tới quyết định lớn về tiền, hỏi chuyên gia hoặc kế toán trưởng trước khi dùng.",
      },
      {
        type: "scenario",
        title: "Hai con số trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn một tiếng trước cuộc họp. Bài A ghi 35%, bài B ghi 62% cho cùng một chỉ tiêu, và sếp cần một con số.",
            choices: [
              { label: "Ghi 48%, trung bình hai số, để không bên nào bị coi là sai", next: "bad_avg" },
              { label: "Mở hai bài tìm định nghĩa và khung thời gian của từng số", next: "s2" },
            ],
          },
          bad_avg: {
            text: "Tại cuộc họp, một đồng nghiệp hỏi 48% lấy từ đâu. Bạn không chỉ được bài nào, và sếp bỏ luôn cả những số khác trong báo cáo khỏi bản trình bày.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy bài A tính 30 ngày, bài B tính 12 tháng. Còn 40 phút.",
            choices: [
              { label: "Ghi cả hai số kèm khung thời gian và chỉ rõ bài nào tính gì", next: "good" },
              { label: "Chỉ ghi số 62% vì nó nghe ấn tượng hơn cho buổi họp", next: "bad_pick" },
            ],
          },
          bad_pick: {
            text: "Sếp đem 62% ra nói với đối tác. Đối tác đã đọc bài A và hỏi vì sao lại khác. Sếp phải xin lỗi vì không biết khung thời gian.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhìn hai dòng và hiểu ngay hai số không cùng thước đo. Cuộc họp chuyển sang câu hỏi đáng hỏi hơn: công ty mình muốn đo theo 30 ngày hay 12 tháng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hai nguồn nói ngược nhau là lời mời tìm điều khác nhau, chưa phải lúc chọn phe.",
          "Hỏi ba câu: định nghĩa, thời điểm, nhóm được đo.",
          "Không lấy trung bình, không chọn lặng lẽ.",
          "Chưa giải thích được thì nói thẳng là chưa giải thích được.",
        ],
      },
    ],
  },
  {
    id: 2316,
    slug: "thien-lech-cua-cau-hoi-hoi-de-bi-dua-di",
    title: "Chặng 45, Bài 17: Câu hỏi của bạn đã dẫn đường cho câu trả lời",
    subtitle: "Hỏi 'tại sao X tốt' và hỏi 'tại sao X tệ': cùng một AI, hai bức tranh ngược nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang nghiêng về một phần mềm mới và hỏi AI 'tại sao phần mềm này tốt cho phòng kế toán'. Nó trả lời ba trang ưu điểm. Nếu bạn hỏi 'tại sao phần mềm này tệ', nó cũng trả lời ba trang, và lần này toàn nhược điểm. Cả hai bản đều trôi chảy, nên bạn dễ nhận được đúng điều mình muốn nghe rồi tưởng đó là kết quả nghiên cứu.",
    openingQuestion:
      "Bạn hỏi AI 'tại sao phần mềm X tốt cho phòng kế toán' và nhận về toàn ưu điểm. Điều gì giải thích nhiều nhất?",
    openingOptions: [
      "Câu hỏi đã giả định X tốt, nên AI xếp lý do theo hướng đó",
      "AI được lập trình để khen mọi sản phẩm được nhắc tới trong câu hỏi",
      "Phần mềm X thật sự chỉ có ưu điểm và không có nhược điểm nào",
      "AI chỉ đọc các bài quảng cáo nên không bao giờ thấy bài phê bình",
    ],
    correctOption: 0,
    explanation:
      "AI viết tiếp theo hướng câu hỏi đặt ra: khi hỏi 'tại sao tốt', câu trả lời hợp lý nhất là một danh sách lý do tốt. Đây là cơ chế chiều theo câu hỏi, không phải lập trình để khen. Không có lý do để tin phần mềm chỉ toàn ưu điểm, và AI không chỉ đọc quảng cáo. Cách chữa là đặt câu hỏi không chứa sẵn kết luận, hoặc hỏi cả hai chiều rồi so.",
    diagram: [
      { label: "Câu hỏi có sẵn kết luận (tại sao X tốt)", arrow: true },
      { label: "AI xếp lý do theo hướng của câu hỏi", arrow: true },
      { label: "Hỏi lại ở chiều ngược và bằng câu trung lập", arrow: true },
      { label: "So các bản, chỉ giữ điều có nguồn kiểm được" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng phòng mua hàng hỏi AI 'tại sao nên chọn nhà cung cấp A' và nhận về sáu lý do. Hôm sau đồng nghiệp hỏi 'tại sao không nên chọn nhà cung cấp A' và cũng nhận về sáu lý do. Hai danh sách nói ngược nhau nhưng đều rất thuyết phục. Họ dán cạnh nhau, chỉ giữ những ý có nguồn mở được, và còn lại ba ý đáng bàn thay vì mười hai ý nghe hay.",
    },
    quiz: [
      q(
        "Vì sao hỏi 'tại sao X tốt' thường nhận về toàn ưu điểm?",
        [
          "Câu hỏi đã giả định sẵn kết luận, nên AI xếp lý do theo hướng đó",
          "AI được lập trình để khen mọi sản phẩm được nhắc tới trong câu hỏi của người dùng",
          "X thật sự chỉ có ưu điểm nên AI không cần nêu gì khác",
          "AI chỉ đọc các bài quảng cáo nên không thấy được bài phê bình nào",
        ],
        "AI viết tiếp sao cho khớp với câu hỏi; câu hỏi chứa kết luận thì câu trả lời hợp lý nhất là lý do ủng hộ kết luận đó. Không có quy tắc khen sản phẩm, không có sản phẩm nào chỉ toàn ưu điểm, và dữ liệu AI học từ gồm cả bài phê bình.",
      ),
      q(
        "Câu hỏi nào trung lập nhất để bắt đầu tìm hiểu phần mềm X?",
        [
          "Điểm mạnh và điểm yếu của X theo từng nguồn là gì?",
          "Hãy chứng minh giúp tôi vì sao X là lựa chọn hợp lý nhất cho công ty tôi",
          "Tại sao nhiều người chê X đến vậy, cho tôi biết các lý do chính của họ",
          "Có đúng là X tốt không, hãy xác nhận giúp tôi bằng vài số liệu cụ thể",
        ],
        "Câu trung lập yêu cầu cả hai phía và đòi nguồn. 'Chứng minh X hợp lý' và 'có đúng X tốt, hãy xác nhận' nghiêng về khen; 'tại sao nhiều người chê' nghiêng về chê, và còn giả định điều đó đúng.",
      ),
      q(
        "Bạn hỏi hai chiều và nhận hai danh sách nói ngược nhau. Bước tiếp theo nên là gì?",
        [
          "Đặt hai danh sách cạnh nhau, gạch phần có nguồn kiểm được rồi mới kết luận",
          "Chọn danh sách dài hơn vì nhiều lý do hơn nghĩa là đúng hơn",
          "Coi như hoà và kết luận X chỉ ở mức trung bình",
          "Hỏi thêm câu thứ ba rồi theo câu trả lời cuối cùng",
        ],
        "Độ dài danh sách không nói gì về độ đúng. 'Hoà' là một kết luận chưa có bằng chứng, và câu trả lời thứ ba cũng chịu ảnh hưởng của cách bạn hỏi. Chỉ phần có nguồn mở được mới đáng để dựa vào.",
      ),
      q(
        "Sếp bảo: 'Tìm giúp anh lý do ủng hộ phương án A'. Cách làm chuyên nghiệp nhất là gì?",
        [
          "Hỏi cả hai chiều, rồi báo sếp phần nào có bằng chứng, phần nào chưa",
          "Chỉ tìm lý do ủng hộ như sếp yêu cầu vì đó là việc được giao, rồi nhờ AI viết gọn",
          "Từ chối làm và nói với sếp rằng A là phương án sai",
          "Hỏi như sếp dặn nhưng giấu việc đó đi khi báo cáo lại",
        ],
        "Sếp cần lý do ủng hộ, và bạn vẫn đưa được, nhưng kèm điểm yếu để sếp quyết định có đủ thông tin. Chỉ tìm một chiều sẽ cho ra bản hoàn hảo giả. Từ chối và phán A sai là kết luận khi chưa có bằng chứng, và giấu cách hỏi làm sếp đánh giá sai độ chắc chắn.",
      ),
      q(
        "Bạn nêu ý kiến của mình và AI mở đầu bằng 'Bạn nói đúng'. Điều này cho thấy gì?",
        [
          "AI hay chiều theo người hỏi",
          "AI đã kiểm chứng ý kiến của bạn bằng nguồn tin cậy trước khi đồng ý",
          "Ý kiến của bạn đúng nên AI đồng ý, không cần kiểm thêm nữa",
          "Câu trả lời này đáng tin hơn những câu AI không đồng ý với bạn",
        ],
        "Mô hình có xu hướng đồng tình với điều người hỏi vừa nói, nên lời đồng ý không phải bằng chứng. Nó không tự kiểm nguồn trong lúc trả lời, và một câu đồng ý cũng không đáng tin hơn một câu phản biện có dẫn nguồn.",
      ),
    ],
    keyTakeaways: [
      "AI đi theo hướng câu hỏi: hỏi 'tại sao tốt' thì nhận lý do tốt.",
      "Đặt câu hỏi trung lập: điểm mạnh và điểm yếu, theo nguồn nào.",
      "Hỏi cả hai chiều rồi so hai bản.",
      "Lời đồng ý của AI không phải bằng chứng.",
      "Chỉ giữ phần có nguồn mở được.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn biết làm việc 4 ngày một tuần có hợp với công ty mình không. Câu hỏi nào ít nghiêng nhất?",
      options: [
        "Nêu lợi ích và rủi ro của tuần làm việc 4 ngày, kèm nguồn",
        "Tại sao tuần làm việc 4 ngày là xu hướng tất yếu",
        "Tại sao tuần làm việc 4 ngày làm giảm năng suất",
        "Hãy viết bài ủng hộ tuần làm việc 4 ngày cho công ty, không cần nêu rủi ro",
      ],
      correct: 0,
      explanation:
        "Câu đầu yêu cầu cả hai phía và đòi nguồn. Ba câu còn lại đã chứa sẵn kết luận (tất yếu, giảm năng suất, viết bài ủng hộ) nên AI sẽ xếp lý do theo hướng đó.",
    },
    summary: {
      keyIdea: "Câu hỏi dẫn đường cho câu trả lời: muốn thấy cả bức tranh thì phải hỏi cả hai phía.",
      formula: "Câu hỏi không chứa kết luận + hỏi hai chiều + chỉ giữ điều có nguồn = bức tranh đủ hơn.",
      commonMistake: "Hỏi 'tại sao X tốt', nhận lý do tốt và tưởng đó là kết quả nghiên cứu.",
      action: "Lần tới, viết lại câu hỏi của bạn để bỏ hết tính từ chứa đánh giá (tốt, tệ, tất yếu, nguy hiểm).",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quyết định nhỏ bạn đang nghiêng về phía nào đó (một phần mềm, một nhà cung cấp, một cách làm). Hỏi AI hai lần: 'tại sao nên' và 'tại sao không nên'. Dán hai bản cạnh nhau, gạch đỏ những ý không có nguồn, rồi viết ba ý còn lại vào một đoạn ngắn.",
      secondary: "Ghi lại bản nào làm bạn thấy hợp ý hơn: đó là chỗ thiên lệch của chính bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Hỏi AI giống hỏi một người rất muốn làm bạn vừa lòng: câu hỏi của bạn là hướng mà nó đi. Bài này dạy cách hỏi để thấy cả hai phía trước khi quyết định.",
      },
      {
        type: "feynman",
        title: "Thiên lệch của câu hỏi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người bạn tốt bụng hay chiều ý. Bạn hỏi 'quán này ngon lắm phải không', bạn ấy gật. Bạn hỏi 'quán này dở lắm phải không', bạn ấy cũng gật. Câu trả lời phản ánh câu hỏi của bạn nhiều hơn phản ánh cái quán.",
        columns: ["Điều kiện", "Người bạn hay chiều ý", "AI trả lời"],
        rows: [
          ["Câu hỏi nghiêng về khen", "Gật và kể điểm tốt", "Liệt kê lý do tốt"],
          ["Câu hỏi nghiêng về chê", "Gật và kể điểm dở", "Liệt kê lý do tệ"],
          ["Câu hỏi trung lập", "Kể cả điểm tốt và dở", "Nêu cả điểm mạnh lẫn điểm yếu"],
          ["Cách kiểm", "Hỏi người thứ hai và xem tận nơi", "Hỏi hai chiều và mở nguồn"],
        ],
        oneLiner: "Muốn thấy cái quán, đừng hỏi theo cách đã chứa câu trả lời.",
      },
      { type: "heading", text: "Đặt câu hỏi để không tự đẩy mình" },
      {
        type: "paragraph",
        text: "Hai thói quen giúp nhất. Một là bỏ tính từ đánh giá trong câu hỏi: thay 'tại sao X tốt' bằng 'X có điểm mạnh và điểm yếu gì'. Hai là hỏi cả hai chiều và so hai câu trả lời. Chỗ hai bản nói ngược nhau là chỗ cần tự kiểm bằng nguồn.",
      },
      {
        type: "flow",
        title: "Hỏi cả hai chiều rồi so",
        steps: [
          { label: "Hỏi bản trung lập", detail: "Viết câu không có tính từ đánh giá: 'Điểm mạnh và điểm yếu của X là gì, theo nguồn nào?'." },
          { label: "Hỏi chiều ủng hộ", detail: "Thử 'tại sao nên chọn X' để thấy lý lẽ mạnh nhất của phía ủng hộ." },
          { label: "Hỏi chiều phản đối", detail: "Thử 'tại sao không nên chọn X' để thấy lý lẽ mạnh nhất của phía phản đối." },
          { label: "Dán cạnh nhau và gạch phần không có nguồn", detail: "Chỉ giữ ý nào mở được nguồn và tìm thấy nội dung trong đó. Phần còn lại coi là chưa kiểm." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp trả lời câu hỏi 'Tại sao phần mềm X tốt cho phòng kế toán?'",
        task: "Bấm vào các câu đáng ngờ. Bản nháp trả lời đúng theo hướng câu hỏi, nhưng có câu đang khẳng định những điều không có nguồn.",
        segments: [
          { text: "Phần mềm X cho phép nhập liệu hoá đơn nhanh hơn so với làm thủ công trên bảng tính." },
          { text: "Phần mềm X không có bất kỳ nhược điểm nào và mọi phòng kế toán đều hài lòng khi chuyển sang.", error: "Khẳng định tuyệt đối không có nguồn. Không có phần mềm nào không có nhược điểm, và chữ 'mọi' là dấu hiệu bản nháp chỉ đang khen theo hướng câu hỏi." },
          { text: "Giao diện dạng bảng quen thuộc nên người đã dùng bảng tính dễ làm quen." },
          { text: "Theo khảo sát của một hiệp hội kế toán năm ngoái, 94% người dùng khuyên đồng nghiệp dùng X.", error: "Con số và khảo sát không có tên, không có đường dẫn: dạng chi tiết dễ bịa để hợp hướng 'tại sao tốt'. Phải mở nguồn mới dùng được." },
          { text: "Việc phần mềm có hợp với quy trình riêng của công ty bạn cần được thử với dữ liệu thật." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu hỏi trung lập",
          text: "'Điểm mạnh và điểm yếu của X là gì, theo nguồn nào?' AI phải đi cả hai hướng, nêu được điểm cần cân nhắc, và bạn thấy chỗ nào còn thiếu nguồn.",
        },
        right: {
          label: "Câu hỏi có sẵn kết luận",
          text: "'Tại sao X tốt?' hoặc 'Hãy chứng minh X hợp lý.' AI đi theo hướng đó, câu trả lời gọn, trôi chảy, rất dễ tin và rất thiếu một nửa bức tranh.",
        },
      },
      {
        type: "callout",
        label: "Cả bạn cũng thiên lệch",
        text: "Người ta hay tin kỹ hơn khi đọc điều hợp ý mình. Nếu bản AI làm bạn gật đầu nhanh, hãy dừng lại và tìm bản ngược lại trước khi tin. Quyết định lớn về tiền hoặc pháp lý thì hỏi thêm chuyên gia hoặc bộ phận pháp chế.",
      },
      {
        type: "scenario",
        title: "Chọn phần mềm chấm công",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nghiêng về phần mềm chấm công X. Bạn cần đưa ra đề xuất cho sếp vào chiều nay.",
            choices: [
              { label: "Hỏi AI 'tại sao X tốt nhất cho công ty mình' rồi chép kết quả làm đề xuất", next: "bad_one" },
              { label: "Hỏi cả hai chiều: nên chọn X và không nên chọn X", next: "s2" },
            ],
          },
          bad_one: {
            text: "Đề xuất rất thuyết phục. Một tuần sau, nhân sự phát hiện X không xuất được dữ liệu theo mẫu công ty đang dùng. Bản đề xuất của bạn không hề nhắc điều này.",
            ending: "bad",
          },
          s2: {
            text: "Hai danh sách nói ngược nhau ở ba điểm. Bạn có 30 phút.",
            choices: [
              { label: "Mở nguồn của ba điểm đó, giữ điều có nguồn và ghi điều chưa kiểm vào đề xuất", next: "good" },
              { label: "Chọn danh sách dài hơn vì có nhiều lý do hơn", next: "bad_len" },
            ],
          },
          bad_len: {
            text: "Danh sách ủng hộ dài hơn nhưng nhiều ý là chung chung. Sếp hỏi ba câu cụ thể và bạn không trả lời được câu nào.",
            ending: "bad",
          },
          good: {
            text: "Đề xuất của bạn có hai lý do ủng hộ có nguồn và hai rủi ro cần thử trước. Sếp đồng ý chạy thử một tháng thay vì mua ngay.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi của bạn là hướng đi của câu trả lời.",
          "Bỏ tính từ đánh giá, hỏi cả hai chiều.",
          "Lời đồng ý của AI chưa phải bằng chứng.",
          "Chỉ giữ điều mở được nguồn.",
        ],
      },
    ],
  },
  {
    id: 2317,
    slug: "ghi-so-tay-nghien-cuu-de-nguoi-khac-lam-lai",
    title: "Chặng 45, Bài 18: Sổ tay nghiên cứu để đồng nghiệp làm lại được",
    subtitle: "Một trang ghi chú giúp người khác kiểm lại kết luận của bạn trong 15 phút.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ba tuần sau khi nộp báo cáo, sếp hỏi 'số này lấy ở đâu'. Bạn không nhớ đã hỏi AI câu gì, đã loại nguồn nào, đã thử từ khoá nào. Nếu có một trang ghi chú, bạn hoặc đồng nghiệp kiểm lại trong 15 phút; nếu không, bạn phải làm lại từ đầu hoặc đành nói 'chắc là đúng'.",
    openingQuestion:
      "Một đồng nghiệp muốn kiểm lại kết quả nghiên cứu của bạn mà không phải hỏi bạn. Điều nào bạn nên có sẵn?",
    openingOptions: [
      "Sổ ghi câu hỏi, từ khoá đã thử, nguồn đã loại và lý do",
      "Chỉ kết luận cuối cùng, vì người kiểm sẽ tự tìm đường đi",
      "Toàn bộ cuộc trò chuyện với AI, dán nguyên văn không sắp xếp",
      "Một lời hứa là bạn đã kiểm kỹ, kèm tên bạn ở cuối báo cáo",
    ],
    correctOption: 0,
    explanation:
      "Người kiểm cần đi lại đúng đường bạn đã đi: câu hỏi nào, từ khoá nào, nguồn nào được giữ và nguồn nào bị loại vì sao. Chỉ có kết luận thì họ phải làm lại từ đầu. Cuộc trò chuyện dán nguyên văn thì dài, lẫn nhiều bước thừa và khó đọc trong 15 phút. Lời hứa không phải bằng chứng, và tên bạn ở cuối báo cáo không cho họ kiểm thứ gì.",
    diagram: [
      { label: "Ghi câu hỏi và từ khoá đã thử", arrow: true },
      { label: "Ghi nguồn đã giữ và nguồn đã loại kèm lý do", arrow: true },
      { label: "Ghi kết luận và mức chắc chắn", arrow: true },
      { label: "Đồng nghiệp kiểm lại trong 15 phút" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự tìm thông tin về mức phụ cấp phổ biến cho một vị trí. Cô ghi vào sổ câu hỏi đã hỏi, hai nguồn đã giữ và một bài blog đã loại vì không nêu nguồn số liệu. Hai tháng sau, đồng nghiệp cần cập nhật và làm lại đúng các bước trong 15 phút, không phải hỏi lại cô.",
    },
    quiz: [
      q(
        "Mục đích chính của sổ tay nghiên cứu là gì?",
        [
          "Để người khác lặp lại các bước và kiểm lại kết luận trong khoảng 15 phút",
          "Để chứng minh bạn đã làm việc chăm chỉ khi sếp hỏi",
          "Để lưu kết luận cuối, còn đường đi thì không cần giữ",
          "Để AI nhớ cuộc trò chuyện hôm trước mà không phải đưa lại",
        ],
        "Sổ tay có giá trị vì người khác đi lại được đường bạn đã đi. Dùng nó để chứng minh chăm chỉ hay chỉ lưu kết luận thì bỏ mất phần kiểm lại, và AI không nhớ cuộc trò chuyện cũ chỉ vì bạn có sổ ghi chú.",
      ),
      q(
        "Mục nào trong sổ tay hay bị bỏ qua nhất mà lại rất có ích?",
        [
          "Nguồn đã loại kèm lý do loại từng nguồn",
          "Tên công cụ AI và giờ bắt đầu làm việc",
          "Toàn bộ câu trả lời dài mà AI trả về ở từng lượt hỏi trong suốt buổi",
          "Những nguồn đã dùng trong kết luận cuối, còn lại coi như bỏ đi",
        ],
        "Nguồn đã loại cho biết bạn đã thấy điều gì mà không tin, nên người sau không mất thời gian xét lại cùng một bài. Tên công cụ và giờ làm có ích ít hơn; dán toàn bộ câu trả lời làm sổ quá dài; chỉ ghi nguồn đã dùng thì mất đúng phần lý do.",
      ),
      q(
        "Một từ khoá bạn đã thử nhưng không cho kết quả hữu ích. Có nên ghi vào sổ không?",
        [
          "Có, để người sau khỏi thử lại",
          "Không, vì chỉ những từ khoá cho ra kết quả hữu ích nhất mới đáng ghi lại",
          "Không, vì từ khoá thất bại làm sổ dài và khó đọc hơn rất nhiều",
          "Có, nhưng chỉ khi bạn định xin thêm thời gian từ sếp để làm tiếp",
        ],
        "Từ khoá thất bại cũng là thông tin: nó tiết kiệm công người sau. Chỉ một dòng là đủ, không làm sổ dài thêm đáng kể. Ghi để xin thêm thời gian là lý do sai, vì sổ tay phục vụ việc kiểm lại.",
      ),
      q(
        "Khi ghi câu bạn hỏi AI vào sổ, nên ghi gì?",
        [
          "Nguyên văn câu hỏi, ngày hỏi và công cụ đã dùng",
          "Bản tóm tắt ý chính của câu hỏi theo cách bạn nhớ lại",
          "Chỉ kết quả nhận được, vì câu hỏi có thể viết lại bất cứ lúc nào",
          "Chỉ tên chủ đề cho gọn",
        ],
        "Kết quả của AI phụ thuộc vào từng chữ trong câu hỏi, nên phải giữ nguyên văn, kèm ngày và công cụ vì hai thứ này cũng làm kết quả khác đi. Tóm tắt theo trí nhớ làm mất chữ quan trọng, còn chỉ ghi chủ đề thì không ai làm lại được.",
      ),
      q(
        "Đồng nghiệp báo không mở lại được một nguồn bạn đã ghi. Cách xử lý nào tốt nhất?",
        [
          "Ghi thêm ngày truy cập và nơi lưu bản chụp hoặc tệp của nguồn đó",
          "Giữ nguyên, coi như lỗi của đồng nghiệp vì đường dẫn đó ai cũng mở được",
          "Thay bằng nguồn khác có nội dung na ná mà không ghi lại việc thay",
          "Nhờ AI tìm lại nguồn rồi dán vào sổ thay cho nguồn cũ",
        ],
        "Đường dẫn có thể đổi hoặc bị gỡ, nên ngày truy cập và bản lưu giúp người sau thấy đúng thứ bạn đã thấy. Thay nguồn không ghi lại làm sổ sai, và nguồn AI tìm lại có thể không phải nguồn bạn từng đọc.",
      ),
    ],
    keyTakeaways: [
      "Sổ tay giúp người khác kiểm lại trong 15 phút.",
      "Ghi nguyên văn câu hỏi, ngày hỏi và công cụ.",
      "Ghi từ khoá đã thử, cả những từ không ra gì.",
      "Ghi nguồn đã loại và lý do: nửa giá trị của sổ nằm ở đó.",
      "Ghi ngày truy cập và nơi lưu bản chụp nguồn.",
    ],
    practicePrompt: {
      question:
        "Bạn sắp nộp báo cáo nghiên cứu ngắn cho sếp. Trong sổ tay của bạn còn thiếu điều gì quan trọng nhất cho người kiểm lại?",
      options: [
        "Lý do vì sao bạn loại hai nguồn đã tìm thấy",
        "Một đoạn giới thiệu dài về bản thân và kinh nghiệm",
        "Tên các công cụ AI bạn đã thấy trên mạng mà chưa dùng",
        "Bản sao chép toàn bộ những bài báo dài bạn đã đọc",
      ],
      correct: 0,
      explanation:
        "Lý do loại nguồn là thứ người kiểm không tự đoán được, và nó cho thấy bạn đã đánh giá chứ không chỉ gom lại. Phần giới thiệu bản thân và công cụ chưa dùng không giúp kiểm lại, còn chép nguyên bài báo thì dài và có thể vướng bản quyền.",
    },
    summary: {
      keyIdea: "Nghiên cứu chỉ đáng tin khi người khác đi lại được đường bạn đã đi.",
      formula: "Câu hỏi nguyên văn + từ khoá đã thử + nguồn giữ/loại kèm lý do + kết luận = sổ tay kiểm lại được.",
      commonMistake: "Chỉ giữ kết luận và vứt đường đi, rồi ba tuần sau không ai, kể cả bạn, biết số từ đâu.",
      action: "Mở một trang ghi chú mới và chia sẵn năm mục: câu hỏi, từ khoá, nguồn giữ, nguồn loại, kết luận.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một việc tìm hiểu bạn đã làm tuần này bằng AI hoặc tìm kiếm. Dựng lại sổ tay từ trí nhớ và lịch sử: câu hỏi nguyên văn, ba từ khoá đã thử, nguồn giữ, nguồn loại kèm lý do. Đưa cho một đồng nghiệp đọc và xem họ có kiểm lại được trong 15 phút không.",
      secondary: "Chỗ đồng nghiệp hỏi lại bạn là chỗ sổ tay còn thiếu.",
    },
    sections: [
      {
        type: "lead",
        text: "Kết luận nghiên cứu sống lâu hơn trí nhớ của bạn. Một trang ghi chú viết đúng lúc khiến người khác, và chính bạn ba tuần sau, kiểm lại được mà không phải làm lại từ đầu.",
      },
      {
        type: "feynman",
        title: "Sổ tay nghiên cứu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới công thức nấu ăn. Món ăn ngon nhưng không ai làm lại được nếu chỉ có tấm ảnh. Công thức ghi nguyên liệu, lửa to hay nhỏ, nấu bao lâu, và cả 'đừng cho nước mắm sớm kẻo bị đắng'. Sổ tay nghiên cứu là công thức của kết luận.",
        columns: ["Thành phần", "Công thức nấu ăn", "Sổ tay nghiên cứu"],
        rows: [
          ["Nguyên liệu", "Thịt, rau, gia vị", "Câu hỏi nguyên văn và nguồn đã dùng"],
          ["Các bước", "Xào trước, hầm sau", "Từ khoá đã thử, thứ tự đã tìm"],
          ["Điều nên tránh", "Đừng cho mắm sớm", "Nguồn đã loại và lý do"],
          ["Người khác làm lại", "Nấu ra gần đúng vị", "Kiểm lại trong 15 phút"],
        ],
        oneLiner: "Kết luận là món ăn, sổ tay là công thức: không có công thức thì chỉ có niềm tin.",
      },
      { type: "heading", text: "Năm mục trên một trang" },
      {
        type: "paragraph",
        text: "Sổ tay không cần đẹp, chỉ cần đủ năm mục: câu hỏi nguyên văn, từ khoá đã thử, nguồn đã giữ, nguồn đã loại và lý do, kết luận kèm mức chắc chắn. Viết ngay khi làm: ghi sau một tuần thì bạn đã quên nguồn nào bị loại và vì sao.",
      },
      {
        type: "flow",
        title: "Ghi sổ song song với việc tìm",
        steps: [
          { label: "Ghi câu hỏi nguyên văn trước khi hỏi", detail: "Dán đúng chữ bạn gõ, kèm ngày và tên công cụ. Chỉ đổi một chữ cũng có thể đổi kết quả." },
          { label: "Ghi từ khoá, kể cả từ không ra gì", detail: "Một dòng mỗi lần thử. Người sau khỏi lặp lại những nhánh đã cụt." },
          { label: "Ghi nguồn giữ và nguồn loại", detail: "Mỗi nguồn: tên, ngày đăng, ngày bạn truy cập, đường dẫn. Nguồn loại thêm một câu lý do." },
          { label: "Ghi kết luận và mức chắc chắn", detail: "Viết kết luận, rồi nói chắc hay dè dặt và dựa vào nguồn nào." },
          { label: "Nhờ một người thử kiểm lại", detail: "Đưa sổ cho đồng nghiệp. Chỗ họ phải hỏi bạn là chỗ sổ còn thiếu." },
        ],
      },
      {
        type: "scenario",
        title: "Ba tuần sau báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi lại một con số trong báo cáo bạn nộp ba tuần trước: 'Số này lấy ở đâu, còn đúng không?'. Bạn không ghi sổ tay.",
            choices: [
              { label: "Nói 'chắc là đúng, em làm kỹ rồi' vì không muốn mất thời gian", next: "bad_trust" },
              { label: "Nói cần nửa tiếng để tìm lại, rồi dựng lại từ lịch sử", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Sếp dùng con số trong một đề xuất gửi khách. Một tuần sau khách chỉ ra con số đã đổi. Bạn không chứng minh được số đó từng đúng hay từ nguồn nào.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm lại được nguồn chính nhưng không nhớ mình đã loại bài nào và vì sao.",
            choices: [
              { label: "Báo sếp nguồn chính, nói rõ phần chưa nhớ, rồi bắt đầu ghi sổ từ hôm nay", next: "good" },
              { label: "Nói nguồn chính là nguồn duy nhất bạn từng xem để khỏi bị hỏi thêm", next: "bad_lie" },
            ],
          },
          bad_lie: {
            text: "Đồng nghiệp tìm ra thêm một bài ngược lại. Sếp nhận ra bạn đã nói sai về việc mình từng xem, và niềm tin vào các báo cáo sau của bạn giảm.",
            ending: "bad",
          },
          good: {
            text: "Sếp chấp nhận câu trả lời thật thà và hỏi bạn đưa sổ cho cả nhóm dùng làm mẫu. Lần sau, đồng nghiệp kiểm lại số của bạn trong 15 phút.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI sắp xếp ghi chú nghiên cứu",
        task: "Bạn có một đống ghi chú lộn xộn. Lắp prompt để AI xếp vào năm mục mà không thêm điều gì bạn chưa ghi.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Chủ đề nghiên cứu của tôi là tỷ lệ nghỉ việc trong ngành bán lẻ, hãy viết sổ tay.", feedback: "AI chỉ có chủ đề nên sẽ tự bịa ra câu hỏi, từ khoá và nguồn, rồi trình bày như bạn đã làm." },
              { text: "Dán ghi chú thô của bạn: các câu đã hỏi, các từ khoá, danh sách đường dẫn và vài dòng nhận xét.", good: true, feedback: "AI chỉ sắp xếp những gì bạn đã ghi, nên sổ tay phản ánh việc bạn thật sự đã làm." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một đoạn văn gọn, dễ đọc.", feedback: "Đoạn văn trộn lẫn mọi thứ, người kiểm không tìm được riêng nguồn đã loại." },
              { text: "Chia năm mục: câu hỏi, từ khoá, nguồn giữ, nguồn loại kèm lý do, kết luận.", good: true, feedback: "Năm mục cố định giúp người đọc tìm đúng thứ cần kiểm." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Bổ sung chỗ còn thiếu cho đầy đủ nhất có thể.", feedback: "AI sẽ lấp chỗ trống bằng nguồn và lý do nghe hợp lý nhưng bạn chưa hề xem." },
              { text: "Chỗ nào ghi chú không có thì viết 'chưa ghi', không được thêm nguồn hay lý do mới.", good: true, feedback: "Chỗ thiếu được gọi tên, bạn biết phải bổ sung bằng chính trí nhớ và lịch sử của mình." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "format", "limit"],
            text: "1. Câu hỏi: (nguyên văn 2 câu bạn đã dán)\n2. Từ khoá: 3 cụm bạn đã ghi\n3. Nguồn giữ: 2 đường dẫn bạn đã dán\n4. Nguồn loại: chưa ghi lý do\n5. Kết luận: bạn chỉ ghi 'số còn cao', chưa ghi mức chắc chắn",
          },
          {
            requires: ["input"],
            text: "4. Nguồn loại: một bài blog bị loại vì 'không nêu nguồn số liệu'.\n\n(Bạn chưa hề ghi lý do này, AI tự nghĩ ra để trông đầy đủ.)",
          },
          {
            text: "Sổ tay: tôi đã hỏi nhiều câu, thử nhiều từ khoá, xem các bài uy tín và loại các bài kém tin cậy. Kết luận: tỷ lệ nghỉ việc khá cao.\n\n(Một đoạn chung chung, không ai kiểm lại được.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Có sổ tay",
          text: "Sếp hỏi số từ đâu thì bạn mở sổ và trả lời trong vài phút. Đồng nghiệp cập nhật được mà không phải hỏi lại bạn.",
        },
        right: {
          label: "Chỉ có kết luận",
          text: "Sau vài tuần không ai nhớ câu hỏi, nguồn đã loại hay lý do. Cách duy nhất là làm lại từ đầu, hoặc nói 'chắc là đúng'.",
        },
      },
      {
        type: "closing",
        lines: [
          "Sổ tay là công thức của kết luận.",
          "Năm mục: câu hỏi, từ khoá, nguồn giữ, nguồn loại, kết luận.",
          "Ghi ngay khi làm, không ghi sau.",
          "Chỗ đồng nghiệp hỏi lại bạn là chỗ sổ còn thiếu.",
        ],
      },
    ],
  },
  {
    id: 2318,
    slug: "dieu-khong-nen-dan-vao-o-tim-kiem",
    title: "Chặng 45, Bài 19: Điều không nên dán vào ô tìm kiếm AI",
    subtitle: "Viết lại yêu cầu thành bản ẩn danh mà vẫn hỏi được ý chính.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang soạn đề xuất cho một khách hàng lớn và dán thẳng email của họ, kèm bảng giá nội bộ, vào ô AI để nhờ viết nháp. Mười giây tiết kiệm được đó có thể là một lần đưa dữ liệu khách ra ngoài công ty. Tin tốt là gần như lúc nào bạn cũng hỏi được ý chính bằng một bản ẩn danh mà không mất gì.",
    openingQuestion:
      "Bạn định hỏi AI cách trả lời một khách đòi giảm giá. Thứ nào KHÔNG nên có trong ô hỏi?",
    openingOptions: [
      "Tên khách, giá nội bộ và chi tiết nhận ra được hợp đồng cụ thể",
      "Một mô tả chung về loại khách và lý do họ đòi giảm giá",
      "Mức giảm giá giả định để thử các cách trả lời khác nhau",
      "Giọng điệu bạn muốn dùng và độ dài mong muốn của thư cùng tên khách cho tiện",
    ],
    correctOption: 0,
    explanation:
      "Điều AI cần để giúp bạn là tình huống: khách đòi giảm, bạn muốn giữ khách mà không phá giá. Tên khách và giá nội bộ không cần cho việc đó mà lại là dữ liệu của công ty và của khách. Mô tả chung, mức giảm giả định và giọng điệu đều không nhận ra được ai, nên gửi ra ngoài ít rủi ro hơn rất nhiều.",
    diagram: [
      { label: "Yêu cầu gốc có tên khách và giá nội bộ", arrow: true },
      { label: "Hỏi mình: AI có thật cần chi tiết này không", arrow: true },
      { label: "Thay bằng 'khách A', khoảng giá hoặc mức giả định", arrow: true },
      { label: "Hỏi bản ẩn danh rồi tự điền chi tiết thật vào kết quả" },
    ],
    realWorldExample: {
      company: "Samsung (2023)",
      description:
        "Năm 2023, nhân viên Samsung dán mã nguồn nội bộ và nội dung cuộc họp vào ChatGPT, sau đó công ty hạn chế dùng AI tạo sinh trên thiết bị công ty. Bài học của bài này không phải là đừng dùng AI, mà là thứ bạn dán vào ô chat là dữ liệu đã rời khỏi tay bạn.",
    },
    quiz: [
      q(
        "Loại thông tin nào nên tránh đưa vào ô hỏi của một công cụ AI chưa được công ty duyệt?",
        [
          "Tên khách, giá nội bộ và bất cứ chi tiết nào nhận ra được một người hay một hợp đồng",
          "Một câu hỏi chung về cách đọc báo cáo tài chính",
          "Một thông cáo báo chí đã đăng công khai",
          "Tên công ty đã niêm yết và số liệu đã công bố",
        ],
        "Điều cần tránh là dữ liệu nhận ra được khách, nhân viên hoặc hợp đồng của bạn. Câu hỏi kiến thức chung, thông cáo đã đăng và số liệu công bố đều đã công khai nên rủi ro thấp.",
      ),
      q(
        "Cách nào viết lại yêu cầu thành bản ẩn danh tốt nhất mà vẫn hỏi được ý chính?",
        [
          "Thay tên khách bằng 'khách A' và giá bằng mức giả định",
          "Chỉ bỏ họ của khách, giữ tên gọi và giá nội bộ như cũ vì họ đã đủ nhận ra khách",
          "Đổi tên khách thành tên một công ty khác có thật trên thị trường",
          "Viết tắt tên khách còn giá nội bộ giữ nguyên để kết quả chính xác",
        ],
        "Ẩn danh đúng nghĩa là chi tiết còn lại không chỉ về một khách cụ thể. Bỏ họ hoặc viết tắt vẫn để người quen nhận ra, giá nội bộ giữ nguyên vẫn là dữ liệu mật, và dùng tên công ty thật khác vừa gán sai vừa đưa thêm một tên không liên quan.",
      ),
      q(
        "Bạn đã tắt lịch sử trò chuyện. Có nên dán thêm dữ liệu khách không?",
        [
          "Chưa chắc an toàn, hãy hỏi bộ phận IT",
          "An toàn hoàn toàn vì dữ liệu biến mất ngay sau mỗi lần AI trả lời",
          "An toàn nếu bạn dùng bản trả phí, vì bản trả phí luôn riêng tư tuyệt đối",
          "An toàn nếu đóng tab trình duyệt ngay sau khi nhận được kết quả",
        ],
        "Tắt lịch sử chỉ là một cài đặt, còn chính sách lưu trữ tuỳ từng công cụ và từng loại tài khoản; bạn không tự suy ra được. Hỏi IT hoặc xem quy định công ty là cách đúng. Đóng tab không xoá dữ liệu đã gửi đi.",
      ),
      q(
        "Công ty đã duyệt một công cụ AI. Bạn có thể dán hợp đồng khách vào đó không?",
        [
          "Chỉ khi quy định công ty cho phép đúng loại dữ liệu đó",
          "Được, vì công cụ đã duyệt thì mọi loại dữ liệu đều dùng được",
          "Được, nếu bạn xoá tên công ty ở trang đầu của hợp đồng",
          "Không bao giờ, vì AI không đọc được hợp đồng",
        ],
        "'Đã duyệt' thường gắn với loại dữ liệu và mục đích cụ thể, nên phải đọc quy định. Xoá tên ở trang đầu không che các chi tiết khác trong hợp đồng, và AI đọc được văn bản hợp đồng; vấn đề là có được phép đưa vào hay không.",
      ),
      q(
        "Sau khi ẩn danh yêu cầu, bạn lo AI không giúp được vì thiếu chi tiết. Điều nào đúng hơn?",
        [
          "Vẫn hỏi được, vì ý chính nằm ở tình huống chứ không ở tên người",
          "Không hỏi được, vì AI cần tên thật mới viết được thư",
          "Chỉ hỏi được nếu bạn thêm vài chi tiết thật về hợp đồng",
          "Hỏi được nhưng kết quả chắc chắn sẽ sai vì đã đổi dữ liệu",
        ],
        "AI làm tốt việc chữ dựa trên tình huống: khách đòi giảm, bạn muốn giữ khách. Tên thật và giá nội bộ bạn điền lại vào kết quả sau. Thêm chi tiết thật thì quay lại đúng rủi ro cũ, và kết quả không vì ẩn danh mà chắc chắn sai.",
      ),
    ],
    keyTakeaways: [
      "Dán vào ô hỏi là gửi dữ liệu ra ngoài công ty.",
      "Tự hỏi: AI có thật cần chi tiết này không?",
      "Thay tên khách bằng 'khách A', giá bằng mức giả định.",
      "Công cụ đã duyệt vẫn có giới hạn theo loại dữ liệu.",
      "Kết quả nhận về thì bạn điền chi tiết thật vào sau.",
    ],
    practicePrompt: {
      question:
        "Bạn cần AI giúp viết email nhắc công nợ. Bản nào vừa ẩn danh vừa đủ ý cho AI?",
      options: [
        "Khách A nợ khoảng 10 triệu, quá hạn 15 ngày, cần thư nhắc giữ quan hệ",
        "Công ty Minh Phát nợ 12.450.000 đồng theo hoá đơn 0245, quá hạn 15 ngày",
        "Khách hàng ở Đà Nẵng mua lô hàng tháng 3 nợ 12 triệu, quá hạn",
        "Khách VIP lâu năm họ Trần nợ đúng số tiền trong hợp đồng gần nhất",
      ],
      correct: 0,
      explanation:
        "Chỉ bản đầu giữ tình huống (quá hạn, cần giữ quan hệ) và bỏ các chi tiết nhận ra được. Bản hai có tên, số hoá đơn và số tiền thật. Bản ba có địa phương, thời điểm và số tiền gần như thật, đủ để nhận ra một khách. Bản bốn có họ và quan hệ đặc biệt nên vẫn nhận ra được.",
    },
    summary: {
      keyIdea: "Hỏi AI điều bạn cần biết, không phải điều bạn đang giữ kín.",
      formula: "Yêu cầu gốc → bỏ tên, giá nội bộ, chi tiết nhận ra được → hỏi bản ẩn danh → điền chi tiết thật vào kết quả.",
      commonMistake: "Dán nguyên email hay bảng giá vì 'cho nhanh' và không nghĩ nó đã rời khỏi công ty.",
      action: "Trước khi bấm gửi, đọc lại ô hỏi một lần và gạch mọi tên, số, địa chỉ nhận ra được.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một yêu cầu bạn từng định nhờ AI mà có tên khách, giá hoặc số liệu nội bộ. Viết lại bản ẩn danh: khách A, mức giả định, không địa danh. Gửi bản ẩn danh cho AI, rồi tự điền chi tiết thật vào kết quả. So xem bản ẩn danh có mất ý chính không.",
      secondary: "Nếu công ty bạn có quy định dùng AI, đọc lại nó một lần và ghi vào ghi chú hai loại dữ liệu bạn không được dán.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi lần bạn dán thứ gì đó vào ô hỏi AI, bạn đang gửi nó ra ngoài. Bài này dạy một thói quen 30 giây: lược bỏ những thứ AI không cần trước khi hỏi, để vẫn nhờ được mà không mang dữ liệu đi.",
      },
      {
        type: "feynman",
        title: "Ẩn danh yêu cầu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc hỏi ý kiến một người bạn trong quán cà phê. Bạn kể 'có một khách đòi giảm giá, mình nên làm sao', chứ không đưa cho bạn ấy xem hợp đồng và số điện thoại của khách. Bạn ấy vẫn khuyên được, vì điều cần là tình huống.",
        columns: ["Điều bạn có", "Kể cho bạn ở quán cà phê", "Hỏi AI"],
        rows: [
          ["Tên khách", "Một khách", "Khách A"],
          ["Con số nhạy cảm", "Giá hơi thấp", "Mức giả định, khoảng giá"],
          ["Chi tiết nhận ra được", "Không kể", "Bỏ địa chỉ, ngày, số hợp đồng"],
          ["Sau khi có lời khuyên", "Tự áp dụng vào khách thật", "Tự điền chi tiết thật vào kết quả"],
        ],
        oneLiner: "AI cần tình huống để giúp, không cần chìa khoá mở ra khách của bạn.",
      },
      { type: "heading", text: "Ba thứ thường bị dán nhầm" },
      {
        type: "paragraph",
        text: "Thứ nhất là tên và thông tin liên hệ của khách hoặc nhân viên. Thứ hai là con số nội bộ: giá vốn, bảng giá, lương, hạn mức. Thứ ba là tài liệu nguyên bản: hợp đồng, email dài, biên bản họp. Nếu công ty có quy định, hãy theo quy định. Nếu không chắc, hỏi bộ phận IT hoặc pháp chế trước khi dán.",
      },
      {
        type: "flow",
        title: "Từ yêu cầu gốc tới bản ẩn danh",
        steps: [
          { label: "Đọc lại yêu cầu gốc", detail: "Đọc như người lạ nhìn vào: họ biết được khách nào, công ty nào, giá nào?" },
          { label: "Hỏi từng chi tiết: AI có cần không", detail: "Tên khách, số hợp đồng, địa chỉ hầu như không cần cho việc viết câu trả lời." },
          { label: "Thay bằng nhãn hoặc mức giả định", detail: "Khách A, 'khoảng 10 triệu', 'một thành phố lớn'. Giữ đúng cấu trúc tình huống." },
          { label: "Hỏi, rồi tự điền chi tiết thật", detail: "Nhận kết quả với chỗ trống, rồi bạn tự điền tên và số thật ở máy của bạn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết lại yêu cầu nhờ soạn thư trả lời khách đòi giảm giá",
        task: "Yêu cầu gốc có tên công ty khách, giá nội bộ và mức giảm đã thoả thuận. Lắp bản ẩn danh mà AI vẫn viết được thư.",
        parts: [
          {
            id: "who",
            label: "Khách hàng",
            options: [
              { text: "Công ty Minh Phát, khách lâu năm ở Đà Nẵng.", feedback: "Tên và địa phương gần như chỉ ra đúng một khách, đó chính là dữ liệu bạn muốn giữ lại." },
              { text: "Khách A, khách lâu năm của một công ty vừa và nhỏ.", good: true, feedback: "Giữ đúng điều AI cần (khách lâu năm) và bỏ điều nhận ra được." },
            ],
          },
          {
            id: "price",
            label: "Con số",
            options: [
              { text: "Giá nội bộ là 1.200 đồng một cái, vốn 950, khách xin giảm xuống 1.050.", feedback: "Giá vốn và giá nội bộ là dữ liệu mật của công ty, và AI không cần chúng để viết thư." },
              { text: "Khách xin giảm khoảng 10 phần trăm, công ty chỉ có thể giảm tối đa một nửa mức đó.", good: true, feedback: "Mức giả định đủ để AI dựng lập luận, không lộ giá thật." },
            ],
          },
          {
            id: "ask",
            label: "Việc cần làm",
            options: [
              { text: "Viết thư trả lời thật hay, sao cho khách hài lòng.", feedback: "Quá mơ hồ: AI sẽ hứa thêm ưu đãi mà công ty chưa duyệt." },
              { text: "Viết thư ngắn, giọng lịch sự, từ chối giảm đủ mức khách xin nhưng đề nghị một phương án khác; không hứa điều gì mới.", good: true, feedback: "Việc, giọng và giới hạn đều rõ, AI không hứa thay công ty." },
            ],
          },
        ],
        responses: [
          {
            requires: ["who", "price", "ask"],
            text: "Chào anh/chị [tên khách],\n\nCảm ơn anh/chị đã hợp tác lâu nay. Chúng tôi xin phép giữ mức giá hiện tại, nhưng có thể cân nhắc [phương án khác, tự điền]. Xin anh/chị cho biết phương án nào phù hợp.\n\nTrân trọng.",
          },
          {
            requires: ["who"],
            text: "Chào anh/chị,\n\nChúng tôi đồng ý giảm thêm 5% và miễn phí vận chuyển cho đơn tiếp theo.\n\n(AI tự hứa mức giảm và miễn phí vận chuyển mà công ty chưa hề duyệt.)",
          },
          {
            text: "Kính gửi Công ty Minh Phát,\n\nTheo hợp đồng ký tại Đà Nẵng, giá nội bộ của chúng tôi đã rất sát giá vốn 950 đồng, nên không thể giảm thêm...\n\n(Thư lộ giá vốn với chính khách, và dữ liệu đã đi qua công cụ bên ngoài.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi bản ẩn danh",
          text: "AI nhận tình huống, bạn giữ dữ liệu thật. Kết quả có chỗ trống để tự điền. Nếu công cụ bị lộ hay đổi chính sách, phần mất mát là rất ít.",
        },
        right: {
          label: "Dán nguyên yêu cầu",
          text: "Tiện trong mười giây, nhưng tên, giá và chi tiết hợp đồng đã rời khỏi công ty. Không lấy lại được, và có thể vi phạm quy định hoặc điều khoản bảo mật với khách.",
        },
      },
      {
        type: "callout",
        label: "Công cụ đã duyệt vẫn có giới hạn",
        text: "Một công cụ được công ty duyệt thường chỉ duyệt cho một số loại dữ liệu. Đọc quy định, và khi không chắc thì hỏi IT hoặc pháp chế. Việc bạn có điều khoản bảo mật với khách hay không là việc của pháp chế, không phải thứ AI trả lời thay bạn.",
      },
      {
        type: "scenario",
        title: "Khách đòi giảm giá lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách lớn gửi email đòi giảm giá, hạn trả lời là 5 giờ chiều. Bạn muốn nhờ AI soạn nháp.",
            choices: [
              { label: "Dán cả email của khách và bảng giá nội bộ vào ô AI cho nhanh", next: "bad_paste" },
              { label: "Viết lại thành tình huống ẩn danh rồi hỏi", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bản nháp rất tốt, nhưng công ty bạn có điều khoản không đưa giá ra bên ngoài. Khi bộ phận pháp chế biết, bạn bị nhắc nhở chính thức.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có bản ẩn danh: 'Khách A xin giảm khoảng 10%, công ty chỉ có thể giảm một nửa'. Còn 40 phút.",
            choices: [
              { label: "Nhận nháp, tự điền tên và số thật, rồi đọc lại toàn bộ trước khi gửi", next: "good" },
              { label: "Gửi nguyên bản nháp vì AI đã viết hay rồi", next: "bad_send" },
            ],
          },
          bad_send: {
            text: "Bản nháp còn nguyên dòng '[tên khách]' và một câu hứa miễn phí vận chuyển. Khách đòi công ty thực hiện lời hứa đó.",
            ending: "bad",
          },
          good: {
            text: "Thư gửi đúng hạn, đúng giá và không hứa điều gì mới. Dữ liệu thật chưa bao giờ rời khỏi máy bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Dán vào ô hỏi là gửi ra ngoài.",
          "AI cần tình huống, không cần tên và giá thật.",
          "Ẩn danh, hỏi, rồi tự điền chi tiết thật.",
          "Không chắc thì hỏi IT hoặc pháp chế.",
        ],
      },
    ],
  },
  {
    id: 2319,
    slug: "bai-tong-ket-bao-cao-nghien-cuu-co-trich-dan-day-du",
    title: "Chặng 45, Bài 20: Tổng kết: báo cáo nghiên cứu ngắn có trích dẫn đầy đủ",
    subtitle: "Một báo cáo hai trang: câu hỏi rõ, nguồn đã kiểm, chỗ mâu thuẫn và mức chắc chắn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã học cách hỏi, kiểm nguồn, xử lý mâu thuẫn và ghi sổ. Bài cuối gom lại thành một sản phẩm: báo cáo hai trang mà sếp đọc được trong năm phút và đồng nghiệp kiểm lại được trong mười lăm phút. Đây là thứ phân biệt 'tôi đã hỏi AI' với 'tôi đã nghiên cứu'.",
    openingQuestion:
      "Bạn sắp nộp báo cáo hai trang cho sếp. Điều nào khiến báo cáo đáng tin nhất?",
    openingOptions: [
      "Mỗi kết luận ghi nguồn đã mở, mức chắc chắn và chỗ còn chưa rõ",
      "Văn phong trôi chảy, mạch lạc và không có chỗ nào ngập ngừng hay bỏ lửng",
      "Nhiều nguồn nhất có thể, để sếp thấy bạn đã đọc rất rộng",
      "Mọi kết luận đều nói chắc chắn để sếp dễ ra quyết định",
    ],
    correctOption: 0,
    explanation:
      "Sếp cần biết điều nào đứng vững, điều nào còn dè dặt. Nguồn đã mở, mức chắc chắn và chỗ chưa rõ cho họ biết đó. Văn phong trôi chảy là thứ AI làm giỏi nên không chứng minh gì. Nhiều nguồn mà chưa kiểm chỉ làm báo cáo dài hơn. Nói chắc mọi kết luận thì che mất chỗ yếu, đến khi sai thì sếp mất luôn niềm tin vào cả báo cáo.",
    diagram: [
      { label: "Câu hỏi rõ và phạm vi rõ", arrow: true },
      { label: "Nguồn đã mở và kiểm, ghi vào sổ", arrow: true },
      { label: "Chỗ mâu thuẫn được giải thích hoặc ghi rõ", arrow: true },
      { label: "Kết luận kèm mức chắc chắn, người xem lại đã đọc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên vận hành làm báo cáo hai trang về việc có nên thuê ngoài khâu đóng gói. Báo cáo nêu câu hỏi, ba nguồn đã mở, một chỗ hai nguồn lệch nhau kèm lý do, và kết luận 'khá chắc' cho chi phí, 'chưa chắc' cho chất lượng. Một đồng nghiệp đọc trước khi gửi và bắt được một chỗ ghi sai năm.",
    },
    quiz: [
      q(
        "'Mức chắc chắn' của một kết luận trong báo cáo có nghĩa là gì?",
        [
          "Nói rõ kết luận nào đã đủ nguồn, kết luận nào còn dè dặt",
          "Thêm chữ 'có thể' vào mọi câu để tránh bị hỏi lại về sau này",
          "Viết mọi kết luận bằng giọng chắc chắn để sếp ra quyết định nhanh",
          "Ghi phần trăm tin cậy do AI đưa ra cho từng kết luận trong báo cáo",
        ],
        "Mức chắc chắn phản ánh bằng chứng bạn có. 'Có thể' rải khắp nơi xoá sự khác nhau giữa điều chắc và điều chưa chắc. Giọng chắc chắn mọi chỗ che điểm yếu. Phần trăm do AI đưa ra không dựa trên nguồn của bạn nên là con số bịa.",
      ),
      q(
        "Trước khi gửi báo cáo, vì sao nên nhờ một người không tham gia làm đọc lại?",
        [
          "Người đó đọc không bị chi phối bởi điều bạn đã biết, nên thấy ra chỗ thiếu hoặc khó hiểu, và có thể thử mở vài nguồn ngẫu nhiên",
          "Để chia trách nhiệm, nếu sai thì không còn là lỗi riêng của bạn",
          "Để người đó viết lại văn phong cho hay hơn bản bạn đã viết",
          "Vì luật yêu cầu mọi báo cáo phải có người thứ hai ký tên",
        ],
        "Người mới thấy những chỗ bạn đã quen nên không còn nhìn thấy. Chia trách nhiệm không làm báo cáo đúng hơn, việc sửa văn phong là phụ, và không có quy định chung nào bắt phải có chữ ký người thứ hai.",
      ),
      q(
        "Bạn có 12 nguồn nhưng chỉ kiểm được 7 nguồn. Báo cáo hai trang nên ghi thế nào?",
        [
          "Chỉ dùng 7 nguồn đã kiểm, ghi 5 nguồn còn lại ở mục chưa kiểm",
          "Dùng cả 12 nguồn cho báo cáo dày dặn, không cần phân biệt nguồn nào đã kiểm hay chưa",
          "Dùng cả 12 nhưng bỏ phần ghi nguồn cho báo cáo gọn hơn",
          "Chỉ dùng 3 nguồn nổi tiếng nhất và bỏ phần còn lại",
        ],
        "Nguồn chưa kiểm không được làm nền cho kết luận, nhưng vẫn đáng ghi để người sau biết. Dùng cả 12 không phân biệt, hoặc bỏ phần ghi nguồn, làm người đọc không biết điều gì đã kiểm. Chọn theo độ nổi tiếng thay cho việc đã kiểm là lý do sai.",
      ),
      q(
        "Hai nguồn lệch nhau và bạn chưa giải thích được. Báo cáo nên đặt điều này ở đâu?",
        [
          "Ở mục 'điều còn chưa rõ', kèm hai con số và nguồn",
          "Không nhắc, vì chỉ làm sếp phân vân thêm và khiến báo cáo trông kém chắc chắn",
          "Trong chú thích cuối trang bằng cỡ chữ rất nhỏ",
          "Chọn một số và ghi chú rằng số kia đã bị loại",
        ],
        "Điều chưa rõ là thông tin có giá trị: sếp biết chỗ nào cần hỏi thêm. Giấu đi, để chú thích quá nhỏ hay loại một số mà không có lý do đều làm người đọc không thấy mâu thuẫn thật.",
      ),
      q(
        "Bản nháp AI có câu 'theo khảo sát năm 2023, 71% doanh nghiệp đã áp dụng', nhưng bạn không mở được nguồn. Nên làm gì?",
        [
          "Gỡ câu đó hoặc ghi rõ là chưa kiểm được nguồn",
          "Giữ nguyên vì con số cụ thể nghe rất đáng tin",
          "Giữ nguyên nhưng đổi 71% thành 'khoảng 70%' cho an toàn hơn",
          "Hỏi AI 'có đúng không' và giữ nếu nó trả lời là đúng",
        ],
        "Con số cụ thể không có nguồn mở được là dấu hiệu điển hình của chi tiết bịa. Làm tròn số không biến một con số chưa kiểm thành đã kiểm, và hỏi lại chính AI không phải kiểm chứng vì nó có thể xác nhận luôn điều vừa bịa.",
      ),
    ],
    keyTakeaways: [
      "Báo cáo tốt nói được điều gì chắc, điều gì chưa.",
      "Mỗi kết luận có nguồn đã mở, không phải nguồn nghe quen.",
      "Chỗ mâu thuẫn được giải thích hoặc ghi rõ là chưa rõ.",
      "Nguồn chưa kiểm không làm nền cho kết luận.",
      "Nhờ một người chưa tham gia đọc trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Báo cáo của bạn viết: 'Chi phí thuê ngoài thấp hơn tự làm 30%' và nguồn là một bài blog không nêu cách tính. Bước nào hợp lý nhất?",
      options: [
        "Tìm nguồn gốc của con số, nếu không có thì ghi là chưa kiểm được",
        "Giữ câu đó vì con số nghe hợp lý và rõ ràng",
        "Đổi 30% thành 'khoảng 30%' để thể hiện sự dè dặt",
        "Thêm tên blog vào chú thích và coi như đã có nguồn",
      ],
      correct: 0,
      explanation:
        "Một con số không có cách tính thì không kiểm được. Tìm nguồn gốc hoặc ghi là chưa kiểm mới đúng mức chắc chắn. 'Khoảng' và tên blog không thêm bằng chứng nào, còn giữ nguyên chỉ vì nghe hợp lý là lỗi tin vào chữ trôi chảy.",
    },
    summary: {
      keyIdea: "Báo cáo nghiên cứu tốt cho người đọc biết điều gì chắc, điều gì chưa và tự kiểm lại được.",
      formula: "Câu hỏi rõ + nguồn đã mở + mâu thuẫn được nêu + mức chắc chắn + người xem lại = báo cáo đáng tin.",
      commonMistake: "Nộp bản nháp AI trôi chảy, giọng chắc chắn, và coi như đã nghiên cứu xong.",
      action: "Lấy một báo cáo gần nhất của bạn và thêm cột 'mức chắc chắn' cho từng kết luận.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một câu hỏi công việc nhỏ (ví dụ: có nên đổi nhà cung cấp văn phòng phẩm). Viết báo cáo hai trang: câu hỏi và phạm vi, ba nguồn đã mở kèm ngày, chỗ hai nguồn lệch nhau nếu có, kết luận kèm mức chắc chắn. Đưa cho một đồng nghiệp đọc và bảo họ thử mở hai nguồn bất kỳ.",
      secondary: "Ghi lại chỗ đồng nghiệp hỏi lại, rồi thêm vào mẫu báo cáo của bạn cho lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài cuối gom mọi thứ của chặng này vào một sản phẩm: báo cáo hai trang sếp đọc được trong năm phút và đồng nghiệp kiểm lại được trong mười lăm phút.",
      },
      {
        type: "feynman",
        title: "Báo cáo nghiên cứu ngắn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới bác sĩ đọc kết quả xét nghiệm: bên cạnh mỗi chỉ số có khoảng bình thường, và có chỗ ghi 'cần làm lại'. Báo cáo của bạn cũng vậy: bên cạnh mỗi kết luận có nguồn, mức chắc chắn, và chỗ ghi 'chưa rõ'.",
        columns: ["Phần", "Kết quả xét nghiệm", "Báo cáo nghiên cứu"],
        rows: [
          ["Con số", "Chỉ số đo được", "Kết luận của bạn"],
          ["Đối chiếu", "Khoảng bình thường", "Nguồn đã mở, kèm ngày"],
          ["Độ tin", "Ghi chú 'nên làm lại'", "Mức chắc chắn: chắc, khá chắc, chưa chắc"],
          ["Kiểm lại", "Bác sĩ thứ hai đọc", "Đồng nghiệp xem lại trong 15 phút"],
        ],
        oneLiner: "Báo cáo tốt không chỉ nói điều bạn tìm thấy mà còn nói độ tin của từng điều.",
      },
      { type: "heading", text: "Khung hai trang" },
      {
        type: "paragraph",
        text: "Trang một: câu hỏi và phạm vi, kết luận chính kèm mức chắc chắn. Trang hai: nguồn đã mở và đã dùng, chỗ hai nguồn lệch nhau, điều còn chưa rõ, và tên người đã xem lại. Sổ tay ở bài trước là bản dài để đồng nghiệp kiểm lại; báo cáo là bản ngắn cho sếp.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi tới báo cáo hai trang",
        steps: [
          { label: "Chốt câu hỏi và phạm vi", detail: "Viết một câu hỏi, nói rõ trả lời cho ai, khi nào, và phạm vi nào không bàn." },
          { label: "Gom và kiểm nguồn", detail: "Mở từng nguồn, tìm đúng câu chứa con số. Chỉ nguồn đã kiểm mới làm nền cho kết luận." },
          { label: "Xử lý chỗ lệch nhau", detail: "So định nghĩa, thời điểm, nhóm được đo. Giải thích được thì ghi lý do, không thì ghi vào điều còn chưa rõ." },
          { label: "Viết kết luận kèm mức chắc chắn", detail: "Mỗi kết luận một câu, gắn với nguồn, và ghi chắc hay chưa chắc." },
          { label: "Nhờ người xem lại", detail: "Một người chưa tham gia đọc và thử mở ngẫu nhiên vài nguồn. Sửa theo chỗ họ hỏi rồi mới gửi." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản nháp báo cáo: nên thuê ngoài khâu đóng gói không?",
        task: "Bấm vào các câu không đủ tiêu chuẩn đưa vào báo cáo: thiếu nguồn mở được hoặc nói chắc hơn bằng chứng.",
        segments: [
          { text: "Câu hỏi: công ty có nên thuê ngoài khâu đóng gói trong 12 tháng tới, xét theo chi phí và thời gian giao hàng." },
          { text: "Theo một nghiên cứu của viện kinh tế, thuê ngoài luôn giảm chi phí đóng gói từ 25% đến 40%.", error: "Không nêu tên viện, không có đường dẫn, và chữ 'luôn' cho thấy khẳng định tuyệt đối. Đây là chi tiết dễ bịa, phải mở được nguồn mới dùng." },
          { text: "Hai đơn vị thuê ngoài đã báo giá; báo giá nằm trong phụ lục, chi phí tuỳ khối lượng hàng mỗi tháng." },
          { text: "Hai nguồn về thời gian giao hàng lệch nhau: một nguồn tính ngày làm việc, nguồn kia tính ngày lịch. Chưa rõ bảng nào áp dụng cho công ty." },
          { text: "Kết luận chắc chắn: thuê ngoài là lựa chọn đúng và công ty nên ký hợp đồng ngay trong tháng này.", error: "Kết luận chắc hơn bằng chứng. Nguồn chi phí chưa kiểm, chỗ lệch chưa giải thích được, và quyết định ký hợp đồng cần bộ phận pháp chế, kế toán trưởng xem." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Báo cáo có mức chắc chắn",
          text: "Mỗi kết luận có nguồn đã mở. Chỗ chưa rõ được ghi. Sếp biết phần nào quyết ngay được, phần nào cần hỏi thêm. Sai một chỗ không kéo đổ cả báo cáo.",
        },
        right: {
          label: "Báo cáo trôi chảy nhưng chắc mọi chỗ",
          text: "Đọc dễ, nghe thuyết phục, nhưng không cho biết điều nào đã kiểm. Khi một con số bị chỉ ra là sai, cả báo cáo mất niềm tin.",
        },
      },
      {
        type: "callout",
        label: "Báo cáo này không thay cho người có chuyên môn",
        text: "Báo cáo nghiên cứu ngắn giúp sếp quyết định sáng suốt hơn, không thay cho ý kiến pháp chế, kế toán trưởng hay chuyên gia khi liên quan hợp đồng, thuế hoặc rủi ro pháp lý. Ghi rõ người bạn định hỏi ở mục điều còn chưa rõ.",
      },
      {
        type: "scenario",
        title: "Hạn nộp lúc 5 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa hoàn thành bản nháp báo cáo hai trang. Còn một tiếng trước hạn. Một số nguồn bạn chưa mở lại.",
            choices: [
              { label: "Gửi luôn vì bản nháp đọc rất trôi chảy và đầy đủ", next: "bad_send" },
              { label: "Mở lại các nguồn chính và đánh dấu nguồn nào đã kiểm, nguồn nào chưa", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp chuyển báo cáo cho giám đốc. Một con số trong đó không có trong nguồn bạn dẫn. Cả nhóm phải giải thích trong cuộc họp sáng hôm sau.",
            ending: "bad",
          },
          s2: {
            text: "Bạn kiểm được 5 trên 7 nguồn và thấy hai nguồn lệch nhau ở thời gian giao hàng. Còn 30 phút.",
            choices: [
              { label: "Ghi 5 nguồn đã kiểm, để 2 nguồn chưa kiểm và chỗ lệch ở mục điều còn chưa rõ, rồi nhờ một đồng nghiệp đọc nhanh", next: "good" },
              { label: "Chọn số dễ bào chữa hơn và bỏ chỗ lệch cho báo cáo đẹp", next: "bad_hide" },
            ],
          },
          bad_hide: {
            text: "Bộ phận vận hành dùng đúng con số bạn đã bỏ và phát hiện ra chênh lệch. Báo cáo bị coi là chọn số theo ý muốn.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp hỏi lại một chỗ ghi sai năm. Bạn sửa và gửi đúng hạn. Sếp đọc được phần chắc, phần chưa chắc, và quyết định hỏi thêm kế toán trưởng trước khi ký.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Báo cáo hai trang: câu hỏi, nguồn đã mở, chỗ lệch, mức chắc chắn.",
          "Nguồn chưa kiểm không làm nền cho kết luận.",
          "Nhờ người chưa tham gia đọc trước khi gửi.",
          "Liên quan hợp đồng, thuế, pháp lý: hỏi người có chuyên môn.",
        ],
      },
    ],
  },
];
