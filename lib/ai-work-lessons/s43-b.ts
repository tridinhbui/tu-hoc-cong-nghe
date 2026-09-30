import type { Lesson } from "../lesson-types";

// Chặng 43, bài 6-10. Giáo trình: scripts/curriculum/stage-43.json.
// Cố ý không ghi đường dẫn nút bấm, tên menu hay giá của trợ lý trong Excel / Sheets:
// chúng đổi theo phiên bản, còn cách giao việc và cách kiểm kết quả thì không.

type Q = { question: string; options: string[]; correct: number; explanation: string };
const q = (question: string, options: string[], explanation: string): Q => ({ question, options, correct: 0, explanation });

export const S43_B_LESSONS: Lesson[] = [
  {
    id: 2265,
    slug: "hoi-bang-tinh-bang-tieng-viet-thuong",
    title: "Chặng 43, Bài 6: Hỏi bảng tính bằng tiếng Việt thường ngày",
    subtitle: "Bạn hỏi bằng lời, trợ lý gõ công thức - và bạn học cách đọc lại điều nó gõ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có bảng doanh thu 12 tháng và sếp hỏi tháng nào thấp nhất, nhưng bạn chưa rành công thức. Hỏi bằng lời rất tiện, song nếu nhận kết quả mà không biết nó tính từ ô nào thì bạn không kiểm được, và một con số sai sẽ đi thẳng vào báo cáo. Bài này dạy cách hỏi cho rõ và cách đọc lại công thức để tự kiểm.",
    openingQuestion:
      "Bạn gõ vào trợ lý của bảng tính: 'Tháng nào doanh thu thấp nhất?' và nhận câu trả lời 'Tháng 7'. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Xem công thức nó dùng và tự nhìn cột doanh thu để so lại",
      "Chép 'tháng 7' vào báo cáo vì trợ lý đọc bảng nhanh hơn mắt",
      "Hỏi lại đúng câu đó đến khi hai lần liền ra cùng một tháng",
      "Đổi cách hỏi sang tiếng Anh vì trợ lý hiểu tiếng Anh chính xác hơn",
    ],
    correctOption: 0,
    explanation:
      "Câu trả lời 'Tháng 7' chỉ đáng tin khi bạn biết nó lấy từ cột nào và tìm giá trị nhỏ nhất theo cách nào. Xem công thức và nhìn lại cột số mất chừng một phút. Chép luôn thì bạn đặt cược vào việc trợ lý hiểu đúng cột. Hỏi lại nhiều lần chỉ cho thấy nó nhất quán, chưa chắc nó đúng: cùng một hiểu lầm có thể lặp lại. Đổi sang tiếng Anh không làm cột nào rõ hơn.",
    diagram: [
      { label: "Bạn hỏi bằng lời, nêu rõ tên cột", arrow: true },
      { label: "Trợ lý viết công thức và cho ra kết quả", arrow: true },
      { label: "Bạn đọc lại công thức, đối chiếu với cột số", arrow: true },
      { label: "Kết quả khớp thì mới dùng trong báo cáo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Hạnh làm kế toán bán hàng, giữ bảng doanh thu 12 tháng. Chị hỏi trợ lý 'tháng nào thấp nhất' và nhận về tháng 2. Chị mở công thức, thấy nó chỉ xét 11 dòng vì bỏ sót dòng cuối, nên sửa vùng chọn rồi mới đọc lại kết quả. Nhờ đó chị biết mình cần mở công thức ra xem, không chỉ đọc con số.",
    },
    quiz: [
      q(
        "Bạn hỏi 'tháng nào thấp nhất?' và trợ lý đáp 'Tháng 7'. Cách kiểm nhanh và đủ chắc là gì?",
        [
          "Nhìn cột doanh thu, tự tìm số nhỏ nhất và so với tháng nó đưa ra",
          "Tin luôn vì trợ lý đọc cả bảng nhanh hơn mắt người rất nhiều",
          "Hỏi lại cùng câu đó xem hai lần có ra cùng một tháng hay không",
          "Kiểm xem tên tháng nó viết ra có đúng chính tả tiếng Việt không, vì sai chữ là sai số",
        ],
        "Đối chiếu với chính cột số là cách kiểm duy nhất chạm tới nguồn. Đọc nhanh không đồng nghĩa đọc đúng cột. Hỏi lại chỉ đo độ nhất quán: một hiểu lầm vẫn có thể lặp lại y hệt. Chính tả tên tháng không nói gì về việc con số có đúng hay không.",
      ),
      q(
        "Vì sao nên nêu tên cột khi hỏi, ví dụ 'cột Doanh thu'?",
        [
          "Để trợ lý biết đúng cột cần đọc",
          "Để trợ lý tự đổi tên các cột còn lại trong bảng cho đồng nhất",
          "Vì trợ lý chỉ đọc được duy nhất cột đầu tiên của mọi bảng tính",
          "Vì tên cột dài thì công thức được tính nhanh hơn nhiều lần",
        ],
        "Bảng thường có nhiều cột số như doanh thu, chi phí, số lượng; nếu không nói rõ, trợ lý phải đoán. Nó không tự đổi tên cột chỉ vì bạn nhắc tên, và không bị giới hạn ở cột đầu. Độ dài tên cột không ảnh hưởng tốc độ tính.",
      ),
      q(
        "Trợ lý viết một công thức bạn chưa hiểu. Việc hợp lý nhất trước khi dùng cho cả cột là gì?",
        [
          "Nhờ nó giải thích từng phần bằng lời rồi thử trên vài dòng",
          "Dán thẳng cho cả cột, chạy ra số là coi như công thức đúng rồi",
          "Xoá công thức và nhờ nó điền sẵn kết quả chữ vào các ô",
          "Bỏ qua, vì công thức là chuyện của người chuyên về công nghệ thông tin",
        ],
        "Giải thích từng phần cho bạn biết công thức làm gì, và thử vài dòng cho bạn thấy nó chạy đúng ý không. Chạy ra số chưa chứng minh đúng. Kết quả dạng chữ thì không còn công thức để kiểm lại. Bỏ qua là mất đúng thứ giúp bạn học.",
      ),
      q(
        "Câu hỏi nào cho kết quả dễ kiểm hơn?",
        [
          "Tổng cột Doanh thu từ dòng 2 đến dòng 13 là bao nhiêu?",
          "Doanh thu năm nay trông thế nào?",
          "Cho tôi biết tình hình kinh doanh cả năm một cách tổng quát",
          "Có gì bất thường ở đâu đó trong bảng này không?",
        ],
        "Câu hỏi nêu cột, vùng dòng và phép tính thì bạn tự cộng lại được để so. Ba câu còn lại mơ hồ nên trợ lý phải chọn cách hiểu, và bạn không có gì cụ thể để đối chiếu.",
      ),
      q(
        "Bảng của bạn có lương nhân viên và số điện thoại khách. Trước khi hỏi trợ lý nên làm gì?",
        [
          "Xem công ty có cho dùng trợ lý với loại dữ liệu này không",
          "Cứ hỏi vì dữ liệu nằm sẵn trong bảng tính chứ không đi đâu cả",
          "Đổi tên tệp cho khỏi lộ tên công ty rồi hỏi bình thường",
          "Chỉ xoá cột họ tên, còn lại là số nên không còn gì nhạy cảm",
        ],
        "Trợ lý xử lý dữ liệu theo chính sách của công ty và nhà cung cấp, nên quyền dùng là câu hỏi cần hỏi trước, bộ phận công nghệ hoặc quản lý sẽ trả lời. Không phải dữ liệu nào nằm trong bảng cũng được gửi đi tùy ý. Đổi tên tệp hoặc xoá cột tên chưa làm số điện thoại và mức lương hết là thông tin cá nhân.",
      ),
    ],
    keyTakeaways: [
      "Hỏi bằng lời rất tiện, nhưng công thức nó viết mới là thứ để kiểm.",
      "Nêu tên cột, vùng dòng và phép tính để câu hỏi không bị đoán.",
      "Nhờ trợ lý giải thích công thức bằng lời để bạn học và kiểm.",
      "Thử trên vài dòng và so với cột số trước khi dùng cho cả bảng.",
      "Dữ liệu cá nhân trong bảng: hỏi công ty trước khi đưa vào trợ lý.",
    ],
    practicePrompt: {
      question:
        "Chị Hạnh hỏi 'tổng doanh thu quý 1' và nhận 315 triệu. Bảng có tháng 1 = 100, tháng 2 = 95, tháng 3 = 110 (triệu đồng). Chị nên làm gì?",
      options: [
        "Tự cộng 100 + 95 + 110 = 305, thấy lệch 10 và mở công thức tìm ô thừa",
        "Dùng 315 vì nó là con số của trợ lý, chắc đã tính đủ mọi dòng, khỏi dò lại",
        "Lấy trung bình 315 và 305 là 310 cho công bằng",
        "Hỏi lại trợ lý 'chắc chưa?' rồi tin câu trả lời kế tiếp",
      ],
      correct: 0,
      explanation:
        "Ba số cộng lại là 305, không phải 315, nên có gì đó sai trong vùng chọn hoặc công thức. Tìm ra ô thừa mới sửa được tận gốc. Lấy trung bình hai số cũng không phải số đúng. Hỏi 'chắc chưa?' chỉ nhận thêm một câu tự tin, không thêm bằng chứng.",
    },
    summary: {
      keyIdea: "Hỏi bảng tính bằng lời là cách nhờ, còn công thức là bằng chứng: đọc nó trước khi tin kết quả.",
      formula: "Nêu tên cột và vùng dòng → đọc công thức nó viết → so với số tự cộng vài dòng.",
      commonMistake: "Chép thẳng kết quả vào báo cáo vì nó ra nhanh và nghe chắc chắn.",
      action: "Chọn một bảng của bạn và hỏi một câu có tên cột, rồi mở công thức xem nó tính từ đâu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một bảng số thật của bạn (doanh thu, chi tiêu hoặc chấm công) có ít nhất 10 dòng. Hỏi trợ lý một câu có tên cột, ví dụ 'tháng nào cột Doanh thu thấp nhất'. Ghi lại công thức nó viết, nhờ nó giải thích từng phần, rồi tự dò cột số để xác nhận tháng đó.",
      secondary: "Viết ra một dòng: công thức đó lấy dữ liệu từ ô nào đến ô nào - ngày mai bạn sẽ dùng dòng này để kiểm lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhìn bảng 12 tháng và chỉ muốn biết tháng nào doanh thu thấp nhất, nhưng công thức thì chưa nhớ. Bài này dạy cách hỏi bằng lời để có câu trả lời nhanh, và cách đọc lại công thức để chắc câu trả lời đó đúng.",
      },
      {
        type: "feynman",
        title: "Hỏi bảng tính bằng lời đơn giản hơn bạn nghĩ",
        intro:
          "Hãy hình dung một đồng nghiệp giỏi bảng tính ngồi cạnh bạn. Bạn nói 'anh ơi, tháng nào thấp nhất', anh ấy gõ một dòng rồi đọc kết quả. Bạn hỏi 'anh vừa gõ gì thế?' thì học được thêm. Trợ lý trong bảng tính làm vai anh đồng nghiệp đó, nhưng đôi khi hiểu nhầm và không tự nhận ra.",
        columns: ["Thành phần", "Đồng nghiệp ngồi cạnh", "Trợ lý trong bảng tính"],
        rows: [
          ["Bạn nói gì", "Câu hỏi bằng lời", "Câu hỏi bằng lời, nêu tên cột"],
          ["Người kia làm gì", "Gõ công thức", "Viết công thức và điền kết quả"],
          ["Học được gì", "Hỏi 'anh gõ gì thế'", "Đọc công thức, nhờ giải thích"],
          ["Kiểm lại", "Nhìn cột số cùng nhau", "Tự dò vài dòng bằng tay"],
        ],
        oneLiner: "Bạn nói bằng lời, trợ lý gõ công thức, còn bạn là người kiểm xem nó có hiểu đúng ý không.",
      },
      { type: "heading", text: "Vấn đề: câu trả lời đến nhanh, nhưng không ai cho bạn thấy nó tính từ đâu" },
      {
        type: "paragraph",
        text: "Khi hỏi bằng lời, bạn không nhìn thấy trợ lý chọn cột nào, vùng dòng nào. Nếu bảng có cột 'Doanh thu' và cột 'Doanh thu dự kiến', nó có thể lấy nhầm cột. Nếu dòng cuối bị trống hoặc là chữ, nó có thể bỏ sót. Vì vậy có hai thói quen cần tập: nêu rõ cột khi hỏi, và mở công thức ra đọc khi nhận kết quả.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi bằng lời tới con số bạn dám dùng",
        steps: [
          { label: "Nêu rõ cột và vùng dòng", detail: "Nói 'cột Doanh thu, từ dòng 2 đến dòng 13' thay vì 'doanh thu'. Càng cụ thể, trợ lý càng ít phải đoán." },
          { label: "Xin công thức, không chỉ kết quả", detail: "Yêu cầu trợ lý đặt kết quả vào một ô có công thức để bạn còn nhìn thấy nó tính từ đâu." },
          { label: "Đọc công thức bằng lời", detail: "Nhờ giải thích từng phần: hàm nào, vùng nào, điều kiện nào. Nếu có chỗ bạn không hiểu, hỏi tiếp cho tới khi hiểu." },
          { label: "Dò vài dòng bằng tay", detail: "Tự cộng hoặc tự tìm số nhỏ nhất trên cột số rồi so. Khớp thì mới đi tiếp, lệch thì tìm ô gây lệch." },
          { label: "Ghi lại cách hỏi hiệu quả", detail: "Lưu câu hỏi đã cho kết quả đúng để lần sau dùng lại với bảng mới." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp câu hỏi cho bảng doanh thu",
        task: "Bạn có bảng 12 tháng: cột A là Tháng, cột B là Doanh thu, cột C là Doanh thu dự kiến. Lắp câu hỏi để trợ lý tìm tháng thấp nhất mà không nhầm cột.",
        parts: [
          {
            id: "column",
            label: "Chỉ rõ cột",
            options: [
              { text: "Tìm tháng thấp nhất trong bảng doanh thu.", feedback: "Bảng có hai cột doanh thu; trợ lý có thể lấy nhầm cột dự kiến và bạn không hay biết." },
              { text: "Trong cột B (Doanh thu), dòng 2 đến 13, tìm số nhỏ nhất và cho biết tháng ở cột A.", good: true, feedback: "Cột và vùng dòng rõ ràng, trợ lý không phải đoán và bạn có sẵn vùng để tự dò lại." },
            ],
          },
          {
            id: "output",
            label: "Cách trả kết quả",
            options: [
              { text: "Chỉ cần nói tháng nào là đủ.", feedback: "Không có công thức thì bạn không kiểm được nó tìm từ đâu, và không dùng lại được cho bảng khác." },
              { text: "Đặt kết quả vào một ô trống có công thức và cho tôi biết ô nào.", good: true, feedback: "Công thức nằm ngay trong bảng nên bạn đọc, sửa và dùng lại được." },
            ],
          },
          {
            id: "explain",
            label: "Yêu cầu giải thích",
            options: [
              { text: "Không cần giải thích, tôi tin là được.", feedback: "Bạn mất cơ hội hiểu công thức và không phát hiện được chỗ nó xử lý sai." },
              { text: "Giải thích từng phần công thức bằng lời thường và cho biết nếu ô nào trống thì nó xử lý sao.", good: true, feedback: "Bạn hiểu công thức và biết trước điểm dễ sai như ô trống hoặc ô chứa chữ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["column", "output", "explain"],
            text: "Tôi đã đặt công thức =INDEX(A2:A13; MATCH(MIN(B2:B13); B2:B13; 0)) vào ô E2. Kết quả là 'Tháng 2'.\n\nGiải thích: MIN(B2:B13) tìm số nhỏ nhất trong cột Doanh thu; MATCH cho biết số đó ở vị trí thứ mấy; INDEX lấy tên tháng cùng vị trí ở cột A. Ô trống bị MIN bỏ qua, còn ô chứa chữ cũng bị bỏ qua nên hãy kiểm không có số nào bị nhập dạng chữ.",
          },
          {
            requires: ["column"],
            text: "Tháng thấp nhất là Tháng 2 với doanh thu 95 triệu.\n\n(Đúng cột, nhưng không có công thức để bạn kiểm và không biết nó xử lý ô trống ra sao.)",
          },
          {
            text: "Tháng thấp nhất là Tháng 7 với doanh thu 88 triệu.\n\n(Không nêu cột nên trợ lý có thể lấy cột dự kiến; con số 88 triệu không đến từ cột nào bạn chỉ định. Hãy so lại với cột số thật.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi rõ cột rồi đọc công thức",
          text: "Trợ lý ít phải đoán. Công thức nằm trong bảng nên bạn kiểm và dùng lại được. Bạn học được cách bảng tính hoạt động. Sai thì bạn thấy ngay chỗ sai.",
        },
        right: {
          label: "Hỏi chung chung rồi chép kết quả",
          text: "Trợ lý chọn cột theo cách nó hiểu. Kết quả nằm trong khung chat, không dấu vết để kiểm. Bạn không học được gì. Sai thì đến khi sếp dò lại mới biết.",
        },
      },
      {
        type: "callout",
        label: "Dữ liệu trong bảng cũng là dữ liệu của công ty",
        text: "Bảng có lương, số điện thoại khách hay giá vốn thì hỏi công ty trước khi đưa cho bất kỳ trợ lý nào. Nếu chưa rõ, thử với một bảng đã bỏ thông tin cá nhân hoặc số liệu giả có cùng cấu trúc.",
      },
      {
        type: "scenario",
        title: "Sếp hỏi tháng nào doanh thu thấp nhất",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: 'Cho anh biết tháng nào doanh thu thấp nhất trước 3 giờ.' Bạn hỏi trợ lý trong bảng tính và nhận 'Tháng 7'.",
            choices: [
              { label: "Nhắn sếp 'Tháng 7' ngay vì trợ lý trả lời nhanh và tự tin", next: "bad_fast" },
              { label: "Mở công thức xem nó lấy vùng nào rồi nhìn lại cột số", next: "s2" },
            ],
          },
          bad_fast: {
            text: "Trợ lý đã lấy cột Doanh thu dự kiến. Tháng thấp nhất thật ra là tháng 2. Sếp dùng thông tin sai để họp và phải đính chính với cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Công thức xét cột C (dự kiến) chứ không phải cột B (thực tế). Bạn còn 40 phút.",
            choices: [
              { label: "Sửa hỏi lại với 'cột B' rồi tự dò 12 số bằng mắt", next: "good" },
              { label: "Giữ kết quả cũ và ghi chú 'theo dự kiến' để khỏi phải làm lại", next: "bad_note" },
            ],
          },
          bad_note: {
            text: "Sếp hỏi số thực tế chứ không phải dự kiến. Câu trả lời của bạn không dùng được và bạn mất thêm thời gian giải thích.",
            ending: "bad",
          },
          good: {
            text: "Kết quả mới là tháng 2, khớp với số bạn tự dò. Bạn nhắn sếp lúc 2 giờ 30 kèm con số và cột đã dùng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nêu tên cột và vùng dòng trong câu hỏi.",
          "Bước 2 - Xin kết quả nằm trong ô có công thức.",
          "Bước 3 - Nhờ trợ lý giải thích công thức bằng lời thường.",
          "Bước 4 - Tự dò vài dòng, chỉ dùng khi khớp.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Trợ lý gõ công thức, bạn đọc công thức, và cột số là người phân xử.",
          "Bài sau: công thức do trợ lý viết, kiểm bằng ba dòng mẫu.",
        ],
      },
    ],
  },
  {
    id: 2266,
    slug: "cong-thuc-do-tro-ly-viet-kiem-bang-ba-dong-mau",
    title: "Chặng 43, Bài 7: Công thức do trợ lý viết: kiểm bằng ba dòng mẫu",
    subtitle: "Công thức chạy ra số chưa có nghĩa là đúng - ba dòng tính tay cho bạn biết ngay.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧮",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công thức trợ lý viết luôn chạy ra một con số, và con số đó nhìn rất đáng tin. Nhưng công thức có thể lấy nhầm cột, bỏ sót dòng hoặc cộng cả tiêu đề. Bạn không cần giỏi công thức để kiểm: chọn ba dòng, tự tính bằng tay và so với ô kết quả. Mất năm phút, tránh được một con số sai trong báo cáo.",
    openingQuestion:
      "Trợ lý viết công thức tính thành tiền cho 200 dòng đơn hàng và mọi ô đều ra số. Cách kiểm nào đáng làm nhất trước khi gửi bảng?",
    openingOptions: [
      "Chọn vài dòng khác nhau, tự tính tay rồi so với ô công thức",
      "Kéo xuống cuối bảng xem có ô nào báo lỗi đỏ hay không",
      "Nhờ trợ lý xác nhận lại công thức của chính nó là đúng",
      "Kiểm xem tổng cột có nhìn 'hợp lý' so với năm trước hoặc quý trước không",
    ],
    correctOption: 0,
    explanation:
      "Tự tính tay vài dòng cho bạn một phép so độc lập với công thức: nếu khớp, công thức làm đúng ý ở những dòng đó; nếu lệch, bạn thấy chỗ sai ngay. Không có ô báo lỗi chỉ nói công thức chạy được, chưa nói nó đúng. Nhờ trợ lý xác nhận thì nó dựa trên cùng cách hiểu đã sinh ra công thức. Tổng nhìn hợp lý vẫn có thể lệch vài chục triệu mà mắt không thấy.",
    diagram: [
      { label: "Trợ lý viết công thức cho cả cột", arrow: true },
      { label: "Bạn chọn ba dòng: bình thường, biên, bất thường", arrow: true },
      { label: "Tự tính tay ba dòng và so với ô công thức", arrow: true },
      { label: "Khớp cả ba thì mới kéo công thức xuống toàn cột" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Tuấn nhờ trợ lý tính thành tiền có giảm giá cho 200 dòng đơn hàng. Anh tự tính ba dòng: một dòng thường, một dòng số lượng bằng 0 và một dòng có giảm giá cao nhất. Dòng số lượng bằng 0 ra kết quả lỗi, lộ ra công thức chưa xử lý trường hợp đó. Anh sửa trước khi gửi, thay vì để bộ phận kế toán phát hiện sau.",
    },
    quiz: [
      q(
        "Vì sao chọn ba dòng để tự tính tay thường đủ để phát hiện công thức sai cách?",
        [
          "Nếu công thức hiểu sai ý thì lỗi thường lộ ra ở một trong các dòng khác loại",
          "Vì ba dòng luôn đại diện chính xác cho toàn bộ hai trăm dòng",
          "Vì ba là số dòng tối thiểu mà bảng tính cho phép bạn so sánh",
          "Vì tính tay ba dòng bằng với việc tính lại toàn bộ bảng bằng máy",
        ],
        "Ba dòng khác loại (bình thường, biên, bất thường) đại diện cho các kiểu dữ liệu, nên lỗi hiểu sai ý dễ lộ ra. Nhưng ba dòng không đại diện tuyệt đối cho cả bảng và không phải mức tối thiểu của bảng tính; nó chỉ là mức kiểm rẻ mà hiệu quả. Nó cũng không thay việc tính lại đầy đủ.",
      ),
      q(
        "Ba dòng nào nên chọn để kiểm?",
        [
          "Một dòng bình thường, một dòng số nhỏ nhất, một dòng bất thường",
          "Ba dòng đầu tiên vì chúng nằm ngay trên màn hình",
          "Ba dòng ngẫu nhiên giống hệt nhau về loại dữ liệu để dễ so sánh và đối chiếu",
          "Ba dòng cuối cùng vì chỗ đó hay có lỗi nhất trong mọi bảng",
        ],
        "Mục tiêu là làm lộ các trường hợp công thức có thể xử lý khác nhau: dòng thường, dòng biên như số 0 hoặc lớn nhất, dòng bất thường như ô trống. Ba dòng đầu hoặc ba dòng giống nhau chỉ thử một kiểu dữ liệu. Ba dòng cuối không có lý do đặc biệt hay lỗi hơn.",
      ),
      q(
        "Bạn tự tính dòng 3 ra 300.000 nhưng ô công thức ghi 350.000. Bước tiếp theo?",
        [
          "Mở công thức, tìm vì sao dòng đó lệch rồi sửa trước khi dùng",
          "Tin ô công thức vì máy tính không bao giờ sai như người",
          "Sửa tay ô đó thành 300.000 và giữ nguyên công thức cho các dòng còn lại",
          "Cho rằng bạn tính nhầm và bỏ qua vì chỉ lệch có 50.000",
        ],
        "Một dòng lệch nghĩa là công thức có vấn đề ở đâu đó, có thể lặp lại ở nhiều dòng khác. Máy chỉ tính đúng theo công thức bạn có, và công thức có thể sai ý. Sửa tay một ô che lỗi mà không sửa gốc. Bỏ qua vì 'chỉ lệch ít' sẽ cộng dồn khi nhân với nhiều dòng.",
      ),
      q(
        "Công thức nào thể hiện đúng: thành tiền = đơn giá × số lượng, rồi tổng cả cột?",
        [
          "Thành tiền ở D2 là B2*C2; tổng là SUM của D2 đến hết cột",
          "Thành tiền là B2+C2 vì cộng hai ô cho ra kết quả nhanh hơn",
          "Tổng là SUM của cả cột B và C rồi nhân với nhau",
          "Thành tiền là B2*C2 và tổng là B2*C2 lặp lại cho từng dòng",
        ],
        "Đơn giá nhân số lượng ra thành tiền của từng dòng, rồi cộng các thành tiền. Cộng đơn giá với số lượng là phép sai nghĩa. Cộng cột đơn giá rồi nhân cột số lượng không cho kết quả đúng. Lặp lại B2*C2 mà không cộng không phải là tổng.",
      ),
      q(
        "Trợ lý nói 'công thức này đúng vì tôi đã kiểm tra'. Nên hiểu câu đó thế nào?",
        [
          "Là lời khẳng định chưa kèm bằng chứng, bạn vẫn cần tự tính vài dòng",
          "Là bằng chứng đủ mạnh vì nó có thể tính nhanh hơn con người",
          "Là bảo đảm công thức đúng cho mọi dòng kể cả dòng bất thường",
          "Là dấu hiệu cho thấy nên bỏ bước tự tính vì đã có người kiểm giúp bạn rồi",
        ],
        "Câu 'tôi đã kiểm tra' được sinh ra như mọi câu khác, không nhất thiết là một phép kiểm thật. Bằng chứng chỉ có khi bạn tự tính và ra cùng con số. Tốc độ tính không phải bảo đảm đúng ý, và không ai kiểm giúp thay bạn ở đây.",
      ),
    ],
    keyTakeaways: [
      "Công thức ra số chưa có nghĩa là đúng ý bạn.",
      "Chọn ba dòng khác loại: bình thường, biên, bất thường.",
      "Tự tính tay rồi so với ô công thức, đừng nhờ trợ lý tự xác nhận.",
      "Lệch một dòng là dấu hiệu công thức có vấn đề ở đâu đó.",
      "Sửa gốc công thức, không sửa tay từng ô.",
    ],
    practicePrompt: {
      question:
        "Bạn tự tính: 50.000 x 4 = 200.000; 50.000 x 6 = 300.000; 50.000 x 10 = 500.000. Ô công thức ra 200.000, 300.000 và 5.000.000. Điều gì hợp lý nhất?",
      options: [
        "Công thức sai ở dòng thứ ba; kiểm ô đó có bị nhập thừa số 0 không",
        "Công thức đúng vì hai trong ba dòng đã khớp",
        "Bạn tính nhầm vì 10 lần 50.000 phải ra số triệu",
        "Không sao, vì chỉ lệch một dòng và sẽ tự cân khi cộng tổng của bảng tính",
      ],
      correct: 0,
      explanation:
        "10 nhân 50.000 là 500.000, còn ô ra 5.000.000 gấp mười lần nên nhiều khả năng dữ liệu bị nhập thừa số 0 hoặc công thức lấy nhầm. Hai dòng khớp không chứng minh dòng còn lại đúng. 10 lần 50.000 không ra triệu. Lệch một dòng sẽ kéo tổng lệch chứ không tự cân.",
    },
    summary: {
      keyIdea: "Công thức chạy ra số chỉ cho biết nó chạy được; ba dòng tính tay mới cho biết nó đúng ý bạn.",
      formula: "Chọn ba dòng khác loại → tự tính tay → so với ô công thức → khớp mới kéo xuống toàn cột.",
      commonMistake: "Tin công thức vì nó ra số ở mọi ô và không báo lỗi.",
      action: "Lần tới trợ lý viết công thức cho bạn, dành năm phút tự tính ba dòng trước khi dùng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một cột công thức trong bảng của bạn (thành tiền, tổng, phần trăm) mà trợ lý hoặc đồng nghiệp đã viết. Chọn ba dòng: một dòng thường, một dòng số nhỏ nhất hoặc bằng 0, một dòng bất thường. Tự tính tay bằng máy tính điện thoại và ghi vào giấy ba cặp số 'tay - công thức'.",
      secondary: "Nếu cả ba khớp, ghi 'đã kiểm ba dòng' và ngày vào ô chú thích. Nếu lệch, ghi lại vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhận một cột công thức mà mọi ô đều ra số, nhìn rất ổn. Bài này dạy cách xác nhận nó thực sự đúng ý bạn bằng ba dòng tự tính, không cần giỏi công thức.",
      },
      {
        type: "feynman",
        title: "Kiểm công thức đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người bán hàng đưa hoá đơn và bạn lấy máy tính bấm lại vài món xem có khớp không. Bạn không cần bấm cả trăm món; vài món khác loại đã đủ biết máy tính tiền có nhập sai giá. Ba dòng mẫu là cách kiểm đó cho bảng tính.",
        columns: ["Thành phần", "Kiểm hoá đơn", "Kiểm công thức"],
        rows: [
          ["Chọn gì để bấm lại", "Vài món khác giá", "Ba dòng khác loại"],
          ["Ai tính lại", "Bạn với máy tính", "Bạn bằng tay, không qua trợ lý"],
          ["Khớp thì sao", "Yên tâm hoá đơn", "Kéo công thức xuống cả cột"],
          ["Lệch thì sao", "Hỏi lại cửa hàng", "Tìm gốc công thức và sửa"],
        ],
        oneLiner: "Vài dòng tính tay và khác loại nhau cho bạn nhiều bằng chứng hơn cả trăm ô nhìn có vẻ ổn.",
      },
      { type: "heading", text: "Vấn đề: số ra đầy đủ nên mắt không thấy chỗ sai" },
      {
        type: "paragraph",
        text: "Một công thức sai hiếm khi báo lỗi. Nó cho ra con số cùng cỡ với con số đúng, nên mắt không bắt được. Ba kiểu sai hay gặp: lấy nhầm cột, cộng cả dòng tiêu đề hoặc dòng tổng, và không xử lý ô trống hay số 0. Cách rẻ nhất để bắt cả ba là tự tính một dòng bình thường, một dòng biên và một dòng bất thường.",
      },
      {
        type: "flow",
        title: "Từ công thức mới viết tới cột bạn dám gửi",
        steps: [
          { label: "Chọn ba dòng khác loại", detail: "Một dòng bình thường, một dòng có số nhỏ nhất hoặc bằng 0, một dòng có ô trống hoặc giá trị lớn nhất." },
          { label: "Tự tính tay từng dòng", detail: "Dùng máy tính điện thoại hoặc giấy, tính từ số gốc chứ không nhìn kết quả trước để khỏi bị dẫn dắt." },
          { label: "So với ô công thức", detail: "Ghi ba cặp số cạnh nhau. Khớp là dấu hiệu tốt; lệch dù một dòng cũng cần tìm hiểu." },
          { label: "Mở công thức tìm gốc lệch", detail: "Xem nó lấy đúng cột chưa, vùng có dính tiêu đề không, ô trống được xử lý ra sao." },
          { label: "Kiểm lại và kéo xuống", detail: "Sau khi sửa, tính lại ba dòng. Chỉ khi cả ba khớp mới kéo công thức xuống toàn cột." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát báo cáo kiểm công thức của trợ lý",
        task: "Bảng có đơn giá 50.000 và số lượng 4, 6, 10 ở ba dòng. Trợ lý báo đã kiểm công thức thành tiền. Đánh dấu những câu không đúng hoặc không có căn cứ.",
        segments: [
          { text: "Công thức thành tiền ở cột D là đơn giá nhân số lượng." },
          { text: "Dòng 2: 50.000 x 4 = 200.000, khớp với ô công thức." },
          { text: "Dòng 3: 50.000 x 6 = 350.000, khớp với ô công thức.", error: "50.000 x 6 = 300.000, không phải 350.000. Trợ lý viết ra một phép tính sai nhưng nghe khớp." },
          { text: "Dòng 4: 50.000 x 10 = 500.000, khớp với ô công thức." },
          { text: "Tổng cột D là 1.050.000, nên công thức tổng đúng.", error: "200.000 + 300.000 + 500.000 = 1.000.000. Tổng 1.050.000 chỉ ra khi dùng số sai ở dòng 3." },
          { text: "Vì ba dòng khớp nên công thức chắc chắn đúng với mọi dòng.", error: "Ba dòng chưa chứng minh mọi dòng: một dòng có ô trống hoặc số bằng 0 vẫn có thể lỗi mà ba dòng này không chạm tới." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm bằng ba dòng tính tay",
          text: "Phép so độc lập với công thức. Mất chừng năm phút. Bắt được lấy nhầm cột, cộng thừa tiêu đề, dòng biên. Bạn hiểu công thức hơn sau khi kiểm.",
        },
        right: {
          label: "Hỏi trợ lý 'công thức đúng chưa'",
          text: "Câu trả lời sinh từ cùng cách hiểu đã tạo ra công thức. Nhanh nhưng không có phép so nào độc lập. Bắt lỗi kém, đặc biệt khi lỗi nằm ở cách hiểu. Bạn không học được gì thêm.",
        },
      },
      {
        type: "callout",
        label: "Ba dòng là mức tối thiểu, không phải giới hạn",
        text: "Với bảng phục vụ quyết định lớn như lương, thuế hay hợp đồng, kiểm nhiều dòng hơn và nhờ đồng nghiệp hoặc kế toán trưởng soát. Ba dòng phù hợp với bảng theo dõi hằng ngày.",
      },
      {
        type: "scenario",
        title: "Bảng thành tiền 200 dòng gửi phòng kế toán",
        start: "s1",
        nodes: {
          s1: {
            text: "Trợ lý vừa viết công thức thành tiền có giảm giá cho 200 dòng. Mọi ô ra số. Bạn còn 20 phút trước khi gửi.",
            choices: [
              { label: "Gửi luôn vì không có ô nào báo lỗi", next: "bad_send" },
              { label: "Tự tính tay một dòng thường, một dòng số 0 và một dòng giảm giá cao nhất", next: "s2" },
            ],
          },
          bad_send: {
            text: "Công thức tính sai giảm giá ở các đơn từ 10 sản phẩm trở lên. Kế toán phát hiện khi đối chiếu và trả bảng về.",
            ending: "bad",
          },
          s2: {
            text: "Hai dòng khớp, còn dòng có giảm giá cao nhất lệch 120.000.",
            choices: [
              { label: "Sửa tay ô đó cho khớp rồi gửi", next: "bad_patch" },
              { label: "Mở công thức tìm vì sao phần giảm giá bị lệch", next: "good" },
            ],
          },
          bad_patch: {
            text: "Bạn sửa một ô nhưng lỗi nằm trong công thức nên các dòng khác có giảm giá cao vẫn sai. Kế toán trả bảng về sau khi soát.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy công thức trừ phần trăm giảm hai lần ở các đơn lớn. Sau khi sửa, ba dòng khớp và kế toán nhận bảng đúng ngay lần đầu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn ba dòng: thường, biên, bất thường.",
          "Bước 2 - Tự tính tay từ số gốc.",
          "Bước 3 - So với ô công thức, lệch thì mở công thức tìm gốc.",
          "Bước 4 - Chỉ kéo xuống toàn cột khi cả ba khớp.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Công thức ra số chỉ là lời khẳng định; ba dòng tính tay mới là bằng chứng.",
          "Bài sau: làm sạch một cột dữ liệu lộn xộn.",
        ],
      },
    ],
  },
  {
    id: 2267,
    slug: "lam-sach-cot-du-lieu-ten-ngay-so-dien-thoai",
    title: "Chặng 43, Bài 8: Làm sạch một cột dữ liệu lộn xộn",
    subtitle: "Cột ngày viết đủ kiểu - nhờ trợ lý chuẩn hoá, rồi đếm lại số dòng trước và sau.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧹",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cột ngày trong bảng của bạn có nơi viết 5/3, nơi viết 05-03-2025, nơi viết 'mùng 5 tháng 3'. Sắp xếp và lọc theo tháng sẽ sai mà bạn không hay biết. Trợ lý chuẩn hoá rất nhanh, nhưng nó cũng có thể đoán một ngày mơ hồ theo cách sai, nên bạn cần đếm lại số dòng trước và sau.",
    openingQuestion:
      "Bạn nhờ trợ lý chuẩn hoá cột ngày có 300 dòng viết đủ kiểu. Sau khi nó trả kết quả, điều gì cho bạn biết việc làm sạch không làm mất hay đổi dòng nào?",
    openingOptions: [
      "Đếm số dòng trước và sau, và so sánh vài dòng mơ hồ với bản gốc",
      "Thấy cột trông đồng đều một kiểu ngày là đủ để biết mọi dòng đúng",
      "Trợ lý báo đã xử lý xong 300 dòng nên số dòng chắc chắn khớp với bản gốc",
      "Sắp xếp lại cột theo ngày và thấy thứ tự tăng dần là xác nhận được",
    ],
    correctOption: 0,
    explanation:
      "Đếm số dòng trước và sau cho biết có dòng nào rơi mất, còn so vài dòng mơ hồ như 5/3 với bản gốc cho biết nó đoán ngày hay tháng trước. Cột đồng đều một kiểu chỉ cho thấy định dạng, chưa cho thấy ngày có đổi nghĩa. Lời báo 'xong 300 dòng' là câu nó tự nói. Thứ tự tăng dần vẫn có thể đúng khi ngày và tháng bị đổi chỗ đồng loạt.",
    diagram: [
      { label: "Sao chép cột gốc sang cột nháp", arrow: true },
      { label: "Trợ lý chuẩn hoá cột nháp theo quy tắc bạn nêu", arrow: true },
      { label: "Đếm số dòng, dòng lỗi, dòng mơ hồ trước và sau", arrow: true },
      { label: "Bạn xử lý dòng mơ hồ bằng tay rồi mới thay cột gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Vy ở bộ phận nhân sự có cột ngày vào làm của 120 nhân viên nhập từ nhiều người. Cô giữ nguyên cột gốc, nhờ trợ lý chuẩn hoá ở cột bên cạnh và đếm lại. Dòng '04/05/2023' có thể là 4 tháng 5 hoặc 5 tháng 4, nên cô hỏi chính nhân viên đó thay vì để trợ lý đoán.",
    },
    quiz: [
      q(
        "Cột ngày có dòng '04/05/2023'. Vì sao trợ lý dễ chuẩn hoá sai dòng này?",
        [
          "Không biết đây là ngày 4 tháng 5 hay ngày 5 tháng 4 nếu không được nói",
          "Vì trợ lý không đọc được số có dấu gạch chéo ở giữa",
          "Vì năm 2023 đã cũ nên trợ lý không còn nhận ra",
          "Vì trợ lý luôn đổi mọi ngày về ngày 1 của tháng cho đơn giản",
        ],
        "Dạng ngày-tháng và tháng-ngày đều hợp lệ nên cần bạn nói quy ước. Dấu gạch chéo không phải vấn đề; năm 2023 không có gì khó; và trợ lý không có thói quen đổi mọi ngày về mùng 1.",
      ),
      q(
        "Nên đưa quy tắc nào cho trợ lý khi chuẩn hoá cột ngày?",
        [
          "Dạng ngày/tháng/năm; dòng không chắc ghi [cần kiểm], không tự đoán",
          "Đưa về một kiểu ngày bất kỳ, miễn là cột nhìn đồng đều nhé",
          "Cứ tự đoán những ngày mơ hồ theo cách hợp lý nhất mà bạn nghĩ",
          "Xoá những dòng nào viết khác kiểu để cột còn lại sạch và đẹp hơn cho người đọc sau này",
        ],
        "Quy tắc rõ và cách xử lý dòng mơ hồ giữ quyền quyết định ở bạn. Kiểu ngày bất kỳ hoặc tự đoán làm sai âm thầm. Xoá dòng khác kiểu là làm mất dữ liệu bạn cần giữ.",
      ),
      q(
        "Trước khi làm sạch, việc nên làm với cột gốc là gì?",
        [
          "Giữ nguyên và làm việc trên bản sao ở cột bên cạnh",
          "Xoá luôn cột gốc đi để tránh bị nhầm lẫn giữa hai cột trong bảng",
          "Đổi tên cột gốc thành 'cũ' và không bao giờ nhìn lại nữa",
          "Dán đè kết quả lên cột gốc để bảng gọn, có sao lưu sau",
        ],
        "Cột gốc là bằng chứng để so sánh và quay lại nếu trợ lý làm sai. Xoá hoặc dán đè làm mất khả năng đối chiếu, và sao lưu 'sau' thường bị quên. Đổi tên rồi không nhìn lại cũng bỏ mất mục đích giữ nó.",
      ),
      q(
        "Bảng có 300 dòng. Sau khi làm sạch, cột mới có 296 dòng có ngày. Điều đó có nghĩa gì?",
        [
          "Có 4 dòng bị bỏ trống hoặc lỗi, cần tìm ra vì sao",
          "Không sao vì 296 gần bằng 300 và đủ dùng rồi",
          "Trợ lý đã tự loại bỏ 4 dòng thừa giúp bạn",
          "Bảng gốc vốn chỉ có 296 dòng và 4 dòng còn lại là dòng trống",
        ],
        "300 trừ 296 là 4, và bốn dòng đó phải có giải thích: ô trống, dòng chữ không phải ngày hoặc dòng mà trợ lý bỏ qua. 'Gần đủ' không phải đủ trong dữ liệu. Trợ lý không nên tự loại dòng, và bạn không nên giả định mà không đếm lại bảng gốc.",
      ),
      q(
        "Số điện thoại '090 123 4567', '0901234567', '+84 901 234 567' nên xử lý thế nào?",
        [
          "Chọn một dạng, để trợ lý chuẩn hoá và kiểm vài số bằng tay",
          "Xoá các số có dấu cộng vì chúng không phải số Việt Nam",
          "Để nguyên ba kiểu vì trợ lý sẽ tự hiểu chúng là cùng một số",
          "Xoá hết dấu cách và tự động thêm số 0 vào mọi số bất kỳ",
        ],
        "Đưa về một dạng giúp lọc và tìm trùng dễ; kiểm vài số để chắc không cắt nhầm chữ số. Số có +84 vẫn là số Việt Nam viết theo mã quốc gia. Để nguyên ba kiểu thì tìm trùng vẫn sai. Thêm số 0 bừa vào mọi số làm hỏng những số vốn đã đủ.",
      ),
    ],
    keyTakeaways: [
      "Làm việc trên bản sao, giữ nguyên cột gốc.",
      "Nói rõ quy tắc: một dạng ngày, dòng không chắc thì đánh dấu.",
      "Đếm số dòng, số ô trống và số dòng mơ hồ trước và sau.",
      "Ngày mơ hồ như 04/05 phải hỏi người nhập, không để trợ lý đoán.",
      "Kiểm vài dòng chuẩn hoá với bản gốc trước khi thay cột.",
    ],
    practicePrompt: {
      question:
        "Cột có 120 dòng, trước làm sạch có 38 dòng ngày sai kiểu. Sau làm sạch còn 3 dòng lỗi và số dòng vẫn là 120. Điều nào đúng?",
      options: [
        "Số dòng lỗi giảm từ 38 xuống 3 (38 - 3 = 35 dòng được sửa), cần xem 3 dòng còn lại",
        "38 dòng đã được sửa hết vì trợ lý báo xong",
        "Chỉ có 3 dòng sửa được, còn 35 dòng bị bỏ qua",
        "Số dòng vẫn 120 nên chắc chắn mọi ngày đã đúng nghĩa",
      ],
      correct: 0,
      explanation:
        "38 dòng lỗi giảm còn 3 nên 35 dòng đã được sửa; 3 dòng còn lại cần xem tay, thường là dòng mơ hồ. Trợ lý báo xong không bằng số đếm. 'Chỉ 3 dòng sửa được' đảo ngược con số. Giữ đủ 120 dòng chỉ cho biết không mất dòng, không nói ngày nào bị đổi nghĩa.",
    },
    summary: {
      keyIdea: "Làm sạch dữ liệu bằng trợ lý là nhanh, nhưng chỉ tin khi số dòng và các dòng mơ hồ đã được bạn đếm lại.",
      formula: "Bản sao cột → quy tắc rõ → đếm trước và sau → xử lý tay dòng mơ hồ.",
      commonMistake: "Để trợ lý đoán ngày mơ hồ rồi thay luôn cột gốc.",
      action: "Chọn một cột lộn xộn trong bảng của bạn và làm sạch trên bản sao theo bốn bước.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một cột lộn xộn trong bảng của bạn (ngày, số điện thoại hoặc tên). Sao chép sang cột bên cạnh, đếm số dòng lỗi trước, nhờ trợ lý chuẩn hoá theo một quy tắc bạn viết ra, rồi đếm lại và ghi hai con số vào giấy.",
      secondary: "Liệt kê các dòng mơ hồ trợ lý đánh dấu và tự quyết định từng dòng bằng cách hỏi người nhập hoặc tra chứng từ gốc.",
    },
    sections: [
      {
        type: "lead",
        text: "Một cột ngày viết đủ kiểu làm mọi phép lọc và sắp xếp sai mà bạn không nhìn thấy. Bài này dạy nhờ trợ lý làm sạch nhanh và đếm lại để biết nó không làm hỏng gì.",
      },
      {
        type: "feynman",
        title: "Làm sạch dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc dọn một ngăn kéo lẫn nhiều loại giấy tờ. Bạn không vứt cái gì trước khi chụp ảnh hiện trạng; bạn đếm số tờ, chia vào từng xấp và đếm lại. Nếu số tờ sau dọn khác số tờ trước thì có tờ bị rơi. Làm sạch cột dữ liệu cũng thế.",
        columns: ["Thành phần", "Dọn ngăn kéo", "Làm sạch cột dữ liệu"],
        rows: [
          ["Giữ bản gốc", "Chụp ảnh ngăn kéo trước", "Giữ nguyên cột gốc, làm ở cột bên cạnh"],
          ["Quy tắc phân loại", "Hoá đơn một xấp, thư một xấp", "Một dạng ngày, dòng không chắc thì đánh dấu"],
          ["Ai dọn", "Bạn hoặc người phụ", "Trợ lý làm nhanh phần đều"],
          ["Đếm lại", "Số tờ trước và sau", "Số dòng, số dòng lỗi trước và sau"],
        ],
        oneLiner: "Dọn nhanh thì giao, còn đếm lại và giữ bản gốc là việc của bạn.",
      },
      { type: "heading", text: "Vấn đề: cột trông đồng đều chưa chắc đã đúng" },
      {
        type: "paragraph",
        text: "Trợ lý chuẩn hoá cột ngày rất giỏi trong việc làm mọi dòng trông giống nhau. Nhưng '04/05/2023' có thể là 4 tháng 5 hoặc 5 tháng 4, và nếu nó chọn một kiểu cho tất cả, một nửa số dòng đổi nghĩa mà cột vẫn đẹp. Vì vậy bạn cần đếm số dòng, tách các dòng mơ hồ và hỏi lại người nhập.",
      },
      {
        type: "flow",
        title: "Từ cột lộn xộn tới cột đã chuẩn hoá",
        steps: [
          { label: "Sao chép cột gốc", detail: "Tạo cột bên cạnh, dán bản sao vào. Cột gốc không bị đụng tới." },
          { label: "Đếm trước", detail: "Ghi số dòng, số ô trống và số dòng bạn thấy kiểu ngày khác lạ." },
          { label: "Viết quy tắc và nhờ trợ lý", detail: "Nêu dạng đích (ngày/tháng/năm), nói dòng không chắc thì ghi [cần kiểm], cấm tự đoán." },
          { label: "Đếm sau và so vài dòng", detail: "Số dòng có ngày, số dòng [cần kiểm], và so ba dòng với bản gốc." },
          { label: "Xử lý dòng mơ hồ bằng tay", detail: "Hỏi người nhập hoặc tra chứng từ, sau đó mới thay cột gốc bằng cột sạch." },
        ],
      },
      {
        type: "chart",
        title: "Số dòng lỗi trước và sau khi làm sạch (120 dòng)",
        caption: "Số liệu minh hoạ: đếm trên một bảng 120 dòng giả định, không phải dữ liệu thật của công ty nào.",
        kind: "bar",
        yLabel: "Số dòng lỗi",
        data: [
          { label: "Cột ngày", values: [38, 3] },
          { label: "Cột số điện thoại", values: [27, 2] },
          { label: "Cột tên", values: [45, 5] },
        ],
        seriesLabels: ["Trước khi làm sạch", "Sau khi làm sạch"],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu làm sạch cột ngày",
        task: "Cột B có 300 dòng ngày viết đủ kiểu. Lắp yêu cầu để trợ lý chuẩn hoá mà không tự đoán ngày mơ hồ.",
        parts: [
          {
            id: "rule",
            label: "Quy tắc đích",
            options: [
              { text: "Làm cho cột ngày đẹp và đồng đều.", feedback: "Không nêu kiểu đích nên trợ lý tự chọn; ngày mơ hồ có thể đổi nghĩa mà cột vẫn đẹp." },
              { text: "Đưa về dạng ngày/tháng/năm ở cột C, giữ nguyên cột B.", good: true, feedback: "Dạng đích rõ, cột gốc được giữ để đối chiếu." },
            ],
          },
          {
            id: "unsure",
            label: "Dòng không chắc",
            options: [
              { text: "Dòng nào mơ hồ thì tự đoán theo cách hợp lý nhất.", feedback: "Đoán làm 04/05 có thể thành 5 tháng 4 mà không ai hay biết." },
              { text: "Dòng nào có thể hiểu hai cách thì ghi [cần kiểm] thay vì đoán.", good: true, feedback: "Các dòng mơ hồ hiện ra để bạn tự quyết định." },
            ],
          },
          {
            id: "report",
            label: "Báo cáo kết quả",
            options: [
              { text: "Chỉ cần báo là đã xong.", feedback: "Bạn không có số nào để đối chiếu; câu 'xong' là lời nói, không phải bằng chứng." },
              { text: "Báo số dòng đã chuẩn hoá, số dòng [cần kiểm] và số dòng trống.", good: true, feedback: "Ba con số để bạn đối chiếu với số đếm của mình." },
            ],
          },
        ],
        responses: [
          {
            requires: ["rule", "unsure", "report"],
            text: "Đã chuẩn hoá cột C theo dạng ngày/tháng/năm.\n- Đã chuẩn hoá: 291 dòng\n- Cần kiểm: 6 dòng (ví dụ 04/05/2023 có thể là 4 tháng 5 hoặc 5 tháng 4)\n- Ô trống: 3 dòng\nTổng: 291 + 6 + 3 = 300.",
          },
          {
            requires: ["rule"],
            text: "Đã chuẩn hoá xong cột C. (Các ngày mơ hồ như 04/05/2023 đã được chọn theo kiểu tháng/ngày mà không đánh dấu, và không có số liệu để bạn đối chiếu.)",
          },
          {
            text: "Cột ngày đã đẹp và đồng đều. (Không rõ nó đã đổi những dòng nào, giữ bản gốc hay không, và số dòng còn đủ 300 hay chưa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Tên và số điện thoại cũng cần bản gốc",
        text: "Chuẩn hoá tên viết hoa và số điện thoại có thể cắt nhầm chữ số hoặc đổi tên riêng có dấu. Luôn làm trên bản sao, kiểm vài dòng, và đừng gửi cột danh bạ khách cho công cụ chưa được công ty duyệt.",
      },
      {
        type: "scenario",
        title: "Cột ngày vào làm của 120 nhân viên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần lọc nhân viên vào làm theo tháng, nhưng cột ngày có nhiều kiểu. Bạn nhờ trợ lý chuẩn hoá và nó trả cột gọn đẹp.",
            choices: [
              { label: "Dán đè lên cột gốc và bắt đầu lọc theo tháng luôn", next: "bad_overwrite" },
              { label: "Đếm số dòng trước sau và xem các dòng nó đánh dấu mơ hồ", next: "s2" },
            ],
          },
          bad_overwrite: {
            text: "Nhiều ngày dạng 04/05 bị đổi chỗ ngày và tháng. Báo cáo theo tháng sai, và vì cột gốc đã bị đè, bạn không thể so lại.",
            ending: "bad",
          },
          s2: {
            text: "Có 120 dòng, 6 dòng mơ hồ được đánh dấu, và 3 ô trống. 111 + 6 + 3 = 120.",
            choices: [
              { label: "Để trợ lý đoán 6 dòng mơ hồ cho nhanh", next: "bad_guess" },
              { label: "Hỏi người nhập hoặc tra hồ sơ cho 6 dòng đó", next: "good" },
            ],
          },
          bad_guess: {
            text: "Hai trong sáu ngày bị đoán sai. Lọc theo tháng đưa hai nhân viên vào nhầm tháng, và báo cáo phải chỉnh.",
            ending: "bad",
          },
          good: {
            text: "Bạn hỏi được cả sáu người, thay cột gốc bằng cột sạch và số đếm khớp 120. Báo cáo theo tháng đúng ngay lần đầu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Sao chép cột gốc, làm việc trên bản sao.",
          "Bước 2 - Đếm số dòng, dòng lỗi, ô trống trước.",
          "Bước 3 - Nêu quy tắc; dòng không chắc thì đánh dấu, không đoán.",
          "Bước 4 - Đếm lại, xử lý tay dòng mơ hồ rồi mới thay cột.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Trợ lý dọn nhanh, còn bản gốc và phép đếm là của bạn.",
          "Bài sau: tạo biểu đồ từ bảng số và đọc cho đúng.",
        ],
      },
    ],
  },
  {
    id: 2268,
    slug: "tao-bieu-do-tu-bang-so-va-doc-cho-dung",
    title: "Chặng 43, Bài 9: Tạo biểu đồ từ bảng số và đọc cho đúng",
    subtitle: "Trợ lý vẽ biểu đồ trong vài giây - trục và thang đo mới quyết định người xem hiểu gì.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📈",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn cần một biểu đồ cho buổi họp sáng mai, và trợ lý vẽ được chỉ trong vài giây. Nhưng một biểu đồ đẹp vẫn có thể làm người xem hiểu sai: trục bắt đầu ở 90 thay vì 0 khiến chênh lệch nhỏ trông như vực sâu. Bài này dạy ba câu hỏi để kiểm trục, thang đo và tiêu đề trước khi đưa lên màn hình.",
    openingQuestion:
      "Trợ lý vẽ biểu đồ cột doanh thu ba tháng: 100, 102 và 104 triệu. Cột tháng 3 trông cao gấp đôi cột tháng 1. Điều gì có khả năng xảy ra nhất?",
    openingOptions: [
      "Trục dọc không bắt đầu từ 0 nên chênh lệch nhỏ bị phóng to",
      "Doanh thu tháng 3 thật sự gấp đôi tháng 1 nên biểu đồ đúng",
      "Trợ lý cộng nhầm và tô cột theo số liệu của một bảng khác",
      "Biểu đồ cột luôn phóng to mọi khác biệt, đó là cách nó hoạt động",
    ],
    correctOption: 0,
    explanation:
      "Ba số 100, 102 và 104 chỉ hơn kém nhau vài phần trăm, nên nếu cột tháng 3 nhìn gấp đôi thì trục dọc có thể bắt đầu ở khoảng 98 thay vì 0. Người xem so chiều cao cột, không đọc con số, nên họ hiểu tăng gấp đôi. Doanh thu thật chỉ tăng 4%. Không có căn cứ để nghĩ trợ lý cộng nhầm, và biểu đồ cột chỉ phóng to khi trục bị cắt.",
    diagram: [
      { label: "Trợ lý vẽ biểu đồ từ bảng số của bạn", arrow: true },
      { label: "Bạn kiểm trục, thang đo, đơn vị và tiêu đề", arrow: true },
      { label: "Bạn đối chiếu vài cột với số trong bảng gốc", arrow: true },
      { label: "Sửa những gì gây hiểu nhầm rồi mới đưa lên họp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Bảo chuẩn bị biểu đồ chi phí marketing ba tháng, các số chỉ chênh nhau vài phần trăm. Biểu đồ đầu tiên có trục cắt ở gần mức thấp nhất nên cột tháng sau trông gấp ba. Anh đặt trục bắt đầu từ 0, ghi thêm con số lên đầu cột, và cuộc họp không còn tranh cãi về 'mức tăng đột biến' không tồn tại.",
    },
    quiz: [
      q(
        "Biểu đồ cột có trục dọc bắt đầu ở 95 thay vì 0. Nó tạo ra hiểu nhầm gì?",
        [
          "Chênh lệch nhỏ giữa các cột trông lớn hơn thực tế rất nhiều",
          "Số liệu bị tính sai và phải nhập lại cả bảng từ đầu",
          "Cột trông thấp hơn số thật nên người xem đánh giá thấp",
          "Không có hiểu nhầm nào vì trục nào cũng cho cùng thông tin về số liệu",
        ],
        "Người xem so chiều cao cột. Khi trục cắt ở 95, một cột 100 và một cột 104 khác nhau ở phần nhìn thấy là 5 và 9, tức gần gấp đôi, dù số thật chỉ hơn 4%. Số liệu trong bảng không sai, cột không bị thấp đi, và trục khác nhau cho ấn tượng khác nhau.",
      ),
      q(
        "Việc nào giúp người xem đọc biểu đồ cột đúng mà không cần đoán?",
        [
          "Đặt trục từ 0 và ghi số lên đầu mỗi cột",
          "Dùng màu thật sặc sỡ để mỗi cột nổi bật khỏi nền",
          "Bỏ hết nhãn trục cho biểu đồ gọn và đỡ rối mắt",
          "Thêm hiệu ứng ba chiều để cột trông có chiều sâu hơn",
        ],
        "Trục từ 0 giữ đúng tỉ lệ; số trên đầu cột cho con số chính xác. Màu sặc sỡ và hiệu ứng ba chiều không làm trục đúng hơn, thậm chí làm khó so chiều cao. Bỏ nhãn trục thì người xem không biết đơn vị hay thang đo.",
      ),
      q(
        "Trợ lý đặt tiêu đề biểu đồ là 'Doanh thu tăng mạnh'. Số liệu: 100, 102, 104 triệu. Nên làm gì?",
        [
          "Đổi thành tiêu đề mô tả, ví dụ 'Doanh thu 3 tháng đầu quý (triệu đồng)'",
          "Giữ nguyên vì tiêu đề nghe hấp dẫn sẽ thu hút người xem",
          "Nhờ trợ lý viết lại thành 'Doanh thu tăng vọt' cho mạnh hơn",
          "Xoá tiêu đề để người xem tự rút ra kết luận từ hình vẽ",
        ],
        "Tăng từ 100 lên 104 là 4%, khó gọi là 'tăng mạnh'; tiêu đề nên mô tả dữ liệu, còn kết luận là việc của bạn nói thành lời. 'Tăng vọt' còn nói quá hơn. Xoá tiêu đề làm người xem không biết đơn vị hay giai đoạn.",
      ),
      q(
        "Biểu đồ tròn của trợ lý có các phần: 45%, 30%, 20%, 15%. Có điều gì bất thường?",
        [
          "Tổng là 110%, nên số liệu hoặc cách chia bị sai",
          "Không có gì bất thường vì biểu đồ tròn luôn có tổng là 100%",
          "Chỉ cần đổi màu các phần là biểu đồ đúng trở lại",
          "Biểu đồ tròn cho phép các phần vượt quá 100% tổng cộng",
        ],
        "45 + 30 + 20 + 15 = 110, nên các phần không thể cùng là tỉ lệ của một tổng 100%. Biểu đồ tròn phải cộng đúng 100%, và đổi màu không sửa được số. Phải xem lại số liệu gốc hoặc cách trợ lý tính phần trăm.",
      ),
      q(
        "Trước khi đưa biểu đồ lên họp, việc kiểm nào hợp lý nhất?",
        [
          "Đối chiếu vài cột với số trong bảng gốc và xem trục bắt đầu ở đâu",
          "Hỏi trợ lý biểu đồ đã đẹp chưa rồi in ra luôn",
          "Chỉ xem màu và cỡ chữ có hợp với mẫu bài trình bày chung của cả công ty hay không",
          "Tin biểu đồ vì nó được vẽ tự động từ chính bảng số của bạn",
        ],
        "Đối chiếu cột với bảng gốc bắt lỗi dữ liệu, xem trục bắt lỗi thang đo gây hiểu nhầm. Đánh giá 'đẹp' của trợ lý không kiểm số nào. Màu và cỡ chữ chỉ là hình thức. Vẽ tự động từ bảng vẫn có thể lấy nhầm vùng hoặc cắt trục.",
      ),
    ],
    keyTakeaways: [
      "Người xem so chiều cao cột, không đọc con số.",
      "Trục dọc của biểu đồ cột nên bắt đầu từ 0.",
      "Ghi số lên cột và ghi rõ đơn vị, giai đoạn trong tiêu đề.",
      "Tiêu đề mô tả dữ liệu, không nói quá điều số liệu không nói.",
      "Đối chiếu vài cột với bảng gốc trước khi đưa lên họp.",
    ],
    practicePrompt: {
      question:
        "Bảng: tháng 1 = 100, tháng 2 = 102, tháng 3 = 104 (triệu). Biểu đồ vẽ trục từ 98 đến 106. Mức tăng thực từ tháng 1 sang tháng 3 và cách xử lý hợp lý là gì?",
      options: [
        "Tăng 4 (104 - 100 = 4, tức 4%); đặt trục từ 0 và ghi số lên cột",
        "Tăng 6 (104 - 98 = 6) và giữ biểu đồ cho nó nổi bật",
        "Tăng 104% vì tháng 3 là 104 nên gấp hơn hai lần",
        "Không tăng vì các cột cùng màu và cùng kiểu vẽ",
      ],
      correct: 0,
      explanation:
        "104 trừ 100 là 4 triệu, tức 4% so với tháng 1. Trừ 98 là lấy mốc của trục bị cắt, không phải số liệu. 104 không phải mức tăng 104%; đó là giá trị. Màu và kiểu vẽ không nói lên chuyện có tăng hay không.",
    },
    summary: {
      keyIdea: "Biểu đồ đẹp vẫn có thể gây hiểu nhầm; trục, thang đo và tiêu đề mới là chỗ bạn cần kiểm.",
      formula: "Trục từ 0 → số lên cột → tiêu đề mô tả → đối chiếu với bảng gốc.",
      commonMistake: "Đưa lên họp biểu đồ trợ lý vẽ mà không nhìn trục dọc bắt đầu từ đâu.",
      action: "Mở một biểu đồ bạn sắp dùng và kiểm ba thứ: trục, đơn vị, tiêu đề.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bảng số nhỏ của bạn (doanh thu, chi phí hoặc số đơn 3-6 tháng) và nhờ trợ lý vẽ biểu đồ cột. Nhìn trục dọc bắt đầu từ đâu, đơn vị ghi chưa, tiêu đề có nói quá không. Sửa cho đúng, rồi đối chiếu ba cột với bảng gốc.",
      secondary: "Chụp hai phiên bản trước và sau khi sửa trục để cho đồng nghiệp xem sự khác biệt.",
    },
    sections: [
      {
        type: "lead",
        text: "Trợ lý vẽ biểu đồ trong vài giây, nhưng một cái trục bị cắt hay một tiêu đề nói quá có thể khiến cả phòng họp hiểu sai. Bài này dạy ba câu hỏi để kiểm biểu đồ trước khi đưa lên.",
      },
      {
        type: "feynman",
        title: "Đọc biểu đồ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hai người đứng cạnh nhau, một người cao 1,70 m và một người cao 1,74 m. Nếu bạn chụp ảnh và cắt bỏ phần từ đất tới đầu gối, người thứ hai nhìn như cao gấp rưỡi. Biểu đồ có trục bị cắt cũng làm đúng điều đó: bỏ phần dưới, và chênh lệch nhỏ trông rất lớn.",
        columns: ["Thành phần", "Ảnh chụp hai người", "Biểu đồ cột"],
        rows: [
          ["Phần bị cắt", "Từ đất tới đầu gối", "Từ 0 tới đầu trục dọc"],
          ["Người xem thấy", "Chiều cao chênh nhau nhiều", "Cột chênh nhau nhiều"],
          ["Sự thật", "Chỉ hơn 4 cm", "Chỉ hơn vài phần trăm"],
          ["Cách sửa", "Chụp cả người", "Đặt trục bắt đầu từ 0"],
        ],
        oneLiner: "Mắt người so chiều cao, nên phần bị cắt của trục là điều đầu tiên cần kiểm.",
      },
      { type: "heading", text: "Vấn đề: biểu đồ đúng số nhưng người xem hiểu sai" },
      {
        type: "paragraph",
        text: "Trợ lý vẽ biểu đồ từ đúng số của bạn, nên các con số không sai. Điều dễ sai là cách trình bày: trục cắt, thang đo không đều, phần trăm không cộng thành 100, tiêu đề nói mạnh hơn số liệu. Mỗi thứ này đều không báo lỗi mà chỉ làm người xem hiểu khác dữ liệu.",
      },
      {
        type: "flow",
        title: "Từ bảng số tới biểu đồ đáng tin",
        steps: [
          { label: "Chọn dạng biểu đồ hợp việc", detail: "Cột để so sánh các mục, đường để xem xu hướng theo thời gian, tròn chỉ khi các phần cộng thành một tổng." },
          { label: "Nhờ trợ lý vẽ và ghi rõ vùng dữ liệu", detail: "Nêu cột nào là trục ngang, cột nào là giá trị, và đơn vị (triệu đồng, số đơn)." },
          { label: "Kiểm trục dọc", detail: "Trục bắt đầu ở đâu? Với biểu đồ cột nên là 0. Bước chia có đều không?" },
          { label: "Kiểm tiêu đề và nhãn", detail: "Tiêu đề có mô tả đúng dữ liệu, có đơn vị và giai đoạn chưa? Có từ nào nói quá không?" },
          { label: "Đối chiếu với bảng gốc", detail: "Đọc lại ba cột bất kỳ, so với số trong bảng. Khớp thì mới đưa lên họp." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát biểu đồ và phần mô tả do trợ lý viết",
        task: "Bảng: doanh thu ba tháng là 100, 102, 104 triệu. Trợ lý vẽ biểu đồ cột và mô tả nó. Đánh dấu những câu gây hiểu nhầm hoặc không có căn cứ.",
        segments: [
          { text: "Biểu đồ cột thể hiện doanh thu ba tháng của quý, đơn vị triệu đồng." },
          { text: "Trục dọc bắt đầu ở 98 và kết thúc ở 106 để các cột hiện rõ hơn.", error: "Trục cắt ở 98 khiến chênh lệch 4% trông như gấp đôi hoặc hơn. Với biểu đồ cột nên bắt đầu từ 0." },
          { text: "Tháng 1 là 100 triệu, tháng 2 là 102 triệu, tháng 3 là 104 triệu." },
          { text: "Doanh thu tăng vọt gấp đôi trong ba tháng.", error: "104 so với 100 chỉ tăng 4%. 'Gấp đôi' là ấn tượng từ trục bị cắt, không phải số liệu." },
          { text: "Theo khảo sát ngành, mức tăng này cao hơn đa số đối thủ.", error: "Bảng số không có khảo sát hay số đối thủ nào. Trợ lý tự thêm một so sánh không có nguồn." },
          { text: "Nên ghi con số lên đầu mỗi cột để người xem đọc chính xác." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trục từ 0, có số lên cột",
          text: "Chiều cao cột tỉ lệ đúng với giá trị. Người xem đọc được con số chính xác. Chênh lệch nhỏ trông nhỏ. Tiêu đề mô tả đúng dữ liệu.",
        },
        right: {
          label: "Trục cắt, tiêu đề nói mạnh",
          text: "Chiều cao cột phóng đại chênh lệch. Người xem chỉ nhớ cảm giác 'tăng vọt'. Chênh lệch 4% trông như gấp đôi. Câu hỏi 'sao đột ngột thế' xuất hiện dù không có gì đột ngột.",
        },
      },
      {
        type: "callout",
        label: "Trục cắt không phải lúc nào cũng sai",
        text: "Biểu đồ đường về xu hướng đôi khi có lý do để trục không bắt đầu từ 0, nhưng khi đó hãy ghi rõ trên hình. Với biểu đồ cột, luôn bắt đầu từ 0 để chiều cao đúng với giá trị.",
      },
      {
        type: "scenario",
        title: "Biểu đồ chi phí cho buổi họp sáng mai",
        start: "s1",
        nodes: {
          s1: {
            text: "Trợ lý vẽ biểu đồ cột chi phí ba tháng, các số chỉ chênh nhau vài phần trăm nhưng cột tháng 3 trông cao gấp ba tháng 1.",
            choices: [
              { label: "Dùng luôn vì biểu đồ trông rõ và nổi bật", next: "bad_use" },
              { label: "Kiểm trục dọc và đối chiếu số trong bảng gốc", next: "s2" },
            ],
          },
          bad_use: {
            text: "Cả phòng hỏi vì sao chi phí tăng vọt. Bạn mất nửa buổi giải thích rằng số thật chỉ tăng vài phần trăm và biểu đồ đã cắt trục.",
            ending: "bad",
          },
          s2: {
            text: "Trục bắt đầu ở mức thấp nhất của số liệu, chưa phải 0. Bạn còn một buổi tối để sửa.",
            choices: [
              { label: "Đặt trục từ 0, ghi số lên cột, đổi tiêu đề thành mô tả", next: "good" },
              { label: "Giữ trục cắt nhưng thêm chú thích nhỏ ở góc dưới", next: "bad_note" },
            ],
          },
          bad_note: {
            text: "Chú thích nhỏ không ai đọc. Người xem vẫn thấy cột gấp ba và câu hỏi 'sao tăng vọt' vẫn xuất hiện.",
            ending: "bad",
          },
          good: {
            text: "Các cột trông gần bằng nhau, số ghi ngay trên đầu. Cuộc họp chuyển sang bàn nguyên nhân của mức tăng nhỏ thay vì tranh cãi về một mức tăng không có.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhờ trợ lý vẽ, nêu rõ cột dữ liệu và đơn vị.",
          "Bước 2 - Kiểm trục: biểu đồ cột phải bắt đầu từ 0.",
          "Bước 3 - Đổi tiêu đề thành mô tả, ghi số lên cột.",
          "Bước 4 - Đối chiếu ba cột với bảng gốc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Trợ lý vẽ, bạn kiểm trục, và người xem chỉ nhìn thấy điều bạn đã kiểm.",
          "Bài sau: dự án nhỏ, bảng theo dõi chi tiêu hoặc doanh thu tháng.",
        ],
      },
    ],
  },
  {
    id: 2269,
    slug: "du-an-nho-bang-theo-doi-chi-phi-thang",
    title: "Chặng 43, Bài 10: Dự án nhỏ: bảng theo dõi chi tiêu hoặc doanh thu tháng",
    subtitle: "Dựng bảng từ số của bạn với trợ lý, rồi kiểm tổng bằng cách tính tay.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng kỹ năng riêng: hỏi bằng lời, kiểm công thức, làm sạch cột, đọc biểu đồ. Bài này ghép chúng vào một việc thật: dựng bảng theo dõi tháng của chính bạn. Làm xong bạn có một bảng dùng được mỗi tháng và một thói quen kiểm tổng bằng tay mà không cần biết công thức phức tạp.",
    openingQuestion:
      "Bạn có 25 khoản chi trong tháng ghi lộn xộn trong ghi chú điện thoại và nhờ trợ lý dựng bảng theo dõi. Điều nào quyết định bảng có đáng tin không?",
    openingOptions: [
      "Bạn tự cộng tổng bằng tay và so với tổng trong bảng",
      "Bảng có màu sắc và đường viền rõ ràng, dễ nhìn",
      "Trợ lý báo đã nhập đủ 25 khoản vào bảng",
      "Bảng có thêm nhiều cột phân tích để trông chuyên nghiệp",
    ],
    correctOption: 0,
    explanation:
      "Tổng bạn tự cộng độc lập với công thức, nên nếu hai tổng khớp thì các khoản đã được nhập đủ và cộng đúng. Màu sắc và đường viền chỉ là hình thức. Lời báo 'đã nhập đủ 25 khoản' là lời trợ lý tự nói, có thể bỏ sót hoặc nhân đôi một khoản. Thêm nhiều cột phân tích làm bảng phức tạp hơn mà không nói gì về độ đúng.",
    diagram: [
      { label: "Gom số liệu thô của bạn: khoản, ngày, số tiền", arrow: true },
      { label: "Trợ lý dựng bảng và công thức tổng theo yêu cầu", arrow: true },
      { label: "Bạn tự cộng tay và so với tổng trong bảng", arrow: true },
      { label: "Khớp thì lưu bảng làm mẫu dùng cho tháng sau" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Ngân chủ một cửa hàng nhỏ ghi doanh thu hằng ngày trong sổ tay. Chị nhờ trợ lý dựng bảng có cột ngày, khoản, số tiền và ô tổng. Chị cộng tay cả tháng bằng máy tính rồi so với ô tổng; hai số lệch 200.000 vì một dòng bị trợ lý nhập trùng. Chị xoá dòng trùng, lưu bảng làm mẫu và tháng sau chỉ việc nhập số mới.",
    },
    quiz: [
      q(
        "Bạn nhờ trợ lý dựng bảng theo dõi chi tiêu tháng. Yêu cầu nào giúp bảng dùng được lâu dài?",
        [
          "Nêu các cột (ngày, khoản, nhóm, số tiền) và một ô tổng có công thức",
          "Chỉ cần nói 'làm bảng chi tiêu cho đẹp'",
          "Xin bảng thật nhiều cột phân tích để sau này cần thì có sẵn mà dùng ngay",
          "Yêu cầu trợ lý điền sẵn số tiền hợp lý cho từng khoản",
        ],
        "Cột rõ và ô tổng có công thức cho bạn cấu trúc để nhập tháng sau và kiểm tổng. Yêu cầu chung chung cho bảng khó dùng. Bảng quá nhiều cột khó nhập và dễ bỏ trống. Điền sẵn số 'hợp lý' là để trợ lý bịa dữ liệu thay bạn.",
      ),
      q(
        "Bạn cộng tay 25 khoản ra 8.450.000 nhưng ô tổng trong bảng là 8.650.000. Điều nào có khả năng nhất?",
        [
          "Một khoản nhập trùng hoặc bị nhập thừa 200.000",
          "Ô tổng luôn cộng nhiều hơn và bạn nên cộng thêm 200.000",
          "Máy tính của bạn tính sai vì bảng tính không thể sai",
          "Sai lệch nhỏ như vậy không cần tìm nguyên nhân",
        ],
        "Hiệu 8.650.000 trừ 8.450.000 là 200.000, một con số tròn nên khả năng cao là một khoản bị nhập trùng hoặc thừa. Ô tổng không 'luôn nhiều hơn', bảng tính tính đúng theo công thức nhưng dữ liệu có thể sai, và sai lệch nào cũng cần biết nguồn gốc.",
      ),
      q(
        "Trợ lý phân loại khoản 'Grab đi họp' vào nhóm 'Ăn uống'. Cách xử lý hợp lý là gì?",
        [
          "Sửa sang nhóm 'Đi lại' và ghi quy tắc phân nhóm cho lần sau",
          "Giữ nguyên vì nhóm nào cũng được, miễn là cộng tổng ra đúng con số cuối",
          "Xoá cột nhóm đi để khỏi phải phân loại sai mỗi lần nhập sổ như vậy nữa",
          "Để trợ lý tự phân nhóm lại cả bảng mà không cần xem lại kết quả nào cả",
        ],
        "Phân nhóm sai làm báo cáo theo nhóm sai dù tổng vẫn đúng. Ghi quy tắc giúp lần sau ít phải sửa. Xoá cột nhóm bỏ mất thông tin hữu ích. Để trợ lý phân lại mà không xem chỉ đưa lỗi khác vào.",
      ),
      q(
        "Bạn muốn dùng bảng cho tháng sau. Cách nào an toàn nhất để tái sử dụng?",
        [
          "Lưu bản sao bảng trống có công thức, xoá số cũ và nhập số mới",
          "Sửa đè lên bảng tháng này để khỏi tốn thêm tệp và tránh nhầm giữa các bản",
          "Nhờ trợ lý dựng lại bảng từ đầu mỗi tháng cho khỏi nhầm",
          "Xoá cả công thức và nhập tay tổng mỗi tháng để dễ hiểu",
        ],
        "Một mẫu trống giữ công thức và cấu trúc đã kiểm, chỉ đổi số. Sửa đè làm mất bảng tháng trước. Dựng lại mỗi tháng có thể ra cấu trúc khác nhau nên khó so. Xoá công thức và nhập tổng tay mất đúng phần giúp kiểm.",
      ),
      q(
        "Bảng theo dõi của bạn có số tài khoản ngân hàng ở cột ghi chú. Nên làm gì trước khi đưa cho trợ lý?",
        [
          "Xoá số tài khoản và thông tin cá nhân, chỉ giữ ngày, khoản và số tiền",
          "Đưa nguyên bảng vì trợ lý cần đủ thông tin để làm đúng",
          "Chỉ che bớt vài chữ số cuối là đủ an toàn",
          "Chép sang tệp khác cùng tên rồi đưa vào như bình thường",
        ],
        "Trợ lý chỉ cần cấu trúc và số tiền để dựng bảng; số tài khoản không cần thiết và là thông tin nhạy cảm. Che vài chữ số vẫn để lộ phần còn lại. Chép sang tệp khác cùng nội dung không đổi được điều gì bị đưa ra ngoài.",
      ),
    ],
    keyTakeaways: [
      "Nêu rõ các cột và ô tổng khi nhờ trợ lý dựng bảng.",
      "Tự cộng tay và so với ô tổng trước khi tin bảng.",
      "Lệch một con số tròn thường là dòng trùng hoặc nhập thừa.",
      "Phân nhóm trợ lý làm cần được bạn đọc lại.",
      "Lưu bảng trống làm mẫu cho tháng sau, bỏ dữ liệu nhạy cảm.",
    ],
    practicePrompt: {
      question:
        "Bạn có ba khoản: 1.200.000, 850.000 và 450.000. Ô tổng trong bảng ghi 2.550.000. Điều gì đúng?",
      options: [
        "Tổng tay là 2.500.000 (1.200.000 + 850.000 + 450.000), lệch 50.000 nên cần tìm nguyên nhân",
        "Ô tổng đúng vì công thức của trợ lý luôn đúng",
        "Tổng là 2.550.000 vì làm tròn lên cho dễ nhớ",
        "Tổng tay là 2.650.000, nên ô tổng còn thiếu 100.000",
      ],
      correct: 0,
      explanation:
        "1.200.000 + 850.000 = 2.050.000, cộng thêm 450.000 là 2.500.000, nên ô tổng 2.550.000 dư 50.000. Cần mở công thức hoặc xem có ô nào nhập thừa. Làm tròn không nên thay đổi tổng của bảng theo dõi. 2.650.000 là phép cộng sai.",
    },
    summary: {
      keyIdea: "Dự án nhỏ này ghép bốn kỹ năng: hỏi rõ, kiểm công thức, làm sạch cột và đọc số cho đúng.",
      formula: "Cột rõ → trợ lý dựng bảng → tự cộng tay → khớp thì lưu làm mẫu.",
      commonMistake: "Tin ô tổng chỉ vì nó do công thức trợ lý viết ra.",
      action: "Dựng bảng theo dõi tháng này với số của bạn và ghi lại hai tổng: tay và bảng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Gom 10-25 khoản chi hoặc thu tháng này của bạn (đã bỏ số tài khoản và thông tin cá nhân). Nhờ trợ lý dựng bảng có cột ngày, khoản, nhóm, số tiền và một ô tổng. Tự cộng tay bằng máy tính, ghi hai tổng cạnh nhau, và lưu một bản trống làm mẫu.",
      secondary: "Nếu hai tổng lệch, ghi lại dòng nào gây lệch và vì sao - đó là thứ bạn cần soát mỗi tháng.",
    },
    sections: [
      {
        type: "lead",
        text: "Tháng này bạn có một xấp khoản chi hoặc thu nằm rải rác trong ghi chú. Bài này ghép các kỹ năng đã học để dựng một bảng theo dõi dùng được mỗi tháng và kiểm tổng bằng cách tự cộng.",
      },
      {
        type: "feynman",
        title: "Bảng theo dõi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cuốn sổ thu chi của tiệm tạp hoá: mỗi dòng một khoản, cuối trang có tổng, và chủ tiệm cộng tay lại để chắc khớp. Bảng tính là cuốn sổ đó với công thức tự cộng. Trợ lý giúp bạn dựng cuốn sổ nhanh, còn thói quen cộng tay lại vẫn là của bạn.",
        columns: ["Thành phần", "Sổ thu chi giấy", "Bảng theo dõi"],
        rows: [
          ["Mỗi dòng", "Một khoản, ghi tay", "Ngày, khoản, nhóm, số tiền"],
          ["Tổng cuối trang", "Chủ tiệm cộng tay", "Ô tổng có công thức"],
          ["Ai dựng sổ", "Chủ tiệm kẻ", "Trợ lý dựng theo yêu cầu"],
          ["Kiểm tra", "Cộng lại bằng máy tính", "Tự cộng tay so với ô tổng"],
        ],
        oneLiner: "Trợ lý kẻ sổ nhanh, còn cộng lại để chắc số khớp vẫn là việc của bạn.",
      },
      { type: "heading", text: "Vấn đề: bảng dựng nhanh dễ chứa lỗi không ai thấy" },
      {
        type: "paragraph",
        text: "Khi nhờ trợ lý dựng bảng từ ghi chú lộn xộn, một khoản có thể bị nhập trùng, một khoản khác bị bỏ sót, và một khoản bị xếp sai nhóm. Bảng vẫn trông gọn và ô tổng vẫn ra số. Cách bắt mọi lỗi kiểu này gần như miễn phí: tự cộng tay và so với ô tổng.",
      },
      {
        type: "flow",
        title: "Từ ghi chú lộn xộn tới bảng theo dõi kiểm được",
        steps: [
          { label: "Gom số liệu và bỏ thông tin nhạy cảm", detail: "Chép ra các khoản: ngày, khoản, số tiền. Xoá số tài khoản, tên người khác và mọi thứ không cần cho bảng." },
          { label: "Nêu cột và ô tổng khi nhờ", detail: "Nói rõ các cột, dạng ngày, và yêu cầu một ô tổng có công thức. Cấm trợ lý tự thêm khoản nào không có trong ghi chú." },
          { label: "Đọc lại từng dòng với ghi chú", detail: "Kiểm số dòng bằng số khoản bạn gửi, và xem các khoản được phân nhóm đúng chưa." },
          { label: "Tự cộng tay và so tổng", detail: "Dùng máy tính cộng các khoản từ ghi chú gốc, không nhìn ô tổng trước. So hai con số." },
          { label: "Lưu mẫu trống cho tháng sau", detail: "Sao chép bảng, xoá số cũ, giữ cột và công thức. Tháng sau chỉ nhập số mới rồi kiểm lại bằng cách cộng tay." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu dựng bảng theo dõi chi tiêu",
        task: "Bạn có 25 khoản chi trong ghi chú điện thoại. Lắp yêu cầu để trợ lý dựng bảng theo dõi mà không bịa khoản nào.",
        parts: [
          {
            id: "columns",
            label: "Cột của bảng",
            options: [
              { text: "Làm một bảng chi tiêu đẹp cho tháng này.", feedback: "Không có cột cụ thể nên trợ lý tự chọn; tháng sau bạn khó nhập tiếp theo cùng một cấu trúc." },
              { text: "Các cột: Ngày, Khoản, Nhóm, Số tiền; hàng cuối là ô Tổng có công thức cộng cột Số tiền.", good: true, feedback: "Cấu trúc và ô tổng rõ ràng, dùng lại được mỗi tháng và kiểm được bằng cách cộng tay." },
            ],
          },
          {
            id: "source",
            label: "Nguồn số liệu",
            options: [
              { text: "Nếu thiếu khoản nào thì bổ sung cho hợp lý.", feedback: "Trợ lý sẽ bịa những khoản nghe hợp lý và tổng của bạn không còn là chi tiêu thật." },
              { text: "Chỉ dùng các khoản tôi dán ở dưới; khoản nào thiếu ngày hoặc số tiền thì ghi [cần bổ sung].", good: true, feedback: "Bảng chỉ chứa dữ liệu thật; chỗ thiếu hiện ra để bạn tự điền." },
            ],
          },
          {
            id: "check",
            label: "Cách kiểm",
            options: [
              { text: "Cứ đưa bảng, tôi tin là đủ.", feedback: "Không có số liệu nào để đối chiếu; một khoản trùng hay sót sẽ nằm im." },
              { text: "Cho biết số dòng đã nhập và tổng cột Số tiền để tôi so với số tôi tự cộng.", good: true, feedback: "Hai con số cụ thể để bạn kiểm chéo với phép cộng tay của mình." },
            ],
          },
        ],
        responses: [
          {
            requires: ["columns", "source", "check"],
            text: "Đã dựng bảng với 4 cột: Ngày, Khoản, Nhóm, Số tiền.\n- Số dòng đã nhập: 25\n- Tổng cột Số tiền: 8.450.000 đồng\n- Dòng cần bổ sung: 2 (thiếu ngày ở khoản 'Điện tháng này' và khoản 'Sửa xe')\nHãy tự cộng 25 khoản trong ghi chú của bạn để so với 8.450.000.",
          },
          {
            requires: ["columns"],
            text: "Đã dựng bảng đủ cột và ô tổng. Tổng là 8.650.000 đồng.\n(Có thêm một khoản 'Cà phê 200.000' không có trong ghi chú của bạn nên tổng lệch, và không có số dòng để bạn đối chiếu.)",
          },
          {
            text: "Đây là bảng chi tiêu tháng này rất gọn gàng, kèm biểu đồ phân bổ ngân sách.\n(Không rõ có bao nhiêu khoản, khoản nào là dữ liệu thật của bạn và tổng là bao nhiêu.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dựng bảng từ ghi chú và cộng tay để kiểm",
          text: "Chỉ chứa khoản thật của bạn. Hai tổng khớp thì yên tâm. Lệch thì thấy ngay dòng trùng hoặc sót. Mẫu trống dùng lại được mỗi tháng.",
        },
        right: {
          label: "Nhờ trợ lý dựng và tin ô tổng",
          text: "Có thể lẫn khoản trợ lý thêm cho đủ. Ô tổng ra số nên không ai nghi ngờ. Dòng trùng hoặc sót nằm im trong bảng. Sang tháng sau lỗi cũ lặp lại vì không ai nhận ra nguồn.",
        },
      },
      {
        type: "callout",
        label: "Đây là bảng theo dõi cá nhân, không phải sổ sách kế toán",
        text: "Bảng bạn tự dựng phục vụ việc theo dõi. Sổ sách, thuế và báo cáo chính thức của doanh nghiệp cần do kế toán hoặc phần mềm kế toán chuẩn xử lý; hỏi kế toán trưởng hoặc chuyên gia khi số liệu dùng cho mục đích đó.",
      },
      {
        type: "scenario",
        title: "Bảng theo dõi chi tiêu tháng này",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 25 khoản chi trong ghi chú điện thoại. Trợ lý dựng bảng gọn đẹp với ô tổng 8.650.000 đồng.",
            choices: [
              { label: "Lưu bảng luôn vì tổng do công thức tính nên chắc đúng", next: "bad_trust" },
              { label: "Tự cộng 25 khoản trong ghi chú bằng máy tính rồi so", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Bảng chứa một khoản nhập trùng 200.000. Ba tháng sau bạn dùng con số này để lập kế hoạch chi tiêu và mọi tháng đều lệch.",
            ending: "bad",
          },
          s2: {
            text: "Tổng bạn cộng tay là 8.450.000, lệch 200.000 so với ô tổng trong bảng.",
            choices: [
              { label: "Tìm dòng bị nhập trùng, xoá và cộng lại", next: "good" },
              { label: "Sửa ô tổng bằng tay thành 8.450.000 cho khớp", next: "bad_patch" },
            ],
          },
          bad_patch: {
            text: "Bạn đã ghi đè công thức bằng số. Từ tháng sau ô tổng không tự cập nhật, và dòng trùng vẫn nằm trong bảng.",
            ending: "bad",
          },
          good: {
            text: "Bạn tìm ra khoản 'Cà phê 200.000' bị nhập hai lần, xoá một dòng. Hai tổng khớp 8.450.000 và bạn lưu bản trống làm mẫu cho tháng sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gom khoản chi, bỏ thông tin nhạy cảm.",
          "Bước 2 - Nêu cột và ô tổng, cấm thêm khoản ngoài ghi chú.",
          "Bước 3 - Tự cộng tay và so với ô tổng.",
          "Bước 4 - Lưu mẫu trống có công thức cho tháng sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Trợ lý dựng bảng, bạn cộng tay, và hai con số khớp nhau mới là bảng đáng tin.",
          "Bài sau: dàn ý bài trình bày từ một trang ghi chú.",
        ],
      },
    ],
  },
];
